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

        $scope.login = function(credentials) {
            console.log(credentials);
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
