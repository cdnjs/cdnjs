/* *
 * Web Mercator projection, used for most online map tile services
 * */
'use strict';
var maxLatitude = 85.0511287798, // The latitude that defines a square
r = 63.78137, deg2rad = Math.PI / 180;
var WebMercator = {
    forward: function (lonLat) {
        if (Math.abs(lonLat[1]) > maxLatitude) {
            return [NaN, NaN];
        }
        var sinLat = Math.sin(lonLat[1] * deg2rad);
        return [
            r * lonLat[0] * deg2rad,
            r * Math.log((1 + sinLat) / (1 - sinLat)) / 2
        ];
    },
    inverse: function (xy) { return [
        xy[0] / (r * deg2rad),
        (2 * Math.atan(Math.exp(xy[1] / r)) - (Math.PI / 2)) / deg2rad
    ]; },
    maxLatitude: maxLatitude
};
export default WebMercator;
