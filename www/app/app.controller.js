(function() {
    'use strict';

    angular
        .module('app')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$scope', 'loader', 'alert', 'authService'];

    function ApplicationController($scope, loader, alert, authService) {
        $scope.isLoggedIn = authService.isLoggedIn;
    }

})();
