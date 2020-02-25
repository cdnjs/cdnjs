"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
var message_constants_1 = require("./message-constants");
/*
 * Specification of  fields within Meta Params used for message validation
 * (see `validateMeta`)
 *
 * META_PARAMS_SPEC[topic][action] => [required, optional]
 * The keys in `required` must be present in all instances of the message
 * The keys in `optional` may be present in some instances of the message
 */
exports.META_PARAMS_SPEC = (_a = {},
    _a[message_constants_1.TOPIC.PARSER] = (_b = {},
        _b[message_constants_1.PARSER_ACTIONS.UNKNOWN_TOPIC] = [[message_constants_1.META_KEYS.originalTopic], []],
        _b[message_constants_1.PARSER_ACTIONS.UNKNOWN_ACTION] = [[message_constants_1.META_KEYS.originalTopic, message_constants_1.META_KEYS.originalAction], []],
        _b[message_constants_1.PARSER_ACTIONS.INVALID_MESSAGE] = [[], []],
        _b[message_constants_1.PARSER_ACTIONS.INVALID_META_PARAMS] = [[message_constants_1.META_KEYS.originalTopic, message_constants_1.META_KEYS.originalAction], []],
        _b),
    _a[message_constants_1.TOPIC.CONNECTION] = (_c = {},
        _c[message_constants_1.CONNECTION_ACTIONS.PING] = [[], []],
        _c[message_constants_1.CONNECTION_ACTIONS.PONG] = [[], []],
        _c[message_constants_1.CONNECTION_ACTIONS.CHALLENGE] = [[message_constants_1.META_KEYS.url, message_constants_1.META_KEYS.protocolVersion], []],
        _c[message_constants_1.CONNECTION_ACTIONS.ACCEPT] = [[], []],
        _c[message_constants_1.CONNECTION_ACTIONS.REJECT] = [[], []],
        _c[message_constants_1.CONNECTION_ACTIONS.REDIRECT] = [[message_constants_1.META_KEYS.url], []],
        _c[message_constants_1.CONNECTION_ACTIONS.CLOSING] = [[], []],
        _c[message_constants_1.CONNECTION_ACTIONS.CLOSED] = [[], []],
        _c[message_constants_1.CONNECTION_ACTIONS.ERROR] = [[], []],
        _c[message_constants_1.CONNECTION_ACTIONS.AUTHENTICATION_TIMEOUT] = [[], []],
        _c[message_constants_1.CONNECTION_ACTIONS.INVALID_MESSAGE] = [[message_constants_1.META_KEYS.originalTopic, message_constants_1.META_KEYS.originalAction], []],
        _c),
    _a[message_constants_1.TOPIC.AUTH] = (_d = {},
        _d[message_constants_1.AUTH_ACTIONS.REQUEST] = [[], []],
        _d[message_constants_1.AUTH_ACTIONS.AUTH_SUCCESSFUL] = [[], []],
        _d[message_constants_1.AUTH_ACTIONS.AUTH_UNSUCCESSFUL] = [[], []],
        _d[message_constants_1.AUTH_ACTIONS.TOO_MANY_AUTH_ATTEMPTS] = [[], []],
        _d[message_constants_1.AUTH_ACTIONS.INVALID_MESSAGE] = [[message_constants_1.META_KEYS.originalTopic, message_constants_1.META_KEYS.originalAction], []],
        _d[message_constants_1.AUTH_ACTIONS.INVALID_MESSAGE_DATA] = [[message_constants_1.META_KEYS.originalAction], []],
        _d),
    _a[message_constants_1.TOPIC.RECORD] = (_e = {},
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIBE] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIBE_BULK] = [[message_constants_1.META_KEYS.names], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIBE_ACK] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE_ACK] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.MULTIPLE_SUBSCRIPTIONS] = [[message_constants_1.META_KEYS.name], [message_constants_1.META_KEYS.originalAction]],
        _e[message_constants_1.RECORD_ACTIONS.NOT_SUBSCRIBED] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.HEAD] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD_BULK] = [[message_constants_1.META_KEYS.names], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD_BULK_ACK] = [[message_constants_1.META_KEYS.correlationId], []],
        _e[message_constants_1.RECORD_ACTIONS.HEAD_RESPONSE] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.version], []],
        _e[message_constants_1.RECORD_ACTIONS.READ] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD_BULK] = [[message_constants_1.META_KEYS.names], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD_BULK_ACK] = [[message_constants_1.META_KEYS.correlationId], []],
        _e[message_constants_1.RECORD_ACTIONS.READ_RESPONSE] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.version], []],
        _e[message_constants_1.RECORD_ACTIONS.UPDATE] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.version], []],
        _e[message_constants_1.RECORD_ACTIONS.UPDATE_WITH_WRITE_ACK] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.version, message_constants_1.META_KEYS.correlationId], []],
        _e[message_constants_1.RECORD_ACTIONS.PATCH] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.version, message_constants_1.META_KEYS.path], []],
        _e[message_constants_1.RECORD_ACTIONS.PATCH_WITH_WRITE_ACK] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.version, message_constants_1.META_KEYS.path, message_constants_1.META_KEYS.correlationId], []],
        _e[message_constants_1.RECORD_ACTIONS.ERASE] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.version, message_constants_1.META_KEYS.path], []],
        _e[message_constants_1.RECORD_ACTIONS.ERASE_WITH_WRITE_ACK] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.version, message_constants_1.META_KEYS.path, message_constants_1.META_KEYS.correlationId], []],
        _e[message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.version], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDUPDATE] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.version], []],
        _e[message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE_WITH_WRITE_ACK] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.version, message_constants_1.META_KEYS.correlationId], []],
        _e[message_constants_1.RECORD_ACTIONS.CREATEANDPATCH] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.version, message_constants_1.META_KEYS.path], []],
        _e[message_constants_1.RECORD_ACTIONS.CREATEANDPATCH_WITH_WRITE_ACK] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.version, message_constants_1.META_KEYS.path, message_constants_1.META_KEYS.correlationId], []],
        _e[message_constants_1.RECORD_ACTIONS.DELETE] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.DELETE_SUCCESS] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.DELETED] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD_BULK] = [[message_constants_1.META_KEYS.names], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD_BULK_ACK] = [[message_constants_1.META_KEYS.correlationId], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIPTION_HAS_PROVIDER] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIPTION_HAS_NO_PROVIDER] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.WRITE_ACKNOWLEDGEMENT] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.correlationId], []],
        _e[message_constants_1.RECORD_ACTIONS.VERSION_EXISTS] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.version], [message_constants_1.META_KEYS.originalAction]],
        _e[message_constants_1.RECORD_ACTIONS.CACHE_RETRIEVAL_TIMEOUT] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.STORAGE_RETRIEVAL_TIMEOUT] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.RECORD_LOAD_ERROR] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.RECORD_CREATE_ERROR] = [[message_constants_1.META_KEYS.name], [message_constants_1.META_KEYS.correlationId, message_constants_1.META_KEYS.originalAction]],
        _e[message_constants_1.RECORD_ACTIONS.RECORD_UPDATE_ERROR] = [[message_constants_1.META_KEYS.name], [message_constants_1.META_KEYS.correlationId, message_constants_1.META_KEYS.originalAction]],
        _e[message_constants_1.RECORD_ACTIONS.RECORD_DELETE_ERROR] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.RECORD_NOT_FOUND] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.originalAction], []],
        _e[message_constants_1.RECORD_ACTIONS.INVALID_VERSION] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.originalAction], [message_constants_1.META_KEYS.correlationId]],
        _e[message_constants_1.RECORD_ACTIONS.INVALID_PATCH_ON_HOTPATH] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.originalAction], [message_constants_1.META_KEYS.correlationId]],
        _e[message_constants_1.RECORD_ACTIONS.LISTEN] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.LISTEN_ACK] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.UNLISTEN] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.UNLISTEN_ACK] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.subscription], []],
        _e[message_constants_1.RECORD_ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.subscription], []],
        _e[message_constants_1.RECORD_ACTIONS.LISTEN_ACCEPT] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.subscription], []],
        _e[message_constants_1.RECORD_ACTIONS.LISTEN_REJECT] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.subscription], []],
        _e[message_constants_1.RECORD_ACTIONS.INVALID_LISTEN_REGEX] = [[message_constants_1.META_KEYS.name], []],
        _e[message_constants_1.RECORD_ACTIONS.MESSAGE_PERMISSION_ERROR] = [[message_constants_1.META_KEYS.originalAction, message_constants_1.META_KEYS.name], [message_constants_1.META_KEYS.correlationId]],
        _e[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED] = [[message_constants_1.META_KEYS.originalAction, message_constants_1.META_KEYS.name], [message_constants_1.META_KEYS.correlationId]],
        _e[message_constants_1.RECORD_ACTIONS.INVALID_MESSAGE_DATA] = [[message_constants_1.META_KEYS.originalAction, message_constants_1.META_KEYS.name], [message_constants_1.META_KEYS.correlationId]],
        _e),
    _a[message_constants_1.TOPIC.RPC] = (_f = {},
        _f[message_constants_1.RPC_ACTIONS.REQUEST_ERROR] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.correlationId], [message_constants_1.META_KEYS.reason]],
        _f[message_constants_1.RPC_ACTIONS.REQUEST] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.correlationId], [message_constants_1.META_KEYS.requestorName, message_constants_1.META_KEYS.requestorData, message_constants_1.META_KEYS.trustedSender]],
        _f[message_constants_1.RPC_ACTIONS.ACCEPT] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.correlationId], []],
        _f[message_constants_1.RPC_ACTIONS.REJECT] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.correlationId], []],
        _f[message_constants_1.RPC_ACTIONS.RESPONSE] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.correlationId], []],
        _f[message_constants_1.RPC_ACTIONS.PROVIDE] = [[message_constants_1.META_KEYS.name], []],
        _f[message_constants_1.RPC_ACTIONS.PROVIDE_ACK] = [[message_constants_1.META_KEYS.name], []],
        _f[message_constants_1.RPC_ACTIONS.UNPROVIDE] = [[message_constants_1.META_KEYS.name], []],
        _f[message_constants_1.RPC_ACTIONS.UNPROVIDE_ACK] = [[message_constants_1.META_KEYS.name], []],
        _f[message_constants_1.RPC_ACTIONS.MULTIPLE_PROVIDERS] = [[message_constants_1.META_KEYS.correlationId], []],
        _f[message_constants_1.RPC_ACTIONS.NOT_PROVIDED] = [[message_constants_1.META_KEYS.correlationId], []],
        _f[message_constants_1.RPC_ACTIONS.MULTIPLE_RESPONSE] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.correlationId], []],
        _f[message_constants_1.RPC_ACTIONS.RESPONSE_TIMEOUT] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.correlationId], []],
        _f[message_constants_1.RPC_ACTIONS.INVALID_RPC_CORRELATION_ID] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.correlationId, message_constants_1.META_KEYS.originalAction], []],
        _f[message_constants_1.RPC_ACTIONS.MULTIPLE_ACCEPT] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.correlationId], []],
        _f[message_constants_1.RPC_ACTIONS.ACCEPT_TIMEOUT] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.correlationId], []],
        _f[message_constants_1.RPC_ACTIONS.NO_RPC_PROVIDER] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.correlationId], []],
        _f[message_constants_1.RPC_ACTIONS.MESSAGE_PERMISSION_ERROR] = [[message_constants_1.META_KEYS.originalAction], [message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.correlationId]],
        _f[message_constants_1.RPC_ACTIONS.MESSAGE_DENIED] = [[message_constants_1.META_KEYS.originalAction], [message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.correlationId]],
        _f[message_constants_1.RPC_ACTIONS.INVALID_MESSAGE_DATA] = [[message_constants_1.META_KEYS.originalAction], [message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.correlationId]],
        _f),
    _a[message_constants_1.TOPIC.EVENT] = (_g = {},
        _g[message_constants_1.EVENT_ACTIONS.EMIT] = [[message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.SUBSCRIBE] = [[message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.SUBSCRIBE_ACK] = [[message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.SUBSCRIBE_BULK] = [[message_constants_1.META_KEYS.names, message_constants_1.META_KEYS.correlationId], []],
        _g[message_constants_1.EVENT_ACTIONS.SUBSCRIBE_BULK_ACK] = [[message_constants_1.META_KEYS.correlationId], []],
        _g[message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE] = [[message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE_ACK] = [[message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE_BULK] = [[message_constants_1.META_KEYS.names, message_constants_1.META_KEYS.correlationId], []],
        _g[message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE_BULK_ACK] = [[message_constants_1.META_KEYS.correlationId], []],
        _g[message_constants_1.EVENT_ACTIONS.MULTIPLE_SUBSCRIPTIONS] = [[message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.NOT_SUBSCRIBED] = [[message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.MESSAGE_PERMISSION_ERROR] = [[message_constants_1.META_KEYS.originalAction, message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.MESSAGE_DENIED] = [[message_constants_1.META_KEYS.originalAction, message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.LISTEN] = [[message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.LISTEN_ACK] = [[message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.UNLISTEN] = [[message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.UNLISTEN_ACK] = [[message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.subscription], []],
        _g[message_constants_1.EVENT_ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.subscription], []],
        _g[message_constants_1.EVENT_ACTIONS.LISTEN_ACCEPT] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.subscription], []],
        _g[message_constants_1.EVENT_ACTIONS.LISTEN_REJECT] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.subscription], []],
        _g[message_constants_1.EVENT_ACTIONS.INVALID_LISTEN_REGEX] = [[message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.MESSAGE_PERMISSION_ERROR] = [[message_constants_1.META_KEYS.originalAction, message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.MESSAGE_DENIED] = [[message_constants_1.META_KEYS.originalAction, message_constants_1.META_KEYS.name], []],
        _g[message_constants_1.EVENT_ACTIONS.INVALID_MESSAGE_DATA] = [[message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.originalAction], []],
        _g),
    _a[message_constants_1.TOPIC.PRESENCE] = (_h = {},
        _h[message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE_BULK] = [[message_constants_1.META_KEYS.names, message_constants_1.META_KEYS.correlationId], []],
        _h[message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE_BULK_ACK] = [[message_constants_1.META_KEYS.correlationId], []],
        _h[message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE_ALL] = [[], []],
        _h[message_constants_1.PRESENCE_ACTIONS.SUBSCRIBE_ALL_ACK] = [[], []],
        _h[message_constants_1.PRESENCE_ACTIONS.UNSUBSCRIBE_BULK] = [[message_constants_1.META_KEYS.names, message_constants_1.META_KEYS.correlationId], []],
        _h[message_constants_1.PRESENCE_ACTIONS.UNSUBSCRIBE_BULK_ACK] = [[message_constants_1.META_KEYS.correlationId], []],
        _h[message_constants_1.PRESENCE_ACTIONS.UNSUBSCRIBE_ALL] = [[message_constants_1.META_KEYS.correlationId], []],
        _h[message_constants_1.PRESENCE_ACTIONS.UNSUBSCRIBE_ALL_ACK] = [[message_constants_1.META_KEYS.correlationId], []],
        _h[message_constants_1.PRESENCE_ACTIONS.NOT_SUBSCRIBED] = [[], [message_constants_1.META_KEYS.correlationId]],
        _h[message_constants_1.PRESENCE_ACTIONS.MULTIPLE_SUBSCRIPTIONS] = [[], [message_constants_1.META_KEYS.correlationId, message_constants_1.META_KEYS.name, message_constants_1.META_KEYS.originalAction]],
        _h[message_constants_1.PRESENCE_ACTIONS.QUERY] = [[message_constants_1.META_KEYS.correlationId, message_constants_1.META_KEYS.names], []],
        _h[message_constants_1.PRESENCE_ACTIONS.QUERY_RESPONSE] = [[message_constants_1.META_KEYS.correlationId], []],
        _h[message_constants_1.PRESENCE_ACTIONS.QUERY_ALL] = [[], []],
        _h[message_constants_1.PRESENCE_ACTIONS.QUERY_ALL_RESPONSE] = [[message_constants_1.META_KEYS.names], []],
        _h[message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN] = [[message_constants_1.META_KEYS.name], []],
        _h[message_constants_1.PRESENCE_ACTIONS.PRESENCE_LEAVE] = [[message_constants_1.META_KEYS.name], []],
        _h[message_constants_1.PRESENCE_ACTIONS.PRESENCE_JOIN_ALL] = [[message_constants_1.META_KEYS.name], []],
        _h[message_constants_1.PRESENCE_ACTIONS.PRESENCE_LEAVE_ALL] = [[message_constants_1.META_KEYS.name], []],
        _h[message_constants_1.PRESENCE_ACTIONS.INVALID_PRESENCE_USERS] = [[], []],
        _h[message_constants_1.PRESENCE_ACTIONS.MESSAGE_PERMISSION_ERROR] = [[message_constants_1.META_KEYS.originalAction, message_constants_1.META_KEYS.name], [message_constants_1.META_KEYS.correlationId]],
        _h[message_constants_1.PRESENCE_ACTIONS.MESSAGE_DENIED] = [[message_constants_1.META_KEYS.originalAction], [message_constants_1.META_KEYS.correlationId, message_constants_1.META_KEYS.name]],
        _h),
    _a[message_constants_1.TOPIC.CLUSTER] = (_j = {},
        _j[message_constants_1.CLUSTER_ACTIONS.CLOSE] = [[], []],
        _j[message_constants_1.CLUSTER_ACTIONS.IDENTIFICATION_REQUEST] = [[], []],
        _j[message_constants_1.CLUSTER_ACTIONS.IDENTIFICATION_RESPONSE] = [[], []],
        _j[message_constants_1.CLUSTER_ACTIONS.KNOWN_PEERS] = [[], []],
        _j[message_constants_1.CLUSTER_ACTIONS.PING] = [[], []],
        _j[message_constants_1.CLUSTER_ACTIONS.PONG] = [[], []],
        _j[message_constants_1.CLUSTER_ACTIONS.REJECT] = [[], []],
        _j[message_constants_1.CLUSTER_ACTIONS.REJECT_DUPLICATE] = [[], []],
        _j),
    _a[message_constants_1.TOPIC.STATE_REGISTRY] = (_k = {},
        _k[message_constants_1.STATE_ACTIONS.ERROR] = [[message_constants_1.META_KEYS.registryTopic], []],
        _k[message_constants_1.STATE_ACTIONS.ADD] = [[message_constants_1.META_KEYS.registryTopic], []],
        _k[message_constants_1.STATE_ACTIONS.REMOVE] = [[message_constants_1.META_KEYS.registryTopic], []],
        _k[message_constants_1.STATE_ACTIONS.REQUEST_FULL_STATE] = [[message_constants_1.META_KEYS.registryTopic], []],
        _k[message_constants_1.STATE_ACTIONS.FULL_STATE] = [[message_constants_1.META_KEYS.registryTopic], []],
        _k),
    _a[message_constants_1.TOPIC.LOCK] = {},
    _a);
var payloadMap = (_l = {},
    _l[message_constants_1.TOPIC.PARSER] = [
        message_constants_1.PARSER_ACTIONS.MESSAGE_PARSE_ERROR,
        message_constants_1.PARSER_ACTIONS.INVALID_META_PARAMS,
    ],
    _l[message_constants_1.TOPIC.AUTH] = [
        message_constants_1.AUTH_ACTIONS.REQUEST,
        message_constants_1.AUTH_ACTIONS.AUTH_SUCCESSFUL,
        message_constants_1.AUTH_ACTIONS.AUTH_UNSUCCESSFUL,
    ],
    _l[message_constants_1.TOPIC.RECORD] = [
        message_constants_1.RECORD_ACTIONS.READ_RESPONSE,
        message_constants_1.RECORD_ACTIONS.UPDATE,
        message_constants_1.RECORD_ACTIONS.UPDATE_WITH_WRITE_ACK,
        message_constants_1.RECORD_ACTIONS.PATCH,
        message_constants_1.RECORD_ACTIONS.PATCH_WITH_WRITE_ACK,
        message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE,
        message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE_WITH_WRITE_ACK,
        message_constants_1.RECORD_ACTIONS.CREATEANDPATCH,
        message_constants_1.RECORD_ACTIONS.CREATEANDPATCH_WITH_WRITE_ACK,
        message_constants_1.RECORD_ACTIONS.VERSION_EXISTS,
    ],
    _l[message_constants_1.TOPIC.RPC] = [
        message_constants_1.RPC_ACTIONS.REQUEST,
        message_constants_1.RPC_ACTIONS.RESPONSE,
        message_constants_1.RPC_ACTIONS.REQUEST_ERROR
    ],
    _l[message_constants_1.TOPIC.EVENT] = [
        message_constants_1.EVENT_ACTIONS.EMIT,
    ],
    _l[message_constants_1.TOPIC.PRESENCE] = [
        message_constants_1.PRESENCE_ACTIONS.QUERY_RESPONSE,
    ],
    _l[message_constants_1.TOPIC.CLUSTER] = [
        message_constants_1.CLUSTER_ACTIONS.IDENTIFICATION_REQUEST,
        message_constants_1.CLUSTER_ACTIONS.IDENTIFICATION_RESPONSE,
        message_constants_1.CLUSTER_ACTIONS.KNOWN_PEERS
    ],
    _l[message_constants_1.TOPIC.STATE_REGISTRY] = [
        message_constants_1.STATE_ACTIONS.FULL_STATE
    ],
    _l[message_constants_1.TOPIC.LOCK] = [],
    _l);
function mapOfArraysHas(map, topic, action) {
    var actions = map[topic];
    if (!actions) {
        return false;
    }
    return actions.indexOf(action) !== -1;
}
exports.hasPayload = function (topic, action) {
    return mapOfArraysHas(payloadMap, topic, action);
};
function validateUnkownMeta(topic, action, meta) {
    var spec = exports.META_PARAMS_SPEC[topic][action];
    if (!spec) {
        return 'no meta spec';
    }
    var _a = __read(spec, 2), required = _a[0], optional = _a[1];
    for (var key in meta) {
        if (meta[key] !== undefined
            && required.indexOf(key) === -1
            && optional.indexOf(key) === -1) {
            return "meta object has unknown key " + key;
        }
    }
    return;
}
exports.validateUnkownMeta = validateUnkownMeta;
function validateMeta(topic, action, meta) {
    var e_1, _a;
    var spec = exports.META_PARAMS_SPEC[topic][action];
    if (!spec) {
        return 'no meta spec';
    }
    var _b = __read(spec, 1), required = _b[0];
    try {
        for (var required_1 = __values(required), required_1_1 = required_1.next(); !required_1_1.done; required_1_1 = required_1.next()) {
            var req = required_1_1.value;
            if (meta[req] === undefined) {
                return "meta object does not have required key " + req;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (required_1_1 && !required_1_1.done && (_a = required_1.return)) _a.call(required_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return;
}
exports.validateMeta = validateMeta;
function hasCorrelationId(topic, action) {
    var spec = exports.META_PARAMS_SPEC[topic][action];
    if (!spec) {
        return;
    }
    var _a = __read(spec, 2), required = _a[0], optional = _a[1];
    return (required.indexOf(message_constants_1.META_KEYS.correlationId) !== -1) || (optional.indexOf(message_constants_1.META_KEYS.correlationId) !== -1);
}
exports.hasCorrelationId = hasCorrelationId;
