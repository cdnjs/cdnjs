"use strict";
exports.id = 9072;
exports.ids = [9072,3018,2355];
exports.modules = {

/***/ 9072:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports AlignType, ActiveBoxContent */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7912);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1253);
/* harmony import */ var _BoxBase_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3018);
/* harmony import */ var _media_MediaContent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2355);
/**
 *  File    : boxes/ActiveBoxContent.js
 *  Created : 13/04/2015
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
 *  (c) 2000-2020 Catalan Educational Telematic Network (XTEC)
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
 * This class is used as a container for horizontal and vertical alignments of content inside a cell.
 */
class AlignType {
  /**
   * AlignType constructor
   * @param {string} [h] - Horizontal alignment. Possible values are `left`, `center` and `right`
   * @param {string} [v] - Vertical alignment. Possible values are `top`, `center` and `bottom`
   */
  constructor(h, v) {
    if (h)
      this.h = h;
    if (v)
      this.v = v;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getAttr */ .iu)(this, ['h|center', 'v|center']);
  }

  /**
   * Reads the properties of this AlignType from a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:boxes/ActiveBoxContent.AlignType}
   */
  setAttributes(data) {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .setAttr */ .ob)(this, data, ['h', 'v']);
  }
}

Object.assign(AlignType.prototype, {
  h: 'center',
  v: 'center',
});

/**
 * This class defines a content that can be displayed by {@link module:boxes/ActiveBox.ActiveBox ActiveBox} objects. This content
 * can be a text, an image, a fragment of an image or a combination of text and images. The style
 * (colors, font and size, borders, shadows, margins, etc.) are specified in the `style` attribute,
 * always pointing to a {@link module:boxes/BoxBase.BoxBase BoxBase} object.
 */
class ActiveBoxContent {
  /**
   * ActiveBoxContent constructor
   * @param {string} [id] - An optional identifier.
   */
  constructor(id) {
    if (typeof id !== 'undefined')
      this.id = id;
    this.imgAlign = new AlignType();
    this.txtAlign = new AlignType();
  }

