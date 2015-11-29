(function() {
    'use strict';

    angular
        .module('dtlServiceSetup', ['dtlService'])
        .provider('dtlServiceResource', dtlServiceResourceProvider)
        .config(pushInterceptors)
        .factory('dtlErrorsInterceptor', dtlErrorsInterceptor);

    dtlServiceResourceProvider.$inject = ['LoopBackResourceProvider'];
    pushInterceptors.$inject = ['$httpProvider'];
    dtlErrorsInterceptor.$inject = ['$q'];

    function dtlServiceResourceProvider(LoopBackResourceProvider) {
        return LoopBackResourceProvider;
    }

    function pushInterceptors($httpProvider) {
        $httpProvider.interceptors.push('dtlErrorsInterceptor');
    }

    function dtlErrorsInterceptor($q) {
        return {
            responseError: function(rejection) {
                var err = new Error(rejection.data.error.message);
                var codes = [];
                err.status = rejection.status;
                err.name = rejection.data.error.name;
                Object.keys(rejection.data.error.details.codes).forEach(function(field) {
                    codes.push(rejection.data.error.details.codes[field][0]);
                });
                err.codes = codes;
                err.code = codes[0];
                return $q.reject(err);
            }
        };
    }

})();
