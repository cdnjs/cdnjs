var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { PROP_TYPES_LIST, CONTEXT_TYPES_LIST } from '../../constants';
import { isPerc, isPx } from '../../lib';

function validatePropDefinitions(options) {

    if (options.props && !(_typeof(options.props) === 'object')) {
        throw new Error('Expected options.props to be an object');
    }

    if (options.props) {
        for (var _i2 = 0, _Object$keys2 = Object.keys(options.props), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
            var key = _Object$keys2[_i2];

            // $FlowFixMe
            var prop = options.props[key];

            if (!prop || !((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object')) {
                throw new Error('Expected options.props.' + key + ' to be an object');
            }

            if (!prop.type) {
                throw new Error('Expected prop.type');
            }

            if (PROP_TYPES_LIST.indexOf(prop.type) === -1) {
                throw new Error('Expected prop.type to be one of ' + PROP_TYPES_LIST.join(', '));
            }

            if (prop.required && prop.def) {
                throw new Error('Required prop can not have a default value');
            }
        }
    }
}

// eslint-disable-next-line complexity
export function validate(options) {
    // eslint-ignore-line

    if (!options) {
        throw new Error('Expecred options to be passed');
    }

    if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) {
        throw new Error('Invalid options.tag: ' + options.tag);
    }

    validatePropDefinitions(options);

    if (options.dimensions) {
        if (options.dimensions && !isPx(options.dimensions.width) && !isPerc(options.dimensions.width)) {
            throw new Error('Expected options.dimensions.width to be a px or % string value');
        }

        if (options.dimensions && !isPx(options.dimensions.height) && !isPerc(options.dimensions.height)) {
            throw new Error('Expected options.dimensions.height to be a px or % string value');
        }
    }

    if (options.contexts) {

        if (options.contexts.popup && !__ZOID__.__POPUP_SUPPORT__) {
            throw new Error('Popups not supported in this build -- please use the full zoid.js build');
        }

        var anyEnabled = false;

        for (var _i4 = 0, _Object$keys4 = Object.keys(options.contexts), _length4 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i4 < _length4; _i4++) {
            var context = _Object$keys4[_i4];

            if (CONTEXT_TYPES_LIST.indexOf(context) === -1) {
                throw new Error('Unsupported context type: ' + context);
            }

            if (options.contexts && options.contexts[context] || options.contexts && options.contexts[context] === undefined) {
                anyEnabled = true;
            }
        }

        if (!anyEnabled) {
            throw new Error('No context type is enabled');
        }
    }

    if (options.defaultContext) {
        if (CONTEXT_TYPES_LIST.indexOf(options.defaultContext) === -1) {
            throw new Error('Unsupported context type: ' + (options.defaultContext || 'unknown'));
        }

        if (options.contexts && options.defaultContext && !options.contexts[options.defaultContext]) {
            throw new Error('Disallowed default context type: ' + (options.defaultContext || 'unknown'));
        }
    }

    if (options.url && options.buildUrl) {
        throw new Error('Can not pass both options.url and options.buildUrl');
    }

    if (options.defaultEnv) {
        if (typeof options.defaultEnv !== 'string') {
            throw new TypeError('Expected options.defaultEnv to be a string');
        }

        if (!options.buildUrl && _typeof(options.url) !== 'object') {
            throw new Error('Expected options.url to be an object mapping env->url');
        }

        if (options.url && _typeof(options.url) === 'object' && !options.url[options.defaultEnv]) {
            throw new Error('No url found for default env: ' + options.defaultEnv);
        }
    }

    if (options.url && _typeof(options.url) === 'object') {

        if (!options.defaultEnv) {
            throw new Error('Must pass options.defaultEnv with env->url mapping');
        }

        for (var _i6 = 0, _Object$keys6 = Object.keys(options.url), _length6 = _Object$keys6 == null ? 0 : _Object$keys6.length; _i6 < _length6; _i6++) {
            var env = _Object$keys6[_i6];
            if (!options.url[env]) {
                throw new Error('No url specified for env: ' + env);
            }
        }
    }

    if (options.prerenderTemplate && typeof options.prerenderTemplate !== 'function') {
        throw new Error('Expected options.prerenderTemplate to be a function');
    }

    if (options.containerTemplate && typeof options.containerTemplate !== 'function') {
        throw new Error('Expected options.containerTemplate to be a function');
    }
}