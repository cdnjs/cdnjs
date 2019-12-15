"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function winptyCompatInit(terminal) {
    var isWindows = ['Windows', 'Win16', 'Win32', 'WinCE'].indexOf(navigator.platform) >= 0;
    if (!isWindows) {
        return;
    }
    terminal.on('linefeed', function () {
        var line = terminal.buffer.lines.get(terminal.buffer.ybase + terminal.buffer.y - 1);
        var lastChar = line[terminal.cols - 1];
        if (lastChar[3] !== 32) {
            var nextLine = terminal.buffer.lines.get(terminal.buffer.ybase + terminal.buffer.y);
            nextLine.isWrapped = true;
        }
    });
}
exports.winptyCompatInit = winptyCompatInit;
function apply(terminalConstructor) {
    terminalConstructor.prototype.winptyCompatInit = function () {
        winptyCompatInit(this);
    };
}
exports.apply = apply;

//# sourceMappingURL=winptyCompat.js.map
