"use strict";

exports.__esModule = true;
exports.sendMessage = sendMessage;

var _src = require("zalgo-promise/src");

var _src2 = require("cross-domain-utils/src");

var _src3 = require("belter/src");

var _serialize = require("../../serialize");

var _global = require("../../global");

var _strategies = require("./strategies");

function packMessages(messages) {
  return {
    [(0, _global.getGlobalKey)()]: messages
  };
}

function sendMessage(win, domain, message, {
  on,
  send
}) {
  return _src.ZalgoPromise.try(() => {
    const messageBuffer = (0, _global.windowStore)();
    const domainBuffer = messageBuffer.getOrSet(win, () => ({}));
    domainBuffer.buffer = domainBuffer.buffer || [];
    domainBuffer.buffer.push(message);
    domainBuffer.flush = domainBuffer.flush || _src.ZalgoPromise.flush().then(() => {
      if ((0, _src2.isWindowClosed)(win)) {
        throw new Error('Window is closed');
      }

      const serializedMessage = (0, _serialize.serializeMessage)(win, domain, packMessages(domainBuffer.buffer || []), {
        on,
        send
      });
      delete domainBuffer.buffer;
      const strategies = Object.keys(_strategies.SEND_MESSAGE_STRATEGIES);
      const errors = [];

      for (const strategyName of strategies) {
        try {
          _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
        } catch (err) {
          errors.push(err);
        }
      }

      if (errors.length === strategies.length) {
        throw new Error(`All post-robot messaging strategies failed:\n\n${errors.map((err, i) => `${i}. ${(0, _src3.stringifyError)(err)}`).join('\n\n')}`);
      }
    });
    return domainBuffer.flush.then(() => {
      delete domainBuffer.flush;
    });
  }).then(_src3.noop);
}