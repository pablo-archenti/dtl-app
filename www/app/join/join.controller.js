(function() {
    'use strict';

    angular
        .module('join')
        .controller('JoinCtrl', JoinCtrl);

    JoinCtrl.$inject = ['$scope', '$state', '$ionicPopup', '$timeout', '$ionicHistory'];

    function JoinCtrl($scope, $state, $ionicPopup, $timeout, $ionicHistory) {

        $scope.formData = {};

        function showPopupError() {
            var myPopup = $ionicPopup.show({
                title: 'Error',
                templateUrl: 'app/join/templates/joinPopupError.html',
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

        $scope.submit = function(formData) {
            console.log(formData);
        };

        $scope.otro = function() {
            console.log('TROOO');
        };

        $scope.cancel = function() {
            $scope.formData = {};
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
        };

    }

})();
