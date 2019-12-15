import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import * as DOM from '../../core/_dom';
//	Add the classnames.
Mmenu.configs.classNames.toggles = {
    toggle: 'Toggle',
    check: 'Check'
};
export default function () {
    this.bind('initPanel:after', (panel) => {
        //	Refactor toggle classes
        DOM.find(panel, 'input').forEach(input => {
            DOM.reClass(input, this.conf.classNames.toggles.toggle, 'mm-toggle');
            DOM.reClass(input, this.conf.classNames.toggles.check, 'mm-check');
        });
    });
}
