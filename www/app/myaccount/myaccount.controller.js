(function() {
    'use strict';

    angular
        .module('myaccount')
        .controller('SignupCtrl', SignupCtrl)
        .controller('LoginCtrl', LoginCtrl);

    SignupCtrl.$inject = ['$scope', '$state', '$ionicPopup', '$timeout', '$ionicHistory'];
    LoginCtrl.$inject  = ['$scope', 'loader', '$timeout', 'Volunteer'];

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

    function LoginCtrl($scope, loader, $timeout, Volunteer) {

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
            .catch(function(err) {
                console.log(err);
            });
        };

        $scope.requireCode = function(email) {
            loader.toggleLoadingWithMessage('Enviando email...', 100);

            Volunteer.sendLoginCode({
                email: email
            })
            .$promise
            .then(function() {

                $scope.showCode();
            })
            .catch(function(err) {
                console.log(err);
            });
        };

        $scope.cancelLogin = function() {
            $scope.hideCode();
        };

        $scope.hideCode();
    }

})();
