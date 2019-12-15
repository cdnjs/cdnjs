"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var attach = require("./attach");
var MockTerminal = (function () {
    function MockTerminal() {
    }
    return MockTerminal;
}());
describe('attach addon', function () {
    describe('apply', function () {
        it('should do register the `attach` and `detach` methods', function () {
            attach.apply(MockTerminal);
            chai_1.assert.equal(typeof MockTerminal.prototype.attach, 'function');
            chai_1.assert.equal(typeof MockTerminal.prototype.detach, 'function');
        });
    });
});

//# sourceMappingURL=attach.test.js.map
