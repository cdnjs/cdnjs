(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3-ease'), require('d3-interpolate'), require('d3-timer')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-selection', 'd3-ease', 'd3-interpolate', 'd3-timer'], factory) :
  (factory((global.d3_transition = {}),global.d3_selection,global.d3_ease,global.d3_interpolate,global.d3_timer));
}(this, function (exports,d3Selection,d3Ease,d3Interpolate,d3Timer) { 'use strict';

  function selection_interrupt(/* TODO name */) {
    return this.each(function() {
      // TODO
    });
  }

  // TODO transform interpolation

  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant(name, value1) {
    return value1 += "", function() {
      var node = this, value0 = node.getAttribute(name), i;
      return value0 !== value1 && (i = d3Interpolate.interpolate(value0, value1), function(t) {
        node.setAttribute(name, i(t));
      });
    };
  }

  function attrConstantNS(fullname, value1) {
    return value1 += "", function() {
      var node = this, value0 = node.getAttributeNS(fullname.space, fullname.local), i;
      return value0 !== value1 && (i = d3Interpolate.interpolate(value0, value1), function(t) {
        node.setAttributeNS(fullname.space, fullname.local, i(t));
      });
    };
  }

  function attrFunction(name, value) {
    return function() {
      var node = this, value0, value1 = value.apply(node, arguments), i;
      if (value1 == null) return node.removeAttribute(name);
      value0 = node.getAttribute(name), value1 += "";
      return value0 !== value1 && (i = d3Interpolate.interpolate(value0, value1), function(t) {
        node.setAttribute(name, i(t));
      });
    };
  }

  function attrFunctionNS(fullname, value) {
    return function() {
      var node = this, value0, value1 = value.apply(node, arguments), i;
      if (value1 == null) return node.removeAttributeNS(fullname.space, fullname.local);
      value0 = node.getAttributeNS(fullname.space, fullname.local), value1 += "";
      return value0 !== value1 && (i = d3Interpolate.interpolate(value0, value1), function(t) {
        node.setAttributeNS(fullname.space, fullname.local, i(t));
      });
    };
  }

  function transition_attr(name, value) {
    if (arguments.length < 2) return this.tween("attr." + name);
    var fullname = d3Selection.namespace(name);
    return this.tween("attr." + name, (value == null
        ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
        ? (fullname.local ? attrFunctionNS : attrFunction)
        : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
  }

  function initializeScheduleEntry(node, key, id, index, group, timing) {
    var schedule = node[key];
    if (!schedule) node[key] = schedule = {active: null, pending: []};
    else if (getScheduleEntry(node, key, id)) return;
    addScheduleEntry(node, key, {
      id: id,
      index: index, // For restoring context during callbacks.
      group: group, // For restoring context during callbacks.
      tweens: [],
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null
    });
  }

  function getScheduleEntry(node, key, id) {
    var schedule = node[key], entry = schedule.active;
    if (entry && entry.id === id) return entry;
    var pending = schedule.pending, i = pending.length;
    while (--i >= 0) if ((entry = pending[i]).id === id) return entry;
  }

  function addScheduleEntry(node, key, entry) {
    var schedule = node[key];

    // Initialize the entry timer when the transition is created. The delay is not
    // known until the first callback! If the delay is greater than this first
    // sleep, sleep again; otherwise, start immediately.
    schedule.pending.push(entry);
    entry.timer = d3Timer.timer(function(elapsed, now) {
      if (entry.delay <= elapsed) start(elapsed - entry.delay, now);
      else entry.timer.restart(start, entry.delay, entry.time);
    }, 0, entry.time);

    function start(elapsed, now) {
      var pending = schedule.pending,
          tweens = entry.tweens,
          i, j, n, o;

      // Interrupt the active transition, if any.
      // TODO Dispatch the interrupt event (within try-catch).
      if (schedule.active) {
        schedule.active.timer.stop();
      }

      // Cancel any pre-empted transitions. No interrupt event is dispatched
      // because the cancelled transitions never started. Note that this also
      // removes this transition from the pending list!
      // TODO Would a map or linked list be more efficient here?
      for (i = 0, j = -1, n = pending.length; i < n; ++i) {
        o = pending[i];
        if (o.id < entry.id) o.timer.stop();
        else if (o.id > entry.id) pending[++j] = o;
      }
      pending.length = j + 1;

      // Mark this transition as active.
      schedule.active = entry;

      // Defer the first tick to end of the current frame; see mbostock/d3#1576.
      // Note the transition may be canceled after start and before the first tick!
      // Note this must be scheduled before the start event; see d3/d3-transition#16!
      // Assuming this is successful, subsequent callbacks go straight to tick.
      d3Timer.timerOnce(function() {
        if (schedule.active === entry) {
          entry.timer.restart(tick, entry.delay, entry.time);
          tick(elapsed);
        }
      }, 0, now);

      // TODO Dispatch the start event (within try-catch).
      // Note this must be done before the tweens are initialized.

      // Initialize the tweens, deleting null tweens.
      for (i = 0, j = -1, n = tweens.length; i < n; ++i) {
        if (o = tweens[i].value.call(node, node.__data__, entry.index, entry.group)) {
          tweens[++j] = o;
        }
      }
      tweens.length = j + 1;
    }

    function tween(t) {
      for (var tweens = entry.tweens, i = 0, n = tweens.length; i < n; ++i) {
        tweens[i].call(node, t); // TODO tween could throw
      }
    }

    // TODO Dispatch the end event (within try-catch).
    function tick(elapsed) {
      if (elapsed >= entry.duration) { // TODO capture duration to ensure immutability?
        tween(1);
        schedule.active = null;
        if (!schedule.pending.length) delete node[key];
        entry.timer.stop();
      } else {
        tween(entry.ease.ease(elapsed / entry.duration)); // TODO ease could throw
      }
    }
  }

  function delayFunction(key, id, value) {
    return function() {
      getScheduleEntry(this, key, id).delay = +value.apply(this, arguments);
    };
  }

  function delayConstant(key, id, value) {
    return value = +value, function() {
      getScheduleEntry(this, key, id).delay = value;
    };
  }

  function transition_delay(value) {
    var id = this._id,
        key = this._key;

    return arguments.length
        ? this.each((typeof value === "function"
            ? delayFunction
            : delayConstant)(key, id, value))
        : getScheduleEntry(this.node(), key, id).delay;
  }

  function durationFunction(key, id, value) {
    return function() {
      getScheduleEntry(this, key, id).duration = +value.apply(this, arguments);
    };
  }

  function durationConstant(key, id, value) {
    return value = +value, function() {
      getScheduleEntry(this, key, id).duration = value;
    };
  }

  function transition_duration(value) {
    var id = this._id,
        key = this._key;

    return arguments.length
        ? this.each((typeof value === "function"
            ? durationFunction
            : durationConstant)(key, id, value))
        : getScheduleEntry(this.node(), key, id).duration;
  }

  function easeFunction(key, id, value) {
    return function() {
      getScheduleEntry(this, key, id).ease = value.apply(this, arguments);
    };
  }

  function easeConstant(key, id, value) {
    return function() {
      getScheduleEntry(this, key, id).ease = value;
    };
  }

  function transition_ease(value) {
    var id = this._id,
        key = this._key;

    return arguments.length
        ? this.each((typeof value === "function"
            ? easeFunction
            : easeConstant)(key, id, value))
        : getScheduleEntry(this.node(), key, id).ease;
  }

  function transition_filter(match) {
    if (typeof match !== "function") match = d3Selection.matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Transition(subgroups, this._parents, this._key, this._id);
  }

  function transition_select(select) {
    var id = this._id,
        key = this._key;

    if (typeof select !== "function") select = d3Selection.selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          initializeScheduleEntry(subgroup[i], key, id, i, subgroup, getScheduleEntry(node, key, id));
        }
      }
    }

    return new Transition(subgroups, this._parents, key, id);
  }

  function transition_selectAll(select) {
    var id = this._id,
        key = this._key;

    if (typeof select !== "function") select = d3Selection.selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          for (var children = select.call(node, node.__data__, i, group), child, timing = getScheduleEntry(node, key, id), k = 0, l = children.length; k < l; ++k) {
            if (child = children[k]) {
              initializeScheduleEntry(child, key, id, k, children, timing);
            }
          }
          subgroups.push(children);
          parents.push(node);
        }
      }
    }

    return new Transition(groups, parents, key, id);
  }

  // TODO export from d3-selection
  function defaultView(node) {
    return node
        && ((node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
            || (node.document && node) // node is a Window
            || node.defaultView); // node is a Document
  }

  function styleRemove(name, value, priority) {
    return function() {
      var node = this, style = defaultView(node).getComputedStyle(node, null), value0 = style.getPropertyValue(name), value1 = (node.style.removeProperty(name), style.getPropertyValue(name)), i;
      return value0 !== value1 && (i = d3Interpolate.interpolate(value0, value1), function(t) {
        if (t === 1) node.style.removeProperty(name);
        else node.style.setProperty(name, i(t), priority);
      });
    };
  }

  function styleConstant(name, value1, priority) {
    return value1 += "", function() {
      var node = this, value0 = defaultView(node).getComputedStyle(node, null).getPropertyValue(name), i;
      return value0 !== value1 && (i = d3Interpolate.interpolate(value0, value1), function(t) {
        node.style.setProperty(name, i(t), priority);
      });
    };
  }

  function styleFunction(name, value, priority) {
    return function() {
      var node = this, value0, value1 = value.apply(node, arguments), i;
      if (value1 == null) return node.style.removeProperty(name);
      value0 = defaultView(node).getComputedStyle(node, null).getPropertyValue(name), value1 += "";
      return value0 !== value1 && (i = d3Interpolate.interpolate(value0, value1), function(t) {
        node.style.setProperty(name, i(t), priority);
      });
    };
  }

  function transition_style(name, value, priority) {
    return arguments.length < 2
        ? this.tween("style." + name)
        : this.tween("style." + name, (value == null
            ? styleRemove : (typeof value === "function"
            ? styleFunction
            : styleConstant))(name, value, priority == null ? "" : priority));
  }

  function tweenFunction(key, id, name, value) {
    return function() {
      var tweens = getScheduleEntry(this, key, id).tweens;

      for (var i = 0, n = tweens.length, t; i < n; ++i) {
        if ((t = tweens[i]).name === name) {
          return t.value = value;
        }
      }

      tweens.push({name: name, value: value});
    };
  }

  function transition_tween(name, value) {
    var sname = name + "";

    if (arguments.length < 2) {
      var tweens = getScheduleEntry(this.node(), this._key, this._id).tweens;
      for (var i = 0, n = tweens.length, t; i < n; ++i) {
        if ((t = tweens[i]).name === sname) {
          return t;
        }
      }
      return null;
    }

    return this.each(tweenFunction(this._key, this._id, sname, value));
  }

  var root = [null];

  function Transition(groups, parents, key, id) {
    this._groups = groups;
    this._parents = parents;
    this._key = key;
    this._id = id;
  }

  function transition(name) {
    return new Transition([[document.documentElement]], root, namekey(name));
  }

  function namekey(name) {
    return name ? "__transition_" + name + "__" : "__transition__";
  }

  var selection_prototype = d3Selection.selection.prototype;

  Transition.prototype = transition.prototype = {
    select: transition_select,
    selectAll: transition_selectAll,
    filter: transition_filter,
    // TODO transition
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    // TODO each("event"), or on("event")?
    attr: transition_attr,
    // TODO attrTween
    style: transition_style,
    // TODO styleTween
    // TODO text
    // TODO remove
    tween: transition_tween,
    delay: transition_delay,
    duration: transition_duration,
    ease: transition_ease
  };

  var nextId = 0;

  function selection_transition(name) {
    var id = ++nextId,
        key = namekey(name),
        timing = {time: Date.now(), delay: 0, duration: 250, ease: d3Ease.easeCubicInOut};

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          initializeScheduleEntry(subgroup[i] = node, key, id, i, subgroup, timing);
        }
      }
    }

    return new Transition(subgroups, this._parents, key, id);
  }

  d3Selection.selection.prototype.interrupt = selection_interrupt;
  d3Selection.selection.prototype.transition = selection_transition;

  var version = "0.0.7";

  exports.version = version;
  exports.transition = transition;

}));