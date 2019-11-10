import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import * as DOM from '../../core/_dom';
export default function (navbar) {
    //	Add content
    var close = DOM.create('a.mm-btn.mm-btn_close.mm-navbar__btn');
    navbar.append(close);
    //	Update to page node
    this.bind('setPage:after', (page) => {
        close.setAttribute('href', '#' + page.id);
    });
    //	Add screenreader / text support
    this.bind('setPage:after:sr-text', () => {
        close.innerHTML = Mmenu.sr_text(this.i18n(this.conf.screenReader.text.closeMenu));
        Mmenu.sr_aria(close, 'owns', close.getAttribute('href').slice(1));
    });
}
;
