(function() {
    'use strict';

    angular
        .module('app', [
            'ionic',
            'dtl',
            'session',
            'projects',
            'myaccount'
        ])
        .run(ionicRun);

    ionicRun.$inject = ['$ionicPlatform'];

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

})();
