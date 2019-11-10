'use strict';

var d3Selection = require('d3-selection');
var d3Timer = require('d3-timer');
var d3Ease = require('d3-ease');

function selection_interrupt(name) {
  return this.each(function() {
    // TODO
  });
};

function selection_transition(name) {
  return new Transition(this._root, this._depth, name && ("__transition_ " + name + "_"));
};

function transition_ease(type, a, b) {
  var e = typeof type === "function" ? type : d3Ease.ease(type, a, b);
  return this.each(function() {
    // TODO
  });
};

var maxId = 0;
var proto = d3Selection.selection.prototype;
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

proto.interrupt = selection_interrupt;
proto.transition = selection_transition;

Transition.prototype = transition.prototype = {
  each: proto.each,
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

exports.transition = transition;