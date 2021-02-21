/*!
* imagemapster - v1.5.4 - 2021-02-20
* https://github.com/jamietre/ImageMapster/
* Copyright (c) 2011 - 2021 James Treworgy
* License: MIT
*/
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function( root, jQuery ) {
      if ( jQuery === undefined ) {
        // require('jQuery') returns a factory that requires window to
        // build a jQuery instance, we normalize how we use modules
        // that require this pattern but the window provided is a noop
        // if it's defined (how jquery works)
        if ( typeof window !== 'undefined' ) {
          jQuery = require('jquery');
        }
        else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
      // Browser globals
      factory(jQuery);
  }
}(function (jQuery) {
    /* 
  jqueryextensions.js
  Extend/intercept jquery behavior
*/

(function ($) {
  'use strict';

  function setupPassiveListeners() {
    // Test via a getter in the options object to see if the passive property is accessed
    var supportsPassive = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true;
          return true;
        }
      });
      window.addEventListener('testPassive.mapster', function () {}, opts);
      window.removeEventListener('testPassive.mapster', function () {}, opts);
    } catch (e) {
      // intentionally ignored
    }

    if (supportsPassive) {
      // In order to not interrupt scrolling on touch devices
      // we commit to not calling preventDefault from within listeners
      // There is a plan to handle this natively in jQuery 4.0 but for
      // now we are on our own.
      // TODO: Migrate to jQuery 4.0 approach if/when released
      // https://www.chromestatus.com/feature/5745543795965952
      // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
      // https://github.com/jquery/jquery/issues/2871#issuecomment-175175180
      // https://jsbin.com/bupesajoza/edit?html,js,output
      var setupListener = function (ns, type, listener) {
        if (ns.includes('noPreventDefault')) {
          window.addEventListener(type, listener, { passive: true });
        } else {
          console.warn('non-passive events - listener not added');
          return false;
        }
      };

      // special events for noPreventDefault
      $.event.special.touchstart = {
        setup: function (_, ns, listener) {
          return setupListener(ns, 'touchstart', listener);
        }
      };
      $.event.special.touchend = {
        setup: function (_, ns, listener) {
          return setupListener(ns, 'touchend', listener);
        }
      };
    }
  }

  function supportsSpecialEvents() {
    return $.event && $.event.special;
  }

  // Zepto does not support special events
  // TODO: Remove when Zepto support is removed
  if (supportsSpecialEvents()) {
    setupPassiveListeners();
  }
})(jQuery);

/*
  core.js
  ImageMapster core
*/

