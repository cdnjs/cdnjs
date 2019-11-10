import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import * as DOM from '../../core/_dom';
export default function (navbar) {
    //	Add content to the navbar.
    var title = DOM.create('a.mm-navbar__title');
    navbar.append(title);
    //	Update the title to the opened panel.
    var _url, _txt;
    var original;
    this.bind('openPanel:start', (panel) => {
        //	Do nothing in a vertically expanding panel.
        if (panel.parentElement.matches('.mm-listitem_vertical')) {
            return;
        }
        //	Find the original title in the opened panel.
        original = panel.querySelector('.' + this.conf.classNames.navbars.panelTitle);
        if (!original) {
            original = panel.querySelector('.mm-navbar__title');
        }
        //	Get the URL for the title.
        _url = original ? original.getAttribute('href') : '';
        if (_url) {
            title.setAttribute('href', _url);
        }
        else {
            title.removeAttribute('href');
        }
        //	Get the text for the title.
        _txt = original ? original.innerHTML : '';
        title.innerHTML = _txt;
        //	Show or hide the title.
        title.classList[_url || _txt ? 'remove' : 'add']('mm-hidden');
    });
    //	Add screenreader / aria support
    var prev;
    this.bind('openPanel:start:sr-aria', (panel) => {
        if (this.opts.screenReader.text) {
            if (!prev) {
                var navbars = DOM.children(this.node.menu, '.mm-navbars_top, .mm-navbars_bottom');
                navbars.forEach((navbar) => {
                    let btn = navbar.querySelector('.mm-btn_prev');
                    if (btn) {
                        prev = btn;
                    }
                });
            }
            if (prev) {
                var hidden = true;
                if (this.opts.navbar.titleLink == 'parent') {
                    hidden = !prev.matches('.mm-hidden');
                }
                Mmenu.sr_aria(title, 'hidden', hidden);
            }
        }
    });
}
;
