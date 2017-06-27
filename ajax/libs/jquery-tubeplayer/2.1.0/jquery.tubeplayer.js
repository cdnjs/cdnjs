/*! jQuery TubePlayer - Simplified YouTube Player Management - v2.1.0 - 2016-12-02
* https://github.com/nirvanatikku/jQuery-TubePlayer-Plugin
* Copyright (c) 2016 Nirvana Tikku; Licensed MIT */
(function($) {
    'use strict';
    //
    //  namespace
    var TUBEPLAYER = ".tubeplayer",
        TUBEPLAYER_CLASS = "jquery-youtube-tubeplayer",
        OPTS = "opts" + TUBEPLAYER;

    //  
    // TubePlayer package 
    var TP = {
        inited: false,              // tubeplayer inited flag - for destroy/re-init
        ytplayers: {},              // all the instances that exist
        inits: [],                  // local init functions for multiple iframe players
        iframeScriptInited: false,  // no need to import the iframe script multiple times
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
    // public facing defaults
    $.tubeplayer = {
        TubePlayer: TP          // reference to the internal TubePlayer object. primarily exposed for testing.
    };

    /**
     * These are all the events that are bound to the YouTube Player
     * the events can be overridden as they are public.
     *
     * There are several functions that serve as wrappers to be utilized
     * internally - stateChange, onError, qualityChange, rateChange. 
     * Change them at your own risk.
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
                    case TP.Error.CANT_PLAY:
                        return _ret.invalidParameter[player].call(_player);
                    case TP.Error.NOT_FOUND:
                        return _ret.notFound[player].call(_player);
                    case TP.Error.NOT_EMBEDDABLE:
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
        rateChange: function(player){
            var _this = this;
            return function(suggested) {
                var _player = $('#'+player).parent();
                if (typeof(suggested) === "object") {
                    suggested = suggested.data;
                }
                return _this.onRateChange[player].call(_player, suggested);
            };
        },
        onQualityChange: {},
        onRateChange: {},
        onPlayer: {
            unstarted: {},
            ended: {},
            playing: {},
            paused: {},
            buffering: {},
            cued: {},
            loaded: {}
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
    $.tubeplayer.defaults.settings = {

        // public facing
        width: 480,
        height: 270,
        allowFullScreen: "true",
        initialVideo: "DkoeNLuMbcI",
        start: 0,
        preferredQuality: "default",
        controls: 1,
        showRelated: false,
        playsinline: false,
        annotations: true,
        autoPlay: false,
        loop: 0,
        color: 'red', // 'red' or 'white'
        showinfo: false,
        modestbranding: true,
        protocol: window.location.protocol == "https:" ? "https" : "http", // set to 'https' for compatibility on SSL-enabled pages
        allowScriptAccess: "always",
        playerID: "tubeplayer-player-container",

        // functions called when events are triggered by using the tubeplayer interface
        onPlay: function() {}, // arg: id
        onPause: function() {},
        onStop: function() {},
        onSeek: function() {}, // arg: time
        onMute: function() {},
        onUnMute: function() {},

        // functions called when events are triggered from the youtube player itself
        onPlayerLoaded: function(){},
        onPlayerUnstarted: function() {},
        onPlayerEnded: function() {},
        onPlayerPlaying: function() {},
        onPlayerPaused: function() {},
        onPlayerBuffering: function() {},
        onPlayerCued: function() {},
        onQualityChange: function() {},
        onRateChange: function() {},

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
                $this = $(this);
                // check if the current element is an iframe and if so replace it with a div
                // Mihai Ionut Vilcu - 26/Oct/2013
                if($this.prop('tagName') == "IFRAME") {
                    // make sure we have a valid YT url
                    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                    var match = $this.attr('src').match(regExp);
                    if (match&&match[7].length==11) { // we have the id
                        var settings = {initialVideo : match[7]},
                            class_name = $this.attr('class'),
                            ids = $this.attr('id');
                        // check for extra settings
                        if($this.attr('width')) {
                            settings.width = $this.attr('width');
                        }
                        if($this.attr('height')) {
                            settings.height = $this.attr('height');
                        }
                        if($this.attr('allowfullscreen') !== undefined) {
                            settings.allowFullScreen = "true";
                        }
                        else {
                            settings.allowFullScreen = false;
                        }
                        var newDiv = $("<div></div>").attr({
                            'class' : class_name ? class_name : '',
                            'id' : ids ? ids : ''
                        });
                        $this.replaceWith(newDiv);
                        var new_input = $.extend({}, $.tubeplayer.defaults.settings, settings, input);
                        TP.init(newDiv, new_input);
                    }
                } else {
                    TP.init($(this), input);
                }
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
     *  First check to see if TubePlayer has been init'd
     *  if it has then return, otherwise:
     *      > add the tubeplayer class (used to denote a player)
     *      > provide local data access to the options and store it
     *      > initialize the default events on the jQuery instance
     *      > create the container for the player
     *      > initialize the player (iframe/HTML5 based)
     *
     *  @param $player - the instance being created on
     *  @param opts - the user's options
     */
    TP.init = function($player, opts) {
        if ($player.hasClass(TUBEPLAYER_CLASS)) {
            return $player;
        }
        var o = $.extend({}, $.tubeplayer.defaults.settings, opts);
        o.playerID += "-" + guid();
        $player.addClass(TUBEPLAYER_CLASS).data(OPTS, o);
        for (var event in PlayerEvents){
            $player.bind(event + TUBEPLAYER, $player, PlayerEvents[event]);
        }
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
                    'controls': (o.controls ? o.controls : 0),
                    'loop': (o.loop ? 1 : 0),
                    'playlist': (o.playlist ? o.playlist : 0),
                    'rel': (o.showRelated ? 1 : 0),
                    'fs': (o.allowFullScreen ? 1 : 0),
                    'showinfo': (o.showinfo ? 1 : 0),
                    'modestbranding': (o.modestbranding ? 1 : 0),
                    'iv_load_policy': (o.annotations ? 1 : 3),
                    'start': o.start,
                    'color': o.color,
                    'playsinline': o.playsinline,
                    'origin': window.location.origin
                },
                events: {
                    'onReady': function(evt) {
                        TP.ytplayers[o.playerID] = evt.target;
                        var $player = $(evt.target.getIframe()).parents("." + TUBEPLAYER_CLASS);
                        $player.tubeplayer('opts').onPlayerLoaded.call($player);
                        $.tubeplayer.defaults.afterReady($player);
                    },
                    'onPlaybackQualityChange': $.tubeplayer.defaults.qualityChange(o.playerID),
                    'onPlaybackRateChange': $.tubeplayer.defaults.rateChange(o.playerID),
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
        dp.loaded[ID] = o.onPlayerLoaded;

        // default onQualityChange
        d.onQualityChange[ID] = o.onQualityChange;
        d.onRateChange[ID] = o.onRateChange;

        // default onError events
        var de = d.onErr;
        de.defaultError[ID] = o.onError;
        de.notFound[ID] = o.onErrorNotFound;
        de.notEmbeddable[ID] = o.onErrorNotEmbeddable;
        de.invalidParameter[ID] = o.onErrorInvalidParameter;

    };

    /**
     * Init the iframe player
     * @param $player - the player that the tubeplayer binds to
     * @param o - the init options
     */
    TP.initPlayer = function($player, o) {
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
    var PlayerEvents = {
        opts: wrap_fn(function(evt,param,p){
            return p.opts;
        }),
        cue: wrap_fn(function(evt, param, p) {
            p.ytplayer.cueVideoById(param, 0, p.opts.preferredQuality);
        }),
        cuePlaylist: wrap_fn(function(evt, param, p){
            p.ytplayer.cuePlaylist(param.playlist, 
                param.index || 0, 
                param.startSeconds || 0, 
                p.opts.preferredQuality);
        }),
        play: wrap_fn(function(evt, param, p) {
            var videoId, startTime;
            if (typeof(param) === 'object') {
                videoId = param.id;
                startTime = param.time;
            }
            else if (typeof param !== 'undefined') {
                videoId = param;
                startTime = 0;
            }
            if(videoId){
                p.ytplayer.loadVideoById({
                    videoId: videoId, 
                    startSeconds: startTime,
                    suggestedQuality: p.opts.preferredQuality 
                });
            }
            else {
                p.ytplayer.playVideo();
            }
            p.opts.onPlay(param);
        }),
        playPlaylist: wrap_fn(function(evt, param, p){
            var playlist, playlistIndex, startTime;
            if (typeof(param) === 'object') {
                var isArray = param.length !== undefined;
                playlist = isArray ? param : param.playlist;
                startTime = isArray ? 0 : (param.time || 0);
                playlistIndex = isArray ? 0 : (param.index || 0);
            }
            else if (typeof param !== 'undefined') {
                playlist = param;
                startTime = 0;
                playlistIndex = 0;
            } 
            if(playlist){
                p.ytplayer.loadPlaylist(playlist, playlistIndex, 
                    startTime, 
                    p.opts.preferredQuality);
                p.opts.onPlay(param);
            }
        }),
        next: wrap_fn(function(evt, param, p){
            p.ytplayer.nextVideo();
        }),
        previous: wrap_fn(function(evt, param, p){
            p.ytplayer.previousVideo();
        }),
        playVideoAt: wrap_fn(function(evt, param, p){
            p.ytplayer.playVideoAt(param);
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
                return p.ytplayer.getVolume();
            }
        }),
        quality: wrap_fn(function(evt, param, p) {
            // param = ['small', 'medium', 'large', 'hd720', 'hd1080', 'highres', 'default']
            if (typeof param !== 'undefined') {
                p.ytplayer.setPlaybackQuality(param);
            }
            else {
                return p.ytplayer.getPlaybackQuality();
            }
        }),
        playbackRate: wrap_fn(function(evt, param, p){
            if(typeof param !== "undefined") {
                p.ytplayer.setPlaybackRate(param);
            }
            else {
                return p.ytplayer.getPlaybackRate();
            }
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
            ret.playlist = {
                videoIDs: P.getPlaylist(),
                currentIndex: P.getPlaylistIndex()
            };
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
            var events = ['unstarted', 'ended', 'playing', 'paused', 'buffering', 'cued', 'loaded'];
            $.each(events, function(i, event) {
                delete d.onPlayer[event][p.opts.playerID];
            });
            events = ['defaultError', 'notFound', 'notEmbeddable', 'invalidParameter'];
            $.each(events, function(i, event) {
                delete d.onErr[event][p.opts.playerID];
            });
            delete d.onQualityChange[p.opts.playerID];
            delete d.onRateChange[p.opts.playerID];
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