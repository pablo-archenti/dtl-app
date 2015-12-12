(function() {
    'use strict';

    angular
        .module('userService', ['session', 'dtlService'])
        .factory('accountService', accountService);

    accountService.$inject = ['userSession', 'Volunteer', '$q'];

    function accountService(userSession, Volunteer, $q) {
        var service = {};

        service.login = function login(credentials) {
            return Volunteer.login({
                email: credentials.email,
                code: credentials.code
            })
            .$promise
            .then(function(accessToken) {
                userSession.setToken(accessToken.id);
                userSession.setUserData(posUserData(accessToken.user));
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
                return userSession.clearSession();
            })
            .then(function() {
                return true;
            });
        };

        service.createAccount = function createAccount(data) {
            return  preUserData(data)
                    .then(function(data) {
                        return Volunteer.create(data).$promise;
                    });
        };

        service.deleteAccount = function deleteAccount() {
            return Volunteer.deleteById({
                        id: userSession.getUserId()
                    })
                    .$promise
                    .then(function() {
                        userSession.clearSession();
                    });
        };

        service.getAccount = function getAccount() {
            return Volunteer.findById({
                        id: userSession.getUserId()
                    })
                    .$promise
                    .then(function(data) {
                        return posUserData(data);
                    })
                    .then(function(data) {
                        userSession.setUserData(data);
                        return data;
                    });
        };

        function preUserData(userData) {
            var data = angular.copy(userData);
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
        }

        function posUserData(userData) {
            var data = angular.copy(userData);

            //to finish

            return $q.resolve(data);
        }


        return service;
    }

})();
