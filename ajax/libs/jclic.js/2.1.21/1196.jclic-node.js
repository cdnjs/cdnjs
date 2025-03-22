"use strict";
exports.id = 1196;
exports.ids = [1196,3391];
exports.modules = {

/***/ 1196:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export MediaBagElement */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _media_MidiAudioPlayer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3391);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1253);
/* harmony import */ var _AWT_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7912);
/**
 *  File    : bags/MediaBagElement.js
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

/* global URL, Uint8Array, XMLHttpRequest, Image, document */






/**
 * This kind of objects are the components of {@link module:bags/MediaBag.MediaBag MediaBag}.
 *
 * Media elements have a name, a reference to a file (the `file` field) and, when initialized,
 * a `data` field pointing to a object containing the real media. They have also a flag indicating
 * if the data must be saved on the {@link module:project/JClicProject.JClicProject JClicProject} zip file or just maintained as a reference
 * to an external file.
 */
class MediaBagElement {
  /**
   * MediaBagElement constructor
   * @param {string} basePath - Path to be used as a prefix of the file name
   * @param {string} file - The media file name
   * @param {external:JSZip} [zip] - An optional JSZip object from which the file must be extracted.
   */
  constructor(basePath, file, zip) {
    if (basePath)
      this.basePath = basePath;
    if (file) {
      this.file = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .nSlash */ .c4)(file);
      this.name = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .nSlash */ .c4)(file);
      this.ext = this.file.toLowerCase().split('.').pop();
      this.type = this.getFileType(this.ext);
      if (this.ext === 'gif')
        this.checkAnimatedGif();
    }
    if (zip)
      this.zip = zip;
    this.timeout = Date.now() + _Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .settings */ .W0.LOAD_TIMEOUT;
  }


  /**
   * Private static array of {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement HTMLAudioElements},
   * to be reused between all media elements of type 'audio'. One for each priority level
   * @name module:bags/MediaBagElement#_audioPlayers
   * @type {external:HTMLAudioElement[]}
   */
  static _audioPlayers = [];

  /**
   * Gets the static {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement HTMLAudioElement}
   * associated to the requested priority level.
   * @param {number} level=1 - The priority level
   * @returns {external:HTMLAudioElement}
   */
  static getAudioPlayer(level = 1) {
    if (!MediaBagElement._audioPlayers[level])
      MediaBagElement._audioPlayers[level] = document.createElement('audio');
    return MediaBagElement._audioPlayers[level];
  }

  /**
   * Private static array of {@link bags/MediaBagElement MediaBagElements},
   * used to store a reference to the element using each `audioPlayer`
   * @name module:bags/MediaBagElement#_currentAudioElements
   * @type {bags/MediaBagElement[]}
   */
  static _currentAudioElements = [];

  /**
   * Clear all references to audio players and audio elements
   * To be called when a new activity starts
   */
  static resetAudioElements() {
    MediaBagElement._audioPlayers.fill(null);
    MediaBagElement._currentAudioElements.fill(null);
  }

  /**
   * Loads this object settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    this.name = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .nSlash */ .c4)($xml.attr('name'));
    this.file = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .nSlash */ .c4)($xml.attr('file'));
    this.ext = this.file.toLowerCase().split('.').pop();
    this.type = this.getFileType(this.ext);
    // Check if it's an animated GIF
    if (this.ext === 'gif') {
      const anim = $xml.attr('animated');
      if (typeof anim === 'undefined')
        this.checkAnimatedGif();
      else
        this.animated = anim === 'true';
    }
    if (this.type === 'font') {
      this.fontName = this.name === this.file && this.name.lastIndexOf('.') > 0 ?
        this.name.substring(0, this.name.lastIndexOf('.')) :
        this.name;
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
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getAttr */ .iu)(this, ['name', 'file', 'animated']);
  }

  /**
   * Loads the element properties from a data object
   * @param {object} data - The data object to parse
   */
  setAttributes(data) {
    ['name', 'file', 'animated'].forEach(attr => {
      if (!(0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .isEmpty */ .Im)(data[attr]))
        this[attr] = data[attr];
    });

    this.ext = this.file.toLowerCase().split('.').pop();
    this.type = this.getFileType(this.ext);

    // Check if it's an animated GIF
    if (this.ext === 'gif' && this.animated === 'undefined')
      this.checkAnimatedGif();

    if (this.type === 'font') {
      this.fontName = this.name === this.file && this.name.lastIndexOf('.') > 0 ?
        this.name.substring(0, this.name.lastIndexOf('.')) :
        this.name;
    }
    return this;
  }

  /**
   * Checks if the image associated with this MediaBagElement is an animated GIF
   *
   * Based on: {@link https://gist.github.com/marckubischta/261ad8427a214022890b}
   * Thanks to `@lakenen` and `@marckubischta`
   */
  checkAnimatedGif() {
    const request = new XMLHttpRequest();
    // Set `responseType` moved after calling `open`
    // see: https://stackoverflow.com/questions/20760635/why-does-setting-xmlhttprequest-responsetype-before-calling-open-throw
    // request.responseType = 'arraybuffer'
    request.addEventListener('load', () => {
      const
        arr = new Uint8Array(request.response),
        length = arr.length;

      // make sure it's a gif (GIF8)
      if (arr[0] !== 0x47 || arr[1] !== 0x49 ||
        arr[2] !== 0x46 || arr[3] !== 0x38) {
        this.animated = false;
        return;
      }

      // Ported from PHP [http://www.php.net/manual/en/function.imagecreatefromgif.php#104473]
      // an animated gif contains multiple "frames", with each frame having a
      // header made up of:
      // * a static 3-byte sequence (\x00\x21\xF9
      // * one byte indicating the length of the header (usually \x04)
      // * variable length header (usually 4 bytes)
      // * a static 2-byte sequence (\x00\x2C) (some variants may use \x00\x21 ?)
      // We read through the file as long as we haven't reached the end of the file
      // and we haven't yet found at least 2 frame headers
      for (let i = 0, len = length - 3, frames = 0; i < len && frames < 2; ++i) {
        if (arr[i] === 0x00 && arr[i + 1] === 0x21 && arr[i + 2] === 0xF9) {
          const
            blocklength = arr[i + 3],
            afterblock = i + 4 + blocklength;
          if (afterblock + 1 < length &&
            arr[afterblock] === 0x00 &&
            (arr[afterblock + 1] === 0x2C || arr[afterblock + 1] === 0x21)) {
            if (++frames > 1) {
              this.animated = true;
              (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .log */ .Rm)('debug', `Animated GIF detected: ${this.file}`);
              break;
            }
          }
        }
      }
    });

    this.getFullPathPromise()
      .then(fullPath => {
        request.open('GET', fullPath, true);
        request.responseType = 'arraybuffer';
        request.send();
      });
  }

  /**
   * Checks if the MediaBagElement has been initiated
   * @returns {boolean}
   */
  isEmpty() {
    return this.data === null;
  }

  /**
   * Determines the type of a file from its extension
   * @param {string} ext - The file name extension
   * @returns {string}
   */
  getFileType(ext) {
    let result = null;
    for (let type in _Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .settings */ .W0.FILE_TYPES) {
      if (_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .settings */ .W0.FILE_TYPES[type].indexOf(ext) >= 0) {
        result = type;
        break;
      }
    }
    return result;
  }

  /**
   * Instantiates the media content
   * @param {function} callback - Callback method called when the referred resource is ready
   * @param {module:JClicPlayer.JClicPlayer} ps=null - An optional `PlayStation` (currently a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) used to dynamically load fonts
   * @param {boolean} force=false - Used only in media of type 'audio'. When `true`, a static {@link MediaBagElement._audioPlayers audioPlayer element} will be loaded with this media source
   * @param {number} level=1 - Priority level of the media content to be built. Used only n audio elements.
   */
  build(callback, ps = null, force = false, level = 1) {
    // Mock data when running in NodeJS
    if (_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .settings */ .W0.NODEJS) {
      this.data = [];
      this.ready = true;
    }

    if (callback) {
      if (!this._whenReady)
        this._whenReady = [];
      this._whenReady.push(callback);
    }

    if (!this.data)
      this.getFullPathPromise()
        .then(fullPath => {
          switch (this.type) {
            case 'font':
              const
                format = this.ext === 'ttf' ? 'truetype' : this.ext === 'otf' ? 'embedded-opentype' : this.ext,
                css = `@font-face{font-family:"${this.fontName}";src:url(${fullPath}) format("${format}");}`;

              (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .appendStyleAtHead */ .dw)(css, ps);
              this.data = new _AWT_js__WEBPACK_IMPORTED_MODULE_3__/* .Font */ .KQ(this.name);
              this.ready = true;
              break;

            case 'image':
              this.data = new Image();
              this.data.addEventListener('load', () => { this._onReady.call(this); }, { once: true });
              this.data.src = fullPath;
              break;

            case 'video':
              this.data = document.createElement(this.type);
              this.data.addEventListener('canplay', () => { this._onReady.call(this); }, { once: true });
              this.data.src = fullPath;
              this.data.load();
              this.data.pause();
              break;

            case 'audio':
              // HTML Audio objects will be created on demand, when the param 'force' is set to true
              if (force) {
                // Clean up state in current audio element, if any
                const currentAudioElement = MediaBagElement._currentAudioElements[level];
                if (currentAudioElement && currentAudioElement !== this) {
                  currentAudioElement.data = null;
                  currentAudioElement.ready = false;
                }
                // Register as a current audio element
                MediaBagElement._currentAudioElements[level] = this;
                // Configure the audio player
                const audioPlayer = MediaBagElement.getAudioPlayer(level);
                if (audioPlayer.src !== fullPath) {
                  (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .log */ .Rm)('trace', `Loading static player #${level} with new audio: ${fullPath}`);
                  this.data = audioPlayer;
                  this.ready = false;
                  audioPlayer.addEventListener('canplay', () => { this._onReady.call(this); }, { once: true });
                  audioPlayer.src = fullPath;
                  audioPlayer.load();
                  audioPlayer.pause();
                }
                else
                  (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .log */ .Rm)('trace', `Reusing existing audio in player #${level}: ${fullPath}`);
              }
              else
                this.ready = true;
              break;

            case 'anim':
              // TODO: Use [Ruffle](https://ruffle.rs/) to play Flash movies
              this.data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`<object type"application/x-shockwave-flash" width="300" height="200" data="${fullPath}"/>`).get(-1);
              // Unable to check the loading progress in elements of type `object`. so we mark it always as `ready`:
              this.ready = true;
              break;

            case 'xml':
              jquery__WEBPACK_IMPORTED_MODULE_0___default().get(fullPath, null, null, 'xml').done(xmlData => {
                const children = xmlData ? xmlData.children || xmlData.childNodes : null;
                this.data = children && children.length > 0 ? (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .parseXmlNode */ .Fy)(children[0]) : null;
                this._onReady();
              }).fail(err => {
                (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .log */ .Rm)('error', `Error loading ${this.name}: ${err}`);
                this._onReady();
              });
              break;

            case 'midi':
              const request = new XMLHttpRequest();
              request.onreadystatechange = () => {
                if (request.readyState === 4) {
                  if (request.status === 200)
                    this.data = new _media_MidiAudioPlayer_js__WEBPACK_IMPORTED_MODULE_1__["default"](request.response, ps && ps.options);
                  else
                    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .log */ .Rm)('error', `Error loading ${this.name}: ${request.statusText}`);
                  this._onReady();
                }
              };
              request.open('GET', fullPath, true);
              request.responseType = 'arraybuffer';
              request.send();
              break;

            default:
              (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .log */ .Rm)('trace', `Media currently not supported: ${this.name}`);
              this.ready = true;
          }

          if (this.ready)
            this._onReady();
        });
    else if (this.ready)
      this._onReady();

    return this;
  }

  /**
   * Checks if this media element is ready to start
   * @returns {boolean} - `true` if ready, `false` otherwise
   */
  checkReady() {
    if (this.data && !this.ready) {
      switch (this.type) {
        case 'image':
          this.ready = this.data.complete === true;
          break;
        case 'audio':
        case 'video':
        case 'anim':
          this.ready = this.data.readyState >= 1;
          break;
        default:
          this.ready = true;
      }
    }
    return this.ready;
  }

  /**
   * Checks if this resource has timed out.
   * @returns {boolean} - `true` if the resource has exhausted the allowed time to load, `false` otherwise
   */
  checkTimeout() {
    const result = Date.now() > this.timeout;
    if (result)
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .log */ .Rm)('warn', `Timeout while loading: ${this.name}`);
    return result;
  }

  /**
   * Notify listeners that the resource is ready
   */
  _onReady() {
    this.ready = true;
    if (this._whenReady) {
      this._whenReady.forEach(fn => fn.call(this, this));
      this._whenReady = null;
    }
  }

  /**
   * Gets the full path of the file associated to this element.
   * WARNING: This function should be called only after a successful call to `getFullPathPromise`
   * @returns {string}
   */
  getFullPath() {
    return this._fullPath;
  }

  /**
   * Gets a promise with the full path of the file associated to this element.
   * @returns {external:Promise}
   */
  getFullPathPromise() {
    return (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getPathPromise */ .xw)(this.basePath, this.file, this.zip)
      .then(fullPath => {
        // Process full URL only when running in a browser
        this._fullPath = _Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .settings */ .W0.NODEJS
          ? fullPath
          : (new URL(fullPath, document.location.href)).toString();
        return this._fullPath;
      });
  }
}

