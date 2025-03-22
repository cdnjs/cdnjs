"use strict";
exports.id = 3019;
exports.ids = [3019];
exports.modules = {

/***/ 3019:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports TextActivityDocument, TextTarget */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/* harmony import */ var _boxes_ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9072);
/* harmony import */ var _media_MediaContent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2355);
/**
 *  File    : activities/text/TextActivityDocument.js
 *  Created : 14/04/2015
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 *  @module
 */






/**
 * This is the HTML DOM element used in text activities like {@link module:activities/text/FillInBlanks.FillInBlanks FillInBlanks},
 * {@link module:activities/text/IdentifyText.IdentifyText IdentifyText}, {@link module:activities/text/OrderText.OrderText OrderText} and {@link module:activities/text/Complete.Complete Complete}. It contains the main document of
 * the activity, usually with some elements marked as "targets". In {@link module:activities/text/FillInBlanks.FillInBlanks FillInBlanks}, this
 * targets are encapsulated in {@link module:activities/text/TextActivityDocument.TextTarget TextTarget} objects.
 */
class TextActivityDocument {
  /**
   * TextActivityDocument constructor
   */
  constructor() {
    // Make a deep clone of the default style
    this.style = { 'default': { ...TextActivityDocument.DEFAULT_DOC_STYLE } };
    this.p = [];
  }

  /**
   * Loads the document settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   * @param {module:bags/MediaBag.MediaBag} mediaBag - The media bag used to load images and media content
   */
  setProperties($xml, mediaBag) {
    // Read named styles
    // Sort styles according to its "base" dependencies
    const styles = $xml.children('style').toArray().sort((a, b) => {
      var aName = a.getAttribute('name'), aBase = a.getAttribute('base') || null;
      var bName = b.getAttribute('name'), bBase = b.getAttribute('base') || null;
      // Put 'default' always first, then each style below their base (if any)
      return aName === 'default' ? -1 : bName === 'default' ? 1
        : aBase === bName ? 1 : bBase === aName ? -1
          : !aBase ? -1 : !bBase ? 1 : 0;
    });

    // Process the ordered list of styles
    styles.forEach(style => {
      const attr = this.readDocAttributes(jquery__WEBPACK_IMPORTED_MODULE_0___default()(style));
      // Grant always that basic attributes are defined
      this.style[attr.name] = attr.name === 'default' ? jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(true, this.style.default, attr) : attr;
    });

    // Read paragraphs
    $xml.find('section > p').each((_n, par) => {

      const p = { elements: [] };

      // Read paragraph attributes
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .attrForEach */ .GM)(par.attributes, (name, value) => {
        switch (name) {
          case 'style':
            p[name] = value;
            break;
          case 'bidiLevel':
          case 'Alignment':
            p[name] = Number(value);
            break;
        }
      });

      // Read paragraph objects
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(par).children().each((_n, child) => {
        let obj;
        const $child = jquery__WEBPACK_IMPORTED_MODULE_0___default()(child);
        switch (child.nodeName) {

          case 'cell':
            obj = new _boxes_ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_2__["default"]().setProperties($child, mediaBag);
            break;

          case 'text':
            obj = { text: child.textContent.replace(/\t/g, '&#9;') };
            const attr = this.readDocAttributes($child);
            if (!jquery__WEBPACK_IMPORTED_MODULE_0___default().isEmptyObject(attr)) {
              obj.attr = attr;
            }
            break;

          case 'target':
            obj = new TextTarget(this, child.textContent.replace(/\t/g, '&#9;'));
            obj.setProperties($child, mediaBag);
            this.numTargets++;
            break;

          default:
            (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('error', `Unknown object in activity document: "${child.nodeName}"`);
        }
        if (obj) {
          obj.objectType = child.nodeName;
          p.elements.push(obj);
        }
      });

      this.p.push(p);
    });
    return this;
  }

