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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
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
 * @property {object} 	config.active_song 		 					-	Handles all of the audio.
 * @property {object} 	config.active_metadata					- Contains the active metadata for the song.
 * @property {string} 	config.active_album							- Holds the active album name. Used to check and see if the album changed and run the album changed callback.
 * @property {number} 	config.active_index							- Contains the index of the actively playing song.
 * @property {string} 	config.active_playlist					- Contains the key to the active playlist index.
 * @property {boolean}	config.autoplay									- Set to true to autoplay the song
 * @property {number} 	config.playback_speed						- Sets the initial playback speed of the song. The values for this can be 1.0, 1.5, 2.0
 * @property {object} 	config.callbacks								- The user can pass a JSON object with a key => value store of callbacks to be run at certain events.
 * @property {array} 		config.songs										- Contains all of the songs the user has passed to Amplitude to use.
 * @property {object} 	config.playlists								- Contains all of the playlists the user created.
 * @property {object} 	config.start_song 							- The index of the song that AmplitudeJS should start with.
 * @property {object} 	config.shuffled_playlists				- Will contain shuffled playlists.
 * @property {string} 	config.starting_playlist 				- The starting playlist the player will intiialize to.
 * @property {string} 	config.starting_playlist_song 	- The index of the song in the playlist that should be started.
 * @property {object} 	config.shuffled_statuses 				- Contains whether the current playlist is in shuffle mode or not.
 * @property {object} 	config.repeat_statuses 					- Contains whether the playlist is in repeat mode or not.
 * @property {object} 	config.shuffled_active_indexes	- Contains the active index in a shuffled playlist.
 * @property {boolean} 	config.repeat 									- When repeat is on, when the song ends the song will replay itself.
 * @property {object} 	config.shuffle_list							- When shuffled, gets populated with the songs the user provided in a random order.
 * @property {boolean} 	config.shuffle_on								- When on, gets set to true so when traversing through songs, AmplitudeJS knows whether or not to use the songs object or the shuffle_list
 * @property {number} 	config.shuffle_active_index 		- When shuffled, this index is used to let AmplitudeJS know where it's at when traversing.
 * @property {string}		config.default_album_art 				- The user can set default album art to be displayed if the song they set doesn't contain album art.
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
 */
