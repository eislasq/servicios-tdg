angular.module('Tienditas')
        .factory('CurrentUser', function ($rootScope, $firebase, modal, Loading, $location, $firebase) {
            var currentUser = {};
            var defaultUser = {
                fbuser: false
                , permissions: []
                , can: function (permiso) {
                    if (this.permissions) {
                        return (this.permissions.indexOf(permiso) >= 0) ? true : false;
                    }
                    return false;
                }
                , reset: function () {
                    return currentUser = angular.extend(currentUser, defaultUser);
                }
                , redirectLoggedInUser: function () {
                    var redirect = $location.search()['redirect'];
                    if (redirect) {
                        $location.url(redirect).replace();
                    } else {
                        $location.path('/').replace();
                    }
                }
                , fbauth: $firebase.auth()
                , logout: function () {
                    Loading.show();
                    var $thisUser = this;
                    if (this.fbuser) {
                        console.log('logout');
                        $firebase.auth().signOut().then(function () {
                            // Sign-out successful.
                            $rootScope.$apply(function () {
                                console.log('success firebase logout');
                                Loading.hide();
                                $thisUser.reset();
                                $location.path('/').replace();
                            });

                        }, function (error) {
                            // An error happened.
                            Loading.hide();
                            modal('Falló el cierre de sesion');
                            console.log(error);
                        });
                    } else {
                        console.log('already logout');
                        Loading.hide();
                        this.reset();
                        $location.path('/').replace();
                    }
                }
            };
            defaultUser.reset();
            return currentUser;
        })
        .factory('BreadCrumbs', function () {
            return{history: []};
        })
        .factory('modal', function () {

            var modalTypes = {
                info: {icon: 'fa-info-circle', alert: 'alert-info'}
                , warning: {icon: 'fa-exclamation-triangle', alert: 'alert-warning'}
                , success: {icon: 'fa-check-circle-o', alert: 'alert-success'}
                , danger: {icon: 'fa-exclamation-triangle', alert: 'alert-danger'}
                , question: {icon: 'fa-question-circle', alert: 'alert-info'}
            };
            /**
             * Cuadro de mensaje emerjente.
             * @param {type} message
             * @param {type} type
             * @returns {undefined}
             */
            return function (message, type) {
                if (!modalTypes[type]) {
                    type = 'info';
                }
                var iconClasses = modalTypes[type].icon;
                var alertClasses = modalTypes[type].alert;
                var alertOverlayer = document.createElement('table');
                alertOverlayer.className = 'alert-overlayer';

                var icon = document.createElement('i');
                icon.className = 'alert-icon fa ' + iconClasses + ' ' + alertClasses;

                var btnClose = document.createElement('button');
                btnClose.className = 'close';
                btnClose.innerHTML = '&times;';
                btnClose.onclick = function () {
                    btnClose.parentNode.parentNode.parentNode.remove();
                };

                var alertTr = document.createElement('tr');
                alertTr.className = 'alertText';
                var alertTd = document.createElement('td');
                var alertMessage = document.createElement('div');
                alertMessage.innerHTML = message;

                var alertsContiner = document.getElementById('alerts');
                alertsContiner.appendChild(alertOverlayer);
                alertOverlayer.appendChild(alertTr);
                alertTr.appendChild(alertTd);
                alertTd.appendChild(btnClose);
                angular.element(btnClose).focus();
                alertTd.appendChild(icon);
                alertTd.appendChild(alertMessage);
                angular.element(alertMessage).addClass(alertClasses);
            };
        })
        .factory('SharedVars', function () {
            return {};
        })
        ;