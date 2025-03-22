"use strict";
exports.id = 827;
exports.ids = [827,520,5091];
exports.modules = {

/***/ 827:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ActiveMediaBag */
/* harmony import */ var _ActiveMediaPlayer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/**
 *  File    : media/ActiveMediaBag.js
 *  Created : 28/04/2015
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
 * This class stores a collection of realized {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} objects, related to a
 * {@link module:project/JClicProject.JClicProject JClicProject} or {@link module:Activity.Activity Activity}.
 */
class ActiveMediaBag {
  /**
   * ActiveMediaBag constructor
   */
  constructor() {
    this.players = [];
  }

  /**
   * Creates a new {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} linked to this media bag
   * @param {module:media/MediaContent.MediaContent} mc - The content used by the new player
   * @param {module:bags/MediaBag.MediaBag} mb - The project's MediaBag
   * @param {module:JClicPlayer.JClicPlayer} ps - An object implementing the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) interface,
   * usually a {@link module:JClicPlayer.JClicPlayer JClicPlayer}.
   * @returns {module:media/ActiveMediaPlayer.ActiveMediaPlayer}
   */
  createActiveMediaPlayer(mc, mb, ps) {
    let amp = null;
    switch (mc.type) {
      case 'RECORD_AUDIO':
        if (mc.length <= 0 || mc.length >= _Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .settings */ .W0.MAX_RECORD_LENGTH)
          break;
      /* falls through */
      case 'PLAY_RECORDED_AUDIO':
        if (mc.recBuffer < 0 || mc.recBuffer >= 10)
          break;
      /* falls through */
      case 'PLAY_AUDIO':
      case 'PLAY_MIDI':
      case 'PLAY_VIDEO':
        amp = new _ActiveMediaPlayer_js__WEBPACK_IMPORTED_MODULE_0__["default"](mc, mb, ps);
        break;
    }
    if (amp !== null)
      this.players.push(amp);
    return amp;
  }

  /**
   * Looks for an already existing {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} equivalent to the requested.
   * When not found, a new one is created and and returned.
   * @param {module:media/MediaContent.MediaContent} mc - The content used by the new player
   * @param {module:bags/MediaBag.MediaBag} mb - The project's MediaBag
   * @param {module:JClicPlayer.JClicPlayer} ps - An object implementing the
   * {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html|PlayStation} interface,
   * usually a {@link module:JClicPlayer.JClicPlayer JClicPlayer}.
   * @returns {module:media/ActiveMediaPlayer.ActiveMediaPlayer}
   */
  getActiveMediaPlayer(mc, mb, ps) {
    return this.players.find(p => p.mc === mc || p.mc.isEquivalent(mc))
      || this.createActiveMediaPlayer(mc, mb, ps);
  }

  /**
   * Removes from the list of players the {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} related to the specified {@link module:media/MediaContent.MediaContent}.
   * @param {module:media/MediaContent.MediaContent} mc - The media content to look for.
   */
  removeActiveMediaPlayer(mc) {
    const i = this.players.findIndex(p => p.mc === mc);
    if (i >= 0) {
      this.players[i].clear();
      // removes the element pointed by 'i'
      this.players.splice(i, 1);
    }
  }

  /**
   * Realizes all the media elements stored in this bag
   */
  realizeAll() {
    this.players.forEach(p => p.realize());
  }

  /**
   * Stops playing all media elements stored in this bag
   * @param {number} level - Level at and below what all media players will be muted.
   */
  stopAll(level) {
    if (typeof level === 'undefined')
      level = -1;
    this.players.forEach(amp => {
      if (level === -1 || amp.mc !== null && amp.mc.level <= level)
        amp.stop();
    });
  }

  /**
   * Removes all players from this media bag
   */
  removeAll() {
    this.players.forEach(p => p.clear());
    // Empty the `players` array
    this.players.length = 0;
    _ActiveMediaPlayer_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.clearAllAudioBuffers();
  }
}

Object.assign(ActiveMediaBag.prototype, {
  /**
   * The collection of {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} objects stored in this media bag.
   * @name module:media/ActiveMediaBag.ActiveMediaBag#players
   * @type {module:media/ActiveMediaPlayer.ActiveMediaPlayer[]} */
  players: [],
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActiveMediaBag);


/***/ }),