module.exports = {
  version: '3.3.1',

  active_song: new Audio(),

  active_metadata: {},

  active_album: '',

  active_index: 0,

  active_playlist: '',

  autoplay: false,

  playback_speed: 1.0,

  callbacks: {},

  songs: [],

  playlists: {},

  start_song: '',

  shuffled_playlists: {},

  starting_playlist: '',

  starting_playlist_song: '',

  shuffled_statuses: {},

  shuffled_active_indexes: {},

  repeat_statuses: {},

  repeat: false,

  repeat_song: false,

  shuffle_list: {},

  shuffle_on: false,

  shuffle_active_index: 0,

  default_album_art: '',

  debug: false,

  volume: .5,

  pre_mute_volume: .5,

  volume_increment: 5,

  volume_decrement: 5,

  soundcloud_client: '',

  soundcloud_use_art: false,

  soundcloud_song_count: 0,

  soundcloud_songs_ready: 0,

  is_touch_moving: false,

  buffered: 0,

  bindings: {},

  continue_next: true,

  delay: 0
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(3);

var _core2 = _interopRequireDefault(_core);

var _visual = __webpack_require__(2);

var _visual2 = _interopRequireDefault(_visual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * For the sake of code clarity, these functions perform helper tasks
 * assisting the logical functions with what they need such as setting
 * the proper song index after an event has occured.
 *
 * @module core/AmplitudeHelpers
 */


/**
 * AmplitudeJS Core Module
 * @module core/AmplitudeCore
 */
var AmplitudeHelpers = function () {
	/**
  * Resets the config to the default state. This is called on initialize
  * to ensure the user's config is what matters.
  *
  * Public Accessor: AmplitudeHelpers.resetConfig()
  *
  * @access public
  */
	function resetConfig() {
		_config2.default.active_song = new Audio();
		_config2.default.active_metadata = {};
		_config2.default.active_album = '';
		_config2.default.active_index = 0;
		_config2.default.active_playlist = '';
		_config2.default.active_playlist = '';
		_config2.default.autoplay = false;
		_config2.default.playback_speed = 1.0;
		_config2.default.callbacks = {};
		_config2.default.songs = [];
		_config2.default.playlists = {};
		_config2.default.start_song = '';
		_config2.default.shuffled_playlists = {};
		_config2.default.starting_playlist = '';
		_config2.default.starting_playlist_song = '';
		_config2.default.shuffled_statuses = {};
		_config2.default.repeat = false;
		_config2.default.shuffle_list = {};
		_config2.default.shuffle_on = false;
		_config2.default.shuffle_active_index = 0;
		_config2.default.default_album_art = '';
		_config2.default.debug = false;
		_config2.default.handle_song_elements = true;
		_config2.default.volume = .5;
		_config2.default.pre_mute_volume = .5;
		_config2.default.volume_increment = 5;
		_config2.default.volume_decrement = 5;
		_config2.default.soundcloud_client = '';
		_config2.default.soundcloud_use_art = false;
		_config2.default.soundcloud_song_count = 0;
		_config2.default.soundcloud_songs_ready = 0;
		_config2.default.continue_next = true;
	}

	/**
  * Writes out debug message to the console if enabled.
  *
  * Public Accessor: AmplitudeHelpers.writeDebugMessage( message )
  *
  * @access public
  * @param {string} message - The string that gets printed to alert the user of a debugging error.
  */
	function writeDebugMessage(message) {
		if (_config2.default.debug) {
			console.log(message);
		}
	}

	/**
  * Runs a user defined callback method
  *
  * Public Accessor: AmplitudeHelpers.runCallback( callbackName )
  *
  * @access public
  * @param {string} callbackName - The name of the callback we are going to run.
  */
	function runCallback(callbackName) {
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
			writeDebugMessage('Running Callback: ' + callbackName);

			/*
   	Run the callback function and catch any errors
   */
			try {
				callbackFunction();
			} catch (error) {
				if (error.message == "CANCEL EVENT") {
					throw error;
				} else {
					writeDebugMessage('Callback error: ' + error.message);
				}
			}
		}
	}

	/**
  * Changes the active song in the config. This happens in multiple
  * scenarios: The user clicks a play button that has an index that is
  * different than what is currently playing, the song ends and the next
  * song begins, etc.
  *
  * Public Accessor: AmplitudeHelpers.changeSong( songIndex )
  *
  * @access public
  * @param {number} songIndex - The song index we are changing to
  *
  */
	function changeSong(songIndex) {
		/*
  	Grab the song at the index defined by the user.
  */
		var song = _config2.default.songs[songIndex];

		/*
  	Stops the currently playing song so we can adjust
  	what we need.
  */
		_core2.default.stop();

		/**
   * @todo: Stop Visualization
   */

		/*
  	Set all play buttons to pause while we change
  	the song.
  */
		_visual2.default.setPlayPauseButtonsToPause();

		/*
  	Since it is a new song, we reset the song sliders. These
  	react to time updates and will eventually be updated but we
  	force update them is if there is a song slider bound to a
  	specific song, they won't update.
  */
		_visual2.default.resetSongSliders();

		/*
  	Resets the progress bars
  */
		_visual2.default.resetSongPlayedProgressBars();

		/*
  	Reset all the time place holders accordingly.
  */
		_visual2.default.resetTimes();

		/*
  	Run a callback if an album is going
  	to change.
  */
		if (checkNewAlbum(song)) {
			runCallback('album_change');
		}

		/*
  	Set the new song information so we can use the
  	active meta data later on.
  */
		setNewSong(song, songIndex);

		/*
  	Display the new visual metadata now that the config has
  	been changed. This will show the new song.
  */
		_visual2.default.displaySongMetadata();

		/*
  	Sets the active container. This is a class that
  	designers can use on an element that contains the current
  	song's controls to show it's highlighted.
  */
		_visual2.default.setActiveContainer();

		/*
  	Sets the active song's duration
  */
		_visual2.default.syncSongDuration();

		/*
  	Run song change callback.
  */
		runCallback('song_change');
	}

	/**
  * Checks to see if the new song to be played is different than the song
  * that is currently playing. To be true, the user would have selected
  * play on a new song with a new index. To be false, the user would have
  * clicked play/pause on the song that was playing.
  *
  * Public Accessor: AmplitudeHelpers.checkNewSong( songIndex )
  *
  * @access public
  * @param {number} songIndex - The index of the new song to be played.
  * @returns {boolean} True if we are setting a new song, false if we are not setting a new song.
  */
	function checkNewSong(songIndex) {
		if (songIndex != _config2.default.active_index) {
			return true;
		} else {
			return false;
		}
	}

	/**
  * Checks to see if there is a new album
  *
  * Public Accessor: AmplitudeHelpers.checkNewAlbum( new Album )
  *
  * @access public
  * @param {string} newAlbum - Checks to see if the new song will have a new album.
  * @returns {boolean} True if there is a new album, false if there is not a new ablum.
  */
	function checkNewAlbum(newAlbum) {
		if (_config2.default.active_album != newAlbum) {
			return true;
		} else {
			return false;
		}
	}

	/**
  * Checks to see if there is a new playlist
  *
  * Public Accessor: AmplitudeHelpers.checkNewPlaylist( playlist )
  *
  * @access public
  * @param {string} playlist - The playlist passed in to check against the active playlist.
  * @returns {boolean} True if there is a new playlist, false if there is not a new playlist.
  */
	function checkNewPlaylist(playlist) {
		if (_config2.default.active_playlist != playlist) {
			return true;
		} else {
			return false;
		}
	}

	/**
  * Sets the new song in the config. Sets the src of the audio object,
  * updates the	metadata and sets the active album.
  *
  * @access private
  * @param {object} song 	- The song object of the song we are changing to.
  * @param {number} index 	- The index of the song in the songs object we are changing.
  */
	function setNewSong(song, index) {
		_config2.default.active_song.src = song.url;
		_config2.default.active_metadata = song;
		_config2.default.active_album = song.album;
		_config2.default.active_index = index;
	}

	/**
  * Shuffles individual songs in the config
  * Based off of: http://www.codinghorror.com/blog/2007/12/the-danger-of-naivete.html
  *
  * Public Accessor: AmplitudeHelpers.shuffleSongs()
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
			shuffleTemp[i].original_index = i;
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
  * Public Accessor: AmplitudeHelpers.shufflePlaylistSongs( playlist )
  *
  * @access public
  * @param {string} playlist - The playlist we are shuffling.
  */
	function shufflePlaylistSongs(playlist) {
		/*
  	Builds a temporary array with the length of the playlist songs.
  */
		var shuffleTemp = new Array(_config2.default.playlists[playlist].length);

		/*
  	Set the temporary array equal to the playlist array.
  */
		for (var i = 0; i < _config2.default.playlists[playlist].length; i++) {
			shuffleTemp[i] = _config2.default.songs[_config2.default.playlists[playlist][i]];
			shuffleTemp[i].original_index = _config2.default.playlists[playlist][i];
		}

		/*
  	Iterate ove rthe songs and generate random numbers to
  	swap the indexes of the shuffle array.
  */
		for (var _i2 = _config2.default.playlists[playlist].length - 1; _i2 > 0; _i2--) {
			var randNum = Math.floor(Math.random() * _config2.default.playlists[playlist].length + 1);
			shuffleSwap(shuffleTemp, _i2, randNum - 1);
		}

		/*
  	Set the shuffle list to the shuffle temp.
  */
		_config2.default.shuffled_playlists[playlist] = shuffleTemp;
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
  * Sets the active playlist
  *
  * Public Accessor: AmplitudeHelpers.setActivePlaylist( playlist )
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
			runCallback('playlist_changed');
		}

		/*
  	Set the active playlist to the playlist parameter.
  */
		_config2.default.active_playlist = playlist;
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

	/*
 	Returns the public functions
 */
	return {
		resetConfig: resetConfig,
		writeDebugMessage: writeDebugMessage,
		runCallback: runCallback,
		changeSong: changeSong,
		checkNewSong: checkNewSong,
		checkNewAlbum: checkNewAlbum,
		checkNewPlaylist: checkNewPlaylist,
		shuffleSongs: shuffleSongs,
		shufflePlaylistSongs: shufflePlaylistSongs,
		setActivePlaylist: setActivePlaylist,
		isURL: isURL,
		isInt: isInt
	};
}();

/**
 * AmplitudeJS Visual Sync
 * @module visual/AmplitudeVisualSync
*/
/**
 * Imports the config module
 * @module config
 */
exports.default = AmplitudeHelpers;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _helpers = __webpack_require__(10);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Helps with the syncing of the display data
 *
 * @module visual/AmplitudeVisualSync
 */
/**
 * Imports the config module
 * @module config
 */
var AmplitudeVisualSync = function () {
	/**
  * Visually displays the current time on the screen. This is called on
  * time update for the current song.
  *
  * @access public
  * @param {object} currentTime 					- An object containing the current time for the song in seconds, minutes, and hours.
  * @param {float} completionPercentage	- The percent of the way through the song the user is at.
  */
	function syncCurrentTime(currentTime, completionPercentage) {
		/*
  	Set current hour display.
  */
		_helpers2.default.syncCurrentHours(currentTime.hours);

		/*
  	Set current minute display.
  */
		_helpers2.default.syncCurrentMinutes(currentTime.minutes);

		/*
  	Set current second display.
  */
		_helpers2.default.syncCurrentSeconds(currentTime.seconds);

		/*
  	Set current time display.
  */
		_helpers2.default.syncCurrentTime(currentTime);

		/*
  	Set all song sliders to be to the current percentage
  	of the song played.
  */
		syncMainSliderLocation(completionPercentage);
		syncPlaylistSliderLocation(_config2.default.active_playlist, completionPercentage);
		syncSongSliderLocation(_config2.default.active_playlist, _config2.default.active_index, completionPercentage);

		_helpers2.default.syncSongPlayedProgressBar(completionPercentage);
	}

	/**
  * Visually sync all of the times to the initial time of 0. This is so
  * we can keep all the players in sync
  *
  * @access public
  */
	function resetTimes() {
		_helpers2.default.resetCurrentHours();
		_helpers2.default.resetCurrentMinutes();
		_helpers2.default.resetCurrentSeconds();
		_helpers2.default.resetCurrentTime();
	}

	/**
  * Visually syncs the song sliders back to 0. This usually happens when
  * a song has changed, we ensure that all song sliders get reset.
  *
  * @access public
  */
	function resetSongSliders() {
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
  * Sets all of the song buffered progress bars to 0
  *
  * @access public
  */
	function resetSongBufferedProgressBars() {
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
  * Sets all of the song played progress bars to 0
  *
  * @access public
  */
	function resetSongPlayedProgressBars() {
		var songPlayedProgressBars = document.getElementsByClassName("amplitude-song-played-progress");

		for (var i = 0; i < songPlayedProgressBars.length; i++) {
			songPlayedProgressBars[i].value = 0;
		}
	}

	/**
  * Applies the class 'amplitude-active-song-container' to the element
  * containing visual information regarding the active song.
  *
  * @access public
  */
	function setActiveContainer() {
		var songContainers = document.getElementsByClassName('amplitude-song-container');

		/*
  	Removes all of the active song containrs.
  */
		for (var i = 0; i < songContainers.length; i++) {
			songContainers[i].classList.remove('amplitude-active-song-container');
		}

		/*
  	Finds the active index and adds the active song container to the element
  	that represents the song at the index.
  */
		if (_config2.default.active_playlist == '' || _config2.default.active_playlist == null) {
			if (document.querySelectorAll('.amplitude-song-container[amplitude-song-index="' + _config2.default.active_index + '"]')) {
				var _songContainers = document.querySelectorAll('.amplitude-song-container[amplitude-song-index="' + _config2.default.active_index + '"]');

				for (var _i = 0; _i < _songContainers.length; _i++) {
					if (!_songContainers[_i].hasAttribute('amplitude-playlist')) {
						_songContainers[_i].classList.add('amplitude-active-song-container');
					}
				}
			}
		} else {
			if (document.querySelectorAll('.amplitude-song-container[amplitude-song-index="' + _config2.default.active_index + '"][amplitude-playlist="' + _config2.default.active_playlist + '"]')) {
				var _songContainers2 = document.querySelectorAll('.amplitude-song-container[amplitude-song-index="' + _config2.default.active_index + '"][amplitude-playlist="' + _config2.default.active_playlist + '"]');

				for (var _i2 = 0; _i2 < _songContainers2.length; _i2++) {
					_songContainers2[_i2].classList.add('amplitude-active-song-container');
				}
			}
		}
	}

	/**
  * Displays the active song's metadata. This is called after a song has
  * been changed. This method takes the active song and displays the
  * metadata. So once the new active song is set, we update all of the
  * screen elements.
  *
  * @access public
  */
	function displaySongMetadata() {
		/*
  	Define the image meta data keys. These are managed separately
  	since we aren't actually changing the inner HTML of these elements.
  */
		var imageMetaDataKeys = ['cover_art_url', 'station_art_url', 'podcast_episode_cover_art_url'];

		/*
  	These are the ignored keys that we won't be worrying about displaying.
  	Every other key in the song object can be displayed.
  */
		var ignoredKeys = ['url', 'live'];

		/*
  	Get all of the song info elements
  */
		var songInfoElements = document.querySelectorAll('[amplitude-song-info]');

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
			var info = songInfoElements[i].getAttribute('amplitude-song-info');

			/*
   	Get the song info element playlist.
   */
			var playlist = songInfoElements[i].getAttribute('amplitude-playlist');

			/*
   	Get the main song info flag.
   */
			var main = songInfoElements[i].getAttribute('amplitude-main-song-info');

			/*
   	If the playlists match or the element is a main element, then
   	we set the song info.
   */
			if (_config2.default.active_playlist == playlist || main == 'true') {
				/*
    	If the active metadata has the key, then we set it,
    	otherwise we clear it. If it's an image element then
    	we default it to the default info if needed.
    */
				if (_config2.default.active_metadata[info] != undefined) {
					if (imageMetaDataKeys.indexOf(info) >= 0) {
						songInfoElements[i].setAttribute('src', _config2.default.active_metadata[info]);
					} else {
						songInfoElements[i].innerHTML = _config2.default.active_metadata[info];
					}
				} else {
					/*
     	We look for the default album art because
     	the actual key didn't exist. If the default album
     	art doesn't exist then we set the src attribute
     	to null.
     */
					if (imageMetaDataKeys.indexOf(info) >= 0) {
						if (_config2.default.default_album_art != '') {
							songInfoElements[i].setAttribute('src', _config2.default.default_album_art);
						} else {
							songInfoElements[i].setAttribute('src', '');
						}
					} else {
						songInfoElements[i].innerHTML = '';
					}
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
		var imageMetaDataKeys = ['cover_art_url', 'station_art_url', 'podcast_episode_cover_art_url'];

		/*
  	These are the ignored keys that we won't be worrying about displaying.
  	Every other key in the song object can be displayed.
  */
		var ignoredKeys = ['url', 'live'];

		/*
  	Get all of the song info elements
  */
		var songInfoElements = document.querySelectorAll('[amplitude-song-info][amplitude-playlist="' + playlist + '"]');

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
			var info = songInfoElements[i].getAttribute('amplitude-song-info');

			/*
   	Get the song info element playlist.
   */
			var elementPlaylist = songInfoElements[i].getAttribute('amplitude-playlist');

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
						songInfoElements[i].setAttribute('src', song[info]);
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
						if (song.default_album_art != '') {
							songInfoElements[i].setAttribute('src', song.default_album_art);
						} else {
							songInfoElements[i].setAttribute('src', '');
						}
					} else {
						songInfoElements[i].innerHTML = '';
					}
				}
			}
		}
	}

	/**
  * Sets all of the visual playback speed buttons to have the right class
  * to display the background image that represents the current playback
  * speed.
  *
  * @access public
  */
	function syncPlaybackSpeed() {
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
			playbackSpeedClasses[i].classList.remove('amplitude-playback-speed-10');
			playbackSpeedClasses[i].classList.remove('amplitude-playback-speed-15');
			playbackSpeedClasses[i].classList.remove('amplitude-playback-speed-20');

			/*
   	Switch the current playback speed and apply the appropriate
   	speed class.
   */
			switch (_config2.default.playback_speed) {
				case 1:
					playbackSpeedClasses[i].classList.add('amplitude-playback-speed-10');
					break;
				case 1.5:
					playbackSpeedClasses[i].classList.add('amplitude-playback-speed-15');
					break;
				case 2:
					playbackSpeedClasses[i].classList.add('amplitude-playback-speed-20');
					break;
			}
		}
	}

	/**
  * Syncs the buffered progress bars to the current percentage in the config
  *
  * @access public
  */
	function syncBufferedProgressBars() {
		/*
  	Gets all of the song buffered progress bars.
  */
		var songBufferedProgressBars = document.getElementsByClassName("amplitude-buffered-progress");

		/*
  	Iterate over all of the song buffered progress bar and
  	set them to 0 which is like re-setting them.
  */
		for (var i = 0; i < songBufferedProgressBars.length; i++) {
			songBufferedProgressBars[i].value = parseFloat(parseFloat(_config2.default.buffered) / 100);
		}
	}

	/**
  * Visually syncs the volume sliders so they are all the same if there
  * are more than one.
  *
  * @access public
  */
	function syncVolumeSliders() {
		var amplitudeVolumeSliders = document.getElementsByClassName("amplitude-volume-slider");

		/*
  	Iterates over all of the volume sliders for the song, setting the value
  	to the config value.
  */
		for (var i = 0; i < amplitudeVolumeSliders.length; i++) {
			amplitudeVolumeSliders[i].value = _config2.default.active_song.volume * 100;
		}
	}

	/**
  * Sets all of the play pause buttons to paused.
  *
  * @access public
  */
	function setPlayPauseButtonsToPause() {
		/*
  	Gets all of the play pause elements
  */
		var playPauseElements = document.querySelectorAll('.amplitude-play-pause');

		/*
  	Sets all of the elements to pause
  */
		for (var i = 0; i < playPauseElements.length; i++) {
			_helpers2.default.setElementPause(playPauseElements[i]);
		}
	}

	/**
  * Syncs the main play pause buttons to the state of the active song.
  *
  * @param {string} state The state of the player
  * @access public
  */
	function syncMainPlayPause(state) {
		/*
  	Ensures we have a string for the state otherwise we grab the
  	state from the config.
  */
		if (typeof state != "string") {
			state = _config2.default.active_song.paused ? "paused" : "playing";
		}

		/*
  	Get all play pause buttons.
  */
		var playPauseElements = document.querySelectorAll('.amplitude-play-pause[amplitude-main-play-pause="true"]');

		/*
  	Iterate over all of the play pause elements syncing the
  	display visually.
  */
		for (var i = 0; i < playPauseElements.length; i++) {
			/*
   	Determines what classes we should add and remove
   	from the elements.
   */
			switch (state) {
				case 'playing':
					_helpers2.default.setElementPlay(playPauseElements[i]);
					break;
				case 'paused':
					_helpers2.default.setElementPause(playPauseElements[i]);
					break;
			}
		}
	}

	/**
  * Syncs the main playlist play pause buttons to the state of the active song.
  *
  * @access public
  * @param {string} playlist 	- The playlist we are setting the play pause state for.
  * @param {string} state 			- Either playing or paused for the state of the active song.
  */
	function syncPlaylistPlayPause(playlist, state) {
		/*
  	Ensures we have a string for the state otherwise we grab the
  	state from the config.
  */
		if (typeof state != "string") {
			state = _config2.default.active_song.paused ? "paused" : "playing";
		}

		/*
  	Get all of the main playlist play pause elements
  */
		var playlistPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[amplitude-playlist-main-play-pause="true"]');

		/*
  	Iterate over the play pause elements, syncing the state accordingly.
  */
		for (var i = 0; i < playlistPlayPauseElements.length; i++) {
			/*
   	If the element has the same playlist attribute as the playlist
   	passed in and the state is playing, we set the element to
   	be playing otherwise we set it to pause. Setting to pause
   	means the element doesn't match the active playlist or the
   	state is paused.
   */
			if (playlistPlayPauseElements[i].getAttribute('amplitude-playlist') == playlist && state == 'playing') {

				_helpers2.default.setElementPlay(playlistPlayPauseElements[i]);
			} else {
				_helpers2.default.setElementPause(playlistPlayPauseElements[i]);
			}
		}
	}

	/**
  * Syncs the song play pause buttons to the state of the active song.
  *
  * @access public
  * @param {string} playlist 	- The playlist we are setting the play pause state for.
  * @param {int} song 					- The index of the song we are syncing the state for
  * @param {string} state 			- Either playing or paused for the state of the active song.
  */
	function syncSongPlayPause(playlist, song, state) {
		/*
  	Ensures we have a string for the state otherwise we grab the
  	state from the config.
  */
		if (typeof state != "string") {
			state = _config2.default.active_song.paused ? "paused" : "playing";
		}

		/*
  	If the playlist is null or empty, we make sure that any song
  	that is a part of a playlist is set to paused.
  */
		if (playlist == null || playlist == '') {
			/*
   	Get all of the individual song play pause buttons. These have an
   	amplitude-song-index attribute. Some have amplitude-playlist which
   	means they are individual songs within a playlist.
   */
			var songPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[amplitude-song-index]');

			/*
   	Iterate over all of the song play pause elements
   */
			for (var i = 0; i < songPlayPauseElements.length; i++) {
				/*
    	If the song element has an attribute for amplitude-playlist then
    	we set it to paused no matter what because the state of the player
    	is not in a playlist mode.
    */
				if (songPlayPauseElements[i].hasAttribute('amplitude-playlist')) {
					_helpers2.default.setElementPause(songPlayPauseElements[i]);
				} else {
					/*
     	If the state of the song is playing and the song index matches the
     	index of the song we have, we set the element to playing otherwise
     	we set the element to paused.
     */
					if (state == 'playing' && songPlayPauseElements[i].getAttribute('amplitude-song-index') == song) {
						_helpers2.default.setElementPlay(songPlayPauseElements[i]);
					} else {
						_helpers2.default.setElementPause(songPlayPauseElements[i]);
					}
				}
			}
		} else {
			/*
   	Get all of the individual song play pause buttons. These have an
   	amplitude-song-index attribute. Some have amplitude-playlist which
   	means they are individual songs within a playlist.
   */
			var _songPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[amplitude-song-index]');

			/*
   	Iterate over all of the individual play pause elements.
   */
			for (var _i3 = 0; _i3 < _songPlayPauseElements.length; _i3++) {
				/*
    	Since we have an active playlist this time, we want any stand alone
    	songs to be set to paused since the scope is within a playlist.
    		We check to see if the element has an amplitude-playlist attribute.
    */
				if (_songPlayPauseElements[_i3].hasAttribute('amplitude-playlist')) {

					/*
     	Check to see if the song index matches the index passed in and the
     	playlist matches the scoped playlist we are looking for and the
     	state of the player is playing, then we set the element to play. If those
     	three parameters are not met, set the element to pause.
     */
					if (_songPlayPauseElements[_i3].getAttribute('amplitude-song-index') == song && _songPlayPauseElements[_i3].getAttribute('amplitude-playlist') == playlist && state == 'playing') {
						_helpers2.default.setElementPlay(_songPlayPauseElements[_i3]);
					} else {
						_helpers2.default.setElementPause(_songPlayPauseElements[_i3]);
					}
				} else {
					/*
     	Set any individual songs (songs outside of a playlist scope) to pause
     	since we are in the scope of a playlist.
     */
					_helpers2.default.setElementPause(_songPlayPauseElements[_i3]);
				}
			}
		}
	}

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
				repeatClasses[i].classList.add('amplitude-repeat-on');
				repeatClasses[i].classList.remove('amplitude-repeat-off');
			} else {
				repeatClasses[i].classList.remove('amplitude-repeat-on');
				repeatClasses[i].classList.add('amplitude-repeat-off');
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
			if (repeatButtons[i].getAttribute('amplitude-playlist') == playlist) {
				/*
     If the state of the playlist is shuffled on, true, then
     we add the 'amplitude-repeat-on' class and remove the
     'amplitude-repeat-off' class. If the player is not shuffled
     then we do the opposite.
    */
				if (_config2.default.repeat_statuses[playlist]) {
					repeatButtons[i].classList.add('amplitude-repeat-on');
					repeatButtons[i].classList.remove('amplitude-repeat-off');
				} else {
					repeatButtons[i].classList.add('amplitude-repeat-off');
					repeatButtons[i].classList.remove('amplitude-repeat-on');
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
				repeatSongClasses[i].classList.add('amplitude-repeat-song-on');
				repeatSongClasses[i].classList.remove('amplitude-repeat-song-off');
			} else {
				repeatSongClasses[i].classList.remove('amplitude-repeat-song-on');
				repeatSongClasses[i].classList.add('amplitude-repeat-song-off');
			}
		}
	}

	/**
  * Syncs mute for all of the mute buttons. This represents the
  * state of the player if it's muted or not.
  *
  * @access public
  * @param {string} state 	- The muted state of the player.
  */
	function syncMute(state) {
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
				muteClasses[i].classList.add('amplitude-not-muted');
				muteClasses[i].classList.remove('amplitude-muted');
			} else {
				muteClasses[i].classList.remove('amplitude-not-muted');
				muteClasses[i].classList.add('amplitude-muted');
			}
		}
	}

	/**
  * Syncs the global shuffle button visual state.
  *
  * @access public
  * @param {boolean} state  	- The shuffled state of the player.
  */
	function syncShuffle(state) {
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
			if (shuffleButtons[i].getAttribute('amplitude-playlist') == null) {
				/*
    	If the state of the player is shuffled on, true, then
    	we add the 'amplitude-shuffle-on' class and remove the
    	'amplitude-shuffle-off' class. If the player is not shuffled
    	then we do the opposite.
    */
				if (state) {
					shuffleButtons[i].classList.add('amplitude-shuffle-on');
					shuffleButtons[i].classList.remove('amplitude-shuffle-off');
				} else {
					shuffleButtons[i].classList.add('amplitude-shuffle-off');
					shuffleButtons[i].classList.remove('amplitude-shuffle-on');
				}
			}
		}
	}

	/**
  * Syncs the playlist shuffle button visual state.
  *
  * @access public
  * @param {boolean} state 	- The shuffled state of the player.
  * @param {string} playlist - The playlist string the shuffle button belongs to.
  */
	function syncPlaylistShuffle(state, playlist) {
		/*
  	Gets all of the shuffle buttons.
  */
		var shuffleButtons = document.getElementsByClassName("amplitude-shuffle");

		/*
  	Iterate over all of the shuffle buttons
  */
		for (var i = 0; i < shuffleButtons.length; i++) {
			/*
   	Ensure that the playlist the shuffle button belongs to matches the
   	playlist we are syncing the state for.
   */
			if (shuffleButtons[i].getAttribute('amplitude-playlist') == playlist) {
				/*
    	If the state of the playlist is shuffled on, true, then
    	we add the 'amplitude-shuffle-on' class and remove the
    	'amplitude-shuffle-off' class. If the player is not shuffled
    	then we do the opposite.
    */
				if (state) {
					shuffleButtons[i].classList.add('amplitude-shuffle-on');
					shuffleButtons[i].classList.remove('amplitude-shuffle-off');
				} else {
					shuffleButtons[i].classList.add('amplitude-shuffle-off');
					shuffleButtons[i].classList.remove('amplitude-shuffle-on');
				}
			}
		}
	}

	/**
  * Syncs the main slider location
  *
  * @access public
  * @param {number} location 	- The location of the song as a percentage.
  */
	function syncMainSliderLocation(location) {
		/*
  	Ensure we have a location that's a number
  */
		location = !isNaN(location) ? location : 0;

		/*
  	Gets the main song sliders
  */
		var mainSongSliders = document.querySelectorAll('.amplitude-song-slider[amplitude-main-song-slider="true"]');

		/*
  	Iterates over all of the main sliders and sets the value to the
  	percentage of the song played.
  */
		for (var i = 0; i < mainSongSliders.length; i++) {
			mainSongSliders[i].value = location;
		}
	}

	/**
  * Syncs playlist song slider locations
  *
  * @access public
  * @param {string} playlist 	- The playlist we are setting the song slider for.
  * @param {number} location 	- The location of the song as a percentage.
  */
	function syncPlaylistSliderLocation(playlist, location) {
		/*
  	Ensure we have a location that's a number
  */
		location = !isNaN(location) ? location : 0;

		/*
  	Gets the playlist song sliders
  */
		var playlistSongSliders = document.querySelectorAll('.amplitude-song-slider[amplitude-playlist-song-slider="true"][amplitude-playlist="' + playlist + '"]');

		/*
  	Iterates over all of the playlist sliders and sets the value to the
  	percentage of the song played.
  */
		for (var i = 0; i < playlistSongSliders.length; i++) {
			playlistSongSliders[i].value = location;
		}
	}

	/**
  * Syncs individual song slider locations
  *
  * @access public
  * @param {string} playlist 	- The playlist we are setting the song slider for.
  * @param {number} songIndex 	- The index of the song we are adjusting the song slider for.
  * @param {number} location 	- The location of the song as a percentage.
  */
	function syncSongSliderLocation(playlist, songIndex, location) {
		/*
  	Ensure we have a location that's a number
  */
		location = !isNaN(location) ? location : 0;
		/*
  	If the playlist is set, we get all of the individual song sliders
  	that relate to the song and the playlist.
  */
		if (playlist != '' && playlist != null) {
			/*
   	Gets the song sliders for the individual songs and the
   	playlist
   */
			var songSliders = document.querySelectorAll('.amplitude-song-slider[amplitude-playlist="' + playlist + '"][amplitude-song-index="' + songIndex + '"]');

			/*
   	Iterates over all of the playlist sliders and set the value to the
   	percentage of the song played.
   */
			for (var i = 0; i < songSliders.length; i++) {
				songSliders[i].value = location;
			}
		} else {
			/*
   	Get the individual song slider by index
   */
			var _songSliders = document.querySelectorAll('.amplitude-song-slider[amplitude-song-index="' + songIndex + '"]');

			/*
   	Iterats over all of the song sliders that have the index of
   	the song we are sliding. If the song doesn't have a playlist
   	attribute, we set the location.
   */
			for (var _i4 = 0; _i4 < _songSliders.length; _i4++) {
				if (!_songSliders[_i4].hasAttribute('amplitude-playlist')) {
					if (location != 0) {
						_songSliders[_i4].value = location;
					}
				}
			}
		}
	}

	/**
  * Sets the volume slider location
  *
  * @access public
  * @param {number} volume 	- The volume from 0 - 1 for song volume.
  */
	function syncVolumeSliderLocation(volume) {
		/*
  	Gets all of the volume sliders
  */
		var volumeSliders = document.querySelectorAll('.amplitude-volume-slider');

		/*
  	Iterates over all of the sliders and sets their volume
  	to the volume of the song.
  */
		for (var i = 0; i < volumeSliders.length; i++) {
			volumeSliders[i].value = volume;
		}
	}

	/**
  * Syncs the song's duration
  *
  * @access public
  * @param {object} currentTime 		- Object containing information about the current time of the song.
  * @param {object} songDuration 	- Object containing information about the duration of the song.
  */
	function syncSongDuration(currentTime, songDuration) {
		/*
  	Set duration hour display.
  */
		_helpers2.default.syncDurationHours(songDuration != undefined && !isNaN(songDuration.hours) ? songDuration.hours : '00');

		/*
  	Set duration minute display.
  */
		_helpers2.default.syncDurationMinutes(songDuration != undefined && !isNaN(songDuration.minutes) ? songDuration.minutes : '00');

		/*
  	Set duration second display.
  */
		_helpers2.default.syncDurationSeconds(songDuration != undefined && !isNaN(songDuration.seconds) ? songDuration.seconds : '00');

		/*
  	Set duration time display.
  */
		_helpers2.default.syncDurationTime(songDuration != undefined ? songDuration : {});

		/*
  	Set count down time display.
  */
		_helpers2.default.syncCountDownTime(currentTime, songDuration);
	}

	/**
  * Sets the meta data for songs loaded in the songs array
  */
	function syncSongsMetaData() {
		/*
  	Define the image meta data keys. These are managed separately
  	since we aren't actually changing the inner HTML of these elements.
  */
		var imageMetaDataKeys = ['cover_art_url', 'station_art_url', 'podcast_episode_cover_art_url'];

		/*
  	These are the ignored keys that we won't be worrying about displaying.
  	Every other key in the song object can be displayed.
  */
		var ignoredKeys = ['url', 'live'];

		/*
  	Get all of the song info elements
  */
		var songInfoElements = document.querySelectorAll('[amplitude-song-info]');

		/*
  	Iterate over all of the song info elements. We will either
  	set these to the new values, or clear them if the active song
  	doesn't have the info set.
  */
		for (var i = 0; i < songInfoElements.length; i++) {

			/*
   	For this method we do not want the element to have any playlist or
   	main song info. This way we aren't adjusting the main song information for the
   	global player or the playlist player.
   */
			if (songInfoElements[i].getAttribute('amplitude-playlist') == null && songInfoElements[i].getAttribute('amplitude-main-song-info') == null && songInfoElements[i].getAttribute('amplitude-song-index') != null) {

				/*
    		Get the info so we can check if the active meta data has the
    		key.
    	*/
				var info = songInfoElements[i].getAttribute('amplitude-song-info');
				var index = songInfoElements[i].getAttribute('amplitude-song-index');

				/*
    	Make sure that the song index they are referencing is defined.
    */
				if (_config2.default.songs[index][info] != undefined) {

					/*
     	If it's an image meta data key, then we set the src attribute of
     	the element. Otherwise we set the inner HTML of the element.
     */
					if (imageMetaDataKeys.indexOf(info) >= 0) {
						songInfoElements[i].setAttribute('src', _config2.default.songs[index][info]);
					} else {
						songInfoElements[i].innerHTML = _config2.default.songs[index][info];
					}
				}
			}
		}
	}

	/**
 	Returns the publically available functions
 	@TODO Re-order to order of methods in module
 */
	return {
		syncCurrentTime: syncCurrentTime,
		resetTimes: resetTimes,
		resetSongSliders: resetSongSliders,
		resetSongPlayedProgressBars: resetSongPlayedProgressBars,
		resetSongBufferedProgressBars: resetSongBufferedProgressBars,
		setActiveContainer: setActiveContainer,
		displaySongMetadata: displaySongMetadata,
		syncPlaybackSpeed: syncPlaybackSpeed,
		syncBufferedProgressBars: syncBufferedProgressBars,
		syncVolumeSliders: syncVolumeSliders,
		setPlayPauseButtonsToPause: setPlayPauseButtonsToPause,
		setFirstSongInPlaylist: setFirstSongInPlaylist,
		syncMainPlayPause: syncMainPlayPause,
		syncPlaylistPlayPause: syncPlaylistPlayPause,
		syncSongPlayPause: syncSongPlayPause,
		syncRepeat: syncRepeat,
		syncRepeatSong: syncRepeatSong,
		syncRepeatPlaylist: syncRepeatPlaylist,
		syncMute: syncMute,
		syncShuffle: syncShuffle,
		syncPlaylistShuffle: syncPlaylistShuffle,
		syncMainSliderLocation: syncMainSliderLocation,
		syncPlaylistSliderLocation: syncPlaylistSliderLocation,
		syncSongSliderLocation: syncSongSliderLocation,
		syncVolumeSliderLocation: syncVolumeSliderLocation,
		syncSongDuration: syncSongDuration,
		syncSongsMetaData: syncSongsMetaData
	};
}();

