InteractiveDataDisplay = typeof InteractiveDataDisplay == 'undefined' ? {} : InteractiveDataDisplay;
 
InteractiveDataDisplay.DataTransform = function (dataToPlot, plotToData, domain, type) {
    this.dataToPlot = dataToPlot;
    this.plotToData = plotToData;

    this.domain = domain || {
        isInDomain: function (value) {
            return true;
        }
    };

    this.type = type;
};

var mercator_maxPhi = 85.05112878; //87.1147576363384; // deg
var mercator_R = mercator_maxPhi / Math.log(Math.tan(mercator_maxPhi * Math.PI / 360.0 + Math.PI / 4));
InteractiveDataDisplay.mercatorTransform = new InteractiveDataDisplay.DataTransform(
    function (phi_deg) {
        if (phi_deg >= -mercator_maxPhi && phi_deg <= mercator_maxPhi)
            return mercator_R * Math.log(Math.tan(Math.PI * (phi_deg + 90) / 360));
        else return phi_deg;
    },
    function (y) {
        if (-mercator_maxPhi <= y && y <= mercator_maxPhi) {
            return 360 * Math.atan(Math.exp(y / mercator_R)) / Math.PI - 90;
        }
        return y;
    },
    undefined,
    "mercator"
);


Math.LOGE10 = Math.log(10);

InteractiveDataDisplay.logTransform = new InteractiveDataDisplay.DataTransform(
    function (x_d) {
        return Math.log(x_d) / Math.LOGE10;
    },
    function (x_p) {
        return Math.pow(10, x_p);
    },
    { isInDomain: function (x) { return x > 0.00000001; } },
    "log10"
);

InteractiveDataDisplay.identityTransform = new InteractiveDataDisplay.DataTransform(
    function (x_d) { return x_d; },
    function (x_p) { return x_p; },
    { isInDomain: function (x) { return true } },
    "identity"
);;self.onmessage = function (event) {
    var xscale = event.data.scaleX, xoffset = event.data.offsetX, yscale = event.data.scaleY, yoffset = event.data.offsetY;
    var dataToScreenX, dataToScreenY;
    var hasdtX, hasdtY;

    if (typeof event.data.xDataTransform == 'string') {
        var dt = getDataTransform(event.data.xDataTransform);
        var f = dt.dataToPlot;
        hasdtX = true;
        dataToScreenX = function (x) {
            return f(x) * xscale + xoffset;
        };
    } else {
        hasdtX = false;
        dataToScreenX = function (x) {
            return xscale * x + xoffset;
        };
    }
    if (typeof event.data.yDataTransform == 'string') {
        var dt = getDataTransform(event.data.yDataTransform);
        var f = dt.dataToPlot;
        hasdtY = true;
        dataToScreenY = function (y) {
            return yoffset - f(y) * yscale;
        };
    } else {
        hasdtY = false;
        dataToScreenY = function (y) {
            return yoffset - y * yscale;
        };
    }

    var width = event.data.width;
    var height = event.data.height;

    if (event.data.x.length != event.data.f.length) {
        renderMatrix(event.data.image, width, height, event.data.x, event.data.y, event.data.f, event.data.fmin, event.data.fmax, event.data.palette, event.data.plotRect, dataToScreenX, dataToScreenY, hasdtX, hasdtY);
    } else {
        var screenToDataX, screenToDataY;
        xscale_r = 1 / xscale;
        yscale_r = 1 / yscale;
        if (hasdtX) {
            var plotToData = dt.plotToData;
            screenToDataX = function (xs) {
                return plotToData((xs - xoffset) * xscale_r);
            };
        } else {
            screenToDataX = function (xs) {
                return (xs - xoffset) * xscale_r;
            };
        }
        if (hasdtY) {
            var plotToData = dt.plotToData;
            screenToDataY = function (ys) {
                return plotToData((yoffset - ys) * yscale_r);
            };
        } else {
            screenToDataY = function (ys) {
                return (yoffset - ys) * yscale_r;
            };
        }
        renderGradient(event.data.image, width, height, event.data.x, event.data.y, event.data.f, event.data.fmin, event.data.fmax, event.data.palette, event.data.plotRect, dataToScreenX, screenToDataX, dataToScreenY, screenToDataY, hasdtX, hasdtY);
    }
    event.data.x = undefined;
    event.data.y = undefined;
    event.data.f = undefined;
    event.data.palette = undefined;
    self.postMessage(event.data);
};

var getDataTransform = function (type) {
    if (type == 'mercator')
        return InteractiveDataDisplay.mercatorTransform;
    throw 'Unknown data transform';
};


