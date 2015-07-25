(function() {
    'use strict';

    angular
        .module('app')
        .config(routes);

    routes.$inject('$stateProvider', '$urlRouterProvider');

    function routes($stateProvider, $urlRouterProvider) {
        $stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/layout/menu.html'
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
