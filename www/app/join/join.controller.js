(function() {
    'use strict';

    angular
        .module('join')
        .controller('JoinCtrl', JoinCtrl);

    JoinCtrl.$inject = ['$scope', '$state', '$ionicPopup', '$timeout', '$ionicViewService'];

    function JoinCtrl($scope, $state, $ionicPopup, $timeout, $ionicViewService) {

        $scope.formData = {};

        function showPopupError() {
            var myPopup = $ionicPopup.show({
                title: 'Error',
                templateUrl: 'app/join/joinPopupError.html',
                buttons: [
                     { text: 'OK' }
                ]
            });
            myPopup.then();
            $timeout(function() {
                myPopup.close();
            }, 2000);
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
            $ionicViewService.nextViewOptions({
                disableBack: true
            });
        };

    }

})();
