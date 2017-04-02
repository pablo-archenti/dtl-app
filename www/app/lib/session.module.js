(function() {
    'use strict';

    angular
    .module('session', ['storage'])
    .factory('userSession', userSession)
    .factory('goBackState', goBackState)
    .factory('deviceSession', deviceSession);

    userSession.$inject = ['localStorage'];
    deviceSession.$inject = ['localStorage'];

    function userSession(storage) {
        var session = {};

        session.getUserId = function getUserId() {
            var userData = session.getUserData();
            return userData && userData.id || null;
        };

        session.getUserData = function getUserData() {
            return storage.get('user.data');
        };

        session.setUserData = function setUserData(data) {
            storage.set('user.data', data);
        };

        session.getToken = function getToken() {
            return storage.get('user.token');
        };

        session.setToken = function setToken(token) {
            storage.set('user.token', token);
        };

        session.clearSession = function clearSession() {
            storage.remove('user.data');
            storage.remove('user.token');
        };

        return session;
    }

    function goBackState() {
        var state = null;
        var params = {};

        return {
            save: function(s, p) {
                state = s;
                params = p;
            },
            getState: function(defaultState) {
                var s = state || defaultState;
                state = null;
                return s;
            },
            getParams: function(defaultParams) {
                var p = params || defaultParams || {};
                params = {};
                return p;
            }
        };
    }

    function deviceSession(storage) {

        return {
            setToken: function(token) {
                storage.set('device.token', token);
            },
            getToken: function() {
                return storage.get('device.token') || null;
            }
        };
    }

})();
