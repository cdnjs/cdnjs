/*!
 * ZUI: 树形图 - v1.8.0 - 2018-01-04
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2018 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: treemap.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


// Tree map data format
// {
//      text: main text,
//      html: main text as html format
//      style: node style,
//      textColor: text color,
//      color: background color
//      border: border style,
//      cableWidth: 2,
//      cableColor: '#808080'
//      cableStyle: 'solid'
// }


(function($, window, document, Math, undefined) {
    'use strict';

    var NAME = 'zui.treemap',
        DEFAULTS = {
            data: [],
            // direction: 'bottom', // or 'top', 'left', 'right'
            cableWidth: 1,
            cableColor: '#808080',
            cableStyle: 'solid',
            rowSpace: 30,
            nodeSpace: 20,
            listenNodeResize: true,
            nodeTemplate: '<div class="treemap-node"><a class="treemap-node-wrapper"></a></div>',
            foldable: true,
            clickNodeToFold: true,
            // sort: false, // Boolean or function
            // tooltip: null,
            // nodeStyle: null,
        };
        // var  DEFAULT_NODE = {
            // id: uuid(),           // uuid
            // text: '',             // main text,
            // html: '',             // main text as html format
            // style: null,          // node element style
            // textColor: '',        // text color
            // color: '',            // background color
            // border: '',           // border style,
            // tooltip: ''           // node caption
            // attrs: null           // attrs
            // title: ''             // node title
            // tooltip: ''           // node tooltip
        // };

    var getDataFromUlList = function($list) {
        return $list.children('li,.treemap-data-item').map(function() {
            var $item = $(this),
                item = $item.data(),
                $text = $item.children('.text'),
                $html = $item.children('.content'),
                $children = $item.children('ul,.treemap-data-list');
            if($text.length) item.text = $text.text();
            if($html.length) item.html = $html.html();
            if($children.length) {
                item.children = getDataFromUlList($children);
            }
            if(!item.text && !item.html) {
                var $content = $item.children(':not(ul,.treemap-data-list)');
                var $itemClone = $item.clone();
                $itemClone.find('ul,.treemap-data-list').remove();
                if(!$content.length) {
                    item.text = $itemClone.text();
                } else {
                    item.html = $itemClone.html();
                }
            }
            return item;
        }).get();
    };

    var Treemap = function(element, options) {
        var $element = $(element);
        if($.isArray(options)) {
            options = {data: options};
        }
        options = $.extend({}, DEFAULTS, $element.data(), options);

        var data = options.data || [];
        if(!data.length) {
            var $dataList = $element.children('.treemap-data');
            if($dataList.length) {
                data = getDataFromUlList($dataList.hide());
            }
        }

        var $nodes = $element.children('.treemap-nodes');
        if(!$nodes.length) {
            $nodes = $('<div class="treemap-nodes" unselectable="on"/>').appendTo($element);
        }

        var that     = this;
        that.$       = $element;
        that.$nodes  = $nodes;
        that.data    = $.isArray(data) ? data : [data];
        that.options = options;
        that.offsetX = 0;
        that.offsetY = 0;
        that.scale   = options.scale || 1;

        // Bind events

        that.render();

        $nodes.on('resize', '.treemap-node-wrapper', function() {
            that.delayDrawLines();
        });
        if(options.foldable) {
            $nodes.on('click', options.clickNodeToFold ? '.treemap-node-wrapper' : '.treemap-node-fold-icon', function() {
                that.toggle($(this).closest('.treemap-node'));
            });
        }

        $nodes.on('click', '.treemap-node-wrapper', function() {
            var $node = $(this).closest('.treemap-node');
            that.callEvent('onNodeClick', $node.data('node'));
        });
    };

    Treemap.prototype.toggle = function($node, toggle, ignoreAnimation) {
        var that = this;
        if(typeof $node === 'boolean') {
            toggle = $node;
            $node = null;
        }
        if(!$node) {
            $node = that.$nodes.children('.treemap-node').first();
        }
        if($node)
        {
            if($node.data('node').foldable === false) {
                return;
            }
            if(toggle === undefined) {
                toggle = $node.hasClass('collapsed');
            }
            $node.toggleClass('collapsed', !toggle).find('[data-toggle="tooltip"]').tooltip('hide');
            if (!ignoreAnimation) {
                $node.addClass('tree-node-collapsing')
            }
            that.$nodes.find('.tooltip').remove();
            that.drawLines();
            if (!ignoreAnimation) {
                $node.removeClass('tree-node-collapsing');
            } else {
                clearTimeout(that.toggleTimeTask);
                that.toggleTimeTask = setTimeout(function() {
                    $node.removeClass('tree-node-collapsing');
                }, 200);
            }
        }
    };

    Treemap.prototype.showLevel = function(level) {
        var that = this;
        that.$nodes.find('.treemap-node').each(function() {
            var $node = $(this);
            that.toggle($node, $node.data('level') < level, true);
        });
    };

    Treemap.prototype.render = function(data) {
        var that = this;
        that.data = data ? ($.isArray(data) ? data : [data]) : that.data;

        if(that.data) {
            that.createNodes();
            that.drawLines();
            that.delayDrawLines(500);
        }

        that.callEvent('afterRender');
    };

    Treemap.prototype.createNodes = function(nodes, parent, callback) {
        var that       = this,
            options    = that.options,
            rowSpace   = options.rowSpace,
            $nodes     = that.$nodes;
        if(!parent) {
            $nodes.find('.treemap-node-wrapper').off('resize.' + NAME);
            $nodes.empty();
        }
        if(options.sort) {
            nodes.sort($.isFunction(options.sort) ? options.sort : function(nodeX, nodeY) {
                return (nodeX.order || 0) - (nodeY.order);
            });
        }
        var lastNode = null;
        nodes = nodes || that.data;
        if (!parent) {
            that.maxLevel = 1;
        }
        $.each(nodes, function(idx, node) {
            if(typeof node === 'string') {
                node = {html: node};
                nodes[idx] = node;
            }

            if(!node.id) node.id = $.zui.uuid();
            node.level = parent ? (parent.level + 1) : 1;
            that.maxLevel = Math.max(that.maxLevel, node.level);

            // Create node element
            var isCustomNodeTemplate = $.isFunction(options.nodeTemplate);
            var $node = isCustomNodeTemplate ? options.nodeTemplate(node, that) : $(options.nodeTemplate);

            // Create node wrapper element
            var $wrapper = $node.find('.treemap-node-wrapper');
            if(!$wrapper.length) {
                $wrapper = $('<div class="treemap-node-wrapper"/>').appendTo($node);
            }

            var children = node.children;
            var hasChild = children && children.length;
            node.isOnlyOneChild = hasChild === 1;

            // Set node data attributes
            node.idx    = idx;
            var row = parent ? (parent.row + 1) : 0;
            $node.toggleClass('treemap-node-has-child', !!hasChild)
                 .toggleClass('treemap-node-has-parent', !!parent)
                 .toggleClass('treemap-node-one-child', hasChild === 1)
                 .toggleClass('collapsed', !!node.collapsed && node.collapsed !== 'false')
                 .toggleClass('treemap-node-root', !row)
                 .attr({'data-id': node.id, 'data-level': node.level}).data('node', node);
            if(node.className) {
                $node.addClass(node.className);
            }
            node.row = row;

            // Set node element attributes and sytle
            var style = $.extend({}, options.nodeStyle, node.style);
            if(node.textColor) style.color = node.textColor;
            if(node.color) style.backgroundColor = node.color;
            if(node.border) style.border = node.border;
            var attrs = $.extend({}, node.attrs, {
                title: node.caption
            });
            if(node.tooltip) {
                attrs['data-toggle'] = 'tooltip';
                attrs.title = node.tooltip;
            }
            $wrapper.attr(attrs).css(style);
            if(lastNode) {
                $node.css('padding-left', options.nodeSpace);
            }
            if(!isCustomNodeTemplate) {
                if(node.html) $wrapper.append(node.html);
                else if(node.text) $wrapper.text(node.text);
            }

            // append node element to ducument
            $node.appendTo(parent ? parent.$children : $nodes);

            // Save sizes
            // node.bounds = {
            //     width  : $wrapper.outerWidth(),
            //     height : $wrapper.outerHeight()
            // };

            if(lastNode) {
                lastNode.next = node;
            }
            node.prev     = lastNode;
            node.parent   = parent;
            node.$        = $node;
            node.$wrapper = $wrapper;

            // Create children
            if(hasChild) {
                var $children = $node.find('.treemap-node-children');
                if(!$children.length) {
                    $children = $('<div class="treemap-node-children"/>').appendTo($node);
                }
                $children.css('margin-top', rowSpace);
                node.$children = $children;
                that.createNodes(children, node);
            }

            if(options.listenNodeResize) {
                $wrapper.on('resize.' + NAME, function() {
                    // node.bounds.width = $wrapper.outerWidth();
                    // node.bounds.height = $wrapper.outerHeight();
                    that.delayDrawLines();
                });
            }

            lastNode    = node;
            callback && callback($node, node);
        });

        if(!parent) {
            // Init tooltip
            $nodes.find('[data-toggle="tooltip"]').tooltip(options.tooltip);
        }
    };

    Treemap.prototype.delayDrawLines = function(delay) {
        var that = this;
        clearTimeout(that.delayDrawLinesTask);
        that.delayDrawLinesTask = setTimeout(function() {
            that.drawLines();
        }, delay || 10);
    };

    Treemap.prototype.drawLines = function(nodes, parent) {
        var that       = this,
            options    = that.options,
            rowSpace   = options.rowSpace;
        var cableStyle = {};
        if(options.cableWidth) cableStyle.borderWidth = options.cableWidth;
        if(options.cableStyle) cableStyle.borderStyle = options.cableStyle;
        if(options.cableColor) cableStyle.borderColor = options.cableColor;
        var rowSpaceHalf = Math.round(rowSpace/2);
        var nodesOffsetLeft = that.$nodes.offset().left;
        $.each(nodes || that.data, function(idx, node) {
            var $wrapper = node.$wrapper;
            var children = node.children;
            var nodeCableStyle = $.extend({
                height: rowSpaceHalf,
                top: -rowSpaceHalf - 1,
                left: Math.round(($wrapper.outerWidth() - cableStyle.borderWidth)/2),
                color: cableStyle.borderColor
            }, cableStyle);
            if(parent && !parent.isOnlyOneChild) {
                var $topLine = $wrapper.find('.treemap-line-top');
                if(!$topLine.length) {
                    $topLine = $('<div class="treemap-line-top"/>').appendTo($wrapper);
                }
                $topLine.css(nodeCableStyle);
            }
            if(children && children.length) {
                nodeCableStyle.top = $wrapper.outerHeight() - 1;
                if(node.isOnlyOneChild) {
                    nodeCableStyle.height = rowSpace;
                }
                var $bottomLine = $wrapper.find('.treemap-line-bottom');
                if(!$bottomLine.length) {
                    $bottomLine = $('<div class="treemap-line-bottom"/>').appendTo($wrapper);
                    if(options.foldable) {
                        $bottomLine.append('<i class="treemap-node-fold-icon icon" style="transform: translate(-' + Math.floor(nodeCableStyle.borderWidth/2) + 'px, ' + rowSpaceHalf + 'px)"/>');
                    }
                }
                $bottomLine.css(nodeCableStyle);
                that.drawLines(children, node);
                if(children.length > 1) {
                    var firstChild = children[0],
                        lastChild = children[children.length - 1];

                    var $centerLine = node.$.children('.treemap-line');
                    if(!$centerLine.length) {
                        $centerLine = $('<div class="treemap-line"/>').insertAfter($wrapper);
                    }
                    var lineLeft = Math.round(firstChild.$wrapper.offset().left - nodesOffsetLeft + firstChild.$wrapper.outerWidth()/2);
                    $centerLine.css($.extend({
                        marginTop: rowSpaceHalf,
                        left: lineLeft,
                        width: lastChild.$wrapper.offset().left - nodesOffsetLeft -lineLeft + lastChild.$wrapper.outerWidth()/2
                    }, cableStyle));
                }
            }
        });

        if(!parent) {
            that.callEvent('afterDrawLines');
        }
    };

    // Call event
    Treemap.prototype.callEvent = function(name, params) {
        var that = this;
        if(!$.isArray(params)) params = [params];
        that.$.trigger(name, params);
        if($.isFunction(that.options[name])) {
            return that.options[name].apply(that, params);
        }
    };

    Treemap.DEFAULTS = DEFAULTS;
    Treemap.NAME     = NAME;

    $.fn.treemap = function(option, param1, parma2) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(NAME);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(NAME, (data = new Treemap(this, options)));

            if(typeof option == 'string') data[option](param1, parma2);
        });
    };

    $.fn.treemap.Constructor = Treemap;
}(jQuery, window, document, Math, undefined));

