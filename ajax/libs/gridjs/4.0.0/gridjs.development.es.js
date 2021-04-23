/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var n,l,u$1,i$1,t$1,o$1,r$1={},f$1=[],e$1=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c$1(n,l){for(var u in l)n[u]=l[u];return n}function s$1(n){var l=n.parentNode;l&&l.removeChild(n);}function a$1(n,l,u){var i,t,o,r=arguments,f={};for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(o in n.defaultProps)void 0===f[o]&&(f[o]=n.defaultProps[o]);return v$1(n,f,i,t,null)}function v$1(l,u,i,t,o){var r={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==o?++n.__v:o};return null!=n.vnode&&n.vnode(r),r}function h(){return {current:null}}function y$1(n){return n.children}function p(n,l){this.props=n,this.context=l;}function d$1(n,l){if(null==l)return n.__?d$1(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?d$1(n):null}function _(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return _(n)}}function k$1(l){(!l.__d&&(l.__d=!0)&&u$1.push(l)&&!b$1.__r++||t$1!==n.debounceRendering)&&((t$1=n.debounceRendering)||i$1)(b$1);}function b$1(){for(var n;b$1.__r=u$1.length;)n=u$1.sort(function(n,l){return n.__v.__b-l.__v.__b}),u$1=[],n.some(function(n){var l,u,i,t,o,r;n.__d&&(o=(t=(l=n).__v).__e,(r=l.__P)&&(u=[],(i=c$1({},t)).__v=t.__v+1,I(r,t,i,l.__n,void 0!==r.ownerSVGElement,null!=t.__h?[o]:null,u,null==o?d$1(t):o,t.__h),T(u,t),t.__e!=o&&_(t)));});}function m$1(n,l,u,i,t,o,e,c,s,a){var h,p,_,k,b,m,w,A=i&&i.__k||f$1,P=A.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(k=u.__k[h]=null==(k=l[h])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k||"bigint"==typeof k?v$1(null,k,null,null,k):Array.isArray(k)?v$1(y$1,{children:k},null,null,null):k.__b>0?v$1(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(_=A[h])||_&&k.key==_.key&&k.type===_.type)A[h]=void 0;else for(p=0;p<P;p++){if((_=A[p])&&k.key==_.key&&k.type===_.type){A[p]=void 0;break}_=null;}I(n,k,_=_||r$1,t,o,e,c,s,a),b=k.__e,(p=k.ref)&&_.ref!=p&&(w||(w=[]),_.ref&&w.push(_.ref,null,k),w.push(p,k.__c||b,k)),null!=b?(null==m&&(m=b),"function"==typeof k.type&&null!=k.__k&&k.__k===_.__k?k.__d=s=g$1(k,s,n):s=x$1(n,k,_,A,b,s),a||"option"!==u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&_.__e==s&&s.parentNode!=n&&(s=d$1(_));}for(u.__e=m,h=P;h--;)null!=A[h]&&("function"==typeof u.type&&null!=A[h].__e&&A[h].__e==u.__d&&(u.__d=d$1(i,h+1)),L(A[h],A[h]));if(w)for(h=0;h<w.length;h++)z(w[h],w[++h],w[++h]);}function g$1(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,l="function"==typeof t.type?g$1(t,l,u):x$1(u,t,t,n.__k,t.__e,l));return l}function x$1(n,l,u,i,t,o){var r,f,e;if(void 0!==l.__d)r=l.__d,l.__d=void 0;else if(null==u||t!=o||null==t.parentNode)n:if(null==o||o.parentNode!==n)n.appendChild(t),r=null;else {for(f=o,e=0;(f=f.nextSibling)&&e<i.length;e+=2)if(f==t)break n;n.insertBefore(t,o),r=o;}return void 0!==r?r:t.nextSibling}function A(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||C(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||C(n,o,l[o],u[o],i);}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||e$1.test(l)?u:u+"px";}function C(n,l,u,i,t){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||P(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||P(n.style,l,u[l]);}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?i||n.addEventListener(l,o?H:$,o):n.removeEventListener(l,o?H:$,o);else if("dangerouslySetInnerHTML"!==l){if(t)l=l.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l));}}function $(l){this.l[l.type+!1](n.event?n.event(l):l);}function H(l){this.l[l.type+!0](n.event?n.event(l):l);}function I(l,u,i,t,o,r,f,e,s){var a,v,h,d,_,k,b,g,w,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(s=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,w=(a=P.contextType)&&t[a.__c],x=a?w?w.props.value:a.__:t,i.__c?b=(v=u.__c=i.__c).__=v.__E:("prototype"in P&&P.prototype.render?u.__c=v=new P(g,x):(u.__c=v=new p(g,x),v.constructor=P,v.render=M),w&&w.sub(v),v.props=g,v.state||(v.state={}),v.context=x,v.__n=t,h=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=P.getDerivedStateFromProps&&(v.__s==v.state&&(v.__s=c$1({},v.__s)),c$1(v.__s,P.getDerivedStateFromProps(g,v.__s))),d=v.props,_=v.state,h)null==P.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&v.__h.push(v.componentDidMount);else {if(null==P.getDerivedStateFromProps&&g!==d&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(g,x),!v.__e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(g,v.__s,x)||u.__v===i.__v){v.props=g,v.state=v.__s,u.__v!==i.__v&&(v.__d=!1),v.__v=u,u.__e=i.__e,u.__k=i.__k,u.__k.forEach(function(n){n&&(n.__=u);}),v.__h.length&&f.push(v);break n}null!=v.componentWillUpdate&&v.componentWillUpdate(g,v.__s,x),null!=v.componentDidUpdate&&v.__h.push(function(){v.componentDidUpdate(d,_,k);});}v.context=x,v.props=g,v.state=v.__s,(a=n.__r)&&a(u),v.__d=!1,v.__v=u,v.__P=l,a=v.render(v.props,v.state,v.context),v.state=v.__s,null!=v.getChildContext&&(t=c$1(c$1({},t),v.getChildContext())),h||null==v.getSnapshotBeforeUpdate||(k=v.getSnapshotBeforeUpdate(d,_)),A=null!=a&&a.type===y$1&&null==a.key?a.props.children:a,m$1(l,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,s),v.base=u.__e,u.__h=null,v.__h.length&&f.push(v),b&&(v.__E=v.__=null),v.__e=!1;}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=j$1(i.__e,u,i,t,o,r,f,s);(a=n.diffed)&&a(u);}catch(l){u.__v=null,(s||null!=r)&&(u.__e=e,u.__h=!!s,r[r.indexOf(e)]=null),n.__e(l,u,i);}}function T(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u);});}catch(l){n.__e(l,u.__v);}});}function j$1(n,l,u,i,t,o,e,c){var a,v,h,y,p=u.props,d=l.props,_=l.type,k=0;if("svg"===_&&(t=!0),null!=o)for(;k<o.length;k++)if((a=o[k])&&(a===n||(_?a.localName==_:3==a.nodeType))){n=a,o[k]=null;break}if(null==n){if(null===_)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",_):document.createElement(_,d.is&&d),o=null,c=!1;}if(null===_)p===d||c&&n.data===d||(n.data=d);else {if(o=o&&f$1.slice.call(n.childNodes),v=(p=u.props||r$1).dangerouslySetInnerHTML,h=d.dangerouslySetInnerHTML,!c){if(null!=o)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(h||v)&&(h&&(v&&h.__html==v.__html||h.__html===n.innerHTML)||(n.innerHTML=h&&h.__html||""));}if(A(n,d,p,t,c),h)l.__k=[];else if(k=l.props.children,m$1(n,Array.isArray(k)?k:[k],l,u,i,t&&"foreignObject"!==_,o,e,n.firstChild,c),null!=o)for(k=o.length;k--;)null!=o[k]&&s$1(o[k]);c||("value"in d&&void 0!==(k=d.value)&&(k!==n.value||"progress"===_&&!k)&&C(n,"value",k,p.value,!1),"checked"in d&&void 0!==(k=d.checked)&&k!==n.checked&&C(n,"checked",k,p.checked,!1));}return n}function z(l,u,i){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,i);}}function L(l,u,i){var t,o,r;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||z(t,null,u)),i||"function"==typeof l.type||(i=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount();}catch(l){n.__e(l,u);}t.base=t.__P=null;}if(t=l.__k)for(r=0;r<t.length;r++)t[r]&&L(t[r],u,i);null!=o&&s$1(o);}function M(n,l,u){return this.constructor(n,u)}function N(l,u,i){var t,o,e;n.__&&n.__(l,u),o=(t="function"==typeof i)?null:i&&i.__k||u.__k,e=[],I(u,l=(!t&&i||u).__k=a$1(y$1,null,[l]),o||r$1,r$1,void 0!==u.ownerSVGElement,!t&&i?[i]:o?null:u.firstChild?f$1.slice.call(u.childNodes):null,e,!t&&i?i:o?o.__e:u.firstChild,t),T(e,l);}function q(n,l){var u={__c:l="__cC"+o$1++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(k$1);},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n);};}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n={__e:function(n,l){for(var u,i,t;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return u.__E=u}catch(l){n=l;}throw n},__v:0},l=function(n){return null!=n&&void 0===n.constructor},p.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c$1({},this.state),"function"==typeof n&&(n=n(c$1({},u),this.props)),n&&c$1(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k$1(this));},p.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k$1(this));},p.prototype.render=y$1,u$1=[],i$1="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,b$1.__r=0,o$1=0;

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

var Base = /** @class */ (function () {
    function Base(id) {
        this._id = id || generateUUID();
    }
    Object.defineProperty(Base.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    return Base;
}());

/**
 * This is a hack to get the current global config from Preact context.
 * My assumption is that we only need one global context which is the ConfigContext
 *
 * @param context
 */
function getConfig(context) {
    if (!context)
        return null;
    var keys = Object.keys(context);
    if (keys.length) {
        // TODO: can we use a better way to capture and return the Config context?
        var ctx = context[keys[0]];
        return ctx.props.value;
    }
    return null;
}

var enUS = {
    search: {
        placeholder: 'Type a keyword...',
    },
    sort: {
        sortAsc: 'Sort column ascending',
        sortDesc: 'Sort column descending',
    },
    pagination: {
        previous: 'Previous',
        next: 'Next',
        navigate: function (page, pages) { return "Page " + page + " of " + pages; },
        page: function (page) { return "Page " + page; },
        showing: 'Showing',
        of: 'of',
        to: 'to',
        results: 'results',
    },
    loading: 'Loading...',
    noRecordsFound: 'No matching records found',
    error: 'An error happened while fetching the data',
};

var Translator = /** @class */ (function () {
    function Translator(language) {
        this._language = language;
        this._defaultLanguage = enUS;
    }
    /**
     * Tries to split the message with "." and find
     * the key in the given language
     *
     * @param message
     * @param lang
     */
    Translator.prototype.getString = function (message, lang) {
        if (!lang || !message)
            return null;
        var splitted = message.split('.');
        var key = splitted[0];
        if (lang[key]) {
            var val_1 = lang[key];
            if (typeof val_1 === 'string') {
                return function () { return val_1; };
            }
            else if (typeof val_1 === 'function') {
                return val_1;
            }
            else {
                return this.getString(splitted.slice(1).join('.'), val_1);
            }
        }
        return null;
    };
    Translator.prototype.translate = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var translated = this.getString(message, this._language);
        var messageFormat;
        if (translated) {
            messageFormat = translated;
        }
        else {
            messageFormat = this.getString(message, this._defaultLanguage);
        }
        if (messageFormat) {
            return messageFormat.apply(void 0, args);
        }
        return message;
    };
    return Translator;
}());
function useTranslator(translator) {
    return function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return translator.translate.apply(translator, __spreadArrays([message], args));
    };
}

var BaseComponent = /** @class */ (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.config = getConfig(context);
        if (_this.config) {
            _this._ = useTranslator(_this.config.translator);
        }
        return _this;
    }
    return BaseComponent;
}(p));