  /**
   *
   * Loads settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to be parsed
   * @param {module:bags/MediaBag.MediaBag} mediaBag - The media bag used to retrieve images and other media
   */
  setProperties($xml, mediaBag) {
    //
    // Read attributes
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, val) => {
      switch (name) {
        case 'id':
        case 'item':
          this[name] = Number(val);
          break;

        case 'width':
        case 'height':
          if (this.dimension === null)
            this.dimension = new _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Dimension */ .fg(0, 0);
          this.dimension[name] = Number(val);
          break;

        case 'txtAlign':
        case 'imgAlign':
          this[name] = this.readAlign(val);
          break;

        case 'hAlign':
          // Old style
          this['txtAlign'] = this.readAlign(val + ',center');
          this['imgAlign'] = this.readAlign(val + ',center');
          break;

        case 'border':
        case 'avoidOverlapping':
          this[name] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getBoolean */ .pW)(val);
          break;

        case 'image':
          this.image = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .nSlash */ .c4)(val);
          break;
      }
    });

    //
    // Read inner elements
    $xml.children().each((_n, child) => {
      const $node = jquery__WEBPACK_IMPORTED_MODULE_0___default()(child);
      switch (child.nodeName) {
        case 'style':
          this.style = new _BoxBase_js__WEBPACK_IMPORTED_MODULE_3__["default"](null).setProperties($node);
          break;
        case 'media':
          this.mediaContent = new _media_MediaContent_js__WEBPACK_IMPORTED_MODULE_4__["default"]().setProperties($node);
          break;
        case 'p':
          if (this.text === null)
            this.text = '';
          else
            this.text += '\n';
          this.text += child.textContent;
          break;
      }
    });

    if (mediaBag)
      this.realizeContent(mediaBag);

    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getAttr */ .iu)(this, [
      'id', 'item', 'dimension', 'border', 'avoidOverlapping', 'image', 'text',
      'objectType', // Used in TextActivityDocument
      'txtAlign', 'imgAlign', // AlignType
      'style', // BoxBase
      'mediaContent', // MediaContent
    ]);
  }

  /**
   * Reads the properties of this ActiveBoxContent from a data object
   * @param {object|string} data - The data object to be parsed, or just the text content
   * @param {module:bags/MediaBag.MediaBag} mediaBag - The media bag used to retrieve images and other media
   * @returns {module:boxes/ActiveBoxContent.ActiveBoxContent}
   */
  setAttributes(data, mediaBag) {

    if (typeof data === 'string')
      this.text = data;
    else
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .setAttr */ .ob)(this, data, [
        'id', 'item', 'border', 'avoidOverlapping', 'image', 'text',
        'objectType',
        { key: 'dimension', fn: _AWT_js__WEBPACK_IMPORTED_MODULE_1__/* .Dimension */ .fg },
        { key: 'txtAlign', fn: AlignType },
        { key: 'imgAlign', fn: AlignType },
        { key: 'style', fn: _BoxBase_js__WEBPACK_IMPORTED_MODULE_3__["default"] },
        { key: 'mediaContent', fn: _media_MediaContent_js__WEBPACK_IMPORTED_MODULE_4__["default"] },
      ]);

    if (mediaBag)
      this.realizeContent(mediaBag);

    return this;
  }

  /**
   * Decode expressions with combined values of horizontal and vertical alignments in the form:
   * "(left|middle|right),(top|middle|bottom)"
   * @param {string} str - The string to parse
   * @returns {module:boxes/ActiveBoxContent.ActiveBoxContent~alignType}
   */
  readAlign(str) {
    const align = new AlignType();
    if (str) {
      const v = str.split(',');
      align.h = v[0].replace('middle', 'center');
      align.v = v[1].replace('middle', 'center');
    }
    return align;
  }

  /**
   * Checks if this is an empty content (`text` and `img` are _null_)
   */
  isEmpty() {
    return this.text === null && this.img === null;
  }

  /**
   * Checks if two contents are equivalent
   * @param {module:boxes/ActiveBoxContent.ActiveBoxContent} abc - The content to compare with this.
   * @param {boolean} checkCase - When `true` the comparing will be case-sensitive.
   * @returns {boolean}
   */
  isEquivalent(abc, checkCase) {
    if (abc === this)
      return true;
    let result = false;
    if (abc !== null) {
      if (this.isEmpty() && abc.isEmpty())
        result = this.id === abc.id;
      else
        result = (this.text === null ? abc.text === null
          : checkCase ? this.text === abc.text
            : this.text.toLocaleLowerCase() === abc.text.toLocaleLowerCase()
        ) &&
          (this.mediaContent === null ? abc.mediaContent === null
            : this.mediaContent.isEquivalent(abc.mediaContent)
          ) &&
          this.img === abc.img &&
          (this.imgClip === null ? abc.imgClip === null
            : this.imgClip.equals(abc.imgClip));
    }
    return result;
  }

  /**
   * Sets the text content of this ActiveBox
   * @param {string} tx
   */
  setTextContent(tx) {
    // only plain text allowed!
    if (tx !== null) {
      this.text = tx;
      this.checkHtmlText();
    } else {
      this.text = null;
      this.innerHtmlText = null;
    }
  }

  /**
   * Checks if cell's text uses HTML, initializing the `innerHtmlText` member as needed.
   */
  checkHtmlText() {
    this.innerHtmlText = null;
    if ((0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .startsWith */ .w1)(this.text, '<html>', true)) {
      const htmlText = this.text.trim();
      const s = htmlText.toLocaleLowerCase();
      if (s.indexOf('<body') === -1) {
        const s2 = s.indexOf('</html>');
        if (s2 >= 0)
          this.innerHtmlText = htmlText.substring(6, s2);
      }
    }
  }

  /**
   * Sets a fragment of a main image as a graphic content of this cell.
   * Cells cannot have two graphic contents, so `image` (the specific image of this cell) should
   * be cleared with this setting.
   * @param {external:HTMLImageElement} img - The image data
   * @param {module:AWT.Shape} imgClip - A shape that clips the portion of image assigned to this content.
   * @param {string} [animatedGifFile] - When `img` is an animated GIF, its file name
   */
  setImgContent(img, imgClip, animatedGifFile) {
    this.img = img;
    this.image = null;
    this.imgClip = imgClip;
    if (animatedGifFile)
      this.animatedGifFile = animatedGifFile;
  }

  /**
   * Prepares the media content
   * @param {module:JClicPlayer.JClicPlayer} playStation - Usually a {@link module:JClicPlayer.JClicPlayer JClicPlayer}
   */
  prepareMedia(playStation) {
    if (!this.amp && this.mediaContent && this.mediaContent.type === 'PLAY_VIDEO') {
      this.amp = playStation.getActiveMediaPlayer(this.mediaContent);
      this.amp.realize();
    }
  }

  /**
   * Reads and initializes the image associated to this content
   * @param {module:bags/MediaBag.MediaBag} mediaBag - The media bag of the current project.
   */
  realizeContent(mediaBag, ps = null) {
    if (this.image !== null && this.image.length > 0) {
      this.mbe = mediaBag.getElement(this.image, true);
      if (this.mbe) {
        this.mbe.build(() => {
          this.img = this.mbe.data;
          this.animatedGifFile = this.mbe.animated ? this.mbe.getFullPath() : null;
        }, ps, true);
      }
    }
    if (this.mediaContent !== null) {
      if (this.image === null && (this.text === null || this.text.length === 0)) {
        this.img = this.mediaContent.getIcon();
        this.animatedGifFile = null;
      }
    }
    this.checkHtmlText(mediaBag);
  }

  /**
   * Gets a string representing this content, useful for checking if two different contents are
   * equivalent.
   * @returns {string}
   */
  getDescription() {
    const result = [];
    if (this.text && this.text.length)
      result.push(this.text);
    if (this.image)
      result.push(`${(0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getMsg */ .qG)('image')} ${this.image}`);
    if (this.imgClip)
      result.push(this.imgClip.toString());
    if (this.mediaContent)
      result.push(this.mediaContent.getDescription());
    return result.join(' ');
  }

  /**
   *
   * Overwrites the original `Object.toString` method, returning `getDescription` instead
   * @returns {string}
   */
  toString() {
    const result = [];
    if (this.text && this.text.length)
      result.push(this.text);
    if (this.image)
      result.push(`${(0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getMsg */ .qG)('image')} ${this.image}`);
    if (this.imgClip)
      result.push(`${(0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getMsg */ .qG)('image fragment')} ${(this.id >= 0 ? this.id : this.item) + 1}`);
    return result.join(' ') || (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getMsg */ .qG)('cell');
  }
}

