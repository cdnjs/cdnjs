import * as DOM from '../../_modules/dom';
export default function (navbar) {
    /** The close button. */
    const close = DOM.create('a.mm-btn.mm-btn--close.mm-navbar__btn');
    close.setAttribute('aria-label', this.i18n(this.conf.offCanvas.screenReader.closeMenu));
    //	Add the button to the navbar.
    navbar.append(close);
    //	Update to target the page node.
    this.bind('setPage:after', (page) => {
        close.href = `#${page.id}`;
    });
}
