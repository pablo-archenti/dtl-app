(function() {
    'use strict';

    angular
        .module('projects')
        .controller('ProjectsListCtrl', ProjectsListCtrl)
        .controller('ProjectsShowCtrl', ProjectsShowCtrl);

    ProjectsListCtrl.$inject = ['$scope', 'projectsService'];
    ProjectsShowCtrl.$inject = ['$scope', 'projectsService', '$stateParams', '$ionicModal'];

    function ProjectsListCtrl($scope, projectsService) {
        $scope.projects = [];

        $scope.loadMore = function() {
            projectsService.getAll()
            .then(function(projects) {
                $scope.projects = $scope.projects.concat(projects);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        $scope.refresh = function() {
            projectsService.getAll()
            .then(function(projects) {
                $scope.projects = projects;
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

    }

    function ProjectsShowCtrl($scope, projectsService, $stateParams, $ionicModal) {
        $scope.project = {};

        function init() {
            projectsService.getById($stateParams.id)
            .then(function(project) {
                $scope.project = project;
            });
            $ionicModal.fromTemplateUrl('app/projects/templates/projectsGallery.html', {
                scope: $scope,
                animation: 'slide-in-up'
              }).then(function(modal) {
                $scope.modal = modal;
            });
        }

        $scope.openModal = function() {
            $scope.modal.show();
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

        init();
    }

})();
