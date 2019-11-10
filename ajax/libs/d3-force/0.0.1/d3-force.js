(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-timer'), require('d3-dispatch'), require('d3-collection')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-timer', 'd3-dispatch', 'd3-collection'], factory) :
  (factory((global.d3_force = global.d3_force || {}),global.d3_timer,global.d3_dispatch,global.d3_collection));
}(this, function (exports,d3Timer,d3Dispatch,d3Collection) { 'use strict';

  var version = "0.0.1";

  var friction = (function custom(k) {

    function force(nodes) {
      for (var i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i];
        node.x += (node.px - node.x) * k;
        node.y += (node.py - node.y) * k;
      }
    }

    force.strength = function(_) {
      return custom(+_);
    };

    return force;
  })(0.1);

  var tau = 2 * Math.PI;

  function custom(links, strength, distance) {

    function force(nodes, alpha) { // TODO iterate links in random order
      for (var i = 0, n = links.length, link, source, target, x, y, l; i < n; ++i) {
        link = links[i], source = link.source, target = link.target;
        x = target.x - source.x;
        y = target.y - source.y;
        if (l = x * x + y * y) l = Math.sqrt(l), l = (l - distance) / (l * 2);
        else l = Math.random() * tau, x = Math.cos(l), y = Math.sin(l), l = distance / 2;
        l *= alpha * strength, x *= l, y *= l; // TODO per-link strength, distance and bias
        target.x -= x;
        target.y -= y;
        source.x += x;
        source.y += y;
      }
    }

    force.links = function(_) {
      return custom(_, strength, distance);
    };

    force.strength = function(_) {
      return custom(links, +_, distance);
    };

    force.distance = function(_) {
      return custom(links, strength, +_);
    };

    return force;
  }

  function link(links) {
    return custom(links, 1, 40);
  }

  function custom$1(x, y, k) {

    function force(nodes, alpha) {
      for (var i = 0, n = nodes.length, node, ka = k * alpha; i < n; ++i) {
        node = nodes[i];
        node.x += (x - node.x) * ka;
        node.y += (y - node.y) * ka;
      }
    }

    force.position = function(_) {
      return custom$1(+_[0], +_[1], k);
    };

    force.strength = function(_) {
      return custom$1(x, y, +_);
    };

    return force;
  }

  function position(x, y) {
    return custom$1(+x, +y, 0.1);
  }

  function simulation(nodes) {
    var alphaMax = 0.1,
        alphaMin = 0.001,
        alphaDecay = 0.99,
        alpha = alphaMax,
        timer = d3Timer.timer(tick),
        force = d3Collection.map(),
        dispatch = d3Dispatch.dispatch("start", "tick", "end");

    function set(x) {
      if (!((x = +x) > 0)) {
        if (alpha > 0) {
          alpha = 0;
          dispatch.call("end", this);
          timer.stop();
        }
      } else {
        if (!(alpha > 0)) {
          alpha = x;
          dispatch.call("start", this);
          timer.restart(tick);
        } else {
          alpha = x;
        }
      }
    }

    function tick() {
      if ((alpha *= alphaDecay) <= alphaMin) return set(0);

      force.each(apply);

      for (var i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i];
        node.x -= node.px - (node.px = node.x);
        node.y -= node.py - (node.py = node.y);
      }

      dispatch.call("tick", this);
    }

    function apply(force) {
      force(nodes, alpha);
    }

    return {
      nodes: function(_) {
        return arguments.length ? (nodes = _, this) : nodes;
      },
      start: function() {
        return set(alphaMax), this;
      },
      stop: function() {
        return set(0), this;
      },
      alpha: function(_) {
        return arguments.length ? (set(+_), this) : alpha;
      },
      alphaRange: function(_) {
        return arguments.length ? (alphaMax = +_[0], alphaMin = +_[1], this) : [alphaMax, alphaMin];
      },
      alphaDecay: function(_) {
        return arguments.length ? (alphaDecay = +_, this) : alphaDecay;
      },
      force: function(name, _) {
        return arguments.length > 1 ? (force.set(name, _), this) : force.get(name);
      },
      on: function(name, _) {
        return arguments.length > 1 ? (dispatch.on(name, _), this) : dispatch.on(name);
      }
    };
  }

  exports.version = version;
  exports.forceFriction = friction;
  exports.forceLink = link;
  exports.forcePosition = position;
  exports.forceSimulation = simulation;

}));