(function ($) {
  'use strict';

  var mapster_version = '1.5.4';

  // all public functions in $.mapster.impl are methods
  $.fn.mapster = function (method) {
    var m = $.mapster.impl;
    if ($.mapster.utils.isFunction(m[method])) {
      return m[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return m.bind.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.mapster');
    }
  };

  $.mapster = {
    version: mapster_version,
    render_defaults: {
      isSelectable: true,
      isDeselectable: true,
      fade: false,
      fadeDuration: 150,
      fill: true,
      fillColor: '000000',
      fillColorMask: 'FFFFFF',
      fillOpacity: 0.7,
      highlight: true,
      stroke: false,
      strokeColor: 'ff0000',
      strokeOpacity: 1,
      strokeWidth: 1,
      includeKeys: '',
      altImage: null,
      altImageId: null, // used internally
      altImages: {}
    },
    defaults: {
      clickNavigate: false,
      navigateMode: 'location', // location|open
      wrapClass: null,
      wrapCss: null,
      onGetList: null,
      sortList: false,
      listenToList: false,
      mapKey: '',
      mapValue: '',
      singleSelect: false,
      listKey: 'value',
      listSelectedAttribute: 'selected',
      listSelectedClass: null,
      onClick: null,
      onMouseover: null,
      onMouseout: null,
      mouseoutDelay: 0,
      onStateChange: null,
      boundList: null,
      onConfigured: null,
      configTimeout: 30000,
      noHrefIsMask: true,
      scaleMap: true,
      enableAutoResizeSupport: false, // TODO: Remove in next major release
      autoResize: false,
      autoResizeDelay: 0,
      autoResizeDuration: 0,
      onAutoResize: null,
      safeLoad: false,
      areas: []
    },
    shared_defaults: {
      render_highlight: { fade: true },
      render_select: { fade: false },
      staticState: null,
      selected: null
    },
    area_defaults: {
      includeKeys: '',
      isMask: false
    },
    canvas_style: {
      position: 'absolute',
      left: 0,
      top: 0,
      padding: 0,
      border: 0
    },
    hasCanvas: null,
    map_cache: [],
    hooks: {},
    addHook: function (name, callback) {
      this.hooks[name] = (this.hooks[name] || []).push(callback);
    },
    callHooks: function (name, context) {
      $.each(this.hooks[name] || [], function (_, e) {
        e.apply(context);
      });
    },
    utils: {
      when: {
        all: function (deferredArray) {
          // TODO: Promise breaks ES5 support
          // eslint-disable-next-line no-undef
          return Promise.all(deferredArray);
        },
        defer: function () {
          // Deferred is frequently referred to as an anti-pattern largely
          // due to error handling, however to avoid reworking existing
          // APIs and support backwards compat, creating a "deferred"
          // polyfill via native promise
          var Deferred = function () {
            // TODO: Promise breaks ES5 support
            // eslint-disable-next-line no-undef
            this.promise = new Promise(
              function (resolve, reject) {
                this.resolve = resolve;
                this.reject = reject;
              }.bind(this)
            );

            this.then = this.promise.then.bind(this.promise);
            this.catch = this.promise.catch.bind(this.promise);
          };
          return new Deferred();
        }
      },
      defer: function () {
        return this.when.defer();
      },
      // extends the constructor, returns a new object prototype. Does not refer to the
      // original constructor so is protected if the original object is altered. This way you
      // can "extend" an object by replacing it with its subclass.
      subclass: function (BaseClass, constr) {
        var Subclass = function () {
          var me = this,
            args = Array.prototype.slice.call(arguments, 0);
          me.base = BaseClass.prototype;
          me.base.init = function () {
            BaseClass.prototype.constructor.apply(me, args);
          };
          constr.apply(me, args);
        };
        Subclass.prototype = new BaseClass();
        Subclass.prototype.constructor = Subclass;
        return Subclass;
      },
      asArray: function (obj) {
        return obj.constructor === Array ? obj : this.split(obj);
      },
      // clean split: no padding or empty elements
      split: function (text, cb) {
        var i,
          el,
          arr = text.split(',');
        for (i = 0; i < arr.length; i++) {
          // backwards compat for $.trim which would return empty string on null
          // which theoertically should not happen here
          el = arr[i] ? arr[i].trim() : '';
          if (el === '') {
            arr.splice(i, 1);
          } else {
            arr[i] = cb ? cb(el) : el;
          }
        }
        return arr;
      },
      // similar to $.extend but does not add properties (only updates), unless the
      // first argument is an empty object, then all properties will be copied
      updateProps: function (_target, _template) {
        var onlyProps,
          target = _target || {},
          template = $.isEmptyObject(target) ? _template : _target;

        //if (template) {
        onlyProps = [];
        $.each(template, function (prop) {
          onlyProps.push(prop);
        });
        //}

        $.each(Array.prototype.slice.call(arguments, 1), function (_, src) {
          $.each(src || {}, function (prop) {
            if (!onlyProps || $.inArray(prop, onlyProps) >= 0) {
              var p = src[prop];

              if ($.isPlainObject(p)) {
                // not recursive - only copies 1 level of subobjects, and always merges
                target[prop] = $.extend(target[prop] || {}, p);
              } else if (p && p.constructor === Array) {
                target[prop] = p.slice(0);
              } else if (typeof p !== 'undefined') {
                target[prop] = src[prop];
              }
            }
          });
        });
        return target;
      },
      isElement: function (o) {
        return typeof HTMLElement === 'object'
          ? o instanceof HTMLElement
          : o &&
              typeof o === 'object' &&
              o.nodeType === 1 &&
              typeof o.nodeName === 'string';
      },
      /**
       * Basic indexOf implementation for IE7-8. Though we use $.inArray, some jQuery versions will try to
       * use a prototpye on the calling object, defeating the purpose of using $.inArray in the first place.
       *
       * This will be replaced with the array prototype if it's available.
       *
       * @param  {Array} arr The array to search
       * @param {Object} target The item to search for
       * @return {Number} The index of the item, or -1 if not found
       */
      indexOf: function (arr, target) {
        if (Array.prototype.indexOf) {
          return Array.prototype.indexOf.call(arr, target);
        } else {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] === target) {
              return i;
            }
          }
          return -1;
        }
      },

      // finds element of array or object with a property "prop" having value "val"
      // if prop is not defined, then just looks for property with value "val"
      indexOfProp: function (obj, prop, val) {
        var result = obj.constructor === Array ? -1 : null;
        $.each(obj, function (i, e) {
          if (e && (prop ? e[prop] : e) === val) {
            result = i;
            return false;
          }
        });
        return result;
      },
      // returns "obj" if true or false, or "def" if not true/false
      boolOrDefault: function (obj, def) {
        return this.isBool(obj) ? obj : def || false;
      },
      isBool: function (obj) {
        return typeof obj === 'boolean';
      },
      isUndef: function (obj) {
        return typeof obj === 'undefined';
      },
      isFunction: function (obj) {
        return typeof obj === 'function';
      },
      // evaluates "obj", if function, calls it with args
      // (todo - update this to handle variable lenght/more than one arg)
      ifFunction: function (obj, that, args) {
        if (this.isFunction(obj)) {
          obj.call(that, args);
        }
      },
      size: function (image, raw) {
        var u = $.mapster.utils;
        return {
          width: raw
            ? image.width || image.naturalWidth
            : u.imgWidth(image, true),
          height: raw
            ? image.height || image.naturalHeight
            : u.imgHeight(image, true),
          complete: function () {
            return !!this.height && !!this.width;
          }
        };
      },

      /**
       * Set the opacity of the element. This is an IE<8 specific function for handling VML.
       * When using VML we must override the "setOpacity" utility function (monkey patch ourselves).
       * jQuery does not deal with opacity correctly for VML elements. This deals with that.
       *
       * @param {Element} el The DOM element
       * @param {double} opacity A value between 0 and 1 inclusive.
       */

      setOpacity: function (el, opacity) {
        if ($.mapster.hasCanvas()) {
          el.style.opacity = opacity;
        } else {
          $(el).each(function (_, e) {
            if (typeof e.opacity !== 'undefined') {
              e.opacity = opacity;
            } else {
              $(e).css('opacity', opacity);
            }
          });
        }
      },

      // fade "el" from opacity "op" to "endOp" over a period of time "duration"

      fader: (function () {
        var elements = {},
          lastKey = 0,
          fade_func = function (el, op, endOp, duration) {
            var index,
              cbIntervals = duration / 15,
              obj,
              u = $.mapster.utils;

            if (typeof el === 'number') {
              obj = elements[el];
              if (!obj) {
                return;
              }
            } else {
              index = u.indexOfProp(elements, null, el);
              if (index) {
                delete elements[index];
              }
              elements[++lastKey] = obj = el;
              el = lastKey;
            }

            endOp = endOp || 1;

            op =
              op + endOp / cbIntervals > endOp - 0.01
                ? endOp
                : op + endOp / cbIntervals;

            u.setOpacity(obj, op);
            if (op < endOp) {
              setTimeout(function () {
                fade_func(el, op, endOp, duration);
              }, 15);
            }
          };
        return fade_func;
      })(),
      getShape: function (areaEl) {
        // per HTML spec, invalid value and missing value default is 'rect'
        // Handling as follows:
        //   - Missing/Empty value will be treated as 'rect' per spec
        //   - Avoid handling invalid values do to perf impact
        // Note - IM currently does not support shape of 'default' so while its technically
        // a valid attribute value it should not be used.
        // https://html.spec.whatwg.org/multipage/image-maps.html#the-area-element
        return (areaEl.shape || 'rect').toLowerCase();
      },
      hasAttribute: function (el, attrName) {
        var attr = $(el).attr(attrName);
        // For some browsers, `attr` is undefined; for others, `attr` is false.
        return typeof attr !== 'undefined' && attr !== false;
      }
    },
    getBoundList: function (opts, key_list) {
      if (!opts.boundList) {
        return null;
      }
      var index,
        key,
        result = $(),
        list = $.mapster.utils.split(key_list);
      opts.boundList.each(function (_, e) {
        for (index = 0; index < list.length; index++) {
          key = list[index];
          if ($(e).is('[' + opts.listKey + '="' + key + '"]')) {
            result = result.add(e);
          }
        }
      });
      return result;
    },
    getMapDataIndex: function (obj) {
      var img, id;
      switch (obj.tagName && obj.tagName.toLowerCase()) {
        case 'area':
          id = $(obj).parent().attr('name');
          img = $("img[usemap='#" + id + "']")[0];
          break;
        case 'img':
          img = obj;
          break;
      }
      return img ? this.utils.indexOfProp(this.map_cache, 'image', img) : -1;
    },
    getMapData: function (obj) {
      var index = this.getMapDataIndex(obj.length ? obj[0] : obj);
      if (index >= 0) {
        return index >= 0 ? this.map_cache[index] : null;
      }
    },
    /**
     * Queue a command to be run after the active async operation has finished
     * @param  {MapData}  map_data    The target MapData object
     * @param  {jQuery}   that        jQuery object on which the command was invoked
     * @param  {string}   command     the ImageMapster method name
     * @param  {object[]} args        arguments passed to the method
     * @return {bool}                 true if the command was queued, false if not (e.g. there was no need to)
     */
    queueCommand: function (map_data, that, command, args) {
      if (!map_data) {
        return false;
      }
      if (!map_data.complete || map_data.currentAction) {
        map_data.commands.push({
          that: that,
          command: command,
          args: args
        });
        return true;
      }
      return false;
    },
    unload: function () {
      this.impl.unload();
      this.utils = null;
      this.impl = null;
      $.fn.mapster = null;
      $.mapster = null;
      return $('*').off('.mapster');
    }
  };

  // Config for object prototypes
  // first: use only first object (for things that should not apply to lists)
  /// calls back one of two fuinctions, depending on whether an area was obtained.
  // opts: {
  //    name: 'method name',
  //    key: 'key,
  //    args: 'args'
  //
  //}
  // name: name of method (required)
  // args: arguments to re-call with
  // Iterates through all the objects passed, and determines whether it's an area or an image, and calls the appropriate
  // callback for each. If anything is returned from that callback, the process is stopped and that data return. Otherwise,
  // the object itself is returned.

  var m = $.mapster,
    u = m.utils,
    ap = Array.prototype;

  // jQuery's width() and height() are broken on IE9 in some situations. This tries everything.
  $.each(['width', 'height'], function (_, e) {
    var capProp = e.substr(0, 1).toUpperCase() + e.substr(1);
    // when jqwidth parm is passed, it also checks the jQuery width()/height() property
    // the issue is that jQUery width() can report a valid size before the image is loaded in some browsers
    // without it, we can read zero even when image is loaded in other browsers if its not visible
    // we must still check because stuff like adblock can temporarily block it
    // what a goddamn headache
    u['img' + capProp] = function (img, jqwidth) {
      return (
        (jqwidth ? $(img)[e]() : 0) ||
        img[e] ||
        img['natural' + capProp] ||
        img['client' + capProp] ||
        img['offset' + capProp]
      );
    };
  });

  /**
   * The Method object encapsulates the process of testing an ImageMapster method to see if it's being
   * invoked on an image, or an area; then queues the command if the MapData is in an active state.
   *
   * @param {[jQuery]}    that        The target of the invocation
   * @param {[function]}  func_map    The callback if the target is an imagemap
   * @param {[function]}  func_area   The callback if the target is an area
   * @param {[object]}    opt         Options: { key: a map key if passed explicitly
   *                                             name: the command name, if it can be queued,
   *                                             args: arguments to the method
   *                                            }
   */

  m.Method = function (that, func_map, func_area, opts) {
    var me = this;
    me.name = opts.name;
    me.output = that;
    me.input = that;
    me.first = opts.first || false;
    me.args = opts.args ? ap.slice.call(opts.args, 0) : [];
    me.key = opts.key;
    me.func_map = func_map;
    me.func_area = func_area;
    //$.extend(me, opts);
    me.name = opts.name;
    me.allowAsync = opts.allowAsync || false;
  };
  m.Method.prototype = {
    constructor: m.Method,
    go: function () {
      var i,
        data,
        ar,
        len,
        result,
        src = this.input,
        area_list = [],
        me = this;

      len = src.length;
      for (i = 0; i < len; i++) {
        data = $.mapster.getMapData(src[i]);
        if (data) {
          if (
            !me.allowAsync &&
            m.queueCommand(data, me.input, me.name, me.args)
          ) {
            if (this.first) {
              result = '';
            }
            continue;
          }

          ar = data.getData(src[i].nodeName === 'AREA' ? src[i] : this.key);
          if (ar) {
            if ($.inArray(ar, area_list) < 0) {
              area_list.push(ar);
            }
          } else {
            result = this.func_map.apply(data, me.args);
          }
          if (this.first || typeof result !== 'undefined') {
            break;
          }
        }
      }
      // if there were areas, call the area function for each unique group
      $(area_list).each(function (_, e) {
        result = me.func_area.apply(e, me.args);
      });

      if (typeof result !== 'undefined') {
        return result;
      } else {
        return this.output;
      }
    }
  };

  $.mapster.impl = (function () {
    var me = {},
      addMap = function (map_data) {
        return m.map_cache.push(map_data) - 1;
      },
      removeMap = function (map_data) {
        m.map_cache.splice(map_data.index, 1);
        for (var i = m.map_cache.length - 1; i >= map_data.index; i--) {
          m.map_cache[i].index--;
        }
      };

    /**
     * Test whether the browser supports VML. Credit: google.
     * http://stackoverflow.com/questions/654112/how-do-you-detect-support-for-vml-or-svg-in-a-browser
     *
     * @return {bool} true if vml is supported, false if not
     */

    function hasVml() {
      var a = $('<div />').appendTo('body');
      a.html('<v:shape id="vml_flag1" adj="1" />');

      var b = a[0].firstChild;
      b.style.behavior = 'url(#default#VML)';
      var has = b ? typeof b.adj === 'object' : true;
      a.remove();
      return has;
    }

    /**
     * Return a reference to the IE namespaces object, if available, or an empty object otherwise
     * @return {obkect} The document.namespaces object.
     */
    function namespaces() {
      return typeof document.namespaces === 'object'
        ? document.namespaces
        : null;
    }

    /**
     * Test for the presence of HTML5 Canvas support. This also checks to see if excanvas.js has been
     * loaded and is faking it; if so, we assume that canvas is not supported.
     *
     * @return {bool} true if HTML5 canvas support, false if not
     */

    function hasCanvas() {
      var d = namespaces();
      // when g_vml_ is present, then we can be sure excanvas is active, meaning there's not a real canvas.

      return d && d.g_vml_
        ? false
        : $('<canvas />')[0].getContext
        ? true
        : false;
    }

    /**
     * Merge new area data into existing area options on a MapData object. Used for rebinding.
     *
     * @param  {[MapData]} map_data     The MapData object
     * @param  {[object[]]} areas       areas array to merge
     */

    function merge_areas(map_data, areas) {
      var ar,
        index,
        map_areas = map_data.options.areas;

      if (areas) {
        $.each(areas, function (_, e) {
          // Issue #68 - ignore invalid data in areas array

          if (!e || !e.key) {
            return;
          }

          index = u.indexOfProp(map_areas, 'key', e.key);

          if (index >= 0) {
            $.extend(map_areas[index], e);
          } else {
            map_areas.push(e);
          }
          ar = map_data.getDataForKey(e.key);
          if (ar) {
            $.extend(ar.options, e);
          }
        });
      }
    }
    function merge_options(map_data, options) {
      var temp_opts = u.updateProps({}, options);
      delete temp_opts.areas;

      u.updateProps(map_data.options, temp_opts);

      merge_areas(map_data, options.areas);
      // refresh the area_option template
      u.updateProps(map_data.area_options, map_data.options);
    }

    // Most methods use the "Method" object which handles figuring out whether it's an image or area called and
    // parsing key parameters. The constructor wants:
    // this, the jQuery object
    // a function that is called when an image was passed (with a this context of the MapData)
    // a function that is called when an area was passed (with a this context of the AreaData)
    // options: first = true means only the first member of a jQuery object is handled
    //          key = the key parameters passed
    //          defaultReturn: a value to return other than the jQuery object (if its not chainable)
    //          args: the arguments
    // Returns a comma-separated list of user-selected areas. "staticState" areas are not considered selected for the purposes of this method.

    me.get = function (key) {
      var md = m.getMapData(this);
      if (!(md && md.complete)) {
        throw "Can't access data until binding complete.";
      }

      return new m.Method(
        this,
        function () {
          // map_data return
          return this.getSelected();
        },
        function () {
          return this.isSelected();
        },
        {
          name: 'get',
          args: arguments,
          key: key,
          first: true,
          allowAsync: true,
          defaultReturn: ''
        }
      ).go();
    };
    me.data = function (key) {
      return new m.Method(
        this,
        null,
        function () {
          return this;
        },
        { name: 'data', args: arguments, key: key }
      ).go();
    };

    // Set or return highlight state.
    //  $(img).mapster('highlight') -- return highlighted area key, or null if none
    //  $(area).mapster('highlight') -- highlight an area
    //  $(img).mapster('highlight','area_key') -- highlight an area
    //  $(img).mapster('highlight',false) -- remove highlight
    me.highlight = function (key) {
      return new m.Method(
        this,
        function () {
          if (key === false) {
            this.ensureNoHighlight();
          } else {
            var id = this.highlightId;
            return id >= 0 ? this.data[id].key : null;
          }
        },
        function () {
          this.highlight();
        },
        { name: 'highlight', args: arguments, key: key, first: true }
      ).go();
    };
    // Return the primary keys for an area or group key.
    // $(area).mapster('key')
    // includes all keys (not just primary keys)
    // $(area).mapster('key',true)
    // $(img).mapster('key','group-key')

    // $(img).mapster('key','group-key', true)
    me.keys = function (key, all) {
      var keyList = [],
        md = m.getMapData(this);

      if (!(md && md.complete)) {
        throw "Can't access data until binding complete.";
      }

      function addUniqueKeys(ad) {
        var areas,
          keys = [];
        if (!all) {
          keys.push(ad.key);
        } else {
          areas = ad.areas();
          $.each(areas, function (_, e) {
            keys = keys.concat(e.keys);
          });
        }
        $.each(keys, function (_, e) {
          if ($.inArray(e, keyList) < 0) {
            keyList.push(e);
          }
        });
      }

      if (!(md && md.complete)) {
        return '';
      }
      if (typeof key === 'string') {
        if (all) {
          addUniqueKeys(md.getDataForKey(key));
        } else {
          keyList = [md.getKeysForGroup(key)];
        }
      } else {
        all = key;
        this.each(function (_, e) {
          if (e.nodeName === 'AREA') {
            addUniqueKeys(md.getDataForArea(e));
          }
        });
      }
      return keyList.join(',');
    };
    me.select = function () {
      me.set.call(this, true);
    };
    me.deselect = function () {
      me.set.call(this, false);
    };

    /**
     * Select or unselect areas. Areas can be identified by a single string key, a comma-separated list of keys,
     * or an array of strings.
     *
     *
     * @param {boolean} selected Determines whether areas are selected or deselected
     * @param {string|string[]} key A string, comma-separated string, or array of strings indicating
     *                              the areas to select or deselect
     * @param {object} options Rendering options to apply when selecting an area
     */

    me.set = function (selected, key, options) {
      var lastMap,
        map_data,
        opts = options,
        key_list,
        area_list; // array of unique areas passed

      function setSelection(ar) {
        var newState = selected;
        if (ar) {
          switch (selected) {
            case true:
              ar.select(opts);
              break;
            case false:
              ar.deselect(true);
              break;
            default:
              newState = ar.toggle(opts);
              break;
          }
          return newState;
        }
      }
      function addArea(ar) {
        if (ar && $.inArray(ar, area_list) < 0) {
          area_list.push(ar);
          key_list += (key_list === '' ? '' : ',') + ar.key;
        }
      }
      // Clean up after a group that applied to the same map
      function finishSetForMap(map_data) {
        $.each(area_list, function (_, el) {
          setSelection(el);
        });
        if (!selected) {
          map_data.removeSelectionFinish();
        }
      }

      this.filter('img,area').each(function (_, e) {
        var keys;
        map_data = m.getMapData(e);

        if (map_data !== lastMap) {
          if (lastMap) {
            finishSetForMap(lastMap);
          }

          area_list = [];
          key_list = '';
        }

        if (map_data) {
          keys = '';
          if (e.nodeName.toUpperCase() === 'IMG') {
            if (!m.queueCommand(map_data, $(e), 'set', [selected, key, opts])) {
              if (key instanceof Array) {
                if (key.length) {
                  keys = key.join(',');
                }
              } else {
                keys = key;
              }

              if (keys) {
                $.each(u.split(keys), function (_, key) {
                  addArea(map_data.getDataForKey(key.toString()));
                  lastMap = map_data;
                });
              }
            }
          } else {
            opts = key;
            if (!m.queueCommand(map_data, $(e), 'set', [selected, opts])) {
              addArea(map_data.getDataForArea(e));
              lastMap = map_data;
            }
          }
        }
      });

      if (map_data) {
        finishSetForMap(map_data);
      }

      return this;
    };
    me.unbind = function (preserveState) {
      return new m.Method(
        this,
        function () {
          this.clearEvents();
          this.clearMapData(preserveState);
          removeMap(this);
        },
        null,
        { name: 'unbind', args: arguments }
      ).go();
    };

    // refresh options and update selection information.
    me.rebind = function (options) {
      return new m.Method(
        this,
        function () {
          var me = this;

          me.complete = false;
          me.configureOptions(options);
          me.bindImages().then(function () {
            me.buildDataset(true);
            me.complete = true;
            me.onConfigured();
          });
          //this.redrawSelections();
        },
        null,
        {
          name: 'rebind',
          args: arguments
        }
      ).go();
    };
    // get options. nothing or false to get, or "true" to get effective options (versus passed options)
    me.get_options = function (key, effective) {
      var eff = u.isBool(key) ? key : effective; // allow 2nd parm as "effective" when no key
      return new m.Method(
        this,
        function () {
          var opts = $.extend({}, this.options);
          if (eff) {
            opts.render_select = u.updateProps(
              {},
              m.render_defaults,
              opts,
              opts.render_select
            );

            opts.render_highlight = u.updateProps(
              {},
              m.render_defaults,
              opts,
              opts.render_highlight
            );
          }
          return opts;
        },
        function () {
          return eff ? this.effectiveOptions() : this.options;
        },
        {
          name: 'get_options',
          args: arguments,
          first: true,
          allowAsync: true,
          key: key
        }
      ).go();
    };

    // set options - pass an object with options to set,
    me.set_options = function (options) {
      return new m.Method(
        this,
        function () {
          merge_options(this, options);
        },
        null,
        {
          name: 'set_options',
          args: arguments
        }
      ).go();
    };
    me.unload = function () {
      var i;
      for (i = m.map_cache.length - 1; i >= 0; i--) {
        if (m.map_cache[i]) {
          me.unbind.call($(m.map_cache[i].image));
        }
      }
      me.graphics = null;
    };

    me.snapshot = function () {
      return new m.Method(
        this,
        function () {
          $.each(this.data, function (_, e) {
            e.selected = false;
          });

          this.base_canvas = this.graphics.createVisibleCanvas(this);
          $(this.image).before(this.base_canvas);
        },
        null,
        { name: 'snapshot' }
      ).go();
    };

    // do not queue this function

    me.state = function () {
      var md,
        result = null;
      $(this).each(function (_, e) {
        if (e.nodeName === 'IMG') {
          md = m.getMapData(e);
          if (md) {
            result = md.state();
          }
          return false;
        }
      });
      return result;
    };

    me.bind = function (options) {
      return this.each(function (_, e) {
        var img, map, usemap, md;

        // save ref to this image even if we can't access it yet. commands will be queued
        img = $(e);

        md = m.getMapData(e);

        // if already bound completely, do a total rebind

        if (md) {
          me.unbind.apply(img);
          if (!md.complete) {
            // will be queued
            return true;
          }
          md = null;
        }

        // ensure it's a valid image
        // jQuery bug with Opera, results in full-url#usemap being returned from jQuery's attr.
        // So use raw getAttribute instead.

        usemap = this.getAttribute('usemap');
        map = usemap && $('map[name="' + usemap.substr(1) + '"]');
        if (!(img.is('img') && usemap && map.length > 0)) {
          return true;
        }

        // sorry - your image must have border:0, things are too unpredictable otherwise.
        img.css('border', 0);

        if (!md) {
          md = new m.MapData(this, options);

          md.index = addMap(md);
          md.map = map;
          md.bindImages().then(function () {
            md.initialize();
          });
        }
      });
    };

    me.init = function (useCanvas) {
      var style, shapes;

      // for testing/debugging, use of canvas can be forced by initializing
      // manually with "true" or "false". But generally we test for it.

      m.hasCanvas = function () {
        if (!u.isBool(m.hasCanvas.value)) {
          m.hasCanvas.value = u.isBool(useCanvas) ? useCanvas : hasCanvas();
        }
        return m.hasCanvas.value;
      };

      m.hasVml = function () {
        if (!u.isBool(m.hasVml.value)) {
          // initialize VML the first time we detect its presence.
          var d = namespaces();

          if (d && !d.v) {
            d.add('v', 'urn:schemas-microsoft-com:vml');
            style = document.createStyleSheet();
            shapes = [
              'shape',
              'rect',
              'oval',
              'circ',
              'fill',
              'stroke',
              'imagedata',
              'group',
              'textbox'
            ];
            $.each(shapes, function (_, el) {
              style.addRule(
                'v\\:' + el,
                'behavior: url(#default#VML); antialias:true'
              );
            });
          }
          m.hasVml.value = hasVml();
        }

        return m.hasVml.value;
      };

      $.extend(m.defaults, m.render_defaults, m.shared_defaults);
      $.extend(m.area_defaults, m.render_defaults, m.shared_defaults);
    };
    me.test = function (obj) {
      return eval(obj);
    };
    return me;
  })();

  $.mapster.impl.init();
})(jQuery);

