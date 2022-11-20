import OPTIONS from './options';
import * as DOM from '../../_modules/dom';
import * as media from '../../_modules/matchmedia';
import { type, extend } from '../../_modules/helpers';
export default function () {
    this.opts.iconbar = this.opts.iconbar || {};
    //	Extend options.
    const options = extend(this.opts.iconbar, OPTIONS);
    if (!options.use) {
        return;
    }
    let iconbar;
    ['top', 'bottom'].forEach((position, n) => {
        let ctnt = options[position];
        //	Extend shorthand options
        if (type(ctnt) != 'array') {
            ctnt = [ctnt];
        }
        //	Create node
        const part = DOM.create('div.mm-iconbar__' + position);
        //	Add content
        for (let c = 0, l = ctnt.length; c < l; c++) {
            if (typeof ctnt[c] == 'string') {
                part.innerHTML += ctnt[c];
            }
            else {
                part.append(ctnt[c]);
            }
        }
        if (part.children.length) {
            if (!iconbar) {
                iconbar = DOM.create('div.mm-iconbar');
            }
            iconbar.append(part);
        }
    });
    //	Add to menu
    if (iconbar) {
        //	Add the iconbar.
        this.bind('initMenu:after', () => {
            this.node.menu.prepend(iconbar);
        });
        //	En-/disable the iconbar.
        let classname = 'mm-menu--iconbar-' + options.position;
        let enable = () => {
            this.node.menu.classList.add(classname);
        };
        let disable = () => {
            this.node.menu.classList.remove(classname);
        };
        if (typeof options.use == 'boolean') {
            this.bind('initMenu:after', enable);
        }
        else {
            media.add(options.use, enable, disable);
        }
        //	Tabs
        if (options.type == 'tabs') {
            iconbar.classList.add('mm-iconbar--tabs');
            iconbar.addEventListener('click', (evnt) => {
                const anchor = evnt.target.closest('.mm-iconbar__tab');
                if (!anchor) {
                    return;
                }
                if (anchor.matches('.mm-iconbar__tab--selected')) {
                    evnt.stopImmediatePropagation();
                    return;
                }
                try {
                    const panel = DOM.find(this.node.menu, `${anchor.getAttribute('href')}.mm-panel`)[0];
                    if (panel) {
                        evnt.preventDefault();
                        evnt.stopImmediatePropagation();
                        this.openPanel(panel, false);
                    }
                }
                catch (err) { }
            });
            const selectTab = (panel) => {
                DOM.find(iconbar, 'a').forEach((anchor) => {
                    anchor.classList.remove('mm-iconbar__tab--selected');
                });
                const anchor = DOM.find(iconbar, '[href="#' + panel.id + '"]')[0];
                if (anchor) {
                    anchor.classList.add('mm-iconbar__tab--selected');
                }
                else {
                    const parent = DOM.find(this.node.pnls, `#${panel.dataset.mmParent}`)[0];
                    if (parent) {
                        selectTab(parent.closest('.mm-panel'));
                    }
                }
            };
            this.bind('openPanel:before', selectTab);
        }
    }
}
