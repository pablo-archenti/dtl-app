(function() {
    'use strict';

    angular
        .module('dtl')
        .factory('dtlQuery', dtlQuery);

    dtlQuery.$inject = ['dtlResource'];

    function dtlQuery(dtlResourceProvider) {
        var service = {};

        service.prepare = function prepare(where, options, include) {
            var query = {};
            options = options || {};
            query.filter = {};
            query.filter.where = where || {};
            query.filter.include = include || {};
            query.filter.limit = options.limit || dtlResourceProvider.limit || 10;
            query.filter.skip = options.page && (options.page*query.filter.limit) || 0;
            query.filter.order = (options.orderBy || 'id') + ' ' + (options.sort || 'DESC');
            return query;
        };

        return service;
    }

})();
