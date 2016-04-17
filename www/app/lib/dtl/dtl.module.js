(function() {
    'use strict';

    angular
        .module('dtl', ['dtlClient','session'])
        .provider('dtlResource', dtlResourceProvider)
        .config(pushInterceptors)
        .factory('dtlErrorsInterceptor', dtlErrorsInterceptor)
        .factory('dtlQuery', dtlQuery);

    dtlResourceProvider.$inject = ['LoopBackResourceProvider'];
    pushInterceptors.$inject = ['$httpProvider'];
    dtlErrorsInterceptor.$inject = ['$q', '$log'];
    dtlQuery.$inject = ['dtlResource'];

    function dtlResourceProvider(LoopBackResourceProvider) {
        var limit = null;

        return {
            setPaginationLimit: function(l) {
                limit = l;
            },
            setUrlBase: function(url) {
                LoopBackResourceProvider.setUrlBase(url);
            },
            $get: function () {
                return {
                    limit: limit
                };
            }
        };
    }

    function pushInterceptors($httpProvider) {
        $httpProvider.interceptors.push('dtlErrorsInterceptor');
    }

    function dtlErrorsInterceptor($q, $log) {
        return {
            responseError: function(rejection) {
                var error = rejection.data && rejection.data.error || {};
                var message = error.message || rejection.statusText;
                var codes = [];

                var myError = new Error(message);
                myError.status = rejection.status;
                if (error.details && error.details.codes) {
                    Object.keys(error.details.codes).forEach(function(field) {
                        codes.push(error.details.codes[field][0]);
                    });
                    myError.codes = codes;
                }
                myError.code = codes[0] || error.code || null;
                $log.debug(myError + ', serviceError: ', error);

                return $q.reject(myError);
            }
        };
    }

    function dtlQuery(dtlResource) {
        var service = {};

        service.prepare = function prepare(where, options, include) {
            var query = {};
            options = options || {};

            query.filter = {};
            query.filter.where = where || {};
            query.filter.include = include || {};
            query.filter.limit = options.limit || dtlResource.limit || 10;
            query.filter.skip = options.page && (options.page*query.filter.limit) || 0;
            query.filter.order = (options.orderBy || 'id') + ' ' + (options.sort || 'DESC');
            return query;
        };

        return service;
    }

})();
