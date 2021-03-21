import Mmenu from './../../core/oncanvas/mmenu.oncanvas';
import options from './_options';
import { extendShorthandOptions } from './_options';
import * as DOM from '../../_modules/dom';
import { extend } from '../../_modules/helpers';
//	Add the options.
Mmenu.options.autoHeight = options;
export default function () {
    var _this = this;
    var options = extendShorthandOptions(this.opts.autoHeight);
    this.opts.autoHeight = extend(options, Mmenu.options.autoHeight);
    if (options.height != 'auto' && options.height != 'highest') {
        return;
    }
    var setHeight = (function () {
        var getCurrent = function () {
            var panel = DOM.children(_this.node.pnls, '.mm-panel_opened')[0];
            if (panel) {
                panel = measurablePanel(panel);
            }
            //	Fallback, just to be sure we have a panel.
            if (!panel) {
                panel = DOM.children(_this.node.pnls, '.mm-panel')[0];
            }
            return panel.scrollHeight;
        };
        var getHighest = function () {
            var highest = 0;
            DOM.children(_this.node.pnls, '.mm-panel').forEach(function (panel) {
                panel = measurablePanel(panel);
                highest = Math.max(highest, panel.scrollHeight);
            });
            return highest;
        };
        var measurablePanel = function (panel) {
            //	If it's a vertically expanding panel...
            if (panel.parentElement.matches('.mm-listitem_vertical')) {
                //	...find the first parent panel that isn't.
                panel = DOM.parents(panel, '.mm-panel').filter(function (panel) {
                    return !panel.parentElement.matches('.mm-listitem_vertical');
                })[0];
            }
            return panel;
        };
        return function () {
            if (_this.opts.offCanvas && !_this.vars.opened) {
                return;
            }
            var _hgh = 0;
            var _dif = _this.node.menu.offsetHeight - _this.node.pnls.offsetHeight;
            //	The "measuring" classname undoes some CSS to be able to measure the height.
            _this.node.menu.classList.add('mm-menu_autoheight-measuring');
            //	Measure the height.
            if (options.height == 'auto') {
                _hgh = getCurrent();
            }
            else if (options.height == 'highest') {
                _hgh = getHighest();
            }
            //	Set the height.
            _this.node.menu.style.height = _hgh + _dif + 'px';
            //	Remove the "measuring" classname.
            _this.node.menu.classList.remove('mm-menu_autoheight-measuring');
        };
    })();
    //	Add the autoheight class to the menu.
    this.bind('initMenu:after', function () {
        _this.node.menu.classList.add('mm-menu_autoheight');
    });
    if (this.opts.offCanvas) {
        //	Measure the height when opening the off-canvas menu.
        this.bind('open:start', setHeight);
    }
    if (options.height == 'highest') {
        //	Measure the height when initiating panels.
        this.bind('initPanels:after', setHeight);
    }
    if (options.height == 'auto') {
        //	Measure the height when updating listviews.
        this.bind('updateListview', setHeight);
        //	Measure the height when opening a panel.
        this.bind('openPanel:start', setHeight);
    }
}
