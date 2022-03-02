import OPTIONS from './options';
import * as DOM from '../../_modules/dom';
import * as media from '../../_modules/matchmedia';
import { extend } from '../../_modules/helpers';
export default function () {
    // Only for off-canvas menus.
    if (!this.opts.offCanvas.use) {
        return;
    }
    this.opts.sidebar = this.opts.sidebar || {};
    //	Extend options.
    const options = extend(this.opts.sidebar, OPTIONS);
    //	Collapsed
    if (options.collapsed.use) {
        //	Make the menu collapsable.
        this.bind('initMenu:after', () => {
            this.node.menu.classList.add('mm-menu--sidebar-collapsed');
            if (options.collapsed.blockMenu &&
                !DOM.children(this.node.menu, '.mm-menu__blocker')[0]) {
                const blocker = DOM.create('a.mm-menu__blocker');
                blocker.setAttribute('href', `#${this.node.menu.id}`);
                this.node.menu.prepend(blocker);
                //  Add screenreader support
                blocker.title = this.i18n(this.conf.screenReader.openMenu);
                //  TODO: Keyboard navigation support?
                //      shouldnt be able to tab inside the menu while it's closed..?
            }
        });
        //	En-/disable the collapsed sidebar.
        let enable = () => {
            this.node.wrpr.classList.add('mm-wrapper--sidebar-collapsed');
        };
        let disable = () => {
            this.node.wrpr.classList.remove('mm-wrapper--sidebar-collapsed');
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
            this.node.menu.classList.add('mm-menu--sidebar-expanded');
        });
        let expandedEnabled = false;
        //	En-/disable the expanded sidebar.
        let enable = () => {
            expandedEnabled = true;
            this.node.wrpr.classList.add('mm-wrapper--sidebar-expanded');
            this.open();
        };
        let disable = () => {
            expandedEnabled = false;
            this.node.wrpr.classList.remove('mm-wrapper--sidebar-expanded');
            this.close();
        };
        if (typeof options.expanded.use == 'boolean') {
            this.bind('initMenu:after', enable);
        }
        else {
            media.add(options.expanded.use, enable, disable);
        }
        //  Store exanded state when opening and closing the menu.
        this.bind('close:after', () => {
            if (expandedEnabled) {
                window.sessionStorage.setItem('mmenuExpandedState', 'closed');
            }
        });
        this.bind('open:after', () => {
            if (expandedEnabled) {
                window.sessionStorage.setItem('mmenuExpandedState', 'open');
            }
        });
        //  Set the initial state
        let initialState = options.expanded.initial;
        const state = window.sessionStorage.getItem('mmenuExpandedState');
        switch (state) {
            case 'open':
            case 'closed':
                initialState = state;
                break;
        }
        if (initialState == 'closed') {
            this.bind('init:after', () => {
                this.close();
            });
        }
    }
}
