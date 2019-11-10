import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import * as DOM from '../../core/_dom';
import { extendShorthandOptions } from './_options';
import { extend } from '../../core/_helpers';
//	Add the options.
Mmenu.options.counters = options;
//	Add the classnames.
Mmenu.configs.classNames.counters = {
    counter: 'Counter'
};
export default function () {
    var options = extendShorthandOptions(this.opts.counters);
    this.opts.counters = extend(options, Mmenu.options.counters);
    //	Refactor counter class
    this.bind('initListview:after', (panel) => {
        var cntrclss = this.conf.classNames.counters.counter, counters = panel.querySelectorAll('.' + cntrclss);
        counters.forEach(counter => {
            DOM.reClass(counter, cntrclss, 'mm-counter');
        });
    });
    //	Add the counters after a listview is initiated.
    if (options.add) {
        this.bind('initListview:after', (panel) => {
            if (!panel.matches(options.addTo)) {
                return;
            }
            var parent = panel['mmParent'];
            if (parent) {
                //	Check if no counter already excists.
                if (!parent.querySelector('.mm-counter')) {
                    let counter = DOM.create('span.mm-counter');
                    let btn = DOM.children(parent, '.mm-btn')[0];
                    if (btn) {
                        btn.prepend(counter);
                    }
                }
            }
        });
    }
    if (options.count) {
        const count = (panel) => {
            var panels = panel
                ? [panel]
                : DOM.children(this.node.pnls, '.mm-panel');
            panels.forEach(panel => {
                var parent = panel['mmParent'];
                if (!parent) {
                    return;
                }
                var counter = parent.querySelector('.mm-counter');
                if (!counter) {
                    return;
                }
                var listitems = [];
                DOM.children(panel, '.mm-listview').forEach(listview => {
                    listitems.push(...DOM.children(listview));
                });
                counter.innerHTML = DOM.filterLI(listitems).length.toString();
            });
        };
        this.bind('initListview:after', count);
        this.bind('updateListview', count);
    }
}
