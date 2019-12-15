"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var terminado = require("./terminado");
var MockTerminal = (function () {
    function MockTerminal() {
    }
    return MockTerminal;
}());
describe('terminado addon', function () {
    describe('apply', function () {
        it('should do register the `terminadoAttach` and `terminadoDetach` methods', function () {
            terminado.apply(MockTerminal);
            chai_1.assert.equal(typeof MockTerminal.prototype.terminadoAttach, 'function');
            chai_1.assert.equal(typeof MockTerminal.prototype.terminadoDetach, 'function');
        });
    });
});

//# sourceMappingURL=terminado.test.js.map
