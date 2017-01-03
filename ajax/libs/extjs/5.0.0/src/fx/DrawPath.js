/**
 * @class Ext.fx.DrawPath
 * Provides SVG Paths handling functions. Copied from Ext.draw.Draw in ExtJs 4.2 in order
 * to break the dependencies on parsePathString() and interpolatePaths() in PropertyHandler.js
 * @private
 */
Ext.define('Ext.fx.DrawPath', {
    /* Begin Definitions */

    singleton: true,

    /* End Definitions */

    pathToStringRE: /,?([achlmqrstvxz]),?/gi,
    pathCommandRE: /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,
    pathValuesRE: /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,
    stopsRE: /^(\d+%?)$/,
    radian: Math.PI / 180,

    is: function(o, type) {
        type = String(type).toLowerCase();
        return (type == "object" && o === Object(o)) ||
            (type == "undefined" && typeof o == type) ||
            (type == "null" && o === null) ||
            (type == "array" && Array.isArray && Array.isArray(o)) ||
            (Object.prototype.toString.call(o).toLowerCase().slice(8, -1)) == type;
    },

    // To be deprecated, converts itself (an arrayPath) to a proper SVG path string
    path2string: function () {
        return this.join(",").replace(Ext.fx.DrawPath.pathToStringRE, "$1");
    },

    // Convert the passed arrayPath to a proper SVG path string (d attribute)
    pathToString: function(arrayPath) {
        return arrayPath.join(",").replace(Ext.fx.DrawPath.pathToStringRE, "$1");
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
    }

});
