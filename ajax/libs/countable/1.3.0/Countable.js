/**
 * Countable is a script to allow for live paragraph-, word- and character-
 * counting on an HTML element. Usage is recommended on `input` and `textarea`
 * elements.
 *
 * @author   Sacha Schmid (<https://github.com/RadLikeWhoa>)
 * @version  1.3.0
 * @license  MIT
 * @see      <http://radlikewhoa.github.io/Countable/>
 */

;(function (global, undefined) {
  'use strict';

  /**
   * String.trim() polyfill for non-supporting browsers. This is the
   * recommended polyfill on MDN.
   *
   * @see     <http://goo.gl/uYveB>
   *
   * @return  {String}  The original string with leading and trailing
   *                    whitespace removed.
   */

  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, '')
    }
  }

  /**
   * Create a new Countable instance on an HTML element.
   *
   * @constructor
   *
   * @param    {HTMLElement}  element     The element to be used for the
   *                                      counting.
   * @param    {Function}     [callback]  The callback to receive and process
   *                                      the result. The callback should
   *                                      accept only one parameter. (default:
   *                                      logs to console)
   * @param    {Boolean}      [hard]      Sets whether to use hard returns (2
   *                                      line breaks) or not. (default: false)
   *
   * @example  new Countable(elem, function (counter) {
   *             alert(counter.words)
   *           })
   *
   * @return   {Countable}    An instance of the Countable class.
   */

  function Countable (element, callback, hard) {
    var hasConsole = 'console' in global && 'log' in console

    /**
     * Countable throws a breaking error if the first parameter is not a valid
     * HTML element. Also, it will give a warning about a missing callback.
     */

    if (!element || element.nodeType !== 1)
      throw new Error('Countable expects a valid HTML element')

    if (!callback && hasConsole)
      console.warn('You should provide your own callback function to Countable')

    /**
     * In this step, the given parameters are bound to this instance of
     * Countable. The callback parameter is optional; if it is not given,
     * Countable will simply log the results to the console.
     */

    this.element = element
    this.callback = callback ? callback : hasConsole ? function (counter) {
      console.log(counter)
    } : undefined
    this.hard = hard

    this.init()

    return this
  }

  Countable.prototype = {

    /**
     * ucs2decode function from the punycode.js library.
     *
     * Creates an array containing the decimal code points of each Unicode
     * character in the string. While JavaScript uses UCS-2 internally,
     * this function will convert a pair of surrogate halves (each of which
     * UCS-2 exposes as separate characters) into a single code point,
     * matching UTF-16.
     *
     * @see     <http://goo.gl/8M09r>
     * @see     <http://goo.gl/u4UUC>
     *
     * @param   {String}  string   The Unicode input string (UCS-2).
     *
     * @return  {Array}   The new array of code points.
     */

    decode: function (string) {
      var output = [],
          counter = 0,
          length = string.length,
          value, extra

      while (counter < length) {
        value = string.charCodeAt(counter++)

        if ((value & 0xF800) == 0xD800 && counter < length) {

          // High surrogate, and there is a next character.

          extra = string.charCodeAt(counter++)

          if ((extra & 0xFC00) == 0xDC00) {

            // Low surrogate.

            output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000)
          } else {
            output.push(value, extra)
          }
        } else {
          output.push(value)
        }
      }

      return output
    },

    /**
     * Trim leading and trailing whitespace and count paragraphs, words and
     * characters.
     *
     * @return  {Object}  The object containing the number of paragraphs, words
     *                    and characters, all accessible by their names.
     */

    count: function () {
      var element = this.element,
          orig = 'value' in element ? element.value : element.innerText || element.textContent,
          temp = document.createElement('div'),
          str

      temp.innerHTML = orig
      str = (temp.innerText || temp.textContent).trim()

      return {
        paragraphs: str ? (str.match(this.hard ? /\n{2,}/g : /\n+/g) || []).length + 1 : 0,
        words: str ? (str.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []).length : 0,
        characters: str ? this.decode(str.replace(/\s/g, '')).length : 0,
        all: this.decode(orig.replace(/[\n\r]/g, '')).length
      }
    },

    /**
     * Initiate the Countable object by calling the `count()` function and
     * adding the `input` event listener to the given element.
     */

    init: function () {
      var self = this,
          element = self.element,
          callback = self.callback,
          count = self.count,
          hasInput = 'oninput' in element

      if (!callback) return

      callback(count.call(self))

      if (element.addEventListener) {
        element.addEventListener((hasInput ? 'input' : 'keydown'), function () {
          callback(count.call(self))
        })
      } else if (element.attachEvent) {
        element.attachEvent((!hasInput ? 'onkeydown' : 'oninput'), function () {
          callback(count.call(self))
        })
      }
    }
  }

  /**
   * Expose Countable depending on the module system used across the
   * application.
   */

  if (typeof exports === 'object') {
    module.exports = Countable;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return Countable
    })
  } else {
    global.Countable = Countable;
  }
}(this))