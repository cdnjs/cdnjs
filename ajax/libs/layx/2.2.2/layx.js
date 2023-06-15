/*
 * file : layx.js
 * gitee : https://gitee.com/monksoul/LayX
 * author : 百小僧/MonkSoul
 * version : v2.2.2
 * create time : 2018.05.11
 * update time : 2018.05.26
 */
;
!(function (over, win, slf) {
    var Layx = {
        version: '2.2.2',
        defaults: {
            id: '',
            icon: true,
            title: '',
            width: 800,
            height: 600,
            minWidth: 200,
            minHeight: 200,
            position: 'ct',
            storeStatus: true,
            control: true,
            style: '',
            controlStyle: '',
            bgColor: "#fff",
            shadow: true,
            border: "1px solid #3baced",
            type: 'html',
            frames: [],
            frameIndex: 0,
            mergeTitle: true,
            content: '',
            cloneElementContent: true,
            url: '',
            useFrameTitle: false,
            opacity: 1,
            floatTarget: false,
            shadable: false,
            loaddingText: '内容正在加载中，请稍后',
            isOverToMax: true,
            stickMenu: false,
            stickable: true,
            minMenu: true,
            minable: true,
            maxMenu: true,
            maxable: true,
            closeMenu: true,
            closable: true,
            debugMenu: false,
            restorable: true,
            resizable: true,
            autodestroy: false,
            autodestroyText: '<div style="padding: 0 8px; ">此窗口将在 <strong>{second}</strong> 秒内自动关闭.</div>',
            resizeLimit: {
                t: false,
                r: false,
                b: false,
                l: false,
                lt: false,
                rt: false,
                lb: false,
                rb: false
            },
            buttons: [],
            isPrompt: false,
            movable: true,
            moveLimit: {
                vertical: false,
                horizontal: false,
                leftOut: true,
                rightOut: true,
                topOut: true,
                bottomOut: true
            },
            focusable: true,
            alwaysOnTop: false,
            allowControlDbclick: true,
            statusBar: false,
            statusBarStyle: '',
            event: {
                onload: {
                    before: function (layxWindow, winform) { },
                    after: function (layxWindow, winform) { }
                },
                onmin: {
                    before: function (layxWindow, winform) { },
                    after: function (layxWindow, winform) { }
                },
                onmax: {
                    before: function (layxWindow, winform) { },
                    after: function (layxWindow, winform) { }
                },
                onrestore: {
                    before: function (layxWindow, winform) { },
                    after: function (layxWindow, winform) { }
                },
                ondestroy: {
                    before: function (layxWindow, winform, params, inside) { },
                    after: function () { }
                },
                onvisual: {
                    before: function (layxWindow, winform, params, inside, status) { },
                    after: function (layxWindow, winform, status) { }
                },
                onmove: {
                    before: function (layxWindow, winform) { },
                    progress: function (layxWindow, winform) { },
                    after: function (layxWindow, winform) { }
                },
                onresize: {
                    before: function (layxWindow, winform) { },
                    progress: function (layxWindow, winform) { },
                    after: function (layxWindow, winform) { }
                },
                onfocus: function (layxWindow, winform) { },
                onexist: function (layxWindow, winform) { },
                onswitch: {
                    before: function (layxWindow, winform, frameId) { },
                    after: function (layxWindow, winform, frameId) { }
                }
            }
        },
        defaultButtons: {
            label: '确定',
            callback: function (id, button, event) { },
            id: '',
            classes: [],
            style: ''
        },
        defaultFrames: {
            id: '',
            title: '',
            type: 'html',
            url: '',
            content: '',
            useFrameTitle: false,
            cloneElementContent: true
        },
        zIndex: 10000000,
        windows: {},
        stickZIndex: 20000000,
        create: function (options) {
            var that = this,
                config = layxDeepClone({}, that.defaults, options || {}),
                winform = {};
            if (!config.id) {
                console.error("窗口id不能为空且唯一");
                return;
            }
            var _winform = that.windows[config.id];
            if (_winform) {
                if (_winform.status === "min") {
                    that.restore(_winform.id);
                }
                that.flicker(config.id);
                if (Utils.isFunction(config.event.onexist)) {
                    config.event.onexist(_winform.layxWindow, _winform);
                }
                return _winform;
            }
            if (Utils.isArray(config.frames)) {
                for (var i = 0; i < config.frames.length; i++) {
                    config.frames[i] = layxDeepClone({}, that.defaultFrames, config.frames[i]);
                    if (!config.frames[i].id) {
                        console.error("窗口组窗口id不能为空且窗口组内唯一");
                        return;
                    }
                }
            }
            if (Utils.isArray(config.buttons)) {
                for (var i = 0; i < config.buttons.length; i++) {
                    config.buttons[i] = layxDeepClone({}, that.defaultButtons, config.buttons[i]);
                }
            }
            if (config.shadable === true) {
                var layxShade = document.createElement("div");
                layxShade.setAttribute("id", "layx-" + config.id + "-shade");
                layxShade.classList.add("layx-shade");
                layxShade.style.zIndex = config.alwaysOnTop === true ? (++that.stickZIndex) : (++that.zIndex);
                document.body.appendChild(layxShade);
                layxShade.onclick = function (e) {
                    e = e || window.event;
                    that.flicker(config.id);
                    e.stopPropagation();
                };
            }
            if (config.style) {
                var style = document.getElementById("layx-style");
                if (style) {
                    style.innerHTML += config.style;
                } else {
                    style = document.createElement("style");
                    style.setAttribute("id", "layx-style");
                    style.type = "text/css";
                    style.innerHTML = config.style;
                    document.getElementsByTagName("HEAD").item(0).appendChild(style);
                }
            }
            var layxWindow = document.createElement("div");
            layxWindow.setAttribute("id", "layx-" + config.id);
            layxWindow.classList.add("layx-window");
            layxWindow.classList.add("layx-flexbox");
            if (config.shadow === true) {
                layxWindow.style.setProperty("box-shadow", "1px 1px 24px rgba(0, 0, 0, .3)");
                layxWindow.style.setProperty("-moz-box-shadow", "1px 1px 24px rgba(0, 0, 0, .3)");
                layxWindow.style.setProperty("-webkit-box-shadow", "1px 1px 24px rgba(0, 0, 0, .3)");
            }
            var _minWidth,
                _minHeight,
                _width,
                _height,
                _top,
                _left;
            _minWidth = Utils.compileLayxWidthOrHeight("width", config.minWidth, that.defaults.minWidth);
            _minHeight = Utils.compileLayxWidthOrHeight("height", config.minHeight, that.defaults.minHeight);
            _width = Utils.compileLayxWidthOrHeight("width", config.width, that.defaults.width);
            _height = Utils.compileLayxWidthOrHeight("height", config.height, that.defaults.height);
            var _position = Utils.compileLayxPosition(_width, _height, config.position);
            _top = _position.top;
            _left = _position.left;
            _width = Math.max(_width, _minWidth);
            _height = Math.max(_height, _minHeight);
            if (config.storeStatus === true && config.floatTarget === false) {
                var _areaInfo = that.getStoreWindowAreaInfo(config.id);
                if (_areaInfo) {
                    _width = _areaInfo.width;
                    _height = _areaInfo.height;
                    _top = _areaInfo.top;
                    _left = _areaInfo.left;
                } else {
                    that.storeWindowAreaInfo(config.id, {
                        width: _width,
                        height: _height,
                        top: _top,
                        left: _left
                    });
                }
            } else {
                that.removeStoreWindowAreaInfo(config.id);
            }
            if (Utils.isDom(config.floatTarget)) {
                layxWindow.classList.add("layx-bubble-type");
                var bubble = document.createElement("div");
                bubble.classList.add("layx-bubble");
                layxWindow.appendChild(bubble);
                var bubbleInlay = document.createElement("div");
                bubbleInlay.classList.add("layx-bubble-inlay");
                bubble.appendChild(bubbleInlay);
                var floatTargetPos = Utils.getElementPos(config.floatTarget);
                _top = floatTargetPos.y + config.floatTarget.offsetHeight + 11;
                _left = floatTargetPos.x;
            }
            layxWindow.style.zIndex = config.alwaysOnTop === true ? (++that.stickZIndex) : (++that.zIndex);
            layxWindow.style.width = _width + "px";
            layxWindow.style.height = _height + "px";
            layxWindow.style.minWidth = _minWidth + "px";
            layxWindow.style.minHeight = _minHeight + "px";
            layxWindow.style.top = _top + "px";
            layxWindow.style.left = _left + "px";
            if (config.border !== false) {
                layxWindow.style.setProperty("border", config.border === true ? '1px solid #3baced' : config.border);
            }
            layxWindow.style.backgroundColor = config.bgColor;
            layxWindow.style.opacity = Utils.isNumber(config.opacity) ? config.opacity : 1;
            if (config.type === "html" || config.type === "group") {
                layxWindow.onclick = function (e) {
                    e = e || window.event;
                    that.updateZIndex(config.id);
                    e.stopPropagation();
                };
            }
            document.body.appendChild(layxWindow);
            winform.id = config.id;
            winform.title = config.title;
            winform.layxWindowId = layxWindow.getAttribute("id");
            winform.layxWindow = layxWindow;
            winform.createDate = new Date();
            winform.status = "normal";
            winform.type = config.type;
            winform.buttons = config.buttons;
            winform.frames = config.frames;
            winform.useFrameTitle = config.useFrameTitle;
            winform.cloneElementContent = config.cloneElementContent;
            winform.storeStatus = config.storeStatus;
            winform.url = config.url;
            winform.content = Utils.isDom(config.content) ? config.content.outerHTML : config.content;
            winform.groupCurrentId = (Utils.isArray(config.frames) && config.frames.length > 0 && config.frames[config.frameIndex]) ? config.frames[config.frameIndex].id : null;
            winform.area = {
                width: _width,
                height: _height,
                minWidth: _minWidth,
                minHeight: _minHeight,
                top: _top,
                left: _left
            };
            winform.isFloatTarget = Utils.isDom(config.floatTarget);
            winform.floatTarget = config.floatTarget;
            winform.loaddingText = config.loaddingText;
            winform.focusable = config.focusable;
            winform.isStick = config.alwaysOnTop === true;
            winform.zIndex = config.alwaysOnTop === true ? that.stickZIndex : that.zIndex;
            winform.movable = config.movable;
            winform.moveLimit = config.moveLimit;
            winform.resizable = config.resizable;
            winform.resizeLimit = config.resizeLimit;
            winform.stickable = config.stickable;
            winform.minable = config.minable;
            winform.maxable = config.maxable;
            winform.restorable = config.restorable;
            winform.closable = config.closable;
            winform.event = config.event;
            if (config.control === true) {
                var controlBar = document.createElement("div");
                controlBar.classList.add("layx-control-bar");
                controlBar.classList.add("layx-flexbox");
                config.controlStyle && controlBar.setAttribute("style", config.controlStyle);
                if (config.type === "group" && config.mergeTitle === true) {
                    controlBar.classList.add("layx-type-group");
                }
                layxWindow.appendChild(controlBar);
                if (config.icon !== false) {
                    var leftBar = document.createElement("div");
                    leftBar.classList.add("layx-left-bar");
                    leftBar.classList.add("layx-flexbox");
                    leftBar.classList.add("layx-flex-vertical");
                    controlBar.appendChild(leftBar);
                    var windowIcon = document.createElement("div");
                    windowIcon.classList.add("layx-icon");
                    windowIcon.classList.add("layx-window-icon");
                    windowIcon.innerHTML = config.icon === true ? '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-default-icon"></use></svg>' : config.icon;
                    leftBar.appendChild(windowIcon);
                }
                var title = document.createElement("div");
                title.classList.add("layx-title");
                title.classList.add("layx-flexauto");
                title.classList.add("layx-flexbox");
                if (config.type === "group" && config.mergeTitle === true) {
                    title.classList.add("layx-type-group");
                }
                if (config.allowControlDbclick === true) {
                    title.ondblclick = function (e) {
                        e = e || window.event;
                        if (config.restorable === true) {
                            that.restore(config.id);
                        }
                        e.stopPropagation();
                    };
                }
                if (config.movable === true && Utils.isDom(config.floatTarget) == false) {
                    new LayxDrag(title);
                }
                controlBar.appendChild(title);
                if (config.type !== "group") {
                    var label = document.createElement("label");
                    label.innerHTML = config.title;
                    title.setAttribute("title", label.innerText);
                    title.appendChild(label);
                } else {
                    if (Utils.isArray(config.frames)) {
                        if (config.mergeTitle === false) {
                            var groupTab = document.createElement("div");
                            groupTab.classList.add("layx-group-tab");
                            groupTab.classList.add("layx-flexbox");
                            groupTab.classList.add("layx-type-group");
                            layxWindow.appendChild(groupTab);
                            var label = document.createElement("label");
                            label.innerHTML = config.title;
                            title.setAttribute("title", label.innerText);
                            title.appendChild(label);
                        }
                        for (var i = 0; i < config.frames.length; i++) {
                            var frameConfig = layxDeepClone({}, that.defaultFrames, config.frames[i]);
                            var frameTitle = document.createElement("div");
                            frameTitle.setAttribute("data-frameId", frameConfig.id);
                            frameTitle.classList.add("layx-group-title");
                            frameTitle.classList.add("layx-flexauto");
                            if (i === config.frameIndex) {
                                frameTitle.setAttribute("data-enable", "1");
                            }
                            frameTitle.onclick = function (e) {
                                e = e || window.event;
                                that._setGroupIndex(config.id, this);
                                e.stopPropagation();
                            };
                            if (config.mergeTitle === false) {
                                groupTab.appendChild(frameTitle);
                            } else {
                                title.appendChild(frameTitle);
                            }
                            var groupLabel = document.createElement("label");
                            groupLabel.innerHTML = frameConfig.title;
                            frameTitle.setAttribute("title", groupLabel.innerText);
                            frameTitle.appendChild(groupLabel);
                        }
                    }
                }
                var rightBar = document.createElement("div");
                rightBar.classList.add("layx-right-bar");
                rightBar.classList.add("layx-flexbox");
                controlBar.appendChild(rightBar);
                var customMenu = document.createElement("div");
                customMenu.classList.add("layx-custom-menus");
                customMenu.classList.add("layx-flexbox");
                rightBar.appendChild(customMenu);
                if (config.stickMenu === true || config.minMenu === true || config.maxMenu === true || config.closeMenu === true || config.debugMenu === true) {
                    var inlayMenu = document.createElement("div");
                    inlayMenu.classList.add("layx-inlay-menus");
                    inlayMenu.classList.add("layx-flexbox");
                    rightBar.appendChild(inlayMenu);
                    if (!Utils.isDom(config.floatTarget)) {
                        if (config.debugMenu === true) {
                            var debugMenu = document.createElement("div");
                            debugMenu.classList.add("layx-icon");
                            debugMenu.classList.add("layx-flexbox");
                            debugMenu.classList.add("layx-flex-center");
                            debugMenu.classList.add("layx-debug-menu");
                            debugMenu.setAttribute("title", "调试信息");
                            debugMenu.innerHTML = '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-debug"></use></svg>';
                            debugMenu.onclick = function (e) {
                                e = e || window.event;
                                var jsonStr = JSON.stringify(winform, null, 4).replace(/</g, "&lt;").replace("/>/g", "&gt;");
                                that.create({
                                    id: 'layx-' + config.id + '-debug',
                                    title: "窗口调试信息",
                                    width: 300,
                                    height: 300,
                                    content: '<div class="layx-padding" style="padding:10px;height:100%;overflow:hidden;"><div class="layx-code"><pre class="layx-pre">' + jsonStr + '</pre></div></div>',
                                    shadable: true,
                                    debugMenu: false,
                                    minMenu: false,
                                    minable: false,
                                    position: [layxWindow.offsetTop + 10, layxWindow.offsetLeft + 10],
                                    storeStatus: false
                                });
                                e.stopPropagation();
                            };
                            inlayMenu.appendChild(debugMenu);
                        }
                        if (config.stickMenu === true || (config.alwaysOnTop === true && config.stickMenu)) {
                            var stickMenu = document.createElement("div");
                            stickMenu.classList.add("layx-icon");
                            stickMenu.classList.add("layx-flexbox");
                            stickMenu.classList.add("layx-flex-center");
                            stickMenu.classList.add("layx-stick-menu");
                            config.alwaysOnTop === true ? stickMenu.setAttribute("title", "取消置顶") : stickMenu.setAttribute("title", "置顶");
                            config.alwaysOnTop === true && stickMenu.setAttribute("data-enable", "1");
                            stickMenu.innerHTML = '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-stick"></use></svg>';
                            if (config.stickable === true) {
                                stickMenu.onclick = function (e) {
                                    e = e || window.event;
                                    that.stickToggle(config.id);
                                    e.stopPropagation();
                                };
                            }
                            inlayMenu.appendChild(stickMenu);
                        }
                        if (config.minMenu === true) {
                            var minMenu = document.createElement("div");
                            minMenu.classList.add("layx-icon");
                            minMenu.classList.add("layx-flexbox");
                            minMenu.classList.add("layx-flex-center");
                            minMenu.classList.add("layx-min-menu");
                            minMenu.setAttribute("title", "最小化");
                            minMenu.setAttribute("data-menu", "min");
                            minMenu.innerHTML = '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-min"></use></svg>';
                            minMenu.onclick = function (e) {
                                e = e || window.event;
                                if (!this.classList.contains("layx-restore-menu")) {
                                    if (config.minable === true) {
                                        that.min(config.id);
                                    }
                                } else {
                                    if (config.restorable === true) {
                                        that.restore(config.id);
                                    }
                                }
                                e.stopPropagation();
                            };
                            inlayMenu.appendChild(minMenu);
                        }
                        if (config.maxMenu === true) {
                            var maxMenu = document.createElement("div");
                            maxMenu.classList.add("layx-icon");
                            maxMenu.classList.add("layx-flexbox");
                            maxMenu.classList.add("layx-flex-center");
                            maxMenu.classList.add("layx-max-menu");
                            maxMenu.setAttribute("title", "最大化");
                            maxMenu.setAttribute("data-menu", "max");
                            maxMenu.innerHTML = '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-max"></use></svg>';
                            maxMenu.onclick = function (e) {
                                e = e || window.event;
                                if (!this.classList.contains("layx-restore-menu")) {
                                    if (config.maxable === true) {
                                        that.max(config.id);
                                    }
                                } else {
                                    if (config.restorable === true) {
                                        that.restore(config.id);
                                    }
                                }
                                e.stopPropagation();
                            };
                            inlayMenu.appendChild(maxMenu);
                        }
                    }
                    if (config.closeMenu === true) {
                        var destroyMenu = document.createElement("div");
                        destroyMenu.classList.add("layx-icon");
                        destroyMenu.classList.add("layx-flexbox");
                        destroyMenu.classList.add("layx-flex-center");
                        destroyMenu.classList.add("layx-destroy-menu");
                        destroyMenu.setAttribute("title", "关闭");
                        destroyMenu.innerHTML = '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-destroy"></use></svg>';
                        destroyMenu.onclick = function (e) {
                            e = e || window.event;
                            if (config.closable === true) {
                                that.destroy(config.id, null, true);
                            }
                            e.stopPropagation();
                        };
                        inlayMenu.appendChild(destroyMenu);
                    }
                }
            }
            if (Utils.isDom(config.floatTarget)) {
                var layxWindowStyle = layxWindow.currentStyle ? layxWindow.currentStyle : window.getComputedStyle(layxWindow, null);
                bubble.style.borderBottomColor = (layxWindowStyle.borderColor === "rgba(0, 0, 0, 0)" || layxWindowStyle.borderColor === "transparent" || (!layxWindowStyle.borderColor)) ? "#3baced" : layxWindowStyle.borderColor;
                if (config.control === true) {
                    var _controlBar = layxWindow.querySelector(".layx-control-bar");
                    var controlStyle = _controlBar.currentStyle ? _controlBar.currentStyle : window.getComputedStyle(_controlBar, null);
                    bubbleInlay.style.borderBottomColor = (controlStyle.backgroundColor === "rgba(0, 0, 0, 0)" || controlBar.backgroundColor === "transparent" || (!controlBar.backgroundColor)) ? "#fff" : controlStyle.backgroundColor;
                } else {
                    bubbleInlay.style.borderBottomColor = (layxWindowStyle.backgroundColor === "rgba(0, 0, 0, 0)" || layxWindowStyle.backgroundColor === "transparent" || (!layxWindowStyle.backgroundColor)) ? "#fff" : layxWindowStyle.backgroundColor;
                }
            }
            var main = document.createElement("div");
            main.classList.add("layx-main");
            main.classList.add("layx-flexauto");
            layxWindow.appendChild(main);
            var contentShade = document.createElement("div");
            contentShade.classList.add("layx-content-shade");
            contentShade.classList.add("layx-flexbox");
            contentShade.classList.add("layx-flex-center");
            if (config.loaddingText !== false) {
                if (Utils.isDom(config.loaddingText)) {
                    contentShade.appendChild(config.loaddingText);
                } else {
                    contentShade.innerHTML = config.loaddingText;
                    var dotCount = 0;
                    winform.loaddingTextTimer = setInterval(function () {
                        if (dotCount === 5) {
                            dotCount = 0;
                        }
                        ++dotCount;
                        var dotHtml = "";
                        for (var i = 0; i < dotCount; i++) {
                            dotHtml += ".";
                        }
                        contentShade.innerHTML = config.loaddingText + dotHtml;
                    }, 200);
                }
            }
            main.appendChild(contentShade);
            switch (config.type) {
                case "html":
                default:
                    if (Utils.isFunction(config.event.onload.before)) {
                        var revel = config.event.onload.before(layxWindow, winform);
                        if (revel === false) {
                            return;
                        }
                    }
                    that.createHtmlBody(main, config, config.content);
                    main.removeChild(contentShade);
                    if (winform.loaddingTextTimer) {
                        clearInterval(winform.loaddingTextTimer);
                        delete winform.loaddingTextTimer;
                    }
                    if (Utils.isFunction(config.event.onload.after)) {
                        config.event.onload.after(layxWindow, winform);
                    }
                    break;
                case "url":
                    if (Utils.isFunction(config.event.onload.before)) {
                        var revel = config.event.onload.before(layxWindow, winform);
                        if (revel === false) {
                            return;
                        }
                    }
                    that.createFrameBody(main, config, layxWindow, winform);
                    break;
                case "group":
                    if (Utils.isArray(config.frames)) {
                        if (Utils.isFunction(config.event.onload.before)) {
                            var revel = config.event.onload.before(layxWindow, winform);
                            if (revel === false) {
                                return;
                            }
                        }
                        var groupLoadCount = 0;
                        for (var i = 0; i < config.frames.length; i++) {
                            var frameConfig = layxDeepClone({}, that.defaultFrames, config.frames[i]);
                            var frameBody = document.createElement("div");
                            frameBody.classList.add("layx-group-main");
                            frameBody.setAttribute("data-frameId", frameConfig.id);
                            if (i === config.frameIndex) {
                                frameBody.setAttribute("data-enable", "1");
                            }
                            main.appendChild(frameBody);
                            if (frameConfig.type === "html") {
                                that.createHtmlBody(frameBody, config, frameConfig.content, "group", frameConfig);
                                frameBody.setAttribute("data-complete", "1");
                                var loadComplteMains = layxWindow.querySelectorAll(".layx-group-main[data-complete='1']");
                                if (loadComplteMains.length === config.frames.length) {
                                    main.removeChild(contentShade);
                                    if (Utils.isFunction(config.event.onload.after)) {
                                        config.event.onload.after(layxWindow, winform);
                                    }
                                }
                            } else if (frameConfig.type === "url") {
                                that.createFrameBody(frameBody, config, layxWindow, winform, "group", frameConfig);
                            }
                        }
                    }
                    break;
            }
            if (config.resizable === true) {
                var resize = document.createElement("div");
                resize.classList.add("layx-resizes");
                layxWindow.appendChild(resize);
                if (!Utils.isDom(config.floatTarget)) {
                    if (config.resizeLimit.t === false) {
                        var resizeTop = document.createElement("div");
                        resizeTop.classList.add("layx-resize-top");
                        new LayxResize(resizeTop, true, false, true, false);
                        resize.appendChild(resizeTop);
                    }
                    if (config.resizeLimit.l === false) {
                        var resizeLeft = document.createElement("div");
                        resizeLeft.classList.add("layx-resize-left");
                        new LayxResize(resizeLeft, false, true, false, true);
                        resize.appendChild(resizeLeft);
                    }
                    if (config.resizeLimit.lt === false) {
                        var resizeLeftTop = document.createElement("div");
                        resizeLeftTop.classList.add("layx-resize-left-top");
                        new LayxResize(resizeLeftTop, true, true, false, false);
                        resize.appendChild(resizeLeftTop);
                    }
                    if (config.resizeLimit.rt === false) {
                        var resizeRightTop = document.createElement("div");
                        resizeRightTop.classList.add("layx-resize-right-top");
                        new LayxResize(resizeRightTop, true, false, false, false);
                        resize.appendChild(resizeRightTop);
                    }
                    if (config.resizeLimit.lb === false) {
                        var resizeLeftBottom = document.createElement("div");
                        resizeLeftBottom.classList.add("layx-resize-left-bottom");
                        new LayxResize(resizeLeftBottom, false, true, false, false);
                        resize.appendChild(resizeLeftBottom);
                    }
                }
                if (config.resizeLimit.r === false) {
                    var resizeRight = document.createElement("div");
                    resizeRight.classList.add("layx-resize-right");
                    new LayxResize(resizeRight, false, false, false, true);
                    resize.appendChild(resizeRight);
                }
                if (config.resizeLimit.b === false) {
                    var resizeBottom = document.createElement("div");
                    resizeBottom.classList.add("layx-resize-bottom");
                    new LayxResize(resizeBottom, false, false, true, false);
                    resize.appendChild(resizeBottom);
                }
                if (config.resizeLimit.rb === false) {
                    var resizeRightBottom = document.createElement("div");
                    resizeRightBottom.classList.add("layx-resize-right-bottom");
                    new LayxResize(resizeRightBottom, false, false, false, false);
                    resize.appendChild(resizeRightBottom);
                }
            }
            if (config.statusBar) {
                var statusBar = document.createElement("div");
                statusBar.classList.add("layx-statu-bar");
                config.statusBarStyle && statusBar.setAttribute("style", config.statusBarStyle);
                if (config.statusBar === true && Utils.isArray(config.buttons)) {
                    var btnElement = that.createLayxButtons(config.buttons, config.id, config.isPrompt);
                    statusBar.appendChild(btnElement);
                } else {
                    if (Utils.isDom(config.statusBar)) {
                        statusBar.appendChild(config.statusBar);
                    } else {
                        statusBar.innerHTML = config.statusBar;
                    }
                }
                layxWindow.appendChild(statusBar);
            }
            if (/(^[1-9]\d*$)/.test(config.autodestroy)) {
                var second = config.autodestroy / 1000;
                if (config.autodestroyText !== false) {
                    var autodestroyTip = document.createElement("div");
                    autodestroyTip.classList.add("layx-auto-destroy-tip");
                    autodestroyTip.innerHTML = config.autodestroyText.replace("{second}", second);
                    layxWindow.appendChild(autodestroyTip);
                }
                winform.destroyTimer = setInterval(function () {
                    --second;
                    if (config.autodestroyText !== false) {
                        autodestroyTip.innerHTML = config.autodestroyText.replace("{second}", second);
                    }
                    if (second <= 0) {
                        clearInterval(winform.destroyTimer);
                        that.destroy(config.id, null, true);
                    }
                }, 1000);
            }
            that.windows[config.id] = winform;
            if (config.isOverToMax === true) {
                if (_width > window.innerWidth || _height > window.innerHeight) {
                    that.max(config.id);
                }
            }
            return winform;
        },
        updateFloatTargetPosition: function (id) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform && winform.isFloatTarget === true) {
                var floatTargetPos = Utils.getElementPos(winform.floatTarget);
                var top = floatTargetPos.y + winform.floatTarget.offsetHeight + 11;
                var left = floatTargetPos.x;
                that.setPosition(id, {
                    top: top,
                    left: left
                }, true);
            }
        },
        removeStoreWindowAreaInfo: function (id) {
            var that = this,
                windowId = "layx-" + id,
                storeAreaInfo = sessionStorage.getItem(windowId);
            if (storeAreaInfo) {
                sessionStorage.removeItem(windowId);
            }
        },
        storeWindowAreaInfo: function (id, area) {
            var that = this,
                windowId = "layx-" + id;
            sessionStorage.setItem(windowId, JSON.stringify(area));
        },
        getStoreWindowAreaInfo: function (id) {
            var that = this,
                windowId = "layx-" + id,
                storeAreaInfo = sessionStorage.getItem(windowId);
            if (storeAreaInfo) {
                return JSON.parse(storeAreaInfo);
            }
            return null;
        },
        _setGroupIndex: function (id, target) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform && winform.type === "group") {
                var prevSelectTitle = layxWindow.querySelector(".layx-group-title[data-enable='1']");
                if (prevSelectTitle !== target) {
                    if (Utils.isFunction(winform.event.onswitch.before)) {
                        var revel = winform.event.onswitch.before(layxWindow, winform, prevSelectTitle.getAttribute("data-frameId"));
                        if (revel === false) {
                            return;
                        }
                    }
                    prevSelectTitle.removeAttribute("data-enable");
                    target.setAttribute("data-enable", "1");
                    var frameId = target.getAttribute("data-frameId");
                    var prevGroupMain = layxWindow.querySelector(".layx-group-main[data-enable='1']");
                    var currentGroupMain = layxWindow.querySelector(".layx-group-main[data-frameId='" + frameId + "']");
                    if (currentGroupMain !== prevGroupMain) {
                        prevGroupMain.removeAttribute("data-enable");
                        currentGroupMain.setAttribute("data-enable", "1");
                        winform.groupCurrentId = frameId;
                    }
                    if (Utils.isFunction(winform.event.onswitch.after)) {
                        winform.event.onswitch.after(layxWindow, winform, target.getAttribute("data-frameId"));
                    }
                }
            }
        },
        setGroupIndex: function (id, frameId) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform) {
                var title = layxWindow.querySelector(".layx-group-title[data-frameId='" + frameId + "']");
                title.click();
            }
        },
        createHtmlBody: function (main, config, content, type, frameConfig) {
            var html = document.createElement("div");
            html.classList.add("layx-html");
            html.setAttribute("id", "layx-" + config.id + (type === "group" ? "-" + frameConfig.id + "-" : "-") + "html");
            if (Utils.isDom(content)) {
                html.appendChild((type === "group" ? frameConfig : config).cloneElementContent === true ? content.cloneNode(true) : content);
            } else {
                html.innerHTML = content;
            }
            main.appendChild(html);
        },
        createFrameBody: function (main, config, layxWindow, winform, type, frameConfig) {
            var that = this;
            var iframe = document.createElement("iframe");
            iframe.setAttribute("id", "layx-" + config.id + (type === "group" ? "-" + frameConfig.id + "-" : "-") + "iframe");
            iframe.classList.add("layx-iframe");
            iframe.classList.add("layx-flexbox");
            iframe.setAttribute("allowtransparency", "true");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("scrolling", "auto");
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute("mozallowfullscreen", "");
            iframe.setAttribute("webkitallowfullscreen", "");
            iframe.src = (type === "group" ? frameConfig.url : config.url) || 'about:blank';
            var iframeTitle = config.title;
            if (iframe.attachEvent) {
                iframe.attachEvent("onreadystatechange", function () {
                    if (iframe.readyState === "complete" || iframe.readyState == "loaded") {
                        iframe.detachEvent("onreadystatechange", arguments.callee);
                        try {
                            if (type === "group") {
                                if (frameConfig.useFrameTitle === true) {
                                    iframeTitle = iframe.contentWindow.document.querySelector("title").innerText;
                                    that.setGroupTitle(config.id, frameConfig.id, iframeTitle);
                                }
                            } else {
                                if (config.useFrameTitle === true) {
                                    iframeTitle = iframe.contentWindow.document.querySelector("title").innerText;
                                    that.setTitle(config.id, iframeTitle);
                                }
                            }
                            if (config.focusable === true) {
                                IframeOnClick.track(iframe, function () {
                                    if (Utils.isFunction(config.event.onfocus)) {
                                        var revel = Utils.isFunction(config.event.onfocus);
                                        if (revel === false) {
                                            return;
                                        }
                                        config.event.onfocus(layxWindow, winform);
                                    }
                                    that.updateZIndex(config.id);
                                });
                            }
                        } catch (e) {
                            console.warn(e);
                        }
                        var contentShade = (type === "group" ? iframe.parentNode.parentNode : iframe.parentNode).querySelector(".layx-content-shade");
                        if (contentShade) {
                            if (type === "group") {
                                main.setAttribute("data-complete", "1");
                                var loadComplteMains = layxWindow.querySelectorAll(".layx-group-main[data-complete='1']");
                                if (config.frames.length === loadComplteMains.length) {
                                    contentShade.parentNode.removeChild(contentShade);
                                    if (winform.loaddingTextTimer) {
                                        clearInterval(winform.loaddingTextTimer);
                                        delete winform.loaddingTextTimer;
                                    }
                                    if (Utils.isFunction(config.event.onload.after)) {
                                        config.event.onload.after(layxWindow, winform);
                                    }
                                }
                            } else {
                                contentShade.parentNode.removeChild(contentShade);
                                if (winform.loaddingTextTimer) {
                                    clearInterval(winform.loaddingTextTimer);
                                    delete winform.loaddingTextTimer;
                                }
                                if (Utils.isFunction(config.event.onload.after)) {
                                    config.event.onload.after(layxWindow, winform);
                                }
                            }
                        }
                    }
                });
            } else {
                iframe.addEventListener("load", function () {
                    this.removeEventListener("load", arguments.call, false);
                    try {
                        if (type === "group") {
                            if (frameConfig.useFrameTitle === true) {
                                iframeTitle = iframe.contentWindow.document.querySelector("title").innerText;
                                that.setGroupTitle(config.id, frameConfig.id, iframeTitle);
                            }
                        } else {
                            if (config.useFrameTitle === true) {
                                iframeTitle = iframe.contentWindow.document.querySelector("title").innerText;
                                that.setTitle(config.id, iframeTitle);
                            }
                        }
                        if (config.focusable === true) {
                            IframeOnClick.track(iframe, function () {
                                if (Utils.isFunction(config.event.onfocus)) {
                                    var revel = Utils.isFunction(config.event.onfocus);
                                    if (revel === false) {
                                        return;
                                    }
                                    config.event.onfocus(layxWindow, winform);
                                }
                                that.updateZIndex(config.id);
                            });
                        }
                    } catch (e) {
                        console.warn(e);
                    }
                    var contentShade = (type === "group" ? iframe.parentNode.parentNode : iframe.parentNode).querySelector(".layx-content-shade");
                    if (contentShade) {
                        if (type === "group") {
                            main.setAttribute("data-complete", "1");
                            var loadComplteMains = layxWindow.querySelectorAll(".layx-group-main[data-complete='1']");
                            if (config.frames.length === loadComplteMains.length) {
                                contentShade.parentNode.removeChild(contentShade);
                                if (winform.loaddingTextTimer) {
                                    clearInterval(winform.loaddingTextTimer);
                                    delete winform.loaddingTextTimer;
                                }
                                if (Utils.isFunction(config.event.onload.after)) {
                                    config.event.onload.after(layxWindow, winform);
                                }
                            }
                        } else {
                            contentShade.parentNode.removeChild(contentShade);
                            if (winform.loaddingTextTimer) {
                                clearInterval(winform.loaddingTextTimer);
                                delete winform.loaddingTextTimer;
                            }
                            if (Utils.isFunction(config.event.onload.after)) {
                                config.event.onload.after(layxWindow, winform);
                            }
                        }
                    }
                }, false);
            }
            main.appendChild(iframe);
        },
        setContent: function (id, content) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform) {
                if (winform.type === "html") {
                    var html = layxWindow.querySelector("#layx-" + id + "-html");
                    if (html) {
                        var contentShade = document.createElement("div");
                        contentShade.classList.add("layx-content-shade");
                        contentShade.classList.add("layx-flexbox");
                        contentShade.classList.add("layx-flex-center");
                        html.parentNode.appendChild(contentShade);
                        if (Utils.isDom(content)) {
                            html.appendChild(winform.cloneElementContent === true ? content.cloneNode(true) : content);
                        } else {
                            html.innerHTML = content;
                        }
                        html.parentNode.removeChild(contentShade);
                    }
                }
            }
        },
        getGroupFrame: function (frames, frameId) {
            var frm = {};
            for (var i = 0; i < frames.length; i++) {
                if (frames[i].id === frameId) {
                    frm = frames[i];
                    break;
                }
            }
            return frm;
        },
        reloadGroupFrame: function (id, frameId) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform && winform.type === "group") {
                var frameform = that.getGroupFrame(winform.frames, frameId);
                if (frameform.type === "url") {
                    var iframe = layxWindow.querySelector("#layx-" + id + "-" + frameId + "-" + "iframe");
                    if (iframe) {
                        var url = iframe.getAttribute("src");
                        that.setGroupUrl(id, frameId, url);
                    }
                }
            }
        },
        setGroupContent: function (id, frameId, content) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform && winform.type === "group") {
                var frameform = that.getGroupFrame(winform.frames, frameId);
                if (frameform.type === "html") {
                    var html = layxWindow.querySelector("#layx-" + id + "-" + frameId + "-" + "html");
                    if (html) {
                        var contentShade = document.createElement("div");
                        contentShade.classList.add("layx-content-shade");
                        contentShade.classList.add("layx-flexbox");
                        contentShade.classList.add("layx-flex-center");
                        html.parentNode.parentNode.appendChild(contentShade);
                        if (Utils.isDom(content)) {
                            html.appendChild(frameform.cloneElementContent === true ? content.cloneNode(true) : content);
                        } else {
                            html.innerHTML = content;
                        }
                        frameform.content = content;
                        html.parentNode.parentNode.removeChild(contentShade);
                    }
                }
            }
        },
        setUrl: function (id, url) {
            url = url || 'about:blank';
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform) {
                if (winform.type === "url") {
                    var iframe = layxWindow.querySelector("#layx-" + id + "-iframe");
                    if (iframe) {
                        var contentShade = document.createElement("div");
                        contentShade.classList.add("layx-content-shade");
                        contentShade.classList.add("layx-flexbox");
                        contentShade.classList.add("layx-flex-center");
                        if (winform.loaddingText !== false) {
                            if (Utils.isDom(winform.loaddingText)) {
                                contentShade.appendChild(winform.loaddingText);
                            } else {
                                contentShade.innerHTML = winform.loaddingText;
                                var dotCount = 0;
                                winform.loaddingTextTimer = setInterval(function () {
                                    if (dotCount === 5) {
                                        dotCount = 0;
                                    }
                                    ++dotCount;
                                    var dotHtml = "";
                                    for (var i = 0; i < dotCount; i++) {
                                        dotHtml += ".";
                                    }
                                    contentShade.innerHTML = winform.loaddingText + dotHtml;
                                }, 200);
                            }
                        }
                        iframe.parentNode.appendChild(contentShade);
                        iframe.setAttribute("src", url);
                    }
                }
            }
        },
        setGroupUrl: function (id, frameId, url) {
            url = url || 'about:blank';
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform && winform.type === "group") {
                var frameform = that.getGroupFrame(winform.frames, frameId);
                if (frameform.type === "url") {
                    var iframe = layxWindow.querySelector("#layx-" + id + "-" + frameId + "-" + "iframe");
                    if (iframe) {
                        iframe.parentNode.removeAttribute("data-complete");
                        var contentShade = document.createElement("div");
                        contentShade.classList.add("layx-content-shade");
                        contentShade.classList.add("layx-flexbox");
                        contentShade.classList.add("layx-flex-center");
                        if (winform.loaddingText !== false) {
                            if (Utils.isDom(winform.loaddingText)) {
                                contentShade.appendChild(winform.loaddingText);
                            } else {
                                contentShade.innerHTML = winform.loaddingText;
                                var dotCount = 0;
                                winform.loaddingTextTimer = setInterval(function () {
                                    if (dotCount === 5) {
                                        dotCount = 0;
                                    }
                                    ++dotCount;
                                    var dotHtml = "";
                                    for (var i = 0; i < dotCount; i++) {
                                        dotHtml += ".";
                                    }
                                    contentShade.innerHTML = winform.loaddingText + dotHtml;
                                }, 200);
                            }
                        }
                        iframe.parentNode.parentNode.appendChild(contentShade);
                        iframe.setAttribute("src", url);
                    }
                }
            }
        },
        setGroupTitle: function (id, frameId, content, useFrameTitle) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform && winform.type === "group") {
                var title = layxWindow.querySelector(".layx-group-title[data-frameId='" + frameId + "']");
                if (title) {
                    var frameform = that.getGroupFrame(winform.frames, frameId);
                    if (useFrameTitle === true && frameform.type === "url") {
                        var iframe = layxWindow.querySelector("#layx-" + id + "-" + frameId + "-" + "iframe");
                        try {
                            content = iframe.contentDocument.querySelector("title").innerText;
                        } catch (e) { }
                    }
                    var label = title.querySelector("label");
                    if (label) {
                        label.innerHTML = content;
                        title.setAttribute("title", label.innerHTML);
                        frameform.title = content;
                    }
                }
            }
        },
        setTitle: function (id, content, useFrameTitle) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform) {
                var title = layxWindow.querySelector(".layx-title");
                if (title) {
                    if (useFrameTitle === true && winform.type === "url") {
                        var iframe = layxWindow.querySelector("#layx-" + id + "-iframe");
                        try {
                            content = iframe.contentDocument.querySelector("title").innerText;
                        } catch (e) { }
                    }
                    var label = title.querySelector("label");
                    if (label) {
                        label.innerHTML = content;
                        title.setAttribute("title", label.innerHTML);
                        winform.title = content;
                    }
                }
            }
        },
        stickToggle: function (id) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform) {
                that.updateZIndex(id);
                winform.isStick = !winform.isStick;
                var stickMenu = layxWindow.querySelector(".layx-stick-menu");
                if (stickMenu) {
                    stickMenu.setAttribute("data-enable", winform.isStick ? "1" : "0");
                    winform.isStick ? stickMenu.setAttribute("title", "取消置顶") : stickMenu.setAttribute("title", "置顶");
                }
                that.updateZIndex(id);
            }
        },
        reloadFrame: function (id) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform) {
                if (winform.type === "url") {
                    var iframe = layxWindow.querySelector("#layx-" + id + "-iframe");
                    if (iframe) {
                        var url = iframe.getAttribute("src");
                        that.setUrl(id, url);
                    }
                }
            }
        },
        restore: function (id) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform) {
                if (winform.restorable !== true)
                    return;
                that.updateZIndex(id);
                if (Utils.isFunction(winform.event.onrestore.before)) {
                    var revel = winform.event.onrestore.before(layxWindow, winform);
                    if (revel === false) {
                        return;
                    }
                }
                var area = winform.area;
                if (winform.status === "normal") {
                    that.max(id);
                } else if (winform.status === "max") {
                    if (document.body.classList.contains("ilayx-body")) {
                        document.body.classList.remove('ilayx-body');
                    }
                    layxWindow.style.top = area.top + "px";
                    layxWindow.style.left = area.left + "px";
                    layxWindow.style.width = area.width + "px";
                    layxWindow.style.height = area.height + "px";
                    winform.status = "normal";
                    var restoreMenu = layxWindow.querySelector(".layx-restore-menu[data-menu='max']");
                    if (restoreMenu) {
                        restoreMenu.classList.remove("layx-restore-menu");
                        restoreMenu.classList.add("layx-max-menu");
                        restoreMenu.setAttribute("title", "最大化");
                        restoreMenu.innerHTML = '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-max"></use></svg>';
                    }
                    var resizePanel = layxWindow.querySelector(".layx-resizes");
                    if (resizePanel) {
                        resizePanel.removeAttribute("data-enable");
                    }
                }
                if (winform.status === "min") {
                    if (winform.minBefore === "normal") {
                        layxWindow.style.top = area.top + "px";
                        layxWindow.style.left = area.left + "px";
                        layxWindow.style.width = area.width + "px";
                        layxWindow.style.height = area.height + "px";
                        winform.status = "normal";
                        var restoreMenu = layxWindow.querySelector(".layx-restore-menu[data-menu='min']");
                        if (restoreMenu) {
                            restoreMenu.classList.remove("layx-restore-menu");
                            restoreMenu.classList.add("layx-min-menu");
                            restoreMenu.setAttribute("title", "最小化");
                            restoreMenu.innerHTML = '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-min"></use></svg>';
                        }
                        var resizePanel = layxWindow.querySelector(".layx-resizes");
                        if (resizePanel) {
                            resizePanel.removeAttribute("data-enable");
                        }
                    } else if (winform.minBefore === "max") {
                        that.max(id);
                    }
                    that.updateMinLayout();
                }
                var _winform = layxDeepClone({}, winform);
                delete that.windows[id];
                that.windows[id] = _winform;
                that.updateMinLayout();
                if (layxWindow.classList.contains("layx-min-statu")) {
                    layxWindow.classList.remove("layx-min-statu");
                }
                if (Utils.isFunction(winform.event.onrestore.after)) {
                    winform.event.onrestore.after(layxWindow, winform);
                }
            }
        },
        min: function (id) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id],
                innertArea = Utils.innerArea();
            if (layxWindow && winform && winform.isFloatTarget === false) {
                if (winform.minable !== true || winform.status === "min")
                    return;
                that.updateZIndex(id);
                if (Utils.isFunction(winform.event.onmin.before)) {
                    var revel = winform.event.onmin.before(layxWindow, winform);
                    if (revel === false) {
                        return;
                    }
                }
                winform.minBefore = winform.status;
                winform.status = "min";
                var minMenu = layxWindow.querySelector(".layx-min-menu");
                if (minMenu) {
                    minMenu.classList.remove("layx-max-menu");
                    minMenu.classList.add("layx-restore-menu");
                    minMenu.setAttribute("title", "还原");
                    minMenu.innerHTML = '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-restore"></use></svg>';
                }
                var resizePanel = layxWindow.querySelector(".layx-resizes");
                if (resizePanel) {
                    resizePanel.setAttribute("data-enable", "0");
                }
                var restoreMenu = layxWindow.querySelector(".layx-restore-menu[data-menu='max']");
                if (restoreMenu) {
                    restoreMenu.classList.remove("layx-restore-menu");
                    restoreMenu.classList.add("layx-max-menu");
                    restoreMenu.setAttribute("title", "最大化");
                    restoreMenu.innerHTML = '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-max"></use></svg>';
                }
                var _winform = layxDeepClone({}, winform);
                delete that.windows[id];
                that.windows[id] = _winform;
                that.updateMinLayout();
                if (Utils.isFunction(winform.event.onmin.after)) {
                    winform.event.onmin.after(layxWindow, winform);
                }
            }
        },
        updateZIndex: function (id) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform) {
                var layxShade = document.getElementById("layx-" + id + "-shade");
                if (layxShade) {
                    layxShade.style.zIndex = (winform.isStick === true ? (++that.stickZIndex) : (++that.zIndex));
                }
                if (winform.isStick === true) {
                    winform.zIndex = (++that.stickZIndex) + 1;
                } else {
                    winform.zIndex = (++that.zIndex) + 1;
                }
                layxWindow.style.zIndex = winform.zIndex;
            }
        },
        updateMinLayout: function () {
            var that = this,
                windows = that.windows,
                innertArea = Utils.innerArea(),
                paddingLeft = 10,
                paddingBottom = 10,
                widthByMinStatu = 240,
                stepIndex = 0,
                lineMaxCount = Math.floor(innertArea.width / (widthByMinStatu + paddingLeft));
            for (var id in windows) {
                var winform = windows[id],
                    layxWindow = document.getElementById("layx-" + id);
                if (layxWindow && winform.status === "min") {
                    var control = layxWindow.querySelector(".layx-control-bar");
                    if (control) {
                        var heightByMinStatus = control.offsetHeight;
                        layxWindow.classList.add("layx-min-statu");
                        layxWindow.style.width = widthByMinStatu + 'px';
                        layxWindow.style.height = heightByMinStatus + 'px';
                        layxWindow.style.top = innertArea.height - (Math.floor(stepIndex / lineMaxCount) + 1) * (heightByMinStatus + paddingBottom) + 'px';
                        layxWindow.style.left = stepIndex % lineMaxCount * (widthByMinStatu + paddingLeft) + paddingLeft + 'px';
                        stepIndex++;
                    }
                }
            }
        },
        max: function (id) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id],
                innertArea = Utils.innerArea();
            if (layxWindow && winform && winform.isFloatTarget === false) {
                if (winform.maxable !== true || winform.status === "max")
                    return;
                that.updateZIndex(id);
                if (Utils.isFunction(winform.event.onmax.before)) {
                    var revel = winform.event.onmax.before(layxWindow, winform);
                    if (revel === false) {
                        return;
                    }
                }
                document.body.classList.add('ilayx-body');
                layxWindow.style.top = 0;
                layxWindow.style.left = 0;
                layxWindow.style.width = innertArea.width + "px";
                layxWindow.style.height = innertArea.height + "px";
                winform.status = "max";
                var maxMenu = layxWindow.querySelector(".layx-max-menu");
                if (maxMenu) {
                    maxMenu.classList.remove("layx-max-menu");
                    maxMenu.classList.add("layx-restore-menu");
                    maxMenu.setAttribute("title", "还原");
                    maxMenu.innerHTML = '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-restore"></use></svg>';
                }
                var resizePanel = layxWindow.querySelector(".layx-resizes");
                if (resizePanel) {
                    resizePanel.setAttribute("data-enable", "0");
                }
                var restoreMenu = layxWindow.querySelector(".layx-restore-menu[data-menu='min']");
                if (restoreMenu) {
                    restoreMenu.classList.remove("layx-restore-menu");
                    restoreMenu.classList.add("layx-min-menu");
                    restoreMenu.setAttribute("title", "最小化");
                    restoreMenu.innerHTML = '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-min"></use></svg>';
                }
                var _winform = layxDeepClone({}, winform);
                delete that.windows[id];
                that.windows[id] = _winform;
                that.updateMinLayout();
                if (layxWindow.classList.contains("layx-min-statu")) {
                    layxWindow.classList.remove("layx-min-statu");
                }
                if (Utils.isFunction(winform.event.onmax.after)) {
                    winform.event.onmax.after(layxWindow, winform);
                }
            }
        },
        visual: function (id, status, params, inside) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                layxShade = document.getElementById(windowId + '-shade'),
                winform = that.windows[id];
            if (layxWindow && winform) {
                if (Utils.isFunction(winform.event.onvisual.before)) {
                    var revel = winform.event.onvisual.before(layxWindow, winform, params || {}, inside === true, status !== false);
                    if (revel === false) {
                        return;
                    }
                }
                if (status !== false) {
                    layxWindow.classList.remove("layx-hide-statu");
                } else {
                    layxWindow.classList.add("layx-hide-statu");
                }
                that.updateMinLayout();
                if (Utils.isFunction(winform.event.onvisual.after)) {
                    winform.event.onvisual.after(layxWindow, winform, status !== false);
                }
            }
        },
        destroy: function (id, params, inside) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                layxShade = document.getElementById(windowId + '-shade'),
                winform = that.windows[id];
            if (layxWindow && winform) {
                that.updateZIndex(id);
                if (Utils.isFunction(winform.event.ondestroy.before)) {
                    var revel = winform.event.ondestroy.before(layxWindow, winform, params || {}, inside === true);
                    if (revel === false) {
                        return;
                    }
                }
                if (winform.closable !== true)
                    return;
                delete that.windows[id];
                layxWindow.parentNode.removeChild(layxWindow);
                if (layxShade) {
                    layxShade.parentNode.removeChild(layxShade);
                }
                that.updateMinLayout();
                if (Utils.isFunction(winform.event.ondestroy.after)) {
                    winform.event.ondestroy.after();
                }
                if (winform.destroyTimer)
                    clearInterval(winform.destroyTimer);
                if (winform.loadTimer)
                    clearInterval(winform.loadTimer);
                if (winform.loaddingTextTimer)
                    clearInterval(winform.loaddingTextTimer);
                for (var key in winform) {
                    delete winform[key];
                }
                winform = undefined;
            }
        },
        destroyAll: function () {
            var that = this;
            for (var id in Layx.windows) {
                that.destroy(id);
            }
        },
        flicker: function (id) {
            var that = this,
                flickerTimer,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform) {
                that.updateZIndex(id);
                if (layxWindow.classList.contains('layx-flicker')) {
                    layxWindow.classList.remove('layx-flicker');
                }
                layxWindow.classList.add('layx-flicker');
                flickerTimer = setTimeout(function () {
                    layxWindow.classList.remove('layx-flicker');
                    clearTimeout(flickerTimer);
                }, 120 * 8);
            }
        },
        setPosition: function (id, position, isFloatTarget) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform) {
                var _position = isFloatTarget === true ? position : Utils.compileLayxPosition(winform.area.width, winform.area.height, position);
                winform.area.left = _position.left;
                winform.area.top = _position.top;
                layxWindow.style.left = _position.left + "px";
                layxWindow.style.top = _position.top + "px";
            }
        },
        getFrameContext: function (id) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id],
                iframeWindow = null;
            if (layxWindow && winform && winform.type === "url") {
                var iframe = layxWindow.querySelector(".layx-iframe");
                if (iframe) {
                    try {
                        iframeWindow = iframe.contentWindow;
                    } catch (e) { }
                }
            }
            return iframeWindow;
        },
        getParentContext: function (id) {
            var that = this;
            var iframeWindow = that.getFrameContext(id);
            if (iframeWindow) {
                return iframeWindow.parent;
            } else {
                return null;
            }
        },
        getGroupFrameContext: function (id, frameId) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id],
                iframeWindow = null;
            if (layxWindow && winform && winform.type === "group") {
                var frameform = that.getGroupFrame(winform.frames, frameId);
                if (frameform.type === "url") {
                    var iframe = layxWindow.querySelector("#layx-" + id + "-" + frameId + "-" + "iframe");
                    if (iframe) {
                        try {
                            iframeWindow = iframe.contentWindow;
                        } catch (e) { }
                    }
                }
            }
            return iframeWindow;
        },
        createLayxButtons: function (buttons, id, isPrompt) {
            var that = this;
            var buttonPanel = document.createElement("div");
            buttonPanel.classList.add("layx-buttons");
            for (var i = 0; i < buttons.length; i++) {
                var buttonItem = document.createElement("button");
                var buttonConfig = layxDeepClone({}, that.defaultButtons, buttons[i]);
                buttonItem.classList.add("layx-button-item");
                buttonItem.innerText = buttonConfig.label;
                buttonConfig.id && buttonItem.setAttribute("id", "layx-" + id + "-button-" + buttonConfig.id);
                if (Utils.isArray(buttonConfig.classes)) {
                    for (var n = 0; n < buttonConfig.classes.length; n++) {
                        buttonItem.classList.add(buttonConfig.classes[n]);
                    }
                } else {
                    buttonConfig.classes && buttonItem.classList.add(buttonConfig.classes.toString());
                }
                buttonConfig.style && buttonItem.setAttribute("style", buttonConfig.style);
                buttonItem.callback = buttons[i].callback;
                buttonItem.onclick = function (e) {
                    e = e || window.event;
                    e.stopPropagation();
                    if (Utils.isFunction(this.callback)) {
                        if (isPrompt === true) {
                            var textarea = that.getPromptTextArea(id);
                            this.callback(id, (textarea ? textarea.value : "").replace(/(^\s*)|(\s*$)/g, ""), textarea, this, e);
                        } else {
                            this.callback(id, this, e);
                        }
                    }
                };
                buttonPanel.appendChild(buttonItem);
            }
            return buttonPanel;
        },
        setButtonStatus: function (id, buttonId, isEnable) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform) {
                var button = layxWindow.querySelector("#layx-" + id + "-button-" + buttonId);
                if (button) {
                    if (isEnable === false) {
                        button.setAttribute("disabled", "disabled");
                    } else {
                        button.removeAttribute("disabled");
                    }
                }
            }
        },
        getStrSizeRange: function (str, minWidth, minHeight, maxWidth, maxHeight) {
            var width = 0,
                height = 0,
                span = document.createElement("span");
            span.innerHTML = str;
            span.style.visibility = 'hidden';
            span.style.display = 'inline-block';
            span.style.minWidth = minWidth + "px";
            span.style.minHeight = minHeight + "px";
            span.style.maxWidth = maxWidth + "px";
            span.style.maxHeight = maxHeight + "px";
            span.style.paddingLeft = 10 + 'px';
            span.style.paddingRight = 10 + 'px';
            span.style.paddingTop = 10 + 'px';
            span.style.paddingBottom = 10 + 'px';
            span.style.margin = "0";
            span.style.border = "none";
            span.style.lineHeight = 1.5;
            document.body.appendChild(span);
            width = span.offsetWidth;
            height = span.offsetHeight + 1;
            document.body.removeChild(span);
            return {
                width: width,
                height: height
            };
        },
        msg: function (msg, options) {
            var that = this;
            var msgSizeRange = that.getStrSizeRange(msg, 120, 20, 320, 90);
            var winform = that.create(layxDeepClone({}, {
                id: 'layx-msg-' + Utils.rndNum(8),
                type: 'html',
                control: false,
                content: "<div class='layx-msg layx-flexbox layx-flex-center'>" + msg + "</div>",
                autodestroy: 5000,
                width: msgSizeRange.width,
                height: msgSizeRange.height,
                minHeight: msgSizeRange.height,
                stickMenu: false,
                minMenu: false,
                maxMenu: false,
                closeMenu: false,
                alwaysOnTop: true,
                resizable: false,
                movable: false,
                allowControlDbclick: false,
                position: [10, 'tc'],
                autodestroyText: false,
                loaddingText: false,
                storeStatus: false
            }, options));
            that.flicker(winform.id);
            return winform;
        },
        alert: function (title, msg, yes, options) {
            var that = this;
            var msgSizeRange = that.getStrSizeRange(msg, 137, 137, 352, 157);
            var winform = that.create(layxDeepClone({}, {
                id: 'layx-alert-' + Utils.rndNum(8),
                title: title || "提示消息",
                icon: false,
                type: 'html',
                content: "<div class='layx-alert'>" + msg + "</div>",
                width: msgSizeRange.width,
                height: msgSizeRange.height,
                minHeight: msgSizeRange.height,
                stickMenu: false,
                minMenu: false,
                minable: false,
                maxMenu: false,
                maxable: false,
                alwaysOnTop: true,
                resizable: false,
                allowControlDbclick: false,
                shadable: true,
                statusBar: true,
                buttons: [{
                    label: '确定',
                    callback: function (id, button, event) {
                        event.stopPropagation();
                        if (Utils.isFunction(yes)) {
                            yes(id, button, event);
                        } else {
                            Layx.destroy(id);
                        }
                    }
                }],
                position: 'ct',
                loaddingText: false,
                storeStatus: false
            }, options));
            return winform;
        },
        confirm: function (title, msg, yes, options) {
            var that = this;
            var msgSizeRange = that.getStrSizeRange(msg, 180, 137, 352, 180);
            var winform = that.create(layxDeepClone({}, {
                id: 'layx-confirm-' + Utils.rndNum(8),
                title: title || "询问消息",
                icon: false,
                type: 'html',
                content: "<div class='layx-confirm'>" + msg + "</div>",
                width: msgSizeRange.width,
                height: msgSizeRange.height,
                minHeight: msgSizeRange.height,
                stickMenu: false,
                minMenu: false,
                minable: false,
                maxMenu: false,
                maxable: false,
                alwaysOnTop: true,
                resizable: false,
                allowControlDbclick: false,
                shadable: true,
                buttons: [{
                    label: '确定',
                    callback: function (id, button, event) {
                        event.stopPropagation();
                        if (Utils.isFunction(yes)) {
                            yes(id, button);
                        }
                    }
                }, {
                    label: '取消',
                    callback: function (id, button, event) {
                        event.stopPropagation();
                        Layx.destroy(id);
                    }
                }],
                statusBar: true,
                position: 'ct',
                loaddingText: false,
                storeStatus: false
            }, options));
            return winform;
        },
        getPromptTextArea: function (id) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform && winform.type === "html") {
                var promptPanel = layxWindow.querySelector(".layx-prompt");
                if (promptPanel) {
                    var textarea = promptPanel.querySelector(".layx-textarea");
                    if (textarea) {
                        return textarea;
                    }
                }
            }
            return null;
        },
        prompt: function (title, msg, yes, defaultValue, options) {
            var that = this;
            var msgSizeRange = that.getStrSizeRange(msg, 200, 165, 352, 200);
            var winform = that.create(layxDeepClone({}, {
                id: 'layx-prompt-' + Utils.rndNum(8),
                title: title || "请输入信息",
                icon: false,
                type: 'html',
                content: "<div class='layx-prompt'><label>" + msg + "</label><textarea class='layx-textarea'>" + (defaultValue ? defaultValue.toString() : '') + "</textarea></div>",
                width: msgSizeRange.width,
                height: msgSizeRange.height,
                minHeight: msgSizeRange.height,
                stickMenu: false,
                minMenu: false,
                minable: false,
                maxMenu: false,
                maxable: false,
                alwaysOnTop: true,
                resizable: false,
                allowControlDbclick: false,
                shadable: true,
                statusBar: true,
                isPrompt: true,
                buttons: [{
                    label: '确定',
                    callback: function (id, value, textarea, button, event) {
                        event.stopPropagation();
                        if (textarea && value.length === 0) {
                            textarea.focus();
                        } else {
                            if (Utils.isFunction(yes)) {
                                yes(id, value, textarea, button, event);
                            }
                        }
                    }
                }, {
                    label: '取消',
                    callback: function (id, value, textarea, button, event) {
                        event.stopPropagation();
                        Layx.destroy(id);
                    }
                }],
                position: 'ct',
                loaddingText: false,
                storeStatus: false
            }, options));
            return winform;
        },
        load: function (id, msg, options) {
            var that = this;
            var msgSizeRange = that.getStrSizeRange(msg, 200, 20, 320, 90);
            var loadElement = document.createElement("div");
            loadElement.classList.add("layx-load");
            loadElement.classList.add("layx-flexbox");
            loadElement.classList.add("layx-flex-center");
            loadElement.innerHTML = msg;
            var dotCount = 0;
            winform.loadTimer = setInterval(function () {
                if (dotCount === 5) {
                    dotCount = 0;
                }
                ++dotCount;
                var dotHtml = "";
                for (var i = 0; i < dotCount; i++) {
                    dotHtml += ".";
                }
                loadElement.innerHTML = msg + dotHtml;
            }, 200);
            var winform = that.create(layxDeepClone({}, {
                id: id ? id : 'layx-load-' + Utils.rndNum(8),
                type: 'html',
                control: false,
                shadable: true,
                content: loadElement,
                cloneElementContent: false,
                width: msgSizeRange.width,
                height: msgSizeRange.height,
                minHeight: msgSizeRange.height,
                stickMenu: false,
                minMenu: false,
                maxMenu: false,
                closeMenu: false,
                alwaysOnTop: true,
                resizable: false,
                movable: false,
                allowControlDbclick: false,
                position: 'ct',
                loaddingText: false,
                storeStatus: false
            }, options));
            return winform;
        }
    };
    if (!("classList" in document.documentElement)) {
        Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: function () {
                var self = this;
                function update(fn) {
                    return function (value) {
                        var classes = self.className.split(/\s+/g),
                            index = classes.indexOf(value);
                        fn(classes, index, value);
                        self.className = classes.join(" ");
                    };
                }
                return {
                    add: update(function (classes, index, value) {
                        if (!~index)
                            classes.push(value);
                    }),
                    remove: update(function (classes, index) {
                        if (~index)
                            classes.splice(index, 1);
                    }),
                    toggle: update(function (classes, index, value) {
                        if (~index)
                            classes.splice(index, 1);
                        else
                            classes.push(value);
                    }),
                    contains: function (value) {
                        return !!~self.className.split(/\s+/g).indexOf(value);
                    },
                    item: function (i) {
                        return self.className.split(/\s+/g)[i] || null;
                    }
                };
            }
        });
    }
    var IframeOnClick = {
        resolution: 200,
        iframes: [],
        interval: null,
        Iframe: function () {
            this.element = arguments[0];
            this.cb = arguments[1];
            this.hasTracked = false;
        },
        track: function (element, cb) {
            this.iframes.push(new this.Iframe(element, cb));
            if (!this.interval) {
                var _this = this;
                this.interval = setInterval(function () {
                    _this.checkClick();
                }, this.resolution);
            }
        },
        checkClick: function () {
            if (document.activeElement) {
                var activeElement = document.activeElement;
                for (var i in this.iframes) {
                    if (activeElement === this.iframes[i].element) {
                        if (this.iframes[i].hasTracked == false) {
                            this.iframes[i].cb.apply(window, []);
                            this.iframes[i].hasTracked = true;
                        }
                    } else {
                        this.iframes[i].hasTracked = false;
                    }
                }
            }
        }
    };
    var Utils = {
        isBoolean: function (obj) {
            return typeof obj === "boolean";
        },
        isString: function (obj) {
            return typeof obj === "string";
        },
        isNumber: function (obj) {
            return typeof obj === "number";
        },
        isArray: function (o) {
            return Object.prototype.toString.call(o) == '[object Array]';
        },
        isFunction: function (func) {
            return func && Object.prototype.toString.call(func) === '[object Function]';
        },
        isDom: function (obj) {
            return !!(obj && typeof window !== 'undefined' && (obj === window || obj.nodeType));
        },
        innerArea: function () {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        compileLayxPosition: function (width, height, position) {
            var that = this,
                postionOptions = ['ct', 'lt', 'rt', 'lb', 'rb', 'lc', 'tc', 'rc', 'bc'],
                innerArea = that.innerArea();
            var pos = {
                top: 0,
                left: 0
            };
            if (that.isArray(position) && position.length === 2) {
                pos.top = that.isNumber(position[0]) ? position[0] : that.compileLayxPosition(width, height, position[0]).top;
                pos.left = that.isNumber(position[1]) ? position[1] : that.compileLayxPosition(width, height, position[1]).left;
            } else {
                position = postionOptions.indexOf(position.toString()) > -1 ? position.toString() : 'ct';
                switch (position) {
                    case 'ct':
                        pos.top = (innerArea.height - height) / 2;
                        pos.left = (innerArea.width - width) / 2;
                        break;
                    case 'lt':
                        pos.top = 0;
                        pos.left = 0;
                        break;
                    case 'rt':
                        pos.top = 0;
                        pos.left = innerArea.width - width;
                        break;
                    case 'lb':
                        pos.top = innerArea.height - height;
                        pos.left = 0;
                        break;
                    case 'rb':
                        pos.top = innerArea.height - height;
                        pos.left = innerArea.width - width;
                        break;
                    case 'lc':
                        pos.left = 0;
                        pos.top = (innerArea.height - height) / 2;
                        break;
                    case 'tc':
                        pos.top = 0;
                        pos.left = (innerArea.width - width) / 2;
                        break;
                    case 'rc':
                        pos.left = innerArea.width - width;
                        pos.top = (innerArea.height - height) / 2;
                        break;
                    case 'bc':
                        pos.top = innerArea.height - height;
                        pos.left = (innerArea.width - width) / 2;
                        break;
                }
            }
            return pos;
        },
        rndNum: function (n) {
            var rnd = "";
            for (var i = 0; i < n; i++)
                rnd += Math.floor(Math.random() * 10);
            return rnd;
        },
        compileLayxWidthOrHeight: function (type, widthOrHeight, errorValue) {
            var that = this,
                innerArea = that.innerArea();
            if (/(^[1-9]\d*$)/.test(widthOrHeight)) {
                return Number(widthOrHeight);
            }
            if (/^(100|[1-9]?\d(\.\d\d?)?)%$/.test(widthOrHeight)) {
                var value = Number(widthOrHeight.toString().replace('%', ''));
                if (type === "width") {
                    return innerArea.width * (value / 100);
                }
                if (type === "height") {
                    return innerArea.height * (value / 100);
                }
            }
            return errorValue;
        },
        getNodeByClassName: function (node, className, parentWindow) {
            parentWindow = parentWindow || win;
            var that = this;
            if (node === parentWindow.document.body) {
                return null;
            }
            var cls = node.classList;
            if (cls.contains(className)) {
                return node;
            } else {
                return that.getNodeByClassName(node.parentNode, className);
            }
        },
        getMousePosition: function (e) {
            e = e || window.event;
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            var x = e.pageX || e.clientX + scrollX;
            var y = e.pageY || e.clientY + scrollY;
            return {
                'x': x,
                'y': y
            };
        },
        getElementPos: function (el) {
            var ua = navigator.userAgent.toLowerCase();
            var isOpera = (ua.indexOf('opera') != -1);
            var isIE = (ua.indexOf('msie') != -1 && !isOpera);
            if (el.parentNode === null || el.style.display == 'none') {
                return false;
            }
            var parent = null;
            var pos = [];
            var box;
            if (el.getBoundingClientRect) {
                box = el.getBoundingClientRect();
                var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
                var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
                return {
                    x: box.left + scrollLeft,
                    y: box.top + scrollTop
                };
            } else if (document.getBoxObjectFor) {
                box = document.getBoxObjectFor(el);
                var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
                var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
                pos = [box.x - borderLeft, box.y - borderTop];
            } else {
                pos = [el.offsetLeft, el.offsetTop];
                parent = el.offsetParent;
                if (parent != el) {
                    while (parent) {
                        pos[0] += parent.offsetLeft;
                        pos[1] += parent.offsetTop;
                        parent = parent.offsetParent;
                    }
                }
                if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
                    pos[0] -= document.body.offsetLeft;
                    pos[1] -= document.body.offsetTop;
                }
            }
            if (el.parentNode) {
                parent = el.parentNode;
            } else {
                parent = null;
            }
            while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') {
                pos[0] -= parent.scrollLeft;
                pos[1] -= parent.scrollTop;
                if (parent.parentNode) {
                    parent = parent.parentNode;
                } else {
                    parent = null;
                }
            }
            return {
                x: pos[0],
                y: pos[1]
            };
        }
    };
    var LayxResize = function (handle, isTop, isLeft, lockX, lockY) {
        LayxResize.isResizing = false;
        LayxResize.isFirstResizing = true;
        var drag = function (e) {
            e = e || window.event;
            var button = e.button || e.which;
            if (button == 1 && e.shiftKey == false) {
                e.preventDefault();
                var moveMouseCoord = Utils.getMousePosition(e),
                    distX = moveMouseCoord.x - handle.mouseStartCoord.x,
                    distY = moveMouseCoord.y - handle.mouseStartCoord.y,
                    _top = handle.winform.area.top + distY,
                    _left = handle.winform.area.left + distX,
                    _height = isTop ? handle.winform.area.height - distY : handle.winform.area.height + distY,
                    _width = isLeft ? handle.winform.area.width - distX : handle.winform.area.width + distX;
                if (distX !== 0 || distY !== 0) {
                    LayxResize.isResizing = true;
                    document.body.classList.add('ilayx-body');
                    if (LayxResize.isFirstResizing === true) {
                        LayxResize.isFirstResizing = false;
                        if (Utils.isFunction(handle.winform.event.onresize.before)) {
                            var reval = handle.winform.event.onresize.before(handle.layxWindow, handle.winform);
                            if (reval === false) {
                                LayxResize.isResizing = false;
                                LayxResize.isFirstResizing = true;
                                document.onmouseup = null;
                                document.onmousemove = null;
                                return;
                            }
                        }
                    }
                    _width = Math.max(_width, handle.winform.area.minWidth);
                    if (isLeft) {
                        _left = Math.min(_left, handle.winform.area.left + handle.winform.area.width - handle.winform.area.minWidth);
                        _left = Math.max(0, _left);
                        _width = Math.min(_width, handle.winform.area.left + handle.winform.area.width);
                    } else {
                        _left = Math.min(_left, handle.winform.area.left);
                        _left = Math.max(handle.winform.area.left, _left);
                        _width = Math.min(_width, handle.innerArea.width - handle.winform.area.left);
                    }
                    _height = Math.max(_height, handle.winform.area.minHeight);
                    if (isTop) {
                        _top = Math.min(_top, handle.winform.area.top + handle.winform.area.height - handle.winform.area.minHeight);
                        _top = Math.max(0, _top);
                        _height = Math.min(_height, handle.winform.area.top + handle.winform.area.height);
                    } else {
                        _top = Math.min(_top, handle.winform.area.top);
                        _top = Math.max(handle.winform.area.top, _top);
                        _height = Math.min(_height, handle.innerArea.height - handle.winform.area.top);
                    }
                    if (lockY) {
                        handle.layxWindow.style.width = _width + 'px';
                        handle.layxWindow.style.left = _left + 'px';
                    }
                    if (lockX) {
                        handle.layxWindow.style.top = _top + 'px';
                        handle.layxWindow.style.height = _height + 'px';
                    }
                    if (lockY === false && lockX === false) {
                        handle.layxWindow.style.width = _width + 'px';
                        handle.layxWindow.style.left = _left + 'px';
                        handle.layxWindow.style.top = _top + 'px';
                        handle.layxWindow.style.height = _height + 'px';
                    }
                    if (Utils.isFunction(handle.winform.event.onresize.progress)) {
                        handle.winform.event.onresize.progress(handle.layxWindow, handle.winform);
                    }
                }
            }
        };
        var dragend = function (e) {
            e = e || window.event;
            document.onmouseup = null;
            document.onmousemove = null;
            var mousePreventDefault = handle.layxWindow.querySelector(".layx-mouse-preventDefault");
            if (mousePreventDefault) {
                mousePreventDefault.parentNode.removeChild(mousePreventDefault);
            }
            var layxMove = document.getElementById("layx-window-move");
            if (layxMove) {
                layxMove.parentNode.removeChild(layxMove);
            }
            if (LayxResize.isResizing === true) {
                LayxResize.isResizing = false;
                LayxResize.isFirstResizing = true;
                handle.winform.area.top = handle.layxWindow.offsetTop;
                handle.winform.area.left = handle.layxWindow.offsetLeft;
                handle.winform.area.width = handle.layxWindow.offsetWidth;
                handle.winform.area.height = handle.layxWindow.offsetHeight;
                Layx.storeWindowAreaInfo(handle.winform.id, {
                    top: handle.winform.area.top,
                    left: handle.winform.area.left,
                    width: handle.winform.area.width,
                    height: handle.winform.area.height
                });
                if (document.body.classList.contains("ilayx-body")) {
                    document.body.classList.remove('ilayx-body');
                }
                if (Utils.isFunction(handle.winform.event.onresize.after)) {
                    handle.winform.event.onresize.after(handle.layxWindow, handle.winform);
                }
            }
        };
        var dragstart = function (e) {
            e = e || window.event;
            var layxWindow = Utils.getNodeByClassName(handle, 'layx-window', win);
            if (layxWindow) {
                var id = layxWindow.getAttribute("id").substr(5),
                    winform = Layx.windows[id];
                if (winform) {
                    if (winform.status !== "min" && winform.resizable === true) {
                        var layxMove = document.getElementById("layx-window-move");
                        if (!layxMove) {
                            layxMove = document.createElement("div");
                            layxMove.setAttribute("id", "layx-window-move");
                            document.body.appendChild(layxMove);
                        }
                        Layx.updateZIndex(id);
                        layxMove.style.zIndex = winform.zIndex - 1;
                        var mouseCoord = Utils.getMousePosition(e);
                        handle.mouseStartCoord = mouseCoord;
                        handle.layxWindow = layxWindow;
                        handle.winform = winform;
                        handle.innerArea = Utils.innerArea();
                        var mousePreventDefault = layxWindow.querySelector(".layx-mouse-preventDefault");
                        if (!mousePreventDefault) {
                            mousePreventDefault = document.createElement("div");
                            mousePreventDefault.classList.add("layx-mouse-preventDefault");
                            var main = layxWindow.querySelector(".layx-main");
                            if (main) {
                                main.appendChild(mousePreventDefault);
                            }
                        }
                        document.onmouseup = dragend;
                        document.onmousemove = drag;
                    } else {
                        Layx.restore(id);
                    }
                }
            }
            return false;
        };
        handle.onmousedown = dragstart;
    };
    var LayxDrag = function (handle) {
        LayxDrag.isMoveing = false;
        LayxDrag.isFirstMoveing = true;
        var drag = function (e) {
            e = e || window.event;
            var button = e.button || e.which;
            if (button == 1 && e.shiftKey == false) {
                e.preventDefault();
                var moveMouseCoord = Utils.getMousePosition(e),
                    distX = moveMouseCoord.x - handle.mouseStartCoord.x,
                    distY = moveMouseCoord.y - handle.mouseStartCoord.y;
                if (distX !== 0 || distY !== 0) {
                    LayxDrag.isMoveing = true;
                    document.body.classList.add('ilayx-body');
                    if (LayxDrag.isFirstMoveing === true) {
                        LayxDrag.isFirstMoveing = false;
                        if (Utils.isFunction(handle.winform.event.onmove.before)) {
                            var reval = handle.winform.event.onmove.before(handle.layxWindow, handle.winform);
                            if (reval === false) {
                                LayxDrag.isMoveing = false;
                                LayxDrag.isFirstMoveing = true;
                                document.onmouseup = null;
                                document.onmousemove = null;
                                return;
                            }
                        }
                    }
                    var _left = handle.winform.area.left + distX;
                    var _top = handle.winform.area.top + distY;
                    if (handle.winform.status === "max" && handle.winform.resizable === true) {
                        if (moveMouseCoord.x < handle.winform.area.width / 2) {
                            _left = 0;
                        } else if (moveMouseCoord.x > handle.winform.area.width / 2 && moveMouseCoord.x < handle.innerArea.width - handle.winform.area.width) {
                            _left = moveMouseCoord.x - handle.winform.area.width / 2;
                        } else if (handle.innerArea.width - moveMouseCoord.x < handle.winform.area.width / 2) {
                            _left = handle.innerArea.width - handle.winform.area.width;
                        } else if (handle.innerArea.width - moveMouseCoord.x > handle.winform.area.width / 2 && moveMouseCoord.x >= handle.innerArea.width - handle.winform.area.width) {
                            _left = moveMouseCoord.x - handle.winform.area.width / 2;
                        }
                        _top = 0;
                        handle.winform.area.top = 0;
                        handle.winform.area.left = _left;
                        Layx.restore(handle.winform.id);
                    }
                    handle.winform.moveLimit.horizontal === true && (_left = handle.winform.area.left);
                    handle.winform.moveLimit.vertical === true && (_top = handle.winform.area.top);
                    handle.winform.moveLimit.leftOut === false && (_left = Math.max(_left, 0));
                    handle.winform.moveLimit.rightOut === false && (_left = Math.min(_left, handle.innerArea.width - handle.winform.area.width));
                    handle.winform.moveLimit.bottomOut === false && (_top = Math.min(_top, handle.innerArea.height - handle.winform.area.height));
                    _top = Math.max(_top, 0);
                    _top = Math.min(handle.innerArea.height - 15, _top);
                    handle.layxWindow.style.left = _left + "px";
                    handle.layxWindow.style.top = _top + "px";
                    if (Utils.isFunction(handle.winform.event.onmove.progress)) {
                        handle.winform.event.onmove.progress(handle.layxWindow, handle.winform);
                    }
                }
            }
        };
        var dragend = function (e) {
            e = e || window.event;
            document.onmouseup = null;
            document.onmousemove = null;
            var mousePreventDefault = handle.layxWindow.querySelector(".layx-mouse-preventDefault");
            if (mousePreventDefault) {
                mousePreventDefault.parentNode.removeChild(mousePreventDefault);
            }
            var layxMove = document.getElementById("layx-window-move");
            if (layxMove) {
                layxMove.parentNode.removeChild(layxMove);
            }
            if (LayxDrag.isMoveing === true) {
                LayxDrag.isMoveing = false;
                LayxDrag.isFirstMoveing = true;
                handle.winform.area.top = handle.layxWindow.offsetTop;
                handle.winform.area.left = handle.layxWindow.offsetLeft;
                Layx.storeWindowAreaInfo(handle.winform.id, {
                    top: handle.winform.area.top,
                    left: handle.winform.area.left,
                    width: handle.winform.area.width,
                    height: handle.winform.area.height
                });
                if (document.body.classList.contains("ilayx-body")) {
                    document.body.classList.remove('ilayx-body');
                }
                if (handle.winform.area.top === 0 && handle.winform.status === "normal" && handle.winform.maxable === true && handle.winform.resizable === true) {
                    handle.winform.area.top = handle.defaultArea.top;
                    handle.winform.area.left = handle.defaultArea.left;
                    Layx.storeWindowAreaInfo(handle.winform.id, {
                        top: handle.winform.area.top,
                        left: handle.winform.area.left,
                        width: handle.winform.area.width,
                        height: handle.winform.area.height
                    });
                    Layx.max(handle.winform.id);
                }
                if (Utils.isFunction(handle.winform.event.onmove.after)) {
                    handle.winform.event.onmove.after(handle.layxWindow, handle.winform);
                }
            }
        };
        var dragstart = function (e) {
            e = e || window.event;
            var layxWindow = Utils.getNodeByClassName(handle, 'layx-window', win);
            if (layxWindow) {
                var id = layxWindow.getAttribute("id").substr(5),
                    winform = Layx.windows[id];
                if (winform) {
                    if (winform.status !== "min" && winform.movable === true) {
                        var layxMove = document.getElementById("layx-window-move");
                        if (!layxMove) {
                            layxMove = document.createElement("div");
                            layxMove.setAttribute("id", "layx-window-move");
                            document.body.appendChild(layxMove);
                        }
                        Layx.updateZIndex(id);
                        layxMove.style.zIndex = winform.zIndex - 1;
                        var mouseCoord = Utils.getMousePosition(e);
                        handle.mouseStartCoord = mouseCoord;
                        handle.layxWindow = layxWindow;
                        handle.winform = winform;
                        handle.innerArea = Utils.innerArea();
                        handle.defaultArea = layxDeepClone({}, winform.area);
                        var mousePreventDefault = layxWindow.querySelector(".layx-mouse-preventDefault");
                        if (!mousePreventDefault) {
                            mousePreventDefault = document.createElement("div");
                            mousePreventDefault.classList.add("layx-mouse-preventDefault");
                            var main = layxWindow.querySelector(".layx-main");
                            if (main) {
                                main.appendChild(mousePreventDefault);
                            }
                        }
                        document.onmouseup = dragend;
                        document.onmousemove = drag;
                    } else {
                        Layx.restore(id);
                    }
                }
            }
            return false;
        };
        handle.onmousedown = dragstart;
    };
    win.layx = {
        v: (function () {
            return Layx.version;
        })(),
        open: function (options) {
            var winform = Layx.create(options);
            return winform;
        },
        html: function (id, title, content, options) {
            var winform = Layx.create(layxDeepClone({}, {
                id: id,
                title: title,
                type: 'html',
                content: content
            }, options || {}));
            return winform;
        },
        iframe: function (id, title, url, options) {
            var winform = Layx.create(layxDeepClone({}, {
                id: id,
                title: title,
                type: 'url',
                url: url
            }, options || {}));
            return winform;
        },
        group: function (id, frames, frameIndex, options) {
            var winform = Layx.create(layxDeepClone({}, {
                id: id,
                type: 'group',
                frames: frames,
                frameIndex: typeof frameIndex === "number" ? (frameIndex > frames.length ? 0 : frameIndex) : 0
            }, options || {}));
            return winform;
        },
        windows: function () {
            return Layx.windows;
        },
        getWindow: function (id) {
            return Layx.windows[id];
        },
        destroy: function (id, params) {
            Layx.destroy(id, params);
        },
        visual: function (id, status, params) {
            Layx.visual(id, status, params);
        },
        min: function (id) {
            Layx.min(id);
        },
        max: function (id) {
            Layx.max(id);
        },
        setTitle: function (id, title, useFrameTitle) {
            Layx.setTitle(id, title, useFrameTitle);
        },
        flicker: function (id) {
            Layx.flicker(id);
        },
        restore: function (id) {
            Layx.restore(id);
        },
        updateZIndex: function (id) {
            Layx.updateZIndex(id);
        },
        updateMinLayout: function () {
            Layx.updateMinLayout();
        },
        stickToggle: function (id) {
            Layx.stickToggle(id);
        },
        setPosition: function (id, position) {
            Layx.setPosition(id, position);
        },
        getFrameContext: function (id) {
            return Layx.getFrameContext(id);
        },
        getParentContext: function (id) {
            return Layx.getParentContext(id);
        },
        setContent: function (id, content) {
            Layx.setContent(id, content);
        },
        setUrl: function (id, url) {
            Layx.setUrl(id, url);
        },
        setGroupContent: function (id, frameId, content) {
            Layx.setGroupContent(id, frameId, content);
        },
        setGroupTitle: function (id, frameId, title, useFrameTitle) {
            Layx.setGroupTitle(id, frameId, title, useFrameTitle);
        },
        setGroupUrl: function (id, frameId, url) {
            Layx.setGroupUrl(id, frameId, url);
        },
        setGroupIndex: function (id, frameId) {
            Layx.setGroupIndex(id, frameId);
        },
        getGroupFrameContext: function (id, frameId) {
            return Layx.getGroupFrameContext(id, frameId);
        },
        destroyAll: function () {
            Layx.destroyAll();
        },
        msg: function (msg, options) {
            return Layx.msg(msg, options);
        },
        alert: function (title, msg, yes, options) {
            return Layx.alert(title, msg, yes, options);
        },
        confirm: function (title, msg, yes, options) {
            return Layx.confirm(title, msg, yes, options);
        },
        getPromptTextArea: function (id) {
            return Layx.getPromptTextArea(id);
        },
        prompt: function (title, msg, yes, defaultValue, options) {
            return Layx.prompt(title, msg, yes, defaultValue, options);
        },
        load: function (id, msg, options) {
            return Layx.load(id, msg, options);
        },
        multiLine: function (f) {
            return f.toString().replace(/^[^\/]+\/\*!?\s?/, '').replace(/\*\/[^\/]+$/, '');
        },
        reloadFrame: function (id) {
            Layx.reloadFrame(id);
        },
        reloadGroupFrame: function (id, frameId) {
            Layx.reloadGroupFrame(id, frameId);
        },
        setButtonStatus: function (id, buttonId, isEnable) {
            Layx.setButtonStatus(id, buttonId, isEnable);
        },
        updateFloatTargetPosition: function (id) {
            Layx.updateFloatTargetPosition(id);
        }
    };
})(top, window, self);
;
!(function (global) {
    var extend,
        _extend,
        _isObject;
    _isObject = function (o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    };
    _extend = function self(destination, source) {
        var property;
        for (property in destination) {
            if (destination.hasOwnProperty(property)) {
                if (_isObject(destination[property]) && _isObject(source[property])) {
                    self(destination[property], source[property]);
                }
                if (source.hasOwnProperty(property)) {
                    continue;
                } else {
                    source[property] = destination[property];
                }
            }
        }
    };
    extend = function () {
        var arr = arguments,
            result = {},
            i;
        if (!arr.length)
            return {};
        for (i = arr.length - 1; i >= 0; i--) {
            if (_isObject(arr[i])) {
                _extend(arr[i], result);
            }
        }
        arr[0] = result;
        return result;
    };
    global.layxDeepClone = extend;
})(window);
;
!(function (window) {
    var svgSprite = '<svg><symbol id="layx-icon-restore" viewBox="0 0 1157 1024"><path d="M1016.52185234 724.44050175L833.87364805 724.44050175 833.87364805 898.52098643 833.87364805 960.05279112 833.87364805 961.2211168 772.34184336 961.2211168 772.34184336 960.05279112 124.31068789 960.05279112 124.31068789 961.2211168 62.7788832 961.2211168 62.7788832 960.05279112 62.7788832 898.52098643 62.7788832 360.31241885 62.7788832 298.78061416 124.31068789 298.78061416 298.78061416 298.78061416 298.78061416 62.7788832 303.06447442 62.7788832 360.31241885 62.7788832 1016.52185234 62.7788832 1074.15923838 62.7788832 1078.05365615 62.7788832 1078.05365615 662.90869795 1078.05365615 724.44050175 1016.52185234 724.44050175ZM124.31068789 898.52098643L772.34184336 898.52098643 772.34184336 724.44050175 772.34184336 662.90869795 772.34184336 360.31241885 124.31068789 360.31241885 124.31068789 898.52098643ZM1016.52185234 124.31068789L360.31241885 124.31068789 360.31241885 298.78061416 772.34184336 298.78061416 833.87364805 298.78061416 833.87364805 360.31241885 833.87364805 662.90869795 1016.52185234 662.90869795 1016.52185234 124.31068789Z"  ></path></symbol><symbol id="layx-icon-reload" viewBox="0 0 1024 1024"><path d="M919.8125 399.5L751.0625 399.5c-23.203125 0-42.1875-18.984375-42.1875-42.1875 0-23.203125 18.984375-42.1875 42.1875-42.1875l68.90625 0C755.28125 213.875 641.375 146.375 512 146.375c-201.796875 0-365.625 163.828125-365.625 365.625 0 201.796875 163.828125 365.625 365.625 365.625 196.875 0 357.890625-156.09375 364.921875-351.5625l0.703125 0c0-23.203125 18.984375-42.1875 42.1875-42.1875 23.203125 0 42.1875 18.984375 42.1875 42.1875 0 2.8125 0 5.625-0.703125 7.734375C950.046875 772.15625 753.171875 962 512 962 263.796875 962 62 760.203125 62 512 62 263.796875 263.796875 62 512 62c150.46875 0 284.0625 73.828125 365.625 187.734375L877.625 188.5625c0-23.203125 18.984375-42.1875 42.1875-42.1875 23.203125 0 42.1875 18.984375 42.1875 42.1875l0 168.75C962 380.515625 943.015625 399.5 919.8125 399.5z"  ></path></symbol><symbol id="layx-icon-default-icon" viewBox="0 0 1024 1024"><path d="M891.88743395 61.93952995L132.11256605 61.93952995c-38.92547129 0-70.60411733 31.65534435-70.60411734 70.5924665L61.50844871 891.46800355c0 38.91382045 31.67864605 70.59246649 70.60411734 70.5924665l759.7748679 0c38.92547129 0 70.60411733-31.67864605 70.60411734-70.5924665L962.49155129 132.53199645C962.49155129 93.59487431 930.81290525 61.93952995 891.88743395 61.93952995zM844.02576498 142.29540409c16.71896178 0 30.25724302 13.54993209 30.25724302 30.26889386 0 16.70731093-13.53828125 30.25724302-30.25724302 30.25724303s-30.25724302-13.54993209-30.25724303-30.25724303C813.76852195 155.84533618 827.3068032 142.29540409 844.02576498 142.29540409zM735.60300658 142.29540409c16.71896178 0 30.25724302 13.54993209 30.25724302 30.26889386 0 16.70731093-13.53828125 30.25724302-30.25724302 30.25724303s-30.25724302-13.54993209-30.25724303-30.25724303C705.34576355 155.84533618 718.8840448 142.29540409 735.60300658 142.29540409zM881.80945351 881.37837227L142.19054649 881.37837227 142.19054649 277.92288427l739.60725618 0L881.79780267 881.37837227zM758.85809209 638.26020125l-0.01165084-180.19196018 90.09598008 90.09598008L758.85809209 638.26020125zM265.15355875 638.26020125l-90.09598008-90.0959801 90.08432924-90.08432924L265.15355875 638.26020125z"  ></path></symbol><symbol id="layx-icon-min" viewBox="0 0 1024 1024"><path d="M65.23884 456.152041 958.760137 456.152041l0 111.695918L65.23884 567.847959 65.23884 456.152041z"  ></path></symbol><symbol id="layx-icon-max" viewBox="0 0 1024 1024"><path d="M75.74912227 948.24738475L75.74912227 75.75145131l872.50059037 0 0 872.49593344L75.74912227 948.24738475zM839.18786674 184.81446115L184.81213326 184.81446115l0 654.37573462 654.37573461 0L839.18786674 184.81446115z"  ></path></symbol><symbol id="layx-icon-debug" viewBox="0 0 1024 1024"><path d="M990.18635001 578.93861562c0 10.3648125-3.782715 19.33089375-11.35486126 26.90304001-7.57310531 7.57310531-16.5372675 11.3606175-26.89728375 11.3606175L818.04354219 617.20227312c0 68.14739625-13.34551219 125.92518281-40.04900719 173.34295313l124.32690656 124.934175c7.57214625 7.56159281 11.3606175 16.53247125 11.3606175 26.89728375 0 10.36001625-3.782715 19.32609657-11.3606175 26.89824281-7.17497531 7.56159281-16.13434125 11.350065-26.89728375 11.350065-10.75814625 0-19.72518656-3.78847125-26.89728375-11.350065L730.17287844 851.51860625c-1.99161001 1.98585375-4.97710594 4.578975-8.96128407 7.765935-3.9928125 3.186-12.3564225 8.872065-25.11097499 17.03612906-12.74879625 8.17078031-25.70193375 15.44360906-38.84982 21.82136531-13.1526825 6.37295906-29.49616125 12.15591844-49.02180283 17.33736563-19.52564156 5.17281281-38.85653531 7.76785313-57.97733155 7.76785312L550.251665 387.6750125l-76.51100531 0 0 535.57224188c-20.31422719 0-40.54690875-2.69481281-60.66351-8.07676407-20.13099094-5.376195-37.46260031-11.95253625-52.00921781-19.72422656-14.54853562-7.77169125-27.69546281-15.53666625-39.44749501-23.31315376-11.75778844-7.77265031-20.419755-14.24346281-26.0060475-19.4201128l-8.96128406-8.3741625L177.26614999 968.07478156c-7.96931719 8.36360906-17.53115344 12.55021125-28.69318593 12.55021125-9.56375531 0-18.12691031-3.19175625-25.69617844-9.56471531-7.57406437-7.17401625-11.659935-16.040325-12.26336531-26.59892625-0.59383781-10.55956031 2.49334969-19.82208094 9.27499125-27.79427531l120.73797938-135.68176782c-23.10977156-45.43575469-34.66897406-100.03041937-34.66897407-163.79071031L72.06771406 617.19459781c-10.36673156 0-19.32801562-3.78847125-26.89728375-11.35486124-7.57406437-7.5769425-11.36253657-16.5382275-11.36253656-26.90304 0-10.36001625 3.78847125-19.33089375 11.36253656-26.89632469 7.56926812-7.56830906 16.53055219-11.35102406 26.89728375-11.35102407l133.88874375 0L205.95645781 364.95953375l-103.40828906-103.40828906c-7.57022719-7.57310531-11.35678031-16.5382275-11.35678031-26.89824281 0-10.35905625 3.79134938-19.33089375 11.35678031-26.89728376 7.56734906-7.57214625 16.53630844-11.36541469 26.89824281-11.36541469 10.36577156 0 19.32417844 3.79902469 26.89920188 11.3654147l103.40828906 103.40828906 504.49507219 0 103.40924812-103.40828907c7.56639001-7.57214625 16.53055219-11.36541469 26.89728375-11.36541469 10.36001625 0 19.32897469 3.79902469 26.89632469 11.36541469 7.57310531 7.56639001 11.36157655 16.5382275 11.36157656 26.89728375 0 10.36001625-3.78847125 19.32609657-11.36157656 26.89824282l-103.40828906 103.40828906 0 175.73269312 133.88970281 0c10.3648125 0 19.32993469 3.782715 26.89728375 11.35678032 7.57214625 7.56543094 11.3606175 16.53630844 11.3606175 26.89056843l0 0L990.18635001 578.93861562 990.18635001 578.93861562zM703.26983938 234.64820469L320.72056719 234.64820469c0-52.99351031 18.62960906-98.12611031 55.89074625-135.38820656 37.25058375-37.26209625 82.3899-55.88594906 135.38532843-55.88594907 52.99638844 0 98.13570375 18.62385281 135.38724751 55.88594907C684.64694563 136.52113438 703.26983938 181.65469437 703.26983938 234.64820469L703.26983938 234.64820469 703.26983938 234.64820469 703.26983938 234.64820469z"  ></path></symbol><symbol id="layx-icon-destroy" viewBox="0 0 1024 1024"><path d="M933.89254819 139.71606348L884.23129279 90.08990363 511.96490363 462.39138834 140.40044113 90.82692583 90.84447403 140.34779656 462.40893653 511.91225907 90.10745181 884.2137446 139.73361166 933.875 512.03509637 561.53841892 883.59955887 933.10288141 933.15552597 883.58201068 561.59106347 512.01754819Z"  ></path></symbol><symbol id="layx-icon-stick" viewBox="0 0 1024 1024"><path d="M863.92416068 184.3484319H160.07583932a50.27488011 50.27488011 0 0 1 0-100.5497602h703.84832136a50.27488011 50.27488011 0 0 1 0 100.5497602z m-50.27488007 804.39808157a50.22460522 50.22460522 0 0 1-35.69516489-14.57971521L512 708.21268254l-265.95411572 265.95411572A50.27488011 50.27488011 0 0 1 160.07583932 938.47163339V335.1730722a50.27488011 50.27488011 0 0 1 50.27488007-50.27488013h603.29856122a50.27488011 50.27488011 0 0 1 50.27488007 50.27488013v603.29856119a50.27488011 50.27488011 0 0 1-50.27488007 50.27488008z m-301.64928061-402.19904078a50.22460522 50.22460522 0 0 1 35.69516487 14.57971522L763.37440051 816.80642355V385.44795228H260.62559949v431.86122007l215.67923564-215.67923564A50.27488011 50.27488011 0 0 1 512 586.54747269z"  ></path></symbol></svg>';
    var script = function () {
        var scripts = document.getElementsByTagName("script");
        return scripts[scripts.length - 1];
    }();
    var shouldInjectCss = script.getAttribute("data-injectcss");
    var ready = function (fn) {
        if (document.addEventListener) {
            if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
                setTimeout(fn, 0);
            } else {
                var loadFn = function () {
                    document.removeEventListener("DOMContentLoaded", loadFn, false);
                    fn();
                };
                document.addEventListener("DOMContentLoaded", loadFn, false);
            }
        } else if (document.attachEvent) {
            IEContentLoaded(window, fn);
        }
        function IEContentLoaded(w, fn) {
            var d = w.document,
                done = false,
                init = function () {
                    if (!done) {
                        done = true;
                        fn();
                    }
                };
            var polling = function () {
                try {
                    d.documentElement.doScroll("left");
                } catch (e) {
                    setTimeout(polling, 50);
                    return;
                }
                init();
            };
            polling();
            d.onreadystatechange = function () {
                if (d.readyState == "complete") {
                    d.onreadystatechange = null;
                    init();
                }
            };
        }
    };
    var before = function (el, target) {
        target.parentNode.insertBefore(el, target);
    };
    var prepend = function (el, target) {
        if (target.firstChild) {
            before(el, target.firstChild);
        } else {
            target.appendChild(el);
        }
    };
    function appendSvg() {
        var div,
            svg;
        div = document.createElement("div");
        div.innerHTML = svgSprite;
        svgSprite = null;
        svg = div.getElementsByTagName("svg")[0];
        if (svg) {
            svg.setAttribute("aria-hidden", "true");
            svg.style.position = "absolute";
            svg.style.width = 0;
            svg.style.height = 0;
            svg.style.overflow = "hidden";
            prepend(svg, document.body);
        }
    }
    if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
        window.__iconfont__svg__cssinject__ = true;
        try {
            document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
        } catch (e) {
            console && console.log(e);
        }
    }
    ready(appendSvg);
})(window);