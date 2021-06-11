(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Amplitude", [], factory);
	else if(typeof exports === 'object')
		exports["Amplitude"] = factory();
	else
		root["Amplitude"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _package = __webpack_require__(59);

module.exports = {
  version: _package.version,

  audio: new Audio(),

  active_metadata: {},

  active_album: "",

  active_index: 0,

  active_playlist: null,

  playback_speed: 1.0,

  callbacks: {},

  songs: [],

  playlists: {},

  start_song: "",

  starting_playlist: "",

  starting_playlist_song: "",

  repeat: false,

  repeat_song: false,

  shuffle_list: {},

  shuffle_on: false,

  default_album_art: "",

  default_playlist_art: "",

  debug: false,

  volume: 0.5,

  pre_mute_volume: 0.5,

  volume_increment: 5,

  volume_decrement: 5,

  soundcloud_client: "",

  soundcloud_use_art: false,

  soundcloud_song_count: 0,

  soundcloud_songs_ready: 0,

  is_touch_moving: false,

  buffered: 0,

  bindings: {},

  continue_next: true,

  delay: 0,

  player_state: "stopped",

  web_audio_api_available: false,

  context: null,

  source: null,

  analyser: null,

  visualizations: {
    available: [],

    active: [],

    backup: ""
  },

  waveforms: {
    sample_rate: 100,

    built: []
  }
}; /**
    * These variables make Amplitude run. The config is the most important
    * containing active settings and parameters.
    *
    * The config JSON is the global settings for ALL of Amplitude functions.
    * This is global and contains all of the user preferences. The default
    * settings are set, and the user overwrites them when they initialize
    * Amplitude.
    *
    * @module config
    * @type {object}
    * @property {string}  	config.version          				- The current version of AmplitudeJS.
    * @property {object} 	config.audio 		 								-	Handles all of the audio.
    * @property {object} 	config.active_metadata					- Contains the active metadata for the song.
    * @property {string} 	config.active_album							- Holds the active album name. Used to check and see if the album changed and run the album changed callback.
    * @property {number} 	config.active_index							- Contains the index of the actively playing song.
    * @property {string} 	config.active_playlist					- Contains the key to the active playlist index.
    * @property {number} 	config.playback_speed						- Sets the initial playback speed of the song. The values for this can be 1.0, 1.5, 2.0
    * @property {object} 	config.callbacks								- The user can pass a JSON object with a key => value store of callbacks to be run at certain events.
    * @property {array} 		config.songs										- Contains all of the songs the user has passed to Amplitude to use.
    * @property {object} 	config.playlists								- Contains all of the playlists the user created.
    * @property {object} 	config.start_song 							- The index of the song that AmplitudeJS should start with.
    * @property {string} 	config.starting_playlist 				- The starting playlist the player will intiialize to.
    * @property {string} 	config.starting_playlist_song 	- The index of the song in the playlist that should be started.
    * @property {boolean} 	config.repeat 									- When repeat is on, when the song ends the song will replay itself.
    * @property {object} 	config.shuffle_list							- When shuffled, gets populated with the songs the user provided in a random order.
    * @property {boolean} 	config.shuffle_on								- When on, gets set to true so when traversing through songs, AmplitudeJS knows whether or not to use the songs object or the shuffle_list
    * @property {string}		config.default_album_art 				- The user can set default album art to be displayed if the song they set doesn't contain album art.
    * @property {string} 	config.default_playlist_art 		- The user can set default playlist art to be displayed if the playlist they are setting meta data for doesn't contain an art picture.
    * @property {boolean} 	config.debug										- When set to true, AmplitudeJS will print to the console any errors providing helpful feedback to the user.
    * @property {number} 	config.volume 									- The user can set the initial volume to a number between 0 and 1 over-riding the default of .5
    * @property {number} 	config.pre_mute_volume 					- This is set on mute so that when a user un-mutes AmplitudeJS knows what to restore the volume to.
    * @property {number}		config.volume_increment 				- The default values are an integer between 1 and 100 for how much the volume should increase when the user presses the volume up button.
    * @property {number}		config.volume_decrement 				- The default values are an integer between 1 and 100 for how much the volume should decrease when the user presses the volume down button.
    * @property {string} 	config.soundcloud_client 				- When using SoundCloud, the user will have to provide their API Client ID
    * @property {boolean} 	config.soundcloud_use_art 			- The user can set this to true and AmplitudeJS will use the album art for the song returned from the Soundcloud API
    * @property {number} 	config.soundcloud_song_count 		- Used on config to count how many songs are from Soundcloud and compare it to how many are ready for when to move to the rest of the configuration
    * @property {number} 	config.soundcloud_songs_ready 	- Used on config to count how many songs are ready so when we get all of the data from the SoundCloud API that we need this should match the SoundCloud song count meaning we can move to the rest of the config.
    * @property {integer}	config.is_touch_moving 					- Flag for if the user is moving the screen.
    * @property {boolean}	config.buffered									- How much of the song is buffered.
    * @property {object} 	config.bindings									- Array of bindings to certain key events.
    * @property {boolean} 	config.continue_next 						- Determines when a song ends, we should continue to the next song.
    * @property {number}   config.delay 										- Sets the delay between songs in MS.
    * @property {boolean}  config.use_web_audio_api 				- Flag that determines if the user wants to use Web Audio API Components.
    * @property {boolean}  config.web_audio_api_available  - Flag that determines if the Web Audio API is available.
    * @property {object}  	config.context 									- Web Audio API Context
    * @property {object}		config.source 									- Web Audio API Source
    * @property {object} 	config.analyser 								- Web Audio API Analyser
    * @property {string}		config.player_state 						- The current state of the player.
    */

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

var _metaDataElements = __webpack_require__(7);

var _metaDataElements2 = _interopRequireDefault(_metaDataElements);

var _callbacks = __webpack_require__(9);

var _callbacks2 = _interopRequireDefault(_callbacks);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

var _visualizations = __webpack_require__(16);

var _visualizations2 = _interopRequireDefault(_visualizations);

var _configState = __webpack_require__(6);

var _configState2 = _interopRequireDefault(_configState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Interacts directly with native functions of the Audio element. Logic
 * leading up to these methods are handled by click handlers which call
 * helpers and visual synchronizers. These are the core functions of AmplitudeJS.
 * Every other function that leads to these prepare the information to be
 * acted upon by these functions.
 *
 * @module core/Core
 */


/**
 * Import the Visualizations from the FX module.
 * @module fx/visualizations
 */


/**
 * Imports AmplitudeJS Callback Utility
 * @module utilities/callbacks
 */


/**
 * Imports the Play/Pause Visual Elements module.
 * @module visual/playPauseElements
 */


/**
 * Imports the Checks module.
 * @module utilities/checks
 */
var Core = function () {
  /**
   * Plays the active song. If the current song is live, it reconnects
   * the stream before playing.
   *
   * Public Accessor: Amplitude.play()
   *
   * @access public
   */
  function play() {
    _visualizations2.default.stop();
    _visualizations2.default.run();

    /*
    If the audio is live we re-conenct the stream.
    */
    if (_config2.default.active_metadata.live) {
      reconnectStream();
    }

    /*
    Mobile remote sources need to be reconnected on play. I think this is
    because mobile browsers are optimized not to load all resources
    for speed reasons. We only do this if mobile and the paused button
    is not clicked. If the pause button was clicked then we don't reconnect
    or the user will lose their place in the stream.
    */
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && !_config2.default.paused) {
      reconnectStream();
    }

    /*
    Play the song and set the playback rate to the playback
    speed.
    */
    var playPromise = _config2.default.audio.play();

    if (playPromise !== undefined) {
      playPromise.then(function (_) {}).catch(function (error) {});
    }
    _config2.default.audio.play();
    _config2.default.audio.playbackRate = _config2.default.playback_speed;

    /*
      Sets the state of the player.
    */
    _configState2.default.setPlayerState();
  }

  /**
   * Pauses the active song. If it's live, it disconnects the stream.
   *
   * Public Accessor: Amplitude.pause()
   *
   * @access public
   */
  function pause() {
    _visualizations2.default.stop();

    /*
    Pause the active song.
    */
    _config2.default.audio.pause();

    /*
    Flag that pause button was clicked.
    */
    _config2.default.paused = true;

    /*
    If the song is live, we disconnect the stream so we aren't
    saving it to memory.
    */
    if (_config2.default.active_metadata.live) {
      disconnectStream();
    }

    /*
      Sets the state of the player.
    */
    _configState2.default.setPlayerState();
  }

  /**
   * Stops the active song by setting the current song time to 0.
   * When the user resumes, it will be from the beginning.
   * If it's a live stream it disconnects.
   *
   * Public Accessor: Amplitude.stop()
   *
   * @access public
   */
  function stop() {
    _visualizations2.default.stop();

    /*
    Set the current time of the song to 0 which will reset the song.
    */
    if (_config2.default.audio.currentTime != 0) {
      _config2.default.audio.currentTime = 0;
    }

    /*
    Run pause so the song will stop
    */
    _config2.default.audio.pause();

    /*
    If the song is live, disconnect the stream.
    */
    if (_config2.default.active_metadata.live) {
      disconnectStream();
    }

    /*
      Sets the state of the player.
    */
    _configState2.default.setPlayerState();

    /*
    Run the stop callback
    */
    _callbacks2.default.run("stop");
  }

  /**
   * Sets the song volume.
   *
   * Public Accessor: Amplitude.setVolume( volumeLevel )
   *
   * @access public
   * @param {number} volumeLevel - A number between 1 and 100 as a percentage of
   * min to max for a volume level.
   */
  function setVolume(volumeLevel) {
    /*
    If the volume is set to mute somewhere else, we sync the display.
    */
    if (volumeLevel == 0) {
      _config2.default.audio.muted = true;
    } else {
      _config2.default.audio.muted = false;
    }

    /*
    Sets the volume in the config so we can reference it later on.
    */
    _config2.default.volume = volumeLevel;

    /*
    Set the volume of the active song.
    */
    _config2.default.audio.volume = volumeLevel / 100;
  }

  /**
   * Sets the song percentage. If it's a live song, we ignore this because
   * we can't skip ahead. This is an issue if you have a playlist with
   * a live source.
   *
   * Public Accessor: Amplitude.setSongLocation( songPercentage )
   *
   * @access public
   * @param {number} songPercentage - A number between 1 and 100 as a percentage of song completion.
   */
  function setSongLocation(songPercentage) {
    /*
    As long as the song is not live, we can set the current time of the
    song to the percentage the user passed in.
    */
    if (!_config2.default.active_metadata.live) {
      _config2.default.audio.currentTime = _config2.default.audio.duration * (songPercentage / 100);
    }
  }

  /**
   * Skips to a location in a song
   *
   * Public Accessor: Amplitude.skipToLocation( seconds )
   *
   * @access public
   * @param {number} seconds - An integer containing the seconds to skip to
   */
  function skipToLocation(seconds) {
    /*
    When the active song can be played through, we can check to
    see if the seconds will work. We only bind the event handler
    once and remove it once it's fired.
    */
    _config2.default.audio.addEventListener("canplaythrough", function () {
      /*
      If the active song duration is greater than or equal to the
      amount of seconds the user wants to skip to and the seconds
      is greater than 0, we skip to the seconds defined.
      */
      if (_config2.default.audio.duration >= seconds && seconds > 0) {
        _config2.default.audio.currentTime = seconds;
      } else {
        _debug2.default.writeMessage("Amplitude can't skip to a location greater than the duration of the audio or less than 0");
      }
    }, { once: true });
  }

  /**
   * Disconnects the live stream
   *
   * Public Accessor: Amplitude.disconnectStream()
   *
   * @access public
   */
  function disconnectStream() {
    _config2.default.audio.src = "";
    _config2.default.audio.load();
  }

  /**
   * Reconnects the live stream
   *
   * Public Accessor: Amplitude.reconnectStream()
   *
   * @access public\
   */
  function reconnectStream() {
    _config2.default.audio.src = _config2.default.active_metadata.url;
    _config2.default.audio.load();
  }

  /**
   * Sets the playback speed for the song.
   *
   * @param {number} playbackSpeed The speed we want the song to play back at.
   */
  function setPlaybackSpeed(playbackSpeed) {
    /*
    Set the config playback speed.
    */
    _config2.default.playback_speed = playbackSpeed;

    /*
    Set the active song playback rate.
    */
    _config2.default.audio.playbackRate = _config2.default.playback_speed;
  }

  /*
  Return publically facing functions
  */
  return {
    play: play,
    pause: pause,
    stop: stop,
    setVolume: setVolume,
    setSongLocation: setSongLocation,
    skipToLocation: skipToLocation,
    disconnectStream: disconnectStream,
    reconnectStream: reconnectStream,
    setPlaybackSpeed: setPlaybackSpeed
  };
}();

/**
 * Import the Config State module.
 * @module utilities/configState
 */


/**
 * Imports AmplitudeJS Debug Utility
 * @module utilities/debug
 */


/**
 * Imports the Meta Data Visual Elements module.
 * @module visual/metaDataElements
 */


/**
 * Imports the Audio Navigation module.
 * @module utilities/audioNavigation
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = Core;
module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Defines the visual representation of AmplitudeJS play pause elements.
 * @module visual/PlayPauseElements
 */
var PlayPauseElements = function () {
  /**
   * Syncs all play pause elements.
   *
   * @access public
   */
  function sync() {
    syncGlobal();
    syncPlaylist();
    syncSong();
    syncSongInPlaylist();
  }

  /**
   * Syncs the global play pause buttons to the state of the active song.
   *
   * @access public
   */
  function syncGlobal() {
    /*
      Get the active song state.
    */
    var state = _config2.default.audio.paused ? "paused" : "playing";

    /*
      Get all play pause buttons.
    */
    var playPauseElements = document.querySelectorAll(".amplitude-play-pause");

    /*
      Iterate over all of the play pause elements syncing the
      display visually.
    */
    for (var i = 0; i < playPauseElements.length; i++) {
      /*
        Grab the playlist and song attributes from the element.
      */
      var playlist = playPauseElements[i].getAttribute("data-amplitude-playlist");
      var song = playPauseElements[i].getAttribute("data-amplitude-song-index");

      /*
        This method is responsible for only the global elements,
        so we make sure there are no playlist or songs defined on
        the element.
      */
      if (playlist == null && song == null) {
        /*
          Determines what classes we should add and remove
          from the elements.
        */
        switch (state) {
          case "playing":
            setElementPlay(playPauseElements[i]);
            break;
          case "paused":
            setElementPause(playPauseElements[i]);
            break;
        }
      }
    }
  }

  /**
   * Syncs the main playlist play pause buttons to the state of the active song.
   *
   * @access public
   */
  function syncPlaylist() {
    var state = _config2.default.audio.paused ? "paused" : "playing";

    /*
      Get all of the main playlist play pause elements
    */
    var playlistPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
      Iterate over the play pause elements, syncing the state accordingly.
    */
    for (var i = 0; i < playlistPlayPauseElements.length; i++) {
      /*
        Grab the song attributes from the element.
      */
      var song = playlistPlayPauseElements[i].getAttribute("data-amplitude-song-index");

      /*
        We want only the play pause elements for the main on a
        playlist nothing else. We have another method for the
        song in playlist play pause method.
      */
      if (song == null) {
        /*
          Determines what classes we should add and remove
          from the elements.
        */
        switch (state) {
          case "playing":
            setElementPlay(playlistPlayPauseElements[i]);
            break;
          case "paused":
            setElementPause(playlistPlayPauseElements[i]);
            break;
        }
      }
    }
  }

  /**
   * Syncs the song play pause buttons to the state of the active song.
   *
   * @access public
   */
  function syncSong() {
    var state = _config2.default.audio.paused ? "paused" : "playing";

    /*
      Get all of the individual song play pause buttons. These have an
      amplitude-song-index that matches the active index attribute.
    */
    var songPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[data-amplitude-song-index="' + _config2.default.active_index + '"]');

    /*
      Iterate over all of the song play pause elements
    */
    for (var i = 0; i < songPlayPauseElements.length; i++) {
      /*
        Grab the playlist attributes from the element.
      */
      var playlist = songPlayPauseElements[i].getAttribute("data-amplitude-playlist");

      /*
        We want only the song play pause buttons, not ones scoped in a playlist.
      */
      if (playlist == null) {
        /*
          Determines what classes we should add and remove
          from the elements.
        */
        switch (state) {
          case "playing":
            setElementPlay(songPlayPauseElements[i]);
            break;
          case "paused":
            setElementPause(songPlayPauseElements[i]);
            break;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist play pause buttons to the state of
   * the active song.
   *
   * @access public
   */
  function syncSongInPlaylist() {
    var state = _config2.default.audio.paused ? "paused" : "playing";

    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    /*
      Get all of the individual song play pause buttons. These have an
      amplitude-song-index attribute. Some have amplitude-playlist which
      means they are individual songs within a playlist.
    */
    var songInPlaylistPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[data-amplitude-song-index="' + activePlaylistIndex + '"][data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
      Iterate over all of the individual play pause elements for songs inspect
      a playlist.
    */
    for (var i = 0; i < songInPlaylistPlayPauseElements.length; i++) {
      /*
        Determines what classes we should add and remove
        from the elements.
      */
      switch (state) {
        case "playing":
          setElementPlay(songInPlaylistPlayPauseElements[i]);
          break;
        case "paused":
          setElementPause(songInPlaylistPlayPauseElements[i]);
          break;
      }
    }
  }

  /**
   * Sets all of the play pause buttons to paused.
   *
   * @access public
   */
  function syncToPause() {
    /*
      Gets all of the play pause elements
    */
    var playPauseElements = document.querySelectorAll(".amplitude-play-pause");

    /*
      Sets all of the elements to pause
    */
    for (var i = 0; i < playPauseElements.length; i++) {
      setElementPause(playPauseElements[i]);
    }
  }

  /**
   * Sets an element to be playing by removing the 'amplitude-paused' class
   * and adding the 'amplitude-playing' class
   *
   * @access public
   * @param {element} element 	- The element getting the playing class added.
   */
  function setElementPlay(element) {
    element.classList.add("amplitude-playing");
    element.classList.remove("amplitude-paused");
  }

  /**
   * Sets an element to be paused by adding the 'amplitude-paused' class
   * and removing the 'amplitude-playing' class
   *
   * @access public
   * @param {element} element 	- The element getting the paused class added.
   */
  function setElementPause(element) {
    element.classList.remove("amplitude-playing");
    element.classList.add("amplitude-paused");
  }

  /**
   * Returns the public facing methods
   */
  return {
    sync: sync,
    syncGlobal: syncGlobal,
    syncPlaylist: syncPlaylist,
    syncSong: syncSong,
    syncSongInPlaylist: syncSongInPlaylist,
    syncToPause: syncToPause
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = PlayPauseElements;
module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _callbacks = __webpack_require__(9);

var _callbacks2 = _interopRequireDefault(_callbacks);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

var _songSliderElements = __webpack_require__(14);

var _songSliderElements2 = _interopRequireDefault(_songSliderElements);

var _songPlayedProgressElements = __webpack_require__(20);

var _songPlayedProgressElements2 = _interopRequireDefault(_songPlayedProgressElements);

var _timeElements = __webpack_require__(15);

var _timeElements2 = _interopRequireDefault(_timeElements);

var _metaDataElements = __webpack_require__(7);

var _metaDataElements2 = _interopRequireDefault(_metaDataElements);

var _containerElements = __webpack_require__(49);

var _containerElements2 = _interopRequireDefault(_containerElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Audio Navigation Utility.
 *
 * @module utilities/AudioNavigation
 */


/**
 * Meta Data Elements Module
 *
 * @module visual/MetaDataElements
 */


/**
 * Imports the Song Played Progress Elements Module
 *
 * @module visual/SongPlayedProgressElements
 */


/**
 * Imports the Play Pause Elements Module
 *
 * @module visual/PlayPauseElements
 */


/**
 * Imports the Callbacks Module
 *
 * @module utilities/Callbacks
 */
/**
 * Imports the config module
 * @module config
 */
var AudioNavigation = function () {
  /**
   * Sets the next song
   *
   * @access public
   * @param {boolean} [songEnded=false] If the song ended, this is set to true
   * so we take into effect the repeat setting.
   */
  function setNext() {
    var songEnded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    /*
      Initializes the next index variable. This will be the
      index of the song that is next.
    */
    var nextIndex = null;
    var nextSong = {};

    /*
      Ensure we don't loop in the playlist if config.repeat is not true
    */
    var endOfList = false;

    /*
      Determines if we are repeating the song or not. If we are repeating,
      the next song will be the same song index.
    */
    if (_config2.default.repeat_song) {
      /*
        If the playlist is shuffled, get the now playing index.
      */
      if (_config2.default.shuffle_on) {
        nextIndex = _config2.default.shuffle_list[_config2.default.active_index].index;
        nextSong = _config2.default.shuffle_list[nextIndex];
      } else {
        nextIndex = _config2.default.active_index;
        nextSong = _config2.default.songs[nextIndex];
      }
    } else {
      /*
        If the shuffle is on, we use the shuffled list of
        songs to determine our next song.
      */
      if (_config2.default.shuffle_on) {
        /*
          If the active shuffle index + 1 is less than the length, then
          we use the next shuffle otherwise we go to the beginning
          of the shuffle list.
        */
        if (parseInt(_config2.default.active_index) + 1 < _config2.default.shuffle_list.length) {
          /*
            Set the next index to be the index of the song in the shuffle list.
          */
          nextIndex = parseInt(_config2.default.active_index) + 1;
        } else {
          nextIndex = 0;
          endOfList = true;
        }

        nextSong = _config2.default.shuffle_list[nextIndex];
      } else {
        /*
          If the active index + 1 is less than the length of the songs, then
          we use the next song otherwise we go to the beginning of the
          song list.
        */
        if (parseInt(_config2.default.active_index) + 1 < _config2.default.songs.length) {
          nextIndex = parseInt(_config2.default.active_index) + 1;
        } else {
          nextIndex = 0;
          endOfList = true;
        }

        /*
          Sets the next index.
        */
        nextSong = _config2.default.songs[nextIndex];
      }
    }

    /*
      Change the song after the next button has been pressed.
    */
    changeSong(nextSong, nextIndex);

    /*
    	If it's the end of the list and repeat is not on, do nothing.
    */
    if (endOfList && !_config2.default.repeat) {} else {
      /*
      If the song has ended and repeat is on, play the song.
      */
      if (!(songEnded && !_config2.default.repeat && endOfList)) {
        _core2.default.play();
      }
    }

    /*
      Sync the play pause elements and run the
      after next callback.
    */
    _playPauseElements2.default.sync();
    _callbacks2.default.run("next");

    /*
      If we repeated the song, run the repeat song callback.
    */
    if (_config2.default.repeat_song) {
      _callbacks2.default.run("song_repeated");
    }
  }

  /**
   * Sets the next song in a playlist
   *
   * @param {string} playlist - The playlist being shuffled
   * @param {boolean} [songEnded=false] - If the song ended, this is set to true
   * so we take into effect the repeat setting.
   */
  function setNextPlaylist(playlist) {
    var songEnded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    /*
      Initializes the next index
    */
    var nextIndex = null;
    var nextSong = {};

    /*
      Ensure we don't loop in the playlist if config.repeat is not true
    */
    var endOfList = false;

    /*
      If we are repeating the song, then we just start the song over.
    */
    if (_config2.default.repeat_song) {
      /*
        If the playlist is shuffled, get the now playing index.
      */
      if (_config2.default.playlists[playlist].shuffle) {
        nextIndex = _config2.default.playlists[playlist].active_index;
        nextSong = _config2.default.playlists[playlist].shuffle_list[nextIndex];
      } else {
        nextIndex = _config2.default.playlists[playlist].active_index;
        nextSong = _config2.default.playlists[playlist].songs[nextIndex];
      }
    } else {
      /*
        If the playlist is shuffled we get the next index of the playlist.
      */
      if (_config2.default.playlists[playlist].shuffle) {
        /*
          If the active shuffle index + 1 is less than the length of the shuffle list,
          then we use the next shuffle otherwise we go to the beginning of the shuffle list.
        */
        if (parseInt(_config2.default.playlists[playlist].active_index) + 1 < _config2.default.playlists[playlist].shuffle_list.length) {
          /*
            Set the next index to be the index of the song in the shuffle list.
          */
          nextIndex = _config2.default.playlists[playlist].active_index + 1;
        } else {
          nextIndex = 0;
          endOfList = true;
        }

        nextSong = _config2.default.playlists[playlist].shuffle_list[nextIndex];
      } else {
        /*
          If the active index +1 is less than the length of the songs in the playlist,
          then we use the next song otherwise we go to the beginning of the playlist.
        */
        if (parseInt(_config2.default.playlists[playlist].active_index) + 1 < _config2.default.playlists[playlist].songs.length) {
          nextIndex = parseInt(_config2.default.playlists[playlist].active_index) + 1;
        } else {
          nextIndex = 0;
          endOfList = true;
        }

        /*
          Sets the next song.
        */
        nextSong = _config2.default.playlists[playlist].songs[nextIndex];
      }
    }

    /*
      Sets the active playlist to the playlist we are on.
    */
    setActivePlaylist(playlist);

    /*
      Change the song within the playlist.
    */
    changeSongPlaylist(playlist, nextSong, nextIndex);

    /*
      If it's the end of the playlist and we aren't repeating, do nothing.
    */
    if (endOfList && !_config2.default.repeat) {} else {
      if (!(songEnded && !_config2.default.repeat && endOfList)) {
        _core2.default.play();
      }
    }

    /*
      Sync the play pause buttons.
    */
    _playPauseElements2.default.sync();
    _callbacks2.default.run("next");

    /*
      Repeat the song.
    */
    if (_config2.default.repeat_song) {
      _callbacks2.default.run("song_repeated");
    }
  }

  /**
   * Sets the previous song on the global songs array.
   *
   * @access private
   */
  function setPrevious() {
    /*
      Initializes the previous index
    */
    var previousIndex = null;
    var previousSong = {};

    /*
      If we are repeating the song, then we just start the song over.
    */
    if (_config2.default.repeat_song) {
      /*
        If the config is shuffled, get the now playing index.
      */
      if (_config2.default.shuffle_on) {
        previousIndex = _config2.default.active_index;
        previousSong = _config2.default.shuffle_list[previousIndex];
      } else {
        previousIndex = _config2.default.active_index;
        previousSong = _config2.default.songs[previousIndex];
      }
    } else {
      /*
        Get the previous index. If the previous index will be less than 0, get the
        last song of the array and continue.
      */
      if (parseInt(_config2.default.active_index) - 1 >= 0) {
        previousIndex = parseInt(_config2.default.active_index - 1);
      } else {
        previousIndex = parseInt(_config2.default.songs.length - 1);
      }

      /*
        If the config is shuffled, we grab the song from the shuffle list
      */
      if (_config2.default.shuffle_on) {
        /*
          Grab song from the shuffle list
        */
        previousSong = _config2.default.shuffle_list[previousIndex];
      } else {
        /*
          Grab song from the songs array
        */
        previousSong = _config2.default.songs[previousIndex];
      }
    }
    /*
      Change the song after the next button has been pressed.
    */
    changeSong(previousSong, previousIndex);

    /*
      Play the newest song.
    */
    _core2.default.play();

    /*
      Sync the play pause elements and run the
      after next callback.
    */
    _playPauseElements2.default.sync();
    _callbacks2.default.run("prev");

    /*
      If we repeated the song, run the repeat song callback.
    */
    if (_config2.default.repeat_song) {
      _callbacks2.default.run("song_repeated");
    }
  }

  /**
   * Sets the previous playlist song.
   *
   * @access private
   *
   * @prop {string} playlist  - The playlist we are navigating in.
   */
  function setPreviousPlaylist(playlist) {
    /*
      Initializes the previous index
    */
    var previousIndex = null;
    var previousSong = {};

    /*
      If we are repeating the song, then we just start the song over.
    */
    if (_config2.default.repeat_song) {
      /*
        If the playlist is shuffled, get the now playing index.
      */
      if (_config2.default.playlists[playlist].shuffle) {
        previousIndex = _config2.default.playlists[playlist].active_index;
        previousSong = _config2.default.playlists[playlist].shuffle_list[previousIndex];
      } else {
        previousIndex = _config2.default.playlists[playlist].active_index;
        previousSong = _config2.default.playlists[playlist].songs[previousIndex];
      }
    } else {
      /*
        Get the previous index. If the previous index will be less than 0, get the
        last song of the array and continue.
      */
      if (parseInt(_config2.default.playlists[playlist].active_index) - 1 >= 0) {
        previousIndex = parseInt(_config2.default.playlists[playlist].active_index - 1);
      } else {
        previousIndex = parseInt(_config2.default.playlists[playlist].songs.length - 1);
      }

      /*
        If the playlist is shuffled, we grab the song from the shuffle list
      */
      if (_config2.default.playlists[playlist].shuffle) {
        /*
          Grab song from the shuffle list
        */
        previousSong = _config2.default.playlists[playlist].shuffle_list[previousIndex];
      } else {
        /*
          Grab song from the songs array
        */
        previousSong = _config2.default.playlists[playlist].songs[previousIndex];
      }
    }

    /*
      Sets the active playlist to the playlist we are on.
    */
    setActivePlaylist(playlist);

    /*
      Change the song within the playlist.
    */
    changeSongPlaylist(playlist, previousSong, previousIndex);

    /*
      Plays the song
    */
    _core2.default.play();

    /*
      Sync the play pause buttons.
    */
    _playPauseElements2.default.sync();
    _callbacks2.default.run("prev");

    /*
      Repeat the song.
    */
    if (_config2.default.repeat_song) {
      _callbacks2.default.run("song_repeated");
    }
  }

  /**
   * Change song in the songs array.
   *
   * @access private
   * @prop {object} song  - The song we are changing to.
   * @prop {number} index - The index we are changing to.
   * @prop {boolean} direct - Determines if it was a direct click on the song.
   * We then don't care if shuffle is on or not.
   */
  function changeSong(song, index) {
    var direct = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    /*
      Prepare the song change.
    */
    prepareSongChange(song);

    /*
      Change the song.
    */
    _config2.default.audio.src = song.url;
    _config2.default.active_metadata = song;
    _config2.default.active_album = song.album;

    _config2.default.active_index = parseInt(index);

    /*
      Set new information now that the song has changed.
    */
    afterSongChange(direct);
  }

  /**
   * Handles a song change in the playlist
   *
   * @access private
   * @prop {string} playlist - The playlist we are changing the song on.
   * @prop {object} song     - The song we are changing to in the playlist.
   * @prop {number} index    - The inded of the song we are changing to in the playlist.
   * @prop {boolean} direct  - Determines if it was a direct click on the song. We
   * then don't care if shuffle is on or not
   */
  function changeSongPlaylist(playlist, song, index) {
    var direct = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    /*
      Prepare the song change.
    */
    prepareSongChange(song);

    /*
      Change the song.
    */
    _config2.default.audio.src = song.url;
    _config2.default.active_metadata = song;
    _config2.default.active_album = song.album;
    _config2.default.active_index = null;

    _config2.default.playlists[playlist].active_index = parseInt(index);

    /*
      Set new information now that the song has changed.
    */
    afterSongChange(direct);
  }

  /**
   *  Prepares a song change
   *
   * @access private
   * @prop {object} song  - The song we change to.
   */
  function prepareSongChange(song) {
    /*
      Stop the current song.
    */
    _core2.default.stop();

    /*
      Sync all of the elements to a stopped song.
    */
    _playPauseElements2.default.syncToPause();
    _songSliderElements2.default.resetElements();
    _songPlayedProgressElements2.default.resetElements();
    _timeElements2.default.resetCurrentTimes();

    /*
      If an album changes, fire an album change.
    */
    if (_checks2.default.newAlbum(song)) {
      _callbacks2.default.run("album_change");
    }
  }

  /**
   * Updates data on the display after a song has changed.
   *
   * @prop {boolean} direct - Determines if it was a direct click on the song.
   * We then don't care if shuffle is on or not.
   *
   * @access private
   */
  function afterSongChange(direct) {
    _metaDataElements2.default.displayMetaData();
    _containerElements2.default.setActive(direct);
    _timeElements2.default.resetDurationTimes();

    /*
      Run the song change callback.
    */
    _callbacks2.default.run("song_change");
  }

  /**
   * Sets the active playlist
   *
   * @access public
   * @param {string} playlist - The string of the playlist being set to active.
   */
  function setActivePlaylist(playlist) {
    /*
      If the active playlist is different than the playlist being set,
      we run the `playlist_changed` callback.
    */
    if (_config2.default.active_playlist != playlist) {
      _callbacks2.default.run("playlist_changed");
      /*
        Set the active playlist to the playlist parameter. Only need to
        set if it's different.
      */
      _config2.default.active_playlist = playlist;

      if (playlist != null) {
        _config2.default.playlists[playlist].active_index = 0;
      }
    }
  }

  /*
    Return the publically facing methods
  */
  return {
    setNext: setNext,
    setNextPlaylist: setNextPlaylist,
    setPrevious: setPrevious,
    setPreviousPlaylist: setPreviousPlaylist,
    changeSong: changeSong,
    changeSongPlaylist: changeSongPlaylist,
    setActivePlaylist: setActivePlaylist
  };
}();

/**
 * Container Elements Module
 *
 * @module visual/ContainerElements
 */


/**
 * Imports the Time Elements Module
 *
 * @module visual/TimeElements
 */


/**
 * Imports the Song Slider Elements Module
 *
 * @module visual/SongSliderElements
 */


/**
 * Imports the Checks Module
 *
 * @module utilities/Checks
 */


/**
 * Imports the Core Module
 *
 * @module core/Core
 */
exports.default = AudioNavigation;
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the debugging of AmplitudeJS
 * @module utilities/Debug
 */
var Debug = function () {
  /**
   * Writes out debug message to the console if enabled.
   *
   * Public Accessor: Debug.writeMessage( message )
   *
   * @access public
   * @param {string} message - The string that gets printed to alert the user of a debugging error.
   */
  function writeMessage(message) {
    /*
      If the user has flagged AmplitudeJS to debug, we print out a message
      to the console.
    */
    if (_config2.default.debug) {
      console.log(message);
    }
  }

  /*
    Returns the public facing methods
  */
  return {
    writeMessage: writeMessage
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = Debug;
module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Checks Module. Checks for new songs, albums, and playlists
 *
 * @module utilities/Checks
 */
var Checks = function () {
  /**
   * Checks to see if the new song to be played is different than the song
   * that is currently playing. To be true, the user would have selected
   * play on a new song with a new index. To be false, the user would have
   * clicked play/pause on the song that was playing.
   *
   * Public Accessor: Checks.newSong( playlist, songIndex )
   * @access public
   * @param {string} playlist - The playlist we are checking the new song for. Could be null
   * @param {number} songIndex - The index of the new song to be played.
   * @returns {boolean} True if we are setting a new song, false if we are not setting a new song.
   */
  function newSong(playlist, songIndex) {
    /*
      If the playlists don't match, then it's definitely a new song.
    */
    if (_config2.default.active_playlist != playlist) {
      return true;
    } else {
      /*
        If we aren't in a playlist, we check the active index.
      */
      if (_config2.default.active_playlist == null && playlist == null) {
        /*
          If the active indexes don't match, then it's a new song.
        */
        if (_config2.default.active_index != songIndex) {
          return true;
        } else {
          return false;
        }
      } else {
        /*
          If we are in a playlist, then we check to see if the
          new song index matches the active index.
        */
        if (_config2.default.active_playlist == playlist && _config2.default.playlists[playlist].active_index != songIndex) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  /**
   * Checks to see if there is a new album
   *
   * Public Accessor: Checks.newAlbum( album )
   *
   * @access public
   * @param {string} album - Checks to see if the new song will have a new album.
   * @returns {boolean} True if there is a new album, false if there is not a new ablum.
   */
  function newAlbum(album) {
    if (_config2.default.active_album != album) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks to see if there is a new playlist
   *
   * Public Accessor: Checks.newPlaylist( playlist )
   *
   * @access public
   * @param {string} playlist - The playlist passed in to check against the active playlist.
   * @returns {boolean} True if there is a new playlist, false if there is not a new playlist.
   */
  function newPlaylist(playlist) {
    if (_config2.default.active_playlist != playlist) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Determines if the string passed in is a URL or not
   *
   * Public Accessor: AmplitudeHelpers.isURL( url )
   *
   * @access public
   * @param {string} url - The string we are testing to see if it's a URL.
   * @returns {boolean} True if the string is a url, false if it is not.
   */
  function isURL(url) {
    /*
    Test the string against the URL pattern and return if it matches
    */
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    return pattern.test(url);
  }

  /**
   * Determines if what is passed in is an integer or not.
   *
   * Public Accessor: AmplitudeHelpers.isInt( int )
   *
   * @access public
   * @param {string|number} int - The variable we are testing to see is an integer or not.
   * @returns {boolean} If the variable is an integer or not.
   */
  function isInt(int) {
    return !isNaN(int) && parseInt(Number(int)) == int && !isNaN(parseInt(int, 10));
  }

  /**
   * Returns public facing methods
   */
  return {
    newSong: newSong,
    newAlbum: newAlbum,
    newPlaylist: newPlaylist,
    isURL: isURL,
    isInt: isInt
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = Checks;
module.exports = exports["default"];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the state of the config object.
 *
 * @module utilities/ConfigState
 */
var ConfigState = function () {
  /**
   * Resets the config to the default state. This is called on initialize
   * to ensure the user's config is what matters.
   *
   * Public Accessor: AmplitudeHelpers.resetConfig()
   *
   * @access public
   */
  function resetConfig() {
    _config2.default.audio = new Audio();
    _config2.default.active_metadata = {};
    _config2.default.active_album = "";
    _config2.default.active_index = 0;
    _config2.default.active_playlist = null;
    _config2.default.playback_speed = 1.0;
    _config2.default.callbacks = {};
    _config2.default.songs = [];
    _config2.default.playlists = {};
    _config2.default.start_song = "";
    _config2.default.starting_playlist = "";
    _config2.default.starting_playlist_song = "";
    _config2.default.repeat = false;
    _config2.default.shuffle_list = {};
    _config2.default.shuffle_on = false;
    _config2.default.default_album_art = "";
    _config2.default.default_playlist_art = "";
    _config2.default.debug = false;
    _config2.default.volume = 0.5;
    _config2.default.pre_mute_volume = 0.5;
    _config2.default.volume_increment = 5;
    _config2.default.volume_decrement = 5;
    _config2.default.soundcloud_client = "";
    _config2.default.soundcloud_use_art = false;
    _config2.default.soundcloud_song_count = 0;
    _config2.default.soundcloud_songs_ready = 0;
    _config2.default.continue_next = true;
  }

  /**
   * Sets the state of the player.
   */
  function setPlayerState() {
    /*
      If paused and the current time is 0 the player is stopped.
    */
    if (_config2.default.audio.paused && _config2.default.audio.currentTime == 0) {
      _config2.default.player_state = "stopped";
    }

    /*
      If paused and the current time is greater than 0 the player is
      paused.
    */
    if (_config2.default.audio.paused && _config2.default.audio.currentTime > 0) {
      _config2.default.player_state = "paused";
    }

    /*
      If playing, the current state is playing.
    */
    if (!_config2.default.audio.paused) {
      _config2.default.player_state = "playing";
    }
  }

  /*
  Returns the public facing methods
  */
  return {
    resetConfig: resetConfig,
    setPlayerState: setPlayerState
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = ConfigState;
module.exports = exports["default"];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These methods help display the audio's meta data
 *
 * @module visual/MetaDataElements
 */
var MetaDataElements = function () {
  /**
   * Displays the active song's metadata. This is called after a song has
   * been changed. This method takes the active song and displays the
   * metadata. So once the new active song is set, we update all of the
   * screen elements.
   *
   * @access public
   */
  function displayMetaData() {
    /*
    Define the image meta data keys. These are managed separately
    since we aren't actually changing the inner HTML of these elements.
    */
    var imageMetaDataKeys = ["cover_art_url", "station_art_url", "podcast_episode_cover_art_url"];

    /*
    Get all of the song info elements
    */
    var songInfoElements = document.querySelectorAll("[data-amplitude-song-info]");

    /*
    Iterate over all of the song info elements. We will either
    set these to the new values, or clear them if the active song
    doesn't have the info set.
    */
    for (var i = 0; i < songInfoElements.length; i++) {
      /*
      Get the info so we can check if the active meta data has the
      key.
      */
      var info = songInfoElements[i].getAttribute("data-amplitude-song-info");

      /*
      Grab the playlist and song index.
      */
      var playlist = songInfoElements[i].getAttribute("data-amplitude-playlist");
      var songIndex = songInfoElements[i].getAttribute("data-amplitude-song-index");

      /*
      Ensure that we don't set any individual elements now. We set this with the
      sync meta data method. The reason we don't set them here is because
      all individual songs would get the now playing artwork. If the playlists
      match or the element is a main element meaning it doesn't
      belong to a playlist or a song, then we set the song info.
      */
      if (songIndex == null && (_config2.default.active_playlist == playlist || playlist == null && songIndex == null)) {
        /*
        If the active metadata has the key, then we set it,
        otherwise we clear it. If it's an image element then
        we default it to the default info if needed.
        */
        var val = _config2.default.active_metadata[info] != undefined ? _config2.default.active_metadata[info] : null;
        if (imageMetaDataKeys.indexOf(info) >= 0) {
          val = val || _config2.default.default_album_art;
          songInfoElements[i].setAttribute("src", val);
        } else {
          val = val || "";
          songInfoElements[i].innerHTML = val;
        }
      }
    }
  }

  /**
   * Displays the playlist meta data.
   */
  function displayPlaylistMetaData() {
    /*
    Define the image meta data keys. These are managed separately
    since we aren't actually changing the inner HTML of these elements.
    */
    var imageMetaDataKeys = ["image_url"];

    /*
    Get all of the playlist info elements
    */
    var playlistInfoElements = document.querySelectorAll("[data-amplitude-playlist-info]");

    /*
    Iterate over all of the playlist info elements. We will either
    set these to the new values, or clear them if the active song
    doesn't have the info set.
    */
    for (var i = 0; i < playlistInfoElements.length; i++) {
      /*
      Get the info so we can check if the active meta data has the
      key.
      */
      var info = playlistInfoElements[i].getAttribute("data-amplitude-playlist-info");
      var playlist = playlistInfoElements[i].getAttribute("data-amplitude-playlist");

      if (_config2.default.playlists[playlist][info] != undefined) {
        if (imageMetaDataKeys.indexOf(info) >= 0) {
          playlistInfoElements[i].setAttribute("src", _config2.default.playlists[playlist][info]);
        } else {
          playlistInfoElements[i].innerHTML = _config2.default.playlists[playlist][info];
        }
      } else {
        /*
        We look for the default album art because
        the actual key didn't exist. If the default album
        art doesn't exist then we set the src attribute
        to null.
        */
        if (imageMetaDataKeys.indexOf(info) >= 0) {
          if (_config2.default.default_playlist_art != "") {
            playlistInfoElements[i].setAttribute("src", _config2.default.default_playlist_art);
          } else {
            playlistInfoElements[i].setAttribute("src", "");
          }
        } else {
          playlistInfoElements[i].innerHTML = "";
        }
      }
    }
  }

  /**
   * Sets the first song in the playlist. This is used to fill in the meta
   * data in the playlist
   *
   * @param {object} song 			- The song we are setting to be the first song in the playlist
   * @param {string} playlist 	- Key of the playlist we are setting the first song in
   */
  function setFirstSongInPlaylist(song, playlist) {
    /*
      Define the image meta data keys. These are managed separately
      since we aren't actually changing the inner HTML of these elements.
    */
    var imageMetaDataKeys = ["cover_art_url", "station_art_url", "podcast_episode_cover_art_url"];

    /*
      Get all of the song info elements
    */
    var songInfoElements = document.querySelectorAll('[data-amplitude-song-info][data-amplitude-playlist="' + playlist + '"]');

    /*
      Iterate over all of the song info elements. We will either
      set these to the new values, or clear them if the active song
      doesn't have the info set.
    */
    for (var i = 0; i < songInfoElements.length; i++) {
      /*
        Get the info so we can check if the active meta data has the
        key.
      */
      var info = songInfoElements[i].getAttribute("data-amplitude-song-info");

      /*
        Get the song info element playlist.
      */
      var elementPlaylist = songInfoElements[i].getAttribute("data-amplitude-playlist");

      /*
        If the playlists match or the element is a main element, then
        we set the song info.
      */
      if (elementPlaylist == playlist) {
        /*
          If the active metadata has the key, then we set it,
          otherwise we clear it. If it's an image element then
          we default it to the default info if needed.
        */
        if (song[info] != undefined) {
          if (imageMetaDataKeys.indexOf(info) >= 0) {
            songInfoElements[i].setAttribute("src", song[info]);
          } else {
            songInfoElements[i].innerHTML = song[info];
          }
        } else {
          /*
            We look for the default album art because
            the actual key didn't exist. If the default album
            art doesn't exist then we set the src attribute
            to null.
          */
          if (imageMetaDataKeys.indexOf(info) >= 0) {
            if (song.default_album_art != "") {
              songInfoElements[i].setAttribute("src", song.default_album_art);
            } else {
              songInfoElements[i].setAttribute("src", "");
            }
          } else {
            songInfoElements[i].innerHTML = "";
          }
        }
      }
    }
  }

  /**
   * Sets the meta data for songs loaded in the songs array
   */
  function syncMetaData() {
    /*
    Define the image meta data keys. These are managed separately
    since we aren't actually changing the inner HTML of these elements.
    */
    var imageMetaDataKeys = ["cover_art_url", "station_art_url", "podcast_episode_cover_art_url"];

    /*
    Get all of the song info elements
    */
    var songInfoElements = document.querySelectorAll("[data-amplitude-song-info]");

    /*
    Iterate over all of the song info elements. We will either
    set these to the new values, or clear them if the active song
    doesn't have the info set.
    */
    for (var i = 0; i < songInfoElements.length; i++) {
      var songIndex = songInfoElements[i].getAttribute("data-amplitude-song-index");
      var playlist = songInfoElements[i].getAttribute("data-amplitude-playlist");

      if (songIndex != null && playlist == null) {
        var info = songInfoElements[i].getAttribute("data-amplitude-song-info");

        /*
         Get the song info value referenced on the element.  Depending on the type of
         element, we may need to fallback to another value when the direct value
         we want isn't found.
         i.e.
            data-amplitude-song-info="cover_art_url" defaults to using the value
            of "default_album_art" when "cover_art_url" is missing on the song.
        */
        var val = _config2.default.songs[songIndex][info] != undefined ? _config2.default.songs[songIndex][info] : null;
        /*
         If it's an image meta data key, then we set the src attribute of
         the element. Otherwise we set the inner HTML of the element.
        */
        if (imageMetaDataKeys.indexOf(info) >= 0) {
          /*
           If this is an image meta data key and the individual song doesn't
           have the key, use the default_album_art
           */
          val = val || _config2.default.default_album_art;
          songInfoElements[i].setAttribute("src", val);
        } else {
          songInfoElements[i].innerHTML = val;
        }
      }

      /*
        If the song index and playlist are not null, continue.
      */
      if (songIndex != null && playlist != null) {
        /*
          Get the info we are displaying.
        */
        var _info = songInfoElements[i].getAttribute("data-amplitude-song-info");

        /*
          Set the meta data accordingly.
        */
        if (_config2.default.playlists[playlist].songs[songIndex][_info] != undefined) {
          if (imageMetaDataKeys.indexOf(_info) >= 0) {
            songInfoElements[i].setAttribute("src", _config2.default.playlists[playlist].songs[songIndex][_info]);
          } else {
            songInfoElements[i].innerHTML = _config2.default.playlists[playlist].songs[songIndex][_info];
          }
        }
      }
    }

    /*
      Display the playlist meta data.
    */
    displayPlaylistMetaData();
  }

  /**
   * Returns publically facing methods
   */
  return {
    displayMetaData: displayMetaData,
    setFirstSongInPlaylist: setFirstSongInPlaylist,
    syncMetaData: syncMetaData,
    displayPlaylistMetaData: displayPlaylistMetaData
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = MetaDataElements;
module.exports = exports["default"];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the visual syncing to the state of the config for the repeat
 * elements.
 *
 * @module visual/RepeatElements
 */
var RepeatElements = function () {
  /**
   * Syncs repeat for all of the repeat buttons. Users
   * can apply styles to the 'amplitude-repeat-on' and
   * 'amplitude-repeat-off' classes. They represent the state
   * of the player.
   */
  function syncRepeat() {
    /*
    Gets all of the repeat classes
    */
    var repeatClasses = document.getElementsByClassName("amplitude-repeat");

    /*
    Iterate over all of the repeat classes. If repeat is on,
    then add the 'amplitude-repeat-on' class and remove the
    'amplitude-repeat-off' class. If it's off, then do the
    opposite.
    */
    for (var i = 0; i < repeatClasses.length; i++) {
      if (_config2.default.repeat) {
        repeatClasses[i].classList.add("amplitude-repeat-on");
        repeatClasses[i].classList.remove("amplitude-repeat-off");
      } else {
        repeatClasses[i].classList.remove("amplitude-repeat-on");
        repeatClasses[i].classList.add("amplitude-repeat-off");
      }
    }
  }

  /**
   * Syncs repeat for all of the playlist repeat buttons. Users
   * can apply styles to the `amplitude-repeat-on` and `amplitude-repeat-off`
   * classes. They repreent the state of the playlist in the player.
   */
  function syncRepeatPlaylist(playlist) {
    /*
    Gets all of the repeat buttons.
    */
    var repeatButtons = document.getElementsByClassName("amplitude-repeat");

    /*
    Iterate over all of the repeat buttons
    */
    for (var i = 0; i < repeatButtons.length; i++) {
      /*
      Ensure that the repeat button belongs to matches the
      playlist we are syncing the state for.
      */
      if (repeatButtons[i].getAttribute("data-amplitude-playlist") == playlist) {
        /*
        If the state of the playlist is shuffled on, true, then
        we add the 'amplitude-repeat-on' class and remove the
        'amplitude-repeat-off' class. If the player is not shuffled
        then we do the opposite.
        */
        if (_config2.default.playlists[playlist].repeat) {
          repeatButtons[i].classList.add("amplitude-repeat-on");
          repeatButtons[i].classList.remove("amplitude-repeat-off");
        } else {
          repeatButtons[i].classList.add("amplitude-repeat-off");
          repeatButtons[i].classList.remove("amplitude-repeat-on");
        }
      }
    }
  }

  /**
   * Syncs repeat for all of the repeat song buttons. Users
   * can apply styles to the 'amplitude-repeat-song-on' and
   * 'amplitude-repeat-song-off' classes. They represent the state
   * of the player.
   */
  function syncRepeatSong() {
    /*
    Gets all of the repeat song classes
    */
    var repeatSongClasses = document.getElementsByClassName("amplitude-repeat-song");

    /*
    Iterate over all of the repeat song classes. If repeat is on,
    then add the 'amplitude-repeat-song-on' class and remove the
    'amplitude-repeat-song-off' class. If it's off, then do the
    opposite.
    */
    for (var i = 0; i < repeatSongClasses.length; i++) {
      if (_config2.default.repeat_song) {
        repeatSongClasses[i].classList.add("amplitude-repeat-song-on");
        repeatSongClasses[i].classList.remove("amplitude-repeat-song-off");
      } else {
        repeatSongClasses[i].classList.remove("amplitude-repeat-song-on");
        repeatSongClasses[i].classList.add("amplitude-repeat-song-off");
      }
    }
  }

  /*
    Returns the publically available methods.
  */
  return {
    syncRepeat: syncRepeat,
    syncRepeatPlaylist: syncRepeatPlaylist,
    syncRepeatSong: syncRepeatSong
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = RepeatElements;
module.exports = exports["default"];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Callback Utility
 *
 * @module utilities/callbacks
 */
/**
 * Imports the config module
 * @module config
 */
var Callbacks = function () {
  /**
   * Initializes the callbacks for the player.
   */
  function initialize() {
    /*
      Event: abort
      https://www.w3schools.com/tags/av_event_abort.asp
    */
    _config2.default.audio.addEventListener("abort", function () {
      run("abort");
    });

    /*
      Event: error
      https://www.w3schools.com/tags/av_event_error.asp
    */
    _config2.default.audio.addEventListener("error", function () {
      run("error");
    });

    /*
      Event: loadeddata
      https://www.w3schools.com/tags/av_event_loadeddata.asp
    */
    _config2.default.audio.addEventListener("loadeddata", function () {
      run("loadeddata");
    });

    /*
      Event: loadedmetadata
      https://www.w3schools.com/tags/av_event_loadedmetadata.asp
    */
    _config2.default.audio.addEventListener("loadedmetadata", function () {
      run("loadedmetadata");
    });

    /*
      Event: loadstart
      https://www.w3schools.com/tags/av_event_loadstart.asp
    */
    _config2.default.audio.addEventListener("loadstart", function () {
      run("loadstart");
    });

    /*
      Event: pause
      https://www.w3schools.com/tags/av_event_pause.asp
    */
    _config2.default.audio.addEventListener("pause", function () {
      run("pause");
    });

    /*
      Event: playing
      https://www.w3schools.com/tags/av_event_playing.asp
    */
    _config2.default.audio.addEventListener("playing", function () {
      run("playing");
    });

    /*
      Event: play
      https://www.w3schools.com/tags/av_event_play.asp
    */
    _config2.default.audio.addEventListener("play", function () {
      run("play");
    });

    /*
      Event: progress
      https://www.w3schools.com/tags/av_event_progress.asp
    */
    _config2.default.audio.addEventListener("progress", function () {
      run("progress");
    });

    /*
      Event: ratechange
      https://www.w3schools.com/tags/av_event_ratechange.asp
    */
    _config2.default.audio.addEventListener("ratechange", function () {
      run("ratechange");
    });

    /*
      Event: seeked
      https://www.w3schools.com/tags/av_event_seeked.asp
    */
    _config2.default.audio.addEventListener("seeked", function () {
      run("seeked");
    });

    /*
      Event: seeking
      https://www.w3schools.com/tags/av_event_seeking.asp
    */
    _config2.default.audio.addEventListener("seeking", function () {
      run("seeking");
    });

    /*
      Event: stalled
      https://www.w3schools.com/tags/av_event_stalled.asp
    */
    _config2.default.audio.addEventListener("stalled", function () {
      run("stalled");
    });

    /*
      Event: suspend
      https://www.w3schools.com/tags/av_event_suspend.asp
    */
    _config2.default.audio.addEventListener("suspend", function () {
      run("suspend");
    });

    /*
      Event: timeupdate
      https://www.w3schools.com/tags/av_event_timeupdate.asp
    */
    _config2.default.audio.addEventListener("timeupdate", function () {
      run("timeupdate");
    });

    /*
      Event: volumechange
      https://www.w3schools.com/tags/av_event_volumechange.asp
    */
    _config2.default.audio.addEventListener("volumechange", function () {
      run("volumechange");
    });

    /*
      Event: waiting
      https://www.w3schools.com/tags/av_event_waiting.asp
    */
    _config2.default.audio.addEventListener("waiting", function () {
      run("waiting");
    });

    /*
      Event: canplay
      https://www.w3schools.com/tags/av_event_canplay.asp
    */
    _config2.default.audio.addEventListener("canplay", function () {
      run("canplay");
    });

    /*
      Event: canplaythrough
      https://www.w3schools.com/tags/av_event_canplaythrough.asp
    */
    _config2.default.audio.addEventListener("canplaythrough", function () {
      run("canplaythrough");
    });

    /*
      Event: durationchange
      https://www.w3schools.com/tags/av_event_durationchange.asp
    */
    _config2.default.audio.addEventListener("durationchange", function () {
      run("durationchange");
    });

    /*
      Event: ended
      https://www.w3schools.com/tags/av_event_ended.asp
    */
    _config2.default.audio.addEventListener("ended", function () {
      run("ended");
    });
  }

  /**
   * Runs a user defined callback method
   *
   * Public Accessor: Callbacks.run( callbackName )
   *
   * @access public
   * @param {string} callbackName - The name of the callback we are going to run.
   */
  function run(callbackName) {
    /*
      Checks to see if a user defined a callback method for the
      callback we are running.
    */
    if (_config2.default.callbacks[callbackName]) {
      /*
        Build the callback function
      */
      var callbackFunction = _config2.default.callbacks[callbackName];

      /*
        Write a debug message stating the callback we are running
      */
      _debug2.default.writeMessage("Running Callback: " + callbackName);

      /*
        Run the callback function and catch any errors
      */
      try {
        callbackFunction();
      } catch (error) {
        if (error.message == "CANCEL EVENT") {
          throw error;
        } else {
          _debug2.default.writeMessage("Callback error: " + error.message);
        }
      }
    }
  }

  return {
    initialize: initialize,
    run: run
  };
}();

/**
 * Imports the debug module
 * @module utilities/debug
 */
exports.default = Callbacks;
module.exports = exports["default"];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Handles the visual state for all of the mute elements.
 *
 * @module visual/MuteElements
 */
var MuteElements = function () {
  /**
   * Syncs mute for all of the mute buttons. This represents the
   * state of the player if it's muted or not.
   *
   * @access public
   * @param {string} state 	- The muted state of the player.
   */
  function setMuted(state) {
    /*
    Get all of the mute buttons.
    */
    var muteClasses = document.getElementsByClassName("amplitude-mute");

    /*
    Iterate over all of the mute classes. If the state of the player
    is not-muted then we add the amplitude-not-muted classe and remove
    the amplitude muted class otherwise we do the opposite.
    */
    for (var i = 0; i < muteClasses.length; i++) {
      if (!state) {
        muteClasses[i].classList.add("amplitude-not-muted");
        muteClasses[i].classList.remove("amplitude-muted");
      } else {
        muteClasses[i].classList.remove("amplitude-not-muted");
        muteClasses[i].classList.add("amplitude-muted");
      }
    }
  }

  return {
    setMuted: setMuted
  };
}();

exports.default = MuteElements;
module.exports = exports["default"];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Keeps the volume slider elements in sync.
 * @module visual/VolumeSliderElements
 */
var VolumeSliderElements = function () {
  /**
   * Visually syncs the volume sliders so they are all the same if there
   * are more than one.
   *
   * @access public
   */
  function sync() {
    var volumeSliders = document.getElementsByClassName("amplitude-volume-slider");

    /*
    Iterates over all of the volume sliders for the song, setting the value
    to the config value.
    */
    for (var i = 0; i < volumeSliders.length; i++) {
      volumeSliders[i].value = _config2.default.audio.volume * 100;
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    sync: sync
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = VolumeSliderElements;
module.exports = exports["default"];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Repeater utility. Handles setting the repeat for all scenarios.
 *
 * @module utilities/Repeater
 */
var Repeater = function () {
  /**
   * Sets the state of the repeat for a song.
   *
   * @access public
   * @param {boolean} repeat - A boolean representing whether the repeat should be on or off
   */
  function setRepeat(repeat) {
    /*
      Set the global repeat to be toggled
    */
    _config2.default.repeat = repeat;
  }

  /**
   * Sets the state of the repeat for a playlist.
   *
   * @access public
   * @param {boolean} repeat - A boolean representing whether the repeat should be on or off
   * @param {string} playlist - The key of the playlist for repeating
   */
  function setRepeatPlaylist(repeat, playlist) {
    /*
      Set the playlist repeat to be toggled.
    */
    _config2.default.playlists[playlist].repeat = repeat;
  }

  /**
   * Sets the state of the repeat song
   *
   * @access public
   * @param {boolean} repeat - A boolean representing whether the repeat shoudl be on or off for the song.
   */
  function setRepeatSong(repeat) {
    _config2.default.repeat_song = repeat;
  }

  /*
    Returns the public facing methods
  */
  return {
    setRepeat: setRepeat,
    setRepeatPlaylist: setRepeatPlaylist,
    setRepeatSong: setRepeatSong
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = Repeater;
module.exports = exports["default"];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Shuffle Module. Handles all of the shuffling functionality for
 * AmplitudeJS
 *
 * @module utilities/Shuffler
 */
var Shuffler = function () {
  /**
   * Sets the shuffle state globally
   *
   * @access public
   * @param {boolean} shuffle   - True when we are shuffling, false when we turn it off.
   */
  function setShuffle(shuffle) {
    _config2.default.shuffle_on = shuffle;

    if (shuffle) {
      shuffleSongs();
    } else {
      _config2.default.shuffle_list = [];
    }
  }

  /**
   * Toggles the shuffle status globally.
   *
   * @access public
   */
  function toggleShuffle() {
    /*
      If shuffle is on, we toggle it off. If shuffle is off, we
      toggle on.
    */
    if (_config2.default.shuffle_on) {
      _config2.default.shuffle_on = false;
      _config2.default.shuffle_list = [];
    } else {
      _config2.default.shuffle_on = true;
      shuffleSongs();
    }
  }

  /**
   * Sets the shuffle state for a playlist
   *
   * @access public
   * @param {string} playlist   The key of the playlist we are shuffling.
   * @param {boolean} shuffle   True when we are shuffling the playlist, false when we turn off shuffle.
   */
  function setShufflePlaylist(playlist, shuffle) {
    _config2.default.playlists[playlist].shuffle = shuffle;

    if (_config2.default.playlists[playlist].shuffle) {
      shufflePlaylistSongs(playlist);
    } else {
      _config2.default.playlists[playlist].shuffle_list = [];
    }
  }

  /**
   * Sets the shuffle state for a playlist
   *
   * @access public
   * @param {string} playlist   The key of the playlist we are shuffling.
   */
  function toggleShufflePlaylist(playlist) {
    /*
      If the playlist shuffled is on, we toggle it off. If the
      playlist shuffled is off, we toggle it on.
    */
    if (_config2.default.playlists[playlist].shuffle) {
      _config2.default.playlists[playlist].shuffle = false;
      _config2.default.playlists[playlist].shuffle_list = [];
    } else {
      _config2.default.playlists[playlist].shuffle = true;
      shufflePlaylistSongs(playlist);
    }
  }

  /**
   * Shuffles individual songs in the config
   * Based off of: http://www.codinghorror.com/blog/2007/12/the-danger-of-naivete.html
   *
   * Public Accessor: Shuffle.shuffleSongs()
   *
   * @access public
   */
  function shuffleSongs() {
    /*
    Builds a temporary array with the length of the config.
    */
    var shuffleTemp = new Array(_config2.default.songs.length);

    /*
    Set the temporary array equal to the songs array.
    */
    for (var i = 0; i < _config2.default.songs.length; i++) {
      shuffleTemp[i] = _config2.default.songs[i];
    }

    /*
    Iterate ove rthe songs and generate random numbers to
    swap the indexes of the shuffle array.
    */
    for (var _i = _config2.default.songs.length - 1; _i > 0; _i--) {
      var randNum = Math.floor(Math.random() * _config2.default.songs.length + 1);
      shuffleSwap(shuffleTemp, _i, randNum - 1);
    }

    /*
    Set the shuffle list to the shuffle temp.
    */
    _config2.default.shuffle_list = shuffleTemp;
  }

  /**
   * Shuffle songs in a playlist
   *
   * Public Accessor: Shuffle.shufflePlaylistSongs( playlist )
   *
   * @access public
   * @param {string} playlist - The playlist we are shuffling.
   */
  function shufflePlaylistSongs(playlist) {
    /*
      Builds a temporary array with the length of the playlist songs.
    */
    var shuffleTemp = new Array(_config2.default.playlists[playlist].songs.length);

    /*
      Set the temporary array equal to the playlist array.
    */
    for (var i = 0; i < _config2.default.playlists[playlist].songs.length; i++) {
      shuffleTemp[i] = _config2.default.playlists[playlist].songs[i];
    }

    /*
      Iterate ove rthe songs and generate random numbers to
      swap the indexes of the shuffle array.
    */
    for (var _i2 = _config2.default.playlists[playlist].songs.length - 1; _i2 > 0; _i2--) {
      var randNum = Math.floor(Math.random() * _config2.default.playlists[playlist].songs.length + 1);
      shuffleSwap(shuffleTemp, _i2, randNum - 1);
    }

    /*
      Set the shuffle list to the shuffle temp.
    */
    _config2.default.playlists[playlist].shuffle_list = shuffleTemp;
  }

  /**
   * Swaps and randomizes the song shuffle.
   *
   * @access private
   * @param {object} shuffleList 	- The list of songs that is going to be shuffled
   * @param {number} original 		- The original index of he song in the songs array
   * @param {number} random 			- The randomized index that will be the new index of the song in the shuffle array.
   */
  function shuffleSwap(shuffleList, original, random) {
    var temp = shuffleList[original];
    shuffleList[original] = shuffleList[random];
    shuffleList[random] = temp;
  }

  /**
   * Returns public facing methods
   */
  return {
    setShuffle: setShuffle,
    toggleShuffle: toggleShuffle,
    setShufflePlaylist: setShufflePlaylist,
    toggleShufflePlaylist: toggleShufflePlaylist,
    shuffleSongs: shuffleSongs,
    shufflePlaylistSongs: shufflePlaylistSongs
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = Shuffler;
module.exports = exports["default"];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Defines the visual representation of AmplitudeJS song slider elements.
 * @module visual/SongSliderElements
 */
var SongSliderElements = function () {
  /**
   * Syncs all of the song slider elements.
   *
   * @access public
   * @param {number} location 	- The location of the song as a percentage.
   * @param {string} playlist 	- The playlist we are setting the song slider for.
   * @param {number} songIndex 	- The index of the song we are adjusting the song slider for.
   */
  function sync(location, playlist, songIndex) {
    syncMain(location);
    syncPlaylist(location, playlist);
    syncSong(location, songIndex);
    syncSongInPlaylist(location, playlist);
  }

  /**
   * Syncs the main slider location
   *
   * @access public
   * @param {number} location 	- The location of the song as a percentage.
   */
  function syncMain(location) {
    /*
    Ensure we have a location that's a number
    */
    location = !isNaN(location) ? location : 0;

    /*
    Gets the main song sliders
    */
    var mainSongSliders = document.querySelectorAll(".amplitude-song-slider");

    /*
    Iterates over all of the main sliders and sets the value to the
    percentage of the song played.
    */
    for (var i = 0; i < mainSongSliders.length; i++) {
      /*
        Grab the playlist and song attributes from the element.
      */
      var playlist = mainSongSliders[i].getAttribute("data-amplitude-playlist");
      var song = mainSongSliders[i].getAttribute("data-amplitude-song-index");

      /*
        This method is responsible for only the global elements,
        so we make sure there are no playlist or songs defined on
        the element.
      */
      if (playlist == null && song == null) {
        mainSongSliders[i].value = location;
      }
    }
  }

  /**
   * Syncs playlist song slider locations
   *
   * @access public
   * @param {number} location 	- The location of the song as a percentage.
   * @param {string} playlist 	- The playlist we are setting the song slider for.
   */
  function syncPlaylist(location, playlist) {
    /*
    Ensure we have a location that's a number
    */
    location = !isNaN(location) ? location : 0;

    /*
    Gets the playlist song sliders
    */
    var playlistSongSliders = document.querySelectorAll('.amplitude-song-slider[data-amplitude-playlist="' + playlist + '"]');

    /*
    Iterates over all of the playlist sliders and sets the value to the
    percentage of the song played.
    */
    for (var i = 0; i < playlistSongSliders.length; i++) {
      /*
        Grab the playlist and song attributes from the element.
      */
      var playlistAttribute = playlistSongSliders[i].getAttribute("data-amplitude-playlist");
      var songAttribute = playlistSongSliders[i].getAttribute("data-amplitude-song-index");

      /*
      This method is responsible for only the playlist elements,
      so we make sure the playlist attribute matches what is passed
      in.
      */
      if (playlistAttribute == playlist && songAttribute == null) {
        playlistSongSliders[i].value = location;
      }
    }
  }

  /**
   * Syncs individual song slider locations
   *
   * @access public
   * @param {number} location 	- The location of the song as a percentage.
   * @param {number} songIndex 	- The index of the song we are adjusting the song slider for.
   */
  function syncSong(location, songIndex) {
    /*
    We only want to sync song sliders if the playlist is null.
    */
    if (_config2.default.active_playlist == null) {
      /*
      Ensure we have a location that's a number
      */
      location = !isNaN(location) ? location : 0;

      /*
      Gets the individual song sliders
      */
      var songSliders = document.querySelectorAll('.amplitude-song-slider[data-amplitude-song-index="' + songIndex + '"]');

      /*
      Iterates over all of the individual song sliders and sets the value
      to the percentage of the song played.
      */
      for (var i = 0; i < songSliders.length; i++) {
        /*
         Grab the playlist and song attributes from the element.
        */
        var playlistAttribute = songSliders[i].getAttribute("data-amplitude-playlist");
        var songAttribute = songSliders[i].getAttribute("data-amplitude-song-index");

        /*
        This method is responsible for only the playlist elements,
        so we make sure the playlist attribute matches what is passed
        in.
        */
        if (playlistAttribute == null && songAttribute == songIndex) {
          songSliders[i].value = location;
        }
      }
    }
  }

  /**
   * Syncs individual song slider locations
   *
   * @access public
   * @param {number} location 	- The location of the song as a percentage.
   * @param {string} playlist 	- The playlist we are setting the song slider for.
   */
  function syncSongInPlaylist(location, playlist) {
    /*
    Ensure we have a location that's a number
    */
    location = !isNaN(location) ? location : 0;

    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    /*
    Gets the song in playlist sliders
    */
    var songInPlaylistSliders = document.querySelectorAll('.amplitude-song-slider[data-amplitude-playlist="' + playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    /*
    Iterates over all of the song in playlist sliders and sets the value
    to the percentage of the song played.
    */
    for (var i = 0; i < songInPlaylistSliders.length; i++) {
      songInPlaylistSliders[i].value = location;
    }
  }

  /**
   * Visually syncs the song sliders back to 0. This usually happens when
   * a song has changed, we ensure that all song sliders get reset.
   *
   * @access public
   */
  function resetElements() {
    var songSliders = document.getElementsByClassName("amplitude-song-slider");

    /*
    Iterate over all of the song sliders and set them to
    0 essentially resetting them.
    */
    for (var i = 0; i < songSliders.length; i++) {
      songSliders[i].value = 0;
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    sync: sync,
    syncMain: syncMain,
    syncPlaylist: syncPlaylist,
    syncSong: syncSong,
    syncSongInPlaylist: syncSongInPlaylist,
    resetElements: resetElements
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = SongSliderElements;
module.exports = exports["default"];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _currentTimeElements = __webpack_require__(53);

var _currentTimeElements2 = _interopRequireDefault(_currentTimeElements);

var _currentHourElements = __webpack_require__(50);

var _currentHourElements2 = _interopRequireDefault(_currentHourElements);

var _currentMinuteElements = __webpack_require__(51);

var _currentMinuteElements2 = _interopRequireDefault(_currentMinuteElements);

var _currentSecondElements = __webpack_require__(52);

var _currentSecondElements2 = _interopRequireDefault(_currentSecondElements);

var _durationCountDownTimeElements = __webpack_require__(54);

var _durationCountDownTimeElements2 = _interopRequireDefault(_durationCountDownTimeElements);

var _durationHourElements = __webpack_require__(55);

var _durationHourElements2 = _interopRequireDefault(_durationHourElements);

var _durationMinuteElements = __webpack_require__(56);

var _durationMinuteElements2 = _interopRequireDefault(_durationMinuteElements);

var _durationSecondElements = __webpack_require__(57);

var _durationSecondElements2 = _interopRequireDefault(_durationSecondElements);

var _durationTimeElements = __webpack_require__(58);

var _durationTimeElements2 = _interopRequireDefault(_durationTimeElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Time Elements Interface. This allows us to update all of the sub time elements
 * through one central point.
 * @module visual/TimeElements
 */


/**
 * Imports the AmplitudeJS Duration Second Elements
 * @module visual/time/DurationSecondElements
 */


/**
 * Imports the AmplitudeJS Duration Hour Elements
 * @module visual/time/DurationHourElements
 */


/**
 * Imports the AmplitudeJS Current Second Elements
 * @module visual/time/CurrentTimeElements
 */


/**
 * Imports the AmplitudeJS Current Hour Elements
 * @module visual/time/CurrentHourElements
 */
var TimeElements = function () {
  /**
   * Resets the current times.
   */
  function resetCurrentTimes() {
    _currentTimeElements2.default.resetTimes();
    _currentHourElements2.default.resetTimes();
    _currentMinuteElements2.default.resetTimes();
    _currentSecondElements2.default.resetTimes();
  }

  /**
   * Syncs the current time elements to the time provided.
   *
   * @param {Object} currentTime - An object representing the current time of the audio.
   */
  function syncCurrentTimes(currentTime) {
    _currentTimeElements2.default.sync(currentTime);
    _currentHourElements2.default.sync(currentTime.hours);
    _currentMinuteElements2.default.sync(currentTime.minutes);
    _currentSecondElements2.default.sync(currentTime.seconds);
  }

  /**
   * Resets the duration times.
   */
  function resetDurationTimes() {
    _durationCountDownTimeElements2.default.resetTimes();
    _durationHourElements2.default.resetTimes();
    _durationMinuteElements2.default.resetTimes();
    _durationSecondElements2.default.resetTimes();
    _durationTimeElements2.default.resetTimes();
  }

  /**
   * Syncs the duration times to the times provided.
   *
   * @param {Object} currentTime - An object representing the current time of the audio.
   * @param {Object} songDuration - An object representing the duration of the audio
   */
  function syncDurationTimes(currentTime, songDuration) {
    _durationCountDownTimeElements2.default.sync(currentTime, songDuration);
    _durationTimeElements2.default.sync(songDuration);
    _durationHourElements2.default.sync(songDuration.hours);
    _durationMinuteElements2.default.sync(songDuration.minutes);
    _durationSecondElements2.default.sync(songDuration.seconds);
  }

  /**
   * Returns the publically accessible methods.
   */
  return {
    resetCurrentTimes: resetCurrentTimes,
    syncCurrentTimes: syncCurrentTimes,
    resetDurationTimes: resetDurationTimes,
    syncDurationTimes: syncDurationTimes
  };
}();

/**
 * Imports the AmplitudeJS Duration Time Elements
 * @module visual/time/DurationTimeElements
 */


/**
 * Imports the AmplitudeJS Duration Minute Elements
 * @module visual/time/DurationMinuteElements
 */


/**
 * Imports the AmplitudeJS Duration Count Down Time Elements
 * @module visual/time/DurationCountDownTimeElements
 */


/**
 * Imports the AmplitudeJS Current Minute Elements
 * @module visual/time/CurrentMinuteElements
 */
/**
 * Imports the AmplitudeJS Current Time
 * @module visual/time/CurrentTimeElements
 */
exports.default = TimeElements;
module.exports = exports["default"];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the visualizations elements.
 *
 * @module Visualizations
 */
/**
 * Imports the config module
 * @module config
 */
var Visualizations = function () {
  /**
   * Runs all of the visualizations on the screen.
   */
  function run() {
    /*
      Get all of the visualization elements on the page
    */
    var visualizationElements = document.querySelectorAll(".amplitude-visualization");

    /*
      If the web audio API is available, we display the visualizations.
    */
    if (_config2.default.web_audio_api_available) {
      /*
        If the visualization has not started, there are visualizations available,
        and we have at least one visualization element, then we continue.
      */
      if (Object.keys(_config2.default.visualizations.available).length > 0 && visualizationElements.length > 0) {
        /*
            Iterate over all of the visualizations on the page and activate the
            ones we need.
          */
        for (var i = 0; i < visualizationElements.length; i++) {
          /*
              Grab the playlist and song attributes from the visualization to
              determine which one we run.
            */
          var playlist = visualizationElements[i].getAttribute("data-amplitude-playlist");
          var song = visualizationElements[i].getAttribute("data-amplitude-song-index");

          /*
              If the playlist and song are null, it's a global visualization element.
            */
          if (playlist == null && song == null) {
            runGlobalVisualization(visualizationElements[i]);
          }

          /*
              if the playlist is not null and the song is null it's a playlist visualization
              element.
            */
          if (playlist != null && song == null) {
            runPlaylistVisualization(visualizationElements[i], playlist);
          }

          /*
              If the playlist is null and the song is not null it's a song visualization element.
            */
          if (playlist == null && song != null) {
            runSongVisualization(visualizationElements[i], song);
          }

          /*
              If the playlist and song are not null then it's a song in playlist visualization
              element.
            */
          if (playlist != null && song != null) {
            runSongInPlaylistVisualization(visualizationElements[i], playlist, song);
          }
        }
      }
    } else {
      displayBackups();
    }
  }

  /**
   * Runs a global visualization
   *
   * @param {Node} element  The container element that handles the visualization.
   */
  function runGlobalVisualization(element) {
    /*
      Gets the global visualization index and the active song visualization indexes
      so we know which visualization to use. The song will override the global
    */
    var globalVisualizationIndex = _config2.default.visualization;
    var activeSongVisualizationIndex = _config2.default.active_index != null ? _config2.default.songs[_config2.default.active_index].visualization : _config2.default.playlists[_config2.default.active_playlist].songs[_config2.default.playlists[_config2.default.active_playlist].active_index].visualization;

    /*
      If the active song visualization is defined and the visualization exists,
      use that visualization.
    */
    if (activeSongVisualizationIndex != undefined && _config2.default.visualizations.available[activeSongVisualizationIndex] != undefined) {
      addToActiveVisualizations(activeSongVisualizationIndex, element);

      /*
      If the user defined a global visualization, use that one.
      */
    } else if (globalVisualizationIndex != undefined && _config2.default.visualizations.available[globalVisualizationIndex] != undefined) {
      addToActiveVisualizations(globalVisualizationIndex, element);

      /*
      If the user didn't define a global visualization, use the first visualization
      registered if there is one.
      */
    } else {
      /*
        Grab the first registered visualization. If it exists, use that one.
      */
      var firstVisualization = Object.keys(_config2.default.visualizations.available).length > 0 ? Object.keys(_config2.default.visualizations.available)[0] : null;

      if (firstVisualization != null) {
        addToActiveVisualizations(firstVisualization, element);
      }
    }
  }

  /**
   * Run a specific playlist visualization.
   *
   * @param {Node} element  The container element that handles the visualization.
   * @param {string} playlist The key of the playlist we are running the visualization for.
   */
  function runPlaylistVisualization(element, playlist) {
    /*
      If the playlist is equal to the active playlist, then we continue.
    */
    if (playlist == _config2.default.active_playlist) {
      /*
        Checks if the song has a visualization and that visualization exists,
        run that visualization.
      */
      var activeSongVisualizationIndex = _config2.default.playlists[_config2.default.active_playlist].songs[_config2.default.playlists[_config2.default.active_playlist].active_index].visualization;
      var activePlaylistVisualizationIndex = _config2.default.playlists[_config2.default.active_playlist].visualization;
      var globalVisualizationIndex = _config2.default.visualization;

      /*
        If the actual song has a visualization, we run that.
      */
      if (activeSongVisualizationIndex != undefined && _config2.default.visualizations.available[activeSongVisualizationIndex] != undefined) {
        addToActiveVisualizations(activeSongVisualizationIndex, element);

        /*
        If the actual playlist has a visualization, run that.
        */
      } else if (activePlaylistVisualizationIndex != undefined && _config2.default.visualizations.available[activePlaylistVisualizationIndex] != undefined) {
        addToActiveVisualizations(activePlaylistVisualizationIndex, element);

        /*
        If a global visualization is defined, run that.
        */
      } else if (globalVisualizationIndex != undefined && _config2.default.visualizations.available[globalVisualizationIndex] != undefined) {
        addToActiveVisualizations(globalVisualizationIndex, element);
      } else {
        /*
          Grab the first registered visualization. If it exists, use that one.
        */
        var firstVisualization = Object.keys(_config2.default.visualizations.available).length > 0 ? Object.keys(_config2.default.visualizations.available)[0] : null;

        if (firstVisualization != null) {
          addToActiveVisualizations(firstVisualization, element);
        }
      }
    }
  }

  /**
   * Run a song specific visualization.
   *
   * @param {Node} element The container element that handles the visualization.
   * @param {string} song The song index that we are running the visualization for.
   */
  function runSongVisualization(element, song) {
    /*
      If the song is equal to the active song, then we continue.
    */
    if (song == _config2.default.active_index) {
      /*
        Get the indexes of the song
      */
      var activeSongVisualizationIndex = _config2.default.songs[_config2.default.active_index].visualization;
      var globalVisualizationIndex = _config2.default.visualization;

      /*
        If the song has a visualization, run that.
      */
      if (activeSongVisualizationIndex != undefined && _config2.default.visualizations.available[activeSongVisualizationIndex] != undefined) {
        addToActiveVisualizations(activeSongVisualizationIndex, element);

        /*
        If the global visualization is set, use that.
        */
      } else if (globalVisualizationIndex != undefined && _config2.default.visualizations.available[globalVisualizationIndex] != undefined) {
        addToActiveVisualizations(globalVisualizationIndex, element);
      } else {
        /*
          Grab the first registered visualization. If it exists, use that one.
        */
        var firstVisualization = Object.keys(_config2.default.visualizations.available).length > 0 ? Object.keys(_config2.default.visualizations.available)[0] : null;

        if (firstVisualization != null) {
          addToActiveVisualizations(firstVisualization, element);
        }
      }
    }
  }

  /**
   * Run a song in playlist visualization.
   *
   * @param {Node} element - The element containing the visualization.
   * @param {string} playlist - The string of the playlist key.
   * @param {index} song - The index of the song in the playlist.
   */
  function runSongInPlaylistVisualization(element, playlist, song) {
    /*
      If the playlist is the same as the active playlist and the active
      index of the song is the same as the song, then we continue.
    */
    if (playlist == _config2.default.active_playlist && _config2.default.playlists[playlist].active_index == song) {
      /*
        Checks if the song has a visualization and that visualization exists,
        run that visualization.
      */
      var activeSongVisualizationIndex = _config2.default.playlists[_config2.default.active_playlist].songs[_config2.default.playlists[_config2.default.active_playlist].active_index].visualization;
      var activePlaylistVisualizationIndex = _config2.default.playlists[_config2.default.active_playlist].visualization;
      var globalVisualizationIndex = _config2.default.visualization;

      /*
        If the active song has a visualization, we use that.
      */
      if (activeSongVisualizationIndex != undefined && _config2.default.visualizations.available[activeSongVisualizationIndex] != undefined) {
        addToActiveVisualizations(activeSongVisualizationIndex, element);

        /*
        If the active playlist has a visualization, we use that.
        */
      } else if (activePlaylistVisualizationIndex != undefined && _config2.default.visualizations.available[activePlaylistVisualizationIndex] != undefined) {
        addToActiveVisualizations(activePlaylistVisualizationIndex, element);

        /*
        If the global visualization has been set, we use that.
        */
      } else if (globalVisualizationIndex != undefined && _config2.default.visualizations.available[globalVisualizationIndex] != undefined) {
        addToActiveVisualizations(globalVisualizationIndex, element);
      } else {
        /*
          Grab the first registered visualization. If it exists, use that one.
        */
        var firstVisualization = Object.keys(_config2.default.visualizations.available).length > 0 ? Object.keys(_config2.default.visualizations.available)[0] : null;

        if (firstVisualization != null) {
          addToActiveVisualizations(firstVisualization, element);
        }
      }
    }
  }

  /**
   * Add a visualization to the array of active visualizations.
   *
   * @param {string} key - The key of the active visualization.
   * @param {Node} element - The element that the visualization will be applied to.
   */
  function addToActiveVisualizations(key, element) {
    var visualization = new _config2.default.visualizations.available[key]["object"]();
    visualization.setPreferences(_config2.default.visualizations.available[key]["preferences"]);
    visualization.startVisualization(element);
    _config2.default.visualizations.active.push(visualization);
  }

  /**
   * Stops all active visualizations.
   */
  function stop() {
    /*
      Iterates over all of the visualizations and stop the visualization.
    */
    for (var i = 0; i < _config2.default.visualizations.active.length; i++) {
      _config2.default.visualizations.active[i].stopVisualization();
    }

    /*
      Clear the active visualizations.
    */
    _config2.default.visualizations.active = [];
  }

  /**
   * Registers any visualization we can use.
   *
   * @param {object} visualization The visualization object itself
   * @param {object} preferences User preferences overrides.
   */
  function register(visualization, preferences) {
    /*
      Initialize the new visualization.
    */
    var newVisualization = new visualization();

    /*
     Adds the visualization to the global config so it knows
     it can be used when playing songs.
      getID is a public function for getting a visualization's id.
     It becomes the key to access the visualization.
    */
    _config2.default.visualizations.available[newVisualization.getID()] = new Array();
    _config2.default.visualizations.available[newVisualization.getID()]["object"] = visualization;
    _config2.default.visualizations.available[newVisualization.getID()]["preferences"] = preferences;
  }

  /**
   * Displays the backups for the visualizations.
   */
  function displayBackups() {
    /*
      Get all of the visualization elements on the page
    */
    var visualizationElements = document.querySelectorAll(".amplitude-visualization");

    if (visualizationElements.length > 0) {
      for (var x = 0; x < visualizationElements.length; x++) {
        /*
          Grab the playlist and song attributes from the visualization to
          determine which one we run.
        */
        var playlist = visualizationElements[x].getAttribute("data-amplitude-playlist");
        var song = visualizationElements[x].getAttribute("data-amplitude-song-index");

        /*
          If the playlist and song are null, it's a global visualization element.
        */
        if (playlist == null && song == null) {
          displayGlobalBackup(visualizationElements[x]);
        }

        /*
          if the playlist is not null and the song is null it's a playlist visualization
          element.
        */
        if (playlist != null && song == null) {
          displayPlaylistBackup(visualizationElements[x], playlist);
        }

        /*
          If the playlist is null and the song is not null it's a song visualization element.
        */
        if (playlist == null && song != null) {
          displaySongBackup(visualizationElements[x], song);
        }

        /*
          If the playlist and song are not null then it's a song in playlist visualization
          element.
        */
        if (playlist != null && song != null) {
          displaySongInPlaylistBackup(visualizationElements[x], playlist, song);
        }
      }
    }
  }

  /**
   * Displays the global backup which is the cover art of the image in the
   * visualization container.
   *
   * @param {node} element  - The element we are adding the background image to.
   */
  function displayGlobalBackup(element) {
    element.style.backgroundImage = "url(" + _config2.default.active_metadata.cover_art_url + ")";
  }

  /**
   * Displays the playlist backup which is the cover art of the image in the
   * visualization container.
   *
   * @param {node} element  - The element we are adding the background image to.
   */
  function displayPlaylistBackup(element, playlist) {
    if (_config2.default.active_playlist == playlist) {
      element.style.backgroundImage = "url(" + _config2.default.active_metadata.cover_art_url + ")";
    }
  }

  /**
   * Displays the song backup which is the cover art of the image in the
   * visualization container.
   *
   * @param {node} element  - The element we are adding the background image to.
   */
  function displaySongBackup(element, song) {
    if (_config2.default.active_index == song) {
      element.style.backgroundImage = "url(" + _config2.default.active_metadata.cover_art_url + ")";
    }
  }

  /**
   * Displays the song in playlist backup which is the cover art of the image in the
   * visualization container.
   *
   * @param {node} element  - The element we are adding the background image to.
   */
  function displaySongInPlaylistBackup(element, playlist, song) {
    if (_config2.default.active_playlist == playlist && _config2.default.playlists[active_playlist].active_index == song) {
      element.style.backgroundImage = "url(" + _config2.default.active_metadata.cover_art_url + ")";
    }
  }

  /*
    Returns the public facing methods
  */
  return {
    run: run,
    stop: stop,
    register: register
  };
}();

/**
 * Imports the debug module
 * @module utilities/Debug
 */
exports.default = Visualizations;
module.exports = exports["default"];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _init = __webpack_require__(21);

var _init2 = _interopRequireDefault(_init);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These helpers wrap around the basic methods of the Soundcloud API
 * and get the information we need from SoundCloud to make the songs
 * streamable through Amplitude
 *
 * @module soundcloud/SoundCloud
 */
/**
 * Imports the config module
 * @module config
 */
var SoundCloud = function () {
  /**
   * Defines the temporary user config used while we configure soundcloud
   * @type {object}
   */
  var tempUserConfig = {};

  /**
   * Loads the soundcloud SDK for use with Amplitude so the user doesn't have
   * to load it themselves.
   * With help from: http://stackoverflow.com/questions/950087/include-a-javascript-file-in-another-javascript-file
   *
   * @access public
   * @param {object} userConfig 	- The config defined by the user for AmplitudeJS
   */
  function loadSoundCloud(userConfig) {
    /*
    Sets the temporary config to the config passed by the user so we can make changes
    and not break the actual config.
    */
    tempUserConfig = userConfig;

    /*
    Gets the head tag for the document and create a script element.
    */
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");

    script.type = "text/javascript";

    /*
    URL to the remote soundcloud SDK
    */
    script.src = "https://connect.soundcloud.com/sdk.js";
    script.onreadystatechange = initSoundcloud;
    script.onload = initSoundcloud;

    /*
    Add the script to the head of the document.
    */
    head.appendChild(script);
  }

  /**
   * Initializes soundcloud with the key provided.
   *
   * @access private
   */
  function initSoundcloud() {
    /*
    Calls the SoundCloud initialize function
    from their API and sends it the client_id
    that the user passed in.
    */
    SC.initialize({
      client_id: _config2.default.soundcloud_client
    });

    /*
    Gets the streamable URLs to run through Amplitue. This is
    VERY important since Amplitude can't stream the copy and pasted
    link from the SoundCloud page, but can resolve the streaming
    URLs from the link.
    */
    getStreamableURLs();
  }

  /**
   * Gets the streamable URL from the URL provided for
   * all of the soundcloud links.  This will loop through
   * and set all of the information for the soundcloud
   * urls.
   *
   * @access private
   */
  function getStreamableURLs() {
    /*
    Define the regex to find the soundcloud URLs
    */
    var soundcloud_regex = /^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/;

    for (var i = 0; i < _config2.default.songs.length; i++) {
      /*
      If the URL matches soundcloud, we grab
      that url and get the streamable link
      if there is one.
      */
      if (_config2.default.songs[i].url.match(soundcloud_regex)) {
        _config2.default.soundcloud_song_count++;
        resolveStreamable(_config2.default.songs[i].url, i);
      }
    }
  }

  /**
   * Resolves an individual streamable URL.
   *
   * @param {string} url - The URL of the SoundCloud song to get the streamable URL from.
   * @param {string} playlist - The playlist we are getting the streamable URL for.
   * @param {Integer} index - The index of the song in the playlist or the songs array.
   * @param {boolean} addToShuffleList - Whether we add to the shuffle list for the songs or playlist.
   *
   */
  function resolveIndividualStreamableURL(url, playlist, index) {
    var addToShuffleList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    SC.get("/resolve/?url=" + url, function (sound) {
      /*
        If streamable we get the url and bind the client ID to the end
        so Amplitude can just stream the song normally. We then overwrite
        the url the user provided with the streamable URL.
      */
      if (sound.streamable) {
        if (playlist != null) {
          _config2.default.playlists[playlist].songs[index].url = sound.stream_url + "?client_id=" + _config2.default.soundcloud_client;

          if (addToShuffleList) {
            _config2.default.playlists[playlist].shuffle_list[index].url = sound.stream_url + "?client_id=" + _config2.default.soundcloud_client;
          }
          /*
            If the user want's to use soundcloud art, we overwrite the
            cover_art_url with the soundcloud artwork url.
          */
          if (_config2.default.soundcloud_use_art) {
            _config2.default.playlists[playlist].songs[index].cover_art_url = sound.artwork_url;

            if (addToShuffleList) {
              _config2.default.playlists[playlist].shuffle_list[index].cover_art_url = sound.artwork_url;
            }
          }

          /*
            Grab the extra metadata from soundcloud and bind it to the
            song.  The user can get this through the public function:
            getActiveSongMetadata
          */
          _config2.default.playlists[playlist].songs[index].soundcloud_data = sound;

          if (addToShuffleList) {
            _config2.default.playlists[playlist].shuffle_list[index].soundcloud_data = sound;
          }
        } else {
          _config2.default.songs[index].url = sound.stream_url + "?client_id=" + _config2.default.soundcloud_client;

          if (addToShuffleList) {
            _config2.default.shuffle_list[index].stream_url + "?client_id=" + _config2.default.soundcloud_client;
          }

          /*
            If the user want's to use soundcloud art, we overwrite the
            cover_art_url with the soundcloud artwork url.
          */
          if (_config2.default.soundcloud_use_art) {
            _config2.default.songs[index].cover_art_url = sound.artwork_url;

            if (addToShuffleList) {
              _config2.default.shuffle_list[index].cover_art_url = sound.artwork_url;
            }
          }

          /*
            Grab the extra metadata from soundcloud and bind it to the
            song.  The user can get this through the public function:
            getActiveSongMetadata
          */
          _config2.default.songs[index].soundcloud_data = sound;

          if (addToShuffleList) {
            _config2.default.shuffle_list[index].soundcloud_data = sound;
          }
        }
      } else {
        if (playlist != null) {
          AmplitudeHelpers.writeDebugMessage(_config2.default.playlists[playlist].songs[index].name + " by " + _config2.default.playlists[playlist].songs[index].artist + " is not streamable by the Soundcloud API");
        } else {
          /*
            If not streamable, then we print a message to the user stating
            that the song with name X and artist X is not streamable. This
            gets printed ONLY if they have debug turned on.
          */
          AmplitudeHelpers.writeDebugMessage(_config2.default.songs[index].name + " by " + _config2.default.songs[index].artist + " is not streamable by the Soundcloud API");
        }
      }
    });
  }

  /**
   * Due to Soundcloud SDK being asynchronous, we need to scope the
   * index of the song in another function. The privateGetSoundcloudStreamableURLs
   * function does the actual iteration and scoping.
   *
   * @access private
   * @param {string} url 		- URL of the soundcloud song
   * @param {number} index 	- The index of the soundcloud song in the songs array.
   */
  function resolveStreamable(url, index) {
    SC.get("/resolve/?url=" + url, function (sound) {
      /*
      If streamable we get the url and bind the client ID to the end
      so Amplitude can just stream the song normally. We then overwrite
      the url the user provided with the streamable URL.
      */
      if (sound.streamable) {
        _config2.default.songs[index].url = sound.stream_url + "?client_id=" + _config2.default.soundcloud_client;

        /*
        If the user want's to use soundcloud art, we overwrite the
        cover_art_url with the soundcloud artwork url.
        */
        if (_config2.default.soundcloud_use_art) {
          _config2.default.songs[index].cover_art_url = sound.artwork_url;
        }

        /*
        Grab the extra metadata from soundcloud and bind it to the
        song.  The user can get this through the public function:
        getActiveSongMetadata
        */
        _config2.default.songs[index].soundcloud_data = sound;
      } else {
        /*
        If not streamable, then we print a message to the user stating
        that the song with name X and artist X is not streamable. This
        gets printed ONLY if they have debug turned on.
        */
        AmplitudeHelpers.writeDebugMessage(_config2.default.songs[index].name + " by " + _config2.default.songs[index].artist + " is not streamable by the Soundcloud API");
      }
      /*
      Increments the song ready counter.
      */
      _config2.default.soundcloud_songs_ready++;

      /*
      When all songs are accounted for, then amplitude is ready
      to rock and we set the rest of the config.
      */
      if (_config2.default.soundcloud_songs_ready == _config2.default.soundcloud_song_count) {
        _init2.default.setConfig(tempUserConfig);
      }
    });
  }

  /**
   * Determines if a given URL is a SoundCloud URL.
   *
   * @param {string} url - The URL to test if it's a SoundCloud URL.
   */
  function isSoundCloudURL(url) {
    var soundcloud_regex = /^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/;

    return url.match(soundcloud_regex);
  }

  /*
  Returns the publically accessible methods
  */
  return {
    loadSoundCloud: loadSoundCloud,
    resolveIndividualStreamableURL: resolveIndividualStreamableURL,
    isSoundCloudURL: isSoundCloudURL
  };
}();

/**
 * Imports the initializer
 * @module init/AmplitudeInitializer
 */
exports.default = SoundCloud;
module.exports = exports["default"];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Defines the Playback Speed Visual Elements Handler
 * @module visual/PlaybackSpeedElements
 */
var PlaybackSpeedElements = function () {
  /**
   * Sets all of the visual playback speed buttons to have the right class
   * to display the background image that represents the current playback
   * speed.
   *
   * @access public
   */
  function sync() {
    /*
    Gets all of the playback speed classes.
    */
    var playbackSpeedClasses = document.getElementsByClassName("amplitude-playback-speed");

    /*
    Iterates over all of the playback speed classes
    applying the right speed class for visual purposes.
    */
    for (var i = 0; i < playbackSpeedClasses.length; i++) {
      /*
      Removes all of the old playback speed classes.
      */
      playbackSpeedClasses[i].classList.remove("amplitude-playback-speed-10");
      playbackSpeedClasses[i].classList.remove("amplitude-playback-speed-15");
      playbackSpeedClasses[i].classList.remove("amplitude-playback-speed-20");

      /*
      Switch the current playback speed and apply the appropriate
      speed class.
      */
      switch (_config2.default.playback_speed) {
        case 1:
          playbackSpeedClasses[i].classList.add("amplitude-playback-speed-10");
          break;
        case 1.5:
          playbackSpeedClasses[i].classList.add("amplitude-playback-speed-15");
          break;
        case 2:
          playbackSpeedClasses[i].classList.add("amplitude-playback-speed-20");
          break;
      }
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    sync: sync
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = PlaybackSpeedElements;
module.exports = exports["default"];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the shuffle elements
 * @module visual/ShuffleElements
 */
var ShuffleElements = function () {
  /**
   * Syncs the global shuffle button visual state.
   *
   * @access public
   */
  function syncMain() {
    /*
    Gets the shuffle buttons.
    */
    var shuffleButtons = document.getElementsByClassName("amplitude-shuffle");

    /*
    Iterate over all of the shuffle buttons.
    */
    for (var i = 0; i < shuffleButtons.length; i++) {
      /*
      Ensure the shuffle button doesn't belong to a playlist. We have
      a separate method for that.
      */
      if (shuffleButtons[i].getAttribute("data-amplitude-playlist") == null) {
        /*
        If the state of the player is shuffled on, true, then
        we add the 'amplitude-shuffle-on' class and remove the
        'amplitude-shuffle-off' class. If the player is not shuffled
        then we do the opposite.
        */
        if (_config2.default.shuffle_on) {
          shuffleButtons[i].classList.add("amplitude-shuffle-on");
          shuffleButtons[i].classList.remove("amplitude-shuffle-off");
        } else {
          shuffleButtons[i].classList.add("amplitude-shuffle-off");
          shuffleButtons[i].classList.remove("amplitude-shuffle-on");
        }
      }
    }
  }

  /**
   * Syncs the playlist shuffle button visual state.
   *
   * @access public
   * @param {string} playlist - The playlist string the shuffle button belongs to.
   */
  function syncPlaylist(playlist) {
    /*
    Gets all of the shuffle buttons.
    */
    var shuffleButtons = document.querySelectorAll('.amplitude-shuffle[data-amplitude-playlist="' + playlist + '"]');

    /*
    Iterate over all of the shuffle buttons
    */
    for (var i = 0; i < shuffleButtons.length; i++) {
      /*
      If the state of the playlist is shuffled on, true, then
      we add the 'amplitude-shuffle-on' class and remove the
      'amplitude-shuffle-off' class. If the player is not shuffled
      then we do the opposite.
      */
      if (_config2.default.playlists[playlist].shuffle) {
        shuffleButtons[i].classList.add("amplitude-shuffle-on");
        shuffleButtons[i].classList.remove("amplitude-shuffle-off");
      } else {
        shuffleButtons[i].classList.add("amplitude-shuffle-off");
        shuffleButtons[i].classList.remove("amplitude-shuffle-on");
      }
    }
  }

  /**
   * Returns public facing methods
   */
  return {
    syncMain: syncMain,
    syncPlaylist: syncPlaylist
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = ShuffleElements;
module.exports = exports["default"];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the syncing of the song played progress elements.
 *
 * @module visual/SongPlayedProgressElements
 */
var SongPlayedProgressElements = function () {
  /**
   * Syncs the song played progress bars. These are HTML5 progress elements.
   *
   * @access private
   * @param {number} songPlayedPercentage  	- The percentage of the song that has been played.
   */
  function sync(songPlayedPercentage) {
    syncGlobal(songPlayedPercentage);
    syncPlaylist(songPlayedPercentage);
    syncSong(songPlayedPercentage);
    syncSongInPlaylist(songPlayedPercentage);
  }

  /**
   * Sync how much has been played with a progress bar. This is the global progress bar.
   *
   * @access private
   * @param {number} songPlayedPercentage 	- The percent of the song completed.
   */
  function syncGlobal(percentage) {
    /*
    Ensure that the song completion percentage is a number
    */
    if (!isNaN(percentage)) {
      /*
      Get all of the song progress bars
      */
      var songPlayedProgressBars = document.querySelectorAll(".amplitude-song-played-progress");

      for (var i = 0; i < songPlayedProgressBars.length; i++) {
        var playlist = songPlayedProgressBars[i].getAttribute("data-amplitude-playlist");
        var songIndex = songPlayedProgressBars[i].getAttribute("data-amplitude-song-index");

        if (playlist == null && songIndex == null) {
          var max = songPlayedProgressBars[i].max;

          songPlayedProgressBars[i].value = percentage / 100 * max;
        }
      }
    }
  }

  /**
   * Sync how much has been played with a progress bar. This is the playlist progress bar.
   *
   * @access public
   * @param {number} songPlayedPercentage 	- The percent of the song completed.
   */
  function syncPlaylist(percentage) {
    /*
    Ensure that the song completion percentage is a number
    */
    if (!isNaN(percentage)) {
      /*
      Get all of the song progress bars
      */
      var songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

      for (var i = 0; i < songPlayedProgressBars.length; i++) {
        var song = songPlayedProgressBars[i].getAttribute("data-amplitude-song-index");

        if (song == null) {
          var max = songPlayedProgressBars[i].max;

          songPlayedProgressBars[i].value = percentage / 100 * max;
        }
      }
    }
  }

  /**
   * Sync how much has been played with a progress bar. This is for an individual song.
   *
   * @access private
   * @param {number} songPlayedPercentage 	- The percent of the song completed.
   */
  function syncSong(percentage) {
    if (_config2.default.active_playlist == null) {
      /*
      Ensure that the song completion percentage is a number
      */
      if (!isNaN(percentage)) {
        /*
        Get all of the song progress bars
        */
        var songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[data-amplitude-song-index="' + _config2.default.active_index + '"]');

        for (var i = 0; i < songPlayedProgressBars.length; i++) {
          var playlist = songPlayedProgressBars[i].getAttribute("data-amplitude-playlist");

          if (playlist == null) {
            var max = songPlayedProgressBars[i].max;

            songPlayedProgressBars[i].value = percentage / 100 * max;
          }
        }
      }
    }
  }

  /**
   * Sync how much has been played with a progress bar. This is for an individual song in playlist.
   *
   * @access private
   * @param {number} songPlayedPercentage 	- The percent of the song completed.
   */
  function syncSongInPlaylist(percentage) {
    /*
    Ensure that the song completion percentage is a number
    */
    if (!isNaN(percentage)) {
      var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

      /*
      Get all of the song progress bars
      */
      var songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

      /*
        Iterates over all of the song played progress elements
        and sets them accordingly.
      */
      for (var i = 0; i < songPlayedProgressBars.length; i++) {
        var playlist = songPlayedProgressBars[i].getAttribute("data-amplitude-playlist");
        var songIndex = songPlayedProgressBars[i].getAttribute("data-amplitude-song-index");

        if (playlist != null && songIndex != null) {
          var max = songPlayedProgressBars[i].max;

          songPlayedProgressBars[i].value = percentage / 100 * max;
        }
      }
    }
  }

  /**
   * Sets all of the song played progress bars to 0
   *
   * @access public
   */
  function resetElements() {
    var songPlayedProgressBars = document.getElementsByClassName("amplitude-song-played-progress");

    for (var i = 0; i < songPlayedProgressBars.length; i++) {
      songPlayedProgressBars[i].value = 0;
    }
  }

  return {
    sync: sync,
    resetElements: resetElements
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = SongPlayedProgressElements;
module.exports = exports["default"];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Imports the config module
                                                                                                                                                                                                                                                                               * @module config
                                                                                                                                                                                                                                                                               */


/**
 * AmplitudeJS Core Module
 * @module core/Core
 */


/**
 * AmplitudeJS SoundCloud Module
 * @module soundcloud/SoundCloud
 */


/**
 * Imports the utilities used by the main module.
 */
/**
 * AmplitudeJS Config State Module
 * @module utilities/ConfigState
 */


/**
 * AmplitudeJS Debug Module
 * @module utilities/Debug
 */


/**
 * AmplitudeJS Checks Module
 * @module utilities/Checks
 */


/**
 * AmplitudeJS Shuffler Module
 * @module utilities/Shuffler
 */


/**
 * AmplitudeJS Events Module
 * @module events/Events
 */


/**
 * AmplitudeJS FX Module
 * @module fx/Fx
 */


/**
 * AmplitudeJS Visualizations Module
 * @module fx/Visualizations
 */


/**
 * AmplitudeJS WaveForm Module
 * @module fx/WaveForm
 */


/**
 * AmplitudeJS Audio Navigation Module.
 * @module utilities/AudioNavigation
 */


/**
 * AmplitudeJS Callbacks Module
 * @module utilities/Callbacks
 */


/**
 * AmplitudeJS Playlists Initializer Module
 * @module init/Playlists
 */


/**
 * Imports the AmplitudeJS Shuffle Elements
 * @module visual/ShuffleElements
 */


/**
 * Imports the AmplitudeJS Mute Elements
 * @module visual/MuteElements
 */


/**
 * Imports the AmplitudeJS Volume Slider
 * @module visual/VolumeSliderElements
 */


/**
 * Imports the AmplitudeJS Time Elements
 * @module visual/TimeElements
 */


/**
 * Imports the AmplitudeJS Play/Pause Elements Module.
 * @module visual/PlayPauseElements
 */


/**
 * Imports the AmplitudeJS MetaData Elements Module.
 * @module visual/MetaDataElements
 */


/**
 * Imports the AmplitudeJS PlaybackSpeedElements Module.
 * @module visual/PlayBackSpeedElements
 */


/**
 * Imports the AmplitudeJS Repeat Element
 * @module visual/RepeatElements
 */


var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _soundcloud = __webpack_require__(17);

var _soundcloud2 = _interopRequireDefault(_soundcloud);

var _configState = __webpack_require__(6);

var _configState2 = _interopRequireDefault(_configState);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _shuffler = __webpack_require__(13);

var _shuffler2 = _interopRequireDefault(_shuffler);

var _events = __webpack_require__(26);

var _events2 = _interopRequireDefault(_events);

var _fx = __webpack_require__(46);

var _fx2 = _interopRequireDefault(_fx);

var _visualizations = __webpack_require__(16);

var _visualizations2 = _interopRequireDefault(_visualizations);

var _waveform = __webpack_require__(22);

var _waveform2 = _interopRequireDefault(_waveform);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _callbacks = __webpack_require__(9);

var _callbacks2 = _interopRequireDefault(_callbacks);

var _playlists = __webpack_require__(48);

var _playlists2 = _interopRequireDefault(_playlists);

var _shuffleElements = __webpack_require__(19);

var _shuffleElements2 = _interopRequireDefault(_shuffleElements);

var _muteElements = __webpack_require__(10);

var _muteElements2 = _interopRequireDefault(_muteElements);

var _volumeSliderElements = __webpack_require__(11);

var _volumeSliderElements2 = _interopRequireDefault(_volumeSliderElements);

var _timeElements = __webpack_require__(15);

var _timeElements2 = _interopRequireDefault(_timeElements);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

var _metaDataElements = __webpack_require__(7);

var _metaDataElements2 = _interopRequireDefault(_metaDataElements);

var _playbackSpeedElements = __webpack_require__(18);

var _playbackSpeedElements2 = _interopRequireDefault(_playbackSpeedElements);

var _repeatElements = __webpack_require__(8);

var _repeatElements2 = _interopRequireDefault(_repeatElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Initializer Module. Helps with the handling of all of the
 * initialization for AmplitudeJS.
 *
 * @module init/Initializer
 */
var Initializer = function () {
  /**
   * The main init function.  The user will call this through
   * Amplitude.init({}) and pass in their settings.
   *
   * Public Accessor: Amplitude.init( user_config_json )
   * @access public
   * @param {object} userConfig - A JSON object of user defined values that help configure and initialize AmplitudeJS.
   */
  function initialize(userConfig) {
    var ready = false;

    /*
    Reset the config on init so we have a clean slate. This is if the
    user has to re-init.
    */
    _configState2.default.resetConfig();

    /*
    Initialize event handlers on init. This will clear any old
    event handlers on the amplitude element and re-bind what is
    necessary.
    */
    _events2.default.initialize();

    /*
      Initialize the callbacks we listen to for the audio object.
    */
    _callbacks2.default.initialize();

    /*
    Initializes debugging right away so we can use it for the rest
    of the configuration.
    */
    _config2.default.debug = userConfig.debug != undefined ? userConfig.debug : false;

    /*
      Set default artwork, if specified.
    */
    setArt(userConfig);

    /*
    Checks to see if the user has songs defined.
    */
    if (userConfig.songs) {
      /*
      Checks to see if the user has some songs in the songs array.
      */
      if (userConfig.songs.length != 0) {
        /*
        Copies over the user defined songs. and prepares
        Amplitude for the rest of the configuration.
        */
        _config2.default.songs = userConfig.songs;
        /*
        Flag amplitude as ready.
        */
        ready = true;
      } else {
        _debug2.default.writeMessage("Please add some songs, to your songs object!");
      }
    } else {
      _debug2.default.writeMessage("Please provide a songs object for AmplitudeJS to run!");
    }

    /*
    Initializes the audio context. In this method it checks to see if the
    user wants to use visualizations or not before proceeding.
    */
    if (_fx2.default.webAudioAPIAvailable()) {
      if (_fx2.default.determineUsingAnyFX()) {
        /*
          Configure the Web Audio API If It's available.
        */
        _fx2.default.configureWebAudioAPI();

        /*
            Activates the audio context after an event for the user.
        */
        document.documentElement.addEventListener("mousedown", function () {
          if (_config2.default.context.state !== "running") {
            _config2.default.context.resume();
          }
        });

        document.documentElement.addEventListener("keydown", function () {
          if (_config2.default.context.state !== "running") {
            _config2.default.context.resume();
          }
        });

        document.documentElement.addEventListener("keyup", function () {
          if (_config2.default.context.state !== "running") {
            _config2.default.context.resume();
          }
        });

        /*
            Set the user waveform settings if provided.
          */
        if (userConfig.waveforms != undefined && userConfig.waveforms.sample_rate != undefined) {
          _config2.default.waveforms.sample_rate = userConfig.waveforms.sample_rate;
        }

        /*
            Initialize the waveform.
          */
        _waveform2.default.init();

        /*
            If the user is registering visualizations on init,
            we set them right away.
          */
        if (userConfig.visualizations != undefined && userConfig.visualizations.length > 0) {
          /*
                  Iterate over all of the visualizations and
                  register them in our player.
                */
          for (var i = 0; i < userConfig.visualizations.length; i++) {
            _visualizations2.default.register(userConfig.visualizations[i].object, userConfig.visualizations[i].params);
          }
        }
      }
    } else {
      _debug2.default.writeMessage("The Web Audio API is not available on this platform. We are using your defined backups!");
    }

    /*
      Initialize default live settings
    */
    initializeDefaultLiveSettings();

    /*
      Initialize default song indexes
    */
    initializeDefaultSongIndexes();

    /*
    When the preliminary config is ready, we are ready to proceed.
    */
    if (ready) {
      /*
      Copies over the soundcloud information to the global config
      which will determine where we go from there.
      */
      _config2.default.soundcloud_client = userConfig.soundcloud_client != undefined ? userConfig.soundcloud_client : "";

      /*
      Checks if we want to use the art loaded from soundcloud.
      */
      _config2.default.soundcloud_use_art = userConfig.soundcloud_use_art != undefined ? userConfig.soundcloud_use_art : "";

      /*
      If the user provides a soundcloud client then we assume that
      there are URLs in their songs that will reference SoundCloud.
      We then copy over the user config they provided to the
      temp_user_config so we don't mess up the global or their configs
      and load the soundcloud information.
      */
      var tempUserConfig = {};

      /*
        If there's a soundcloud_client key set, we load the SoundCloud data
        for all of the songs in the array.
      */
      if (_config2.default.soundcloud_client != "") {
        tempUserConfig = userConfig;

        /*
        Load up SoundCloud for use with AmplitudeJS.
        */
        _soundcloud2.default.loadSoundCloud(tempUserConfig);
      } else {
        /*
        The user is not using Soundcloud with Amplitude at this point
        so we just finish the configuration with the users's preferences.
        */
        setConfig(userConfig);
      }
    }

    /*
    Debug out what was initialized with AmplitudeJS.
    */
    _debug2.default.writeMessage("Initialized With: ");
    _debug2.default.writeMessage(_config2.default);
  }

  /**
   * Rebinds all of the elements in the display.
   *
   * Public Accessor: Amplitude.rebindDisplay()
   * @access public
   */
  function rebindDisplay() {
    _events2.default.initialize();
    _metaDataElements2.default.displayMetaData();
  }

  /**
   * Finishes the initalization of the config. Takes all of the user defined
   * parameters and makes sure they override the defaults. The important
   * config information is assigned in the publicInit() function.
   *
   * This function can be called from 2 different locations:
   * 	1. Right away on init after the important settings are defined.
   *
   * 	2. After all of the Soundcloud URLs are resolved properly and
   *	 	soundcloud is configured.  We will need the proper URLs from Soundcloud
   * 		to stream through Amplitude so we get those right away before we
   * 		set the information and the active song
   *
   * @access public
   * @param {object} userConfig - A JSON object of user defined values that help configure and initialize AmplitudeJS.
   */
  function setConfig(userConfig) {
    /*
      Checks if the user has any playlists defined. If they do
      we have to initialize the functionality for the playlists.
    */
    if (userConfig.playlists && countPlaylists(userConfig.playlists) > 0) {
      _playlists2.default.initialize(userConfig.playlists);
    }

    /*
    Check to see if the user entered a start song
    */
    if (userConfig.start_song != undefined && !userConfig.starting_playlist) {
      /*
      Ensure what has been entered is an integer.
      */
      if (_checks2.default.isInt(userConfig.start_song)) {
        _audioNavigation2.default.changeSong(_config2.default.songs[userConfig.start_song], userConfig.start_song);
      } else {
        _debug2.default.writeMessage("You must enter an integer index for the start song.");
      }
    } else {
      _audioNavigation2.default.changeSong(_config2.default.songs[0], 0);
    }

    /*
      If the shuffle is on by default, shuffle the songs and
      switch to the shuffled song.
    */
    if (userConfig.shuffle_on != undefined && userConfig.shuffle_on) {
      _config2.default.shuffle_on = true;
      _shuffler2.default.shuffleSongs();

      _audioNavigation2.default.changeSong(_config2.default.shuffle_list[0], 0);
    }

    /*
    Allows the user to set whether they want to continue to the next song
    when the current song finishes or not. In any scenario that's not a playlist,
    contining to the next song may not be desired.
    */
    _config2.default.continue_next = userConfig.continue_next != undefined ? userConfig.continue_next : true;

    /*
    If the user defined a playback speed, we copy over their
    preference here, otherwise we default to normal playback
    speed of 1.0.
    */
    _config2.default.playback_speed = userConfig.playback_speed != undefined ? userConfig.playback_speed : 1.0;

    /*
    Sets the audio playback speed.
    */
    _core2.default.setPlaybackSpeed(_config2.default.playback_speed);

    /*
    If the user wants the song to be pre-loaded for instant
    playback, they set it to true. By default it's set to just
    load the metadata.
    */
    _config2.default.audio.preload = userConfig.preload != undefined ? userConfig.preload : "auto";

    /*
    Initializes the user defined callbacks. This should be a JSON
    object that contains a key->value store of the callback name
    and the name of the function the user needs to call.
    */
    _config2.default.callbacks = userConfig.callbacks != undefined ? userConfig.callbacks : {};

    /*
    Initializes the user defined key bindings. This should be a JSON
    object that contains a key->value store of the key event number
    pressed and the method to be run.
    */
    _config2.default.bindings = userConfig.bindings != undefined ? userConfig.bindings : {};

    /*
    The user can define a starting volume in a range of 0-100 with
    0 being muted and 100 being the loudest. After the config is set
    Amplitude sets the active song's volume to the volume defined
    by the user.
    */
    _config2.default.volume = userConfig.volume != undefined ? userConfig.volume : 50;

    /*
    Sets the delay between songs if the user has it set. This should be in MS.
    */
    _config2.default.delay = userConfig.delay != undefined ? userConfig.delay : 0;

    /*
    The user can set the volume increment and decrement values between 1 and 100
    for when the volume up or down button is pressed.  The default is an increase
    or decrease of 5.
    */
    _config2.default.volume_increment = userConfig.volume_increment != undefined ? userConfig.volume_increment : 5;

    _config2.default.volume_decrement = userConfig.volume_decrement != undefined ? userConfig.volume_decrement : 5;

    /*
    Set the volume to what is defined in the config. The user can define this,
    so we should set it up that way.
    */
    _core2.default.setVolume(_config2.default.volume);

    /*
     Set default artwork, if specified
     */
    setArt(userConfig);

    /*
      Initialize the visual elements
    */
    initializeElements();

    /*
    If the user has selected a starting playlist, we need to set the starting playlist
    and sync the visuals
    */
    if (userConfig.starting_playlist != undefined && userConfig.starting_playlist != "") {
      /*
      Set the active playlist to the starting playlist by the user
      */
      _config2.default.active_playlist = userConfig.starting_playlist;

      /*
      Check if the user defined a song to start with in the playlist.
      */
      if (userConfig.starting_playlist_song != undefined && userConfig.starting_playlist_song != "") {
        /*
        Ensure the song is a valid index.
        */
        if (_typeof(userConfig.playlists[userConfig.starting_playlist].songs[parseInt(userConfig.starting_playlist_song)]) != undefined) {
          /*
          Set the player to the song defined by the user.
          */
          _audioNavigation2.default.changeSongPlaylist(_config2.default.active_playlist, userConfig.playlists[userConfig.starting_playlist].songs[parseInt(userConfig.starting_playlist_song)], parseInt(userConfig.starting_playlist_song));
        } else {
          /*
          Set the player to the first song in the playlist
          */
          _audioNavigation2.default.changeSongPlaylist(_config2.default.active_playlist, userConfig.playlists[userConfig.starting_playlist].songs[0], 0);
          /*
          Debug that the song index doesn't exist
          */
          _debug2.default.writeMessage("The index of " + userConfig.starting_playlist_song + " does not exist in the playlist " + userConfig.starting_playlist);
        }
      } else {
        /*
        Set the player to the first song in the playlist
        */
        _audioNavigation2.default.changeSong(_config2.default.active_playlist, userConfig.playlists[userConfig.starting_playlist].songs[0], 0);
      }

      /*
      Sync the main and song play pause buttons.
      */
      _playPauseElements2.default.sync();
    }

    /*
    Run after init callback
    */
    _callbacks2.default.run("initialized");
  }

  /**
   * Sets the default_album_art and default_playlist_art from the
   * user supplied configuration.
   *
   * @access public
   * @param {object} userConfig - A JSON object of user defined values that help configure and initialize AmplitudeJS.
   */
  function setArt(userConfig) {
    /*
      If the user defines default album art, this image will display if the active
      song doesn't have album art defined.
    */
    if (userConfig.default_album_art != undefined) {
      _config2.default.default_album_art = userConfig.default_album_art;
    } else {
      _config2.default.default_album_art = "";
    }

    /*
    If the user defines default playlist art, this image will display if the user
    tries to set up a playlist meta data image tag but doesn't have one defined.
    */
    if (userConfig.default_playlist_art != undefined) {
      _config2.default.default_playlist_art = userConfig.default_playlist_art;
    } else {
      _config2.default.default_playlist_art = "";
    }
  }

  /**
   * Initializes all of the elements on the page to the default starting point
   * to build from there.
   *
   * @access private
   */
  function initializeElements() {
    /*
    Visually sync the shuffle statuses
    */
    _shuffleElements2.default.syncMain();

    /*
    Sync Mute Elements.
    */
    _muteElements2.default.setMuted(_config2.default.volume == 0 ? true : false);

    /*
    Sync Volume Slider Elements
    */
    _volumeSliderElements2.default.sync();

    /*
    Syncs all of the playback speed elements.
    */
    _playbackSpeedElements2.default.sync();

    /*
    Syncs all of the visual time elements to 00.
    */
    _timeElements2.default.resetCurrentTimes();

    /*
    Sets all of the play pause buttons to pause.
    */
    _playPauseElements2.default.syncToPause();

    /*
    Sets the meta data for the songs automatically.
    */
    _metaDataElements2.default.syncMetaData();

    /*
    Sets the repeat buttons automatically.
    */
    _repeatElements2.default.syncRepeatSong();
  }

  /**
   * Counts the number of playlists the user has configured. This ensures
   * that the user has at least 1 playlist so we can validate the songs
   * defined in the playlist are correct and they didn't enter an invalid
   * ID.
   *
   * @access private
   * @param {object} playlists 	-
   */
  function countPlaylists(playlists) {
    /*
    Initialize the placeholders to iterate through the playlists
    and find out how many we have to account for.
    */
    var size = 0,
        key = void 0;

    /*
    Iterate over playlists and if the user has the playlist defined,
    increment the size of playlists.
    */
    for (key in playlists) {
      if (playlists.hasOwnProperty(key)) {
        size++;
      }
    }

    /*
    Debug how many playlists are in the config.
    */
    _debug2.default.writeMessage("You have " + size + " playlist(s) in your config");

    /*
    Return the number of playlists in the config.
    */
    return size;
  }

  /**
   * Intializes the default live settings for all of the songs.
   *
   * @access private
   */
  function initializeDefaultLiveSettings() {
    for (var i = 0; i < _config2.default.songs.length; i++) {
      if (_config2.default.songs[i].live == undefined) {
        _config2.default.songs[i].live = false;
      }
    }
  }

  /**
   * Initializes the index of the song in the songs array so
   * we can reference it if needed
   *
   * @access private
   */
  function initializeDefaultSongIndexes() {
    for (var i = 0; i < _config2.default.songs.length; i++) {
      _config2.default.songs[i].index = i;
    }
  }

  /*
  Returns the publicly accessible methods
  */
  return {
    initialize: initialize,
    setConfig: setConfig,
    rebindDisplay: rebindDisplay
  };
}();

exports.default = Initializer;
module.exports = exports["default"];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Builds a waveform for the current audio.
 * Help from: https://robots.thoughtbot.com/javascript-audio-api
 * https://stackoverflow.com/questions/21347833/html-svg-not-drawing-works-in-other-pages
 */
var WaveForm = function () {
  /*
    Initialize the local variables used in the Waveform.
  */
  var buffer = "";
  var sampleRate = "";
  var peaks = "";

  function init() {
    sampleRate = _config2.default.waveforms.sample_rate;

    /*
      Grabs all of the waveform elements on the page.
    */
    var waveforms = document.querySelectorAll(".amplitude-wave-form");

    /*
      If there are waveforms, we iterate over them and set them up to display
      properly.
    */
    if (waveforms.length > 0) {
      /*
        Iterate over all of the waveforms and build the SVG parts.
      */
      for (var i = 0; i < waveforms.length; i++) {
        /*
          Clear the inner HTML of the element if we are replacing the waveform.
        */
        waveforms[i].innerHTML = "";

        /*
          Inserts an SVG into the element.
        */
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 -1 " + sampleRate + " 2");
        svg.setAttribute("preserveAspectRatio", "none");

        /*
          Add a g component to the SVG
        */
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        svg.appendChild(g);

        /*
          Add a path component to the g
        */
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "");
        path.setAttribute("id", "waveform");

        g.appendChild(path);

        /*
          Append the SVG to the waveform.
        */
        waveforms[i].appendChild(svg);
      }
    }
  }

  /**
   * Builds each waveform for the page.
   */
  function build() {
    if (_config2.default.web_audio_api_available) {
      /*
        If we don't have the wave form built, we need to build the waveform by loading
        the src with an array buffer.
      */
      if (_config2.default.waveforms.built[Math.abs(_config2.default.audio.src.split("").reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0))] == undefined) {
        /*
          Initializes a new XML Http Request.
        */
        var req = new XMLHttpRequest();

        /*
          Opens the src parameter for the audio file to read in.
        */
        req.open("GET", _config2.default.audio.src, true);
        req.responseType = "arraybuffer";

        /*
          When the ready state changes, check to see if we can render the
          wave form.
        */
        req.onreadystatechange = function (e) {
          /*
            When the request is complete, then we begin decoding the
            audio to build the waveform.
          */
          if (req.readyState == 4) {
            /*
              If the status is 200 means the response is a success and
              we decode the audio data.
            */
            if (req.status == 200) {
              /*
                Decode the audio data and process the waveform.
              */
              _config2.default.context.decodeAudioData(req.response, function (bufferedAudio) {
                /*
                  Set the buffer to the audio returned.
                */
                buffer = bufferedAudio;

                /*
                  Get the peaks in the audio.
                */
                peaks = getPeaks(sampleRate, buffer);

                /*
                  Build the SVG
                */
                process(sampleRate, buffer, peaks);
              });
            }
          }
        };
        req.send();
      } else {
        /*
          If we already have a waveform, we grab the waveform that
          was created for the song and display it. We do a simple hash
          of the song URL so it's already unique.
        */
        displayWaveForms(_config2.default.waveforms.built[Math.abs(_config2.default.audio.src.split("").reduce(function (a, b) {
          a = (a << 5) - a + b.charCodeAt(0);
          return a & a;
        }, 0))]);
      }
    }
  }

  /**
   * Processes the audio and generates the waveform.
   *
   * @param {sampleRate} sampleRate - The rate we should sample the audio.
   * @param {arraybuffer} buffer - The Web Audio API
   * @param {array} peaks - The peaks in the audio.
   */
  function process(sampleRate, buffer, peaks) {
    /*
      If we have a buffer, we find the peaks in the audio.
    */
    if (buffer) {
      /*
        Get the total peaks in the song.
      */
      var totalPeaks = peaks.length;

      /*
        Figure out the depth of the peak.
      */
      var d = "";
      for (var peakNumber = 0; peakNumber < totalPeaks; peakNumber++) {
        if (peakNumber % 2 === 0) {
          d += " M" + ~~(peakNumber / 2) + ", " + peaks.shift();
        } else {
          d += " L" + ~~(peakNumber / 2) + ", " + peaks.shift();
        }
      }

      /*
        Add the waveform to the built waveforms array.
      */
      _config2.default.waveforms.built[Math.abs(_config2.default.audio.src.split("").reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0))] = d;

      /*
        Display the waveform.
      */
      displayWaveForms(_config2.default.waveforms.built[Math.abs(_config2.default.audio.src.split("").reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0))]);
    }
  }

  /**
   * Get the peaks of the audio for the waveform.
   *
   * @param {number} length - The sample size of the audio.
   * @param {array} buffer - The array buffer used to find the peaks in the audio.
   */
  function getPeaks(length, buffer) {
    /*
      Set the parameters needed to build the SVG.
    */
    var sampleSize = buffer.length / length;
    var sampleStep = ~~(sampleSize / 10) || 1;
    var numberOfChannels = buffer.numberOfChannels;
    var mergedPeaks = [];

    /*
      Iterate over the channels and find the peaks.
    */
    for (var channelNumber = 0; channelNumber < numberOfChannels; channelNumber++) {
      /*
        Initialize the peaks array and set the channel data to what
        the buffer has in its channel data.
      */
      var _peaks = [];
      var channelData = buffer.getChannelData(channelNumber);

      /*
        Iterate over peaks with respect to the sample size.
      */
      for (var peakNumber = 0; peakNumber < length; peakNumber++) {
        /*
          Gt the start and end peak.
        */
        var start = ~~(peakNumber * sampleSize);
        var end = ~~(start + sampleSize);

        /*
          Set min and max to the channel data first peak.
        */
        var min = channelData[0];
        var max = channelData[0];

        /*
          Iterate over the parts of the song starting to the
          ending to display the waveform.
        */
        for (var sampleIndex = start; sampleIndex < end; sampleIndex += sampleStep) {
          var value = channelData[sampleIndex];

          if (value > max) {
            max = value;
          }
          if (value < min) {
            min = value;
          }
        }

        /*
          Set the max and min for the peak.
        */
        _peaks[2 * peakNumber] = max;
        _peaks[2 * peakNumber + 1] = min;

        /*
          Merge the peaks
        */
        if (channelNumber === 0 || max > mergedPeaks[2 * peakNumber]) {
          mergedPeaks[2 * peakNumber] = max;
        }

        if (channelNumber === 0 || min < mergedPeaks[2 * peakNumber + 1]) {
          mergedPeaks[2 * peakNumber + 1] = min;
        }
      }
    }

    /*
      Returns the merged peaks.
    */
    return mergedPeaks;
  }

  /**
   * Displays all of the waveforms necessary.
   *
   * @param {path} svg - The drawing of the waveform.
   */
  function displayWaveForms(svg) {
    var waveformElements = document.querySelectorAll(".amplitude-wave-form");

    /*
      Iterate over all of the waveform elements and
      display the waveform.
    */
    for (var i = 0; i < waveformElements.length; i++) {
      /*
        Get the playlist attribute of the waveform element.
      */
      var playlist = waveformElements[i].getAttribute("data-amplitude-playlist");

      /*
        Get the song index attribute of the waveform element.
      */
      var song = waveformElements[i].getAttribute("data-amplitude-song-index");

      /*
        If the playlist is null and the song is null it's a global element.
      */
      if (playlist == null && song == null) {
        displayGlobalWaveform(waveformElements[i], svg);
      }

      /*
        If the playlist is defined but the song is null it's a playlist element.
      */
      if (playlist != null && song == null) {
        displayPlaylistWaveform(waveformElements[i], svg, playlist);
      }

      /*
        If the playlist is not defined and the song is not null it's a song
        element.
      */
      if (playlist == null && song != null) {
        displaySongWaveform(waveformElements[i], svg, song);
      }

      /*
        If the playlist and song are defined it's a song in the playlist element.
      */
      if (playlist != null && song != null) {
        displaySongInPlaylistWaveform(waveformElements[i], svg, playlist, song);
      }
    }
  }

  /**
   * Displays a global wave form.
   *
   * @param {Node} element - Element to display the waveform in.
   * @param {SVG} svg - The waveform path.
   */
  function displayGlobalWaveform(element, svg) {
    var waveformPath = element.querySelector("svg g path");

    waveformPath.setAttribute("d", svg);
  }

  /**
   * Displays a playlist wave form.
   *
   * @param {Node} element - Element to display the waveform in.
   * @param {SVG} svg - The waveform path.
   * @param {string} playlist - The playlist we are displaying the waveform for.
   */
  function displayPlaylistWaveform(element, svg, playlist) {
    /*
      Ensure the playlist is the active playlist.
    */
    if (_config2.default.active_playlist == playlist) {
      var waveformPath = element.querySelector("svg g path");

      waveformPath.setAttribute("d", svg);
    }
  }

  /**
   * Displays a song wave form.
   *
   * @param {Node} element - Element to display the waveform in.
   * @param {SVG} svg - The waveform path.
   * @param {Integer} song - The index of the song we are displaying the
   * waveform for.
   */
  function displaySongWaveform(element, svg, song) {
    /*
      Ensure it's the active song being displayed.
    */
    if (_config2.default.active_index == song) {
      var waveformPath = element.querySelector("svg g path");

      waveformPath.setAttribute("d", svg);
    }
  }

  /**
   * Displays a song in playlist waveform.
   *
   * @param {Node} element - Element to display the waveform in.
   * @param {SVG} svg - The waveform path.
   * @param {String} playlist - The playlist the waveform is in.
   * @param {Integer} song - The index of the song we are displaying the waveform for.
   */
  function displaySongInPlaylistWaveform(element, svg, playlist, song) {
    /*
      Ensure it's the active song in the active playlist.
    */
    if (_config2.default.active_playlist == playlist && _config2.default.playlists[_config2.default.active_playlist].active_index == song) {
      var waveformPath = element.querySelector("svg g path");

      waveformPath.setAttribute("d", svg);
    }
  }

  /**
   * Determines if the user is using waveforms
   */
  function determineIfUsingWaveforms() {
    var waveforms = document.querySelectorAll(".amplitude-wave-form");

    if (waveforms.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  /*
    Return the public methods.
  */
  return {
    init: init,
    build: build,
    determineIfUsingWaveforms: determineIfUsingWaveforms
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = WaveForm;
module.exports = exports["default"];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The utility to handle the computation of time in AmplitudeJS.
 * @module utilities/Time
 */
var Time = function () {
  /**
   * Computes the current song time. Breaks down where the song is into
   * hours, minutes, seconds and formats it to be displayed to the user.
   *
   * @access public
   */
  function computeCurrentTimes() {
    /*
    Initialize the current time object that will be returned.
    */
    var currentTime = {};

    /*
    Computes the current seconds for the song.
    */
    var currentSeconds = (Math.floor(_config2.default.audio.currentTime % 60) < 10 ? "0" : "") + Math.floor(_config2.default.audio.currentTime % 60);

    /*
    Computes the current minutes for the song.
    */
    var currentMinutes = Math.floor(_config2.default.audio.currentTime / 60);

    /*
    Initialize the current hours variable.
    */
    var currentHours = "00";

    /*
    If the current minutes is less than 10, we add a leading 0.
    */
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }

    /*
    If the user is more than 60 minutes into the song, then
    we extract the hours.
    */
    if (currentMinutes >= 60) {
      currentHours = Math.floor(currentMinutes / 60);
      currentMinutes = currentMinutes % 60;

      /*
      If the user is less than 10 minutes in, we append the
      additional 0 to the minutes.
      */
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
    }

    /*
    Build a clean current time object and send back the appropriate information.
    */
    currentTime.seconds = currentSeconds;
    currentTime.minutes = currentMinutes;
    currentTime.hours = currentHours;

    return currentTime;
  }

  /**
   * Computes the current song duration. Breaks down where the song is into
   * hours, minutes, seconds and formats it to be displayed to the user.
   *
   * @access public
   */
  function computeSongDuration() {
    /*
    Initialize the song duration object that will be returned.
    */
    var songDuration = {};

    /*
    Computes the duration of the song's seconds.
    */
    var songDurationSeconds = (Math.floor(_config2.default.audio.duration % 60) < 10 ? "0" : "") + Math.floor(_config2.default.audio.duration % 60);

    /*
    Computes the duration of the song's minutes.
    */
    var songDurationMinutes = Math.floor(_config2.default.audio.duration / 60);

    /*
    Initialize the hours duration variable.
    */
    var songDurationHours = "00";

    /*
    If the song duration minutes is less than 10, we add a leading 0.
    */
    if (songDurationMinutes < 10) {
      songDurationMinutes = "0" + songDurationMinutes;
    }

    /*
    If there is more than 60 minutes in the song, then we
    extract the hours.
    */
    if (songDurationMinutes >= 60) {
      songDurationHours = Math.floor(songDurationMinutes / 60);
      songDurationMinutes = songDurationMinutes % 60;

      /*
      If the song duration minutes is less than 10 we append
      the additional 0.
      */
      if (songDurationMinutes < 10) {
        songDurationMinutes = "0" + songDurationMinutes;
      }
    }

    /*
    Build a clean song duration object and send back the appropriate information.
    */
    songDuration.seconds = isNaN(songDurationSeconds) ? "00" : songDurationSeconds;
    songDuration.minutes = isNaN(songDurationMinutes) ? "00" : songDurationMinutes;
    songDuration.hours = isNaN(songDurationHours) ? "00" : songDurationHours.toString();

    return songDuration;
  }

  /**
   * Computes the song completion percentage.
   *
   * @access public
   */
  function computeSongCompletionPercentage() {
    return _config2.default.audio.currentTime / _config2.default.audio.duration * 100;
  }

  /**
   * Sets the current time for the audio.
   *
   * @access public
   */
  function setCurrentTime(time) {
    /*
      If the song is not live, we can set the current time.
    */
    if (!_config2.default.active_metadata.live) {
      /*
        Makes sure the number is finite to set the time.
      */
      if (isFinite(time)) {
        _config2.default.audio.currentTime = time;
      }
    }
  }

  /**
   * Defines what is returned by the module
   */
  return {
    computeCurrentTimes: computeCurrentTimes,
    computeSongDuration: computeSongDuration,
    computeSongCompletionPercentage: computeSongCompletionPercentage,
    setCurrentTime: setCurrentTime
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = Time;
module.exports = exports["default"];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Visual Handler for Buffered Progress Elements
 *
 * @module visual/BufferedProgressElements
 */
var BufferedProgressElements = function () {
  /**
   * Syncs the buffered progress bars to the current percentage in the config
   *
   * @access public
   */
  function sync() {
    syncGlobal();
    syncPlaylist();
    syncSong();
    syncSongInPlaylist();
  }

  /**
   * Sync the global song buffered progress elements.
   */
  function syncGlobal() {
    /*
    Gets all of the song buffered progress bars.
    */
    var songBufferedProgressBars = document.getElementsByClassName("amplitude-buffered-progress");

    /*
    Iterate over all of the song buffered progress bar and
    set them to 0 which is like re-setting them.
    */
    for (var i = 0; i < songBufferedProgressBars.length; i++) {
      var playlist = songBufferedProgressBars[i].getAttribute("data-amplitude-playlist");
      var song = songBufferedProgressBars[i].getAttribute("data-amplitude-song-index");

      if (playlist == null && song == null && !isNaN(_config2.default.buffered)) {
        songBufferedProgressBars[i].value = parseFloat(parseFloat(_config2.default.buffered) / 100);
      }
    }
  }

  /**
   * Sync the playlist song buffered progress elements.
   */
  function syncPlaylist() {
    /*
    Gets all of the song buffered progress bars.
    */
    var songBufferedProgressBarsPlaylist = document.querySelectorAll('.amplitude-buffered-progress[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
    Iterate over all of the song buffered progress bar and
    set them to 0 which is like re-setting them.
    */
    for (var i = 0; i < songBufferedProgressBarsPlaylist.length; i++) {
      var song = songBufferedProgressBarsPlaylist[i].getAttribute("data-amplitude-song-index");

      if (song == null && !isNaN(_config2.default.buffered)) {
        songBufferedProgressBarsPlaylist[i].value = parseFloat(parseFloat(_config2.default.buffered) / 100);
      }
    }
  }

  /**
   * Sync the song song buffered progress elements.
   */
  function syncSong() {
    /*
    Gets all of the song buffered progress bars.
    */
    var songBufferedProgressBarsSongs = document.querySelectorAll('.amplitude-buffered-progress[data-amplitude-song-index="' + _config2.default.active_index + '"]');

    /*
    Iterate over all of the song buffered progress bar and
    set them to 0 which is like re-setting them.
    */
    for (var i = 0; i < songBufferedProgressBarsSongs.length; i++) {
      var playlist = songBufferedProgressBarsSongs[i].getAttribute("data-amplitude-playlist");

      if (playlist == null && !isNaN(_config2.default.buffered)) {
        songBufferedProgressBarsSongs[i].value = parseFloat(parseFloat(_config2.default.buffered) / 100);
      }
    }
  }

  /**
   * Sync the song in playlist song buffered progress elements.
   */
  function syncSongInPlaylist() {
    var activePlaylistIndex = _config2.default.active_playlist != null && _config2.default.active_playlist != "" ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    /*
    Gets all of the song buffered progress bars.
    */
    var songBufferedProgressBarsSongsInPlaylist = document.querySelectorAll('.amplitude-buffered-progress[data-amplitude-song-index="' + activePlaylistIndex + '"][data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
    Iterate over all of the song buffered progress bar and
    set them to 0 which is like re-setting them.
    */
    for (var i = 0; i < songBufferedProgressBarsSongsInPlaylist.length; i++) {
      if (!isNaN(_config2.default.buffered)) {
        songBufferedProgressBarsSongsInPlaylist[i].value = parseFloat(parseFloat(_config2.default.buffered) / 100);
      }
    }
  }

  /**
   * Sets all of the song buffered progress bars to 0
   *
   * @access public
   */
  function reset() {
    /*
    Gets all of the song buffered progress bars.
    */
    var songBufferedProgressBars = document.getElementsByClassName("amplitude-buffered-progress");

    /*
    Iterate over all of the song buffered progress bar and
    set them to 0 which is like re-setting them.
    */
    for (var i = 0; i < songBufferedProgressBars.length; i++) {
      songBufferedProgressBars[i].value = 0;
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    sync: sync,
    reset: reset
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = BufferedProgressElements;
module.exports = exports["default"];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Ended Module. Handles the ended event on the audio.
 *
 * @module events/Ended
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */
/**
 * Imports the config module
 * @module config
 */
var Ended = function () {
  /**
   * When the song has ended, handles what to do next
   *
   * HANDLER FOR: ended
   *
   * @access public
   */
  function handle() {
    /*
      Sets the time out for song ended. This determines if
      we should go to the next song or delay between songs.
    */
    setTimeout(function () {
      /*
        If we continue next, we should move to the next song in the playlist.
      */
      if (_config2.default.continue_next) {
        /*
        If the active playlist is not set, we set the
        next song that's in the songs array.
        */
        if (_config2.default.active_playlist == "" || _config2.default.active_playlist == null) {
          _audioNavigation2.default.setNext(true);
        } else {
          _audioNavigation2.default.setNextPlaylist(_config2.default.active_playlist, true);
        }
      } else {
        if (!_config2.default.is_touch_moving) {
          /*
          Stops the active song.
          */
          _core2.default.stop();

          /*
            Sync the play pause elements.
          */
          _playPauseElements2.default.sync();
        }
      }
    }, _config2.default.delay);
  }

  /*
    Returns the public facing methods.
  */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Play Pause Elements
 * @module visual/PlayPauseElements
 */


/**
 * Imports the Audio Navigation Utility
 * @module utilities/AudioNavigation
 */
exports.default = Ended;
module.exports = exports["default"];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _keydown = __webpack_require__(27);

var _keydown2 = _interopRequireDefault(_keydown);

var _timeUpdate = __webpack_require__(42);

var _timeUpdate2 = _interopRequireDefault(_timeUpdate);

var _ended = __webpack_require__(25);

var _ended2 = _interopRequireDefault(_ended);

var _progress = __webpack_require__(35);

var _progress2 = _interopRequireDefault(_progress);

var _play = __webpack_require__(31);

var _play2 = _interopRequireDefault(_play);

var _pause = __webpack_require__(30);

var _pause2 = _interopRequireDefault(_pause);

var _playPause = __webpack_require__(32);

var _playPause2 = _interopRequireDefault(_playPause);

var _stop = __webpack_require__(41);

var _stop2 = _interopRequireDefault(_stop);

var _mute = __webpack_require__(28);

var _mute2 = _interopRequireDefault(_mute);

var _volumeUp = __webpack_require__(45);

var _volumeUp2 = _interopRequireDefault(_volumeUp);

var _volumeDown = __webpack_require__(43);

var _volumeDown2 = _interopRequireDefault(_volumeDown);

var _songSlider = __webpack_require__(40);

var _songSlider2 = _interopRequireDefault(_songSlider);

var _volumeSlider = __webpack_require__(44);

var _volumeSlider2 = _interopRequireDefault(_volumeSlider);

var _next = __webpack_require__(29);

var _next2 = _interopRequireDefault(_next);

var _prev = __webpack_require__(34);

var _prev2 = _interopRequireDefault(_prev);

var _repeat = __webpack_require__(36);

var _repeat2 = _interopRequireDefault(_repeat);

var _repeatSong = __webpack_require__(37);

var _repeatSong2 = _interopRequireDefault(_repeatSong);

var _playbackSpeed = __webpack_require__(33);

var _playbackSpeed2 = _interopRequireDefault(_playbackSpeed);

var _shuffle = __webpack_require__(38);

var _shuffle2 = _interopRequireDefault(_shuffle);

var _skipTo = __webpack_require__(39);

var _skipTo2 = _interopRequireDefault(_skipTo);

var _waveform = __webpack_require__(22);

var _waveform2 = _interopRequireDefault(_waveform);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Events Module. Handles all of the events we listen to in
 * AmplitudeJS.
 *
 * @module events/Events
 */


/**
 * Imports all of the handler objects used by the events.
 */
var Events = function () {
  /**
   * Initializes the handlers for the events listened to by Amplitude
   *
   * @access public
   */
  function initialize() {
    /*
    Write out debug message
    */
    _debug2.default.writeMessage("Beginning initialization of event handlers..");

    /*
    Sets flag that the screen is moving and not a tap
    */
    document.addEventListener("touchmove", function () {
      _config2.default.is_touch_moving = true;
    });

    /*
    On touch end if it was a touch move event, set moving to
    false
    */
    document.addEventListener("touchend", function () {
      if (_config2.default.is_touch_moving) {
        _config2.default.is_touch_moving = false;
      }
    });

    /*
    On time update for the audio element, update visual displays that
    represent the time on either a visualized element or time display.
    */
    bindTimeUpdate();

    /*
    Binds key down event handlers for matching key codes to functions.
    */
    bindKeyDownEventHandlers();

    /*
    When the audio element has ended playing, we handle the song
    ending. In a single song or multiple modular song instance,
    this just synchronizes the visuals for time and song time
    visualization, but for a playlist it determines whether
    it should play the next song or not.
    */
    bindSongEnded();

    /*
    Binds progress event so we can see how much of the song is loaded.
    */
    bindProgress();

    /*
    Binds 'amplitude-play' event handlers
    */
    bindPlay();

    /*
    Binds 'amplitude-pause' event handlers.
    */
    bindPause();

    /*
    Binds 'amplitude-play-pause' event handlers.
    */
    bindPlayPause();

    /*
    Binds 'amplitude-stop' event handlers.
    */
    bindStop();

    /*
    Binds 'amplitude-mute' event handlers.
    */
    bindMute();

    /*
    Binds 'amplitude-volume-up' event handlers
    */
    bindVolumeUp();

    /*
    Binds 'amplitude-volume-down' event handlers
    */
    bindVolumeDown();

    /*
    Binds 'amplitude-song-slider' event handlers
    */
    bindSongSlider();

    /*
    Binds 'amplitude-volume-slider' event handlers.
    */
    bindVolumeSlider();

    /*
    Binds 'amplitude-next' event handlers.
    */
    bindNext();

    /*
    Binds 'amplitude-prev' event handlers.
    */
    bindPrev();

    /*
    Binds 'amplitude-shuffle' event handlers.
    */
    bindShuffle();

    /*
    Binds 'amplitude-repeat' event handlers.
    */
    bindRepeat();

    /*
    Binds 'amplitude-repeat-song' event handlers.
    */
    bindRepeatSong();

    /*
    Binds 'amplitude-playback-speed' event handlers.
    */
    bindPlaybackSpeed();

    /*
    Binds 'amplitude-skip-to' event handlers.
    */
    bindSkipTo();

    /*
    Binds `canplaythrough` event to build the waveform.
    */
    bindCanPlayThrough();
  }

  /**
   * On time update for the audio element, update visual displays that
   * represent the time on either a visualized element or time display.
   *
   * @access private
   */
  function bindTimeUpdate() {
    /*
    Bind for time update
    */
    _config2.default.audio.removeEventListener("timeupdate", _timeUpdate2.default.handle);
    _config2.default.audio.addEventListener("timeupdate", _timeUpdate2.default.handle);

    /*
    Bind for duration change
    */
    _config2.default.audio.removeEventListener("durationchange", _timeUpdate2.default.handle);
    _config2.default.audio.addEventListener("durationchange", _timeUpdate2.default.handle);
  }

  /**
   * On keydown, we listen to what key got pressed so we can map the key to
   * a function. This allows the user to map pause and play, next, etc. to key
   * presses.
   *
   * @access private
   */
  function bindKeyDownEventHandlers() {
    document.removeEventListener("keydown", _keydown2.default.handle);
    document.addEventListener("keydown", _keydown2.default.handle);
  }

  /**
   * When the audio element has ended playing, we handle the song
   * ending. In a single song or multiple modular song instance,
   * this just synchronizes the visuals for time and song time
   * visualization, but for a playlist it determines whether
   * it should play the next song or not.
   *
   * @access private
   */
  function bindSongEnded() {
    _config2.default.audio.removeEventListener("ended", _ended2.default.handle);
    _config2.default.audio.addEventListener("ended", _ended2.default.handle);
  }

  /**
   * As the audio is loaded, the progress event gets fired. We bind into this
   * to grab the buffered percentage of the song. We can then add more elements
   * to show the buffered amount.
   *
   * @access private
   */
  function bindProgress() {
    _config2.default.audio.removeEventListener("progress", _progress2.default.handle);
    _config2.default.audio.addEventListener("progress", _progress2.default.handle);
  }

  /**
   * Binds click and touchend events for AmplitudeJS play buttons
   *
   * @access private
   */
  function bindPlay() {
    /*
    Gets all of the elements with the class amplitude-play
    */
    var play_classes = document.getElementsByClassName("amplitude-play");

    /*
    Iterates over all of the play classes and binds the event interaction
    method to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < play_classes.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        play_classes[i].removeEventListener("touchend", _play2.default.handle);
        play_classes[i].addEventListener("touchend", _play2.default.handle);
      } else {
        play_classes[i].removeEventListener("click", _play2.default.handle);
        play_classes[i].addEventListener("click", _play2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS pause buttons.
   *
   * @access private
   */
  function bindPause() {
    /*
    Gets all of the elements with the class amplitude-pause
    */
    var pause_classes = document.getElementsByClassName("amplitude-pause");

    /*
    Iterates over all of the pause classes and binds the event interaction
    method to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < pause_classes.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        pause_classes[i].removeEventListener("touchend", _pause2.default.handle);
        pause_classes[i].addEventListener("touchend", _pause2.default.handle);
      } else {
        pause_classes[i].removeEventListener("click", _pause2.default.handle);
        pause_classes[i].addEventListener("click", _pause2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS play pause buttons
   *
   * @access private
   */
  function bindPlayPause() {
    /*
    Gets all of the elements with the class amplitude-play-pause
    */
    var play_pause_classes = document.getElementsByClassName("amplitude-play-pause");

    /*
    Iterates over all of the play/pause classes and binds the event interaction
    method to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < play_pause_classes.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        play_pause_classes[i].removeEventListener("touchend", _playPause2.default.handle);
        play_pause_classes[i].addEventListener("touchend", _playPause2.default.handle);
      } else {
        play_pause_classes[i].removeEventListener("click", _playPause2.default.handle);
        play_pause_classes[i].addEventListener("click", _playPause2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS stop buttons
   *
   * @access private
   */
  function bindStop() {
    /*
    Gets all of the elements with the class amplitude-stop
    */
    var stop_classes = document.getElementsByClassName("amplitude-stop");

    /*
    Iterates over all of the stop classes and binds the event interaction
    method to the element.  If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < stop_classes.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        stop_classes[i].removeEventListener("touchend", _stop2.default.handle);
        stop_classes[i].addEventListener("touchend", _stop2.default.handle);
      } else {
        stop_classes[i].removeEventListener("click", _stop2.default.handle);
        stop_classes[i].addEventListener("click", _stop2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS mute buttons
   *
   * @access private
   */
  function bindMute() {
    /*
    Gets all of the elements with the class amplitue-mute
    */
    var mute_classes = document.getElementsByClassName("amplitude-mute");

    /*
    Iterates over all of the mute classes and binds the event interaction
    method to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < mute_classes.length; i++) {
      /*
      WARNING: If iOS, we don't do anything because iOS does not allow the
      volume to be adjusted through anything except the buttons on the side of
      the device.
      */
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        /*
        Checks for an iOS device and displays an error message if debugging
        is turned on.
        */
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          _debug2.default.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4");
        } else {
          mute_classes[i].removeEventListener("touchend", _mute2.default.handle);
          mute_classes[i].addEventListener("touchend", _mute2.default.handle);
        }
      } else {
        mute_classes[i].removeEventListener("click", _mute2.default.handle);
        mute_classes[i].addEventListener("click", _mute2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS Volume Up Buttons
   *
   * @access private
   */
  function bindVolumeUp() {
    /*
    Gets all of the elements with the class amplitude-volume-up
    */
    var volume_up_classes = document.getElementsByClassName("amplitude-volume-up");

    /*
    Iterates over all of the volume up classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < volume_up_classes.length; i++) {
      /*
      WARNING: If iOS, we don't do anything because iOS does not allow the
      volume to be adjusted through anything except the buttons on the side of
      the device.
      */
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        /*
        Checks for an iOS device and displays an error message if debugging
        is turned on.
        */
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          _debug2.default.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4");
        } else {
          volume_up_classes[i].removeEventListener("touchend", _volumeUp2.default.handle);
          volume_up_classes[i].addEventListener("touchend", _volumeUp2.default.handle);
        }
      } else {
        volume_up_classes[i].removeEventListener("click", _volumeUp2.default.handle);
        volume_up_classes[i].addEventListener("click", _volumeUp2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS Volume Down Buttons
   *
   * @access private
   */
  function bindVolumeDown() {
    /*
    Gets all of the elements with the class amplitude-volume-down
    */
    var volume_down_classes = document.getElementsByClassName("amplitude-volume-down");

    /*
    Iterates over all of the volume down classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < volume_down_classes.length; i++) {
      /*
      WARNING: If iOS, we don't do anything because iOS does not allow the
      volume to be adjusted through anything except the buttons on the side of
      the device.
      */
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        /*
        Checks for an iOS device and displays an error message if debugging
        is turned on.
        */
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          _debug2.default.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4");
        } else {
          volume_down_classes[i].removeEventListener("touchend", _volumeDown2.default.handle);
          volume_down_classes[i].addEventListener("touchend", _volumeDown2.default.handle);
        }
      } else {
        volume_down_classes[i].removeEventListener("click", _volumeDown2.default.handle);
        volume_down_classes[i].addEventListener("click", _volumeDown2.default.handle);
      }
    }
  }

  /**
   * Binds change and input events for AmplitudeJS Song Slider Inputs
   *
   * @access private
   */
  function bindSongSlider() {
    /*
    Gets browser so if we need to apply overrides, like we usually
    have to do for anything cool in IE, we can do that.
    */
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    /*
    Gets all of the elements with the class amplitude-song-slider
    */
    var song_sliders = document.getElementsByClassName("amplitude-song-slider");

    /*
    Iterates over all of the song slider classes and binds the event interaction
    methods to the element. If the browser is IE we listen to the change event
    where if it is anything else, it's the input method.
    */
    for (var i = 0; i < song_sliders.length; i++) {
      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        song_sliders[i].removeEventListener("change", _songSlider2.default.handle);
        song_sliders[i].addEventListener("change", _songSlider2.default.handle);
      } else {
        song_sliders[i].removeEventListener("input", _songSlider2.default.handle);
        song_sliders[i].addEventListener("input", _songSlider2.default.handle);
      }
    }
  }

  /**
   * Binds change and input events fro AmplitudeJS Volume Slider inputs
   *
   * @access private
   */
  function bindVolumeSlider() {
    /*
    Gets browser so if we need to apply overrides, like we usually
    have to do for anything cool in IE, we can do that.
    */
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    /*
    Gets all of the elements with the class amplitude-volume-slider
        */
    var volume_sliders = document.getElementsByClassName("amplitude-volume-slider");

    /*
    Iterates over all of the volume slider classes and binds the event interaction
    methods to the element. If the browser is IE we listen to the change event
    where if it is anything else, it's the input method.
    */
    for (var i = 0; i < volume_sliders.length; i++) {
      /*
      WARNING: If iOS, we don't do anything because iOS does not allow the
      volume to be adjusted through anything except the buttons on the side of
      the device.
      */
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        _debug2.default.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4");
      } else {
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
          volume_sliders[i].removeEventListener("change", _volumeSlider2.default.handle);
          volume_sliders[i].addEventListener("change", _volumeSlider2.default.handle);
        } else {
          volume_sliders[i].removeEventListener("input", _volumeSlider2.default.handle);
          volume_sliders[i].addEventListener("input", _volumeSlider2.default.handle);
        }
      }
    }
  }

  /**
   * Binds click and touchend events fro AmplitudeJS Next buttons
   *
   * @access private
   */
  function bindNext() {
    /*
    Gets all of the elements with the class amplitude-next
        */
    var next_classes = document.getElementsByClassName("amplitude-next");

    /*
    Iterates over all of the next classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < next_classes.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        next_classes[i].removeEventListener("touchend", _next2.default.handle);
        next_classes[i].addEventListener("touchend", _next2.default.handle);
      } else {
        next_classes[i].removeEventListener("click", _next2.default.handle);
        next_classes[i].addEventListener("click", _next2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS prev buttons.
   *
   * @access private
   */
  function bindPrev() {
    /*
    Gets all of the elements with the class amplitude-prev
    */
    var prev_classes = document.getElementsByClassName("amplitude-prev");

    /*
    Iterates over all of the prev classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < prev_classes.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        prev_classes[i].removeEventListener("touchend", _prev2.default.handle);
        prev_classes[i].addEventListener("touchend", _prev2.default.handle);
      } else {
        prev_classes[i].removeEventListener("click", _prev2.default.handle);
        prev_classes[i].addEventListener("click", _prev2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS shuffle buttons.
   *
   * @access private
   */
  function bindShuffle() {
    /*
    Gets all of the elements with the class amplitude-shuffle
    */
    var shuffle_classes = document.getElementsByClassName("amplitude-shuffle");

    /*
    Iterates over all of the shuffle classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < shuffle_classes.length; i++) {
      /*
      Since we are re-binding everything we remove any classes that signify
      a state of the shuffle control.
      */
      shuffle_classes[i].classList.remove("amplitude-shuffle-on");
      shuffle_classes[i].classList.add("amplitude-shuffle-off");

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        shuffle_classes[i].removeEventListener("touchend", _shuffle2.default.handle);
        shuffle_classes[i].addEventListener("touchend", _shuffle2.default.handle);
      } else {
        shuffle_classes[i].removeEventListener("click", _shuffle2.default.handle);
        shuffle_classes[i].addEventListener("click", _shuffle2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS repeat buttons.
   *
   * @access private
   */
  function bindRepeat() {
    /*
    Gets all of the elements with the class amplitude-repeat
    */
    var repeat_classes = document.getElementsByClassName("amplitude-repeat");

    /*
    Iterates over all of the repeat classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < repeat_classes.length; i++) {
      /*
      Since we are re-binding everything we remove any classes that signify
      a state of the repeat control.
      */
      repeat_classes[i].classList.remove("amplitude-repeat-on");
      repeat_classes[i].classList.add("amplitude-repeat-off");

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        repeat_classes[i].removeEventListener("touchend", _repeat2.default.handle);
        repeat_classes[i].addEventListener("touchend", _repeat2.default.handle);
      } else {
        repeat_classes[i].removeEventListener("click", _repeat2.default.handle);
        repeat_classes[i].addEventListener("click", _repeat2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS repeat song buttons.
   *
   * @access private
   */
  function bindRepeatSong() {
    /*
    Gets all of the elements with the class amplitude-repeat-song
    */
    var repeat_song_classes = document.getElementsByClassName("amplitude-repeat-song");

    /*
    Iterates over all of the repeat song classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < repeat_song_classes.length; i++) {
      /*
      Since we are re-binding everything we remove any classes that signify
      a state of the repeat control.
      */
      repeat_song_classes[i].classList.remove("amplitude-repeat-on");
      repeat_song_classes[i].classList.add("amplitude-repeat-off");

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        repeat_song_classes[i].removeEventListener("touchend", _repeatSong2.default.handle);
        repeat_song_classes[i].addEventListener("touchend", _repeatSong2.default.handle);
      } else {
        repeat_song_classes[i].removeEventListener("click", _repeatSong2.default.handle);
        repeat_song_classes[i].addEventListener("click", _repeatSong2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS playback speed buttons
   *
   * @access private
   */
  function bindPlaybackSpeed() {
    /*
    Gets all of the elements with the class amplitude-playback-speed
    */
    var playback_speed_classes = document.getElementsByClassName("amplitude-playback-speed");

    /*
    Iterates over all of the playback speed classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it is click.
    */
    for (var i = 0; i < playback_speed_classes.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        playback_speed_classes[i].removeEventListener("touchend", _playbackSpeed2.default.handle);
        playback_speed_classes[i].addEventListener("touchend", _playbackSpeed2.default.handle);
      } else {
        playback_speed_classes[i].removeEventListener("click", _playbackSpeed2.default.handle);
        playback_speed_classes[i].addEventListener("click", _playbackSpeed2.default.handle);
      }
    }
  }

  /**
   * Binds click and touchend events for AmplitudeJS skip to buttons.
   *
   * @access private
   */
  function bindSkipTo() {
    /*
    Gets all of the skip to elements with the class 'amplitude-skip-to'
    */
    var skipToClasses = document.getElementsByClassName("amplitude-skip-to");

    /*
    Iterates over all of the skip to classes and binds the event interaction
    methods to the element. If the browser is mobile, then the event is touchend
    otherwise it's a click.
    */
    for (var i = 0; i < skipToClasses.length; i++) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        skipToClasses[i].removeEventListener("touchend", _skipTo2.default.handle);
        skipToClasses[i].addEventListener("touchend", _skipTo2.default.handle);
      } else {
        skipToClasses[i].removeEventListener("click", _skipTo2.default.handle);
        skipToClasses[i].addEventListener("click", _skipTo2.default.handle);
      }
    }
  }

  /**
   * Binds can play through to a song.
   *
   * @access private
   */
  function bindCanPlayThrough() {
    if (_waveform2.default.determineIfUsingWaveforms()) {
      _config2.default.audio.removeEventListener("canplaythrough", _waveform2.default.build);
      _config2.default.audio.addEventListener("canplaythrough", _waveform2.default.build);
    }
  }

  /*
  Returns the public facing functions.
  */
  return {
    initialize: initialize
  };
}();

/**
 * Imports the utility classes used by the evnets.
 */
/*
	Import the necessary classes and config to use
	with the events.
*/
exports.default = Events;
module.exports = exports["default"];

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _shuffler = __webpack_require__(13);

var _shuffler2 = _interopRequireDefault(_shuffler);

var _repeater = __webpack_require__(12);

var _repeater2 = _interopRequireDefault(_repeater);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _repeatElements = __webpack_require__(8);

var _repeatElements2 = _interopRequireDefault(_repeatElements);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Key Down event handler
 *
 * @module events/KeyDown
 */


/**
 * Imports the Repeat Elements Visual Handler
 * @module visual/RepeatElements
 */


/**
 * Imports the Repeater Utility
 * @module utilities/Repeater
 */


/**
 * Imports the core of AmplitudeJS
 * @module core/Core
 */
var KeyDown = function () {
  /**
   * When the keydown event is fired, we determine which function should be run
   * based on what was passed in.
   *
   * HANDLER FOR: keydown
   *
   * @access public
   * @prop {object} event The event object being passed in.
   */
  function handle(event) {
    runKeyEvent(event.which);
  }

  /**
   * Runs an event on key down
   *
   * @access public
   * @param {number} key 	- The key code the event is bound to.
   */
  function runKeyEvent(key) {
    /*
    Checks to see if the user bound an event to the code pressed.
    */
    if (_config2.default.bindings[key] != undefined) {
      /*
      Determine which event should be run if bound.
      */
      switch (_config2.default.bindings[key]) {
        /*
        Fires a play pause event.
        */
        case "play_pause":
          runPlayPauseKeyDownEvent();
          break;

        /*
        Fires a next event.
        */
        case "next":
          runNextKeyDownEvent();
          break;

        /*
        Fires a previous event.
        */
        case "prev":
          runPrevKeyDownEvent();
          break;

        /*
        Fires a stop event.
        */
        case "stop":
          runStopKeyDownEvent();
          break;

        /*
        Fires a shuffle event.
        */
        case "shuffle":
          runShuffleKeyDownEvent();
          break;

        /*
        Fires a repeat event.
        */
        case "repeat":
          runRepeatKeyDownEvent();
          break;
      }
    }
  }

  /**
   * Runs the play pause method for key down.
   */
  function runPlayPauseKeyDownEvent() {
    /*
      If the song is paused, we play the song. If the song is playing,
      we pause the song.
    */
    if (_config2.default.audio.paused) {
      _core2.default.play();
    } else {
      _core2.default.pause();
    }

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Runs the next method for key down.
   */
  function runNextKeyDownEvent() {
    /*
      Check to see if the current state of the player
      is in playlist mode or not playlist mode.
    */
    if (_config2.default.active_playlist == "" || _config2.default.active_playlist == null) {
      _audioNavigation2.default.setNext();
    } else {
      _audioNavigation2.default.setNextPlaylist(_config2.default.active_playlist);
    }
  }

  /**
   * Runs the previous method for key down.
   */
  function runPrevKeyDownEvent() {
    /*
      Check to see if the current playlist has been set
      or null and set the previous song.
    */
    if (_config2.default.active_playlist == "" || _config2.default.active_playlist == null) {
      _audioNavigation2.default.setPrevious();
    } else {
      _audioNavigation2.default.setPreviousPlaylist(_config2.default.active_playlist);
    }
  }

  /**
   * Runs the stop method for key down.
   */
  function runStopKeyDownEvent() {
    /*
      Syncs all of the play pause elements to pause.
    */
    _playPauseElements2.default.syncToPause();

    /*
      Stops the active song.
    */
    _core2.default.stop();
  }

  /**
   * Runs the shuffle method for key down.
   */
  function runShuffleKeyDownEvent() {
    /*
      Check to see if the current playlist has been set
      or null and set the previous song.
    */
    if (_config2.default.active_playlist == "" || _config2.default.active_playlist == null) {
      _shuffler2.default.toggleShuffle();
    } else {
      _shuffler2.default.toggleShufflePlaylist(_config2.default.active_playlist);
    }
  }

  /**
   * Run the repeat method for key down.
   */
  function runRepeatKeyDownEvent() {
    /*
      Toggles the repeat
    */
    _repeater2.default.setRepeat(!_config2.default.repeat);

    /*
      Visually sync repeat
    */
    _repeatElements2.default.syncRepeat();
  }

  /**
   * Returns the public methods for the handler.
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the Play Pause Elements Visual Handler
 * @module visual/PlayPauseElements
 */


/**
 * Imports the Audio Navigation Utility
 * @module utilities/AudioNavigation
 */


/**
 * Imports the Shuffle Utility
 * @module utilities/Shuffle
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = KeyDown;
module.exports = exports["default"];

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _muteElements = __webpack_require__(10);

var _muteElements2 = _interopRequireDefault(_muteElements);

var _volumeSliderElements = __webpack_require__(11);

var _volumeSliderElements2 = _interopRequireDefault(_volumeSliderElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all events for a mute event.
 * @module events/Mute
 */


/**
 * Imports the AmplitudeJS Visual Mute Elements
 * @module visual/MuteElements
 */
/**
 * Imports the config to use the values
 */
var Mute = function () {
  /**
   * Handles an event for a mute element
   *
   * HANDLER FOR:       class="amplitude-mute"
   *
   * @access public
   */
  function handle() {
    /*
      We don't fire this if the user is touching the screen and it's moving.
      This could lead to a mis-fire
    */
    if (!_config2.default.is_touch_moving) {
      /*
      If the current volume in the config is 0, we set the volume to the
      pre_mute level.  This means that the audio is already muted and
      needs to be restored to the pre_mute level.
      Otherwise, we set pre_mute volume to the current volume
      and set the config volume to 0, muting the audio.
      */
      if (_config2.default.volume == 0) {
        _core2.default.setVolume(_config2.default.pre_mute_volume);
      } else {
        _config2.default.pre_mute_volume = _config2.default.volume;
        _core2.default.setVolume(0);
      }

      /*
        Sync Mute Elements.
      */
      _muteElements2.default.setMuted(_config2.default.volume == 0 ? true : false);

      /*
      Syncs the volume sliders so the visuals align up with the functionality.
      If the volume is at 0, then the sliders should represent that so the user
      has the right starting point.
      */
      _volumeSliderElements2.default.sync();
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Visual Volume Slider Elements
 * @module visual/VolumeSliderElements
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/core
 */
exports.default = Mute;
module.exports = exports["default"];

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

var _callbacks = __webpack_require__(9);

var _callbacks2 = _interopRequireDefault(_callbacks);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Next Event Handler
 *
 * @module events/Next
 */


/**
 * Imports the Amplitude Audio Navigation Utility
 * @module utilities/AudioNavigation
 */


/**
 * Imports the Play Pause Elements Module.
 * @module visual/PlayPauseElements
 */
/**
 * Imports the config module
 * @module config
 */
var Next = function () {
  /**
   * Handles an event on the next button
   *
   * HANDLER FOR:       class="amplitude-next"
   *
   * GLOBAL:            class="amplitude-next"
   * PLAYLIST:          class="amplitude-next" amplitude-playlist="playlist_key"
   *
   * @access public
   */
  function handle() {
    /*
      We don't fire this if the user is touching the screen and it's moving.
      This could lead to a mis-fire
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Gets the playlist attribute from the element.
      */
      var playlist = this.getAttribute("data-amplitude-playlist");

      /*
        If the playlist is null, we handle the global next.
      */
      if (playlist == null) {
        handleGlobalNext();
      }

      /*
        If the playlist is set, we handle the playlist next.
      */
      if (playlist != null) {
        handlePlaylistNext(playlist);
      }
    }
  }

  /**
   * Handles an event on a global enxt button.
   *
   * @access private
   */
  function handleGlobalNext() {
    /*
      Check to see if the current state of the player
      is in playlist mode or not playlist mode. If we are in playlist mode,
      we set next on the playlist.
    */
    if (_config2.default.active_playlist == "" || _config2.default.active_playlist == null) {
      _audioNavigation2.default.setNext();
    } else {
      _audioNavigation2.default.setNextPlaylist(_config2.default.active_playlist);
    }
  }

  /**
   * Handles an event on a next playlist button.
   *
   * @access private
   * @prop {string} playlist  - The playlist we are handling the next for.
   */
  function handlePlaylistNext(playlist) {
    /*
      Ensure the playlist is the same as the active playlist. To get to change
      the scope to a new playlist, you need to play that playlist.
    */
    if (playlist == _config2.default.active_playlist) {
      _audioNavigation2.default.setNextPlaylist(playlist);
    } else {
      _debug2.default.writeMessage("You can not go to the next song on a playlist that is not being played!");
    }
  }

  /*
    Returns the public facing methods.
  */
  return {
    handle: handle
  };
}();

/**
 * AmplitudeJS Debug Module
 * @module utilities/Debug
 */


/**
 * Imports the Callbacks Module
 * @module utilities/Callbacks
 */


/**
 * Imports the AmplitudeJS Core module.
 * @module core/core
 */
exports.default = Next;
module.exports = exports["default"];

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _configState = __webpack_require__(6);

var _configState2 = _interopRequireDefault(_configState);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the pause events
 * @module events/Pause
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */
/**
 * Imports the config module
 * @module config
 */
var Pause = function () {
  /**
   * Handles an event on a pause button
   *
   * HANDLER FOR:       class="amplitude-pause"
   *
   * GLOBAL:            class="amplitude-pause"
   * PLAYLIST:          class="amplitude-pause" amplitude-playlist="playlist_key"
   * SONG:              class="amplitude-pause" amplitude-song-index="song_index"
   * SONG IN PLAYLIST:  class="amplitude-pause" amplitude-playlist="playlist-key" amplitude-song-index="playlist_index"
   *
   * @access public
   */
  function handle() {
    /*
      If the touch is moving, we do not want to accidentally touch the play
      pause element and fire an event.
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Gets the attribute for song index so we can check if
        there is a need to change the song.  In some scenarios
        there might be multiple pause classes on the page. In that
        case it is possible the user could click a different pause
        class.
      */
      var songIndexAttribute = this.getAttribute("data-amplitude-song-index");
      var playlistAttribute = this.getAttribute("data-amplitude-playlist");

      /*
        Handle a global pause button.
      */
      if (playlistAttribute == null && songIndexAttribute == null) {
        handleGlobalPause();
      }

      /*
        Handle a playlist pause button.
      */
      if (playlistAttribute != null && songIndexAttribute == null) {
        handlePlaylistPause(playlistAttribute);
      }

      /*
        Handle a song pause button.
      */
      if (playlistAttribute == null && songIndexAttribute != null) {
        handleSongPause(songIndexAttribute);
      }

      /*
        Handle a song in playlist pause button.
      */
      if (playlistAttribute != null && songIndexAttribute != null) {
        handleSongInPlaylistPause(playlistAttribute, songIndexAttribute);
      }
    }
  }

  /**
   * Handles global pause button which pauses whatever song is
   * active.
   *
   * @access private
   */
  function handleGlobalPause() {
    /*
      Pauses the song.
    */
    _core2.default.pause();

    /*
      Sync the play pause elements.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Handles the playlist pause.
   *
   * @access private
   * @param {string} playlist The playlist the pause button belongs to.
   */
  function handlePlaylistPause(playlist) {
    /*
      Checks to see if the active playlist is the same
    */
    if (_config2.default.active_playlist == playlist) {
      /*
        Pauses the song.
      */
      _core2.default.pause();

      /*
        Sync the play pause elements.
      */
      _playPauseElements2.default.sync();
    }
  }

  /**
   * Handles the song pause.
   *
   * @access private
   * @param {integer} song The song the pause button belongs to.
   */
  function handleSongPause(song) {
    /*
      Checks to see if the active playlist is null and the song matches
      the active index.
    */
    if ((_config2.default.active_playlist == "" || _config2.default.active_playlist == null) && _config2.default.active_index == song) {
      /*
        Pauses the song.
      */
      _core2.default.pause();

      /*
        Sync the play pause elements.
      */
      _playPauseElements2.default.sync();
    }
  }

  /**
   * Handles the song in playlist pause.
   *
   * @access private
   * @param {string} playlist The playlist the pause button belongs to.
   * @param {integer} song The song the pause button belongs to.
   */
  function handleSongInPlaylistPause(playlist, song) {
    /*
      Checks to see if the active song matches the song and the
      active playlist matches the playlist. This means the pause button is
      for the song in the playlist.
    */
    if (_config2.default.active_playlist == playlist && _config2.default.playlists[playlist].active_index == song) {
      /*
        Pauses the song.
      */
      _core2.default.pause();

      /*
        Sync the play pause elements.
      */
      _playPauseElements2.default.sync();
    }
  }

  /*
    Returns the public facing elements
  */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Play Pause Elements
 * @module visual/PlayPauseElements
 */


/**
 * Imports the ConfigState module.
 * @module utilities/ConfigState
 */
exports.default = Pause;
module.exports = exports["default"];

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _configState = __webpack_require__(6);

var _configState2 = _interopRequireDefault(_configState);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the play events
 * @module events/Play
 */


/**
 * Imports the AmplitudeJS Audio Navigation Utility
 * @module utilities/AudioNavigation
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */
/**
 * Imports the config module
 * @module config
 */
var Play = function () {
  /**
   * Handles an event on a play button in Amplitude.
   *
   * HANDLER FOR:       class="amplitude-play"
   *
   * GLOBAL:            class="amplitude-play"
   * PLAYLIST:          class="amplitude-play" amplitude-playlist="playlist_key"
   * SONG:              class="amplitude-play" amplitude-song-index="song_index"
   * SONG IN PLAYLIST:  class="amplitude-play" amplitude-playlist="playlist-key" amplitude-song-index="playlist_index"
   *
   * @access public
   */
  function handle() {
    /*
      If the touch is moving, we do not want to accidentally touch the play
      pause element and fire an event.
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Gets the attribute for song index so we can check if
        there is a need to change the song.  In some scenarios
        there might be multiple play classes on the page. In that
        case it is possible the user could click a different play
        class and change the song.
      */
      var songIndexAttribute = this.getAttribute("data-amplitude-song-index");
      var playlistAttribute = this.getAttribute("data-amplitude-playlist");

      /*
        Handle a global play button.
      */
      if (playlistAttribute == null && songIndexAttribute == null) {
        handleGlobalPlay();
      }

      /*
        Handle a playlist play button.
      */
      if (playlistAttribute != null && songIndexAttribute == null) {
        handlePlaylistPlay(playlistAttribute);
      }

      /*
        Handle a song play button.
      */
      if (playlistAttribute == null && songIndexAttribute != null) {
        handleSongPlay(songIndexAttribute);
      }

      /*
        Handle a song in playlist play button.
      */
      if (playlistAttribute != null && songIndexAttribute != null) {
        handleSongInPlaylistPlay(playlistAttribute, songIndexAttribute);
      }
    }
  }

  /**
   * Handles global play button which plays whatever song is
   * active.
   *
   * @access private
   */
  function handleGlobalPlay() {
    /*
      Plays the song
    */
    _core2.default.play();

    /*
      Sync the play pause elements.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Handle the playlist play.
   *
   * @access private
   * @param {string} playlist The playlist the play button belongs to.
   */
  function handlePlaylistPlay(playlist) {
    /*
      Checks if we have a new playlist.
    */
    if (_checks2.default.newPlaylist(playlist)) {
      /*
        Sets the active playlist to what belongs to the playlist.
      */
      _audioNavigation2.default.setActivePlaylist(playlist);

      /*
        Play first song in the playlist since we just
        switched playlists, we start from the first song.
         If the user has shuffle on for the playlist, then
        we go from the first song in the shuffle playlist array.
      */
      if (_config2.default.playlists[playlist].shuffle) {
        _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].shuffle_list[0], 0);
      } else {
        _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[0], 0);
      }
    }

    /*
      Plays the song.
    */
    _core2.default.play();

    /*
      Syncs the play pause elements since they are dependent upon this state
      of the player.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Handles the song play button.
   *
   * @access private
   * @param {integer} song The index of the song we are playing.
   */
  function handleSongPlay(song) {
    /*
      There can be multiple playlists on the page and there can be
      multiple songs on the page AND there can be songs in multiple
      playlists, so we have some checking to do.
    */

    /*
      Check to see if the playlist has changed. Essentially, if we are moving
      out of a playlist context.
    */
    if (_checks2.default.newPlaylist(null)) {
      /*
        We've moved out of the playlist context, so we set the active playlist
        to null
      */
      _audioNavigation2.default.setActivePlaylist(null);

      /*
        We then change the song to the index selected.
      */
      _audioNavigation2.default.changeSong(_config2.default.songs[song], song);
    }

    /*
      Check to see if the song has changed. If it has,
      set the active song. If it was in a playlist, the
      song wouldn't change here, since we already set the
      song when we checked for a playlist.
    */
    if (_checks2.default.newSong(null, song)) {
      /*
        The song selected is different, so we change the
        song.
      */
      _audioNavigation2.default.changeSong(_config2.default.songs[song], song);
    }

    /*
      Plays the song
    */
    _core2.default.play();

    /*
      Syncs the play pause elements since they are dependent upon this state
      of the player.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Handles the song in playlist play.
   *
   * @access private
   * @param {string} playlist The playlist the play button belongs to.
   * @param {integer} song The song the play button belongs to.
   */
  function handleSongInPlaylistPlay(playlist, song) {
    /*
    There can be multiple playlists on the page and there can be
    multiple songs on the page AND there can be songs in multiple
    playlists, so we have some checking to do.
    */

    /*
    Check to see if the playlist has changed. Essentially, if we are moving
      out of a playlist context.
    */
    if (_checks2.default.newPlaylist(playlist)) {
      /*
        We've moved out of the playlist context, so we set the active playlist
        to null
      */
      _audioNavigation2.default.setActivePlaylist(playlist);

      /*
      We then change the song to the index selected.
      */
      _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[song], song);
    }

    /*
    Check to see if the song has changed. If it has,
    set the active song. If it was in a playlist, the
    song wouldn't change here, since we already set the
    song when we checked for a playlist.
    */
    if (_checks2.default.newSong(playlist, song)) {
      /*
      The song selected is different, so we change the
      song.
      */
      _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[song], song);
    }

    /*
      Plays the song
    */
    _core2.default.play();

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    _playPauseElements2.default.sync();
  }

  /*
    Returns the public facing elements
  */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Play Pause Elements
 * @module visual/PlayPauseElements
 */


/**
 * Imports the AmplitudeJS Checks Utility
 * @module utilities/Checks
 */


/**
 * Imports the config state utility.
 * @module utilities/ConfigState
 */
exports.default = Play;
module.exports = exports["default"];

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _configState = __webpack_require__(6);

var _configState2 = _interopRequireDefault(_configState);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the play pause events
 * @module events/PlayPause
 */


/**
 * Imports the AmplitudeJS Audio Navigation Utility
 * @module utilities/AudioNavigation
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */
/**
 * Imports the config module
 * @module config
 */
var PlayPause = function () {
  /**
   * Handles an event on a play/pause button
   *
   * HANDLER FOR:       class="amplitude-play-pause"
   *
   * GLOBAL:            class="amplitude-play-pause"
   * PLAYLIST:          class="amplitude-play-pause" amplitude-playlist="playlist_key"
   * SONG:              class="amplitude-play-pause" amplitude-song-index="song_index"
   * SONG IN PLAYLIST:  class="amplitude-play-pause" amplitude-playlist="playlist-key" amplitude-song-index="playlist_index"
   *
   * @access public
   */
  function handle() {
    /*
      If the touch is moving, we do not want to accidentally touch the play
      pause element and fire an event.
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Get the playlist and song from the element. It's alright if these
        are null.
      */
      var playlist = this.getAttribute("data-amplitude-playlist");
      var song = this.getAttribute("data-amplitude-song-index");

      /*
        Handle a global play pause button
      */
      if (playlist == null && song == null) {
        handleGlobalPlayPause();
      }

      /*
        Handle a playlist play pause button
      */
      if (playlist != null && song == null) {
        handlePlaylistPlayPause(playlist);
      }

      /*
        Handle a song play pause button
      */
      if (playlist == null && song != null) {
        handleSongPlayPause(song);
      }

      /*
        Handle a song in playlist play pause button
      */
      if (playlist != null && song != null) {
        handleSongInPlaylistPlayPause(playlist, song);
      }
    }
  }

  /**
   * Sets the main play pause buttons to the current state of the song.
   * @access private
   */
  function handleGlobalPlayPause() {
    /*
      If the song is paused, we play the song. If the song is playing,
      we pause the song.
    */
    if (_config2.default.audio.paused) {
      _core2.default.play();
    } else {
      _core2.default.pause();
    }

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Sets the playlist main play pause buttons to the current state of the song.
   * @access private
   * @param {string} playlist The playlist the main play pause button controls
   */
  function handlePlaylistPlayPause(playlist) {
    /*
      The only thing that can change when you click a playlist
      play pause is the playlist. Main play pauses have no change
      in song, song play pauses can change playlist and song.
    */
    if (_checks2.default.newPlaylist(playlist)) {
      /*
        If there's a new playlist, then we set the new playlist.
      */
      _audioNavigation2.default.setActivePlaylist(playlist);

      /*
        Play first song in the playlist since we just
        switched playlists, we start from the first song.
         If the user has shuffle on for the playlist, then
        we go from the first song in the shuffle playlist array.
      */
      if (_config2.default.playlists[playlist].shuffle) {
        _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].shuffle_list[0], 0, true);
      } else {
        _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[0], 0);
      }
    }

    /*
      If the song is paused, we play the song. If the song is playing,
      we pause the song.
    */
    if (_config2.default.audio.paused) {
      _core2.default.play();
    } else {
      _core2.default.pause();
    }

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Sets the playlist main play pause buttons to the current state of the song.
   * @access private
   * @param {string} song The index of the song being played/paused
   */
  function handleSongPlayPause(song) {
    /*
    There can be multiple playlists on the page and there can be
    multiple songs on the page AND there can be songs in multiple
    playlists, so we have some checking to do.
    */

    /*
    Check to see if the playlist has changed. Essentially, if we are moving
      out of a playlist context.
    */
    if (_checks2.default.newPlaylist(null)) {
      /*
        We've moved out of the playlist context, so we set the active playlist
        to null
      */
      _audioNavigation2.default.setActivePlaylist(null);

      /*
      We then change the song to the index selected.
      */
      _audioNavigation2.default.changeSong(_config2.default.songs[song], song, true);
    }

    /*
    Check to see if the song has changed. If it has,
    set the active song. If it was in a playlist, the
    song wouldn't change here, since we already set the
    song when we checked for a playlist.
    */
    if (_checks2.default.newSong(null, song)) {
      /*
      The song selected is different, so we change the
      song.
      */
      _audioNavigation2.default.changeSong(_config2.default.songs[song], song, true);
    }

    /*
      If the song is paused, we play the song. If the song is playing,
      we pause the song.
    */
    if (_config2.default.audio.paused) {
      _core2.default.play();
    } else {
      _core2.default.pause();
    }

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Sets the song in playlist play pause buttons to the current
   * state of the song.
   * @access private
   * @param {string} playlist The playlist the song is a part of
   * @param {number} song The index of the song being played/paused
   */
  function handleSongInPlaylistPlayPause(playlist, song) {
    /*
    There can be multiple playlists on the page and there can be
    multiple songs on the page AND there can be songs in multiple
    playlists, so we have some checking to do.
    */

    /*
    Check to see if the playlist has changed. Essentially, if we are moving
      out of a playlist context.
    */
    if (_checks2.default.newPlaylist(playlist)) {
      /*
        We've moved out of the playlist context, so we set the active playlist
        to null
      */
      _audioNavigation2.default.setActivePlaylist(playlist);

      /*
      We then change the song to the index selected.
      */
      _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[song], song, true);
    }

    /*
    Check to see if the song has changed. If it has,
    set the active song. If it was in a playlist, the
    song wouldn't change here, since we already set the
    song when we checked for a playlist.
    */
    if (_checks2.default.newSong(playlist, song)) {
      /*
      The song selected is different, so we change the
      song.
      */
      _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[song], song, true);
    }

    /*
      If the song is paused, we play the song. If the song is playing,
      we pause the song.
    */
    if (_config2.default.audio.paused) {
      _core2.default.play();
    } else {
      _core2.default.pause();
    }

    /*
      Now we sync all the elements to match the state of the audio.
      We don't need to do any checks on new songs or changed playlists
      in the global since it's whatever song is playing.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Play Pause Elements
 * @module visual/PlayPauseElements
 */


/**
 * Imports the AmplitudeJS Checks Utility
 * @module utilities/Checks
 */


/**
 * Import the config state utility.
 * @module utilities/configState
 */
exports.default = PlayPause;
module.exports = exports["default"];

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _playbackSpeedElements = __webpack_require__(18);

var _playbackSpeedElements2 = _interopRequireDefault(_playbackSpeedElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Playback Speed Event Handler
 *
 * @module events/PlaybackSpeed
 */


/**
 * Imports the Amplitude Core module
 * @module core/Core
 */
var PlaybackSpeed = function () {
  /**
   * Handles an event on the playback speed button
   *
   * HANDLER FOR:       class="amplitude-playback-speed"
   *
   * @access public
   */
  function handle() {
    if (!_config2.default.is_touch_moving) {
      /*
      We increment the speed by .5 everytime we click
      the button to change the playback speed. Once we are
      actively playing back at 2, we start back at 1 which
      is normal speed.
      */
      switch (_config2.default.playback_speed) {
        case 1:
          _core2.default.setPlaybackSpeed(1.5);
          break;
        case 1.5:
          _core2.default.setPlaybackSpeed(2);
          break;
        case 2:
          _core2.default.setPlaybackSpeed(1);
          break;
      }

      /*
      Visually sync the playback speed.
      */
      _playbackSpeedElements2.default.sync();
    }
  }

  /*
    Returns public facing methods
  */
  return {
    handle: handle
  };
}();

/**
 * Imports the Playback Speed Visual Elements
 * @module visual/PlaybackSpeedElements
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = PlaybackSpeed;
module.exports = exports["default"];

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Prev Event Handler
 *
 * @module events/Prev
 */


/**
 * Imports the Amplitude Audio Navigation Utility
 * @module utilities/AudioNavigation
 */
var Prev = function () {
  /**
   * Handles an event on the previous button
   *
   * HANDLER FOR:       class="amplitude-prev"
   *
   * GLOBAL:            class="amplitude-prev"
   * PLAYLIST:          class="amplitude-prev" amplitude-playlist="playlist_key"
   *
   * @access public
   */
  function handle() {
    /*
      We don't fire this if the user is touching the screen and it's moving.
      This could lead to a mis-fire
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Gets the playlist attribute from the element.
      */
      var playlist = this.getAttribute("data-amplitude-playlist");

      /*
        If the playlist is null, we handle the global prev.
      */
      if (playlist == null) {
        handleGlobalPrev();
      }

      /*
        If the playlist is set, we handle the playlist prev.
      */
      if (playlist != null) {
        handlePlaylistPrev(playlist);
      }
    }
  }

  /**
   * Handles an event on a global previous button.
   *
   * @access private
   */
  function handleGlobalPrev() {
    /*
      Check to see if the current state of the player
      is in playlist mode or not playlist mode. If we are in playlist mode,
      we set prev on the playlist.
    */
    if (_config2.default.active_playlist == "" || _config2.default.active_playlist == null) {
      _audioNavigation2.default.setPrevious();
    } else {
      _audioNavigation2.default.setPreviousPlaylist(_config2.default.active_playlist);
    }
  }

  /**
   * Handles an event on a previous playlist button.
   *
   * @access private
   * @prop {string} playlist  - The playlist we are handling the previous for.
   */
  function handlePlaylistPrev(playlist) {
    /*
      Ensure the playlist is the same as the active playlist. To get to change
      the scope to a new playlist, you need to play that playlist.
    */
    if (playlist == _config2.default.active_playlist) {
      _audioNavigation2.default.setPreviousPlaylist(_config2.default.active_playlist);
    } else {
      _debug2.default.writeMessage("You can not go to the previous song on a playlist that is not being played!");
    }
  }

  /*
    Returns the public facing methods.
  */
  return {
    handle: handle
  };
}();

/**
 * AmplitudeJS Debug Module
 * @module utilities/Debug
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = Prev;
module.exports = exports["default"];

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _bufferedProgressElements = __webpack_require__(24);

var _bufferedProgressElements2 = _interopRequireDefault(_bufferedProgressElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Event Handler for progress
 *
 * @module events/Progress
 */
/**
 * Imports the config module
 * @module config
 */
var Progress = function () {
  /**
   * As the song is buffered, we can display the buffered percentage in
   * a progress bar.
   *
   * HANDLER FOR: progress
   *
   * @access public
   */
  function handle() {
    /*
      Help from: http://jsbin.com/badimipi/1/edit?html,js,output
    */
    if (_config2.default.audio.buffered.length - 1 >= 0) {
      var bufferedEnd = _config2.default.audio.buffered.end(_config2.default.audio.buffered.length - 1);
      var duration = _config2.default.audio.duration;

      /*
        Set the computed song buffered value to the config.
      */
      _config2.default.buffered = bufferedEnd / duration * 100;
    }

    /*
      Sync the buffered progress bars.
    */
    _bufferedProgressElements2.default.sync();
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the BufferedProgressElements visual handler
 * @module visual/bufferedProgressElements.js
 */
exports.default = Progress;
module.exports = exports["default"];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _repeater = __webpack_require__(12);

var _repeater2 = _interopRequireDefault(_repeater);

var _repeatElements = __webpack_require__(8);

var _repeatElements2 = _interopRequireDefault(_repeatElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Repeat Event Handler
 *
 * @module events/Repeat
 */


/**
 * Imports the repeater utility module.
 * @module utilities/Repeater
 */
var Repeat = function () {
  /**
   * Handles an event on the repeat button
   *
   * HANDLER FOR:       class="amplitude-repeat"
   *
   * GLOBAL:            class="amplitude-repeat"
   * PLAYLIST:          class="amplitude-repeat" amplitude-playlist="playlist_key"
   *
   * @access public
   */
  function handle() {
    /*
      We don't fire this if the user is touching the screen and it's moving.
      This could lead to a mis-fire
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Gets the playlist attribute from the element.
      */
      var playlist = this.getAttribute("data-amplitude-playlist");

      /*
        If the playlist is null, we handle the global repeat.
      */
      if (playlist == null) {
        handleGlobalRepeat();
      }

      /*
        If the playlist is set, we handle the playlist repeat.
      */
      if (playlist != null) {
        handlePlaylistRepeat(playlist);
      }
    }
  }

  /**
   * Handles an event on a global repeat button.
   *
   * @access private
   */
  function handleGlobalRepeat() {
    /*
      Sets repeat to the opposite of what it was set to
    */
    _repeater2.default.setRepeat(!_config2.default.repeat);

    /*
      Visually sync repeat
    */
    _repeatElements2.default.syncRepeat();
  }

  /**
   * Handles an event on a playlist repeat button.
   *
   * @access private
   * @prop {string} playlist - The playlist we are handling the repeat store.
   */
  function handlePlaylistRepeat(playlist) {
    /*
      Sets repeat to the opposite of what it was set to for the playlist.
    */
    _repeater2.default.setRepeatPlaylist(!_config2.default.playlists[playlist].repeat, playlist);

    /*
      Visually sync playlist repeat
    */
    _repeatElements2.default.syncRepeatPlaylist(playlist);
  }

  /*
    Returns the public facing methods.
  */
  return {
    handle: handle
  };
}();

/**
 * Imports the visual repeat elements module
 * @module visual/RepeatElements
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = Repeat;
module.exports = exports["default"];

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _repeater = __webpack_require__(12);

var _repeater2 = _interopRequireDefault(_repeater);

var _repeatElements = __webpack_require__(8);

var _repeatElements2 = _interopRequireDefault(_repeatElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles an event on the Amplitude Repeat Song.
 *
 * @module events/RepeatSong
 */


/**
 * Imports the repeat utility
 * @module utilities/Repeater
 */
var RepeatSong = function () {
  /**
   * Handles an event on the repeat song button
   *
   * HANDLER FOR: 'amplitude-repeat-song'
   *
   * @access public
   */
  function handle() {
    /*
      If the touch is moving, we do not want to accidentally touch the play
      pause element and fire an event.
    */
    if (!_config2.default.is_touch_moving) {
      /*
      Sets repeat song to the opposite of what it was set to
      */
      _repeater2.default.setRepeatSong(!_config2.default.repeat_song);

      /*
      Visually sync repeat song
      */
      _repeatElements2.default.syncRepeatSong();
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Repeat Element
 * @module visual/RepeatElements
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = RepeatSong;
module.exports = exports["default"];

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _shuffler = __webpack_require__(13);

var _shuffler2 = _interopRequireDefault(_shuffler);

var _shuffleElements = __webpack_require__(19);

var _shuffleElements2 = _interopRequireDefault(_shuffleElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the shuffle events
 * @module events/Shuffle
 */


/**
 * Imports the shuffler utility
 * @module utilities/Shuffler
 */
var Shuffle = function () {
  /**
   * Handles an event on the shuffle button
   *
   * HANDLER FOR:       class="amplitude-shuffle"
   *
   * GLOBAL:            class="amplitude-shuffle"
   * PLAYLIST:          class="amplitude-shuffle" amplitude-playlist="playlist_key"
   *
   * @access public
   */
  function handle() {
    /*
      If the touch is moving, we do not want to accidentally touch the play
      pause element and fire an event.
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Get the playlist attribute
      */
      var playlist = this.getAttribute("data-amplitude-playlist");

      /*
      Check to see if the shuffle button belongs to a playlist
      */
      if (playlist == null) {
        handleGlobalShuffle();
      } else {
        handlePlaylistShuffle(playlist);
      }
    }
  }

  /**
   * Handles the event on the global shuffle button.
   */
  function handleGlobalShuffle() {
    /*
      Either shuffles or removes shuffle on the global state.
    */
    _shuffler2.default.toggleShuffle();

    /*
      Visualize the shuffle state change.
    */
    _shuffleElements2.default.syncMain(_config2.default.shuffle_on);
  }

  /**
   * Handles the event on the playlist shuffle button.
   *
   * @param {string} playlist - The playlist string the shuffle button belongs to.
   */
  function handlePlaylistShuffle(playlist) {
    /*
      Either shuffles or removes shuffle on the playlist state.
    */
    _shuffler2.default.toggleShufflePlaylist(playlist);

    /*
      Visually sync the playlist shuffle statuses.
    */
    _shuffleElements2.default.syncPlaylist(playlist);
  }

  /**
   * Returns public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the visual shuffle elements
 * @module visual/ShuffleElements
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = Shuffle;
module.exports = exports["default"];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the skip to event.
 *
 * @module events/SkipTo
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */


/**
 * Imports the AmplitudeJS Audio Navigation Utility
 * @module utilities/AudioNavigation
 */
/**
 * Imports the config module
 * @module config
 */
var SkipTo = function () {
  /**
   * Handles an event on a skip to button.
   *
   * HANDLER FOR:       class="amplitude-skip-to"
   *
   * GLOBAL:            class="amplitude-skip-to" amplitude-song-index="song_index" amplitude-location="seconds"
   * PLAYLIST:          class="amplitude-skip-to" amplitude-playlist="playlist_key" amplitude-song-index="song_index" amplitude-location="seconds"
   *
   * @access public
   */
  function handle() {
    /*
      If the touch is moving, we do not want to accidentally touch the play
      pause element and fire an event.
    */
    if (!_config2.default.is_touch_moving) {
      /*
        Extracts the needed attributes from the element.
      */
      var playlist = this.getAttribute("data-amplitude-playlist");
      var songIndex = this.getAttribute("data-amplitude-song-index");
      var location = this.getAttribute("data-amplitude-location");

      /*
        If the location is null, write a message. We can't skip to a location
        that is null
      */
      if (location == null) {
        _debug2.default.writeMessage("You must add an 'data-amplitude-location' attribute in seconds to your 'amplitude-skip-to' element.");
      }

      /*
        If the song index is null, write a debug message. We can't skip to a location
        of a null song.
      */
      if (songIndex == null) {
        _debug2.default.writeMessage("You must add an 'data-amplitude-song-index' attribute to your 'amplitude-skip-to' element.");
      }

      /*
        If the location and song index are set, continue.
      */
      if (location != null && songIndex != null) {
        /*
        Determines if the skip to button is in the scope of a playlist.
        */
        if (playlist == null) {
          handleSkipToSong(parseInt(songIndex), parseInt(location));
        } else {
          handleSkipToPlaylist(playlist, parseInt(songIndex), parseInt(location));
        }
      }
    }
  }

  /**
   * Handles the skipping to a specific song
   *
   * @access private
   * @param {string} songIndex  - The index of the song being skipped to
   * @param {number} location   - The seconds location of the song in the playlist.
   */
  function handleSkipToSong(songIndex, location) {
    /*
      Changes the song to where it's being skipped and then
      play the song.
    */
    _audioNavigation2.default.changeSong(_config2.default.songs[songIndex], songIndex);
    _core2.default.play();

    /*
      Syncs all of the play pause buttons now that we've skipped.
    */
    _playPauseElements2.default.syncGlobal();
    _playPauseElements2.default.syncSong();

    /*
      Skip to the location in the song.
    */
    _core2.default.skipToLocation(location);
  }

  /**
   * Handles the skipping to a song that's in a playlist.
   *
   * @access private
   * @param {string} playlist   - The playlist being skipped to
   * @param {string} songIndex  - The index of the song in the playlist
   * @param {number} location   - The seconds location of the song in the playlist.
   */
  function handleSkipToPlaylist(playlist, songIndex, location) {
    /*
      Checks if we are skipping to a new playlist
    */
    if (_checks2.default.newPlaylist(playlist)) {
      _audioNavigation2.default.setActivePlaylist(playlist);
    }

    /*
      Changes the song to where it's being skipped and then
      play the song.
    */
    _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[songIndex], songIndex);
    _core2.default.play();

    /*
      Sync all of the play pause elements.
    */
    _playPauseElements2.default.syncGlobal();
    _playPauseElements2.default.syncPlaylist();
    _playPauseElements2.default.syncSong();

    /*
      Skip to the location in the song.
    */
    _core2.default.skipToLocation(location);
  }

  /**
   * Return public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS play pause elements.
 * @module visual/PlayPauseElements
 */


/**
 * Imports the AmplitudeJS Checks Utility
 * @module utilities/Checks
 */


/**
 * Imports AmplitudeJS Debug Utility
 * @module utilities/debug
 */
exports.default = SkipTo;
module.exports = exports["default"];

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _time = __webpack_require__(23);

var _time2 = _interopRequireDefault(_time);

var _songSliderElements = __webpack_require__(14);

var _songSliderElements2 = _interopRequireDefault(_songSliderElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the song slider to event.
 *
 * @module events/SongSlider
 */


/**
 * Imports the time utility
 * @module utilities/Time
 */
var SongSlider = function () {
  /**
   * Handles a song slider element.
   *
   * HANDLER FOR:       class="amplitude-song-slider"
   *
   * GLOBAL:            class="amplitude-song-slider"
   * PLAYLIST:          class="amplitude-song-slider" amplitude-playlist="playlist_key"
   * SONG:              class="amplitude-song-slider" amplitude-song-index="song_index"
   * SONG IN PLAYLIST:  class="amplitude-song-slider" amplitude-playlist="playlist_key" amplitude-song-index="song_index"
   *
   * @access public
   */
  function handle() {
    /*
    Gets the percentage of the song we will be setting the location for.
    */
    var locationPercentage = this.value;

    /*
      Computes the time in seconds for the current song.
    */
    var computedTime = _config2.default.audio.duration * (locationPercentage / 100);

    /*
      Gets the attributes for playlist and index for the element.
    */
    var playlist = this.getAttribute("data-amplitude-playlist");
    var song = this.getAttribute("data-amplitude-song-index");

    /*
      If no playlist or song is defined, then it's a global song slider.
    */
    if (playlist == null && song == null) {
      handleGlobalSongSlider(computedTime, locationPercentage);
    }

    /*
      If a playlist but no song is defined, then it's playlist slider.
    */
    if (playlist != null && song == null) {
      handlePlaylistSongSlider(computedTime, locationPercentage, playlist);
    }

    /*
      If no playlist but a song is defined, then it's a song slider.
    */
    if (playlist == null && song != null) {
      handleSongSongSlider(computedTime, locationPercentage, song);
    }

    /*
      If playlist and song are defined then it's a song in a playlist
      slider.
    */
    if (playlist != null && song != null) {
      handleSongInPlaylistSongSlider(computedTime, locationPercentage, playlist, song);
    }
  }

  /**
   * Handles a change on a global audio slider
   *
   * @access private
   * @param {integer} computedTime  - The time we will set the audio to.
   * @param {float}   locationPercentage - The percent through the song.
   */
  function handleGlobalSongSlider(computedTime, locationPercentage) {
    /*
    If the active song is not live, set the current time and adjust the slider.
    */
    if (!_config2.default.active_metadata.live) {
      _time2.default.setCurrentTime(computedTime);

      /*
        Sync song slider elements.
      */
      _songSliderElements2.default.sync(locationPercentage, _config2.default.active_playlist, _config2.default.active_index);
    }
  }

  /**
   * Handles a change on a playlist audio slider
   *
   * @access private
   * @param {integer} computedTime  - The time we will set the audio to.
   * @param {float}   locationPercentage - The percent through the song.
   * @param {string}  playlist = The playlist the song slider belongs to.
   */
  function handlePlaylistSongSlider(computedTime, locationPercentage, playlist) {
    /*
    We don't want to song slide a playlist that's not the
    active placylist.
    */
    if (_config2.default.active_playlist == playlist) {
      /*
      If the active song is not live, set the current time
      */
      if (!_config2.default.active_metadata.live) {
        _time2.default.setCurrentTime(computedTime);

        /*
          Sync song slider elements.
        */
        _songSliderElements2.default.sync(locationPercentage, playlist, _config2.default.active_index);
      }
    }
  }

  /**
   * Handles a change on a song audio slider
   *
   * @access private
   * @param {integer} computedTime  - The time we will set the audio to.
   * @param {float}   locationPercentage - The percent through the song.
   * @param {integer} songIndex = The song being navigated.
   */
  function handleSongSongSlider(computedTime, locationPercentage, songIndex) {
    /*
      We only want to move the slider if the active song is the
      same as the song being selected.
    */
    if (_config2.default.active_index == songIndex && _config2.default.active_playlist == null) {
      /*
      If the active song is not live, set the current time
      */
      if (!_config2.default.active_metadata.live) {
        _time2.default.setCurrentTime(computedTime);

        /*
          Sync song slider elements.
        */
        _songSliderElements2.default.sync(locationPercentage, _config2.default.active_playlist, songIndex);
      }
    }
  }

  /**
   * Handles a change on a song audio slider
   *
   * @access private
   * @param {integer} computedTime  - The time we will set the audio to.
   * @param {float}   locationPercentage - The percent through the song.
   * @param {integer} playlist = The playlist the song belongs to.
   * @param {integer} songIndex = The song being navigated.
   */
  function handleSongInPlaylistSongSlider(computedTime, locationPercentage, playlist, songIndex) {
    /*
      We only want to move the slider if the active song is the
      same as the song being selected and the active playlist is the same
      as the playlist selected.
    */
    if (_config2.default.playlists[playlist].active_index == songIndex && _config2.default.active_playlist == playlist) {
      /*
      If the active song is not live, set the current time
      */
      if (!_config2.default.active_metadata.live) {
        _time2.default.setCurrentTime(computedTime);

        /*
          Sync song slider elements.
        */
        _songSliderElements2.default.sync(locationPercentage, playlist, songIndex);
      }
    }
  }

  /*
    Return public facing methods
  */
  return {
    handle: handle
  };
}();

/**
 * Imports the song slider elements.
 * @module visual/SongSliderElements
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = SongSlider;
module.exports = exports["default"];

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _configState = __webpack_require__(6);

var _configState2 = _interopRequireDefault(_configState);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the stop events
 * @module events/Stop
 */


/**
 * Imports the AmplitudeJS Play Pause Elements
 * @module visual/PlayPauseElements
 */
/**
 * Imports the config module
 * @module config
 */
var Stop = function () {
  /**
   * Handles an event on a stop element.
   *
   * HANDLER FOR:       class="amplitude-stop"
   *
   * @access public
   */
  function handle() {
    /*
      If touch is not moving, we run. We don't want to accidentally press
      stop if touch is moving.
    */
    if (!_config2.default.is_touch_moving) {
      /*
      Sets all of the play/pause buttons to pause
      */
      _playPauseElements2.default.syncToPause();

      /*
      Stops the active song.
      */
      _core2.default.stop();
    }
  }

  /**
   * Returns public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Core Methods
 * @module core/Core
 */


/**
 * Imports the config state module.
 * @module utilities/configState
 */
exports.default = Stop;
module.exports = exports["default"];

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _bufferedProgressElements = __webpack_require__(24);

var _bufferedProgressElements2 = _interopRequireDefault(_bufferedProgressElements);

var _timeElements = __webpack_require__(15);

var _timeElements2 = _interopRequireDefault(_timeElements);

var _songSliderElements = __webpack_require__(14);

var _songSliderElements2 = _interopRequireDefault(_songSliderElements);

var _songPlayedProgressElements = __webpack_require__(20);

var _songPlayedProgressElements2 = _interopRequireDefault(_songPlayedProgressElements);

var _time = __webpack_require__(23);

var _time2 = _interopRequireDefault(_time);

var _callbacks = __webpack_require__(9);

var _callbacks2 = _interopRequireDefault(_callbacks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Event Handler for Time Update
 *
 * @module events/TimeUpdate
 */


/**
 * Imports the Time utility class
 * @module utilities/Time
 */


/**
 * Imports the Song Slider Elements visual class.
 * @module visual/songSliderElements
 */


/**
 * Imports the Buffered Progress Elements visual class
 * @module visual/bufferedProgressElements
 */
var TimeUpdate = function () {
  /**
   * When the time updates on the active song, we sync the current time displays
   *
   * HANDLER FOR: timeupdate
   *
   * @access public
   */
  function handle() {
    /*
      Computes the buffered time.
    */
    computeBufferedTime();

    /*
      Sync the buffered progress elements.
    */
    _bufferedProgressElements2.default.sync();

    /*
      Updates the current time information.
    */
    updateTimeInformation();

    /*
      Run time callbacks
    */
    runTimeCallbacks();
  }

  /**
   * Computes the buffered time
   */
  function computeBufferedTime() {
    /*
      Help from: http://jsbin.com/badimipi/1/edit?html,js,output
    */
    if (_config2.default.audio.buffered.length - 1 >= 0) {
      var bufferedEnd = _config2.default.audio.buffered.end(_config2.default.audio.buffered.length - 1);
      var duration = _config2.default.audio.duration;

      _config2.default.buffered = bufferedEnd / duration * 100;
    }
  }

  /**
   * Updates the current time information.
   * @access private
   */
  function updateTimeInformation() {
    /*
      If the current song is not live, then
      we can update the time information. Otherwise the
      current time updates wouldn't mean much since the time
      is infinite.
    */
    if (!_config2.default.active_metadata.live) {
      /*
        Compute the current time
      */
      var currentTime = _time2.default.computeCurrentTimes();

      /*
        Compute the song completion percentage
      */
      var songCompletionPercentage = _time2.default.computeSongCompletionPercentage();

      /*
        Computes the song duration
      */
      var songDuration = _time2.default.computeSongDuration();

      /*
        Sync the current time elements with the current
        location of the song and the song duration elements with
        the duration of the song.
      */
      _timeElements2.default.syncCurrentTimes(currentTime);

      /*
        Sync the song slider elements.
      */
      _songSliderElements2.default.sync(songCompletionPercentage, _config2.default.active_playlist, _config2.default.active_index);

      /*
        Sync the song played progress elements.
      */
      _songPlayedProgressElements2.default.sync(songCompletionPercentage);

      /*
        Sync the duration time elements.
      */
      _timeElements2.default.syncDurationTimes(currentTime, songDuration);
    }
  }

  /**
   * Runs a callback at a certain time in the song.
   */
  function runTimeCallbacks() {
    /*
      Gets the current seconds into the song.
    */
    var currentSeconds = Math.floor(_config2.default.audio.currentTime);

    /*
      Checks to see if there is a callback at the certain seconds into the song.
    */
    if (_config2.default.active_metadata.time_callbacks != undefined && _config2.default.active_metadata.time_callbacks[currentSeconds] != undefined) {
      /*
        Checks to see if the callback has been run. Since the time updates more than
        one second, we don't want the callback to run X times.
      */
      if (!_config2.default.active_metadata.time_callbacks[currentSeconds].run) {
        _config2.default.active_metadata.time_callbacks[currentSeconds].run = true;
        _config2.default.active_metadata.time_callbacks[currentSeconds]();
      }
    } else {
      /*
        Iterate over all of the callbacks for a song. If the song has one, we flag
        the run as false. This occurs because we have passed the active second for
        the callback, so we flag it as not run. It will either run again if the user
        seeks back or not run in the future.
      */
      for (var seconds in _config2.default.active_metadata.time_callbacks) {
        if (_config2.default.active_metadata.time_callbacks.hasOwnProperty(seconds)) {
          _config2.default.active_metadata.time_callbacks[seconds].run = false;
        }
      }
    }
  }
  /**
   * Returns public functions
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the Callback utility class
 * @module utilities/Callbacks
 */


/**
 * Imports the Song Played Progress Elements visual class.
 * @module visual/songPlayedProgressElements
 */


/**
 * Imports the Time Elements visual class.
 * @module visual/timeElements
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = TimeUpdate;
module.exports = exports["default"];

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _muteElements = __webpack_require__(10);

var _muteElements2 = _interopRequireDefault(_muteElements);

var _volumeSliderElements = __webpack_require__(11);

var _volumeSliderElements2 = _interopRequireDefault(_volumeSliderElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all events for a volume down event.
 * @module events/VolumeDown
 */


/**
 * Imports the AmplitudeJS Visual Mute Elements
 * @module visual/MuteElements
 */
/**
 * Imports the config to use the values
 */
var VolumeDown = function () {
  /**
   * Handles a click on a volume down element.
   *
   * HANDLER FOR:       class="amplitude-volume-down"
   *
   * @access public
   */
  function handle() {
    /*
      We don't fire this if the user is touching the screen and it's moving.
      This could lead to a mis-fire
    */
    if (!_config2.default.is_touch_moving) {
      /*
      The volume range is from 0 to 1 for an audio element. We make this
      a base of 100 for ease of working with.
      If the new value is less than 100, we use the new calculated
      value which gets converted to the proper unit for the audio element.
      If the new value is greater than 100, we set the volume to 1 which
      is the max for the audio element.
      */
      var volume = null;

      if (_config2.default.volume - _config2.default.volume_increment > 0) {
        volume = _config2.default.volume - _config2.default.volume_increment;
      } else {
        volume = 0;
      }

      /*
      Calls the core function to set the volume to the computed value
      based on the user's intent.
      */
      _core2.default.setVolume(volume);

      /*
        Sync Mute Elements.
      */
      _muteElements2.default.setMuted(_config2.default.volume == 0 ? true : false);

      /*
        Sync Volume Slider Elements
      */
      _volumeSliderElements2.default.sync();
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Visual Volume Slider Elements
 * @module visual/VolumeSliderElements
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/core
 */
exports.default = VolumeDown;
module.exports = exports["default"];

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _muteElements = __webpack_require__(10);

var _muteElements2 = _interopRequireDefault(_muteElements);

var _volumeSliderElements = __webpack_require__(11);

var _volumeSliderElements2 = _interopRequireDefault(_volumeSliderElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all events for a volume up event.
 * @module events/VolumeSlider
 */


/**
 * Imports the AmplitudeJS Visual Mute Elements
 * @module visual/MuteElements
 */
/**
 * Imports the config to use the values
 */
var VolumeSlider = function () {
  /**
   * Handles a change on the volume slider
   *
   * HANDLER FOR:       class="amplitude-volume-slider"
   *
   * @access public
   */
  function handle() {
    /*
    Calls the core function to set the volume to the computed value
    based on the user's intent.
    */
    _core2.default.setVolume(this.value);

    /*
      Sync Mute Elements.
    */
    _muteElements2.default.setMuted(_config2.default.volume == 0 ? true : false);

    /*
    Sync the volume slider locations
    */
    _volumeSliderElements2.default.sync();
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Visual Volume Slider Elements
 * @module visual/VolumeSliderElements
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/core
 */
exports.default = VolumeSlider;
module.exports = exports["default"];

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _muteElements = __webpack_require__(10);

var _muteElements2 = _interopRequireDefault(_muteElements);

var _volumeSliderElements = __webpack_require__(11);

var _volumeSliderElements2 = _interopRequireDefault(_volumeSliderElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all events for a volume up event.
 * @module events/VolumeUp
 */


/**
 * Imports the AmplitudeJS Visual Mute Elements
 * @module visual/MuteElements
 */
/**
 * Imports the config to use the values
 */
var VolumeUp = function () {
  /**
   * Handles a click on a volume up element.
   *
   * HANDLER FOR:       class="amplitude-volume-up"
   *
   * @access public
   */
  function handle() {
    /*
      We don't fire this if the user is touching the screen and it's moving.
      This could lead to a mis-fire
    */
    if (!_config2.default.is_touch_moving) {
      /*
      The volume range is from 0 to 1 for an audio element. We make this
      a base of 100 for ease of working with.
      If the new value is less than 100, we use the new calculated
      value which gets converted to the proper unit for the audio element.
      If the new value is greater than 100, we set the volume to 1 which
      is the max for the audio element.
      */
      var volume = null;

      if (_config2.default.volume + _config2.default.volume_increment <= 100) {
        volume = _config2.default.volume + _config2.default.volume_increment;
      } else {
        volume = 100;
      }

      /*
      Calls the core function to set the volume to the computed value
      based on the user's intent.
      */
      _core2.default.setVolume(volume);

      /*
        Sync Mute Elements.
      */
      _muteElements2.default.setMuted(_config2.default.volume == 0 ? true : false);

      /*
        Sync Volume Slider Elements
      */
      _volumeSliderElements2.default.sync();
    }
  }

  /**
   * Returns the public facing methods
   */
  return {
    handle: handle
  };
}();

/**
 * Imports the AmplitudeJS Visual Volume Slider Elements
 * @module visual/VolumeSliderElements
 */


/**
 * Imports the AmplitudeJS Core Methods
 * @module core/core
 */
exports.default = VolumeUp;
module.exports = exports["default"];

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS FX Module. Helps with configuring and setting up visualizations
 * and any other features of the Web Audio API that Amplitude takes advantage
 * of.
 *
 * @module fx/FX
 */
var Fx = function () {
  /**
   * Configures the Web Audio API to work with AmplitudeJS
   */
  function configureWebAudioAPI() {
    /*
    Gets the context for the browser. If this is null, the Web Audio
    API is unavailable.
    */
    var browserContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext;

    /*
    If we have a context, the Web Audio API is available and we can continue,
    otherwise, we alert the user if they have debug turned on.
    */
    if (browserContext) {
      /*
      Web Audio API is available, set the context in our config.
      */
      _config2.default.context = new browserContext();

      /*
      Create an analyzer that we will use in the context.
      */
      _config2.default.analyser = _config2.default.context.createAnalyser();

      /*
      Set cross origin to anonymous so we have a better chance of being able
      to use the power of the Web Audio API.
      */
      _config2.default.audio.crossOrigin = "anonymous";

      /*
      Bind the source to the Javascript Audio Element.
      */
      _config2.default.source = _config2.default.context.createMediaElementSource(_config2.default.audio);

      /*
      Connect the analyser to the source
      */
      _config2.default.source.connect(_config2.default.analyser);

      /*
      Connect the context destination to the analyser.
      */
      _config2.default.analyser.connect(_config2.default.context.destination);
    } else {
      AmplitudeHelpers.writeDebugMessage("Web Audio API is unavailable! We will set any of your visualizations with your back up definition!");
    }
  }

  /**
   * Determines if the web audio API is available or not.
   */
  function webAudioAPIAvailable() {
    /*
    Gets the context for the browser. If this is null, the Web Audio
    API is unavailable.
    */
    var browserContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext;
    _config2.default.web_audio_api_available = false;

    /*
    Determines if the Web Audio API is available or not.
    */
    if (browserContext) {
      /*
      Set the flag in the config that the Web Audio API is available
      */
      _config2.default.web_audio_api_available = true;
      return true;
    } else {
      /*
      Set the flag in the config that the Web Audio API is not available
      */
      _config2.default.web_audio_api_available = false;
      return false;
    }
  }

  /**
   * Determines if the user is using any of the web audio API features.
   */
  function determineUsingAnyFX() {
    var waveforms = document.querySelectorAll(".amplitude-wave-form");
    var visualizationElements = document.querySelectorAll(".amplitude-visualization");

    if (waveforms.length > 0 || visualizationElements.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  /*
  Returns the publicly accessible methods
  */
  return {
    configureWebAudioAPI: configureWebAudioAPI,
    webAudioAPIAvailable: webAudioAPIAvailable,
    determineUsingAnyFX: determineUsingAnyFX
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = Fx;
module.exports = exports["default"];

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _init = __webpack_require__(21);

var _init2 = _interopRequireDefault(_init);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

var _shuffler = __webpack_require__(13);

var _shuffler2 = _interopRequireDefault(_shuffler);

var _configState = __webpack_require__(6);

var _configState2 = _interopRequireDefault(_configState);

var _audioNavigation = __webpack_require__(3);

var _audioNavigation2 = _interopRequireDefault(_audioNavigation);

var _repeater = __webpack_require__(12);

var _repeater2 = _interopRequireDefault(_repeater);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _visualizations = __webpack_require__(16);

var _visualizations2 = _interopRequireDefault(_visualizations);

var _shuffleElements = __webpack_require__(19);

var _shuffleElements2 = _interopRequireDefault(_shuffleElements);

var _repeatElements = __webpack_require__(8);

var _repeatElements2 = _interopRequireDefault(_repeatElements);

var _songSliderElements = __webpack_require__(14);

var _songSliderElements2 = _interopRequireDefault(_songSliderElements);

var _songPlayedProgressElements = __webpack_require__(20);

var _songPlayedProgressElements2 = _interopRequireDefault(_songPlayedProgressElements);

var _timeElements = __webpack_require__(15);

var _timeElements2 = _interopRequireDefault(_timeElements);

var _playPauseElements = __webpack_require__(2);

var _playPauseElements2 = _interopRequireDefault(_playPauseElements);

var _metaDataElements = __webpack_require__(7);

var _metaDataElements2 = _interopRequireDefault(_metaDataElements);

var _playbackSpeedElements = __webpack_require__(18);

var _playbackSpeedElements2 = _interopRequireDefault(_playbackSpeedElements);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

var _soundcloud = __webpack_require__(17);

var _soundcloud2 = _interopRequireDefault(_soundcloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Amplitude should just be an interface to the public functions.
 * Everything else should be handled by other objects
 *
 * @module Amplitude
 */


/**
 * Meta Data Elements
 * @module visual/MetaDataElements
 */


/**
 * Time Elements
 * @module visual/TimeElements
 */


/**
 * Song Slider Elements
 * @module visual/SongSliderElements
 */


/****************************************************
 * Elements
 ****************************************************/
/**
 * Visual Shuffle Elements
 * @module visual/ShuffleElements
 */


/**
 * Imports the checks
 * @module utilities/Checks
 */


/**
 * Imports the audio navigation
 * @module utilities/AudioNavigation
 */


/****************************************************
 * Utilities
 ****************************************************/
/**
 * Shuffler Module
 * @module utilities/Shuffler
 */


/****************************************************
 * Config
 ****************************************************/
/**
 * Imports the config module
 * @module config
 */
var Amplitude = function () {
  /**
   * The main init function.  The user will call this through
   * Amplitude.init({}) and pass in their settings.
   *
   * Public Accessor: Amplitude.init( user_config_json );
   *
   * @access public
   * @param {object} userConfig 	- A JSON object of user defined values that helps configure and initialize AmplitudeJS.
   */
  function init(userConfig) {
    _init2.default.initialize(userConfig);
  }

  /**
   * Returns the current config for AmplitudeJS
   */
  function getConfig() {
    return _config2.default;
  }

  /**
   * Binds new elements that were added to the page.
   *
   * Public Accessor: Amplitude.bindNewElements()
   *
   * @access public
   */
  function bindNewElements() {
    _init2.default.rebindDisplay();
  }

  /**
   * Returns the active playlist.
   *
   * Public Accessor: Amplitude.getActivePlaylist()
   *
   * @access public
   */
  function getActivePlaylist() {
    return _config2.default.active_playlist;
  }

  /**
   * Returns the current playback speed.
   *
   * Public Accessor: Amplitude.getPlaybackSpeed()
   *
   * @access public
   */
  function getPlaybackSpeed() {
    return _config2.default.playback_speed;
  }

  /**
   * Sets the playback speed
   *
   * Public Accessor: Amplitude.setPlaybackSpeed( speed )
   *
   * @access public
   */
  function setPlaybackSpeed(speed) {
    /*
      Increments are set in .5 We only accept values
      1, 1.5, 2
       1 -> Regular Speed
      1.5 -> 50% faster
      2 -> Twice as fast
    */
    _core2.default.setPlaybackSpeed(speed);

    /*
      Visually sync the playback speed.
    */
    _playbackSpeedElements2.default.sync();
  }

  /**
   * Gets the repeat state of the player.
   *
   * Public Accessor: Amplitude.getRepeat()
   *
   * @access public
   */
  function getRepeat() {
    return _config2.default.repeat;
  }

  /**
   * Gets the repeat state for a playlist
   *
   * Public Accessor: Amplitude.getRepeatPlaylist()
   *
   * @access public
   */
  function getRepeatPlaylist(playlistKey) {
    return _config2.default.playlists[playlistKey].repeat;
  }

  /**
   * Returns the shuffle state of the player.
   *
   * Public Accessor: Amplitude.getShuffle()
   *
   * @access public
   */
  function getShuffle() {
    return _config2.default.shuffle_on;
  }

  /**
   * Returns the shuffle state of the playlist.
   *
   * Public Accessor: Amplitude.getShufflePlaylist( playlist )
   *
   * @access public
   * @param {string} playlist 	- The key representing the playlist ID to see if it's shuffled or not.
   */
  function getShufflePlaylist(playlist) {
    return _config2.default.playlists[playlist].shuffle;
  }

  /**
   * Sets the shuffle state for the player.
   *
   * Public Accessor: Amplitude.setShuffle()
   *
   * @param {boolean} shuffle  	- True when we are shuffling the songs, false when we turn off shuffle.
   *
   * @access public
   */
  function setShuffle(shuffle) {
    _shuffler2.default.setShuffle(shuffle);

    _shuffleElements2.default.syncMain();
  }

  /**
   * Sets the shuffle state for the playlist
   *
   * Public Accessor: Amplitude.setShufflePlaylist( playlist )
   *
   * @access public
   * @param {string} playlist 	- The key representing the playlist ID to to shuffle the playlist.
   * @param {boolean} shuffle 	- True when we are shuffling the playlist, false when we turn off shuffle.
   */
  function setShufflePlaylist(playlist, shuffle) {
    _shuffler2.default.setShufflePlaylist(playlist, shuffle);

    _shuffleElements2.default.syncMain();
    _shuffleElements2.default.syncPlaylist(playlist);
  }

  /**
   * Sets the repeat state for the player.
   *
   * Public Accessor: Amplitude.setRepeat()
   *
   * @access public
   * @param {boolean} repeatState 	- The state you want the repeat song to be in.
   */
  function setRepeat(repeatState) {
    _repeater2.default.setRepeat(repeatState);
    _repeatElements2.default.syncRepeat();
  }

  /**
   * Sets the repeat state for a playlist.
   *
   * Public Accessor: Amplitude.setRepeatPlaylist( playlistKey )
   *
   * @access public
   * @param {string} playlist 	- The key representing the playlist ID to to shuffle the playlist.
   * @param {boolean} repeatState - The state you want the repeat playlist to be in.
   */
  function setRepeatPlaylist(playlist, repeatState) {
    _repeater2.default.setRepeatPlaylist(repeatState, playlist);
    _repeatElements2.default.syncRepeatPlaylist(playlist);
  }

  /**
   * Sets the repeat state for the song.
   *
   * Public Accessor: Amplitude.setRepeatSong()
   *
   * @access public
   * @param {boolean} repeatState 	- The state you want the repeat song status to be in.
   */
  function setRepeatSong(repeatState) {
    if (!_config2.default.is_touch_moving) {
      /*
      Sets repeat to the opposite of what it was set to
      */
      _repeater2.default.setRepeatSong(!_config2.default.repeat_song);

      /*
      Visually sync repeat song
      */
      _repeatElements2.default.syncRepeatSong();
    }
  }

  /**
   * Gets the default album art for the player
   *
   * Public Accessor: Amplitude.getDefaultAlbumArt()
   *
   * @access public
   */
  function getDefaultAlbumArt() {
    return _config2.default.default_album_art;
  }

  /**
   * Gets the default playlist art for the playlists
   *
   * Public Accessor: Amplitude.getDefaultPlaylistArt()
   *
   * @access public
   */
  function getDefaultPlaylistArt() {
    return _config2.default.default_playlist_art;
  }

  /**
   * Sets the default album art for the player
   *
   * Public Accessor: Amplitude.setDefaultAlbumArt( url )
   *
   * @access public
   * @param {string} url 	- A string representing the URL of the new default album art.
   */
  function setDefaultAlbumArt(url) {
    _config2.default.default_album_art = url;
  }

  /**
   * Sets the default playlist art for the player
   *
   * Public Accessor: Amplitude.setDefaultPlaylistArt( url )
   *
   * @access public
   * @param {string} url - A string representing the URL of the new default playlist art.
   */
  function setDefaultPlaylistArt(url) {
    _config2.default.default_plalist_art = url;
  }

  /**
   * Allows the user to get the percentage of the song played.
   *
   * Public Accessor: Amplitude.getSongPlayedPercentage();
   *
   * @access public
   */
  function getSongPlayedPercentage() {
    /*
    Returns the percentage of the song played.
    */
    return _config2.default.audio.currentTime / _config2.default.audio.duration * 100;
  }

  /**
   * Allows the user to get the amount of seconds the song has played.
   *
   * Public Accessor: Amplitude.getSongPlayed();
   *
   * @access public
   */
  function getSongPlayedSeconds() {
    /*
    Returns the amount of seconds the song has played.
    */
    return _config2.default.audio.currentTime;
  }

  /**
   * Allows the user to get the duration of the current song
   *
   * Public Accessor: Amplitude.getSongPlayed();
   *
   * @access public
   */
  function getSongDuration() {
    /*
    Returns the duration of the current song
    */
    return _config2.default.audio.duration;
  }

  /**
   * Allows the user to set how far into the song they want to be. This is
   * helpful for implementing custom range sliders. Only works on the current song.
   *
   * Public Accessor: Amplitude.setSongPlayedPercentage( float );
   *
   * @access public
   * @param {number} percentage 	- The percentage of the song played
   */
  function setSongPlayedPercentage(percentage) {
    /*
    Ensures the percentage is a number and is between 0 and 100.
    */
    if (typeof percentage == "number" && percentage > 0 && percentage < 100) {
      /*
      Sets the current time of the song to the percentage.
      */
      _config2.default.audio.currentTime = _config2.default.audio.duration * (percentage / 100);
    }
  }

  /**
   * Allows the user to turn on debugging.
   *
   * Public Accessor: Amplitude.setDebug( bool );
   *
   * @access public
   * @param {boolean} state 		- Turns debugging on and off.
   */
  function setDebug(state) {
    /*
    Sets the global config debug on or off.
    */
    _config2.default.debug = state;
  }

  /**
   * Returns the active song meta data for the user to do what is
   * needed.
   *
   * Public Accessor: Amplitude.getActiveSongMetadata();
   *
   * @access public
   * @returns {object} JSON Object with the active song information
   */
  function getActiveSongMetadata() {
    return _config2.default.active_metadata;
  }

  /**
   * Returns the active playlist meta data for the for the user to use.
   *
   * Public Accessor: Amplitude.getActivePlaylistMetadata();
   *
   * @access public
   * @returns {object} JSON representation for the active playlist
   */
  function getActivePlaylistMetadata() {
    return _config2.default.playlists[_config2.default.active_playlist];
  }

  /**
   * Returns a song in the songs array at that index
   *
   * Public Accessor: Amplitude.getSongAtIndex( song_index )
   *
   * @access public
   * @param {number} index 	- The integer for the index of the song in the songs array.
   * @returns {object} JSON representation for the song at a specific index.
   */
  function getSongAtIndex(index) {
    return _config2.default.songs[index];
  }

  /**
   * Returns a song at a playlist index
   *
   * Public Accessor: Amplitude.getSongAtPlaylistIndex( playlist, index
   *
   * @access public
   * @param {number} index 			- The integer for the index of the song in the playlist.
   * @param {string} playlist		- The key of the playlist we are getting the song at the index for
   * @returns {object} JSON representation for the song at a specific index.
   */
  function getSongAtPlaylistIndex(playlist, index) {
    var song = _config2.default.playlists[playlist].songs[index];

    return song;
  }

  /**
   * Adds a song to the end of the config array.  This will allow Amplitude
   * to play the song in a playlist type setting.
   *
   * Public Accessor: Amplitude.addSong( song_json )
   *
   * @access public
   * @param {object} song 	- JSON representation of a song.
   * @returns {number} New index of the song.
   */
  function addSong(song) {
    /*
    Ensures we have a songs array to push to.
    */
    if (_config2.default.songs == undefined) {
      _config2.default.songs = [];
    }

    _config2.default.songs.push(song);

    if (_config2.default.shuffle_on) {
      _config2.default.shuffle_list.push(song);
    }

    if (_soundcloud2.default.isSoundCloudURL(song.url)) {
      _soundcloud2.default.resolveIndividualStreamableURL(song.url, null, _config2.default.songs.length - 1, _config2.default.shuffle_on);
    }

    return _config2.default.songs.length - 1;
  }

  /**
   * Adds a song to the beginning of the config array.
   * This will allow Amplitude to play the song in a
   * playlist type setting.
   *
   * Public Accessor: Amplitude.addSong( song_json )
   *
   * @access public
   * @param {object} song 	- JSON representation of a song.
   * @returns {number} New index of the song (0)
   */
  function prependSong(song) {
    /*
    Ensures we have a songs array to push to.
    */
    if (_config2.default.songs == undefined) {
      _config2.default.songs = [];
    }

    _config2.default.songs.unshift(song);

    if (_config2.default.shuffle_on) {
      _config2.default.shuffle_list.unshift(song);
    }

    if (_soundcloud2.default.isSoundCloudURL(song.url)) {
      _soundcloud2.default.resolveIndividualStreamableURL(song.url, null, _config2.default.songs.length - 1, _config2.default.shuffle_on);
    }

    return 0;
  }

  /**
   * Adds a song to a playlist. This will allow Amplitude to play the song in the
   * playlist
   *
   * Public Accessor: Amplitude.addSongToPlaylist( song_json, playlist_key )
   *
   * @access public
   * @param {object} song 			- JSON representation of a song.
   * @param {string} playlist		- Playlist we are adding the song to.
   * @returns {mixed} New index of song in playlist or null if no playlist exists
   */
  function addSongToPlaylist(song, playlist) {
    if (_config2.default.playlists[playlist] != undefined) {
      _config2.default.playlists[playlist].songs.push(song);

      if (_config2.default.playlists[playlist].shuffle) {
        _config2.default.playlists[playlist].shuffle_list.push(song);
      }

      if (_soundcloud2.default.isSoundCloudURL(song.url)) {
        _soundcloud2.default.resolveIndividualStreamableURL(song.url, playlist, _config2.default.playlists[playlist].songs.length - 1, _config2.default.playlists[playlist].shuffle);
      }

      return _config2.default.playlists[playlist].songs.length - 1;
    } else {
      _debug2.default.writeMessage("Playlist doesn't exist!");
      return null;
    }
  }

  /**
   * Adds a playlist to Amplitude.
   *
   * @param {string} key  - The key of the playlist we are adding.
   * @param {object} data - The data relating to the playlist
   * @param {array} songs - The songs to add to the playlist
   */
  function addPlaylist(key, data, songs) {
    /*
      Ensures the playlist is not already defined.
    */
    if (_config2.default.playlists[key] == undefined) {
      /*
        Initialize the new playlist object.
      */
      _config2.default.playlists[key] = {};

      /*
        Define the ignored keys that we don't want to copy over.
      */
      var ignoredKeys = ["repeat", "shuffle", "shuffle_list", "songs", "src"];

      /*
        Iterate over all of the keys defined by the user and
        set them on the playlist.
      */
      for (var dataKey in data) {
        if (ignoredKeys.indexOf(dataKey) < 0) {
          _config2.default.playlists[key][dataKey] = data[dataKey];
        }
      }

      /*
        Initialize the default parameters for the playlist and set the songs.
      */
      _config2.default.playlists[key].songs = songs;
      _config2.default.playlists[key].active_index = null;
      _config2.default.playlists[key].repeat = false;
      _config2.default.playlists[key].shuffle = false;
      _config2.default.playlists[key].shuffle_list = [];

      return _config2.default.playlists[key];
    } else {
      _debug2.default.writeMessage("A playlist already exists with that key!");
      return null;
    }
  }

  /**
   * Removes a song from the song array
   *
   * Public Accessor: Amplitude.removeSong( index )
   *
   * @access public
   * @param {integer} index - Index of the song being removed
   * @returns {boolean} True if removed false if not.
   */
  function removeSong(index) {
    _config2.default.songs.splice(index, 1);
  }

  /**
   * Removes a song from the playlist
   *
   * Public Accessor: Amplitude.removeSongFromPlaylist( index, playlist )
   *
   * @access public
   * @param {integer} index 			- Index of the song being removed from the playlist.
   * @param {string} playlist			- Playlist we are removing the song from.
   * @returns {boolean} True if removed false if not.
   */
  function removeSongFromPlaylist(index, playlist) {
    if (_config2.default.playlists[playlist] != undefined) {
      _config2.default.playlists[playlist].songs.splice(index, 1);
    }
  }

  /**
   * When you pass a song object it plays that song right awawy.  It sets
   * the active song in the config to the song you pass in and synchronizes
   * the visuals.
   *
   * Public Accessor: Amplitude.playNow( song )
   *
   * @access public
   * @param {object} song 	- JSON representation of a song.
   */
  function playNow(song) {
    /*
    Makes sure the song object has a URL associated with it
    or there will be nothing to play.
    */
    if (song.url) {
      _config2.default.audio.src = song.url;
      _config2.default.active_metadata = song;
      _config2.default.active_album = song.album;
    } else {
      /*
      Write error message since the song passed in doesn't
      have a URL.
      */
      _debug2.default.writeMessage("The song needs to have a URL!");
    }

    /*
    Plays the song.
    */
    _core2.default.play();

    /*
    Sets the main song control status visual
    */
    _playPauseElements2.default.sync();

    /*
    Update the song meta data
    */
    _metaDataElements2.default.displayMetaData();

    /*
    Reset the song sliders, song progress bar info, and
    reset times. This ensures everything stays in sync.
    */
    _songSliderElements2.default.resetElements();

    /*
    Reset the song played progress elements.
    */
    _songPlayedProgressElements2.default.resetElements();

    /*
    Reset all of the current time elements.
    */
    _timeElements2.default.resetCurrentTimes();

    /*
    Reset all of the duration time elements.
    */
    _timeElements2.default.resetDurationTimes();
  }

  /**
   * Plays a song at the index passed in from the songs array.
   *
   * Public Accessor: Amplitude.playSongAtIndex( index )
   *
   * @access public
   * @param {number} index 	- The number representing the song in the songs array.
   */
  function playSongAtIndex(index) {
    /*
    Stop the current song.
    */
    _core2.default.stop();

    /*
    Determine if there is a new playlist, if so set the active playlist and change the song.
    */
    if (_checks2.default.newPlaylist(null)) {
      _audioNavigation2.default.setActivePlaylist(null);

      _audioNavigation2.default.changeSong(_config2.default.songs[index], index);
    }

    /*
    Check if the song is new. If so, change the song.
    */
    if (_checks2.default.newSong(null, index)) {
      _audioNavigation2.default.changeSong(_config2.default.songs[index], index);
    }

    /*
    Play the song
    */
    _core2.default.play();

    /*
    Sync all of the play pause buttons.
    */
    _playPauseElements2.default.sync();
  }

  /**
   * Plays a song at the index passed in for the playlist provided. The index passed
   * in should be the index of the song in the playlist and not the songs array.
   *
   * @access public
   * @param {number} index 		- The number representing the song in the playlist array.
   * @param {string} playlist - The key string representing the playlist we are playing the song from.
   *
   */
  function playPlaylistSongAtIndex(index, playlist) {
    _core2.default.stop();

    /*
    Determine if there is a new playlist, if so set the active playlist and change the song.
    */
    if (_checks2.default.newPlaylist(playlist)) {
      _audioNavigation2.default.setActivePlaylist(playlist);

      _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[index], index);
    }

    /*
    Check if the song is new. If so, change the song.
    */
    if (_checks2.default.newSong(playlist, index)) {
      _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[index], index);
    }

    /*
    Sync all of the play pause buttons.
    */
    _playPauseElements2.default.sync();

    /*
    Play the song
    */
    _core2.default.play();
  }

  /**
   * Allows the user to play whatever the active song is directly
   * through Javascript. Normally ALL of Amplitude functions that access
   * the core features are called through event handlers.
   *
   * Public Accessor: Amplitude.play();
   *
   * @access public
   */
  function play() {
    _core2.default.play();
  }

  /**
   * Allows the user to pause whatever the active song is directly
   * through Javascript. Normally ALL of Amplitude functions that access
   * the core features are called through event handlers.
   *
   * Public Accessor: Amplitude.pause();
   *
   * @access public
   */
  function pause() {
    _core2.default.pause();
  }

  /**
   * Allows the user to stop whatever the active song is directly
   * through Javascript.
   *
   * Public Accessor: Amplitude.stop();
   *
   * @access public
   */
  function stop() {
    _core2.default.stop();
  }

  /**
   * Returns the audio object used to play the audio
   *
   * Public Accessor: Amplitude.getAudio();
   *
   * @access public
   */
  function getAudio() {
    return _config2.default.audio;
  }

  /**
   * Returns the Web Audio API ANalyser used for visualizations.
   *
   * Public Accessor: Amplitude.getAnalyser()
   *
   * @access public
   */
  function getAnalyser() {
    return _config2.default.analyser;
  }

  /**
   * Plays the next song either in the playlist or globally.
   *
   * Public Accessor: Amplitude.next( playlist );
   *
   * @access public
   * @param {string} [playlist = null 	- The playlist key
   */
  function next() {
    var playlist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var nextData = {};
    /*
    If the playlist is empty or null, then we check the active
    playlist
    */
    if (playlist == "" || playlist == null) {
      /*
      If the active playlist is null, then we set the next global
      song or we set the next in the playlist.
      */
      if (_config2.default.active_playlist == null || _config2.default.active_playlist == "") {
        _audioNavigation2.default.setNext();
      } else {
        _audioNavigation2.default.setNextPlaylist(_config2.default.active_playlist);
      }
    } else {
      _audioNavigation2.default.setNextPlaylist(playlist);
    }
  }

  /**
   * Plays the prev song either in the playlist or globally.
   *
   * Public Accessor: Amplitude.prev( playlist );
   *
   * @access public
   * @param {string} [playlist = null] 	- The playlist key
   */
  function prev() {
    var playlist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var prevData = {};

    /*
    If the playlist is empty or null, then we check the active
    playlist
    */
    if (playlist == "" || playlist == null) {
      /*
      If the active playlist is null, then we set the prev global
      song or we set the prev in the playlist.
      */
      if (_config2.default.active_playlist == null || _config2.default.active_playlist == "") {
        _audioNavigation2.default.setPrevious();
      } else {
        _audioNavigation2.default.setPreviousPlaylist(_config2.default.active_playlist);
      }
    } else {
      _audioNavigation2.default.setPreviousPlaylist(playlist);
    }
  }

  /**
   * Gets all of the songs in the songs array
   *
   * Public Accessor: Amplitude.getSongs( );
   *
   * @access public
   */
  function getSongs() {
    return _config2.default.songs;
  }

  /**
   * Gets all of the songs in a playlist
   *
   * Public Accessor: Amplitude.getSongsInPlaylist( playlist );
   *
   * @access public
   * @param {string} playlist 	- The playlist key
   */
  function getSongsInPlaylist(playlist) {
    return _config2.default.playlists[playlist].songs;
  }

  /**
   * Get current state of songs. If shuffled, this will return the shuffled
   * songs.
   *
   * Public Accessor: Amplitude.getSongsState();
   *
   * @access public
   */
  function getSongsState() {
    if (_config2.default.shuffle_on) {
      return _config2.default.shuffle_list;
    } else {
      return _config2.default.songs;
    }
  }

  /**
   * Get current state of songs in playlist. If shuffled, this will return the
   * shuffled songs.
   *
   * Public Accessor: Amplitude.getSongsStatePlaylist( playlist );
   *
   * @access public
   * @param {string} playlist 	- The playlist key
   */
  function getSongsStatePlaylist(playlist) {
    if (_config2.default.playlists[playlist].shuffle) {
      return _config2.default.playlists[playlist].shuffle_list;
    } else {
      return _config2.default.playlists[playlist].songs;
    }
  }

  /**
   * Gets the active index of the player
   *
   * Public Accessor: Amplitude.getActiveIndex()
   *
   * @access public
   */
  function getActiveIndex() {
    return parseInt(_config2.default.active_index);
  }

  /**
   * Get the version of AmplitudeJS
   *
   * Public Accessor: Amplitude.getVersion()
   *
   * @access public
   */
  function getVersion() {
    return _config2.default.version;
  }

  /**
   * Get the buffered amount for the current song
   *
   * Public Accessor: Amplitude.getBuffered()
   *
   * @access public
   */
  function getBuffered() {
    return _config2.default.buffered;
  }

  /**
   * Skip to a certain location in a selected song.
   *
   * Public Accessor: Amplitude.getBuffered()
   *
   * @access public
   * @param {number} seconds 						- The amount of seconds we should skip to in the song.
   * @param {number} songIndex 					- The index of the song in the songs array.
   * @param {string} [playlist = null]	- The playlist the song we are skipping to belogns to.
   */
  function skipTo(seconds, songIndex) {
    var playlist = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    seconds = parseInt(seconds);

    if (playlist != null) {
      /*
        Checks if we are skipping to a new playlist
      */
      if (_checks2.default.newPlaylist(playlist)) {
        _audioNavigation2.default.setActivePlaylist(playlist);
      }

      /*
        Changes the song to where it's being skipped and then
        play the song.
      */
      _audioNavigation2.default.changeSongPlaylist(playlist, _config2.default.playlists[playlist].songs[songIndex], songIndex);
      _core2.default.play();

      /*
        Sync all of the play pause elements.
      */
      _playPauseElements2.default.syncGlobal();
      _playPauseElements2.default.syncPlaylist();
      _playPauseElements2.default.syncSong();

      /*
        Skip to the location in the song.
      */
      _core2.default.skipToLocation(seconds);
    } else {
      /*
        Changes the song to where it's being skipped and then
        play the song.
      */
      _audioNavigation2.default.changeSong(_config2.default.songs[songIndex], songIndex);
      _core2.default.play();

      /*
        Syncs all of the play pause buttons now that we've skipped.
      */
      _playPauseElements2.default.syncGlobal();
      _playPauseElements2.default.syncSong();

      /*
        Skip to the location in the song.
      */
      _core2.default.skipToLocation(seconds);
    }
  }

  /**
   * Sets the meta data for a song in the songs array. This will set any
   * meta data for a song besides the URL. The URL could cause issues if the
   * song was playing.
   *
   * Public Accessor: Amplitude.setSongMetaData()
   *
   * @access public
   * @param {number} index					- The index of the song in the songs array.
   * @param {object} metaData 			- The object containing the meta data we are updating.
   * @param {string} playlist       - The playlist we are updating the song meta data for.
   */
  function setSongMetaData(index, metaData) {
    var playlist = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    /*
      Update the meta data for a song in a playlist.
    */
    if (playlist != "" && playlist != null && _config2.default.playlists[playlist] != undefined) {
      /*
        Set all of the defined meta data properties
      */
      for (var key in metaData) {
        if (metaData.hasOwnProperty(key)) {
          if (key != "url" && key != "URL" && key != "live" && key != "LIVE") {
            _config2.default.playlists[playlist].songs[index][key] = metaData[key];
          }
        }
      }
    } else {
      /*
        Update the meta data for a song.
      */
      for (var key in metaData) {
        if (metaData.hasOwnProperty(key)) {
          if (key != "url" && key != "URL" && key != "live" && key != "LIVE") {
            _config2.default.songs[index][key] = metaData[key];
          }
        }
      }
    }

    /*
      Display the updates on the screen.
    */
    _metaDataElements2.default.displayMetaData();
    _metaDataElements2.default.syncMetaData();
  }

  function setPlaylistMetaData(playlist, metaData) {
    if (_config2.default.playlists[playlist] != undefined) {
      /*
      These are the ignored keys that we won't be worrying about displaying.
      Every other key in the playlist object can be displayed.
      */
      var ignoredKeys = ["repeat", "shuffle", "shuffle_list", "songs", "src"];

      for (var key in metaData) {
        if (metaData.hasOwnProperty(key)) {
          if (ignoredKeys.indexOf(key) < 0) {
            _config2.default.playlists[playlist][key] = metaData[key];
          }
        }
      }

      _metaDataElements2.default.displayPlaylistMetaData();
    } else {
      _debug2.default.writeMessage("You must provide a valid playlist key!");
    }
  }

  /**
   * Sets the delay between the songs when they are finished.
   *
   * Public Accessor: Amplitude.setDelay()
   *
   * @access public
   * @param {number} delay 	- The millisecond delay time between songs
   */
  function setDelay(time) {
    _config2.default.delay = time;
  }

  /**
   * Returns the current delay between songs.
   *
   * Public Accessor: Amplitude.getDelay()
   *
   * @access public
   */
  function getDelay() {
    return _config2.default.delay;
  }

  /**
   * Returns the state of the player.
   *
   * Public Accessor: Amplitude.getPlayerState();
   */
  function getPlayerState() {
    return _config2.default.player_state;
  }

  /**
   * Registers a visualization and sets that visualization's
   * preferences. When creating a visualization, you can set certain
   * preferences that the user can overwrite similar to Amplitude.
   * Public Accessor: Amplitude.registerVisualization( visualization, preferences )
   *
   * @param {object} visualzation A visualization object that gets registered
   * with Amplitude
   *
   * @param {object} preferences A JSON object of preferences relating to the
   * visualization
   */
  function registerVisualization(visualization, preferences) {
    _visualizations2.default.register(visualization, preferences);
  }

  /**
   * Set the visualization for the playlist
   *
   * @param {string} playlist - The playlist we are setting the visualization for.
   * @param {string} visualizationKey - The key of the visualization we are adding to the playlist.
   */
  function setPlaylistVisualization(playlist, visualizationKey) {
    if (_config2.default.playlists[playlist] != undefined) {
      if (_config2.default.visualizations.available[visualizationKey] != undefined) {
        _config2.default.playlists[playlist].visualization = visualizationKey;
      } else {
        _debug2.default.writeMessage("A visualization does not exist for the key provided.");
      }
    } else {
      _debug2.default.writeMessage("The playlist for the key provided does not exist");
    }
  }

  /**
   * Set a visualization for the song.
   *
   * @param {number} songIndex - The index of the song in the songs array we are setting the visualization for.
   * @param {string} visualizationKey - The key of the visualization we are adding to the playlist.
   */
  function setSongVisualization(songIndex, visualizationKey) {
    if (_config2.default.songs[songIndex]) {
      if (_config2.default.visualizations.available[visualizationKey] != undefined) {
        _config2.default.songs[songIndex].visualization = visualizationKey;
      } else {
        _debug2.default.writeMessage("A visualization does not exist for the key provided.");
      }
    } else {
      _debug2.default.writeMessage("A song at that index is undefined");
    }
  }

  /**
   * Set song in playlist visualization.
   *
   * @param {string} playlist - The playlist we are setting the song visualization for.
   * @param {number} songIndex - The index we are setting the visualization for.
   * @param {strong} visualizationKey - The key of the visualization we are adding to the song in the playlist.
   */
  function setSongInPlaylistVisualization(playlist, songIndex, visualizationKey) {
    if (_config2.default.playlists[playlist].songs[songIndex] != undefined) {
      if (_config2.default.visualizations.available[visualizationKey] != undefined) {
        _config2.default.playlists[playlist].songs[songIndex].visualization = visualizationKey;
      } else {
        _debug2.default.writeMessage("A visualization does not exist for the key provided.");
      }
    } else {
      _debug2.default.writeMessage("The song in the playlist at that key is not defined");
    }
  }

  /**
   * Sets the global visualization default.
   */
  function setGlobalVisualization(visualizationKey) {
    if (_config2.default.visualizations.available[visualizationKey] != undefined) {
      _config2.default.visualization = visualizationKey;
    } else {
      _debug2.default.writeMessage("A visualization does not exist for the key provided.");
    }
  }

  /**
   * Sets the active volume.
   * @param {number} volumeLevel - A number between 1 and 100 as a percentage of
   * min to max for a volume level.
   */
  function setVolume(volumeLevel) {
    _core2.default.setVolume(volumeLevel);
  }

  /**
   * Gets the active volume.
   */
  function getVolume() {
    return _config2.default.volume;
  }

  /*
  Returns all of the publically accesible methods.
  */
  return {
    init: init,
    getConfig: getConfig,
    bindNewElements: bindNewElements,
    getActivePlaylist: getActivePlaylist,
    getPlaybackSpeed: getPlaybackSpeed,
    setPlaybackSpeed: setPlaybackSpeed,
    getRepeat: getRepeat,
    getRepeatPlaylist: getRepeatPlaylist,
    getShuffle: getShuffle,
    getShufflePlaylist: getShufflePlaylist,
    setShuffle: setShuffle,
    setShufflePlaylist: setShufflePlaylist,
    setRepeat: setRepeat,
    setRepeatSong: setRepeatSong,
    setRepeatPlaylist: setRepeatPlaylist,
    getDefaultAlbumArt: getDefaultAlbumArt,
    setDefaultAlbumArt: setDefaultAlbumArt,
    getDefaultPlaylistArt: getDefaultPlaylistArt,
    setDefaultPlaylistArt: setDefaultPlaylistArt,
    getSongPlayedPercentage: getSongPlayedPercentage,
    setSongPlayedPercentage: setSongPlayedPercentage,
    getSongPlayedSeconds: getSongPlayedSeconds,
    getSongDuration: getSongDuration,
    setDebug: setDebug,
    getActiveSongMetadata: getActiveSongMetadata,
    getActivePlaylistMetadata: getActivePlaylistMetadata,
    getSongAtIndex: getSongAtIndex,
    getSongAtPlaylistIndex: getSongAtPlaylistIndex,
    addSong: addSong,
    prependSong: prependSong,
    addSongToPlaylist: addSongToPlaylist,
    removeSong: removeSong,
    removeSongFromPlaylist: removeSongFromPlaylist,
    playNow: playNow,
    playSongAtIndex: playSongAtIndex,
    playPlaylistSongAtIndex: playPlaylistSongAtIndex,
    play: play,
    pause: pause,
    stop: stop,
    getAudio: getAudio,
    getAnalyser: getAnalyser,
    next: next,
    prev: prev,
    getSongs: getSongs,
    getSongsInPlaylist: getSongsInPlaylist,
    getSongsState: getSongsState,
    getSongsStatePlaylist: getSongsStatePlaylist,
    getActiveIndex: getActiveIndex,
    getVersion: getVersion,
    getBuffered: getBuffered,
    skipTo: skipTo,
    setSongMetaData: setSongMetaData,
    setPlaylistMetaData: setPlaylistMetaData,
    setDelay: setDelay,
    getDelay: getDelay,
    getPlayerState: getPlayerState,
    addPlaylist: addPlaylist,
    registerVisualization: registerVisualization,
    setPlaylistVisualization: setPlaylistVisualization,
    setSongVisualization: setSongVisualization,
    setSongInPlaylistVisualization: setSongInPlaylistVisualization,
    setGlobalVisualization: setGlobalVisualization,
    getVolume: getVolume,
    setVolume: setVolume
  };
}();

/**
 * Playback Speed Elements
 * @module visual/PlaybackSpeedElements
 */


/**
 * Play Pause Elements
 * @module visual/PlayPauseElements
 */


/**
 * Song Played Progress Elements
 * @module visual/SongPlayedProgressElements
 */


/**
 * Visual Repeat Elements
 * @module visual/RepeatElements
 */


/****************************************************
 * FX Modules
 ****************************************************/
/**
 * Imports the visualizations module
 * @module fx/Visualizations
 */


/**
 * Repeater Module
 *
 * @module utilities/Repeater
 */


/**
 * Imports the config state module.
 * @module ConfigState
 */


/****************************************************
 * Core
 ****************************************************/
/**
 * AmplitudeJS Core Module
 *
 * @module core/Core
 */
/**
 * @name 		AmplitudeJS
 * @author 	Dan Pastori (Server Side Up) <hello@serversideup.net>
 */
/**
 * AmplitudeJS Initializer Module
 *
 * @module init/AmplitudeInitializer
 */
exports.default = Amplitude;
module.exports = exports["default"];

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _debug = __webpack_require__(4);

var _debug2 = _interopRequireDefault(_debug);

var _checks = __webpack_require__(5);

var _checks2 = _interopRequireDefault(_checks);

var _metaDataElements = __webpack_require__(7);

var _metaDataElements2 = _interopRequireDefault(_metaDataElements);

var _soundcloud = __webpack_require__(17);

var _soundcloud2 = _interopRequireDefault(_soundcloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the initialization of the playlists.
 *
 * @module init/PlaylistsInitializer
 */


/**
 * AmplitudeJS Visual Meta Data Elements Module
 * @module visual/MetaDataElements
 */


/**
 * AmplitudeJS Debug Module
 * @module utilities/Debug
 */
var PlaylistsInitializer = function () {
  /**
   * Initializes the playlists for AmplitudeJS
   *
   * @param {Object} playlists - The playlists defined by the user.
   */
  function initialize(playlists) {
    /*
      Copy the playlists over to Amplitude
    */
    _config2.default.playlists = playlists;

    /*
      Copy songs over from songs array.
    */
    copySongsToPlaylists();

    /*
      Grab any SoundCloud Data for the playlist songs if needed.
    */
    grabSoundCloudData();

    /*
      Initialize a scoped active index for each playlist.
    */
    initializePlaylistActiveIndexes();

    /*
      Initialize the shuffle status of the playlists.
    */
    initializePlaylistShuffleStatuses();

    /*
      Initialize the repeat status for the playlits.
    */
    initializePlaylistsRepeatStatuses();

    /*
      Initialize temporary place holders for shuffle lists.
    */
    initializePlaylistShuffleLists();

    /*
      Initializes the first song in the playlist
    */
    initializeFirstSongInPlaylistMetaData();
  }

  /**
   * Initializes a scoped active index for each playlist.
   *
   * @access private
   */
  function initializePlaylistActiveIndexes() {
    /*
    Iterate over all of the playlists defined by the user
      and add an active index.
    */
    for (var key in _config2.default.playlists) {
      _config2.default.playlists[key].active_index = null;
    }
  }

  /**
   * Ensures the indexes in the playlists are valid indexes. The song has
   * to exist in the Amplitude config to be played correctly. If the index
   * is an integer, we ensure it exists and coy it to the array.
   *
   * @access private
   */
  function copySongsToPlaylists() {
    /*
      Iterate over all of the config's playlists
    */
    for (var key in _config2.default.playlists) {
      /*
        Checks if the playlist key is accurate.
      */
      if (_config2.default.playlists.hasOwnProperty(key)) {
        /*
          Checks if the playlist has songs.
        */
        if (_config2.default.playlists[key].songs) {
          /*
            Iterate over all of the songs in the playlist
          */
          for (var i = 0; i < _config2.default.playlists[key].songs.length; i++) {
            if (_checks2.default.isInt(_config2.default.playlists[key].songs[i])) {
              _config2.default.playlists[key].songs[i] = _config2.default.songs[_config2.default.playlists[key].songs[i]];

              _config2.default.playlists[key].songs[i].index = i;
            }
            /*
              Check to see if the index for the song in the playlist
              exists in the songs config.
            */
            if (_checks2.default.isInt(_config2.default.playlists[key].songs[i]) && !_config2.default.songs[_config2.default.playlists[key].songs[i]]) {
              _debug2.default.writeMessage("The song index: " + _config2.default.playlists[key].songs[i] + " in playlist with key: " + key + " is not defined in your songs array!");
            }

            /*
              If not an int, then is a dedicated song, just set the index.
            */
            if (!_checks2.default.isInt(_config2.default.playlists[key].songs[i])) {
              _config2.default.playlists[key].songs[i].index = i;
            }
          }
        }
      }
    }
  }

  /**
   * Grabs the SoundCloud data for any song in the playlist that
   * the user needs to grab data for.
   *
   * @access private
   */
  function grabSoundCloudData() {
    /*
      Iterate over all of the config's playlists
    */
    for (var key in _config2.default.playlists) {
      /*
        Checks if the playlist key is accurate.
      */
      if (_config2.default.playlists.hasOwnProperty(key)) {
        /*
          Iterate over all of the songs in the playlist and see if
          they need to grab the SoundCloud data for the song.
        */
        for (var i = 0; i < _config2.default.playlists[key].songs.length; i++) {
          /*
            Only Grab the data if the URL is a SoundCloud URL.
          */
          if (_soundcloud2.default.isSoundCloudURL(_config2.default.playlists[key].songs[i].url)) {
            /*
              Only grab the data if the SoundCloud data has not already been
              grabbed for the audio. This could happen if the user defined the
              song in the songs array and was grabbed before.
            */
            if (_config2.default.playlists[key].songs[i].soundcloud_data == undefined) {
              _soundcloud2.default.resolveIndividualStreamableURL(_config2.default.playlists[key].songs[i].url, key, i);
            }
          }
        }
      }
    }
  }

  /**
   * Initializes the shuffle statuses for each of the playlists. These will
   * be referenced when we shuffle individual playlists.
   *
   * @access private
   */
  function initializePlaylistShuffleStatuses() {
    /*
    Iterate over all of the playlists the user defined adding
    the playlist key to the shuffled playlist array and creating
    and empty object to house the statuses.
    */
    for (var key in _config2.default.playlists) {
      _config2.default.playlists[key].shuffle = false;
    }
  }

  /**
   * Initializes the repeat statuses for each of the playlists.  These will
   * be referenced when we repeat individual playlits.
   *
   * @access private
   */
  function initializePlaylistsRepeatStatuses() {
    /*
      Iterate over all of the playlists the user defined adding
      the playlist key to the repeated playlist array and creating
      and empty object to house the statuses.
    */
    for (var key in _config2.default.playlists) {
      _config2.default.playlists[key].repeat = false;
    }
  }

  /**
   * Initializes the shuffled playlist placeholders. These will be set for
   * playlists that are shuffled and contain the shuffled songs.
   *
   * @access private
   */
  function initializePlaylistShuffleLists() {
    /*
    Iterate over all of the playlists the user defined adding
    the playlist key to the shuffled playlists array and creating
    and empty object to house the shuffled playlists
    */
    for (var key in _config2.default.playlists) {
      _config2.default.playlists[key].shuffle_list = [];
    }
  }

  /**
   * Intializes the display for the first song in the playlist meta data.
   *
   * @access private
   */
  function initializeFirstSongInPlaylistMetaData() {
    /*
    Iterates over all of the playlists setting the meta data for the
    first song.
    */
    for (var key in _config2.default.playlists) {
      _metaDataElements2.default.setFirstSongInPlaylist(_config2.default.playlists[key].songs[0], key);
    }
  }

  /*
    Returns the public facing methods
  */
  return {
    initialize: initialize
  };
}();

/**
 * AmplitudeJS SoundCloud Meta module
 * @module soundcloud/Soundcloud
 */


/**
 * AmplitudeJS Checks Utility.
 * @module utilities/Checks
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = PlaylistsInitializer;
module.exports = exports["default"];

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the container elements.
 *
 * @param visual/ContainerElements
 */
var ContainerElements = function () {
  /**
   * Applies the class 'amplitude-active-song-container' to the element
   * containing visual information regarding the active song.
   *
   * @prop {boolean} direct - Determines if it was a direct click on the song. We
   * then don't care if shuffle is on or not.
   *
   * @access public
   */
  function setActive(direct) {
    /*
      Gets all of the song container elements.
    */
    var songContainers = document.getElementsByClassName("amplitude-song-container");

    /*
    Removes all of the active song containrs.
    */
    for (var i = 0; i < songContainers.length; i++) {
      songContainers[i].classList.remove("amplitude-active-song-container");
    }

    /*
    Finds the active index and adds the active song container to the element
    that represents the song at the index.
    */
    if (_config2.default.active_playlist == "" || _config2.default.active_playlist == null) {
      var activeIndex = "";

      /*
        If we click directly on the song element, we ignore
        whether it's in shuffle or not.
      */
      if (direct) {
        activeIndex = _config2.default.active_index;
      } else {
        if (_config2.default.shuffle_on) {
          activeIndex = _config2.default.shuffle_list[_config2.default.active_index].index;
        } else {
          activeIndex = _config2.default.active_index;
        }
      }

      if (document.querySelectorAll('.amplitude-song-container[data-amplitude-song-index="' + activeIndex + '"]')) {
        var _songContainers = document.querySelectorAll('.amplitude-song-container[data-amplitude-song-index="' + activeIndex + '"]');

        for (var _i = 0; _i < _songContainers.length; _i++) {
          if (!_songContainers[_i].hasAttribute("data-amplitude-playlist")) {
            _songContainers[_i].classList.add("amplitude-active-song-container");
          }
        }
      }
    } else {
      /*
        If we have an active playlist or the action took place directly on the
        song element, we ignore the shuffle.
      */
      if (_config2.default.active_playlist != null && _config2.default.active_playlist != "" || direct) {
        var activePlaylistIndex = _config2.default.playlists[_config2.default.active_playlist].active_index;
      } else {
        var activePlaylistIndex = "";

        if (_config2.default.playlists[_config2.default.active_playlist].shuffle) {
          activePlaylistIndex = _config2.default.playlists[_config2.default.active_playlist].shuffle_list[_config2.default.playlists[_config2.default.active_playlist].active_index].index;
        } else {
          activePlaylistIndex = _config2.default.playlists[_config2.default.active_playlist].active_index;
        }
      }

      if (document.querySelectorAll('.amplitude-song-container[data-amplitude-song-index="' + activePlaylistIndex + '"][data-amplitude-playlist="' + _config2.default.active_playlist + '"]')) {
        var _songContainers2 = document.querySelectorAll('.amplitude-song-container[data-amplitude-song-index="' + activePlaylistIndex + '"][data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

        for (var _i2 = 0; _i2 < _songContainers2.length; _i2++) {
          _songContainers2[_i2].classList.add("amplitude-active-song-container");
        }
      }
    }
  }

  return {
    setActive: setActive
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = ContainerElements;
module.exports = exports["default"];

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the current time hour elements.
 *
 * @module visual/time/CurrentHourElements
 */
var CurrentHourElements = function () {
  function sync(hours) {
    syncGlobal(hours);
    syncPlaylist(hours);
    syncSong(hours);
    syncSongInPlaylist(hours);
  }

  /**
   * Updates any elements that display the current hour for the song.
   *
   * @access public
   * @param {number} hours 	- An integer conaining how many hours into the song.
   */
  function syncGlobal(hours) {
    /*
    Get all of the hour selectors
    */
    var currentHourSelectors = document.querySelectorAll(".amplitude-current-hours");

    /*
    Set the current hour selector's inner html to hours passed in.
    */
    for (var i = 0; i < currentHourSelectors.length; i++) {
      var playlist = currentHourSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = currentHourSelectors[i].getAttribute("data-amplitude-song-index");

      /*
        Updates the current hour selector for a global display.
      */
      if (playlist == null && songIndex == null) {
        currentHourSelectors[i].innerHTML = hours;
      }
    }
  }

  /**
   * Syncs the playlist current hour elements.
   *
   * @param {Integer} hour - The current audio hour.
   */
  function syncPlaylist(hours) {
    /*
    Get all of the hour selectors
    */
    var currentHourPlaylistSelectors = document.querySelectorAll('.amplitude-current-hours[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
    Set the current hour selector's inner html to hours passed in.
    */
    for (var i = 0; i < currentHourPlaylistSelectors.length; i++) {
      var songIndex = currentHourPlaylistSelectors[i].getAttribute("data-amplitude-song-index");

      /*
        Updates the current hour selector for a global display.
      */
      if (songIndex == null) {
        currentHourPlaylistSelectors[i].innerHTML = hours;
      }
    }
  }

  /**
   * Syncs the song hour elements.
   *
   * @param {Integer} hour - The current audio hour.
   */
  function syncSong(hours) {
    if (_config2.default.active_playlist == null) {
      /*
      Get all of the hour selectors
      */
      var currentHourSongSelectors = document.querySelectorAll('.amplitude-current-hours[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      /*
      Set the current hour selector's inner html to hours passed in.
      */
      for (var i = 0; i < currentHourSongSelectors.length; i++) {
        var playlist = currentHourSongSelectors[i].getAttribute("data-amplitude-playlist");

        /*
          Updates the current hour selector for a global display.
        */
        if (playlist == null) {
          currentHourSongSelectors[i].innerHTML = hours;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist song hour elements.
   *
   * @param {Integer} hour - The current audio hour.
   */
  function syncSongInPlaylist(hours) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;
    /*
    Get all of the hour selectors
    */
    var currentHourPlaylistSongSelectors = document.querySelectorAll('.amplitude-current-hours[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    /*
    Set the current hour selector's inner html to hours passed in.
    */
    for (var i = 0; i < currentHourPlaylistSongSelectors.length; i++) {
      currentHourPlaylistSongSelectors[i].innerHTML = hours;
    }
  }

  /**
   * Reset the current hour elements.
   */
  function resetTimes() {
    /*
      Gets the hour display elements
    */
    var hourSelectors = document.querySelectorAll(".amplitude-current-hours");

    /*
      Iterates over all of the hour selectors and sets the inner HTML
      to 00.
    */
    for (var i = 0; i < hourSelectors.length; i++) {
      hourSelectors[i].innerHTML = "00";
    }
  }

  /**
   * Returns the publically facing methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = CurrentHourElements;
module.exports = exports["default"];

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the current time minutes elements.
 *
 * @module visual/time/CurrentMinuteElements
 */
var CurrentMinuteElements = function () {
  /**
   * Syncs the current minutes elements.
   *
   * @param {Integer} minutes - The current audio minutes.
   */
  function sync(minutes) {
    syncGlobal(minutes);
    syncPlaylist(minutes);
    syncSong(minutes);
    syncSongInPlaylist(minutes);
  }

  /**
   * Syncs the global current minutes elements.
   *
   * @param {Integer} minutes - The current audio minutes.
   */
  function syncGlobal(minutes) {
    /*
    Get all of the minute selectors
    */
    var currentMinuteSelectors = document.querySelectorAll(".amplitude-current-minutes");

    /*
    Set the current minute selector's inner html to minutes passed in.
    */
    for (var i = 0; i < currentMinuteSelectors.length; i++) {
      var playlist = currentMinuteSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = currentMinuteSelectors[i].getAttribute("data-amplitude-song-index");

      /*
        Updates the current minute selector for a global display.
      */
      if (playlist == null && songIndex == null) {
        currentMinuteSelectors[i].innerHTML = minutes;
      }
    }
  }

  /**
   * Syncs the playlist minutes elements.
   *
   * @param {Integer} minutes - The current audio minutes.
   */
  function syncPlaylist(minutes) {
    /*
    Get all of the minute selectors
    */
    var currentMinutePlaylistSelectors = document.querySelectorAll('.amplitude-current-minutes[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
    Set the current minute selector's inner html to minutes passed in.
    */
    for (var i = 0; i < currentMinutePlaylistSelectors.length; i++) {
      var songIndex = currentMinutePlaylistSelectors[i].getAttribute("data-amplitude-song-index");

      /*
        Updates the current minute selector for a global display.
      */
      if (songIndex == null) {
        currentMinutePlaylistSelectors[i].innerHTML = minutes;
      }
    }
  }

  /**
   * Syncs the current song minutes elements.
   *
   * @param {Integer} minutes - The current audio minutes.
   */
  function syncSong(minutes) {
    if (_config2.default.active_playlist == null) {
      /*
      Get all of the minute selectors
      */
      var currentMinuteSongSelectors = document.querySelectorAll('.amplitude-current-minutes[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      /*
      Set the current minute selector's inner html to minutes passed in.
      */
      for (var i = 0; i < currentMinuteSongSelectors.length; i++) {
        var playlist = currentMinuteSongSelectors[i].getAttribute("data-amplitude-playlist");

        /*
          Updates the current minute selector for a global display.
        */
        if (playlist == null) {
          currentMinuteSongSelectors[i].innerHTML = minutes;
        }
      }
    }
  }

  /**
   * Syncs the current song in playlist minutes elements.
   *
   * @param {Integer} minutes - The current audio minutes.
   */
  function syncSongInPlaylist(minutes) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    /*
    Get all of the minute selectors
    */
    var currentMinutePlaylistSongSelectors = document.querySelectorAll('.amplitude-current-minutes[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    /*
    Set the current minute selector's inner html to minutes passed in.
    */
    for (var i = 0; i < currentMinutePlaylistSongSelectors.length; i++) {
      currentMinutePlaylistSongSelectors[i].innerHTML = minutes;
    }
  }

  /**
   * Reset the current times.
   */
  function resetTimes() {
    /*
      Gets the minute display elements
    */
    var minuteSelectors = document.querySelectorAll(".amplitude-current-minutes");

    /*
      Iterates over all of the minute selectors and sets the inner HTML
      to 00.
    */
    for (var i = 0; i < minuteSelectors.length; i++) {
      minuteSelectors[i].innerHTML = "00";
    }
  }

  /**
   * Returns the publically facing methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = CurrentMinuteElements;
module.exports = exports["default"];

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the current time seconds elements.
 *
 * @module visual/time/CurrentSecondElements
 */
var CurrentSecondElements = function () {
  /**
   * Syncs the current seconds elements.
   *
   * @param {Integer} seconds - The current audio seconds.
   */
  function sync(seconds) {
    syncGlobal(seconds);
    syncPlaylist(seconds);
    syncSong(seconds);
    syncSongInPlaylist(seconds);
  }

  /**
   * Syncs the global current seconds elements.
   *
   * @param {Integer} seconds - The current audio seconds.
   */
  function syncGlobal(seconds) {
    /*
    Get all of the second selectors
    */
    var currentSecondSelectors = document.querySelectorAll(".amplitude-current-seconds");

    /*
    Set the current second selector's inner html to seconds passed in.
    */
    for (var i = 0; i < currentSecondSelectors.length; i++) {
      var playlist = currentSecondSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = currentSecondSelectors[i].getAttribute("data-amplitude-song-index");

      /*
        Updates the current second selector for a global display.
      */
      if (playlist == null && songIndex == null) {
        currentSecondSelectors[i].innerHTML = seconds;
      }
    }
  }

  /**
   * Syncs the playlist seconds elements.
   *
   * @param {Integer} seconds - The current audio seconds.
   */
  function syncPlaylist(seconds) {
    /*
    Get all of the second selectors
    */
    var currentSecondPlaylistSelectors = document.querySelectorAll('.amplitude-current-seconds[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
    Set the current second selector's inner html to seconds passed in.
    */
    for (var i = 0; i < currentSecondPlaylistSelectors.length; i++) {
      var songIndex = currentSecondPlaylistSelectors[i].getAttribute("data-amplitude-song-index");

      /*
        Updates the current second selector for a global display.
      */
      if (songIndex == null) {
        currentSecondPlaylistSelectors[i].innerHTML = seconds;
      }
    }
  }

  /**
   * Syncs the current song seconds elements.
   *
   * @param {Integer} seconds - The current audio seconds.
   */
  function syncSong(seconds) {
    if (_config2.default.active_playlist == null) {
      /*
      Get all of the second selectors
      */
      var currentSecondSongSelectors = document.querySelectorAll('.amplitude-current-seconds[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      /*
      Set the current second selector's inner html to seconds passed in.
      */
      for (var i = 0; i < currentSecondSongSelectors.length; i++) {
        var playlist = currentSecondSongSelectors[i].getAttribute("data-amplitude-playlist");

        /*
          Updates the current second selector for a global display.
        */
        if (playlist == null) {
          currentSecondSongSelectors[i].innerHTML = seconds;
        }
      }
    }
  }

  /**
   * Syncs the current song in playlist seconds elements.
   *
   * @param {Integer} seconds - The current audio seconds.
   */
  function syncSongInPlaylist(seconds) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;
    /*
    Get all of the second selectors
    */
    var currentSecondPlaylistSongSelectors = document.querySelectorAll('.amplitude-current-seconds[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    /*
    Set the current second selector's inner html to seconds passed in.
    */
    for (var i = 0; i < currentSecondPlaylistSongSelectors.length; i++) {
      currentSecondPlaylistSongSelectors[i].innerHTML = seconds;
    }
  }

  /**
   * Reset the current seconds elements.
   */
  function resetTimes() {
    /*
      Gets the second display elements
    */
    var secondSelectors = document.querySelectorAll(".amplitude-current-seconds");

    /*
      Iterates over all of the second selectors and sets the inner HTML
      to 00.
    */
    for (var i = 0; i < secondSelectors.length; i++) {
      secondSelectors[i].innerHTML = "00";
    }
  }

  /**
   * Returns the publically facing methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = CurrentSecondElements;
module.exports = exports["default"];

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These methods help sync visual time elements.
 *
 * @module visual/CurrentTimeElements
 */
var CurrentTimeElements = function () {
  /**
   * Visually displays the current time on the screen. This is called on
   * time update for the current song.
   *
   * @access public
   * @param {object} currentTime 					- An object containing the current time for the song in seconds, minutes, and hours.
   */
  function sync(currentTime) {
    /*
    Set current time display.
    */
    syncGlobal(currentTime);
    syncPlaylist(currentTime);
    syncSong(currentTime);
    syncSongInPlaylist(currentTime);
  }

  /**
   * Updates any elements that display the current time for the song. This
   * is a computed field that will be commonly used.
   *
   * @access public
   * @param {object} time 	- A json object conaining the parts for the current time for the song.
   */
  function syncGlobal(time) {
    /*
    Get all of the time selectors.
    */
    var currentTimeSelectors = document.querySelectorAll(".amplitude-current-time");

    /*
    Set the time selector's inner html to the current time for the song. The current
    time is computed by joining minutes and seconds.
    */
    var timeText = time.minutes + ":" + time.seconds;

    if (time.hours > 0) {
      timeText = time.hours + ":" + timeText;
    }

    for (var i = 0; i < currentTimeSelectors.length; i++) {
      var playlist = currentTimeSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = currentTimeSelectors[i].getAttribute("data-amplitude-song-index");

      if (playlist == null && songIndex == null) {
        currentTimeSelectors[i].innerHTML = timeText;
      }
    }
  }

  /**
   * Updates any elements that display the current time for the song. This
   * is a computed field that will be commonly used.
   *
   * @access public
   * @param {object} time 	- A json object conaining the parts for the current time for the song.
   */
  function syncPlaylist(time) {
    /*
    Get all of the time selectors.
    */
    var currentTimeSelectors = document.querySelectorAll('.amplitude-current-time[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    /*
    Set the time selector's inner html to the current time for the song. The current
    time is computed by joining minutes and seconds.
    */
    var timeText = time.minutes + ":" + time.seconds;

    if (time.hours > 0) {
      timeText = time.hours + ":" + timeText;
    }

    for (var i = 0; i < currentTimeSelectors.length; i++) {
      var songIndex = currentTimeSelectors[i].getAttribute("data-amplitude-song-index");

      if (songIndex == null) {
        currentTimeSelectors[i].innerHTML = timeText;
      }
    }
  }

  /**
   * Updates any elements that display the current time for the song. This
   * is a computed field that will be commonly used.
   *
   * @access public
   * @param {object} time 	- A json object conaining the parts for the current time for the song.
   */
  function syncSong(time) {
    if (_config2.default.active_playlist == null) {
      /*
      Get all of the time selectors.
      */
      var currentTimeSelectors = document.querySelectorAll('.amplitude-current-time[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      /*
      Set the time selector's inner html to the current time for the song. The current
      time is computed by joining minutes and seconds.
      */
      var timeText = time.minutes + ":" + time.seconds;

      if (time.hours > 0) {
        timeText = time.hours + ":" + timeText;
      }

      for (var i = 0; i < currentTimeSelectors.length; i++) {
        var playlist = currentTimeSelectors[i].getAttribute("data-amplitude-playlist");

        if (playlist == null) {
          currentTimeSelectors[i].innerHTML = timeText;
        }
      }
    }
  }

  /**
   * Updates any elements that display the current time for the song. This
   * is a computed field that will be commonly used.
   *
   * @access public
   * @param {object} time 	- A json object conaining the parts for the current time for the song.
   */
  function syncSongInPlaylist(time) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;
    /*
    Get all of the time selectors.
    */
    var currentTimeSelectors = document.querySelectorAll('.amplitude-current-time[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    /*
    Set the time selector's inner html to the current time for the song. The current
    time is computed by joining minutes and seconds.
    */
    var timeText = time.minutes + ":" + time.seconds;

    if (time.hours > 0) {
      timeText = time.hours + ":" + timeText;
    }

    for (var i = 0; i < currentTimeSelectors.length; i++) {
      currentTimeSelectors[i].innerHTML = timeText;
    }
  }

  /**
   * Resets the current time displays to 00:00
   *
   * @access public
   */
  function resetTimes() {
    /*
    Gets the time selector display elements
    */
    var timeSelectors = document.querySelectorAll(".amplitude-current-time");

    /*
    Iterates over all of the time selectors and sets the inner HTML
    to 00.
    */
    for (var i = 0; i < timeSelectors.length; i++) {
      timeSelectors[i].innerHTML = "00:00";
    }
  }

  /**
   * Returns the publically facing methods
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = CurrentTimeElements;
module.exports = exports["default"];

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the duration countdown elements.
 *
 * @module visual/time/DurationCountDownTimeElements.
 */
var DurationCountDownTimeElements = function () {
  /**
   * Syncs all of the countdown time elements.
   *
   * @param {object} countDownTime - The current time of the audio.
   * @param {object} songDuration - The song duration of the audio.
   */
  function sync(countDownTime, songDuration) {
    var timeRemaining = computeTimeRemaining(countDownTime, songDuration);

    syncGlobal(timeRemaining);
    syncPlaylist(timeRemaining);
    syncSong(timeRemaining);
    syncSongInPlaylist(timeRemaining);
  }

  /**
   * Syncs the global count down time elements.
   *
   * @param {string} timeRemaining - The time remaining for the audio.
   */
  function syncGlobal(timeRemaining) {
    var durationTimeRemainingSelectors = document.querySelectorAll(".amplitude-time-remaining");

    for (var i = 0; i < durationTimeRemainingSelectors.length; i++) {
      var playlist = durationTimeRemainingSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = durationTimeRemainingSelectors[i].getAttribute("data-amplitude-song-index");

      if (playlist == null && songIndex == null) {
        durationTimeRemainingSelectors[i].innerHTML = timeRemaining;
      }
    }
  }

  /**
   * Syncs the playlist count down time elements.
   *
   * @param {string} timeRemaining - The time remaining for the audio.
   */
  function syncPlaylist(timeRemaining) {
    var durationTimeRemainingSelectors = document.querySelectorAll('.amplitude-time-remaining[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    for (var i = 0; i < durationTimeRemainingSelectors.length; i++) {
      var songIndex = durationTimeRemainingSelectors[i].getAttribute("data-amplitude-song-index");

      if (songIndex == null) {
        durationTimeRemainingSelectors[i].innerHTML = timeRemaining;
      }
    }
  }

  /**
   * Syncs the song count down time elements.
   *
   * @param {string} timeRemaining - The time remaining for the audio.
   */
  function syncSong(timeRemaining) {
    if (_config2.default.active_playlist == null) {
      var durationTimeRemainingSelectors = document.querySelectorAll('.amplitude-time-remaining[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      for (var i = 0; i < durationTimeRemainingSelectors.length; i++) {
        var playlist = durationTimeRemainingSelectors[i].getAttribute("data-amplitude-playlist");

        if (playlist == null) {
          durationTimeRemainingSelectors[i].innerHTML = timeRemaining;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist count down time elements.
   *
   * @param {string} timeRemaining - The time remaining for the audio.
   */
  function syncSongInPlaylist(timeRemaining) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    var durationTimeRemainingSelectors = document.querySelectorAll('.amplitude-time-remaining[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    for (var i = 0; i < durationTimeRemainingSelectors.length; i++) {
      durationTimeRemainingSelectors[i].innerHTML = timeRemaining;
    }
  }

  /**
   * Resets the count down times.
   */
  function resetTimes() {
    var durationTimeRemainingSelectors = document.querySelectorAll(".amplitude-time-remaining");

    for (var i = 0; i < durationTimeRemainingSelectors.length; i++) {
      durationTimeRemainingSelectors[i].innerHTML = "00";
    }
  }

  /**
   * Computes the time remaining for the audio.
   *
   * @param {object} currentTime - The current time of the audio.
   * @param {object} songDuration - The duration of the audio.
   */
  function computeTimeRemaining(currentTime, songDuration) {
    var timeRemaining = "00:00";

    /*
      Initialize the total current seconds and total duration seconds
    */
    var totalCurrentSeconds = parseInt(currentTime.seconds) + parseInt(currentTime.minutes) * 60 + parseInt(currentTime.hours) * 60 * 60;
    var totalDurationSeconds = parseInt(songDuration.seconds) + parseInt(songDuration.minutes) * 60 + parseInt(songDuration.hours) * 60 * 60;

    /*
      If the two variables are numbers we continue the computing.
    */
    if (!isNaN(totalCurrentSeconds) && !isNaN(totalDurationSeconds)) {
      /*
        Find the total remaining seconds.
      */
      var timeRemainingTotalSeconds = totalDurationSeconds - totalCurrentSeconds;

      var remainingHours = Math.floor(timeRemainingTotalSeconds / 3600);
      var remainingMinutes = Math.floor((timeRemainingTotalSeconds - remainingHours * 3600) / 60);
      var remainingSeconds = timeRemainingTotalSeconds - remainingHours * 3600 - remainingMinutes * 60;

      timeRemaining = (remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes) + ":" + (remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds);

      if (remainingHours > 0) {
        timeRemaining = remainingHours + ":" + timeRemaining;
      }
    }

    return timeRemaining;
  }

  /**
   * Returns the publically facing methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = DurationCountDownTimeElements;
module.exports = exports["default"];

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the duration hours elements.
 *
 * @module visual/time/DurationHourElements.
 */
var DurationHourElements = function () {
  /**
   * Sync the duration hours elements.
   *
   * @param {Integer} hours - The duration hours for the audio.
   */
  function sync(hours) {
    syncGlobal(hours);
    syncPlaylist(hours);
    syncSong(hours);
    syncSongInPlaylist(hours);
  }

  /**
   * Syncs the global duration hours elements.
   *
   * @param {Integer} hours - the duration hours for the audio.
   */
  function syncGlobal(hours) {
    var durationHourSelectors = document.querySelectorAll(".amplitude-duration-hours");

    for (var i = 0; i < durationHourSelectors.length; i++) {
      var playlist = durationHourSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = durationHourSelectors[i].getAttribute("data-amplitude-song-index");

      if (playlist == null && songIndex == null) {
        durationHourSelectors[i].innerHTML = hours;
      }
    }
  }

  /**
   * Syncs the playlist duration hours for the audio.
   *
   * @param {Integer} hours - The duration hours for the audio.
   */
  function syncPlaylist(hours) {
    var durationHourSelectors = document.querySelectorAll('.amplitude-duration-hours[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    for (var i = 0; i < durationHourSelectors.length; i++) {
      var songIndex = durationHourSelectors[i].getAttribute("data-amplitude-song-index");

      if (songIndex == null) {
        durationHourSelectors[i].innerHTML = hours;
      }
    }
  }

  /**
   * Syncs the song duration hours.
   *
   * @param {Integer} hours - The duration hours for the audio.
   */
  function syncSong(hours) {
    if (_config2.default.active_playlist == null) {
      var durationHourSelectors = document.querySelectorAll('.amplitude-duration-hours[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      for (var i = 0; i < durationHourSelectors.length; i++) {
        var playlist = durationHourSelectors[i].getAttribute("data-amplitude-playlist");

        if (playlist == null) {
          durationHourSelectors[i].innerHTML = hours;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist duration hours.
   *
   * @param {Integer} hours - The duration hours of the audio.
   */
  function syncSongInPlaylist(hours) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    var durationHourSelectors = document.querySelectorAll('.amplitude-duration-hours[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    for (var i = 0; i < durationHourSelectors.length; i++) {
      durationHourSelectors[i].innerHTML = hours;
    }
  }

  /**
   * Resets the duration shours elements to '00'
   */
  function resetTimes() {
    var durationHourSelectors = document.querySelectorAll(".amplitude-duration-hours");

    for (var i = 0; i < durationHourSelectors.length; i++) {
      durationHourSelectors[i].innerHTML = "00";
    }
  }

  /**
   * Returns the publically facing methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = DurationHourElements;
module.exports = exports["default"];

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the duration minutes elements.
 *
 * @module visual/time/DurationMinuteElements.
 */
var DurationMinuteElements = function () {
  /**
   * Sync the duration minutes elements.
   *
   * @param {Integer} minutes - The duration minutes for the audio.
   */
  function sync(minutes) {
    syncGlobal(minutes);
    syncPlaylist(minutes);
    syncSong(minutes);
    syncSongInPlaylist(minutes);
  }

  /**
   * Syncs the global duration minutes elements.
   *
   * @param {Integer} minutes - the duration minutes for the audio.
   */
  function syncGlobal(minutes) {
    var durationMinuteSelectors = document.querySelectorAll(".amplitude-duration-minutes");

    for (var i = 0; i < durationMinuteSelectors.length; i++) {
      var playlist = durationMinuteSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = durationMinuteSelectors[i].getAttribute("data-amplitude-song-index");

      if (playlist == null && songIndex == null) {
        durationMinuteSelectors[i].innerHTML = minutes;
      }
    }
  }

  /**
   * Syncs the playlist duration minutes for the audio.
   *
   * @param {Integer} minutes - The duration minutes for the audio.
   */
  function syncPlaylist(minutes) {
    var durationMinuteSelectors = document.querySelectorAll('.amplitude-duration-minutes[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    for (var i = 0; i < durationMinuteSelectors.length; i++) {
      var songIndex = durationMinuteSelectors[i].getAttribute("data-amplitude-song-index");

      if (songIndex == null) {
        durationMinuteSelectors[i].innerHTML = minutes;
      }
    }
  }

  /**
   * Syncs the song duration minutes.
   *
   * @param {Integer} minutes - The duration minutes for the audio.
   */
  function syncSong(minutes) {
    if (_config2.default.active_playlist == null) {
      var durationMinuteSelectors = document.querySelectorAll('.amplitude-duration-minutes[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      for (var i = 0; i < durationMinuteSelectors.length; i++) {
        var playlist = durationMinuteSelectors[i].getAttribute("data-amplitude-playlist");

        if (playlist == null) {
          durationMinuteSelectors[i].innerHTML = minutes;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist duration minutes.
   *
   * @param {Integer} minutes - The duration minutes of the audio.
   */
  function syncSongInPlaylist(minutes) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    var durationMinuteSelectors = document.querySelectorAll('.amplitude-duration-minutes[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    for (var i = 0; i < durationMinuteSelectors.length; i++) {
      durationMinuteSelectors[i].innerHTML = minutes;
    }
  }

  /**
   * Resets the duration minutes elements to '00'
   */
  function resetTimes() {
    var durationMinuteSelectors = document.querySelectorAll(".amplitude-duration-minutes");

    for (var i = 0; i < durationMinuteSelectors.length; i++) {
      durationMinuteSelectors[i].innerHTML = "00";
    }
  }

  /**
   * Returns the publically facing methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = DurationMinuteElements;
module.exports = exports["default"];

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the duration seconds elements.
 *
 * @module visual/time/DurationSecondElements.
 */
var DurationSecondElements = function () {
  /**
   * Sync the duration seconds elements.
   *
   * @param {Integer} seconds - The duration seconds for the audio.
   */
  function sync(seconds) {
    syncGlobal(seconds);
    syncPlaylist(seconds);
    syncSong(seconds);
    syncSongInPlaylist(seconds);
  }

  /**
   * Syncs the global duration seconds elements.
   *
   * @param {Integer} seconds - the duration seconds for the audio.
   */
  function syncGlobal(seconds) {
    var durationSecondSelectors = document.querySelectorAll(".amplitude-duration-seconds");

    for (var i = 0; i < durationSecondSelectors.length; i++) {
      var playlist = durationSecondSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = durationSecondSelectors[i].getAttribute("data-amplitude-song-index");

      if (playlist == null && songIndex == null) {
        durationSecondSelectors[i].innerHTML = seconds;
      }
    }
  }

  /**
   * Syncs the playlist duration seconds for the audio.
   *
   * @param {Integer} seconds - The duration seconds for the audio.
   */
  function syncPlaylist(seconds) {
    var durationSecondSelectors = document.querySelectorAll('.amplitude-duration-seconds[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    for (var i = 0; i < durationSecondSelectors.length; i++) {
      var songIndex = durationSecondSelectors[i].getAttribute("data-amplitude-song-index");

      if (songIndex == null) {
        durationSecondSelectors[i].innerHTML = seconds;
      }
    }
  }

  /**
   * Syncs the song duration seconds.
   *
   * @param {Integer} seconds - The duration seconds for the audio.
   */
  function syncSong(seconds) {
    if (_config2.default.active_playlist == null) {
      var durationSecondSelectors = document.querySelectorAll('.amplitude-duration-seconds[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      for (var i = 0; i < durationSecondSelectors.length; i++) {
        var playlist = durationSecondSelectors[i].getAttribute("data--amplitude-playlist");

        if (playlist == null) {
          durationSecondSelectors[i].innerHTML = seconds;
        }
      }
    }
  }

  /**
   * Syncs the song in playlist duration seconds.
   *
   * @param {Integer} seconds - The duration seconds of the audio.
   */
  function syncSongInPlaylist(seconds) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    var durationSecondSelectors = document.querySelectorAll('.amplitude-duration-seconds[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    for (var i = 0; i < durationSecondSelectors.length; i++) {
      durationSecondSelectors[i].innerHTML = seconds;
    }
  }

  /**
   * Resets the duration seconds elements to '00'
   */
  function resetTimes() {
    var durationSecondSelectors = document.querySelectorAll(".amplitude-duration-seconds");

    for (var i = 0; i < durationSecondSelectors.length; i++) {
      durationSecondSelectors[i].innerHTML = "00";
    }
  }

  /**
   * Returns the publically facing methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = DurationSecondElements;
module.exports = exports["default"];

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles all of the duration time elements.
 *
 * @module visual/time/DurationTimeElements.
 */
var DurationTimeElements = function () {
  /**
   * Syncs the duration time for all elements.
   *
   * @param {Object} durationTime - The object containing all of the song duration times.
   */
  function sync(durationTime) {
    var durationText = computeDurationText(durationTime);

    syncGlobal(durationText);
    syncPlaylist(durationText);
    syncSong(durationText);
    syncSongInPlaylist(durationText);
  }

  /**
   * Sync the global song duration elements.
   *
   * @param {Object} durationText - The text for the song duration.
   */
  function syncGlobal(durationText) {
    var durationTimeSelectors = document.querySelectorAll(".amplitude-duration-time");

    for (var i = 0; i < durationTimeSelectors.length; i++) {
      var playlist = durationTimeSelectors[i].getAttribute("data-amplitude-playlist");
      var songIndex = durationTimeSelectors[i].getAttribute("data-amplitude-song-index");

      if (playlist == null && songIndex == null) {
        durationTimeSelectors[i].innerHTML = durationText;
      }
    }
  }

  /**
   * Sync the playlist duration times.
   *
   * @param {Object} durationText - The text for the song duration.
   */
  function syncPlaylist(durationText) {
    var durationTimeSelectors = document.querySelectorAll('.amplitude-duration-time[data-amplitude-playlist="' + _config2.default.active_playlist + '"]');

    for (var i = 0; i < durationTimeSelectors.length; i++) {
      var songIndex = durationTimeSelectors[i].getAttribute("data-amplitude-song-index");

      if (songIndex == null) {
        durationTimeSelectors[i].innerHTML = durationText;
      }
    }
  }

  /**
   * Sync the song duration times.
   *
   * @param {Object} durationText - The text for the song duration.
   */
  function syncSong(durationText) {
    if (_config2.default.active_playlist == null) {
      var durationTimeSelectors = document.querySelectorAll('.amplitude-duration-time[data-amplitude-song-index="' + _config2.default.active_index + '"]');

      for (var i = 0; i < durationTimeSelectors.length; i++) {
        var playlist = durationTimeSelectors[i].getAttribute("data-amplitude-playlist");

        if (playlist == null) {
          durationTimeSelectors[i].innerHTML = durationText;
        }
      }
    }
  }

  /**
   * Sync the song in playlist duration times.
   *
   * @param {Object} durationText - An object containing the duration text.
   */
  function syncSongInPlaylist(durationText) {
    var activePlaylistIndex = _config2.default.active_playlist != "" && _config2.default.active_playlist != null ? _config2.default.playlists[_config2.default.active_playlist].active_index : null;

    var durationTimeSelectors = document.querySelectorAll('.amplitude-duration-time[data-amplitude-playlist="' + _config2.default.active_playlist + '"][data-amplitude-song-index="' + activePlaylistIndex + '"]');

    for (var i = 0; i < durationTimeSelectors.length; i++) {
      durationTimeSelectors[i].innerHTML = durationText;
    }
  }

  /**
   * Resets all of the duration times to empty.
   */
  function resetTimes() {
    var durationTimeSelectors = document.querySelectorAll(".amplitude-duration-time");

    for (var i = 0; i < durationTimeSelectors.length; i++) {
      durationTimeSelectors[i].innerHTML = "00:00";
    }
  }

  /**
   * Computes the duration text
   *
   * @param {Object} durationTime - An object containint the duration times.
   */
  function computeDurationText(durationTime) {
    var durationText = "00:00";

    if (!isNaN(durationTime.minutes) && !isNaN(durationTime.seconds)) {
      durationText = durationTime.minutes + ":" + durationTime.seconds;
      if (!isNaN(durationTime.hours) && durationTime.hours > 0) {
        durationText = durationTime.hours + ":" + durationText;
      }
    }

    return durationText;
  }

  /**
   * Return publically accessible methods.
   */
  return {
    sync: sync,
    resetTimes: resetTimes
  };
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = DurationTimeElements;
module.exports = exports["default"];

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = {"name":"amplitudejs","version":"5.3.2","description":"A JavaScript library that allows you to control the design of your media controls in your webpage -- not the browser. No dependencies (jQuery not required) https://521dimensions.com/open-source/amplitudejs","main":"dist/amplitude.js","devDependencies":{"babel-core":"^6.26.3","babel-loader":"^7.1.5","babel-plugin-add-module-exports":"0.2.1","babel-polyfill":"^6.26.0","babel-preset-es2015":"^6.18.0","husky":"^1.3.1","jest":"^23.6.0","prettier":"1.15.1","pretty-quick":"^1.11.1","watch":"^1.0.2","webpack":"^2.7.0"},"directories":{"doc":"docs"},"files":["dist"],"funding":{"type":"opencollective","url":"https://opencollective.com/amplitudejs"},"scripts":{"build":"node_modules/.bin/webpack","prettier":"npx pretty-quick","preversion":"npx pretty-quick && npm run test","postversion":"git push && git push --tags","test":"jest","version":"npm run build && git add -A dist"},"repository":{"type":"git","url":"git+https://github.com/521dimensions/amplitudejs.git"},"keywords":["webaudio","html5","javascript","audio-player"],"author":"521 Dimensions (https://521dimensions.com)","license":"MIT","bugs":{"url":"https://github.com/521dimensions/amplitudejs/issues"},"homepage":"https://github.com/521dimensions/amplitudejs#readme"}

/***/ })
/******/ ]);
});
//# sourceMappingURL=amplitude.js.map