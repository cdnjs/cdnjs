(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_quadtree = global.d3_quadtree || {})));
}(this, function (exports) { 'use strict';

  var version = "0.4.0";

  function tree_add(point) {
    if (isNaN(x = +point.x) || isNaN(y = +point.y)) return this; // ignore invalid points

    var node = this._root,
        parent,
        point0,
        x, y,
        xm, ym,
        xp, yp,
        x0 = this._x0, y0 = this._y0,
        x1 = this._x1, y1 = this._y1,
        right,
        bottom,
        i,
        j;

    // Check if this point was previously in a quadtree!
    if (point.next) delete point.next;

    // If the tree is empty, initialize the root as a leaf.
    if (!node) {
      this._root = {point: point};
      this._x0 = this._x1 = x;
      this._y0 = this._y1 = y;
      return this;
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
    // If there is no leaf node, add it.
    while (!(point0 = node.point)) {
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
      if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = {point: point}, this;
    }

    // If the new point is exactly coincident with the specified point, add it.
    if (xp = point0.x, yp = point0.y, x === xp && y === yp) {
      node = {point: point, next: node};
      if (parent) parent[i] = node;
      else this._root = node;
      return this;
    }

    // Otherwise, split the leaf node until the old and new point are separated.
    do {
      parent = parent[i] = new Array(4);
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));

    parent[i] = {point: point};
    parent[j] = node;
    return this;
  }

  function Quad(node, x0, y0, x1, y1) {
    this.node = node;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }

  function tree_visit(callback) {
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

  function tree_visitAfter(callback) {
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

  function tree_find(x, y) {
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

      // Visit this point. (Visiting coincident points isn’t necessary!)
      if (node.point) {
        var dx = x - node.point.x,
            dy = y - node.point.y,
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

  function tree_remove(point) {
    var parent,
        node = this._root,
        previous,
        xm, ym,
        x = +point.x, y = +point.y,
        x0 = this._x0, y0 = this._y0,
        x1 = this._x1, y1 = this._y1,
        right,
        bottom,
        i;

    // If the tree is empty, initialize the root as a leaf.
    if (!node) return false;

    // Find the leaf node for the point.
    while (!node.point) {
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
      if (!(parent = node, node = node[i = bottom << 1 | right])) return false;
    }

    // Find the point to remove.
    while (node.point !== point) if (!(previous = node, node = node.next)) return false;

    // Remove the point, or the leaf if it’s the only point.
    if (previous) previous.next = node.next;
    else if (parent) parent[i] = node.next;
    else this._root = node.next;
    return true;
  }

  function quadtree(x0, y0, x1, y1) {
    if (arguments.length === 2) x1 = x0, y1 = y0, x0 = y0 = 0;
    return new Quadtree(x0, y0, x1, y1);
  }

  function Quadtree(x0, y0, x1, y1) {
    var dx = (x1 = +x1) - (x0 = +x0), dy = (y1 = +y1) - (y0 = +y0);
    if (dy > dx) x1 = (x0 -= (dy - dx) / 2) + dy;
    else y1 = (y0 -= (dx - dy) / 2) + dx;
    this._x0 = x0, this._y0 = y0;
    this._x1 = x1, this._y1 = y1;
    this._root = isNaN(dx) || isNaN(dy) ? undefined : new Array(4);
  }

  var treeProto = Quadtree.prototype = quadtree.prototype;
  treeProto.add = tree_add;
  treeProto.visit = tree_visit;
  treeProto.visitAfter = tree_visitAfter;
  treeProto.find = tree_find;
  treeProto.remove = tree_remove;

  exports.version = version;
  exports.quadtree = quadtree;

}));