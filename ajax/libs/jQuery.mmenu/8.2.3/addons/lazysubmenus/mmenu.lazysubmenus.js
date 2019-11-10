import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import * as DOM from '../../core/_dom';
import { extendShorthandOptions } from './_options';
import { extend } from '../../core/_helpers';
//	Add the options.
Mmenu.options.lazySubmenus = options;
export default function () {
    var options = extendShorthandOptions(this.opts.lazySubmenus);
    this.opts.lazySubmenus = extend(options, Mmenu.options.lazySubmenus);
    if (options.load) {
        //	Prevent all sub panels from being initialized.
        this.bind('initMenu:after', () => {
            var panels = [];
            //	Find all potential subpanels.
            DOM.find(this.node.pnls, 'li').forEach(listitem => {
                panels.push(...DOM.children(listitem, this.conf.panelNodetype.join(', ')));
            });
            //	Filter out all non-panels and add the lazyload classes
            panels
                .filter(panel => !panel.matches('.mm-listview_inset'))
                .filter(panel => !panel.matches('.mm-nolistview'))
                .filter(panel => !panel.matches('.mm-nopanel'))
                .forEach(panel => {
                panel.classList.add('mm-panel_lazysubmenu', 'mm-nolistview', 'mm-nopanel');
            });
        });
        //	Prepare current and one level sub panels for initPanels
        this.bind('initPanels:before', () => {
            const panels = DOM.children(this.node.pnls, this.conf.panelNodetype.join(', '));
            panels.forEach(panel => {
                var filter = '.mm-panel_lazysubmenu', children = DOM.find(panel, filter);
                if (panel.matches(filter)) {
                    children.unshift(panel);
                }
                children
                    .filter(child => !child.matches('.mm-panel_lazysubmenu .mm-panel_lazysubmenu'))
                    .forEach(child => {
                    child.classList.remove('mm-panel_lazysubmenu', 'mm-nolistview', 'mm-nopanel');
                });
            });
        });
        //	initPanels for the default opened panel
        this.bind('initOpened:before', () => {
            var panels = [];
            DOM.find(this.node.pnls, '.' + this.conf.classNames.selected).forEach(listitem => {
                panels.push(...DOM.parents(listitem, '.mm-panel_lazysubmenu'));
            });
            if (panels.length) {
                panels.forEach(panel => {
                    panel.classList.remove('mm-panel_lazysubmenu', 'mm-nolistview mm-nopanel');
                });
                this.initPanel(panels[panels.length - 1]);
            }
        });
        //	initPanels for current- and sub panels before openPanel
        this.bind('openPanel:before', (panel) => {
            var filter = '.mm-panel_lazysubmenu', panels = DOM.find(panel, filter);
            if (panel.matches(filter)) {
                panels.unshift(panel);
            }
            panels = panels.filter(panel => !panel.matches('.mm-panel_lazysubmenu .mm-panel_lazysubmenu'));
            panels.forEach(panel => {
                this.initPanel(panel);
            });
        });
    }
}
