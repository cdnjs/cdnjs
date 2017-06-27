/**
 * Ion.Sound
 * version 3.0.5 Build 85
 * © Denis Ineshin, 2015
 *
 * Project page:    http://ionden.com/a/plugins/ion.sound/en.html
 * GitHub page:     https://github.com/IonDen/ion.sound
 *
 * Released under MIT licence:
 * http://ionden.com/a/plugins/licence-en.html
 */

;(function (window, navigator, $, undefined) {
    "use strict";

    window.ion = window.ion || {};

    if (ion.sound) {
        return;
    }

    var warn = function (text) {
        if (!text) text = "undefined";

        if (window.console) {
            if (console.warn && typeof console.warn === "function") {
                console.warn(text);
            } else if (console.log && typeof console.log === "function") {
                console.log(text);
            }

            var d = $ && $("#debug");
            if (d && d.length) {
                var a = d.html();
                d.html(a + text + '<br/>');
            }
        }
    };

    var extend = function (parent, child) {
        var prop;
        child = child || {};

        for (prop in parent) {
            if (parent.hasOwnProperty(prop)) {
                child[prop] = parent[prop];
            }
        }

        return child;
    };



    /**
     * DISABLE for unsupported browsers
     */

    if (typeof Audio !== "function" && typeof Audio !== "object") {
        var func = function () {
            warn("HTML5 Audio is not supported in this browser");
        };
        ion.sound = func;
        ion.sound.play = func;
        ion.sound.stop = func;
        ion.sound.pause = func;
        ion.sound.preload = func;
        ion.sound.destroy = func;
        func();
        return;
    }



    /**
     * CORE
     * - creating sounds collection
     * - public methods
     */

    var is_iOS = /iPad|iPhone|iPod/.test(navigator.appVersion),
        sounds_num = 0,
        settings = {},
        sounds = {},
        i;



    if (!settings.supported && is_iOS) {
        settings.supported = ["mp3", "mp4", "aac"];
    } else if (!settings.supported) {
        settings.supported = ["mp3", "ogg", "mp4", "aac", "wav"];
    }

    var createSound = function (obj) {
        var name = obj.alias || obj.name;

        if (!sounds[name]) {
            sounds[name] = new Sound(obj);
            sounds[name].init();
        }
    };

    ion.sound = function (options) {
        extend(options, settings);

        settings.path = settings.path || "";
        settings.volume = settings.volume || 1;
        settings.preload = settings.preload || false;
        settings.multiplay = settings.multiplay || false;
        settings.loop = settings.loop || false;
        settings.sprite = settings.sprite || null;
        settings.scope = settings.scope || null;
        settings.ready_callback = settings.ready_callback || null;
        settings.ended_callback = settings.ended_callback || null;

        sounds_num = settings.sounds.length;

        if (!sounds_num) {
            warn("No sound-files provided!");
            return;
        }

        for (i = 0; i < sounds_num; i++) {
            createSound(settings.sounds[i]);
        }
    };

    ion.sound.VERSION = "3.0.5";

    ion.sound._method = function (method, name, options) {
        if (name) {
            sounds[name] && sounds[name][method](options);
        } else {
            for (i in sounds) {
                if (!sounds.hasOwnProperty(i) || !sounds[i]) {
                    continue;
                }

                sounds[i][method](options);
            }
        }
    };

    ion.sound.preload = function (name, options) {
        options = options || {};
        extend({preload: true}, options);

        ion.sound._method("init", name, options);
    };

    ion.sound.destroy = function (name) {
        ion.sound._method("destroy", name);

        if (name) {
            sounds[name] = null;
        } else {
            for (i in sounds) {
                if (!sounds.hasOwnProperty(i)) {
                    continue;
                }
                if (sounds[i]) {
                    sounds[i] = null;
                }
            }
        }
    };

    ion.sound.play = function (name, options) {
        ion.sound._method("play", name, options);
    };

    ion.sound.stop = function (name, options) {
        ion.sound._method("stop", name, options);
    };

    ion.sound.pause = function (name, options) {
        ion.sound._method("pause", name, options);
    };

    ion.sound.volume = function (name, options) {
        ion.sound._method("volume", name, options);
    };

    if ($) {
        $.ionSound = ion.sound;
    }



    /**
     * Web Audio API core
     * - for most advanced browsers
     */

    var AudioContext = window.AudioContext || window.webkitAudioContext,
        audio;

    if (AudioContext) {
        audio = new AudioContext();
    }


    var Sound = function (options) {
        this.options = extend(settings);
        delete this.options.sounds;
        extend(options, this.options);

        this.request = null;
        this.streams = {};
        this.result = {};
        this.ext = 0;
        this.url = "";

        this.loaded = false;
        this.decoded = false;
        this.no_file = false;
        this.autoplay = false;
    };

    Sound.prototype = {
        init: function (options) {
            if (options) {
                extend(options, this.options);
            }

            if (this.options.preload) {
                this.load();
            }
        },

        destroy: function () {
            var stream;

            for (i in this.streams) {
                stream = this.streams[i];

                if (stream) {
                    stream.destroy();
                    stream = null;
                }
            }
            this.streams = {};
            this.result = null;
            this.options.buffer = null;
            this.options = null;

            if (this.request) {
                this.request.removeEventListener("load", this.ready.bind(this), false);
                this.request.removeEventListener("error", this.error.bind(this), false);
                this.request.abort();
                this.request = null;
            }
        },

        createUrl: function () {
            var no_cache = new Date().valueOf();
            this.url = this.options.path + encodeURIComponent(this.options.name) + "." + this.options.supported[this.ext] + "?" + no_cache;
        },

        load: function () {
            if (this.no_file) {
                warn("No sources for \"" + this.options.name + "\" sound :(");
                return;
            }

            this.createUrl();

            this.request = new XMLHttpRequest();
            this.request.open("GET", this.url, true);
            this.request.responseType = "arraybuffer";
            this.request.addEventListener("load", this.ready.bind(this), false);
            this.request.addEventListener("error", this.error.bind(this), false);

            this.request.send();
        },

        reload: function () {
            this.ext++;

            if (this.options.supported[this.ext]) {
                this.load();
            } else {
                this.no_file = true;
                warn("No sources for \"" + this.options.name + "\" sound :(");
            }
        },

        ready: function (data) {
            this.result = data.target;

            if (this.result.readyState !== 4) {
                this.reload();
                return;
            }

            if (this.result.status !== 200 && this.result.status !== 0) {
                warn(this.url + " was not found on server!");
                this.reload();
                return;
            }

            this.request.removeEventListener("load", this.ready.bind(this), false);
            this.request.removeEventListener("error", this.error.bind(this), false);
            this.request = null;
            this.loaded = true;
            //warn("Loaded: " + this.options.name + "." + settings.supported[this.ext]);

            this.decode();
        },

        decode: function () {
            if (!audio) {
                return;
            }

            audio.decodeAudioData(this.result.response, this.setBuffer.bind(this), this.error.bind(this));
        },

        setBuffer: function (buffer) {
            this.options.buffer = buffer;
            this.decoded = true;
            //warn("Decoded: " + this.options.name + "." + settings.supported[this.ext]);

            var config = {
                name: this.options.name,
                alias: this.options.alias,
                ext: this.options.supported[this.ext],
                duration: this.options.buffer.duration
            };

            if (this.options.ready_callback && typeof this.options.ready_callback === "function") {
                this.options.ready_callback.call(this.options.scope, config);
            }

            if (this.options.sprite) {

                for (i in this.options.sprite) {
                    this.options.start = this.options.sprite[i][0];
                    this.options.end = this.options.sprite[i][1];
                    this.streams[i] = new Stream(this.options, i);
                }

            } else {

                this.streams[0] = new Stream(this.options);

            }

            if (this.autoplay) {
                this.autoplay = false;
                this.play();
            }
        },

        error: function () {
            this.reload();
        },

        play: function (options) {
            delete this.options.part;

            if (options) {
                extend(options, this.options);
            }

            if (!this.loaded) {
                if (!this.options.preload) {
                    this.autoplay = true;
                    this.load();
                }
                return;
            }

            if (this.no_file || !this.decoded) {
                return;
            }

            if (this.options.sprite) {
                if (this.options.part) {
                    this.streams[this.options.part].play(this.options);
                } else {
                    for (i in this.options.sprite) {
                        this.streams[i].play(this.options);
                    }
                }
            } else {
                this.streams[0].play(this.options);
            }
        },

        stop: function (options) {
            if (this.options.sprite) {

                if (options) {
                    this.streams[options.part].stop();
                } else {
                    for (i in this.options.sprite) {
                        this.streams[i].stop();
                    }
                }

            } else {
                this.streams[0].stop();
            }
        },

        pause: function (options) {
            if (this.options.sprite) {

                if (options) {
                    this.streams[options.part].pause();
                } else {
                    for (i in this.options.sprite) {
                        this.streams[i].pause();
                    }
                }

            } else {
                this.streams[0].pause();
            }
        },

        volume: function (options) {
            var stream;

            if (options) {
                extend(options, this.options);
            } else {
                return;
            }

            if (this.options.sprite) {
                if (this.options.part) {
                    stream = this.streams[this.options.part];
                    stream && stream.setVolume(this.options);
                } else {
                    for (i in this.options.sprite) {
                        stream = this.streams[i];
                        stream && stream.setVolume(this.options);
                    }
                }
            } else {
                stream = this.streams[0];
                stream && stream.setVolume(this.options);
            }
        }
    };



    var Stream = function (options, sprite_part) {
        this.alias = options.alias;
        this.name = options.name;
        this.sprite_part = sprite_part;

        this.buffer = options.buffer;
        this.start = options.start || 0;
        this.end = options.end || this.buffer.duration;
        this.multiplay = options.multiplay || false;
        this.volume = options.volume || 1;
        this.scope = options.scope;
        this.ended_callback = options.ended_callback;

        this.setLoop(options);

        this.source = null;
        this.gain = null;
        this.playing = false;
        this.paused = false;

        this.time_started = 0;
        this.time_ended = 0;
        this.time_played = 0;
        this.time_offset = 0;
    };

    Stream.prototype = {
        destroy: function () {
            this.stop();

            this.buffer = null;
            this.source = null;

            this.gain && this.gain.disconnect();
            this.source && this.source.disconnect();
            this.gain = null;
            this.source = null;
        },

        setLoop: function (options) {
            if (options.loop === true) {
                this.loop = 9999999;
            } else if (typeof options.loop === "number") {
                this.loop = +options.loop - 1;
            } else {
                this.loop = false;
            }
        },

        update: function (options) {
            this.setLoop(options);
            if ("volume" in options) {
                this.volume = options.volume;
            }
        },

        play: function (options) {
            if (options) {
                this.update(options);
            }

            if (!this.multiplay && this.playing) {
                return;
            }

            this.gain = audio.createGain();
            this.source = audio.createBufferSource();
            this.source.buffer = this.buffer;
            this.source.connect(this.gain);
            this.gain.connect(audio.destination);
            this.gain.gain.value = this.volume;

            this.source.onended = this.ended.bind(this);

            this._play();
        },

        _play: function () {
            var start,
                end;

            if (this.paused) {
                start = this.start + this.time_offset;
                end = this.end - this.time_offset;
            } else {
                start = this.start;
                end = this.end;
            }

            if (end <= 0) {
                this.clear();
                return;
            }

            this.source.start(0, start, end);
            this.playing = true;
            this.paused = false;
            this.time_started = new Date().valueOf();
        },

        stop: function () {
            this.source && this.source.stop(0);
            this.clear();
        },

        pause: function () {
            if (this.paused) {
                this.play();
                return;
            }

            if (!this.playing) {
                return;
            }

            this.source && this.source.stop(0);
            this.paused = true;
        },

        ended: function () {
            this.playing = false;
            this.time_ended = new Date().valueOf();
            this.time_played = (this.time_ended - this.time_started) / 1000;
            this.time_offset += this.time_played;

            if (this.time_offset >= this.end || this.end - this.time_offset < 0.015) {
                this._ended();
                this.clear();

                if (this.loop) {
                    this.loop--;
                    this.play();
                }
            }
        },

        _ended: function () {
            var config = {
                name: this.name,
                alias: this.alias,
                part: this.sprite_part,
                start: this.start,
                duration: this.end
            };

            if (this.ended_callback && typeof this.ended_callback === "function") {
                this.ended_callback.call(this.scope, config);
            }
        },

        clear: function () {
            this.time_played = 0;
            this.time_offset = 0;
            this.paused = false;
            this.playing = false;
        },

        setVolume: function (options) {
            this.volume = options.volume;

            if (this.gain) {
                this.gain.gain.value = this.volume;
            }
        }
    };

    if (audio) {
        return;
    }



    /**
     * Fallback for HTML5 audio
     * - for not so modern browsers
     */

    var checkSupport = function () {
        var sound = new Audio(),
            can_play_mp3 = sound.canPlayType('audio/mpeg'),
            can_play_ogg = sound.canPlayType('audio/ogg'),
            can_play_aac = sound.canPlayType('audio/mp4; codecs="mp4a.40.2"'),
            item, i;

        for (i = 0; i < settings.supported.length; i++) {
            item = settings.supported[i];

            if (!can_play_mp3 && item === "mp3") {
                settings.supported.splice(i, 1);
            }

            if (!can_play_ogg && item === "ogg") {
                settings.supported.splice(i, 1);
            }

            if (!can_play_aac && item === "aac") {
                settings.supported.splice(i, 1);
            }

            if (!can_play_aac && item === "mp4") {
                settings.supported.splice(i, 1);
            }
        }

        sound = null;
    };
    checkSupport();



    Sound.prototype = {
        init: function (options) {
            if (options) {
                extend(options, this.options);
            }

            this.inited = true;

            if (this.options.preload) {
                this.load();
            }
        },

        destroy: function () {
            var stream;

            for (i in this.streams) {
                stream = this.streams[i];

                if (stream) {
                    stream.destroy();
                    stream = null;
                }
            }
            this.streams = {};
            this.loaded = false;
            this.inited = false;
        },

        load: function () {
            var part;

            this.options.preload = true;
            this.options._ready = this.ready;
            this.options._scope = this;

            if (this.options.sprite) {

                for (i in this.options.sprite) {
                    part = this.options.sprite[i];

                    this.options.start = part[0];
                    this.options.end = part[1];

                    this.streams[i] = new Stream(this.options, i);
                }

            } else {

                this.streams[0] = new Stream(this.options);

            }
        },

        ready: function (duration) {
            if (this.loaded) {
                return;
            }

            this.loaded = true;

            var config = {
                name: this.options.name,
                alias: this.options.alias,
                ext: this.options.supported[this.ext],
                duration: duration
            };

            if (this.options.ready_callback && typeof this.options.ready_callback === "function") {
                this.options.ready_callback.call(this.options.scope, config);
            }

            if (this.autoplay) {
                this.autoplay = false;
                this.play();
            }
        },

        play: function (options) {
            if (!this.inited) {
                return;
            }

            delete this.options.part;

            if (options) {
                extend(options, this.options);
            }

            if (!this.loaded) {
                if (!this.options.preload) {
                    this.autoplay = true;
                    this.load();
                }
                return;
            }

            if (this.options.sprite) {
                if (this.options.part) {
                    this.streams[this.options.part].play(this.options);
                } else {
                    for (i in this.options.sprite) {
                        this.streams[i].play(this.options);
                    }
                }
            } else {
                this.streams[0].play(this.options);
            }
        },

        stop: function (options) {
            if (!this.inited) {
                return;
            }

            if (this.options.sprite) {

                if (options) {
                    this.streams[options.part].stop();
                } else {
                    for (i in this.options.sprite) {
                        this.streams[i].stop();
                    }
                }

            } else {
                this.streams[0].stop();
            }
        },

        pause: function (options) {
            if (!this.inited) {
                return;
            }

            if (this.options.sprite) {

                if (options) {
                    this.streams[options.part].pause();
                } else {
                    for (i in this.options.sprite) {
                        this.streams[i].pause();
                    }
                }

            } else {
                this.streams[0].pause();
            }
        },

        volume: function (options) {
            var stream;

            if (options) {
                extend(options, this.options);
            } else {
                return;
            }

            if (this.options.sprite) {
                if (this.options.part) {
                    stream = this.streams[this.options.part];
                    stream && stream.setVolume(this.options);
                } else {
                    for (i in this.options.sprite) {
                        stream = this.streams[i];
                        stream && stream.setVolume(this.options);
                    }
                }
            } else {
                stream = this.streams[0];
                stream && stream.setVolume(this.options);
            }
        }
    };



    Stream = function (options, sprite_part) {
        this.name = options.name;
        this.alias = options.alias;
        this.sprite_part = sprite_part;

        this.multiplay = options.multiplay;
        this.volume = options.volume;
        this.preload = options.preload;
        this.path = settings.path;
        this.start = options.start || 0;
        this.end = options.end || 0;
        this.scope = options.scope;
        this.ended_callback = options.ended_callback;

        this._scope = options._scope;
        this._ready = options._ready;

        this.setLoop(options);

        this.sound = null;
        this.url = null;
        this.loaded = false;

        this.start_time = 0;
        this.paused_time = 0;
        this.played_time = 0;

        this.init();
    };

    Stream.prototype = {
        init: function () {
            this.sound = new Audio();
            this.sound.volume = this.volume;

            this.createUrl();

            this.sound.addEventListener("ended", this.ended.bind(this), false);
            this.sound.addEventListener("canplaythrough", this.can_play_through.bind(this), false);
            this.sound.addEventListener("timeupdate", this._update.bind(this), false);

            this.load();
        },

        destroy: function () {
            this.stop();

            this.sound.removeEventListener("ended", this.ended.bind(this), false);
            this.sound.removeEventListener("canplaythrough", this.can_play_through.bind(this), false);
            this.sound.removeEventListener("timeupdate", this._update.bind(this), false);

            this.sound = null;
            this.loaded = false;
        },

        createUrl: function () {
            var rand = new Date().valueOf();
            this.url = this.path + encodeURIComponent(this.name) + "." + settings.supported[0] + "?" + rand;
        },

        can_play_through: function () {
            if (this.preload) {
                this.ready();
            }
        },

        load: function () {
            this.sound.src = this.url;
            this.sound.preload = this.preload ? "auto" : "none";
            if (this.preload) {
                this.sound.load();
            }
        },

        setLoop: function (options) {
            if (options.loop === true) {
                this.loop = 9999999;
            } else if (typeof options.loop === "number") {
                this.loop = +options.loop - 1;
            } else {
                this.loop = false;
            }
        },

        update: function (options) {
            this.setLoop(options);

            if ("volume" in options) {
                this.volume = options.volume;
            }
        },

        ready: function () {
            if (this.loaded || !this.sound) {
                return;
            }

            this.loaded = true;
            this._ready.call(this._scope, this.sound.duration);

            if (!this.end) {
                this.end = this.sound.duration;
            }
        },

        play: function (options) {
            if (options) {
                this.update(options);
            }

            if (!this.multiplay && this.playing) {
                return;
            }

            this._play();
        },

        _play: function () {
            if (this.paused) {
                this.paused = false;
            } else {
                try {
                    this.sound.currentTime = this.start;
                } catch (e) {}
            }

            this.playing = true;
            this.start_time = new Date().valueOf();
            this.sound.volume = this.volume;
            this.sound.play();
        },

        stop: function () {
            if (!this.playing) {
                return;
            }

            this.playing = false;
            this.paused = false;
            this.sound.pause();
            this.clear();

            try {
                this.sound.currentTime = this.start;
            } catch (e) {}
        },

        pause: function () {
            if (this.paused) {
                this._play();
            } else {
                this.playing = false;
                this.paused = true;
                this.sound.pause();
                this.paused_time = new Date().valueOf();
                this.played_time += this.paused_time - this.start_time;
            }
        },

        _update: function () {
            if (!this.start_time) {
                return;
            }

            var current_time = new Date().valueOf(),
                played_time = current_time - this.start_time,
                played = (this.played_time + played_time) / 1000;

            if (played >= this.end) {
                if (this.playing) {
                    this.stop();
                    this._ended();
                }
            }
        },

        ended: function () {
            if (this.playing) {
                this.stop();
                this._ended();
            }
        },

        _ended: function () {
            this.playing = false;

            var config = {
                name: this.name,
                alias: this.alias,
                part: this.sprite_part,
                start: this.start,
                duration: this.end
            };

            if (this.ended_callback && typeof this.ended_callback === "function") {
                this.ended_callback.call(this.scope, config);
            }

            if (this.loop) {
                setTimeout(this.looper.bind(this), 15);
            }
        },

        looper: function () {
            this.loop--;
            this.play();
        },

        clear: function () {
            this.start_time = 0;
            this.played_time = 0;
            this.paused_time = 0;
        },

        setVolume: function (options) {
            this.volume = options.volume;

            if (this.sound) {
                this.sound.volume = this.volume;
            }
        }
    };

} (window, navigator, window.jQuery || window.$));
