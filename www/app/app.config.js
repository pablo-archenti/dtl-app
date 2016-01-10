(function() {
    'use strict';

    var config = {
        app: {
            debugEnabled: true
        },
        dtl: {
            //apiUrlBase: 'http://api-desdetulugar.rhcloud.com/api/'
            apiUrlBase: 'http://localhost:3030/api'
        },
        texts: {
            "account.exists": 'Ya existe un usuario con el email ingresado',
            "account.notExists": 'La cuenta no existe. Registrate y comenzá a ayudar!',
            "account.confirmDeletion": 'Tu cuenta se eliminará por completo!!',
            "account.deleted": 'Tu cuenta ha sido eliminada',
            "loggingOut": 'Cerrando sesión...',
            "deletingAccount": 'Eliminando cuenta...',
            "updatingData": 'Actualizando datos...',
            "loggingIn": 'Iniciando sesión...',
            "sendingCode": 'Enviando email...',
            "signingUp": 'Finalizando registración...'
        }
    };

    angular
        .module('app')
        .constant('appConfig', config.app)
        .constant('dtlConfig', config.dtl)
        .constant('appTexts', config.texts)
        .config(app)
        .config(dtl)
        .config(uiModule);

    app.$inject       = ['$logProvider', 'appConfig'];
    dtl.$inject       = ['dtlResourceProvider', 'dtlConfig'];
    uiModule.$inject  = ['uiResourceProvider', 'appTexts'];

    function app($logProvider, appConfig) {
        $logProvider.debugEnabled(appConfig.debugEnabled);
    }

    function dtl(dtlResourceProvider, dtlConfig) {
        dtlResourceProvider.setUrlBase(dtlConfig.apiUrlBase);
    }

    function uiModule(uiResourceProvider, appTexts) {
        uiResourceProvider.setTexts(appTexts);
    }

})();
