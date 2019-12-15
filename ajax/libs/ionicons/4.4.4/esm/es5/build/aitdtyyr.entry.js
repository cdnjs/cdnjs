/*! Built with http://stenciljs.com */
import { h } from '../ionicons.core.js';
function getName(name, mode, ios, md) {
    mode = (mode || 'md').toLowerCase();
    if (ios && mode === 'ios') {
        name = ios.toLowerCase();
    }
    else if (md && mode === 'md') {
        name = md.toLowerCase();
    }
    else if (name) {
        name = name.toLowerCase();
        if (!/^md-|^ios-|^logo-/.test(name)) {
            name = mode + "-" + name;
        }
    }
    if (typeof name !== 'string' || name.trim() === '') {
        return null;
    }
    var invalidChars = name.replace(/[a-z]|-|\d/gi, '');
    if (invalidChars !== '') {
        return null;
    }
    return name;
}
function getSrc(src) {
    if (typeof src === 'string') {
        src = src.trim();
        if (src.length > 0 && /(\/|\.)/.test(src)) {
            return src;
        }
    }
    return null;
}
function isValid(elm) {
    if (elm.nodeType === 1) {
        if (elm.nodeName.toLowerCase() === 'script') {
            return false;
        }
        for (var i = 0; i < elm.attributes.length; i++) {
            var val = elm.attributes[i].value;
            if (typeof val === 'string' && val.toLowerCase().indexOf('on') === 0) {
                return false;
            }
        }
        for (var i = 0; i < elm.childNodes.length; i++) {
            if (!isValid(elm.childNodes[i])) {
                return false;
            }
        }
    }
    return true;
}
var Icon = /** @class */ (function () {
    function Icon() {
        this.isVisible = false;
        this.lazy = false;
    }
    Icon.prototype.componentWillLoad = function () {
        var _this = this;
        this.waitUntilVisible(this.el, '50px', function () {
            _this.isVisible = true;
            _this.loadIcon();
        });
    };
    Icon.prototype.componentDidUnload = function () {
        if (this.io) {
            this.io.disconnect();
            this.io = undefined;
        }
    };
    Icon.prototype.waitUntilVisible = function (el, rootMargin, cb) {
        var _this = this;
        if (this.lazy && this.win && this.win.IntersectionObserver) {
            var io_1 = this.io = new this.win.IntersectionObserver(function (data) {
                if (data[0].isIntersecting) {
                    io_1.disconnect();
                    _this.io = undefined;
                    cb();
                }
            }, { rootMargin: rootMargin });
            io_1.observe(el);
        }
        else {
            cb();
        }
    };
    Icon.prototype.loadIcon = function () {
        var _this = this;
        if (!this.isServer && this.isVisible) {
            var url = this.getUrl();
            if (url) {
                getSvgContent(url).then(function (svgContent) {
                    _this.svgContent = validateContent(_this.doc, svgContent, _this.el['s-sc']);
                });
            }
        }
        if (!this.ariaLabel) {
            var name = getName(this.name, this.mode, this.ios, this.md);
            if (name) {
                this.ariaLabel = name
                    .replace('ios-', '')
                    .replace('md-', '')
                    .replace(/\-/g, ' ');
            }
        }
    };
    Icon.prototype.getUrl = function () {
        var url = getSrc(this.src);
        if (url) {
            return url;
        }
        url = getName(this.name, this.mode, this.ios, this.md);
        if (url) {
            return this.getNamedUrl(url);
        }
        url = getSrc(this.icon);
        if (url) {
            return url;
        }
        url = getName(this.icon, this.mode, this.ios, this.md);
        if (url) {
            return this.getNamedUrl(url);
        }
        return null;
    };
    Icon.prototype.getNamedUrl = function (name) {
        return this.resourcesUrl + "svg/" + name + ".svg";
    };
    Icon.prototype.hostData = function () {
        var _a;
        return {
            'role': 'img',
            class: Object.assign({}, createColorClasses(this.color), (_a = {}, _a["icon-" + this.size] = !!this.size, _a))
        };
    };
    Icon.prototype.render = function () {
        if (!this.isServer && this.svgContent) {
            return h("div", { class: "icon-inner", innerHTML: this.svgContent });
        }
        return h("div", { class: "icon-inner" });
    };
    Object.defineProperty(Icon, "is", {
        get: function () { return "ion-icon"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Icon, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Icon, "properties", {
        get: function () {
            return {
                "ariaLabel": {
                    "type": String,
                    "attr": "aria-label",
                    "reflectToAttr": true,
                    "mutable": true
                },
                "color": {
                    "type": String,
                    "attr": "color"
                },
                "doc": {
                    "context": "document"
                },
                "el": {
                    "elementRef": true
                },
                "icon": {
                    "type": String,
                    "attr": "icon",
                    "watchCallbacks": ["loadIcon"]
                },
                "ios": {
                    "type": String,
                    "attr": "ios"
                },
                "isServer": {
                    "context": "isServer"
                },
                "isVisible": {
                    "state": true
                },
                "lazy": {
                    "type": Boolean,
                    "attr": "lazy"
                },
                "md": {
                    "type": String,
                    "attr": "md"
                },
                "mode": {
                    "type": String,
                    "attr": "mode"
                },
                "name": {
                    "type": String,
                    "attr": "name",
                    "watchCallbacks": ["loadIcon"]
                },
                "resourcesUrl": {
                    "context": "resourcesUrl"
                },
                "size": {
                    "type": String,
                    "attr": "size"
                },
                "src": {
                    "type": String,
                    "attr": "src",
                    "watchCallbacks": ["loadIcon"]
                },
                "svgContent": {
                    "state": true
                },
                "win": {
                    "context": "window"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Icon, "style", {
        get: function () { return ":host{display:inline-block;width:1em;height:1em;contain:strict;-webkit-box-sizing:content-box!important;box-sizing:content-box!important}:host(.ion-color){color:var(--ion-color-base)!important}:host(.icon-small){font-size:var(--ion-icon-size-small,18px)!important}:host(.icon-large){font-size:var(--ion-icon-size-large,32px)!important}.icon-inner,svg{display:block;height:100%;width:100%}svg{fill:currentColor;stroke:currentColor}:host(.ion-color-primary){--ion-color-base:var(--ion-color-primary, #3880ff)}:host(.ion-color-secondary){--ion-color-base:var(--ion-color-secondary, #0cd1e8)}:host(.ion-color-tertiary){--ion-color-base:var(--ion-color-tertiary, #f4a942)}:host(.ion-color-success){--ion-color-base:var(--ion-color-success, #10dc60)}:host(.ion-color-warning){--ion-color-base:var(--ion-color-warning, #ffce00)}:host(.ion-color-danger){--ion-color-base:var(--ion-color-danger, #f14141)}:host(.ion-color-light){--ion-color-base:var(--ion-color-light, #f4f5f8)}:host(.ion-color-medium){--ion-color-base:var(--ion-color-medium, #989aa2)}:host(.ion-color-dark){--ion-color-base:var(--ion-color-dark, #222428)}"; },
        enumerable: true,
        configurable: true
    });
    return Icon;
}());
var requests = new Map();
function getSvgContent(url) {
    var req = requests.get(url);
    if (!req) {
        req = fetch(url, { cache: 'force-cache' }).then(function (rsp) {
            if (rsp.ok) {
                return rsp.text();
            }
            return Promise.resolve(null);
        });
        requests.set(url, req);
    }
    return req;
}
function validateContent(document, svgContent, scopeId) {
    if (svgContent) {
        var frag = document.createDocumentFragment();
        var div = document.createElement('div');
        div.innerHTML = svgContent;
        frag.appendChild(div);
        for (var i = div.childNodes.length - 1; i >= 0; i--) {
            if (div.childNodes[i].nodeName.toLowerCase() !== 'svg') {
                div.removeChild(div.childNodes[i]);
            }
        }
        var svgElm = div.firstElementChild;
        if (svgElm && svgElm.nodeName.toLowerCase() === 'svg') {
            if (scopeId) {
                svgElm.setAttribute('class', scopeId);
            }
            if (isValid(svgElm)) {
                return div.innerHTML;
            }
        }
    }
    return '';
}
function createColorClasses(color) {
    var _a;
    return (color) ? (_a = {
            'ion-color': true
        },
        _a["ion-color-" + color] = true,
        _a) : null;
}
export { Icon as IonIcon };