/* 
  graphics.js
  Graphics object handles all rendering.
*/

(function ($) {
  'use strict';

  var p,
    m = $.mapster,
    u = m.utils,
    canvasMethods,
    vmlMethods;

  /**
   * Implemenation to add each area in an AreaData object to the canvas
   * @param {Graphics} graphics The target graphics object
   * @param {AreaData} areaData The AreaData object (a collection of area elements and metadata)
   * @param {object} options Rendering options to apply when rendering this group of areas
   */
  function addShapeGroupImpl(graphics, areaData, options) {
    var me = graphics,
      md = me.map_data,
      isMask = options.isMask;

    // first get area options. Then override fade for selecting, and finally merge in the
    // "select" effect options.

    $.each(areaData.areas(), function (_, e) {
      options.isMask = isMask || (e.nohref && md.options.noHrefIsMask);
      me.addShape(e, options);
    });

    // it's faster just to manipulate the passed options isMask property and restore it, than to
    // copy the object each time

    options.isMask = isMask;
  }

  /**
   * Convert a hex value to decimal
   * @param  {string} hex A hexadecimal toString
   * @return {int} Integer represenation of the hex string
   */

  function hex_to_decimal(hex) {
    return Math.max(0, Math.min(parseInt(hex, 16), 255));
  }
  function css3color(color, opacity) {
    return (
      'rgba(' +
      hex_to_decimal(color.substr(0, 2)) +
      ',' +
      hex_to_decimal(color.substr(2, 2)) +
      ',' +
      hex_to_decimal(color.substr(4, 2)) +
      ',' +
      opacity +
      ')'
    );
  }
  /**
   * An object associated with a particular map_data instance to manage renderin.
   * @param {MapData} map_data The MapData object bound to this instance
   */

  m.Graphics = function (map_data) {
    //$(window).unload($.mapster.unload);
    // create graphics functions for canvas and vml browsers. usage:
    // 1) init with map_data, 2) call begin with canvas to be used (these are separate b/c may not require canvas to be specified
    // 3) call add_shape_to for each shape or mask, 4) call render() to finish

    var me = this;
    me.active = false;
    me.canvas = null;
    me.width = 0;
    me.height = 0;
    me.shapes = [];
    me.masks = [];
    me.map_data = map_data;
  };

  p = m.Graphics.prototype = {
    constructor: m.Graphics,

    /**
     * Initiate a graphics request for a canvas
     * @param  {Element} canvas The canvas element that is the target of this operation
     * @param  {string} [elementName] The name to assign to the element (VML only)
     */

    begin: function (canvas, elementName) {
      var c = $(canvas);

      this.elementName = elementName;
      this.canvas = canvas;

      this.width = c.width();
      this.height = c.height();
      this.shapes = [];
      this.masks = [];
      this.active = true;
    },

    /**
     * Add an area to be rendered to this canvas.
     * @param {MapArea} mapArea The MapArea object to render
     * @param {object} options An object containing any rendering options that should override the
     *                         defaults for the area
     */

    addShape: function (mapArea, options) {
      var addto = options.isMask ? this.masks : this.shapes;
      addto.push({ mapArea: mapArea, options: options });
    },

    /**
     * Create a canvas that is sized and styled for the MapData object
     * @param  {MapData} mapData The MapData object that will receive this new canvas
     * @return {Element} A canvas element
     */

    createVisibleCanvas: function (mapData) {
      return $(this.createCanvasFor(mapData))
        .addClass('mapster_el')
        .css(m.canvas_style)[0];
    },

    /**
     * Add a group of shapes from an AreaData object to the canvas
     *
     * @param {AreaData} areaData An AreaData object (a set of area elements)
     * @param {string} mode     The rendering mode, "select" or "highlight". This determines the target
     *                          canvas and which default options to use.
     * @param {striong} options  Rendering options
     */

    addShapeGroup: function (areaData, mode, options) {
      // render includeKeys first - because they could be masks
      var me = this,
        list,
        name,
        canvas,
        map_data = this.map_data,
        opts = areaData.effectiveRenderOptions(mode);

      if (options) {
        $.extend(opts, options);
      }

      if (mode === 'select') {
        name = 'static_' + areaData.areaId.toString();
        canvas = map_data.base_canvas;
      } else {
        canvas = map_data.overlay_canvas;
      }

      me.begin(canvas, name);

      if (opts.includeKeys) {
        list = u.split(opts.includeKeys);
        $.each(list, function (_, e) {
          var areaData = map_data.getDataForKey(e.toString());
          addShapeGroupImpl(
            me,
            areaData,
            areaData.effectiveRenderOptions(mode)
          );
        });
      }

      addShapeGroupImpl(me, areaData, opts);
      me.render();
      if (opts.fade) {
        // fading requires special handling for IE. We must access the fill elements directly. The fader also has to deal with
        // the "opacity" attribute (not css)

        u.fader(
          m.hasCanvas()
            ? canvas
            : $(canvas).find('._fill').not('.mapster_mask'),
          0,
          m.hasCanvas() ? 1 : opts.fillOpacity,
          opts.fadeDuration
        );
      }
    }

    // These prototype methods are implementation dependent
  };

  function noop() {}

  // configure remaining prototype methods for ie or canvas-supporting browser

  canvasMethods = {
    renderShape: function (context, mapArea, offset) {
      var i,
        c = mapArea.coords(null, offset);

      switch (mapArea.shape) {
        case 'rect':
        case 'rectangle':
          context.rect(c[0], c[1], c[2] - c[0], c[3] - c[1]);
          break;
        case 'poly':
        case 'polygon':
          context.moveTo(c[0], c[1]);

          for (i = 2; i < mapArea.length; i += 2) {
            context.lineTo(c[i], c[i + 1]);
          }
          context.lineTo(c[0], c[1]);
          break;
        case 'circ':
        case 'circle':
          context.arc(c[0], c[1], c[2], 0, Math.PI * 2, false);
          break;
      }
    },
    addAltImage: function (context, image, mapArea, options) {
      context.beginPath();

      this.renderShape(context, mapArea);
      context.closePath();
      context.clip();

      context.globalAlpha = options.altImageOpacity || options.fillOpacity;

      context.drawImage(
        image,
        0,
        0,
        mapArea.owner.scaleInfo.width,
        mapArea.owner.scaleInfo.height
      );
    },
    render: function () {
      // firefox 6.0 context.save() seems to be broken. to work around,  we have to draw the contents on one temp canvas,
      // the mask on another, and merge everything. ugh. fixed in 1.2.2. unfortunately this is a lot more code for masks,
      // but no other way around it that i can see.

      var maskCanvas,
        maskContext,
        me = this,
        md = me.map_data,
        hasMasks = me.masks.length,
        shapeCanvas = me.createCanvasFor(md),
        shapeContext = shapeCanvas.getContext('2d'),
        context = me.canvas.getContext('2d');

      if (hasMasks) {
        maskCanvas = me.createCanvasFor(md);
        maskContext = maskCanvas.getContext('2d');
        maskContext.clearRect(0, 0, maskCanvas.width, maskCanvas.height);

        $.each(me.masks, function (_, e) {
          maskContext.save();
          maskContext.beginPath();
          me.renderShape(maskContext, e.mapArea);
          maskContext.closePath();
          maskContext.clip();
          maskContext.lineWidth = 0;
          maskContext.fillStyle = '#000';
          maskContext.fill();
          maskContext.restore();
        });
      }

      $.each(me.shapes, function (_, s) {
        shapeContext.save();
        if (s.options.fill) {
          if (s.options.altImageId) {
            me.addAltImage(
              shapeContext,
              md.images[s.options.altImageId],
              s.mapArea,
              s.options
            );
          } else {
            shapeContext.beginPath();
            me.renderShape(shapeContext, s.mapArea);
            shapeContext.closePath();
            //shapeContext.clip();
            shapeContext.fillStyle = css3color(
              s.options.fillColor,
              s.options.fillOpacity
            );
            shapeContext.fill();
          }
        }
        shapeContext.restore();
      });

      // render strokes at end since masks get stroked too

      $.each(me.shapes.concat(me.masks), function (_, s) {
        var offset = s.options.strokeWidth === 1 ? 0.5 : 0;
        // offset applies only when stroke width is 1 and stroke would render between pixels.

        if (s.options.stroke) {
          shapeContext.save();
          shapeContext.strokeStyle = css3color(
            s.options.strokeColor,
            s.options.strokeOpacity
          );
          shapeContext.lineWidth = s.options.strokeWidth;

          shapeContext.beginPath();

          me.renderShape(shapeContext, s.mapArea, offset);
          shapeContext.closePath();
          shapeContext.stroke();
          shapeContext.restore();
        }
      });

      if (hasMasks) {
        // render the new shapes against the mask

        maskContext.globalCompositeOperation = 'source-out';
        maskContext.drawImage(shapeCanvas, 0, 0);

        // flatten into the main canvas
        context.drawImage(maskCanvas, 0, 0);
      } else {
        context.drawImage(shapeCanvas, 0, 0);
      }

      me.active = false;
      return me.canvas;
    },

    // create a canvas mimicing dimensions of an existing element
    createCanvasFor: function (md) {
      return $(
        '<canvas width="' +
          md.scaleInfo.width +
          '" height="' +
          md.scaleInfo.height +
          '"></canvas>'
      )[0];
    },
    clearHighlight: function () {
      var c = this.map_data.overlay_canvas;
      c.getContext('2d').clearRect(0, 0, c.width, c.height);
    },
    // Draw all items from selected_list to a new canvas, then swap with the old one. This is used to delete items when using canvases.
    refreshSelections: function () {
      var canvas_temp,
        map_data = this.map_data;
      // draw new base canvas, then swap with the old one to avoid flickering
      canvas_temp = map_data.base_canvas;

      map_data.base_canvas = this.createVisibleCanvas(map_data);
      $(map_data.base_canvas).hide();
      $(canvas_temp).before(map_data.base_canvas);

      map_data.redrawSelections();

      $(map_data.base_canvas).show();
      $(canvas_temp).remove();
    }
  };

  vmlMethods = {
    renderShape: function (mapArea, options, cssclass) {
      var me = this,
        fill,
        stroke,
        e,
        t_fill,
        el_name,
        el_class,
        template,
        c = mapArea.coords();
      el_name = me.elementName ? 'name="' + me.elementName + '" ' : '';
      el_class = cssclass ? 'class="' + cssclass + '" ' : '';

      t_fill =
        '<v:fill color="#' +
        options.fillColor +
        '" class="_fill" opacity="' +
        (options.fill ? options.fillOpacity : 0) +
        '" /><v:stroke class="_fill" opacity="' +
        options.strokeOpacity +
        '"/>';

      stroke = options.stroke
        ? ' strokeweight=' +
          options.strokeWidth +
          ' stroked="t" strokecolor="#' +
          options.strokeColor +
          '"'
        : ' stroked="f"';

      fill = options.fill ? ' filled="t"' : ' filled="f"';

      switch (mapArea.shape) {
        case 'rect':
        case 'rectangle':
          template =
            '<v:rect ' +
            el_class +
            el_name +
            fill +
            stroke +
            ' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:' +
            c[0] +
            'px;top:' +
            c[1] +
            'px;width:' +
            (c[2] - c[0]) +
            'px;height:' +
            (c[3] - c[1]) +
            'px;">' +
            t_fill +
            '</v:rect>';
          break;
        case 'poly':
        case 'polygon':
          template =
            '<v:shape ' +
            el_class +
            el_name +
            fill +
            stroke +
            ' coordorigin="0,0" coordsize="' +
            me.width +
            ',' +
            me.height +
            '" path="m ' +
            c[0] +
            ',' +
            c[1] +
            ' l ' +
            c.slice(2).join(',') +
            ' x e" style="zoom:1;margin:0;padding:0;display:block;position:absolute;top:0px;left:0px;width:' +
            me.width +
            'px;height:' +
            me.height +
            'px;">' +
            t_fill +
            '</v:shape>';
          break;
        case 'circ':
        case 'circle':
          template =
            '<v:oval ' +
            el_class +
            el_name +
            fill +
            stroke +
            ' style="zoom:1;margin:0;padding:0;display:block;position:absolute;left:' +
            (c[0] - c[2]) +
            'px;top:' +
            (c[1] - c[2]) +
            'px;width:' +
            c[2] * 2 +
            'px;height:' +
            c[2] * 2 +
            'px;">' +
            t_fill +
            '</v:oval>';
          break;
      }
      e = $(template);
      $(me.canvas).append(e);

      return e;
    },
    render: function () {
      var opts,
        me = this;

      $.each(this.shapes, function (_, e) {
        me.renderShape(e.mapArea, e.options);
      });

      if (this.masks.length) {
        $.each(this.masks, function (_, e) {
          opts = u.updateProps({}, e.options, {
            fillOpacity: 1,
            fillColor: e.options.fillColorMask
          });
          me.renderShape(e.mapArea, opts, 'mapster_mask');
        });
      }

      this.active = false;
      return this.canvas;
    },

    createCanvasFor: function (md) {
      var w = md.scaleInfo.width,
        h = md.scaleInfo.height;
      return $(
        '<var width="' +
          w +
          '" height="' +
          h +
          '" style="zoom:1;overflow:hidden;display:block;width:' +
          w +
          'px;height:' +
          h +
          'px;"></var>'
      )[0];
    },

    clearHighlight: function () {
      $(this.map_data.overlay_canvas).children().remove();
    },
    // remove single or all selections
    removeSelections: function (area_id) {
      if (area_id >= 0) {
        $(this.map_data.base_canvas)
          .find('[name="static_' + area_id.toString() + '"]')
          .remove();
      } else {
        $(this.map_data.base_canvas).children().remove();
      }
    }
  };

  // for all methods with two implemenatations, add a function that will automatically replace itself with the correct
  // method on first invocation

  $.each(
    [
      'renderShape',
      'addAltImage',
      'render',
      'createCanvasFor',
      'clearHighlight',
      'removeSelections',
      'refreshSelections'
    ],
    function (_, e) {
      p[e] = (function (method) {
        return function () {
          p[method] =
            (m.hasCanvas() ? canvasMethods[method] : vmlMethods[method]) ||
            noop;

          return p[method].apply(this, arguments);
        };
      })(e);
    }
  );
})(jQuery);

