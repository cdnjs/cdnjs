// TODO: convert this to a class so that events is an Object of that class
export const events = {
    current: null,
    trigger: undefined,
};
/**
 * This function triggers a throttled event function with a specified delay (in milli-seconds).  Events
 * that are triggered repetitively due to user interaction such brush dragging might flood the library
 * and invoke more renders than can be executed in time. Using this function to wrap your event
 * function allows the library to smooth out the rendering by throttling events and only responding to
 * the most recent event.
 *
 * @example
 * ```
 * chart.on('renderlet', function(chart) {
 *     // smooth the rendering through event throttling
 *     events.trigger(function(){
 *         // focus some other chart to the range selected by user on this chart
 *         someOtherChart.focus(chart.filter());
 *     }, 500);
 * })
 * ```
 */
events.trigger = function (closure, delay) {
    if (!delay) {
        closure();
        return;
    }
    events.current = closure;
    setTimeout(() => {
        if (closure === events.current) {
            closure();
        }
    }, delay);
};
//# sourceMappingURL=events.js.map