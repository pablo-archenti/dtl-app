(function() {
    'use strict';

    angular
        .module('dtl')
        .factory('dtlDevice', dtlDevice);

    dtlDevice.$inject = ['DeviceToken', 'deviceSession', 'dtlVolunteer'];

    function dtlDevice(DeviceToken, deviceSession, dtlVolunteer) {
        var service = {};

        service.setToken = function(token) {
            var savedToken = deviceSession.getToken();
            if (token && (!savedToken || token !== savedToken)) {
                var data = {};
                data.token = token;
                if (dtlVolunteer.getId()) data.volunteerId =  dtlVolunteer.getId();
                return DeviceToken.upsert(data).$promise
                .then(function() {
                    deviceSession.setToken(token);
                });
            }
        };

        service.getToken = function getToken() {
            return deviceSession.getToken();
        };

        service.setVolunteer = function setVolunteer() {
            var token = deviceSession.getToken();
            var volunteerId = dtlVolunteer.getId();
            if (token && volunteerId) {
                return DeviceToken.upsert({
                    token: token,
                    volunteerId: volunteerId
                }).$promise;
            }
        };

        service.unsetVolunteer = function unsetVolunteer() {
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
