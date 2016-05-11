/**
 * Countable is a script to allow for live paragraph-, word- and character-
 * counting on an HTML element. Usage is recommended on `input` and `textarea`
 * elements.
 *
 * @author   Sacha Schmid (http://github.com/RadLikeWhoa)
 * @version  1.0
 * @license  MIT
 */

;(function () {
  "use strict";

  /**
   * Create a new Countable instance on an HTML element.
   *
   * @constructor
   *
   * @param    {HTMLElement}  element     The element to be used for the
   *                                      couting.
   * @param    {Function}     [callback]  The callback to receive and process
   *                                      the result. The callback should
   *                                      accept only one parameter. (default:
   *                                      logs to console)
   * @param    {Boolean}      [hard]      Sets whether to use hard returns (2
   *                                      line breaks) or not. (default: false)
   *
   * @example  new Countable(elem, function (counter) {
   *             alert(counter.paragraphs, counter.words, counter.characters);
   *           });
   */

  var _ = window.Countable = function (element, callback, hard) {

    /**
     * Expect a valid HTMLElement. If no element or an invalid value is given,
     * Couontable returns nothing.
     */

    if (!element || !(typeof HTMLElement === 'object' ? element instanceof HTMLElement : element && typeof element === 'object' && element.nodeType === 1 && typeof element.nodeName === 'string')) return;

    this.element = element;
    this.callback = typeof callback === 'function' ? callback : function (counter) {
      if (typeof console !== 'undefined') console.log(counter);
    };
    this.hard = hard;

    this.init();
  };

  _.prototype = {

    /**
     * Trim leading and trailing whitespace.
     *
     * @return  {Object}  The object containing the number of paragraphs, words
     *                    and characters, all accessible by their names.
     */

    count: function () {
      var str = (this.element.value || this.element.innerText || this.element.textContent || '').replace(/^\s+|\s+$/, '');

      return {
        paragraphs: str ? str.replace((this.hard ? /\n{2,}/g : /\n+/g), (this.hard ? '\n\n' : '\n')).split((this.hard ? '\n\n' : '\n')).length : 0,
        words: str ? str.replace(/\s+/g, ' ').split(' ').length : 0,
        characters: str ? str.replace(/\s/g, '').split('').length : 0
      };
    },

    /**
     * Initiate the Countable object by calling the `count()` function and
     * adding the `input` event listener to the given element.
     */

    init: function () {
      var self = this;

      self.callback(self.count());

      if (typeof self.element.addEventListener !== 'undefined') {
        self.element.addEventListener('input', function () {
          self.callback(self.count());
        });
      } else if (typeof self.element.attachEvent !== 'undefined') {
        self.element.attachEvent('onkeydown', function () {
          self.callback(self.count());
        });
      }
    }

  };
}());
