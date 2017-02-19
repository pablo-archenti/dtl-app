(function() {
    'use strict';

    angular
        .module('dtl')
        .factory('dtlVolunteer', dtlVolunteer);

    dtlVolunteer.$inject = ['Volunteer', 'userSession', 'dtlQuery'];

    function dtlVolunteer(Volunteer, userSession, dtlQuery) {
        var service = {};

        service.isAuthenticated = function isAuthenticated() {
            return Volunteer.isAuthenticated();
        };

        service.getId = function getId() {
            return userSession.getUserId();
        };

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

        service.deleteAccount = function deleteAccount() {
            var self = this;
            return Volunteer.deleteById({
                        id: this.getId()
                    })
                    .$promise;
        };

        service.createAccount = function createAccount(data) {
            return  Volunteer.create(preUserData(data)).$promise;
        };

        service.getAccount = function getAccount() {
            return Volunteer.findById({
                        id: this.getId()
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
                            id: this.getId()
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

        service.isSubscribed = function isSubscribed(projectId) {
            return Volunteer.projects.exists({
                        id: this.getId(),
                        fk: projectId
                    }).$promise;
        };

        service.subscribe = function subscribe(projectId, data) {
            data = data || {};
            return Volunteer.projects.link({
                        id: this.getId()
                    },
                    {
                        fk: projectId,
                        help: data.help || null,
                        volunteerId: this.getId()
                    }).$promise;
        };

        service.unsubscribe = function unsubscribe(projectId) {
            return Volunteer.projects.unlink({
                id: this.getId(),
                fk: projectId
            })
            .$promise;
        };

        service.getProjects = function getProjects(where, options) {
            var query = dtlQuery.prepare(where, options);
            query.id = this.getId();
            return Volunteer.projects(query).$promise;
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
