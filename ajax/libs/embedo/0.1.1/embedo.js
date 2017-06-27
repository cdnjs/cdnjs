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
    this.options = options || {};

    this.init(this.options);

    return this;
  }

  Embedo.defaults = {
    FACEBOOK: {
      SDK: 'https://connect.facebook.net/en_US/all.js#version=v2.8&appId‌​=771604066204777&coo‌​kie=true&xfbml=true',
      oEmbed: 'https://www.facebook.com/plugins/post/oembed.json',
      REGEX: /^http[s]*:\/\/[www.]*facebook\.com.*/i
    },
    TWITTER: {
      SDK: 'https://platform.twitter.com/widgets.js',
      oEmbed: 'https://publish.twitter.com/oembed',
      REGEX: /^http[s]*:\/\/[www.]*twitter\.com.*/i
    },
    INSTAGRAM: {
      SDK: 'https://platform.instagram.com/en_US/embeds.js',
      oEmbed: 'https://api.instagram.com/oembed',
      REGEX: /^http[s]*:\/\/[www.]*instagram\.com.*/i
    },
    YOUTUBE: {
      SDK: null,
      oEmbed: 'https://www.youtube.com/embed/',
      REGEX: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
    }
  };

  /**
   * Embedo Methods
   *
   * @mixin
   * @implements compile
   * @implements transform
   */
  Embedo.prototype = {

    /**
     * @method Facebook Embed
     *
     * @name facebook
     * @function
     * @param {object} options Optional parameters.
     * @return callback
     */
    facebook: function (element, url, options) {
      var embed_uri = Embedo.defaults.FACEBOOK.oEmbed;
      var query = {
        url: encodeURI(url),
        omitscript: true
      };

      if (options.width && parseInt(options.width) > 0) {
        query.maxwidth = options.width;
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
          strict: options.strict
        });
      });
    },

    /**
     * @method Twitter Embed
     *
     * @name twitter
     * @function
     * @param {object} options Optional parameters.
     * @return callback
     */
    twitter: function (element, url, options) {
      var embed_uri = Embedo.defaults.TWITTER.oEmbed;
      var query = {
        url: encodeURI(url)
      };

      if (options.width && parseInt(options.width) > 0) {
        query.maxwidth = options.width;
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
          strict: options.strict
        });
      });
    },

    /**
     * @method Instagram Embed
     *
     * @name instagram
     * @function
     * @param {object} options Optional parameters.
     * @return callback
     */
    instagram: function (element, url, options) {
      var embed_uri = Embedo.defaults.INSTAGRAM.oEmbed;
      var query = {
        url: encodeURI(url),
        omitscript: true,
        hidecaption: true
      };

      if (options.width && parseInt(options.width) > 0) {
        query.maxwidth = options.width;
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
          strict: options.strict
        });
      });
    },

    /**
     * @method YouTube Embed
     *
     * @name youtube
     * @function
     * @param {object} options Optional parameters.
     * @return callback
     */
    youtube: function (element, url, options) {
      function getYTVideoID(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
      }

      var embed_uri = Embedo.defaults.YOUTUBE.oEmbed;
      var video_id = '';
      var query = {
        url: encodeURI(url),
        modestbranding: 1,
        autohide: 1,
        showinfo: 0,
        controls: 0
      };
      var width = (options.width && parseInt(options.width || 0) > 10) ? options.width : 600;
      var height = (options.height && parseInt(options.height || 0) > 10) ? options.height : 400;

      if (!getYTVideoID(url)) {
        console.error('Unable to detect Youtube video id.');
        return;
      }

      embed_uri += video_id + '?' + toQueryString(query);

      element.appendChild(generateEmbed('youtube',
        '<iframe src="' + embed_uri + '" ' +
        'width="' + width + '" height="' + height + '"' +
        'frameborder="0" allowtransparency="true"></iframe>'
      ));
    }

  };

  /**
   * @method Initialize auth component
   *
   * @name init
   * @function
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.init = function (options) {
    console.log('Embedo Initialized..', options);
    if (options.facebook) {
      document.body.appendChild(generateScript(Embedo.defaults.FACEBOOK.SDK));
    }
    if (options.twitter) {
      document.body.appendChild(generateScript(Embedo.defaults.TWITTER.SDK));
    }
    if (options.instagram) {
      document.body.appendChild(generateScript(Embedo.defaults.INSTAGRAM.SDK));
    }
  };

  /**
   * @method Initialize auth component
   *
   * @name init
   * @function
   * @param {object} options Optional parameters.
   * @return callback
   */
  Embedo.prototype.load = function (element, url, options) {
    console.log('Embedo Loaded..', element, url, options);
    options = options || {};

    if (!element || !validateElement(element)) {
      console.error('`element` is either missing or invalid');
      return;
    }

    var source = getURLSource(url);

    if (!source) {
      console.error(new Error('Invalid or Unsupported URL'));
      return;
    }

    this[source](element, url, options);
  };

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
  function facebookify(parentNode, childNode, options) {
    var tries = 0;
    function fb_check() {
      tries++;
      if (tries > 100) {
        return;
      }
      if (window.FB) {
        setTimeout(function () {
          window.FB.XFBML.parse(childNode, function () {
            automagic(childNode, childNode.firstChild, options);
          });
        }, 0);
      } else {
        setTimeout(fb_check, 100);
      }
    }

    fb_check();
  }

  /**
   * Parses Twitter SDK
   *
   * @param {HTMLElement} parentNode
   * @param {HTMLElement} childNode
   * @param {object} options
   */
  function twitterify(parentNode, childNode, options) {
    var tries = 0;
    function twttr_check() {
      tries++;
      if (tries > 100) {
        return;
      }
      if (window.twttr) {
        window.twttr.ready(function () {
          window.twttr.widgets.load();
        });

        window.twttr.events.bind('loaded', function (event) {
          automagic(childNode, childNode.firstChild, options);
        });
      } else {
        setTimeout(twttr_check, 100);
      }
    }

    twttr_check();
  }

  /**
   * Parses Instagram SDK
   *
   * @param {HTMLElement} parentNode
   * @param {HTMLElement} childNode
   * @param {object} options
   */
  function instagramify(parentNode, childNode, options) {
    var tries = 0;
    function instgrm_check() {
      tries++;
      if (tries > 100) {
        return;
      }
      if (window.instgrm) {
        setTimeout(function () {
          window.instgrm.Embeds.process();
        }, 0);

        var element = parentNode.querySelectorAll('.instagram-media')[0];
        automagic(childNode, childNode.firstChild, options);
      } else {
        setTimeout(instgrm_check, 100);
      }
    }

    instgrm_check();

    parentNode.addEventListener('DOMSubtreeModified', function () {
      instgrm_check();
    }, false);
  }

  /**
   * Resizes and adjust embed element to center
   * and scales if strict mode or dimensions passed
   *
   * @param {HTMLElement} embedNode
   * @param {HTMLElement} frameNode
   * @param {object} options
   */
  function automagic(embedNode, frameNode, options) {
    options = options || {};
    var gutterX, gutterY, translate;

    var embedNodeX = parseInt(computeDimension(embedNode, 'width'));
    var embedNodeY = parseInt(computeDimension(embedNode, 'height'));

    var frameNodeX = parseInt(computeDimension(frameNode, 'width'));
    var frameNodeY = parseInt(computeDimension(frameNode, 'height'));

    if (frameNodeX > 0 && embedNodeX > 0) {
      gutterX = (embedNodeX - frameNodeX) / 2;
      translate = 'translateX(' + gutterX + 'px)';
    } else {
      translate = 'none';
    }

    transform(embedNode, translate);
  }

  /**
   * Cross Browser CSS Transformation
   *
   * @param {HTMLElement} element
   * @param {string} props
   */
  function transform(element, props) {
    element.style.webkitTransform = props;
    element.style.MozTransform = props;
    element.style.msTransform = props;
    element.style.OTransform = props;
    element.style.transform = props;
  }

  /**
   * Computes property value of HTMLElement
   *
   * @param {HTMLElement} element
   * @param {string} prop
   * @returns
   */
  function computeDimension(element, prop) {
    try {
      return window.getComputedStyle(element, null).getPropertyValue(prop);
    } catch (e) {
      return element.getBoundingClientRect()[prop];
    }
  }

  return Embedo;
});
