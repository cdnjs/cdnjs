(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3-voronoi', ['exports'], factory) :
  factory((global.d3_voronoi = {}));
}(this, function (exports) { 'use strict';

  function RedBlackTree() {
    this._ = null; // root node
  }

  function RedBlackNode(node) {
    node.U = // parent node
    node.C = // color - true for red, false for black
    node.L = // left node
    node.R = // right node
    node.P = // previous node
    node.N = null; // next node
  };

  RedBlackTree.prototype = {

    insert: function(after, node) {
      var parent, grandpa, uncle;

      if (after) {
        node.P = after;
        node.N = after.N;
        if (after.N) after.N.P = node;
        after.N = node;
        if (after.R) {
          after = after.R;
          while (after.L) after = after.L;
          after.L = node;
        } else {
          after.R = node;
        }
        parent = after;
      } else if (this._) {
        after = RedBlackFirst(this._);
        node.P = null;
        node.N = after;
        after.P = after.L = node;
        parent = after;
      } else {
        node.P = node.N = null;
        this._ = node;
        parent = null;
      }
      node.L = node.R = null;
      node.U = parent;
      node.C = true;

      after = node;
      while (parent && parent.C) {
        grandpa = parent.U;
        if (parent === grandpa.L) {
          uncle = grandpa.R;
          if (uncle && uncle.C) {
            parent.C = uncle.C = false;
            grandpa.C = true;
            after = grandpa;
          } else {
            if (after === parent.R) {
              RedBlackRotateLeft(this, parent);
              after = parent;
              parent = after.U;
            }
            parent.C = false;
            grandpa.C = true;
            RedBlackRotateRight(this, grandpa);
          }
        } else {
          uncle = grandpa.L;
          if (uncle && uncle.C) {
            parent.C = uncle.C = false;
            grandpa.C = true;
            after = grandpa;
          } else {
            if (after === parent.L) {
              RedBlackRotateRight(this, parent);
              after = parent;
              parent = after.U;
            }
            parent.C = false;
            grandpa.C = true;
            RedBlackRotateLeft(this, grandpa);
          }
        }
        parent = after.U;
      }
      this._.C = false;
    },

    remove: function(node) {
      if (node.N) node.N.P = node.P;
      if (node.P) node.P.N = node.N;
      node.N = node.P = null;

      var parent = node.U,
          sibling,
          left = node.L,
          right = node.R,
          next,
          red;

      if (!left) next = right;
      else if (!right) next = left;
      else next = RedBlackFirst(right);

      if (parent) {
        if (parent.L === node) parent.L = next;
        else parent.R = next;
      } else {
        this._ = next;
      }

      if (left && right) {
        red = next.C;
        next.C = node.C;
        next.L = left;
        left.U = next;
        if (next !== right) {
          parent = next.U;
          next.U = node.U;
          node = next.R;
          parent.L = node;
          next.R = right;
          right.U = next;
        } else {
          next.U = parent;
          parent = next;
          node = next.R;
        }
      } else {
        red = node.C;
        node = next;
      }

      if (node) node.U = parent;
      if (red) return;
      if (node && node.C) { node.C = false; return; }

      do {
        if (node === this._) break;
        if (node === parent.L) {
          sibling = parent.R;
          if (sibling.C) {
            sibling.C = false;
            parent.C = true;
            RedBlackRotateLeft(this, parent);
            sibling = parent.R;
          }
          if ((sibling.L && sibling.L.C)
              || (sibling.R && sibling.R.C)) {
            if (!sibling.R || !sibling.R.C) {
              sibling.L.C = false;
              sibling.C = true;
              RedBlackRotateRight(this, sibling);
              sibling = parent.R;
            }
            sibling.C = parent.C;
            parent.C = sibling.R.C = false;
            RedBlackRotateLeft(this, parent);
            node = this._;
            break;
          }
        } else {
          sibling = parent.L;
          if (sibling.C) {
            sibling.C = false;
            parent.C = true;
            RedBlackRotateRight(this, parent);
            sibling = parent.L;
          }
          if ((sibling.L && sibling.L.C)
            || (sibling.R && sibling.R.C)) {
            if (!sibling.L || !sibling.L.C) {
              sibling.R.C = false;
              sibling.C = true;
              RedBlackRotateLeft(this, sibling);
              sibling = parent.L;
            }
            sibling.C = parent.C;
            parent.C = sibling.L.C = false;
            RedBlackRotateRight(this, parent);
            node = this._;
            break;
          }
        }
        sibling.C = true;
        node = parent;
        parent = parent.U;
      } while (!node.C);

      if (node) node.C = false;
    }

  };

  function RedBlackRotateLeft(tree, node) {
    var p = node,
        q = node.R,
        parent = p.U;

    if (parent) {
      if (parent.L === p) parent.L = q;
      else parent.R = q;
    } else {
      tree._ = q;
    }

    q.U = parent;
    p.U = q;
    p.R = q.L;
    if (p.R) p.R.U = p;
    q.L = p;
  }

  function RedBlackRotateRight(tree, node) {
    var p = node,
        q = node.L,
        parent = p.U;

    if (parent) {
      if (parent.L === p) parent.L = q;
      else parent.R = q;
    } else {
      tree._ = q;
    }

    q.U = parent;
    p.U = q;
    p.L = q.R;
    if (p.L) p.L.U = p;
    q.R = p;
  }

  function RedBlackFirst(node) {
    while (node.L) node = node.L;
    return node;
  }

  function Halfedge(edge, site, angle) {
    this.edge = edge;
    this.site = site;
    this.angle = angle;
  }

  function halfedgeStart(halfedge) {
    return halfedge.edge[+(halfedge.edge.right === halfedge.site)];
  };

  function halfedgeEnd(halfedge) {
    return halfedge.edge[+(halfedge.edge.left === halfedge.site)];
  };

  function createHalfedge(edge, lSite, rSite) {
    var va = edge[0],
        vb = edge[1];
    return new Halfedge(edge, lSite, rSite ? Math.atan2(rSite[1] - lSite[1], rSite[0] - lSite[0])
        : edge.left === lSite ? Math.atan2(vb[0] - va[0], va[1] - vb[1])
        : Math.atan2(va[0] - vb[0], vb[1] - va[1]));
  };

  function descendingAngle(a, b) {
    return b.angle - a.angle;
  };

  function createEdge(lSite, rSite, va, vb) {
    var edge = [null, null];
    edge.left = lSite;
    edge.right = rSite;
    edges.push(edge);
    if (va) setEdgeEnd(edge, lSite, rSite, va);
    if (vb) setEdgeEnd(edge, rSite, lSite, vb);
    cells[lSite.index].halfedges.push(createHalfedge(edge, lSite, rSite));
    cells[rSite.index].halfedges.push(createHalfedge(edge, rSite, lSite));
    return edge;
  };

  function createBorderEdge(lSite, va, vb) {
    var edge = [va, vb];
    edge.left = lSite;
    edge.right = null;
    edges.push(edge);
    return edge;
  };

  function setEdgeEnd(edge, lSite, rSite, vertex) {
    if (!edge[0] && !edge[1]) {
      edge[0] = vertex;
      edge.left = lSite;
      edge.right = rSite;
    } else if (edge.left === rSite) {
      edge[1] = vertex;
    } else {
      edge[0] = vertex;
    }
  };

  // Liang–Barsky line clipping.
  function clipLine(edge, x0, y0, x1, y1) {
    var a = edge[0],
        b = edge[1],
        ax = a[0],
        ay = a[1],
        bx = b[0],
        by = b[1],
        t0 = 0,
        t1 = 1,
        dx = bx - ax,
        dy = by - ay,
        r;

    r = x0 - ax;
    if (!dx && r > 0) return;
    r /= dx;
    if (dx < 0) {
      if (r < t0) return;
      if (r < t1) t1 = r;
    } else if (dx > 0) {
      if (r > t1) return;
      if (r > t0) t0 = r;
    }

    r = x1 - ax;
    if (!dx && r < 0) return;
    r /= dx;
    if (dx < 0) {
      if (r > t1) return;
      if (r > t0) t0 = r;
    } else if (dx > 0) {
      if (r < t0) return;
      if (r < t1) t1 = r;
    }

    r = y0 - ay;
    if (!dy && r > 0) return;
    r /= dy;
    if (dy < 0) {
      if (r < t0) return;
      if (r < t1) t1 = r;
    } else if (dy > 0) {
      if (r > t1) return;
      if (r > t0) t0 = r;
    }

    r = y1 - ay;
    if (!dy && r < 0) return;
    r /= dy;
    if (dy < 0) {
      if (r > t1) return;
      if (r > t0) t0 = r;
    } else if (dy > 0) {
      if (r < t0) return;
      if (r < t1) t1 = r;
    }

    if (t0 > 0) edge[0] = [ax + t0 * dx, ay + t0 * dy];
    if (t1 < 1) edge[1] = [ax + t1 * dx, ay + t1 * dy];
    return edge;
  }

  function connectEdge(edge, x0, y0, x1, y1) {
    var vb = edge[1];
    if (vb) return true;

    var va = edge[0],
        lSite = edge.left,
        rSite = edge.right,
        lx = lSite[0],
        ly = lSite[1],
        rx = rSite[0],
        ry = rSite[1],
        fx = (lx + rx) / 2,
        fy = (ly + ry) / 2,
        fm,
        fb;

    if (ry === ly) {
      if (fx < x0 || fx >= x1) return;
      if (lx > rx) {
        if (!va) va = [fx, y0];
        else if (va[1] >= y1) return;
        vb = [fx, y1];
      } else {
        if (!va) va = [fx, y1];
        else if (va[1] < y0) return;
        vb = [fx, y0];
      }
    } else {
      fm = (lx - rx) / (ry - ly);
      fb = fy - fm * fx;
      if (fm < -1 || fm > 1) {
        if (lx > rx) {
          if (!va) va = [(y0 - fb) / fm, y0];
          else if (va[1] >= y1) return;
          vb = [(y1 - fb) / fm, y1];
        } else {
          if (!va) va = [(y1 - fb) / fm, y1];
          else if (va[1] < y0) return;
          vb = [(y0 - fb) / fm, y0];
        }
      } else {
        if (ly < ry) {
          if (!va) va = [x0, fm * x0 + fb];
          else if (va[0] >= x1) return;
          vb = [x1, fm * x1 + fb];
        } else {
          if (!va) va = [x1, fm * x1 + fb];
          else if (va[0] < x0) return;
          vb = [x0, fm * x0 + fb];
        }
      }
    }

    edge[0] = va;
    edge[1] = vb;
    return true;
  }

  function clipEdges(x0, y0, x1, y1) {
    var i = edges.length,
        e;
    while (i--) {
      e = edges[i];
      if (!connectEdge(e, x0, y0, x1, y1)
          || !clipLine(e, x0, y0, x1, y1)
          || (Math.abs(e[0][0] - e[1][0]) < epsilon && Math.abs(e[0][1] - e[1][1]) < epsilon)) {
        e[0] = e[1] = null;
        edges.splice(i, 1);
      }
    }
  };

  function Cell(site) {
    this.site = site;
    this.halfedges = [];
  }

  function prepareCell(cell) {
    var halfedges = cell.halfedges,
        iHalfedge = halfedges.length,
        edge;

    while (iHalfedge--) {
      edge = halfedges[iHalfedge].edge;
      if (!edge[1] || !edge[0]) halfedges.splice(iHalfedge, 1);
    }

    halfedges.sort(descendingAngle);
    return halfedges.length;
  }

  function createCell(site) {
    return cells[site.index] = new Cell(site);
  };

  function closeCells(x0, y0, x1, y1) {
    var x2,
        y2,
        x3,
        y3,
        iCell = cells.length,
        cell,
        iHalfedge,
        halfedges,
        nHalfedges,
        start,
        end;

    while (iCell--) {
      cell = cells[iCell];
      if (!cell || !prepareCell(cell)) continue;
      halfedges = cell.halfedges;
      nHalfedges = halfedges.length;
      iHalfedge = 0;
      while (iHalfedge < nHalfedges) {
        end = halfedgeEnd(halfedges[iHalfedge]), x3 = end[0], y3 = end[1];
        start = halfedgeStart(halfedges[++iHalfedge % nHalfedges]), x2 = start[0], y2 = start[1];
        if (Math.abs(x3 - x2) > epsilon || Math.abs(y3 - y2) > epsilon) {
          halfedges.splice(iHalfedge, 0, createHalfedge(createBorderEdge(cell.site, end,
              Math.abs(x3 - x0) < epsilon && y1 - y3 > epsilon ? [x0, Math.abs(x2 - x0) < epsilon ? y2 : y1]
              : Math.abs(y3 - y1) < epsilon && x1 - x3 > epsilon ? [Math.abs(y2 - y1) < epsilon ? x2 : x1, y1]
              : Math.abs(x3 - x1) < epsilon && y3 - y0 > epsilon ? [x1, Math.abs(x2 - x1) < epsilon ? y2 : y0]
              : Math.abs(y3 - y0) < epsilon && x3 - x0 > epsilon ? [Math.abs(y2 - y0) < epsilon ? x2 : x0, y0]
              : null), cell.site, null));
          ++nHalfedges;
        }
      }
    }
  };

  var circlePool = [];

  var firstCircle;

  function Circle() {
    RedBlackNode(this);
    this.x =
    this.y =
    this.arc =
    this.site =
    this.cy = null;
  }

  function attachCircle(arc) {
    var lArc = arc.P,
        rArc = arc.N;

    if (!lArc || !rArc) return;

    var lSite = lArc.site,
        cSite = arc.site,
        rSite = rArc.site;

    if (lSite === rSite) return;

    var bx = cSite[0],
        by = cSite[1],
        ax = lSite[0] - bx,
        ay = lSite[1] - by,
        cx = rSite[0] - bx,
        cy = rSite[1] - by;

    var d = 2 * (ax * cy - ay * cx);
    if (d >= -epsilon2) return;

    var ha = ax * ax + ay * ay,
        hc = cx * cx + cy * cy,
        x = (cy * ha - ay * hc) / d,
        y = (ax * hc - cx * ha) / d,
        cy = y + by;

    var circle = circlePool.pop() || new Circle;
    circle.arc = arc;
    circle.site = cSite;
    circle.x = x + bx;
    circle.y = cy + Math.sqrt(x * x + y * y); // y bottom
    circle.cy = cy;

    arc.circle = circle;

    var before = null,
        node = circles._;

    while (node) {
      if (circle.y < node.y || (circle.y === node.y && circle.x <= node.x)) {
        if (node.L) node = node.L;
        else { before = node.P; break; }
      } else {
        if (node.R) node = node.R;
        else { before = node; break; }
      }
    }

    circles.insert(before, circle);
    if (!before) firstCircle = circle;
  };

  function detachCircle(arc) {
    var circle = arc.circle;
    if (circle) {
      if (!circle.P) firstCircle = circle.N;
      circles.remove(circle);
      circlePool.push(circle);
      RedBlackNode(circle);
      arc.circle = null;
    }
  };

  var beachPool = [];

  function Beach() {
    RedBlackNode(this);
    this.edge =
    this.site =
    this.circle = null;
  }

  function createBeach(site) {
    var beach = beachPool.pop() || new Beach;
    beach.site = site;
    return beach;
  }

  function detachBeach(beach) {
    detachCircle(beach);
    beaches.remove(beach);
    beachPool.push(beach);
    RedBlackNode(beach);
  }

  function removeBeach(beach) {
    var circle = beach.circle,
        x = circle.x,
        y = circle.cy,
        vertex = [x, y],
        previous = beach.P,
        next = beach.N,
        disappearing = [beach];

    detachBeach(beach);

    var lArc = previous;
    while (lArc.circle
        && Math.abs(x - lArc.circle.x) < epsilon
        && Math.abs(y - lArc.circle.cy) < epsilon) {
      previous = lArc.P;
      disappearing.unshift(lArc);
      detachBeach(lArc);
      lArc = previous;
    }

    disappearing.unshift(lArc);
    detachCircle(lArc);

    var rArc = next;
    while (rArc.circle
        && Math.abs(x - rArc.circle.x) < epsilon
        && Math.abs(y - rArc.circle.cy) < epsilon) {
      next = rArc.N;
      disappearing.push(rArc);
      detachBeach(rArc);
      rArc = next;
    }

    disappearing.push(rArc);
    detachCircle(rArc);

    var nArcs = disappearing.length,
        iArc;
    for (iArc = 1; iArc < nArcs; ++iArc) {
      rArc = disappearing[iArc];
      lArc = disappearing[iArc - 1];
      setEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
    }

    lArc = disappearing[0];
    rArc = disappearing[nArcs - 1];
    rArc.edge = createEdge(lArc.site, rArc.site, null, vertex);

    attachCircle(lArc);
    attachCircle(rArc);
  };

  function addBeach(site) {
    var x = site[0],
        directrix = site[1],
        lArc,
        rArc,
        dxl,
        dxr,
        node = beaches._;

    while (node) {
      dxl = leftBreakPoint(node, directrix) - x;
      if (dxl > epsilon) node = node.L; else {
        dxr = x - rightBreakPoint(node, directrix);
        if (dxr > epsilon) {
          if (!node.R) {
            lArc = node;
            break;
          }
          node = node.R;
        } else {
          if (dxl > -epsilon) {
            lArc = node.P;
            rArc = node;
          } else if (dxr > -epsilon) {
            lArc = node;
            rArc = node.N;
          } else {
            lArc = rArc = node;
          }
          break;
        }
      }
    }

    createCell(site);
    var newArc = createBeach(site);
    beaches.insert(lArc, newArc);

    if (!lArc && !rArc) return;

    if (lArc === rArc) {
      detachCircle(lArc);
      rArc = createBeach(lArc.site);
      beaches.insert(newArc, rArc);
      newArc.edge = rArc.edge = createEdge(lArc.site, newArc.site);
      attachCircle(lArc);
      attachCircle(rArc);
      return;
    }

    if (!rArc) { // && lArc
      newArc.edge = createEdge(lArc.site, newArc.site);
      return;
    }

    // else lArc !== rArc
    detachCircle(lArc);
    detachCircle(rArc);

    var lSite = lArc.site,
        ax = lSite[0],
        ay = lSite[1],
        bx = site[0] - ax,
        by = site[1] - ay,
        rSite = rArc.site,
        cx = rSite[0] - ax,
        cy = rSite[1] - ay,
        d = 2 * (bx * cy - by * cx),
        hb = bx * bx + by * by,
        hc = cx * cx + cy * cy,
        vertex = {x: (cy * hb - by * hc) / d + ax, y: (bx * hc - cx * hb) / d + ay};

    setEdgeEnd(rArc.edge, lSite, rSite, vertex);
    newArc.edge = createEdge(lSite, site, null, vertex);
    rArc.edge = createEdge(site, rSite, null, vertex);
    attachCircle(lArc);
    attachCircle(rArc);
  };

  function leftBreakPoint(arc, directrix) {
    var site = arc.site,
        rfocx = site[0],
        rfocy = site[1],
        pby2 = rfocy - directrix;

    if (!pby2) return rfocx;

    var lArc = arc.P;
    if (!lArc) return -Infinity;

    site = lArc.site;
    var lfocx = site[0],
        lfocy = site[1],
        plby2 = lfocy - directrix;

    if (!plby2) return lfocx;

    var hl = lfocx - rfocx,
        aby2 = 1 / pby2 - 1 / plby2,
        b = hl / plby2;

    if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;

    return (rfocx + lfocx) / 2;
  }

  function rightBreakPoint(arc, directrix) {
    var rArc = arc.N;
    if (rArc) return leftBreakPoint(rArc, directrix);
    var site = arc.site;
    return site[1] === directrix ? site[0] : Infinity;
  }

  var nullExtent = [[-1e6, -1e6], [1e6, 1e6]];

  var epsilon = 1e-6;
  var epsilon2 = 1e-12;
  var beaches;
  var cells;
  var circles;
  var edges;

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

  function triangleArea(a, b, c) {
    return (a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]);
  }

  function lexicographic(a, b) {
    return b[1] - a[1]
        || b[0] - a[0];
  }

  function computeVoronoi(sites, extent) {
    var site = sites.sort(lexicographic).pop(),
        x,
        y,
        circle;

    edges = [];
    cells = new Array(sites.length);
    beaches = new RedBlackTree;
    circles = new RedBlackTree;

    while (true) {
      circle = firstCircle;
      if (site && (!circle || site[1] < circle.y || (site[1] === circle.y && site[0] < circle.x))) {
        if (site[0] !== x || site[1] !== y) {
          addBeach(site);
          x = site[0], y = site[1];
        }
        site = sites.pop();
      } else if (circle) {
        removeBeach(circle.arc);
      } else {
        break;
      }
    }

    if (extent) {
      var x0 = extent[0][0],
          y0 = extent[0][1],
          x1 = extent[1][0],
          y1 = extent[1][1];
      clipEdges(x0, y0, x1, y1);
      closeCells(x0, y0, x1, y1);
    }

    var diagram = {cells: cells, edges: edges};
    beaches = circles = edges = cells = null;
    return diagram;
  }

  function voronoi() {
    var x = pointX,
        y = pointY,
        fx = x,
        fy = y,
        extent = null;

    function voronoi(data) {
      return computeVoronoi(sites(data), extent);
    }

    function sites(data) {
      return data.map(function(d, i) {
        var s = [Math.round(fx(d, i, data) / epsilon) * epsilon, Math.round(fy(d, i, data) / epsilon) * epsilon];
        s.index = i;
        s.data = d;
        return s;
      });
    }

    voronoi.cells = function(data) {
      var polygons = new Array(data.length),
          box = extent || nullExtent,
          x0 = box[0][0],
          y0 = box[0][1],
          x1 = box[1][0],
          y1 = box[1][1];

      computeVoronoi(sites(data), box).cells.forEach(function(cell, i) {
        var halfedges = cell.halfedges,
            site = cell.site,
            polygon = polygons[i] = halfedges.length ? halfedges.map(halfedgeStart)
                : site[0] >= x0 && site[0] <= x1 && site[1] >= y0 && site[1] <= y1 ? [[x0, y1], [x1, y1], [x1, y0], [x0, y0]]
                : [];
        polygon.data = data[i];
      });

      return polygons;
    };

    voronoi.links = function(data) {
      return computeVoronoi(sites(data)).edges.filter(function(edge) {
        return edge.left && edge.right;
      }).map(function(edge) {
        return {
          source: edge.left.data,
          target: edge.right.data
        };
      });
    };

    voronoi.triangles = function(data) {
      var triangles = [];

      computeVoronoi(sites(data)).cells.forEach(function(cell, i) {
        var site = cell.site,
            halfedges = cell.halfedges.sort(descendingAngle),
            j = -1,
            m = halfedges.length,
            e0,
            s0,
            e1 = halfedges[m - 1].edge,
            s1 = e1.left === site ? e1.right : e1.left;

        while (++j < m) {
          e0 = e1;
          s0 = s1;
          e1 = halfedges[j].edge;
          s1 = e1.left === site ? e1.right : e1.left;
          if (i < s0.index && i < s1.index && triangleArea(site, s0, s1) < 0) {
            triangles.push([site.data, s0.data, s1.data]);
          }
        }
      });

      return triangles;
    };

    voronoi.x = function(_) {
      return arguments.length ? (x = _, fx = typeof _ === "function" ? x : functor(x), voronoi) : x;
    };

    voronoi.y = function(_) {
      return arguments.length ? (y = _, fy = typeof _ === "function" ? y : functor(y), voronoi) : y;
    };

    voronoi.extent = function(_) {
      return arguments.length ? (extent = _ == null ? null : [[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]], voronoi) : extent && [[extent[0][0], extent[0][1]], [extent[1][0], extent[1][1]]];
    };

    voronoi.size = function(_) {
      return arguments.length ? (extent = _ == null ? null : [[0, 0], [+_[0], +_[1]]], voronoi) : extent && [extent[1][0], extent[1][1]];
    };

    return voronoi;
  };

  var version = "0.2.1";

  exports.version = version;
  exports.voronoi = voronoi;

}));