(function() {
    'use strict';

    angular
        .module('app')
        .constant('config', {
            'dtlServices': {
                'apiUrlBase': 'http://localhost:3000/api/'
            }
        })
        .config(setUpDtlServices);

        setUpDtlServices.$inject = ['LoopBackResourceProvider', 'config'];

        function setUpDtlServices(LoopBackResourceProvider, config) {
            LoopBackResourceProvider.setUrlBase(config.dtlServices.apiUrlBase);
        }

})();
