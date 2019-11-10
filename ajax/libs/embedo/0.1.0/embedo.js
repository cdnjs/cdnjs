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
      SDK: 'https://connect.facebook.net/en_US/sdk.js',
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

        element.appendChild(generateEmbed('facebook', content.html));

        handleSDKLoader('facebook', function () {
          window.FB.XFBML.parse(element);
        });

        element.addEventListener('DOMSubtreeModified', function () {
          automagic(element, {
            scale: true,
            frame: 'fb_iframe_widget'
          });
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
        url: encodeURI(url),
        omit_script: 1
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

        element.appendChild(generateEmbed('twitter', content.html));

        handleSDKLoader('twitter', function () {
          window.twttr.widgets.load(element);
        });

        element.addEventListener('DOMSubtreeModified', function () {
          automagic(element, {
            scale: true
          });
        });

        automagic(element, {
          scale: true
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

        element.appendChild(generateEmbed('instagram', content.html));

        handleSDKLoader('instagram', function () {
          window.instgrm.Embeds.process();
        });

        element.addEventListener('DOMSubtreeModified', function () {
          automagic(element, {
            scale: true,
            frame: 'iframe'
          });
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
    document.body.appendChild(generateSDK(Embedo.defaults.FACEBOOK.SDK));
    document.body.appendChild(generateSDK(Embedo.defaults.TWITTER.SDK));
    document.body.appendChild(generateSDK(Embedo.defaults.INSTAGRAM.SDK));

    handleSDKLoader('facebook', function () {
      window.FB.init({
        appId: '771604066204777',
        xfbml: true,
        cookie: true,
        version: 'v2.7'
      });
    });
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
   *
   *
   * @param {any} source
   * @returns
   */
  function generateSDK(source) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = encodeURI(source);
    script.setAttribute('async', '');
    script.setAttribute('charset', 'utf-8');
    return script;
  }

  /**
   *
   *
   * @param {any} obj
   * @returns
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
   *
   *
   * @param {any} url
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
   *
   *
   * @param {any} obj
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
   *
   *
   * @param {any} sdk
   * @param {any} callback
   */
  function handleSDKLoader(source, callback) {
    var count = 0;
    var max_count = 10;

    function check() {
      count++;

      if (count > max_count) {
        return;
      }

      if (source === 'facebook') {
        if (window.FB) {
          return callback();
        }
        setTimeout(check, 100);
      } else if (source === 'twitter') {
        if (window.twttr) {
          return callback();
        }
        setTimeout(check, 100);
      } else if (source === 'instagram') {
        if (window.instgrm) {
          return callback();
        }
        setTimeout(check, 100);
      }
    }

    check();
  }

  /**
   *
   *
   * @param {any} url
   * @param {any} options
   * @param {any} callback
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
   *
   *
   * @param {any} html
   * @returns
   */
  function generateEmbed(source, html) {
    var container = document.createElement('div');
    container.setAttribute('data-embed', source);
    container.innerHTML = html;
    return container;
  }

  /**
   *
   *
   * @param {any} el
   * @param {any} className
   * @returns
   */
  function findAncestor(el, className) {
    while ((el = el.parentElement) && !el.classList.contains(className));
    return el;
  }

  /**
   *
   *
   * @param {any} parent
   * @param {any} element
   * @param {any} options
   */
  function automagic(container, options) {
    options = options || {};

    var gutterX, gutterY, translate;
    var embeded = options.frame ?
      container.querySelectorAll(options.frame)[0] :
      container.querySelectorAll('[data-embed]')[0];

    if (!embeded) {
      return;
    }

    var containerWidth = parseInt(options.width || container.style.width || container.offsetWidth);
    var containerHeight = parseInt(options.height || container.style.height || container.offsetHeight);
    var embeddedWidth = parseInt(embeded.style.maxWidth || embeded.style.width || embeded.offsetWidth);
    var embeddedHeight = parseInt(embeded.style.maxHeight || embeded.style.height || embeded.offsetHeight);

    if (!options.frame) {
      embeddedWidth = embeded.firstChild.offsetWidth;
      embeddedHeight = embeded.firstChild.offsetHeight;
    }

    gutterX = (containerWidth - embeddedWidth) / 2;
    gutterY = (containerHeight - embeddedHeight) / 2;

    translate = 'translate(' + gutterX + 'px,' + gutterY + 'px)';

    if (options.scale) {
      if (embeded.offsetHeight > containerHeight) {
        var scale = containerHeight / embeded.offsetHeight;
        translate += ' scale(' + scale + ')';
      }
    }

    embeded.style.webkitTransform = translate;
    embeded.style.MozTransform = translate;
    embeded.style.msTransform = translate;
    embeded.style.OTransform = translate;
    embeded.style.transform = translate;
  }

  return Embedo;
});