  /**
   * Reads sets of text attributes, sometimes in form of named styles
   * @param {external:jQuery} $xml - The XML element to parse
   * @returns {object}
   */
  readDocAttributes($xml) {
    let
      attr = {},
      css = {};
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, val) => {
      switch (name) {
        case 'background':
          val = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)(val, 'white');
          attr[name] = val;
          css['background-color'] = val;
          break;
        case 'foreground':
          val = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)(val, 'black');
          attr[name] = val;
          css['color'] = val;
          break;
        case 'family':
          css['font-family'] = val;
        /* falls through */
        case 'name':
        case 'style':
          // Attributes specific to named styles:
          attr[name] = val;
          break;
        case 'base':
          attr[name] = val;
          // If base style exists, merge it with current settings
          if (this.style[val]) {
            //attr = Object.apply({}, this.style[val], attr)
            attr = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(true, {}, this.style[val], attr);
            if (this.style[val].css)
              //css = Object.apply({}, this.style[val].css, css)
              css = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, this.style[val].css, css);
          }
          break;
        case 'bold':
          val = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(val);
          attr[name] = val;
          css['font-weight'] = val ? 'bold' : 'normal';
          break;
        case 'italic':
          val = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(val);
          attr[name] = val;
          css['font-style'] = val ? 'italic' : 'normal';
          break;
        case 'target':
          attr[name] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(val);
          break;
        case 'size':
          attr[name] = Number(val);
          css['font-size'] = `${val}px`;
          break;
        case 'tabWidth':
          // `tab-size` CSS attribute is only set when the document has a specific `tabWidth`
          // setting. It must be accompanied of `white-space:pre` to successfully work.
          this.tabSpc = val;
          css['tab-size'] = this.tabSpc;
          css['white-space'] = 'pre-wrap';
          break;
        default:
          (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('warn', `Unknown text attribute: "${name}" = "${val}"`);
          attr[name] = val;
          break;
      }
    });

    if (!jquery__WEBPACK_IMPORTED_MODULE_0___default().isEmptyObject(css))
      attr['css'] = css;

    return attr;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    // TODO: simplify the serialization of styles (now too verbose!)
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getAttr */ .iu)(this, ['style', 'tabSpc', 'targetType', 'p']);
  }

  /**
   * Reads the properties of this TextActivityDocument from a data object
   * @param {object} data - The data object to be parsed, or just the text content
   * @returns {module:activities/text/TextActivityDocument.TextActivityDocument}
   */
  setAttributes(data, mediaBag) {

    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .setAttr */ .ob)(this, data, ['style', 'tabSpc', 'targetType', 'p']);

    // Build paragraphs:
    this.p.forEach(p => {
      if (p.elements)
        p.elements = p.elements.map(el => {
          if (el.objectType === 'cell')
            return (new _boxes_ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_2__["default"]()).setAttributes(el, mediaBag);
          else if (el.objectType === 'target')
            return (new TextTarget(this)).setAttributes(el, mediaBag);
          else
            return el;
        });
      else
        p.elements = [];
    });
    return this;
  }

  /**
   * Gets the full text of this document in raw format
   * @returns {string} - The text of the document.
   */
  getRawText() {
    const $html = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>');
    // Process paragraphs
    this.p.forEach(p => {
      // Creates a new DOM paragraph
      const $p = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>');
      let empty = true;
      // Process the paragraph elements
      p.elements.forEach(element => {
        switch (element.objectType) {
          case 'text':
          case 'target':
            $p.append(element.text);
            break;
          case 'cell':
            // cells are not considered raw text of the document
            break;
          default:
            break;
        }
        empty = false;
      });
      if (empty) {
        // Don't leave paragraphs empty
        $p.html('&nbsp;');
      }
      // Adds the paragraph to the DOM element
      $html.append($p);
    });
    return $html.text().trim();
  }

  /**
   * Gets a `style` object filled with default attributes plus attributes present in the
   * requested style name.
   * @param {string} name - The requested style name
   * @returns {object} - The result of combining `default` with the requested style
   */
  getFullStyle(name) {
    const st = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(true, {}, this.style.default);
    return jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(true, st, this.style[name] ? this.style[name] : {});
    //return Object.assign({}, this.style.default, this.style[name] ? this.style[name] : {})
  }
}

/**
 * Default style
 */
TextActivityDocument.DEFAULT_DOC_STYLE = {
  background: '0xFFFFFF',
  foreground: '0x000000',
  family: 'Arial',
  bold: false,
  italic: false,
  size: 17,
  css: {
    'background-color': '#FFFFFF',
    'color': '#000000',
    'font-family': 'Arial',
    'font-weight': 'normal',
    'font-style': 'normal',
    'font-size': '17px',
  },
};

