/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.happyworm.com/jquery/jplayer
 *
 * Copyright (c) 2009 - 2010 Happyworm Ltd
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Author: Mark J Panaghiston
 * Version: 2.0.0
 * Date: 20th December 2010
 */

(function($, undefined) {

	// Adapted from jquery.ui.widget.js (1.8.7): $.widget.bridge
	$.fn.jPlayer = function( options ) {
		var name = "jPlayer";
		var isMethodCall = typeof options === "string",
			args = Array.prototype.slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.extend.apply( null, [ true, options ].concat(args) ) :
			options;

		// prevent calls to internal methods
		if ( isMethodCall && options.charAt( 0 ) === "_" ) {
			return returnValue;
		}

		if ( isMethodCall ) {
			this.each(function() {
				var instance = $.data( this, name ),
					methodValue = instance && $.isFunction( instance[options] ) ?
						instance[ options ].apply( instance, args ) :
						instance;
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, name );
				if ( instance ) {
					instance.option( options || {} )._init(); // Orig jquery.ui.widget.js code: Not recommend for jPlayer. ie., Applying new options to an existing instance (via the jPlayer constructor) and performing the _init(). The _init() is what concerns me. It would leave a lot of event handlers acting on jPlayer instance and the interface.
					instance.option( options || {} ); // The new constructor only changes the options. Changing options only has basic support atm.
				} else {
					$.data( this, name, new $.jPlayer( options, this ) );
				}
			});
		}

		return returnValue;
	};

	$.jPlayer = function( options, element ) {
		// allow instantiation without initializing for simple inheritance
		if ( arguments.length ) {
			this.element = $(element);
			this.options = $.extend(true, {},
				this.options,
				options
			);
			var self = this;
			this.element.bind( "remove.jPlayer", function() {
				self.destroy();
			});
			this._init();
		}
	};
	// End of: (Adapted from jquery.ui.widget.js (1.8.7))

	$.jPlayer.event = {
		ready: "jPlayer_ready",
		resize: "jPlayer_resize", // Not implemented.
		error: "jPlayer_error", // Event error code in event.jPlayer.error.type. See $.jPlayer.error
		warning: "jPlayer_warning", // Event warning code in event.jPlayer.warning.type. See $.jPlayer.warning

		// Other events match HTML5 spec.
		loadstart: "jPlayer_loadstart",
		progress: "jPlayer_progress",
		suspend: "jPlayer_suspend",
		abort: "jPlayer_abort",
		emptied: "jPlayer_emptied",
		stalled: "jPlayer_stalled",
		play: "jPlayer_play",
		pause: "jPlayer_pause",
		loadedmetadata: "jPlayer_loadedmetadata",
		loadeddata: "jPlayer_loadeddata",
		waiting: "jPlayer_waiting",
		playing: "jPlayer_playing",
		canplay: "jPlayer_canplay",
		canplaythrough: "jPlayer_canplaythrough",
		seeking: "jPlayer_seeking",
		seeked: "jPlayer_seeked",
		timeupdate: "jPlayer_timeupdate",
		ended: "jPlayer_ended",
		ratechange: "jPlayer_ratechange",
		durationchange: "jPlayer_durationchange",
		volumechange: "jPlayer_volumechange"
	};

	$.jPlayer.htmlEvent = [ // These HTML events are bubbled through to the jPlayer event, without any internal action.
		"loadstart",
		// "progress", // jPlayer uses internally before bubbling.
		// "suspend", // jPlayer uses internally before bubbling.
		"abort",
		// "error", // jPlayer uses internally before bubbling.
		"emptied",
		"stalled",
		// "play", // jPlayer uses internally before bubbling.
		// "pause", // jPlayer uses internally before bubbling.
		"loadedmetadata",
		"loadeddata",
		// "waiting", // jPlayer uses internally before bubbling.
		// "playing", // jPlayer uses internally before bubbling.
		// "canplay", // jPlayer fixes the volume (for Chrome) before bubbling.
		"canplaythrough",
		// "seeking", // jPlayer uses internally before bubbling.
		// "seeked", // jPlayer uses internally before bubbling.
		// "timeupdate", // jPlayer uses internally before bubbling.
		// "ended", // jPlayer uses internally before bubbling.
		"ratechange"
		// "durationchange" // jPlayer uses internally before bubbling.
		// "volumechange" // Handled by jPlayer in volume() method, primarily due to the volume fix (for Chrome) in the canplay event. [*] Need to review whether the latest Chrome still needs the fix sometime.
	];

	$.jPlayer.pause = function() {
		// $.each($.jPlayer.instances, function(i, element) {
		$.each($.jPlayer.prototype.instances, function(i, element) {
			if(element.data("jPlayer").status.srcSet) { // Check that media is set otherwise would cause error event.
				element.jPlayer("pause");
			}
		});
	};
	
	$.jPlayer.timeFormat = {
		showHour: false,
		showMin: true,
		showSec: true,
		padHour: false,
		padMin: true,
		padSec: true,
		sepHour: ":",
		sepMin: ":",
		sepSec: ""
	};

	$.jPlayer.convertTime = function(sec) {
		var myTime = new Date(sec * 1000);
		var hour = myTime.getUTCHours();
		var min = myTime.getUTCMinutes();
		var sec = myTime.getUTCSeconds();
		var strHour = ($.jPlayer.timeFormat.padHour && hour < 10) ? "0" + hour : hour;
		var strMin = ($.jPlayer.timeFormat.padMin && min < 10) ? "0" + min : min;
		var strSec = ($.jPlayer.timeFormat.padSec && sec < 10) ? "0" + sec : sec;
		return (($.jPlayer.timeFormat.showHour) ? strHour + $.jPlayer.timeFormat.sepHour : "") + (($.jPlayer.timeFormat.showMin) ? strMin + $.jPlayer.timeFormat.sepMin : "") + (($.jPlayer.timeFormat.showSec) ? strSec + $.jPlayer.timeFormat.sepSec : "");
	};

	// Adapting jQuery 1.4.4 code for jQuery.browser. Required since jQuery 1.3.2 does not detect Chrome as webkit.
	$.jPlayer.uaMatch = function( ua ) {
		var ua = ua.toLowerCase();

		// Useragent RegExp
		var rwebkit = /(webkit)[ \/]([\w.]+)/;
		var ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
		var rmsie = /(msie) ([\w.]+)/;
		var rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	};

	$.jPlayer.browser = {
	};

	var browserMatch = $.jPlayer.uaMatch(navigator.userAgent);
	if ( browserMatch.browser ) {
		$.jPlayer.browser[ browserMatch.browser ] = true;
		$.jPlayer.browser.version = browserMatch.version;
	}

	$.jPlayer.prototype = {
		count: 0, // Static Variable: Change it via prototype.
		version: { // Static Object
			script: "2.0.0",
			needFlash: "2.0.0",
			flash: "unknown"
		},
		options: { // Instanced in $.jPlayer() constructor
			swfPath: "js", // Path to Jplayer.swf. Can be relative, absolute or server root relative.
			solution: "html, flash", // Valid solutions: html, flash. Order defines priority. 1st is highest,
			supplied: "mp3", // Defines which formats jPlayer will try and support and the priority by the order. 1st is highest,
			preload: 'metadata',  // HTML5 Spec values: none, metadata, auto.
			volume: 0.8, // The volume. Number 0 to 1.
			muted: false,
			backgroundColor: "#000000", // To define the jPlayer div and Flash background color.
			cssSelectorAncestor: "#jp_interface_1",
			cssSelector: {
				videoPlay: ".jp-video-play",
				play: ".jp-play",
				pause: ".jp-pause",
				stop: ".jp-stop",
				seekBar: ".jp-seek-bar",
				playBar: ".jp-play-bar",
				mute: ".jp-mute",
				unmute: ".jp-unmute",
				volumeBar: ".jp-volume-bar",
				volumeBarValue: ".jp-volume-bar-value",
				currentTime: ".jp-current-time",
				duration: ".jp-duration"
			},
			// globalVolume: false, // Not implemented: Set to make volume changes affect all jPlayer instances
			// globalMute: false, // Not implemented: Set to make mute changes affect all jPlayer instances
			idPrefix: "jp", // Prefix for the ids of html elements created by jPlayer. For flash, this must not include characters: . - + * / \
			errorAlerts: false,
			warningAlerts: false
		},
		instances: {}, // Static Object
		status: { // Instanced in _init()
			src: "",
			media: {},
			paused: true,
			format: {},
			formatType: "",
			waitForPlay: true, // Same as waitForLoad except in case where preloading.
			waitForLoad: true,
			srcSet: false,
			video: false, // True if playing a video
			seekPercent: 0,
			currentPercentRelative: 0,
			currentPercentAbsolute: 0,
			currentTime: 0,
			duration: 0
		},
		_status: { // Instanced in _init(): These status values are persistent. ie., Are not affected by a status reset.
			volume: undefined, // Set by constructor option/default.
			muted: false, // Set by constructor option/default.
			width: 0, // Read from CSS
			height: 0 // Read from CSS
		},
		internal: { // Instanced in _init()
			ready: false,
			instance: undefined,
			htmlDlyCmdId: undefined
		},
		solution: { // Static Object: Defines the solutions built in jPlayer.
			html: true,
			flash: true
		},
		// 'MPEG-4 support' : canPlayType('video/mp4; codecs="mp4v.20.8"')
		format: { // Static Object
			mp3: {
				codec: 'audio/mpeg; codecs="mp3"',
				flashCanPlay: true,
				media: 'audio'
			},
			m4a: { // AAC / MP4
				codec: 'audio/mp4; codecs="mp4a.40.2"',
				flashCanPlay: true,
				media: 'audio'
			},
			oga: { // OGG
				codec: 'audio/ogg; codecs="vorbis"',
				flashCanPlay: false,
				media: 'audio'
			},
			wav: { // PCM
				codec: 'audio/wav; codecs="1"',
				flashCanPlay: false,
				media: 'audio'
			},
			webma: { // WEBM
				codec: 'audio/webm; codecs="vorbis"',
				flashCanPlay: false,
				media: 'audio'
			},
			m4v: { // H.264 / MP4
				codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				flashCanPlay: true,
				media: 'video'
			},
			ogv: { // OGG
				codec: 'video/ogg; codecs="theora, vorbis"',
				flashCanPlay: false,
				media: 'video'
			},
			webmv: { // WEBM
				codec: 'video/webm; codecs="vorbis, vp8"',
				flashCanPlay: false,
				media: 'video'
			}
		},
		_init: function() {
			var self = this;
			
			this.element.empty();
			
			this.status = $.extend({}, this.status, this._status); // Copy static to unique instance. Adds the status propeties that persist through a reset. NB: Might want to use $.jPlayer.prototype.status instead once options completely implmented and _init() returned to $.fn.jPlayer plugin. 
			this.internal = $.extend({}, this.internal); // Copy static to unique instance.

			this.formats = []; // Array based on supplied string option. Order defines priority.
			this.solutions = []; // Array based on solution string option. Order defines priority.
			this.require = {}; // Which media types are required: video, audio.
			
			this.htmlElement = {}; // DOM elements created by jPlayer
			this.html = {}; // In _init()'s this.desired code and setmedia(): Accessed via this[solution], where solution from this.solutions array.
			this.html.audio = {};
			this.html.video = {};
			this.flash = {}; // In _init()'s this.desired code and setmedia(): Accessed via this[solution], where solution from this.solutions array.
			
			this.css = {};
			this.css.cs = {}; // Holds the css selector strings
			this.css.jq = {}; // Holds jQuery selectors. ie., $(css.cs.method)

			this.status.volume = this._limitValue(this.options.volume, 0, 1); // Set volume status from constructor option.
			this.status.muted = this.options.muted; // Set muted status from constructor option.
			this.status.width = this.element.css('width'); // Sets from CSS.
			this.status.height = this.element.css('height'); // Sets from CSS.

			this.element.css({'background-color': this.options.backgroundColor});

			// Create the formats array, with prority based on the order of the supplied formats string
			$.each(this.options.supplied.toLowerCase().split(","), function(index1, value1) {
				var format = value1.replace(/^\s+|\s+$/g, ""); //trim
				if(self.format[format]) { // Check format is valid.
					var dupFound = false;
					$.each(self.formats, function(index2, value2) { // Check for duplicates
						if(format === value2) {
							dupFound = true;
							return false;
						}
					});
					if(!dupFound) {
						self.formats.push(format);
					}
				}
			});

			// Create the solutions array, with prority based on the order of the solution string
			$.each(this.options.solution.toLowerCase().split(","), function(index1, value1) {
				var solution = value1.replace(/^\s+|\s+$/g, ""); //trim
				if(self.solution[solution]) { // Check solution is valid.
					var dupFound = false;
					$.each(self.solutions, function(index2, value2) { // Check for duplicates
						if(solution === value2) {
							dupFound = true;
							return false;
						}
					});
					if(!dupFound) {
						self.solutions.push(solution);
					}
				}
			});

			this.internal.instance = "jp_" + this.count;
			this.instances[this.internal.instance] = this.element;

			// Check the jPlayer div has an id and create one if required. Important for Flash to know the unique id for comms.
			if(this.element.attr("id") === "") {
				this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count);
			}

			this.internal.self = $.extend({}, {
				id: this.element.attr("id"),
				jq: this.element
			});
			this.internal.audio = $.extend({}, {
				id: this.options.idPrefix + "_audio_" + this.count,
				jq: undefined
			});
			this.internal.video = $.extend({}, {
				id: this.options.idPrefix + "_video_" + this.count,
				jq: undefined
			});
			this.internal.flash = $.extend({}, {
				id: this.options.idPrefix + "_flash_" + this.count,
				jq: undefined,
				swf: this.options.swfPath + ((this.options.swfPath !== "" && this.options.swfPath.slice(-1) !== "/") ? "/" : "") + "Jplayer.swf"
			});
			this.internal.poster = $.extend({}, {
				id: this.options.idPrefix + "_poster_" + this.count,
				jq: undefined
			});

			// Register listeners defined in the constructor
			$.each($.jPlayer.event, function(eventName,eventType) {
				if(self.options[eventName] !== undefined) {
					self.element.bind(eventType + ".jPlayer", self.options[eventName]); // With .jPlayer namespace.
					self.options[eventName] = undefined; // Destroy the handler pointer copy on the options. Reason, events can be added/removed in other ways so this could be obsolete and misleading.
				}
			});
			
			// Create the poster image.
			this.htmlElement.poster = document.createElement('img');
			this.htmlElement.poster.id = this.internal.poster.id;
			this.htmlElement.poster.onload = function() { // Note that this did not work on Firefox 3.6: poster.addEventListener("onload", function() {}, false); Did not investigate x-browser.
				if(!self.status.video || self.status.waitForPlay) {
					self.internal.poster.jq.show();
				}
			};
			this.element.append(this.htmlElement.poster);
			this.internal.poster.jq = $("#" + this.internal.poster.id);
			this.internal.poster.jq.css({'width': this.status.width, 'height': this.status.height});
			this.internal.poster.jq.hide();
			
			// Determine if we require solutions for audio, video or both media types.
			this.require.audio = false;
			this.require.video = false;
			$.each(this.formats, function(priority, format) {
				self.require[self.format[format].media] = true;
			});
			
			this.html.audio.available = false;
			if(this.require.audio) { // If a supplied format is audio
				this.htmlElement.audio = document.createElement('audio');
				this.htmlElement.audio.id = this.internal.audio.id;
				this.html.audio.available = !!this.htmlElement.audio.canPlayType;
			}
			this.html.video.available = false;
			if(this.require.video) { // If a supplied format is video
				this.htmlElement.video = document.createElement('video');
				this.htmlElement.video.id = this.internal.video.id;
				this.html.video.available = !!this.htmlElement.video.canPlayType;
			}

			this.flash.available = this._checkForFlash(10); // IE9 forced to false due to ExternalInterface problem.

			this.html.canPlay = {};
			this.flash.canPlay = {};
			$.each(this.formats, function(priority, format) {
				self.html.canPlay[format] = self.html[self.format[format].media].available && "" !== self.htmlElement[self.format[format].media].canPlayType(self.format[format].codec);
				self.flash.canPlay[format] = self.format[format].flashCanPlay && self.flash.available;
			});
			this.html.desired = false;
			this.flash.desired = false;
			$.each(this.solutions, function(solutionPriority, solution) {
				if(solutionPriority === 0) {
					self[solution].desired = true;
				} else {
					var audioCanPlay = false;
					var videoCanPlay = false;
					$.each(self.formats, function(formatPriority, format) {
						if(self[self.solutions[0]].canPlay[format]) { // The other solution can play
							if(self.format[format].media === 'video') {
								videoCanPlay = true;
							} else {
								audioCanPlay = true;
							}
						}
					});
					self[solution].desired = (self.require.audio && !audioCanPlay) || (self.require.video && !videoCanPlay);
				}
			});
			// This is what jPlayer will support, based on solution and supplied.
			this.html.support = {};
			this.flash.support = {};
			$.each(this.formats, function(priority, format) {
				self.html.support[format] = self.html.canPlay[format] && self.html.desired;
				self.flash.support[format] = self.flash.canPlay[format] && self.flash.desired;
			});
			// If jPlayer is supporting any format in a solution, then the solution is used.
			this.html.used = false;
			this.flash.used = false;
			$.each(this.solutions, function(solutionPriority, solution) {
				$.each(self.formats, function(formatPriority, format) {
					if(self[solution].support[format]) {
						self[solution].used = true;
						return false;
					}
				});
			});

			// If neither html nor flash are being used by this browser, then media playback is not possible. Trigger an error event.
			if(!(this.html.used || this.flash.used)) {
				this._error( {
					type: $.jPlayer.error.NO_SOLUTION, 
					context: "{solution:'" + this.options.solution + "', supplied:'" + this.options.supplied + "'}",
					message: $.jPlayer.errorMsg.NO_SOLUTION,
					hint: $.jPlayer.errorHint.NO_SOLUTION
				});
			}

			// Init solution active state and the event gates to false.
			this.html.active = false;
			this.html.audio.gate = false;
			this.html.video.gate = false;
			this.flash.active = false;
			this.flash.gate = false;

			// Add the flash solution if it is being used.
			if(this.flash.used) {
				var flashVars = 'id=' + escape(this.internal.self.id) + '&vol=' + this.status.volume + '&muted=' + this.status.muted;

				if($.browser.msie && Number($.browser.version) <= 8) {
					var html_obj = '<object id="' + this.internal.flash.id + '"';
					html_obj += ' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
					html_obj += ' codebase="' + document.URL.substring(0,document.URL.indexOf(':')) + '://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"'; // Fixed IE non secured element warning.
					html_obj += ' type="application/x-shockwave-flash"';
					html_obj += ' width="0" height="0">';
					html_obj += '</object>';

					var obj_param = [];
					obj_param[0] = '<param name="movie" value="' + this.internal.flash.swf + '" />';
					obj_param[1] = '<param name="quality" value="high" />';
					obj_param[2] = '<param name="FlashVars" value="' + flashVars + '" />';
					obj_param[3] = '<param name="allowScriptAccess" value="always" />';
					obj_param[4] = '<param name="bgcolor" value="' + this.options.backgroundColor + '" />';

					var ie_dom = document.createElement(html_obj);
					for(var i=0; i < obj_param.length; i++) {
						ie_dom.appendChild(document.createElement(obj_param[i]));
					}
					this.element.append(ie_dom);
				} else {
					var html_embed = '<embed name="' + this.internal.flash.id + '" id="' + this.internal.flash.id + '" src="' + this.internal.flash.swf + '"';
					html_embed += ' width="0" height="0" bgcolor="' + this.options.backgroundColor + '"';
					html_embed += ' quality="high" FlashVars="' + flashVars + '"';
					html_embed += ' allowScriptAccess="always"';
					html_embed += ' type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
					this.element.append(html_embed);
				}
				this.internal.flash.jq = $("#" + this.internal.flash.id);
				this.internal.flash.jq.css({'width':'0px', 'height':'0px'}); // Must do via CSS as setting attr() to zero causes a jQuery error in IE.
			}
			
			// Add the HTML solution if being used.
			if(this.html.used) {

				// The HTML Audio handlers
				if(this.html.audio.available) {
					this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio);
					this.element.append(this.htmlElement.audio);
					this.internal.audio.jq = $("#" + this.internal.audio.id);
				}

				// The HTML Video handlers
				if(this.html.video.available) {
					this._addHtmlEventListeners(this.htmlElement.video, this.html.video);
					this.element.append(this.htmlElement.video);
					this.internal.video.jq = $("#" + this.internal.video.id);
					this.internal.video.jq.css({'width':'0px', 'height':'0px'}); // Using size 0x0 since a .hide() causes issues in iOS
				}
			}

			if(this.html.used && !this.flash.used) { // If only HTML, then emulate flash ready() call after 100ms.
				window.setTimeout( function() {
					self.internal.ready = true;
					self.version.flash = "n/a";
					self._trigger($.jPlayer.event.ready);
				}, 100);
			}

			// Set up the css selectors for the control and feedback entities.
			$.each(this.options.cssSelector, function(fn, cssSel) {
				self._cssSelector(fn, cssSel);
			});

			this._updateInterface();
			this._updateButtons(false);
			this._updateVolume(this.status.volume);
			this._updateMute(this.status.muted);
			if(this.css.jq.videoPlay.length) {
				this.css.jq.videoPlay.hide();
			}
			$.jPlayer.prototype.count++; // Change static variable via prototype.
		},
		destroy: function() {
			// MJP: The background change remains. Review later.

			// Reset the interface, remove seeking effect and times.
			this._resetStatus();
			this._updateInterface();
			this._seeked();
			if(this.css.jq.currentTime.length) {
				this.css.jq.currentTime.text("");
			}
			if(this.css.jq.duration.length) {
				this.css.jq.duration.text("");
			}

			if(this.status.srcSet) { // Or you get a bogus error event
				this.pause(); // Pauses the media and clears any delayed commands used in the HTML solution.
			}
			$.each(this.css.jq, function(fn, jq) { // Remove any bindings from the interface controls.
				jq.unbind(".jPlayer");
			});
			this.element.removeData("jPlayer"); // Remove jPlayer data
			this.element.unbind(".jPlayer"); // Remove all event handlers created by the jPlayer constructor
			this.element.empty(); // Remove the inserted child elements
			
			this.instances[this.internal.instance] = undefined; // Clear the instance on the static instance object
		},
		enable: function() { // Plan to implement
			// options.disabled = false
		},
		disable: function () { // Plan to implement
			// options.disabled = true
		},
		_addHtmlEventListeners: function(mediaElement, entity) {
			var self = this;
			mediaElement.preload = this.options.preload;
			mediaElement.muted = this.options.muted;

			// Create the event listeners
			// Only want the active entity to affect jPlayer and bubble events.
			// Using entity.gate so that object is referenced and gate property always current
			
			mediaElement.addEventListener("progress", function() {
				if(entity.gate && !self.status.waitForLoad) {
					self._getHtmlStatus(mediaElement);
					self._updateInterface();
					self._trigger($.jPlayer.event.progress);
				}
			}, false);
			mediaElement.addEventListener("timeupdate", function() {
				if(entity.gate && !self.status.waitForLoad) {
					self._getHtmlStatus(mediaElement);
					self._updateInterface();
					self._trigger($.jPlayer.event.timeupdate);
				}
			}, false);
			mediaElement.addEventListener("durationchange", function() {
				if(entity.gate && !self.status.waitForLoad) {
					self.status.duration = this.duration;
					self._getHtmlStatus(mediaElement);
					self._updateInterface();
					self._trigger($.jPlayer.event.durationchange);
				}
			}, false);
			mediaElement.addEventListener("play", function() {
				if(entity.gate && !self.status.waitForLoad) {
					self._updateButtons(true);
					self._trigger($.jPlayer.event.play);
				}
			}, false);
			mediaElement.addEventListener("playing", function() {
				if(entity.gate && !self.status.waitForLoad) {
					self._updateButtons(true);
					self._seeked();
					self._trigger($.jPlayer.event.playing);
				}
			}, false);
			mediaElement.addEventListener("pause", function() {
				if(entity.gate && !self.status.waitForLoad) {
					self._updateButtons(false);
					self._trigger($.jPlayer.event.pause);
				}
			}, false);
			mediaElement.addEventListener("waiting", function() {
				if(entity.gate && !self.status.waitForLoad) {
					self._seeking();
					self._trigger($.jPlayer.event.waiting);
				}
			}, false);
			mediaElement.addEventListener("canplay", function() {
				if(entity.gate && !self.status.waitForLoad) {
					mediaElement.volume = self._volumeFix(self.status.volume);
					self._trigger($.jPlayer.event.canplay);
				}
			}, false);
			mediaElement.addEventListener("seeking", function() {
				if(entity.gate && !self.status.waitForLoad) {
					self._seeking();
					self._trigger($.jPlayer.event.seeking);
				}
			}, false);
			mediaElement.addEventListener("seeked", function() {
				if(entity.gate && !self.status.waitForLoad) {
					self._seeked();
					self._trigger($.jPlayer.event.seeked);
				}
			}, false);
			mediaElement.addEventListener("suspend", function() { // Seems to be the only way of capturing that the iOS4 browser did not actually play the media from the page code. ie., It needs a user gesture.
				if(entity.gate && !self.status.waitForLoad) {
					self._seeked();
					self._trigger($.jPlayer.event.suspend);
				}
			}, false);
			mediaElement.addEventListener("ended", function() {
				if(entity.gate && !self.status.waitForLoad) {
					// Order of the next few commands are important. Change the time and then pause.
					// Solves a bug in Firefox, where issuing pause 1st causes the media to play from the start. ie., The pause is ignored.
					if(!$.jPlayer.browser.webkit) { // Chrome crashes if you do this in conjunction with a setMedia command in an ended event handler. ie., The playlist demo.
						self.htmlElement.media.currentTime = 0; // Safari does not care about this command. ie., It works with or without this line. (Both Safari and Chrome are Webkit.)
					}
					self.htmlElement.media.pause(); // Pause otherwise a click on the progress bar will play from that point, when it shouldn't, since it stopped playback.
					self._updateButtons(false);
					self._getHtmlStatus(mediaElement, true); // With override true. Otherwise Chrome leaves progress at full.
					self._updateInterface();
					self._trigger($.jPlayer.event.ended);
				}
			}, false);
			mediaElement.addEventListener("error", function() {
				if(entity.gate && !self.status.waitForLoad) {
					self._updateButtons(false);
					self._seeked();
					if(self.status.srcSet) { // Deals with case of clearMedia() causing an error event.
						self.status.waitForLoad = true; // Allows the load operation to try again.
						self.status.waitForPlay = true; // Reset since a play was captured.
						if(self.status.video) {
							self.internal.video.jq.css({'width':'0px', 'height':'0px'});
						}
						if(self._validString(self.status.media.poster)) {
							self.internal.poster.jq.show();
						}
						if(self.css.jq.videoPlay.length) {
							self.css.jq.videoPlay.show();
						}
						self._error( {
							type: $.jPlayer.error.URL,
							context: self.status.src, // this.src shows absolute urls. Want context to show the url given.
							message: $.jPlayer.errorMsg.URL,
							hint: $.jPlayer.errorHint.URL
						});
					}
				}
			}, false);
			// Create all the other event listeners that bubble up to a jPlayer event from html, without being used by jPlayer.
			$.each($.jPlayer.htmlEvent, function(i, eventType) {
				mediaElement.addEventListener(this, function() {
					if(entity.gate && !self.status.waitForLoad) {
						self._trigger($.jPlayer.event[eventType]);
					}
				}, false);
			});
		},
		_getHtmlStatus: function(media, override) {
			var ct = 0, d = 0, cpa = 0, sp = 0, cpr = 0;
			
			ct = media.currentTime;
			cpa = (this.status.duration > 0) ? 100 * ct / this.status.duration : 0;
			if((typeof media.seekable === "object") && (media.seekable.length > 0)) {
				sp = (this.status.duration > 0) ? 100 * media.seekable.end(media.seekable.length-1) / this.status.duration : 100;
				cpr = 100 * media.currentTime / media.seekable.end(media.seekable.length-1);
			} else {
				sp = 100;
				cpr = cpa;
			}
			
			if(override) {
				ct = 0;
				cpr = 0;
				cpa = 0;
			}

			this.status.seekPercent = sp;
			this.status.currentPercentRelative = cpr;
			this.status.currentPercentAbsolute = cpa;
			this.status.currentTime = ct;
		},
		_resetStatus: function() {
			var self = this;
			this.status = $.extend({}, this.status, $.jPlayer.prototype.status); // Maintains the status properties that persist through a reset. ie., The properties of this._status, contained in the current this.status.

		},
		_trigger: function(eventType, error, warning) { // eventType always valid as called using $.jPlayer.event.eventType
			var event = $.Event(eventType);
			event.jPlayer = {};
			event.jPlayer.version = $.extend({}, this.version);
			event.jPlayer.status = $.extend(true, {}, this.status); // Deep copy
			event.jPlayer.html = $.extend(true, {}, this.html); // Deep copy
			event.jPlayer.flash = $.extend(true, {}, this.flash); // Deep copy
			if(error) event.jPlayer.error = $.extend({}, error);
			if(warning) event.jPlayer.warning = $.extend({}, warning);
			this.element.trigger(event);
		},
		jPlayerFlashEvent: function(eventType, status) { // Called from Flash
			if(eventType === $.jPlayer.event.ready && !this.internal.ready) {
				this.internal.ready = true;
				this.version.flash = status.version;
				if(this.version.needFlash !== this.version.flash) {
					this._error( {
						type: $.jPlayer.error.VERSION,
						context: this.version.flash,
						message: $.jPlayer.errorMsg.VERSION + this.version.flash,
						hint: $.jPlayer.errorHint.VERSION
					});
				}
				this._trigger(eventType);
			}
			if(this.flash.gate) {
				switch(eventType) {
					case $.jPlayer.event.progress:
						this._getFlashStatus(status);
						this._updateInterface();
						this._trigger(eventType);
						break;
					case $.jPlayer.event.timeupdate:
						this._getFlashStatus(status);
						this._updateInterface();
						this._trigger(eventType);
						break;
					case $.jPlayer.event.play:
						this._seeked();
						this._updateButtons(true);
						this._trigger(eventType);
						break;
					case $.jPlayer.event.pause:
						this._updateButtons(false);
						this._trigger(eventType);
						break;
					case $.jPlayer.event.ended:
						this._updateButtons(false);
						this._trigger(eventType);
						break;
					case $.jPlayer.event.error:
						this.status.waitForLoad = true; // Allows the load operation to try again.
						this.status.waitForPlay = true; // Reset since a play was captured.
						if(this.status.video) {
							this.internal.flash.jq.css({'width':'0px', 'height':'0px'});
						}
						if(this._validString(this.status.media.poster)) {
							this.internal.poster.jq.show();
						}
						if(this.css.jq.videoPlay.length) {
							this.css.jq.videoPlay.show();
						}
						if(this.status.video) { // Set up for another try. Execute before error event.
							this._flash_setVideo(this.status.media);
						} else {
							this._flash_setAudio(this.status.media);
						}
						this._error( {
							type: $.jPlayer.error.URL,
							context:status.src,
							message: $.jPlayer.errorMsg.URL,
							hint: $.jPlayer.errorHint.URL
						});
						break;
					case $.jPlayer.event.seeking:
						this._seeking();
						this._trigger(eventType);
						break;
					case $.jPlayer.event.seeked:
						this._seeked();
						this._trigger(eventType);
						break;
					default:
						this._trigger(eventType);
				}
			}
			return false;
		},
		_getFlashStatus: function(status) {
			this.status.seekPercent = status.seekPercent;
			this.status.currentPercentRelative = status.currentPercentRelative;
			this.status.currentPercentAbsolute = status.currentPercentAbsolute;
			this.status.currentTime = status.currentTime;
			this.status.duration = status.duration;
		},
		_updateButtons: function(playing) {
			this.status.paused = !playing;
			if(this.css.jq.play.length && this.css.jq.pause.length) {
				if(playing) {
					this.css.jq.play.hide();
					this.css.jq.pause.show();
				} else {
					this.css.jq.play.show();
					this.css.jq.pause.hide();
				}
			}
		},
		_updateInterface: function() {
			if(this.css.jq.seekBar.length) {
				this.css.jq.seekBar.width(this.status.seekPercent+"%");
			}
			if(this.css.jq.playBar.length) {
				this.css.jq.playBar.width(this.status.currentPercentRelative+"%");
			}
			if(this.css.jq.currentTime.length) {
				this.css.jq.currentTime.text($.jPlayer.convertTime(this.status.currentTime));
			}
			if(this.css.jq.duration.length) {
				this.css.jq.duration.text($.jPlayer.convertTime(this.status.duration));
			}
		},
		_seeking: function() {
			if(this.css.jq.seekBar.length) {
				this.css.jq.seekBar.addClass("jp-seeking-bg");
			}
		},
		_seeked: function() {
			if(this.css.jq.seekBar.length) {
				this.css.jq.seekBar.removeClass("jp-seeking-bg");
			}
		},
		setMedia: function(media) {
		
			/*	media[format] = String: URL of format. Must contain all of the supplied option's video or audio formats.
			 *	media.poster = String: Video poster URL.
			 *	media.subtitles = String: * NOT IMPLEMENTED * URL of subtitles SRT file
			 *	media.chapters = String: * NOT IMPLEMENTED * URL of chapters SRT file
			 *	media.stream = Boolean: * NOT IMPLEMENTED * Designating actual media streams. ie., "false/undefined" for files. Plan to refresh the flash every so often.
			 */
			
			var self = this;
			
			this._seeked();
			clearTimeout(this.internal.htmlDlyCmdId); // Clears any delayed commands used in the HTML solution.

			// Store the current html gates, since we need for clearMedia() conditions.
			var audioGate = this.html.audio.gate;
			var videoGate = this.html.video.gate;

			var supported = false;
			$.each(this.formats, function(formatPriority, format) {
				var isVideo = self.format[format].media === 'video';
				$.each(self.solutions, function(solutionPriority, solution) {
					if(self[solution].support[format] && self._validString(media[format])) { // Format supported in solution and url given for format.
						var isHtml = solution === 'html';
						
						if(isVideo) {
							if(isHtml) {
								self.html.audio.gate = false;
								self.html.video.gate = true;
								self.flash.gate = false;
							} else {
								self.html.audio.gate = false;
								self.html.video.gate = false;
								self.flash.gate = true;
							}
						} else {
							if(isHtml) {
								self.html.audio.gate = true;
								self.html.video.gate = false;
								self.flash.gate = false;
							} else {
								self.html.audio.gate = false;
								self.html.video.gate = false;
								self.flash.gate = true;
							}
						}

						// Clear media of the previous solution if:
						//  - it was Flash
						//  - changing from HTML to Flash
						//  - the HTML solution media type (audio or video) remained the same.
						// Note that, we must be careful with clearMedia() on iPhone, otherwise clearing the video when changing to audio corrupts the built in video player.
						if(self.flash.active || (self.html.active && self.flash.gate) || (audioGate === self.html.audio.gate && videoGate === self.html.video.gate)) {
							self.clearMedia();
						} else if(audioGate !== self.html.audio.gate && videoGate !== self.html.video.gate) { // If switching between html elements
							self._html_pause();
							// Hide the video if it was being used.
							if(self.status.video) {
								self.internal.video.jq.css({'width':'0px', 'height':'0px'});
							}
							self._resetStatus(); // Since clearMedia usually does this. Execute after status.video useage.
						}

						if(isVideo) {
							if(isHtml) {
								self._html_setVideo(media);
								self.html.active = true;
								self.flash.active = false;
							} else {
								self._flash_setVideo(media);
								self.html.active = false;
								self.flash.active = true;
							}
							if(self.css.jq.videoPlay.length) {
								self.css.jq.videoPlay.show();
							}
							self.status.video = true;
						} else {
							if(isHtml) {
								self._html_setAudio(media);
								self.html.active = true;
								self.flash.active = false;
							} else {
								self._flash_setAudio(media);
								self.html.active = false;
								self.flash.active = true;
							}
							if(self.css.jq.videoPlay.length) {
								self.css.jq.videoPlay.hide();
							}
							self.status.video = false;
						}
						
						supported = true;
						return false; // Exit $.each
					}
				});
				if(supported) {
					return false; // Exit $.each
				}
			});

			if(supported) {
				// Set poster after the possible clearMedia() command above. IE had issues since the IMG onload event occurred immediately when cached. ie., The clearMedia() hide the poster.
				if(this._validString(media.poster)) {
					if(this.htmlElement.poster.src !== media.poster) { // Since some browsers do not generate img onload event.
						this.htmlElement.poster.src = media.poster;
					} else {
						this.internal.poster.jq.show();
					}
				} else {
					this.internal.poster.jq.hide(); // Hide if not used, since clearMedia() does not always occur above. ie., HTML audio <-> video switching.
				}
				this.status.srcSet = true;
				this.status.media = $.extend({}, media);
				this._updateButtons(false);
				this._updateInterface();
			} else { // jPlayer cannot support any formats provided in this browser
				// Pause here if old media could be playing. Otherwise, playing media being changed to bad media would leave the old media playing.
				if(this.status.srcSet && !this.status.waitForPlay) {
					this.pause();
				}
				// Reset all the control flags
				this.html.audio.gate = false;
				this.html.video.gate = false;
				this.flash.gate = false;
				this.html.active = false;
				this.flash.active = false;
				// Reset status and interface.
				this._resetStatus();
				this._updateInterface();
				this._updateButtons(false);
				// Hide the any old media
				this.internal.poster.jq.hide();
				if(this.html.used && this.require.video) {
					this.internal.video.jq.css({'width':'0px', 'height':'0px'});
				}
				if(this.flash.used) {
					this.internal.flash.jq.css({'width':'0px', 'height':'0px'});
				}
				// Send an error event
				this._error( {
					type: $.jPlayer.error.NO_SUPPORT,
					context: "{supplied:'" + this.options.supplied + "'}",
					message: $.jPlayer.errorMsg.NO_SUPPORT,
					hint: $.jPlayer.errorHint.NO_SUPPORT
				});
			}
		},
		clearMedia: function() {
			this._resetStatus();
			this._updateButtons(false);

			this.internal.poster.jq.hide();

			clearTimeout(this.internal.htmlDlyCmdId);

			if(this.html.active) {
				this._html_clearMedia();
			} else if(this.flash.active) {
				this._flash_clearMedia();
			}
		},
		load: function() {
			if(this.status.srcSet) {
				if(this.html.active) {
					this._html_load();
				} else if(this.flash.active) {
					this._flash_load();
				}
			} else {
				this._urlNotSetError("load");
			}
		},
		play: function(time) {
			time = (typeof time === "number") ? time : NaN; // Remove jQuery event from click handler
			if(this.status.srcSet) {
				if(this.html.active) {
					this._html_play(time);
				} else if(this.flash.active) {
					this._flash_play(time);
				}
			} else {
				this._urlNotSetError("play");
			}
		},
		videoPlay: function(e) { // Handles clicks on the play button over the video poster
			this.play();
		},
		pause: function(time) {
			time = (typeof time === "number") ? time : NaN; // Remove jQuery event from click handler
			if(this.status.srcSet) {
				if(this.html.active) {
					this._html_pause(time);
				} else if(this.flash.active) {
					this._flash_pause(time);
				}
			} else {
				this._urlNotSetError("pause");
			}
		},
		pauseOthers: function() {
			var self = this;
			$.each(this.instances, function(i, element) {
				if(self.element !== element) { // Do not this instance.
					if(element.data("jPlayer").status.srcSet) { // Check that media is set otherwise would cause error event.
						element.jPlayer("pause");
					}
				}
			});
		},
		stop: function() {
			if(this.status.srcSet) {
				if(this.html.active) {
					this._html_pause(0);
				} else if(this.flash.active) {
					this._flash_pause(0);
				}
			} else {
				this._urlNotSetError("stop");
			}
		},
		playHead: function(p) {
			p = this._limitValue(p, 0, 100);
			if(this.status.srcSet) {
				if(this.html.active) {
					this._html_playHead(p);
				} else if(this.flash.active) {
					this._flash_playHead(p);
				}
			} else {
				this._urlNotSetError("playHead");
			}
		},
		mute: function() {
			this.status.muted = true;
			if(this.html.used) {
				this._html_mute(true);
			}
			if(this.flash.used) {
				this._flash_mute(true);
			}
			this._updateMute(true);
			this._updateVolume(0);
			this._trigger($.jPlayer.event.volumechange);
		},
		unmute: function() {
			this.status.muted = false;
			if(this.html.used) {
				this._html_mute(false);
			}
			if(this.flash.used) {
				this._flash_mute(false);
			}
			this._updateMute(false);
			this._updateVolume(this.status.volume);
			this._trigger($.jPlayer.event.volumechange);
		},
		_updateMute: function(mute) {
			if(this.css.jq.mute.length && this.css.jq.unmute.length) {
				if(mute) {
					this.css.jq.mute.hide();
					this.css.jq.unmute.show();
				} else {
					this.css.jq.mute.show();
					this.css.jq.unmute.hide();
				}
			}
		},
		volume: function(v) {
			v = this._limitValue(v, 0, 1);
			this.status.volume = v;

			if(this.html.used) {
				this._html_volume(v);
			}
			if(this.flash.used) {
				this._flash_volume(v);
			}
			if(!this.status.muted) {
				this._updateVolume(v);
			}
			this._trigger($.jPlayer.event.volumechange);
		},
		volumeBar: function(e) { // Handles clicks on the volumeBar
			if(!this.status.muted && this.css.jq.volumeBar) { // Ignore clicks when muted
				var offset = this.css.jq.volumeBar.offset();
				var x = e.pageX - offset.left;
				var w = this.css.jq.volumeBar.width();
				var v = x/w;
				this.volume(v);
			}
		},
		volumeBarValue: function(e) { // Handles clicks on the volumeBarValue
			this.volumeBar(e);
		},
		_updateVolume: function(v) {
			if(this.css.jq.volumeBarValue.length) {
				this.css.jq.volumeBarValue.width((v*100)+"%");
			}
		},
		_volumeFix: function(v) { // Need to review if this is still necessary on latest Chrome
			var rnd = 0.001 * Math.random(); // Fix for Chrome 4: Fix volume being set multiple times before playing bug.
			var fix = (v < 0.5) ? rnd : -rnd; // Fix for Chrome 4: Solves volume change before play bug. (When new vol == old vol Chrome 4 does nothing!)
			return (v + fix); // Fix for Chrome 4: Event solves initial volume not being set correctly.
		},
		_cssSelectorAncestor: function(ancestor, refresh) {
			this.options.cssSelectorAncestor = ancestor;
			if(refresh) {
				$.each(this.options.cssSelector, function(fn, cssSel) {
					self._cssSelector(fn, cssSel);
				});
			}
		},
		_cssSelector: function(fn, cssSel) {
			var self = this;
			if(typeof cssSel === 'string') {
				if($.jPlayer.prototype.options.cssSelector[fn]) {
					if(this.css.jq[fn] && this.css.jq[fn].length) {
						this.css.jq[fn].unbind(".jPlayer");
					}
					this.options.cssSelector[fn] = cssSel;
					this.css.cs[fn] = this.options.cssSelectorAncestor + " " + cssSel;

					if(cssSel) { // Checks for empty string
						this.css.jq[fn] = $(this.css.cs[fn]);
					} else {
						this.css.jq[fn] = []; // To comply with the css.jq[fn].length check before its use. As of jQuery 1.4 could have used $() for an empty set. 
					}

					if(this.css.jq[fn].length) {
						var handler = function(e) {
							self[fn](e);
							$(this).blur();
							return false;
						}
						this.css.jq[fn].bind("click.jPlayer", handler); // Using jPlayer namespace
					}

					if(cssSel && this.css.jq[fn].length !== 1) { // So empty strings do not generate the warning. ie., they just remove the old one.
						this._warning( {
							type: $.jPlayer.warning.CSS_SELECTOR_COUNT,
							context: this.css.cs[fn],
							message: $.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[fn].length + " found for " + fn + " method.",
							hint: $.jPlayer.warningHint.CSS_SELECTOR_COUNT
						});
					}
				} else {
					this._warning( {
						type: $.jPlayer.warning.CSS_SELECTOR_METHOD,
						context: fn,
						message: $.jPlayer.warningMsg.CSS_SELECTOR_METHOD,
						hint: $.jPlayer.warningHint.CSS_SELECTOR_METHOD
					});
				}
			} else {
				this._warning( {
					type: $.jPlayer.warning.CSS_SELECTOR_STRING,
					context: cssSel,
					message: $.jPlayer.warningMsg.CSS_SELECTOR_STRING,
					hint: $.jPlayer.warningHint.CSS_SELECTOR_STRING
				});
			}
		},
		seekBar: function(e) { // Handles clicks on the seekBar
			if(this.css.jq.seekBar) {
				var offset = this.css.jq.seekBar.offset();
				var x = e.pageX - offset.left;
				var w = this.css.jq.seekBar.width();
				var p = 100*x/w;
				this.playHead(p);
			}
		},
		playBar: function(e) { // Handles clicks on the playBar
			this.seekBar(e);
		},
		currentTime: function(e) { // Handles clicks on the text
			// Added to avoid errors using cssSelector system for the text
		},
		duration: function(e) { // Handles clicks on the text
			// Added to avoid errors using cssSelector system for the text
		},
		// Options code adapted from ui.widget.js (1.8.7).  Made changes so the key can use dot notation. To match previous getData solution in jPlayer 1.
		option: function(key, value) {
			var options = key;

			 // Enables use: options().  Returns a copy of options object
			if ( arguments.length === 0 ) {
				return $.extend( true, {}, this.options );
			}

			if(typeof key === "string") {
				var keys = key.split(".");

				 // Enables use: options("someOption")  Returns a copy of the option. Supports dot notation.
				if(value === undefined) {

					var opt = $.extend(true, {}, this.options);
					for(var i = 0; i < keys.length; i++) {
						if(opt[keys[i]] !== undefined) {
							opt = opt[keys[i]];
						} else {
							this._warning( {
								type: $.jPlayer.warning.OPTION_KEY,
								context: key,
								message: $.jPlayer.warningMsg.OPTION_KEY,
								hint: $.jPlayer.warningHint.OPTION_KEY
							});
							return undefined;
						}
					}
					return opt;
				}

				 // Enables use: options("someOptionObject", someObject}).  Creates: {someOptionObject:someObject}
				 // Enables use: options("someOption", someValue).  Creates: {someOption:someValue}
				 // Enables use: options("someOptionObject.someOption", someValue).  Creates: {someOptionObject:{someOption:someValue}}

				options = {};
				var opt = options;

				for(var i = 0; i < keys.length; i++) {
					if(i < keys.length - 1) {
						opt[keys[i]] = {};
						opt = opt[keys[i]];
					} else {
						opt[keys[i]] = value;
					}
				}
			}

			 // Otherwise enables use: options(optionObject).  Uses original object (the key)

			this._setOptions(options);

			return this;
		},
		_setOptions: function(options) {
			var self = this;
			$.each(options, function(key, value) { // This supports the 2 level depth that the options of jPlayer has. Would review if we ever need more depth.
				self._setOption(key, value);
			});

			return this;
		},
		_setOption: function(key, value) {
			var self = this;

			// The ability to set options is limited at this time.

			switch(key) {
				case "cssSelectorAncestor" :
					this.options[key] = value;
					$.each(self.options.cssSelector, function(fn, cssSel) { // Refresh all associations for new ancestor.
						self._cssSelector(fn, cssSel);
					});
					break;
				case "cssSelector" :
					$.each(value, function(fn, cssSel) {
						self._cssSelector(fn, cssSel);
					});
					break;
			}

			return this;
		},
		// End of: (Options code adapted from ui.widget.js)

		// The resize() set of functions are not implemented yet.
		// Basically are currently used to allow Flash debugging without too much hassle.
		resize: function(css) {
			// MJP: Want to run some checks on dim {} first.
			if(this.html.active) {
				this._resizeHtml(css);
			}
			if(this.flash.active) {
				this._resizeFlash(css);
			}
			this._trigger($.jPlayer.event.resize);
		},
		_resizePoster: function(css) {
			// Not implemented yet
		},
		_resizeHtml: function(css) {
			// Not implemented yet
		},
		_resizeFlash: function(css) {
			this.internal.flash.jq.css({'width':css.width, 'height':css.height});
		},

		_html_initMedia: function() {
			if(this.status.srcSet  && !this.status.waitForPlay) {
				this.htmlElement.media.pause();
			}
			if(this.options.preload !== 'none') {
				this._html_load();
			}
			this._trigger($.jPlayer.event.timeupdate); // The flash generates this event for its solution.
		},
		_html_setAudio: function(media) {
			var self = this;
			// Always finds a format due to checks in setMedia()
			$.each(this.formats, function(priority, format) {
				if(self.html.support[format] && media[format]) {
					self.status.src = media[format];
					self.status.format[format] = true;
					self.status.formatType = format;
					return false;
				}
			});
			this.htmlElement.media = this.htmlElement.audio;
			this._html_initMedia();
		},
		_html_setVideo: function(media) {
			var self = this;
			// Always finds a format due to checks in setMedia()
			$.each(this.formats, function(priority, format) {
				if(self.html.support[format] && media[format]) {
					self.status.src = media[format];
					self.status.format[format] = true;
					self.status.formatType = format;
					return false;
				}
			});
			this.htmlElement.media = this.htmlElement.video;
			this._html_initMedia();
		},
		_html_clearMedia: function() {
			if(this.htmlElement.media) {
				if(this.htmlElement.media.id === this.internal.video.id) {
					this.internal.video.jq.css({'width':'0px', 'height':'0px'});
				}
				this.htmlElement.media.pause();
				this.htmlElement.media.src = "";

				if(!($.browser.msie && Number($.browser.version) >= 9)) { // IE9 Bug: media.load() on broken src causes an exception. In try/catch IE9 generates the error event too, but it is delayed and corrupts jPlayer's event masking.
					this.htmlElement.media.load(); // Stops an old, "in progress" download from continuing the download. Triggers the loadstart, error and emptied events, due to the empty src. Also an abort event if a download was in progress.
				}
			}
		},
		_html_load: function() {
			if(this.status.waitForLoad) {
				this.status.waitForLoad = false;
				this.htmlElement.media.src = this.status.src;
				try {
					this.htmlElement.media.load(); // IE9 Beta throws an exception here on broken links. Review again later as IE9 Beta matures
				} catch(err) {}
			}
			clearTimeout(this.internal.htmlDlyCmdId);
		},
		_html_play: function(time) {
			var self = this;
			this._html_load(); // Loads if required and clears any delayed commands.

			this.htmlElement.media.play(); // Before currentTime attempt otherwise Firefox 4 Beta never loads.

			if(!isNaN(time)) {
				try {
					this.htmlElement.media.currentTime = time;
				} catch(err) {
					this.internal.htmlDlyCmdId = setTimeout(function() {
						self.play(time);
					}, 100);
					return; // Cancel execution and wait for the delayed command.
				}
			}
			this._html_checkWaitForPlay();
		},
		_html_pause: function(time) {
			var self = this;
			
			if(time > 0) { // We do not want the stop() command, which does pause(0), causing a load operation.
				this._html_load(); // Loads if required and clears any delayed commands.
			} else {
				clearTimeout(this.internal.htmlDlyCmdId);
			}

			// Order of these commands is important for Safari (Win) and IE9. Pause then change currentTime.
			this.htmlElement.media.pause();

			if(!isNaN(time)) {
				try {
					this.htmlElement.media.currentTime = time;
				} catch(err) {
					this.internal.htmlDlyCmdId = setTimeout(function() {
						self.pause(time);
					}, 100);
					return; // Cancel execution and wait for the delayed command.
				}
			}
			if(time > 0) { // Avoids a setMedia() followed by stop() or pause(0) hiding the video play button.
				this._html_checkWaitForPlay();
			}
		},
		_html_playHead: function(percent) {
			var self = this;
			this._html_load(); // Loads if required and clears any delayed commands.
			try {
				if((typeof this.htmlElement.media.seekable === "object") && (this.htmlElement.media.seekable.length > 0)) {
					this.htmlElement.media.currentTime = percent * this.htmlElement.media.seekable.end(this.htmlElement.media.seekable.length-1) / 100;
				} else if(this.htmlElement.media.duration > 0 && !isNaN(this.htmlElement.media.duration)) {
					this.htmlElement.media.currentTime = percent * this.htmlElement.media.duration / 100;
				} else {
					throw "e";
				}
			} catch(err) {
				this.internal.htmlDlyCmdId = setTimeout(function() {
					self.playHead(percent);
				}, 100);
				return; // Cancel execution and wait for the delayed command.
			}
			if(!this.status.waitForLoad) {
				this._html_checkWaitForPlay();
			}
		},
		_html_checkWaitForPlay: function() {
			if(this.status.waitForPlay) {
				this.status.waitForPlay = false;
				if(this.css.jq.videoPlay.length) {
					this.css.jq.videoPlay.hide();
				}
				if(this.status.video) {
					this.internal.poster.jq.hide();
					this.internal.video.jq.css({'width': this.status.width, 'height': this.status.height});
				}
			}
		},
		_html_volume: function(v) {
			if(this.html.audio.available) {
				this.htmlElement.audio.volume = v;
			}
			if(this.html.video.available) {
				this.htmlElement.video.volume = v;
			}
		},
		_html_mute: function(m) {
			if(this.html.audio.available) {
				this.htmlElement.audio.muted = m;
			}
			if(this.html.video.available) {
				this.htmlElement.video.muted = m;
			}
		},
		_flash_setAudio: function(media) {
			var self = this;
			try {
				// Always finds a format due to checks in setMedia()
				$.each(this.formats, function(priority, format) {
					if(self.flash.support[format] && media[format]) {
						switch (format) {
							case "m4a" :
								self._getMovie().fl_setAudio_m4a(media[format]);
								break;
							case "mp3" :
								self._getMovie().fl_setAudio_mp3(media[format]);
								break;
						}
						self.status.src = media[format];
						self.status.format[format] = true;
						self.status.formatType = format;
						return false;
					}
				});

				if(this.options.preload === 'auto') {
					this._flash_load();
					this.status.waitForLoad = false;
				}
			} catch(err) { this._flashError(err); }
		},
		_flash_setVideo: function(media) {
			var self = this;
			try {
				// Always finds a format due to checks in setMedia()
				$.each(this.formats, function(priority, format) {
					if(self.flash.support[format] && media[format]) {
						switch (format) {
							case "m4v" :
								self._getMovie().fl_setVideo_m4v(media[format]);
								break;
						}
						self.status.src = media[format];
						self.status.format[format] = true;
						self.status.formatType = format;
						return false;
					}
				});

				if(this.options.preload === 'auto') {
					this._flash_load();
					this.status.waitForLoad = false;
				}
			} catch(err) { this._flashError(err); }
		},
		_flash_clearMedia: function() {
			this.internal.flash.jq.css({'width':'0px', 'height':'0px'}); // Must do via CSS as setting attr() to zero causes a jQuery error in IE.
			try {
				this._getMovie().fl_clearMedia();
			} catch(err) { this._flashError(err); }
		},
		_flash_load: function() {
			try {
				this._getMovie().fl_load();
			} catch(err) { this._flashError(err); }
			this.status.waitForLoad = false;
		},
		_flash_play: function(time) {
			try {
				this._getMovie().fl_play(time);
			} catch(err) { this._flashError(err); }
			this.status.waitForLoad = false;
			this._flash_checkWaitForPlay();
		},
		_flash_pause: function(time) {
			try {
				this._getMovie().fl_pause(time);
			} catch(err) { this._flashError(err); }
			if(time > 0) { // Avoids a setMedia() followed by stop() or pause(0) hiding the video play button.
				this.status.waitForLoad = false;
				this._flash_checkWaitForPlay();
			}
		},
		_flash_playHead: function(p) {
			try {
				this._getMovie().fl_play_head(p)
			} catch(err) { this._flashError(err); }
			if(!this.status.waitForLoad) {
				this._flash_checkWaitForPlay();
			}
		},
		_flash_checkWaitForPlay: function() {
			if(this.status.waitForPlay) {
				this.status.waitForPlay = false;
				if(this.css.jq.videoPlay.length) {
					this.css.jq.videoPlay.hide();
				}
				if(this.status.video) {
					this.internal.poster.jq.hide();
					this.internal.flash.jq.css({'width': this.status.width, 'height': this.status.height});
				}
			}
		},
		_flash_volume: function(v) {
			try {
				this._getMovie().fl_volume(v);
			} catch(err) { this._flashError(err); }
		},
		_flash_mute: function(m) {
			try {
				this._getMovie().fl_mute(m);
			} catch(err) { this._flashError(err); }
		},
		_getMovie: function() {
			return document[this.internal.flash.id];
		},
		_checkForFlash: function (version) {
			// Function checkForFlash adapted from FlashReplace by Robert Nyman
			// http://code.google.com/p/flashreplace/
			var flashIsInstalled = false;
			var flash;
			if(window.ActiveXObject){
				try{
					flash = new ActiveXObject(("ShockwaveFlash.ShockwaveFlash." + version));
					flashIsInstalled = true;
				}
				catch(e){
					// Throws an error if the version isn't available			
				}
			}
			else if(navigator.plugins && navigator.mimeTypes.length > 0){
				flash = navigator.plugins["Shockwave Flash"];
				if(flash){
					var flashVersion = navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1");
					if(flashVersion >= version){
						flashIsInstalled = true;
					}
				}
			}
			if($.browser.msie && Number($.browser.version) >= 9) { // IE9 does not work with external interface. With dynamic Flash insertion like jPlayer uses.
				return false;
			} else {
				return flashIsInstalled;
			}
		},
		_validString: function(url) {
			return (url && typeof url === "string"); // Empty strings return false
		},
		_limitValue: function(value, min, max) {
			return (value < min) ? min : ((value > max) ? max : value);
		},
		_urlNotSetError: function(context) {
			this._error( {
				type: $.jPlayer.error.URL_NOT_SET,
				context: context,
				message: $.jPlayer.errorMsg.URL_NOT_SET,
				hint: $.jPlayer.errorHint.URL_NOT_SET
			});
		},
		_flashError: function(error) {
			this._error( {
				type: $.jPlayer.error.FLASH,
				context: this.internal.flash.swf,
				message: $.jPlayer.errorMsg.FLASH + error.message,
				hint: $.jPlayer.errorHint.FLASH
			});
		},
		_error: function(error) {
			this._trigger($.jPlayer.event.error, error);
			if(this.options.errorAlerts) {
				this._alert("Error!" + (error.message ? "\n\n" + error.message : "") + (error.hint ? "\n\n" + error.hint : "") + "\n\nContext: " + error.context);
			}
		},
		_warning: function(warning) {
			this._trigger($.jPlayer.event.warning, undefined, warning);
			if(this.options.errorAlerts) {
				this._alert("Warning!" + (warning.message ? "\n\n" + warning.message : "") + (warning.hint ? "\n\n" + warning.hint : "") + "\n\nContext: " + warning.context);
			}
		},
		_alert: function(message) {
			alert("jPlayer " + this.version.script + " : id='" + this.internal.self.id +"' : " + message);
		}
	};

	$.jPlayer.error = {
		FLASH: "e_flash",
		NO_SOLUTION: "e_no_solution",
		NO_SUPPORT: "e_no_support",
		URL: "e_url",
		URL_NOT_SET: "e_url_not_set",
		VERSION: "e_version"
	};

	$.jPlayer.errorMsg = {
		FLASH: "jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ", // Used in: _flashError()
		NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.", // Used in: _init()
		NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options.", // Used in: setMedia()
		URL: "Media URL could not be loaded.", // Used in: jPlayerFlashEvent() and _addHtmlEventListeners()
		URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set.", // Used in: load(), play(), pause(), stop() and playHead()
		VERSION: "jPlayer " + $.jPlayer.prototype.version.script + " needs Jplayer.swf version " + $.jPlayer.prototype.version.needFlash + " but found " // Used in: jPlayerReady()
	};

	$.jPlayer.errorHint = {
		FLASH: "Check your swfPath option and that Jplayer.swf is there.",
		NO_SOLUTION: "Review the jPlayer options: support and supplied.",
		NO_SUPPORT: "Video or audio formats defined in the supplied option are missing.",
		URL: "Check media URL is valid.",
		URL_NOT_SET: "Use setMedia() to set the media URL.",
		VERSION: "Update jPlayer files."
	};

	$.jPlayer.warning = {
		CSS_SELECTOR_COUNT: "e_css_selector_count",
		CSS_SELECTOR_METHOD: "e_css_selector_method",
		CSS_SELECTOR_STRING: "e_css_selector_string",
		OPTION_KEY: "e_option_key"
	};

	$.jPlayer.warningMsg = {
		CSS_SELECTOR_COUNT: "The number of methodCssSelectors found did not equal one: ",
		CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",
		CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
		OPTION_KEY: "The option requested in jPlayer('option') is undefined."
	};

	$.jPlayer.warningHint = {
		CSS_SELECTOR_COUNT: "Check your css selector and the ancestor.",
		CSS_SELECTOR_METHOD: "Check your method name.",
		CSS_SELECTOR_STRING: "Check your css selector is a string.",
		OPTION_KEY: "Check your option name."
	};
})(jQuery);
