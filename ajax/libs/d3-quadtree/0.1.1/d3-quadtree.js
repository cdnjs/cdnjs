(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3-quadtree', ['exports'], factory) :
  factory((global.d3_quadtree = {}));
}(this, function (exports) { 'use strict';

  function pointX(p) {
    return p[0];
  }

  function pointY(p) {
    return p[1];
  }

  function functor(x) {
    return function() {
      return x;
    };
  }

  function Node() {
    this.x = null;
    this.y = null;
    this.leaf = true;
    this.point = null;
    this.nodes = [];
  }

  function visit(callback, node, x1, y1, x2, y2) {
    if (!callback(node, x1, y1, x2, y2)) {
      var sx = (x1 + x2) * .5,
          sy = (y1 + y2) * .5,
          children = node.nodes;
      if (children[0]) visit(callback, children[0], x1, y1, sx, sy);
      if (children[1]) visit(callback, children[1], sx, y1, x2, sy);
      if (children[2]) visit(callback, children[2], x1, sy, sx, y2);
      if (children[3]) visit(callback, children[3], sx, sy, x2, y2);
    }
  }

  function find(root, x, y, x0, y0, x3, y3) {
    var minDistance2 = Infinity,
        closestPoint;

    (function findChild(node, x1, y1, x2, y2) {

      // stop searching if this cell can’t contain a closer node
      if (x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0) return;

      // visit this point
      if (point = node.point) {
        var point,
            dx = x - node.x,
            dy = y - node.y,
            distance2 = dx * dx + dy * dy;
        if (distance2 < minDistance2) {
          var distance = Math.sqrt(minDistance2 = distance2);
          x0 = x - distance, y0 = y - distance;
          x3 = x + distance, y3 = y + distance;
          closestPoint = point;
        }
      }

      // bisect the current node
      var children = node.nodes,
          xm = (x1 + x2) * .5,
          ym = (y1 + y2) * .5,
          right = x >= xm,
          below = y >= ym;

      // visit closest cell first
      for (var i = below << 1 | right, j = i + 4; i < j; ++i) {
        if (node = children[i & 3]) switch (i & 3) {
          case 0: findChild(node, x1, y1, xm, ym); break;
          case 1: findChild(node, xm, y1, x2, ym); break;
          case 2: findChild(node, x1, ym, xm, y2); break;
          case 3: findChild(node, xm, ym, x2, y2); break;
        }
      }
    })(root, x0, y0, x3, y3);

    return closestPoint;
  }

  function quadtree() {
    var x = pointX,
        y = pointY,
        x1,
        x2,
        y1,
        y2;

    function quadtree(points) {
      var point,
          fx = typeof x === "function" ? x : functor(x),
          fy = typeof y === "function" ? y : functor(y),
          xs,
          ys,
          i,
          n,
          x1_,
          y1_,
          x2_,
          y2_;

      if (!points) points = [];

      if (x1 != null) {
        x1_ = x1, y1_ = y1, x2_ = x2, y2_ = y2;
      } else {
        // Compute bounds, and cache points temporarily.
        x2_ = y2_ = -(x1_ = y1_ = Infinity);
        xs = [], ys = [];
        n = points.length;
        for (i = 0; i < n; ++i) {
          var x_ = +fx(point = points[i], i),
              y_ = +fy(point, i);
          if (x_ < x1_) x1_ = x_;
          if (y_ < y1_) y1_ = y_;
          if (x_ > x2_) x2_ = x_;
          if (y_ > y2_) y2_ = y_;
          xs.push(x_);
          ys.push(y_);
        }
      }

      // Squarify the bounds.
      var dx = x2_ - x1_,
          dy = y2_ - y1_;
      if (isFinite(dx) && isFinite(dy)) {
        if (dx > dy) y2_ = y1_ + dx;
        else x2_ = x1_ + dy;
      }

      // Recursively inserts the specified point at the node or one of its
      // descendants. The bounds are defined by [x1, x2] and [y1, y2].
      function insert(node, point, x, y, x1, y1, x2, y2) {
        if (isNaN(x) || isNaN(y)) return; // ignore invalid points
        if (node.leaf) {
          var nx = node.x,
              ny = node.y;
          if (nx != null) {
            // If the point at this leaf node is at the same position as the new
            // point we are adding, we leave the point associated with the
            // internal node while adding the new point to a child node. This
            // avoids infinite recursion.
            if ((Math.abs(nx - x) + Math.abs(ny - y)) < .01) {
              insertChild(node, point, x, y, x1, y1, x2, y2);
            } else {
              var nPoint = node.point;
              node.x = node.y = node.point = null;
              insertChild(node, nPoint, nx, ny, x1, y1, x2, y2);
              insertChild(node, point, x, y, x1, y1, x2, y2);
            }
          } else {
            node.x = x, node.y = y, node.point = point;
          }
        } else {
          insertChild(node, point, x, y, x1, y1, x2, y2);
        }
      }

      // Recursively inserts the specified point [x, y] into a descendant of node
      // n. The bounds are defined by [x1, x2] and [y1, y2].
      function insertChild(node, point, x, y, x1, y1, x2, y2) {
        // Compute the split point, and the quadrant in which to insert the point.
        var xm = (x1 + x2) * .5,
            ym = (y1 + y2) * .5,
            right = x >= xm,
            below = y >= ym,
            i = below << 1 | right;

        // Recursively insert into the child node.
        node.leaf = false;
        node = node.nodes[i] || (node.nodes[i] = new Node);

        // Update the bounds as we recurse.
        if (right) x1 = xm; else x2 = xm;
        if (below) y1 = ym; else y2 = ym;
        insert(node, point, x, y, x1, y1, x2, y2);
      }

      var root = new Node;

      root.add = function(point) {
        insert(root, point, +fx(point, ++i), +fy(point, i), x1_, y1_, x2_, y2_);
        return root;
      };

      root.visit = function(callback) {
        visit(callback, root, x1_, y1_, x2_, y2_);
        return root;
      };

      // Find the closest point to the specified point.
      // TODO allow the initial search extent to be specified?
      // TODO allow the initial minimum distance to be specified?
      // TODO allow searching below any node?
      root.find = function(x, y) {
        return find(root, x, y, x1_, y1_, x2_, y2_);
      };

      // Insert all points.
      i = -1;
      if (x1 == null) {
        while (++i < n) {
          insert(root, points[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
        }
        --i; // index of last insertion
      } else {
        points.forEach(root.add);
      }

      // Discard captured fields.
      xs = ys = points = point = null;

      return root;
    }

    quadtree.x = function(_) {
      return arguments.length ? (x = _, quadtree) : x;
    };

    quadtree.y = function(_) {
      return arguments.length ? (y = _, quadtree) : y;
    };

    quadtree.extent = function(_) {
      if (!arguments.length) return x1 == null ? null : [[x1, y1], [x2, y2]];
      if (_ == null) x1 = y1 = x2 = y2 = null;
      else x1 = +_[0][0], y1 = +_[0][1], x2 = +_[1][0], y2 = +_[1][1];
      return quadtree;
    };

    quadtree.size = function(_) {
      if (!arguments.length) return x1 == null ? null : [x2 - x1, y2 - y1];
      if (_ == null) x1 = y1 = x2 = y2 = null;
      else x1 = y1 = 0, x2 = +_[0], y2 = +_[1];
      return quadtree;
    };

    return quadtree;
  };

  var version = "0.1.1";

  exports.version = version;
  exports.quadtree = quadtree;

}));