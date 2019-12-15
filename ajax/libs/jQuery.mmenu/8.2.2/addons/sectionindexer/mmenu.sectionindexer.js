import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import * as DOM from '../../core/_dom';
import * as support from '../../core/_support';
import { extendShorthandOptions } from './_options';
import { extend } from '../../core/_helpers';
//  Add the options.
Mmenu.options.sectionIndexer = options;
export default function () {
    var options = extendShorthandOptions(this.opts.sectionIndexer);
    this.opts.sectionIndexer = extend(options, Mmenu.options.sectionIndexer);
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
                var anchor = evnt.target;
                if (anchor.matches('a')) {
                    evnt.preventDefault();
                }
            });
            //	Scroll onMouseOver / onTouchStart
            let mouseOverEvent = evnt => {
                if (!evnt.target.matches('a')) {
                    return;
                }
                var letter = evnt.target.textContent, panel = DOM.children(this.node.pnls, '.mm-panel_opened')[0];
                var newTop = -1, oldTop = panel.scrollTop;
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
        this.bind('openPanel:start', (panel) => {
            var active = DOM.find(panel, '.mm-divider').filter(divider => !divider.matches('.mm-hidden')).length;
            this.node.indx.classList[active ? 'add' : 'remove']('mm-sectionindexer_active');
        });
    });
}