Object.assign(TextActivityDocument.prototype, {
  /**
   * Number of blank spaces between tabulators.
   * @name module:activities/text/TextActivityDocument.TextActivityDocument#tabSpc
   * @type {number} */
  tabSpc: 12,
  /**
   * Index of the last {@link module:boxes/ActiveBox.ActiveBox ActiveBox} activated.
   * @name module:activities/text/TextActivityDocument.TextActivityDocument#lastBoxId
   * @type {number} */
  lastBoxId: 0,
  /**
   * A bag of {@link module:activities/text/TextActivityDocument.TargetMarker TargetMarker} objects
   * @name module:activities/text/TextActivityDocument.TextActivityDocument#tmb
   * @type {object} */
  tmb: null,
  /**
   * Number of targets
   * @name module:activities/text/TextActivityDocument.TextActivityDocument#numTargets
   * @type {number} */
  numTargets: 0,
  /**
   * Type of targets used in this activity. Possible values are: `TT_FREE`, `TT_CHAR`, `TT_WORD`
   * and `TT_PARAGRAPH`.
   * @name module:activities/text/TextActivityDocument.TextActivityDocument#targetType
   * @type {string} */
  targetType: 'TT_FREE',
  /**
   * Collection of named styles of the document
   * @name module:activities/text/TextActivityDocument.TextActivityDocument#style
   * @type {object} */
  style: null,
  /**
   * The main document, represented as a collection of DOM objects
   * @name module:activities/text/TextActivityDocument.TextActivityDocument#p
   * @type {object} */
  p: null,
});

/**
 * This class contains the properties and methods of the document elements that are the real
 * targets of user actions in text activities.
 */
class TextTarget {
  /**
   * TextTarget constructor
   * @param {module:activities/text/TextActivityDocument.TextActivityDocument} doc - The document to which this target belongs.
   * @param {string} text - Main text of this target.
   */
  constructor(doc, text = '') {
    this.doc = doc;
    this.text = text;
    this.numIniChars = text.length;
    this.answers = [text];
    this.maxLenResp = this.numIniChars;
  }

  /**
   * Resets the TextTarget status
   * @param {string} [status] - The `targetStatus` to be established. Default is `NOT_EDITED`
   */
  reset(status) {
    this.targetStatus = status ? status : 'NOT_EDITED';
    this.flagModified = false;
  }

  /**
   * Loads the text target settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   * @param {module:bags/MediaBag.MediaBag} mediaBag - The media bag used to load images and media content
   */
  setProperties($xml, mediaBag) {
    let firstAnswer = true;
    // Read specific nodes
    $xml.children().each((_n, child) => {
      const $node = jquery__WEBPACK_IMPORTED_MODULE_0___default()(child);
      switch (child.nodeName) {
        case 'answer':
          if (firstAnswer) {
            firstAnswer = false;
            this.answers = [];
          }
          if (this.answers === null)
            this.answers = [];
          this.answers.push(child.textContent);
          break;

        case 'optionList':
          $node.children('option').each((_n, opChild) => {
            this.isList = true;
            if (this.options === null)
              this.options = [];
            this.options.push(opChild.textContent);
          });
          break;

        case 'response':
          this.iniChar = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getVal */ .eH)($node.attr('fill'), this.iniChar).charAt(0);
          // Use underscores instead of whitespace chars
          if (_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.WHITESPACES.indexOf(this.iniChar) >= 0)
            this.iniChar = '_';
          this.numIniChars = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getNumber */ .WZ)($node.attr('length'), this.numIniChars);
          this.maxLenResp = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getNumber */ .WZ)($node.attr('maxLength'), this.maxLenResp);
          this.iniText = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getVal */ .eH)($node.attr('show'), this.iniText);
          break;

