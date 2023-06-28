/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
// Compute bounds from a path element
const boundsFromPath = function (path) {
    let x2 = -Number.MAX_VALUE, x1 = Number.MAX_VALUE, y2 = -Number.MAX_VALUE, y1 = Number.MAX_VALUE, validBounds;
    path.forEach((seg) => {
        const x = seg[seg.length - 2], y = seg[seg.length - 1];
        if (typeof x === 'number' &&
            typeof y === 'number') {
            x1 = Math.min(x1, x);
            x2 = Math.max(x2, x);
            y1 = Math.min(y1, y);
            y2 = Math.max(y2, y);
            validBounds = true;
        }
    });
    if (validBounds) {
        return { x1, y1, x2, y2 };
    }
};
/**
 * Test for point in polygon. Polygon defined as array of [x,y] points.
 * @private
 */
const pointInPolygon = function (point, polygon) {
    let i, j, rel1, rel2, c = false, x = point.x, y = point.y;
    for (i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        rel1 = polygon[i][1] > y;
        rel2 = polygon[j][1] > y;
        if (rel1 !== rel2 &&
            (x < (polygon[j][0] - polygon[i][0]) * (y - polygon[i][1]) /
                (polygon[j][1] - polygon[i][1]) +
                polygon[i][0])) {
            c = !c;
        }
    }
    return c;
};
/* *
 *
 *  Default Export
 *
 * */
const MapUtilities = {
    boundsFromPath,
    pointInPolygon
};
export default MapUtilities;
