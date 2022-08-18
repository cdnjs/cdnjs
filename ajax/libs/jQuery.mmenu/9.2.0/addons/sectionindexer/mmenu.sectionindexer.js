import OPTIONS from './options';
import * as DOM from '../../_modules/dom';
import * as support from '../../_modules/support';
import { extend } from '../../_modules/helpers';
export default function () {
    this.opts.sectionIndexer = this.opts.sectionIndexer || {};
    //	Extend options.
    const options = extend(this.opts.sectionIndexer, OPTIONS);
    if (!options.add) {
        return;
    }
    this.bind('initPanels:after', () => {
        //	Add the indexer, only if it does not allready excists
        if (!this.node.indx) {
            let buttons = '';
            'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
                buttons += '<a href="#">' + letter + '</a>';
            });
            let indexer = DOM.create('div.mm-sectionindexer');
            indexer.innerHTML = buttons;
            this.node.pnls.prepend(indexer);
            this.node.indx = indexer;
            //	Prevent default behavior when clicking an anchor
            this.node.indx.addEventListener('click', evnt => {
                const anchor = evnt.target;
                if (anchor.matches('a')) {
                    evnt.preventDefault();
                }
            });
            //	Scroll onMouseOver / onTouchStart
            let mouseOverEvent = evnt => {
                if (!evnt.target.matches('a')) {
                    return;
                }
                const letter = evnt.target.textContent;
                const panel = DOM.children(this.node.pnls, '.mm-panel--opened')[0];
                let newTop = -1, oldTop = panel.scrollTop;
                panel.scrollTop = 0;
                DOM.find(panel, '.mm-divider')
                    .filter(divider => !divider.matches('.mm-hidden'))
                    .forEach(divider => {
                    if (newTop < 0 &&
                        letter ==
                            divider.textContent
                                .trim()
                                .slice(0, 1)
                                .toLowerCase()) {
                        newTop = divider.offsetTop;
                    }
                });
                panel.scrollTop = newTop > -1 ? newTop : oldTop;
            };
            if (support.touch) {
                this.node.indx.addEventListener('touchstart', mouseOverEvent);
                this.node.indx.addEventListener('touchmove', mouseOverEvent);
            }
            else {
                this.node.indx.addEventListener('mouseover', mouseOverEvent);
            }
        }
        //	Show or hide the indexer
        this.bind('openPanel:before', (panel) => {
            const active = DOM.find(panel, '.mm-divider').filter(divider => !divider.matches('.mm-hidden')).length;
            this.node.indx.classList[active ? 'add' : 'remove']('mm-sectionindexer--active');
        });
    });
}
