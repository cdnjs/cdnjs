import * as DOM from '../../_modules/dom';
export default function (navbar) {
    //	Add content
    var breadcrumbs = DOM.create('div.mm-navbar__breadcrumbs');
    navbar.append(breadcrumbs);
    this.bind('initNavbar:after', (panel) => {
        if (panel.querySelector('.mm-navbar__breadcrumbs')) {
            return;
        }
        DOM.children(panel, '.mm-navbar')[0].classList.add('mm-hidden');
        var crumbs = [], breadcrumbs = DOM.create('span.mm-navbar__breadcrumbs'), current = panel, first = true;
        while (current) {
            current = current.closest('.mm-panel');
            if (!current.parentElement.matches('.mm-listitem--vertical')) {
                let title = DOM.find(current, '.mm-navbar__title span')[0];
                if (title) {
                    let text = title.textContent;
                    if (text.length) {
                        crumbs.unshift(first
                            ? `<span>${text}</span>`
                            : `<a 
                                    href="#${current.id}" 
                                    title="${this.i18n(this.conf.screenReader.openSubmenu)}"
                                    >${text}</a>`);
                    }
                }
                first = false;
            }
            current = DOM.find(this.node.pnls, `#${current.dataset.mmParent}`)[0];
        }
        if (this.conf.navbars.breadcrumbs.removeFirst) {
            crumbs.shift();
        }
        breadcrumbs.innerHTML = crumbs.join('<span class="mm-separator">' +
            this.conf.navbars.breadcrumbs.separator +
            '</span>');
        DOM.children(panel, '.mm-navbar')[0].append(breadcrumbs);
    });
    //	Update for to opened panel
    this.bind('openPanel:before', (panel) => {
        var crumbs = panel.querySelector('.mm-navbar__breadcrumbs');
        breadcrumbs.innerHTML = crumbs ? crumbs.innerHTML : '';
    });
}
