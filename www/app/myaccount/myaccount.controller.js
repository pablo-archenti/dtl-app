(function() {
    'use strict';

    angular
        .module('myaccount')
        .controller('SignupCtrl', SignupCtrl)
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject  = ['$scope'];
    SignupCtrl.$inject = ['$scope', '$state', '$ionicPopup', '$timeout', '$ionicHistory'];

    function LoginCtrl($scope) {
        $scope.credentials = {};
        $scope.showCode = 0;
        $scope.hideCode = 1;

        $scope.login = function(credentials) {
            console.log("login:", credentials);
            $scope.showCode = 0;
            $scope.hideCode = 1;
            console.log("showcode:", $scope.showCode);
            console.log("hidecode:", $scope.hideCode);
        };

        $scope.requireCode = function(credentials) {
            console.log("require code:", credentials);
            $scope.showCode = 1;
            $scope.hideCode = 0;
            console.log("showcode:", $scope.showCode);
            console.log("hidecode:", $scope.hideCode);
        };

        $scope.cancelCode = function(credentials) {
            console.log("cancel code:", credentials);
            $scope.showCode = 0;
            $scope.hideCode = 1;
            console.log("showcode:", $scope.showCode);
            console.log("hidecode:", $scope.hideCode);
        };
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
