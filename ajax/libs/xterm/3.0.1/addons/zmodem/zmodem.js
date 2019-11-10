"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Zmodem;
function zmodemAttach(term, ws, opts) {
    if (!opts)
        opts = {};
    var senderFunc = function _ws_sender_func(octets) {
        ws.send(new Uint8Array(octets));
    };
    var zsentry;
    function _shouldWrite() {
        return !!zsentry.get_confirmed_session() || !opts.noTerminalWriteOutsideSession;
    }
    zsentry = new Zmodem.Sentry({
        to_terminal: function _to_terminal(octets) {
            if (_shouldWrite()) {
                term.write(String.fromCharCode.apply(String, octets));
            }
        },
        sender: senderFunc,
        on_retract: function _on_retract() {
            term.emit('zmodemRetract');
        },
        on_detect: function _on_detect(detection) {
            term.emit('zmodemDetect', detection);
        },
    });
    function handleWSMessage(evt) {
        if (typeof evt.data === 'string') {
            if (_shouldWrite()) {
                term.write(evt.data);
            }
        }
        else {
            zsentry.consume(evt.data);
        }
    }
    ws.binaryType = 'arraybuffer';
    ws.addEventListener('message', handleWSMessage);
}
exports.zmodemAttach = zmodemAttach;
function apply(terminalConstructor) {
    Zmodem = (typeof window == 'object') ? window.ZModem : { Browser: null };
    terminalConstructor.prototype.zmodemAttach = zmodemAttach.bind(this, this);
    terminalConstructor.prototype.zmodemBrowser = Zmodem.Browser;
}
exports.apply = apply;

//# sourceMappingURL=zmodem.js.map
