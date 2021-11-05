/* *
 * Lambert Conformal Conic projection
 * */
'use strict';
var sign = Math.sign ||
    (function (n) { return (n === 0 ? 0 : n > 0 ? 1 : -1); }), scale = 63.78137, deg2rad = Math.PI / 180, halfPI = Math.PI / 2, eps10 = 1e-6, tany = function (y) { return Math.tan((halfPI + y) / 2); };
var n = 0, c = 0;
var LambertConformalConic = {
    init: function (options) {
        var parallels = (options.parallels || [])
            .map(function (n) { return n * deg2rad; }), lat1 = parallels[0] || 0, lat2 = parallels[1] || lat1, cosLat1 = Math.cos(lat1);
        // Apply the global variables
        n = lat1 === lat2 ?
            Math.sin(lat1) :
            Math.log(cosLat1 / Math.cos(lat2)) / Math.log(tany(lat2) / tany(lat1));
        if (Math.abs(n) < 1e-10) {
            n = (sign(n) || 1) * 1e-10;
        }
        c = cosLat1 * Math.pow(tany(lat1), n) / n;
    },
    forward: function (lonLat) {
        var lon = lonLat[0] * deg2rad;
        var lat = lonLat[1] * deg2rad;
        if (c > 0) {
            if (lat < -halfPI + eps10) {
                lat = -halfPI + eps10;
            }
        }
        else {
            if (lat > halfPI - eps10) {
                lat = halfPI - eps10;
            }
        }
        var r = c / Math.pow(tany(lat), n);
        return [
            r * Math.sin(n * lon) * scale,
            (c - r * Math.cos(n * lon)) * scale
        ];
    },
    inverse: function (xy) {
        var x = xy[0] / scale, y = xy[1] / scale, cy = c - y, rho = sign(n) * Math.sqrt(x * x + cy * cy);
        var l = Math.atan2(x, Math.abs(cy)) * sign(cy);
        if (cy * n < 0) {
            l -= Math.PI * sign(x) * sign(cy);
        }
        return [
            (l / n) / deg2rad,
            (2 * Math.atan(Math.pow(c / rho, 1 / n)) - halfPI) / deg2rad
        ];
    }
};
export default LambertConformalConic;
