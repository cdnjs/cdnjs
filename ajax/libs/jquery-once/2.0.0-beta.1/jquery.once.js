/*!
 * jQuery Once v2.0.0-beta.1 - http://github.com/robloach/jquery-once
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */

/**
 * Universal Module Definition
 *
 * jQuery is a dependency, so we wrap the code with a UMD pattern in order to
 * allow loading jQuery and jQuery Once through a module definition like
 * CommonJS, AMD, or otherwise.
 *
 * @see {@link http://github.com/umdjs/umd}
 */
(function (factory) {
  "use strict";
  if (typeof exports === "object") {
    // CommonJS
    factory(require("jquery"));
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(["jquery"], factory);
  } else {
    // Global object
    factory(jQuery);
  }
}(function ($) {
  "use strict";

  /**
   * Filter elements by whether they have not yet been processed.
   *
   * @param {string} id
   *   The data id used to determine whether the given elements have already
   *   been processed or not.
   *
   * @returns jQuery element collection of elements that have now run once by
   *   the given id.
   *
   * @example
   * // Change the color to green only once.
   * $('p').once('changecolor').css('color', 'green');
   *
   * @see removeOnce
   * @see findOnce
   * @this jQuery
   *
   * @global
   * @public
   */
  $.fn.once = function (id) {
    id = id || "once";
    if (typeof id !== "string") {
      throw new Error("jQuery.once() parameter must be a string");
    }
    // Build the name for the data identifier. Generate a new unique id if the
    // id parameter is not provided.
    var name = "jquery-once-" + id;

    // Filter the elements by which do not have the data yet.
    return this.filter(function() {
      return $(this).data(name) !== true;
    }).data(name, true);
  };

  /**
   * Removes the once data from the given elements, based on the given ID.
   *
   * @param {string} id
   *   A required string representing the name of the data id which should be used
   *   when filtering the elements. This only filters elements that have already
   *   been processed by the once function. The id should be the same id that
   *   was originally passed to the once() function.
   *
   * @returns jQuery element collection of elements that now have their once
   *   data removed.
   *
   * @example
   * // Remove once data with the "changecolor" ID.
   * $('p').removeOnce('changecolor').each(function() {
   *   // This function is called for all elements that had their once removed.
   * });
   *
   * @see once
   * @this jQuery
   *
   * @global
   * @public
   */
  $.fn.removeOnce = function (id) {
    // Filter through the elements to find the once'd elements.
    return this.findOnce(id).removeData("jquery-once-" + id);
  };

  /**
   * Filters elements that have already been processed once.
   *
   * @param {string} id
   *   A required string representing the name of the data id which should be used
   *   when filtering the elements. This only filters elements that have already
   *   been processed by the once function. The id should be the same id that
   *   was originally passed to the once() function.
   *
   * @returns jQuery element collection of elements that have been run once.
   *
   * @example
   * // Find all elements that have the changecolor'ed once.
   * $('p').findOnce('changecolor').each(function() {
   *   // This function is called for all elements that has already once'd.
   * });
   *
   * @see once
   * @this jQuery
   *
   * @global
   * @public
   */
  $.fn.findOnce = function (id) {
    // Filter the elements by which do have the data.
    var name = "jquery-once-" + id;

    return this.filter(function() {
      return $(this).data(name) === true;
    });
  };
}));
