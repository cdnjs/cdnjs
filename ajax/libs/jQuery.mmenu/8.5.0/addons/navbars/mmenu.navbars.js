import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import configs from './_configs';
import { extendShorthandOptions } from './_options';
import * as DOM from '../../_modules/dom';
import * as media from '../../_modules/matchmedia';
//  Add the options and configs.
Mmenu.options.navbars = options;
Mmenu.configs.navbars = configs;
//  Add the classnames.
Mmenu.configs.classNames.navbars = {
    panelPrev: 'Prev',
    panelTitle: 'Title'
};
import breadcrumbs from './_navbar.breadcrumbs';
import close from './_navbar.close';
import prev from './_navbar.prev';
import searchfield from './_navbar.searchfield';
import title from './_navbar.title';
Navbars.navbarContents = {
    breadcrumbs: breadcrumbs,
    close: close,
    prev: prev,
    searchfield: searchfield,
    title: title
};
import tabs from './_navbar.tabs';
Navbars.navbarTypes = {
    tabs: tabs
};
export default function Navbars() {
    var _this = this;
    var navs = this.opts.navbars;
    if (typeof navs == 'undefined') {
        return;
    }
    if (!(navs instanceof Array)) {
        navs = [navs];
    }
    var navbars = {};
    if (!navs.length) {
        return;
    }
    navs.forEach(function (options) {
        options = extendShorthandOptions(options);
        if (!options.use) {
            return false;
        }
        //	Create the navbar element.
        var navbar = DOM.create('div.mm-navbar');
        //	Get the position for the navbar.
        var position = options.position;
        //	Restrict the position to either "bottom" or "top" (default).
        if (position !== 'bottom') {
            position = 'top';
        }
        //	Create the wrapper for the navbar position.
        if (!navbars[position]) {
            navbars[position] = DOM.create('div.mm-navbars_' + position);
        }
        navbars[position].append(navbar);
        //	Add content to the navbar.
        for (var c = 0, l = options.content.length; c < l; c++) {
            var ctnt = options.content[c];
            //	The content is a string.
            if (typeof ctnt == 'string') {
                var func = Navbars.navbarContents[ctnt];
                //	The content refers to one of the navbar-presets ("prev", "title", etc).
                if (typeof func == 'function') {
                    //	Call the preset function.
                    func.call(_this, navbar);
                    //	The content is just HTML.
                }
                else {
                    //	Add the HTML.
                    //  Wrap the HTML in a single node
                    var node = DOM.create('span');
                    node.innerHTML = ctnt;
                    //  If there was only a single node, use that.
                    var children = DOM.children(node);
                    if (children.length == 1) {
                        node = children[0];
                    }
                    navbar.append(node);
                }
                //	The content is not a string, it must be an element.
            }
            else {
                navbar.append(ctnt);
            }
        }
        //	The type option is set.
        if (typeof options.type == 'string') {
            //	The function refers to one of the navbar-presets ("tabs").
            var func = Navbars.navbarTypes[options.type];
            if (typeof func == 'function') {
                //	Call the preset function.
                func.call(_this, navbar);
            }
        }
        //	En-/disable the navbar.
        var enable = function () {
            navbar.classList.remove('mm-hidden');
            Mmenu.sr_aria(navbar, 'hidden', false);
        };
        var disable = function () {
            navbar.classList.add('mm-hidden');
            Mmenu.sr_aria(navbar, 'hidden', true);
        };
        if (typeof options.use != 'boolean') {
            media.add(options.use, enable, disable);
        }
    });
    //	Add to menu.
    this.bind('initMenu:after', function () {
        for (var position in navbars) {
            _this.node.menu[position == 'bottom' ? 'append' : 'prepend'](navbars[position]);
        }
    });
}
