(function() {
    'use strict';

    angular.module('projects')
        .factory('projectsService', projectsService);

    projectsService.$inject = ['$q'];

    function projectsService($q) {
        return {
            getAll: getAll,
            getById: getById
        };

        function getAll() {
            return $q(function(resolve) {
                resolve(projects);
            });
        }

        function getById(id) {
            return $q(function(resolve) {
                projects.forEach(function(project) {
                    if (project.id == id) {
                        return resolve(project);
                    }
                });
                return resolve({});
            });
        }
    }

})();

var projects = [
    {
        id: 1,
        title: 'Kits: un abrigo, un juguete y unas zapatillas junto con "Generemos Sonrisas"',
        status: 'open',
        description: 'Estamos juntando ropa de abrigo y zapatillas junto con los chicos de "Generemos sonrisas" para ser entregados en el apoyo familiar San Clotilde, a los chicos que asisten a las ludotecas de la Fundación Potencialidades y a los chicos de la escuela Pedro Vega de Santa Fe. Escribimos si tenés alguna de estas cosas para sumar a info@desdetulugar.com.ar!!! Son 1.000 kits los que vamos a estar entregando! y mil sonrisas las que vamos a estar generando!',
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
        description: 'Estamos juntando ropa de abrigo y zapatillas junto con los chicos de "Generemos sonrisas" para ser entregados en el apoyo familiar San Clotilde, a los chicos que asisten a las ludotecas de la Fundación Potencialidades y a los chicos de la escuela Pedro Vega de Santa Fe. Escribimos si tenés alguna de estas cosas para sumar a info@desdetulugar.com.ar!!! Son 1.000 kits los que vamos a estar entregando! y mil sonrisas las que vamos a estar generando!',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/15_39_56Cuadro%20complejo%20educativo.jpeg',
            big: []
        },
    },
    {
        id: 3,
        title: 'Amigos en el camino',
        status: 'open',
        description: 'Estamos juntando ropa de abrigo y zapatillas junto con los chicos de "Generemos sonrisas" para ser entregados en el apoyo familiar San Clotilde, a los chicos que asisten a las ludotecas de la Fundación Potencialidades y a los chicos de la escuela Pedro Vega de Santa Fe. Escribimos si tenés alguna de estas cosas para sumar a info@desdetulugar.com.ar!!! Son 1.000 kits los que vamos a estar entregando! y mil sonrisas las que vamos a estar generando!',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/12_18_19Reco%20Amigos.jpeg',
            big: []
        },
    },
    {
        id: 4,
        title: 'Meriendas saludables para apoyo escolar "Punto de encuentro"',
        status: 'closed',
        description: 'Estamos juntando ropa de abrigo y zapatillas junto con los chicos de "Generemos sonrisas" para ser entregados en el apoyo familiar San Clotilde, a los chicos que asisten a las ludotecas de la Fundación Potencialidades y a los chicos de la escuela Pedro Vega de Santa Fe. Escribimos si tenés alguna de estas cosas para sumar a info@desdetulugar.com.ar!!! Son 1.000 kits los que vamos a estar entregando! y mil sonrisas las que vamos a estar generando!',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/10_39_5410380203_10202956182454940_1473233844259627017_o%20(1).jpeg',
            big: []
        },
    },
    {
        id: 5,
        title: 'Materiales de Hockey para Ices',
        status: 'closed',
        description: 'Estamos juntando ropa de abrigo y zapatillas junto con los chicos de "Generemos sonrisas" para ser entregados en el apoyo familiar San Clotilde, a los chicos que asisten a las ludotecas de la Fundación Potencialidades y a los chicos de la escuela Pedro Vega de Santa Fe. Escribimos si tenés alguna de estas cosas para sumar a info@desdetulugar.com.ar!!! Son 1.000 kits los que vamos a estar entregando! y mil sonrisas las que vamos a estar generando!',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/11_11_18Foto%20ICES%20web.jpeg',
            big: []
        }
    },
    {
        id: 6,
        title: 'Materiales de Hockey para Ices',
        status: 'closed',
        description: 'Estamos juntando ropa de abrigo y zapatillas junto con los chicos de "Generemos sonrisas" para ser entregados en el apoyo familiar San Clotilde, a los chicos que asisten a las ludotecas de la Fundación Potencialidades y a los chicos de la escuela Pedro Vega de Santa Fe. Escribimos si tenés alguna de estas cosas para sumar a info@desdetulugar.com.ar!!! Son 1.000 kits los que vamos a estar entregando! y mil sonrisas las que vamos a estar generando!',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/11_11_18Foto%20ICES%20web.jpeg',
            big: []
        }
    },
    {
        id: 7,
        title: 'Materiales de Hockey para Ices',
        status: 'closed',
        description: 'Estamos juntando ropa de abrigo y zapatillas junto con los chicos de "Generemos sonrisas" para ser entregados en el apoyo familiar San Clotilde, a los chicos que asisten a las ludotecas de la Fundación Potencialidades y a los chicos de la escuela Pedro Vega de Santa Fe. Escribimos si tenés alguna de estas cosas para sumar a info@desdetulugar.com.ar!!! Son 1.000 kits los que vamos a estar entregando! y mil sonrisas las que vamos a estar generando!',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/11_11_18Foto%20ICES%20web.jpeg',
            big: []
        }
    },
    {
        id: 8,
        title: 'Materiales de Hockey para Ices',
        status: 'closed',
        description: 'Estamos juntando ropa de abrigo y zapatillas junto con los chicos de "Generemos sonrisas" para ser entregados en el apoyo familiar San Clotilde, a los chicos que asisten a las ludotecas de la Fundación Potencialidades y a los chicos de la escuela Pedro Vega de Santa Fe. Escribimos si tenés alguna de estas cosas para sumar a info@desdetulugar.com.ar!!! Son 1.000 kits los que vamos a estar entregando! y mil sonrisas las que vamos a estar generando!',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/11_11_18Foto%20ICES%20web.jpeg',
            big: []
        }
    },
    {
        id: 9,
        title: 'Materiales de Hockey para Ices',
        status: 'closed',
        description: 'Estamos juntando ropa de abrigo y zapatillas junto con los chicos de "Generemos sonrisas" para ser entregados en el apoyo familiar San Clotilde, a los chicos que asisten a las ludotecas de la Fundación Potencialidades y a los chicos de la escuela Pedro Vega de Santa Fe. Escribimos si tenés alguna de estas cosas para sumar a info@desdetulugar.com.ar!!! Son 1.000 kits los que vamos a estar entregando! y mil sonrisas las que vamos a estar generando!',
        pictures: {
            small:  'http://desdetulugar.com.ar/panel/proyectos/principal/11_11_18Foto%20ICES%20web.jpeg',
            big: []
        }
    }
];
