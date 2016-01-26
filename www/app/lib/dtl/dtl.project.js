(function() {
    'use strict';

    angular
        .module('dtl')
        .factory('dtlProject', dtlProject);

    dtlProject.$inject = ['userSession', 'Project', 'Volunteer', 'dtlResource'];

    function dtlProject(userSession, Project, Volunteer, dtlResourceProvider) {
        var service = {};

        function prepareQuery(where, options) {
            var query = {};
            query.filter = {};
            query.filter.where = where || {};
            query.filter.limit = options.limit || dtlResourceProvider.limit || 10;
            query.filter.skip = options.page && (options.page*query.filter.limit) || 0;
            query.filter.order = (options.orderBy || 'id') + ' ' + (options.sort || 'DESC');
            return query;
        }

        service.find = function(where, options) {
            return Project.find(prepareQuery(where, options))
            .$promise;
        };

        service.findById = function(id, include) {
            var query = {};
            query.id = id;
            query.filter = include && { include: include } || {};
            return Project.findById(query)
            .$promise;
        };

        service.findSubscribed = function findSubscribed(where, options) {
            var query = prepareQuery(where, options);
            query.id = userSession.getUserId();
            return Volunteer.projects(query)
            .$promise;
        };

        service.isSuscribed = function isSuscribed(id) {
            return Volunteer.projects.exists({
                id: userSession.getUserId(),
                fk: id
            })
            .$promise;
        };

        return service;
    }

})();