var HTMLElement$1 = /** @class */ (function (_super) {
    __extends(HTMLElement, _super);
    function HTMLElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTMLElement.prototype.render = function () {
        return a$1(this.props.parentElement, {
            dangerouslySetInnerHTML: { __html: this.props.content },
        });
    };
    HTMLElement.defaultProps = {
        parentElement: 'span',
    };
    return HTMLElement;
}(BaseComponent));

function decode(content) {
    var value = new DOMParser().parseFromString(content, 'text/html');
    return value.documentElement.textContent;
}
function html(content, parentElement) {
    return a$1(HTMLElement$1, { content: content, parentElement: parentElement });
}

var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell(data) {
        var _this = _super.call(this) || this;
        _this.update(data);
        return _this;
    }
    Cell.prototype.cast = function (data) {
        if (data instanceof HTMLElement) {
            return html(data.outerHTML);
        }
        return data;
    };
    /**
     * Updates the Cell's data
     *
     * @param data
     */
    Cell.prototype.update = function (data) {
        this.data = this.cast(data);
        return this;
    };
    return Cell;
}(Base));

var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row(cells) {
        var _this = _super.call(this) || this;
        _this.cells = cells || [];
        return _this;
    }
    Row.prototype.cell = function (index) {
        return this._cells[index];
    };
    Object.defineProperty(Row.prototype, "cells", {
        get: function () {
            return this._cells;
        },
        set: function (cells) {
            this._cells = cells;
        },
        enumerable: false,
        configurable: true
    });
    Row.prototype.toArray = function () {
        return this.cells.map(function (cell) { return cell.data; });
    };
    /**
     * Creates a new Row from an array of Cell(s)
     * This method generates a new ID for the Row and all nested elements
     *
     * @param cells
     * @returns Row
     */
    Row.fromCells = function (cells) {
        return new Row(cells.map(function (cell) { return new Cell(cell.data); }));
    };
    Object.defineProperty(Row.prototype, "length", {
        get: function () {
            return this.cells.length;
        },
        enumerable: false,
        configurable: true
    });
    return Row;
}(Base));

function oneDtoTwoD(data) {
    if (data[0] && !(data[0] instanceof Array)) {
        return [data];
    }
    return data;
}
function flatten(arrays) {
    return arrays.reduce(function (prev, x) { return prev.concat(x); }, []);
}

var Tabular = /** @class */ (function (_super) {
    __extends(Tabular, _super);
    function Tabular(rows) {
        var _this = _super.call(this) || this;
        if (rows instanceof Array) {
            _this.rows = rows;
        }
        else if (rows instanceof Row) {
            _this.rows = [rows];
        }
        else {
            _this.rows = [];
        }
        return _this;
    }
    Object.defineProperty(Tabular.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (rows) {
            this._rows = rows;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tabular.prototype, "length", {
        get: function () {
            return this._length || this.rows.length;
        },
        // we want to sent the length when storage is ServerStorage
        set: function (len) {
            this._length = len;
        },
        enumerable: false,
        configurable: true
    });
    Tabular.prototype.toArray = function () {
        return this.rows.map(function (row) { return row.toArray(); });
    };
    /**
     * Creates a new Tabular from an array of Row(s)
     * This method generates a new ID for the Tabular and all nested elements
     *
     * @param rows
     * @returns Tabular
     */
    Tabular.fromRows = function (rows) {
        return new Tabular(rows.map(function (row) { return Row.fromCells(row.cells); }));
    };
    /**
     * Creates a new Tabular from a 2D array
     * This method generates a new ID for the Tabular and all nested elements
     *
     * @param data
     * @returns Tabular
     */
    Tabular.fromArray = function (data) {
        data = oneDtoTwoD(data);
        return new Tabular(data.map(function (row) { return new Row(row.map(function (cell) { return new Cell(cell); })); }));
    };
    return Tabular;
}(Base));

function search (keyword, tabular, selector) {
    // escape special regex chars
    keyword = keyword.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    return new Tabular(tabular.rows.filter(function (row, rowIndex) {
        return row.cells.some(function (cell, cellIndex) {
            if (!cell) {
                return false;
            }
            var data = '';
            if (typeof selector === 'function') {
                data = selector(cell.data, rowIndex, cellIndex);
            }
            else if (typeof cell.data === 'object') {
                // HTMLContent element
                var element = cell.data;
                if (element && element.props && element.props.content) {
                    // TODO: we should only search in the content of the element. props.content is the entire HTML element
                    data = element.props.content;
                }
            }
            else {
                // primitive types
                data = String(cell.data);
            }
            return new RegExp(keyword, 'gi').test(data);
        });
    }));
}

var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
    }
    // because we are using EventEmitter as a mixin and the
    // constructor won't be called by the applyMixins function
    // see src/base.ts and src/util/applyMixin.ts
    EventEmitter.prototype.init = function (event) {
        if (!this.callbacks) {
            this.callbacks = {};
        }
        if (event && !this.callbacks[event]) {
            this.callbacks[event] = [];
        }
    };
    EventEmitter.prototype.on = function (event, listener) {
        this.init(event);
        this.callbacks[event].push(listener);
        return this;
    };
    EventEmitter.prototype.off = function (event, listener) {
        var eventName = event;
        this.init();
        if (!this.callbacks[eventName] || this.callbacks[eventName].length === 0) {
            // there is no callbacks with this key
            return this;
        }
        this.callbacks[eventName] = this.callbacks[eventName].filter(function (value) { return value != listener; });
        return this;
    };
    EventEmitter.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var eventName = event;
        this.init(eventName);
        if (this.callbacks[eventName].length > 0) {
            this.callbacks[eventName].forEach(function (value) { return value.apply(void 0, args); });
            return true;
        }
        return false;
    };
    return EventEmitter;
}());

var ProcessorType;
(function (ProcessorType) {
    ProcessorType[ProcessorType["Initiator"] = 0] = "Initiator";
    ProcessorType[ProcessorType["ServerFilter"] = 1] = "ServerFilter";
    ProcessorType[ProcessorType["ServerSort"] = 2] = "ServerSort";
    ProcessorType[ProcessorType["ServerLimit"] = 3] = "ServerLimit";
    ProcessorType[ProcessorType["Extractor"] = 4] = "Extractor";
    ProcessorType[ProcessorType["Transformer"] = 5] = "Transformer";
    ProcessorType[ProcessorType["Filter"] = 6] = "Filter";
    ProcessorType[ProcessorType["Sort"] = 7] = "Sort";
    ProcessorType[ProcessorType["Limit"] = 8] = "Limit";
})(ProcessorType || (ProcessorType = {}));
var PipelineProcessor = /** @class */ (function (_super) {
    __extends(PipelineProcessor, _super);
    function PipelineProcessor(props) {
        var _this = _super.call(this) || this;
        _this._props = {};
        _this.id = generateUUID();
        if (props)
            _this.setProps(props);
        return _this;
    }
    /**
     * process is used to call beforeProcess and afterProcess callbacks
     * This function is just a wrapper that calls _process()
     *
     * @param args
     */
    PipelineProcessor.prototype.process = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.validateProps instanceof Function) {
            this.validateProps.apply(this, args);
        }
        this.emit.apply(this, __spreadArrays(['beforeProcess'], args));
        var result = this._process.apply(this, args);
        this.emit.apply(this, __spreadArrays(['afterProcess'], args));
        return result;
    };
    PipelineProcessor.prototype.setProps = function (props) {
        Object.assign(this._props, props);
        this.emit('propsUpdated', this);
        return this;
    };
    Object.defineProperty(PipelineProcessor.prototype, "props", {
        get: function () {
            return this._props;
        },
        enumerable: false,
        configurable: true
    });
    return PipelineProcessor;
}(EventEmitter));

var GlobalSearchFilter = /** @class */ (function (_super) {
    __extends(GlobalSearchFilter, _super);
    function GlobalSearchFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GlobalSearchFilter.prototype, "type", {
        get: function () {
            return ProcessorType.Filter;
        },
        enumerable: false,
        configurable: true
    });
    GlobalSearchFilter.prototype._process = function (data) {
        if (this.props.keyword) {
            return search(String(this.props.keyword).trim(), data, this.props.selector);
        }
        return data;
    };
    return GlobalSearchFilter;
}(PipelineProcessor));

function className() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var prefix = 'gridjs';
    return "" + prefix + args.reduce(function (prev, cur) { return prev + "-" + cur; }, '');
}
function classJoin() {
    var classNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classNames[_i] = arguments[_i];
    }
    return (classNames
        .filter(function (x) { return x; })
        .reduce(function (className, prev) { return (className || '') + " " + prev; }, '')
        .trim() || null);
}

var BaseStore = /** @class */ (function (_super) {
    __extends(BaseStore, _super);
    function BaseStore(dispatcher) {
        var _this = _super.call(this) || this;
        _this.dispatcher = dispatcher;
        _this._state = _this.getInitialState();
        dispatcher.register(_this._handle.bind(_this));
        return _this;
    }
    BaseStore.prototype._handle = function (action) {
        this.handle(action.type, action.payload);
    };
    BaseStore.prototype.setState = function (newState) {
        var prevState = this._state;
        this._state = newState;
        this.emit('updated', newState, prevState);
    };
    Object.defineProperty(BaseStore.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    return BaseStore;
}(EventEmitter));

var SearchStore = /** @class */ (function (_super) {
    __extends(SearchStore, _super);
    function SearchStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchStore.prototype.getInitialState = function () {
        return { keyword: null };
    };
    SearchStore.prototype.handle = function (type, payload) {
        if (type === 'SEARCH_KEYWORD') {
            var keyword = payload.keyword;
            this.search(keyword);
        }
    };
    SearchStore.prototype.search = function (keyword) {
        this.setState({ keyword: keyword });
    };
    return SearchStore;
}(BaseStore));

var BaseActions = /** @class */ (function () {
    function BaseActions(dispatcher) {
        this.dispatcher = dispatcher;
    }
    BaseActions.prototype.dispatch = function (type, payload) {
        this.dispatcher.dispatch({
            type: type,
            payload: payload,
        });
    };
    return BaseActions;
}());

var SearchActions = /** @class */ (function (_super) {
    __extends(SearchActions, _super);
    function SearchActions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchActions.prototype.search = function (keyword) {
        this.dispatch('SEARCH_KEYWORD', {
            keyword: keyword,
        });
    };
    return SearchActions;
}(BaseActions));

var ServerGlobalSearchFilter = /** @class */ (function (_super) {
    __extends(ServerGlobalSearchFilter, _super);
    function ServerGlobalSearchFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ServerGlobalSearchFilter.prototype, "type", {
        get: function () {
            return ProcessorType.ServerFilter;
        },
        enumerable: false,
        configurable: true
    });
    ServerGlobalSearchFilter.prototype._process = function (options) {
        if (!this.props.keyword)
            return options;
        var updates = {};
        if (this.props.url) {
            updates['url'] = this.props.url(options.url, this.props.keyword);
        }
        if (this.props.body) {
            updates['body'] = this.props.body(options.body, this.props.keyword);
        }
        return __assign(__assign({}, options), updates);
    };
    return ServerGlobalSearchFilter;
}(PipelineProcessor));

var debounce = function (func, waitFor) {
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve) {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function () { return resolve(func.apply(void 0, args)); }, waitFor);
        });
    };
};

/**
 * Centralized logging lib
 *
 * This class needs some improvements but so far it has been used to have a coherent way to log
 */
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.format = function (message, type) {
        return "[Grid.js] [" + type.toUpperCase() + "]: " + message;
    };
    Logger.prototype.error = function (message, throwException) {
        if (throwException === void 0) { throwException = false; }
        var msg = this.format(message, 'error');
        if (throwException) {
            throw Error(msg);
        }
        else {
            console.error(msg);
        }
    };
    Logger.prototype.warn = function (message) {
        console.warn(this.format(message, 'warn'));
    };
    Logger.prototype.info = function (message) {
        console.info(this.format(message, 'info'));
    };
    return Logger;
}());
var log = new Logger();

/**
 * BaseComponent for all plugins
 */
