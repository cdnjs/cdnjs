/*!
 * Audio5js: HTML5 Audio Compatibility Layer
 * https://github.com/zohararad/audio5js
 * License MIT (c) Zohar Arad 2013
 */
(function ($win, ns, factory) {
  "use strict";

  if (typeof (module) !== 'undefined' && module.exports) { // CommonJS
    module.exports = factory(ns, $win);
  } else if (typeof (define) === 'function' && define.amd) { // AMD
    define(function () {
      return factory(ns, $win);
    });
  } else { // <script>
    $win[ns] = factory(ns, $win);
  }

}(window, 'Audio5js', function (ns, $win) {

  "use strict";

  var ActiveXObject = $win.ActiveXObject;

  /**
   * AudioError Class
   * @param {String} message error message
   * @constructor
   */
  function AudioError(message) {
    this.message = message;
  }

  AudioError.prototype = new Error();

  /**
   * Clones an object
   * @param obj object to clone
   * @return {Object} cloned object
   */
  function cloneObject(obj) {
    var clone = {}, i;
    for (i in obj) {
      if (typeof (obj[i]) === "object") {
        clone[i] = cloneObject(obj[i]);
      } else {
        clone[i] = obj[i];
      }
    }
    return clone;
  }

  /**
   * Extend an object with a mixin
   * @param {Object} target target object to extend
   * @param {Object} mixin object to mix into target
   * @return {*} extended object
   */
  var extend = function (target, mixin) {
    var name, m = cloneObject(mixin);
    for (name in m) {
      if (m.hasOwnProperty(name)) {
        target[name] = m[name];
      }
    }
    return target;
  };

  /**
   * Extend an object's prototype with a mixin
   * @param {Object} target target object to extend
   * @param {Object} mixin object to mix into target
   * @return {*} extended object
   */
  var include = function (target, mixin) {
    return extend(target.prototype, mixin);
  };

  var Pubsub = {
    channels: {}, //hash of subscribed channels
    /**
     * Subscribe to event on a channel
     * @param {String} evt name of channel / event to subscribe
     * @param {Function} fn the callback to execute on message publishing
     * @param {Object} ctx the context in which the callback should be executed
     */
    on: function (evt, fn, ctx) {
      this.channels[evt] = this.channels[evt] || [];
      this.channels[evt].push({fn: fn, ctx: ctx});
    },
    /**
     * Unsubscribe from an event on a channel
     * @param {String} evt name of channel / event to unsubscribe
     * @param {Function} fn the callback used when subscribing to the event
     */
    off: function (evt, fn) {
      if (this.channels[evt] === undefined) { return; }
      var i, l;
      for (i = 0, l = this.channels[evt].length; i  < l; i++) {
        var sub = this.channels[evt][i].fn;
        if (sub === fn) {
          this.channels[evt].splice(i, 1);
          break;
        }
      }
    },
    /**
     * Publish a message on a channel. Accepts **args after event name
     * @param {String} evt name of channel / event to trigger
     */
    trigger: function (evt) {
      if (this.channels.hasOwnProperty(evt)) {
        var args = Array.prototype.slice.call(arguments, 1);
        var i, l;
        for (i = 0, l = this.channels[evt].length; i < l; i++) {
          var sub = this.channels[evt][i];
          if (typeof (sub.fn) === 'function') {
            sub.fn.apply(sub.ctx, args);
          }
        }
      }
    }
  };

  var util = {
    /**
     * Flash embed code string with cross-browser support.
     */
    flash_embed_code: (function () {
      var prefix;
      var s = '<param name="movie" value="$2?playerInstance=' + ns + '.flash.instances[\'$1\']&datetime=$3"/>' +
        '<param name="wmode" value="transparent"/>' +
        '<param name="allowscriptaccess" value="always" />' +
        '</object>';
      if (ActiveXObject) {
        prefix = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="1" height="1" id="$1">';
      } else {
        prefix = '<object type="application/x-shockwave-flash" data="$2?playerInstance=' + ns + '.flash.instances[\'$1\']&datetime=$3" width="1" height="1" id="$1" >';
      }
      return prefix + s;
    }()),
    /**
     * Check if browser supports audio mime type.
     * @param {String} mime_type audio mime type to check
     * @return {Boolean} whether browser supports passed audio mime type
     */
    can_play: function (mime_type) {
      var a = document.createElement('audio');
      var mime_str;
      switch (mime_type) {
      case 'mp3':
        mime_str = 'audio/mpeg; codecs="mp3"';
        break;
      case 'vorbis':
        mime_str = 'audio/ogg; codecs="vorbis"';
        break;
      case 'opus':
        mime_str = 'audio/ogg; codecs="opus"';
        break;
      case 'webm':
        mime_str = 'audio/webm; codecs="vorbis"';
        break;
      case 'mp4':
        mime_str = 'audio/mp4; codecs="mp4a.40.5"';
        break;
      case 'wav':
        mime_str = 'audio/wav; codecs="1"';
        break;
      }
      if (mime_str === undefined) {
        throw new Error('Unspecified Audio Mime Type');
      } else {
        return !!a.canPlayType && a.canPlayType(mime_str) !== '';
      }
    },
    /**
     * Boolean flag indicating whether the browser has Flash installed or not
     */
    has_flash: (function () {
      var r = false;
      if (navigator.plugins && navigator.plugins.length && navigator.plugins['Shockwave Flash']) {
        r = true;
      } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
        var mimeType = navigator.mimeTypes['application/x-shockwave-flash'];
        r = mimeType && mimeType.enabledPlugin;
      } else {
        try {
          var ax = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
          r = typeof (ax) === 'object';
        } catch (e) {}
      }
      return r;
    }()),
    /**
     * Embed Flash MP3 player SWF to DOM
     * @param {String} swf_location location of MP3 player SWF
     * @param {String} id swf unique ID used for resolving callbacks from ExternalInterface to Javascript
     */
    embedFlash: function (swf_location, id) {
      var d = document.createElement('div');
      d.style.position = 'absolute';
      d.style.width = '1px';
      d.style.height = '1px';
      d.style.top = '-2px';
      var flashSource = this.flash_embed_code.replace(/\$1/g, id);
      flashSource = flashSource.replace(/\$2/g, swf_location);
      flashSource = flashSource.replace(/\$3/g, (new Date().getTime() + Math.random())); // Ensure swf is not pulled from cache
      d.innerHTML = flashSource;
      document.body.appendChild(d);
      return document.getElementById(id);
    },
    /**
     * Formats seconds into a time string hh:mm:ss.
     * @param {Number} seconds seconds to format as string
     * @return {String} formatted time string
     */
    formatTime: function (seconds) {
      var hours = parseInt(seconds / 3600, 10) % 24;
      var minutes = parseInt(seconds / 60, 10) % 60;
      var secs = parseInt(seconds % 60, 10);
      var result, fragment = (minutes < 10 ? "0" + minutes : minutes) + ":" + (secs  < 10 ? "0" + secs : secs);
      if (hours > 0) {
        result = (hours < 10 ? "0" + hours : hours) + ":" + fragment;
      } else {
        result = fragment;
      }
      return result;
    }
  };

  util.use_flash = util.can_play('mp3');

  var Audio5js, FlashAudioPlayer, HTML5AudioPlayer;

  /**
   * Common audio attributes object. Mixed into audio players.
   * @type {Object}
   */
  var AudioAttributes = {
    playing: false, /** {Boolean} player playback state  */
    vol: 1, /** {Float} audio volume */
    duration: 0, /** {Float} audio duration (sec) */
    position: 0, /** {Float} audio position (sec) */
    load_percent: 0, /** {Float} audio file load percent (%) */
    seekable: false /** {Boolean} is loaded audio seekable */
  };

  /**
   * Flash MP3 Audio Player Class
   * @constructor
   */
  FlashAudioPlayer = function () {
    if (util.use_flash && !util.has_flash) {
      throw new Error('Flash Plugin Missing');
    } else {
      include(FlashAudioPlayer, Pubsub);
      include(FlashAudioPlayer, AudioAttributes);
    }
  };

  FlashAudioPlayer.prototype = {
    /**
     * Initialize the player
     * @param {String} swf_src path to audio player SWF file
     */
    init: function (swf_src) {
      Audio5js.flash.count += 1;
      this.id = ns + Audio5js.flash.count;
      Audio5js.flash.instances[this.id] = this;
      this.embed(swf_src);
    },
    /**
     * Embed audio player SWF in page and assign reference to audio instance variable
     * @param {String} swf_src path to audio player SWF file
     */
    embed: function (swf_src) {
      this.audio = util.embedFlash(swf_src, this.id);
    },
    /**
     * ExternalInterface callback indicating SWF is ready
     */
    eiReady: function () {
      this.trigger('ready');
    },
    /**
     * ExternalInterface timeupdate callback. Fires as long as playhead position is updated (audio is being played).
     * @param {Float} position audio playback position (sec)
     * @param {Float} duration audio total duration (sec)
     * @param {Boolean} seekable is audio seekable or not (download or streaming)
     */
    eiTimeUpdate: function (position, duration, seekable) {
      this.position = position;
      this.duration = duration;
      this.seekable = seekable;
      if (this.playing) {
        this.trigger('timeupdate', position, (this.seekable ? duration : null));
      }
    },
    /**
     * ExternalInterface download progress callback. Fires as long as audio file is downloaded by browser.
     * @param {Float} percent audio download percent
     */
    eiProgress: function (percent) {
      this.load_percent = percent;
      this.trigger('progress', percent);
    },
    /**
     * ExternalInterface audio load error callback.
     * @param {String} msg error message
     */
    eiLoadError: function (msg) {
      this.trigger('error', msg);
    },
    /**
     * ExternalInterface audio play callback. Fires when audio starts playing.
     */
    eiPlay: function () {
      this.playing = true;
      this.trigger('play');
    },
    /**
     * ExternalInterface audio pause callback. Fires when audio is paused.
     */
    eiPause: function () {
      this.playing = false;
      this.trigger('pause');
    },
    /**
     * ExternalInterface audio ended callback. Fires when audio playback ended.
     */
    eiEnded: function () {
      this.playing = false;
      this.trigger('ended');
    },
    /**
     * ExternalInterface audio ended callback. Fires when audio playback ended.
     */
    eiCanPlay: function () {
      this.trigger('canplay');
    },
    /**
     * Resets audio position and parameters. Invoked once audio is loaded.
     */
    reset: function () {
      this.seekable = false;
      this.duration = 0;
      this.position = 0;
      this.load_percent = 0;
    },
    /**
     * Load audio from url.
     * @param {String} url URL of audio to load
     */
    load: function (url) {
      this.reset();
      this.audio.load(url);
    },
    /**
     * Play audio
     */
    play: function () {
      this.audio.pplay();
    },
    /**
     * Pause audio
     */
    pause: function () {
      this.audio.ppause();
    },
    /**
     * Get / Set audio volume
     * @param {Float} v audio volume to set between 0 - 1.
     * @return {Float} current audio volume
     */
    volume: function (v) {
      if (v !== undefined && !isNaN(parseInt(v, 10))) {
        this.audio.setVolume(v);
        this.vol = v;
      } else {
        return this.vol;
      }
    },
    /**
     * Seek audio to position
     * @param {Float} position audio position in seconds to seek to.
     */
    seek: function (position) {
      try {
        this.audio.seekTo(position);
        this.position = position;
      } catch (e) {}
    }
  };

  /**
   * HTML5 Audio Player
   * @constructor
   */
  HTML5AudioPlayer = function () {
    include(HTML5AudioPlayer, Pubsub);
    include(HTML5AudioPlayer, AudioAttributes);
  };

  HTML5AudioPlayer.prototype = {
    /**
     * Initialize the player instance
     */
    init: function () {
      this.audio = new Audio();
      this.audio.autoplay = false;
      this.audio.preload = 'auto';
      this.audio.autobuffer = true;
      this.bindEvents();
      this.trigger('ready');
    },
    /**
     * Bind DOM events to Audio object
     */
    bindEvents: function () {
      this.audio.addEventListener('timeupdate', this.onTimeUpdate.bind(this));
      this.audio.addEventListener('play', this.onPlay.bind(this));
      this.audio.addEventListener('pause', this.onPause.bind(this));
      this.audio.addEventListener('ended', this.onEnded.bind(this));
      this.audio.addEventListener('canplay', this.onLoad.bind(this));
      this.audio.addEventListener('error', this.onError.bind(this));
    },
    /**
     * Audio play event handler. Triggered when audio starts playing.
     */
    onPlay: function () {
      this.playing = true;
      this.trigger('play');
    },
    /**
     * Audio pause event handler. Triggered when audio is paused.
     */
    onPause: function () {
      this.playing = false;
      this.trigger('pause');
    },
    /**
     * Audio ended event handler. Triggered when audio playback has ended.
     */
    onEnded: function () {
      this.playing = false;
      this.trigger('ended');
    },
    /**
     * Audio timeupdate event handler. Triggered as long as playhead position is updated (audio is being played).
     */
    onTimeUpdate: function () {
      if (this.audio.buffered !== null && this.audio.buffered.length && this.playing) {
        this.position = this.audio.currentTime;
        this.duration = this.audio.duration === Infinity ? null : this.audio.duration;
        this.trigger('timeupdate', this.position, this.duration);
      }
    },
    /**
     * Audio canplay event handler. Triggered when audio is loaded and can be played.
     * Resets player parameters and starts audio download progress timer.
     */
    onLoad: function () {
      this.seekable = this.audio.seekable && this.audio.seekable.length > 0;
      if (this.seekable) {
        this.timer = setInterval(this.onProgress.bind(this), 250);
      }
      this.trigger('canplay');
    },
    /**
     * Audio download progress timer callback. Check audio's download percentage.
     * Called periodically as soon as the audio loads and can be played.
     * Cancelled when audio has fully download or when a new audio file has been loaded to the player.
     */
    onProgress: function () {
      if (this.audio.buffered !== null && this.audio.buffered.length) {
        this.load_percent = parseInt(((this.audio.buffered.end(this.audio.buffered.length - 1) / this.audio.duration) * 100), 10);
        this.trigger('progress', this.load_percent);
        if (this.load_percent >= 100) {
          this.clearLoadProgress();
        }
      }
    },
    /**
     * Audio error event handler
     * @param e error event
     */
    onError: function (e) {
      this.trigger('error', e);
    },
    /**
     * Clears periodical audio download progress callback.
     */
    clearLoadProgress: function () {
      if (this.timer !== undefined) {
        clearInterval(this.timer);
        delete this.timer;
      }
    },
    /**
     * Resets audio position and parameters.
     */
    reset: function () {
      this.clearLoadProgress();
      this.seekable = false;
      this.duration = 0;
      this.position = 0;
      this.load_percent = 0;
    },
    /**
     * Load audio from url.
     * @param {String} url URL of audio to load
     */
    load: function (url) {
      this.reset();
      this.audio.setAttribute('src', url);
      this.audio.load();
    },
    /**
     * Play audio
     */
    play: function () {
      this.audio.play();
    },
    /**
     * Pause audio
     */
    pause: function () {
      this.audio.pause();
    },
    /**
     * Get / Set audio volume
     * @param {Float} v audio volume to set between 0 - 1.
     * @return {Float} current audio volume
     */
    volume: function (v) {
      if (v !== undefined && !isNaN(parseInt(v, 10))) {
        this.audio.setVolume(v);
        this.vol = v;
      } else {
        return this.vol;
      }
    },
    /**
     * Seek audio to position
     * @param {Float} position audio position in seconds to seek to.
     */
    seek: function (position) {
      this.position = position;
      this.audio.currentTime = position;
      this.play();
    }
  };

  /**
   * Default settings object
   * @type {Object}
   */
  var settings = {
    /**
     * {String} path to Flash audio player SWF file
     */
    swf_path: '/swf/audiojs.swf',
    /**
     * {Boolean} flag indicating whether to throw errors to the page or trigger an error event
     */
    throw_errors: true,
    /**
     * {Boolean} flag indicating whether to format player duration and position to hh:mm:ss or pass as raw seconds
     */
    format_time: true,
    /**
     * {Array} list of codecs to try and use when initializing the player. Used to selectively initialize the internal audio player based on codec support
     */
    codecs: ['mp3']
  };

  /**
   * Audio5js Audio Player
   * @param {Object} s player settings object
   * @constructor
   */
  Audio5js = function (s) {
    include(Audio5js, Pubsub);
    include(Audio5js, AudioAttributes);
    s = s || {};
    var k;
    for (k in settings) {
      if (settings.hasOwnProperty(k) && !s.hasOwnProperty(k)) {
        s[k] = settings[k];
      }
    }
    this.init(s);
  };

  /**
   * Global object holding flash-based player instances.
   * Used to create a bridge between Flash's ExternalInterface calls and FlashAudioPlayer instances
   * @type {Object}
   */
  Audio5js.flash = {
    instances: { }, /** FlashAudioPlayer instance hash */
    count: 0 /** FlashAudioPlayer instance count */
  };

  /**
   * Check if browser can play a given audio mime type.
   * @param {String} mime_type audio mime type to check.
   * @return {Boolean} is audio mime type supported by browser or not
   */
  Audio5js.can_play = function (mime_type) {
    return util.can_play(mime_type);
  };

  Audio5js.prototype = {
    /**
     * Initialize player instance.
     * @param {Object} s player settings object
     */
    init: function (s) {
      this.settings = s;
      this.audio = this.getPlayer();
      this.bindAudioEvents();
      if (this.settings.use_flash) {
        this.audio.init(s.swf_path);
      } else {
        this.audio.init();
      }
    },
    /**
     * Gets a new audio player instance based on codec support as defined in settings.codecs array.
     * Defaults to MP3 player either HTML or Flash based.
     * @return {FlashAudioPlayer,HTML5AudioPlayer} audio player instance
     */
    getPlayer: function () {
      var i, l, player;
      for (i = 0, l = this.settings.codecs.length; i < l; i++) {
        var codec = this.settings.codecs[i];
        if (Audio5js.can_play(codec)) {
          player = new HTML5AudioPlayer();
          this.settings.use_flash = false;
          this.settings.player = {
            engine: 'html',
            codec: codec
          };
          break;
        }
      }
      if (player === undefined) {
        // here we double check for mp3 support instead of defaulting to Flash in case user overrode the settings.codecs array with an empty array.
        this.settings.use_flash = !Audio5js.can_play('mp3');
        player = this.settings.use_flash ? new FlashAudioPlayer() : new HTML5AudioPlayer();
        this.settings.player = {
          engine: (this.settings.use_flash ? 'flash' : 'html'),
          codec: 'mp3'
        };
      }
      return player;
    },
    /**
     * Bind events from audio object to internal callbacks
     */
    bindAudioEvents: function () {
      this.audio.on('ready', this.onReady, this);
      this.audio.on('play', this.onPlay, this);
      this.audio.on('pause', this.onPause, this);
      this.audio.on('ended', this.onEnded, this);
      this.audio.on('canplay', this.onCanPlay, this);
      this.audio.on('timeupdate', this.onTimeUpdate, this);
      this.audio.on('progress', this.onProgress, this);
      this.audio.on('error', this.onError, this);
    },
    /**
     * Load audio from URL
     * @param {String} url URL of audio to load
     */
    load: function (url) {
      this.audio.load(url);
      this.trigger('load');
    },
    /**
     * Play audio
     */
    play: function () {
      this.audio.play();
    },
    /**
     * Pause audio
     */
    pause: function () {
      this.audio.pause();
    },
    /**
     * Toggle audio play / pause
     */
    playPause: function () {
      this[this.playing ? 'pause' : 'play']();
    },
    /**
     * Get / Set audio volume
     * @param {Float} v audio volume to set between 0 - 1.
     * @return {Float} current audio volume
     */
    volume: function (v) {
      if (v !== undefined && !isNaN(parseInt(v, 10))) {
        this.audio.volume(v);
        this.vol = v;
      } else {
        return this.vol;
      }
    },
    /**
     * Seek audio to position
     * @param {Float} position audio position in seconds to seek to.
     */
    seek: function (position) {
      this.audio.seek(position);
      this.position = position;
    },
    /**
     * Callback for audio ready event. Indicates audio is ready for playback.
     * Looks for ready callback in settings object and invokes it in the context of player instance
     */
    onReady: function () {
      if (typeof (this.settings.ready) === 'function') {
        this.settings.ready.call(this, this.settings.player);
      }
    },
    /**
     * Audio play event handler
     */
    onPlay: function () {
      this.playing = true;
      this.trigger('play');
    },
    /**
     * Audio pause event handler
     */
    onPause: function () {
      this.playing = false;
      this.trigger('pause');
    },
    /**
     * Playback end event handler
     */
    onEnded: function () {
      this.playing = false;
      this.trigger('ended');
    },
    /**
     * Audio error event handler
     */
    onError: function () {
      var error = new AudioError('Audio Error. Failed to Load Audio');
      if (this.settings.throw_errors) {
        throw error;
      } else {
        this.trigger('error', error);
      }
    },
    /**
     * Audio canplay event handler. Triggered when enough audio has been loaded to by played.
     */
    onCanPlay: function () {
      this.trigger('canplay');
    },
    /**
     * Playback time update event handler
     * @param {Float} position play head position (sec)
     * @param {Float} duration audio duration (sec)
     */
    onTimeUpdate: function (position, duration) {
      this.position = this.settings.format_time ? util.formatTime(position) : position;
      if (this.duration !== duration) {
        this.duration = this.settings.format_time && duration !== null ? util.formatTime(duration) : duration;
      }
      this.trigger('timeupdate', this.position, this.duration);
    },
    /**
     * Audio download progress event handler
     * @param {Float} loaded audio download percent
     */
    onProgress: function (loaded) {
      this.load_percent = loaded;
      this.trigger('progress', loaded);
    }
  };

  return Audio5js;

}));
