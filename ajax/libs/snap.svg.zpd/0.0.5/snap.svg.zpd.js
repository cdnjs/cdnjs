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

        var zpd = function (options, cb) {

            var me = this,
                root = me.node, // get paper svg
                rootChildNodes = me.node.childNodes, // []
                preUniqueId = 'snapsvgzpd-',
                state = 'none',
                svgRoot = null,
                stateTarget,
                stateOrigin,
                stateTf;

            /**
             * add paper nodes into <g> element
             * and give the nodes an unique id like 'snapsvg-zpd-12345'
             *
             * <svg>
             *     <def>something</def>
             *     <circle cx="10" cy="10" r="100"></circle>
             * </svg>
             *
             * transform to =>
             *
             * <svg>
             *     <g>
             *         <def>something</def>
             *         <circle cx="10" cy="10" r="100"></circle>
             *     </g>
             * </svg>
             */
            me.gelem = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            me.gelem.id = preUniqueId + me.id; // me.gelem.setAttribute('data-snapsvg-zpd-id', me.id);
            root.appendChild(me.gelem);
            (function () {
                var index = 0;
                while (rootChildNodes.length - 1 > index) { // length -1 because the <g> element
                    if (!rootChildNodes[index]) {
                        index++;
                        continue;
                    }
                    me.gelem.appendChild(rootChildNodes[index]);
                }
            })();

            /**
             * Configuration of the options and extend by options
             *
             * pan
             * zoom
             * drag
             * zoomScale
             */
            me.pan = true; // 1 or 0: enable or disable panning (default enabled)
            me.zoom = true; // 1 or 0: enable or disable zooming (default enabled)
            me.drag = false; // 1 or 0: enable or disable dragging (default disabled)
            me.zoomScale = 0.2; // Zoom sensitivity

            if (typeof options === 'function') {
                cb = options;
            } else if (typeof options === 'object') {
                for (prop in options) {
                    me[prop] = options[prop];
                }
            }

            /**
             * Register handlers
             */
            function setupHandlers() {

                root.onmouseup = handleMouseUp;
                root.onmousedown = handleMouseDown;
                root.onmousemove = handleMouseMove;

                if (navigator.userAgent.toLowerCase().indexOf('webkit') >= 0)
                    root.addEventListener('mousewheel', handleMouseWheel, false); // Chrome/Safari
                else
                    root.addEventListener('DOMMouseScroll', handleMouseWheel, false); // Others

                // callback
                if (cb) cb(null, me);
            }

            /**
             * Instance an SVGPoint object with given event coordinates.
             */
            function getEventPoint(evt) {
                var p = root.createSVGPoint();

                p.x = evt.clientX;
                p.y = evt.clientY;

                return p;
            }

            /**
             * Sets the current transform matrix of an element.
             */
            function setCTM(element, matrix) {
                var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";

                element.setAttribute("transform", s);
            }

            /**
             * Dumps a matrix to a string (useful for debug).
             */
            function dumpMatrix(matrix) {
                var s = "[ " + matrix.a + ", " + matrix.c + ", " + matrix.e + "\n  " + matrix.b + ", " + matrix.d + ", " + matrix.f + "\n  0, 0, 1 ]";

                return s;
            }

            /**
             * Sets attributes of an element.
             */
            function setAttributes(element, attributes) {
                for (var i in attributes)
                    element.setAttributeNS(null, i, attributes[i]);
            }

            /**
             * Handle mouse wheel event.
             */
            function handleMouseWheel(evt) {
                if (!me.zoom)
                    return;

                if (evt.preventDefault)
                    evt.preventDefault();

                evt.returnValue = false;

                var svgDoc = evt.target.ownerDocument;

                var delta;

                if (evt.wheelDelta)
                    delta = evt.wheelDelta / 360; // Chrome/Safari
                else
                    delta = evt.detail / -9; // Mozilla

                var z = Math.pow(1 + me.zoomScale, delta);

                var g = svgDoc.getElementById(preUniqueId + me.id);

                var p = getEventPoint(evt);

                p = p.matrixTransform(g.getCTM().inverse());

                // Compute new scale matrix in current mouse position
                var k = root.createSVGMatrix().translate(p.x, p.y).scale(z).translate(-p.x, -p.y);

                setCTM(g, g.getCTM().multiply(k));

                if (typeof(stateTf) == "undefined")
                    stateTf = g.getCTM().inverse();

                stateTf = stateTf.multiply(k.inverse());
            }

            /**
             * Handle mouse move event.
             */
            function handleMouseMove(evt) {
                if (evt.preventDefault)
                    evt.preventDefault();

                evt.returnValue = false;

                var svgDoc = evt.target.ownerDocument;

                var g = svgDoc.getElementById(preUniqueId + me.id);

                if (state == 'pan' && me.pan) {
                    // Pan mode
                    var p = getEventPoint(evt).matrixTransform(stateTf);

                    setCTM(g, stateTf.inverse().translate(p.x - stateOrigin.x, p.y - stateOrigin.y));
                } else if (state == 'drag' && me.drag) {
                    // Drag mode
                    var p = getEventPoint(evt).matrixTransform(g.getCTM().inverse());

                    setCTM(stateTarget, root.createSVGMatrix().translate(p.x - stateOrigin.x, p.y - stateOrigin.y).multiply(g.getCTM().inverse()).multiply(stateTarget.getCTM()));

                    stateOrigin = p;
                }
            }

            /**
             * Handle click event.
             */
            function handleMouseDown(evt) {
                if (evt.preventDefault)
                    evt.preventDefault();

                evt.returnValue = false;

                var svgDoc = evt.target.ownerDocument;

                var g = svgDoc.getElementById(preUniqueId + me.id);

                if (
                    evt.target.tagName == "svg"
                        || !me.drag // Pan anyway when drag is disabled and the user clicked on an element
                    ) {
                    // Pan mode
                    state = 'pan';

                    stateTf = g.getCTM().inverse();

                    stateOrigin = getEventPoint(evt).matrixTransform(stateTf);
                } else {
                    // Drag mode
                    state = 'drag';

                    stateTarget = evt.target;
                    console.log(evt)

                    stateTf = g.getCTM().inverse();

                    stateOrigin = getEventPoint(evt).matrixTransform(stateTf);
                }
            }

            /**
             * Handle mouse button release event.
             */
            function handleMouseUp(evt) {
                if (evt.preventDefault)
                    evt.preventDefault();

                evt.returnValue = false;

                var svgDoc = evt.target.ownerDocument;

                if (state == 'pan' || state == 'drag') {
                    // Quit pan mode
                    state = '';
                }
            }

            setupHandlers();
        }

        Paper.prototype.zpd = zpd;

    });

})(Snap);

