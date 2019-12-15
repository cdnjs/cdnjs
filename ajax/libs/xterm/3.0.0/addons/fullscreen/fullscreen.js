"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toggleFullScreen(term, fullscreen) {
    var fn;
    if (typeof fullscreen == 'undefined') {
        fn = (term.element.classList.contains('fullscreen')) ? 'remove' : 'add';
    }
    else if (!fullscreen) {
        fn = 'remove';
    }
    else {
        fn = 'add';
    }
    term.element.classList[fn]('fullscreen');
}
exports.toggleFullScreen = toggleFullScreen;
;
function apply(terminalConstructor) {
    terminalConstructor.prototype.toggleFullScreen = function (fullscreen) {
        return toggleFullScreen(this, fullscreen);
    };
}
exports.apply = apply;

//# sourceMappingURL=fullscreen.js.map
