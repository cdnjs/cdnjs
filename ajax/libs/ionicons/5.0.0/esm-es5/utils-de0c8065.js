import { g as getAssetPath } from './core-704d7629.js';
var CACHED_MAP;
var getIconMap = function () {
    if (!CACHED_MAP) {
        var win = window;
        win.Ionicons = win.Ionicons || {};
        CACHED_MAP = win.Ionicons.map = win.Ionicons.map || new Map();
    }
    return CACHED_MAP;
};
var addIcons = function (icons) {
    var map = getIconMap();
    Object.keys(icons).forEach(function (name) { return map.set(name, icons[name]); });
};
var getUrl = function (i) {
    var url = getSrc(i.src);
    if (url) {
        return url;
    }
    url = getName(i.name, i.icon, i.mode, i.ios, i.md);
    if (url) {
        return getNamedUrl(url);
    }
    if (i.icon) {
        url = getSrc(i.icon);
        if (url) {
            return url;
        }
        url = getSrc(i.icon[i.mode]);
        if (url) {
            return url;
        }
    }
    return null;
};
var getNamedUrl = function (iconName) {
    var url = getIconMap().get(iconName);
    if (url) {
        return url;
    }
    return getAssetPath("svg/" + iconName + ".svg");
};
var getName = function (iconName, icon, mode, ios, md) {
    // default to "md" if somehow the mode wasn't set
    mode = (mode && toLower(mode)) === 'ios' ? 'ios' : 'md';
    // if an icon was passed in using the ios or md attributes
    // set the iconName to whatever was passed in
    if (ios && mode === 'ios') {
        iconName = toLower(ios);
    }
    else if (md && mode === 'md') {
        iconName = toLower(md);
    }
    else {
        if (!iconName && icon && !isSrc(icon)) {
            iconName = icon;
        }
        if (isStr(iconName)) {
            iconName = toLower(iconName);
        }
    }
    if (!isStr(iconName) || iconName.trim() === '') {
        return null;
    }
    // only allow alpha characters and dash
    var invalidChars = iconName.replace(/[a-z]|-|\d/gi, '');
    if (invalidChars !== '') {
        return null;
    }
    return iconName;
};
var getSrc = function (src) {
    if (isStr(src)) {
        src = src.trim();
        if (isSrc(src)) {
            return src;
        }
    }
    return null;
};
var isSrc = function (str) { return str.length > 0 && /(\/|\.)/.test(str); };
var isStr = function (val) { return typeof val === 'string'; };
var toLower = function (val) { return val.toLowerCase(); };
export { addIcons as a, getName as b, getUrl as g, isStr as i };
