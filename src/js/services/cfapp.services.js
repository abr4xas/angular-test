(function () {
    'use strict';
    angular
        .module('apiRest', [])
        .factory('GetPostFactory', GetPostService)
        .factory('GetPostDetailFactory', GetPostDetailService)
        .factory('GetCommentsFactory', GetCommentsService);

    GetPostService.$injector = ['$resource'];
    GetPostDetailService.$injector = ['$resource'];
    GetCommentsService.$injector = ['$resource'];

    function GetPostService($resource) {
        return $resource('http://jsonplaceholder.typicode.com/posts');
    }
    // Detalles de la publicacion
    function GetPostDetailService($resource) {
        return $resource('http://jsonplaceholder.typicode.com/posts/:id', {
            id: '@id'
        });
    }

    // Comentarios de la publicacion
    function GetCommentsService(resource) {
        return $resource('http://jsonplaceholder.typicode.com/posts/:id/comments', {
            id: '@id'
        });
    }
})();