import Mmenu from '../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import { extendShorthandOptions } from './_options';
import * as DOM from '../../_modules/dom';
import { extend } from '../../_modules/helpers';
//	Add the options.
Mmenu.options.backButton = options;
export default function () {
    var _this = this;
    if (!this.opts.offCanvas) {
        return;
    }
    var options = extendShorthandOptions(this.opts.backButton);
    this.opts.backButton = extend(options, Mmenu.options.backButton);
    var _menu = '#' + this.node.menu.id;
    //	Close menu
    if (options.close) {
        var states = [];
        var setStates = function () {
            states = [_menu];
            DOM.children(_this.node.pnls, '.mm-panel_opened, .mm-panel_opened-parent').forEach(function (panel) {
                states.push('#' + panel.id);
            });
        };
        this.bind('open:finish', function () {
            history.pushState(null, document.title, _menu);
        });
        this.bind('open:finish', setStates);
        this.bind('openPanel:finish', setStates);
        this.bind('close:finish', function () {
            states = [];
            history.back();
            history.pushState(null, document.title, location.pathname + location.search);
        });
        window.addEventListener('popstate', function (evnt) {
            if (_this.vars.opened) {
                if (states.length) {
                    states = states.slice(0, -1);
                    var hash = states[states.length - 1];
                    if (hash == _menu) {
                        _this.close();
                    }
                    else {
                        _this.openPanel(_this.node.menu.querySelector(hash));
                        history.pushState(null, document.title, _menu);
                    }
                }
            }
        });
    }
    if (options.open) {
        window.addEventListener('popstate', function (evnt) {
            if (!_this.vars.opened && location.hash == _menu) {
                _this.open();
            }
        });
    }
}
