;
/*!
 * Copyright 2008 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * Utility functions and classes for Soy.
 *
 * <p>
 * The top portion of this file contains utilities for Soy users:<ul>
 *   <li> soy.StringBuilder: Compatible with the 'stringbuilder' code style.
 *   <li> soy.renderElement: Render template and set as innerHTML of an element.
 *   <li> soy.renderAsFragment: Render template and return as HTML fragment.
 * </ul>
 *
 * <p>
 * The bottom portion of this file contains utilities that should only be called
 * by Soy-generated JS code. Please do not use these functions directly from
 * your hand-writen code. Their names all start with '$$'.
 *
 */


// COPIED FROM nogoog_shim.js

// Create closure namespaces.
var goog = goog || {};


goog.inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {}
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  childCtor.prototype.constructor = childCtor;
};


// Just enough browser detection for this file.
if (!goog.userAgent) {
  goog.userAgent = (function() {
    var userAgent = "";
    if ("undefined" !== typeof navigator && navigator
        && "string" == typeof navigator.userAgent) {
      userAgent = navigator.userAgent;
    }
    var isOpera = userAgent.indexOf('Opera') == 0;
    return {
      /**
       * @type {boolean}
       */
      HAS_JSCRIPT: typeof 'ScriptEngine' in this,
      /**
       * @type {boolean}
       */
      IS_OPERA: isOpera,
      /**
       * @type {boolean}
       */
      IS_IE: !isOpera && userAgent.indexOf('MSIE') != -1,
      /**
       * @type {boolean}
       */
      IS_WEBKIT: !isOpera && userAgent.indexOf('WebKit') != -1
    };
  })();
}

if (!goog.asserts) {
  goog.asserts = {
    /**
     * @param {...*} var_args
     */
    fail: function (var_args) {}
  };
}


// Stub out the document wrapper used by renderAs*.
if (!goog.dom) {
  goog.dom = {};
  /**
   * @param {Document=} d
   * @constructor
   */
  goog.dom.DomHelper = function(d) {
    this.document_ = d || document;
  };
  /**
   * @return {!Document}
   */
  goog.dom.DomHelper.prototype.getDocument = function() {
    return this.document_;
  };
  /**
   * Creates a new element.
   * @param {string} name Tag name.
   * @return {!Element}
   */
  goog.dom.DomHelper.prototype.createElement = function(name) {
    return this.document_.createElement(name);
  };
  /**
   * Creates a new document fragment.
   * @return {!DocumentFragment}
   */
  goog.dom.DomHelper.prototype.createDocumentFragment = function() {
    return this.document_.createDocumentFragment();
  };
}


if (!goog.format) {
  goog.format = {
    insertWordBreaks: function(str, maxCharsBetweenWordBreaks) {
      str = String(str);

      var resultArr = [];
      var resultArrLen = 0;

      // These variables keep track of important state inside str.
      var isInTag = false;  // whether we're inside an HTML tag
      var isMaybeInEntity = false;  // whether we might be inside an HTML entity
      var numCharsWithoutBreak = 0;  // number of chars since last word break
      var flushIndex = 0;  // index of first char not yet flushed to resultArr

      for (var i = 0, n = str.length; i < n; ++i) {
        var charCode = str.charCodeAt(i);

        // If hit maxCharsBetweenWordBreaks, and not space next, then add <wbr>.
        if (numCharsWithoutBreak >= maxCharsBetweenWordBreaks &&
            // space
            charCode != 32) {
          resultArr[resultArrLen++] = str.substring(flushIndex, i);
          flushIndex = i;
          resultArr[resultArrLen++] = goog.format.WORD_BREAK;
          numCharsWithoutBreak = 0;
        }

        if (isInTag) {
          // If inside an HTML tag and we see '>', it's the end of the tag.
          if (charCode == 62) {
            isInTag = false;
          }

        } else if (isMaybeInEntity) {
          switch (charCode) {
            // Inside an entity, a ';' is the end of the entity.
            // The entity that just ended counts as one char, so increment
            // numCharsWithoutBreak.
          case 59:  // ';'
            isMaybeInEntity = false;
            ++numCharsWithoutBreak;
            break;
            // If maybe inside an entity and we see '<', we weren't actually in
            // an entity. But now we're inside and HTML tag.
          case 60:  // '<'
            isMaybeInEntity = false;
            isInTag = true;
            break;
            // If maybe inside an entity and we see ' ', we weren't actually in
            // an entity. Just correct the state and reset the
            // numCharsWithoutBreak since we just saw a space.
          case 32:  // ' '
            isMaybeInEntity = false;
            numCharsWithoutBreak = 0;
            break;
          }

        } else {  // !isInTag && !isInEntity
          switch (charCode) {
            // When not within a tag or an entity and we see '<', we're now
            // inside an HTML tag.
          case 60:  // '<'
            isInTag = true;
            break;
            // When not within a tag or an entity and we see '&', we might be
            // inside an entity.
          case 38:  // '&'
            isMaybeInEntity = true;
            break;
            // When we see a space, reset the numCharsWithoutBreak count.
          case 32:  // ' '
            numCharsWithoutBreak = 0;
            break;
            // When we see a non-space, increment the numCharsWithoutBreak.
          default:
            ++numCharsWithoutBreak;
            break;
          }
        }
      }

      // Flush the remaining chars at the end of the string.
      resultArr[resultArrLen++] = str.substring(flushIndex);

      return resultArr.join('');
    },
    /**
     * String inserted as a word break by insertWordBreaks(). Safari requires
     * <wbr></wbr>, Opera needs the 'shy' entity, though this will give a
     * visible hyphen at breaks. Other browsers just use <wbr>.
     * @type {string}
     * @private
     */
    WORD_BREAK: goog.userAgent.IS_WEBKIT
        ? '<wbr></wbr>' : goog.userAgent.IS_OPERA ? '&shy;' : '<wbr>'
  };
}


if (!goog.i18n) {
  goog.i18n = {
    bidi: {
      /**
       * Check the directionality of a piece of text, return true if the piece
       * of text should be laid out in RTL direction.
       * @param {string} text The piece of text that need to be detected.
       * @param {boolean=} opt_isHtml Whether {@code text} is HTML/HTML-escaped.
       *     Default: false.
       * @return {boolean}
       * @private
       */
      detectRtlDirectionality: function(text, opt_isHtml) {
        text = soyshim.$$bidiStripHtmlIfNecessary_(text, opt_isHtml);
        return soyshim.$$bidiRtlWordRatio_(text)
            > soyshim.$$bidiRtlDetectionThreshold_;
      }
    }
  };
}

/**
 * Directionality enum.
 * @enum {number}
 */
goog.i18n.bidi.Dir = {
  RTL: -1,
  UNKNOWN: 0,
  LTR: 1
};


/**
 * Convert a directionality given in various formats to a goog.i18n.bidi.Dir
 * constant. Useful for interaction with different standards of directionality
 * representation.
 *
 * @param {goog.i18n.bidi.Dir|number|boolean} givenDir Directionality given in
 *     one of the following formats:
 *     1. A goog.i18n.bidi.Dir constant.
 *     2. A number (positive = LRT, negative = RTL, 0 = unknown).
 *     3. A boolean (true = RTL, false = LTR).
 * @return {goog.i18n.bidi.Dir} A goog.i18n.bidi.Dir constant matching the given
 *     directionality.
 */
goog.i18n.bidi.toDir = function(givenDir) {
  if (typeof givenDir == 'number') {
    return givenDir > 0 ? goog.i18n.bidi.Dir.LTR :
        givenDir < 0 ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.UNKNOWN;
  } else {
    return givenDir ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
  }
};


/**
 * Utility class for formatting text for display in a potentially
 * opposite-directionality context without garbling. Provides the following
 * functionality:
 *
 * @param {goog.i18n.bidi.Dir|number|boolean} dir The context
 *     directionality as a number
 *     (positive = LRT, negative = RTL, 0 = unknown).
 * @constructor
 */
goog.i18n.BidiFormatter = function(dir) {
  this.dir_ = goog.i18n.bidi.toDir(dir);
};


/**
 * Returns "dir=ltr" or "dir=rtl", depending on {@code text}'s estimated
 * directionality, if it is not the same as the context directionality.
 * Otherwise, returns the empty string.
 *
 * @param {string} text Text whose directionality is to be estimated.
 * @param {boolean=} opt_isHtml Whether {@code text} is HTML / HTML-escaped.
 *     Default: false.
 * @return {string} "dir=rtl" for RTL text in non-RTL context; "dir=ltr" for LTR
 *     text in non-LTR context; else, the empty string.
 */
goog.i18n.BidiFormatter.prototype.dirAttr = function (text, opt_isHtml) {
  var dir = soy.$$bidiTextDir(text, opt_isHtml);
  return dir && dir != this.dir_ ? dir < 0 ? 'dir=rtl' : 'dir=ltr' : '';
};

/**
 * Returns the trailing horizontal edge, i.e. "right" or "left", depending on
 * the global bidi directionality.
 * @return {string} "left" for RTL context and "right" otherwise.
 */
goog.i18n.BidiFormatter.prototype.endEdge = function () {
  return this.dir_ < 0 ? 'left' : 'right';
};

/**
 * Returns the Unicode BiDi mark matching the context directionality (LRM for
 * LTR context directionality, RLM for RTL context directionality), or the
 * empty string for neutral / unknown context directionality.
 *
 * @return {string} LRM for LTR context directionality and RLM for RTL context
 *     directionality.
 */
goog.i18n.BidiFormatter.prototype.mark = function () {
  return (
      (this.dir_ > 0) ? '\u200E' /*LRM*/ :
      (this.dir_ < 0) ? '\u200F' /*RLM*/ :
      '');
};

/**
 * Returns a Unicode BiDi mark matching the context directionality (LRM or RLM)
 * if the directionality or the exit directionality of {@code text} are opposite
 * to the context directionality. Otherwise returns the empty string.
 *
 * @param {string} text The input text.
 * @param {boolean=} opt_isHtml Whether {@code text} is HTML / HTML-escaped.
 *     Default: false.
 * @return {string} A Unicode bidi mark matching the global directionality or
 *     the empty string.
 */
goog.i18n.BidiFormatter.prototype.markAfter = function (text, opt_isHtml) {
  var dir = soy.$$bidiTextDir(text, opt_isHtml);
  return soyshim.$$bidiMarkAfterKnownDir_(this.dir_, dir, text, opt_isHtml);
};

/**
 * Formats a string of unknown directionality for use in HTML output of the
 * context directionality, so an opposite-directionality string is neither
 * garbled nor garbles what follows it.
 *
 * @param {string} str The input text.
 * @param {boolean=} placeholder This argument exists for consistency with the
 *     Closure Library. Specifying it has no effect.
 * @return {string} Input text after applying the above processing.
 */
goog.i18n.BidiFormatter.prototype.spanWrap = function(str, placeholder) {
  str = String(str);
  var textDir = soy.$$bidiTextDir(str, true);
  var reset = soyshim.$$bidiMarkAfterKnownDir_(this.dir_, textDir, str, true);
  if (textDir > 0 && this.dir_ <= 0) {
    str = '<span dir=ltr>' + str + '</span>';
  } else if (textDir < 0 && this.dir_ >= 0) {
    str = '<span dir=rtl>' + str + '</span>';
  }
  return str + reset;
};

/**
 * Returns the leading horizontal edge, i.e. "left" or "right", depending on
 * the global bidi directionality.
 * @return {string} "right" for RTL context and "left" otherwise.
 */
goog.i18n.BidiFormatter.prototype.startEdge = function () {
  return this.dir_ < 0 ? 'right' : 'left';
};

/**
 * Formats a string of unknown directionality for use in plain-text output of
 * the context directionality, so an opposite-directionality string is neither
 * garbled nor garbles what follows it.
 * As opposed to {@link #spanWrap}, this makes use of unicode BiDi formatting
 * characters. In HTML, its *only* valid use is inside of elements that do not
 * allow mark-up, e.g. an 'option' tag.
 *
 * @param {string} str The input text.
 * @param {boolean=} placeholder This argument exists for consistency with the
 *     Closure Library. Specifying it has no effect.
 * @return {string} Input text after applying the above processing.
 */
goog.i18n.BidiFormatter.prototype.unicodeWrap = function(str, placeholder) {
  str = String(str);
  var textDir = soy.$$bidiTextDir(str, true);
  var reset = soyshim.$$bidiMarkAfterKnownDir_(this.dir_, textDir, str, true);
  if (textDir > 0 && this.dir_ <= 0) {
    str = '\u202A' + str + '\u202C';
  } else if (textDir < 0 && this.dir_ >= 0) {
    str = '\u202B' + str + '\u202C';
  }
  return str + reset;
};


goog.string = {

  /**
   * Converts \r\n, \r, and \n to <br>s
   * @param {*} str The string in which to convert newlines.
   * @param {boolean=} opt_xml Whether to use XML compatible tags.
   * @return {string} A copy of {@code str} with converted newlines.
   */
  newLineToBr: function(str, opt_xml) {

    str = String(str);

    // This quick test helps in the case when there are no chars to replace,
    // in the worst case this makes barely a difference to the time taken.
    if (!goog.string.NEWLINE_TO_BR_RE_.test(str)) {
      return str;
    }

    return str.replace(/(\r\n|\r|\n)/g, opt_xml ? '<br />' : '<br>');
  },
  urlEncode: encodeURIComponent,
  /**
   * Regular expression used within newlineToBr().
   * @type {RegExp}
   * @private
   */
  NEWLINE_TO_BR_RE_: /[\r\n]/
};


/**
 * Utility class to facilitate much faster string concatenation in IE,
 * using Array.join() rather than the '+' operator.  For other browsers
 * we simply use the '+' operator.
 *
 * @param {Object|number|string|boolean=} opt_a1 Optional first initial item
 *     to append.
 * @param {...Object|number|string|boolean} var_args Other initial items to
 *     append, e.g., new goog.string.StringBuffer('foo', 'bar').
 * @constructor
 */
goog.string.StringBuffer = function(opt_a1, var_args) {
  /**
   * Internal buffer for the string to be concatenated.
   * @type {string|Array}
   * @private
   */
  this.buffer_ = goog.userAgent.HAS_JSCRIPT ? [] : '';

  if (opt_a1 != null) {
    this.append.apply(this, arguments);
  }
};


/**
 * Length of internal buffer (faster than calling buffer_.length).
 * Only used for IE.
 * @type {number}
 * @private
 */
goog.string.StringBuffer.prototype.bufferLength_ = 0;

/**
 * Appends one or more items to the string.
 *
 * Calling this with null, undefined, or empty arguments is an error.
 *
 * @param {Object|number|string|boolean} a1 Required first string.
 * @param {Object|number|string|boolean=} opt_a2 Optional second string.
 * @param {...Object|number|string|boolean} var_args Other items to append,
 *     e.g., sb.append('foo', 'bar', 'baz').
 * @return {goog.string.StringBuffer} This same StringBuilder object.
 */
goog.string.StringBuffer.prototype.append = function(a1, opt_a2, var_args) {

  if (goog.userAgent.HAS_JSCRIPT) {
    if (opt_a2 == null) {  // no second argument (note: undefined == null)
      // Array assignment is 2x faster than Array push.  Also, use a1
      // directly to avoid arguments instantiation, another 2x improvement.
      this.buffer_[this.bufferLength_++] = a1;
    } else {
      var arr = /**@type {Array.<number|string|boolean>}*/this.buffer_;
      arr.push.apply(arr, arguments);
      this.bufferLength_ = this.buffer_.length;
    }

  } else {

    // Use a1 directly to avoid arguments instantiation for single-arg case.
    this.buffer_ += a1;
    if (opt_a2 != null) {  // no second argument (note: undefined == null)
      for (var i = 1; i < arguments.length; i++) {
        this.buffer_ += arguments[i];
      }
    }
  }

  return this;
};


