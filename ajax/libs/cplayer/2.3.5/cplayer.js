"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 cPlayer REWRITE - 2.0

     Author && user(:cry:)  Corps
     天若有情天亦老,我为长者续一秒~
 */
var cPlayer = function () {
    function cPlayer(options) {
        var _this = this;

        _classCallCheck(this, cPlayer);

        var EVENTS = {
            "play": [], //When Music be played, Emit.
            "pause": [], //When Music be paused, Emit.
            "volumechange": [],
            "timeupdate": [],
            "canplaythrough": [],
            "ended": [],
            //All the above are binded on AUDIO Elements,
            //The following items are Function's callback function.
            "toggle": [],
            "previous": [],
            "next": [],
            "changeList": [],
            "changeLyric": [],
            "slideList": [],
            "slideLyric": [],
            "clickLyricPower": [],
            "clickListPower": [],
            "clickVolumePower": []
        };
        this.emitter = new cEmitter(EVENTS);
        this.on = function (eventName, func) {
            return _this.emitter.on(eventName, func);
        };
        /*
         *  參數处理,合并默认参数与定义參數
         */
        var DEFAULTS = {
            "element": document.getElementById("cplayer"),
            "list": [],
            "mdicon": true
        };
        if (Object.assign !== undefined) {
            this.options = Object.assign({}, DEFAULTS, options);
        }

        //SVG建立
        this.SVG = {
            "playArrow": 'M16 10v28l22-14z',
            "pause": 'M12 38h8V10h-8v28zm16-28v28h8V10h-8z',
            "playlistPlay": 'M26 6H-8v4h34V6zm0-8H-8v4h34v-4zM-8 18h26v-4H-8v4zm30-4v12l10-6-10-6z',
            "note": 'M44 20L32 8H8c-2.2 0-4 1.8-4 4v24.02C4 38.22 5.8 40 8 40l32-.02c2.2 0 4-1.78 4-3.98V20zm-14-9l11 11H30V11z',
            "volumeUp": 'M6 18v12h8l10 10V8L14 18H6zm27 6c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zM28 6.46v4.13c5.78 1.72 10 7.07 10 13.41s-4.22 11.69-10 13.41v4.13c8.01-1.82 14-8.97 14-17.54S36.01 8.28 28 6.46z',
            "volumeMute": 'M14 18v12h8l10 10V8L22 18h-8z',
            "volumeOff": 'M33 24c0-3.53-2.04-6.58-5-8.05v4.42l4.91 4.91c.06-.42.09-.85.09-1.28zm5 0c0 1.88-.41 3.65-1.08 5.28l3.03 3.03C41.25 29.82 42 27 42 24c0-8.56-5.99-15.72-14-17.54v4.13c5.78 1.72 10 7.07 10 13.41zM8.55 6L6 8.55 15.45 18H6v12h8l10 10V26.55l8.51 8.51c-1.34 1.03-2.85 1.86-4.51 2.36v4.13c2.75-.63 5.26-1.89 7.37-3.62L39.45 42 42 39.45l-18-18L8.55 6zM24 8l-4.18 4.18L24 16.36V8z',
            "volumeDown": 'M37 24c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zm-27-6v12h8l10 10V8L18 18h-8z'
        };
        (function () {
            for (var i = 0, keys = Object.keys(_this.SVG), length = keys.length; i < length; i++) {
                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                if (keys[i] === "playlistPlay") {
                    svg.setAttribute("viewBox", "-12 -12 48 48");
                    svg.setAttribute("enable-background", "new -12 -12 48 48");
                } else {
                    svg.setAttribute("viewBox", "0 0 48 48");
                }
                svg = keys[i] === "playlistPlay" ? '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-12 -12 48 48" enable-background="new -12 -12 48 48"><path d="' + _this.SVG[keys[i]] + '"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><path d="' + _this.SVG[keys[i]] + '"/></svg>';
                _this.SVG[keys[i]] = svg;
            }
        })();

        this.CBASE = new cBase(this.options.element);
        this.now = 0;
        this.dragging = { contain: false, target: undefined };
        //现在开始填DOM
        (function () {
            var cPlayer = document.createElement("c-player");
            var lyric = document.createElement("div");
            lyric.classList.add("lyric");
            lyric.classList.add("invisible");
            var lyricBody = document.createElement("lyric-body");
            lyric.appendChild(lyricBody);
            var controls = document.createElement("div");
            controls.classList.add("controls");
            var cLeft = document.createElement("div");
            cLeft.classList.add("c-left");
            var musicDescription = document.createElement("div");
            musicDescription.classList.add("music-description");
            var image = document.createElement("div");
            image.classList.add("image");
            var metaBak = document.createElement("img");
            metaBak.classList.add("meta-bak");
            image.appendChild(metaBak);
            var musicMeta = document.createElement("div");
            musicMeta.classList.add("music-meta");
            var div = document.createElement("div");
            var musicName = document.createElement("span");
            musicName.classList.add("music-name");
            var musicArtist = document.createElement("span");
            musicArtist.classList.add("music-artist");
            div.appendChild(musicName);
            div.appendChild(musicArtist);
            musicMeta.appendChild(div);
            musicDescription.appendChild(image);
            musicDescription.appendChild(musicMeta);
            var playIcon = document.createElement("a");
            playIcon.classList.add("play-icon");
            _this.CBASE.replaceInner(playIcon, _this.SVG.playArrow);
            cLeft.appendChild(musicDescription);
            cLeft.appendChild(playIcon);
            var cCenter = document.createElement("div");
            cCenter.classList.add("c-center");
            var time = document.createElement("div");
            time.classList.add("time");
            var timeBody = document.createElement("div");
            timeBody.classList.add("time-body");
            var timeLine = document.createElement("div");
            timeLine.classList.add("time-line");
            var timePoint = document.createElement("div");
            timePoint.classList.add("time-point");
            timeBody.appendChild(timeLine);
            timeBody.appendChild(timePoint);
            time.appendChild(timeBody);
            cCenter.appendChild(time);
            var cRight = document.createElement("div");
            cRight.classList.add("c-right");
            var volume = document.createElement("div");
            volume.classList.add("volume");
            var volumeButton = document.createElement("div");
            volumeButton.classList.add("volume-button");
            var volumePower = document.createElement("a");
            volumePower.classList.add("volume-power");
            _this.CBASE.replaceInner(volumePower, _this.SVG.volumeOff);
            volumeButton.appendChild(volumePower);
            var volumeBody = document.createElement("div");
            volumeBody.classList.add("volume-body");
            var volumeLine = document.createElement("div");
            volumeLine.classList.add("volume-line");
            var volumePoint = document.createElement("div");
            volumePoint.classList.add("volume-point");
            volumeBody.appendChild(volumeLine);
            volumeBody.appendChild(volumePoint);
            volume.appendChild(volumeButton);
            volume.appendChild(volumeBody);
            var listButton = document.createElement("div");
            listButton.classList.add("list-button");
            var listPower = document.createElement("a");
            listPower.classList.add("list-power");
            _this.CBASE.replaceInner(listPower, _this.SVG.playlistPlay);
            listButton.appendChild(listPower);
            var lyricButton = document.createElement("div");
            lyricButton.classList.add("lyric-button");
            var lyricPower = document.createElement("a");
            lyricPower.classList.add("lyric-power");
            _this.CBASE.replaceInner(lyricPower, _this.SVG.note);
            lyricButton.appendChild(lyricPower);
            cRight.appendChild(volume);
            cRight.appendChild(listButton);
            cRight.appendChild(lyricButton);
            controls.appendChild(cLeft);
            controls.appendChild(cCenter);
            controls.appendChild(cRight);
            var list = document.createElement("div");
            list.classList.add("list");
            list.classList.add("invisible");
            var listBody = document.createElement("list-body");
            list.appendChild(listBody);
            cPlayer.appendChild(lyric);
            cPlayer.appendChild(controls);
            cPlayer.appendChild(list);
            _this.options.element.appendChild(cPlayer);
        })();
        //然后为DOMList填充一下吧
        this.__LIST__ = {
            "lyric": this.CBASE.getByClass("lyric"),
            "lyricBody": this.CBASE.getByTagName("lyric-body"),
            "toggle": this.CBASE.getByClass("play-icon"),
            "img": this.CBASE.getByClass("meta-bak"),
            "name": this.CBASE.getByClass("music-name"),
            "artist": this.CBASE.getByClass("music-artist"),
            "time": this.CBASE.getByClass("time"),
            "timeLine": this.CBASE.getByClass("time-line"),
            "timePoint": this.CBASE.getByClass("time-point"),
            "lyricPower": this.CBASE.getByClass("lyric-power"),
            "volumePower": this.CBASE.getByClass("volume-power"),
            "volumeLine": this.CBASE.getByClass("volume-line"),
            "volumePoint": this.CBASE.getByClass("volume-point"),
            "listPower": this.CBASE.getByClass("list-power"),
            "list": this.CBASE.getByClass("list"),
            "listBody": this.CBASE.getByTagName("list-body")
        };
        this.__LIST__.toggleIcon = this.CBASE.getByTagName("svg", this.__LIST__.toggle);
        this.__LIST__.volumeIcon = this.CBASE.getByTagName("svg", this.__LIST__.volumePower);

        this.music = document.createElement("audio");
        this.music.autoplay = !!this.options.autoplay;
        //绑定事件开始:

        this.emitter.on("toggle", function () {
            if (_this.isPaused()) {
                _this.play();
            } else {
                _this.pause();
            }
        }).on("clickLyricPower", function () {
            if (_this.hasLyric(_this.now) && _this.__LIST__.lyric.classList.contains("invisible")) {
                _this.showLyric();
            } else if (_this.hasLyric(_this.now) && !_this.__LIST__.lyric.classList.contains("invisible")) {
                _this.hideLyric();
            }
        }).on("clickListPower", function () {
            if (_this.hasList() && _this.__LIST__.list.classList.contains("invisible")) {
                _this.showList();
            } else if (_this.hasLyric() && !_this.__LIST__.list.classList.contains("invisible")) {
                _this.hideList();
            }
        }).on("clickVolumePower", function () {
            if (_this.isMuted()) {
                _this.music.muted = false;
            } else {
                _this.volume(0);
            }
        }).on("timeupdate", function () {
            _this.updateTime();
            if (_this.hasLyric(_this.now)) {
                _this.slideLyric(_this.music.currentTime);
            }
        }).on("volumechange", function () {
            _this.volume(); //做更新界面用.
        }).on("pause", function () {
            _this.CBASE.replaceInner(_this.__LIST__.toggle, _this.SVG.playArrow);
            //再赋值,更新内容.
            //this.__LIST__.toggleIcon = this.CBASE.getByTagName("svg",this.__LIST__.toggle);
        }).on("play", function () {
            _this.CBASE.replaceInner(_this.__LIST__.toggle, _this.SVG.pause);
            //再赋值,更新内容.
            _this.__LIST__.toggleIcon = _this.CBASE.getByTagName("svg", _this.__LIST__.toggle);
        }).on("ended", function () {
            //this.__LIST__.lyricBody.style.transform = ""; 为了兼容性封装一遍
            _this.CBASE.style(_this.__LIST__.lyricBody, "transform", "");
            if (_this.options.list[_this.now].loop === true) {
                _this.updateTime(0);
                _this.play();
            } else if (_this.hasList() && _this.now !== _this.options.list.length - 1) {
                _this.next();
            }
        });

        //结束


        this.toggle();
        this.__LIST__.toggle.addEventListener("click", function () {
            return _this.emitter.emit("toggle");
        });
        this.__LIST__.lyricPower.addEventListener("click", function () {
            return _this.emitter.emit("clickLyricPower");
        });
        this.__LIST__.listPower.addEventListener("click", function () {
            return _this.emitter.emit("clickListPower");
        });
        this.__LIST__.volumePower.addEventListener("click", function () {
            return _this.emitter.emit("clickVolumePower");
        });
        this.music.addEventListener("volumechange", function (ev) {
            return _this.emitter.emit("volumechange", ev);
        });
        this.music.addEventListener("timeupdate", function (ev) {
            return _this.emitter.emit("timeupdate", ev);
        });
        this.music.addEventListener("canplaythrough", function () {
            return _this.emitter.emit("canplaythrough");
        });
        this.music.addEventListener("pause", function () {
            return _this.emitter.emit("pause");
        });
        this.music.addEventListener("play", function () {
            return _this.emitter.emit("play");
        });
        this.music.addEventListener("ended", function () {
            return _this.emitter.emit("ended");
        });
        //以下内容不适合使用cEmitter,所以就不使用了.
        this.options.element.addEventListener("mousedown", function (a) {
            return _this.dragPercentage(a);
        });
        this.options.element.addEventListener("mousemove", function (a) {
            return _this.dragPercentage(a);
        });
        this.options.element.addEventListener("mouseup", function (a) {
            return _this.dragPercentage(a);
        });
        //以上内容不适合使用cEmitter,所以就不使用了.

        //以下内容是为了兼容UC
        if (this.music.onplay = undefined) Object.defineProperty(music, "paused", { set: function set(check) {
                if (check = true) {
                    this.emitter.emit("pause");
                } else {
                    this.emitter.emit("play");
                }
            } });
        //以上内容是为了兼容UC

        this.volume();
        this.refreshList();
    }

    _createClass(cPlayer, [{
        key: "dragPercentage",
        value: function dragPercentage(options) {
            switch (options.type) {
                case "mousedown":
                    if (!(options.target !== this.__LIST__.timePoint || options.target !== this.__LIST__.volumePoint)) return;
                    this.dragging.contain = true;
                    this.dragging.target = options.target;
                    break;
                case "mousemove":
                    if (this.dragging.contain === false) return;
                    if (this.dragging.target.parentNode.classList.contains("volume-body")) {
                        this.__LIST__.volumeLine.style.width = (options.clientX - this.dragging.target.parentNode.offsetLeft) / this.dragging.target.parentNode.offsetWidth * 100 + "%";
                    } else if (this.dragging.target.parentNode.classList.contains("time-body")) {
                        this.__LIST__.timeLine.style.width = (options.clientX - this.dragging.target.parentNode.offsetLeft) / this.dragging.target.parentNode.offsetWidth * 100 + "%";
                    }
                    //实时修正VOLUME(某人强烈要求)
                    if (this.dragging.target.parentNode.classList.contains("volume-body")) {
                        var vol = (options.clientX - this.dragging.target.parentNode.offsetLeft) / this.dragging.target.parentNode.offsetWidth;
                        vol = vol > 1 ? 1 : vol;
                        vol = vol < 0 ? 0 : vol;
                        this.music.volume = vol;
                    }
                    break;
                case "mouseup":
                    if (this.dragging.contain === false) return;
                    if (this.dragging.target.parentNode.classList.contains("volume-body")) {
                        var _vol = (options.clientX - this.dragging.target.parentNode.offsetLeft) / this.dragging.target.parentNode.offsetWidth;
                        _vol = _vol > 1 ? 1 : _vol;
                        _vol = _vol < 0 ? 0 : _vol;
                        this.music.volume = _vol;
                    } else if (this.dragging.target.parentNode.classList.contains("time-body")) {
                        var time = (options.clientX - this.dragging.target.parentNode.offsetLeft) / this.dragging.target.parentNode.offsetWidth;
                        time = time > 1 ? 1 : time;
                        time = time < 0 ? 0 : time;
                        this.music.currentTime = time * this.music.duration;
                    }
                    this.dragging.contain = false;
                    this.dragging.target = undefined;
                    break;
            }
        }
    }, {
        key: "volume",
        value: function volume() {
            var _this2 = this;

            var vl = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

            var checkLevel = function checkLevel() {
                if (_this2.music.volume === 0 || _this2.isMuted()) {
                    _this2.CBASE.replaceInner(_this2.__LIST__.volumePower, _this2.SVG.volumeOff);
                    _this2.__LIST__.volumeIcon = _this2.CBASE.getByTagName("svg", _this2.__LIST__.volumePower);
                } else if (_this2.music.volume > 0 && _this2.music.volume <= 0.5) {
                    _this2.CBASE.replaceInner(_this2.__LIST__.volumePower, _this2.SVG.volumeDown);
                    _this2.__LIST__.volumeIcon = _this2.CBASE.getByTagName("svg", _this2.__LIST__.volumePower);
                } else if (_this2.music.volume > 0.5 && _this2.music.volume <= 1) {
                    _this2.CBASE.replaceInner(_this2.__LIST__.volumePower, _this2.SVG.volumeUp);
                    _this2.__LIST__.volumeIcon = _this2.CBASE.getByTagName("svg", _this2.__LIST__.volumePower);
                } else {
                    console.log("Unexcepted Volume:" + _this2.music.volume);
                }
            };
            if (vl === undefined) {
                this.__LIST__.volumeLine.style.width = this.music.volume * 100 + "%";
                checkLevel();
                return this.isMuted() ? 0 : this.music.volume;
            } else {
                if (vl === 0) {
                    this.music.muted = true;
                    checkLevel();
                } else {
                    this.music.volume = vl;
                    checkLevel();
                }
            }
        }
    }, {
        key: "isMuted",
        value: function isMuted() {
            return this.music.muted;
        }
    }, {
        key: "play",
        value: function play() {
            if (this.music.seeking === true) return this;
            this.music.play();
            return this;
        }
    }, {
        key: "pause",
        value: function pause() {
            if (this.music.seeking === true) return;
            this.music.pause();
            return this;
        }
    }, {
        key: "previous",
        value: function previous() {
            this.emitter.emit("previous");
            if (this.now === 0) return;
            this.now--;
            this.toggle().play();
            return this;
        }
    }, {
        key: "next",
        value: function next() {
            this.emitter.emit("next");
            if (this.now === this.options.list.length - 1) return;
            this.now++;
            this.toggle().play();
            return this;
        }
    }, {
        key: "to",
        value: function to(now) {
            this.now = now;
            this.toggle();
            this.play();
            return this;
        }
    }, {
        key: "toggle",
        value: function toggle() {
            var now = arguments.length <= 0 || arguments[0] === undefined ? this.now : arguments[0];

            this.emitter.emit("toggle");
            var list = this.options.list[now],
                dom = this.__LIST__;
            this.music.pause();
            //if(this.music.ended)this.music.load();
            var _ref = [list.image, list.name, list.artist, list.url];
            dom.img.src = _ref[0];
            dom.name.innerHTML = _ref[1];
            dom.artist.innerHTML = _ref[2];
            this.music.src = _ref[3];

            this.refreshLyric();
            if (!this.hasLyric(this.now)) this.hideLyric();
            //this.__LIST__.lyricBody.style.transform = "";
            this.CBASE.style(this.__LIST__.lyricBody, "transform", "");
            //this.play();
            return this;
        }
    }, {
        key: "isPaused",
        value: function isPaused(func) {
            if (func !== undefined) func();
            return this.music.paused;
        }
    }, {
        key: "hasLyric",
        value: function hasLyric() {
            var id = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var func = arguments[1];

            if (func !== undefined) func();
            return this.options.list[id].lyric !== undefined;
        }
    }, {
        key: "showLyric",
        value: function showLyric() {
            this.emitter.emit("slideLyric", true);
            if (this.hasLyric(this.now)) this.__LIST__.lyric.classList.remove("invisible");
            if (!this.__LIST__.list.classList.contains("invisible")) this.hideList();
            return this;
        }
    }, {
        key: "hideLyric",
        value: function hideLyric() {
            this.emitter.emit("slideLyric", false);
            this.__LIST__.lyric.classList.add("invisible");
            return this;
        }
    }, {
        key: "hasList",
        value: function hasList(func) {
            if (func !== undefined) func();
            return this.options.list.length > 1;
        }
    }, {
        key: "showList",
        value: function showList(func) {
            this.emitter.emit("slideList", true);
            this.__LIST__.list.classList.remove("invisible");
            if (!this.__LIST__.lyric.classList.contains("invisible")) this.hideLyric();
            if (func !== undefined) func();
            return this;
        }
    }, {
        key: "hideList",
        value: function hideList(func) {
            this.emitter.emit("slideList", false);
            this.__LIST__.list.classList.add("invisible");
            if (func !== undefined) func();
            return this;
        }
    }, {
        key: "refreshList",
        value: function refreshList(func) {
            var _this3 = this;

            this.emitter.emit("changeList");
            //let __SELF__ = this;
            var list = this.options.list,
                lb = this.__LIST__.listBody;
            lb.innerHTML = "";

            var _loop = function _loop(i) {
                var div = document.createElement("div");
                div.innerHTML = '<span class="music-name">' + list[i].name + '</span><span class="music-artist">' + list[i].artist + '</span>';
                div = lb.appendChild(div);
                div.addEventListener("click", function () {
                    _this3.to(i);
                });
            };

            for (var i = 0; i <= list.length - 1; i++) {
                _loop(i);
            }
            if (func !== undefined) func();
        }
    }, {
        key: "add",
        value: function add(u, func) {
            var _this4 = this;

            //let __SELF__ = this;
            var ln = this.options.list.push(u);
            var div = document.createElement("div");
            div.innerHTML = '<span class="music-name">' + u.name + '</span><span class="music-artist">' + u.artist + '</span>';
            div = this.__LIST__.listBody.appendChild(div);
            div.addEventListener("click", function () {
                _this4.to(ln - 1);
            });
            if (func !== undefined) func();
        }
    }, {
        key: "lyric",
        value: function lyric() {
            var content = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

            if (content === undefined) {
                if (this.hasLyric(this.now)) return this.options.list[this.now].lyric;
            } else {
                this.options.list[this.now].lyric = content;
                this.refreshLyric();
            }
            return this;
        }
    }, {
        key: "refreshLyric",
        value: function refreshLyric() {
            //REQUIRE LYRIC...
            this.__LIST__.lyricBody.innerHTML = "";
            if (!this.hasLyric(this.now)) return;
            var lr = this.options.list[this.now].lyric;
            //START LRC BASEING...
            lr = lr.split("\n");
            var lrcs = [];
            for ( /* let content of lr */var i = 0, content = lr[i]; i < lr.length; i++, content = lr[i]) {
                console.log(content);
                if (typeof content !== "string") break;
                var onelrc = content.split(/\[|\]\[|\]/gi);
                for (var _i = 0; _i < onelrc.length - 1; _i++) {
                    if (onelrc[_i] === "" && _i !== onelrc.length - 1) {
                        onelrc.splice(_i, 1);
                        _i--;
                        continue;
                    }

                    if (onelrc[_i].match(/\d{1,}\:\d{1,}/gi)) {
                        var lyricsarray = onelrc[_i].split(/\:|\./gi);
                        switch (lyricsarray.length) {
                            case 2:
                                onelrc[_i] = parseInt(lyricsarray[0]) * 60 + parseInt(lyricsarray[1]);
                                break;
                            case 3:
                                onelrc[_i] = parseInt(lyricsarray[0]) * 60 + parseInt(lyricsarray[1]) + parseFloat("0." + lyricsarray[2]);
                                break;
                            default:
                                throw new Error("Time not be Found!");
                        }
                    }
                }

                lrcs.push(onelrc);
            }
            //LRC BASED
            var lyric = [];
            for (var _i2 = lrcs.length - 1; _i2 >= 0; _i2--) {
                if (lrcs[_i2].length > 2) {
                    for (var count = lrcs[_i2].length - 1; count >= 0; count--) {
                        if (count !== lrcs[_i2].length - 1) {
                            lyric.push({ time: lrcs[_i2][count], content: lrcs[_i2][lrcs[_i2].length - 1] });
                        }
                    }
                } else {
                    lyric.push({ time: lrcs[_i2][0], content: lrcs[_i2][1] });
                }
            }

            lyric.sort(function (a, b) {
                return a.time - b.time;
            });
            this.__LYRIC__ = lyric;
            for (var _i3 = 0; _i3 <= lyric.length - 1; _i3++) {
                var div = document.createElement("lrc");
                div.innerHTML = lyric[_i3].content;
                this.__LIST__.lyricBody.appendChild(div);
            }
            this.emitter.emit("changeLyric");
        }
    }, {
        key: "updateTime",
        value: function updateTime() {
            var time = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
            var func = arguments[1];

            if (time !== undefined) this.music.currentTime = parseInt(time);
            if (this.dragging.contain === false) this.__LIST__.timeLine.style.width = this.music.currentTime / this.music.duration * 100 + "%";
            //if(this.isPaused()) this.play();
            if (func !== undefined) func(this.music.currentTime);
            return this.music.currentTime;
        }

        /*
         Function:slideLyric
         use <numberic>time
         如果LYRIC到最初(没有前一个DIV时),确定NOW.
         如果LYRIC为中间,确定时间,NOW.
         [i]:当前歌词
         [i-1]:上一个歌词
         [i+1]:下一个歌词
         * 此时应操纵下一个歌词!!!!(重要) *
         */

    }, {
        key: "slideLyric",
        value: function slideLyric(time) {
            if (this.__LIST__.lyric.classList.contains("invisible")) return;
            var lyricToTop = void 0,
                halfBody = void 0,
                translateY = void 0;
            for (var i = this.__LYRIC__.length - 1; i >= 0; i--) {
                if (this.__LYRIC__[i + 1] !== undefined && this.__LYRIC__[i].time < time && this.__LYRIC__[i + 1].time > time || this.__LYRIC__[i + 1] === undefined && this.__LYRIC__[i].time < time) {
                    if (this.__LIST__.lyricBody.querySelector(".now") !== null && this.__LIST__.lyricBody.querySelector(".now") !== this.__LIST__.lyricBody.childNodes[i + 1]) this.__LIST__.lyricBody.querySelector(".now").classList.toggle("now");
                    this.__LIST__.lyricBody.childNodes[i].classList.toggle("now");
                    //以下四句借鉴了KK的写法,感谢Kookxiang.
                    var _lyricToTop = this.__LIST__.lyricBody.childNodes[i].offsetTop - this.__LIST__.lyricBody.childNodes[0].offsetTop - 0.5 * this.__LIST__.lyricBody.childNodes[i].clientHeight;
                    var _halfBody = 0.5 * this.__LIST__.lyric.clientHeight - this.__LIST__.lyricBody.childNodes[i].clientHeight;
                    var _translateY = -(_lyricToTop - _halfBody);
                    //this.__LIST__.lyricBody.style.transform = "translateY(" + translateY + "px)";
                    this.CBASE.style(this.__LIST__.lyricBody, "transform", "translateY(" + _translateY + "px)");
                }
            }
        }
    }, {
        key: "length",
        get: function get() {
            return this.options.list.length;
        },
        set: function set(length) {
            throw new SyntaxError("Read-only Property.");
        }
    }]);

    return cPlayer;
}();

