"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine = /** @class */ (function () {
    function StateMachine(logger, stateMachine) {
        this.stateMachine = stateMachine;
        this.inEndState = false;
        this.transitions = stateMachine.transitions;
        this.state = stateMachine.init;
        this.context = stateMachine.context;
        this.history = [{ oldState: '-', newState: this.state, transitionName: '-' }];
    }
    /**
     * Try to perform a state change
     */
    StateMachine.prototype.transition = function (transitionName) {
        var transition;
        for (var i = 0; i < this.transitions.length; i++) {
            transition = this.transitions[i];
            if (transitionName === transition.name && (this.state === transition.from || transition.from === undefined)) {
                this.history.push({ oldState: this.state, transitionName: transitionName, newState: transition.to });
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
        var debugHistory = this.history.reduce(function (result, entry) {
            return result += "\n\tFrom " + entry.oldState + " to " + entry.newState + " via " + entry.transitionName;
        }, '');
        throw new Error("Invalid state transition.\nDetails: " + details + " \nHistory: " + debugHistory);
    };
    return StateMachine;
}());
exports.StateMachine = StateMachine;
