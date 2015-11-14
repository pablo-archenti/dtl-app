(function() {
    'use strict';

    angular
        .module('myaccount')
        .controller('SignupCtrl', SignupCtrl)
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject  = ['$scope', 'loader', '$timeout', 'userService'];
    SignupCtrl.$inject = ['$scope', '$state', '$ionicPopup', '$timeout', '$ionicHistory'];

    function LoginCtrl($scope, loader, $timeout, userService) {

        $scope.showCode = function() {
            $scope.codeShown = 1;
            $scope.codeHidden = 0;
        };

        $scope.hideCode = function() {
            $scope.codeShown = 0;
            $scope.codeHidden = 1;
        };

        $scope.login = function(email, code) {
            //session.login(email, code);
        };

        $scope.requireCode = function(email) {
            userService.login();
            loader.toggleLoadingWithMessage('Enviando email...', 500);

            $timeout(function() {
                $scope.showCode();
            }, 500);
        };

        $scope.cancelLogin = function() {
            $scope.hideCode();
        };

        $scope.hideCode();
    }

    function SignupCtrl($scope, $state, $ionicPopup, $timeout, $ionicHistory) {

        $scope.signupData = {};

        $scope.signup = function(data) {
            console.log('SI', data);
        };

        $scope.cancel = function() {
            $scope.signupData = {};
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
        };

    }

})();
