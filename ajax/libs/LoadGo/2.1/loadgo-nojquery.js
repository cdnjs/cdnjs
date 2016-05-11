/**
 * @preserve LoadGo v2.0 (http://franverona.com/loadgo)
 * 2016 - Fran Verona
 * Licensed under MIT (https://github.com/franverona/loadgo/blob/master/LICENSE)
 */

(function () {

  // Rudimentary indexOf method for < IE 8 compatibility
  var indexOf = function (array, element) {
    if (array)
    for (var i = 0, l = array.length; i < l; i++) {
      if (array[i] === element)
        return i;
    }
    return -1;
  };

  // Get CSS style
  // http://stackoverflow.com/a/22744598/552669
  var getStyle = function (el, prop) {
    if (typeof(getComputedStyle) !== 'undefined') {
      return getComputedStyle(el).getPropertyValue(prop);
    } else {
      return el.currentStyle[prop];
    }
  };

  // Extend JSON properties
  var extend = function () {
    for (var i = 1; i < arguments.length; i++)
      for (var key in arguments[i])
          if ( arguments[i].hasOwnProperty(key))
            arguments[0][key] = arguments[i][key];
    return arguments[0];
  };

  // Get Loadgo properties for element
  var getProperties = function (elementId) {
    for (var i = 0, l = domElements.length; i < l; i++) {
      if (domElements[i].id === elementId) {
        return domElements[i].properties;
      }
    }
    return null;
  };

  // Get array index on domElements array
  var getIndex = function (elementId) {
    for (var i = 0, l = domElements.length; i < l; i++) {
      if (domElements[i].id === elementId) {
        return i;
      }
    }
    return -1;
  };

  // Check if element is a validDOM selector (provided by document.getElementById)
  var checkElement = function (element) {

    if (typeof(element) === 'undefined' || element === null) {
      console.warn('LoadGo selector must exists.');
      return false;
    }

    if (typeof(element.length) !== 'undefined') {
      console.error('LoadGo selector must be an id. Please, set a valid DOM id; also check if you have more than one DOM element with the same id.');
      return false;
    }

    return true;

  };

  // Array to store all Loadgo elements
  var domElements = [];

  // Loadgo default options
  var defaultOptions = {
    'bgcolor':    '#FFFFFF',  //  Overlay color
    'opacity':    '0.5',      //  Overlay opacity
    'animated':   true,       //  Overlay smooth animation when setting progress
    'image':      null,       //  Overlay image
    'class':      null,       //  Overlay CSS class
    'resize':     null,       //  Resize functions (optional)
    'direction':  'lr',       //  Direction animation (optional)
    'filter':     null        //  Image filter (optional)
  };

  Loadgo = window.Loadgo || {};

  /**
   * Init Loadgo in an specific element
   * @param  {DOM} element  DOM element using document.getElementById
   * @param  {JSON} useroptions Loadgo options
   */
  Loadgo.init = function (element, useroptions) {
    
    if (!checkElement(element)) return;

    var options = (typeof(useroptions) !== 'undefined')? useroptions : {};
    options = extend({}, defaultOptions, options);

    // Check for valid direction
    var validDirections = ['lr', 'rl', 'bt', 'tb'];
    if (indexOf(validDirections, options.direction.toLowerCase()) === -1) {
      console.warn('LoadGo requires a valid direction. "' + options.direction + '" provided. Using default value: "lr".');
      options.direction = 'lr';
    }

    var overlay = document.createElement('div');

    var overlayClasses = ['loadgo-overlay'];
    if (options['class']) {
      overlayClasses.push(options['class']);
    }
    overlay.className = overlayClasses.join(' ');
    overlay.style.backgroundColor = options.bgcolor;
    overlay.style.opacity = options.opacity;

    var gbc = element.getBoundingClientRect();
    if (gbc.width) {
      overlay.style.width = gbc.width + 'px';   // for modern browsers
    } else {
      overlay.style.width = element.offsetWidth;  // for oldIE
    }
    if (gbc.height) {
      overlay.style.height = gbc.height + 'px';   // for modern browsers
    } else {
      overlay.style.height = element.offsetWidth;  // for oldIE
    }

    var ppl = parseFloat(getStyle(element.parentNode, 'padding-left')),
        eml = parseFloat(getStyle(element, 'margin-left')) ,
        epl = parseFloat(getStyle(element, 'padding-left'));

    if (isNaN(ppl))
      ppl = 0;
    if (isNaN(eml))
      eml = 0;
    if (isNaN(epl))
      epl = 0;

    var computedLeft = ppl + eml + epl;
    overlay.style.left = computedLeft + 'px';
    overlay.style.top = '0';
    overlay.style.position = 'absolute';

    //
    // CSS animation
    //
    if (options.animated) {
      overlay.style['transition'] = 'all 0.6s ease';
      overlay.style['-webkit-transition'] = 'all 0.6s ease';
      overlay.style['-moz-transition'] = 'all 0.6s ease';
      overlay.style['-ms-transition'] = 'all 0.6s ease';
      overlay.style['-o-transition'] = 'all 0.6s ease';
    }

    //
    // Filters
    // 
    if (options.filter) {
      var filters = ['blur', 'grayscale', 'sepia', 'hue-rotate', 'invert', 'opacity'];
      if (indexOf(filters, options.filter) !== -1) {
        switch (options.filter) {
          case 'blur':
            element.style['-webkit-filter'] = options.filter + '(10px)';
            break;
          case 'hue-rotate':
            element.style['-webkit-filter'] =  options.filter + '(360deg)';
            break;
          case 'opacity':
            element.style['-webkit-filter'] =  options.filter + '(0)';
            break;
          default:
            element.style['-webkit-filter'] =  options.filter + '(1)';
        }
        if (options.animated) {
          element.style['transition'] =  '0.6s filter ease';
          element.style['-webkit-transition'] =  '0.6s -webkit-filter ease';
          element.style['-moz-transition'] =  '0.6s -moz-filter ease';
          element.style['-ms-transition'] =  '0.6s -ms-filter ease';
          element.style['-o-transition'] =  '0.6s -o-filter ease';
        }
      }
      else {
        console.error('Invalid value for "filter" option. Possible values: blur, grayscale, sepia, hue-rotate, invert, opacity.');
        return;
      }
    }

    //
    // Background image
    //
    if (options.image) {
      var bgposition;
      switch (options.direction) {
        case 'lr':
          bgposition = '100% 0%';
          break;
        case 'rl':
          // Right to left animation
          bgposition = '0% 50%';
          break;
        case 'bt':
          // Bottom to top animation
          bgposition = '100% 0%';
          break;
        case 'tb':
          // Top to bottom animation
          bgposition = '0% 100%';
          break;
        default:
          // Left to right animation
          bgposition = '100% 50%';
          break;
      }

      overlay.style['background-image'] = 'url("' + options.image + '")';
      overlay.style['background-repeat'] = 'no-repeat';
      overlay.style['background-size'] = 'cover';
      overlay.style['background-color'] = 'transparent';
      overlay.style['background-position'] = bgposition;

    }

    // Store Loadgo properties
    var domElementsIndex = getIndex(element.id), loadgoProperties = {
      overlay:    (options.filter === null)? overlay : null,
      width:      parseFloat(overlay.style.width),
      height:     parseFloat(overlay.style.height),
      progress:   0,
      direction:  options.direction,
      filter:     options.filter
    };
    if (domElementsIndex !== -1) {
      domElements[domElementsIndex].properties = loadgoProperties;
    }
    else {
      domElements.push({
        id:           element.id,
        properties:   loadgoProperties
      });
    }

    // 'inserAfter' jQuery function in pure JS (http://stackoverflow.com/a/4793630/552669)
    if (options.filter === null)
      element.parentNode.insertBefore(overlay, element.nextSibling);

    // Resize event
    if (options.resize) {
      if (window.addEventListener) {
        window.addEventListener('resize', options.resize, false);
      }
      else {
        window.attachEvent('resize', options.resize);
      }
    }
    else {
      var resizeFunction = function () {
        var data = getProperties(element.id);
        if (data !== null) {
          var overlay = data.overlay, 
                    w = element.getBoundingClientRect().width, 
                    h = element.getBoundingClientRect().height,
                  ppl = parseFloat(getStyle(element.parentNode, 'padding-left')),
                  eml = parseFloat(getStyle(element, 'margin-left')),
                  epl = parseFloat(getStyle(element, 'padding-left'));

          if (isNaN(ppl))
            ppl = 0;
          if (isNaN(eml))
            eml = 0;
          if (isNaN(epl))
            epl = 0;

          if (overlay) {
            overlay.style.width = w + 'px';
            overlay.style.height = h + 'px';
            overlay.style.left = computedLeft + 'px';
          }

          domElements[getIndex(element.id)].properties.overlay = overlay;
          domElements[getIndex(element.id)].properties.width = w;
          domElements[getIndex(element.id)].properties.height = h;

          var progress = data.progress;
          Loadgo.setprogress(element, progress);
        }
      };

      if (window.addEventListener) {
        window.addEventListener('resize', resizeFunction, false);
      }
      else {
        window.attachEvent('resize', resizeFunction);
      }
    }

  };

  /**
   * Set progress to specific value
   * @param  {DOM} element  DOM element using document.getElementById
   * @param  {Number} progress Progress value (has to be between 0 and 100)
   */
  Loadgo.setprogress = function (element, progress) {

    if (!checkElement(element)) return;

    if (getIndex(element.id) === -1) {
      console.error('Trying to set progress for a non initialized element. You have to run "init" method first.');
      return;
    }

    if (progress < 0 || progress > 100) {
      console.error('LoadGo expects progress number between 0 (0%) and 100 (100%).');
      return;
    }
    
    var data = getProperties(element.id);

    if (data !== null) {
      var _w, _h, overlay = data.overlay, 
                w = data.width, 
                h = data.height;

      if (overlay) {
        var direction = data.direction,
                  ppl = parseFloat(getStyle(element.parentNode, 'padding-left')),
                  eml = parseFloat(getStyle(element, 'margin-left')) ,
                  epl = parseFloat(getStyle(element, 'padding-left'));

        if (isNaN(ppl))
          ppl = 0;
        if (isNaN(eml))
          eml = 0;
        if (isNaN(epl))
          epl = 0;

        var computedLeft = ppl + eml + epl;

        switch (direction) {
          case 'lr':
            // Left to right animation
            _w = w * (1 - progress / 100);
            overlay.style.width = _w + 'px';
            overlay.style.left = (w - _w) + computedLeft + 'px';
            break;
          case 'rl':
            // Right to left animation
            _w = w * (1 - progress / 100);
            overlay.style.width = _w + 'px';
            break;
          case 'bt':
            // Bottom to top animation
            _h = h * (1 - progress / 100);
            overlay.style.height = _h + 'px';
            break;
          case 'tb':
            // Top to bottom animation
            _h = h * (1 - progress / 100);
            overlay.style.height = _h + 'px';
            overlay.style.top = (h - _h) + 'px';
            break;
          default:
            // Left to right animation
            _w = w * (1 - progress / 100);
            overlay.style.width = _w + 'px';
            overlay.style.left = (w - _w) + computedLeft + 'px';
        }
      } 
      else {
        var filter = data.filter, p;
        switch (filter) {
          case 'blur':
            p = (100 - progress) / 10;
            element.style['-webkit-filter'] = data.filter + '(' + p + 'px)';
            break;
          case 'hue-rotate':
            p = progress * 360 / 100;
            element.style['-webkit-filter'] = data.filter + '(' + p + 'deg)';
            break;
          case 'opacity':
            p = progress / 100;
            element.style['-webkit-filter'] = data.filter + '(' + p + ')';
            break;
          default:
            p = 1 - progress / 100;
            element.style['-webkit-filter'] = data.filter + '(' + p + ')';
        }
      }

    }

    domElements[getIndex(element.id)].properties.progress = progress;

  };

  /**
   * Return current progress
   * @param  {DOM} element  DOM element using document.getElementById
   */
  Loadgo.getprogress = function (element) {

    if (!checkElement(element)) return;

    var properties = getProperties(element.id);
    return (properties !== null)? properties.progress : 0;
  };

  /**
   * Reset progress
   * @param  {DOM} element  DOM element using document.getElementById
   */
  Loadgo.resetprogress = function (element) {

    if (!checkElement(element)) return;

    var index = getIndex(element.id);
    if (index !== -1) {
      domElements[index].properties.progress = 0;
    }
  };

  /**
   * Overlay loops back and forth
   * @param  {DOM} element  DOM element using document.getElementById
   * @param  {Number} duration Interval duration in ms
   */
  Loadgo.loop = function (element, duration) {

    if (!checkElement(element)) return;

    if (getIndex(element.id) === -1) {
      console.error('Trying to loop a non initialized element. You have to run "init" method first.');
      return;
    }

    var data = getProperties(element.id);
    if (data === null) {
      console.warn('Element do not have Loadgo properties. Maybe it is uninitialized.');
      return;
    }

    if (data.interval) {
      console.warn('LoadGo requires you to stop the current loop before modifying it.');
      return;
    }

    // Store interval so we can stop it later
    var domIndex = getIndex(element.id), toggle = true;
    domElements[domIndex].properties.interval = setInterval(function(){
      if (toggle) {
        domElements[domIndex].properties.progress += 1;
        if (domElements[domIndex].properties.progress >= 100) {
          toggle = false;
        }
      }
      else {
        domElements[domIndex].properties.progress -= 1;
        if (domElements[domIndex].properties.progress <= 0) {
          toggle = true;
        }
      }
      // Remove transition animation
      // Can be replaced with animated: false in the initializer
      var overlay = domElements[domIndex].properties.overlay;
      overlay.style['transition'] = 'none';
      overlay.style['-webkit-transition'] = 'none';
      overlay.style['-moz-transition'] = 'none';
      overlay.style['-ms-transition'] = 'none';
      overlay.style['-o-transition'] = 'none';
      domElements[domIndex].properties.overlay = overlay;

      Loadgo.setprogress(element, domElements[domIndex].properties.progress);

    }, duration);

  };

  // Stops the loop interval and shows image
  Loadgo.stop = function (element) {

    if (!checkElement(element)) return;

    if (getIndex(element.id) === -1) {
      console.error('Trying to stop loop for a non initialized element. You have to run "init" method first.');
      return;
    }

    clearInterval(domElements[getIndex(element.id)].properties.interval);
    Loadgo.setprogress(element, 100);
  };

  window.Loadgo = Loadgo;

}).call(this);