/* 
  mapimage.js
  The MapImage object, repesents an instance of a single bound imagemap
*/

(function ($) {
  'use strict';

  var m = $.mapster,
    u = m.utils,
    ap = [];
  /**
   * An object encapsulating all the images used by a MapData.
   */

  m.MapImages = function (owner) {
    this.owner = owner;
    this.clear();
  };

  m.MapImages.prototype = {
    constructor: m.MapImages,

    /* interface to make this array-like */

    slice: function () {
      return ap.slice.apply(this, arguments);
    },
    splice: function () {
      ap.slice.apply(this.status, arguments);
      var result = ap.slice.apply(this, arguments);
      return result;
    },

    /**
     * a boolean value indicates whether all images are done loading
     * @return {bool} true when all are done
     */
    complete: function () {
      return $.inArray(false, this.status) < 0;
    },

    /**
     * Save an image in the images array and return its index
     * @param  {Image} image An Image object
     * @return {int} the index of the image
     */

    _add: function (image) {
      var index = ap.push.call(this, image) - 1;
      this.status[index] = false;
      return index;
    },

    /**
     * Return the index of an Image within the images array
     * @param  {Image} img An Image
     * @return {int} the index within the array, or -1 if it was not found
     */

    indexOf: function (image) {
      return u.indexOf(this, image);
    },

    /**
     * Clear this object and reset it to its initial state after binding.
     */

    clear: function () {
      var me = this;

      if (me.ids && me.ids.length > 0) {
        $.each(me.ids, function (_, e) {
          delete me[e];
        });
      }

      /**
       * A list of the cross-reference IDs bound to this object
       * @type {string[]}
       */

      me.ids = [];

      /**
       * Length property for array-like behavior, set to zero when initializing. Array prototype
       * methods will update it after that.
       *
       * @type {int}
       */

      me.length = 0;

      /**
       * the loaded status of the corresponding image
       * @type {boolean[]}
       */

      me.status = [];

      // actually erase the images

      me.splice(0);
    },

    /**
     * Bind an image to the map and add it to the queue to be loaded; return an ID that
     * can be used to reference the
     *
     * @param {Image|string} image An Image object or a URL to an image
     * @param {string} [id] An id to refer to this image
     * @returns {int} an ID referencing the index of the image object in
     *                map_data.images
     */

    add: function (image, id) {
      var index,
        src,
        me = this;

      if (!image) {
        return;
      }

      if (typeof image === 'string') {
        src = image;
        image = me[src];
        if (typeof image === 'object') {
          return me.indexOf(image);
        }

        image = $('<img />').addClass('mapster_el').hide();

        index = me._add(image[0]);

        image
          .on('load.mapster', function (e) {
            me.imageLoaded.call(me, e);
          })
          .on('error.mapster', function (e) {
            me.imageLoadError.call(me, e);
          });

        image.attr('src', src);
      } else {
        // use attr because we want the actual source, not the resolved path the browser will return directly calling image.src

        index = me._add($(image)[0]);
      }
      if (id) {
        if (this[id]) {
          throw (
            id + ' is already used or is not available as an altImage alias.'
          );
        }
        me.ids.push(id);
        me[id] = me[index];
      }
      return index;
    },

    /**
     * Bind the images in this object,
     * @return {Promise} a promise that resolves when the images have finished loading
     */

    bind: function () {
      var me = this,
        promise,
        triesLeft = me.owner.options.configTimeout / 200,
        /* A recursive function to continue checking that the images have been
               loaded until a timeout has elapsed */

        check = function () {
          var i;

          // refresh status of images

          i = me.length;

          while (i-- > 0) {
            if (!me.isLoaded(i)) {
              break;
            }
          }

          // check to see if every image has already been loaded

          if (me.complete()) {
            me.resolve();
          } else {
            // to account for failure of onLoad to fire in rare situations
            if (triesLeft-- > 0) {
              me.imgTimeout = window.setTimeout(function () {
                check.call(me, true);
              }, 50);
            } else {
              me.imageLoadError.call(me);
            }
          }
        };

      promise = me.deferred = u.defer();

      check();
      return promise;
    },

    resolve: function () {
      var me = this,
        resolver = me.deferred;

      if (resolver) {
        // Make a copy of the resolver before calling & removing it to ensure
        // it is not called twice
        me.deferred = null;
        resolver.resolve();
      }
    },

    /**
     * Event handler for image onload
     * @param  {object} e jQuery event data
     */

    imageLoaded: function (e) {
      var me = this,
        index = me.indexOf(e.target);

      if (index >= 0) {
        me.status[index] = true;
        if ($.inArray(false, me.status) < 0) {
          me.resolve();
        }
      }
    },

    /**
     * Event handler for onload error
     * @param  {object} e jQuery event data
     */

    imageLoadError: function (e) {
      clearTimeout(this.imgTimeout);
      this.triesLeft = 0;
      var err = e
        ? 'The image ' + e.target.src + ' failed to load.'
        : 'The images never seemed to finish loading. You may just need to increase the configTimeout if images could take a long time to load.';
      throw err;
    },
    /**
     * Test if the image at specificed index has finished loading
     * @param  {int}  index The image index
     * @return {boolean} true if loaded, false if not
     */

    isLoaded: function (index) {
      var img,
        me = this,
        status = me.status;

      if (status[index]) {
        return true;
      }
      img = me[index];

      if (typeof img.complete !== 'undefined') {
        status[index] = img.complete;
      } else {
        status[index] = !!u.imgWidth(img);
      }
      // if complete passes, the image is loaded, but may STILL not be available because of stuff like adblock.
      // make sure it is.

      return status[index];
    }
  };
})(jQuery);

/*
  mapdata.js
  The MapData object, repesents an instance of a single bound imagemap
*/

