(function() {
    'use strict';

    angular
        .module('user', ['session'])
        .factory('userService', userService);

    userService.$inject = ['userSession'];

    function userService(userSession) {
        var service = {
            login: login
        };
        return service;

        function login() {

        }
    }

})();
