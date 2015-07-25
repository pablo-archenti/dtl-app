(function() {
    'use strict';

    angular
        .module('myaccount')
        .controller('SignupCtrl', SignupCtrl)
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject  = ['$scope'];
    SignupCtrl.$inject = ['$scope', '$state', '$ionicPopup', '$timeout', '$ionicHistory'];

    function LoginCtrl($scope) {

    }

    function SignupCtrl($scope, $state, $ionicPopup, $timeout, $ionicHistory) {

        $scope.signupData = {};

        function showPopupError() {
            var myPopup = $ionicPopup.show({
                title: 'Error',
                templateUrl: 'app/myaccount/templates/formError.html',
                buttons: [
                     { text: 'OK' }
                ]
            });
            myPopup.then();
            $timeout(function() {
                myPopup.close();
            }, 1500);
        }

        $scope.next = function(state, form) {
            if (form.$valid) {
                $state.go(state);
            } else {
                showPopupError();
            }
        };

        $scope.submit = function() {
            console.log($scope.signupData);
        };

        $scope.otro = function() {
            console.log('TROOO');
        };

        $scope.cancel = function() {
            $scope.signupData = {};
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
        };

    }

})();
