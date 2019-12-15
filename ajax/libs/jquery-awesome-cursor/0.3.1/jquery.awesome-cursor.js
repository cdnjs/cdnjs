/*! jquery-awesome-cursor - v0.3.1 - 2016-04-23
* https://jwarby.github.io/jquery-awesome-cursor
* Copyright (c) 2016 ; Licensed MIT */
;(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'));
  } else {
    factory(global.jQuery);
  }
})(this, function($) {
  'use strict';

  /**
   * Parse the user-supplied hotspot string.  Hotspot values as strings are used
   * to set the cursor based on a human-readable value.
   *
   * ## Examples
   *
   * - `hotspot: 'center'`: the hotspot is in the center of the cursor
   * - `hotspot: 'center left'`: the hotspot is centered vertically, and fixed
   *                             to the left of the cursor horizontally
   * - `hotspot: 'top right'`: the hotspot is at the top right
   * - `hotspot: 'center top'`: the hotspot is centered horizontally, and fixed
   *                            to the top of the cursor vertically
   *
   * @param {String} hotspot  The string descriptor for the hotspot location
   * @param {Number} size     The size of the cursor
   *
   * @return {[Number]} an array with two elements, the x and y offsets for the
   *                    hotspot
   *
   * @throws {Error} if `hotspot` is not a string, or `cursorSize` is not a
   *                 number
   */
  var parseHotspotString = function(hotspot, cursorSize) {
    var xOffset = 0,
      yOffset = 0;

    if (typeof hotspot !== 'string') {
      $.error('Hotspot value is not a string and could not be parsed');
    }

    if (typeof cursorSize !== 'number') {
      $.error('Cursor size must be a number');
    }

    hotspot.split(' ').forEach(function(part) {
      switch (part) {
        case 'center':
          xOffset = cursorSize / 2;
          yOffset = cursorSize / 2;
          break;
        case 'top':
          yOffset = 0;
          break;
        case 'bottom':

          /* Browsers will default to 0 0 if yOffset is the very last pixel,
           * hence - 1
           */
          yOffset = cursorSize - 1;
          break;
        case 'left':
          xOffset = 0;
          break;
        case 'right':
          xOffset = cursorSize - 1;
          break;
      }
    });

    return [xOffset, yOffset];
  };

  /**
   * Returns a new canvas with the same contents as `canvas`, flipped
   * accordingly.
   *
   * @param {Canvas} canvas     The canvas to flip
   * @param {String} direction  The direction flip the canvas in.  Can be one
   *                            of:
   *                              - 'horizontal'
   *                              - 'vertical'
   *                              - 'both'
   *
   * @return {Canvas} a new canvas with the flipped contents of the input canvas
   */
  function flipCanvas(canvas, direction) {
    if ($.inArray(direction, ['horizontal', 'vertical', 'both']) === -1) {
      $.error('Flip value must be one of horizontal, vertical or both');
    }

    var flippedCanvas = $('<canvas />')[0],
      flippedContext;

    flippedCanvas.width = canvas.width;
    flippedCanvas.height = canvas.height;

    flippedContext = flippedCanvas.getContext('2d');

    if (direction === 'horizontal' || direction === 'both') {
      flippedContext.translate(canvas.width, 0);
      flippedContext.scale(-1, 1);
    }

    if (direction === 'vertical' || direction === 'both') {
      flippedContext.translate(0, canvas.height);
      flippedContext.scale(1, -1);
    }

    flippedContext.drawImage(canvas, 0, 0, canvas.width, canvas.height);

    return flippedCanvas;
  }

  $.fn.extend({
    awesomeCursor: function(iconName, options) {
      options = $.extend({}, $.fn.awesomeCursor.defaults, options);

      if (typeof iconName !== 'string' || !iconName) {
        $.error('First parameter must be the icon name, e.g. \'pencil\'');
      }

      options.size = typeof options.size === 'string' ?
          parseInt(options.size, 10) : options.size;

      if (typeof options.hotspot === 'string') {
        options.hotspot = parseHotspotString(options.hotspot, options.size);
      }

      // Clamp hotspot coordinates between 0 and size - 1
      options.hotspot = $.map(options.hotspot, function(coordinate) {
        return Math.min(options.size - 1, Math.max(0, coordinate));
      });

      var cssClass = (function(name, template) {
          if (typeof template === 'string') {
            return template.replace(/%s/g, name);
          } else if (typeof template === 'function') {
            return template(name);
          }

          return name;
        })(iconName, options.font.cssClass),
        srcElement = $('<i />', {
          class: cssClass,
          style: 'display: inline; font-size: ' + options.size + 'px;'
        });

      // Wrap the icon inside an absolute element to remove it from doc flow
      var wrapper = $('<div />', {
        style: 'position: absolute; left: -9999px; top: -9999px;'
      }).append(srcElement);

      // Render element to the DOM, otherwise `getComputedStyle` will not work
      $('body').append(wrapper);

      // Get the unicode value and dimensions of the icon
      var unicode = window.getComputedStyle(srcElement[0], ':before')
          .getPropertyValue('content'),
        clientRect = srcElement[0].getBoundingClientRect();

      var canvas = $('<canvas />')[0],
        canvasSize = Math.max(clientRect.width, clientRect.height),
        hotspotOffset, dataURL, context;

      // Remove the source element from the DOM
      srcElement.remove();

      // Increase the size of the canvas to account for the cursor's outline
      if (options.outline) {
        canvasSize += 2;
      }

      if (options.rotate) {

        // @TODO: move this into it's own function
        canvasSize = Math.ceil(Math.sqrt(
          Math.pow(canvasSize, 2) + Math.pow(canvasSize, 2)
        ));

        hotspotOffset = (canvasSize - options.size) / 2;
        canvas.width = canvasSize;
        canvas.height = canvasSize;

        context = canvas.getContext('2d');
        context.translate(canvas.width / 2, canvas.height / 2);

        // Canvas API works in radians, not degrees, hence `* Math.PI / 180`
        context.rotate(options.rotate * Math.PI / 180);
        context.translate(-canvas.width / 2, -canvas.height / 2);

        // Translate hotspot offset
        options.hotspot[0] += options.hotspot[0] !== canvas.width / 2 ?
            hotspotOffset : 0;

        options.hotspot[1] += options.hotspot[1] !== canvas.height / 2 ?
            hotspotOffset : 0;
      } else {

        canvas.height = canvasSize;
        canvas.width = canvasSize;

        context = canvas.getContext('2d');
      }

      /* Firefox wraps the extracted unicode value in double quotes - #10
       * Chrome 43+ is wrapping the extracted value in single quotes - #14
       */
      unicode = unicode.replace(/['"]/g, '');

      // Draw the cursor to the canvas
      context.fillStyle = options.color;
      context.font = options.size + 'px ' + options.font.family;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(unicode, canvasSize / 2, canvasSize / 2);

      // Check for outline option
      if (options.outline) {
        context.lineWidth = 0.5;
        context.strokeStyle = options.outline;
        context.strokeText(unicode, canvasSize / 2, canvasSize / 2);
      }

      // Check flip option
      if (options.flip) {
        canvas = flipCanvas(canvas, options.flip);
      }

      dataURL = canvas.toDataURL('image/png');

      $(this)

        // Fixes issue with Chrome not setting cursor if already set
        .css('cursor', '')
        .css('cursor', [
          'url(' + dataURL + ')',
          options.hotspot[0],
          options.hotspot[1],
          ',',
          'auto'
        ].join(' '))
      ;

      // Maintain chaining
      return this;
    }
  });

  // Expose the defaults so that users can override them if they want to
  $.fn.awesomeCursor.defaults = {
    color: '#000000',
    size: 18,
    hotspot: [0, 0],
    flip: '',
    rotate: 0,
    outline: null,
    font: {
      family: 'FontAwesome',
      cssClass: 'fa fa-%s'
    }
  };
});
