angular.module('Tienditas')
        .controller('LoginCtrl', function ($scope, CurrentUser, Loading, $location, BreadCrumbs, modal, $firebase, factoryExample, sericeExample) {
            console.log('factoryExample', factoryExample);
            console.log('sericeExample', sericeExample);
//            $scope.ref = new Firebase(FBURL);
            BreadCrumbs.history = [{
                    location: false
                    , title: 'Bienvenido!'}];


            $scope.login = function (email, password, formLogin) {
                if (!formLogin.$valid) {
                    angular.element(document).find('input.ng-invalid,select.ng-invalid,textarea.ng-invalid').first().focus();
                    return;
                }

                Loading.show();
                CurrentUser.fbauth.signInWithEmailAndPassword(email, password)
                        .catch(function (error) {
                            // Handle Errors here.
                            Loading.hide();
                            modal('Acceso negado.');
                            console.log(error);
                            // ...
                        })
                        .then(function (user) {
                            if (user) {
                                $scope.$apply(function () {
                                    CurrentUser.fbuser = user;
                                    CurrentUser.redirectLoggedInUser();
                                });
                            }
                        });
            };

            $scope.recoverPassword = function (email) {
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Usuario',
                    eventAction: 'recuperarContrasenia',
                    eventLabel: 'Recuperar contraseña'
                });
                var request = WS.call('Usuario', 'recuperarContrasenia', {email: email});
                Loading.show();
                request.then(
                        function (result) {/* success function */
                            Loading.hide();
                            modal(result.data.response.message);
                        },
                        WS.handleRequestError);
            };


        });