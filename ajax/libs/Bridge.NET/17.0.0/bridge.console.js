/**
 * @version   : 17.0.0 - Bridge.NET
 * @author    : Object.NET, Inc. http://bridge.net/
 * @copyright : Copyright 2008-2018 Object.NET, Inc. http://object.net/
 * @license   : See license.txt and https://github.com/bridgedotnet/Bridge/blob/master/LICENSE.md
 */
Bridge.assembly("Bridge", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.Console", {
        statics: {
            fields: {
                BODY_WRAPPER_ID: null,
                CONSOLE_MESSAGES_ID: null,
                position: null,
                instance$1: null
            },
            props: {
                instance: {
                    get: function () {
                        if (Bridge.Console.instance$1 == null) {
                            Bridge.Console.instance$1 = new Bridge.Console();
                        }

                        return Bridge.Console.instance$1;
                    }
                }
            },
            ctors: {
                init: function () {
                    this.BODY_WRAPPER_ID = "bridge-body-wrapper";
                    this.CONSOLE_MESSAGES_ID = "bridge-console-messages";
                    this.position = "horizontal";
                }
            },
            methods: {
                initConsoleFunctions: function () {
                    var wl = System.Console.WriteLine;
                    var w = System.Console.Write;
                    var clr = System.Console.Clear;
                    var debug = System.Diagnostics.Debug.writeln;
                    var con = Bridge.global.console;

                    if (wl) {
                        System.Console.WriteLine = function (value) {
                            wl(value);
                            Bridge.Console.log(value, true);
                        }
                    }

                    if (w) {
                        System.Console.Write = function (value) {
                            w(value);
                            Bridge.Console.log(value, false);
                        }
                    }

                    if (clr) {
                        System.Console.Clear = function () {
                            clr();
                            Bridge.Console.clear();
                        }
                    }

                    if (debug) {
                        System.Diagnostics.Debug.writeln = function (value) {
                            debug(value);
                            Bridge.Console.debug(value);
                        }
                    }

                    if (con && con.error) {
                        var err = con.error;

                        con.error = function (msg) {
                            err.apply(con, arguments);
                            Bridge.Console.error(msg);
                        }
                    }

                    if (Bridge.isDefined(Bridge.global.window)) {
                        Bridge.global.window.addEventListener("error", function (e) {
                            Bridge.Console.error(System.Exception.create(e));
                        });
                    }
                },
                logBase: function (value, newLine, messageType) {
                    if (newLine === void 0) { newLine = true; }
                    if (messageType === void 0) { messageType = 0; }
                    var self = Bridge.Console.instance;
                    var v = "";

                    if (value != null) {
                        var hasToString = value.ToString !== undefined;
                        v = (value.toString == { }.toString && !hasToString) ? JSON.stringify(value, null, 2) : hasToString ? value.ToString() : value.toString();
                    }

                    if (self.bufferedOutput != null) {
                        self.bufferedOutput = (self.bufferedOutput || "") + (v || "");

                        if (newLine) {
                            self.bufferedOutput = (self.bufferedOutput || "") + ("\n" || "");
                        }

                        return;
                    }

                    Bridge.Console.show();

                    if (self.isNewLine || self.currentMessageElement == null) {
                        var m = self.buildConsoleMessage(v, messageType);
                        self.consoleMessages.appendChild(m);
                        self.currentMessageElement = m;
                    } else {
                        var m1 = Bridge.unbox(self.currentMessageElement);
                        m1.lastChild.innerHTML = (m1.lastChild.innerHTML || "") + (v || "");
                    }

                    self.isNewLine = newLine;
                },
                error: function (value) {
                    Bridge.Console.logBase(value, true, 2);
                },
                debug: function (value) {
                    Bridge.Console.logBase(value, true, 1);
                },
                log: function (value, newLine) {
                    if (newLine === void 0) { newLine = true; }
                    Bridge.Console.logBase(value, newLine);
                },
                clear: function () {
                    var self = Bridge.Console.instance$1;

                    if (self == null) {
                        return;
                    }

                    var m = self.consoleMessages;

                    if (m != null) {
                        while (m.firstChild != null) {
                            m.removeChild(m.firstChild);
                        }

                        self.currentMessageElement = null;
                    }

                    if (self.bufferedOutput != null) {
                        self.bufferedOutput = "";
                    }

                    self.isNewLine = false;
                },
                hide: function () {
                    if (Bridge.Console.instance$1 == null) {
                        return;
                    }

                    var self = Bridge.Console.instance;

                    if (self.hidden) {
                        return;
                    }

                    self.close();
                },
                show: function () {
                    var self = Bridge.Console.instance;

                    if (!self.hidden) {
                        return;
                    }

                    self.init(true);
                },
                toggle: function () {
                    if (Bridge.Console.instance.hidden) {
                        Bridge.Console.show();
                    } else {
                        Bridge.Console.hide();
                    }
                }
            }
        },
        fields: {
            svgNS: null,
            consoleHeight: null,
            consoleHeaderHeight: null,
            tooltip: null,
            consoleWrap: null,
            consoleMessages: null,
            bridgeIcon: null,
            bridgeIconPath: null,
            bridgeConsoleLabel: null,
            closeBtn: null,
            closeIcon: null,
            closeIconPath: null,
            consoleHeader: null,
            consoleBody: null,
            hidden: false,
            isNewLine: false,
            currentMessageElement: null,
            bufferedOutput: null
        },
        ctors: {
            init: function () {
                this.svgNS = "http://www.w3.org/2000/svg";
                this.consoleHeight = "300px";
                this.consoleHeaderHeight = "35px";
                this.hidden = true;
                this.isNewLine = false;
            },
            ctor: function () {
                this.$initialize();
                this.init();
            }
        },
        methods: {
            init: function (reinit) {
                if (reinit === void 0) { reinit = false; }
                this.hidden = false;

                var consoleWrapStyles = Bridge.fn.bind(this, $asm.$.Bridge.Console.f1)(new (System.Collections.Generic.Dictionary$2(System.String,System.String))());

                var consoleHeaderStyles = $asm.$.Bridge.Console.f2(new (System.Collections.Generic.Dictionary$2(System.String,System.String))());

                var consoleBodyStyles = $asm.$.Bridge.Console.f3(new (System.Collections.Generic.Dictionary$2(System.String,System.String))());

                this.bridgeIcon = this.bridgeIcon || document.createElementNS(this.svgNS, "svg");

                var items = Bridge.fn.bind(this, $asm.$.Bridge.Console.f4)(new (System.Collections.Generic.Dictionary$2(System.String,System.String))());

                this.setAttributes(this.bridgeIcon, items);

                this.bridgeIconPath = this.bridgeIconPath || document.createElementNS(this.svgNS, "path");

                var items2 = new (System.Collections.Generic.Dictionary$2(System.String,System.String))();
                items2.set("d", "M19 14.4h2.2V9.6L19 7.1v7.3zm4.3-2.5v2.5h2.2l-2.2-2.5zm-8.5 2.5H17V4.8l-2.2-2.5v12.1zM0 14.4h3l7.5-8.5v8.5h2.2V0L0 14.4z");
                items2.set("fill", "#555");

                this.setAttributes(this.bridgeIconPath, items2);

                this.bridgeConsoleLabel = this.bridgeConsoleLabel || document.createElement("span");
                this.bridgeConsoleLabel.innerHTML = "Bridge Console";

                this.closeBtn = this.closeBtn || document.createElement("span");
                this.closeBtn.setAttribute("style", "position: relative;display: inline-block;float: right;cursor: pointer");

                this.closeIcon = this.closeIcon || document.createElementNS(this.svgNS, "svg");

                var items3 = Bridge.fn.bind(this, $asm.$.Bridge.Console.f5)(new (System.Collections.Generic.Dictionary$2(System.String,System.String))());

                this.setAttributes(this.closeIcon, items3);

                this.closeIconPath = this.closeIconPath || document.createElementNS(this.svgNS, "path");

                var items4 = $asm.$.Bridge.Console.f6(new (System.Collections.Generic.Dictionary$2(System.String,System.String))());

                this.setAttributes(this.closeIconPath, items4);

                this.tooltip = this.tooltip || document.createElement("div");
                this.tooltip.innerHTML = "Refresh page to open Bridge Console";

                this.tooltip.setAttribute("style", "position: absolute;right: 30px;top: -6px;white-space: nowrap;padding: 7px;border-radius: 3px;background-color: rgba(0, 0, 0, 0.75);color: #eee;text-align: center;visibility: hidden;opacity: 0;-webkit-transition: all 0.25s ease-in-out;transition: all 0.25s ease-in-out;z-index: 1;");

                Bridge.Console.position = "horizontal";

                if (Bridge.referenceEquals(Bridge.Console.position, "horizontal")) {
                    this.wrapBodyContent();

                    consoleWrapStyles.set("right", "0");
                    consoleHeaderStyles.set("border-top", "1px solid #a3a3a3");
                    consoleBodyStyles.set("height", this.consoleHeight);
                } else if (Bridge.referenceEquals(Bridge.Console.position, "vertical")) {
                    var consoleWidth = "400px";
                    document.body.style.marginLeft = consoleWidth;

                    consoleWrapStyles.set("top", "0");
                    consoleWrapStyles.set("width", consoleWidth);
                    consoleWrapStyles.set("border-right", "1px solid #a3a3a3");
                    consoleBodyStyles.set("height", "100%");
                }

                this.consoleWrap = this.consoleWrap || document.createElement("div");
                this.consoleWrap.setAttribute("style", this.obj2Css(consoleWrapStyles));

                this.consoleHeader = this.consoleHeader || document.createElement("div");
                this.consoleHeader.setAttribute("style", this.obj2Css(consoleHeaderStyles));

                this.consoleBody = this.consoleBody || document.createElement("div");
                this.consoleBody.setAttribute("style", this.obj2Css(consoleBodyStyles));

                this.consoleMessages = this.consoleMessages || document.createElement("ul");
                var cm = this.consoleMessages;
                cm.id = Bridge.Console.CONSOLE_MESSAGES_ID;

                cm.setAttribute("style", "margin: 0;padding: 0;list-style: none;");

                if (!reinit) {
                    this.bridgeIcon.appendChild(this.bridgeIconPath);
                    this.closeIcon.appendChild(this.closeIconPath);
                    this.closeBtn.appendChild(this.closeIcon);
                    this.closeBtn.appendChild(this.tooltip);

                    this.consoleHeader.appendChild(this.bridgeIcon);
                    this.consoleHeader.appendChild(this.bridgeConsoleLabel);
                    this.consoleHeader.appendChild(this.closeBtn);

                    this.consoleBody.appendChild(cm);

                    this.consoleWrap.appendChild(this.consoleHeader);
                    this.consoleWrap.appendChild(this.consoleBody);

                    document.body.appendChild(this.consoleWrap);

                    this.closeBtn.addEventListener("click", Bridge.fn.cacheBind(this, this.close));

                    this.closeBtn.addEventListener("mouseover", Bridge.fn.cacheBind(this, this.showTooltip));
                    this.closeBtn.addEventListener("mouseout", Bridge.fn.cacheBind(this, this.hideTooltip));
                }
            },
            showTooltip: function () {
                var self = Bridge.Console.instance;
                self.tooltip.style.right = "20px";
                self.tooltip.style.visibility = "visible";
                self.tooltip.style.opacity = "1";
            },
            hideTooltip: function () {
                var self = Bridge.Console.instance;
                self.tooltip.style.right = "30px";
                self.tooltip.style.opacity = "0";
            },
            close: function () {
                this.hidden = true;

                this.consoleWrap.style.display = "none";

                if (Bridge.referenceEquals(Bridge.Console.position, "horizontal")) {
                    this.unwrapBodyContent();
                } else if (Bridge.referenceEquals(Bridge.Console.position, "vertical")) {
                    document.body.removeAttribute("style");
                }
            },
            wrapBodyContent: function () {
                if (document.body == null) {
                    return;
                }

                var bodyStyle = document.defaultView.getComputedStyle(document.body, null);

                var bodyPaddingTop = bodyStyle.paddingTop;
                var bodyPaddingRight = bodyStyle.paddingRight;
                var bodyPaddingBottom = bodyStyle.paddingBottom;
                var bodyPaddingLeft = bodyStyle.paddingLeft;

                var bodyMarginTop = bodyStyle.marginTop;
                var bodyMarginRight = bodyStyle.marginRight;
                var bodyMarginBottom = bodyStyle.marginBottom;
                var bodyMarginLeft = bodyStyle.marginLeft;

                var div = document.createElement("div");
                div.id = Bridge.Console.BODY_WRAPPER_ID;
                div.setAttribute("style", "height: calc(100vh - " + (this.consoleHeight || "") + " - " + (this.consoleHeaderHeight || "") + ");" + "margin-top: calc(-1 * " + "(" + (((bodyMarginTop || "") + " + " + (bodyPaddingTop || "")) || "") + "));" + "margin-right: calc(-1 * " + "(" + (((bodyMarginRight || "") + " + " + (bodyPaddingRight || "")) || "") + "));" + "margin-left: calc(-1 * " + "(" + (((bodyMarginLeft || "") + " + " + (bodyPaddingLeft || "")) || "") + "));" + "padding-top: calc(" + (((bodyMarginTop || "") + " + " + (bodyPaddingTop || "")) || "") + ");" + "padding-right: calc(" + (((bodyMarginRight || "") + " + " + (bodyPaddingRight || "")) || "") + ");" + "padding-bottom: calc(" + (((bodyMarginBottom || "") + " + " + (bodyPaddingBottom || "")) || "") + ");" + "padding-left: calc(" + (((bodyMarginLeft || "") + " + " + (bodyPaddingLeft || "")) || "") + ");" + "overflow-x: auto;" + "box-sizing: border-box !important;");

                while (document.body.firstChild != null) {
                    div.appendChild(document.body.firstChild);
                }

                document.body.appendChild(div);
            },
            unwrapBodyContent: function () {
                var bridgeBodyWrap = document.getElementById(Bridge.Console.BODY_WRAPPER_ID);

                if (bridgeBodyWrap == null) {
                    return;
                }

                while (bridgeBodyWrap.firstChild != null) {
                    document.body.insertBefore(bridgeBodyWrap.firstChild, bridgeBodyWrap);
                }

                document.body.removeChild(bridgeBodyWrap);
            },
            buildConsoleMessage: function (message, messageType) {
                var messageItem = document.createElement("li");
                messageItem.setAttribute("style", "padding:5px 10px;border-bottom:1px solid #f0f0f0;position:relative;");

                var messageIcon = document.createElementNS(this.svgNS, "svg");

                var items5 = Bridge.fn.bind(this, $asm.$.Bridge.Console.f7)(new (System.Collections.Generic.Dictionary$2(System.String,System.String))());

                this.setAttributes(messageIcon, items5);

                var color = "#555";

                if (messageType === 2) {
                    color = "#d65050";
                } else if (messageType === 1) {
                    color = "#1800FF";
                }

                var messageIconPath = document.createElementNS(this.svgNS, "path");

                var items6 = new (System.Collections.Generic.Dictionary$2(System.String,System.String))();

                items6.set("d", "M3.8 3.5L.7 6.6s-.1.1-.2.1-.1 0-.2-.1l-.2-.3C0 6.2 0 6.2 0 6.1c0 0 0-.1.1-.1l2.6-2.6L.1.7C0 .7 0 .6 0 .6 0 .5 0 .5.1.4L.4.1c0-.1.1-.1.2-.1s.1 0 .2.1l3.1 3.1s.1.1.1.2-.1.1-.2.1z");
                items6.set("fill", color);

                this.setAttributes(messageIconPath, items6);

                messageIcon.appendChild(messageIconPath);

                var messageContainer = document.createElement("div");
                messageContainer.innerText = message;
                messageContainer.setAttribute("style", "color:" + (color || "") + ";white-space:pre;margin-left:12px;line-height:1.4;min-height:18px;");

                messageItem.appendChild(messageIcon);
                messageItem.appendChild(messageContainer);

                return messageItem;
            },
            setAttributes: function (el, attrs) {
                var $t;
                $t = Bridge.getEnumerator(attrs);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        el.setAttribute(item.key, item.value);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }},
            obj2Css: function (obj) {
                var $t;
                var str = "";

                $t = Bridge.getEnumerator(obj);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        str = (str || "") + (((item.key.toLowerCase() || "") + ":" + (item.value || "") + ";") || "");
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return str;
            }
        }
    });

    Bridge.ns("Bridge.Console", $asm.$);

    Bridge.apply($asm.$.Bridge.Console, {
        f1: function (_o1) {
            _o1.add("position", "fixed");
            _o1.add("left", "0");
            _o1.add("bottom", "0");
            _o1.add("padding-top", this.consoleHeaderHeight);
            _o1.add("background-color", "#fff");
            _o1.add("font", "normal normal normal 13px/1 sans-serif");
            _o1.add("color", "#555");
            return _o1;
        },
        f2: function (_o2) {
            _o2.add("position", "absolute");
            _o2.add("top", "0");
            _o2.add("left", "0");
            _o2.add("right", "0");
            _o2.add("height", "35px");
            _o2.add("padding", "9px 15px 7px 10px");
            _o2.add("border-bottom", "1px solid #ccc");
            _o2.add("background-color", "#f3f3f3");
            _o2.add("box-sizing", "border-box");
            return _o2;
        },
        f3: function (_o3) {
            _o3.add("overflow-x", "auto");
            _o3.add("font-family", "Menlo, Monaco, Consolas, 'Courier New', monospace");
            return _o3;
        },
        f4: function (_o4) {
            _o4.add("xmlns", this.svgNS);
            _o4.add("width", "25.5");
            _o4.add("height", "14.4");
            _o4.add("viewBox", "0 0 25.5 14.4");
            _o4.add("style", "margin: 0 3px 3px 0;vertical-align:middle;");
            return _o4;
        },
        f5: function (_o5) {
            _o5.add("xmlns", this.svgNS);
            _o5.add("width", "11.4");
            _o5.add("height", "11.4");
            _o5.add("viewBox", "0 0 11.4 11.4");
            _o5.add("style", "vertical-align: middle;");
            return _o5;
        },
        f6: function (_o6) {
            _o6.add("d", "M11.4 1.4L10 0 5.7 4.3 1.4 0 0 1.4l4.3 4.3L0 10l1.4 1.4 4.3-4.3 4.3 4.3 1.4-1.4-4.3-4.3");
            _o6.add("fill", "#555");
            return _o6;
        },
        f7: function (_o1) {
            _o1.add("xmlns", this.svgNS);
            _o1.add("width", "3.9");
            _o1.add("height", "6.7");
            _o1.add("viewBox", "0 0 3.9 6.7");
            _o1.add("style", "vertical-align:middle;position: absolute;top: 10.5px;");
            return _o1;
        }
    });

    Bridge.init(function () { Bridge.Console.initConsoleFunctions(); });
});