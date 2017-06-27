/*!
 * SVG.js Connectable Plugin
 * =========================
 *
 * A JavaScript library for connecting SVG things.
 * Created with <3 and JavaScript by the jillix developers.
 *
 * svg.connectable.js 1.0.1
 * Licensed under the MIT license.
 * */
;(function() {

    var container = null
      , markers = null
      ;

    /**
     * connectable
     * Connects two elements.
     *
     * @name connectable
     * @function
     * @param {Object} options An object containing the following fields:
     *
     *  - `container` (SVGElement): The line elements container.
     *  - `markers` (SVGElement): The marker elements container.
     *
     * @param {SVGElement} elmTarget The target SVG element.
     * @return {Object} The connectable object containing:
     *
     *  - `source` (SVGElement): The source element.
     *  - `target` (SVGElement): The target element.
     *  - `line` (SVGElement): The line element.
     *  - `marker` (SVGElement): The marker element.
     *  - `padEllipe` (Boolean): If `true`, the line coordinates will be placed with a padding.
     *  - [`computeLineCoordinates` (Function)](#computelinecoordinatescon)
     *  - [`update` (Function)](#update)
     *  - [`setLineColor` (Function)](#setlinecolorcolor-c)
     */
    function connectable(options, elmTarget) {

        var con = {};

        if (elmTarget === undefined) {
            elmTarget = options;
            options = {};
        }

        container = options.container || container;
        var elmSource = this;
        markers = options.markers || markers;

        var marker = markers.marker(10, 10)
          , markerId = "triangle-" + Math.random().toString(16)
          , line = container.line().attr("marker-end", "url(#" + markerId + ")")
          ;

        marker.attr({
            id: markerId,
            viewBox: "0 0 10 10",
            refX: "0",
            refY: "5",
            markerUnits: "strokeWidth",
            markerWidth: "4",
            markerHeight: "5"
        });

        marker.path().attr({
            d: "M 0 0 L 10 5 L 0 10 z"
        });

        // Source and target positions
        var sPos = {}
          , tPos = {}
          ;

        // Append the SVG elements
        con.source = elmSource;
        con.target = elmTarget;
        con.line = line;
        con.marker = marker;

        /**
         * computeLineCoordinates
         * The function that computes the new coordinates.
         * It can be overriden with a custom function.
         *
         * @name computeLineCoordinates
         * @function
         * @param {Connectable} con The connectable instance.
         * @return {Object} An object containing the `x1`, `x2`, `y1` and `y2` coordinates.
         */
        con.computeLineCoordinates = function (con) {

            var sT = con.source.transform()
              , tT = con.target.transform()
              , sB = con.source.bbox()
              , tB = con.target.bbox()
              , x1 = sT.x + sB.width / 2
              , y1 = sT.y + sB.height / 2
              , x2 = tT.x + tB.width / 2
              , y2 = tT.y + tB.height / 2
              ;

            return {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2
            };
        };

        if (options.padEllipse) {
            con.computeLineCoordinates = function (con) {
                var sPos = con.source.transform()
                  , tPos = con.target.transform()
                  , elmS = con.source.node.querySelector("ellipse") || con.source.node.querySelector("circle")
                  , elmT = con.target.node.querySelector("ellipse") || con.target.node.querySelector("circle")
                  , xR1, xR2, yR1, yR2;
                  ;


                if (elmS.tagName === "circle") {
                    xR1 = yR1 = parseFloat(elmS.getAttribute("r"));
                    xR2 = yR2 = parseFloat(elmT.getAttribute("r"));
                } else {
                    xR1 = parseFloat(elmS.getAttribute("rx"));
                    yR1 = parseFloat(elmS.getAttribute("ry"));

                    xR2 = parseFloat(elmT.getAttribute("rx"));
                    yR2 = parseFloat(elmT.getAttribute("ry"));
                }

                // Get centers
                var sx = sPos.x + xR1 / 2
                  , sy = sPos.y + yR1 / 2
                  , tx = tPos.x + xR2 / 2
                  , ty = tPos.y + yR2 / 2

                    // Calculate distance from source center to target center
                  , dx = tx - sx
                  , dy = ty - sy
                  , d = Math.sqrt(dx * dx + dy * dy)

                    // Construct unit vector between centers
                  , ux = dx / d
                  , uy = dy / d

                    // Point on source circle
                  , x1 = sx + xR1 * ux
                  , y1 = sy + yR1 * uy

                    // Point on target circle
                  , x2 = sx + (d - xR2 - 5) * ux
                  , y2 = sy + (d - yR2 - 5) * uy
                  ;

                return {
                    x1: x1 + xR1 / 2,
                    y1: y1 + yR1 / 2,
                    x2: x2 + xR2 / 2,
                    y2: y2 + yR2 / 2
                };
            };
        }

        elmSource.cons = elmSource.cons || [];
        elmSource.cons.push(con);

        /**
         * update
         * Updates the line coordinates.
         *
         * @name update
         * @function
         * @return {undefined}
         */
        con.update = function () {
            line.attr(con.computeLineCoordinates(con));
        };
        con.update();
        elmSource.on("dragmove", con.update);
        elmTarget.on("dragmove", con.update);

        /**
         * setLineColor
         * Sets the line color.
         *
         * @name setLineColor
         * @function
         * @param {String} color The new color.
         * @param {Connectable} c The connectable instance.
         * @return {undefined}
         */
        con.setLineColor = function (color, c) {
            c = c || this;
            c.line.stroke(color);
            c.marker.fill(color);
        };

        return con;
    }

    SVG.extend(SVG.Element, {
        connectable: connectable
    });
}).call(this);