/**
 * Clears the string.
 */
goog.string.StringBuffer.prototype.clear = function() {

  if (goog.userAgent.HAS_JSCRIPT) {
     this.buffer_.length = 0;  // reuse array to avoid creating new object
     this.bufferLength_ = 0;

   } else {
     this.buffer_ = '';
   }
};


/**
 * Returns the concatenated string.
 *
 * @return {string} The concatenated string.
 */
goog.string.StringBuffer.prototype.toString = function() {

  if (goog.userAgent.HAS_JSCRIPT) {
    var str = this.buffer_.join('');
    // Given a string with the entire contents, simplify the StringBuilder by
    // setting its contents to only be this string, rather than many fragments.
    this.clear();
    if (str) {
      this.append(str);
    }
    return str;

  } else {
    return /** @type {string} */ (this.buffer_);
  }
};


if (!goog.soy) goog.soy = {
  /**
   * Helper function to render a Soy template and then set the
   * output string as the innerHTML of an element. It is recommended
   * to use this helper function instead of directly setting
   * innerHTML in your hand-written code, so that it will be easier
   * to audit the code for cross-site scripting vulnerabilities.
   *
   * @param {Function} template The Soy template defining element's content.
   * @param {Object=} opt_templateData The data for the template.
   * @param {Object=} opt_injectedData The injected data for the template.
   * @param {(goog.dom.DomHelper|Document)=} opt_dom The context in which DOM
   *     nodes will be created.
   */
  renderAsElement: function(
    template, opt_templateData, opt_injectedData, opt_dom) {
    return /** @type {!Element} */ (soyshim.$$renderWithWrapper_(
        template, opt_templateData, opt_dom, true /* asElement */,
        opt_injectedData));
  },
  /**
   * Helper function to render a Soy template into a single node or
   * a document fragment. If the rendered HTML string represents a
   * single node, then that node is returned (note that this is
   * *not* a fragment, despite them name of the method). Otherwise a
   * document fragment is returned containing the rendered nodes.
   *
   * @param {Function} template The Soy template defining element's content.
   * @param {Object=} opt_templateData The data for the template.
   * @param {Object=} opt_injectedData The injected data for the template.
   * @param {(goog.dom.DomHelper|Document)=} opt_dom The context in which DOM
   *     nodes will be created.
   * @return {!Node} The resulting node or document fragment.
   */
  renderAsFragment: function(
    template, opt_templateData, opt_injectedData, opt_dom) {
    return soyshim.$$renderWithWrapper_(
        template, opt_templateData, opt_dom, false /* asElement */,
        opt_injectedData);
  },
  /**
   * Helper function to render a Soy template and then set the output string as
   * the innerHTML of an element. It is recommended to use this helper function
   * instead of directly setting innerHTML in your hand-written code, so that it
   * will be easier to audit the code for cross-site scripting vulnerabilities.
   *
   * NOTE: New code should consider using goog.soy.renderElement instead.
   *
   * @param {Element} element The element whose content we are rendering.
   * @param {Function} template The Soy template defining the element's content.
   * @param {Object=} opt_templateData The data for the template.
   * @param {Object=} opt_injectedData The injected data for the template.
   */
  renderElement: function(
      element, template, opt_templateData, opt_injectedData) {
    element.innerHTML = template(opt_templateData, null, opt_injectedData);
  }
};


var soy = { esc: {} };
var soydata = {};
var soyshim = { $$DEFAULT_TEMPLATE_DATA_: {} };
/**
 * Helper function to render a Soy template into a single node or a document
 * fragment. If the rendered HTML string represents a single node, then that
 * node is returned. Otherwise a document fragment is created and returned
 * (wrapped in a DIV element if #opt_singleNode is true).
 *
 * @param {Function} template The Soy template defining the element's content.
 * @param {Object=} opt_templateData The data for the template.
 * @param {(goog.dom.DomHelper|Document)=} opt_dom The context in which DOM
 *     nodes will be created.
 * @param {boolean=} opt_asElement Whether to wrap the fragment in an
 *     element if the template does not render a single element. If true,
 *     result is always an Element.
 * @param {Object=} opt_injectedData The injected data for the template.
 * @return {!Node} The resulting node or document fragment.
 * @private
 */
soyshim.$$renderWithWrapper_ = function(
    template, opt_templateData, opt_dom, opt_asElement, opt_injectedData) {

  var dom = opt_dom || document;
  var wrapper = dom.createElement('div');
  wrapper.innerHTML = template(
    opt_templateData || soyshim.$$DEFAULT_TEMPLATE_DATA_, undefined,
    opt_injectedData);

  // If the template renders as a single element, return it.
  if (wrapper.childNodes.length == 1) {
    var firstChild = wrapper.firstChild;
    if (!opt_asElement || firstChild.nodeType == 1 /* Element */) {
      return /** @type {!Node} */ (firstChild);
    }
  }

  // If we're forcing it to be a single element, return the wrapper DIV.
  if (opt_asElement) {
    return wrapper;
  }

  // Otherwise, create and return a fragment.
  var fragment = dom.createDocumentFragment();
  while (wrapper.firstChild) {
    fragment.appendChild(wrapper.firstChild);
  }
  return fragment;
};


/**
 * Returns a Unicode BiDi mark matching bidiGlobalDir (LRM or RLM) if the
 * directionality or the exit directionality of text are opposite to
 * bidiGlobalDir. Otherwise returns the empty string.
 * If opt_isHtml, makes sure to ignore the LTR nature of the mark-up and escapes
 * in text, making the logic suitable for HTML and HTML-escaped text.
 * @param {number} bidiGlobalDir The global directionality context: 1 if ltr, -1
 *     if rtl, 0 if unknown.
 * @param {number} dir text's directionality: 1 if ltr, -1 if rtl, 0 if unknown.
 * @param {string} text The text whose directionality is to be estimated.
 * @param {boolean=} opt_isHtml Whether text is HTML/HTML-escaped.
 *     Default: false.
 * @return {string} A Unicode bidi mark matching bidiGlobalDir, or
 *     the empty string when text's overall and exit directionalities both match
 *     bidiGlobalDir, or bidiGlobalDir is 0 (unknown).
 * @private
 */
soyshim.$$bidiMarkAfterKnownDir_ = function(
    bidiGlobalDir, dir, text, opt_isHtml) {
  return (
      bidiGlobalDir > 0 && (dir < 0 ||
          soyshim.$$bidiIsRtlExitText_(text, opt_isHtml)) ? '\u200E' : // LRM
      bidiGlobalDir < 0 && (dir > 0 ||
          soyshim.$$bidiIsLtrExitText_(text, opt_isHtml)) ? '\u200F' : // RLM
      '');
};


/**
 * Strips str of any HTML mark-up and escapes. Imprecise in several ways, but
 * precision is not very important, since the result is only meant to be used
 * for directionality detection.
 * @param {string} str The string to be stripped.
 * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
 *     Default: false.
 * @return {string} The stripped string.
 * @private
 */
soyshim.$$bidiStripHtmlIfNecessary_ = function(str, opt_isHtml) {
  return opt_isHtml ? str.replace(soyshim.$$BIDI_HTML_SKIP_RE_, ' ') : str;
};


/**
 * Simplified regular expression for am HTML tag (opening or closing) or an HTML
 * escape - the things we want to skip over in order to ignore their ltr
 * characters.
 * @type {RegExp}
 * @private
 */
soyshim.$$BIDI_HTML_SKIP_RE_ = /<[^>]*>|&[^;]+;/g;


/**
 * A practical pattern to identify strong LTR character. This pattern is not
 * theoretically correct according to unicode standard. It is simplified for
 * performance and small code size.
 * @type {string}
 * @private
 */
soyshim.$$bidiLtrChars_ =
    'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' +
    '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';


/**
 * A practical pattern to identify strong neutral and weak character. This
 * pattern is not theoretically correct according to unicode standard. It is
 * simplified for performance and small code size.
 * @type {string}
 * @private
 */
soyshim.$$bidiNeutralChars_ =
    '\u0000-\u0020!-@[-`{-\u00BF\u00D7\u00F7\u02B9-\u02FF\u2000-\u2BFF';


/**
 * A practical pattern to identify strong RTL character. This pattern is not
 * theoretically correct according to unicode standard. It is simplified for
 * performance and small code size.
 * @type {string}
 * @private
 */
soyshim.$$bidiRtlChars_ = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';


/**
 * Regular expressions to check if a piece of text is of RTL directionality
 * on first character with strong directionality.
 * @type {RegExp}
 * @private
 */
soyshim.$$bidiRtlDirCheckRe_ = new RegExp(
    '^[^' + soyshim.$$bidiLtrChars_ + ']*[' + soyshim.$$bidiRtlChars_ + ']');


/**
 * Regular expressions to check if a piece of text is of neutral directionality.
 * Url are considered as neutral.
 * @type {RegExp}
 * @private
 */
soyshim.$$bidiNeutralDirCheckRe_ = new RegExp(
    '^[' + soyshim.$$bidiNeutralChars_ + ']*$|^http://');


/**
 * Check the directionality of the a piece of text based on the first character
 * with strong directionality.
 * @param {string} str string being checked.
 * @return {boolean} return true if rtl directionality is being detected.
 * @private
 */
soyshim.$$bidiIsRtlText_ = function(str) {
  return soyshim.$$bidiRtlDirCheckRe_.test(str);
};


/**
 * Check the directionality of the a piece of text based on the first character
 * with strong directionality.
 * @param {string} str string being checked.
 * @return {boolean} true if all characters have neutral directionality.
 * @private
 */
soyshim.$$bidiIsNeutralText_ = function(str) {
  return soyshim.$$bidiNeutralDirCheckRe_.test(str);
};


/**
 * This constant controls threshold of rtl directionality.
 * @type {number}
 * @private
 */
soyshim.$$bidiRtlDetectionThreshold_ = 0.40;


/**
 * Returns the RTL ratio based on word count.
 * @param {string} str the string that need to be checked.
 * @return {number} the ratio of RTL words among all words with directionality.
 * @private
 */
soyshim.$$bidiRtlWordRatio_ = function(str) {
  var rtlCount = 0;
  var totalCount = 0;
  var tokens = str.split(' ');
  for (var i = 0; i < tokens.length; i++) {
    if (soyshim.$$bidiIsRtlText_(tokens[i])) {
      rtlCount++;
      totalCount++;
    } else if (!soyshim.$$bidiIsNeutralText_(tokens[i])) {
      totalCount++;
    }
  }

  return totalCount == 0 ? 0 : rtlCount / totalCount;
};


/**
 * Regular expressions to check if the last strongly-directional character in a
 * piece of text is LTR.
 * @type {RegExp}
 * @private
 */
soyshim.$$bidiLtrExitDirCheckRe_ = new RegExp(
    '[' + soyshim.$$bidiLtrChars_ + '][^' + soyshim.$$bidiRtlChars_ + ']*$');


/**
 * Regular expressions to check if the last strongly-directional character in a
 * piece of text is RTL.
 * @type {RegExp}
 * @private
 */
soyshim.$$bidiRtlExitDirCheckRe_ = new RegExp(
    '[' + soyshim.$$bidiRtlChars_ + '][^' + soyshim.$$bidiLtrChars_ + ']*$');


/**
 * Check if the exit directionality a piece of text is LTR, i.e. if the last
 * strongly-directional character in the string is LTR.
 * @param {string} str string being checked.
 * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
 *     Default: false.
 * @return {boolean} Whether LTR exit directionality was detected.
 * @private
 */
soyshim.$$bidiIsLtrExitText_ = function(str, opt_isHtml) {
  str = soyshim.$$bidiStripHtmlIfNecessary_(str, opt_isHtml);
  return soyshim.$$bidiLtrExitDirCheckRe_.test(str);
};


/**
 * Check if the exit directionality a piece of text is RTL, i.e. if the last
 * strongly-directional character in the string is RTL.
 * @param {string} str string being checked.
 * @param {boolean=} opt_isHtml Whether str is HTML / HTML-escaped.
 *     Default: false.
 * @return {boolean} Whether RTL exit directionality was detected.
 * @private
 */
soyshim.$$bidiIsRtlExitText_ = function(str, opt_isHtml) {
  str = soyshim.$$bidiStripHtmlIfNecessary_(str, opt_isHtml);
  return soyshim.$$bidiRtlExitDirCheckRe_.test(str);
};


// =============================================================================
// COPIED FROM soyutils_usegoog.js


// -----------------------------------------------------------------------------
// StringBuilder (compatible with the 'stringbuilder' code style).


/**
 * Utility class to facilitate much faster string concatenation in IE,
 * using Array.join() rather than the '+' operator.  For other browsers
 * we simply use the '+' operator.
 *
 * @param {Object} var_args Initial items to append,
 *     e.g., new soy.StringBuilder('foo', 'bar').
 * @constructor
 */
soy.StringBuilder = goog.string.StringBuffer;


// -----------------------------------------------------------------------------
// soydata: Defines typed strings, e.g. an HTML string {@code "a<b>c"} is
// semantically distinct from the plain text string {@code "a<b>c"} and smart
// templates can take that distinction into account.

/**
 * A type of textual content.
 * @enum {number}
 */
soydata.SanitizedContentKind = {

  /**
   * A snippet of HTML that does not start or end inside a tag, comment, entity,
   * or DOCTYPE; and that does not contain any executable code
   * (JS, {@code <object>}s, etc.) from a different trust domain.
   */
  HTML: 0,

  /**
   * A sequence of code units that can appear between quotes (either kind) in a
   * JS program without causing a parse error, and without causing any side
   * effects.
   * <p>
   * The content should not contain unescaped quotes, newlines, or anything else
   * that would cause parsing to fail or to cause a JS parser to finish the
   * string its parsing inside the content.
   * <p>
   * The content must also not end inside an escape sequence ; no partial octal
   * escape sequences or odd number of '{@code \}'s at the end.
   */
  JS_STR_CHARS: 1,

  /** A properly encoded portion of a URI. */
  URI: 2,

  /** An attribute name and value such as {@code dir="ltr"}. */
  HTML_ATTRIBUTE: 3
};


/**
 * A string-like object that carries a content-type.
 * @param {string} content
 * @constructor
 * @private
 */
soydata.SanitizedContent = function(content) {
  /**
   * The textual content.
   * @type {string}
   */
  this.content = content;
};

/** @type {soydata.SanitizedContentKind} */
soydata.SanitizedContent.prototype.contentKind;

/** @override */
soydata.SanitizedContent.prototype.toString = function() {
  return this.content;
};


/**
 * Content of type {@link soydata.SanitizedContentKind.HTML}.
 * @param {string} content A string of HTML that can safely be embedded in
 *     a PCDATA context in your app.  If you would be surprised to find that an
 *     HTML sanitizer produced {@code s} (e.g. it runs code or fetches bad URLs)
 *     and you wouldn't write a template that produces {@code s} on security or
 *     privacy grounds, then don't pass {@code s} here.
 * @constructor
 * @extends {soydata.SanitizedContent}
 */
soydata.SanitizedHtml = function(content) {
  soydata.SanitizedContent.call(this, content);
};
goog.inherits(soydata.SanitizedHtml, soydata.SanitizedContent);

/** @override */
soydata.SanitizedHtml.prototype.contentKind = soydata.SanitizedContentKind.HTML;


/**
 * Content of type {@link soydata.SanitizedContentKind.JS_STR_CHARS}.
 * @param {string} content A string of JS that when evaled, produces a
 *     value that does not depend on any sensitive data and has no side effects
 *     <b>OR</b> a string of JS that does not reference any variables or have
 *     any side effects not known statically to the app authors.
 * @constructor
 * @extends {soydata.SanitizedContent}
 */
