import * as DOM from '../../_modules/dom';
export default function () {
    var _this = this;
    //	Create the menu
    if (this.node.menu.matches('.navbar-collapse')) {
        //	No need for cloning the menu...
        if (this.conf.offCanvas) {
            this.conf.offCanvas.clone = false;
        }
        //	... We'll create a new menu
        var nav = DOM.create('nav'), panel = DOM.create('div');
        nav.append(panel);
        DOM.children(this.node.menu).forEach(function (child) {
            switch (true) {
                case child.matches('.navbar-nav'):
                    panel.append(cloneNav(child));
                    break;
                case child.matches('.dropdown-menu'):
                    panel.append(cloneDropdown(child));
                    break;
                case child.matches('.form-inline'):
                    _this.conf.searchfield.form = {
                        action: child.getAttribute('action') || null,
                        method: child.getAttribute('method') || null
                    };
                    _this.conf.searchfield.input = {
                        name: child.querySelector('input').getAttribute('name') ||
                            null
                    };
                    _this.conf.searchfield.clear = false;
                    _this.conf.searchfield.submit = true;
                    break;
                default:
                    panel.append(child.cloneNode(true));
                    break;
            }
        });
        //	Set the menu
        this.bind('initMenu:before', function () {
            document.body.prepend(nav);
            _this.node.menu = nav;
        });
        //	Hijack the toggler.
        var parent_1 = this.node.menu.parentElement;
        if (parent_1) {
            var toggler = parent_1.querySelector('.navbar-toggler');
            if (toggler) {
                // toggler.removeAttribute('data-target');
                delete toggler.dataset.target;
                toggler.removeAttribute('aria-controls');
                //	Remove all bound events.
                toggler.outerHTML = toggler.outerHTML;
                toggler = parent_1.querySelector('.navbar-toggler');
                //  Open the menu on-click.
                toggler.addEventListener('click', function (evnt) {
                    evnt.preventDefault();
                    evnt.stopImmediatePropagation();
                    _this[_this.vars.opened ? 'close' : 'open']();
                });
            }
        }
    }
    function cloneLink(anchor) {
        var link = DOM.create(anchor.matches('a') ? 'a' : 'span');
        //	Copy attributes
        var attr = ['href', 'title', 'target'];
        for (var a = 0; a < attr.length; a++) {
            if (typeof anchor.getAttribute(attr[a]) != 'undefined') {
                link.setAttribute(attr[a], anchor.getAttribute(attr[a]));
            }
        }
        //	Copy contents
        link.innerHTML = anchor.innerHTML;
        //	Remove Screen reader text.
        DOM.find(link, '.sr-only').forEach(function (sro) {
            sro.remove();
        });
        return link;
    }
    function cloneDropdown(dropdown) {
        var list = DOM.create('ul');
        DOM.children(dropdown).forEach(function (anchor) {
            var item = DOM.create('li');
            if (anchor.matches('.dropdown-divider')) {
                item.classList.add('Divider');
            }
            else if (anchor.matches('.dropdown-item')) {
                item.append(cloneLink(anchor));
            }
            list.append(item);
        });
        return list;
    }
    function cloneNav(nav) {
        var list = DOM.create('ul');
        DOM.find(nav, '.nav-item').forEach(function (anchor) {
            var item = DOM.create('li');
            if (anchor.matches('.active')) {
                item.classList.add('Selected');
            }
            if (!anchor.matches('.nav-link')) {
                var dropdown = DOM.children(anchor, '.dropdown-menu')[0];
                if (dropdown) {
                    item.append(cloneDropdown(dropdown));
                }
                anchor = DOM.children(anchor, '.nav-link')[0];
            }
            item.prepend(cloneLink(anchor));
            list.append(item);
        });
        return list;
    }
}
