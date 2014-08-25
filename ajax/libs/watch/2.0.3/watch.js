/**
 * Watch Event Listener
 *
 * @author Darcy Clarke
 *
 * Copyright (c) 2013 Darcy Clarke
 * Dual licensed under the MIT and GPL licenses.
 *
 * Usage:
 * watch(element, 'width height', function(){
 *   console.log(this.style.width, this.style.height);
 * });
 */

/**
 * Watch Method
 *
 * @param (String) the name of the properties to watch
 * @param (Object) options to overide defaults (only 'throttle' right now)
 * @param (Function) callback function to be executed when attributes change
 *
 */
window.watch = function(){

  (function (elements, props, options, callback){

    // Div element
    var div = document.createElement('div');

    // Check MutationObserver
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    // CustomEvent with fallback
    var CustomEvent = window.CustomEvent || function(){ return arguments || {}; };

    /**
     * Checks Support for Event
     *
     * @param (String) the name of the event
     * @param (Element Object) the element to test support against
     *
     * @return (Boolean) returns result of test (true/false)
     */
    var isEventSupported = function(eventName, el){
      eventName = 'on' + eventName;
      var supported = (eventName in el);
      if(!supported){
        el.setAttribute(eventName, 'return;');
        supported = typeof el[eventName] == 'function';
      }
      return supported;
    };

    /**
     * Add Event Listener
     *
     * @param (Element Object) the HTML element
     * @param (String) the event name
     * @param (Function) the function to execute
     *
     * @return (Boolean) returns result of test (true/false)
     */
    var addEvent = function(obj, type, fn){
      if (obj.addEventListener){
        obj.addEventListener(type, fn, false);

      } else if(obj.attachEvent){
        obj['e' + type + fn] = fn;
        obj[type + fn] = function() { obj['e' + type + fn](window.event); };
        obj.attachEvent('on' + type, obj[type + fn]);
      }
    };

    /*
     * Object to Array
     *
     * @param (Object) the object to transform
     *
     * @return (Array) returns transformed array
     */
    function toArray(obj){
      var array = [];
      for(var i = obj.length >>> 0; i--;){
        array[i] = obj[i];
      }
      return array;
    }

    /**
     * Checks if properties have changed
     *
     * @param (Element Object) the element to watch
     */
    var check = function(el){

      var that = this;

      for(var x=0; x < that.watching.length; x++){

        // Setup
        var data = that.watching[x];
        var changed = false;
        var temp;

        // Loop through properties
        for(var i=0;i < data.props.length; i++){
          temp = el.attributes[data.props[i]] || el.style[data.props[i]];
          if(data.vals[i] != temp){
            data.vals[i] = temp;
            changed = true;
            break;
          }
        }

        // Run callback if property has changed
        if(changed && data.callback)
          data.callback.call(that[0], new CustomEvent('AttrChange'));

      };

    };

    // Check element is defined
    if(!elements || typeof elements !== 'object')
      return;
    elements = toArray(elements);

    // Type check options
    if(typeof(options) == 'function'){
      callback = options;
      options = {};
    }

    // Type check callback
    if(typeof(callback) != 'function')
      callback = function(){};

    // Set throttle
    options.throttle = options.throttle || 10;

    // Iterate over elements
    for(var i=0; i < elements.length; i++){

      // Setup
      var that = this;
      var el = elements[i];
      var data = {
        props: props.split(' '),
        vals: [],
        changed: [],
        callback: callback
      };

      // Grab each properties initial value
      for(var x=0; x < data.props.length; x++){
        data.vals[x] = el.attributes[data.props[x]] || el.style[data.props[x]];
        data.changed[x] = false;
      }

      // Set data
      if(!that.watching)
        that.watching = [];
      that.watching.push(data);

      // Choose method of watching and fallback
      if(MutationObserver){
        var observer = new MutationObserver(function(mutations){
          mutations.forEach(function(e) {
            callback.call(el, e);
          });
        });
        observer.observe(el, { subtree: false, attributes: true });
      } else if(isEventSupported('DOMAttrModified', div)){
        addEvent(el, 'DOMAttrModified', callback);
      } else if(isEventSupported('propertychange', div)){
        addEvent(el, 'propertychange', callback);
      } else {
        setInterval(function(){ check.call(that, el); }, options.throttle);
      }

    }

  }).apply(arguments[0], arguments);

};
