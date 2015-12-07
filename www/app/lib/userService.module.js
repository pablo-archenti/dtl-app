(function() {
    'use strict';

    angular
        .module('userService', ['dtlService', 'storage'])
        .factory('authService', authService)
        .factory('accountService', accountService);

    authService.$inject = ['Volunteer', 'localStorage', 'LoopBackAuth'];
    accountService.$inject = ['$q', 'Volunteer'];

    function authService(Volunteer, localStorage, LoopBackAuth) {
        var service = {};

        function createSession(token, data) {
            localStorage.set('user.token', token);
            localStorage.set('user.data', data);
        }

        service.clearSession = function clearSession() {
            localStorage.remove('user.data');
            localStorage.remove('user.token');
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
        };

        service.login = function login(credentials) {
            return Volunteer.login({
                email: credentials.email,
                code: credentials.code
            })
            .$promise
            .then(function(accessToken) {
                return createSession(accessToken.id, accessToken.user);
            })
            .then(function() {
                return true;
            });
        };

        service.requestLoginCode = function requestLoginCode(email) {
            return Volunteer.sendLoginCode({
                email: email
            })
            .$promise
            .then(function() {
                return true;
            });
        };

        service.logout = function logout() {
            self = this;
            return Volunteer.logout()
            .$promise
            .then(function() {
                return self.clearSession();
            })
            .then(function() {
                return true;
            });
        };

        service.isLoggedIn = function isLoggedIn() {
            return Volunteer.isAuthenticated();
        };

        service.getUserId = function getUserId() {
            return localStorage.get('user.data').id || null;
        };

        service.getUserData = function getUserData() {
            return localStorage.get('user.data') || null;
        };

        return service;
    }

    function accountService($q, Volunteer) {
        var service = {};

        service.signUp = function signUp(data) {
            return Volunteer.create(data)
                    .$promise;
        };

        service.prepareUserData = function prepareUserData(userFormData) {
            var data = angular.copy(userFormData);
            var helpWith = '';
            if (data.helpWith) {
                Object.keys(data.helpWith).forEach(function(h) {
                    helpWith += h + ', ';
                });
                helpWith = helpWith.substring(0, helpWith.length-2);
                data.helpWith = helpWith;
            }
            data.collectThings = data.collectThings ? 'yes' : 'no';
            data.projectsInCharge = data.projectsInCharge ? 'yes' : 'no';
            data.keepUpdated = data.keepUpdated ? 'yes' : 'no';
            if (data.birthdate)
                data.birthdate = data.birthdate.substring(8) + '/' + data.birthdate.substring(5, 7) + '/' + data.birthdate.substring(0, 4);

            return $q.resolve(data);
        };

        return service;
    }

})();
