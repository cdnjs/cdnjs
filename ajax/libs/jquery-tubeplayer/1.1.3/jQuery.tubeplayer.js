/*!
 * jQuery TubePlayer Plugin
 * 
 * version: 1.1.3 (17-Jan-2013)
 * @requires v1.3.2 or later
 *
 * @imports SWFObject - http://code.google.com/p/swfobject/
 *	- Degrades to flash based player if not HTML5/iframe option 
 *
 * Author: Nirvana Tikku (@ntikku / ntikku@gmail.com)
 * Documentation:
 * 		http://www.tikku.com/jquery-youtube-tubeplayer-plugin
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html 
 */
;(function($){
    
    "use strict";
	
	// tubeplayer namespace
	
	var TUBEPLAYER = ".tubeplayer",
	
		TUBE_PLAYER_CLASS = "jquery-youtube-tubeplayer",
		
		OPTS = "opts"+TUBEPLAYER;
	
	//	
	//
	// TubePlayer package 
	//
	//
	var TubePlayer = {};
	
	// all the instances that exist
	TubePlayer.ytplayers = {}; 
	
	// local init functions for multiple iframe players
	TubePlayer.inits = []; 
	
	// no need to import the iframe script multiple times
	TubePlayer.iframeScriptInited = false; 
	
	// tubeplayer inited flag - for destroy/re-init
	TubePlayer.inited = false;
	
	//
	//
	// public facing defaults
	//
	//
	
	$.tubeplayer = {};
	$.tubeplayer.TubePlayer = TubePlayer;
	
	// events cache -- used by flashplayer version of video player
	$.tubeplayer.events = {};
	
	/**
	 * These are all the events that are bound to the YouTube Player
	 * the events can be overridden as they are public.
	 * 
	 * There are several functions that serve as wrappers to be utilized
	 * internally - stateChange, onError, qualityChange. Change them at your 
	 * own risk.
	 */
	$.tubeplayer.defaults = {
	
		afterReady: function($player){},
		
		stateChange: function(player){
			
			var _ret = this.onPlayer;
			
			return function(state){
			    
				if(typeof(state)==="object")
					state = state.data;
				
				switch(state){
					
					case -1: return _ret.unstarted[player]();
					
					case 0: return _ret.ended[player]();
					
					case 1: return _ret.playing[player]();
					
					case 2: return _ret.paused[player]();
					
					case 3: return _ret.buffering[player]();
					
					case 5: return _ret.cued[player]();
					
					default: return null;
					
				}
			}
			
		},
		
		onError: function(player){
			
			var _ret = this.onErr;
			
			return function(errorCode){
				
				if(typeof(errorCode)==="object")
					errorCode = errorCode.data;
					
				switch(errorCode){
					
					case 2: return _ret.invalidParameter[player]();
					
					case 100: return _ret.notFound[player]();
					
					case 101:
					case 150: return _ret.notEmbeddable[player]();
					
					default: return null;
					
				}
				
			}
			
		},
		
		qualityChange: function(player){
			
			var _this = this;
			
			return function(suggested){
				
				if(typeof(suggested)==="object")
					suggested = suggested.data;
					
				return _this.onQualityChange[player](suggested);
				
			}
			
		},
		
		onQualityChange:{},
		
		onPlayer:{unstarted:{},ended:{},playing:{},paused:{},buffering:{},cued:{}},
		
		onErr:{notFound:{},notEmbeddable:{},invalidParameter:{}}
		
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
		preferredQuality: "default",
		showControls: true,
		showRelated: false,
		annotations: true,
		autoPlay: false,
		autoHide: true,
		loop: 0,
		theme: 'dark', // 'dark' or 'light'
		color: 'red', // 'red' or 'white'
		showinfo: false,
		modestbranding: true,
		protocol: 'http', // set to 'https' for compatibility on SSL-enabled pages
		
		// with respect to [wmode] - 'transparent' maintains z-index, but disables GPU acceleration
		wmode: 'transparent', // you probably want to use 'window' when optimizing for mobile devices
		swfobjectURL: "ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js", // exclude the protocol, it will be read from the 'protocol' property
		loadSWFObject: true, // by default, we will attempt to load the swfobject script, if utilizing the flash player
		
		// privately used
		allowScriptAccess: "always",
		playerID: "tubeplayer-player-container",
		
		// html5 specific attrs
		iframed: true,
				
		// trigger fn's
		onPlay: function(id){},
		onPause: function(){},
		onStop: function(){},
		onSeek: function(time){},
		onMute: function(){},
		onUnMute: function(){},
		
		// player fn's
		onPlayerUnstarted: function(){},
		onPlayerEnded: function(){},
		onPlayerPlaying: function(){},
		onPlayerPaused: function(){},
		onPlayerBuffering: function(){},
		onPlayerCued: function(){},
		onQualityChange: function(){},
		
		// error fn's
		onErrorNotFound: function(){},
		onErrorNotEmbeddable: function(){},
		onErrorInvalidParameter: function(){}
		
	};
	
	/**
	 * The TubePlayer plugin bound to the jQuery object's prototype. 
	 * This method acts as an interface to instantiate a TubePlayer, 
	 * as well as invoke events that are attached - typically getters/setters
	 */
	$.fn.tubeplayer = function(input, xtra){
		
		var $this = $(this);
		
		var type = typeof input;
		
		if( arguments.length === 0 || type === "object" )
		
			return $this.each(function(){
				
				TubePlayer.init( $(this), input );
				
			});
			
		else if( type === "string" )
		
			return $this.triggerHandler( input+TUBEPLAYER, ( typeof xtra !== 'undefined' ? xtra : null ) );
			
	};
	
		
	/**
	 * This method is the base method for all the events
	 * that are bound to the TubePlayer. 
	 */
	var buildFN = function(fn, after){
		
		return function(evt,param){
			
			var p = TubePlayer.getPkg(evt);
			
			if(p.ytplayer) { 
				
				var ret = fn(evt, param, p);
				
				if(typeof(ret)==="undefined") 
					ret = p.$player;
					
				return ret;
				
			}
			
			return p.$player;
			
		};
		
	};
	
	/**
	 * Public method to get all the player instances
	 */
	$.tubeplayer.getPlayers = function(){
		
		return TubePlayer.ytplayers;
		
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
	TubePlayer.init = function($player, opts){
	
		if( $player.hasClass(TUBE_PLAYER_CLASS) )
			return $player;
		
		var o = $.extend({}, defaults, opts);
			
		o.playerID += "-" + guid();
			
		$player.addClass(TUBE_PLAYER_CLASS).data(OPTS, o);
		
		for(var event in PLAYER) 
			$player.bind(event+TUBEPLAYER, $player, PLAYER[event]);
			
		// initialize the default event methods
		TubePlayer.initDefaults($.tubeplayer.defaults, o);
	
		// insert the player container
		$("<div></div>").attr("id", o.playerID).appendTo($player);
		
		// append the player into the container
		TubePlayer.initPlayer($player, o);
		
		return $player; 
		
	};
	
	/**
	 * Every method needs these items
	 */
	TubePlayer.getPkg = function(evt){
		
		var $player = evt.data;
		
		var opts = $player.data(OPTS);
		
		var ytplayer = TubePlayer.ytplayers[opts.playerID];
		
		return {
			
			$player: $player,
			
			opts: opts,
			
			ytplayer: ytplayer
			
		}
		
	};
	
	/**
	 * This method handles the player init. Since 
	 * onYouTubePlayerReady is called when the script
	 * has been evaluated, we want all the instances
	 * to get init'd. For this we have a init queue.
	 * If the script has been init'd, we automatically
	 * pop the method off the queue and init the player.
	 */
	TubePlayer.iframeReady = function(o){
		
		TubePlayer.inits.push(function(){
			
			new YT.Player(o.playerID, {
				
				videoId: o.initialVideo,
				
				width: o.width,
				
				height: o.height,
				
				playerVars: { 
					
					'autoplay': (o.autoPlay?1:0), 
					
					'autohide': (o.autoHide?1:0),
					
					'controls': (o.showControls?1:0),
					
					'loop': (o.loop?1:0),
					
					'playlist': (o.loop ? o.initialVideo : ""),

					'rel': (o.showRelated?1:0),
					
					'fs': (o.allowFullScreen?1:0),
					
					'wmode': o.wmode,
					
					'showinfo': (o.showinfo?1:0),
					
					'modestbranding': (o.modestbranding?1:0),
					
					'iv_load_policy': (o.annotations?1:3),
					
					'start': o.start,
					
					'theme': o.theme,
					
					'color': o.color
					
				},
				
				events: {
					
					'onReady': function(evt){
						
						TubePlayer.ytplayers[o.playerID] = evt.target;
						
						var $player = $(evt.target).parents("."+TUBE_PLAYER_CLASS);
						
						$.tubeplayer.defaults.afterReady($player);
						
					},
					
					'onPlaybackQualityChange': $.tubeplayer.defaults.qualityChange(o.playerID),
					
					'onStateChange': $.tubeplayer.defaults.stateChange(o.playerID),
				
					'onError': $.tubeplayer.defaults.onError(o.playerID)
					
				}
				
			});
			
		});
		
		// stacked init method
		if(TubePlayer.inits.length>=1 && !TubePlayer.inited){
			
			return function(){
				
				for(var i=0; i<TubePlayer.inits.length; i++){

					TubePlayer.inits[i]();
					
				}
				
				TubePlayer.inited = true;
				
			};
			
		}
		
		// if we've inited already, just call the init fn
		if(TubePlayer.inited){
			
			( TubePlayer.inits.pop() )();
			
		}
		
		return window.onYouTubePlayerAPIReady;
		
	};
	
	/**
	 * check to see if iframe option is plausible
	 */
	TubePlayer.supportsHTML5 = function(){
		
		return !!document.createElement('video').canPlayType;
		
	};
	
	/**
	 * @param d - the defaults
	 * @param o - the options w/ methods to attach
	 */
	TubePlayer.initDefaults = function(d, o){
	
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
	TubePlayer.initPlayer = function($player, o){
		
		if(o.iframed && TubePlayer.supportsHTML5())
		
			TubePlayer.initIframePlayer($player, o);
			
		else
		
			TubePlayer.initFlashPlayer($player, o);
			
	};
	
	/**
	 * Initialize an iframe player
	 */
	TubePlayer.initIframePlayer = function($player, o){
		
		if(!TubePlayer.iframeScriptInited){
		
			// write the api script tag
			var tag = document.createElement('script');
		
			tag.src = o.protocol + "://www.youtube.com/iframe_api";
		
			var firstScriptTag = document.getElementsByTagName('script')[0];
		
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		
			TubePlayer.iframeScriptInited = true;
		
		};
		
		// init the iframe player
		window.onYouTubePlayerAPIReady = TubePlayer.iframeReady(o);
		
	};
	
	/**
	 * Flash player initialization
	 *  -> if 'loadSWFObject' is set to true, player will only be init'd
	 *      when the swfobject script request has completed successfully
	 *  -> if 'loadSWFObject' is set to false, assumes that you have 
	 *      imported your own SWFObject, prior to TubePlayer's initialization
	 * @imports swfobject automatically
	 */
	TubePlayer.initFlashPlayer = function($player, o){
		
		if(o.loadSWFObject){
		    
		    // cleanup swfobjectURL to re-apply the protocol
		    o.swfobjectURL = o.swfobjectURL.replace('http://', '');
		    o.swfobjectURL = o.swfobjectURL.replace('https://', '');
		    o.swfobjectURL = o.protocol + '://' + o.swfobjectURL;
		    
		    $.getScript(o.swfobjectURL, TubePlayer.initFlashPlayerFN(o));
		    
		} else {
		    
		    TubePlayer.initFlashPlayerFN(o)();
		    
		}
		
	};
	
	TubePlayer.initFlashPlayerFN = function(o){
	  
	    return function(){
		
			var url =  ["//www.youtube.com/v/"]
			url.push( o.initialVideo );
			url.push( "?&enablejsapi=1&version=3" );
			url.push( "&playerapiid=" + o.playerID );
			url.push( "&rel= " + (o.showRelated?1:0) );
			url.push( "&autoplay=" + (o.autoPlay?1:0) );
			url.push( "&autohide=" + (o.autoHide?1:0) );
			url.push( "&loop=" + (o.loop?1:0) );
			url.push( "&playlist=" + (o.loop ? o.initialVideo : ""));
			url.push( "&controls=" + (o.showControls?1:0) );
			url.push( "&showinfo=" + (o.showinfo?1:0) );
			url.push( "&modestbranding=" + (o.modestbranding?1:0) );
			url.push( "&iv_load_policy=" + (o.annotations?1:3) );
			url.push( "&start=" + o.start );
			url.push( "&theme=" + o.theme );
			url.push( "&color=" + o.color );
			url.push( "&fs=" + (o.allowFullScreen?1:0) );
			
			swfobject.embedSWF(url.join(""), o.playerID, 
				o.width, 
				o.height, 
				"8", null, null, 
				{ 
					allowScriptAccess: o.allowScriptAccess, 
					wmode: o.wmode, 
					allowFullScreen: o.allowFullScreen 
				}, 
				{ id: o.playerID }
			);
			
			// init the player ready fn
			window.onYouTubePlayerReady = function(playerId) { 
				
				var player = document.getElementById(playerId);
				
                var pid = playerId.replace(/-/g,'');
                
                var d = $.tubeplayer.defaults;
                $.tubeplayer.events[pid] = {
                    "stateChange": d.stateChange(playerId),
                    "error": d.onError(playerId),
                    "qualityChange": d.qualityChange(playerId)
                };
                
				player.addEventListener("onStateChange", "$.tubeplayer.events."+pid+".stateChange"); 
				player.addEventListener("onError", "$.tubeplayer.events."+pid+".error");
				player.addEventListener("onPlaybackQualityChange", "$.tubeplayer.events."+pid+".qualityChange");
				
				TubePlayer.ytplayers[playerId] = player;
				
                var $player = $(player).parents("."+TUBE_PLAYER_CLASS);
				
				$.tubeplayer.defaults.afterReady($player);
				
			};
			
		}
	    
	};
	
	// fmt: youtube.com/watch?x=[anything]&v=[desired-token]&
	TubePlayer.getVideoIDFromURL = function(sURL){
		
		sURL = sURL || ""; // make sure it's a string; sometimes the YT player API returns undefined, and then indexOf() below will fail
		
		var qryParamsStart = sURL.indexOf("?");
		
		var qryParams = sURL.substring(qryParamsStart, sURL.length);
		
		var videoStart = qryParams.indexOf("v=");
		if( videoStart > -1 ) { 
		    var videoEnd = qryParams.indexOf("&", videoStart);
		    if( videoEnd === -1 ) { 
		        videoEnd = qryParams.length;
		    }
		    return qryParams.substring(videoStart+"v=".length, videoEnd);
		}
		
		return "";
		
	};
	
	/**
	 * All the events that are bound to a TubePlayer instance
	 */
	var PLAYER = {
		
		cue: buildFN(function(evt,param,p){ 
			
			p.ytplayer.cueVideoById(param, p.opts.preferredQuality);
			
		}),
		
		play: buildFN(function(evt,param,p){
			
			if(typeof(param)==='object') 
				p.ytplayer.loadVideoById(param.id,param.time, p.opts.preferredQuality); 
		
			else if(typeof param !== 'undefined') 
				p.ytplayer.loadVideoById(param, 0, p.opts.preferredQuality); 
	
			else
				p.ytplayer.playVideo(); 
				
			p.opts.onPlay(param);
			
		}),
		
		pause: buildFN(function(evt,param,p){
			
			p.ytplayer.pauseVideo();
			
			p.opts.onPause(p);
			
		}),
		
		stop: buildFN(function(evt,param,p){
			
			p.ytplayer.stopVideo();
			
			p.opts.onStop(p);
			
		}),
		
		seek: buildFN(function(evt,param,p){
			
			p.ytplayer.seekTo(param, true);
			
			p.opts.onSeek(param);
			
		}),
		
		mute: buildFN(function(evt,param,p){
			
			p.$player.attr("data-prev-mute-volume", p.ytplayer.getVolume());
			
			p.ytplayer.mute(); 
			
			p.opts.onMute(p);
			
		}),
		
		unmute: buildFN(function(evt,param,p){
			
			p.ytplayer.unMute(); 
			
			p.ytplayer.setVolume( ( p.$player.attr("data-prev-mute-volume") || 50 ) );
			
			p.opts.onUnMute();
			
		}),
		
		isMuted: buildFN(function(evt,param,p){
			
			return p.ytplayer.isMuted();
			
		}),
		
		volume: buildFN(function(evt,param,p){
			
			if(typeof param !== 'undefined') {
				
				p.ytplayer.setVolume(param);
				
				p.$player.attr("data-prev-mute-volume", p.ytplayer.getVolume());
				
			}	else  {
				
				return p.ytplayer.getVolume() || 0; // 0 because iframe's currently in labs
				
			}
		
		}),
		
		quality: buildFN(function(evt,param,p){
			
			if(typeof param !== 'undefined') 
				p.ytplayer.setPlaybackQuality(param); 
				
			else 
				return p.ytplayer.getPlaybackQuality();
				
		}),
		
		data: buildFN(function(evt,param,p){
			
			var ret = {}; 
			
			var P = p.ytplayer;
			
			ret.bytesLoaded = P.getVideoBytesLoaded(); 
			
			ret.bytesTotal = P.getVideoBytesTotal();
			
			ret.startBytes= P.getVideoStartBytes();
			
			ret.state = P.getPlayerState();
			
			ret.currentTime = P.getCurrentTime();
			
			ret.duration = P.getDuration();
			
			ret.videoURL = P.getVideoUrl();
			
			ret.getVideoEmbedCode = P.getVideoEmbedCode();
			
			ret.videoID = TubePlayer.getVideoIDFromURL(ret.videoURL);
			
			ret.availableQualityLevels = P.getAvailableQualityLevels();
            
			return ret;
			
		}),
		
		videoId: buildFN(function(evt,param,p){
			
			return TubePlayer.getVideoIDFromURL( p.ytplayer.getVideoUrl() );
			
		}),
		
		size: buildFN(function(evt, param, p){
			
			if(typeof param !== 'undefined' && param.width && param.height) { 
				
				p.ytplayer.setSize(param.width, param.height);
				
				$(p.ytplayer).css(param);
				
			}
			
		}),
		
		destroy: buildFN(function(evt, param, p) {
			p.$player.removeClass(TUBE_PLAYER_CLASS)
				.data(OPTS, null)
				.unbind(TUBEPLAYER)
				.html("");
				
			delete TubePlayer.ytplayers[p.opts.playerID];
			
			// cleanup callback handler references..
			var d = $.tubeplayer.defaults;
			
			var events = ['unstarted','ended','playing','paused','buffering','cued'];

			jQuery.each(events, function(i, event) {
				delete d.onPlayer[event][p.opts.playerID];
			});
			    
			events = ['notFound','notEmbeddable','invalidParameter'];
			jQuery.each(events, function(i, event) {
				delete d.onErr[event][p.opts.playerID];
			});
			    
			delete d.onQualityChange[p.opts.playerID];
			
			delete $.tubeplayer.events[p.opts.playerID]; // flash callback ref's
			
			$(p.ytplayer).remove();
			
			return null;		
			
		}),
		
		player: buildFN(function(evt, param, p){
			
			return p.ytplayer;
			
		})
		
	};
	
	// used in case of multiple players
	function guid(){
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });;
	};
	
})(jQuery);
