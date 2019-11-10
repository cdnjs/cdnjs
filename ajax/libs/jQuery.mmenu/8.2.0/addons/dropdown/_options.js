const options = {
    drop: false,
    fitViewport: true,
    event: 'click',
    position: {},
    tip: true
};
export default options;
/**
 * Extend shorthand options.
 *
 * @param  {object} options The options to extend.
 * @return {object}			The extended options.
 */
export function extendShorthandOptions(options) {
    if (typeof options == 'boolean' && options) {
        options = {
            drop: options
        };
    }
    if (typeof options != 'object') {
        options = {};
    }
    if (typeof options.position == 'string') {
        options.position = {
            of: options.position
        };
    }
    return options;
}
;
