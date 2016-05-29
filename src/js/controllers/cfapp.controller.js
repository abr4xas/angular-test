(function () {
    'use strict';
    angular
        .module('cfapp')
        .controller('postCtrl', Post)
        .controller('detailCtrl', Detail);

    Post.$inject = ['GetPostFactory'];
    Detail.$inject = ['GetPostDetailFactory', '$stateParams'];

    function Post(GetPostFactory) {
        var vm = this;
        vm.entries = [];
        execute();
        function execute() {
            return new ObtenerPost();
        }
        function ObtenerPost() {
            return GetPostFactory.query(function (data) {
                vm.entries = data;
                //console.log(data);
                vm.entries;
            }); // regresa todas las publicaciones
        }
    }

    function Detail(GetPostDetailService, $stateParams) {
        var vm = this;
        vm.entry;
        vm.id = $stateParams.id;
        execute();
        function execute() {
            return new ObtenerPostDetalle();
        }
        function ObtenerPostDetalle() {
            return GetPostDetailService.get({ id: vm.id }, function (data) {
                vm.entry = data;
                console.log(data);
                vm.entry;
            });
            
        }
    }

})();