angular.module('Tienditas')
        .controller('BreadCrumbsCtrl', function ($scope, BreadCrumbs, $location) {
            $scope.breadCrumbs = BreadCrumbs;
            $scope.folowBreadCrumb = function (breadCrumb, index) {
//                console.log(index, breadCrumb);
                if (index + 1 < $scope.breadCrumbs.history.length) {
                    console.log('Seguir migaja');
                    $location.path(breadCrumb.location);
                }
            };
        })
        ;