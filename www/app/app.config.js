(function() {
    'use strict';

    var config = {
        app: {
            debugEnabled: true
        },
        dtlService: {
            apiUrlBase: 'http://api-desdetulugar.rhcloud.com/api/'
            //apiUrlBase: 'http://localhost:3030/api'
        },
        texts: {
            "noConnection": 'Aparentemente no estás conectado a Internet. Verificá tu conexión e inténtalo nuevamente.',
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
        .constant('dtlServiceConfig', config.dtlService)
        .constant('appTexts', config.texts)
        .config(app)
        .config(dtlService)
        .config(uiModule);

    app.$inject        = ['$logProvider', 'appConfig'];
    dtlService.$inject = ['dtlServiceResourceProvider', 'dtlServiceConfig'];
    uiModule.$inject   = ['uiResourceProvider', 'appTexts'];

    function app($logProvider, appConfig) {
        $logProvider.debugEnabled(appConfig.debugEnabled);
    }

    function dtlService(dtlServiceResourceProvider, dtlServiceConfig) {
        dtlServiceResourceProvider.setUrlBase(dtlServiceConfig.apiUrlBase);
    }

    function uiModule(uiResourceProvider, appTexts) {
        uiResourceProvider.setTexts(appTexts);
    }

})();
