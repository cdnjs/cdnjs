/*!
 * ZUI: 数据表格② - v1.8.0 - 2018-01-04
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2018 cnezsoft.com; Licensed MIT
 */

/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));

/* ========================================================================
 * ZUI: datagrid.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, undefined) {
    'use strict';

    var loadDataSourceFromTable = function ($table) {
        var cols = [];
        $table.find('thead>tr:first>th').each(function(idx) {
            var $th = $(this);
            cols.push($.extend({
                name: idx,
                label: $th.html(),
                html: true,
                width: $th.outerWidth()
            }, $th.data()));
            if ($th.attr('colspan') && $th.attr('colspan') !== '1') {
                throw new Erorr('Table th element with colspan attribute is not support.');
            }
        });
        var data = [];
        $table.find('tbody>tr').each(function() {
            var $tr = $(this);
            var item = {};
            $tr.children('td').each(function(idx) {
                item[idx] = $(this).html();
            });
            data.push($.extend(item, $tr.data()));
        });
        return {
            cols: cols,
            array: data,
            length: data.length
        };
    };

    // Define the datagrid model name
    var NAME = 'zui.datagrid';

    var DEFAULT_VALUE_OPERATOR = {
        date: {
            getter: function(dataValue, cell, dataGrid) {
                var formater = dataGrid.options.defaultDateFormater;
                return dataValue + ',' + Date.create(dataValue).format(formater);
            },
            setter: function(inputValue, cell, dataGrid) {
                if (typeof inputValue === 'string') {
                    var intValue = parseInt(inputValue, 10);
                    if (!isNaN(intValue)) {
                        inputValue = intValue;
                    }
                }
                return Date.timestamp(inputValue);
            },
            // sort: function(val1, val2) {
            // }
        }
    };

    var DEFAULT_CONFIGS = {
    };

    var DEFAULT_PAGER = {
        page: 0,        // current page index
        recTotal: 0,    // records total count
        recPerPage: 10, // records count per page
    };

    var DEFAULT_STATES = {
        // Fixed columns and rows config
        fixedLeftUntil: 0,
        // fixedRightFrom: 5,
        fixedTopUntil: 0,
        // fixedBottomFrom: 5,

        order: 'asc', // desc

        sortBy: null,

        pager: DEFAULT_PAGER,

        selections: {}
    };

    var DEFAULT_SEARCH_FUNC = function(item, searchKeyArr) {
        var score = 0;
        var searchKeyLength = searchKeyArr.length;
        var matchKeysCount = 0, matchKeys = {};
        $.each(item, function(key, value) {
            var valueType = typeof value;
            if (valueType === 'number' || valueType === 'number') {
                value += '';
            } else if (valueType !== 'string') {
                value = JSON.stringify(valueType);
            }
            var keyScore = 0;
            for(var i = 0; i < searchKeyLength; ++i) {
                var search = searchKeyArr[i];
                if (value.includes(search)) {
                    if (value.startsWith(search)) {
                        keyScore = 10;
                    } else {
                        keyScore = 20;
                    }
                    if (!matchKeys[search]) {
                        matchKeys[search] = 1;
                        matchKeysCount++;
                    }
                }
            }
            score += keyScore;
        });
        score = matchKeysCount === searchKeyLength ? score : 0;
        return score;
    };

    var DEFAULT_SORT_FUNC = function(val1, val2) {
        if (val1 == val2) {
            return 0;
        } else if (val1 < val2) {
            return -1;
        }
        return 1;
    };

    var LANG = {
        zh_cn: {
            'errorCannotGetDataFromRemote': '无法从远程服务器（{0}）获取数据。',
            'errorCannotHandleRemoteData': '无法处理远程服务器返回的数据。'
        },
        zh_tw: {
            'errorCannotGetDataFromRemote': '無法從遠程服務器（{0}）獲取數據。',
            'errorCannotHandleRemoteData': '無法處理遠程服務器返回的數據。'
        },
        en: {
            'errorCannotGetDataFromRemote': 'Cannot fetch data from remote server {0}.',
            'errorCannotHandleRemoteData': 'Cannot handle the remote data.'
        }
    };

    // The datagrid modal class
    var DataGrid = function(element, options) {
        var that       = this;
        var $element   = that.$ = $(element);
        that.name      = NAME;
        that.uuid      = $.zui.uuid();
        that.id        = 'zui-datagrid-' + that.uuid;
        options        = $.extend({}, DataGrid.DEFAULTS, that.$.data(), options);

        var lang   = options.lang || 'zh_cn';
        that.lang  = $.isPlainObject(lang) ? ($.extend(true, {}, LANG[lang.lang || $.zui.clientLang()], lang)) : LANG[lang];

        options.valueOperator    = $.extend({}, DEFAULT_VALUE_OPERATOR, options.valueOperator);
        options.rowDefaultHeight = options.rowDefaultHeight || 30;
        options.headerHeight     = options.headerHeight || options.rowDefaultHeight || 30;
        that.options             = options;
        if (typeof options.borderWidth !== 'number') {
            options.borderWidth = 1;
        }

        // Initialize
        if ($element.is('table')) {
            options.dataSource = $.extend(loadDataSourceFromTable(that.$), options.dataSource);
            $element.hide();
            $element = $('<div class="datagrid" id="datagrid-' + that.uuid + '" />').insertAfter(that.$);
        }

        var $container = $element.find('.datagrid-container:first');
        if (!$container.length) {
            $container = $('<div class="datagrid-container" />').appendTo($element);
        }
        $container.css({
            width:       options.width,
            borderWidth: options.borderWidth
        });
        var $document = $(document);
        var createScrollbar = function(direction) {
            var $scrollbar = $container.find('.datagrid-scrollbar-' + direction);
            if (!$scrollbar.length) {
                $scrollbar = $('<div class="datagrid-scrollbar datagrid-scrollbar-' + direction + '"><div class="bar"></div></div>').appendTo($container);
            }
            var isMouseDown = false;
            var lastPos = null;
            var eventSuffix = '.scrollbar' + direction + '.' + NAME + '.' + that.uuid;
            var startPagePos, startPageOffset, isClickBar, startScrollOffset;
            var handleMousePosition = function(e) {
                if (!isMouseDown) return;
                var pos = e[direction === 'h' ? 'pageX' : 'pageY'];
                if (lastPos === pos) {
                    return;
                }
                lastPos = pos;
                pos = (pos - startPagePos) + startPageOffset;
                var scroll = that.layout[direction + 'Scroll'];
                var offset;
                if (isClickBar) {
                    offset = (lastPos - startPagePos) + startScrollOffset;
                } else {
                    offset = Math.max(0, Math.min(scroll.space, pos - Math.round(scroll.barSize/2)));
                }
                if (direction === 'h') {
                    that.setScrollbarOffset(offset);
                } else {
                    that.setScrollbarOffset(null, offset);
                }
            };
            $scrollbar.on('mousedown', function(e) {
                e.preventDefault();
                isMouseDown = true;
                var scroll = that.layout[direction + 'Scroll'];
                var degree = direction === 'h' ? 'X' : 'Y';
                startPageOffset = e['offset' + degree];
                startPagePos = e['page' + degree];
                isClickBar = $(e.target).is('.bar');
                startScrollOffset = scroll.offset;
                if (isClickBar) {
                    startPageOffset += startScrollOffset;
                }
                handleMousePosition(e);
                $scrollbar.addClass('scrolling');
                $document.on('mouseup' + eventSuffix, function(e) {
                    isMouseDown = false;
                    handleMousePosition(e);
                    $document.off(eventSuffix);
                    $scrollbar.removeClass('scrolling');
                }).on('mousemove' + eventSuffix, handleMousePosition);
            });
            that['$' + direction + 'Scroll'] = $scrollbar;
            that['$' + direction + 'Scrollbar'] = $scrollbar.find('.bar');
        };
        createScrollbar('h');
        createScrollbar('v');
        $container.on('mousewheel', function(event) {
            that.scroll(that.layout.scrollLeft + Math.round(event.deltaX), that.layout.scrollTop + Math.round(event.deltaY));
            event.preventDefault();
        });

        that.$container = $container;

        var $cells = $element.find('.datagrid-cells:first');
        if (!$cells.length) {
            $cells = $('<div class="datagrid-cells" />').appendTo($container);
        }
        $cells.toggleClass('datagrid-hover-cell', !!options.hoverCell)
              .toggleClass('datagrid-hover-row', !!options.hoverRow)
              .toggleClass('datagrid-hover-col', !!options.hoverCol)
              .toggleClass('datagrid-hover-shadow', !!options.hoverCol);
        that.$cells = $cells;

        // configs is an object
        that.isFuncConfigs = $.isFunction(options.configs);
        that.configs = that.isFuncConfigs ? options.configs : $.extend({}, DEFAULT_CONFIGS, options.configs);

        that.layout       = {scrollLeft: 0, scrollTop: 0};
        that.configsCache = {};
        that.userConfigs  = {};

        // states is 2D arrays
        that.states    = $.extend(true, {}, DEFAULT_STATES, options.states);
        that.cells     = [];
        that.setPager(that.states.pager);

        that.setDataSource(options.dataSource);

        that.render(true);

        if (options.responsive) {
            var lastContainerWidth = $container.width();
            $container.on('resize', function() {
                that.layout.cols = null;
                that.render();
            });
        }

        if (options.hoverCol) {
            $cells.on('mouseenter', '.datagrid-cell-head', function() {
                var $headCol = $(this);
                var colIndex = $headCol.data('col');
                that.$cells.find('.datagrid-cell.hover').removeClass('hover');
                that.$cells.find('.datagrid-cell[data-col="' + colIndex + '"]').addClass('hover');
            }).on('mouseleave', '.datagrid-cell-head.hover', function() {
                that.$cells.find('.datagrid-cell.hover').removeClass('hover');
            });
        }

        if (options.sortable) {
            $cells.on('click', '.datagrid-col-sortable', function() {
                var colIndex = $(this).data('col');
                var col = that.getColConfig(colIndex);
                var sortBy = that.states.sortBy;
                var order = that.states.order;
                if (sortBy !== col.name) {
                    sortBy = col.name;
                    order = 'desc';
                } else if (order === 'desc') {
                    order = 'asc';
                } else if (order === 'asc') {
                    sortBy = '';
                }
                that.sortBy(sortBy, order);
            });
        }

        if (options.checkable) {
            if (options.selectable && $.fn.selectable) {
                that.selectable = $cells.selectable($.extend({
                    selector: '.datagrid-row-cell',
                    // selectClass: false,
                    clickBehavior: 'multi',
                    select: function(data) {
                        that.checkRow(data.id, true);
                    },
                    unselect: function(data) {
                        that.checkRow(data.id, false);
                    }
                }, $.isPlainObject(options.selectable) ? options.selectable : null)).data('zui.selectable');
                $cells.on('click', '.datagrid-cell-head.datagrid-has-checkbox', function() {
                    that.checkRow($(this).data('row'));
                    that.selectable.syncSelectionsFromClass();
                });
            } else {
                $cells.on('click', options.checkByClickRow ? '.datagrid-row' : '.datagrid-has-checkbox', function(e) {
                    var rowIndex = $(this).data('row');
                    if (rowIndex || $(e.target).closest('.datagrid-has-checkbox').length) {
                        that.checkRow(rowIndex);
                    }
                });
            }
        }

        // Init pager
        if ($.fn.pager) {
            var $pager = that.$.find('.pager');
            if ($pager.length) {
                that.pagerObj = $pager.pager($.extend({}, that.pager, {
                    onPageChange: function(pageInfo) {
                        that.setPager(pageInfo).render();
                    }
                })).data('zui.pager');
            }
        }

        // Init searchbox
        if ($.fn.searchBox) {
            var $searchBox = that.$.find('.search-box');
            if($searchBox)  {
                that.searchbox = $searchBox.searchBox({
                    onSearchChange: function (searchString) {
                        that.search(searchString);
                    }
                });
            }
        }
    };

    DataGrid.prototype.setPager = function(page, recTotal, recPerPage) {
        var that = this;
        if (typeof page === 'object') {
            recPerPage = page.recPerPage;
            recTotal = page.recTotal;
            page = page.page;
        }
        var pager = that.pager;
        var oldPager = $.extend({}, pager);
        if (!pager) {
            pager = $.extend({}, DEFAULT_PAGER);
        }
        if (typeof recPerPage === 'number' && recPerPage > 0) {
            pager.recPerPage = recPerPage;
        }
        if (typeof recTotal === 'number' && recTotal >= 0) {
            pager.recTotal = recTotal;
        }
        if (typeof page === 'number' && page >= 0) {
            pager.page = page;
        }
        pager.totalPage = (pager.recTotal && pager.recPerPage) ? (Math.ceil(pager.recTotal / pager.recPerPage)) : 1;
        pager.page = Math.max(0, Math.min(pager.page, pager.totalPage));
        // pagerRecCount is items count in current page
        pager.pageRecCount = pager.recTotal;
        if (pager.page && pager.recTotal) {
            if (pager.page < pager.totalPage) {
                pager.pageRecCount = pager.recPerPage;
            } else if (pager.page > 1) {
                pager.pageRecCount = pager.recTotal - (pager.recPerPage * (pager.page - 1));
            }
        }
        pager.skip = pager.page > 1 ? ((pager.page - 1) * pager.recPerPage) : 0;
        pager.end = pager.skip + pager.pageRecCount;
        that.pager = pager;

        if (oldPager.page !== pager.page || oldPager.recTotal !== pager.recTotal || oldPager.recPerPage !== pager.recPerPage) {
            that.layout.cols = null;
            that.scroll(0, 0);
        }
        return that;
    };

    DataGrid.prototype.goToPage = function(page) {
        return this.setPager(page).render();
    };

    DataGrid.prototype.setSearch = function(searchStr) {
        if (searchStr === undefined || searchStr === null) {
            searchStr = '';
        }
        this.states.search = $.trim(searchStr);
        return this;
    };

    DataGrid.prototype.search = function(searchStr) {
        var that = this;
        if (searchStr !== that.states.search && that.pager.page) {
            that.setPager(1);
        }
        return that.setSearch(searchStr).render();
    };

    DataGrid.prototype.setSorter = function(sortBy, order) {
        var that = this;
        if (order === undefined) {
            order = that.states.order === 'desc' ? 'asc' : 'desc';
        }
        that.states.order = order.toLowerCase();
        that.states.sortBy = sortBy;
        return that;
    };

    DataGrid.prototype.sortBy = function(sortBy, order) {
        return this.setSorter(sortBy, order).render();
    };

    DataGrid.prototype.setDataSource = function(data, cols) {
        var that = this;
        var dataSource = {};
        var oldcols = that.dataSource && that.dataSource.cols;
        if ($.isArray(data)) {
            dataSource.array = data;
            dataSource.length = data.length;
            that.setPager('', data.length);
        } else  if ($.isPlainObject(data)) {
            dataSource = $.extend(dataSource, data);
        } else if (typeof data === 'string') {
            dataSource.remote = data;
        }
        if (dataSource.cache === true || dataSource.cache === undefined) {
            dataSource.cache = [];
            dataSource.cacheSize = 10;
        } else if (typeof dataSource.cache === 'number') {
            dataSource.cacheSize = dataSource.cache;
            dataSource.cache = [];
        }
        if ($.isArray(dataSource.data)) {
            dataSource.array = dataSource.data;
            dataSource.length = dataSource.array.length;
            that.setPager('', dataSource.length);
            delete dataSource.data;
        } else if (!dataSource.data && $.isFunction(dataSource.getByIndex)) {
            that.setPager('', dataSource.length);
        }
        that.dataSource = dataSource;

        cols = cols || dataSource.cols || oldcols || [];
        if (cols.length) {
            for (var i = 0; i < cols.length; ++i) {
                var col = cols[i];
                if (typeof col === 'string') {
                    cols[i] = {name: col};
                }
            }
        }
        if (cols !== oldcols) {
            that.layout.cols = null;
        }
        dataSource.cols = cols;
    };

    DataGrid.prototype.filterData = function(arr, filter) {
        var that = this;
        var result = arr;
        var hasSearchScore = null;
        if (filter.search) {
            var searchKeyArr = filter.search.replace(/\s{2,}/g, ' ').split(' ');
            result = [];
            var searchFunc = that.options.searchFunc || DEFAULT_SEARCH_FUNC;
            for (var i = 0; i < arr.length; ++i) {
                var item = arr[i];
                var score = searchFunc(item, searchKeyArr, i, filter, that);
                if (score) {
                    if (hasSearchScore === null) {
                        hasSearchScore = typeof score === 'number';
                    }
                    if (hasSearchScore) {
                        item._SCORE = score;
                    }
                    result.push(item);
                }
            }
        }

        that.setPager(-1, result.length);

        if (result.length) {
            var sortBy = filter.sortBy || (hasSearchScore ? '_SCORE' : false);
            if (sortBy) {
                var order = sortBy === '_SCORE' ? 'DESC' : filter.order;
                var colConfig = that.getColConfigByName(sortBy);
                var isDESC = order === 'desc';
                var sortFunc = (colConfig && colConfig.sortFunc) || that.options.sortFunc || DEFAULT_SORT_FUNC;
                result.sort(function(item1, item2) {
                    var sortResult = sortFunc(item1[sortBy], item2[sortBy], item1, item2, sortBy, that);
                    return isDESC ? ((-1) * sortResult) : sortResult;
                });
            }

            var pager = that.pager;
            if (pager.page) {
                var start = pager.page > 1 ? (pager.page * pager.recPerPage) : 0;
                result = result.slice(pager.skip, pager.end);
            }
        }

        return result;
    };

    DataGrid.prototype.getFilterParams = function() {
        var that = this;
        var states = that.states;
        return {
            page:       that.pager.page,
            recPerPage: that.pager.recPerPage,
            search:     states.search,
            sortBy:     states.sortBy,
            order:      states.order
        };
    };

    DataGrid.prototype.loadData = function(callback) {
        var that = this;
        that.loadingId = $.zui.uuid();

        var afterLoad = function(result) {
            that.$.callComEvent(that, 'onLoad', result);
            return callback && callback(result);
        };

        var params = that.getFilterParams();
        var dataId = [params.page, params.recPerPage, params.search, params.sortBy, params.order].join('&');
        var data = that.getData(dataId);

        if (data) {
            return afterLoad(data);
        }
        var dataSource = that.dataSource;
        if (dataSource.array) {
            data = that.filterData(dataSource.array, params);
            that.resetData(dataId, data, that.pager);
            return afterLoad(data);
        } else if (dataSource.getByIndex) {
            data = dataSource.getByIndex;
            that.resetData(dataId, data);
            return afterLoad(data);
        } else {
            var loadData = dataSource.loader;
            var remote = dataSource.remote;
            if (!loadData && remote) {
                loadData = function(params, onFinish) {
                    var ajaxOptions = $.isFunction(remote) ? remote(params, that) : {url: remote};
                    $.ajax($.extend({
                        type: 'GET',
                        data: params,
                        dataType: 'json',
                        success: function(responseData, textStatus, jqXHR) {
                            if (dataSource.remoteConverter) {
                                responseData = dataSource.remoteConverter(responseData, textStatus, jqXHR, that);
                            }
                            if (typeof responseData === 'string') {
                                responseData = $.parseJSON(responseData);
                            }
                            if ($.isPlainObject(responseData) && responseData.data) {
                                var result = responseData.result || responseData.status;
                                if (result === 'success' || result === 'ok' || result === 200) {
                                    onFinish(responseData);
                                } else {
                                    onFinish(false, responseData.message || responseData.reason || that.lang['errorCannotHandleRemoteData'], responseData);
                                }
                            } else {
                                onFinish(false, that.lang['errorCannotHandleRemoteData'], responseData);
                            }
                        },
                        error: function() {
                            onFinish(false, that.lang['errorCannotGetDataFromRemote'].format(dataSource.remote));
                        },
                    }, ajaxOptions));
                };
            }
            if (loadData) {
                that.renderLoading(true);
                var loadingId = that.loadingId;
                loadData(params, function(resultData, error) {
                    if (loadingId !== that.loadingId) {
                        return;
                    }
                    that.renderLoading(false);
                    if (error) {
                        that.showMessage(error, 'danger');
                        afterLoad(false);
                        return;
                    }
                    that.resetData(dataId, resultData.data, resultData.pager);
                    afterLoad(resultData.data);
                });
            } else {
                return afterLoad(false);
            }
        }
    };

    DataGrid.prototype.getDataItem = function(index, data, filterParams) {
        var that = this;
        data = data || that.getData();
        if (typeof data === 'function') {
            filterParams = filterParams || that.getFilterParams();
            return data(index, filterParams);
        }
        return data[index];
    };

    DataGrid.prototype.showMessage = function(message, type, autoCloseTime) {
        var that = this;
        if (that.msgerAutoCloseTimer) {
            clearTimeout(that.msgerAutoCloseTimer);
            that.msgerAutoCloseTimer = null;
        }
        var $messager = that.$container.find('.datagrid-messager');
        if (!message) {
            $messager.slideUp();
            return;
        }
        type = type || 'info';
        if (autoCloseTime === undefined) {
            autoCloseTime = 5000;
        }
        if (!$messager.length) {
            $messager = $('<div class="datagrid-messager" style="display: none"><div class="content"></div><button type="button" class="close">×</button></div>').appendTo(that.$container).on('click', '.close', function() {
                $messager.slideUp();
                if (that.msgerAutoCloseTimer) {
                    clearTimeout(that.msgerAutoCloseTimer);
                    that.msgerAutoCloseTimer = null;
                }
            });
        }
        $messager.attr('class', 'datagrid-messager bg-' + type).find('.content').text(message);
        $messager.slideDown();
        if (autoCloseTime) {
            that.msgerAutoCloseTimer = setTimeout(function() {
                $messager.slideUp();
                that.msgerAutoCloseTimer = null;
            }, autoCloseTime);
        }
    };

    DataGrid.prototype.renderLoading = function(loading) {
        var that = this;
        if (loading !== undefined) {
            that.states.loading = loading;
        }
        var $loading = that.$container.find('.datagrid-loading');
        if (loading) {
            if (!$loading.length) {
                $loading = $('<div class="datagrid-loading" style="display: none"><div class="content"><i class="icon icon-spin icon-spinner icon-2x"></i><div className="datagrid-loading-message"></div></div></div>').appendTo(that.$container);
            }
            $loading.find('.datagrid-loading-message').text((typeof loading === 'string') ? loading : '');
            $loading.fadeIn();
        } else {
            $loading.fadeOut();
        }
    };

    DataGrid.prototype.getData = function(dataId) {
        var dataSource = this.dataSource;
        var data = null;
        if (dataId && dataId !== dataSource.dataId) {
            if (dataSource.cache && dataSource.cache.length) {
                for (var i = dataSource.cache.length - 1; i >= 0; --i) {
                    var dataCache = dataSource.cache[i];
                    if (dataCache.id === dataId) {
                        dataSource.dataId = dataId;
                        dataSource.data = dataCache.data;
                        this.setPager(dataCache.pager);
                        data = dataCache.data;
                        break;
                    }
                }
            }
        } else {
            data = dataSource.data;
        }
        return data;
    };

    DataGrid.prototype.resetData = function(dataId, data, pager) {
        var dataSource = this.dataSource;
        dataSource.dataId = dataId;
        dataSource.data = data;
        if (dataSource.cache) {
            for (var i = dataSource.cache.length - 1; i > 0; --i) {
                var dataCache = dataSource.cache[i];
                if (dataCache.id === dataId) {
                    dataSource.cache.splice(i, 1);
                    break;
                }
            }
            dataSource.cache.push({
                id: dataId,
                data: data,
                pager: $.extend({}, pager)
            });
            while (dataSource.cache.length > dataSource.cacheSize) {
                dataSource.cache.shift();
            }
        }
        if (pager) {
            this.setPager(pager);
        }
    };

    DataGrid.prototype.getRowLayout = function(rowIndex) {
        var layout = this.layout;
        if (rowIndex === 0) {
            return {
                top: 0,
                height: layout.headerHeight
            };
        }
        var rowHeight =  layout.rowHeight;
        return {
            height: rowHeight,
            top: layout.headerHeight + (rowIndex > 1 ? ((rowIndex - 1) * rowHeight) : 0) + rowIndex * layout.borderWidth
        };
    };

    DataGrid.prototype.updateLayout = function() {
        var that            = this;
        var options         = that.options;
        var layout          = that.layout;
        var data            = that.data;
        var pager           = that.pager;
        var dataLength      = pager.pageRecCount;
        var $container      = that.$container;
        var containerWidth  = $container.width();
        var dataSource      = that.dataSource;

        if (!dataSource.cols.length && dataLength) {
            $.each(that.getDataItem(0), function(name) {
                dataSource.cols.push({
                    name: name
                });
            });
        }

        // Caculate cols layout
        if (!layout.cols) {
            var cols                = dataSource.cols;
            var colAutoMinWidth     = options.colAutoMinWidth;
            var colAutoDefaultWidth = options.colAutoDefaultWidth;
            var growTotal           = 0;
            var minGrowWidth        = 0;
            var rowIndexWidth       = options.rowIndexWidth;
            var colsLayout          = [{
                left: 0,
                width: options.showRowIndex ? (rowIndexWidth === 'auto' ? ((dataLength + that.pager.skip + '').length * 8 + 16) : rowIndexWidth) : 0
            }];
            var cellsTotalWidth     = 0;
            var fixedWidth          = colsLayout[0].width;
            var lastGrowColIndex    = false;
            var lastMaxGrow         = 0;
            var checkBoxColIndex    = 0;
            var colLayout, colWidth;

            for (var i = 0; i < cols.length; ++i) {
                var col = cols[i];
                if (!col) continue;
                colWidth = col.width;
                if (!colWidth || colWidth === 'auto') {
                    colWidth = 0.1;
                }
                colLayout = {left: 0};
            if (colWidth >= 1) {
                    if (col.minWidth !== undefined) {
                        colWidth = Math.max(colWidth, col.minWidth);
                    }
                    colLayout.width = colWidth;
                    fixedWidth     += colWidth;
                } else {
                    if (col.minWidth === undefined) {
                        col.minWidth = colAutoMinWidth;
                    }
                    colLayout.grow = colWidth;
                    growTotal += colWidth;
                    minGrowWidth += col.minWidth;
                    if (lastMaxGrow <= colLayout.grow) {
                        lastMaxGrow      = colLayout.grow;
                        lastGrowColIndex = i + 1;
                    }
                }
                colLayout.minWidth = col.minWidth;
                if (!checkBoxColIndex && col.checkbox) {
                    checkBoxColIndex   = i + 1;
                    colLayout.checkbox = true;
                }
                colsLayout.push(colLayout);
            }
            if (options.checkable && !checkBoxColIndex) {
                colsLayout[0].checkbox = true;
                if (rowIndexWidth === 'auto') {
                    colsLayout[0].width += 30;
                }
            }
            var flexWidth    = containerWidth - fixedWidth;
            var autoOverflow = flexWidth < minGrowWidth;
            var colsLenght   = colsLayout.length;
            for (var j = 0; j < colsLenght; ++j) {
                colLayout = colsLayout[j];
                colWidth = colLayout.width;
                if (!colWidth) {
                    if (autoOverflow) {
                        colWidth = colAutoDefaultWidth * colLayout.grow * 10;
                    } else {
                        colWidth = flexWidth * colLayout.grow / growTotal;
                    }
                    colWidth = Math.floor(Math.max(colLayout.minWidth, colWidth));
                    colLayout.width = colWidth;
                }
                if (j > 0) {
                    var lastColLayout = colsLayout[j - 1];
                    colLayout.left = lastColLayout.left + lastColLayout.width;
                }
                cellsTotalWidth += colWidth;
            }

            var extraGap = containerWidth - cellsTotalWidth;
            if (lastGrowColIndex && extraGap > 0) {
                colsLayout[lastGrowColIndex].width += extraGap;
                cellsTotalWidth += extraGap;
            }
            layout.width = cellsTotalWidth;
            layout.cols = colsLayout;
        }

        layout.containerWidth  = containerWidth;
        layout.rowHeight       = options.rowDefaultHeight;
        layout.borderWidth     = options.borderWidth;
        layout.headerHeight    = options.showHeader ? (options.headerHeight) : 0;
        layout.rowsLength      = dataLength + 1;
        layout.colsLength      = layout.cols.length;
        layout.height          = layout.headerHeight + dataLength * (layout.rowHeight + layout.borderWidth);
        layout.spanMap         = {};

        var containerHeight = options.height;
        if (containerHeight === 'page') {
            containerHeight = layout.headerHeight + that.pager.recPerPage * (layout.rowHeight + layout.borderWidth);
        }
        $container.css('height', containerHeight);
        layout.containerHeight = containerHeight;

        layout.vScrollSpare    = layout.height - layout.containerHeight;
        layout.hScrollSpare    = layout.width - layout.containerWidth;

        that.layout = layout;

        var partialRendering = pager.page ? true : options.partialRendering;
        if (partialRendering === 'auto') {
            partialRendering = layout.height > (2 * layout.containerHeight);
        }
        layout.partialRendering = partialRendering;
        return layout;
    };

    DataGrid.prototype.getCell = function(rowIndex, colIndex) {
        var that = this;
        var config = that.getCellConfig(rowIndex, colIndex);
        var col = colIndex > 0 ? that.dataSource.cols[colIndex - 1] : null;
        var type, value;
        if (colIndex === 0) {
            type = 'index';
            var colLabel = rowIndex > 0 ? (that.pager.skip + rowIndex) : '';
            value = config.label !== undefined ? config.label : colLabel;
        } else if (rowIndex === 0) {
            type = 'head';
            value = config.label !== undefined ? config.label : (config.name !== undefined ? config.name : colIndex);
        } else {
            type = 'cell';
            value = config.data && config.data[that.options.dataItemIsArray ? colIndex : col.name];
        }
        if (rowIndex > 0 && config.valueType) {
            var valueOperator = config.valueOperator || that.options.valueOperator;
            if (valueOperator) {
                var typeOperator = valueOperator[config.valueType];
                if (typeOperator && typeOperator.getter) {
                    value = typeOperator.getter(value, cell, that);
                }
            }
        }
        var cell = {
            type:     type,
            value:    value,
            rowIndex: rowIndex,
            colIndex: colIndex,
            config:   config,
            checked:  that.isRowChecked(config.rowId)
        };
        var spanMap = that.layout.spanMap;
        if (spanMap[config.id] || config.hidden) {
            cell.hidden = true;
        } else if ((config.colspan && config.colspan > 1) || (config.rowspan && config.rowspan > 1)) {
            var rowSpanEnd = rowIndex + (config.rowspan || 1);
            var colSpanEnd = colIndex + (config.colspan || 1);
            for (var r = rowIndex; r < rowSpanEnd; ++r) {
                for (var c = colIndex; c < colSpanEnd; ++c) {
                    if (r !== rowIndex || c !== colIndex) {
                        spanMap['R' + r + 'C' + c] = config.id;
                    }
                }
            }
            config.span = true;
        }
        return cell;
    };

    DataGrid.prototype.getRowConfig = function(rowIndex) {
        var that   = this;
        var rowId  = 'R' + rowIndex;
        var config = that.configsCache[rowId];
        if (!config) {
            config = $.extend({
                // height: 'auto'
                // fixed: false
            }, that.isFuncConfigs ? that.configs(rowId) : that.configs[rowId], that.userConfigs[rowId]);
            that.configsCache[rowId] = config;
        }
        var dataItem = rowIndex > 0 ? that.getDataItem(rowIndex - 1) : null;
        config.data = dataItem;
        config.rowId = dataItem ? (dataItem.rowId || dataItem.id) : (rowIndex === 0 ? '#header' : rowIndex);
        return config;
    };

    DataGrid.prototype.getColConfigByName = function(colName) {
        var cols = this.dataSource.cols;
        for (var i = 0; i < cols.length; ++i) {
            if (cols[i].name === colName) {
                return this.getColConfig(i + 1);
            }
        }
        return null;
    };

    DataGrid.prototype.getColConfig = function(colIndex) {
        var that = this;
        var colId = 'C' + colIndex;
        // var config = that.configsCache[colId];
        var config = null;
        if (!config) {
            config = $.extend(
                {
                    // html: false,
                    // style: null,
                    // className: '',
                    // valueOperator: null,
                    // sortFunc
                    valueType: 'string'
                },
                colIndex > 0 ? that.dataSource.cols[colIndex - 1] : null,
                that.layout.cols ? that.layout.cols[colIndex] : null,
                that.isFuncConfigs ? that.configs(colId) : that.configs[colId],
                that.userConfigs[colId]
            );
            // that.configsCache[colId] = config;
        }
        return config;
    };

    DataGrid.prototype.getCellConfig = function(rowIndex, colIndex) {
        var that = this;
        var cellId = 'R' + rowIndex + 'C' + colIndex;
        // var config = that.configsCache[cellId];
        var config = null;
        if (!config) {
            config = $.extend(
                {id: cellId},
                that.getColConfig(colIndex),
                that.getRowConfig(rowIndex),
                that.isFuncConfigs ? that.configs(cellId) : that.configs[cellId],
                that.userConfigs[cellId]
            );
            // that.configsCache[cellId] = config;
        }
        return config;
    };

    DataGrid.prototype.isRowChecked = function(rowId) {
        return !!this.states.selections[rowId];
    };

    DataGrid.prototype.checkRow = function(rowIndex, checked) {
        var that       = this;
        var selections = that.states.selections;
        var rowConfig  = that.getRowConfig(rowIndex);
        var rowId      = rowConfig.rowId;
        if (checked === undefined) {
            checked = !selections[rowId];
        }
        if (selections[rowId] === checked) {
            return;
        }
        if (checked) {
            selections[rowId] = rowConfig;
        } else {
            delete selections[rowId];
            if (rowIndex > 0 && selections['#header']) {
                delete selections['#header'];
                that.renderRow(0);
            }
        }
        that.renderRow(rowIndex);
        if (rowIndex === 0 && that.layout.rowsLength < 500) {
            for (var i = 1; i < that.layout.rowsLength; ++i) {
                that.checkRow(i, checked);
            }
        }
        that.renderFixeds();
        return checked;
    };

    DataGrid.prototype.getCheckItems = function() {
        var selections = this.states.selections;
        var items = [];
        selections && $.each(selections, function(rowId) {
            items.push(selections[rowId].data);
        });
        return items;
    };

    DataGrid.prototype.renderCell = function(rowIndex, colIndex, $row) {
        var that       = this;
        var options    = that.options;
        var cell       = that.getCell(rowIndex, colIndex);
        var config     = cell.config;

        if (cell.hidden) {
            return;
        }

        var isCheckbox = config.checkbox;
        var elementId  = [that.id, 'cell', rowIndex, colIndex].join('-');
        var $cell      = $('#' + elementId);
        if (!$cell.length) {
            $row = $row || $('#' + that.id + '-row-' + rowIndex);
            $cell = (options.cellCreator ? options.cellCreator(cell, that) : $('<div class="datagrid-cell" />')).appendTo($row);
            $cell.attr({
                id: elementId,
                'data-type': cell.type,
                'data-col': cell.colIndex,
                'data-row': cell.rowIndex
            }).toggleClass('datagrid-cell-head', rowIndex === 0)
              .toggleClass('datagrid-cell-cell', cell.type === 'cell')
              .toggleClass('datagrid-cell-index', colIndex === 0);

            if (isCheckbox) {
                var $checkbox = $cell.find('.datagrid-checkbox');
                if (!$checkbox.length) {
                    $checkbox = $('<div class="checkbox-primary datagrid-checkbox"><label></label></div>').prependTo($cell.addClass('datagrid-has-checkbox'));
                }
                $cell.append('<span class="content"></span>');
            }
        }

        // Caculate cell style
        var borderWidth     = options.borderWidth;
        var layout          = that.layout;
        var colsLength      = layout.colsLength;
        var cellBoundsStyle = {
            top: borderWidth ? -borderWidth : 0,
            bottom: borderWidth ? -borderWidth : 0,
            left: borderWidth ? (config.left - borderWidth) : config.left,
            width: borderWidth ? (config.width + ((colsLength - 1) === colIndex ? 2 : 1) * borderWidth) : config.width,
            borderWidth: borderWidth
        };
        if (config.span) {
            if (config.rowspan && config.rowspan > 1) {
                cellBoundsStyle.bottom -= (config.rowspan - 1) * (layout.rowHeight + borderWidth);
            }
            if (config.colspan && config.colspan > 1) {
                var colspanEnd = colIndex + config.colspan;
                for (var i = colIndex + 1; i < colspanEnd; ++i) {
                    var theSpanCell = that.getCell(rowIndex, i);
                    cellBoundsStyle.width += theSpanCell.config.width;
                }
            }
        }
        var configStyle = config.style;
        if ($.isFunction(configStyle)) {
            configStyle = configStyle(cell, cellBoundsStyle, that);
        }
        var style = $.extend({}, configStyle, cellBoundsStyle);
        $cell.css(style).toggleClass('datagrid-cell-span', !!config.span);

        if (options.cellFormator) {
            options.cellFormator($cell, cell, that);
        } else {
            var $content = isCheckbox ? $cell.find('.content') : $cell;
            $content[cell.html ? 'html' : 'text'](cell.value);
            if (config.className) {
                $cell.addClass(config.className);
            }
        }

        if (colIndex > 0 && rowIndex === 0 && options.sortable && config.sort !== false) {
            var sorted = false;
            if (config.name === that.states.sortBy) {
                sorted = that.states.order === 'desc' ? 'down' : 'up';
            }
            var $sorter = $cell.find('.datagrid-sorter');
            if (!$sorter.length) {
                $sorter = $('<div class="datagrid-sorter"><i class="icon icon-sort"></i></div>').appendTo($cell);
                $cell.addClass('datagrid-col-sortable');
            }
            $sorter.toggleClass('datagrid-sort-up', sorted === 'up')
                   .toggleClass('datagrid-sort-down', sorted === 'down');
        }

        if (isCheckbox) {
            $cell.find('.datagrid-checkbox').toggleClass('checked', cell.checked);
            $row.toggleClass('active', cell.checked);
        }
        return $cell;
    };

    DataGrid.prototype.renderRow = function(rowIndex) {
        var that       = this;
        var layout     = that.layout;
        var options    = that.options;
        var rowLayout  = that.getRowLayout(rowIndex);
        var colsLength = layout.colsLength;
        var elementId  = that.id + '-row-' + rowIndex;
        var $row       = $('#' + elementId);
        if (!$row.length) {
            $row = (options.rowCreator ? options.rowCreator(rowIndex, that) : $('<div class="datagrid-row" />')).appendTo(that.$cells);
            $row.attr({
                id: elementId,
                'data-row': rowIndex,
                'data-id': rowIndex
            }).css({
                top: layout.partialRendering ? (rowLayout.top - layout.scrollTop) : rowLayout.top,
                height: rowLayout.height
            }).toggleClass('datagrid-row-head', rowIndex === 0)
              .toggleClass('datagrid-row-cell', rowIndex !== 0);
        } else if(layout.partialRendering) {
            $row.css('top', rowLayout.top - layout.scrollTop);
        }
        for (var i = 0; i < colsLength; ++i) {
            that.renderCell(rowIndex, i, $row);
        }
        return $row;
    };

    DataGrid.prototype.renderData = function() {
        var that           = this;
        var layout         = that.layout;

        if (!layout.cols) {
            that.updateLayout();
        }

        var startRenderRow = 1;
        var endRenderRow   = layout.rowsLength - 1;
        if (layout.partialRendering) {
            var rowHeight = layout.rowHeight + layout.borderWidth;
            startRenderRow = Math.min(endRenderRow, Math.max(1, Math.floor((layout.scrollTop - layout.headerHeight)/rowHeight)));
            endRenderRow = Math.min(endRenderRow, Math.max(1, Math.ceil((layout.scrollTop + layout.containerHeight - layout.headerHeight)/rowHeight)));
            that.$cells.find('.datagrid-row').each(function() {
                var $row = $(this);
                var rowIndex = $row.data('row');
                if (rowIndex > 0 && !$row.hasClass('datagrid-fixed') && (rowIndex < startRenderRow || rowIndex > endRenderRow)) {
                    $row.remove();
                }
            });
        }

        // Render header
        if (that.options.showHeader) {
            that.renderRow(0);
        }

        for (var i = startRenderRow; i <= endRenderRow; ++i) {
            that.renderRow(i);
        }

        if (layout.vScrollSpare) {
            var states = that.states;
            var fixedTopUntil = states.fixedTopUntil;
            var fixedBottomFrom = states.fixedBottomFrom;
            if (typeof fixedTopUntil === 'number' && fixedTopUntil > 0 && fixedTopUntil < startRenderRow) {
                for (var i = 1; i <= fixedTopUntil; ++i) {
                    that.renderRow(i);
                }
            }
            if (typeof fixedBottomFrom === 'number' && fixedBottomFrom > 0 && fixedBottomFrom > endRenderRow) {
                for (var i = fixedBottomFrom; i <= (layout.rowsLength - 1); ++i) {
                    that.renderRow(i);
                }
            }
        }

        if (that.pagerObj) {
            that.pagerObj.set(that.pager);
        }
    };

    DataGrid.prototype.render = function(ignoreDelay) {
        var that    = this;
        var options = that.options;

        if (!ignoreDelay && options.renderDelay) {
            if (that.renderDelayTimer) {
                clearTimeout(that.renderDelayTimer);
            }
            that.renderDelayTimer = setTimeout(function() {
                that.render(true);
            }, options.renderDelay);
            return that;
        }

        if (that.renderDelayTimer) {
            clearTimeout(that.renderDelayTimer);
            that.renderDelayTimer = null;
        }

        that.loadData(function(data) {
            var layout = that.updateLayout();

            that.$cells.css({
                width: layout.width,
                height: layout.partialRendering ? layout.containerHeight : that.layout.height
            });

            // Render rows
            that.renderData();

            // Render scrollbars
            that.renderScrolls();

            that.renderFixeds();

            that.$.callComEvent(that, 'onRender');
        });

        return that;
    };

    DataGrid.prototype.setScrollbarOffset = function(offsetX, offsetY) {
        var that       = this;
        var layout     = that.layout;
        var scrollLeft = layout.scrollLeft;
        var scrollTop  = layout.scrollTop;
        if (typeof offsetX === 'number') {
            var hScroll = layout.hScroll;
            if (hScroll.offset !== offsetX) {
                scrollLeft = Math.round(offsetX * layout.hScrollSpare / hScroll.space);
            }
        }
        if (typeof offsetY === 'number') {
            var vScroll = layout.vScroll;
            if (vScroll.offset !== offsetY) {
                scrollTop = Math.round(offsetY * layout.vScrollSpare / vScroll.space);
            }
        }
        that.scroll(scrollLeft, scrollTop);
    };

    DataGrid.prototype.renderScrolls = function() {
        var that     = this;
        var layout   = that.layout;
        var vSize    = layout.vScrollSpare;
        var hSize    = layout.hScrollSpare;
        var showVBar = vSize > 0;
        var showHBar = hSize > 0;
        that.$vScroll.toggle(showVBar);
        that.$hScroll.toggle(showHBar);
        layout.scrollLeft = showHBar ? Math.max(0, Math.min(hSize, layout.scrollLeft)) : 0;
        layout.scrollTop = showVBar ? Math.max(0, Math.min(vSize, layout.scrollTop)) : 0;
        if (showVBar) {
            var $bar = that.$vScrollbar;
            var scale = layout.containerHeight / layout.height;
            var barSize = Math.max(20, Math.floor(scale * layout.containerHeight));
            var scrollSpace = layout.containerHeight - barSize;
            var scrollScale = scrollSpace / vSize;
            var offset = Math.round(layout.scrollTop * scrollScale);
            layout.vScroll = {
                space: scrollSpace,
                size: vSize,
                scale: scrollScale,
                barSize: barSize,
                offset: offset
            };
            var barStyle = {
                height: barSize,
                top: offset
            };
            $bar.css(barStyle);
        }
        if (showHBar) {
            var $bar = that.$hScrollbar;
            var scale = layout.containerWidth / layout.width;
            var barSize = Math.max(20, Math.floor(scale * layout.containerWidth));
            var scrollSpace = layout.containerWidth - barSize;
            var offset = Math.round(layout.scrollLeft * scrollSpace / hSize);
            var barStyle = {
                width: barSize,
                left: offset
            };
            layout.hScroll = {
                offset: offset,
                space: scrollSpace,
                size: hSize,
                barSize: barSize
            };
            $bar.css(barStyle);
        }
        that.$cells.css({
            top: layout.partialRendering ? 0 : -layout.scrollTop,
            left: -layout.scrollLeft
        });
    };

    DataGrid.prototype.scroll = function(scrollLeft, scrollTop, ignoreDelay) {
        var that = this;
        var now  = new Date();
        var scrollDelay = that.options.scrollDelay;
        if (scrollDelay) {
            if (!ignoreDelay && that.lastScrollTime && (now - that.lastScrollTime) < scrollDelay) {
                if (that.scrollDelayTimer) {
                    clearTimeout(that.scrollDelayTimer);
                }
                that.scrollDelayTimer = setTimeout(function() {
                    that.scroll(scrollLeft, scrollTop);
                }, (scrollDelay - ((now - that.lastScrollTime))));

                return;
            }
            if (that.scrollDelayTimer) {
                clearTimeout(that.scrollDelayTimer);
                that.scrollDelayTimer = null;
            }
            that.lastScrollTime = now;
        }
        var layout = that.layout;
        var hScrolled = false, vScrolled = false;
        if (typeof scrollLeft === 'number') {
            scrollLeft = Math.max(0, Math.min(scrollLeft, layout.width - layout.containerWidth));
            if (scrollLeft !== layout.scrollLeft) {
                hScrolled = true;
                layout.scrollLeft = scrollLeft;
            }
        }
        if (typeof scrollTop === 'number') {
            scrollTop = Math.max(0, Math.min(scrollTop, layout.height - layout.containerHeight));
            if (scrollTop !== layout.scrollTop) {
                vScrolled = true;
                layout.scrollTop = scrollTop;
            }
        }

        if (vScrolled && layout.partialRendering) {
            that.renderData();
        }

        if (hScrolled || vScrolled) {
            that.renderScrolls();
            that.renderFixeds();
        }

        that.$.callComEvent(that, 'onScroll', [scrollLeft, scrollTop, {vScrolled: vScrolled, hScrolled: hScrolled}]);
    };

    DataGrid.prototype.renderFixeds = function() {
        var that   = this;
        var states = that.states;
        var layout = that.layout;

        that.$cells.find('.datagrid-fixed').removeClass('datagrid-fixed');
        that.$cells.find('.datagrid-fixed-edge-top').removeClass('datagrid-fixed-edge-top');
        that.$cells.find('.datagrid-fixed-edge-bottom').removeClass('datagrid-fixed-edge-bottom');
        that.$cells.find('.datagrid-fixed-edge-left').removeClass('datagrid-fixed-edge-left');
        that.$cells.find('.datagrid-fixed-edge-right').removeClass('datagrid-fixed-edge-right');

        if (layout.vScrollSpare) {
            var fixedTopUntil = states.fixedTopUntil;
            if (typeof fixedTopUntil === 'number' && fixedTopUntil > -1) {
                fixedTopUntil = Math.min(fixedTopUntil, layout.rowsLength);
                for (var i = 0; i <= fixedTopUntil; ++i) {
                    var rowLayout = that.getRowLayout(i);
                    var $row = $('#' + that.id + '-row-' + i);
                    var fixedTop = layout.partialRendering ? rowLayout.top : (rowLayout.top + layout.scrollTop);
                    $row.addClass('datagrid-fixed').css('top', fixedTop);
                    if (i === fixedTopUntil && layout.scrollTop) {
                        $row.addClass('datagrid-fixed-edge-top');
                    }
                }
            } else {
                fixedTopUntil = -1;
            }
            var fixedBottomFrom = states.fixedBottomFrom;
            if (typeof fixedBottomFrom === 'number' && fixedBottomFrom > -1) {
                fixedBottomFrom = Math.max(fixedTopUntil > -1 ? (fixedTopUntil + 1) : 1, Math.min(fixedBottomFrom, layout.rowsLength));
                for (var i = fixedBottomFrom; i < layout.rowsLength; ++i) {
                    var rowLayout = that.getRowLayout(i);
                    var $row = $('#' + that.id + '-row-' + i);
                    var fixedTop = layout.partialRendering ? (rowLayout.top - layout.vScrollSpare) : (rowLayout.top - layout.vScrollSpare + layout.scrollTop);
                    $row.addClass('datagrid-fixed').css('top', fixedTop);
                    if (i === fixedBottomFrom && layout.scrollTop < layout.vScrollSpare) {
                        $row.addClass('datagrid-fixed-edge-bottom');
                    }
                }
            }
        }

        if (layout.hScrollSpare) {
            var fixedLeftUntil = states.fixedLeftUntil;
            if (typeof fixedLeftUntil === 'number' && fixedLeftUntil > -1) {
                fixedLeftUntil = Math.min(fixedLeftUntil, layout.colsLength);
                for (var i = 0; i <= fixedLeftUntil; ++i) {
                    var colLayout = layout.cols[i];
                    var $cols = that.$cells.find('.datagrid-cell[data-col="' + i + '"]');
                    var fixedLeft = colLayout.left + layout.scrollLeft - layout.borderWidth;
                    $cols.addClass('datagrid-fixed').css('left', fixedLeft);
                    if (i === fixedLeftUntil && layout.scrollLeft) {
                        $cols.addClass('datagrid-fixed-edge-left');
                    }
                }
            } else {
                fixedLeftUntil = -1;
            }
            var fixedRightFrom = states.fixedRightFrom;
            if (typeof fixedRightFrom === 'number' && fixedRightFrom > -1) {
                fixedRightFrom = Math.max(fixedLeftUntil > -1 ? (fixedLeftUntil + 1) : 1, Math.min(fixedRightFrom, layout.colsLength));
                for (var i = fixedRightFrom; i < layout.colsLength; ++i) {
                    var colLayout = layout.cols[i];
                    var $cols = that.$cells.find('.datagrid-cell[data-col="' + i + '"]');
                    var fixedLeft = colLayout.left - layout.hScrollSpare + layout.scrollLeft;
                    $cols.addClass('datagrid-fixed').css('left', fixedLeft);
                    if (i === fixedRightFrom && layout.scrollLeft < layout.hScrollSpare) {
                        $cols.addClass('datagrid-fixed-edge-right');
                    }
                }
            }
        }
    };

    // default options
    DataGrid.DEFAULTS = {
        // The data grid width, if set 'auto', then use the container element width
        width: 'auto',

        // The data grid height, if set 'page', then use the page height
        height: 400,

        // The init data, require an object array
        // dataSource: null,

        // The cells configurations
        // configs: null,

        // The cells default states
        // states: null,

        // Cell default height
        rowDefaultHeight: 36,

        // Column default width
        colAutoDefaultWidth: 80,

        // Column min width
        colAutoMinWidth: 50,

        // Show cells header
        showHeader: true,

        // Cells header height
        headerHeight: 36,

        // Show row index number
        showRowIndex: true,

        // Row index width
        rowIndexWidth: 'auto',

        // Create cell element
        // cellCreator: null,

        // Format cell element
        // cellFormator: null,

        // Row creator
        // rowCreator: null,

        // Border width (px)
        borderWidth: 1,

        // Use row hover effection
        hoverRow: true,

        // Use column hover effection
        hoverCol: true,

        // Use cell hover effection
        hoverCell: false,

        // Relayout on container resize
        responsive: true,

        // Value operator
        // valueOperator: null,

        // Default date formater
        defaultDateFormater: 'yyyy-MM-dd hh:mm',

        // Partial rendering can show large amount data in high efficiency
        partialRendering: 'auto',

        // Scroll event trigger delay time
        scrollDelay: 0,

        // Delay render time
        renderDelay: 100,

        // On user scroll list
        // onScroll: null,

        // On render datagrid
        // onRender: null,

        // Search filter function
        // searchFunc: null,

        // Sort function
        // sortFunc: null,

        // Sort by click column headers
        // sortable: false,

        // Show checkboxes and let user select a row
        // checkable: false,

        // Let user check by click row
        checkByClickRow: true,

        // Let user check rows by drag
        selectable: true
    };

    // Extense jquery element
    $.fn.datagrid = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(NAME);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(NAME, (data = new DataGrid(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };

    DataGrid.NAME = NAME;

    $.fn.datagrid.Constructor = DataGrid;

    // Auto call datagrid after document load complete
    $(function() {
        $('[data-ride="datagrid"]').datagrid();
    });
}(jQuery, undefined));

