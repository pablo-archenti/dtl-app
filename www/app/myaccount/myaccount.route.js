(function() {
    'use strict';

    angular
        .module('myaccount')
        .config(routes);

        routes.$inject = ['$stateProvider'];

        function routes($stateProvider) {
            $stateProvider

            .state('app.myaccount', {
                url: '/myaccount',
                views: {
                    menuContent: {
                        templateUrl: 'app/myaccount/templates/myaccount.html',
                        controller: 'MyAccountCtrl'
                    }
                }
            })

            .state('app.login', {
                url: '/login',
                views: {
                    menuContent: {
                        templateUrl: 'app/myaccount/templates/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })

            .state('app.editMyAccount', {
                url: '/editMyAccount',
                abstract: true,
                views: {
                    menuContent: {
                        templateUrl: 'app/myaccount/templates/myData.html',
                        controller: 'EditMyAccountCtrl'
                    }
                }
            })
            .state('app.editMyAccount.step1', {
                url: '/step1',
                templateUrl: 'app/myaccount/templates/myDataStep1.html'
            })
            .state('app.editMyAccount.step2', {
                url: '/step2',
                templateUrl: 'app/myaccount/templates/myDataStep2.html'
            })
            .state('app.editMyAccount.step3', {
                url: '/step3',
                templateUrl: 'app/myaccount/templates/myDataStep3.html'
            })

            .state('app.signup', {
                url: '/signup',
                abstract: true,
                views: {
                    menuContent: {
                        templateUrl: 'app/myaccount/templates/myData.html',
                        controller: 'SignupCtrl'
                    }
                }
            })
            .state('app.signup.step1', {
                url: '/step1',
                templateUrl: 'app/myaccount/templates/myDataStep1.html'
            })
            .state('app.signup.step2', {
                url: '/step2',
                templateUrl: 'app/myaccount/templates/myDataStep2.html'
            })
            .state('app.signup.step3', {
                url: '/step3',
                templateUrl: 'app/myaccount/templates/myDataStep3.html'
            });
        }
})();