        case 'info':
          this.infoMode = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getVal */ .eH)($node.attr('mode'), 'always');
          this.popupDelay = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getNumber */ .WZ)($node.attr('delay'), this.popupDelay);
          this.popupMaxTime = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getNumber */ .WZ)($node.attr('maxTime'), this.popupMaxTime);
          $node.children('media').each((_n, media) => {
            this.onlyPlay = true;
            this.popupContent = new _boxes_ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
            this.popupContent.mediaContent = new _media_MediaContent_js__WEBPACK_IMPORTED_MODULE_3__["default"]().setProperties(jquery__WEBPACK_IMPORTED_MODULE_0___default()(media));
          });
          if (!this.popupContent) {
            $node.children('cell').each((_n, cell) => {
              this.popupContent = new _boxes_ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_2__["default"]().setProperties(jquery__WEBPACK_IMPORTED_MODULE_0___default()(cell), mediaBag);
            });
          }
          break;

        case 'text':
          this.text = child.textContent.replace(/\t/g, '&#9;');
          const attr = this.doc.readDocAttributes(jquery__WEBPACK_IMPORTED_MODULE_0___default()(child));
          if (!jquery__WEBPACK_IMPORTED_MODULE_0___default().isEmptyObject(attr))
            this.attr = attr;
          break;

        default:
          break;
      }
    });
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getAttr */ .iu)(this, [
      'objectType', 'text', 'attr', 'isList',
      'answers', 'options', 'iniChar', 'numIniChars', 'maxLenResp', 'iniText',
      'infoMode', 'popupDelay', 'popupKey', 'popupMaxTime', 'onlyPlay',
      'popupContent',
    ]);
  }

  /**
   * Reads the properties of this TextTarget from a data object
   * @param {object} data - The data object to be parsed, or just the text content
   * @returns {module:activities/text/TextActivityDocument.TextTarget}
   */
  setAttributes(data, mediaBag) {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .setAttr */ .ob)(this, data, [
      'objectType', 'text', 'attr', 'isList',
      'answers', 'options', 'iniChar', 'numIniChars', 'maxLenResp', 'iniText',
      'infoMode', 'popupDelay', 'popupKey', 'popupMaxTime', 'onlyPlay',
      { key: 'popupContent', fn: _boxes_ActiveBoxContent_js__WEBPACK_IMPORTED_MODULE_2__["default"], params: [mediaBag] },
    ]);
  }

  /**
   * Gets a string with all valid answers of this TextTarget. Useful for reporting users' activity.
   * @returns {string}
   */
  getAnswers() {
    return this.answers ? this.answers.join('|') : '';
  }

  /**
   * Sets specific colors to the target jQuery element, based on its `targetStatus` value. Red
   * color usually means error.
   */
  checkColors() {
    const $element = this.$comboList || this.$span;
    if ($element) {
      const style = this.doc.style[
        this.targetStatus === 'WITH_ERROR' ? 'targetError' :
          this.targetStatus === 'HIDDEN' ? 'default' : 'target'];
      if (style && style.css) {
        $element.css(style.css);
      }
    }
  }

  /**
   * Fills the `currentText` member with the text currently hosted in $span or selected in $comboList
   * @returns {string} - The current text of this target
   */
  readCurrentText() {
    if (this.$span)
      this.currentText = this.$span.text();
    else if (this.$comboList)
      this.currentText = this.$comboList.val();
    return this.currentText;
  }
}

