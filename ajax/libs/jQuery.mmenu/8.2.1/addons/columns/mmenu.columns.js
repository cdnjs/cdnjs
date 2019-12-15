import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import * as DOM from '../../core/_dom';
import { extendShorthandOptions } from './_options';
import { extend } from '../../core/_helpers';
//	Add the options.
Mmenu.options.columns = options;
export default function () {
    var options = extendShorthandOptions(this.opts.columns);
    this.opts.columns = extend(options, Mmenu.options.columns);
    //	Add the columns
    if (options.add) {
        options.visible.min = Math.max(1, Math.min(6, options.visible.min));
        options.visible.max = Math.max(options.visible.min, Math.min(6, options.visible.max));
        /** Columns related clasnames for the menu. */
        var colm = [];
        /** Columns related clasnames for the panels. */
        var colp = [];
        /** Classnames to remove from panels in favor of showing columns. */
        var rmvc = [
            'mm-panel_opened',
            'mm-panel_opened-parent',
            'mm-panel_highest'
        ];
        for (var i = 0; i <= options.visible.max; i++) {
            colm.push('mm-menu_columns-' + i);
            colp.push('mm-panel_columns-' + i);
        }
        rmvc.push(...colp);
        //	Close all later opened panels
        this.bind('openPanel:before', (panel) => {
            /** The parent panel. */
            var parent;
            if (panel) {
                parent = panel['mmParent'];
            }
            if (!parent) {
                return;
            }
            parent = parent.closest('.mm-panel');
            if (!parent) {
                return;
            }
            var classname = parent.className;
            if (!classname.length) {
                return;
            }
            classname = classname.split('mm-panel_columns-')[1];
            if (!classname) {
                return;
            }
            var colnr = parseInt(classname.split(' ')[0], 10) + 1;
            while (colnr > 0) {
                panel = DOM.children(this.node.pnls, '.mm-panel_columns-' + colnr)[0];
                if (panel) {
                    console.log(panel);
                    colnr++;
                    panel.classList.remove(...rmvc);
                    panel.classList.add('mm-hidden');
                }
                else {
                    colnr = -1;
                    break;
                }
            }
        });
        this.bind('openPanel:start', (panel) => {
            var columns = DOM.children(this.node.pnls, '.mm-panel_opened-parent').length;
            if (!panel.matches('.mm-panel_opened-parent')) {
                columns++;
            }
            columns = Math.min(options.visible.max, Math.max(options.visible.min, columns));
            this.node.menu.classList.remove(...colm);
            this.node.menu.classList.add('mm-menu_columns-' + columns);
            var panels = [];
            DOM.children(this.node.pnls, '.mm-panel').forEach(panel => {
                panel.classList.remove(...colp);
                if (panel.matches('.mm-panel_opened-parent')) {
                    panels.push(panel);
                }
            });
            panels.push(panel);
            panels.slice(-options.visible.max).forEach((panel, p) => {
                panel.classList.add('mm-panel_columns-' + p);
            });
        });
    }
}