Object.assign(ActiveBoxContent.prototype, {
  /**
   * The {@link module:boxes/BoxBase.BoxBase BoxBase} attribute of this content. Can be `null`, meaning {@link module:boxes/ActiveBox.ActiveBox ActiveBox} will
   * try to find a suitable style scanning down through its own BoxBase, their parent's and, finally,
   * the default values defined in `BoxBase.prototype`.
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#style
   * @type {module:boxes/BoxBase.BoxBase} */
  style: null,
  /**
   * Optimal dimension of any {@link module:boxes/ActiveBox.ActiveBox ActiveBox} taking this content.
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#dimension
   * @type {module:AWT.Dimension} */
  dimension: null,
  /**
   * The {@link module:boxes/ActiveBox.ActiveBox ActiveBox} can have or not a border despite the settings of {@link module:boxes/BoxBase.BoxBase BoxBase}.
   * The default value `null` means not to take in consideration this setting.
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#border
   * @type {boolean|null} */
  border: null,
  /**
   * The text to display on the {@link module:boxes/ActiveBox.ActiveBox ActiveBox}. It can have up to two paragraphs.
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#text
   * @type {string} */
  text: null,
  /**
   * The name of the image file to display on the {@link module:boxes/ActiveBox.ActiveBox ActiveBox}.
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#image
   * @type {string} */
  image: null,
  /**
   * An optional shape used to clip the image.
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#imgClip
   * @type {module:AWT.Shape} */
  imgClip: null,
  /**
   * The media content associated with this object.
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#mediaContent
   * @type {module:media/MediaContent.MediaContent} */
  mediaContent: null,
  /**
   * @typedef ActiveBoxContent~alignType
   * @type {object}
   * @property {string} h - Valid values are: `left`, `middle`, `right`
   * @property {string} v - Valud values are: `top`, `middle`, `bottom` */
  /**
   * The horizontal and vertical alignment of the image inside the cell.
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#imgAlign
   * @type {module:boxes/ActiveBoxContent.AlignType} */
  imgAlign: null,
  /**
   * The horizontal and vertical alignment of the text inside the cell.
   * Valid values are: `left`, `middle`, `right`, `top` and `bottom`.
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#txtAlign
   * @type {module:boxes/ActiveBoxContent.AlignType} */
  txtAlign: null,
  /**
   * Whether to avoid overlapping of image and text inside the cell when both are present.
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#avoidOverlapping
   * @type {boolean} */
  avoidOverlapping: false,
  /**
   * Numeric identifier used in activities to resolve relationships between cells
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#id
   * @type {number} */
  id: -1,
  /**
   * Numeric identifier used in activities to resolve relationships between cells
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#item
   * @type {number} */
  item: -1,
  //
  // Transient properties build and modified at run-time
  /**
   * The realized image used by this box content.
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#img
   * @type {external:HTMLImageElement} */
  img: null,
  /**
   * When `img` is an animated GIF file, this field should contain its file name
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#animatedGifFile
   * @type {string} */
  animatedGifFile: null,
  /**
   * When not null, this content should be treated as an HTML element
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#innerHtmlText
   * @type {string} */
  innerHtmlText: null,
  /**
   * The {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} associated with this content. Updated at run-time.
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#amp
   * @type {module:media/ActiveMediaPlayer.ActiveMediaPlayer} */
  amp: null,
  /**
   * The {@link module:bads/MediaBagElement.MediaBagElement} associated with this content, if any. Updated at run-time.
   * @name module:boxes/ActiveBoxContent.ActiveBoxContent#mbe
   * @type {module:bags/MediaBagElement.MediaBagElement} */
  mbe: null,
});

/**
 * An empty ActiveBoxContent
 * @type {module:boxes/ActiveBoxContent.ActiveBoxContent}
 */
