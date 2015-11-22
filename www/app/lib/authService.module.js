(function() {
    'use strict';

    angular
        .module('authService', ['dtlService'])
        .factory('authService', authService);

    authService.$inject = ['Volunteer'];

    function authService(Volunteer) {
        var service = {};

        service.login = function login(credentials) {
            return Volunteer.login({
                email: credentials.email,
                code: credentials.code
            })
            .$promise
            .then(function(accessToken) {

                return true;
            });
        };

        service.sendLoginCode = function sendLoginCode(email) {
            return Volunteer.sendLoginCode({
                email: email
            })
            .$promise
            .then(function(code) {

                return true;
            })
            .catch(function(err) {
                console.log(err);
            });
        };

        service.isAuthenticated = function isAuthenticated() {
            return Volunteer.isAuthenticated();
        };

        return service;
    }

})();
