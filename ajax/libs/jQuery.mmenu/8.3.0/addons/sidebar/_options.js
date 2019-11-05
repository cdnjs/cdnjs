var options = {
    collapsed: {
        use: false,
        blockMenu: true,
        hideDivider: false,
        hideNavbar: true
    },
    expanded: {
        use: false,
        initial: 'open'
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
    if (typeof options == 'string' ||
        (typeof options == 'boolean' && options) ||
        typeof options == 'number') {
        options = {
            expanded: options
        };
    }
    if (typeof options != 'object') {
        options = {};
    }
    //	Extend collapsed shorthand options.
    if (typeof options.collapsed == 'boolean' && options.collapsed) {
        options.collapsed = {
            use: true
        };
    }
    if (typeof options.collapsed == 'string' ||
        typeof options.collapsed == 'number') {
        options.collapsed = {
            use: options.collapsed
        };
    }
    if (typeof options.collapsed != 'object') {
        options.collapsed = {};
    }
    //	Extend expanded shorthand options.
    if (typeof options.expanded == 'boolean' && options.expanded) {
        options.expanded = {
            use: true
        };
    }
    if (typeof options.expanded == 'string' ||
        typeof options.expanded == 'number') {
        options.expanded = {
            use: options.expanded
        };
    }
    if (typeof options.expanded != 'object') {
        options.expanded = {};
    }
    return options;
}