(function ($) {
  'use strict';

  var m = $.mapster,
    u = m.utils;

  /**
   * Set default values for MapData object properties
   * @param  {MapData} me The MapData object
   */

  function initializeDefaults(me) {
    $.extend(me, {
      complete: false, // (bool)    when configuration is complete
      map: null, // ($)      the image map
      base_canvas: null, // (canvas|var)  where selections are rendered
      overlay_canvas: null, // (canvas|var)  where highlights are rendered
      commands: [], // {}        commands that were run before configuration was completed (b/c images weren't loaded)
      data: [], // MapData[] area groups
      mapAreas: [], // MapArea[] list. AreaData entities contain refs to this array, so options are stored with each.
      _xref: {}, // (int)      xref of mapKeys to data[]
      highlightId: -1, // (int)      the currently highlighted element.
      currentAreaId: -1,
      _tooltip_events: [], // {}         info on events we bound to a tooltip container, so we can properly unbind them
      scaleInfo: null, // {}         info about the image size, scaling, defaults
      index: -1, // index of this in map_cache - so we have an ID to use for wraper div
      activeAreaEvent: null,
      autoResizeTimer: null // tracks autoresize timer based on options.autoResizeDelay
    });
  }

  /**
   * Return an array of all image-containing options from an options object;
   * that is, containers that may have an "altImage" property
   *
   * @param  {object} obj     An options object
   * @return {object[]}       An array of objects
   */
  function getOptionImages(obj) {
    return [obj, obj.render_highlight, obj.render_select];
  }

  /**
   * Parse all the altImage references, adding them to the library so they can be preloaded
   * and aliased.
   *
   * @param  {MapData} me The MapData object on which to operate
   */
  function configureAltImages(me) {
    var opts = me.options,
      mi = me.images;

    // add alt images

    if (m.hasCanvas()) {
      // map altImage library first

      $.each(opts.altImages || {}, function (i, e) {
        mi.add(e, i);
      });

      // now find everything else

      $.each([opts].concat(opts.areas), function (_, e) {
        $.each(getOptionImages(e), function (_, e2) {
          if (e2 && e2.altImage) {
            e2.altImageId = mi.add(e2.altImage);
          }
        });
      });
    }

    // set area_options
    me.area_options = u.updateProps(
      {}, // default options for any MapArea
      m.area_defaults,
      opts
    );
  }

  /**
   * Queue a mouse move action based on current delay settings
   * (helper for mouseover/mouseout handlers)
   *
   * @param  {MapData}    me       The MapData context
   * @param  {number}     delay    The number of milliseconds to delay the action
   * @param  {AreaData}   area     AreaData affected
   * @param  {Deferred}   deferred A deferred object to return (instead of a new one)
   * @return {Promise}    A promise that resolves when the action is completed
   */
  function queueMouseEvent(me, delay, area, deferred) {
    deferred = deferred || u.when.defer();

    function cbFinal(areaId) {
      if (me.currentAreaId !== areaId && me.highlightId >= 0) {
        deferred.resolve({ completeAction: true });
      }
    }
    if (me.activeAreaEvent) {
      window.clearTimeout(me.activeAreaEvent);
      me.activeAreaEvent = 0;
    }
    if (delay < 0) {
      deferred.resolve({ completeAction: false });
    } else {
      if (area.owner.currentAction || delay) {
        me.activeAreaEvent = window.setTimeout(
          (function () {
            return function () {
              queueMouseEvent(me, 0, area, deferred);
            };
          })(area),
          delay || 100
        );
      } else {
        cbFinal(area.areaId);
      }
    }
    return deferred;
  }

  function shouldNavigateTo(href) {
    return !!href && href !== '#';
  }

  /**
   * Mousedown event. This is captured only to prevent browser from drawing an outline around an
   * area when it's clicked.
   *
   * @param  {EventData} e jQuery event data
   */

  function mousedown(e) {
    if (!m.hasCanvas()) {
      this.blur();
    }
    e.preventDefault();
  }

  /**
   * Mouseover event. Handle highlight rendering and client callback on mouseover
   *
   * @param  {MapData} me The MapData context
   * @param  {EventData} e jQuery event data
   * @return {[type]}   [description]
   */

  function mouseover(me, e) {
    var arData = me.getAllDataForArea(this),
      ar = arData.length ? arData[0] : null;

    // mouseover events are ignored entirely while resizing, though we do care about mouseout events
    // and must queue the action to keep things clean.

    if (!ar || ar.isNotRendered() || ar.owner.currentAction) {
      return;
    }

    if (me.currentAreaId === ar.areaId) {
      return;
    }
    if (me.highlightId !== ar.areaId) {
      me.clearEffects();

      ar.highlight();

      if (me.options.showToolTip) {
        $.each(arData, function (_, e) {
          if (e.effectiveOptions().toolTip) {
            e.showToolTip();
          }
        });
      }
    }

    me.currentAreaId = ar.areaId;

    if (u.isFunction(me.options.onMouseover)) {
      me.options.onMouseover.call(this, {
        e: e,
        options: ar.effectiveOptions(),
        key: ar.key,
        selected: ar.isSelected()
      });
    }
  }

  /**
   * Mouseout event.
   *
   * @param  {MapData} me The MapData context
   * @param  {EventData} e jQuery event data
   * @return {[type]}   [description]
   */

  function mouseout(me, e) {
    var newArea,
      ar = me.getDataForArea(this),
      opts = me.options;

    if (me.currentAreaId < 0 || !ar) {
      return;
    }

    newArea = me.getDataForArea(e.relatedTarget);

    if (newArea === ar) {
      return;
    }

    me.currentAreaId = -1;
    ar.area = null;

    queueMouseEvent(me, opts.mouseoutDelay, ar).then(function (result) {
      if (!result.completeAction) {
        return;
      }
      me.clearEffects();
    });

    if (u.isFunction(opts.onMouseout)) {
      opts.onMouseout.call(this, {
        e: e,
        options: opts,
        key: ar.key,
        selected: ar.isSelected()
      });
    }
  }

  /**
   * Clear any active tooltip or highlight
   *
   * @param  {MapData} me The MapData context
   * @param  {EventData} e jQuery event data
   * @return {[type]}   [description]
   */

  function clearEffects(me) {
    var opts = me.options;

    me.ensureNoHighlight();

    if (
      opts.toolTipClose &&
      $.inArray('area-mouseout', opts.toolTipClose) >= 0 &&
      me.activeToolTip
    ) {
      me.clearToolTip();
    }
  }

  /**
   * Mouse click event handler
   *
   * @param  {MapData} me The MapData context
   * @param  {EventData} e jQuery event data
   * @return {[type]}   [description]
   */

  function click(me, e) {
    var list,
      list_target,
      newSelectionState,
      canChangeState,
      cbResult,
      that = this,
      ar = me.getDataForArea(this),
      opts = me.options,
      navDetails,
      areaOpts;

    function navigateTo(mode, href, target) {
      switch (mode) {
        // if no target is specified, use legacy
        // behavior and change current window
        case 'open':
          window.open(href, target || '_self');
          return;

        // default legacy behavior of ImageMapster
        default:
          window.location.href = href;
          return;
      }
    }

    function getNavDetails(ar, mode, defaultHref) {
      if (mode === 'open') {
        var elHref = $(ar.area).attr('href'),
          useEl = shouldNavigateTo(elHref);

        return {
          href: useEl ? elHref : ar.href,
          target: useEl ? $(ar.area).attr('target') : ar.hrefTarget
        };
      }

      return {
        href: defaultHref
      };
    }

    function clickArea(ar) {
      var target;
      canChangeState =
        ar.isSelectable() && (ar.isDeselectable() || !ar.isSelected());

      if (canChangeState) {
        newSelectionState = !ar.isSelected();
      } else {
        newSelectionState = ar.isSelected();
      }

      list_target = m.getBoundList(opts, ar.key);

      if (u.isFunction(opts.onClick)) {
        cbResult = opts.onClick.call(that, {
          e: e,
          listTarget: list_target,
          key: ar.key,
          selected: newSelectionState
        });

        if (u.isBool(cbResult)) {
          if (!cbResult) {
            return false;
          }
          target = getNavDetails(
            ar,
            opts.navigateMode,
            $(ar.area).attr('href')
          );
          if (shouldNavigateTo(target.href)) {
            navigateTo(opts.navigateMode, target.href, target.target);
            return false;
          }
        }
      }

      if (canChangeState) {
        ar.toggle();
      }
    }

    mousedown.call(this, e);

    navDetails = getNavDetails(ar, opts.navigateMode, ar.href);
    if (opts.clickNavigate && shouldNavigateTo(navDetails.href)) {
      navigateTo(opts.navigateMode, navDetails.href, navDetails.target);
      return;
    }

    if (ar && !ar.owner.currentAction) {
      opts = me.options;
      clickArea(ar);
      areaOpts = ar.effectiveOptions();
      if (areaOpts.includeKeys) {
        list = u.split(areaOpts.includeKeys);
        $.each(list, function (_, e) {
          var ar = me.getDataForKey(e.toString());
          if (!ar.options.isMask) {
            clickArea(ar);
          }
        });
      }
    }
  }

  /**
   * Prototype for a MapData object, representing an ImageMapster bound object
   * @param {Element} image   an IMG element
   * @param {object} options  ImageMapster binding options
   */
  m.MapData = function (image, options) {
    var me = this;

    // (Image)  main map image

    me.image = image;

    me.images = new m.MapImages(me);
    me.graphics = new m.Graphics(me);

    // save the initial style of the image for unbinding. This is problematic, chrome
    // duplicates styles when assigning, and cssText is apparently not universally supported.
    // Need to do something more robust to make unbinding work universally.

    me.imgCssText = image.style.cssText || null;

    initializeDefaults(me);

    me.configureOptions(options);

    // create context-bound event handlers from our private functions

    me.mouseover = function (e) {
      mouseover.call(this, me, e);
    };
    me.mouseout = function (e) {
      mouseout.call(this, me, e);
    };
    me.click = function (e) {
      click.call(this, me, e);
    };
    me.clearEffects = function (e) {
      clearEffects.call(this, me, e);
    };
    me.mousedown = function (e) {
      mousedown.call(this, e);
    };
  };

  m.MapData.prototype = {
    constructor: m.MapData,

    /**
     * Set target.options from defaults + options
     * @param  {[type]} target      The target
     * @param  {[type]} options     The options to merge
     */

    configureOptions: function (options) {
      this.options = u.updateProps({}, m.defaults, options);
    },

    /**
     * Ensure all images are loaded
     * @return {Promise} A promise that resolves when the images have finished loading (or fail)
     */

    bindImages: function () {
      var me = this,
        mi = me.images;

      // reset the images if this is a rebind

      if (mi.length > 2) {
        mi.splice(2);
      } else if (mi.length === 0) {
        // add the actual main image
        mi.add(me.image);
        // will create a duplicate of the main image, we need this to get raw size info
        mi.add(me.image.src);
      }

      configureAltImages(me);

      return me.images.bind();
    },

    /**
     * Test whether an async action is currently in progress
     * @return {Boolean} true or false indicating state
     */

    isActive: function () {
      return !this.complete || this.currentAction;
    },

    /**
     * Return an object indicating the various states. This isn't really used by
     * production code.
     *
     * @return {object} An object with properties for various states
     */

    state: function () {
      return {
        complete: this.complete,
        resizing: this.currentAction === 'resizing',
        zoomed: this.zoomed,
        zoomedArea: this.zoomedArea,
        scaleInfo: this.scaleInfo
      };
    },

    /**
     * Get a unique ID for the wrapper of this imagemapster
     * @return {string} A string that is unique to this image
     */

    wrapId: function () {
      return 'mapster_wrap_' + this.index;
    },
    instanceEventNamespace: function () {
      return '.mapster.' + this.wrapId();
    },
    _idFromKey: function (key) {
      return typeof key === 'string' &&
        Object.prototype.hasOwnProperty.call(this._xref, key)
        ? this._xref[key]
        : -1;
    },

    /**
     * Return a comma-separated string of all selected keys
     * @return {string} CSV of all keys that are currently selected
     */

    getSelected: function () {
      var result = '';
      $.each(this.data, function (_, e) {
        if (e.isSelected()) {
          result += (result ? ',' : '') + this.key;
        }
      });
      return result;
    },

    /**
     * Get an array of MapAreas associated with a specific AREA based on the keys for that area
     * @param  {Element} area   An HTML AREA
     * @param  {number} atMost  A number limiting the number of areas to be returned (typically 1 or 0 for no limit)
     * @return {MapArea[]}      Array of MapArea objects
     */

    getAllDataForArea: function (area, atMost) {
      var i,
        ar,
        result,
        me = this,
        key = $(area).filter('area').attr(me.options.mapKey);

      if (key) {
        result = [];
        key = u.split(key);

        for (i = 0; i < (atMost || key.length); i++) {
          ar = me.data[me._idFromKey(key[i])];
          if (ar) {
            ar.area = area.length ? area[0] : area;
            // set the actual area moused over/selected
            // TODO: this is a brittle model for capturing which specific area - if this method was not used,
            // ar.area could have old data. fix this.
            result.push(ar);
          }
        }
      }

      return result;
    },
    getDataForArea: function (area) {
      var ar = this.getAllDataForArea(area, 1);
      return ar ? ar[0] || null : null;
    },
    getDataForKey: function (key) {
      return this.data[this._idFromKey(key)];
    },

    /**
     * Get the primary keys associated with an area group.
     * If this is a primary key, it will be returned.
     *
     * @param  {string key An area key
     * @return {string} A CSV of area keys
     */

    getKeysForGroup: function (key) {
      var ar = this.getDataForKey(key);

      return !ar
        ? ''
        : ar.isPrimary
        ? ar.key
        : this.getPrimaryKeysForMapAreas(ar.areas()).join(',');
    },

    /**
     * given an array of MapArea object, return an array of its unique primary keys
     * @param  {MapArea[]} areas The areas to analyze
     * @return {string[]} An array of unique primary keys
     */

    getPrimaryKeysForMapAreas: function (areas) {
      var keys = [];
      $.each(areas, function (_, e) {
        if ($.inArray(e.keys[0], keys) < 0) {
          keys.push(e.keys[0]);
        }
      });
      return keys;
    },
    getData: function (obj) {
      if (typeof obj === 'string') {
        return this.getDataForKey(obj);
      } else if ((obj && obj.mapster) || u.isElement(obj)) {
        return this.getDataForArea(obj);
      } else {
        return null;
      }
    },
    // remove highlight if present, raise event
    ensureNoHighlight: function () {
      var ar;
      if (this.highlightId >= 0) {
        this.graphics.clearHighlight();
        ar = this.data[this.highlightId];
        ar.changeState('highlight', false);
        this.setHighlightId(-1);
      }
    },
    setHighlightId: function (id) {
      this.highlightId = id;
    },

    /**
     * Clear all active selections on this map
     */

    clearSelections: function () {
      $.each(this.data, function (_, e) {
        if (e.selected) {
          e.deselect(true);
        }
      });
      this.removeSelectionFinish();
    },

    /**
     * Set area options from an array of option data.
     *
     * @param {object[]} areas An array of objects containing area-specific options
     */

    setAreaOptions: function (areas) {
      var i, area_options, ar;
      areas = areas || [];

      // refer by: map_data.options[map_data.data[x].area_option_id]

      for (i = areas.length - 1; i >= 0; i--) {
        area_options = areas[i];
        if (area_options) {
          ar = this.getDataForKey(area_options.key);
          if (ar) {
            u.updateProps(ar.options, area_options);

            // TODO: will not deselect areas that were previously selected, so this only works
            // for an initial bind.

            if (u.isBool(area_options.selected)) {
              ar.selected = area_options.selected;
            }
          }
        }
      }
    },
    // keys: a comma-separated list
    drawSelections: function (keys) {
      var i,
        key_arr = u.asArray(keys);

      for (i = key_arr.length - 1; i >= 0; i--) {
        this.data[key_arr[i]].drawSelection();
      }
    },
    redrawSelections: function () {
      $.each(this.data, function (_, e) {
        if (e.isSelectedOrStatic()) {
          e.drawSelection();
        }
      });
    },
    // Causes changes to the bound list based on the user action (select or deselect)
    // area: the jQuery area object
    // returns the matching elements from the bound list for the first area passed
    // (normally only one should be passed, but a list can be passed)
    setBoundListProperties: function (opts, target, selected) {
      target.each(function (_, e) {
        if (opts.listSelectedClass) {
          if (selected) {
            $(e).addClass(opts.listSelectedClass);
          } else {
            $(e).removeClass(opts.listSelectedClass);
          }
        }
        if (opts.listSelectedAttribute) {
          $(e).prop(opts.listSelectedAttribute, selected);
        }
      });
    },
    clearBoundListProperties: function (opts) {
      var me = this;
      if (!opts.boundList) {
        return;
      }
      me.setBoundListProperties(opts, opts.boundList, false);
    },
    refreshBoundList: function (opts) {
      var me = this;
      me.clearBoundListProperties(opts);
      me.setBoundListProperties(
        opts,
        m.getBoundList(opts, me.getSelected()),
        true
      );
    },
    setBoundList: function (opts) {
      var me = this,
        sorted_list = me.data.slice(0),
        sort_func;
      if (opts.sortList) {
        if (opts.sortList === 'desc') {
          sort_func = function (a, b) {
            return a === b ? 0 : a > b ? -1 : 1;
          };
        } else {
          sort_func = function (a, b) {
            return a === b ? 0 : a < b ? -1 : 1;
          };
        }

        sorted_list.sort(function (a, b) {
          a = a.value;
          b = b.value;
          return sort_func(a, b);
        });
      }
      me.options.boundList = opts.onGetList.call(me.image, sorted_list);
    },
    ///called when images are done loading
    initialize: function () {
      var imgCopy,
        base_canvas,
        overlay_canvas,
        wrap,
        parentId,
        css,
        i,
        size,
        img,
        scale,
        me = this,
        opts = me.options;

      if (me.complete) {
        return;
      }

      img = $(me.image);

      parentId = img.parent().attr('id');

      // create a div wrapper only if there's not already a wrapper, otherwise, own it

      if (
        parentId &&
        parentId.length >= 12 &&
        parentId.substring(0, 12) === 'mapster_wrap'
      ) {
        wrap = img.parent();
        wrap.attr('id', me.wrapId());
      } else {
        wrap = $('<div id="' + me.wrapId() + '"></div>');

        if (opts.wrapClass) {
          if (opts.wrapClass === true) {
            wrap.addClass(img[0].className);
          } else {
            wrap.addClass(opts.wrapClass);
          }
        }
      }
      me.wrapper = wrap;

      // me.images[1] is the copy of the original image. It should be loaded & at its native size now so we can obtain the true
      // width & height. This is needed to scale the imagemap if not being shown at its native size. It is also needed purely
      // to finish binding in case the original image was not visible. It can be impossible in some browsers to obtain the
      // native size of a hidden image.

      me.scaleInfo = scale = u.scaleMap(
        me.images[0],
        me.images[1],
        opts.scaleMap
      );

      me.base_canvas = base_canvas = me.graphics.createVisibleCanvas(me);
      me.overlay_canvas = overlay_canvas = me.graphics.createVisibleCanvas(me);

      // Now we got what we needed from the copy -clone from the original image again to make sure any other attributes are copied
      imgCopy = $(me.images[1])
        .addClass('mapster_el ' + me.images[0].className)
        .attr({ id: null, usemap: null });

      size = u.size(me.images[0]);

      if (size.complete) {
        imgCopy.css({
          width: size.width,
          height: size.height
        });
      }

      me.buildDataset();

      // now that we have processed all the areas, set css for wrapper, scale map if needed

      css = $.extend(
        {
          display: 'block',
          position: 'relative',
          padding: 0
        },
        opts.enableAutoResizeSupport === true
          ? {}
          : {
              width: scale.width,
              height: scale.height
            }
      );

      if (opts.wrapCss) {
        $.extend(css, opts.wrapCss);
      }
      // if we were rebinding with an existing wrapper, the image will aready be in it
      if (img.parent()[0] !== me.wrapper[0]) {
        img.before(me.wrapper);
      }

      wrap.css(css);

      // move all generated images into the wrapper for easy removal later

      $(me.images.slice(2)).hide();
      for (i = 1; i < me.images.length; i++) {
        wrap.append(me.images[i]);
      }

      //me.images[1].style.cssText = me.image.style.cssText;

      wrap
        .append(base_canvas)
        .append(overlay_canvas)
        .append(img.css(m.canvas_style));

      // images[0] is the original image with map, images[1] is the copy/background that is visible

      u.setOpacity(me.images[0], 0);
      $(me.images[1]).show();

      u.setOpacity(me.images[1], 1);

      me.complete = true;
      me.processCommandQueue();

      if (opts.enableAutoResizeSupport === true) {
        me.configureAutoResize();
      }

      me.onConfigured();
    },

    onConfigured: function () {
      var me = this,
        $img = $(me.image),
        opts = me.options;

      if (opts.onConfigured && typeof opts.onConfigured === 'function') {
        opts.onConfigured.call($img, true);
      }
    },

    // when rebind is true, the MapArea data will not be rebuilt.
    buildDataset: function (rebind) {
      var sel,
        areas,
        j,
        area_id,
        $area,
        area,
        curKey,
        mapArea,
        key,
        keys,
        mapAreaId,
        group_value,
        dataItem,
        href,
        me = this,
        opts = me.options,
        default_group;

      function addAreaData(key, value) {
        var dataItem = new m.AreaData(me, key, value);
        dataItem.areaId = me._xref[key] = me.data.push(dataItem) - 1;
        return dataItem.areaId;
      }

      me._xref = {};
      me.data = [];
      if (!rebind) {
        me.mapAreas = [];
      }

      default_group = !opts.mapKey;
      if (default_group) {
        opts.mapKey = 'data-mapster-key';
      }

      // the [attribute] selector is broken on old IE with jQuery. hasVml() is a quick and dirty
      // way to test for that

      sel = m.hasVml()
        ? 'area'
        : default_group
        ? 'area[coords]'
        : 'area[' + opts.mapKey + ']';

      areas = $(me.map).find(sel).off('.mapster');

      for (mapAreaId = 0; mapAreaId < areas.length; mapAreaId++) {
        area_id = 0;
        area = areas[mapAreaId];
        $area = $(area);

        // skip areas with no coords - selector broken for older ie
        if (!area.coords) {
          continue;
        }
        // Create a key if none was assigned by the user

        if (default_group) {
          curKey = String(mapAreaId);
          $area.attr('data-mapster-key', curKey);
        } else {
          curKey = area.getAttribute(opts.mapKey);
        }

        // conditions for which the area will be bound to mouse events
        // only bind to areas that don't have nohref. ie 6&7 cannot detect the presence of nohref, so we have to also not bind if href is missing.

        if (rebind) {
          mapArea = me.mapAreas[$area.data('mapster') - 1];
          mapArea.configure(curKey);
          mapArea.areaDataXref = [];
        } else {
          mapArea = new m.MapArea(me, area, curKey);
          me.mapAreas.push(mapArea);
        }

        keys = mapArea.keys; // converted to an array by mapArea

        // Iterate through each mapKey assigned to this area
        for (j = keys.length - 1; j >= 0; j--) {
          key = keys[j];

          if (opts.mapValue) {
            group_value = $area.attr(opts.mapValue);
          }
          if (default_group) {
            // set an attribute so we can refer to the area by index from the DOM object if no key
            area_id = addAreaData(me.data.length, group_value);
            dataItem = me.data[area_id];
            dataItem.key = key = area_id.toString();
          } else {
            area_id = me._xref[key];
            if (area_id >= 0) {
              dataItem = me.data[area_id];
              if (group_value && !me.data[area_id].value) {
                dataItem.value = group_value;
              }
            } else {
              area_id = addAreaData(key, group_value);
              dataItem = me.data[area_id];
              dataItem.isPrimary = j === 0;
            }
          }
          mapArea.areaDataXref.push(area_id);
          dataItem.areasXref.push(mapAreaId);
        }

        href = $area.attr('href');
        if (shouldNavigateTo(href) && !dataItem.href) {
          dataItem.href = href;
          dataItem.hrefTarget = $area.attr('target');
        }

        if (!mapArea.nohref) {
          $area
            .on('click.mapster', me.click)
            .on(
              'mouseover.mapster touchstart.mapster.noPreventDefault',
              me.mouseover
            )
            .on(
              'mouseout.mapster touchend.mapster.noPreventDefault',
              me.mouseout
            )
            .on('mousedown.mapster', me.mousedown);
        }

        // store an ID with each area.
        $area.data('mapster', mapAreaId + 1);
      }

      // TODO listenToList
      //            if (opts.listenToList && opts.nitG) {
      //                opts.nitG.bind('click.mapster', event_hooks[map_data.hooks_index].listclick_hook);
      //            }

      // populate areas from config options
      me.setAreaOptions(opts.areas);
      if (opts.onGetList) {
        me.setBoundList(opts);
      }

      if (opts.boundList && opts.boundList.length > 0) {
        me.refreshBoundList(opts);
      }

      if (rebind) {
        me.graphics.removeSelections();
        me.graphics.refreshSelections();
      } else {
        me.redrawSelections();
      }
    },
    processCommandQueue: function () {
      var cur,
        me = this;
      while (!me.currentAction && me.commands.length) {
        cur = me.commands[0];
        me.commands.splice(0, 1);
        m.impl[cur.command].apply(cur.that, cur.args);
      }
    },
    clearEvents: function () {
      $(this.map).find('area').off('.mapster');
      $(this.images).off('.mapster');
      $(window).off(this.instanceEventNamespace());
      $(window.document).off(this.instanceEventNamespace());
    },
    _clearCanvases: function (preserveState) {
      // remove the canvas elements created
      if (!preserveState) {
        $(this.base_canvas).remove();
      }
      $(this.overlay_canvas).remove();
    },
    clearMapData: function (preserveState) {
      var me = this;
      this._clearCanvases(preserveState);

      // release refs to DOM elements
      $.each(this.data, function (_, e) {
        e.reset();
      });
      this.data = null;
      if (!preserveState) {
        // get rid of everything except the original image
        this.image.style.cssText = this.imgCssText;
        $(this.wrapper).before(this.image).remove();
      }

      me.images.clear();

      if (me.autoResizeTimer) {
        clearTimeout(me.autoResizeTimer);
      }
      me.autoResizeTimer = null;
      this.image = null;
      u.ifFunction(this.clearToolTip, this);
    },

    // Compelete cleanup process for deslecting items. Called after a batch operation, or by AreaData for single
    // operations not flagged as "partial"

    removeSelectionFinish: function () {
      var g = this.graphics;

      g.refreshSelections();
      // do not call ensure_no_highlight- we don't really want to unhilight it, just remove the effect
      g.clearHighlight();
    }
  };
})(jQuery);