/**
 * Imports the Amplitude Visual Sync Helpers to keep the display in sync
 * @module visual/AmplitudeVisualSyncHelpers
 */
exports.default = AmplitudeVisualSync;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _helpers = __webpack_require__(1);

var _helpers2 = _interopRequireDefault(_helpers);

var _visual = __webpack_require__(2);

var _visual2 = _interopRequireDefault(_visual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Interacts directly with native functions of the Audio element. Logic
 * leading up to these methods are handled by click handlers which call
 * helpers and visual synchronizers. These are the core functions of AmplitudeJS.
 * Every other function that leads to these prepare the information to be
 * acted upon by these functions.
 *
 * @module core/AmplitudeCore
 */


/**
 * AmplitudeJS Core Helpers
 * @module core/helpers
 */
var AmplitudeCore = function () {
	/**
  * Plays the active song. If the current song is live, it reconnects
  * the stream before playing.
  *
  * Public Accessor: Amplitude.play()
  *
  * @access public
  */
	function play() {
		/*
  	Run the before play callback
  */
		_helpers2.default.runCallback('before_play');

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
		_config2.default.active_song.play();
		_config2.default.active_song.playbackRate = _config2.default.playback_speed;

		/*
  	Run the after play callback
  */
		_helpers2.default.runCallback('after_play');
	}

	/**
  * Pauses the active song. If it's live, it disconnects the stream.
  *
  * Public Accessor: Amplitude.pause()
  *
  * @access public
  */
	function pause() {
		/*
  	Run the before pause callback.
  */
		_helpers2.default.runCallback('before_pause');

		/*
  	Pause the active song.
  */
		_config2.default.active_song.pause();

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
  	Run the after pause callback.
  */
		_helpers2.default.runCallback('after_pause');
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
		/*
  	Runs the before stop callback.
  */
		_helpers2.default.runCallback('before_stop');

		/*
  	Set the current time of the song to 0 which will reset the song.
  */
		if (_config2.default.active_song.currentTime != 0) {
			_config2.default.active_song.currentTime = 0;
		}

		/*
  	Run pause so the song will stop
  */
		_config2.default.active_song.pause();

		/*
  	If the song is live, disconnect the stream.
  */
		if (_config2.default.active_metadata.live) {
			disconnectStream();
		}

		/*
  	Run the after stop callback
  */
		_helpers2.default.runCallback('after_stop');
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
			_visual2.default.syncMute(true);
			_config2.default.active_song.muted = true;
		} else {
			_visual2.default.syncMute(false);
			_config2.default.active_song.muted = false;
		}

		/*
  	Sets the volume in the config so we can reference it later on.
  */
		_config2.default.volume = volumeLevel;

		/*
  	Set the volume of the active song.
  */
		_config2.default.active_song.volume = volumeLevel / 100;
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
			_config2.default.active_song.currentTime = _config2.default.active_song.duration * (song_percentage / 100);
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
		_config2.default.active_song.addEventListener('canplaythrough', function () {
			/*
   	If the active song duration is greater than or equal to the
   	amount of seconds the user wants to skip to and the seconds
   	is greater than 0, we skip to the seconds defined.
   */
			if (_config2.default.active_song.duration >= seconds && seconds > 0) {
				_config2.default.active_song.currentTime = seconds;
			} else {
				_helpers2.default.writeDebugMessage('Amplitude can\'t skip to a location greater than the duration of the audio or less than 0');
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
		_config2.default.active_song.src = '';
		_config2.default.active_song.load();
	}

	/**
  * Reconnects the live stream
  *
  * Public Accessor: Amplitude.reconnectStream()
  *
  * @access public\
  */
	function reconnectStream() {
		_config2.default.active_song.src = _config2.default.active_metadata.url;
		_config2.default.active_song.load();
	}

	/**
  * When you pass a song object it plays that song right awawy.  It sets
  * the active song in the config to the song you pass in and synchronizes
  * the visuals.
  *
  * Public Accessor: Amplitude.playNow( song )
  *
  * @access public
  * @param {object} song - JSON representation of a song.
  */
	function playNow(song) {
		/*
  	Makes sure the song object has a URL associated with it
  	or there will be nothing to play.
  */
		if (song.url) {
			_config2.default.active_song.src = song.url;
			_config2.default.active_metadata = song;
			_config2.default.active_album = song.album;
		} else {
			/*
   	Write error message since the song passed in doesn't
   	have a URL.
   */
			_helpers2.default.writeDebugMessage('The song needs to have a URL!');
		}

		/*
  	Sets the main song control status visual
  */
		_visual2.default.syncMainPlayPause('playing');

		/*
  	Update the song meta data
  */
		_visual2.default.displaySongMetadata();

		/*
  	Reset the song sliders, song progress bar info, and
  	reset times. This ensures everything stays in sync.
  */
		_visual2.default.resetSongSliders();

		_visual2.default.resetSongPlayedProgressBars();

		_visual2.default.resetTimes();

		/*
  	Plays the song.
  */
		play();
	}

	/**
  * Plays the song at a specific index in the songs array
  *
  * Public Accessor: Amplitude.playSongAtIndex( song )
  *
  * @access public
  * @param {number} index - The number representing the song in the songs array
  */
	function playSongAtIndex(index) {
		/*
  	Stop the current song.
  */
		stop();

		/*
  	Determine if there is a new playlist, if so set the active playlist and change the song.
  */
		if (_helpers2.default.checkNewPlaylist(null)) {
			_helpers2.default.setActivePlaylist(null);

			_helpers2.default.changeSong(index);
		}

		/*
  	Check if the song is new. If so, change the song.
  */
		if (_helpers2.default.checkNewSong(index)) {
			_helpers2.default.changeSong(index);
		}

		/*
   Sync all of the play pause buttons.
  */
		_visual2.default.syncMainPlayPause('playing');
		_visual2.default.syncPlaylistPlayPause(_config2.default.active_playlist, 'playing');
		_visual2.default.syncSongPlayPause(_config2.default.active_playlist, _config2.default.active_index, 'playing');

		/*
   Play the song
  */
		play();
	}

	/**
 * Plays a song at the index passed in for the playlist provided. The index passed
 * in should be the index of the song in the playlist and not the songs array.
 *
 * @access public
 * @param {number} index 		- The number representing the song in the playlist array.
 * @param {string} playlist 	- The key string representing the playlist we are playing the song from.
 *
 */
	function playPlaylistSongAtIndex(index, playlist) {
		/*
  		Stop the current song.
  */
		stop();

		/*
  		Get the index of the song in the songs array. This is the integer at the index
  	in the playlist.
  */
		var songIndex = _config2.default.playlists[playlist][index];

		/*
  		Determine if there is a new playlist, if so set the active playlist and change the song.
  */
		if (_helpers2.default.checkNewPlaylist(playlist)) {
			_helpers2.default.setActivePlaylist(playlist);

			_helpers2.default.changeSong(songIndex);
		}

		/*
  		Check if the song is new. If so, change the song.
  */
		if (_helpers2.default.checkNewSong(songIndex)) {
			_helpers2.default.changeSong(songIndex);
		}

		/*
  	Sync all of the play pause buttons.
  */
		_visual2.default.syncMainPlayPause('playing');
		_visual2.default.syncPlaylistPlayPause(_config2.default.active_playlist, 'playing');
		_visual2.default.syncSongPlayPause(_config2.default.active_playlist, _config2.default.active_index, 'playing');

		/*
  	Play the song
  */
		play();
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
		_config2.default.active_song.playbackRate = _config2.default.playback_speed;
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
		playNow: playNow,
		playSongAtIndex: playSongAtIndex,
		playPlaylistSongAtIndex: playPlaylistSongAtIndex,
		setPlaybackSpeed: setPlaybackSpeed
	};
}();

/**
 * AmplitudeJS Visual Sync
 * @module visual/visual
*/
/**
 * Imports the config module
 * @module config
 */
exports.default = AmplitudeCore;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _helpers = __webpack_require__(1);

var _helpers2 = _interopRequireDefault(_helpers);

var _handlers = __webpack_require__(7);

var _handlers2 = _interopRequireDefault(_handlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
|----------------------------------------------------------------------------------------------------
| EVENTS METHODS
|----------------------------------------------------------------------------------------------------
| These methods are called when we need to bind events to certain elements.
|
| METHODS:
| 	initializeEvents()
|	bindPlay()
|	bindPause()
|	bindPlayPause()
|	bindStop()
|	bindMute()
|	bindVolumeUp()
|	bindVolumeDown()
|	bindSongSlider()
|	bindVolumeSlider()
|	bindNext()
|	bindPrev()
|	bindShuffle()
|	bindRepeat()
|	bindPlaybackSpeed()
|	bindSkipTo()
|      bindProgress()
*/
var AmplitudeEvents = function () {
	/*--------------------------------------------------------------------------
 	Initializes the handlers for the events listened to by Amplitude
 --------------------------------------------------------------------------*/
	function initializeEvents() {
		/*
  	Write out debug message
  */
		_helpers2.default.writeDebugMessage('Beginning initialization of event handlers..');

		/*
  	Sets flag that the screen is moving and not a tap
  */
		document.addEventListener('touchmove', function () {
			_config2.default.is_touch_moving = true;
		});

		/*
  	On touch end if it was a touch move event, set moving to
  	false
  */
		document.addEventListener('touchend', function () {
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
  	Binds 'amplitude-playback-speed' event handlers.
  */
		bindPlaybackSpeed();

		/*
  	Binds 'amplitude-skip-to' event handlers.
  */
		bindSkipTo();
	}

	/*--------------------------------------------------------------------------
 	On time update for the audio element, update visual displays that
 		represent the time on either a visualized element or time display.
 --------------------------------------------------------------------------*/
	function bindTimeUpdate() {
		_config2.default.active_song.removeEventListener('timeupdate', _handlers2.default.updateTime);
		_config2.default.active_song.addEventListener('timeupdate', _handlers2.default.updateTime);

		// also bind change of duratuion
		_config2.default.active_song.removeEventListener('durationchange', _handlers2.default.updateTime);
		_config2.default.active_song.addEventListener('durationchange', _handlers2.default.updateTime);
	}

	/*--------------------------------------------------------------------------
 	On keydown, we listen to what key got pressed so we can map the key to
 	a function. This allows the user to map pause and play, next, etc. to key
 	presses.
 --------------------------------------------------------------------------*/
	function bindKeyDownEventHandlers() {
		document.removeEventListener("keydown", _helpers2.default.keydown);
		document.addEventListener("keydown", _handlers2.default.keydown);
	}

	/*--------------------------------------------------------------------------
 	When the audio element has ended playing, we handle the song
 	ending. In a single song or multiple modular song instance,
 	this just synchronizes the visuals for time and song time
 	visualization, but for a playlist it determines whether
 	it should play the next song or not.
 --------------------------------------------------------------------------*/
	function bindSongEnded() {
		_config2.default.active_song.removeEventListener('ended', _handlers2.default.songEnded);
		_config2.default.active_song.addEventListener('ended', _handlers2.default.songEnded);
	}

	/*--------------------------------------------------------------------------
 	As the audio is loaded, the progress event gets fired. We bind into this
 	to grab the buffered percentage of the song. We can then add more elements
 	to show the buffered amount.
 --------------------------------------------------------------------------*/
	function bindProgress() {
		_config2.default.active_song.removeEventListener('progress', _handlers2.default.progess);
		_config2.default.active_song.addEventListener('progress', _handlers2.default.progress);
	}

	/*--------------------------------------------------------------------------
 	BINDS: class="amplitude-play"
 		Binds click and touchend events for amplitude play buttons.
 --------------------------------------------------------------------------*/
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
				play_classes[i].removeEventListener('touchend', _handlers2.default.play);
				play_classes[i].addEventListener('touchend', _handlers2.default.play);
			} else {
				play_classes[i].removeEventListener('click', _handlers2.default.play);
				play_classes[i].addEventListener('click', _handlers2.default.play);
			}
		}
	}

	/*--------------------------------------------------------------------------
 	BINDS: class="amplitude-pause"
 		Binds click and touchend events for amplitude pause buttons.
 --------------------------------------------------------------------------*/
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
				pause_classes[i].removeEventListener('touchend', _handlers2.default.pause);
				pause_classes[i].addEventListener('touchend', _handlers2.default.pause);
			} else {
				pause_classes[i].removeEventListener('click', _handlers2.default.pause);
				pause_classes[i].addEventListener('click', _handlers2.default.pause);
			}
		}
	}

	/*--------------------------------------------------------------------------
 	BINDS: class="amplitude-play-pause"
 		Binds click and touchend events for amplitude play pause buttons.
 --------------------------------------------------------------------------*/
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
				play_pause_classes[i].removeEventListener('touchend', _handlers2.default.playPause);
				play_pause_classes[i].addEventListener('touchend', _handlers2.default.playPause);
			} else {
				play_pause_classes[i].removeEventListener('click', _handlers2.default.playPause);
				play_pause_classes[i].addEventListener('click', _handlers2.default.playPause);
			}
		}
	}

	/*--------------------------------------------------------------------------
 	BINDS: class="amplitude-stop"
 		Binds click and touchend events for amplitude stop buttons
 --------------------------------------------------------------------------*/
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
				stop_classes[i].removeEventListener('touchend', _handlers2.default.stop);
				stop_classes[i].addEventListener('touchend', _handlers2.default.stop);
			} else {
				stop_classes[i].removeEventListener('click', _handlers2.default.stop);
				stop_classes[i].addEventListener('click', _handlers2.default.stop);
			}
		}
	}

	/*--------------------------------------------------------------------------
 	BINDS: class="amplitude-mute"
 		Binds click and touchend events for amplitude mute buttons
 --------------------------------------------------------------------------*/
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
					_helpers2.default.writeDebugMessage('iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4');
				} else {
					mute_classes[i].removeEventListener('touchend', _handlers2.default.mute);
					mute_classes[i].addEventListener('touchend', _handlers2.default.mute);
				}
			} else {
				mute_classes[i].removeEventListener('click', _handlers2.default.mute);
				mute_classes[i].addEventListener('click', _handlers2.default.mute);
			}
		}
	}

	/*--------------------------------------------------------------------------
 	BINDS: class="amplitude-volume-up"
 		Binds click and touchend events for amplitude volume up buttons
 --------------------------------------------------------------------------*/
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
					_helpers2.default.writeDebugMessage('iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4');
				} else {
					volume_up_classes[i].removeEventListener('touchend', _handlers2.default.volumeUp);
					volume_up_classes[i].addEventListener('touchend', _handlers2.default.volumeUp);
				}
			} else {
				volume_up_classes[i].removeEventListener('click', _handlers2.default.volumeUp);
				volume_up_classes[i].addEventListener('click', _handlers2.default.volumeUp);
			}
		}
	}

	/*--------------------------------------------------------------------------
 	BINDS: class="amplitude-volume-down"
 		Binds click and touchend events for amplitude volume down buttons
 --------------------------------------------------------------------------*/
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
					_helpers2.default.writeDebugMessage('iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4');
				} else {
					volume_down_classes[i].removeEventListener('touchend', _handlers2.default.volumeDown);
					volume_down_classes[i].addEventListener('touchend', _handlers2.default.volumeDown);
				}
			} else {
				volume_down_classes[i].removeEventListener('click', _handlers2.default.volumeDown);
				volume_down_classes[i].addEventListener('click', _handlers2.default.volumeDown);
			}
		}
	}

	/*--------------------------------------------------------------------------
 	BINDS: class="amplitude-song-slider"
 		Binds change and input events for amplitude song slider inputs
 --------------------------------------------------------------------------*/
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
				song_sliders[i].removeEventListener('change', _handlers2.default.songSlider);
				song_sliders[i].addEventListener('change', _handlers2.default.songSlider);
			} else {
				song_sliders[i].removeEventListener('input', _handlers2.default.songSlider);
				song_sliders[i].addEventListener('input', _handlers2.default.songSlider);
			}
		}
	}

	/*--------------------------------------------------------------------------
 	BINDS: class="amplitude-volume-slider"
 		Binds change and input events for amplitude volume slider inputs
 --------------------------------------------------------------------------*/
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
				_helpers2.default.writeDebugMessage('iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4');
			} else {
				if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
					volume_sliders[i].removeEventListener('change', _handlers2.default.volumeSlider);
					volume_sliders[i].addEventListener('change', _handlers2.default.volumeSlider);
				} else {
					volume_sliders[i].removeEventListener('input', _handlers2.default.volumeSlider);
					volume_sliders[i].addEventListener('input', _handlers2.default.volumeSlider);
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
 	BINDS: class="amplitude-next"
 		Binds click and touchend events for amplitude next buttons.
 --------------------------------------------------------------------------*/
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
				next_classes[i].removeEventListener('touchend', _handlers2.default.next);
				next_classes[i].addEventListener('touchend', _handlers2.default.next);
			} else {
				next_classes[i].removeEventListener('click', _handlers2.default.next);
				next_classes[i].addEventListener('click', _handlers2.default.next);
			}
		}
	}

	/*--------------------------------------------------------------------------
 	BINDS: class="amplitude-prev"
 		Binds click and touchend events for amplitude prev buttons.
 --------------------------------------------------------------------------*/
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
				prev_classes[i].removeEventListener('touchend', _handlers2.default.prev);
				prev_classes[i].addEventListener('touchend', _handlers2.default.prev);
			} else {
				prev_classes[i].removeEventListener('click', _handlers2.default.prev);
				prev_classes[i].addEventListener('click', _handlers2.default.prev);
			}
		}
	}

	/*--------------------------------------------------------------------------
 	BINDS: class="amplitude-shuffle"
 		Binds click and touchend events for amplitude shuffle buttons.
 --------------------------------------------------------------------------*/
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
			shuffle_classes[i].classList.remove('amplitude-shuffle-on');
			shuffle_classes[i].classList.add('amplitude-shuffle-off');

			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				shuffle_classes[i].removeEventListener('touchend', _handlers2.default.shuffle);
				shuffle_classes[i].addEventListener('touchend', _handlers2.default.shuffle);
			} else {
				shuffle_classes[i].removeEventListener('click', _handlers2.default.shuffle);
				shuffle_classes[i].addEventListener('click', _handlers2.default.shuffle);
			}
		}
	}

	/*--------------------------------------------------------------------------
 	BINDS: class="amplitude-repeat"
 		Binds click and touchend events for amplitude repeat buttons.
 --------------------------------------------------------------------------*/
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
			repeat_classes[i].classList.remove('amplitude-repeat-on');
			repeat_classes[i].classList.add('amplitude-repeat-off');

			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				repeat_classes[i].removeEventListener('touchend', _handlers2.default.repeat);
				repeat_classes[i].addEventListener('touchend', _handlers2.default.repeat);
			} else {
				repeat_classes[i].removeEventListener('click', _handlers2.default.repeat);
				repeat_classes[i].addEventListener('click', _handlers2.default.repeat);
			}
		}
	}

	/*--------------------------------------------------------------------------
 	BINDS: class="amplitude-playback-speed"
 		Binds click and touchend events for amplitude playback speed buttons.
 --------------------------------------------------------------------------*/
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
				playback_speed_classes[i].removeEventListener('touchend', _handlers2.default.playbackSpeed);
				playback_speed_classes[i].addEventListener('touchend', _handlers2.default.playbackSpeed);
			} else {
				playback_speed_classes[i].removeEventListener('click', _handlers2.default.playbackSpeed);
				playback_speed_classes[i].addEventListener('click', _handlers2.default.playbackSpeed);
			}
		}
	}

	/*--------------------------------------------------------------------------
 	BINDS: class="amplitude-skip-to"
 		Binds click and touchend events for amplitude skip to buttons.
 --------------------------------------------------------------------------*/
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
				skipToClasses[i].removeEventListener('touchend', _handlers2.default.skipTo);
				skipToClasses[i].addEventListener('touchend', _handlers2.default.skipTo);
			} else {
				skipToClasses[i].removeEventListener('click', _handlers2.default.skipTo);
				skipToClasses[i].addEventListener('click', _handlers2.default.skipTo);
			}
		}
	}

	return {
		initializeEvents: initializeEvents
	};
}(); /*
     	Import the necessary classes and config to use
     	with the events.
     */
