/**
 * gridstack.js 1.0.0-dev
 * http://troolee.github.io/gridstack.js/
 * (c) 2014-2017 Pavel Reznikov, Dylan Weiss
 * gridstack.js may be freely distributed under the MIT license.
 * @preserve
*/
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'lodash', 'gridstack', 'jquery-ui/data', 'jquery-ui/disable-selection', 'jquery-ui/focusable',
            'jquery-ui/form', 'jquery-ui/ie', 'jquery-ui/keycode', 'jquery-ui/labels', 'jquery-ui/jquery-1-7',
            'jquery-ui/plugin', 'jquery-ui/safe-active-element', 'jquery-ui/safe-blur', 'jquery-ui/scroll-parent',
            'jquery-ui/tabbable', 'jquery-ui/unique-id', 'jquery-ui/version', 'jquery-ui/widget',
            'jquery-ui/widgets/mouse', 'jquery-ui/widgets/draggable', 'jquery-ui/widgets/droppable',
            'jquery-ui/widgets/resizable'], factory);
    } else if (typeof exports !== 'undefined') {
        try { jQuery = require('jquery'); } catch (e) {}
        try { _ = require('lodash'); } catch (e) {}
        try { GridStackUI = require('gridstack'); } catch (e) {}
        factory(jQuery, _, GridStackUI);
    } else {
        factory(jQuery, _, GridStackUI);
    }
})(function($, _, GridStackUI) {

    var scope = window;

    /**
    * @class JQueryUIGridStackDragDropPlugin
    * jQuery UI implementation of drag'n'drop gridstack plugin.
    */
    function JQueryUIGridStackDragDropPlugin(grid) {
        GridStackUI.GridStackDragDropPlugin.call(this, grid);
    }

    GridStackUI.GridStackDragDropPlugin.registerPlugin(JQueryUIGridStackDragDropPlugin);

    JQueryUIGridStackDragDropPlugin.prototype = Object.create(GridStackUI.GridStackDragDropPlugin.prototype);
    JQueryUIGridStackDragDropPlugin.prototype.constructor = JQueryUIGridStackDragDropPlugin;

    JQueryUIGridStackDragDropPlugin.prototype.resizable = function(el, opts) {
        el = $(el);
        if (opts === 'disable' || opts === 'enable') {
            el.resizable(opts);
        } else if (opts === 'option') {
            var key = arguments[2];
            var value = arguments[3];
            el.resizable(opts, key, value);
        } else {
            var handles = el.data('gs-resize-handles') ? el.data('gs-resize-handles') :
                this.grid.opts.resizable.handles;
            el.resizable(_.extend({}, this.grid.opts.resizable, {
                handles: handles
            }, {
                start: opts.start || function() {},
                stop: opts.stop || function() {},
                resize: opts.resize || function() {}
            }));
        }
        return this;
    };

    JQueryUIGridStackDragDropPlugin.prototype.draggable = function(el, opts) {
        el = $(el);
        if (opts === 'disable' || opts === 'enable') {
            el.draggable(opts);
        } else {
            el.draggable(_.extend({}, this.grid.opts.draggable, {
                containment: this.grid.opts.isNested ? this.grid.container.parent() : null,
                start: opts.start || function() {},
                stop: opts.stop || function() {},
                drag: opts.drag || function() {}
            }));
        }
        return this;
    };

    JQueryUIGridStackDragDropPlugin.prototype.droppable = function(el, opts) {
        el = $(el);
        el.droppable(opts);
        return this;
    };

    JQueryUIGridStackDragDropPlugin.prototype.isDroppable = function(el, opts) {
        el = $(el);
        return Boolean(el.data('droppable'));
    };

    JQueryUIGridStackDragDropPlugin.prototype.on = function(el, eventName, callback) {
        $(el).on(eventName, callback);
        return this;
    };

    return JQueryUIGridStackDragDropPlugin;
});
