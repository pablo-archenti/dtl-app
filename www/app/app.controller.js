(function() {
    'use strict';

    angular
    .module('app')
    .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$scope', '$log', 'dtlVolunteer', '$state'];

    function ApplicationController($scope, $log, dtlVolunteer, $state) {
        $scope.$log = $log;

        $scope.$on('$stateChangeStart', function(event, toState) {
            if (toState.name === 'app.myaccount' && !dtlVolunteer.isAuthenticated()) {
                $state.go('app.login');
                event.preventDefault();
            }
        });
    }

})();
