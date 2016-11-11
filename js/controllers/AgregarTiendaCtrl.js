angular.module('Tienditas')
        .controller('AgregarTiendaCtrl', function ($scope, CurrentUser, Loading, $location, modal, $timeout, uiGmapGoogleMapApi, $firebase) {
            $scope.map = {center: {latitude: 51.219053, longitude: 4.404418}, zoom: 14};
            $scope.tiendita = {lat: '19.7082643', lng: '-98.4565957', duenio: CurrentUser.fbuser.uid};
            function init() {
                $scope.markerHome.icon = {url: 'img/markerCurrent.png',
                    size: new gMmaps.Size(32, 32),
                    scaledSize: new gMmaps.Size(32, 32)
                };


//                updateCarsInMap();
//                $interval(updateCarsInMap, 10000);

                $scope.geocodeLatLng = function (latlng) {

                    geocoder.geocode({location: latlng}, function (results, status) {
                        if (status === gMmaps.GeocoderStatus.OK) {
                            var firstResult = results.shift();
                            $scope.tiendita.direccion = firstResult.formatted_address;
                        } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                    });

                };

                getCurrentLocation();
            }

            var gMmaps, geocoder;
            uiGmapGoogleMapApi.then(function (maps) {
                gMmaps = maps;
                geocoder = new gMmaps.Geocoder();
                init();
            });

            $scope.markerHome = markerHome = {
                id: 'markerHome_'
                , options: {draggable: true}
                , location: {latitude: $scope.tiendita.lat, longitude: $scope.tiendita.lng}
                , events: {dragend: function (event) {
                        $scope.tiendita.lat = event.position.lat();
                        $scope.tiendita.lng = event.position.lng();
                        $scope.geocodeLatLng(event.position);
                    }}
            };

            $scope.map = map = {
                center: {latitude: $scope.tiendita.lat, longitude: $scope.tiendita.lng}
                , zoom: 15
                , options: {
//                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    panControl: true,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
                    streetViewControl: true,
                    overviewMapControl: true,
                    scrollwheel: false
                }
            };

            function getCurrentLocation() {
                if (navigator.geolocation) {
                    var options = {
                        enableHighAccuracy: false,
                        timeout: 5000,
                        maximumAge: 6000
                    };
                    $scope.dialogoAbierto = false;
                    navigator.geolocation.getCurrentPosition(function (pos) {
                        $scope.$apply(function () {
                            console.log('localizacion encontrada');
                            $scope.markerHome.location.latitude = pos.coords.latitude;
                            $scope.markerHome.location.longitude = pos.coords.longitude;
                            $scope.map.center = Object.create($scope.markerHome.location);

                            $scope.tiendita.lat = pos.coords.latitude;
                            $scope.tiendita.lng = pos.coords.longitude;
                            $scope.geocodeLatLng({lat: pos.coords.latitude, lng: pos.coords.longitude});
                        })
                    }, function () {
                        handleNoGeolocation(true);
                    }, options);
                }
            }



            $scope.guardarTienda = function (formAddTienda, tienda) {
                if (!formAddTienda.$valid) {
                    console.info(formAddTienda, 'Formulario Invalido');
                    angular.element(document).find('input.ng-invalid,select.ng-invalid,textarea.ng-invalid').first().focus();
                    return;
                }
                $scope.tiendita.fecha_actualizacion=firebase.database.ServerValue.TIMESTAMP;
                console.log('Enviando tienda a almacenar en firebase', tienda);
                var pushPromise = $firebase.database().ref('tiendas/').push(tienda);
                console.log(pushPromise);
                pushPromise.then(function (a, b, c) {
                    console.log('then', a, b, c);
                });
                pushPromise.catch(function (error) {
//                    console.error(error);
                    modal('No se puede crear nuevo comercio');
                });
            };
        });