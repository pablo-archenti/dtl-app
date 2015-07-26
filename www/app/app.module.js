(function() {
    'use strict';

    angular
        .module('app', [
            'ionic',
            'ionic.service.core',
            'ngMockE2E',
            'projects',
            'myaccount'
        ])
        .constant('serverUrl', 'http://server.com/')
        .run(ionicRun)
        .run(httpMock);

    ionicRun.$inject = ['$ionicPlatform'];
    httpMock.$inject = ['$rootScope', '$ionicPlatform', '$httpBackend', '$http'];

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

    function httpMock($rootScope, $ionicPlatform, $httpBackend) {
        var authorized = false;

        $httpBackend.whenPOST('https://login').respond(function() {
            authorized = true;
            return  [200 , { authorizationToken: "NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy" } ];
        });

        $httpBackend.whenPOST('https://logout').respond(function() {
            authorized = false;
            return [200];
        });

        $httpBackend.whenGET(/.*/).passThrough();
    }

})();