ActiveBoxContent.EMPTY_CONTENT = new ActiveBoxContent();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActiveBoxContent);


/***/ }),

/***/ 3018:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export BoxBase */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7912);
/**
 *  File    : boxes/BoxBase.js
 *  Created : 12/04/2015
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
 *  (c) 2000-2020 Catalan Educational Telematic Network (XTEC)
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





const defaultValues = _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.BoxBase;

/**
 * This class contains all the main visual attributes needed to draw {@link module:boxes/AbstractBox.AbstractBox AbstractBox} objects:
 * background and foreground colors, gradients, colors for special states (inactive, alternative,
 * disabled...), margins, fonts, border strokes, etc.
 *
 * Objects derived from {@link module:boxes/AbstractBox.AbstractBox AbstractBox} can have inheritance: boxes that act as "containers"
 * of other boxes (like {@link module:boxes/BoxBag.BoxBag BoxBag}). Most of the attributes of `BoxBase` can be `null`,
 * meaning that the value of the ancestor -or the default value if the box has no ancestors- must
 * be used.
 */
class BoxBase {
  /**
   * BoxBase constructor
   * @param {module:boxes/BoxBase.BoxBase} [parent] - Another BoxBase object used to determine the value of properties not
   * locally set.
   */
  constructor(parent) {
    this.parent = parent || null;
  }

