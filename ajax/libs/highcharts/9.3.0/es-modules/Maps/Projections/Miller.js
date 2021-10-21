/* *
 * Miller projection
 * */
'use strict';
var quarterPI = Math.PI / 4;
var deg2rad = Math.PI / 180;
var Miller = {
    forward: function (lonLat) { return [
        lonLat[0] * deg2rad,
        1.25 * Math.log(Math.tan(quarterPI + 0.4 * lonLat[1] * deg2rad))
    ]; },
    inverse: function (xy) { return [
        xy[0] / deg2rad,
        2.5 * (Math.atan(Math.exp(0.8 * xy[1])) - quarterPI) / deg2rad
    ]; }
};
export default Miller;
