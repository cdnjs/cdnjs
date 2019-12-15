/**
 * gridstack.js 0.4.0
 * http://troolee.github.io/gridstack.js/
 * (c) 2014-2018 Pavel Reznikov, Dylan Weiss
 * gridstack.js may be freely distributed under the MIT license.
 * @preserve
*/
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'lodash'], factory);
    } else if (typeof exports !== 'undefined') {
        try { jQuery = require('jquery'); } catch (e) {}
        try { _ = require('lodash'); } catch (e) {}
        factory(jQuery, _);
    } else {
        factory(jQuery, _);
    }
})(function($, _) {

    var scope = window;

    var obsolete = function(f, oldName, newName) {
        var wrapper = function() {
            console.warn('gridstack.js: Function `' + oldName + '` is deprecated as of v0.2.5 and has been replaced ' +
            'with `' + newName + '`. It will be **completely** removed in v1.0.');
            return f.apply(this, arguments);
        };
        wrapper.prototype = f.prototype;

        return wrapper;
    };

    var obsoleteOpts = function(oldName, newName) {
        console.warn('gridstack.js: Option `' + oldName + '` is deprecated as of v0.2.5 and has been replaced with `' +
            newName + '`. It will be **completely** removed in v1.0.');
    };

    var Utils = {
        isIntercepted: function(a, b) {
            return !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
        },

        sort: function(nodes, dir, width) {
            width = width || _.chain(nodes).map(function(node) { return node.x + node.width; }).max().value();
            dir = dir != -1 ? 1 : -1;
            return _.sortBy(nodes, [function(n) { return dir * (n.x + n.y * width); }]);
        },

        createStylesheet: function(id) {
            var style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.setAttribute('data-gs-style-id', id);
            if (style.styleSheet) {
                style.styleSheet.cssText = '';
            } else {
                style.appendChild(document.createTextNode(''));
            }
            document.getElementsByTagName('head')[0].appendChild(style);
            return style.sheet;
        },

        removeStylesheet: function(id) {
            $('STYLE[data-gs-style-id=' + id + ']').remove();
        },

        insertCSSRule: function(sheet, selector, rules, index) {
            if (typeof sheet.insertRule === 'function') {
                sheet.insertRule(selector + '{' + rules + '}', index);
            } else if (typeof sheet.addRule === 'function') {
                sheet.addRule(selector, rules, index);
            }
        },

        toBool: function(v) {
            if (typeof v == 'boolean') {
                return v;
            }
            if (typeof v == 'string') {
                v = v.toLowerCase();
                return !(v === '' || v == 'no' || v == 'false' || v == '0');
            }
            return Boolean(v);
        },

        _collisionNodeCheck: function(n) {
            return n != this.node && Utils.isIntercepted(n, this.nn);
        },

        _didCollide: function(bn) {
            return Utils.isIntercepted({x: this.n.x, y: this.newY, width: this.n.width, height: this.n.height}, bn);
        },

        _isAddNodeIntercepted: function(n) {
            return Utils.isIntercepted({x: this.x, y: this.y, width: this.node.width, height: this.node.height}, n);
        },

        parseHeight: function(val) {
            var height = val;
            var heightUnit = 'px';
            if (height && _.isString(height)) {
                var match = height.match(/^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw)?$/);
                if (!match) {
                    throw new Error('Invalid height');
                }
                heightUnit = match[2] || 'px';
                height = parseFloat(match[1]);
            }
            return {height: height, unit: heightUnit};
        },

        removePositioningStyles: function(el) {
            var style = el[0].style;
            if (style.position) {
                style.removeProperty('position');
            }
            if (style.left) {
                style.removeProperty('left');
            }
            if (style.top) {
                style.removeProperty('top');
            }
            if (style.width) {
                style.removeProperty('width');
            }
            if (style.height) {
                style.removeProperty('height');
            }
        },
        getScrollParent: function(el) {
            var returnEl;
            if (el == null) {
                returnEl = null;
            } else if (el.scrollHeight > el.clientHeight) {
                returnEl = el;
            } else {
                returnEl = Utils.getScrollParent(el.parentNode);
            }
            return returnEl;
        },
        updateScrollPosition: function(el, ui, distance) {
            // is widget in view?
            var rect = el.getBoundingClientRect();
            var innerHeightOrClientHeight = (window.innerHeight || document.documentElement.clientHeight);
            if (rect.top < 0 ||
                rect.bottom > innerHeightOrClientHeight
            ) {
                // set scrollTop of first parent that scrolls
                // if parent is larger than el, set as low as possible
                // to get entire widget on screen
                var offsetDiffDown = rect.bottom - innerHeightOrClientHeight;
                var offsetDiffUp = rect.top;
                var scrollEl = Utils.getScrollParent(el);
                var prevScroll = scrollEl.scrollTop;
                if (scrollEl != null) {
                    if (rect.top < 0 && distance < 0) {
                        // moving up
                        if (el.offsetHeight > innerHeightOrClientHeight) {
                            scrollEl.scrollTop += distance;
                        } else {
                            scrollEl.scrollTop += Math.abs(offsetDiffUp) > Math.abs(distance) ? distance : offsetDiffUp;
                        }
                    } else if (distance > 0) {
                        // moving down
                        if (el.offsetHeight > innerHeightOrClientHeight) {
                            scrollEl.scrollTop += distance;
                        } else {
                            scrollEl.scrollTop += offsetDiffDown > distance ? distance : offsetDiffDown;
                        }
                    }
                    // move widget y by amount scrolled
                    ui.position.top += scrollEl.scrollTop - prevScroll;
                }
            }
        }
    };

    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    Utils.is_intercepted = obsolete(Utils.isIntercepted, 'is_intercepted', 'isIntercepted');

    Utils.create_stylesheet = obsolete(Utils.createStylesheet, 'create_stylesheet', 'createStylesheet');

    Utils.remove_stylesheet = obsolete(Utils.removeStylesheet, 'remove_stylesheet', 'removeStylesheet');

    Utils.insert_css_rule = obsolete(Utils.insertCSSRule, 'insert_css_rule', 'insertCSSRule');
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

    /**
    * @class GridStackDragDropPlugin
    * Base class for drag'n'drop plugin.
    */
    function GridStackDragDropPlugin(grid) {
        this.grid = grid;
    }

    GridStackDragDropPlugin.registeredPlugins = [];

    GridStackDragDropPlugin.registerPlugin = function(pluginClass) {
        GridStackDragDropPlugin.registeredPlugins.push(pluginClass);
    };

    GridStackDragDropPlugin.prototype.resizable = function(el, opts) {
        return this;
    };

    GridStackDragDropPlugin.prototype.draggable = function(el, opts) {
        return this;
    };

    GridStackDragDropPlugin.prototype.droppable = function(el, opts) {
        return this;
    };

    GridStackDragDropPlugin.prototype.isDroppable = function(el) {
        return false;
    };

    GridStackDragDropPlugin.prototype.on = function(el, eventName, callback) {
        return this;
    };


    var idSeq = 0;

    var GridStackEngine = function(width, onchange, floatMode, height, items) {
        this.width = width;
        this.float = floatMode || false;
        this.height = height || 0;

        this.nodes = items || [];
        this.onchange = onchange || function() {};

        this._updateCounter = 0;
        this._float = this.float;

        this._addedNodes = [];
        this._removedNodes = [];
    };

    GridStackEngine.prototype.batchUpdate = function() {
        this._updateCounter = 1;
        this.float = true;
    };

    GridStackEngine.prototype.commit = function() {
        if (this._updateCounter !== 0) {
            this._updateCounter = 0;
            this.float = this._float;
            this._packNodes();
            this._notify();
        }
    };

    // For Meteor support: https://github.com/troolee/gridstack.js/pull/272
    GridStackEngine.prototype.getNodeDataByDOMEl = function(el) {
        return _.find(this.nodes, function(n) { return el.get(0) === n.el.get(0); });
    };

    GridStackEngine.prototype._fixCollisions = function(node) {
        var self = this;
        this._sortNodes(-1);

        var nn = node;
        var hasLocked = Boolean(_.find(this.nodes, function(n) { return n.locked; }));
        if (!this.float && !hasLocked) {
            nn = {x: 0, y: node.y, width: this.width, height: node.height};
        }
        while (true) {
            var collisionNode = _.find(this.nodes, _.bind(Utils._collisionNodeCheck, {node: node, nn: nn}));
            if (typeof collisionNode == 'undefined') {
                return;
            }
            this.moveNode(collisionNode, collisionNode.x, node.y + node.height,
                collisionNode.width, collisionNode.height, true);
        }
    };

    GridStackEngine.prototype.isAreaEmpty = function(x, y, width, height) {
        var nn = {x: x || 0, y: y || 0, width: width || 1, height: height || 1};
        var collisionNode = _.find(this.nodes, _.bind(function(n) {
            return Utils.isIntercepted(n, nn);
        }, this));
        return collisionNode === null || typeof collisionNode === 'undefined';
    };

    GridStackEngine.prototype._sortNodes = function(dir) {
        this.nodes = Utils.sort(this.nodes, dir, this.width);
    };

    GridStackEngine.prototype._packNodes = function() {
        this._sortNodes();

        if (this.float) {
            _.each(this.nodes, _.bind(function(n, i) {
                if (n._updating || typeof n._origY == 'undefined' || n.y == n._origY) {
                    return;
                }

                var newY = n.y;
                while (newY >= n._origY) {
                    var collisionNode = _.chain(this.nodes)
                        .take(i)
                        .find(_.bind(Utils._didCollide, {n: n, newY: newY}))
                        .value();

                    if (!collisionNode) {
                        n._dirty = true;
                        n.y = newY;
                    }
                    --newY;
                }
            }, this));
        } else {
            _.each(this.nodes, _.bind(function(n, i) {
                if (n.locked) {
                    return;
                }
                while (n.y > 0) {
                    var newY = n.y - 1;
                    var canBeMoved = i === 0;

                    if (i > 0) {
                        var collisionNode = _.chain(this.nodes)
                            .take(i)
                            .find(_.bind(Utils._didCollide, {n: n, newY: newY}))
                            .value();
                        canBeMoved = typeof collisionNode == 'undefined';
                    }

                    if (!canBeMoved) {
                        break;
                    }
                    n._dirty = n.y != newY;
                    n.y = newY;
                }
            }, this));
        }
    };

    GridStackEngine.prototype._prepareNode = function(node, resizing) {
        node = _.defaults(node || {}, {width: 1, height: 1, x: 0, y: 0});

        node.x = parseInt('' + node.x);
        node.y = parseInt('' + node.y);
        node.width = parseInt('' + node.width);
        node.height = parseInt('' + node.height);
        node.autoPosition = node.autoPosition || false;
        node.noResize = node.noResize || false;
        node.noMove = node.noMove || false;

        if (node.width > this.width) {
            node.width = this.width;
        } else if (node.width < 1) {
            node.width = 1;
        }

        if (node.height < 1) {
            node.height = 1;
        }

        if (node.x < 0) {
            node.x = 0;
        }

        if (node.x + node.width > this.width) {
            if (resizing) {
                node.width = this.width - node.x;
            } else {
                node.x = this.width - node.width;
            }
        }

        if (node.y < 0) {
            node.y = 0;
        }

        return node;
    };

    GridStackEngine.prototype._notify = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args[0] = typeof args[0] === 'undefined' ? [] : [args[0]];
        args[1] = typeof args[1] === 'undefined' ? true : args[1];
        if (this._updateCounter) {
            return;
        }
        var deletedNodes = args[0].concat(this.getDirtyNodes());
        this.onchange(deletedNodes, args[1]);
    };

    GridStackEngine.prototype.cleanNodes = function() {
        if (this._updateCounter) {
            return;
        }
        _.each(this.nodes, function(n) {n._dirty = false; });
    };

    GridStackEngine.prototype.getDirtyNodes = function() {
        return _.filter(this.nodes, function(n) { return n._dirty; });
    };

    GridStackEngine.prototype.addNode = function(node, triggerAddEvent) {
        node = this._prepareNode(node);

        if (typeof node.maxWidth != 'undefined') { node.width = Math.min(node.width, node.maxWidth); }
        if (typeof node.maxHeight != 'undefined') { node.height = Math.min(node.height, node.maxHeight); }
        if (typeof node.minWidth != 'undefined') { node.width = Math.max(node.width, node.minWidth); }
        if (typeof node.minHeight != 'undefined') { node.height = Math.max(node.height, node.minHeight); }

        node._id = ++idSeq;
        node._dirty = true;

        if (node.autoPosition) {
            this._sortNodes();

            for (var i = 0;; ++i) {
                var x = i % this.width;
                var y = Math.floor(i / this.width);
                if (x + node.width > this.width) {
                    continue;
                }
                if (!_.find(this.nodes, _.bind(Utils._isAddNodeIntercepted, {x: x, y: y, node: node}))) {
                    node.x = x;
                    node.y = y;
                    break;
                }
            }
        }

        this.nodes.push(node);
        if (typeof triggerAddEvent != 'undefined' && triggerAddEvent) {
            this._addedNodes.push(_.clone(node));
        }

        this._fixCollisions(node);
        this._packNodes();
        this._notify();
        return node;
    };

    GridStackEngine.prototype.removeNode = function(node, detachNode) {
        detachNode = typeof detachNode === 'undefined' ? true : detachNode;
        this._removedNodes.push(_.clone(node));
        node._id = null;
        this.nodes = _.without(this.nodes, node);
        this._packNodes();
        this._notify(node, detachNode);
    };

    GridStackEngine.prototype.canMoveNode = function(node, x, y, width, height) {
        if (!this.isNodeChangedPosition(node, x, y, width, height)) {
            return false;
        }
        var hasLocked = Boolean(_.find(this.nodes, function(n) { return n.locked; }));

        if (!this.height && !hasLocked) {
            return true;
        }

        var clonedNode;
        var clone = new GridStackEngine(
            this.width,
            null,
            this.float,
            0,
            _.map(this.nodes, function(n) {
                if (n == node) {
                    clonedNode = $.extend({}, n);
                    return clonedNode;
                }
                return $.extend({}, n);
            }));

        if (typeof clonedNode === 'undefined') {
            return true;
        }

        clone.moveNode(clonedNode, x, y, width, height);

        var res = true;

        if (hasLocked) {
            res &= !Boolean(_.find(clone.nodes, function(n) {
                return n != clonedNode && Boolean(n.locked) && Boolean(n._dirty);
            }));
        }
        if (this.height) {
            res &= clone.getGridHeight() <= this.height;
        }

        return res;
    };

    GridStackEngine.prototype.canBePlacedWithRespectToHeight = function(node) {
        if (!this.height) {
            return true;
        }

        var clone = new GridStackEngine(
            this.width,
            null,
            this.float,
            0,
            _.map(this.nodes, function(n) { return $.extend({}, n); }));
        clone.addNode(node);
        return clone.getGridHeight() <= this.height;
    };

    GridStackEngine.prototype.isNodeChangedPosition = function(node, x, y, width, height) {
        if (typeof x != 'number') { x = node.x; }
        if (typeof y != 'number') { y = node.y; }
        if (typeof width != 'number') { width = node.width; }
        if (typeof height != 'number') { height = node.height; }

        if (typeof node.maxWidth != 'undefined') { width = Math.min(width, node.maxWidth); }
        if (typeof node.maxHeight != 'undefined') { height = Math.min(height, node.maxHeight); }
        if (typeof node.minWidth != 'undefined') { width = Math.max(width, node.minWidth); }
        if (typeof node.minHeight != 'undefined') { height = Math.max(height, node.minHeight); }

        if (node.x == x && node.y == y && node.width == width && node.height == height) {
            return false;
        }
        return true;
    };

    GridStackEngine.prototype.moveNode = function(node, x, y, width, height, noPack) {
        if (!this.isNodeChangedPosition(node, x, y, width, height)) {
            return node;
        }
        if (typeof x != 'number') { x = node.x; }
        if (typeof y != 'number') { y = node.y; }
        if (typeof width != 'number') { width = node.width; }
        if (typeof height != 'number') { height = node.height; }

        if (typeof node.maxWidth != 'undefined') { width = Math.min(width, node.maxWidth); }
        if (typeof node.maxHeight != 'undefined') { height = Math.min(height, node.maxHeight); }
        if (typeof node.minWidth != 'undefined') { width = Math.max(width, node.minWidth); }
        if (typeof node.minHeight != 'undefined') { height = Math.max(height, node.minHeight); }

        if (node.x == x && node.y == y && node.width == width && node.height == height) {
            return node;
        }

        var resizing = node.width != width;
        node._dirty = true;

        node.x = x;
        node.y = y;
        node.width = width;
        node.height = height;

        node.lastTriedX = x;
        node.lastTriedY = y;
        node.lastTriedWidth = width;
        node.lastTriedHeight = height;

        node = this._prepareNode(node, resizing);

        this._fixCollisions(node);
        if (!noPack) {
            this._packNodes();
            this._notify();
        }
        return node;
    };

    GridStackEngine.prototype.getGridHeight = function() {
        return _.reduce(this.nodes, function(memo, n) { return Math.max(memo, n.y + n.height); }, 0);
    };

    GridStackEngine.prototype.beginUpdate = function(node) {
        _.each(this.nodes, function(n) {
            n._origY = n.y;
        });
        node._updating = true;
    };

    GridStackEngine.prototype.endUpdate = function() {
        _.each(this.nodes, function(n) {
            n._origY = n.y;
        });
        var n = _.find(this.nodes, function(n) { return n._updating; });
        if (n) {
            n._updating = false;
        }
    };

    var GridStack = function(el, opts) {
        var self = this;
        var oneColumnMode, isAutoCellHeight;

        opts = opts || {};

        this.container = $(el);

        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        if (typeof opts.handle_class !== 'undefined') {
            opts.handleClass = opts.handle_class;
            obsoleteOpts('handle_class', 'handleClass');
        }
        if (typeof opts.item_class !== 'undefined') {
            opts.itemClass = opts.item_class;
            obsoleteOpts('item_class', 'itemClass');
        }
        if (typeof opts.placeholder_class !== 'undefined') {
            opts.placeholderClass = opts.placeholder_class;
            obsoleteOpts('placeholder_class', 'placeholderClass');
        }
        if (typeof opts.placeholder_text !== 'undefined') {
            opts.placeholderText = opts.placeholder_text;
            obsoleteOpts('placeholder_text', 'placeholderText');
        }
        if (typeof opts.cell_height !== 'undefined') {
            opts.cellHeight = opts.cell_height;
            obsoleteOpts('cell_height', 'cellHeight');
        }
        if (typeof opts.vertical_margin !== 'undefined') {
            opts.verticalMargin = opts.vertical_margin;
            obsoleteOpts('vertical_margin', 'verticalMargin');
        }
        if (typeof opts.min_width !== 'undefined') {
            opts.minWidth = opts.min_width;
            obsoleteOpts('min_width', 'minWidth');
        }
        if (typeof opts.static_grid !== 'undefined') {
            opts.staticGrid = opts.static_grid;
            obsoleteOpts('static_grid', 'staticGrid');
        }
        if (typeof opts.is_nested !== 'undefined') {
            opts.isNested = opts.is_nested;
            obsoleteOpts('is_nested', 'isNested');
        }
        if (typeof opts.always_show_resize_handle !== 'undefined') {
            opts.alwaysShowResizeHandle = opts.always_show_resize_handle;
            obsoleteOpts('always_show_resize_handle', 'alwaysShowResizeHandle');
        }
        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

        opts.itemClass = opts.itemClass || 'grid-stack-item';
        var isNested = this.container.closest('.' + opts.itemClass).length > 0;

        this.opts = _.defaults(opts || {}, {
            width: parseInt(this.container.attr('data-gs-width')) || 12,
            height: parseInt(this.container.attr('data-gs-height')) || 0,
            itemClass: 'grid-stack-item',
            placeholderClass: 'grid-stack-placeholder',
            placeholderText: '',
            handle: '.grid-stack-item-content',
            handleClass: null,
            cellHeight: 60,
            verticalMargin: 20,
            auto: true,
            minWidth: 768,
            float: false,
            staticGrid: false,
            _class: 'grid-stack-instance-' + (Math.random() * 10000).toFixed(0),
            animate: Boolean(this.container.attr('data-gs-animate')) || false,
            alwaysShowResizeHandle: opts.alwaysShowResizeHandle || false,
            resizable: _.defaults(opts.resizable || {}, {
                autoHide: !(opts.alwaysShowResizeHandle || false),
                handles: 'se'
            }),
            draggable: _.defaults(opts.draggable || {}, {
                handle: (opts.handleClass ? '.' + opts.handleClass : (opts.handle ? opts.handle : '')) ||
                    '.grid-stack-item-content',
                scroll: false,
                appendTo: 'body'
            }),
            disableDrag: opts.disableDrag || false,
            disableResize: opts.disableResize || false,
            rtl: 'auto',
            removable: false,
            removableOptions: _.defaults(opts.removableOptions || {}, {
                accept: '.' + opts.itemClass
            }),
            removeTimeout: 2000,
            verticalMarginUnit: 'px',
            cellHeightUnit: 'px',
            disableOneColumnMode: opts.disableOneColumnMode || false,
            oneColumnModeClass: opts.oneColumnModeClass || 'grid-stack-one-column-mode',
            ddPlugin: null
        });

        if (this.opts.ddPlugin === false) {
            this.opts.ddPlugin = GridStackDragDropPlugin;
        } else if (this.opts.ddPlugin === null) {
            this.opts.ddPlugin = _.first(GridStackDragDropPlugin.registeredPlugins) || GridStackDragDropPlugin;
        }

        this.dd = new this.opts.ddPlugin(this);

        if (this.opts.rtl === 'auto') {
            this.opts.rtl = this.container.css('direction') === 'rtl';
        }

        if (this.opts.rtl) {
            this.container.addClass('grid-stack-rtl');
        }

        this.opts.isNested = isNested;

        isAutoCellHeight = this.opts.cellHeight === 'auto';
        if (isAutoCellHeight) {
            self.cellHeight(self.cellWidth(), true);
        } else {
            this.cellHeight(this.opts.cellHeight, true);
        }
        this.verticalMargin(this.opts.verticalMargin, true);

        this.container.addClass(this.opts._class);

        this._setStaticClass();

        if (isNested) {
            this.container.addClass('grid-stack-nested');
        }

        this._initStyles();

        this.grid = new GridStackEngine(this.opts.width, function(nodes, detachNode) {
            detachNode = typeof detachNode === 'undefined' ? true : detachNode;
            var maxHeight = 0;
            _.each(this.nodes, function(n) {
                maxHeight = Math.max(maxHeight, n.y + n.height);
            });
            _.each(nodes, function(n) {
                if (detachNode && n._id === null) {
                    if (n.el) {
                        n.el.remove();
                    }
                } else {
                    n.el
                        .attr('data-gs-x', n.x)
                        .attr('data-gs-y', n.y)
                        .attr('data-gs-width', n.width)
                        .attr('data-gs-height', n.height);
                }
            });
            self._updateStyles(maxHeight + 10);
        }, this.opts.float, this.opts.height);

        if (this.opts.auto) {
            var elements = [];
            var _this = this;
            this.container.children('.' + this.opts.itemClass + ':not(.' + this.opts.placeholderClass + ')')
                .each(function(index, el) {
                el = $(el);
                elements.push({
                    el: el,
                    i: parseInt(el.attr('data-gs-x')) + parseInt(el.attr('data-gs-y')) * _this.opts.width
                });
            });
            _.chain(elements).sortBy(function(x) { return x.i; }).each(function(i) {
                self._prepareElement(i.el);
            }).value();
        }

        this.setAnimation(this.opts.animate);

        this.placeholder = $(
            '<div class="' + this.opts.placeholderClass + ' ' + this.opts.itemClass + '">' +
            '<div class="placeholder-content">' + this.opts.placeholderText + '</div></div>').hide();

        this._updateContainerHeight();

        this._updateHeightsOnResize = _.throttle(function() {
            self.cellHeight(self.cellWidth(), false);
        }, 100);

        this.onResizeHandler = function() {
            if (isAutoCellHeight) {
                self._updateHeightsOnResize();
            }

            if (self._isOneColumnMode() && !self.opts.disableOneColumnMode) {
                if (oneColumnMode) {
                    return;
                }
                self.container.addClass(self.opts.oneColumnModeClass);
                oneColumnMode = true;

                self.grid._sortNodes();
                _.each(self.grid.nodes, function(node) {
                    self.container.append(node.el);

                    if (self.opts.staticGrid) {
                        return;
                    }
                    self.dd.draggable(node.el, 'disable');
                    self.dd.resizable(node.el, 'disable');

                    node.el.trigger('resize');
                });
            } else {
                if (!oneColumnMode) {
                    return;
                }

                self.container.removeClass(self.opts.oneColumnModeClass);
                oneColumnMode = false;

                if (self.opts.staticGrid) {
                    return;
                }

                _.each(self.grid.nodes, function(node) {
                    if (!node.noMove && !self.opts.disableDrag) {
                        self.dd.draggable(node.el, 'enable');
                    }
                    if (!node.noResize && !self.opts.disableResize) {
                        self.dd.resizable(node.el, 'enable');
                    }

                    node.el.trigger('resize');
                });
            }
        };

        $(window).resize(this.onResizeHandler);
        this.onResizeHandler();

        if (!self.opts.staticGrid && typeof self.opts.removable === 'string') {
            var trashZone = $(self.opts.removable);
            if (!this.dd.isDroppable(trashZone)) {
                this.dd.droppable(trashZone, self.opts.removableOptions);
            }
            this.dd
                .on(trashZone, 'dropover', function(event, ui) {
                    var el = $(ui.draggable);
                    var node = el.data('_gridstack_node');
                    if (node._grid !== self) {
                        return;
                    }
                    el.data('inTrashZone', true);
                    self._setupRemovingTimeout(el);
                })
                .on(trashZone, 'dropout', function(event, ui) {
                    var el = $(ui.draggable);
                    var node = el.data('_gridstack_node');
                    if (node._grid !== self) {
                        return;
                    }
                    el.data('inTrashZone', false);
                    self._clearRemovingTimeout(el);
                });
        }

        if (!self.opts.staticGrid && self.opts.acceptWidgets) {
            var draggingElement = null;

            var onDrag = function(event, ui) {
                var el = draggingElement;
                var node = el.data('_gridstack_node');
                var pos = self.getCellFromPixel({left: event.pageX, top: event.pageY}, true);
                var x = Math.max(0, pos.x);
                var y = Math.max(0, pos.y);
                if (!node._added) {
                    node._added = true;

                    node.el = el;
                    node.autoPosition = true;
                    node.x = x;
                    node.y = y;
                    self.grid.cleanNodes();
                    self.grid.beginUpdate(node);
                    self.grid.addNode(node);

                    self.container.append(self.placeholder);
                    self.placeholder
                        .attr('data-gs-x', node.x)
                        .attr('data-gs-y', node.y)
                        .attr('data-gs-width', node.width)
                        .attr('data-gs-height', node.height)
                        .show();
                    node.el = self.placeholder;
                    node._beforeDragX = node.x;
                    node._beforeDragY = node.y;

                    self._updateContainerHeight();
                }
                if (!self.grid.canMoveNode(node, x, y)) {
                    return;
                }
                self.grid.moveNode(node, x, y);
                self._updateContainerHeight();
            };

            this.dd
                .droppable(self.container, {
                    accept: function(el) {
                        el = $(el);
                        var node = el.data('_gridstack_node');
                        if (node && node._grid === self) {
                            return false;
                        }
                        return el.is(self.opts.acceptWidgets === true ? '.grid-stack-item' : self.opts.acceptWidgets);
                    }
                })
                .on(self.container, 'dropover', function(event, ui) {
                    var offset = self.container.offset();
                    var el = $(ui.draggable);
                    var cellWidth = self.cellWidth();
                    var cellHeight = self.cellHeight();
                    var origNode = el.data('_gridstack_node');

                    var width = origNode ? origNode.width : (Math.ceil(el.outerWidth() / cellWidth));
                    var height = origNode ? origNode.height : (Math.ceil(el.outerHeight() / cellHeight));

                    draggingElement = el;

                    var node = self.grid._prepareNode({width: width, height: height, _added: false, _temporary: true});
                    el.data('_gridstack_node', node);
                    el.data('_gridstack_node_orig', origNode);

                    el.on('drag', onDrag);
                })
                .on(self.container, 'dropout', function(event, ui) {
                    var el = $(ui.draggable);
                    if (!el.data('_gridstack_node')) {
                        return;
                    }
                    el.unbind('drag', onDrag);
                    var node = el.data('_gridstack_node');
                    node.el = null;
                    self.grid.removeNode(node);
                    self.placeholder.detach();
                    self._updateContainerHeight();
                    el.data('_gridstack_node', el.data('_gridstack_node_orig'));
                })
                .on(self.container, 'drop', function(event, ui) {
                    self.placeholder.detach();

                    var node = $(ui.draggable).data('_gridstack_node');
                    node._grid = self;
                    var el = $(ui.draggable).clone(false);
                    el.data('_gridstack_node', node);
                    var originalNode = $(ui.draggable).data('_gridstack_node_orig');
                    if (typeof originalNode !== 'undefined' && typeof originalNode._grid !== 'undefined') {
                        originalNode._grid._triggerRemoveEvent();
                    }
                    $(ui.helper).remove();
                    node.el = el;
                    self.placeholder.hide();
                    Utils.removePositioningStyles(el);
                    el.find('div.ui-resizable-handle').remove();

                    el
                        .attr('data-gs-x', node.x)
                        .attr('data-gs-y', node.y)
                        .attr('data-gs-width', node.width)
                        .attr('data-gs-height', node.height)
                        .addClass(self.opts.itemClass)
                        .enableSelection()
                        .removeData('draggable')
                        .removeClass('ui-draggable ui-draggable-dragging ui-draggable-disabled')
                        .unbind('drag', onDrag);
                    self.container.append(el);
                    self._prepareElementsByNode(el, node);
                    self._updateContainerHeight();
                    self.grid._addedNodes.push(node);
                    self._triggerAddEvent();
                    self._triggerChangeEvent();

                    self.grid.endUpdate();
                    $(ui.draggable).unbind('drag', onDrag);
                    $(ui.draggable).removeData('_gridstack_node');
                    $(ui.draggable).removeData('_gridstack_node_orig');
                });
        }
    };

    GridStack.prototype._triggerChangeEvent = function(forceTrigger) {
        var elements = this.grid.getDirtyNodes();
        var hasChanges = false;

        var eventParams = [];
        if (elements && elements.length) {
            eventParams.push(elements);
            hasChanges = true;
        }

        if (hasChanges || forceTrigger === true) {
            this.container.trigger('change', eventParams);
        }
    };

    GridStack.prototype._triggerAddEvent = function() {
        if (this.grid._addedNodes && this.grid._addedNodes.length > 0) {
            this.container.trigger('added', [_.map(this.grid._addedNodes, _.clone)]);
            this.grid._addedNodes = [];
        }
    };

    GridStack.prototype._triggerRemoveEvent = function() {
        if (this.grid._removedNodes && this.grid._removedNodes.length > 0) {
            this.container.trigger('removed', [_.map(this.grid._removedNodes, _.clone)]);
            this.grid._removedNodes = [];
        }
    };

    GridStack.prototype._initStyles = function() {
        if (this._stylesId) {
            Utils.removeStylesheet(this._stylesId);
        }
        this._stylesId = 'gridstack-style-' + (Math.random() * 100000).toFixed();
        this._styles = Utils.createStylesheet(this._stylesId);
        if (this._styles !== null) {
            this._styles._max = 0;
        }
    };

    GridStack.prototype._updateStyles = function(maxHeight) {
        if (this._styles === null || typeof this._styles === 'undefined') {
            return;
        }

        var prefix = '.' + this.opts._class + ' .' + this.opts.itemClass;
        var self = this;
        var getHeight;

        if (typeof maxHeight == 'undefined') {
            maxHeight = this._styles._max;
        }
        this._initStyles();
        this._updateContainerHeight();
        if (!this.opts.cellHeight) { // The rest will be handled by CSS
            return ;
        }
        if (this._styles._max !== 0 && maxHeight <= this._styles._max) { // Keep this._styles._max increasing
            return ;
        }

        if (!this.opts.verticalMargin || this.opts.cellHeightUnit === this.opts.verticalMarginUnit) {
            getHeight = function(nbRows, nbMargins) {
                return (self.opts.cellHeight * nbRows + self.opts.verticalMargin * nbMargins) +
                    self.opts.cellHeightUnit;
            };
        } else {
            getHeight = function(nbRows, nbMargins) {
                if (!nbRows || !nbMargins) {
                    return (self.opts.cellHeight * nbRows + self.opts.verticalMargin * nbMargins) +
                        self.opts.cellHeightUnit;
                }
                return 'calc(' + ((self.opts.cellHeight * nbRows) + self.opts.cellHeightUnit) + ' + ' +
                    ((self.opts.verticalMargin * nbMargins) + self.opts.verticalMarginUnit) + ')';
            };
        }

        if (this._styles._max === 0) {
            Utils.insertCSSRule(this._styles, prefix, 'min-height: ' + getHeight(1, 0) + ';', 0);
        }

        if (maxHeight > this._styles._max) {
            for (var i = this._styles._max; i < maxHeight; ++i) {
                Utils.insertCSSRule(this._styles,
                    prefix + '[data-gs-height="' + (i + 1) + '"]',
                    'height: ' + getHeight(i + 1, i) + ';',
                    i
                );
                Utils.insertCSSRule(this._styles,
                    prefix + '[data-gs-min-height="' + (i + 1) + '"]',
                    'min-height: ' + getHeight(i + 1, i) + ';',
                    i
                );
                Utils.insertCSSRule(this._styles,
                    prefix + '[data-gs-max-height="' + (i + 1) + '"]',
                    'max-height: ' + getHeight(i + 1, i) + ';',
                    i
                );
                Utils.insertCSSRule(this._styles,
                    prefix + '[data-gs-y="' + i + '"]',
                    'top: ' + getHeight(i, i) + ';',
                    i
                );
            }
            this._styles._max = maxHeight;
        }
    };

    GridStack.prototype._updateContainerHeight = function() {
        if (this.grid._updateCounter) {
            return;
        }
        var height = this.grid.getGridHeight();
        // check for css min height. Each row is cellHeight + verticalMargin, until last one which has no margin below
        var cssMinHeight = parseInt(this.container.css('min-height'));
        if (cssMinHeight > 0) {
            var minHeight = (cssMinHeight + this.opts.verticalMargin) / (this.cellHeight() + this.opts.verticalMargin);
            if (height < minHeight) {
                height = minHeight;
            }
        }
        this.container.attr('data-gs-current-height', height);
        if (!this.opts.cellHeight) {
            return ;
        }
        if (!this.opts.verticalMargin) {
            this.container.css('height', (height * (this.opts.cellHeight)) + this.opts.cellHeightUnit);
        } else if (this.opts.cellHeightUnit === this.opts.verticalMarginUnit) {
            this.container.css('height', (height * (this.opts.cellHeight + this.opts.verticalMargin) -
                this.opts.verticalMargin) + this.opts.cellHeightUnit);
        } else {
            this.container.css('height', 'calc(' + ((height * (this.opts.cellHeight)) + this.opts.cellHeightUnit) +
                ' + ' + ((height * (this.opts.verticalMargin - 1)) + this.opts.verticalMarginUnit) + ')');
        }
    };

    GridStack.prototype._isOneColumnMode = function() {
        return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) <=
            this.opts.minWidth;
    };

    GridStack.prototype._setupRemovingTimeout = function(el) {
        var self = this;
        var node = $(el).data('_gridstack_node');

        if (node._removeTimeout || !self.opts.removable) {
            return;
        }
        node._removeTimeout = setTimeout(function() {
            el.addClass('grid-stack-item-removing');
            node._isAboutToRemove = true;
        }, self.opts.removeTimeout);
    };

    GridStack.prototype._clearRemovingTimeout = function(el) {
        var node = $(el).data('_gridstack_node');

        if (!node._removeTimeout) {
            return;
        }
        clearTimeout(node._removeTimeout);
        node._removeTimeout = null;
        el.removeClass('grid-stack-item-removing');
        node._isAboutToRemove = false;
    };

    GridStack.prototype._prepareElementsByNode = function(el, node) {
        var self = this;

        var cellWidth;
        var cellHeight;

        var dragOrResize = function(event, ui) {
            var x = Math.round(ui.position.left / cellWidth);
            var y = Math.floor((ui.position.top + cellHeight / 2) / cellHeight);
            var width;
            var height;

            if (event.type != 'drag') {
                width = Math.round(ui.size.width / cellWidth);
                height = Math.round(ui.size.height / cellHeight);
            }

            if (event.type == 'drag') {
                var distance = ui.position.top - node._prevYPix;
                node._prevYPix = ui.position.top;
                Utils.updateScrollPosition(el[0], ui, distance);
                if (el.data('inTrashZone') || x < 0 || x >= self.grid.width || y < 0 ||
                    (!self.grid.float && y > self.grid.getGridHeight())) {
                    if (!node._temporaryRemoved) {
                        if (self.opts.removable === true) {
                            self._setupRemovingTimeout(el);
                        }

                        x = node._beforeDragX;
                        y = node._beforeDragY;

                        self.placeholder.detach();
                        self.placeholder.hide();
                        self.grid.removeNode(node);
                        self._updateContainerHeight();

                        node._temporaryRemoved = true;
                    }
                } else {
                    self._clearRemovingTimeout(el);

                    if (node._temporaryRemoved) {
                        self.grid.addNode(node);
                        self.placeholder
                            .attr('data-gs-x', x)
                            .attr('data-gs-y', y)
                            .attr('data-gs-width', width)
                            .attr('data-gs-height', height)
                            .show();
                        self.container.append(self.placeholder);
                        node.el = self.placeholder;
                        node._temporaryRemoved = false;
                    }
                }
            } else if (event.type == 'resize')  {
                if (x < 0) {
                    return;
                }
            }
            // width and height are undefined if not resizing
            var lastTriedWidth = typeof width !== 'undefined' ? width : node.lastTriedWidth;
            var lastTriedHeight = typeof height !== 'undefined' ? height : node.lastTriedHeight;
            if (!self.grid.canMoveNode(node, x, y, width, height) ||
                (node.lastTriedX === x && node.lastTriedY === y &&
                node.lastTriedWidth === lastTriedWidth && node.lastTriedHeight === lastTriedHeight)) {
                return;
            }
            node.lastTriedX = x;
            node.lastTriedY = y;
            node.lastTriedWidth = width;
            node.lastTriedHeight = height;
            self.grid.moveNode(node, x, y, width, height);
            self._updateContainerHeight();
        };

        var onStartMoving = function(event, ui) {
            self.container.append(self.placeholder);
            var o = $(this);
            self.grid.cleanNodes();
            self.grid.beginUpdate(node);
            cellWidth = self.cellWidth();
            var strictCellHeight = Math.ceil(o.outerHeight() / o.attr('data-gs-height'));
            cellHeight = self.container.height() / parseInt(self.container.attr('data-gs-current-height'));
            self.placeholder
                .attr('data-gs-x', o.attr('data-gs-x'))
                .attr('data-gs-y', o.attr('data-gs-y'))
                .attr('data-gs-width', o.attr('data-gs-width'))
                .attr('data-gs-height', o.attr('data-gs-height'))
                .show();
            node.el = self.placeholder;
            node._beforeDragX = node.x;
            node._beforeDragY = node.y;
            node._prevYPix = ui.position.top;

            self.dd.resizable(el, 'option', 'minWidth', cellWidth * (node.minWidth || 1));
            self.dd.resizable(el, 'option', 'minHeight', strictCellHeight * (node.minHeight || 1));

            if (event.type == 'resizestart') {
                o.find('.grid-stack-item').trigger('resizestart');
            }
        };

        var onEndMoving = function(event, ui) {
            var o = $(this);
            if (!o.data('_gridstack_node')) {
                return;
            }

            var forceNotify = false;
            self.placeholder.detach();
            node.el = o;
            self.placeholder.hide();

            if (node._isAboutToRemove) {
                forceNotify = true;
                var gridToNotify = el.data('_gridstack_node')._grid;
                gridToNotify._triggerRemoveEvent();
                el.removeData('_gridstack_node');
                el.remove();
            } else {
                self._clearRemovingTimeout(el);
                if (!node._temporaryRemoved) {
                    Utils.removePositioningStyles(o);
                    o
                        .attr('data-gs-x', node.x)
                        .attr('data-gs-y', node.y)
                        .attr('data-gs-width', node.width)
                        .attr('data-gs-height', node.height);
                } else {
                    Utils.removePositioningStyles(o);
                    o
                        .attr('data-gs-x', node._beforeDragX)
                        .attr('data-gs-y', node._beforeDragY)
                        .attr('data-gs-width', node.width)
                        .attr('data-gs-height', node.height);
                    node.x = node._beforeDragX;
                    node.y = node._beforeDragY;
                    node._temporaryRemoved = false;
                    self.grid.addNode(node);
                }
            }
            self._updateContainerHeight();
            self._triggerChangeEvent(forceNotify);

            self.grid.endUpdate();

            var nestedGrids = o.find('.grid-stack');
            if (nestedGrids.length && event.type == 'resizestop') {
                nestedGrids.each(function(index, el) {
                    $(el).data('gridstack').onResizeHandler();
                });
                o.find('.grid-stack-item').trigger('resizestop');
                o.find('.grid-stack-item').trigger('gsresizestop');
            }
            if (event.type == 'resizestop') {
                self.container.trigger('gsresizestop', o);
            }
        };

        this.dd
            .draggable(el, {
                start: onStartMoving,
                stop: onEndMoving,
                drag: dragOrResize
            })
            .resizable(el, {
                start: onStartMoving,
                stop: onEndMoving,
                resize: dragOrResize
            });

        if (node.noMove || (this._isOneColumnMode() && !self.opts.disableOneColumnMode) || this.opts.disableDrag ||
            this.opts.staticGrid) {
            this.dd.draggable(el, 'disable');
        }

        if (node.noResize || (this._isOneColumnMode() && !self.opts.disableOneColumnMode) || this.opts.disableResize ||
            this.opts.staticGrid) {
            this.dd.resizable(el, 'disable');
        }

        el.attr('data-gs-locked', node.locked ? 'yes' : null);
    };

    GridStack.prototype._prepareElement = function(el, triggerAddEvent) {
        triggerAddEvent = typeof triggerAddEvent != 'undefined' ? triggerAddEvent : false;
        var self = this;
        el = $(el);

        el.addClass(this.opts.itemClass);
        var node = self.grid.addNode({
            x: parseInt(el.attr('data-gs-x'), 10),
            y: parseInt(el.attr('data-gs-y'), 10),
            width: el.attr('data-gs-width'),
            height: el.attr('data-gs-height'),
            maxWidth: el.attr('data-gs-max-width'),
            minWidth: el.attr('data-gs-min-width'),
            maxHeight: el.attr('data-gs-max-height'),
            minHeight: el.attr('data-gs-min-height'),
            autoPosition: Utils.toBool(el.attr('data-gs-auto-position')),
            noResize: Utils.toBool(el.attr('data-gs-no-resize')),
            noMove: Utils.toBool(el.attr('data-gs-no-move')),
            locked: Utils.toBool(el.attr('data-gs-locked')),
            resizeHandles: el.attr('data-gs-resize-handles'),
            el: el,
            id: el.attr('data-gs-id'),
            _grid: self
        }, triggerAddEvent);
        el.data('_gridstack_node', node);

        this._prepareElementsByNode(el, node);
    };

    GridStack.prototype.setAnimation = function(enable) {
        if (enable) {
            this.container.addClass('grid-stack-animate');
        } else {
            this.container.removeClass('grid-stack-animate');
        }
    };

    GridStack.prototype.addWidget = function(el, x, y, width, height, autoPosition, minWidth, maxWidth,
        minHeight, maxHeight, id) {
        el = $(el);
        if (typeof x != 'undefined') { el.attr('data-gs-x', x); }
        if (typeof y != 'undefined') { el.attr('data-gs-y', y); }
        if (typeof width != 'undefined') { el.attr('data-gs-width', width); }
        if (typeof height != 'undefined') { el.attr('data-gs-height', height); }
        if (typeof autoPosition != 'undefined') { el.attr('data-gs-auto-position', autoPosition ? 'yes' : null); }
        if (typeof minWidth != 'undefined') { el.attr('data-gs-min-width', minWidth); }
        if (typeof maxWidth != 'undefined') { el.attr('data-gs-max-width', maxWidth); }
        if (typeof minHeight != 'undefined') { el.attr('data-gs-min-height', minHeight); }
        if (typeof maxHeight != 'undefined') { el.attr('data-gs-max-height', maxHeight); }
        if (typeof id != 'undefined') { el.attr('data-gs-id', id); }
        this.container.append(el);
        this._prepareElement(el, true);
        this._triggerAddEvent();
        this._updateContainerHeight();
        this._triggerChangeEvent(true);

        return el;
    };

    GridStack.prototype.makeWidget = function(el) {
        el = $(el);
        this._prepareElement(el, true);
        this._triggerAddEvent();
        this._updateContainerHeight();
        this._triggerChangeEvent(true);

        return el;
    };

    GridStack.prototype.willItFit = function(x, y, width, height, autoPosition) {
        var node = {x: x, y: y, width: width, height: height, autoPosition: autoPosition};
        return this.grid.canBePlacedWithRespectToHeight(node);
    };

    GridStack.prototype.removeWidget = function(el, detachNode) {
        detachNode = typeof detachNode === 'undefined' ? true : detachNode;
        el = $(el);
        var node = el.data('_gridstack_node');

        // For Meteor support: https://github.com/troolee/gridstack.js/pull/272
        if (!node) {
            node = this.grid.getNodeDataByDOMEl(el);
        }

        this.grid.removeNode(node, detachNode);
        el.removeData('_gridstack_node');
        this._updateContainerHeight();
        if (detachNode) {
            el.remove();
        }
        this._triggerChangeEvent(true);
        this._triggerRemoveEvent();
    };

    GridStack.prototype.removeAll = function(detachNode) {
        _.each(this.grid.nodes, _.bind(function(node) {
            this.removeWidget(node.el, detachNode);
        }, this));
        this.grid.nodes = [];
        this._updateContainerHeight();
    };

    GridStack.prototype.destroy = function(detachGrid) {
        $(window).off('resize', this.onResizeHandler);
        this.disable();
        if (typeof detachGrid != 'undefined' && !detachGrid) {
            this.removeAll(false);
            this.container.removeData('gridstack');
        } else {
            this.container.remove();
        }
        Utils.removeStylesheet(this._stylesId);
        if (this.grid) {
            this.grid = null;
        }
    };

    GridStack.prototype.resizable = function(el, val) {
        var self = this;
        el = $(el);
        el.each(function(index, el) {
            el = $(el);
            var node = el.data('_gridstack_node');
            if (typeof node == 'undefined' || node === null) {
                return;
            }

            node.noResize = !(val || false);
            if (node.noResize || (self._isOneColumnMode() && !self.opts.disableOneColumnMode)) {
                self.dd.resizable(el, 'disable');
            } else {
                self.dd.resizable(el, 'enable');
            }
        });
        return this;
    };

    GridStack.prototype.movable = function(el, val) {
        var self = this;
        el = $(el);
        el.each(function(index, el) {
            el = $(el);
            var node = el.data('_gridstack_node');
            if (typeof node == 'undefined' || node === null) {
                return;
            }

            node.noMove = !(val || false);
            if (node.noMove || (self._isOneColumnMode() && !self.opts.disableOneColumnMode)) {
                self.dd.draggable(el, 'disable');
                el.removeClass('ui-draggable-handle');
            } else {
                self.dd.draggable(el, 'enable');
                el.addClass('ui-draggable-handle');
            }
        });
        return this;
    };

    GridStack.prototype.enableMove = function(doEnable, includeNewWidgets) {
        this.movable(this.container.children('.' + this.opts.itemClass), doEnable);
        if (includeNewWidgets) {
            this.opts.disableDrag = !doEnable;
        }
    };

    GridStack.prototype.enableResize = function(doEnable, includeNewWidgets) {
        this.resizable(this.container.children('.' + this.opts.itemClass), doEnable);
        if (includeNewWidgets) {
            this.opts.disableResize = !doEnable;
        }
    };

    GridStack.prototype.disable = function() {
        this.movable(this.container.children('.' + this.opts.itemClass), false);
        this.resizable(this.container.children('.' + this.opts.itemClass), false);
        this.container.trigger('disable');
    };

    GridStack.prototype.enable = function() {
        this.movable(this.container.children('.' + this.opts.itemClass), true);
        this.resizable(this.container.children('.' + this.opts.itemClass), true);
        this.container.trigger('enable');
    };

    GridStack.prototype.locked = function(el, val) {
        el = $(el);
        el.each(function(index, el) {
            el = $(el);
            var node = el.data('_gridstack_node');
            if (typeof node == 'undefined' || node === null) {
                return;
            }

            node.locked = (val || false);
            el.attr('data-gs-locked', node.locked ? 'yes' : null);
        });
        return this;
    };

    GridStack.prototype.maxHeight = function(el, val) {
        el = $(el);
        el.each(function(index, el) {
            el = $(el);
            var node = el.data('_gridstack_node');
            if (typeof node === 'undefined' || node === null) {
                return;
            }

            if (!isNaN(val)) {
                node.maxHeight = (val || false);
                el.attr('data-gs-max-height', val);
            }
        });
        return this;
    };

    GridStack.prototype.minHeight = function(el, val) {
        el = $(el);
        el.each(function(index, el) {
            el = $(el);
            var node = el.data('_gridstack_node');
            if (typeof node === 'undefined' || node === null) {
                return;
            }

            if (!isNaN(val)) {
                node.minHeight = (val || false);
                el.attr('data-gs-min-height', val);
            }
        });
        return this;
    };

    GridStack.prototype.maxWidth = function(el, val) {
        el = $(el);
        el.each(function(index, el) {
            el = $(el);
            var node = el.data('_gridstack_node');
            if (typeof node === 'undefined' || node === null) {
                return;
            }

            if (!isNaN(val)) {
                node.maxWidth = (val || false);
                el.attr('data-gs-max-width', val);
            }
        });
        return this;
    };

    GridStack.prototype.minWidth = function(el, val) {
        el = $(el);
        el.each(function(index, el) {
            el = $(el);
            var node = el.data('_gridstack_node');
            if (typeof node === 'undefined' || node === null) {
                return;
            }

            if (!isNaN(val)) {
                node.minWidth = (val || false);
                el.attr('data-gs-min-width', val);
            }
        });
        return this;
    };

    GridStack.prototype._updateElement = function(el, callback) {
        el = $(el).first();
        var node = el.data('_gridstack_node');
        if (typeof node == 'undefined' || node === null) {
            return;
        }

        var self = this;

        self.grid.cleanNodes();
        self.grid.beginUpdate(node);

        callback.call(this, el, node);

        self._updateContainerHeight();
        self._triggerChangeEvent();

        self.grid.endUpdate();
    };

    GridStack.prototype.resize = function(el, width, height) {
        this._updateElement(el, function(el, node) {
            width = (width !== null && typeof width != 'undefined') ? width : node.width;
            height = (height !== null && typeof height != 'undefined') ? height : node.height;

            this.grid.moveNode(node, node.x, node.y, width, height);
        });
    };

    GridStack.prototype.move = function(el, x, y) {
        this._updateElement(el, function(el, node) {
            x = (x !== null && typeof x != 'undefined') ? x : node.x;
            y = (y !== null && typeof y != 'undefined') ? y : node.y;

            this.grid.moveNode(node, x, y, node.width, node.height);
        });
    };

    GridStack.prototype.update = function(el, x, y, width, height) {
        this._updateElement(el, function(el, node) {
            x = (x !== null && typeof x != 'undefined') ? x : node.x;
            y = (y !== null && typeof y != 'undefined') ? y : node.y;
            width = (width !== null && typeof width != 'undefined') ? width : node.width;
            height = (height !== null && typeof height != 'undefined') ? height : node.height;

            this.grid.moveNode(node, x, y, width, height);
        });
    };

    GridStack.prototype.verticalMargin = function(val, noUpdate) {
        if (typeof val == 'undefined') {
            return this.opts.verticalMargin;
        }

        var heightData = Utils.parseHeight(val);

        if (this.opts.verticalMarginUnit === heightData.unit && this.opts.height === heightData.height) {
            return ;
        }
        this.opts.verticalMarginUnit = heightData.unit;
        this.opts.verticalMargin = heightData.height;

        if (!noUpdate) {
            this._updateStyles();
        }
    };

    GridStack.prototype.cellHeight = function(val, noUpdate) {
        if (typeof val == 'undefined') {
            if (this.opts.cellHeight) {
                return this.opts.cellHeight;
            }
            var o = this.container.children('.' + this.opts.itemClass).first();
            return Math.ceil(o.outerHeight() / o.attr('data-gs-height'));
        }
        var heightData = Utils.parseHeight(val);

        if (this.opts.cellHeightUnit === heightData.unit && this.opts.cellHeight === heightData.height) {
            return ;
        }
        this.opts.cellHeightUnit = heightData.unit;
        this.opts.cellHeight = heightData.height;

        if (!noUpdate) {
            this._updateStyles();
        }

    };

    GridStack.prototype.cellWidth = function() {
        return Math.round(this.container.outerWidth() / this.opts.width);
    };

    GridStack.prototype.getCellFromPixel = function(position, useOffset) {
        var containerPos = (typeof useOffset != 'undefined' && useOffset) ?
            this.container.offset() : this.container.position();
        var relativeLeft = position.left - containerPos.left;
        var relativeTop = position.top - containerPos.top;

        var columnWidth = Math.floor(this.container.width() / this.opts.width);
        var rowHeight = Math.floor(this.container.height() / parseInt(this.container.attr('data-gs-current-height')));

        return {x: Math.floor(relativeLeft / columnWidth), y: Math.floor(relativeTop / rowHeight)};
    };

    GridStack.prototype.batchUpdate = function() {
        this.grid.batchUpdate();
    };

    GridStack.prototype.commit = function() {
        this.grid.commit();
        this._updateContainerHeight();
    };

    GridStack.prototype.isAreaEmpty = function(x, y, width, height) {
        return this.grid.isAreaEmpty(x, y, width, height);
    };

    GridStack.prototype.setStatic = function(staticValue) {
        this.opts.staticGrid = (staticValue === true);
        this.enableMove(!staticValue);
        this.enableResize(!staticValue);
        this._setStaticClass();
    };

    GridStack.prototype._setStaticClass = function() {
        var staticClassName = 'grid-stack-static';

        if (this.opts.staticGrid === true) {
            this.container.addClass(staticClassName);
        } else {
            this.container.removeClass(staticClassName);
        }
    };

    GridStack.prototype._updateNodeWidths = function(oldWidth, newWidth) {
        this.grid._sortNodes();
        this.grid.batchUpdate();
        var node = {};
        for (var i = 0; i < this.grid.nodes.length; i++) {
            node = this.grid.nodes[i];
            this.update(node.el, Math.round(node.x * newWidth / oldWidth), undefined,
                Math.round(node.width * newWidth / oldWidth), undefined);
        }
        this.grid.commit();
    };

    GridStack.prototype.setGridWidth = function(gridWidth,doNotPropagate) {
        this.container.removeClass('grid-stack-' + this.opts.width);
        if (doNotPropagate !== true) {
            this._updateNodeWidths(this.opts.width, gridWidth);
        }
        this.opts.width = gridWidth;
        this.grid.width = gridWidth;
        this.container.addClass('grid-stack-' + gridWidth);
    };

    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    GridStackEngine.prototype.batch_update = obsolete(GridStackEngine.prototype.batchUpdate);
    GridStackEngine.prototype._fix_collisions = obsolete(GridStackEngine.prototype._fixCollisions,
        '_fix_collisions', '_fixCollisions');
    GridStackEngine.prototype.is_area_empty = obsolete(GridStackEngine.prototype.isAreaEmpty,
        'is_area_empty', 'isAreaEmpty');
    GridStackEngine.prototype._sort_nodes = obsolete(GridStackEngine.prototype._sortNodes,
        '_sort_nodes', '_sortNodes');
    GridStackEngine.prototype._pack_nodes = obsolete(GridStackEngine.prototype._packNodes,
        '_pack_nodes', '_packNodes');
    GridStackEngine.prototype._prepare_node = obsolete(GridStackEngine.prototype._prepareNode,
        '_prepare_node', '_prepareNode');
    GridStackEngine.prototype.clean_nodes = obsolete(GridStackEngine.prototype.cleanNodes,
        'clean_nodes', 'cleanNodes');
    GridStackEngine.prototype.get_dirty_nodes = obsolete(GridStackEngine.prototype.getDirtyNodes,
        'get_dirty_nodes', 'getDirtyNodes');
    GridStackEngine.prototype.add_node = obsolete(GridStackEngine.prototype.addNode,
        'add_node', 'addNode, ');
    GridStackEngine.prototype.remove_node = obsolete(GridStackEngine.prototype.removeNode,
        'remove_node', 'removeNode');
    GridStackEngine.prototype.can_move_node = obsolete(GridStackEngine.prototype.canMoveNode,
        'can_move_node', 'canMoveNode');
    GridStackEngine.prototype.move_node = obsolete(GridStackEngine.prototype.moveNode,
        'move_node', 'moveNode');
    GridStackEngine.prototype.get_grid_height = obsolete(GridStackEngine.prototype.getGridHeight,
        'get_grid_height', 'getGridHeight');
    GridStackEngine.prototype.begin_update = obsolete(GridStackEngine.prototype.beginUpdate,
        'begin_update', 'beginUpdate');
    GridStackEngine.prototype.end_update = obsolete(GridStackEngine.prototype.endUpdate,
        'end_update', 'endUpdate');
    GridStackEngine.prototype.can_be_placed_with_respect_to_height =
        obsolete(GridStackEngine.prototype.canBePlacedWithRespectToHeight,
        'can_be_placed_with_respect_to_height', 'canBePlacedWithRespectToHeight');
    GridStack.prototype._trigger_change_event = obsolete(GridStack.prototype._triggerChangeEvent,
        '_trigger_change_event', '_triggerChangeEvent');
    GridStack.prototype._init_styles = obsolete(GridStack.prototype._initStyles,
        '_init_styles', '_initStyles');
    GridStack.prototype._update_styles = obsolete(GridStack.prototype._updateStyles,
        '_update_styles', '_updateStyles');
    GridStack.prototype._update_container_height = obsolete(GridStack.prototype._updateContainerHeight,
        '_update_container_height', '_updateContainerHeight');
    GridStack.prototype._is_one_column_mode = obsolete(GridStack.prototype._isOneColumnMode,
        '_is_one_column_mode','_isOneColumnMode');
    GridStack.prototype._prepare_element = obsolete(GridStack.prototype._prepareElement,
        '_prepare_element', '_prepareElement');
    GridStack.prototype.set_animation = obsolete(GridStack.prototype.setAnimation,
        'set_animation', 'setAnimation');
    GridStack.prototype.add_widget = obsolete(GridStack.prototype.addWidget,
        'add_widget', 'addWidget');
    GridStack.prototype.make_widget = obsolete(GridStack.prototype.makeWidget,
        'make_widget', 'makeWidget');
    GridStack.prototype.will_it_fit = obsolete(GridStack.prototype.willItFit,
        'will_it_fit', 'willItFit');
    GridStack.prototype.remove_widget = obsolete(GridStack.prototype.removeWidget,
        'remove_widget', 'removeWidget');
    GridStack.prototype.remove_all = obsolete(GridStack.prototype.removeAll,
        'remove_all', 'removeAll');
    GridStack.prototype.min_height = obsolete(GridStack.prototype.minHeight,
        'min_height', 'minHeight');
    GridStack.prototype.min_width = obsolete(GridStack.prototype.minWidth,
        'min_width', 'minWidth');
    GridStack.prototype._update_element = obsolete(GridStack.prototype._updateElement,
        '_update_element', '_updateElement');
    GridStack.prototype.cell_height = obsolete(GridStack.prototype.cellHeight,
        'cell_height', 'cellHeight');
    GridStack.prototype.cell_width = obsolete(GridStack.prototype.cellWidth,
        'cell_width', 'cellWidth');
    GridStack.prototype.get_cell_from_pixel = obsolete(GridStack.prototype.getCellFromPixel,
        'get_cell_from_pixel', 'getCellFromPixel');
    GridStack.prototype.batch_update = obsolete(GridStack.prototype.batchUpdate,
        'batch_update', 'batchUpdate');
    GridStack.prototype.is_area_empty = obsolete(GridStack.prototype.isAreaEmpty,
        'is_area_empty', 'isAreaEmpty');
    GridStack.prototype.set_static = obsolete(GridStack.prototype.setStatic,
        'set_static', 'setStatic');
    GridStack.prototype._set_static_class = obsolete(GridStack.prototype._setStaticClass,
        '_set_static_class', '_setStaticClass');
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

    scope.GridStackUI = GridStack;

    scope.GridStackUI.Utils = Utils;
    scope.GridStackUI.Engine = GridStackEngine;
    scope.GridStackUI.GridStackDragDropPlugin = GridStackDragDropPlugin;

    $.fn.gridstack = function(opts) {
        return this.each(function() {
            var o = $(this);
            if (!o.data('gridstack')) {
                o
                    .data('gridstack', new GridStack(this, opts));
            }
        });
    };

    return scope.GridStackUI;
});
