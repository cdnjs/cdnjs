(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-quadtree'), require('d3-dispatch'), require('d3-collection'), require('d3-timer')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-quadtree', 'd3-dispatch', 'd3-collection', 'd3-timer'], factory) :
  (factory((global.d3_force = global.d3_force || {}),global.d3_quadtree,global.d3_dispatch,global.d3_collection,global.d3_timer));
}(this, function (exports,d3Quadtree,d3Dispatch,d3Collection,d3Timer) { 'use strict';

  var version = "0.1.0";

  function center(x, y) {
    var nodes;

    if (x == null) x = 0;
    if (y == null) y = 0;

    function force() {
      var i,
          n = nodes.length,
          node,
          sx = 0,
          sy = 0;

      for (i = 0; i < n; ++i) {
        node = nodes[i], sx += node.x, sy += node.y;
      }

      for (sx = sx / n - x, sy = sy / n - y, i = 0; i < n; ++i) {
        node = nodes[i], node.x -= sx, node.y -= sy;
      }
    }

    force.initialize = function(simulation) {
      nodes = simulation.nodes();
    };

    force.x = function(_) {
      return arguments.length ? (x = +_, force) : x;
    };

    force.y = function(_) {
      return arguments.length ? (y = +_, force) : y;
    };

    return force;
  }

  function constant(x) {
    return function() {
      return x;
    };
  }

  function x(d) {
    return d.x;
  }

  function y(d) {
    return d.y;
  }

  function simulation(nodes) {
    var simulation,
        iteration = 0,
        alpha = 1,
        alphaMin = 0.0001,
        alphaDecay = -0.02,
        drag = 0.5,
        force = d3Collection.map(),
        ticker = d3Timer.timer(tick),
        event = d3Dispatch.dispatch("start", "tick", "end");

    function start() {
      if (iteration < Infinity) {
        iteration = 0, alpha = 1;
      } else {
        iteration = 0, alpha = 1;
        event.call("start", simulation);
        ticker.restart(tick);
      }
      return simulation;
    }

    function stop() {
      if (iteration < Infinity) {
        iteration = Infinity, alpha = 0;
        event.call("end", simulation);
        ticker.stop();
      }
      return simulation;
    }

    function tick() {
      alpha = Math.exp(++iteration * alphaDecay);
      if (!(alpha > alphaMin)) return stop();
      force.each(apply);

      for (var i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i];
        node.x += node.vx *= drag;
        node.y += node.vy *= drag;
      }

      event.call("tick", simulation);
    }

    function initializeNodes() {
      for (var i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i], node.index = i;
        if (isNaN(node.x)) node.x = Math.random() * 100 - 50;
        if (isNaN(node.y)) node.y = Math.random() * 100 - 50;
        if (isNaN(node.vx)) node.vx = 0;
        if (isNaN(node.vy)) node.vy = 0;
      }
    }

    function initializeForce(force) {
      if (force.initialize) force.initialize(simulation);
      return force;
    }

    function apply(force) {
      force(alpha);
    }

    if (nodes) initializeNodes();

    return simulation = {
      start: start,
      stop: stop,
      tick: tick,

      nodes: function(_) {
        return arguments.length ? (nodes = _, initializeNodes(), force.each(initializeForce), simulation) : nodes;
      },

      alphaMin: function(_) {
        return arguments.length ? (alphaMin = _, simulation) : alphaMin;
      },

      alphaDecay: function(_) {
        return arguments.length ? (alphaDecay = -_, iteration = alphaDecay ? Math.round(Math.log(alpha) / alphaDecay) : 0, simulation) : -alphaDecay;
      },

      drag: function(_) {
        return arguments.length ? (drag = 1 - _, simulation) : 1 - drag;
      },

      force: function(name, _) {
        return arguments.length > 1 ? ((_ == null ? force.remove(name) : force.set(name, initializeForce(_))), simulation) : force.get(name);
      },

      on: function(name, _) {
        return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
      }
    };
  }

  function collide() {
    var nodes,
        radius = constant(1),
        radii,
        radiusMax,
        strength = 0.7;

    function force() {
      var i, n = nodes.length,
          tree = d3Quadtree.quadtree(nodes, x, y),
          node,
          nx0,
          ny0,
          nx1,
          ny1,
          vx,
          vy,
          nr;

      for (i = 0; i < n; ++i) {
        node = nodes[i], nr = radii[i] + radiusMax, vx = vy = 0;
        nx0 = node.x - nr, ny0 = node.y - nr;
        nx1 = node.x + nr, ny1 = node.y + nr;
        tree.remove(node).visit(apply);
        node.x += vx * strength, node.y += vy * strength;
        tree.add(node);
      }

      function apply(quad, x0, y0, x1, y1) {
        if (x0 > nx1 || x1 < nx0 || y0 > ny1 || y1 < ny0) return true;
        if (quad.length) return;
        var x = node.x - quad.data.x,
            y = node.y - quad.data.y,
            l = x * x + y * y,
            r = radii[i] + radii[quad.data.index];
        if (l < r * r) {
          l = (r - (l = Math.sqrt(l))) / l;
          vx += x * l, vy += y * l;
        }
      }
    }

    force.initialize = function(_) {
      nodes = _.nodes();
      var i, n = nodes.length, r;
      radii = new Array(n), radiusMax = 0;
      for (i = 0; i < n; ++i) {
        if ((radii[i] = r = +radius(nodes[i], i, nodes)) > radiusMax) {
          radiusMax = r;
        }
      }
    };

    force.strength = function(_) {
      return arguments.length ? (strength = +_, force) : strength;
    };

    force.radius = function(_) {
      return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), force) : radius;
    };

    return force;
  }

  function contain(radius, x, y) {
    var nodes,
        rz,
        xz,
        yz;

    if (typeof radius !== "function") radius = constant(radius == null ? 100 : +radius);
    if (typeof x !== "function") x = constant(x == null ? 0 : +x);
    if (typeof y !== "function") y = constant(y == null ? 0 : +y);

    function force() {
      for (var i = 0, n = nodes.length, node, x, y, l, r; i < n; ++i) {
        node = nodes[i];
        x = node.x - xz[i];
        y = node.y - yz[i];
        if ((l = x * x + y * y) > (r = rz[i]) * r) {
          l = Math.sqrt(l), l = (l - r) / l;
          node.vx -= x * l;
          node.vy -= y * l;
        }
      }
    }

    function initialize() {
      if (!nodes) return;
      var i, n = nodes.length;
      rz = new Array(n);
      xz = new Array(n);
      yz = new Array(n);
      for (i = 0; i < n; ++i) {
        rz[i] = +radius(nodes[i], i, nodes);
        xz[i] = +x(nodes[i], i, nodes);
        yz[i] = +y(nodes[i], i, nodes);
      }
    }

    force.initialize = function(simulation) {
      nodes = simulation.nodes();
      initialize();
    };

    force.radius = function(_) {
      return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), initialize(), force) : radius;
    };

    force.x = function(_) {
      return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), initialize(), force) : x;
    };

    force.y = function(_) {
      return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), initialize(), force) : y;
    };

    return force;
  }

  var tau = 2 * Math.PI;

  function index(d, i) {
    return i;
  }

  function link(links) {
    var id = index,
        strength = constant(0.5),
        strengths,
        distance = constant(30),
        distances,
        nodes,
        bias;

    function force(alpha) {
      for (var i = 0, n = links.length, link, source, target, x, y, l, b; i < n; ++i) {
        link = links[i], source = link.source, target = link.target;
        x = target.x - source.x;
        y = target.y - source.y;
        if (l = x * x + y * y) l = Math.sqrt(l), l = (l - distances[i]) / l;
        else l = Math.random() * tau, x = Math.cos(l), y = Math.sin(l), l = distances[i];
        l *= alpha * strengths[i], x *= l, y *= l;
        target.vx -= x * (b = bias[i]);
        target.vy -= y * b;
        source.vx += x * (b = 1 - b);
        source.vy += y * b;
      }
    }

    function initialize() {
      if (!nodes || !links) return;

      var i,
          n = nodes.length,
          m = links.length,
          count = new Array(n),
          nodeById = d3Collection.map(nodes, id),
          link;

      for (i = 0; i < n; ++i) {
        count[i] = 0;
      }

      for (i = 0, bias = new Array(m); i < m; ++i) {
        link = links[i], link.index = i;
        if (typeof link.source !== "object") link.source = nodeById.get(link.source);
        if (typeof link.target !== "object") link.target = nodeById.get(link.target);
        ++count[link.source.index], ++count[link.target.index];
      }

      for (i = 0; i < m; ++i) {
        link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
      }

      if (!strengths) for (i = 0, strengths = new Array(m); i < m; ++i) {
        strengths[i] = +strength(links[i]);
      }

      if (!distances) for (i = 0, distances = new Array(m); i < m; ++i) {
        distances[i] = +distance(links[i]);
      }
    }

    force.initialize = function(simulation) {
      nodes = simulation.nodes(), initialize();
    };

    force.links = function(_) {
      return arguments.length ? (links = _, strengths = distances = null, initialize(), force) : links;
    };

    force.id = function(_) {
      return arguments.length ? (id = _, initialize(), force) : id;
    };

    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), strengths = null, initialize(), force) : strength;
    };

    force.distance = function(_) {
      return arguments.length ? (distance = typeof _ === "function" ? _ : constant(+_), distances = null, initialize(), force) : distance;
    };

    return force;
  }

  var tau$1 = 2 * Math.PI;

  function manyBody() {
    var nodes,
        node,
        alpha,
        strength = constant(-100),
        strengths,
        distanceMin2 = 1,
        distanceMax2 = Infinity,
        theta2 = 0.81;

    function force(_) {
      var i, n = nodes.length, tree = d3Quadtree.quadtree(nodes, x, y).visitAfter(accumulate);
      for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
    }

    function initialize() {
      if (!nodes) return;
      var i, n = nodes.length;
      strengths = new Array(n);
      for (i = 0; i < n; ++i) strengths[i] = +strength(nodes[i], i, nodes);
    }

    function accumulate(quad) {
      var strength = 0, q, c, x, y, i;

      // For internal nodes, accumulate forces from child quadrants.
      if (quad.length) {
        for (x = y = i = 0; i < 4; ++i) {
          if ((q = quad[i]) && (c = q.value)) {
            strength += c, x += c * q.x, y += c * q.y;
          }
        }
        quad.x = x / strength;
        quad.y = y / strength;
      }

      // For leaf nodes, accumulate forces from coincident quadrants.
      else {
        q = quad;
        q.x = q.data.x;
        q.y = q.data.y;
        do strength += strengths[q.data.index];
        while (q = q.next);
      }

      quad.value = strength;
    }

    function apply(quad, x1, _, x2) {
      if (!quad.value) return true;

      var x = quad.x - node.x,
          y = quad.y - node.y,
          w = x2 - x1,
          l = x * x + y * y;

      // Limit forces for very close nodes.
      // Randomize direction for exactly-coincident nodes.
      if (l < distanceMin2) {
        if (!l) l = Math.random() * tau$1, x = Math.cos(l), y = Math.sin(l), l = 1;
        l = Math.sqrt(l / distanceMin2), x /= l, y /= l, l = distanceMin2;
      }

      // Apply the Barnes-Hut approximation if possible.
      if (w * w / theta2 < l) {
        if (l < distanceMax2) {
          l = quad.value * alpha / l;
          node.vx += x * l;
          node.vy += y * l;
        }
        return true;
      }

      // Otherwise, process points directly.
      else if (quad.length || l >= distanceMax2) return;

      do if (quad.data !== node) {
        w = strengths[quad.data.index] * alpha / l;
        node.vx += x * w;
        node.vy += y * w;
      } while (quad = quad.next);
    }

    force.initialize = function(_) {
      nodes = _.nodes(), initialize();
    };

    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
    };

    force.distanceMin = function(_) {
      return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
    };

    force.distanceMax = function(_) {
      return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
    };

    force.theta = function(_) {
      return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
    };

    return force;
  }

  function position(x, y) {
    var strength = constant(0.1),
        nodes,
        strengths,
        xz,
        yz;

    if (typeof x !== "function") x = constant(x == null ? 0 : +x);
    if (typeof y !== "function") y = constant(y == null ? 0 : +y);

    function force(alpha) {
      for (var i = 0, n = nodes.length, node, k; i < n; ++i) {
        node = nodes[i];
        k = strengths[i] * alpha;
        node.vx += (xz[i] - node.x) * k;
        node.vy += (yz[i] - node.y) * k;
      }
    }

    function initialize() {
      if (!nodes) return;
      var i, n = nodes.length;
      strengths = new Array(n);
      xz = new Array(n);
      yz = new Array(n);
      for (i = 0; i < n; ++i) {
        strengths[i] = +strength(nodes[i], i, nodes);
        xz[i] = +x(nodes[i], i, nodes);
        yz[i] = +y(nodes[i], i, nodes);
      }
    }

    force.initialize = function(simulation) {
      nodes = simulation.nodes();
      initialize();
    };

    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
    };

    force.x = function(_) {
      return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), initialize(), force) : x;
    };

    force.y = function(_) {
      return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), initialize(), force) : y;
    };

    return force;
  }

  exports.version = version;
  exports.forceCenter = center;
  exports.forceCollide = collide;
  exports.forceContain = contain;
  exports.forceLink = link;
  exports.forceManyBody = manyBody;
  exports.forcePosition = position;
  exports.forceSimulation = simulation;

}));