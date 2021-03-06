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
        });
        $urlRouterProvider.when('/app/projects', '/app/projects/list');
        $urlRouterProvider.otherwise('/app/projects/list');
    }

})();
