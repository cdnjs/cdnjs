"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var zmodem = require("./zmodem");
var MockTerminal = (function () {
    function MockTerminal() {
    }
    return MockTerminal;
}());
describe('zmodem addon', function () {
    describe('apply', function () {
        it('should do register the `zmodemAttach` method and `zmodemBrowser` attribute', function () {
            zmodem.apply(MockTerminal);
            chai_1.assert.equal(typeof MockTerminal.prototype.zmodemAttach, 'function');
            chai_1.assert.equal(typeof MockTerminal.prototype.zmodemBrowser, 'object');
        });
    });
});

//# sourceMappingURL=zmodem.test.js.map
