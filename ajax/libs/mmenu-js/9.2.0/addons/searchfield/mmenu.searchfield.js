import OPTIONS from './options';
import CONFIGS from './configs';
import translate from './translations';
import * as DOM from '../../_modules/dom';
import { extend } from '../../_modules/helpers';
//  Add the translations.
translate();
export default function () {
    this.opts.searchfield = this.opts.searchfield || {};
    this.conf.searchfield = this.conf.searchfield || {};
    //	Extend options.
    const options = extend(this.opts.searchfield, OPTIONS);
    const configs = extend(this.conf.searchfield, CONFIGS);
    if (!options.add) {
        return;
    }
    switch (options.addTo) {
        case 'panels':
            options.addTo = '.mm-panel';
            break;
        case 'searchpanel':
            options.addTo = '.mm-panel--search';
            break;
    }
    switch (options.searchIn) {
        case 'panels':
            options.searchIn = '.mm-panel';
            break;
    }
    //  Add a searchfield to panels matching the "addTo" querySelector.
    this.bind('initPanel:after', (panel) => {
        if (panel.matches(options.addTo) &&
            !panel.closest('.mm-listitem--vertical')) {
            initPanel.call(this, panel);
        }
    });
    this.bind('initMenu:after', () => {
        //  Create the resultspanel.
        const resultspanel = createResultsPanel.call(this);
        initPanel.call(this, resultspanel);
        //  Add a searchfield to anything other than a panel (most likely a navbar).
        DOM.find(this.node.menu, options.addTo).forEach(wrapper => {
            if (!wrapper.matches('.mm-panel')) {
                /** The searchform. */
                const form = createSearchfield.call(this, true);
                //  Add the form to the panel.
                wrapper.append(form);
                /** The input node. */
                const input = DOM.find(form, 'input')[0];
                //  Bind events for opening and closing the resultspanel.
                // With a splash...
                if (options.splash.length) {
                    //  Open on focus.
                    input.addEventListener('focusin', () => {
                        this.openPanel(resultspanel, false, false);
                    });
                    //  Show cancel button if searchpanel is opened.
                    this.bind('openPanel:after', (panel) => {
                        if (panel.matches('.mm-panel--search')) {
                            form.classList.add('mm-searchfield--cancelable');
                        }
                        else {
                            form.classList.remove('mm-searchfield--cancelable');
                        }
                    });
                    // ...without splash.
                }
                else {
                    //  Open resultspanel when searching.
                    this.bind('search:after', () => {
                        this.openPanel(resultspanel, false, false);
                    });
                    //  Close resultspanel when resetting.
                    input.addEventListener('focusout', () => {
                        if (!input.value.length) {
                            this.closePanel(resultspanel, false);
                        }
                    });
                }
                //  Initialize searching.
                initSearch.call(this, form);
            }
        });
    });
    //	Blur searchfield
    this.bind('close:before', () => {
        DOM.find(this.node.menu, '.mm-searchfield input').forEach((input) => {
            input.blur();
        });
    });
}
/**
 * Create the searchpanel.
 * @param {Mmenu} this
 */
const createResultsPanel = function () {
    /** Options for the searchfield. */
    const options = this.opts.searchfield;
    /** Configs for the searchfield. */
    const configs = this.conf.searchfield;
    /** The panel. */
    let panel = DOM.children(this.node.pnls, '.mm-panel--search')[0];
    //	Only once
    if (panel) {
        return panel;
    }
    panel = DOM.create('div.mm-panel--search');
    //	Add attributes to the panel.    
    _addAttributes(panel, configs.panel);
    //  Add a title to the panel.
    if (options.title.length) {
        panel.dataset.mmTitle = this.i18n(options.title);
    }
    //  Add a listview to the panel.
    panel.append(DOM.create('ul'));
    this._initPanel(panel);
    return panel;
};
/**
 * Add a searchfield, splash message and no-results message to a panel.
 * @param {Mmenu}       this
 * @param {HTMLElement} panel The panel to initialise.
 */
