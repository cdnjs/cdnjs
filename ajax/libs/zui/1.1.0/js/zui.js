/*!
 * ZUI - v1.1.0 - 2014-08-05
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 */

/* Some code copy from Bootstrap v3.0.0 by @fat and @mdo. (Copyright 2013 Twitter, Inc. Licensed under http://www.apache.org/licenses/)*/

if (typeof jQuery === "undefined") { throw new Error("ZUI requires jQuery") }

/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){
  
  jQuery.hotkeys = {
    version: "0.8",

    specialKeys: {
      8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
      20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
      37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
      96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
      104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
      112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
      120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
    },
  
    shiftNums: {
      "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
      "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
      ".": ">",  "/": "?",  "\\": "|"
    }
  };

  function keyHandler( handleObj ) {
    // Only care when a possible input has been specified
    if ( typeof handleObj.data !== "string" ) {
      return;
    }
    
    var origHandler = handleObj.handler,
      keys = handleObj.data.toLowerCase().split(" ");
  
    handleObj.handler = function( event ) {
      // Don't fire in text-accepting inputs that we didn't directly bind to
      if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
         event.target.type === "text") ) {
        return;
      }
      
      // Keypress represents characters, not special keys
      var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
        character = String.fromCharCode( event.which ).toLowerCase(),
        key, modif = "", possible = {};

      // check combinations (alt|ctrl|shift+anything)
      if ( event.altKey && special !== "alt" ) {
        modif += "alt+";
      }

      if ( event.ctrlKey && special !== "ctrl" ) {
        modif += "ctrl+";
      }
      
      // TODO: Need to make sure this works consistently across platforms
      if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
        modif += "meta+";
      }

      if ( event.shiftKey && special !== "shift" ) {
        modif += "shift+";
      }

      if ( special ) {
        possible[ modif + special ] = true;

      } else {
        possible[ modif + character ] = true;
        possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

        // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
        if ( modif === "shift+" ) {
          possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
        }
      }

      for ( var i = 0, l = keys.length; i < l; i++ ) {
        if ( possible[ keys[i] ] ) {
          return origHandler.apply( this, arguments );
        }
      }
    };
  }

  jQuery.each([ "keydown", "keyup", "keypress" ], function() {
    jQuery.event.special[ this ] = { add: keyHandler };
  });

})( jQuery );

/*!
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery resize event
//
// *Version: 1.1, Last updated: 3/14/2010*
// 
// Project Home - http://benalman.com/projects/jquery-resize-plugin/
// GitHub       - http://github.com/cowboy/jquery-resize/
// Source       - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.js
// (Minified)   - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.min.js (1.0kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// This working example, complete with fully commented code, illustrates a few
// ways in which this plugin can be used.
// 
// resize event - http://benalman.com/code/projects/jquery-resize/examples/resize/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-resize/unit/
// 
// About: Release History
// 
// 1.1 - (3/14/2010) Fixed a minor bug that was causing the event to trigger
//       immediately after bind in some circumstances. Also changed $.fn.data
//       to $.data to improve performance.
// 1.0 - (2/10/2010) Initial release

+function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // A jQuery object containing all non-window elements to which the resize
  // event is bound.
  var elems = $([]),
    
    // Extend $.resize if it already exists, otherwise create it.
    jq_resize = $.resize = $.extend( $.resize, {} ),
    
    timeout_id,
    
    // Reused strings.
    str_setTimeout = 'setTimeout',
    str_resize = 'resize',
    str_data = str_resize + '-special-event',
    str_delay = 'delay',
    str_throttle = 'throttleWindow';
  
  // Property: jQuery.resize.delay
  // 
  // The numeric interval (in milliseconds) at which the resize event polling
  // loop executes. Defaults to 250.
  
  jq_resize[ str_delay ] = 250;
  
  // Property: jQuery.resize.throttleWindow
  // 
  // Throttle the native window object resize event to fire no more than once
  // every <jQuery.resize.delay> milliseconds. Defaults to true.
  // 
  // Because the window object has its own resize event, it doesn't need to be
  // provided by this plugin, and its execution can be left entirely up to the
  // browser. However, since certain browsers fire the resize event continuously
  // while others do not, enabling this will throttle the window resize event,
  // making event behavior consistent across all elements in all browsers.
  // 
  // While setting this property to false will disable window object resize
  // event throttling, please note that this property must be changed before any
  // window object resize event callbacks are bound.
  
  jq_resize[ str_throttle ] = true;
  
  // Event: resize event
  // 
  // Fired when an element's width or height changes. Because browsers only
  // provide this event for the window element, for other elements a polling
  // loop is initialized, running every <jQuery.resize.delay> milliseconds
  // to see if elements' dimensions have changed. You may bind with either
  // .resize( fn ) or .bind( "resize", fn ), and unbind with .unbind( "resize" ).
  // 
  // Usage:
  // 
  // > jQuery('selector').bind( 'resize', function(e) {
  // >   // element's width or height has changed!
  // >   ...
  // > });
  // 
  // Additional Notes:
  // 
  // * The polling loop is not created until at least one callback is actually
  //   bound to the 'resize' event, and this single polling loop is shared
  //   across all elements.
  // 
  // Double firing issue in jQuery 1.3.2:
  // 
  // While this plugin works in jQuery 1.3.2, if an element's event callbacks
  // are manually triggered via .trigger( 'resize' ) or .resize() those
  // callbacks may double-fire, due to limitations in the jQuery 1.3.2 special
  // events system. This is not an issue when using jQuery 1.4+.
  // 
  // > // While this works in jQuery 1.4+
  // > $(elem).css({ width: new_w, height: new_h }).resize();
  // > 
  // > // In jQuery 1.3.2, you need to do this:
  // > var elem = $(elem);
  // > elem.css({ width: new_w, height: new_h });
  // > elem.data( 'resize-special-event', { width: elem.width(), height: elem.height() } );
  // > elem.resize();
      
  $.event.special[ str_resize ] = {
    
    // Called only when the first 'resize' event callback is bound per element.
    setup: function() {
      // Since window has its own native 'resize' event, return false so that
      // jQuery will bind the event using DOM methods. Since only 'window'
      // objects have a .setTimeout method, this should be a sufficient test.
      // Unless, of course, we're throttling the 'resize' event for window.
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
      
      var elem = $(this);
      
      // Add this element to the list of internal elements to monitor.
      elems = elems.add( elem );
      
      // Initialize data store on the element.
      $.data( this, str_data, { w: elem.width(), h: elem.height() } );
      
      // If this is the first element added, start the polling loop.
      if ( elems.length === 1 ) {
        loopy();
      }
    },
    
    // Called only when the last 'resize' event callback is unbound per element.
    teardown: function() {
      // Since window has its own native 'resize' event, return false so that
      // jQuery will unbind the event using DOM methods. Since only 'window'
      // objects have a .setTimeout method, this should be a sufficient test.
      // Unless, of course, we're throttling the 'resize' event for window.
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
      
      var elem = $(this);
      
      // Remove this element from the list of internal elements to monitor.
      elems = elems.not( elem );
      
      // Remove any data stored on the element.
      elem.removeData( str_data );
      
      // If this is the last element removed, stop the polling loop.
      if ( !elems.length ) {
        clearTimeout( timeout_id );
      }
    },
    
    // Called every time a 'resize' event callback is bound per element (new in
    // jQuery 1.4).
    add: function( handleObj ) {
      // Since window has its own native 'resize' event, return false so that
      // jQuery doesn't modify the event object. Unless, of course, we're
      // throttling the 'resize' event for window.
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
      
      var old_handler;
      
      // The new_handler function is executed every time the event is triggered.
      // This is used to update the internal element data store with the width
      // and height when the event is triggered manually, to avoid double-firing
      // of the event callback. See the "Double firing issue in jQuery 1.3.2"
      // comments above for more information.
      
      function new_handler( e, w, h ) {
        var elem = $(this),
          data = $.data( this, str_data );
        
        // If called from the polling loop, w and h will be passed in as
        // arguments. If called manually, via .trigger( 'resize' ) or .resize(),
        // those values will need to be computed.
        data.w = w !== undefined ? w : elem.width();
        data.h = h !== undefined ? h : elem.height();
        
        old_handler.apply( this, arguments );
      };
      
      // This may seem a little complicated, but it normalizes the special event
      // .add method between jQuery 1.4/1.4.1 and 1.4.2+
      if ( $.isFunction( handleObj ) ) {
        // 1.4, 1.4.1
        old_handler = handleObj;
        return new_handler;
      } else {
        // 1.4.2+
        old_handler = handleObj.handler;
        handleObj.handler = new_handler;
      }
    }
    
  };
  
  function loopy() {
    
    // Start the polling loop, asynchronously.
    timeout_id = window[ str_setTimeout ](function(){
      
      // Iterate over all elements to which the 'resize' event is bound.
      elems.each(function(){
        var elem = $(this),
          width = elem.width(),
          height = elem.height(),
          data = $.data( this, str_data );
        
        // If element size has changed since the last time, update the element
        // data store and trigger the 'resize' event.
        if ( width !== data.w || height !== data.h ) {
          elem.trigger( str_resize, [ data.w = width, data.h = height ] );
        }
        
      });
      
      // Loop.
      loopy();
      
    }, jq_resize[ str_delay ] );
    
  };
  
}(jQuery,this);

/**
 * Format string
 *  
 * @param  object|array args
 * @return string
 */
