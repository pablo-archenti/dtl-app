(function() {
    'use strict';

    angular
        .module('session', ['storage', 'dtlClient'])
        .factory('userSession', userSession);

    userSession.$inject = ['localStorage', 'Volunteer', 'LoopBackAuth'];

    function userSession(localStorage, Volunteer, LoopBackAuth) {
        var session = {};

        session.isAuthenticated = function isAuthenticated() {
            return Volunteer.isAuthenticated();
        };

        session.getUserId = function getUserId() {
            var userData = session.getUserData();
            return userData && userData.id || null;
        };

        session.getUserData = function getUserData() {
            return localStorage.get('user.data') || null;
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
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
        };

        return session;
    }

})();