Object.assign(MediaBagElement.prototype, {
  /**
   * The name of this element. Usually is the same as `file`
   * @name module:bags/MediaBagElement.MediaBagElement#name
   * @type {string} */
  name: '',
  /**
   * The name of the file where this element is stored
   * @name module:bags/MediaBagElement.MediaBagElement#file
   * @type {string} */
  file: '',
  /**
   * The font family name, used only in elements of type 'font'
   * @name module:bags/MediaBagElement.MediaBagElement#fontName
   * @type {string} */
  fontName: '',
  /**
   * The path to be used as base to access this media element
   * @name module:bags/MediaBagElement.MediaBagElement#basePath
   * @type {string} */
  basePath: '',
  /**
   * An optional JSZip object that can act as a container of this media
   * @name module:bags/MediaBagElement.MediaBagElement#zip
   * @type {external:JSZip} */
  zip: null,
  /**
   * When loaded, this field will store the realized media object
   * @name module:bags/MediaBagElement.MediaBagElement#data
   * @type {object} */
  data: null,
  /**
   * Flag indicating that `data` is ready to be used
   * @name module:bags/MediaBagElement.MediaBagElement#ready
   * @type {boolean} */
  ready: false,
  /**
   * Array of callback methods to be called when the resource becomes ready
   * @name module:bags/MediaBagElement.MediaBagElement#_whenReady
   * @private
   * @type {function[]} */
  _whenReady: null,
  /**
   * Normalized extension of `file`, useful to guess the media type
   * @name module:bags/MediaBagElement.MediaBagElement#ext
   * @type {string} */
  ext: '',
  /**
   * The resource type ('audio', 'image', 'midi', 'video', 'font')
   * @name module:bags/MediaBagElement.MediaBagElement#type
   * @type {string} */
  type: null,
  /**
   * Time set to load the resource before leaving
   * @name module:bags/MediaBagElement.MediaBagElement#timeout
   * @type {number} */
  timeout: 0,
  //
  /**
   * Flag used for animated GIFs
   * @name module:bags/MediaBagElement.MediaBagElement#animated
   * @type {boolean} */
  animated: false,
  /**
   * Full path obtained after a successful call to getFullPathPromise
   * @name module:bags/MediaBagElement.MediaBagElement#_fullPath
   * @private
   * @type {string}
   */
  _fullPath: null,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MediaBagElement);


/***/ }),