var renderMatrix = function (image, width, height, x, y, f, fmin, fmax, palette, plotRect, dataToScreenX, dataToScreenY, hasDataTransformX, hasDataTransformY) {
    var n = x.length;
    var m = y.length;
    var imageData = image.data;
    var w = width;
    var h = height;

    var i0, j0;
    var x0, y0; // in data space


    // precomputing y in screen coordinates:
    var yscr = new Float32Array(m);
    for (var i = 0; i < m; i++)
        yscr[i] = dataToScreenY(y[i]) | 0; // floor;

    // start cell
    var leftp = plotRect.x;
    var rightp = leftp + plotRect.width;
    if (hasDataTransformX) {
        for (i0 = 0; i0 < n; i0++) {
            if (dataToScreenX(x[i0]) >= 0) {
                if (i0 == 0) i0++;
                break;
            }
        }
    } else {
        for (i0 = 0; i0 < n; i0++) {
            if (x[i0] >= leftp) {
                if (i0 == 0) i0++;
                break;
            }
        }
    }
    if (i0 == n) return;

    var bottomp = plotRect.y;
    var topp = bottomp + plotRect.height;
    for (j0 = 0; j0 < m; j0++) {
        if (yscr[j0] < h) {
            if (j0 == 0) j0++;
            break;
        }
    }
    if (j0 == m) return;

    // rendering from left to right, bottom to top
    var cellLeft_s = 0, cellRight_s = 0;

    var isNormalized = palette.isNormalized;
    var colors = palette.colors;
    var colN = (colors.length >> 2) - 1;
    if (!isNormalized) {
        fmax = palette.range.max;
        fmin = palette.range.min;
    }
    var paletteK = fmax !== fmin ? 1.0 / (fmax - fmin) : 0;

    for (var i = i0; i < n && cellRight_s < w; i++) {
        // i0 is the right visible edge of the cell
        x0 = x[i - 1];
        var x1 = x[i];

        if (x0 != x0 || x1 != x1) {
            cellRight_s = undefined;
            continue;
        }

        if (cellRight_s)
            cellLeft_s = cellRight_s;
        else
            cellLeft_s = Math.ceil(dataToScreenX(x0));

        cellRight_s = Math.ceil(dataToScreenX(x1));
        if (cellLeft_s < 0) cellLeft_s = 0;
        if (cellRight_s >= w) cellRight_s = w;

        //if (i == n - 1) cellRight_s++;
        if (cellRight_s - cellLeft_s == 0) continue;

        y0 = y[j0 - 1];
        var cellBottom_s = 0,
            cellTop_s = yscr[j0 - 1];
        for (var j = j0; j < m && cellBottom_s >= 0; j++) {
            y0 = y[j - 1];
            var y1 = y[j];

            if (y0 != y0 || y1 != y1) {
                cellTop_s = undefined;
                continue;
            }

            if (cellTop_s)
                cellBottom_s = cellTop_s;
            else
                cellBottom_s = yscr[j - 1];
            cellTop_s = yscr[j];
            if (cellTop_s < 0) cellTop_s = -1;
            if (cellBottom_s >= h) cellBottom_s = h - 1;

            if (cellTop_s - cellBottom_s == 0) continue;

            var _f = f[i - 1][j - 1];
            if (_f != _f) continue;
            var paletteVal = paletteK * (_f - fmin);
            var k = (paletteVal * colN) | 0;
            if (k < 0) k = 0;
            else if (k > colN) k = colN;
            k = k << 2;

            // fills the cell with same color
            for (var ys = cellTop_s + 1; ys <= cellBottom_s; ys++) {
                var index = (w * ys + cellLeft_s) << 2;
                for (var xs = cellLeft_s; xs < cellRight_s; xs++) {
                    imageData[index++] = colors[k];
                    imageData[index++] = colors[k + 1];
                    imageData[index++] = colors[k + 2];
                    imageData[index++] = colors[k + 3];
                }
            }
            if (cellTop_s <= 0) break;
        }
        if (cellRight_s >= w) break;
    }
};


