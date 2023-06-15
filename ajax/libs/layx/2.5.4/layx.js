/*!
 * file : layx.js
 * gitee : https://gitee.com/monksoul/LayX
 * github : https://github.com/MonkSoul/Layx/
 * author : 百小僧/MonkSoul
 * version : v2.5.4
 * create time : 2018.05.11
 * update time : 2018.11.03
 */
;
!(function (over, win, slf) {
    var Layx = {
        version: '2.5.4',
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
            existFlicker: true,
            bgColor: "#fff",
            shadow: true,
            border: true,
            borderRadius: '3px',
            skin: 'default',
            type: 'html',
            focusToReveal: true,
            enableDomainFocus: true,
            dialogType: '',
            frames: [],
            frameIndex: 0,
            preload: 1,
            mergeTitle: true,
            content: '',
            dialogIcon: false,
            cloneElementContent: true,
            url: '',
            useFrameTitle: false,
            opacity: 1,
            escKey: true,
            floatTarget: false,
            floatDirection: 'bottom',
            shadable: false,
            shadeDestroy: false,
            readonly: false,
            loadingText: '内容正在加载中，请稍后',
            dragInTopToMax: true,
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
            autodestroyText: '此窗口将在 <strong>{second}</strong> 秒内自动关闭.',
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
            buttonKey: 'enter',
            buttons: [],
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
                    before: function (layxWindow, winform, params, inside, escKey) { },
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
                },
                onstick: {
                    before: function (layxWindow, winform) { },
                    after: function (layxWindow, winform) { }
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
            cloneElementContent: true,
            bgColor: "#fff"
        },
        zIndex: 10000000,
        windows: {},
        stickZIndex: 20000000,
        prevFocusId: null,
        focusId: null,
        create: function (options) {
            var that = this,
                config = layxDeepClone({}, that.defaults, options || {}),
                winform = {};
            if (!config.id) {
                console.error("窗口id不能为空且唯一");
                return;
            }
            Layx.prevFocusId = Layx.focusId;
            Layx.focusId = config.id;
            var _winform = that.windows[config.id];
            if (_winform) {
                if (_winform.status === "min") {
                    that.restore(_winform.id);
                }
                if (_winform.existFlicker === true) {
                    that.flicker(config.id);
                }
                if (Utils.isFunction(config.event.onexist)) {
                    config.event.onexist(_winform.layxWindow, _winform);
                }
                var fixFocus = setInterval(function () {
                    if (config.id !== Layx.focusId) {
                        that.updateZIndex(config.id);
                    } else {
                        clearInterval(fixFocus);
                    }
                }, 0);
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
            if (config.shadable === true || /^(0(\.[0-9])?$)|(1)$/.test(config.shadable)) {
                var layxShade = document.createElement("div");
                layxShade.setAttribute("id", "layx-" + config.id + "-shade");
                layxShade.classList.add("layx-shade");
                layxShade.style.zIndex = config.alwaysOnTop === true ? (++that.stickZIndex) : (++that.zIndex);
                if (/^(0(\.[0-9])?$)|(1)$/.test(config.shadable)) {
                    layxShade.style.backgroundColor = "rgba(0,0,0," + config.shadable + ")";
                }
                layxShade.oncontextmenu = function (e) {
                    e = e || window.event;
                    e.returnValue = false;
                    return false;
                };
                layxShade.onclick = function (e) {
                    e = e || window.event;
                    if (config.shadeDestroy === true) {
                        that.destroy(config.id, null, true);
                    } else {
                        if (config.existFlicker === true) {
                            that.flicker(config.id);
                        }
                    }
                    e.stopPropagation();
                };
                document.body.appendChild(layxShade);
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
            layxWindow.classList.add("layx-skin-" + config.skin);
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
            _width = Math.max(_width, _minWidth);
            _height = Math.max(_height, _minHeight);
            var _position = Utils.compileLayxPosition(_width, _height, config.position);
            _top = _position.top;
            _left = _position.left;
            _top = Math.max(_top, 0);
            _top = Math.min(win.innerHeight - 15, _top);
            _left = Math.max(_left, -(_width - 15));
            _left = Math.min(_left, win.innerWidth - 15);
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
                bubble.classList.add("layx-bubble-" + config.floatDirection);
                layxWindow.appendChild(bubble);
                var bubbleInlay = document.createElement("div");
                bubbleInlay.classList.add("layx-bubble-inlay");
                bubbleInlay.classList.add("layx-bubble-inlay-" + config.floatDirection);
                bubble.appendChild(bubbleInlay);
            }
            layxWindow.style.zIndex = config.alwaysOnTop === true ? (++that.stickZIndex) : (++that.zIndex);
            layxWindow.style.width = _width + "px";
            layxWindow.style.height = _height + "px";
            layxWindow.style.minWidth = _minWidth + "px";
            layxWindow.style.minHeight = _minHeight + "px";
            layxWindow.style.top = _top + "px";
            layxWindow.style.left = _left + "px";
            layxWindow.style.setProperty("border", Utils.isBoolean(config.border) ? (config.skin === "default" && config.border === true ? "" : "none") : config.border);
            layxWindow.style.backgroundColor = config.bgColor;
            layxWindow.style.setProperty("border-radius", config.borderRadius);
            layxWindow.style.setProperty("-moz-border-radius", config.borderRadius);
            layxWindow.style.setProperty("-webkit-border-radius", config.borderRadius);
            layxWindow.style.opacity = /^(0(\.[0-9])?$)|(1)$/.test(config.opacity) ? config.opacity : 1;
            if (config.focusable === true) {
                layxWindow.onclick = function (e) {
                    e = e || window.event;
                    if (Utils.isFunction(config.event.onfocus)) {
                        var revel = Utils.isFunction(config.event.onfocus);
                        if (revel === false) {
                            return;
                        }
                        config.event.onfocus(layxWindow, winform);
                    }
                    that.updateZIndex(config.id);
                };
            }
            document.body.appendChild(layxWindow);
            var layxWindowStyle = layxWindow.currentStyle ? layxWindow.currentStyle : win.getComputedStyle(layxWindow, null);
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
            winform.content = config.content;
            winform.escKey = config.escKey;
            winform.focusToReveal = config.focusToReveal;
            winform.dialogType = config.dialogType;
            winform.enableDomainFocus = config.enableDomainFocus;
            winform.buttonKey = config.buttonKey;
            winform.existFlicker = config.existFlicker;
            winform.groupCurrentId = (Utils.isArray(config.frames) && config.frames.length > 0 && config.frames[config.frameIndex]) ? config.frames[config.frameIndex].id : null;
            winform.area = {
                width: _width,
                height: _height,
                minWidth: _minWidth,
                minHeight: _minHeight,
                top: _top,
                left: _left
            };
            winform.border = config.border;
            winform.control = config.control;
            winform.isFloatTarget = Utils.isDom(config.floatTarget);
            winform.floatTarget = config.floatTarget;
            winform.floatDirection = config.floatDirection;
            winform.loadingText = config.loadingText;
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
            winform.skin = config.skin;
            winform.event = config.event;
            winform.dragInTopToMax = config.dragInTopToMax;
            that.windows[config.id] = winform;
            if (config.control === true) {
                var controlBar = document.createElement("div");
                controlBar.classList.add("layx-control-bar");
                controlBar.classList.add("layx-flexbox");
                controlBar.style.setProperty("border-radius", layxWindowStyle.borderRadius + " " + layxWindowStyle.borderRadius + " " + "0 0");
                controlBar.style.setProperty("-moz-border-radius", layxWindowStyle.borderRadius + " " + layxWindowStyle.borderRadius + " " + "0 0");
                controlBar.style.setProperty("-webkit-border-radius", layxWindowStyle.borderRadius + " " + layxWindowStyle.borderRadius + " " + "0 0");
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
                    if (config.icon === true) {
                        windowIcon.ondblclick = function (e) {
                            e = e || window.event;
                            that.destroy(config.id, null, true);
                            e.stopPropagation();
                        };
                    }
                    leftBar.appendChild(windowIcon);
                }
                var title = document.createElement("div");
                title.classList.add("layx-title");
                title.classList.add("layx-flexauto");
                title.classList.add("layx-flexbox");
                title.classList.add("layx-flex-vertical");
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
                    label.classList.add("layx-label");
                    label.innerHTML = config.useFrameTitle === true ? "" : config.title;
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
                            label.classList.add("layx-label");
                            label.innerHTML = config.useFrameTitle === true ? "" : config.title;
                            title.setAttribute("title", label.innerText);
                            title.appendChild(label);
                        }
                        for (var i = 0; i < config.frames.length; i++) {
                            var frameConfig = layxDeepClone({}, that.defaultFrames, config.frames[i]);
                            var frameTitle = document.createElement("div");
                            frameTitle.setAttribute("data-frameId", frameConfig.id);
                            frameTitle.classList.add("layx-group-title");
                            frameTitle.classList.add("layx-flexauto");
                            frameTitle.classList.add("layx-flex-vertical");
                            if (i === config.frameIndex) {
                                frameTitle.setAttribute("data-enable", "1");
                            }
                            if (Utils.isSupportTouch) {
                                frameTitle.ontouchstart = function (e) {
                                    e = e || window.event;
                                    that._setGroupIndex(config.id, this);
                                };
                                if (Utils.IsPC()) {
                                    frameTitle.onclick = function (e) {
                                        e = e || window.event;
                                        that._setGroupIndex(config.id, this);
                                        e.stopPropagation();
                                    };
                                }
                            } else {
                                frameTitle.onclick = function (e) {
                                    e = e || window.event;
                                    that._setGroupIndex(config.id, this);
                                    e.stopPropagation();
                                };
                            }
                            if (config.mergeTitle === false) {
                                groupTab.appendChild(frameTitle);
                            } else {
                                title.appendChild(frameTitle);
                            }
                            var groupLabel = document.createElement("label");
                            groupLabel.classList.add("layx-label");
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
                                var jsonStr = JSON.stringify(winform, null, 4).replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
                        };
                        inlayMenu.appendChild(destroyMenu);
                    }
                }
            }
            var main = document.createElement("div");
            main.classList.add("layx-main");
            main.classList.add("layx-flexauto");
            if (!config.statusBar) {
                main.style.setProperty("border-radius", "0 0 " + layxWindowStyle.borderRadius + " " + layxWindowStyle.borderRadius);
                main.style.setProperty("-moz-border-radius", "0 0 " + layxWindowStyle.borderRadius + " " + layxWindowStyle.borderRadius);
                main.style.setProperty("-webkit-border-radius", "0 0 " + layxWindowStyle.borderRadius + " " + layxWindowStyle.borderRadius);
            }
            layxWindow.appendChild(main);
            if (config.readonly === true) {
                var readonlyPanel = document.createElement("div");
                readonlyPanel.classList.add("layx-readonly");
                readonlyPanel.oncontextmenu = function (e) {
                    e = e || window.event;
                    e.returnValue = false;
                    return false;
                };
                if (config.focusable === true) {
                    readonlyPanel.onclick = function (e) {
                        e = e || window.event;
                        if (Utils.isFunction(config.event.onfocus)) {
                            var revel = Utils.isFunction(config.event.onfocus);
                            if (revel === false) {
                                return;
                            }
                            config.event.onfocus(layxWindow, winform);
                        }
                        that.updateZIndex(config.id);
                        e.stopPropagation();
                    };
                }
                main.appendChild(readonlyPanel);
            }
            switch (config.type) {
                case "html":
                default:
                    if (Utils.isFunction(config.event.onload.before)) {
                        var revel = config.event.onload.before(layxWindow, winform);
                        if (revel === false) {
                            return;
                        }
                    }
                    var contentShade = that.createContenLoadAnimate(main, config.loadingText, winform);
                    that.createHtmlBody(main, config, config.content);
                    contentShade && main.removeChild(contentShade);
                    if (winform.loadingTextTimer) {
                        clearInterval(winform.loadingTextTimer);
                        delete winform.loadingTextTimer;
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
                    var contentShade = that.createContenLoadAnimate(main, config.loadingText, winform);
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
                        var contentShade = that.createContenLoadAnimate(main, config.loadingText, winform);
                        config.preload = (/(^[1-9]\d*$)/.test(config.preload) === false) ? true : Math.min(config.preload, config.frames.length);
                        var groupLoadCompleteListener = setInterval(function () {
                            var loadComplteMains = layxWindow.querySelectorAll(".layx-group-main[data-complete='1']");
                            if (loadComplteMains.length === Utils.isBoolean(config.preload) ? config.frames.length : config.preload) {
                                clearInterval(groupLoadCompleteListener);
                                if (winform.loadingTextTimer) {
                                    clearInterval(winform.loadingTextTimer);
                                    delete winform.loadingTextTimer;
                                }
                                layxWindow.setAttribute("data-group-init", "1");
                                contentShade && main.removeChild(contentShade);
                                if (Utils.isFunction(config.event.onload.after)) {
                                    config.event.onload.after(layxWindow, winform);
                                }
                            }
                        }, 100);
                        for (var i = 0; i < config.frames.length; i++) {
                            var frameConfig = layxDeepClone({}, that.defaultFrames, config.frames[i]);
                            var frameBody = document.createElement("div");
                            frameBody.classList.add("layx-group-main");
                            frameBody.style.backgroundColor = frameConfig.bgColor;
                            frameBody.setAttribute("data-frameId", frameConfig.id);
                            if (i === config.frameIndex) {
                                frameBody.setAttribute("data-enable", "1");
                            }
                            main.appendChild(frameBody);
                            var isNeedLoad = (i === config.frameIndex) ? true : (Utils.isBoolean(config.preload) ? true : (i + 1 <= config.preload));
                            if (frameConfig.type === "html") {
                                that.createHtmlBody(frameBody, config, frameConfig.content, "group", frameConfig, isNeedLoad);
                                if (isNeedLoad) {
                                    frameBody.setAttribute("data-complete", "1");
                                }
                            } else if (frameConfig.type === "url") {
                                that.createFrameBody(frameBody, config, layxWindow, winform, "group", frameConfig, isNeedLoad);
                            }
                        }
                    }
                    break;
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
            var resize = document.createElement("div");
            resize.classList.add("layx-resizes");
            if (config.resizable === false) {
                resize.setAttribute("data-enable", "0");
            }
            layxWindow.appendChild(resize);
            var resizeTop = document.createElement("div");
            resizeTop.classList.add("layx-resize-top");
            if (Utils.isSupportTouch) {
                resizeTop.classList.add("layx-reisize-touch");
            }
            if (config.resizeLimit.t === true) {
                resizeTop.setAttribute("data-enable", "0");
            }
            new LayxResize(resizeTop, true, false, true, false);
            resize.appendChild(resizeTop);
            var resizeLeft = document.createElement("div");
            resizeLeft.classList.add("layx-resize-left");
            if (Utils.isSupportTouch) {
                resizeLeft.classList.add("layx-reisize-touch");
            }
            if (config.resizeLimit.l === true) {
                resizeLeft.setAttribute("data-enable", "0");
            }
            new LayxResize(resizeLeft, false, true, false, true);
            resize.appendChild(resizeLeft);
            var resizeLeftTop = document.createElement("div");
            resizeLeftTop.classList.add("layx-resize-left-top");
            if (Utils.isSupportTouch) {
                resizeLeftTop.classList.add("layx-reisize-touch");
            }
            if (config.resizeLimit.lt === true) {
                resizeLeftTop.setAttribute("data-enable", "0");
            }
            new LayxResize(resizeLeftTop, true, true, false, false);
            resize.appendChild(resizeLeftTop);
            var resizeRightTop = document.createElement("div");
            resizeRightTop.classList.add("layx-resize-right-top");
            if (Utils.isSupportTouch) {
                resizeRightTop.classList.add("layx-reisize-touch");
            }
            if (config.resizeLimit.rt === true) {
                resizeRightTop.setAttribute("data-enable", "0");
            }
            new LayxResize(resizeRightTop, true, false, false, false);
            resize.appendChild(resizeRightTop);
            var resizeLeftBottom = document.createElement("div");
            resizeLeftBottom.classList.add("layx-resize-left-bottom");
            if (Utils.isSupportTouch) {
                resizeLeftBottom.classList.add("layx-reisize-touch");
            }
            if (config.resizeLimit.lb === true) {
                resizeLeftBottom.setAttribute("data-enable", "0");
            }
            new LayxResize(resizeLeftBottom, false, true, false, false);
            resize.appendChild(resizeLeftBottom);
            var resizeRight = document.createElement("div");
            resizeRight.classList.add("layx-resize-right");
            if (Utils.isSupportTouch) {
                resizeRight.classList.add("layx-reisize-touch");
            }
            if (config.resizeLimit.r === true) {
                resizeRight.setAttribute("data-enable", "0");
            }
            new LayxResize(resizeRight, false, false, false, true);
            resize.appendChild(resizeRight);
            var resizeBottom = document.createElement("div");
            resizeBottom.classList.add("layx-resize-bottom");
            if (Utils.isSupportTouch) {
                resizeBottom.classList.add("layx-reisize-touch");
            }
            if (config.resizeLimit.b === true) {
                resizeBottom.setAttribute("data-enable", "0");
            }
            new LayxResize(resizeBottom, false, false, true, false);
            resize.appendChild(resizeBottom);
            var resizeRightBottom = document.createElement("div");
            resizeRightBottom.classList.add("layx-resize-right-bottom");
            if (Utils.isSupportTouch) {
                resizeRightBottom.classList.add("layx-reisize-touch");
            }
            if (config.resizeLimit.rb === true) {
                resizeRightBottom.setAttribute("data-enable", "0");
            }
            new LayxResize(resizeRightBottom, false, false, false, false);
            resize.appendChild(resizeRightBottom);
            if (config.statusBar) {
                var statusBar = document.createElement("div");
                statusBar.classList.add("layx-statu-bar");
                statusBar.style.setProperty("border-radius", "0 0 " + layxWindowStyle.borderRadius + " " + layxWindowStyle.borderRadius);
                statusBar.style.setProperty("-moz-border-radius", "0 0 " + layxWindowStyle.borderRadius + " " + layxWindowStyle.borderRadius);
                statusBar.style.setProperty("-webkit-border-radius", "0 0 " + layxWindowStyle.borderRadius + " " + layxWindowStyle.borderRadius);
                config.statusBarStyle && statusBar.setAttribute("style", config.statusBarStyle);
                if (config.statusBar === true && Utils.isArray(config.buttons)) {
                    var btnElement = that.createLayxButtons(config.buttons, config.id, config.dialogType === "prompt" ? true : false);
                    btnElement && statusBar.appendChild(btnElement);
                } else {
                    if (Utils.isDom(config.statusBar)) {
                        statusBar.appendChild(config.statusBar);
                    } else {
                        statusBar.innerHTML = config.statusBar;
                    }
                }
                layxWindow.appendChild(statusBar);
            }
            if (Utils.isDom(config.floatTarget)) {
                that.updateFloatWinPosition(config.id, config.floatDirection);
            }
            if (config.isOverToMax === true && (Utils.isDom(config.floatTarget) === false)) {
                if (_width > window.innerWidth || _height > window.innerHeight) {
                    that.max(config.id);
                }
            }
            var fixFocus = setInterval(function () {
                if (config.id !== Layx.focusId) {
                    that.updateZIndex(config.id);
                } else {
                    clearInterval(fixFocus);
                }
            }, 0);
            return winform;
        },
        updateFloatWinPosition: function (id, direction) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id],
                bubbleDirectionOptions = ['top', 'bottom', 'left', 'right'];
            if (layxWindow && winform && winform.isFloatTarget === true) {
                direction = bubbleDirectionOptions.indexOf(direction) > -1 ? direction : winform.floatDirection;
                var bubble = layxWindow.querySelector(".layx-bubble");
                var bubbleInlay = layxWindow.querySelector(".layx-bubble-inlay");
                if (bubble && bubbleInlay) {
                    bubble.classList.remove("layx-bubble-" + winform.floatDirection);
                    bubble.style["border" + winform.floatDirection.toFirstUpperCase() + "Color"] = "transparent";
                    bubbleInlay.classList.remove("layx-bubble-inlay-" + winform.floatDirection);
                    bubbleInlay.style["border" + winform.floatDirection.toFirstUpperCase() + "Color"] = "transparent";
                    bubble.classList.add("layx-bubble-" + direction);
                    bubbleInlay.classList.add("layx-bubble-inlay-" + direction);
                    var layxWindowStyle = layxWindow.currentStyle ? layxWindow.currentStyle : win.getComputedStyle(layxWindow, null);
                    var _controlBar = layxWindow.querySelector(".layx-control-bar");
                    var controlStyle = _controlBar && (_controlBar.currentStyle ? _controlBar.currentStyle : win.getComputedStyle(_controlBar, null));
                    if (winform.control === true && _controlBar && controlStyle) {
                        bubble.style["border" + direction.toFirstUpperCase() + "Color"] = (layxWindowStyle.borderColor === "rgba(0, 0, 0, 0)" || layxWindowStyle.borderColor === "transparent" || (!layxWindowStyle.borderColor) || (Utils.isBoolean(winform.border))) ? ((winform.skin === "default") ? "#3baced" : controlStyle.backgroundColor) : layxWindowStyle.borderColor;
                        bubbleInlay.style["border" + direction.toFirstUpperCase() + "Color"] = controlStyle.backgroundColor;
                    } else {
                        bubble.style["border" + direction.toFirstUpperCase() + "Color"] = (layxWindowStyle.borderColor === "rgba(0, 0, 0, 0)" || layxWindowStyle.borderColor === "transparent" || (!layxWindowStyle.borderColor) || (Utils.isBoolean(winform.border))) ? ((winform.skin === "default") ? "#3baced" : "#fff") : layxWindowStyle.borderColor;
                        bubbleInlay.style["border" + direction.toFirstUpperCase() + "Color"] = layxWindowStyle.backgroundColor;
                    }
                    var bubblePosition = Utils.compilebubbleDirection(direction, winform.floatTarget, winform.area.width, winform.area.height);
                    that.setPosition(id, {
                        top: bubblePosition.top,
                        left: bubblePosition.left
                    }, true);
                    var floatPos = Utils.getElementPos(winform.floatTarget);
                    if (direction === "top" || direction === "bottom") {
                        bubble.style.left = Math.abs(floatPos.x + winform.floatTarget.offsetWidth / 2 - winform.layxWindow.offsetLeft - 9) + "px";
                    }
                    if (direction === "left" || direction === "right") {
                        bubble.style.top = Math.abs(floatPos.y + winform.floatTarget.offsetHeight / 2 - winform.layxWindow.offsetTop - 9) + "px";
                    }
                    if ((direction === "top") || ((direction === "right" || direction === "left") && (winform.control === true && _controlBar && controlStyle && bubble.offsetTop > _controlBar.offsetHeight))) {
                        bubble.style["border" + direction.toFirstUpperCase() + "Color"] = (layxWindowStyle.borderColor === "rgba(0, 0, 0, 0)" || layxWindowStyle.borderColor === "transparent" || (!layxWindowStyle.borderColor) || (Utils.isBoolean(winform.border))) ? ((winform.skin === "default") ? "#3baced" : "#fff") : layxWindowStyle.borderColor;
                        bubbleInlay.style["border" + direction.toFirstUpperCase() + "Color"] = layxWindowStyle.backgroundColor;
                    }
                    winform.floatDirection = direction;
                    that.updateFloatWinResize(id, direction);
                }
            }
        },
        updateFloatWinResize: function (id, direction) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id],
                bubbleDirectionOptions = ['top', 'bottom', 'left', 'right'];
            if (layxWindow && winform && winform.isFloatTarget === true) {
                direction = bubbleDirectionOptions.indexOf(direction) > -1 ? direction : winform.floatDirection;
                switch (direction) {
                    case "bottom":
                        layxWindow.querySelector(".layx-resize-left").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-top").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-left-top").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-left-bottom").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-right-top").setAttribute("data-enable", "0");
                        if (winform.resizeLimit.r === false) {
                            layxWindow.querySelector(".layx-resize-right").removeAttribute("data-enable");
                        }
                        if (winform.resizeLimit.b === false) {
                            layxWindow.querySelector(".layx-resize-bottom").removeAttribute("data-enable");
                        }
                        if (winform.resizeLimit.rb === false) {
                            layxWindow.querySelector(".layx-resize-right-bottom").removeAttribute("data-enable");
                        }
                        break;
                    case "top":
                        layxWindow.querySelector(".layx-resize-left").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-left-top").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-bottom").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-left-bottom").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-right-bottom").setAttribute("data-enable", "0");
                        if (winform.resizeLimit.r === false) {
                            layxWindow.querySelector(".layx-resize-right").removeAttribute("data-enable");
                        }
                        if (winform.resizeLimit.t === false) {
                            layxWindow.querySelector(".layx-resize-top").removeAttribute("data-enable");
                        }
                        if (winform.resizeLimit.rt === false) {
                            layxWindow.querySelector(".layx-resize-right-top").removeAttribute("data-enable");
                        }
                        break;
                    case "right":
                        layxWindow.querySelector(".layx-resize-left").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-top").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-left-top").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-left-bottom").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-right-top").setAttribute("data-enable", "0");
                        if (winform.resizeLimit.r === false) {
                            layxWindow.querySelector(".layx-resize-right").removeAttribute("data-enable");
                        }
                        if (winform.resizeLimit.b === false) {
                            layxWindow.querySelector(".layx-resize-bottom").removeAttribute("data-enable");
                        }
                        if (winform.resizeLimit.rb === false) {
                            layxWindow.querySelector(".layx-resize-right-bottom").removeAttribute("data-enable");
                        }
                        break;
                    case "left":
                        layxWindow.querySelector(".layx-resize-top").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-right").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-left-top").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-right-top").setAttribute("data-enable", "0");
                        layxWindow.querySelector(".layx-resize-right-bottom").setAttribute("data-enable", "0");
                        if (winform.resizeLimit.l === false) {
                            layxWindow.querySelector(".layx-resize-left").removeAttribute("data-enable");
                        }
                        if (winform.resizeLimit.b === false) {
                            layxWindow.querySelector(".layx-resize-bottom").removeAttribute("data-enable");
                        }
                        if (winform.resizeLimit.lb === false) {
                            layxWindow.querySelector(".layx-resize-left-bottom").removeAttribute("data-enable");
                        }
                        break;
                }
            }
        },
        removeStoreWindowAreaInfo: function (id) {
            var that = this,
                windowId = "layx-" + id,
                storeAreaInfo = (typeof (Storage) !== "undefined") && !(win.location.protocol.indexOf("file:") > -1) && localStorage.getItem(windowId);
            if (storeAreaInfo) {
                localStorage.removeItem(windowId);
            }
        },
        storeWindowAreaInfo: function (id, area) {
            var that = this,
                windowId = "layx-" + id;
            (typeof (Storage) !== "undefined") && !(win.location.protocol.indexOf("file:") > -1) && localStorage.setItem(windowId, JSON.stringify(area));
        },
        getStoreWindowAreaInfo: function (id) {
            var that = this,
                windowId = "layx-" + id,
                storeAreaInfo = (typeof (Storage) !== "undefined") && !(win.location.protocol.indexOf("file:") > -1) && localStorage.getItem(windowId);
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
                        if (currentGroupMain.getAttribute("data-preload") === "1") {
                            var frameform = that.getGroupFrame(winform.frames, frameId);
                            if (frameform.type === "url") {
                                that.setGroupUrl(id, frameId, frameform.url);
                                currentGroupMain.removeAttribute("data-preload");
                            }
                            if (frameform.type === "html") {
                                that.setGroupContent(id, frameId, frameform.content, frameform.cloneElementContent);
                                currentGroupMain.removeAttribute("data-preload");
                            }
                        }
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
        cloneStore: {},
        createHtmlBody: function (main, config, content, type, frameConfig, isLoad) {
            var that = this;
            var html = document.createElement("div");
            html.classList.add("layx-html");
            html.setAttribute("id", "layx-" + config.id + (type === "group" ? "-" + frameConfig.id + "-" : "-") + "html");
            var newContent;
            if (isLoad !== false) {
                if (Utils.isDom(content)) {
                    var _ctStyle = content.currentStyle ? content.currentStyle : win.getComputedStyle(content, null);
                    if (type !== "group" && config.cloneElementContent === false) {
                        Layx.cloneStore[config.id] = {
                            prev: content.previousSibling,
                            parent: content.parentNode,
                            next: content.nextSibling,
                            display: _ctStyle.display
                        };
                    }
                    if (type === "group" && frameConfig.cloneElementContent === false) {
                        if (!Layx.cloneStore[config.id]) {
                            Layx.cloneStore[config.id] = { frames: {} };
                        }
                        Layx.cloneStore[config.id].frames[frameConfig.id] = {
                            prev: content.previousSibling,
                            parent: content.parentNode,
                            next: content.nextSibling,
                            display: _ctStyle.display
                        };
                    }
                    newContent = html.appendChild((type === "group" ? frameConfig : config).cloneElementContent === true ? content.cloneNode(true) : content);
                } else {
                    html.innerHTML = content;
                }
            } else {
                main.setAttribute("data-preload", "1");
            }
            main.appendChild(html);
            if (Utils.isDom(newContent)) {
                var contentStyle = newContent.currentStyle ? newContent.currentStyle : win.getComputedStyle(newContent, null);
                if (contentStyle.display === "none") {
                    newContent.style.display = "";
                }
            }
        },
        frameLoadHandle: function (iframe, main, config, layxWindow, winform, type, frameConfig, isLoad) {
            var that = this;
            var contentShade = (type === "group" ? iframe.parentNode.parentNode : iframe.parentNode).querySelector(".layx-content-shade");
            try {
                if (config.focusable === true && config.enableDomainFocus === true) {
                    if (!iframe.getAttribute("data-focus")) {
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
                        iframe.setAttribute("data-focus", "true");
                    }
                }
                var iframeTitle = config.title;
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
                iframe.contentWindow.document.addEventListener("click", function (event) {
                    var e = event || window.event || arguments.callee.caller.arguments[0];
                    if (config.focusable === true) {
                        if (Utils.isFunction(config.event.onfocus)) {
                            var revel = Utils.isFunction(config.event.onfocus);
                            if (revel === false) {
                                return;
                            }
                            config.event.onfocus(layxWindow, winform);
                        }
                        that.updateZIndex(config.id);
                    }
                }, false);
                iframe.contentWindow.document.addEventListener("keydown", function (event) {
                    var e = event || window.event || arguments.callee.caller.arguments[0];
                    var focusWindow = Layx.windows[Layx.focusId];
                    if (e && e.keyCode == 27) {
                        if (focusWindow) {
                            Layx.destroy(Layx.focusId, {}, false, true);
                        }
                    }
                    if (e && e.keyCode === 13) {
                        if (focusWindow && focusWindow.buttons.length > 0) {
                            if (focusWindow.buttonKey.toLowerCase() === "enter" && !e.ctrlKey) {
                                if (focusWindow.dialogType !== "prompt") {
                                    focusWindow.buttons[0].callback(focusWindow.id, Layx.getButton(focusWindow.id, focusWindow.buttons[0].id, e));
                                } else {
                                    var textarea = Layx.getPromptTextArea(focusWindow.id);
                                    focusWindow.buttons[0].callback(focusWindow.id, (textarea ? textarea.value : "").replace(/(^\s*)|(\s*$)/g, ""), textarea, Layx.getButton(focusWindow.id, focusWindow.buttons[0].id, e));
                                }
                            } else if (focusWindow.buttonKey.toLowerCase() === "ctrl+enter" && e.ctrlKey) {
                                if (focusWindow.dialogType !== "prompt") {
                                    focusWindow.buttons[0].callback(focusWindow.id, Layx.getButton(focusWindow.id, focusWindow.buttons[0].id, e));
                                } else {
                                    var textarea = Layx.getPromptTextArea(focusWindow.id);
                                    focusWindow.buttons[0].callback(focusWindow.id, (textarea ? textarea.value : "").replace(/(^\s*)|(\s*$)/g, ""), textarea, Layx.getButton(focusWindow.id, focusWindow.buttons[0].id, e));
                                }
                            }
                        }
                    }
                }, false);
            } catch (e) {
                if (type === "group") {
                    contentShade && contentShade.parentNode.removeChild(contentShade);
                }
                console.warn(e);
            } finally {
                if (type === "group") {
                    if (isLoad) {
                        main.setAttribute("data-complete", "1");
                    }
                    if (layxWindow.getAttribute("data-group-init") === "1") {
                        if (winform.loadingTextTimer) {
                            clearInterval(winform.loadingTextTimer);
                            delete winform.loadingTextTimer;
                        }
                        contentShade && contentShade.parentNode.removeChild(contentShade);
                        if (Utils.isFunction(config.event.onload.after)) {
                            config.event.onload.after(layxWindow, winform);
                        }
                    }
                } else {
                    contentShade && contentShade.parentNode.removeChild(contentShade);
                    if (winform.loadingTextTimer) {
                        clearInterval(winform.loadingTextTimer);
                        delete winform.loadingTextTimer;
                    }
                    if (Utils.isFunction(config.event.onload.after)) {
                        config.event.onload.after(layxWindow, winform);
                    }
                }
            }
        },
        createFrameBody: function (main, config, layxWindow, winform, type, frameConfig, isLoad) {
            var that = this;
            var iframe = document.createElement("iframe");
            iframe.setAttribute("id", "layx-" + config.id + (type === "group" ? "-" + frameConfig.id + "-" : "-") + "iframe");
            iframe.classList.add("layx-iframe");
            iframe.classList.add("layx-flexbox");
            iframe.setAttribute("allowtransparency", "true");
            iframe.setAttribute("frameborder", "0");
            if (win.navigator.userAgent.toLowerCase().indexOf('iphone') > -1 || (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))) {
                iframe.setAttribute("scrolling", "no");
            } else {
                iframe.setAttribute("scrolling", "auto");
            }
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute("mozallowfullscreen", "");
            iframe.setAttribute("webkitallowfullscreen", "");
            iframe.src = isLoad !== false ? ((type === "group" ? frameConfig.url : config.url) || 'about:blank') : 'about:blank';
            if (iframe.attachEvent) {
                iframe.attachEvent("onreadystatechange", function () {
                    if (iframe.readyState === "complete" || iframe.readyState == "loaded") {
                        iframe.detachEvent("onreadystatechange", arguments.callee);
                        that.frameLoadHandle(iframe, main, config, layxWindow, winform, type, frameConfig, isLoad);
                    }
                });
            } else {
                iframe.addEventListener("load", function () {
                    this.removeEventListener("load", arguments.call, false);
                    that.frameLoadHandle(iframe, main, config, layxWindow, winform, type, frameConfig, isLoad);
                }, false);
            }
            if (isLoad === false) {
                main.setAttribute("data-preload", "1");
            }
            main.appendChild(iframe);
        },
        setContent: function (id, content, cloneElementContent) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform) {
                if (winform.type === "html") {
                    var html = layxWindow.querySelector("#layx-" + id + "-html");
                    if (html) {
                        if (Utils.isFunction(winform.event.onload.before)) {
                            var revel = winform.event.onload.before(layxWindow, winform);
                            if (revel === false) {
                                return;
                            }
                        }
                        try {
                            var contentShade = that.createContenLoadAnimate(html.parentNode, winform.loadingText, winform);
                            cloneElementContent = Utils.isBoolean(cloneElementContent) ? cloneElementContent : winform.cloneElementContent;
                            var newContent;
                            if (Utils.isDom(content)) {
                                var _ctStyle = content.currentStyle ? content.currentStyle : win.getComputedStyle(content, null);
                                if (cloneElementContent === false) {
                                    Layx.cloneStore[id] = {
                                        prev: content.previousSibling,
                                        parent: content.parentNode,
                                        next: content.nextSibling,
                                        display: _ctStyle.display
                                    };
                                }
                                html.innerHTML = "";
                                newContent = html.appendChild(cloneElementContent === true ? content.cloneNode(true) : content);
                            } else {
                                html.innerHTML = content;
                            }
                            if (Utils.isDom(newContent)) {
                                var contentStyle = newContent.currentStyle ? newContent.currentStyle : window.getComputedStyle(newContent, null);
                                if (contentStyle.display === "none") {
                                    newContent.style.display = "";
                                }
                            }
                            winform.content = content;
                        } finally {
                            contentShade && html.parentNode.removeChild(contentShade);
                            if (winform.loadingTextTimer) {
                                clearInterval(winform.loadingTextTimer);
                                delete winform.loadingTextTimer;
                            }
                            if (Utils.isFunction(winform.event.onload.after)) {
                                winform.event.onload.after(layxWindow, winform);
                            }
                        }
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
        setGroupContent: function (id, frameId, content, cloneElementContent) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform && winform.type === "group") {
                var frameform = that.getGroupFrame(winform.frames, frameId);
                if (frameform.type === "html") {
                    var html = layxWindow.querySelector("#layx-" + id + "-" + frameId + "-" + "html");
                    if (html) {
                        if (Utils.isFunction(winform.event.onload.before)) {
                            var revel = winform.event.onload.before(layxWindow, winform);
                            if (revel === false) {
                                return;
                            }
                        }
                        try {
                            var contentShade = that.createContenLoadAnimate(html.parentNode.parentNode, winform.loadingText, winform);
                            cloneElementContent = Utils.isBoolean(cloneElementContent) ? cloneElementContent : frameform.cloneElementContent;
                            var newContent;
                            if (Utils.isDom(content)) {
                                var _ctStyle = content.currentStyle ? content.currentStyle : win.getComputedStyle(content, null);
                                if (cloneElementContent === false) {
                                    if (!Layx.cloneStore[id]) {
                                        Layx.cloneStore[id] = { frames: {} };
                                    }
                                    Layx.cloneStore[id].frames[frameId] = {
                                        prev: content.previousSibling,
                                        parent: content.parentNode,
                                        next: content.nextSibling,
                                        display: _ctStyle.display
                                    };
                                }
                                html.innerHTML = "";
                                newContent = html.appendChild(cloneElementContent === true ? content.cloneNode(true) : content);
                            } else {
                                html.innerHTML = content;
                            }
                            if (Utils.isDom(newContent)) {
                                var contentStyle = newContent.currentStyle ? newContent.currentStyle : window.getComputedStyle(newContent, null);
                                if (contentStyle.display === "none") {
                                    newContent.style.display = "";
                                }
                            }
                            frameform.content = content;
                        } finally {
                            contentShade && html.parentNode.parentNode.removeChild(contentShade);
                            if (winform.loadingTextTimer) {
                                clearInterval(winform.loadingTextTimer);
                                delete winform.loadingTextTimer;
                            }
                            if (Utils.isFunction(winform.event.onload.after)) {
                                winform.event.onload.after(layxWindow, winform);
                            }
                        }
                    }
                }
            }
        },
        createContenLoadAnimate: function (pEle, loadingText, winform, isCreateLoadAnimate) {
            var that = this;
            if (loadingText !== false) {
                if (Utils.isArray(loadingText) && loadingText.length === 2 && loadingText[0] === true) {
                    return that.createContenLoadAnimate(pEle, loadingText[1], winform, false);
                }
                var contentShade = document.createElement("div");
                contentShade.classList.add("layx-content-shade");
                contentShade.classList.add("layx-flexbox");
                contentShade.classList.add("layx-flex-center");
                if (Utils.isDom(loadingText)) {
                    contentShade.appendChild(loadingText);
                } else {
                    if (isCreateLoadAnimate !== false) {
                        contentShade.appendChild(that.createLoadAnimate());
                    }
                    var msgContent = document.createElement("div");
                    msgContent.classList.add("layx-load-content-msg");
                    msgContent.innerHTML = loadingText;
                    contentShade.appendChild(msgContent);
                    var span = document.createElement("span");
                    span.classList.add("layx-dot");
                    msgContent.appendChild(span);
                    var dotCount = 0;
                    winform.loadingTextTimer = setInterval(function () {
                        if (dotCount === 5) {
                            dotCount = 0;
                        }
                        ++dotCount;
                        var dotHtml = "";
                        for (var i = 0; i < dotCount; i++) {
                            dotHtml += ".";
                        }
                        span.innerHTML = dotHtml;
                    }, 200);
                }
                return pEle.appendChild(contentShade);
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
                        if (Utils.isFunction(winform.event.onload.before)) {
                            var revel = winform.event.onload.before(layxWindow, winform);
                            if (revel === false) {
                                return;
                            }
                        }
                        var contentShade = that.createContenLoadAnimate(iframe.parentNode, winform.loadingText, winform);
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
                        if (Utils.isFunction(winform.event.onload.before)) {
                            var revel = winform.event.onload.before(layxWindow, winform);
                            if (revel === false) {
                                return;
                            }
                        }
                        iframe.parentNode.removeAttribute("data-complete");
                        var contentShade = that.createContenLoadAnimate(iframe.parentNode.parentNode, winform.loadingText, winform);
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
                    var label = title.querySelector(".layx-label");
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
                    var label = title.querySelector(".layx-label");
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
                if (Utils.isFunction(winform.event.onstick.before)) {
                    var revel = winform.event.onstick.before(layxWindow, winform);
                    if (revel === false) {
                        return;
                    }
                }
                winform.isStick = !winform.isStick;
                var stickMenu = layxWindow.querySelector(".layx-stick-menu");
                if (stickMenu) {
                    stickMenu.setAttribute("data-enable", winform.isStick ? "1" : "0");
                    winform.isStick ? stickMenu.setAttribute("title", "取消置顶") : stickMenu.setAttribute("title", "置顶");
                }
                that.updateZIndex(id);
                if (Utils.isFunction(winform.event.onstick.after)) {
                    winform.event.onstick.after(layxWindow, winform);
                }
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
                    layxWindow.classList.remove("layx-max-statu");
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
                var _winform = layxDeepClone({}, {}, winform);
                delete that.windows[id];
                that.windows[id] = _winform;
                that.updateMinLayout();
                if (layxWindow.classList.contains("layx-min-statu")) {
                    layxWindow.classList.remove("layx-min-statu");
                }
                if (Utils.isFunction(_winform.event.onrestore.after)) {
                    _winform.event.onrestore.after(layxWindow, _winform);
                }
            }
        },
        min: function (id) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
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
                var innertArea = Utils.innerArea();
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
                if (layxWindow.classList.contains("layx-max-statu")) {
                    layxWindow.classList.remove("layx-max-statu");
                }
                var _winform = layxDeepClone({}, winform);
                delete that.windows[id];
                that.windows[id] = _winform;
                that.updateMinLayout();
                if (document.body.classList.contains("ilayx-body")) {
                    document.body.classList.remove('ilayx-body');
                }
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
                if (winform.dialogType !== "load" && winform.dialogType !== "msg") {
                    Layx.focusId = id;
                }
                if (winform.focusToReveal === true) {
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
                if (winform.maxable !== true)
                    return;
                if (winform.status === "max") {
                    layxWindow.style.top = 0;
                    layxWindow.style.left = 0;
                    layxWindow.style.width = innertArea.width + "px";
                    layxWindow.style.height = innertArea.height + "px";
                } else {
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
                    layxWindow.classList.add("layx-max-statu");
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
        destroyInlay: function (id) {
            var that = this;
            that.destroy(id, null, true);
        },
        destroy: function (id, params, inside, escKey, force) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                layxShade = document.getElementById(windowId + '-shade'),
                winform = that.windows[id];
            if (layxWindow && winform) {
                if (winform.escKey === false && escKey === true)
                    return;
                that.updateZIndex(id);
                if (Utils.isFunction(winform.event.ondestroy.before)) {
                    var revel = winform.event.ondestroy.before(layxWindow, winform, params || {}, inside === true, escKey === true);
                    if (force === true) { } else {
                        if (revel === false) {
                            return;
                        }
                    }
                }
                if (winform.closable !== true)
                    return;
                var oldNodeInfo = that.cloneStore[id];
                if (winform.type === "html" && oldNodeInfo) {
                    var html = layxWindow.querySelector("#layx-" + id + "-html");
                    if (html) {
                        var child = html.children[0];
                        child.style.display = oldNodeInfo.display;
                        if (oldNodeInfo.prev) {
                            setTimeout(function () {
                                Utils.insertAfter(child, oldNodeInfo.prev);
                            }, 0);
                        } else {
                            setTimeout(function () {
                                oldNodeInfo.parent && oldNodeInfo.parent.insertBefore(child, oldNodeInfo.next);
                            }, 0);
                        }
                    }
                }
                if (winform.type === "group" && oldNodeInfo) {
                    if (oldNodeInfo && oldNodeInfo.frames) {
                        for (var frameId in oldNodeInfo.frames) {
                            var frameInfo = oldNodeInfo.frames[frameId];
                            var html = layxWindow.querySelector("#layx-" + id + "-" + frameId + "-html");
                            if (html) {
                                var child = html.children[0];
                                child.style.display = frameInfo.display;
                                if (frameInfo.prev) {
                                    setTimeout(function () {
                                        Utils.insertAfter(child, frameInfo.prev);
                                    }, 0);
                                } else {
                                    setTimeout(function () {
                                        frameInfo.parent && frameInfo.parent.insertBefore(child, frameInfo.next);
                                    }, 0);
                                }
                            }
                        }
                    }
                }
                Layx.focusId = Layx.prevFocusId;
                delete that.cloneStore[id];
                delete that.windows[id];
                if (document.body.classList.contains("ilayx-body")) {
                    document.body.classList.remove('ilayx-body');
                }
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
                if (winform.loadingTextTimer)
                    clearInterval(winform.loadingTextTimer);
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
                if (winform.storeStatus === true) {
                    that.storeWindowAreaInfo(id, winform.area);
                }
                layxWindow.style.left = _position.left + "px";
                layxWindow.style.top = _position.top + "px";
            }
        },
        setSize: function (id, area) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform) {
                if (area) {
                    if (area["width"]) {
                        var _width = Utils.compileLayxWidthOrHeight("width", area["width"], that.defaults.width);
                        winform.area.width = _width;
                        layxWindow.style.width = _width + "px";
                    }
                    if (area["height"]) {
                        var _height = Utils.compileLayxWidthOrHeight("height", area["height"], that.defaults.height);
                        winform.area.height = _height;
                        layxWindow.style.height = _height + "px";
                    }
                    if (winform.storeStatus === true) {
                        that.storeWindowAreaInfo(id, winform.area);
                    }
                }
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
                buttonItem.setAttribute("title", buttonConfig.label);
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
                    e = e || window.event || arguments.callee.caller.arguments[0];
                    if (Utils.isFunction(this.callback)) {
                        if (isPrompt === true) {
                            var textarea = that.getPromptTextArea(id);
                            that.updateZIndex(id);
                            this.callback(id, (textarea ? textarea.value : "").replace(/(^\s*)|(\s*$)/g, ""), textarea, this, e);
                        } else {
                            that.updateZIndex(id);
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
        getStrSizeRange: function (str, minWidth, minHeight, maxWidth, maxHeight, dialogIcon) {
            var width = 0,
                height = 0,
                span = document.createElement("span");
            span.innerHTML = str;
            span.classList.add("layx-calc-text");
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
                width: width + (dialogIcon === true ? 45 : 0),
                height: height
            };
        },
        getButton: function (id, buttonId) {
            var that = this,
                windowId = "layx-" + id,
                layxWindow = document.getElementById(windowId),
                winform = that.windows[id];
            if (layxWindow && winform) {
                return layxWindow.querySelector("#layx-" + id + "-button" + (buttonId ? "-" + buttonId : ""));
            }
            return null;
        },
        tip: function (msg, target, direction, options) {
            var that = this;
            if (Utils.isDom(target)) {
                var _id = (options && options.id) ? options.id : 'layx-dialog-tip-' + Utils.rndNum(8);
                target.addEventListener("mouseover", function (e) {
                    var msgSizeRange = that.getStrSizeRange(msg, 20, 20, 320, 90, ((options && options.dialogIcon) ? true : false));
                    that.create(layxDeepClone({}, {
                        id: _id,
                        type: 'html',
                        control: false,
                        content: that.createDialogContent("tip", msg, ((options && options.dialogIcon) ? options.dialogIcon : false)),
                        width: msgSizeRange.width,
                        height: msgSizeRange.height,
                        minHeight: msgSizeRange.height,
                        minWidth: msgSizeRange.width,
                        stickMenu: false,
                        minMenu: false,
                        floatTarget: target,
                        floatDirection: direction || 'bottom',
                        maxMenu: false,
                        closeMenu: false,
                        alwaysOnTop: true,
                        resizable: false,
                        movable: false,
                        allowControlDbclick: false,
                        autodestroyText: false,
                        loadingText: false,
                        storeStatus: false
                    }, options));
                }, false);
                target.addEventListener("mouseout", function (e) {
                    that.destroy(_id, null, true);
                }, false);
            }
        },
        msg: function (msg, options) {
            var that = this;
            var msgSizeRange = that.getStrSizeRange(msg, 120, 20, 320, 90, ((options && options.dialogIcon) ? true : false));
            var winform = that.create(layxDeepClone({}, {
                id: (options && options.id) ? options.id : 'layx-dialog-msg-' + Utils.rndNum(8),
                type: 'html',
                control: false,
                content: that.createDialogContent("msg", msg, ((options && options.dialogIcon) ? options.dialogIcon : false)),
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
                loadingText: false,
                storeStatus: false,
                dialogType: 'msg'
            }, options));
            that.flicker(winform.id);
            return winform;
        },
        createDialogContent: function (type, content, iconType) {
            var that = this;
            var dialog = document.createElement("div");
            dialog.classList.add("layx-dialog-" + type);
            dialog.classList.add("layx-flexbox");
            if (iconType) {
                var dialogIcon = document.createElement("div");
                dialogIcon.classList.add("layx-dialog-icon");
                var iconWrap = document.createElement("div");
                iconWrap.classList.add("layx-icon");
                iconWrap.classList.add("layx-dialog-icon-" + iconType);
                switch (iconType) {
                    case "success":
                        iconWrap.innerHTML = '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-right"></use></svg>';
                        break;
                    case "warn":
                        iconWrap.innerHTML = '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-warn"></use></svg>';
                        break;
                    case "error":
                        iconWrap.innerHTML = '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-error"></use></svg>';
                        break;
                    case "help":
                        iconWrap.innerHTML = '<svg class="layx-iconfont" aria-hidden="true"><use xlink:href="#layx-icon-help"></use></svg>';
                        break;
                }
                dialogIcon.appendChild(iconWrap);
                dialog.appendChild(dialogIcon);
            }
            var dialogContent = document.createElement("div");
            dialogContent.classList.add("layx-dialog-content");
            dialogContent.classList.add("layx-flexauto");
            dialogContent.innerHTML = content;
            dialog.appendChild(dialogContent);
            return dialog;
        },
        alert: function (title, msg, yes, options) {
            var that = this;
            var msgSizeRange = that.getStrSizeRange(msg, 137, 66, 352, 157, ((options && options.dialogIcon) ? true : false));
            var winform = that.create(layxDeepClone({}, {
                id: (options && options.id) ? options.id : 'layx-dialog-alert-' + Utils.rndNum(8),
                title: title || "提示消息",
                icon: false,
                type: 'html',
                content: that.createDialogContent("alert", msg, ((options && options.dialogIcon) ? options.dialogIcon : false)),
                width: msgSizeRange.width + 20,
                height: msgSizeRange.height + 73,
                minHeight: msgSizeRange.height + 73,
                stickMenu: false,
                dialogType: "alert",
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
                        event = event || window.event || arguments.callee.caller.arguments[0];
                        event.stopPropagation();
                        if (Utils.isFunction(yes)) {
                            var reval = yes(id, button, event);
                            if (reval !== false) {
                                Layx.destroy(id);
                            }
                        } else {
                            Layx.destroy(id);
                        }
                    }
                }],
                position: 'ct',
                loadingText: false,
                storeStatus: false
            }, options));
            return winform;
        },
        confirm: function (title, msg, yes, options) {
            var that = this;
            var msgSizeRange = that.getStrSizeRange(msg, 180, 137, 352, 180, ((options && options.dialogIcon) ? true : false));
            var winform = that.create(layxDeepClone({}, {
                id: (options && options.id) ? options.id : 'layx-dialog-confirm-' + Utils.rndNum(8),
                title: title || "询问消息",
                icon: false,
                type: 'html',
                content: that.createDialogContent("confirm", msg, ((options && options.dialogIcon) ? options.dialogIcon : false)),
                width: msgSizeRange.width + 20,
                height: msgSizeRange.height,
                minHeight: msgSizeRange.height,
                stickMenu: false,
                dialogType: "confirm",
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
                        event = event || window.event || arguments.callee.caller.arguments[0];
                        event.stopPropagation();
                        if (Utils.isFunction(yes)) {
                            var reval = yes(id, button);
                            if (reval !== false) {
                                Layx.destroy(id);
                            }
                        }
                    }
                }, {
                    label: '取消',
                    callback: function (id, button, event) {
                        event = event || window.event;
                        event.stopPropagation();
                        Layx.destroy(id);
                    }
                }],
                statusBar: true,
                position: 'ct',
                loadingText: false,
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
                var promptPanel = layxWindow.querySelector(".layx-dialog-prompt");
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
            var msgSizeRange = that.getStrSizeRange(msg, 200, 184, 352, 200);
            var winform = that.create(layxDeepClone({}, {
                id: (options && options.id) ? options.id : 'layx-dialog-prompt-' + Utils.rndNum(8),
                title: title || "请输入信息",
                icon: false,
                type: 'html',
                content: that.createDialogContent("prompt", "<label>" + msg + "</label><textarea class='layx-textarea'>" + (defaultValue ? defaultValue.toString() : '') + "</textarea>"),
                width: msgSizeRange.width + 20,
                height: msgSizeRange.height,
                minHeight: msgSizeRange.height,
                stickMenu: false,
                dialogType: "prompt",
                minMenu: false,
                minable: false,
                maxMenu: false,
                maxable: false,
                alwaysOnTop: true,
                resizable: false,
                allowControlDbclick: false,
                shadable: true,
                statusBar: true,
                buttonKey: 'ctrl+enter',
                buttons: [{
                    label: '确定',
                    callback: function (id, value, textarea, button, event) {
                        event = event || window.event || arguments.callee.caller.arguments[0];
                        event.stopPropagation();
                        if (textarea && value.length === 0) {
                            textarea.focus();
                        } else {
                            if (Utils.isFunction(yes)) {
                                var reval = yes(id, value, textarea, button, event);
                                if (reval !== false) {
                                    Layx.destroy(id);
                                }
                            }
                        }
                    }
                }, {
                    label: '取消',
                    callback: function (id, value, textarea, button, event) {
                        event = event || window.event;
                        event.stopPropagation();
                        Layx.destroy(id);
                    }
                }],
                position: 'ct',
                loadingText: false,
                storeStatus: false
            }, options));
            return winform;
        },
        createLoadAnimate: function () {
            var animate = document.createElement("div");
            animate.classList.add("layx-load-animate");
            var inner = document.createElement("div");
            inner.classList.add("layx-load-inner");
            var spiner = document.createElement("div");
            spiner.classList.add("layx-load-spiner");
            inner.appendChild(spiner);
            var filler = document.createElement("div");
            filler.classList.add("layx-load-filler");
            inner.appendChild(filler);
            var masker = document.createElement("div");
            masker.classList.add("layx-load-masker");
            inner.appendChild(masker);
            animate.appendChild(inner);
            var inner2 = inner.cloneNode(true);
            inner2.classList.remove("layx-load-inner");
            inner2.classList.add("layx-load-inner2");
            animate.appendChild(inner2);
            return animate;
        },
        load: function (id, msg, options) {
            var that = this;
            var msgSizeRange = that.getStrSizeRange(msg, 120, 53, 320, 90);
            var loadElement = document.createElement("div");
            loadElement.classList.add("layx-dialog-load");
            loadElement.classList.add("layx-flexbox");
            loadElement.classList.add("layx-flex-center");
            loadElement.appendChild(that.createLoadAnimate());
            var msgContent = document.createElement("div");
            msgContent.classList.add("layx-load-msg");
            msgContent.innerHTML = msg;
            loadElement.appendChild(msgContent);
            var span = document.createElement("span");
            span.classList.add("layx-dot");
            msgContent.appendChild(span);
            var dotCount = 0;
            var loadTimer = setInterval(function () {
                if (dotCount === 5) {
                    dotCount = 0;
                }
                ++dotCount;
                var dotHtml = "";
                for (var i = 0; i < dotCount; i++) {
                    dotHtml += ".";
                }
                span.innerHTML = dotHtml;
            }, 200);
            var winform = that.create(layxDeepClone({}, {
                id: id ? id : 'layx-dialog-load-' + Utils.rndNum(8),
                type: 'html',
                control: false,
                shadable: true,
                content: loadElement,
                cloneElementContent: false,
                width: msgSizeRange.width + 70,
                height: msgSizeRange.height,
                minHeight: msgSizeRange.height,
                stickMenu: false,
                minMenu: false,
                maxMenu: false,
                closeMenu: false,
                escKey: false,
                alwaysOnTop: true,
                resizable: false,
                movable: false,
                allowControlDbclick: false,
                position: 'ct',
                loadingText: false,
                storeStatus: false,
                dialogType: 'load'
            }, options));
            winform.loadTimer = loadTimer;
            return winform;
        }
    };
    String.prototype.toFirstUpperCase = function () {
        return this.replace(/^\S/, function (s) {
            return s.toUpperCase();
        });
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
        resolution: 0,
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
                            this.iframes[i].cb.apply(win, []);
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
        isSupportTouch: "ontouchstart" in document ? true : false,
        isSupportMouse: "onmouseup" in document ? true : false,
        IsPC: function () {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
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
        insertAfter: function (newEl, targetEl) {
            var parentEl = targetEl.parentNode;
            if (parentEl.lastChild == targetEl) {
                parentEl.appendChild(newEl);
            } else {
                parentEl.insertBefore(newEl, targetEl.nextSibling);
            }
        },
        innerArea: function () {
            return {
                width: win.innerWidth,
                height: win.innerHeight
            };
        },
        getCross: function (p1, p2, p) {
            return (p2.x - p1.x) * (p.y - p1.y) - (p.x - p1.x) * (p2.y - p1.y);
        },
        IsPointInMatrix: function (area, p) {
            var that = this;
            var p1 = area.p1;
            var p2 = area.p2;
            var p3 = area.p3;
            var p4 = area.p4;
            return that.getCross(p1, p2, p) * that.getCross(p3, p4, p) >= 0 && that.getCross(p2, p3, p) * that.getCross(p4, p1, p) >= 0;
        },
        checkElementIsVisual: function (pEle, ele, allContain) {
            var that = this;
            var innerArea = that.innerArea();
            var pEleStartPos = that.getElementPos(pEle);
            var pEleEndPos = {
                x: pEleStartPos.x + pEle.offsetWidth,
                y: pEleStartPos.y + pEle.offsetHeight
            };
            var eleStartPos = that.getElementPos(ele);
            var eleEndPos = {
                x: eleStartPos.x + ele.offsetWidth,
                y: eleStartPos.y + ele.offsetHeight
            };
            if (allContain === false) {
                var pleArea = {
                    p1: {
                        x: pEleStartPos.x,
                        y: pEleEndPos.y
                    },
                    p2: {
                        x: pEleStartPos.x,
                        y: pEleStartPos.y
                    },
                    p3: {
                        x: pEleEndPos.x,
                        y: pEleStartPos.y
                    },
                    p4: {
                        x: pEleEndPos.x,
                        y: pEleEndPos.y
                    }
                };
                var winArea = {
                    p1: {
                        x: 0,
                        y: innerArea.height
                    },
                    p2: {
                        x: 0,
                        y: 0
                    },
                    p3: {
                        x: innerArea.width,
                        y: 0
                    },
                    p4: {
                        x: innerArea.width,
                        y: innerArea.height
                    }
                };
                var ltPoint = that.IsPointInMatrix(pleArea, {
                    x: eleStartPos.x,
                    y: eleStartPos.y
                });
                var rtPoint = that.IsPointInMatrix(pleArea, {
                    x: eleEndPos.x,
                    y: eleStartPos.y
                });
                var lbPoint = that.IsPointInMatrix(pleArea, {
                    x: eleStartPos.x,
                    y: eleEndPos.y
                });
                var rbPoint = that.IsPointInMatrix(pleArea, {
                    x: eleEndPos.x,
                    y: eleEndPos.y
                });
                var wltPoint = that.IsPointInMatrix(winArea, {
                    x: eleStartPos.x,
                    y: eleStartPos.y
                });
                var wrtPoint = that.IsPointInMatrix(winArea, {
                    x: eleEndPos.x,
                    y: eleStartPos.y
                });
                var wlbPoint = that.IsPointInMatrix(winArea, {
                    x: eleStartPos.x,
                    y: eleEndPos.y
                });
                var wrbPoint = that.IsPointInMatrix(winArea, {
                    x: eleEndPos.x,
                    y: eleEndPos.y
                });
                return (ltPoint || rtPoint || lbPoint || rbPoint) && (wltPoint || wrtPoint || wlbPoint || wrbPoint);
            }
            return (eleStartPos.x >= pEleStartPos.x) && (eleEndPos.x <= pEleEndPos.x) && (eleStartPos.y >= pEleStartPos.y) && (eleEndPos.y <= pEleEndPos.y) && (eleStartPos.x >= 0) && (eleEndPos.x <= innerArea.width) && (eleStartPos.y >= 0) && (eleEndPos.y <= innerArea.height);
        },
        compilebubbleDirection: function (direction, target, width, height) {
            var that = this,
                bubbleDirectionOptions = ['top', 'bottom', 'left', 'right'],
                targetPos = that.getElementPos(target),
                innerArea = that.innerArea(),
                bubbleSize = 11,
                pos = {
                    top: 0,
                    left: 0
                };
            direction = bubbleDirectionOptions.indexOf(direction) > -1 ? direction : 'bottom';
            switch (direction) {
                case "bottom":
                    pos.top = targetPos.y + target.offsetHeight + bubbleSize;
                    pos.left = targetPos.x;
                    if (targetPos.x + width >= innerArea.width) {
                        pos.left = innerArea.width - width;
                    }
                    break;
                case "top":
                    pos.top = targetPos.y - (height + bubbleSize);
                    pos.left = targetPos.x;
                    if (targetPos.x + width >= innerArea.width) {
                        pos.left = innerArea.width - width;
                    }
                    break;
                case "right":
                    pos.top = targetPos.y;
                    pos.left = targetPos.x + target.offsetWidth + bubbleSize;
                    if (targetPos.y + height >= innerArea.height) {
                        pos.top = innerArea.height - height;
                    }
                    break;
                case "left":
                    pos.top = targetPos.y;
                    pos.left = targetPos.x - (width + bubbleSize);
                    if (targetPos.y + height >= innerArea.height) {
                        pos.top = innerArea.height - height;
                    }
                    break;
            }
            return pos;
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
            if (/^[1-9]\d*v[hw]$/.test(widthOrHeight)) {
                if (type === "width") {
                    return innerArea.width * parseFloat(widthOrHeight) / 100;
                }
                if (type === "height") {
                    return innerArea.height * parseFloat(widthOrHeight) / 100;
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
            if (e.touches) {
                if (Utils.IsPC()) {
                    var button = e.button || e.which;
                    if (button == 1 && e.shiftKey == false) {
                        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                        var x = e.pageX || e.clientX + scrollX;
                        var y = e.pageY || e.clientY + scrollY;
                        return {
                            x: x,
                            y: y
                        };
                    }
                }
                return {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                };
            } else {
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                var x = e.pageX || e.clientX + scrollX;
                var y = e.pageY || e.clientY + scrollY;
                return {
                    x: x,
                    y: y
                };
            }
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
            var moveMouseCoord = Utils.getMousePosition(e),
                distX = moveMouseCoord.x - handle.mouseStartCoord.x,
                distY = moveMouseCoord.y - handle.mouseStartCoord.y;
            if (Utils.isSupportTouch) {
                if (e.cancelable) {
                    if (!e.defaultPrevented) {
                        e.preventDefault();
                    }
                }
                if (((distX !== 0 || distY !== 0) && (new Date() - handle.touchDate > 100)) === false)
                    return;
                if (Utils.IsPC()) {
                    var button = e.button || e.which;
                    if ((button == 1 && e.shiftKey == false) === false)
                        return;
                    if (!e.defaultPrevented) {
                        e.preventDefault();
                    }
                    if ((distX !== 0 || distY !== 0) === false)
                        return;
                }
            } else {
                var button = e.button || e.which;
                if ((button == 1 && e.shiftKey == false) === false)
                    return;
                if (!e.defaultPrevented) {
                    e.preventDefault();
                }
                if ((distX !== 0 || distY !== 0) === false)
                    return;
            }
            var _top = handle.winform.area.top + distY,
                _left = handle.winform.area.left + distX,
                _height = isTop ? handle.winform.area.height - distY : handle.winform.area.height + distY,
                _width = isLeft ? handle.winform.area.width - distX : handle.winform.area.width + distX;
            LayxResize.isResizing = true;
            if (LayxResize.isFirstResizing === true) {
                LayxResize.isFirstResizing = false;
                if (Utils.isFunction(handle.winform.event.onresize.before)) {
                    var reval = handle.winform.event.onresize.before(handle.layxWindow, handle.winform);
                    if (reval === false) {
                        LayxResize.isResizing = false;
                        LayxResize.isFirstResizing = true;
                        if (Utils.isSupportTouch) {
                            document.ontouchend = null;
                            document.ontouchmove = null;
                            if (Utils.IsPC()) {
                                document.onmouseup = null;
                                document.onmousemove = null;
                            }
                        } else {
                            document.onmouseup = null;
                            document.onmousemove = null;
                        }
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
        };
        var dragend = function (e) {
            e = e || window.event;
            if (Utils.isSupportTouch) {
                document.ontouchend = null;
                document.ontouchmove = null;
                if (Utils.IsPC()) {
                    var button = e.button || e.which;
                    if (button == 1 && e.shiftKey == false) {
                        var resizeList = handle.layxWindow.querySelectorAll(".layx-resizes > div");
                        for (var i = 0; i < resizeList.length; i++) {
                            resizeList[i].classList.add("layx-reisize-touch");
                        }
                    }
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
            } else {
                document.onmouseup = null;
                document.onmousemove = null;
            }
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
                if (handle.winform.storeStatus === true) {
                    Layx.storeWindowAreaInfo(handle.winform.id, {
                        top: handle.winform.area.top,
                        left: handle.winform.area.left,
                        width: handle.winform.area.width,
                        height: handle.winform.area.height
                    });
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
                        handle.touchDate = new Date();
                        var mousePreventDefault = layxWindow.querySelector(".layx-mouse-preventDefault");
                        if (!mousePreventDefault) {
                            mousePreventDefault = document.createElement("div");
                            mousePreventDefault.classList.add("layx-mouse-preventDefault");
                            var main = layxWindow.querySelector(".layx-main");
                            if (main) {
                                main.appendChild(mousePreventDefault);
                            }
                        }
                        if (Utils.isSupportTouch) {
                            document.ontouchend = dragend;
                            document.ontouchmove = drag;
                            if (Utils.IsPC()) {
                                var button = e.button || e.which;
                                if (button == 1 && e.shiftKey == false) {
                                    var resizeList = layxWindow.querySelectorAll(".layx-resizes > div");
                                    for (var i = 0; i < resizeList.length; i++) {
                                        resizeList[i].classList.remove("layx-reisize-touch");
                                    }
                                }
                                document.onmouseup = dragend;
                                document.onmousemove = drag;
                            }
                        } else {
                            document.onmouseup = dragend;
                            document.onmousemove = drag;
                        }
                    } else {
                        Layx.restore(id);
                    }
                }
            }
            return false;
        };
        if (Utils.isSupportTouch) {
            handle.ontouchstart = dragstart;
            if (Utils.IsPC()) {
                handle.onmousedown = dragstart;
            }
        } else {
            handle.onmousedown = dragstart;
        }
    };
    var LayxDrag = function (handle) {
        LayxDrag.isMoveing = false;
        LayxDrag.isFirstMoveing = true;
        var drag = function (e) {
            e = e || window.event;
            var moveMouseCoord = Utils.getMousePosition(e),
                distX = moveMouseCoord.x - handle.mouseStartCoord.x,
                distY = moveMouseCoord.y - handle.mouseStartCoord.y;
            if (Utils.isSupportTouch) {
                if (e.cancelable) {
                    if (!e.defaultPrevented) {
                        e.preventDefault();
                    }
                }
                if (((distX !== 0 || distY !== 0) && (new Date() - handle.touchDate > 100)) === false)
                    return;
                if (Utils.IsPC()) {
                    var button = e.button || e.which;
                    if ((button == 1 && e.shiftKey == false) === false)
                        return;
                    if (!e.defaultPrevented) {
                        e.preventDefault();
                    }
                    if ((distX !== 0 || distY !== 0) === false)
                        return;
                }
            } else {
                var button = e.button || e.which;
                if ((button == 1 && e.shiftKey == false) === false)
                    return;
                if (!e.defaultPrevented) {
                    e.preventDefault();
                }
                if ((distX !== 0 || distY !== 0) === false)
                    return;
            }
            LayxDrag.isMoveing = true;
            if (LayxDrag.isFirstMoveing === true) {
                LayxDrag.isFirstMoveing = false;
                if (Utils.isFunction(handle.winform.event.onmove.before)) {
                    var reval = handle.winform.event.onmove.before(handle.layxWindow, handle.winform);
                    if (reval === false) {
                        LayxDrag.isMoveing = false;
                        LayxDrag.isFirstMoveing = true;
                        if (Utils.isSupportTouch) {
                            document.ontouchend = null;
                            document.ontouchmove = null;
                        } else {
                            document.onmouseup = null;
                            document.onmousemove = null;
                        }
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
            _left = Math.max(_left, -(handle.winform.area.width - 15));
            _left = Math.min(_left, handle.innerArea.width - 15);
            handle.layxWindow.style.left = _left + "px";
            handle.layxWindow.style.top = _top + "px";
            if (Utils.isFunction(handle.winform.event.onmove.progress)) {
                handle.winform.event.onmove.progress(handle.layxWindow, handle.winform);
            }
        };
        var dragend = function (e) {
            e = e || window.event;
            if (Utils.isSupportTouch) {
                document.ontouchend = null;
                document.ontouchmove = null;
                if (Utils.IsPC()) {
                    var button = e.button || e.which;
                    if (button == 1 && e.shiftKey == false) {
                        var resizeList = handle.layxWindow.querySelectorAll(".layx-resizes > div");
                        for (var i = 0; i < resizeList.length; i++) {
                            resizeList[i].classList.add("layx-reisize-touch");
                        }
                    }
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
            } else {
                document.onmouseup = null;
                document.onmousemove = null;
            }
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
                if (handle.winform.storeStatus === true) {
                    Layx.storeWindowAreaInfo(handle.winform.id, {
                        top: handle.winform.area.top,
                        left: handle.winform.area.left,
                        width: handle.winform.area.width,
                        height: handle.winform.area.height
                    });
                }
                if (handle.winform.area.top === 0 && handle.winform.status === "normal" && handle.winform.maxable === true && handle.winform.resizable === true && handle.winform.dragInTopToMax === true) {
                    handle.winform.area.top = handle.defaultArea.top;
                    handle.winform.area.left = handle.defaultArea.left;
                    if (handle.winform.storeStatus === true) {
                        Layx.storeWindowAreaInfo(handle.winform.id, {
                            top: handle.winform.area.top,
                            left: handle.winform.area.left,
                            width: handle.winform.area.width,
                            height: handle.winform.area.height
                        });
                    }
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
                        handle.touchDate = new Date();
                        var mousePreventDefault = layxWindow.querySelector(".layx-mouse-preventDefault");
                        if (!mousePreventDefault) {
                            mousePreventDefault = document.createElement("div");
                            mousePreventDefault.classList.add("layx-mouse-preventDefault");
                            var main = layxWindow.querySelector(".layx-main");
                            if (main) {
                                main.appendChild(mousePreventDefault);
                            }
                        }
                        if (Utils.isSupportTouch) {
                            document.ontouchend = dragend;
                            document.ontouchmove = drag;
                            if (Utils.IsPC()) {
                                var button = e.button || e.which;
                                if (button == 1 && e.shiftKey == false) {
                                    var resizeList = layxWindow.querySelectorAll(".layx-resizes > div");
                                    for (var i = 0; i < resizeList.length; i++) {
                                        resizeList[i].classList.remove("layx-reisize-touch");
                                    }
                                }
                                document.onmouseup = dragend;
                                document.onmousemove = drag;
                            }
                        } else {
                            document.onmouseup = dragend;
                            document.onmousemove = drag;
                        }
                    } else {
                        Layx.restore(id);
                    }
                }
            }
            return false;
        };
        if (Utils.isSupportTouch) {
            handle.ontouchstart = dragstart;
            if (Utils.IsPC()) {
                handle.onmousedown = dragstart;
            }
        } else {
            handle.onmousedown = dragstart;
        }
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
                url: url,
                useFrameTitle: title === true ? true : false
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
        destroy: function (id, params, force) {
            Layx.destroy(id, params, false, false, force);
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
        setContent: function (id, content, cloneElementContent) {
            Layx.setContent(id, content, cloneElementContent);
        },
        setUrl: function (id, url) {
            Layx.setUrl(id, url);
        },
        setGroupContent: function (id, frameId, content, cloneElementContent) {
            Layx.setGroupContent(id, frameId, content, cloneElementContent);
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
        tip: function (msg, target, direction, options) {
            Layx.tip(msg, target, direction, options);
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
        updateFloatWinPosition: function (id, direction) {
            Layx.updateFloatWinPosition(id, direction);
        },
        getElementPos: function (ele) {
            return Utils.getElementPos(ele);
        },
        destroyInlay: function (id) {
            Layx.destroyInlay(id);
        },
        checkVisual: function (pEle, ele, allContain) {
            return Utils.checkElementIsVisual(pEle, ele, allContain);
        },
        getButton: function (id, buttonId) {
            return Layx.getButton(id, buttonId);
        },
        setSize: function (id, area) {
            Layx.setSize(id, area);
        }
    };
    win.document.addEventListener("keydown", function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        var focusWindow = Layx.windows[Layx.focusId];
        if (e && e.keyCode == 27) {
            if (focusWindow) {
                Layx.destroy(Layx.focusId, {}, false, true);
            }
        }
        if (e && e.keyCode === 13) {
            if (focusWindow && focusWindow.buttons.length > 0) {
                if (focusWindow.buttonKey.toLowerCase() === "enter" && !e.ctrlKey) {
                    if (focusWindow.dialogType !== "prompt") {
                        focusWindow.buttons[0].callback(focusWindow.id, Layx.getButton(focusWindow.id, focusWindow.buttons[0].id, e));
                    } else {
                        var textarea = Layx.getPromptTextArea(focusWindow.id);
                        focusWindow.buttons[0].callback(focusWindow.id, (textarea ? textarea.value : "").replace(/(^\s*)|(\s*$)/g, ""), textarea, Layx.getButton(focusWindow.id, focusWindow.buttons[0].id, e));
                    }
                } else if (focusWindow.buttonKey.toLowerCase() === "ctrl+enter" && e.ctrlKey) {
                    if (focusWindow.dialogType !== "prompt") {
                        focusWindow.buttons[0].callback(focusWindow.id, Layx.getButton(focusWindow.id, focusWindow.buttons[0].id, e));
                    } else {
                        var textarea = Layx.getPromptTextArea(focusWindow.id);
                        focusWindow.buttons[0].callback(focusWindow.id, (textarea ? textarea.value : "").replace(/(^\s*)|(\s*$)/g, ""), textarea, Layx.getButton(focusWindow.id, focusWindow.buttons[0].id, e));
                    }
                }
            }
        }
    }, false);
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
    var svgSprite = '<svg><symbol id="layx-icon-warn" viewBox="0 0 1044 1024"><path d="M589.8368 120.10666667q2.88 4.8 19.68 33.12t42.24 71.52 57.12 97.92 65.28 111.84 66.72 113.28 60.48 103.2 47.04 80.64 27.36 46.08q14.4 24 17.76 48t-2.88 43.2-22.08 31.2-38.88 11.04q-11.52 0-48.96-0.48t-90.24-0.48l-120 0-135.36 0q-69.12 0-137.28 0.48t-126.72 0.48l-102.72 0-65.28 0q-36.48 0-56.16-12.48t-26.4-32.16-1.44-42.72 18.72-43.2q6.72-10.56 26.4-43.2t47.52-79.2 61.44-102.72 68.16-114.24 67.2-112.8 58.56-98.88 43.2-72.96l20.16-33.6q13.44-21.12 35.04-32.16t44.64-11.04 44.64 10.08 35.04 30.24zM565.8368 308.26666667q0-11.52-5.28-21.6t-13.92-18.24-19.68-12.96-22.56-4.8q-22.08 0-40.8 17.28t-18.72 39.36l0 251.52q0 22.08 18.72 39.84t40.8 17.76q23.04 0 42.24-16.8t19.2-38.88l0-252.48zM504.3968 673.06666667q-24.96 0-42.72 17.28t-17.76 42.24 17.76 42.72 42.72 17.76 42.24-17.76 17.28-42.72-17.28-42.24-42.24-17.28z"  ></path></symbol><symbol id="layx-icon-help" viewBox="0 0 1024 1024"><path d="M512.697383 63.444984c-247.538793 0-448.208115 200.649879-448.208115 448.208115 0 247.520373 200.66932199 448.208115 448.208115 448.20811499s448.208115-200.68774199 448.20811499-448.20811499C960.90549801 264.094864 760.236176 63.444984 512.697383 63.444984zM510.98846199 735.138056c-25.550932 0-46.25958-21.30114199-46.25958-47.563272s20.708648-47.563272 46.25958-47.563272c25.56116599 0 46.269813 21.30114199 46.26981301 47.563272S536.548604 735.138056 510.98846199 735.138056zM640.211569 436.222129c-6.383384 12.29195401-13.970176 22.86986999-22.75116701 31.769564-8.78098999 8.936533-24.55730201 23.927969-47.29925899 45.046962-6.291287 5.945409-11.334139 11.161201-15.11934899 15.684214-3.792373 4.48719799-6.619768 8.608052-8.46274201 12.365632-1.868557 3.71971799-3.291976 7.47729799-4.303003 11.197016-1.013073 3.756557-2.543939 10.32208999-4.57929499 19.73343699-3.518127 19.95037801-14.524808 29.910217-33.02720802 29.91021701-9.611915 0-17.70831401-3.24797401-24.26565998-9.775644-6.573719-6.529717-9.848299-16.194844-9.84829901-29.071106 0-16.086373 2.39862999-30.05552601 7.204076-41.83685101 4.814656-11.818163 11.18882999-22.177092 19.150152-31.07678599 7.960299-8.89969399 18.684548-19.514449 32.17991-31.806403 11.835559-10.724249 20.39858601-18.821671 25.660426-24.293289 5.287423-5.470595 9.72038601-11.562337 13.32344701-18.273179 3.610224-6.711865 5.415336-14.007015 5.415336-21.84861101 0-15.355733-5.508457-28.305673-16.50388201-38.84572699-11.016915-10.541077-25.205055-15.830547-42.594097-15.830547-20.354584 0-35.33578599 5.325285-44.94770099 15.975856-9.62010199 10.650571-17.754363 26.29794599-24.42017901 47.05264199-6.291287 21.66646199-18.219967 32.49918199-35.791158 32.49918201-10.349719 0-19.10308-3.793396-26.217105-11.380188-7.121188-7.586792-10.6782-15.793708-10.6782-24.583908 0-18.237363 5.635347-36.694737 16.915251-55.405891 11.279904-18.67533799 27.757181-34.17638 49.396014-46.43251901 21.63064599-12.292977 46.888913-18.420535 75.742055-18.42053499 26.825972 0 50.489928 5.143137 71.025637 15.392572 20.534685 10.249435 36.39286199 24.219611 47.580668 41.83685099 11.189853 17.654079 16.788361 36.839023 16.78836099 57.557904C649.785621 409.668357 646.593929 423.96701401 640.211569 436.222129z"  ></path></symbol><symbol id="layx-icon-right" viewBox="0 0 1024 1024"><path d="M511.59752247 82.09957256c-237.19528125 0-429.47861308 192.28333184-429.4786131 429.47771397 0 237.19528125 192.28333184 429.47771396 429.47861309 429.47771396 237.19438213 0 429.47681484-192.28153271 429.47681485-429.47771396C941.07343818 274.38380352 748.79100547 82.09957256 511.59752247 82.09957256zM416.15603193 750.07218711L225.32791396 559.24676651l47.61641602-47.61641602L416.15603193 654.84205332l334.09018653-334.09198564 47.6155169 47.61461689L416.15603193 750.07218711z"  ></path></symbol><symbol id="layx-icon-restore" viewBox="0 0 1157 1024"><path d="M1016.52185234 724.44050175L833.87364805 724.44050175 833.87364805 898.52098643 833.87364805 960.05279112 833.87364805 961.2211168 772.34184336 961.2211168 772.34184336 960.05279112 124.31068789 960.05279112 124.31068789 961.2211168 62.7788832 961.2211168 62.7788832 960.05279112 62.7788832 898.52098643 62.7788832 360.31241885 62.7788832 298.78061416 124.31068789 298.78061416 298.78061416 298.78061416 298.78061416 62.7788832 303.06447442 62.7788832 360.31241885 62.7788832 1016.52185234 62.7788832 1074.15923838 62.7788832 1078.05365615 62.7788832 1078.05365615 662.90869795 1078.05365615 724.44050175 1016.52185234 724.44050175ZM124.31068789 898.52098643L772.34184336 898.52098643 772.34184336 724.44050175 772.34184336 662.90869795 772.34184336 360.31241885 124.31068789 360.31241885 124.31068789 898.52098643ZM1016.52185234 124.31068789L360.31241885 124.31068789 360.31241885 298.78061416 772.34184336 298.78061416 833.87364805 298.78061416 833.87364805 360.31241885 833.87364805 662.90869795 1016.52185234 662.90869795 1016.52185234 124.31068789Z"  ></path></symbol><symbol id="layx-icon-reload" viewBox="0 0 1024 1024"><path d="M919.8125 399.5L751.0625 399.5c-23.203125 0-42.1875-18.984375-42.1875-42.1875 0-23.203125 18.984375-42.1875 42.1875-42.1875l68.90625 0C755.28125 213.875 641.375 146.375 512 146.375c-201.796875 0-365.625 163.828125-365.625 365.625 0 201.796875 163.828125 365.625 365.625 365.625 196.875 0 357.890625-156.09375 364.921875-351.5625l0.703125 0c0-23.203125 18.984375-42.1875 42.1875-42.1875 23.203125 0 42.1875 18.984375 42.1875 42.1875 0 2.8125 0 5.625-0.703125 7.734375C950.046875 772.15625 753.171875 962 512 962 263.796875 962 62 760.203125 62 512 62 263.796875 263.796875 62 512 62c150.46875 0 284.0625 73.828125 365.625 187.734375L877.625 188.5625c0-23.203125 18.984375-42.1875 42.1875-42.1875 23.203125 0 42.1875 18.984375 42.1875 42.1875l0 168.75C962 380.515625 943.015625 399.5 919.8125 399.5z"  ></path></symbol><symbol id="layx-icon-default-icon" viewBox="0 0 1024 1024"><path d="M891.88743395 61.93952995L132.11256605 61.93952995c-38.92547129 0-70.60411733 31.65534435-70.60411734 70.5924665L61.50844871 891.46800355c0 38.91382045 31.67864605 70.59246649 70.60411734 70.5924665l759.7748679 0c38.92547129 0 70.60411733-31.67864605 70.60411734-70.5924665L962.49155129 132.53199645C962.49155129 93.59487431 930.81290525 61.93952995 891.88743395 61.93952995zM844.02576498 142.29540409c16.71896178 0 30.25724302 13.54993209 30.25724302 30.26889386 0 16.70731093-13.53828125 30.25724302-30.25724302 30.25724303s-30.25724302-13.54993209-30.25724303-30.25724303C813.76852195 155.84533618 827.3068032 142.29540409 844.02576498 142.29540409zM735.60300658 142.29540409c16.71896178 0 30.25724302 13.54993209 30.25724302 30.26889386 0 16.70731093-13.53828125 30.25724302-30.25724302 30.25724303s-30.25724302-13.54993209-30.25724303-30.25724303C705.34576355 155.84533618 718.8840448 142.29540409 735.60300658 142.29540409zM881.80945351 881.37837227L142.19054649 881.37837227 142.19054649 277.92288427l739.60725618 0L881.79780267 881.37837227zM758.85809209 638.26020125l-0.01165084-180.19196018 90.09598008 90.09598008L758.85809209 638.26020125zM265.15355875 638.26020125l-90.09598008-90.0959801 90.08432924-90.08432924L265.15355875 638.26020125z"  ></path></symbol><symbol id="layx-icon-min" viewBox="0 0 1024 1024"><path d="M65.23884 456.152041 958.760137 456.152041l0 111.695918L65.23884 567.847959 65.23884 456.152041z"  ></path></symbol><symbol id="layx-icon-max" viewBox="0 0 1024 1024"><path d="M75.74912227 948.24738475L75.74912227 75.75145131l872.50059037 0 0 872.49593344L75.74912227 948.24738475zM839.18786674 184.81446115L184.81213326 184.81446115l0 654.37573462 654.37573461 0L839.18786674 184.81446115z"  ></path></symbol><symbol id="layx-icon-debug" viewBox="0 0 1024 1024"><path d="M990.18635001 578.93861562c0 10.3648125-3.782715 19.33089375-11.35486126 26.90304001-7.57310531 7.57310531-16.5372675 11.3606175-26.89728375 11.3606175L818.04354219 617.20227312c0 68.14739625-13.34551219 125.92518281-40.04900719 173.34295313l124.32690656 124.934175c7.57214625 7.56159281 11.3606175 16.53247125 11.3606175 26.89728375 0 10.36001625-3.782715 19.32609657-11.3606175 26.89824281-7.17497531 7.56159281-16.13434125 11.350065-26.89728375 11.350065-10.75814625 0-19.72518656-3.78847125-26.89728375-11.350065L730.17287844 851.51860625c-1.99161001 1.98585375-4.97710594 4.578975-8.96128407 7.765935-3.9928125 3.186-12.3564225 8.872065-25.11097499 17.03612906-12.74879625 8.17078031-25.70193375 15.44360906-38.84982 21.82136531-13.1526825 6.37295906-29.49616125 12.15591844-49.02180283 17.33736563-19.52564156 5.17281281-38.85653531 7.76785313-57.97733155 7.76785312L550.251665 387.6750125l-76.51100531 0 0 535.57224188c-20.31422719 0-40.54690875-2.69481281-60.66351-8.07676407-20.13099094-5.376195-37.46260031-11.95253625-52.00921781-19.72422656-14.54853562-7.77169125-27.69546281-15.53666625-39.44749501-23.31315376-11.75778844-7.77265031-20.419755-14.24346281-26.0060475-19.4201128l-8.96128406-8.3741625L177.26614999 968.07478156c-7.96931719 8.36360906-17.53115344 12.55021125-28.69318593 12.55021125-9.56375531 0-18.12691031-3.19175625-25.69617844-9.56471531-7.57406437-7.17401625-11.659935-16.040325-12.26336531-26.59892625-0.59383781-10.55956031 2.49334969-19.82208094 9.27499125-27.79427531l120.73797938-135.68176782c-23.10977156-45.43575469-34.66897406-100.03041937-34.66897407-163.79071031L72.06771406 617.19459781c-10.36673156 0-19.32801562-3.78847125-26.89728375-11.35486124-7.57406437-7.5769425-11.36253657-16.5382275-11.36253656-26.90304 0-10.36001625 3.78847125-19.33089375 11.36253656-26.89632469 7.56926812-7.56830906 16.53055219-11.35102406 26.89728375-11.35102407l133.88874375 0L205.95645781 364.95953375l-103.40828906-103.40828906c-7.57022719-7.57310531-11.35678031-16.5382275-11.35678031-26.89824281 0-10.35905625 3.79134938-19.33089375 11.35678031-26.89728376 7.56734906-7.57214625 16.53630844-11.36541469 26.89824281-11.36541469 10.36577156 0 19.32417844 3.79902469 26.89920188 11.3654147l103.40828906 103.40828906 504.49507219 0 103.40924812-103.40828907c7.56639001-7.57214625 16.53055219-11.36541469 26.89728375-11.36541469 10.36001625 0 19.32897469 3.79902469 26.89632469 11.36541469 7.57310531 7.56639001 11.36157655 16.5382275 11.36157656 26.89728375 0 10.36001625-3.78847125 19.32609657-11.36157656 26.89824282l-103.40828906 103.40828906 0 175.73269312 133.88970281 0c10.3648125 0 19.32993469 3.782715 26.89728375 11.35678032 7.57214625 7.56543094 11.3606175 16.53630844 11.3606175 26.89056843l0 0L990.18635001 578.93861562 990.18635001 578.93861562zM703.26983938 234.64820469L320.72056719 234.64820469c0-52.99351031 18.62960906-98.12611031 55.89074625-135.38820656 37.25058375-37.26209625 82.3899-55.88594906 135.38532843-55.88594907 52.99638844 0 98.13570375 18.62385281 135.38724751 55.88594907C684.64694563 136.52113438 703.26983938 181.65469437 703.26983938 234.64820469L703.26983938 234.64820469 703.26983938 234.64820469 703.26983938 234.64820469z"  ></path></symbol><symbol id="layx-icon-destroy" viewBox="0 0 1024 1024"><path d="M933.89254819 139.71606348L884.23129279 90.08990363 511.96490363 462.39138834 140.40044113 90.82692583 90.84447403 140.34779656 462.40893653 511.91225907 90.10745181 884.2137446 139.73361166 933.875 512.03509637 561.53841892 883.59955887 933.10288141 933.15552597 883.58201068 561.59106347 512.01754819Z"  ></path></symbol><symbol id="layx-icon-error" viewBox="0 0 1024 1024"><path d="M482 50.66666667C235.99999999 50.66666667 32 254.66666667 32 500.66666667s204.00000001 450 450 450 450-204.00000001 450-450S728 50.66666667 482 50.66666667z m192 576c18 18 18 42 0 60-18 18-42 18-60 0L488 560.66666667 356 692.66666667c-18 18-48 18-66 0-18-18-18-48 0-66L422 494.66666667 296 368.66666667c-18-18-18-42 0-60 18-18 42-18 60 0L482 434.66666667l132-132c18-18 48-18 66 0 18 18 18 48-1e-8 66L548 500.66666667l126 126z" fill="" ></path></symbol><symbol id="layx-icon-stick" viewBox="0 0 1024 1024"><path d="M863.92416068 184.3484319H160.07583932a50.27488011 50.27488011 0 0 1 0-100.5497602h703.84832136a50.27488011 50.27488011 0 0 1 0 100.5497602z m-50.27488007 804.39808157a50.22460522 50.22460522 0 0 1-35.69516489-14.57971521L512 708.21268254l-265.95411572 265.95411572A50.27488011 50.27488011 0 0 1 160.07583932 938.47163339V335.1730722a50.27488011 50.27488011 0 0 1 50.27488007-50.27488013h603.29856122a50.27488011 50.27488011 0 0 1 50.27488007 50.27488013v603.29856119a50.27488011 50.27488011 0 0 1-50.27488007 50.27488008z m-301.64928061-402.19904078a50.22460522 50.22460522 0 0 1 35.69516487 14.57971522L763.37440051 816.80642355V385.44795228H260.62559949v431.86122007l215.67923564-215.67923564A50.27488011 50.27488011 0 0 1 512 586.54747269z"  ></path></symbol></svg>';
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