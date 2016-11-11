angular.module('Tienditas')
        .controller('NavigationCtrl', function ($scope, CurrentUser, $location, Loading, $firebase) {

            $scope.$on('$routeChangeStart', function (event, next, current) {
                var url = $location.absUrl();
                ga('send', 'pageview', url);
            });


            $scope.requiereLogin = function (path) {
                var noRequireLogin = [
                    '/'
                            , '/doc'
                            , '/login'
                ];
                console.log('validando si requiere login', path);
                return (noRequireLogin.indexOf(path) < 0);
            };

            console.log('NavigationCtrl');
            if (!CurrentUser.fbuser && $scope.requiereLogin($location.path())) {
                console.log('no Logueado y no esta en seccion que no requiere login, mandarlo a login');
                var redirect = $location.path();
                $location.path('/login').search('redirect', redirect).replace();
            }
            $scope.currentUser = CurrentUser;



            CurrentUser.fbauth.onAuthStateChanged(function (user) {
                Loading.hide();
                if (user) {
                    // User signed in!
                    CurrentUser.fbuser = user;
                    CurrentUser.redirectLoggedInUser();

                } else {
                    // User logged out
                }
            });
        })
        ;