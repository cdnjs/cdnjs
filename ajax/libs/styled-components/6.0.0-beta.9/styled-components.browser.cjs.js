'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var shallowequal = require('shallowequal');
var stylis = require('stylis');
var unitless = require('@emotion/unitless');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var shallowequal__default = /*#__PURE__*/_interopDefault(shallowequal);
var unitless__default = /*#__PURE__*/_interopDefault(unitless);

var SC_ATTR = (typeof process !== 'undefined' && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR)) ||
    'data-styled';
var SC_ATTR_ACTIVE = 'active';
var SC_ATTR_VERSION = 'data-styled-version';
var SC_VERSION = "6.0.0-beta.9";
var SPLITTER = '/*!sc*/\n';
var IS_BROWSER = typeof window !== 'undefined' && 'HTMLElement' in window;
var DISABLE_SPEEDY = Boolean(typeof SC_DISABLE_SPEEDY === 'boolean'
    ? SC_DISABLE_SPEEDY
    : typeof process !== 'undefined' &&
        typeof process.env.REACT_APP_SC_DISABLE_SPEEDY !== 'undefined' &&
        process.env.REACT_APP_SC_DISABLE_SPEEDY !== ''
        ? process.env.REACT_APP_SC_DISABLE_SPEEDY === 'false'
            ? false
            : process.env.REACT_APP_SC_DISABLE_SPEEDY
        : typeof process !== 'undefined' &&
            typeof process.env.SC_DISABLE_SPEEDY !== 'undefined' &&
            process.env.SC_DISABLE_SPEEDY !== ''
            ? process.env.SC_DISABLE_SPEEDY === 'false'
                ? false
                : process.env.SC_DISABLE_SPEEDY
            : process.env.NODE_ENV !== 'production');
// Shared empty execution context when generating static styles
var STATIC_EXECUTION_CONTEXT = {};

var invalidHookCallRe = /invalid hook call/i;
var seen = new Set();
var checkDynamicCreation = function (displayName, componentId) {
    if (process.env.NODE_ENV !== 'production') {
        var parsedIdString = componentId ? " with the id of \"".concat(componentId, "\"") : '';
        var message_1 = "The component ".concat(displayName).concat(parsedIdString, " has been created dynamically.\n") +
            "You may see this warning because you've called styled inside another component.\n" +
            'To resolve this only create new StyledComponents outside of any render method and function component.';
        // If a hook is called outside of a component:
        // React 17 and earlier throw an error
        // React 18 and above use console.error
        var originalConsoleError_1 = console.error;
        try {
            var didNotCallInvalidHook_1 = true;
            console.error = function (consoleErrorMessage) {
                var consoleErrorArgs = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    consoleErrorArgs[_i - 1] = arguments[_i];
                }
                // The error here is expected, since we're expecting anything that uses `checkDynamicCreation` to
                // be called outside of a React component.
                if (invalidHookCallRe.test(consoleErrorMessage)) {
                    didNotCallInvalidHook_1 = false;
                    // This shouldn't happen, but resets `warningSeen` if we had this error happen intermittently
                    seen.delete(message_1);
                }
                else {
                    originalConsoleError_1.apply(void 0, tslib.__spreadArray([consoleErrorMessage], consoleErrorArgs, false));
                }
            };
            // We purposefully call `useRef` outside of a component and expect it to throw
            // If it doesn't, then we're inside another component.
            // eslint-disable-next-line react-hooks/rules-of-hooks
            React.useRef();
            if (didNotCallInvalidHook_1 && !seen.has(message_1)) {
                // eslint-disable-next-line no-console
                console.warn(message_1);
                seen.add(message_1);
            }
        }
        catch (error) {
            // The error here is expected, since we're expecting anything that uses `checkDynamicCreation` to
            // be called outside of a React component.
            if (invalidHookCallRe.test(error.message)) {
                // This shouldn't happen, but resets `warningSeen` if we had this error happen intermittently
                seen.delete(message_1);
            }
        }
        finally {
            console.error = originalConsoleError_1;
        }
    }
};

var LIMIT = 200;
var createWarnTooManyClasses = (function (displayName, componentId) {
    var generatedClasses = {};
    var warningSeen = false;
    return function (className) {
        if (!warningSeen) {
            generatedClasses[className] = true;
            if (Object.keys(generatedClasses).length >= LIMIT) {
                // Unable to find latestRule in test environment.
                /* eslint-disable no-console, prefer-template */
                var parsedIdString = componentId ? " with the id of \"".concat(componentId, "\"") : '';
                console.warn("Over ".concat(LIMIT, " classes were generated for component ").concat(displayName).concat(parsedIdString, ".\n") +
                    'Consider using the attrs method, together with a style object for frequently changed styles.\n' +
                    'Example:\n' +
                    '  const Component = styled.div.attrs(props => ({\n' +
                    '    style: {\n' +
                    '      background: props.background,\n' +
                    '    },\n' +
                    '  }))`width: 100%;`\n\n' +
                    '  <Component />');
                warningSeen = true;
                generatedClasses = {};
            }
        }
    };
});

var EMPTY_ARRAY = Object.freeze([]);
var EMPTY_OBJECT = Object.freeze({});

function determineTheme(props, providedTheme, defaultProps) {
    if (defaultProps === void 0) { defaultProps = EMPTY_OBJECT; }
    return (props.theme !== defaultProps.theme && props.theme) || providedTheme || defaultProps.theme;
}

// Thanks to ReactDOMFactories for this handy list!
var domElements = [
    'a',
    'abbr',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'base',
    'bdi',
    'bdo',
    'big',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'col',
    'colgroup',
    'data',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'keygen',
    'label',
    'legend',
    'li',
    'link',
    'main',
    'map',
    'mark',
    'menu',
    'menuitem',
    'meta',
    'meter',
    'nav',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'param',
    'picture',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'small',
    'source',
    'span',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'u',
    'ul',
    'use',
    'var',
    'video',
    'wbr',
    'circle',
    'clipPath',
    'defs',
    'ellipse',
    'foreignObject',
    'g',
    'image',
    'line',
    'linearGradient',
    'marker',
    'mask',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialGradient',
    'rect',
    'stop',
    'svg',
    'text',
    'tspan',
];

// Source: https://www.w3.org/TR/cssom-1/#serialize-an-identifier
// Control characters and non-letter first symbols are not supported
var escapeRegex = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g;
var dashesAtEnds = /(^-|-$)/g;
/**
 * TODO: Explore using CSS.escape when it becomes more available
 * in evergreen browsers.
 */
function escape(str) {
    return str // Replace all possible CSS selectors
        .replace(escapeRegex, '-') // Remove extraneous hyphens at the start and end
        .replace(dashesAtEnds, '');
}

var AD_REPLACER_R = /(a)(d)/gi;
/* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
 * counterparts */
var charsLength = 52;
/* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
var getAlphabeticChar = function (code) { return String.fromCharCode(code + (code > 25 ? 39 : 97)); };
/* input a number, usually a hash and convert it to base-52 */
function generateAlphabeticName(code) {
    var name = '';
    var x;
    /* get a char and divide by alphabet-length */
    for (x = Math.abs(code); x > charsLength; x = (x / charsLength) | 0) {
        name = getAlphabeticChar(x % charsLength) + name;
    }
    return (getAlphabeticChar(x % charsLength) + name).replace(AD_REPLACER_R, '$1-$2');
}

var SEED$1 = 5381;
// When we have separate strings it's useful to run a progressive
// version of djb2 where we pretend that we're still looping over
// the same string
var phash = function (h, x) {
    var i = x.length;
    while (i) {
        h = (h * 33) ^ x.charCodeAt(--i);
    }
    return h;
};
// This is a djb2 hashing function
var hash = function (x) {
    return phash(SEED$1, x);
};