String.prototype.format = function(args)
{
    var result = this;
    if (arguments.length > 0)
    {
        var reg;
        if (arguments.length == 1 && typeof(args) == "object")
        {
            for (var key in args)
            {
                if (args[key] != undefined)
                {
                    reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else
        {
            for (var i = 0; i < arguments.length; i++)
            {
                if (arguments[i] != undefined)
                {
                    reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};


/**
 * Judge the string is a integer number
 * 
 * @access public
 * @return bool
 */
String.prototype.isNum = function(s)
{
    if(s!=null)
    {
        var r, re;
        re = /\d*/i;
        r = s.match(re);
        return (r == s) ? true : false;
    }
    return false;
}

/**
 * Format date to a string
 *
 * @param  string   format
 * @return string
 */
Date.prototype.format = function(format)
{
    var date =
    {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format))
    {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date)
    {
        if (new RegExp("(" + k + ")").test(format))
        {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {

  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch(e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }

  var config = $.cookie = function (key, value, options) {

    // Write

    if (value !== undefined && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setTime(+t + days * 864e+5);
      }

      return (document.cookie = [
        encode(key), '=', stringifyCookieValue(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // Read

    var result = key ? undefined : {};

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie().
    var cookies = document.cookie ? document.cookie.split('; ') : [];

    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = parts.join('=');

      if (key && key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      }

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) === undefined) {
      return false;
    }

    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
  };

}));

/* $ComponentName$ */
+function($, window, document, Math)
{
    "use strict";

    $.extend(
    {
        uuid: function()
        {
            var d = (new Date).getTime();
            while(d < 10000000000000000)
            {
               d *= 10;
            }
            return  d + Math.floor(Math.random() * 9999);
        },

        getPropertyCount: function(obj)
        {
           if(typeof(obj) != 'object' || obj == null) return 0;
           return Object.getOwnPropertyNames(obj).length;
        },

        callEvent: function(func, params, proxy)
        {
            if($.isFunction(func))
            {
                if(typeof proxy != 'undefined')
                {
                    func = $.proxy(func, proxy);
                }
                var result = func(params);
                return !(result != undefined && (!result));
            }
            return 1;
        }
    });

    jQuery.fn.selectText = function()
    {
        var doc = document;
        var element = this[0];
        if (doc.body.createTextRange)
        {
            var range = document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (window.getSelection)
        {
            var selection = window.getSelection();        
            var range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };
}(jQuery,window,document,Math);

/* Device */
+function($, window, document, Math)
{
    var desktopLg = 1200,
        desktop   = 992,
        tablet    = 768,
        cssNames  = {desktop: 'screen-desktop', desktopLg: 'screen-desktop-wide', tablet: 'screen-tablet', phone: 'screen-phone', isMobile: 'device-mobile', isDesktop: 'device-desktop'};

    var resetCssClass = function()
    {
        var width = $(window).width();
        $('html').toggleClass(cssNames.desktop, width >= desktop && width < desktopLg)
                 .toggleClass(cssNames.desktopLg, width >= desktopLg)
                 .toggleClass(cssNames.tablet, width >= tablet && width < desktop)
                 .toggleClass(cssNames.phone, width < tablet)
                 .toggleClass(cssNames.isMobile, width < desktop)
                 .toggleClass(cssNames.isDesktop, width >= desktop);
    };

    $(window).resize(resetCssClass);
    resetCssClass();
}(jQuery,window,document,Math);

/* ========================================================================
 * Bootstrap: transition.js v3.0.2
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    // , 'OTransition'      : 'oTransitionEnd otransitionend' // doesn't work in opera11 and disable in opera browsers
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.0.3
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#carousel
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000
  , pause: 'hover'
  , wrap: true
  , touchable: true
  }

  Carousel.prototype.touchable = function()
  {
      if(!this.options.touchable) return;

      this.$element.on('touchstart touchmove touchend', touch);
      // this.$element.on('touchstart touchmove touchend', $.proxy(touch,this));

      // $('.carousel').on('touchstart touchmove touchend',  touch);

      var touchStartX, touchStartY;

      /* listen the touch event */
      function touch(event)
      {
          var event = event || window.event;
          if(event.originalEvent) event = event.originalEvent;
          var carousel = $(this);

          switch(event.type)
          {
              case "touchstart":
                  touchStartX = event.touches[0].pageX;
                  touchStartY = event.touches[0].pageY;
                  break;
              case "touchend":
                  var distanceX = event.changedTouches[0].pageX - touchStartX;
                  var distanceY = event.changedTouches[0].pageY - touchStartY;
                  if(Math.abs(distanceX) > Math.abs(distanceY))
                  {
                      handleCarousel(carousel, distanceX);
                      if(Math.abs(distanceX) > 10)
                      {
                          event.preventDefault();
                      }
                  }
                  else
                  {
                      var $w = $(window);
                      $('body,html').animate({scrollTop:$w.scrollTop() - distanceY},400)
                  }
                  break;
          }
      }

      function handleCarousel(carousel, distance)
      {
          if(distance > 10) carousel.find('.left.carousel-control').click();
          if(distance < -10) carousel.find('.right.carousel-control').click();
      }
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    this.sliding = true

    isCycling && this.pause()

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

    if ($next.hasClass('active')) return

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
        .emulateTransitionEnd(600)
    } else {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()

      if(options.touchable) data.touchable()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    var $el = $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('dropdown')

      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#modals
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
    , position: 'fit' // 'center' or '40px' or '10%'
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      if(that.options.position)
      {
         var dialog = that.$element.find('.modal-dialog');
         var half = Math.max(0, ($(window).height() - dialog.outerHeight())/2);
         var pos = that.options.position == 'fit' ? (half*2/3) : (that.options.position == 'center' ? half : that.options.position);
         dialog.css('margin-top', pos);
      }

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      $(document).on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        if(e.which == 27)
        {
            var et = $.Event('escaping.bs.modal')
            var result = this.$element.triggerHandler(et, 'esc')
            if(result != undefined && (!result)) return
            this.hide()
        }
      }, this))
    } else if (!this.isShown) {
      $(document).off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    if($target.length < 1) return;
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(window.jQuery);

/* Modal Trigger */
+function ($, window, document, Math)
{
    "use strict";

    if (!$.fn.modal) throw new Error('Modal trigger requires modal.js')
    // if (!String.prototype.format) throw new Error('Modal trigger requires string.js')

    var ModalTrigger = function(element, options)
    {
        this.$         = $(element);
        this.options   = this.getOptions(options);

        this.init();
    };

    ModalTrigger.DEFAULTS =
    {
        type:            'ajax',
        width:           null,
        height:          'auto',
        icon:            '*',
        // title:      '',
        name:            'modalIframe',
        fade:             true,
        // cssClass:   null,
        // headerless: null,
        position:        'fit',
        iframeTeamplate: "<div class='icon-spinner icon-spin loader'></div><div class='modal-dialog modal-iframe' style='width: {width};'><div class='modal-content'><div class='modal-header'><button class='close' data-dismiss='modal'>×</button><h4 class='modal-title'><i class='icon-{icon}'></i> {title}</h4></div><div class='modal-body' style='height:{height}'><iframe id='{name}' name='{name}' src='{url}' frameborder='no' allowtransparency='true' scrolling='auto' hidefocus='' style='width: 100%; height: 100%; left: 0px;'></iframe></div></div></div>",
        ajaxTeamplate: "<div class='icon-spinner icon-spin loader'></div><div class='modal-dialog modal-ajax' style='width: {width};'><div class='modal-content'><div class='modal-header'><button class='close' data-dismiss='modal'>×</button><h4 class='modal-title'><i class='icon-{icon}'></i> {title}</h4></div><div class='modal-body' style='height:{height}'></div></div></div>"
    };


    ModalTrigger.prototype.getOptions = function (options)
    {
        options = $.extend({title: this.$.text()}, ModalTrigger.DEFAULTS, this.$.data(), options);
        if(typeof options.height === 'number') options.height += 'px';
        if(typeof options.width === 'number') options.width += 'px';
        if(options.icon == '*')
        {
            var i = this.$.find("[class^='icon-']");
            options.icon = i.length ? i.attr('class').substring(5) : '';
        }
        return options;
    };

    ModalTrigger.prototype.init = function()
    {
        this.initModal();
        this.handleClick();
    };

    ModalTrigger.prototype.handleClick = function()
    {
        var options = this.options;
        var modal   = this.modal;
        this.$.click(function(event)
        {
            var $e   = $(this);
            if($e.attr('disabled') == 'disabled' || $e.hasClass('disabled')) return false;

            options.url  = (options ? options.url : false) || $e.attr('href');
            var cssClass = options.cssClass;

            if(options.size == 'fullscreen')
            {
                var $w = $(window);
                options.width = $w.width();
                options.height = $w.height();
                cssClass += ' fullscreen';
            }
            if(options.headerless)
            {
                cssClass += ' hide-header';
            }
            else if(options.size == 'fullscreen')
            {
                options.height -= modal.find('.modal-header').outerHeight();
            }

            modal.addClass('modal-loading').toggleClass('fade', options.fade);;

            if(options.type === 'custom' && options['custom'])
            {
                options['custom']({modal: modal, options: options, element: $e, ready: function()
                {
                    ajustModalPosition(options.position, modal.find('.modal-dialog'));
                    modal.removeClass('modal-loading');
                }});
            }
            else if(options.type === 'ajax')
            {
                modal.load(options.url, function()
                {
                    setTimeout(function()
                    {
                        var modalBody = modal.find('.modal-body'), dialog = modal.find('.modal-dialog');
                        if(options.width)
                        {
                            dialog.css('width', options.width);
                        }
                        if(options.height != 'auto') modalBody.css('height', options.height);
                        if(options.width) dialog.css('width', options.width);
                        ajustModalPosition(options.position, dialog);
                        modal.removeClass('modal-loading');
                    },200);
                });
            }
            else
            {
                modal.data('first', true);
                modal.html(options.iframeTeamplate.format(options));
                var modalBody = modal.find('.modal-body'), dialog = modal.find('.modal-dialog');
                if(cssClass)
                {
                    dialog.addClass(options.cssClass);
                }
                if(options.width)
                {
                    dialog.css('width', options.width);
                }

                var frame = document.getElementById(options.name);
                frame.onload = frame.onreadystatechange = function()
                {
                    if(!modal.data('first')) modal.addClass('modal-loading');
                    if (this.readyState && this.readyState != 'complete') return;
                    modal.data('first', false);

                    try
                    {
                        var $frame = $(window.frames[options.name].document);

                        if(options.height == 'auto' && options.size != 'fullscreen')
                        {
                            var $framebody = $frame.find('body');
                            setTimeout(function()
                            {
                                modalBody.css('height', $framebody.addClass('body-modal').outerHeight());
                                ajustModalPosition(options.position, dialog);
                                modal.removeClass('modal-loading');
                            }, 100);

                            $framebody.resize(function()
                            {
                                modalBody.css('height', $framebody.outerHeight());
                            });
                        }
                        else
                        {
                            modal.removeClass('modal-loading');
                        }

                        var iframe$ = window.frames[options.name].$;
                        if(iframe$)
                        {
                            iframe$.extend({'closeModal': $.closeModal});
                        }
                    }
                    catch(e){modal.removeClass('modal-loading');}
                }
            }

            modal.modal('show')

            /* Save the href to rel attribute thus we can save it. */
            modal.attr('rel', options.url);
            return false;
        });
    };

    ModalTrigger.prototype.initModal = function()
    {
        var name = 'ajaxModal', setting = this.options;
        var loc  = setting.location;
        if($('#' + name).length)
        {
            /* unbind all events */
            $(name).off('show.bs.modal shown.bs.modal hide.bs.modal hidden.bs.modal');
        }
        else
        {
            /* Addpend modal div. */
            $('<div id="' + name + '" class="modal fade"></div>').appendTo('body');
        }

        var $ajaxModal = $('#' + name);
        this.modal = $ajaxModal.data('options', setting);
        $.extend({'closeModal':function(callback, location)
        {
            location = location || loc;
            $ajaxModal.on('hidden.bs.modal', function()
            {
                if(location)
                {
                    if(location == 'this') window.location.reload();
                    else window.location = location;
                }
                if(callback && $.isFunction(callback)) callback();
            });
            $ajaxModal.modal('hide');
        }});

        /* rebind events */
        if(setting.afterShow && $.isFunction(setting.afterShow)) $ajaxModal.on('show.bs.modal', setting.afterShow);
        if(setting.afterShown && $.isFunction(setting.afterShown)) $ajaxModal.on('shown.bs.modal', setting.afterShown);
        if(setting.afterHide && $.isFunction(setting.afterHide)) $ajaxModal.on('hide.bs.modal', setting.afterHide);
        if(setting.afterHidden && $.isFunction(setting.afterHidden)) $ajaxModal.on('hidden.bs.modal', setting.afterHidden);
    };

    function ajustModalPosition(position, dialog)
    {
        if(position)
        {
           var half = Math.max(0, ($(window).height() - dialog.outerHeight())/2);
           var pos = position == 'fit' ? (half*2/3) : (position == 'center' ? half : position);
           dialog.css('margin-top', pos);
        }
    }

    $.fn.modalTrigger = function(option)
    {
        return this.each(function()
        {
            var $this   = $(this);
            var data    = $this.data('zui.modalTrigger');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.dataTable', (data = new ModalTrigger(this, options)));

            if (typeof option == 'string') data[option]();
        })
    };

    $(function()
    {
        $('[data-toggle="modal"]').each(function(event)
        {
            var $this = $(this);
            var href = $this.attr('href');
            if($this.hasClass('iframe'))
            {
                $this.modalTrigger({type: 'iframe'});
            }
            else
            {
                var target = $this.attr('href') || $this.data('target');
                try
                {
                  if(!$(target).length) $this.modalTrigger();
                }
                catch(e){$this.modalTrigger();}
            }
        });

    });

}(window.jQuery, window, document, Math);

/* ========================================================================
 * Bootstrap: tooltip.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#popovers
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var target = this.getTarget()

    if(target)
    {
      if(target.find('.arrow').length < 1)
        $tip.addClass('no-arrow')
      $tip.html(target.html())
      return
    }

    
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTarget() || this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.getTarget = function () {
    var $e = this.$element
    var o  = this.options

    var target = $e.attr('data-target')
      || (typeof o.target == 'function' ?
            o.target.call($e[0]) :
            o.target)
    return (target && true) ? ( target == '$next' ? $e.next('.popover') : $(target)) : false
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);

+function ($) { "user strict";

  var Pager = function (element, options)
  {
    this.init('pager', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')
  if (!$.fn.popover) throw new Error('Popover requires popover.js')

  Pager.prototype.init = function (type, element, options)
  {
      this.type     = type
      this.$element = $(element)
      this.options  = options

      this.computeIndex()
      this.$element
        .popover({container: 'body',trigger: 'manual',html:true,
        template: '<div class="popover pager-popover"><div class="arrow"></div><div class="popover-content"></div></div>'})
        .on('click.'+this.type, false,$.proxy(this.showPopover,this))
  }


  Pager.prototype.hidePopover = function()
  {
      var self = this.$element
      if(self.attr('data-safe-close') == 'true')
      {
          self.popover('hide').attr('data-safe-close',false)
          $(document).unbind('click',this.hidePopover)
      }
      else
      {
          self.attr('data-safe-close',true)
      }
  }

  Pager.prototype.showPopover = function()
  {
      var self = this.$element

      if(!(self.attr('data-content')))
      {
        self.attr('data-content',"<ul class='pager'>"+this.setContent(this.getUrl())+"</ul>")
      }
      self.popover('show')

      $(document).bind('click',$.proxy(this.hidePopover,this))
  }

  Pager.prototype.setContent = function (url)
  {
      var html = ''
      if(this.isRangeIndex)
      {
          for (var i = this.indexStart; i <= this.indexEnd; i++) 
          {
            html += "<li><a href='"+url.replace('%',i)+"'>"+i+"</a></li>"
          }
      }
      else
      {
          for (var i = this.indexs.length - 1; i >= 0; i--)
          {
            var index = this.indexs[i];
            html += "<li><a href='"+url.replace('%',index)+"'>"+index+"</a></li>"
          }
      }
      return html;
  }

  Pager.prototype.getUrl = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-url') || $e.attr('href')
      || (typeof o.url == 'function' ?
            o.url.call($e[0]) :
            o.url) || "?page=%"
  }

  Pager.prototype.computeIndex = function ()
  {
    var $e = this.$element
    var eLi = $e.closest('li')
    var o  = this.options

    var params = $e.attr('data-index')
      || (typeof o.index == 'function' ?
            o.index.call($e[0]) :
            o.index)
      || ((eLi.prev('li').find('a').text() - 0 + 1) + '-' + (eLi.next('li').find('a').text() - 1))

    if(params.indexOf('-')>0)
    {
      this.isRangeIndex = true;
      var ranges = params.split('-')
      this.indexStart = ranges[0] - 0;
      this.indexEnd = ranges[1] - 0;
      this.indexCount = this.indexEnd - this.indexStart
    }
    else
    {
      this.indexs = params.split(',')
      this.indexCount = this.indexs.length
    }
  }

  // PAGER PLUGIN DEFINITION
  // =========================

  var old = $.fn.pager

  $.fn.pager = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.pager')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.pager', (data = new Pager(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.pager.Constructor = Pager


  // pager NO CONFLICT
  // ===================

  $.fn.pager.noConflict = function () {
    $.fn.pager = old
    return this
  }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tabs
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab'
      , relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);

/**
 * 图片头数据加载就绪事件 - 更快获取图片尺寸
 * @version 2011.05.27
 * @author  TangBin
 * @see   http://www.planeart.cn/?p=1121
 * @param {String}  图片路径
 * @param {Function}  尺寸就绪
 * @param {Function}  加载完毕 (可选)
 * @param {Function}  加载错误 (可选)
 * @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
    alert('size ready: width=' + this.width + '; height=' + this.height);
  });
 */
var imgReady = (function () {
  var list = [], intervalId = null,

  // 用来执行队列
  tick = function () {
    var i = 0;
    for (; i < list.length; i++) {
      list[i].end ? list.splice(i--, 1) : list[i]();
    };
    !list.length && stop();
  },

  // 停止所有定时器队列
  stop = function () {
    clearInterval(intervalId);
    intervalId = null;
  };

  return function (url, ready, load, error) {
    var onready, width, height, newWidth, newHeight,
      img = new Image();
    
    img.src = url;

    // 如果图片被缓存，则直接返回缓存数据
    if (img.complete) {
      ready.call(img);
      load && load.call(img);
      return;
    };
    
    width = img.width;
    height = img.height;
    
    // 加载错误后的事件
    img.onerror = function () {
      error && error.call(img);
      onready.end = true;
      img = img.onload = img.onerror = null;
    };
    
    // 图片尺寸就绪
    onready = function () {
      newWidth = img.width;
      newHeight = img.height;
      if (newWidth !== width || newHeight !== height ||
        // 如果图片已经在其他地方加载可使用面积检测
        newWidth * newHeight > 1024
      ) {
        ready.call(img);
        onready.end = true;
      };
    };
    onready();
    
    // 完全加载完毕的事件
    img.onload = function () {
      // onload在定时器时间差范围内可能比onready快
      // 这里进行检查并保证onready优先执行
      !onready.end && onready();
    
      load && load.call(img);
      
      // IE gif动画会循环执行onload，置空onload即可
      img = img.onload = img.onerror = null;
    };

    // 加入队列中定期执行
    if (!onready.end) {
      list.push(onready);
      // 无论何时只允许出现一个定时器，减少浏览器性能损耗
      if (intervalId === null) intervalId = setInterval(tick, 40);
    };
  };
})();

/* Lightbox */
+function($, window, document, Math)
{
    "use strict";

    if (!$.fn.modalTrigger) throw new Error('modal & modalTrigger requires for lightbox');
    if (!imgReady) throw new Error('imgReady requires for lightbox');

    var Lightbox = function(element, options)
    {
        this.$         = $(element);
        this.options   = this.getOptions(options);

        this.init();
    };

    Lightbox.DEFAULTS =
    {
        modalTeamplate: '<div class="icon-spinner icon-spin loader"></div><div class="modal-dialog"><button class="close" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i></button><button class="controller prev"><i class="icon icon-chevron-left"></i></button><button class="controller next"><i class="icon icon-chevron-right"></i></button><img class="lightbox-img" src="{image}" alt="" data-dismiss="modal" /><div class="caption"><div class="content">{caption}<div></div></div>'
    }; // default options

    Lightbox.prototype.getOptions = function (options)
    {
        options = $.extend({}, Lightbox.DEFAULTS, this.$.data(), options);
        if(!options['image'])
        {
            options['image'] = this.$.attr('src') || this.$.attr('href')
                || this.$.find('img').attr('src');
            this.$.data('image', options['image']);
        }
        return options;
    };

    Lightbox.prototype.init = function()
    {
        this.bindEvents();
    }

    Lightbox.prototype.initGroups = function()
    {
        var groups = this.$.data('groups');
        if(!groups)
        {
            groups = $('[data-toggle="lightbox"][data-group="' + this.options.group + '"], [data-lightbox-group="' + this.options.group + '"]');
            this.$.data('groups', groups);
            groups.each(function(index)
            {
                $(this).attr('data-group-index', index);
            });
        }
        this.groups = groups;
        this.groupIndex = parseInt(this.$.data('group-index'));
    }

    Lightbox.prototype.bindEvents = function()
    {
        var $e = this.$, that = this;
        var options = this.options;
        if(!options.image) return false;
        $e.modalTrigger(
        {
            type: 'custom',
            name: 'lightboxModal',
            position: 'center',
            custom: function(e)
            {
                that.initGroups();
                var modal = e.modal,
                    groups = that.groups,
                    groupIndex = that.groupIndex;

                modal.addClass('modal-lightbox')
                     .html(options.modalTeamplate.format(options))
                     .toggleClass('lightbox-with-caption', typeof options.caption == 'string')
                     .removeClass('lightbox-full')
                     .data('group-index', groupIndex);
                var dialog = modal.find('.modal-dialog'),
                    winWidth = $(window).width();
                imgReady(options.image, function()
                {
                    dialog.css({width: Math.min(winWidth, this.width)});
                    if(winWidth < (this.width + 30)) modal.addClass('lightbox-full');
                    e.ready();
                });

                modal.find('.prev').toggleClass('show', groups.filter('[data-group-index="' + (groupIndex - 1) + '"]').length > 0);
                modal.find('.next').toggleClass('show', groups.filter('[data-group-index="' + (groupIndex + 1) + '"]').length > 0);

                modal.find('.controller').click(function()
                {
                    var $this = $(this);
                    var id = modal.data('group-index') + ($this.hasClass('prev') ? -1 : 1);
                    var $e = groups.filter('[data-group-index="' + id + '"]');
                    if($e.length)
                    {
                        var image = $e.data('image'),
                            caption = $e.data('caption');
                        modal.addClass('modal-loading')
                             .data('group-index', id)
                             .toggleClass('lightbox-with-caption', typeof caption == 'string')
                             .removeClass('lightbox-full');
                        modal.find('.lightbox-img').attr('src', image);
                        winWidth = $(window).width();
                        imgReady(image, function()
                        {
                            dialog.css({width: Math.min(winWidth, this.width)});
                            if(winWidth < (this.width + 30)) modal.addClass('lightbox-full');
                            e.ready();
                        });
                    }
                    modal.find('.prev').toggleClass('show', groups.filter('[data-group-index="' + (id - 1) + '"]').length > 0);
                    modal.find('.next').toggleClass('show', groups.filter('[data-group-index="' + (id + 1) + '"]').length > 0);
                    return false;
                });
            }
        });
    }

    $.fn.lightbox = function(option)
    {
        var defaultGroup = 'group' + (new Date()).getTime();
        return this.each(function()
        {
            var $this   = $(this);

            var options = typeof option == 'object' && option;
            if(typeof options == 'object' && options.group)
            {
                $this.attr('data-lightbox-group', options.group);
            }
            else if($this.data('group'))
            {
                $this.attr('data-lightbox-group', $this.data('group'));
            }
            else
            {
                $this.attr('data-lightbox-group', defaultGroup);
            }
            $this.data('group', $this.data('lightbox-group'));

            var data    = $this.data('zui.lightbox');
            if (!data) $this.data('zui.lightbox', (data = new Lightbox(this, options)));

            if (typeof option == 'string') data[option]();
        })
    };

    $.fn.lightbox.Constructor = Lightbox;

    $(function()
    {
        $('[data-toggle="lightbox"]').lightbox();
    });
}(jQuery,window,document,Math);

/* Draggable */
+function($, window, document, Math)
{
    "use strict";

    var Draggable = function(element, options)
    {
        this.$         = $(element);
        this.options   = this.getOptions(options);

        this.init();
    };

    Draggable.DEFAULTS = {container: 'body', move: true};

    Draggable.prototype.getOptions = function (options)
    {
        options = $.extend({}, Draggable.DEFAULTS, this.$.data(), options);
        return options;
    };

    Draggable.prototype.init = function()
    {
        this.handleMouseEvents();
    }

    Draggable.prototype.handleMouseEvents = function()
    {
        var $e      = this.$,
            setting = this.options;

        $e.mousedown(function(event)
        {
            if(setting.hasOwnProperty('before') && $.isFunction(setting['before']))
            {
                var isSure = setting['before']({event: event, element: $e});
                if (isSure != undefined && (!isSure)) return;
            }

            var $container = $(setting.container),
                pos = $e.offset();
            var cPos = $container.offset(),
                startPos = {x: event.pageX, y: event.pageY},
                startOffset = {x: event.pageX - pos.left + cPos.left, y: event.pageY - pos.top + cPos.top};
            var mousePos = $.extend({}, startPos);
            var moved = false;

            $e.addClass('drag-ready');
            $(document).bind('mousemove',mouseMove).bind('mouseup',mouseUp);
            event.preventDefault();
            if(setting.stopPropagation) {event.stopPropagation();}

            function mouseMove(event)
            {
                moved = true;
                var mX = event.pageX,
                    mY = event.pageY;
                var dragPos = {left: mX-startOffset.x, top: mY-startOffset.y};
                    
                $e.removeClass('drag-ready').addClass('dragging');
                if(setting.move)
                {
                    $e.css(dragPos);
                }
                
                if(setting.hasOwnProperty('drag') && $.isFunction(setting['drag']))
                {
                    setting['drag']({event: event, element: $e, startOffset: startOffset, pos: dragPos, offset: {x: mX - startPos.x, y: mY - startPos.y}, smallOffset: {x: mX - mousePos.x, y: mY - mousePos.y}});
                }
                mousePos.x = mX;
                mousePos.y = mY;

                if(setting.stopPropagation) {event.stopPropagation();}
            }

            function mouseUp(event)
            {
                $(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
                if(!moved)
                {
                    $e.removeClass('drag-ready');
                    return;
                }
                var endPos = {left: event.pageX - startOffset.x, top: event.pageY - startOffset.y};
                $e.removeClass('drag-ready').removeClass('dragging');
                if(setting.move)
                {
                    $e.css(endPos);
                }

                if(setting.hasOwnProperty('finish') && $.isFunction(setting['finish']))
                {
                    setting['finish']({event: event, element: $e, pos: endPos, offset: {x: event.pageX - startPos.x, y: event.pageY - startPos.y}, smallOffset: {x: event.pageX - mousePos.x, y: event.pageY - mousePos.y}});
                }
                event.preventDefault();
                if(setting.stopPropagation) {event.stopPropagation();}
            }
        });
    }

    $.fn.draggable = function(option)
    {
        return this.each(function()
        {
            var $this   = $(this);
            var data    = $this.data('zui.draggable');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.draggable', (data = new Draggable(this, options)));

            if (typeof option == 'string') data[option]();
        })
    };

    $.fn.draggable.Constructor = Draggable;
}(jQuery,window,document,Math);

/* Droppable */
+function($, window, document, Math)
{
    "use strict";

    var Droppable = function(element, options)
    {
        this.$         = $(element);
        this.options   = this.getOptions(options);

        this.init();
    };

    Droppable.DEFAULTS = {container: 'body', flex: false, deviation: 5, sensorOffsetX: 0, sensorOffsetY: 0, nested: false};

    Droppable.prototype.getOptions = function (options)
    {
        options = $.extend({}, Droppable.DEFAULTS, this.$.data(), options);
        return options;
    };

    Droppable.prototype.callEvent = function(name, params)
    {
        return $.callEvent(this.options[name], params, this);
    }

    Droppable.prototype.init = function()
    {
        this.handleMouseEvents();
    }

    Droppable.prototype.handleMouseEvents = function()
    {
        var $e      = this.$,
            self    = this,
            setting = this.options;

        this.$triggerTarget = (setting.trigger ? ($.isFunction(setting.trigger) ? setting.trigger($e) : $e.find(setting.trigger)).first() : $e);

        this.$triggerTarget.on('mousedown', function(event)
        {
            if(setting.hasOwnProperty('before') && $.isFunction(setting['before']))
            {
                var isSure = setting['before']({event: event, element: $e});
                if (isSure != undefined && (!isSure)) return;
            }

            var $targets         = $.isFunction(setting.target) ? setting.target($e): $(setting.target),
                target           = null,
                shadow           = null,
                $container       = $(setting.container).first(),
                isIn             = false,
                isSelf           = true,
                oldCssPosition,
                startOffset      = $e.offset(),
                startMouseOffset = {left: event.pageX, top: event.pageY};
            var containerOffset  = $container.offset();
            var startPosition    = {left: startOffset.left - containerOffset.left, top: startOffset.top - containerOffset.top};
            var clickOffset      = {left: startMouseOffset.left - startOffset.left, top: startMouseOffset.top - startOffset.top};
            var lastMouseOffset  = {left: startMouseOffset.left, top: startMouseOffset.top};

            $e.addClass('drag-from');
            $(document).bind('mousemove',mouseMove).bind('mouseup',mouseUp);
            event.preventDefault();

            function mouseMove(event)
            {
                var mouseOffset = {left: event.pageX, top: event.pageY};

                // ignore small move
                if(Math.abs(mouseOffset.left - startMouseOffset.left) < setting.deviation && Math.abs(mouseOffset.top - startMouseOffset.top) < setting.deviation ) return;

                if(shadow == null) // create shadow
                {
                    var cssPosition = $container.css('position');
                    if(cssPosition != 'absolute' && cssPosition != 'relative' && cssPosition != 'fixed')
                    {
                        oldCssPosition = cssPosition;
                        $container.css('position', 'relative');
                    }

                    shadow = $e.clone().removeClass('drag-from').addClass('drag-shadow').css(
                    {
                        position: 'absolute',
                        width: $e.outerWidth(),
                        transition: 'none'
                    }).appendTo($container);
                    $e.addClass('dragging');

                    self.callEvent('start', {event: event, element: $e});
                }

                var offset = {left: mouseOffset.left - clickOffset.left, top: mouseOffset.top - clickOffset.top};
                var position = {left: offset.left - containerOffset.left, top: offset.top - containerOffset.top};
                shadow.css(position);
                var moveOffset = {left: mouseOffset.left - lastMouseOffset.left, top: mouseOffset.top - lastMouseOffset.top};
                lastMouseOffset.left = mouseOffset.left;
                lastMouseOffset.top = mouseOffset.top;

                var isNew = false; isIn = false;

                if(!setting.flex)
                {
                    $targets.removeClass('drop-to');
                }

                var newTarget = null;
                $targets.each(function(index)
                {
                    var t = $(this);
                    var tPos = t.offset();
                    var tW = t.width(),
                        tH = t.height(),
                        tX = tPos.left + setting.sensorOffsetX,
                        tY = tPos.top + setting.sensorOffsetY;

                    if(mouseOffset.left > tX && mouseOffset.top > tY && mouseOffset.left < (tX + tW) && mouseOffset.top < (tY + tH))
                    {
                        if(newTarget) newTarget.removeClass('drop-to');
                        newTarget = t;
                        if(!setting.nested) return false;
                    }
                });

                if(newTarget)
                {
                    isIn = true;
                    var id = newTarget.data('id');
                    if($e.data('id') != id) isSelf = false;
                    if(target == null || (target.data('id') != id && (!isSelf))) isNew = true;
                    target = newTarget;
                    if(setting.flex)
                    {
                        $targets.removeClass('drop-to');
                    }
                    target.addClass('drop-to');
                }

                if(!setting.flex)
                {
                    $e.toggleClass('drop-in', isIn);
                    shadow.toggleClass('drop-in', isIn);
                }
                else if(target != null && target.length)
                {
                    isIn = true;
                }

                self.callEvent('drag',
                {
                    event: event,
                    isIn: isIn,
                    target: target,
                    element: $e,
                    isNew: isNew,
                    selfTarget: isSelf,
                    clickOffset: clickOffset,
                    offset: offset,
                    position: {left: offset.left - containerOffset.left, top: offset.top - containerOffset.top},
                    mouseOffset: mouseOffset
                });
            }

            function mouseUp(event)
            {
                if(oldCssPosition)
                {
                    $container.css('position', oldCssPosition);
                }

                if(shadow == null)
                {
                    $e.removeClass('drag-from');
                    $(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
                    return;
                }

                if(!isIn) target = null;
                var isSure = true,
                    mouseOffset = {left: event.pageX, top: event.pageY};
                var offset = {left: mouseOffset.left - clickOffset.left, top: mouseOffset.top - clickOffset.top};
                var moveOffset = {left: mouseOffset.left - lastMouseOffset.left, top: mouseOffset.top - lastMouseOffset.top};
                lastMouseOffset.left = mouseOffset.left;
                lastMouseOffset.top = mouseOffset.top;
                var eventOptions =
                {
                    event: event,
                    isIn: isIn,
                    target: target,
                    element: $e,
                    isNew: (!isSelf) && target != null,
                    selfTarget: isSelf,
                    offset: offset,
                    mouseOffset: mouseOffset,
                    position: {left: offset.left - containerOffset.left, top: offset.top - containerOffset.top},
                    lastMouseOffset: lastMouseOffset,
                    moveOffset: moveOffset
                };

                isSure = self.callEvent('beforeDrop',eventOptions);

                if(isSure && isIn)
                {
                    self.callEvent('drop', eventOptions);
                }

                $(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
                $targets.removeClass('drop-to');
                $e.removeClass('dragging').removeClass('drag-from');
                shadow.remove();

                self.callEvent('finish', eventOptions);

                event.preventDefault();
            }
        });

    };

    Droppable.prototype.reset = function()
    {
        this.$triggerTarget.off('mousedown');
        this.handleMouseEvents();
    };

    $.fn.droppable = function(option)
    {
        return this.each(function()
        {
            var $this   = $(this);
            var data    = $this.data('zui.droppable');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.droppable', (data = new Droppable(this, options)));

            if (typeof option == 'string') data[option]();
        })
    };

    $.fn.droppable.Constructor = Droppable;
}(jQuery,window,document,Math);

/* Sortable */
+function($, window, document, Math)
{
    "use strict";

    var Sortable = function(element, options)
    {
        this.$         = $(element);
        this.options   = this.getOptions(options);

        this.init();
    };

    Sortable.DEFAULTS = {list: 'li, div', dragCssClass: 'invisible'}; // default options

    Sortable.prototype.getOptions = function (options)
    {
        options = $.extend({}, Sortable.DEFAULTS, this.$.data(), options);
        return options;
    };

    Sortable.prototype.init = function()
    {
        this.bindEventToList(this.$.children(this.options.selector));
    };

    Sortable.prototype.reset = function()
    {
        var that = this, order = 0;
        var list = this.$.children(this.options.selector);
        list.each(function()
        {
            var $this = $(this);
            if($this.data('zui.droppable'))
            {
                $this.data('zui.droppable').options.target = list;
                $this.droppable('reset');
            }
            else
            {
                that.bindEventToList($this);
            }
            $(this).attr('data-order', ++order);
        });
    };

    Sortable.prototype.bindEventToList = function($list)
    {
        var self = this.$,
            options = this.options;

        markOrders($list);
        $list.droppable(
        {
            trigger: options.trigger,
            target: self.children(options.selector),
            container: self,
            flex: true,
            start: function(e)
            {
                if(options.dragCssClass) e.element.addClass(options.dragCssClass);
            },
            drag: function(e)
            {
                if(e.isIn)
                {
                    var $ele = e.element, $target = e.target;
                    var eleOrder = $ele.attr('data-order'), targetOrder = $target.attr('data-order');
                    if(eleOrder == targetOrder) return;
                    else if(eleOrder > targetOrder)
                    {
                        $target.before($ele);
                    }
                    else
                    {
                        $target.after($ele);
                    }
                    var list = self.children(options.selector);
                    markOrders(list);
                    $.callEvent(options['order'], {list: list, element: $ele});
                }
            },
            finish: function(e)
            {
                if(options.dragCssClass) e.element.removeClass(options.dragCssClass);
                $.callEvent(options['finish'], {list: self.children(options.selector), element: e.element});
            }
        });

        function markOrders(list)
        {
            var order = 0;
            list.each(function()
            {
                $(this).attr('data-order', ++order);
            });
        }
    };

    $.fn.sortable = function(option)
    {
        return this.each(function()
        {
            var $this   = $(this);
            var data    = $this.data('zui.sortable');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.sortable', (data = new Sortable(this, options)));
            else if(typeof option == 'object') data.reset();

            if (typeof option == 'string') data[option]();
        })
    };

    $.fn.sortable.Constructor = Sortable;
}(jQuery,window,document,Math);

/* Dashboard */
+function($, window, document, Math)
{
    "use strict";

    var Dashboard = function(element, options)
    {
        this.$         = $(element);
        this.options   = this.getOptions(options);
        this.draggable = this.$.hasClass('dashboard-draggable') || this.options.draggable;

        this.init();
    };

    Dashboard.DEFAULTS = {height: 360};

    Dashboard.prototype.getOptions = function (options)
    {
        options = $.extend({}, Dashboard.DEFAULTS, this.$.data(), options);
        return options;
    };

    Dashboard.prototype.handleRemoveEvent = function()
    {
        var afterPanelRemoved = this.options.afterPanelRemoved;
        var tip = this.options.panelRemovingTip;
        this.$.find('.remove-panel').click(function()
        {
            var panel = $(this).closest('.panel');
            var name  = panel.data('name') || panel.find('.panel-heading').text().replace('\n', '').replace(/(^\s*)|(\s*$)/g, "");
            var index = panel.attr('data-id');

            if(tip == undefined || confirm(tip.format(name)))
            {
                panel.parent().remove();
                if(afterPanelRemoved && $.isFunction(afterPanelRemoved))
                {
                    afterPanelRemoved(index);
                }
            }
        });
    };

    Dashboard.prototype.handleRefreshEvent = function()
    {
        this.$.find('.refresh-panel').click(function()
        {
            var panel = $(this).closest('.panel');
            refreshPanel(panel);
        });
    }

    Dashboard.prototype.handleDraggable = function()
    {
        var dashboard    = this.$;
        var afterOrdered = this.options.afterOrdered;

        this.$.addClass('dashboard-draggable');

        this.$.find('.panel-actions').mousedown(function(event)
        {
            event.preventDefault();
            event.stopPropagation();
        });

        this.$.find('.panel-heading').mousedown(function(event)
        {
            var panel     = $(this).closest('.panel');
            var pCol      = panel.parent();
            var row       = panel.closest('.row');
            var dPanel    = panel.clone().addClass('panel-dragging-shadow');
            var pos       = panel.offset();
            var dPos      = dashboard.offset();
            var dColShadow = row.find('.dragging-col-holder');
            if(!dColShadow.length)
            {
                dColShadow = $("<div class='dragging-col-holder'><div class='panel'></div></div>").addClass(row.children().attr('class')).removeClass('dragging-col').appendTo(row);
            }

            dColShadow.insertBefore(pCol).find('.panel').replaceWith(panel.clone().addClass('panel-dragging panel-dragging-holder'));

            dashboard.addClass('dashboard-dragging');
            panel.addClass('panel-dragging').parent().addClass('dragging-col');

            dPanel.css(
            {
                left    : pos.left - dPos.left,
                top     : pos.top - dPos.top,
                width   : panel.width(),
                height  : panel.height()
            }).appendTo(dashboard).data('mouseOffset', {x: event.pageX - pos.left + dPos.left, y: event.pageY - pos.top + dPos.top});

            $(document).bind('mousemove',mouseMove).bind('mouseup',mouseUp);
            event.preventDefault();

            function mouseMove(event)
            {
                var offset = dPanel.data('mouseOffset');
                dPanel.css(
                {
                    left : event.pageX-offset.x,
                    top  : event.pageY-offset.y
                });

                row.find('.dragging-in').removeClass('dragging-in');
                var before = false;
                row.children().each(function()
                {
                    var col = $(this);
                    if(col.hasClass('dragging-col-holder')) {before = true; return true;}
                    var p = col.children('.panel');
                    var pP = p.offset(), pW = p.width(), pH = p.height();
                    var pX = pP.left, pY = pP.top;
                    var mX = event.pageX, mY = event.pageY;

                    if(mX > pX && mY > pY && mX < (pX + pW) && mY < (pY + pH))
                    {
                        var dCol = row.find('.dragging-col');
                        col.addClass('dragging-in')
                        if(before) dColShadow.insertAfter(col);
                        else dColShadow.insertBefore(col);
                        dashboard.addClass('dashboard-holding');
                        return false;
                    }
                });
                event.preventDefault();
            }

            function mouseUp(event)
            {
                var oldOrder = panel.data('order');
                panel.parent().insertAfter(dColShadow);
                var newOrder = 0;
                var newOrders = {};

                row.children(':not(.dragging-col-holder)').each(function(index)
                {
                    var p = $(this).children('.panel');
                    p.data('order', ++newOrder);
                    newOrders[p.attr('id')] = newOrder;
                    p.parent().attr('data-order', newOrder);
                });

                if(oldOrder != newOrders[panel.attr('id')])
                {
                    row.data('orders', newOrders);

                    if(afterOrdered && $.isFunction(afterOrdered))
                    {
                        afterOrdered(newOrders);
                    }
                }

                dPanel.remove();

                dashboard.removeClass('dashboard-holding');
                dashboard.find('.dragging-col').removeClass('dragging-col');
                dashboard.find('.panel-dragging').removeClass('panel-dragging');
                row.find('.dragging-in').removeClass('dragging-in');
                dashboard.removeClass('dashboard-dragging');
                $(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
                event.preventDefault();
            }
        });
    };

    Dashboard.prototype.handlePanelPadding = function()
    {
        this.$.find('.panel-body > table, .panel-body > .list-group').closest('.panel-body').addClass('no-padding');
    };

    Dashboard.prototype.handlePanelHeight = function()
    {
        var dHeight = this.options.height;

        this.$.find('.row').each(function()
        {
            var row = $(this);
            var panels = row.find('.panel');
            var height = row.data('height') || dHeight;

            if(typeof height != 'number')
            {
                height = 0;
                panels.each(function()
                {
                    height = Math.max(height, $(this).innerHeight());
                });
            }

            panels.each(function()
            {
                var $this = $(this);
                $this.find('.panel-body').css('height', height - $this.find('.panel-heading').outerHeight() - 2);
            });
        });
    };

    function refreshPanel(panel)
    {
        var url = panel.data('url');
        if(!url) return;
        panel.addClass('panel-loading').find('.panel-heading .icon-refresh,.panel-heading .icon-repeat').addClass('icon-spin');
        $.ajax(
        {
            url: url,
            dataType: 'html',
        })
        .done(function(data)
        {
            panel.find('.panel-body').html(data);
        })
        .fail(function()
        {
            panel.addClass('panel-error');
        })
        .always(function()
        {
            panel.removeClass('panel-loading');
            panel.find('.panel-heading .icon-refresh,.panel-heading .icon-repeat').removeClass('icon-spin');
        });
    }

    Dashboard.prototype.init = function()
    {
        this.handlePanelHeight();
        this.handlePanelPadding();
        this.handleRemoveEvent();
        this.handleRefreshEvent();

        if(this.draggable) this.handleDraggable();

        var orderSeed = 0;
        this.$.find('.panel').each(function()
        {
            var $this = $(this);
            $this.data('order', ++orderSeed);
            if(!$this.attr('id'))
            {
                $this.attr('id', 'panel' + orderSeed);
            }
            if(!$this.attr('data-id'))
            {
                $this.attr('data-id', orderSeed);
            }

            refreshPanel($this);
        });
    }

    $.fn.dashboard = function(option)
    {
        return this.each(function()
        {
            var $this   = $(this);
            var data    = $this.data('zui.dashboard');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.dashboard', (data = new Dashboard(this, options)));

            if (typeof option == 'string') data[option]();
        })
    };

    $.fn.dashboard.Constructor = Dashboard;
}(jQuery,window,document,Math);

/* Menu */
+function($, window, document, Math)
{
    "use strict";

    var Menu = function(element, options)
    {
        this.$         = $(element);
        this.options   = this.getOptions(options);

        this.init();
    };

    Menu.DEFAULTS = {auto: false, foldicon: 'icon-chevron-right'};

    Menu.prototype.getOptions = function (options)
    {
        options = $.extend({}, Menu.DEFAULTS, this.$.data(), options);
        return options;
    };

    Menu.prototype.init = function()
    {
        var children = this.$.children('.nav');
        children.find('.nav').closest('li').addClass('nav-parent');
        children.find('.nav > li.active').closest('li').addClass('active');
        children.find('.nav-parent > a').append('<i class="' + this.options.foldicon + ' nav-parent-fold-icon"></i>');

        this.handleFold();
    }

    Menu.prototype.handleFold = function()
    {
        var auto = this.options.auto;
        var $menu = this.$;

        this.$.find('.nav-parent > a').click(function(event)
        {
            if(auto)
            {
                $menu.find('.nav-parent.show').find('.nav').slideUp(function(){$(this).closest('.nav-parent').removeClass('show')});
                $menu.find('.icon-rotate-90').removeClass('icon-rotate-90');
            }

            var li = $(this).closest('.nav-parent');;
            if(li.hasClass('show'))
            {
                li.find('.icon-rotate-90').removeClass('icon-rotate-90');
                li.find('.nav').slideUp(function(){$(this).closest('.nav-parent').removeClass('show')});
            }
            else
            {
                li.find('.nav-parent-fold-icon').addClass('icon-rotate-90');
                li.find('.nav').slideDown(function(){$(this).closest('.nav-parent').addClass('show')});
            }

            event.preventDefault();
            return false;
        });
    }

    $.fn.menu = function(option)
    {
        return this.each(function()
        {
            var $this   = $(this);
            var data    = $this.data('zui.menu');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.menu', (data = new Menu(this, options)));

            if (typeof option == 'string') data[option]();
        })
    };

    $.fn.menu.Constructor = Menu;

    $(function()
    {
        $('[data-toggle="menu"]').menu();
    });
}(jQuery,window,document,Math);

/* DataTable */
+function($, window, document, Math)
{
    "use strict";

    var DataTable = function(element, options)
    {
        this.$         = $(element);
        this.options   = this.getOptions(options);

        this.init();
    };

    DataTable.DEFAULTS = {};

    DataTable.prototype.getOptions = function (options)
    {
        options = $.extend({}, DataTable.DEFAULTS, this.$.data(), options);
        return options;
    };

    DataTable.prototype.init = function()
    {
        this.handleRowClickable();
    }

    DataTable.prototype.handleRowClickable = function()
    {
        var $dataTable = this.$;

        this.$.find('tr[data-url]:not(".app-btn") td:not(".actions")').click(function(event)
        {
            if($(event.target).is('a, .caret')) return;

            var url = $(this).closest('tr').data('url');
            if(url)
            {
                window.location = url;
            }
        });
    }

    $.fn.dataTable = function(option)
    {
        return this.each(function()
        {
            var $this   = $(this);
            var data    = $this.data('zui.dataTable');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.dataTable', (data = new DataTable(this, options)));

            if (typeof option == 'string') data[option]();
        })
    };

    $.fn.dataTable.Constructor = DataTable;

    $(function()
    {
        $('table.table-data').dataTable();
    });
}(jQuery,window,document,Math);

/**
 * bootbox.js [master branch]
 *
 * http://bootboxjs.com/license.txt
 */

// @see https://github.com/makeusabrew/bootbox/issues/180
// @see https://github.com/makeusabrew/bootbox/issues/186
(function (root, factory) {

  "use strict";
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    // Browser globals (root is window)
    root.bootbox = factory(root.jQuery);
  }

}(this, function init($, undefined) {

  "use strict";

  // the base DOM structure needed to create a modal
  var templates = {
    dialog:
      "<div class='bootbox modal' tabindex='-1' role='dialog'>" +
        "<div class='modal-dialog'>" +
          "<div class='modal-content'>" +
            "<div class='modal-body'><div class='bootbox-body'></div></div>" +
          "</div>" +
        "</div>" +
      "</div>",
    header:
      "<div class='modal-header'>" +
        "<h4 class='modal-title'></h4>" +
      "</div>",
    footer:
      "<div class='modal-footer'></div>",
    closeButton:
      "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
    form:
      "<form class='bootbox-form'></form>",
    inputs: {
      text:
        "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
      textarea:
        "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
      email:
        "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
      select:
        "<select class='bootbox-input bootbox-input-select form-control'></select>",
      checkbox:
        "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
      date:
        "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
      time:
        "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
      number:
        "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
      password:
        "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
    }
  };

  var defaults = {
    // default language
    locale: judgeClientLang(),
    // show backdrop or not
    backdrop: true,
    // animate the modal in/out
    animate: true,
    // additional class string applied to the top level dialog
    className: null,
    // whether or not to include a close button
    closeButton: true,
    // show the dialog immediately by default
    show: true,
    // dialog container
    container: "body"
  };

  // our public object; augmented after our private API
  var exports = {};

  function judgeClientLang()
  {
     var lang;
     if(typeof(config) != 'undefined' && config.clientLang)
     {
         lang = config.clientLang;
     }
     else
     {
         var hl = $('html').attr('lang');
         lang = hl? hl : 'en';
     }
     return lang.replace('-', '_').toLowerCase();
  }

  /**
   * @private
   */
  function _t(key) {
    var locale = locales[defaults.locale];
    return locale ? locale[key] : locales.en[key];
  }

  function processCallback(e, dialog, callback) {
    e.stopPropagation();
    e.preventDefault();

    // by default we assume a callback will get rid of the dialog,
    // although it is given the opportunity to override this

    // so, if the callback can be invoked and it *explicitly returns false*
    // then we'll set a flag to keep the dialog active...
    var preserveDialog = $.isFunction(callback) && callback(e) === false;

    // ... otherwise we'll bin it
    if (!preserveDialog) {
      dialog.modal("hide");
    }
  }

  function getKeyLength(obj) {
    // @TODO defer to Object.keys(x).length if available?
    var k, t = 0;
    for (k in obj) {
      t ++;
    }
    return t;
  }

  function each(collection, iterator) {
    var index = 0;
    $.each(collection, function(key, value) {
      iterator(key, value, index++);
    });
  }

  function sanitize(options) {
    var buttons;
    var total;

    if (typeof options !== "object") {
      throw new Error("Please supply an object of options");
    }

    if (!options.message) {
      throw new Error("Please specify a message");
    }

    // make sure any supplied options take precedence over defaults
    options = $.extend({}, defaults, options);

    if (!options.buttons) {
      options.buttons = {};
    }

    // we only support Bootstrap's "static" and false backdrop args
    // supporting true would mean you could dismiss the dialog without
    // explicitly interacting with it
    options.backdrop = options.backdrop ? "static" : false;

    buttons = options.buttons;

    total = getKeyLength(buttons);

    each(buttons, function(key, button, index) {

      if ($.isFunction(button)) {
        // short form, assume value is our callback. Since button
        // isn't an object it isn't a reference either so re-assign it
        button = buttons[key] = {
          callback: button
        };
      }

      // before any further checks make sure by now button is the correct type
      if ($.type(button) !== "object") {
        throw new Error("button with key " + key + " must be an object");
      }

      if (!button.label) {
        // the lack of an explicit label means we'll assume the key is good enough
        button.label = key;
      }

      if (!button.className) {
        if (total == 1 || (total >= 2 && key === 'confirm')) {
          // always add a primary to the main option in a two-button dialog
          button.className = "btn-primary";
        } else {
          button.className = "btn-default";
        }
      }
    });

    return options;
  }

  /**
   * map a flexible set of arguments into a single returned object
   * if args.length is already one just return it, otherwise
   * use the properties argument to map the unnamed args to
   * object properties
   * so in the latter case:
   * mapArguments(["foo", $.noop], ["message", "callback"])
   * -> { message: "foo", callback: $.noop }
   */
  function mapArguments(args, properties) {
    var argn = args.length;
    var options = {};

    if (argn < 1 || argn > 2) {
      throw new Error("Invalid argument length");
    }

    if (argn === 2 || typeof args[0] === "string") {
      options[properties[0]] = args[0];
      options[properties[1]] = args[1];
    } else {
      options = args[0];
    }

    return options;
  }

  /**
   * merge a set of default dialog options with user supplied arguments
   */
  function mergeArguments(defaults, args, properties) {
    return $.extend(
      // deep merge
      true,
      // ensure the target is an empty, unreferenced object
      {},
      // the base options object for this type of dialog (often just buttons)
      defaults,
      // args could be an object or array; if it's an array properties will
      // map it to a proper options object
      mapArguments(
        args,
        properties
      )
    );
  }

  /**
   * this entry-level method makes heavy use of composition to take a simple
   * range of inputs and return valid options suitable for passing to bootbox.dialog
   */
  function mergeDialogOptions(className, labels, properties, args) {
    //  build up a base set of dialog properties
    var baseOptions = {
      className: "bootbox-" + className,
      buttons: createLabels.apply(null, labels)
    };

    // ensure the buttons properties generated, *after* merging
    // with user args are still valid against the supplied labels
    return validateButtons(
      // merge the generated base properties with user supplied arguments
      mergeArguments(
        baseOptions,
        args,
        // if args.length > 1, properties specify how each arg maps to an object key
        properties
      ),
      labels
    );
  }

  /**
   * from a given list of arguments return a suitable object of button labels
   * all this does is normalise the given labels and translate them where possible
   * e.g. "ok", "confirm" -> { ok: "OK, cancel: "Annuleren" }
   */
  function createLabels() {
    var buttons = {};

    for (var i = 0, j = arguments.length; i < j; i++) {
      var argument = arguments[i];
      var key = argument.toLowerCase();
      var value = argument.toUpperCase();

      buttons[key] = {
        label: _t(value)
      };
    }

    return buttons;
  }

  function validateButtons(options, buttons) {
    var allowedButtons = {};
    each(buttons, function(key, value) {
      allowedButtons[value] = true;
    });

    each(options.buttons, function(key) {
      if (allowedButtons[key] === undefined) {
        throw new Error("button key " + key + " is not allowed (options are " + buttons.join("\n") + ")");
      }
    });

    return options;
  }

  exports.alert = function() {
    var options;

    options = mergeDialogOptions("alert", ["ok"], ["message", "callback"], arguments);

    if (options.callback && !$.isFunction(options.callback)) {
      throw new Error("alert requires callback property to be a function when provided");
    }

    /**
     * overrides
     */
    options.buttons.ok.callback = options.onEscape = function() {
      if ($.isFunction(options.callback)) {
        return options.callback();
      }
      return true;
    };

    return exports.dialog(options);
  };

  exports.confirm = function() {
    var options;

    options = mergeDialogOptions("confirm", ["confirm", "cancel"], ["message", "callback"], arguments);

    /**
     * overrides; undo anything the user tried to set they shouldn't have
     */
    options.buttons.cancel.callback = options.onEscape = function() {
      return options.callback(false);
    };

    options.buttons.confirm.callback = function() {
      return options.callback(true);
    };

    // confirm specific validation
    if (!$.isFunction(options.callback)) {
      throw new Error("confirm requires a callback");
    }

    return exports.dialog(options);
  };

  exports.prompt = function() {
    var options;
    var defaults;
    var dialog;
    var form;
    var input;
    var shouldShow;
    var inputOptions;

    // we have to create our form first otherwise
    // its value is undefined when gearing up our options
    // @TODO this could be solved by allowing message to
    // be a function instead...
    form = $(templates.form);

    // prompt defaults are more complex than others in that
    // users can override more defaults
    // @TODO I don't like that prompt has to do a lot of heavy
    // lifting which mergeDialogOptions can *almost* support already
    // just because of 'value' and 'inputType' - can we refactor?
    defaults = {
      className: "bootbox-prompt",
      buttons: createLabels("confirm", "cancel"),
      value: "",
      inputType: "text"
    };

    options = validateButtons(
      mergeArguments(defaults, arguments, ["title", "callback"]),
      ["cancel", "confirm"]
    );

    // capture the user's show value; we always set this to false before
    // spawning the dialog to give us a chance to attach some handlers to
    // it, but we need to make sure we respect a preference not to show it
    shouldShow = (options.show === undefined) ? true : options.show;

    // check if the browser supports the option.inputType
    var html5inputs = ["date","time","number"];
    var i = document.createElement("input");
    i.setAttribute("type", options.inputType);
    if(html5inputs[options.inputType]){
      options.inputType = i.type;
    }

    /**
     * overrides; undo anything the user tried to set they shouldn't have
     */
    options.message = form;

    options.buttons.cancel.callback = options.onEscape = function() {
      return options.callback(null);
    };

    options.buttons.confirm.callback = function() {
      var value;

      switch (options.inputType) {
        case "text":
        case "textarea":
        case "email":
        case "select":
        case "date":
        case "time":
        case "number":
        case "password":
          value = input.val();
          break;

        case "checkbox":
          var checkedItems = input.find("input:checked");

          // we assume that checkboxes are always multiple,
          // hence we default to an empty array
          value = [];

          each(checkedItems, function(_, item) {
            value.push($(item).val());
          });
          break;
      }

      return options.callback(value);
    };

    options.show = false;

    // prompt specific validation
    if (!options.title) {
      throw new Error("prompt requires a title");
    }

    if (!$.isFunction(options.callback)) {
      throw new Error("prompt requires a callback");
    }

    if (!templates.inputs[options.inputType]) {
      throw new Error("invalid prompt type");
    }

    // create the input based on the supplied type
    input = $(templates.inputs[options.inputType]);

    switch (options.inputType) {
      case "text":
      case "textarea":
      case "email":
      case "date":
      case "time":
      case "number":
      case "password":
        input.val(options.value);
        break;

      case "select":
        var groups = {};
        inputOptions = options.inputOptions || [];

        if (!inputOptions.length) {
          throw new Error("prompt with select requires options");
        }

        each(inputOptions, function(_, option) {

          // assume the element to attach to is the input...
          var elem = input;

          if (option.value === undefined || option.text === undefined) {
            throw new Error("given options in wrong format");
          }


          // ... but override that element if this option sits in a group

          if (option.group) {
            // initialise group if necessary
            if (!groups[option.group]) {
              groups[option.group] = $("<optgroup/>").attr("label", option.group);
            }

            elem = groups[option.group];
          }

          elem.append("<option value='" + option.value + "'>" + option.text + "</option>");
        });

        each(groups, function(_, group) {
          input.append(group);
        });

        // safe to set a select's value as per a normal input
        input.val(options.value);
        break;

      case "checkbox":
        var values   = $.isArray(options.value) ? options.value : [options.value];
        inputOptions = options.inputOptions || [];

        if (!inputOptions.length) {
          throw new Error("prompt with checkbox requires options");
        }

        if (!inputOptions[0].value || !inputOptions[0].text) {
          throw new Error("given options in wrong format");
        }

        // checkboxes have to nest within a containing element, so
        // they break the rules a bit and we end up re-assigning
        // our 'input' element to this container instead
        input = $("<div/>");

        each(inputOptions, function(_, option) {
          var checkbox = $(templates.inputs[options.inputType]);

          checkbox.find("input").attr("value", option.value);
          checkbox.find("label").append(option.text);

          // we've ensured values is an array so we can always iterate over it
          each(values, function(_, value) {
            if (value === option.value) {
              checkbox.find("input").prop("checked", true);
            }
          });

          input.append(checkbox);
        });
        break;
    }

    if (options.placeholder) {
      input.attr("placeholder", options.placeholder);
    }

    if(options.pattern){
      input.attr("pattern", options.pattern);
    }

    // now place it in our form
    form.append(input);

    form.on("submit", function(e) {
      e.preventDefault();
      // Fix for SammyJS (or similar JS routing library) hijacking the form post.
      e.stopPropagation();
      // @TODO can we actually click *the* button object instead?
      // e.g. buttons.confirm.click() or similar
      dialog.find(".btn-primary").click();
    });

    dialog = exports.dialog(options);

    // clear the existing handler focusing the submit button...
    dialog.off("shown.bs.modal");

    // ...and replace it with one focusing our input, if possible
    dialog.on("shown.bs.modal", function() {
      input.focus();
    });

    if (shouldShow === true) {
      dialog.modal("show");
    }

    return dialog;
  };

  exports.dialog = function(options) {
    options = sanitize(options);

    var dialog = $(templates.dialog);
    var innerDialog = dialog.find(".modal-dialog");
    var body = dialog.find(".modal-body");
    var buttons = options.buttons;
    var buttonStr = "";
    var callbacks = {
      onEscape: options.onEscape
    };

    each(buttons, function(key, button) {

      // @TODO I don't like this string appending to itself; bit dirty. Needs reworking
      // can we just build up button elements instead? slower but neater. Then button
      // can just become a template too
      buttonStr += "<button data-bb-handler='" + key + "' type='button' class='btn " + button.className + "'>" + button.label + "</button>";
      callbacks[key] = button.callback;
    });

    body.find(".bootbox-body").html(options.message);

    if (options.animate === true) {
      dialog.addClass("fade");
    }

    if (options.className) {
      dialog.addClass(options.className);
    }

    if (options.size === "large") {
      innerDialog.addClass("modal-lg");
    }

    if (options.size === "small") {
      innerDialog.addClass("modal-sm");
    }

    if (options.title) {
      body.before(templates.header);
    }

    if (options.closeButton) {
      var closeButton = $(templates.closeButton);

      if (options.title) {
        dialog.find(".modal-header").prepend(closeButton);
      } else {
        closeButton.css("margin-top", "-10px").prependTo(body);
      }
    }

    if (options.title) {
      dialog.find(".modal-title").html(options.title);
    }

    if (buttonStr.length) {
      body.after(templates.footer);
      dialog.find(".modal-footer").html(buttonStr);
    }


    /**
     * Bootstrap event listeners; used handle extra
     * setup & teardown required after the underlying
     * modal has performed certain actions
     */

    dialog.on("hidden.bs.modal", function(e) {
      // ensure we don't accidentally intercept hidden events triggered
      // by children of the current dialog. We shouldn't anymore now BS
      // namespaces its events; but still worth doing
      if (e.target === this) {
        dialog.remove();
      }
    });

    /*
    dialog.on("show.bs.modal", function() {
      // sadly this doesn't work; show is called *just* before
      // the backdrop is added so we'd need a setTimeout hack or
      // otherwise... leaving in as would be nice
      if (options.backdrop) {
        dialog.next(".modal-backdrop").addClass("bootbox-backdrop");
      }
    });
    */

    dialog.on("shown.bs.modal", function() {
      dialog.find(".btn-primary:first").focus();
    });

    /**
     * Bootbox event listeners; experimental and may not last
     * just an attempt to decouple some behaviours from their
     * respective triggers
     */

    dialog.on("escape.close.bb", function(e) {
      if (callbacks.onEscape) {
        processCallback(e, dialog, callbacks.onEscape);
      }
    });

    /**
     * Standard jQuery event listeners; used to handle user
     * interaction with our dialog
     */

    dialog.on("click", ".modal-footer button", function(e) {
      var callbackKey = $(this).data("bb-handler");

      processCallback(e, dialog, callbacks[callbackKey]);

    });

    dialog.on("click", ".bootbox-close-button", function(e) {
      // onEscape might be falsy but that's fine; the fact is
      // if the user has managed to click the close button we
      // have to close the dialog, callback or not
      processCallback(e, dialog, callbacks.onEscape);
    });

    dialog.on("keyup", function(e) {
      if (e.which === 27) {
        dialog.trigger("escape.close.bb");
      }
    });

    // the remainder of this method simply deals with adding our
    // dialogent to the DOM, augmenting it with Bootstrap's modal
    // functionality and then giving the resulting object back
    // to our caller

    $(options.container).append(dialog);

    dialog.modal({
      backdrop: options.backdrop,
      keyboard: false,
      show: false
    });

    if (options.show) {
      dialog.modal("show");
    }

    // @TODO should we return the raw element here or should
    // we wrap it in an object on which we can expose some neater
    // methods, e.g. var d = bootbox.alert(); d.hide(); instead
    // of d.modal("hide");

   /*
    function BBDialog(elem) {
      this.elem = elem;
    }

    BBDialog.prototype = {
      hide: function() {
        return this.elem.modal("hide");
      },
      show: function() {
        return this.elem.modal("show");
      }
    };
    */

    return dialog;

  };

  exports.setDefaults = function() {
    var values = {};

    if (arguments.length === 2) {
      // allow passing of single key/value...
      values[arguments[0]] = arguments[1];
    } else {
      // ... and as an object too
      values = arguments[0];
    }

    $.extend(defaults, values);
  };

  exports.hideAll = function() {
    $(".bootbox").modal("hide");
  };


  /**
   * standard locales. Please add more according to ISO 639-1 standard. Multiple language variants are
   * unlikely to be required. If this gets too large it can be split out into separate JS files.
   */
  var locales = {
    en : {
      OK      : "OK",
      CANCEL  : "Cancel",
      CONFIRM : "OK"
    },
    zh_cn : {
      OK      : "好的",
      CANCEL  : "取消",
      CONFIRM : "确认"
    },
    zh_tw : {
      OK      : "好的",
      CANCEL  : "取消",
      CONFIRM : "確認"
    }
  };

  exports.init = function(_$) {
    return init(_$ || $);
  };

  return exports;
}));

/* Messager: show messager float on your page */
+function($, window, document, Math)
{
    "use strict";

    var id       = 0;
    var template = '<div class="messager messager-{type} {placement}" id="messager{id}" style="display:none"><div class="messager-content">{message}</div><button class="close-messager">&times;</button></div>';

    function Messager()
    {
        this.show = function(message, type, placement, time, parent)
        {
            $('.messager').hide();

            id++;
            type = type || 'default';
            time = time || 2000;
            parent = parent || 'body';
            placement = placement || 'top';
            var msg = $(template.format({message: message, type: type, placement: placement, id: id})).appendTo(parent);
            msg.find('.close-messager').click(function(){$(this).closest('.messager').fadeOut();});

            if(placement == 'top' || placement == 'bottom')
            {
                msg.css('left', ($(parent).width() - msg.width() - 50)/2);
            }

            msg.fadeIn();

            setTimeout(function(){$('#messager' + id).fadeOut(function(){$(this).remove()});}, time);

            return msg;
        }

        this.primary = function(message, placement, time, parent)
        {
            return this.show(message, 'primary', placement, time, parent);
        }

        this.success = function(message, placement, time, parent)
        {
            return this.show('<i class="icon-ok-sign icon"></i> ' + message, 'success', placement, time, parent);
        }

        this.info = function(message, placement, time, parent)
        {
            return this.show('<i class="icon-info-sign icon"></i> ' + message, 'info', placement, time, parent);
        }

        this.warning = function(message, placement, time, parent)
        {
            return this.show('<i class="icon-warning-sign icon"></i>' + message, 'warning', placement, time, parent);
        }

        this.danger = function(message, placement, time, parent)
        {
            return this.show('<i class="icon-exclamation-sign icon"></i>' + message, 'danger', placement, time, parent);
        }

        this.important = function(message, placement, time, parent)
        {
            return this.show(message, 'important', placement, time, parent);
        }

        this.special = function(message, placement, time, parent)
        {
            return this.show(message, 'special', placement, time, parent);
        }
    }

    var messager = new Messager();

    window.messager = messager;


}(jQuery,window,document,Math);

/* Boards */
+function($, window, document, Math)
{
    "use strict";

    if (!$.fn.droppable) throw new Error('droppable requires for boards');

    var Boards = function(element, options)
    {
        this.$         = $(element);
        this.options   = this.getOptions(options);

        this.getLang();
        this.init();
    };

    Boards.DEFAULTS = 
    {
        lang: 'zh-cn',
        langs: 
        {
            'zh-cn': {appendToTheEnd: '移动到末尾'},
            'zh-tw': {appendToTheEnd: '移动到末尾'},
            'en': {appendToTheEnd: 'Move to the end.'}
        }
    }; // default options

    Boards.prototype.getOptions = function (options)
    {
        options = $.extend({}, Boards.DEFAULTS, this.$.data(), options);
        return options;
    };

    Boards.prototype.getLang = function()
    {
        if(!this.options.lang)
        {
            if(typeof(config) != 'undefined' && config.clientLang)
            {
                this.options.lang = config.clientLang;
            }
            else
            {
                var hl = $('html').attr('lang');
                this.options.lang = hl? hl : 'en';
            }
            this.options.lang = this.options.lang.replace(/-/, '_').toLowerCase();
        }
        this.lang = this.options.langs[this.options.lang] || this.options.langs[Boards.DEFAULTS.lang];
    };

    Boards.prototype.init = function()
    {
        var idSeed = 1;
        var lang = this.lang;
        this.$.find('.board-item:not(".disable-drop"), .board:not(".disable-drop")').each(function()
        {
            var $this = $(this);
            if($this.attr('id'))
            {
                $this.attr('data-id', $this.attr('id'));
            }
            else if(!$this.attr('data-id'))
            {
                $this.attr('data-id', 'board' + (idSeed++));
            }

            if($this.hasClass('board'))
            {
                $this.find('.board-list').append('<div class="board-item board-item-empty"><i class="icon-plus"></i> {appendToTheEnd}</div>'.format(lang))
                .append('<div class="board-item board-item-shadow"></div>'.format(lang));
            }
        });

        this.bind();
    };

    Boards.prototype.bind = function(items)
    {
        var $boards = this.$, setting = this.options;
        if(typeof(items) == 'undefined')
        {
            items = $boards.find('.board-item:not(".disable-drop, .board-item-shadow")');
        }

        items.droppable(
        {
            target: '.board-item:not(".disable-drop, .board-item-shadow")',
            flex: true,
            start: function(e)
            {
                $boards.addClass('dragging').find('.board-item-shadow').height(e.element.outerHeight());
            },
            drag: function(e)
            {
                $boards.find('.board.drop-in-empty').removeClass('drop-in-empty');
                if(e.isIn)
                {
                    var board = e.target.closest('.board').addClass('drop-in');
                    var shadow = board.find('.board-item-shadow');
                    var target = e.target;

                    $boards.addClass('drop-in').find('.board.drop-in').not(board).removeClass('drop-in');

                    shadow.insertBefore(target);

                    board.toggleClass('drop-in-empty', target.hasClass('board-item-empty'));
                }
            },
            drop: function(e)
            {
                if(e.isNew)
                {
                    if(setting.hasOwnProperty('drop') && $.isFunction(setting['drop']))
                    {
                        setting['drop'](e);
                    }
                    e.element.insertBefore(e.target);
                }
            },
            finish: function(e)
            {
                $boards.removeClass('dragging').removeClass('drop-in').find('.board.drop-in').removeClass('drop-in');
            }
        });
    };

    $.fn.boards = function(option)
    {
        return this.each(function()
        {
            var $this   = $(this);
            var data    = $this.data('zui.boards');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.boards', (data = new Boards(this, options)));

            if (typeof option == 'string') data[option]();
        })
    };

    $.fn.boards.Constructor = Boards;

    $(function()
    {
        $('[data-toggle="boards"]').boards();
    });
}(jQuery,window,document,Math);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.3
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    if(!this.selector) this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);

/* ImgCutter */
+function($, window, document, Math)
{
    "use strict";

    var ImgCutter = function(element, options)
    {
        this.$         = $(element);
        this.initOptions(options);
        this.init();
    };

    ImgCutter.DEFAULTS = {coverColor: '#000', coverOpacity: 0.6, fixedRatio: false, defaultWidth: 128, defaultHeight: 128, minWidth: 48, minHeight: 48}; // default options

    ImgCutter.prototype.callEvent = function(name, params)
    {
        return $.callEvent(this.options[name], params);
    }

    ImgCutter.prototype.initOptions = function (options)
    {
        this.options = $.extend({}, ImgCutter.DEFAULTS, this.$.data(), options);
        this.options.coverOpacityIE = this.options.coverOpacity * 100;
        this.clipWidth = this.options.defaultWidth;
        this.clipHeight = this.options.defaultHeight;
    };

    ImgCutter.prototype.init = function()
    {
        this.initDom();
        this.initSize();
        this.bindEvents();
    }

    ImgCutter.prototype.initDom = function()
    {
        this.$canvas = this.$.children('.canvas');
        this.$img = this.$canvas.children('img');
        this.$actions = this.$.children('.actions');
        this.$btn = this.$.find('.img-cutter-submit');
        this.$preview = this.$.find('.img-cutter-preview');

        this.options.img = this.$img.attr('src');

        this.$canvas.append('<div class="cover" style="background: {coverColor}; opacity: {coverOpacity}; filter:alpha(opacity={coverOpacityIE});"></div><div class="controller" style="width: {defaultWidth}px; height: {defaultHeight}px"><div class="control" data-direction="top"></div><div class="control" data-direction="right"></div><div class="control" data-direction="bottom"></div><div class="control" data-direction="left"></div><div class="control" data-direction="top-left"></div><div class="control" data-direction="top-right"></div><div class="control" data-direction="bottom-left"></div><div class="control" data-direction="bottom-right"></div></div><div class="cliper"><img src="{img}"/></div>'.format(this.options));

        this.$cover = this.$canvas.children('.cover');
        this.$controller = this.$canvas.children('.controller');
        this.$cliper = this.$canvas.children('.cliper');
        this.$chipImg = this.$cliper.children('img');

        if(this.options.fixedRatio)
        {
            this.$.addClass('fixed-ratio');
        }
    }

    ImgCutter.prototype.initSize = function()
    {
        var that = this;
        if(typeof that.imgWidth === 'undefined')
        {
            imgReady(that.options.img, function()
            {
                that.imgWidth = this.width;
                that.imgHeight = this.height;
                that.callEvent('ready');
            });
        }


        var waitImgWidth = setInterval(function()
        {
            if(typeof that.imgWidth != 'undefined')
            {
                clearInterval(waitImgWidth);

                that.width = Math.min(that.imgWidth, that.$.width());
                that.$canvas.css('width', this.width);
                that.$cliper.css('width', this.width);
                that.height = that.$canvas.height();

                if(typeof that.left === 'undefined')
                {
                    that.left = Math.floor((that.width - that.$controller.width())/2);
                    that.top = Math.floor((that.height - that.$controller.height())/2);
                }

                that.refreshSize();
            }
        }, 0);
    };

    ImgCutter.prototype.refreshSize = function(ratioSide)
    {
        var options = this.options;

        this.clipWidth = Math.max(options.minWidth, Math.min(this.width, this.clipWidth));
        this.clipHeight = Math.max(options.minHeight, Math.min(this.height, this.clipHeight));

        if(options.fixedRatio)
        {
            if(ratioSide && ratioSide === 'height')
            {
                this.clipWidth = Math.max(options.minWidth, Math.min(this.width, this.clipHeight * options.defaultWidth / options.defaultHeight));
                this.clipHeight = this.clipWidth * options.defaultHeight / options.defaultWidth;
            }
            else
            {
                this.clipHeight = Math.max(options.minHeight, Math.min(this.height, this.clipWidth * options.defaultHeight / options.defaultWidth));
                this.clipWidth = this.clipHeight * options.defaultWidth / options.defaultHeight;
            }
        }

        this.left = Math.min(this.width - this.clipWidth, Math.max(0, this.left));
        this.top = Math.min(this.height - this.clipHeight, Math.max(0, this.top));
        this.right = this.left + this.clipWidth;
        this.bottom = this.top + this.clipHeight;

        this.$controller.css({left: this.left, top: this.top, width: this.clipWidth, height: this.clipHeight});
        this.$cliper.css('clip', 'rect({0}px {1}px {2}px {3}px'.format(this.top, this.left + this.clipWidth, this.top + this.clipHeight, this.left));


        this.callEvent('change', {top: this.top, left: this.left, bottom: this.bottom, right: this.right, width: this.clipWidth, height: this.clipHeight});
    }

    ImgCutter.prototype.bindEvents = function()
    {
        var that = this, options = this.options;
        this.$.resize($.proxy(this.initSize, this));
        this.$btn.hover(function(){that.$.toggleClass('hover');}).click(function()
        {
            var data = {originWidth: that.imgWidth, originHeight: that.imgHeight, width: that.width, height: that.height, left: that.left, top: that.top, right: that.right, bottom: that.bottom, scaled: that.imgWidth != that.width || that.imgHeight != that.height};

            if(!that.callEvent('before', data)) return;

            var url = options.post || options.get || options.url || null;
            if(url != null)
            {
                $.ajax({type: options.post ? 'POST': 'GET', url: url, data: data})
                 .done(function(e){
                    that.callEvent('done', e);
                 }).fail(function(e){
                    that.callEvent('fail', e);
                 }).always(function(e){
                    that.callEvent('always', e);
                 });
            }
        });

        this.$controller.draggable(
        {
            move: false,
            container: this.$canvas,
            drag: function(e)
            {
                that.left += e.smallOffset.x;
                that.top += e.smallOffset.y;
                that.refreshSize();
            },
        });

        this.$controller.children('.control').draggable(
        {
            move: false,
            container: this.$canvas,
            stopPropagation: true,
            drag: function(e)
            {
                var dr = e.element.data('direction');
                var offset = e.smallOffset;
                var ratioSide = false;

                switch(dr)
                {
                    case 'left':
                    case 'top-left':
                    case 'bottom-left':
                        that.left += offset.x;
                        that.left = Math.min(that.right - options.minWidth, Math.max(0, that.left));
                        that.clipWidth = that.right - that.left;
                        break;
                    case 'right':
                    case 'top-right':
                    case 'bottom-right':
                        that.clipWidth += offset.x;
                        that.clipWidth = Math.min(that.width - that.left, Math.max(options.minWidth, that.clipWidth));
                        break;
                }
                switch(dr)
                {
                    case 'top':
                    case 'top-left':
                    case 'top-right':
                        that.top += offset.y;
                        that.top = Math.min(that.bottom - options.minHeight, Math.max(0, that.top));
                        that.clipHeight = that.bottom - that.top;
                        ratioSide = true;
                        break;
                    case 'bottom':
                    case 'bottom-left':
                    case 'bottom-right':
                        that.clipHeight += offset.y;
                        that.clipHeight = Math.min(that.height - that.top, Math.max(options.minHeight, that.clipHeight));
                        ratioSide = true;
                        break;
                }

                that.refreshSize(ratioSide);
            }
        });
    };

    $.fn.imgCutter = function(option)
    {
        return this.each(function()
        {
            var $this   = $(this);
            var data    = $this.data('zui.imgCutter');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.imgCutter', (data = new ImgCutter(this, options)));

            if (typeof option == 'string') data[option]();
        })
    };

    $.fn.imgCutter.Constructor = ImgCutter;

    $(function()
    {
        $('[data-toggle="imgCutter"]').imgCutter();
    });
}(jQuery,window,document,Math);

/* AutoTrigger */
+function($, window, document, Math)
{
    "use strict";

    var AutoTrigger = function(element, options)
    {
        this.$         = $(element);
        this.options   = this.getOptions(options);

        this.init();
    };

    AutoTrigger.DEFAULTS = 
    {
        trigger: 'toggle',
        selector: null,
        animate: 'slide',
        easing: 'linear',
        animateSpeed: 'fast',
        events: 'click',
        preventDefault: true,
        cancelBubble: true,
        target: null,
        //,before:
        //,after: 
    }; // default options

    AutoTrigger.prototype.getOptions = function (options)
    {
        options = $.extend({}, AutoTrigger.DEFAULTS, this.$.data(), options);
        return options;
    };

    AutoTrigger.prototype.init = function()
    {
        this.bindEvents();
    };

    AutoTrigger.prototype.bindEvents = function()
    {
        var options = this.options, that = this;
        this.bindTrigger(options);

        if($.isArray(options.triggers))
        {
            for(var i in options.triggers)
            {
                this.bindTrigger($.extend({}, options, options.triggers[i]));
            }
        }
        else if(typeof options.triggers === 'string')
        {
            /* events,trigger,target,data */
            var triggers = options.triggers.split('|');
            for(var i in triggers)
            {
                var ops = triggers[i].split(',', 4);
                if(ops.length < 2) continue;
                var option = {};
                if(ops[0]) option.events = ops[0];
                if(ops[1]) option.trigger = ops[1];
                if(ops[2]) option.target = ops[2];
                if(ops[3]) option.data = ops[3];

                this.bindTrigger($.extend({}, options, option));
            }
        }
    };

    AutoTrigger.prototype.bindTrigger = function(options)
    {
        var that = this;
        that.$.on(options.events, options.selector, function(event)
        {
            var target = (!options.target) || options.target == 'self' ? that.$ : $(options.target);
            var data = {event: event, element: this, target: target, options: options};
            if(!$.callEvent(options.before, data, that)) return;

            if($.isFunction(options.trigger))
            {
                $.callEvent(options.trigger, data, that);
            }
            else
            {
                var type = options.trigger;
                if(type === 'toggle')
                {
                    type = target.hasClass('hide') ? 'show' : 'hide';
                }
                switch(type)
                {
                    case 'toggle':
                        target.toggle();
                        break;
                    case 'show':
                        var params = {duration: options.animateSpeed, easing: options.easing};

                        target.removeClass('hide');
                        if(options.animate === 'slide')
                        {
                            target.slideDown(params);
                        }
                        else if(options.animate === 'fade')
                        {
                            target.fadeIn(params);
                        }
                        else
                        {
                            target.show(params);
                        }
                        break;
                    case 'hide':
                        var params = {duration: options.animateSpeed, easing: options.easing, complete: function(){target.addClass('hide');}};
                        if(options.animate === 'slide')
                        {
                            target.slideUp(params);
                        }
                        else if(options.animate === 'fade')
                        {
                            target.fadeOut(params);
                        }
                        else
                        {
                            target.hide(params);
                        }
                        break;
                    case 'addClass':
                    case 'removeClass':
                    case 'toggleClass':
                        target[type](options.data);
                        break;
                }
            }

            $.callEvent(options.after, data, that);

            if(options.preventDefault) event.preventDefault();
            if(options.cancelBubble) event.stopPropagation();
        });
    }

    $.fn.autoTrigger = function(option)
    {
        return this.each(function()
        {
            var $this   = $(this);
            var data    = $this.data('zui.autoTrigger');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.autoTrigger', (data = new AutoTrigger(this, options)));

            if (typeof option == 'string') data[option]();
        })
    };

    $.fn.autoTrigger.Constructor = AutoTrigger;

    $(function()
    {
        $('[data-toggle="autoTrigger"]').autoTrigger();
        $('[data-toggle="toggle"]').autoTrigger();
        $('[data-toggle="show"]').autoTrigger({trigger: 'show'});
        $('[data-toggle="hide"]').autoTrigger({trigger: 'hide'});
        $('[data-toggle="addClass"]').autoTrigger({trigger: 'addClass'});
        $('[data-toggle="removeClass"]').autoTrigger({trigger: 'removeClass'});
        $('[data-toggle="toggleClass"]').autoTrigger({trigger: 'toggleClass'});
    });
}(jQuery,window,document,Math);