var PluginBaseComponent = /** @class */ (function (_super) {
    __extends(PluginBaseComponent, _super);
    function PluginBaseComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PluginBaseComponent;
}(BaseComponent));
var PluginPosition;
(function (PluginPosition) {
    PluginPosition[PluginPosition["Header"] = 0] = "Header";
    PluginPosition[PluginPosition["Footer"] = 1] = "Footer";
    PluginPosition[PluginPosition["Cell"] = 2] = "Cell";
})(PluginPosition || (PluginPosition = {}));
var PluginManager = /** @class */ (function () {
    function PluginManager() {
        this.plugins = [];
    }
    PluginManager.prototype.get = function (id) {
        var plugins = this.plugins.filter(function (p) { return p.id === id; });
        if (plugins.length > 0) {
            return plugins[0];
        }
        return null;
    };
    PluginManager.prototype.add = function (plugin) {
        if (!plugin.id) {
            log.error('Plugin ID cannot be empty');
            return this;
        }
        if (this.get(plugin.id) !== null) {
            log.error("Duplicate plugin ID: " + plugin.id);
            return this;
        }
        this.plugins.push(plugin);
        return this;
    };
    PluginManager.prototype.remove = function (id) {
        this.plugins.splice(this.plugins.indexOf(this.get(id)), 1);
        return this;
    };
    PluginManager.prototype.list = function (position) {
        var plugins;
        if (position != null || position != undefined) {
            plugins = this.plugins.filter(function (p) { return p.position === position; });
        }
        else {
            plugins = this.plugins;
        }
        return plugins.sort(function (a, b) { return a.order - b.order; });
    };
    return PluginManager;
}());
var PluginRenderer = /** @class */ (function (_super) {
    __extends(PluginRenderer, _super);
    function PluginRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PluginRenderer.prototype.render = function () {
        var _this = this;
        if (this.props.pluginId) {
            // render a single plugin
            var plugin = this.config.plugin.get(this.props.pluginId);
            if (!plugin)
                return null;
            return a$1(y$1, {}, a$1(plugin.component, __assign(__assign({ plugin: plugin }, plugin.props), this.props.props)));
        }
        else if (this.props.position !== undefined) {
            // render using a specific plugin position
            return a$1(y$1, {}, this.config.plugin
                .list(this.props.position)
                .map(function (p) {
                return a$1(p.component, __assign(__assign({ plugin: p }, p.props), _this.props.props));
            }));
        }
        return null;
    };
    return PluginRenderer;
}(BaseComponent));

var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.actions = new SearchActions(_this.config.dispatcher);
        _this.store = new SearchStore(_this.config.dispatcher);
        var enabled = props.enabled, keyword = props.keyword;
        if (enabled) {
            // initial search
            if (keyword)
                _this.actions.search(keyword);
            _this.storeUpdatedFn = _this.storeUpdated.bind(_this);
            _this.store.on('updated', _this.storeUpdatedFn);
            var searchProcessor = void 0;
            if (props.server) {
                searchProcessor = new ServerGlobalSearchFilter({
                    keyword: props.keyword,
                    url: props.server.url,
                    body: props.server.body,
                });
            }
            else {
                searchProcessor = new GlobalSearchFilter({
                    keyword: props.keyword,
                    selector: props.selector,
                });
            }
            _this.searchProcessor = searchProcessor;
            // adds a new processor to the pipeline
            _this.config.pipeline.register(searchProcessor);
        }
        return _this;
    }
    Search.prototype.componentWillUnmount = function () {
        this.config.pipeline.unregister(this.searchProcessor);
        this.store.off('updated', this.storeUpdatedFn);
    };
    Search.prototype.storeUpdated = function (state) {
        // updates the processor state
        this.searchProcessor.setProps({
            keyword: state.keyword,
        });
    };
    Search.prototype.onChange = function (event) {
        var keyword = event.target.value;
        this.actions.search(keyword);
    };
    Search.prototype.render = function () {
        if (!this.props.enabled)
            return null;
        var onInput = this.onChange.bind(this);
        // add debounce to input only if it's a server-side search
        if (this.searchProcessor instanceof ServerGlobalSearchFilter) {
            onInput = debounce(onInput, this.props.debounceTimeout);
        }
        return (a$1("div", { className: className(classJoin('search', this.config.className.search)) },
            a$1("input", { type: "search", placeholder: this._('search.placeholder'), "aria-label": this._('search.placeholder'), onInput: onInput, className: classJoin(className('input'), className('search', 'input')), value: this.store.state.keyword })));
    };
    Search.defaultProps = {
        debounceTimeout: 250,
    };
    return Search;
}(PluginBaseComponent));

var PaginationLimit = /** @class */ (function (_super) {
    __extends(PaginationLimit, _super);
    function PaginationLimit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaginationLimit.prototype.validateProps = function () {
        if (isNaN(Number(this.props.limit)) || isNaN(Number(this.props.page))) {
            throw Error('Invalid parameters passed');
        }
    };
    Object.defineProperty(PaginationLimit.prototype, "type", {
        get: function () {
            return ProcessorType.Limit;
        },
        enumerable: false,
        configurable: true
    });
    PaginationLimit.prototype._process = function (data) {
        var page = this.props.page;
        var start = page * this.props.limit;
        var end = (page + 1) * this.props.limit;
        return new Tabular(data.rows.slice(start, end));
    };
    return PaginationLimit;
}(PipelineProcessor));

var ServerPaginationLimit = /** @class */ (function (_super) {
    __extends(ServerPaginationLimit, _super);
    function ServerPaginationLimit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ServerPaginationLimit.prototype, "type", {
        get: function () {
            return ProcessorType.ServerLimit;
        },
        enumerable: false,
        configurable: true
    });
    ServerPaginationLimit.prototype._process = function (options) {
        var updates = {};
        if (this.props.url) {
            updates['url'] = this.props.url(options.url, this.props.page, this.props.limit);
        }
        if (this.props.body) {
            updates['body'] = this.props.body(options.body, this.props.page, this.props.limit);
        }
        return __assign(__assign({}, options), updates);
    };
    return ServerPaginationLimit;
}(PipelineProcessor));

var Pagination = /** @class */ (function (_super) {
    __extends(Pagination, _super);
    function Pagination(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            limit: props.limit,
            page: props.page || 0,
            total: 0,
        };
        return _this;
    }
    Pagination.prototype.componentWillMount = function () {
        var _this = this;
        if (this.props.enabled) {
            var processor = void 0;
            this.setTotalFromTabularFn = this.setTotalFromTabular.bind(this);
            if (this.props.server) {
                processor = new ServerPaginationLimit({
                    limit: this.state.limit,
                    page: this.state.page,
                    url: this.props.server.url,
                    body: this.props.server.body,
                });
                this.config.pipeline.on('afterProcess', this.setTotalFromTabularFn);
            }
            else {
                processor = new PaginationLimit({
                    limit: this.state.limit,
                    page: this.state.page,
                });
                // Pagination (all Limit processors) is the last step in the pipeline
                // and we assume that at this stage, we have the rows that we care about.
                // Let's grab the rows before processing Pagination and set total number of rows
                processor.on('beforeProcess', this.setTotalFromTabularFn);
            }
            this.processor = processor;
            this.config.pipeline.register(processor);
            // we need to make sure that the state is set
            // to the default props when an error happens
            this.config.pipeline.on('error', function () {
                _this.setState({
                    total: 0,
                    page: 0,
                });
            });
        }
    };
    Pagination.prototype.setTotalFromTabular = function (tabular) {
        this.setTotal(tabular.length);
    };
    Pagination.prototype.onUpdate = function (processor) {
        // this is to ensure that the current page is set to 0
        // when a processor is updated for some reason
        if (this.props.resetPageOnUpdate && processor !== this.processor) {
            this.setPage(0);
        }
    };
    Pagination.prototype.componentDidMount = function () {
        this.onUpdateFn = this.onUpdate.bind(this);
        this.config.pipeline.on('updated', this.onUpdateFn);
    };
    Pagination.prototype.componentWillUnmount = function () {
        this.config.pipeline.unregister(this.processor);
        this.config.pipeline.off('updated', this.onUpdateFn);
    };
    Object.defineProperty(Pagination.prototype, "pages", {
        get: function () {
            return Math.ceil(this.state.total / this.state.limit);
        },
        enumerable: false,
        configurable: true
    });
    Pagination.prototype.setPage = function (page) {
        if (page >= this.pages || page < 0 || page === this.state.page) {
            return null;
        }
        this.setState({
            page: page,
        });
        this.processor.setProps({
            page: page,
        });
    };
    Pagination.prototype.setTotal = function (totalRows) {
        // to set the correct total number of rows
        // when running in-memory operations
        this.setState({
            total: totalRows,
        });
    };
    Pagination.prototype.renderPages = function () {
        var _this = this;
        if (this.props.buttonsCount <= 0) {
            return null;
        }
        // how many pagination buttons to render?
        var maxCount = Math.min(this.pages, this.props.buttonsCount);
        var pagePivot = Math.min(this.state.page, Math.floor(maxCount / 2));
        if (this.state.page + Math.floor(maxCount / 2) >= this.pages) {
            pagePivot = maxCount - (this.pages - this.state.page);
        }
        return (a$1(y$1, null,
            this.pages > maxCount && this.state.page - pagePivot > 0 && (a$1(y$1, null,
                a$1("button", { tabIndex: 0, role: "button", onClick: this.setPage.bind(this, 0), title: this._('pagination.firstPage'), "aria-label": this._('pagination.firstPage'), className: this.config.className.paginationButton }, this._('1')),
                a$1("button", { tabIndex: -1, className: classJoin(className('spread'), this.config.className.paginationButton) }, "..."))),
            Array.from(Array(maxCount).keys())
                .map(function (i) { return _this.state.page + (i - pagePivot); })
                .map(function (i) { return (a$1("button", { tabIndex: 0, role: "button", onClick: _this.setPage.bind(_this, i), className: classJoin(_this.state.page === i
                    ? classJoin(className('currentPage'), _this.config.className.paginationButtonCurrent)
                    : null, _this.config.className.paginationButton), title: _this._('pagination.page', i + 1), "aria-label": _this._('pagination.page', i + 1) }, _this._("" + (i + 1)))); }),
            this.pages > maxCount && this.pages > this.state.page + pagePivot + 1 && (a$1(y$1, null,
                a$1("button", { tabIndex: -1, className: classJoin(className('spread'), this.config.className.paginationButton) }, "..."),
                a$1("button", { tabIndex: 0, role: "button", onClick: this.setPage.bind(this, this.pages - 1), title: this._('pagination.page', this.pages), "aria-label": this._('pagination.page', this.pages), className: this.config.className.paginationButton }, this._("" + this.pages))))));
    };
    Pagination.prototype.renderSummary = function () {
        return (a$1(y$1, null, this.props.summary && this.state.total > 0 && (a$1("div", { role: "status", "aria-live": "polite", className: classJoin(className('summary'), this.config.className.paginationSummary), title: this._('pagination.navigate', this.state.page + 1, this.pages) },
            this._('pagination.showing'),
            ' ',
            a$1("b", null, this._("" + (this.state.page * this.state.limit + 1))),
            ' ',
            this._('pagination.to'),
            ' ',
            a$1("b", null, this._("" + Math.min((this.state.page + 1) * this.state.limit, this.state.total))),
            ' ',
            this._('pagination.of'),
            " ",
            a$1("b", null, this._("" + this.state.total)),
            ' ',
            this._('pagination.results')))));
    };
    Pagination.prototype.render = function () {
        if (!this.props.enabled)
            return null;
        return (a$1("div", { className: classJoin(className('pagination'), this.config.className.pagination) },
            this.renderSummary(),
            a$1("div", { className: className('pages') },
                this.props.prevButton && (a$1("button", { tabIndex: 0, role: "button", disabled: this.state.page === 0, onClick: this.setPage.bind(this, this.state.page - 1), title: this._('pagination.previous'), "aria-label": this._('pagination.previous'), className: classJoin(this.config.className.paginationButton, this.config.className.paginationButtonPrev) }, this._('pagination.previous'))),
                this.renderPages(),
                this.props.nextButton && (a$1("button", { tabIndex: 0, role: "button", disabled: this.pages === this.state.page + 1 || this.pages === 0, onClick: this.setPage.bind(this, this.state.page + 1), title: this._('pagination.next'), "aria-label": this._('pagination.next'), className: classJoin(this.config.className.paginationButton, this.config.className.paginationButtonNext) }, this._('pagination.next'))))));
    };
    Pagination.defaultProps = {
        summary: true,
        nextButton: true,
        prevButton: true,
        buttonsCount: 3,
        limit: 10,
        resetPageOnUpdate: true,
    };
    return Pagination;
}(PluginBaseComponent));

