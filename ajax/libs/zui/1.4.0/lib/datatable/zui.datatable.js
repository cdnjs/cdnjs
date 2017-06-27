/*!
 * ZUI - v1.4.0 - 2016-01-26
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2016 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: datatable.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($) {
    'use strict';

    var name = 'zui.datatable';
    var store = $.zui.store;

    var DataTable = function(element, options) {
        this.name = name;
        this.$ = $(element);
        this.isTable = (this.$[0].tagName === 'TABLE');
        this.firstShow = true;
        if(this.isTable) {
            this.$table = this.$;
            this.id = 'datatable-' + (this.$.attr('id') || $.zui.uuid());
        } else {
            this.$datatable = this.$.addClass('datatable');
            if(this.$.attr('id')) {
                this.id = this.$.attr('id');
            } else {
                this.id = 'datatable-' + $.zui.uuid();
                this.$.attr('id', this.id);
            }
        }
        this.getOptions(options);
        this.load();

        this.callEvent('ready');
    };

    // default options
    DataTable.DEFAULTS = {
        // Check options
        checkable: false, // added check icon to the head of rows
        checkByClickRow: true, // change check status by click anywhere on a row
        checkedClass: 'active', // apply CSS class to an checked row
        checkboxName: null,

        // Sort options
        sortable: false, // enable sorter

        // storage
        storage: true, // enable storage

        // fixed header of columns
        fixedHeader: true, // fixed header
        fixedHeaderOffset: 0, // set top offset of header when fixed
        fixedLeftWidth: '30%', // set left width after first render
        fixedRightWidth: '30%', // set right width after first render
        flexHeadDrag: true, // scroll flexarea by drag header
        scrollPos: 'in', // scroll bar position: 'out' | 'in'

        // hover effection
        rowHover: true, // apply hover effection to row
        colHover: true, // apply hover effection to head
        hoverClass: 'hover',
        colHoverClass: 'col-hover',

        // Merge rows
        mergeRows: false, // Merge rows

        // custom columns size
        // customizable: false, // enable customizable
        minColWidth: 20, // min width of columns
        minFixedLeftWidth: 200, // min left width
        minFixedRightWidth: 200, // min right width
        minFlexAreaWidth: 200 // min flexarea width
    };

    // Get options
    DataTable.prototype.getOptions = function(options) {
        var $e = this.$;
        options = $.extend({}, DataTable.DEFAULTS, this.$.data(), options);

        options.tableClass = options.tableClass || '';
        options.tableClass = ' ' + options.tableClass + ' table-datatable';

        $.each(['bordered', 'condensed', 'striped', 'condensed', 'fixed'], function(idx, cls) {
            cls = 'table-' + cls;
            if($e.hasClass(cls)) options.tableClass += ' ' + cls;
        });

        if($e.hasClass('table-hover') || options.rowHover) {
            options.tableClass += ' table-hover';
        }

        this.options = options;
    };

    // Load data form options or table dom
    DataTable.prototype.load = function(data) {
        var options = this.options,
            cols;

        if($.isFunction(data)) {
            data = data(this.data, this);
            data.keepSort = true;
        } else if($.isPlainObject(data)) {
            this.data = data;
        } else if(typeof data === 'string') {
            var $table = $(data);
            if($table.length) {
                this.$table = $table.first();
                this.$table.data(name, this);
                this.isTable = true;
            }
            data = null;
        } else {
            data = options.data;
        }

        if(!data) {
            if(this.isTable) {
                data = {
                    cols: [],
                    rows: []
                };
                cols = data.cols;
                var rows = data.rows,
                    i,
                    $th, $tr, $td, row, $t = this.$table,
                    colSpan;

                $t.find('thead > tr:first').children('th').each(function() {
                    $th = $(this);
                    cols.push($.extend({
                        text: $th.html(),
                        flex: false || $th.hasClass('flex-col'),
                        width: 'auto',
                        cssClass: $th.attr('class'),
                        css: $th.attr('style'),
                        type: 'string',
                        ignore: $th.hasClass('ignore'),
                        sort: !$th.hasClass('sort-disabled'),
                        mergeRows: $th.attr('merge-rows')
                    }, $th.data()));
                });

                $t.find('tbody > tr').each(function() {
                    $tr = $(this);
                    row = $.extend({
                        data: [],
                        checked: false,
                        cssClass: $tr.attr('class'),
                        css: $tr.attr('style'),
                        id: $tr.attr('id')
                    }, $tr.data());

                    $tr.children('td').each(function() {
                        $td = $(this);
                        colSpan = $td.attr('colspan') || 1;
                        row.data.push($.extend({
                            cssClass: $td.attr('class'),
                            css: $td.attr('style'),
                            text: $td.html(),
                            colSpan: colSpan,
                            title: $td.attr('title')
                        }, $td.data()));

                        if(colSpan > 1) {
                            for(i = 1; i < colSpan; i++) {
                                row.data.push({
                                    empty: true
                                });
                            }
                        }
                    });

                    rows.push(row);
                });

                var $tfoot = $t.find('tfoot');
                if($tfoot.length) {
                    data.footer = $('<table class="table' + options.tableClass + '"></table>').append($tfoot);
                }
            } else {
                throw new Error('No data avaliable!');
            }
        }

        data.flexStart = -1;
        data.flexEnd = -1;

        cols = data.cols;
        data.colsLength = cols.length;
        for(var i = 0; i < data.colsLength; ++i) {
            var col = cols[i];
            if(col.flex) {
                if(data.flexStart < 0) {
                    data.flexStart = i;
                }

                data.flexEnd = i;
            }
        }

        if(data.flexStart === 0 && data.flexEnd === data.colsLength) {
            data.flexStart = -1;
            data.flexEnd = -1;
        }

        data.flexArea = data.flexStart >= 0;
        data.fixedRight = data.flexEnd >= 0 && data.flexEnd < (data.colsLength - 1);
        data.fixedLeft = data.flexStart > 0;
        if(data.flexStart < 0 && data.flexEnd < 0) {
            data.fixedLeft = true;
            data.flexStart = data.colsLength;
            data.flexEnd = data.colsLength;
        }

        this.data = data;

        this.callEvent('afterLoad', {
            data: data
        });

        this.render();
    };

    // Render datatable
    DataTable.prototype.render = function() {
        var that = this;
        var $datatable = that.$datatable || (that.isTable ? $('<div class="datatable" id="' + that.id + '"/>') : that.$datatable),
            options = that.options,
            data = that.data,
            cols = that.data.cols,
            rows = that.data.rows;
        var checkable = options.checkable,
            $left,
            i,
            $right,
            $flex,
            dataRowSpan = '<div class="datatable-rows-span datatable-span"><div class="datatable-wrapper"><table class="table"></table></div></div>',
            dataHeadSpan = '<div class="datatable-head-span datatable-span"><div class="datatable-wrapper"><table class="table"><thead></thead></table></div></div>';

        $datatable.children('.datatable-head, .datatable-rows, .scroll-wrapper').remove();

        // Set css class to datatable by options
        $datatable.toggleClass('sortable', options.sortable);
        // $datatable.toggleClass('customizable', options.customizable);

        // Head
        var $head = $('<div class="datatable-head"/>'),
            $tr,
            $th,
            col;
        $left = $('<tr/>');
        $right = $('<tr/>');
        $flex = $('<tr/>');
        for(i = 0; i < cols.length; i++) {
            col = cols[i];
            $tr = i < data.flexStart ? $left : ((i >= data.flexStart && i <= data.flexEnd) ? $flex : $right);
            if(i === 0 && checkable) {
                $tr.append('<th data-index="check" class="check-all check-btn"><i class="icon-check-empty"></i></th>');
            }
            if(col.ignore) continue;

            $th = $('<th/>');

            // set sort class
            $th.toggleClass('sort-down', col.sort === 'down')
                .toggleClass('sort-up', col.sort === 'up')
                .toggleClass('sort-disabled', col.sort === false);

            $th.addClass(col.cssClass)
                .addClass(col.colClass)
                .html(col.text)
                .attr({
                    'data-index': i,
                    'data-type': col.type,
                    style: col.css
                });


            $tr.append($th);
        }

        var $headSpan;
        if(data.fixedLeft) {
            $headSpan = $(dataHeadSpan);
            $headSpan.addClass('fixed-left')
                // .find('.datatable-wrapper')
                // .append('<div class="size-handle size-handle-head size-handle-left"></div>')
                .find('table')
                .addClass(options.tableClass)
                .find('thead').append($left);
            $head.append($headSpan);
        }
        if(data.flexArea) {
            $headSpan = $(dataHeadSpan);
            $headSpan.addClass('flexarea')
                .find('.datatable-wrapper')
                .append('<div class="scrolled-shadow scrolled-in-shadow"></div><div class="scrolled-shadow scrolled-out-shadow"></div>')
                .find('table')
                .addClass(options.tableClass)
                .find('thead').append($flex);
            $head.append($headSpan);
        }
        if(data.fixedRight) {
            $headSpan = $(dataHeadSpan);
            $headSpan.addClass('fixed-right')
                // .find('.datatable-wrapper')
                // .append('<div class="size-handle size-handle-head size-handle-right"></div>')
                .find('table')
                .addClass(options.tableClass)
                .find('thead').append($right);
            $head.append($headSpan);
        }
        $datatable.append($head);

        // Rows
        var $rows = $('<div class="datatable-rows">');
        var $leftRow,
            $flexRow,
            $rightRow,
            // $tr,
            $td,
            $cTd,
            row,
            rowLen = rows.length,
            rowCol,
            rowColLen;
        $left = $('<tbody/>');
        $right = $('<tbody/>');
        $flex = $('<tbody/>');

        for(var r = 0; r < rowLen; ++r) {
            row = rows[r];

            // format row
            if(typeof row.id === 'undefined') {
                row.id = r;
            }
            row.index = r;

            $leftRow = $('<tr/>');
            $leftRow.addClass(row.cssClass)
                .toggleClass(options.checkedClass, row.checked)
                .attr({
                    'data-index': r,
                    'data-id': row.id
                });
            $flexRow = $leftRow.clone();
            $rightRow = $leftRow.clone();

            rowColLen = row.data.length;
            for(i = 0; i < rowColLen; ++i) {
                rowCol = row.data[i];
                if(i > 0 && rowCol.empty) {
                    continue;
                }

                $tr = i < data.flexStart ? $leftRow : ((i >= data.flexStart && i <= data.flexEnd) ? $flexRow : $rightRow);
                if(i === 0 && checkable) {
                    $cTd = $('<td data-index="check" class="check-row check-btn"><i class="icon-check-empty"></i></td>');
                    if(options.checkboxName) {
                        $cTd.append('<input class="hide" type="checkbox" name="' + options.checkboxName + '" value="' + row.id + '">');
                    }
                    $tr.append($cTd);
                }

                if(cols[i].ignore) continue;

                // format row column
                if(!$.isPlainObject(rowCol)) {
                    rowCol = {
                        text: rowCol,
                        row: r,
                        index: i
                    };
                } else {
                    rowCol.row = r;
                    rowCol.index = i;
                }
                row.data[i] = rowCol;

                $td = $('<td/>');

                $td.html(rowCol.text)
                    .addClass(rowCol.cssClass)
                    .addClass(cols[i].colClass)
                    .attr('colspan', rowCol.colSpan)
                    .attr({
                        'data-row': r,
                        'data-index': i,
                        'data-flex': false,
                        'data-type': cols[i].type,
                        style: rowCol.css,
                        title: rowCol.title || ''
                    });


                $tr.append($td);
            }

            $left.append($leftRow);
            $flex.append($flexRow);
            $right.append($rightRow);
        }

        var $rowSpan;
        if(data.fixedLeft) {
            $rowSpan = $(dataRowSpan);
            $rowSpan.addClass('fixed-left')
                .find('table')
                .addClass(options.tableClass)
                .append($left);
            $rows.append($rowSpan);
        }
        if(data.flexArea) {
            $rowSpan = $(dataRowSpan);
            $rowSpan.addClass('flexarea')
                .find('.datatable-wrapper')
                .append('<div class="scrolled-shadow scrolled-in-shadow"></div><div class="scrolled-shadow scrolled-out-shadow"></div>')
                .find('table')
                .addClass(options.tableClass)
                .append($flex);
            $rows.append($rowSpan);
        }
        if(data.fixedRight) {
            $rowSpan = $(dataRowSpan);
            $rowSpan.addClass('fixed-right')
                .find('table')
                .addClass(options.tableClass)
                .append($right);
            $rows.append($rowSpan);
        }
        $datatable.append($rows);

        if(data.flexArea) {
            $datatable.append('<div class="scroll-wrapper"><div class="scroll-slide scroll-pos-' + options.scrollPos + '"><div class="bar"></div></div></div>');
        }

        var $oldFooter = $datatable.children('.datatable-footer').detach();
        if(data.footer) {
            $datatable.append($('<div class="datatable-footer"/>').append(data.footer));
            data.footer = null;
        } else if($oldFooter.length) {
            $datatable.append($oldFooter);
        }

        that.$datatable = $datatable.data(name, that);
        if(that.isTable && that.firstShow) {
            that.$table.attr('data-datatable-id', this.id).hide().after($datatable);
            that.firstShow = false;
        }

        that.bindEvents();
        that.refreshSize();

        that.callEvent('render');
    };

    // Bind global events
    DataTable.prototype.bindEvents = function() {
        var that = this,
            data = this.data,
            options = this.options,
            store = $.zui.store,
            $datatable = this.$datatable;

        var $dataSpans = that.$dataSpans = $datatable.children('.datatable-head, .datatable-rows').find('.datatable-span');
        var $rowsSpans = that.$rowsSpans = $datatable.children('.datatable-rows').children('.datatable-rows-span');
        var $headSpans = that.$headSpans = $datatable.children('.datatable-head').children('.datatable-head-span');
        var $cells = that.$cells = $dataSpans.find('td, th');
        var $dataCells = that.$dataCells = $cells.filter('td');
        that.$headCells = $cells.filter('th');
        var $rows = that.$rows = that.$rowsSpans.find('.table > tbody > tr');

        // handle row hover events
        if(options.rowHover) {
            var hoverClass = options.hoverClass;
            $rowsSpans.on('mouseenter', 'td', function() {
                $dataCells.filter('.' + hoverClass).removeClass(hoverClass);
                $rows.filter('.' + hoverClass).removeClass(hoverClass);

                $rows.filter('[data-index="' + $(this).addClass(hoverClass).closest('tr').data('index') + '"]').addClass(hoverClass);
            }).on('mouseleave', 'td', function() {
                $dataCells.filter('.' + hoverClass).removeClass(hoverClass);
                $rows.filter('.' + hoverClass).removeClass(hoverClass);
            });
        }

        // handle col hover events
        if(options.colHover) {
            var colHoverClass = options.colHoverClass;
            $headSpans.on('mouseenter', 'th', function() {
                $cells.filter('.' + colHoverClass).removeClass(colHoverClass);
                $cells.filter('[data-index="' + $(this).data('index') + '"]').addClass(colHoverClass);
            }).on('mouseleave', 'th', function() {
                $cells.filter('.' + colHoverClass).removeClass(colHoverClass);
            });
        }

        // handle srcoll for flex area
        if(data.flexArea) {
            var $scrollbar = $datatable.find('.scroll-slide'),
                // $flexArea = $datatable.find('.datatable-span.flexarea .table'),
                $flexArea = $datatable.find('.datatable-span.flexarea'),
                $fixedLeft = $datatable.find('.datatable-span.fixed-left'),
                // $flexTable = $datatable.find('.datatable-rows-span.flexarea .table');
                $flexTable = $datatable.find('.datatable-span.flexarea .table');
            var $bar = $scrollbar.children('.bar'),
                flexWidth,
                scrollWidth,
                tableWidth,
                lastBarLeft,
                barLeft,
                scrollOffsetStoreName = that.id + '_' + 'scrollOffset',
                firtScroll,
                left;

            that.width = $datatable.width();
            $datatable.resize(function() {
                that.width = $datatable.width();
            });

            var srollTable = function(offset, silence) {
                barLeft = Math.max(0, Math.min(flexWidth - scrollWidth, offset));
                if(!silence) {
                    $datatable.addClass('scrolling');
                }
                $bar.css('left', barLeft);
                left = 0 - Math.floor((tableWidth - flexWidth) * barLeft / (flexWidth - scrollWidth));
                $flexTable.css('left', left);
                lastBarLeft = barLeft;

                $datatable.toggleClass('scrolled-in', barLeft > 2)
                    .toggleClass('scrolled-out', barLeft < flexWidth - scrollWidth - 2);

                if(options.storage) store.pageSet(scrollOffsetStoreName, barLeft);
            };
            var resizeScrollbar = function() {
                flexWidth = $flexArea.width();
                $scrollbar.width(flexWidth).css('left', $fixedLeft.width());
                tableWidth = $flexTable.width();
                scrollWidth = Math.floor((flexWidth * flexWidth) / tableWidth);
                $bar.css('width', scrollWidth);
                $flexTable.css('min-width', flexWidth);
                $datatable.toggleClass('show-scroll-slide', tableWidth > flexWidth);

                if(!firtScroll && flexWidth !== scrollWidth) {
                    firtScroll = true;
                    srollTable(store.pageGet(scrollOffsetStoreName, 0), true); // todo: unused?
                }

                if($datatable.hasClass('size-changing')) {
                    srollTable(barLeft, true);
                }
            };
            // $scrollbar.resize(resizeScrollbar); // todo: unuseful?
            $flexArea.resize(resizeScrollbar);
            if(options.storage) resizeScrollbar();

            var dragOptions = {
                move: false,
                stopPropagation: true,
                drag: function(e) {
                    srollTable($bar.position().left + e.smallOffset.x * (e.element.hasClass('bar') ? 1 : -1));
                },
                finish: function() {
                    $datatable.removeClass('scrolling');
                }
            };

            $bar.draggable(dragOptions);
            if(options.flexHeadDrag) {
                $datatable.find('.datatable-head-span.flexarea').draggable(dragOptions);
            }

            $scrollbar.mousedown(function(event) {
                var x = event.pageX - $scrollbar.offset().left;
                srollTable(x - (scrollWidth / 2));
            });
        }

        //  handle row check events
        if(options.checkable) {
            var checkedStatusStoreName = that.id + '_checkedStatus',
                checkedClass = options.checkedClass,
                rowId;
            var syncChecks = function() {
                var $checkRows = $rowsSpans.first().find('.table > tbody > tr');
                var $checkedRows = $checkRows.filter('.' + checkedClass);
                $checkRows.find('.check-row input:checkbox').prop('checked', false);
                var checkedStatus = {
                    checkedAll: $checkRows.length === $checkedRows.length && $checkedRows.length > 0,
                    checks: $checkedRows.map(function() {
                        rowId = $(this).data('id');
                        if(options.checkboxName) {
                            $(this).find('.check-row input:checkbox').prop('checked', true);
                        }
                        return rowId;
                    }).toArray()
                };
                $.each(data.rows, function(index, value) {
                    value.checked = ($.inArray(value.id, checkedStatus.checks) > -1);
                });
                $headSpans.find('.check-all').toggleClass('checked', checkedStatus.checkedAll);

                if(options.storage) store.pageSet(checkedStatusStoreName, checkedStatus);

                that.callEvent('checksChanged', {
                    checks: checkedStatus
                });
            };

            this.$rowsSpans.on('click', options.checkByClickRow ? 'tr' : '.check-row', function() {
                $rows.filter('[data-index="' + $(this).closest('tr').data('index') + '"]').toggleClass(checkedClass);
                syncChecks();
            });

            var checkAllEventName = 'click.zui.datatable.check-all';
            this.$datatable.off(checkAllEventName).on(checkAllEventName, '.check-all', function() {
                $rows.toggleClass(checkedClass, $(this).toggleClass('checked').hasClass('checked'));
                syncChecks();
            }).on('click', '.check-none', function() {
                $rows.toggleClass(checkedClass, false);
                syncChecks();
            }).on('click', '.check-inverse', function() {
                $rows.toggleClass(checkedClass);
                syncChecks();
            });

            if(options.storage) {
                var checkedStatus = store.pageGet(checkedStatusStoreName);
                if(checkedStatus) {
                    $headSpans.find('.check-all').toggleClass('checked', checkedStatus.checkedAll);
                    if(checkedStatus.checkedAll) {
                        $rows.addClass(checkedClass);
                    } else {
                        $rows.removeClass(checkedClass);
                        $.each(checkedStatus.checks, function(index, ele) {
                            $rows.filter('[data-id="' + ele + '"]').addClass(checkedClass);
                        });
                    }
                    if(checkedStatus.checks.length) {
                        syncChecks();
                    }
                }
            }
        }

        // fixed header
        if(options.fixedHeader) {
            var offsetTop,
                height,
                scrollTop,
                $dataTableHead = $datatable.children('.datatable-head'),
                navbarHeight = options.fixedHeaderOffset || $('.navbar.navbar-fixed-top').height() || 0;
            var handleScroll = function() {
                offsetTop = $datatable.offset().top;
                scrollTop = $(window).scrollTop();
                height = $datatable.height();
                $datatable.toggleClass('head-fixed', (scrollTop + navbarHeight) > offsetTop && (scrollTop + navbarHeight) < (offsetTop + height));
                if($datatable.hasClass('head-fixed')) {
                    $dataTableHead.css({
                        width: $datatable.width(),
                        top: navbarHeight
                    });
                } else {
                    $dataTableHead.attr('style', '');
                }
            };

            $(window).scroll(handleScroll);
            handleScroll();
        }

        // handle sort
        if(options.sortable) {
            $headSpans.on('click', 'th:not(.sort-disabled, .check-btn)', function() {
                if($datatable.hasClass('size-changing')) return;
                that.sortTable($(this));
            });

            if(options.storage) that.sortTable();
        } else if(options.mergeRows) {
            this.mergeRows();
        }
    };

    DataTable.prototype.mergeRows = function() {
        var $cells = this.$rowsSpans.find('.table > tbody > tr > td');
        var cols = this.data.cols;
        for(var i = 0; i < cols.length; i++) {
            var col = cols[i];
            if(col.mergeRows) {
                var $cs = $cells.filter('[data-index="' + i + '"]');
                if($cs.length > 1) {
                    var $lastCell, rowspan;
                    $cs.each(function() {
                        var $cell = $(this);
                        if($lastCell) {
                            if($cell.html() === $lastCell.html()) {
                                rowspan = $lastCell.attr('rowspan') || 1;
                                if(typeof rowspan !== 'number') {
                                    rowspan = parseInt(rowspan);
                                    if(isNaN(rowspan)) rowspan = 1;
                                }

                                $lastCell.attr('rowspan', rowspan + 1).css('vertical-align', 'middle');
                                $cell.remove();
                            } else {
                                $lastCell = $cell;
                            }
                        } else {
                            $lastCell = $cell;
                        }
                    });
                }
            }
        }
    };

    // Sort table
    DataTable.prototype.sortTable = function($th) {
        var store = $.zui.store,
            options = this.options;
        var sorterStoreName = this.id + '_datatableSorter';
        var sorter = options.storage ? store.pageGet(sorterStoreName) : null;

        if(!$th) {
            if(sorter) {
                $th = this.$headCells.filter('[data-index="' + sorter.index + '"]').addClass('sort-' + sorter.type);
            } else {
                $th = this.$headCells.filter('.sort-up, .sort-down').first();
            }
        }

        if(!$th.length) {
            return;
        }


        var data = this.data;
        var cols = data.cols,
            rows = data.rows,
            $headCells = this.$headCells,
            sortUp,
            type,
            index;

        sortUp = !$th.hasClass('sort-up');
        if(data.keepSort) sortUp = !sortUp;
        data.keepSort = null;

        $headCells.removeClass('sort-up sort-down');
        $th.addClass(sortUp ? 'sort-up' : 'sort-down');

        index = $th.data('index');

        $.each(cols, function(idx, col) {
            if(idx != index && (col.sort === 'up' || col.sort === 'down')) {
                col.sort = true;
            } else if(idx == index) {
                col.sort = sortUp ? 'up' : 'down';
                type = col.type;
            }
        });

        var valA, valB, result, $dataRows = this.$dataCells.filter('[data-index="' + index + '"]');
        rows.sort(function(cellA, cellB) {
            cellA = cellA.data[index];
            cellB = cellB.data[index];
            valA = $dataRows.filter('[data-row="' + cellA.row + '"]').text();
            valB = $dataRows.filter('[data-row="' + cellB.row + '"]').text();
            if(type === 'number') {
                valA = parseFloat(valA);
                valB = parseFloat(valB);
            } else if(type === 'date') {
                valA = Date.parse(valA);
                valB = Date.parse(valB);
            } else {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }
            result = valA > valB ? 1 : (valA < valB ? -1 : 0);
            if(sortUp) {
                result = result * (-1);
            }
            return result;
        });

        var $rows = this.$rows,
            lastRows = [],
            $row, $lastRow, $r;
        $.each(rows, function(idx, row) {
            $row = $rows.filter('[data-index="' + row.index + '"]');
            $row.each(function(rIdx) {
                $r = $(this);
                $lastRow = lastRows[rIdx];
                if($lastRow) {
                    $lastRow.after($r);
                } else {
                    $r.parent().prepend($r);
                }
                lastRows[rIdx] = $r;
            });
        });

        sorter = {
            index: index,
            type: sortUp ? 'up' : 'down'
        };

        // save sort with local storage
        if(options.storage) store.pageSet(sorterStoreName, sorter);

        this.callEvent('sort', {
            sorter: sorter
        });
    };

    // Refresh size
    DataTable.prototype.refreshSize = function() {
        var $datatable = this.$datatable,
            options = this.options,
            rows = this.data.rows,
            cols = this.data.cols,
            i;

        $datatable.find('.datatable-span.fixed-left').css('width', options.fixedLeftWidth);
        $datatable.find('.datatable-span.fixed-right').css('width', options.fixedRightWidth);

        var findMaxHeight = function($cells) {
                var mx = 0,
                    $cell, rowSpan;
                $cells.css('height', 'auto');
                $cells.each(function() {
                    $cell = $(this);
                    rowSpan = $cell.attr('rowspan');
                    if(!rowSpan || rowSpan == 1) mx = Math.max(mx, $cell.outerHeight());
                });
                return mx;
            },
            $dataCells = this.$dataCells,
            $cells = this.$cells,
            $headCells = this.$headCells;

        // set width of data cells
        for(i = 0; i < cols.length; ++i) {
            $cells.filter('[data-index="' + i + '"]').css('width', cols[i].width);
        }

        // set height of head cells
        var headMaxHeight = findMaxHeight($headCells);
        $headCells.css('min-height', headMaxHeight).css('height', headMaxHeight);

        // set height of data cells
        var $rowCells;
        for(i = 0; i < rows.length; ++i) {
            $rowCells = $dataCells.filter('[data-row="' + i + '"]');
            var rowMaxHeight = findMaxHeight($rowCells);
            $rowCells.css('min-height', rowMaxHeight).css('height', rowMaxHeight);
        }
    };

    // Call event
    DataTable.prototype.callEvent = function(name, params) {
        var result = this.$.callEvent(name + '.' + this.name, params, this).result;
        return !(result !== undefined && (!result));
    };

    $.fn.datatable = function(option, newData) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(name);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(name, (data = new DataTable(this, options)));

            if(typeof option == 'string') {
                if(option === 'load' && $.isPlainObject(newData) && (newData.keepSort === undefined || newData.keepSort === null)) newData.keepSort = true;
                data[option](newData);
            }
        });
    };

    $.fn.datatable.Constructor = DataTable;
}(jQuery));

