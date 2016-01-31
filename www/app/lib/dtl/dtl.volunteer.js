(function() {
    'use strict';

    angular
        .module('dtl')
        .factory('dtlVolunteer', dtlVolunteer);

    dtlVolunteer.$inject = ['userSession', 'Volunteer'];

    function dtlVolunteer(userSession, Volunteer) {
        var service = {};

        service.login = function login(credentials) {
            return Volunteer.login({
                email: credentials.email,
                code: credentials.code
            })
            .$promise
            .then(function(accessToken) {
                userSession.setToken(accessToken.id);
                userSession.setUserData(posUserData(accessToken.user));
            })
            .then(function() {
                return true;
            });
        };

        service.sendLoginCode = function sendLoginCode(email) {
            return Volunteer.sendLoginCode({
                email: email
            })
            .$promise
            .then(function() {
                return true;
            });
        };

        service.logout = function logout() {
            self = this;
            return Volunteer.logout()
            .$promise
            .then(function() {
                return userSession.clearSession();
            })
            .then(function() {
                return true;
            });
        };

        service.createAccount = function createAccount(data) {
            return  Volunteer.create(preUserData(data)).$promise;
        };

        service.deleteAccount = function deleteAccount() {
            return Volunteer.deleteById({
                        id: userSession.getUserId()
                    })
                    .$promise
                    .then(function() {
                        userSession.clearSession();
                    });
        };

        service.getAccount = function getAccount() {
            return Volunteer.findById({
                        id: userSession.getUserId()
                    })
                    .$promise
                    .then(function(data) {
                        data = posUserData(data);
                        userSession.setUserData(data);
                        return data;
                    });
        };

        service.updateAccount = function updateAccount(data) {
            return Volunteer.prototype$updateAttributes({
                            id: userSession.getUserId()
                        },
                            preUserData(data)
                    )
                    .$promise
                    .then(function(data) {
                        data = posUserData(data);
                        userSession.setUserData(data);
                        return data;
                    });
        };

        service.isSuscribed = function isSuscribed(projectId) {
            return Volunteer.projects.exists({
                id: userSession.getUserId(),
                fk: projectId
            })
            .$promise;
        };

        service.suscribe = function suscribe(projectId, help) {
            return Volunteer.projects.create({
                id: userSession.getUserId(),
                fk: projectId,
                data: {
                    help: help
                }
            })
            .$promise;
        };

        service.unsuscribe = function unsuscribe(projectId) {
            return Volunteer.projects.remove({
                id: userSession.getUserId(),
                fk: projectId
            })
            .$promise;
        };

        function preUserData(userData) {
            var data = angular.copy(userData);
            var helpWith = '';
            if (data.helpWith) {
                Object.keys(data.helpWith).forEach(function(h) {
                    if (data.helpWith[h]) {
                        helpWith += h + ', ';
                    }
                });
                helpWith = helpWith.substring(0, helpWith.length-2);
                data.helpWith = helpWith;
            }
            data.collectThings = data.collectThings ? 'yes' : 'no';
            data.projectsInCharge = data.projectsInCharge ? 'yes' : 'no';
            data.keepUpdated = data.keepUpdated ? 'yes' : 'no';
            if (data.birthdate)
                data.birthdate = data.birthdate.substring(8) + '/' + data.birthdate.substring(5, 7) + '/' + data.birthdate.substring(0, 4);

            return data;
        }

        function posUserData(userData) {
            var data = angular.copy(userData);

            if (data.birthdate)
                data.birthdate = data.birthdate.substring(6) + '-' + data.birthdate.substring(3, 5) + '-' + data.birthdate.substring(0, 2);

            if (data.helpWith) {
                var help = data.helpWith.split(", ");
                data.helpWith = {};
                help.forEach(function(help) {
                    data.helpWith[help] = true;
                });
            }

            data.projectsInCharge = data.projectsInCharge === 'yes' ? true : false;
            data.collectThings = data.collectThings === 'yes' ? true : false;
            data.keepUpdated = data.keepUpdated === 'yes' ? true : false;

            return data;
        }

        return service;
    }

})();
