(function() {
    'use strict';

    var ENV = 'dev';

    var envConfig = {
        dev: {
            debug: true,
            api: {
                baseUrl: 'http://localhost:3030/api'
            },
            android:  {
                appId: null
            }
        },
        testing: {
            debug: true,
            api: {
                baseUrl: 'http://api-desdetulugar.rhcloud.com/api'
            },
            android:  {
                appId: 63635089070
            }
        },
        prod: {
            debug: false,
            api: {
                baseUrl: null
            },
            android:  {
                appId: null
            }
        },
    };

    var config = {
        debug: envConfig[ENV].debug,
        api: envConfig[ENV].api,
        android: envConfig[ENV].android,
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
    };

    angular
    .module('app')
    .constant('appConfig', config)
    .constant('shareProjectConfig', config.shareProject)
    .config(app)
    .config(dtl)
    .config(uiModule)
    .run(ionicRun);

    app.$inject       = ['$logProvider', 'appConfig'];
    dtl.$inject       = ['dtlResourceProvider', 'appConfig'];
    uiModule.$inject  = ['uiResourceProvider', 'appConfig'];
    ionicRun.$inject  = ['$ionicPlatform', 'appConfig', 'dtlDeviceToken', '$log', '$state'];

    function app($logProvider, appConfig) {
        $logProvider.debugEnabled(appConfig.debug);
    }

    function dtl(dtlResourceProvider, appConfig) {
        dtlResourceProvider.setUrlBase(appConfig.api.baseUrl);
        dtlResourceProvider.setPaginationLimit(appConfig.paginationLimit);
    }

    function uiModule(uiResourceProvider, appConfig) {
        uiResourceProvider.setTexts(appConfig.texts);
    }

    function ionicRun($ionicPlatform, appConfig, dtlDeviceToken, $log, $state) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
        $ionicPlatform.ready(function() {
            var push = PushNotification.init({
                android: {
                    senderID: appConfig.android.appId,
                    forceShow: true
                }
            });

            push.on('registration', function(data) {
                dtlDeviceToken.setToken(data.registrationId);
            });

            push.on('notification', function(notification) {
                var state = 'app.projectsList';
                var params = {};
                var additionalData = notification.additionalData || {};
                if (additionalData.deepLink) {
                    state = additionalData.deepLink.state || state;
                    params = additionalData.deepLink.params || params;
                }
                $state.go(state, params);
            });

            push.on('error', function(e) {
                $log.debug(e);
            });
        });
    }

})();
