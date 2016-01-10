(function() {
    'use strict';

    angular
        .module('dtl', ['dtlClient','session'])
        .provider('dtlResource', dtlResourceProvider)
        .config(pushInterceptors)
        .factory('dtlErrorsInterceptor', dtlErrorsInterceptor);

    dtlResourceProvider.$inject = ['LoopBackResourceProvider'];
    pushInterceptors.$inject = ['$httpProvider'];
    dtlErrorsInterceptor.$inject = ['$q', '$log'];

    function dtlResourceProvider(LoopBackResourceProvider) {
        return LoopBackResourceProvider;
    }

    function pushInterceptors($httpProvider) {
        $httpProvider.interceptors.push('dtlErrorsInterceptor');
    }

    function dtlErrorsInterceptor($q, $log) {
        return {
            responseError: function(rejection) {
                var err = new Error(rejection.data.error.message);
                var codes = [];
                err.status = rejection.status;
                err.name = rejection.data.error.name;
                if (rejection.data.error.details && rejection.data.error.details.codes) {
                    Object.keys(rejection.data.error.details.codes).forEach(function(field) {
                        codes.push(rejection.data.error.details.codes[field][0]);
                    });
                    err.codes = codes;
                }
                err.code = codes[0] || null;
                $log.debug(err + ', serviceError: ', rejection);
                return $q.reject(err);
            }
        };
    }

})();