function width(width, containerWidth) {
    if (typeof width == 'string') {
        if (width.indexOf('%') > -1) {
            return (containerWidth / 100) * parseInt(width, 10);
        }
        else {
            return parseInt(width, 10);
        }
    }
    return width;
}
function px(width) {
    if (!width)
        return '';
    return Math.floor(width) + "px";
}

/**
 * ShadowTable renders a hidden table and is used to calculate the column's width
 * when autoWidth option is enabled
 */
var ShadowTable = /** @class */ (function (_super) {
    __extends(ShadowTable, _super);
    function ShadowTable(props, context) {
        var _this = _super.call(this, props, context) || this;
        var tableRef = _this.props.tableRef;
        _this.tableElement = tableRef.current.base.cloneNode(true);
        _this.tableElement.style.position = 'absolute';
        _this.tableElement.style.width = '100%';
        _this.tableElement.style.zIndex = '-2147483640';
        _this.tableElement.style.visibility = 'hidden';
        _this.tableClassName = _this.tableElement.className;
        _this.tableStyle = _this.tableElement.style.cssText;
        return _this;
    }
    ShadowTable.prototype.widths = function () {
        this.tableElement.className = this.tableClassName + " " + className('shadowTable');
        this.tableElement.style.tableLayout = 'auto';
        this.tableElement.style.width = 'auto';
        this.tableElement.style.padding = '0';
        this.tableElement.style.margin = '0';
        this.tableElement.style.border = 'none';
        this.tableElement.style.outline = 'none';
        var obj = Array.from(this.base.parentNode.querySelectorAll('thead th')).reduce(function (prev, current) {
            var _a;
            current.style.width = current.clientWidth + "px";
            return __assign((_a = {}, _a[current.getAttribute('data-column-id')] = {
                minWidth: current.clientWidth,
            }, _a), prev);
        }, {});
        this.tableElement.className = this.tableClassName;
        this.tableElement.style.cssText = this.tableStyle;
        this.tableElement.style.tableLayout = 'auto';
        obj = Array.from(this.base.parentNode.querySelectorAll('thead th')).reduce(function (prev, current) {
            prev[current.getAttribute('data-column-id')]['width'] =
                current.clientWidth;
            return prev;
        }, obj);
        return obj;
    };
    ShadowTable.prototype.render = function () {
        var _this = this;
        if (this.props.tableRef.current) {
            return (a$1("div", { ref: function (nodeElement) {
                    nodeElement && nodeElement.appendChild(_this.tableElement);
                } }));
        }
        return null;
    };
    return ShadowTable;
}(BaseComponent));

function camelCase(str) {
    if (!str)
        return '';
    var words = str.split(' ');
    // do not convert strings that are already in camelCase format
    if (words.length === 1 && /([a-z][A-Z])+/g.test(str)) {
        return str;
    }
    return words
        .map(function (word, index) {
        // if it is the first word, lowercase all the chars
        if (index == 0) {
            return word.toLowerCase();
        }
        // if it is not the first word only upper case the first char and lowercase the rest
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
        .join('');
}

var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super.call(this) || this;
        _this._columns = [];
        return _this;
    }
    Object.defineProperty(Header.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (columns) {
            this._columns = columns;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Header.prototype, "visibleColumns", {
        get: function () {
            return this._columns.filter(function (c) { return !c.hidden; });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Tries to automatically adjust the width of columns based on:
     *    - Header cell content
     *    - Cell content of the first row
     *    - Cell content of the last row
     *
     * @param config
     */
    Header.prototype.adjustWidth = function (config) {
        var container = config.container;
        var tableRef = config.tableRef;
        var tempRef = config.tempRef;
        var autoWidth = config.tempRef || true;
        if (!container) {
            // we can't calculate the width because the container
            // is unknown at this stage
            return this;
        }
        // pixels
        var containerWidth = container.clientWidth;
        // let's create a shadow table with the first 10 rows of the data
        // and let the browser to render the table with table-layout: auto
        // no padding, margin or border to get the minimum space required
        // to render columns. One the table is rendered and widths are known,
        // we unmount the shadow table from the DOM and set the correct width
        var shadowTable = h();
        var widths = {};
        if (tableRef.current && autoWidth) {
            // render a ShadowTable with the first 10 rows
            var el = a$1(ShadowTable, {
                tableRef: tableRef,
            });
            el.ref = shadowTable;
            N(el, tempRef.current);
            widths = shadowTable.current.widths();
        }
        for (var _i = 0, _a = flatten(Header.tabularFormat(this.columns)); _i < _a.length; _i++) {
            var column = _a[_i];
            // because we don't want to set the width of parent THs
            if (column.columns && column.columns.length > 0) {
                continue;
            }
            if (!column.width && autoWidth) {
                // tries to find the corresponding cell
                // from the ShadowTable and set the correct width
                if (column.id in widths) {
                    // because a column can be hidden, too
                    column.width = px(widths[column.id]['width']);
                    column.minWidth = px(widths[column.id]['minWidth']);
                }
            }
            else {
                // column width is already defined
                // sets the column with based on the width of its container
                column.width = px(width(column.width, containerWidth));
            }
        }
        if (tableRef.current && autoWidth) {
            // unmount the shadow table from temp
            N(null, tempRef.current);
        }
        return this;
    };
    Header.prototype.setSort = function (userConfig, columns) {
        var cols = columns || this.columns || [];
        for (var _i = 0, cols_1 = cols; _i < cols_1.length; _i++) {
            var column = cols_1[_i];
            // sorting can only be enabled for columns without any children
            if (column.columns && column.columns.length > 0) {
                column.sort = {
                    enabled: false,
                };
            }
            // implicit userConfig.sort flag
            if (column.sort === undefined && userConfig.sort) {
                column.sort = {
                    enabled: true,
                };
            }
            // false, null, etc.
            if (!column.sort) {
                column.sort = {
                    enabled: false,
                };
            }
            else if (typeof column.sort === 'object') {
                column.sort = __assign({ enabled: true }, column.sort);
            }
            if (column.columns) {
                this.setSort(userConfig, column.columns);
            }
        }
    };
    Header.prototype.setFixedHeader = function (userConfig, columns) {
        var cols = columns || this.columns || [];
        for (var _i = 0, cols_2 = cols; _i < cols_2.length; _i++) {
            var column = cols_2[_i];
            if (column.fixedHeader === undefined) {
                column.fixedHeader = userConfig.fixedHeader;
            }
            if (column.columns) {
                this.setFixedHeader(userConfig, column.columns);
            }
        }
    };
    Header.prototype.setResizable = function (userConfig, columns) {
        var cols = columns || this.columns || [];
        for (var _i = 0, cols_3 = cols; _i < cols_3.length; _i++) {
            var column = cols_3[_i];
            if (column.resizable === undefined) {
                column.resizable = userConfig.resizable;
            }
            if (column.columns) {
                this.setResizable(userConfig, column.columns);
            }
        }
    };
    Header.prototype.setID = function (columns) {
        var cols = columns || this.columns || [];
        for (var _i = 0, cols_4 = cols; _i < cols_4.length; _i++) {
            var column = cols_4[_i];
            if (!column.id && typeof column.name === 'string') {
                // let's guess the column ID if it's undefined
                column.id = camelCase(column.name);
            }
            if (!column.id) {
                log.error("Could not find a valid ID for one of the columns. Make sure a valid \"id\" is set for all columns.");
            }
            // nested columns
            if (column.columns) {
                this.setID(column.columns);
            }
        }
    };
    Header.prototype.populatePlugins = function (userConfig, columns) {
        // populate the cell columns
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            if (column.plugin !== undefined) {
                userConfig.plugin.add(__assign(__assign({ id: column.id, props: {} }, column.plugin), { position: PluginPosition.Cell }));
            }
        }
    };
    Header.fromColumns = function (columns) {
        var header = new Header();
        for (var _i = 0, columns_2 = columns; _i < columns_2.length; _i++) {
            var column = columns_2[_i];
            if (typeof column === 'string' || l(column)) {
                header.columns.push({
                    name: column,
                });
            }
            else if (typeof column === 'object') {
                var typedColumn = column;
                if (typedColumn.columns) {
                    typedColumn.columns = Header.fromColumns(typedColumn.columns).columns;
                }
                // because the data for that cell is null
                // if we are trying to render a plugin
                if (typeof typedColumn.plugin === 'object') {
                    if (typedColumn.data === undefined) {
                        typedColumn.data = null;
                    }
                }
                // TColumn type
                header.columns.push(column);
            }
        }
        return header;
    };
    Header.fromUserConfig = function (userConfig) {
        var header = new Header();
        // TODO: this part needs some refactoring
        if (userConfig.from) {
            header.columns = Header.fromHTMLTable(userConfig.from).columns;
        }
        else if (userConfig.columns) {
            header.columns = Header.fromColumns(userConfig.columns).columns;
        }
        else if (userConfig.data &&
            typeof userConfig.data[0] === 'object' &&
            !(userConfig.data[0] instanceof Array)) {
            // if data[0] is an object but not an Array
            // used for when a JSON payload is provided
            header.columns = Object.keys(userConfig.data[0]).map(function (name) {
                return { name: name };
            });
        }
        if (header.columns.length) {
            header.setID();
            header.setSort(userConfig);
            header.setFixedHeader(userConfig);
            header.setResizable(userConfig);
            header.populatePlugins(userConfig, header.columns);
            return header;
        }
        return null;
    };
    Header.fromHTMLTable = function (element) {
        var header = new Header();
        var thead = element.querySelector('thead');
        var ths = thead.querySelectorAll('th');
        for (var _i = 0, _a = ths; _i < _a.length; _i++) {
            var th = _a[_i];
            header.columns.push({
                name: th.innerHTML,
                width: th.width,
            });
        }
        return header;
    };
    /**
     * Converts the tree-like format of Header to a tabular format
     *
     * Example:
     *
     *    H1
     *      H1-H1
     *      H1-H2
     *    H2
     *      H2-H1
     *
     *    becomes:
     *      [
     *        [H1, H2],
     *        [H1-H1, H1-H2, H2-H1]
     *      ]
     *
     * @param columns
     */
    Header.tabularFormat = function (columns) {
        var result = [];
        var cols = columns || [];
        var nextRow = [];
        if (cols && cols.length) {
            result.push(cols);
            for (var _i = 0, cols_5 = cols; _i < cols_5.length; _i++) {
                var col = cols_5[_i];
                if (col.columns && col.columns.length) {
                    nextRow = nextRow.concat(col.columns);
                }
            }
            if (nextRow.length) {
                result = result.concat(this.tabularFormat(nextRow));
            }
        }
        return result;
    };
    /**
     * Returns an array of leaf columns (last columns in the tree)
     *
     * @param columns
     */
    Header.leafColumns = function (columns) {
        var result = [];
        var cols = columns || [];
        if (cols && cols.length) {
            for (var _i = 0, cols_6 = cols; _i < cols_6.length; _i++) {
                var col = cols_6[_i];
                if (!col.columns || col.columns.length === 0) {
                    result.push(col);
                }
                if (col.columns) {
                    result = result.concat(this.leafColumns(col.columns));
                }
            }
        }
        return result;
    };
    /**
     * Returns the maximum depth of a column tree
     * @param column
     */
    Header.maximumDepth = function (column) {
        return this.tabularFormat([column]).length - 1;
    };
    return Header;
}(Base));

var _prefix = 'ID_';
/**
 * This class is mostly based on Flux's Dispatcher by Facebook
 * https://github.com/facebook/flux/blob/master/src/Dispatcher.js
 */
var Dispatcher = /** @class */ (function () {
    function Dispatcher() {
        this._callbacks = {};
        this._isDispatching = false;
        this._isHandled = {};
        this._isPending = {};
        this._lastID = 1;
    }
    /**
     * Registers a callback to be invoked with every dispatched payload. Returns
     * a token that can be used with `waitFor()`.
     */
    Dispatcher.prototype.register = function (callback) {
        var id = _prefix + this._lastID++;
        this._callbacks[id] = callback;
        return id;
    };
    /**
     * Removes a callback based on its token.
     */
    Dispatcher.prototype.unregister = function (id) {
        if (!this._callbacks[id]) {
            throw Error("Dispatcher.unregister(...): " + id + " does not map to a registered callback.");
        }
        delete this._callbacks[id];
    };
    /**
     * Waits for the callbacks specified to be invoked before continuing execution
     * of the current callback. This method should only be used by a callback in
     * response to a dispatched payload.
     */
    Dispatcher.prototype.waitFor = function (ids) {
        if (!this._isDispatching) {
            throw Error('Dispatcher.waitFor(...): Must be invoked while dispatching.');
        }
        for (var ii = 0; ii < ids.length; ii++) {
            var id = ids[ii];
            if (this._isPending[id]) {
                if (!this._isHandled[id]) {
                    throw Error("Dispatcher.waitFor(...): Circular dependency detected while ' +\n            'waiting for " + id + ".");
                }
                continue;
            }
            if (!this._callbacks[id]) {
                throw Error("Dispatcher.waitFor(...): " + id + " does not map to a registered callback.");
            }
            this._invokeCallback(id);
        }
    };
    /**
     * Dispatches a payload to all registered callbacks.
     */
    Dispatcher.prototype.dispatch = function (payload) {
        if (this._isDispatching) {
            throw Error('Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.');
        }
        this._startDispatching(payload);
        try {
            for (var id in this._callbacks) {
                if (this._isPending[id]) {
                    continue;
                }
                this._invokeCallback(id);
            }
        }
        finally {
            this._stopDispatching();
        }
    };
    /**
     * Is this Dispatcher currently dispatching.
     */
    Dispatcher.prototype.isDispatching = function () {
        return this._isDispatching;
    };
    /**
     * Call the callback stored with the given id. Also do some internal
     * bookkeeping.
     *
     * @internal
     */
    Dispatcher.prototype._invokeCallback = function (id) {
        this._isPending[id] = true;
        this._callbacks[id](this._pendingPayload);
        this._isHandled[id] = true;
    };
    /**
     * Set up bookkeeping needed when dispatching.
     *
     * @internal
     */
    Dispatcher.prototype._startDispatching = function (payload) {
        for (var id in this._callbacks) {
            this._isPending[id] = false;
            this._isHandled[id] = false;
        }
        this._pendingPayload = payload;
        this._isDispatching = true;
    };
    /**
     * Clear bookkeeping used for dispatching.
     *
     * @internal
     */
    Dispatcher.prototype._stopDispatching = function () {
        delete this._pendingPayload;
        this._isDispatching = false;
    };
    return Dispatcher;
}());

var Storage = /** @class */ (function () {
    function Storage() {
    }
    return Storage;
}());

var MemoryStorage = /** @class */ (function (_super) {
    __extends(MemoryStorage, _super);
    function MemoryStorage(data) {
        var _this = _super.call(this) || this;
        _this.set(data);
        return _this;
    }
    MemoryStorage.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.data()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, {
                                data: data,
                                total: data.length,
                            }];
                }
            });
        });
    };
    MemoryStorage.prototype.set = function (data) {
        if (data instanceof Array) {
            this.data = function () { return data; };
        }
        else if (data instanceof Function) {
            this.data = data;
        }
        return this;
    };
    return MemoryStorage;
}(Storage));

