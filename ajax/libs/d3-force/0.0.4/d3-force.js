(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-quadtree'), require('d3-collection'), require('d3-dispatch'), require('d3-timer')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-quadtree', 'd3-collection', 'd3-dispatch', 'd3-timer'], factory) :
  (factory((global.d3_force = global.d3_force || {}),global.d3_quadtree,global.d3_collection,global.d3_dispatch,global.d3_timer));
}(this, function (exports,d3Quadtree,d3Collection,d3Dispatch,d3Timer) { 'use strict';

  var version = "0.0.4";

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
    return d.x + d.vx;
  }

  function y(d) {
    return d.y + d.vy;
  }

  function collide() {
    var nodes,
        radius = constant(1),
        radii,
        radiusMax;

    function force() {
      var i, n = nodes.length,
          tree = d3Quadtree.quadtree(nodes, x, y),
          node,
          nx0,
          ny0,
          nx1,
          ny1,
          nr,
          nx,
          ny;

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        nx = node.x + node.vx; // Look into the future!
        ny = node.y + node.vy;
        nr = radii[i] + radiusMax;
        nx0 = nx - nr;
        ny0 = ny - nr;
        nx1 = nx + nr;
        ny1 = ny + nr;
        tree.remove(node).visit(apply).add(node);
      }

      function apply(quad, x0, y0, x1, y1) {
        if (x0 > nx1 || x1 < nx0 || y0 > ny1 || y1 < ny0) return true;
        if (quad.length) return;
        var x = nx - quad.data.x - quad.data.vx,
            y = ny - quad.data.y - quad.data.vy,
            l = x * x + y * y,
            r = radii[i] + radii[quad.data.index];
        if (l < r * r) {
          l = Math.sqrt(l), l = (l - r) / (l * 2);
          node.vx -= x * l;
          node.vy -= y * l;
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

    force.radius = function(_) {
      return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), force) : radius;
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

  function x$1(d) {
    return d.x;
  }

  function y$1(d) {
    return d.y;
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
      var i, n = nodes.length, tree = d3Quadtree.quadtree(nodes, x$1, y$1).visitAfter(accumulate);
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

      var dx = quad.x - node.x,
          dy = quad.y - node.y,
          w = x2 - x1,
          l = dx * dx + dy * dy;

      // Limit forces for very close nodes.
      // Randomize direction for exactly-coincident nodes.
      if (l < distanceMin2) {
        if (!l) l = Math.random() * tau$1, dx = Math.cos(l), dy = Math.sin(l), l = 1;
        l = Math.sqrt(l / distanceMin2), dx /= l, dy /= l, l = distanceMin2;
      }

      // Apply the Barnes-Hut approximation if possible.
      if (w * w / theta2 < l) {
        if (l < distanceMax2) {
          l = quad.value * alpha / l;
          node.vx += dx * l;
          node.vy += dy * l;
        }
        return true;
      }

      // Otherwise, process points directly.
      else if (quad.length || l >= distanceMax2) return;

      do if (quad.data !== node) {
        w = strengths[quad.data.index] * alpha / l;
        node.vx += dx * w;
        node.vy += dy * w;
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

    if (x == null) x = constant(0);
    if (y == null) y = constant(0);

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

  function simulation(nodes) {
    var simulation,
        iteration = 0,
        alpha = 1,
        alphaMin = 0.0001,
        alphaDecay = -0.02,
        velocityDecay = 0.5,
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
        node.x += node.vx *= velocityDecay;
        node.y += node.vy *= velocityDecay;
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

      friction: function(_) {
        return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
      },

      force: function(name, _) {
        return arguments.length > 1 ? ((_ == null ? force.remove(name) : force.set(name, initializeForce(_))), simulation) : force.get(name);
      },

      on: function(name, _) {
        return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
      }
    };
  }

  exports.version = version;
  exports.forceCenter = center;
  exports.forceCollide = collide;
  exports.forceLink = link;
  exports.forceManyBody = manyBody;
  exports.forcePosition = position;
  exports.forceSimulation = simulation;

}));