(function() {
    'use strict';

    angular
        .module('app', [
            'ionic',
            'dtlServiceSetup',
            'ui',
            'session',
            'projects',
            'myaccount'
        ])
        .run(ionicBase)
        .run(ionicInternetConnection);

    ionicBase.$inject = ['$ionicPlatform'];
    ionicInternetConnection.$inject = ['$ionicPlatform', 'alert'];

    function ionicBase($ionicPlatform) {
        $ionicPlatform.ready()
        .then(function() {
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

    function ionicInternetConnection($ionicPlatform, alert) {
        $ionicPlatform.ready()
        .then(function() {
            if (window.Connection) {
                if (navigator.connection.type == Connection.NONE) noConnectionHandler();
                document.addEventListener("offline", noConnectionHandler, false);
            }
        });

        function noConnectionHandler() {
            alert.error('noConnection');
        }
    }

})();
