angular.module('Tienditas')
        .controller('currentLocationButtonCtrl', function ($scope, SharedVars) {
            $scope.sharedVars = SharedVars;
//            console.log('$scope.locationDetected', $scope);
//            console.log(SharedVars);
            $scope.controlClick = function () {
                console.log('centrar en ', SharedVars.markerHome.location);
                SharedVars.map.center = Object.create(SharedVars.markerHome.location);
                SharedVars.map.zoom = 15;
            };
        });