soydata.SanitizedJsStrChars = function(content) {
  soydata.SanitizedContent.call(this, content);
};
goog.inherits(soydata.SanitizedJsStrChars, soydata.SanitizedContent);

/** @override */
soydata.SanitizedJsStrChars.prototype.contentKind =
    soydata.SanitizedContentKind.JS_STR_CHARS;


/**
 * Content of type {@link soydata.SanitizedContentKind.URI}.
 * @param {string} content A chunk of URI that the caller knows is safe to
 *     emit in a template.
 * @constructor
 * @extends {soydata.SanitizedContent}
 */
soydata.SanitizedUri = function(content) {
  soydata.SanitizedContent.call(this, content);
};
goog.inherits(soydata.SanitizedUri, soydata.SanitizedContent);

/** @override */
soydata.SanitizedUri.prototype.contentKind = soydata.SanitizedContentKind.URI;


/**
 * Content of type {@link soydata.SanitizedContentKind.HTML_ATTRIBUTE}.
 * @param {string} content An attribute name and value, such as
 *     {@code dir="ltr"}.
 * @constructor
 * @extends {soydata.SanitizedContent}
 */
soydata.SanitizedHtmlAttribute = function(content) {
  soydata.SanitizedContent.call(this, content);
};
goog.inherits(soydata.SanitizedHtmlAttribute, soydata.SanitizedContent);

/** @override */
soydata.SanitizedHtmlAttribute.prototype.contentKind =
    soydata.SanitizedContentKind.HTML_ATTRIBUTE;


// -----------------------------------------------------------------------------
// Public utilities.


/**
 * Helper function to render a Soy template and then set the output string as
 * the innerHTML of an element. It is recommended to use this helper function
 * instead of directly setting innerHTML in your hand-written code, so that it
 * will be easier to audit the code for cross-site scripting vulnerabilities.
 *
 * NOTE: New code should consider using goog.soy.renderElement instead.
 *
 * @param {Element} element The element whose content we are rendering.
 * @param {Function} template The Soy template defining the element's content.
 * @param {Object=} opt_templateData The data for the template.
 * @param {Object=} opt_injectedData The injected data for the template.
 */
soy.renderElement = goog.soy.renderElement;


/**
 * Helper function to render a Soy template into a single node or a document
 * fragment. If the rendered HTML string represents a single node, then that
 * node is returned (note that this is *not* a fragment, despite them name of
 * the method). Otherwise a document fragment is returned containing the
 * rendered nodes.
 *
 * NOTE: New code should consider using goog.soy.renderAsFragment
 * instead (note that the arguments are different).
 *
 * @param {Function} template The Soy template defining the element's content.
 * @param {Object=} opt_templateData The data for the template.
 * @param {Document=} opt_document The document used to create DOM nodes. If not
 *     specified, global document object is used.
 * @param {Object=} opt_injectedData The injected data for the template.
 * @return {!Node} The resulting node or document fragment.
 */
soy.renderAsFragment = function(
    template, opt_templateData, opt_document, opt_injectedData) {
  return goog.soy.renderAsFragment(
      template, opt_templateData, opt_injectedData,
      new goog.dom.DomHelper(opt_document));
};


/**
 * Helper function to render a Soy template into a single node. If the rendered
 * HTML string represents a single node, then that node is returned. Otherwise,
 * a DIV element is returned containing the rendered nodes.
 *
 * NOTE: New code should consider using goog.soy.renderAsElement
 * instead (note that the arguments are different).
 *
 * @param {Function} template The Soy template defining the element's content.
 * @param {Object=} opt_templateData The data for the template.
 * @param {Document=} opt_document The document used to create DOM nodes. If not
 *     specified, global document object is used.
 * @param {Object=} opt_injectedData The injected data for the template.
 * @return {!Element} Rendered template contents, wrapped in a parent DIV
 *     element if necessary.
 */
soy.renderAsElement = function(
    template, opt_templateData, opt_document, opt_injectedData) {
  return goog.soy.renderAsElement(
      template, opt_templateData, opt_injectedData,
      new goog.dom.DomHelper(opt_document));
};


// -----------------------------------------------------------------------------
// Below are private utilities to be used by Soy-generated code only.


/**
 * Builds an augmented data object to be passed when a template calls another,
 * and needs to pass both original data and additional params. The returned
 * object will contain both the original data and the additional params. If the
 * same key appears in both, then the value from the additional params will be
 * visible, while the value from the original data will be hidden. The original
 * data object will be used, but not modified.
 *
 * @param {!Object} origData The original data to pass.
 * @param {Object} additionalParams The additional params to pass.
 * @return {Object} An augmented data object containing both the original data
 *     and the additional params.
 */
soy.$$augmentData = function(origData, additionalParams) {

  // Create a new object whose '__proto__' field is set to origData.
  /** @constructor */
  function TempCtor() {}
  TempCtor.prototype = origData;
  var newData = new TempCtor();

  // Add the additional params to the new object.
  for (var key in additionalParams) {
    newData[key] = additionalParams[key];
  }

  return newData;
};


/**
 * Gets the keys in a map as an array. There are no guarantees on the order.
 * @param {Object} map The map to get the keys of.
 * @return {Array.<string>} The array of keys in the given map.
 */
soy.$$getMapKeys = function(map) {
  var mapKeys = [];
  for (var key in map) {
    mapKeys.push(key);
  }
  return mapKeys;
};


/**
 * Gets a consistent unique id for the given delegate template name. Two calls
 * to this function will return the same id if and only if the input names are
 * the same.
 *
 * <p> Important: This function must always be called with a string constant.
 *
 * <p> If Closure Compiler is not being used, then this is just this identity
 * function. If Closure Compiler is being used, then each call to this function
 * will be replaced with a short string constant, which will be consistent per
 * input name.
 *
 * @param {string} delTemplateName The delegate template name for which to get a
 *     consistent unique id.
 * @return {string} A unique id that is consistent per input name.
 *
 * @consistentIdGenerator
 */
soy.$$getDelegateId = function(delTemplateName) {
  return delTemplateName;
};


/**
 * Map from registered delegate template id/name to the priority of the
 * implementation.
 * @type {Object}
 * @private
 */
soy.$$DELEGATE_REGISTRY_PRIORITIES_ = {};

/**
 * Map from registered delegate template id/name to the implementation function.
 * @type {Object}
 * @private
 */
soy.$$DELEGATE_REGISTRY_FUNCTIONS_ = {};


/**
 * Registers a delegate implementation. If the same delegate template id/name
 * has been registered previously, then priority values are compared and only
 * the higher priority implementation is stored (if priorities are equal, an
 * error is thrown).
 *
 * @param {string} delTemplateId The delegate template id/name to register.
 * @param {number} delPriority The implementation's priority value.
 * @param {Function} delFn The implementation function.
 */
soy.$$registerDelegateFn = function(delTemplateId, delPriority, delFn) {
  var mapKey = 'key_' + delTemplateId;
  var currPriority = soy.$$DELEGATE_REGISTRY_PRIORITIES_[mapKey];
  if (currPriority === undefined || delPriority > currPriority) {
    // Registering new or higher-priority function: replace registry entry.
    soy.$$DELEGATE_REGISTRY_PRIORITIES_[mapKey] = delPriority;
    soy.$$DELEGATE_REGISTRY_FUNCTIONS_[mapKey] = delFn;
  } else if (delPriority == currPriority) {
    // Registering same-priority function: error.
    throw Error(
        'Encountered two active delegates with same priority (id/name "' +
        delTemplateId + '").');
  } else {
    // Registering lower-priority function: do nothing.
  }
};


/**
 * Retrieves the (highest-priority) implementation that has been registered for
 * a given delegate template id/name. If no implementation has been registered
 * for the id/name, then returns an implementation that is equivalent to an
 * empty template (i.e. rendered output would be empty string).
 *
 * @param {string} delTemplateId The delegate template id/name to get.
 * @return {Function} The retrieved implementation function.
 */
soy.$$getDelegateFn = function(delTemplateId) {
  var delFn = soy.$$DELEGATE_REGISTRY_FUNCTIONS_['key_' + delTemplateId];
  return delFn ? delFn : soy.$$EMPTY_TEMPLATE_FN_;
};


/**
 * Private helper soy.$$getDelegateFn(). This is the empty template function
 * that is returned whenever there's no delegate implementation found.
 *
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @param {Object.<string, *>=} opt_ijData
 * @return {string}
 * @private
 */
soy.$$EMPTY_TEMPLATE_FN_ = function(opt_data, opt_sb, opt_ijData) {
  return '';
};


// -----------------------------------------------------------------------------
// Escape/filter/normalize.


/**
 * Escapes HTML special characters in a string.  Escapes double quote '"' in
 * addition to '&', '<', and '>' so that a string can be included in an HTML
 * tag attribute value within double quotes.
 * Will emit known safe HTML as-is.
 *
 * @param {*} value The string-like value to be escaped.  May not be a string,
 *     but the value will be coerced to a string.
 * @return {string} An escaped version of value.
 */
soy.$$escapeHtml = function(value) {
  if (typeof value === 'object' && value &&
      value.contentKind === soydata.SanitizedContentKind.HTML) {
    return value.content;
  }
  return soy.esc.$$escapeHtmlHelper(value);
};


/**
 * Escapes HTML special characters in a string so that it can be embedded in
 * RCDATA.
 * <p>
 * Escapes HTML special characters so that the value will not prematurely end
 * the body of a tag like {@code <textarea>} or {@code <title>}.  RCDATA tags
 * cannot contain other HTML entities, so it is not strictly necessary to escape
 * HTML special characters except when part of that text looks like an HTML
 * entity or like a close tag : {@code </textarea>}.
 * <p>
 * Will normalize known safe HTML to make sure that sanitized HTML (which could
 * contain an innocuous {@code </textarea>} don't prematurely end an RCDATA
 * element.
 *
 * @param {*} value The string-like value to be escaped.  May not be a string,
 *     but the value will be coerced to a string.
 * @return {string} An escaped version of value.
 */
soy.$$escapeHtmlRcdata = function(value) {
  if (typeof value === 'object' && value &&
      value.contentKind === soydata.SanitizedContentKind.HTML) {
    return soy.esc.$$normalizeHtmlHelper(value.content);
  }
  return soy.esc.$$escapeHtmlHelper(value);
};


/**
 * Removes HTML tags from a string of known safe HTML so it can be used as an
 * attribute value.
 *
 * @param {*} value The HTML to be escaped.  May not be a string, but the
 *     value will be coerced to a string.
 * @return {string} A representation of value without tags, HTML comments, or
 *     other content.
 */
soy.$$stripHtmlTags = function(value) {
  return String(value).replace(soy.esc.$$HTML_TAG_REGEX_, '');
};


/**
 * Escapes HTML special characters in an HTML attribute value.
 *
 * @param {*} value The HTML to be escaped.  May not be a string, but the
 *     value will be coerced to a string.
 * @return {string} An escaped version of value.
 */
soy.$$escapeHtmlAttribute = function(value) {
  if (typeof value === 'object' && value &&
      value.contentKind === soydata.SanitizedContentKind.HTML) {
    return soy.esc.$$normalizeHtmlHelper(soy.$$stripHtmlTags(value.content));
  }
  return soy.esc.$$escapeHtmlHelper(value);
};


/**
 * Escapes HTML special characters in a string including space and other
 * characters that can end an unquoted HTML attribute value.
 *
 * @param {*} value The HTML to be escaped.  May not be a string, but the
 *     value will be coerced to a string.
 * @return {string} An escaped version of value.
 */
soy.$$escapeHtmlAttributeNospace = function(value) {
  if (typeof value === 'object' && value &&
      value.contentKind === soydata.SanitizedContentKind.HTML) {
    return soy.esc.$$normalizeHtmlNospaceHelper(
        soy.$$stripHtmlTags(value.content));
  }
  return soy.esc.$$escapeHtmlNospaceHelper(value);
};


/**
 * Filters out strings that cannot be a substring of a valid HTML attribute.
 *
 * @param {*} value The value to escape.  May not be a string, but the value
 *     will be coerced to a string.
 * @return {string} A valid HTML attribute name part or name/value pair.
 *     {@code "zSoyz"} if the input is invalid.
 */