/***/ 3391:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export MidiAudioPlayer */
/* harmony import */ var _francesc_basic_midi_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5428);
/* harmony import */ var _francesc_basic_midi_player_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_francesc_basic_midi_player_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/**
 *  File    : media/MidiAudioPlayer.js
 *  Created : 11/10/2018
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




// TODO: Use multiple instruments, at least one for each track
// TODO: Use multiple midi channels (currently flattened to a single channel)
// TODO: Use of channel 10 for percussion instruments
// TODO: ... build a real MIDI player!!

/**
 * A simple MIDI player based on MidiPlayerJS
 * https://github.com/grimmdude/MidiPlayerJS
 * See also: http://www.midijs.net (https://github.com/babelsberg/babelsberg-js/tree/master/midijs)
 */
class MidiAudioPlayer {
  /**
   * MidiAudioPlayer constructor
   * @param {external:ArrayBuffer} data - The MIDI file content, in ArrayBuffer format
   * @param {object} [options={}] - Optional params related to the type of soundfont used. Valid options inside this object are:<br>
   * - `MIDISoundFontObject`: An object containing the full soundfont data. When this param is provided, no other one will be used.
   * - `MIDISoundFontBase`: The URL used as base for the current collection of MIDI soundfonts. Defaults to `https://clic.xtec.cat/dist/jclic.js/soundfonts/MusyngKite`
   * - `MIDISoundFontName`: The MIDI instrument name. Defaults to `acoustic_grand_piano`. See [MIDI.js Soundfonts](https://github.com/gleitz/midi-js-soundfonts) for full lists of MIDI instrument names.
   * - `MIDISoundFontExtension`: An extension to be added to `MIDISoundFontName` in order to build the full file name of the soundfont JS file. Defaults to `-mp3.js`
   */
  constructor(data, options = {}) {
    const AudioContext = window && (window.AudioContext || window.webkitAudioContext);
    if (AudioContext) {
      // Build instrument on first call to constructor
      MidiAudioPlayer.prepareInstrument(options, new AudioContext());
      this.data = data;
      this.player = new (_francesc_basic_midi_player_js__WEBPACK_IMPORTED_MODULE_0___default().Player)(ev => this.playEvent(ev));
      if (this.player)
        this.player.loadArrayBuffer(data);
    }
  }

