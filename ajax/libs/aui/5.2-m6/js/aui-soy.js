/*! AUI Flat Pack - version 5.2-m6 - generated 2013-05-29 03:12:37 -0400 */


/*
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
 * @author Mike Samuel
 * @author Kai Huang
 * @author Aharon Lenin
 */


// COPIED FROM nogoog_shim.js

// Create closure namespaces.
var goog;
if (typeof goog == "undefined") {
  goog = {};
}

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
    fail: function () {}
  };
}


// Stub out the document wrapper used by renderAs*.
if (!goog.dom) {
  goog.dom = {
    DomHelper: function (d) {
      d = d || document;
      return {
        createElement: function (name) { return d.createElement(name); },
        createDocumentFragment: function () {
          return d.createDocumentFragment();
        }
      };
    }
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
    /**
     * Utility class for formatting text for display in a potentially
     * opposite-directionality context without garbling. Provides the following
     * functionality:
     *
     * @param {goog.i18n.bidi.Dir|number|boolean} contextDir The context
     *     directionality as a number
     *     (positive = LRT, negative = RTL, 0 = unknown).
     * @constructor
     */
    BidiFormatter: function (dir) {
      this.dir_ = dir;
    },
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
 * @return {string} Input text after applying the above processing.
 */
goog.i18n.BidiFormatter.prototype.spanWrap = function(str) {
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
 * @return {string} Input text after applying the above processing.
 */
goog.i18n.BidiFormatter.prototype.unicodeWrap = function(str) {
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
  StringBuffer: function(opt_a1, var_args) {

    /**
     * Internal buffer for the string to be concatenated.
     * @type {string|Array}
     * @private
     */
    this.buffer_ = goog.userAgent.HAS_JSCRIPT ? [] : '';

    if (opt_a1 != null) {
      this.append.apply(this, arguments);
    }
  },
  /**
   * Converts \r\n, \r, and \n to <br>s
   * @param {*} str The string in which to convert newlines.
   * @return {string} A copy of {@code str} with converted newlines.
   */
  newlineToBr: function(str) {

    str = String(str);

    // This quick test helps in the case when there are no chars to replace,
    // in the worst case this makes barely a difference to the time taken.
    if (!goog.string.NEWLINE_TO_BR_RE_.test(str)) {
      return str;
    }

    return str.replace(/(\r\n|\r|\n)/g, '<br>');
  },
  urlEncode: encodeURIComponent,
  /**
   * Regular expression used within newlineToBr().
   * @type {RegExp}
   * @private
   */
  NEWLINE_TO_BR_RE: /[\r\n]/
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
   * @param {Element} element The element whose content we are rendering.
   * @param {Function} template The Soy template defining element's content.
   * @param {Object=} opt_templateData The data for the template.
   * @param {Object=} opt_injectedData The injected data for the template.
   */
  renderAsElement: function(
    template, opt_templateData, opt_injectedData, opt_document) {
    return /** @type {!Element} */ (soyshim.$$renderWithWrapper_(
        template, opt_templateData, opt_document, true /* asElement */,
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
   * @param {Document=} opt_document The document used to create DOM nodes.
   *     If not specified, global document object is used.
   * @param {Object=} opt_injectedData The injected data for the template.
   * @return {!Node} The resulting node or document fragment.
   */
  renderAsFragment: function(
    template, opt_templateData, opt_injectedData, opt_document) {
    return soyshim.$$renderWithWrapper_(
        template, opt_templateData, opt_document, false /* asElement */,
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
var soyshim = {};
/**
 * Helper function to render a Soy template into a single node or a document
 * fragment. If the rendered HTML string represents a single node, then that
 * node is returned. Otherwise a document fragment is created and returned
 * (wrapped in a DIV element if #opt_singleNode is true).
 *
 * @param {Function} template The Soy template defining the element's content.
 * @param {Object=} opt_templateData The data for the template.
 * @param {Document=} opt_document The document used to create DOM nodes. If
 *     not specified, global document object is used.
 * @param {boolean=} opt_asElement Whether to wrap the fragment in an
 *     element if the template does not render a single element. If true,
 *     result is always an Element.
 * @param {Object=} opt_injectedData The injected data for the template.
 * @return {!Node} The resulting node or document fragment.
 * @private
 */
soyshim.$$renderWithWrapper_ = function(
    template, opt_templateData, opt_document, opt_asElement, opt_injectedData) {

  var doc = opt_document || document;
  var wrapper = doc.createElement('div');
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
  var fragment = doc.createDocumentFragment();
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

if(typeof aui=="undefined"){var aui={}}aui.renderExtraAttributes=function(b,h,f){var d=h||new soy.StringBuilder();if(b!=null&&b.extraAttributes){if(Object.prototype.toString.call(b.extraAttributes)==="[object Object]"){var a=soy.$$getMapKeys(b.extraAttributes);var g=a.length;for(var c=0;c<g;c++){var e=a[c];d.append(" ",soy.$$escapeHtml(e),'="',soy.$$escapeHtml(b.extraAttributes[e]),'"')}}else{d.append(" ",b.extraAttributes)}}return h?"":d.toString()};aui.renderExtraClasses=function(i,f,j){var d=f||new soy.StringBuilder();if(i!=null&&i.extraClasses){if(i.isFullAttr){d.append(' class="');if((i.extraClasses) instanceof Array){var h=i.extraClasses;var g=h.length;for(var c=0;c<g;c++){var e=h[c];d.append((!(c==0))?" ":"",soy.$$escapeHtml(e))}}else{d.append(soy.$$escapeHtml(i.extraClasses))}d.append('"')}else{if((i.extraClasses) instanceof Array){var b=i.extraClasses;var a=b.length;for(var k=0;k<a;k++){var l=b[k];d.append(" ",soy.$$escapeHtml(l))}}else{d.append(" ",soy.$$escapeHtml(i.extraClasses))}}}return f?"":d.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.avatar=="undefined"){aui.avatar={}}aui.avatar.avatar=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"span"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-avatar aui-avatar-',soy.$$escapeHtml(a.size),soy.$$escapeHtml(a.isProject?" aui-avatar-project":""),soy.$$escapeHtml(a.badgeContent?" aui-avatar-badged":""));aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append('><span class="aui-avatar-inner"><img src="',soy.$$escapeHtml(a.avatarImageUrl),'"',(a.accessibilityText)?' alt="'+soy.$$escapeHtml(a.accessibilityText)+'"':"",(a.title)?' title="'+soy.$$escapeHtml(a.title)+'"':"",(a.imageClasses)?' class="'+soy.$$escapeHtml(a.imageClasses)+'"':""," /></span>",(a.badgeContent)?a.badgeContent:"","</",soy.$$escapeHtml(a.tagName?a.tagName:"span"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.badges=="undefined"){aui.badges={}}aui.badges.badge=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"span"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-badge');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",soy.$$escapeHtml(a.text),"</",soy.$$escapeHtml(a.tagName?a.tagName:"span"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.buttons=="undefined"){aui.buttons={}}aui.buttons.button=function(a,d,c){var b=d||new soy.StringBuilder();if(a.tagName=="input"){b.append('<input type="',soy.$$escapeHtml(a.inputType?a.inputType:"button"),'" ');aui.buttons.buttonAttributes(a,b,c);b.append(' value="',soy.$$escapeHtml(a.text),'" />')}else{b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"button")," ");aui.buttons.buttonAttributes(a,b,c);b.append(">");aui.buttons.buttonIcon(a,b,c);b.append(soy.$$escapeHtml(a.text),"</",soy.$$escapeHtml(a.tagName?a.tagName:"button"),">")}return d?"":b.toString()};aui.buttons.buttons=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-buttons');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div>");return d?"":b.toString()};aui.buttons.buttonAttributes=function(a,d,c){var b=d||new soy.StringBuilder();b.append((a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-button',(a.splitButtonType=="main")?" aui-button-split-main":"",(a.dropdown2Target)?" aui-dropdown2-trigger"+((a.splitButtonType=="more")?" aui-button-split-more":""):"");switch(a.type){case"primary":b.append(" aui-button-primary");break;case"link":b.append(" aui-button-link");break;case"subtle":b.append(" aui-button-subtle");break}aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append((a.isPressed)?' aria-pressed="'+soy.$$escapeHtml(a.isPressed)+'"':"",(a.isDisabled)?' aria-disabled="'+soy.$$escapeHtml(a.isDisabled)+'"'+((a.isDisabled==true)?(a.tagName=="button"||a.tagName=="input")?' disabled="disabled" ':"":""):"",(a.dropdown2Target)?' aria-owns="'+soy.$$escapeHtml(a.dropdown2Target)+'" aria-haspopup="true"':"");return d?"":b.toString()};aui.buttons.buttonIcon=function(a,d,c){var b=d||new soy.StringBuilder();b.append((a.iconType)?'<span class="'+((a.iconType=="aui")?"aui-icon":"")+((a.iconClass)?" "+soy.$$escapeHtml(a.iconClass):"")+'">'+((a.iconText)?soy.$$escapeHtml(a.iconText)+" ":"")+"</span>":"");return d?"":b.toString()};aui.buttons.splitButton=function(a,d,c){var b=d||new soy.StringBuilder();aui.buttons.button(soy.$$augmentData(a.splitButtonMain,{splitButtonType:"main"}),b,c);aui.buttons.button(soy.$$augmentData(a.splitButtonMore,{splitButtonType:"more"}),b,c);return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.dropdown=="undefined"){aui.dropdown={}}aui.dropdown.trigger=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<a",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-dd-trigger');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append('><span class="dropdown-text">',(a.accessibilityText)?soy.$$escapeHtml(a.accessibilityText):"","</span>",(!(a.showIcon==false))?'<span class="icon icon-dropdown"></span>':"","</a>");return d?"":b.toString()};aui.dropdown.menu=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"ul"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-dropdown hidden');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"ul"),">");return d?"":b.toString()};aui.dropdown.parent=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-dd-parent');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};aui.dropdown.item=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"li"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="dropdown-item');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append('><a href="',soy.$$escapeHtml(a.url?a.url:"#"),'">',soy.$$escapeHtml(a.text),"</a></",soy.$$escapeHtml(a.tagName?a.tagName:"li"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.dropdown2=="undefined"){aui.dropdown2={}}aui.dropdown2.dropdown2=function(a,d,c){var b=d||new soy.StringBuilder();aui.dropdown2.trigger(soy.$$augmentData(a.trigger,{menu:a.menu}),b,c);aui.dropdown2.contents(a.menu,b,c);return d?"":b.toString()};aui.dropdown2.trigger=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"a"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-dropdown2-trigger');aui.renderExtraClasses(a,b,c);b.append('" aria-owns="',soy.$$escapeHtml(a.menu.id),'" aria-haspopup="true"',(a.title)?' title="'+soy.$$escapeHtml(a.title)+'"':"",(a.container)?' data-container="'+soy.$$escapeHtml(a.container)+'"':"",((!a.tagName||a.tagName=="a")&&(!a.extraAttributes||Object.prototype.toString.call(a.extraAttributes)==="[object Object]"&&!a.extraAttributes.href&&!a.extraAttributes.tabindex))?' tabindex="0"':"");aui.renderExtraAttributes(a,b,c);b.append(">",(a.content)?a.content:"",(a.text)?soy.$$escapeHtml(a.text):"",(!(a.showIcon==false))?'<span class="icon aui-icon-dropdown"></span>':"","</",soy.$$escapeHtml(a.tagName?a.tagName:"a"),">");return d?"":b.toString()};aui.dropdown2.contents=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div id="',soy.$$escapeHtml(a.id),'" class="aui-dropdown2');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",(a.content)?a.content:"","</div>");return d?"":b.toString()};aui.dropdown2.section=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-dropdown2-section');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",(a.label)?"<strong>"+soy.$$escapeHtml(a.label)+"</strong>":"",a.content,"</div>");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.expander=="undefined"){aui.expander={}}aui.expander.content=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-expander-content');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append((a.initiallyExpanded)?' aria-expanded="'+soy.$$escapeHtml(a.initiallyExpanded)+'"':"",">",(a.content)?a.content:"","</div>");return d?"":b.toString()};aui.expander.trigger=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tag?a.tag:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",(a.replaceText)?' data-replace-text="'+soy.$$escapeHtml(a.replaceText)+'"':"",(a.replaceSelector)?' data-replace-selector="'+soy.$$escapeHtml(a.replaceSelector)+'"':"",' class="aui-expander-trigger');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(' aria-controls="',soy.$$escapeHtml(a.contentId),'"',(a.collapsible)?' data-collapsible="'+soy.$$escapeHtml(a.collapsible)+'"':"",">",(a.content)?a.content:"","</",soy.$$escapeHtml(a.tag?a.tag:"div"),">");return d?"":b.toString()};aui.expander.revealText=function(a,e,c){var b=e||new soy.StringBuilder();var d=new soy.StringBuilder(soy.$$escapeHtml(a.contentContent));aui.expander.trigger({id:a.triggerId,contentId:a.contentId,tag:"a",content:"<span class='reveal-text-trigger-text'>Show more</span>",replaceSelector:".reveal-text-trigger-text",replaceText:"Show less",extraAttributes:a.triggerExtraAttributes,extraClasses:((a.triggerExtraClasses)?soy.$$escapeHtml(a.triggerExtraClasses)+"  ":"")+" aui-expander-reveal-text"},d,c);aui.expander.content({id:a.contentId,content:d.toString(),extraAttributes:a.contentExtraAttributes,extraClasses:a.contentExtraClasses},b,c);return e?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.form=="undefined"){aui.form={}}aui.form.form=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<form",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui',(a.isUnsectioned)?" unsectioned":"",(a.isLongLabels)?" long-label":"",(a.isTopLabels)?" top-label":"");aui.renderExtraClasses(a,b,c);b.append('" action="',soy.$$escapeHtml(a.action),'" method="',soy.$$escapeHtml(a.method?a.method:"post"),'"',(a.enctype)?'enctype="'+soy.$$escapeHtml(a.enctype)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</form>");return d?"":b.toString()};aui.form.formDescription=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="field-group');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div>");return d?"":b.toString()};aui.form.fieldset=function(a,e,d){var b=e||new soy.StringBuilder();var c=a.isInline||a.isDateSelect||a.isGroup||a.extraClasses;b.append("<fieldset",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");if(c){b.append(' class="',soy.$$escapeHtml(a.isInline?"inline":a.isDateSelect?"date-select":a.isGroup?"group":""));aui.renderExtraClasses(a,b,d);b.append('"')}aui.renderExtraAttributes(a,b,d);b.append("><legend><span>",a.legendContent,"</span></legend>",a.content,"</fieldset>");return e?"":b.toString()};aui.form.fieldGroup=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="field-group');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div>");return d?"":b.toString()};aui.form.buttons=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div class="buttons-container',(a.alignment)?" "+soy.$$escapeHtml(a.alignment):"",'"><div class="buttons">',a.content,"</div></div>");return d?"":b.toString()};aui.form.label=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<label",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' for="',soy.$$escapeHtml(a.forField),'"');aui.renderExtraClasses(soy.$$augmentData(a,{isFullAttr:true}),b,c);aui.renderExtraAttributes(a,b,c);b.append(">",a.content,(a.isRequired)?'<span class="aui-icon icon-required"></span>':"","</label>");return d?"":b.toString()};aui.form.input=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<input",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="',soy.$$escapeHtml(a.type=="password"?"text":a.type=="submit"?"button":a.type));aui.renderExtraClasses(a,b,c);b.append('" type="',soy.$$escapeHtml(a.type),'" name="',(a.name)?soy.$$escapeHtml(a.name):soy.$$escapeHtml(a.id),'"',(a.value)?' value="'+soy.$$escapeHtml(a.value)+'"':"",((a.type=="checkbox"||a.type=="radio")&&a.isChecked)?' checked="checked"':"",(a.type=="text"&&a.maxLength)?' maxlength="'+soy.$$escapeHtml(a.maxLength)+'"':"",(a.type=="text"&&a.size)?' size="'+soy.$$escapeHtml(a.size)+'"':"",(a.isDisabled)?" disabled":"");aui.renderExtraAttributes(a,b,c);b.append("/>");return d?"":b.toString()};aui.form.submit=function(a,d,c){var b=d||new soy.StringBuilder();aui.form.input({id:a.id,name:a.name,type:"submit",value:a.text,isDisabled:a.isDisabled,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes},b,c);return d?"":b.toString()};aui.form.button=function(a,d,c){var b=d||new soy.StringBuilder();aui.form.input({id:a.id,name:a.name,type:"button",value:a.text,isDisabled:a.isDisabled,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes},b,c);return d?"":b.toString()};aui.form.linkButton=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<a",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' name="',soy.$$escapeHtml(a.name?a.name:a.id),'" href="',soy.$$escapeHtml(a.url?a.url:"#"),'" class="cancel');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",soy.$$escapeHtml(a.text),"</a>");return d?"":b.toString()};aui.form.textarea=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<textarea",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' name="',(a.name)?soy.$$escapeHtml(a.name):soy.$$escapeHtml(a.id),'" class="textarea');aui.renderExtraClasses(a,b,c);b.append('"',(a.rows)?' rows="'+soy.$$escapeHtml(a.rows)+'"':"",(a.cols)?' cols="'+soy.$$escapeHtml(a.cols)+'"':"",(a.isDisabled)?" disabled":"");aui.renderExtraAttributes(a,b,c);b.append(">",(a.value)?soy.$$escapeHtml(a.value):"","</textarea>");return d?"":b.toString()};aui.form.select=function(a,h,d){var b=h||new soy.StringBuilder();b.append("<select",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' name="',(a.name)?soy.$$escapeHtml(a.name):soy.$$escapeHtml(a.id),'" class="',soy.$$escapeHtml(a.isMultiple?"multi-select":"select"));aui.renderExtraClasses(a,b,d);b.append('"',(a.size)?' size="'+soy.$$escapeHtml(a.size)+'"':"",(a.isDisabled)?" disabled":"",(a.isMultiple)?" multiple":"");aui.renderExtraAttributes(a,b,d);b.append(">");var g=a.options;var c=g.length;for(var f=0;f<c;f++){var e=g[f];aui.form.optionOrOptgroup(e,b,d)}b.append("</select>");return h?"":b.toString()};aui.form.optionOrOptgroup=function(a,h,e){var d=h||new soy.StringBuilder();if(a.options){d.append('<optgroup label="',soy.$$escapeHtml(a.text),'">');var c=a.options;var f=c.length;for(var b=0;b<f;b++){var g=c[b];aui.form.optionOrOptgroup(g,d,e)}d.append("</optgroup>")}else{d.append('<option value="',soy.$$escapeHtml(a.value),'" ',(a.selected)?"selected":"",">",soy.$$escapeHtml(a.text),"</option>")}return h?"":d.toString()};aui.form.value=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<span",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="field-value');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</span>");return d?"":b.toString()};aui.form.field=function(c,b,d){var a=b||new soy.StringBuilder();var g=c.type=="checkbox"||c.type=="radio";a.append('<div class="',(g)?soy.$$escapeHtml(c.type):"field-group");aui.renderExtraClasses(c,a,d);a.append('"');aui.renderExtraAttributes(c,a,d);a.append(">");if(c.labelContent&&!g){aui.form.label({forField:c.id,isRequired:c.isRequired,content:c.labelContent},a,d)}switch(c.type){case"textarea":aui.form.textarea({id:c.id,name:c.name,value:c.value,rows:c.rows,cols:c.cols,isDisabled:c.isDisabled?true:false},a,d);break;case"select":aui.form.select({id:c.id,name:c.name,options:c.options,isMultiple:c.isMultiple,size:c.size,isDisabled:c.isDisabled?true:false},a,d);break;case"value":aui.form.value({id:c.id,content:soy.$$escapeHtml(c.value)},a,d);break;case"text":case"password":case"file":case"radio":case"checkbox":case"button":case"submit":case"reset":aui.form.input({id:c.id,name:c.name,type:c.type,value:c.value,maxLength:c.maxLength,size:c.size,isChecked:c.isChecked,isDisabled:c.isDisabled?true:false},a,d);break}if(c.labelContent&&g){aui.form.label({forField:c.id,isRequired:c.isRequired,content:c.labelContent},a,d)}if(c.descriptionText){aui.form.fieldDescription({message:c.descriptionText},a,d)}if(c.errorTexts){var f=c.errorTexts;var i=f.length;for(var h=0;h<i;h++){var e=f[h];aui.form.fieldError({message:e},a,d)}}a.append("</div>");return b?"":a.toString()};aui.form.fieldError=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div class="error');aui.renderExtraClasses(a,b,c);b.append('">',soy.$$escapeHtml(a.message),"</div>");return d?"":b.toString()};aui.form.fieldDescription=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div class="description');aui.renderExtraClasses(a,b,c);b.append('">',soy.$$escapeHtml(a.message),"</div>");return d?"":b.toString()};aui.form.textField=function(a,d,c){var b=d||new soy.StringBuilder();aui.form.field({id:a.id,name:a.name,type:"text",labelContent:a.labelContent,value:a.value,maxLength:a.maxLength,size:a.size,isRequired:a.isRequired,isDisabled:a.isDisabled,descriptionText:a.descriptionText,errorTexts:a.errorTexts,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes},b,c);return d?"":b.toString()};aui.form.textareaField=function(a,d,c){var b=d||new soy.StringBuilder();aui.form.field({id:a.id,name:a.name,type:"textarea",labelContent:a.labelContent,value:a.value,rows:a.rows,cols:a.cols,isRequired:a.isRequired,isDisabled:a.isDisabled,descriptionText:a.descriptionText,errorTexts:a.errorTexts,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes},b,c);return d?"":b.toString()};aui.form.passwordField=function(a,d,c){var b=d||new soy.StringBuilder();aui.form.field({id:a.id,name:a.name,type:"password",labelContent:a.labelContent,value:a.value,isRequired:a.isRequired,isDisabled:a.isDisabled,descriptionText:a.descriptionText,errorTexts:a.errorTexts,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes},b,c);return d?"":b.toString()};aui.form.fileField=function(a,d,c){var b=d||new soy.StringBuilder();aui.form.field({id:a.id,name:a.name,type:"file",labelContent:a.labelContent,value:a.value,isRequired:a.isRequired,isDisabled:a.isDisabled,descriptionText:a.descriptionText,errorTexts:a.errorTexts,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes},b,c);return d?"":b.toString()};aui.form.selectField=function(a,d,c){var b=d||new soy.StringBuilder();aui.form.field({id:a.id,name:a.name,type:"select",labelContent:a.labelContent,options:a.options,isMultiple:a.isMultiple,size:a.size,isRequired:a.isRequired,isDisabled:a.isDisabled,descriptionText:a.descriptionText,errorTexts:a.errorTexts,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes},b,c);return d?"":b.toString()};aui.form.checkboxField=function(f,c,g){var a=c||new soy.StringBuilder();var h=new soy.StringBuilder((f.isMatrix)?'<div class="matrix">':"");var d=f.fields;var i=d.length;for(var e=0;e<i;e++){var b=d[e];aui.form.field(soy.$$augmentData(b,{type:"checkbox",id:b.id,name:b.name,labelContent:soy.$$escapeHtml(b.labelText),isChecked:b.isChecked,isDisabled:b.isDisabled,descriptionText:b.descriptionText,errorTexts:b.errorTexts,extraClasses:b.extraClasses,extraAttributes:b.extraAttributes}),h,g)}h.append((f.isMatrix)?"</div>":"");if(f.descriptionText||f.errorTexts&&f.errorTexts.length){aui.form.field({descriptionText:f.descriptionText,errorTexts:f.errorTexts,isDisabled:false},h,g)}aui.form.fieldset({legendContent:f.legendContent+(f.isRequired?'<span class="aui-icon icon-required"></span>':""),isGroup:true,id:f.id,extraClasses:f.extraClasses,extraAttributes:f.extraAttributes,content:h.toString()},a,g);return c?"":a.toString()};aui.form.radioField=function(d,c,f){var a=c||new soy.StringBuilder();var b=new soy.StringBuilder((d.isMatrix)?'<div class="matrix">':"");var i=d.fields;var e=i.length;for(var h=0;h<e;h++){var g=i[h];aui.form.field(soy.$$augmentData(g,{type:"radio",name:d.name?d.name:d.id,value:g.value,id:g.id,labelContent:soy.$$escapeHtml(g.labelText),isChecked:g.isChecked,isDisabled:g.isDisabled,descriptionText:g.descriptionText,errorTexts:g.errorTexts,extraClasses:g.extraClasses,extraAttributes:g.extraAttributes}),b,f)}b.append((d.isMatrix)?"</div>":"");if(d.descriptionText||d.errorTexts&&d.errorTexts.length){aui.form.field({descriptionText:d.descriptionText,errorTexts:d.errorTexts,isDisabled:false},b,f)}aui.form.fieldset({legendContent:d.legendContent+(d.isRequired?'<span class="aui-icon icon-required"></span>':""),isGroup:true,id:d.id,extraClasses:d.extraClasses,extraAttributes:d.extraAttributes,content:b.toString()},a,f);return c?"":a.toString()};aui.form.valueField=function(a,d,c){var b=d||new soy.StringBuilder();aui.form.field({id:a.id,type:"value",value:a.value,labelContent:a.labelContent,isRequired:a.isRequired,descriptionText:a.descriptionText,errorTexts:a.errorTexts,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes},b,c);return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.group=="undefined"){aui.group={}}aui.group.group=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-group',(a.isSplit)?" aui-group-split":"");aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};aui.group.item=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-item');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.icons=="undefined"){aui.icons={}}aui.icons.icon=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"span"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-icon',(a.useIconFont)?" aui-icon-"+soy.$$escapeHtml(a.size?a.size:"small"):""," aui",soy.$$escapeHtml(a.useIconFont?"-iconfont":"-icon"),soy.$$escapeHtml(a.iconFontSet?"-"+a.iconFontSet:""),"-",soy.$$escapeHtml(a.icon));aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",(a.accessibilityText)?soy.$$escapeHtml(a.accessibilityText):"","</",soy.$$escapeHtml(a.tagName?a.tagName:"span"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.labels=="undefined"){aui.labels={}}aui.labels.label=function(a,d,c){var b=d||new soy.StringBuilder();if(a.url&&a.isCloseable==true){b.append("<span",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-label aui-label-closeable aui-label-split');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append('><a class="aui-label-split-main" href="',soy.$$escapeHtml(a.url),'">',soy.$$escapeHtml(a.text),'</a><span class="aui-label-split-close" >');aui.labels.closeIcon(a,b,c);b.append("</span></span>")}else{b.append("<",soy.$$escapeHtml(a.url?"a":"span"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-label',(a.isCloseable)?" aui-label-closeable":"");aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append((a.url)?' href="'+soy.$$escapeHtml(a.url)+'"':"",">",soy.$$escapeHtml(a.text));if(a.isCloseable){aui.labels.closeIcon(a,b,c)}b.append("</",soy.$$escapeHtml(a.url?"a":"span"),">")}return d?"":b.toString()};aui.labels.closeIcon=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<span tabindex="0" class="aui-icon aui-icon-close"');if(a.hasTitle!=false){b.append(' title="');aui.labels.closeIconText(a,b,c);b.append('"')}b.append(">");aui.labels.closeIconText(a,b,c);b.append("</span>");return d?"":b.toString()};aui.labels.closeIconText=function(a,d,c){var b=d||new soy.StringBuilder();b.append((a.closeIconText)?soy.$$escapeHtml(a.closeIconText):"("+soy.$$escapeHtml("Remove")+" "+soy.$$escapeHtml(a.text)+")");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.message=="undefined"){aui.message={}}aui.message.info=function(a,d,c){var b=d||new soy.StringBuilder();aui.message.message(soy.$$augmentData(a,{type:"info"}),b,c);return d?"":b.toString()};aui.message.warning=function(a,d,c){var b=d||new soy.StringBuilder();aui.message.message(soy.$$augmentData(a,{type:"warning"}),b,c);return d?"":b.toString()};aui.message.error=function(a,d,c){var b=d||new soy.StringBuilder();aui.message.message(soy.$$augmentData(a,{type:"error"}),b,c);return d?"":b.toString()};aui.message.success=function(a,d,c){var b=d||new soy.StringBuilder();aui.message.message(soy.$$augmentData(a,{type:"success"}),b,c);return d?"":b.toString()};aui.message.hint=function(a,d,c){var b=d||new soy.StringBuilder();aui.message.message(soy.$$augmentData(a,{type:"hint"}),b,c);return d?"":b.toString()};aui.message.generic=function(a,d,c){var b=d||new soy.StringBuilder();aui.message.message(soy.$$augmentData(a,{type:"generic"}),b,c);return d?"":b.toString()};aui.message.message=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-message ',soy.$$escapeHtml(a.type?a.type:"generic"),(a.isCloseable)?" closeable":"",(a.isShadowed)?" shadowed":"");aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",(a.titleContent)?'<p class="title"><strong>'+a.titleContent+"</strong></p>":"",a.content,'<span class="aui-icon icon-',soy.$$escapeHtml(a.type?a.type:"generic"),'"></span>',(a.isCloseable)?'<span class="aui-icon icon-close" role="button" tabindex="0"></span>':"","</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.page=="undefined"){aui.page={}}aui.page.document=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<!DOCTYPE html><html lang="',soy.$$escapeHtml(c.language?c.language:"en"),'"><head><meta charset="utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=EDGE"><title>',soy.$$escapeHtml(a.windowTitle),"</title>",(a.headContent)?a.headContent:"","</head><body");if(a.pageType){if(a.pageType=="generic"){b.append(" ");aui.renderExtraClasses(soy.$$augmentData(a,{isFullAttr:true}),b,c)}else{if(a.pageType=="focused"){b.append(' class="aui-page-focused aui-page-focused-',soy.$$escapeHtml(a.focusedPageSize?a.focusedPageSize:"xlarge"));aui.renderExtraClasses(a,b,c);b.append('"')}else{b.append(' class="aui-page-',soy.$$escapeHtml(a.pageType));aui.renderExtraClasses(a,b,c);b.append('"')}}}else{b.append(' class="');aui.renderExtraClasses(a,b,c);b.append('"')}aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</body></html>");return d?"":b.toString()};aui.page.page=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div id="page"><header id="header" role="banner">',a.headerContent,'</header><!-- #header --><section id="content" role="main">',a.contentContent,'</section><!-- #content --><footer id="footer" role="contentinfo">',a.footerContent,"</footer><!-- #footer --></div><!-- #page -->");return d?"":b.toString()};aui.page.header=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<nav",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-header aui-dropdown2-trigger-group');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(' role="navigation"><div class="aui-header-inner">',(a.headerBeforeContent)?'<div class="aui-header-before">'+a.headerBeforeContent+"</div>":"",'<div class="aui-header-primary"><h1 id="logo" class="aui-header-logo',(a.headerLogoImageUrl)?" aui-header-logo-custom":(a.logo)?" aui-header-logo-"+soy.$$escapeHtml(a.logo):"",'"><a href="',soy.$$escapeHtml(a.headerLink?a.headerLink:"/"),'">',(a.headerLogoImageUrl)?'<img src="'+soy.$$escapeHtml(a.headerLogoImageUrl)+'" alt="'+soy.$$escapeHtml(a.headerLogoText)+'" />':'<span class="aui-header-logo-device">'+soy.$$escapeHtml(a.headerLogoText?a.headerLogoText:"")+"</span>",(a.headerText)?'<span class="aui-header-logo-text">'+soy.$$escapeHtml(a.headerText)+"</span>":"","</a></h1>",(a.primaryNavContent)?a.primaryNavContent:"","</div>",(a.secondaryNavContent)?'<div class="aui-header-secondary">'+a.secondaryNavContent+"</div>":"",(a.headerAfterContent)?'<div class="aui-header-after">'+a.headerAfterContent+"</div>":"","</div><!-- .aui-header-inner--></nav><!-- .aui-header -->");return d?"":b.toString()};aui.page.pagePanel=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),' class="aui-page-panel');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append('><div class="aui-page-panel-inner">',a.content,"</div><!-- .aui-page-panel-inner --></",soy.$$escapeHtml(a.tagName?a.tagName:"div"),"><!-- .aui-page-panel -->");return d?"":b.toString()};aui.page.pagePanelNav=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),' class="aui-page-panel-nav');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),"><!-- .aui-page-panel-nav -->");return d?"":b.toString()};aui.page.pagePanelContent=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"section"),' class="aui-page-panel-content');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"section"),"><!-- .aui-page-panel-content -->");return d?"":b.toString()};aui.page.pagePanelSidebar=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"aside"),' class="aui-page-panel-sidebar');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"aside"),"><!-- .aui-page-panel-sidebar -->");return d?"":b.toString()};aui.page.pagePanelItem=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"section"),' class="aui-page-panel-item');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"section"),"><!-- .aui-page-panel-item -->");return d?"":b.toString()};aui.page.pageHeader=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<header class="aui-page-header');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append('><div class="aui-page-header-inner">',a.content,"</div><!-- .aui-page-header-inner --></header><!-- .aui-page-header -->");return d?"":b.toString()};aui.page.pageHeaderImage=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div class="aui-page-header-image');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div><!-- .aui-page-header-image -->");return d?"":b.toString()};aui.page.pageHeaderMain=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div class="aui-page-header-main');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div><!-- .aui-page-header-main -->");return d?"":b.toString()};aui.page.pageHeaderActions=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div class="aui-page-header-actions');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div><!-- .aui-page-header-actions -->");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}aui.panel=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-panel');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.progressTracker=="undefined"){aui.progressTracker={}}aui.progressTracker.progressTracker=function(g,f,h){var c=f||new soy.StringBuilder();c.append("<ol",(g.id)?' id="'+soy.$$escapeHtml(g.id)+'"':"",' class="aui-progress-tracker',(g.isInverted)?" aui-progress-tracker-inverted":"");aui.renderExtraClasses(g,c,h);c.append('"');aui.renderExtraAttributes(g,c,h);c.append(">");var e=new soy.StringBuilder();var k=g.steps;var d=k.length;for(var l=0;l<d;l++){var j=k[l];if(j.isCurrent){var m=g.steps;var i=m.length;for(var a=0;a<i;a++){var b=m[a];aui.progressTracker.step(soy.$$augmentData(b,{width:Math.round(100/g.steps.length*10000)/10000,href:a<l?b.href:null}),e,h)}}}aui.progressTracker.content({steps:g.steps,content:e.toString()},c,h);c.append("</ol>");return f?"":c.toString()};aui.progressTracker.content=function(a,h,e){var b=h||new soy.StringBuilder();if(a.content!=""){b.append(a.content)}else{var g=a.steps;var c=g.length;for(var d=0;d<c;d++){var f=g[d];aui.progressTracker.step(soy.$$augmentData(f,{isCurrent:d==0,width:Math.round(100/a.steps.length*10000)/10000,href:null}),b,e)}}return h?"":b.toString()};aui.progressTracker.step=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<li",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-progress-tracker-step',(a.isCurrent)?" aui-progress-tracker-step-current":"");aui.renderExtraClasses(a,b,c);b.append('" style="width: ',soy.$$escapeHtml(a.width),'%;"');aui.renderExtraAttributes(a,b,c);b.append("><",soy.$$escapeHtml(a.href?"a":"span"),(a.href)?' href="'+soy.$$escapeHtml(a.href)+'"':"",">",soy.$$escapeHtml(a.text),"</",soy.$$escapeHtml(a.href?"a":"span"),"></li>");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}aui.table=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<table",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",(a.columnsContent)?a.columnsContent:"",(a.captionContent)?"<caption>"+a.captionContent+"</caption>":"",(a.theadContent)?"<thead>"+a.theadContent+"</thead>":"",(a.tfootContent)?"<tfoot>"+a.tfootContent+"</tfoot>":"",(!a.contentIncludesTbody)?"<tbody>":"",a.content,(!a.contentIncludesTbody)?"</tbody>":"","</table>");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}aui.tabs=function(a,h,d){var b=h||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-tabs ',soy.$$escapeHtml(a.isVertical?"vertical-tabs":"horizontal-tabs"),(a.isDisabled)?" aui-tabs-disabled":"");aui.renderExtraClasses(a,b,d);b.append('"');aui.renderExtraAttributes(a,b,d);b.append('><ul class="tabs-menu">');var g=a.menuItems;var f=g.length;for(var e=0;e<f;e++){var c=g[e];aui.tabMenuItem(c,b,d)}b.append("</ul>",a.paneContent,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return h?"":b.toString()};aui.tabMenuItem=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<li",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="menu-item',(a.isActive)?" active-tab":"");aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append('><a href="',soy.$$escapeHtml(a.url),'"><strong>',soy.$$escapeHtml(a.text),"</strong></a></li>");return d?"":b.toString()};aui.tabPane=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="tabs-pane',(a.isActive)?" active-pane":"");aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.toolbar=="undefined"){aui.toolbar={}}aui.toolbar.toolbar=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-toolbar');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};aui.toolbar.split=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="toolbar-split toolbar-split-',soy.$$escapeHtml(a.split));aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};aui.toolbar.group=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<ul",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="toolbar-group');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</ul>");return d?"":b.toString()};aui.toolbar.item=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<li ",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="toolbar-item',(a.isPrimary)?" primary":"",(a.isActive)?" active":"");aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</li>");return d?"":b.toString()};aui.toolbar.trigger=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<a",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="toolbar-trigger');aui.renderExtraClasses(a,b,c);b.append('" href="',soy.$$escapeHtml(a.url?a.url:"#"),'"',(a.title)?' title="'+soy.$$escapeHtml(a.title)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</a>");return d?"":b.toString()};aui.toolbar.button=function(a,e,d){var c=e||new soy.StringBuilder();if(!(a!=null)){c.append("Either $text or both $title and $iconClass must be provided.")}else{var b=new soy.StringBuilder();aui.toolbar.trigger({url:a.url,title:a.title,content:((a.iconClass)?'<span class="icon '+soy.$$escapeHtml(a.iconClass)+'"></span>':"")+((a.text)?'<span class="trigger-text">'+soy.$$escapeHtml(a.text)+"</span>":"")},b,d);aui.toolbar.item({isActive:a.isActive,isPrimary:a.isPrimary,id:a.id,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes,content:b.toString()},c,d)}return e?"":c.toString()};aui.toolbar.link=function(a,f,e){var c=f||new soy.StringBuilder();var d=new soy.StringBuilder("toolbar-item-link");aui.renderExtraClasses(a,d,e);var b=new soy.StringBuilder();aui.toolbar.trigger({url:a.url,content:soy.$$escapeHtml(a.text)},b,e);aui.toolbar.item({id:a.id,extraClasses:d.toString(),extraAttributes:a.extraAttributes,content:b.toString()},c,e);return f?"":c.toString()};aui.toolbar.dropdownInternal=function(b,g,f){var c=g||new soy.StringBuilder();var d=new soy.StringBuilder(b.itemClass);aui.renderExtraClasses(b,d,f);var a=new soy.StringBuilder((b.splitButtonContent)?b.splitButtonContent:"");var e=new soy.StringBuilder();aui.dropdown.trigger({extraClasses:"toolbar-trigger",accessibilityText:b.text},e,f);aui.dropdown.menu({content:b.dropdownItemsContent},e,f);aui.dropdown.parent({content:e.toString()},a,f);aui.toolbar.item({isPrimary:b.isPrimary,id:b.id,extraClasses:d.toString(),extraAttributes:b.extraAttributes,content:a.toString()},c,f);return g?"":c.toString()};aui.toolbar.dropdown=function(a,d,c){var b=d||new soy.StringBuilder();aui.toolbar.dropdownInternal({isPrimary:a.isPrimary,id:a.id,itemClass:"toolbar-dropdown",extraClasses:a.extraClasses,extraAttributes:a.extraAttributes,text:a.text,dropdownItemsContent:a.dropdownItemsContent},b,c);return d?"":b.toString()};aui.toolbar.splitButton=function(a,e,c){var b=e||new soy.StringBuilder();var d=new soy.StringBuilder();aui.toolbar.trigger({url:a.url,content:soy.$$escapeHtml(a.text)},d,c);aui.toolbar.dropdownInternal({isPrimary:a.isPrimary,id:a.id,itemClass:"toolbar-splitbutton",extraClasses:a.extraClasses,extraAttributes:a.extraAttributes,dropdownItemsContent:a.dropdownItemsContent,splitButtonContent:d.toString()},b,c);return e?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.toolbar2=="undefined"){aui.toolbar2={}}aui.toolbar2.toolbar2=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-toolbar2');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(' role="toolbar"><div class="aui-toolbar2-inner">',a.content,"</div></div>");return d?"":b.toString()};aui.toolbar2.item=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-toolbar2-',soy.$$escapeHtml(a.item));aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div>");return d?"":b.toString()};aui.toolbar2.group=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-toolbar2-group');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div>");return d?"":b.toString()};
