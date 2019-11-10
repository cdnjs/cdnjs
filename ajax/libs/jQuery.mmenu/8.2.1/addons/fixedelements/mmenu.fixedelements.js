import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import configs from './_configs';
import * as DOM from '../../core/_dom';
//	Add the configs.
Mmenu.configs.fixedElements = configs;
//	Add the classnames.
Mmenu.configs.classNames.fixedElements = {
    fixed: 'Fixed',
    sticky: 'Sticky'
};
export default function () {
    if (!this.opts.offCanvas) {
        return;
    }
    var configs = this.conf.fixedElements;
    var _fixd, _stck, fixed, stick, wrppr;
    this.bind('setPage:after', (page) => {
        //	Fixed elements
        _fixd = this.conf.classNames.fixedElements.fixed;
        wrppr = DOM.find(document, configs.fixed.insertSelector)[0];
        fixed = DOM.find(page, '.' + _fixd);
        fixed.forEach(fxd => {
            DOM.reClass(fxd, _fixd, 'mm-slideout');
            wrppr[configs.fixed.insertMethod](fxd);
        });
        //	Sticky elements
        _stck = this.conf.classNames.fixedElements.sticky;
        DOM.find(page, '.' + _stck).forEach(stick => {
            DOM.reClass(stick, _stck, 'mm-sticky');
        });
        stick = DOM.find(page, '.mm-sticky');
    });
    this.bind('open:start', () => {
        if (stick.length) {
            if (window.getComputedStyle(this.node.wrpr).overflow == 'hidden') {
                let scrollTop = window.scrollY + configs.sticky.offset;
                stick.forEach(element => {
                    element.style.top =
                        parseInt(window.getComputedStyle(element).top, 10) +
                            scrollTop +
                            'px';
                });
            }
        }
    });
    this.bind('close:finish', () => {
        stick.forEach(element => {
            element.style.top = '';
        });
    });
}
