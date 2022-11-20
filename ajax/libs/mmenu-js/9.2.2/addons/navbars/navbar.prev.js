import * as DOM from '../../_modules/dom';
export default function (navbar) {
    /** The prev button. */
    let prev = DOM.create('a.mm-btn.mm-hidden');
    //	Add button to navbar.
    navbar.append(prev);
    //  Hide navbar in the panel.
    this.bind('initNavbar:after', (panel) => {
        DOM.children(panel, '.mm-navbar')[0].classList.add('mm-hidden');
    });
    // Update the button href when opening a panel.
    this.bind('openPanel:before', (panel) => {
        if (panel.parentElement.matches('.mm-listitem--vertical')) {
            return;
        }
        prev.classList.add('mm-hidden');
        /** Original button in the panel. */
        const original = panel.querySelector('.mm-navbar__btn.mm-btn--prev');
        if (original) {
            /** Clone of the original button in the panel. */
            const clone = original.cloneNode(true);
            prev.after(clone);
            prev.remove();
            prev = clone;
        }
    });
}
