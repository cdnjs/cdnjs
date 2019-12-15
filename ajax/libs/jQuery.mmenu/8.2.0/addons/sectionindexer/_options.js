const options = {
    add: false,
    addTo: 'panels'
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
            add: options
        };
    }
    if (typeof options != 'object') {
        options = {};
    }
    return options;
}
;
