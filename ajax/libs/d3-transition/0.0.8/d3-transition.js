(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3-ease'), require('d3-interpolate'), require('d3-dispatch'), require('d3-timer')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-selection', 'd3-ease', 'd3-interpolate', 'd3-dispatch', 'd3-timer'], factory) :
  (factory((global.d3_transition = {}),global.d3_selection,global.d3_ease,global.d3_interpolate,global.d3_dispatch,global.d3_timer));
}(this, function (exports,d3Selection,d3Ease,d3Interpolate,d3Dispatch,d3Timer) { 'use strict';

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
    return function() {
      var value0 = this.getAttribute(name);
      if (value0 !== value1) return attrInterpolate(this, name)(value0, value1);
    };
  }

  function attrConstantNS(fullname, value1) {
    return function() {
      var value0 = this.getAttributeNS(fullname.space, fullname.local);
      if (value0 !== value1) return d3Interpolate.interpolate(value0, value1);
    };
  }

  function attrFunction(name, value) {
    return function() {
      var value0, value1 = value.apply(this, arguments);
      if (value1 == null) return void this.removeAttribute(name);
      value0 = this.getAttribute(name), value1 += "";
      if (value0 !== value1) return attrInterpolate(this, name)(value0, value1);
    };
  }

  function attrFunctionNS(fullname, value) {
    return function() {
      var value0, value1 = value.apply(this, arguments);
      if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
      value0 = this.getAttributeNS(fullname.space, fullname.local), value1 += "";
      if (value0 !== value1) return d3Interpolate.interpolate(value0, value1);
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
    var fullname = d3Selection.namespace(name);
    return this.tween(key, (fullname.local
        ? attrTweenNS
        : attrTween)(fullname, value));
  }

  var emptyDispatch = d3Dispatch.dispatch("start", "end", "interrupt");

  function initializeScheduleEntry(node, key, id, index, group, timing) {
    var schedule = node[key];
    if (!schedule) node[key] = schedule = {active: null, pending: []};
    else if (getScheduleEntry(node, key, id)) return;
    addScheduleEntry(node, key, {
      id: id,
      index: index, // For restoring context during callbacks.
      group: group, // For restoring context during callbacks.
      dispatch: emptyDispatch,
      tweens: [],
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null
    });
  }

  function getScheduleEntry(node, key, id) {
    var schedule = node[key];
    if (!schedule) return;
    var entry = schedule.active;
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
      var interrupted = schedule.active,
          pending = schedule.pending,
          tweens = entry.tweens,
          i, j, n, o;

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

      // Interrupt the active transition, if any.
      // Dispatch the interrupt event.
      // TODO Dispatch the interrupt event before updating the active transition?
      if (interrupted) {
        interrupted.timer.stop();
        interrupted.dispatch.interrupt.call(node, node.__data__, interrupted.index, interrupted.group); // TODO try-catch?
      }

      // Dispatch the start event.
      // Note this must be done before the tweens are initialized.
      entry.dispatch.start.call(node, node.__data__, entry.index, entry.group); // TODO try-catch?

      // Initialize the tweens, deleting null tweens.
      // TODO Would a map or linked list be more efficient here?
      // TODO Overwriting the tweens array could be exposed through getScheduleEntry?
      for (i = 0, j = -1, n = tweens.length; i < n; ++i) {
        if (o = tweens[i].value.call(node, node.__data__, entry.index, entry.group)) { // TODO try-catch?
          tweens[++j] = o;
        }
      }
      tweens.length = j + 1;
    }

    function tick(elapsed) {
      var tweens = entry.tweens,
          t = elapsed / entry.duration, // TODO capture duration to ensure immutability?
          e = t >= 1 ? 1 : entry.ease.call(null, t), // TODO try-catch?
          i, n;

      for (i = 0, n = tweens.length; i < n; ++i) {
        tweens[i].call(null, e); // TODO try-catch?
      }

      // Dispatch the end event.
      // TODO Dispatch the end event before clearing the active transition?
      if (t >= 1) {
        schedule.active = null;
        if (!schedule.pending.length) delete node[key];
        entry.timer.stop();
        entry.dispatch.end.call(node, node.__data__, entry.index, entry.group); // TODO try-catch
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
    var key = this._key,
        id = this._id;

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
    var key = this._key,
        id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? durationFunction
            : durationConstant)(key, id, value))
        : getScheduleEntry(this.node(), key, id).duration;
  }

  function easeConstant(key, id, value) {
    return function() {
      getScheduleEntry(this, key, id).ease = value;
    };
  }

  // TODO immediately verify that value is a function
  function transition_ease(value) {
    var key = this._key,
        id = this._id;

    return arguments.length
        ? this.each(easeConstant(key, id, value))
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

  function onFunction(key, id, name, listener) {
    return function() {
      var entry = getScheduleEntry(this, key, id), d = entry.dispatch;
      if (d === emptyDispatch) entry.dispatch = d = d3Dispatch.dispatch("start", "end", "interrupt");
      d.on(name, listener);
    };
  }

  function transition_on(name, listener) {
    var key = this._key,
        id = this._id;

    if (arguments.length < 2) {
      var entry = getScheduleEntry(this.node(), key, id);
      return entry && entry.dispatch.on(name);
    }

    return this.each(onFunction(key, id, name, listener));
  }

  function removeFunction(key) {
    return function() {
      var parent = this.parentNode;
      if (parent && !this[key]) parent.removeChild(this);
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
          initializeScheduleEntry(subgroup[i], key, id, i, subgroup, getScheduleEntry(node, key, id));
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

  function styleRemove(name) {
    return function() {
      var style = defaultView(this).getComputedStyle(this, null),
          value0 = style.getPropertyValue(name),
          value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
      if (value0 !== value1) return d3Interpolate.interpolate(value0, value1);
    };
  }

  function styleRemoveEnd(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, value1) {
    return function() {
      var value0 = defaultView(this).getComputedStyle(this, null).getPropertyValue(name);
      if (value0 !== value1) return d3Interpolate.interpolate(value0, value1);
    };
  }

  function styleFunction(name, value) {
    return function() {
      var value0, value1 = value.apply(this, arguments);
      if (value1 == null) return void this.style.removeProperty(name);
      value0 = defaultView(this).getComputedStyle(this, null).getPropertyValue(name), value1 += "";
      if (value0 !== value1) return d3Interpolate.interpolate(value0, value1);
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
          var entry = getScheduleEntry(node, key, id0);
          initializeScheduleEntry(node, key, id1, i, group, {
            time: entry.time,
            delay: entry.delay + entry.duration,
            duration: entry.duration,
            ease: entry.ease
          });
        }
      }
    }

    return new Transition(groups, this._parents, key, id1);
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
    var key = this._key,
        id = this._id,
        sname = name + "";

    if (arguments.length < 2) {
      var entry = getScheduleEntry(this.node(), key, id);
      if (entry) for (var tweens = entry.tweens, i = 0, n = tweens.length, t; i < n; ++i) {
        if ((t = tweens[i]).name === sname) {
          return t.value;
        }
      }
      return null;
    }

    return this.each(tweenFunction(key, id, sname, value));
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
    return name ? "__transition_" + name + "__" : "__transition__";
  }

  var selection_prototype = d3Selection.selection.prototype;

  Transition.prototype = transition.prototype = {
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
            active = schedule.active;
        for (var i = 0, n = pending.length; i < n; ++i) {
          pending[i].timer.stop();
        }
        pending.length = 0;
        if (active) {
          schedule.active = null;
          active.timer.stop();
          active.dispatch.interrupt.call(this, this.__data__, active.index, active.group); // TODO try-catch?
        }
        delete this[key];
      }
    });
  }

  function selection_transition(name) {
    var id = newId(),
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

  var version = "0.0.8";

  exports.version = version;
  exports.transition = transition;

}));