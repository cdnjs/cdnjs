export var CONSTANTS = {

    POST_MESSAGE_TYPE: {
        REQUEST: 'postrobot_message_request',
        RESPONSE: 'postrobot_message_response',
        ACK: 'postrobot_message_ack'
    },

    POST_MESSAGE_ACK: {
        SUCCESS: 'success',
        ERROR: 'error'
    },

    POST_MESSAGE_NAMES: {
        METHOD: 'postrobot_method',
        HELLO: 'postrobot_ready',
        OPEN_TUNNEL: 'postrobot_open_tunnel'
    },

    WINDOW_TYPES: {
        FULLPAGE: 'fullpage',
        POPUP: 'popup',
        IFRAME: 'iframe'
    },

    WINDOW_PROPS: {
        POSTROBOT: '__postRobot__'
    },

    SERIALIZATION_TYPES: {
        METHOD: 'postrobot_method',
        ERROR: 'postrobot_error',
        PROMISE: 'postrobot_promise',
        ZALGO_PROMISE: 'postrobot_zalgo_promise',
        REGEX: 'regex'
    },

    SEND_STRATEGIES: {
        POST_MESSAGE: 'postrobot_post_message',
        BRIDGE: 'postrobot_bridge',
        GLOBAL: 'postrobot_global'
    },

    MOCK_PROTOCOL: 'mock:',
    FILE_PROTOCOL: 'file:',

    BRIDGE_NAME_PREFIX: '__postrobot_bridge__',
    POSTROBOT_PROXY: '__postrobot_proxy__',

    WILDCARD: '*'
};

export var POST_MESSAGE_NAMES = {
    METHOD: 'postrobot_method',
    HELLO: 'postrobot_hello',
    OPEN_TUNNEL: 'postrobot_open_tunnel'
};

export var POST_MESSAGE_NAMES_LIST = Object.keys(POST_MESSAGE_NAMES).map(function (key) {
    return POST_MESSAGE_NAMES[key];
});