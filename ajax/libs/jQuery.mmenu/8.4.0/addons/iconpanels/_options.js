var options = {
    add: false,
    blockPanel: true,
    hideDivider: false,
    hideNavbar: true,
    visible: 3
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
    if (typeof options == 'number' ||
        typeof options == 'string') {
        options = {
            add: true,
            visible: options
        };
    }
    if (typeof options != 'object') {
        options = {};
    }
    return options;
}
;
