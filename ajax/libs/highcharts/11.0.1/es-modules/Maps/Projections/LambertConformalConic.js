/* *
 * Lambert Conformal Conic projection
 * */
'use strict';
const sign = Math.sign ||
    ((n) => (n === 0 ? 0 : n > 0 ? 1 : -1)), scale = 63.78137, deg2rad = Math.PI / 180, halfPI = Math.PI / 2, eps10 = 1e-6, tany = (y) => Math.tan((halfPI + y) / 2);
class LambertConformalConic {
    constructor(options) {
        var _a;
        const parallels = (options.parallels || [])
            .map((n) => n * deg2rad), lat1 = parallels[0] || 0, lat2 = (_a = parallels[1]) !== null && _a !== void 0 ? _a : lat1, cosLat1 = Math.cos(lat1);
        if (typeof options.projectedBounds === 'object') {
            this.projectedBounds = options.projectedBounds;
        }
        // Apply the global variables
        let n = lat1 === lat2 ?
            Math.sin(lat1) :
            Math.log(cosLat1 / Math.cos(lat2)) / Math.log(tany(lat2) / tany(lat1));
        if (Math.abs(n) < 1e-10) {
            n = (sign(n) || 1) * 1e-10;
        }
        this.n = n;
        this.c = cosLat1 * Math.pow(tany(lat1), n) / n;
    }
    forward(lonLat) {
        const lon = lonLat[0] * deg2rad, { c, n, projectedBounds } = this;
        let lat = lonLat[1] * deg2rad;
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
        const r = c / Math.pow(tany(lat), n), x = r * Math.sin(n * lon) * scale, y = (c - r * Math.cos(n * lon)) * scale, xy = [x, y];
        if (projectedBounds && (x < projectedBounds.x1 ||
            x > projectedBounds.x2 ||
            y < projectedBounds.y1 ||
            y > projectedBounds.y2)) {
            xy.outside = true;
        }
        return xy;
    }
    inverse(xy) {
        const x = xy[0] / scale, y = xy[1] / scale, { c, n } = this, cy = c - y, rho = sign(n) * Math.sqrt(x * x + cy * cy);
        let l = Math.atan2(x, Math.abs(cy)) * sign(cy);
        if (cy * n < 0) {
            l -= Math.PI * sign(x) * sign(cy);
        }
        return [
            (l / n) / deg2rad,
            (2 * Math.atan(Math.pow(c / rho, 1 / n)) - halfPI) / deg2rad
        ];
    }
}
export default LambertConformalConic;
