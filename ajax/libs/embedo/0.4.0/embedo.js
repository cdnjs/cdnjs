/**
 * @file Embedo JS
 *
 * @author Shobhit Sharma <hi@shobh.it>
 */

(function (global, factory) {
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
   * Embedo Prototype
   *
   * @class
   * @param {object} options Initialize options.
   */
  function Embedo(options) {
    this.options = options || Embedo.defaults.OPTIONS;
    this.requests = [];
    this.events = [];

    this.init(this.options);

    return this;
  }

  Embedo.defaults = {
    OPTIONS: {
      facebook: true,
      twitter: true,
      instagram: true,
      pinterest: false
    },
    FACEBOOK: {
      SDK: 'https://connect.facebook.net/en_US/all.js#version=${version}&appId‌​=${appId}&coo‌​kie=${coo‌​kie}&xfbml=${xfbml}',
      oEmbed: 'https://www.facebook.com/plugins/post/oembed.json',
      REGEX: /^http[s]*:\/\/[www.]*facebook\.com.*/i,
      PARAMS: {
        version: 'v2.8',
        cookie: true,
        appId: '269918776508696',
        xfbml: true
      },
      RESTRICTED: ['url', 'strict', 'height', 'width']
    },
    TWITTER: {
      SDK: 'https://platform.twitter.com/widgets.js',
      oEmbed: 'https://publish.twitter.com/oembed',
      REGEX: /^http[s]*:\/\/[www.]*twitter\.com.*/i,
      PARAMS: {},
      RESTRICTED: ['url', 'strict', 'height', 'width']
    },
    INSTAGRAM: {
      SDK: 'https://platform.instagram.com/en_US/embeds.js',
      oEmbed: 'https://api.instagram.com/oembed',
      REGEX: /^http[s]*:\/\/[www.]*instagram\.com.*/i,
      PARAMS: {},
      RESTRICTED: ['url', 'strict', 'height', 'width']
    },
    YOUTUBE: {
      SDK: null,
      oEmbed: 'https://www.youtube.com/embed/',
      REGEX: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
      PARAMS: null,
      RESTRICTED: ['url', 'strict', 'height', 'width']
    },
    PINTEREST: {
      SDK: 'https://assets.pinterest.com/js/pinit.js',
      oEmbed: null,
      REGEX: /(https?:\/\/(ww.)?)?pinterest\.com.*/i,
      PARAMS: {},
      RESTRICTED: ['url', 'strict', 'height', 'width']
    }
  };

  /**
   * Embedo Event Listeners
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
   * @method Facebook Embed
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.facebook = function (id, element, url, options, callback) {
    var embed_uri = Embedo.defaults.FACEBOOK.oEmbed;
    var query = extender({
      url: encodeURI(url),
      omitscript: true
    }, options, Embedo.defaults.FACEBOOK.RESTRICTED);

    if (options.width && parseInt(options.width) > 0) {
      query.maxwidth = options.maxwidth || options.width;
    }

    embed_uri += '?' + toQueryString(query);

    fetch(embed_uri, function (error, content) {
      if (error) {
        console.error(error);
        return;
      }
      var container = generateEmbed('facebook', content.html);
      element.appendChild(container);

      facebookify(element, container, {
        strict: options.strict,
        width: options.width,
        height: options.height
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
   * @method Twitter Embed
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.twitter = function (id, element, url, options, callback) {
    var embed_uri = Embedo.defaults.TWITTER.oEmbed;
    var query = extender({
      url: encodeURI(url),
      omit_script: 1
    }, options, Embedo.defaults.TWITTER.RESTRICTED);

    if (options.width && parseInt(options.width) > 0) {
      query.maxwidth = options.maxwidth || options.width;
    }

    embed_uri += '?' + toQueryString(query);

    fetch(embed_uri, function (error, content) {
      if (error) {
        console.error(error);
        return;
      }
      var container = generateEmbed('twitter', content.html);
      element.appendChild(container);

      twitterify(element, container, {
        strict: options.strict,
        width: options.width,
        height: options.height
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
   * @method Instagram Embed
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.instagram = function (id, element, url, options, callback) {
    var embed_uri = Embedo.defaults.INSTAGRAM.oEmbed;
    var query = extender({
      url: encodeURI(url),
      omitscript: true,
      hidecaption: true
    }, options, Embedo.defaults.INSTAGRAM.RESTRICTED);

    if (options.maxwidth > 320 || options.width && parseInt(options.width) > 320) {
      query.maxwidth = options.maxwidth || options.width;
    }

    embed_uri += '?' + toQueryString(query);

    fetch(embed_uri, function (error, content) {
      if (error) {
        console.error(error);
        return;
      }
      var container = generateEmbed('instagram', content.html);

      element.appendChild(container);

      instagramify(element, container, {
        strict: options.strict,
        width: options.width,
        height: options.height
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
   * @method YouTube Embed
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.youtube = function (id, element, url, options, callback) {
    if (!getYTVideoID(url)) {
      console.error('Unable to detect Youtube video id.');
      return;
    }

    var embed_options = extender({
      modestbranding: 1,
      autohide: 1,
      showinfo: 0
    }, options, Embedo.defaults.YOUTUBE.RESTRICTED);

    var elementWidth = compute(element, 'width', true);
    var width = (options.width && parseInt(options.width || 0) > 10) ?
      options.width : (elementWidth > 0 ? elementWidth : '100%');
    var height = (options.height && parseInt(options.height || 0) > 10) ?
      options.height : (elementWidth > 0 ? elementWidth / 1.5 : '100%');

    var embed_uri = Embedo.defaults.YOUTUBE.oEmbed + getYTVideoID(url) + '?' + toQueryString(embed_options);

    element.appendChild(generateEmbed('youtube',
      '<iframe src="' + embed_uri + '" ' + 'width="' + width + '" height="' + height + '"' +
      'frameborder="0" allowtransparency="true"></iframe>'
    ));

    callback(null, {
      id: id,
      el: element,
      width: width,
      height: height
    });

    function getYTVideoID(url) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = url.match(regExp);
      return (match && match[7].length == 11) ? match[7] : false;
    }
  };

  /**
   * @method Pinterest Embed
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.pinterest = function (id, element, url, options, callback) {
    var elementWidth = compute(element, 'width', true);
    var width = (options.width && parseInt(options.width || 0) > 10) ?
      options.width : (elementWidth > 0 ? elementWidth : '100%');
    var height = (options.height && parseInt(options.height || 0) > 10) ?
      options.height : (elementWidth > 0 ? elementWidth / 1.5 : '100%');
    var pinSize = (width > 600 ? 'large' : (width < 345 ? 'small' : 'medium'));
    var pin_el = '<a data-pin-do="embedPin" ';
    if (options.data_ping_lang) {
      pin_el += 'data-pin-lang="' + options.data_ping_lang + '"';
    }
    pin_el += 'data-pin-width="' + pinSize + '" href="' + url + '"></a>';
    var container = generateEmbed('pinterest', pin_el);

    element.appendChild(container);

    pinterestify(element, container, {
      strict: options.strict,
      width: options.width,
      height: options.height
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
  };

  /**
   * @method Initialize auth component
   *
   * @name init
   *
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.init = function (options) {
    console.log('Embedo Initialized..', options);

    appendSDK('facebook', options.facebook);
    appendSDK('twitter', options.twitter);
    appendSDK('instagram', options.instagram);
    appendSDK('pinterest', options.pinterest);

    // Injects SDK's to body
    function appendSDK(type, props) {
      var sdk = Embedo.defaults[type.toUpperCase()].SDK;

      if (!handleScriptValidation(sdk)) {
        if (props && typeof props === 'object') {
          sdk = substitute(sdk, extender(Embedo.defaults[type.toUpperCase()].PARAMS, props));
        }
        document.body.appendChild(generateScript(sdk));
      }
    }
  };

  /**
   * @method Initialize auth component
   *
   * @name load
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.load = function (element, url, options) {
    console.log('Embedo Load:', element, url, options);
    options = options || {};
    if (!element || !validateElement(element)) {
      console.error('`element` is either missing or invalid');
      return;
    }
    if (!url || !validateURL(url)) {
      console.error('`url` is either missing or invalid');
      return;
    }

    var source = getURLSource(url);

    if (!source) {
      console.error(new Error('Invalid or Unsupported URL'));
      return;
    }
    if (!this[source]) {
      console.error(new Error('Requested source is not implemented or missing.'));
      return;
    }

    var id = uuid();

    this.requests.push({
      id: id,
      el: element,
      source: source,
      url: url,
      attributes: options
    });

    // Process Requests
    this[source](
      id, element, url, options,
      function (err, data) {
        if (err) {
          return this.emit('error', err);
        }
        this.emit('watch', data);
      }.bind(this)
    );
  };

  /**
   * @method refresh
   * Refresh an/all instance(s) of embedo
   *
   * @param {object} element
   */
  Embedo.prototype.refresh = function (element) {
    this.requests.forEach(function (request) {
      if (element && validateElement(element)) {
        if (element === request.el && request.el.firstChild) {
          automagic(request.el, request.el.firstChild, request.attributes, function (err, data) {
            if (data) {
              this.emit('refresh', request, data);
            }
          }.bind(this));
        }
      } else {
        if (!request.el.firstChild) {
          console.log('Embedo Refresh:', 'Too early to refresh, child is yet to be generated.');
          return;
        }
        automagic(request.el, request.el.firstChild, request.attributes, function (err, data) {
          if (data) {
            this.emit('refresh', request, data);
          }
        }.bind(this));
      }
    }.bind(this));
  };

  /**
   * @method destroy
   * Destroy an/all instance(s) of embedo
   *
   * @param {object} element
   */
  Embedo.prototype.destroy = function (element) {
    this.requests.forEach(function (request, index, requests) {
      if (element && validateElement(element)) {
        if (element === request.el) {
          element.remove();
          requests.splice(index, 1);
        }
      } else {
        if (!request.el || !validateElement(request.el)) {
          return;
        }
        request.el.remove();
      }
    }).bind(this);

    if (!element) {
      while (this.requests.length) {
        this.requests.pop();
      }
      this.emit('destroy');
    }
  };

  /**
   * @function uuid
   *
   * @returns {string}
   */
  function uuid() {
    var d = new Date().getTime();
    var uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uid;
  }

  /**
   * @function validateURL
   *
   * @param {string} url
   * @returns
   */
  function validateURL(url) {
    return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
  }

  /**
   * Generates script tag element
   *
   * @param {string} source
   * @returns HTMLElement
   */
  function generateScript(source) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = encodeURI(source);
    script.setAttribute('async', '');
    script.setAttribute('charset', 'utf-8');
    return script;
  }

  function generateElement(type, id, className) {
    var elm = document.createElement(type);
    elm.setAttribute('id', id);
    elm.setAttribute('className', className);
    return elm;
  }

  /**
   * Validates if passed argument is valid DOM element
   *
   * @param {object} obj
   * @returns HTMLElement
   */
  function validateElement(obj) {
    try {
      return obj instanceof HTMLElement;
    } catch (e) {
      return (typeof obj === "object") &&
        (obj.nodeType === 1) && (typeof obj.style === "object") &&
        (typeof obj.ownerDocument === "object");
    }
  }

  /**
   * Checks Source from URI
   *
   * @param {string} url
   * @returns
   */
  function getURLSource(url) {
    var type;
    var urlRegExp = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    if (!urlRegExp.test(url)) {
      return;
    }

    if (url.match(Embedo.defaults.FACEBOOK.REGEX)) {
      return 'facebook';
    } else if (url.match(Embedo.defaults.TWITTER.REGEX)) {
      return 'twitter';
    } else if (url.match(Embedo.defaults.INSTAGRAM.REGEX)) {
      return 'instagram';
    } else if (url.match(Embedo.defaults.YOUTUBE.REGEX)) {
      return 'youtube';
    } else if (url.match(Embedo.defaults.PINTEREST.REGEX)) {
      return 'pinterest';
    }
  }

  /**
   * Object to Query String
   *
   * @param {object} obj
   * @returns
   */
  function toQueryString(obj) {
    var parts = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
      }
    }
    return parts.join('&');
  }

  /**
   * JSONP XHR fetch
   *
   * @param {string} url
   * @param {object} options
   * @param {function} callback
   */
  function fetch(url, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options = options || {};

    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function (data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(null, data);
    };

    var script = document.createElement('script');
    script.type = 'application/javascript';
    script.async = true;
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }

  /**
   * Generates Embed Container
   *
   * @param {string} source
   * @param {string} html
   * @returns
   */
  function generateEmbed(source, html) {
    var container = document.createElement('div');
    container.setAttribute('data-embed', source);
    container.innerHTML = html;
    return container;
  }

  /**
   * Parses Facebook SDK
   *
   * @param {HTMLElement} parentNode
   * @param {HTMLElement} childNode
   * @param {object} options
   */
  function facebookify(parentNode, childNode, options, callback) {
    sdkReady('facebook', function (err) {
      if (err) {
        return;
      }
      window.FB.XFBML.parse(parentNode);
      window.FB.Event.subscribe('xfbml.render', function () {
        if (!childNode.firstChild) {
          return;
        }
        if (childNode.firstChild.getAttribute('fb-xfbml-state') === 'rendered') {
          automagic(parentNode, childNode, options, callback);
        }
      });
    });
  }

  /**
   * Parses Twitter SDK
   *
   * @param {HTMLElement} parentNode
   * @param {HTMLElement} childNode
   * @param {object} options
   */
  function twitterify(parentNode, childNode, options, callback) {
    sdkReady('twitter', function (err) {
      if (err) {
        return;
      }
      window.twttr.widgets.load(childNode);
      window.twttr.events.bind('rendered', function (event) {
        if (childNode.firstChild && childNode.firstChild.getAttribute('id') === event.target.getAttribute('id')) {
          automagic(parentNode, childNode, options, callback);
        }
      });
    });
  }

  /**
   * Parses Instagram SDK
   *
   * @param {HTMLElement} parentNode
   * @param {HTMLElement} childNode
   * @param {object} options
   */
  function instagramify(parentNode, childNode, options, callback) {
    sdkReady('instagram', function (err) {
      if (err) {
        return;
      }
      if (!window.instgrm.Embeds || !window.instgrm.Embeds) {
        return;
      }
      setTimeout(function () {
        window.instgrm.Embeds.process(childNode);
        automagic(parentNode, childNode, options, callback);
      }, 0);
    });
  }

  /**
   * Parses Pinterest SDK
   *
   * @param {HTMLElement} parentNode
   * @param {HTMLElement} childNode
   * @param {object} options
   */
  function pinterestify(parentNode, childNode, options, callback) {
    sdkReady('pinterest', function (err) {
      if (err) {
        return;
      }
      if (!window.PinUtils || !window.PinUtils) {
        return;
      }
      var pinned = childNode.querySelector('[data-pin-id]');

      automagic(parentNode, parentNode, {
        width: compute(childNode, 'width', true),
        height: compute((pinned || childNode), 'height', true)
      }, callback);
    });
  }

  /**
   * Automagic - Salces and Resizes embed container
   *
   * @param {HTMLElement} parentNode
   * @param {HTMLElement} childNode
   * @param {object} options
   */
  function automagic(parentNode, childNode, options, callback) {
    console.log('automagic', parentNode, childNode, options);
    options = options || {};
    callback = callback || function () {};

    if (!validateElement(parentNode) || !validateElement(childNode)) {
      return callback(new Error('HTMLElement does not exist in DOM.'));
    }

    // Attach Flex mode to center container
    childNode.style.display = '-webkit-box';
    childNode.style.display = '-moz-box';
    childNode.style.display = '-ms-flexbox';
    childNode.style.display = '-webkit-flex';
    childNode.style.display = 'flex';
    childNode.style['justify-content'] = 'center';
    childNode.style['align-items'] = 'center';

    setTimeout(function () {
      var parent = {
        width: options.width || compute(parentNode, 'width', true),
        height: options.height || compute(parentNode, 'height', true)
      };
      var child = {
        width: compute(childNode, 'width', true),
        height: compute(childNode, 'height', true)
      };

      if (options.strict) {
        return callback(null, {
          width: parent.width,
          height: parent.height
        });
      }

      if (childNode.firstChild) {
        // Normalize unecessary adding padding/margins/dimensions
        childNode.firstChild.style.margin = '0 auto !important';
        childNode.firstChild.style.padding = '0 !important';
        childNode.firstChild.style.minWidth = 'auto !important';
        childNode.firstChild.style.maxWidth = 'auto !important';
        childNode.firstChild.style.minHeight = 'auto !important';
        childNode.firstChild.style.maxHeight = 'auto !important';

        child.width = compute(childNode.firstChild, 'width', true) || child.width;
        child.height = compute(childNode.firstChild, 'height', true) || child.height;

        // Odd case when requested height is beyond limit of third party
        if ((child.width > parent.width || child.height > parent.height) &&
          (parent.height > 0 && child.height > 0)) {
          var scale = Math.min((parent.width / child.width), (parent.height / child.height));

          transform(childNode, 'scale(' + scale + ')');
        }

        if (options.height > 0) {
          childNode.style.height = options.height + 'px';
        }
      }

      callback(null, {
        width: parent.width,
        height: parent.height
      });
    }, 750);
  }

  /**
   * Cross Browser CSS Transformation
   *
   * @param {HTMLElement} element
   * @param {string} props
   */
  function transform(element, props) {
    if (!validateElement(element)) {
      return;
    }
    element.style.webkitTransform = props;
    element.style.MozTransform = props;
    element.style.msTransform = props;
    element.style.OTransform = props;
    element.style.transform = props;
  }

  /**
   * Checks when SDK global object is ready
   *
   * @param {string} type
   * @param {function} callback
   */
  function sdkReady(type, callback) {
    callback = callback || function () {};
    var counter = 0;

    (function check() {
      counter++;
      if (counter > 15) {
        return callback(new Error('sdk_not_available'));
      }
      if (type === 'facebook') {
        if (window.FB) {
          return callback();
        }
      } else if (type === 'twitter') {
        if (window.twttr) {
          return callback();
        }
      } else if (type === 'instagram') {
        if (window.instgrm) {
          return callback();
        }
      } else if (type === 'pinterest') {
        if (window.PinUtils) {
          return callback();
        }
      } else {
        return callback(new Error('unsupported_sdk_type'));
      }
      setTimeout(check, 10 * counter);
    })(type);
  }

  /**
   * Computes property value of HTMLElement
   *
   * @param {HTMLElement} element
   * @param {string} prop
   * @returns
   */
  function compute(element, prop, raw) {
    if (!validateElement(element)) {
      return;
    }
    var dimension = 0;
    var custom_dimension = null;

    if (prop === 'height') {
      if (!isNaN(element.style.height)) {
        custom_dimension = element.style.height;
      }
      dimension = custom_dimension || element.clientHeight || element.offsetHeight || element.scrollHeight;

    } else if (prop === 'width') {
      if (!isNaN(element.style.width)) {
        custom_dimension = element.style.width;
      }
      if (!isNaN(element.getAttribute('data-width'))) {
        custom_dimension = element.getAttribute('data-width');
      }
      if (!isNaN(element.style.maxWidth)) {
        custom_dimension = element.style.maxWidth;
      }
      dimension = custom_dimension || element.clientWidth || element.offsetWidth || element.scrollWidth;

    } else {
      dimension = element.style[prop];
    }

    return raw ? parseInt(dimension) : parseInt(dimension) + 'px';
  }

  /**
   * @function Object extender
   *
   * @param {object} destination
   * @param {object} source
   * @param {array} preserve
   * @returns
   */
  function extender(destination, source, preserve) {
    preserve = preserve || [];
    for (var property in source) {
      if (preserve.indexOf(property) === -1) {
        destination[property] = source[property];
      }
    }
    return destination;
  }

  /**
   * @function subtitute
   * Substitues character in string within ${*} scope
   *
   * @param {string} str
   * @param {object} obj
   * @returns
   */
  function substitute(str, obj) {
    if (!str || !obj) {
      return;
    }
    if (obj) {
      for (var key in obj) {
        if (str) {
          str = str.split('${' + key + '}').join(obj[key]);
        }
      }
    }
    return str;
  }

  /**
   * @function handleScriptValidation
   *
   * @param {string} url
   */
  function handleScriptValidation(url) {
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

  return Embedo;
});