soy.$$filterHtmlAttribute = function(value) {
  if (typeof value === 'object' && value &&
      value.contentKind === soydata.SanitizedContentKind.HTML_ATTRIBUTE) {
    return value.content.replace(/=([^"']*)$/, '="$1"');
  }
  return soy.esc.$$filterHtmlAttributeHelper(value);
};


/**
 * Filters out strings that cannot be a substring of a valid HTML element name.
 *
 * @param {*} value The value to escape.  May not be a string, but the value
 *     will be coerced to a string.
 * @return {string} A valid HTML element name part.
 *     {@code "zSoyz"} if the input is invalid.
 */
soy.$$filterHtmlElementName = function(value) {
  return soy.esc.$$filterHtmlElementNameHelper(value);
};


/**
 * Escapes characters in the value to make it valid content for a JS string
 * literal.
 *
 * @param {*} value The value to escape.  May not be a string, but the value
 *     will be coerced to a string.
 * @return {string} An escaped version of value.
 * @deprecated
 */
soy.$$escapeJs = function(value) {
  return soy.$$escapeJsString(value);
};


/**
 * Escapes characters in the value to make it valid content for a JS string
 * literal.
 *
 * @param {*} value The value to escape.  May not be a string, but the value
 *     will be coerced to a string.
 * @return {string} An escaped version of value.
 */
soy.$$escapeJsString = function(value) {
  if (typeof value === 'object' &&
      value.contentKind === soydata.SanitizedContentKind.JS_STR_CHARS) {
    return value.content;
  }
  return soy.esc.$$escapeJsStringHelper(value);
};


/**
 * Encodes a value as a JavaScript literal.
 *
 * @param {*} value The value to escape.  May not be a string, but the value
 *     will be coerced to a string.
 * @return {string} A JavaScript code representation of the input.
 */
soy.$$escapeJsValue = function(value) {
  // We surround values with spaces so that they can't be interpolated into
  // identifiers by accident.
  // We could use parentheses but those might be interpreted as a function call.
  if (value == null) {  // Intentionally matches undefined.
    // Java returns null from maps where there is no corresponding key while
    // JS returns undefined.
    // We always output null for compatibility with Java which does not have a
    // distinct undefined value.
    return ' null ';
  }
  switch (typeof value) {
    case 'boolean': case 'number':
      return ' ' + value + ' ';
    default:
      return "'" + soy.esc.$$escapeJsStringHelper(String(value)) + "'";
  }
};


/**
 * Escapes characters in the string to make it valid content for a JS regular
 * expression literal.
 *
 * @param {*} value The value to escape.  May not be a string, but the value
 *     will be coerced to a string.
 * @return {string} An escaped version of value.
 */
soy.$$escapeJsRegex = function(value) {
  return soy.esc.$$escapeJsRegexHelper(value);
};


/**
 * Matches all URI mark characters that conflict with HTML attribute delimiters
 * or that cannot appear in a CSS uri.
 * From <a href="http://www.w3.org/TR/CSS2/grammar.html">G.2: CSS grammar</a>
 * <pre>
 *     url        ([!#$%&*-~]|{nonascii}|{escape})*
 * </pre>
 *
 * @type {RegExp}
 * @private
 */
soy.$$problematicUriMarks_ = /['()]/g;

/**
 * @param {string} ch A single character in {@link soy.$$problematicUriMarks_}.
 * @return {string}
 * @private
 */
soy.$$pctEncode_ = function(ch) {
  return '%' + ch.charCodeAt(0).toString(16);
};

/**
 * Escapes a string so that it can be safely included in a URI.
 *
 * @param {*} value The value to escape.  May not be a string, but the value
 *     will be coerced to a string.
 * @return {string} An escaped version of value.
 */
soy.$$escapeUri = function(value) {
  if (typeof value === 'object' &&
      value.contentKind === soydata.SanitizedContentKind.URI) {
    return soy.$$normalizeUri(value);
  }
  // Apostophes and parentheses are not matched by encodeURIComponent.
  // They are technically special in URIs, but only appear in the obsolete mark
  // production in Appendix D.2 of RFC 3986, so can be encoded without changing
  // semantics.
  var encoded = soy.esc.$$escapeUriHelper(value);
  soy.$$problematicUriMarks_.lastIndex = 0;
  if (soy.$$problematicUriMarks_.test(encoded)) {
    return encoded.replace(soy.$$problematicUriMarks_, soy.$$pctEncode_);
  }
  return encoded;
};


/**
 * Removes rough edges from a URI by escaping any raw HTML/JS string delimiters.
 *
 * @param {*} value The value to escape.  May not be a string, but the value
 *     will be coerced to a string.
 * @return {string} An escaped version of value.
 */
soy.$$normalizeUri = function(value) {
  return soy.esc.$$normalizeUriHelper(value);
};


/**
 * Vets a URI's protocol and removes rough edges from a URI by escaping
 * any raw HTML/JS string delimiters.
 *
 * @param {*} value The value to escape.  May not be a string, but the value
 *     will be coerced to a string.
 * @return {string} An escaped version of value.
 */
soy.$$filterNormalizeUri = function(value) {
  return soy.esc.$$filterNormalizeUriHelper(value);
};


/**
 * Escapes a string so it can safely be included inside a quoted CSS string.
 *
 * @param {*} value The value to escape.  May not be a string, but the value
 *     will be coerced to a string.
 * @return {string} An escaped version of value.
 */
soy.$$escapeCssString = function(value) {
  return soy.esc.$$escapeCssStringHelper(value);
};


/**
 * Encodes a value as a CSS identifier part, keyword, or quantity.
 *
 * @param {*} value The value to escape.  May not be a string, but the value
 *     will be coerced to a string.
 * @return {string} A safe CSS identifier part, keyword, or quanitity.
 */
soy.$$filterCssValue = function(value) {
  // Uses == to intentionally match null and undefined for Java compatibility.
  if (value == null) {
    return '';
  }
  return soy.esc.$$filterCssValueHelper(value);
};


// -----------------------------------------------------------------------------
// Basic directives/functions.


/**
 * Converts \r\n, \r, and \n to <br>s
 * @param {*} str The string in which to convert newlines.
 * @return {string} A copy of {@code str} with converted newlines.
 */
soy.$$changeNewlineToBr = function(str) {
  return goog.string.newLineToBr(String(str), false);
};


/**
 * Inserts word breaks ('wbr' tags) into a HTML string at a given interval. The
 * counter is reset if a space is encountered. Word breaks aren't inserted into
 * HTML tags or entities. Entites count towards the character count; HTML tags
 * do not.
 *
 * @param {*} str The HTML string to insert word breaks into. Can be other
 *     types, but the value will be coerced to a string.
 * @param {number} maxCharsBetweenWordBreaks Maximum number of non-space
 *     characters to allow before adding a word break.
 * @return {string} The string including word breaks.
 */
soy.$$insertWordBreaks = function(str, maxCharsBetweenWordBreaks) {
  return goog.format.insertWordBreaks(String(str), maxCharsBetweenWordBreaks);
};


/**
 * Truncates a string to a given max length (if it's currently longer),
 * optionally adding ellipsis at the end.
 *
 * @param {*} str The string to truncate. Can be other types, but the value will
 *     be coerced to a string.
 * @param {number} maxLen The maximum length of the string after truncation
 *     (including ellipsis, if applicable).
 * @param {boolean} doAddEllipsis Whether to add ellipsis if the string needs
 *     truncation.
 * @return {string} The string after truncation.
 */
soy.$$truncate = function(str, maxLen, doAddEllipsis) {

  str = String(str);
  if (str.length <= maxLen) {
    return str;  // no need to truncate
  }

  // If doAddEllipsis, either reduce maxLen to compensate, or else if maxLen is
  // too small, just turn off doAddEllipsis.
  if (doAddEllipsis) {
    if (maxLen > 3) {
      maxLen -= 3;
    } else {
      doAddEllipsis = false;
    }
  }

  // Make sure truncating at maxLen doesn't cut up a unicode surrogate pair.
  if (soy.$$isHighSurrogate_(str.charAt(maxLen - 1)) &&
      soy.$$isLowSurrogate_(str.charAt(maxLen))) {
    maxLen -= 1;
  }

  // Truncate.
  str = str.substring(0, maxLen);

  // Add ellipsis.
  if (doAddEllipsis) {
    str += '...';
  }

  return str;
};

/**
 * Private helper for $$truncate() to check whether a char is a high surrogate.
 * @param {string} ch The char to check.
 * @return {boolean} Whether the given char is a unicode high surrogate.
 * @private
 */
soy.$$isHighSurrogate_ = function(ch) {
  return 0xD800 <= ch && ch <= 0xDBFF;
};

/**
 * Private helper for $$truncate() to check whether a char is a low surrogate.
 * @param {string} ch The char to check.
 * @return {boolean} Whether the given char is a unicode low surrogate.
 * @private
 */
soy.$$isLowSurrogate_ = function(ch) {
  return 0xDC00 <= ch && ch <= 0xDFFF;
};


// -----------------------------------------------------------------------------
// Bidi directives/functions.


/**
 * Cache of bidi formatter by context directionality, so we don't keep on
 * creating new objects.
 * @type {!Object.<!goog.i18n.BidiFormatter>}
 * @private
 */
soy.$$bidiFormatterCache_ = {};


/**
 * Returns cached bidi formatter for bidiGlobalDir, or creates a new one.
 * @param {number} bidiGlobalDir The global directionality context: 1 if ltr, -1
 *     if rtl, 0 if unknown.
 * @return {goog.i18n.BidiFormatter} A formatter for bidiGlobalDir.
 * @private
 */
soy.$$getBidiFormatterInstance_ = function(bidiGlobalDir) {
  return soy.$$bidiFormatterCache_[bidiGlobalDir] ||
         (soy.$$bidiFormatterCache_[bidiGlobalDir] =
             new goog.i18n.BidiFormatter(bidiGlobalDir));
};


/**
 * Estimate the overall directionality of text. If opt_isHtml, makes sure to
 * ignore the LTR nature of the mark-up and escapes in text, making the logic
 * suitable for HTML and HTML-escaped text.
 * @param {string} text The text whose directionality is to be estimated.
 * @param {boolean=} opt_isHtml Whether text is HTML/HTML-escaped.
 *     Default: false.
 * @return {number} 1 if text is LTR, -1 if it is RTL, and 0 if it is neutral.
 */
soy.$$bidiTextDir = function(text, opt_isHtml) {
  if (!text) {
    return 0;
  }
  return goog.i18n.bidi.detectRtlDirectionality(text, opt_isHtml) ? -1 : 1;
};


/**
 * Returns "dir=ltr" or "dir=rtl", depending on text's estimated
 * directionality, if it is not the same as bidiGlobalDir.
 * Otherwise, returns the empty string.
 * If opt_isHtml, makes sure to ignore the LTR nature of the mark-up and escapes
 * in text, making the logic suitable for HTML and HTML-escaped text.
 * @param {number} bidiGlobalDir The global directionality context: 1 if ltr, -1
 *     if rtl, 0 if unknown.
 * @param {string} text The text whose directionality is to be estimated.
 * @param {boolean=} opt_isHtml Whether text is HTML/HTML-escaped.
 *     Default: false.
 * @return {soydata.SanitizedHtmlAttribute} "dir=rtl" for RTL text in non-RTL
 *     context; "dir=ltr" for LTR text in non-LTR context;
 *     else, the empty string.
 */
soy.$$bidiDirAttr = function(bidiGlobalDir, text, opt_isHtml) {
  return new soydata.SanitizedHtmlAttribute(
      soy.$$getBidiFormatterInstance_(bidiGlobalDir).dirAttr(text, opt_isHtml));
};


/**
 * Returns a Unicode BiDi mark matching bidiGlobalDir (LRM or RLM) if the
 * directionality or the exit directionality of text are opposite to
 * bidiGlobalDir. Otherwise returns the empty string.
 * If opt_isHtml, makes sure to ignore the LTR nature of the mark-up and escapes
 * in text, making the logic suitable for HTML and HTML-escaped text.
 * @param {number} bidiGlobalDir The global directionality context: 1 if ltr, -1
 *     if rtl, 0 if unknown.
 * @param {string} text The text whose directionality is to be estimated.
 * @param {boolean=} opt_isHtml Whether text is HTML/HTML-escaped.
 *     Default: false.
 * @return {string} A Unicode bidi mark matching bidiGlobalDir, or the empty
 *     string when text's overall and exit directionalities both match
 *     bidiGlobalDir, or bidiGlobalDir is 0 (unknown).
 */
soy.$$bidiMarkAfter = function(bidiGlobalDir, text, opt_isHtml) {
  var formatter = soy.$$getBidiFormatterInstance_(bidiGlobalDir);
  return formatter.markAfter(text, opt_isHtml);
};


/**
 * Returns str wrapped in a <span dir=ltr|rtl> according to its directionality -
 * but only if that is neither neutral nor the same as the global context.
 * Otherwise, returns str unchanged.
 * Always treats str as HTML/HTML-escaped, i.e. ignores mark-up and escapes when
 * estimating str's directionality.
 * @param {number} bidiGlobalDir The global directionality context: 1 if ltr, -1
 *     if rtl, 0 if unknown.
 * @param {*} str The string to be wrapped. Can be other types, but the value
 *     will be coerced to a string.
 * @return {string} The wrapped string.
 */
soy.$$bidiSpanWrap = function(bidiGlobalDir, str) {
  var formatter = soy.$$getBidiFormatterInstance_(bidiGlobalDir);
  return formatter.spanWrap(str + '', true);
};


/**
 * Returns str wrapped in Unicode BiDi formatting characters according to its
 * directionality, i.e. either LRE or RLE at the beginning and PDF at the end -
 * but only if str's directionality is neither neutral nor the same as the
 * global context. Otherwise, returns str unchanged.
 * Always treats str as HTML/HTML-escaped, i.e. ignores mark-up and escapes when
 * estimating str's directionality.
 * @param {number} bidiGlobalDir The global directionality context: 1 if ltr, -1
 *     if rtl, 0 if unknown.
 * @param {*} str The string to be wrapped. Can be other types, but the value
 *     will be coerced to a string.
 * @return {string} The wrapped string.
 */
soy.$$bidiUnicodeWrap = function(bidiGlobalDir, str) {
  var formatter = soy.$$getBidiFormatterInstance_(bidiGlobalDir);
  return formatter.unicodeWrap(str + '', true);
};


// -----------------------------------------------------------------------------
// Generated code.




// START GENERATED CODE FOR ESCAPERS.

/**
 * @type {function (*) : string}
 */
soy.esc.$$escapeUriHelper = function(v) {
  return encodeURIComponent(String(v));
};

/**
 * Maps charcters to the escaped versions for the named escape directives.
 * @type {Object.<string, string>}
 * @private
 */
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = {
  '\x00': '\x26#0;',
  '\x22': '\x26quot;',
  '\x26': '\x26amp;',
  '\x27': '\x26#39;',
  '\x3c': '\x26lt;',
  '\x3e': '\x26gt;',
  '\x09': '\x26#9;',
  '\x0a': '\x26#10;',
  '\x0b': '\x26#11;',
  '\x0c': '\x26#12;',
  '\x0d': '\x26#13;',
  ' ': '\x26#32;',
  '-': '\x26#45;',
  '\/': '\x26#47;',
  '\x3d': '\x26#61;',
  '`': '\x26#96;',
  '\x85': '\x26#133;',
  '\xa0': '\x26#160;',
  '\u2028': '\x26#8232;',
  '\u2029': '\x26#8233;'
};

/**
 * A function that can be used with String.replace..
 * @param {string} ch A single character matched by a compatible matcher.
 * @return {string} A token in the output language.
 * @private
 */
soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = function(ch) {
  return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_[ch];
};

/**
 * Maps charcters to the escaped versions for the named escape directives.
 * @type {Object.<string, string>}
 * @private
 */
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = {
  '\x00': '\\x00',
  '\x08': '\\x08',
  '\x09': '\\t',
  '\x0a': '\\n',
  '\x0b': '\\x0b',
  '\x0c': '\\f',
  '\x0d': '\\r',
  '\x22': '\\x22',
  '\x26': '\\x26',
  '\x27': '\\x27',
  '\/': '\\\/',
  '\x3c': '\\x3c',
  '\x3d': '\\x3d',
  '\x3e': '\\x3e',
  '\\': '\\\\',
  '\x85': '\\x85',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
  '$': '\\x24',
  '(': '\\x28',
  ')': '\\x29',
  '*': '\\x2a',
  '+': '\\x2b',
  ',': '\\x2c',
  '-': '\\x2d',
  '.': '\\x2e',
  ':': '\\x3a',
  '?': '\\x3f',
  '[': '\\x5b',
  ']': '\\x5d',
  '^': '\\x5e',
  '{': '\\x7b',
  '|': '\\x7c',
  '}': '\\x7d'
};

/**
 * A function that can be used with String.replace..
 * @param {string} ch A single character matched by a compatible matcher.
 * @return {string} A token in the output language.
 * @private
 */
soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = function(ch) {
  return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_[ch];
};

/**
 * Maps charcters to the escaped versions for the named escape directives.
 * @type {Object.<string, string>}
 * @private
 */
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_ = {
  '\x00': '\\0 ',
  '\x08': '\\8 ',
  '\x09': '\\9 ',
  '\x0a': '\\a ',
  '\x0b': '\\b ',
  '\x0c': '\\c ',
  '\x0d': '\\d ',
  '\x22': '\\22 ',
  '\x26': '\\26 ',
  '\x27': '\\27 ',
  '(': '\\28 ',
  ')': '\\29 ',
  '*': '\\2a ',
  '\/': '\\2f ',
  ':': '\\3a ',
  ';': '\\3b ',
  '\x3c': '\\3c ',
  '\x3d': '\\3d ',
  '\x3e': '\\3e ',
  '@': '\\40 ',
  '\\': '\\5c ',
  '{': '\\7b ',
  '}': '\\7d ',
  '\x85': '\\85 ',
  '\xa0': '\\a0 ',
  '\u2028': '\\2028 ',
  '\u2029': '\\2029 '
};

/**
 * A function that can be used with String.replace..
 * @param {string} ch A single character matched by a compatible matcher.
 * @return {string} A token in the output language.
 * @private
 */
soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_ = function(ch) {
  return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_[ch];
};

/**
 * Maps charcters to the escaped versions for the named escape directives.
 * @type {Object.<string, string>}
 * @private
 */
soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = {
  '\x00': '%00',
  '\x01': '%01',
  '\x02': '%02',
  '\x03': '%03',
  '\x04': '%04',
  '\x05': '%05',
  '\x06': '%06',
  '\x07': '%07',
  '\x08': '%08',
  '\x09': '%09',
  '\x0a': '%0A',
  '\x0b': '%0B',
  '\x0c': '%0C',
  '\x0d': '%0D',
  '\x0e': '%0E',
  '\x0f': '%0F',
  '\x10': '%10',
  '\x11': '%11',
  '\x12': '%12',
  '\x13': '%13',
  '\x14': '%14',
  '\x15': '%15',
  '\x16': '%16',
  '\x17': '%17',
  '\x18': '%18',
  '\x19': '%19',
  '\x1a': '%1A',
  '\x1b': '%1B',
  '\x1c': '%1C',
  '\x1d': '%1D',
  '\x1e': '%1E',
  '\x1f': '%1F',
  ' ': '%20',
  '\x22': '%22',
  '\x27': '%27',
  '(': '%28',
  ')': '%29',
  '\x3c': '%3C',
  '\x3e': '%3E',
  '\\': '%5C',
  '{': '%7B',
  '}': '%7D',
  '\x7f': '%7F',
  '\x85': '%C2%85',
  '\xa0': '%C2%A0',
  '\u2028': '%E2%80%A8',
  '\u2029': '%E2%80%A9',
  '\uff01': '%EF%BC%81',
  '\uff03': '%EF%BC%83',
  '\uff04': '%EF%BC%84',
  '\uff06': '%EF%BC%86',
  '\uff07': '%EF%BC%87',
  '\uff08': '%EF%BC%88',
  '\uff09': '%EF%BC%89',
  '\uff0a': '%EF%BC%8A',
  '\uff0b': '%EF%BC%8B',
  '\uff0c': '%EF%BC%8C',
  '\uff0f': '%EF%BC%8F',
  '\uff1a': '%EF%BC%9A',
  '\uff1b': '%EF%BC%9B',
  '\uff1d': '%EF%BC%9D',
  '\uff1f': '%EF%BC%9F',
  '\uff20': '%EF%BC%A0',
  '\uff3b': '%EF%BC%BB',
  '\uff3d': '%EF%BC%BD'
};

/**
 * A function that can be used with String.replace..
 * @param {string} ch A single character matched by a compatible matcher.
 * @return {string} A token in the output language.
 * @private
 */
soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = function(ch) {
  return soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_[ch];
};

/**
 * Matches characters that need to be escaped for the named directives.
 * @type RegExp
 * @private
 */
soy.esc.$$MATCHER_FOR_ESCAPE_HTML_ = /[\x00\x22\x26\x27\x3c\x3e]/g;

/**
 * Matches characters that need to be escaped for the named directives.
 * @type RegExp
 * @private
 */
soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_ = /[\x00\x22\x27\x3c\x3e]/g;

/**
 * Matches characters that need to be escaped for the named directives.
 * @type RegExp
 * @private
 */
soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x26\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;

/**
 * Matches characters that need to be escaped for the named directives.
 * @type RegExp
 * @private
 */
soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;

/**
 * Matches characters that need to be escaped for the named directives.
 * @type RegExp
 * @private
 */
soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_ = /[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g;

/**
 * Matches characters that need to be escaped for the named directives.
 * @type RegExp
 * @private
 */
soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_ = /[\x00\x08-\x0d\x22\x24\x26-\/\x3a\x3c-\x3f\x5b-\x5e\x7b-\x7d\x85\u2028\u2029]/g;

/**
 * Matches characters that need to be escaped for the named directives.
 * @type RegExp
 * @private
 */
soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_ = /[\x00\x08-\x0d\x22\x26-\x2a\/\x3a-\x3e@\\\x7b\x7d\x85\xa0\u2028\u2029]/g;

/**
 * Matches characters that need to be escaped for the named directives.
 * @type RegExp
 * @private
 */
soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g;

/**
 * A pattern that vets values produced by the named directives.
 * @type RegExp
 * @private
 */
soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_ = /^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i;

/**
 * A pattern that vets values produced by the named directives.
 * @type RegExp
 * @private
 */
soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_ = /^(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i;

/**
 * A pattern that vets values produced by the named directives.
 * @type RegExp
 * @private
 */
soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTE_ = /^(?!style|on|action|archive|background|cite|classid|codebase|data|dsync|href|longdesc|src|usemap)(?:[a-z0-9_$:-]*)$/i;

/**
 * A pattern that vets values produced by the named directives.
 * @type RegExp
 * @private
 */
soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_ = /^(?!script|style|title|textarea|xmp|no)[a-z0-9_$:-]*$/i;

/**
 * A helper for the Soy directive |escapeHtml
 * @param {*} value Can be of any type but will be coerced to a string.
 * @return {string} The escaped text.
 */
soy.esc.$$escapeHtmlHelper = function(value) {
  var str = String(value);
  return str.replace(
      soy.esc.$$MATCHER_FOR_ESCAPE_HTML_,
      soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);
};

/**
 * A helper for the Soy directive |normalizeHtml
 * @param {*} value Can be of any type but will be coerced to a string.
 * @return {string} The escaped text.
 */
soy.esc.$$normalizeHtmlHelper = function(value) {
  var str = String(value);
  return str.replace(
      soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_,
      soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);
};

/**
 * A helper for the Soy directive |escapeHtmlNospace
 * @param {*} value Can be of any type but will be coerced to a string.
 * @return {string} The escaped text.
 */
soy.esc.$$escapeHtmlNospaceHelper = function(value) {
  var str = String(value);
  return str.replace(
      soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_,
      soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);
};

/**
 * A helper for the Soy directive |normalizeHtmlNospace
 * @param {*} value Can be of any type but will be coerced to a string.
 * @return {string} The escaped text.
 */
soy.esc.$$normalizeHtmlNospaceHelper = function(value) {
  var str = String(value);
  return str.replace(
      soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_,
      soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);
};

/**
 * A helper for the Soy directive |escapeJsString
 * @param {*} value Can be of any type but will be coerced to a string.
 * @return {string} The escaped text.
 */
soy.esc.$$escapeJsStringHelper = function(value) {
  var str = String(value);
  return str.replace(
      soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_,
      soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_);
};

/**
 * A helper for the Soy directive |escapeJsRegex
 * @param {*} value Can be of any type but will be coerced to a string.
 * @return {string} The escaped text.
 */
soy.esc.$$escapeJsRegexHelper = function(value) {
  var str = String(value);
  return str.replace(
      soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_,
      soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_);
};

/**
 * A helper for the Soy directive |escapeCssString
 * @param {*} value Can be of any type but will be coerced to a string.
 * @return {string} The escaped text.
 */
soy.esc.$$escapeCssStringHelper = function(value) {
  var str = String(value);
  return str.replace(
      soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_,
      soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_);
};

/**
 * A helper for the Soy directive |filterCssValue
 * @param {*} value Can be of any type but will be coerced to a string.
 * @return {string} The escaped text.
 */
soy.esc.$$filterCssValueHelper = function(value) {
  var str = String(value);
  if (!soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_.test(str)) {
    return 'zSoyz';
  }
  return str;
};

/**
 * A helper for the Soy directive |normalizeUri
 * @param {*} value Can be of any type but will be coerced to a string.
 * @return {string} The escaped text.
 */
soy.esc.$$normalizeUriHelper = function(value) {
  var str = String(value);
  return str.replace(
      soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_,
      soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_);
};

/**
 * A helper for the Soy directive |filterNormalizeUri
 * @param {*} value Can be of any type but will be coerced to a string.
 * @return {string} The escaped text.
 */
soy.esc.$$filterNormalizeUriHelper = function(value) {
  var str = String(value);
  if (!soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_.test(str)) {
    return 'zSoyz';
  }
  return str.replace(
      soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_,
      soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_);
};

/**
 * A helper for the Soy directive |filterHtmlAttribute
 * @param {*} value Can be of any type but will be coerced to a string.
 * @return {string} The escaped text.
 */
soy.esc.$$filterHtmlAttributeHelper = function(value) {
  var str = String(value);
  if (!soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTE_.test(str)) {
    return 'zSoyz';
  }
  return str;
};

/**
 * A helper for the Soy directive |filterHtmlElementName
 * @param {*} value Can be of any type but will be coerced to a string.
 * @return {string} The escaped text.
 */
soy.esc.$$filterHtmlElementNameHelper = function(value) {
  var str = String(value);
  if (!soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_.test(str)) {
    return 'zSoyz';
  }
  return str;
};

/**
 * Matches all tags, HTML comments, and DOCTYPEs in tag soup HTML.
 *
 * @type {RegExp}
 * @private
 */
soy.esc.$$HTML_TAG_REGEX_ = /<(?:!|\/?[a-zA-Z])(?:[^>'"]|"[^"]*"|'[^']*')*>/g;

// END GENERATED CODE
;
// This file was automatically generated from atlassian.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }


aui.renderExtraAttributes = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data != null && opt_data.extraAttributes) {
    if (Object.prototype.toString.call(opt_data.extraAttributes) === '[object Object]') {
      var attrList7 = soy.$$getMapKeys(opt_data.extraAttributes);
      var attrListLen7 = attrList7.length;
      for (var attrIndex7 = 0; attrIndex7 < attrListLen7; attrIndex7++) {
        var attrData7 = attrList7[attrIndex7];
        output.append(' ', soy.$$escapeHtml(attrData7), '="', soy.$$escapeHtml(opt_data.extraAttributes[attrData7]), '"');
      }
    } else {
      output.append(' ', opt_data.extraAttributes);
    }
  }
  return opt_sb ? '' : output.toString();
};


aui.renderExtraClasses = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data != null && opt_data.extraClasses) {
    if ((opt_data.extraClasses) instanceof Array) {
      var classList23 = opt_data.extraClasses;
      var classListLen23 = classList23.length;
      for (var classIndex23 = 0; classIndex23 < classListLen23; classIndex23++) {
        var classData23 = classList23[classIndex23];
        output.append(' ', soy.$$escapeHtml(classData23));
      }
    } else {
      output.append(' ', soy.$$escapeHtml(opt_data.extraClasses));
    }
  }
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from badges.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.badges == 'undefined') { aui.badges = {}; }


aui.badges.badge = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-badge');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', soy.$$escapeHtml(opt_data.text), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), '>');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from buttons.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.buttons == 'undefined') { aui.buttons = {}; }


aui.buttons.button = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.href) {
    output.append('<a href="', soy.$$escapeHtml(opt_data.href), '"');
    aui.buttons.buttonAttributes(soy.$$augmentData(opt_data, {tagName: 'a'}), output, opt_ijData);
    output.append('>');
    aui.buttons.buttonIcon(opt_data, output, opt_ijData);
    output.append((opt_data.hasLabel) ? '<span class="aui-button-label">' : '', soy.$$escapeHtml(opt_data.text), (opt_data.hasLabel) ? '</span>' : '', '</a>');
  } else if (opt_data.tagName == 'input') {
    output.append('<input type="', soy.$$escapeHtml(opt_data.inputType ? opt_data.inputType : 'button'), '" ');
    aui.buttons.buttonAttributes(opt_data, output, opt_ijData);
    output.append(' value="', soy.$$escapeHtml(opt_data.text), '" />');
  } else {
    output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'button'));
    aui.buttons.buttonAttributes(soy.$$augmentData(opt_data, {tagName: opt_data.tagName ? opt_data.tagName : 'button'}), output, opt_ijData);
    output.append('>');
    aui.buttons.buttonIcon(opt_data, output, opt_ijData);
    output.append((opt_data.hasLabel) ? '<span class="aui-button-label">' : '', soy.$$escapeHtml(opt_data.text), (opt_data.hasLabel) ? '</span>' : '', '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'button'), '>');
  }
  return opt_sb ? '' : output.toString();
};