/***/ 520:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ActiveMediaPlayer */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AudioBuffer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5091);
/**
 *  File    : media/ActiveMediaPlayer.js
 *  Created : 28/04/2015
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

/* global navigator */




/**
 * This kind of object encapsulates a realized {@link module:media/MediaContent.MediaContent} and provides methods to start,
 * stop, pause and record different types of media (audio, video, MIDI, voice recording...)
 */
class ActiveMediaPlayer {
  /**
   * ActiveMediaPlayer constructor
   * @param {module:media/MediaContent.MediaContent} mc - - The content used by this player
   * @param {module:bags/MediaBag.MediaBag} mb - The project's MediaBag
   * @param {module:JClicPlayer.JClicPlayer} ps - An object implementing the
   * {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html PlayStation} interface,
   * usually a {@link module:JClicPlayer.JClicPlayer JClicPlayer}.
   */
  constructor(mc, mb, ps) {
    this.mc = mc;
    this.ps = ps;
    switch (mc.type) {
      case 'RECORD_AUDIO':
        if (ActiveMediaPlayer.AUDIO_BUFFERS) {
          this.clearAudioBuffer(mc.recBuffer);
          ActiveMediaPlayer.AUDIO_BUFFERS[mc.recBuffer] = new _AudioBuffer_js__WEBPACK_IMPORTED_MODULE_1__["default"](mc.length);
        }
      /* falls through */
      case 'PLAY_RECORDED_AUDIO':
        this.useAudioBuffer = true;
        break;
      case 'PLAY_AUDIO':
      case 'PLAY_VIDEO':
      case 'PLAY_MIDI':
        this.mbe = mb.getElement(mc.file, true);
        break;
      default:
        break;
    }
  }

  /**
   * Generates the objects that will play media
   */
  realize() {
    if (this.mbe) {
      this.mbe.build(mbe => {
        if (mbe.data && mbe.data.pause && !mbe.data.paused && !mbe.data.ended && mbe.data.currentTime)
          mbe.data.pause();
        if ((mbe.type === 'video' || mbe.type === 'anim') && mbe.data) {
          this.$visualComponent = jquery__WEBPACK_IMPORTED_MODULE_0___default()(mbe.data);
          this.$visualComponent.css('z-index', 20);
        }
      }, this.ps, false, this.mc.level);
    }
  }

