(function() {
    'use strict';

    angular
        .module('myaccount')
        .controller('SignupCtrl', SignupCtrl)
        .controller('LoginCtrl', LoginCtrl);

    SignupCtrl.$inject = ['$scope', '$state', '$ionicHistory'];
    LoginCtrl.$inject  = ['$scope', 'authService'];

    function SignupCtrl($scope, $state, $ionicHistory) {

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

    function LoginCtrl($scope, authService) {

        $scope.showCode = function() {
            $scope.codeShown = 1;
            $scope.codeHidden = 0;
        };

        $scope.hideCode = function() {
            $scope.codeShown = 0;
            $scope.codeHidden = 1;
        };

        $scope.login = function(credentials) {
            authService.login(credentials)
            .then(function() {

            })
            .catch(function() {
                $scope.ui.alert.show();
            });
        };

        $scope.sendCode = function(email) {
            $scope.ui.loader.showLoading('Enviando email...');

            authService.sendLoginCode(email)
            .then(function() {
                $scope.showCode();
            })
            .catch(function() {
                $scope.ui.alert.show();
            })
            .finally(function() {
                $scope.ui.loader.hideLoading();
            });
        };

        $scope.cancelLogin = function() {
            $scope.hideCode();
        };

        $scope.hideCode();
    }

})();