/* areadata.js
   AreaData and MapArea protoypes
*/

(function ($) {
  'use strict';

  var m = $.mapster,
    u = m.utils;

  function optsAreEqual(opts1, opts2) {
    // deep compare is not trivial and current testing framework
    // doesn't provide a way to detect this accurately so only
    // implementing basic compare at this time.
    // TODO: Implement deep obj compare or for perf reasons shallow
    //       with a short-circuit if deep is required for full compare
    //       since config options should only require shallow
    return opts1 === opts2;
  }

  /**
   * Update selected state of this area
   *
   * @param {boolean} selected Determines whether areas are selected or deselected
   */
  function updateSelected(selected) {
    var me = this,
      prevSelected = me.selected;

    me.selected = selected;
    me.staticStateOverridden = u.isBool(me.effectiveOptions().staticState)
      ? true
      : false;

    return prevSelected !== selected;
  }

  /**
   * Select this area
   *
   * @param {AreaData} me  AreaData context
   * @param {object} options Options for rendering the selection
   */
  function select(options) {
    function buildOptions() {
      // map the altImageId if an altimage was passed
      return $.extend(me.effectiveRenderOptions('select'), options, {
        altImageId: o.images.add(options.altImage)
      });
    }

    var me = this,
      o = me.owner,
      hasOptions = !$.isEmptyObject(options),
      newOptsCache = hasOptions ? buildOptions() : null,
      // Per docs, options changed via set_options for an area that is
      // already selected will not be reflected until the next time
      // the area becomes selected.
      changeOptions = hasOptions
        ? !optsAreEqual(me.optsCache, newOptsCache)
        : false,
      selectedHasChanged = false,
      isDrawn = me.isSelectedOrStatic();

    // This won't clear staticState === true areas that have not been overridden via API set/select/deselect.
    // This could be optimized to only clear if we are the only one selected.  However, there are scenarios
    // that do not respect singleSelect (e.g. initialization) so we force clear if there should only be one.
    // TODO: Only clear if we aren't the only one selected (depends on #370)
    if (o.options.singleSelect) {
      o.clearSelections();
      // we may (staticState === true)  or may not still be visible
      isDrawn = me.isSelectedOrStatic();
    }

    if (changeOptions) {
      me.optsCache = newOptsCache;
    }

    // Update before we start drawing for methods
    // that rely on internal selected value.
    // Force update because area can be selected
    // at multiple levels (selected / area_options.selected / staticState / etc.)
    // and could have been cleared.
    selectedHasChanged = me.updateSelected(true);

    if (isDrawn && changeOptions) {
      // no way to remove just this area from canvas so must refresh everything

      // explicitly remove vml element since it uses removeSelections instead of refreshSelections
      // TODO: Not sure why removeSelections isn't incorporated in to refreshSelections
      //       need to investigate and possibly consolidate
      o.graphics.removeSelections(me.areaId);
      o.graphics.refreshSelections();
    } else if (!isDrawn) {
      me.drawSelection();
    }

    // don't fire until everything is done
    if (selectedHasChanged) {
      me.changeState('select', true);
    }
  }

  /**
   * Deselect this area, optionally deferring finalization so additional areas can be deselected
   * in a single operation
   *
   * @param  {boolean} partial when true, the caller must invoke "finishRemoveSelection" to render
   */

  function deselect(partial) {
    var me = this,
      selectedHasChanged = false;

    // update before we start drawing for methods
    // that rely on internal selected value
    // force update because area can be selected
    // at multiple levels (selected / area_options.selected / staticState / etc.)
    selectedHasChanged = me.updateSelected(false);

    // release information about last area options when deselecting.
    me.optsCache = null;
    me.owner.graphics.removeSelections(me.areaId);

    // Complete selection removal process. This is separated because it's very inefficient to perform the whole
    // process for multiple removals, as the canvas must be totally redrawn at the end of the process.ar.remove
    if (!partial) {
      me.owner.removeSelectionFinish();
    }

    // don't fire until everything is done
    if (selectedHasChanged) {
      me.changeState('select', false);
    }
  }

  /**
   * Toggle the selection state of this area
   * @param  {object} options Rendering options, if toggling on
   * @return {bool} The new selection state
   */
  function toggle(options) {
    var me = this;
    if (!me.isSelected()) {
      me.select(options);
    } else {
      me.deselect();
    }
    return me.isSelected();
  }

  function isNoHref(areaEl) {
    var $area = $(areaEl);
    return u.hasAttribute($area, 'nohref') || !u.hasAttribute($area, 'href');
  }

  /**
   * An AreaData object; represents a conceptual area that can be composed of
   * one or more MapArea objects
   *
   * @param {MapData} owner The MapData object to which this belongs
   * @param {string} key   The key for this area
   * @param {string} value The mapValue string for this area
   */

  m.AreaData = function (owner, key, value) {
    $.extend(this, {
      owner: owner,
      key: key || '',
      // means this represents the first key in a list of keys (it's the area group that gets highlighted on mouseover)
      isPrimary: true,
      areaId: -1,
      href: '',
      hrefTarget: null,
      value: value || '',
      options: {},
      // "null" means unchanged. Use "isSelected" method to just test true/false
      selected: null,
      // "true" means selected has been set via API AND staticState is true/false
      staticStateOverridden: false,
      // xref to MapArea objects
      areasXref: [],
      // (temporary storage) - the actual area moused over
      area: null,
      // the last options used to render this. Cache so when re-drawing after a remove, changes in options won't
      // break already selected things.
      optsCache: null
    });
  };

  /**
   * The public API for AreaData object
   */

  m.AreaData.prototype = {
    constuctor: m.AreaData,
    select: select,
    deselect: deselect,
    toggle: toggle,
    updateSelected: updateSelected,
    areas: function () {
      var i,
        result = [];
      for (i = 0; i < this.areasXref.length; i++) {
        result.push(this.owner.mapAreas[this.areasXref[i]]);
      }
      return result;
    },
    // return all coordinates for all areas
    coords: function (offset) {
      var coords = [];
      $.each(this.areas(), function (_, el) {
        coords = coords.concat(el.coords(offset));
      });
      return coords;
    },
    reset: function () {
      $.each(this.areas(), function (_, e) {
        e.reset();
      });
      this.areasXref = [];
      this.options = null;
    },
    // Return the effective selected state of an area, incorporating staticState
    isSelectedOrStatic: function () {
      var o = this.effectiveOptions();
      return !u.isBool(o.staticState) || this.staticStateOverridden
        ? this.isSelected()
        : o.staticState;
    },
    isSelected: function () {
      return u.isBool(this.selected)
        ? this.selected
        : u.isBool(this.owner.area_options.selected)
        ? this.owner.area_options.selected
        : false;
    },
    isSelectable: function () {
      return u.isBool(this.effectiveOptions().staticState)
        ? false
        : u.isBool(this.owner.options.staticState)
        ? false
        : u.boolOrDefault(this.effectiveOptions().isSelectable, true);
    },
    isDeselectable: function () {
      return u.isBool(this.effectiveOptions().staticState)
        ? false
        : u.isBool(this.owner.options.staticState)
        ? false
        : u.boolOrDefault(this.effectiveOptions().isDeselectable, true);
    },
    isNotRendered: function () {
      return isNoHref(this.area) || this.effectiveOptions().isMask;
    },
    /**
     * Return the overall options effective for this area.
     * This should get the default options, and merge in area-specific options, finally
     * overlaying options passed by parameter
     *
     * @param  {[type]} options  options which will supercede all other options for this area
     * @return {[type]}          the combined options
     */

    effectiveOptions: function (options) {
      var opts = u.updateProps(
        {},
        this.owner.area_options,
        this.options,
        options || {},
        {
          id: this.areaId
        }
      );

      opts.selected = this.isSelected();

      return opts;
    },

    /**
     * Return the options effective for this area for a "render" or "highlight" mode.
     * This should get the default options, merge in the areas-specific options,
     * and then the mode-specific options.
     * @param  {string} mode    'render' or 'highlight'
     * @param  {[type]} options  options which will supercede all other options for this area
     * @return {[type]}          the combined options
     */

    effectiveRenderOptions: function (mode, options) {
      var allOpts,
        opts = this.optsCache;

      if (!opts || mode === 'highlight') {
        allOpts = this.effectiveOptions(options);
        opts = u.updateProps({}, allOpts, allOpts['render_' + mode]);

        if (mode !== 'highlight') {
          this.optsCache = opts;
        }
      }
      return $.extend({}, opts);
    },

    // Fire callback on area state change
    changeState: function (state_type, state) {
      if (u.isFunction(this.owner.options.onStateChange)) {
        this.owner.options.onStateChange.call(this.owner.image, {
          key: this.key,
          state: state_type,
          selected: state
        });
      }
      if (state_type === 'select' && this.owner.options.boundList) {
        this.owner.setBoundListProperties(
          this.owner.options,
          m.getBoundList(this.owner.options, this.key),
          state
        );
      }
    },

    // highlight this area

    highlight: function (options) {
      var o = this.owner;
      o.ensureNoHighlight();
      if (this.effectiveOptions().highlight) {
        o.graphics.addShapeGroup(this, 'highlight', options);
      }
      o.setHighlightId(this.areaId);
      this.changeState('highlight', true);
    },

    // select this area. if "callEvent" is true then the state change event will be called. (This method can be used
    // during config operations, in which case no event is indicated)

    drawSelection: function () {
      this.owner.graphics.addShapeGroup(this, 'select');
    }
  };
  // represents an HTML area
  m.MapArea = function (owner, areaEl, keys) {
    if (!owner) {
      return;
    }
    var me = this;
    me.owner = owner; // a MapData object
    me.area = areaEl;
    me.areaDataXref = []; // a list of map_data.data[] id's for each areaData object containing this
    me.originalCoords = [];
    $.each(u.split(areaEl.coords), function (_, el) {
      me.originalCoords.push(parseFloat(el));
    });
    me.length = me.originalCoords.length;
    me.shape = u.getShape(areaEl);
    me.nohref = isNoHref(areaEl);
    me.configure(keys);
  };
  m.MapArea.prototype = {
    constructor: m.MapArea,
    configure: function (keys) {
      this.keys = u.split(keys);
    },
    reset: function () {
      this.area = null;
    },
    coords: function (offset) {
      return $.map(this.originalCoords, function (e) {
        return offset ? e : e + offset;
      });
    }
  };
})(jQuery);

/* areacorners.js
   determine the best place to put a box of dimensions (width,height) given a circle, rect or poly
*/

