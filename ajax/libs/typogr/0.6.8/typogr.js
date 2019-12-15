 /*!
  * typogr.js
  * Copyright(c) 2011 Eugene Kalinin
  * MIT Licensed
  */

(function (root) {

  /** Main typogr function */
  var typogr = function (obj) { return new Wrapper(obj); };

  // Current version
  typogr.version = '0.6.8';

  // Export the typogr object. In server-side for `require()` API.
  // If we're not in CommonJS, add `typogr` to the global object.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = typogr;
   } else if (typeof define === 'function' && define.amd) {
    define(function() { return typogr; });
  } else {
    root.typogr = typogr;
  }

  // typogr functions
  // ---------------------

  var re = function (regexp, flag) {
    return new RegExp(regexp, flag);
  };

  // RegExp for skip some tags
  var re_skip_tags = /<(\/)?(style|pre|code|kbd|script|math|title)[^>]*>/i;

  /**
   * Wraps apersands in HTML with ``<span class="amp">`` so they can be
   * styled with CSS. Apersands are also normalized to ``&amp;``. Requires 
   * ampersands to have whitespace or an ``&nbsp;`` on both sides.
   *
   */
  var amp = typogr.amp = function(text) {
    var re_amp = /(\s|&nbsp;)(&|&amp;|&\#38;)(\s|&nbsp;)/g
                //(    $1   )(     $2       )(   $3    )
      , re_intra_tag = /(<[^<]*>)?([^<]*)(<\/[^<]*>)?/g;
                      //( prefix) ( txt )(  suffix )
    if( !text && typeof text !== "string" ) {
      return;
    }
    return text.replace(re_intra_tag, function (str, prefix, text, suffix) {
      prefix = prefix || '';
      suffix = suffix || '';
      if (prefix.match(re_skip_tags)) return prefix + text + suffix;
      text = text.replace(re_amp, '$1<span class="amp">&amp;</span>$3');

      return prefix + text + suffix;
    });
  };

  /**
   * Wraps date suffix in <span class="ord"> so they can be styled with CSS.
   *
   */
  var ord = typogr.ord = function(text) {
    if( !text && typeof text !== "string" ) {
      return;
    }

    var tokens = tokenize(text)
      , result = []
      , in_skipped_tag = false
      , close_match
      , re_suffix = /(\d+)(st|nd|rd|th)/g;
                  //  $1        $2

    tokens.forEach( function (token) {

      if (token.type === 'tag') {
        result.push(token.txt);

        close_match = re_skip_tags.exec(token.txt);
        if (close_match && close_match[1] === undefined) {
          in_skipped_tag = true;
        } else {
          in_skipped_tag = false;
        }
      }
      else {
        if (in_skipped_tag) {
          result.push(token.txt);
        }
        else {
          result.push(token.txt.replace(re_suffix, '$1<span class="ord">$2</span>'));
        }
      }
    });

    return result.join('');

  };

  /**
   * Wraps initial quotes in ``class="dquo"`` for double quotes or ``class="quo"``
   * for single quotes. Works in these block tags ``(h1-h6, p, li, dt, dd)``
   * and also accounts for potential opening inline elements ``a, em, strong, span, b, i``
   *
   */
  var initQuotes = typogr.initQuotes = function(text) {
    var re_quote = re(
            '(?:(?:<(?:p|h[1-6]|li|dt|dd)[^>]*>|^)'+  // start with an opening
                                                      // p, h1-6, li, dd, dt
                                                      // or the start of the string
            '\\s*'+                                   // optional white space!
            '(?:<(?:a|em|span|strong|i|b)[^>]*>\\s*)*)'+//optional opening inline tags,
                                                      // with more optional white space for each.
            '(?:("|&ldquo;|&#8220;)|'+                // Find me a quote! /only need to find
             '(\'|&lsquo;|&#8216;))'                  // the left quotes and the primes/
          , 'i');

    if( !text && typeof text !== "string" ) {
      return;
    }
    return text.replace(re_quote, function (matched_str, dquo, squo) {
      var classname = dquo ? "dquo" : "quo"
        , quote = dquo ? dquo : squo;

      return [matched_str.slice(0, matched_str.lastIndexOf(quote)),   // all before quote
        '<span class="', classname, '">', quote, '</span>'].join('');
    });
  };

  /**
   * Replaces the space between the last two words in a string with ``&nbsp;``
   * Works in these block tags ``(h1-h6, p, li, dd, dt)`` and also accounts for
   * potential closing inline elements ``a, em, strong, span, b, i``
   *
   */
  var widont = typogr.widont = function(text) {
    var inline_tags = 'a|em|span|strong|i|b'
    var word = '(?:<(?:'+inline_tags+')[^>]*?>)*?[^\\s<>]+(?:</(?:'+inline_tags+')[^>]*?>)*?'
    var re_widont = re(
          '('+                                                     // matching group 1
            '\\s+'+word+                                           // space and a word with a possible bordering tag
            '\\s+'+word+                                           // space and a word with a possible bordering tag
          ')'+
          '(?:\\s+)'+                                              // one or more space characters
          '('+                                                     // matching group 2
            '[^<>\\s]+'+                                           // nontag/nonspace characters
            '(?:\\s*</(?:a|em|span|strong|i|b)[^>]*?>\\s*\\.*)*?'+ // one or more inline closing tags
                                                                   // can be surronded by spaces
                                                                   // and followed by a period.
            '(?:\\s*?</(?:p|h[1-6]|li|dt|dd)>|$)'+                 // allowed closing tags or end of line
          ')', 'gi');
    return text.replace(re_widont, '$1<span class="widont">&nbsp;</span>$2');
  };

  /**
   * Wraps multiple capital letters in ``<span class="caps">``
   * so they can be styled with CSS.
   *
   */
  var caps = typogr.caps = function(text) {
    var tokens = tokenize(text)
      , result = []
      , in_skipped_tag = false
      , close_match
      , re_cap = re(
          '('+
            '(\\b[A-Z\\d]*'+      // Group 2: Any amount of caps and digits
            '[A-Z]\\d*[A-Z]'+     // A cap string must at least include two caps
                                  // (but they can have digits between them)
            '[A-Z\\d\']*\\b)'+    // Any amount of caps and digits or dumb apostsrophes
            '|(\\b[A-Z]+\\.\\s?'+  // OR: Group 3: Some caps, followed by a '.' and an optional space
            '(?:[A-Z]+\\.\\s?)+)'+ // Followed by the same thing at least once more
            '(?:\\s|\\b|$)'+
          ')', 'g'
        );

      tokens.forEach( function (token) {

        if (token.type === 'tag') {
          result.push(token.txt);

          close_match = re_skip_tags.exec(token.txt);
          if (close_match && close_match[1] === undefined) {
            in_skipped_tag = true;
          } else {
            in_skipped_tag = false;
          }
        }
        else {
          if (in_skipped_tag) {
            result.push(token.txt);
          }
          else {
            result.push(token.txt.replace(re_cap, function (matched_str, g1, g2, g3) {
              // This is necessary to keep dotted cap strings to pick up extra spaces
              var caps, tail;
              if ( g2 ) {
                return '<span class="caps">%s</span>'.replace('%s', g2);
              } else {
                if ( g3.slice(-1) === ' ' ) {
                  caps = g3.slice(0, -1);
                  tail = ' ';
                } else {
                  caps = g3;
                  tail = '';
                }
                return '<span class="caps">%s1</span>%s2'.replace('%s1', caps).replace('%s2', tail);
              }
            }));
          }
        }
      });

      return result.join('');
  };

  /**
   * Applies the following filters: widont, smartypants,
   * amp, quotes
   */
  typogr.typogrify = function(src) {
    var text = src;
    if (src.jquery && src.html) {
      text = src.html();
    }

    text = amp(text);
    text = widont(text);
    text = smartypants(text);
    text = caps(text);
    text = initQuotes(text);
    text = ord(text);
    return text;
  };

  // SmartyPants functions
  // ---------------------

  /**
   * Translates plain ASCII punctuation characters into 
   * "smart" typographic punctuation HTML entities.
   */
  var smartypants = typogr.smartypants = function(text) {
    var tokens = tokenize(text)
      , result = []
      , skipped_tag_stack = []
      , skipped_tag = ''
      , skip_match = ''
      , in_pre = false
        // This is a cheat, used to get some context for one-character
        // tokens that consist of just a quote char. What we do is remember
        // the last character of the previous text token, to use as context
        // to curl single-character quote tokens correctly.
      , prev_token_last_char = ''
      , last_char
        // current token
      , t;

    tokens.forEach( function (token) {
      if (token.type === 'tag') {
        // Don't mess with quotes inside some tags.
        // This does not handle self <closing/> tags!
        result.push(token.txt);

        // is it a skipped tag ?
        if ( (skip_match = re_skip_tags.exec(token.txt)) !== null  ) {
          skipped_tag = skip_match[2].toLowerCase();

          // closing tag
          if ( skip_match[1] ) {
            if ( skipped_tag_stack.length > 0 ) {
              if ( skipped_tag === skipped_tag_stack[skipped_tag_stack.length-1] ) {
                skipped_tag_stack.pop();
              }
            }
            if (skipped_tag_stack.length === 0) {
              in_pre = false;
            }
          }
          // opening tag
          else {
            skipped_tag_stack.push(skipped_tag);
            in_pre = true;
          }
        }
      } else {
        t = token.txt;

        // Special case rock ’n’ roll—use apostrophes
        t = t.replace(/(rock )'n'( roll)/gi, '$1&#8217;n&#8217;$2');

        // Remember last char of this token before processing
        last_char = t.slice(-1);

        if ( !in_pre ) {
          t = smartEscapes(t);
          t = smartDashes(t);
          t = smartEllipses(t);
          // backticks need to be processed before quotes
          t = smartBackticks(t);
          // quotes
          switch(t) {
            case "'": // Special case: single-character ' token
              if (/\S/.test(prev_token_last_char)) {  t = '&#8217;'; }
                                              else {  t = '&#8216;'; }
              break;
            case '"': // Special case: single-character " token
              if (/\S/.test(prev_token_last_char)) {  t = '&#8221;'; }
                                              else {  t = '&#8220;'; }
              break;
            default:  // Normal case
              t = smartQuotes(t);
          }
        }

        prev_token_last_char = last_char;
        result.push(t);
      }
    });

    return result.join('');
  };

  /**
   * Returns an array of the tokens comprising the input string.
   * Each token is either a tag (possibly with nested, tags contained
   * therein, such as <a href="<MTFoo>">, or a run of text between tags.
   * Each element of the array is an object with properties 'type' and 'txt';
   * Values for 'type': 'tag' or 'text'; 'txt' is the actual value.
   *
   */
  var tokenize = typogr.tokenize = function(text) {
    var tokens = []
      , lastIndex = 0
      , re_tag = /([^<]*)(<[^>]*>)/gi
      , curr_token;

    while ( (curr_token = re_tag.exec(text)) !== null ) {
      var pre_text = curr_token[1]
        , tag_text = curr_token[2];

      if (pre_text) {
        tokens.push({ type: 'text', txt: pre_text });
      }
      tokens.push({ type: 'tag', txt: tag_text });
      lastIndex = re_tag.lastIndex;
    }

    if (re_tag.lastIndex <= text.length) {
        // if last char is a dot and not a '…'
        // then push two tokens
        if (text.slice(-1) == "." && text.slice(-2) != '..' ) {
          tokens.push({ type: 'text', txt: text.slice(lastIndex, text.length-1) });
          tokens.push({ type: 'text', txt: text.slice(-1) });
        }
        else {
          tokens.push({ type: 'text', txt: text.slice(lastIndex) });
        }
    }

    return tokens;
  };

  /**
   * Returns input string, with after processing the following backslash
   * escape sequences. This is useful if you want to force a "dumb"
   * quote or other character to appear.
   *
   */
  var smartEscapes = typogr.smartEscapes = function(text) {
    return text.replace(/\\"/g,   '&#34;')
               .replace(/\\'/g,   '&#39;')
               .replace(/\\-/g,   '&#45;')
               .replace(/\\\./g,  '&#46;')
               .replace(/\\\\/g,  '&#92;')
               .replace(/\\`/g,   '&#96;');
  };

  /**
   * Returns input text, with each instance of "--"
   * translated to an em-dash HTML entity.
   *
   */
  var smartDashes = typogr.smartDashes = function(text) {
    return text.replace(/---/g, '&#8212;')    // em  (yes, backwards)
               .replace(/([^<][^!]|[^!]|^)--(?!>)/g,  '$1&#8211;');  // en  (yes, backwards)
  };

  /**
   * Returns input string, with each instance of "..."
   * translated to an ellipsis HTML entity.
   *
   */
  var smartEllipses = typogr.smartEllipses = function(text) {
    return text.replace(/\.\.\./g,    '&#8230;')
               .replace(/\. \. \./g,  '&#8230;');
  };

  /**
   * Returns input string, with ``backticks'' -style double quotes
   * translated into HTML curly quote entities.
   *
   */
  var smartBackticks = typogr.smartBackticks = function(text) {
    return text.replace(/``/g,  '&#8220;')
               .replace(/''/g,  '&#8221;');
  };


  /**
   * Returns input string, with "educated" curly quote
   * HTML entities.
   *
   */
  var smartQuotes = typogr.smartQuotes = function(text) {
    var punct_cls     = '[!"#\\$\\%\\\'()*+,-.\\/:;<=>?\\@\\[\\\\]\\^_`{|}~]'
      , re_punct_str  = '(?=%s\\B)'.replace('%s', punct_cls)
      , close_cls = '[^\\ \\t\\r\\n\\[\\{\\(\\-]'
      , dec_dashes = '&#8211;|&#8212;'
      , re_opening_single_quotes = re(
          '('+
                      '\\s|'+     // a whitespace char, or
                   '&nbsp;|'+     // a non-breaking space entity, or
                       '--|'+     // dashes, or
               '&[mn]dash;|'+     // named dash entities
            dec_dashes + '|'+     // or decimal entities
             '&#x201[34];'+       // or hex
          ')'+
          '\''+                   // the quote
         '(?=\\w)', 'g')          // followed by a word character
      , re_closing_single_quotes = re(
          '('+close_cls+')'+
          '\''+                       //                      *
          '(?!\\s | s\\b | \\d)' , 'g')  // ??? may be: '(?!\s | \s\b | \d)'
      , re_closing_single_quotes2 = re(
          '('+close_cls+')'+
          '\''+                   //                      *
          '(?!\\s | s\\b)', 'g')    // ??? may be: '(?!\s | \s\b)'
      , re_opening_double_quotes = re(
          '('+
                      '\\s|'+     // a whitespace char, or
                   '&nbsp;|'+     // a non-breaking space entity, or
                       '--|'+     // dashes, or
               '&[mn]dash;|'+     // named dash entities
            dec_dashes + '|'+     // or decimal entities
             '&#x201[34];'+       // or hex
          ')'+
          '"'+                    // the quote
          '(?=\\w)', 'g')         // followed by a word character
      , re_closing_double_quotes  = re('"(?=\\s)' , 'g')
      , re_closing_double_quotes2 = re('('+close_cls+')"', 'g');

    return text
        // Special case if the very first character is a quote
        // followed by punctuation at a non-word-break.
        // Close the quotes by brute force:
        .replace(re("^'%s".replace('%s', re_punct_str), 'g'), '&#8217;')
        .replace(re('^"%s'.replace('%s', re_punct_str), 'g'), '&#8221;')

        // Special case for double sets of quotes, e.g.:
        //  <p>He said, "'Quoted' words in a larger quote."</p>
        .replace(/"'(?=\w)/g, '&#8220;&#8216;')
        .replace(/'"(?=\w)/g, '&#8216;&#8220;')

        // Special case for decade abbreviations (the '80s):
        .replace(/\b'(?=\d{2}s)/g, '&#8217;')

        // Opening single quotes
        .replace(re_opening_single_quotes, '$1&#8216;')
        // Closing single quotes
        .replace(re_closing_single_quotes, '$1&#8217;')
        .replace(re_closing_single_quotes2,'$1&#8217;$2')
        // Any remaining single quotes should be closing ones
        .replace("'", '&#8217;')

        // Opening double quotes
        .replace(re_opening_double_quotes, '$1&#8220;')
        // Closing double quotes
        .replace(re_closing_double_quotes, '&#8221;')
        .replace(re_closing_double_quotes2,'$1&#8221;')
        // Any remaining quotes should be opening ones.
        .replace('"', '&#8220;');
  };

  // OOP internals
  // PS: Underscore rulez

  // If typogr is called as a function, it returns a wrapped object that
  // can be used OO-style. Wrapped objects may be chained
  var Wrapper = function(obj) { this._wrapped = obj; };

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? typogr(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    Wrapper.prototype[name] = function() {
      return result( func.call(typogr, this._wrapped), this._chain);
    };
  };

  // Is a given value a function?
  var isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  };

  // Add all of the typogr functions to the wrapper object.
  var name;
  for (name in typogr) {
    if ( typogr.hasOwnProperty(name) && isFunction(typogr[name]) ) {
      addToWrapper(name, typogr[name]);
    }
  }

  // Start chaining a wrapped typogr object.
  Wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  Wrapper.prototype.value = function() {
    return this._wrapped;
  };

}(this));
