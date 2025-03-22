"use strict";
exports.id = 9950;
exports.ids = [9950,5550];
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


/***/ }),

/***/ 9950:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export JClicProject */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ProjectSettings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(570);
/* harmony import */ var _bags_ActivitySequence_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2316);
/* harmony import */ var _bags_MediaBag_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5550);
/* harmony import */ var _Activity_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1567);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1253);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7912);
/**
 *  File    : project/JClicProject.js
 *  Created : 01/04/2015
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
 *  JClicProject contains all the components of a JClic project: activities, sequences, media
 *  files, descriptors and metadata.
 *
 *  This encapsulation is achieved by three auxiliary objects:
 *  - {@link module:project/ProjectSettings.ProjectSettings ProjectSettings}: stores metadata like full title, description, authors, languages,
 *  educational topics...
 *  - {@link module:bags/ActivitySequence.ActivitySequence ActivitySequence}: defines the order in which the activities must be shown.
 *  - {@link module:bags/MediaBag.MediaBag MediaBag}: contains the list of all media files used by the activities
 */
class JClicProject {
  /**
   * JClicProject constructor
   */
  constructor() {
    this.settings = new _ProjectSettings_js__WEBPACK_IMPORTED_MODULE_1__["default"](this);
    this.activitySequence = new _bags_ActivitySequence_js__WEBPACK_IMPORTED_MODULE_2__["default"](this);
    this._activities = {};
    this.mediaBag = new _bags_MediaBag_js__WEBPACK_IMPORTED_MODULE_3__["default"](this);
  }

  /**
   * Loads the project settings from a main jQuery XML element
   * @param {external:jQuery} $xml - The XML element
   * @param {string} path - The full path of this project
   * @param {external:JSZip} [zip] - An optional JSZip object where this project is encapsulated
   * @param {object} [options] - An object with miscellaneous options
   * @returns {module:project/JClicProject.JClicProject}
   */
  setProperties($xml, path, zip, options) {
    if (path) {
      this.path = path;
      if (path.file)
        this.basePath = path;
      else
        this.basePath = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_5__/* .getBasePath */ .DT)(path);
    }
    this.zip = zip;
    this.name = $xml.attr('name');
    this.version = $xml.attr('version');
    if ($xml.attr('type') !== undefined && $xml.attr('type') !== '')
      this.type = $xml.attr('type');
    if ($xml.attr('code') !== undefined && $xml.attr('code') !== '')
      this.code = $xml.attr('code');
    this.settings.setProperties($xml.children('settings'));
    this.activitySequence.setProperties($xml.children('sequence'));
    this.mediaBag.setProperties($xml.children('mediaBag'));
    this.reportableActs = 0;
    this._activities = {};
    const $node = $xml.children('activities');
    const $acts = $node.children('activity');
    const ownFonts = this.mediaBag.getElementsOfType('font');
    if (ownFonts.length > 0)
      options.ownFonts = (options.ownFonts || []).concat(ownFonts);
    // Skip checkTree when in NodeJS, due to a JSDOM error with jQuery in XML mode
    if (!_Utils_js__WEBPACK_IMPORTED_MODULE_5__/* .settings */ .W0.NODEJS)
      _AWT_js__WEBPACK_IMPORTED_MODULE_6__/* .Font */ .KQ.checkTree($acts, options);
    $acts.each((_n, act) => {
      const $act = jquery__WEBPACK_IMPORTED_MODULE_0___default()(act);
      this._activities[(0,_Utils_js__WEBPACK_IMPORTED_MODULE_5__/* .nSlash */ .c4)($act.attr('name'))] = $act;
      if ($act.children('settings').attr('report') === 'true')
        this.reportableActs++;
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
    const keys = Object.keys(this._activities);
    this.activities = {};
    keys.forEach(k => {
      const act = this._activities[k];
      this.activities[k] = act.jquery ? _Activity_js__WEBPACK_IMPORTED_MODULE_4__["default"].getActivity(act, this) : act;
    });

    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_5__/* .getAttr */ .iu)(this, ['name', 'version', 'type', 'code', 'settings', 'activitySequence', 'activities', 'mediaBag']);
  }