function generateComponentId(str) {
    return generateAlphabeticName(hash(str) >>> 0);
}

function getComponentName(target) {
    return ((process.env.NODE_ENV !== 'production' ? typeof target === 'string' && target : false) ||
        target.displayName ||
        target.name ||
        'Component');
}

function isTag(target) {
    return (typeof target === 'string' &&
        (process.env.NODE_ENV !== 'production'
            ? target.charAt(0) === target.charAt(0).toLowerCase()
            : true));
}

function generateDisplayName(target) {
    return isTag(target) ? "styled.".concat(target) : "Styled(".concat(getComponentName(target), ")");
}

var _a;
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
// copied from react-is
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
/**
 * Adapted from hoist-non-react-statics to avoid the react-is dependency.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true,
};
var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true,
};
var FORWARD_REF_STATICS = {
    $$typeof: true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
};
var MEMO_STATICS = {
    $$typeof: true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true,
};
var TYPE_STATICS = (_a = {},
    _a[REACT_FORWARD_REF_TYPE] = FORWARD_REF_STATICS,
    _a[REACT_MEMO_TYPE] = MEMO_STATICS,
    _a);
// adapted from react-is
function isMemo(object) {
    var $$typeofType = 'type' in object && object.type.$$typeof;
    return $$typeofType === REACT_MEMO_TYPE;
}
function getStatics(component) {
    // React v16.11 and below
    if (isMemo(component)) {
        return MEMO_STATICS;
    }
    // React v16.12 and above
    return '$$typeof' in component
        ? TYPE_STATICS[component['$$typeof']]
        : REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, excludelist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components
        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, excludelist);
            }
        }
        var keys = getOwnPropertyNames(sourceComponent);
        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }
        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!(key in KNOWN_STATICS) &&
                !(excludelist && excludelist[key]) &&
                !(sourceStatics && key in sourceStatics) &&
                !(targetStatics && key in targetStatics)) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                }
                catch (e) {
                    /* ignore */
                }
            }
        }
    }
    return targetComponent;
}

function isStyledComponent(target) {
    return typeof target === 'object' && 'styledComponentId' in target;
}

/**
 * Convenience function for joining strings to form className chains
 */
function joinStrings() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.filter(Boolean).join(' ');
}

function isPlainObject(x) {
    return (x !== null &&
        typeof x === 'object' &&
        /* a check for empty prototype would be more typical, but that
           doesn't play well with objects created in different vm contexts */
        (!x.constructor || x.constructor.name === 'Object') &&
        (x.toString ? x.toString() : Object.prototype.toString.call(x)) === '[object Object]' &&
        /* check for reasonable markers that the object isn't an element for react & preact/compat */
        !('props' in x && (x.$$typeof || x.constructor === undefined)));
}

function mixinRecursively(target, source, forceMerge) {
    if (forceMerge === void 0) { forceMerge = false; }
    /* only merge into POJOs, Arrays, but for top level objects only
     * allow to merge into anything by passing forceMerge = true */
    if (!forceMerge && !isPlainObject(target) && !Array.isArray(target)) {
        return source;
    }
    if (Array.isArray(source)) {
        for (var key = 0; key < source.length; key++) {
            target[key] = mixinRecursively(target[key], source[key]);
        }
    }
    else if (isPlainObject(source)) {
        for (var key in source) {
            target[key] = mixinRecursively(target[key], source[key]);
        }
    }
    return target;
}
/**
 * Arrays & POJOs merged recursively, other objects and value types are overridden
 * If target is not a POJO or an Array, it will get source properties injected via shallow merge
 * Source objects applied left to right.  Mutates & returns target.  Similar to lodash merge.
 */
function mixinDeep(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
        var source = sources_1[_a];
        mixinRecursively(target, source, true);
    }
    return target;
}

var errorMap = {
    '1': 'Cannot create styled-component for component: %s.\n\n',
    '2': "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",
    '3': 'Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n',
    '4': 'The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n',
    '5': 'The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n',
    '6': "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",
    '7': 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',
    '8': 'ThemeProvider: Please make your "theme" prop an object.\n\n',
    '9': 'Missing document `<head>`\n\n',
    '10': 'Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n',
    '11': '_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n',
    '12': 'It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n',
    '13': '%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n',
    '14': 'ThemeProvider: "theme" prop is required.\n\n',
    '15': "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",
    '16': "Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",
    '17': "CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n",
};

var ERRORS = process.env.NODE_ENV !== 'production' ? errorMap : {};
/**
 * super basic version of sprintf
 */
function format() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var a = args[0];
    var b = [];
    for (var c = 1, len = args.length; c < len; c += 1) {
        b.push(args[c]);
    }
    b.forEach(function (d) {
        a = a.replace(/%[a-z]/, d);
    });
    return a;
}
/**
 * Create an error file out of errors.md for development and a simple web link to the full errors
 * in production mode.
 */
function throwStyledComponentsError(code) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    if (process.env.NODE_ENV === 'production') {
        return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(code, " for more information.").concat(interpolations.length > 0 ? " Args: ".concat(interpolations.join(', ')) : ''));
    }
    else {
        return new Error(format.apply(void 0, tslib.__spreadArray([ERRORS[code]], interpolations, false)).trim());
    }
}

/** Create a GroupedTag with an underlying Tag implementation */
var makeGroupedTag = function (tag) {
    return new DefaultGroupedTag(tag);
};
var BASE_SIZE = 1 << 9;
var DefaultGroupedTag = /** @class */ (function () {
    function DefaultGroupedTag(tag) {
        this.groupSizes = new Uint32Array(BASE_SIZE);
        this.length = BASE_SIZE;
        this.tag = tag;
    }
    DefaultGroupedTag.prototype.indexOfGroup = function (group) {
        var index = 0;
        for (var i = 0; i < group; i++) {
            index += this.groupSizes[i];
        }
        return index;
    };
    DefaultGroupedTag.prototype.insertRules = function (group, rules) {
        if (group >= this.groupSizes.length) {
            var oldBuffer = this.groupSizes;
            var oldSize = oldBuffer.length;
            var newSize = oldSize;
            while (group >= newSize) {
                newSize <<= 1;
                if (newSize < 0) {
                    throw throwStyledComponentsError(16, "".concat(group));
                }
            }
            this.groupSizes = new Uint32Array(newSize);
            this.groupSizes.set(oldBuffer);
            this.length = newSize;
            for (var i = oldSize; i < newSize; i++) {
                this.groupSizes[i] = 0;
            }
        }
        var ruleIndex = this.indexOfGroup(group + 1);
        if (Array.isArray(rules)) {
            for (var i = 0, l = rules.length; i < l; i++) {
                if (this.tag.insertRule(ruleIndex, rules[i])) {
                    this.groupSizes[group]++;
                    ruleIndex++;
                }
            }
        }
        else {
            if (this.tag.insertRule(ruleIndex, rules)) {
                this.groupSizes[group]++;
            }
        }
    };
    DefaultGroupedTag.prototype.clearGroup = function (group) {
        if (group < this.length) {
            var length_1 = this.groupSizes[group];
            var startIndex = this.indexOfGroup(group);
            var endIndex = startIndex + length_1;
            this.groupSizes[group] = 0;
            for (var i = startIndex; i < endIndex; i++) {
                this.tag.deleteRule(startIndex);
            }
        }
    };
    DefaultGroupedTag.prototype.getGroup = function (group) {
        var css = '';
        if (group >= this.length || this.groupSizes[group] === 0) {
            return css;
        }
        var length = this.groupSizes[group];
        var startIndex = this.indexOfGroup(group);
        var endIndex = startIndex + length;
        for (var i = startIndex; i < endIndex; i++) {
            css += "".concat(this.tag.getRule(i)).concat(SPLITTER);
        }
        return css;
    };
    return DefaultGroupedTag;
}());

