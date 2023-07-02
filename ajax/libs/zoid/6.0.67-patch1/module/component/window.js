import { getOpener, getTop, getParent, getNthParentFromTop, getAllFramesInWindow, getAncestor, getDomain } from 'cross-domain-utils/src';
import base32 from 'hi-base32';

import { memoize, uniqueID, globalFor, stringifyError } from '../lib';
import { WINDOW_REFERENCES } from '../constants';


function normalize(str) {
    return str.replace(/^[^a-z0-9A-Z]+|[^a-z0-9A-Z]+$/g, '').replace(/[^a-z0-9A-Z]+/g, '_');
}

function encode(str) {
    return base32.encode(str).replace(/\=/g, '').toLowerCase(); // eslint-disable-line no-useless-escape
}

function decode(str) {
    return base32.decode(str.toUpperCase());
}

/*  Build Child Window Name
    -----------------------

    Build a name for our child window. This should identify the following things to the child:

    - That the window was created by, and is owned by zoid
    - The name of the child's parent. This is so the child can identify which window created it, even when we do a
      renderTo, in which case the true parent may actually be a sibling frame in the window hierarchy

    We base64 encode the window name so IE doesn't die when it encounters any characters that it doesn't like.
*/

export function buildChildWindowName(name, version) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


    options.id = uniqueID();
    options.domain = getDomain(window);

    var encodedName = normalize(name);
    var encodedVersion = normalize(version);
    var encodedOptions = encode(JSON.stringify(options));

    if (!encodedName) {
        throw new Error('Invalid name: ' + name + ' - must contain alphanumeric characters');
    }

    if (!encodedVersion) {
        throw new Error('Invalid version: ' + version + ' - must contain alphanumeric characters');
    }

    return ['xcomponent', encodedName, encodedVersion, encodedOptions, ''].join('__');
}

export var isZoidComponentWindow = memoize(function () {
    if (!window.name) {
        return false;
    }

    var _window$name$split = window.name.split('__'),
        zoidcomp = _window$name$split[0];

    if (zoidcomp !== 'xcomponent') {
        return false;
    }

    return true;
});

/*  Parse Window Name
    -----------------

    The inverse of buildChildWindowName. Base64 decodes and json parses the window name to get the original props
    passed down, including the parent name. Only accepts window names built by zoid
*/

export var getComponentMeta = memoize(function () {

    if (!window.name) {
        throw new Error('Can not get component meta without window name');
    }

    var _window$name$split2 = window.name.split('__'),
        zoidcomp = _window$name$split2[0],
        name = _window$name$split2[1],
        version = _window$name$split2[2],
        encodedOptions = _window$name$split2[3];

    if (zoidcomp !== 'xcomponent') {
        throw new Error('Window not rendered by zoid - got ' + zoidcomp);
    }

    var componentMeta = void 0;

    try {
        componentMeta = JSON.parse(decode(encodedOptions));
    } catch (err) {
        throw new Error('Can not decode component-meta: ' + encodedOptions + ' ' + stringifyError(err));
    }

    componentMeta.name = name;
    componentMeta.version = version.replace(/_/g, '.');

    return componentMeta;
});

export function getParentDomain() {
    return getComponentMeta().domain; // How does this work for renderTo..?
}

function getWindowByRef(_ref) {
    var ref = _ref.ref,
        uid = _ref.uid,
        distance = _ref.distance;


    var result = void 0;

    if (ref === WINDOW_REFERENCES.OPENER) {
        result = getOpener(window);
    } else if (ref === WINDOW_REFERENCES.TOP) {
        result = getTop(window);
    } else if (ref === WINDOW_REFERENCES.PARENT) {

        if (distance) {
            result = getNthParentFromTop(window, distance);
        } else {
            result = getParent(window);
        }
    }

    if (ref === WINDOW_REFERENCES.GLOBAL) {
        var ancestor = getAncestor(window);

        if (ancestor) {
            for (var _i2 = 0, _getAllFramesInWindow2 = getAllFramesInWindow(ancestor), _length2 = _getAllFramesInWindow2 == null ? 0 : _getAllFramesInWindow2.length; _i2 < _length2; _i2++) {
                var frame = _getAllFramesInWindow2[_i2];
                var global = globalFor(frame);

                if (global && global.windows && global.windows[uid]) {
                    result = global.windows[uid];
                    break;
                }
            }
        }
    }

    if (!result) {
        throw new Error('Unable to find window by ref');
    }

    return result;
}

/*  Get Parent Component Window
    ---------------------------

    Get the parent component window, which may be different from the actual parent window
*/

export var getParentComponentWindow = memoize(function () {

    var componentMeta = getComponentMeta();

    if (!componentMeta) {
        throw new Error('Can not get parent component window - window not rendered by zoid');
    }

    return getWindowByRef(componentMeta.componentParent);
});

export var getParentRenderWindow = memoize(function () {

    var componentMeta = getComponentMeta();

    if (!componentMeta) {
        throw new Error('Can not get parent component window - window not rendered by zoid');
    }

    return getWindowByRef(componentMeta.renderParent);
});

/*  Get Position
    ------------

    Calculate the position for the popup

    This is either
    - Specified by the user
    - The center of the screen

    I'd love to do this with pure css, but alas... popup windows :(
*/

export function getPosition(_ref2) {
    var width = _ref2.width,
        height = _ref2.height;


    var x = 0;
    var y = 0;

    if (width) {
        if (window.outerWidth) {
            x = Math.round((window.outerWidth - width) / 2) + window.screenX;
        } else if (window.screen.width) {
            x = Math.round((window.screen.width - width) / 2);
        }
    }

    if (height) {
        if (window.outerHeight) {
            y = Math.round((window.outerHeight - height) / 2) + window.screenY;
        } else if (window.screen.height) {
            y = Math.round((window.screen.height - height) / 2);
        }
    }

    return { x: x, y: y };
}