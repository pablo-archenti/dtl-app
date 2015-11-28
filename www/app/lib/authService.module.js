(function() {
    'use strict';

    angular
        .module('authService', ['dtlService', 'storage'])
        .factory('authService', authService);

    authService.$inject = ['Volunteer', 'localStorage'];

    function authService(Volunteer, localStorage) {
        var service = {};

        function createSession(token, data) {
            localStorage.set('user.token', token);
            localStorage.set('user.data', data);
        }

        function clearSession() {
            localStorage.remove('user.data');
            localStorage.remove('user.token');
        }

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

        service.sendLoginCode = function sendLoginCode(email) {
            return Volunteer.sendLoginCode({
                email: email
            })
            .$promise
            .then(function() {
                return true;
            });
        };

        service.logout = function logout() {
            return Volunteer.logout()
            .$promise
            .then(function() {
                return clearSession();
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

})();
