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


/*
|-------------------------------------------------------------------------------
| Module Variables
|-------------------------------------------------------------------------------
| These variables make Amplitude run. The config is the most important
| containing active settings and parameters.
*/
/*--------------------------------------------------------------------------
	The config JSON is the global settings for ALL of Amplitude functions.
	This is global and contains all of the user preferences. The default
	settings are set, and the user overwrites them when they initialize
	Amplitude.
--------------------------------------------------------------------------*/
var config = {
	version: '3.2.3',
	/*
 	The audio element we will be using to handle all of the audio. This
 	is the javascript version of the HTML5 audio element.
 */
	active_song: new Audio(),

	/*
 	JSON object that contains the active metadata for the song.
 */
	active_metadata: {},

	/*
 	String to hold the active album name. Used to check and see if the
 	album changed and run the album changed callback.
 */
	active_album: '',

	/*
 	Contains the index of the actively playing song.
 */
	active_index: 0,

	/*
 	Contains the key to the active playlist index.
 */
	active_playlist: '',

	/*
 	Set to true to autoplay the song
 */
	autoplay: false,

	/*
 	Sets the initial playback speed of the song. The values
 	for this can be 1.0, 1.5, 2.0
 */
	playback_speed: 1.0,

	/*
 	The user can pass a JSON object with a key => value store of callbacks
 	to be run at certain events.
 */
	callbacks: {},

	/*
 	Object containing all of the songs the user has passed to Amplitude
 	to use.
 */
	songs: [],

	/*
 	Object containing all of the playlists the user created.
 */
	playlists: {},

	/*
 	Object that will contain shuffled playlists.
 */
	shuffled_playlists: {},

	/*
 	Object that contains whether the current playlist is in
 	shuffle mode or not.
 */
	shuffled_statuses: {},

	/*
 	Object that contains the active index in a shuffled playlist.
 */
	shuffled_active_indexes: {},

	/*
 	When repeat is on, when the song ends the song will replay itself.
 */
	repeat: false,

	/*
 	When shuffled, this gets populated with the songs the user provided
 	in a random order.
 */
	shuffle_list: {},

	/*
 	When shuffled is turned on this gets set to true so when traversing
 	through songs Amplitude knows whether or not to use the songs object
 	or the shuffle_list.
 */
	shuffle_on: false,

	/*
 	When shuffled, this index is used to let Amplitude know where it's
 	at when traversing.
 */
	shuffle_active_index: 0,

	/*
 	The user can set default album art to be displayed if the song they
 	set doesn't contain album art.
 */
	default_album_art: '',

	/*
 	When set to true, Amplitude will print to the console any errors
 	that it runs into providing helpful feedback to the user.
 */
	debug: false,

	/*
 	The user can set the initial volume to a number between 0 and 1
 	overridding a default of .5.
 */
	volume: .5,

	/*
 	This is set on mute so that when a user un-mutes Amplitude knows
 	what to restore the volume to.
 */
	pre_mute_volume: .5,

	/*
 	This is an integer between 1 and 100 for how much the volume should
 	increase when the user presses a volume up button.
 */
	volume_increment: 5,

	/*
 	This is an integer between 1 and 100 for how much the volume should
 	decrease when the user presses a volume down button.
 */
	volume_decrement: 5,

	/*
 	When using SoundCloud, the user will have to provide their API Client
 	ID
 */
	soundcloud_client: '',

	/*
 	The user can set this to true and Amplitude will use the album art
 	for the song returned from the Soundcloud API
 */
	soundcloud_use_art: false,

	/*
 	Used on config to count how many songs are from soundcloud and
 	compare it to how many are ready for when to move to the rest
 	of the configuration.
 */
	soundcloud_song_count: 0,

	/*
 	Used on config to count how many songs are ready so when we get
 	all of the data from the SoundCloud API that we need this should
 	match the SoundCloud song count meaning we can move to the rest
 	of the config.
 */
	soundcloud_songs_ready: 0,

	/*
 	Flag for if the user is moving the screen.
 */
	is_touch_moving: false,

	/*
 	How much of the song is buffered.
 */
	buffered: 0,

	/*
 	Array of bindings to certain key events.
 */
	bindings: {},

	/*
 	Determines when a song ends, we should continue to the next
 	song.
 */
	continue_next: true
};

module.exports = config;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _core = __webpack_require__(3);

var _core2 = _interopRequireDefault(_core);

var _visual = __webpack_require__(2);

