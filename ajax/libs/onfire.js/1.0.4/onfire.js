/**
  Copyright (c) 2016 hustcc http://www.atool.org/
  License: MIT 
  https://github.com/hustcc/onfire.js
**/
/* jshint expr: true */ 
!function (root, factory) {
  if (typeof module === 'object' && module.exports)
    module.exports = factory(root);
  else
    root.onfire = factory(root);
}(typeof window !== 'undefined' ? window : this, function () {
  var __onfireEvents = {},
   __cnt = 0, // evnet counter
   t = true,
   f = false;
  function hasOwnKey(obj, key) {
    return obj.hasOwnProperty(key);
  }
  function _bind(eventName, callback, is_one) {
    if (typeof eventName !== 'string' || typeof callback !== 'function') {
      throw new Error('args must be (string, function).');
    }
    if (! hasOwnKey(__onfireEvents, eventName)) {
      __onfireEvents[eventName] = {};
    }
    var key = 'e' + (++__cnt);  // event index
    __onfireEvents[eventName][key] = [callback, is_one];

    return [eventName, key];
  }
  function _each(obj, callback) {
    var key;
    for (key in obj) {
      if (hasOwnKey(obj, key)) {
        callback(key, obj[key]);
      }
    }
  }
  /**
   *  onfire.on( event, func ) -> Object
   *  - event (String): The event name to subscribe / bind to
   *  - func (Function): The function to call when a new event is published / triggered
   *  Bind / subscribe the event name, and the callback function when event is triggered, will return an event Object
  **/
  function on(eventName, callback) {
    return _bind(eventName, callback, 0);
  }
  /**
   *  onfire.one( event, func ) -> Object
   *  - event (String): The event name to subscribe / bind to
   *  - func (Function): The function to call when a new event is published / triggered
   *  Bind / subscribe the event name, and the callback function when event is triggered only once(can be triggered for one time), will return an event Object
  **/
  function one(eventName, callback) {
    return _bind(eventName, callback, 1);
  }
  /**
   *  onfire.fire( event[, data1 [,data2] ... ] )
   *  - event (String): The message to publish
   *  - data...: The data to pass to subscribers / callbacks
   *  Publishes / fires the the event, passing the data to it's subscribers / callbacks
  **/
  function fire(eventName) {
    // fire events
    var args = Array.prototype.slice.call(arguments, 1);
    if (hasOwnKey(__onfireEvents, eventName)) {
      _each(__onfireEvents[eventName], function(key, item) {
        item[0].apply(null, args); // do the function
        if (item[1]) delete __onfireEvents[eventName][key]; // when is one, delete it after triggle
      });
      // for (key in __onfireEvents[eventName]) {
      //   if (hasOwnKey(__onfireEvents[eventName], key)) {
      //     callback = __onfireEvents[eventName][key];

      //     callback[0].apply(null, args); // do the function
      //     if (callback[1]) delete __onfireEvents[eventName][key]; // when is one, delete it after triggle
      //   }
      // }
    }
  }
  /**
   * onfire.un( event ) -> Boolean
   *  - event (String / Object): The message to publish
   * When passed a event Object, removes a specific subscription.
   * When passed event name String, removes all subscriptions for that event name(hierarchy)
  *
   * Unsubscribe / unbind an event or event object.
   *
   * Examples
   *
   *  // Example 1 - unsubscribing with a event object
   *  var event_object = onfire.on('my_event', myFunc);
   *  onfire.un(event_object);
   *
   *  // Example 2 - unsubscribing with a event name string
   *  onfire.un('my_event');
  **/
  function un(event) {
    var eventName, key;
    if (typeof event === 'string') {
      // cancel the event name if exist
      if (hasOwnKey(__onfireEvents, event)) {
        delete __onfireEvents[event];
        return t;
      }
      return f;
    }
    else if (typeof event === 'object') {
      eventName = event[0];
      key = event[1];
      if (hasOwnKey(__onfireEvents, eventName) && hasOwnKey(__onfireEvents[eventName], key)) {
        delete __onfireEvents[eventName][key];
        return t;
      }
      // can not find this event, return false
      return f;
    }
    else if (typeof event === 'function') {
      var r = f;
      _each(__onfireEvents, function(key_1, item_1) {
        _each(item_1, function(key_2, item_2) {
          if (item_2[0] === event) {
            delete __onfireEvents[key_1][key_2];
            r = t;
          }
        });
      });
      return r;
    }
    return f;
  }
  /**
   *  onfire.clear()
   *  Clears all subscriptions
  **/
  function clear() {
    __onfireEvents = {};
  }
  return {
    on: on,
    one: one,
    un: un,
    fire: fire,
    clear: clear
  };
});