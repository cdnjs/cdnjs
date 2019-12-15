/*!
* SoundJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/


//##############################################################################
// CordovaAudioLoader.js
//##############################################################################

this.createjs = this.createjs || {};

(function () {
	"use strict";

	/**
	 * Loader provides a mechanism to preload Cordova audio content via PreloadJS or internally. Instances are returned to
	 * the preloader, and the load method is called when the asset needs to be requested.
	 * Currently files are assumed to be local and no loading actually takes place.  This class exists to more easily support
	 * the existing architecture.
	 *
	 * @class CordovaAudioLoader
	 * @param {String} loadItem The item to be loaded
	 * @extends XHRRequest
	 * @protected
	 */
	function Loader(loadItem) {
		this.AbstractLoader_constructor(loadItem, true, createjs.AbstractLoader.SOUND);

		/**
		 * A Media object used to determine if src exists and to get duration
		 * @property _media
		 * @type {Media}
		 * @protected
		 */
		this._media = null;

		/**
		 * A time counter that triggers timeout if loading takes too long
		 * @property _loadTime
		 * @type {number}
		 * @protected
		 */
		this._loadTime = 0;

		/**
		 * The frequency to fire the loading timer until duration can be retrieved
		 * @property _TIMER_FREQUENCY
		 * @type {number}
		 * @protected
		 */
		this._TIMER_FREQUENCY = 100;
	};
	var p = createjs.extend(Loader, createjs.AbstractLoader);


// public methods
	p.load = function() {
		this._media = new Media(this._item.src, null, createjs.proxy(this._mediaErrorHandler,this));
		this._media.seekTo(0);	// needed to get duration

		this._getMediaDuration();
	};

	p.toString = function () {
		return "[CordovaAudioLoader]";
	};


// private methods
	/**
	 * Fires if audio cannot seek, indicating that src does not exist.
	 * @method _mediaErrorHandler
	 * @param error
	 * @protected
	 */
	p._mediaErrorHandler = function(error) {
		this._media.release();
		this._sendError();
	};

	/**
	 * will attempt to get duration of audio until successful or time passes this._item.loadTimeout
	 * @method _getMediaDuration
	 * @protected
	 */
	p._getMediaDuration = function() {
		this._result = this._media.getDuration() * 1000;
		if (this._result < 0) {
			this._loadTime += this._TIMER_FREQUENCY;
			if (this._loadTime > this._item.loadTimeout) {
				this.handleEvent({type:"timeout"});
			} else {
				setTimeout(createjs.proxy(this._getMediaDuration, this), this._TIMER_FREQUENCY);
			}
		} else {
			this._media.release();
			this._sendComplete();
		}
	};

	createjs.CordovaAudioLoader = createjs.promote(Loader, "AbstractLoader");
}());

//##############################################################################
// CordovaAudioSoundInstance.js
//##############################################################################

this.createjs = this.createjs || {};

