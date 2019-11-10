"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var winptyCompat = require("./winptyCompat");
var MockTerminal = (function () {
    function MockTerminal() {
    }
    return MockTerminal;
}());
describe('winptyCompat addon', function () {
    describe('apply', function () {
        it('should do register the `winptyCompatInit` method', function () {
            winptyCompat.apply(MockTerminal);
            chai_1.assert.equal(typeof MockTerminal.prototype.winptyCompatInit, 'function');
        });
    });
});

//# sourceMappingURL=winptyCompat.test.js.map
