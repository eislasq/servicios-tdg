angular.module('Tienditas')

        .service('Loading', function () {
            this.show = function () {
                document.getElementById('overlayer-loading').style.display = 'table';
            };
            this.hide = function () {
                document.getElementById('overlayer-loading').style.display = 'none';
            };
        })
        .service('sericeExample', function () {
            this.a = 0;
        })
        .factory('factoryExample', function () {
            return {a: 0}
        })
        ;
