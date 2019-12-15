/**
 * @file Embedo JS
 *
 * Embedo is third party content embed plugin with features having events and resizing.
 * It provides a layer above popular social media sites native embed snippets
 * making it easier to hook content without modifying much code.
 *
 * @license MIT
 * @author Shobhit Sharma <hi@shobh.it>
 */

(function (global, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.Embedo = window.Embedo = factory();
  }

})(this, function () {
  'use strict';

  /**
   * @class Embedo Prototype
   *
   * @param {object} options Initialize options.
   */
  function Embedo(options) {
    this.options = options || Embedo.defaults.OPTIONS;
    this.requests = [];
    this.events = [];

    this.init(this.options);

    return this;
  }

  Embedo.log = function (type) {
    if (Embedo.debug) {
      if (typeof console !== 'undefined' && typeof console.log !== 'undefined' && console[type]) {
        console[type].apply(console, Array.prototype.slice.call(arguments, 1));
      }
    }
  };

  /**
   * @constant
   * Embedo defaults
   *
   * @description Embedo defaults contains basic configuration and values required to build internal engine.
   */
  Embedo.defaults = {
    OPTIONS: {
      facebook: null,
      twitter: false,
      instagram: false,
      pinterest: false,
      googlemaps: null
    },
    SOURCES: {
      facebook: {
        GLOBAL: 'FB',
        SDK: 'https://connect.facebook.net/en_US/all.js',
        oEmbed: 'https://www.facebook.com/plugins/post/oembed.json',
        REGEX: /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?([\w\-]*)?/g,
        PARAMS: {
          version: 'v2.10',
          cookie: true,
          appId: null,
          xfbml: true
        }
      },
      twitter: {
        GLOBAL: 'twttr',
        SDK: 'https://platform.twitter.com/widgets.js',
        oEmbed: 'https://publish.twitter.com/oembed',
        REGEX: /^http[s]*:\/\/[www.]*twitter(\.[a-z]+).*/i,
        PARAMS: {}
      },
      instagram: {
        GLOBAL: 'instgrm',
        SDK: 'https://platform.instagram.com/en_US/embeds.js',
        oEmbed: 'https://api.instagram.com/oembed',
        REGEX: /instagram.com\/p\/[a-zA-Z0-9_\/\?\-\=]+/gi,
        PARAMS: {}
      },
      youtube: {
        GLOBAL: null,
        SDK: null,
        oEmbed: 'https://www.youtube.com/embed/',
        REGEX: /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/,
        PARAMS: null
      },
      pinterest: {
        GLOBAL: 'PinUtils',
        SDK: 'https://assets.pinterest.com/js/pinit.js',
        oEmbed: null,
        REGEX: /(https?:\/\/(ww.)?)?pinterest(\.[a-z]+).*/i,
        PARAMS: {}
      },
      vimeo: {
        GLOBAL: null,
        SDK: null,
        oEmbed: 'https://vimeo.com/api/oembed.json',
        REGEX: /(http|https)?:\/\/(www\.)?vimeo(\.[a-z]+)\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/,
        PARAMS: {}
      },
      googlemaps: {
        GLOBAL: 'google',
        SDK: 'https://maps.googleapis.com/maps/api/js',
        oEmbed: null,
        REGEX: /(http|https)?:\/\/(www\.|maps\.)?google(\.[a-z]+){1,2}\/maps\/.*/i,
        PARAMS: {}
      },
      github: {
        GLOBAL: null,
        SDK: null,
        oEmbed: null,
        REGEX: /https:\/\/gist\.github\.com\/(\w+)\/(\w+)/,
        PARAMS: {}
      }
    },
    RESTRICTED: ['url', 'strict', 'height', 'width', 'centerize']
  };

  /**
   * @method utils
   *
   * Helper functions
   * @private
   */
  Embedo.utils = Object.create({
    /**
     * @function uuid
     */
    uuid: function uuid() {
      var primary = (Math.random() * 46656) | 0;
      var secondary = (Math.random() * 46656) | 0;

      primary = ('000' + primary.toString(36)).slice(-3);
      secondary = ('000' + secondary.toString(36)).slice(-3);

      return primary + secondary;
    },

    /**
     * @function extend
     *
     * @returns {object}
     */
    extend: function extend(obj) {
      obj = obj || {};

      for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i]) {
          continue;
        }
        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            obj[key] = arguments[i][key];
          }
        }
      }

      return obj;
    },

    /**
     * @function merge
     *
     * @param {object} destination
     * @param {object} source
     * @param {array} preserve
     * @returns
     */
    merge: function merge(destination, source, preserve) {
      preserve = preserve || [];

      for (var property in source) {
        if (preserve.indexOf(property) === -1) {
          destination[property] = source[property];
        }
      }

      return destination;
    },

    /**
     * @func sequencer
     * Breaks down array into sequencer
     *
     * @param {Array} array
     * @param {Number} size
     * @returns
     */
    sequencer: function sequencer() {
      var args = arguments;
      return {
        then: function (done) {
          var counter = 0;
          for (var i = 0; i < args.length; i++) {
            args[i](callme);
          }

          function callme() {
            counter++;
            if (counter === args.length) {
              done();
            }
          }
        }
      };
    },

    /**
     * @func observer
     *
     * Deferred Implementation for Object
     */
    observer: (function () {
      function Deferred() {
        this.resolved = [];
        this.rejected = [];
      }
      Deferred.prototype = {
        execute: function (list, args) {
          var i = list.length;
          args = Array.prototype.slice.call(args);
          while (i--) {
            list[i].apply(null, args);
          }
        },
        resolve: function () {
          this.execute(this.resolved, arguments);
        },
        reject: function () {
          this.execute(this.rejected, arguments);
        },
        done: function (callback) {
          this.resolved.push(callback);
          return this;
        },
        fail: function (callback) {
          this.rejected.push(callback);
          return this;
        }
      };
      return Deferred;
    })(),

    /**
     * @function validateURL
     *
     * @param {string} url
     * @returns
     */
    validateURL: function validateURL(url) {
      return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
    },

    /**
     * @function generateElement
     * Generates DOM element
     *
     * @param {string} source
     * @param {object} attributes
     * @returns HTMLElement
     */
    generateElement: function generateElement(type, attributes) {
      var el = document.createElement(type);

      Object.keys(attributes || {}).forEach(function (type) {
        el.setAttribute(type, attributes[type]);
      });

      return el;
    },

    /**
     * @function generateEmbed
     * Generates Embed Container
     *
     * @param {string} source
     * @param {string} html
     * @returns
     */
    generateEmbed: function generateEmbed(id, source, html) {
      id = id || Embedo.utils.uuid();
      var container = document.createElement('div');

      container.setAttribute('id', id);
      container.setAttribute('data-embedo-id', id);
      container.setAttribute('data-embedo-source', source);

      if (Embedo.utils.validateElement(html)) {
        container.appendChild(html);
      } else {
        container.innerHTML = html || '';
      }

      return container;
    },

    /**
     * @function generateScript
     * Generates script tag element
     *
     * @param {string} source
     * @returns HTMLElement
     */
    generateScript: function generateScript(source) {
      var script = document.createElement('script');
      script.type = 'text\/javascript';
      script.src = encodeURI(source);
      script.setAttribute('async', '');
      script.setAttribute('charset', 'utf-8');
      return script;
    },

    /**
     * @function validateElement
     * Validates if passed argument is valid DOM element
     *
     * @param {object} obj
     * @returns HTMLElement
     */
    validateElement: function validateElement(obj) {
      return (
        typeof HTMLElement === 'object' ? obj instanceof window.HTMLElement :
        obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string'
      );
    },

    /**
     * @function querystring
     * Object to Query String
     *
     * @param {object} obj
     * @returns {string}
     */
    querystring: function querystring(obj) {
      var parts = [];

      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
        }
      }

      return parts.join('&');
    },

    /**
     * @function fetch
     * JSONP XHR fetch
     *
     * @param {string} url
     * @param {object} options
     * @param {function} callback
     */
    fetch: function fetch(url, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      options = options || {};
      var target = document.head || document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      var jsonpCallback = 'embedoFetch_' + Embedo.utils.uuid();
      url += (~url.indexOf('?') ? '&' : '?') + 'callback=' + encodeURIComponent(jsonpCallback);
      url = url.replace('?&', '?');

      window[jsonpCallback] = function (data) {
        clear(jsonpCallback, script);
        callback(null, data);
      };

      script.type = 'text\/javascript';
      script.charset = 'UTF-8';
      script.onerror = function (err) {
        clear(jsonpCallback, script);
        return callback(err);
      };
      target.appendChild(script);
      script.src = url;

      function clear(jsonpCallback, script) {
        try {
          delete window[jsonpCallback];
        } catch (e) {
          window[jsonpCallback] = undefined;
        }
        if (script) {
          target.removeChild(script);
          script = undefined;
        }
      }
    },

    /**
     * @function transform
     * Cross Browser CSS Transformation
     *
     * @param {HTMLElement} element
     * @param {string} props
     */
    transform: function transform(element, props) {
      if (!Embedo.utils.validateElement(element)) {
        return;
      }
      element.style.webkitTransform = props;
      element.style.MozTransform = props;
      element.style.msTransform = props;
      element.style.OTransform = props;
      element.style.transform = props;
    },

    /**
     * @function compute
     * Computes property value of HTMLElement
     *
     * @param {HTMLElement} el
     * @param {string} prop
     * @param {Boolean} stylesheet
     * @returns {Number}
     */
    compute: function compute(el, prop, is_computed) {
      if (!Embedo.utils.validateElement(el) || !prop) {
        return;
      }

      var bounds = el.getBoundingClientRect();
      var value = bounds[prop];

      if (is_computed || !value) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          value = document.defaultView.getComputedStyle(el, '').getPropertyValue(prop);
        } else if (el.currentStyle) {
          prop = prop.replace(/\-(\w)/g, function (m, p) {
            return p.toUpperCase();
          });
          value = el.currentStyle[prop];
        }
      }

      if (typeof value === 'string' && !/^\d+(\.\d+)?%$/.test(value)) {
        value = value.replace(/[^\d.-]/g, '');
      }

      return isNaN(Number(value)) ? value : Number(value);
    },

    /**
     * @method convertToPx
     * Calculates approximate pixel value for vw, vh or % values
     *
     * @implements relative_px
     * @implements percent_px
     */
    convertToPx: function convertToPx(el, prop, value) {
      if (!isNaN(Number(value))) {
        return Number(value);
      } else if (/^\d+(\.\d+)?%$/.test(value)) {
        return percent_px(el, prop, value);
      } else if (value.match(/(vh|vw)/)) {
        var dimension = value.replace(/[0-9]/g, '');
        return relative_px(dimension, value);
      }

      // Converts vw or vh to PX
      function relative_px(type, value) {
        var w = window,
          d = document,
          e = d.documentElement,
          g = d.body,
          x = w.innerWidth || e.clientWidth || g.clientWidth,
          y = w.innerHeight || e.clientHeight || g.clientHeight;

        if (type === 'vw') {
          return (x * parseFloat(value)) / 100;
        } else if (type === 'vh') {
          return (y * parseFloat(value)) / 100;
        } else {
          return undefined;
        }
      }

      // Converts % to PX
      function percent_px(el, prop, percent) {
        var parent_width = Embedo.utils.compute(el.parentNode, prop, true);
        percent = parseFloat(percent);
        return parent_width * (percent / 100);
      }
    },

    /**
     * @function watcher
     *
     * @param {string} Identifer
     * @param {Function} Function to Trigger
     * @param {integer} timer
     *
     * @returns {Function}
     */
    watcher: function watcher(id, fn, timer) {
      window.EMBEDO_WATCHER = window.EMBEDO_WATCHER || {};
      window.EMBEDO_WATCHER[id] = window.EMBEDO_WATCHER[id] || {
        id: id,
        count: 0,
        request: null
      };

      if (window.EMBEDO_WATCHER[id].count > 0 && window.EMBEDO_WATCHER[id].request) {
        window.EMBEDO_WATCHER[id].count -= 1;
        clearTimeout(window.EMBEDO_WATCHER[id].request);
      }

      window.EMBEDO_WATCHER[id].count += 1;
      window.EMBEDO_WATCHER[id].request = setTimeout(function () {
        window.EMBEDO_WATCHER[id].count -= 1;
        if (window.EMBEDO_WATCHER[id].count === 0) {
          fn.call();
        }
      }, timer);

      return null;
    },

    /**
     * @function dimensions
     *
     * @param {HTMLElement} el
     * @param {string} width
     * @param {string} height
     *
     * @returns {object{width,height}}
     */
    dimensions: function dimensions(el, width, height) {
      var el_width = Embedo.utils.compute(el, 'width');
      width = width ? width : (el_width > 0 ? el_width : Embedo.utils.compute(el.parentNode, 'width'));
      height = height ? height : (el_width > 0 ? el_width / 1.5 : Embedo.utils.compute(el.parentNode, 'height'));
      return {
        width: width,
        height: height
      };
    },

    /**
     * @function centerize
     * Align an element center in relation to parent div
     *
     * @param {HTMLElement} parent_el
     * @param {HTMLElement} child_el
     * @param {object} options
     * @returns
     */
    centerize: function centerize(parent_el, child_el, options) {
      if (!Embedo.utils.validateElement(parent_el) || !Embedo.utils.validateElement(child_el)) {
        return;
      }
      options = options || {};

      if (options.width) {
        parent_el.style.width = options.width;
        parent_el.style.maxWidth = options.width;
      }

      if (options.height) {
        parent_el.style.height = options.height;
        parent_el.style.maxHeight = options.height;
      }

      child_el.style.display = '-moz-box';
      child_el.style.display = '-ms-flexbox';
      child_el.style.display = '-webkit-flex';
      child_el.style.display = '-webkit-box';
      child_el.style.display = 'flex';
      child_el.style.textAlign = 'center';
      child_el.style['justify-content'] = 'center';
      child_el.style['align-items'] = 'center';
      child_el.style.margin = '0 auto';
    },

    /**
     * @function handleScriptValidation
     *
     * @param {string} url
     */
    handleScriptValidation: function handleScriptValidation(url) {
      if (!url) {
        return;
      }
      url = url.split('#')[0];
      var scripts = document.getElementsByTagName('script');
      for (var i = scripts.length; i--;) {
        if (scripts[i].src === url) {
          return true;
        }
      }
      return false;
    }
  });

  /**
   * Mixin will delegate all private events to extended object
   *
   * @param {object} obj
   */
  Embedo.mixin = function mixin(obj) {
    var props = ['on', 'off', 'once', 'emit'];
    for (var i = 0; i < props.length; i++) {
      obj.prototype[props[i]] = Embedo.prototype[props[i]];
    }
  };

  /**
   * Embedo Event Listeners
   * @private
   *
   * @implements on
   * @implements off
   * @implements emit
   */
  Embedo.prototype = Object.create({
    on: function (event, listener) {
      if (typeof this.events[event] !== 'object') {
        this.events[event] = [];
      }
      this.events[event].push(listener);
    },
    off: function (event, listener) {
      var index;
      if (typeof this.events[event] === 'object') {
        index = this.events[event].indexOf(listener);
        if (index > -1) {
          this.events[event].splice(index, 1);
        }
      }
    },
    emit: function (event) {
      var i, listeners, length, args = [].slice.call(arguments, 1);
      if (typeof this.events[event] === 'object') {
        listeners = this.events[event].slice();
        length = listeners.length;

        for (i = 0; i < length; i++) {
          listeners[i].apply(this, args);
        }
      }
    },
    once: function (event, listener) {
      this.on(event, function g() {
        this.off(event, g);
        listener.apply(this, arguments);
      });
    }
  });

  /**
   * @method init
   * Primary Embedo initialization
   *
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.init = function (options) {
    Embedo.log('info', 'init', this.requests, options);

    // Append SDK's to parent's body
    appendSDK('facebook', options.facebook);
    appendSDK('twitter', options.twitter);
    appendSDK('instagram', options.instagram);
    appendSDK('pinterest', options.pinterest);
    appendSDK('googlemaps', options.googlemaps);

    /**
     * @func appendSDK
     * Injects SDK's to body
     * @private
     *
     * @param {*} type
     * @param {*} props
     */
    function appendSDK(type, props) {
      if (!type || !props) {
        return;
      }
      var sdk = Embedo.defaults.SOURCES[type.toLowerCase()].SDK;

      if (!Embedo.utils.handleScriptValidation(sdk)) {
        if (props && typeof props === 'object') {
          sdk += (type === 'facebook' ? '#' : '?') + Embedo.utils.querystring(props);
        }
        document.body.appendChild(Embedo.utils.generateScript(sdk));
      }
    }
  };

  /**
   * @method facebook
   * Facebook embed prototype
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.facebook = function (id, element, url, options, callback) {
    var embed_uri = Embedo.defaults.SOURCES.facebook.oEmbed;
    var query = Embedo.utils.merge({
      url: encodeURI(url),
      omitscript: true
    }, options, Embedo.defaults.RESTRICTED);

    if ('width' in options || 'maxwidth' in options) {
      query.maxwidth = options.maxwidth || options.width;
    }

    embed_uri += '?' + Embedo.utils.querystring(query);

    Embedo.utils.fetch(embed_uri, function (error, content) {
      if (error) {
        Embedo.log('error', 'facebook', error);
        return callback(error);
      }
      var container = Embedo.utils.generateEmbed(id, 'facebook', content.html);
      element.appendChild(container);

      facebookify(element, container, {
        id: id,
        url: url,
        strict: options.strict,
        width: options.width,
        height: options.height,
        centerize: options.centerize
      }, function (err, result) {
        if (err) {
          return callback(err);
        }
        callback(null, {
          id: id,
          el: element,
          width: result.width,
          height: result.height
        });
      });
    });
  };

  /**
   * @method twitter
   * Twitter embed prototype
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.twitter = function (id, element, url, options, callback) {
    var embed_uri = Embedo.defaults.SOURCES.twitter.oEmbed;
    var query = Embedo.utils.merge({
      url: encodeURI(url),
      omit_script: 1
    }, options, Embedo.defaults.RESTRICTED);

    if ('width' in options || 'maxwidth' in options) {
      query.maxwidth = options.maxwidth || options.width;
    }

    if ('height' in options || 'maxheight' in options) {
      query.maxheight = options.maxheight || options.height;
    }

    embed_uri += '?' + Embedo.utils.querystring(query);

    Embedo.utils.fetch(embed_uri, function (error, content) {
      if (error) {
        Embedo.log('error', 'twitter', error);
        return callback(error);
      }
      var container = Embedo.utils.generateEmbed(id, 'twitter', content.html);
      element.appendChild(container);

      twitterify(element, container, {
        id: id,
        url: url,
        strict: options.strict,
        width: options.width,
        height: options.height,
        centerize: options.centerize
      }, function (err, result) {
        if (err) {
          return callback(err);
        }
        callback(null, {
          id: id,
          el: element,
          width: result.width,
          height: result.height
        });
      });
    });
  };

  /**
   * @method instagram
   * Instagram embed prototype
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.instagram = function (id, element, url, options, callback) {
    var embed_uri = Embedo.defaults.SOURCES.instagram.oEmbed;
    var query = Embedo.utils.merge({
      url: encodeURI(url),
      omitscript: true,
      hidecaption: true
    }, options, Embedo.defaults.RESTRICTED);

    if ('width' in options || 'maxwidth' in options) {
      options.width = options.maxwidth ? options.maxwidth : options.width;
      if (options.width > 320) {
        query.maxwidth = options.width;
      }
    }

    embed_uri += '?' + Embedo.utils.querystring(query);

    Embedo.utils.fetch(embed_uri, function (error, content) {
      if (error) {
        Embedo.log('error', 'instagram', error);
        return callback(error);
      }

      var container = Embedo.utils.generateEmbed(id, 'instagram', content.html);
      element.appendChild(container);

      instagramify(element, container, {
        id: id,
        url: url,
        strict: options.strict,
        width: options.width,
        height: options.height,
        centerize: options.centerize
      }, function (err, result) {
        if (err) {
          return callback(err);
        }
        callback(null, {
          id: id,
          el: element,
          width: result.width,
          height: result.height
        });
      });
    });
  };

  /**
   * @method youtube
   * YouTube embed prototype
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.youtube = function (id, element, url, options, callback) {
    if (!getYTVideoID(url)) {
      Embedo.log('error', 'youtube', 'Unable to detect Youtube video id.');
      return callback('Unable to detect Youtube video id.');
    }

    var youtube_uri = Embedo.defaults.SOURCES.youtube.oEmbed + getYTVideoID(url) + '?' +
      Embedo.utils.querystring(Embedo.utils.merge({
        modestbranding: 1,
        autohide: 1,
        showinfo: 0
      }, options, Embedo.defaults.RESTRICTED));

    this.iframe(id, element, youtube_uri, options, callback);

    /**
     * @func getYTVideoID
     * @private
     *
     * @param {string} url
     * @returns {String|Boolean}
     */
    function getYTVideoID(url) {
      var regexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
      var match = url.match(regexp);
      return (match && match.length === 2) ? match[1] : false;
    }
  };

  /**
   * @method vimeo
   * Vimeo embed prototype
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.vimeo = function (id, element, url, options, callback) {
    var size = Embedo.utils.dimensions(element, options.width, options.height);
    var embed_options = Embedo.utils.merge({
      url: url,
      width: size.width,
      height: size.height,
      autohide: 1
    }, options, Embedo.defaults.RESTRICTED);
    var embed_uri = Embedo.defaults.SOURCES.vimeo.oEmbed + '?' + Embedo.utils.querystring(embed_options);

    Embedo.utils.fetch(embed_uri, function (error, content) {
      if (error) {
        Embedo.log('error', 'vimeo', error);
        return callback(error);
      }
      var container = Embedo.utils.generateEmbed(id, 'vimeo', content.html);
      element.appendChild(container);

      callback(null, {
        id: id,
        el: element,
        width: size.width,
        height: size.height
      });
    });
  };

  /**
   * @method pinterest
   * Pinterest Embed
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.pinterest = function (id, element, url, options, callback) {
    var size = Embedo.utils.dimensions(element, options.width, options.height);
    var pin_size = (size.width > 600 ? 'large' : (size.width < 345 ? 'small' : 'medium'));
    var pin_el = Embedo.utils.generateElement('a', Embedo.utils.merge({
      'href': url,
      'data-pin-do': options['data-pin-do'] || 'embedPin',
      'data-pin-lang': options['data-pin-lang'] || 'en',
      'data-pin-width': pin_size
    }, options));
    var container = Embedo.utils.generateEmbed(id, 'pinterest', pin_el);
    element.appendChild(container);

    pinterestify(element, container, {
      id: id,
      url: url,
      strict: options.strict,
      width: size.width,
      height: size.height,
      centerize: options.centerize
    }, function (err, result) {
      if (err) {
        Embedo.log('error', 'pinterest', err);
        return callback(err);
      }
      callback(null, {
        id: id,
        el: element,
        width: result.width,
        height: result.height
      });
    });
  };

  /**
   * @method googlemaps
   * Google Maps Embed
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.googlemaps = function (id, element, url, options, callback) {
    var size = Embedo.utils.dimensions(element, options.width, options.height);
    var cordinates = getCordinates(url);
    if (!cordinates) {
      return callback(new Error('unable_to_find_cordinates'));
    }

    var container = Embedo.utils.generateEmbed(id, 'googlemaps');
    element.appendChild(container);

    gmapsify(element, container, {
      url: url,
      width: size.width,
      height: size.height,
      centerize: options.centerize
    }, function (err) {
      if (err) {
        Embedo.log('error', 'googlemaps', err);
        return callback(err);
      }

      var location = new window.google.maps.LatLng(cordinates.lat, cordinates.lng);
      var map = new window.google.maps.Map(container, {
        zoom: options.zoom || 12,
        center: location,
        mapTypeId: options.MapTypeId || window.google.maps.MapTypeId.ROADMAP
      });
      var marker = new window.google.maps.Marker({
        map: map,
        draggable: true,
        animation: window.google.maps.Animation.DROP,
        position: location
      });

      callback(null, {
        id: id,
        el: element,
        width: size.width,
        height: size.height,
        marker: marker
      });
    });

    /**
     * @func getCordinates
     *
     * @param {string} url
     */
    function getCordinates(url) {
      var regex = /@(-?\d+\.\d+),(-?\d+\.\d+),(\d+\.?\d?)+z/;
      var match = url.match(regex);
      return (match && match.length && match[1] && match[2]) ? {
        lat: parseFloat(match[1], 0),
        lng: parseFloat(match[2], 0)
      } : null;
    }
  };

  /**
   * @method github
   * Embed github URLs (gist) to DOM
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.github = function github(id, element, url, options, callback) {
    var size = Embedo.utils.dimensions(element, options.width, options.height);
    var iframe = Embedo.utils.generateElement('iframe', Embedo.utils.merge({
      width: size.width,
      height: size.height
    }, options, Embedo.defaults.RESTRICTED));
    var container = Embedo.utils.generateEmbed(id, 'github', iframe);

    element.appendChild(container);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(
      '<body><style type="text/css">body,html{margin:0;padding:0;border-radius:3px;}' +
      '.gist .gist-file{margin:0 !important;padding:0;}<\/style>' +
      '<script src="' + url + '"><\/script>' +
      '<\/body>'
    );
    iframe.contentWindow.document.close();
    iframe.onerror = function (err) {
      callback(err);
    };
    iframe.onload = function () {
      callback(null, {
        id: id,
        el: element,
        width: Embedo.utils.compute(container, 'width'),
        height: Embedo.utils.compute(container, 'height')
      });
    };
  };

  /**
   * @method iframe
   * Embed URLs to HTML5 frame prototype
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.iframe = function (id, element, url, options, callback) {
    var fragment = document.createDocumentFragment();
    var size = Embedo.utils.dimensions(element, options.width, options.height);
    var extension = (url.substr(url.lastIndexOf('.')) || '').replace('.', '').toLowerCase();
    var mimes = {
      csv: 'text\/csv',
      doc: 'application\/msword',
      docx: 'application\/vnd.openxmlformats-officedocument.wordprocessingml.document',
      pdf: 'application\/pdf',
      gif: 'image\/gif',
      js: 'application\/javascript',
      json: 'application\/json',
      xhtml: 'application\/xhtml+xml',
      pps: 'application\/vnd.ms-powerpoint',
      ppsx: 'application\/vnd.openxmlformats-officedocument.presentationml.slideshow',
      xml: 'application\/xml',
      ogg: 'video\/ogg',
      mp4: 'video\/mp4',
      webm: 'video\/webm',
      html: 'text\/html'
    };
    var mimetype = mimes[extension] || mimes.html;
    var has_video = extension.match(/(mp4|ogg|webm|ogv|ogm)/);
    var el_type = has_video ? 'video' : (options.tagName || 'embed');
    var override = Embedo.utils.merge({}, options, Embedo.defaults.RESTRICTED);
    var embed_el = Embedo.utils.generateElement(el_type, Embedo.utils.merge({
      type: mimetype,
      src: url,
      width: size.width,
      height: size.height
    }, override));

    fragment.appendChild(Embedo.utils.generateEmbed(id, 'iframe', embed_el));
    element.appendChild(fragment);

    if (el_type === 'video') {
      setTimeout(function () {
        callback(null, {
          id: id,
          el: element,
          width: Embedo.utils.compute(embed_el, 'width'),
          height: Embedo.utils.compute(embed_el, 'height')
        });
      }, 250);
    } else {
      embed_el.onerror = function (err) {
        callback(err);
      };
      embed_el.onload = function () {
        callback(null, {
          id: id,
          el: element,
          width: Embedo.utils.compute(embed_el, 'width'),
          height: Embedo.utils.compute(embed_el, 'height')
        });
      };
    }
  };

  /**
   * @method communicate
   * Uses postMessage API to post message to window
   * Helpful in phantom process or testing purposes
   *
   * @param {object} data
   */
  Embedo.prototype.communicate = function communicate(data) {
    window.postMessage(['embedo', 'rendered', JSON.stringify(data)], '*');
  };

  /**
   * @method render
   * Renders an embedo instance
   *
   * @name load
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.render = function (element, url, options, callback) {
    Embedo.log('info', 'render', element, url, options);
    options = options || {};
    callback = callback || function () {};

    if (!element || !Embedo.utils.validateElement(element)) {
      Embedo.log('error', 'render', '`element` is either missing or invalid');
      return this.emit('error', new Error('element_is_missing'));
    }

    if (typeof url !== 'string') {
      return this.emit('error', new Error('invalid_url_string'));
    }

    if (!url || !Embedo.utils.validateURL(url)) {
      Embedo.log('error', 'render', '`url` is either missing or invalid');
      return this.emit('error', new Error('invalid_or_missing_url'));
    }

    var source = getURLSource(url);

    if (!source) {
      Embedo.log('error', 'render', new Error('Invalid or Unsupported URL'));
      return this.emit('error', new Error('url_not_supported'));
    }

    if (!this[source]) {
      Embedo.log('error', 'render', new Error('Requested source is not implemented or missing.'));
      return this.emit('error', new Error('unrecognised_url'));
    }

    if ('width' in options && options.width) {
      options.width = Embedo.utils.convertToPx(element, 'width', options.width);
    }

    if ('height' in options && options.height) {
      options.height = Embedo.utils.convertToPx(element, 'height', options.height);
    }

    var id = Embedo.utils.uuid();
    var request = {
      id: id,
      el: element,
      source: source,
      url: url,
      attributes: options
    };

    this.requests.push(request);

    this.emit('watch', 'load', request);

    this[source](id, element, url, options,
      function (err, data) {
        if (err) {
          this.emit('error', err);
          return callback(err);
        }
        data.url = request.url;
        data.source = request.source;
        data.options = request.attributes;
        this.communicate(data);
        this.emit('watch', 'loaded', data);
        callback(null, data);
      }.bind(this)
    );

    /**
     * @function getURLSource
     * Checks Source from URI
     *
     * @param {string} url
     * @returns {string}
     */
    function getURLSource(url) {
      var urlRegExp = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      var sources = Object.keys(Embedo.defaults.SOURCES) || [];

      if (!urlRegExp.test(url)) {
        return null;
      }

      var matched_source = sources.filter(function (source) {
        if (Embedo.defaults.SOURCES[source] && url.match(Embedo.defaults.SOURCES[source].REGEX)) {
          return source;
        }
      }).filter(Boolean);

      return matched_source && matched_source.length ? matched_source[0] : 'iframe';
    }
  };

  /**
   * @method load
   * Loads single or multiple embedo instances
   *
   * @name load
   * @param {HTMLElement} element
   * @param {String|Array} urls
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.load = function (element, urls, options) {
    Embedo.log('info', 'load', element, urls, options);
    options = options || {};
    var observer = new Embedo.utils.observer();

    if (!element || !Embedo.utils.validateElement(element)) {
      Embedo.log('error', 'load', '`element` is either missing or invalid');
      this.emit('error', new Error('element_is_missing'));
    } else {
      if (urls instanceof Array) {
        var reqs = {
          failed: [],
          finished: []
        };
        var jobs = urls.map(function (url) {
          return function (done) {
            this.render(element, url, options, function (err, data) {
              if (err) {
                reqs.failed.push(err);
                return done(err);
              }
              reqs.finished.push(data);
              done(null, data);
            });
          }.bind(this);
        }.bind(this));

        Embedo.utils.sequencer.apply(this, jobs).then(function () {
          if (reqs.failed.length > 0) {
            return observer.reject(reqs.failed);
          }
          observer.resolve(reqs.finished);
        });
      } else if (typeof urls === 'string') {
        this.render(element, urls, options, function (err, data) {
          if (err) {
            return observer.reject(err);
          }
          observer.resolve(data);
        });
      } else {
        this.emit('error', new Error('invalid_url_string'));
      }
    }

    return observer;
  };

  /**
   * @method refresh
   * Refresh single or all embedo instances
   *
   * @param {object} element
   */
  Embedo.prototype.refresh = function (element) {
    Embedo.log('info', 'refresh', this.requests, element);
    if (this.requests.length === 0) {
      return;
    }
    this.requests.forEach(function (request) {
      if (!request.el) {
        return;
      }

      if (request.source === 'iframe' || request.source === 'googlemaps') {
        return this.emit('refresh', request, {
          width: Embedo.utils.compute(request.el, 'width'),
          height: Embedo.utils.compute(request.el, 'height')
        });
      }

      if (element) {
        if (!Embedo.utils.validateElement(element)) {
          return;
        }
        if (element === request.el) {
          automagic(request.el, document.getElementById(request.id), request.attributes,
            function (err, data) {
              if (data) {
                this.emit('refresh', request, data);
              }
            }.bind(this));
        }
      } else {
        automagic(request.el, document.getElementById(request.id), request.attributes,
          function (err, data) {
            if (data) {
              this.emit('refresh', request, data);
            }
          }.bind(this));
      }
    }.bind(this));

    return this;
  };

  /**
   * @method destroy
   * Destroy an/all instance(s) of embedo
   *
   * @param {object} element
   */
  Embedo.prototype.destroy = function (element) {
    Embedo.log('warn', 'destroy', this.requests, element);
    if (this.requests.length === 0) {
      return;
    }
    var removed = [];

    this.requests.forEach(function (request) {
      if (!request.el || !Embedo.utils.validateElement(request.el)) {
        return;
      }
      if (element) {
        if (!Embedo.utils.validateElement(element)) {
          return;
        }
        if (element === request.el) {
          if (document.getElementById(request.id)) {
            document.getElementById(request.id).remove();
          }
          removed.push(request.id);
          this.emit('destroy', request);
        }
      } else {
        if (document.getElementById(request.id)) {
          document.getElementById(request.id).remove();
        }
        removed.push(request.id);
        this.emit('destroy', request);
      }
    }.bind(this));

    this.requests = this.requests.filter(function (request) {
      return removed.indexOf(request.id) < 0;
    });

    return this;
  };

  /**
   * @function facebookify
   * Parses Facebook SDK
   *
   * @param {HTMLElement} parentNode
   * @param {HTMLElement} childNode
   * @param {object} options
   */
  function facebookify(parentNode, childNode, options, callback) {
    sdkReady('facebook', function (err) {
      if (err) {
        return callback(err);
      }
      window.FB.XFBML.parse(parentNode);
      window.FB.Event.subscribe('xfbml.render', function () {
        // First state will be `parsed` and then `rendered` to acknowledge embed.
        if (childNode.firstChild) {
          if (options.centerize !== false) {
            Embedo.utils.centerize(parentNode, childNode, options);
          }
          if (childNode.firstChild.getAttribute('fb-xfbml-state') === 'rendered') {
            automagic(parentNode, childNode, options, callback);
          }
        }
      });
    });
  }

  /**
   * @function twitterify
   * Parses Twitter SDK
   *
   * @param {HTMLElement} parentNode
   * @param {HTMLElement} childNode
   * @param {object} options
   */
  function twitterify(parentNode, childNode, options, callback) {
    sdkReady('twitter', function (err) {
      if (err) {
        return callback(err);
      }
      window.twttr.widgets.load(childNode);
      window.twttr.events.bind('rendered', function (event) {
        if (childNode.firstChild && childNode.firstChild.getAttribute('id') === event.target.getAttribute('id')) {
          if (options.centerize !== false) {
            Embedo.utils.centerize(parentNode, childNode, options);
          }
          automagic(parentNode, childNode, options, callback);
        }
      });
    });
  }

  /**
   * @function instagramify
   * Parses Instagram SDK
   *
   * @param {HTMLElement} parentNode
   * @param {HTMLElement} childNode
   * @param {object} options
   */
  function instagramify(parentNode, childNode, options, callback) {
    sdkReady('instagram', function (err) {
      if (err) {
        return callback(err);
      }
      if (!window.instgrm.Embeds || !window.instgrm.Embeds) {
        return callback(new Error('instagram_sdk_missing'));
      }

      window.instgrm.Embeds.process(childNode);
      var instagram_embed_timer = setInterval(handleInstagramRendered, 250);

      function handleInstagramRendered() {
        if (childNode.firstChild && childNode.firstChild.className.match(/instagram-media-rendered/)) {
          clearInterval(instagram_embed_timer);
          if (options.centerize !== false) {
            Embedo.utils.centerize(parentNode, childNode, options);
          }
          return automagic(parentNode, childNode, options, callback);
        }
      }
    });
  }

  /**
   * @function pinterestify
   * Parses Pinterest SDK
   *
   * @param {HTMLElement} parentNode
   * @param {HTMLElement} childNode
   * @param {object} options
   */
  function pinterestify(parentNode, childNode, options, callback) {
    sdkReady('pinterest', function (err) {
      if (err) {
        return callback(err);
      }
      if (!window.PinUtils || !window.PinUtils || !childNode || !childNode.firstChild) {
        return callback(new Error('pinterest_sdk_missing'));
      }

      var pinterest_embed_timer = setInterval(handlePinterestEmbed, 250);

      setTimeout(function () {
        if (!childNode.querySelector('[data-pin-href]')) {
          window.PinUtils.build(childNode);
        }
      }, 750);

      function handlePinterestEmbed() {
        if (childNode.querySelector('[data-pin-href]')) {
          clearInterval(pinterest_embed_timer);
          if (options.centerize !== false) {
            Embedo.utils.centerize(parentNode, childNode, options);
          }
          return automagic(parentNode, childNode, options, callback);
        } else if (pinterest_embed_timer >= 100) {
          clearInterval(pinterest_embed_timer);
          return callback(new Error('pinterest_embed_failed'));
        }
      }
    });
  }

  /**
   * @function gmapsify
   * Parses Google Maps SDK
   *
   * @param {HTMLElement} parentNode
   * @param {HTMLElement} childNode
   * @param {object} options
   */
  function gmapsify(parentNode, childNode, options, callback) {
    sdkReady('googlemaps', function (err) {
      if (err) {
        return callback(err);
      }
      if (options.centerize !== false) {
        Embedo.utils.centerize(parentNode, childNode, options);
      }
      childNode.style.width = options.width ? options.width + 'px' : Embedo.utils.compute(parentNode, 'width');
      childNode.style.height = options.height ? options.height + 'px' : Embedo.utils.compute(parentNode, 'height');
      callback(null, {});
    });
  }

  /**
   * @function automagic
   * Automagic - Scales and resizes embed container
   *
   * @param {HTMLElement} parentNode
   * @param {HTMLElement} childNode
   * @param {object} options
   */
  function automagic(parentNode, childNode, options, callback) {
    Embedo.log('info', 'automagic', parentNode, childNode, options);
    options = options || {};
    callback = callback || function () {};

    if (!Embedo.utils.validateElement(parentNode) || !Embedo.utils.validateElement(childNode)) {
      return callback(new Error('HTMLElement does not exist in DOM.'));
    }

    Embedo.utils.watcher(options.id || Embedo.utils.uuid(), function () {
      var parent = {
        width: options.width || Embedo.utils.compute(parentNode, 'width'),
        height: options.height || Embedo.utils.compute(parentNode, 'height')
      };
      var child = {
        width: Embedo.utils.compute(childNode, 'width'),
        height: Embedo.utils.compute(childNode, 'height')
      };

      if (options.strict) {
        return callback(null, {
          width: parent.width,
          height: parent.height
        });
      }

      // Normalize unecessary adding padding/margins/dimensions
      if (childNode.firstChild) {
        childNode.firstChild.style.margin = '0 auto !important';
        childNode.firstChild.style.padding = '0 !important';
        childNode.firstChild.style.minWidth = 'none !important';
        childNode.firstChild.style.maxWidth = 'none !important';
        childNode.firstChild.style.minHeight = 'none !important';
        childNode.firstChild.style.maxHeight = 'none !important';
      }

      // Odd case when requested height is beyond limit of third party
      // Only apply when fixed width and heights are provided
      if (options.width && options.height) {
        var isOverflowing = (child.width > parent.width || child.height > parent.height);

        if (options.width) {
          childNode.style.width = options.width + 'px';
        }
        if (options.height) {
          childNode.style.height = options.height + 'px';
        }
        if (isOverflowing) {
          var scale = Math.min((parent.width / child.width), (parent.height / child.height));
          Embedo.utils.transform(childNode, 'scale(' + scale + ')');
        }
      }

      callback(null, {
        width: parent.width,
        height: parent.height
      });
    }, 500);
  }

  /**
   * @function sdkReady
   * Checks when SDK global object is ready
   *
   * @param {string} type
   * @param {function} callback
   */
  function sdkReady(type, callback) {
    callback = callback || function () {};
    if (!Embedo.defaults.SOURCES[type]) {
      return callback(new Error('unsupported_sdk_type'));
    }
    var counter = 0;
    (function check() {
      counter++;
      if (counter > 15) {
        return callback(new Error('sdk_not_available'));
      }
      if (window[Embedo.defaults.SOURCES[type].GLOBAL]) {
        return callback(null, window[Embedo.defaults.SOURCES[type].GLOBAL]);
      }
      setTimeout(check, 10 * counter);
    })(type);
  }

  return Embedo;
});
