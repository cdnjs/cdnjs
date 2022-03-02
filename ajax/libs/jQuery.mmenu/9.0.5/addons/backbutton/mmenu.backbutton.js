import OPTIONS from './options';
import * as DOM from '../../_modules/dom';
import { extend } from '../../_modules/helpers';
export default function () {
    this.opts.backButton = this.opts.backButton || {};
    if (!this.opts.offCanvas.use) {
        return;
    }
    //	Extend options.
    const options = extend(this.opts.backButton, OPTIONS);
    const _menu = `#${this.node.menu.id}`;
    //	Close menu
    if (options.close) {
        var states = [];
        const setStates = () => {
            states = [_menu];
            DOM.children(this.node.pnls, '.mm-panel--opened, .mm-panel--parent').forEach((panel) => {
                states.push('#' + panel.id);
            });
        };
        this.bind('open:after', () => {
            history.pushState(null, document.title, _menu);
        });
        this.bind('open:after', setStates);
        this.bind('openPanel:after', setStates);
        this.bind('close:after', () => {
            states = [];
            history.back();
            history.pushState(null, document.title, location.pathname + location.search);
        });
        window.addEventListener('popstate', (evnt) => {
            if (this.node.menu.matches('.mm-menu--opened')) {
                if (states.length) {
                    states = states.slice(0, -1);
                    var hash = states[states.length - 1];
                    if (hash == _menu) {
                        this.close();
                    }
                    else {
                        this.openPanel(this.node.menu.querySelector(hash));
                        history.pushState(null, document.title, _menu);
                    }
                }
            }
        });
    }
    if (options.open) {
        window.addEventListener('popstate', (evnt) => {
            if (!this.node.menu.matches('.mm-menu--opened') && location.hash == _menu) {
                this.open();
            }
        });
    }
}
