(function () {
    'use strict';
    angular
        .module('apiRest', [])
        .factory('GetPostFactory', GetPostService);

    GetPostService.$injector = ['$resource'];

    function GetPostService($resource) {
        return $resource('http://jsonplaceholder.typicode.com/posts');
    }
})();