  /**
   * Gets a JSON string representing the content of this project. This string can be transformed later into a data
   * object suitable for `setAttributes`.
   * @param {number} [space] - The number of white spaces to place between items. Defaults to zero (meaning all the JSON rendered in one single line)
   * @returns {string} - The JSON text
   */
  getJSON(space = 0) {
    return JSON.stringify(
      this.getAttributes(),
      (_key, val) => val.toFixed ? Number(val.toFixed(4)) : val,
      space
    );
  }

  /**
   * Loads the project settings from a data object
   * @param {object} data - The data object
   * @param {string} path - The full path of this project
   * @param {external:JSZip} [zip] - An optional JSZip object where this project is encapsulated
   * @param {object} [options] - An object with miscellaneous options
   * @returns {module:project/JClicProject.JClicProject}
   */
  setAttributes(data, path, zip, options) {
    if (path) {
      this.path = path;
      if (path.file)
        this.basePath = path;
      else
        this.basePath = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_5__/* .getBasePath */ .DT)(path);
    }
    this.zip = zip;
    this.name = data.name;
    this.version = data.version;
    if (data.type)
      this.type = data.type;
    if (data.code)
      this.code = data.code;
    this.settings.setAttributes(data.settings);
    this.activitySequence.setAttributes(data.activitySequence);
    this.mediaBag.setAttributes(data.mediaBag);
    this.reportableActs = 0;
    this._activities = data.activities;

    const ownFonts = this.mediaBag.getElementsOfType('font');
    if (ownFonts.length > 0)
      options.ownFonts = (options.ownFonts || []).concat(ownFonts);
    // TODO: Check fonts
    _AWT_js__WEBPACK_IMPORTED_MODULE_6__/* .Font */ .KQ.checkTree(this._activities, options);
    this.reportableActs = Object.keys(this._activities)
      .filter(k => this._activities[k].includeInReports)
      .length;
    return this;
  }

  /**
   * Finds activities by name and builds the corresponding {@link module:Activity.Activity Activity} object.
   * @param {string} name - The name of the requested activity
   * @returns {module:Activity.Activity}
   */
  getActivity(name) {
    return _Activity_js__WEBPACK_IMPORTED_MODULE_4__["default"].getActivity(this._activities[(0,_Utils_js__WEBPACK_IMPORTED_MODULE_5__/* .nSlash */ .c4)(name)], this);
  }

  /**
   *
   * Builds the {@link module:skins/Skin.Skin Skin}, {@link module:media/EventSounds.EventSounds EventSounds} and {@link module:bags/MediaBag.MediaBag MediaBag} fonts associated to this project.
   * @param {module:JClicPlayer.JClicPlayer} ps - The PlayStation (usually a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) linked to this project.
   */
  realize(ps) {
    // Build skin
    if (this.skin === null && this.settings.skinFileName !== null && this.settings.skinFileName.length > 0)
      this.skin = this.mediaBag.getSkinElement(this.settings.skinFileName, ps);

    this.settings.eventSounds.realize(ps, this.mediaBag);

    // Build all elements of type `font`
    this.mediaBag.buildAll('font', null, ps);
  }

  /**
   * Run finalizers on realized objects
   */
  end() {
    // TODO: Implement JClicProject.end()
  }
}

Object.assign(JClicProject.prototype, {
  /**
   * The project's name
   * @name module:project/JClicProject.JClicProject#name
   * @type {string} */
  name: 'unknown',
  /**
   * The version of the XML file format used to save the project (currently 0.1.3)
   * @name module:project/JClicProject.JClicProject#version
   * @type {string} */
  version: '0.1.3',
  /**
   * Optional property that can be used by reporting systems
   * @name module:project/JClicProject.JClicProject#type
   * @type {string} */
  type: null,
  /**
   * Optional property that can be used by reporting systems
   * @name module:project/JClicProject.JClicProject#code
   * @type {string} */
  code: null,
  /**
   * Object containing the project settings
   * @name module:project/JClicProject.JClicProject#settings
   * @type {module:project/ProjectSettings.ProjectSettings} */
  settings: null,
  /**
   * Object containing the order in which the activities should be played
   * @name module:project/JClicProject.JClicProject#activitySequence
   * @type {module:bags/ActivitySequence.ActivitySequence} */
  activitySequence: null,
  /**
   * Array of jQuery xml elements containing the data of each activity. Don't rely on this object
   * to retrieve real activities. Use the method {@link module:project/JClicProject.JClicProject#getActivity getActivity} instead.
   * @name module:project/JClicProject.JClicProject#_activities
   * @private
   * @type {external:jQuery[]} */
  _activities: null,
  /**
   * Number of activities suitable to be included reports
   * @name module:project/JClicProject.JClicProject#reportableActs
   * @type {number}
   */
  reportableActs: 0,
  /**
   * The collection of all media elements used in this project
   * @name module:project/JClicProject.JClicProject#mediaBag
   * @type {module:bags/MediaBag.MediaBag} */
  mediaBag: null,
  /**
   * The object that builds and manages the visual interface presented to users
   * @name module:project/JClicProject.JClicProject#skin
   * @type {module:skins/Skin.Skin} */
  skin: null,
  /**
   * Relative path or absolute URL to be used as a base to access files, usually in conjunction
   * with {@link module:JClicPlayer.JClicPlayer#basePath}
   * @name module:project/JClicProject.JClicProject#basePath
   * @type {string} */
  basePath: '',
  /**
   * Full path of this project
   * @name module:project/JClicProject.JClicProject#path
   * @type {string} */
  path: null,
  /**
   * The JSZip object where this project is stored (can be `null`)
   * @name module:project/JClicProject.JClicProject#zip
   * @type {external:JSZip} */
  zip: null,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JClicProject);


/***/ }),

