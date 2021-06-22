import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import { extendShorthandOptions } from './_options';
import * as DOM from '../../_modules/dom';
import { extend } from '../../_modules/helpers';
//	Add the options.
Mmenu.options.lazySubmenus = options;
export default function () {
    var _this = this;
    var options = extendShorthandOptions(this.opts.lazySubmenus);
    this.opts.lazySubmenus = extend(options, Mmenu.options.lazySubmenus);
    if (options.load) {
        //	Prevent all sub panels from being initialized.
        this.bind('initPanels:before', function () {
            var panels = [];
            //	Find all potential subpanels.
            DOM.find(_this.node.pnls, 'li').forEach(function (listitem) {
                panels.push.apply(panels, DOM.children(listitem, _this.conf.panelNodetype.join(', ')));
            });
            //	Filter out all non-panels and add the lazyload classes
            panels
                .filter(function (panel) { return !panel.matches('.mm-listview_inset'); })
                .filter(function (panel) { return !panel.matches('.mm-nolistview'); })
                .filter(function (panel) { return !panel.matches('.mm-nopanel'); })
                .forEach(function (panel) {
                var classnames = [
                    'mm-panel_lazysubmenu',
                    'mm-nolistview',
                    'mm-nopanel',
                ];
                //  IE11:
                classnames.forEach(function (classname) {
                    panel.classList.add(classname);
                });
                //  Better browsers:
                // panel.classList.add(...classnames);
            });
        });
        //	re-enable the default opened panel to be initialized.
        this.bind('initPanels:before', function () {
            var panels = [];
            DOM.find(_this.node.pnls, '.' + _this.conf.classNames.selected).forEach(function (listitem) {
                panels.push.apply(panels, DOM.parents(listitem, '.mm-panel_lazysubmenu'));
            });
            if (panels.length) {
                panels.forEach(function (panel) {
                    console.log(panel);
                    var classnames = [
                        'mm-panel_lazysubmenu',
                        'mm-nolistview',
                        'mm-nopanel',
                    ];
                    //  IE11:
                    classnames.forEach(function (classname) {
                        panel.classList.remove(classname);
                    });
                    //  Better browsers:
                    // panel.classList.remove(...classnames);
                });
            }
        });
        //	initPanel for current- and sub panels before openPanel
        this.bind('openPanel:before', function (panel) {
            var panels = DOM.find(panel, '.mm-panel_lazysubmenu').filter(function (panel) {
                return !panel.matches('.mm-panel_lazysubmenu .mm-panel_lazysubmenu');
            });
            if (panel.matches('.mm-panel_lazysubmenu')) {
                panels.unshift(panel);
            }
            panels.forEach(function (panel) {
                var classnames = [
                    'mm-panel_lazysubmenu',
                    'mm-nolistview',
                    'mm-nopanel',
                ];
                //  IE11:
                classnames.forEach(function (classname) {
                    panel.classList.remove(classname);
                });
                //  Better browsers:
                // child.classList.remove(...classnames);
                _this.initPanel(panel);
            });
        });
    }
}
