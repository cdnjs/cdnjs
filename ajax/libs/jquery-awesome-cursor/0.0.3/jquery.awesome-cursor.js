/*! jquery-awesome-cursor - v0.0.3 - 2014-11-17
* https://jwarby.github.io/jquery-awesome-cursor
* Copyright (c) 2014 James Warwood; Licensed MIT */
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

      var srcElement = $('<i />', {
          class: 'fa fa-' + iconName,
          style: 'position: absolute; left: -9999px; top: -9999px;'
        }),
        canvas = $('<canvas />')[0],
        unicode,
        dataURL,
        context;

      // Render element to the DOM, otherwise `getComputedStyle` will not work
      $('body').append(srcElement);

      // Get the unicode value of the icon
      unicode = window.getComputedStyle(srcElement[0], ':before')
          .getPropertyValue('content');

      // Remove the source element from the DOM
      srcElement.remove();

      canvas.height = options.size;
      canvas.width = options.size;

      context = canvas.getContext('2d');

      // Check flip option
      if (options.flip === 'horizontal' || options.flip === 'both') {
        context.translate(canvas.width, 0);//canvas.height / 2);
        context.scale(-1, 1);
      }

      if (options.flip === 'vertical' || options.flip === 'both') {
        context.translate(0, canvas.height);
        context.scale(1, -1);
      }

      context.fillStyle = options.color;
      context.font = options.size + 'px FontAwesome';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(unicode, options.size / 2, options.size / 2);

      dataURL = canvas.toDataURL('image/png');

      $(this).css('cursor', [
        'url(' + dataURL + ')',
        options.hotspot[0],
        options.hotspot[1],
        ',',
        'auto'
      ].join(' '));

      // Maintain chaining
      return this;
    }
  });

  // Expose the defaults so that users can override them if they want to
  $.fn.awesomeCursor.defaults = {
    color: '#000000',
    size: 18,
    hotspot: [0, 0],
    flip: ''
  };
});
