(function() {
    'use strict';

    angular
        .module('myaccount')
        .controller('SignupCtrl', SignupCtrl)
        .controller('LoginCtrl', LoginCtrl);

    SignupCtrl.$inject = ['$scope', '$state', '$ionicHistory', 'accountService', 'authService', 'alert'];
    LoginCtrl.$inject  = ['$scope', 'authService', 'loader', 'alert'];

    function SignupCtrl($scope, $state, $ionicHistory, accountService, authService, alert) {

        $scope.signupData = {};

        $scope.signup = function(userData) {
            accountService.prepareUserData(userData)
            .then(function(pUserData) {
                return accountService.signUp(pUserData);
            })
            .then(function(volunteer) {
                return authService.login({
                    email: volunteer.email,
                    code: volunteer.code
                });
            })
            .then(function() {
                //prevent back button
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $state.go('app.projectsList');
            })
            .catch(function(err) {
                var message = null;
                if (err.code == 'uniqueness')
                    message = 'Ya existe un usuario con el email ' + userData.email;
                alert.show(message);
            });
        };

        $scope.cancel = function() {
            $scope.signupData = {};
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
        };

    }

    function LoginCtrl($scope, authService, loader, alert) {

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
                alert.show();
            });
        };

        $scope.sendCode = function(email) {
            loader.showLoading('Enviando email...');

            authService.sendLoginCode(email)
            .then(function() {
                $scope.showCode();
            })
            .catch(function() {
                alert.show();
            })
            .finally(function() {
                loader.hideLoading();
            });
        };

        $scope.cancelLogin = function() {
            $scope.hideCode();
        };

        $scope.hideCode();
    }

})();
