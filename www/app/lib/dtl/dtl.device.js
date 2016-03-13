(function() {
    'use strict';

    angular
        .module('dtl')
        .factory('dtlDevice', dtlDevice);

    dtlDevice.$inject = ['DeviceToken', 'deviceSession'];

    function dtlDevice(DeviceToken, deviceSession) {
        var service = {};

        service.setToken = function(token) {
            var savedToken = deviceSession.getToken();
            if (!savedToken && token || token !== savedToken && token) {
                return DeviceToken.upsert({ token: token })
                .then(function() {
                    deviceSession.setToken(token);
                });
            }
        };

        service.getToken = function getToken() {
            return deviceSession.getToken();
        };

        service.setVolunteer = function setUser(volunteerId) {
            var token = deviceSession.getToken();
            if (token) {
                return DeviceToken.upsert({
                    token: token,
                    volunteerId: volunteerId
                }).$promise;
            }
        };

        service.unsetVolunteer = function unsetUser() {
            var token = deviceSession.getToken();
            if (token) {
                return DeviceToken.upsert({
                    token: token,
                    volunteerId: null
                }).$promise;
            }
        };

        return service;
    }

})();
