import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import { extendShorthandOptions } from './_options';
import * as DOM from '../../_modules/dom';
import * as media from '../../_modules/matchmedia';
import { type, extend } from '../../_modules/helpers';
//  Add the options.
Mmenu.options.iconbar = options;
export default function () {
    var _this = this;
    var options = extendShorthandOptions(this.opts.iconbar);
    this.opts.iconbar = extend(options, Mmenu.options.iconbar);
    if (!options.use) {
        return;
    }
    var iconbar;
    ['top', 'bottom'].forEach(function (position, n) {
        var ctnt = options[position];
        //	Extend shorthand options
        if (type(ctnt) != 'array') {
            ctnt = [ctnt];
        }
        //	Create node
        var part = DOM.create('div.mm-iconbar__' + position);
        //	Add content
        for (var c = 0, l = ctnt.length; c < l; c++) {
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
        this.bind('initMenu:after', function () {
            _this.node.menu.prepend(iconbar);
        });
        //	En-/disable the iconbar.
        var classname_1 = 'mm-menu_iconbar-' + options.position;
        var enable = function () {
            _this.node.menu.classList.add(classname_1);
            Mmenu.sr_aria(iconbar, 'hidden', false);
        };
        var disable = function () {
            _this.node.menu.classList.remove(classname_1);
            Mmenu.sr_aria(iconbar, 'hidden', true);
        };
        if (typeof options.use == 'boolean') {
            this.bind('initMenu:after', enable);
        }
        else {
            media.add(options.use, enable, disable);
        }
        //	Tabs
        if (options.type == 'tabs') {
            iconbar.classList.add('mm-iconbar_tabs');
            iconbar.addEventListener('click', function (evnt) {
                var anchor = evnt.target;
                if (!anchor.matches('a')) {
                    return;
                }
                if (anchor.matches('.mm-iconbar__tab_selected')) {
                    evnt.stopImmediatePropagation();
                    return;
                }
                try {
                    var panel = _this.node.menu.querySelector(anchor.getAttribute('href'))[0];
                    if (panel && panel.matches('.mm-panel')) {
                        evnt.preventDefault();
                        evnt.stopImmediatePropagation();
                        _this.openPanel(panel, false);
                    }
                }
                catch (err) { }
            });
            var selectTab_1 = function (panel) {
                DOM.find(iconbar, 'a').forEach(function (anchor) {
                    anchor.classList.remove('mm-iconbar__tab_selected');
                });
                var anchor = DOM.find(iconbar, '[href="#' + panel.id + '"]')[0];
                if (anchor) {
                    anchor.classList.add('mm-iconbar__tab_selected');
                }
                else {
                    var parent_1 = panel['mmParent'];
                    if (parent_1) {
                        selectTab_1(parent_1.closest('.mm-panel'));
                    }
                }
            };
            this.bind('openPanel:start', selectTab_1);
        }
    }
}
