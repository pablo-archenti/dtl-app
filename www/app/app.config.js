(function() {
    'use strict';

    var config = {
        app: {
            debug: true
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
    .config(uiModule)
    .run(ionicRun);

    ionicRun.$inject = ['$ionicPlatform', 'appConfig', '$ionicPush', 'dtlDevice'];
    app.$inject       = ['$logProvider', 'appConfig'];
    dtl.$inject       = ['dtlResourceProvider', 'dtlConfig'];
    uiModule.$inject  = ['uiResourceProvider', 'appTexts'];

    function ionicRun($ionicPlatform, appConfig, $ionicPush, dtlDevice) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
        $ionicPlatform.ready(function() {
            $ionicPush.init({
                debug: appConfig.debug,
                onNotification: function(notification) {
                    var payload = notification.payload;
                    console.log(notification, payload);
                },
                onRegister: function(data) {
                    dtlDevice.setToken(data.token);
                }
            });
            $ionicPush.register();
        });
    }

    function app($logProvider, appConfig) {
        $logProvider.debugEnabled(appConfig.debug);
    }

    function dtl(dtlResourceProvider, dtlConfig) {
        dtlResourceProvider.setUrlBase(dtlConfig.apiUrlBase);
        dtlResourceProvider.setPaginationLimit(dtlConfig.paginationLimit);
    }

    function uiModule(uiResourceProvider, appTexts) {
        uiResourceProvider.setTexts(appTexts);
    }

})();
