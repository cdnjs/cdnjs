/*!
 * Name    : Video Worker (wrapper for Youtube and Vimeo)
 * Version : 1.0.0
 * Author  : _nK http://nkdev.info
 * GitHub  : https://github.com/nk-o/jarallax
 */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {

    var VideoWorker = (function() {
        var ID = 0;

        function VideoWorker(url, options) {
            var _this = this;

            _this.url = url;

            _this.options_default = {
                autoplay: 1,
                loop: 1,
                mute: 1,
                controls: 0
            };

            _this.options = $.extend({}, _this.options_default, options)

            // check URL
            _this.videoID = _this.parseURL(url);

            // init
            if(_this.videoID) {
                _this.ID = ID++;
                _this.loadAPI();
                _this.init();
            }
        }

        return VideoWorker;
    }());

    VideoWorker.prototype.parseURL = function(url) {
        // parse youtube ID
        function getYoutubeID(url) {
            var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            return (match && match[1].length==11) ? match[1] : false;
        }

        // parse vimeo ID
        function getVimeoID(url) {
            var regExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
            var match = url.match(regExp);
            return (match && match[3]) ? match[3] : false;
        }

        var Youtube = getYoutubeID(url);
        var Vimeo = getVimeoID(url);

        if(Youtube) {
            this.type = 'youtube';
            return Youtube;
        } else if (Vimeo) {
            this.type = 'vimeo';
            return Vimeo;
        } else {
            return false;
        }
    };

    VideoWorker.prototype.isValid = function() {
        return !!this.videoID;
    }

    // events
    VideoWorker.prototype.on = function(name, callback) {
        this.userEventsList = this.userEventsList || [];

        // add new callback in events list
        (this.userEventsList[name] || (this.userEventsList[name] = [])).push(callback);
    }
    VideoWorker.prototype.off = function(name, callback) {
        if(!this.userEventsList[name] || !this.userEventsList) {
            return false;
        }

        if(!callback) {
            delete this.userEventsList[name];
        } else {
            for(var k = 0; k < this.userEventsList[name].length; k++) {
                if(this.userEventsList[name][k] === callback) {
                    this.userEventsList[name][k] = undefined;
                }
            }
        }
    }
    VideoWorker.prototype.fire = function(name) {
        var args = [].slice.call(arguments, 1);
        if(this.userEventsList && typeof this.userEventsList[name] !== 'undefined') {
            for(var k in this.userEventsList[name]) {
                // call with all arguments
                if(this.userEventsList[name][k])
                    this.userEventsList[name][k].apply(this, args);
            }
        }
    }

    VideoWorker.prototype.play = function() {
        if(!this.player) {
            return;
        }

        if(this.type === 'youtube' && this.player.playVideo) {
            this.player.playVideo();
        }

        if(this.type === 'vimeo') {
            this.player.api('play');
        }
    }

    VideoWorker.prototype.pause = function() {
        if(!this.player) {
            return;
        }
        
        if(this.type === 'youtube' && this.player.pauseVideo) {
            this.player.pauseVideo();
        }

        if(this.type === 'vimeo') {
            this.player.api('pause');
        }
    }

    VideoWorker.prototype.getImageURL = function(callback) {
        var _this = this;

        if(_this.videoImage) {
            callback(_this.videoID);
            return;
        }

        if(_this.type === 'youtube') {
            _this.videoImage = 'https://img.youtube.com/vi/' + _this.videoID + '/maxresdefault.jpg';
            callback(_this.videoImage);
        }
        
        if(_this.type === 'vimeo') {
            $.get('https://vimeo.com/api/v2/video/' + _this.videoID + '.json', function(response) {
                _this.videoImage = response[0].thumbnail_large;
                callback(_this.videoImage);
            });
        }
    };

    VideoWorker.prototype.getIframe = function(callback) {
        var _this = this;

        // return generated iframe
        if(_this.$iframe) {
            callback(_this.$iframe);
            return;
        }

        // generate new iframe
        _this.onAPIready(function() {
            // Youtube
            if(_this.type === 'youtube') {
                _this.playerOptions = {};
                _this.playerOptions.videoId = _this.videoID;
                _this.playerOptions.width = $(window).width();
                _this.playerOptions.playerVars = {
                    autohide: 1,
                    rel: 0,
                    autoplay: 0
                };

                // hide controls
                if(!_this.options.controls) {
                    _this.playerOptions.playerVars.iv_load_policy = 3;
                    _this.playerOptions.playerVars.modestbranding = 1;
                    _this.playerOptions.playerVars.controls = 0;
                    _this.playerOptions.playerVars.showinfo = 0;
                    _this.playerOptions.playerVars.disablekb = 1;
                    _this.playerOptions.playerVars
                }

                // events
                var videoStarted = 0;
                _this.playerOptions.events = {
                    onReady: function(e) {
                        // mute
                        if(_this.options.mute) {
                            e.target.mute();
                        }
                        // autoplay
                        if(_this.options.autoplay) {
                            _this.play();
                        }
                        _this.fire('ready', e);
                    },
                    onStateChange: function(e) {
                        // loop
                        if(_this.options.loop && e.data === YT.PlayerState.ENDED) {
                            e.target.playVideo();
                        }
                        if(videoStarted == 0 && e.data === YT.PlayerState.PLAYING) {
                            videoStarted = 1;
                            _this.fire('started', e);
                        }
                    }
                };

                if(!_this.$iframe) {
                    $('<div style="display: none;"><div id="' + _this.playerID + '"></div></div>').appendTo('body');
                }
                _this.player = _this.player || new window.YT.Player(_this.playerID, _this.playerOptions);

                _this.$iframe = _this.$iframe || $('#' + _this.playerID);
            }

            // Vimeo
            if(_this.type === 'vimeo') {
                _this.playerOptions = '';

                _this.playerOptions += 'player_id=' + _this.playerID;
                _this.playerOptions += '&autopause=0';

                // hide controls
                if(!_this.options.controls) {
                    _this.playerOptions += '&badge=0&byline=0&portrait=0&title=0';
                }

                // autoplay
                _this.playerOptions += '&autoplay=0';

                // loop
                _this.playerOptions += '&loop=' + (_this.options.loop ? 1 : 0);

                if(!_this.$iframe) {
                    var VimeoURL = 'https://player.vimeo.com/video/' + _this.videoID + '?' + _this.playerOptions;
                    $('<div style="display: none;"><iframe id="' + _this.playerID + '" src="' + VimeoURL + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>').appendTo('body');
                }

                _this.$iframe = _this.$iframe || $('#' + _this.playerID);

                _this.player = _this.player || $f(_this.$iframe[0]);

                var videoStarted = 0;
                _this.player.addEvent('ready', function(e) {
                    // mute
                    _this.player.api('setVolume', _this.options.mute ? 0 : 100);

                    // autoplay
                    if(_this.options.autoplay) {
                        _this.play();
                    }

                    _this.player.addEvent('playProgress', function(e) {
                        if(!videoStarted) {
                            _this.fire('started', e);
                        }
                        videoStarted = 1;
                    });

                    _this.fire('ready', e);
                });
            }

            callback(_this.$iframe);
        });
    };

    VideoWorker.prototype.init = function() {
        var _this = this;

        _this.playerID = 'VideoWorker-' + _this.ID;
    };

    var YoutubeAPIadded = 0;
    var VimeoAPIadded = 0;
    VideoWorker.prototype.loadAPI = function() {
        var _this = this;

        if(YoutubeAPIadded && VimeoAPIadded) {
            return;
        }

        var src = '';

        // load Youtube API
        if(_this.type === 'youtube' && !YoutubeAPIadded) {
            YoutubeAPIadded = 1;
            src = '//www.youtube.com/iframe_api';
        }

        // load Vimeo API
        if(_this.type === 'vimeo' && !VimeoAPIadded) {
            VimeoAPIadded = 1;
            src = '//f.vimeocdn.com/js/froogaloop2.min.js'
        }

        if (window.location.origin == 'file://') {
            src = 'http:' + src;
        }

        // add script in head section
        var tag = document.createElement('script');
        var head = document.getElementsByTagName('head')[0];
        tag.src = src;
        
        head.appendChild(tag);

        head = null;
        tag = null;
    };

    var loadingYoutubePlayer = 0;
    var loadingVimeoPlayer = 0;
    var loadingYoutubeDeffer = $.Deferred();
    var loadingVimeoDeffer = $.Deferred();
    VideoWorker.prototype.onAPIready = function(callback) {
        var _this = this;

        // Youtube
        if(_this.type === 'youtube') {
            // Listen for Gobal YT player callback
            if ((typeof YT === 'undefined' || YT.loaded == 0) && !loadingYoutubePlayer) {
                // Prevents Ready Event from being called twice
                loadingYoutubePlayer = 1;
                
                // Creates deferred so, other players know when to wait.
                window.onYouTubeIframeAPIReady = function() {
                    window.onYouTubeIframeAPIReady = null;
                    loadingYoutubeDeffer.resolve('done');
                    callback();
                };
            } else if (typeof YT === 'object' && YT.loaded == 1)  {
                callback();
            } else {
                loadingYoutubeDeffer.done(function() {
                    callback();
                });
            }
        }

        // Vimeo
        if(_this.type === 'vimeo') {
            if(typeof $f === 'undefined' && !loadingVimeoPlayer) {
                loadingVimeoPlayer = 1;
                var frooga_interval = setInterval(function() {
                    if(typeof $f !== 'undefined') {
                        clearInterval(frooga_interval);
                        loadingVimeoDeffer.resolve('done');
                        callback();
                    }
                }, 20);
            } else if(typeof $f !== 'undefined') {
                callback();
            } else {
                loadingVimeoDeffer.done(function() {
                    callback();
                })
            }
        }
    };

    window.VideoWorker = VideoWorker;
}));



