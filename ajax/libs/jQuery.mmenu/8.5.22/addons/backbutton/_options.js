var options = {
    close: false,
    open: false
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
            close: options
        };
    }
    if (typeof options != 'object') {
        options = {};
    }
    return options;
}
;
