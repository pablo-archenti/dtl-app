
(function() {
    'use strict';

    angular
        .module('projects')
        .controller('ProjectsListCtrl', ProjectsListCtrl)
        .controller('ProjectsShowCtrl', ProjectsShowCtrl);

    ProjectsListCtrl.$inject = ['$scope', 'dtlProject', '$ionicPopup', 'alert', 'userSession'];
    ProjectsShowCtrl.$inject = ['$scope', 'dtlProject', '$stateParams', '$ionicModal', 'alert', '$state', '$ionicHistory', '$sce', 'loader'];

    function ProjectsListCtrl($scope, dtlProject, $ionicPopup, alert, userSession) {
        var page = 0;
        var status = null;
        var suscribed = false;

        $scope.projects = [];
        $scope.moreProjectsCanBeLoaded = true;
        $scope.isAuthenticated = userSession.isAuthenticated;

        $scope.filters = {};
        $scope.filters.status = status;
        $scope.filters.suscribed = suscribed;

        $scope.showFilters = function() {
            $ionicPopup.show({
                templateUrl: 'app/projects/templates/filters.html',
                okText: 'Filtrar',
                cancelText: 'Cancelar',
                scope: $scope,
                cssClass: 'projects-filters-popup',
                buttons: [{
                    text: 'Cancelar',
                    type: 'button-default',
                    onTap: function() {
                        $scope.filters.status = status;
                        $scope.filters.suscribed = suscribed;
                    }
                  }, {
                    text: 'Aplicar',
                    type: 'button-positive',
                    onTap: function() {
                        status = $scope.filters.status;
                        suscribed = $scope.filters.suscribed;
                        $scope.refresh();
                    }
                  }]
            });
        };

        $scope.loadMore = function() {
            findProjects()
            .then(function(projects) {
                $scope.projects = $scope.projects.concat(projects);
            })
            .catch(function() {
                alert.error();
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
            })
            .catch(function() {
                alert.error();
            })
            .finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        function findProjects() {
            var finder;
            var where = status && { status: status } || {};

            if (suscribed)
                finder = dtlProject.findSubscribed(where, { page: page });
            else
                finder = dtlProject.find(where, { page: page });

            return finder
                    .then(function(projects) {
                        if (projects.length > 0) {
                            page++;
                            $scope.moreProjectsCanBeLoaded = true;
                            return projects;
                        } else {
                            $scope.moreProjectsCanBeLoaded = false;
                            return [];
                        }
                    })
                    .catch(function(e) {
                        $scope.moreProjectsCanBeLoaded = false;
                        throw e;
                    });
        }

    }

    function ProjectsShowCtrl($scope, projectsService, $stateParams, $ionicModal, alert, $state, $ionicHistory, $sce, loader) {
        var projectId = $stateParams.id;
        $scope.project = {};

        function init() {
            loader.show();
            projectsService.findById(projectId)
            .then(function(project) {
                $scope.project = project;
                return projectsService.isSuscribed(projectId)
                        .then(function() {
                            $scope.project.isSuscribed = true;
                        })
                        .catch(function() {});
            })
            .catch(function() {
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $state.go('app.projectsList');
                alert.error();
            })
            .finally(function() {
                loader.hide();
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

        $scope.displaySafeHtml = function(html){
            return $sce.trustAsHtml(html);
        };

        init();
    }

})();
