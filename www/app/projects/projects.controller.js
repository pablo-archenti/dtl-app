(function() {
    'use strict';

    angular
        .module('projects')
        .controller('ProjectsListCtrl', ProjectsListCtrl)
        .controller('ProjectsShowCtrl', ProjectsShowCtrl);

    ProjectsListCtrl.$inject = ['$scope', '$ionicLoading'];
    ProjectsShowCtrl.$inject = ['$scope', '$ionicLoading', '$stateParams', '$ionicModal'];

    function ProjectsListCtrl($scope, $ionicLoading) {
        var projectsService = service;

        function init() {
            $scope.projects = [];
            $ionicLoading.show({
                templateUrl: 'loading.html',
                duration: 5000
            });
            projectsService.getProjects(function(projects) {
                $scope.projects = projects;
                $ionicLoading.hide();
            });
        }

        init();
    }

    function ProjectsShowCtrl($scope, $ionicLoading, $stateParams, $ionicModal) {

        function init() {
            $scope.projects = [];
            $ionicLoading.show({
                templateUrl: 'loading.html',
                duration: 5000
            });
            service.getProjectById($stateParams.id, function(project) {
                $scope.project = project;
                $ionicLoading.hide();
            });
            $ionicModal.fromTemplateUrl('app/projects/projectsGallery.html', {
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

var service = {
    getProjects: function(cb) {
        setTimeout(function() {
            cb(projects);
        }, 1000);
    },
    getProjectById: function(id, cb) {
        projects.forEach(function(project) {
            if (project.id == id) {
                cb(project);
            }
        });
        return {};
    }
};

var projects = [
    {
        id: 1,
        title: 'Kits: un abrigo, un juguete y unas zapatillas junto con "Generemos Sonrisas"',
        status: 'open',
        description: '',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/13_20_40Generemos%20sonrisas.jpeg',
            big: [
                'http://desdetulugar.com.ar/panel/proyectos/chicas/11_36_03Fund%20Crecer.jpeg',
                'http://desdetulugar.com.ar/panel/proyectos/chicas/14_23_40Calles%20que%20no%20callan.jpeg',
                'http://desdetulugar.com.ar/panel/proyectos/chicas/11_54_04IMG_1742.jpeg',
                'http://desdetulugar.com.ar/panel/proyectos/chicas/11_54_08IMG_1747.jpeg',
                'http://desdetulugar.com.ar/panel/proyectos/chicas/11_54_09IMG_1749.jpeg'
            ]
        }
    },
    {
        id: 2,
        title: 'Juegos y juguetes para 7 ludotecas!',
        status: 'open',
        description: '',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/15_39_56Cuadro%20complejo%20educativo.jpeg',
            big: []
        },
    },
    {
        id: 3,
        title: 'Amigos en el camino',
        status: 'open',
        description: '',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/12_18_19Reco%20Amigos.jpeg',
            big: []
        },
    },
    {
        id: 4,
        title: 'Meriendas saludables para apoyo escolar "Punto de encuentro"',
        status: 'closed',
        description: '',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/10_39_5410380203_10202956182454940_1473233844259627017_o%20(1).jpeg',
            big: []
        },
    },
    {
        id: 5,
        title: 'Materiales de Hockey para Ices',
        status: 'closed',
        description: '',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/11_11_18Foto%20ICES%20web.jpeg',
            big: []
        },
    }
];
