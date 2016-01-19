
(function() {
    'use strict';

    angular
        .module('projects')
        .controller('ProjectsListCtrl', ProjectsListCtrl)
        .controller('ProjectsShowCtrl', ProjectsShowCtrl);

    ProjectsListCtrl.$inject = ['$scope', 'dtlProject'];
    ProjectsShowCtrl.$inject = ['$scope', 'dtlProject', '$stateParams', '$ionicModal'];

    function ProjectsListCtrl($scope, dtlProject) {
        $scope.projects = [];
        $scope.moreProjectsCanBeLoaded = true;
        var page = 0;

        $scope.loadMore = function() {
            findProjects()
            .then(function(projects) {
                $scope.projects = $scope.projects.concat(projects);
            })
            .finally(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        $scope.refresh = function() {
            page = 0;
            findProjects()
            .then(function(projects) {
                $scope.projects = projects;
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        function findProjects() {
            return dtlProject.findSubscribed({status: 'finalizado'}, { page: page })
            .then(function(projects) {
                if (projects.length > 0) {
                    page++;
                    $scope.moreProjectsCanBeLoaded = true;
                    return projects;
                } else {
                    $scope.moreProjectsCanBeLoaded = false;
                    return [];
                }
            });
        }

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
