/*!
 * ZUI: 仪表盘 - v1.8.1 - 2018-01-18
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2018 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: dashboard.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, Math, undefined) {
    'use strict';

    var dashboardMessager = $.zui.Messager ? new $.zui.Messager({placement: 'top', time: 1500, close: 0, scale: false, fade: false}) : 0;

    var Dashboard = function(element, options) {
        this.$ = $(element);
        this.options = this.getOptions(options);
        this.draggable = this.$.hasClass('dashboard-draggable') || this.options.draggable;

        this.init();
    };

    Dashboard.DEFAULTS = {
        minHeight: 100,
        height: 360,
        shadowType: 'normal',
        sensitive: false,
        circleShadowSize: 100,
        onlyRefreshBody: true,
        resizable: true, // 'vertical', 'horizontal'
        resizeMessage: false
    };

    Dashboard.prototype.getOptions = function(options) {
        options = $.extend({}, Dashboard.DEFAULTS, this.$.data(), options);
        return options;
    };

    Dashboard.prototype.handleRemoveEvent = function() {
        var afterPanelRemoved = this.options.afterPanelRemoved;
        var tip = this.options.panelRemovingTip;
        this.$.on('click', '.remove-panel', function() {
            var panel = $(this).closest('.panel');
            var name = panel.data('name') || panel.find('.panel-heading').text().replace('\n', '').replace(/(^\s*)|(\s*$)/g, '');
            var index = panel.attr('data-id');

            if(tip === undefined || tip === false || confirm(tip.format(name))) {
                panel.parent().remove();
                if(afterPanelRemoved && $.isFunction(afterPanelRemoved)) {
                    afterPanelRemoved(index);
                }
            }
        });
    };

    Dashboard.prototype.handleRefreshEvent = function() {
        var that = this;
        var onlyRefreshBody = this.options.onlyRefreshBody;
        this.$.on('click', '.refresh-panel', function() {
            var panel = $(this).closest('.panel');
            that.refresh(panel, onlyRefreshBody);
        });
    };

    Dashboard.prototype.handleDraggable = function() {
        var dashboard = this.$;
        var options = this.options;
        var circleShadow = options.shadowType === 'circle';
        var circleSize = options.circleShadowSize;
        var halfCircleSize = circleSize / 2;
        var afterOrdered = options.afterOrdered;

        this.$.addClass('dashboard-draggable');

        this.$.on('mousedown', '.panel-actions, .drag-disabled', function(event) {
            event.stopPropagation();
        });

        var pColClass;
        this.$.on('mousedown', '.panel-heading, .panel-drag-handler', function(event) {
            var panel = $(this).closest('.panel');
            var pCol = panel.parent();
            var row = panel.closest('.row');
            var dPanel = panel.clone().addClass('panel-dragging-shadow');
            var pos = panel.offset();
            var dPos = dashboard.offset();
            var dColShadow = row.find('.dragging-col-holder');
            var sWidth = panel.width(),
                sHeight = panel.height(),
                sX1, sY1, sX2, sY2, moveFn, dropCol, dropBefore, nextDropCol;
            if(!dColShadow.length) {
                dColShadow = $('<div class="dragging-col-holder"><div class="panel"></div></div>').removeClass('dragging-col').appendTo(row);
            }

            if(pColClass) dColShadow.removeClass(pColClass);
            dColShadow.addClass(pColClass = pCol.attr('class'));

            dColShadow.insertBefore(pCol).find('.panel').replaceWith(panel.clone().addClass('panel-dragging panel-dragging-holder'));

            dashboard.addClass('dashboard-dragging');
            panel.addClass('panel-dragging').parent().addClass('dragging-col');

            dPanel.css({
                left: pos.left - dPos.left,
                top: pos.top - dPos.top,
                width: sWidth,
                height: sHeight
            }).appendTo(dashboard).data('mouseOffset', {
                x: event.pageX - pos.left + dPos.left,
                y: event.pageY - pos.top + dPos.top
            });

            if(circleShadow) {
                dPanel.addClass('circle');
                setTimeout(function() {
                    dPanel.css({
                        left: event.pageX - dPos.left - halfCircleSize,
                        top: event.pageY - dPos.top - halfCircleSize,
                        width: circleSize,
                        height: circleSize
                    }).data('mouseOffset', {
                        x: dPos.left + halfCircleSize,
                        y: dPos.top + halfCircleSize
                    });
                }, 100);
            }

            $(document).on('mousemove', mouseMove).on('mouseup', mouseUp);
            event.preventDefault();

            function mouseMove(event) {
                // console.log('......................');
                var offset = dPanel.data('mouseOffset');
                sX1 = event.pageX - offset.x;
                sY1 = event.pageY - offset.y;
                sX2 = sX1 + sWidth;
                sY2 = sY1 + sHeight;
                dPanel.css({
                    left: sX1,
                    top: sY1
                });

                row.find('.dragging-in').removeClass('dragging-in');
                dropBefore = false;
                dropCol = null;
                var area = 0,
                    thisArea;
                row.children(':not(.dragging-col)').each(function() {
                    var col = $(this);
                    if(col.hasClass('dragging-col-holder')) {
                        dropBefore = (!options.sensitive) || (area < 100);
                        return true;
                    }
                    var p = col.children('.panel');
                    var pP = p.offset(),
                        pW = p.width(),
                        pH = p.height();
                    var pX = pP.left,
                        pY = pP.top;

                    if(options.sensitive) {
                        pX -= dPos.left;
                        pY -= dPos.top;
                        thisArea = getIntersectArea(sX1, sY1, sX2, sY2, pX, pY, pX + pW, pY + pH);
                        if(thisArea > 100 && thisArea > area && thisArea > Math.min(getRectArea(sX1, sY1, sX2, sY2), getRectArea(pX, pY, pX + pW, pY + pH)) / 3) {
                            area = thisArea;
                            dropCol = col;
                        }
                    } else {
                        var mX = event.pageX,
                            mY = event.pageY;

                        if(mX > pX && mY > pY && mX < (pX + pW) && mY < (pY + pH)) {
                            dropCol = col;
                            return false;
                        }
                    }
                });

                if(dropCol) {
                    if(moveFn) clearTimeout(moveFn);
                    nextDropCol = dropCol;
                    moveFn = setTimeout(movePanel, 50);
                }
                event.preventDefault();
            }

            function movePanel() {
                if(nextDropCol) {
                    nextDropCol.addClass('dragging-in');
                    if(dropBefore) dColShadow.insertAfter(nextDropCol);
                    else dColShadow.insertBefore(nextDropCol);
                    dashboard.addClass('dashboard-holding');
                    moveFn = null;
                    nextDropCol = null;
                }
            }

            function mouseUp(event) {
                if(moveFn) clearTimeout(moveFn);

                var oldOrder = panel.data('order');
                panel.parent().insertAfter(dColShadow);
                var newOrder = 0;
                var newOrders = {};

                row.children(':not(.dragging-col-holder)').each(function() {
                    var p = $(this).children('.panel');
                    p.data('order', ++newOrder);
                    newOrders[p.data('id') || p.attr('id')] = newOrder;
                    p.parent().attr('data-order', newOrder);
                });

                if(oldOrder != newOrders[panel.data('id') || panel.attr('id')]) {
                    row.data('orders', newOrders);

                    if(afterOrdered && $.isFunction(afterOrdered)) {
                        afterOrdered(newOrders);
                    }
                }

                dPanel.remove();

                dashboard.removeClass('dashboard-holding');
                dashboard.find('.dragging-col').removeClass('dragging-col');
                dashboard.find('.panel-dragging').removeClass('panel-dragging');
                row.find('.dragging-in').removeClass('dragging-in');
                dashboard.removeClass('dashboard-dragging');
                $(document).off('mousemove', mouseMove).off('mouseup', mouseUp);
                event.preventDefault();
            }
        });
    };

    Dashboard.prototype.handlePanelPadding = function() {
        this.$.find('.panel-body > table, .panel-body > .list-group').parent().addClass('no-padding');
    };

    Dashboard.prototype.updatePanelHeight = function() {
        var that = this;
        var defaultHeight = that.options.height;
        var minHeight = that.options.minHeight;
        var sizeConfig = {};
        if(that.id && $.zui.store) {
            sizeConfig = $.zui.store.pageGet('zui.dashboard.' + that.id + '.sizeConfig', sizeConfig);
        }

        this.$.children('.row').each(function() {
            var $row = $(this);
            var rowWidth = $row.width();
            var rows = [], row = [], calWidth = 0;
            $row.children(':not(.dragging-col-holder)').each(function() {
                var $col = $(this);
                var colWidth = $col.width();
                if(calWidth + colWidth > rowWidth) {
                    if(row.length) rows.push(row);
                    row = [$col];
                    calWidth = colWidth;
                } else {
                    calWidth += colWidth;
                    row.push($col);
                }
            });
            if(row.length) rows.push(row);
            if(rows.length) {
                $.each(rows, function(rowId) {
                    row = rows[rowId];
                    var bestHeight = 0;
                    var panels = [];
                    var setNewHeight = false;
                    $.each(row, function(colId) {
                        var $col = row[colId].data('row-id', rowId);
                        var $panel = $col.children('.panel:first');
                        panels.push($panel);
                        if(setNewHeight) return;
                        var newHeight = $panel.data('newHeight');
                        if(newHeight) {
                            $panel.data('newHeight', null).data('height', newHeight);
                            bestHeight = Math.max(minHeight, newHeight);
                            setNewHeight = true;
                        } else {
                            var panelHeight = $panel.data('height') || sizeConfig[$panel.data('id')];
                            if(panelHeight) bestHeight = Math.max(bestHeight, panelHeight);
                        }
                    });
                    if(!bestHeight) {
                        bestHeight = defaultHeight;
                    }
                    $.each(panels, function(idx) {
                        var $panel = panels[idx].css('height', bestHeight);
                        sizeConfig[$panel.data('id')] = $panel.data('height');
                    });
                });
            }
        });

        if(that.id && $.zui.store) {
            $.zui.store.pageSet('zui.dashboard.' + that.id + '.sizeConfig', sizeConfig);
        }

        return sizeConfig;
    };

    Dashboard.prototype.handleResizeEvent = function() {
        var that = this;
        var options = that.options;
        var resizable = options.resizable;
        var onResize = options.onResize;
        var minHeight = options.minHeight;
        var resizeMessage = options.resizeMessage;
        var messagerAvaliable = resizeMessage && dashboardMessager;
        that.$.on('mousedown', '.resize-handle', function(e) {
            var $handle = $(this);
            var isVertical = $handle.hasClass('resize-vertical');
            var $col = $handle.parent()
                .addClass('resizing')
                .toggleClass('resizing-v', isVertical)
                .toggleClass('resizing-h', !isVertical);
            var $row = $col.closest('.row');
            var $panel = $col.children('.panel');
            var startX = e.pageX, startY = e.pageY;
            var startWidth = $col.width(), startHeight = $panel.height();
            var rowWidth = $row.width();
            var oldGrid = Math.round(12*startWidth/rowWidth);
            var lastGrid = oldGrid;
            if(!isVertical) $col.attr('data-grid', oldGrid);

            var mouseMove = function(event) {
                if(isVertical) {
                    $panel.css('height', Math.max(minHeight, startHeight + (event.pageY - startY)));
                }
                else {
                    var x = event.pageX;
                    var grid = Math.max(1, Math.min(12, Math.round(12 * (startWidth + (x - startX)) / rowWidth)));
                    if(lastGrid != grid) {
                        $col.attr('data-grid', grid).css('width', (100*grid/12) + '%');
                        if(messagerAvaliable) dashboardMessager[dashboardMessager.isShow ? 'update' : 'show'](Math.round(100*grid/12) + '% (' + grid + '/12)');
                        lastGrid = grid;
                    }
                }
                event.preventDefault();
                event.stopPropagation();
            };

            var mouseUp = function(event) {
                $col.removeClass('resizing resizing-v resizing-h');

                if(isVertical) {
                    var newHeight = Math.max(minHeight, startHeight + (event.pageY - startY));
                    if(newHeight !== startHeight)
                    {
                        if($.isFunction(onResize))
                        {
                            var revert = function() {
                                $panel.css('height', startHeight).data('height', startHeight);
                                that.updatePanelHeight();
                            };
                            var result = onResize({type: 'vertical', id: $panel.data('id'), element: $col, old: startHeight, height: newHeight, revert: revert});
                            if(result === false) revert();
                        }
                        $panel.css('height', newHeight).data('newHeight', newHeight);;
                    }
                } else {
                    var lastGrid = $col.attr('data-grid');
                    if(oldGrid != lastGrid) {
                        if($.isFunction(onResize)) {
                            var revert = function() {
                                $col.attr('data-grid', oldGrid).css('width', null);
                                that.updatePanelHeight();
                            };
                            var result = onResize({type: 'horizontal', id: $panel.data('id'), element: $col, old: oldGrid, grid: lastGrid, revert: revert});
                            if(result === false) revert();
                            else if(result !== true) {
                                if(messagerAvaliable) dashboardMessager.show(Math.round(100*lastGrid/12) + '% (' + lastGrid + '/12)');
                            }
                        }
                    }
                }
                that.updatePanelHeight();
                $('body').off('mousemove.resize', mouseMove).off('mouseup.resize', mouseUp);
                event.preventDefault();
                event.stopPropagation();
            };

            $('body').on('mousemove.resize', mouseMove).on('mouseup.resize', mouseUp);
            e.preventDefault();
            e.stopPropagation();
        });
        var $col = that.$.children('.row').children(':not(.dragging-col-holder)');
        if(resizable === true || resizable === 'horizontal')
        {
            $col.append('<div class="resize-handle resize-horizontal"><i class="icon icon-resize-h"></i></div>');
        }
        if(resizable === true || resizable === 'vertical')
        {
            $col.append('<div class="resize-handle resize-vertical"><i class="icon icon-resize-v"></i></div>');
        }
    };

    Dashboard.prototype.refresh = function($panel, onlyRefreshBody) {
        if(onlyRefreshBody === undefined) onlyRefreshBody = this.options.onlyRefreshBody;
        var afterRefresh = this.options.afterRefresh;
        $panel = $($panel);
        var url = $panel.data('url');
        if(!url) return;
        $panel.addClass('panel-loading').find('.panel-heading .icon-refresh,.panel-heading .icon-repeat').addClass('icon-spin');
        $.ajax({
            url: url,
            dataType: 'html'
        }).done(function(data) {
            var $data = $(data);
            if($data.hasClass('panel')) {
                $panel.empty().append($data.children());
            } else if(onlyRefreshBody) {
                $panel.find('.panel-body').empty().html(data);
            } else {
                $panel.html(data);
            }
            if($.isFunction(afterRefresh)) {
                afterRefresh.call(this, {
                    result: true,
                    data: data,
                    $panel: $panel
                });
            }
        }).fail(function() {
            $panel.addClass('panel-error');
            if($.isFunction(afterRefresh)) {
                afterRefresh.call(this, {
                    result: false,
                    $panel: $panel
                });
            }
        }).always(function() {
            $panel.removeClass('panel-loading');
            $panel.find('.panel-heading .icon-refresh,.panel-heading .icon-repeat').removeClass('icon-spin');
        });
    };

    function getRectArea(x1, y1, x2, y2) {
        return Math.abs((x2 - x1) * (y2 - y1));
    }

    function isPointInner(x, y, x1, y1, x2, y2) {
        return x >= x1 && x <= x2 && y >= y1 && y <= y2;
    }

    function getIntersectArea(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
        var x1 = Math.max(ax1, bx1),
            y1 = Math.max(ay1, by1),
            x2 = Math.min(ax2, bx2),
            y2 = Math.min(ay2, by2);
        if(isPointInner(x1, y1, ax1, ay1, ax2, ay2) && isPointInner(x2, y2, ax1, ay1, ax2, ay2) && isPointInner(x1, y1, bx1, by1, bx2, by2) && isPointInner(x2, y2, bx1, by1, bx2, by2)) {
            return getRectArea(x1, y1, x2, y2);
        }
        return 0;
    }

    Dashboard.prototype.init = function() {
        var options = this.options, that = this;
        that.id = options.id ? options.id : that.$.attr('id');
        if(options.data) {
            var $row = $('<div class="row"/>');
            $.each(options.data, function(idx, config) {
                var $col = $('<div class="col-sm-' + (config.colWidth || 4) + '"/>');
                if(config.colAttrs) $col.attr(config.colAttrs);
                var $panel = $('<div class="panel" data-id="' + (config.id || $.zui.uuid()) + '"/>');
                if(config.panelAttrs) $panel.attr(config.panelAttrs);
                if(config.height !== undefined) $panel.data('height', config.height);
                if(config.content !== undefined) {
                    if($.isFunction(config.content)) {
                        var content = config.content($panel);
                        if(content !== true) {
                            $panel.html(content);
                        }
                    } else {
                        $panel.html(config.content);
                    }
                }
                $row.append($col.append($panel.data('url', config.url)));
            });
            that.$.append($row);
        }

        that.updatePanelHeight();
        that.handlePanelPadding();
        that.handleRemoveEvent();
        that.handleRefreshEvent();
        if(options.resizable) that.handleResizeEvent();
        if(that.draggable) that.handleDraggable();

        var orderSeed = 0;
        that.$.find('.panel').each(function() {
            var $this = $(this);
            $this.data('order', ++orderSeed);
            if(!$this.attr('id')) {
                $this.attr('id', 'panel' + orderSeed);
            }
            if(!$this.attr('data-id')) {
                $this.attr('data-id', orderSeed);
            }

            that.refresh($this, options.onlyRefreshBody);
        });

        that.$.find('[data-toggle="tooltip"]').tooltip({container: 'body'});
    };

    $.fn.dashboard = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('zui.dashboard');
            var options = typeof option == 'object' && option;

            if(!data) $this.data('zui.dashboard', (data = new Dashboard(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };

    $.fn.dashboard.Constructor = Dashboard;
}(jQuery, Math, undefined));