(function () {
	"use strict";

	/**
	 * CordovaAudioSoundInstance extends the base api of {{#crossLink "AbstractSoundInstance"}}{{/crossLink}} and is used by
	 * {{#crossLink "CordovaAudioPlugin"}}{{/crossLink}}.
	 *
	 * @param {String} src The path to and file name of the sound.
	 * @param {Number} startTime Audio sprite property used to apply an offset, in milliseconds.
	 * @param {Number} duration Audio sprite property used to set the time the clip plays for, in milliseconds.
	 * @param {Object} playbackResource Any resource needed by plugin to support audio playback.
	 * @class CordovaAudioSoundInstance
	 * @extends AbstractSoundInstance
	 * @constructor
	 */
	function CordovaAudioSoundInstance(src, startTime, duration, playbackResource) {
		this.AbstractSoundInstance_constructor(src, startTime, duration, playbackResource);

// Public Properties
		/**
		 * Sets the playAudioWhenScreenIsLocked property for play calls on iOS devices.
		 * @property playWhenScreenLocked
		 * @type {boolean}
		 */
		this.playWhenScreenLocked = null;

// Private Properties
		/**
		 * Used to approximate the playback position by storing the number of milliseconds elapsed since
		 * 1 January 1970 00:00:00 UTC when playing
		 * Note that if js clock is out of sync with Media playback, this will become increasingly inaccurate.
		 * @property _playStartTime
		 * @type {Number}
		 * @protected
		 */
		this._playStartTime = null;

		/**
		 * A TimeOut used to trigger the end and possible loop of audio sprites.
		 * @property _audioSpriteTimeout
		 * @type {null}
		 * @protected
		 */
		this._audioSpriteTimeout = null;

		/**
		 * Boolean value that indicates if we are using an audioSprite
		 * @property _audioSprite
		 * @type {boolean}
		 * @protected
		 */
		this._audioSprite = false;

		// Proxies, make removing listeners easier.
		this._audioSpriteEndHandler = createjs.proxy(this._handleAudioSpriteComplete, this);
		this._mediaPlayFinishedHandler = createjs.proxy(this._handleSoundComplete, this);
		this._mediaErrorHandler = createjs.proxy(this._handleMediaError, this);
		this._mediaProgressHandler = createjs.proxy(this._handleMediaProgress, this);

		this._playbackResource = new Media(src, this._mediaPlayFinishedHandler, this._mediaErrorHandler, this._mediaProgressHandler);

		if (duration) {
			this._audioSprite = true;
		} else {
			this._setDurationFromSource();
		}
	}
	var p = createjs.extend(CordovaAudioSoundInstance, createjs.AbstractSoundInstance);


// Public Methods
	/**
	 * Called by {{#crossLink "Sound"}}{{/crossLink}} when plugin does not handle master volume.
	 * undoc'd because it is not meant to be used outside of Sound
	 * #method setMasterVolume
	 * @param value
	 */
	p.setMasterVolume = function (value) {
		this._updateVolume();
	};

	/**
	 * Called by {{#crossLink "Sound"}}{{/crossLink}} when plugin does not handle master mute.
	 * undoc'd because it is not meant to be used outside of Sound
	 * #method setMasterMute
	 * @param value
	 */
	p.setMasterMute = function (isMuted) {
		this._updateVolume();
	};

	p.destroy = function() {
		// call parent function, then release
		this.AbstractSoundInstance_destroy();
		this._playbackResource.release();
	};

	/**
	 * Maps to <a href="http://plugins.cordova.io/#/package/org.apache.cordova.media" target="_blank">Media.getCurrentPosition</a>,
	 * which is curiously asynchronus and requires a callback.
	 * @method getCurrentPosition
	 * @param {Method} mediaSuccess The callback that is passed the current position in seconds.
	 * @param {Method} [mediaError=null] (Optional) The callback to execute if an error occurs.
	 */
	p.getCurrentPosition = function (mediaSuccess, mediaError) {
		this._playbackResource.getCurrentPosition(mediaSuccess, mediaError);
	};

	p.toString = function () {
		return "[CordovaAudioSoundInstance]";
	};

//Private Methods
	/**
	 * media object has failed and likely will never work
	 * @method _handleMediaError
	 * @param error
	 * @private
	 */
	p._handleMediaError = function(error) {
		clearTimeout(this.delayTimeoutId); // clear timeout that plays delayed sound

		this.playState = createjs.Sound.PLAY_FAILED;
		this._sendEvent("failed");
	};

	p._handleMediaProgress = function(state) {
		// do nothing
	};

	p._handleAudioSpriteComplete = function() {
		this._playbackResource.pause();
		this._handleSoundComplete();
	};
	/* don't need these for current looping approach
	p._removeLooping = function() {
	};

	p._addLooping = function() {
	};
	*/

	p._handleCleanUp = function () {
		clearTimeout(this._audioSpriteTimeout);
		this._playbackResource.pause(); // OJR cannot use .stop as it prevents .seekTo from working
		// todo consider media.release
	};

	p._handleSoundReady = function (event) {
		this._playbackResource.seekTo(this._startTime + this._position);

		if (this._audioSprite) {
			this._audioSpriteTimeout = setTimeout(this._audioSpriteEndHandler, this._duration - this._position)
		}

		this._playbackResource.play({playAudioWhenScreenIsLocked: this.playWhenScreenLocked});
		this._playStartTime = Date.now();
	};

	p._pause = function () {
		clearTimeout(this._audioSpriteTimeout);
		this._playbackResource.pause();
		if (this._playStartTime) {
			this._position = Date.now() - this._playStartTime;
			this._playStartTime = null;
		}
		this._playbackResource.getCurrentPosition(createjs.proxy(this._updatePausePos, this));
	};

	/**
	 * Synchronizes the best guess position with the actual current position.
	 * @method _updatePausePos
	 * @param {Number} pos The current position in seconds
	 * @private
	 */
	p._updatePausePos = function (pos) {
		this._position = pos * 1000 - this._startTime;
		if(this._playStartTime) {
			this._playStartTime = Date.now();
		}
	};

	p._resume = function () {
		if (this._audioSprite) {
			this._audioSpriteTimeout = setTimeout(this._audioSpriteEndHandler, this._duration - this._position)
		}

		this._playbackResource.play({playAudioWhenScreenIsLocked: this.playWhenScreenLocked});
		this._playStartTime = Date.now();
	};

	p._handleStop = function() {
		clearTimeout(this._audioSpriteTimeout);
		this._playbackResource.pause(); // cannot use .stop because it prevents .seekTo from working
		this._playbackResource.seekTo(this._startTime);
		if (this._playStartTime) {
			this._position = 0;
			this._playStartTime = null;
		}
	};

	p._updateVolume = function () {
		var newVolume = (this._muted || createjs.Sound._masterMute) ? 0 : this._volume * createjs.Sound._masterVolume;
		this._playbackResource.setVolume(newVolume);
	};

	p._calculateCurrentPosition = function() {
		// return best guess position.
		// Note if Media and js clock are out of sync, this value will become increasingly inaccurate over time
		if (this._playStartTime) {
			this._position = Date.now() - this._playStartTime + this._position;
			this._playStartTime = Date.now();
		}
		return this._position;
	};

	p._updatePosition = function() {
		this._playbackResource.seekTo(this._startTime + this._position);
		this._playStartTime = Date.now();
		if (this._audioSprite) {
			clearTimeout(this._audioSpriteTimeout);
			this._audioSpriteTimeout = setTimeout(this._audioSpriteEndHandler, this._duration - this._position)
		}
	};

	p._handleLoop = function (event) {
		this._handleSoundReady();
	};

	p._updateStartTime = function () {
		this._audioSprite = true;

		if(this.playState == createjs.Sound.PLAY_SUCCEEDED) {
			// do nothing
		}
	};

	p._updateDuration = function () {
		this._audioSprite

		if(this.playState == createjs.Sound.PLAY_SUCCEEDED) {
			clearTimeout(this._audioSpriteTimeout);
			this._audioSpriteTimeout = setTimeout(this._audioSpriteEndHandler, this._duration - this.position)
		}
	};

	p._setDurationFromSource = function () {
		this._duration = createjs.Sound.activePlugin.getSrcDuration(this.src);	// TODO find a better way to do this that does not break flow
	};

	createjs.CordovaAudioSoundInstance = createjs.promote(CordovaAudioSoundInstance, "AbstractSoundInstance");
}());