/***/ 570:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ProjectSettings */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _media_EventSounds_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5338);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1253);
/**
 *  File    : project/ProjectSettings.js
 *  Created : 01/04/2015
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

/* global window */





/**
 * This class contains miscellaneous settings of JClic projects.
 *
 * In addition to the members of this class, there can be other properties in JClic project files
 * that are not currently loaded:
 * - iconFileName
 * - descriptors
 * - area
 * - level
 * - locale
 * - authors
 * - organizations
 * - revisions
 */
class ProjectSettings {
  /**
   * ProjectSettings constructor
   * @param {module:project/JClicProject.JClicProject} project - The project to which this settings belongs
   */
  constructor(project) {
    this.project = project;
    this.authors = [];
    this.organizations = [];
    this.revisions = [];
    this.languages = [];
    this.locales = [];
    this.description = {};
    this.tags = {};
  }

  /**
   * Reads the ProjectSettings values from a JQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    let single_description = null;
    const multiple_descriptions = [];

    $xml.children().each((_n, child) => {
      switch (child.nodeName) {
        case 'title':
          this.title = child.textContent;
          break;
        case 'description':
          single_description = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getXmlNodeText */ .H_)(child);
          break;
        case 'descriptions':
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(child).children().each((_n, desc) => multiple_descriptions.push((0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .parseXmlNode */ .Fy)(desc)));
          break;
        case 'author':
          this.authors.push((0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .reduceTextsToStrings */ .DC)((0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .parseXmlNode */ .Fy)(child)));
          break;
        case 'organization':
          this.organizations.push((0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .reduceTextsToStrings */ .DC)((0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .parseXmlNode */ .Fy)(child)));
          break;
        case 'revision':
          const revision = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .reduceTextsToStrings */ .DC)((0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .parseXmlNode */ .Fy)(child));
          if (revision.date)
            revision.date = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .parseOldDate */ .DV)(revision.date);
          this.revisions.push(revision);
          break;
        case 'language':
          this.languages.push((0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .cleanOldLanguageTag */ .bG)(child.textContent));
          break;
        case 'eventSounds':
          this.eventSounds = new _media_EventSounds_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
          this.eventSounds.setProperties(jquery__WEBPACK_IMPORTED_MODULE_0___default()(child));
          break;
        case 'skin':
          this.skinFileName = jquery__WEBPACK_IMPORTED_MODULE_0___default()(child).attr('file');
          break;
        case 'descriptors':
          this.tags = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .parseXmlNode */ .Fy)(child, true);
          if (this.tags['#text']) {
            this.tags.other = this.tags['#text'].textContent;
            delete this.tags['#text'];
          }
          break;
        case 'license':
          this.license = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getXmlNodeText */ .H_)(child);
          break;
        case 'cover':
        case 'thumb':
          const img = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getXmlNodeText */ .H_)(child);
          if (img.file)
            this[child.nodeName] = img.file;
          break;
      }
    });

    this.buildLocales();

    multiple_descriptions.forEach(d => {
      if (d.language && d.text)
        this.description[d.language] = d.text;
    });

    if (single_description && this.languages.length > 0 && !this.description[this.languages[0]])
      this.description[this.languages[0]] = single_description;

    return this;
  }

  buildLocales() {
    // Try to find an array of valid locales
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
    if (this.languages.length > 0 && window.Intl && window.Intl.getCanonicalLocales) {
      this.locales = [];
      this.languages.forEach(lang => {
        // Languages usually are stored in the form: "English (en)"
        const matches = /\(([a-z,A-Z,-]+)\)/.exec(lang);
        if (matches && matches.length > 1) {
          try {
            const canonicals = window.Intl.getCanonicalLocales(matches[1]);
            if (canonicals)
              this.locales = this.locales.concat(canonicals);
          } catch (_err) {
            (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .log */ .Rm)('error', `Invalid language: ${lang}`);
          }
        }
      });
    }
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
      'title', 'description',
      'tags', 'languages', 'license',
      'authors', 'organizations',
      'revisions',
      'cover', 'thumb',
      'skinFileName', 'eventSounds'
    ]);
  }

  /**
   * Reads the properties of this ProjectSettings from a data object
   * @param {object} data - The data object to be parsed, or just the text content
   * @returns {module:project/ProjectSettings.ProjectSettings}
   */
  setAttributes(data) {
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .setAttr */ .ob)(this, data, [
      'title', 'description',
      'tags', 'languages', 'license',
      'authors', 'organizations',
      'revisions',
      'cover', 'thumb',
      'skinFileName', 'eventSounds'
    ]);

    // Build Date objects in revisions
    if (this.revisions)
      this.revisions.forEach(rv => {
        if (rv.date)
          rv.date = new Date(rv.date);
      });

    return this.buildLocales();
  }
}

