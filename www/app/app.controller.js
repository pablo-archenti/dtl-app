(function() {
    'use strict';

    angular
        .module('app')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$scope', '$log', 'authService', '$state', 'alert'];

    function ApplicationController($scope, $log, authService, $state, alert) {
        $scope.isLoggedIn = authService.isLoggedIn();
        $scope.setIsLoggedIn = function setIsLoggedIn(isLoggedIn) {
            $scope.isLoggedIn = isLoggedIn;
        };
        
        $scope.$log = $log;

        $scope.$on('$stateChangeStart', function(event, toState) {
            if (toState.name === 'app.myaccount' && !authService.isLoggedIn()) {
                $state.go('app.login');
                event.preventDefault();
            }
        });

        $scope.logout = function() {
            authService.logout()
            .then(function() {
                $scope.setIsLoggedIn(false);
                $state.go('app.login');
                alert.info('Sesión cerrada');
            })
            .catch(function() {
                alert.error();
            });
        };
    }

})();