  /**
   * Plays the media, realizing it if needed.
   * @param {module:boxes/ActiveBox.ActiveBox} [_setBx] - The active box where this media will be placed (when video)
   */
  playNow(_setBx) {
    // TODO: Remove unused param "_setBx"
    if (this.useAudioBuffer) {
      if (ActiveMediaPlayer.AUDIO_BUFFERS) {
        const $div = this.ps && this.ps.$div;
        const buffer = ActiveMediaPlayer.AUDIO_BUFFERS[this.mc.recBuffer];
        if (buffer) {
          if (this.mc.type === 'RECORD_AUDIO') {
            buffer.record($div);
          } else {
            buffer.play();
          }
        }
      }
    } else if (this.mbe) {
      this.mbe.build(() => {
        if (this.mbe.data) {
          if (this.mbe.type === 'midi') {
            this.mbe.data.playTo = this.mc.to || 0;
          } else {
            let armed = false;
            const $player = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.mbe.data);
            // Clear previous event handlers
            $player.off();
            // If there is a time fragment specified, prepare to stop when the `to` position is reached
            if (this.mc.to > 0) {
              $player.on('timeupdate', () => {
                if (armed && this.mbe.data.currentTime >= this.mc.to / 1000) {
                  $player.off('timeupdate');
                  this.mbe.data.pause();
                }
              });
            }
            // Launch the media despite of its readyState
            armed = true;
          }
          if (!this.mbe.data.paused && !this.mbe.data.ended && this.mbe.data.currentTime)
            this.mbe.data.pause();
          // Seek the media position
          this.mbe.data.currentTime = this.mc.from > 0 ? this.mc.from / 1000 : 0;
          this.mbe.data.play();
        }
      }, this.ps, true, this.mc.level);
    }
  }

  /**
   * Plays the media when available, without blocking the current thread.
   * @param {module:boxes/ActiveBox.ActiveBox} [setBx] - The active box where this media will be placed (when video)
   */
  play(setBx) {
    this.stopAllAudioBuffers();
    this.playNow(setBx);
  }

  /**
   * Stops the media playing
   */
  stop() {
    if (this.useAudioBuffer)
      this.stopAudioBuffer(this.mc.recBuffer);
    else if (this.mbe && this.mbe.data && this.mbe.data.pause && !this.mbe.data.paused && !this.mbe.data.ended && this.mbe.data.currentTime)
      this.mbe.data.pause();
  }

  /**
   * Frees all resources used by this player
   */
  clear() {
    this.stop();
    if (this.useAudioBuffer)
      this.clearAudioBuffer(this.mc.recBuffer);
  }

  /**
   * Clears the specified audio buffer
   * @param {number} buffer - Index of the buffer in {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer#AUDIO_BUFFERS AUDIO_BUFFERS}
   */
  clearAudioBuffer(buffer) {
    if (ActiveMediaPlayer.AUDIO_BUFFERS &&
      buffer >= 0 && buffer < ActiveMediaPlayer.AUDIO_BUFFERS.length &&
      ActiveMediaPlayer.AUDIO_BUFFERS[buffer]) {
      ActiveMediaPlayer.AUDIO_BUFFERS[buffer].clear();
      ActiveMediaPlayer.AUDIO_BUFFERS[buffer] = null;
    }
  }

  /**
   * Clears all audio buffers
   */
  clearAllAudioBuffers() {
    if (ActiveMediaPlayer.AUDIO_BUFFERS)
      ActiveMediaPlayer.AUDIO_BUFFERS.forEach((_buffer, n) => this.clearAudioBuffer(n));
  }

  /**
   * Counts the number of active audio buffers
   * @returns {number}
   */
  countActiveBuffers() {
    return ActiveMediaPlayer.AUDIO_BUFFERS ? ActiveMediaPlayer.AUDIO_BUFFERS.reduce((c, ab) => c + ab ? 1 : 0, 0) : 0;
  }

  /**
   * Stops the playing or recording actions of all audio buffers
   */
  stopAllAudioBuffers() {
    if (ActiveMediaPlayer.AUDIO_BUFFERS)
      ActiveMediaPlayer.AUDIO_BUFFERS.forEach(ab => ab ? ab.stop() : null);
  }

  /**
   * Stops a specific audio buffer
   * @param {number} buffer - Index of the buffer in {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer#AUDIO_BUFFERS AUDIO_BUFFERS}
   */
  stopAudioBuffer(buffer) {
    if (ActiveMediaPlayer.AUDIO_BUFFERS &&
      buffer >= 0 && buffer < ActiveMediaPlayer.AUDIO_BUFFERS.length &&
      ActiveMediaPlayer.AUDIO_BUFFERS[buffer])
      ActiveMediaPlayer.AUDIO_BUFFERS[buffer].stop();
  }

  /**
   * Checks the position of visual components after a displacement or resizing of its container
   * @param {module:boxes/ActiveBox.ActiveBox} _bxi - The container where this player is hosted
   */
  checkVisualComponentBounds(_bxi) {
    // does nothing
  }

  /**
   * Sets the visual component of this player visible or invisible
   * @param {boolean} _state - `true` for visible
   */
  setVisualComponentVisible(_state) {
    // TODO: Implement setVisualComponentVisible
  }

  /**
   * Sets the ActiveBox associated to this media player
   * @param {module:boxes/ActiveBox.ActiveBox} setBx - The new container of this media. Can be `null`.
   */
  linkTo(setBx) {
    this.bx = setBx;
    if (this.bx && this.$visualComponent)
      this.bx.setHostedComponent(this.$visualComponent);
  }
}

