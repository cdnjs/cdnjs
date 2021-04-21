/**
* Tom Select v1.5.0
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

/**
 * Execute callback for each event in space separated list of event names
 *
 */
function forEvents(events, callback) {
  events.split(/\s+/).forEach(event => {
    callback(event);
  });
}

class MicroEvent {
  constructor() {
    this._events = {};
  }

  on(events, fct) {
    forEvents(events, event => {
      this._events[event] = this._events[event] || [];

      this._events[event].push(fct);
    });
  }

  off(events, fct) {
    var n = arguments.length;

    if (n === 0) {
      this._events = {};
      return;
    }

    forEvents(events, event => {
      if (n === 1) return delete this._events[event];
      if (event in this._events === false) return;

      this._events[event].splice(this._events[event].indexOf(fct), 1);
    });
  }

  trigger(events, ...args) {
    var self = this;
    forEvents(events, event => {
      if (event in self._events === false) return;

      for (let fct of self._events[event]) {
        fct.apply(self, args);
      }
    });
  }

}

export default MicroEvent;
//# sourceMappingURL=microevent.js.map
