(function() {
    'use strict';

    angular
        .module('app')
        .constant('config', {
            'dtlService': {
                'apiUrlBase': 'http://localhost:3000/api/'
            }
        })
        .config(setUpDtlService);

        setUpDtlService.$inject = ['LoopBackResourceProvider', 'config'];

        function setUpDtlService(LoopBackResourceProvider, config) {
            LoopBackResourceProvider.setUrlBase(config.dtlService.apiUrlBase);
        }

})();
