(function() {
    'use strict';

    angular
        .module('app')
        .config(routes);

    function routes($stateProvider, $urlRouterProvider) {
        $stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/layout/menu.html'
        })

        .state('app.projectsList', {
            url: '/projects',
            views: {
                menuContent: {
                    templateUrl: 'app/projects/projectsList.html',
                    controller: 'ProjectsListCtrl'
                }
            }
        })

        .state('app.projectsShow', {
            url: '/projects/{id:int}',
            views: {
                menuContent: {
                    templateUrl: 'app/projects/projectsShow.html',
                    controller: 'ProjectsShowCtrl'
                }
            }
        })

        .state('app.join', {
            url: '/join',
            abstract: true,
            views: {
                menuContent: {
                    templateUrl: 'app/join/join.html',
                    controller: 'JoinCtrl'
                }
            }
        })

        .state('app.join.user', {
            url: '/user',
            views: {
                form: {
                    templateUrl: 'app/join/joinUser.html'
                }
            }
        })

        .state('app.join.help', {
            url: '/help',
            views: {
                form: {
                    templateUrl: 'app/join/joinHelp.html'
                }
            }
        })

        .state('app.join.other', {
            url: '/other',
            views: {
                form: {
                    templateUrl: 'app/join/joinOther.html'
                }
            }
        })

        .state('app.howItWorks', {
            url: '/howItWorks',
            views: {
                menuContent: {
                    templateUrl: 'app/howItWorks/howItWorks.html'
                }
            }
        })

        .state('app.whoAreWe', {
            url: '/whoAreWe',
            views: {
                menuContent: {
                    templateUrl: 'app/whoAreWe/whoAreWe.html'
                }
            }
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