var ServerStorage = /** @class */ (function (_super) {
    __extends(ServerStorage, _super);
    function ServerStorage(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        return _this;
    }
    ServerStorage.prototype.handler = function (response) {
        if (typeof this.options.handle === 'function') {
            return this.options.handle(response);
        }
        if (response.ok) {
            return response.json();
        }
        else {
            log.error("Could not fetch data: " + response.status + " - " + response.statusText, true);
            return null;
        }
    };
    ServerStorage.prototype.get = function (options) {
        // this.options is the initial config object
        // options is the runtime config passed by the pipeline (e.g. search component)
        var opts = __assign(__assign({}, this.options), options);
        // if `options.data` is provided, the current ServerStorage
        // implementation will be ignored and we let options.data to
        // handle the request. Useful when HTTP client needs to be
        // replaced with something else
        if (typeof opts.data === 'function') {
            return opts.data(opts);
        }
        return fetch(opts.url, opts)
            .then(this.handler.bind(this))
            .then(function (res) {
            return {
                data: opts.then(res),
                total: typeof opts.total === 'function' ? opts.total(res) : undefined,
            };
        });
    };
    return ServerStorage;
}(Storage));

var StorageUtils = /** @class */ (function () {
    function StorageUtils() {
    }
    /**
     * Accepts the userConfig dict and tries to guess and return a Storage type
     *
     * @param userConfig
     */
    StorageUtils.createFromUserConfig = function (userConfig) {
        var storage = null;
        // `data` array is provided
        if (userConfig.data) {
            storage = new MemoryStorage(userConfig.data);
        }
        if (userConfig.from) {
            storage = new MemoryStorage(this.tableElementToArray(userConfig.from));
            // remove the source table element from the DOM
            userConfig.from.style.display = 'none';
        }
        if (userConfig.server) {
            storage = new ServerStorage(userConfig.server);
        }
        if (!storage) {
            log.error('Could not determine the storage type', true);
        }
        return storage;
    };
    /**
     * Accepts a HTML table element and converts it into a 2D array of data
     *
     * TODO: This function can be a step in the pipeline: Convert Table -> Load into a memory storage -> ...
     *
     * @param element
     */
    StorageUtils.tableElementToArray = function (element) {
        var arr = [];
        var tbody = element.querySelector('tbody');
        var rows = tbody.querySelectorAll('tr');
        for (var _i = 0, _a = rows; _i < _a.length; _i++) {
            var row = _a[_i];
            var cells = row.querySelectorAll('td');
            var parsedRow = [];
            for (var _b = 0, cells_1 = cells; _b < cells_1.length; _b++) {
                var cell = cells_1[_b];
                // try to capture a TD with single text element first
                if (cell.childNodes.length === 1 &&
                    cell.childNodes[0].nodeType === Node.TEXT_NODE) {
                    parsedRow.push(decode(cell.innerHTML));
                }
                else {
                    parsedRow.push(html(cell.innerHTML));
                }
            }
            arr.push(parsedRow);
        }
        return arr;
    };
    return StorageUtils;
}());

var Pipeline = /** @class */ (function (_super) {
    __extends(Pipeline, _super);
    function Pipeline(steps) {
        var _this = _super.call(this) || this;
        // available steps for this pipeline
        _this._steps = new Map();
        // used to cache the results of processors using their id field
        _this.cache = new Map();
        // keeps the index of the last updated processor in the registered
        // processors list and will be used to invalidate the cache
        // -1 means all new processors should be processed
        _this.lastProcessorIndexUpdated = -1;
        if (steps) {
            steps.forEach(function (step) { return _this.register(step); });
        }
        return _this;
    }
    /**
     * Clears the `cache` array
     */
    Pipeline.prototype.clearCache = function () {
        this.cache = new Map();
        this.lastProcessorIndexUpdated = -1;
    };
    /**
     * Registers a new processor
     *
     * @param processor
     * @param priority
     */
    Pipeline.prototype.register = function (processor, priority) {
        if (priority === void 0) { priority = null; }
        if (processor.type === null) {
            throw Error('Processor type is not defined');
        }
        // binding the propsUpdated callback to the Pipeline
        processor.on('propsUpdated', this.processorPropsUpdated.bind(this));
        this.addProcessorByPriority(processor, priority);
        this.afterRegistered(processor);
    };
    /**
     * Removes a processor from the list
     *
     * @param processor
     */
    Pipeline.prototype.unregister = function (processor) {
        if (!processor)
            return;
        var subSteps = this._steps.get(processor.type);
        if (subSteps && subSteps.length) {
            this._steps.set(processor.type, subSteps.filter(function (proc) { return proc != processor; }));
            this.emit('updated', processor);
        }
    };
    /**
     * Registers a new processor
     *
     * @param processor
     * @param priority
     */
    Pipeline.prototype.addProcessorByPriority = function (processor, priority) {
        var subSteps = this._steps.get(processor.type);
        if (!subSteps) {
            var newSubStep = [];
            this._steps.set(processor.type, newSubStep);
            subSteps = newSubStep;
        }
        if (priority === null || priority < 0) {
            subSteps.push(processor);
        }
        else {
            if (!subSteps[priority]) {
                // slot is empty
                subSteps[priority] = processor;
            }
            else {
                // slot is NOT empty
                var first = subSteps.slice(0, priority - 1);
                var second = subSteps.slice(priority + 1);
                this._steps.set(processor.type, first.concat(processor).concat(second));
            }
        }
    };
    Object.defineProperty(Pipeline.prototype, "steps", {
        /**
         * Flattens the _steps Map and returns a list of steps with their correct priorities
         */
        get: function () {
            var steps = [];
            for (var _i = 0, _a = this.getSortedProcessorTypes(); _i < _a.length; _i++) {
                var type = _a[_i];
                var subSteps = this._steps.get(type);
                if (subSteps && subSteps.length) {
                    steps = steps.concat(subSteps);
                }
            }
            // to remove any undefined elements
            return steps.filter(function (s) { return s; });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Accepts ProcessType and returns an array of the registered processes
     * with the give type
     *
     * @param type
     */
    Pipeline.prototype.getStepsByType = function (type) {
        return this.steps.filter(function (process) { return process.type === type; });
    };
    /**
     * Returns a list of ProcessorType according to their priority
     */
    Pipeline.prototype.getSortedProcessorTypes = function () {
        return Object.keys(ProcessorType)
            .filter(function (key) { return !isNaN(Number(key)); })
            .map(function (key) { return Number(key); });
    };
    /**
     * Runs all registered processors based on their correct priority
     * and returns the final output after running all steps
     *
     * @param data
     */
    Pipeline.prototype.process = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var lastProcessorIndexUpdated, steps, prev, _i, steps_1, processor, processorIndex, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lastProcessorIndexUpdated = this.lastProcessorIndexUpdated;
                        steps = this.steps;
                        prev = data;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        _i = 0, steps_1 = steps;
                        _a.label = 2;
                    case 2:
                        if (!(_i < steps_1.length)) return [3 /*break*/, 6];
                        processor = steps_1[_i];
                        processorIndex = this.findProcessorIndexByID(processor.id);
                        if (!(processorIndex >= lastProcessorIndexUpdated)) return [3 /*break*/, 4];
                        return [4 /*yield*/, processor.process(prev)];
                    case 3:
                        // we should execute process() here since the last
                        // updated processor was before "processor".
                        // This is to ensure that we always have correct and up to date
                        // data from processors and also to skip them when necessary
                        prev = _a.sent();
                        this.cache.set(processor.id, prev);
                        return [3 /*break*/, 5];
                    case 4:
                        // cached results already exist
                        prev = this.cache.get(processor.id);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        log.error(e_1);
                        // trigger the onError callback
                        this.emit('error', prev);
                        // rethrow
                        throw e_1;
                    case 8:
                        // means the pipeline is up to date
                        this.lastProcessorIndexUpdated = steps.length;
                        // triggers the afterProcess callbacks with the results
                        this.emit('afterProcess', prev);
                        return [2 /*return*/, prev];
                }
            });
        });
    };
    /**
     * Returns the registered processor's index in _steps array
     *
     * @param processorID
     */
    Pipeline.prototype.findProcessorIndexByID = function (processorID) {
        return this.steps.findIndex(function (p) { return p.id == processorID; });
    };
    /**
     * Sets the last updates processors index locally
     * This is used to invalid or skip a processor in
     * the process() method
     */
    Pipeline.prototype.setLastProcessorIndex = function (processor) {
        var processorIndex = this.findProcessorIndexByID(processor.id);
        if (this.lastProcessorIndexUpdated > processorIndex) {
            this.lastProcessorIndexUpdated = processorIndex;
        }
    };
    Pipeline.prototype.processorPropsUpdated = function (processor) {
        this.setLastProcessorIndex(processor);
        this.emit('propsUpdated');
        this.emit('updated', processor);
    };
    Pipeline.prototype.afterRegistered = function (processor) {
        this.setLastProcessorIndex(processor);
        this.emit('afterRegister');
        this.emit('updated', processor);
    };
    return Pipeline;
}(EventEmitter));

