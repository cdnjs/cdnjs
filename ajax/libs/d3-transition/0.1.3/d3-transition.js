(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3-interpolate'), require('d3-dispatch'), require('d3-timer'), require('d3-ease')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-selection', 'd3-interpolate', 'd3-dispatch', 'd3-timer', 'd3-ease'], factory) :
  (factory((global.d3_transition = global.d3_transition || {}),global.d3_selection,global.d3_interpolate,global.d3_dispatch,global.d3_timer,global.d3_ease));
}(this, function (exports,d3Selection,d3Interpolate,d3Dispatch,d3Timer,d3Ease) { 'use strict';

  // TODO Assumes either ALL selected nodes are SVG, or none are.
  function attrInterpolate(node, name) {
    return name === "transform" && node.namespaceURI === d3Selection.namespaces.svg
        ? d3Interpolate.interpolateTransform
        : d3Interpolate.interpolate;
  }

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
    var value00,
        interpolate0;
    return value1 += "", function() {
      var value0 = this.getAttribute(name);
      return value0 === value1 ? null
          : value0 === value00 ? interpolate0
          : interpolate0 = attrInterpolate(this, name)(value00 = value0, value1);
    };
  }

  function attrConstantNS(fullname, value1) {
    var value00,
        interpolate0;
    return value1 += "", function() {
      var value0 = this.getAttributeNS(fullname.space, fullname.local);
      return value0 === value1 ? null
          : value0 === value00 ? interpolate0
          : interpolate0 = d3Interpolate.interpolate(value00 = value0, value1);
    };
  }

  function attrFunction(name, value) {
    var value00,
        value10,
        interpolate0;
    return function() {
      var value0,
          value1 = value.apply(this, arguments);
      if (value1 == null) return void this.removeAttribute(name);
      value0 = this.getAttribute(name), value1 += "";
      return value0 === value1 ? null
          : value0 === value00 && value1 === value10 ? interpolate0
          : interpolate0 = attrInterpolate(this, name)(value00 = value0, value10 = value1);
    };
  }

  function attrFunctionNS(fullname, value) {
    var value00,
        value10,
        interpolate0;
    return function() {
      var value0, value1 = value.apply(this, arguments);
      if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
      value0 = this.getAttributeNS(fullname.space, fullname.local), value1 += "";
      return value0 === value1 ? null
          : value0 === value00 && value1 === value10 ? interpolate0
          : interpolate0 = d3Interpolate.interpolate(value00 = value0, value10 = value1);
    };
  }

  function transition_attr(name, value) {
    var fullname = d3Selection.namespace(name);
    return this.attrTween(name, (value == null
        ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
        ? (fullname.local ? attrFunctionNS : attrFunction)
        : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
  }

  function attrTweenNS(fullname, value) {
    function tween() {
      var node = this, i = value.apply(node, arguments);
      return i && function(t) {
        node.setAttributeNS(fullname.space, fullname.local, i(t));
      };
    }
    tween._value = value;
    return tween;
  }

  function attrTween(name, value) {
    function tween() {
      var node = this, i = value.apply(node, arguments);
      return i && function(t) {
        node.setAttribute(name, i(t));
      };
    }
    tween._value = value;
    return tween;
  }

  function transition_attrTween(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (typeof value !== "function") throw new Error;
    var fullname = d3Selection.namespace(name);
    return this.tween(key, (fullname.local
        ? attrTweenNS
        : attrTween)(fullname, value));
  }

  var emptyOn = d3Dispatch.dispatch("start", "end", "interrupt");
  var emptyTweens = [];

  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTED = 2;
  function schedule(node, key, id, index, group, timing) {
    var schedules = node[key];
    if (!schedules) node[key] = schedules = {active: null, pending: []};
    else if (has(node, key, id)) return;
    start(node, key, {
      id: id,
      index: index, // For context during callback.
      group: group, // For context during callback.
      on: emptyOn,
      tweens: emptyTweens,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }

  function has(node, key, id) {
    var schedules = node[key];
    if (!schedules) return;
    var schedule = schedules.active;
    if (schedule && schedule.id === id) return schedule;
    var pending = schedules.pending, i = pending.length;
    while (--i >= 0) if ((schedule = pending[i]).id === id) return schedule;
  }

  function init(node, key, id) {
    var schedule = has(node, key, id);
    if (!schedule || schedule.state > CREATED) throw new Error("too late");
    return schedule;
  }

  function set(node, key, id) {
    var schedule = has(node, key, id);
    if (!schedule || schedule.state > SCHEDULED) throw new Error("too late");
    return schedule;
  }

  function get(node, key, id) {
    var schedule = has(node, key, id);
    if (!schedule) throw new Error("too late");
    return schedule;
  }

  function start(node, key, self) {
    var schedules = node[key],
        tweens;

    // Initialize the self timer when the transition is created.
    // Note the actual delay is not known until the first callback!
    schedules.pending.push(self);
    self.timer = d3Timer.timer(schedule, 0, self.time);

    // If the delay is greater than this first sleep, sleep some more;
    // otherwise, start immediately.
    function schedule(elapsed) {
      self.state = SCHEDULED;
      if (self.delay <= elapsed) start(elapsed - self.delay);
      else self.timer.restart(start, self.delay, self.time);
    }

    function start(elapsed) {
      var interrupted = schedules.active,
          pending = schedules.pending,
          i, j, n, o;

      // Interrupt the active transition, if any.
      // Dispatch the interrupt event.
      if (interrupted) {
        interrupted.timer.stop();
        interrupted.on.call("interrupt", node, node.__data__, interrupted.index, interrupted.group);
      }

      // Cancel any pre-empted transitions. No interrupt event is dispatched
      // because the cancelled transitions never started. Note that this also
      // removes this transition from the pending list!
      for (i = 0, j = -1, n = pending.length; i < n; ++i) {
        o = pending[i];
        if (o.id < self.id) o.timer.stop();
        else if (o.id > self.id) pending[++j] = o;
      }
      pending.length = j + 1;

      // Mark this transition as active.
      schedules.active = self;

      // Defer the first tick to end of the current frame; see mbostock/d3#1576.
      // Note the transition may be canceled after start and before the first tick!
      // Note this must be scheduled before the start event; see d3/d3-transition#16!
      // Assuming this is successful, subsequent callbacks go straight to tick.
      d3Timer.timeout(function() {
        if (schedules.active === self) {
          self.timer.restart(tick, self.delay, self.time);
          tick(elapsed);
        }
      });

      // Dispatch the start event.
      // Note this must be done before the tweens are initialized.
      self.on.call("start", node, node.__data__, self.index, self.group);
      self.state = STARTED;

      // Initialize the tweens, deleting null tweens.
      tweens = new Array(n = self.tweens.length);
      for (i = 0, j = -1; i < n; ++i) {
        if (o = self.tweens[i].value.call(node, node.__data__, self.index, self.group)) {
          tweens[++j] = o;
        }
      }
      tweens.length = j + 1;
    }

    function tick(elapsed) {
      var t = elapsed / self.duration,
          e = t >= 1 ? 1 : self.ease.call(null, t),
          i, n;

      for (i = 0, n = tweens.length; i < n; ++i) {
        tweens[i].call(null, e);
      }

      // Dispatch the end event.
      if (t >= 1) {
        self.on.call("end", node, node.__data__, self.index, self.group);
        schedules.active = null;
        if (!schedules.pending.length) delete node[key];
        self.timer.stop();
      }
    }
  }

  function delayFunction(key, id, value) {
    return function() {
      init(this, key, id).delay = +value.apply(this, arguments);
    };
  }

  function delayConstant(key, id, value) {
    return value = +value, function() {
      init(this, key, id).delay = value;
    };
  }

  function transition_delay(value) {
    var key = this._key,
        id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? delayFunction
            : delayConstant)(key, id, value))
        : get(this.node(), key, id).delay;
  }

  function durationFunction(key, id, value) {
    return function() {
      set(this, key, id).duration = +value.apply(this, arguments);
    };
  }

  function durationConstant(key, id, value) {
    return value = +value, function() {
      set(this, key, id).duration = value;
    };
  }

  function transition_duration(value) {
    var key = this._key,
        id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? durationFunction
            : durationConstant)(key, id, value))
        : get(this.node(), key, id).duration;
  }

  function easeConstant(key, id, value) {
    if (typeof value !== "function") throw new Error;
    return function() {
      set(this, key, id).ease = value;
    };
  }

  function transition_ease(value) {
    var key = this._key,
        id = this._id;

    return arguments.length
        ? this.each(easeConstant(key, id, value))
        : get(this.node(), key, id).ease;
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

  function onFunction(key, id, name, listener) {
    if (typeof listener !== "function") throw new Error;
    var on0, on1;
    return function() {
      var schedule = init(this, key, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

      schedule.on = on1;
    };
  }

  function transition_on(name, listener) {
    var key = this._key,
        id = this._id;

    return arguments.length < 2
        ? get(this.node(), key, id).on.on(name)
        : this.each(onFunction(key, id, name, listener));
  }

  function removeFunction(key) {
    return function() {
      var parent = this.parentNode;
      if (parent && !this[key].pending.length) parent.removeChild(this);
    };
  }

  function transition_remove() {
    return this.on("end.remove", removeFunction(this._key));
  }

  function transition_select(select) {
    var key = this._key,
        id = this._id;

    if (typeof select !== "function") select = d3Selection.selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule(subgroup[i], key, id, i, subgroup, get(node, key, id));
        }
      }
    }

    return new Transition(subgroups, this._parents, key, id);
  }

  function transition_selectAll(select) {
    var key = this._key,
        id = this._id;

    if (typeof select !== "function") select = d3Selection.selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, key, id), k = 0, l = children.length; k < l; ++k) {
            if (child = children[k]) {
              schedule(child, key, id, k, children, inherit);
            }
          }
          subgroups.push(children);
          parents.push(node);
        }
      }
    }

    return new Transition(groups, parents, key, id);
  }

  function styleRemove(name) {
    var value00,
        value10,
        interpolate0;
    return function() {
      var style = d3Selection.window(this).getComputedStyle(this, null),
          value0 = style.getPropertyValue(name),
          value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
      return value0 === value1 ? null
          : value0 === value00 && value1 === value10 ? interpolate0
          : interpolate0 = d3Interpolate.interpolate(value00 = value0, value10 = value1);
    };
  }

  function styleRemoveEnd(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, value1) {
    var value00,
        interpolate0;
    return value1 += "", function() {
      var value0 = d3Selection.window(this).getComputedStyle(this, null).getPropertyValue(name);
      return value0 === value1 ? null
          : value0 === value00 ? interpolate0
          : interpolate0 = d3Interpolate.interpolate(value00 = value0, value1);
    };
  }

  function styleFunction(name, value) {
    var value00,
        value10,
        interpolate0;
    return function() {
      var style = d3Selection.window(this).getComputedStyle(this, null),
          value0 = style.getPropertyValue(name),
          value1 = value.apply(this, arguments);
      if (value1 == null) value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
      else value1 += "";
      return value0 === value1 ? null
          : value0 === value00 && value1 === value10 ? interpolate0
          : interpolate0 = d3Interpolate.interpolate(value00 = value0, value10 = value1);
    };
  }

  function transition_style(name, value, priority) {
    return value == null ? this
            .styleTween(name, styleRemove(name))
            .on("end.style." + name, styleRemoveEnd(name))
        : this.styleTween(name, (typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value), priority);
  }

  function styleTween(name, value, priority) {
    if (typeof value !== "function") throw new Error;
    function tween() {
      var node = this, i = value.apply(node, arguments);
      return i && function(t) {
        node.style.setProperty(name, i(t), priority);
      };
    }
    tween._value = value;
    return tween;
  }

  function transition_styleTween(name, value, priority) {
    var key = "style." + name;
    return arguments.length < 2
        ? (key = this.tween(key)) && key._value
        : this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }

  function textConstant(value) {
    return value = value == null ? "" : value + "", function() {
      this.textContent = value;
    };
  }

  function textFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) v = "";
      this.textContent = v;
    };
  }

  function transition_text(value) {
    return this.tween("text", (typeof value === "function"
        ? textFunction
        : textConstant)(value));
  }

  function transition_transition() {
    var key = this._key,
        id0 = this._id,
        id1 = newId();

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          var inherit = get(node, key, id0);
          schedule(node, key, id1, i, group, {
            time: inherit.time + inherit.delay + inherit.duration,
            delay: 0,
            duration: inherit.duration,
            ease: inherit.ease
          });
        }
      }
    }

    return new Transition(groups, this._parents, key, id1);
  }

  function tweenFunction(key, id, name, value) {
    var tweens0, tweens1;
    return function() {
      var schedule = set(this, key, id),
          tweens = schedule.tweens;

      // If this node shared tweens with the previous node,
      // just assign the updated shared tweens and we’re done!
      // Otherwise, copy-on-write.
      if (tweens !== tweens0) {
        tweens1 = (tweens0 = tweens).slice();
        for (var t = {name: name, value: value}, i = 0, n = tweens1.length; i < n; ++i) {
          if (tweens1[i].name === name) {
            tweens1[i] = t;
            break;
          }
        }
        if (i === n) tweens1.push(t);
      }

      schedule.tweens = tweens1;
    };
  }

  function transition_tween(name, value) {
    var key = this._key,
        id = this._id;

    name += "";

    if (arguments.length < 2) {
      var tweens = get(this.node(), key, id).tweens;
      for (var i = 0, n = tweens.length, t; i < n; ++i) {
        if ((t = tweens[i]).name === name) {
          return t.value;
        }
      }
      return null;
    }

    if (typeof value !== "function") throw new Error;
    return this.each(tweenFunction(key, id, name, value));
  }

  var id = 0;

  function Transition(groups, parents, key, id) {
    this._groups = groups;
    this._parents = parents;
    this._key = key;
    this._id = id;
  }

  function transition(name) {
    return d3Selection.selection().transition(name);
  }

  function newId() {
    return ++id;
  }

  function namekey(name) {
    return name ? "__transition" + name : "__transition";
  }

  var selection_prototype = d3Selection.selection.prototype;

  Transition.prototype = transition.prototype = {
    constructor: Transition,
    select: transition_select,
    selectAll: transition_selectAll,
    filter: transition_filter,
    transition: transition_transition,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: transition_on,
    attr: transition_attr,
    attrTween: transition_attrTween,
    style: transition_style,
    styleTween: transition_styleTween,
    text: transition_text,
    remove: transition_remove,
    tween: transition_tween,
    delay: transition_delay,
    duration: transition_duration,
    ease: transition_ease
  };

  function selection_interrupt(name) {
    var key = namekey(name);
    return this.each(function() {
      var schedule = this[key];
      if (schedule) {
        var pending = schedule.pending,
            active = schedule.active,
            i, n;
        if (active) {
          active.on.call("interrupt", this, this.__data__, active.index, active.group); // TODO try-catch?
          schedule.active = null;
          active.timer.stop();
        }
        for (i = 0, n = pending.length; i < n; ++i) {
          pending[i].timer.stop();
        }
        pending.length = 0;
        delete this[key];
      }
    });
  }

  var defaultTiming = {
    time: null, // Set on use.
    delay: 0,
    duration: 250,
    ease: d3Ease.easeCubicInOut
  };

  function selection_transition(name) {
    var key,
        id,
        timing;

    if (name instanceof Transition) {
      key = name._key, id = name._id, timing = get(name.node(), key, id);
    } else {
      key = namekey(name), id = newId(), (timing = defaultTiming).time = d3Timer.now();
    }

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          schedule(node, key, id, i, group, timing);
        }
      }
    }

    return new Transition(groups, this._parents, key, id);
  }

  d3Selection.selection.prototype.interrupt = selection_interrupt;
  d3Selection.selection.prototype.transition = selection_transition;

  var root = [null];

  function active(node, name) {
    var key = namekey(name), active = node[key];
    if (!active || !(active = active.active)) return null;
    return new Transition([[node]], root, key, active.id);
  }

  var version = "0.1.3";

  exports.version = version;
  exports.transition = transition;
  exports.active = active;

}));