"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PopupClass = function () {
    function PopupClass(elm, timeout, onClickFunction) {
        _classCallCheck(this, PopupClass);

        this.e = elm;
        this.a = [];
        this.n = 0;
        this.o = 0;
        if (!timeout) this.t = false;else if (typeof timeout === "number" || typeof timeout === "boolean") this.t = timeout;else this.t = 5000;
        this.f = onClickFunction || false;
    }

    _createClass(PopupClass, [{
        key: "show",
        value: function show(text, name) {
            this.h = typeof name === "string" && name.length !== 0;
            var id = "PM_message" + this.n + "_" + new Date().getTime(),
                e = void 0,
                _this = this;

            if (typeof this.e === "string") {
                var tmpDiv = document.createElement('div'),
                    i = void 0,
                    c = NaN,
                    b = 1,
                    closeBTN = void 0,
                    header = void 0,
                    body = void 0;
                tmpDiv.innerHTML = this.e;
                e = tmpDiv.childNodes[0];
                e.id = id;
                c = e.getElementsByTagName("*");
                for (i = 0; i < c.length; i++) {
                    if (c[i].id === "PM_close_BTN") closeBTN = c[i];else if (c[i].id === "PM_body") body = c[i];else if (c[i].id === "PM_header") header = c[i];
                }

                if (closeBTN) closeBTN.addEventListener("click", this._closeMessageButton.bind(this, id));
                if (header) {
                    header.addEventListener("mousedown", this._swipe.bind(this, _this));
                    //header.addEventListener("touchstart", this._swipe.bind(this, _this));
                }
                if (body) {
                    if (header) {
                        this.h = true;
                        if (this.f) body.addEventListener("click", this.f);
                    } else {
                        this.h = false;
                        body.addEventListener("mousedown", this._swipe.bind(this, _this));
                    }
                }
            } else e = this._makeMessage(id, name, text);

            if (this.a.length > 0) {
                var _i = void 0,
                    _e = void 0,
                    h = 0;
                for (_i = 0; _i < this.a.length; _i++) {
                    _e = document.getElementById(this.a[this.a.length - 1 - _i].id);
                    h = h + _e.offsetHeight + 6;
                    if (_i === 0) h = h + 6;
                    _e.style.marginBottom = h + "px";
                }
            }

            this.a.push(e);
            this.n++;
            document.body.appendChild(e);

            if (typeof this.e !== "string") {
                var _i2 = 0,
                    _c = e.getElementsByTagName("*");
                for (_i2 = 0; _i2 < _c.length; _i2++) {
                    if (_c[_i2].id === "PM_body") {
                        if (!this.h) _c[_i2].style.height = e.offsetHeight + "px";else _c[_i2].style.height = e.offsetHeight - 28 + "px";
                    }
                }
            }
            if (this.t) setTimeout(function () {
                _this._closeMessageButton(id);
            }, this.t);
        }
    }, {
        key: "hideAll",
        value: function hideAll() {
            if (this.a.length > 0) {
                var i = void 0;
                for (i = 0; i < this.a.length; i++) {
                    this._closeMessageButton(this.a[i].id);
                }
            }
        }
    }, {
        key: "_makeMessage",
        value: function _makeMessage(id, messageName, messageText) {
            var _this2 = this;

            var messageBlock = document.createElement('div'),
                _this = this,
                e = void 0,
                e1 = void 0,
                w = 200,
                mH = 200;
            messageBlock.className = "PM_message";
            messageBlock.id = id;

            if (_typeof(this.e) === "object") {
                if (typeof this.e.width === "number") w = this.e.width;
                if (typeof this.e.maxHeight === "number") mH = this.e.maxHeight;
                if (w < 100) w = 100;
                messageBlock.style.width = w + "px";
                messageBlock.style.maxHeight = mH + "px";
            }

            if (this.h) {
                e = document.createElement('div');
                e.className = "PM_header";
                e.id = "PM_header";
                e.addEventListener("mousedown", this._swipe.bind(this, _this));
                //e.addEventListener("touchstart", this._swipe.bind(this, _this));
                e1 = document.createElement('p');
                e1.innerHTML = messageName;
                e.appendChild(e1);
                e1 = document.createElement('div');
                e1.className = "PM_close_button";
                e1.id = "PM_close_BTN";
                e1.onclick = function () {
                    return _this2._closeMessageButton(id);
                };
                e1.title = "Close";
                e.appendChild(e1);
                messageBlock.appendChild(e);
            }
            e = document.createElement('div');
            e.className = "PM_body";
            e.id = "PM_body";
            if (!this.h) {
                e.style.cursor = "pointer";
                e.addEventListener("mousedown", this._swipe.bind(this, _this));
            }
            if (this.f && this.h) {
                e.style.cursor = "pointer";
                e.onclick = function () {
                    return _this2.f();
                };
            }
            e.innerHTML = messageText;
            messageBlock.appendChild(e);
            return messageBlock;
        }
    }, {
        key: "_closeMessageButton",
        value: function _closeMessageButton(id) {
            var e = document.getElementById(id),
                i = void 0,
                tmp = e,
                tmpH = 0,
                _this = this;
            if (e) {
                e.style.opacity = _this.o;
                e.style.marginRight = "-" + (e.offsetWidth + 30) + "px";
                tmpH = e.offsetHeight;
                setTimeout(function () {
                    if (tmp.parentNode) tmp.parentNode.removeChild(tmp);
                }, 400);
                setTimeout(function () {
                    for (i = 0; i < _this.a.length; i++) {
                        if (id === _this.a[i].id) {
                            if (i === _this.a.length - 1) {
                                var a = void 0,
                                    h = 0;
                                for (a = 0; a < _this.a.length - 1; a++) {
                                    if (_this.a.length - 1 === 0) break;
                                    e = document.getElementById(_this.a[a].id);
                                    h = parseInt(e.style.marginBottom.replace('px', '')) - tmpH - 6;
                                    e.style.marginBottom = h + "px";
                                }
                            } else {
                                var _a = void 0,
                                    _h = 0;
                                for (_a = 0; _a < _this.a.length; _a++) {
                                    e = document.getElementById(_this.a[_a].id);
                                    _h = parseInt(e.style.marginBottom.replace('px', '')) - tmpH - 6;
                                    if (_a === _this.a.length - 1) _h = parseInt(e.style.marginBottom.replace('px', ''));
                                    if (_this.a[_a + 1] && _this.a[_a + 1].id === _this.a[i + 1].id) break;
                                    e.style.marginBottom = _h + "px";
                                }
                            }
                            _this.a.splice(i, 1);
                        }
                    }
                }, 200);
            }
        }
    }, {
        key: "_swipe",
        value: function _swipe(_this, event) {
            if (event.target.id !== "PM_close_BTN") {
                var mousePosX = event.clientX || Math.round(event.touches[0].clientX),
                    e = void 0,
                    d = 0,
                    maxL = 200,
                    blockX = void 0,
                    startTime = new Date().getTime(),
                    eID = event.target.id;
                if (~event.target.parentNode.id.indexOf("PM_message")) e = event.target.parentNode;else if (~event.target.parentNode.parentNode.id.indexOf("PM_message")) {
                    e = event.target.parentNode.parentNode;
                } else if (~event.target.parentNode.parentNode.parentNode.id.indexOf("PM_message")) {
                    e = event.target.parentNode.parentNode.parentNode;
                } else if (~event.target.parentNode.parentNode.parentNode.parentNode.id.indexOf("PM_message")) {
                    e = event.target.parentNode.parentNode.parentNode.parentNode;
                }
                blockX = e.getBoundingClientRect().left;
                e.style.transitionDuration = "0s";
                var diffX = mousePosX - blockX;

                document.onmousemove = function (event) {
                    var posX = event.clientX || Math.round(event.touches[0].clientX),
                        aX = posX - diffX;
                    if (Math.abs(posX - mousePosX) > 10) {
                        _this.o = 1;
                        d = posX - mousePosX;
                        _this.o = _this.o - Math.abs(d) / maxL;
                        e.style.opacity = _this.o;
                        e.style.left = aX + 'px';
                    }
                };
                document.onmouseup = function () {
                    var time = new Date().getTime() - startTime;
                    if (Math.abs(d) > maxL / 2.5 || Math.abs(d) > maxL / 4 && time < 100) {
                        var op = _this.o,
                            lr = 10;
                        var timer = setInterval(function () {
                            if (op <= 0.01) clearInterval(timer);
                            if (d > 0) lr = -lr;
                            e.style.left = e.getBoundingClientRect().left - lr + "px";
                            e.style.opacity = op;
                            e.style.filter = 'alpha(opacity=' + op * 100 + ")";
                            op -= op * 0.1;
                            lr += 0.05;
                        }, 10);
                        _this.o = op;
                        _this._closeMessageButton(e.id);
                    } else if (Math.abs(d) < 5) {
                        var c = e.getElementsByTagName("*"),
                            h = false,
                            i = void 0;
                        for (i = 0; i < c.length; i++) {
                            if (c[i].id === "PM_header") h = true;
                        }
                        if (_this.f && !h) _this.f();
                        e.style.left = "auto";
                        e.style.transitionDuration = "0.4s";
                    } else {
                        var _op = _this.o;
                        var _timer = setInterval(function () {
                            if (_op >= 1) clearInterval(_timer);
                            e.style.opacity = _op;
                            e.style.filter = 'alpha(opacity=' + _op * 100 + ")";
                            _op += _op * 0.2;
                        }, 10);
                        e.style.left = "auto";
                        e.style.transitionDuration = "0.4s";
                    }
                    document.onmouseup = function () {};
                    document.onmousemove = function () {};
                };
            }
        }
    }]);

    return PopupClass;
}();
