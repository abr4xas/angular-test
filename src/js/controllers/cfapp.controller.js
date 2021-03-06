(function () {
    'use strict';
    angular
        .module('cfapp')
        .controller('postCtrl', Post)
        .controller('detailCtrl', Detail)
        .controller('commentsCtrl', Comments);

    Post.$inject = ['GetPostFactory'];
    Detail.$inject = ['GetPostDetailFactory', '$stateParams'];
    Comments.$inject = ['GetCommentsFactory', '$stateParams'];

    function Post(GetPostFactory) {
        var vm = this;
        vm.entries = [];
        vm.loading = true;
        execute();
        function execute() {
            return new ObtenerPost();
        }
        function ObtenerPost() {
            return GetPostFactory.query(function (data) {
                vm.entries = data;
                //console.log(data);
                vm.entries;
                vm.loading = false;
            }, function (e) {
                vm.loading = false;
            }); // regresa todas las publicaciones
        }
    } // End Post

    function Detail(GetPostDetailService, $stateParams) {
        var vm = this;
        vm.entry;
        vm.id = $stateParams.id;
        vm.loading = true;
        execute();
        function execute() {
            return new ObtenerPostDetalle();
        }
        function ObtenerPostDetalle() {
            return GetPostDetailService.get({ id: vm.id }, function (data) {
                vm.entry = data;
                //console.log(data);
                vm.entry;
                vm.loading = false;
            }, function (e) {
                vm.loading = false;
            }); // regresa contenido del post
        }
    } // End Detail

    function Comments(GetCommentsFactory, $stateParams) {
        var vm = this;
        vm.comment;
        vm.id = $stateParams.id;
        vm.loading = true;
        execute();
        function execute() {
            return new ObtenerComentarios();
        }
        function ObtenerComentarios() {
            return GetCommentsFactory.query({ id: vm.id }, function (data) {
                vm.comment = data;
                //console.log(data);
                vm.comment;
                vm.loading = false;
            }, function (e) {
                vm.loading = false;
            }); // regresa los comentarios relacionados al post
        }

    } // End Comments

})();