  /**
   * Loads the BoxBase settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    //
    // Read attributes
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, val) => {
      switch (name) {
        case 'shadow':
        case 'transparent':
          this[name] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(val, false);
          break;
        case 'margin':
          this[name] = Number(val);
          break;
        case 'borderStroke':
          this.borderStroke = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Stroke */ .tc(Number(val));
          break;
        case 'markerStroke':
          this.markerStroke = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Stroke */ .tc(Number(val));
          break;
      }
    });
    //
    // Read inner elements
    $xml.children().each((_n, child) => {
      const $node = jquery__WEBPACK_IMPORTED_MODULE_0___default()(child);
      switch (child.nodeName) {
        case 'font':
          this.font = (new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Font */ .KQ()).setProperties($node);
          break;

        case 'gradient':
          this.bgGradient = new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Gradient */ .Hf().setProperties($node);
          break;

        case 'color':
          this.textColor = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($node.attr('foreground'), this.textColor);
          this.backColor = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($node.attr('background'), this.backColor);
          this.shadowColor = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($node.attr('shadow'), this.shadowColor);
          this.inactiveColor = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($node.attr('inactive'), this.inactiveColor);
          this.alternativeColor = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($node.attr('alternative'), this.alternativeColor);
          this.borderColor = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .checkColor */ .I4)($node.attr('border'), this.borderColor);
          break;
      }
    });
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getAttr */ .iu)(this, [
      'shadow', 'transparent', 'margin',
      'borderStroke', 'markerStroke', // AWT.Stroke
      'font', // AWT.Font
      'bgGradient', // AWT.Gradient
      `textColor|${BoxBase.prototype.textColor}`,
      `backColor|${BoxBase.prototype.backColor}`,
      `shadowColor|${BoxBase.prototype.shadowColor}`,
      `inactiveColor|${BoxBase.prototype.inactiveColor}`,
      `alternativeColor|${BoxBase.prototype.alternativeColor}`,
      `borderColor|${BoxBase.prototype.borderColor}`,
    ]);
  }

  /**
   * Reads the properties of this BoxBase from a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:boxes/BoxBase.BoxBase}
   */
  setAttributes(data) {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .setAttr */ .ob)(this, data, [
      'shadow', 'transparent', 'margin',
      { key: 'borderStroke', fn: _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Stroke */ .tc },
      { key: 'markerStroke', fn: _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Stroke */ .tc },
      { key: 'font', fn: _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Font */ .KQ },
      { key: 'bgGradient', fn: _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Gradient */ .Hf },
      'textColor',
      'backColor',
      'shadowColor',
      'inactiveColor',
      'alternativeColor',
      'borderColor',
    ]);
  }

  /**
   * Gets the value of the specified property, scanning down to parents and prototype if not defined.
   * @param {string} property - The property to retrieve
   * @returns {any} - The object or value associated to this property
   */
  get(property) {
    if (this.hasOwnProperty(property) || this.parent === null)
      return this[property];
    else
      return this.parent.get(property);
  }

  /**
   * Sets the value of a specific property.
   * @param {string} property - The property name.
   * @param {any} value - Depends on the type of property
   */
  set(property, value) {
    this[property] = value;
    return this;
  }

  /**
   * Gets the value of the specified property, scanning down to parents if not defined, and returning
   * always an own property (not from prototype)
   * @param {string} property - The property to retrieve
   * @returns {any} - The object or value associated to this property
   */
  getOwn(property) {
    if (this.hasOwnProperty(property))
      return this[property];
    else if (this.parent !== null)
      return this.parent.getOwn(property);
    else {
      if (typeof this[property] === 'object')
        this[property] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .cloneObject */ .h2)(BoxBase.prototype[property]);
      else
        this[property] = BoxBase.prototype[property];
    }
    return this[property];
  }

  /**
   * Gets the properties defined in this BoxBase as a collection of CSS attributes
   * @param {object} [css] - An optional set of initial CSS properties
   * @param {boolean} [inactive=false] - When `true`, get CSS attributes for an inactive cell
   * @param {boolean} [inverse=false] - When `true`, get CSS attributes for an inverse cell
   * @param {boolean} [alternative=false] - When `true`, get CSS attributes for an alternative cell
   * @returns {object}
   */
  getCSS(css, inactive = false, inverse = false, alternative = false) {
    // (css will be created by [AWT.Font.toCss](AWT.html) if null or undefined)
    const font = this.get('font');
    css = font.toCss(css);

    css['color'] = inverse ? this.get('backColor')
      : alternative ? this.get('alternativeColor')
        : this.get('textColor');

    const transparent = this.get('transparent');
    css['background-color'] = transparent ? 'transparent'
      : inactive ? this.get('inactiveColor')
        : inverse ? this.get('textColor') : this.get('backColor');

    const bgGradient = this.get('bgGradient');
    if (bgGradient && !transparent)
      css['background-image'] = bgGradient.getCss();

    if (this.shadow === 1) {
      const delta = Math.max(1, Math.round(font.size / 10));
      const color = this.get('shadowColor');
      css['text-shadow'] = `${delta}px ${delta}px 3px ${color}`;
    }
    return css;
  }

  /**
   * This utility method computes the width and height of text lines rendered on an HTML
   * __canvas__ element, reducing the font size of the BoxBase as needed when they exceed the maximum
   * width and/or height.
   * @param {external:CanvasRenderingContext2D} ctx - The canvas rendering context used to draw the text.
   * @param {string} text - The text to drawn.
   * @param {number} maxWidth - Maximum width
   * @param {number} maxHeight - Maximum height
   * @returns {object[]} - An array of objects representing lines of text. Each object has a `text`
   * member with the text displayed in the line, and a `size` member with the line {@link module:AWT.Dimension}
   */
  prepareText(ctx, text, maxWidth, maxHeight) {
    const
      result = [],
      font = this.get('font'),
      height = font.getHeight();
    let totalHeight = 0;

    // divide the text in lines
    const lines = text.trim().split('\n');
    ctx.font = font.cssFont();
    for (let l = 0; l < lines.length; l++) {
      let line = lines[l].trim();
      let width = ctx.measureText(line).width;
      if (width > maxWidth) {
        // retain the last string offset that was inside maxWidth
        let
          lastOK = 0,
          lastOKWidth = 0;
        for (let p = 0; p < line.length; p++) {
          // Find next separator
          if ((0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .isSeparator */ .k$)(line[p])) {
            const w = ctx.measureText(line.substring(0, p).trim()).width;
            if (w > maxWidth)
              break;
            lastOK = p;
            lastOKWidth = w;
          }
        }
        if (lastOK > 0) {
          // Add a new line with the tail of the line
          lines.splice(l + 1, 0, line.substring(lastOK + 1).trim());
          // Adjust the current line
          line = lines[l] = line.substring(0, lastOK).trim();
          width = lastOKWidth;
        }
        else {
          // No solution found. Try resizing down the font.
          if (font.size > defaultValues.MIN_FONT_SIZE) {
            this.getOwn('font').zoom(-1);
            return this.prepareText(ctx, text, maxWidth, maxHeight);
          }
        }
      }

      // Add the line and the calculated dimension to `result`
      result.push({
        text: line,
        size: new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Dimension */ .fg(width, height)
      });

      totalHeight += height;

      if (totalHeight > maxHeight && font.size > defaultValues.MIN_FONT_SIZE) {
        // Max height exceeded. Try resizing down the font
        this.getOwn('font').zoom(-1);
        return this.prepareText(ctx, text, maxWidth, maxHeight);
      }
    }
    return result;
  }
}

