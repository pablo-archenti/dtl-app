(function() {
    'use strict';

    angular
        .module('projects')
        .controller('ProjectsCtrl', ProjectsCtrl);

    ProjectsCtrl.$inject = ['$scope', '$ionicLoading'];

    function ProjectsCtrl($scope, $ionicLoading) {
        var self = this;
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

})();

var service = {
    getProjects: function(cb) {
        setTimeout(function() {
            cb(projects);
        }, 1000);
    }
};

var projects = [
    {
        id: 1,
        title: 'Kits: un abrigo, un juguete y unas zapatillas junto con "Generemos Sonrisas"',
        description: '',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/13_20_40Generemos%20sonrisas.jpeg',
            list: []
        }
    },
    {
        id: 2,
        title: 'Juegos y juguetes para 7 ludotecas!',
        description: '',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/15_39_56Cuadro%20complejo%20educativo.jpeg',
            list: []
        },
    },
    {
        id: 3,
        title: 'Amigos en el camino',
        description: '',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/12_18_19Reco%20Amigos.jpeg',
            list: []
        },
    },
    {
        id: 4,
        title: 'Meriendas saludables para apoyo escolar "Punto de encuentro"',
        description: '',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/10_39_5410380203_10202956182454940_1473233844259627017_o%20(1).jpeg',
            list: []
        },
    },
    {
        id: 5,
        title: 'Materiales de Hockey para Ices',
        description: '',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/11_11_18Foto%20ICES%20web.jpeg',
            list: []
        },
    }
];