var MAX_SMI = 1 << (31 - 1);
var groupIDRegister = new Map();
var reverseRegister = new Map();
var nextFreeGroup = 1;
var getGroupForId = function (id) {
    if (groupIDRegister.has(id)) {
        return groupIDRegister.get(id);
    }
    while (reverseRegister.has(nextFreeGroup)) {
        nextFreeGroup++;
    }
    var group = nextFreeGroup++;
    if (process.env.NODE_ENV !== 'production' && ((group | 0) < 0 || group > MAX_SMI)) {
        throw throwStyledComponentsError(16, "".concat(group));
    }
    groupIDRegister.set(id, group);
    reverseRegister.set(group, id);
    return group;
};
var getIdForGroup = function (group) {
    return reverseRegister.get(group);
};
var setGroupForId = function (id, group) {
    groupIDRegister.set(id, group);
    reverseRegister.set(group, id);
};

var SELECTOR = "style[".concat(SC_ATTR, "][").concat(SC_ATTR_VERSION, "=\"").concat(SC_VERSION, "\"]");
var MARKER_RE = new RegExp("^".concat(SC_ATTR, "\\.g(\\d+)\\[id=\"([\\w\\d-]+)\"\\].*?\"([^\"]*)"));
var outputSheet = function (sheet) {
    var tag = sheet.getTag();
    var length = tag.length;
    var css = '';
    var _loop_1 = function (group) {
        var id = getIdForGroup(group);
        if (id === undefined)
            return "continue";
        var names = sheet.names.get(id);
        var rules = tag.getGroup(group);
        if (names === undefined || rules.length === 0)
            return "continue";
        var selector = "".concat(SC_ATTR, ".g").concat(group, "[id=\"").concat(id, "\"]");
        var content = '';
        if (names !== undefined) {
            names.forEach(function (name) {
                if (name.length > 0) {
                    content += "".concat(name, ",");
                }
            });
        }
        // NOTE: It's easier to collect rules and have the marker
        // after the actual rules to simplify the rehydration
        css += "".concat(rules).concat(selector, "{content:\"").concat(content, "\"}").concat(SPLITTER);
    };
    for (var group = 0; group < length; group++) {
        _loop_1(group);
    }
    return css;
};
var rehydrateNamesFromContent = function (sheet, id, content) {
    var names = content.split(',');
    var name;
    for (var i = 0, l = names.length; i < l; i++) {
        // eslint-disable-next-line
        if ((name = names[i])) {
            sheet.registerName(id, name);
        }
    }
};
var rehydrateSheetFromTag = function (sheet, style) {
    var _a;
    var parts = ((_a = style.textContent) !== null && _a !== void 0 ? _a : '').split(SPLITTER);
    var rules = [];
    for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i].trim();
        if (!part)
            continue;
        var marker = part.match(MARKER_RE);
        if (marker) {
            var group = parseInt(marker[1], 10) | 0;
            var id = marker[2];
            if (group !== 0) {
                // Rehydrate componentId to group index mapping
                setGroupForId(id, group);
                // Rehydrate names and rules
                // looks like: data-styled.g11[id="idA"]{content:"nameA,"}
                rehydrateNamesFromContent(sheet, id, marker[3]);
                sheet.getTag().insertRules(group, rules);
            }
            rules.length = 0;
        }
        else {
            rules.push(part);
        }
    }
};
var rehydrateSheet = function (sheet) {
    var nodes = document.querySelectorAll(SELECTOR);
    for (var i = 0, l = nodes.length; i < l; i++) {
        var node = nodes[i];
        if (node && node.getAttribute(SC_ATTR) !== SC_ATTR_ACTIVE) {
            rehydrateSheetFromTag(sheet, node);
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
    }
};

function getNonce() {
    return typeof __webpack_nonce__ !== 'undefined' ? __webpack_nonce__ : null;
}

var ELEMENT_TYPE = 1;
/* Node.ELEMENT_TYPE */
/** Find last style element if any inside target */
var findLastStyleTag = function (target) {
    var childNodes = target.childNodes;
    for (var i = childNodes.length; i >= 0; i--) {
        var child = childNodes[i];
        if (child && child.nodeType === ELEMENT_TYPE && child.hasAttribute(SC_ATTR)) {
            return child;
        }
    }
    return undefined;
};
/** Create a style element inside `target` or <head> after the last */
var makeStyleTag = function (target) {
    var head = document.head;
    var parent = target || head;
    var style = document.createElement('style');
    var prevStyle = findLastStyleTag(parent);
    var nextSibling = prevStyle !== undefined ? prevStyle.nextSibling : null;
    style.setAttribute(SC_ATTR, SC_ATTR_ACTIVE);
    style.setAttribute(SC_ATTR_VERSION, SC_VERSION);
    var nonce = getNonce();
    if (nonce)
        style.setAttribute('nonce', nonce);
    parent.insertBefore(style, nextSibling);
    return style;
};
/** Get the CSSStyleSheet instance for a given style element */
var getSheet = function (tag) {
    if (tag.sheet) {
        return tag.sheet;
    }
    // Avoid Firefox quirk where the style element might not have a sheet property
    var styleSheets = document.styleSheets;
    for (var i = 0, l = styleSheets.length; i < l; i++) {
        var sheet = styleSheets[i];
        if (sheet.ownerNode === tag) {
            return sheet;
        }
    }
    throw throwStyledComponentsError(17);
};

/** Create a CSSStyleSheet-like tag depending on the environment */
var makeTag = function (_a) {
    var isServer = _a.isServer, useCSSOMInjection = _a.useCSSOMInjection, target = _a.target;
    if (isServer) {
        return new VirtualTag(target);
    }
    else if (useCSSOMInjection) {
        return new CSSOMTag(target);
    }
    else {
        return new TextTag(target);
    }
};
var CSSOMTag = /** @class */ (function () {
    function CSSOMTag(target) {
        var element = (this.element = makeStyleTag(target));
        // Avoid Edge bug where empty style elements don't create sheets
        element.appendChild(document.createTextNode(''));
        this.sheet = getSheet(element);
        this.length = 0;
    }
    CSSOMTag.prototype.insertRule = function (index, rule) {
        try {
            this.sheet.insertRule(rule, index);
            this.length++;
            return true;
        }
        catch (_error) {
            return false;
        }
    };
    CSSOMTag.prototype.deleteRule = function (index) {
        this.sheet.deleteRule(index);
        this.length--;
    };
    CSSOMTag.prototype.getRule = function (index) {
        var rule = this.sheet.cssRules[index];
        // Avoid IE11 quirk where cssText is inaccessible on some invalid rules
        if (rule !== undefined && typeof rule.cssText === 'string') {
            return rule.cssText;
        }
        else {
            return '';
        }
    };
    return CSSOMTag;
}());
/** A Tag that emulates the CSSStyleSheet API but uses text nodes */
var TextTag = /** @class */ (function () {
    function TextTag(target) {
        var element = (this.element = makeStyleTag(target));
        this.nodes = element.childNodes;
        this.length = 0;
    }
    TextTag.prototype.insertRule = function (index, rule) {
        if (index <= this.length && index >= 0) {
            var node = document.createTextNode(rule);
            var refNode = this.nodes[index];
            this.element.insertBefore(node, refNode || null);
            this.length++;
            return true;
        }
        else {
            return false;
        }
    };
    TextTag.prototype.deleteRule = function (index) {
        this.element.removeChild(this.nodes[index]);
        this.length--;
    };
    TextTag.prototype.getRule = function (index) {
        if (index < this.length) {
            return this.nodes[index].textContent;
        }
        else {
            return '';
        }
    };
    return TextTag;
}());
/** A completely virtual (server-side) Tag that doesn't manipulate the DOM */
var VirtualTag = /** @class */ (function () {
    function VirtualTag(_target) {
        this.rules = [];
        this.length = 0;
    }
    VirtualTag.prototype.insertRule = function (index, rule) {
        if (index <= this.length) {
            this.rules.splice(index, 0, rule);
            this.length++;
            return true;
        }
        else {
            return false;
        }
    };
    VirtualTag.prototype.deleteRule = function (index) {
        this.rules.splice(index, 1);
        this.length--;
    };
    VirtualTag.prototype.getRule = function (index) {
        if (index < this.length) {
            return this.rules[index];
        }
        else {
            return '';
        }
    };
    return VirtualTag;
}());

var SHOULD_REHYDRATE = IS_BROWSER;
var defaultOptions = {
    isServer: !IS_BROWSER,
    useCSSOMInjection: !DISABLE_SPEEDY,
};
/** Contains the main stylesheet logic for stringification and caching */
var StyleSheet = /** @class */ (function () {
    function StyleSheet(options, globalStyles, names) {
        if (options === void 0) { options = EMPTY_OBJECT; }
        if (globalStyles === void 0) { globalStyles = {}; }
        this.options = tslib.__assign(tslib.__assign({}, defaultOptions), options);
        this.gs = globalStyles;
        this.names = new Map(names);
        this.server = !!options.isServer;
        // We rehydrate only once and use the sheet that is created first
        if (!this.server && IS_BROWSER && SHOULD_REHYDRATE) {
            SHOULD_REHYDRATE = false;
            rehydrateSheet(this);
        }
    }
    /** Register a group ID to give it an index */
    StyleSheet.registerId = function (id) {
        return getGroupForId(id);
    };
    StyleSheet.prototype.reconstructWithOptions = function (options, withNames) {
        if (withNames === void 0) { withNames = true; }
        return new StyleSheet(tslib.__assign(tslib.__assign({}, this.options), options), this.gs, (withNames && this.names) || undefined);
    };
    StyleSheet.prototype.allocateGSInstance = function (id) {
        return (this.gs[id] = (this.gs[id] || 0) + 1);
    };
    /** Lazily initialises a GroupedTag for when it's actually needed */
    StyleSheet.prototype.getTag = function () {
        return this.tag || (this.tag = makeGroupedTag(makeTag(this.options)));
    };
    /** Check whether a name is known for caching */
    StyleSheet.prototype.hasNameForId = function (id, name) {
        return this.names.has(id) && this.names.get(id).has(name);
    };
    /** Mark a group's name as known for caching */
    StyleSheet.prototype.registerName = function (id, name) {
        getGroupForId(id);
        if (!this.names.has(id)) {
            var groupNames = new Set();
            groupNames.add(name);
            this.names.set(id, groupNames);
        }
        else {
            this.names.get(id).add(name);
        }
    };
    /** Insert new rules which also marks the name as known */
    StyleSheet.prototype.insertRules = function (id, name, rules) {
        this.registerName(id, name);
        this.getTag().insertRules(getGroupForId(id), rules);
    };
    /** Clears all cached names for a given group ID */
    StyleSheet.prototype.clearNames = function (id) {
        if (this.names.has(id)) {
            this.names.get(id).clear();
        }
    };
    /** Clears all rules for a given group ID */
    StyleSheet.prototype.clearRules = function (id) {
        this.getTag().clearGroup(getGroupForId(id));
        this.clearNames(id);
    };
    /** Clears the entire tag which deletes all rules but not its names */
    StyleSheet.prototype.clearTag = function () {
        // NOTE: This does not clear the names, since it's only used during SSR
        // so that we can continuously output only new rules
        this.tag = undefined;
    };
    /** Outputs the current sheet as a CSS string with markers for SSR */
    StyleSheet.prototype.toString = function () {
        return outputSheet(this);
    };
    return StyleSheet;
}());

var COMMENT_REGEX = /^\s*\/\/.*$/gm;
var COMPLEX_SELECTOR_PREFIX = [':', '[', '.', '#'];
/**
 * Serialize stylis output as an array of css strings. It is important that rules are
 * separated when using CSSOM injection.
 */
function serialize(children, callback) {
    return children.map(function (c, i) { return callback(c, i, children, callback); }).filter(Boolean);
}
function createStylisInstance(_a) {
    var _b = _a === void 0 ? EMPTY_OBJECT : _a, _c = _b.options, options = _c === void 0 ? EMPTY_OBJECT : _c, _d = _b.plugins, plugins = _d === void 0 ? EMPTY_ARRAY : _d;
    var _componentId;
    var _selector;
    var _selectorRegexp;
    var _consecutiveSelfRefRegExp;
    var selfReferenceReplacer = function (match, offset, string) {
        if (
        // do not replace the first occurrence if it is complex (has a modifier)
        (offset === 0 ? !COMPLEX_SELECTOR_PREFIX.includes(string[_selector.length]) : true) && // no consecutive self refs (.b.b); that is a precedence boost and treated differently
            !string.match(_consecutiveSelfRefRegExp)) {
            return ".".concat(_componentId);
        }
        return match;
    };
    /**
     * When writing a style like
     *
     * & + & {
     *   color: red;
     * }
     *
     * The second ampersand should be a reference to the static component class. stylis
     * has no knowledge of static class so we have to intelligently replace the base selector.
     *
     * https://github.com/thysultan/stylis.js/tree/v4.0.2#abstract-syntax-structure
     */
    var selfReferenceReplacementPlugin = function (element) {
        if (element.type === stylis.RULESET && element.value.includes('&')) {
            var props = element.props;
            props[0] = props[0].replace(_selectorRegexp, selfReferenceReplacer);
        }
    };
    var stringifyRules = function (css, selector, 
    /**
     * This "prefix" referes to a _selector_ prefix.
     */
    prefix, componentId) {
        if (selector === void 0) { selector = ''; }
        if (prefix === void 0) { prefix = ''; }
        if (componentId === void 0) { componentId = '&'; }
        var flatCSS = css.replace(COMMENT_REGEX, '');
        // stylis has no concept of state to be passed to plugins
        // but since JS is single-threaded, we can rely on that to ensure
        // these properties stay in sync with the current stylis run
        _componentId = componentId;
        _selector = selector;
        _selectorRegexp = new RegExp("\\".concat(_selector, "\\b"), 'g');
        _consecutiveSelfRefRegExp = new RegExp("(\\".concat(_selector, "\\b){2,}"));
        var middlewares = plugins.slice();
        /**
         * Enables automatic vendor-prefixing for styles.
         */
        if (options.prefix || options.prefix === undefined) {
            middlewares.unshift(stylis.prefixer);
        }
        middlewares.push(selfReferenceReplacementPlugin, stylis.stringify);
        return serialize(stylis.compile(options.namespace || prefix || selector
            ? "".concat(options.namespace ? options.namespace + ' ' : '').concat(prefix, " ").concat(selector, " { ").concat(flatCSS, " }")
            : flatCSS), stylis.middleware(middlewares));
    };
    stringifyRules.hash = plugins.length
        ? plugins
            .reduce(function (acc, plugin) {
            if (!plugin.name) {
                throwStyledComponentsError(15);
            }
            return phash(acc, plugin.name);
        }, SEED$1)
            .toString()
        : '';
    return stringifyRules;
}

var StyleSheetContext = React__default.default.createContext(undefined);
var StyleSheetConsumer = StyleSheetContext.Consumer;
var StylisContext = React__default.default.createContext(undefined);
StylisContext.Consumer;
var mainSheet = new StyleSheet();
var mainStylis = createStylisInstance();
function useStyleSheet() {
    return React.useContext(StyleSheetContext) || mainSheet;
}
function useStylis() {
    return React.useContext(StylisContext) || mainStylis;
}
function StyleSheetManager(props) {
    var _a = React.useState(props.stylisPlugins), plugins = _a[0], setPlugins = _a[1];
    var contextStyleSheet = useStyleSheet();
    var styleSheet = React.useMemo(function () {
        var sheet = contextStyleSheet;
        if (props.sheet) {
            // eslint-disable-next-line prefer-destructuring
            sheet = props.sheet;
        }
        else if (props.target) {
            sheet = sheet.reconstructWithOptions({ target: props.target }, false);
        }
        if (props.disableCSSOMInjection) {
            sheet = sheet.reconstructWithOptions({ useCSSOMInjection: false });
        }
        return sheet;
    }, [props.disableCSSOMInjection, props.sheet, props.target]);
    var stylis = React.useMemo(function () {
        return createStylisInstance({
            options: { namespace: props.namespace, prefix: !props.disableVendorPrefixes },
            plugins: plugins,
        });
    }, [props.disableVendorPrefixes, props.namespace, plugins]);
    React.useEffect(function () {
        if (!shallowequal__default.default(plugins, props.stylisPlugins))
            setPlugins(props.stylisPlugins);
    }, [props.stylisPlugins]);
    return (React__default.default.createElement(StyleSheetContext.Provider, { value: styleSheet },
        React__default.default.createElement(StylisContext.Provider, { value: stylis }, process.env.NODE_ENV !== 'production'
            ? React__default.default.Children.only(props.children)
            : props.children)));
}

var Keyframes = /** @class */ (function () {
    function Keyframes(name, rules) {
        var _this = this;
        this.inject = function (styleSheet, stylisInstance) {
            if (stylisInstance === void 0) { stylisInstance = mainStylis; }
            var resolvedName = _this.name + stylisInstance.hash;
            if (!styleSheet.hasNameForId(_this.id, resolvedName)) {
                styleSheet.insertRules(_this.id, resolvedName, stylisInstance(_this.rules, resolvedName, '@keyframes'));
            }
        };
        this.toString = function () {
            throw throwStyledComponentsError(12, String(_this.name));
        };
        this.name = name;
        this.id = "sc-keyframes-".concat(name);
        this.rules = rules;
    }
    Keyframes.prototype.getName = function (stylisInstance) {
        if (stylisInstance === void 0) { stylisInstance = mainStylis; }
        return this.name + stylisInstance.hash;
    };
    return Keyframes;
}());

// Taken from https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/react-dom/src/shared/dangerousStyleValue.js
function addUnitIfNeeded(name, value) {
    // https://github.com/amilajack/eslint-plugin-flowtype-errors/issues/133
    if (value == null || typeof value === 'boolean' || value === '') {
        return '';
    }
    if (typeof value === 'number' && value !== 0 && !(name in unitless__default.default)) {
        return "".concat(value, "px"); // Presumes implicit 'px' suffix for unitless numbers
    }
    return String(value).trim();
}

/**
 * inlined version of
 * https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/hyphenateStyleName.js
 */
var uppercaseCheck = /[A-Z]/;
var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var prefixAndLowerCase = function (char) { return "-".concat(char.toLowerCase()); };
/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 */
function hyphenateStyleName(string) {
    return uppercaseCheck.test(string) && !string.startsWith('--')
        ? string.replace(uppercasePattern, prefixAndLowerCase).replace(msPattern, '-ms-')
        : string;
}

function isFunction(test) {
    return typeof test === 'function';
}

function isStatelessFunction(test) {
    return typeof test === 'function' && !(test.prototype && test.prototype.isReactComponent);
}

/**
 * It's falsish not falsy because 0 is allowed.
 */
var isFalsish = function (chunk) {
    return chunk === undefined || chunk === null || chunk === false || chunk === '';
};
var objToCssArray = function (obj, prevKey) {
    var rules = [];
    for (var key in obj) {
        if (!obj.hasOwnProperty(key) || isFalsish(obj[key]))
            continue;
        if ((Array.isArray(obj[key]) && obj[key].isCss) || isFunction(obj[key])) {
            rules.push("".concat(hyphenateStyleName(key), ":"), obj[key], ';');
        }
        else if (isPlainObject(obj[key])) {
            rules.push.apply(rules, objToCssArray(obj[key], key));
        }
        else {
            rules.push("".concat(hyphenateStyleName(key), ": ").concat(addUnitIfNeeded(key, obj[key]), ";"));
        }
    }
    return prevKey ? tslib.__spreadArray(tslib.__spreadArray(["".concat(prevKey, " {")], rules, true), ['}'], false) : rules;
};
function flatten(chunk, executionContext, styleSheet, stylisInstance) {
    if (Array.isArray(chunk)) {
        var ruleSet = [];
        for (var i = 0, len = chunk.length, result = void 0; i < len; i += 1) {
            result = flatten(chunk[i], executionContext, styleSheet, stylisInstance);
            if (result.length === 0)
                continue;
            ruleSet.push.apply(ruleSet, result);
        }
        return ruleSet;
    }
    if (isFalsish(chunk)) {
        return [];
    }
    /* Handle other components */
    if (isStyledComponent(chunk)) {
        return [".".concat(chunk.styledComponentId)];
    }
    /* Either execute or defer the function */
    if (isFunction(chunk)) {
        if (isStatelessFunction(chunk) && executionContext) {
            var chunkFn = chunk;
            var result = chunkFn(executionContext);
            if (process.env.NODE_ENV !== 'production' &&
                typeof result === 'object' &&
                !Array.isArray(result) &&
                !(result instanceof Keyframes) &&
                !isPlainObject(result)) {
                // eslint-disable-next-line no-console
                console.error("".concat(getComponentName(chunkFn), " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details."));
            }
            return flatten(result, executionContext, styleSheet, stylisInstance);
        }
        else {
            return [chunk];
        }
    }
    if (chunk instanceof Keyframes) {
        if (styleSheet) {
            chunk.inject(styleSheet, stylisInstance);
            return [chunk.getName(stylisInstance)];
        }
        else {
            return [chunk];
        }
    }
    /* Handle objects */
    return isPlainObject(chunk) ? objToCssArray(chunk) : [chunk.toString()];
}

function isStaticRules(rules) {
    for (var i = 0; i < rules.length; i += 1) {
        var rule = rules[i];
        if (isFunction(rule) && !isStyledComponent(rule)) {
            // functions are allowed to be static if they're just being
            // used to get the classname of a nested styled component
            return false;
        }
    }
    return true;
}

var SEED = hash(SC_VERSION);
/**
 * ComponentStyle is all the CSS-specific stuff, not the React-specific stuff.
 */
var ComponentStyle = /** @class */ (function () {
    function ComponentStyle(rules, componentId, baseStyle) {
        this.names = [];
        this.rules = rules;
        this.staticRulesId = '';
        this.isStatic =
            process.env.NODE_ENV === 'production' &&
                (baseStyle === undefined || baseStyle.isStatic) &&
                isStaticRules(rules);
        this.componentId = componentId;
        // SC_VERSION gives us isolation between multiple runtimes on the page at once
        // this is improved further with use of the babel plugin "namespace" feature
        this.baseHash = phash(SEED, componentId);
        this.baseStyle = baseStyle;
        // NOTE: This registers the componentId, which ensures a consistent order
        // for this component's styles compared to others
        StyleSheet.registerId(componentId);
    }
    /*
     * Flattens a rule set into valid CSS
     * Hashes it, wraps the whole chunk in a .hash1234 {}
     * Returns the hash to be injected on render()
     * */
    ComponentStyle.prototype.generateAndInjectStyles = function (executionContext, styleSheet, stylis) {
        var componentId = this.componentId;
        this.names.length = 0;
        if (this.baseStyle) {
            this.names.push(this.baseStyle.generateAndInjectStyles(executionContext, styleSheet, stylis));
        }
        // force dynamic classnames if user-supplied stylis plugins are in use
        if (this.isStatic && !stylis.hash) {
            if (this.staticRulesId && styleSheet.hasNameForId(componentId, this.staticRulesId)) {
                this.names.push(this.staticRulesId);
            }
            else {
                var cssStatic = flatten(this.rules, executionContext, styleSheet, stylis).join('');
                var name_1 = generateAlphabeticName(phash(this.baseHash, cssStatic) >>> 0);
                if (!styleSheet.hasNameForId(componentId, name_1)) {
                    var cssStaticFormatted = stylis(cssStatic, ".".concat(name_1), undefined, componentId);
                    styleSheet.insertRules(componentId, name_1, cssStaticFormatted);
                }
                this.names.push(name_1);
                this.staticRulesId = name_1;
            }
        }
        else {
            var length_1 = this.rules.length;
            var dynamicHash = phash(this.baseHash, stylis.hash);
            var css = '';
            for (var i = 0; i < length_1; i++) {
                var partRule = this.rules[i];
                if (typeof partRule === 'string') {
                    css += partRule;
                    if (process.env.NODE_ENV !== 'production')
                        dynamicHash = phash(dynamicHash, partRule);
                }
                else if (partRule) {
                    var partChunk = flatten(partRule, executionContext, styleSheet, stylis);
                    var partString = Array.isArray(partChunk) ? partChunk.join('') : partChunk;
                    dynamicHash = phash(dynamicHash, partString);
                    css += partString;
                }
            }
            if (css) {
                var name_2 = generateAlphabeticName(dynamicHash >>> 0);
                if (!styleSheet.hasNameForId(componentId, name_2)) {
                    var cssFormatted = stylis(css, ".".concat(name_2), undefined, componentId);
                    styleSheet.insertRules(componentId, name_2, cssFormatted);
                }
                this.names.push(name_2);
            }
        }
        return this.names.join(' ');
    };
    return ComponentStyle;
}());

var ThemeContext = React__default.default.createContext(undefined);
var ThemeConsumer = ThemeContext.Consumer;
function mergeTheme(theme, outerTheme) {
    if (!theme) {
        throw throwStyledComponentsError(14);
    }
    if (isFunction(theme)) {
        var themeFn = theme;
        var mergedTheme = themeFn(outerTheme);
        if (process.env.NODE_ENV !== 'production' &&
            (mergedTheme === null || Array.isArray(mergedTheme) || typeof mergedTheme !== 'object')) {
            throw throwStyledComponentsError(7);
        }
        return mergedTheme;
    }
    if (Array.isArray(theme) || typeof theme !== 'object') {
        throw throwStyledComponentsError(8);
    }
    return outerTheme ? tslib.__assign(tslib.__assign({}, outerTheme), theme) : theme;
}
/**
 * Provide a theme to an entire react component tree via context
 */
function ThemeProvider(props) {
    var outerTheme = React.useContext(ThemeContext);
    var themeContext = React.useMemo(function () { return mergeTheme(props.theme, outerTheme); }, [props.theme, outerTheme]);
    if (!props.children) {
        return null;
    }
    return React__default.default.createElement(ThemeContext.Provider, { value: themeContext }, props.children);
}

var identifiers = {};
/* We depend on components having unique IDs */
function generateId(displayName, parentComponentId) {
    var name = typeof displayName !== 'string' ? 'sc' : escape(displayName);
    // Ensure that no displayName can lead to duplicate componentIds
    identifiers[name] = (identifiers[name] || 0) + 1;
    var componentId = "".concat(name, "-").concat(generateComponentId(
    // SC_VERSION gives us isolation between multiple runtimes on the page at once
    // this is improved further with use of the babel plugin "namespace" feature
    SC_VERSION + name + identifiers[name]));
    return parentComponentId ? "".concat(parentComponentId, "-").concat(componentId) : componentId;
}
function useInjectedStyle(componentStyle, isStatic, resolvedAttrs, warnTooManyClasses) {
    var styleSheet = useStyleSheet();
    var stylis = useStylis();
    var className = componentStyle.generateAndInjectStyles(isStatic ? EMPTY_OBJECT : resolvedAttrs, styleSheet, stylis);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (process.env.NODE_ENV !== 'production')
        React.useDebugValue(className);
    if (process.env.NODE_ENV !== 'production' && !isStatic && warnTooManyClasses) {
        warnTooManyClasses(className);
    }
    return className;
}
function useStyledComponentImpl(forwardedComponent, props, forwardedRef, isStatic) {
    var componentAttrs = forwardedComponent.attrs, componentStyle = forwardedComponent.componentStyle, defaultProps = forwardedComponent.defaultProps, foldedComponentIds = forwardedComponent.foldedComponentIds, shouldForwardProp = forwardedComponent.shouldForwardProp, styledComponentId = forwardedComponent.styledComponentId, target = forwardedComponent.target;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (process.env.NODE_ENV !== 'production')
        React.useDebugValue(styledComponentId);
    // NOTE: the non-hooks version only subscribes to this when !componentStyle.isStatic,
    // but that'd be against the rules-of-hooks. We could be naughty and do it anyway as it
    // should be an immutable value, but behave for now.
    var theme = determineTheme(props, React.useContext(ThemeContext), defaultProps) || EMPTY_OBJECT;
    var context = componentAttrs.reduce(function (p, attrDef) {
        var resolvedAttrDef = typeof attrDef === 'function' ? attrDef(p) : attrDef;
        /* eslint-disable guard-for-in */
        for (var key in resolvedAttrDef) {
            // @ts-expect-error bad types
            p[key] =
                key === 'className'
                    ? joinStrings(p[key], resolvedAttrDef[key])
                    : key === 'style'
                        ? tslib.__assign(tslib.__assign({}, p[key]), resolvedAttrDef[key]) : resolvedAttrDef[key];
        }
        /* eslint-enable guard-for-in */
        return p;
    }, tslib.__assign(tslib.__assign({}, props), { theme: theme }));
    var generatedClassName = useInjectedStyle(componentStyle, isStatic, context, process.env.NODE_ENV !== 'production' ? forwardedComponent.warnTooManyClasses : undefined);
    var refToForward = forwardedRef;
    var elementToBeCreated = context.as || target;
    var isTargetTag = isTag(elementToBeCreated);
    var propsForElement = {};
    // eslint-disable-next-line guard-for-in
    for (var key in context) {
        // @ts-expect-error for..in iterates strings instead of keyof
        if (context[key] === undefined) ;
        else if (key[0] === '$' || key === 'as' || key === 'theme') ;
        else if (key === 'forwardedAs') {
            propsForElement.as = context.forwardedAs;
        }
        else if (!shouldForwardProp || shouldForwardProp(key, elementToBeCreated)) {
            // @ts-expect-error for..in iterates strings instead of keyof
            propsForElement[key] = context[key];
        }
    }
    propsForElement[
    // handle custom elements which React doesn't properly alias
    isTargetTag &&
        domElements.indexOf(elementToBeCreated) === -1
        ? 'class'
        : 'className'] = foldedComponentIds
        .concat(styledComponentId, generatedClassName !== styledComponentId ? generatedClassName : '', context.className || '')
        .filter(Boolean)
        .join(' ');
    propsForElement.ref = refToForward;
    return React.createElement(elementToBeCreated, propsForElement);
}
function createStyledComponent(target, options, rules) {
    var isTargetStyledComp = isStyledComponent(target);
    var styledComponentTarget = target;
    var isCompositeComponent = !isTag(target);
    var _a = options.attrs, attrs = _a === void 0 ? EMPTY_ARRAY : _a, _b = options.componentId, componentId = _b === void 0 ? generateId(options.displayName, options.parentComponentId) : _b, _c = options.displayName, displayName = _c === void 0 ? generateDisplayName(target) : _c;
    var styledComponentId = options.displayName && options.componentId
        ? "".concat(escape(options.displayName), "-").concat(options.componentId)
        : options.componentId || componentId;
    // fold the underlying StyledComponent attrs up (implicit extend)
    var finalAttrs = isTargetStyledComp && styledComponentTarget.attrs
        ? styledComponentTarget.attrs
            .concat(attrs)
            .filter(Boolean)
        : attrs;
    var shouldForwardProp = options.shouldForwardProp;
    if (isTargetStyledComp && styledComponentTarget.shouldForwardProp) {
        var shouldForwardPropFn_1 = styledComponentTarget.shouldForwardProp;
        if (options.shouldForwardProp) {
            var passedShouldForwardPropFn_1 = options.shouldForwardProp;
            // compose nested shouldForwardProp calls
            shouldForwardProp = function (prop, elementToBeCreated) {
                return shouldForwardPropFn_1(prop, elementToBeCreated) &&
                    passedShouldForwardPropFn_1(prop, elementToBeCreated);
            };
        }
        else {
            shouldForwardProp = shouldForwardPropFn_1;
        }
    }
    var componentStyle = new ComponentStyle(rules, styledComponentId, isTargetStyledComp ? styledComponentTarget.componentStyle : undefined);
    // statically styled-components don't need to build an execution context object,
    // and shouldn't be increasing the number of class names
    var isStatic = componentStyle.isStatic && attrs.length === 0;
    function forwardRef(props, ref) {
        // eslint-disable-next-line
        return useStyledComponentImpl(WrappedStyledComponent, props, ref, isStatic);
    }
    forwardRef.displayName = displayName;
    /**
     * forwardRef creates a new interim component, which we'll take advantage of
     * instead of extending ParentComponent to create _another_ interim class
     */
    var WrappedStyledComponent = React__default.default.forwardRef(forwardRef);
    WrappedStyledComponent.attrs = finalAttrs;
    WrappedStyledComponent.componentStyle = componentStyle;
    WrappedStyledComponent.displayName = displayName;
    WrappedStyledComponent.shouldForwardProp = shouldForwardProp;
    // this static is used to preserve the cascade of static classes for component selector
    // purposes; this is especially important with usage of the css prop
    WrappedStyledComponent.foldedComponentIds = isTargetStyledComp
        ? styledComponentTarget.foldedComponentIds.concat(styledComponentTarget.styledComponentId)
        : EMPTY_ARRAY;
    WrappedStyledComponent.styledComponentId = styledComponentId;
    // fold the underlying StyledComponent target up since we folded the styles
    WrappedStyledComponent.target = isTargetStyledComp ? styledComponentTarget.target : target;
    Object.defineProperty(WrappedStyledComponent, 'defaultProps', {
        get: function () {
            return this._foldedDefaultProps;
        },
        set: function (obj) {
            this._foldedDefaultProps = isTargetStyledComp
                ? mixinDeep({}, styledComponentTarget.defaultProps, obj)
                : obj;
        },
    });
    if (process.env.NODE_ENV !== 'production') {
        checkDynamicCreation(displayName, styledComponentId);
        WrappedStyledComponent.warnTooManyClasses = createWarnTooManyClasses(displayName, styledComponentId);
    }
    WrappedStyledComponent.toString = function () { return ".".concat(WrappedStyledComponent.styledComponentId); };
    if (isCompositeComponent) {
        var compositeComponentTarget = target;
        hoistNonReactStatics(WrappedStyledComponent, compositeComponentTarget, {
            // all SC-specific things should not be hoisted
            attrs: true,
            componentStyle: true,
            displayName: true,
            foldedComponentIds: true,
            shouldForwardProp: true,
            styledComponentId: true,
            target: true,
        });
    }
    return WrappedStyledComponent;
}

function interleave(strings, interpolations) {
    var result = [strings[0]];
    for (var i = 0, len = interpolations.length; i < len; i += 1) {
        result.push(interpolations[i], strings[i + 1]);
    }
    return result;
}

/**
 * Used when flattening object styles to determine if we should
 * expand an array of styles.
 */
var addTag = function (arg) {
    return Object.assign(arg, { isCss: true });
};
function css(styles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    if (isFunction(styles) || isPlainObject(styles)) {
        var styleFunctionOrObject = styles;
        return addTag(flatten(interleave(EMPTY_ARRAY, tslib.__spreadArray([
            styleFunctionOrObject
        ], interpolations, true))));
    }
    var styleStringArray = styles;
    if (interpolations.length === 0 &&
        styleStringArray.length === 1 &&
        typeof styleStringArray[0] === 'string') {
        return flatten(styleStringArray);
    }
    return addTag(flatten(interleave(styleStringArray, interpolations)));
}

function constructWithOptions(componentConstructor, tag, options) {
    if (options === void 0) { options = EMPTY_OBJECT; }
    // We trust that the tag is a valid component as long as it isn't falsish
    // Typically the tag here is a string or function (i.e. class or pure function component)
    // However a component may also be an object if it uses another utility, e.g. React.memo
    // React will output an appropriate warning however if the `tag` isn't valid
    if (!tag) {
        throw throwStyledComponentsError(1, tag);
    }
    /* This is callable directly as a template function */
    var templateFunction = function (initialStyles) {
        var interpolations = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            interpolations[_i - 1] = arguments[_i];
        }
        return componentConstructor(tag, options, css.apply(void 0, tslib.__spreadArray([initialStyles], interpolations, false)));
    };
    /* Modify/inject new props at runtime */
    templateFunction.attrs = function (attrs) {
        return constructWithOptions(componentConstructor, tag, tslib.__assign(tslib.__assign({}, options), { attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean) }));
    };
    /**
     * If config methods are called, wrap up a new template function and merge options */
    templateFunction.withConfig = function (config) {
        return constructWithOptions(componentConstructor, tag, tslib.__assign(tslib.__assign({}, options), config));
    };
    return templateFunction;
}

