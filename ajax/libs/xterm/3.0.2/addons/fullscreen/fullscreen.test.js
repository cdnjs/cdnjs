"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var fullscreen = require("./fullscreen");
var MockTerminal = (function () {
    function MockTerminal() {
    }
    return MockTerminal;
}());
describe('fullscreen addon', function () {
    describe('apply', function () {
        it('should do register the `toggleFullscreen` method', function () {
            fullscreen.apply(MockTerminal);
            chai_1.assert.equal(typeof MockTerminal.prototype.toggleFullScreen, 'function');
        });
    });
});

//# sourceMappingURL=fullscreen.test.js.map
