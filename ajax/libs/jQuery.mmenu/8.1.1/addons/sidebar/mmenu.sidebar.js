import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import * as DOM from '../../core/_dom';
import * as media from '../../core/_matchmedia';
import { extendShorthandOptions } from './_options';
import { extend } from '../../core/_helpers';
//  Add the options.
Mmenu.options.sidebar = options;
export default function () {
    if (!this.opts.offCanvas) {
        return;
    }
    var options = extendShorthandOptions(this.opts.sidebar);
    this.opts.sidebar = extend(options, Mmenu.options.sidebar);
    var clsclpsd = 'mm-wrapper_sidebar-collapsed', clsxpndd = 'mm-wrapper_sidebar-expanded';
    //	Collapsed
    if (options.collapsed.use) {
        //	Make the menu collapsable.
        this.bind('initMenu:after', () => {
            this.node.menu.classList.add('mm-menu_sidebar-collapsed');
            if (options.collapsed.blockMenu &&
                this.opts.offCanvas &&
                !DOM.children(this.node.menu, '.mm-menu__blocker')[0]) {
                let anchor = DOM.create('a.mm-menu__blocker');
                anchor.setAttribute('href', '#' + this.node.menu.id);
                this.node.menu.prepend(anchor);
            }
            if (options.collapsed.hideNavbar) {
                this.node.menu.classList.add('mm-menu_hidenavbar');
            }
            if (options.collapsed.hideDivider) {
                this.node.menu.classList.add('mm-menu_hidedivider');
            }
        });
        //	En-/disable the collapsed sidebar.
        let enable = () => {
            this.node.wrpr.classList.add(clsclpsd);
        };
        let disable = () => {
            this.node.wrpr.classList.remove(clsclpsd);
        };
        if (typeof options.collapsed.use == 'boolean') {
            this.bind('initMenu:after', enable);
        }
        else {
            media.add(options.collapsed.use, enable, disable);
        }
    }
    //	Expanded
    if (options.expanded.use) {
        //	Make the menu expandable
        this.bind('initMenu:after', () => {
            this.node.menu.classList.add('mm-menu_sidebar-expanded');
        });
        //	En-/disable the expanded sidebar.
        let enable = () => {
            this.node.wrpr.classList.add(clsxpndd);
            if (!this.node.wrpr.matches('.mm-wrapper_sidebar-closed')) {
                this.open();
            }
        };
        let disable = () => {
            this.node.wrpr.classList.remove(clsxpndd);
            this.close();
        };
        if (typeof options.expanded.use == 'boolean') {
            this.bind('initMenu:after', enable);
        }
        else {
            media.add(options.expanded.use, enable, disable);
        }
        this.bind('close:start', () => {
            if (this.node.wrpr.matches('.' + clsxpndd)) {
                this.node.wrpr.classList.add('mm-wrapper_sidebar-closed');
            }
        });
        this.bind('open:start', () => {
            this.node.wrpr.classList.remove('mm-wrapper_sidebar-closed');
        });
        //	Add click behavior.
        //	Prevents default behavior when clicking an anchor
        this.clck.push((anchor, args) => {
            if (args.inMenu && args.inListview) {
                if (this.node.wrpr.matches('.mm-wrapper_sidebar-expanded')) {
                    return {
                        close: false
                    };
                }
            }
        });
    }
}
