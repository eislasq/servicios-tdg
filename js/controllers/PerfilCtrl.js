angular.module('Tienditas')
        .controller('PerfilCtrl', function ($scope, Loading, $timeout, BreadCrumbs, modal) {
            BreadCrumbs.history = [{
                    location: false
                    , title: 'Mi Perfil'}];
            $scope.perfil = {};
            Loading.show();
            var requestRoles = WS.call('Usuario', 'miPerfil');
            requestRoles.then(
                    function (result) {/* success function */
                        Loading.hide();
                        if (0 === result.data.response.status) {
                            $scope.perfil = result.data.response.value;

                        } else {
                            modal(result.data.response.message);
                        }
                    },
                    WS.handleRequestError);
            $scope.guardarPerfil = function (perfil) {
                Loading.show();
                var requestRoles = WS.call('Usuario', 'actualizarMiPerfil', {perfil: perfil});
                requestRoles.then(
                        function (result) {/* success function */
                            Loading.hide();
                            if (0 === result.data.response.status) {
                                $scope.perfil.actualizado = true;
                                $timeout(function () {
                                    $scope.perfil.actualizado = false;
                                }, 5000);

                            } else {
                                modal(result.data.response.message);
                            }
                        },
                        WS.handleRequestError);
            };
        })
        ;