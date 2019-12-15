import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import * as DOM from '../../core/_dom';
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
            if (!current.matches('.mm-panel')) {
                current = current.closest('.mm-panel');
            }
            if (!current.parentElement.matches('.mm-listitem_vertical')) {
                var text = DOM.find(current, '.mm-navbar__title')[0]
                    .textContent;
                if (text.length) {
                    crumbs.unshift(first
                        ? '<span>' + text + '</span>'
                        : '<a href="#' + current.id + '">' + text + '</a>');
                }
                first = false;
            }
            current = current['mmParent'];
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
    this.bind('openPanel:start', (panel) => {
        var crumbs = panel.querySelector('.mm-navbar__breadcrumbs');
        if (crumbs) {
            breadcrumbs.innerHTML = crumbs.innerHTML;
        }
    });
    //	Add screenreader / aria support
    this.bind('initNavbar:after:sr-aria', (panel) => {
        DOM.find(panel, '.mm-breadcrumbs a').forEach(anchor => {
            Mmenu.sr_aria(anchor, 'owns', anchor.getAttribute('href').slice(1));
        });
    });
}
