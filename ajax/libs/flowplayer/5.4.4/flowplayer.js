/*!

   Flowplayer v5.4.4 (Wednesday, 06. November 2013 01:27PM) | flowplayer.org/license

*/
!function($) { 

/*
   jQuery.browser for 1.9+

   We all love feature detection but that's sometimes not enough.

   @author Tero Piirainen
*/
!function($) {

   if (!$.browser) {

      var b = $.browser = {},
         ua = navigator.userAgent.toLowerCase(),
         match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
         /(safari)[ \/]([\w.]+)/.exec(ua) ||
         /(webkit)[ \/]([\w.]+)/.exec(ua) ||
         /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
         /(msie) ([\w.]+)/.exec(ua) ||
         ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

      if (match[1]) {
         b[match[1]] = true;
         b.version = match[2] || "0";
      }

   }

}(jQuery);
// auto-install (any video tag with parent .flowplayer)
$(function() {
   if (typeof $.fn.flowplayer == 'function') {
      $("video").parent(".flowplayer").flowplayer();
   }
});

var instances = [],
   extensions = [],
   UA = window.navigator.userAgent;


/* flowplayer()  */
window.flowplayer = function(fn) {
   return $.isFunction(fn) ? extensions.push(fn) :
      typeof fn == 'number' || fn === undefined ? instances[fn || 0] :
      $(fn).data("flowplayer");
};

$(window).on('beforeunload', function() {
   $.each(instances, function(i, api) {
      if (api.conf.splash) {
         api.unload();
      } else {
         api.bind("error", function () {
            $(".flowplayer.is-error .fp-message").remove();
         });
      }
   });
});

$.extend(flowplayer, {

   version: '5.4.4',

   engine: {},

   conf: {},

   support: {},

   defaults: {

      debug: false,

      // true = forced playback
      disabled: false,

      // first engine to try
      engine: 'html5',

      fullscreen: window == window.top,

      // keyboard shortcuts
      keyboard: true,

      // default aspect ratio
      ratio: 9 / 16,

      adaptiveRatio: false,

      // scale flash object to video's aspect ratio in normal mode?
      flashfit: false,

      rtmp: 0,

      splash: false,

      live: false,

      swf: "//releases.flowplayer.org/5.4.4/flowplayer.swf",

      speeds: [0.25, 0.5, 1, 1.5, 2],

      tooltip: true,

      // initial volume level
      volume: typeof localStorage != "object" ? 1 : localStorage.muted == "true" ? 0 : !isNaN(localStorage.volume) ? localStorage.volume || 1 : 1,

      // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#error-codes
      errors: [

         // video exceptions
         '',
         'Video loading aborted',
         'Network error',
         'Video not properly encoded',
         'Video file not found',

         // player exceptions
         'Unsupported video',
         'Skin not found',
         'SWF file not found',
         'Subtitles not found',
         'Invalid RTMP URL',
         'Unsupported video format. Try installing Adobe Flash.'
      ],
      errorUrls: ['','','','','','','','','','',
         'http://get.adobe.com/flashplayer/'
      ],
      playlist: []

   }

});

// keep track of players
var playerCount = 1;

// jQuery plugin
$.fn.flowplayer = function(opts, callback) {

   if (typeof opts == 'string') opts = { swf: opts }
   if ($.isFunction(opts)) { callback = opts; opts = {} }

   return !opts && this.data("flowplayer") || this.each(function() {

      // private variables
      var root = $(this).addClass("is-loading"),
         conf = $.extend({}, flowplayer.defaults, flowplayer.conf, opts, root.data()),
         videoTag = $("video", root).addClass("fp-engine").removeAttr("controls"),
         urlResolver = videoTag.length ? new URLResolver(videoTag) : null,
         storage = {},
         lastSeekPosition,
         engine;

      if (!flowplayer.support.firstframe) videoTag.detach();

      if (conf.playlist.length) { // Create initial video tag if called without
         var preload = videoTag.attr('preload'), placeHolder;
         if (videoTag.length) videoTag.replaceWith(placeHolder = $('<p />'));
         videoTag = $('<video />').addClass('fp-engine');
         placeHolder ? placeHolder.replaceWith(videoTag) : root.prepend(videoTag);
         videoTag.attr('preload', preload);
         if (typeof conf.playlist[0] === 'string') videoTag.attr('src', conf.playlist[0]);
         else {
            $.each(conf.playlist[0], function(i, plObj) {
               for (var type in plObj) {
                  if (plObj.hasOwnProperty(type)) {
                     videoTag.append($('<source />').attr({type: 'video/' + type, src: plObj[type]}));
                  }
               }
            });
         }
         urlResolver = new URLResolver(videoTag);

      }

      //stop old instance
      var oldApi = root.data('flowplayer');
      if (oldApi) oldApi.unload();

      root.data('fp-player_id', root.data('fp-player_id') || playerCount++);

      try {
         storage = window.localStorage || storage;
      } catch(e) {}

      var isRTL = (this.currentStyle && this.currentStyle['direction'] === 'rtl')
         || (window.getComputedStyle && window.getComputedStyle(this, null).getPropertyValue('direction') === 'rtl');

      if (isRTL) root.addClass('is-rtl');

      /*** API ***/
      var api = oldApi || {

         // properties
         conf: conf,
         currentSpeed: 1,
         volumeLevel: typeof conf.volume === "undefined" ? storage.volume * 1 : conf.volume,
         video: {},

         // states
         disabled: false,
         finished: false,
         loading: false,
         muted: storage.muted == "true" || conf.muted,
         paused: false,
         playing: false,
         ready: false,
         splash: false,
         rtl: isRTL,

         // methods
         load: function(video, callback) {

            if (api.error || api.loading || api.disabled) return;

            // resolve URL
            video = urlResolver.resolve(video);
            $.extend(video, engine.pick(video.sources));

            if (video.src) {
               var e = $.Event("load");
               root.trigger(e, [api, video, engine]);

               if (!e.isDefaultPrevented()) {
                  engine.load(video);

                  // callback
                  if ($.isFunction(video)) callback = video;
                  if (callback) root.one("ready", callback);
               } else {
                  api.loading = false;
               }
            }

            return api;
         },

         pause: function(fn) {
            if (api.ready && !api.seeking && !api.disabled && !api.loading) {
               engine.pause();
               api.one("pause", fn);
            }
            return api;
         },

         resume: function() {

            if (api.ready && api.paused && !api.disabled) {
               engine.resume();

               // Firefox (+others?) does not fire "resume" after finish
               if (api.finished) {
                  api.trigger("resume");
                  api.finished = false;
               }
            }

            return api;
         },

         toggle: function() {
            return api.ready ? api.paused ? api.resume() : api.pause() : api.load();
         },

         /*
            seek(1.4)   -> 1.4s time
            seek(true)  -> 10% forward
            seek(false) -> 10% backward
         */
         seek: function(time, callback) {
            if (api.ready) {

               if (typeof time == "boolean") {
                  var delta = api.video.duration * 0.1;
                  time = api.video.time + (time ? delta : -delta);
               }
               time = lastSeekPosition = Math.min(Math.max(time, 0), api.video.duration).toFixed(1);
               var ev = $.Event('beforeseek');
               root.trigger(ev, [api, time]);
               if (!ev.isDefaultPrevented()) {
                  engine.seek(time);
                  if ($.isFunction(callback)) root.one("seek", callback);
               } else {
                  api.seeking = false;
                  root.toggleClass("is-seeking", api.seeking); // remove loading indicator
               }
            }
            return api;
         },

         /*
            seekTo(1) -> 10%
            seekTo(2) -> 20%
            seekTo(3) -> 30%
            ...
            seekTo()  -> last position
         */
         seekTo: function(position, fn) {
            var time = position === undefined ? lastSeekPosition : api.video.duration * 0.1 * position;
            return api.seek(time, fn);
         },

         mute: function(flag) {
            if (flag === undefined) flag = !api.muted;
            storage.muted = api.muted = flag;
            storage.volume = !isNaN(storage.volume) ? storage.volume : conf.volume; // make sure storage has volume
            api.volume(flag ? 0 : storage.volume, true);
            api.trigger("mute", flag);
            return api;
         },

         volume: function(level, skipStore) {
            if (api.ready) {
              level = Math.min(Math.max(level, 0), 1);
              if (!skipStore) storage.volume = level;
              engine.volume(level);
            }

            return api;
         },

         speed: function(val, callback) {

            if (api.ready) {

               // increase / decrease
               if (typeof val == "boolean") {
                  val = conf.speeds[$.inArray(api.currentSpeed, conf.speeds) + (val ? 1 : -1)] || api.currentSpeed;
               }

               engine.speed(val);
               if (callback) root.one("speed", callback);
            }

            return api;
         },


         stop: function() {
            if (api.ready) {
               api.pause();
               api.seek(0, function() {
                  root.trigger("stop");
               });
            }
            return api;
         },

         unload: function() {
            if (!root.hasClass("is-embedding")) {

               if (conf.splash) {
                  api.trigger("unload");
                  engine.unload();
               } else {
                  api.stop();
               }
            }
            return api;
         },

         disable: function(flag) {
            if (flag === undefined) flag = !api.disabled;

            if (flag != api.disabled) {
               api.disabled = flag;
               api.trigger("disable", flag);
            }
            return api;
         }

      };

      api.conf = $.extend(api.conf, conf);


      /* event binding / unbinding */
      $.each(['bind', 'one', 'unbind'], function(i, key) {
         api[key] = function(type, fn) {
            root[key](type, fn);
            return api;
         };
      });

      api.trigger = function(event, arg) {
         root.trigger(event, [api, arg]);
         return api;
      };


      /*** Behaviour ***/
      if (!root.data('flowplayer')) { // Only bind once
         root.bind("boot", function() {

            // conf
            $.each(['autoplay', 'loop', 'preload', 'poster'], function(i, key) {
               var val = videoTag.attr(key);
               if (val !== undefined) conf[key] = val ? val : true;
            });

            // splash
            if (conf.splash || root.hasClass("is-splash") || !flowplayer.support.firstframe) {
               api.forcedSplash = !conf.splash && !root.hasClass("is-splash");
               api.splash = conf.splash = conf.autoplay = true;
               root.addClass("is-splash");
               videoTag.attr("preload", "none");
            }

            if (conf.live || root.hasClass('is-live')) {
               api.live = conf.live = true;
               root.addClass('is-live');
            }

            // extensions
            $.each(extensions, function(i) {
               var v;
               if  (!flowplayer.support.firstframe) v = videoTag.clone().prependTo(root); //Hack for a hack..
               this(api, root);
               if (v) v.remove();
            });

            // 1. use the configured engine
            engine = flowplayer.engine[conf.engine];
            if (engine) engine = engine(api, root);

            if (engine.pick(urlResolver.initialSources)) {
               api.engine = conf.engine;

            // 2. failed -> try another
            } else {
               $.each(flowplayer.engine, function(name, impl) {
                  if (name != conf.engine) {
                     engine = this(api, root);
                     if (engine.pick(urlResolver.initialSources)) api.engine = name;
                     return false;
                  }
               });
            }

            // instances
            instances.push(api);

            // no engine
            if (!api.engine) return api.trigger("error", { code: flowplayer.support.flashVideo ? 5 : 10 });

            // start
            conf.splash ? api.unload() : api.load();

            // disabled
            if (conf.disabled) api.disable();

            //initial volumelevel
            engine.volume(api.volumeLevel);

            // initial callback
            root.one("ready", callback);


         }).bind("load", function(e, api, video) {

            // unload others
            if (conf.splash) {
               $(".flowplayer").filter(".is-ready, .is-loading").not(root).each(function() {
                  var api = $(this).data("flowplayer");
                  if (api.conf.splash) api.unload();
               });
            }

            // loading
            root.addClass("is-loading");
            api.loading = true;


         }).bind("ready", function(e, api, video) {
            video.time = 0;
            api.video = video;

            function notLoading() {
               root.removeClass("is-loading");
               api.loading = false;
            }

            if (conf.splash) root.one("progress", notLoading);
            else notLoading();

            // saved state
            if (api.muted) api.mute(true);
            else api.volume(api.volumeLevel);


         }).bind("unload", function(e) {
            if (conf.splash) videoTag.remove();
            root.removeClass("is-loading");
            api.loading = false;


         }).bind("ready unload", function(e) {
            var is_ready = e.type == "ready";
            root.toggleClass("is-splash", !is_ready).toggleClass("is-ready", is_ready);
            api.ready = is_ready;
            api.splash = !is_ready;


         }).bind("progress", function(e, api, time) {
            api.video.time = time;


         }).bind("speed", function(e, api, val) {
            api.currentSpeed = val;

         }).bind("volume", function(e, api, level) {
            api.volumeLevel = Math.round(level * 100) / 100;
            if (!api.muted) storage.volume = level;
            else if (level) api.mute(false);


         }).bind("beforeseek seek", function(e) {
            api.seeking = e.type == "beforeseek";
            root.toggleClass("is-seeking", api.seeking);

         }).bind("ready pause resume unload finish stop", function(e, _api, video) {

            // PAUSED: pause / finish
            api.paused = /pause|finish|unload|stop/.test(e.type);

            // SHAKY HACK: first-frame / preload=none
            if (e.type == "ready") {
               api.paused = conf.preload == 'none';
               if (video) {
                  api.paused = !video.duration || !conf.autoplay && (conf.preload != 'none');
               }
            }

            // the opposite
            api.playing = !api.paused;

            // CSS classes
            root.toggleClass("is-paused", api.paused).toggleClass("is-playing", api.playing);

            // sanity check
            if (!api.load.ed) api.pause();

         }).bind("finish", function(e) {
            api.finished = true;

         }).bind("error", function() {
            videoTag.remove();
         });
      }

      // boot
      root.trigger("boot", [api, root]).data("flowplayer", api);

   });

};

!function() {

   var parseIpadVersion = function(UA) {
      var e = /Version\/(\d\.\d)/.exec(UA);
      if (e && e.length > 1) {
         return parseFloat(e[1], 10);
      }
      return 0;
   };

   var s = flowplayer.support,
      browser = $.browser,
      video = $("<video loop autoplay preload/>")[0],
      IS_IE = browser.msie,
      UA = navigator.userAgent,
      IS_IPAD = /iPad|MeeGo/.test(UA) && !/CriOS/.test(UA),
      IS_IPAD_CHROME = /iPad/.test(UA) && /CriOS/.test(UA),
      IS_IPHONE = /iP(hone|od)/i.test(UA) && !/iPad/.test(UA),
      IS_ANDROID = /Android/.test(UA) && !/Firefox/.test(UA),
      IS_ANDROID_FIREFOX = /Android/.test(UA) && /Firefox/.test(UA),
      IS_SILK = /Silk/.test(UA),
      IS_WP = /IEMobile/.test(UA),
      IPAD_VER = IS_IPAD ? parseIpadVersion(UA) : 0,
      ANDROID_VER = IS_ANDROID ? parseFloat(/Android\ (\d\.\d)/.exec(UA)[1], 10) : 0;
   $.extend(s, {
      subtitles: !!video.addTextTrack,
      fullscreen: !IS_ANDROID &&
         (typeof document.webkitCancelFullScreen == 'function' && !/Mac OS X 10_5.+Version\/5\.0\.\d Safari/.test(UA) ||
            document.mozFullScreenEnabled ||
            typeof document.exitFullscreen == 'function'),
      inlineBlock: !(IS_IE && browser.version < 8),
      touch: ('ontouchstart' in window),
      dataload: !IS_IPAD && !IS_IPHONE && !IS_WP,
      zeropreload: !IS_IE && !IS_ANDROID, // IE supports only preload=metadata
      volume: !IS_IPAD && !IS_ANDROID && !IS_IPHONE && !IS_SILK && !IS_IPAD_CHROME,
      cachedVideoTag: !IS_IPAD && !IS_IPHONE && !IS_IPAD_CHROME && !IS_WP,
      firstframe: !IS_IPHONE && !IS_IPAD && !IS_ANDROID && !IS_SILK && !IS_IPAD_CHROME && !IS_WP && !IS_ANDROID_FIREFOX,
      inlineVideo: !IS_IPHONE && !IS_SILK && !IS_WP && (!IS_ANDROID || ANDROID_VER >= 3),
      hlsDuration: !browser.safari || IS_IPAD || IS_IPHONE || IS_IPAD_CHROME,
      seekable: !IS_IPAD && !IS_IPAD_CHROME
   });

   // flashVideo
   try {
      var ver = IS_IE ? new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable('$version') :
         navigator.plugins["Shockwave Flash"].description;

      ver = ver.split(/\D+/);
      if (ver.length && !ver[0]) ver = ver.slice(1);

      s.flashVideo = ver[0] > 9 || ver[0] == 9 && ver[3] >= 115;

   } catch (ignored) {}
   try {
      s.video = !!video.canPlayType;
      s.video && video.canPlayType('video/mp4');
   } catch (e) {
      s.video = false;
   }

   // animation
   s.animation = (function() {
      var vendors = ['','Webkit','Moz','O','ms','Khtml'], el = $("<p/>")[0];

      for (var i = 0; i < vendors.length; i++) {
         if (el.style[vendors[i] + 'AnimationName'] !== 'undefined') return true;
      }
   })();



}();


/* The most minimal Flash embedding */

// movie required in opts
function embed(swf, flashvars) {

   var id = "obj" + ("" + Math.random()).slice(2, 15),
      tag = '<object class="fp-engine" id="' + id+ '" name="' + id + '" ';

   tag += $.browser.msie ? 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' :
      ' data="' + swf  + '" type="application/x-shockwave-flash">';

   var opts = {
      width: "100%",
      height: "100%",
      allowscriptaccess: "always",
      wmode: "transparent",
      quality: "high",
      flashvars: "",

      // https://github.com/flowplayer/flowplayer/issues/13#issuecomment-9369919
      movie: swf + ($.browser.msie ? "?" + id : ""),
      name: id
   };

   // flashvars
   $.each(flashvars, function(key, value) {
      opts.flashvars += key + "=" + value + "&";
   });

   // parameters
   $.each(opts, function(key, value) {
      tag += '<param name="' + key + '" value="'+ value +'"/>';
   });

   tag += "</object>";

   return $(tag);
}


// Flash is buggy allover
if (window.attachEvent) {
   window.attachEvent("onbeforeunload", function() {
      __flash_savedUnloadHandler = __flash_unloadHandler = function() {};
   });
}


flowplayer.engine.flash = function(player, root) {

   var conf = player.conf,
      video = player.video,
      callbackId,
      objectTag,
      api;

   var engine = {

      pick: function(sources) {

         if (flowplayer.support.flashVideo) {

            // always pick video/flash first
            var flash = $.grep(sources, function(source) { return source.type == 'flash'; })[0];
            if (flash) return flash;

            for (var i = 0, source; i < sources.length; i++) {
               source = sources[i];
               if (/mp4|flv/.test(source.type)) return source;
            }
         }
      },

      load: function(video) {

         function escapeURL(url) {
            return url.replace(/&amp;/g, '%26').replace(/&/g, '%26').replace(/=/g, '%3D');
         }

         var html5Tag = $("video", root),
            url = escapeURL(video.src);
            is_absolute = /^https?:/.test(url);

         // html5 tag not needed (pause needed for firefox)
         try {
            if (html5Tag.length > 0 && flowplayer.support.video) html5Tag[0].pause();
         } catch (e) {
            // Omit errors on calling pause(), see https://github.com/flowplayer/flowplayer/issues/490
         }
         var removeTag = function() {
            html5Tag.remove();
         };
         var hasSupportedSource = function(sources) {
            return $.grep(sources, function(src) {
               return !!html5Tag[0].canPlayType('video/' + src.type);
            }).length > 0;
         };
         if (flowplayer.support.video &&
            html5Tag.prop('autoplay') &&
            hasSupportedSource(video.sources)) html5Tag.one('timeupdate', removeTag);
         else removeTag();

         // convert to absolute
         if (!is_absolute && !conf.rtmp) url = $("<img/>").attr("src", url)[0].src;

         if (api) {
            api.__play(url);

         } else {

            callbackId = "fp" + ("" + Math.random()).slice(3, 15);

            var opts = {
               hostname: conf.embedded ? conf.hostname : location.hostname,
               url: url,
               callback: "jQuery."+ callbackId
            };
            if (root.data("origin")) {
               opts.origin = root.data("origin");
            }

            if (is_absolute) delete conf.rtmp;

            // optional conf
            $.each(['key', 'autoplay', 'preload', 'rtmp', 'loop', 'debug', 'preload', 'splash', 'bufferTime'], function(i, key) {
               if (conf[key]) opts[key] = conf[key];
            });

            // issue #376
            if (opts.rtmp) {
               opts.rtmp = escapeURL(opts.rtmp);
            }

            objectTag = embed(conf.swf, opts);

            objectTag.prependTo(root);

            api = objectTag[0];

            // throw error if no loading occurs
            setTimeout(function() {
               try {
                  if (!api.PercentLoaded()) {
                     return root.trigger("error", [player, { code: 7, url: conf.swf }]);
                  }
               } catch (e) {}
            }, 5000);

            // listen
            $[callbackId] = function(type, arg) {

               if (conf.debug && type != "status") console.log("--", type, arg);

               var event = $.Event(type);

               switch (type) {

                  // RTMP sends a lot of finish events in vain
                  // case "finish": if (conf.rtmp) return;
                  case "ready": arg = $.extend(video, arg); break;
                  case "click": event.flash = true; break;
                  case "keydown": event.which = arg; break;
                  case "seek": video.time = arg; break;

                  case "status":
                     player.trigger("progress", arg.time);

                     if (arg.buffer < video.bytes && !video.buffered) {
                        video.buffer = arg.buffer / video.bytes * video.duration;
                        player.trigger("buffer", video.buffer);
                     } else if (!video.buffered) {
                        video.buffered = true;
                        player.trigger("buffered");
                     }

                     break;

               }

               if (type != 'buffered') {
                  // add some delay so that player is truly ready after an event
                  setTimeout(function() { player.trigger(event, arg); }, 1)
               }

            };

         }

      },

      // not supported yet
      speed: $.noop,


      unload: function() {
         api && api.__unload && api.__unload();
         delete $[callbackId];
         $("object", root).remove();
         api = 0;
      }

   };

   $.each("pause,resume,seek,volume".split(","), function(i, name) {

      engine[name] = function(arg) {

         if (player.ready) {

            if (name == 'seek' && player.video.time && !player.paused) {
               player.trigger("beforeseek");
            }

            if (arg === undefined) {
               api["__" + name]();

            } else {
               api["__" + name](arg);
            }

         }
      };

   });

   var win = $(window);

   // handle Flash object aspect ratio
   player.bind("ready fullscreen fullscreen-exit", function(e) {
      var origH = root.height(),
         origW = root.width();
      if (player.conf.flashfit || /full/.test(e.type)) {

         var fs = player.isFullscreen,
            truefs = fs && FS_SUPPORT,
            ie7 = !flowplayer.support.inlineBlock,
            screenW = fs ? (truefs ? screen.width : win.width()) : origW,
            screenH = fs ? (truefs ? screen.height : win.height()) : origH,

            // default values for fullscreen-exit without flashfit
            hmargin = 0,
            vmargin = 0,
            objwidth = ie7 ? origW : '',
            objheight = ie7 ? origH : '',

            aspectratio, dataratio;

         if (player.conf.flashfit || e.type === "fullscreen") {
            aspectratio = player.video.width / player.video.height,
            dataratio = player.video.height / player.video.width,
            objheight = Math.max(dataratio * screenW),
            objwidth = Math.max(aspectratio * screenH);
            objheight = objheight > screenH ? objwidth * dataratio : objheight;
            objheight = Math.min(Math.round(objheight), screenH);
            objwidth = objwidth > screenW ? objheight * aspectratio : objwidth;
            objwidth = Math.min(Math.round(objwidth), screenW);
            vmargin = Math.max(Math.round((screenH + vmargin - objheight) / 2), 0);
            hmargin = Math.max(Math.round((screenW + hmargin - objwidth) / 2), 0);
         }

         $("object", root).css({
            width: objwidth,
            height: objheight,
            marginTop: vmargin,
            marginLeft: hmargin
         });
      }
   });

   return engine;

};


var VIDEO = $('<video/>')[0];

// HTML5 --> Flowplayer event
var EVENTS = {

   // fired
   ended: 'finish',
   pause: 'pause',
   play: 'resume',
   progress: 'buffer',
   timeupdate: 'progress',
   volumechange: 'volume',
   ratechange: 'speed',
   //seeking: 'beforeseek',
   seeked: 'seek',
   // abort: 'resume',

   // not fired
   loadeddata: 'ready',
   // loadedmetadata: 0,
   // canplay: 0,

   // error events
   // load: 0,
   // emptied: 0,
   // empty: 0,
   error: 'error',
   dataunavailable: 'error'

};

function round(val, per) {
   per = per || 100;
   return Math.round(val * per) / per;
}

function getType(type) {
   return /mpegurl/i.test(type) ? "application/x-mpegurl" : "video/" + type;
}

function canPlay(type) {
   if (!/^(video|application)/.test(type))
      type = getType(type);
   return !!VIDEO.canPlayType(type).replace("no", '');
}

function findFromSourcesByType(sources, type) {
   var arr = $.grep(sources, function(s) {
      return s.type === type;
   });
   return arr.length ? arr[0] : null;
}

var videoTagCache;
var createVideoTag = function(video) {
   if (videoTagCache) {
      return videoTagCache.attr({type: getType(video.type), src: video.src});
   }
   return (videoTagCache = $("<video/>", {
               src: video.src,
               type: getType(video.type),
               'class': 'fp-engine',
               'autoplay': 'autoplay',
               preload: 'none',
               'x-webkit-airplay': 'allow'
            }));
}

flowplayer.engine.html5 = function(player, root) {

   var videoTag = $("video", root),
      support = flowplayer.support,
      track = $("track", videoTag),
      conf = player.conf,
      self,
      timer,
      api;

   return self = {

      pick: function(sources) {
         if (support.video) {
            if (conf.videoTypePreference) {
               var mp4source = findFromSourcesByType(sources, conf.videoTypePreference);
               if (mp4source) return mp4source;
            }
            for (var i = 0, source; i < sources.length; i++) {
               if (canPlay(sources[i].type)) return sources[i];
            }
         }
      },

      load: function(video) {

         if (conf.splash && !api) {

            videoTag = createVideoTag(video).prependTo(root);

            if (!support.inlineVideo) {
               videoTag.css({
                  position: 'absolute',
                  top: '-9999em'
               });
            }

            if (track.length) videoTag.append(track.attr("default", ""));

            if (conf.loop) videoTag.attr("loop", "loop");

            api = videoTag[0];

         } else {

            api = videoTag[0];
            var sources = videoTag.find('source');
            if (!api.src && sources.length) {
               api.src = video.src;
               sources.remove();
            }

            // change of clip
            if (player.video.src && video.src != player.video.src) {
               videoTag.attr("autoplay", "autoplay");
               api.src = video.src;

            // preload=none or no initial "loadeddata" event
            } else if (conf.preload == 'none' || !support.dataload) {

               if (support.zeropreload) {
                  player.trigger("ready", video).trigger("pause").one("ready", function() {
                     root.trigger("resume");
                  });

               } else {
                  player.one("ready", function() {
                     root.trigger("pause");
                  });
               }
            }

         }

         listen(api, $("source", videoTag).add(videoTag), video);

         // iPad (+others?) demands load()
         if (conf.preload != 'none' || !support.zeropreload || !support.dataload) api.load();
         if (conf.splash) api.load();
      },

      pause: function() {
         api.pause();
      },

      resume: function() {
         api.play();
      },

      speed: function(val) {
         api.playbackRate = val;
      },

      seek: function(time) {
         try {
            var pausedState = player.paused;
            api.currentTime = time;
            if (pausedState) api.pause();
         } catch (ignored) {}
      },

      volume: function(level) {
         api.volume = level;
      },

      unload: function() {
         $("video.fp-engine", root).remove();
         if (!support.cachedVideoTag) videoTagCache = null;
         timer = clearInterval(timer);
         api = 0;
      }

   };

   function listen(api, sources, video) {
      // listen only once

      if (api.listeners && api.listeners.hasOwnProperty(root.data('fp-player_id'))) return;
      (api.listeners || (api.listeners = {}))[root.data('fp-player_id')] = true;

      sources.bind("error", function(e) {
         try {
            if (e.originalEvent && $(e.originalEvent.originalTarget).is('img')) return e.preventDefault();
            if (canPlay($(e.target).attr("type"))) {
               player.trigger("error", { code: 4 });
            }
         } catch (er) {
            // Most likely: https://bugzilla.mozilla.org/show_bug.cgi?id=208427
         }
      });

      $.each(EVENTS, function(type, flow) {

         api.addEventListener(type, function(e) {

            // safari hack for bad URL (10s before fails)
            if (flow == "progress" && e.srcElement && e.srcElement.readyState === 0) {
               setTimeout(function() {
                  if (!player.video.duration) {
                     flow = "error";
                     player.trigger(flow, { code: 4 });
                  }
               }, 10000);
            }

            if (conf.debug && !/progress/.test(flow)) console.log(type, "->", flow, e);

            // no events if player not ready
            if (!player.ready && !/ready|error/.test(flow) || !flow || !$("video", root).length) { return; }

            var event = $.Event(flow), arg;

            switch (flow) {

               case "ready":

                  arg = $.extend(video, {
                     duration: api.duration,
                     width: api.videoWidth,
                     height: api.videoHeight,
                     url: api.currentSrc,
                     src: api.currentSrc
                  });

                  try {
                     arg.seekable = api.seekable && api.seekable.end(null);

                  } catch (ignored) {}

                  // buffer
                  timer = timer || setInterval(function() {

                     try {
                        arg.buffer = api.buffered.end(null);

                     } catch (ignored) {}

                     if (arg.buffer) {
                        if (round(arg.buffer, 1000) < round(arg.duration, 1000) && !arg.buffered) {
                           player.trigger("buffer", e);

                        } else if (!arg.buffered) {
                           arg.buffered = true;
                           player.trigger("buffer", e).trigger("buffered", e);
                           clearInterval(timer);
                           timer = 0;
                        }
                     }

                  }, 250);

                  if (!conf.live && !arg.duration && !support.hlsDuration && type === "loadeddata") {
                     var durationChanged = function() {
                        arg.duration = api.duration;
                        try {
                           arg.seekable = api.seekable && api.seekable.end(null);

                        } catch (ignored) {}
                        player.trigger(event, arg);
                        api.removeEventListener('durationchange', durationChanged);
                     };
                     api.addEventListener('durationchange', durationChanged);
                     return;
                  }

                  break;

               case "progress": case "seek":

                  var dur = player.video.duration

                  if (api.currentTime > 0) {
                     arg = Math.max(api.currentTime, 0);
                     break;

                  } else if (flow == 'progress') {
                     return;
                  }


               case "speed":
                  arg = round(api.playbackRate);
                  break;

               case "volume":
                  arg = round(api.volume);
                  break;

               case "error":
                  try {
                     arg = (e.srcElement || e.originalTarget).error;
                  } catch (er) {
                     // Most likely https://bugzilla.mozilla.org/show_bug.cgi?id=208427
                     return;
                  }
            }

            player.trigger(event, arg);

         }, false);

      });

   }

};
var TYPE_RE = /\.(\w{3,4})(\?.*)?$/i;

function parseSource(el) {

   var src = el.attr("src"),
      type = el.attr("type") || "",
      suffix = src.split(TYPE_RE)[1];

   type = /mpegurl/.test(type) ? "mpegurl" : type.replace("video/", "");

   return { src: src, suffix: suffix || type, type: type || suffix };
}

/* Resolves video object from initial configuration and from load() method */
function URLResolver(videoTag) {

   var self = this,
      sources = [];

   // initial sources
   $("source", videoTag).each(function() {
      sources.push(parseSource($(this)));
   });

   if (!sources.length) sources.push(parseSource(videoTag));

   self.initialSources = sources;

   self.resolve = function(video) {
      if (!video) return { sources: sources };

      if ($.isArray(video)) {

         video = { sources: $.map(video, function(el) {
            var type, ret = $.extend({}, el);
            $.each(el, function(key, value) { type = key; });
            ret.type = type;
            ret.src = el[type];
            delete ret[type];
            return ret;
         })};

      } else if (typeof video == 'string') {

         video = { src: video, sources: [] };

         $.each(sources, function(i, source) {
            if (source.type != 'flash') {
               video.sources.push({
                  type: source.type,
                  src: video.src.replace(TYPE_RE, "." + source.suffix + "$2")
               });
            }
         });
      }

      return video;
   };

};
/* A minimal jQuery Slider plugin with all goodies */

// skip IE policies
// document.ondragstart = function () { return false; };


// execute function every <delay> ms
$.throttle = function(fn, delay) {
   var locked;

   return function () {
      if (!locked) {
         fn.apply(this, arguments);
         locked = 1;
         setTimeout(function () { locked = 0; }, delay);
      }
   };
};


$.fn.slider2 = function(rtl) {

   var IS_IPAD = /iPad/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent);

   return this.each(function() {

      var root = $(this),
         doc = $(document),
         progress = root.children(":last"),
         disabled,
         offset,
         width,
         height,
         vertical,
         size,
         maxValue,
         max,
         skipAnimation = false,

         /* private */
         calc = function() {
            offset = root.offset();
            width = root.width();
            height = root.height();

            /* exit from fullscreen can mess this up.*/
            // vertical = height > width;

            size = vertical ? height : width;
            max = toDelta(maxValue);
         },

         fire = function(value) {
            if (!disabled && value != api.value && (!maxValue || value < maxValue)) {
               root.trigger("slide", [ value ]);
               api.value = value;
            }
         },

         mousemove = function(e) {
            var pageX = e.pageX;
            if (!pageX && e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length) {
               pageX = e.originalEvent.touches[0].pageX;
            }
            var delta = vertical ? e.pageY - offset.top : pageX - offset.left;
            delta = Math.max(0, Math.min(max || size, delta));

            var value = delta / size;
            if (vertical) value = 1 - value;
            if (rtl) value = 1 - value;
            return move(value, 0, true);
         },

         move = function(value, speed) {
            if (speed === undefined) { speed = 0; }
            if (value > 1) value = 1;

            var to = (Math.round(value * 1000) / 10) + "%";

            if (!maxValue || value <= maxValue) {
               if (!IS_IPAD) progress.stop(); // stop() broken on iPad
               if (skipAnimation) {
                  progress.css('width', to);
               } else {
                  progress.animate(vertical ? { height: to } : { width: to }, speed, "linear");
               }
            }

            return value;
         },

         toDelta = function(value) {
            return Math.max(0, Math.min(size, vertical ? (1 - value) * height : value * width));
         },

         /* public */
         api = {

            max: function(value) {
               maxValue = value;
            },

            disable: function(flag) {
               disabled = flag;
            },

            slide: function(value, speed, fireEvent) {
               calc();
               if (fireEvent) fire(value);
               move(value, speed);
            },

            // Should animation be handled via css
            disableAnimation: function(value) {
               skipAnimation = value !== false;
            }

         };

      calc();

      // bound dragging into document
      root.data("api", api).bind("mousedown.sld touchstart", function(e) {
         e.preventDefault();

         if (!disabled) {

            // begin --> recalculate. allows dynamic resizing of the slider
            var delayedFire = $.throttle(fire, 100);
            calc();
            api.dragging = true;
            root.addClass('is-dragging');
            fire(mousemove(e));

            doc.bind("mousemove.sld touchmove", function(e) {
               e.preventDefault();
               delayedFire(mousemove(e));

            }).one("mouseup touchend", function() {
               api.dragging = false;
               root.removeClass('is-dragging');
               doc.unbind("mousemove.sld touchmove");
            });

         }

      });

   });

};

