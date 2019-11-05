import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import { extendShorthandOptions } from './_options';
import * as DOM from '../../_modules/dom';
import { extend } from '../../_modules/helpers';
//	Add the options.
Mmenu.options.dividers = options;
//  Add the classnames.
Mmenu.configs.classNames.divider = 'Divider';
export default function () {
    var _this = this;
    var options = extendShorthandOptions(this.opts.dividers);
    this.opts.dividers = extend(options, Mmenu.options.dividers);
    //	Refactor divider classname
    this.bind('initListview:after', function (listview) {
        DOM.children(listview).forEach(function (listitem) {
            DOM.reClass(listitem, _this.conf.classNames.divider, 'mm-divider');
            if (listitem.matches('.mm-divider')) {
                listitem.classList.remove('mm-listitem');
            }
        });
    });
    //	Add dividers
    if (options.add) {
        this.bind('initListview:after', function (listview) {
            if (!listview.matches(options.addTo)) {
                return;
            }
            DOM.find(listview, '.mm-divider').forEach(function (divider) {
                divider.remove();
            });
            var lastletter = '', listitems = DOM.children(listview);
            DOM.filterLI(listitems).forEach(function (listitem) {
                var letter = DOM.children(listitem, '.mm-listitem__text')[0]
                    .textContent.trim()
                    .toLowerCase()[0];
                if (letter.length && letter != lastletter) {
                    lastletter = letter;
                    var divider = DOM.create('li.mm-divider');
                    divider.textContent = letter;
                    listview.insertBefore(divider, listitem);
                }
            });
        });
    }
}
