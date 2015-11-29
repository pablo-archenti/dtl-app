(function() {
    'use strict';

    angular
        .module('app', [
            'ionic',
            'dtlServiceSetup',
            'ui',
            'projects',
            'myaccount'
        ])
        .run(setGlobalModules)
        .run(ionicRun);

    ionicRun.$inject = ['$ionicPlatform'];
    setGlobalModules.$inject = ['$rootScope', 'loader', 'alert'];

    function ionicRun($ionicPlatform) {
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
    }

    function setGlobalModules($rootScope, loader, alert) {
        $rootScope.ui = {
            loader: loader,
            alert: alert
        };
    }

})();
