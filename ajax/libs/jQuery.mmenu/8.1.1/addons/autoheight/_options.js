const opts = {
    height: 'default'
};
export default opts;
/**
 * Extend shorthand options.
 *
 * @param  {object} options The options to extend.
 * @return {object}			The extended options.
 */
export function extendShorthandOptions(options) {
    if (typeof options == 'boolean' && options) {
        options = {
            height: 'auto'
        };
    }
    if (typeof options == 'string') {
        options = {
            height: options
        };
    }
    if (typeof options != 'object') {
        options = {};
    }
    return options;
}
;
