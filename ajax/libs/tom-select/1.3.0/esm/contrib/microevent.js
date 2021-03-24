/**
* Tom Select v1.3.0
* Licensed under the Apache License, Version 2.0 (the "License");
*/

/**
 * MicroEvent - to make any js object an event emitter
 *
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * @author Jerome Etienne (https://github.com/jeromeetienne)
 */
class MicroEvent {
  constructor() {
    this._events = {};
  }

  on(event, fct) {
    this._events[event] = this._events[event] || [];

    this._events[event].push(fct);
  }

  off(event, fct) {
    var n = arguments.length;
    if (n === 0) return delete this._events;
    if (n === 1) return delete this._events[event];
    this._events = this._events || {};
    if (event in this._events === false) return;

    this._events[event].splice(this._events[event].indexOf(fct), 1);
  }

  trigger(event
  /* , args... */
  ) {
    this._events = this._events || {};
    if (event in this._events === false) return;

    for (var i = 0; i < this._events[event].length; i++) {
      this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  }

}

export default MicroEvent;
//# sourceMappingURL=microevent.js.map
