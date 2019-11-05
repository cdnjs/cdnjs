var options = {
    add: false,
    addTo: 'panels',
    cancel: false,
    noResults: 'No results found.',
    placeholder: 'Search',
    panel: {
        add: false,
        dividers: true,
        fx: 'none',
        id: null,
        splash: null,
        title: 'Search'
    },
    search: true,
    showTextItems: false,
    showSubPanels: true
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
    if (typeof options.panel == 'boolean') {
        options.panel = {
            add: options.panel
        };
    }
    if (typeof options.panel != 'object') {
        options.panel = {};
    }
    //	Extend logical options.
    if (options.addTo == 'panel') {
        options.panel.add = true;
    }
    if (options.panel.add) {
        options.showSubPanels = false;
        if (options.panel.splash) {
            options.cancel = true;
        }
    }
    return options;
}
;
