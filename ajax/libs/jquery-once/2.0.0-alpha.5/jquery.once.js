/*!
 * @file jQuery Once
 * @description Act on jQuery elements only once.
 * @version 2.0.0-alpha.5
 * @link http://github.com/robloach/jquery-once
 * @author Rob Loach (http://robloach.net)
 * @license MIT, GPL-2.0
 */

(function (factory) {
  "use strict";
  if (typeof exports === 'object') {
    factory(require('jquery'));
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }
}(function ($) {
  "use strict";
  var cache = {}, uuid = 0;

  /**
   * Filters elements by whether they have not yet been processed.
   *
   * @param {(string|function)} [id]
   *   (Optional) If this is a string, then it will be the data ID used
   *   to determine whether it has already been processed or not.
   *
   *   If the id parameter is a function, it will be passed off to the fn
   *   parameter and the id will become a unique identifier, represented as a
   *   number.
   *
   *   When the id is neither a string or a function, it becomes a unique
   *   identifier, depicted as a number. The element's data ID will then be
   *   represented in the form of "jquery-once-#".
   * @param {function} [fn]
   *   (Optional) If given, this function will be called for each element that
   *   has not yet been processed. The function's return value follows the same
   *   logic as $.each(). Returning true will continue to the next matched
   *   element in the set, while returning false will entirely break the
   *   iteration.
   * @returns jQuery element collection of elements that have now run once.
   *
   * @example
   * // Change the color to green only once.
   * $('p').once('changecolor', function() {
   *   // This function is called for every p element that hasn't been called
   *   // with "changecolor" once() before.
   *   $(this).css('color', 'green');
   * });
   *
   * @see removeOnce
   * @see findOnce
   *
   * @public
   * @global
   */
  $.fn.once = function (id, fn) {
    if (typeof id !== 'string') {
      // Generate a numeric ID if the id passed can't be used as a CSS class.
      if (!(id in cache)) {
        cache[id] = ++uuid;
      }
      // When the fn parameter is not passed, we interpret it from the id.
      if (!fn) {
        fn = id;
      }
      id = cache[id];
    }

    // Filter the elements by which do not have the data yet.
    var name = 'jquery-once-' + id;
    var elements = this.filter(function() {
      return $(this).data(name) !== true;
    }).data(name, true);

    return $.isFunction(fn) ? elements.each(fn) : elements;
  };

  /**
   * Removes the once data from the given elements, based on the given ID.
   *
   * @param {string} id
   *   A required string representing the name of the data id which should be used
   *   when filtering the elements. This only filters elements that have already
   *   been processed by the once function. The id should be the same id that
   *   was originally passed to the once() function.
   * @param {function} [fn]
   *   (Optional) If given, this function will be called for each element that
   *   whose element's once data was removed. The function's return value
   *   follows the same logic as $.each(). Returning true will continue to the
   *   next matched element in the set, while returning false will entirely
   *   break the iteration.
   *
   * @returns jQuery element collection of elements that now have their once
   *   data removed.
   *
   * @example
   * // Remove once data with the "changecolor" ID.
   * $('p').removeOnce('changecolor', function() {
   *   // This function is called for all elements that had their once removed.
   * });
   *
   * @see once
   *
   * @public
   * @global
   */
  $.fn.removeOnce = function (id, fn) {
    // Filter through the elements to find the once'd elements.
    var elements = this.findOnce(id);

    // Remove the once data from the elements.
    elements.removeData('jquery-once-' + id);

    return $.isFunction(fn) ? elements.each(fn) : elements;
  };

  /**
   * Filters elements that have already been processed once.
   *
   * @param {string} id
   *   A required string representing the name of the data id which should be used
   *   when filtering the elements. This only filters elements that have already
   *   been processed by the once function. The id should be the same id that
   *   was originally passed to the once() function.
   * @param {function} [fn]
   *   (Optional) If given, this function will be called for each element that
   *   has not yet been processed. The function's return value follows the same
   *   logic as $.each(). Returning true will continue to the next matched
   *   element in the set, while returning false will entirely break the
   *   iteration.
   *
   * @returns jQuery element collection of elements that have been run once.
   *
   * @example
   * // Find all elements that have the changecolor'ed once.
   * $('p').findOnce('changecolor', function() {
   *   // This function is called for all elements that has already once'd.
   * });
   *
   * @see once
   *
   * @public
   * @global
   */
  $.fn.findOnce = function (id, fn) {
    // Filter the elements by which do have the data.
    var name = 'jquery-once-' + id;
    var elements = this.filter(function() {
      return $(this).data(name) === true;
    });

    return $.isFunction(fn) ? elements.each(fn) : elements;
  };
}));