var renderGradient = function (image, width, height, x, y, f, fmin, fmax, palette, plotRect, dataToScreenX, screenToDataX, dataToScreenY, screenToDataY, hasDataTransformX, hasDataTransformY) {
    var n = x.length;
    var m = y.length;
    var imageData = image.data;
    var w = width;
    var h = height;

    // precomputing y in screen coordinates:
    var yscr = new Float32Array(m);
    for (var i = 0; i < m; i++)
        yscr[i] = dataToScreenY(y[i]) | 0; // floor;

    // preparing screen to data mapping
    var mapScreenToDataX = new Float32Array(w);
    for (var xs = 0; xs < w; xs++) {
        mapScreenToDataX[xs] = screenToDataX(xs + 0.5); // todo: make inline transform for linear case
    }
    var mapScreenToDataY = new Float32Array(h);
    for (var ys = 0; ys < h; ys++) {
        mapScreenToDataY[ys] = screenToDataY(ys + 0.5); // todo: make inline transform for linear case
    }

    var i0, j0;
    var x0, y0; // in data space

    // start cell
    var leftp = plotRect.x;
    var rightp = leftp + plotRect.width;
    if (hasDataTransformX) {
        for (i0 = 0; i0 < n; i0++) {
            if (dataToScreenX(x[i0]) >= 0) {
                if (i0 == 0) i0++;
                break;
            }
        }
    } else {
        for (i0 = 0; i0 < n; i0++) {
            if (x[i0] >= leftp) {
                if (i0 == 0) i0++;
                break;
            }
        }
    }
    if (i0 == n) return;

    var bottomp = plotRect.y;
    var topp = bottomp + plotRect.height;
    for (j0 = 0; j0 < m; j0++) {
        if (yscr[j0] < h) {
            if (j0 == 0) j0++;
            break;
        }
    }
    if (j0 == m) return;

    // rendering from left to right, bottom to top
    var cellLeft_s = 0, cellRight_s = 0;

    var isNormalized = palette.isNormalized;
    var colors = palette.colors;
    var colN = (colors.length >> 2) - 1;
    if (!isNormalized) {
        fmax = palette.range.max;
        fmin = palette.range.min;
    }
    var paletteK = fmax !== fmin ? 1.0 / (fmax - fmin) : 0;

    var flb, flt, frt, frb;
    var fi, fi1;

    // rendering the image
    for (var i = i0; i < n && cellRight_s < w; i++) {
        // i0 is the right visible edge of the cell
        x0 = x[i - 1];
        var x1 = x[i];
        if (x0 != x0 || x1 != x1) { // a != a  equiv. isNaN(a)
            cellRight_s = undefined;
            continue;
        }

        if (cellRight_s)
            cellLeft_s = cellRight_s;
        else
            cellLeft_s = Math.ceil(dataToScreenX(x0));
        cellRight_s = Math.ceil(dataToScreenX(x1));
        if (cellLeft_s < 0) cellLeft_s = 0;
        if (cellRight_s >= w) cellRight_s = w;
        if (cellRight_s - cellLeft_s == 0) continue;

        var cellBottom_s = 0, cellTop_s = 0;
        fi = f[i];
        fi1 = f[i - 1];
        for (var j = j0; j < m && cellBottom_s >= 0; j++) {
            y0 = y[j - 1];
            var y1 = y[j];
            if (y0 != y0 || y1 != y1) {
                cellTop_s = undefined;
                continue;
            }

            if (cellTop_s)
                cellBottom_s = cellTop_s;
            else
                cellBottom_s = yscr[j - 1];
            cellTop_s = yscr[j];
            if (cellTop_s < 0) cellTop_s = -1;
            if (cellBottom_s >= h) cellBottom_s = h - 1;
            if (cellBottom_s - cellTop_s == 0) continue;

            // fills the cell
            flt = fi1[j];
            flb = fi1[j - 1];
            frt = fi[j];
            frb = fi[j - 1];

            if (flt != flt || flb != flb || frt != frt || frb != frb)
                continue;

            var kyLeft = (flt - flb) / (y1 - y0);
            var kyRight = (frt - frb) / (y1 - y0);
            for (var ys = cellTop_s + 1; ys <= cellBottom_s; ys++) {
                var index = (w * ys + cellLeft_s) << 2;
                var _y = mapScreenToDataY[ys];
                var fleft = kyLeft * (_y - y0) + flb;
                var fright = kyRight * (_y - y0) + frb;
                var kx = (fright - fleft) / (x1 - x0);

                for (var xs = cellLeft_s; xs < cellRight_s; xs++) {
                    var _x = mapScreenToDataX[xs];
                    var _f = kx * (_x - x0) + fleft;
                    var paletteVal = paletteK * (_f - fmin);
                    var k = (paletteVal * colN) | 0;
                    if (k < 0) k = 0;
                    else if (k > colN) k = colN;
                    k = k << 2;

                    //var color = getColor(paletteVal);
                    //if (xs == cellLeft_s || xs == cellRight_s - 1 ||  /* uncomment to draw the border of cells */
                    //    ys == cellTop_s + 1 || ys == cellBottom_s)
                    //    color = { a: 1, r: 0, g: 0, b: 255 };

                    imageData[index++] = colors[k++];
                    imageData[index++] = colors[k++];
                    imageData[index++] = colors[k++];
                    imageData[index++] = colors[k];
                }
            }
            if (cellTop_s <= 0) break;
        }
        if (cellRight_s >= w) break;
    }
};