exports.default = AmplitudeEvents;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _visual = __webpack_require__(2);

var _visual2 = _interopRequireDefault(_visual);

var _core = __webpack_require__(3);

var _core2 = _interopRequireDefault(_core);

var _helpers = __webpack_require__(1);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These methods help handle interactions whether it's computation or shuffling
 * songs.
 *
 * @module events/AmplitudeEventsHelpers
 */


/**
 * Imports the Amplitude Core module
 * @module core/AmplitudeCore
 */
/**
 * Imports the config module
 * @module config
 */
var AmplitudeEventsHelpers = function () {
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
		var currentSeconds = (Math.floor(_config2.default.active_song.currentTime % 60) < 10 ? '0' : '') + Math.floor(_config2.default.active_song.currentTime % 60);

		/*
  	Computes the current minutes for the song.
  */
		var currentMinutes = Math.floor(_config2.default.active_song.currentTime / 60);

		/*
  	Initialize the current hours variable.
  */
		var currentHours = '00';

		/*
  	If the current minutes is less than 10, we add a leading 0.
  */
		if (currentMinutes < 10) {
			currentMinutes = '0' + currentMinutes;
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
				currentMinutes = '0' + currentMinutes;
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
		var songDurationSeconds = (Math.floor(_config2.default.active_song.duration % 60) < 10 ? '0' : '') + Math.floor(_config2.default.active_song.duration % 60);

		/*
  	Computes the duration of the song's minutes.
  */
		var songDurationMinutes = Math.floor(_config2.default.active_song.duration / 60);

		/*
  	Initialize the hours duration variable.
  */
		var songDurationHours = '0';

		/*
  	If the song duration minutes is less than 10, we add a leading 0.
  */
		if (songDurationMinutes < 10) {
			songDurationMinutes = '0' + songDurationMinutes;
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
				songDurationMinutes = '0' + songDurationMinutes;
			}
		}

		/*
  	Build a clean song duration object and send back the appropriate information.
  */
		songDuration.seconds = songDurationSeconds;
		songDuration.minutes = songDurationMinutes;
		songDuration.hours = songDurationHours;

		return songDuration;
	}

	/**
  * Computes the song completion percentage.
  *
  * @access public
  */
	function computeSongCompletionPercentage() {
		return _config2.default.active_song.currentTime / _config2.default.active_song.duration * 100;
	}

	/**
  * Sets the current song's playback speed
  *
  * @access public
  * @param {number} speed 	- The float with a base of 1 representing the speed
  *
  */
	function setPlaybackSpeed(speed) {
		_core2.default.setPlaybackSpeed(speed);
	}

	/**
  * Sets the state of the repeat for the current song.
  *
  * @access public
  * @param {boolean} repeat - A boolean representing whether the repeat should be on or off
  * @param {string} playlist - The key of the playlist for repeating
  */
	function setRepeat(repeat, playlist) {
		/*
    If the playlist is null, then we are dealing with the global
    repeat status.
  */
		if (playlist == null) {
			/*
   	Set the global repeat to be toggled
   */
			_config2.default.repeat = repeat;

			/*
   	Visually sync repeat
   */
			_visual2.default.syncRepeat();
		} else {
			/*
   	Set the playlist repeat to be toggled.
   */
			_config2.default.repeat_statuses[playlist] = repeat;

			/*
   	Visually sync playlist repeat
   */
			_visual2.default.syncRepeatPlaylist(playlist);
		}

		/** When song ends and in playlis mode and done with playlist check repeat  **/
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

	/**
  * Sets the main play pause buttons to the current state of the song.
  *
  * @access public
  */
	function setMainPlayPause() {
		/*
  	Determines what action we should take based on the
  	state of the song.
  */
		if (_config2.default.active_song.paused) {
			/*
   	The song was paused so we sync visually for the song
   	that is playing and we play the song.
   */
			_visual2.default.syncMainPlayPause('playing');

			/*
   	If there is an active playlist, then
   	we need to sync that playlist's play pause
   	button to the state of playing.
   */
			_visual2.default.syncPlaylistPlayPause(_config2.default.active_playlist, 'playing');

			/*
   	Sync the song play pause buttons
   */
			_visual2.default.syncSongPlayPause(_config2.default.active_playlist, _config2.default.active_index, 'playing');

			/*
   	Play the song
   */
			_core2.default.play();
		} else {
			/*
   	The song was playing so we sync visually for the song
   	to be paused and we pause the song.
   */
			_visual2.default.syncMainPlayPause('paused');

			/*
   	If there is an active playlist, then
   	we need to sync that playlist's play pause
   	button to the state of paused.
   */
			_visual2.default.syncPlaylistPlayPause(_config2.default.active_playlist, 'paused');

			/*
   	Sync the song play pause buttons
   */
			_visual2.default.syncSongPlayPause(_config2.default.active_playlist, _config2.default.active_index, 'paused');

			/*
   	Pause the song
   */
			_core2.default.pause();
		}
	}

	/**
  * Sets the playlist main play pause buttons to the current state of the song.
  *
  * @access public
  * @param {string} playlist The playlist the main play pause button controls
  */
	function setPlaylistPlayPause(playlist) {
		/*
  	The only thing that can change when you click a playlist
  	play pause is the playlist. Main play pauses have no change
  	in song, song play pauses can change playlist and song.
  */
		if (_helpers2.default.checkNewPlaylist(playlist)) {
			_helpers2.default.setActivePlaylist(playlist);

			/*
   	Play first song in the playlist since we just
   	switched playlists, we start from the first song.
   		If the user has shuffle on for the playlist, then
   	we go from the first song in the shuffle playlist array.
   */
			if (_config2.default.shuffled_statuses[playlist]) {
				_helpers2.default.changeSong(_config2.default.shuffled_playlists[playlist][0].original_index);
			} else {
				_helpers2.default.changeSong(_config2.default.playlists[playlist][0]);
			}
		}

		/*
  	Determines what action we should take based on the
  	state of the song.
  */
		if (_config2.default.active_song.paused) {
			/*
   	The song was paused so we sync visually for the song
   	that is playing and we play the song.
   */
			_visual2.default.syncMainPlayPause('playing');

			/*
   	If there is an active playlist, then
   	we need to sync that playlist's play pause
   	button to the state of playing.
   */
			_visual2.default.syncPlaylistPlayPause(_config2.default.active_playlist, 'playing');

			/*
   	Sync the song play pause buttons
   */
			_visual2.default.syncSongPlayPause(_config2.default.active_playlist, _config2.default.active_index, 'playing');

			/*
   	Play the song
   */
			_core2.default.play();
		} else {
			/*
   	The song was playing so we sync visually for the song
   	to be paused and we pause the song.
   */
			_visual2.default.syncMainPlayPause('paused');

			/*
   	If there is an active playlist, then
   	we need to sync that playlist's play pause
   	button to the state of paused.
   */
			_visual2.default.syncPlaylistPlayPause(_config2.default.active_playlist, 'paused');

			/*
   	Sync the song play pause buttons
   */
			_visual2.default.syncSongPlayPause(_config2.default.active_playlist, _config2.default.active_index, 'paused');

			/*
   	Pause the song
   */
			_core2.default.pause();
		}
	}

	/**
  * Sets the song play pause buttons to the current state of the song.
  *
  * @access public
  * @param {string} playlist The playlist the song is a part of
  * @param {number} songIndex The index of the song being played/paused
  *
  */
	function setSongPlayPause(playlist, songIndex) {
		/*
  	There can be multiple playlists on the page and there can be
  	multiple songs on the page AND there can be songs in multiple
  	playlists, so we have some checking to do.
  */

		/*
  	Check to see if the playlist has changed. If it has,
  	set the active playlist.
  */
		if (_helpers2.default.checkNewPlaylist(playlist)) {
			_helpers2.default.setActivePlaylist(playlist);

			/*
   	If there's a new playlist then we reset the
   	song since the song could be in 2 playlists,
   	but the user selects another playlist.
   */
			_helpers2.default.changeSong(songIndex);
		}

		/*
  	Check to see if the song has changed. If it has,
  	set the active song. If it was in a playlist, the
  	song wouldn't change here, since we already set the
  	song when we checked for a playlist.
  */
		if (_helpers2.default.checkNewSong(songIndex)) {
			/*
   	The song selected is different, so we change the
   	song.
   */
			_helpers2.default.changeSong(songIndex);
		}

		/*
  	Determines what action we should take based on the
  	state of the song.
  */
		if (_config2.default.active_song.paused) {
			/*
   	The song was paused so we sync visually for the song
   	that is playing and we play the song.
   */
			_visual2.default.syncMainPlayPause('playing');

			/*
   	If there is an active playlist, then
   	we need to sync that playlist's play pause
   	button to the state of playing.
   */
			_visual2.default.syncPlaylistPlayPause(_config2.default.active_playlist, 'playing');

			/*
   	Sync the song play pause buttons
   */
			_visual2.default.syncSongPlayPause(_config2.default.active_playlist, _config2.default.active_index, 'playing');

			/*
   	Play the song
   */
			_core2.default.play();
		} else {
			/*
   	The song was playing so we sync visually for the song
   	to be paused and we pause the song.
   */
			_visual2.default.syncMainPlayPause('paused');

			/*
   	If there is an active playlist, then
   	we need to sync that playlist's play pause
   	button to the state of paused.
   */
			_visual2.default.syncPlaylistPlayPause(_config2.default.active_playlist, 'paused');

			/*
   	Sync the song play pause buttons
   */
			_visual2.default.syncSongPlayPause(_config2.default.active_playlist, _config2.default.active_index, 'paused');

			/*
   	Pause the song
   */
			_core2.default.pause();
		}
	}

	/**
  * Sets the shuffle state for a playlist
  *
  * @access public
  * @param {string} playlist - The playlist being shuffled
  */
	function setShuffle(playlist) {
		/*
  	If the playlist is null, then we are dealing with the global
  	shuffle status.
  */
		if (playlist == null) {
			/*
   	If shuffle is on, we toggle it off. If shuffle is off, we
   	toggle on.
   */
			if (_config2.default.shuffle_on) {
				_config2.default.shuffle_on = false;
				_config2.default.shuffle_list = {};
			} else {
				_config2.default.shuffle_on = true;
				_helpers2.default.shuffleSongs();
			}

			/*
   	Visually sync the shuffle statuses
   */
			_visual2.default.syncShuffle(_config2.default.shuffle_on);
		} else {
			/*
   	If the playlist shuffled is on, we toggle it off. If the
   	playlist shuffled is off, we toggle it on.
   */
			if (_config2.default.shuffled_statuses[playlist]) {
				_config2.default.shuffled_statuses[playlist] = false;
				_config2.default.shuffled_playlists[playlist] = [];
			} else {
				_config2.default.shuffled_statuses[playlist] = true;
				_helpers2.default.shufflePlaylistSongs(playlist);
			}

			/*
   	Visually sync the playlist shuffle statuses.
   */
			_visual2.default.syncPlaylistShuffle(_config2.default.shuffled_statuses[playlist], playlist);
		}
	}

	/**
  * Sets the next song when next is clicked
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
		var nextIndex = 0;
		/*
    Ensure we don't loop in the playlist if config.repeat is not true
  */
		var endOfList = false;

		if (_config2.default.repeat_song) {
			/*
   	If the playlist is shuffled, get the now playing index.
   */
			if (_config2.default.shuffle_on) {
				nextIndex = _config2.default.shuffle_active_index;
			} else {
				nextIndex = _config2.default.active_index;
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
				if (parseInt(_config2.default.shuffle_active_index) + 1 < _config2.default.shuffle_list.length) {
					_config2.default.shuffle_active_index = parseInt(_config2.default.shuffle_active_index) + 1;

					/*
     	Set the next index to be the index of the song in the shuffle list.
     */
					nextIndex = _config2.default.shuffle_list[parseInt(_config2.default.shuffle_active_index)].original_index;
				} else {
					_config2.default.shuffle_active_index = 0;
					nextIndex = 0;
					endOfList = true;
				}
			} else {
				/*
    	If the active index + 1 is less than the length of the songs, then
    	we use the next song otherwise we go to the beginning of the
    	song list.
    */
				if (parseInt(_config2.default.active_index) + 1 < _config2.default.songs.length) {
					_config2.default.active_index = parseInt(_config2.default.active_index) + 1;
				} else {
					_config2.default.active_index = 0;
					endOfList = true;
				}

				/*
    	Sets the next index.
    */
				nextIndex = _config2.default.active_index;
			}
		}

		/*
  	Stops the active song.
  */
		_core2.default.stop();

		/*
  	Change the song to the index we need.
  */
		_helpers2.default.changeSong(nextIndex);

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
  	Syncs the main play pause button, playlist play pause button and
  	song play pause.
  */
		_visual2.default.syncMainPlayPause();
		_visual2.default.syncSongPlayPause(null, nextIndex);

		/*
  	Call after next callback
  */
		_helpers2.default.runCallback('after_next');

		/*
  	If we are repeating the song, call the song repeated callback
  */
		if (_config2.default.repeat_song) {
			_helpers2.default.runCallback('song_repeated');
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
		var nextIndex = 0;

		/*
    Used to determine whether the playlist looped over
    If it did, only play if repeat is allowed, end otherwise
    @TODO: Different settings for song loop, in-playlist loop and global loop
  */
		var endOfList = false;

		/*
  	If we are repeating the song, then we just start the song over.
  */

		if (_config2.default.repeat_song) {
			/*
   	If the playlist is shuffled, get the now playing index.
   */
			if (_config2.default.shuffled_statuses[playlist]) {
				nextIndex = _config2.default.shuffled_playlists[playlist][_config2.default.shuffled_active_indexes[playlist]].original_index;
			} else {
				nextIndex = _config2.default.active_index;
			}
		} else {
			/*
   	If the playlist is shuffled we get the next index of the playlist.
   */
			if (_config2.default.shuffled_statuses[playlist]) {
				/*
    	Gets the shuffled playlist's active song index.
    */
				var shuffledPlaylistActiveSongIndex = parseInt(_config2.default.shuffled_active_indexes[playlist]);

				/*
    	If the index + 1 is less than the length of the playlist, we increment
    	the next index otherwise we take the first index of 0.
    */
				if (shuffledPlaylistActiveSongIndex + 1 < _config2.default.shuffled_playlists[playlist].length) {
					/*
     	Set the shuffled playlist active song index.
     */
					_config2.default.shuffled_active_indexes[playlist] = shuffledPlaylistActiveSongIndex + 1;
					/*
     	Get the index of the song that we will be switching to.
     */
					nextIndex = _config2.default.shuffled_playlists[playlist][_config2.default.shuffled_active_indexes[playlist]].original_index;
				} else {
					/*
     	Sets the active shuffled playlist active index to 0 and gets the original index of
     	the song at the shuffled index of 0.
     */
					_config2.default.shuffled_active_indexes[playlist] = 0;
					nextIndex = _config2.default.shuffled_playlists[playlist][0].original_index;
					endOfList = true;
				}
			} else {
				/*
    	Gets the index of the active song within the scope
    	of the playlist.
    */
				var playlistActiveSongIndex = _config2.default.playlists[playlist].indexOf(parseInt(_config2.default.active_index));

				/*
    	Checks to see if the next index is still less than the length of the playlist.
    	If it is, use the next index othwerwise get the first song in the playlist.
    */
				if (playlistActiveSongIndex + 1 < _config2.default.playlists[playlist].length) {
					_config2.default.active_index = parseInt(_config2.default.playlists[playlist][playlistActiveSongIndex + 1]);
				} else {
					_config2.default.active_index = parseInt(_config2.default.playlists[playlist][0]);
					endOfList = true;
				}

				/*
    	Sets the next inex to the active index in the config.
    */
				nextIndex = _config2.default.active_index;
			}
		}

		/*
  	Stops the active song playing.
  */

		_core2.default.stop();

		/*
  	Changes the song to the next song in the playlist.
  */
		_helpers2.default.changeSong(nextIndex);

		/*
  	If it's the end of the song in the playlist, and repeat for
  	the playlist is not on, do nothing.
  */
		if (endOfList && !_config2.default.repeat_statuses[playlist]) {} else {
			/*
   	If the song has ended and repeat is on, play the song.
   */
			if (!(songEnded && !_config2.default.repeat_statuses[playlist] && endOfList)) {
				_core2.default.play();
			}
		}

		_helpers2.default.setActivePlaylist(playlist);

		/*
  	Syncs the main play pause button, playlist play pause button and
  	song play pause.
  */
		_visual2.default.syncMainPlayPause();
		_visual2.default.syncPlaylistPlayPause(playlist);
		_visual2.default.syncSongPlayPause(playlist, nextIndex);

		/*
  	Call after next callback
  */
		_helpers2.default.runCallback('after_next');

		/*
  	If we are repeating the song, call the song repeated callback
  */
		if (_config2.default.repeat_song) {
			_helpers2.default.runCallback('song_repeated');
		}
	}

	/**
  * Sets the previous song
  * @access public
  *
 /*--------------------------------------------------------------------------
 	Sets the previous song
 --------------------------------------------------------------------------*/
	function setPrev() {
		/*
  	Initializes the prev index variable. This will be the
  	index of the song that is next.
  */
		var prevIndex = 0;

		/*
  	If the shuffle is on for the individual songs, we get the previous
  	song.
  */
		if (_config2.default.shuffle_on) {
			/*
   	If the previous index is greater than or equal to 0, we use the active
   	index - 1.
   */
			if (parseInt(_config2.default.shuffle_active_index) - 1 >= 0) {
				/*
    	Sets the new active to be 1 less than the current active index.
    */
				_config2.default.shuffle_active_index = parseInt(_config2.default.shuffle_active_index) - 1;

				/*
    	Gets the index of the song in the song array for the new index.
    */
				prevIndex = _config2.default.shuffle_list[parseInt(_config2.default.shuffle_active_index)].original_index;
			} else {
				/*
    	Set the active index and previous index.
    */
				_config2.default.shuffle_active_index = _config2.default.shuffle_list.length - 1;
				prevIndex = _config2.default.shuffle_list[parseInt(_config2.default.shuffle_list.length) - 1].original_index;
			}
		} else {
			/*
   	If the active index - 1 is greater than or equal to 0, we subtract 1 from the
   	active index otherwise we set the active index to the end of the songs array index.
   */
			if (parseInt(_config2.default.active_index) - 1 >= 0) {
				_config2.default.active_index = parseInt(_config2.default.active_index) - 1;
			} else {
				_config2.default.active_index = _config2.default.songs.length - 1;
			}

			/*
   	Set the previous index.
   */
			prevIndex = _config2.default.active_index;
		}

		/*
  	Stops the active song.
  */
		_core2.default.stop();

		/*
  	Change the song to the index we need.
  */
		_helpers2.default.changeSong(prevIndex);

		/*
  	Play the next song.
  */
		_core2.default.play();

		/*
  	Sync the play/pause buttons to the current state of the player.
  */
		_visual2.default.syncMainPlayPause('playing');
		_visual2.default.syncSongPlayPause(null, prevIndex, 'playing');

		/*
  	Call after prev callback
  */
		_helpers2.default.runCallback('after_prev');
	}

	/**
  * Sets the previous song in a playlist
  *
  * @access public
  * @param {string} playlist 	- The playlist we are setting the previous for.
  */
	function setPrevPlaylist(playlist) {
		/*
  	Initializes the prev index variable. This will be the
  	index of the song that is next.
  */
		var prevIndex = 0;

		/*
  	If the shuffle is on for the playlist, we get the previous
  	song.
  */
		if (_config2.default.shuffled_statuses[playlist]) {
			/*
   	Gets the active song index for the shuffled playlist
   */
			var shuffledPlaylistActiveSongIndex = parseInt(_config2.default.shuffled_active_indexes[playlist]);

			/*
   	If the shuffled song active index is greater than or equal to 0,
   	we use the active index - 1.
   */
			if (shuffledPlaylistActiveSongIndex - 1 >= 0) {
				/*
    	Sets the active index to the active song index - 1
    */
				_config2.default.shuffled_active_indexes[playlist] = shuffledPlaylistActiveSongIndex - 1;

				/*
    	Gets the index of the song in the song array for the new index.
    */
				prevIndex = _config2.default.shuffled_playlists[playlist][_config2.default.shuffled_active_indexes[playlist]].original_index;
			} else {
				/*
    	Set the active index and previous index.
    */
				_config2.default.shuffled_active_indexes[playlist] = _config2.default.shuffled_playlists[playlist].length - 1;
				prevIndex = _config2.default.shuffled_playlists[playlist][_config2.default.shuffled_playlists[playlist].length - 1].original_index;
			}
		} else {
			/*
   	Gets the active song index for the playlist
   */
			var playlistActiveSongIndex = _config2.default.playlists[playlist].indexOf(parseInt(_config2.default.active_index));

			/*
   	If the active song index in the playlist - 1 is greater than
   	or equal to 0, then we use the active song index - 1.
   */
			if (playlistActiveSongIndex - 1 >= 0) {
				_config2.default.active_index = parseInt(_config2.default.playlists[playlist][playlistActiveSongIndex - 1]);
			} else {
				_config2.default.active_index = parseInt(_config2.default.playlists[playlist][_config2.default.playlists[playlist].length - 1]);
			}

			/*
   	Set the previous index to the active index for use later.
   */
			prevIndex = _config2.default.active_index;
		}

		/*
  	Stops the active song.
  */
		_core2.default.stop();

		/*
  	Changes the song to the prev song in the playlist.
  */
		_helpers2.default.changeSong(prevIndex);
		_helpers2.default.setActivePlaylist(playlist);

		/*
  	Plays the song
  */
		_core2.default.play();

		/*
  	Syncs the main play pause button, playlist play pause button and
  	song play pause.
  */
		_visual2.default.syncMainPlayPause('playing');
		_visual2.default.syncPlaylistPlayPause(playlist, 'playing');
		_visual2.default.syncSongPlayPause(playlist, prevIndex, 'playing');

		/*
  	Call after prev callback
  */
		_helpers2.default.runCallback('after_prev');
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
				case 'play_pause':
					setSongPlayPause(_config2.default.active_playlist, _config2.default.active_index);
					break;

				/*
    	Fires a next event.
    */
				case 'next':
					/*
     	Check to see if the current state of the player
     	is in playlist mode or not playlist mode.
     */
					if (_config2.default.active_playlist == '' || _config2.default.active_playlist == null) {
						setNext();
					} else {
						setNextPlaylist(_config2.default.active_playlist);
					}
					break;

				/*
    	Fires a previous event.
    */
				case 'prev':
					/*
     	Check to see if the current playlist has been set
     	or null and set the previous song.
     */
					if (_config2.default.active_playlist == '' || _config2.default.active_playlist == null) {
						AmplitudeEventsHelpers.setPrev();
					} else {
						AmplitudeEventsHelpers.setPrevPlaylist(_config2.default.active_playlist);
					}
					break;

				/*
    	Fires a stop event.
    */
				case 'stop':
					/*
     	Sets all of the play/pause buttons to pause
     */
					_visual2.default.setPlayPauseButtonsToPause();

					/*
     	Stops the active song.
     */
					_core2.default.stop();
					break;

				/*
    	Fires a shuffle event.
    */
				case 'shuffle':
					/*
     	Check to see if the current playlist has been set
     	or null and set the previous song.
     */
					if (_config2.default.active_playlist == '' || _config2.default.active_playlist == null) {
						AmplitudesEventHelpers.setShuffle(null);
					} else {
						AmplitudeEvenstHelpers.setShuffle(_config2.default.active_playlist);
					}
					break;

				/*
    	Fires a repeat event.
    */
				case 'repeat':
					/*
     	Sets repeat to the opposite of what it was set to
     */
					AmplitudeEventsHelpers.setRepeat(!_config2.default.repeat);

					/*
     	Visually sync repeat
     */
					_visual2.default.syncRepeat();
					break;
			}
		}
	}

	/*
 	Return the publically scoped functions
 */
	return {
		computeCurrentTimes: computeCurrentTimes,
		computeSongDuration: computeSongDuration,
		computeSongCompletionPercentage: computeSongCompletionPercentage,
		setPlaybackSpeed: setPlaybackSpeed,
		setRepeat: setRepeat,
		setRepeatSong: setRepeatSong,
		setMainPlayPause: setMainPlayPause,
		setPlaylistPlayPause: setPlaylistPlayPause,
		setSongPlayPause: setSongPlayPause,
		setShuffle: setShuffle,
		setNext: setNext,
		setNextPlaylist: setNextPlaylist,
		setPrev: setPrev,
		setPrevPlaylist: setPrevPlaylist,
		runKeyEvent: runKeyEvent
	};
}();

