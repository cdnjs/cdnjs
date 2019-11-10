/**
 * @file Embedo JS
 *
 * Embedo is third party embed plugin with features having events and resizing.
 * It provides a layer above popular social media sites native embed snippets
 * making it easier to hook content without writing or touching many files in any
 * website source.
 *
 * @license MIT
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

  /**
   * @default Embedo defaults
   * @description Embedo defaults contains basic configuration and values required to build internal engine.
   */
  Embedo.defaults = {
    OPTIONS: {
      facebook: true,
      twitter: true,
      instagram: true,
      pinterest: false
    },
    FACEBOOK: {
      SDK: 'https://connect.facebook.net/en_US/all.js',
      oEmbed: 'https://www.facebook.com/plugins/post/oembed.json',
      REGEX: /^http[s]*:\/\/[www.]*facebook(\.[a-z]+).*/i,
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
      REGEX: /^http[s]*:\/\/[www.]*twitter(\.[a-z]+).*/i,
      PARAMS: {},
      RESTRICTED: ['url', 'strict', 'height', 'width']
    },
    INSTAGRAM: {
      SDK: 'https://platform.instagram.com/en_US/embeds.js',
      oEmbed: 'https://api.instagram.com/oembed',
      REGEX: /^http[s]*:\/\/[www.]*instagram(\.[a-z]+).*/i,
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
      REGEX: /(https?:\/\/(ww.)?)?pinterest(\.[a-z]+).*/i,
      PARAMS: {},
      RESTRICTED: ['url', 'strict', 'height', 'width']
    },
    VIMEO: {
      SDK: null,
      oEmbed: 'https://vimeo.com/api/oembed.json',
      REGEX: /(http|https)?:\/\/(www\.)?vimeo(\.[a-z]+)\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/,
      PARAMS: {},
      RESTRICTED: ['url', 'strict', 'height', 'width']
    },
    GOOGLEMAPS: {
      SDK: 'https://maps.googleapis.com/maps/api/js',
      oEmbed: null,
      REGEX: /(http|https)?:\/\/(www\.|maps\.)?google(\.[a-z]+){1,2}\/maps\/.*/i,
      PARAMS: {},
      RESTRICTED: ['url', 'strict', 'height', 'width']
    }
  };

  /**
   * @private Embedo Event Listeners
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
    appendSDK('googlemaps', options.googlemaps);

    // Adds window resize event
    window.addEventListener('resize', this.emit('watch', 'window-resize', {
      resize: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }), false);

    // Injects SDK's to body
    function appendSDK(type, props) {
      if (!props) {
        return;
      }
      var sdk = Embedo.defaults[type.toUpperCase()].SDK;

      if (!handleScriptValidation(sdk)) {
        if (props && typeof props === 'object') {
          sdk += (type === 'facebook' ? '#' : '?') + toQueryString(props);
        }
        document.body.appendChild(generateScript(sdk));
      }
    }
  };

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
        return callback(error);
      }
      var container = generateEmbed('facebook', content.html);
      element.appendChild(container);

      facebookify(element, container, {
        id: id,
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
        return callback(error);
      }
      var container = generateEmbed('twitter', content.html);
      element.appendChild(container);

      twitterify(element, container, {
        id: id,
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

    options.width = parseInt((options.maxwidth ? options.maxwidth : options.width), 10);

    if (options.width > 320 && options.width < 750) {
      query.maxwidth = options.width;
    }

    embed_uri += '?' + toQueryString(query);

    fetch(embed_uri, function (error, content) {
      if (error) {
        console.error(error);
        return callback(error);
      }
      var container = generateEmbed('instagram', content.html);

      element.appendChild(container);

      instagramify(element, container, {
        id: id,
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
   * @method youtube
   * YouTube Embed
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
      return callback('Unable to detect Youtube video id.');
    }

    var embed_options = extender({
      modestbranding: 1,
      autohide: 1,
      showinfo: 0
    }, options, Embedo.defaults.YOUTUBE.RESTRICTED);

    var size = getDimensions(element, options.width, options.height);
    var embed_uri = Embedo.defaults.YOUTUBE.oEmbed + getYTVideoID(url) + '?' + toQueryString(embed_options);

    element.appendChild(generateEmbed('youtube',
      '<iframe src="' + embed_uri + '" ' + 'width="' + size.width + '" height="' + size.height + '"' +
      'frameborder="0" allowtransparency="true"></iframe>'
    ));

    callback(null, {
      id: id,
      el: element,
      width: size.width,
      height: size.height
    });

    function getYTVideoID(url) {
      var regexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
      var match = url.match(regexp);
      return (match && match.length === 2) ? match[1] : false;
    }
  };

  /**
   * @method vimeo
   * Vimeo Embed
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.vimeo = function (id, element, url, options, callback) {
    var size = getDimensions(element, options.width, options.height);
    var embed_options = extender({
      url: url,
      width: size.width,
      height: size.height,
      autohide: 1,
    }, options, Embedo.defaults.VIMEO.RESTRICTED);
    var embed_uri = Embedo.defaults.VIMEO.oEmbed + '?' + toQueryString(embed_options);

    fetch(embed_uri, function (error, content) {
      if (error) {
        console.error(error);
        return callback(error);
      }
      var container = generateEmbed('vimeo', content.html);
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
    var size = getDimensions(element, options.width, options.height);
    var pin_size = (size.width > 600 ? 'large' : (size.width < 345 ? 'small' : 'medium'));
    var pin_el = '<a data-pin-do="embedPin"';
    if (options.data_ping_lang) {
      pin_el += ' data-pin-lang="' + options.data_ping_lang + '"';
    }
    pin_el += ' data-pin-width="' + pin_size + '" href="' + url + '"></a>';
    var container = generateEmbed('pinterest', pin_el);

    element.appendChild(container);

    pinterestify(element, container, {
      id: id,
      strict: options.strict,
      width: size.width,
      height: size.height
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
    var size = getDimensions(element, options.width, options.height);
    var cordinates = getCordinates(url);

    if (!cordinates) {
      return callback(new Error('unable_to_find_cordinates'));
    }

    var container = generateEmbed('googlemaps');
    element.appendChild(container);

    gmapsify(element, container, {
      width: size.width,
      height: size.height
    }, function (err) {
      if (err) {
        console.error(err);
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
   * @method website
   * Website Embed
   *
   * @param {number} id
   * @param {HTMLElement} element
   * @param {string} url
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.website = function (id, element, url, options, callback) {
    var size = getDimensions(element, options.width, options.height);

    if (url.match(/\w+\.[A-Za-z]{3,4}(?=\?|$)/)) {
      element.appendChild(generateEmbed('website',
        '<object type="text/html" data="' + url + '" width="' + size.width + '" height="' + size.height + '"></object>'
      ));
    } else {
      element.appendChild(generateEmbed('website',
        '<iframe src="' + url + '" width="' + size.width + '" height="' + size.height + '" frameborder="0"></iframe>'
      ));
    }

    callback(null, {
      id: id,
      el: element,
      width: size.width,
      height: size.height
    });
  };

  /**
   * @method load
   * Initialize auth component
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
      return this.emit('error', new Error('element_is_missing'));
    }

    if (!url || !validateURL(url)) {
      console.error('`url` is either missing or invalid');
      return this.emit('error', new Error('invalid_or_missing_url'));
    }

    var source = getURLSource(url);

    if (!source) {
      console.error(new Error('Invalid or Unsupported URL'));
      return this.emit('error', new Error('url_not_supported'));
    }

    if (!this[source]) {
      console.error(new Error('Requested source is not implemented or missing.'));
      return this.emit('error', new Error('unrecognised_url'));
    }

    var id = uuid();
    var request = {
      id: id,
      el: element,
      source: source,
      url: url,
      attributes: options
    };

    this.requests.push(request);

    this.emit('watch', 'load', request);

    this[source](
      id, element, url, options,
      function (err, data) {
        if (err) {
          return this.emit('error', err);
        }
        this.emit('watch', 'loaded', data);
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
      if (request.source === 'website' || request.source === 'youtube' || request.source === 'googlemaps') {
        return this.emit('refresh', request, {
          width: compute(request.el, 'width', true),
          height: compute(request.el, 'height', true)
        });
      }
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
          return this.emit('error', new Error('dom_not_ready'));
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
    if (!element) {
      while (this.requests.length) {
        this.requests.pop();
      }
      this.emit('destroy');
    } else {
      this.requests.forEach(function (request, index, requests) {
        if (element && validateElement(element)) {
          if (element === request.el) {
            element.innerHTML = '';
            requests.splice(index, 1);
            this.emit('destroy', request);
          }
        } else {
          if (!request.el || !validateElement(request.el)) {
            return;
          }
          request.el.innerHTML = '';
          this.emit('destroy', request);
        }
      }.bind(this));
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
   * @function generateScript
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

  /**
   * @function generateElement
   * Generates DOM element
   *
   * @param {string} source
   * @returns HTMLElement
   */
  function generateElement(type, id, className) {
    var elm = document.createElement(type);
    elm.setAttribute('id', id);
    elm.setAttribute('className', className);
    return elm;
  }

  /**
   * @function validateElement
   * Validates if passed argument is valid DOM element
   *
   * @param {object} obj
   * @returns HTMLElement
   */
  function validateElement(obj) {
    return (
      typeof HTMLElement === 'object' ? obj instanceof window.HTMLElement :
      obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string'
    );
  }

  /**
   * @function getURLSource
   * Checks Source from URI
   *
   * @param {string} url
   * @returns {string}
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
    } else if (url.match(Embedo.defaults.VIMEO.REGEX)) {
      return 'vimeo';
    } else if (url.match(Embedo.defaults.GOOGLEMAPS.REGEX)) {
      return 'googlemaps';
    } else {
      return 'website';
    }
  }

  /**
   * @function toQueryString
   * Object to Query String
   *
   * @param {object} obj
   * @returns {string}
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
   * @function fetch
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
   * @function generateEmbed
   * Generates Embed Container
   *
   * @param {string} source
   * @param {string} html
   * @returns
   */
  function generateEmbed(source, html) {
    var container = document.createElement('div');
    container.setAttribute('data-embed', source);
    container.innerHTML = html || '';
    return container;
  }

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
   * @function Parses Twitter SDK
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
        return;
      }
      if (!window.PinUtils || !window.PinUtils || !childNode || !childNode.firstChild) {
        return;
      }
      setTimeout(function () {
        var pinned = childNode.firstChild.hasAttribute('data-pin-id');
        if (!pinned) {
          window.PinUtils.build(childNode);
        }
        automagic(parentNode, childNode, {
          width: compute(childNode, 'width', true),
          height: compute(childNode, 'height', true)
        }, callback);
      }, 1);
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
        return;
      }

      centerize(childNode);
      childNode.style.width = options.width ? options.width + 'px' : '100%';
      childNode.style.height = options.height ? options.height + 'px' : '100%';

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
    console.log('automagic', parentNode, childNode, options);
    options = options || {};
    callback = callback || function () {};

    if (!validateElement(parentNode) || !validateElement(childNode)) {
      return callback(new Error('HTMLElement does not exist in DOM.'));
    }

    centerize(childNode);

    watcher(options.id || uuid(), function () {
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
   * @function transform
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
   * @function sdkReady
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
      } else if (type === 'googlemaps') {
        if (window.google && window.google.maps) {
          return callback();
        }
      } else {
        return callback(new Error('unsupported_sdk_type'));
      }
      setTimeout(check, 10 * counter);
    })(type);
  }

  /**
   * @function compute
   * Computes property value of HTMLElement
   *
   * @param {HTMLElement} element
   * @param {string} prop
   * @returns {integer|string}
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
   * @function extender
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
   * @function getDimensions
   *
   * @param {HTMLElement} element
   * @param {string} width
   * @param {string} height
   *
   * @returns {object{width,height}}
   */
  function getDimensions(element, width, height) {
    var elementWidth = compute(element, 'width', true);
    width = (width && parseInt(width || 0) > 10) ? width : (elementWidth > 0 ? elementWidth : '100%');
    height = (height && parseInt(height || 0) > 10) ? height : (elementWidth > 0 ? elementWidth / 1.5 : '100%');

    return {
      width: width,
      height: height
    };
  }

  /**
   * @function centerize
   * Align an element center in relation to parent div
   *
   * @param {HTMLElement} element
   * @returns
   */
  function centerize(element) {
    if (!validateElement(element)) {
      return;
    }
    element.style.display = '-webkit-box';
    element.style.display = '-moz-box';
    element.style.display = '-ms-flexbox';
    element.style.display = '-webkit-flex';
    element.style.display = 'flex';
    element.style['justify-content'] = 'center';
    element.style['align-items'] = 'center';
    element.style.margin = '0 auto';
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

  /**
   * @function watcher
   *
   * @param {string} Identifer
   * @param {Function} Function to Trigger
   * @param {integer} timer
   *
   * @returns {Function}
   */
  function watcher(id, fn, timer) {
    window.watcher_stack = window.watcher_stack || {};
    window.watcher_stack[id] = window.watcher_stack[id] || {
      id: id,
      count: 0,
      request: null
    };

    if (window.watcher_stack[id].count > 0 && window.watcher_stack[id].request) {
      window.watcher_stack[id].count -= 1;
      clearTimeout(window.watcher_stack[id].request);
    }

    window.watcher_stack[id].count += 1;
    window.watcher_stack[id].request = setTimeout(function (e) {
      window.watcher_stack[id].count -= 1;
      if (window.watcher_stack[id].count === 0) {
        fn.call();
      }
    }, timer);

    return null;
  }

  return Embedo;
});
