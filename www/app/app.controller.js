(function() {
    'use strict';

    angular
        .module('app')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$scope', '$log', 'userSession', '$state'];

    function ApplicationController($scope, $log, userSession, $state) {
        $scope.$log = $log;

        $scope.$on('$stateChangeStart', function(event, toState) {
            if (toState.name === 'app.myaccount' && !userSession.isAuthenticated()) {
                $state.go('app.login');
                event.preventDefault();
            }
        });
    }

})();
