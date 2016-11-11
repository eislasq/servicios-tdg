angular.module('Tienditas')
        .directive('scrollingShowIt', function () {
            return {
                restrict: 'A', //only matches attribute name
                link: function (scope, element, attrs) {
                    var raw = element[0];
//                    console.log('loading directive');

                    $(document).bind('scroll', function () {
//                        console.log('in scroll');

                        var $elem = $(raw);
                        var $window = $(window);

                        var docViewTop = $window.scrollTop();
                        var docViewBottom = docViewTop + $window.height();

                        var elemTop = $elem.offset().top;
                        var elemBottom = elemTop + $elem.height();

//                        if ((elemBottom <= docViewBottom) && (elemTop >= docViewTop)||) {
                        if (((elemTop <= docViewBottom) && (elemTop >= docViewTop))
                                || ((elemBottom <= docViewBottom) && (elemBottom >= docViewTop))) {
//                            console.log('visible:', raw);
                            scope.$apply(attrs.scrollingShowIt);
                        }

                    });
                }
            };
        })
//        .directive('ngDragover', function ($parse) {
//            return {
//                restrict: 'A', //only matches attribute name
//                compile: function ($element, attr) {
//                    console.log('ngDragover for ', $element);
//                    // We expose the powerful $event object on the scope that provides access to the Window,
//                    // etc. that isn't protected by the fast paths in $parse.  We explicitly request better
//                    // checks at the cost of speed since event handler expressions are not executed as
//                    // frequently as regular change detection.
//                    var fn = $parse(attr['ngDragover'], /* interceptorFn */ null, /* expensiveChecks */ true);
//                    return function ngEventHandler(scope, element) {
//                        element.on('dragover', function (event) {
//                            var callback = function () {
//                                fn(scope, {$event: event});
//                            };
//                            scope.$apply(callback);
//                        });
//                    };
//                }
//            };
//        })
        ;



[].forEach.call(
        'dragstart drag dragenter dragleave dragover drop dragend'.split(' '),
        function (eventName) {
            var directiveName = 'ng' + eventName[0].toUpperCase() + eventName.slice(1);
            angular.module('Tienditas')
                    .directive(directiveName, function ($parse, $rootScope) {
                        return {
                            restrict: 'A',
                            compile: function ($element, attr) {
                                // We expose the powerful $event object on the scope that provides access to the Window,
                                // etc. that isn't protected by the fast paths in $parse.  We explicitly request better
                                // checks at the cost of speed since event handler expressions are not executed as
                                // frequently as regular change detection.
                                var fn = $parse(attr[directiveName], /* interceptorFn */ null, /* expensiveChecks */ true);
                                return function ngEventHandler(scope, element) {
                                    element.on(eventName, function (event) {
                                        var callback = function () {
                                            fn(scope, {$event: event});
                                        };
                                        scope.$apply(callback);
                                    });
                                };
                            }
                        };
                    });
        }
);