(function ($) {
  'use strict';

  var u = $.mapster.utils;

  /**
   * Compute positions that will place a target with dimensions [width,height] outside
   * but near the boundaries of the elements "elements". When an imagemap is passed, the
   *
   * @param  {Element|Element[]} elements An element or an array of elements (such as a jQuery object)
   * @param  {Element} image The image to which area elements are bound, if this is an image map.
   * @param  {Element} container The contianer in which the target must be constrained (or document, if missing)
   * @param  {int} width The width of the target object
   * @return {object} a structure with the x and y positions
   */
  u.areaCorners = function (elements, image, container, width, height) {
    var pos,
      found,
      minX,
      minY,
      maxX,
      maxY,
      bestMinX,
      bestMaxX,
      bestMinY,
      bestMaxY,
      curX,
      curY,
      nest,
      j,
      offsetx = 0,
      offsety = 0,
      rootx,
      rooty,
      iCoords,
      radius,
      angle,
      el,
      coords = [];

    // if a single element was passed, map it to an array

    elements = elements.length ? elements : [elements];

    container = container ? $(container) : $(document.body);

    // get the relative root of calculation

    pos = container.offset();
    rootx = pos.left;
    rooty = pos.top;

    // with areas, all we know about is relative to the top-left corner of the image. We need to add an offset compared to
    // the actual container. After this calculation, offsetx/offsety can be added to either the area coords, or the target's
    // absolute position to get the correct top/left boundaries of the container.

    if (image) {
      pos = $(image).offset();
      offsetx = pos.left;
      offsety = pos.top;
    }

    // map the coordinates of any type of shape to a poly and use the logic. simpler than using three different
    // calculation methods. Circles use a 20 degree increment for this estimation.

    for (j = 0; j < elements.length; j++) {
      el = elements[j];
      if (el.nodeName === 'AREA') {
        iCoords = u.split(el.coords, parseInt);

        switch (u.getShape(el)) {
          case 'circle':
          case 'circ':
            curX = iCoords[0];
            curY = iCoords[1];
            radius = iCoords[2];
            coords = [];
            for (j = 0; j < 360; j += 20) {
              angle = (j * Math.PI) / 180;
              coords.push(
                curX + radius * Math.cos(angle),
                curY + radius * Math.sin(angle)
              );
            }
            break;
          case 'rectangle':
          case 'rect':
            coords.push(
              iCoords[0],
              iCoords[1],
              iCoords[2],
              iCoords[1],
              iCoords[2],
              iCoords[3],
              iCoords[0],
              iCoords[3]
            );
            break;
          default:
            coords = coords.concat(iCoords);
            break;
        }

        // map area positions to it's real position in the container

        for (j = 0; j < coords.length; j += 2) {
          coords[j] = parseInt(coords[j], 10) + offsetx;
          coords[j + 1] = parseInt(coords[j + 1], 10) + offsety;
        }
      } else {
        el = $(el);
        pos = el.position();
        coords.push(
          pos.left,
          pos.top,
          pos.left + el.width(),
          pos.top,
          pos.left + el.width(),
          pos.top + el.height(),
          pos.left,
          pos.top + el.height()
        );
      }
    }

    minX = minY = bestMinX = bestMinY = 999999;
    maxX = maxY = bestMaxX = bestMaxY = -1;

    for (j = coords.length - 2; j >= 0; j -= 2) {
      curX = coords[j];
      curY = coords[j + 1];

      if (curX < minX) {
        minX = curX;
        bestMaxY = curY;
      }
      if (curX > maxX) {
        maxX = curX;
        bestMinY = curY;
      }
      if (curY < minY) {
        minY = curY;
        bestMaxX = curX;
      }
      if (curY > maxY) {
        maxY = curY;
        bestMinX = curX;
      }
    }

    // try to figure out the best place for the tooltip

    if (width && height) {
      found = false;
      $.each(
        [
          [bestMaxX - width, minY - height],
          [bestMinX, minY - height],
          [minX - width, bestMaxY - height],
          [minX - width, bestMinY],
          [maxX, bestMaxY - height],
          [maxX, bestMinY],
          [bestMaxX - width, maxY],
          [bestMinX, maxY]
        ],
        function (_, e) {
          if (!found && e[0] > rootx && e[1] > rooty) {
            nest = e;
            found = true;
            return false;
          }
        }
      );

      // default to lower-right corner if nothing fit inside the boundaries of the image

      if (!found) {
        nest = [maxX, maxY];
      }
    }
    return nest;
  };
})(jQuery);

/* 
  scale.js
  Resize and zoom functionality
  Requires areacorners.js
*/

(function ($) {
  'use strict';

  var m = $.mapster,
    u = m.utils,
    p = m.MapArea.prototype;

  m.utils.getScaleInfo = function (eff, actual) {
    var pct;
    if (!actual) {
      pct = 1;
      actual = eff;
    } else {
      pct = eff.width / actual.width || eff.height / actual.height;
      // make sure a float error doesn't muck us up
      if (pct > 0.98 && pct < 1.02) {
        pct = 1;
      }
    }
    return {
      scale: pct !== 1,
      scalePct: pct,
      realWidth: actual.width,
      realHeight: actual.height,
      width: eff.width,
      height: eff.height,
      ratio: eff.width / eff.height
    };
  };
  // Scale a set of AREAs, return old data as an array of objects
  m.utils.scaleMap = function (image, imageRaw, scale) {
    // stunningly, jQuery width can return zero even as width does not, seems to happen only
    // with adBlock or maybe other plugins. These must interfere with onload events somehow.

    var vis = u.size(image),
      raw = u.size(imageRaw, true);

    if (!raw.complete()) {
      throw 'Another script, such as an extension, appears to be interfering with image loading. Please let us know about this.';
    }
    if (!vis.complete()) {
      vis = raw;
    }
    return this.getScaleInfo(vis, scale ? raw : null);
  };

  /**
   * Resize the image map. Only one of newWidth and newHeight should be passed to preserve scale
   *
   * @param  {int}   width       The new width OR an object containing named parameters matching this function sig
   * @param  {int}   height      The new height
   * @param  {int}   effectDuration Time in ms for the resize animation, or zero for no animation
   * @param  {function} callback    A function to invoke when the operation finishes
   * @return {promise}              NOT YET IMPLEMENTED
   */

  m.MapData.prototype.resize = function (width, height, duration, callback) {
    var p,
      promises,
      newsize,
      els,
      highlightId,
      ratio,
      me = this;

    // allow omitting duration
    callback = callback || duration;

    function sizeCanvas(canvas, w, h) {
      if (m.hasCanvas()) {
        canvas.width = w;
        canvas.height = h;
      } else {
        $(canvas).width(w);
        $(canvas).height(h);
      }
    }

    // Finalize resize action, do callback, pass control to command queue

    function cleanupAndNotify() {
      me.currentAction = '';

      if (u.isFunction(callback)) {
        callback();
      }

      me.processCommandQueue();
    }

    // handle cleanup after the inner elements are resized

    function finishResize() {
      sizeCanvas(me.overlay_canvas, width, height);

      // restore highlight state if it was highlighted before
      if (highlightId >= 0) {
        var areaData = me.data[highlightId];
        areaData.tempOptions = { fade: false };
        me.getDataForKey(areaData.key).highlight();
        areaData.tempOptions = null;
      }
      sizeCanvas(me.base_canvas, width, height);
      me.redrawSelections();
      cleanupAndNotify();
    }

    function resizeMapData() {
      $(me.image).css(newsize);
      // start calculation at the same time as effect
      me.scaleInfo = u.getScaleInfo(
        {
          width: width,
          height: height
        },
        {
          width: me.scaleInfo.realWidth,
          height: me.scaleInfo.realHeight
        }
      );
      $.each(me.data, function (_, e) {
        $.each(e.areas(), function (_, e) {
          e.resize();
        });
      });
    }

    if (me.scaleInfo.width === width && me.scaleInfo.height === height) {
      return;
    }

    highlightId = me.highlightId;

    if (!width) {
      ratio = height / me.scaleInfo.realHeight;
      width = Math.round(me.scaleInfo.realWidth * ratio);
    }
    if (!height) {
      ratio = width / me.scaleInfo.realWidth;
      height = Math.round(me.scaleInfo.realHeight * ratio);
    }

    newsize = { width: String(width) + 'px', height: String(height) + 'px' };
    if (!m.hasCanvas()) {
      $(me.base_canvas).children().remove();
    }

    // resize all the elements that are part of the map except the image itself (which is not visible)
    // but including the div wrapper
    els = $(me.wrapper).find('.mapster_el');
    if (me.options.enableAutoResizeSupport !== true) {
      els = els.add(me.wrapper);
    }

    if (duration) {
      promises = [];
      me.currentAction = 'resizing';
      els.filter(':visible').each(function (_, e) {
        p = u.defer();
        promises.push(p);

        $(e).animate(newsize, {
          duration: duration,
          complete: p.resolve,
          easing: 'linear'
        });
      });
      els.filter(':hidden').css(newsize);

      p = u.defer();
      promises.push(p);

      // though resizeMapData is not async, it needs to be finished just the same as the animations,
      // so add it to the "to do" list.

      u.when.all(promises).then(finishResize);
      resizeMapData();
      p.resolve();
    } else {
      els.css(newsize);
      resizeMapData();
      finishResize();
    }
  };

  m.MapData.prototype.autoResize = function (duration, callback) {
    var me = this;
    me.resize($(me.wrapper).width(), null, duration, callback);
  };

  m.MapData.prototype.configureAutoResize = function () {
    var me = this,
      ns = me.instanceEventNamespace();

    function resizeMap() {
      // Evaluate this at runtime to allow for set_options
      // to change behavior as set_options intentionally
      // does not change any rendering behavior when invoked.
      // To improve perf, in next major release this should
      // be refactored to add/remove listeners when autoResize
      // changes rather than always having listeners attached
      // and conditionally resizing
      if (me.options.autoResize !== true) {
        return;
      }

      me.autoResize(me.options.autoResizeDuration, me.options.onAutoResize);
    }

    function debounce() {
      if (me.autoResizeTimer) {
        clearTimeout(me.autoResizeTimer);
      }
      me.autoResizeTimer = setTimeout(resizeMap, me.options.autoResizeDelay);
    }

    $(me.image).on('load' + ns, resizeMap); //Detect late image loads in IE11
    $(window).on('focus' + ns, resizeMap);
    $(window).on('resize' + ns, debounce);
    $(window).on('readystatechange' + ns, resizeMap);
    $(window.document).on('fullscreenchange' + ns, resizeMap);
    resizeMap();
  };

  m.MapArea = u.subclass(m.MapArea, function () {
    //change the area tag data if needed
    this.base.init();
    if (this.owner.scaleInfo.scale) {
      this.resize();
    }
  });

  p.coords = function (percent, coordOffset) {
    var j,
      newCoords = [],
      pct = percent || this.owner.scaleInfo.scalePct,
      offset = coordOffset || 0;

    if (pct === 1 && coordOffset === 0) {
      return this.originalCoords;
    }

    for (j = 0; j < this.length; j++) {
      //amount = j % 2 === 0 ? xPct : yPct;
      newCoords.push(Math.round(this.originalCoords[j] * pct) + offset);
    }
    return newCoords;
  };
  p.resize = function () {
    this.area.coords = this.coords().join(',');
  };

  p.reset = function () {
    this.area.coords = this.coords(1).join(',');
  };

  m.impl.resize = function (width, height, duration, callback) {
    var x = new m.Method(
      this,
      function () {
        var me = this,
          noDimensions = !width && !height,
          isAutoResize =
            me.options.enableAutoResizeSupport &&
            me.options.autoResize &&
            noDimensions;

        if (isAutoResize) {
          me.autoResize(duration, callback);
          return;
        }

        if (noDimensions) {
          return false;
        }

        me.resize(width, height, duration, callback);
      },
      null,
      {
        name: 'resize',
        args: arguments
      }
    ).go();
    return x;
  };

  /*
    m.impl.zoom = function (key, opts) {
        var options = opts || {};

        function zoom(areaData) {
            // this will be MapData object returned by Method

            var scroll, corners, height, width, ratio,
                    diffX, diffY, ratioX, ratioY, offsetX, offsetY, newWidth, newHeight, scrollLeft, scrollTop,
                    padding = options.padding || 0,
                    scrollBarSize = areaData ? 20 : 0,
                    me = this,
                    zoomOut = false;

            if (areaData) {
                // save original state on first zoom operation
                if (!me.zoomed) {
                    me.zoomed = true;
                    me.preZoomWidth = me.scaleInfo.width;
                    me.preZoomHeight = me.scaleInfo.height;
                    me.zoomedArea = areaData;
                    if (options.scroll) {
                        me.wrapper.css({ overflow: 'auto' });
                    }
                }
                corners = $.mapster.utils.areaCorners(areaData.coords(1, 0));
                width = me.wrapper.innerWidth() - scrollBarSize - padding * 2;
                height = me.wrapper.innerHeight() - scrollBarSize - padding * 2;
                diffX = corners.maxX - corners.minX;
                diffY = corners.maxY - corners.minY;
                ratioX = width / diffX;
                ratioY = height / diffY;
                ratio = Math.min(ratioX, ratioY);
                offsetX = (width - diffX * ratio) / 2;
                offsetY = (height - diffY * ratio) / 2;

                newWidth = me.scaleInfo.realWidth * ratio;
                newHeight = me.scaleInfo.realHeight * ratio;
                scrollLeft = (corners.minX) * ratio - padding - offsetX;
                scrollTop = (corners.minY) * ratio - padding - offsetY;
            } else {
                if (!me.zoomed) {
                    return;
                }
                zoomOut = true;
                newWidth = me.preZoomWidth;
                newHeight = me.preZoomHeight;
                scrollLeft = null;
                scrollTop = null;
            }

            this.resize({
                width: newWidth,
                height: newHeight,
                duration: options.duration,
                scroll: scroll,
                scrollLeft: scrollLeft,
                scrollTop: scrollTop,
                // closure so we can be sure values are correct
                callback: (function () {
                    var isZoomOut = zoomOut,
                            scroll = options.scroll,
                            areaD = areaData;
                    return function () {
                        if (isZoomOut) {
                            me.preZoomWidth = null;
                            me.preZoomHeight = null;
                            me.zoomed = false;
                            me.zoomedArea = false;
                            if (scroll) {
                                me.wrapper.css({ overflow: 'inherit' });
                            }
                        } else {
                            // just to be sure it wasn't canceled & restarted
                            me.zoomedArea = areaD;
                        }
                    };
                } ())
            });
        }
        return (new m.Method(this,
                function (opts) {
                    zoom.call(this);
                },
                function () {
                    zoom.call(this.owner, this);
                },
                {
                    name: 'zoom',
                    args: arguments,
                    first: true,
                    key: key
                }
                )).go();
    };
    */
})(jQuery);

/* 
  tooltip.js
  Tooltip functionality
  Requires areacorners.js
*/

