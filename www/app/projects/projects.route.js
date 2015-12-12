(function() {
    'use strict';

    angular
        .module('projects')
        .config(routes);

    routes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routes($stateProvider, $urlRouterProvider) {
        $stateProvider

        .state('app.projectsList', {
            url: '/projects',
            views: {
                menuContent: {
                    templateUrl: 'app/projects/templates/projectsList.html',
                    controller: 'ProjectsListCtrl'
                }
            }
        })

        .state('app.projectsShow', {
            url: '/projects/{id:int}',
            views: {
                menuContent: {
                    templateUrl: 'app/projects/templates/projectsShow.html',
                    controller: 'ProjectsShowCtrl'
                }
            }
        });

        $urlRouterProvider.otherwise('/app/projects');
    }

})();
