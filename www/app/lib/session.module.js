(function() {
    'use strict';

    angular
        .module('session', ['storage'])
        .factory('userSession', userSession);

    userSession.$inject = ['localStorage'];

    function userSession(localStorage) {
        var userSession = {
            login: login,
            logout: logout,
            isLogged: isLogged
        };
        return userSession;

        function login(email, code) {

            localStorage.set('user.loggedIn', true);
        }

        function logout() {
            localStorage.remove('user.loggedIn');
        }

        function isLogged() {
            return localStorage.get('user.loggedIn') || false;
        }
    }

})();
