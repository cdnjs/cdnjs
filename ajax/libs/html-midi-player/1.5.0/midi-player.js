/**
 * html-midi-player@1.5.0
 * https://github.com/cifkao/html-midi-player.git
 * @author Ondřej Cífka (@cifkao)
 * @license BSD-2-Clause
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@magenta/music/esm/core.js')) :
  typeof define === 'function' && define.amd ? define(['exports', '@magenta/music/esm/core.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.midiPlayer = {}, global.core));
}(this, (function (exports, mm) { 'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var playIcon = "<svg width=\"24\" height=\"24\" version=\"1.1\" viewBox=\"0 0 6.35 6.35\" xmlns=\"http://www.w3.org/2000/svg\">\n <path d=\"m4.4979 3.175-2.1167 1.5875v-3.175z\" stroke-width=\".70201\"/>\n</svg>\n";

  var pauseIcon = "<svg width=\"24\" height=\"24\" version=\"1.1\" viewBox=\"0 0 6.35 6.35\" xmlns=\"http://www.w3.org/2000/svg\">\n <path d=\"m1.8521 1.5875v3.175h0.92604v-3.175zm1.7198 0v3.175h0.92604v-3.175z\" stroke-width=\".24153\"/>\n</svg>\n";

  var errorIcon = "<svg width=\"24\" height=\"24\" version=\"1.1\" viewBox=\"0 0 6.35 6.35\" xmlns=\"http://www.w3.org/2000/svg\">\n <path transform=\"scale(.26458)\" d=\"m12 3.5a8.4993 8.4993 0 0 0-8.5 8.5 8.4993 8.4993 0 0 0 8.5 8.5 8.4993 8.4993 0 0 0 8.5-8.5 8.4993 8.4993 0 0 0-8.5-8.5zm-1.4062 3.5h3v6h-3v-6zm0 8h3v2h-3v-2z\"/>\n</svg>\n";

  var controlsCSS = ":host {\n  display: inline-block;\n  width: 300px;\n  margin: 3px;\n  vertical-align: bottom;\n  font-family: sans-serif;\n  font-size: 14px;\n}\n\n:focus:not(.focus-visible) {\n  outline: none;\n}\n\n.controls {\n  width: inherit;\n  height: inherit;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: row;\n  position: relative;\n  overflow: hidden;\n  align-items: center;\n  border-radius: 100px;\n  background: #f2f5f6;\n  padding: 0 0.25em;\n  user-select: none;\n}\n.controls > * {\n  margin: 0.8em 0.45em;\n}\n.controls input, .controls button {\n  cursor: pointer;\n}\n.controls input:disabled, .controls button:disabled {\n  cursor: inherit;\n}\n.controls button {\n  text-align: center;\n  background: rgba(204, 204, 204, 0);\n  border: none;\n  width: 32px;\n  height: 32px;\n  border-radius: 100%;\n  transition: background-color 0.25s ease 0s;\n  padding: 0;\n}\n.controls button:not(:disabled):hover {\n  background: rgba(204, 204, 204, 0.3);\n}\n.controls button:not(:disabled):active {\n  background: rgba(204, 204, 204, 0.6);\n}\n.controls button .icon {\n  display: none;\n}\n.controls button .icon, .controls button .icon svg {\n  vertical-align: middle;\n}\n.controls button .icon svg {\n  fill: currentColor;\n}\n.controls .seek-bar {\n  flex: 1;\n  min-width: 0;\n  margin-right: 1.1em;\n  background: transparent;\n}\n.controls .seek-bar::-moz-range-track {\n  background-color: #555;\n}\n.controls.stopped .play-icon, .controls.playing .stop-icon, .controls.error .error-icon {\n  display: inherit;\n}\n.controls.frozen > div, .controls > button:disabled .icon {\n  opacity: 0.5;\n}\n.controls .overlay {\n  z-index: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n  box-sizing: border-box;\n  display: none;\n  opacity: 1;\n}\n.controls.loading .loading-overlay {\n  display: block;\n  background: linear-gradient(110deg, #92929200 5%, #92929288 25%, #92929200 45%);\n  background-size: 250% 100%;\n  background-repeat: repeat-y;\n  animation: shimmer 1.5s linear infinite;\n}\n\n@keyframes shimmer {\n  0% {\n    background-position: 125% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}";

  var visualizerCSS = ":host {\n  display: block;\n}\n\n::slotted(.piano-roll-visualizer) {\n  overflow-x: auto;\n}";

  /// <reference path="imports.d.ts"/>
  var controlsTemplate = document.createElement('template');
  controlsTemplate.innerHTML = "\n<style>\n".concat(controlsCSS, "\n</style>\n<div class=\"controls stopped frozen\" part=\"control-panel\">\n  <button class=\"play\" part=\"play-button\" disabled>\n    <span class=\"icon play-icon\">").concat(playIcon, "</span>\n    <span class=\"icon stop-icon\">").concat(pauseIcon, "</span>\n    <span class=\"icon error-icon\">").concat(errorIcon, "</span>\n  </button>\n  <div part=\"time\"><span class=\"current-time\" part=\"current-time\">0:00</span> / <span class=\"total-time\" part=\"total-time\">0:00</span></div>\n  <input type=\"range\" min=\"0\" max=\"0\" value=\"0\" step=\"any\" class=\"seek-bar\" part=\"seek-bar\" disabled>\n  <div class=\"overlay loading-overlay\" part=\"loading-overlay\"></div>\n</div>\n");
  var visualizerTemplate = document.createElement('template');
  visualizerTemplate.innerHTML = "\n<style>\n".concat(visualizerCSS, "\n</style>\n<slot>\n</slot>\n");

  function formatTime(seconds) {
    var negative = seconds < 0;
    seconds = Math.floor(Math.abs(seconds || 0));
    var s = seconds % 60;
    var m = (seconds - s) / 60;
    var h = (seconds - s - 60 * m) / 3600;
    var sStr = s > 9 ? "".concat(s) : "0".concat(s);
    var mStr = m > 9 || !h ? "".concat(m, ":") : "0".concat(m, ":");
    var hStr = h ? "".concat(h, ":") : '';
    return (negative ? '-' : '') + hStr + mStr + sStr;
  }

  var VISUALIZER_TYPES = ['piano-roll', 'waterfall', 'staff'];
  /**
   * MIDI visualizer element.
   *
   * The visualizer is implemented via SVG elements which support styling as described
   * [here](https://magenta.github.io/magenta-js/music/demos/visualizer.html).
   *
   * See also the
   * [`@magenta/music/core/visualizer` docs](https://magenta.github.io/magenta-js/music/modules/_core_visualizer_.html).
   *
   * @prop src - MIDI file URL
   * @prop type - Visualizer type
   * @prop noteSequence - Magenta note sequence object representing the currently displayed content
   * @prop config - Magenta visualizer config object
   */

  class VisualizerElement extends HTMLElement {
    constructor() {
      super(...arguments);
      this.domInitialized = false;
      this.ns = null;
      this._config = {};
    }

    static get observedAttributes() {
      return ['src', 'type'];
    }

    connectedCallback() {
      this.attachShadow({
        mode: 'open'
      });
      this.shadowRoot.appendChild(visualizerTemplate.content.cloneNode(true));

      if (this.domInitialized) {
        return;
      }

      this.domInitialized = true;
      this.wrapper = document.createElement('div');
      this.appendChild(this.wrapper);
      this.initVisualizerNow();
    }

    attributeChangedCallback(name, _oldValue, _newValue) {
      if (name === 'src' || name === 'type') {
        this.initVisualizer();
      }
    }

    initVisualizer() {
      if (this.initTimeout == null) {
        this.initTimeout = window.setTimeout(() => this.initVisualizerNow());
      }
    }

    initVisualizerNow() {
      var _this = this;

      return _asyncToGenerator(function* () {
        _this.initTimeout = null;

        if (!_this.domInitialized) {
          return;
        }

        if (_this.src) {
          _this.ns = null;
          _this.ns = yield mm.urlToNoteSequence(_this.src);
        }

        _this.wrapper.innerHTML = '';

        if (!_this.ns) {
          return;
        }

        if (_this.type === 'piano-roll') {
          _this.wrapper.classList.add('piano-roll-visualizer');

          var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

          _this.wrapper.appendChild(svg);

          _this.visualizer = new mm.PianoRollSVGVisualizer(_this.ns, svg, _this._config);
        } else if (_this.type === 'waterfall') {
          _this.wrapper.classList.add('waterfall-visualizer');

          _this.visualizer = new mm.WaterfallSVGVisualizer(_this.ns, _this.wrapper, _this._config);
        } else if (_this.type === 'staff') {
          _this.wrapper.classList.add('staff-visualizer');

          var div = document.createElement('div');

          _this.wrapper.appendChild(div);

          _this.visualizer = new mm.StaffSVGVisualizer(_this.ns, div, _this._config);
        }
      })();
    }

    reload() {
      this.initVisualizerNow();
    }

    redraw(activeNote) {
      if (this.visualizer) {
        this.visualizer.redraw(activeNote, activeNote != null);
      }
    }

    clearActiveNotes() {
      if (this.visualizer) {
        this.visualizer.clearActiveNotes();
      }
    }

    get noteSequence() {
      return this.ns;
    }

    set noteSequence(value) {
      if (this.ns == value) {
        return;
      }

      this.ns = value;
      this.removeAttribute('src'); // Triggers initVisualizer only if src was present.

      this.initVisualizer();
    }

    get src() {
      return this.getAttribute('src');
    }

    set src(value) {
      this.ns = null;
      this.setOrRemoveAttribute('src', value); // Triggers initVisualizer only if src was present.

      this.initVisualizer();
    }

    get type() {
      var value = this.getAttribute('type');

      if (VISUALIZER_TYPES.indexOf(value) < 0) {
        value = 'piano-roll';
      }

      return value;
    }

    set type(value) {
      if (value != null && VISUALIZER_TYPES.indexOf(value) < 0) {
        throw new Error("Unknown visualizer type ".concat(value, ". Allowed values: ").concat(VISUALIZER_TYPES.join(', ')));
      }

      this.setOrRemoveAttribute('type', value);
    }

    get config() {
      return this._config;
    }

    set config(value) {
      this._config = value;
      this.initVisualizer();
    }

    setOrRemoveAttribute(name, value) {
      if (value == null) {
        this.removeAttribute(name);
      } else {
        this.setAttribute(name, value);
      }
    }

  }

  var VISUALIZER_EVENTS = ['start', 'stop', 'note'];
  var DEFAULT_SOUNDFONT = 'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus';
  var playingPlayer = null;
  /**
   * MIDI player element.
   * See also the [`@magenta/music/core/player` docs](https://magenta.github.io/magenta-js/music/modules/_core_player_.html).
   *
   * The element supports styling using the CSS [`::part` syntax](https://developer.mozilla.org/docs/Web/CSS/::part)
   * (see the list of shadow parts [below](#css-shadow-parts)). For example:
   * ```css
   * midi-player::part(control-panel) {
   *     background: aquamarine;
   *     border-radius: 0px;
   * }
   * ```
   *
   * @prop src - MIDI file URL
   * @prop soundFont - Magenta SoundFont URL, an empty string to use the default SoundFont, or `null` to use a simple oscillator synth
   * @prop noteSequence - Magenta note sequence object representing the currently loaded content
   * @prop loop - Indicates whether the player should loop
   * @prop currentTime - Current playback position in seconds
   * @prop duration - Content duration in seconds
   * @prop playing - Indicates whether the player is currently playing
   * @attr visualizer - A selector matching `midi-visualizer` elements to bind to this player
   *
   * @fires load - The content is loaded and ready to play
   * @fires start - The player has started playing
   * @fires stop - The player has stopped playing
   * @fires loop - The player has automatically restarted playback after reaching the end
   * @fires note - A note starts
   *
   * @csspart control-panel - `<div>` containing all the controls
   * @csspart play-button - Play button
   * @csspart time - Numeric time indicator
   * @csspart current-time - Elapsed time
   * @csspart total-time - Total duration
   * @csspart seek-bar - `<input type="range">` showing playback position
   * @csspart loading-overlay - Overlay with shimmer animation
   */

  class PlayerElement extends HTMLElement {
    constructor() {
      super();
      this.domInitialized = false;
      this.needInitNs = false;
      this.visualizerListeners = new Map();
      this.ns = null;
      this._playing = false;
      this.seeking = false;
      this.attachShadow({
        mode: 'open'
      });
      this.shadowRoot.appendChild(controlsTemplate.content.cloneNode(true));
      this.controlPanel = this.shadowRoot.querySelector('.controls');
      this.playButton = this.controlPanel.querySelector('.play');
      this.currentTimeLabel = this.controlPanel.querySelector('.current-time');
      this.totalTimeLabel = this.controlPanel.querySelector('.total-time');
      this.seekBar = this.controlPanel.querySelector('.seek-bar');
    }

    static get observedAttributes() {
      return ['sound-font', 'src', 'visualizer'];
    }

    connectedCallback() {
      if (this.domInitialized) {
        return;
      }

      this.domInitialized = true;
      var applyFocusVisiblePolyfill = window.applyFocusVisiblePolyfill;

      if (applyFocusVisiblePolyfill != null) {
        applyFocusVisiblePolyfill(this.shadowRoot);
      }

      this.playButton.addEventListener('click', () => {
        if (this.player.isPlaying()) {
          this.stop();
        } else {
          this.start();
        }
      });
      this.seekBar.addEventListener('input', () => {
        // Pause playback while the user is manipulating the control
        this.seeking = true;

        if (this.player && this.player.getPlayState() === 'started') {
          this.player.pause();
        }
      });
      this.seekBar.addEventListener('change', () => {
        var time = this.currentTime; // This returns the seek bar value as a number

        this.currentTimeLabel.textContent = formatTime(time);

        if (this.player) {
          if (this.player.isPlaying()) {
            this.player.seekTo(time);

            if (this.player.getPlayState() === 'paused') {
              this.player.resume();
            }
          }
        }

        this.seeking = false;
      });
      this.initPlayerNow();
    }

    attributeChangedCallback(name, _oldValue, newValue) {
      if (!this.hasAttribute(name)) {
        newValue = null;
      }

      if (name === 'sound-font' || name === 'src') {
        this.initPlayer();
      } else if (name === 'visualizer') {
        var fn = () => {
          this.setVisualizerSelector(newValue);
        };

        if (document.readyState === 'loading') {
          window.addEventListener('DOMContentLoaded', fn);
        } else {
          fn();
        }
      }
    }

    initPlayer(initNs = true) {
      this.needInitNs = this.needInitNs || initNs;

      if (this.initTimeout == null) {
        this.stop();
        this.setLoading();
        this.initTimeout = window.setTimeout(() => this.initPlayerNow(this.needInitNs));
      }
    }

    initPlayerNow(initNs = true) {
      var _this = this;

      return _asyncToGenerator(function* () {
        _this.initTimeout = null;
        _this.needInitNs = false;

        if (!_this.domInitialized) {
          return;
        }

        try {
          var ns = null;

          if (initNs) {
            if (_this.src) {
              _this.ns = null;
              _this.ns = yield mm.urlToNoteSequence(_this.src);
            }

            _this.currentTime = 0;

            if (!_this.ns) {
              _this.setError('No content loaded');
            }
          }

          ns = _this.ns;

          if (ns) {
            _this.seekBar.max = String(ns.totalTime);
            _this.totalTimeLabel.textContent = formatTime(ns.totalTime);
          } else {
            _this.seekBar.max = '0';
            _this.totalTimeLabel.textContent = formatTime(0);
            return;
          }

          var soundFont = _this.soundFont;
          var callbackObject = {
            // Call callbacks only if we are still playing the same note sequence.
            run: n => _this.ns === ns && _this.noteCallback(n),
            stop: () => {}
          };

          if (soundFont === null) {
            _this.player = new mm.Player(false, callbackObject);
          } else {
            if (soundFont === "") {
              soundFont = DEFAULT_SOUNDFONT;
            }

            _this.player = new mm.SoundFontPlayer(soundFont, undefined, undefined, undefined, callbackObject);
            yield _this.player.loadSamples(ns);
          }

          if (_this.ns !== ns) {
            // If we started loading a different sequence in the meantime...
            return;
          }

          _this.setLoaded();

          _this.dispatchEvent(new CustomEvent('load'));
        } catch (error) {
          _this.setError(String(error));

          throw error;
        }
      })();
    }

    reload() {
      this.initPlayerNow();
    }

    start() {
      this._start();
    }

    _start(looped = false) {
      var _this2 = this;

      _asyncToGenerator(function* () {
        if (_this2.player) {
          if (_this2.player.getPlayState() == 'stopped') {
            if (playingPlayer && playingPlayer.playing && !(playingPlayer == _this2 && looped)) {
              playingPlayer.stop();
            }

            playingPlayer = _this2;
            _this2._playing = true;
            var offset = _this2.currentTime; // Jump to the start if there are no notes left to play.

            if (_this2.ns.notes.filter(note => note.startTime > offset).length == 0) {
              offset = 0;
            }

            _this2.currentTime = offset;

            _this2.controlPanel.classList.remove('stopped');

            _this2.controlPanel.classList.add('playing');

            try {
              // Force reload visualizers to prevent stuttering at playback start
              for (var visualizer of _this2.visualizerListeners.keys()) {
                if (visualizer.noteSequence != _this2.ns) {
                  visualizer.noteSequence = _this2.ns;
                  visualizer.reload();
                }
              }

              var promise = _this2.player.start(_this2.ns, undefined, offset);

              if (!looped) {
                _this2.dispatchEvent(new CustomEvent('start'));
              } else {
                _this2.dispatchEvent(new CustomEvent('loop'));
              }

              yield promise;

              _this2.handleStop(true);
            } catch (error) {
              _this2.handleStop();

              throw error;
            }
          } else if (_this2.player.getPlayState() == 'paused') {
            // This normally should not happen, since we pause playback only when seeking.
            _this2.player.resume();
          }
        }
      })();
    }

    stop() {
      if (this.player && this.player.isPlaying()) {
        this.player.stop();
      }

      this.handleStop(false);
    }

    addVisualizer(visualizer) {
      var listeners = {
        start: () => {
          visualizer.noteSequence = this.noteSequence;
        },
        stop: () => {
          visualizer.clearActiveNotes();
        },
        note: event => {
          visualizer.redraw(event.detail.note);
        }
      };

      for (var name of VISUALIZER_EVENTS) {
        this.addEventListener(name, listeners[name]);
      }

      this.visualizerListeners.set(visualizer, listeners);
    }

    removeVisualizer(visualizer) {
      var listeners = this.visualizerListeners.get(visualizer);

      for (var name of VISUALIZER_EVENTS) {
        this.removeEventListener(name, listeners[name]);
      }

      this.visualizerListeners.delete(visualizer);
    }

    noteCallback(note) {
      if (!this.playing) {
        return;
      }

      this.dispatchEvent(new CustomEvent('note', {
        detail: {
          note
        }
      }));

      if (this.seeking) {
        return;
      }

      this.seekBar.value = String(note.startTime);
      this.currentTimeLabel.textContent = formatTime(note.startTime);
    }

    handleStop(finished = false) {
      if (finished) {
        if (this.loop) {
          this.currentTime = 0;

          this._start(true);

          return;
        }

        this.currentTime = this.duration;
      }

      this.controlPanel.classList.remove('playing');
      this.controlPanel.classList.add('stopped');

      if (this._playing) {
        this._playing = false;
        this.dispatchEvent(new CustomEvent('stop', {
          detail: {
            finished
          }
        }));
      }
    }

    setVisualizerSelector(selector) {
      // Remove old listeners
      for (var listeners of this.visualizerListeners.values()) {
        for (var name of VISUALIZER_EVENTS) {
          this.removeEventListener(name, listeners[name]);
        }
      }

      this.visualizerListeners.clear(); // Match visualizers and add them as listeners

      if (selector != null) {
        for (var element of document.querySelectorAll(selector)) {
          if (!(element instanceof VisualizerElement)) {
            console.warn("Selector ".concat(selector, " matched non-visualizer element"), element);
            continue;
          }

          this.addVisualizer(element);
        }
      }
    }

    setLoading() {
      this.playButton.disabled = true;
      this.seekBar.disabled = true;
      this.controlPanel.classList.remove('error');
      this.controlPanel.classList.add('loading', 'frozen');
      this.controlPanel.removeAttribute('title');
    }

    setLoaded() {
      this.controlPanel.classList.remove('loading', 'frozen');
      this.playButton.disabled = false;
      this.seekBar.disabled = false;
    }

    setError(error) {
      this.playButton.disabled = true;
      this.seekBar.disabled = true;
      this.controlPanel.classList.remove('loading', 'stopped', 'playing');
      this.controlPanel.classList.add('error', 'frozen');
      this.controlPanel.title = error;
    }

    get noteSequence() {
      return this.ns;
    }

    set noteSequence(value) {
      if (this.ns == value) {
        return;
      }

      this.ns = value;
      this.removeAttribute('src'); // Triggers initPlayer only if src was present.

      this.initPlayer();
    }

    get src() {
      return this.getAttribute('src');
    }

    set src(value) {
      this.ns = null;
      this.setOrRemoveAttribute('src', value); // Triggers initPlayer only if src was present.

      this.initPlayer();
    }
    /**
     * @attr sound-font
     */


    get soundFont() {
      return this.getAttribute('sound-font');
    }

    set soundFont(value) {
      this.setOrRemoveAttribute('sound-font', value);
    }
    /**
     * @attr loop
     */


    get loop() {
      return this.getAttribute('loop') != null;
    }

    set loop(value) {
      this.setOrRemoveAttribute('loop', value ? '' : null);
    }

    get currentTime() {
      return parseFloat(this.seekBar.value);
    }

    set currentTime(value) {
      this.seekBar.value = String(value);
      this.currentTimeLabel.textContent = formatTime(this.currentTime);

      if (this.player && this.player.isPlaying()) {
        this.player.seekTo(value);
      }
    }

    get duration() {
      return parseFloat(this.seekBar.max);
    }

    get playing() {
      return this._playing;
    }

    setOrRemoveAttribute(name, value) {
      if (value == null) {
        this.removeAttribute(name);
      } else {
        this.setAttribute(name, value);
      }
    }

  }

  window.customElements.define('midi-player', PlayerElement);
  window.customElements.define('midi-visualizer', VisualizerElement);

  exports.PlayerElement = PlayerElement;
  exports.VisualizerElement = VisualizerElement;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
