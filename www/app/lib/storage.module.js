(function() {
    'use strict';

    angular
        .module('storage', [])
        .factory('localStorage', localStorage);

        localStorage.$inject = ['$window'];

        function localStorage($window) {
            var service = {
                set: set,
                get: get,
                remove: remove,
                clear: clear
            };
            return service;

            function set(key, value) {
                return $window.localStorage.setItem(key, JSON.stringify(value));
            }

            function get(key) {
                var value = $window.localStorage.getItem(key);
                return value !== undefined ? JSON.parse(value) : null;
            }

            function remove(key) {
                return $window.localStorage.removeItem(key);
            }

            function clear() {
                 return $window.localStorage.clear();
            }

        }
})();