var baseStyled = function (tag) {
    return constructWithOptions(createStyledComponent, tag);
};
var styled = baseStyled;
// Shorthands for all valid HTML Elements
domElements.forEach(function (domElement) {
    // @ts-expect-error someday they'll handle imperative assignment properly
    styled[domElement] = baseStyled(domElement);
});

var GlobalStyle = /** @class */ (function () {
    function GlobalStyle(rules, componentId) {
        this.rules = rules;
        this.componentId = componentId;
        this.isStatic = isStaticRules(rules);
        // pre-register the first instance to ensure global styles
        // load before component ones
        StyleSheet.registerId(this.componentId + 1);
    }
    GlobalStyle.prototype.createStyles = function (instance, executionContext, styleSheet, stylis) {
        var flatCSS = flatten(this.rules, executionContext, styleSheet, stylis);
        var css = stylis(flatCSS.join(''), '');
        var id = this.componentId + instance;
        // NOTE: We use the id as a name as well, since these rules never change
        styleSheet.insertRules(id, id, css);
    };
    GlobalStyle.prototype.removeStyles = function (instance, styleSheet) {
        styleSheet.clearRules(this.componentId + instance);
    };
    GlobalStyle.prototype.renderStyles = function (instance, executionContext, styleSheet, stylis) {
        if (instance > 2)
            StyleSheet.registerId(this.componentId + instance);
        // NOTE: Remove old styles, then inject the new ones
        this.removeStyles(instance, styleSheet);
        this.createStyles(instance, executionContext, styleSheet, stylis);
    };
    return GlobalStyle;
}());

