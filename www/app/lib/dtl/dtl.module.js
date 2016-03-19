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

})();
