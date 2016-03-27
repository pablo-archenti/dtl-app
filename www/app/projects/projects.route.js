(function() {
    'use strict';

    angular
    .module('projects')
    .config(routes);

    routes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routes($stateProvider) {
        $stateProvider

        .state('app.projects', {
            url: '/projects',
            abstract: true,
            views: {
                menuContent: {
                    templateUrl: 'app/projects/templates/main.html'
                }
            }
        })

        .state('app.projects.list', {
            url: '/list',
            templateUrl: 'app/projects/templates/list.html',
            controller: 'ListProjectsCtrl'
        })

        .state('app.projects.show', {
            url: '/show/{id:int}',
            templateUrl: 'app/projects/templates/show.html',
            controller: 'ShowProjectCtrl'
        });
    }

})();
