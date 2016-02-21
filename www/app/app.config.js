(function() {
    'use strict';

    var config = {
        app: {
            debugEnabled: true
        },
        dtl: {
            //apiUrlBase: 'http://api-desdetulugar.rhcloud.com/api',
            apiUrlBase: 'http://localhost:3030/api',
            paginationLimit: 10
        },
        texts: {
            "account.exists": 'Ya existe un usuario con el email ingresado',
            "account.notExists": 'La cuenta no existe. Registrate y comenzá a ayudar!',
            "account.deleted": 'Tu cuenta ha sido eliminada',
            "account.confirmDeletion": 'Tu cuenta se eliminará por completo!!',
            "project.confirmUnsubscription": '¿Estás seguro que querés desuscribirte del proyecto?',
            "project.suscribed": "Gracias por suscribirte!!!<br/>Te estaremos contactando pronto.",
            "loggingOut": 'Cerrando sesión...',
            "deletingAccount": 'Eliminando cuenta...',
            "updatingData": 'Actualizando datos...',
            "loggingIn": 'Iniciando sesión...',
            "sendingCode": 'Enviando email...',
            "signingUp": 'Finalizando registración...'
        },
        shareProject: {
            message: 'Sumate y ayudá a cumplir este proyecto!!',
            subject: 'Desde tu lugar',
            link: 'http://desdetulugar.com.ar/?s=proyectos_actuales_ampliado&p={projectId}'
        }
    };

    angular
        .module('app')
        .constant('appConfig', config.app)
        .constant('dtlConfig', config.dtl)
        .constant('appTexts', config.texts)
        .constant('shareProject', config.shareProject)
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
        dtlResourceProvider.setPaginationLimit(dtlConfig.paginationLimit);
    }

    function uiModule(uiResourceProvider, appTexts) {
        uiResourceProvider.setTexts(appTexts);
    }

})();