aui.buttons.buttons = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-buttons');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</div>');
  return opt_sb ? '' : output.toString();
};


aui.buttons.buttonAttributes = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-button', (opt_data.splitButtonType == 'main') ? ' aui-button-split-main' : '', (opt_data.dropdown2Target) ? ' aui-dropdown2-trigger' + ((opt_data.splitButtonType == 'more') ? ' aui-button-split-more' : '') : '');
  switch (opt_data.type) {
    case 'primary':
      output.append(' aui-button-primary');
      break;
    case 'link':
      output.append(' aui-button-link');
      break;
    case 'subtle':
      output.append(' aui-button-subtle');
      break;
  }
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append((opt_data.isPressed) ? ' aria-pressed="' + soy.$$escapeHtml(opt_data.isPressed) + '"' : '', (opt_data.isDisabled) ? ' aria-disabled="' + soy.$$escapeHtml(opt_data.isDisabled) + '"' + ((opt_data.isDisabled == true) ? (opt_data.tagName == 'button' || opt_data.tagName == 'input') ? ' disabled="disabled" ' : '' : '') : '', (opt_data.dropdown2Target) ? ' aria-owns="' + soy.$$escapeHtml(opt_data.dropdown2Target) + '" aria-haspopup="true"' : '', (opt_data.tagName == 'a') ? ' tabindex="0"' : '');
  return opt_sb ? '' : output.toString();
};


aui.buttons.buttonIcon = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.iconType) ? '<span class="' + ((opt_data.iconType == 'aui') ? 'aui-icon' : '') + ((opt_data.iconClass) ? ' ' + soy.$$escapeHtml(opt_data.iconClass) : '') + '">' + ((opt_data.iconText) ? soy.$$escapeHtml(opt_data.iconText) + ' ' : '') + '</span>' : '');
  return opt_sb ? '' : output.toString();
};


aui.buttons.splitButton = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.buttons.button(soy.$$augmentData(opt_data.splitButtonMain, {splitButtonType: 'main'}), output, opt_ijData);
  aui.buttons.button(soy.$$augmentData(opt_data.splitButtonMore, {splitButtonType: 'more'}), output, opt_ijData);
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from dialog2.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.dialog == 'undefined') { aui.dialog = {}; }


aui.dialog.dialog2 = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  var param231 = new soy.StringBuilder();
  aui.dialog.dialog2Content(opt_data, param231, opt_ijData);
  aui.dialog.dialog2Chrome({id: opt_data.id, titleId: opt_data.id ? opt_data.id + '-dialog-title' : null, modal: opt_data.modal, tagName: opt_data.tagName, removeOnHide: opt_data.removeOnHide, visible: opt_data.visible, size: opt_data.size, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, content: param231.toString()}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.dialog.dialog2Chrome = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', (opt_data.titleId) ? ' aria-labelledby="' + soy.$$escapeHtml(opt_data.titleId) + '"' : '', ' role="dialog" class=" aui-layer aui-dialog2 aui-dialog2-', soy.$$escapeHtml(opt_data.size ? opt_data.size : 'medium'));
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"', (opt_data.modal) ? 'data-aui-modal="true"' : '', (opt_data.removeOnHide) ? 'data-aui-remove-on-hide="true"' : '', (opt_data.visible != true) ? 'aria-hidden="true"' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', (opt_data.content) ? opt_data.content : '', '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section'), '>');
  return opt_sb ? '' : output.toString();
};


aui.dialog.dialog2Content = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.dialog.dialog2Header({titleId: opt_data.id ? opt_data.id + '-dialog-title' : null, titleText: opt_data.titleText, titleContent: opt_data.titleContent, actionContent: opt_data.headerActionContent, secondaryContent: opt_data.headerSecondaryContent, modal: opt_data.modal}, output, opt_ijData);
  aui.dialog.dialog2Panel(opt_data, output, opt_ijData);
  aui.dialog.dialog2Footer({hintText: opt_data.footerHintText, hintContent: opt_data.footerHintContent, actionContent: opt_data.footerActionContent}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.dialog.dialog2Header = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<header', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-dialog2-header');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('><h2 ', (opt_data.titleId) ? ' id="' + soy.$$escapeHtml(opt_data.titleId) + '"' : '', ' class="aui-dialog2-header-main">', (opt_data.titleText) ? soy.$$escapeHtml(opt_data.titleText) : '', (opt_data.titleContent) ? opt_data.titleContent : '', '</h2>', (opt_data.actionContent) ? '<div class="aui-dialog2-header-actions">' + opt_data.actionContent + '</div>' : '', (opt_data.secondaryContent) ? '<div class="aui-dialog2-header-secondary">' + opt_data.secondaryContent + '</div>' : '', (opt_data.modal != true) ? '<a class="aui-dialog2-header-close"><span class="aui-icon aui-icon-small aui-iconfont-close-dialog">' + soy.$$escapeHtml("Close") + '</span></a>' : '', '</header>');
  return opt_sb ? '' : output.toString();
};