  /**
   * Initializes the soundfont instrument, loading data from GitHub
   * NOTE: This will not work when off-line!
   * TODO: Provided a basic, simple, static soundfont
   * @param {object} options - Optional param with options related to the MIDI soundfont. See details in `constructor` description.
   * @param {external:AudioContext} audioContext - The AudioContext object (see: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)
   */
  static prepareInstrument(options = {}, audioContext) {
    if (MidiAudioPlayer.loadingInstrument === false) {
      MidiAudioPlayer.loadingInstrument = true;
      MidiAudioPlayer.audioContext = audioContext;
      _francesc_basic_midi_player_js__WEBPACK_IMPORTED_MODULE_0___default().Soundfont.instrument(
        MidiAudioPlayer.audioContext,
        options.MIDISoundFontObject || MidiAudioPlayer.MIDISoundFontObject ||
        `${options.MIDISoundFontBase || MidiAudioPlayer.MIDISoundFontBase}/${options.MIDISoundFontName || MidiAudioPlayer.MIDISoundFontName}${options.MIDISoundFontExtension || MidiAudioPlayer.MIDISoundFontExtension}`)
        .then(instrument => {
          (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('info', 'MIDI soundfont instrument loaded');
          MidiAudioPlayer.instrument = instrument;
        })
        .catch(err => {
          (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('error', `Error loading soundfont base instrument: ${err}`);
        });
    }
  }

  /**
   * Pauses the player
   */
  pause() {
    if (this.player) {
      this.player.pause();
      this.startedNotes = [];
    }
  }

  /**
   * Starts or resumes playing
   */
  play() {
    if (this.player) {
      this.startedNotes = [];
      this.player.play();
    }
  }

  /**
   * Gets the ' paused'  state of the current player
   * @returns boolean
   */
  get paused() {
    return this.player && !this.player.isPlaying();
  }

  /**
   * Checks if the current player has ended or is already playing
   * @returns boolean
   */
  get ended() {
    return this.player && this.player.getSongTimeRemaining() <= 0;
  }

  /**
   * Gets the current time
   * @returns number
   */
  get currentTime() {
    return this.player && (this.player.getSongTime() * 1000) || 0;
  }

  /**
   * Sets the current time of this player (in milliseconds)
   * @param {number} time - The time position where the player pointer must be placed
   */
  set currentTime(time) {
    if (this.player)
      this.player.skipToSeconds(time / 1000);
  }

  /**
   * Plays a MIDI event
   * @param {object} ev - The event data. See http://grimmdude.com/MidiPlayerJS/docs/index.html for details
   */
  playEvent(ev) {
    if (this.player && MidiAudioPlayer.instrument) {
      // Check for specific interval
      if (this.playTo > 0 && this.currentTime >= this.playTo)
        this.pause();
      // Set main volume
      else if (ev.name === 'Controller Change' && ev.number === 7)
        this.mainVolume = ev.value / 127;
      // Process 'Note on' messages. Max gain set to 2.0 for better results with the used soundfont
      else if (ev.name === 'Note on' && ev.velocity > 0)
        this.startedNotes[ev.noteNumber] = MidiAudioPlayer.instrument.play(ev.noteName, MidiAudioPlayer.audioContext.currentTime, { gain: 2 * (this.mainVolume * ev.velocity / 100) });
      // Process 'Note off' messages
      else if (ev.name === 'Note off' && ev.noteNumber && this.startedNotes[ev.noteNumber]) {
        this.startedNotes[ev.noteNumber].stop();
        delete (this.startedNotes[ev.noteNumber]);
      }
    }
  }
}

Object.assign(MidiAudioPlayer.prototype, {
  /**
   * The MIDI file data used by this MIDI player
   * @name module:media/MidiAudioPlayer.MidiAudioPlayer#data
   * @type {external:ArrayBuffer} */
  data: null,
  /**
   * The grimmdude's MidiPlayer used by this player
   * @name module:media/MidiAudioPlayer.MidiAudioPlayer#player
   * @type {external:MidiPlayerJS} */
  player: null,
  /**
   * When >0, time position at which the music must end
   * @name module:media/MidiAudioPlayer.MidiAudioPlayer#playTo
   * @type {number} */
  playTo: 0,
  /**
   * Main volume of this track (set with a MIDI message of type `Controller Change` #7)
   * @name module:media/MidiAudioPlayer.MidiAudioPlayer#mainVolume
   * @type {number} */
  mainVolume: 1.0,
  /**
   * This array is used when processing 'Note off' events to stop notes that are currently playing.
   * It contains a collection of 'instrument.play' instances, one for each active note
   * @name module:media/MidiAudioPlayer.MidiAudioPlayer#startedNotes
   * @type {function[]} */
  startedNotes: [],
});

/**
 * The {@link external:AudioContext} used by this MIDI player.
 * @type {external:AudioContext}
 */
MidiAudioPlayer.audioContext = null;

/**
 * The "Instrument" object used by this MIDI player.
 * See: https://github.com/danigb/soundfont-player
 * @type {external:Instrument}
 */
MidiAudioPlayer.instrument = null;

/**
 * A flag used to avoid re-entrant calls to {@link module:media/MidiAudioPlayer.MidiAudioPlayer#prepareInstrument prepareInstrument}
 * @type {boolean}
 */
MidiAudioPlayer.loadingInstrument = false;

/**
 * An object containing the full soundfont data used by {@link module:media/MidiAudioPlayer.MidiAudioPlayer#instrument instrument}
 * When this member is set, no other settings related to the sounfFont will be used.
 * This value can be overwritten by the global parameter `MIDISoundFontObject`
 * @type {object}
 */
MidiAudioPlayer.MIDISoundFontObject = null;

/**
 * The URL used as base for the current collection of MIDI soundfonts.
 * This value can be overwritten by the global parameter `MIDISoundFontBase`
 * @type {string}
 */
MidiAudioPlayer.MIDISoundFontBase = 'https://clic.xtec.cat/dist/jclic.js/soundfonts/MusyngKite';
// Alternative sites are:
// 'https://clic.xtec.cat/dist/jclic.js/soundfonts/FluidR3_GM'
// 'https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/FluidR3_GM'
// 'https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/MusyngKite'

/**
 * The MIDI instrument name.
 * This value can be overwritten by the global parameter `MIDISoundFontName`
 * See [MIDI.js Soundfonts](https://github.com/gleitz/midi-js-soundfonts) for full lists of MIDI instrument names.
 * @type {string}
 */
MidiAudioPlayer.MIDISoundFontName = 'acoustic_grand_piano';

/**
 * An extension to be added to `MIDISoundFontName` in order to build the full file name of the soundfont JS file.
 * Current valid options are `-mp3.js` and `-ogg.js`
 * This value can be overwritten by the global parameter `MIDISoundFontExtension`
 * @type {string}
 */
MidiAudioPlayer.MIDISoundFontExtension = '-mp3.js';

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MidiAudioPlayer);


/***/ })

};
;
//# sourceMappingURL=1196.jclic-node.js.map