Object.assign(TextTarget.prototype, {
  /**
   * The {@link module:activities/text/TextActivityDocument.TextActivityDocument TextActivityDocument} to which this target belongs
   * @name module:activities/text/TextActivityDocument.TextTarget#doc
   * @type {module:activities/text/TextActivityDocument.TextActivityDocument} */
  doc: null,
  /**
   * The current text displayed by this TextTarget
   * @name module:activities/text/TextActivityDocument.TextTarget#text
   * @type {string} */
  text: null,
  /**
   * A set of optional attributes for `text`
   * @name module:activities/text/TextActivityDocument.TextTarget#attr
   * @type {object} */
  attr: null,
  /**
   * `true` when the target is a drop-down list
   * @name module:activities/text/TextActivityDocument.TextTarget#isList
   * @type {boolean} */
  isList: false,
  /**
   * Number of characters initially displayed on the text field
   * @name module:activities/text/TextActivityDocument.TextTarget#numIniChars
   * @type {number} */
  numIniChars: 1,
  /**
   * Character used to fill-in the text field
   * @name module:activities/text/TextActivityDocument.TextTarget#iniChar
   * @type {string} */
  iniChar: '_',
  /**
   * Maximum length of the answer
   * @name module:activities/text/TextActivityDocument.TextTarget#maxLenResp
   * @type {number} */
  maxLenResp: 0,
  /**
   * Array of valid answers
   * @name module:activities/text/TextActivityDocument.TextTarget#answers
   * @type {string[]} */
  answers: null,
  /**
   * Set of specific options
   * @name module:activities/text/TextActivityDocument.TextTarget#options
   * @type {object} */
  options: null,
  /**
   * Text displayed by the target when the activity begins
   * @name module:activities/text/TextActivityDocument.TextTarget#iniText
   * @type {string} */
  iniText: null,
  /**
   * Type of additional information offered to the user. Possible values are: `no_info`, `always`,
   * `onError` and `onDemand`.
   * @name module:activities/text/TextActivityDocument.TextTarget#infoMode
   * @type {string} */
  infoMode: 'no_info',
  /**
   * Key that triggers the associated popup when `infoMode` is `onDemand`
   * @name module:activities/text/TextActivityDocument.TextTarget#popupKey
   * @type {string} */
  popupKey: 'F1',
  /**
   * An optional {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} with information about this TextTarget
   * @name module:activities/text/TextActivityDocument.TextTarget#popupContent
   * @type {module:boxes/ActiveBoxContent.ActiveBoxContent} */
  popupContent: null,
  /**
   * Time (seconds) to wait before showing the additional information
   * @name module:activities/text/TextActivityDocument.TextTarget#popupDelay
   * @type {number} */
  popupDelay: 0,
  /**
   * Maximum amount of time (seconds) that the additional information will be shown
   * @name module:activities/text/TextActivityDocument.TextTarget#popupMaxTime
   * @type {number} */
  popupMaxTime: 0,
  /**
   * When this flag is `true` and `popupContent` contains audio, no visual feedback will be
   * provided (meaning that audio will be just played)
   * @name module:activities/text/TextActivityDocument.TextTarget#onlyPlay
   * @type {boolean} */
  onlyPlay: false,
  //
  // TRANSIENT PROPERTIES
  //
  /**
   * The drop-down list associated to this target
   * @name module:activities/text/TextActivityDocument.TextTarget#$comboList
   * @type {external:jQuery} */
  $comboList: null,
  /**
   * The span element associated to this target
   * @name module:activities/text/TextActivityDocument.TextTarget#$span
   * @type {external:jQuery} */
  $span: null,
  /**
   * The paragraph element where $span is currently located
   * @name module:activities/text/TextActivityDocument.TextTarget#$p
   * @type {external:jQuery} */
  $p: null,
  /**
   * The span element containing the popup
   * @name module:activities/text/TextActivityDocument.TextTarget#$popup
   * @type {external:jQuery} */
  $popup: null,
  /**
   * Current text in the $span element
   * @name module:activities/text/TextActivityDocument.TextTarget#currentText
   * @type {string} */
  currentText: '',
  /**
   * Ordinal number of this target in the collection of targets
   * @name module:activities/text/TextActivityDocument.TextTarget#num
   * @type {number} */
  num: 0,
  /**
   * Current ordinal position of this target in the document
   * (used in {@link module:activities/text/OrderText.OrderText OrderText} activities)
   * @name module:activities/text/TextActivityDocument.TextTarget#pos
   * @type {number} */
  pos: 0,
  /**
   * Current status of the target. Valid values are: `NOT_EDITED`, `EDITED`, `SOLVED`, `WITH_ERROR` and `HIDDEN`
   * @name module:activities/text/TextActivityDocument.TextTarget#targetStatus
   * @type {string} */
  targetStatus: 'NOT_EDITED',
  /**
   * Flag to control if the initial content of this TextTarget has been modified
   * @name module:activities/text/TextActivityDocument.TextTarget#flagModified
   * @type {boolean} */
  flagModified: false,
  /**
   * Pointer to the activity panel containing this TextTarget
   * @name module:activities/text/TextActivityDocument.TextTarget#parentPane
   * @type {module:activities/text/TextActivityBase.TextActivityBasePanel} */
  parentPane: null,
});

TextActivityDocument.TextTarget = TextTarget;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextActivityDocument);


/***/ })

};
;
//# sourceMappingURL=3019.jclic-node.js.map