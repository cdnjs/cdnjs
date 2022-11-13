import OPTIONS from './options';
import * as DOM from '../../_modules/dom';
import { extend } from '../../_modules/helpers';
export default function () {
    this.opts.counters = this.opts.counters || {};
    //	Extend options.
    const options = extend(this.opts.counters, OPTIONS);
    if (!options.add) {
        return;
    }
    /**
     * Counting the visible listitems and setting it to the counter element.
     * @param {HTMLElement} panel Panel to count LIs in.
     */
    const count = (panel) => {
        /** Parent panel for the mutated listitem. */
        const parent = this.node.pnls.querySelector(`#${panel.dataset.mmParent}`);
        if (!parent) {
            return;
        }
        /** The counter for the listitem. */
        const counter = parent.querySelector('.mm-counter');
        if (!counter) {
            return;
        }
        /** The listitems */
        const listitems = [];
        DOM.children(panel, '.mm-listview').forEach((listview) => {
            listitems.push(...DOM.children(listview, '.mm-listitem'));
        });
        counter.innerHTML = DOM.filterLI(listitems).length.toString();
    };
    /** Mutation observer the the listitems. */
    const listitemObserver = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
            if (mutation.attributeName == 'class') {
                count(mutation.target.closest('.mm-panel'));
            }
        });
    });
    //	Add the counters after a listview is initiated.
    this.bind('initListview:after', (listview) => {
        /** The panel where the listview is in. */
        const panel = listview.closest('.mm-panel');
        /** The parent LI for the panel */
        const parent = this.node.pnls.querySelector(`#${panel.dataset.mmParent}`);
        if (!parent) {
            return;
        }
        /** The button inside the parent LI */
        const button = DOM.children(parent, '.mm-btn')[0];
        if (!button) {
            return;
        }
        //	Check if no counter already excists.
        if (!DOM.children(button, '.mm-counter').length) {
            /** The counter for the listitem. */
            const counter = DOM.create('span.mm-counter');
            counter.setAttribute('aria-hidden', 'true');
            button.prepend(counter);
        }
        //  Count immediately.
        count(panel);
    });
    //  Count when LI classname changes.
    this.bind('initListitem:after', (listitem) => {
        /** The panel where the listitem is in. */
        const panel = listitem.closest('.mm-panel');
        if (!panel) {
            return;
        }
        /** The parent LI for the panel. */
        const parent = this.node.pnls.querySelector(`#${panel.dataset.mmParent}`);
        if (!parent) {
            return;
        }
        listitemObserver.observe(listitem, {
            attributes: true
        });
    });
}
