(function() {
    'use strict';

    angular
        .module('app')
        .config(routes);

    routes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routes($stateProvider, $urlRouterProvider) {
        $stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/layout/menu.html'
        })

        .state('app.configure', {
            url: '/configure',
            views: {
                menuContent: {
                    templateUrl: 'app/configure/configure.html'
                }
            }
        });

        $urlRouterProvider.otherwise('/app/projects');
    }

})();