function zeropad(val) {
   val = parseInt(val, 10);
   return val >= 10 ? val : "0" + val;
}

// display seconds in hh:mm:ss format
function format(sec) {

   sec = sec || 0;

   var h = Math.floor(sec / 3600),
       min = Math.floor(sec / 60);

   sec = sec - (min * 60);

   if (h >= 1) {
      min -= h * 60;
      return h + ":" + zeropad(min) + ":" + zeropad(sec);
   }

   return zeropad(min) + ":" + zeropad(sec);
}

flowplayer(function(api, root) {

   var conf = api.conf,
      support = flowplayer.support,
      hovertimer;
   root.find('.fp-ratio,.fp-ui').remove();
   root.addClass("flowplayer").append('\
      <div class="ratio"/>\
      <div class="ui">\
         <div class="waiting"><em/><em/><em/></div>\
         <a class="fullscreen"/>\
         <a class="unload"/>\
         <p class="speed"/>\
         <div class="controls">\
            <a class="play"></a>\
            <div class="timeline">\
               <div class="buffer"/>\
               <div class="progress"/>\
            </div>\
            <div class="volume">\
               <a class="mute"></a>\
               <div class="volumeslider">\
                  <div class="volumelevel"/>\
               </div>\
            </div>\
         </div>\
         <div class="time">\
            <em class="elapsed">00:00</em>\
            <em class="remaining"/>\
            <em class="duration">00:00</em>\
         </div>\
         <div class="message"><h2/><p/></div>\
      </div>'.replace(/class="/g, 'class="fp-')
   );

   function find(klass) {
      return $(".fp-" + klass, root);
   }

   // widgets
   var progress = find("progress"),
      buffer = find("buffer"),
      elapsed = find("elapsed"),
      remaining = find("remaining"),
      waiting = find("waiting"),
      ratio = find("ratio"),
      speed = find("speed"),
      durationEl = find("duration"),
      origRatio = ratio.css("paddingTop"),

      // sliders
      timeline = find("timeline").slider2(api.rtl),
      timelineApi = timeline.data("api"),

      volume = find("volume"),
      fullscreen = find("fullscreen"),
      volumeSlider = find("volumeslider").slider2(api.rtl),
      volumeApi = volumeSlider.data("api"),
      noToggle = root.is(".fixed-controls, .no-toggle");

   timelineApi.disableAnimation(root.hasClass('is-touch'));

   // aspect ratio
   function setRatio(val) {
      if ((root.css('width') === '0px' || root.css('height') === '0px') || val !== flowplayer.defaults.ratio) {
         if (!parseInt(origRatio, 10)) ratio.css("paddingTop", val * 100 + "%");
      }
      if (!support.inlineBlock) $("object", root).height(root.height());
   }

   function hover(flag) {
      root.toggleClass("is-mouseover", flag).toggleClass("is-mouseout", !flag);
   }

   // loading...
   if (!support.animation) waiting.html("<p>loading &hellip;</p>");

   setRatio(conf.ratio);

   // no fullscreen in IFRAME
   try {
      if (!conf.fullscreen) fullscreen.remove();

   } catch (e) {
      fullscreen.remove();
   }


   api.bind("ready", function() {

      var duration = api.video.duration;

      timelineApi.disable(api.disabled || !duration);

      conf.adaptiveRatio && setRatio(api.video.height / api.video.width);

      // initial time & volume
      durationEl.add(remaining).html(format(duration));

      // do we need additional space for showing hour
      ((duration >= 3600) && root.addClass('is-long')) || root.removeClass('is-long');
      volumeApi.slide(api.volumeLevel);


   }).bind("unload", function() {
      if (!origRatio) ratio.css("paddingTop", "");

   // buffer
   }).bind("buffer", function() {
      var video = api.video,
         max = video.buffer / video.duration;

      if (!video.seekable && support.seekable) timelineApi.max(max);
      if (max < 1) buffer.css("width", (max * 100) + "%");
      else buffer.css({ width: '100%' });

   }).bind("speed", function(e, api, val) {
      speed.text(val + "x").addClass("fp-hilite");
      setTimeout(function() { speed.removeClass("fp-hilite") }, 1000);

   }).bind("buffered", function() {
      buffer.css({ width: '100%' });
      timelineApi.max(1);

   // progress
   }).bind("progress", function() {

      var time = api.video.time,
         duration = api.video.duration;

      if (!timelineApi.dragging) {
         timelineApi.slide(time / duration, api.seeking ? 0 : 250);
      }

      elapsed.html(format(time));
      remaining.html("-" + format(duration - time));

   }).bind("finish resume seek", function(e) {
      root.toggleClass("is-finished", e.type == "finish");

   }).bind("stop", function() {
      elapsed.html(format(0));
      timelineApi.slide(0, 100);

   }).bind("finish", function() {
      elapsed.html(format(api.video.duration));
      timelineApi.slide(1, 100);
      root.removeClass("is-seeking");

   // misc
   }).bind("beforeseek", function() {
      progress.stop();

   }).bind("volume", function() {
      volumeApi.slide(api.volumeLevel);


   }).bind("disable", function() {
      var flag = api.disabled;
      timelineApi.disable(flag);
      volumeApi.disable(flag);
      root.toggleClass("is-disabled", api.disabled);

   }).bind("mute", function(e, api, flag) {
      root.toggleClass("is-muted", flag);

   }).bind("error", function(e, api, error) {
      root.removeClass("is-loading").addClass("is-error");

      if (error) {
         error.message = conf.errors[error.code];
         api.error = true;

         var el = $(".fp-message", root);
         $("h2", el).text((api.engine || 'html5') + ": " + error.message);
         $("p", el).text(error.url || api.video.url || api.video.src || conf.errorUrls[error.code]);
         root.unbind("mouseenter click").removeClass("is-mouseover");
      }


   // hover
   }).bind("mouseenter mouseleave", function(e) {
      if (noToggle) return;

      var is_over = e.type == "mouseenter",
         lastMove;

      // is-mouseover/out
      hover(is_over);

      if (is_over) {

         root.bind("pause.x mousemove.x volume.x", function() {
            hover(true);
            lastMove = new Date;
         });

         hovertimer = setInterval(function() {
            if (new Date - lastMove > 5000) {
               hover(false)
               lastMove = new Date;
            }
         }, 100);

      } else {
         root.unbind(".x");
         clearInterval(hovertimer);
      }


   // allow dragging over the player edge
   }).bind("mouseleave", function() {

      if (timelineApi.dragging || volumeApi.dragging) {
         root.addClass("is-mouseover").removeClass("is-mouseout");
      }

   // click
   }).bind("click.player", function(e) {
      if ($(e.target).is(".fp-ui, .fp-engine") || e.flash) {
         e.preventDefault();
         return api.toggle();
      }
   }).bind('contextmenu', function(ev) {
      ev.preventDefault();
      var o = root.offset(),
          w = $(window),
          left = ev.clientX - o.left,
          t = ev.clientY - o.top + w.scrollTop();
      var menu = root.find('.fp-context-menu').css({
         left: left + 'px',
         top: t + 'px',
         display: 'block'
      }).on('click', function(ev) {
         ev.stopPropagation();
      });
      $('html').on('click.outsidemenu', function(ev) {
         menu.hide();
         $('html').off('click.outsidemenu');
      });
   });

   // poster -> background image
   if (conf.poster) root.css("backgroundImage", "url(" + conf.poster + ")");

   var bc = root.css("backgroundColor"),
      has_bg = root.css("backgroundImage") != "none" || bc && bc != "rgba(0, 0, 0, 0)" && bc != "transparent";

   // is-poster class
   if (has_bg && !conf.splash && !conf.autoplay) {

      api.bind("ready stop", function() {
         root.addClass("is-poster").one("progress", function() {
            root.removeClass("is-poster");
         });
      });

   }

   // default background color if not present
   if (!has_bg && api.forcedSplash) {
      root.css("backgroundColor", "#555");
   }

   $(".fp-toggle, .fp-play", root).click(api.toggle);

   /* controlbar elements */
   $.each(['mute', 'fullscreen', 'unload'], function(i, key) {
      find(key).click(function() {
         api[key]();
      });
   });

   timeline.bind("slide", function(e, val) {
      api.seeking = true;
      api.seek(val * api.video.duration);
   });

   volumeSlider.bind("slide", function(e, val) {
      api.volume(val);
   });

   // times
   find("time").click(function(e) {
      $(this).toggleClass("is-inverted");
   });

   hover(noToggle);

});

var focused,
   focusedRoot,
   IS_HELP = "is-help";

 // keyboard. single global listener
$(document).bind("keydown.fp", function(e) {

   var el = focused,
      metaKeyPressed = e.ctrlKey || e.metaKey || e.altKey,
      key = e.which,
      conf = el && el.conf;

   if (!el || !conf.keyboard || el.disabled) return;

   // help dialog (shift key not truly required)
   if ($.inArray(key, [63, 187, 191]) != -1) {
      focusedRoot.toggleClass(IS_HELP);
      return false;
   }

   // close help / unload
   if (key == 27 && focusedRoot.hasClass(IS_HELP)) {
      focusedRoot.toggleClass(IS_HELP);
      return false;
   }

   if (!metaKeyPressed && el.ready) {

      e.preventDefault();

      // slow motion / fast forward
      if (e.shiftKey) {
         if (key == 39) el.speed(true);
         else if (key == 37) el.speed(false);
         return;
      }

      // 1, 2, 3, 4 ..
      if (key < 58 && key > 47) return el.seekTo(key - 48);

      switch (key) {
         case 38: case 75: el.volume(el.volumeLevel + 0.15); break;        // volume up
         case 40: case 74: el.volume(el.volumeLevel - 0.15); break;        // volume down
         case 39: case 76: el.seeking = true; el.seek(true); break;        // forward
         case 37: case 72: el.seeking = true; el.seek(false); break;       // backward
         case 190: el.seekTo(); break;                                     // to last seek position
         case 32: el.toggle(); break;                                      // spacebar
         case 70: conf.fullscreen && el.fullscreen(); break;               // toggle fullscreen
         case 77: el.mute(); break;                                        // mute
         case 81: el.unload(); break;                                      // unload/stop
      }

   }

});

flowplayer(function(api, root) {

   // no keyboard configured
   if (!api.conf.keyboard) return;

   // hover
   root.bind("mouseenter mouseleave", function(e) {
      focused = !api.disabled && e.type == 'mouseenter' ? api : 0;
      if (focused) focusedRoot = root;
   });

   // TODO: add to player-layout.html
   root.append('\
      <div class="fp-help">\
         <a class="fp-close"></a>\
         <div class="fp-help-section fp-help-basics">\
            <p><em>space</em>play / pause</p>\
            <p><em>q</em>unload | stop</p>\
            <p><em>f</em>fullscreen</p>\
            <p><em>shift</em> + <em>&#8592;</em><em>&#8594;</em>slower / faster <small>(latest Chrome and Safari)</small></p>\
         </div>\
         <div class="fp-help-section">\
            <p><em>&#8593;</em><em>&#8595;</em>volume</p>\
            <p><em>m</em>mute</p>\
         </div>\
         <div class="fp-help-section">\
            <p><em>&#8592;</em><em>&#8594;</em>seek</p>\
            <p><em>&nbsp;. </em>seek to previous\
            </p><p><em>1</em><em>2</em>&hellip;<em>6</em> seek to 10%, 20%, &hellip;60% </p>\
         </div>\
      </div>\
   ');

   if (api.conf.tooltip) {
      $(".fp-ui", root).attr("title", "Hit ? for help").on("mouseout.tip", function() {
         $(this).removeAttr("title").off("mouseout.tip");
      });
   }

   $(".fp-close", root).click(function() {
      root.toggleClass(IS_HELP);
   });

});

var VENDOR = $.browser.mozilla ? "moz": "webkit",
   FS_ENTER = "fullscreen",
   FS_EXIT = "fullscreen-exit",
   FULL_PLAYER,
   FS_SUPPORT = flowplayer.support.fullscreen,
   FS_NATIVE_SUPPORT = typeof document.exitFullscreen == 'function',
   ua = navigator.userAgent.toLowerCase(),
   IS_SAFARI = /(safari)[ \/]([\w.]+)/.exec(ua) && !/(chrome)[ \/]([\w.]+)/.exec(ua);


// esc button
$(document).bind(FS_NATIVE_SUPPORT ? "fullscreenchange" : VENDOR + "fullscreenchange", function(e) {
   var el = $(document.webkitCurrentFullScreenElement || document.mozFullScreenElement || document.fullscreenElement || e.target);
   if (el.length && !FULL_PLAYER) {
      FULL_PLAYER = el.trigger(FS_ENTER, [el]);
   } else {
      FULL_PLAYER.trigger(FS_EXIT, [FULL_PLAYER]);
      FULL_PLAYER = null;
   }

});


flowplayer(function(player, root) {

   if (!player.conf.fullscreen) return;

   var win = $(window),
      fsResume = {index: 0, pos: 0, play: false},
      scrollTop;

   player.isFullscreen = false;

   player.fullscreen = function(flag) {

      if (player.disabled) return;

      if (flag === undefined) flag = !player.isFullscreen;

      if (flag) scrollTop = win.scrollTop();

      if ((VENDOR == "webkit" || IS_SAFARI) && player.engine == "flash") {
         // play current index on fullscreen toggle
         fsResume.index = player.video.index;
         if (player.conf.rtmp)
            // avoid restart
            $.extend(fsResume, {pos: player.video.time, play: player.playing});
      }

      if (FS_SUPPORT) {

         if (flag) {
            if (FS_NATIVE_SUPPORT) {
               root[0].requestFullscreen();
            } else {
               root[0][VENDOR + 'RequestFullScreen'](Element.ALLOW_KEYBOARD_INPUT);
               if (IS_SAFARI && !document.webkitCurrentFullScreenElement && !document.mozFullScreenElement) { // Element.ALLOW_KEYBOARD_INPUT not allowed
                  root[0][VENDOR + 'RequestFullScreen']();
               }
            }

         } else {
            if (FS_NATIVE_SUPPORT) {
              document.exitFullscreen();
            } else {
              document[VENDOR + 'CancelFullScreen']();
            }
         }

      } else {
         player.trigger(flag ? FS_ENTER : FS_EXIT, [player]);
      }

      return player;
   };

   var lastClick;

   root.bind("mousedown.fs", function() {
      if (+new Date - lastClick < 150 && player.ready) player.fullscreen();
      lastClick = +new Date;
   });

   player.bind(FS_ENTER, function(e) {
      root.addClass("is-fullscreen");
      player.isFullscreen = true;

   }).bind(FS_EXIT, function(e) {
      root.removeClass("is-fullscreen");
      player.isFullscreen = false;
      win.scrollTop(scrollTop);

   }).bind("ready", function () {
      if (fsResume.index > 0) {
          player.play(fsResume.index);
          // above loads "different" clip, resume position below
          fsResume.index = 0;
      } else if (fsResume.pos && !isNaN(fsResume.pos)) {
         player.resume().seek(fsResume.pos, function () {
            if (!fsResume.play)
               player.pause();
            $.extend(fsResume, {pos: 0, play: false});
         });
      }
   });

});


flowplayer(function(player, root) {

   var conf = $.extend({ active: 'is-active', advance: true, query: ".fp-playlist a" }, player.conf),
      klass = conf.active;

   // getters
   function els() {
      return $(conf.query, root);
   }

   function active() {
      return $(conf.query + "." + klass, root);
   }


   player.play = function(i) {
      if (i === undefined) return player.resume();
      if (typeof i === 'number' && !player.conf.playlist[i]) return player;
      else if (typeof i != 'number') player.load.apply(null, arguments);
      player.unbind('resume.fromfirst'); // Don't start from beginning if clip explicitely chosen
      player.video.index = i;
      player.load(typeof player.conf.playlist[i] === 'string' ?
         player.conf.playlist[i].toString() :
         $.map(player.conf.playlist[i], function(item) { return $.extend({}, item); })
      );
      return player;
   };

   player.next = function(e) {
      e && e.preventDefault();
      var current = player.video.index;
      if (current != -1) {
         current = current === player.conf.playlist.length - 1 ? 0 : current + 1;
         player.play(current);
      }
      return player;
   };

   player.prev = function(e) {
      e && e.preventDefault();
      var current = player.video.index;
      if (current != -1) {
         current = current === 0 ? player.conf.playlist.length - 1 : current - 1;
         player.play(current);
      }
      return player;
   };

   $('.fp-next', root).click(player.next);
   $('.fp-prev', root).click(player.prev);

   if (conf.advance) {
      root.unbind("finish.pl").bind("finish.pl", function(e, player) {

         // next clip is found or loop
         var next = player.video.index + 1;
         if (next < player.conf.playlist.length || conf.loop) {
            next = next === player.conf.playlist.length ? 0 : next;
            root.removeClass('is-finished');
            setTimeout(function() { // Let other finish callbacks fire first
               player.play(next);
            });

         // stop to last clip, play button starts from 1:st clip
         } else {
            root.addClass("is-playing"); // show play button

            // If we have multiple items in playlist, start from first
            if (player.conf.playlist.length > 1) player.one("resume.fromfirst", function() {
               player.play(0);
               return false;
            });
         }
      });
   }

   var playlistInitialized = false;
   if (player.conf.playlist.length) { // playlist configured by javascript, generate playlist
      playlistInitialized = true;
      var plEl = root.find('.fp-playlist');
      if (!plEl.length) {
         plEl = $('<div class="fp-playlist"></div>');
         var cntrls = $('.fp-next,.fp-prev', root);
         if (!cntrls.length) $('video', root).after(plEl);
         else cntrls.eq(0).before(plEl);
      }
      plEl.empty();
      $.each(player.conf.playlist, function(i, item) {
         var href;
         if (typeof item === 'string') {
            href = item;
         } else {
            for (var key in item[0]) {
               if (item[0].hasOwnProperty(key)) {
                  href = item[0][key];
                  break;
               }
            }
         }
         plEl.append($('<a />').attr({
            href: href,
            'data-index': i
         }));
      });
   }

   if (els().length) {
      if (!playlistInitialized) {
         player.conf.playlist = [];
         els().each(function() {
            var src = $(this).attr('href');
            $(this).attr('data-index', player.conf.playlist.length);
            player.conf.playlist.push(src);
         });
      }

      /* click -> play */
      root.on("click", conf.query, function(e) {
         e.preventDefault();
         var el = $(e.target).closest(conf.query);
         var toPlay = Number(el.attr('data-index'));
         if (toPlay != -1) {
            player.play(toPlay);
         }
      });

      // playlist wide cuepoint support
      var has_cuepoints = els().filter("[data-cuepoints]").length;

      // highlight
      player.bind("load", function(e, api, video) {
         var prev = active().removeClass(klass),
            prevIndex = prev.attr('data-index'),
            index = video.index = player.video.index || 0,
            el = $('a[data-index="' + index + '"]', root).addClass(klass),
            is_last = index == player.conf.playlist.length - 1;
         // index
         root.removeClass("video" + prevIndex).addClass("video" + index).toggleClass("last-video", is_last);

         // video properties
         video.index = api.video.index = index;
         video.is_last = api.video.is_last = is_last;

         // cuepoints
         if (has_cuepoints) player.cuepoints = el.data("cuepoints");


      // without namespace callback called only once. unknown rason.
      }).bind("unload.pl", function() {
         active().toggleClass(klass);

      });

   }

   if (player.conf.playlist.length) {
      // disable single clip looping
      player.conf.loop = false;
   }


});

var CUE_RE = / ?cue\d+ ?/;

flowplayer(function(player, root) {

   var lastTime = 0;

   player.cuepoints = player.conf.cuepoints || [];

   function setClass(index) {
      root[0].className = root[0].className.replace(CUE_RE, " ");
      if (index >= 0) root.addClass("cue" + index);
   }

   player.bind("progress", function(e, api, time) {

      // avoid throwing multiple times
      if (lastTime && time - lastTime < 0.015) return lastTime = time;
      lastTime = time;

      var cues = player.cuepoints || [];

      for (var i = 0, cue; i < cues.length; i++) {

         cue = cues[i];
         if (!isNaN(cue)) cue = { time: cue };
         if (cue.time < 0) cue.time = player.video.duration + cue.time;
         cue.index = i;

         // progress_interval / 2 = 0.125
         if (Math.abs(cue.time - time) < 0.125 * player.currentSpeed) {
            setClass(i);
            root.trigger("cuepoint", [player, cue]);
         }

      }

   // no CSS class name
   }).bind("unload seek", setClass);

   if (player.conf.generate_cuepoints) {

      player.bind("load", function() {

         // clean up cuepoint elements of previous playlist items
         $(".fp-cuepoint", root).remove();

      }).bind("ready", function() {

         var cues = player.cuepoints || [],
            duration = player.video.duration,
            timeline = $(".fp-timeline", root).css("overflow", "visible");

         $.each(cues, function(i, cue) {

            var time = cue.time || cue;
            if (time < 0) time = duration + cue;

            var el = $("<a/>").addClass("fp-cuepoint fp-cuepoint" + i)
               .css("left", (time / duration * 100) + "%");

            el.appendTo(timeline).mousedown(function() {
               player.seek(time);

               // preventDefault() doesn't work
               return false;
            });

         });

      });

   }

});
flowplayer(function(player, root, engine) {

   var track = $("track", root),
      conf = player.conf;

   if (flowplayer.support.subtitles) {

      player.subtitles = track.length && track[0].track;

      // use native when supported
      if (conf.nativesubtitles && conf.engine == 'html5') return;
   }

   // avoid duplicate loads
   track.remove();

   var TIMECODE_RE = /^(([0-9]{2}:)?[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3}) --\> (([0-9]{2}:)?[0-9]{2}:[0-9]{2}[,.]{1}[0-9]{3})(.*)/;

   function seconds(timecode) {
      var els = timecode.split(':');
      if (els.length == 2) els.unshift(0);
      return els[0] * 60 * 60 + els[1] * 60 + parseFloat(els[2].replace(',','.'));
   }

   player.subtitles = [];

   var url = track.attr("src");

   if (!url) return;
   setTimeout(function() {
      $.get(url, function(txt) {

         for (var i = 0, lines = txt.split("\n"), len = lines.length, entry = {}, title, timecode, text, cue; i < len; i++) {

            timecode = TIMECODE_RE.exec(lines[i]);

            if (timecode) {

               // title
               title = lines[i - 1];

               // text
               text = "<p>" + lines[++i] + "</p><br/>";
               while ($.trim(lines[++i]) && i < lines.length) text +=  "<p>" + lines[i] + "</p><br/>";

               // entry
               entry = {
                  title: title,
                  startTime: seconds(timecode[1]),
                  endTime: seconds(timecode[2] || timecode[3]),
                  text: text
               };

               cue = { time: entry.startTime, subtitle: entry };

               player.subtitles.push(entry);
               player.cuepoints.push(cue);
               player.cuepoints.push({ time: entry.endTime, subtitleEnd: title });

               // initial cuepoint
               if (entry.startTime === 0) {
                  player.trigger("cuepoint", cue);
               }

            }

         }

      }).fail(function() {
         player.trigger("error", {code: 8, url: url });
         return false;
      });
   });
   var wrap = $("<div class='fp-subtitle'/>").appendTo(root),
      currentPoint;

   player.bind("cuepoint", function(e, api, cue) {

      if (cue.subtitle) {
         currentPoint = cue.index;
         wrap.html(cue.subtitle.text).addClass("fp-active");

      } else if (cue.subtitleEnd) {
         wrap.removeClass("fp-active");
         currentPoint = cue.index;
      }

   }).bind("seek", function(e, api, time) {
      // Clear future subtitles if seeking backwards
      if (currentPoint && player.cuepoints[currentPoint] && player.cuepoints[currentPoint].time > time) {
         wrap.removeClass('fp-active');
         currentPoint = null;
      }
      $.each(player.cuepoints || [], function(i, cue) {
         var entry = cue.subtitle;
         //Trigger cuepoint if start time before seek position and end time nonexistent or in the future
         if (entry && currentPoint != cue.index) {
            if (time >= cue.time && (!entry.endTime || time <= entry.endTime)) player.trigger("cuepoint", cue);
         } // Also handle cuepoints that act as the removal trigger
         else if (cue.subtitleEnd && time >= cue.time && cue.index == currentPoint + 1) player.trigger("cuepoint", cue);
      });

   });

});



flowplayer(function(player, root) {

   var id = player.conf.analytics, time = 0, last = 0;

   if (id) {

      // load Analytics script if needed
      if (typeof _gat == 'undefined') $.getScript("//google-analytics.com/ga.js");

      function track(e) {

         if (time && typeof _gat != 'undefined') {
            var tracker = _gat._getTracker(id),
               video = player.video;

            tracker._setAllowLinker(true);

            // http://code.google.com/apis/analytics/docs/tracking/eventTrackerGuide.html
            tracker._trackEvent(
               "Video / Seconds played",
               player.engine + "/" + video.type,
               root.attr("title") || video.src.split("/").slice(-1)[0].replace(TYPE_RE, ''),
               Math.round(time / 1000)
            );
            time = 0;
         }

      }

      player.bind("load unload", track).bind("progress", function() {

         if (!player.seeking) {
            time += last ? (+new Date - last) : 0;
            last = +new Date;
         }

      }).bind("pause", function() {
         last = 0;
      });

      $(window).unload(track);

   }

});var isIeMobile = /IEMobile/.test(UA);
if (flowplayer.support.touch || isIeMobile) {

   flowplayer(function(player, root) {
      var isAndroid = /Android/.test(UA) && !/Firefox/.test(UA) && !/Opera/.test(UA),
          isSilk = /Silk/.test(UA),
          androidVer = isAndroid ? parseFloat(/Android\ (\d\.\d)/.exec(UA)[1], 10) : 0;

      // custom load for android
      if (isAndroid) {
         player.conf.videoTypePreference = "mp4"; // Android has problems with webm aspect ratio
         if (!/Chrome/.test(UA) && androidVer < 4) {
            var originalLoad = player.load;
            player.load = function(video, callback) {
               var ret = originalLoad.apply(player, arguments);
               player.trigger('ready', player, player.video);
               return ret;
            };
         }
      }

      // hide volume
      if (!flowplayer.support.volume) {
         root.addClass("no-volume no-mute");
      }
      root.addClass("is-touch");
      root.find('.fp-timeline').data('api').disableAnimation();

      // fake mouseover effect with click
      var hasMoved = false;
      root.bind('touchmove', function() {
         hasMoved = true;
      }).bind("touchend click", function(e) {
         if (hasMoved) { //not intentional, most likely scrolling
            hasMoved = false;
            return;
         }

         if (player.playing && !root.hasClass("is-mouseover")) {
            root.addClass("is-mouseover").removeClass("is-mouseout");
            return false;
         }

         if (player.paused && root.hasClass("is-mouseout") && !player.splash) {
            player.toggle();
         }

         if (player.paused && isIeMobile) { // IE on WP7 need an additional api.play() call
            $('video.fp-engine', root)[0].play();
         }

      });

      // native fullscreen
      if (player.conf.native_fullscreen && typeof $('<video />')[0].webkitEnterFullScreen === 'function') {
         player.fullscreen = function() {
            var video = $('video.fp-engine', root);
            video[0].webkitEnterFullScreen();
            video.one('webkitendfullscreen', function() {
               video.prop('controls', true).prop('controls', false);
            });
         };
      }


      // Android browser gives video.duration == 1 until second 'timeupdate' event
      (isAndroid || isSilk) && player.bind("ready", function() {

         var video = $('video.fp-engine', root);
         video.one('canplay', function() {
            video[0].play();
         });
         video[0].play();

         player.bind("progress.dur", function() {

            var duration = video[0].duration;

            if (duration !== 1) {
               player.video.duration = duration;
               $(".fp-duration", root).html(format(duration));
               player.unbind("progress.dur");
            }
         });
      });


   });

}

flowplayer(function(player, root) {

   // no embedding
   if (player.conf.embed === false) return;

   var conf = player.conf,
      ui = $(".fp-ui", root),
      trigger = $("<a/>", { "class": "fp-embed", title: 'Copy to your site'}).appendTo(ui),
      target = $("<div/>", { 'class': 'fp-embed-code'})
         .append("<label>Paste this HTML code on your site to embed.</label><textarea/>").appendTo(ui),
      area = $("textarea", target);

   player.embedCode = function() {

      var video = player.video,
         width = video.width || root.width(),
         height = video.height || root.height(),
         el = $("<div/>", { 'class': 'flowplayer', css: { width: width, height: height }}),
         tag = $("<video/>").appendTo(el);

      // configuration
      $.each(['origin', 'analytics', 'key', 'rtmp'], function(i, key) {
         if (conf[key]) el.attr("data-" + key, conf[key]);
      });

      //logo
      if (conf.logo) {
         el.attr('data-logo', $('<img />').attr('src', conf.logo)[0].src);
      }

      // sources
      $.each(video.sources, function(i, src) {
         var path = src.src;
         if (!/^https?:/.test(src.src) && src.type !== 'flash' || !conf.rtmp) {
            path = $("<img/>").attr("src", src.src)[0].src;
         }
         tag.append($("<source/>", { type: "video/" + src.type, src: path }));
      });

      var scriptAttrs = { src: "//embed.flowplayer.org/5.4.4/embed.min.js" };
      if ($.isPlainObject(conf.embed)) {
         scriptAttrs['data-swf'] = conf.embed.swf;
         scriptAttrs['data-library'] = conf.embed.library;
         scriptAttrs['src'] = conf.embed.script || scriptAttrs['src'];
         if (conf.embed.skin) { scriptAttrs['data-skin'] = conf.embed.skin; }
      }

      var code = $("<foo/>", scriptAttrs).append(el);
      return $("<p/>").append(code).html().replace(/<(\/?)foo/g, "<$1script");
   };

   root.fptip(".fp-embed", "is-embedding");

   area.click(function() {
      this.select();
   });

   trigger.click(function() {
      area.text(player.embedCode());
      area[0].focus();
      area[0].select();
   });

});


$.fn.fptip = function(trigger, active) {

   return this.each(function() {

      var root = $(this);

      function close() {
         root.removeClass(active);
         $(document).unbind(".st");
      }

      $(trigger || "a", this).click(function(e) {

         e.preventDefault();

         root.toggleClass(active);

         if (root.hasClass(active)) {

            $(document).bind("keydown.st", function(e) {
               if (e.which == 27) close();

            // click:close
            }).bind("click.st", function(e) {
               if (!$(e.target).parents("." + active).length) close();
            });
         }

      });

   });

};

}(jQuery);
flowplayer(function(e,o){function l(e){var o=a("<a/>")[0];return o.href=e,o.hostname}var a=jQuery,r=e.conf,i=r.swf.indexOf("flowplayer.org")&&r.e&&o.data("origin"),n=i?l(i):location.hostname,t=r.key;if("file:"==location.protocol&&(n="localhost"),e.load.ed=1,r.hostname=n,r.origin=i||location.href,i&&o.addClass("is-embedded"),"string"==typeof t&&(t=t.split(/,\s*/)),t&&"function"==typeof key_check&&key_check(t,n))r.logo&&o.append(a("<a>",{"class":"fp-logo",href:i}).append(a("<img/>",{src:r.logo})));else{var s=a("<a/>").attr("href","http://flowplayer.org").appendTo(o);a(".fp-controls",o);var p=a('<div class="fp-context-menu"><ul><li class="copyright">&copy; 2013</li><li><a href="http://flowplayer.org">About Flowplayer</a></li><li><a href="http://flowplayer.org/license">GPL based license</a></li></ul></div>').appendTo(o);e.bind("pause resume finish unload",function(e,l){var r=-1;l.video.src&&a.each([["org","flowplayer","drive"],["org","flowplayer","my"]],function(e,o){return r=l.video.src.indexOf("://"+o.reverse().join(".")),-1===r}),/pause|resume/.test(e.type)&&"flash"!=l.engine&&4!=r&&5!=r?(s.show().css({position:"absolute",left:16,bottom:36,zIndex:99999,width:100,height:20,backgroundImage:"url("+[".png","logo","/",".net",".cloudfront","d32wqyuo10o653","//"].reverse().join("")+")"}),l.load.ed=s.is(":visible")&&a.contains(o[0],p[0]),l.load.ed||l.pause()):s.hide()})}});