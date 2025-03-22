"use strict";
exports.id = 4112;
exports.ids = [4112,2355];
exports.modules = {

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
//# sourceMappingURL=4112.jclic-node.js.map