(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3-timer'), require('d3-ease')) :
  typeof define === 'function' && define.amd ? define('d3-transition', ['exports', 'd3-selection', 'd3-timer', 'd3-ease'], factory) :
  factory((global.d3_transition = {}),global.d3_selection,global.d3_timer,global.d3_ease);
}(this, function (exports,d3Selection,d3Timer,d3Ease) { 'use strict';

  function selection_interrupt(name) {
    return this.each(function() {
      // TODO
    });
  };

  function transition_ease(type, a, b) {
    var e = typeof type === "function" ? type : d3Ease.ease(type, a, b);
    return this.each(function() {
      // TODO
    });
  };

  var maxId = 0;

  function Transition(root, depth, key, id) {
    this._root = root;
    this._depth = depth;
    this._key = key || "__transition__";
    this._id = id || ++maxId;
    this.each(initialize(this._key, this._id));
  };

  function transition() {
    return new Transition([document.documentElement], 1);
  }

  Transition.prototype = transition.prototype = {
    each: d3Selection.selection.prototype.each,
    ease: transition_ease
  };

  function initialize(key, id) {
    return function() {
      var lock = this[key] || (this[key] = new Lock);
      if (lock.scheduled(id)) return;
    };
  }

  function Lock() {
    this.active = null;
    this.pending = [];
  }

  Lock.prototype = {
    scheduled: function(id) {
      if (this.active && this.active.id === id) return true;
      var pending = this.pending, i = pending.length;
      while (--i >= 0) if (pending[i].id === id) return true;
      return false;
    }
  };

  function selection_transition(name) {
    return new Transition(this._root, this._depth, name && ("__transition_ " + name + "_"));
  };

  d3Selection.selection.prototype.interrupt = selection_interrupt;
  d3Selection.selection.prototype.transition = selection_transition;

  var version = "0.0.6";

  exports.version = version;
  exports.transition = transition;

}));