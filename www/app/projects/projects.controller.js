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
        var page = 0;

        $scope.loadMore = function() {
            dtlProject.findByStatus('finalizado', { page: page })
            .then(function(projects) {
                $scope.projects = $scope.projects.concat(projects);
                $scope.$broadcast('scroll.infiniteScrollComplete');
                page++;
            });
        };

        $scope.refresh = function() {
            projectsService.getAll()
            .then(function(projects) {
                $scope.projects = projects;
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.moreProjectsCanBeLoaded = function() {
            console.log('yes');
            return false;
            /*return dtlProject.count()
            .then(function(count) {
                return false;
                console.log(count);
                return count > 0 ? true : false;
            });*/
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
