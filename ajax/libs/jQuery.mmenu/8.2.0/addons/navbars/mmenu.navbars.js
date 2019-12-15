import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import configs from './_configs';
import * as DOM from '../../core/_dom';
import * as media from '../../core/_matchmedia';
import { extendShorthandOptions } from './_options';
//  Add the options and configs.
Mmenu.options.navbars = options;
Mmenu.configs.navbars = configs;
//  Add the classnames.
Mmenu.configs.classNames.navbars = {
    panelNext: 'Next',
    panelPrev: 'Prev',
    panelTitle: 'Title'
};
import breadcrumbs from './_navbar.breadcrumbs';
import close from './_navbar.close';
import next from './_navbar.next';
import prev from './_navbar.prev';
import searchfield from './_navbar.searchfield';
import title from './_navbar.title';
Navbars.navbarContents = {
    breadcrumbs,
    close,
    next,
    prev,
    searchfield,
    title
};
import tabs from './_navbar.tabs';
Navbars.navbarTypes = {
    tabs
};
export default function Navbars() {
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
    navs.forEach(options => {
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
        for (let c = 0, l = options.content.length; c < l; c++) {
            let ctnt = options.content[c];
            //	The content is a string.
            if (typeof ctnt == 'string') {
                let func = Navbars.navbarContents[ctnt];
                //	The content refers to one of the navbar-presets ("prev", "title", etc).
                if (typeof func == 'function') {
                    //	Call the preset function.
                    func.call(this, navbar);
                    //	The content is just HTML.
                }
                else {
                    //	Add the HTML.
                    //  Wrap the HTML in a single node
                    let node = DOM.create('span');
                    node.innerHTML = ctnt;
                    //  If there was only a single node, use that.
                    let children = DOM.children(node);
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
            let func = Navbars.navbarTypes[options.type];
            if (typeof func == 'function') {
                //	Call the preset function.
                func.call(this, navbar);
            }
        }
        //	En-/disable the navbar.
        let enable = () => {
            navbar.classList.remove('mm-hidden');
            Mmenu.sr_aria(navbar, 'hidden', false);
        };
        let disable = () => {
            navbar.classList.add('mm-hidden');
            Mmenu.sr_aria(navbar, 'hidden', true);
        };
        if (typeof options.use != 'boolean') {
            media.add(options.use, enable, disable);
        }
    });
    //	Add to menu.
    this.bind('initMenu:after', () => {
        for (let position in navbars) {
            this.node.menu[position == 'bottom' ? 'append' : 'prepend'](navbars[position]);
        }
    });
}