/*!
 * Name    : Video Background Extension for Jarallax
 * Version : 1.0.0
 * Author  : _nK http://nkdev.info
 * GitHub  : https://github.com/nk-o/jarallax
 */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    var Jarallax = $.fn.jarallax.constructor;

    // append video after init Jarallax
    var def_init = Jarallax.prototype.init;
    Jarallax.prototype.init = function() {
        var _this = this;

        def_init.apply(_this);

        if(_this.video) {
            _this.video.getIframe(function(iframe) {
                _this.$video = $(iframe).css({
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        width: '100%',
                        height: '100%',
                        visibility: 'visible',
                        zIndex: -1
                    }).appendTo(_this.image.$container);
            });
        }
    };

    // append video after init Jarallax
    var def_coverImage = Jarallax.prototype.coverImage;
    Jarallax.prototype.coverImage = function() {
        var _this = this;

        def_coverImage.apply(_this);

        // add video height over than need to hide controls
        if(_this.video && _this.image.$item.is('iframe')) {
            _this.image.$item.css({
                height: _this.image.$item.height() + 400,
                top: -200
            });
        }
    };

    // init video parallax
    var def_initImg = Jarallax.prototype.initImg;
    Jarallax.prototype.initImg = function() {
        var _this = this;

        if(!_this.options.videoSrc) {
            _this.options.videoSrc = _this.$item.attr('data-jarallax-video') || undefined;
        }

        if(_this.options.videoSrc) {
            var video = new VideoWorker(_this.options.videoSrc);

            if(video.isValid()) {
                _this.image.useImgTag = true;

                video.on('ready', function() {
                    function checkViewport() {
                        if(_this.isVisible()) {
                            video.play();
                        } else {
                            video.pause();
                        }
                    }

                    // pause video when it out of viewport 
                    $(window).on('DOMContentLoaded.jarallax-' + _this.instanceID + ' load.jarallax-' + _this.instanceID + ' resize.jarallax-' + _this.instanceID + ' scroll.jarallax-' + _this.instanceID + '', checkViewport);
                    checkViewport();
                });

                video.on('started', function() {
                    _this.image.$default_item = _this.image.$item;
                    _this.image.$item = _this.$video;

                    // set video width and height
                    _this.image.width  = _this.imgWidth = 1280;
                    _this.image.height = _this.imgHeight = 720;
                    _this.coverImage();
                    _this.clipContainer();
                    _this.onScroll();

                    // hide image
                    if(_this.image.$default_item) {
                        _this.image.$default_item.fadeOut(500);
                    }
                });

                _this.video = video;

                video.getImageURL(function(url) {
                    _this.image.src = url;
                    _this.init();
                });
            }

            return false;
        }

        return def_initImg.apply(_this);
    };

    // Destroy video parallax
    var def_destroy = Jarallax.prototype.destroy;
    Jarallax.prototype.destroy = function() {
        var _this = this;

        $(window).off('.jarallax-' + _this.instanceID);

        def_destroy.apply(_this);
    }
}));