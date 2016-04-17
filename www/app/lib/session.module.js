(function() {
    'use strict';

    angular
    .module('session', ['storage'])
    .factory('userSession', userSession)
    .factory('goBackState', goBackState)
    .factory('deviceSession', deviceSession);

    userSession.$inject = ['localStorage'];
    deviceSession.$inject = ['localStorage'];

    function userSession(localStorage) {
        var session = {};

        session.getUserId = function getUserId() {
            var userData = session.getUserData();
            return userData && userData.id || null;
        };

        session.getUserData = function getUserData() {
            return localStorage.get('user.data');
        };

        session.setUserData = function setUserData(data) {
            localStorage.set('user.data', data);
        };

        session.getToken = function getToken() {
            return localStorage.get('user.token');
        };

        session.setToken = function setToken(token) {
            localStorage.set('user.token', token);
        };

        session.clearSession = function clearSession() {
            localStorage.remove('user.data');
            localStorage.remove('user.token');
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

    function deviceSession(localStorage) {

        return {
            setToken: function(token) {
                localStorage.set('device.token', token);
            },
            getToken: function() {
                return localStorage.get('device.token') || null;
            }
        };
    }

})();
