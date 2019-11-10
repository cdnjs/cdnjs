const options = {
    menu: {
        open: false,
        node: null,
        maxStartPos: 100,
        threshold: 50
    },
    panels: {
        close: false
    },
    vendors: {
        hammer: {}
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
            menu: options,
            panels: options
        };
    }
    if (typeof options != 'object') {
        options = {};
    }
    if (typeof options.menu == 'boolean') {
        options.menu = {
            open: options.menu
        };
    }
    if (typeof options.menu != 'object') {
        options.menu = {};
    }
    if (typeof options.panels == 'boolean') {
        options.panels = {
            close: options.panels
        };
    }
    if (typeof options.panels != 'object') {
        options.panels = {};
    }
    return options;
}
;
