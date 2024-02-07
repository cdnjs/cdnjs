export var ZOID = 'zoid';

export var __ZOID__ = '__' + ZOID + '__';

export var POST_MESSAGE = {
    INIT: ZOID + '_init',
    PROPS: ZOID + '_props',
    PROP_CALLBACK: ZOID + '_prop_callback',
    CLOSE: ZOID + '_close',
    CHECK_CLOSE: ZOID + '_check_close',
    REDIRECT: ZOID + '_redirect',
    RESIZE: ZOID + '_resize',
    DELEGATE: ZOID + '_delegate',
    ALLOW_DELEGATE: ZOID + '_allow_delegate',
    ERROR: ZOID + '_error',
    HIDE: ZOID + '_hide',
    SHOW: ZOID + '_show'
};

export var PROP_TYPES = {
    STRING: 'string',
    OBJECT: 'object',
    FUNCTION: 'function',
    BOOLEAN: 'boolean',
    NUMBER: 'number'
};

export var INITIAL_PROPS = {
    RAW: 'raw',
    UID: 'uid'
};

export var WINDOW_REFERENCES = {
    OPENER: 'opener',
    TOP: 'top',
    PARENT: 'parent',
    GLOBAL: 'global'
};

export var PROP_TYPES_LIST = Object.keys(PROP_TYPES).map(function (key) {
    return PROP_TYPES[key];
});

export var CONTEXT_TYPES = {
    IFRAME: 'iframe',
    POPUP: 'popup'
};

export var CLASS_NAMES = {
    ZOID: '' + ZOID,
    OUTLET: ZOID + '-outlet',
    COMPONENT_FRAME: ZOID + '-component-frame',
    PRERENDER_FRAME: ZOID + '-prerender-frame',
    VISIBLE: ZOID + '-visible',
    INVISIBLE: ZOID + '-invisible'
};

export var EVENTS = {
    CLOSE: ZOID + '-close'
};

export var ATTRIBUTES = {
    IFRAME_PLACEHOLDER: 'data-zoid-' + ZOID + '-placeholder'
};

export var ANIMATION_NAMES = {
    SHOW_CONTAINER: ZOID + '-show-container',
    SHOW_COMPONENT: ZOID + '-show-component',
    HIDE_CONTAINER: ZOID + '-hide-container',
    HIDE_COMPONENT: ZOID + '-hide-component'
};

export var EVENT_NAMES = {
    CLICK: 'click'
};

export var CLOSE_REASONS = {
    PARENT_CALL: 'parent_call',
    CHILD_CALL: 'child_call',
    CLOSE_DETECTED: 'close_detected',
    USER_CLOSED: 'user_closed',
    PARENT_CLOSE_DETECTED: 'parent_close_detected'
};

export var CONTEXT_TYPES_LIST = Object.keys(CONTEXT_TYPES).map(function (key) {
    return CONTEXT_TYPES[key];
});

export var DELEGATE = {
    CALL_ORIGINAL: 'call_original',
    CALL_DELEGATE: 'call_delegate'
};

export var WILDCARD = '*';

export var DEFAULT_DIMENSIONS = {
    WIDTH: 300,
    HEIGHT: 150
};