aui.dialog.dialog2Footer = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<footer', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-dialog2-footer');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', (opt_data.actionContent) ? '<div class="aui-dialog2-footer-actions">' + opt_data.actionContent + '</div>' : '', (opt_data.hintText || opt_data.hintContent) ? '<div class="aui-dialog2-footer-hint">' + ((opt_data.hintText) ? soy.$$escapeHtml(opt_data.hintText) : '') + ((opt_data.hintContent) ? opt_data.hintContent : '') + '</div>' : '', '</footer>');
  return opt_sb ? '' : output.toString();
};


aui.dialog.dialog2Panel = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-dialog2-content');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', (opt_data.content) ? opt_data.content : '', '</div>');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from dropdown.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.dropdown == 'undefined') { aui.dropdown = {}; }


aui.dropdown.trigger = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<a', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-dd-trigger');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('><span class="dropdown-text">', (opt_data.accessibilityText) ? soy.$$escapeHtml(opt_data.accessibilityText) : '', '</span>', (! (opt_data.showIcon == false)) ? '<span class="icon icon-dropdown"></span>' : '', '</a>');
  return opt_sb ? '' : output.toString();
};


aui.dropdown.menu = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'ul'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-dropdown hidden');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'ul'), '>');
  return opt_sb ? '' : output.toString();
};


aui.dropdown.parent = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-dd-parent');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
  return opt_sb ? '' : output.toString();
};


aui.dropdown.item = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'li'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="dropdown-item');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('><a href="', soy.$$escapeHtml(opt_data.url ? opt_data.url : '#'), '">', soy.$$escapeHtml(opt_data.text), '</a></', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'li'), '>');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from dropdown2.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.dropdown2 == 'undefined') { aui.dropdown2 = {}; }


aui.dropdown2.dropdown2 = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.dropdown2.trigger(soy.$$augmentData(opt_data.trigger, {menu: opt_data.menu}), output, opt_ijData);
  aui.dropdown2.contents(opt_data.menu, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.dropdown2.trigger = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'a'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-dropdown2-trigger');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('" aria-owns="', soy.$$escapeHtml(opt_data.menu.id), '" aria-haspopup="true"', (opt_data.title) ? ' title="' + soy.$$escapeHtml(opt_data.title) + '"' : '', (opt_data.container) ? ' data-container="' + soy.$$escapeHtml(opt_data.container) + '"' : '', ((! opt_data.tagName || opt_data.tagName == 'a') && (! opt_data.extraAttributes || Object.prototype.toString.call(opt_data.extraAttributes) === '[object Object]' && ! opt_data.extraAttributes.href && ! opt_data.extraAttributes.tabindex)) ? ' tabindex="0"' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', (opt_data.content) ? opt_data.content : '', (opt_data.text) ? soy.$$escapeHtml(opt_data.text) : '', (! (opt_data.showIcon == false)) ? '<span class="icon ' + soy.$$escapeHtml(opt_data.iconClasses ? opt_data.iconClasses : 'aui-icon-dropdown') + '">' + ((opt_data.iconText) ? soy.$$escapeHtml(opt_data.iconText) : '') + '</span>' : '', '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'a'), '>');
  return opt_sb ? '' : output.toString();
};


aui.dropdown2.contents = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="aui-dropdown2');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', (opt_data.content) ? opt_data.content : '', '</div>');
  return opt_sb ? '' : output.toString();
};


aui.dropdown2.section = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-dropdown2-section');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', (opt_data.label) ? '<strong>' + soy.$$escapeHtml(opt_data.label) + '</strong>' : '', opt_data.content, '</div>');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from expander.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.expander == 'undefined') { aui.expander = {}; }


aui.expander.content = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-expander-content');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append((opt_data.initiallyExpanded) ? ' aria-expanded="' + soy.$$escapeHtml(opt_data.initiallyExpanded) + '"' : '', '>', (opt_data.content) ? opt_data.content : '', '</div>');
  return opt_sb ? '' : output.toString();
};


aui.expander.trigger = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tag ? opt_data.tag : 'div'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', (opt_data.replaceText) ? ' data-replace-text="' + soy.$$escapeHtml(opt_data.replaceText) + '"' : '', (opt_data.replaceSelector) ? ' data-replace-selector="' + soy.$$escapeHtml(opt_data.replaceSelector) + '"' : '', ' class="aui-expander-trigger');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append(' aria-controls="', soy.$$escapeHtml(opt_data.contentId), '"', (opt_data.collapsible) ? ' data-collapsible="' + soy.$$escapeHtml(opt_data.collapsible) + '"' : '', '>', (opt_data.content) ? opt_data.content : '', '</', soy.$$escapeHtml(opt_data.tag ? opt_data.tag : 'div'), '>');
  return opt_sb ? '' : output.toString();
};


aui.expander.revealText = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  var param608 = new soy.StringBuilder(soy.$$escapeHtml(opt_data.contentContent));
  aui.expander.trigger({id: opt_data.triggerId, contentId: opt_data.contentId, tag: 'a', content: '<span class=\'reveal-text-trigger-text\'>Show more</span>', replaceSelector: '.reveal-text-trigger-text', replaceText: 'Show less', extraAttributes: opt_data.triggerExtraAttributes, extraClasses: ((opt_data.triggerExtraClasses) ? soy.$$escapeHtml(opt_data.triggerExtraClasses) + '  ' : '') + ' aui-expander-reveal-text'}, param608, opt_ijData);
  aui.expander.content({id: opt_data.contentId, content: param608.toString(), extraAttributes: opt_data.contentExtraAttributes, extraClasses: opt_data.contentExtraClasses}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from form.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.form == 'undefined') { aui.form = {}; }


aui.form.form = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<form', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui', (opt_data.isUnsectioned) ? ' unsectioned' : '', (opt_data.isLongLabels) ? ' long-label' : '', (opt_data.isTopLabels) ? ' top-label' : '');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('" action="', soy.$$escapeHtml(opt_data.action), '" method="', soy.$$escapeHtml(opt_data.method ? opt_data.method : 'post'), '"', (opt_data.enctype) ? ' enctype="' + soy.$$escapeHtml(opt_data.enctype) + '"' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</form>');
  return opt_sb ? '' : output.toString();
};


aui.form.formDescription = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="field-group');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</div>');
  return opt_sb ? '' : output.toString();
};


aui.form.fieldset = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  var hasClass__soy678 = opt_data.isInline || opt_data.isDateSelect || opt_data.isGroup || opt_data.extraClasses;
  output.append('<fieldset', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
  if (hasClass__soy678) {
    output.append(' class="', soy.$$escapeHtml(opt_data.isInline ? 'inline' : opt_data.isDateSelect ? 'date-select' : opt_data.isGroup ? 'group' : ''));
    aui.renderExtraClasses(opt_data, output, opt_ijData);
    output.append('"');
  }
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('><legend><span>', opt_data.legendContent, '</span></legend>', opt_data.content, '</fieldset>');
  return opt_sb ? '' : output.toString();
};


aui.form.fieldGroup = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="field-group');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</div>');
  return opt_sb ? '' : output.toString();
};


aui.form.buttons = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="buttons-container', (opt_data.alignment) ? ' ' + soy.$$escapeHtml(opt_data.alignment) : '');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('><div class="buttons">', opt_data.content, '</div></div>');
  return opt_sb ? '' : output.toString();
};


aui.form.label = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<label', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', (opt_data.forField) ? ' for="' + soy.$$escapeHtml(opt_data.forField) + '"' : '');
  if (opt_data.extraClasses) {
    output.append(' class="');
    aui.renderExtraClasses(opt_data, output, opt_ijData);
    output.append('"');
  }
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, (opt_data.isRequired) ? '<span class="aui-icon icon-required"></span>' : '', '</label>');
  return opt_sb ? '' : output.toString();
};


aui.form.input = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<input', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="', soy.$$escapeHtml(opt_data.type == 'password' ? 'text' : opt_data.type == 'submit' ? 'button' : opt_data.type));
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append((opt_data.icon && (opt_data.type == 'text' || opt_data.type == 'password')) ? ' aui-field-has-icon ' : '', '" type="', soy.$$escapeHtml(opt_data.type), '" name="', (opt_data.name) ? soy.$$escapeHtml(opt_data.name) : soy.$$escapeHtml(opt_data.id), '"', (opt_data.value) ? ' value="' + soy.$$escapeHtml(opt_data.value) + '"' : '', ((opt_data.type == 'checkbox' || opt_data.type == 'radio') && opt_data.isChecked) ? ' checked="checked"' : '', (opt_data.type == 'text' && opt_data.maxLength) ? ' maxlength="' + soy.$$escapeHtml(opt_data.maxLength) + '"' : '', (opt_data.type == 'text' && opt_data.size) ? ' size="' + soy.$$escapeHtml(opt_data.size) + '"' : '', ((opt_data.type == 'text' || opt_data.type == 'password') && opt_data.autocomplete) ? ' autocomplete="' + soy.$$escapeHtml(opt_data.autocomplete) + '"' : '', (opt_data.isDisabled) ? ' disabled' : '', (opt_data.isAutofocus) ? ' autofocus' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  aui.form.renderValidationArguments(opt_data, output, opt_ijData);
  aui.form.renderTooltipArguments(opt_data, output, opt_ijData);
  output.append('/>');
  if (opt_data.icon && (opt_data.type == 'text' || opt_data.type == 'password')) {
    aui.icons.icon({icon: opt_data.icon, useIconFont: true, size: 'small'}, output, opt_ijData);
  }
  return opt_sb ? '' : output.toString();
};


aui.form.renderValidationArguments = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.validationArguments) {
    var argumentList816 = soy.$$getMapKeys(opt_data.validationArguments);
    var argumentListLen816 = argumentList816.length;
    for (var argumentIndex816 = 0; argumentIndex816 < argumentListLen816; argumentIndex816++) {
      var argumentData816 = argumentList816[argumentIndex816];
      output.append(' ', soy.$$escapeHtml('data-aui-validate-' + argumentData816), '="', soy.$$escapeHtml(opt_data.validationArguments[argumentData816]), '"');
    }
    output.append(' data-aui-field');
  }
  return opt_sb ? '' : output.toString();
};


aui.form.renderTooltipArguments = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.tooltipArguments) {
    var argumentList828 = soy.$$getMapKeys(opt_data.tooltipArguments);
    var argumentListLen828 = argumentList828.length;
    for (var argumentIndex828 = 0; argumentIndex828 < argumentListLen828; argumentIndex828++) {
      var argumentData828 = argumentList828[argumentIndex828];
      output.append(' ', soy.$$escapeHtml('data-aui-form-notification-' + argumentData828), '="', soy.$$escapeHtml(opt_data.tooltipArguments[argumentData828]), '"');
    }
  }
  return opt_sb ? '' : output.toString();
};


aui.form.submit = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  var param850 = new soy.StringBuilder((opt_data.name) ? 'name="' + soy.$$escapeHtml(opt_data.name) + '"' : '');
  aui.renderExtraAttributes(opt_data, param850, opt_ijData);
  aui.buttons.button({id: opt_data.id, tagName: 'input', inputType: 'submit', text: opt_data.text, type: opt_data.type, href: opt_data.href, isDisabled: opt_data.isDisabled, isPressed: opt_data.isPressed, iconType: opt_data.iconType, iconText: opt_data.iconText, iconClass: opt_data.iconClass, dropdown2Target: opt_data.dropdown2Target, splitButtonType: opt_data.splitButtonType, extraClasses: opt_data.extraClasses, extraAttributes: param850.toString()}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.form.button = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  var param874 = new soy.StringBuilder((opt_data.name) ? 'name="' + soy.$$escapeHtml(opt_data.name) + '"' : '');
  aui.renderExtraAttributes(opt_data, param874, opt_ijData);
  aui.buttons.button({id: opt_data.id, tagName: opt_data.tagName, inputType: opt_data.inputType, text: opt_data.text, type: opt_data.type, href: opt_data.href, isDisabled: opt_data.isDisabled, isPressed: opt_data.isPressed, iconType: opt_data.iconType, iconText: opt_data.iconText, iconClass: opt_data.iconClass, dropdown2Target: opt_data.dropdown2Target, splitButtonType: opt_data.splitButtonType, extraClasses: opt_data.extraClasses, extraAttributes: param874.toString()}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.form.linkButton = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  var param897 = new soy.StringBuilder('cancel');
  aui.renderExtraClasses(opt_data, param897, opt_ijData);
  var param901 = new soy.StringBuilder((opt_data.name) ? 'name="' + soy.$$escapeHtml(opt_data.name) + '"' : '');
  aui.renderExtraAttributes(opt_data, param901, opt_ijData);
  aui.buttons.button({id: opt_data.id, tagName: 'a', inputType: opt_data.inputType, text: opt_data.text, type: 'link', href: opt_data.href ? opt_data.href : opt_data.url, isDisabled: opt_data.isDisabled, isPressed: opt_data.isPressed, iconType: opt_data.iconType, iconText: opt_data.iconText, iconClass: opt_data.iconClass, dropdown2Target: opt_data.dropdown2Target, splitButtonType: opt_data.splitButtonType, extraClasses: param897.toString(), extraAttributes: param901.toString()}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.form.textarea = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<textarea', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' name="', (opt_data.name) ? soy.$$escapeHtml(opt_data.name) : soy.$$escapeHtml(opt_data.id), '" class="textarea');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append(' ', (opt_data.icon) ? 'aui-field-has-icon' : '', '"', (opt_data.rows) ? ' rows="' + soy.$$escapeHtml(opt_data.rows) + '"' : '', (opt_data.cols) ? ' cols="' + soy.$$escapeHtml(opt_data.cols) + '"' : '', (opt_data.autocomplete) ? ' autocomplete="' + soy.$$escapeHtml(opt_data.autocomplete) + '"' : '', (opt_data.isDisabled) ? ' disabled' : '', (opt_data.isAutofocus) ? ' autofocus' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  aui.form.renderValidationArguments(opt_data, output, opt_ijData);
  aui.form.renderTooltipArguments(opt_data, output, opt_ijData);
  output.append('>', (opt_data.value) ? soy.$$escapeHtml(opt_data.value) : '', '</textarea>');
  if (opt_data.icon) {
    aui.icons.icon({icon: opt_data.icon, useIconFont: true, size: 'small'}, output, opt_ijData);
  }
  return opt_sb ? '' : output.toString();
};


aui.form.select = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<select', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' name="', (opt_data.name) ? soy.$$escapeHtml(opt_data.name) : soy.$$escapeHtml(opt_data.id), '" class="', soy.$$escapeHtml(opt_data.isMultiple ? 'multi-select' : 'select'));
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"', (opt_data.size) ? ' size="' + soy.$$escapeHtml(opt_data.size) + '"' : '', (opt_data.isDisabled) ? ' disabled' : '', (opt_data.isAutofocus) ? ' autofocus' : '', (opt_data.isMultiple) ? ' multiple' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  aui.form.renderValidationArguments(opt_data, output, opt_ijData);
  aui.form.renderTooltipArguments(opt_data, output, opt_ijData);
  output.append('>');
  var optionList1000 = opt_data.options;
  var optionListLen1000 = optionList1000.length;
  for (var optionIndex1000 = 0; optionIndex1000 < optionListLen1000; optionIndex1000++) {
    var optionData1000 = optionList1000[optionIndex1000];
    aui.form.optionOrOptgroup(soy.$$augmentData(optionData1000, {defaultValue: opt_data.value}), output, opt_ijData);
  }
  output.append('</select>');
  return opt_sb ? '' : output.toString();
};


aui.form.optionOrOptgroup = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.options) {
    output.append('<optgroup label="', soy.$$escapeHtml(opt_data.text), '"', (opt_data.disabled) ? ' disabled' : '', '>');
    var optionList1015 = opt_data.options;
    var optionListLen1015 = optionList1015.length;
    for (var optionIndex1015 = 0; optionIndex1015 < optionListLen1015; optionIndex1015++) {
      var optionData1015 = optionList1015[optionIndex1015];
      aui.form.optionOrOptgroup(soy.$$augmentData(optionData1015, {defaultValue: opt_data.defaultValue}), output, opt_ijData);
    }
    output.append('</optgroup>');
  } else {
    output.append('<option value="', soy.$$escapeHtml(opt_data.value), '"', (opt_data.selected || opt_data.defaultValue == opt_data.value) ? ' selected' : '', (opt_data.disabled) ? ' disabled' : '', '>', soy.$$escapeHtml(opt_data.text), '</option>');
  }
  return opt_sb ? '' : output.toString();
};