(function ($) {
  'use strict';

  var m = $.mapster,
    u = m.utils;

  $.extend(m.defaults, {
    toolTipContainer:
      '<div style="border: 2px solid black; background: #EEEEEE; width:160px; padding:4px; margin: 4px; -moz-box-shadow: 3px 3px 5px #535353; ' +
      '-webkit-box-shadow: 3px 3px 5px #535353; box-shadow: 3px 3px 5px #535353; -moz-border-radius: 6px 6px 6px 6px; -webkit-border-radius: 6px; ' +
      'border-radius: 6px 6px 6px 6px; opacity: 0.9;"></div>',
    showToolTip: false,
    toolTip: null,
    toolTipFade: true,
    toolTipClose: ['area-mouseout', 'image-mouseout', 'generic-mouseout'],
    onShowToolTip: null,
    onHideToolTip: null
  });

  $.extend(m.area_defaults, {
    toolTip: null,
    toolTipClose: null
  });

  /**
   * Show a tooltip positioned near this area.
   *
   * @param {string|jquery} html A string of html or a jQuery object containing the tooltip content.
   * @param {string|jquery} [template] The html template in which to wrap the content
   * @param {string|object} [css] CSS to apply to the outermost element of the tooltip
   * @return {jquery} The tooltip that was created
   */

  function createToolTip(html, template, css) {
    var tooltip;

    // wrap the template in a jQuery object, or clone the template if it's already one.
    // This assumes that anything other than a string is a jQuery object; if it's not jQuery will
    // probably throw an error.

    if (template) {
      tooltip =
        typeof template === 'string' ? $(template) : $(template).clone();

      tooltip.append(html);
    } else {
      tooltip = $(html);
    }

    // always set display to block, or the positioning css won't work if the end user happened to
    // use a non-block type element.

    tooltip
      .css(
        $.extend(css || {}, {
          display: 'block',
          position: 'absolute'
        })
      )
      .hide();

    $('body').append(tooltip);

    // we must actually add the tooltip to the DOM and "show" it in order to figure out how much space it
    // consumes, and then reposition it with that knowledge.
    // We also cache the actual opacity setting to restore finally.

    tooltip.attr('data-opacity', tooltip.css('opacity')).css('opacity', 0);

    // doesn't really show it because opacity=0

    return tooltip.show();
  }

  /**
   * Show a tooltip positioned near this area.
   *
   * @param {jquery} tooltip The tooltip
   * @param {object} [options] options for displaying the tooltip.
   *  @config {int} [left] The 0-based absolute x position for the tooltip
   *  @config {int} [top] The 0-based absolute y position for the tooltip
   *  @config {string|object} [css] CSS to apply to the outermost element of the tooltip
   *  @config {bool} [fadeDuration] When non-zero, the duration in milliseconds of a fade-in effect for the tooltip.
   */

  function showToolTipImpl(tooltip, options) {
    var tooltipCss = {
        left: options.left + 'px',
        top: options.top + 'px'
      },
      actalOpacity = tooltip.attr('data-opacity') || 0,
      zindex = tooltip.css('z-index');

    if (parseInt(zindex, 10) === 0 || zindex === 'auto') {
      tooltipCss['z-index'] = 9999;
    }

    tooltip.css(tooltipCss).addClass('mapster_tooltip');

    if (options.fadeDuration && options.fadeDuration > 0) {
      u.fader(tooltip[0], 0, actalOpacity, options.fadeDuration);
    } else {
      u.setOpacity(tooltip[0], actalOpacity);
    }
  }

  /**
   * Hide and remove active tooltips
   *
   * @param  {MapData} this The mapdata object to which the tooltips belong
   */

  m.MapData.prototype.clearToolTip = function () {
    if (this.activeToolTip) {
      this.activeToolTip.stop().remove();
      this.activeToolTip = null;
      this.activeToolTipID = null;
      u.ifFunction(this.options.onHideToolTip, this);
    }
  };

  /**
   * Configure the binding between a named tooltip closing option, and a mouse event.
   *
   * If a callback is passed, it will be called when the activating event occurs, and the tooltip will
   * only closed if it returns true.
   *
   * @param  {MapData}  [this]     The MapData object to which this tooltip belongs.
   * @param  {String}   option     The name of the tooltip closing option
   * @param  {String}   event      UI event to bind to this option
   * @param  {Element}  target     The DOM element that is the target of the event
   * @param  {Function} [beforeClose] Callback when the tooltip is closed
   * @param  {Function} [onClose]  Callback when the tooltip is closed
   */
  function bindToolTipClose(
    options,
    bindOption,
    event,
    target,
    beforeClose,
    onClose
  ) {
    var tooltip_ns = '.mapster.tooltip',
      event_name = event + tooltip_ns;

    if ($.inArray(bindOption, options) >= 0) {
      target.off(event_name).on(event_name, function (e) {
        if (!beforeClose || beforeClose.call(this, e)) {
          target.off(tooltip_ns);
          if (onClose) {
            onClose.call(this);
          }
        }
      });

      return {
        object: target,
        event: event_name
      };
    }
  }

  /**
   * Show a tooltip.
   *
   * @param {string|jquery}   [tooltip]       A string of html or a jQuery object containing the tooltip content.
   *
   * @param {string|jquery}   [target]        The target of the tooltip, to be used to determine positioning. If null,
   *                                          absolute position values must be passed with left and top.
   *
   * @param {string|jquery}   [image]         If target is an [area] the image that owns it
   *
   * @param {string|jquery}   [container]     An element within which the tooltip must be bounded
   *
   * @param {object|string|jQuery} [options]  options to apply when creating this tooltip
   *  @config {int}           [offsetx]       the horizontal amount to offset the tooltip
   *  @config {int}           [offsety]       the vertical amount to offset the tooltip
   *  @config {string|object} [css]           CSS to apply to the outermost element of the tooltip
   *  @config {bool}          [fadeDuration]  When non-zero, the duration in milliseconds of a fade-in effect for the tooltip.
   *  @config {int}           [left]          The 0-based absolute x position for the tooltip (only used if target is not specified)
   *  @config {int}           [top]           The 0-based absolute y position for the tooltip (only used if target it not specified)
   */

  function showToolTip(tooltip, target, image, container, options) {
    var corners,
      ttopts = {};

    options = options || {};

    if (target) {
      corners = u.areaCorners(
        target,
        image,
        container,
        tooltip.outerWidth(true),
        tooltip.outerHeight(true)
      );

      // Try to upper-left align it first, if that doesn't work, change the parameters

      ttopts.left = corners[0];
      ttopts.top = corners[1];
    } else {
      ttopts.left = options.left;
      ttopts.top = options.top;
    }

    ttopts.left += options.offsetx || 0;
    ttopts.top += options.offsety || 0;

    ttopts.css = options.css;
    ttopts.fadeDuration = options.fadeDuration;

    showToolTipImpl(tooltip, ttopts);

    return tooltip;
  }

  /**
     * Show a tooltip positioned near this area.
      *
     * @param {string|jquery|function}   [content] A string of html, jQuery object or function that returns same containing the tooltip content.

     * @param {object} [options]  options to apply when creating this tooltip
     *  @config {string|jquery} [container]     An element within which the tooltip must be bounded
     *  @config {bool}          [template]      a template to use instead of the default. If this property exists and is null,
     *                                          then no template will be used.
     *  @config {string}        [closeEvents]   A string with one or more comma-separated values that determine when the tooltip
     *                                          closes: 'area-click','tooltip-click','image-mouseout','image-click' are valid values
     *                                          then no template will be used.
     *  @config {int}           [offsetx]       the horizontal amount to offset the tooltip
     *  @config {int}           [offsety]       the vertical amount to offset the tooltip
     *  @config {string|object} [css]           CSS to apply to the outermost element of the tooltip
     *  @config {bool}          [fadeDuration]  When non-zero, the duration in milliseconds of a fade-in effect for the tooltip.
     */
  m.AreaData.prototype.showToolTip = function (content, options) {
    var tooltip,
      closeOpts,
      target,
      tipClosed,
      template,
      ttopts = {},
      ad = this,
      md = ad.owner,
      areaOpts = ad.effectiveOptions();

    // copy the options object so we can update it
    options = options ? $.extend({}, options) : {};

    content = content || areaOpts.toolTip;
    closeOpts =
      options.closeEvents ||
      areaOpts.toolTipClose ||
      md.options.toolTipClose ||
      'tooltip-click';

    template =
      typeof options.template !== 'undefined'
        ? options.template
        : md.options.toolTipContainer;

    options.closeEvents =
      typeof closeOpts === 'string'
        ? (closeOpts = u.split(closeOpts))
        : closeOpts;

    options.fadeDuration =
      options.fadeDuration ||
      (md.options.toolTipFade
        ? md.options.fadeDuration || areaOpts.fadeDuration
        : 0);

    target = ad.area
      ? ad.area
      : $.map(ad.areas(), function (e) {
          return e.area;
        });

    if (md.activeToolTipID === ad.areaId) {
      return;
    }

    md.clearToolTip();

    var effectiveContent = u.isFunction(content)
      ? content({ key: this.key, target: target })
      : content;

    if (!effectiveContent) {
      return;
    }

    md.activeToolTip = tooltip = createToolTip(
      effectiveContent,
      template,
      options.css
    );

    md.activeToolTipID = ad.areaId;

    tipClosed = function () {
      md.clearToolTip();
    };

    bindToolTipClose(
      closeOpts,
      'area-click',
      'click',
      $(md.map),
      null,
      tipClosed
    );
    bindToolTipClose(
      closeOpts,
      'tooltip-click',
      'click',
      tooltip,
      null,
      tipClosed
    );
    bindToolTipClose(
      closeOpts,
      'image-mouseout',
      'mouseout',
      $(md.image),
      function (e) {
        return (
          e.relatedTarget &&
          e.relatedTarget.nodeName !== 'AREA' &&
          e.relatedTarget !== ad.area
        );
      },
      tipClosed
    );
    bindToolTipClose(
      closeOpts,
      'image-click',
      'click',
      $(md.image),
      null,
      tipClosed
    );

    showToolTip(tooltip, target, md.image, options.container, options);

    u.ifFunction(md.options.onShowToolTip, ad.area, {
      toolTip: tooltip,
      options: ttopts,
      areaOptions: areaOpts,
      key: ad.key,
      selected: ad.isSelected()
    });

    return tooltip;
  };

  /**
   * Parse an object that could be a string, a jquery object, or an object with a "contents" property
   * containing html or a jQuery object.
   *
   * @param  {object|string|jQuery} options The parameter to parse
   * @return {string|jquery} A string or jquery object
   */
  function getHtmlFromOptions(options) {
    // see if any html was passed as either the options object itself, or the content property

    return options
      ? typeof options === 'string' || options.jquery || u.isFunction(options)
        ? options
        : options.content
      : null;
  }

  function getOptionsFromOptions(options) {
    return options
      ? typeof options == 'string' || options.jquery || u.isFunction(options)
        ? { content: options }
        : options
      : {};
  }

  /**
   * Activate or remove a tooltip for an area. When this method is called on an area, the
   * key parameter doesn't apply and "options" is the first parameter.
   *
   * When called with no parameters, or "key" is a falsy value, any active tooltip is cleared.
   *
   * When only a key is provided, the default tooltip for the area is used.
   *
   * When html is provided, this is used instead of the default tooltip.
   *
   * When "noTemplate" is true, the default tooltip template will not be used either, meaning only
   * the actual html passed will be used.
   *
   * @param  {string|AreaElement|HTMLElement} key The area key or element for which to activate a tooltip, or a DOM element/selector.
   *
   * @param {object|string|jquery} [options] options to apply when creating this tooltip - OR -
   *                                         The markup, or a jquery object, containing the data for the tooltip
   *  @config {string|jQuery|function} [content] the inner content of the tooltip; the tooltip text, HTML or function that returns same
   *  @config {Element|jQuery} [container] the inner content of the tooltip; the tooltip text or HTML
   *  @config {bool}           [template] a template to use instead of the default. If this property exists and is null,
   *                                      then no template will be used.
   *  @config {string}         [closeEvents] A string with one or more comma-separated values that determine when the tooltip
   *                                         closes: 'area-click','tooltip-click','image-mouseout','image-click','generic-click','generic-mouseout' are valid values
   *  @config {int}            [offsetx] the horizontal amount to offset the tooltip.
   *  @config {int}            [offsety] the vertical amount to offset the tooltip.
   *  @config {string|object}  [css] CSS to apply to the outermost element of the tooltip
   *  @config {bool}           [fadeDuration] When non-zero, the duration in milliseconds of a fade-in effect for the tooltip.
   * @return {jQuery} The jQuery object
   */

  m.impl.tooltip = function (key, options) {
    return new m.Method(
      this,
      function mapData() {
        var tooltip,
          target,
          defaultTarget,
          closeOpts,
          tipClosed,
          md = this;
        if (!key) {
          md.clearToolTip();
        } else {
          target = $(key);
          defaultTarget = target && target.length > 0 ? target[0] : null;
          if (md.activeToolTipID === defaultTarget) {
            return;
          }

          md.clearToolTip();
          if (!defaultTarget) {
            return;
          }

          var content = getHtmlFromOptions(options),
            effectiveContent = u.isFunction(content)
              ? content({ key: this.key, target: target })
              : content;

          if (!effectiveContent) {
            return;
          }

          options = getOptionsFromOptions(options);

          closeOpts =
            options.closeEvents || md.options.toolTipClose || 'tooltip-click';

          options.closeEvents =
            typeof closeOpts === 'string'
              ? (closeOpts = u.split(closeOpts))
              : closeOpts;

          options.fadeDuration =
            options.fadeDuration ||
            (md.options.toolTipFade ? md.options.fadeDuration : 0);

          tipClosed = function () {
            md.clearToolTip();
          };

          md.activeToolTip = tooltip = createToolTip(
            effectiveContent,
            options.template || md.options.toolTipContainer,
            options.css
          );
          md.activeToolTipID = defaultTarget;

          bindToolTipClose(
            closeOpts,
            'tooltip-click',
            'click',
            tooltip,
            null,
            tipClosed
          );

          bindToolTipClose(
            closeOpts,
            'generic-mouseout',
            'mouseout',
            target,
            null,
            tipClosed
          );

          bindToolTipClose(
            closeOpts,
            'generic-click',
            'click',
            target,
            null,
            tipClosed
          );

          md.activeToolTip = tooltip = showToolTip(
            tooltip,
            target,
            md.image,
            options.container,
            options
          );
        }
      },
      function areaData() {
        if ($.isPlainObject(key) && !options) {
          options = key;
        }

        this.showToolTip(
          getHtmlFromOptions(options),
          getOptionsFromOptions(options)
        );
      },
      {
        name: 'tooltip',
        args: arguments,
        key: key
      }
    ).go();
  };
})(jQuery);

}));