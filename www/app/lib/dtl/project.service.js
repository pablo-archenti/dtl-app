(function() {
    'use strict';

    angular
        .module('dtl')
        .factory('dtlProject', dtlProject);

    dtlProject.$inject = ['userSession', 'Project', 'Volunteer', 'dtlResource'];

    function dtlProject(userSession, Project, Volunteer, dtlResourceProvider) {
        var service = {};

        service.find = function find(filter) {
            filter = filter || {};
            filter.limit = filter.limit || dtlResourceProvider.limit || null;
            filter.skip = filter.page && (filter.page*filter.limit) || 0;
            filter.order = (filter.orderBy || 'id') + ' ' + (filter.sort || 'DESC');
            return Project.find({ filter: filter })
            .$promise;
        };

        service.count = function count() {
            return
        };

        service.findByStatus = function findByStatus(status, options) {
            var filter = options || {};
            filter.where = status && { status: status } || {};
            return service.find(filter);
        };

        /*service.findSubscribed = function findSubscribed(filter) {
            return;
        };

        service.findSubscribedByStatus = function findSubscribedByStatus(status) {
            return;
        };*/

        return service;
    }

})();