aui.form.value = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="field-value');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</span>');
  return opt_sb ? '' : output.toString();
};


aui.form.field = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  var isCheckboxOrRadio__soy1049 = opt_data.type == 'checkbox' || opt_data.type == 'radio';
  var fieldWidthClass__soy1050 = opt_data.fieldWidth ? opt_data.fieldWidth + '-field' : '';
  output.append('<div class="', (isCheckboxOrRadio__soy1049) ? soy.$$escapeHtml(opt_data.type) : 'field-group');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>');
  if (opt_data.labelContent && ! isCheckboxOrRadio__soy1049) {
    aui.form.label({forField: opt_data.id, isRequired: opt_data.isRequired, content: opt_data.labelContent}, output, opt_ijData);
  }
  switch (opt_data.type) {
    case 'textarea':
      aui.form.textarea({id: opt_data.id, name: opt_data.name, value: opt_data.value, rows: opt_data.rows, cols: opt_data.cols, autocomplete: opt_data.autocomplete, isDisabled: opt_data.isDisabled ? true : false, isAutofocus: opt_data.isAutofocus, extraClasses: fieldWidthClass__soy1050, icon: opt_data.icon, validationArguments: opt_data.validationArguments, tooltipArguments: opt_data.tooltipArguments}, output, opt_ijData);
      break;
    case 'select':
      aui.form.select({id: opt_data.id, name: opt_data.name, value: opt_data.value, options: opt_data.options, isMultiple: opt_data.isMultiple, size: opt_data.size, isDisabled: opt_data.isDisabled ? true : false, isAutofocus: opt_data.isAutofocus, extraClasses: fieldWidthClass__soy1050, validationArguments: opt_data.validationArguments, tooltipArguments: opt_data.tooltipArguments}, output, opt_ijData);
      break;
    case 'value':
      aui.form.value({id: opt_data.id, content: soy.$$escapeHtml(opt_data.value)}, output, opt_ijData);
      break;
    case 'text':
    case 'password':
    case 'file':
    case 'radio':
    case 'checkbox':
    case 'button':
    case 'submit':
    case 'reset':
      aui.form.input({id: opt_data.id, name: opt_data.name, type: opt_data.type, value: opt_data.value, maxLength: opt_data.maxLength, size: opt_data.size, autocomplete: opt_data.autocomplete, isChecked: opt_data.isChecked, isDisabled: opt_data.isDisabled ? true : false, isAutofocus: opt_data.isAutofocus, extraClasses: fieldWidthClass__soy1050, icon: opt_data.icon, validationArguments: opt_data.validationArguments, tooltipArguments: opt_data.tooltipArguments}, output, opt_ijData);
      break;
  }
  if (opt_data.labelContent && isCheckboxOrRadio__soy1049) {
    aui.form.label({forField: opt_data.id, isRequired: opt_data.isRequired, content: opt_data.labelContent}, output, opt_ijData);
  }
  if (opt_data.descriptionText || opt_data.descriptionContent) {
    aui.form.fieldDescription({text: opt_data.descriptionText, content: opt_data.descriptionContent}, output, opt_ijData);
  }
  if (opt_data.errorTexts) {
    var errorList1130 = opt_data.errorTexts;
    var errorListLen1130 = errorList1130.length;
    for (var errorIndex1130 = 0; errorIndex1130 < errorListLen1130; errorIndex1130++) {
      var errorData1130 = errorList1130[errorIndex1130];
      aui.form.fieldError({message: errorData1130}, output, opt_ijData);
    }
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


aui.form.fieldError = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="error');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('">', soy.$$escapeHtml(opt_data.message), '</div>');
  return opt_sb ? '' : output.toString();
};


aui.form.fieldDescription = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="description');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('">', (opt_data.text) ? soy.$$escapeHtml(opt_data.text) : (opt_data.message) ? soy.$$escapeHtml(opt_data.message) : opt_data.content, '</div>');
  return opt_sb ? '' : output.toString();
};


aui.form.textField = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.form.field({id: opt_data.id, name: opt_data.name, type: 'text', labelContent: opt_data.labelContent, value: opt_data.value, maxLength: opt_data.maxLength, size: opt_data.size, autocomplete: opt_data.autocomplete, isRequired: opt_data.isRequired, isDisabled: opt_data.isDisabled, isAutofocus: opt_data.isAutofocus, descriptionText: opt_data.descriptionText, descriptionContent: opt_data.descriptionContent, errorTexts: opt_data.errorTexts, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, fieldWidth: opt_data.fieldWidth, validationArguments: opt_data.validationArguments, tooltipArguments: opt_data.tooltipArguments}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.form.textareaField = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.form.field({id: opt_data.id, name: opt_data.name, type: 'textarea', labelContent: opt_data.labelContent, value: opt_data.value, rows: opt_data.rows, cols: opt_data.cols, autocomplete: opt_data.autocomplete, isRequired: opt_data.isRequired, isDisabled: opt_data.isDisabled, isAutofocus: opt_data.isAutofocus, descriptionText: opt_data.descriptionText, descriptionContent: opt_data.descriptionContent, errorTexts: opt_data.errorTexts, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, fieldWidth: opt_data.fieldWidth, validationArguments: opt_data.validationArguments, tooltipArguments: opt_data.tooltipArguments}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.form.passwordField = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.form.field({id: opt_data.id, name: opt_data.name, type: 'password', labelContent: opt_data.labelContent, value: opt_data.value, autocomplete: opt_data.autocomplete, isRequired: opt_data.isRequired, isDisabled: opt_data.isDisabled, isAutofocus: opt_data.isAutofocus, descriptionText: opt_data.descriptionText, descriptionContent: opt_data.descriptionContent, errorTexts: opt_data.errorTexts, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, fieldWidth: opt_data.fieldWidth, validationArguments: opt_data.validationArguments, tooltipArguments: opt_data.tooltipArguments}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.form.fileField = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.form.field({id: opt_data.id, name: opt_data.name, type: 'file', labelContent: opt_data.labelContent, value: opt_data.value, isRequired: opt_data.isRequired, isDisabled: opt_data.isDisabled, isAutofocus: opt_data.isAutofocus, descriptionText: opt_data.descriptionText, descriptionContent: opt_data.descriptionContent, errorTexts: opt_data.errorTexts, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, validationArguments: opt_data.validationArguments, tooltipArguments: opt_data.tooltipArguments}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.form.selectField = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.form.field({id: opt_data.id, name: opt_data.name, type: 'select', value: opt_data.value, labelContent: opt_data.labelContent, options: opt_data.options, isMultiple: opt_data.isMultiple, size: opt_data.size, isRequired: opt_data.isRequired, isDisabled: opt_data.isDisabled, isAutofocus: opt_data.isAutofocus, descriptionText: opt_data.descriptionText, descriptionContent: opt_data.descriptionContent, errorTexts: opt_data.errorTexts, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, fieldWidth: opt_data.fieldWidth, validationArguments: opt_data.validationArguments, tooltipArguments: opt_data.tooltipArguments}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.form.checkboxField = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  var param1259 = new soy.StringBuilder((opt_data.isMatrix) ? '<div class="matrix">' : '');
  var fieldList1263 = opt_data.fields;
  var fieldListLen1263 = fieldList1263.length;
  for (var fieldIndex1263 = 0; fieldIndex1263 < fieldListLen1263; fieldIndex1263++) {
    var fieldData1263 = fieldList1263[fieldIndex1263];
    aui.form.field(soy.$$augmentData(fieldData1263, {type: 'checkbox', labelContent: soy.$$escapeHtml(fieldData1263.labelText)}), param1259, opt_ijData);
  }
  param1259.append((opt_data.isMatrix) ? '</div>' : '');
  if (opt_data.descriptionText || opt_data.descriptionContent || opt_data.errorTexts && opt_data.errorTexts.length) {
    aui.form.field({descriptionText: opt_data.descriptionText, descriptionContent: opt_data.descriptionContent, errorTexts: opt_data.errorTexts, isDisabled: false}, param1259, opt_ijData);
  }
  aui.form.fieldset({legendContent: opt_data.legendContent + (opt_data.isRequired ? '<span class="aui-icon icon-required"></span>' : ''), isGroup: true, id: opt_data.id, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, content: param1259.toString()}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.form.radioField = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  var param1286 = new soy.StringBuilder((opt_data.isMatrix) ? '<div class="matrix">' : '');
  var fieldList1290 = opt_data.fields;
  var fieldListLen1290 = fieldList1290.length;
  for (var fieldIndex1290 = 0; fieldIndex1290 < fieldListLen1290; fieldIndex1290++) {
    var fieldData1290 = fieldList1290[fieldIndex1290];
    aui.form.field(soy.$$augmentData(fieldData1290, {type: 'radio', name: opt_data.name ? opt_data.name : opt_data.id, labelContent: soy.$$escapeHtml(fieldData1290.labelText)}), param1286, opt_ijData);
  }
  param1286.append((opt_data.isMatrix) ? '</div>' : '');
  if (opt_data.descriptionText || opt_data.descriptionContent || opt_data.errorTexts && opt_data.errorTexts.length) {
    aui.form.field({descriptionText: opt_data.descriptionText, descriptionContent: opt_data.descriptionContent, errorTexts: opt_data.errorTexts, isDisabled: false}, param1286, opt_ijData);
  }
  aui.form.fieldset({legendContent: opt_data.legendContent + (opt_data.isRequired ? '<span class="aui-icon icon-required"></span>' : ''), isGroup: true, id: opt_data.id, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, content: param1286.toString()}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.form.valueField = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.form.field({id: opt_data.id, type: 'value', value: opt_data.value, labelContent: opt_data.labelContent, isRequired: opt_data.isRequired, descriptionText: opt_data.descriptionText, descriptionContent: opt_data.descriptionContent, errorTexts: opt_data.errorTexts, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from group.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.group == 'undefined') { aui.group = {}; }


aui.group.group = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-group', (opt_data.isSplit) ? ' aui-group-split' : '');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
  return opt_sb ? '' : output.toString();
};


aui.group.item = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-item');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from icons.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.icons == 'undefined') { aui.icons = {}; }


aui.icons.icon = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-icon', (opt_data.useIconFont) ? ' aui-icon-' + soy.$$escapeHtml(opt_data.size ? opt_data.size : 'small') : '', ' aui', soy.$$escapeHtml(opt_data.useIconFont ? '-iconfont' : '-icon'), soy.$$escapeHtml(opt_data.iconFontSet ? '-' + opt_data.iconFontSet : ''), '-', soy.$$escapeHtml(opt_data.icon));
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', (opt_data.accessibilityText) ? soy.$$escapeHtml(opt_data.accessibilityText) : '', '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), '>');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from lozenges.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.lozenges == 'undefined') { aui.lozenges = {}; }


aui.lozenges.lozenge = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', (opt_data.title) ? ' title="' + soy.$$escapeHtml(opt_data.title) + '"' : '', ' class="aui-lozenge', soy.$$escapeHtml(opt_data.type ? ' aui-lozenge-' + opt_data.type : ''), soy.$$escapeHtml(opt_data.isSubtle ? ' aui-lozenge-subtle' : ''));
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', (opt_data.maxLength) ? soy.$$truncate(soy.$$escapeHtml(opt_data.text), opt_data.maxLength, true) : soy.$$escapeHtml(opt_data.text), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), '>');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from labels.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.labels == 'undefined') { aui.labels = {}; }


aui.labels.label = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.url && opt_data.isCloseable == true) {
    output.append('<span', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-label aui-label-closeable aui-label-split');
    aui.renderExtraClasses(opt_data, output, opt_ijData);
    output.append('"');
    aui.renderExtraAttributes(opt_data, output, opt_ijData);
    output.append('><a class="aui-label-split-main" href="', soy.$$escapeHtml(opt_data.url), '">', soy.$$escapeHtml(opt_data.text), '</a><span class="aui-label-split-close" >');
    aui.labels.closeIcon(opt_data, output, opt_ijData);
    output.append('</span></span>');
  } else {
    output.append('<', soy.$$escapeHtml(opt_data.url ? 'a' : 'span'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-label', (opt_data.isCloseable) ? ' aui-label-closeable' : '');
    aui.renderExtraClasses(opt_data, output, opt_ijData);
    output.append('"');
    aui.renderExtraAttributes(opt_data, output, opt_ijData);
    output.append((opt_data.url) ? ' href="' + soy.$$escapeHtml(opt_data.url) + '"' : '', '>', soy.$$escapeHtml(opt_data.text));
    if (opt_data.isCloseable) {
      aui.labels.closeIcon(opt_data, output, opt_ijData);
    }
    output.append('</', soy.$$escapeHtml(opt_data.url ? 'a' : 'span'), '>');
  }
  return opt_sb ? '' : output.toString();
};


aui.labels.closeIcon = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span tabindex="0" class="aui-icon aui-icon-close"');
  if (opt_data.hasTitle != false) {
    output.append(' title="');
    aui.labels.closeIconText(opt_data, output, opt_ijData);
    output.append('"');
  }
  output.append('>');
  aui.labels.closeIconText(opt_data, output, opt_ijData);
  output.append('</span>');
  return opt_sb ? '' : output.toString();
};


aui.labels.closeIconText = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.closeIconText) ? soy.$$escapeHtml(opt_data.closeIconText) : '(' + soy.$$escapeHtml("Remove") + ' ' + soy.$$escapeHtml(opt_data.text) + ')');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from message.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.message == 'undefined') { aui.message = {}; }


aui.message.info = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.message.message(soy.$$augmentData(opt_data, {type: 'aui-message-info info'}), output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.message.warning = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.message.message(soy.$$augmentData(opt_data, {type: 'aui-message-warning warning'}), output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.message.error = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.message.message(soy.$$augmentData(opt_data, {type: 'aui-message-error error'}), output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.message.success = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.message.message(soy.$$augmentData(opt_data, {type: 'aui-message-success success'}), output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.message.hint = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.message.message(soy.$$augmentData(opt_data, {type: 'aui-message-hint hint'}), output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.message.generic = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.message.message(soy.$$augmentData(opt_data, {type: 'aui-message-generic generic'}), output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.message.message = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-message ', soy.$$escapeHtml(opt_data.type ? opt_data.type : 'aui-message-generic generic'), (opt_data.isCloseable) ? ' closeable' : '', (opt_data.isShadowed) ? ' shadowed' : '');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', (opt_data.titleContent) ? '<p class="title"><strong>' + opt_data.titleContent + '</strong></p>' : '', opt_data.content, (opt_data.isCloseable) ? '<span class="aui-icon icon-close" role="button" tabindex="0"></span>' : '', '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from page.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.page == 'undefined') { aui.page = {}; }


aui.page.document = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<!DOCTYPE html><html lang="', soy.$$escapeHtml(opt_ijData.language ? opt_ijData.language : 'en'), '">');
  aui.page.documentHTMLContent(opt_data, output, opt_ijData);
  output.append('</html>');
  return opt_sb ? '' : output.toString();
};


aui.page.documentHTMLContent = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>', soy.$$escapeHtml(opt_data.windowTitle), '</title>', (opt_data.headContent) ? opt_data.headContent : '', '</head><body');
  if (opt_data.pageType) {
    if (opt_data.pageType == 'generic') {
      if (opt_data.extraClasses) {
        output.append(' class="');
        aui.renderExtraClasses(opt_data, output, opt_ijData);
        output.append('"');
      }
    } else if (opt_data.pageType == 'focused') {
      output.append(' class="aui-page-focused aui-page-focused-', soy.$$escapeHtml(opt_data.focusedPageSize ? opt_data.focusedPageSize : 'xlarge'));
      aui.renderExtraClasses(opt_data, output, opt_ijData);
      output.append('"');
    } else if (opt_data.pageType == 'sidebar') {
      output.append(' class="aui-page-sidebar', soy.$$escapeHtml(opt_data.sidebarState ? ' aui-sidebar-' + opt_data.sidebarState : ''));
      aui.renderExtraClasses(opt_data, output, opt_ijData);
      output.append('"');
    } else {
      output.append(' class="aui-page-', soy.$$escapeHtml(opt_data.pageType));
      aui.renderExtraClasses(opt_data, output, opt_ijData);
      output.append('"');
    }
  } else {
    output.append(' class="');
    aui.renderExtraClasses(opt_data, output, opt_ijData);
    output.append('"');
  }
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</body>');
  return opt_sb ? '' : output.toString();
};


aui.page.page = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="page"><header id="header" role="banner">', opt_data.headerContent, '</header><!-- #header --><section id="content" role="main">', opt_data.contentContent, '</section><!-- #content --><footer id="footer" role="contentinfo">', opt_data.footerContent, '</footer><!-- #footer --></div><!-- #page -->');
  return opt_sb ? '' : output.toString();
};


aui.page.header = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<nav', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-header aui-dropdown2-trigger-group');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append(' role="navigation"><div class="aui-header-inner">', (opt_data.headerBeforeContent) ? '<div class="aui-header-before">' + opt_data.headerBeforeContent + '</div>' : '', '<div class="aui-header-primary"><h1 id="logo" class="aui-header-logo', (opt_data.headerLogoImageUrl) ? ' aui-header-logo-custom' : (opt_data.logo) ? ' aui-header-logo-' + soy.$$escapeHtml(opt_data.logo) : '', '"><a href="', soy.$$escapeHtml(opt_data.headerLink ? opt_data.headerLink : '/'), '">', (opt_data.headerLogoImageUrl) ? '<img src="' + soy.$$escapeHtml(opt_data.headerLogoImageUrl) + '" alt="' + soy.$$escapeHtml(opt_data.headerLogoText) + '" />' : '<span class="aui-header-logo-device">' + soy.$$escapeHtml(opt_data.headerLogoText ? opt_data.headerLogoText : '') + '</span>', (opt_data.headerText) ? '<span class="aui-header-logo-text">' + soy.$$escapeHtml(opt_data.headerText) + '</span>' : '', '</a></h1>', (opt_data.primaryNavContent) ? opt_data.primaryNavContent : '', '</div>', (opt_data.secondaryNavContent) ? '<div class="aui-header-secondary">' + opt_data.secondaryNavContent + '</div>' : '', (opt_data.headerAfterContent) ? '<div class="aui-header-after">' + opt_data.headerAfterContent + '</div>' : '', '</div><!-- .aui-header-inner--></nav><!-- .aui-header -->');
  return opt_sb ? '' : output.toString();
};


aui.page.pagePanel = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), ' class="aui-page-panel');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('><div class="aui-page-panel-inner">', opt_data.content, '</div><!-- .aui-page-panel-inner --></', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '><!-- .aui-page-panel -->');
  return opt_sb ? '' : output.toString();
};


