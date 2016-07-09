
(function() {
    'use strict';

    angular
    .module('projects')
    .controller('ListProjectsCtrl', ListCtrl)
    .controller('ShowProjectCtrl', ShowCtrl);

    ListCtrl.$inject = ['$scope', 'dtlProject', '$ionicPopup', 'alert', 'dtlVolunteer'];
    ShowCtrl.$inject = ['$scope', 'dtlProject', 'dtlVolunteer', '$stateParams', '$ionicModal',
        'alert', '$state', '$ionicHistory', '$sce', 'loader', 'goBackState',
        '$ionicPlatform', '$cordovaSocialSharing', 'shareProjectConfig'];

    function ListCtrl($scope, dtlProject, $ionicPopup, alert, dtlVolunteer) {
        var page = 0;
        var status = null;
        var suscribed = false;

        $scope.projects = [];
        $scope.moreProjectsCanBeLoaded = true;
        $scope.isAuthenticated = dtlVolunteer.isAuthenticated;

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
            $scope.loading = true;
            findProjects()
            .then(function(projects) {
                $scope.projects = $scope.projects.concat(projects);
            })
            .catch(function() {
                alert.error();
            })
            .finally(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.loading = false;
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
                finder = dtlVolunteer.getProjects(where, { page: page });
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

    function ShowCtrl($scope, dtlProject, dtlVolunteer, $stateParams, $ionicModal, alert,
        $state, $ionicHistory, $sce, loader, goBackState, $ionicPlatform, $socialSharing, shareProjectConfig) {
            var projectId = $stateParams.id;
            $scope.project = {};
            $scope.subscriptionData = {};

            function init() {
                loader.show();
                dtlProject.findById(projectId, 'gallery')
                .then(function(project) {
                    $scope.project = project;
                    return dtlVolunteer.isSubscribed(projectId)
                    .then(function() {
                        $scope.project.isSubscribed = true;
                    })
                    .catch(function() {});
                })
                .catch(function() {
                    $ionicHistory.nextViewOptions({
                        historyRoot: true
                    });
                    $state.go('^.list');
                    alert.error();
                })
                .finally(function() {
                    loader.hide();
                });

                $ionicModal.fromTemplateUrl('app/projects/templates/gallery.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {
                    $scope.galleryModal = modal;
                });

                $ionicModal.fromTemplateUrl('app/projects/templates/subscription.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {
                    $scope.subscriptionModal = modal;
                });
            }

            $scope.subscribe = function() {
                loader.show();
                dtlVolunteer.subscribe($scope.project.id, $scope.subscriptionData)
                .then(function() {
                    $scope.project.isSubscribed = true;
                    $scope.closeSubscriptionModal();
                    alert.info('project.suscribed', 10000);
                })
                .catch(function() {
                    alert.error();
                })
                .finally(function() {
                    loader.hide();
                });
            };

            $scope.unsubscribe = function() {
                alert.confirm('project.confirmUnsubscription')
                .then(function(confirm) {
                    if (confirm === true) {
                        loader.show();
                        return dtlVolunteer.unsubscribe($scope.project.id)
                        .then(function() {
                            $scope.project.isSubscribed = false;
                            loader.hide();
                        });
                    }
                })
                .catch(function() {
                    alert.error();
                });
            };

            $scope.openSubscriptionModal = function() {
                if (dtlVolunteer.isAuthenticated()) {
                    $scope.subscriptionData = {};
                    $scope.subscriptionModal.show();
                } else {
                    goBackState.save('app.projects.show', { id: projectId });
                    $state.go('app.myaccount');
                }
            };

            $scope.closeSubscriptionModal = function() {
                $scope.subscriptionModal.hide();
            };

            $scope.openGalleryModal = function() {
                $scope.galleryModal.show();
            };

            $scope.closeGalleryModal = function() {
                $scope.galleryModal.hide();
            };

            $scope.$on('$destroy', function() {
                $scope.subscriptionModal.remove();
                $scope.galleryModal.remove();
            });

            $scope.displaySafeHtml = function(html){
                return $sce.trustAsHtml(html);
            };

            $scope.share = function() {
                var message = shareProjectConfig.message;
                var subject = shareProjectConfig.subject;
                var link = shareProjectConfig.link.replace("{projectId}", projectId);

                $ionicPlatform.ready(function() {
                    $socialSharing
                    .share(message, subject, null, link)
                    .catch(function(err) {
                        alert.error(err);
                    });
                });
            };

            init();
        }

    })();
