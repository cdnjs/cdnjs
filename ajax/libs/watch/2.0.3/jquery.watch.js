/**
 * jQuery Watch Plugin
 *
 * @author Darcy Clarke
 *
 * Copyright (c) 2013 Darcy Clarke
 * Dual licensed under the MIT and GPL licenses.
 *
 * Usage:
 * $('div').watch('width height', function(){
 *   console.log(this.style.width, this.style.height);
 * });
 */

(function($){

  /**
   * Watch Method
   *
   * @param (String) the name of the properties to watch
   * @param (Object) options to overide defaults (only 'throttle' right now)
   * @param (Function) callback function to be executed when attributes change
   *
   * @return (jQuery Object) returns the jQuery object for chainability
   */
  $.fn.watch = function(props, options, callback){

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
     * @return {Boolean} returns result of test (true/false)
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

    // Type check options
    if(typeof(options) == 'function'){
      callback = options;
      options = {};
    }

    // Type check callback
    if(typeof(callback) != 'function')
      callback = function(){};

    // Map options over defaults
    options = $.extend({}, { throttle : 10 }, options);

    /**
     * Checks if properties have changed
     *
     * @param (Element Object) the element to watch
     */
    var check = function($el){

      var that = this;

      $.each(this.watching, function(){

        // Setup
        var data = this;
        var changed = false;
        var temp;

        // Loop through properties
        for(var i=0;i < data.props.length; i++){
          temp = $el[0].attributes[data.props[i]] || $el.css(data.props[i]);
          if(data.vals[i] != temp){
            data.vals[i] = temp;
            changed = true;
            break;
          }
        }

        // Run callback if property has changed
        if(changed && data.callback)
          data.callback.call(that, new CustomEvent('AttrChange'));

      });

    };

    // Iterate over each element
    return this.each(function(){

      var that = this;
      var $el = $(this);
      var data = {
        props: props.split(' '),
        vals: [],
        changed: [],
        callback: callback
      };

      // Grab each properties initial value
      $.each(data.props, function(i){
        data.vals[i] = $el[0].attributes[data.props[i]] || $el.css(data.props[i]);
        data.changed[i] = false;
      });

      // Set data
      if(!this.watching)
        this.watching = [];
      this.watching.push(data);

      // Choose method of watching and fallback
      if(MutationObserver){
        var observer = new MutationObserver(function(mutations){
          mutations.forEach(function(mutation){
            callback.call(that, mutation);
          });
        });
        observer.observe(this, { subtree: false, attributes: true });
      } else if(isEventSupported('DOMAttrModified', div)){
        $el.on('DOMAttrModified', callback);
      } else if(isEventSupported('propertychange', div)){
        $el.on('propertychange', callback);
      } else {
        setInterval(function(){ check.call(that, $el); }, options.throttle);
      }
    });
  };

})(jQuery);