//##############################################################################
// CordovaAudioPlugin.js
//##############################################################################

this.createjs = this.createjs || {};

(function () {

	"use strict";

	/**
	 * Play sounds using Cordova Media plugin, which will work with a Cordova app and tools that utilize Cordova such as PhoneGap or Ionic.
	 * This plugin is not used by default, and must be registered manually in {{#crossLink "Sound"}}{{/crossLink}}
	 * using the {{#crossLink "Sound/registerPlugins"}}{{/crossLink}} method.
	 * This plugin is recommended when building a Cordova based app, but is not required.
	 *
	 * <b>NOTE the <a href="http://plugins.cordova.io/#/package/org.apache.cordova.media" target="_blank">Cordova Media plugin</a> is required</b>
	 *
	 * 		cordova plugin add org.apache.cordova.media
	 *
	 * <h4>Known Issues</h4>
	 * <b>Audio Position</b>
	 * <ul>Audio position is calculated asynchronusly by Media.  The SoundJS solution to this problem is two-fold:
	 * <li>Provide {{#crossLink "CordovaAudioSoundInstance/getCurrentPosition"}}{{/crossLink}} that maps directly to media.getCurrentPosition.</li>
	 * <li>Provide a best guess position based on elapsed time since playback started, which is synchronized with actual position when the audio is paused or stopped.
	 * Testing showed this to be fairly reliable within 200ms.</li></ul>
	 * <b>Cordova Media Docs</b>
	 * <ul><li>See the <a href="http://plugins.cordova.io/#/package/org.apache.cordova.media" target="_blank">Cordova Media Docs</a> for various known OS issues.</li></ul>
	 * <br />
	 *
	 * @class CordovaAudioPlugin
	 * @extends AbstractPlugin
	 * @constructor
	 */
	function CordovaAudioPlugin() {
		this.AbstractPlugin_constructor();

		this._capabilities = s._capabilities;

		this._loaderClass = createjs.CordovaAudioLoader;
		this._soundInstanceClass = createjs.CordovaAudioSoundInstance;

		this._srcDurationHash = {};
	}

	var p = createjs.extend(CordovaAudioPlugin, createjs.AbstractPlugin);
	var s = CordovaAudioPlugin;


// Static Properties
	/**
	 * Sets a default playAudioWhenScreenIsLocked property for play calls on iOS devices.
	 * Individual SoundInstances can alter the default with {{#crossLink "CordovaAudioSoundInstance/playWhenScreenLocked"}}{{/crossLink}}.
	 * @property playWhenScreenLocked
	 * @type {boolean}
	 * @static
	 */
	s.playWhenScreenLocked = false;

	/**
	 * The capabilities of the plugin. This is generated via the {{#crossLink "CordovaAudioPlugin/_generateCapabilities"}}{{/crossLink}}
	 * method. Please see the Sound {{#crossLink "Sound/getCapabilities"}}{{/crossLink}} method for an overview of all
	 * of the available properties.
	 * @property _capabilities
	 * @type {Object}
	 * @protected
	 * @static
	 */
	s._capabilities = null;


// Static Methods
	/**
	 * Determine if the plugin can be used in the current browser/OS. Note that HTML audio is available in most modern
	 * browsers, but is disabled in iOS because of its limitations.
	 * @method isSupported
	 * @return {Boolean} If the plugin can be initialized.
	 * @static
	 */
	s.isSupported = function () {
		s._generateCapabilities();
		return (s._capabilities != null);
	};

	/**
	 * Determine the capabilities of the plugin. Used internally. Please see the Sound API {{#crossLink "Sound/getCapabilities"}}{{/crossLink}}
	 * method for an overview of plugin capabilities.
	 * @method _generateCapabilities
	 * @static
	 * @protected
	 */
	s._generateCapabilities = function () {
		if (s._capabilities != null || !(window.cordova || window.PhoneGap || window.phonegap) || !window.Media) {return;}

		// OJR my best guess is that Cordova will have the same limits on playback that the audio tag has, but this could be wrong
		var t = document.createElement("audio");
		if (t.canPlayType == null) {return null;}

		s._capabilities = {
			panning:false,
			volume:true,
			tracks:-1
		};

		// determine which extensions our browser supports for this plugin by iterating through Sound.SUPPORTED_EXTENSIONS
		var supportedExtensions = createjs.Sound.SUPPORTED_EXTENSIONS;
		var extensionMap = createjs.Sound.EXTENSION_MAP;
		for (var i = 0, l = supportedExtensions.length; i < l; i++) {
			var ext = supportedExtensions[i];
			var playType = extensionMap[ext] || ext;
			s._capabilities[ext] = (t.canPlayType("audio/" + ext) != "no" && t.canPlayType("audio/" + ext) != "") || (t.canPlayType("audio/" + playType) != "no" && t.canPlayType("audio/" + playType) != "");
		}  // OJR another way to do this might be canPlayType:"m4a", codex: mp4
	};


// public methods
	p.create = function (src, startTime, duration) {
		var si = this.AbstractPlugin_create(src, startTime, duration);
		si.playWhenScreenLocked = this.playWhenScreenLocked;
		return si;
	};

	p.toString = function () {
		return "[CordovaAudioPlugin]";
	};

	// plugin does not support these
	p.setVolume = p.getVolume = p.setMute = null;

	/**
	 * Get the duration for a src.  Intended for internal use by CordovaAudioSoundInstance.
	 * @method getSrcDuration
	 * @param src
	 * @returns {Number} The duration of the src or null if it does not exist
	 */
	p.getSrcDuration = function(src) {
		return this._srcDurationHash[src];
	};

// Private Methods
	p._handlePreloadComplete = function (event) {
		var src = event.target.getItem().src;
		this._srcDurationHash[src] = event.result;
		this._audioSources[src] = event.result;
		//this.AbstractPlugin__handlePreloadComplete(event);	// we don't want to do the rest of this
	};

	p.removeSound = function (src) {
		delete(this._srcDurationHash[src]);
		this.AbstractPlugin_removeSound(src);
	};

	createjs.CordovaAudioPlugin = createjs.promote(CordovaAudioPlugin, "AbstractPlugin");
}());

//##############################################################################
// version_cordovaplugin.js
//##############################################################################

this.createjs = this.createjs || {};

(function () {

	var s = createjs.CordovaAudioPlugin = createjs.CordovaAudioPlugin || {};

	/**
	 * The version string for this release.
	 * @for CordovaAudioPlugin
	 * @property version
	 * @type String
	 * @static
	 **/
	s.version = /*=version*/"0.6.1"; // injected by build process

	/**
	 * The build date for this release in UTC format.
	 * @for CordovaAudioPlugin
	 * @property buildDate
	 * @type String
	 * @static
	 **/
	s.buildDate = /*=date*/"Thu, 21 May 2015 16:17:37 GMT"; // injected by build process

})();