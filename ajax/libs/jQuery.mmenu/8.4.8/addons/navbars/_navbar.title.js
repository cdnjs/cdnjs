import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import * as DOM from '../../_modules/dom';
export default function (navbar) {
    var _this = this;
    //	Add content to the navbar.
    var title = DOM.create('a.mm-navbar__title');
    var titleText = DOM.create('span');
    title.append(titleText);
    navbar.append(title);
    //	Update the title to the opened panel.
    var _url, _txt;
    var original;
    this.bind('openPanel:start', function (panel) {
        //	Do nothing in a vertically expanding panel.
        if (panel.parentElement.matches('.mm-listitem_vertical')) {
            return;
        }
        //	Find the original title in the opened panel.
        original = panel.querySelector('.' + _this.conf.classNames.navbars.panelTitle);
        if (!original) {
            original = panel.querySelector('.mm-navbar__title span');
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
        titleText.innerHTML = _txt;
    });
    //	Add screenreader / aria support
    var prev;
    this.bind('openPanel:start:sr-aria', function (panel) {
        if (_this.opts.screenReader.text) {
            if (!prev) {
                var navbars = DOM.children(_this.node.menu, '.mm-navbars_top, .mm-navbars_bottom');
                navbars.forEach(function (navbar) {
                    var btn = navbar.querySelector('.mm-btn_prev');
                    if (btn) {
                        prev = btn;
                    }
                });
            }
            if (prev) {
                var hidden = true;
                if (_this.opts.navbar.titleLink == 'parent') {
                    hidden = !prev.matches('.mm-hidden');
                }
                Mmenu.sr_aria(title, 'hidden', hidden);
            }
        }
    });
}
