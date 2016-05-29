(function () {
    'use strict';
    angular
        .module('cfapp')
        .controller('postCtrl', Post);

    Post.$inject = ['GetPostFactory'];

    function Post(GetPostFactory) {
        var vm = this;
        vm.entries = [];
        execute();
        function execute() {
            return new ObtenerInformacion();
        }
        function ObtenerInformacion() {
            return GetPostFactory.query(function (data) {
                vm.entries = data;
                //console.log(data);
                vm.entries;
            }); // regresa todas las publicaciones
        }
    }
})();