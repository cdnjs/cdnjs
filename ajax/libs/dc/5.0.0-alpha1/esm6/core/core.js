import { config } from './config.js';
/**
 * Start a transition on a selection if transitions are globally enabled
 * ({@link Config.disableTransitions disableTransitions} is false) and the duration is greater than zero; otherwise return
 * the selection. Since most operations are the same on a d3 selection and a d3 transition, this
 * allows a common code path for both cases.
 * @param selection - the selection to be transitioned
 * @param [duration=250] - the duration of the transition in milliseconds, a
 * function returning the duration, or 0 for no transition
 * @param [delay] - the delay of the transition in milliseconds, or a function
 * returning the delay, or 0 for no delay
 * @param [name] - the name of the transition (if concurrent transitions on the same
 * elements are needed)
 */
export function transition(selection, duration, delay, name) {
    // TODO: can we do typing for selection here
    if (config.disableTransitions || duration <= 0) {
        return selection;
    }
    let s = selection.transition(name);
    if (duration >= 0 || duration !== undefined) {
        s = s.duration(duration);
    }
    if (delay >= 0 || delay !== undefined) {
        s = s.delay(delay);
    }
    return s;
}
/* somewhat silly, but to avoid duplicating logic */
export function optionalTransition(enable, duration, delay, name) {
    if (enable) {
        return function (selection) {
            return transition(selection, duration, delay, name);
        };
    }
    else {
        return function (selection) {
            return selection;
        };
    }
}
// See http://stackoverflow.com/a/20773846
export function afterTransition(_transition, callback) {
    if (_transition.empty() || !_transition.duration) {
        callback.call(_transition);
    }
    else {
        let n = 0;
        _transition
            .each(() => {
            ++n;
        })
            .on('end', () => {
            if (!--n) {
                callback.call(_transition);
            }
        });
    }
}
export function instanceOfChart(o) {
    return o instanceof Object && o.__dcFlag__ && true;
}
//# sourceMappingURL=core.js.map