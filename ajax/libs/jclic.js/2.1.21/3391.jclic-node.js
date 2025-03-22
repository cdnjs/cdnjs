"use strict";
exports.id = 3391;
exports.ids = [3391];
exports.modules = {

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
//# sourceMappingURL=3391.jclic-node.js.map