Object.assign(ActiveMediaPlayer.prototype, {
  /**
   * The MediaContent associated to this player.
   * @name module:media/ActiveMediaPlayer.ActiveMediaPlayer#mc
   * @type {module:media/MediaContent.MediaContent} */
  mc: null,
  /**
   * The player to which this player belongs.
   * @name module:media/ActiveMediaPlayer.ActiveMediaPlayer#ps
   * @type {module:JClicPlayer.JClicPlayer} */
  ps: null,
  /**
   * MediaPlayers should be linked to {@link module:boxes/ActiveBox.ActiveBox ActiveBox} objects.
   * @name module:media/ActiveMediaPlayer.ActiveMediaPlayer#bx
   * @type {module:boxes/ActiveBox.ActiveBox} */
  bx: null,
  /**
   * The visual component for videos, usually a `video` HTML element
   * @name module:media/ActiveMediaPlayer.ActiveMediaPlayer#$visualComponent
   * @type {external:jQuery} */
  $visualComponent: null,
  /**
   * When `true`, this player makes use of a recording audio buffer
   * @name module:media/ActiveMediaPlayer.ActiveMediaPlayer#useAudioBuffer
   * @type {boolean} */
  useAudioBuffer: false,
  /**
   * The {@link module:bads/MediaBagElement.MediaBagElement} containing the reference to the media to be played
   * @name module:media/ActiveMediaPlayer.ActiveMediaPlayer#mbe
   * @type {module:bags/MediaBagElement.MediaBagElement} */
  mbe: null,
});

/**
 * Recording of audio is enabled only when `navigator.getUserMedia` and `MediaRecorder` are defined
 * In 02-Mar-2016 this is implemented only in Firefox 41 and Chrome 49 or later.
 * See: {@link https://addpipe.com/blog/mediarecorder-api}
 * @type Boolean
 */
ActiveMediaPlayer.REC_ENABLED = typeof MediaRecorder !== 'undefined' && typeof navigator !== 'undefined';

if (ActiveMediaPlayer.REC_ENABLED) {
  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
}

/**
 * Audio buffers used for recording and playing voice are stored in a static array because
 * they are common to all instances of {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer}
 * Only initialized when {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer#REC_ENABLED REC_ENABLED} is `true`.
 * @type {external:AudioBuffer[]} */
ActiveMediaPlayer.AUDIO_BUFFERS = ActiveMediaPlayer.REC_ENABLED ? [] : null;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActiveMediaPlayer);


/***/ }),

/***/ 5091:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export AudioBuffer */
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1253);
/**
 *  File    : media/EventSoundsElement.js
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

/* global navigator, window, document, Blob, URL, MediaRecorder */



/**
 * The AudioBuffer object provides sound recording and replaying to activities.
 */
class AudioBuffer {
  /**
   * AudioBuffer constructor
   * @param {number} [seconds] - The maximum amount of time allowed to be recorded by this AudioBuffer
   */
  constructor(seconds) {
    if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
      this.enabled = true;
    if (seconds)
      this.seconds = seconds;
    this.chunks = [];
  }

  /**
   * Starts playing the currently recorded audio, if any.
   */
  play() {
    this.stop();
    if (this.mediaPlayer) {
      this.mediaPlayer.currentTime = 0;
      this.mediaPlayer.play();
    } else {
      this.playWhenFinished = true;
    }
  }

