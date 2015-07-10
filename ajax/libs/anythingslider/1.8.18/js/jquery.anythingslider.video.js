/*
 * AnythingSlider Video Controller 1.3.1 beta for AnythingSlider v1.6+
 * By Rob Garrison (aka Mottie & Fudgey)
 * Dual licensed under the MIT and GPL licenses.
 */
(function($) {
	$.fn.anythingSliderVideo = function(options){

		//Set the default values, use comma to separate the settings, example:
		var defaults = {
			videoID : 'asvideo' // id prefix
		};

		return this.each(function(){
			// make sure a AnythingSlider is attached
			var video, tmp, service, sel, base = $(this).data('AnythingSlider');
			if (!base) { return; }
			video = base.video = {};
			// Next update, I may just force users to call the video extension instead of it auto-running on window load
			// then they can change the video options in that call instead of the base defaults, and maybe prevent the
			// videos being initialized twice on startup (once as a regular video and second time with the API string)
			video.options = $.extend({}, defaults, options);

			// check if SWFObject is loaded
			video.hasSwfo = (typeof(swfobject) !== 'undefined' && swfobject.hasOwnProperty('embedSWF') && typeof(swfobject.embedSWF) === 'function' && swfobject.hasFlashPlayerVersion('1'));

			video.list = {};
			video.hasVid = false;
			video.hasEmbed = false;
			video.services = $.fn.anythingSliderVideo.services;
			video.len = 0; // used to add a unique ID to videos "asvideo#"
			video.hasEmbedCount = 0;
			video.hasiframeCount = 0;
			video.$items = base.$items.filter(':not(.cloned)');

			// find and save all known videos
			for (service in video.services) {
				if (typeof(service) === 'string') {
					sel = video.services[service].selector;
					video.$items.find(sel).each(function(){
						tmp = $(this);
						// save panel and video selector in the list
						tmp.attr('id', video.options.videoID + video.len);
						video.list[video.len] = {
							id       : video.options.videoID + video.len++,
							panel    : tmp.closest('.panel')[0],
							service  : service,
							selector : sel,
							status   : -1 // YouTube uses -1 to mean the video is unstarted 
						};
						video.hasVid = true;
						if (sel.match('embed|object')) {
							video.hasEmbed = true;
							video.hasEmbedCount++;
						} else if (sel.match('iframe')) {
							video.hasiframeCount++;
						}
					});
				}
			}

			// Initialize each video, as needed
			$.each(video.list, function(i,s){
				// s.id = ID, s.panel = slider panel (DOM), s.selector = 'jQuery selector'
				var tmp, $tar, vidsrc, opts,
					$vid = $(s.panel).find(s.selector),
					service = video.services[s.service],
					api = service.initAPI || '';
				// Initialize embeded video javascript api using SWFObject, if loaded
				if (video.hasEmbed && video.hasSwfo && s.selector.match('embed|object')) {
					$vid.each(function(){
						// Older IE doesn't have an object - just make sure we are wrapping the correct element
						$tar = ($(this).parent()[0].tagName === 'OBJECT') ? $(this).parent() : $(this);
						vidsrc = ($tar[0].tagName === 'EMBED') ? $tar.attr('src') : $tar.find('embed').attr('src') || $tar.children().filter('[name=movie]').attr('value');
						opts = $.extend(true, {}, {
							flashvars : null,
							params    : { allowScriptAccess: 'always', wmode : base.options.addWmodeToObject, allowfullscreen : true },
							attr      : { 'class' : $tar.attr('class'), 'style' : $tar.attr('style'), 'data-url' : vidsrc }
						}, service.embedOpts);
						$tar.wrap('<div id="' + s.id + '"></div>');
						// use SWFObject if it exists, it replaces the wrapper with the object/embed
						swfobject.embedSWF(vidsrc + (api === '' ? '': api + s.id), s.id,
							$tar.attr('width'), $tar.attr('height'), '10', null,
							opts.flashvars, opts.params, opts.attr, function(){
								// run init code if it exists
								if (service.hasOwnProperty('init')) {
									video.list[i].player = service.init(base, s.id, i);
								}
								if (i >= video.hasEmbedCount) {
									base.$el.trigger('swf_completed', base); // swf callback
								}
							}
						);
					});
				} else if (s.selector.match('iframe')) {
					$vid.each(function(i,v){
						vidsrc = $(this).attr('src');
						tmp = (vidsrc.match(/\?/g) ? '' : '?') + '&wmode=' + base.options.addWmodeToObject; // string connector & wmode
						$(this).attr('src', function(i,r){ return r + tmp + (api === '' ? '': api + s.id); });
					});
				}
			});

			// Returns URL parameter; url: http://www.somesite.com?name=hello&id=11111
			// Original code from Netlobo.com (http://www.netlobo.com/url_query_string_javascript.html)
			video.gup = function(n,s){
				n = n.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
				var p = (new RegExp("[\\?&]"+n+"=([^&#]*)")).exec(s || window.location.href);
				return (p===null) ? "" : p[1];
			};

			// postMessage to iframe - http://benalman.com/projects/jquery-postmessage-plugin/ (FOR IE7)
			video.postMsg = function(data, vid){
				var $vid = $('#' + vid);
				if ($vid.length){
					$vid[0].contentWindow.postMessage(data, $vid.attr('src').split('?')[0]);
				}
			};

			// receive message from iframe
			// no way to figure out which iframe since the message is from the window
			video.message = function(e){
				if (e.data) {
					if (/infoDelivery/g.test(e.data)) { return; } // ignore youtube video loading spam
					var data = $.parseJSON(e.data);
					$.each(video.list, function(i,s){
						if (video.services[video.list[i].service].hasOwnProperty('message')) {
							video.services[video.list[i].service].message(base, data);
						}
					});
				}
			};

			// toDO = 'cont', 'pause' or 'isPlaying'
			video.control = function(toDo){
				var i,
					s = video.list,
					slide = (toDo === 'pause') ? base.$lastPage[0] : base.$currentPage[0],
					isPlaying = false;
				for (i=0; i < video.len; i++){
					if (s[i].panel === slide && video.services[s[i].service].hasOwnProperty(toDo)){
						isPlaying = video.services[s[i].service][toDo](base, s[i].id, i);
					}
				}
				return isPlaying;
			};

			// iframe event listener
			if (video.hasiframeCount){
				if (window.addEventListener){
					window.addEventListener('message', video.message, false);
				} else { // IE
					window.attachEvent('onmessage', video.message, false);
				}
			}

			// bind to events
			base.$el
				.bind('slide_init', function(){
					video.control('pause');
				})
				.bind('slide_complete', function(){
					video.control('cont');
				});

			base.options.isVideoPlaying = function(){ return video.control('isPlaying'); };

		});
	};

/* Each video service is set up as follows
 * service-name : {
 *  // initialization
 *  selector  : 'object[data-url*=service], embed[src*=service]', // required: jQuery selector used to find the video ('video' or 'iframe[src*=service]' are other examples)
 *  initAPI   : 'string added to the URL to initialize the API',  // optional: the string must end with a parameter pointing to the video id (e.g. "&player_id=")
 *  embedOpts : { flashvars: {}, params: {}, attr: {} },          // optional: add any required flashvars, parameters or attributes to initialize the API
 *  // video startup functions
 *  init      : function(base, vid, index){ }, // optional: include any additional initialization code here; function called AFTER the embeded video is added using SWFObject
 *  // required functions
 *  cont      : function(base, vid, index){ }, // required: continue play if video was previously played
 *  pause     : function(base, vid, index){ }, // required: pause ALL videos
 *  message   : function(base, data){ },       // required for iframe: process data received from iframe and update the video status for the "isPlaying" function
 *  isPlaying : function(base, vid, index){ }  // required: return true if video is playing and return false if not playing (paused or ended)
 * }
 *
 * Function variables
 *  base (object) = plugin base, all video values/functions are stored in base.video
 *  vid (string) is the ID of the video: vid = "asvideo1"; so jQuery needs a "#" in front... "#" + videoID option default ("asvideo") + index (e.g. "1"); each video matching a service will have a unquie vid
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
		cont : function(base, vid, index){
			var $vid = $('#' + vid);
			if ($vid.length && $vid[0].paused && $vid[0].currentTime > 0 && !$vid[0].ended) {
				$vid[0].play();
			}
		},
		pause : function(base, vid){
			// pause ALL videos on the page
			$('video').each(function(){
				if (typeof(this.pause) !== 'undefined') { this.pause(); } // throws an error in older ie without this
			});
		},
		isPlaying : function(base, vid, index){
			var $vid = $('#' + vid);
			// media.paused seems to be the only way to determine if a video is playing
			return ($vid.length && typeof($vid[0].pause) !== 'undefined' && !$vid[0].paused && !$vid[0].ended) ? true : false;
		}
	},

	// *** Vimeo iframe *** isolated demo: http://jsfiddle.net/Mottie/GxwEX/
	vimeo1 : {
		selector : 'iframe[src*=vimeo]',
		initAPI : '&api=1&player_id=', // video ID added to the end
		cont : function(base, vid, index){
			if (base.options.resumeOnVisible && base.video.list[index].status === 'pause'){
				// Commands sent to the iframe originally had "JSON.stringify" applied to them,
				// but not all browsers support this, so it's just as easy to wrap it in quotes.
				base.video.postMsg('{"method":"play"}', vid);
			}
		},
		pause : function(base, vid){
			// pause ALL videos on the page
			$('iframe[src*=vimeo]').each(function(){
				base.video.postMsg('{"method":"pause"}', this.id);
			});
		},
		message : function(base, data){
			// *** VIMEO *** iframe uses data.player_id
			var index, vid = data.player_id || ''; // vid = data.player_id (unique to vimeo)
			if (vid !== ''){
				index = vid.replace(base.video.options.videoID, '');
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
		isPlaying : function(base, vid, index){
			return (base.video.list[index].status === 'play') ? true : false;
		}
	},

	// *** Embeded Vimeo ***
	// SWFObject adds the url to the object data
	// using param as a selector, the script above looks for the parent if it sees "param"
	vimeo2 : {
		selector : 'object[data-url*=vimeo], embed[src*=vimeo]',
		embedOpts : { flashvars : { api : 1 } },
		cont : function(base, vid, index) {
			if (base.options.resumeOnVisible) {
				var $vid = $('#' + vid);
				// continue video if previously played & not finished (api_finish doesn't seem to exist) - duration can be a decimal number, so subtract it and look at the difference (2 seconds here)
				if (typeof($vid[0].api_play) === 'function' && $vid[0].api_paused() && $vid[0].api_getCurrentTime() !== 0 && ($vid[0].api_getDuration() - $vid[0].api_getCurrentTime()) > 2) {
					$vid[0].api_play();
				}
			}
		},
		pause : function(base, vid){
			// find ALL videos and pause them, just in case
			$('object[data-url*=vimeo], embed[src*=vimeo]').each(function(){
				var el = (this.tagName === 'EMBED') ? $(this).parent()[0] : this;
				if (typeof(el.api_pause) === 'function') {
					el.api_pause();
				}
			});
		},
		isPlaying : function(base, vid, index){
			var $vid = $('#' + vid);
			return (typeof($vid[0].api_paused) === 'function' && !$vid[0].api_paused()) ? true : false;
		}
	},

	// *** iframe YouTube *** isolated demo: http://jsfiddle.net/Mottie/qk5MY/
	youtube1 : {
		selector : 'iframe[src*=youtube]',
		// "iv_load_policy=3" should turn off annotations on init, but doesn't seem to
		initAPI : '&iv_load_policy=3&enablejsapi=1&playerapiid=',
		cont : function(base, vid, index){
			if (base.options.resumeOnVisible && base.video.list[index].status === 2){
				base.video.postMsg('{"event":"command","func":"playVideo"}', vid);
			}
		},
		pause : function(base, vid, index){
			// pause ALL videos on the page - in IE, pausing a video means it will continue when next seen =(
			$('iframe[src*=youtube]').each(function(){
//			if (this.id !== vid || (this.id === vid && base.video.list[index].status >= 0)) { // trying to fix the continue video problem; this only breaks it
				base.video.postMsg('{"event":"command","func":"pauseVideo"}', vid);
//			}
			});
		},
		message : function(base, data){
			if (data.event === 'infoDelivery') { return; } // ignore youtube video loading spam
			// *** YouTube *** iframe returns an embeded url (data.info.videoUrl) but no video id...
			if (data.info && data.info.videoUrl) {
				// figure out vid for youtube
				// data.info.videoURL = http://www.youtube.com/watch?v=###########&feature=player_embedded
				var url = base.video.gup('v', data.info.videoUrl), // end up with ###########, now find it
					v = $('iframe[src*=' + url + ']'), vid, index;
					// iframe src changes when watching related videos; so there is no way to tell which video has an update
					if (v.length) {
						vid = v[0].id;
						index = vid.replace(base.video.options.videoID, '');
					// YouTube ready, add additional event listeners for video status. BUT this never fires off =(
					// Fixing this may solve the continue problem
					if (data.event === 'onReady') {
						base.video.postMsg('{"event":"listening","func":"onStateChange"}', vid);
					}
					// Update status, so the "isPlaying" function can access it
					if (data.event === 'onStateChange' && base.video.list[index]) {
						// update list with current status; data.info.playerState = YouTube
						base.video.list[index].status = data.info.playerState;
					}
				}
			}
		},
		isPlaying : function(base, vid, index){
			var status = base.video.list[index].status;
			// state: unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
			return (status === 1 || status > 2) ? true : false;
		}
	},

	// *** Embeded YouTube ***
	// include embed for IE; SWFObject adds the url to the object data attribute
	youtube2 : {
		selector : 'object[data-url*=youtube], embed[src*=youtube]',
		initAPI : '&iv_load_policy=3&enablejsapi=1&version=3&playerapiid=', // video ID added to the end
		// YouTube - player states: unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
		cont : function(base, vid, index) {
			if (base.options.resumeOnVisible) {
				var $vid = $('#' + vid);
				// continue video if previously played and not cued
				if ($vid.length && typeof($vid[0].getPlayerState) === 'function' && $vid[0].getPlayerState() > 0) {
					$vid[0].playVideo();
				}
			}
		},
		pause : function(base, vid){
			// find ALL videos and pause them, just in case
			$('object[data-url*=youtube], embed[src*=youtube]').each(function(){
				var el = (this.tagName === 'EMBED') ? $(this).parent()[0] : this;
				// player states: unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
				if (typeof(el.getPlayerState) === 'function' && el.getPlayerState() > 0) {
					// pause video if not autoplaying (if already initialized)
					el.pauseVideo();
				}
			});
		},
		isPlaying : function(base, vid){
			var $vid = $('#' + vid);
			return (typeof($vid[0].getPlayerState) === 'function' && ($vid[0].getPlayerState() === 1 || $vid[0].getPlayerState() > 2)) ? true : false;
		}
	}

};

})(jQuery);

// Initialize video extension automatically
jQuery(window).load(function(){
 jQuery('.anythingBase').anythingSliderVideo();
});