const initPanel = function (panel) {
    /** Options for the searchfield. */
    const options = this.opts.searchfield;
    //	Create the searchfield.
    if (panel.matches(options.addTo)) {
        /** Whether or not the panel is the resultspanel */
        const isResultspanel = panel.matches('.mm-panel--search');
        //  Only one per panel.
        if (!DOM.find(panel, '.mm-searchfield').length) {
            /** The searchform. */
            const form = createSearchfield.call(this, isResultspanel);
            if (isResultspanel) {
                form.classList.add('mm-searchfield--cancelable');
            }
            //  Add the form to the panel.
            panel.prepend(form);
            //  Initialize searching.
            initSearch.call(this, form);
        }
    }
    //	Create the splash content.
    if (options.splash.length &&
        panel.matches('.mm-panel--search')) {
        //  Only one per panel.
        if (!DOM.find(panel, '.mm-panel__splash').length) {
            /** The splash content node. */
            const splash = DOM.create('div.mm-panel__splash');
            splash.innerHTML = options.splash;
            panel.append(splash);
        }
    }
    //  Add no results message.
    if (options.noResults.length) {
        //	Only once per panel.
        if (!DOM.find(panel, '.mm-panel__noresults').length) {
            /** The no results message node. */
            const message = DOM.create('div.mm-panel__noresults');
            message.innerHTML = this.i18n(options.noResults);
            panel.append(message);
        }
    }
};
/**
 * Create the searchfield.
 * @param {Mmenu}   this
 * @param {boolean} [addCancel=false] Whether or not to add the cancel button
 */
const createSearchfield = function (addCancel = false) {
    /** Options for the searchfield. */
    const options = this.opts.searchfield;
    /** Configs for the searchfield. */
    const configs = this.conf.searchfield;
    /** The form node. */
    const form = DOM.create('form.mm-searchfield');
    //	Add attributes to the form
    _addAttributes(form, configs.form);
    /** The fieldset node. */
    const field = DOM.create('div.mm-searchfield__input');
    form.append(field);
    /** The input node. */
    const input = DOM.create('input');
    field.append(input);
    //	Add attributes to the input
    input.type = 'text';
    input.autocomplete = 'off';
    input.placeholder = this.i18n(options.placeholder);
    input.setAttribute('aria-label', this.i18n(options.placeholder));
    _addAttributes(input, configs.input);
    //	Add a button to submit to the form.
    if (configs.submit) {
        /** The submit button. */
        const submit = DOM.create('button.mm-btnreset.mm-btn.mm-btn--next.mm-searchfield__btn');
        submit.type = 'submit';
        field.append(submit);
    }
    //	Add a button to clear the searchfield.
    else if (configs.clear) {
        /** The reset button. */
        const reset = DOM.create('button.mm-btnreset.mm-btn.mm-btn--close.mm-searchfield__btn');
        reset.type = 'reset';
        reset.setAttribute('aria-label', this.i18n('Clear searchfield'));
        field.append(reset);
        //  Apparently, resetting a form doesn't trigger any event on the input,
        //  so we manually dispatch the event, one frame later :/
        form.addEventListener('reset', () => {
            window.requestAnimationFrame(() => {
                input.dispatchEvent(new Event('input'));
            });
        });
    }
    // Add a button to close the searchpanel.
    if (configs.cancel && addCancel) {
        /** The cancel button. */
        const cancel = DOM.create('a.mm-searchfield__cancel');
        cancel.href = '#';
        cancel.setAttribute('aria-label', this.i18n('Cancel searching'));
        cancel.textContent = this.i18n('cancel');
        form.append(cancel);
        // Close the search panel.
        cancel.addEventListener('click', event => {
            event.preventDefault();
            this.closePanel(DOM.children(this.node.pnls, '.mm-panel--search')[0], false);
        });
    }
    return form;
};
/**
 * Initialize the searching.
 * @param {Mmenu}       this
 * @param {HTMLElement} form The searchform.
 */
