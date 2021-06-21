import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import * as DOM from '../../_modules/dom';
//	Add the classnames.
Mmenu.configs.classNames.toggles = {
    toggle: 'Toggle',
    check: 'Check'
};
export default function () {
    var _this = this;
    this.bind('initPanel:after', function (panel) {
        //	Refactor toggle classes
        DOM.find(panel, 'input').forEach(function (input) {
            DOM.reClass(input, _this.conf.classNames.toggles.toggle, 'mm-toggle');
            DOM.reClass(input, _this.conf.classNames.toggles.check, 'mm-check');
        });
    });
}
