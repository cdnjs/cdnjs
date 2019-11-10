(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_quadtree = global.d3_quadtree || {})));
}(this, function (exports) { 'use strict';

  var version = "0.3.0";

  function constant(x) {
    return function() {
      return x;
    };
  }

  function Leaf(point) {
    this.point = point;
  }

  function root_add(point) {
    if (isNaN(x = point[0]) || isNaN(y = point[1])) return; // ignore invalid points

    var point0,
        node = this._root,
        parent,
        grandparent,
        x,
        y,
        xm,
        ym,
        x0 = this._x0,
        y0 = this._y0,
        x1 = this._x1,
        y1 = this._y1,
        right,
        bottom,
        i,
        i0;

    // If the tree is empty, initialize the root as a leaf.
    if (!node) {
      this._root = new Leaf(point);
      this._x0 = this._x1 = x;
      this._y0 = this._y1 = y;
      return;
    }

    // Expand the tree to cover the new point, if necessary.
    if (x0 > x || x > x1 || y0 > y || y > y1) {
      xm = x0 === x1 ? Math.max(Math.abs(x0 - x), Math.abs(y0 - y)) : (x1 - x0) * 2;
      switch (i = (y < (y0 + y1) / 2) << 1 | (x < (x0 + x1) / 2)) {
        case 0: do parent = new Array(4), parent[i] = node, node = parent, x1 = x0 + xm, y1 = y0 + xm, xm *= 2; while (x > x1 || y > y1); break;
        case 1: do parent = new Array(4), parent[i] = node, node = parent, x0 = x1 - xm, y1 = y0 + xm, xm *= 2; while (x0 > x || y > y1); break;
        case 2: do parent = new Array(4), parent[i] = node, node = parent, x1 = x0 + xm, y0 = y1 - xm, xm *= 2; while (x > x1 || y0 > y); break;
        case 3: do parent = new Array(4), parent[i] = node, node = parent, x0 = x1 - xm, y0 = y1 - xm, xm *= 2; while (x0 > x || y0 > y); break;
      }
      this._root = node;
      this._x0 = x0, this._x1 = x1;
      this._y0 = y0, this._y1 = y1;
    }

    // Find the appropriate leaf node for the new point.
    do {
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
      grandparent = parent, parent = node, node = node[i0 = i, i = bottom << 1 | right];
    } while (node);

    // If the new point is in an empty node, just add it.
    if (!(point0 = parent.point)) return void (parent[i] = new Leaf(point));

    // If the new point is exactly coincident with the specified point, add it.
    if (x === point0[0] && y === point0[1]) {
      point.next = point0;
      parent.point = point;
      return;
    }

    // Otherwise, split the leaf node until the old and new point are separated.
    parent = grandparent[i0] = new Array(4);
    while (i === (i0 = (point0[1] >= ym) << 1 | (point0[0] >= xm))) {
      parent = parent[i] = new Array(4);
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
      i = bottom << 1 | right;
    }

    parent[i0] = new Leaf(point0);
    parent[i] = new Leaf(point);
  }

  function Quad(node, x0, y0, x1, y1) {
    this.node = node;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }

  function root_eachAfter(callback) {
    var quads = [], next = [], q;
    if (this._root) quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));
    while (q = quads.pop()) {
      var node = q.node, child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
      next.push(q);
    }
    while (q = next.pop()) {
      callback(q.node, q.x0, q.y0, q.x1, q.y1);
    }
    return this;
  }

  function root_eachBefore(callback) {
    var quads = [], q, node = this._root, child, x0, y0, x1, y1;
    if (node) quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));
    while (q = quads.pop()) {
      if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1)) {
        var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
        if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
        if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
        if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
        if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
      }
    }
    return this;
  }

  function root_find(x, y) {
    var minDistance2 = Infinity,
        minPoint,
        x0 = this._x0,
        y0 = this._y0,
        x1,
        y1,
        x2,
        y2,
        x3 = this._x1,
        y3 = this._y1,
        quads = [],
        node = this._root,
        q,
        i;

    if (node) quads.push(new Quad(node, x0, y0, x3, y3));

    while (q = quads.pop()) {
      node = q.node, x1 = q.x0, y1 = q.y0, x2 = q.x1, y2 = q.y1;

      // Stop searching if this quadrant can’t contain a closer node.
      if (!node || x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0) continue;

      // Visit this point.
      if (node.point) {
        var dx = x - node.point[0],
            dy = y - node.point[1],
            d2 = dx * dx + dy * dy;
        if (d2 < minDistance2) {
          var d = Math.sqrt(minDistance2 = d2);
          x0 = x - d, y0 = y - d;
          x3 = x + d, y3 = y + d;
          minPoint = node.point;
        }
      }

      // Bisect the current quadrant.
      var xm = (x1 + x2) / 2,
          ym = (y1 + y2) / 2;

      quads.push(
        new Quad(node[3], xm, ym, x2, y2),
        new Quad(node[2], x1, ym, xm, y2),
        new Quad(node[1], xm, y1, x2, ym),
        new Quad(node[0], x1, y1, xm, ym)
      );

      // Visit the closest quadrant first.
      if (i = (y >= ym) << 1 | (x >= xm)) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    }

    return minPoint;
  }

  function Root() {
    this._x0 =
    this._y0 =
    this._x1 =
    this._y1 = NaN;
    this._root = null;
  }

  var rootProto = Root.prototype;
  rootProto.add = root_add;
  rootProto.eachAfter = root_eachAfter;
  rootProto.eachBefore = root_eachBefore;
  rootProto.find = root_find;

  function defaultX(d) {
    return d[0];
  }

  function defaultY(d) {
    return d[1];
  }

  function quadtree() {
    var x = defaultX,
        y = defaultY,
        ox,
        oy,
        l;

    function quadtree(data) {
      var d, i, n = data.length, p,
          xi, yi,
          x0 = -Infinity,
          y0 = -Infinity,
          x1 = Infinity,
          y1 = Infinity,
          root = new Root;

      if (ox != null) {
        root._root = new Array(4);
        root._x0 = x0 = ox, root._x1 = x1 = ox + l;
        root._y0 = y0 = oy, root._y1 = y1 = oy + l;
      }

      for (i = 0; i < n; ++i) {
        xi = +x(d = data[i], i, data), yi = +y(d, i, data);
        if (x0 > xi || xi >= x1 || y0 > yi || yi >= y1) continue;
        p = [xi, yi], p.data = d, p.index = i;
        root.add(p);
      }

      return root;
    }

    quadtree.x = function(_) {
      return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), quadtree) : x;
    };

    quadtree.y = function(_) {
      return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), quadtree) : y;
    };

    quadtree.extent = function(_) {
      return arguments.length ? (_ == null ? ox = oy = l = null : (ox = +_[0][0], oy = +_[0][1], l = Math.max(_[1][0] - ox, _[1][1] - oy)), quadtree) : ox == null ? null : [[ox, oy], [ox + l, oy + l]];
    };

    quadtree.size = function(_) {
      return arguments.length ? (_ == null ? ox = oy = l = null : (ox = oy = 0, l = Math.max(+_[0], +_[1])), quadtree) : ox == null ? null : [l, l];
    };

    return quadtree;
  }

  exports.version = version;
  exports.quadtree = quadtree;

}));