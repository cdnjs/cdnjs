/* globals Snap, document, navigator */

/**
 *  snapsvg-zpd.js: A zoom/pan/drag plugin for Snap.svg
 * ==================================================
 *
 *  Usage
 * =======
 * var paper = Snap();
 * var bigCircle = paper.circle(150, 150, 100);
 * paper.zpd();
 *
 * // or settings and callback
 * paper.zpd({ zoom: false }), function (err, paper) { });
 *
 * // or callback
 * paper.zpd(function (err, paper) { });
 *
 * // destroy
 * paper.zpd('destroy');
 *
 * // save
 * paper.zpd('save');
 *
 * // load
 * // paper.zpd({ load: SVGMatrix {} });
 *
 * // origin
 * paper.zpd('origin');
 *
 * // zoomTo
 * paper.zoomTo(1);
 *
 * // panTo
 * paper.panTo(0, 0); // original location
 * paper.panTo('+10', 0); // move right
 *
 * // rotate
 * paper.rotate(15); // rotate 15 deg
 *
 *  Notice
 * ========
 * This usually use on present view only. Not for Storing, modifying the paper.
 *
 * Reason:
 * Usually <pan> <zoom> => <svg transform="matrix(a,b,c,d,e,f)"></svg>
 *
 * But if you need to store the <drag> location, (for storing)
 * we have to use <circle cx="x" cy="y"></circle> not <circle tranform="matrix(a,b,c,d,e,f)"></circle>
 *
 *  License
 * =========
 * This code is licensed under the following BSD license:
 *
 * Copyright 2014 Huei Tan <huei90@gmail.com> (Snap.svg integration). All rights reserved.
 * Copyright 2009-2010 Andrea Leofreddi <a.leofreddi@itcharm.com> (original author). All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 *
 *    1. Redistributions of source code must retain the above copyright notice, this list of
 *       conditions and the following disclaimer.
 *
 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
 *       of conditions and the following disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY Andrea Leofreddi ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Andrea Leofreddi OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Andrea Leofreddi.
 */