Object.assign(BoxBase.prototype, {
  /**
   * The parent BoxBase object
   * @name module:boxes/BoxBase.BoxBase#parent
   * @type {module:boxes/BoxBase.BoxBase} */
  parent: null,
  /**
   * Default values
   * @name module:boxes/BoxBase.BoxBase#defaultValues
   * @type {object} */
  default: defaultValues,
  /**
   * Font size can be dynamically reduced to fit the available space if any element using this
   * `BoxBase` requests it. When this happen, this field contains the real font currently used
   * to draw text.
   * @name module:boxes/BoxBase.BoxBase#font
   * @type {module:AWT.Font} */
  font: new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Font */ .KQ(),
  /**
   * The current font size of this BoxBase. Can be dynamically adjusted when drawing.
   * @name module:boxes/BoxBase.BoxBase#dynFontSize
   * @type {number} */
  dynFontSize: 0,
  /**
   * Counts the number of times the `dynFontSize` has been reset. This is useful to avoid excessive
   * recursive loops searching the optimal font size.
   * @name module:boxes/BoxBase.BoxBase#resetFontCounter
   * @type {number} */
  resetFontCounter: 0,
  /**
   * The background color
   * @name module:boxes/BoxBase.BoxBase#backColor
   * @type {string} */
  backColor: defaultValues.BACK_COLOR,
  /**
   * The background gradient. Default is `null`.
   * @name module:boxes/BoxBase.BoxBase#bgGradient
   * @type {module:AWT.Gradient} */
  bgGradient: null,
  /**
   * The color used to write text.
   * @name module:boxes/BoxBase.BoxBase#textColor
   * @type {string} */
  textColor: defaultValues.TEXT_COLOR,
  /**
   * The color used to draw a shadow below regular text.
   * @name module:boxes/BoxBase.BoxBase#shadowColor
   * @type {string} */
  shadowColor: defaultValues.SHADOW_COLOR,
  /**
   * The color of the border.
   * @name module:boxes/BoxBase.BoxBase#borderColor
   * @type {string} */
  borderColor: defaultValues.BORDER_COLOR,
  /**
   * The color used to draw text when a cell is in `inactive` state.
   * @name module:boxes/BoxBase.BoxBase#inactiveColor
   * @type {string} */
  inactiveColor: defaultValues.INACTIVE_COLOR,
  /**
   * The color used to draw text when a cell is in `alternative` state.
   * @name module:boxes/BoxBase.BoxBase#alternativeColor
   * @type {string} */
  alternativeColor: defaultValues.ALTERNATIVE_COLOR,
  /**
   * Whether the text should have a shadow or not
   * @name module:boxes/BoxBase.BoxBase#shadow
   * @type {boolean} */
  shadow: false,
  /**
   * Whether the cell's background (and its hosted component, if any) should be transparent
   * @name module:boxes/BoxBase.BoxBase#transparent
   * @type {boolean} */
  transparent: false,
  /**
   * Wheter the cell's background should be painted or not. This property has no effect on
   * hosted components.
   * @name module:boxes/BoxBase.BoxBase#dontFill
   * @type {boolean} */
  dontFill: false,
  /**
   * The margin to respect between text elements and the limits of the cell or other elements.
   * @name module:boxes/BoxBase.BoxBase#textMargin
   * @type {number} */
  textMargin: defaultValues.AC_MARGIN,
  /**
   * The stroke used to draw the border.
   * @name module:boxes/BoxBase.BoxBase#borderStroke
   * @type {module:AWT.Stroke} */
  borderStroke: new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Stroke */ .tc(defaultValues.BORDER_STROKE_WIDTH),
  /**
   * The stroke used to draw a border around marked cells.
   * @name module:boxes/BoxBase.BoxBase#markerStroke
   * @type {module:AWT.Stroke} */
  markerStroke: new _AWT_js__WEBPACK_IMPORTED_MODULE_2__/* .Stroke */ .tc(defaultValues.MARKER_STROKE_WIDTH),
});

BoxBase.DEFAULT_BOX_BASE = new BoxBase();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BoxBase);


/***/ }),

/***/ 2355:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ media_MediaContent)
});

// UNUSED EXPORTS: MediaContent

// EXTERNAL MODULE: external "jquery"
var external_jquery_ = __webpack_require__(7750);
var external_jquery_default = /*#__PURE__*/__webpack_require__.n(external_jquery_);
// EXTERNAL MODULE: ./src/AWT.js
var AWT = __webpack_require__(7912);
// EXTERNAL MODULE: ./src/Utils.js
var Utils = __webpack_require__(1253);
;// ./src/media/icons/generic.svg
const generic_namespaceObject = "<svg height=\"48\" viewBox=\"0 0 48 48\" width=\"48\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M28.8 12L28 8H10v34h4V28h11.2l.8 4h14V12z\" />\n</svg>\n";
;// ./src/media/icons/audio.svg
const audio_namespaceObject = "<svg fill=\"#000000\" height=\"48\" viewBox=\"0 0 24 24\" width=\"48\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z\" />\n</svg>\n";
;// ./src/media/icons/mic.svg
const mic_namespaceObject = "<svg fill=\"#000000\" height=\"48\" viewBox=\"0 0 24 24\" width=\"48\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z\" />\n</svg>\n";
;// ./src/media/icons/movie.svg
const movie_namespaceObject = "<svg fill=\"#000000\" height=\"48\" viewBox=\"0 0 24 24\" width=\"48\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z\" />\n</svg>\n";
;// ./src/media/icons/music.svg
const music_namespaceObject = "<svg fill=\"#000000\" height=\"48\" viewBox=\"0 0 24 24\" width=\"48\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z\" />\n</svg>\n";
;// ./src/media/icons/url.svg
const url_namespaceObject = "<svg fill=\"#000000\" height=\"48\" viewBox=\"0 0 24 24\" width=\"48\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\" />\n</svg>\n";
;// ./src/media/MediaContent.js
/**
 *  File    : media/MediaContent.js
 *  Created : 13/04/2015
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

/* global Image */












