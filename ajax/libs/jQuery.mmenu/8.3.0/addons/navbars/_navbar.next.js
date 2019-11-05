import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import * as DOM from '../../_modules/dom';
//	DEPRECATED
//	Will be removed in version 8.2
export default function (navbar) {
    var _this = this;
    //	Add content
    var next = DOM.create('a.mm-btn.mm-btn_next.mm-navbar__btn');
    navbar.append(next);
    //	Update to opened panel
    var org;
    var _url, _txt;
    this.bind('openPanel:start', function (panel) {
        org = panel.querySelector('.' + _this.conf.classNames.navbars.panelNext);
        _url = org ? org.getAttribute('href') : '';
        _txt = org ? org.innerHTML : '';
        if (_url) {
            next.setAttribute('href', _url);
        }
        else {
            next.removeAttribute('href');
        }
        next.classList[_url || _txt ? 'remove' : 'add']('mm-hidden');
        next.innerHTML = _txt;
    });
    //	Add screenreader / aria support
    this.bind('openPanel:start:sr-aria', function (panel) {
        Mmenu.sr_aria(next, 'hidden', next.matches('mm-hidden'));
        Mmenu.sr_aria(next, 'owns', (next.getAttribute('href') || '').slice(1));
    });
}
