/*!
 * Name    : Video Worker (wrapper for Youtube, Vimeo and Local videos)
 * Version : 1.9.2
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */
;(function() {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Deferred
// thanks http://stackoverflow.com/questions/18096715/implement-deferred-object-without-using-jquery
function Deferred() {
    this._done = [];
    this._fail = [];
}
Deferred.prototype = {
    execute: function execute(list, args) {
        var i = list.length;
        args = Array.prototype.slice.call(args);
        while (i--) {
            list[i].apply(null, args);
        }
    },
    resolve: function resolve() {
        this.execute(this._done, arguments);
    },
    reject: function reject() {
        this.execute(this._fail, arguments);
    },
    done: function done(callback) {
        this._done.push(callback);
    },
    fail: function fail(callback) {
        this._fail.push(callback);
    }
};

// init events
function addEventListener(el, eventName, handler) {
    el.addEventListener(eventName, handler);
}

var ID = 0;
var YoutubeAPIadded = 0;
var VimeoAPIadded = 0;
var loadingYoutubePlayer = 0;
var loadingVimeoPlayer = 0;
var loadingYoutubeDeffer = new Deferred();
var loadingVimeoDeffer = new Deferred();

var VideoWorker = function () {
    function VideoWorker(url, options) {
        _classCallCheck(this, VideoWorker);

        var self = this;

        self.url = url;

        self.options_default = {
            autoplay: 1,
            loop: 1,
            mute: 1,
            volume: 0,
            controls: 0,

            // start / end video time in ms
            startTime: 0,
            endTime: 0
        };

        self.options = self.extend({}, self.options_default, options);

        // check URL
        self.videoID = self.parseURL(url);

        // init
        if (self.videoID) {
            self.ID = ID++;
            self.loadAPI();
            self.init();
        }
    }

    // Extend like jQuery.extend


    _createClass(VideoWorker, [{
        key: 'extend',
        value: function extend(out) {
            var _arguments = arguments;

            out = out || {};
            Object.keys(arguments).forEach(function (i) {
                if (!_arguments[i]) {
                    return;
                }
                Object.keys(_arguments[i]).forEach(function (key) {
                    out[key] = _arguments[i][key];
                });
            });
            return out;
        }
    }, {
        key: 'parseURL',
        value: function parseURL(url) {
            // parse youtube ID
            function getYoutubeID(ytUrl) {
                // eslint-disable-next-line no-useless-escape
                var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
                var match = ytUrl.match(regExp);
                return match && match[1].length === 11 ? match[1] : false;
            }

            // parse vimeo ID
            function getVimeoID(vmUrl) {
                // eslint-disable-next-line no-useless-escape
                var regExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
                var match = vmUrl.match(regExp);
                return match && match[3] ? match[3] : false;
            }

            // parse local string
            function getLocalVideos(locUrl) {
                // eslint-disable-next-line no-useless-escape
                var videoFormats = locUrl.split(/,(?=mp4\:|webm\:|ogv\:|ogg\:)/);
                var result = {};
                var ready = 0;
                videoFormats.forEach(function (val) {
                    // eslint-disable-next-line no-useless-escape
                    var match = val.match(/^(mp4|webm|ogv|ogg)\:(.*)/);
                    if (match && match[1] && match[2]) {
                        result[match[1] === 'ogv' ? 'ogg' : match[1]] = match[2];
                        ready = 1;
                    }
                });
                return ready ? result : false;
            }

            var Youtube = getYoutubeID(url);
            var Vimeo = getVimeoID(url);
            var Local = getLocalVideos(url);

            if (Youtube) {
                this.type = 'youtube';
                return Youtube;
            } else if (Vimeo) {
                this.type = 'vimeo';
                return Vimeo;
            } else if (Local) {
                this.type = 'local';
                return Local;
            }

            return false;
        }
    }, {
        key: 'isValid',
        value: function isValid() {
            return !!this.videoID;
        }

        // events

    }, {
        key: 'on',
        value: function on(name, callback) {
            this.userEventsList = this.userEventsList || [];

            // add new callback in events list
            (this.userEventsList[name] || (this.userEventsList[name] = [])).push(callback);
        }
    }, {
        key: 'off',
        value: function off(name, callback) {
            var _this = this;

            if (!this.userEventsList || !this.userEventsList[name]) {
                return;
            }

            if (!callback) {
                delete this.userEventsList[name];
            } else {
                this.userEventsList[name].forEach(function (val, key) {
                    if (val === callback) {
                        _this.userEventsList[name][key] = false;
                    }
                });
            }
        }
    }, {
        key: 'fire',
        value: function fire(name) {
            var _this2 = this;

            var args = [].slice.call(arguments, 1);
            if (this.userEventsList && typeof this.userEventsList[name] !== 'undefined') {
                this.userEventsList[name].forEach(function (val) {
                    // call with all arguments
                    if (val) {
                        val.apply(_this2, args);
                    }
                });
            }
        }
    }, {
        key: 'play',
        value: function play(start) {
            var self = this;
            if (!self.player) {
                return;
            }

            if (self.type === 'youtube' && self.player.playVideo) {
                if (typeof start !== 'undefined') {
                    self.player.seekTo(start || 0);
                }
                if (YT.PlayerState.PLAYING !== self.player.getPlayerState()) {
                    self.player.playVideo();
                }
            }

            if (self.type === 'vimeo') {
                if (typeof start !== 'undefined') {
                    self.player.setCurrentTime(start);
                }
                self.player.getPaused().then(function (paused) {
                    if (paused) {
                        self.player.play();
                    }
                });
            }

            if (self.type === 'local') {
                if (typeof start !== 'undefined') {
                    self.player.currentTime = start;
                }
                if (self.player.paused) {
                    self.player.play();
                }
            }
        }
    }, {
        key: 'pause',
        value: function pause() {
            var self = this;
            if (!self.player) {
                return;
            }

            if (self.type === 'youtube' && self.player.pauseVideo) {
                if (YT.PlayerState.PLAYING === self.player.getPlayerState()) {
                    self.player.pauseVideo();
                }
            }

            if (self.type === 'vimeo') {
                self.player.getPaused().then(function (paused) {
                    if (!paused) {
                        self.player.pause();
                    }
                });
            }

            if (self.type === 'local') {
                if (!self.player.paused) {
                    self.player.pause();
                }
            }
        }
    }, {
        key: 'getImageURL',
        value: function getImageURL(callback) {
            var self = this;

            if (self.videoImage) {
                callback(self.videoImage);
                return;
            }

            if (self.type === 'youtube') {
                var availableSizes = ['maxresdefault', 'sddefault', 'hqdefault', '0'];
                var step = 0;

                var tempImg = new Image();
                tempImg.onload = function () {
                    // if no thumbnail, youtube add their own image with width = 120px
                    if ((this.naturalWidth || this.width) !== 120 || step === availableSizes.length - 1) {
                        // ok
                        self.videoImage = 'https://img.youtube.com/vi/' + self.videoID + '/' + availableSizes[step] + '.jpg';
                        callback(self.videoImage);
                    } else {
                        // try another size
                        step++;
                        this.src = 'https://img.youtube.com/vi/' + self.videoID + '/' + availableSizes[step] + '.jpg';
                    }
                };
                tempImg.src = 'https://img.youtube.com/vi/' + self.videoID + '/' + availableSizes[step] + '.jpg';
            }

            if (self.type === 'vimeo') {
                var request = new XMLHttpRequest();
                request.open('GET', 'https://vimeo.com/api/v2/video/' + self.videoID + '.json', true);
                request.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status >= 200 && this.status < 400) {
                            // Success!
                            var response = JSON.parse(this.responseText);
                            self.videoImage = response[0].thumbnail_large;
                            callback(self.videoImage);
                        } else {
                            // Error :(
                        }
                    }
                };
                request.send();
                request = null;
            }
        }
    }, {
        key: 'getIframe',
        value: function getIframe(callback) {
            var self = this;

            // return generated iframe
            if (self.$iframe) {
                callback(self.$iframe);
                return;
            }

            // generate new iframe
            self.onAPIready(function () {
                var hiddenDiv = void 0;
                if (!self.$iframe) {
                    hiddenDiv = document.createElement('div');
                    hiddenDiv.style.display = 'none';
                }

                // Youtube
                if (self.type === 'youtube') {
                    self.playerOptions = {};
                    self.playerOptions.videoId = self.videoID;
                    self.playerOptions.playerVars = {
                        autohide: 1,
                        rel: 0,
                        autoplay: 0
                    };

                    // hide controls
                    if (!self.options.controls) {
                        self.playerOptions.playerVars.iv_load_policy = 3;
                        self.playerOptions.playerVars.modestbranding = 1;
                        self.playerOptions.playerVars.controls = 0;
                        self.playerOptions.playerVars.showinfo = 0;
                        self.playerOptions.playerVars.disablekb = 1;
                    }

                    // events
                    var ytStarted = void 0;
                    var ytProgressInterval = void 0;
                    self.playerOptions.events = {
                        onReady: function onReady(e) {
                            // mute
                            if (self.options.mute) {
                                e.target.mute();
                            } else if (self.options.volume) {
                                e.target.setVolume(self.options.volume);
                            }

                            // autoplay
                            if (self.options.autoplay) {
                                self.play(self.options.startTime);
                            }
                            self.fire('ready', e);
                        },
                        onStateChange: function onStateChange(e) {
                            // loop
                            if (self.options.loop && e.data === YT.PlayerState.ENDED) {
                                self.play(self.options.startTime);
                            }
                            if (!ytStarted && e.data === YT.PlayerState.PLAYING) {
                                ytStarted = 1;
                                self.fire('started', e);
                            }
                            if (e.data === YT.PlayerState.PLAYING) {
                                self.fire('play', e);
                            }
                            if (e.data === YT.PlayerState.PAUSED) {
                                self.fire('pause', e);
                            }
                            if (e.data === YT.PlayerState.ENDED) {
                                self.fire('end', e);
                            }

                            // check for end of video and play again or stop
                            if (self.options.endTime) {
                                if (e.data === YT.PlayerState.PLAYING) {
                                    ytProgressInterval = setInterval(function () {
                                        if (self.options.endTime && self.player.getCurrentTime() >= self.options.endTime) {
                                            if (self.options.loop) {
                                                self.play(self.options.startTime);
                                            } else {
                                                self.pause();
                                            }
                                        }
                                    }, 150);
                                } else {
                                    clearInterval(ytProgressInterval);
                                }
                            }
                        }
                    };

                    var firstInit = !self.$iframe;
                    if (firstInit) {
                        var div = document.createElement('div');
                        div.setAttribute('id', self.playerID);
                        hiddenDiv.appendChild(div);
                        document.body.appendChild(hiddenDiv);
                    }
                    self.player = self.player || new window.YT.Player(self.playerID, self.playerOptions);
                    if (firstInit) {
                        self.$iframe = document.getElementById(self.playerID);

                        // get video width and height
                        self.videoWidth = parseInt(self.$iframe.getAttribute('width'), 10) || 1280;
                        self.videoHeight = parseInt(self.$iframe.getAttribute('height'), 10) || 720;
                    }
                }

                // Vimeo
                if (self.type === 'vimeo') {
                    self.playerOptions = '';

                    self.playerOptions += 'player_id=' + self.playerID;
                    self.playerOptions += '&autopause=0';
                    self.playerOptions += '&transparent=0';

                    // hide controls
                    if (!self.options.controls) {
                        self.playerOptions += '&badge=0&byline=0&portrait=0&title=0';
                    }

                    // autoplay
                    self.playerOptions += '&autoplay=' + (self.options.autoplay ? '1' : '0');

                    // loop
                    self.playerOptions += '&loop=' + (self.options.loop ? 1 : 0);

                    if (!self.$iframe) {
                        self.$iframe = document.createElement('iframe');
                        self.$iframe.setAttribute('id', self.playerID);
                        self.$iframe.setAttribute('src', 'https://player.vimeo.com/video/' + self.videoID + '?' + self.playerOptions);
                        self.$iframe.setAttribute('frameborder', '0');
                        hiddenDiv.appendChild(self.$iframe);
                        document.body.appendChild(hiddenDiv);
                    }

                    self.player = self.player || new Vimeo.Player(self.$iframe);

                    // get video width and height
                    self.player.getVideoWidth().then(function (width) {
                        self.videoWidth = width || 1280;
                    });
                    self.player.getVideoHeight().then(function (height) {
                        self.videoHeight = height || 720;
                    });

                    // set current time for autoplay
                    if (self.options.startTime && self.options.autoplay) {
                        self.player.setCurrentTime(self.options.startTime);
                    }

                    // mute
                    if (self.options.mute) {
                        self.player.setVolume(0);
                    } else if (self.options.volume) {
                        self.player.setVolume(self.options.volume);
                    }

                    var vmStarted = void 0;
                    self.player.on('timeupdate', function (e) {
                        if (!vmStarted) {
                            self.fire('started', e);
                        }
                        vmStarted = 1;

                        // check for end of video and play again or stop
                        if (self.options.endTime) {
                            if (self.options.endTime && e.seconds >= self.options.endTime) {
                                if (self.options.loop) {
                                    self.play(self.options.startTime);
                                } else {
                                    self.pause();
                                }
                            }
                        }
                    });
                    self.player.on('play', function (e) {
                        self.fire('play', e);

                        // check for the start time and start with it
                        if (self.options.startTime && e.seconds === 0) {
                            self.play(self.options.startTime);
                        }
                    });
                    self.player.on('pause', function (e) {
                        self.fire('pause', e);
                    });
                    self.player.on('ended', function (e) {
                        self.fire('end', e);
                    });
                    self.player.on('loaded', function (e) {
                        self.fire('ready', e);
                    });
                }

                // Local
                function addSourceToLocal(element, src, type) {
                    var source = document.createElement('source');
                    source.src = src;
                    source.type = type;
                    element.appendChild(source);
                }
                if (self.type === 'local') {
                    if (!self.$iframe) {
                        self.$iframe = document.createElement('video');

                        // mute
                        if (self.options.mute) {
                            self.$iframe.muted = true;
                        } else if (self.$iframe.volume) {
                            self.$iframe.volume = self.options.volume / 100;
                        }

                        // loop
                        if (self.options.loop) {
                            self.$iframe.loop = true;
                        }

                        self.$iframe.setAttribute('id', self.playerID);
                        hiddenDiv.appendChild(self.$iframe);
                        document.body.appendChild(hiddenDiv);

                        Object.keys(self.videoID).forEach(function (key) {
                            addSourceToLocal(self.$iframe, self.videoID[key], 'video/' + key);
                        });
                    }

                    self.player = self.player || self.$iframe;

                    var locStarted = void 0;
                    addEventListener(self.player, 'playing', function (e) {
                        if (!locStarted) {
                            self.fire('started', e);
                        }
                        locStarted = 1;
                    });
                    addEventListener(self.player, 'timeupdate', function () {
                        // check for end of video and play again or stop
                        if (self.options.endTime) {
                            if (self.options.endTime && this.currentTime >= self.options.endTime) {
                                if (self.options.loop) {
                                    self.play(self.options.startTime);
                                } else {
                                    self.pause();
                                }
                            }
                        }
                    });
                    addEventListener(self.player, 'play', function (e) {
                        self.fire('play', e);
                    });
                    addEventListener(self.player, 'pause', function (e) {
                        self.fire('pause', e);
                    });
                    addEventListener(self.player, 'ended', function (e) {
                        self.fire('end', e);
                    });
                    addEventListener(self.player, 'loadedmetadata', function () {
                        // get video width and height
                        self.videoWidth = this.videoWidth || 1280;
                        self.videoHeight = this.videoHeight || 720;

                        self.fire('ready');

                        // autoplay
                        if (self.options.autoplay) {
                            self.play(self.options.startTime);
                        }
                    });
                }

                callback(self.$iframe);
            });
        }
    }, {
        key: 'init',
        value: function init() {
            var self = this;

            self.playerID = 'VideoWorker-' + self.ID;
        }
    }, {
        key: 'loadAPI',
        value: function loadAPI() {
            var self = this;

            if (YoutubeAPIadded && VimeoAPIadded) {
                return;
            }

            var src = '';

            // load Youtube API
            if (self.type === 'youtube' && !YoutubeAPIadded) {
                YoutubeAPIadded = 1;
                src = 'https://www.youtube.com/iframe_api';
            }

            // load Vimeo API
            if (self.type === 'vimeo' && !VimeoAPIadded) {
                VimeoAPIadded = 1;
                src = 'https://player.vimeo.com/api/player.js';
            }

            if (!src) {
                return;
            }

            // add script in head section
            var tag = document.createElement('script');
            var head = document.getElementsByTagName('head')[0];
            tag.src = src;

            head.appendChild(tag);

            head = null;
            tag = null;
        }
    }, {
        key: 'onAPIready',
        value: function onAPIready(callback) {
            var self = this;

            // Youtube
            if (self.type === 'youtube') {
                // Listen for global YT player callback
                if ((typeof YT === 'undefined' || YT.loaded === 0) && !loadingYoutubePlayer) {
                    // Prevents Ready event from being called twice
                    loadingYoutubePlayer = 1;

                    // Creates deferred so, other players know when to wait.
                    window.onYouTubeIframeAPIReady = function () {
                        window.onYouTubeIframeAPIReady = null;
                        loadingYoutubeDeffer.resolve('done');
                        callback();
                    };
                } else if ((typeof YT === 'undefined' ? 'undefined' : _typeof(YT)) === 'object' && YT.loaded === 1) {
                    callback();
                } else {
                    loadingYoutubeDeffer.done(function () {
                        callback();
                    });
                }
            }

            // Vimeo
            if (self.type === 'vimeo') {
                if (typeof Vimeo === 'undefined' && !loadingVimeoPlayer) {
                    loadingVimeoPlayer = 1;
                    var vimeoInterval = setInterval(function () {
                        if (typeof Vimeo !== 'undefined') {
                            clearInterval(vimeoInterval);
                            loadingVimeoDeffer.resolve('done');
                            callback();
                        }
                    }, 20);
                } else if (typeof Vimeo !== 'undefined') {
                    callback();
                } else {
                    loadingVimeoDeffer.done(function () {
                        callback();
                    });
                }
            }

            // Local
            if (self.type === 'local') {
                callback();
            }
        }
    }]);

    return VideoWorker;
}();

