/**
 * @preserve LoadGo v2.2.1 (http://franverona.com/loadgo)
 * 2018 - Fran Verona
 * Licensed under MIT (https://github.com/franverona/loadgo/blob/master/LICENSE)
 */

(function () {

  // Rudimentary indexOf method for < IE 8 compatibility
  var indexOf = function (array, element) {
    for (var i = 0, l = array.length; i < l; i++) {
      if (array[i] === element) {
        return i;
      }
    }
    return -1;
  };

  // Combine obj2 with obj1. If properties are equal, it will be overwritten.
  // For example: obj1.direction = obj2.direction
  var extend = function (obj1, obj2) {
    var result = {}, obj1Clone, obj2Clone;
    if (typeof obj1 === 'undefined') {
      obj2Clone = JSON.parse(JSON.stringify(obj2));
      if (obj2.resize) {
        obj2Clone.resize = obj2.resize;     // Functions won't be serialized, so we need to do it manually
      }
      result = obj2Clone;
    } else if (typeof obj2 === 'undefined') {
      obj1Clone = JSON.parse(JSON.stringify(obj1));
      if (obj1.resize) {
        obj1Clone.resize = obj1.resize;     // Functions won't be serialized, so we need to do it manually
      }
      result = obj1Clone;
    } else {
      obj1Clone = JSON.parse(JSON.stringify(obj1));
      if (obj1.resize) {
        obj1Clone.resize = obj1.resize;     // Functions won't be serialized, so we need to do it manually
      }
      obj1 = obj1Clone;

      obj2Clone = JSON.parse(JSON.stringify(obj2));
      if (obj2.resize) {
        obj2Clone.resize = obj2.resize;     // Functions won't be serialized, so we need to do it manually
      }
      obj2 = obj2Clone;

      result = obj1;
      for (var prop in obj2) {
        result[prop] = obj2[prop];
      }
    }
    return result;
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

  // Returns true if element is valid; false otherwise
  var elementIsValid = function (element) {
    if (typeof element === 'undefined' || element === null) {
      return false;
    }

    if (element.nodeName !== 'IMG') {
      throw new Error('LoadGo only works on img elements.');
    }

    if (element.length > 1) {
      throw new Error('LoadGo only works on one element at a time. Try with a valid #id.');
    }

    return true;
  };

  // Parse padding and margin properties to return a valid number
  var parseOffset = function (element, property) {
    var measure = element.style[property]
    if (measure === 'auto') {
      if (property.toLowerCase().indexOf('left') !== -1 || property.toLowerCase().indexOf('right') !== -1) {
        return parseFloat(element.offsetLeft);
      }
      if (property.toLowerCase().indexOf('top') !== -1 || property.toLowerCase().indexOf('bottom') !== -1) {
        return parseFloat(element.offsetTop);
      }
    }
    
    if (measure.indexOf('px') !== -1) {
      return parseFloat(measure);
    }
    
    return 0;
  };

  var randomId = function () {
    return new Date().getTime().toString();
  };

  // Array to store all Loadgo elements
  var domElements = [];

  // Loadgo default options
  var defaultOptions = {
    'bgcolor': '#FFFFFF',   //  Overlay color
    'opacity': '0.5',       //  Overlay opacity
    'animated': true,       //  Overlay smooth animation when setting progress
    'image': null,          //  Overlay image
    'class': null,          //  Overlay CSS class
    'resize': null,         //  Resize functions (optional)
    'direction': 'lr',      //  Direction animation (optional)
    'filter': null          //  Image filter (optional)
  };

  Loadgo = window.Loadgo || {};

  /**
   * Init Loadgo in an specific element
   * @param  {DOM} element  DOM element using document.getElementById
   * @param  {JSON} useroptions Loadgo options
   */
  Loadgo.init = function (element, useroptions) {
    
    if (!elementIsValid(element)) {
      return;
    }

    var domElementsIndex = getIndex(element.id);
    if (domElementsIndex === -1) {
      domElements.push({
        id: element.id,
        properties: {}
      });
      domElementsIndex = domElements.length - 1;
    }
    else {
      // Plugin options. We need to reset options to avoid future errors
      domElements[domElementsIndex].properties = {};
    }

    var pluginOptions = Loadgo.options(element, useroptions);

    var overlay = document.createElement('div');
    overlay.id = 'loadgo-' + randomId();    // We need to set a random id so we can retrieve it later when need it

    // Overlay classes
    var overlayClasses = ['loadgo-overlay'];
    if (pluginOptions['class']) {
      overlayClasses.push(pluginOptions['class']);
    }
    overlay.className = overlayClasses.join(' ');

    // Overlay background color
    overlay.style.backgroundColor = pluginOptions.bgcolor;

    // Overlay opacity
    overlay.style.opacity = pluginOptions.opacity;

    // Overlay width
    var gbc = element.getBoundingClientRect();
    if (gbc.width) {
      overlay.style.width = gbc.width + 'px';   // for modern browsers
    }
    else {
      overlay.style.width = element.offsetWidth;  // for oldIE
    }
    
    // Overlay height
    if (gbc.height) {
      overlay.style.height = gbc.height + 'px';   // for modern browsers
    }
    else {
      overlay.style.height = element.offsetWidth;  // for oldIE
    }

    // Overlay will be positioned absolute
    overlay.style.position = 'absolute';

    // CSS animation
    if (pluginOptions.animated) {
      overlay.style['transition'] = 'all 0.6s ease';
      overlay.style['-webkit-transition'] = 'all 0.6s ease';
      overlay.style['-moz-transition'] = 'all 0.6s ease';
      overlay.style['-ms-transition'] = 'all 0.6s ease';
      overlay.style['-o-transition'] = 'all 0.6s ease';
    }

    // Filters
    if (pluginOptions.filter) {
      if (pluginOptions.filter === 'blur') {
        element.style['-webkit-filter'] = pluginOptions.filter + '(10px)';
      } else if (pluginOptions.filter === 'hue-rotate') {
        element.style['-webkit-filter'] =  pluginOptions.filter + '(360deg)';
      } else if (pluginOptions.filter === 'opacity') {
        element.style['-webkit-filter'] =  pluginOptions.filter + '(0)';
      } else {
        element.style['-webkit-filter'] =  pluginOptions.filter + '(1)';
      }
      
      if (pluginOptions.animated) {
        element.style['transition'] = '0.6s filter ease';
        element.style['-webkit-transition'] = '0.6s -webkit-filter ease';
        element.style['-moz-transition'] = '0.6s -moz-filter ease';
        element.style['-ms-transition'] = '0.6s -ms-filter ease';
        element.style['-o-transition'] = '0.6s -o-filter ease';
      }
    }

    // Background image
    if (pluginOptions.image) {
      var bgposition = '100% 0%';  // Left to right animation by default
      if (pluginOptions.direction === 'rl') {
        bgposition = '0% 50%';    // Right to left animation
      } else if (pluginOptions.direction === 'bt') {
        bgposition = '100% 0%';   // Bottom to top animation
      } else if (pluginOptions.direction === 'tb') {
        bgposition = '0% 100%';   // Top to bottom animation
      }

      overlay.style['background-image'] = 'url("' + pluginOptions.image + '")';
      overlay.style['background-repeat'] = 'no-repeat';
      overlay.style['background-size'] = 'cover';
      overlay.style['background-color'] = 'transparent';
      overlay.style['background-position'] = bgposition;

    }

    var pluginData = {
      progress: 0
    };

    // Insert overlay only if "filter" option is not provided. If user sets a filter, it can be applied directly to the image logo
    if (pluginOptions.filter === null) {
      
      // The DOM tree will look like this:
      // <div class="loadgo-container"><element />><overlay /></div>
      
      // Simulates a jQuery 'wrapAll' behaviour in pure JS
      var container = document.createElement('div');
      container.className = 'loadgo-container';
      container.style.position = 'relative';
      element.before(container);
      container.appendChild(element);

      container.appendChild(overlay);

      // We need to add margins and paddings to set the overlay exactly above our image
      var pl = parseOffset(element, 'paddingLeft'); 
      var pr = parseOffset(element, 'paddingRight'); 
      var pt = parseOffset(element, 'paddingTop'); 
      var pb = parseOffset(element, 'paddingBottom');
      var ml = parseOffset(element, 'marginLeft'); 
      var mr = parseOffset(element, 'marginRight'); 
      var mt = parseOffset(element, 'marginTop'); 
      var mb = parseOffset(element, 'marginBottom');

      if (pluginOptions.direction === 'lr') {
        // Left to right animation
        overlay.style.right = (pr + mr) + 'px';
        overlay.style.top = (pt + mt) + 'px';
      } else if (pluginOptions.direction === 'rl') {
        // Right to left animation
        overlay.style.left = (pl + ml) + 'px';
        overlay.style.top = (pt + mt) + 'px';
      } else if (pluginOptions.direction === 'bt') {
        // Bottom to top animation
        overlay.style.top = (pt + mt) + 'px';
        overlay.style.left = (pl + ml) + 'px';
      } else if (pluginOptions.direction === 'tb') {
        // Top to bottom animation
        overlay.style.bottom = (pb + mb) + 'px';
        overlay.style.left = (pl + ml) + 'px';
      }

      // Saves overlay element + overlay current dimensions
      pluginData.overlay = overlay.id;
      pluginData.width = overlay.clientWidth;
      pluginData.height = overlay.clientHeight;
    }

    // Store overlay + progress into element properties
    domElements[domElementsIndex].properties = extend(pluginOptions, pluginData);

    // Resize event
    var resizeFunction = function () {
      var data = getProperties(element.id)
      var elementIndex = getIndex(element.id);
      if (data !== null) {
        var overlay = document.getElementById(data.overlay);
        var gbc = element.getBoundingClientRect();

        if (overlay) {

          // Overlay width
          if (gbc.width) {
            overlay.style.width = gbc.width + 'px';   // for modern browsers
          }
          else {
            overlay.style.width = element.offsetWidth;  // for oldIE
          }
          
          // Overlay height
          if (gbc.height) {
            overlay.style.height = gbc.height + 'px';   // for modern browsers
          }
          else {
            overlay.style.height = element.offsetWidth;  // for oldIE
          }

          // We need to add margins and paddings to set the overlay exactly above our image
          var pl = parseOffset(element, 'paddingLeft'); 
          var pr = parseOffset(element, 'paddingRight'); 
          var pt = parseOffset(element, 'paddingTop'); 
          var pb = parseOffset(element, 'paddingBottom');
          var ml = parseOffset(element, 'marginLeft'); 
          var mr = parseOffset(element, 'marginRight'); 
          var mt = parseOffset(element, 'marginTop'); 
          var mb = parseOffset(element, 'marginBottom');

          if (pluginOptions.direction === 'lr') {
            // Left to right animation
            overlay.style.right = (pr + mr) + 'px';
            overlay.style.top = (pt + mt) + 'px';
          } else if (pluginOptions.direction === 'rl') {
            // Right to left animation
            overlay.style.left = (pl + ml) + 'px';
            overlay.style.top = (pt + mt) + 'px';
          } else if (pluginOptions.direction === 'bt') {
            // Bottom to top animation
            overlay.style.top = (pt + mt) + 'px';
            overlay.style.left = (pl + ml) + 'px';
          } else if (pluginOptions.direction === 'tb') {
            // Top to bottom animation
            overlay.style.bottom = (pb + mb) + 'px';
            overlay.style.left = (pl + ml) + 'px';
          }

          // Saves overlay element + overlay current dimensions
          domElements[elementIndex].properties.width = parseFloat(overlay.style.width);
          domElements[elementIndex].properties.height = parseFloat(overlay.style.height);

          Loadgo.setprogress(element, data.progress);
        }

      }
    };

    if (pluginOptions.resize) {
      resizeFunction = pluginOptions.resize;
    }

    if (window.addEventListener) {
      window.addEventListener('resize', resizeFunction, false);
    }
    else {
      window.attachEvent('onresize', resizeFunction);
    }
      
  };

  Loadgo.options = function (element, useroptions) {

    if (!elementIsValid(element)) {
      return;
    }

    // Store Loadgo properties
    var domElementsIndex = getIndex(element.id);
    if (domElementsIndex === -1) {
      return;
    }

    var currentOptions = domElements[domElementsIndex].properties;

    // If no param is provided, then is a 'get'
    if (JSON.stringify(currentOptions) !== '{}') {
      return currentOptions;
    }

    if (typeof useroptions !== 'undefined') {
      // Parse to number the 'opacity' option
      if (typeof useroptions.opacity !== 'undefined') {
        useroptions.opacity = parseFloat(useroptions.opacity);
      }
    }

    if (JSON.stringify(currentOptions) === '{}') {
      currentOptions = extend(defaultOptions, useroptions);
    }
    else {
      currentOptions = extend(currentOptions, useroptions);
    }

    // Check for valid direction
    var validDirections = ['lr', 'rl', 'bt', 'tb'];
    if (indexOf(validDirections, currentOptions.direction.toLowerCase()) === -1) {
      // Invalid value for "direction" option. Possible values: blur, grayscale, sepia, hue-rotate, invert, opacity. Using default value: "lr".
      currentOptions.direction = 'lr';
    }

    // Check for valid filter
    if (currentOptions.filter) {
      var validFilters = ['blur', 'grayscale', 'sepia', 'hue-rotate', 'invert', 'opacity'];
      if (indexOf(validFilters, currentOptions.filter.toLowerCase()) === -1) {
        // Invalid value for "filter" option. Possible values: blur, grayscale, sepia, hue-rotate, invert, opacity. This option will be ignored.
        currentOptions.filter = null;
      }
    }

    // Store user options with default options
    domElements[domElementsIndex].properties = currentOptions;

    return currentOptions;

  };

  /**
   * Set progress to specific value
   * @param  {DOM} element  DOM element using document.getElementById
   * @param  {Number} progress Progress value (has to be between 0 and 100)
   */
  Loadgo.setprogress = function (element, progress) {

    if (!elementIsValid(element)) {
      return;
    }

    // LoadGo expects progress number between 0 (0%) and 100 (100%).
    if (progress < 0 || progress > 100) {
      return;
    }

    // Element exists?
    var domElementsIndex = getIndex(element.id);
    if (domElementsIndex === -1) {
      return;
    }
    
    var data = getProperties(element.id);

    if (data !== null) {
      var _w;
      var _h;
      var overlay = document.getElementById(data.overlay);
      var w = data.width;
      var h = data.height;

      if (overlay) {
        var direction = data.direction;
        if (direction === 'lr') {
          // Left to right animation
          _w = w * (1 - progress / 100);
          overlay.style.width = _w + 'px';
        } else if (direction === 'rl') {
          // Right to left animation
          _w = w * (1 - progress / 100);
          overlay.style.width = _w + 'px';
        } else if (direction === 'bt') {
          // Bottom to top animation
          _h = h * (1 - progress / 100);
          overlay.style.height = _h + 'px';
        } else if (direction === 'tb') {
          // Top to bottom animation
          _h = h * (1 - progress / 100);
          overlay.style.height = _h + 'px';
          overlay.style.top = (h - _h) + 'px';
        }
      } 
      else {
        var p;
        var filter = data.filter;
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

    domElements[domElementsIndex].properties.progress = progress;

  };

  /**
   * Return current progress
   * @param  {DOM} element  DOM element using document.getElementById
   */
  Loadgo.getprogress = function (element) {
    if (!elementIsValid(element)) {
      return;
    }

    var properties = getProperties(element.id);
    return (properties !== null)? properties.progress : 0;
  };

  /**
   * Reset progress
   * @param  {DOM} element  DOM element using document.getElementById
   */
  Loadgo.resetprogress = function (element) {
    Loadgo.setprogress(element, 0);
  };

  /**
   * Overlay loops back and forth
   * @param  {DOM} element  DOM element using document.getElementById
   * @param  {Number} duration Interval duration in ms
   */
  Loadgo.loop = function (element, duration) {

    if (!elementIsValid(element)) {
      return;
    }

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
    var toggle = true;
    var domIndex = getIndex(element.id);
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
      var overlay = document.getElementById(domElements[domIndex].properties.overlay);
      if (overlay) {
        overlay.style['transition'] = 'none';
        overlay.style['-webkit-transition'] = 'none';
        overlay.style['-moz-transition'] = 'none';
        overlay.style['-ms-transition'] = 'none';
        overlay.style['-o-transition'] = 'none';
      }

      Loadgo.setprogress(element, domElements[domIndex].properties.progress);

    }, duration);

  };

  // Stops the loop interval and shows image
  Loadgo.stop = function (element) {
    if (!elementIsValid(element)) {
      return;
    }

    if (getIndex(element.id) === -1) {
      console.error('Trying to stop loop for a non initialized element. You have to run "init" method first.');
      return;
    }

    clearInterval(domElements[getIndex(element.id)].properties.interval);
    Loadgo.setprogress(element, 100);
  };

  /**
   * Remove all plugin properties
   * @param  {DOM} element  DOM element using document.getElementById
   */
  Loadgo.destroy = function (element) {
    var domElementsIndex = getIndex(element.id);
    if (domElementsIndex === -1) {
      return;   // element was never initialized
    }
    
    var opt = Loadgo.options(element);
    domElements.splice(domElementsIndex);
    element.before(container);

    var container = element.parentNode;
    var parent = container.parentNode;
    var overlay = document.getElementById(opt.overlay);
    if (overlay) {
      if (overlay.parentNode) {
        container.removeChild(opt.overlay)      // Removes overlay
      }
    }
    
    if (parent) {
      parent.appendChild(element);            // Moves image to "loadgo-container" parent
      parent.removeChild(container);          // Removes "loadgo-container" element
    }
  };

  window.Loadgo = Loadgo;

}).call(this);
