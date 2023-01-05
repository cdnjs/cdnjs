import OPTIONS from './_options';
import * as DOM from '../../_modules/dom';
import { extend } from '../../_modules/helpers';
export default function () {
    this.opts.iconPanels = this.opts.iconPanels || {};
    //	Extend options.
    const options = extend(this.opts.iconPanels, OPTIONS);
    let keepFirst = false;
    if (options.visible == 'first') {
        keepFirst = true;
        options.visible = 1;
    }
    options.visible = Math.min(3, Math.max(1, options.visible));
    options.visible++;
    //	Add the iconpanels
    if (options.add) {
        this.bind('initMenu:after', () => {
            this.node.menu.classList.add('mm-menu--iconpanel');
        });
        /** The classnames that can be set to a panel */
        const classnames = [
            'mm-panel--iconpanel-0',
            'mm-panel--iconpanel-1',
            'mm-panel--iconpanel-2',
            'mm-panel--iconpanel-3'
        ];
        //  Show only the main panel.
        if (keepFirst) {
            this.bind('initMenu:after', () => {
                var _a;
                (_a = DOM.children(this.node.pnls, '.mm-panel')[0]) === null || _a === void 0 ? void 0 : _a.classList.add('mm-panel--iconpanel-first');
            });
            //  Show parent panel(s).
        }
        else {
            this.bind('openPanel:after', (panel) => {
                //  Do nothing when opening a vertical submenu
                if (panel.closest('.mm-listitem--vertical')) {
                    return;
                }
                let panels = DOM.children(this.node.pnls, '.mm-panel');
                //	Filter out panels that are not opened.
                panels = panels.filter((panel) => panel.matches('.mm-panel--parent'));
                //	Add the current panel to the list.
                panels.push(panel);
                //	Slice the opened panels to the max visible amount.
                panels = panels.slice(-options.visible);
                //	Add the "iconpanel" classnames.
                panels.forEach((panel, p) => {
                    panel.classList.remove('mm-panel--iconpanel-first', ...classnames);
                    panel.classList.add(`mm-panel--iconpanel-${p}`);
                });
            });
        }
        // this.bind('initPanel:after', (panel: HTMLElement) => {
        //     if (!panel.closest('.mm-listitem--vertical') &&
        //         !DOM.children(panel, '.mm-panel__blocker')[0]
        //     ) {
        //         const blocker = DOM.create('div.mm-blocker.mm-panel__blocker') as HTMLElement;
        //         panel.prepend(blocker);
        //     }
        // });
    }
}
