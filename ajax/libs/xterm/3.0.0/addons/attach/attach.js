"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function attach(term, socket, bidirectional, buffered) {
    bidirectional = (typeof bidirectional == 'undefined') ? true : bidirectional;
    term.socket = socket;
    term._flushBuffer = function () {
        term.write(term._attachSocketBuffer);
        term._attachSocketBuffer = null;
    };
    term._pushToBuffer = function (data) {
        if (term._attachSocketBuffer) {
            term._attachSocketBuffer += data;
        }
        else {
            term._attachSocketBuffer = data;
            setTimeout(term._flushBuffer, 10);
        }
    };
    var myTextDecoder;
    term._getMessage = function (ev) {
        var str;
        if (typeof ev.data === "object") {
            if (ev.data instanceof ArrayBuffer) {
                if (!myTextDecoder) {
                    myTextDecoder = new TextDecoder();
                }
                str = myTextDecoder.decode(ev.data);
            }
            else {
                throw "TODO: handle Blob?";
            }
        }
        if (buffered) {
            term._pushToBuffer(str || ev.data);
        }
        else {
            term.write(str || ev.data);
        }
    };
    term._sendData = function (data) {
        if (socket.readyState !== 1) {
            return;
        }
        socket.send(data);
    };
    socket.addEventListener('message', term._getMessage);
    if (bidirectional) {
        term.on('data', term._sendData);
    }
    socket.addEventListener('close', term.detach.bind(term, socket));
    socket.addEventListener('error', term.detach.bind(term, socket));
}
exports.attach = attach;
;
function detach(term, socket) {
    term.off('data', term._sendData);
    socket = (typeof socket == 'undefined') ? term.socket : socket;
    if (socket) {
        socket.removeEventListener('message', term._getMessage);
    }
    delete term.socket;
}
exports.detach = detach;
;
function apply(terminalConstructor) {
    terminalConstructor.prototype.attach = function (socket, bidirectional, buffered) {
        return attach(this, socket, bidirectional, buffered);
    };
    terminalConstructor.prototype.detach = function (socket) {
        return detach(this, socket);
    };
}
exports.apply = apply;

//# sourceMappingURL=attach.js.map
