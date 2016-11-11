angular.module('Tienditas')
        .controller('MisTiendasCtrl', function ($scope, CurrentUser, Loading, $location, modal, $timeoutm, $firebase) {

            $scope.tienditas = {};

            $firebase.database().ref('/tiendas/').once('value').then(function (snapshot) {
                var username = snapshot.val().username;
                // ...
            });

            $scope.agregarTiendita = function () {
                $location.path('#/agregar-tienda');
            };
        })
        ;