/**
 * This object contains a description of any multimedia content (sound, video, MIDI, voice
 * recording..) or special actions (jump to another point in the sequence, link to an URL, etc.)
 * associated to an {@link module:boxes/ActiveBox.ActiveBox ActiveBox} object.
 */
class MediaContent {
  /**
   * MediaContent constructor
   * @param {string} type - The type of media. Valid values are: `UNKNOWN`, `PLAY_AUDIO`, `PLAY_VIDEO`,
   * `PLAY_MIDI`, `PLAY_CDAUDIO`, `RECORD_AUDIO`, `PLAY_RECORDED_AUDIO`, `RUN_CLIC_ACTIVITY`,
   * `RUN_CLIC_PACKAGE`, `RUN_EXTERNAL`, `URL`, `EXIT` and `RETURN`
   * @param {string} [file] - Optional parameter indicating the media file name
   */
  constructor(type, file) {
    this.type = type;
    if (file)
      this.file = file;
  }

  /**
   * Loads the MediaContent settings from a specific JQuery XML element
   * @param {external:jQuery} $xml
   */
  setProperties($xml) {
    (0,Utils/* attrForEach */.GM)($xml.get(0).attributes, (name, val) => {
      switch (name) {
        case 'type':
          this.type = val;
          break;
        case 'file':
          this.file = (0,Utils/* nSlash */.c4)(val);
          break;
        case 'params':
          this.externalParam = (0,Utils/* nSlash */.c4)(val);
          break;

        case 'pFrom':
          this.absLocationFrom = val;
          break;

        case 'buffer':
          this.recBuffer = Number(val);
          break;
        case 'level':
        case 'from':
        case 'to':
        case 'length':
          this[name] = Number(val);
          break;

        case 'px':
        case 'py':
          if (this.absLocation === null)
            this.absLocation = new AWT/* Point */.bR(0, 0);
          if (name === 'px')
            this.absLocation.x = Number(val);
          else
            this.absLocation.y = Number(val);
          break;

        case 'stretch':
        case 'free':
        case 'catchMouseEvents':
        case 'loop':
        case 'autostart':
          this[name] = (0,Utils/* getBoolean */.pW)(val);
          break;
      }
    });
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return (0,Utils/* getAttr */.iu)(this, [
      'type', 'file', 'externalParam',
      'absLocation', // -> AWT.Point
      'absLocationFrom', 'recBuffer',
      'level|1', 'from', 'to', 'length',
      'stretch', 'free', 'catchMouseEvents', 'loop', 'autostart'
    ]);
  }

  /**
   * Reads the properties of this MediaContent from a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:media/MediaContent.MediaContent}
   */
  setAttributes(data) {
    return (0,Utils/* setAttr */.ob)(this, data, [
      'type', 'file', 'externalParam',
      { key: 'absLocation', fn: AWT/* Point */.bR },
      'absLocationFrom', 'recBuffer',
      'level', 'from', 'to', 'length',
      'stretch', 'free', 'catchMouseEvents', 'loop', 'autostart',
    ]);
  }

  /**
   * Compares this object with another MediaContent.
   * @param {module:media/MediaContent.MediaContent} mc - The Media Content to compare against to.
   * @returns {boolean} - `true` when both objects are equivalent.
   */
  isEquivalent(mc) {
    return this.type === mc.type &&
      (this.file === mc.file ||
        this.file !== null && mc.file !== null &&
        this.file.toLocaleLowerCase() === mc.file.toLocaleLowerCase()) &&
      this.from === mc.from &&
      this.to === mc.to &&
      this.recBuffer === mc.recBuffer;
  }

  /**
   * Gets a string representing this media content, useful for checking if two different elements
   * are equivalent.
   * @returns {string}
   */
  getDescription() {
    let result = `${this.type}`;
    if (this.file)
      result = `${result} ${this.file}${this.from >= 0 ? ` from:${this.from}` : ''}${this.to >= 0 ? ` to:${this.to}` : ''}`;
    else if (this.externalParam)
      result = `${result} ${this.externalParam}`;
    return result;
  }

  /**
   * Returns a simplified description of this media content. Useful for accessibility methods.
   * @returns {string}
   */
  toString() {
    return `${this.type}${this.file ? ` ${this.file}` : ''}`;
  }

