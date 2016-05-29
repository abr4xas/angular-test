(function () {
    'use strict';
    angular
        .module('apiRest', [])
        .factory('GetPostFactory', GetPostService)
        .factory('GetPostDetailFactory', GetPostDetailService);

    GetPostService.$injector = ['$resource'];
    GetPostDetailService.$injector = ['$resource'];

    function GetPostService($resource) {
        return $resource('http://jsonplaceholder.typicode.com/posts');
    }
    // Detalles
    function GetPostDetailService($resource) {
        return $resource('http://jsonplaceholder.typicode.com/posts/:id', {
            id: '@id'
        });
    }
})();