var StorageExtractor = /** @class */ (function (_super) {
    __extends(StorageExtractor, _super);
    function StorageExtractor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StorageExtractor.prototype, "type", {
        get: function () {
            return ProcessorType.Extractor;
        },
        enumerable: false,
        configurable: true
    });
    StorageExtractor.prototype._process = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.storage.get(opts)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return StorageExtractor;
}(PipelineProcessor));

var ArrayToTabularTransformer = /** @class */ (function (_super) {
    __extends(ArrayToTabularTransformer, _super);
    function ArrayToTabularTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ArrayToTabularTransformer.prototype, "type", {
        get: function () {
            return ProcessorType.Transformer;
        },
        enumerable: false,
        configurable: true
    });
    ArrayToTabularTransformer.prototype._process = function (arrayResponse) {
        var tabular = Tabular.fromArray(arrayResponse.data);
        // for server-side storage
        tabular.length = arrayResponse.total;
        return tabular;
    };
    return ArrayToTabularTransformer;
}(PipelineProcessor));

var ServerInitiator = /** @class */ (function (_super) {
    __extends(ServerInitiator, _super);
    function ServerInitiator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ServerInitiator.prototype, "type", {
        get: function () {
            return ProcessorType.Initiator;
        },
        enumerable: false,
        configurable: true
    });
    ServerInitiator.prototype._process = function () {
        return Object.entries(this.props.serverStorageOptions)
            .filter(function (_a) {
            _a[0]; var val = _a[1];
            return typeof val !== 'function';
        })
            .reduce(function (acc, _a) {
            var _b;
            var k = _a[0], v = _a[1];
            return (__assign(__assign({}, acc), (_b = {}, _b[k] = v, _b)));
        }, {});
    };
    return ServerInitiator;
}(PipelineProcessor));

var StorageResponseToArrayTransformer = /** @class */ (function (_super) {
    __extends(StorageResponseToArrayTransformer, _super);
    function StorageResponseToArrayTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StorageResponseToArrayTransformer.prototype, "type", {
        get: function () {
            return ProcessorType.Transformer;
        },
        enumerable: false,
        configurable: true
    });
    StorageResponseToArrayTransformer.prototype.castData = function (data) {
        if (!data || !data.length) {
            return [];
        }
        if (!this.props.header || !this.props.header.columns) {
            return data;
        }
        var columns = Header.leafColumns(this.props.header.columns);
        // if it's a 2d array already
        if (data[0] instanceof Array) {
            return data.map(function (row) {
                var pad = 0;
                return columns.map(function (column, i) {
                    // default `data` is provided for this column
                    if (column.data !== undefined) {
                        pad++;
                        if (typeof column.data === 'function') {
                            return column.data(row);
                        }
                        else {
                            return column.data;
                        }
                    }
                    return row[i - pad];
                });
            });
        }
        // if it's an array of objects (but not array of arrays, i.e JSON payload)
        if (typeof data[0] === 'object' && !(data[0] instanceof Array)) {
            return data.map(function (row) {
                return columns.map(function (column, i) {
                    if (column.data !== undefined) {
                        if (typeof column.data === 'function') {
                            return column.data(row);
                        }
                        else {
                            return column.data;
                        }
                    }
                    else if (column.id) {
                        return row[column.id];
                    }
                    else {
                        log.error("Could not find the correct cell for column at position " + i + ".\n                          Make sure either 'id' or 'selector' is defined for all columns.");
                        return null;
                    }
                });
            });
        }
        return [];
    };
    StorageResponseToArrayTransformer.prototype._process = function (storageResponse) {
        return {
            data: this.castData(storageResponse.data),
            total: storageResponse.total,
        };
    };
    return StorageResponseToArrayTransformer;
}(PipelineProcessor));

var PipelineUtils = /** @class */ (function () {
    function PipelineUtils() {
    }
    PipelineUtils.createFromConfig = function (config) {
        var pipeline = new Pipeline();
        if (config.storage instanceof ServerStorage) {
            pipeline.register(new ServerInitiator({
                serverStorageOptions: config.server,
            }));
        }
        pipeline.register(new StorageExtractor({ storage: config.storage }));
        pipeline.register(new StorageResponseToArrayTransformer({ header: config.header }));
        pipeline.register(new ArrayToTabularTransformer());
        return pipeline;
    };
    return PipelineUtils;
}());

var Config = /** @class */ (function () {
    function Config(config) {
        Object.assign(this, __assign(__assign({}, Config.defaultConfig()), config));
        this._userConfig = {};
    }
    /**
     * Assigns `updatedConfig` keys to the current config file
     *
     * @param updatedConfig
     */
    Config.prototype.assign = function (updatedConfig) {
        for (var _i = 0, _a = Object.keys(updatedConfig); _i < _a.length; _i++) {
            var key = _a[_i];
            // because we don't want to update the _userConfig cache
            if (key === '_userConfig')
                continue;
            this[key] = updatedConfig[key];
        }
        return this;
    };
    /**
     * Updates the config from a UserConfig
     *
     * @param userConfig
     */
    Config.prototype.update = function (userConfig) {
        if (!userConfig)
            return this;
        this._userConfig = __assign(__assign({}, this._userConfig), userConfig);
        this.assign(Config.fromUserConfig(this._userConfig));
        return this;
    };
    Config.defaultConfig = function () {
        return {
            plugin: new PluginManager(),
            dispatcher: new Dispatcher(),
            tableRef: h(),
            tempRef: h(),
            width: '100%',
            height: 'auto',
            autoWidth: true,
            style: {},
            className: {},
        };
    };
    Config.fromUserConfig = function (userConfig) {
        var config = new Config(userConfig);
        // to set the initial _userConfig object
        config._userConfig = userConfig;
        // Sort
        if (typeof userConfig.sort === 'boolean' && userConfig.sort) {
            config.assign({
                sort: {
                    multiColumn: true,
                },
            });
        }
        // Header
        config.assign({
            header: Header.fromUserConfig(config),
        });
        config.assign({
            storage: StorageUtils.createFromUserConfig(userConfig),
        });
        config.assign({
            pipeline: PipelineUtils.createFromConfig(config),
        });
        // Translator
        config.assign({
            translator: new Translator(userConfig.language),
        });
        // Search
        config.plugin.add({
            id: 'search',
            position: PluginPosition.Header,
            component: Search,
            props: __assign({ enabled: userConfig.search === true || userConfig.search instanceof Object }, userConfig.search),
        });
        // Pagination
        config.plugin.add({
            id: 'pagination',
            position: PluginPosition.Footer,
            component: Pagination,
            props: __assign({ enabled: userConfig.pagination === true ||
                    userConfig.pagination instanceof Object }, userConfig.pagination),
        });
        // Additional plugins
        if (userConfig.plugins) {
            userConfig.plugins.forEach(function (p) { return config.plugin.add(p); });
        }
        return config;
    };
    return Config;
}());

// container status
var Status;
(function (Status) {
    Status[Status["Init"] = 0] = "Init";
    Status[Status["Loading"] = 1] = "Loading";
    Status[Status["Loaded"] = 2] = "Loaded";
    Status[Status["Rendered"] = 3] = "Rendered";
    Status[Status["Error"] = 4] = "Error";
})(Status || (Status = {}));

var TD = /** @class */ (function (_super) {
    __extends(TD, _super);
    function TD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TD.prototype.content = function () {
        if (this.props.column &&
            typeof this.props.column.formatter === 'function') {
            return this.props.column.formatter(this.props.cell.data, this.props.row, this.props.column);
        }
        if (this.props.column && this.props.column.plugin) {
            return (a$1(PluginRenderer, { pluginId: this.props.column.id, props: {
                    column: this.props.column,
                    cell: this.props.cell,
                    row: this.props.row,
                } }));
        }
        return this.props.cell.data;
    };
    TD.prototype.handleClick = function (e) {
        if (this.props.messageCell)
            return;
        this.config.eventEmitter.emit('cellClick', e, this.props.cell, this.props.column, this.props.row);
    };
    TD.prototype.getCustomAttributes = function (column) {
        if (!column)
            return {};
        if (typeof column.attributes === 'function') {
            return column.attributes(this.props.cell.data, this.props.row, this.props.column);
        }
        else {
            return column.attributes;
        }
    };
    TD.prototype.render = function () {
        return (a$1("td", __assign({ role: this.props.role, colSpan: this.props.colSpan, "data-column-id": this.props.column && this.props.column.id, className: classJoin(className('td'), this.props.className, this.config.className.td), style: __assign(__assign({}, this.props.style), this.config.style.td), onClick: this.handleClick.bind(this) }, this.getCustomAttributes(this.props.column)), this.content()));
    };
    return TD;
}(BaseComponent));

var TR = /** @class */ (function (_super) {
    __extends(TR, _super);
    function TR() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TR.prototype.getColumn = function (cellIndex) {
        if (this.props.header) {
            var cols = Header.leafColumns(this.props.header.columns);
            if (cols) {
                return cols[cellIndex];
            }
        }
        return null;
    };
    TR.prototype.handleClick = function (e) {
        if (this.props.messageRow)
            return;
        this.config.eventEmitter.emit('rowClick', e, this.props.row);
    };
    TR.prototype.getChildren = function () {
        var _this = this;
        if (this.props.children) {
            return this.props.children;
        }
        else {
            return (a$1(y$1, null, this.props.row.cells.map(function (cell, i) {
                var column = _this.getColumn(i);
                if (column && column.hidden)
                    return null;
                return (a$1(TD, { key: cell.id, cell: cell, row: _this.props.row, column: column }));
            })));
        }
    };
    TR.prototype.render = function () {
        return (a$1("tr", { className: classJoin(className('tr'), this.config.className.tr), onClick: this.handleClick.bind(this) }, this.getChildren()));
    };
    return TR;
}(BaseComponent));

var MessageRow = /** @class */ (function (_super) {
    __extends(MessageRow, _super);
    function MessageRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageRow.prototype.render = function () {
        return (a$1(TR, { messageRow: true },
            a$1(TD, { role: "alert", colSpan: this.props.colSpan, messageCell: true, cell: new Cell(this.props.message), className: classJoin(className('message'), this.props.className ? this.props.className : null) })));
    };
    return MessageRow;
}(BaseComponent));

var TBody = /** @class */ (function (_super) {
    __extends(TBody, _super);
    function TBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TBody.prototype.headerLength = function () {
        if (this.props.header) {
            return this.props.header.visibleColumns.length;
        }
        return 0;
    };
    TBody.prototype.render = function () {
        var _this = this;
        return (a$1("tbody", { className: classJoin(className('tbody'), this.config.className.tbody) },
            this.props.data &&
                this.props.data.rows.map(function (row) {
                    return a$1(TR, { key: row.id, row: row, header: _this.props.header });
                }),
            this.props.status === Status.Loading &&
                (!this.props.data || this.props.data.length === 0) && (a$1(MessageRow, { message: this._('loading'), colSpan: this.headerLength(), className: classJoin(className('loading'), this.config.className.loading) })),
            this.props.status === Status.Rendered &&
                this.props.data &&
                this.props.data.length === 0 && (a$1(MessageRow, { message: this._('noRecordsFound'), colSpan: this.headerLength(), className: classJoin(className('notfound'), this.config.className.notfound) })),
            this.props.status === Status.Error && (a$1(MessageRow, { message: this._('error'), colSpan: this.headerLength(), className: classJoin(className('error'), this.config.className.error) }))));
    };
    return TBody;
}(BaseComponent));

