(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.hierarchy = {}));
}(this, function (exports) { 'use strict';

  // Pre-order traversal.
  function visitBefore(node, callback) {
    var nodes = [node];
    while ((node = nodes.pop()) != null) {
      callback(node);
      if ((children = node.children) && (n = children.length)) {
        var n, children;
        while (--n >= 0) nodes.push(children[n]);
      }
    }
  };

  // Post-order traversal.
  function visitAfter(node, callback) {
    var nodes = [node], nodes2 = [];
    while ((node = nodes.pop()) != null) {
      nodes2.push(node);
      if ((children = node.children) && (n = children.length)) {
        var i = -1, n, children;
        while (++i < n) nodes.push(children[i]);
      }
    }
    while ((node = nodes2.pop()) != null) {
      callback(node);
    }
  };

  function links(nodes) {
    var links = [];
    nodes.forEach(function(parent) {
      if (parent.children) parent.children.forEach(function(child) {
        links.push({source: parent, target: child});
      });
    });
    return links;
  };

  function defaultChildren(d) {
    return d.children;
  }

  function defaultValue(d) {
    return d.value;
  }

  function defaultSort$1(a, b) {
    return b.value - a.value;
  }

  function rebind(layout, hierarchy) {

    layout.sort = function() {
      var x = hierarchy.sort.apply(hierarchy, arguments);
      return x === hierarchy ? layout : x;
    };

    layout.children = function() {
      var x = hierarchy.children.apply(hierarchy, arguments);
      return x === hierarchy ? layout : x;
    };

    layout.value = function() {
      var x = hierarchy.value.apply(hierarchy, arguments);
      return x === hierarchy ? layout : x;
    };

    layout.nodes = layout;
    layout.links = links;

    return layout;
  };

  function hierarchy() {
    var sort = defaultSort$1,
        children = defaultChildren,
        value = defaultValue;

    function hierarchy(root) {
      var stack = [root],
          nodes = [],
          node;

      root.parent = null;
      root.depth = 0;

      while ((node = stack.pop()) != null) {
        nodes.push(node);
        if ((childs = children.call(hierarchy, node, node.depth)) && (n = childs.length)) {
          var n, childs, child;
          while (--n >= 0) {
            stack.push(child = childs[n]);
            child.parent = node;
            child.depth = node.depth + 1;
          }
          if (value) node.value = 0;
          node.children = childs;
        } else {
          if (value) node.value = +value.call(hierarchy, node, node.depth) || 0;
          delete node.children;
        }
      }

      visitAfter(root, function(node) {
        var childs, parent;
        if (sort && (childs = node.children)) childs.sort(sort);
        if (value && (parent = node.parent)) parent.value += node.value;
      });

      return nodes;
    }

    hierarchy.nodes = hierarchy;

    hierarchy.links = links;

    hierarchy.sort = function(x) {
      return arguments.length ? (sort = x, hierarchy) : sort;
    };

    hierarchy.children = function(x) {
      return arguments.length ? (children = x, hierarchy) : children;
    };

    hierarchy.value = function(x) {
      return arguments.length ? (value = x, hierarchy) : value;
    };

    hierarchy.revalue = function(root) {
      if (value) {
        visitBefore(root, function(node) {
          if (node.children) node.value = 0;
        });
        visitAfter(root, function(node) {
          var parent;
          if (!node.children) node.value = +value.call(hierarchy, node, node.depth) || 0;
          if (parent = node.parent) parent.value += node.value;
        });
      }
      return root;
    };

    return hierarchy;
  };

  var phi = (1 + Math.sqrt(5)) / 2; // golden ratio

  function padNone(node) {
    return {x: node.x, y: node.y, dx: node.dx, dy: node.dy};
  }

  function padStandard(node, padding) {
    var x = node.x + padding[3],
        y = node.y + padding[0],
        dx = node.dx - padding[1] - padding[3],
        dy = node.dy - padding[0] - padding[2];
    if (dx < 0) { x += dx / 2; dx = 0; }
    if (dy < 0) { y += dy / 2; dy = 0; }
    return {x: x, y: y, dx: dx, dy: dy};
  }

  var modes = {
    "slice": 1,
    "dice": 1,
    "slice-dice": 1,
    "squarify": 1
  };

  // Squarified Treemaps by Mark Bruls, Kees Huizing, and Jarke J. van Wijk.
  // Modified to support a target aspect ratio by Jeff Heer.
  function treemap() {
    var layout = hierarchy(),
        round = Number,
        size = [1, 1], // width, height
        padding = null,
        pad = padNone,
        sticky = false,
        stickies,
        mode = "squarify",
        ratio = phi;

    function padFunction(node) {
      var p = padding.call(treemap, node, node.depth);
      return p == null
          ? padNone(node)
          : padStandard(node, typeof p === "number" ? [p, p, p, p] : p);
    }

    function padConstant(node) {
      return padStandard(node, padding);
    }

    // Compute the area for each child based on value & scale.
    function scale(children, k) {
      var i = -1,
          n = children.length,
          child,
          area;
      while (++i < n) {
        area = (child = children[i]).value * (k < 0 ? 0 : k);
        child.area = isNaN(area) || area <= 0 ? 0 : area;
      }
    }

    // Recursively arranges the specified node's children into squarified rows.
    function squarify(node) {
      var children = node.children;
      if (children && children.length) {
        var rect = pad(node),
            row = [],
            remaining = children.slice(), // copy-on-write
            child,
            best = Infinity, // the best row score so far
            score, // the current row score
            u = mode === "slice" ? rect.dx
              : mode === "dice" ? rect.dy
              : mode === "slice-dice" ? node.depth & 1 ? rect.dy : rect.dx
              : Math.min(rect.dx, rect.dy), // initial orientation
            n;
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;
        while ((n = remaining.length) > 0) {
          row.push(child = remaining[n - 1]);
          row.area += child.area;
          if (mode !== "squarify" || (score = worst(row, u)) <= best) { // continue with this orientation
            remaining.pop();
            best = score;
          } else { // abort, and try a different orientation
            row.area -= row.pop().area;
            position(row, u, rect, false);
            u = Math.min(rect.dx, rect.dy);
            row.length = row.area = 0;
            best = Infinity;
          }
        }
        if (row.length) {
          position(row, u, rect, true);
          row.length = row.area = 0;
        }
        children.forEach(squarify);
      }
    }

    // Recursively resizes the specified node's children into existing rows.
    // Preserves the existing layout!
    function stickify(node) {
      var children = node.children;
      if (children && children.length) {
        var rect = pad(node),
            remaining = children.slice(), // copy-on-write
            child,
            row = [];
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;
        while (child = remaining.pop()) {
          row.push(child);
          row.area += child.area;
          if (child.z != null) {
            position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
            row.length = row.area = 0;
          }
        }
        children.forEach(stickify);
      }
    }

    // Computes the score for the specified row, as the worst aspect ratio.
    function worst(row, u) {
      var s = row.area,
          r,
          rmax = 0,
          rmin = Infinity,
          i = -1,
          n = row.length;
      while (++i < n) {
        if (!(r = row[i].area)) continue;
        if (r < rmin) rmin = r;
        if (r > rmax) rmax = r;
      }
      s *= s;
      u *= u;
      return s
          ? Math.max((u * rmax * ratio) / s, s / (u * rmin * ratio))
          : Infinity;
    }

    // Positions the specified row of nodes. Modifies `rect`.
    function position(row, u, rect, flush) {
      var i = -1,
          n = row.length,
          x = rect.x,
          y = rect.y,
          v = u ? round(row.area / u) : 0,
          o;
      if (u == rect.dx) { // horizontal subdivision
        if (flush || v > rect.dy) v = rect.dy; // over+underflow
        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dy = v;
          x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
        }
        o.z = true;
        o.dx += rect.x + rect.dx - x; // rounding error
        rect.y += v;
        rect.dy -= v;
      } else { // vertical subdivision
        if (flush || v > rect.dx) v = rect.dx; // over+underflow
        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dx = v;
          y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
        }
        o.z = false;
        o.dy += rect.y + rect.dy - y; // rounding error
        rect.x += v;
        rect.dx -= v;
      }
    }

    function treemap(d) {
      var nodes = stickies || layout(d),
          root = nodes[0];
      root.x = 0;
      root.y = 0;
      root.dx = size[0];
      root.dy = size[1];
      if (stickies) layout.revalue(root);
      scale([root], root.dx * root.dy / root.value);
      (stickies ? stickify : squarify)(root);
      if (sticky) stickies = nodes;
      return nodes;
    }

    treemap.size = function(x) {
      if (!arguments.length) return size.slice();
      size = [+x[0], +x[1]];
      return treemap;
    };

    treemap.padding = function(x) {
      if (!arguments.length) return Array.isArray(padding) ? padding.slice() : padding;
      var t;
      pad = x == null ? (padding = null, padNone)
          : (t = typeof x) === "function" ? (padding = x, padFunction)
          : t === "number" ? (padding = [x, x, x, x], padConstant)
          : (padding = [+x[0], +x[1], +x[2], +x[3]], padConstant);
      return treemap;
    };

    treemap.round = function(x) {
      if (!arguments.length) return round !== Number;
      round = x ? Math.round : Number;
      return treemap;
    };

    treemap.sticky = function(x) {
      if (!arguments.length) return sticky;
      sticky = !!x, stickies = null;
      return treemap;
    };

    treemap.ratio = function(x) {
      if (!arguments.length) return ratio;
      ratio = +x;
      return treemap;
    };

    treemap.mode = function(x) {
      if (!arguments.length) return mode;
      mode = modes.hasOwnProperty(x) ? x + "" : "squarify";
      return treemap;
    };

    return rebind(treemap, layout);
  };

  function defaultSeparation(a, b) {
    return a.parent === b.parent ? 1 : 2;
  };

  // function radialSeparation(a, b) {
  //   return (a.parent === b.parent ? 1 : 2) / a.depth;
  // }

  // This function is used to traverse the left contour of a subtree (or
  // subforest). It returns the successor of v on this contour. This successor is
  // either given by the leftmost child of v or by the thread of v. The function
  // returns null if and only if v is on the highest level of its subtree.
  function nextLeft(v) {
    var children = v.children;
    return children.length ? children[0] : v.t;
  }

  // This function works analogously to nextLeft.
  function nextRight(v) {
    var children = v.children, n;
    return (n = children.length) ? children[n - 1] : v.t;
  }

  // Shifts the current subtree rooted at w+. This is done by increasing
  // prelim(w+) and mod(w+) by shift.
  function moveSubtree(wm, wp, shift) {
    var change = shift / (wp.i - wm.i);
    wp.c -= change;
    wp.s += shift;
    wm.c += change;
    wp.z += shift;
    wp.m += shift;
  }

  // All other shifts, applied to the smaller subtrees between w- and w+, are
  // performed by this function. To prepare the shifts, we have to adjust
  // change(w+), shift(w+), and change(w-).
  function executeShifts(v) {
    var shift = 0,
        change = 0,
        children = v.children,
        i = children.length,
        w;
    while (--i >= 0) {
      w = children[i];
      w.z += shift;
      w.m += shift;
      shift += w.s + (change += w.c);
    }
  }

  // If vi-’s ancestor is a sibling of v, returns vi-’s ancestor. Otherwise,
  // returns the specified (default) ancestor.
  function nextAncestor(vim, v, ancestor) {
    return vim.a.parent === v.parent ? vim.a : ancestor;
  }

  // Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
  function tree() {
    var layout = hierarchy().sort(null).value(null),
        separation = defaultSeparation,
        size = [1, 1], // width, height
        nodeSize = null;

    function tree(d, i) {
      var nodes = layout.call(this, d, i),
          root0 = nodes[0],
          root1 = wrapTree(root0);

      // Compute the layout using Buchheim et al.'s algorithm.
      visitAfter(root1, firstWalk), root1.parent.m = -root1.z;
      visitBefore(root1, secondWalk);

      // If a fixed node size is specified, scale x and y.
      if (nodeSize) visitBefore(root0, sizeNode);

      // If a fixed tree size is specified, scale x and y based on the extent.
      // Compute the left-most, right-most, and depth-most nodes for extents.
      else {
        var left = root0,
            right = root0,
            bottom = root0;
        visitBefore(root0, function(node) {
          if (node.x < left.x) left = node;
          if (node.x > right.x) right = node;
          if (node.depth > bottom.depth) bottom = node;
        });
        var tx = separation(left, right) / 2 - left.x,
            kx = size[0] / (right.x + separation(right, left) / 2 + tx),
            ky = size[1] / (bottom.depth || 1);
        visitBefore(root0, function(node) {
          node.x = (node.x + tx) * kx;
          node.y = node.depth * ky;
        });
      }

      return nodes;
    }

    function wrapTree(root0) {
      var root1 = {A: null, children: [root0]},
          queue = [root1],
          node1;

      while ((node1 = queue.pop()) != null) {
        for (var children = node1.children, child, i = 0, n = children.length; i < n; ++i) {
          queue.push((children[i] = child = {
            _: children[i], // source node
            parent: node1,
            children: (child = children[i].children) && child.slice() || [],
            A: null, // default ancestor
            a: null, // ancestor
            z: 0, // prelim
            m: 0, // mod
            c: 0, // change
            s: 0, // shift
            t: null, // thread
            i: i // number
          }).a = child);
        }
      }

      return root1.children[0];
    }

    // Computes a preliminary x-coordinate for v. Before that, FIRST WALK is
    // applied recursively to the children of v, as well as the function
    // APPORTION. After spacing out the children by calling EXECUTE SHIFTS, the
    // node v is placed to the midpoint of its outermost children.
    function firstWalk(v) {
      var children = v.children,
          siblings = v.parent.children,
          w = v.i ? siblings[v.i - 1] : null;
      if (children.length) {
        executeShifts(v);
        var midpoint = (children[0].z + children[children.length - 1].z) / 2;
        if (w) {
          v.z = w.z + separation(v._, w._);
          v.m = v.z - midpoint;
        } else {
          v.z = midpoint;
        }
      } else if (w) {
        v.z = w.z + separation(v._, w._);
      }
      v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
    }

    // Computes all real x-coordinates by summing up the modifiers recursively.
    function secondWalk(v) {
      v._.x = v.z + v.parent.m;
      v.m += v.parent.m;
    }

    // The core of the algorithm. Here, a new subtree is combined with the
    // previous subtrees. Threads are used to traverse the inside and outside
    // contours of the left and right subtree up to the highest common level. The
    // vertices used for the traversals are vi+, vi-, vo-, and vo+, where the
    // superscript o means outside and i means inside, the subscript - means left
    // subtree and + means right subtree. For summing up the modifiers along the
    // contour, we use respective variables si+, si-, so-, and so+. Whenever two
    // nodes of the inside contours conflict, we compute the left one of the
    // greatest uncommon ancestors using the function ANCESTOR and call MOVE
    // SUBTREE to shift the subtree and prepare the shifts of smaller subtrees.
    // Finally, we add a new thread (if necessary).
    function apportion(v, w, ancestor) {
      if (w) {
        var vip = v,
            vop = v,
            vim = w,
            vom = vip.parent.children[0],
            sip = vip.m,
            sop = vop.m,
            sim = vim.m,
            som = vom.m,
            shift;
        while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
          vom = nextLeft(vom);
          vop = nextRight(vop);
          vop.a = v;
          shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
          if (shift > 0) {
            moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
            sip += shift;
            sop += shift;
          }
          sim += vim.m;
          sip += vip.m;
          som += vom.m;
          sop += vop.m;
        }
        if (vim && !nextRight(vop)) {
          vop.t = vim;
          vop.m += sim - sop;
        }
        if (vip && !nextLeft(vom)) {
          vom.t = vip;
          vom.m += sip - som;
          ancestor = v;
        }
      }
      return ancestor;
    }

    function sizeNode(node) {
      node.x *= size[0];
      node.y = node.depth * size[1];
    }

    tree.separation = function(x) {
      if (!arguments.length) return separation;
      separation = x;
      return tree;
    };

    tree.size = function(x) {
      if (!arguments.length) return nodeSize ? null : size;
      nodeSize = (size = x) == null ? sizeNode : null;
      return tree;
    };

    tree.nodeSize = function(x) {
      if (!arguments.length) return nodeSize ? size : null;
      nodeSize = (size = x) == null ? null : sizeNode;
      return tree;
    };

    return rebind(tree, layout);
  };

  // TODO use visit function?
  function depth(node) {
    var c = node.children, d = 0, i, n;
    if (c) for (i = 0, n = c.length; i < n; ++i) d = Math.max(d, depth(c[i]));
    return 1 + d;
  }

  // TODO use visit function?
  function position(node, x, dx, dy) {
    var children = node.children;
    node.x = x;
    node.y = node.depth * dy;
    node.dx = dx;
    node.dy = dy;
    if (children && (n = children.length)) {
      var i = -1,
          n,
          c,
          d;
      dx = node.value ? dx / node.value : 0;
      while (++i < n) {
        position(c = children[i], x, d = c.value * dx, dy);
        x += d;
      }
    }
  }

  function partition() {
    var layout = hierarchy(),
        size = [1, 1]; // width, height

    function partition(d, i) {
      var nodes = layout.call(this, d, i);
      position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
      return nodes;
    }

    partition.size = function(x) {
      if (!arguments.length) return size.slice();
      size = [+x[0], +x[1]];
      return partition;
    };

    return rebind(partition, layout);
  };

  // Returns the smallest circle that contains the specified circles.
  function enclosingCircle(circles) {
    return enclosingCircleIntersectingCircles(randomizedList(circles), []);
  };

  // Returns a linked list from the specified array in random order.
  function randomizedList(array) {
    var i,
        n = (array = array.slice()).length,
        head = null,
        node = head;

    while (n) {
      var next = {id: array.length - n, value: array[n - 1], next: null};
      if (node) node = node.next = next;
      else node = head = next;
      array[i] = array[--n];
    }

    return {head: head, tail: node};
  }

  // Returns the smallest circle that contains the circles L
  // and intersects the circles B.
  function enclosingCircleIntersectingCircles(L, B) {
    var circle,
        l0 = null,
        l1 = L.head,
        l2,
        p1;

    switch (B.length) {
      case 1: circle = B[0]; break;
      case 2: circle = circleIntersectingTwoCircles(B[0], B[1]); break;
      case 3: circle = circleIntersectingThreeCircles(B[0], B[1], B[2]); break;
    }

    while (l1) {
      p1 = l1.value, l2 = l1.next;
      if (!circle || !circleContainsCircle(circle, p1)) {

        // Temporarily truncate L before l1.
        if (l0) L.tail = l0, l0.next = null;
        else L.head = L.tail = null;

        B.push(p1);
        circle = enclosingCircleIntersectingCircles(L, B); // Note: reorders L!
        B.pop();

        // Move l1 to the front of L and reconnect the truncated list L.
        if (L.head) l1.next = L.head, L.head = l1;
        else l1.next = null, L.head = L.tail = l1;
        l0 = L.tail, l0.next = l2;

      } else {
        l0 = l1;
      }
      l1 = l2;
    }

    L.tail = l0;
    return circle;
  }

  // Returns true if the specified circle1 contains the specified circle2.
  function circleContainsCircle(circle1, circle2) {
    var xc0 = circle1.x - circle2.x,
        yc0 = circle1.y - circle2.y;
    return Math.sqrt(xc0 * xc0 + yc0 * yc0) < circle1.r - circle2.r + 1e-6;
  }

  // Returns the smallest circle that intersects the two specified circles.
  function circleIntersectingTwoCircles(circle1, circle2) {
    var x1 = circle1.x, y1 = circle1.y, r1 = circle1.r,
        x2 = circle2.x, y2 = circle2.y, r2 = circle2.r,
        x12 = x2 - x1, y12 = y2 - y1, r12 = r2 - r1,
        l = Math.sqrt(x12 * x12 + y12 * y12);
    return {
      x: (x1 + x2 + x12 / l * r12) / 2,
      y: (y1 + y2 + y12 / l * r12) / 2,
      r: (l + r1 + r2) / 2
    };
  }

  // Returns the smallest circle that intersects the three specified circles.
  function circleIntersectingThreeCircles(circle1, circle2, circle3) {
    var x1 = circle1.x, y1 = circle1.y, r1 = circle1.r,
        x2 = circle2.x, y2 = circle2.y, r2 = circle2.r,
        x3 = circle3.x, y3 = circle3.y, r3 = circle3.r,
        a2 = 2 * (x1 - x2),
        b2 = 2 * (y1 - y2),
        c2 = 2 * (r2 - r1),
        d2 = x1 * x1 + y1 * y1 - r1 * r1 - x2 * x2 - y2 * y2 + r2 * r2,
        a3 = 2 * (x1 - x3),
        b3 = 2 * (y1 - y3),
        c3 = 2 * (r3 - r1),
        d3 = x1 * x1 + y1 * y1 - r1 * r1 - x3 * x3 - y3 * y3 + r3 * r3,
        ab = a3 * b2 - a2 * b3,
        xa = (b2 * d3 - b3 * d2) / ab - x1,
        xb = (b3 * c2 - b2 * c3) / ab,
        ya = (a3 * d2 - a2 * d3) / ab - y1,
        yb = (a2 * c3 - a3 * c2) / ab,
        A = xb * xb + yb * yb - 1,
        B = 2 * (xa * xb + ya * yb + r1),
        C = xa * xa + ya * ya - r1 * r1,
        r = (-B - Math.sqrt(B * B - 4 * A * C)) / (2 * A);
    return {
      x: xa + xb * r + x1,
      y: ya + yb * r + y1,
      r: r
    };
  }

  function defaultSort(a, b) {
    return a.value - b.value;
  }

  function insert(a, b) {
    var c = a._pack_next;
    a._pack_next = b;
    b._pack_prev = a;
    b._pack_next = c;
    c._pack_prev = b;
  }

  function splice(a, b) {
    a._pack_next = b;
    b._pack_prev = a;
  }

  function intersects(a, b) {
    var dx = b.x - a.x,
        dy = b.y - a.y,
        dr = a.r + b.r;
    return 0.999 * dr * dr > dx * dx + dy * dy; // relative error within epsilon
  }

  function packChildren(node) {
    if (!(nodes = node.children) || !(n = nodes.length)) return;

    var nodes,
        a, b, c, i, j, k, n;

    // Create node links.
    nodes.forEach(link$1);

    // Create first node.
    a = nodes[0];
    a.x = -a.r;
    a.y = 0;

    // Create second node.
    if (n > 1) {
      b = nodes[1];
      b.x = b.r;
      b.y = 0;

      // Create third node and build chain.
      if (n > 2) {
        c = nodes[2];
        place(a, b, c);
        insert(a, c);
        a._pack_prev = c;
        insert(c, b);
        b = a._pack_next;

        // Now iterate through the rest.
        for (i = 3; i < n; i++) {
          place(a, b, c = nodes[i]);

          // Search for the closest intersection.
          var isect = 0, s1 = 1, s2 = 1;
          for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
            if (intersects(j, c)) {
              isect = 1;
              break;
            }
          }
          if (isect == 1) {
            for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
              if (intersects(k, c)) {
                break;
              }
            }
          }

          // Update node chain.
          if (isect) {
            if (s1 < s2 || (s1 == s2 && b.r < a.r)) splice(a, b = j);
            else splice(a = k, b);
            i--;
          } else {
            insert(a, c);
            b = c;
          }
        }
      }
    }

    // Re-center the circles and compute the encompassing radius.
    var c = enclosingCircle(nodes);
    for (i = 0; i < n; ++i) {
      a = nodes[i];
      a.x -= c.x;
      a.y -= c.y;
    }
    node.r = c.r;

    // Remove node links.
    nodes.forEach(unlink);
  }

  function link$1(node) {
    node._pack_next = node._pack_prev = node;
  }

  function unlink(node) {
    delete node._pack_next;
    delete node._pack_prev;
  }

  function transform(node, x, y, k) {
    var children = node.children;
    node.x = x += k * node.x;
    node.y = y += k * node.y;
    node.r *= k;
    if (children) {
      var i = -1, n = children.length;
      while (++i < n) transform(children[i], x, y, k);
    }
  }

  function place(a, b, c) {
    var db = a.r + c.r,
        dx = b.x - a.x,
        dy = b.y - a.y;
    if (db && (dx || dy)) {
      var da = b.r + c.r,
          dc = dx * dx + dy * dy;
      da *= da;
      db *= db;
      var x = 0.5 + (db - da) / (2 * dc),
          y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
      c.x = a.x + x * dx + y * dy;
      c.y = a.y + x * dy - y * dx;
    } else {
      c.x = a.x + db;
      c.y = a.y;
    }
  }

  function pack() {
    var layout = hierarchy().sort(defaultSort),
        padding = 0,
        size = [1, 1],
        radius;

    function pack(d, i) {
      var nodes = layout.call(this, d, i),
          root = nodes[0],
          w = size[0],
          h = size[1],
          r = radius == null ? Math.sqrt : typeof radius === "function" ? radius : function() { return radius; };

      // Recursively compute the layout.
      root.x = root.y = 0;
      visitAfter(root, function(d) { d.r = +r(d.value); });
      visitAfter(root, packChildren);

      // When padding, recompute the layout using scaled padding.
      if (padding) {
        var dr = padding * (radius ? 1 : Math.max(2 * root.r / w, 2 * root.r / h)) / 2;
        visitAfter(root, function(d) { d.r += dr; });
        visitAfter(root, packChildren);
        visitAfter(root, function(d) { d.r -= dr; });
      }

      // Translate and scale the layout to fit the requested size.
      transform(root, w / 2, h / 2, radius ? 1 : 1 / Math.max(2 * root.r / w, 2 * root.r / h));

      return nodes;
    }

    pack.size = function(_) {
      if (!arguments.length) return size.slice();
      size = [+_[0], +_[1]];
      return pack;
    };

    pack.radius = function(_) {
      if (!arguments.length) return radius;
      radius = _ == null || typeof _ === "function" ? _ : +_;
      return pack;
    };

    pack.padding = function(_) {
      if (!arguments.length) return padding;
      padding = +_;
      return pack;
    };

    return rebind(pack, layout);
  };

  function meanX(children) {
    return children.reduce(function(x, c) { return x + c.x; }, 0) / children.length;
  }

  function maxY(children) {
    return 1 + children.reduce(function(y, c) { return Math.max(y, c.y); }, 0);
  }

  function leftLeaf(node) {
    var children;
    while ((children = node.children) && children.length) node = children[0];
    return node;
  }

  function rightLeaf(node) {
    var children, n;
    while ((children = node.children) && (n = children.length)) node = children[n - 1];
    return node;
  }

  // Implements a hierarchical layout using the cluster (or dendrogram)
  // algorithm.
  function cluster() {
    var layout = hierarchy().sort(null).value(null),
        separation = defaultSeparation,
        size = [1, 1], // width, height
        nodeSize = false;

    function cluster(d, i) {
      var nodes = layout.call(this, d, i),
          root = nodes[0],
          previousNode,
          x = 0;

      // First walk, computing the initial x & y values.
      visitAfter(root, function(node) {
        var children = node.children;
        if (children && children.length) {
          node.x = meanX(children);
          node.y = maxY(children);
        } else {
          node.x = previousNode ? x += separation(node, previousNode) : 0;
          node.y = 0;
          previousNode = node;
        }
      });

      // Compute the left-most, right-most, and depth-most nodes for extents.
      var left = leftLeaf(root),
          right = rightLeaf(root),
          x0 = left.x - separation(left, right) / 2,
          x1 = right.x + separation(right, left) / 2;

      // Second walk, normalizing x & y to the desired size.
      visitAfter(root, nodeSize ? function(node) {
        node.x = (node.x - root.x) * size[0];
        node.y = (root.y - node.y) * size[1];
      } : function(node) {
        node.x = (node.x - x0) / (x1 - x0) * size[0];
        node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
      });

      return nodes;
    }

    cluster.separation = function(x) {
      if (!arguments.length) return separation;
      separation = x;
      return cluster;
    };

    cluster.size = function(x) {
      if (!arguments.length) return nodeSize ? null : size;
      nodeSize = (size = x) == null;
      return cluster;
    };

    cluster.nodeSize = function(x) {
      if (!arguments.length) return nodeSize ? size : null;
      nodeSize = (size = x) != null;
      return cluster;
    };

    return rebind(cluster, layout);
  };

  function bundle() {
    return function(links) {
      var i = -1,
          n = links.length,
          link,
          paths = new Array(n);
      while (++i < n) link = links[i], paths[i] = path(link.source, link.end);
      return paths;
    };
  };

  function path(start, end) {
    var lca = leastCommonAncestor(start, end),
        points = [start];
    while (start !== lca) {
      start = start.parent;
      points.push(start);
    }
    var k = points.length;
    while (end !== lca) {
      points.splice(k, 0, end);
      end = end.parent;
    }
    return points;
  }

  function ancestors(node) {
    var ancestors = [],
        parent = node.parent;
    while (parent != null) {
      ancestors.push(node);
      node = parent;
      parent = parent.parent;
    }
    ancestors.push(node);
    return ancestors;
  }

  function leastCommonAncestor(a, b) {
    if (a === b) return a;
    var aNodes = ancestors(a),
        bNodes = ancestors(b),
        c = null;
    a = aNodes.pop();
    b = bNodes.pop();
    while (a === b) {
      c = a;
      a = aNodes.pop();
      b = bNodes.pop();
    }
    return c;
  }

  exports.bundle = bundle;
  exports.cluster = cluster;
  exports.links = links;
  exports.pack = pack;
  exports.partition = partition;
  exports.tree = tree;
  exports.treemap = treemap;

}));