window.VideoWorker = VideoWorker;

/*!
 * Name    : Video Background Extension for Jarallax
 * Version : 1.0.0
 * Author  : nK http://nkdev.info
 * GitHub  : https://github.com/nk-o/jarallax
 */
(function () {
    if (typeof jarallax === 'undefined') {
        return;
    }

    var Jarallax = jarallax.constructor;

    // append video after init Jarallax
    var defInit = Jarallax.prototype.init;
    Jarallax.prototype.init = function () {
        var self = this;

        defInit.apply(self);

        if (self.video) {
            self.video.getIframe(function (iframe) {
                var $parent = iframe.parentNode;
                self.css(iframe, {
                    position: self.image.position,
                    top: '0px',
                    left: '0px',
                    right: '0px',
                    bottom: '0px',
                    width: '100%',
                    height: '100%',
                    maxWidth: 'none',
                    maxHeight: 'none',
                    margin: 0,
                    zIndex: -1
                });
                self.$video = iframe;
                self.image.$container.appendChild(iframe);

                // remove parent iframe element (created by VideoWorker)
                $parent.parentNode.removeChild($parent);
            });
        }
    };

    // cover video
    var defCoverImage = Jarallax.prototype.coverImage;
    Jarallax.prototype.coverImage = function () {
        var self = this;
        var imageData = defCoverImage.apply(self);
        var node = self.image.$item.nodeName;

        if (imageData && self.video && (node === 'IFRAME' || node === 'VIDEO')) {
            var h = imageData.image.height;
            var w = h * self.image.width / self.image.height;
            var ml = (imageData.container.width - w) / 2;
            var mt = imageData.image.marginTop;

            if (imageData.container.width > w) {
                w = imageData.container.width;
                h = w * self.image.height / self.image.width;
                ml = 0;
                mt += (imageData.image.height - h) / 2;
            }

            // add video height over than need to hide controls
            if (node === 'IFRAME') {
                h += 400;
                mt -= 200;
            }

            self.css(self.$video, {
                width: w + 'px',
                marginLeft: ml + 'px',
                height: h + 'px',
                marginTop: mt + 'px'
            });
        }

        return imageData;
    };

    // init video
    var defInitImg = Jarallax.prototype.initImg;
    Jarallax.prototype.initImg = function () {
        var self = this;
        var defaultResult = defInitImg.apply(self);

        if (!self.options.videoSrc) {
            self.options.videoSrc = self.$item.getAttribute('data-jarallax-video') || null;
        }

        if (self.options.videoSrc) {
            self.defaultInitImgResult = defaultResult;
            return true;
        }

        return defaultResult;
    };

    var defCanInitParallax = Jarallax.prototype.canInitParallax;
    Jarallax.prototype.canInitParallax = function () {
        var self = this;
        var defaultResult = defCanInitParallax.apply(self);

        if (!self.options.videoSrc) {
            return defaultResult;
        }

        var video = new VideoWorker(self.options.videoSrc, {
            startTime: self.options.videoStartTime || 0,
            endTime: self.options.videoEndTime || 0,
            mute: self.options.videoVolume ? 0 : 1,
            volume: self.options.videoVolume || 0
        });

        if (video.isValid()) {
            // if parallax will not be inited, we can add thumbnail on background.
            if (!defaultResult) {
                if (!self.defaultInitImgResult) {
                    video.getImageURL(function (url) {
                        // save default user styles
                        var curStyle = self.$item.getAttribute('style');
                        if (curStyle) {
                            self.$item.setAttribute('data-jarallax-original-styles', curStyle);
                        }

                        // set new background
                        self.css(self.$item, {
                            'background-image': 'url("' + url + '")',
                            'background-position': 'center',
                            'background-size': 'cover'
                        });
                    });
                }

                // init video
            } else {
                video.on('ready', function () {
                    if (self.options.videoPlayOnlyVisible) {
                        var oldOnScroll = self.onScroll;
                        self.onScroll = function () {
                            oldOnScroll.apply(self);
                            if (self.isVisible()) {
                                video.play();
                            } else {
                                video.pause();
                            }
                        };
                    } else {
                        video.play();
                    }
                });

                video.on('started', function () {
                    self.image.$default_item = self.image.$item;
                    self.image.$item = self.$video;

                    // set video width and height
                    self.image.width = self.video.videoWidth || 1280;
                    self.image.height = self.video.videoHeight || 720;
                    self.options.imgWidth = self.image.width;
                    self.options.imgHeight = self.image.height;
                    self.coverImage();
                    self.clipContainer();
                    self.onScroll();

                    // hide image
                    if (self.image.$default_item) {
                        self.image.$default_item.style.display = 'none';
                    }
                });

                self.video = video;

                // set image if not exists
                if (!self.defaultInitImgResult) {
                    if (video.type !== 'local') {
                        video.getImageURL(function (url) {
                            self.image.src = url;
                            self.init();
                        });

                        return false;
                    }

                    // set empty image on local video if not defined
                    self.image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                    return true;
                }
            }
        }

        return defaultResult;
    };

    // Destroy video parallax
    var defDestroy = Jarallax.prototype.destroy;
    Jarallax.prototype.destroy = function () {
        var self = this;

        if (self.image.$default_item) {
            self.image.$item = self.image.$default_item;
            delete self.image.$default_item;
        }

        defDestroy.apply(self);
    };

    // data-jarallax-video initialization
    addEventListener(window, 'DOMContentLoaded', function () {
        jarallax(document.querySelectorAll('[data-jarallax-video]'));
    });
})();
}());
