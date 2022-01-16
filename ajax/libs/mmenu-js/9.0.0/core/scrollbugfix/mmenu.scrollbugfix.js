import OPTIONS from './options';
import * as DOM from '../../_modules/dom';
import * as support from '../../_modules/support';
import { extend, touchDirection } from '../../_modules/helpers';
export default function () {
    //	The scrollBugFix add-on fixes a scrolling bug
    //		1) on touch devices
    //		2) in an off-canvas menu
    if (!support.touch || // 1
        !this.opts.offCanvas.use // 2
    ) {
        return;
    }
    this.opts.scrollBugFix = this.opts.scrollBugFix || {};
    //	Extend options.
    const options = extend(this.opts.scrollBugFix, OPTIONS);
    if (!options.fix) {
        return;
    }
    /** The touch-direction instance. */
    const touchDir = touchDirection(this.node.menu);
    //  Prevent the page from scrolling when scrolling in the menu.
    this.node.menu.addEventListener('scroll', evnt => {
        evnt.preventDefault();
        evnt.stopPropagation();
    }, {
        //  Make sure to tell the browser the event will be prevented.
        passive: false,
    });
    //  Prevent the page from scrolling when dragging in the menu.
    this.node.menu.addEventListener('touchmove', evnt => {
        let wrapper = evnt.target.closest('.mm-panel, .mm-iconbar__top, .mm-iconbar__bottom');
        if (wrapper && wrapper.closest('.mm-listitem--vertical')) {
            wrapper = DOM.parents(wrapper, '.mm-panel').pop();
        }
        if (wrapper) {
            //  When dragging a non-scrollable panel/iconbar,
            //      we can simply stopPropagation.
            if (wrapper.scrollHeight === wrapper.offsetHeight) {
                evnt.stopPropagation();
            }
            //  When dragging a scrollable panel/iconbar,
            //      that is fully scrolled up (or down).
            //      It will not trigger the scroll event when dragging down (or up) (because you can't scroll up (or down)),
            //      so we need to match the dragging direction with the scroll position before preventDefault and stopPropagation,
            //      otherwise the panel would not scroll at all in any direction.
            else if (
            //  When scrolled up and dragging down
            (wrapper.scrollTop == 0 && touchDir.get() == 'down') ||
                //  When scrolled down and dragging up
                (wrapper.scrollHeight ==
                    wrapper.scrollTop + wrapper.offsetHeight &&
                    touchDir.get() == 'up')) {
                evnt.stopPropagation();
            }
            //  When dragging anything other than a panel/iconbar.
        }
        else {
            evnt.stopPropagation();
        }
    }, {
        //  Make sure to tell the browser the event can be prevented.
        passive: false,
    });
    //  Some small additional improvements
    //	Scroll the current opened panel to the top when opening the menu.
    this.bind('open:after', () => {
        var panel = DOM.children(this.node.pnls, '.mm-panel--opened')[0];
        if (panel) {
            panel.scrollTop = 0;
        }
    });
    //	Fix issue after device rotation change.
    window.addEventListener('orientationchange', (evnt) => {
        var panel = DOM.children(this.node.pnls, '.mm-panel--opened')[0];
        if (panel) {
            panel.scrollTop = 0;
            //	Apparently, changing the overflow-scrolling property triggers some event :)
            panel.style['-webkit-overflow-scrolling'] = 'auto';
            panel.style['-webkit-overflow-scrolling'] = 'touch';
        }
    });
}