Object.assign(ProjectSettings.prototype, {
  /**
   * The JClicProject to which this ProjectSettings belongs
   * @name module:project/ProjectSettings.ProjectSettings#project
   * @type {module:project/JClicProject.JClicProject} */
  project: null,
  /**
   * The project title
   * @name module:project/ProjectSettings.ProjectSettings#title
   * @type {string} */
  title: 'Untitled',
  /**
   * The authors of this project.
   * Each author is represented by an object with the following attributes:
   * `name` (mandatory), `mail`, `rol`, `organization` and `url`
   * @name module:project/ProjectSettings.ProjectSettings#authors
   * @type {object[]} */
  authors: null,
  /**
   * Schools, companies and other institutions involved on this project.
   * Each organization is represented by an object with the following attributes:
   * `name` (mandatory), `mail`, `url`, `address`, `pc`, `city`, `state`, `country`, `comments`
   * @name module:project/ProjectSettings.ProjectSettings#organizations
   * @type {object[]} */
  organizations: null,
  /**
   * The history of revisions made to this project.
   * Revisions are represented by objects with the following attributes:
   * `date` (mandatory), `description`, `comments` and `author`
   * @name module:project/ProjectSettings.ProjectSettings#revisions
   * @type {object[]} */
  revisions: null,
  /**
   * Project's description, maybe in multiple languages.
   * @name module:project/ProjectSettings.ProjectSettings#description
   * @type {object} */
  description: null,
  /**
   * JClic projects can use more than one language, so use a string array
   * @name module:project/ProjectSettings.ProjectSettings#languages
   * @type {string[]} */
  languages: null,
  tags: null,
  cover: null,
  thumb: null,
  license: {
    type: 'by-nc-sa',
    url: 'https://creativecommons.org/licenses/by-nc-sa/4.0',
  },
  /**
   * Array of canonical locales, as defined in
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation|Intl}
   * @name module:project/ProjectSettings.ProjectSettings#locales
   * @type {string[]} */
  locales: null,
  /**
   * The name of an optional 'skin' (visual aspect) can be set for the whole project, or for each {@link module:Activity.Activity Activity}
   * @name module:project/ProjectSettings.ProjectSettings#skinFileName
   * @type {string} */
  skinFileName: null,
  /**
   * The main {@link module:media/EventSounds.EventSounds EventSounds} object of the project
   * @name module:project/ProjectSettings.ProjectSettings#eventSounds
   * @type {module:media/EventSounds.EventSounds} */
  eventSounds: new _media_EventSounds_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectSettings);


/***/ })

};
;
//# sourceMappingURL=9950.jclic-node.js.map