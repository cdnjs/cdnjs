"use strict";
exports.id = 5550;
exports.ids = [5550];
exports.modules = {

/***/ 5550:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export MediaBag */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MediaBagElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1196);
/* harmony import */ var _skins_Skin_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(757);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1253);
/**
 *  File    : bags/MediaBag.js
 *  Created : 07/04/2015
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
 * This class stores and manages all the media components (images, sounds, animations, video,
 * MIDI files, etc.) needed to run the activities of a {@link module:project/JClicProject.JClicProject JClicProject}. The main member of
 * the class is `elements`. This is where {@link module:bads/MediaBagElement.MediaBagElement} objects are stored.
 */
class MediaBag {
  /**
   * MediaBag constructor
   * @param {module:project/JClicProject.JClicProject} project - The JClic project to which this media bag belongs
   */
  constructor(project) {
    this.project = project;
    this.elements = {};
  }

  /**
   * Loads this object settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    $xml.children('media').each((_n, child) => {
      const mbe = new _MediaBagElement_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.project.basePath, null, this.project.zip);
      mbe.setProperties(jquery__WEBPACK_IMPORTED_MODULE_0___default()(child));
      this.elements[mbe.name] = mbe;
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
    return Object.keys(this.elements).map(k => this.elements[k].getAttributes());
  }

  /**
   * Loads the MediaBag content from a data object
   * @param {object} data - The data object to parse
   */
  setAttributes(data) {
    data.forEach(el => {
      const mbe = new _MediaBagElement_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.project.basePath, null, this.project.zip);
      mbe.setAttributes(el);
      this.elements[mbe.name] = mbe;
    });
    return this;
  }

  /**
   * Finds a {@link module:bads/MediaBagElement.MediaBagElement} by its name, creating a new one if not found and requested.
   * @param {string} name - The name of the element
   * @param {boolean} [create] - When `true`, a new MediaBagElement will be created if not found,
   * using 'name' as its file name.
   * @returns {module:bags/MediaBagElement.MediaBagElement}
   */
  getElement(name, create) {
    name = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .nSlash */ .c4)(name);
    let result = this.elements[name];
    if (create && !result)
      result = this.getElementByFileName(name, create);
    return result;
  }

  /**
   * Gets a {@link module:bads/MediaBagElement.MediaBagElement} by its file name.
   * @param {string} file - The requested file name
   * @param {boolean} [create] - When `true`, a new {@link module:bads/MediaBagElement.MediaBagElement} will be created if not
   * found.
   * @returns {module:bags/MediaBagElement.MediaBagElement}
   */
  getElementByFileName(file, create) {
    let result = null;
    if (file) {
      file = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .nSlash */ .c4)(file);
      for (let name in this.elements) {
        if (this.elements[name].file === file) {
          result = this.elements[name];
          break;
        }
      }
      if (!result && create) {
        result = new _MediaBagElement_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.project.basePath, null, this.project.zip);
        result.name = file;
        result.file = file;
        result.ext = file.toLowerCase().split('#')[0].split('.').pop();
        result.type = result.getFileType(result.ext);
        this.elements[result.name] = result;
      }
    }
    return result;
  }

  /**
   * Get the names of the media elements that are of the given type.
   * When the search type is `font`, the `fontName` property is used instead of `name`
   * @param {string} type - The type of elements to search
   * @returns {string[]}
   */
  getElementsOfType(type) {
    const result = [];
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(this.elements, (name, element) => {
      if (element.type === type)
        result.push(type === 'font' ? element.fontName : name);
    });
    return result;
  }

  /**
   * Preloads all resources.
   *
   * __Use with care!__ Calling this method will start loading all the resources defined in the
   * MediaBag, whether used or not in the current activity.
   * @param {string} type - The type of media to be build. When `null` or `undefined`, all
   * resources will be build.
   * @param {function} [callback] - Function to be called when each element is ready.
   * @param {module:JClicPlayer.JClicPlayer} [ps] - An optional `PlayStation` (currently a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) used to dynamically load fonts
   * @returns {number} - The total number of elements that will be built
   */
  buildAll(type, callback, ps) {
    let count = 0;
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(this.elements, (name, element) => {
      if (!type || element.type === type) {
        element.build(callback, ps, false);
        count++;
      }
    });
    return count;
  }

  /**
   * Checks if there are media waiting to be loaded
   * @returns {number} - The amount of media elements already loaded, or -1 if all elements are ready
   */
  countWaitingElements() {
    let
      ready = 0,
      allReady = true;

    // Only for debug purposes: return always 'false'
    // TODO: Check loading process!
    jquery__WEBPACK_IMPORTED_MODULE_0___default().each(this.elements, (name, element) => {
      if (element.data && !element.ready && !element.checkReady() && !element.checkTimeout()) {
        (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__/* .log */ .Rm)('debug', '... waiting for: %s', name);
        allReady = false;
      } else
        ready++;
    });
    return allReady ? -1 : ready;
  }

  /**
   * Loads a {@link module:skins/Skin.Skin Skin} object
   * @param {string} name - The skin name to be loaded
   * @param {string} ps - The {@link module:JClicPlayer.JClicPlayer JClicPlayer} linked to the skin
   * @returns {module:skins/Skin.Skin}
   */
  getSkinElement(name, ps) {
    return _skins_Skin_js__WEBPACK_IMPORTED_MODULE_2__["default"].getSkin(name, ps);
  }
}

Object.assign(MediaBag.prototype, {
  /**
   * The collection of {@link module:bads/MediaBagElement.MediaBagElement} objects
   * @name module:bags/MediaBag.MediaBag#elements
   * @type {object} */
  elements: null,
  /**
   * The JClic project to which this MediaBag belongs
   * @name module:bags/MediaBag.MediaBag#project
   * @type {module:project/JClicProject.JClicProject} */
  project: null,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MediaBag);


/***/ })

};
;
//# sourceMappingURL=5550.jclic-node.js.map