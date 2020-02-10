"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine = /** @class */ (function () {
    function StateMachine(logger, stateMachine) {
        this.stateMachine = stateMachine;
        this.inEndState = false;
        this.transitions = stateMachine.transitions;
        this.state = stateMachine.init;
        this.context = stateMachine.context;
    }
    /**
     * Try to perform a state change
     */
    StateMachine.prototype.transition = function (transitionName) {
        var transition;
        for (var i = 0; i < this.transitions.length; i++) {
            transition = this.transitions[i];
            if (transitionName === transition.name && (this.state === transition.from || transition.from === undefined)) {
                var oldState = this.state;
                this.state = transition.to;
                if (this.stateMachine.onStateChanged) {
                    this.stateMachine.onStateChanged.call(this.context, this.state, oldState);
                }
                if (transition.handler) {
                    transition.handler.call(this.context);
                }
                return;
            }
        }
        var details = JSON.stringify({ transition: transitionName, state: this.state });
        throw new Error("Invalid state transition: " + details);
    };
    return StateMachine;
}());
exports.StateMachine = StateMachine;
