(function () {
    'use strict';
    angular
        .module('cfapp')
        .config(routes)
        .run(removerCache);

    // Inyectando dependencias.
    routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    /**
     * @description gestiona las rutas de la aplicación.
     * @param $stateProvider
     * @param $urlRouterProvider
     */
    function routes($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'postCtrl',
                controllerAs: 'ctrl',
                templateUrl: './templates/home/home_tpl.html'
            })
            .state('post', {
                url: '/post/:id',
                views: {
                    post: {
                        controller: 'detailCtrl',
                        controllerAs: 'ctrl',
                        templateUrl: './templates/detail/post_detail_tpl.html'
                    },
                    comments: {
                        controller: 'commentsCtrl',
                        controllerAs: 'ctrl',
                        templateUrl: './templates/comments/comments_tpl.html'
                    }
                }
            });
        $locationProvider.html5Mode(false);
    } // End routes
    
    // Inyectando dependencias.
    removerCache.$inject = ['$rootScope', '$templateCache'];
    /**
     * @description Remueve el cache al detectar que un cambio de ruta comienza.
     * @param $rootScope
     * @param $templateCache
     */
    function removerCache($rootScope, $templateCache) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (typeof (current) !== 'undefined') {
                $templateCache.remove(current.templateUrl);
            }
        });
    } // End removerCache

})();