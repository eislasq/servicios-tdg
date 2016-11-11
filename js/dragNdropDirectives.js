/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * #############################################
 * This is a copy of ng-click directive and modified to handle Drag and Drop events
 */


'use strict';

/**
 * @ngdoc directive
 * @name ngDrop
 *
 * @description
 * The ngDrop directive allows you to specify custom behavior when
 * an element is clicked.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngDrop {@link guide/expression Expression} to evaluate upon
 * drag and drop. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @example
 <example>
 <file name="index.html">
 <button ng-click="count = count + 1" ng-init="count=0">
 Increment
 </button>
 <span>
 count: {{count}}
 </span>
 </file>
 <file name="protractor.js" type="protractor">
 it('should check ng-click', function() {
 expect(element(by.binding('count')).getText()).toMatch('0');
 element(by.css('button')).click();
 expect(element(by.binding('count')).getText()).toMatch('1');
 });
 </file>
 </example>
 */
/*
 * A collection of directives that allows creation of custom event handlers that are defined as
 * angular expressions and are compiled and executed within the current scope.
 */
var ngDragNdropEventDirectives = {};
[].forEach.call(
        'dragstart drag dragenter dragleave dragover drop dragend'.split(' '),
        function (eventName) {
            var directiveName = 'ng' + eventName[0].toUpperCase() + eventName.slice(1);
            console.log('Creating '+directiveName);
            ngDragNdropEventDirectives[directiveName] = ['$parse', '$rootScope', function ($parse, $rootScope) {
                    return {
                        restrict: 'A',
                        compile: function ($element, attr) {
                            console.log('Drag Event ' + eventName, $element);
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
                }];
        }
);

/**
 * @ngdoc directive
 * @name ngDragover
 *
 * @description
 * The `ngDragover` directive allows you to specify custom behavior on a dragover event.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngDragover {@link guide/expression Expression} to evaluate upon
 * a dragover. (The Event object is available as `$event`)
 *
 * @example
 <example>
 <file name="index.html">
 <button ng-dragover="(function (e) {
 console.log('in');
 e.stopPropagation();
 e.preventDefault();
 e.originalEvent.dataTransfer.dropEffect = 'copy';
 })($event)">
 Dropp files here
 </button>
 </file>
 </example>
 */