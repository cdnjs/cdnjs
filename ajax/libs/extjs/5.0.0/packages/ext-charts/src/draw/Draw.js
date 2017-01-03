/**
 * @class Ext.draw.Draw
 * Base Drawing class.  Provides base drawing functions.
 * @private
 */
Ext.define('Ext.draw.Draw', {
    /* Begin Definitions */

    singleton: true,

    requires: ['Ext.draw.Color'],

    /* End Definitions */

    pathToStringRE: /,?([achlmqrstvxz]),?/gi,
    pathCommandRE: /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,
    pathValuesRE: /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,
    stopsRE: /^(\d+%?)$/,
    radian: Math.PI / 180,

    availableAnimAttrs: {
        along: "along",
        blur: null,
        "clip-rect": "csv",
        cx: null,
        cy: null,
        fill: "color",
        "fill-opacity": null,
        "font-size": null,
        height: null,
        opacity: null,
        path: "path",
        r: null,
        rotation: "csv",
        rx: null,
        ry: null,
        scale: "csv",
        stroke: "color",
        "stroke-opacity": null,
        "stroke-width": null,
        translation: "csv",
        width: null,
        x: null,
        y: null
    },

    is: function(o, type) {
        type = String(type).toLowerCase();
        return (type == "object" && o === Object(o)) ||
            (type == "undefined" && typeof o == type) ||
            (type == "null" && o === null) ||
            (type == "array" && Array.isArray && Array.isArray(o)) ||
            (Object.prototype.toString.call(o).toLowerCase().slice(8, -1)) == type;
    },

    ellipsePath: function(sprite) {
        var attr = sprite.attr;
        return Ext.String.format("M{0},{1}A{2},{3},0,1,1,{0},{4}A{2},{3},0,1,1,{0},{1}z", attr.x, attr.y - attr.ry, attr.rx, attr.ry, attr.y + attr.ry);
    },

    rectPath: function(sprite) {
        var attr = sprite.attr;
        if (attr.radius) {
            return Ext.String.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z", attr.x + attr.radius, attr.y, attr.width - attr.radius * 2, attr.radius, -attr.radius, attr.height - attr.radius * 2, attr.radius * 2 - attr.width, attr.radius * 2 - attr.height);
        }
        else {
            return Ext.String.format("M{0},{1}L{2},{1},{2},{3},{0},{3}z", attr.x, attr.y, attr.width + attr.x, attr.height + attr.y);
        }
    },

    // To be deprecated, converts itself (an arrayPath) to a proper SVG path string
    path2string: function () {
        return this.join(",").replace(Ext.draw.Draw.pathToStringRE, "$1");
    },

    // Convert the passed arrayPath to a proper SVG path string (d attribute)
    pathToString: function(arrayPath) {
        return arrayPath.join(",").replace(Ext.draw.Draw.pathToStringRE, "$1");
    },

    parsePathString: function (pathString) {
        if (!pathString) {
            return null;
        }
        var paramCounts = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0},
            data = [],
            me = this;
        if (me.is(pathString, "array") && me.is(pathString[0], "array")) { // rough assumption
            data = me.pathClone(pathString);
        }
        if (!data.length) {
            String(pathString).replace(me.pathCommandRE, function (a, b, c) {
                var params = [],
                    name = b.toLowerCase();
                c.replace(me.pathValuesRE, function (a, b) {
                    b && params.push(+b);
                });
                if (name == "m" && params.length > 2) {
                    data.push([b].concat(Ext.Array.splice(params, 0, 2)));
                    name = "l";
                    b = (b == "m") ? "l" : "L";
                }
                while (params.length >= paramCounts[name]) {
                    data.push([b].concat(Ext.Array.splice(params, 0, paramCounts[name])));
                    if (!paramCounts[name]) {
                        break;
                    }
                }
            });
        }
        data.toString = me.path2string;
        return data;
    },

    mapPath: function (path, matrix) {
        if (!matrix) {
            return path;
        }
        var x, y, i, ii, j, jj, pathi;
        path = this.path2curve(path);
        for (i = 0, ii = path.length; i < ii; i++) {
            pathi = path[i];
            for (j = 1, jj = pathi.length; j < jj-1; j += 2) {
                x = matrix.x(pathi[j], pathi[j + 1]);
                y = matrix.y(pathi[j], pathi[j + 1]);
                pathi[j] = x;
                pathi[j + 1] = y;
            }
        }
        return path;
    },

    pathClone: function(pathArray) {
        var res = [],
            j, jj, i, ii;
        if (!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array")) { // rough assumption
            pathArray = this.parsePathString(pathArray);
        }
        for (i = 0, ii = pathArray.length; i < ii; i++) {
            res[i] = [];
            for (j = 0, jj = pathArray[i].length; j < jj; j++) {
                res[i][j] = pathArray[i][j];
            }
        }
        res.toString = this.path2string;
        return res;
    },

    pathToAbsolute: function (pathArray) {
        if (!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array")) { // rough assumption
            pathArray = this.parsePathString(pathArray);
        }
        var res = [],
            x = 0,
            y = 0,
            mx = 0,
            my = 0,
            i = 0,
            ln = pathArray.length,
            r, pathSegment, j, ln2;
        // MoveTo initial x/y position
        if (ln && pathArray[0][0] == "M") {
            x = +pathArray[0][1];
            y = +pathArray[0][2];
            mx = x;
            my = y;
            i++;
            res[0] = ["M", x, y];
        }
        for (; i < ln; i++) {
            r = res[i] = [];
            pathSegment = pathArray[i];
            if (pathSegment[0] != pathSegment[0].toUpperCase()) {
                r[0] = pathSegment[0].toUpperCase();
                switch (r[0]) {
                    // Elliptical Arc
                    case "A":
                        r[1] = pathSegment[1];
                        r[2] = pathSegment[2];
                        r[3] = pathSegment[3];
                        r[4] = pathSegment[4];
                        r[5] = pathSegment[5];
                        r[6] = +(pathSegment[6] + x);
                        r[7] = +(pathSegment[7] + y);
                        break;
                    // Vertical LineTo
                    case "V":
                        r[1] = +pathSegment[1] + y;
                        break;
                    // Horizontal LineTo
                    case "H":
                        r[1] = +pathSegment[1] + x;
                        break;
                    case "M":
                    // MoveTo
                        mx = +pathSegment[1] + x;
                        my = +pathSegment[2] + y;
                    default:
                        j = 1;
                        ln2 = pathSegment.length;
                        for (; j < ln2; j++) {
                            r[j] = +pathSegment[j] + ((j % 2) ? x : y);
                        }
                }
            }
            else {
                j = 0;
                ln2 = pathSegment.length;
                for (; j < ln2; j++) {
                    res[i][j] = pathSegment[j];
                }
            }
            switch (r[0]) {
                // ClosePath
                case "Z":
                    x = mx;
                    y = my;
                    break;
                // Horizontal LineTo
                case "H":
                    x = r[1];
                    break;
                // Vertical LineTo
                case "V":
                    y = r[1];
                    break;
                // MoveTo
                case "M":
                    pathSegment = res[i];
                    ln2 = pathSegment.length;
                    mx = pathSegment[ln2 - 2];
                    my = pathSegment[ln2 - 1];
                default:
                    pathSegment = res[i];
                    ln2 = pathSegment.length;
                    x = pathSegment[ln2 - 2];
                    y = pathSegment[ln2 - 1];
            }
        }
        res.toString = this.path2string;
        return res;
    },

    // TO BE DEPRECATED
    pathToRelative: function (pathArray) {
        if (!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array")) {
            pathArray = this.parsePathString(pathArray);
        }
        var res = [],
            x = 0,
            y = 0,
            mx = 0,
            my = 0,
            start = 0,
            r,
            pa,
            i,
            j,
            k,
            len,
            ii,
            jj,
            kk;
        
        if (pathArray[0][0] == "M") {
            x = pathArray[0][1];
            y = pathArray[0][2];
            mx = x;
            my = y;
            start++;
            res.push(["M", x, y]);
        }
        for (i = start, ii = pathArray.length; i < ii; i++) {
            r = res[i] = [];
            pa = pathArray[i];
            if (pa[0] != pa[0].toLowerCase()) {
                r[0] = pa[0].toLowerCase();
                switch (r[0]) {
                    case "a":
                        r[1] = pa[1];
                        r[2] = pa[2];
                        r[3] = pa[3];
                        r[4] = pa[4];
                        r[5] = pa[5];
                        r[6] = +(pa[6] - x).toFixed(3);
                        r[7] = +(pa[7] - y).toFixed(3);
                        break;
                    case "v":
                        r[1] = +(pa[1] - y).toFixed(3);
                        break;
                    case "m":
                        mx = pa[1];
                        my = pa[2];
                    default:
                        for (j = 1, jj = pa.length; j < jj; j++) {
                            r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3);
                        }
                }
            } else {
                r = res[i] = [];
                if (pa[0] == "m") {
                    mx = pa[1] + x;
                    my = pa[2] + y;
                }
                for (k = 0, kk = pa.length; k < kk; k++) {
                    res[i][k] = pa[k];
                }
            }
            len = res[i].length;
            switch (res[i][0]) {
                case "z":
                    x = mx;
                    y = my;
                    break;
                case "h":
                    x += +res[i][len - 1];
                    break;
                case "v":
                    y += +res[i][len - 1];
                    break;
                default:
                    x += +res[i][len - 2];
                    y += +res[i][len - 1];
            }
        }
        res.toString = this.path2string;
        return res;
    },

    // Returns a path converted to a set of curveto commands
    path2curve: function (path) {
        var me = this,
            points = me.pathToAbsolute(path),
            ln = points.length,
            attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
            i, seg, segLn, point;
            
        for (i = 0; i < ln; i++) {
            points[i] = me.command2curve(points[i], attrs);
            if (points[i].length > 7) {
                    points[i].shift();
                    point = points[i];
                    while (point.length) {
                        Ext.Array.splice(points, i++, 0, ["C"].concat(Ext.Array.splice(point, 0, 6)));
                    }
                    Ext.Array.erase(points, i, 1);
                    ln = points.length;
                    i--;
                }
            seg = points[i];
            segLn = seg.length;
            attrs.x = seg[segLn - 2];
            attrs.y = seg[segLn - 1];
            attrs.bx = parseFloat(seg[segLn - 4]) || attrs.x;
            attrs.by = parseFloat(seg[segLn - 3]) || attrs.y;
        }
        return points;
    },
    
    interpolatePaths: function (path, path2) {
        var me = this,
            p = me.pathToAbsolute(path),
            p2 = me.pathToAbsolute(path2),
            attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
            attrs2 = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
            fixArc = function (pp, i) {
                if (pp[i].length > 7) {
                    pp[i].shift();
                    var pi = pp[i];
                    while (pi.length) {
                        Ext.Array.splice(pp, i++, 0, ["C"].concat(Ext.Array.splice(pi, 0, 6)));
                    }
                    Ext.Array.erase(pp, i, 1);
                    ii = Math.max(p.length, p2.length || 0);
                }
            },
            fixM = function (path1, path2, a1, a2, i) {
                if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                    Ext.Array.splice(path2, i, 0, ["M", a2.x, a2.y]);
                    a1.bx = 0;
                    a1.by = 0;
                    a1.x = path1[i][1];
                    a1.y = path1[i][2];
                    ii = Math.max(p.length, p2.length || 0);
                }
            },
            i, ii,
            seg, seg2, seglen, seg2len;
        for (i = 0, ii = Math.max(p.length, p2.length || 0); i < ii; i++) {
            p[i] = me.command2curve(p[i], attrs);
            fixArc(p, i);
            (p2[i] = me.command2curve(p2[i], attrs2));
            fixArc(p2, i);
            fixM(p, p2, attrs, attrs2, i);
            fixM(p2, p, attrs2, attrs, i);
            seg = p[i];
            seg2 = p2[i];
            seglen = seg.length;
            seg2len = seg2.length;
            attrs.x = seg[seglen - 2];
            attrs.y = seg[seglen - 1];
            attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
            attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;
            attrs2.bx = (parseFloat(seg2[seg2len - 4]) || attrs2.x);
            attrs2.by = (parseFloat(seg2[seg2len - 3]) || attrs2.y);
            attrs2.x = seg2[seg2len - 2];
            attrs2.y = seg2[seg2len - 1];
        }
        return [p, p2];
    },
    
    //Returns any path command as a curveto command based on the attrs passed
    command2curve: function (pathCommand, d) {
        var me = this;
        if (!pathCommand) {
            return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
        }
        if (pathCommand[0] != "T" && pathCommand[0] != "Q") {
            d.qx = d.qy = null;
        }
        switch (pathCommand[0]) {
            case "M":
                d.X = pathCommand[1];
                d.Y = pathCommand[2];
                break;
            case "A":
                pathCommand = ["C"].concat(me.arc2curve.apply(me, [d.x, d.y].concat(pathCommand.slice(1))));
                break;
            case "S":
                pathCommand = ["C", d.x + (d.x - (d.bx || d.x)), d.y + (d.y - (d.by || d.y))].concat(pathCommand.slice(1));
                break;
            case "T":
                d.qx = d.x + (d.x - (d.qx || d.x));
                d.qy = d.y + (d.y - (d.qy || d.y));
                pathCommand = ["C"].concat(me.quadratic2curve(d.x, d.y, d.qx, d.qy, pathCommand[1], pathCommand[2]));
                break;
            case "Q":
                d.qx = pathCommand[1];
                d.qy = pathCommand[2];
                pathCommand = ["C"].concat(me.quadratic2curve(d.x, d.y, pathCommand[1], pathCommand[2], pathCommand[3], pathCommand[4]));
                break;
            case "L":
                pathCommand = ["C"].concat(d.x, d.y, pathCommand[1], pathCommand[2], pathCommand[1], pathCommand[2]);
                break;
            case "H":
                pathCommand = ["C"].concat(d.x, d.y, pathCommand[1], d.y, pathCommand[1], d.y);
                break;
            case "V":
                pathCommand = ["C"].concat(d.x, d.y, d.x, pathCommand[1], d.x, pathCommand[1]);
                break;
            case "Z":
                pathCommand = ["C"].concat(d.x, d.y, d.X, d.Y, d.X, d.Y);
                break;
        }
        return pathCommand;
    },

    quadratic2curve: function (x1, y1, ax, ay, x2, y2) {
        var _13 = 1 / 3,
            _23 = 2 / 3;
        return [
                _13 * x1 + _23 * ax,
                _13 * y1 + _23 * ay,
                _13 * x2 + _23 * ax,
                _13 * y2 + _23 * ay,
                x2,
                y2
            ];
    },
    
    rotate: function (x, y, rad) {
        var cos = Math.cos(rad),
            sin = Math.sin(rad),
            X = x * cos - y * sin,
            Y = x * sin + y * cos;
        return {x: X, y: Y};
    },

    arc2curve: function (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
        // for more information of where this Math came from visit:
        // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
        var me = this,
            PI = Math.PI,
            radian = me.radian,
            _120 = PI * 120 / 180,
            rad = radian * (+angle || 0),
            res = [],
            math = Math,
            mcos = math.cos,
            msin = math.sin,
            msqrt = math.sqrt,
            mabs = math.abs,
            masin = math.asin,
            xy, x, y, h, rx2, ry2, k, cx, cy, f1, f2, df, c1, s1, c2, s2,
            t, hx, hy, m1, m2, m3, m4, newres, i, ln, f2old, x2old, y2old;
        if (!recursive) {
            xy = me.rotate(x1, y1, -rad);
            x1 = xy.x;
            y1 = xy.y;
            xy = me.rotate(x2, y2, -rad);
            x2 = xy.x;
            y2 = xy.y;
            x = (x1 - x2) / 2;
            y = (y1 - y2) / 2;
            h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
            if (h > 1) {
                h = msqrt(h);
                rx = h * rx;
                ry = h * ry;
            }
            rx2 = rx * rx;
            ry2 = ry * ry;
            k = (large_arc_flag == sweep_flag ? -1 : 1) *
                    msqrt(mabs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)));
            cx = k * rx * y / ry + (x1 + x2) / 2;
            cy = k * -ry * x / rx + (y1 + y2) / 2;
            f1 = masin(((y1 - cy) / ry).toFixed(7));
            f2 = masin(((y2 - cy) / ry).toFixed(7));

            f1 = x1 < cx ? PI - f1 : f1;
            f2 = x2 < cx ? PI - f2 : f2;
            if (f1 < 0) {
                f1 = PI * 2 + f1;
            }
            if (f2 < 0) {
                f2 = PI * 2 + f2;
            }
            if (sweep_flag && f1 > f2) {
                f1 = f1 - PI * 2;
            }
            if (!sweep_flag && f2 > f1) {
                f2 = f2 - PI * 2;
            }
        }
        else {
            f1 = recursive[0];
            f2 = recursive[1];
            cx = recursive[2];
            cy = recursive[3];
        }
        df = f2 - f1;
        if (mabs(df) > _120) {
            f2old = f2;
            x2old = x2;
            y2old = y2;
            f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
            x2 = cx + rx * mcos(f2);
            y2 = cy + ry * msin(f2);
            res = me.arc2curve(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
        }
        df = f2 - f1;
        c1 = mcos(f1);
        s1 = msin(f1);
        c2 = mcos(f2);
        s2 = msin(f2);
        t = math.tan(df / 4);
        hx = 4 / 3 * rx * t;
        hy = 4 / 3 * ry * t;
        m1 = [x1, y1];
        m2 = [x1 + hx * s1, y1 - hy * c1];
        m3 = [x2 + hx * s2, y2 - hy * c2];
        m4 = [x2, y2];
        m2[0] = 2 * m1[0] - m2[0];
        m2[1] = 2 * m1[1] - m2[1];
        if (recursive) {
            return [m2, m3, m4].concat(res);
        }
        else {
            res = [m2, m3, m4].concat(res).join().split(",");
            newres = [];
            ln = res.length;
            for (i = 0;  i < ln; i++) {
                newres[i] = i % 2 ? me.rotate(res[i - 1], res[i], rad).y : me.rotate(res[i], res[i + 1], rad).x;
            }
            return newres;
        }
    },

    // TO BE DEPRECATED
    rotateAndTranslatePath: function (sprite) {
        var alpha = sprite.rotation.degrees,
            cx = sprite.rotation.x,
            cy = sprite.rotation.y,
            dx = sprite.translation.x,
            dy = sprite.translation.y,
            path,
            i,
            p,
            xy,
            j,
            res = [];
        if (!alpha && !dx && !dy) {
            return this.pathToAbsolute(sprite.attr.path);
        }
        dx = dx || 0;
        dy = dy || 0;
        path = this.pathToAbsolute(sprite.attr.path);
        for (i = path.length; i--;) {
            p = res[i] = path[i].slice();
            if (p[0] == "A") {
                xy = this.rotatePoint(p[6], p[7], alpha, cx, cy);
                p[6] = xy.x + dx;
                p[7] = xy.y + dy;
            } else {
                j = 1;
                while (p[j + 1] != null) {
                    xy = this.rotatePoint(p[j], p[j + 1], alpha, cx, cy);
                    p[j] = xy.x + dx;
                    p[j + 1] = xy.y + dy;
                    j += 2;
                }
            }
        }
        return res;
    },

    // TO BE DEPRECATED
    rotatePoint: function (x, y, alpha, cx, cy) {
        if (!alpha) {
            return {
                x: x,
                y: y
            };
        }
        cx = cx || 0;
        cy = cy || 0;
        x = x - cx;
        y = y - cy;
        alpha = alpha * this.radian;
        var cos = Math.cos(alpha),
            sin = Math.sin(alpha);
        return {
            x: x * cos - y * sin + cx,
            y: x * sin + y * cos + cy
        };
    },

    pathDimensions: function (path) {
        if (!path || !(path + "")) {
            return {x: 0, y: 0, width: 0, height: 0};
        }
        path = this.path2curve(path);
        var x = 0, 
            y = 0,
            X = [],
            Y = [],
            i = 0,
            ln = path.length,
            p, xmin, ymin, xmax, ymax, dim;
        for (; i < ln; i++) {
            p = path[i];
            if (p[0] == "M") {
                x = p[1];
                y = p[2];
                X.push(x);
                Y.push(y);
            }
            else {
                dim = this.curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                X = X.concat(dim.min.x, dim.max.x);
                Y = Y.concat(dim.min.y, dim.max.y);
                x = p[5];
                y = p[6];
            }
        }
        xmin = Math.min.apply(0, X);
        ymin = Math.min.apply(0, Y);
        xmax = Math.max.apply(0, X);
        ymax = Math.max.apply(0, Y);
        return {
            x: Math.round(xmin),
            y: Math.round(ymin),
            path: path,
            width: Math.round(xmax - xmin),
            height: Math.round(ymax - ymin)
        };
    },

    intersectInside: function(path, cp1, cp2) {
        return (cp2[0] - cp1[0]) * (path[1] - cp1[1]) > (cp2[1] - cp1[1]) * (path[0] - cp1[0]);
    },

    intersectIntersection: function(s, e, cp1, cp2) {
        var p = [],
            dcx = cp1[0] - cp2[0],
            dcy = cp1[1] - cp2[1],
            dpx = s[0] - e[0],
            dpy = s[1] - e[1],
            n1 = cp1[0] * cp2[1] - cp1[1] * cp2[0],
            n2 = s[0] * e[1] - s[1] * e[0],
            n3 = 1 / (dcx * dpy - dcy * dpx);

        p[0] = (n1 * dpx - n2 * dcx) * n3;
        p[1] = (n1 * dpy - n2 * dcy) * n3;
        return p;
    },

    intersect: function(subjectPolygon, clipPolygon) {
        var me = this,
            i = 0,
            ln = clipPolygon.length,
            cp1 = clipPolygon[ln - 1],
            outputList = subjectPolygon,
            cp2, s, e, ln2, inputList, j;
        for (; i < ln; ++i) {
            cp2 = clipPolygon[i];
            inputList = outputList;
            outputList = [];
            s = inputList[inputList.length - 1];
            j = 0;
            ln2 = inputList.length;
            for (; j < ln2; j++) {
                e = inputList[j];
                if (me.intersectInside(e, cp1, cp2)) {
                    if (!me.intersectInside(s, cp1, cp2)) {
                        outputList.push(me.intersectIntersection(s, e, cp1, cp2));
                    }
                    outputList.push(e);
                }
                else if (me.intersectInside(s, cp1, cp2)) {
                    outputList.push(me.intersectIntersection(s, e, cp1, cp2));
                }
                s = e;
            }
            cp1 = cp2;
        }
        return outputList;
    },
    
    bezier : function (a, b, c, d, x) {
        if (x === 0) {
            return a;
        } 
        else if (x === 1) {
            return d;
        }
        var du = 1 - x,
            d3 = du * du * du,
            r = x / du;
        return d3 * (a + r * (3 * b + r * (3 * c + d * r)));
    },
    
    bezierDim : function (a, b, c, d) {
        var points = [], r,
            A, top, C, delta, bottom, s,
            min, max, i;
        // The min and max happens on boundary or b' == 0
        if (a + 3 * c == d + 3 * b) {   
            r = a - b;
            r /= 2 * (a - b - b + c);
            if ( r < 1 && r > 0) {
                points.push(r);
            }
        } else {
            // b'(x) / -3 = (a-3b+3c-d)x^2+ (-2a+4b-2c)x + (a-b)
            // delta = -4 (-b^2+a c+b c-c^2-a d+b d)
            A = a - 3 * b + 3 * c - d;
            top = 2 * (a - b - b + c);
            C = a - b;
            delta = top * top - 4 * A * C;
            bottom = A + A;
            if (delta === 0) {
                r = top / bottom;
                if (r < 1 && r > 0) {
                    points.push(r);
                }
            } else if (delta > 0) {
                s = Math.sqrt(delta);
                r = (s + top) / bottom;
                
                if (r < 1 && r > 0) {
                    points.push(r);
                }
                
                r = (top - s) / bottom;
                
                if (r < 1 && r > 0) {
                    points.push(r);
                }
            }
        }
        min = Math.min(a, d);
        max = Math.max(a, d);
        for (i = 0; i < points.length; i++) {
            min = Math.min(min, this.bezier(a, b, c, d, points[i]));
            max = Math.max(max, this.bezier(a, b, c, d, points[i]));
        }
        return [min, max];
    },
    
    curveDim: function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
        var x = this.bezierDim(p1x, c1x, c2x, p2x),
            y = this.bezierDim(p1y, c1y, c2y, p2y);
        return {
            min: {
                x: x[0],
                y: y[0]
            },
            max: {
                x: x[1],
                y: y[1]
            }
        };
    },

    /**
     * @private
     *
     * Calculates bezier curve control anchor points for a particular point in a path, with a
     * smoothing curve applied. The smoothness of the curve is controlled by the 'value' parameter.
     * Note that this algorithm assumes that the line being smoothed is normalized going from left
     * to right; it makes special adjustments assuming this orientation.
     *
     * @param {Number} prevX X coordinate of the previous point in the path
     * @param {Number} prevY Y coordinate of the previous point in the path
     * @param {Number} curX X coordinate of the current point in the path
     * @param {Number} curY Y coordinate of the current point in the path
     * @param {Number} nextX X coordinate of the next point in the path
     * @param {Number} nextY Y coordinate of the next point in the path
     * @param {Number} value A value to control the smoothness of the curve; this is used to
     *                 divide the distance between points, so a value of 2 corresponds to
     *                 half the distance between points (a very smooth line) while higher values
     *                 result in less smooth curves. Defaults to 4.
     * @return {Object} Object containing x1, y1, x2, y2 bezier control anchor points; x1 and y1
     *                  are the control point for the curve toward the previous path point, and
     *                  x2 and y2 are the control point for the curve toward the next path point.
     */
    getAnchors: function (prevX, prevY, curX, curY, nextX, nextY, value) {
        value = value || 4;
        var M = Math,
            PI = M.PI,
            halfPI = PI / 2,
            abs = M.abs,
            sin = M.sin,
            cos = M.cos,
            atan = M.atan,
            control1Length, control2Length, control1Angle, control2Angle,
            control1X, control1Y, control2X, control2Y, alpha;

        // Find the length of each control anchor line, by dividing the horizontal distance
        // between points by the value parameter.
        control1Length = (curX - prevX) / value;
        control2Length = (nextX - curX) / value;

        // Determine the angle of each control anchor line. If the middle point is a vertical
        // turnaround then we force it to a flat horizontal angle to prevent the curve from
        // dipping above or below the middle point. Otherwise we use an angle that points
        // toward the previous/next target point.
        if ((curY >= prevY && curY >= nextY) || (curY <= prevY && curY <= nextY)) {
            control1Angle = control2Angle = halfPI;
        } else {
            control1Angle = atan((curX - prevX) / abs(curY - prevY));
            if (prevY < curY) {
                control1Angle = PI - control1Angle;
            }
            control2Angle = atan((nextX - curX) / abs(curY - nextY));
            if (nextY < curY) {
                control2Angle = PI - control2Angle;
            }
        }

        // Adjust the calculated angles so they point away from each other on the same line
        alpha = halfPI - ((control1Angle + control2Angle) % (PI * 2)) / 2;
        if (alpha > halfPI) {
            alpha -= PI;
        }
        control1Angle += alpha;
        control2Angle += alpha;

        // Find the control anchor points from the angles and length
        control1X = curX - control1Length * sin(control1Angle);
        control1Y = curY + control1Length * cos(control1Angle);
        control2X = curX + control2Length * sin(control2Angle);
        control2Y = curY + control2Length * cos(control2Angle);

        // One last adjustment, make sure that no control anchor point extends vertically past
        // its target prev/next point, as that results in curves dipping above or below and
        // bending back strangely. If we find this happening we keep the control angle but
        // reduce the length of the control line so it stays within bounds.
        if ((curY > prevY && control1Y < prevY) || (curY < prevY && control1Y > prevY)) {
            control1X += abs(prevY - control1Y) * (control1X - curX) / (control1Y - curY);
            control1Y = prevY;
        }
        if ((curY > nextY && control2Y < nextY) || (curY < nextY && control2Y > nextY)) {
            control2X -= abs(nextY - control2Y) * (control2X - curX) / (control2Y - curY);
            control2Y = nextY;
        }
        
        return {
            x1: control1X,
            y1: control1Y,
            x2: control2X,
            y2: control2Y
        };
    },

    /* Smoothing function for a path.  Converts a path into cubic beziers.  Value defines the divider of the distance between points.
     * Defaults to a value of 4.
     */
    smooth: function (originalPath, value) {
        var path = this.path2curve(originalPath),
            newp = [path[0]],
            x = path[0][1],
            y = path[0][2],
            j,
            points,
            i = 1,
            ii = path.length,
            beg = 1,
            mx = x,
            my = y,
            pathi,
            pathil,
            pathim,
            pathiml,
            pathip,
            pathipl,
            begl;
        
        for (; i < ii; i++) {
            pathi = path[i];
            pathil = pathi.length;
            pathim = path[i - 1];
            pathiml = pathim.length;
            pathip = path[i + 1];
            pathipl = pathip && pathip.length;
            if (pathi[0] == "M") {
                mx = pathi[1];
                my = pathi[2];
                j = i + 1;
                while (path[j][0] != "C") {
                    j++;
                }
                newp.push(["M", mx, my]);
                beg = newp.length;
                x = mx;
                y = my;
                continue;
            }
            if (pathi[pathil - 2] == mx && pathi[pathil - 1] == my && (!pathip || pathip[0] == "M")) {
                begl = newp[beg].length;
                points = this.getAnchors(pathim[pathiml - 2], pathim[pathiml - 1], mx, my, newp[beg][begl - 2], newp[beg][begl - 1], value);
                newp[beg][1] = points.x2;
                newp[beg][2] = points.y2;
            }
            else if (!pathip || pathip[0] == "M") {
                points = {
                    x1: pathi[pathil - 2],
                    y1: pathi[pathil - 1]
                };
            } else {
                points = this.getAnchors(pathim[pathiml - 2], pathim[pathiml - 1], pathi[pathil - 2], pathi[pathil - 1], pathip[pathipl - 2], pathip[pathipl - 1], value);
            }
            newp.push(["C", x, y, points.x1, points.y1, pathi[pathil - 2], pathi[pathil - 1]]);
            x = points.x2;
            y = points.y2;
        }
        return newp;
    },

    findDotAtSegment: function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
        var t1 = 1 - t;
        return {
            x: Math.pow(t1, 3) * p1x + Math.pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + Math.pow(t, 3) * p2x,
            y: Math.pow(t1, 3) * p1y + Math.pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + Math.pow(t, 3) * p2y
        };
    },

    /**
     * @private
     */
    snapEnds: function (from, to, stepsMax, prettyNumbers) {
        if (Ext.isDate(from)) {
            return this.snapEndsByDate(from, to, stepsMax);
        }
        var step = (to - from) / stepsMax,
            level = Math.floor(Math.log(step) / Math.LN10) + 1,
            m = Math.pow(10, level),
            cur,
            floor,
            modulo = Math.round((step % m) * Math.pow(10, 2 - level)),
            interval = [[0, 15], [10, 1], [20, 4], [25, 2], [50, 9], [100, 15]],
            stepCount = 0,
            value,
            weight,
            i,
            topValue,
            topWeight = 1e9,
            ln = interval.length;

        floor = Math.floor(from / m) * m;
        if (from == floor && floor > 0) {
            floor = Math.floor((from - (m/10)) / m) * m;
        }
        
        if (prettyNumbers) {
            for (i = 0; i < ln; i++) {
                value = interval[i][0];
                weight = (value - modulo) < 0 ? 1e6 : (value - modulo) / interval[i][1];
                if (weight < topWeight) {
                    topValue = value;
                    topWeight = weight;
                }
            }
            step = Math.floor(step * Math.pow(10, -level)) * Math.pow(10, level) + topValue * Math.pow(10, level - 2);

            if (from < 0 && to >= 0) {
                cur = 0;
                while (cur > from) {
                    cur -= step;
                    stepCount++;
                }
                from = +cur.toFixed(10);

                cur = 0;
                while (cur < to) {
                    cur += step;
                    stepCount++;
                }
                to = +cur.toFixed(10);
            } else {
                cur = from = floor;
                while (cur < to) {
                    cur += step;
                    stepCount++;
                }
            }
            to = +cur.toFixed(10);
        } else {
            from = floor;
            stepCount = stepsMax;
        }
        
        return {
            from: from,
            to: to,
            power: level,
            step: step,
            steps: stepCount
        };
    },

    /**
     * snapEndsByDate is a utility method to deduce an appropriate tick configuration for the data set of given
     * feature. Refer to {@link #snapEnds}.
     *
     * @param {Date} from The minimum value in the data
     * @param {Date} to The maximum value in the data
     * @param {Number} stepsMax The maximum number of ticks
     * @param {Boolean} lockEnds If true, the 'from' and 'to' parameters will be used as fixed end values and will not be adjusted
     *
     * @return {Object} The calculated step and ends info; properties are:
     * - from: The result start value, which may be lower than the original start value
     * - to: The result end value, which may be higher than the original end value
     * - step: The fixed value size of each step, or undefined if the steps are not fixed.
     * - steps: The number of steps if the steps are fixed, or an array of step values.
     
     * NOTE: Even when the steps have a fixed value, they may not divide the from/to range perfectly evenly;
     * there may be a smaller distance between the last step and the end value than between prior
     * steps, particularly when the `endsLocked` param is true. Therefore it is best to not use
     * the `steps` result when finding the axis tick points, instead use the `step`, `to`, and
     * `from` to find the correct point for each tick.
     */
    snapEndsByDate: function (from, to, stepsMax, lockEnds) {
        var selectedStep = false,
            scales       = [
                [Ext.Date.MILLI, [1, 2, 5, 10, 20, 50, 100, 200, 250, 500]],
                [Ext.Date.SECOND, [1, 2, 5, 10, 15, 30]],
                [Ext.Date.MINUTE, [1, 2, 5, 10, 15, 30]],
                [Ext.Date.HOUR, [1, 2, 3, 4, 6, 12]],
                [Ext.Date.DAY, [1, 2, 7, 14]],
                [Ext.Date.MONTH, [1, 2, 3, 6]]
            ],
            sLen         = scales.length,
            stop         = false,
            scale, j, yearDiff, s;

        // Find the most desirable scale
        for (s = 0; s < sLen; s++) {
            scale = scales[s];
            if (!stop) {
                for (j = 0; j < scale[1].length; j++) {
                    if (to < Ext.Date.add(from, scale[0], scale[1][j] * stepsMax)) {
                        selectedStep = [scale[0], scale[1][j]];
                        stop         = true;
                        break;
                    }
                }
            }
        }

        if (!selectedStep) {
            yearDiff = this.snapEnds(from.getFullYear(), to.getFullYear() + 1, stepsMax, lockEnds);
            selectedStep = [Date.YEAR, Math.round(yearDiff.step)];
        }
        return this.snapEndsByDateAndStep(from, to, selectedStep, lockEnds);
    },


    /**
     * snapEndsByDateAndStep is a utility method to deduce an appropriate tick configuration for the data set of given
     * feature and specific step size.
     *
     * @param {Date} from The minimum value in the data
     * @param {Date} to The maximum value in the data
     * @param {Array} step An array with two components: The first is the unit of the step (day, month, year, etc). 
     * The second is the number of units for the step (1, 2, etc.).
     * If the number is an integer, it represents the number of units for the step ([Ext.Date.DAY, 2] means "Every other day").
     * If the number is a fraction, it represents the number of steps per unit ([Ext.Date.DAY, 1/2] means "Twice a day").
     * If the unit is the month, the steps may be adjusted depending on the month. For instance [Ext.Date.MONTH, 1/3], which means "Three times a month",
     * generates steps on the 1st, the 10th and the 20th of every month regardless of whether a month has 28 days or 31 days. The steps are generated
     * as follows:
     * - [Ext.Date.MONTH, n]: on the current date every 'n' months, maxed to the number of days in the month.
     * - [Ext.Date.MONTH, 1/2]: on the 1st and 15th of every month.
     * - [Ext.Date.MONTH, 1/3]: on the 1st, 10th and 20th of every month.
     * - [Ext.Date.MONTH, 1/4]: on the 1st, 8th, 15th and 22nd of every month.
     * @param {Boolean} lockEnds If true, the 'from' and 'to' parameters will be used as fixed end values
     *        and will not be adjusted
     *
     * @return {Object} The calculated step and ends info; properties are:
     * - from: The result start value, which may be lower than the original start value
     * - to: The result end value, which may be higher than the original end value
     * - step: The fixed value size of each step, or undefined if the steps are not fixed.
     * - steps: The number of steps if the steps are fixed, or an array of step values.
     
     * NOTE: Even when the steps have a fixed value, they may not divide the from/to range perfectly evenly;
     * there may be a smaller distance between the last step and the end value than between prior
     * steps, particularly when the `endsLocked` param is true. Therefore it is best to not use
     * the `steps` result when finding the axis tick points, instead use the `step`, `to`, and
     * `from` to find the correct point for each tick. For Ext.Date.MONTH and Ext.Date.YEAR step unit,
     * `steps` are always returned as array instead of number of steps; this is because months and years
     * have uneven step distribution and dividing them in even intervals does not work correctly.
     */

    snapEndsByDateAndStep: function(from, to, step, lockEnds) {
        var fromStat = [from.getFullYear(), from.getMonth(), from.getDate(),
            from.getHours(), from.getMinutes(), from.getSeconds(), from.getMilliseconds()],
            testFrom, testTo, date, year, month, day, fractionalMonth, stepsArray,
            stepUnit = step[0], stepValue = step[1],
            steps = 0;
        
        if (lockEnds) {
            testFrom = from;
        }
        else {
            switch (stepUnit) {
                case Ext.Date.MILLI:
                    testFrom = new Date(fromStat[0], fromStat[1], fromStat[2], fromStat[3],
                            fromStat[4], fromStat[5], Math.floor(fromStat[6] / stepValue) * stepValue);
                    break;
                case Ext.Date.SECOND:
                    testFrom = new Date(fromStat[0], fromStat[1], fromStat[2], fromStat[3],
                            fromStat[4], Math.floor(fromStat[5] / stepValue) * stepValue, 0);
                    break;
                case Ext.Date.MINUTE:
                    testFrom = new Date(fromStat[0], fromStat[1], fromStat[2], fromStat[3],
                            Math.floor(fromStat[4] / stepValue) * stepValue, 0, 0);
                    break;
                case Ext.Date.HOUR:
                    testFrom = new Date(fromStat[0], fromStat[1], fromStat[2],
                            Math.floor(fromStat[3] / stepValue) * stepValue, 0, 0, 0);
                    break;
                case Ext.Date.DAY:
                    testFrom = new Date(fromStat[0], fromStat[1],
                            Math.floor((fromStat[2] - 1) / stepValue) * stepValue + 1, 0, 0, 0, 0);
                    break;
                case Ext.Date.MONTH:
                    testFrom = new Date(fromStat[0], Math.floor(fromStat[1] / stepValue) * stepValue, 1, 0, 0, 0, 0);
                    steps = [];
                    stepsArray = true;
                    break;
                default: // Ext.Date.YEAR
                    testFrom = new Date(Math.floor(fromStat[0] / stepValue) * stepValue, 0, 1, 0, 0, 0, 0);
                    steps = [];
                    stepsArray = true;
                    break;
            }
        }

        fractionalMonth = ((stepUnit === Ext.Date.MONTH) && (stepValue == 1/2 || stepValue == 1/3 || stepValue == 1/4));

        // TODO(zhangbei) : We can do it better somehow...
        testTo = new Date(testFrom);
        while (testTo < to) {
            if (fractionalMonth) {
                date = new Date(testTo);
                year = date.getFullYear();
                month = date.getMonth();
                day = date.getDate();
                switch(stepValue) {
                    case 1/2:   // the 1st and 15th of every month
                        if (day >= 15) {
                            day = 1;
                            if (++month > 11) {
                                year++;
                            }
                        }
                        else {
                            day = 15;
                        }
                        break;

                    case 1/3:   // the 1st, 10th and 20th of every month
                        if (day >= 20) {
                            day = 1;
                            if (++month > 11) {
                                year++;
                            }
                        }
                        else {
                            if (day >= 10) {
                                day = 20
                            }
                            else {
                                day = 10;
                            }
                        }
                        break;

                    case 1/4:   // the 1st, 8th, 15th and 22nd of every month
                        if (day >= 22) {
                            day = 1;
                            if (++month > 11) {
                                year++;
                            }
                        }
                        else {
                            if (day >= 15) {
                                day = 22
                            }
                            else {
                                if (day >= 8) {
                                    day = 15
                                }
                                else {
                                    day = 8;
                                }
                            }
                        }
                        break;
                }
                testTo.setYear(year);
                testTo.setMonth(month);
                testTo.setDate(day);
                steps.push(new Date(testTo));
            }
            else if (stepsArray) {
                testTo = Ext.Date.add(testTo, stepUnit, stepValue);
                steps.push(new Date(testTo));
            }
            else {
                testTo = Ext.Date.add(testTo, stepUnit, stepValue);                
                steps++;
            }
        }

        if (lockEnds) {
            testTo = to;
        }
        
        if (stepsArray) {
            return {
                from : +testFrom,
                to : +testTo,
                steps : steps   // array of steps
            };            
        }
        else {
            return {
                from : +testFrom,
                to : +testTo,
                step : (testTo - testFrom) / steps,
                steps : steps   // number of steps
            };            
        }
    },

    sorter: function (a, b) {
        return a.offset - b.offset;
    },

    rad: function(degrees) {
        return degrees % 360 * Math.PI / 180;
    },

    normalizeRadians: function(radian) {
        var twoPi = 2 * Math.PI;
        if (radian >= 0) {
            return radian % twoPi;
        }
        return ((radian % twoPi) + twoPi) % twoPi;
    },

    degrees: function(radian) {
        return radian * 180 / Math.PI % 360;
    },

    normalizeDegrees: function(degrees) {
        if (degrees >= 0) {
            return degrees % 360;
        }
        return ((degrees % 360) + 360) % 360;
    },

    withinBox: function(x, y, bbox) {
        bbox = bbox || {};
        return (x >= bbox.x && x <= (bbox.x + bbox.width) && y >= bbox.y && y <= (bbox.y + bbox.height));
    },

    parseGradient: function(gradient) {
        var me = this,
            type = gradient.type || 'linear',
            angle = gradient.angle || 0,
            radian = me.radian,
            stops = gradient.stops,
            stopsArr = [],
            stop,
            vector,
            max,
            stopObj;

        if (type == 'linear') {
            vector = [0, 0, Math.cos(angle * radian), Math.sin(angle * radian)];
            max = 1 / (Math.max(Math.abs(vector[2]), Math.abs(vector[3])) || 1);
            vector[2] *= max;
            vector[3] *= max;
            if (vector[2] < 0) {
                vector[0] = -vector[2];
                vector[2] = 0;
            }
            if (vector[3] < 0) {
                vector[1] = -vector[3];
                vector[3] = 0;
            }
        }

        for (stop in stops) {
            if (stops.hasOwnProperty(stop) && me.stopsRE.test(stop)) {
                stopObj = {
                    offset: parseInt(stop, 10),
                    color: Ext.draw.Color.toHex(stops[stop].color) || '#ffffff',
                    opacity: stops[stop].opacity || 1
                };
                stopsArr.push(stopObj);
            }
        }
        // Sort by pct property
        Ext.Array.sort(stopsArr, me.sorter);
        if (type == 'linear') {
            return {
                id: gradient.id,
                type: type,
                vector: vector,
                stops: stopsArr
            };
        }
        else {
            return {
                id: gradient.id,
                type: type,
                centerX: gradient.centerX,
                centerY: gradient.centerY,
                focalX: gradient.focalX,
                focalY: gradient.focalY,
                radius: gradient.radius,
                vector: vector,
                stops: stopsArr
            };
        }
    }
});