/**
 * Imports the Amplitude Core Helpers module
 * @module core/AmplitudeCoreHelpers
 */


/**
 * Imports the Amplitude Visual Sync module
 * @module visual/AmplitudeVisualSync
 */
exports.default = AmplitudeEventsHelpers;
module.exports = exports['default'];

/***/ }),
/* 6 */
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
 * @module core/AmplitudeCore
 */


/**
 * AmplitudeJS Core Helpers
 * @module core/AmplitudeHelpers
 */


/**
 * AmplitudeJS Events
 * @module events/AmplitudeEvents
 */


/**
 * AmplitudeJS Soundcloud
 * @module soundcloud/AmplitudeSoundcloud
 */


/**
 * AmplitudeJS Visual Sync
 * @module visual/AmplitudeVisualSync
*/


var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _core = __webpack_require__(3);

var _core2 = _interopRequireDefault(_core);

var _helpers = __webpack_require__(1);

var _helpers2 = _interopRequireDefault(_helpers);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _soundcloud = __webpack_require__(9);

var _soundcloud2 = _interopRequireDefault(_soundcloud);

var _visual = __webpack_require__(2);

var _visual2 = _interopRequireDefault(_visual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AmplitudeJS Initializer Module. Helps with the handling of all of the
 * initialization for AmplitudeJS.
 *
 * @module init/AmplitudeInitializer
 */
var AmplitudeInitializer = function () {

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
		_helpers2.default.resetConfig();

		/*
  	Initialize event handlers on init. This will clear any old
  	event handlers on the amplitude element and re-bind what is
  	necessary.
  */
		_events2.default.initializeEvents();

		/*
  	Initializes debugging right away so we can use it for the rest
  	of the configuration.
  */
		_config2.default.debug = userConfig.debug != undefined ? userConfig.debug : false;

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
				_helpers2.default.writeDebugMessage('Please add some songs, to your songs object!');
			}
		} else {
			_helpers2.default.writeDebugMessage('Please provide a songs object for AmplitudeJS to run!');
		}

		/**
   * Initializes the audio context. In this method it checks to see if the
   * user wants to use visualizations or not before proceeding.
   * @todo MAKE HANDLED BY AMPLITUDE FX.
   */
		//privateHelpInitializeAudioContext();

		/*
  	Checks if the user has any playlists defined. If they do
  	we have to initialize the functionality for the playlists.
  */
		if (userConfig.playlists && countPlaylists(userConfig.playlists) > 0) {
			/*
   	Copy the playlists over to Amplitude
   */
			_config2.default.playlists = userConfig.playlists;

			/*
   	Initialize default live settings
   */
			initializeDefaultLiveSettings();

			/*
   	Check to see if the user has valid song indexes in their playlist.
   */
			checkValidSongsInPlaylists();

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
   	Initializes the active shuffled indexes for shuffled playlists.
   */
			initializePlaylistShuffleIndexes();

			/*
   	Initializes the first song in the playlist
   */
			initializeFirstSongInPlaylistMetaData();
		}

		/*
  	When the preliminary config is ready, we are ready to proceed.
  */
		if (ready) {
			/*
   	Copies over the soundcloud information to the global config
   	which will determine where we go from there.
   */
			_config2.default.soundcloud_client = userConfig.soundcloud_client != undefined ? userConfig.soundcloud_client : '';

			/*
   	Checks if we want to use the art loaded from soundcloud.
   */
			_config2.default.soundcloud_use_art = userConfig.soundcloud_use_art != undefined ? userConfig.soundcloud_use_art : '';

			/*
   	If the user provides a soundcloud client then we assume that
   	there are URLs in their songs that will reference SoundcCloud.
   	We then copy over the user config they provided to the
   	temp_user_config so we don't mess up the global or their configs
   	and load the soundcloud information.
   */
			var tempUserConfig = {};

			if (_config2.default.soundcloud_client != '') {
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
		_helpers2.default.writeDebugMessage('Initialized With: ');
		_helpers2.default.writeDebugMessage(_config2.default);
	}

	/**
  * Rebinds all of the elements in the display.
  *
  * Public Accessor: Amplitude.rebindDisplay()
  * @access public
  */
	function rebindDisplay() {
		_events2.default.initializeEvents();
		_visual2.default.displaySongMetadata();
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
  	Check to see if the user entered a start song
  */
		if (userConfig.start_song != undefined) {
			/*
   	Ensure what has been entered is an integer.
   */
			if (_helpers2.default.isInt(userConfig.start_song)) {
				_helpers2.default.changeSong(userConfig.start_song);
			} else {
				_helpers2.default.writeDebugMessage("You must enter an integer index for the start song.");
			}
		} else {
			_helpers2.default.changeSong(0);
		}

		/*
  	Initialize a sh
  */
		if (userConfig.shuffle_on != undefined && userConfig.shuffle_on) {
			_config2.default.shuffle_on = true;
			_helpers2.default.shuffleSongs();

			/*
   	Visually sync the shuffle statuses
   */
			_visual2.default.syncShuffle(_config2.default.shuffle_on);

			_helpers2.default.changeSong(_config2.default.shuffle_list[0].original_index);
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
		_config2.default.active_song.preload = userConfig.preload != undefined ? userConfig.preload : "auto";

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
  	Since the user can define a start volume, we want our volume
  	sliders to sync with the user defined start value.
  */
		_visual2.default.syncVolumeSliders();

		/*
  	If the user defines default album art, this image will display if the active
  	song doesn't have album art defined.
  */
		if (userConfig.default_album_art != undefined) {
			_config2.default.default_album_art = userConfig.default_album_art;
		} else {
			_config2.default.default_album_art = '';
		}

		/*
  	Syncs all of the visual time elements to 00.
  */
		_visual2.default.resetTimes();

		/*
  	Sets all of the play pause buttons to pause.
  */
		_visual2.default.setPlayPauseButtonsToPause();

		/*
  	Sets the meta data for the songs automatically.
  */
		_visual2.default.syncSongsMetaData();

		/*
  	If the user has autoplay enabled, then begin playing the song. Everything should
  	be configured for this to be ready to play.
  */
		if (userConfig.autoplay) {
			/*
   	If the user hasn't set a starting playlist, set it to null otherwise initialize to the
   	starting playlist selected by the user.
   */
			if (userConfig.starting_playlist == '') {
				_config2.default.active_playlist = null;
			} else {
				_config2.default.active_playlist = userConfig.starting_playlist;
			}

			/*
   	Sync the main and song play pause buttons.
   */
			_visual2.default.syncMainPlayPause('playing');
			_visual2.default.syncSongPlayPause(_config2.default.active_playlist, 0, 'playing');

			/*
   	Start playing the song
   */
			_core2.default.play();
		}

		/*
  	If the user has selected a starting playlist, we need to set the starting playlist
  	and sync the visuals
  */
		if (userConfig.starting_playlist != undefined && userConfig.starting_playlist != '') {
			/*
   	Set the active playlist to the starting playlist by the user
   */
			_config2.default.active_playlist = userConfig.starting_playlist;

			/*
   	Check if the user defined a song to start with in the playlist.
   */
			if (userConfig.starting_playlist_song != undefined && userConfig.starting_playlist_song != '') {
				/*
    	Ensure the song is a valid index.
    */
				if (_typeof(userConfig.playlists[userConfig.starting_playlist][parseInt(userConfig.starting_playlist_song)]) != undefined) {
					/*
     	Set the player to the song defined by the user.
     */
					_helpers2.default.changeSong(userConfig.playlists[userConfig.starting_playlist][parseInt(userConfig.starting_playlist_song)]);
				} else {
					/*
     	Set the player to the first song in the playlist
     */
					_helpers2.default.changeSong(userConfig.playlists[userConfig.starting_playlist][0]);
					/*
     	Debug that the song index doesn't exist
     */
					_helpers2.default.writeDebugMessage('The index of ' + userConfig.starting_playlist_song + ' does not exist in the playlist ' + userConfig.starting_playlist);
				}
			} else {
				/*
    	Set the player to the first song in the playlist
    */
				_helpers2.default.changeSong(userConfig.playlists[userConfig.starting_playlist][0]);
			}

			/*
   	Sync the main and song play pause buttons.
   */
			_visual2.default.syncMainPlayPause('paused');
			_visual2.default.syncSongPlayPause(_config2.default.active_playlist, 0, 'paused');
		}

		/*
  	Run after init callback
  */
		_helpers2.default.runCallback('after_init');
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
		_helpers2.default.writeDebugMessage('You have ' + size + ' playlist(s) in your config');

		/*
  	Return the number of playlists in the config.
  */
		return size;
	}

	/**
 * Ensures the indexes in the playlists are valid indexes. The song has
 * to exist in the Amplitude config to be played correctly.
 *
 * @access private
 */
	function checkValidSongsInPlaylists() {
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
						/*
      	Check to see if the index for the song in the playlist
      	exists in the songs config.
      */
						if (!_config2.default.songs[_config2.default.playlists[key].songs[i]]) {
							_helpers2.default.writeDebugMessage('The song index: ' + _config2.default.playlists[key].songs[i] + ' in playlist with key: ' + key + ' is not defined in your songs array!');
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
			_config2.default.shuffled_statuses[key] = false;
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
			_config2.default.repeat_statuses[key] = false;
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
			_config2.default.shuffled_playlists[key] = [];
		}
	}

	/**
  * Initializes the shuffled playlist indexes array. These will be set for
  * playlists that are shuffled and contain the active shuffled index.
  *
  * @access private
  */
	function initializePlaylistShuffleIndexes() {
		/*
  	Iterates over all of the playlists adding a key
  	to the shuffled_active_indexes array that contains
  	the active shuffled index.
  */
		for (var key in _config2.default.playlists) {
			_config2.default.shuffled_active_indexes[key] = 0;
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
			_visual2.default.setFirstSongInPlaylist(_config2.default.songs[_config2.default.playlists[key][0]], key);
		}
	}

	/**
  * Intializes the default live settings for all of the songs.
  *
  * @access priavet
  */
	function initializeDefaultLiveSettings() {
		for (var i = 0; i < _config2.default.songs.length; i++) {
			if (_config2.default.songs[i].live == undefined) {
				_config2.default.songs[i].live = false;
			}
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

exports.default = AmplitudeInitializer;
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _helpers = __webpack_require__(5);

var _helpers2 = _interopRequireDefault(_helpers);

var _visual = __webpack_require__(2);

var _visual2 = _interopRequireDefault(_visual);

var _core = __webpack_require__(3);

var _core2 = _interopRequireDefault(_core);

var _helpers3 = __webpack_require__(1);

var _helpers4 = _interopRequireDefault(_helpers3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These functions handle the events that we bound to each element and
 * prepare for a function to be called. These kind of act like filters/middleware.
 *
 * @module events/AmplitudeHandlers
 */


/**
 * Imports the core module of Amplitude which handles the basic functions
 * @module core/AmplitudeCore
 */


/**
 * Imports the helpers for the event handlers.
 * @module events/AmplitudeEventsHelpers
 */
exports.default = {
	/**
  * When the time updates on the active song, we sync the current time displays
  *
  * HANDLER FOR: timeupdate
  *
  * @access public
  */
	updateTime: function updateTime() {
		/*
  	Help from: http://jsbin.com/badimipi/1/edit?html,js,output
  */
		if (_config2.default.active_song.buffered.length - 1 >= 0) {
			var bufferedEnd = _config2.default.active_song.buffered.end(_config2.default.active_song.buffered.length - 1);
			var duration = _config2.default.active_song.duration;

			_config2.default.buffered = bufferedEnd / duration * 100;
		}

		/*
  	Sync the buffered progress bars.
  */
		_visual2.default.syncBufferedProgressBars();

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
			var currentTime = _helpers2.default.computeCurrentTimes();

			/*
   	Compute the song completion percentage
   */
			var songCompletionPercentage = _helpers2.default.computeSongCompletionPercentage();

			/*
   	Computes the song duration
   */
			var songDuration = _helpers2.default.computeSongDuration();

			/*
   	Sync the current time elements with the current
   	location of the song and the song duration elements with
   	the duration of the song.
   */
			_visual2.default.syncCurrentTime(currentTime, songCompletionPercentage);
			_visual2.default.syncSongDuration(currentTime, songDuration);

			/*
   	Runs the callback defined for the time update.
   */
			_helpers4.default.runCallback('time_update');
		}
	},

	/**
  * When the keydown event is fired, we determine which function should be run
  * based on what was passed in.
  *
  * HANDLER FOR: keydown
  *
  * @access public
  */
	keydown: function keydown(event) {
		_helpers2.default.runKeyEvent(event.which);
	},

	/**
  * When the song has ended, handles what to do next
  *
  * HANDLER FOR: ended
  *
  * @access public
  */
	songEnded: function songEnded() {
		setTimeout(function () {
			if (_config2.default.continue_next) {
				/*
    	If the active playlist is not set, we set the
    	next song that's in the songs array.
    */
				if (_config2.default.active_playlist == '' || _config2.default.active_playlist == null) {
					_helpers2.default.setNext(true);
				} else {
					/*
     	Set the next song in the playlist
     */
					_helpers2.default.setNextPlaylist(_config2.default.active_playlist, true);
				}
			} else {
				if (!_config2.default.is_touch_moving) {
					/*
     	Sets all of the play/pause buttons to pause
     */
					_visual2.default.setPlayPauseButtonsToPause();

					/*
     	Stops the active song.
     */
					_core2.default.stop();
				}
			}
		}, _config2.default.delay);
	},

	/**
  * As the song is buffered, we can display the buffered percentage in
  * a progress bar.
  *
  * HANDLER FOR: ended
  *
  * @access public
  */
	progress: function progress() {
		/*
  	Help from: http://jsbin.com/badimipi/1/edit?html,js,output
  */
		if (_config2.default.active_song.buffered.length - 1 >= 0) {
			var bufferedEnd = _config2.default.active_song.buffered.end(_config2.default.active_song.buffered.length - 1);
			var duration = _config2.default.active_song.duration;

			_config2.default.buffered = bufferedEnd / duration * 100;
		}

		/*
  	Sync the buffered progress bars.
  */
		_visual2.default.syncBufferedProgressBars();
	},

	/**
  * Handles an event on a play button in Amplitude.
  *
  * HANDLER FOR: 'amplitude-play'
  *
  * @access public
  * @TODO Finish commenting and re-structure
  */
	play: function play() {
		if (!_config2.default.is_touch_moving) {
			/*
   	Gets the attribute for song index so we can check if
   	there is a need to change the song.  In some scenarios
   	there might be multiple play classes on the page. In that
   	case it is possible the user could click a different play
   	class and change the song.
   */
			var playButtonSongIndex = this.getAttribute('amplitude-song-index');
			var playButtonPlaylistIndex = this.getAttribute('amplitude-playlist');

			if (playButtonPlaylistIndex == null && playButtonSongIndex == null) {
				_helpers2.default.setSongPlayPause(_config2.default.active_playlist, _config2.default.active_index);
			}

			/*
   	*/
			if (playButtonPlaylistIndex != null && playButtonPlaylistIndex != '') {
				if (_helpers4.default.checkNewPlaylist(playButtonPlaylistIndex)) {
					_helpers4.default.setActivePlaylist(playButtonPlaylistIndex);

					if (playButtonSongIndex != null) {
						_helpers4.default.changeSong(playButtonSongIndex);
						_helpers2.default.setPlaylistPlayPause(playButtonPlaylistIndex);
					} else {
						_helpers4.default.changeSong(_config2.default.playlists[playButtonPlaylistIndex][0]);
						_helpers2.default.setPlaylistPlayPause(playButtonPlaylistIndex);
					}
				} else {
					if (playButtonSongIndex != null) {
						_helpers4.default.changeSong(playButtonSongIndex);
						_helpers2.default.setPlaylistPlayPause(playButtonPlaylistIndex);
					} else {
						_helpers4.default.changeSong(_config2.default.active_index);
						_helpers2.default.setPlaylistPlayPause(playButtonPlaylistIndex);
					}
				}
			}

			/*
   	*/
			if ((playButtonPlaylistIndex == null || playButtonPlaylistIndex == '') && playButtonSongIndex != null && playButtonSongIndex != '') {

				if (_helpers4.default.checkNewSong(playButtonSongIndex) || _config2.default.active_playlist != playButtonPlaylistIndex) {
					_helpers4.default.changeSong(playButtonSongIndex);
				}

				_helpers2.default.setSongPlayPause(playButtonPlaylistIndex, playButtonSongIndex);
			}

			/*
   	Start the visualizations for the song.
   	AMPFX-TODO: MAKE HANDLED BY AMPLITUDE FX
   */
			//privateStartVisualization();
		}
	},

	/**
  * Handles an event on a pause button
  *
  * HANDLER FOR: 'amplitude-pause'
  *
  * @access public
  * @TODO Finish commenting and optimize
  */
	pause: function pause() {
		if (!_config2.default.is_touch_moving) {
			var pauseButtonSongIndex = this.getAttribute('amplitude-song-index');
			var pauseButtonPlaylistIndex = this.getAttribute('amplitude-playlist');

			if (pauseButtonSongIndex == null && pauseButtonPlaylistIndex == null) {
				_helpers2.default.setSongPlayPause(_config2.default.active_playlist, _config2.default.active_index);
				_core2.default.pause();
			}

			if (pauseButtonPlaylistIndex != null || pauseButtonPlaylistIndex != '' && _config2.default.active_playlist == pauseButtonPlaylistIndex) {
				/*
    	The song was playing so we sync visually for the song
    	to be paused and we pause the song.
    */
				_visual2.default.syncMainPlayPause('paused');

				/*
    	If there is an active playlist, then
    	we need to sync that playlist's play pause
    	button to the state of paused.
    */
				_visual2.default.syncPlaylistPlayPause(_config2.default.active_playlist, 'paused');

				/*
    	Sync the song play pause buttons
    */
				_visual2.default.syncSongPlayPause(_config2.default.active_playlist, _config2.default.active_index, 'paused');

				_core2.default.pause();
			}

			if ((pauseButtonPlaylistIndex == null || pauseButtonPlaylistIndex == '') && pauseButtonSongIndex == _config2.default.active_index) {
				/*
    	The song was playing so we sync visually for the song
    	to be paused and we pause the song.
    */
				_visual2.default.syncMainPlayPause('paused');

				/*
    	If there is an active playlist, then
    	we need to sync that playlist's play pause
    	button to the state of paused.
    */
				_visual2.default.syncPlaylistPlayPause(_config2.default.active_playlist, 'paused');

				/*
    	Sync the song play pause buttons
    */
				_visual2.default.syncSongPlayPause(_config2.default.active_playlist, _config2.default.active_index, 'paused');

				_core2.default.pause();
			}
		}
	},

	/**
  * Handles an event on a play/pause button
  *
  * HANDLER FOR: 'amplitude-play-pause'
  *
  * @access public
  */
	playPause: function playPause() {
		if (!_config2.default.is_touch_moving) {
			/*
   	Checks to see if the element has an attribute for amplitude-main-play-pause
   	and syncs accordingly
   */
			if (this.getAttribute('amplitude-main-play-pause') != null) {
				_helpers2.default.setMainPlayPause();

				/*
    	Syncs playlist main play pause buttons
    */
			} else if (this.getAttribute('amplitude-playlist-main-play-pause') != null) {
				var playlist = this.getAttribute('amplitude-playlist');

				_helpers2.default.setPlaylistPlayPause(playlist);

				/*
    	Syncs amplitude individual song buttons
    */
			} else {
				var _playlist = this.getAttribute('amplitude-playlist');
				var songIndex = this.getAttribute('amplitude-song-index');

				_helpers2.default.setSongPlayPause(_playlist, songIndex);
			}
		}
	},

	/**
  * Handles an event on a stop element.
  *
  * HANDLER FOR: 'amplitude-stop'
  *
  * @access public
  * @TODO: AMP-FX Before stopping, make sure that AmplitudeFX visualization is stopped as well.
  */
	stop: function stop() {
		if (!_config2.default.is_touch_moving) {
			/*
   	Sets all of the play/pause buttons to pause
   */
			_visual2.default.setPlayPauseButtonsToPause();

			/*
   	Stops the active song.
   */
			_core2.default.stop();
		}
	},

	/**
  * Handles an event for a mute element
  *
  * HANDLER FOR: 'amplitude-mute'
  *
  * @access public
  */
	mute: function mute() {
		if (!_config2.default.is_touch_moving) {
			/*
   	If the current volume in the config is 0, we set the volume to the
   	pre_mute level.  This means that the audio is already muted and
   	needs to be restored to the pre_mute level.
   		Otherwise, we set pre_mute volume to the current volume
   	and set the config volume to 0, muting the audio.
   */
			if (_config2.default.volume == 0) {
				_config2.default.active_song.muted = false;
				_config2.default.volume = _config2.default.pre_mute_volume;
				_visual2.default.syncMute(false);
			} else {
				_config2.default.active_song.muted = true;
				_config2.default.pre_mute_volume = _config2.default.volume;
				_config2.default.volume = 0;
				_visual2.default.syncMute(true);
			}

			/*
   	Calls the core function to set the volume to the computed value
   	based on the user's intent.
   */
			_core2.default.setVolume(_config2.default.volume);

			/*
   	Syncs the volume sliders so the visuals align up with the functionality.
   	If the volume is at 0, then the sliders should represent that so the user
   	has the right starting point.
   */
			_visual2.default.syncVolumeSliders(_config2.default.volume);
		}
	},

	/**
  * Handles a click on a volume up element.
  *
  * HANDLER FOR: 'amplitude-volume-up'
  *
  * @access public
  */
	volumeUp: function volumeUp() {
		if (!_config2.default.is_touch_moving) {
			/*
   	The volume range is from 0 to 1 for an audio element. We make this
   	a base of 100 for ease of working with.
   		If the new value is less than 100, we use the new calculated
   	value which gets converted to the proper unit for the audio element.
   		If the new value is greater than 100, we set the volume to 1 which
   	is the max for the audio element.
   */
			if (_config2.default.volume + _config2.default.volume_increment <= 100) {
				_config2.default.volume = _config2.default.volume + _config2.default.volume_increment;
			} else {
				_config2.default.volume = 100;
			}

			/*
   	Calls the core function to set the volume to the computed value
   	based on the user's intent.
   */
			_core2.default.setVolume(_config2.default.volume);

			/*
   	Syncs the volume sliders so the visuals align up with the functionality.
   	If the volume is at 0, then the sliders should represent that so the user
   	has the right starting point.
   */
			_visual2.default.syncVolumeSliders(_config2.default.volume);
		}
	},

	/**
  * Handles a click on a volume down element.
  *
  * HANDLER FOR: 'amplitude-volume-down'
  *
  * @access public
  */
	volumeDown: function volumeDown() {
		if (!_config2.default.is_touch_moving) {
			/*
   	The volume range is from 0 to 1 for an audio element. We make this
   	a base of 100 for ease of working with.
   		If the new value is less than 100, we use the new calculated
   	value which gets converted to the proper unit for the audio element.
   		If the new value is greater than 100, we set the volume to 1 which
   	is the max for the audio element.
   */
			if (_config2.default.volume - _config2.default.volume_increment > 0) {
				_config2.default.volume = _config2.default.volume - _config2.default.volume_increment;
			} else {
				_config2.default.volume = 0;
			}

			/*
   	Calls the core function to set the volume to the computed value
   	based on the user's intent.
   */
			_core2.default.setVolume(_config2.default.volume);

			/*
   	Syncs the volume sliders so the visuals align up with the functionality.
   	If the volume is at 0, then the sliders should represent that so the user
   	has the right starting point.
   */
			_visual2.default.syncVolumeSliders(_config2.default.volume);
		}
	},

	/**
  * Handles a change on the song slider
  *
  * HANDLER FOR: 'amplitude-song-slider'
  *
  * @access public
  */
	songSlider: function songSlider() {
		/*
  	Gets the percentage of the song we will be setting the location for.
  */
		var locationPercentage = this.value;

		/*
  	Checks to see if the element has an attribute for amplitude-main-play-pause
  	and syncs accordingly
  */
		if (this.getAttribute('amplitude-main-song-slider') != null) {
			/*
   	If the active song is not live, set the current time
   */
			if (!_config2.default.active_metadata.live) {
				var currentTime = _config2.default.active_song.duration * (locationPercentage / 100);

				if (isFinite(currentTime)) {
					_config2.default.active_song.currentTime = currentTime;
				}
			}

			_visual2.default.syncMainSliderLocation(locationPercentage);

			if (_config2.default.active_playlist != '' && _config2.default.active_playlist != null) {
				_visual2.default.syncPlaylistSliderLocation(_config2.default.active_playlist, locationPercentage);
			}
		}

		/*
  	Syncs playlist main play pause buttons
  */
		if (this.getAttribute('amplitude-playlist-song-slider') != null) {
			var playlist = this.getAttribute('amplitude-playlist');

			/*
   	We don't want to song slide a playlist that's not the
   	active placylist.
   */
			if (_config2.default.active_playlist == playlist) {
				/*
    	If the active song is not live, set the current time
    */
				if (!_config2.default.active_metadata.live) {
					_config2.default.active_song.currentTime = _config2.default.active_song.duration * (locationPercentage / 100);
				}
				_visual2.default.syncMainSliderLocation(locationPercentage);
				_visual2.default.syncPlaylistSliderLocation(playlist, locationPercentage);
			}
		}

		/*
  	Syncs amplitude individual song buttons
  */
		if (this.getAttribute('amplitude-playlist-song-slider') == null && this.getAttribute('amplitude-main-song-slider') == null) {

			var _playlist2 = this.getAttribute('amplitude-playlist');
			var songIndex = this.getAttribute('amplitude-song-index');

			if (_config2.default.active_index == songIndex) {
				/*
    	If the active song is not live, set the current time
    */
				if (!_config2.default.active_metadata.live) {
					_config2.default.active_song.currentTime = _config2.default.active_song.duration * (locationPercentage / 100);
				}

				_visual2.default.syncMainSliderLocation();

				if (_config2.default.active_playlist != '' && _config2.default.active_playlist != null && _config2.default.active_playlist == _playlist2) {
					_visual2.default.syncPlaylistSliderLocation(_playlist2, location);
				}

				_visual2.default.syncSongSliderLocation(_playlist2, songIndex, location);
			}
		}
	},

	/**
  * Handles a change on the volume slider
  *
  * HANDLER FOR: 'amplitude-volume-slider'
  *
  * @access public
  */
	volumeSlider: function volumeSlider() {
		/*
  	Calls the core function to set the volume to the computed value
  	based on the user's intent.
  */
		_core2.default.setVolume(this.value);

		/*
  	Sync the volume slider locations
  */
		_visual2.default.syncVolumeSliderLocation(this.value);
	},

	/**
  * Handles an event on the next button
  *
  * HANDLER FOR: 'amplitude-next'
  *
  * @access public
  */
	next: function next() {
		if (!_config2.default.is_touch_moving) {
			/*
   	Checks to see if the button is a playlist next button or
   	if it's a global playlist button.
   */
			if (this.getAttribute('amplitude-playlist') == '' || this.getAttribute('amplitude-playlist') == null) {

				/*
    	Check to see if the current state of the player
    	is in playlist mode or not playlist mode.
    */
				if (_config2.default.active_playlist == '' || _config2.default.active_playlist == null) {
					_helpers2.default.setNext();
				} else {
					_helpers2.default.setNextPlaylist(_config2.default.active_playlist);
				}
			} else {
				/*
    	Gets the playlist of the next button.
    */
				var playlist = this.getAttribute('amplitude-playlist');

				/*
    	Sets the next playlist
    */
				_helpers2.default.setNextPlaylist(playlist);
			}
		}
	},

	/**
  * Handles an event on the previous button
  *
  * HANDLER FOR: 'amplitude-prev'
  *
  * @access public
  */
	prev: function prev() {
		if (!_config2.default.is_touch_moving) {
			/*
   	Checks to see if the previous button is a playlist previous
   	button or if it's a global playlist button.
   */
			if (this.getAttribute('amplitude-playlist') == '' || this.getAttribute('amplitude-playlist') == null) {

				/*
    	Check to see if the current playlist has been set
    	or null and set the previous song.
    */
				if (_config2.default.active_playlist == '' || _config2.default.active_playlist == null) {
					_helpers2.default.setPrev();
				} else {
					_helpers2.default.setPrevPlaylist(_config2.default.active_playlist);
				}
			} else {
				/*
    	Gets the playlist of the previous button.
    */
				var playlist = this.getAttribute('amplitude-playlist');

				/*
    	Sets the previous playlist
    */
				_helpers2.default.setPrevPlaylist(playlist);
			}
		}
	},

	/**
  * Handles an event on the shuffle button
  *
  * HANDLER FOR: 'amplitude-shuffle'
  *
  * @access public
  */
	shuffle: function shuffle() {
		if (!_config2.default.is_touch_moving) {
			/*
   	Check to see if the shuffle button belongs to a playlist
   */
			if (this.getAttribute('amplitude-playlist') == '' || this.getAttribute('amplitude-playlist') == null) {
				/*
    	Sets the shuffle button to null
    */
				_helpers2.default.setShuffle(null);
			} else {
				/*
    	Gets the playlist attribute of the shuffle button and
    	set shuffle to on for the playlist.
    */
				var playlist = this.getAttribute('amplitude-playlist');
				_helpers2.default.setShuffle(playlist);
			}
		}
	},

	/**
  * Handles an event on the repeat button
  *
  * HANDLER FOR: 'amplitude-repeat'
  *
  * @access private
  */
	repeat: function repeat() {
		if (!_config2.default.is_touch_moving) {
			/*
   	Check to see if the repeat button belongs to a playlist
   */
			if (this.getAttribute('amplitude-playlist') == '' || this.getAttribute('amplitude-playlist') == null) {
				/*
    	Sets repeat to the opposite of what it was set to
    */
				_helpers2.default.setRepeat(!_config2.default.repeat, null);
			} else {
				/*
    	Gets the playlist attribute of the repeat button and
    	set repeat to on for the playlist.
    */
				var playlist = this.getAttribute('amplitude-playlist');
				_helpers2.default.setRepeat(!_config2.default.repeat_statuses[playlist], playlist);
			}
		}
	},

	/**
  * Handles an event on the repeat song button
  *
  * HANDLER FOR: 'amplitude-repeat-song'
  *
  * @access private
  */
	repeatSong: function repeatSong() {
		if (!_config2.default.is_touch_moving) {
			/*
   	Sets repeat song to the opposite of what it was set to
   */
			_helpers2.default.setRepeatSong(!_config2.default.repeat_song);

			/*
   	Visually sync repeat song
   */
			_visual2.default.syncRepeatSong();
		}
	},

	/**
  * Handles an event on the playback speed button
  *
  * HANDLER FOR: 'amplitude-playback-speed'
  *
  * @access private
  */
	playbackSpeed: function playbackSpeed() {
		if (!_config2.default.is_touch_moving) {
			/*
   	We increment the speed by .5 everytime we click
   	the button to change the playback speed. Once we are
   	actively playing back at 2, we start back at 1 which
   	is normal speed.
   */
			switch (_config2.default.playback_speed) {
				case 1:
					_helpers2.default.setPlaybackSpeed(1.5);
					break;
				case 1.5:
					_helpers2.default.setPlaybackSpeed(2);
					break;
				case 2:
					_helpers2.default.setPlaybackSpeed(1);
					break;
			}

			/*
   	Visually sync the playback speed.
   */
			_visual2.default.syncPlaybackSpeed();
		}
	},

	/**
  * Handles an event on a skip to button.
  *
  * HANDLER FOR: 'amplitude-skip-to'
  *
  * @access private
  */
	skipTo: function skipTo() {
		if (!_config2.default.is_touch_moving) {
			/*
   	Determines if the skip to button is in the scope of a playlist.
   */
			if (this.hasAttribute('amplitude-playlist')) {
				var playlist = this.getAttribute('amplitude-playlist');

				if (_helpers4.default.checkNewPlaylist(playlist)) {
					_helpers4.default.setActivePlaylist(playlist);
				}
				/*
    	Gets the location, playlist and song index that is being skipped
    	to.
    */
				var seconds = parseInt(this.getAttribute('amplitude-location'));
				var songIndex = parseInt(this.getAttribute('amplitude-song-index'));

				/*
    	Changes the song to where it's being skipped and then
    	play the song.
    */
				_helpers4.default.changeSong(songIndex);
				_core2.default.play();

				_visual2.default.syncMainPlayPause('playing');
				_visual2.default.syncPlaylistPlayPause(playlist, 'playing');
				_visual2.default.syncSongPlayPause(playlist, songIndex, 'playing');

				/*
    	Skip to the location in the song.
    */
				_core2.default.skipToLocation(seconds);
			} else {
				/*
    	Gets the location and song index that is being skipped
    	to.
    */
				var _seconds = parseInt(this.getAttribute('amplitude-location'));
				var _songIndex = parseInt(this.getAttribute('amplitude-song-index'));

				/*
    	Changes the song to where it's being skipped and then
    	play the song.
    */
				_helpers4.default.changeSong(_songIndex);
				_core2.default.play();

				_visual2.default.syncMainPlayPause('playing');
				_visual2.default.syncSongPlayPause(null, _songIndex, 'playing');

				/*
    	Skip to the location in the song.
    */
				_core2.default.skipToLocation(_seconds);
			}
		}
	}
};

/**
 * Imports the core helpers for Amplitude which help run some of AmplitudeJS functions
 * @module core/AmplitudeHelpers
 */


/**
 * Imports the visual sync module to keep the display in sync with AmplitudeJS
 * @module visual/AmplitudeVisualSync
 */
/**
 * Imports the config module
 * @module config
 */

module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _init = __webpack_require__(6);

var _init2 = _interopRequireDefault(_init);

var _core = __webpack_require__(3);

var _core2 = _interopRequireDefault(_core);

var _helpers = __webpack_require__(1);

var _helpers2 = _interopRequireDefault(_helpers);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _helpers3 = __webpack_require__(5);

var _helpers4 = _interopRequireDefault(_helpers3);

var _visual = __webpack_require__(2);

var _visual2 = _interopRequireDefault(_visual);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Amplitude should just be an interface to the public functions.
 * Everything else should be handled by other objects
 *
 * @module Amplitude
 */

/**
 * AmplitudeJS Visual Sync Module
 *
 * @module visual/AmplitudeVisualSync
 */


/**
 * AmplitudeJS Events Module
 *
 * @module events/AmplitudeEvents
 */


/**
 * AmplitudeJS Core Module
 *
 * @module core/AmplitudeCore
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
		return _config2.default.repeat_statuses[playlistKey];
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
		return _config2.default.shuffled_statuses[playlist];
	}

	/**
  * Sets the shuffle state for the player.
  *
  * Public Accessor: Amplitude.setShuffle()
  *
  * @access public
  */
	function setShuffle() {
		_helpers4.default.setShuffle(null);
	}

	/**
  * Sets the shuffle state for the playlist
  *
  * Public Accessor: Amplitude.setShufflePlaylist( playlistKey )
  *
  * @access public
 * @param {string} playlistKey 	- The key representing the playlist ID to to shuffle the playlist.
  */
	function setShufflePlaylist(playlistKey) {
		_helpers4.default.setShuffle(playlistKey);
	}

	/**
 * Sets the repeat state for the player.
 *
 * Public Accessor: Amplitude.setRepeat()
 *
 * @access public
 */
	function setRepeat() {
		if (!_config2.default.is_touch_moving) {
			/*
   	Sets repeat to the opposite of what it was set to
   */
			_helpers4.default.setRepeat(!_config2.default.repeat);

			/*
   	Visually sync repeat
   */
			_visual2.default.syncRepeat();
		}
	}

	/**
  * Sets the repeat state for a playlist.
  *
  * Public Accessor: Amplitude.setRepeatPlaylist( playlistKey )
  *
  * @access public
  * @param {string} playlistKey 	- The key representing the playlist ID to to shuffle the playlist.
  */
	function setRepeatPlaylist(playlistKey) {
		if (!_config2.default.is_touch_moving) {
			/*
   	Sets repeat for the playlist to the opposite of what it was set to.
   */
			_helpers4.default.setRepeat(!_config2.default.repeat_statuses[playlistKey], playlistKey);
		}
	}

	/**
  * Sets the repeat state for the song.
  *
  * Public Accessor: Amplitude.setRepeatSong()
  *
  * @access public
  */
	function setRepeatSong() {
		if (!_config2.default.is_touch_moving) {
			/*
    Sets repeat to the opposite of what it was set to
   */
			_helpers4.default.setRepeatSong(!_config2.default.repeat_song);

			/*
    Visually sync repeat song
   */
			_visual2.default.syncRepeatSong();
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
		return _config2.default.active_song.currentTime / _config2.default.active_song.duration * 100;
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
		return _config2.default.active_song.currentTime;
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
		return _config2.default.active_song.duration;
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
		if (typeof percentage == 'number' && percentage > 0 && percentage < 100) {
			/*
   	Sets the current time of the song to the percentage.
   */
			_config2.default.active_song.currentTime = _config2.default.active_song.duration * (percentage / 100);
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
  * Returns a song in the songs array at that index
  *
  * Public Accessor: Amplitude.getSongByIndex( song_index )
  *
  * @access public
  * @param {number} index 	- The integer for the index of the song in the songs array.
  * @returns {object} JSON representation for the song at a specific index.
  */
	function getSongByIndex(index) {
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
		var songIndex = _config2.default.playlists[playlist][index];

		return _config2.default.songs[songIndex];
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
		_helpers4.default.setNext();
		return _config2.default.songs.length - 1;
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
		/*
  	Ensures we have a songs array to push to. This is step 1.
  */
		if (_config2.default.songs == undefined) {
			_config2.default.songs = [];
		}

		_config2.default.songs.push(song);

		var songIndex = _config2.default.songs.length - 1;

		/*
  	Ensures the playlist is valid to push the song on to.
  */
		if (_config2.default.playlists[playlist] != undefined) {
			_config2.default.playlists[playlist].push(songIndex);

			_helpers4.default.setNextPlaylist(playlist);

			return _config2.default.playlists[playlist].length - 1;
		} else {
			return null;
		}
	}

	/**
  * Removes a song from the song array
  *
  * Public Accessor: Amplitude.removeSong( index )
  *
  * @access public
  * @param {integer} index 			- Index of the song being removed
  * @returns {boolean} True if removed false if not.
  */
	function removeSong(index) {
		if (_config2.default.songs[index] != undefined) {
			_config2.default.songs.splice(index, 1);
			return true;
		} else {
			return false;
		}
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
			_config2.default.playlists[playlist].splice(index, 1);
		} else {
			return false;
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
		_core2.default.playNow(song);
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
		_core2.default.playSongAtIndex(index);
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
		_core2.default.playPlaylistSongAtIndex(index, playlist);
	}

	/**
  * @TODO: Implement Add Song To Playlist Functionality
  */
	function addSongToPlaylist(song, playlist) {}

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
  * Returns the audio object used to play the audio
  *
  * Public Accessor: Amplitude.getAudio();
  *
  * @access public
  */
	function getAudio() {
		return _config2.default.active_song;
	}

	/**
  * Plays the next song either in the playlist or globally.
  *
  * Public Accessor: Amplitude.next( playlist );
  *
  * @access public
  * @param {string} [playlist = null] 	- The playlist key
  */
	function next() {
		var playlist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

		/*
  	If the playlist is empty or null, then we check the active
  	playlist
  */
		if (playlist == '' || playlist == null) {
			/*
   	If the active playlist is null, then we set the next global
   	song or we set the next in the playlist.
   */
			if (_config2.default.active_playlist == null || _config2.default.active_playlist == '') {
				_helpers4.default.setNext();
			} else {
				_helpers4.default.setNextPlaylist(_config2.default.active_playlist);
			}
		} else {
			/*
   	Set the next in the playlist for the key provided.
   */
			_helpers4.default.setNextPlaylist(playlist);
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

		/*
  	If the playlist is empty or null, then we check the active
  	playlist
  */
		if (playlist == '' || playlist == null) {
			/*
   	If the active playlist is null, then we set the prev global
   	song or we set the prev in the playlist.
   */
			if (_config2.default.active_playlist == null || _config2.default.active_playlist == '') {
				_helpers4.default.setPrev();
			} else {
				_helpers4.default.setPrevPlaylist(_config2.default.active_playlist);
			}
		} else {
			/*
   	Set the prev in the playlist for the key provided.
   */
			_helpers4.default.setPrevPlaylist(playlist);
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
		var songsArray = [];

		for (var i = 0; i < _config2.default.playlists[playlist].length; i++) {
			var songIndex = _config2.default.playlists[playlist][i];
			songsArray.push(_config2.default.songs[songIndex]);
		}

		return songsArray;
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
  * @todo Finish commenting
  */
	function getSongsStatePlaylist(playlist) {
		var songsArray = [];

		if (_config2.default.shuffled_status[playlist]) {

			for (var i = 0; i < _config2.default.shuffled_playlists[playlist].length; i++) {
				songsArray.push(_config2.default.songs[i]);
			}
		} else {

			for (var _i = 0; _i < _config2.default.playlists[playlist].length; _i++) {
				songsArray.push(_config2.default.songs[_i]);
			}
		}

		return songsArray;
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
  * Gets the active index with respect to the state of the player whether it is
  * shuffled or not.
  *
  * Public Accessor: Amplitude.getActiveIndexState()
  *
  * @access public
  */
	function getActiveIndexState() {
		if (_config2.default.shuffle_on) {
			return parseInt(_config2.default.shuffle_active_index);
		} else {
			return parseInt(_config2.default.active_index);
		}
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

		if (playlist != null) {
			if (_helpers2.default.checkNewPlaylist(playlist)) {
				_helpers2.default.setActivePlaylist(playlist);
			}
		}

		seconds = parseInt(seconds);

		/*
  	Changes the song to where it's being skipped and then
  	play the song.
  */
		_helpers2.default.changeSong(songIndex);
		_core2.default.play();

		_visual2.default.syncMainPlayPause('playing');

		if (playlist != null) {
			_visual2.default.syncPlaylistPlayPause(playlist, 'playing');
		}

		_visual2.default.syncSongPlayPause(playlist, songIndex, 'playing');

		/*
  	Skip to the location in the song.
  */
		_core2.default.skipToLocation(seconds);
	}

	/**
  * Sets the meta data for a song in the songs array. This will set any
  * meta data for a song besides the URL. The URL could cause issues if the
  * song was playing.
  *
  * Public Accessor: Amplitude.setMetaData()
  *
  * @access public
  * @param {number} index					- The index of the song in the songs array.
  * @param {object} metaData 			- The object containing the meta data we are updating.
  */
	function setMetaData(index, metaData) {
		for (var key in metaData) {
			if (metaData.hasOwnProperty(key)) {
				if (key != 'url' && key != 'URL') {
					_config2.default.songs[index][key] = metaData[key];
				}
			}
		}

		_visual2.default.displaySongMetadata();
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

	/*
 	Returns all of the publically accesible methods.
 */
	return {
		init: init,
		bindNewElements: bindNewElements,
		getActivePlaylist: getActivePlaylist,
		getPlaybackSpeed: getPlaybackSpeed,
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
		getSongPlayedPercentage: getSongPlayedPercentage,
		setSongPlayedPercentage: setSongPlayedPercentage,
		getSongPlayedSeconds: getSongPlayedSeconds,
		getSongDuration: getSongDuration,
		setDebug: setDebug,
		getActiveSongMetadata: getActiveSongMetadata,
		getSongByIndex: getSongByIndex,
		getSongAtPlaylistIndex: getSongAtPlaylistIndex,
		addSong: addSong,
		addSongToPlaylist: addSongToPlaylist,
		removeSong: removeSong,
		removeSongFromPlaylist: removeSongFromPlaylist,
		playNow: playNow,
		playSongAtIndex: playSongAtIndex,
		playPlaylistSongAtIndex: playPlaylistSongAtIndex,
		play: play,
		pause: pause,
		audio: getAudio,
		next: next,
		prev: prev,
		getSongs: getSongs,
		getSongsInPlaylist: getSongsInPlaylist,
		getSongsState: getSongsState,
		getSongsStatePlaylist: getSongsStatePlaylist,
		getActiveIndex: getActiveIndex,
		getActiveIndexState: getActiveIndexState,
		getVersion: getVersion,
		getBuffered: getBuffered,
		skipTo: skipTo,
		setMetaData: setMetaData,
		setDelay: setDelay
	};
}();

/**
 * Imports the config module
 * @module config
 */


/**
 * AmplitudeJS Events Helpers Module
 *
 * @module events/AmplitudeEventsHelpers
 */


/**
 * AmplitudeJS Core Helpers Module
 *
 * @module core/AmplitudeCoreHelpers
 */
/**
 * @name 		Amplitude.js
 * @version 3.3.1
 * @author 	Dan Pastori (521 Dimensions) <dan@521dimensions.com>
*/

/**
 * AmplitudeJS Initializer Module
 *
 * @module init/AmplitudeInitializer
 */
exports.default = Amplitude;
module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _helpers = __webpack_require__(1);

var _helpers2 = _interopRequireDefault(_helpers);

var _init = __webpack_require__(6);

var _init2 = _interopRequireDefault(_init);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These helpers wrap around the basic methods of the Soundcloud API
 * and get the information we need from SoundCloud to make the songs
 * streamable through Amplitude
 *
 * @module soundcloud/AmplitudeSoundcloud
 */


/**
 * Imports the helper functions for the core module
 * @module core/AmplitudeHelers
 */
var AmplitudeSoundcloud = function () {

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
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');

		script.type = 'text/javascript';

		/*
  	URL to the remote soundcloud SDK
  */
		script.src = 'https://connect.soundcloud.com/sdk.js';
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
  * Due to Soundcloud SDK being asynchronous, we need to scope the
  * index of the song in another function. The privateGetSoundcloudStreamableURLs
  * function does the actual iteration and scoping.
  *
  * @access private
  * @param {string} url 		- URL of the soundcloud song
  * @param {number} index 	- The index of the soundcloud song in the songs array.
  */
	function resolveStreamable(url, index) {
		SC.get('/resolve/?url=' + url, function (sound) {
			/*
   	If streamable we get the url and bind the client ID to the end
   	so Amplitude can just stream the song normally. We then overwrite
   	the url the user provided with the streamable URL.
   */
			if (sound.streamable) {
				_config2.default.songs[index].url = sound.stream_url + '?client_id=' + _config2.default.soundcloud_client;

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
				_helpers2.default.writeDebugMessage(_config2.default.songs[index].name + ' by ' + _config2.default.songs[index].artist + ' is not streamable by the Soundcloud API');
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

	/*
 	Returns the publically accessible methods
 */
	return {
		loadSoundCloud: loadSoundCloud
	};
}();

/**
 * Imports the initializer
 * @module init/AmplitudeInitializer
 */
/**
 * Imports the config module
 * @module config
 */
exports.default = AmplitudeSoundcloud;
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These methods help sync visual displays. They essentially make the visual sync
 * methods smaller and more maintainable.
 *
 * @module visual/AmplitudeVisualSyncHelpers
 */
var AmplitudeVisualSyncHelpers = function () {
	/**
  * Updates any elements that display the current hour for the song.
  *
  * @access public
  * @param {number} hours 	- An integer conaining how many hours into the song.
  */
	function syncCurrentHours(hours) {
		/*
  	Gets all of the song hour selectors.
  */
		var hourSelectors = [];

		if (_config2.default.active_playlist != null && _config2.default.active_playlist != '') {
			hourSelectors = ['.amplitude-current-hours[amplitude-main-current-hours="true"]', '.amplitude-current-hours[amplitude-playlist-current-hours="true"][amplitude-playlist="' + _config2.default.active_playlist + '"]', '.amplitude-current-hours[amplitude-song-index="' + _config2.default.active_index + '"]'];
		} else {
			hourSelectors = ['.amplitude-current-hours[amplitude-main-current-hours="true"]', '.amplitude-current-hours[amplitude-song-index="' + _config2.default.active_index + '"]'];
		}

		/*
  	Ensures that there are some hour selectors.
  */
		if (document.querySelectorAll(hourSelectors.join()).length > 0) {
			/*
   	Get all of the hour selectors
   */
			var currentHourSelectors = document.querySelectorAll(hourSelectors.join());

			/*
   	Set the current hour selector's inner html to hours passed in.
   */
			for (var i = 0; i < currentHourSelectors.length; i++) {
				/*
    	If the selector is a main selector, we set the hours.
    */
				if (currentHourSelectors[i].getAttribute('amplitude-main-current-hours') == 'true') {
					currentHourSelectors[i].innerHTML = hours;
				} else {
					/*
     	If the active playlist is not null or empty
     	and the attribute of the playlist is equal to the
     	active playlist, then we set the inner html.
     */
					if (_config2.default.active_playlist != '' && _config2.default.active_playlist != null && currentHourSelectors[i].getAttribute('amplitude-playlist') == _config2.default.active_playlist) {
						currentHourSelectors[i].innerHTML = hours;
						/*
      	If the active playlist is not set and the selector
      	does not have a playlist then we set the hours. This
      	means that the current selector is an individual song
      	selector.
      */
					} else if (_config2.default.active_playlist == '' || _config2.default.active_playlist == null && !currentHourSelectors[i].hasAttribute('amplitude-playlist')) {
						currentHourSelectors[i].innerHTML = hours;
						/*
      	If nothing else matches, set the selector's inner HTML to '00'
      */
					} else {
						currentHourSelectors[i].innerHTML = '0';
					}
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
 	Resets the current hours displays to 0
 --------------------------------------------------------------------------*/
	function resetCurrentHours() {
		/*
  	Gets the hour display elements
  */
		var hourSelectors = document.querySelectorAll('.amplitude-current-hours');

		/*
  	Iterates over all of the hour selectors and sets the inner HTML
  	to 00.
  */
		for (var i = 0; i < hourSelectors.length; i++) {
			hourSelectors[i].innerHTML = '0';
		}
	}

	/**
  * Updates any elements that display the current minutes for the song.
  *
  * @access public
  * @param {number} minutes 	- An integer conaining how many minutes into the song.
  */
	function syncCurrentMinutes(minutes) {
		/*
  	Gets all of the song minute selectors.
  */
		var minuteSelectors = [];

		if (_config2.default.active_playlist != null && _config2.default.active_playlist != '') {
			minuteSelectors = ['.amplitude-current-minutes[amplitude-main-current-minutes="true"]', '.amplitude-current-minutes[amplitude-playlist-current-minutes="true"][amplitude-playlist="' + _config2.default.active_playlist + '"]', '.amplitude-current-minutes[amplitude-song-index="' + _config2.default.active_index + '"]'];
		} else {
			minuteSelectors = ['.amplitude-current-minutes[amplitude-main-current-minutes="true"]', '.amplitude-current-minutes[amplitude-song-index="' + _config2.default.active_index + '"]'];
		}

		/*
  	Grabs the current minute selectors
  */
		var currentMinuteSelectors = document.querySelectorAll(minuteSelectors.join());

		/*
  	Set the current minute selector's inner html to minutes passed in.
  */
		for (var i = 0, l = currentMinuteSelectors.length; i < l; i++) {
			/*
   	If the selector is a main selector, we set the seconds.
   */
			if (currentMinuteSelectors[i].getAttribute('amplitude-main-current-minutes') == 'true') {
				currentMinuteSelectors[i].innerHTML = minutes;
			} else {
				/*
    	If the active playlist is not null or empty
    	and the attribute of the playlist is equal to the
    	active playlist, then we set the inner html.
    */
				if (_config2.default.active_playlist != '' && _config2.default.active_playlist != null && currentMinuteSelectors[i].getAttribute('amplitude-playlist') == _config2.default.active_playlist) {
					currentMinuteSelectors[i].innerHTML = minutes;
					/*
     	If the active playlist is not set and the selector
     	does not have a playlist then we set the minutes. This
     	means that the current selector is an individual song
     	selector.
     */
				} else if (_config2.default.active_playlist == '' || _config2.default.active_playlist == null && !currentMinuteSelectors[i].hasAttribute('amplitude-playlist')) {
					currentMinuteSelectors[i].innerHTML = minutes;
					/*
     	If nothing else matches, set the selector's inner HTML to '00'
     */
				} else {
					currentMinuteSelectors[i].innerHTML = '00';
				}
			}
		}
	}

	/**
  * Resets the current minutes displays to 00
  *
  * @access public
  */
	function resetCurrentMinutes() {
		/*
  	Gets the minutes display elements
  */
		var minuteSelectors = document.querySelectorAll('.amplitude-current-minutes');

		/*
  	Iterates over all of the minute selectors and sets the inner HTML
  	to 00.
  */
		for (var i = 0; i < minuteSelectors.length; i++) {
			minuteSelectors[i].innerHTML = '00';
		}
	}

	/**
  * Updates any elements that display the current seconds for the song.
  *
  * @access public
  * @param {number} seconds	- An integer conaining how many seconds into the song.
  */
	function syncCurrentSeconds(seconds) {
		/*
  	Gets all of the song second selectors. If the active playlist
  	is not null, then we get the playlist selectors.
  */
		var secondSelectors = [];

		if (_config2.default.active_playlist != null && _config2.default.active_playlist != '') {
			secondSelectors = ['.amplitude-current-seconds[amplitude-main-current-seconds="true"]', '.amplitude-current-seconds[amplitude-playlist-current-seconds="true"][amplitude-playlist="' + _config2.default.active_playlist + '"]', '.amplitude-current-seconds[amplitude-song-index="' + _config2.default.active_index + '"]'];
		} else {
			secondSelectors = ['.amplitude-current-seconds[amplitude-main-current-seconds="true"]', '.amplitude-current-seconds[amplitude-song-index="' + _config2.default.active_index + '"]'];
		}

		/*
  	Get all of the second selectors
  */
		var currentSecondSelectors = document.querySelectorAll(secondSelectors.join());

		/*
  	Iterate over all of the second selectors.
  */
		for (var i = 0, l = currentSecondSelectors.length; i < l; i++) {
			/*
   	If the selector is a main selector, we set the seconds.
   */
			if (currentSecondSelectors[i].getAttribute('amplitude-main-current-seconds') == 'true') {
				currentSecondSelectors[i].innerHTML = seconds;
			} else {
				/*
    	If the active playlist is not null or empty
    	and the attribute of the playlist is equal to the
    	active playlist, then we set the inner html.
    */
				if (_config2.default.active_playlist != '' && _config2.default.active_playlist != null && currentSecondSelectors[i].getAttribute('amplitude-playlist') == _config2.default.active_playlist) {
					currentSecondSelectors[i].innerHTML = seconds;
					/*
     	If the active playlist is not set and the selector
     	does not have a playlist then we set the seconds. This
     	means that the current selector is an individual song
     	selector.
     */
				} else if (_config2.default.active_playlist == '' || _config2.default.active_playlist == null && !currentSecondSelectors[i].hasAttribute('amplitude-playlist')) {
					currentSecondSelectors[i].innerHTML = seconds;
					/*
     	If nothing else matches, set the selector's inner HTML to '00'
     */
				} else {
					currentSecondSelectors[i].innerHTML = '00';
				}
			}
		}
	}

	/**
  * Resets the current seconds displays to 00
  *
  * @access public
  */
	function resetCurrentSeconds() {
		/*
  	Gets the seconds display elements
  */
		var secondSelectors = document.querySelectorAll('.amplitude-current-seconds');

		/*
  	Iterates over all of the seconds selectors and sets the inner HTML
  	to 00.
  */
		for (var i = 0; i < secondSelectors.length; i++) {
			secondSelectors[i].innerHTML = '00';
		}
	}

	/**
  * Updates any elements that display the current time for the song. This
  * is a computed field that will be commonly used.
  *
  * @access public
  * @param {object} currentTime 	- A json object conaining the parts for the current time for the song.
  */
	function syncCurrentTime(currentTime) {
		/*
  	Gets all of the song time selectors.
  */
		var timeSelectors = ['.amplitude-current-time[amplitude-main-current-time="true"]', '.amplitude-current-time[amplitude-playlist-main-current-time="' + _config2.default.active_playlist + '"]', '.amplitude-current-time[amplitude-song-index="' + _config2.default.active_index + '"]'];

		/*
  	Get all of the time selectors.
  */
		var currentTimeSelectors = document.querySelectorAll(timeSelectors.join());

		/*
  	Set the time selector's inner html to the current time for the song. The current
  	time is computed by joining minutes and seconds.
  */
		var timeText = currentTime.minutes + ':' + currentTime.seconds;
		if (currentTime.hours > 0) {
			timeText = currentTime.hours + ':' + timeText;
		}
		for (var i = 0, l = currentTimeSelectors.length; i < l; i++) {
			currentTimeSelectors[i].innerHTML = timeText;
		}
	}

	/**
  * Resets the current time displays to 00:00
  *
  * @access public
  */
	function resetCurrentTime() {
		/*
  	Gets the time selector display elements
  */
		var timeSelectors = document.querySelectorAll('.amplitude-current-time');

		/*
  	Iterates over all of the time selectors and sets the inner HTML
  	to 00.
  */
		for (var i = 0; i < timeSelectors.length; i++) {
			timeSelectors[i].innerHTML = '00:00';
		}
	}

	/**
  * Syncs the song played progress bars. These are HTML5 progress elements.
  *
  * @access private
  * @param {number} songPlayedPercentage  	- The percentage of the song that has been played.
  */
	function syncSongPlayedProgressBar(songPlayedPercentage) {
		syncMainSongPlayedProgressBars(songPlayedPercentage);
		syncPlaylistSongPlayedProgressBars(songPlayedPercentage);
		syncIndividualSongPlayedProgressBars(songPlayedPercentage);
	}

	/**
  * Sync how much has been played with a progress bar. This is the main progress bar.
  *
  * @access private
  * @param {number} songPlayedPercentage 	- The percent of the song completed.
  */
	function syncMainSongPlayedProgressBars(songPlayedPercentage) {
		/*
  	Ensure that the song completion percentage is a number
  */
		if (!isNaN(songPlayedPercentage)) {
			/*
   	Get all of the song progress bars
   */
			var songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[amplitude-main-song-played-progress="true"]');

			for (var i = 0; i < songPlayedProgressBars.length; i++) {
				var max = songPlayedProgressBars[i].max;

				songPlayedProgressBars[i].value = songPlayedPercentage / 100 * max;
			}
		}
	}

	/**
  * Sync how much has been played with a progress bar. This is the playlist progress bar.
  *
  * @access public
  * @param {number} songPlayedPercentage 	- The percent of the song completed.
  */
	function syncPlaylistSongPlayedProgressBars(songPlayedPercentage) {
		/*
  	Ensure that the song completion percentage is a number
  */
		if (!isNaN(songPlayedPercentage)) {
			/*
   	Get all of the song progress bars
   */
			var songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[amplitude-playlist-song-played-progress="true"][amplitude-playlist="' + _config2.default.active_playlist + '"]');

			for (var i = 0; i < songPlayedProgressBars.length; i++) {
				var max = songPlayedProgressBars[i].max;

				songPlayedProgressBars[i].value = songPlayedPercentage / 100 * max;
			}
		}
	}

	/**
  * Sync how much has been played with a progress bar. This is for an individual song.
  *
  * @access private
  * @param {number} songPlayedPercentage 	- The percent of the song completed.
  */
	function syncIndividualSongPlayedProgressBars(songPlayedPercentage) {
		/*
  	Ensure that the song completion percentage is a number
  */
		if (!isNaN(songPlayedPercentage)) {
			/*
   	If the active playlist is not null, we get the individual song
   	played progress for the playlist.
   */
			if (_config2.default.active_playlist != '' && _config2.default.active_playlist != null) {
				/*
    	Get all of the song progress bars
    */
				var songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[amplitude-playlist="' + _config2.default.active_playlist + '"][amplitude-song-index="' + _config2.default.active_index + '"]');

				for (var i = 0; i < songPlayedProgressBars.length; i++) {
					var max = songPlayedProgressBars[i].max;

					songPlayedProgressBars[i].value = songPlayedPercentage / 100 * max;
				}
			} else {
				/*
    	Get all of the song progress bars
    */
				var _songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[amplitude-song-index="' + _config2.default.active_index + '"]');

				for (var _i = 0; _i < _songPlayedProgressBars.length; _i++) {
					var _max = _songPlayedProgressBars[_i].max;

					_songPlayedProgressBars[_i].value = songPlayedPercentage / 100 * _max;
				}
			}
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
		element.classList.add('amplitude-playing');
		element.classList.remove('amplitude-paused');
	}

	/**
  * Sets an element to be paused by adding the 'amplitude-paused' class
  * and removing the 'amplitude-playing' class
  *
  * @access public
  * @param {element} element 	- The element getting the paused class added.
  */
	function setElementPause(element) {
		element.classList.remove('amplitude-playing');
		element.classList.add('amplitude-paused');
	}

	/**
  * Updates any elements that display the duration hour for the song.
  *
  * @access public
  * @param {number} hours 		- An integer conaining how many hours are in the song
  */
	function syncDurationHours(hours) {
		/*
  	Gets all of the song hour selectors.
  */
		var hourSelectors = [];

		if (_config2.default.active_playlist != null && _config2.default.active_playlist != '') {
			hourSelectors = ['.amplitude-duration-hours[amplitude-main-duration-hours="true"]', '.amplitude-duration-hours[amplitude-playlist-duration-hours="true"][amplitude-playlist="' + _config2.default.active_playlist + '"]', '.amplitude-duration-hours[amplitude-song-index="' + _config2.default.active_index + '"]'];
		} else {
			hourSelectors = ['.amplitude-duration-hours[amplitude-main-duration-hours="true"]', '.amplitude-duration-hours[amplitude-song-index="' + _config2.default.active_index + '"]'];
		}

		/*
  	Ensures that there are some hour selectors.
  */
		if (document.querySelectorAll(hourSelectors.join()).length > 0) {
			/*
   	Get all of the hour selectors
   */
			var durationHourSelectors = document.querySelectorAll(hourSelectors.join());

			/*
   	Set the duration hour selector's inner html to hours passed in.
   */
			for (var i = 0; i < durationHourSelectors.length; i++) {
				/*
    	If the selector is a main selector, we set the hours.
    */
				if (durationHourSelectors[i].getAttribute('amplitude-main-duration-hours') == 'true') {
					durationHourSelectors[i].innerHTML = hours;
				} else {
					/*
     	If the active playlist is not null or empty
     	and the attribute of the playlist is equal to the
     	active playlist, then we set the inner html.
     */
					if (_config2.default.active_playlist != '' && _config2.default.active_playlist != null && durationHourSelectors[i].getAttribute('amplitude-playlist') == _config2.default.active_playlist) {
						durationHourSelectors[i].innerHTML = hours;
						/*
      	If the active playlist is not set and the selector
      	does not have a playlist then we set the hours. This
      	means that the duration selector is an individual song
      	selector.
      */
					} else if (_config2.default.active_playlist == '' || _config2.default.active_playlist == null && !durationHourSelectors[i].hasAttribute('amplitude-playlist')) {
						durationHourSelectors[i].innerHTML = hours;
						/*
      	If nothing else matches, set the selector's inner HTML to '00'
      */
					} else {
						durationHourSelectors[i].innerHTML = '0';
					}
				}
			}
		}
	}

	/**
  * Updates any elements that display the duration minutes for the song.
  *
  * @access public
  * @param {number} minutes 	- An integer conaining how many minutes into the song.
  */
	function syncDurationMinutes(minutes) {
		/*
  	Gets all of the song minute selectors.
  */
		var minuteSelectors = [];

		if (_config2.default.active_playlist != null && _config2.default.active_playlist != '') {
			minuteSelectors = ['.amplitude-duration-minutes[amplitude-main-duration-minutes="true"]', '.amplitude-duration-minutes[amplitude-playlist-duration-minutes="true"][amplitude-playlist="' + _config2.default.active_playlist + '"]', '.amplitude-duration-minutes[amplitude-song-index="' + _config2.default.active_index + '"]'];
		} else {
			minuteSelectors = ['.amplitude-duration-minutes[amplitude-main-duration-minutes="true"]', '.amplitude-duration-minutes[amplitude-song-index="' + _config2.default.active_index + '"]'];
		}

		/*
  	Get all of the minute selectors
  */
		var durationMinuteSelectors = document.querySelectorAll(minuteSelectors.join());

		/*
  	Set the duration minute selector's inner html to minutes passed in.
  */
		for (var i = 0; i < durationMinuteSelectors.length; i++) {
			/*
   	If the selector is a main selector, we set the seconds.
   */
			if (durationMinuteSelectors[i].getAttribute('amplitude-main-duration-minutes') == 'true') {
				durationMinuteSelectors[i].innerHTML = minutes;
			} else {
				/*
    	If the active playlist is not null or empty
    	and the attribute of the playlist is equal to the
    	active playlist, then we set the inner html.
    */
				if (_config2.default.active_playlist != '' && _config2.default.active_playlist != null && durationMinuteSelectors[i].getAttribute('amplitude-playlist') == _config2.default.active_playlist) {
					durationMinuteSelectors[i].innerHTML = minutes;
					/*
     	If the active playlist is not set and the selector
     	does not have a playlist then we set the minutes. This
     	means that the duration selector is an individual song
     	selector.
     */
				} else if (_config2.default.active_playlist == '' || _config2.default.active_playlist == null && !durationMinuteSelectors[i].hasAttribute('amplitude-playlist')) {
					durationMinuteSelectors[i].innerHTML = minutes;
					/*
     	If nothing else matches, set the selector's inner HTML to '00'
     */
				} else {
					durationMinuteSelectors[i].innerHTML = '00';
				}
			}
		}
	}

	/**
  * Updates any elements that display the duration seconds for the song.
  *
  * @access private
  * @param {number} seconds 	- An integer conaining how many seconds into the song.
  */
	function syncDurationSeconds(seconds) {
		/*
  	Gets all of the song second selectors. If the active playlist
  	is not null, then we get the playlist selectors.
  */
		var secondSelectors = [];

		if (_config2.default.active_playlist != null && _config2.default.active_playlist != '') {
			secondSelectors = ['.amplitude-duration-seconds[amplitude-main-duration-seconds="true"]', '.amplitude-duration-seconds[amplitude-playlist-duration-seconds="true"][amplitude-playlist="' + _config2.default.active_playlist + '"]', '.amplitude-duration-seconds[amplitude-song-index="' + _config2.default.active_index + '"]'];
		} else {
			secondSelectors = ['.amplitude-duration-seconds[amplitude-main-duration-seconds="true"]', '.amplitude-duration-seconds[amplitude-song-index="' + _config2.default.active_index + '"]'];
		}

		/*
  	Get all of the second selectors
  */
		var durationSecondSelectors = document.querySelectorAll(secondSelectors.join());

		/*
  	Iterate over all of the second selectors.
  */
		for (var i = 0; i < durationSecondSelectors.length; i++) {
			/*
   	If the selector is a main selector, we set the seconds.
   */
			if (durationSecondSelectors[i].getAttribute('amplitude-main-duration-seconds') == 'true') {
				durationSecondSelectors[i].innerHTML = seconds;
			} else {
				/*
    	If the active playlist is not null or empty
    	and the attribute of the playlist is equal to the
    	active playlist, then we set the inner html.
    */
				if (_config2.default.active_playlist != '' && _config2.default.active_playlist != null && durationSecondSelectors[i].getAttribute('amplitude-playlist') == _config2.default.active_playlist) {
					durationSecondSelectors[i].innerHTML = seconds;
					/*
     	If the active playlist is not set and the selector
     	does not have a playlist then we set the seconds. This
     	means that the duration selector is an individual song
     	selector.
     */
				} else if (_config2.default.active_playlist == '' || _config2.default.active_playlist == null && !durationSecondSelectors[i].hasAttribute('amplitude-playlist')) {
					durationSecondSelectors[i].innerHTML = seconds;
					/*
     	If nothing else matches, set the selector's inner HTML to '00'
     */
				} else {
					durationSecondSelectors[i].innerHTML = '00';
				}
			}
		}
	}

	/**
  * Updates any elements that display the duration time for the song. This
  * is a computed field that will be commonly used.
  *
  * @access public
  * @param {object} durationTime 	- A json object conaining the parts for the duration time for the song.
  */
	function syncDurationTime(durationTime) {
		/*
  	Gets all of the song time selectors.
  */
		var timeSelectors = ['.amplitude-duration-time[amplitude-main-duration-time="true"]', '.amplitude-duration-time[amplitude-playlist-main-duration-time="' + _config2.default.active_playlist + '"]', '.amplitude-duration-time[amplitude-song-index="' + _config2.default.active_index + '"]'];

		/*
  	Get all of the time selectors.
  */
		var durationTimeSelectors = document.querySelectorAll(timeSelectors.join());

		/*
  	Set the time selector's inner html to the duration time for the song. The duration
  	time is computed by joining minutes and seconds.
  */
		var durationText = '00:00';
		if (!isNaN(durationTime.minutes) && !isNaN(durationTime.seconds)) {
			durationText = durationTime.minutes + ':' + durationTime.seconds;
			if (!isNaN(durationTime.hours) && durationTime.hours > 0) {
				durationText = durationTime.hours + ':' + durationText;
			}
		}
		for (var i = 0; i < durationTimeSelectors.length; i++) {
			durationTimeSelectors[i].innerHTML = durationText;
		}
	}

	/**
  * Updates the elements that show how much time is remaining in the song.
  *
  * @access public
  * @param {object} currentTime 	- A json object containing the parts for the current time for the song.
  * @param {object} durationTime - A json object conaining the parts for the duration time for the song.
  */
	function syncCountDownTime(currentTime, songDuration) {
		/*
  	Initialize time remaining.
  */
		var timeRemaining = '00:00';

		/*
  	Ensure that all values are defined.
  */
		if (currentTime != undefined && songDuration != undefined) {
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

				timeRemaining = (remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes) + ':' + (remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds);

				if (remainingHours > 0) {
					timeRemaining = remainingHours + ':' + timeRemaining;
				}
			}
		}

		/*
  	Gets all of the song time selectors.
  */
		var timeSelectors = ['.amplitude-time-remaining[amplitude-main-time-remaining="true"]', '.amplitude-time-remaining[amplitude-playlist-main-time-remaining="' + _config2.default.active_playlist + '"]', '.amplitude-time-remaining[amplitude-song-index="' + _config2.default.active_index + '"]'];

		/*
  	Get all of the time selectors.
  */
		var timeRemainingSelectors = document.querySelectorAll(timeSelectors.join());

		/*
  	Set the time selector's inner html to the duration time for the song. The duration
  	time is computed by joining minutes and seconds.
  */
		for (var i = 0; i < timeRemainingSelectors.length; i++) {
			timeRemainingSelectors[i].innerHTML = timeRemaining;
		}
	}

	/*
 	Return the publically available functions.
 */
	return {
		syncCurrentHours: syncCurrentHours,
		syncCurrentMinutes: syncCurrentMinutes,
		syncCurrentSeconds: syncCurrentSeconds,
		syncCurrentTime: syncCurrentTime,
		resetCurrentHours: resetCurrentHours,
		resetCurrentMinutes: resetCurrentMinutes,
		resetCurrentSeconds: resetCurrentSeconds,
		resetCurrentTime: resetCurrentTime,
		syncSongPlayedProgressBar: syncSongPlayedProgressBar,
		setElementPlay: setElementPlay,
		setElementPause: setElementPause,
		syncDurationHours: syncDurationHours,
		syncDurationMinutes: syncDurationMinutes,
		syncDurationSeconds: syncDurationSeconds,
		syncDurationTime: syncDurationTime,
		syncCountDownTime: syncCountDownTime
	};
}(); /**
      * Imports the config module
      * @module config
      */
exports.default = AmplitudeVisualSyncHelpers;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=amplitude.js.map