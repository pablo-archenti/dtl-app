(function() {
    'use strict';

    angular
        .module('myaccount')
        .controller('SignupCtrl', SignupCtrl)
        .controller('LoginCtrl', LoginCtrl);

    SignupCtrl.$inject = ['$scope', '$state', '$ionicHistory'];
    LoginCtrl.$inject  = ['$scope', 'Volunteer'];

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

    function LoginCtrl($scope, Volunteer) {

        $scope.showCode = function() {
            $scope.codeShown = 1;
            $scope.codeHidden = 0;
        };

        $scope.hideCode = function() {
            $scope.codeShown = 0;
            $scope.codeHidden = 1;
        };

        $scope.login = function(email, code) {
            Volunteer.loginWithCode({
                email: email,
                code: code
            })
            .$promise
            .then(function(accessToken) {
                console.log(accessToken);
            })
            .catch(function() {
                $scope.ui.alert.show();
            });
        };

        $scope.requireCode = function(email) {
            $scope.ui.loader.showLoading('Enviando email...');

            Volunteer.sendLoginCode({
                email: email
            })
            .$promise
            .then(function(code) {
                console.log('CODE: ', code);
                $scope.showCode();
                $scope.ui.loader.hideLoading();
            })
            .catch(function() {
                $scope.ui.alert.show();
            });
        };

        $scope.cancelLogin = function() {
            $scope.hideCode();
        };

        $scope.hideCode();
    }

})();