function createGlobalStyle(strings) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    var rules = css.apply(void 0, tslib.__spreadArray([strings], interpolations, false));
    var styledComponentId = "sc-global-".concat(generateComponentId(JSON.stringify(rules)));
    var globalStyle = new GlobalStyle(rules, styledComponentId);
    if (process.env.NODE_ENV !== 'production') {
        checkDynamicCreation(styledComponentId);
    }
    var GlobalStyleComponent = function (props) {
        var styleSheet = useStyleSheet();
        var stylis = useStylis();
        var theme = React__default.default.useContext(ThemeContext);
        var instanceRef = React__default.default.useRef(styleSheet.allocateGSInstance(styledComponentId));
        var instance = instanceRef.current;
        if (process.env.NODE_ENV !== 'production' && React__default.default.Children.count(props.children)) {
            // eslint-disable-next-line no-console
            console.warn("The global style component ".concat(styledComponentId, " was given child JSX. createGlobalStyle does not render children."));
        }
        if (process.env.NODE_ENV !== 'production' &&
            rules.some(function (rule) { return typeof rule === 'string' && rule.indexOf('@import') !== -1; })) {
            // eslint-disable-next-line no-console
            console.warn("Please do not use @import CSS syntax in createGlobalStyle at this time, as the CSSOM APIs we use in production do not handle it well. Instead, we recommend using a library such as react-helmet to inject a typical <link> meta tag to the stylesheet, or simply embedding it manually in your index.html <head> section for a simpler app.");
        }
        if (styleSheet.server) {
            renderStyles(instance, props, styleSheet, theme, stylis);
        }
        {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            // @ts-expect-error still using React 17 types for the time being
            (React__default.default.useInsertionEffect || React__default.default.useLayoutEffect)(function () {
                if (!styleSheet.server) {
                    renderStyles(instance, props, styleSheet, theme, stylis);
                    return function () { return globalStyle.removeStyles(instance, styleSheet); };
                }
            }, [instance, props, styleSheet, theme, stylis]);
        }
        return null;
    };
    function renderStyles(instance, props, styleSheet, theme, stylis) {
        if (globalStyle.isStatic) {
            globalStyle.renderStyles(instance, STATIC_EXECUTION_CONTEXT, styleSheet, stylis);
        }
        else {
            var context = tslib.__assign(tslib.__assign({}, props), { theme: determineTheme(props, theme, GlobalStyleComponent.defaultProps) });
            globalStyle.renderStyles(instance, context, styleSheet, stylis);
        }
    }
    return React__default.default.memo(GlobalStyleComponent);
}

