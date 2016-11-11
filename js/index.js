angular.module('Tienditas', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'versionControl', 'uiGmapgoogle-maps', 'firebase'])
        .config(function ($routeProvider, $compileProvider, $versionProvider, uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyBHQVbPYVdfSs_r0zONGzXWlEYUpoPZzpI',
                v: '3.22', //defaults to latest 3.X anyhow
                libraries: 'weather,geometry,visualization,places'
            });
            var v = $versionProvider.$get();

            $routeProvider
                    .when(
                            '/'
                            , {templateUrl: 'templates/tienditas.html?v=' + v
                                , controller: 'TienditasCtrl'})
                    .when(
                            '/login'
                            , {templateUrl: 'templates/login.html?v=' + v
                                , controller: 'LoginCtrl'})
                    .when(
                            '/mis-tiendas'
                            , {templateUrl: 'templates/mis-tiendas.html?v=' + v
                                , controller: 'MisTiendasCtrl'})
                    .when(
                            '/agregar-tienda'
                            , {templateUrl: 'templates/tienda.html?v=' + v
                                , controller: 'AgregarTiendaCtrl'})
                    .when(
                            '/editar-tienda/:tiendaId'
                            , {templateUrl: 'templates/tienda.html?v=' + v
                                , controller: 'EditarTiendaCtrl'})
                    .when(
                            '/perfil'
                            , {templateUrl: 'templates/perfil.html?v=' + v
                                , controller: 'PerfilCtrl'})
                    .when(
                            '/doc'
                            , {templateUrl: 'templates/doc.html?v=' + v
                                , controller: 'DocCtrl'})

                    .otherwise({redirectTo: '/'});

            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/);
            // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
        })
        ;