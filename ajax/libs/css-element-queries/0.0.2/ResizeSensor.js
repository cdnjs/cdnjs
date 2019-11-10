/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
;
(function() {

    /**
     * Class for dimension change detection.
     *
     * @param {Element|Element[]|Elements|jQuery} element
     * @param {Function} callback
     *
     * @constructor
     */
    this.ResizeSensor = function(element, callback) {
        /**
         * Adds a listener to the over/under-flow event.
         *
         * @param {HTMLElement} element
         * @param {Function}    callback
         */
        function addResizeListener(element, callback) {
            if (window.OverflowEvent) {
                //webkit
                element.addEventListener('overflowchanged', function(e) {
                    callback.call(this, e);
                });
            } else {
                element.addEventListener('overflow', function(e) {
                    callback.call(this, e);
                });
                element.addEventListener('underflow', function(e) {
                    callback.call(this, e);
                });
            }
        }

        /**
         *
         * @constructor
         */
        function EventQueue() {
            this.q = [];
            this.add = function(ev) {
                this.q.push(ev);
            };

            var i, j;
            this.call = function() {
                for (i = 0, j = this.q.length; i < j; i++) {
                    this.q[i].call();
                }
            };
        }

        /**
         * @param {HTMLElement} element
         * @param {String}      prop
         * @returns {String|Number}
         */
        function getComputedStyle(element, prop) {
            if (element.currentStyle) {
                return element.currentStyle[prop];
            } else if (window.getComputedStyle) {
                return window.getComputedStyle(element, null).getPropertyValue(prop);
            } else {
                return element.style[prop];
            }
        }

        /**
         *
         * @param {HTMLElement} element
         * @param {Function}    resized
         */
        function attachResizeEvent(element, resized) {
            if (!element.resizedAttached) {
                element.resizedAttached = new EventQueue();
                element.resizedAttached.add(resized);
            } else if (element.resizedAttached) {
                element.resizedAttached.add(resized);
                return;
            }

            if ('onresize' in element && 11 > document.documentMode) {
                //internet explorer up to 10
                if (element.attachEvent) {
                    element.attachEvent('onresize', function() {
                        element.resizedAttached.call();
                    });
                } else if (element.addEventListener) {
                    element.addEventListener('resize', function(){
                        element.resizedAttached.call();
                    });
                }
            } else {
                var myResized = function() {
                    if (setupSensor()) {
                        element.resizedAttached.call();
                    }
                };
                element.resizeSensor = document.createElement('div');
                element.resizeSensor.className = 'resize-sensor';
                var style =
                    'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1;';
                element.resizeSensor.style.cssText = style;
                element.resizeSensor.innerHTML =
                    '<div class="resize-sensor-overflow" style="' + style + '">' +
                        '<div></div>' +
                        '</div>' +
                        '<div class="resize-sensor-underflow" style="' + style + '">' +
                        '<div></div>' +
                        '</div>';
                element.appendChild(element.resizeSensor);

                if ('absolute' !== getComputedStyle(element, 'position')) {
                    element.style.position = 'relative';
                }

                var x = -1,
                    y = -1,
                    firstStyle = element.resizeSensor.firstElementChild.firstChild.style,
                    lastStyle = element.resizeSensor.lastElementChild.firstChild.style;

                function setupSensor() {
                    var change = false,
                        width = element.resizeSensor.offsetWidth,
                        height = element.resizeSensor.offsetHeight;

                    if (x != width) {
                        firstStyle.width = (width - 1) + 'px';
                        lastStyle.width = (width + 1) + 'px';
                        change = true;
                        x = width;
                    }
                    if (y != height) {
                        firstStyle.height = (height - 1) + 'px';
                        lastStyle.height = (height + 1) + 'px';
                        change = true;
                        y = height;
                    }
                    return change;
                }

                setupSensor();
                addResizeListener(element.resizeSensor, myResized);
                addResizeListener(element.resizeSensor.firstElementChild, myResized);
                addResizeListener(element.resizeSensor.lastElementChild, myResized);
            }
        }

        if ('array' === typeof element
            || ('undefined' !== typeof jQuery && element instanceof jQuery) //jquery
            || ('undefined' !== typeof Elements && element instanceof Elements) //mootools
            ) {
            var i = 0, j = element.length;
            for (; i < j; i++) {
                attachResizeEvent(element[i], callback);
            }
        } else {
            attachResizeEvent(element, callback);
        }
    }

})();