import * as DOM from '../../_modules/dom';
export default function (navbar) {
    /** The title node in the navbar. */
    let title = DOM.create('a.mm-navbar__title');
    //	Add title to the navbar.
    navbar.append(title);
    //	Update the title to the opened panel.
    this.bind('openPanel:before', (panel) => {
        //	Do nothing in a vertically expanding panel.
        if (panel.parentElement.matches('.mm-listitem--vertical')) {
            return;
        }
        /** Original title in the panel. */
        const original = panel.querySelector('.mm-navbar__title');
        if (original) {
            /** Clone of the original title in the panel. */
            const clone = original.cloneNode(true);
            title.after(clone);
            title.remove();
            title = clone;
        }
    });
}