var NativeSort = /** @class */ (function (_super) {
    __extends(NativeSort, _super);
    function NativeSort() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NativeSort.prototype.validateProps = function () {
        for (var _i = 0, _a = this.props.columns; _i < _a.length; _i++) {
            var condition = _a[_i];
            if (condition.direction === undefined) {
                condition.direction = 1;
            }
            if (condition.direction !== 1 && condition.direction !== -1) {
                log.error("Invalid sort direction " + condition.direction);
            }
        }
    };
    Object.defineProperty(NativeSort.prototype, "type", {
        get: function () {
            return ProcessorType.Sort;
        },
        enumerable: false,
        configurable: true
    });
    NativeSort.prototype.compare = function (cellA, cellB) {
        if (cellA > cellB) {
            return 1;
        }
        else if (cellA < cellB) {
            return -1;
        }
        return 0;
    };
    NativeSort.prototype.compareWrapper = function (a, b) {
        var cmp = 0;
        for (var _i = 0, _a = this.props.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            if (cmp === 0) {
                var cellA = a.cells[column.index].data;
                var cellB = b.cells[column.index].data;
                if (typeof column.compare === 'function') {
                    cmp |= column.compare(cellA, cellB) * column.direction;
                }
                else {
                    cmp |= this.compare(cellA, cellB) * column.direction;
                }
            }
            else {
                break;
            }
        }
        return cmp;
    };
    NativeSort.prototype._process = function (data) {
        var sortedRows = __spreadArrays(data.rows);
        sortedRows.sort(this.compareWrapper.bind(this));
        var sorted = new Tabular(sortedRows);
        // we have to set the tabular length manually
        // because of the server-side storage
        sorted.length = data.length;
        return sorted;
    };
    return NativeSort;
}(PipelineProcessor));

var SortStore = /** @class */ (function (_super) {
    __extends(SortStore, _super);
    function SortStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SortStore.prototype.getInitialState = function () {
        return [];
    };
    SortStore.prototype.handle = function (type, payload) {
        if (type === 'SORT_COLUMN') {
            var index = payload.index, direction = payload.direction, multi = payload.multi, compare = payload.compare;
            this.sortColumn(index, direction, multi, compare);
        }
        else if (type === 'SORT_COLUMN_TOGGLE') {
            var index = payload.index, multi = payload.multi, compare = payload.compare;
            this.sortToggle(index, multi, compare);
        }
    };
    SortStore.prototype.sortToggle = function (index, multi, compare) {
        var columns = __spreadArrays(this.state);
        var column = columns.find(function (x) { return x.index === index; });
        if (!column) {
            this.sortColumn(index, 1, multi, compare);
        }
        else {
            this.sortColumn(index, column.direction === 1 ? -1 : 1, multi, compare);
        }
    };
    SortStore.prototype.sortColumn = function (index, direction, multi, compare) {
        var columns = __spreadArrays(this.state);
        var count = columns.length;
        var column = columns.find(function (x) { return x.index === index; });
        var exists = column !== undefined;
        var add = false;
        var reset = false;
        var remove = false;
        var update = false;
        if (!exists) {
            // the column has not been sorted
            if (count === 0) {
                // the first column to be sorted
                add = true;
            }
            else if (count > 0 && !multi) {
                // remove the previously sorted column
                // and sort the current column
                add = true;
                reset = true;
            }
            else if (count > 0 && multi) {
                // multi-sorting
                // sort this column as well
                add = true;
            }
        }
        else {
            // the column has been sorted before
            if (!multi) {
                // single column sorting
                if (count === 1) {
                    update = true;
                }
                else if (count > 1) {
                    // this situation happens when we have already entered
                    // multi-sorting mode but then user tries to sort a single column
                    reset = true;
                    add = true;
                }
            }
            else {
                // multi sorting
                if (column.direction === -1) {
                    // remove the current column from the
                    // sorted columns array
                    remove = true;
                }
                else {
                    update = true;
                }
            }
        }
        if (reset) {
            // resetting the sorted columns
            columns = [];
        }
        if (add) {
            columns.push({
                index: index,
                direction: direction,
                compare: compare,
            });
        }
        else if (update) {
            var index_1 = columns.indexOf(column);
            columns[index_1].direction = direction;
        }
        else if (remove) {
            var index_2 = columns.indexOf(column);
            columns.splice(index_2, 1);
        }
        this.setState(columns);
    };
    return SortStore;
}(BaseStore));

var SortActions = /** @class */ (function (_super) {
    __extends(SortActions, _super);
    function SortActions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SortActions.prototype.sortColumn = function (index, direction, multi, compare) {
        this.dispatch('SORT_COLUMN', {
            index: index,
            direction: direction,
            multi: multi,
            compare: compare,
        });
    };
    SortActions.prototype.sortToggle = function (index, multi, compare) {
        this.dispatch('SORT_COLUMN_TOGGLE', {
            index: index,
            multi: multi,
            compare: compare,
        });
    };
    return SortActions;
}(BaseActions));

var ServerSort = /** @class */ (function (_super) {
    __extends(ServerSort, _super);
    function ServerSort() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ServerSort.prototype, "type", {
        get: function () {
            return ProcessorType.ServerSort;
        },
        enumerable: false,
        configurable: true
    });
    ServerSort.prototype._process = function (options) {
        var updates = {};
        if (this.props.url) {
            updates['url'] = this.props.url(options.url, this.props.columns);
        }
        if (this.props.body) {
            updates['body'] = this.props.body(options.body, this.props.columns);
        }
        return __assign(__assign({}, options), updates);
    };
    return ServerSort;
}(PipelineProcessor));

var Sort = /** @class */ (function (_super) {
    __extends(Sort, _super);
    function Sort(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.actions = new SortActions(_this.config.dispatcher);
        _this.store = new SortStore(_this.config.dispatcher);
        if (props.enabled) {
            _this.sortProcessor = _this.getOrCreateSortProcessor();
            _this.updateStateFn = _this.updateState.bind(_this);
            _this.store.on('updated', _this.updateStateFn);
            _this.state = { direction: 0 };
        }
        return _this;
    }
    Sort.prototype.componentWillUnmount = function () {
        this.config.pipeline.unregister(this.sortProcessor);
        this.store.off('updated', this.updateStateFn);
        if (this.updateSortProcessorFn)
            this.store.off('updated', this.updateSortProcessorFn);
    };
    /**
     * Sets the internal state of component
     */
    Sort.prototype.updateState = function () {
        var _this = this;
        var currentColumn = this.store.state.find(function (x) { return x.index === _this.props.index; });
        if (!currentColumn) {
            this.setState({
                direction: 0,
            });
        }
        else {
            this.setState({
                direction: currentColumn.direction,
            });
        }
    };
    Sort.prototype.updateSortProcessor = function (sortedColumns) {
        // updates the Sorting processor
        this.sortProcessor.setProps({
            columns: sortedColumns,
        });
    };
    Sort.prototype.getOrCreateSortProcessor = function () {
        var processorType = ProcessorType.Sort;
        if (this.config.sort && typeof this.config.sort.server === 'object') {
            processorType = ProcessorType.ServerSort;
        }
        var processors = this.config.pipeline.getStepsByType(processorType);
        // my assumption is that we only have ONE sorting processor in the
        // entire pipeline and that's why I'm displaying a warning here
        var processor;
        // A sort process is already registered
        if (processors.length > 0) {
            processor = processors[0];
        }
        else {
            // let's create a new sort processor
            // this event listener is here because
            // we want to subscribe to the sort store only once
            this.updateSortProcessorFn = this.updateSortProcessor.bind(this);
            this.store.on('updated', this.updateSortProcessorFn);
            if (processorType === ProcessorType.ServerSort) {
                processor = new ServerSort(__assign({ columns: this.store.state }, this.config.sort.server));
            }
            else {
                processor = new NativeSort({
                    columns: this.store.state,
                });
            }
            this.config.pipeline.register(processor);
        }
        return processor;
    };
    Sort.prototype.changeDirection = function (e) {
        e.preventDefault();
        e.stopPropagation();
        // to sort two or more columns at the same time
        this.actions.sortToggle(this.props.index, e.shiftKey === true && this.config.sort.multiColumn, this.props.compare);
    };
    Sort.prototype.render = function () {
        if (!this.props.enabled) {
            return null;
        }
        var direction = this.state.direction;
        var sortClassName = 'neutral';
        if (direction === 1) {
            sortClassName = 'asc';
        }
        else if (direction === -1) {
            sortClassName = 'desc';
        }
        return (a$1("button", { 
            // because the corresponding <th> has tabIndex=0
            tabIndex: -1, "aria-label": this._("sort.sort" + (direction === 1 ? 'Desc' : 'Asc')), title: this._("sort.sort" + (direction === 1 ? 'Desc' : 'Asc')), className: classJoin(className('sort'), className('sort', sortClassName), this.config.className.sort), onClick: this.changeDirection.bind(this) }));
    };
    return Sort;
}(BaseComponent));

var throttle = function (fn, wait) {
    if (wait === void 0) { wait = 100; }
    var inThrottle;
    var lastFn;
    var lastTime;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!inThrottle) {
            fn.apply(void 0, args);
            lastTime = Date.now();
            inThrottle = true;
        }
        else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function () {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(void 0, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};

var Resize = /** @class */ (function (_super) {
    __extends(Resize, _super);
    function Resize() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Resize.prototype.getPageX = function (e) {
        if (e instanceof MouseEvent) {
            return Math.floor(e.pageX);
        }
        else {
            return Math.floor(e.changedTouches[0].pageX);
        }
    };
    Resize.prototype.start = function (e) {
        e.stopPropagation();
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        var thElement = this.props.thRef.current;
        this.setState({
            offsetStart: parseInt(thElement.style.width, 10) - this.getPageX(e),
        });
        this.upFn = this.end.bind(this);
        this.moveFn = throttle(this.move.bind(this), 10);
        document.addEventListener('mouseup', this.upFn);
        document.addEventListener('touchend', this.upFn);
        document.addEventListener('mousemove', this.moveFn);
        document.addEventListener('touchmove', this.moveFn);
    };
    Resize.prototype.move = function (e) {
        e.stopPropagation();
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        var thElement = this.props.thRef.current;
        if (this.state.offsetStart + this.getPageX(e) >=
            parseInt(thElement.style.minWidth, 10)) {
            thElement.style.width = this.state.offsetStart + this.getPageX(e) + "px";
        }
    };
    Resize.prototype.end = function (e) {
        e.stopPropagation();
        document.removeEventListener('mouseup', this.upFn);
        document.removeEventListener('mousemove', this.moveFn);
        document.removeEventListener('touchmove', this.moveFn);
        document.removeEventListener('touchend', this.upFn);
    };
    Resize.prototype.render = function () {
        return (a$1("div", { className: classJoin(className('th'), className('resizable')), onMouseDown: this.start.bind(this), onTouchStart: this.start.bind(this), onClick: function (e) { return e.stopPropagation(); } }));
    };
    return Resize;
}(BaseComponent));

var TH = /** @class */ (function (_super) {
    __extends(TH, _super);
    function TH(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.sortRef = h();
        _this.thRef = h();
        _this.state = {
            style: {},
        };
        return _this;
    }
    TH.prototype.isSortable = function () {
        return this.props.column.sort.enabled;
    };
    TH.prototype.isResizable = function () {
        return this.props.column.resizable;
    };
    TH.prototype.onClick = function (e) {
        e.stopPropagation();
        if (this.isSortable()) {
            this.sortRef.current.changeDirection(e);
        }
    };
    TH.prototype.keyDown = function (e) {
        if (this.isSortable() && e.which === 13) {
            this.onClick(e);
        }
    };
    TH.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            // sets the `top` style if the current TH is fixed
            if (_this.props.column.fixedHeader && _this.thRef.current) {
                var offsetTop = _this.thRef.current.offsetTop;
                if (typeof offsetTop === 'number') {
                    _this.setState({
                        style: {
                            top: offsetTop,
                        },
                    });
                }
            }
        }, 0);
    };
    TH.prototype.content = function () {
        if (this.props.column.name !== undefined) {
            return this.props.column.name;
        }
        if (this.props.column.plugin !== undefined) {
            return (a$1(PluginRenderer, { pluginId: this.props.column.plugin.id, props: {
                    column: this.props.column,
                } }));
        }
        return null;
    };
    TH.prototype.getCustomAttributes = function () {
        var column = this.props.column;
        if (!column)
            return {};
        if (typeof column.attributes === 'function') {
            return column.attributes(null, null, this.props.column);
        }
        else {
            return column.attributes;
        }
    };
    TH.prototype.render = function () {
        var props = {};
        if (this.isSortable()) {
            props['tabIndex'] = 0;
        }
        return (a$1("th", __assign({ ref: this.thRef, "data-column-id": this.props.column && this.props.column.id, className: classJoin(className('th'), this.isSortable() ? className('th', 'sort') : null, this.props.column.fixedHeader ? className('th', 'fixed') : null, this.config.className.th), onClick: this.onClick.bind(this), style: __assign(__assign(__assign(__assign({}, this.config.style.th), {
                minWidth: this.props.column.minWidth,
                width: this.props.column.width,
            }), this.state.style), this.props.style), onKeyDown: this.keyDown.bind(this), rowSpan: this.props.rowSpan > 1 ? this.props.rowSpan : undefined, colSpan: this.props.colSpan > 1 ? this.props.colSpan : undefined }, this.getCustomAttributes(), props),
            a$1("div", { className: className('th', 'content') }, this.content()),
            this.isSortable() && (a$1(Sort, __assign({ ref: this.sortRef, index: this.props.index }, this.props.column.sort))),
            this.isResizable() &&
                this.props.index < this.config.header.visibleColumns.length - 1 && (a$1(Resize, { column: this.props.column, thRef: this.thRef }))));
    };
    return TH;
}(BaseComponent));

