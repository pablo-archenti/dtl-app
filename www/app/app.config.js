(function() {
    'use strict';

    var config = {
        app: {
            debugEnabled: true
        },
        dtlService: {
            apiUrlBase: 'http://localhost:3000/api/'
        }
    };

    angular
        .module('app')
        .constant('appConfig', config.app)
        .constant('dtlServiceConfig', config.dtlService)
        .config(dtlService)
        .config(app);

    dtlService.$inject = ['dtlServiceResourceProvider', 'dtlServiceConfig'];
    dtlService.app = ['$logProvider', 'appConfig'];

    function app($logProvider, appConfig) {
        $logProvider.debugEnabled(appConfig.debugEnabled);
    }

    function dtlService(dtlServiceResourceProvider, dtlServiceConfig) {
        dtlServiceResourceProvider.setUrlBase(dtlServiceConfig.apiUrlBase);
    }

})();