function keyframes(strings) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    /* Warning if you've used keyframes on React Native */
    if (process.env.NODE_ENV !== 'production' &&
        typeof navigator !== 'undefined' &&
        navigator.product === 'ReactNative') {
        // eslint-disable-next-line no-console
        console.warn('`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.');
    }
    var rules = css.apply(void 0, tslib.__spreadArray([strings], interpolations, false)).join('');
    var name = generateComponentId(rules);
    return new Keyframes(name, rules);
}

function withTheme(Component) {
    var WithTheme = React__default.default.forwardRef(function (props, ref) {
        var theme = React__default.default.useContext(ThemeContext);
        var themeProp = determineTheme(props, theme, Component.defaultProps);
        if (process.env.NODE_ENV !== 'production' && themeProp === undefined) {
            // eslint-disable-next-line no-console
            console.warn("[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps in component class \"".concat(getComponentName(Component), "\""));
        }
        return React__default.default.createElement(Component, tslib.__assign({}, props, { theme: themeProp, ref: ref }));
    });
    WithTheme.displayName = "WithTheme(".concat(getComponentName(Component), ")");
    return hoistNonReactStatics(WithTheme, Component);
}

var useTheme = function () { return React.useContext(ThemeContext); };

var ServerStyleSheet = /** @class */ (function () {
    function ServerStyleSheet() {
        var _this = this;
        this._emitSheetCSS = function () {
            var css = _this.instance.toString();
            var nonce = getNonce();
            var attrs = [
                nonce && "nonce=\"".concat(nonce, "\""),
                "".concat(SC_ATTR, "=\"true\""),
                "".concat(SC_ATTR_VERSION, "=\"").concat(SC_VERSION, "\""),
            ];
            var htmlAttr = attrs.filter(Boolean).join(' ');
            return "<style ".concat(htmlAttr, ">").concat(css, "</style>");
        };
        this.getStyleTags = function () {
            if (_this.sealed) {
                throw throwStyledComponentsError(2);
            }
            return _this._emitSheetCSS();
        };
        this.getStyleElement = function () {
            var _a;
            if (_this.sealed) {
                throw throwStyledComponentsError(2);
            }
            var props = (_a = {},
                _a[SC_ATTR] = '',
                _a[SC_ATTR_VERSION] = SC_VERSION,
                _a.dangerouslySetInnerHTML = {
                    __html: _this.instance.toString(),
                },
                _a);
            var nonce = getNonce();
            if (nonce) {
                props.nonce = nonce;
            }
            // v4 returned an array for this fn, so we'll do the same for v5 for backward compat
            return [React__default.default.createElement("style", tslib.__assign({}, props, { key: "sc-0-0" }))];
        };
        this.seal = function () {
            _this.sealed = true;
        };
        this.instance = new StyleSheet({ isServer: true });
        this.sealed = false;
    }
    ServerStyleSheet.prototype.collectStyles = function (children) {
        if (this.sealed) {
            throw throwStyledComponentsError(2);
        }
        return React__default.default.createElement(StyleSheetManager, { sheet: this.instance }, children);
    };
    // eslint-disable-next-line consistent-return
    // @ts-expect-error alternate return types are not possible due to code transformation
    ServerStyleSheet.prototype.interleaveWithNodeStream = function (input) {
        {
            throw throwStyledComponentsError(3);
        }
    };
    return ServerStyleSheet;
}());