const initSearch = function (form) {
    /** Options for the searchfield. */
    const options = this.opts.searchfield;
    /** The panel the results will be in. */
    const resultspanel = form.closest('.mm-panel') || DOM.find(this.node.pnls, '.mm-panel--search')[0];
    /** The input node. */
    const input = DOM.find(form, 'input')[0];
    /** Where to search. */
    let searchIn = resultspanel.matches('.mm-panel--search')
        ? DOM.children(this.node.pnls, options.searchIn)
        : [resultspanel];
    //  Filter out the resultspanel
    searchIn = searchIn.filter(panel => !panel.matches('.mm-panel--search'));
    /** Search */
    const search = () => {
        /** The searchquery */
        const query = input.value.toLowerCase().trim();
        if (query.length) {
            form.classList.add('mm-searchfield--searching');
        }
        else {
            form.classList.remove('mm-searchfield--searching');
        }
        if (!options.search) {
            return;
        }
        /** All listitems */
        const listitems = [];
        searchIn.forEach(panel => {
            //  Scroll all panels to top.
            panel.scrollTop = 0;
            //  Find listitems.
            listitems.push(...DOM.find(panel, '.mm-listitem'));
        });
        //	Search
        if (query.length) {
            // Trigger event.
            this.trigger('search:before');
            resultspanel.classList.add('mm-panel--searching');
            //	Add data attribute to the matching listitems.
            listitems.forEach((listitem) => {
                const text = DOM.children(listitem, '.mm-listitem__text')[0];
                if (!text || DOM.text(text).toLowerCase().indexOf(query) > -1) {
                    listitem.dataset.mmSearchresult = query;
                }
            });
            /** The number of matching results. */
            let count = 0;
            //  Resultspanel: Copy results to resultspanel.
            if (resultspanel.matches('.mm-panel--search')) {
                count = _searchResultsPanel(resultspanel, query, searchIn);
                //  Search per panel: Hide the non-matching listitems.
            }
            else {
                count = _searchPerPanel(query, searchIn);
            }
            resultspanel.classList[count == 0 ? 'add' : 'remove']('mm-panel--noresults');
            // Trigger event.
            this.trigger('search:after');
            //  Don't search, reset all.
        }
        else {
            // Trigger event.
            this.trigger('clear:before');
            resultspanel.classList.remove('mm-panel--searching', 'mm-panel--noresults');
            //  Resultspanel.
            if (resultspanel.matches('.mm-panel--search')) {
                _resetResultsPanel(resultspanel);
                if (!options.splash) {
                    this.closePanel(resultspanel, false, false);
                }
                //  Search per panel: Show all listitems and dividers.
            }
            else {
                _resetPerPanel(searchIn);
            }
            // Trigger event.
            this.trigger('clear:after');
        }
    };
    input.addEventListener('input', search);
    search();
};
const _searchResultsPanel = (resultspanel, query, searchIn) => {
    /** The listview for the results/ */
    const listview = DOM.find(resultspanel, '.mm-listview')[0];
    //  Clear listview.
    listview.innerHTML = '';
    /** Amount of resutls found. */
    let count = 0;
    searchIn.forEach(panel => {
        /** The results in this panel. */
        const results = DOM.find(panel, `[data-mm-searchresult="${query}"]`);
        count += results.length;
        if (results.length) {
            /** Title for the panel. */
            const title = DOM.find(panel, '.mm-navbar__title')[0];
            //  Add a divider to indicate in what panel the results are.
            if (title) {
                const divider = DOM.create('li.mm-divider');
                divider.innerHTML = title.innerHTML;
                listview.append(divider);
            }
            //  Add the results
            results.forEach((result) => {
                const clone = result.cloneNode(true);
                listview.append(clone);
            });
        }
    });
    //  Remove inline subpanels.
    DOM.find(listview, '.mm-panel').forEach(panel => {
        panel.remove();
    });
    //  Remove ID's and data-attributes
    ['id', 'data-mm-parent', 'data-mm-child'].forEach(attr => {
        DOM.find(listview, `[${attr}]`).forEach(elem => {
            elem.removeAttribute(attr);
        });
    });
    //  Remove "opened" class
    DOM.find(listview, '.mm-listitem--opened').forEach(listitem => {
        listitem.classList.remove('mm-listitem--opened');
    });
    return count;
};
const _resetResultsPanel = (resultspanel) => {
    /** The listview for the results. */
    const listview = DOM.find(resultspanel, '.mm-listview')[0];
    //  Clear listview.
    listview.innerHTML = '';
};
const _searchPerPanel = (query, searchIn) => {
    /** Amount of resutls found. */
    let count = 0;
    searchIn.forEach(panel => {
        /** The results in this panel. */
        const results = DOM.find(panel, `[data-mm-searchresult="${query}"]`);
        count += results.length;
        if (results.length) {
            //  Add first preceeding divider to the results.
            results.forEach(result => {
                const divider = DOM.prevAll(result, '.mm-divider')[0];
                if (divider) {
                    divider.dataset.mmSearchresult = query;
                }
            });
        }
        DOM.find(panel, '.mm-listitem, .mm-divider').forEach(item => {
            //  Hide all
            item.classList.add('mm-hidden');
            //  Show matching + its parents.
            if (item.dataset.mmSearchresult === query) {
                [item, ...DOM.parents(item, '.mm-listitem')].forEach(item2 => {
                    item2.classList.remove('mm-hidden');
                });
            }
        });
    });
    return count;
};
const _resetPerPanel = (searchIn) => {
    searchIn.forEach((panel) => {
        DOM.find(panel, '.mm-listitem, .mm-divider').forEach(item => {
            item.classList.remove('mm-hidden');
        });
    });
};
/**
 * Add array of attributes to an element.
 * @param {HTMLEement}  element     The element to add the attributes to.
 * @param {Object}      attributes  The attributes to add.
 */
const _addAttributes = (element, attributes) => {
    if (attributes) {
        Object.keys(attributes).forEach(a => {
            element[a] = attributes[a];
        });
    }
};
