(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3-polygon', ['exports'], factory) :
  factory((global.d3_polygon = {}));
}(this, function (exports) { 'use strict';

  function area(polygon) {
    var i = -1,
        n = polygon.length,
        a,
        b = polygon[n - 1],
        area = 0;

    while (++i < n) {
      a = b;
      b = polygon[i];
      area += a[1] * b[0] - a[0] * b[1];
    }

    return area / 2;
  };

  function centroid(polygon) {
    var i = -1,
        n = polygon.length,
        x = 0,
        y = 0,
        a,
        b = polygon[n - 1],
        c,
        k = 0;

    while (++i < n) {
      a = b;
      b = polygon[i];
      k += c = a[0] * b[1] - b[0] * a[1];
      x += (a[0] + b[0]) * c;
      y += (a[1] + b[1]) * c;
    }

    return k *= 3, [x / k, y / k];
  };

  function inside(polygon, point) {
    var n = polygon.length,
        p = polygon[n - 1],
        x = point[0], y = point[1],
        x0 = p[0], y0 = p[1],
        x1, y1,
        inside = false;

    for (var i = 0; i < n; ++i) {
      p = polygon[i], x1 = p[0], y1 = p[1];
      if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside;
      x0 = x1, y0 = y1;
    }

    return inside;
  };

  function perimeter(polygon) {
    var i = -1,
        n = polygon.length,
        b = polygon[n - 1],
        xa,
        ya,
        xb = b[0],
        yb = b[1],
        perimeter = 0;

    while (++i < n) {
      xa = xb;
      ya = yb;
      b = polygon[i];
      xb = b[0];
      yb = b[1];
      xa -= xb;
      ya -= yb;
      perimeter += Math.sqrt(xa * xa + ya * ya);
    }

    return perimeter;
  };

  var version = "0.0.4";

  exports.version = version;
  exports.area = area;
  exports.centroid = centroid;
  exports.inside = inside;
  exports.perimeter = perimeter;

}));