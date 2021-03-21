import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import { extendShorthandOptions } from './_options';
import * as DOM from '../../_modules/dom';
import { extend } from '../../_modules/helpers';
//	Add the options.
Mmenu.options.counters = options;
//	Add the classnames.
Mmenu.configs.classNames.counters = {
    counter: 'Counter',
};
export default function () {
    var _this = this;
    var options = extendShorthandOptions(this.opts.counters);
    this.opts.counters = extend(options, Mmenu.options.counters);
    //	Refactor counter class
    this.bind('initListview:after', function (listview) {
        var cntrclss = _this.conf.classNames.counters.counter, counters = DOM.find(listview, '.' + cntrclss);
        counters.forEach(function (counter) {
            DOM.reClass(counter, cntrclss, 'mm-counter');
        });
    });
    //	Add the counters after a listview is initiated.
    if (options.add) {
        this.bind('initListview:after', function (listview) {
            if (!listview.matches(options.addTo)) {
                return;
            }
            var parent = listview.closest('.mm-panel')['mmParent'];
            if (parent) {
                //	Check if no counter already excists.
                if (!DOM.find(parent, '.mm-counter').length) {
                    var btn = DOM.children(parent, '.mm-btn')[0];
                    if (btn) {
                        btn.prepend(DOM.create('span.mm-counter'));
                    }
                }
            }
        });
    }
    if (options.count) {
        var count = function (listview) {
            var panels = listview
                ? [listview.closest('.mm-panel')]
                : DOM.children(_this.node.pnls, '.mm-panel');
            panels.forEach(function (panel) {
                var parent = panel['mmParent'];
                if (!parent) {
                    return;
                }
                var counter = DOM.find(parent, '.mm-counter')[0];
                if (!counter) {
                    return;
                }
                var listitems = [];
                DOM.children(panel, '.mm-listview').forEach(function (listview) {
                    listitems.push.apply(listitems, DOM.children(listview));
                });
                counter.innerHTML = DOM.filterLI(listitems).length.toString();
            });
        };
        this.bind('initListview:after', count);
        this.bind('updateListview', count);
    }
}