aui.page.pagePanelNav = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), ' class="aui-page-panel-nav');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '><!-- .aui-page-panel-nav -->');
  return opt_sb ? '' : output.toString();
};


aui.page.pagePanelContent = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section'), ' class="aui-page-panel-content');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section'), '><!-- .aui-page-panel-content -->');
  return opt_sb ? '' : output.toString();
};


aui.page.pagePanelSidebar = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'aside'), ' class="aui-page-panel-sidebar');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'aside'), '><!-- .aui-page-panel-sidebar -->');
  return opt_sb ? '' : output.toString();
};


aui.page.pagePanelItem = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section'), ' class="aui-page-panel-item');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section'), '><!-- .aui-page-panel-item -->');
  return opt_sb ? '' : output.toString();
};


aui.page.pageHeader = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<header class="aui-page-header');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('><div class="aui-page-header-inner">', opt_data.content, '</div><!-- .aui-page-header-inner --></header><!-- .aui-page-header -->');
  return opt_sb ? '' : output.toString();
};


aui.page.pageHeaderImage = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="aui-page-header-image');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</div><!-- .aui-page-header-image -->');
  return opt_sb ? '' : output.toString();
};


aui.page.pageHeaderMain = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="aui-page-header-main');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</div><!-- .aui-page-header-main -->');
  return opt_sb ? '' : output.toString();
};


aui.page.pageHeaderActions = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="aui-page-header-actions');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</div><!-- .aui-page-header-actions -->');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from panel.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }


aui.panel = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-panel');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from progress-tracker.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.progressTracker == 'undefined') { aui.progressTracker = {}; }


aui.progressTracker.progressTracker = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ol', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-progress-tracker', (opt_data.isInverted) ? ' aui-progress-tracker-inverted' : '');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>');
  var param1846 = new soy.StringBuilder();
  var currentStepList1847 = opt_data.steps;
  var currentStepListLen1847 = currentStepList1847.length;
  for (var currentStepIndex1847 = 0; currentStepIndex1847 < currentStepListLen1847; currentStepIndex1847++) {
    var currentStepData1847 = currentStepList1847[currentStepIndex1847];
    if (currentStepData1847['isCurrent']) {
      var stepList1850 = opt_data.steps;
      var stepListLen1850 = stepList1850.length;
      for (var stepIndex1850 = 0; stepIndex1850 < stepListLen1850; stepIndex1850++) {
        var stepData1850 = stepList1850[stepIndex1850];
        aui.progressTracker.step(soy.$$augmentData(stepData1850, {width: Math.round(100 / opt_data.steps.length * 10000) / 10000, href: stepIndex1850 < currentStepIndex1847 ? stepData1850['href'] : null}), param1846, opt_ijData);
      }
    }
  }
  aui.progressTracker.content({steps: opt_data.steps, content: param1846.toString()}, output, opt_ijData);
  output.append('</ol>');
  return opt_sb ? '' : output.toString();
};


aui.progressTracker.content = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  if (opt_data.content != '') {
    output.append(opt_data.content);
  } else {
    var stepList1864 = opt_data.steps;
    var stepListLen1864 = stepList1864.length;
    for (var stepIndex1864 = 0; stepIndex1864 < stepListLen1864; stepIndex1864++) {
      var stepData1864 = stepList1864[stepIndex1864];
      aui.progressTracker.step(soy.$$augmentData(stepData1864, {isCurrent: stepIndex1864 == 0, width: Math.round(100 / opt_data.steps.length * 10000) / 10000, href: null}), output, opt_ijData);
    }
  }
  return opt_sb ? '' : output.toString();
};


aui.progressTracker.step = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-progress-tracker-step', (opt_data.isCurrent) ? ' aui-progress-tracker-step-current' : '');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('" style="width: ', soy.$$escapeHtml(opt_data.width), '%;"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('><', soy.$$escapeHtml(opt_data.href ? 'a' : 'span'), (opt_data.href) ? ' href="' + soy.$$escapeHtml(opt_data.href) + '"' : '', '>', soy.$$escapeHtml(opt_data.text), '</', soy.$$escapeHtml(opt_data.href ? 'a' : 'span'), '></li>');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from table.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }


aui.table = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<table', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', (opt_data.columnsContent) ? opt_data.columnsContent : '', (opt_data.captionContent) ? '<caption>' + opt_data.captionContent + '</caption>' : '', (opt_data.theadContent) ? '<thead>' + opt_data.theadContent + '</thead>' : '', (opt_data.tfootContent) ? '<tfoot>' + opt_data.tfootContent + '</tfoot>' : '', (! opt_data.contentIncludesTbody) ? '<tbody>' : '', opt_data.content, (! opt_data.contentIncludesTbody) ? '</tbody>' : '', '</table>');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from tabs.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }


aui.tabs = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-tabs ', soy.$$escapeHtml(opt_data.isVertical ? 'vertical-tabs' : 'horizontal-tabs'), (opt_data.isDisabled) ? ' aui-tabs-disabled' : '');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('><ul class="tabs-menu">');
  var itemList2015 = opt_data.menuItems;
  var itemListLen2015 = itemList2015.length;
  for (var itemIndex2015 = 0; itemIndex2015 < itemListLen2015; itemIndex2015++) {
    var itemData2015 = itemList2015[itemIndex2015];
    aui.tabMenuItem(itemData2015, output, opt_ijData);
  }
  output.append('</ul>', opt_data.paneContent, '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
  return opt_sb ? '' : output.toString();
};


aui.tabMenuItem = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="menu-item', (opt_data.isActive) ? ' active-tab' : '');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('><a href="', soy.$$escapeHtml(opt_data.url), '"><strong>', soy.$$escapeHtml(opt_data.text), '</strong></a></li>');
  return opt_sb ? '' : output.toString();
};


aui.tabPane = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="tabs-pane', (opt_data.isActive) ? ' active-pane' : '');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from toolbar.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.toolbar == 'undefined') { aui.toolbar = {}; }


aui.toolbar.toolbar = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-toolbar');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
  return opt_sb ? '' : output.toString();
};


aui.toolbar.split = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="toolbar-split toolbar-split-', soy.$$escapeHtml(opt_data.split));
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
  return opt_sb ? '' : output.toString();
};


aui.toolbar.group = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<ul', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="toolbar-group');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</ul>');
  return opt_sb ? '' : output.toString();
};


aui.toolbar.item = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li ', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="toolbar-item', (opt_data.isPrimary) ? ' primary' : '', (opt_data.isActive) ? ' active' : '');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</li>');
  return opt_sb ? '' : output.toString();
};


aui.toolbar.trigger = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<a', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="toolbar-trigger');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('" href="', soy.$$escapeHtml(opt_data.url ? opt_data.url : '#'), '"', (opt_data.title) ? ' title="' + soy.$$escapeHtml(opt_data.title) + '"' : '');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</a>');
  return opt_sb ? '' : output.toString();
};


aui.toolbar.button = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  if (! (opt_data != null)) {
    output.append('Either $text or both $title and $iconClass must be provided.');
  } else {
    var param2170 = new soy.StringBuilder();
    aui.toolbar.trigger({url: opt_data.url, title: opt_data.title, content: ((opt_data.iconClass) ? '<span class="icon ' + soy.$$escapeHtml(opt_data.iconClass) + '"></span>' : '') + ((opt_data.text) ? '<span class="trigger-text">' + soy.$$escapeHtml(opt_data.text) + '</span>' : '')}, param2170, opt_ijData);
    aui.toolbar.item({isActive: opt_data.isActive, isPrimary: opt_data.isPrimary, id: opt_data.id, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, content: param2170.toString()}, output, opt_ijData);
  }
  return opt_sb ? '' : output.toString();
};


aui.toolbar.link = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  var param2188 = new soy.StringBuilder('toolbar-item-link');
  aui.renderExtraClasses(opt_data, param2188, opt_ijData);
  var param2192 = new soy.StringBuilder();
  aui.toolbar.trigger({url: opt_data.url, content: soy.$$escapeHtml(opt_data.text)}, param2192, opt_ijData);
  aui.toolbar.item({id: opt_data.id, extraClasses: param2188.toString(), extraAttributes: opt_data.extraAttributes, content: param2192.toString()}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.toolbar.dropdownInternal = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  var param2201 = new soy.StringBuilder(opt_data.itemClass);
  aui.renderExtraClasses(opt_data, param2201, opt_ijData);
  var param2206 = new soy.StringBuilder((opt_data.splitButtonContent) ? opt_data.splitButtonContent : '');
  var param2211 = new soy.StringBuilder();
  aui.dropdown.trigger({extraClasses: 'toolbar-trigger', accessibilityText: opt_data.text}, param2211, opt_ijData);
  aui.dropdown.menu({content: opt_data.dropdownItemsContent}, param2211, opt_ijData);
  aui.dropdown.parent({content: param2211.toString()}, param2206, opt_ijData);
  aui.toolbar.item({isPrimary: opt_data.isPrimary, id: opt_data.id, extraClasses: param2201.toString(), extraAttributes: opt_data.extraAttributes, content: param2206.toString()}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.toolbar.dropdown = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  aui.toolbar.dropdownInternal({isPrimary: opt_data.isPrimary, id: opt_data.id, itemClass: 'toolbar-dropdown', extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, text: opt_data.text, dropdownItemsContent: opt_data.dropdownItemsContent}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};


aui.toolbar.splitButton = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  var param2235 = new soy.StringBuilder();
  aui.toolbar.trigger({url: opt_data.url, content: soy.$$escapeHtml(opt_data.text)}, param2235, opt_ijData);
  aui.toolbar.dropdownInternal({isPrimary: opt_data.isPrimary, id: opt_data.id, itemClass: 'toolbar-splitbutton', extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, dropdownItemsContent: opt_data.dropdownItemsContent, splitButtonContent: param2235.toString()}, output, opt_ijData);
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from toolbar2.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.toolbar2 == 'undefined') { aui.toolbar2 = {}; }


aui.toolbar2.toolbar2 = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-toolbar2');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append(' role="toolbar"><div class="aui-toolbar2-inner">', opt_data.content, '</div></div>');
  return opt_sb ? '' : output.toString();
};


aui.toolbar2.item = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-toolbar2-', soy.$$escapeHtml(opt_data.item));
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</div>');
  return opt_sb ? '' : output.toString();
};


aui.toolbar2.group = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div', (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-toolbar2-group');
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('>', opt_data.content, '</div>');
  return opt_sb ? '' : output.toString();
};

// This file was automatically generated from avatar.soy.
// Please don't edit this file by hand.

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.avatar == 'undefined') { aui.avatar = {}; }


aui.avatar.avatar = function(opt_data, opt_sb, opt_ijData) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), (opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-avatar aui-avatar-', soy.$$escapeHtml(opt_data.size), soy.$$escapeHtml(opt_data.isProject ? ' aui-avatar-project' : ''), soy.$$escapeHtml(opt_data.badgeContent ? ' aui-avatar-badged' : ''));
  aui.renderExtraClasses(opt_data, output, opt_ijData);
  output.append('"');
  aui.renderExtraAttributes(opt_data, output, opt_ijData);
  output.append('><span class="aui-avatar-inner"><img src="', soy.$$escapeHtml(opt_data.avatarImageUrl), '"', (opt_data.accessibilityText) ? ' alt="' + soy.$$escapeHtml(opt_data.accessibilityText) + '"' : '', (opt_data.title) ? ' title="' + soy.$$escapeHtml(opt_data.title) + '"' : '', (opt_data.imageClasses) ? ' class="' + soy.$$escapeHtml(opt_data.imageClasses) + '"' : '', ' /></span>', (opt_data.badgeContent) ? opt_data.badgeContent : '', '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), '>');
  return opt_sb ? '' : output.toString();
};

