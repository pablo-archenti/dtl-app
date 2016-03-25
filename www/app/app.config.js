(function() {
    'use strict';

    var ENV = 'dev';

    var config = {
        dev: {
            debug: true,
            apiUrlBase: 'http://localhost:3030/api'
        },
        testing: {
            debug: true,
            apiUrlBase: 'http://api-desdetulugar.rhcloud.com/api'
        },
        prod: {
            debug: false,
            apiUrlBase: 'http://api-desdetulugar.rhcloud.com/api'
        },
        app: {
            paginationLimit: 10,
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
        }
    };

    angular
    .module('app')
    .constant('envConfig', config[ENV])
    .constant('appConfig', config.app)
    .constant('shareProjectConfig', config.app.shareProject)
    .config(app)
    .config(dtl)
    .config(uiModule)
    .run(ionicRun);

    app.$inject       = ['$logProvider', 'envConfig'];
    dtl.$inject       = ['dtlResourceProvider', 'envConfig', 'appConfig'];
    uiModule.$inject  = ['uiResourceProvider', 'appConfig'];
    ionicRun.$inject = ['$ionicPlatform', 'envConfig', '$ionicPush', 'dtlDevice', '$log', '$state'];

    function app($logProvider, envConfig) {
        $logProvider.debugEnabled(envConfig.debug);
    }

    function dtl(dtlResourceProvider, envConfig, appConfig) {
        dtlResourceProvider.setUrlBase(envConfig.apiUrlBase);
        dtlResourceProvider.setPaginationLimit(appConfig.paginationLimit);
    }

    function uiModule(uiResourceProvider, appConfig) {
        uiResourceProvider.setTexts(appConfig.texts);
    }

    function ionicRun($ionicPlatform, envConfig, $ionicPush, dtlDevice, $log, $state) {
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
                debug: envConfig.debug,
                onNotification: function(notification) {
                    alert('hola');
                    $log.debug("Notification received: ", JSON.stringify(notification));
                    $state.go('app.login');
                    setTimeout(function() {
                        $state.go('app.login');
                    }, 3000);

                },
                onRegister: function(data) {
                    dtlDevice.setToken(data.token);
                }
            });
            $ionicPush.register();
        });
    }

})();
