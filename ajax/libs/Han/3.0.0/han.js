/*!
 * 漢字標準格式 v3.0.0 | MIT License | css.hanzi.co
 * Han: CSS typography framework optimised for Hanzi
 */

void (function( global, factory ) {

  // CommonJS
  if ( typeof module === 'object' && typeof module.exports === 'object' ) {
    module.exports = factory( global, true )
  } else {
    factory( global )
  }

})( typeof window !== 'undefined' ? window : this, function( window, noGlobalNS ) {

  'use strict'

var document = window.document

var root = document.documentElement

var body = document.body



var VERSION = '3.0.0',

    ROUTINE = [
      // Initialise the condition with feature-detecting
      // classes (Modernizr-alike), binding onto the root
      // element, possibly `<html>`.
      'initCond',
      // Address element normalisation
      'renderElem',
      // Handle Biaodian
      //'jinzify',
      'renderJiya',
      // Address Hanzi and Western script mixed spacing
      'renderHWS',
      // Address Basic Biaodian correction in Firefox
      'correctBasicBD',
      // Address presentational correction to combining ligatures
      'substCombLigaWithPUA'
      // Address semantic correction to inaccurate characters
      // **Note:** inactivated by default
      // 'substInaccurateChar'
    ],

    // Define Han
    Han = function( context, condition ) {
      return new Han.fn.init( context, condition )
    },

    init = function() {
      if ( arguments[ 0 ] ) {
        this.context = arguments[ 0 ]
      }
      if ( arguments[ 1 ] ) {
        this.condition = arguments[ 1 ]
      }
      return this
    }

Han.fn = Han.prototype = {
  version: VERSION,

  constructor: Han,

  // Body as the default target context
  context: body,

  // Root element as the default condition
  condition: root,

  // Default rendering routine
  routine: ROUTINE,

  init: init,

  setRoutine: function( routine ) {
    if ( Array.isArray( routine )) {
      this.routine = routine
    }
    return this
  },

  // Note that the routine set up here will execute
  // only once. The method won't alter the routine in
  // the instance or in the prototype chain.
  render: function( routine ) {
    var that = this,
        routine = Array.isArray( routine ) ?
          routine : this.routine

    routine
    .forEach(function( method ) {
      try {
        if ( typeof method === 'string' ){
          that[ method ]()
        } else if ( Array.isArray( method )) {
          that[ method.shift() ].apply( that, method )
        }
      } catch ( e ) {}
    })
    return this
  }
}

Han.fn.init.prototype = Han.fn

/**
 * Shortcut for `render()` under the default
 * situation.
 *
 * Once initialised, replace `Han.init` with the
 * instance for future usage.
 */
Han.init = function() {
  return Han.init = Han().render()
}


var UNICODE = {
      /**
       * Western punctuation (西文標點符號)
       */
      punct: {
        base:   '[\u2026,.;:!?\u203D_]',
        sing:   '[\u2010-\u2014\u2026]',
        middle: '[\\\/~\\-&\u2010-\u2014_]',
        open:   '[\'"‘“\\(\\[\u00A1\u00BF\u2E18\u00AB\u2039\u201A\u201C\u201E]',
        close:  '[\'"”’\\)\\]\u00BB\u203A\u201B\u201D\u201F]',
        end:    '[\'"”’\\)\\]\u00BB\u203A\u201B\u201D\u201F\u203C\u203D\u2047-\u2049,.;:!?]',
      },

      /**
       * CJK biaodian (CJK標點符號)
       */
      biaodian: {
        base:   '[︰．、，。：；？！ー]',
        liga:   '[—…⋯]',
        middle: '[·＼／－゠\uFF06\u30FB\uFF3F]',
        open:   '[「『《〈（〔［｛【〖]',
        close:  '[」』》〉）〕］｝】〗]',
        end:    '[」』》〉）〕］｝】〗︰．、，。：；？！ー]'
      },

      /**
       * CJK-related blocks (CJK相關字符區段)
       *
       *  1. 中日韓統一表意文字：[\u4E00-\u9FFF]
             Basic CJK unified ideographs
       *  2. 擴展-A區：[\u3400-\u4DB5]
             Extended-A
       *  3. 擴展-B區：[\u20000-\u2A6D6]（[\uD840-\uD869][\uDC00-\uDED6]）
             Extended-B
       *  4. 擴展-C區：[\u2A700-\u2B734]（\uD86D[\uDC00-\uDF3F]|[\uD86A-\uD86C][\uDC00-\uDFFF]|\uD869[\uDF00-\uDFFF]）
             Extended-C
       *  5. 擴展-D區：[\u2B740-\u2B81D]（急用漢字，\uD86D[\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1F]）
             Extended-D
       *  6. 擴展-E區：[\u2B820-\u2F7FF]（暫未支援）
             Extended-E (not supported yet)
       *  7. 擴展-F區（暫未支援）
             Extended-F (not supported yet)
       *  8. 筆畫區：[\u31C0-\u31E3]
             Strokes
       *  9. 表意數字「〇」：[\u3007]
             Ideographic number zero
       * 10. 相容表意文字及補充：[\uF900-\uFAFF][\u2F800-\u2FA1D]（不使用）
             Compatibility ideograph and supplement (not supported)

             12 exceptions:
             [\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]

             https://zh.wikipedia.org/wiki/中日韓統一表意文字#cite_note-1

       * 11. 康熙字典及簡化字部首：[\u2F00-\u2FD5\u2E80-\u2EF3]
             Kangxi and supplement radicals
       * 12. 表意文字描述字元：[\u2FF0-\u2FFA]
             Ideographic description characters
       */
      hanzi: {
        base:    '[\u4E00-\u9FFF\u3400-\u4DB5\u31C0-\u31E3\u3007\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF]|\uD86D[\uDC00-\uDF3F]|[\uD86A-\uD86C][\uDC00-\uDFFF]|\uD869[\uDF00-\uDFFF]|\uD86D[\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1F]',
        desc:    '[\u2FF0-\u2FFA]',
        radical: '[\u2F00-\u2FD5\u2E80-\u2EF3]'
      },

      /**
       * Latin script blocks (拉丁字母區段)
       *
       * 1. 基本拉丁字母：A-Za-z
            Basic Latin
       * 2. 阿拉伯數字：0-9
            Digits
       * 3. 補充-1：[\u00C0-\u00FF]
            Latin-1 supplement
       * 4. 擴展-A區：[\u0100-\u017F]
            Extended-A
       * 5. 擴展-B區：[\u0180-\u024F]
            Extended-B
       * 5. 擴展-C區：[\u2C60-\u2C7F]
            Extended-C
       * 5. 擴展-D區：[\uA720-\uA7FF]
            Extended-D
       * 6. 附加區：[\u1E00-\u1EFF]
            Extended additional
       * 7. 變音組字符：[\u0300-\u0341\u1DC0-\u1DFF]
            Combining diacritical marks
       */
      latin: {
        base:    '[A-Za-z0-9\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u2C60-\u2C7F\uA720-\uA7FF\u1E00-\u1EFF]',
        combine: '[\u0300-\u0341\u1DC0-\u1DFF]'
      },

      /**
       * Elli̱niká (Greek) script blocks (希臘字母區段)
       *
       * 1. 希臘字母及擴展：[\u0370–\u03FF\u1F00-\u1FFF]
            Basic Greek & Greek Extended
       * 2. 阿拉伯數字：0-9
            Digits
       * 3. 希臘字母變音組字符：[\u0300-\u0345\u1DC0-\u1DFF]
            Combining diacritical marks
       */
      ellinika: {
        base:    '[0-9\u0370-\u03FF\u1F00-\u1FFF]',
        combine: '[\u0300-\u0345\u1DC0-\u1DFF]'
      },

      /**
       * Kirillica (Cyrillic) script blocks (西里爾字母區段)
       *
       * 1. 西里爾字母及補充：[\u0400-\u0482\u048A-\u04FF\u0500-\u052F]
            Basic Cyrillic and supplement
       * 2. 擴展B區：[\uA640-\uA66E\uA67E-\uA697]
            Extended-B
       * 3. 阿拉伯數字：0-9
            Digits
       * 4. 西里爾字母組字符：[\u0483-\u0489\u2DE0-\u2DFF\uA66F-\uA67D\uA69F]（位擴展A、B區）
            Cyrillic combining diacritical marks (in extended-A, B)
       */
      kirillica: {
        base:    '[0-9\u0400-\u0482\u048A-\u04FF\u0500-\u052F\uA640-\uA66E\uA67E-\uA697]',
        combine: '[\u0483-\u0489\u2DE0-\u2DFF\uA66F-\uA67D\uA69F]'
      },

      /**
       * Kana (假名)
       *
       * 1. 日文假名：[\u30A2\u30A4\u30A6\u30A8\u30AA-\u30FA\u3042\u3044\u3046\u3048\u304A-\u3094\u309F\u30FF]
            Japanese Kana
       * 2. 假名補充[\u1B000\u1B001]（\uD82C[\uDC00-\uDC01]）
            Kana supplement
       * 3. 日文假名小寫：[\u3041\u3043\u3045\u3047\u3049\u30A1\u30A3\u30A5\u30A7\u30A9\u3063\u3083\u3085\u3087\u308E\u3095\u3096\u30C3\u30E3\u30E5\u30E7\u30EE\u30F5\u30F6\u31F0-\u31FF]
            Japanese small Kana
       * 4. 假名組字符：[\u3099-\u309C]
            Kana combining characters
       * 5. 半形假名：[\uFF66-\uFF9F]
            Halfwidth Kana
       * 6. 符號：[\u309D\u309E\u30FB-\u30FE]
            Marks
       */
      kana: {
        base:    '[\u30A2\u30A4\u30A6\u30A8\u30AA-\u30FA\u3042\u3044\u3046\u3048\u304A-\u3094\u309F\u30FF]|\uD82C[\uDC00-\uDC01]',
        small:   '[\u3041\u3043\u3045\u3047\u3049\u30A1\u30A3\u30A5\u30A7\u30A9\u3063\u3083\u3085\u3087\u308E\u3095\u3096\u30C3\u30E3\u30E5\u30E7\u30EE\u30F5\u30F6\u31F0-\u31FF]',
        combine: '[\u3099-\u309C]',
        half:    '[\uFF66-\uFF9F]',
        mark:    '[\u30A0\u309D\u309E\u30FB-\u30FE]'
      },

      /**
       * Eonmun (Hangul, 諺文)
       *
       * 1. 諺文音節：[\uAC00-\uD7A3]
            Eonmun (Hangul) syllables
       * 2. 諺文字母：[\u1100-\u11FF\u314F-\u3163\u3131-\u318E\uA960-\uA97C\uD7B0-\uD7FB]
            Eonmun (Hangul) letters
       * 3. 半形諺文字母：[\uFFA1-\uFFDC]
            Halfwidth Eonmun (Hangul) letters
       */
      eonmun: {
        base:    '[\uAC00-\uD7A3]',
        letter:  '[\u1100-\u11FF\u314F-\u3163\u3131-\u318E\uA960-\uA97C\uD7B0-\uD7FB]',
        half:    '[\uFFA1-\uFFDC]'
      },

      /**
       * Zhuyin (注音符號, Mandarin & Dialect Phonetic Symbols)
       *
       * 1. 國語注音、方言音符號：[\u3105-\u312D][\u31A0-\u31BA]
            Bopomofo phonetic symbols
       * 2. 國語陰陽上去聲調號：[\u02D9\u02CA\u02C5\u02C7\u02CB] （**註：**三聲包含乙個不合規範的符號）
            Tones for Mandarin
       * 3. 方言音陰、陽去聲調號：[\u02EA\u02EB]
            Departing tones in dialects
       * 4. 方言音陰、陽入韻：[\u31B4-\u31B7][\u0358\u030d]?
            Checked tones in dialects
       */
      zhuyin: {
        base:    '[\u3105-\u312D\u31A0-\u31BA]',
        initial: '[\u3105-\u3119\u312A-\u312C\u31A0-\u31A3]',
        medial:  '[\u3127-\u3129]',
        final:   '[\u311A-\u3129\u312D\u31A4-\u31B3\u31B8-\u31BA]',
        tone:    '[\u02D9\u02CA\u02C5\u02C7\u02CB\u02EA\u02EB]',
        ruyun:   '[\u31B4-\u31B7][\u0358\u030d]?'
      }
    }


var TYPESET = (function() {
      var rWhite = '[\\x20\\t\\r\\n\\f]',
          // Whitespace characters
          // http://www.w3.org/TR/css3-selectors/#whitespace

          rPtOpen = UNICODE.punct.open,
          rPtClose = UNICODE.punct.close,
          rPtEnd = UNICODE.punct.end,
          rPtMid = UNICODE.punct.middle,
          rPtSing = UNICODE.punct.sing,
          rPt = rPtOpen + '|' + rPtEnd + '|' + rPtMid,

          rBdOpen = UNICODE.biaodian.open,
          rBdClose = UNICODE.biaodian.close,
          rBdEnd = UNICODE.biaodian.end,
          rBdMid = UNICODE.biaodian.middle,
          rBdLiga = UNICODE.biaodian.liga + '{2}',
          rBd = rBdOpen + '|' + rBdEnd + '|' + rBdMid,

          rKana = UNICODE.kana.base + UNICODE.kana.combine + '?',
          rKanaS = UNICODE.kana.small + UNICODE.kana.combine + '?',
          rKanaH = UNICODE.kana.half,
          rEon = UNICODE.eonmun.base + '|' + UNICODE.eonmun.letter,
          rEonH = UNICODE.eonmun.half,

          rHan = UNICODE.hanzi.base + '|' + UNICODE.hanzi.desc + '|' + UNICODE.hanzi.radical + '|' + rKana,

          rCbn = UNICODE.ellinika.combine,
          rLatn = UNICODE.latin.base + rCbn + '*',
          rGk = UNICODE.ellinika.base + rCbn + '*',

          rCyCbn = UNICODE.kirillica.combine,
          rCy = UNICODE.kirillica.base + rCyCbn + '*',

          rAlph = rLatn + '|' + rGk + '|' + rCy,

          // For words like `it's`, `Jones’s` or `'99`
          rApo = '[\u0027\u2019]',
          rChar = rHan + '|(' + rAlph + '|' + rApo + ')+',

          rZyS = UNICODE.zhuyin.initial,
          rZyJ = UNICODE.zhuyin.medial,
          rZyY = UNICODE.zhuyin.final,
          rZyD = UNICODE.zhuyin.tone + '|' + UNICODE.zhuyin.ruyun

      return {
        /* Character-level selector (字級選擇器)
         */
        char: {
          punct: {
            all:   new RegExp( '(' + rPt + ')', 'g' ),
            open:  new RegExp( '(' + rPtOpen + ')', 'g' ),
            end:   new RegExp( '(' + rPtEnd + ')', 'g' ),
            sing:  new RegExp( '(' + rPtSing + ')', 'g' )
          },

          biaodian: {
            all:   new RegExp( '(' + rBd + ')', 'g' ),
            open:  new RegExp( '(' + rBdOpen + ')', 'g' ),
            close: new RegExp( '(' + rBdClose + ')', 'g' ),
            end:   new RegExp( '(' + rBdEnd + ')', 'g' ),
            liga:  new RegExp( '(' + rBdLiga + ')', 'g' ),

            group: [
              new RegExp( '(' + rBdOpen + '|' + rBdMid + '|' + rBdEnd + '){2,}', 'g' ),
              new RegExp( '(' + rBdLiga + rBdOpen + ')', 'g' )
            ]
          },

          hanzi: {
            individual: new RegExp( '(' + rHan + ')', 'g' ),
            group:      new RegExp( '(' + rHan + ')+', 'g' )
          },

          word: new RegExp( '(' + rLatn + '|' + rGk + '|' + rCy + '|' + rPt + ')+', 'ig' ),

          alphabet: {
            latin:       new RegExp( '(' + rLatn + ')', 'ig' ),
            ellinika:    new RegExp( '(' + rGk + ')', 'ig' ),
            kirillica:   new RegExp( '(' + rCy + ')', 'ig' ),
            kana:        new RegExp( '(' + rKana + ')', 'g' ),
            smallkana:   new RegExp( '(' + rKanaS + ')', 'g' ),
            eonmun:      new RegExp( '(' + rEon + ')', 'g' ),
            halfeonmun:  new RegExp( '(' + rEonH + ')', 'g' )
          }
        },

        /* Punctuation Rules (禁則)
         */
        jinze: {
          touwei:   new RegExp( '(' + rBdOpen + '+)(' + rChar + ')(' + rBdEnd + '+)', 'ig' ),
          tou:      new RegExp( '(' + rBdOpen + '+)(' + rChar + ')', 'ig' ),
          wei:      new RegExp( '(' + rChar + ')(' + rBdEnd + '+)', 'ig' ),
          middle:   new RegExp( '(' + rChar + ')(' + rBdMid + ')(' + rChar + ')', 'ig' )
        },

        zhuyin: {
          form:     new RegExp( '^\u02D9?(' + rZyS + ')?(' + rZyJ + ')?(' + rZyY + ')?(' + rZyD + ')?$' ),
          diao:     new RegExp( '(' + rZyD + ')', 'g' )
        },

        /* Hanzi and Western mixed spacing (漢字西文混排間隙)
         * - Basic mode
         * - Strict mode
         */
        hws: {
          base: [
            new RegExp( '('+ rHan +')(' + rAlph + '|' + rPtOpen + ')', 'ig' ),
            new RegExp( '('+ rAlph+ '|' + rPtEnd +')(' + rHan + ')', 'ig' )
          ],

          strict: [
            new RegExp( '('+ rHan +')' + rWhite + '?(' + rAlph + '|' + rPtOpen + ')', 'ig' ),
            new RegExp( '('+ rAlph+ '|' + rPtEnd +')' + rWhite + '?(' + rHan + ')', 'ig' )
          ]
        },

        // The feature displays the following characters
        // in its variant form for font consistency and
        // presentational reason. Meanwhile, this won't
        // alter the original character in the DOM.
        'display-as': {
          'ja-font-for-hant': [
            // '夠 够',
            '查 査',
            '啟 啓',
            '鄉 鄕',
            '值 値',
            '污 汚'
          ],

          'comb-liga-pua': [
            [ '\u0061[\u030d\u0358]', '\uDB80\uDC61' ],
            [ '\u0065[\u030d\u0358]', '\uDB80\uDC65' ],
            [ '\u0069[\u030d\u0358]', '\uDB80\uDC69' ],
            [ '\u006F[\u030d\u0358]', '\uDB80\uDC6F' ],
            [ '\u0075[\u030d\u0358]', '\uDB80\uDC75' ],

            [ '\u31B4[\u030d\u0358]', '\uDB8C\uDDB4' ],
            [ '\u31B5[\u030d\u0358]', '\uDB8C\uDDB5' ],
            [ '\u31B6[\u030d\u0358]', '\uDB8C\uDDB6' ],
            [ '\u31B7[\u030d\u0358]', '\uDB8C\uDDB7' ]
          ]
        },

        // The feature actually *converts* the character
        // in the DOM for semantic reason.
        //
        // Note that this could be aggressive.
        'inaccurate-char': [
          [ '[\u2022\u2027]', '\u00B7' ],
          [ '\u22EF\u22EF', '\u2026\u2026' ],
          [ '\u2500\u2500', '\u2014\u2014' ],
          [ '\u2035', '\u2018' ],
          [ '\u2032', '\u2019' ],
          [ '\u2036', '\u201C' ],
          [ '\u2033', '\u201D' ]
        ]
      }
    })()


Han.UNICODE = UNICODE
Han.TYPESET = TYPESET

// Aliases
Han.UNICODE.cjk      = Han.UNICODE.hanzi
Han.UNICODE.greek    = Han.UNICODE.ellinika
Han.UNICODE.cyrillic = Han.UNICODE.kirillica
Han.UNICODE.hangul   = Han.UNICODE.eonmun

Han.TYPESET.char.cjk               = Han.TYPESET.char.hanzi
Han.TYPESET.char.alphabet.greek    = Han.TYPESET.char.alphabet.ellinika
Han.TYPESET.char.alphabet.cyrillic = Han.TYPESET.char.alphabet.kirillica
Han.TYPESET.char.alphabet.hangul   = Han.TYPESET.char.alphabet.eonmun


var $ = {
      // Simplified query selectors which return the node list
      // in an array
      id: function( selector, context ) {
        return ( context || document ).getElementById( selector )
      },

      tag: function( selector, context ) {
        return this.makeArray(
          ( context || document ).getElementsByTagName( selector )
        )
      },

      qsa: function( selector, context ) {
        return this.makeArray(
          ( context || document ).querySelectorAll( selector )
        )
      },

      // Create a document fragment, a text node with text
      // or an element with/without classes
      create: function( elem, clazz ) {
        var elem = '!' === elem ?
              document.createDocumentFragment() :
              '' === elem ?
                document.createTextNode( clazz || '' ) :
                document.createElement( elem )

        try {
          if ( clazz ) {
            elem.className = clazz
          }
        } catch ( e ) {}

        return elem
      },

      // Clone a node (text, element or fragment) deeply or
      // childlessly
      clone: function( node, deep ) {
        return node.cloneNode( deep || true )
      },

      // Remove a node (text, element or fragment)
      remove: function( node, parent ) {
        return ( parent || node.parentNode ).removeChild( node )
      },

      // Set attributes all in once with an object
      setAttr: function( target, attr ) {
        var len = attr.length

        if ( typeof attr !== 'object' ) {
          return
        }

        // Native NamedNodeMap
        if (
          typeof attr[ 0 ] === 'object' &&
          'name' in attr[ 0 ]
        ) {
          for ( var i = 0; i < len; i++ ) {
            if ( attr[ i ].value !== undefined ) {
              target.setAttribute( attr[ i ].name, attr[ i ].value )
            }
          }

        // Plain object
        } else {
          for ( var name in attr ) {
            if (
              attr.hasOwnProperty( name ) &&
              attr[ name ] !== undefined
            ) {
              target.setAttribute( name, attr[ name ] )
            }
          }
        }
        return target
      },

      // Return if the current node should be ignored,
      // `<wbr>` or comments
      isIgnorable: function( node ) {
        return node.nodeName === 'WBR' ||
          node.nodeType === Node.COMMENT_NODE
      },

      // Convert array-like objects into real arrays
      // for the native prototype methods
      makeArray: function( obj ) {
        return Array.prototype.slice.call( obj )
      },

      // Extend target with an object
      extend: function( target, object ) {
        var isExtensible = typeof target === 'object' ||
              typeof target === 'function' ||
              typeof object === 'object'

        if ( !isExtensible ) {
          return
        }

        for ( var name in object ) {
          if ( object.hasOwnProperty( name )) {
            target[ name ] = object[ name ]
          }
        }
        return target
      }
    }
var findAndReplaceDOMText =
/**
 * findAndReplaceDOMText v 0.4.2
 * @author James Padolsey http://james.padolsey.com
 * @license http://unlicense.org/UNLICENSE
 *
 * Matches the text of a DOM node against a regular expression
 * and replaces each match (or node-separated portions of the match)
 * in the specified element.
 */
(function() {

	var PORTION_MODE_RETAIN = 'retain';
	var PORTION_MODE_FIRST = 'first';

	var doc = document;
	var toString = {}.toString;

	function isArray(a) {
		return toString.call(a) == '[object Array]';
	}

	function escapeRegExp(s) {
		return String(s).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	}

	function exposed() {
		// Try deprecated arg signature first:
		return deprecated.apply(null, arguments) || findAndReplaceDOMText.apply(null, arguments);
	}

	function deprecated(regex, node, replacement, captureGroup, elFilter) {
		if ((node && !node.nodeType) && arguments.length <= 2) {
			return false;
		}
		var isReplacementFunction = typeof replacement == 'function';

		if (isReplacementFunction) {
			replacement = (function(original) {
				return function(portion, match) {
					return original(portion.text, match.startIndex);
				};
			}(replacement));
		}

		// Awkward support for deprecated argument signature (<0.4.0)
		var instance = findAndReplaceDOMText(node, {

			find: regex,

			wrap: isReplacementFunction ? null : replacement,
			replace: isReplacementFunction ? replacement : '$' + (captureGroup || '&'),

			prepMatch: function(m, mi) {

				// Support captureGroup (a deprecated feature)

				if (!m[0]) throw 'findAndReplaceDOMText cannot handle zero-length matches';

				if (captureGroup > 0) {
					var cg = m[captureGroup];
					m.index += m[0].indexOf(cg);
					m[0] = cg;
				}

				m.endIndex = m.index + m[0].length;
				m.startIndex = m.index;
				m.index = mi;

				return m;
			},
			filterElements: elFilter
		});

		exposed.revert = function() {
			return instance.revert();
		};

		return true;
	}

	/**
	 * findAndReplaceDOMText
	 *
	 * Locates matches and replaces with replacementNode
	 *
	 * @param {Node} node Element or Text node to search within
	 * @param {RegExp} options.find The regular expression to match
	 * @param {String|Element} [options.wrap] A NodeName, or a Node to clone
	 * @param {String|Function} [options.replace='$&'] What to replace each match with
	 * @param {Function} [options.filterElements] A Function to be called to check whether to
	 *	process an element. (returning true = process element,
	 *	returning false = avoid element)
	 */
	function findAndReplaceDOMText(node, options) {
		return new Finder(node, options);
	}

	exposed.Finder = Finder;

	/**
	 * Finder -- encapsulates logic to find and replace.
	 */
	function Finder(node, options) {

		options.portionMode = options.portionMode || PORTION_MODE_RETAIN;

		this.node = node;
		this.options = options;

		// ENable match-preparation method to be passed as option:
		this.prepMatch = options.prepMatch || this.prepMatch;

		this.reverts = [];

		this.matches = this.search();

		if (this.matches.length) {
			this.processMatches();
		}

	}

	Finder.prototype = {

		/**
		 * Searches for all matches that comply with the instance's 'match' option
		 */
		search: function() {

			var match;
			var matchIndex = 0;
			var regex = this.options.find;
			var text = this.getAggregateText();
			var matches = [];

			regex = typeof regex === 'string' ? RegExp(escapeRegExp(regex), 'g') : regex;

			if (regex.global) {
				while (match = regex.exec(text)) {
					matches.push(this.prepMatch(match, matchIndex++));
				}
			} else {
				if (match = text.match(regex)) {
					matches.push(this.prepMatch(match, 0));
				}
			}

			return matches;

		},

		/**
		 * Prepares a single match with useful meta info:
		 */
		prepMatch: function(match, matchIndex) {

			if (!match[0]) {
				throw new Error('findAndReplaceDOMText cannot handle zero-length matches');
			}

			match.endIndex = match.index + match[0].length;
			match.startIndex = match.index;
			match.index = matchIndex;

			return match;
		},

		/**
		 * Gets aggregate text within subject node
		 */
		getAggregateText: function() {

			var elementFilter = this.options.filterElements;

			return getText(this.node);

			/**
			 * Gets aggregate text of a node without resorting
			 * to broken innerText/textContent
			 */
			function getText(node) {

				if (node.nodeType === 3) {
					return node.data;
				}

				if (elementFilter && !elementFilter(node)) {
					return '';
				}

				var txt = '';

				if (node = node.firstChild) do {
					txt += getText(node);
				} while (node = node.nextSibling);

				return txt;

			}

		},

		/**
		 * Steps through the target node, looking for matches, and
		 * calling replaceFn when a match is found.
		 */
		processMatches: function() {

			var matches = this.matches;
			var node = this.node;
			var elementFilter = this.options.filterElements;

			var startPortion,
				endPortion,
				innerPortions = [],
				curNode = node,
				match = matches.shift(),
				atIndex = 0, // i.e. nodeAtIndex
				matchIndex = 0,
				portionIndex = 0,
				doAvoidNode,
				nodeStack = [node];

			out: while (true) {

				if (curNode.nodeType === 3) {

					if (!endPortion && curNode.length + atIndex >= match.endIndex) {

						// We've found the ending
						endPortion = {
							node: curNode,
							index: portionIndex++,
							text: curNode.data.substring(match.startIndex - atIndex, match.endIndex - atIndex),
							indexInMatch: atIndex - match.startIndex,
							indexInNode: match.startIndex - atIndex, // always zero for end-portions
							endIndexInNode: match.endIndex - atIndex,
							isEnd: true
						};

					} else if (startPortion) {
						// Intersecting node
						innerPortions.push({
							node: curNode,
							index: portionIndex++,
							text: curNode.data,
							indexInMatch: atIndex - match.startIndex,
							indexInNode: 0 // always zero for inner-portions
						});
					}

					if (!startPortion && curNode.length + atIndex > match.startIndex) {
						// We've found the match start
						startPortion = {
							node: curNode,
							index: portionIndex++,
							indexInMatch: 0,
							indexInNode: match.startIndex - atIndex,
							endIndexInNode: match.endIndex - atIndex,
							text: curNode.data.substring(match.startIndex - atIndex, match.endIndex - atIndex)
						};
					}

					atIndex += curNode.data.length;

				}

				doAvoidNode = curNode.nodeType === 1 && elementFilter && !elementFilter(curNode);

				if (startPortion && endPortion) {

					curNode = this.replaceMatch(match, startPortion, innerPortions, endPortion);

					// processMatches has to return the node that replaced the endNode
					// and then we step back so we can continue from the end of the
					// match:

					atIndex -= (endPortion.node.data.length - endPortion.endIndexInNode);

					startPortion = null;
					endPortion = null;
					innerPortions = [];
					match = matches.shift();
					portionIndex = 0;
					matchIndex++;

					if (!match) {
						break; // no more matches
					}

				} else if (
					!doAvoidNode &&
					(curNode.firstChild || curNode.nextSibling)
				) {
					// Move down or forward:
					if (curNode.firstChild) {
						nodeStack.push(curNode);
						curNode = curNode.firstChild;
					} else {
						curNode = curNode.nextSibling;
					}
					continue;
				}

				// Move forward or up:
				while (true) {
					if (curNode.nextSibling) {
						curNode = curNode.nextSibling;
						break;
					}
					curNode = nodeStack.pop();
					if (curNode === node) {
						break out;
					}
				}

			}

		},

		/**
		 * Reverts ... TODO
		 */
		revert: function() {
			// Reversion occurs backwards so as to avoid nodes subsequently
			// replaced during the matching phase (a forward process):
			for (var l = this.reverts.length; l--;) {
				this.reverts[l]();
			}
			this.reverts = [];
		},

		prepareReplacementString: function(string, portion, match, matchIndex) {
			var portionMode = this.options.portionMode;
			if (
				portionMode === PORTION_MODE_FIRST &&
				portion.indexInMatch > 0
			) {
				return '';
			}
			string = string.replace(/\$(\d+|&|`|')/g, function($0, t) {
				var replacement;
				switch(t) {
					case '&':
						replacement = match[0];
						break;
					case '`':
						replacement = match.input.substring(0, match.startIndex);
						break;
					case '\'':
						replacement = match.input.substring(match.endIndex);
						break;
					default:
						replacement = match[+t];
				}
				return replacement;
			});

			if (portionMode === PORTION_MODE_FIRST) {
				return string;
			}

			if (portion.isEnd) {
				return string.substring(portion.indexInMatch);
			}

			return string.substring(portion.indexInMatch, portion.indexInMatch + portion.text.length);
		},

		getPortionReplacementNode: function(portion, match, matchIndex) {

			var replacement = this.options.replace || '$&';
			var wrapper = this.options.wrap;

			if (wrapper && wrapper.nodeType) {
				// Wrapper has been provided as a stencil-node for us to clone:
				var clone = doc.createElement('div');
				clone.innerHTML = wrapper.outerHTML || new XMLSerializer().serializeToString(wrapper);
				wrapper = clone.firstChild;
			}

			if (typeof replacement == 'function') {
				replacement = replacement(portion, match, matchIndex);
				if (replacement && replacement.nodeType) {
					return replacement;
				}
				return doc.createTextNode(String(replacement));
			}

			var el = typeof wrapper == 'string' ? doc.createElement(wrapper) : wrapper;

			replacement = doc.createTextNode(
				this.prepareReplacementString(
					replacement, portion, match, matchIndex
				)
			);

			if (!replacement.data) {
				return replacement;
			}

			if (!el) {
				return replacement;
			}

			el.appendChild(replacement);

			return el;
		},

		replaceMatch: function(match, startPortion, innerPortions, endPortion) {

			var matchStartNode = startPortion.node;
			var matchEndNode = endPortion.node;

			var preceedingTextNode;
			var followingTextNode;

			if (matchStartNode === matchEndNode) {

				var node = matchStartNode;

				if (startPortion.indexInNode > 0) {
					// Add `before` text node (before the match)
					preceedingTextNode = doc.createTextNode(node.data.substring(0, startPortion.indexInNode));
					node.parentNode.insertBefore(preceedingTextNode, node);
				}

				// Create the replacement node:
				var newNode = this.getPortionReplacementNode(
					endPortion,
					match
				);

				node.parentNode.insertBefore(newNode, node);

				if (endPortion.endIndexInNode < node.length) { // ?????
					// Add `after` text node (after the match)
					followingTextNode = doc.createTextNode(node.data.substring(endPortion.endIndexInNode));
					node.parentNode.insertBefore(followingTextNode, node);
				}

				node.parentNode.removeChild(node);

				this.reverts.push(function() {
					if (preceedingTextNode === newNode.previousSibling) {
						preceedingTextNode.parentNode.removeChild(preceedingTextNode);
					}
					if (followingTextNode === newNode.nextSibling) {
						followingTextNode.parentNode.removeChild(followingTextNode);
					}
					newNode.parentNode.replaceChild(node, newNode);
				});

				return newNode;

			} else {
				// Replace matchStartNode -> [innerMatchNodes...] -> matchEndNode (in that order)


				preceedingTextNode = doc.createTextNode(
					matchStartNode.data.substring(0, startPortion.indexInNode)
				);

				followingTextNode = doc.createTextNode(
					matchEndNode.data.substring(endPortion.endIndexInNode)
				);

				var firstNode = this.getPortionReplacementNode(
					startPortion,
					match
				);

				var innerNodes = [];

				for (var i = 0, l = innerPortions.length; i < l; ++i) {
					var portion = innerPortions[i];
					var innerNode = this.getPortionReplacementNode(
						portion,
						match
					);
					portion.node.parentNode.replaceChild(innerNode, portion.node);
					this.reverts.push((function(portion, innerNode) {
						return function() {
							innerNode.parentNode.replaceChild(portion.node, innerNode);
						};
					}(portion, innerNode)));
					innerNodes.push(innerNode);
				}

				var lastNode = this.getPortionReplacementNode(
					endPortion,
					match
				);

				matchStartNode.parentNode.insertBefore(preceedingTextNode, matchStartNode);
				matchStartNode.parentNode.insertBefore(firstNode, matchStartNode);
				matchStartNode.parentNode.removeChild(matchStartNode);

				matchEndNode.parentNode.insertBefore(lastNode, matchEndNode);
				matchEndNode.parentNode.insertBefore(followingTextNode, matchEndNode);
				matchEndNode.parentNode.removeChild(matchEndNode);

				this.reverts.push(function() {
					preceedingTextNode.parentNode.removeChild(preceedingTextNode);
					firstNode.parentNode.replaceChild(matchStartNode, firstNode);
					followingTextNode.parentNode.removeChild(followingTextNode);
					lastNode.parentNode.replaceChild(matchEndNode, lastNode);
				});

				return lastNode;
			}
		}

	};

return exposed;

}());

/**
 * Module: Farr (Find and Replace/wRap DOM text)
 * Based on findAndReplaceDOMText:
 * github.com/padolsey/findAndReplaceDOMText
 */



var filteredElemList = 'style script',

    Farr = function( selector, filter, method, pattern, subst ) {
      return new Farr.prototype.init( selector, filter, method, pattern, subst )
    }

Farr.prototype = {
  constructor: Farr,

  selector: '',

  // Store the findAndReplaceDOMText instance
  // for future action, i.e. revert.
  finder: [],

  // Adapt jQuery-way to do everything
  init: function( selector, filter, method, pattern, subst ) {
    this.selector = selector

    if ( typeof filter === 'string' ) {
      this.filteredElemList = filter
    } else if ( typeof filter === 'function' ) {
      this.filterElem = filter
    }

    return typeof method === 'string' && this[ method ] ?
      this[ method ](pattern, subst) : this
  },

  // Define the default element list to be
  // filtered out.
  filteredElemList: filteredElemList,

  // Define the default `filterElement` function
  filterElem: function( currentElem ) {
    var currentElem = currentElem.nodeName.toLowerCase(),
        aFilterList = this.filteredElemList.split(' '),

        // Return true by default unless it matches
        // the element on the list.
        ret = true

    aFilterList
    .forEach(function( filter ) {
      if ( currentElem === filter ) {
        ret = false
        return
      }
    })
    return ret
  },

  replace: function( pattern, subst ) {
    var that = this

    this.finder.push( findAndReplaceDOMText(
      this.selector,
      {
        find: pattern,
        replace: subst,
        filterElements: function( currentElem ) {
          return that.filterElem( currentElem )
        }
      }
    ))
    return this
  },

  wrap: function( pattern, subst ) {
    var that = this

    that.finder.push( findAndReplaceDOMText(
      that.selector,
      {
        find: pattern,
        wrap: subst,
        filterElements: function( currentElem ) {
          return that.filterElem( currentElem )
        }
      }
    ))
    return this
  },

  // Now that we support chaining syntax, it should
  // be able to revert the finder by level.
  revert: function( level ) {
    var len = this.finder.length,
        level = Number(level) || level === 0 ?
          Number(level) :
          level === 'all' ?
            len : 1

    if ( typeof len === 'undefined' || len === 0 ) {
      return this
    } else if ( level > this.finder.length ) {
      level = len
    }

    for (var i = parseInt( level ); i > 0; i--) {
      this.finder.pop().revert()
    }
    return this
  },

  // Force punctuation & biaodian typesetting rules
  // to be applied.
  jinzify: function() {
    var origFilteredElemList = this.filteredElemList

    this.filteredElemList += ' jinze'

    this
    .replace(
      TYPESET.jinze.touwei,
      function( portion, match ) {
        var mat = match[0],
            text = $.create( '', mat ),
            elem = $.create( 'jinze', 'touwei' )

        elem.appendChild( text )
        return (
          ( portion.index === 0 && portion.isEnd ) ||
          portion.index === 1
        ) ? elem : ''
      }
    )
    .replace(
      TYPESET.jinze.wei,
      function( portion, match ) {
        var mat = match[0],
            text = $.create( '', mat ),
            elem = $.create( 'jinze', 'wei' )

        elem.appendChild( text )
        return portion.index === 0 ? elem : ''
      }
    )
    .replace(
      TYPESET.jinze.tou,
      function( portion, match ) {
        var mat = match[0],
            text = $.create( '', mat ),
            elem = $.create( 'jinze', 'tou' )

        elem.appendChild( text )
        return (
          ( portion.index === 0 && portion.isEnd ) ||
          portion.index === 1
        ) ? elem : ''
      }
    )
    .replace(
      TYPESET.jinze.middle,
      function( portion, match ) {
        var mat = match[0],
            text = $.create( '', mat ),
            elem = $.create( 'jinze', 'middle' )

        elem.appendChild( text )
        return (
          ( portion.index === 0 && portion.isEnd ) ||
          portion.index === 1
        ) ? elem : ''
      }
    )

    this.filteredElemList = origFilteredElemList
    return this
  },

  groupify: function() {
    this
    .wrap(
      TYPESET.char.biaodian.group[ 0 ],
      $.clone( $.create( 'char_group', 'biaodian cjk' ))
    )
    .wrap(
      TYPESET.char.biaodian.group[ 1 ],
      $.clone( $.create( 'char_group', 'biaodian cjk' ))
    )
    return this
  },

  // Implementation of character-level selector
  // (字元級選擇器)
  charify: function( option ) {
    var option = $.extend( {
          hanzi:     'individual',
                      // individual || group || biaodian || none
          liga:      'liga',
                     // liga || none
          word:      'group',
                      // group || punctuation || none

          latin:     'group',
          ellinika:  'group',
          kirillica: 'group',
          kana:      'none',
          eonmun:    'none'
                      // group || individual || none
        }, option || {} )

    // CJK and biaodian
    if ( option.hanzi === 'group' ) {
      this.wrap(
        TYPESET.char.hanzi.group,
        $.clone( $.create( 'char_group', 'hanzi cjk' ))
      )
    }
    if ( option.hanzi === 'individual' ) {
      this.wrap(
        TYPESET.char.hanzi.individual,
        $.clone( $.create( 'char', 'hanzi cjk' ))
      )
    }

    if ( option.hanzi === 'individual' ||
         option.hanzi === 'biaodian' ||
         option.liga  === 'liga'
    ) {

      if ( option.hanzi !== 'none' ) {

        this.replace(
          TYPESET.char.biaodian.all,
          function( portion, match ) {
            var mat = match[0],
                text = $.create( '', mat ),

                clazz = 'biaodian cjk ' + (
                  mat.match( TYPESET.char.biaodian.open ) ?
                    'open' :
                    mat.match( TYPESET.char.biaodian.close ) ?
                      'close end' :
                      mat.match( TYPESET.char.biaodian.end ) ?
                        'end' : ''
                ),

                elem = $.create( 'char', clazz ),
                unicode = mat.charCodeAt( 0 ).toString( 16 )

            elem.setAttribute( 'unicode', unicode )
            elem.appendChild( text )

            return elem
          }
        )
      }

      this.replace(
        option.liga === 'liga' ?
          TYPESET.char.biaodian.liga :
          new RegExp( '(' + UNICODE.biaodian.liga + ')', 'g' ),
        function( portion, match ) {
          var mat = match[0],
              text = $.create( '', mat ),

              elem = $.create( 'char', 'biaodian liga cjk' ),
              unicode = mat.charCodeAt( 0 ).toString( 16 )

          elem.setAttribute( 'unicode', unicode )
          elem.appendChild( text )

          return elem
        }
      )
    }

    // Western languages (word-level)
    if ( option.word !== 'none' ) {
      this.wrap(
        TYPESET.char.word,
        $.clone( $.create( 'word' ))
      )
    }

    // Western languages (alphabet-level)
    if ( option.latin !== 'none' ||
         option.ellinika !== 'none' ||
         option.kirillica !== 'none'
    ) {
      this.wrap(
        TYPESET.char.punct.all,
        $.clone( $.create( 'char', 'punct' ))
      )
    }
    if ( option.latin === 'individual' ) {
      this.wrap(
        TYPESET.char.alphabet.latin,
        $.clone( $.create( 'char', 'alphabet latin' ))
      )
    }
    if ( option.ellinika === 'individual' ) {
      this.wrap(
        TYPESET.char.alphabet.ellinika,
        $.clone( $.create( 'char', 'alphabet ellinika greek' ))
      )
    }
    if ( option.kirillica === 'individual' ) {
      this.wrap(
        TYPESET.char.alphabet.kirillica,
        $.clone( $.create( 'char', 'alphabet kirillica cyrillic' ))
      )
    }
    return this
  }
}

Farr.prototype.init.prototype = Farr.prototype


Han.find = Farr

void [
  'replace',
  'wrap',
  'revert',
  'jinzify',
  'charify'
].forEach(function( method ) {
  Han.fn[ method ] = function() {
    if ( !this.finder ) {
      // Share the same selector
      this.finder = Han.find( this.context )
    }

    this.finder[ method ]( arguments[ 0 ], arguments[ 1 ] )
    return this
  }
})

var Hyu = {
      JS_RENDERED_CLASS: 'hyu-js-rendered'
    }


function writeOnCanvas( text, font ) {
  var canvas = $.create( 'canvas' ),
      context

  canvas.width = '50'
  canvas.height = '20'
  canvas.style.display = 'none'

  body.appendChild( canvas )

  context = canvas.getContext( '2d' )
  context.textBaseline = 'top'
  context.font = '15px ' + font + ', sans-serif'
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  context.fillText( text, 0, 0 )

  return [ canvas, context ]
}

function detectFont( treat, control, text ) {
  var treat = treat,
      control = control,
      text = text || '辭Q',
      ret

  try {
    control = writeOnCanvas( text, control || 'sans-serif' )
    treat = writeOnCanvas( text, treat )

    for ( var j = 1; j <= 20; j++ ) {
      for ( var i = 1; i <= 50; i++ ) {
        if (
          ret !== 'undefined' &&
          treat[1].getImageData(i, j, 1, 1).data[3] !==
            control[1].getImageData(i, j, 1, 1).data[3]
        ) {
          ret = true
          break
        } else if ( ret ) {
          break
        }

        if ( i === 50 && j === 20 && !ret ) {
          ret = false
        }
      }
    }

    // Remove and clean from memory
    $.remove( control[0] )
    $.remove( treat[0] )
    control = null
    treat = null

    return ret
  } catch ( e ) {
    return false
  }
}

Hyu.detectFont = detectFont


Hyu.support = (function() {

  var PREFIX = 'Webkit Moz ms'.split(' '),

      // Create an element for feature detecting
      // (in `testCSSProp`)
      elem = $.create( '_' ),
      exposed = {}

  function testCSSProp( prop ) {
    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        allProp = ( prop + ' ' + PREFIX.join( ucProp + ' ' ) + ucProp ).split(' '),
        ret

    allProp.forEach(function( prop ) {
      if ( typeof elem.style[ prop ] === 'string' ) {
        ret = true
      }
    })
    return ret || false
  }

  function injectElementWithStyle( rule, callback ) {
    var fakeBody = body || $.create( 'body' ),
        div = $.create( 'div' ),

        container = body ? div : fakeBody,

        callback = typeof callback === 'function' ?
          callback : function() {},

        style, ret, docOverflow

    style = [ '<style>', rule, '</style>' ].join('')

    container.innerHTML += style
    fakeBody.appendChild( div )

    if ( !body ) {
      fakeBody.style.background = ''
      fakeBody.style.overflow = 'hidden'
      docOverflow = root.style.overflow

      root.style.overflow = 'hidden'
      root.appendChild( fakeBody )
    }

    // Callback
    ret = callback( container, rule )

    // Remove the injected scope
    $.remove( container )
    if ( !body ) {
      root.style.overflow = docOverflow
    }
    return !!ret
  }

  function getStyle( elem, prop ) {
    var ret

    if ( window.getComputedStyle ) {
      ret = document.defaultView.getComputedStyle( elem, null ).getPropertyValue( prop )
    } else if ( elem.currentStyle ) {
      // for IE
      ret = elem.currentStyle[ prop ]
    }
    return ret
  }

  return {
    ruby: (function() {
      var ruby = $.create( 'ruby' ),
          rt = $.create( 'rt' ),
          rp = $.create( 'rp' ),
          ret

      ruby.appendChild( rp )
      ruby.appendChild( rt )
      root.appendChild( ruby )

      // Browsers that support ruby hide the `<rp>` via `display: none`
      ret = (
        getStyle( rp, 'display' ) === 'none' ||
        // but in IE, `<rp>` has `display: inline`
        // so, the test needs other conditions:
        getStyle( ruby, 'display' ) === 'ruby' &&
        getStyle( rt, 'display' ) === 'ruby-text'
      ) ? true : false

      // Remove and clean from memory
      root.removeChild( ruby )
      ruby = null
      rt = null
      rp = null

      return ret
    })(),

    fontface: (function() {
      var ret

      injectElementWithStyle(
        '@font-face { font-family: font; src: url("http://"); }',
        function( node, rule ) {
          var style = $.qsa( 'style', node )[0],
              sheet = style.sheet || style.styleSheet,
              cssText = sheet ?
                ( sheet.cssRules && sheet.cssRules[0] ?
                  sheet.cssRules[0].cssText : sheet.cssText || ''
                ) : ''

          ret = /src/i.test( cssText ) &&
            cssText.indexOf( rule.split(' ')[0] ) === 0
        }
      )

      return ret
    })(),

    // Address feature support test for `unicode-range` via
    // detecting whether it's Arial (supported) or
    // Times New Roman (not supported).
    unicoderange: (function() {
      var ret

      injectElementWithStyle(
        '@font-face{font-family:test-for-unicode-range;src:local(Arial),local("Droid Sans")}@font-face{font-family:test-for-unicode-range;src:local("Times New Roman"),local(Times),local("Droid Serif");unicode-range:U+270C}',
        function() {
          ret = !Hyu.detectFont(
            'test-for-unicode-range', // treatment group
            'Arial, "Droid Sans"',    // control group
            'Q'                       // ASCII characters only
          )
        }
      )
      return ret
    })(),

    columnwidth: testCSSProp( 'columnWidth' ),

    textemphasis: testCSSProp( 'textEmphasis' ),

    writingmode: testCSSProp( 'writingMode' )
  }
})()


Hyu.initCond = function( target ) {
  var target = target || root,
      ret = '',
      clazz

  target.classList.add( Hyu.JS_RENDERED_CLASS )

  for ( var feature in Hyu.support ) {
    clazz = ( Hyu.support[ feature ] ? '' : 'no-' ) + feature

    target.classList.add( clazz )
    ret += clazz + ' '
  }
  return ret
}


/**
 * Create and return a new `<rb>` element
 * according to the given contents
 */
function createPlainRb( rb, rt ) {
  var rb = $.clone( rb ),
      rt = $.clone( rt ),
      $rb = $.create( 'rb' )

  $rb.appendChild( rb )
  $rb.appendChild( rt )
  $rb.setAttribute( 'annotation', rt.textContent )

  return $rb
}

/**
 * Create and return a new `<rb>` element
 * in Zhuyin form
 */
function createZhuyinRb( rb, rt ) {
  var rb = $.clone( rb ),

      // Create an element to return
      $rb   = $.create( 'rb' ),
      $rt   = $.create( 'zhuyin' ),
      $yin  = $.create( 'yin' ),
      $diao = $.create( 'diao' ),

      // #### Explanation ####
      // * `zhuyin`: the entire phonetic annotation
      // * `yin`:    the plain pronunciation (w/out tone)
      // * `diao`:   the tone
      // * `form`:   the combination of the pronunciation
      // * `len`:    the text length of `yin`
      zhuyin = rt.textContent,
      yin, diao, form, len

  yin  = zhuyin.replace( TYPESET.zhuyin.diao, '' )
  len  = yin ? yin.length : 0
  diao = zhuyin
         .replace( yin, '' )
         .replace( /[\u02C5]/g, '\u02C7' )
         .replace( /[\u030D]/g, '\u0358' )

  form = zhuyin.replace( TYPESET.zhuyin.form, function( s, j, y ) {
    return [
      s ? 'S' : null,
      j ? 'J' : null,
      y ? 'Y' : null
    ].join('')
  })

  // - <rb>
  // -   # ruby base text
  // -   <zhuyin>
  // -     <yin></yin>
  // -     <diao></diao>
  // -   </zhuyin>
  // - </rb>
  $diao.innerHTML = diao
  $yin.innerHTML = yin
  $rt.appendChild( $yin )
  $rt.appendChild( $diao )

  if ( rb.nodeName === 'RB' ) {
    $rb.innerHTML = rb.innerHTML
  } else {
    $rb.appendChild( rb )
  }

  $rb.appendChild( $rt )

  // Finally, set up the necessary attribute
  // and return the new `<rb>`
  $.setAttr( $rb, {
    zhuyin: '',
    diao: diao,
    length: len,
    form: form
  })
  return $rb
}

/**
 * Normalisation rendering mechanism
 */
$.extend( Hyu, {

  // Render and normalise the given context by routine:
  //
  // > ruby > u, ins > s, del > em
  //
  renderElem: function( context ) {
    this.renderRuby( context )
    this.renderDecoLine( context )
    this.renderDecoLine( context, 's, del' )
    this.renderEm( context )
  },

  // Traverse target elements (those with text-decoration
  // -line) to see if we should address spacing in
  // between for semantic presentation.
  renderDecoLine: function( context, target ) {
    var target = target || 'u, ins',
        $target = $.qsa( target, context ),
        rTarget = new RegExp( '^(' + target.replace(/\,\s?/g, '|') + ')$', 'ig' )

    $target
    .forEach(function( elem ) {
      var next

      // Ignore all `<wbr>` and comments in between
      do {
        next = ( next || elem ).nextSibling

        if ( !next ) {
          return
        }
      } while ( $.isIgnorable( next ))

      if ( next.nodeName.match( rTarget )) {
        next.classList.add( 'adjacent' )
      }
    })
  },

  // Traverse target elements to render Hanzi emphasis marks
  // and skip that in punctuation
  renderEm: function( context, target ) {
    var qs = target ? 'qsa' : 'tag',
        target = target || 'em',
        $target = $[ qs ]( target, context )

    $target
    .forEach(function( elem ) {
      var $elem = Farr( elem )

      if ( !Hyu.support.textemphasis ) {
        $elem.jinzify()
      }

      $elem
      .groupify()
      .charify( Hyu.support.textemphasis ? {
        hanzi:     'biaodian',
        word:      'punctuation'
      } : {
        latin:     'individual',
        ellinika:  'individual',
        kirillica: 'individual'
      })
    })
  },

  // Address normalisation for both simple and complex
  // rubies
  renderRuby: function( context, target ) {
    var qs = target ? 'qsa' : 'tag',
        target = target || 'ruby',
        $target = $[ qs ]( target, context ),

        simpClaElem = target + ', rtc',
        $simpClaElem = $.qsa( simpClaElem, context )

    // First of all, simplify semantic classes
    $simpClaElem
    .forEach(function( elem ) {
      var clazz = elem.classList

      if ( clazz.contains( 'pinyin' )) {
        clazz.add( 'romanization' )
      } else if ( clazz.contains( 'mps' )) {
        clazz.add( 'zhuyin' )
      }

      if ( clazz.contains( 'romanization' )) {
        clazz.add( 'annotation' )
      }
    })

    // Deal with `<ruby>`
    $target
    .forEach(function( ruby ) {
      var clazz = ruby.classList,

          condition = (
            !Hyu.support.ruby ||
            clazz.contains( 'zhuyin') ||
            clazz.contains( 'complex' ) ||
            clazz.contains( 'rightangle' )
          ),

          frag, $cloned, $rb, hruby

      if ( !condition ) {
        return
      }

      // Apply document fragment here to avoid
      // continuously pointless re-paint
      frag = $.create( '!' )
      frag.appendChild( $.clone( ruby ))
      $cloned = $.qsa( target, frag )[0]

      // 1. Simple ruby polyfill for, um, Firefox;
      // 2. Zhuyin polyfill for all.
      if (
        !Hyu.support.ruby ||
        clazz.contains( 'zhuyin' )
      ) {

        $
        .tag( 'rt', $cloned )
        .forEach(function( rt ) {
          var $rb = $.create( '!' ),
              airb = [],
              irb

          // Consider the previous nodes the implied
          // ruby base
          do {
            irb = ( irb || rt ).previousSibling

            if ( !irb || irb.nodeName.match( /(rt|rb)/i )) {
              break
            }

            $rb.insertBefore(
              $.clone( irb ),
              $rb.firstChild
            )
            airb.push( irb )
          } while ( !irb.nodeName.match( /(rt|rb)/i ))

          // Create a real `<rb>` to append.
          $rb = clazz.contains( 'zhuyin' ) ?
            createZhuyinRb( $rb, rt ) :
            createPlainRb( $rb, rt )

          // Replace the ruby text with the new `<rb>`,
          // and remove the original implied ruby base(s)
          try {
            rt.parentNode.replaceChild( $rb, rt )

            airb
            .forEach(function( irb ) {
              $.remove( irb )
            })
          } catch ( e ) {}
        })
      }

      // 3. Complex ruby polyfill
      // - Double-lined annotation;
      // - Right-angled annotation.
      if (
        clazz.contains( 'complex' ) ||
        clazz.contains( 'rightangle' )
      ) {
        $rb = $.tag( 'rb', $cloned )

        // First of all, deal with Zhuyin containers
        // individually
        //
        // Note that we only support one single Zhuyin
        // container in each complex ruby
        !function( rtc ) {
          if ( !rtc ) {
            return
          }

          $
          .tag( 'rt', rtc )
          .forEach(function( rt, i ) {
            if ( !$rb[ i ] ) {
              return
            }

            var $$rb = createZhuyinRb( $rb[ i ], rt )

            try {
              $rb[ i ].parentNode.replaceChild( $$rb, $rb[ i ] )
            } catch ( e ) {}
          })

          // Remove the container once it's useless
          $.remove( rtc )
          ruby.setAttribute( 'rightangle', '' )
        }( $cloned.querySelector( 'rtc.zhuyin' ))

        // Then, other normal annotations
        $
        .qsa( 'rtc:not(.zhuyin)', $cloned )
        .forEach(function( rtc, order ) {
          var clazz = rtc.classList,
              start, end

          // Initialise
          start = end = 0

          // Recache the ruby base
          $rb = $.qsa(
            order === 0 ? 'rb' : 'rb[span]',
            $cloned
          )

          $
          .tag( 'rt', rtc )
          .forEach(function( rt ) {
            var $$rb = $.create( '!' ),

                // #### Explanation ####
                // * `rbspan`: the `<rb>` span assigned in the HTML
                // * `span`:   the span number of the current `<rb>`
                rbspan = parseInt( rt.getAttribute( 'rbspan' )) || 1,
                span, _$rb

            start = end
            end += parseInt( rbspan )

            // Rearrange the effected `<rb>` array according
            // to (rb)span, while working on the second container.
            if ( order > 0 ) {
              for ( var i = end-1; i >= start; i-- ) {
                if ( !$rb[ i ] ) {
                  continue
                }

                span = parseInt( $rb[ i ].getAttribute( 'span' )) || 1

                if ( span > rbspan ) {
                  _$rb = $.tag( 'rb', $rb[ i ] )

                  for ( var j = 0, len = _$rb.length; j < len; j++ ) {
                    $rb.splice( i+j, 1, _$rb[ j ] )
                  }
                }
              }
            }

            // Iterate from the last item, for we don't
            // want to mess up with the original indices.
            for ( var i = end-1; i >= start; i-- ) {
              if ( !$rb[ i ] ) {
                continue
              }

              $$rb.insertBefore(
                $.clone( $rb[ i ] ),
                $$rb.firstChild
              )

              if ( rbspan > 1 && i !== start ) {
                $.remove( $rb[ i ] )
                continue
              }

              $$rb = createPlainRb( $$rb, rt )
              $.setAttr( $$rb, {
                'class': clazz,
                span: rbspan,
                order: order
              })
              $rb[ i ].parentNode.replaceChild( $$rb, $rb[ i ] )
            }
          })

          // Remove the container once it's useless
          $.remove( rtc )
        })
      }

      // Create a new fake `<hruby>` element so the
      // style sheets will render it as a polyfill,
      // which also helps to avoid the UA style.
      //
      // (The ‘H’ stands for ‘Han’, by the way)
      hruby = $.create( 'hruby' )
      hruby.innerHTML = frag.firstChild.innerHTML

      // Copy all attributes onto it
      $.setAttr( hruby, ruby.attributes )
      hruby.normalize()

      // Finally, replace it
      ruby.parentNode.replaceChild( hruby, ruby )
    })
  }

  // ### TODO list ###
  //
  // * Debug mode
  // * Better error-tolerance
})

/*!
 * Hyu
 * css.hanzi.co/hyu
 *
 * This module is a subset project of Han,
 * which aims to provide HTML5-ready and
 * Hanzi-optimised style normalisation.
 */




Han.normalize = Hyu
Han.support = Hyu.support
Han.detectFont = Hyu.detectFont

Han.fn.initCond = function() {
  this.condition.classList.add( 'han-js-rendered' )
  Han.normalize.initCond( this.condition )
  return this
}

void [
  'Elem',
  'DecoLine',
  'Em',
  'Ruby'
].forEach(function( elem ) {
  var method = 'render' + elem

  Han.fn[ method ] = function( target ) {
    Han.normalize[ method ]( this.context, target )
    return this
  }
})


$.extend( Han.support, {
  // Assume that all devices support Heiti for we
  // use `sans-serif` to do the comparison.
  heiti: true,
  // 'heiti-gb': true,

  songti: Han.detectFont( '"Han Songti"' ),
  'songti-gb': Han.detectFont( '"Han Songti GB"' ),

  kaiti: Han.detectFont( '"Han Kaiti"' ),
  // 'kaiti-gb': Han.detectFont( '"Han Kaiti GB"' ),

  fangsong: Han.detectFont( '"Han Fangsong"' )
  // 'fangsong-gb': Han.detectFont( '"Han Fangsong GB"' )
})



var QUERY_HWS_AS_FIRST_CHILD = '* > hws:first-child, * > wbr:first-child + hws, wbr:first-child + wbr + hws'

//// Disabled `Node.normalize()` for temp due to
//// issue below in IE11.
//// See: http://stackoverflow.com/questions/22337498/why-does-ie11-handle-node-normalize-incorrectly-for-the-minus-symbol
var isNodeNormalizeNormal = (function() {
      var div = $.create( 'div' )

      div.appendChild( $.create( '', '0-' ))
      div.appendChild( $.create( '', '2' ))
      div.normalize()

      return div.firstChild.length !== 2
    })(),

    hws

hws = $.create( 'hws' )
hws.innerHTML = ' '

$.extend( Han, {
  isNodeNormalizeNormal: isNodeNormalizeNormal,

  renderHWS: function( context, strict ) {
    var context = context || document,
        mode = strict ? 'strict' : 'base',
        finder = Han.find( context )

    // Elements to be filtered according to the
    // HWS rendering mode
    if ( strict ) {
      finder.filteredElemList += ' textarea code kbd samp pre'
    } else {
      finder.filteredElemList += ' textarea'
    }

    finder
    .replace( Han.TYPESET.hws[ mode ][0], '$1<hws/>$2' )
    .replace( Han.TYPESET.hws[ mode ][1], '$1<hws/>$2' )

    // Deal with `' 字'`, `" 字"` => `'字'`, `"字"`
    .replace( /(['"]+)<hws\/>(.+?)<hws\/>\1/ig, '$1$2$1' )

    // Convert text nodes `<hws/>` into real element nodes
    .replace( '<hws/>', function() {
      return $.clone( hws )
    })

    // Deal with:
    // `漢<u><hws/>zi</u>` => `漢<hws/><u>zi</u>`
    $
    .qsa( QUERY_HWS_AS_FIRST_CHILD, context )
    .forEach(function( firstChild ) {
      var parent = firstChild.parentNode,
          target = parent.firstChild

      // Skip all `<wbr>` and comments
      while ( $.isIgnorable( target )) {
        target = target.nextSibling

        if ( !target ) {
          return
        }
      }

      // The ‘first-child’ of DOM is different from
      // the ones of QSA, could be either an element
      // or a text fragment, but the latter one is
      // not what we want. We don't want comments,
      // either.
      while ( target.nodeName === 'HWS' ) {
        $.remove( target, parent )

        target = parent.parentNode.insertBefore( $.clone( hws ), parent )
        parent = parent.parentNode

        if ( isNodeNormalizeNormal ) {
          parent.normalize()
        }

        // This is for extreme circumstances, i.e.,
        // `漢<a><b><c><hws/>zi</c></b></a>` =>
        // `漢<hws/><a><b><c>zi</c></b></a>`
        if ( target !== parent.firstChild ) {
          break
        }
      }
    })

    // Normalise nodes we messed up with
    if ( isNodeNormalizeNormal ) {
      context.normalize()
    }
    // Return the finder instance for future usage
    return finder
  }
})

$.extend( Han.fn, {
  HWS: null,

  renderHWS: function( strict ) {
    Han.renderHWS( this.context, strict )

    this.HWS = $.tag( 'hws', this.context )
    return this
  },

  revertHWS: function() {
    this.HWS
      .forEach(function( hws ) {
        $.remove( hws )
      })
    return this
  }
})


Han.renderJiya = function( context ) {
  var context = context || document,
      finder = [ Han.find( context ) ]

  finder[ 0 ].filteredElemList += ' textarea code kbd samp pre jinze em'

  finder[ 0 ]
  .groupify()

  $
  .qsa( 'char_group.biaodian', context )
  .forEach(function( elem ) {
    finder.push(
      Han( elem )
      .charify({
        hanzi:     'biaodian',
        liga:      'liga',
        word:      'none',
        latin:     'none',
        ellinika:  'none',
        kirillica: 'none'
      })
    )
  })
  return finder
}

$.extend( Han.fn, {
  jiya: null,

  renderJiya: function() {
    this.jiya = Han.renderJiya( this.context )
    return this
  },

  revertJiya: function() {
    try {
      this.jiya.revert( 'all' )
    } catch ( e ) {}
    return this
  }
})


var mdot

mdot = $.create( 'char', 'biaodian cjk middle' )
mdot.setAttribute( 'unicode', 'b7' )

Han.correctBasicBD = function( context, all ) {
  var context = context || document,
      finder

  if ( Han.support.unicoderange && !all ) {
    return
  }

  finder = Han.find( context )
  finder.filteredElemList += ' em'

  finder
  .wrap( /\u00B7/g, $.clone( mdot ))
  .charify({
    liga:      'liga',
    hanzi:     'none',
    word:      'none',
    latin:     'none',
    ellinika:  'none',
    kirillica: 'none'
  })
}

$.extend( Han.fn, {
  basicBD: null,

  correctBasicBD: function( all ) {
    this.basicBD = Han.correctBasicBD( this.context, all )
    return this
  },

  revertBasicBD: function() {
    try {
      this.basicBD.revert( 'all' )
    } catch (e) {}
    return this
  }
})


var QUERY_RB_W_ANNO = 'rb.romanization[annotation], .romanization rb[annotation]',
    ELEM_TO_IGNORE = ' textarea code kbd samp pre'

var isCombLigaNormal = (function() {
      var fakeBody = body || $.create( 'body' ),
          div = $.create( 'div' ),
          control = $.create( 'span' ),

          container = body ? div : fakeBody,
          treat, docOverflow, ret

      if ( !body ) {
        fakeBody.style.background = ''
        fakeBody.style.overflow = 'hidden'
        docOverflow = root.style.overflow

        root.style.overflow = 'hidden'
        root.appendChild( fakeBody )
      } else {
        body.appendChild( container )
      }

      control.innerHTML = '&#x0069;&#x030D;'
      control.style.fontFamily = 'sans-serif'
      control.style.display = 'inline-block'

      treat = $.clone( control )
      treat.style.fontFamily = '"Romanization Sans"'

      container.appendChild( control )
      container.appendChild( treat )

      ret = control.clientWidth !== treat.clientWidth
      $.remove( container )

      if ( !body ) {
        root.style.overflow = docOverflow
      }
      return ret
    })(),

    aCombLiga = Han.TYPESET[ 'display-as' ][ 'comb-liga-pua' ],
    aInaccurateChar = Han.TYPESET[ 'inaccurate-char' ],

    charCombLiga = $.create( 'char', 'comb-liga' ),
    charCombLigaInner =  $.create( 'inner' )

$.extend( Han, {
  isCombLigaNormal: isCombLigaNormal,

  substCombLigaWithPUA: function( context ) {
    var context = context || document,
        finder = Han.find( context )

    if ( isCombLigaNormal ) {
      return
    }

    finder.filteredElemList += ELEM_TO_IGNORE

    aCombLiga
    .forEach(function( pattern ) {
      finder
      .replace(
        new RegExp( pattern[ 0 ], 'ig' ),
        function( portion, match ) {
          var ret = $.clone( charCombLiga ),
              inner = $.clone( charCombLigaInner )

          // Put the original content in an inner container
          // for better presentational effect of hidden text
          inner.innerHTML = match[ 0 ]
          ret.appendChild( inner )
          ret.setAttribute( 'display-as', pattern[ 1 ] )
          return portion.index === 0 ? ret : ''
        }
      )
    })

    $
    .qsa( QUERY_RB_W_ANNO, context )
    .forEach(function( rb ) {
      var annotation = rb.getAttribute( 'annotation' )

      aCombLiga
      // Latin vowels only
      .slice( 0, 5 )
      .forEach(function( pattern ) {
        annotation = annotation.replace(
          new RegExp( pattern[ 0 ], 'ig' ), pattern[ 1 ]
        )
      })
      rb.setAttribute( 'annotation', annotation )
    })
    return finder
  },

  substInaccurateChar: function( context ) {
    var context = context || document,
        finder = Han.find( context )

    finder.filteredElemList += ELEM_TO_IGNORE
    aInaccurateChar
    .forEach(function( pattern ) {
      finder
      .replace(
        new RegExp( pattern[ 0 ], 'ig' ),
        pattern[ 1 ]
      )
    })
  }
})

$.extend( Han.fn, {
  'comb-liga': null,
  'inaccurate-char': null,

  substCombLigaWithPUA: function() {
    this['comb-liga'] = Han.substCombLigaWithPUA( this.context )
    return this
  },

  revertCombLigaWithPUA: function() {
    try {
      this['comb-liga'].revert( 'all' )
    } catch ( e ) {}
    return this
  },

  substInaccurateChar: function() {
    this['inaccurate-char'] = Han.substInaccurateChar( this.context )
    return this
  },

  revertInaccurateChar: function() {
    try {
      this['inaccurate-char'].revert( 'all' )
    } catch ( e ) {}
    return this
  }
})




window.addEventListener( 'DOMContentLoaded', function() {
  var initContext

  // Use the shortcut under the default situation
  if ( root.classList.contains( 'han-init' )) {
    Han.init()

  // Consider ‘a configured context’ the special
  // case of the default situation. Will have to
  // replace the `Han.init` with the instance as
  // well (for future usage).
  } else if ( initContext = document.querySelector( '.han-init-context' )) {
    Han.init = Han( initContext ).render()
  }
})



// AMD
if (
  typeof define === 'function' && define.amd
) {
  define(function() {
    return Han
  })

// Expose to global namespace
} else if (
  typeof noGlobalNS === 'undefined' || noGlobalNS === false
) {
  window.Han = Han
}


return Han
})