/* eslint-disable */
var __PRIVATE__ = {
    StyleSheet: StyleSheet,
    mainSheet: mainSheet,
};

/* Import singletons */
/* Warning if you've imported this file on React Native */
if (process.env.NODE_ENV !== 'production' &&
    typeof navigator !== 'undefined' &&
    navigator.product === 'ReactNative') {
    // eslint-disable-next-line no-console
    console.warn("It looks like you've imported 'styled-components' on React Native.\n" +
        "Perhaps you're looking to import 'styled-components/native'?\n" +
        'Read more about this at https://www.styled-components.com/docs/basics#react-native');
}
/* Warning if there are several instances of styled-components */
if (process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    typeof window !== 'undefined') {
    window['__styled-components-init__'] || (window['__styled-components-init__'] = 0);
    if (window['__styled-components-init__'] === 1) {
        // eslint-disable-next-line no-console
        console.warn("It looks like there are several instances of 'styled-components' initialized in this application. " +
            'This may cause dynamic styles to not render properly, errors during the rehydration process, ' +
            'a missing theme prop, and makes your application bigger without good reason.\n\n' +
            'See https://s-c.sh/2BAXzed for more info.');
    }
    window['__styled-components-init__'] += 1;
}

exports.ServerStyleSheet = ServerStyleSheet;
exports.StyleSheetConsumer = StyleSheetConsumer;
exports.StyleSheetContext = StyleSheetContext;
exports.StyleSheetManager = StyleSheetManager;
exports.ThemeConsumer = ThemeConsumer;
exports.ThemeContext = ThemeContext;
exports.ThemeProvider = ThemeProvider;
exports.__PRIVATE__ = __PRIVATE__;
exports.createGlobalStyle = createGlobalStyle;
exports.css = css;
exports.default = styled;
exports.isStyledComponent = isStyledComponent;
exports.keyframes = keyframes;
exports.styled = styled;
exports.useTheme = useTheme;
exports.version = SC_VERSION;
exports.withTheme = withTheme;
//# sourceMappingURL=styled-components.browser.cjs.js.map
