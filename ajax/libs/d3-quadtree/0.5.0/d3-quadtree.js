(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_quadtree = global.d3_quadtree || {})));
}(this, function (exports) { 'use strict';

  var version = "0.5.0";

  function tree_add(point) {
    if (isNaN(x = +point[0]) || isNaN(y = +point[1])) return this; // ignore invalid points

    // Expand the tree to cover the new point, if necessary.
    this.cover(x, y);

    var node = this._root,
        parent,
        x,
        y,
        x0 = this._x0,
        y0 = this._y0,
        x1 = this._x1,
        y1 = this._y1,
        xm,
        ym,
        xp,
        yp,
        right,
        bottom,
        i,
        j;

    // If the tree is empty, initialize the root as a leaf.
    if (!node) return this._root = {point: point}, this;

    // Find the appropriate leaf node for the new point.
    // If there is no leaf node, add it.
    while (!node.point) {
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
      if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = {point: point}, this;
    }

    // If the new point is exactly coincident with the specified point, add it.
    if (xp = node.point[0], yp = node.point[1], x === xp && y === yp) {
      node = {point: point, next: node};
      if (parent) parent[i] = node;
      else this._root = node;
      return this;
    }

    // Otherwise, split the leaf node until the old and new point are separated.
    do {
      parent = parent ? parent[i] = new Array(4) : this._root = new Array(4);
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));

    parent[i] = {point: point};
    parent[j] = node;
    return this;
  }

  function tree_cover(x, y) {
    if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

    var node = this._root,
        parent,
        i,
        x0 = this._x0,
        y0 = this._y0,
        x1 = this._x1,
        y1 = this._y1,
        z = x1 - x0;

    if (isNaN(x0)) x0 = x1 = x, y0 = y1 = y;

    else if (x0 > x || x > x1 || y0 > y || y > y1) {

      // If the quadtree already has bounds, double repeatedly to cover.
      if (z) {
        switch (i = (y < (y0 + y1) / 2) << 1 | (x < (x0 + x1) / 2)) {
          case 0: {
            do parent = new Array(4), parent[i] = node, node = parent;
            while (z *= 2, x1 = x0 + z, y1 = y0 + z, x > x1 || y > y1);
            break;
          }
          case 1: {
            do parent = new Array(4), parent[i] = node, node = parent;
            while (z *= 2, x0 = x1 - z, y1 = y0 + z, x0 > x || y > y1);
            break;
          }
          case 2: {
            do parent = new Array(4), parent[i] = node, node = parent;
            while (z *= 2, x1 = x0 + z, y0 = y1 - z, x > x1 || y0 > y);
            break;
          }
          case 3: {
            do parent = new Array(4), parent[i] = node, node = parent;
            while (z *= 2, x0 = x1 - z, y0 = y1 - z, x0 > x || y0 > y);
            break;
          }
        }
        if (this._root && !this._root.point) this._root = node;
      }

      // Otherwise, just expand and squarify the bounds.
      else {
        if (y < y0) y0 = y; else y1 = y;
        if (x < x0) x0 = x; else x1 = x;
        var dx = x1 - x0, dy = y1 - y0;
        if (dy > dx) x1 = (x0 -= (dy - dx) / 2) + dy;
        else y1 = (y0 -= (dx - dy) / 2) + dx;
      }
    }

    this._x0 = x0;
    this._y0 = y0;
    this._x1 = x1;
    this._y1 = y1;
    return this;
  }

  function tree_extent() {
    if (!isNaN(this._x0)) return [[this._x0, this._y0], [this._x1, this._y1]];
  }

  function Quad(node, x0, y0, x1, y1) {
    this.node = node;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
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

  function tree_points() {
    var points = [];
    this.visit(function(node) {
      if (node.point) do points.push(node.point); while (node = node.next)
    });
    return points;
  }

  function tree_remove(point) {
    var parent,
        node = this._root,
        retainer,
        previous,
        x = +point[0],
        y = +point[1],
        x0 = this._x0,
        y0 = this._y0,
        x1 = this._x1,
        y1 = this._y1,
        xm,
        ym,
        right,
        bottom,
        i,
        j;

    // If the tree is empty, initialize the root as a leaf.
    if (!node) return false;

    // Find the leaf node for the point.
    // While descending, also retain the deepest parent with a non-removed sibling.
    if (!node.point) while (true) {
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
      if (!(parent = node, node = node[i = bottom << 1 | right])) return false;
      if (node.point) break;
      if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;
    }

    // Find the point to remove.
    while (node.point !== point) if (!(previous = node, node = node.next)) return false;

    // If there are multiple coincident points, remove just the point.
    if (previous) return previous.next = node.next, true;

    // If this is the root point, remove it.
    if (!parent) return this._root = node.next, true;

    // Remove this leaf.
    parent[i] = node.next;

    // If the parent now contains exactly one leaf, collapse superfluous parents.
    if ((node = parent[0] || parent[1] || parent[2] || parent[3])
        && node === (parent[3] || parent[2] || parent[1] || parent[0])
        && node.point) {
      if (retainer) retainer[j] = node;
      else this._root = node;
    }

    return true;
  }

  function tree_root() {
    return this._root;
  }

  function tree_size() {
    var size = 0;
    this.visit(function(node) {
      if (node.point) do ++size; while (node = node.next)
    });
    return size;
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

  function quadtree(_) {
    var tree = new Quadtree(NaN, NaN, NaN, NaN);
    return _ ? tree.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : tree;
  }

  function Quadtree(x0, y0, x1, y1) {
    this._x0 = x0;
    this._y0 = y0;
    this._x1 = x1;
    this._y1 = y1;
    this._root = undefined;
  }

  function tree_copy() {
    var copy = new Quadtree(this._x0, this._y0, this._x1, this._y1),
        node = this._root,
        nodes,
        child;

    if (!node) return copy;

    if (node.point) return copy._root = leaf_copy(node), copy;

    nodes = [{source: node, target: copy._root = new Array(4)}];
    while (node = nodes.pop()) {
      for (var i = 0; i < 4; ++i) {
        if (child = node.source[i]) {
          if (child.point) node.target[i] = leaf_copy(child);
          else nodes.push({source: child, target: node.target[i] = new Array(4)});
        }
      }
    }

    return copy;
  }

  function leaf_copy(leaf) {
    var copy = {point: leaf.point}, next = copy;
    while (leaf = leaf.next) next = next.next = {point: leaf.point};
    return copy;
  }

  var treeProto = Quadtree.prototype = quadtree.prototype;
  treeProto.add = tree_add;
  treeProto.copy = tree_copy;
  treeProto.cover = tree_cover;
  treeProto.extent = tree_extent;
  treeProto.find = tree_find;
  treeProto.points = tree_points;
  treeProto.remove = tree_remove;
  treeProto.root = tree_root;
  treeProto.size = tree_size;
  treeProto.visit = tree_visit;
  treeProto.visitAfter = tree_visitAfter;

  exports.version = version;
  exports.quadtree = quadtree;

}));