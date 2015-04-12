/**
 * A directive for AngularJS that makes an effect akin to text being typed on a computer terminal.
 *
 * Copyright 2014 Michael Bromley <michael@michaelbromley.co.uk>
 */
(function() {

    /**
     * Config
     */
    var moduleName = 'angularUtils.directives.dirTerminalType';

    /**
     * Module
     */
    var module;
    try {
        module = angular.module(moduleName);
    } catch(err) {
        // named module does not exist, so create one
        module = angular.module(moduleName, []);
    }

    module.directive('dirTerminalType', ['$window', '$document', '$timeout', '$interpolate', '$parse', function ($window, $document, $timeout, $interpolate, $parse) {

        /**
         * requestAnimationFrame polyfill from http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
         */
        (function() {
            var lastTime = 0;
            var vendors = ['webkit', 'moz'];
            for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                window.cancelAnimationFrame =
                    window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                        timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            }

            if (!window.cancelAnimationFrame) {
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
            }
        }());

        /**
         * Recursively traverse the node tree and set the nodeValue of any text nodes to '', whilst
         * storing the original value in the newly-created field _originalNodeValue for later use.
         *
         * @param node
         * @param totalChars
         * @returns {number}
         */
        function clearTextAndStoreValues(node, totalChars, originalNodeValues) {
            var i;
            totalChars = totalChars || 0;

            if (node.nodeValue !== null) {
                var nodeValue = node.nodeValue.replace(/\s+/g, ' ');
                originalNodeValues.values.push(nodeValue);
                node.nodeValue = '';
                totalChars += nodeValue.length;
            }

            for (i = 0; i < node.childNodes.length; i++) {
                totalChars = clearTextAndStoreValues(node.childNodes[i], totalChars, originalNodeValues);
            }

            return totalChars;
        }

        /**
         * Update the nodeValues of any text nodes within element, filling in the corresponding
         * amount of characters commensurate with the current progress.
         *
         * @param element
         * @param currentIteration
         * @param totalIterations
         * @param totalChars
         * @returns {boolean}
         */
        function type(element, currentIteration, totalIterations, totalChars, originalNodeValues) {
            var currentChar = Math.ceil(currentIteration / totalIterations * totalChars);

            var charsTyped = typeUpToCurrentChar(element, currentChar, 0, originalNodeValues, true);

            var done = totalChars <= charsTyped;
            return done;
        }

        /**
         * Recursive function that traverses a node tree and updates the nodeValue of each
         * text node until the total number of characters "typed" is equal to the value
         * of currentChar.
         *
         * @param node
         * @param currentChar
         * @param charsTyped
         * @returns {*}
         */
        function typeUpToCurrentChar(node, currentChar, charsTyped, originalNodeValues, resetCounter) {

            if (resetCounter) {
                originalNodeValues.counter = 0;
            }

            if (node.nodeValue !== null) {
                var originalValue =  originalNodeValues.values[originalNodeValues.counter];
                if (currentChar - charsTyped < originalValue.length) {
                    var charsToType = currentChar - charsTyped;
                    node.nodeValue = originalValue.substring(0, charsToType);
                    charsTyped += charsToType;
                } else {
                    node.nodeValue = originalValue;
                    charsTyped += originalValue.length;
                }

                originalNodeValues.counter ++;
            }

            for (var i = 0; i < node.childNodes.length; i++) {
                if (charsTyped < currentChar) {
                    charsTyped = typeUpToCurrentChar(node.childNodes[i], currentChar, charsTyped, originalNodeValues);
                } else {
                    break;
                }
            }

            return charsTyped;
        }

        /**
         * Add the caret to the end of the element, and style it to fit the text.
         * First line checks if a caret already exists, in which case do nothing.
         *
         * @param element
         */
        function addCaret(element) {
            var elementAlreadyHasCaret = element[0].querySelector('.dirTerminalType-caret') !== null;

            if (!elementAlreadyHasCaret) {
                var height = parseInt($window.getComputedStyle(element[0])['font-size']);
                height -= 2; // make it a bit smaller to prevent it interfering with document flow.
                var backgroundColor = $window.getComputedStyle(element[0])['color'];
                var width = Math.ceil(height * 0.05);
                var marginBottom = Math.ceil(height * -0.1);
                var caret = $document[0].createElement('span');
                caret.classList.add('dirTerminalType-caret');
                caret.style.height = height + 'px';
                caret.style.width = width + 'px';
                caret.style.backgroundColor = backgroundColor;
                caret.style.marginBottom = marginBottom + 'px';
                element.append(caret);
            }
        }

        function removeCaret(element) {
            var caret = element[0].querySelector('.dirTerminalType-caret');
            angular.element(caret).remove();
        }

        /**
         * If any of the text nodes contain interpolation expressions {{ like.this }}, we need to
         * interpolate them to get the actual value to be displayed. This will change the
         * totalChars count so that must also be updated.
         *
         * @param node
         * @param scope
         * @param totalChars
         */
        function interpolateText(node, scope, totalChars, originalNodeValues, resetCounter) {
            var i,
                currentNodeContent,
                currentLength,
                interpolatedContent,
                interpolatedLength,
                lengthDelta;

            if (resetCounter) {
                originalNodeValues.counter = 0;
            }

            if (node.nodeValue !== null) {
                currentNodeContent = originalNodeValues.values[originalNodeValues.counter];
                currentLength = currentNodeContent.length;
                interpolatedContent = $interpolate(currentNodeContent)(scope);
                interpolatedLength = interpolatedContent.length;

                lengthDelta = interpolatedLength - currentLength;
                totalChars += lengthDelta;
                originalNodeValues.values[originalNodeValues.counter] = interpolatedContent;

                originalNodeValues.counter ++;
            }

            for (i = 0; i < node.childNodes.length; i++) {
                totalChars = interpolateText(node.childNodes[i], scope, totalChars, originalNodeValues);
            }

            return totalChars;
        }

        return {
            restrict: 'AE',
            link: function(scope, element, attrs) {

                /**
                 * These two variables are used to store the original text values of any text nodes in the element. The original approach involved
                 * simply appending a new property onto the DOM node itself, but this proved to be a bad idea since it breaks in IE. This new approach
                 * is a little more complex since we now have to track the index of each text node in the originalNodeValues array.
                 * @type {Array}
                 */
                var originalNodeValues = {
                    values: [],
                    counter: 0
                };

                var totalChars = clearTextAndStoreValues(element[0], 0, originalNodeValues);

                var start, elapsed;
                var duration = attrs.duration || 1000;
                var removeCaretAfter = attrs.removeCaret || 1000;
                var onCompletion = $parse(attrs.onCompletion) || null;
                var forceCaret = typeof attrs.forceCaret !== 'undefined' ? true : false;

                if (typeof attrs.startTyping !=='undefined') {
                    if (forceCaret) {
                        addCaret(element);
                    }
                    scope.$watch(function() {
                        return scope.$eval(attrs.startTyping);
                    }, function(val) {
                        if (val) {
                            startTyping();
                        }
                    });
                } else {
                    startTyping();
                }

                function startTyping() {
                    addCaret(element);
                    totalChars = interpolateText(element[0], scope, totalChars, originalNodeValues, true);
                    window.requestAnimationFrame(tick);
                }

                /**
                 * This is the animation function that gets looped in a requestAnimationFrame call.
                 * @param timestamp
                 */
                function tick(timestamp) {
                    var currentIteration, totalIterations, done;

                    if (typeof start === 'undefined') {
                        start = timestamp;
                    }
                    elapsed = timestamp - start;

                    totalIterations = Math.round(duration / 1000 * 60);
                    currentIteration = Math.round(elapsed / 1000 * 60);
                    done = type(element[0], currentIteration, totalIterations, totalChars, originalNodeValues);

                    if (elapsed < duration && !done) {
                        window.requestAnimationFrame(tick);
                    } else {
                        $timeout(function() {
                            removeCaret(element);
                        }, removeCaretAfter);

                        start = undefined;  // reset

                        // if a callback was defined by the on-completion attribute, invoke it now
                        if (onCompletion !== null) {
                            onCompletion(scope);
                        }
                    }
                }
            }
        };
    }]);

})();
