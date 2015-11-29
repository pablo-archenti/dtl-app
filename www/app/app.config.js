(function() {
    'use strict';

    var config = {
        dtlService: {
            apiUrlBase: 'http://localhost:3000/api/'
        }
    };

    angular
        .module('app')
        .constant('dtlServiceConfig', config.dtlService)
        .config(configDtlService);

    configDtlService.$inject = ['dtlServiceResourceProvider', 'dtlServiceConfig'];

    function configDtlService(dtlServiceResourceProvider, dtlServiceConfig) {
        dtlServiceResourceProvider.setUrlBase(dtlServiceConfig.apiUrlBase);
    }

})();
