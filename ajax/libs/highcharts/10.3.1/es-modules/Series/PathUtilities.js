/* *
 *
 *  (c) 2010-2022 Pawel Lysy
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
/* *
 *
 *  Functions
 *
 * */
/**
 * General function to apply corner radius to a path
 * @private
 */
function curvedPath(path, r) {
    var d = [];
    for (var i = 0; i < path.length; i++) {
        var x = path[i][1];
        var y = path[i][2];
        if (typeof x === 'number' && typeof y === 'number') {
            // moveTo
            if (i === 0) {
                d.push(['M', x, y]);
            }
            else if (i === path.length - 1) {
                d.push(['L', x, y]);
                // curveTo
            }
            else if (r) {
                var prevSeg = path[i - 1];
                var nextSeg = path[i + 1];
                if (prevSeg && nextSeg) {
                    var x1 = prevSeg[1], y1 = prevSeg[2], x2 = nextSeg[1], y2 = nextSeg[2];
                    // Only apply to breaks
                    if (typeof x1 === 'number' &&
                        typeof x2 === 'number' &&
                        typeof y1 === 'number' &&
                        typeof y2 === 'number' &&
                        x1 !== x2 &&
                        y1 !== y2) {
                        var directionX = x1 < x2 ? 1 : -1, directionY = y1 < y2 ? 1 : -1;
                        d.push([
                            'L',
                            x - directionX * Math.min(Math.abs(x - x1), r),
                            y - directionY * Math.min(Math.abs(y - y1), r)
                        ], [
                            'C',
                            x,
                            y,
                            x,
                            y,
                            x + directionX * Math.min(Math.abs(x - x2), r),
                            y + directionY * Math.min(Math.abs(y - y2), r)
                        ]);
                    }
                }
                // lineTo
            }
            else {
                d.push(['L', x, y]);
            }
        }
    }
    return d;
}
var PathUtilities = {
    curvedPath: curvedPath
};
export default PathUtilities;
