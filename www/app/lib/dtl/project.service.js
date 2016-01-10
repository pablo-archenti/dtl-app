(function() {
    'use strict';

    angular
        .module('dtl')
        .factory('dtlProject', dtlProject);

    dtlProject.$inject = ['userSession', 'Volunteer', '$q'];

    function dtlProject(userSession, Volunteer, $q) {
        var service = {};

        return service;
    }

})();