(function (Snap) {
    Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {

        /**
         * Global variable for snap.svg.zpd plugin
         */
        var snapsvgzpd = {
            uniqueIdPrefix: 'snapsvg-zpd-',     // prefix for the unique ids created for zpd
            dataStore: {}                       // "global" storage for all our zpd elements
        };

        /**
         * Global variable to store root of the svg element
         */
        var rootSvgObject;

        /**
         * remove node parent but keep children
         */
        var _removeNodeKeepChildren = function removeNodeKeepChildren(node) {
            if (!node.parentNode) {
                return;
            }
            while (node.firstChild) {
                node.parentNode.insertBefore(node.firstChild, node);
            }
            node.parentNode.removeChild(node);
        };

        /**
         * Detect is +1 -1 or 1
         * increase decrease or just number
         */
        var _increaseDecreaseOrNumber = function increaseDecreaseOrNumber(defaultValue, input) {
            if (input === undefined) {
                return parseInt(defaultValue);
            } else if (input[0] == '+') {
                return defaultValue + parseInt(input.split('+')[1]);
            } else if (input[0] == '-') {
                return defaultValue - parseInt(input.split('-')[1]);
            } else {
                return parseInt(input);
            }
        };

        /**
         * Sets the current transform matrix of an element.
         */
        var _setCTM = function setCTM(element, matrix, threshold) {
            if (threshold && typeof threshold === 'object') { // array [0.5,2]
                if (matrix.a <= threshold[0]) {
                    return;
                }
                if (matrix.d >= threshold[1]) {
                    return;
                }
            }
            var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
            element.setAttribute("transform", s);
        };

        /**
         * Dumps a matrix to a string (useful for debug).
         */
        var _dumpMatrix = function dumpMatrix(matrix) {
            var s = "[ " + matrix.a + ", " + matrix.c + ", " + matrix.e + "\n  " + matrix.b + ", " + matrix.d + ", " + matrix.f + "\n  0, 0, 1 ]";
            return s;
        };

        /**
         * Instance an SVGPoint object with given event coordinates.
         */
        var _getEventPoint = function getEventPoint(event, svgNode) {

            var p = svgNode.node.createSVGPoint();

            p.x = event.clientX;
            p.y = event.clientY;

            return p;
        };

        /**
         * Get an svg transformation matrix as string representation
         */
        var _getSvgMatrixAsString = function _getMatrixAsString (matrix) {

            return 'matrix(' + matrix.a + ',' + matrix.b + ',' + matrix.c + ',' + matrix.d + ',' + matrix.e + ',' + matrix.f + ')';
        };

        /**
         * add a new <g> element to the paper
         * add paper nodes into <g> element (Snapsvg Element)
         * and give the nodes an unique id like 'snapsvg-zpd-12345'
         * and let this <g> Element to global snapsvgzpd.dataStore['snapsvg-zpd-12345']
         * and
         * <svg>
         *     <def>something</def>
         *     <circle cx="10" cy="10" r="100"></circle>
         * </svg>
         *
         * transform to =>
         *
         * <svg>
         *     <g id="snapsvg-zpd-12345">
         *         <def>something</def>
         *         <circle cx="10" cy="10" r="100"></circle>
         *     </g>
         * </svg>
         */
        var _initZpdElement = function initAndGetZpdElement (svgObject, options) {

            // get root of svg object
            rootSvgObject = svgObject.node;

            // get all child nodes in our svg element
            var rootChildNodes = svgObject.node.childNodes;

            // create a new graphics element in our svg element
            var gElement = svgObject.g();
            var gNode = gElement.node;

            // add our unique id to the element
            gNode.id = snapsvgzpd.uniqueIdPrefix + svgObject.id;

            // check if a matrix has been supplied to initialize the drawing
            if (options.load && typeof options.load === 'object') {

                var matrix = options.load;

                // create a matrix string from our supplied matrix
                var matrixString = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";

                // load <g> transform matrix
                gElement.transform(matrixString);

            } else {
                // initial set <g transform="matrix(1,0,0,1,0,0)">
                gElement.transform('matrix');
            }

            // initialize our index counter for child nodes
            var index = 0;

            // get the number of child nodes in our root node
            // substract -1 to exclude our <g> element
            var noOfChildNodes = rootChildNodes.length - 1;

            // go through all child elements
            // (except the last one, which is our <g> element)
            while (index < noOfChildNodes) {
                gNode.appendChild(rootChildNodes[0]);
                index += 1;
            }

            // define some data to be used in the function internally
            var data = {
                svg: svgObject,
                root: svgObject.node,        // get paper svg
                state: 'none',
                stateTarget: null,
                stateOrigin: null,
                stateTf: null
            };

            // create an element with all required properties
            var item = {
                "element": gElement,
                "data": data,
                "options": options,
            };

            // create some mouse event handlers for our item
            // store them globally for optional removal later on
            item.handlerFunctions = _getHandlerFunctions(item);

            // return our element
            return item;
        };

        /**
         * create some handler functions for our mouse actions
         * we will take advantace of closures to preserve some data
         */
        var _getHandlerFunctions = function getHandlerFunctions(zpdElement) {

            var handleMouseUp = function handleMouseUp (event) {

                if (event.preventDefault) {
                    event.preventDefault();
                }

                event.returnValue = false;

                if (zpdElement.data.state == 'pan' || zpdElement.data.state == 'drag') {

                    // quit pan mode
                    zpdElement.data.state = '';

                }

            };

            var handleMouseDown = function handleMouseDown (event) {

                if (event.preventDefault) {
                    event.preventDefault();
                }

                event.returnValue = false;

                var g = zpdElement.element.node;

                if (
                    event.target.tagName == "svg" || !zpdElement.options.drag // Pan anyway when drag is disabled and the user clicked on an element
                ) {
                    // Pan mode
                    zpdElement.data.state = 'pan';

                    zpdElement.data.stateTf = g.getCTM().inverse();

                    zpdElement.data.stateOrigin = _getEventPoint(event, zpdElement.data.svg).matrixTransform(zpdElement.data.stateTf);

                } else {

                    // Drag mode
                    zpdElement.data.state = 'drag';

                    zpdElement.data.stateTarget = event.target;

                    zpdElement.data.stateTf = g.getCTM().inverse();

                    zpdElement.data.stateOrigin = _getEventPoint(event, zpdElement.data.svg).matrixTransform(zpdElement.data.stateTf);

                }
            };

            var handleMouseMove = function handleMouseMove (event) {

                if (event.preventDefault) {
                    event.preventDefault();
                }

                event.returnValue = false;

                var g = zpdElement.element.node;

                if (zpdElement.data.state == 'pan' && zpdElement.options.pan) {

                    // Pan mode
                    var p = _getEventPoint(event, zpdElement.data.svg).matrixTransform(zpdElement.data.stateTf);

                    _setCTM(g, zpdElement.data.stateTf.inverse().translate(p.x - zpdElement.data.stateOrigin.x, p.y - zpdElement.data.stateOrigin.y));

                } else if (zpdElement.data.state == 'drag' && zpdElement.options.drag) {

                    // Drag mode
                    var dragPoint = _getEventPoint(event, zpdElement.data.svg).matrixTransform(g.getCTM().inverse());

                    _setCTM(zpdElement.data.stateTarget,
                            zpdElement.data.root.createSVGMatrix()
                            .translate(dragPoint.x - zpdElement.data.stateOrigin.x, dragPoint.y - zpdElement.data.stateOrigin.y)
                            .multiply(g.getCTM().inverse())
                            .multiply(zpdElement.data.stateTarget.getCTM()));

                    zpdElement.data.stateOrigin = dragPoint;
                }
            };

            var handleMouseWheel = function handleMouseWheel (event) {

                if (!zpdElement.options.zoom) {
                    return;
                }

                if (event.preventDefault) {
                    event.preventDefault();
                }

                event.returnValue = false;

                var delta = 0;

                if (event.wheelDelta) {
                    delta = event.wheelDelta / 360;  // Chrome/Safari
                }
                else {
                    delta = event.detail / -9;       // Mozilla
                }

                var z = Math.pow(1 + zpdElement.options.zoomScale, delta);

                var g = zpdElement.element.node;

                var p = _getEventPoint(event, zpdElement.data.svg);

                p = p.matrixTransform(g.getCTM().inverse());

                // Compute new scale matrix in current mouse position
                var k = zpdElement.data.root.createSVGMatrix().translate(p.x, p.y).scale(z).translate(-p.x, -p.y);

                _setCTM(g, g.getCTM().multiply(k), zpdElement.options.zoomThreshold);

                if (typeof(stateTf) == 'undefined') {
                    zpdElement.data.stateTf = g.getCTM().inverse();
                }

                zpdElement.data.stateTf = zpdElement.data.stateTf.multiply(k.inverse());
            };

            return {
                "mouseUp": handleMouseUp,
                "mouseDown": handleMouseDown,
                "mouseMove": handleMouseMove,
                "mouseWheel": handleMouseWheel
            };
        };


        /**
         * Register handlers
         * desktop and mobile (?)
         */
        var _setupHandlers = function setupHandlers(svgElement, handlerFunctions) {

            // mobile
            // (?)

            // desktop
            if ('onmouseup' in document.documentElement) {

                // IE < 9 would need to use the event onmouseup, but they do not support svg anyway..
                svgElement.addEventListener('mouseup', handlerFunctions.mouseUp, false);
                svgElement.addEventListener('mousedown', handlerFunctions.mouseDown, false);
                svgElement.addEventListener('mousemove', handlerFunctions.mouseMove, false);

                if (navigator.userAgent.toLowerCase().indexOf('webkit') >= 0 ||
                    navigator.userAgent.toLowerCase().indexOf('trident') >= 0) {
                    svgElement.addEventListener('mousewheel', handlerFunctions.mouseWheel, false); // Chrome/Safari
                }
                else {
                    svgElement.addEventListener('DOMMouseScroll', handlerFunctions.mouseWheel, false); // Others
                }

            }
        };

        /**
         * remove event handlers
         */
        var _tearDownHandlers = function tearDownHandlers(svgElement, handlerFunctions) {

            svgElement.removeEventListener('mouseup', handlerFunctions.mouseUp, false);
            svgElement.removeEventListener('mousedown', handlerFunctions.mouseDown, false);
            svgElement.removeEventListener('mousemove', handlerFunctions.mouseMove, false);

            if (navigator.userAgent.toLowerCase().indexOf('webkit') >= 0 ||
                navigator.userAgent.toLowerCase().indexOf('trident') >= 0) {
                svgElement.removeEventListener('mousewheel', handlerFunctions.mouseWheel, false);
            }
            else {
                svgElement.removeEventListener('DOMMouseScroll', handlerFunctions.mouseWheel, false);
            }
        };

        /* our global zpd function */
        var zpd = function (options, callbackFunc) {

            // get a reference to the current element
            var self = this;

            // define some custom options
            var zpdOptions = {
                pan: true,          // enable or disable panning (default enabled)
                zoom: true,         // enable or disable zooming (default enabled)
                drag: false,        // enable or disable dragging (default disabled)
                zoomScale: 0.2,     // define zoom sensitivity
                zoomThreshold: null // define zoom threshold
            };

            // the situation event of zpd, may be init, reinit, destroy, save, origin
            var situation,
                situationState = {
                    init: 'init',
                    reinit: 'reinit',
                    destroy: 'destroy',
                    save: 'save',
                    origin: 'origin',
                    callback: 'callback'
                };

            var zpdElement = null;

            // it is also possible to only specify a callback function without any options
            if (typeof options === 'function') {
                callbackFunc = options;
                situation = situationState.callback;
            }

            // check if element was already initialized
            if (snapsvgzpd.dataStore.hasOwnProperty(self.id)) {

                // return existing element
                zpdElement =  snapsvgzpd.dataStore[self.id];

                // adapt the stored options, with the options passed in
                if (typeof options === 'object') {
                    for (var prop in options) {
                        zpdElement.options[prop] = options[prop];
                    }
                    situation = situationState.reinit;
                } else if (typeof options === 'string') {
                    situation = options;
                }
            }
            else {

                // adapt the default options
                if (typeof options === 'object') {
                    for (var prop2 in options) {
                        zpdOptions[prop2] = options[prop2];
                    }
                    situation = situationState.init;
                } else if (typeof options === 'string') {
                    situation = options;
                }

                // initialize a new element and save it to our global storage
                zpdElement = _initZpdElement(self, zpdOptions);

                // setup the handlers for our svg-canvas
                _setupHandlers(self.node, zpdElement.handlerFunctions);

                snapsvgzpd.dataStore[self.id] = zpdElement;
            }

            switch (situation) {

                case situationState.init:
                case situationState.reinit:
                case situationState.callback:

                    // callback
                    if (callbackFunc) {
                        callbackFunc(null, zpdElement);
                    }

                    return;

                case situationState.destroy:

                    // remove event handlers
                    _tearDownHandlers(self.node, zpdElement.handlerFunctions);

                    // remove our custom <g> element
                    _removeNodeKeepChildren(self.node.firstChild);

                    // remove the object from our internal storage
                    delete snapsvgzpd.dataStore[self.id];

                    // callback
                    if (callbackFunc) {
                        callbackFunc(null, zpdElement);
                    }

                    return; // exit all

                case situationState.save:

                    var g = document.getElementById(snapsvgzpd.uniqueIdPrefix + self.id);

                    var returnValue = g.getCTM();

                    // callback
                    if (callbackFunc) {
                        callbackFunc(null, returnValue);
                    }

                    return returnValue;

                case situationState.origin:

                    // back to origin location
                    self.zoomTo(1, 1000);

                    // callback
                    if (callbackFunc) {
                        callbackFunc(null, zpdElement);
                    }

                    return;
            }
        };



        /**
         * zoom element to a certain zoom factor
         */
        var zoomTo = function (zoom, interval, ease, callbackFunction) {

            if (zoom < 0 || typeof zoom !== 'number') {
                console.error('zoomTo(arg) should be a number and greater than 0');
                return;
            }

            if (typeof interval !== 'number') {
                interval = 3000;
            }

            var self = this;

            // check if we have this element in our zpd data storage
            if (snapsvgzpd.dataStore.hasOwnProperty(self.id)) {

                // get a reference to the element
                var zpdElement = snapsvgzpd.dataStore[self.id].element;

                var currentTransformMatrix = zpdElement.node.getTransformToElement(rootSvgObject);
                var currentZoom = currentTransformMatrix.a;
                var originX = currentTransformMatrix.e;
                var originY = currentTransformMatrix.f;

                var boundingBox = zpdElement.getBBox();
                var deltaX = parseFloat(boundingBox.width) / 2.0;
                var deltaY = parseFloat(boundingBox.height) / 2.0;

                Snap.animate(currentZoom, zoom, function (value) {

                    // calculate difference of zooming value to initial zoom
                    var deltaZoom = value / currentZoom;

                    if (value !== currentZoom) {

                        // calculate new translation
                        currentTransformMatrix.e = originX - ((deltaX * deltaZoom - deltaX));
                        currentTransformMatrix.f = originY - ((deltaY * deltaZoom - deltaY));

                        // add new scaling
                        currentTransformMatrix.a = value;
                        currentTransformMatrix.d = value;

                        // apply transformation to our element
                        zpdElement.node.setAttribute('transform', _getSvgMatrixAsString(currentTransformMatrix));
                    }

                }, interval, ease, callbackFunction);
            }
        };


        /**
         * move the element to a certain position
         */
        var panTo = function (x, y, interval, ease, cb) {

            // get a reference to the current element
            var self = this;

            // check if we have this element in our zpd data storage
            if (snapsvgzpd.dataStore.hasOwnProperty(self.id)) {

                var zpdElement = snapsvgzpd.dataStore[self.id].element;

                var gMatrix = zpdElement.node.getCTM(),
                    matrixX = _increaseDecreaseOrNumber(gMatrix.e, x),
                    matrixY = _increaseDecreaseOrNumber(gMatrix.f, y),
                    matrixString = "matrix(" + gMatrix.a + "," + gMatrix.b + "," + gMatrix.c + "," + gMatrix.d + "," + matrixX + "," + matrixY + ")";

                // dataStore[me.id].transform(matrixString); // load <g> transform matrix
                zpdElement.animate({ transform: matrixString }, interval || 10, ease || null, function () {
                    if (cb) {
                        cb(null, zpdElement);
                    }
                });

            }
        };

        /**
         * rotate the element to a certain rotation
         */
        var rotate = function (a, x, y, interval, ease, cb) {
            // get a reference to the current element
            var self = this;

            // check if we have this element in our zpd data storage
            if (snapsvgzpd.dataStore.hasOwnProperty(self.id)) {

                var zpdElement = snapsvgzpd.dataStore[self.id].element;

                var gMatrix = zpdElement.node.getCTM(),
                    matrixString = "matrix(" + gMatrix.a + "," + gMatrix.b + "," + gMatrix.c + "," + gMatrix.d + "," + gMatrix.e + "," + gMatrix.f + ")";

                if (!x || typeof x !== 'number') {
                    x = self.node.offsetWidth / 2;
                }
                if (!y || typeof y !== 'number') {
                    y = self.node.offsetHeight / 2;
                }

                // dataStore[me.id].transform(matrixString); // load <g> transform matrix
                zpdElement.animate({ transform: new Snap.Matrix(gMatrix).rotate(a, x, y) }, interval || 10, ease || null, function () {
                    if (cb) {
                        cb(null, zpdElement);
                    }
                });

            }
        };

        Paper.prototype.zpd = zpd;
        Paper.prototype.zoomTo = zoomTo;
        Paper.prototype.panTo = panTo;
        Paper.prototype.rotate = rotate;

        /** More Features to add (click event) help me if you can **/
        // Element.prototype.panToCenter = panToCenter; // arg (ease, interval, cb)


        /** UI for zpdr **/

    });

})(Snap);

