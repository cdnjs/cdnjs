"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var fit = require("./fit");
var MockTerminal = (function () {
    function MockTerminal() {
    }
    return MockTerminal;
}());
describe('fit addon', function () {
    describe('apply', function () {
        it('should do register the `proposeGeometry` and `fit` methods', function () {
            fit.apply(MockTerminal);
            chai_1.assert.equal(typeof MockTerminal.prototype.proposeGeometry, 'function');
            chai_1.assert.equal(typeof MockTerminal.prototype.fit, 'function');
        });
    });
});

//# sourceMappingURL=fit.test.js.map
