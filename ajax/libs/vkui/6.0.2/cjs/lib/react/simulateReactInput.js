/* istanbul ignore file */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "simulateReactInput", {
    enumerable: true,
    get: function() {
        return simulateReactInput;
    }
});
const simulateReactInput = (target, nextValue = '')=>{
    try {
        const prevValue = target.value;
        target.value = nextValue;
        const tracker = target._valueTracker;
        if (tracker) {
            tracker.setValue(prevValue);
        }
        const event = new Event('input', {
            bubbles: true
        });
        target.dispatchEvent(event);
    } catch (error) {
        // Чтобы в будущем узнать, что это решение уже не работает.
        if (process.env.NODE_ENV === 'development') {
            throw error;
        }
    }
};

//# sourceMappingURL=simulateReactInput.js.map