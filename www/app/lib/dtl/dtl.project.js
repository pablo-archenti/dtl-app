(function() {
    'use strict';

    angular
        .module('dtl')
        .factory('dtlProject', dtlProject);

    dtlProject.$inject = ['Project', 'dtlQuery'];

    function dtlProject(Project, dtlQuery) {
        var service = {};

        service.find = function(where, options) {
            return Project.find(dtlQuery.prepare(where, options)).$promise;
        };

        service.findById = function(id, include) {
            var query = dtlQuery.prepare({}, {}, include);
            query.id = id;
            return Project.findById(query).$promise;
        };

        return service;
    }

})();
