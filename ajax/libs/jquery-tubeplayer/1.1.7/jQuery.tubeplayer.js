/*! jQuery TubePlayer - v1.1.7 - 2013-09-24
* https://github.com/nirvanatikku/jQuery-TubePlayer-Plugin
* Copyright (c) 2013 Nirvana Tikku; Licensed MIT */
(function($) {

	'use strict';

	//
	//  namespace
	//
	var TUBEPLAYER = ".tubeplayer",

		TUBEPLAYER_CLASS = "jquery-youtube-tubeplayer",

		OPTS = "opts" + TUBEPLAYER;

	//	
	//
	// TubePlayer package 
	//
	//
	var TP = {
		
		inited: false,				// tubeplayer inited flag - for destroy/re-init
		
		ytplayers: {},				// all the instances that exist
		
		inits: [],					// local init functions for multiple iframe players
		
		iframeScriptInited: false,	// no need to import the iframe script multiple times
		
		State: { 
			'UNSTARTED': -1,
			'ENDED': 0,
			'PLAYING': 1,
			'PAUSED': 2,
			'BUFFERING': 3,
			'CUED': 5
		},
		
		Error: {
			'BAD_INIT': 0,
			'INVALID_PARAM': 2,
			'NOT_FOUND': 100,
			'NOT_EMBEDDABLE': 101,
			'CANT_PLAY': 150
		}
		
	};

	//
	//
	// public facing defaults
	//
	//
	$.tubeplayer = {
		
		events: {},				// events cache -- used by flashplayer version of video player
		
		TubePlayer: TP			// reference to the internal TubePlayer object. primarily exposed for testing.
		
	};

	/**
	 * These are all the events that are bound to the YouTube Player
	 * the events can be overridden as they are public.
	 *
	 * There are several functions that serve as wrappers to be utilized
	 * internally - stateChange, onError, qualityChange. Change them at your
	 * own risk.
	 */
	$.tubeplayer.defaults = {

		afterReady: function() {}, // args: $player

		stateChange: function(player) {

			var _ret = this.onPlayer;

			return function(state) {

				var _player = $('#'+player).parent();
			
				if (typeof(state) === "object") {
					state = state.data;
				}

				switch (state) {

				case TP.State.UNSTARTED:
					return _ret.unstarted[player].call(_player);

				case TP.State.ENDED:
					return _ret.ended[player].call(_player);

				case TP.State.PLAYING:
					return _ret.playing[player].call(_player);

				case TP.State.PAUSED:
					return _ret.paused[player].call(_player);

				case TP.State.BUFFERING:
					return _ret.buffering[player].call(_player);

				case TP.State.CUED:
					return _ret.cued[player].call(_player);

				default:
					return null;

				}
			};

		},

		onError: function(player) {

			var _ret = this.onErr;

			return function(errorCode) {
				
				var _player = $('#'+player).parent();

				if (typeof(errorCode) === "object") {
					errorCode = errorCode.data;
				}

				switch (errorCode) {

				case TP.Error.BAD_INIT:
				case TP.Error.INVALID_PARAM:
					return _ret.invalidParameter[player].call(_player);

				case TP.Error.NOT_FOUND:
					return _ret.notFound[player].call(_player);

				case TP.Error.NOT_EMBEDDABLE:
				case TP.Error.CANT_PLAY:
					return _ret.notEmbeddable[player].call(_player);

				default:
					return _ret.defaultError[player].call(_player);

				}

			};

		},

		qualityChange: function(player) {

			var _this = this;

			return function(suggested) {
				
				var _player = $('#'+player).parent();

				if (typeof(suggested) === "object") {
					suggested = suggested.data;
				}

				return _this.onQualityChange[player].call(_player, suggested);

			};

		},

		onQualityChange: {},

		onPlayer: {
			unstarted: {},
			ended: {},
			playing: {},
			paused: {},
			buffering: {},
			cued: {}
		},

		onErr: {
			defaultError: {},
			notFound: {},
			notEmbeddable: {},
			invalidParameter: {}
		}

	};

	/**
	 * These are the internal defaults for the TubePlayer
	 * plugin to work without providing any parameters. They
	 * are merged with the users options.
	 */
	var defaults = {

		// public facing
		width: 425,
		height: 355,
		allowFullScreen: "true",
		initialVideo: "DkoeNLuMbcI",
		start: 0,
		preferredQuality: "auto",
		showControls: true,
		showRelated: false,
		playsinline: false,
		annotations: true,
		autoPlay: false,
		autoHide: true,
		loop: 0,
		theme: 'dark',
		// 'dark' or 'light'
		color: 'red',
		// 'red' or 'white'
		showinfo: false,
		modestbranding: true,
		protocol: 'http',
		// set to 'https' for compatibility on SSL-enabled pages
		// with respect to [wmode] - 'transparent' maintains z-index, but disables GPU acceleration
		wmode: 'transparent',
		// you probably want to use 'window' when optimizing for mobile devices
		swfobjectURL: "ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",
		// exclude the protocol, it will be read from the 'protocol' property
		loadSWFObject: false,
		// by default, we will attempt to load the swfobject script, if utilizing the flash player
		// privately used
		allowScriptAccess: "always",
		playerID: "tubeplayer-player-container",

		// html5 specific attrs
		iframed: true,

		// functions called when events are triggered by using the tubeplayer interface
		onPlay: function() {}, // arg: id
		onPause: function() {},
		onStop: function() {},
		onSeek: function() {}, // arg: time
		onMute: function() {},
		onUnMute: function() {},

		// functions called when events are triggered from the youtube player itself
		onPlayerUnstarted: function() {},
		onPlayerEnded: function() {},
		onPlayerPlaying: function() {},
		onPlayerPaused: function() {},
		onPlayerBuffering: function() {},
		onPlayerCued: function() {},
		onQualityChange: function() {},

		// functions called when errors are thrown from the youtube player
		onError: function() {},
		onErrorNotFound: function() {},
		onErrorNotEmbeddable: function() {},
		onErrorInvalidParameter: function() {}

	};

	/**
	 * The TubePlayer plugin bound to the jQuery object's prototype.
	 * This method acts as an interface to instantiate a TubePlayer,
	 * as well as invoke events that are attached - typically getters/setters
	 */
	$.fn.tubeplayer = function(input, xtra) {

		var $this = $(this);

		var type = typeof input;

		if (arguments.length === 0 || type === "object") {

			return $this.each(function() {

				TP.init($(this), input);

			});

		} else if (type === "string") {

			return $this.triggerHandler(input + TUBEPLAYER, (typeof xtra !== 'undefined' ? xtra : null));
		
		}

	};


	/**
	 * This method is the base method for all the events
	 * that are bound to the TubePlayer.
	 */
	var wrap_fn = function(fn) {

		return function(evt, param) {

			var p = TP.getPkg(evt);

			if (p.ytplayer) {

				var ret = fn(evt, param, p);

				if (typeof(ret) === "undefined") {
					ret = p.$player;
				}

				return ret;

			}

			return p.$player;

		};

	};

	/**
	 * Public method to get all the player instances
	 */
	$.tubeplayer.getPlayers = function() {

		return TP.ytplayers;

	};


	/**
	 * Initialize a YouTube player;
	 *
	 *	First check to see if TubePlayer has been init'd
	 *	if it has then return, otherwise:
	 *		> add the tubeplayer class (used to denote a player)
	 *		> provide local data access to the options and store it
	 *		> initialize the default events on the jQuery instance
	 *		> create the container for the player
	 *		> initialize the player (iframe/HTML5 vs flash based)
	 *
	 *	@param $player - the instance being created on
	 *	@param opts - the user's options
	 */
	TP.init = function($player, opts) {

		if ($player.hasClass(TUBEPLAYER_CLASS)) return $player;

		var o = $.extend({}, defaults, opts);

		o.playerID += "-" + guid();

		$player.addClass(TUBEPLAYER_CLASS).data(OPTS, o);

		for (var event in PLAYER)
			$player.bind(event + TUBEPLAYER, $player, PLAYER[event]);

		// initialize the default event methods
		TP.initDefaults($.tubeplayer.defaults, o);

		// insert the player container
		$("<div></div>").attr("id", o.playerID).appendTo($player);

		// append the player into the container
		TP.initPlayer($player, o);

		return $player;

	};

	/**
	 * Every method needs these items
	 */
	TP.getPkg = function(evt) {

		var $player = evt.data;

		var opts = $player.data(OPTS);

		var ytplayer = TP.ytplayers[opts.playerID];

		return {

			$player: $player,

			opts: opts,

			ytplayer: ytplayer

		};

	};

	/**
	 * This method handles the player init. Since
	 * onYouTubePlayerReady is called when the script
	 * has been evaluated, we want all the instances
	 * to get init'd. For this we have a init queue.
	 * If the script has been init'd, we automatically
	 * pop the method off the queue and init the player.
	 */
	TP.iframeReady = function(o) {

		TP.inits.push(function() {

			new YT.Player(o.playerID, {

				videoId: o.initialVideo,

				width: o.width,

				height: o.height,

				playerVars: {

					'autoplay': (o.autoPlay ? 1 : 0),

					'autohide': (o.autoHide ? 1 : 0),

					'controls': (o.showControls ? 1 : 0),

					'loop': (o.loop ? 1 : 0),

					'playlist': (o.loop ? o.initialVideo : ""),

					'rel': (o.showRelated ? 1 : 0),

					'fs': (o.allowFullScreen ? 1 : 0),

					'wmode': o.wmode,

					'showinfo': (o.showinfo ? 1 : 0),

					'modestbranding': (o.modestbranding ? 1 : 0),

					'iv_load_policy': (o.annotations ? 1 : 3),

					'start': o.start,

					'theme': o.theme,

					'color': o.color,

					'playsinline': o.playsinline

				},

				events: {

					'onReady': function(evt) {

						TP.ytplayers[o.playerID] = evt.target;

						var $player = $(evt.target.getIframe()).parents("." + TUBEPLAYER_CLASS);

						$.tubeplayer.defaults.afterReady($player);

					},

					'onPlaybackQualityChange': $.tubeplayer.defaults.qualityChange(o.playerID),

					'onStateChange': $.tubeplayer.defaults.stateChange(o.playerID),

					'onError': $.tubeplayer.defaults.onError(o.playerID)

				}

			});

		});

		// stacked init method
		if (TP.inits.length >= 1 && !TP.inited) {

			return function() {

				for (var i = 0; i < TP.inits.length; i++) {

					TP.inits[i]();

				}

				TP.inited = true;

			};

		}

		// if we've inited already, just call the init fn
		if (TP.inited) {

			(TP.inits.pop())();

		}

		return window.onYouTubePlayerAPIReady;

	};

	/**
	 * @param d - the defaults
	 * @param o - the options w/ methods to attach
	 */
	TP.initDefaults = function(d, o) {

		var ID = o.playerID;

		// default onPlayer events
		var dp = d.onPlayer;
		dp.unstarted[ID] = o.onPlayerUnstarted;
		dp.ended[ID] = o.onPlayerEnded;
		dp.playing[ID] = o.onPlayerPlaying;
		dp.paused[ID] = o.onPlayerPaused;
		dp.buffering[ID] = o.onPlayerBuffering;
		dp.cued[ID] = o.onPlayerCued;

		// default onQualityChange
		d.onQualityChange[ID] = o.onQualityChange;

		// default onError events
		var de = d.onErr;
		de.defaultError[ID] = o.onError;
		de.notFound[ID] = o.onErrorNotFound;
		de.notEmbeddable[ID] = o.onErrorNotEmbeddable;
		de.invalidParameter[ID] = o.onErrorInvalidParameter;

	};

	/**
	 * init the iframed option if its requested and supported
	 * otherwise initialize the flash based player
	 * @param $player - the player that the tubeplayer binds to
	 * @param o - the init options
	 */
	TP.initPlayer = function($player, o) {

		if (o.iframed) TP.initIframePlayer($player, o);

		else TP.initFlashPlayer($player, o);

	};

	/**
	 * Initialize an iframe player
	 */
	TP.initIframePlayer = function($player, o) {

		if (!TP.iframeScriptInited) {

			// write the api script tag
			var tag = document.createElement('script');

			tag.src = o.protocol + "://www.youtube.com/iframe_api";

			var firstScriptTag = document.getElementsByTagName('script')[0];

			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			TP.iframeScriptInited = true;

		}

		// init the iframe player
		window.onYouTubePlayerAPIReady = TP.iframeReady(o);

	};

	/**
	 * Flash player initialization
	 *  -> if 'loadSWFObject' is set to true, player will only be init'd
	 *      when the swfobject script request has completed successfully
	 *  -> if 'loadSWFObject' is set to false, assumes that you have
	 *      imported your own SWFObject, prior to TubePlayer's initialization
	 * @imports swfobject automatically
	 */
	TP.initFlashPlayer = function($player, o) {

		if (o.loadSWFObject) {

			// cleanup swfobjectURL to re-apply the protocol
			o.swfobjectURL = o.swfobjectURL.replace('http://', '');
			o.swfobjectURL = o.swfobjectURL.replace('https://', '');
			o.swfobjectURL = o.protocol + '://' + o.swfobjectURL;

			$.getScript(o.swfobjectURL, TP.init_flash_player(o));

		} else {

			TP.init_flash_player(o)();

		}

	};

	TP.init_flash_player = function(o) {

		return function() {
			
			if(!window.swfobject){
				// no swfobject 
				alert("YouTube Player couldn't be initialized. Please include swfobject.");
				return;
			}

			var url = ["//www.youtube.com/v/"];
			url.push(o.initialVideo);
			url.push("?&enablejsapi=1&version=3");
			url.push("&playerapiid=" + o.playerID);
			url.push("&rel=" + (o.showRelated ? 1 : 0));
			url.push("&autoplay=" + (o.autoPlay ? 1 : 0));
			url.push("&autohide=" + (o.autoHide ? 1 : 0));
			url.push("&loop=" + (o.loop ? 1 : 0));
			url.push("&playlist=" + (o.loop ? o.initialVideo : ""));
			url.push("&controls=" + (o.showControls ? 1 : 0));
			url.push("&showinfo=" + (o.showinfo ? 1 : 0));
			url.push("&modestbranding=" + (o.modestbranding ? 1 : 0));
			url.push("&iv_load_policy=" + (o.annotations ? 1 : 3));
			url.push("&start=" + o.start);
			url.push("&theme=" + o.theme);
			url.push("&color=" + o.color);
			url.push("&playsinline=" + o.playsinline);
			url.push("&fs=" + (o.allowFullScreen ? 1 : 0));

			window.swfobject.embedSWF(url.join(""), o.playerID, o.width, o.height, "8", null, null, {
				allowScriptAccess: o.allowScriptAccess,
				wmode: o.wmode,
				allowFullScreen: o.allowFullScreen
			}, {
				id: o.playerID
			});

			// init the player ready fn
			window.onYouTubePlayerReady = function(playerId) {

				var player = document.getElementById(playerId);

				var pid = playerId.replace(/-/g, '');

				var d = $.tubeplayer.defaults;
				$.tubeplayer.events[pid] = {
					"stateChange": d.stateChange(playerId),
					"error": d.onError(playerId),
					"qualityChange": d.qualityChange(playerId)
				};

				player.addEventListener("onStateChange", "$.tubeplayer.events." + pid + ".stateChange");
				player.addEventListener("onError", "$.tubeplayer.events." + pid + ".error");
				player.addEventListener("onPlaybackQualityChange", "$.tubeplayer.events." + pid + ".qualityChange");

				TP.ytplayers[playerId] = player;

				var $player = $(player).parents("." + TUBEPLAYER_CLASS);

				$.tubeplayer.defaults.afterReady($player);

			};

		};

	};

	// fmt: youtube.com/watch?x=[anything]&v=[desired-token]&
	TP.getVideoIDFromURL = function(sURL) {

		sURL = sURL || ""; // make sure it's a string; sometimes the YT player API returns undefined, and then indexOf() below will fail
		var qryParamsStart = sURL.indexOf("?");

		var qryParams = sURL.substring(qryParamsStart, sURL.length);

		var videoStart = qryParams.indexOf("v=");
		if (videoStart > -1) {
			var videoEnd = qryParams.indexOf("&", videoStart);
			if (videoEnd === -1) {
				videoEnd = qryParams.length;
			}
			return qryParams.substring(videoStart + "v=".length, videoEnd);
		}

		return "";

	};

	/**
	 * All the events that are bound to a TubePlayer instance
	 */
	var PLAYER = {
		
		opts: wrap_fn(function(evt,param,p){
			
			return p.opts;
			
		}),

		cue: wrap_fn(function(evt, param, p) {

			p.ytplayer.cueVideoById(param, 0, p.opts.preferredQuality);

		}),

		play: wrap_fn(function(evt, param, p) {

			if (typeof(param) === 'object') p.ytplayer.loadVideoById({videoId: param.id, startSeconds: param.time, suggestedQuality: p.opts.preferredQuality });

			else if (typeof param !== 'undefined') p.ytplayer.loadVideoById({videoId: param, startSeconds: 0, suggestedQuality: p.opts.preferredQuality });

			else p.ytplayer.playVideo();

			p.opts.onPlay(param);

		}),

		pause: wrap_fn(function(evt, param, p) {

			p.ytplayer.pauseVideo();

			p.opts.onPause(p);

		}),

		stop: wrap_fn(function(evt, param, p) {

			p.ytplayer.stopVideo();

			p.opts.onStop(p);

		}),

		seek: wrap_fn(function(evt, param, p) {

			if (/:/.test(param)) {
				var parts = param.split(":").reverse();
				param = 0;
				for (var i = 0; i < parts.length; i++) {
					param += Math.pow(60, i) * (parts[i] | 0);
				}
			}

			p.ytplayer.seekTo(param, true);

			p.opts.onSeek(param);

		}),

		mute: wrap_fn(function(evt, param, p) {

			p.$player.attr("data-prev-mute-volume", p.ytplayer.getVolume());

			p.ytplayer.mute();

			p.opts.onMute(p);

		}),

		unmute: wrap_fn(function(evt, param, p) {

			p.ytplayer.unMute();

			p.ytplayer.setVolume((p.$player.attr("data-prev-mute-volume") || 50));

			p.opts.onUnMute();

		}),

		isMuted: wrap_fn(function(evt, param, p) {

			return p.ytplayer.isMuted();

		}),

		volume: wrap_fn(function(evt, param, p) {

			if (typeof param !== 'undefined') {

				p.ytplayer.setVolume(param);

				p.$player.attr("data-prev-mute-volume", p.ytplayer.getVolume());

			} else {

				return p.ytplayer.getVolume() || 0; // 0 because iframe's currently in labs
				
			}

		}),

		quality: wrap_fn(function(evt, param, p) {

			if (typeof param !== 'undefined') p.ytplayer.setPlaybackQuality(param);

			else return p.ytplayer.getPlaybackQuality();

		}),
		
		playbackRate: wrap_fn(function(evt, param, p){
			
			if(typeof param !== "undefined") p.ytplayer.setPlaybackRate(param);
		
			else return p.ytplayer.getPlaybackRate();
			
		}),

		data: wrap_fn(function(evt, param, p) {

			var ret = {};

			var P = p.ytplayer;

			ret.videoLoadedFraction = P.getVideoLoadedFraction();

			ret.bytesLoaded = P.getVideoBytesLoaded(); // deprecated

			ret.bytesTotal = P.getVideoBytesTotal(); // deprecated

			ret.startBytes = P.getVideoStartBytes(); // deprecated

			ret.state = P.getPlayerState();

			ret.currentTime = P.getCurrentTime();

			ret.duration = P.getDuration();

			ret.videoURL = P.getVideoUrl();

			ret.videoEmbedCode = P.getVideoEmbedCode();

			ret.videoID = TP.getVideoIDFromURL(ret.videoURL);

			ret.availableQualityLevels = P.getAvailableQualityLevels();
			
			ret.availablePlaybackRates = P.getAvailablePlaybackRates();

			return ret;

		}),

		videoId: wrap_fn(function(evt, param, p) {

			return TP.getVideoIDFromURL(p.ytplayer.getVideoUrl());

		}),

		size: wrap_fn(function(evt, param, p) {

			if (typeof param !== 'undefined' && param.width && param.height) {

				p.ytplayer.setSize(param.width, param.height);

				$(p.ytplayer).css(param);

			}

		}),

		destroy: wrap_fn(function(evt, param, p) {
			
			p.$player.removeClass(TUBEPLAYER_CLASS).data(OPTS, null).unbind(TUBEPLAYER).html("");

			delete TP.ytplayers[p.opts.playerID];

			// cleanup callback handler references..
			var d = $.tubeplayer.defaults;

			var events = ['unstarted', 'ended', 'playing', 'paused', 'buffering', 'cued'];

			$.each(events, function(i, event) {
				delete d.onPlayer[event][p.opts.playerID];
			});

			events = ['defaultError', 'notFound', 'notEmbeddable', 'invalidParameter'];
			$.each(events, function(i, event) {
				delete d.onErr[event][p.opts.playerID];
			});

			delete d.onQualityChange[p.opts.playerID];

			delete $.tubeplayer.events[p.opts.playerID]; // flash callback ref's
			if ('destroy' in p.ytplayer) {
				p.ytplayer.destroy();
			}

			$(p.ytplayer).remove();

			return null;

		}),

		player: wrap_fn(function(evt, param, p) {

			return p.ytplayer;

		})

	};

	// used in case of multiple players
	function guid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

})(jQuery);
