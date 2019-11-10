"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function terminadoAttach(term, socket, bidirectional, buffered) {
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
    term._getMessage = function (ev) {
        var data = JSON.parse(ev.data);
        if (data[0] == "stdout") {
            if (buffered) {
                term._pushToBuffer(data[1]);
            }
            else {
                term.write(data[1]);
            }
        }
    };
    term._sendData = function (data) {
        socket.send(JSON.stringify(['stdin', data]));
    };
    term._setSize = function (size) {
        socket.send(JSON.stringify(['set_size', size.rows, size.cols]));
    };
    socket.addEventListener('message', term._getMessage);
    if (bidirectional) {
        term.on('data', term._sendData);
    }
    term.on('resize', term._setSize);
    socket.addEventListener('close', term.terminadoDetach.bind(term, socket));
    socket.addEventListener('error', term.terminadoDetach.bind(term, socket));
}
exports.terminadoAttach = terminadoAttach;
;
function terminadoDetach(term, socket) {
    term.off('data', term._sendData);
    socket = (typeof socket == 'undefined') ? term.socket : socket;
    if (socket) {
        socket.removeEventListener('message', term._getMessage);
    }
    delete term.socket;
}
exports.terminadoDetach = terminadoDetach;
;
function apply(terminalConstructor) {
    terminalConstructor.prototype.terminadoAttach = function (socket, bidirectional, buffered) {
        return terminadoAttach(this, socket, bidirectional, buffered);
    };
    terminalConstructor.prototype.terminadoDetach = function (socket) {
        return terminadoDetach(this, socket);
    };
}
exports.apply = apply;

//# sourceMappingURL=terminado.js.map
