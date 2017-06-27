/*
 * AnythingSlider Video Controller 1.5.3 beta for AnythingSlider v1.6+
 * By Rob Garrison (aka Mottie & Fudgey)
 * Licensed under the GPL license.
 */
/*jshint browser:true, jquery:true, unused:false, expr: true */
/*global swfobject: true, YT: true */
;(function($) {
	"use strict";
	$.fn.anythingSliderVideo = function(options) {
		//Set the default values, use comma to separate the settings, example:
		var defaults = {
			// video id prefix; suffix from $.fn.anythingSliderVideo.videoIndex
			videoId         : 'asvideo',
			// this option replaces the `addWmodeToObject` option in the main plugin
			wmode           : "opaque",
			// auto load YouTube api script
			youtubeAutoLoad : true,
			// see: https://developers.google.com/youtube/player_parameters#Parameters
			youtubeParams   : {
				modestbranding : 1,
				iv_load_policy : 3,
				fs : 1
			}
			// ,onVideoInitialized : function(base) {}
		};

		return this.each(function() {
			// make sure a AnythingSlider is attached
			var video, tmp, service, sel, panel,
				base = $(this).data('AnythingSlider');
			if (!base) { return; }
			// if anythingSliderVideo was initialized before, don't overwrite it
			if(typeof base.video == 'undefined') {
				video = base.video = {};
				video.options = $.extend({}, defaults, options);

				// check if SWFObject is loaded
				video.hasSwfo = (typeof(swfobject) !== 'undefined' && swfobject.hasOwnProperty('embedSWF') && typeof(swfobject.embedSWF) === 'function' && swfobject.hasFlashPlayerVersion('1'));
				video.list = {};
				video.hasVid = false;
				video.hasEmbed = false;
				video.services = $.fn.anythingSliderVideo.services;
				video.hasEmbedCount = 0;
				video.hasiframeCount = 0;
				video.$items = base.$items.filter(':not(.cloned)');
			} else {
				video = base.video;
				video.$items = base.$items.filter(':not(.cloned)');
			}

			// find and save all known videos
			for (service in video.services) { /*jshint loopfunc:true */
				if (typeof(service) === 'string') {
					sel = video.services[service].selector;
					video.$items.find(sel).each(function() {
						tmp = $(this);
						panel = tmp.closest('.panel');
						if (panel.data('AnythingSliderVideoInitialized') != true) {
							// save panel and video selector in the list
							tmp.attr('id', video.options.videoId + $.fn.anythingSliderVideo.videoIndex);
							video.list[$.fn.anythingSliderVideo.videoIndex] = {
								id       : video.options.videoId + $.fn.anythingSliderVideo.videoIndex++,
								panel    : panel[0],
								service  : service,
								selector : sel,
								status   : -1, // YouTube uses -1 to mean the video is unstarted
								isInitialized : false, // Mark as Initialized to prevent double initialisation on adding video to slider
							};

							// add indicator that this video was already initialized
							panel.data('AnythingSliderVideoInitialized', true);
							video.hasVid = true;
							if (sel.match('embed|object')) {
								video.hasEmbed = true;
								video.hasEmbedCount++;
							} else if (sel.match('iframe')) {
								video.hasiframeCount++;
							}
						}
					});
				}
			}

			// Initialize each video, as needed
			$.each(video.list, function(i,s) {
				// s.id = ID, s.panel = slider panel (DOM), s.selector = 'jQuery selector'
				var $t, $tar, vidsrc, opts,
					$vid = $(s.panel).find(s.selector),
					service = video.services[s.service],
					api = service.api && service.api.initParam || '',
					apiId = service.api && service.api.playerId || '';
				// Initialize embeded video javascript api using SWFObject, if loaded
				if (video.hasEmbed && video.hasSwfo && s.selector.match('embed|object') && !s.isInitialized /* Custom Code */) {
					$vid.each(function() {
						$t = $(this);
						// Older IE doesn't have an object - just make sure we are wrapping the correct element
						$tar = ($(this).parent()[0].tagName === 'OBJECT') ? $(this).parent() : $(this);
						vidsrc = ($tar[0].tagName === 'EMBED') ? $tar.attr('src') : $tar.find('embed').attr('src') || $tar.children().filter('[name=movie]').attr('value');
						opts = $.extend(true, {}, {
							flashvars : null,
							params    : { allowScriptAccess: 'always', wmode : video.options.wmode || base.options.addWmodeToObject, allowfullscreen : true },
							attr      : { 'class' : $tar.attr('class'), 'style' : $tar.attr('style'), 'data-url' : vidsrc }
						}, service.embedOpts);
						$tar.wrap('<div id="' + s.id + '"></div>');
						// use SWFObject if it exists, it replaces the wrapper with the object/embed
						swfobject.embedSWF(vidsrc + api + (apiId ? apiId + s.id : ''), s.id,
							$tar.attr('width'), $tar.attr('height'), '10', null,
							opts.flashvars, opts.params, opts.attr, function() {
								// run init code if it exists
								if (service.hasOwnProperty('init')) {
									service.init(base, $t, i);
								}
								if (i >= video.hasEmbedCount) {
									base.$el.trigger('swf_completed', base); // swf callback
								}
							}
						);
					});
				} else if (s.selector.match('iframe') && !s.isInitialized /* Custom Code */) {
					$vid.each(function() {
						var $t = $(this);
						if (service.hasOwnProperty('init')) {
							service.init(base, $t, i);
						}
					});
				}
				//mark as initialized
				s.isInitialized = true;
			});

			// Returns URL parameter; url: http://www.somesite.com?name=hello&id=11111
			// Original code from Netlobo.com (http://www.netlobo.com/url_query_string_javascript.html)
			video.gup = function(n,s) {
				n = n.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
				var p = (new RegExp("[\\?&]"+n+"=([^&#]*)")).exec(s || window.location.href);
				return (p===null) ? "" : p[1];
			};

			// postMessage to iframe - http://benalman.com/projects/jquery-postmessage-plugin/ (FOR IE7)
			video.postMsg = function(data, vid) {
				var $vid = $('#' + vid);
				if ($vid.length) {
					$vid[0].contentWindow.postMessage(data, $vid.attr('src').split('?')[0]);
				}
			};

			// receive message from iframe
			// no way to figure out which iframe since the message is from the window
			video.message = function(e) {
				if (e.data) {
					if (/infoDelivery/g.test(e.data)) { return; } // ignore youtube video loading spam
					var data = $.parseJSON(e.data);
					$.each(video.list, function(i,s) {
						if (video.services[video.list[i].service].hasOwnProperty('message')) {
							video.services[video.list[i].service].message(base, data);
						}
					});
				}
			};

			// toDO = 'cont', 'pause' or 'isPlaying'
			video.control = function(toDo) {
				var i,
					s = video.list,
					slide = (toDo === 'pause') ? base.$lastPage[0] : base.$currentPage[0],
					isPlaying = false;
				for (i=0; i < $.fn.anythingSliderVideo.videoIndex; i++) {
					// s[i] may exist in different slider; see #548
					if (s[i] && s[i].panel === slide && video.services[s[i].service].hasOwnProperty(toDo)) {
						isPlaying = video.services[s[i].service][toDo](base, $('#' + s[i].id), i);
					}
				}
				return isPlaying;
			};

			// iframe event listener
			video.bindFrames = function(msg) {
				if (window.addEventListener) {
					window.addEventListener(msg, video.message, false);
				} else { // IE
					window.attachEvent(/^on/.test(msg) ? msg : 'on' + msg, video.message, false);
				}
			};

			if (video.hasiframeCount) {
				video.bindFrames('message');
			}

			// bind to events
			base.$el
				.bind('slide_init', function() {
					video.control('pause');
				})
				.bind('slide_complete', function() {
					video.control('cont');
				});

			video.isVideoPlayingOrig = base.options.isVideoPlaying;
			base.options.isVideoPlaying = function() {
				return video.control('isPlaying') || video.isVideoPlayingOrig && video.isVideoPlayingOrig();
			};

			if (typeof video.options.onVideoInitialized === 'function') {
				video.options.onVideoInitialized(base);
			}

		});

	};

// external index, in case multiple sliders with video are on the page
$.fn.anythingSliderVideo.videoIndex = 0;

/* Each video service is set up as follows
 * service-name : {
 *  // initialization
 *  selector  : 'object[data-url*=service], embed[src*=service]', // required: jQuery selector used to find the video ('video' or 'iframe[src*=service]' are other examples)
 *  api : { // replaces initAPI
 *    initParam : 'string added to the URL to initialize the API',
 *    playerId  : 'string added to target the video ID', // the string must end with a parameter pointing to the video id (e.g. "&player_id=")
 *  },
 *  embedOpts : { flashvars: {}, params: {}, attr: {} },          // optional: add any required flashvars, parameters or attributes to initialize the API
 *  // video startup functions
 *  init      : function(base, $vid, index) { }, // optional: include any additional initialization code here; function called AFTER the embeded video is added using SWFObject
 *  // required functions
 *  cont      : function(base, $vid, index) { }, // required: continue play if video was previously played
 *  pause     : function(base, $vid, index) { }, // required: pause ALL videos
 *  message   : function(base, data) { },       // required for iframe: process data received from iframe and update the video status for the "isPlaying" function
 *  isPlaying : function(base, $vid, index) { }  // required: return true if video is playing and return false if not playing (paused or ended)
 * }
 *
 * Function variables
 *  base (object) = plugin base, all video values/functions are stored in base.video
 *  $vid (object) = jQuery object of the video, to get the ID of the video: use $vid[0].id ( e.g. "asvideo1" )
 *  index (number) is the unique video number from the vid (starts from zero)
 *
 *  var list = base.video.list[index]; list will contain:
 *   list.id = vid
 *   list.service = service name (e.g. 'video', 'vimeo1', 'vimeo2', etc)
 *   list.selector = 'jQuery selector' (e.g. 'video', 'object[data-url*=vimeo]', 'iframe[src*=vimeo]', etc)
 *   list.panel = AnythingSlider panel DOM object. So you can target the video using $(list[index].panel).find(list[index].service) or $('#' + vid)
 *   list.status = video status, updated by the iframe event listeners added in the video service "ready" function; see examples below
 */

$.fn.anythingSliderVideo.services = {
	// *** HTML5 video ***
	video : {
		selector : 'video',
		cont : function(base, $vid, index) {
			if (base.options.resumeOnVisible && $vid.length && $vid[0].paused && $vid[0].currentTime > 0 && !$vid[0].ended) {
				$vid[0].play();
			}
		},
		pause : function(base, $vid) {
			// pause ALL videos on the page
			$('video').each(function() {
				if (typeof(this.pause) !== 'undefined') { this.pause(); } // throws an error in older ie without this
			});
		},
		isPlaying : function(base, $vid, index) {
			// media.paused seems to be the only way to determine if a video is playing
			return ($vid.length && typeof($vid[0].pause) !== 'undefined' && !$vid[0].paused && !$vid[0].ended) ? true : false;
		}
	},

	// *** Vimeo iframe *** isolated demo: http://jsfiddle.net/Mottie/GxwEX/
	vimeo1 : {
		selector : 'iframe[src*=vimeo]',
		init: function(base, $vid, index) {
			var vidsrc = $vid.attr('src');
			$vid.attr('src', function(i,r) {
				// vimeo api appears to require https now...
				r = r.replace('http:', 'https:');
				// initialze api and add wmode parameter
				return r + (vidsrc.match(/\?/g) ? '' : '?') + '&wmode=' + (base.video.options.wmode || base.options.addWmodeToObject) +
					'&api=1&player_id=' + $vid[0].id;
			});
		},
		cont : function(base, $vid, index) {
			if (base.options.resumeOnVisible && base.video.list[index].status === 'pause') {
				// Commands sent to the iframe originally had "JSON.stringify" applied to them,
				// but not all browsers support this, so it's just as easy to wrap it in quotes.
				base.video.postMsg('{"method":"play"}', $vid[0].id);
			}
		},
		pause : function(base, $vid) {
			// pause ALL videos on the page
			$('iframe[src*=vimeo]').each(function() {
				base.video.postMsg('{"method":"pause"}', this.id);
			});
		},
		message : function(base, data) {
			// *** VIMEO *** iframe uses data.player_id
			var index, vid = data.player_id || ''; // vid = data.player_id (unique to vimeo)
			if (vid !== '') {
				index = vid.replace(base.video.options.videoId, '');
				if (data.event === 'ready') {
					// Vimeo ready, add additional event listeners for video status
					base.video.postMsg('{"method":"addEventListener","value":"play"}', vid);
					base.video.postMsg('{"method":"addEventListener","value":"pause"}', vid);
					base.video.postMsg('{"method":"addEventListener","value":"finish"}', vid);
				}
				// update current status - vimeo puts it in data.event
				if (base.video.list[index]) { base.video.list[index].status = data.event; }
			}
		},
		isPlaying : function(base, $vid, index) {
			return (base.video.list[index].status === 'play') ? true : false;
		}
	},

	// *** Embeded Vimeo ***
	// SWFObject adds the url to the object data
	// using param as a selector, the script above looks for the parent if it sees "param"
	vimeo2 : {
		selector : 'object[data-url*=vimeo], embed[src*=vimeo]',
		embedOpts : { flashvars : { api : 1 } },
		cont : function(base, $vid, index) {
			if (base.options.resumeOnVisible) {
				// continue video if previously played & not finished (api_finish doesn't seem to exist) - duration can be a decimal number, so subtract it and look at the difference (2 seconds here)
				if (typeof($vid[0].api_play) === 'function' && $vid[0].api_paused() && $vid[0].api_getCurrentTime() !== 0 && ($vid[0].api_getDuration() - $vid[0].api_getCurrentTime()) > 2) {
					$vid[0].api_play();
				}
			}
		},
		pause : function(base, $vid) {
			// find ALL videos and pause them, just in case
			$('object[data-url*=vimeo], embed[src*=vimeo]').each(function() {
				var el = (this.tagName === 'EMBED') ? $(this).parent()[0] : this;
				if (typeof(el.api_pause) === 'function') {
					el.api_pause();
				}
			});
		},
		isPlaying : function(base, $vid, index) {
			return (typeof($vid[0].api_paused) === 'function' && !$vid[0].api_paused()) ? true : false;
		}
	},

	// *** iframe YouTube *** isolated demo: http://jsfiddle.net/Mottie/qk5MY/
	youtube1 : {
		selector : 'iframe[src*=youtube]',
		init: function(base, $vid, index) {
			if (!$.fn.anythingSliderVideo.youTubeLoaded && base.video.options.youtubeAutoLoad) {
				$.getScript("https://www.youtube.com/iframe_api", function(data, textStatus, jqxhr) {
					$.fn.anythingSliderVideo.youTubeLoaded = true;
				});
			}
			var indx = 0,
			timer = setInterval(function() {
				if ($.fn.anythingSliderVideo.youTubeReady) {
					var vid = $vid[0].id,
						src = $vid.attr('src').split('embed/')[1],
						params = base.video.options.youtubeParams;
					params.wmode = base.video.options.wmode || base.options.addWmodeToObject || 'opaque';
					$vid.wrap('<div id="' + vid + '"/>').attr('id','');
					base.video.list[index].player = new YT.Player( vid, {
						height: '100%',
						width: '100%',
						videoId: src,
						playerVars: params,
						events: {
							'onReady': function(e) {
								base.video.list[index].status = e.data;
							},
							'onStateChange':  function(e) {
								base.video.list[index].status = e.data;
							}
						}
					});
					clearInterval(timer);
				}
				// give up after 1 minute.
				if (++indx > 60) { clearInterval(timer); }
			}, 1000);
		},
		cont : function(base, $vid, index) {
			if (base.options.resumeOnVisible && base.video.list[index].status === 2) {
				// base.video.postMsg('{"event":"command","func":"playVideo"}', $vid[0].id);
				// if ($vid[0].playVideo) { $vid[0].playVideo(); }
				base.video.list[index].player && base.video.list[index].player.playVideo();
			}
		},
		pause : function(base, $vid, index) {
			// pause video; doesn't pause all videos on the page
			base.video.list[index].player && base.video.list[index].player.pauseVideo();
		},
		isPlaying : function(base, $vid, index) {
			var status = base.video.list[index].status;
			// state: unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
			return (status === 1 || status > 2) ? true : false;
		}
	},

	// *** Embeded YouTube ***
	// include embed for IE; SWFObject adds the url to the object data attribute
	youtube2 : {
		selector : 'object[data-url*=youtube], embed[src*=youtube]',
		api : {
			initParam : '&enablejsapi=1', // init API string
			// "iv_load_policy=3" should turn off annotations on init, but doesn't seem to; video ID added to the end
			playerId  : '&iv_load_policy=3&version=3&playerapiid='
		},
		// YouTube - player states: unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
		cont : function(base, $vid, index) {
			if (base.options.resumeOnVisible) {
				// continue video if previously played and not cued
				if ($vid.length && typeof($vid[0].getPlayerState) === 'function' && $vid[0].getPlayerState() > 0) {
					$vid[0].playVideo();
				}
			}
		},
		pause : function(base, $vid) {
			// find ALL videos and pause them, just in case
			$('object[data-url*=youtube], embed[src*=youtube]').each(function() {
				var el = (this.tagName === 'EMBED') ? $(this).parent()[0] : this;
				// player states: unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
				if (typeof(el.getPlayerState) === 'function' && el.getPlayerState() > 0) {
					// pause video if not autoplaying (if already initialized)
					el.pauseVideo();
				}
			});
		},
		isPlaying : function(base, $vid) {
			return (typeof($vid[0].getPlayerState) === 'function' && ($vid[0].getPlayerState() === 1 || $vid[0].getPlayerState() > 2)) ? true : false;
		}
	}

};

})(jQuery);

function onYouTubeIframeAPIReady(playerId) {
	"use strict";
	$.fn.anythingSliderVideo.youTubeReady = true;
}
