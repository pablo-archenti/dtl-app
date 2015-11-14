(function() {
    'use strict';

    angular
        .module('session', ['storage'])
        .factory('userSession', userSession);

    userSession.$inject = ['localStorage'];

    function userSession(localStorage) {
        var prefix = 'user';
        var userSession = {
            logout: logout,
            isLogged: isLogged
        };
        return userSession;

        function logout() {
            localStorage.remove(prefix + '.loggedIn');
        }

        function isLogged() {
            return localStorage.get(prefix + '.loggedIn') || false;
        }
    }

})();
