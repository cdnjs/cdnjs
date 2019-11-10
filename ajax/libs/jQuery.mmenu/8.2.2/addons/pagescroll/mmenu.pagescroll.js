import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import configs from './_configs';
import * as DOM from '../../core/_dom';
import { extendShorthandOptions } from './_options';
import { extend } from '../../core/_helpers';
//	Add the options and configs.
Mmenu.options.pageScroll = options;
Mmenu.configs.pageScroll = configs;
export default function () {
    var options = extendShorthandOptions(this.opts.pageScroll);
    this.opts.pageScroll = extend(options, Mmenu.options.pageScroll);
    var configs = this.conf.pageScroll;
    /** The currently "active" section */
    var section;
    function scrollTo() {
        if (section) {
            // section.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: section.getBoundingClientRect().top - configs.scrollOffset,
                behavior: 'smooth'
            });
        }
        section = null;
    }
    function anchorInPage(href) {
        try {
            if (href != '#' && href.slice(0, 1) == '#') {
                return Mmenu.node.page.querySelector(href);
            }
            return null;
        }
        catch (err) {
            return null;
        }
    }
    //	Scroll to section after clicking menu item.
    if (options.scroll) {
        this.bind('close:finish', () => {
            scrollTo();
        });
    }
    //	Add click behavior.
    //	Prevents default behavior when clicking an anchor.
    if (this.opts.offCanvas && options.scroll) {
        this.clck.push((anchor, args) => {
            section = null;
            //	Don't continue if the clicked anchor is not in the menu.
            if (!args.inMenu) {
                return;
            }
            //	Don't continue if the targeted section is not on the page.
            var href = anchor.getAttribute('href');
            section = anchorInPage(href);
            if (!section) {
                return;
            }
            //	If the sidebar add-on is "expanded"...
            if (this.node.menu.matches('.mm-menu_sidebar-expanded') &&
                this.node.wrpr.matches('.mm-wrapper_sidebar-expanded')) {
                //	... scroll the page to the section.
                scrollTo();
                //	... otherwise...
            }
            else {
                //	... close the menu.
                return {
                    close: true
                };
            }
        });
    }
    //	Update selected menu item after scrolling.
    if (options.update) {
        let scts = [];
        this.bind('initListview:after', (panel) => {
            let listitems = DOM.find(panel, '.mm-listitem');
            DOM.filterLIA(listitems).forEach(anchor => {
                var href = anchor.getAttribute('href');
                var section = anchorInPage(href);
                if (section) {
                    scts.unshift(section);
                }
            });
        });
        let _selected = -1;
        window.addEventListener('scroll', evnt => {
            var scrollTop = window.scrollY;
            for (var s = 0; s < scts.length; s++) {
                if (scts[s].offsetTop < scrollTop + configs.updateOffset) {
                    if (_selected !== s) {
                        _selected = s;
                        let panel = DOM.children(this.node.pnls, '.mm-panel_opened')[0];
                        let listitems = DOM.find(panel, '.mm-listitem');
                        let anchors = DOM.filterLIA(listitems);
                        anchors = anchors.filter(anchor => anchor.matches('[href="#' + scts[s].id + '"]'));
                        if (anchors.length) {
                            this.setSelected(anchors[0].parentElement);
                        }
                    }
                    break;
                }
            }
        });
    }
}
