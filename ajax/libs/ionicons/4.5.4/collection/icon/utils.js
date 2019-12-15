let CACHED_MAP;
export function getIconMap() {
    if (!CACHED_MAP) {
        const win = window;
        win.Ionicons = win.Ionicons || {};
        CACHED_MAP = win.Ionicons.map = win.Ionicons.map || new Map();
    }
    return CACHED_MAP;
}
export function addIcons(icons) {
    const map = getIconMap();
    Object.keys(icons).forEach(name => {
        map.set(name, icons[name]);
    });
}
export function getName(name, mode, ios, md) {
    mode = (mode || 'md').toLowerCase();
    mode = mode === 'ios' ? 'ios' : 'md';
    if (ios && mode === 'ios') {
        name = ios.toLowerCase();
    }
    else if (md && mode === 'md') {
        name = md.toLowerCase();
    }
    else if (name) {
        name = name.toLowerCase();
        if (!/^md-|^ios-|^logo-/.test(name)) {
            name = `${mode}-${name}`;
        }
    }
    if (typeof name !== 'string' || name.trim() === '') {
        return null;
    }
    const invalidChars = name.replace(/[a-z]|-|\d/gi, '');
    if (invalidChars !== '') {
        return null;
    }
    return name;
}
export function getSrc(src) {
    if (typeof src === 'string') {
        src = src.trim();
        if (isSrc(src)) {
            return src;
        }
    }
    return null;
}
export function isSrc(str) {
    return str.length > 0 && /(\/|\.)/.test(str);
}
export function isValid(elm) {
    if (elm.nodeType === 1) {
        if (elm.nodeName.toLowerCase() === 'script') {
            return false;
        }
        for (let i = 0; i < elm.attributes.length; i++) {
            const val = elm.attributes[i].value;
            if (typeof val === 'string' && val.toLowerCase().indexOf('on') === 0) {
                return false;
            }
        }
        for (let i = 0; i < elm.childNodes.length; i++) {
            if (!isValid(elm.childNodes[i])) {
                return false;
            }
        }
    }
    return true;
}
