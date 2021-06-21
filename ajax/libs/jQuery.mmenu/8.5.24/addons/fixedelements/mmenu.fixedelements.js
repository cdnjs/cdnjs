import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import configs from './_configs';
import * as DOM from '../../_modules/dom';
//	Add the configs.
Mmenu.configs.fixedElements = configs;
//	Add the classnames.
Mmenu.configs.classNames.fixedElements = {
    fixed: 'Fixed'
};
export default function () {
    var _this = this;
    if (!this.opts.offCanvas) {
        return;
    }
    var configs = this.conf.fixedElements;
    var _fixd, fixed, wrppr;
    this.bind('setPage:after', function (page) {
        _fixd = _this.conf.classNames.fixedElements.fixed;
        wrppr = DOM.find(document, configs.insertSelector)[0];
        fixed = DOM.find(page, '.' + _fixd);
        fixed.forEach(function (fxd) {
            DOM.reClass(fxd, _fixd, 'mm-slideout');
            wrppr[configs.insertMethod](fxd);
        });
    });
}