  /**
   * Stops the current operation, either recording or playing audio
   */
  stop() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording')
      this.mediaRecorder.stop();
    else if (this.mediaPlayer && !this.mediaPlayer.paused)
      this.mediaPlayer.pause();
  }

  /**
   * Starts recording audio, or stops the recording if already started.
   * @param {external:jQuery} [$div] - Optional `div` element where the recording is performed, as a jQuery ref.
   */
  record($div) {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording')
      this.mediaRecorder.stop();
    else if (this.enabled) {
      this.stop();
      this.mediaPlayer = null;

      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(mediaStream => {

          this.mediaRecorder = new MediaRecorder(mediaStream);

          this.mediaRecorder.ondataavailable = ev => this.chunks.push(ev.data);

          this.mediaRecorder.onerror = err => {
            (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .log */ .Rm)('error', `Error recording audio: ${err}`);
            this.mediaRecorder = null;
          };

          this.mediaRecorder.onstart = () => {
            (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .log */ .Rm)('debug', 'Recording audio started');
            this.visualFeedbak(true, $div);
          };

          this.mediaRecorder.onstop = () => {
            (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .log */ .Rm)('debug', 'Recording audio finished');
            this.visualFeedbak(false, $div);

            if (this.timeoutID) {
              window.clearTimeout(this.timeoutID);
              this.timeoutID = null;
            }

            const options = {};
            if (this.chunks.length > 0 && this.chunks[0].type)
              options.type = this.chunks[0].type;
            const blob = new Blob(this.chunks, options);
            this.chunks = [];
            this.mediaPlayer = document.createElement('audio');
            this.mediaPlayer.src = URL.createObjectURL(blob);
            this.mediaPlayer.pause();
            this.mediaRecorder = null;
            if (this.playWhenFinished) {
              this.playWhenFinished = false;
              this.mediaPlayer.play();
            }
          };

          this.mediaRecorder.onwarning = ev => (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .log */ .Rm)('warn', `Warning recording audio: ${ev}`);

          this.playWhenFinished = false;

          this.mediaRecorder.start();

          this.timeoutID = window.setTimeout(() => {
            if (this.mediaRecorder);
            this.mediaRecorder.stop();
          }, this.seconds * 1000);
        })
        .catch(err => {
          (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__/* .log */ .Rm)('error', err.toString());
          this.visualFeedbak(false, $div);
        });
    }
  }

  /**
   * Set visual feedback to the user while the system is recording audio
   * Currently changes the cursor pointer associated to the HTML element
   * containing the recorder.
   * @param {boolean} enabled - Flag indicating if the visual feedback should be active or inactive
   * @param {external:jQuery} [$div] - Optional `div` element where the recording is performed, as a jQuery ref.
   */
  visualFeedbak(enabled, $div) {
    if ($div)
      $div.css('cursor', enabled ? 'progress' : 'inherit');
  }

  /**
   * Clears all data associated to this AudioBuffer
   */
  clear() {
    this.stop();
    this.mediaPlayer = null;
  }
}

Object.assign(AudioBuffer.prototype, {
  /**
   * AudioBuffer is enabled only in browsers with `navigator.MediaDevices.getuserMedia`
   * @name module:media/AudioBuffer.AudioBuffer#enabled
   * @type {boolean}
   */
  enabled: false,
  /**
   * Maximum length of recordings allowed to this AudioBuffer (in seconds)
   * @name module:media/AudioBuffer.AudioBuffer#seconds
   * @type {number}
   */
  seconds: 20,
  /**
   * The object used to record audio data and convert it to a valid stream for the {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer}
   * @name module:media/AudioBuffer.AudioBuffer#mediaRecorder
   * @type {external:MediaRecorder}
   */
  mediaRecorder: null,
  /**
   * Array of data chunks collected during the recording
   * @name module:media/AudioBuffer.AudioBuffer#chunks
   * @type {external:Blob[]}
   */
  chunks: null,
  /**
   * The HTML audio element used to play the recorded sound
   * @name module:media/AudioBuffer.AudioBuffer#mediaPlayer
   * @type {external:HTMLAudioElement}
   */
  mediaPlayer: null,
  /**
   * The identifier of the timer launched to stop the recording when the maximum time is exceeded.
   * This member is `null` when no timeout function is associated to this AudioBuffer
   * @name module:media/AudioBuffer.AudioBuffer#timeoutID
   * @type {number}
   */
  timeoutID: null,
  /**
   * Instructs this AudioBuffer recorder to start playing the collected audio at the end of the
   * current `mediaRecorder` task.
   * @name module:media/AudioBuffer.AudioBuffer#playWhenFinished
   * @type {boolean}
   */
  playWhenFinished: false,
});

/**
 * Maximum amount of time allowed for recordings (in seconds)
 * @type {number}
 */
AudioBuffer.MAX_RECORD_LENGTH = 180;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AudioBuffer);


/***/ })

};
;
//# sourceMappingURL=827.jclic-node.js.map