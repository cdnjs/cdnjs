/**
  Copyright (c) 2016 hustcc http://www.atool.org/
  License: MIT 
  https://github.com/hustcc/onfire.js
**/
/* jshint expr: true */ 
!function (root, factory) {
  if (typeof module === 'object' && module.exports)
    module.exports = factory();
  else
    root.onfire = factory();
}(typeof window !== 'undefined' ? window : this, function () {
  var __onfireEvents = {},
   __cnt = 0, // evnet counter
   string_str = 'string',
   function_str = 'function',
   hasOwnKey = Function.call.bind(Object.hasOwnProperty),
   slice = Function.call.bind(Array.prototype.slice);

  function _bind(eventName, callback, is_one, context) {
    if (typeof eventName !== string_str || typeof callback !== function_str) {
      throw new Error('args: '+string_str+', '+function_str+'');
    }
    if (! hasOwnKey(__onfireEvents, eventName)) {
      __onfireEvents[eventName] = {};
    }
    __onfireEvents[eventName][++__cnt] = [callback, is_one, context];

    return [eventName, __cnt];
  }
  function _each(obj, callback) {
    for (var key in obj) {
      if (hasOwnKey(obj, key)) callback(key, obj[key]);
    }
  }
  /**
   *  onfire.on( event, func, context ) -> Object
   *  - event (String): The event name to subscribe / bind to
   *  - func (Function): The function to call when a new event is published / triggered
   *  Bind / subscribe the event name, and the callback function when event is triggered, will return an event Object
  **/
  function on(eventName, callback, context) {
    return _bind(eventName, callback, 0, context);
  }
  /**
   *  onfire.one( event, func, context ) -> Object
   *  - event (String): The event name to subscribe / bind to
   *  - func (Function): The function to call when a new event is published / triggered
   *  Bind / subscribe the event name, and the callback function when event is triggered only once(can be triggered for one time), will return an event Object
  **/
  function one(eventName, callback, context) {
    return _bind(eventName, callback, 1, context);
  }
  function _fire_func(eventName, args) {
    if (hasOwnKey(__onfireEvents, eventName)) {
      _each(__onfireEvents[eventName], function(key, item) {
        item[0].apply(item[2], args); // do the function
        if (item[1]) delete __onfireEvents[eventName][key]; // when is one, delete it after triggle
      });
    }
  }
  /**
   *  onfire.fire( event[, data1 [,data2] ... ] )
   *  - event (String): The event name to publish
   *  - data...: The data to pass to subscribers / callbacks
   *  Async Publishes / fires the the event, passing the data to it's subscribers / callbacks
  **/
  function fire(eventName) {
    // fire events
    var args = slice(arguments, 1);
    setTimeout(function () {
      _fire_func(eventName, args);
    });
  }
  /**
   *  onfire.fireSync( event[, data1 [,data2] ... ] )
   *  - event (String): The event name to publish
   *  - data...: The data to pass to subscribers / callbacks
   *  Sync Publishes / fires the the event, passing the data to it's subscribers / callbacks
  **/
  function fireSync(eventName) {
    _fire_func(eventName, slice(arguments, 1));
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
    var eventName, key, r = false, type = typeof event;
    if (type === string_str) {
      // cancel the event name if exist
      if (hasOwnKey(__onfireEvents, event)) {
        delete __onfireEvents[event];
        return true;
      }
      return false;
    }
    else if (type === 'object') {
      eventName = event[0];
      key = event[1];
      if (hasOwnKey(__onfireEvents, eventName) && hasOwnKey(__onfireEvents[eventName], key)) {
        delete __onfireEvents[eventName][key];
        return true;
      }
      // can not find this event, return false
      return false;
    }
    else if (type === function_str) {
      _each(__onfireEvents, function(key_1, item_1) {
        _each(item_1, function(key_2, item_2) {
          if (item_2[0] === event) {
            delete __onfireEvents[key_1][key_2];
            r = true;
          }
        });
      });
      return r;
    }
    return true;
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
    fireSync: fireSync,
    clear: clear
  };
});