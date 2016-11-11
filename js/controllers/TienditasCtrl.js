angular.module('Tienditas')
        .controller('TienditasCtrl', function ($scope, CurrentUser, Loading, $location, BreadCrumbs, modal, uiGmapGoogleMapApi, SharedVars, $interval) {

            function adjustMapSize() {
                jQuery('.angular-google-map-container').height(window.innerHeight - 125);
            }
            window.onresize = function (a, b, c) {
//                console.log('ajustar');
                adjustMapSize();
            }
            adjustMapSize();
            $scope.map = {center: {latitude: 51.219053, longitude: 4.404418}, zoom: 14};
            $scope.options = {scrollwheel: false};
            $scope.taxisMarkers = {};
            var imageTaxi;
            function init() {
                $scope.markerHome.icon = {url: 'img/markerCurrent.png',
                    size: new gMmaps.Size(32, 32),
                    scaledSize: new gMmaps.Size(32, 32)
                };

                imageTaxi = {url: 'img/car.png',
                    size: new gMmaps.Size(32, 32),
                    scaledSize: new gMmaps.Size(32, 32)
                };

//                updateCarsInMap();
//                $interval(updateCarsInMap, 10000);
            }

            function toFixed(x) {
                if (Math.abs(x) < 1.0) {
                    var e = parseInt(x.toString().split('e-')[1]);
                    if (e) {
                        x *= Math.pow(10, e - 1);
                        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
                    }
                } else {
                    var e = parseInt(x.toString().split('+')[1]);
                    if (e > 20) {
                        e -= 20;
                        x /= Math.pow(10, e);
                        x += (new Array(e + 1)).join('0');
                    }
                }
                return x;
            }


            var gMmaps;
            uiGmapGoogleMapApi.then(function (maps) {
                gMmaps = maps;
                init();
            });

            $scope.markerHome = SharedVars.markerHome = {
                id: 'markerHome_'
                , options: {draggable: true}
                , location: {}
//                , location: {latitude: 19.0412893, longitude: -98.192966}
            };

            $scope.map = SharedVars.map = {
                center: {latitude: 19.0412893, longitude: -98.192966}
                , zoom: 15
                , options: {
//                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    panControl: false,
                    zoomControl: false,
                    mapTypeControl: true,
                    scaleControl: false,
                    streetViewControl: false,
                    overviewMapControl: false
                }
            };

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
                    })
                }, function () {
                    handleNoGeolocation(true);
                }, options);
            }


            var events = {
                places_changed: function (searchBox) {
                    var places = searchBox.getPlaces();

                    if (places.length == 0) {
                        return;
                    }
                    // For each place, get the icon, place name, and location.
                    $scope.searchMarkers = [];
                    var bounds = new google.maps.LatLngBounds();
                    for (var i = 0, place; place = places[i]; i++) {
                        var image = {
                            url: place.icon,
                            size: new google.maps.Size(71, 71),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(17, 34),
                            scaledSize: new google.maps.Size(25, 25)
                        };
                        var marker = {
                            id: 'markerFound' + i
                            , location: {latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()}
                            , icon: image
                            , options: {
                                title: place.name
                            }
                            , infowindow: {
                                windowOptions: {
                                    visible: false
                                }
                            }
                        };
                        $scope.searchMarkers.push(marker);
                        bounds.extend(place.geometry.location);
                    }
                    var ne = bounds.getNorthEast();
                    var northeast = {latitude: ne.lat(), longitude: ne.lng()};

                    var sw = bounds.getSouthWest();
                    var southwest = {latitude: sw.lat(), longitude: sw.lng()};

                    $scope.map.bounds = {northeast: northeast, southwest: southwest};
                }
            };
            $scope.searchbox = {template: 'templates/searchbox.tpl.html', events: events};

            $scope.openMarkerInfo = function (marker) {
//                console.log(marker);
                marker.infowindow.windowOptions.visible = !marker.infowindow.windowOptions.visible;
            };

            $scope.closeMarkerInfo = function (marker) {
                marker.infowindow.windowOptions.visible = false;
            };
        });