(function() {
    'use strict';

    angular
        .module('join')
        .config(routes);

        routes.$inject('$stateProvider');

        function routes($stateProvider) {
            $stateProvider

            .state('app.join', {
                url: '/join',
                abstract: true,
                views: {
                    menuContent: {
                        templateUrl: 'app/join/templates/join.html',
                        controller: 'JoinCtrl'
                    }
                }
            })

            .state('app.join.user', {
                url: '/user',
                views: {
                    form: {
                        templateUrl: 'app/join/templates/joinUser.html'
                    }
                }
            })

            .state('app.join.help', {
                url: '/help',
                views: {
                    form: {
                        templateUrl: 'app/join/templates/joinHelp.html'
                    }
                }
            })

            .state('app.join.other', {
                url: '/other',
                views: {
                    form: {
                        templateUrl: 'app/join/templates/joinOther.html'
                    }
                }
            });
        }

})();
