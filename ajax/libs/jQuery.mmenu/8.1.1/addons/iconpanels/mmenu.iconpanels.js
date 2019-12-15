import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import * as DOM from '../../core/_dom';
import { extendShorthandOptions } from './_options';
import { extend } from '../../core/_helpers';
//	Add the options.
Mmenu.options.iconPanels = options;
export default function () {
    var options = extendShorthandOptions(this.opts.iconPanels);
    this.opts.iconPanels = extend(options, Mmenu.options.iconPanels);
    var keepFirst = false;
    if (options.visible == 'first') {
        keepFirst = true;
        options.visible = 1;
    }
    options.visible = Math.min(3, Math.max(1, options.visible));
    options.visible++;
    //	Add the iconpanels
    if (options.add) {
        this.bind('initMenu:after', () => {
            var classnames = ['mm-menu_iconpanel'];
            if (options.hideNavbar) {
                classnames.push('mm-menu_hidenavbar');
            }
            if (options.hideDivider) {
                classnames.push('mm-menu_hidedivider');
            }
            this.node.menu.classList.add(...classnames);
        });
        var classnames = [];
        if (!keepFirst) {
            for (var i = 0; i <= options.visible; i++) {
                classnames.push('mm-panel_iconpanel-' + i);
            }
        }
        this.bind('openPanel:start', (panel) => {
            var panels = DOM.children(this.node.pnls, '.mm-panel');
            panel = panel || panels[0];
            if (panel.parentElement.matches('.mm-listitem_vertical')) {
                return;
            }
            if (keepFirst) {
                panels.forEach((panel, p) => {
                    panel.classList[p == 0 ? 'add' : 'remove']('mm-panel_iconpanel-first');
                });
            }
            else {
                //	Remove the "iconpanel" classnames from all panels.
                panels.forEach(panel => {
                    panel.classList.remove(...classnames);
                });
                //	Filter out panels that are not opened.
                panels = panels.filter(panel => panel.matches('.mm-panel_opened-parent'));
                //	Add the current panel to the list.
                let panelAdded = false;
                panels.forEach(elem => {
                    if (panel === elem) {
                        panelAdded = true;
                    }
                });
                if (!panelAdded) {
                    panels.push(panel);
                }
                //	Remove the "hidden" classname from all opened panels.
                panels.forEach(panel => {
                    panel.classList.remove('mm-hidden');
                });
                //	Slice the opened panels to the max visible amount.
                panels = panels.slice(-options.visible);
                //	Add the "iconpanel" classnames.
                panels.forEach((panel, p) => {
                    panel.classList.add('mm-panel_iconpanel-' + p);
                });
            }
        });
        this.bind('initListview:after', (panel) => {
            if (options.blockPanel &&
                !panel.parentElement.matches('.mm-listitem_vertical') &&
                !DOM.children(panel, '.mm-panel__blocker')[0]) {
                let blocker = DOM.create('a.mm-panel__blocker');
                blocker.setAttribute('href', '#' + panel.closest('.mm-panel').id);
                panel.prepend(blocker);
            }
        });
    }
}
