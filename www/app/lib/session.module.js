(function() {
    'use strict';

    angular
        .module('session', ['storage'])
        .factory('userSession', userSession);

    userSession.$inject = ['localStorage'];

    function userSession(storage) {
        var prefix = 'user';
        return {
            logout: function logout() {
                storage.remove(prefix + '.loggedIn');
            },
            isLogged: function isLogged() {
                return storage.get(prefix + '.loggedIn') || false;
            }
        };
    }

})();