  /**
   * Returns an image to be used as icon for representing this media content.
   * @returns {external:HTMLImageElement}
   */
  getIcon() {
    let icon = null;
    switch (this.type) {
      case 'PLAY_AUDIO':
      case 'PLAY_RECORDED_AUDIO':
        icon = 'audio';
        break;
      case 'RECORD_AUDIO':
        icon = 'mic';
        break;
      case 'PLAY_VIDEO':
        icon = 'movie';
        break;
      case 'PLAY_MIDI':
        icon = 'music';
        break;
      case 'URL':
        icon = 'url';
        break;
      default:
        icon = 'generic';
        break;
    }
    return icon ? MediaContent.ICONS[icon] : null;
  }
}

Object.assign(MediaContent.prototype, {
  /**
   * The type of media. Valid values are: `UNKNOWN`, `PLAY_AUDIO`, `PLAY_VIDEO`,
   * `PLAY_MIDI`, `PLAY_CDAUDIO`, `RECORD_AUDIO`, `PLAY_RECORDED_AUDIO`, `RUN_CLIC_ACTIVITY`,
   * `RUN_CLIC_PACKAGE`, `RUN_EXTERNAL`, `URL`, `EXIT` and `RETURN`
   * @name module:media/MediaContent.MediaContent#type
   * @type {string} */
  type: 'UNKNOWN',
  /**
   * The priority level is important when different medias want to play together. Objects with
   * highest priority level can mute lower ones.
   * @name module:media/MediaContent.MediaContent#level
   * @type {number} */
  level: 1,
  /**
   * Media file name
   * @name module:media/MediaContent.MediaContent#file
   * @type {string} */
  file: null,
  /**
   * Optional parameters passed to external calls
   * @name module:media/MediaContent.MediaContent#externalParams
   * @type {string} */
  externalParam: null,
  /**
   * Special setting used to play only a fragment of media. `-1` means not used (plays full
   * length, from the beginning)
   * @name module:media/MediaContent.MediaContent#from
   * @type {number} */
  from: -1,
  /**
   * Special setting used to play only a fragment of media. `-1` means not used (plays to the end
   * of the media)
   * @name module:media/MediaContent.MediaContent#to
   * @type {number} */
  to: -1,
  /**
   * When `type` is `RECORD_AUDIO`, this member stores the maximum length of the recorded
   * sound, in seconds.
   * @name module:media/MediaContent.MediaContent#length
   * @type {number} */
  length: 3,
  /**
   * When `type` is `RECORD_AUDIO`, this member stores the buffer ID where the recording
   * will be stored.
   * @name module:media/MediaContent.MediaContent#recBuffer
   * @type {number} */
  recBuffer: 0,
  /**
   * Whether to stretch or not the video size to fit the cell space.
   * @name module:media/MediaContent.MediaContent#stretch
   * @type {boolean} */
  stretch: false,
  /**
   * When `true`, the video plays out of the cell, centered on the activity window.
   * @name module:media/MediaContent.MediaContent#free
   * @type {boolean} */
  free: false,
  /**
   * Places the video window at a specific location.
   * @name module:media/MediaContent.MediaContent#absLocation
   * @type {module:AWT.Point} */
  absLocation: null,
  /**
   * When {@link module:media/MediaContent.MediaContent#absLocation} is not `null`, this field indicates from where to
   * measure its coordinates. Valid values are: `BOX`, `WINDOW` or `FRAME`.
   * @name module:media/MediaContent.MediaContent#absLocationFrom
   * @type {string} */
  absLocationFrom: null,
  /**
   * `true` when the video window must catch mouse clicks.
   * @name module:media/MediaContent.MediaContent#catchMouseEvents
   * @type {boolean} */
  catchMouseEvents: false,
  /**
   * Whether to repeat the media in loop, or just one time.
   * @name module:media/MediaContent.MediaContent#loop
   * @type {boolean} */
  loop: false,
  /**
   * When `true`, the media will automatically start playing when the associated {@link module:boxes/ActiveBox.ActiveBox ActiveBox}
   * become active.
   * @name module:media/MediaContent.MediaContent#autoStart
   * @type {boolean} */
  autoStart: false,
});

/**
 * Default icons for media types.
 * @type {object} */
const ICONS = {
  generic: generic_namespaceObject,
  audio: audio_namespaceObject,
  movie: movie_namespaceObject,
  mic: mic_namespaceObject,
  music: music_namespaceObject,
  url: url_namespaceObject,
};

/**
 * Collection of icon {@link external:HTMLImageElement} objects
 * @name module:media/MediaContent.MediaContent.ICONS
 * @type {object} */
MediaContent.ICONS = {};

// Load the icons
external_jquery_default().each(ICONS, (key, value) => {
  const img = new Image();
  img.src = (0,Utils/* svgToURI */.g8)(value);
  MediaContent.ICONS[key] = img;
});

/* harmony default export */ const media_MediaContent = (MediaContent);


/***/ })

};
;
//# sourceMappingURL=9072.jclic-node.js.map