var _visual2 = _interopRequireDefault(_visual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = __webpack_require__(0);


/*
|----------------------------------------------------------------------------------------------------
| HELPER FUNCTIONS
|----------------------------------------------------------------------------------------------------
| For the sake of code clarity, these functions perform helper tasks
| assisting the logical functions with what they need such as setting
| the proper song index after an event has occured.
|
| METHODS
|	resetConfig()
|	writeDebugMessage( message )
|	runCallback( callbackName )
|	changeSong( songIndex )
*/
var AmplitudeHelpers = function () {
	/*--------------------------------------------------------------------------
 	Resets the config to the default state. This is called on initialize
 	to ensure the user's config is what matters.
 --------------------------------------------------------------------------*/
	function resetConfig() {
		config.active_song = new Audio();
		config.active_metadata = {};
		config.active_album = '';
		config.active_index = 0;
		config.active_playlist = '';
		config.autoplay = false;
		config.playback_speed = 1.0;
		config.callbacks = {};
		config.songs = [];
		config.playlists = {};
		config.shuffled_playlists = {};
		config.shuffled_statuses = {};
		config.repeat = false;
		config.shuffle_list = {};
		config.shuffle_on = false;
		config.shuffle_active_index = 0;
		config.default_album_art = '';
		config.debug = false;
		config.handle_song_elements = true;
		config.volume = .5;
		config.pre_mute_volume = .5;
		config.volume_increment = 5;
		config.volume_decrement = 5;
		config.soundcloud_client = '';
		config.soundcloud_use_art = false;
		config.soundcloud_song_count = 0;
		config.soundcloud_songs_ready = 0;
		config.continue_next = true;
	}

	/*--------------------------------------------------------------------------
 	Writes out debug message to the console if enabled.
 		@param string message The string that gets printed to
 	alert the user of a debugging error.
 --------------------------------------------------------------------------*/
	function writeDebugMessage(message) {
		if (config.debug) {
			console.log(message);
		}
	}

	/*--------------------------------------------------------------------------
 	Runs a user defined callback method
 		@param string callbackName The name of the callback we are going to run.
 --------------------------------------------------------------------------*/
	function runCallback(callbackName) {
		/*
  	Checks to see if a user defined a callback method for the
  	callback we are running.
  */
		if (config.callbacks[callbackName]) {
			/*
   	Build the callback function
   */
			var callbackFunction = config.callbacks[callbackName];

			/*
   	Write a debug message stating the callback we are running
   */
			writeDebugMessage('Running Callback: ' + callbackName);

			/*
   	Run the callback function.
   */
			try {
				callbackFunction();
			} catch (error) {
				// undocumented way to cancel events
				if (error.message == "CANCEL EVENT") throw error;else writeDebugMessage('Callback error: ' + error.message);
			}
		}
	}

	/*--------------------------------------------------------------------------
 	Changes the active song in the config. This happens in multiple
 	scenarios: The user clicks a play button that has an index that is
 	different than what is currently playing, the song ends and the next
 	song begins, etc.
 		@param int songIndex The song index we are changing to
 --------------------------------------------------------------------------*/
	function changeSong(songIndex) {
		var song = config.songs[songIndex];

		/*
  	Stops the currently playing song so we can adjust
  	what we need.
  */
		_core2.default.stop();

		/*
  	FX-TODO: Stop Visualization
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

	/*--------------------------------------------------------------------------
 	Checks to see if the new song to be played is different than the song
 	that is currently playing. To be true, the user would have selected
 	play on a new song with a new index. To be false, the user would have
 	clicked play/pause on the song that was playing.
 		@param int songIndex The index of the new song to be played.
 --------------------------------------------------------------------------*/
	function checkNewSong(songIndex) {
		if (songIndex != config.active_index) {
			return true;
		} else {
			return false;
		}
	}

	/*--------------------------------------------------------------------------
 	Checks to see if there is a new album
 		@param string newAlbum Checks to see if the new song will have a new
 	album.
 --------------------------------------------------------------------------*/
	function checkNewAlbum(newAlbum) {
		if (config.active_album != newAlbum) {
			return true;
		} else {
			return false;
		}
	}

	/*--------------------------------------------------------------------------
 	Checks to see if there is a new playlist
 		@param string playlist The playlist passed in to check against the active
 	playlist.
 --------------------------------------------------------------------------*/
	function checkNewPlaylist(playlist) {
		if (config.active_playlist != playlist) {
			return true;
		} else {
			return false;
		}
	}

	/*--------------------------------------------------------------------------
 	Sets the new song in the config. Sets the src of the audio object,
 	updates the	metadata and sets the active album.
 		@param JSON song The song object of the song we are changing to.
 	@param int index The index of the song in the songs object we are changing.
 --------------------------------------------------------------------------*/
	function setNewSong(song, index) {
		config.active_song.src = song.url;
		config.active_metadata = song;
		config.active_album = song.album;
		config.active_index = index;
	}

	/*--------------------------------------------------------------------------
 	Shuffles individual songs in the config
 		Based off of: http://www.codinghorror.com/blog/2007/12/the-danger-of-naivete.html
 --------------------------------------------------------------------------*/
	function shuffleSongs() {
		/*
  	Builds a temporary array with the length of the config.
  */
		var shuffleTemp = new Array(config.songs.length);

		/*
  	Set the temporary array equal to the songs array.
  */
		for (var i = 0; i < config.songs.length; i++) {
			shuffleTemp[i] = config.songs[i];
			shuffleTemp[i].original_index = i;
		}

		/*
  	Iterate ove rthe songs and generate random numbers to
  	swap the indexes of the shuffle array.
  */
		for (var i = config.songs.length - 1; i > 0; i--) {
			var randNum = Math.floor(Math.random() * config.songs.length + 1);
			shuffleSwap(shuffleTemp, i, randNum - 1);
		}

		/*
  	Set the shuffle list to the shuffle temp.
  */
		config.shuffle_list = shuffleTemp;
	}

	/*--------------------------------------------------------------------------
 	Shuffle songs in a playlist
 		@param string playlist The playlist we are shuffling.
 --------------------------------------------------------------------------*/
	function shufflePlaylistSongs(playlist) {
		/*
  	Builds a temporary array with the length of the playlist songs.
  */
		var shuffleTemp = new Array(config.playlists[playlist].length);

		/*
  	Set the temporary array equal to the playlist array.
  */
		for (var i = 0; i < config.playlists[playlist].length; i++) {
			shuffleTemp[i] = config.songs[config.playlists[playlist][i]];
			shuffleTemp[i].original_index = i;
		}

		/*
  	Iterate ove rthe songs and generate random numbers to
  	swap the indexes of the shuffle array.
  */
		for (var i = config.playlists[playlist].length - 1; i > 0; i--) {
			var randNum = Math.floor(Math.random() * config.playlists[playlist].length + 1);
			shuffleSwap(shuffleTemp, i, randNum - 1);
		}

		/*
  	Set the shuffle list to the shuffle temp.
  */
		config.shuffled_playlists[playlist] = shuffleTemp;
	}

	/*--------------------------------------------------------------------------
 	Swaps and randomizes the song shuffle.
 		@param JSON shuffleList The list of songs that is going to
 	be shuffled
 		@param int original The original index of the song in the
 	songs array.
 		@param int random The randomized index that will be the
 	new index of the song in the shuffle array.
 --------------------------------------------------------------------------*/
	function shuffleSwap(shuffleList, original, random) {
		var temp = shuffleList[original];
		shuffleList[original] = shuffleList[random];
		shuffleList[random] = temp;
	}

	/*--------------------------------------------------------------------------
 	Sets the active playlist
 		@param string playlist The string of the playlist being
 	set to active.
 --------------------------------------------------------------------------*/
	function setActivePlaylist(playlist) {
		if (config.active_playlist != playlist) {
			runCallback('playlist_changed');
		}

		config.active_playlist = playlist;
	}

	/*--------------------------------------------------------------------------
 	Determines if the string passed in is a URL or not
 		@param string url The string we are testing to see if it's a URL.
 --------------------------------------------------------------------------*/
	function isURL(url) {
		var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

		return pattern.test(url);
	}

	/*--------------------------------------------------------------------------
 	Determines if what is passed in is an integer or not.
 		@param string int The variable we are testing to see is an integer or not.
 --------------------------------------------------------------------------*/
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

/*
|----------------------------------------------------------------------------------------------------
| VISUAL SYNC METHODS
|----------------------------------------------------------------------------------------------------
| These methods sync visual displays with what is happening in Amplitude
|
| Method Prefix: privateVisualSync
|
| METHODS
|	syncCurrentTime( currentTime, completionPercentage )
|	resetTimes()
|	resetSongSliders()
|	setActiveContainer()
|	displaySongMetadata()
|	syncPlaybackSpeed()
| 	syncVolumeSliders()
| 	setPlayPauseButtonsToPause()
| 	syncMainPlayPause( state )
|	syncPlaylistPlayPause( playlist, state )
| 	syncSongPlayPause( playlist, song, state )
| 	syncRepeat()
*/
var AmplitudeVisualSync = function () {
	/*--------------------------------------------------------------------------
 	Visually displays the current time on the screen. This is called on
 	time update for the current song.
 		@param JSON currentTime An object containing the current time for the
 	song in seconds, minutes, and hours.
 		@param float completionPercentage The percent of the way through the song
 	the user is at.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Visually sync all of the times to the initial time of 0. This is so
 	we can keep all the players in sync
 --------------------------------------------------------------------------*/
	function resetTimes() {
		_helpers2.default.resetCurrentHours();
		_helpers2.default.resetCurrentMinutes();
		_helpers2.default.resetCurrentSeconds();
		_helpers2.default.resetCurrentTime();
	}

	/*--------------------------------------------------------------------------
 	Visually syncs the song sliders back to 0. This usually happens when
 	a song has changed, we ensure that all song sliders get reset.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Sets all of the song buffered progress bars to 0
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Sets all of the song played progress bars to 0
 --------------------------------------------------------------------------*/
	function resetSongPlayedProgressBars() {
		var songPlayedProgressBars = document.getElementsByClassName("amplitude-song-played-progress");

		for (var i = 0; i < songPlayedProgressBars.length; i++) {
			songPlayedProgressBars[i].value = 0;
		}
	}

	/*--------------------------------------------------------------------------
 	Applies the class 'amplitude-active-song-container' to the element
 	containing visual information regarding the active song.
 --------------------------------------------------------------------------*/
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
				var songContainers = document.querySelectorAll('.amplitude-song-container[amplitude-song-index="' + _config2.default.active_index + '"]');

				for (i = 0; i < songContainers.length; i++) {
					if (!songContainers[i].hasAttribute('amplitude-playlist')) {
						songContainers[i].classList.add('amplitude-active-song-container');
					}
				}
			}
		} else {
			if (document.querySelectorAll('.amplitude-song-container[amplitude-song-index="' + _config2.default.active_index + '"][amplitude-playlist="' + _config2.default.active_playlist + '"]')) {
				var songContainers = document.querySelectorAll('.amplitude-song-container[amplitude-song-index="' + _config2.default.active_index + '"][amplitude-playlist="' + _config2.default.active_playlist + '"]');

				for (i = 0; i < songContainers.length; i++) {
					songContainers[i].classList.add('amplitude-active-song-container');
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
 	Displays the active song's metadata. This is called after a song has
 	been changed. This method takes the active song and displays the
 	metadata. So once the new active song is set, we update all of the
 	screen elements.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Sets all of the visual playback speed buttons to have the right class
 	to display the background image that represents the current playback
 	speed.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Visually syncs the volume sliders so they are all the same if there
 	are more than one.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Sets all of the play pause buttons to paused.
 --------------------------------------------------------------------------*/
	function setPlayPauseButtonsToPause() {
		var playPauseElements = document.querySelectorAll('.amplitude-play-pause');

		for (var i = 0; i < playPauseElements.length; i++) {
			_helpers2.default.setElementPause(playPauseElements[i]);
		}
	}

	/*--------------------------------------------------------------------------
 	Syncs the main play pause buttons to the state of the active song.
 		@param string state The state of the player.
 --------------------------------------------------------------------------*/
	function syncMainPlayPause(state) {
		if (typeof state != "string") state = _config2.default.active_song.paused ? "paused" : "playing";
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

	/*--------------------------------------------------------------------------
 	Syncs the main playlist play pause buttons to the state of the active song.
 		@param string playlist The playlist we are setting the play pause state
 	for.
 		@param string state Either playing or paused for the state of the
 	active song.
 --------------------------------------------------------------------------*/
	function syncPlaylistPlayPause(playlist, state) {

		if (typeof state != "string") state = _config2.default.active_song.paused ? "paused" : "playing";
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

	/*--------------------------------------------------------------------------
 	Syncs the song play pause buttons to the state of the active song.
 		@param string playlist The playlist we are setting the play pause state
 	for.
 		@param int song The index of the song we are syncing the state for
 		@param string state Either playing or paused for the state of the
 	active song.
 --------------------------------------------------------------------------*/
	function syncSongPlayPause(playlist, song, state) {

		if (typeof state != "string") state = _config2.default.active_song.paused ? "paused" : "playing";

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
			var songPlayPauseElements = document.querySelectorAll('.amplitude-play-pause[amplitude-song-index]');

			/*
   	Iterate over all of the individual play pause elements.
   */
			for (var i = 0; i < songPlayPauseElements.length; i++) {
				/*
    	Since we have an active playlist this time, we want any stand alone
    	songs to be set to paused since the scope is within a playlist.
    		We check to see if the element has an amplitude-playlist attribute.
    */
				if (songPlayPauseElements[i].hasAttribute('amplitude-playlist')) {

					/*
     	Check to see if the song index matches the index passed in and the
     	playlist matches the scoped playlist we are looking for and the
     	state of the player is playing, then we set the element to play. If those
     	three parameters are not met, set the element to pause.
     */
					if (songPlayPauseElements[i].getAttribute('amplitude-song-index') == song && songPlayPauseElements[i].getAttribute('amplitude-playlist') == playlist && state == 'playing') {
						_helpers2.default.setElementPlay(songPlayPauseElements[i]);
					} else {
						_helpers2.default.setElementPause(songPlayPauseElements[i]);
					}
				} else {
					/*
     	Set any individual songs (songs outside of a playlist scope) to pause
     	since we are in the scope of a playlist.
     */
					_helpers2.default.setElementPause(songPlayPauseElements[i]);
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
 	Syncs repeat for all of the repeat buttons. Users
 	can apply styles to the 'amplitude-repeat-on' and
 	'amplitude-repeat-off' classes. They represent the state
 	of the player.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Syncs mute for all of the mute buttons. This represents the
 	state of the player if it's muted or not.
 		@param 	string	state The muted state of the player.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Syncs the global shuffle button visual state.
 		@param 	bool state The shuffled state of the player.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Syncs the playlist shuffle button visual state.
 		@param 	bool state The shuffled state of the player.
 	@param 	string	playlist The playlist string the shuffle button belongs to.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Syncs the main slider location
 		@param 	int 	location The location of the song as a percentage.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Syncs playlist song slider locations
 		@param 	string	playlist The playlist we are setting the song slider for.
 	@param 	int 	location The location of the song as a percentage.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Syncs individual song slider locations
 		@param 	string	playlist The playlist we are setting the song slider for.
 	@param 	int 	songIndex The index of the song we are adjusting the song slider for.
 	@param 	int 	location The location of the song as a percentage.
 --------------------------------------------------------------------------*/
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
			var songSliders = document.querySelectorAll('.amplitude-song-slider[amplitude-song-index="' + songIndex + '"]');

			/*
   	Iterats over all of the song sliders that have the index of
   	the song we are sliding. If the song doesn't have a playlist
   	attribute, we set the location.
   */
			for (var i = 0; i < songSliders.length; i++) {
				if (!songSliders[i].hasAttribute('amplitude-playlist')) {
					if (location != 0) {
						songSliders[i].value = location;
					}
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
 	Sets the volume slider location
 		@param 	int volume The volume from 0 - 1 for song volume.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Syncs the song's duration
 		@param 	songDuration 	Object containing information about the duration
 		of the song
 --------------------------------------------------------------------------*/
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

	/*
 	Returns the publically available functions
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
		syncMute: syncMute,
		syncShuffle: syncShuffle,
		syncPlaylistShuffle: syncPlaylistShuffle,
		syncMainSliderLocation: syncMainSliderLocation,
		syncPlaylistSliderLocation: syncPlaylistSliderLocation,
		syncSongSliderLocation: syncSongSliderLocation,
		syncVolumeSliderLocation: syncVolumeSliderLocation,
		syncSongDuration: syncSongDuration
	};
}();

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

/*
|----------------------------------------------------------------------------------------------------
| CORE FUNCTIONAL METHODS
|----------------------------------------------------------------------------------------------------
| Interacts directly with native functions of the Audio element. Logic
| leading up to these methods are handled by click handlers which call
| helpers and visual synchronizers. These are the core functions of AmplitudeJS.
| Every other function that leads to these prepare the information to be
| acted upon by these functions.
|
| METHODS
|	play()
|	pause()
|	stop()
|	setVolume( volumeLevel )
|	setSongLocation( songPercentage )
|	disconnectStream()
|	reconnectStream()
|	playNow()
| 	setPlaybackSpeed()
*/
var AmplitudeCore = function () {
	/*--------------------------------------------------------------------------
 	Plays the active song. If the current song is live, it reconnects
 	the stream before playing.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Pauses the active song. If it's live, it disconnects the stream.
 --------------------------------------------------------------------------*/
	function pause() {
		_helpers2.default.runCallback('before_pause');
		/*
  	Pause the active song.
  */
		_config2.default.active_song.pause();

		/*
  	Flag that pause button was clicked.
  */
		_config2.default.paused = true;

		if (_config2.default.active_metadata.live) {
			disconnectStream();
		}
		_helpers2.default.runCallback('after_pause');
	}

	/*--------------------------------------------------------------------------
 	Stops the active song by setting the current song time to 0.
 	When the user resumes, it will be from the beginning.
 	If it's a live stream it disconnects.
 --------------------------------------------------------------------------*/
	function stop() {
		_helpers2.default.runCallback('before_stop');

		if (_config2.default.active_song.currentTime != 0) {
			_config2.default.active_song.currentTime = 0;
		}

		_config2.default.active_song.pause();

		if (_config2.default.active_metadata.live) {
			disconnectStream();
		}

		_helpers2.default.runCallback('after_stop');
	}

	/*--------------------------------------------------------------------------
 	Sets the song volume.
 		@param int volumeLevel A number between 1 and 100 as a percentage of
 	min to max for a volume level.
 --------------------------------------------------------------------------*/
	function setVolume(volumeLevel) {
		/*
  	If the volume is set to mute somewhere else, we sync the display.
  */
		if (volumeLevel == 0) {
			_visual2.default.syncMute(true);
		} else {
			_visual2.default.syncMute(false);
		}

		_config2.default.active_song.volume = volumeLevel / 100;
	}

	/*--------------------------------------------------------------------------
 	Sets the song percentage. If it's a live song, we ignore this because
 	we can't skip ahead. This is an issue if you have a playlist with
 	a live source.
 		@param int songPercentage A number between 1 and 100 as a percentage of
 	song completion.
 --------------------------------------------------------------------------*/
	function setSongLocation(songPercentage) {
		if (!_config2.default.active_metadata.live) {
			_config2.default.active_song.currentTime = _config2.default.active_song.duration * (song_percentage / 100);
		}
	}

	/*--------------------------------------------------------------------------
 	Skips to a location in a song
 		@param int seconds An integer containing the seconds to skip to
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Disconnects the live stream
 --------------------------------------------------------------------------*/
	function disconnectStream() {
		_config2.default.active_song.src = '';
		_config2.default.active_song.load();
	}

	/*--------------------------------------------------------------------------
 	Reconnects the live stream
 --------------------------------------------------------------------------*/
	function reconnectStream() {
		_config2.default.active_song.src = _config2.default.active_metadata.url;
		_config2.default.active_song.load();
	}

	/*--------------------------------------------------------------------------
 	When you pass a song object it plays that song right awawy.  It sets
 	the active song in the config to the song you pass in and synchronizes
 	the visuals.
 		Public Accessor: Amplitude.playNow( song_json )
 		@param song JSON representation of a song.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Sets the playback speed for the song.
 		@param float playbackSpeed The speed we want the song to play back at.
 --------------------------------------------------------------------------*/
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
		setPlaybackSpeed: setPlaybackSpeed
	};
}();

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
| bindProgress()
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

/*
|-------------------------------------------------------------------------------
| EVENT HANDLER HELPER METHODS
|-------------------------------------------------------------------------------
| These methods help handle interactions whether it's computation or shuffling
| songs.
|
| METHODS
|	computeCurrentTimes()
|	computeSongDuration()
|	computeSongCompletionPercentage()
*/
var AmplitudeEventHelpers = function () {
	/*--------------------------------------------------------------------------
 	Computes the current song time. Breaks down where the song is into
 	hours, minutes, seconds and formats it to be displayed to the user.
 --------------------------------------------------------------------------*/
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
		if (currentMinutes > 60) {
			currentHours = Math.floor(currentMinutes / 60);
			currentMinutes = currentMinutes % 60;

			/*
   	If the user is less than 10 hours in, we append the
   	additional 0 to the hours.
   */
			if (currentHours < 10) {
				currentHours = '0' + currentHours;
			}

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

	/*--------------------------------------------------------------------------
 	Computes the current song duration. Breaks down where the song is into
 	hours, minutes, seconds and formats it to be displayed to the user.
 --------------------------------------------------------------------------*/
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
		var songDurationHours = '00';

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
		if (songDurationMinutes > 60) {
			songDurationHours = Math.floor(songDurationMinutes / 60);
			songDurationMinutes = songDurationMinutes % 60;

			/*
   	If the song duration hours is less than 10 we append
   	the additional 0.
   */
			if (songDurationHours < 10) {
				songDurationHours = '0' + songDurationHours;
			}

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

	/*--------------------------------------------------------------------------
 	Computes the song completion percentage.
 --------------------------------------------------------------------------*/
	function computeSongCompletionPercentage() {
		return _config2.default.active_song.currentTime / _config2.default.active_song.duration * 100;
	}

	/*--------------------------------------------------------------------------
 	Sets the current song's playback speed
 		@param float speed The float with a base of 1 representing the speed
 --------------------------------------------------------------------------*/
	function setPlaybackSpeed(speed) {
		_core2.default.setPlaybackSpeed(speed);
	}

	/*--------------------------------------------------------------------------
 	Sets the state of the repeat for the current song.
 		@param bool repeat A boolean representing whether the repeat should
 	be on or off
 --------------------------------------------------------------------------*/
	function setRepeat(repeat) {
		_config2.default.repeat = repeat;
	}

	/*--------------------------------------------------------------------------
 	Sets the main play pause buttons to the current state of the song.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Sets the playlist main play pause buttons to the current state of the song.
 		@param string playlist The playlist the main play pause button controls
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Sets the song play pause buttons to the current state of the song.
 		@param string playlist The playlist the song is a part of
 	@param int songIndex The index of the song being played/paused
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Sets the shuffle state for a playlist
 		@param string playlist The playlist being shuffled
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Sets the next song when next is clicked
 		@param songEnded (default false) If the song ended, this is set to true
 	so we take into effect the repeat setting.
 --------------------------------------------------------------------------*/
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
	}

	/*--------------------------------------------------------------------------
 	Sets the next song in a playlist
 		@param string playlist The playlist being shuffled
 	@param songEnded (default false) If the song ended, this is set to true
 	so we take into effect the repeat setting.
 --------------------------------------------------------------------------*/
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

		/*
  	Stops the active song playing.
  */

		_core2.default.stop();

		/*
  	Changes the song to the next song in the playlist.
  */
		_helpers2.default.changeSong(nextIndex);
		_helpers2.default.setActivePlaylist(playlist);

		/*
  	If the song has ended and repeat is on, play the song.
  */
		if (!(songEnded && !_config2.default.repeat && endOfList)) _core2.default.play();

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
	}

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

	/*--------------------------------------------------------------------------
 	Sets the previous song in a playlist
 		@param	string	The Playlist we are setting the previous for.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Runs an event on key down
 		@param 	int key The key code the event is bound to.
 --------------------------------------------------------------------------*/
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
						AmplitudeEventHelpers.setPrev();
					} else {
						AmplitudeEventHelpers.setPrevPlaylist(_config2.default.active_playlist);
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
						AmplitudeEventHelpers.setShuffle(null);
					} else {
						AmplitudeEventHelpers.setShuffle(_config2.default.active_playlist);
					}
					break;

				/*
    	Fires a repeat event.
    */
				case 'repeat':
					/*
     	Sets repeat to the opposite of what it was set to
     */
					AmplitudeEventHelpers.setRepeat(!_config2.default.repeat);

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

exports.default = AmplitudeEventHelpers;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var config = __webpack_require__(0);

/*
|----------------------------------------------------------------------------------------------------
| INITIALIZER FOR AMPLITUDE JS
|----------------------------------------------------------------------------------------------------
| These methods initialize AmplitudeJS and make sure everything is ready to run
|
| METHODS
|	initialize( userConfig )
|	countPlaylists( playlists )
|	checkValidSongsInPlaylists()
|	playlistShuffleStatuses()
|	playlistShuffleLists()
|	eventHandlers()
*/
var AmplitudeInitializer = function () {

	/*--------------------------------------------------------------------------
 	The main init function.  The user will call this through
 	Amplitude.init({}) and pass in their settings.
 		Public Accessor: Amplitude.init( user_config_json );
 	 	@param userConfig A JSON object of user defined values that help
  	configure and initialize AmplitudeJS.
 --------------------------------------------------------------------------*/
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
		config.debug = userConfig.debug != undefined ? userConfig.debug : false;

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
				config.songs = userConfig.songs;
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

		/*
  	Initializes the audio context. In this method it checks to see if the
  	user wants to use visualizations or not before proceeding.
  	AMPFX-TODO: MAKE HANDLED BY AMPLITUDE FX.
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
			config.playlists = userConfig.playlists;

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
			config.soundcloud_client = userConfig.soundcloud_client != undefined ? userConfig.soundcloud_client : '';

			/*
   	Checks if we want to use the art loaded from soundcloud.
   */
			config.soundcloud_use_art = userConfig.soundcloud_use_art != undefined ? userConfig.soundcloud_use_art : '';

			/*
   	If the user provides a soundcloud client then we assume that
   	there are URLs in their songs that will reference SoundcCloud.
   	We then copy over the user config they provided to the
   	temp_user_config so we don't mess up the global or their configs
   	and load the soundcloud information.
   */
			var tempUserConfig = {};

			if (config.soundcloud_client != '') {
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
		_helpers2.default.writeDebugMessage(config);
	}

	/*--------------------------------------------------------------------------
 	Rebinds all of the elements in the display
 --------------------------------------------------------------------------*/
	function rebindDisplay() {
		_events2.default.initializeEvents();
		_visual2.default.displaySongMetadata();
	}

	/*--------------------------------------------------------------------------
 	Finishes the initalization of the config. Takes all of the user defined
 	parameters and makes sure they override the defaults. The important
 	config information is assigned in the publicInit() function.
 		This function can be called from 2 different locations:
 		1. Right away on init after the important settings are defined.
 			2. After all of the Soundcloud URLs are resolved properly and
 		soundcloud is configured.  We will need the proper URLs from Soundcloud
 		to stream through Amplitude so we get those right away before we
 		set the information and the active song
 		@param JSON userConfig The config provided by the user.
 --------------------------------------------------------------------------*/
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

		config.continue_next = userConfig.continue_next != undefined ? userConfig.continue_next : true;

		/*
  	If the user defined a playback speed, we copy over their
  	preference here, otherwise we default to normal playback
  	speed of 1.0.
  */
		config.playback_speed = userConfig.playback_speed != undefined ? userConfig.playback_speed : 1.0;

		/*
  	Sets the audio playback speed.
  */
		_core2.default.setPlaybackSpeed(config.playback_speed);

		/*
  	If the user wants the song to be pre-loaded for instant
  	playback, they set it to true. By default it's set to just
  	load the metadata.
  */
		config.active_song.preload = userConfig.preload != undefined ? userConfig.preload : "auto";

		/*
  	Initializes the user defined callbacks. This should be a JSON
  	object that contains a key->value store of the callback name
  	and the name of the function the user needs to call.
  */
		config.callbacks = userConfig.callbacks != undefined ? userConfig.callbacks : {};

		/*
  	Initializes the user defined key bindings. This should be a JSON
  	object that contains a key->value store of the key event number
  	pressed and the method to be run.
  */
		config.bindings = userConfig.bindings != undefined ? userConfig.bindings : {};

		/*
  	The user can define a starting volume in a range of 0-100 with
  	0 being muted and 100 being the loudest. After the config is set
  	Amplitude sets the active song's volume to the volume defined
  	by the user.
  */
		config.volume = userConfig.volume != undefined ? userConfig.volume : 50;

		/*
  	The user can set the volume increment and decrement values between 1 and 100
  	for when the volume up or down button is pressed.  The default is an increase
  	or decrease of 5.
  */
		config.volume_increment = userConfig.volume_increment != undefined ? userConfig.volume_increment : 5;

		config.volume_decrement = userConfig.volume_decrement != undefined ? userConfig.volume_decrement : 5;

		/*
  	Set the volume to what is defined in the config. The user can define this,
  	so we should set it up that way.
  */
		_core2.default.setVolume(config.volume);

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
			config.default_album_art = userConfig.default_album_art;
		} else {
			config.default_album_art = '';
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
  	If the user has autoplay enabled, then begin playing the song. Everything should
  	be configured for this to be ready to play.
  */
		if (userConfig.autoplay) {
			config.active_playlist = null;
			/*
   	Sync the main and song play pause buttons.
   */
			_visual2.default.syncMainPlayPause('playing');
			_visual2.default.syncSongPlayPause(null, 0, 'playing');

			/*
   	Start playing the song
   */
			_core2.default.play();
		}

		/*
  	Run after init callback
  */
		_helpers2.default.runCallback('after_init');
	}

	/*--------------------------------------------------------------------------
 	Counts the number of playlists the user has configured. This ensures
 	that the user has at least 1 playlist so we can validate the songs
 	defined in the playlist are correct and they didn't enter an invalid
 	ID.
 --------------------------------------------------------------------------*/
	function countPlaylists(playlists) {
		/*
  	Initialize the placeholders to iterate through the playlists
  	and find out how many we have to account for.
  */
		var size = 0,
		    key;

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

	/*--------------------------------------------------------------------------
 	Ensures the indexes in the playlists are valid indexes. The song has
 	to exist in the Amplitude config to be played correctly.
 --------------------------------------------------------------------------*/
	function checkValidSongsInPlaylists() {
		/*
  	Iterate over all of the config's playlists
  */
		for (var key in config.playlists) {
			/*
   	Checks if the playlist key is accurate.
   */
			if (config.playlists.hasOwnProperty(key)) {
				/*
    	Checks if the playlist has songs.
    */
				if (config.playlists[key].songs) {
					/*
     	Iterate over all of the songs in the playlist
     */
					for (var i = 0; i < config.playlists[key].songs.length; i++) {
						/*
      	Check to see if the index for the song in the playlist
      	exists in the songs config.
      */
						if (!config.songs[config.playlists[key].songs[i]]) {
							_helpers2.default.writeDebugMessage('The song index: ' + config.playlists[key].songs[i] + ' in playlist with key: ' + key + ' is not defined in your songs array!');
						}
					}
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
 	Initializes the shuffle statuses for each of the playlists. These will
 	be referenced when we shuffle individual playlists.
 --------------------------------------------------------------------------*/
	function initializePlaylistShuffleStatuses() {
		/*
  	Iterate over all of the playlists the user defined adding
  	the playlist key to the shuffled playlist array and creating
  	and empty object to house the statuses.
  */
		for (var key in config.playlists) {
			config.shuffled_statuses[key] = false;
		}
	}

	/*--------------------------------------------------------------------------
 	Initializes the shuffled playlist placeholders. These will be set for
 	playlists that are shuffled and contain the shuffled songs.
 --------------------------------------------------------------------------*/
	function initializePlaylistShuffleLists() {
		/*
  	Iterate over all of the playlists the user defined adding
  	the playlist key to the shuffled playlists array and creating
  	and empty object to house the shuffled playlists
  */
		for (var key in config.playlists) {
			config.shuffled_playlists[key] = [];
		}
	}

	/*--------------------------------------------------------------------------
 	Initializes the shuffled playlist indexes array. These will be set for
 	playlists that are shuffled and contain the active shuffled index.
 --------------------------------------------------------------------------*/
	function initializePlaylistShuffleIndexes() {
		/*
  	Iterates over all of the playlists adding a key
  	to the shuffled_active_indexes array that contains
  	the active shuffled index.
  */
		for (var key in config.playlists) {
			config.shuffled_active_indexes[key] = 0;
		}
	}

	/*--------------------------------------------------------------------------
 	Intializes the display for the first song in the playlist meta data.
 --------------------------------------------------------------------------*/
	function initializeFirstSongInPlaylistMetaData() {
		/*
  	Iterates over all of the playlists setting the meta data for the
  	first song.
  */
		for (var key in config.playlists) {
			_visual2.default.setFirstSongInPlaylist(config.songs[config.playlists[key][0]], key);
		}
	}

	/*--------------------------------------------------------------------------
 	Intializes the default live settings for all of the songs.
 --------------------------------------------------------------------------*/
	function initializeDefaultLiveSettings() {
		for (var i = 0; i < config.songs.length; i++) {
			if (config.songs[i].live == undefined) {
				config.songs[i].live = false;
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

/*
|-------------------------------------------------------------------------------
| EVENT HANDLER FUNCTIONS
|-------------------------------------------------------------------------------
| These functions handle the events that we bound to each element and
| prepare for a function to be called. These kind of act like filters/middleware.
|
| METHODS
|	updateTime()
|	songEnded()
|	play()
|	pause()
|	playPause()
|	stop()
|	mute()
|	volumeUp()
|	volumeDown()
|	songSlider()
|	volumeSlider()
|	next()
|	prev()
|	shuffle()
|	repeat()
|	playbackSpeed()
|	skipTo()
*/
exports.default = {
	/*--------------------------------------------------------------------------
 	HANDLER FOR: timeupdate
 		When the time updates on the active song, we sync the current time displays
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	HANDLER FOR: keydown
 		When the keydown event is fired, we determine which function should be run
 	based on what was passed in.
 --------------------------------------------------------------------------*/
	keydown: function keydown() {
		_helpers2.default.runKeyEvent(event.which);
	},

	/*--------------------------------------------------------------------------
 	HANDLER FOR: ended
 		When the song has ended, handles what to do next
 --------------------------------------------------------------------------*/
	songEnded: function songEnded() {
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
	},

	/*--------------------------------------------------------------------------
 	HANDLER FOR: progress
 		As the song is buffered, we can display the buffered percentage in
 	a progress bar.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	HANDLER FOR: 'amplitude-play'
 		Handles an event on a play button in Amplitude.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	HANDLER FOR: 'amplitude-pause'
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	HANDLER FOR: 'amplitude-play-pause'
 		Handles an event on a play pause button.
 --------------------------------------------------------------------------*/
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
				var playlist = this.getAttribute('amplitude-playlist');
				var songIndex = this.getAttribute('amplitude-song-index');

				_helpers2.default.setSongPlayPause(playlist, songIndex);
			}
		}
	},

	/*--------------------------------------------------------------------------
 	HANDLER FOR: 'amplitude-stop'
 		Handles an event on a stop element.
 		AMP-FX TODO: Before stopping, make sure that AmplitudeFX visualization
 	is stopped as well.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	HANDLER FOR: 'amplitude-mute'
 		Handles an event on a mute element.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	HANDLER FOR: 'amplitude-volume-up'
 		Handles a click on a volume up element.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	HANDLER FOR: 'amplitude-volume-down'
 		Handles a click on a volume down element.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	HANDLER FOR: 'amplitude-song-slider'
 		Handles a change on the song slider
 --------------------------------------------------------------------------*/
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

			var playlist = this.getAttribute('amplitude-playlist');
			var songIndex = this.getAttribute('amplitude-song-index');

			if (_config2.default.active_index == songIndex) {
				/*
    	If the active song is not live, set the current time
    */
				if (!_config2.default.active_metadata.live) {
					_config2.default.active_song.currentTime = _config2.default.active_song.duration * (locationPercentage / 100);
				}

				_visual2.default.syncMainSliderLocation();

				if (_config2.default.active_playlist != '' && _config2.default.active_playlist != null && _config2.default.active_playlist == playlist) {
					_visual2.default.syncPlaylistSliderLocation(playlist, location);
				}

				_visual2.default.syncSongSliderLocation(playlist, songIndex, location);
			}
		}
	},

	/*--------------------------------------------------------------------------
 	HANDLER FOR: 'amplitude-volume-slider'
 		Handles a change on the volume slider
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	HANDLER FOR: 'amplitude-next'
 		Handles an event on the next button
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	HANDLER FOR: 'amplitude-prev'
 		Handles an event on the previous button
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	HANDLER FOR: 'amplitude-shuffle'
 		Handles an event on the shuffle button
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	HANDLER FOR: 'amplitude-repeat'
 		Handles an event on the repeat button
 --------------------------------------------------------------------------*/
	repeat: function repeat() {
		if (!_config2.default.is_touch_moving) {
			/*
   	Sets repeat to the opposite of what it was set to
   */
			_helpers2.default.setRepeat(!_config2.default.repeat);

			/*
   	Visually sync repeat
   */
			_visual2.default.syncRepeat();
		}
	},

	/*--------------------------------------------------------------------------
 	HANDLER FOR: 'amplitude-playback-speed'
 		Handles an event on the playback speed button
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	HANDLER FOR: 'amplitude-skip-to'
 		Handles an event on a skip to button.
 --------------------------------------------------------------------------*/
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
				var seconds = parseInt(this.getAttribute('amplitude-location'));
				var songIndex = parseInt(this.getAttribute('amplitude-song-index'));

				/*
    	Changes the song to where it's being skipped and then
    	play the song.
    */
				_helpers4.default.changeSong(songIndex);
				_core2.default.play();

				_visual2.default.syncMainPlayPause('playing');
				_visual2.default.syncSongPlayPause(null, songIndex, 'playing');

				/*
    	Skip to the location in the song.
    */
				_core2.default.skipToLocation(seconds);
			}
		}
	}
};
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

/*
	Amplitude should just be an interface to the public functions.
	Everything else should be handled by other objects
*/

var Amplitude = function () {
	/*--------------------------------------------------------------------------
 	The main init function.  The user will call this through
 	Amplitude.init({}) and pass in their settings.
 		Public Accessor: Amplitude.init( user_config_json );
 	 	@param user_config A JSON object of user defined values that help
  	configure and initialize AmplitudeJS.
 --------------------------------------------------------------------------*/
	function init(userConfig) {
		_init2.default.initialize(userConfig);
	}

	/*--------------------------------------------------------------------------
 	Binds new elements that were added to the page.
 --------------------------------------------------------------------------*/
	function bindNewElements() {
		_init2.default.rebindDisplay();
	}

	/*--------------------------------------------------------------------------
 	Returns the active playlist
 --------------------------------------------------------------------------*/
	function getActivePlaylist() {
		return _config2.default.active_playlist;
	}

	/*--------------------------------------------------------------------------
 	Returns the current playback speed
 --------------------------------------------------------------------------*/
	function getPlaybackSpeed() {
		return _config2.default.playback_speed;
	}

	/*--------------------------------------------------------------------------
 	Gets the repeat state of the player.
 --------------------------------------------------------------------------*/
	function getRepeat() {
		return _config2.default.repeat;
	}

	/*--------------------------------------------------------------------------
 	Returns the shuffle state of the player.
 --------------------------------------------------------------------------*/
	function getShuffle() {
		return _config2.default.shuffle_on;
	}

	/*--------------------------------------------------------------------------
 	Returns the shuffle state of the playlist.
 		@param playlist The key representing the playlist ID to see if it's shuffled
 	or not.
 --------------------------------------------------------------------------*/
	function getShufflePlaylist(playlist) {
		return _config2.default.shuffled_statuses[playlist];
	}

	/*--------------------------------------------------------------------------
 	Gets the default album art for the player
 --------------------------------------------------------------------------*/
	function getDefaultAlbumArt() {
		return _config2.default.default_album_art;
	}

	/*--------------------------------------------------------------------------
 	Sets the default album art for the player
 		@param url A string representing the URL of the new default album art.
 --------------------------------------------------------------------------*/
	function setDefaultAlbumArt(url) {
		_config2.default.default_album_art = url;
	}

	/*--------------------------------------------------------------------------
 	Allows the user to get the percentage of the song played.
 		Public Accessor: Amplitude.getSongPlayedPercentage();
 --------------------------------------------------------------------------*/
	function getSongPlayedPercentage() {
		/*
  	Returns the percentage of the song played.
  */
		return _config2.default.active_song.currentTime / _config2.default.active_song.duration * 100;
	}

	/*--------------------------------------------------------------------------
 	Allows the user to set how far into the song they want to be. This is
 	helpful for implementing custom range sliders. Only works on the current song.
 		Public Accessor: Amplitude.setSongPlayedPercentage( float );
 	 	@param Float percentage The percentage of the song played
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Allows the user to turn on debugging.
 		Public Accessor: Amplitude.setDebug( bool );
 	 	@param BOOL state Turns debugging on and off.
 --------------------------------------------------------------------------*/
	function setDebug(state) {
		/*
  	Sets the global config debug on or off.
  */
		_config2.default.debug = state;
	}

	/*--------------------------------------------------------------------------
 	Returns the active song meta data for the user to do what is
 	needed.
 		Public Accessor: Amplitude.getActiveSongMetadata();
 	 	@returns JSON Object with the active song information
 --------------------------------------------------------------------------*/
	function getActiveSongMetadata() {
		return _config2.default.active_metadata;
	}

	/*--------------------------------------------------------------------------
 	Returns a song in the songs array at that index
 		Public Accessor: Amplitude.getSongByIndex( song_index )
 		@param int index The integer for the index of the
 	song in the songs array.
 		@returns JSON representation for the song at a specific index.
 --------------------------------------------------------------------------*/
	function getSongByIndex(index) {
		return _config2.default.songs[index];
	}

	/*--------------------------------------------------------------------------
 	Returns a song at a playlist index
 		Public Accessor: Amplitude.getSongAtPlaylistIndex( playlist, index
 		@param 	int 	index The integer for the index of the
 	song in the playlist.
 		@param 	string	playlist The key of the playlist we are getting the song
 	at the index for
 		@returns JSON representation for the song at a specific index.
 --------------------------------------------------------------------------*/
	function getSongAtPlaylistIndex(playlist, index) {
		var songIndex = _config2.default.playlists[playlist][index];

		return _config2.default.songs[songIndex];
	}

	/*--------------------------------------------------------------------------
 	Adds a song to the end of the config array.  This will allow Amplitude
 	to play the song in a playlist type setting.
 		Public Accessor: Amplitude.addSong( song_json )
 		@param song JSON representation of a song.
 		@returns int New index of the song.
 --------------------------------------------------------------------------*/
	function addSong(song) {
		/*
  	Ensures we have a songs array to push to.
  */
		if (_config2.default.songs == undefined) {
			_config2.default.songs = [];
		}

		_config2.default.songs.push(song);
		return _config2.default.songs.length - 1;
	}

	/*--------------------------------------------------------------------------
 	When you pass a song object it plays that song right awawy.  It sets
 	the active song in the config to the song you pass in and synchronizes
 	the visuals.
 		Public Accessor: Amplitude.playNow( song )
 		@param song JSON representation of a song.
 --------------------------------------------------------------------------*/
	function playNow(song) {
		_core2.default.playNow(song);
	}

	/*
 	TODO: Implement Add Song To Playlist Functionality
 */
	function addSongToPlaylist(song, playlist) {}

	/*--------------------------------------------------------------------------
 	Allows the user to play whatever the active song is directly
 	through Javascript. Normally ALL of Amplitude functions that access
 	the core features are called through event handlers.
 		Public Accessor: Amplitude.play();
 --------------------------------------------------------------------------*/
	function play() {
		_core2.default.play();
	}

	/*--------------------------------------------------------------------------
 	Allows the user to pause whatever the active song is directly
 	through Javascript. Normally ALL of Amplitude functions that access
 	the core features are called through event handlers.
 		Public Accessor: Amplitude.pause();
 --------------------------------------------------------------------------*/
	function pause() {
		_core2.default.pause();
	}

	/*--------------------------------------------------------------------------
 	Returns the audio object used to play the audio
 		Public Accessor: Amplitude.getAudio();
 --------------------------------------------------------------------------*/
	function getAudio() {
		return _config2.default.active_song;
	}

	/*--------------------------------------------------------------------------
 	Plays the next song either in the playlist or globally.
 		Public Accessor: Amplitude.next( playlist );
 		@param 	string 	playlist The playlist key
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Plays the prev song either in the playlist or globally.
 		Public Accessor: Amplitude.prev( playlist );
 		@param 	string 	playlist The playlist key
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Gets all of the songs in the songs array
 		Public Accessor: Amplitude.getSongs( );
 --------------------------------------------------------------------------*/
	function getSongs() {
		return _config2.default.songs;
	}

	/*--------------------------------------------------------------------------
 	Gets all of the songs in a playlist
 		Public Accessor: Amplitude.getSongsInPlaylist( playlist );
 		@param 	string 	playlist The playlist key
 --------------------------------------------------------------------------*/
	function getSongsInPlaylist(playlist) {
		var songsArray = [];

		for (var i = 0; i < _config2.default.playlist[playlist].length; i++) {
			songsArray.push(_config2.default.songs[i]);
		}

		return songsArray;
	}

	/*--------------------------------------------------------------------------
 	Get current state of songs. If shuffled, this will return the shuffled
 	songs.
 		Public Accessor: Amplitude.getSongsState();
 --------------------------------------------------------------------------*/
	function getSongsState() {
		if (_config2.default.shuffle_on) {
			return _config2.default.shuffle_list;
		} else {
			return _config2.default.songs;
		}
	}

	/*--------------------------------------------------------------------------
 	Get current state of songs in playlist. If shuffled, this will return the
 	shuffled songs.
 		Public Accessor: Amplitude.getSongsStatePlaylist( playlist );
 		@param 	string 	playlist The playlist key
 --------------------------------------------------------------------------*/
	function getSongsStatePlaylist(playlist) {
		var songsArray = [];

		if (_config2.default.shuffled_status[playlist]) {

			for (var i = 0; i < _config2.default.shuffled_playlists[playlist].length; i++) {
				songsArray.push(_config2.default.songs[i]);
			}
		} else {

			for (var i = 0; i < _config2.default.playlist[playlist].length; i++) {
				songsArray.push(_config2.default.songs[i]);
			}
		}

		return songsArray;
	}

	/*--------------------------------------------------------------------------
 	Gets the active index of the player
 		Public Accessor: Amplitude.getActiveIndex()
 --------------------------------------------------------------------------*/
	function getActiveIndex() {
		return parseInt(_config2.default.active_index);
	}

	/*--------------------------------------------------------------------------
 	Gets the active index with respect to the state of the player whether it is
 	shuffled or not.
 		Public Accessor: Amplitude.getActiveIndexState()
 --------------------------------------------------------------------------*/
	function getActiveIndexState() {
		if (_config2.default.shuffle_on) {
			return parseInt(_config2.default.shuffle_active_index);
		} else {
			return parseInt(_config2.default.active_index);
		}
	}

	/*--------------------------------------------------------------------------
 	Get the version of AmplitudeJS
 		Public Accessor: Amplitude.getVersion()
 --------------------------------------------------------------------------*/
	function getVersion() {
		return _config2.default.version;
	}

	/*--------------------------------------------------------------------------
 	Get the buffered amount for the current song
 		Public Accessor: Amplitude.getBuffered()
 --------------------------------------------------------------------------*/
	function getBuffered() {
		return _config2.default.buffered;
	}

	/*--------------------------------------------------------------------------
 	Skip to a certain location in a selected song.
 		Public Accessor: Amplitude.getBuffered()
 --------------------------------------------------------------------------*/
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

	/*
 	Returns all of the publically accesible methods.
 */
	return {
		init: init,
		bindNewElements: bindNewElements,
		getActivePlaylist: getActivePlaylist,
		getPlaybackSpeed: getPlaybackSpeed,
		getRepeat: getRepeat,
		getShuffle: getShuffle,
		getShufflePlaylist: getShufflePlaylist,
		getDefaultAlbumArt: getDefaultAlbumArt,
		setDefaultAlbumArt: setDefaultAlbumArt,
		getSongPlayedPercentage: getSongPlayedPercentage,
		setSongPlayedPercentage: setSongPlayedPercentage,
		setDebug: setDebug,
		getActiveSongMetadata: getActiveSongMetadata,
		getSongByIndex: getSongByIndex,
		getSongAtPlaylistIndex: getSongAtPlaylistIndex,
		addSong: addSong,
		playNow: playNow,
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
		skipTo: skipTo
	};
}(); /*
     	Amplitude.js
     	Version: 	3.2.0
     	Author: 	Dan Pastori
     	Company: 	521 Dimensions
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

/*
|----------------------------------------------------------------------------------------------------
| SOUNDCLOUD
|----------------------------------------------------------------------------------------------------
| These helpers wrap around the basic methods of the Soundcloud API
| and get the information we need from SoundCloud to make the songs
| streamable through Amplitude
*/
var AmplitudeSoundcloud = function () {
	/*
 	Defines the temp user config
 */
	var tempUserConfig = {};

	/*--------------------------------------------------------------------------
 	Loads the soundcloud SDK for use with Amplitude so the user doesn't have
 	to load it themselves.
 	With help from: http://stackoverflow.com/questions/950087/include-a-javascript-file-in-another-javascript-file
 --------------------------------------------------------------------------*/
	function loadSoundCloud(userConfig) {
		tempUserConfig = userConfig;

		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');

		script.type = 'text/javascript';
		/*
  	URL to the remote soundcloud SDK
  */
		script.src = 'https://connect.soundcloud.com/sdk.js';
		script.onreadystatechange = initSoundcloud;
		script.onload = initSoundcloud;

		head.appendChild(script);
	}

	/*--------------------------------------------------------------------------
 	Initializes soundcloud with the key provided.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Gets the streamable URL from the URL provided for
 	all of the soundcloud links.  This will loop through
 	and set all of the information for the soundcloud
 	urls.
 --------------------------------------------------------------------------*/
	function getStreamableURLs() {
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

	/*--------------------------------------------------------------------------
 	Due to Soundcloud SDK being asynchronous, we need to scope the
 	index of the song in another function. The privateGetSoundcloudStreamableURLs
 	function does the actual iteration and scoping.
 --------------------------------------------------------------------------*/
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

/*
|-------------------------------------------------------------------------------
| VISUAL SYNC HELPER METHODS
|-------------------------------------------------------------------------------
| These methods help sync visual displays. They essentially make the visual sync
| methods smaller and more maintainable.
|
| METHODS
|	syncCurrentHours( hours )
|	resetCurrentHours()
|	syncCurrentMinutes( minutes )
|	resetCurrentMinutes()
|	syncCurrentSeconds( seconds )
|	resetCurrentSeconds()
|	syncCurrentTime( currentTime )
| syncCurrentHours( hours )
| syncCurrentMinutes( minutes )
| syncCurrentSeconds( seconds )
| syncCurrentTime( time )
|	resetCurrentTime()
|	setElementPlay( element )
|	setElementPause( element )
*/
var AmplitudeVisualSyncHelpers = function () {
	/*--------------------------------------------------------------------------
 	Updates any elements that display the current hour for the song.
 		@param int hours An integer conaining how many hours into
 	the song.
 --------------------------------------------------------------------------*/
	function syncCurrentHours(hours) {
		/*
  	Gets all of the song hour selectors.
  */
		if (_config2.default.active_playlist != null && _config2.default.active_playlist != '') {
			var hourSelectors = ['.amplitude-current-hours[amplitude-main-current-hours="true"]', '.amplitude-current-hours[amplitude-playlist-current-hours="true"][amplitude-playlist="' + _config2.default.active_playlist + '"]', '.amplitude-current-hours[amplitude-song-index="' + _config2.default.active_index + '"]'];
		} else {
			var hourSelectors = ['.amplitude-current-hours[amplitude-main-current-hours="true"]', '.amplitude-current-hours[amplitude-song-index="' + _config2.default.active_index + '"]'];
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
						currentHourSelectors[i].innerHTML = '00';
					}
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
 	Resets the current hours displays to 00
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
			hourSelectors[i].innerHTML = '00';
		}
	}

	/*--------------------------------------------------------------------------
 	Updates any elements that display the current minutes for the song.
 		@param int minutes An integer conaining how many minutes into
 	the song.
 --------------------------------------------------------------------------*/
	function syncCurrentMinutes(minutes) {
		/*
  	Gets all of the song minute selectors.
  */
		if (_config2.default.active_playlist != null && _config2.default.active_playlist != '') {
			var minuteSelectors = ['.amplitude-current-minutes[amplitude-main-current-minutes="true"]', '.amplitude-current-minutes[amplitude-playlist-current-minutes="true"][amplitude-playlist="' + _config2.default.active_playlist + '"]', '.amplitude-current-minutes[amplitude-song-index="' + _config2.default.active_index + '"]'];
		} else {
			var minuteSelectors = ['.amplitude-current-minutes[amplitude-main-current-minutes="true"]', '.amplitude-current-minutes[amplitude-song-index="' + _config2.default.active_index + '"]'];
		}

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

	/*--------------------------------------------------------------------------
 	Resets the current minutes displays to 00
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Updates any elements that display the current seconds for the song.
 		@param int minutes An integer conaining how many seconds into
 	the song.
 --------------------------------------------------------------------------*/
	function syncCurrentSeconds(seconds) {
		/*
  	Gets all of the song second selectors. If the active playlist
  	is not null, then we get the playlist selectors.
  */
		if (_config2.default.active_playlist != null && _config2.default.active_playlist != '') {
			var secondSelectors = ['.amplitude-current-seconds[amplitude-main-current-seconds="true"]', '.amplitude-current-seconds[amplitude-playlist-current-seconds="true"][amplitude-playlist="' + _config2.default.active_playlist + '"]', '.amplitude-current-seconds[amplitude-song-index="' + _config2.default.active_index + '"]'];
		} else {
			var secondSelectors = ['.amplitude-current-seconds[amplitude-main-current-seconds="true"]', '.amplitude-current-seconds[amplitude-song-index="' + _config2.default.active_index + '"]'];
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

	/*--------------------------------------------------------------------------
 	Resets the current seconds displays to 00
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Updates any elements that display the current time for the song. This
 	is a computed field that will be commonly used.
 		@param JSON currentTime A json object conaining the parts for the
 	current time for the song.
 --------------------------------------------------------------------------*/
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
		for (var i = 0, l = currentTimeSelectors.length; i < l; i++) {
			currentTimeSelectors[i].innerHTML = currentTime.minutes + ':' + currentTime.seconds;
		}
	}

	/*--------------------------------------------------------------------------
 	Resets the current time displays to 00:00
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Syncs the song played progress bars. These are HTML5 progress elements.
 --------------------------------------------------------------------------*/
	function syncSongPlayedProgressBar(songPlayedPercentage) {
		syncMainSongPlayedProgressBars(songPlayedPercentage);
		syncPlaylistSongPlayedProgressBars(songPlayedPercentage);
		syncIndividualSongPlayedProgressBars(songPlayedPercentage);
	}

	/*--------------------------------------------------------------------------
 	Sync how much has been played with a progress bar. This is the main progress
 	bar.
 		@param float songPlayedPercentage The percent of the song completed.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Sync how much has been played with a progress bar. This is the playlist progress
 	bar.
 		@param float songPlayedPercentage The percent of the song completed.
 --------------------------------------------------------------------------*/
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

	/*--------------------------------------------------------------------------
 	Sync how much has been played with a progress bar. This is for an individual
 	song.
 		@param float songPlayedPercentage The percent of the song completed.
 --------------------------------------------------------------------------*/
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
				var songPlayedProgressBars = document.querySelectorAll('.amplitude-song-played-progress[amplitude-song-index="' + _config2.default.active_index + '"]');

				for (var i = 0; i < songPlayedProgressBars.length; i++) {
					var max = songPlayedProgressBars[i].max;

					songPlayedProgressBars[i].value = songPlayedPercentage / 100 * max;
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
 	Sets an element to be playing by removing the 'amplitude-paused' class
 	and adding the 'amplitude-playing' class
 		@param element element The element getting the playing class added.
 --------------------------------------------------------------------------*/
	function setElementPlay(element) {
		element.classList.add('amplitude-playing');
		element.classList.remove('amplitude-paused');
	}

	/*--------------------------------------------------------------------------
 	Sets an element to be paused by adding the 'amplitude-paused' class
 	and removing the 'amplitude-playing' class
 		@param element element The element getting the paused class added.
 --------------------------------------------------------------------------*/
	function setElementPause(element) {
		element.classList.remove('amplitude-playing');
		element.classList.add('amplitude-paused');
	}

	/*--------------------------------------------------------------------------
 	Updates any elements that display the duration hour for the song.
 		@param int hours An integer conaining how many hours are in the song
 --------------------------------------------------------------------------*/
	function syncDurationHours(hours) {
		/*
  	Gets all of the song hour selectors.
  */
		if (_config2.default.active_playlist != null && _config2.default.active_playlist != '') {
			var hourSelectors = ['.amplitude-duration-hours[amplitude-main-duration-hours="true"]', '.amplitude-duration-hours[amplitude-playlist-duration-hours="true"][amplitude-playlist="' + _config2.default.active_playlist + '"]', '.amplitude-duration-hours[amplitude-song-index="' + _config2.default.active_index + '"]'];
		} else {
			var hourSelectors = ['.amplitude-duration-hours[amplitude-main-duration-hours="true"]', '.amplitude-duration-hours[amplitude-song-index="' + _config2.default.active_index + '"]'];
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
						durationHourSelectors[i].innerHTML = '00';
					}
				}
			}
		}
	}

	/*--------------------------------------------------------------------------
 Updates any elements that display the duration minutes for the song.
 	@param int minutes An integer conaining how many minutes into
 the song.
 --------------------------------------------------------------------------*/
	function syncDurationMinutes(minutes) {
		/*
  	Gets all of the song minute selectors.
  */
		if (_config2.default.active_playlist != null && _config2.default.active_playlist != '') {
			var minuteSelectors = ['.amplitude-duration-minutes[amplitude-main-duration-minutes="true"]', '.amplitude-duration-minutes[amplitude-playlist-duration-minutes="true"][amplitude-playlist="' + _config2.default.active_playlist + '"]', '.amplitude-duration-minutes[amplitude-song-index="' + _config2.default.active_index + '"]'];
		} else {
			var minuteSelectors = ['.amplitude-duration-minutes[amplitude-main-duration-minutes="true"]', '.amplitude-duration-minutes[amplitude-song-index="' + _config2.default.active_index + '"]'];
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

	/*--------------------------------------------------------------------------
 Updates any elements that display the duration seconds for the song.
 	@param int minutes An integer conaining how many seconds into
 the song.
 --------------------------------------------------------------------------*/
	function syncDurationSeconds(seconds) {
		/*
  	Gets all of the song second selectors. If the active playlist
  	is not null, then we get the playlist selectors.
  */
		if (_config2.default.active_playlist != null && _config2.default.active_playlist != '') {
			var secondSelectors = ['.amplitude-duration-seconds[amplitude-main-duration-seconds="true"]', '.amplitude-duration-seconds[amplitude-playlist-duration-seconds="true"][amplitude-playlist="' + _config2.default.active_playlist + '"]', '.amplitude-duration-seconds[amplitude-song-index="' + _config2.default.active_index + '"]'];
		} else {
			var secondSelectors = ['.amplitude-duration-seconds[amplitude-main-duration-seconds="true"]', '.amplitude-duration-seconds[amplitude-song-index="' + _config2.default.active_index + '"]'];
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

	/*--------------------------------------------------------------------------
 	Updates any elements that display the duration time for the song. This
 	is a computed field that will be commonly used.
 		@param JSON durationTime A json object conaining the parts for the
 	duration time for the song.
 --------------------------------------------------------------------------*/
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
		for (var i = 0; i < durationTimeSelectors.length; i++) {
			if (!isNaN(durationTime.minutes) && !isNaN(durationTime.seconds)) {
				durationTimeSelectors[i].innerHTML = durationTime.minutes + ':' + durationTime.seconds;
			} else {
				durationTimeSelectors[i].innerHTML = '00:00';
			}
		}
	}

	/*--------------------------------------------------------------------------
 	Updates the elements that show how much time is remaining in the song.
 		@param JSON currentTime A json object containing the parts for the current
 	time for the song.
 		@param JSON durationTime A json object conaining the parts for the
 	duration time for the song.
 --------------------------------------------------------------------------*/
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

				/*
    	Find how many seconds are remaining.
    */
				var timeRemainingSeconds = (Math.floor(timeRemainingTotalSeconds % 60) < 10 ? '0' : '') + Math.floor(timeRemainingTotalSeconds % 60);

				/*
    	Find how many minutes are remaining.
    */
				var timeRemainingMinutes = (Math.floor(timeRemainingTotalSeconds / 60) < 10 ? '0' : '') + Math.floor(timeRemainingTotalSeconds / 60);

				/*
    	Build the time remaining.
    */
				timeRemaining = timeRemainingMinutes + ':' + timeRemainingSeconds;
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
}();

exports.default = AmplitudeVisualSyncHelpers;
module.exports = exports['default'];

/***/ })
/******/ ]);
});