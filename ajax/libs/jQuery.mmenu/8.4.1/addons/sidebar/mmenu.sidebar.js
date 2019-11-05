import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import { extendShorthandOptions } from './_options';
import * as DOM from '../../_modules/dom';
import * as media from '../../_modules/matchmedia';
import { extend } from '../../_modules/helpers';
//  Add the options.
Mmenu.options.sidebar = options;
export default function () {
    var _this = this;
    if (!this.opts.offCanvas) {
        return;
    }
    var options = extendShorthandOptions(this.opts.sidebar);
    this.opts.sidebar = extend(options, Mmenu.options.sidebar);
    //	Collapsed
    if (options.collapsed.use) {
        //	Make the menu collapsable.
        this.bind('initMenu:after', function () {
            _this.node.menu.classList.add('mm-menu_sidebar-collapsed');
            if (options.collapsed.blockMenu &&
                _this.opts.offCanvas &&
                !DOM.children(_this.node.menu, '.mm-menu__blocker')[0]) {
                var anchor = DOM.create('a.mm-menu__blocker');
                anchor.setAttribute('href', '#' + _this.node.menu.id);
                _this.node.menu.prepend(anchor);
            }
            if (options.collapsed.hideNavbar) {
                _this.node.menu.classList.add('mm-menu_hidenavbar');
            }
            if (options.collapsed.hideDivider) {
                _this.node.menu.classList.add('mm-menu_hidedivider');
            }
        });
        //	En-/disable the collapsed sidebar.
        var enable = function () {
            _this.node.wrpr.classList.add('mm-wrapper_sidebar-collapsed');
        };
        var disable = function () {
            _this.node.wrpr.classList.remove('mm-wrapper_sidebar-collapsed');
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
        this.bind('initMenu:after', function () {
            _this.node.menu.classList.add('mm-menu_sidebar-expanded');
        });
        //	En-/disable the expanded sidebar.
        var enable = function () {
            _this.node.wrpr.classList.add('mm-wrapper_sidebar-expanded');
            if (!_this.node.wrpr.matches('.mm-wrapper_sidebar-closed')) {
                _this.open();
            }
        };
        var disable = function () {
            _this.node.wrpr.classList.remove('mm-wrapper_sidebar-expanded');
            _this.close();
        };
        if (typeof options.expanded.use == 'boolean') {
            this.bind('initMenu:after', enable);
        }
        else {
            media.add(options.expanded.use, enable, disable);
        }
        //  Manually en-/disable the expanded sidebar (open / close the menu)
        this.bind('close:start', function () {
            if (_this.node.wrpr.matches('.mm-wrapper_sidebar-expanded')) {
                _this.node.wrpr.classList.add('mm-wrapper_sidebar-closed');
                if (options.expanded.initial == 'remember') {
                    window.localStorage.setItem('mmenuExpandedState', 'closed');
                }
            }
        });
        this.bind('open:start', function () {
            if (_this.node.wrpr.matches('.mm-wrapper_sidebar-expanded')) {
                _this.node.wrpr.classList.remove('mm-wrapper_sidebar-closed');
                if (options.expanded.initial == 'remember') {
                    window.localStorage.setItem('mmenuExpandedState', 'open');
                }
            }
        });
        //  Set the initial state
        var initialState = options.expanded.initial;
        if (options.expanded.initial == 'remember') {
            var state = window.localStorage.getItem('mmenuExpandedState');
            switch (state) {
                case 'open':
                case 'closed':
                    initialState = state;
                    break;
            }
        }
        if (initialState == 'closed') {
            this.bind('initMenu:after', function () {
                _this.node.wrpr.classList.add('mm-wrapper_sidebar-closed');
            });
        }
        //	Add click behavior.
        //	Prevents default behavior when clicking an anchor
        this.clck.push(function (anchor, args) {
            if (args.inMenu && args.inListview) {
                if (_this.node.wrpr.matches('.mm-wrapper_sidebar-expanded')) {
                    return {
                        close: options.expanded.initial == 'closed'
                    };
                }
            }
        });
    }
}
