(function() {
    'use strict';

    angular
        .module('myaccount')
        .config(routes);

        routes.$inject = ['$stateProvider'];

        function routes($stateProvider) {
            $stateProvider

            .state('app.login', {
                url: '/login',
                views: {
                    menuContent: {
                        templateUrl: 'app/myaccount/templates/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })

            .state('app.signup', {
                url: '/signup',
                abstract: true,
                views: {
                    menuContent: {
                        templateUrl: 'app/myaccount/templates/signup.html',
                        controller: 'SignupCtrl'
                    }
                }
            })
            .state('app.signup.step1', {
                url: '/step1',
                views: {
                    form: {
                        templateUrl: 'app/myaccount/templates/step1.html'
                    }
                }
            })
            .state('app.signup.step2', {
                url: '/step2',
                views: {
                    form: {
                        templateUrl: 'app/myaccount/templates/step2.html'
                    }
                }
            })
            .state('app.signup.step3', {
                url: '/step3',
                views: {
                    form: {
                        templateUrl: 'app/myaccount/templates/step3.html'
                    }
                }
            });
        }
})();