//Object.assign 解决方案


if (typeof Object.assign != 'function') {
    Object.assign = function (target) {
        'use strict';

        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}

var cEmitter = function () {
    function cEmitter(typeList) {
        _classCallCheck(this, cEmitter);

        if (typeList) {
            this.events = typeList;
        } else {
            this.events = [];
        }
    }

    _createClass(cEmitter, [{
        key: "on",
        value: function on(eventName, func) {
            //func的参数这样写:function([参数A,参数B]){}或者箭头函数([参数A,参数B])=>{}
            if (this.events[eventName] && this.events[eventName].push !== undefined && typeof func === "function") {
                this.events[eventName].push(func);
            } else if (this.events[eventName] === undefined || this.events[eventName].push === undefined) {
                this.events[eventName] = [];
            } else {
                throw new TypeError("Uncaught Unexcepted TypeError.");
            }
            return this;
        }
    }, {
        key: "emit",
        value: function emit(eventName) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            for (var i = 0; i < this.events[eventName].length; i++) {
                this.events[eventName][i](args);
            }
            return this;
            //也许会有emitter.emit(..).emit(..)的写法?一次执行俩事件,实在不知道哪里有用...
        }
    }]);

    return cEmitter;
}();

var cBase = function () {
    function cBase() {
        var rootNode = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];

        _classCallCheck(this, cBase);

        this.root = rootNode;
        for (var styleList = document.documentElement.style, i = styleList.length; i > 0; i--) {
            if (styleList[i].indexOf("-webkit-") !== -1) {
                this.browser = "webkit";
                break;
            }
            if (styleList[i].indexOf("-moz-") !== -1) {
                this.browser = "moz";
                break;
            }
            if (styleList[i].indexOf("-o-") !== -1) {
                this.browser = "o";
                break;
            }
            if (styleList[i].indexOf("-ms-") !== -1) {
                this.browser = "ms";
                break;
            }
        }
    }

    _createClass(cBase, [{
        key: "replace",
        value: function replace(oldElement, newElement) {
            //newElement 不存在于oldElement 的父元素中,首先载入.
            newElement = newElement.cloneNode(true);
            oldElement.parentNode.appendChild(newElement);
            oldElement.parentNode.removeChild(oldElement);
            //顺便如果有值为oldElement的变量,请重新赋值.
        }
    }, {
        key: "replaceInner",
        value: function replaceInner(element, innerContent) {
            //进行一次简单的封装
            element.innerHTML = innerContent;
        }
    }, {
        key: "getByClass",
        value: function getByClass(className, parentElement) {
            return parentElement != undefined ? parentElement.getElementsByClassName(className)[0] : this.root.getElementsByClassName(className)[0];
        }
    }, {
        key: "getByTagName",
        value: function getByTagName(tagName, parentElement) {
            return parentElement != undefined ? parentElement.getElementsByTagName(tagName)[0] : this.root.getElementsByTagName(tagName)[0];
        }
    }, {
        key: "rand",
        value: function rand(start, end) {
            if (start === undefined || end === undefined) return Math.random();
            if (start > end) throw new RangeError("the EndNumber must be bigger than the StartNumber");
            return (end - start) * Math.random() + start;
        }
    }, {
        key: "style",
        value: function style(dom, property, content) {
            if (!dom.style[property] && this.browser !== "") {
                dom.style[this.browser + property.slice(0, 1).toUpperCase() + property.slice(1)] = content;
            } else {
                dom.style[property] = content;
            }
        }
    }]);

    return cBase;
}();
//# sourceMappingURL=cplayer.js.map
