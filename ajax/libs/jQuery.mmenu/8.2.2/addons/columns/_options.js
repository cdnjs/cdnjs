const options = {
    add: false,
    visible: {
        min: 1,
        max: 3
    }
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
    if (typeof options == 'number') {
        options = {
            add: true,
            visible: options
        };
    }
    if (typeof options != 'object') {
        options = {};
    }
    if (typeof options.visible == 'number') {
        options.visible = {
            min: options.visible,
            max: options.visible
        };
    }
    return options;
}
;
