"use strict";

exports.__esModule = true;
exports.listenForMessages = listenForMessages;
exports.messageListener = messageListener;
exports.receiveMessage = receiveMessage;
exports.setupGlobalReceiveMessage = setupGlobalReceiveMessage;
exports.stopListenForMessages = stopListenForMessages;

var _src = require("zalgo-promise/src");

var _src2 = require("cross-domain-utils/src");

var _src3 = require("belter/src");

var _conf = require("../../conf");

var _lib = require("../../lib");

var _serialize = require("../../serialize");

var _global = require("../../global");

var _types = require("./types");

function deserializeMessages(message, source, origin, {
  on,
  send
}) {
  let parsedMessage;

  try {
    parsedMessage = (0, _serialize.deserializeMessage)(source, origin, message, {
      on,
      send
    });
  } catch (err) {
    return;
  }

  if (!parsedMessage) {
    return;
  }

  if (typeof parsedMessage !== 'object' || parsedMessage === null) {
    return;
  }

  const parseMessages = parsedMessage[(0, _global.getGlobalKey)()];

  if (!Array.isArray(parseMessages)) {
    return;
  }

  return parseMessages;
}

function receiveMessage(event, {
  on,
  send
}) {
  const receivedMessages = (0, _global.globalStore)('receivedMessages');

  try {
    if (!window || window.closed || !event.source) {
      return;
    }
  } catch (err) {
    return;
  }

  let {
    source,
    origin,
    data
  } = event;

  if (__TEST__) {
    if ((0, _src2.isWindowClosed)(source)) {
      return;
    } // $FlowFixMe


    origin = (0, _src2.getDomain)(source);
  }

  const messages = deserializeMessages(data, source, origin, {
    on,
    send
  });

  if (!messages) {
    return;
  }

  (0, _lib.markWindowKnown)(source);

  for (const message of messages) {
    if (receivedMessages.has(message.id)) {
      return;
    }

    receivedMessages.set(message.id, true);

    if ((0, _src2.isWindowClosed)(source) && !message.fireAndForget) {
      return;
    }

    if (message.origin.indexOf(_src2.PROTOCOL.FILE) === 0) {
      origin = `${_src2.PROTOCOL.FILE}//`;
    }

    try {
      if (message.type === _conf.MESSAGE_TYPE.REQUEST) {
        (0, _types.handleRequest)(source, origin, message, {
          on,
          send
        });
      } else if (message.type === _conf.MESSAGE_TYPE.RESPONSE) {
        (0, _types.handleResponse)(source, origin, message);
      } else if (message.type === _conf.MESSAGE_TYPE.ACK) {
        (0, _types.handleAck)(source, origin, message);
      }
    } catch (err) {
      setTimeout(() => {
        throw err;
      }, 0);
    }
  }
}

function setupGlobalReceiveMessage({
  on,
  send
}) {
  const global = (0, _global.getGlobal)();

  global.receiveMessage = global.receiveMessage || (message => receiveMessage(message, {
    on,
    send
  }));
}

function messageListener(event, {
  on,
  send
}) {
  _src.ZalgoPromise.try(() => {
    try {
      (0, _src3.noop)(event.source);
    } catch (err) {
      return;
    }

    const source = event.source || event.sourceElement;
    let origin = event.origin || event.originalEvent && event.originalEvent.origin;
    const data = event.data;

    if (origin === 'null') {
      origin = `${_src2.PROTOCOL.FILE}//`;
    }

    if (!source) {
      return;
    }

    if (!origin) {
      throw new Error(`Post message did not have origin domain`);
    }

    if (__TEST__) {
      if ((0, _lib.needsGlobalMessagingForBrowser)() && (0, _src2.isSameTopWindow)(source, window) === false) {
        return;
      }
    }

    receiveMessage({
      source,
      origin,
      data
    }, {
      on,
      send
    });
  });
}

function listenForMessages({
  on,
  send
}) {
  return (0, _global.globalStore)().getOrSet('postMessageListener', () => {
    return (0, _src3.addEventListener)(window, 'message', event => {
      // $FlowFixMe
      messageListener(event, {
        on,
        send
      });
    });
  });
}

function stopListenForMessages() {
  const listener = (0, _global.globalStore)().get('postMessageListener');

  if (listener) {
    listener.cancel();
  }
}