function calculateRowColSpans(column, rowIndex, totalRows) {
    var depth = Header.maximumDepth(column);
    var remainingRows = totalRows - rowIndex;
    var rowSpan = Math.floor(remainingRows - depth - depth / remainingRows);
    var colSpan = (column.columns && column.columns.length) || 1;
    return {
        rowSpan: rowSpan,
        colSpan: colSpan,
    };
}

var THead = /** @class */ (function (_super) {
    __extends(THead, _super);
    function THead() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    THead.prototype.renderColumn = function (column, rowIndex, columnIndex, totalRows) {
        var _a = calculateRowColSpans(column, rowIndex, totalRows), rowSpan = _a.rowSpan, colSpan = _a.colSpan;
        return (a$1(TH, { column: column, index: columnIndex, colSpan: colSpan, rowSpan: rowSpan }));
    };
    THead.prototype.renderRow = function (row, rowIndex, totalRows) {
        var _this = this;
        // because the only sortable columns are leaf columns (not parents)
        var leafColumns = Header.leafColumns(this.props.header.columns);
        return (a$1(TR, null, row.map(function (col) {
            if (col.hidden)
                return null;
            return _this.renderColumn(col, rowIndex, leafColumns.indexOf(col), totalRows);
        })));
    };
    THead.prototype.renderRows = function () {
        var _this = this;
        var rows = Header.tabularFormat(this.props.header.columns);
        return rows.map(function (row, rowIndex) {
            return _this.renderRow(row, rowIndex, rows.length);
        });
    };
    THead.prototype.render = function () {
        if (this.props.header) {
            return (a$1("thead", { key: this.props.header.id, className: classJoin(className('thead'), this.config.className.thead) }, this.renderRows()));
        }
        return null;
    };
    return THead;
}(BaseComponent));

var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Table.prototype.render = function () {
        return (a$1("table", { role: "grid", className: classJoin(className('table'), this.config.className.table), style: __assign(__assign({}, this.config.style.table), {
                height: this.props.height,
            }) },
            a$1(THead, { header: this.props.header }),
            a$1(TBody, { data: this.props.data, status: this.props.status, header: this.props.header })));
    };
    return Table;
}(BaseComponent));

var HeaderContainer = /** @class */ (function (_super) {
    __extends(HeaderContainer, _super);
    function HeaderContainer(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.headerRef = h();
        _this.state = {
            isActive: true,
        };
        return _this;
    }
    HeaderContainer.prototype.componentDidMount = function () {
        if (this.headerRef.current.children.length === 0) {
            this.setState({
                isActive: false,
            });
        }
    };
    HeaderContainer.prototype.render = function () {
        if (this.state.isActive) {
            return (a$1("div", { ref: this.headerRef, className: classJoin(className('head'), this.config.className.header), style: __assign({}, this.config.style.header) },
                a$1(PluginRenderer, { position: PluginPosition.Header })));
        }
        return null;
    };
    return HeaderContainer;
}(BaseComponent));

var FooterContainer = /** @class */ (function (_super) {
    __extends(FooterContainer, _super);
    function FooterContainer(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.footerRef = h();
        _this.state = {
            isActive: true,
        };
        return _this;
    }
    FooterContainer.prototype.componentDidMount = function () {
        if (this.footerRef.current.children.length === 0) {
            this.setState({
                isActive: false,
            });
        }
    };
    FooterContainer.prototype.render = function () {
        if (this.state.isActive) {
            return (a$1("div", { ref: this.footerRef, className: classJoin(className('footer'), this.config.className.footer), style: __assign({}, this.config.style.footer) },
                a$1(PluginRenderer, { position: PluginPosition.Footer })));
        }
        return null;
    };
    return FooterContainer;
}(BaseComponent));

var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container(props, context) {
        var _this = _super.call(this, props, context) || this;
        // global Config context which is passed to all components
        _this.configContext = q(null);
        _this.state = {
            status: Status.Loading,
            header: props.header,
            data: null,
        };
        return _this;
    }
    Container.prototype.processPipeline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.props.config.eventEmitter.emit('beforeLoad');
                        this.setState({
                            status: Status.Loading,
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.props.pipeline.process()];
                    case 2:
                        data = _a.sent();
                        this.setState({
                            data: data,
                            status: Status.Loaded,
                        });
                        this.props.config.eventEmitter.emit('load', data);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        log.error(e_1);
                        this.setState({
                            status: Status.Error,
                            data: null,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Container.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = this.props.config;
                        // for the initial load
                        return [4 /*yield*/, this.processPipeline()];
                    case 1:
                        // for the initial load
                        _a.sent();
                        if (config.header && this.state.data && this.state.data.length) {
                            // now that we have the data, let's adjust columns width
                            // NOTE: that we only calculate the columns width once
                            this.setState({
                                header: config.header.adjustWidth(config),
                            });
                        }
                        this.processPipelineFn = this.processPipeline.bind(this);
                        this.props.pipeline.on('updated', this.processPipelineFn);
                        return [2 /*return*/];
                }
            });
        });
    };
    Container.prototype.componentWillUnmount = function () {
        this.props.pipeline.off('updated', this.processPipelineFn);
    };
    Container.prototype.componentDidUpdate = function (_, previousState) {
        // we can't jump to the Status.Rendered if previous status is not Status.Loaded
        if (previousState.status != Status.Rendered &&
            this.state.status == Status.Loaded) {
            this.setState({
                status: Status.Rendered,
            });
            this.props.config.eventEmitter.emit('ready');
        }
    };
    Container.prototype.render = function () {
        var configContext = this.configContext;
        return (a$1(configContext.Provider, { value: this.props.config },
            a$1("div", { role: "complementary", className: classJoin('gridjs', className('container'), this.state.status === Status.Loading ? className('loading') : null, this.props.config.className.container), style: __assign(__assign({}, this.props.config.style.container), {
                    width: this.props.width,
                }) },
                this.state.status === Status.Loading && (a$1("div", { className: className('loading-bar') })),
                a$1(HeaderContainer, null),
                a$1("div", { className: className('wrapper'), style: { height: this.props.height } },
                    a$1(Table, { ref: this.props.config.tableRef, data: this.state.data, header: this.state.header, width: this.props.width, height: this.props.height, status: this.state.status })),
                a$1(FooterContainer, null),
                a$1("div", { ref: this.props.config.tempRef, id: "gridjs-temp", className: className('temp') }))));
    };
    return Container;
}(BaseComponent));

var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid(userConfig) {
        var _this = _super.call(this) || this;
        _this.config = new Config({ instance: _this, eventEmitter: _this }).update(userConfig);
        _this.plugin = _this.config.plugin;
        return _this;
    }
    Grid.prototype.updateConfig = function (userConfig) {
        this.config.update(userConfig);
        return this;
    };
    Grid.prototype.createElement = function () {
        return a$1(Container, {
            config: this.config,
            pipeline: this.config.pipeline,
            header: this.config.header,
            width: this.config.width,
            height: this.config.height,
        });
    };
    /**
     * Uses the existing container and tries to clear the cache
     * and re-render the existing Grid.js instance again. This is
     * useful when a new config is set/updated.
     *
     */
    Grid.prototype.forceRender = function () {
        if (!this.config || !this.config.container) {
            log.error('Container is empty. Make sure you call render() before forceRender()', true);
        }
        // clear the pipeline cache
        this.config.pipeline.clearCache();
        // TODO: not sure if it's a good idea to render a null element but I couldn't find a better way
        N(null, this.config.container);
        N(this.createElement(), this.config.container);
        return this;
    };
    /**
     * Mounts the Grid.js instance to the container
     * and renders the instance
     *
     * @param container
     */
    Grid.prototype.render = function (container) {
        if (!container) {
            log.error('Container element cannot be null', true);
        }
        if (container.childNodes.length > 0) {
            log.error("The container element " + container + " is not empty. Make sure the container is empty and call render() again");
            return this;
        }
        this.config.container = container;
        N(this.createElement(), container);
        return this;
    };
    return Grid;
}(EventEmitter));

var t,u,r,o=0,i=[],c=n.__b,f=n.__r,e=n.diffed,a=n.__c,v=n.unmount;function m(t,r){n.__h&&n.__h(u,t,o||r),o=0;var i=u.__H||(u.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({}),i.__[t]}function y(r,o){var i=m(t++,3);!n.__s&&k(i.__H,o)&&(i.__=r,i.__H=o,u.__H.__h.push(i));}function s(n){return o=5,d(function(){return {current:n}},[])}function d(n,u){var r=m(t++,7);return k(r.__H,u)&&(r.__=n(),r.__H=u,r.__h=n),r.__}function x(){i.forEach(function(t){if(t.__P)try{t.__H.__h.forEach(g),t.__H.__h.forEach(j),t.__H.__h=[];}catch(u){t.__H.__h=[],n.__e(u,t.__v);}}),i=[];}n.__b=function(n){u=null,c&&c(n);},n.__r=function(n){f&&f(n),t=0;var r=(u=n.__c).__H;r&&(r.__h.forEach(g),r.__h.forEach(j),r.__h=[]);},n.diffed=function(t){e&&e(t);var o=t.__c;o&&o.__H&&o.__H.__h.length&&(1!==i.push(o)&&r===n.requestAnimationFrame||((r=n.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),b&&cancelAnimationFrame(t),setTimeout(n);},r=setTimeout(u,100);b&&(t=requestAnimationFrame(u));})(x)),u=void 0;},n.__c=function(t,u){u.some(function(t){try{t.__h.forEach(g),t.__h=t.__h.filter(function(n){return !n.__||j(n)});}catch(r){u.some(function(n){n.__h&&(n.__h=[]);}),u=[],n.__e(r,t.__v);}}),a&&a(t,u);},n.unmount=function(t){v&&v(t);var u=t.__c;if(u&&u.__H)try{u.__H.__.forEach(g);}catch(t){n.__e(t,u.__v);}};var b="function"==typeof requestAnimationFrame;function g(n){var t=u;"function"==typeof n.__c&&n.__c(),u=t;}function j(n){var t=u;n.__c=n.__(),u=t;}function k(n,t){return !n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}

export { BaseActions, BaseComponent, BaseStore, Cell, p as Component, Config, Dispatcher, Grid, PluginBaseComponent, PluginPosition, Row, className, a$1 as createElement, h as createRef, a$1 as h, html, y as useEffect, s as useRef };
