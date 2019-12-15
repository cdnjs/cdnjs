const options = [];
export default options;
/**
 * Extend shorthand options.
 *
 * @param  {object} options The options to extend.
 * @return {object}			The extended options.
 */
export function extendShorthandOptions(options) {
    if (typeof options == 'boolean' && options) {
        options = {};
    }
    if (typeof options != 'object') {
        options = {};
    }
    if (typeof options.content == 'undefined') {
        options.content = ['prev', 'title'];
    }
    if (!(options.content instanceof Array)) {
        options.content = [options.content];
    }
    if (typeof options.use == 'undefined') {
        options.use = true;
    }
    if (typeof options.use == 'boolean' && options.use) {
        options.use = true;
    }
    return options;
}
;
