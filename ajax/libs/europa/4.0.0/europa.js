(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Europa = factory());
}(this, (function () { 'use strict';

  /*
   * Copyright (C) 2017 Alasdair Mercer, !ninja
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  /**
   * A bare-bones constructor for surrogate prototype swapping.
   *
   * @private
   * @constructor
   */
  var Constructor = /* istanbul ignore next */ function() {};
  /**
   * A reference to <code>Object.prototype.hasOwnProperty</code>.
   *
   * @private
   * @type {Function}
   */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /**
   * A reference to <code>Array.prototype.slice</code>.
   *
   * @private
   * @type {Function}
   */
  var slice = Array.prototype.slice;

  /**
   * Creates an object which inherits the given <code>prototype</code>.
   *
   * Optionally, the created object can be extended further with the specified <code>properties</code>.
   *
   * @param {Object} prototype - the prototype to be inherited by the created object
   * @param {Object} [properties] - the optional properties to be extended by the created object
   * @return {Object} The newly created object.
   * @private
   */
  function createObject(prototype, properties) {
    var result;
    /* istanbul ignore next */
    if (typeof Object.create === 'function') {
      result = Object.create(prototype);
    } else {
      Constructor.prototype = prototype;
      result = new Constructor();
      Constructor.prototype = null;
    }

    if (properties) {
      extendObject(true, result, properties);
    }

    return result;
  }

  /**
   * Extends the constructor to which this method is associated with the <code>prototype</code> and/or
   * <code>statics</code> provided.
   *
   * If <code>name</code> is provided, it will be used as the class name and can be accessed via a special
   * <code>class_</code> property on the child constructor, otherwise the class name of the super constructor will be used
   * instead. The class name may also be used string representation for instances of the child constructor (via
   * <code>toString</code>), but this is not applicable to the <i>lite</i> version of Nevis.
   *
   * If <code>constructor</code> is provided, it will be used as the constructor for the child, otherwise a simple
   * constructor which only calls the super constructor will be used instead.
   *
   * The super constructor can be accessed via a special <code>super_</code> property on the child constructor.
   *
   * @param {string} [name=this.class_] - the class name to be used for the child constructor
   * @param {Function} [constructor] - the constructor for the child
   * @param {Object} [prototype] - the prototype properties to be defined for the child
   * @param {Object} [statics] - the static properties to be defined for the child
   * @return {Function} The child <code>constructor</code> provided or the one created if none was given.
   * @public
   */
  function extend(name, constructor, prototype, statics) {
    var superConstructor = this;

    if (typeof name !== 'string') {
      statics = prototype;
      prototype = constructor;
      constructor = name;
      name = null;
    }

    if (typeof constructor !== 'function') {
      statics = prototype;
      prototype = constructor;
      constructor = function() {
        return superConstructor.apply(this, arguments);
      };
    }

    extendObject(false, constructor, superConstructor, statics);

    constructor.prototype = createObject(superConstructor.prototype, prototype);
    constructor.prototype.constructor = constructor;

    constructor.class_ = name || superConstructor.class_;
    constructor.super_ = superConstructor;

    return constructor;
  }

  /**
   * Extends the specified <code>target</code> object with the properties in each of the <code>sources</code> provided.
   *
   * if any source is <code>null</code> it will be ignored.
   *
   * @param {boolean} own - <code>true</code> to only copy <b>own</b> properties from <code>sources</code> onto
   * <code>target</code>; otherwise <code>false</code>
   * @param {Object} target - the target object which should be extended
   * @param {...Object} [sources] - the source objects whose properties are to be copied onto <code>target</code>
   * @return {void}
   * @private
   */
  function extendObject(own, target, sources) {
    sources = slice.call(arguments, 2);

    var property;
    var source;

    for (var i = 0, length = sources.length; i < length; i++) {
      source = sources[i];

      for (property in source) {
        if (!own || hasOwnProperty.call(source, property)) {
          target[property] = source[property];
        }
      }
    }
  }

  var extend_1 = extend;

  /**
   * The base class from which all others should extend.
   *
   * @public
   * @constructor
   */
  function Nevis() {}
  Nevis.class_ = 'Nevis';
  Nevis.super_ = Object;

  /**
   * Extends the constructor to which this method is associated with the <code>prototype</code> and/or
   * <code>statics</code> provided.
   *
   * If <code>name</code> is provided, it will be used as the class name and can be accessed via a special
   * <code>class_</code> property on the child constructor, otherwise the class name of the super constructor will be used
   * instead. The class name may also be used string representation for instances of the child constructor (via
   * <code>toString</code>), but this is not applicable to the <i>lite</i> version of Nevis.
   *
   * If <code>constructor</code> is provided, it will be used as the constructor for the child, otherwise a simple
   * constructor which only calls the super constructor will be used instead.
   *
   * The super constructor can be accessed via a special <code>super_</code> property on the child constructor.
   *
   * @param {string} [name=this.class_] - the class name to be used for the child constructor
   * @param {Function} [constructor] - the constructor for the child
   * @param {Object} [prototype] - the prototype properties to be defined for the child
   * @param {Object} [statics] - the static properties to be defined for the child
   * @return {Function} The child <code>constructor</code> provided or the one created if none was given.
   * @public
   * @static
   * @memberof Nevis
   */
  Nevis.extend = extend_1;

  var nevis = Nevis;

  var lite = nevis;

  /**
   * Contains utility methods that are useful throughout the library.
   *
   * @public
   * @class
   * @extends Nevis
   */
  var Utilities = lite.extend(null, {

    /**
     * Iterates over own (not inherited) enumerable properties on the specified <code>object</code>.
     *
     * Nothing happens if <code>object</code> is <code>null</code>.
     *
     * @param {Object} object - the object whose own properties are to be iterated over
     * @param {Utilities~ForOwnCallback} callback - the function to be called with the value and key for each own property
     * on <code>object</code>
     * @param {Object} [context] - the value to use <code>this</code> when executing <code>callback</code>
     * @return {void}
     * @public
     * @static
     * @memberof Utilities
     */
    forOwn: function(object, callback, context) {
      if (!object) {
        return;
      }

      for (var key in object) {
        if (Utilities.hasOwn(object, key)) {
          callback.call(context, object[key], key, object);
        }
      }
    },

    /**
     * Returns whether the specified <code>object</code> has a property with the specified <code>name</code> as an own
     * (not inherited) property.
     *
     * @param {Object} object - the object on which the property is to be checked
     * @param {string} name - the name of the property to be checked
     * @return {boolean} <code>true</code> if <code>object</code> has an own property with <code>name</code>.
     * @public
     * @static
     * @memberof Utilities
     */
    hasOwn: function(object, name) {
      return Object.prototype.hasOwnProperty.call(object, name);
    },

    /**
     * Left pads the <code>string</code> provided with the given padding string for the specified number of
     * <code>times</code>.
     *
     * @param {string} [string=""] - the string to be padded
     * @param {number} [times=0] - the number of times to pad <code>string</code>
     * @param {string} [padding=" "] - the padding string
     * @return {string} The padded <code>string</code>.
     * @public
     * @static
     * @memberof Utilities
     */
    leftPad: function(string, times, padding) {
      if (string == null) {
        string = '';
      }
      if (times == null) {
        times = 0;
      }
      if (padding == null) {
        padding = ' ';
      }
      if (!padding) {
        return string;
      }

      for (var i = 0; i < times; i++) {
        string = padding + string;
      }

      return string;
    }

  });

  var Utilities_1 = Utilities;

  /**
   * Called for each own enumerable property on <code>object</code>.
   *
   * @callback Utilities~ForOwnCallback
   * @param {*} value - the value of the property
   * @param {string} key - the name of the property
   * @param {Object} object - the object to which the property belongs
   * @return {void}
   */

  /**
   * Contains contextual information for a single conversion process.
   *
   * @param {Europa} europa - the {@link Europa} instance responsible for this conversion
   * @param {Europa~Options} options - the options to be used
   * @public
   * @class
   * @extends Nevis
   */
  var Conversion = lite.extend(function(europa, options) {
    /**
     * The {@link Europa} instance responsible for this {@link Conversion}.
     *
     * @public
     * @type {Europa}
     * @memberof Conversion#
     */
    this.europa = europa;

    /**
     * The options for this {@link Conversion}.
     *
     * @public
     * @type {Europa~Options}
     * @memberof Conversion#
     */
    this.options = options;

    /**
     * Whether the buffer is at the start of the current line.
     *
     * @public
     * @type {boolean}
     * @memberof Conversion#
     */
    this.atLeft = true;

    /**
     * Whether any white space should be removed from the start of the next output.
     *
     * @public
     * @type {boolean}
     * @memberof Conversion#
     */
    this.atNoWhiteSpace = true;

    /**
     * Whether the buffer is at the start of a paragraph.
     *
     * @public
     * @type {boolean}
     * @memberof Conversion#
     */
    this.atParagraph = true;

    /**
     * The conversion output buffer to which the Markdown will be written.
     *
     * @public
     * @type {string}
     * @memberof Conversion#
     */
    this.buffer = '';

    /**
     * The context for this {@link Conversion}.
     *
     * @public
     * @type {Object.<string, *>}
     * @memberof Conversion#
     */
    this.context = {};

    /**
     * Whether the buffer is currently within a code block.
     *
     * @public
     * @type {boolean}
     * @memberof Conversion#
     */
    this.inCodeBlock = false;

    /**
     * Whether the buffer is currently within an ordered list.
     *
     * @public
     * @type {boolean}
     * @memberof Conversion#
     */
    this.inOrderedList = false;

    /**
     * Whether the buffer is currently within a preformatted block.
     *
     * @public
     * @type {boolean}
     * @memberof Conversion#
     */
    this.inPreformattedBlock = false;

    /**
     * The last string to be output next to the buffer.
     *
     * @public
     * @type {string}
     * @memberof Conversion#
     */
    this.last = null;

    /**
     * The start of the current line.
     *
     * @public
     * @type {string}
     * @memberof Conversion#
     */
    this.left = '\n';

    /**
     * The depth of nested lists.
     *
     * @public
     * @type {number}
     * @memberof Conversion#
     */
    this.listDepth = 0;

    /**
     * The one-based index for the current list item within the current list.
     *
     * @public
     * @type {number}
     * @memberof Conversion#
     */
    this.listIndex = 1;

    this._document = europa.document;
    this._element = null;
    this._tagName = null;
    this._window = europa.window;
  }, {

    /**
     * Appends the last output string to the buffer and then queues the specified <code>string</code> to be output.
     *
     * @param {string} string - the string to be appended
     * @return {Conversion} A reference to this {@link Conversion} for chaining purposes.
     * @public
     * @memberof Conversion#
     */
    append: function(string) {
      if (this.last != null) {
        this.buffer += this.last;
      }

      this.last = string;

      return this;
    },

    /**
     * Appends a paragraph to the output buffer.
     *
     * @return {Conversion} A reference to this {@link Conversion} for chaining purposes.
     * @public
     * @memberof Conversion#
     */
    appendParagraph: function() {
      if (this.atParagraph) {
        return this;
      }

      if (!this.atLeft) {
        this.append(this.left);

        this.atLeft = true;
      }

      this.append(this.left);

      this.atNoWhiteSpace = true;
      this.atParagraph = true;

      return this;
    },

    /**
     * Outputs the specified <code>string</code> to the buffer.
     *
     * Optionally, <code>string</code> can be "cleaned" before being output. Doing so will replace any certain special
     * characters as well as some white space.
     *
     * @param {string} string - the string to be output
     * @param {boolean} [clean=false] - <code>true</code> to clean <code>string</code>; otherwise <code>false</code>
     * @return {Conversion} A reference to this {@link Conversion} for chaining purposes.
     * @public
     * @memberof Conversion#
     */
    output: function(string, clean) {
      if (!string) {
        return this;
      }

      string = string.replace(/\r\n/g, '\n');

      if (clean) {
        string = string.replace(/\n([ \t]*\n)+/g, '\n')
          .replace(/\n[ \t]+/g, '\n')
          .replace(/[ \t]+/g, ' ');

        Utilities_1.forOwn(Conversion.replacements, function(value, key) {
          string = string.replace(Conversion.replacementsRegExp[key], value);
        });
      }

      if (!this.inPreformattedBlock) {
        if (this.atNoWhiteSpace) {
          string = string.replace(/^[ \t\n]+/, '');
        } else if (/^[ \t]*\n/.test(string)) {
          string = string.replace(/^[ \t\n]+/, '\n');
        } else {
          string = string.replace(/^[ \t]+/, ' ');
        }
      }

      if (!string) {
        return this;
      }

      this.atLeft = /\n$/.test(string);
      this.atNoWhiteSpace = /[ \t\n]$/.test(string);
      this.atParagraph = /\n{2}$/.test(string);

      return this.append(string.replace(/\n/g, this.left));
    },

    /**
     * Replaces the start of the current line with the <code>string</code> provided.
     *
     * @param {string} string - the string to replace the start of the current line
     * @return {Conversion} A reference to this {@link Conversion} for chaining purposes.
     * @public
     * @memberof Conversion#
     */
    replaceLeft: function(string) {
      if (!this.atLeft) {
        this.append(this.left.replace(/[ ]{2,4}$/, string));

        this.atLeft = true;
        this.atNoWhiteSpace = true;
        this.atParagraph = true;
      } else if (this.last) {
        this.last = this.last.replace(/[ ]{2,4}$/, string);
      }

      return this;
    }

  }, {

    /**
     * A map of special characters and their replacements.
     *
     * @public
     * @static
     * @type {Object.<string, string>}
     * @memberof Conversion
     */
    replacements: {
      '\\\\': '\\\\',
      '\\[': '\\[',
      '\\]': '\\]',
      '>': '\\>',
      '_': '\\_',
      '\\*': '\\*',
      '`': '\\`',
      '#': '\\#',
      '([0-9])\\.(\\s|$)': '$1\\.$2',
      '\u00a9': '(c)',
      '\u00ae': '(r)',
      '\u2122': '(tm)',
      '\u00a0': ' ',
      '\u00b7': '\\*',
      '\u2002': ' ',
      '\u2003': ' ',
      '\u2009': ' ',
      '\u2018': '\'',
      '\u2019': '\'',
      '\u201c': '"',
      '\u201d': '"',
      '\u2026': '...',
      '\u2013': '--',
      '\u2014': '---'
    },

    /**
     * A map of special characters and the regular expression used to identify them.
     *
     * @public
     * @static
     * @type {Object.<string, RegExp>}
     * @memberof Conversion
     */
    replacementsRegExp: {}

  });

  Object.defineProperties(Conversion.prototype, {

    document: {
      /**
       * Returns the current document for this {@link Conversion}.
       *
       * This may not be the same document as is associated with the {@link Europa} instance as this document may be
       * nested (e.g. a frame).
       *
       * @return {Document} The current document.
       * @public
       * @memberof Conversion#
       * @alias document
       */
      get: function() {
        return this._document;
      }
    },

    element: {
      /**
       * Returns the current element for this {@link Conversion}.
       *
       * @return {Element} The current element.
       * @public
       * @memberof Conversion#
       * @alias element
       */
      get: function() {
        return this._element;
      },

      /**
       * Sets the current element for this {@link Conversion} to <code>element</code>.
       *
       * @param {Element} element - the current element to be set
       * @return {void}
       * @public
       * @memberof Conversion#
       * @alias element
       */
      set: function(element) {
        this._element = element;
        this._tagName = element && element.tagName ? element.tagName.toLowerCase() : null;
      }
    },

    tagName: {
      /**
       * Returns the name of the tag for the current element for this {@link Conversion}.
       *
       * The tag name will always be in lower case, when available.
       *
       * @return {string} The current element's tag name.
       * @public
       * @memberof Conversion#
       * @alias tagName
       */
      get: function() {
        return this._tagName;
      }
    },

    window: {
      /**
       * Returns the current window for this {@link Conversion}.
       *
       * This may not be the same window as is associated with the {@link Europa} instance as this window may be nested
       * (e.g. a frame).
       *
       * @return {Window} The current window.
       * @public
       * @memberof Conversion#
       * @alias window
       */
      get: function() {
        return this._window;
      },

      /**
       * Sets the current window for this {@link Conversion} to <code>window</code>.
       *
       * This may not be the same window as is associated with the {@link Europa} instance as this window may be nested
       * (e.g. a frame).
       *
       * @param {Window} window - the window to be set
       * @return {void}
       * @public
       * @memberof Conversion#
       * @alias window
       */
      set: function(window) {
        this._window = window;
        this._document = window ? window.document : null;
      }
    }

  });

  Utilities_1.forOwn(Conversion.replacements, function(value, key) {
    Conversion.replacementsRegExp[key] = new RegExp(key, 'g');
  });

  var Conversion_1 = Conversion;

  /**
   * Contains utility methods that are useful when dealing with the DOM.
   *
   * @public
   * @class
   * @extends Nevis
   */
  var DOMUtilities = lite.extend(null, {

    /**
     * Checks whether the specified <code>element</code> is currently visible using the <code>window</code> provided.
     *
     * This is not a very sophisticated check and could easily be mistaken, but it should catch a lot of the most simple
     * cases.
     *
     * @param {Element} element - the element whose visibility is to be checked
     * @param {Window} window - the window to be used
     * @return {boolean} <code>true</code> if <code>element</code> is visible; otherwise <code>false</code>.
     * @public
     * @static
     * @memberof DOMUtilities
     */
    isVisible: function(element, window) {
      var style = window.getComputedStyle(element);

      return style.getPropertyValue('display') !== 'none' && style.getPropertyValue('visibility') !== 'hidden';
    }

  });

  var DOMUtilities_1 = DOMUtilities;

  /**
   * Defines an available option.
   *
   * If <code>defaultValue</code> is a function, it will be called if/when needed and the return value will be used as the
   * default value. If the default value is to be a function itself, then <code>defaultValue</code> must return that
   * function.
   *
   * @param {string} name - the name to be used
   * @param {*} [defaultValue] - the default value to be used
   * @public
   * @class
   * @extends Nevis
   */
  var Option = lite.extend(function(name, defaultValue) {
    /**
     * The name for this {@link Option}.
     *
     * @public
     * @type {string}
     * @memberof Option#
     */
    this.name = name;

    this._defaultValue = defaultValue;
  });

  Object.defineProperty(Option.prototype, 'defaultValue', {
    /**
     * Returns the default value for this {@link Option}.
     *
     * @return {*} The default value.
     * @public
     * @memberof Option#
     * @alias defaultValue
     */
    get: function() {
      var defaultValue = this._defaultValue;

      return typeof defaultValue === 'function' ? defaultValue.call(this) : defaultValue;
    }
  });

  var Option_1 = Option;

  /**
   * Manages multiple {@link Option} instances that are intended to be used by multiple implementations/instances.
   *
   * @param {Option[]} options - the options to be used
   * @public
   * @class
   * @extends Nevis
   */
  var OptionParser = lite.extend(function(options) {
    /**
     * The available options for this {@link OptionParser}.
     *
     * @public
     * @type {Option[]}
     * @memberof OptionParser#
     */
    this.options = options;
  }, {

    /**
     * Returns whether an option with the specified <code>name</code> is available.
     *
     * @param {string} name - the name of the {@link Option} whose existence is to be checked
     * @return {boolean} <code>true</code> if an {@link Option} exists with <code>name</code>; otherwise
     * <code>false</code>.
     * @public
     * @memberof OptionParser#
     */
    exists: function(name) {
      return this.options.some(function(option) {
        return option.name === name;
      });
    },

    /**
     * Parses the specified <code>options</code>, extracting only properties that match valid options and applying default
     * values where required.
     *
     * @param {Object} [options] - the options to be parsed
     * @return {Object.<string, *>} The parsed options.
     * @public
     * @memberof OptionParser#
     */
    parse: function(options) {
      if (!options) {
        options = {};
      }

      var result = {};

      this.options.forEach(function(option) {
        var name = option.name;
        var value = options[name] != null ? options[name] : option.defaultValue;

        result[name] = value;
      });

      return result;
    }

  });

  var OptionParser_1 = OptionParser;

  /**
   * A plugin that can tap into multiple parts in the conversion process while being specific to only a sub-set of tags.
   *
   * @public
   * @class
   * @extends Nevis
   */
  var Plugin = lite.extend({

    /**
     * Called after {@link Plugin#convert} <b>and</b> only once all children elements have been converted as well,
     * provided they weren't skipped, and intended for tidying up after the conversion.
     *
     * <code>context</code> can be used to receive any state for a single element conversion from {@link Plugin#before}
     * and {@link Plugin#convert}.
     *
     * @param {Conversion} conversion - the current {@link Conversion}
     * @param {Object.<string, *>} context - the current context for this {@link Plugin}
     * @return {void}
     * @public
     * @memberof Plugin#
     */
    after: function(conversion, context) {},

    /**
     * Called before any elements are converted and intended to setup this {@link Plugin} initially.
     *
     * @param {Conversion} conversion - the current {@link Conversion}
     * @return {void}
     * @public
     * @memberof Plugin#
     */
    afterAll: function(conversion) {},

    /**
     * Called immediately before {@link Plugin#convert} and intended for preparing this {@link Plugin} for conversion.
     *
     * <code>context</code> can be used to pass any state for a single element conversion to {@link Plugin#convert} and
     * then to {@link Plugin#after}.
     *
     * @param {Conversion} conversion - the current {@link Conversion}
     * @param {Object.<string, *>} context - the current context for this {@link Plugin}
     * @return {void}
     * @public
     * @memberof Plugin#
     */
    before: function(conversion, context) {},

    /**
     * Called after all elements have been converted and intended to completing any steps for this {@link Plugin}.
     *
     * @param {Conversion} conversion - the current {@link Conversion}
     * @return {void}
     * @public
     * @memberof Plugin#
     */
    beforeAll: function(conversion) {},

    /**
     * Converts the current element within the specified <code>conversion</code> which can be used to provide control over
     * the conversion and returns whether the children of the element should be converted.
     *
     * <code>context</code> can be used to pass any state for a single element conversion from {@link Plugin#before} to
     * {@link Plugin#after}.
     *
     * @param {Conversion} conversion - the current {@link Conversion}
     * @param {Object.<string, *>} context - the current context for this {@link Plugin}
     * @return {boolean} <code>true</code> if the children of the current element should be converted; otherwise
     * <code>false</code>.
     * @public
     * @memberof Plugin#
     */
    convert: function(conversion, context) {
      return true;
    },

    /**
     * Returns the names of tags with which this {@link Plugin} should be registered to handle.
     *
     * @return {string[]} The names of supported tags.
     * @public
     * @memberof Plugin#
     */
    getTagNames: function() {
      return [];
    }

  });

  var Plugin_1 = Plugin;

  /**
   * A basic manager for {@link Service} implementations that are mapped to simple names.
   *
   * @public
   * @class
   * @extends Nevis
   */
  var ServiceManager = lite.extend(function() {
    this._services = {};
  }, {

    /**
     * Returns the {@link Service} being managed with the specified <code>name</code>.
     *
     * @param {string} name - the name of the {@link Service} to be returned
     * @return {Service} The {@link Service} is being managed with <code>name</code>.
     * @throws {Error} If no {@link Service} is being managed with <code>name</code>.
     * @public
     * @memberof ServiceManager#
     */
    getService: function(name) {
      var service = this._services[name];
      if (!service) {
        throw new Error('Service is not being managed with name: ' + name);
      }

      return service;
    },

    /**
     * Sets the {@link Service} implementation to be managed for the specified <code>name</code> to the
     * <code>service</code> provided.
     *
     * @param {string} name - the name of the {@link Service} to be managed with <code>name</code>
     * @param {Service} service - the {@link Service} implementation to be managed
     * @return {void}
     * @throws {Error} If a {@link Service} is already being managed with the same <code>name</code>.
     * @public
     * @memberof ServiceManager#
     */
    setService: function(name, service) {
      if (this._services[name]) {
        throw new Error('Service is already managed with name: ' + name);
      }

      if (service) {
        this._services[name] = service;
      }
    }

  });

  var ServiceManager_1 = ServiceManager;

  var plugins = {};
  var serviceManager = new ServiceManager_1();

  /**
   * Enables configuration of a HTML to Markdown converter that supports HTML strings and DOM elements.
   *
   * @param {Europa~Options} [options] - the options to be used
   * @public
   * @class
   * @extends Nevis
   */
  var Europa = lite.extend(function(options) {
    this._options = new OptionParser_1([
      new Option_1('absolute', false),
      new Option_1('baseUri', function() {
        return serviceManager.getService('window').getDefaultBaseUri();
      }),
      new Option_1('inline', false)
    ])
    .parse(options);
    this._window = null;
  }, {

    /**
     * Converts the specified <code>html</code> into Markdown based on the options configured for this {@link Europa}
     * instance.
     *
     * <code>html</code> can either be an HTML string or a DOM element whose HTML contents are to be converted into
     * Markdown.
     *
     * @param {Element|string} html - the HTML (or element whose inner HTML is) to be converted into Markdown
     * @return {string} The Markdown converted from <code>html</code>.
     * @public
     * @memberof Europa#
     */
    convert: function(html) {
      if (!html) {
        return '';
      }

      var document = this.document;
      var root;

      if (typeof html === 'string') {
        root = document.createElement('div');
        root.innerHTML = html;
      } else {
        root = html;
      }

      var conversion = new Conversion_1(this, this._options);
      var wrapper;

      if (!document.contains(root)) {
        wrapper = document.createElement('div');
        wrapper.style.display = 'none';
        wrapper.appendChild(root);

        document.body.appendChild(wrapper);
      }

      try {
        Utilities_1.forOwn(plugins, function(plugin) {
          plugin.beforeAll(conversion);
        });

        this.convertElement(root, conversion);

        Utilities_1.forOwn(plugins, function(plugin) {
          plugin.afterAll(conversion);
        });
      } finally {
        if (wrapper) {
          document.body.removeChild(wrapper);

          wrapper.removeChild(root);
        }
      }

      return conversion.append('').buffer.trim();
    },

    /**
     * Converts the specified <code>element</code> and it's children into Markdown using the <code>conversion</code>
     * provided.
     *
     * Nothing happens if <code>element</code> is <code>null</code> or is invisible (simplified detection used).
     *
     * @param {Element} element - the element (along well as it's children) to be converted into Markdown
     * @param {Conversion} conversion - the current {@link Conversion}
     * @return {void}
     * @public
     * @memberof Europa#
     */
    convertElement: function(element, conversion) {
      if (!element) {
        return;
      }

      var convertChildren = false;
      var window = this.window;
      var context, i, plugin, value;

      if (element.nodeType === window.Node.ELEMENT_NODE) {
        if (!DOMUtilities_1.isVisible(element, window)) {
          return;
        }

        conversion.element = element;

        context = {};
        plugin = plugins[conversion.tagName];
        convertChildren = true;

        if (plugin) {
          plugin.before(conversion, context);
          convertChildren = plugin.convert(conversion, context);
        }

        if (convertChildren) {
          for (i = 0; i < element.childNodes.length; i++) {
            this.convertElement(element.childNodes[i], conversion);
          }
        }

        if (plugin) {
          plugin.after(conversion, context);
        }
      } else if (element.nodeType === window.Node.TEXT_NODE) {
        value = element.nodeValue || '';

        if (conversion.inPreformattedBlock) {
          conversion.output(value);
        } else if (conversion.inCodeBlock) {
          conversion.output(value.replace(/`/g, '\\`'));
        } else {
          conversion.output(value, true);
        }
      }
    },

    /**
     * Releases the window used by this {@link Europa} instance.
     *
     * This allows closeable {@link WindowService} implementations to close the window and free up resources. However,
     * this instance can and will simply retrieve another window from the {@link WindowService} the next time it is
     * required (i.e. {@link Europa#convert} is called).
     *
     * @return {Europa} A reference to this {@link Europa} for chaining purposes.
     * @public
     * @memberof Europa#
     */
    release: function() {
      if (this._window) {
        serviceManager.getService('window').closeWindow(this._window);
        this._window = null;
      }

      return this;
    }

  }, {

    /**
     * A convient reference to {@link Plugin} exposed on {@link Europa} for cases where Europa Core is bundled.
     *
     * @public
     * @static
     * @type {Function}
     * @memberof Europa
     */
    Plugin: Plugin_1,

    /**
     * Registers the specified <code>plugin</code> to be used by all {@link Europa} instances.
     *
     * If <code>plugin</code> declares support for a tag name which already has a {@link Plugin} registered for it,
     * <code>plugin</code> will replace the previously registered plugin, but only for conflicting tag names.
     *
     * @param {Plugin} plugin - the {@link Plugin} to be registered
     * @return {void}
     * @public
     * @static
     * @memberof Europa
     */
    register: function(plugin) {
      plugin.getTagNames().forEach(function(tag) {
        plugins[tag] = plugin;
      });
    },

    /**
     * Configures the <code>service</code> provided to be used by all {@link Europa} instances.
     *
     * @param {Service} service - the {@link Service} to be configured
     * @return {void}
     * @throws {Error} If a {@link Service} has already been configured with the same name.
     * @public
     * @static
     * @memberof Europa
     */
    use: function(service) {
      serviceManager.setService(service.getName(), service);
    }

  });

  Object.defineProperties(Europa.prototype, {

    document: {
      /**
       * Returns the document to be used for HTML to Markdown conversion by this {@link Europa} instance.
       *
       * @return {Document} The document.
       * @public
       * @memberof Europa#
       * @alias document
       */
      get: function() {
        return this.window.document;
      }
    },

    window: {
      /**
       * Returns the window to be used for HTML to Markdown conversion by this {@link Europa} instance.
       *
       * @return {Window} The window.
       * @public
       * @memberof Europa#
       * @alias window
       */
      get: function() {
        if (!this._window) {
          this._window = serviceManager.getService('window').getWindow(this._options.baseUri);
        }

        return this._window;
      }
    }

  });

  var Europa_1$2 = Europa;

  /**
   * The options used by {@link Europa}.
   *
   * @typedef {Object} Europa~Options
   * @property {boolean} [absolute=false] - Whether absolute URLS should be used for anchors/images.
   * @property {string} [baseUri] - The base URI for the window. This is ignored in environments where the base URI cannot
   * be changed.
   * @property {boolean} [inline=false] - Whether anchor/image URLs are to be inserted inline.
   */

  /**
   * A {@link Plugin} which extracts the URL from an anchor. Anchors without an <code>href</code> are treated as plain
   * text.
   *
   * If the <code>absolute</code> option is enabled, then the URL extracted from the anchor will be absolute. Otherwise,
   * the URL will be exactly as it is in the <code>href</code> attribute.
   *
   * If the <code>inline</code> option is enabled, then the URL (and any <code>title</code> on the anchor) will be
   * inserted immediately after the anchor contents (e.g. <code>[foo](/bar)</code>). Otherwise, all unique URL and title
   * combinations will be indexed (e.g. <code>[foo][anchor0]</code>) and the references will be output at the very end.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var AnchorPlugin = Plugin_1.extend({

    /**
     * @override
     */
    after: function(conversion, context) {
      if (context.value != null) {
        conversion.output(']' + context.value);
      }
    },

    /**
     * @override
     */
    afterAll: function(conversion) {
      var anchors = conversion.context.anchors;
      if (!anchors.length) {
        return;
      }

      conversion.append('\n\n');

      for (var i = 0; i < anchors.length; i++) {
        conversion.append('[anchor' + i + ']: ' + anchors[i] + '\n');
      }
    },

    /**
     * @override
     */
    beforeAll: function(conversion) {
      conversion.context.anchorMap = {};
      conversion.context.anchors = [];
    },

    /**
     * @override
     */
    convert: function(conversion, context) {
      var element = conversion.element;
      var options = conversion.options;
      var href = options.absolute ? element.href : element.getAttribute('href');
      if (!href) {
        return true;
      }

      var anchorMap = conversion.context.anchorMap;
      var anchors = conversion.context.anchors;
      var title = element.getAttribute('title');
      var value = title ? href + ' "' + title + '"' : href;
      var index;

      if (options.inline) {
        context.value = '(' + value + ')';
      } else {
        index = anchorMap[value];
        if (index == null) {
          index = anchors.push(value) - 1;

          anchorMap[value] = index;
        }

        context.value = '[anchor' + index + ']';
      }

      conversion.output('[');

      conversion.atNoWhiteSpace = true;

      return true;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [ 'a' ];
    }

  });

  Europa_1$2.register(new AnchorPlugin());

  /**
   * A {@link Plugin} which outputs the contents in a block quote.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var BlockQuotePlugin = Plugin_1.extend({

    /**
     * @override
     */
    after: function(conversion, context) {
      conversion.atLeft = false;
      conversion.atParagraph = false;
      conversion.left = context.previousLeft;

      conversion.appendParagraph();
    },

    /**
     * @override
     */
    before: function(conversion, context) {
      context.previousLeft = conversion.left;
    },

    /**
     * @override
     */
    convert: function(conversion, context) {
      var value = '> ';

      conversion.left += value;

      if (conversion.atParagraph) {
        conversion.append(value);
      } else {
        conversion.appendParagraph();
      }

      return true;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [
        'blockquote',
        'dd'
      ];
    }

  });

  Europa_1$2.register(new BlockQuotePlugin());

  /**
   * A {@link Plugin} which outputs an inline line break.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var BreakPlugin = Plugin_1.extend({

    /**
     * @override
     */
    convert: function(conversion, context) {
      conversion.append('  ' + conversion.left);

      conversion.atLeft = true;
      conversion.atNoWhiteSpace = true;

      return false;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [ 'br' ];
    }

  });

  Europa_1$2.register(new BreakPlugin());

  /**
   * A {@link Plugin} which outputs the contents in a code block.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var CodePlugin = Plugin_1.extend({

    /**
     * @override
     */
    after: function(conversion, context) {
      if (!context.skipped) {
        conversion.inCodeBlock = context.previousInCodeBlock;

        conversion.output('`');
      }
    },

    /**
     * @override
     */
    before: function(conversion, context) {
      context.previousInCodeBlock = conversion.inCodeBlock;
    },

    /**
     * @override
     */
    convert: function(conversion, context) {
      if (conversion.inPreformattedBlock) {
        context.skipped = true;
      } else {
        conversion.output('`');

        conversion.inCodeBlock = true;
      }

      return true;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [
        'code',
        'kbd',
        'samp'
      ];
    }

  });

  Europa_1$2.register(new CodePlugin());

  /**
   * A {@link Plugin} which outputs a definition term as strong text.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var DefinitionTermPlugin = Plugin_1.extend({

    /**
     * @override
     */
    after: function(conversion, context) {
      conversion.output('**');
    },

    /**
     * @override
     */
    convert: function(conversion, context) {
      conversion.appendParagraph();

      conversion.output('**');

      conversion.atNoWhiteSpace = true;

      return true;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [ 'dt' ];
    }

  });

  Europa_1$2.register(new DefinitionTermPlugin());

  /**
   * A {@link Plugin} which outputs a details section.
   *
   * If the details has an <code>open</code> attribute then all of its children are converted. Otherwise, only the nested
   * <code>summary</code>, if any, will be converted.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var DetailsPlugin = Plugin_1.extend({

    /**
     * @override
     */
    convert: function(conversion, context) {
      var element = conversion.element;

      conversion.appendParagraph();

      if (element.hasAttribute('open')) {
        return true;
      }

      var summary = element.querySelector('summary');
      conversion.europa.convertElement(summary, conversion);

      return false;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [ 'details' ];
    }

  });

  Europa_1$2.register(new DetailsPlugin());

  /**
   * A {@link Plugin} which outputs as emphasised text.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var EmphasisPlugin = Plugin_1.extend({

    /**
     * @override
     */
    after: function(conversion, context) {
      conversion.output('_');
    },

    /**
     * @override
     */
    convert: function(conversion, context) {
      conversion.output('_');

      conversion.atNoWhiteSpace = true;

      return true;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [
        'cite',
        'dfn',
        'em',
        'i',
        'u',
        'var'
      ];
    }

  });

  Europa_1$2.register(new EmphasisPlugin());

  /**
   * A {@link Plugin} which simply ensures that no children elements are converted.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var EmptyPlugin = Plugin_1.extend({

    /**
     * @override
     */
    convert: function(conversion, context) {
      return false;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [
        'applet',
        'area',
        'audio',
        'button',
        'canvas',
        'datalist',
        'embed',
        'head',
        'input',
        'map',
        'menu',
        'meter',
        'noframes',
        'noscript',
        'object',
        'optgroup',
        'option',
        'param',
        'progress',
        'rp',
        'rt',
        'ruby',
        'script',
        'select',
        'style',
        'textarea',
        'title',
        'video'
      ];
    }

  });

  Europa_1$2.register(new EmptyPlugin());

  /**
   * A {@link Plugin} which outputs the contents of nested frame.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var FramePlugin = Plugin_1.extend({

    /**
     * @override
     */
    after: function(conversion, context) {
      conversion.window = context.previousWindow;
    },

    /**
     * @override
     */
    before: function(conversion, context) {
      context.previousWindow = conversion.window;
    },

    /**
     * @override
     */
    convert: function(conversion, context) {
      var window = conversion.element.contentWindow;

      if (window) {
        conversion.window = window;

        conversion.europa.convertElement(window.document.body, conversion);
      }

      return false;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [ 'frame', 'iframe' ];
    }

  });

  Europa_1$2.register(new FramePlugin());

  /**
   * A {@link Plugin} which outputs a heading of various levels.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var HeadingPlugin = Plugin_1.extend({

    /**
     * @override
     */
    convert: function(conversion, context) {
      var level = parseInt(conversion.tagName.match(/([1-6])$/)[1], 10);

      conversion.appendParagraph();

      var heading = '';
      for (var i = 0; i < level; i++) {
        heading += '#';
      }

      conversion.output(heading + ' ');

      return true;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6'
      ];
    }

  });

  Europa_1$2.register(new HeadingPlugin());

  /**
   * A {@link Plugin} which outputs a horizontal rule.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var HorizontalRulePlugin = Plugin_1.extend({

    /**
     * @override
     */
    convert: function(conversion, context) {
      conversion
        .appendParagraph()
        .output('---')
        .appendParagraph();

      return false;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [ 'hr' ];
    }

  });

  Europa_1$2.register(new HorizontalRulePlugin());

  /**
   * A {@link Plugin} which extracts the URL from an image.
   *
   * If the <code>absolute</code> option is enabled, then the URL extracted from the image will be absolute. Otherwise,
   * the URL will be exactly as it is in the <code>src</code> attribute.
   *
   * If the <code>inline</code> option is enabled, then the URL will be inserted immediately after the <code>alt</code> on
   * the image (e.g. <code>![foo](/bar.png)</code>). Otherwise, all unique URLs will be indexed
   * (e.g. <code>![foo][image0]</code>) and the references will be output at the very end.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var ImagePlugin = Plugin_1.extend({

    /**
     * @override
     */
    afterAll: function(conversion) {
      var images = conversion.context.images;
      if (!images.length) {
        return;
      }

      conversion.append('\n\n');

      for (var i = 0; i < images.length; i++) {
        conversion.append('[image' + i + ']: ' + images[i] + '\n');
      }
    },

    /**
     * @override
     */
    beforeAll: function(conversion) {
      conversion.context.imageMap = {};
      conversion.context.images = [];
    },

    /**
     * @override
     */
    convert: function(conversion, context) {
      var element = conversion.element;
      var options = conversion.options;
      var source = options.absolute ? element.src : element.getAttribute('src');
      if (!source) {
        return false;
      }

      var alternativeText = element.getAttribute('alt') || '';
      var imageMap = conversion.context.imageMap;
      var images = conversion.context.images;
      var title = element.getAttribute('title');
      var value = title ? source + ' "' + title + '"' : source;
      var index;

      if (options.inline) {
        value = '(' + value + ')';
      } else {
        index = imageMap[value];
        if (index == null) {
          index = images.push(value) - 1;

          imageMap[value] = index;
        }

        value = '[image' + index + ']';
      }

      conversion.output('![' + alternativeText + ']' + value);

      return false;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [ 'img' ];
    }

  });

  Europa_1$2.register(new ImagePlugin());

  /**
   * A {@link Plugin} which outputs a list item. The prefix for the list item will vary depending on what type of list the
   * item is contained within.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var ListItemPlugin = Plugin_1.extend({

    /**
     * @override
     */
    convert: function(conversion, context) {
      var value = conversion.inOrderedList ? conversion.listIndex++ + '. ' : '* ';

      if (!conversion.atLeft) {
        conversion.append(conversion.left.replace(/[ ]{2,4}$/, '\n'));

        conversion.atLeft = true;
        conversion.atNoWhiteSpace = true;
        conversion.atParagraph = true;
      } else if (conversion.last) {
        conversion.last = conversion.last.replace(/[ ]{2,4}$/, '\n');
      }

      conversion.append(Utilities_1.leftPad(value, (conversion.listDepth - 1) * 2));

      return true;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [ 'li' ];
    }

  });

  Europa_1$2.register(new ListItemPlugin());

  /**
   * A {@link Plugin} which outputs an ordered list.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var OrderedListPlugin = Plugin_1.extend({

    /**
     * @override
     */
    after: function(conversion, context) {
      conversion.inOrderedList = context.previousInOrderedList;
      conversion.listIndex = context.previousListIndex;
      conversion.listDepth--;
    },

    /**
     * @override
     */
    before: function(conversion, context) {
      context.previousInOrderedList = conversion.inOrderedList;
      context.previousListIndex = conversion.listIndex;
    },

    /**
     * @override
     */
    convert: function(conversion, context) {
      if (conversion.listDepth === 0) {
        conversion.appendParagraph();
      }

      conversion.inOrderedList = true;
      conversion.listIndex = 1;
      conversion.listDepth++;

      return true;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [ 'ol' ];
    }

  });

  Europa_1$2.register(new OrderedListPlugin());

  /**
   * A {@link Plugin} which outputs a paragraph.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var ParagraphPlugin = Plugin_1.extend({

    /**
     * @override
     */
    convert: function(conversion, context) {
      conversion.appendParagraph();

      return true;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [
        'address',
        'article',
        'aside',
        'div',
        'fieldset',
        'footer',
        'header',
        'nav',
        'p',
        'section'
      ];
    }

  });

  Europa_1$2.register(new ParagraphPlugin());

  /**
   * A {@link Plugin} which outputs the contents in a preformatted block.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var PreformattedPlugin = Plugin_1.extend({

    /**
     * @override
     */
    after: function(conversion, context) {
      conversion.atLeft = false;
      conversion.atParagraph = false;
      conversion.inPreformattedBlock = context.previousInPreformattedBlock;
      conversion.left = context.previousLeft;

      conversion.appendParagraph();
    },

    /**
     * @override
     */
    before: function(conversion, context) {
      context.previousInPreformattedBlock = conversion.inPreformattedBlock;
      context.previousLeft = conversion.left;
    },

    /**
     * @override
     */
    convert: function(conversion, context) {
      var value = '    ';

      conversion.left += value;

      if (conversion.atParagraph) {
        conversion.append(value);
      } else {
        conversion.appendParagraph();
      }

      return true;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [ 'pre' ];
    }

  });

  Europa_1$2.register(new PreformattedPlugin());

  /**
   * A {@link Plugin} which outputs as quoted text.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var QuotePlugin = Plugin_1.extend({

    /**
     * @override
     */
    after: function(conversion, context) {
      conversion.output('"');
    },

    /**
     * @override
     */
    convert: function(conversion, context) {
      conversion.output('"');

      conversion.atNoWhiteSpace = true;

      return true;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [ 'q' ];
    }

  });

  Europa_1$2.register(new QuotePlugin());

  /**
   * A {@link Plugin} which outputs as strong text.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var StrongPlugin = Plugin_1.extend({

    /**
     * @override
     */
    after: function(conversion, context) {
      conversion.output('**');
    },

    /**
     * @override
     */
    convert: function(conversion, context) {
      conversion.output('**');

      conversion.atNoWhiteSpace = true;

      return true;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [
        'b',
        'strong'
      ];
    }

  });

  Europa_1$2.register(new StrongPlugin());

  /**
   * A {@link Plugin} which outputs an unordered list.
   *
   * @public
   * @class
   * @extends Plugin
   */
  var UnorderedListPlugin = Plugin_1.extend({

    /**
     * @override
     */
    after: function(conversion, context) {
      conversion.inOrderedList = context.previousInOrderedList;
      conversion.listIndex = context.previousListIndex;
      conversion.listDepth--;
    },

    /**
     * @override
     */
    before: function(conversion, context) {
      context.previousInOrderedList = conversion.inOrderedList;
      context.previousListIndex = conversion.listIndex;
    },

    /**
     * @override
     */
    convert: function(conversion, context) {
      if (conversion.listDepth === 0) {
        conversion.appendParagraph();
      }

      conversion.inOrderedList = false;
      conversion.listIndex = 1;
      conversion.listDepth++;

      return true;
    },

    /**
     * @override
     */
    getTagNames: function() {
      return [ 'ul' ];
    }

  });

  Europa_1$2.register(new UnorderedListPlugin());

  var index = Europa_1$2;

  /**
   * Defines a service contract that must be met by all implementations.
   *
   * @public
   * @class
   * @extends Nevis
   */
  var Service = lite.extend({

    /**
     * Returns the name of this {@link Service}.
     *
     * @return {string} The service name.
     * @public
     * @abstract
     * @memberof Service#
     */
    getName: function() {}

  });

  var Service_1 = Service;

  /**
   * A service used to retrieve the window object for converting HTML to Markdown and, optionally, to close it upon
   * destruction of the {@link Europa} instance. This can be useful to free up resources as/when required in an artificial
   * browser environment.
   *
   * @public
   * @class
   * @extends Service
   */
  var WindowService = Service_1.extend({

    /**
     * Closes the specified <code>window</code> but only if this {@link WindowService} is closeable.
     *
     * @param {Window} window - the window to be closed
     * @return {void}
     * @public
     * @memberof WindowService#
     */
    closeWindow: function(window) {
      if (this.isCloseable(window)) {
        window.close();
      }
    },

    /**
     * Returns the default base URI for windows provided by this {@link WindowService}.
     *
     * Implementations of {@link WindowService} <b>must</b> override this method with their own specific logic.
     *
     * @return {string} The default base URI.
     * @public
     * @abstract
     * @memberof WindowService#
     */
    getDefaultBaseUri: function() {},

    /**
     * @override
     */
    getName: function() {
      return 'window';
    },

    /**
     * Returns a window to be used for converting HTML to Markdown using the base URI provided.
     *
     * It's important to note that the base URI cannot be changed in some environments, in which case <code>baseUri</code>
     * will be ignored.
     *
     * Implementations of {@link WindowService} <b>must</b> override this method with their own specific logic.
     *
     * @param {string} baseUri - the base URI to be used
     * @return {Window} The window.
     * @public
     * @abstract
     * @memberof WindowService#
     */
    getWindow: function(baseUri) {},

    /**
     * Returns whether the specified <code>window</code> which was retrieved by this {@link WindowService} is closeable.
     *
     * The default implementation of this method will always return <code>false</code>.
     *
     * @param {Window} window - the window to be checked
     * @return {boolean} <code>true</code> if <code>window</code> is closeable; otherwise <code>false</code>.
     * @public
     * @memberof WindowService#
     */
    isCloseable: function(window) {
      return false;
    }

  });

  var WindowService_1 = WindowService;

  /**
   * An implementation of {@link WindowService} intended for use within a browser environment.
   *
   * @public
   * @class
   * @extends WindowService
   */
  var BrowserWindowService = WindowService_1.extend({

    /**
     * @override
     */
    getDefaultBaseUri: function() {
      return window.document.baseURI;
    },

    /**
     * @override
     */
    getWindow: function(baseUri) {
      return window;
    }

  });

  var BrowserWindowService_1 = BrowserWindowService;

  index.use(new BrowserWindowService_1());

  var Europa_1 = index;

  return Europa_1;

})));

//# sourceMappingURL=europa.js.map