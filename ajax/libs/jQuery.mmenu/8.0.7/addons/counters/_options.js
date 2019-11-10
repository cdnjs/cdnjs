const options = {
    add: false,
    addTo: 'panels',
    count: false
};
export default options;
/**
 * Extend shorthand options.
 *
 * @param  {object} options The options to extend.
 * @return {object}			The extended options.
 */
export function extendShorthandOptions(options) {
    if (typeof options == 'boolean') {
        options = {
            add: options,
            count: options
        };
    }
    if (typeof options != 'object') {
        options = {};
    }
    if (options.addTo == 'panels') {
        options.addTo = '.mm-panel';
    }
    return options;
}
;
