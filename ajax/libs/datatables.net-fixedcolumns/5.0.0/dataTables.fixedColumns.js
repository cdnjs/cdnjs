/*! FixedColumns 5.0.0
 * © SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net')(root, $);
			}
		};

		if (typeof window === 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document ) {
'use strict';
var DataTable = $.fn.dataTable;


(function () {
    'use strict';

    var $$1;
    var DataTable$1;
    function setJQuery(jq) {
        $$1 = jq;
        DataTable$1 = $$1.fn.dataTable;
    }
    var FixedColumns = /** @class */ (function () {
        function FixedColumns(settings, opts) {
            var _this = this;
            // Check that the required version of DataTables is included
            if (!DataTable$1 ||
                !DataTable$1.versionCheck ||
                !DataTable$1.versionCheck('2')) {
                throw new Error('FixedColumns requires DataTables 2 or newer');
            }
            var table = new DataTable$1.Api(settings);
            this.classes = $$1.extend(true, {}, FixedColumns.classes);
            // Get options from user
            this.c = $$1.extend(true, {}, FixedColumns.defaults, opts);
            this.s = {
                dt: table,
                rtl: $$1(table.table().node()).css('direction') === 'rtl'
            };
            // Backwards compatibility for deprecated options
            if (opts && opts.leftColumns !== undefined) {
                opts.left = opts.leftColumns;
            }
            if (opts && opts.left !== undefined) {
                this.c[this.s.rtl ? 'end' : 'start'] = opts.left;
            }
            if (opts && opts.rightColumns !== undefined) {
                opts.right = opts.rightColumns;
            }
            if (opts && opts.right !== undefined) {
                this.c[this.s.rtl ? 'start' : 'end'] = opts.right;
            }
            this.dom = {
                bottomBlocker: $$1('<div>').addClass(this.classes.bottomBlocker),
                topBlocker: $$1('<div>').addClass(this.classes.topBlocker),
                scroller: $$1('div.dt-scroll-body', this.s.dt.table().container())
            };
            if (this.s.dt.settings()[0]._bInitComplete) {
                // Fixed Columns Initialisation
                this._addStyles();
                this._setKeyTableListener();
            }
            else {
                table.one('init.dt.dtfc', function () {
                    // Fixed Columns Initialisation
                    _this._addStyles();
                    _this._setKeyTableListener();
                });
            }
            // Lots or reasons to redraw the column styles
            table.on('column-sizing.dt.dtfc column-reorder.dt.dtfc draw.dt.dtfc', function () { return _this._addStyles(); });
            // Column visibility can trigger a number of times quickly, so we debounce it
            var debounced = DataTable$1.util.debounce(function () {
                _this._addStyles();
            }, 50);
            table.on('column-visibility.dt.dtfc', function () {
                debounced();
            });
            // Add classes to indicate scrolling state for styling
            this.dom.scroller.on('scroll.dtfc', function () { return _this._scroll(); });
            this._scroll();
            // Make class available through dt object
            table.settings()[0]._fixedColumns = this;
            table.on('destroy', function () { return _this._destroy(); });
            return this;
        }
        FixedColumns.prototype.end = function (newVal) {
            // If the value is to change
            if (newVal !== undefined) {
                if (newVal >= 0 && newVal <= this.s.dt.columns().count()) {
                    // Set the new values and redraw the columns
                    this.c.end = newVal;
                    this._addStyles();
                }
                return this;
            }
            return this.c.end;
        };
        /**
         * Left fix - accounting for RTL
         *
         * @param count Columns to fix, or undefined for getter
         */
        FixedColumns.prototype.left = function (count) {
            return this.s.rtl
                ? this.end(count)
                : this.start(count);
        };
        /**
         * Right fix - accounting for RTL
         *
         * @param count Columns to fix, or undefined for getter
         */
        FixedColumns.prototype.right = function (count) {
            return this.s.rtl
                ? this.start(count)
                : this.end(count);
        };
        FixedColumns.prototype.start = function (newVal) {
            // If the value is to change
            if (newVal !== undefined) {
                if (newVal >= 0 && newVal <= this.s.dt.columns().count()) {
                    // Set the new values and redraw the columns
                    this.c.start = newVal;
                    this._addStyles();
                }
                return this;
            }
            return this.c.start;
        };
        /**
         * Iterates over the columns, fixing the appropriate ones to the left and right
         */
        FixedColumns.prototype._addStyles = function () {
            var dt = this.s.dt;
            var that = this;
            var colCount = this.s.dt.columns(':visible').count();
            var headerStruct = dt.table().header.structure(':visible');
            var footerStruct = dt.table().footer.structure(':visible');
            var widths = dt.columns(':visible').widths().toArray();
            var wrapper = $$1(dt.table().node()).closest('div.dt-scroll');
            var scroller = $$1(dt.table().node()).closest('div.dt-scroll-body')[0];
            var rtl = this.s.rtl;
            var start = this.c.start;
            var end = this.c.end;
            var left = rtl ? end : start;
            var right = rtl ? start : end;
            var barWidth = dt.settings()[0].oBrowser.barWidth; // dt internal
            // Do nothing if no scrolling in the DataTable
            if (wrapper.length === 0) {
                return this;
            }
            // Bar not needed - no vertical scrolling
            if (scroller.offsetWidth === scroller.clientWidth) {
                barWidth = 0;
            }
            // Loop over the visible columns, setting their state
            dt.columns(':visible').every(function (colIdx) {
                var visIdx = dt.column.index('toVisible', colIdx);
                var offset;
                if (visIdx < start) {
                    // Fix to the start
                    offset = that._sum(widths, visIdx);
                    that._fixColumn(visIdx, offset, 'start', headerStruct, footerStruct, barWidth);
                }
                else if (visIdx >= colCount - end) {
                    // Fix to the end
                    offset = that._sum(widths, colCount - visIdx - 1, true);
                    that._fixColumn(visIdx, offset, 'end', headerStruct, footerStruct, barWidth);
                }
                else {
                    // Release
                    that._fixColumn(visIdx, 0, 'none', headerStruct, footerStruct, barWidth);
                }
            });
            // Apply classes to table to indicate what state we are in
            $$1(dt.table().node())
                .toggleClass(that.classes.tableFixedStart, start > 0)
                .toggleClass(that.classes.tableFixedEnd, end > 0)
                .toggleClass(that.classes.tableFixedLeft, left > 0)
                .toggleClass(that.classes.tableFixedRight, right > 0);
            // Blocker elements for when scroll bars are always visible
            var headerEl = dt.table().header();
            var footerEl = dt.table().footer();
            var headerHeight = $$1(headerEl).outerHeight();
            var footerHeight = $$1(footerEl).outerHeight();
            this.dom.topBlocker
                .appendTo(wrapper)
                .css('top', 0)
                .css(this.s.rtl ? 'left' : 'right', 0)
                .css('height', headerHeight)
                .css('width', barWidth + 1)
                .css('display', barWidth ? 'block' : 'none');
            if (footerEl) {
                this.dom.bottomBlocker
                    .appendTo(wrapper)
                    .css('bottom', 0)
                    .css(this.s.rtl ? 'left' : 'right', 0)
                    .css('height', footerHeight)
                    .css('width', barWidth + 1)
                    .css('display', barWidth ? 'block' : 'none');
            }
        };
        /**
         * Clean up
         */
        FixedColumns.prototype._destroy = function () {
            this.s.dt.off('.dtfc');
            this.dom.scroller.off('.dtfc');
            $$1(this.s.dt.table().node())
                .removeClass(this.classes.tableScrollingEnd + ' ' +
                this.classes.tableScrollingLeft + ' ' +
                this.classes.tableScrollingStart + ' ' +
                this.classes.tableScrollingRight);
            this.dom.bottomBlocker.remove();
            this.dom.topBlocker.remove();
        };
        /**
         * Fix or unfix a column
         *
         * @param idx Column visible index to operate on
         * @param offset Offset from the start (pixels)
         * @param side start, end or none to unfix a column
         * @param header DT header structure object
         * @param footer DT footer structure object
         */
        FixedColumns.prototype._fixColumn = function (idx, offset, side, header, footer, barWidth) {
            var _this = this;
            var dt = this.s.dt;
            var applyStyles = function (jq, part) {
                if (side === 'none') {
                    jq.css('position', '')
                        .css('left', '')
                        .css('right', '')
                        .removeClass(_this.classes.fixedEnd + ' ' +
                        _this.classes.fixedLeft + ' ' +
                        _this.classes.fixedRight + ' ' +
                        _this.classes.fixedStart);
                }
                else {
                    var positionSide = side === 'start' ? 'left' : 'right';
                    if (_this.s.rtl) {
                        positionSide = side === 'start' ? 'right' : 'left';
                    }
                    var off = offset;
                    if (side === 'end' && (part === 'header' || part === 'footer')) {
                        off += barWidth;
                    }
                    jq.css('position', 'sticky')
                        .css(positionSide, off)
                        .addClass(side === 'start'
                        ? _this.classes.fixedStart
                        : _this.classes.fixedEnd)
                        .addClass(positionSide === 'left'
                        ? _this.classes.fixedLeft
                        : _this.classes.fixedRight);
                }
            };
            header.forEach(function (row) {
                if (row[idx]) {
                    applyStyles($$1(row[idx].cell), 'header');
                }
            });
            applyStyles(dt.column(idx + ':visible', { page: 'current' }).nodes().to$(), 'body');
            if (footer) {
                footer.forEach(function (row) {
                    if (row[idx]) {
                        applyStyles($$1(row[idx].cell), 'footer');
                    }
                });
            }
        };
        /**
         * Update classes on the table to indicate if the table is scrolling or not
         */
        FixedColumns.prototype._scroll = function () {
            var scroller = this.dom.scroller[0];
            // Not a scrolling table
            if (!scroller) {
                return;
            }
            // Need to update the classes on potentially multiple table tags. There is the
            // main one, the scrolling ones and if FixedHeader is active, the holding
            // position ones! jQuery will deduplicate for us.
            var table = $$1(this.s.dt.table().node())
                .add(this.s.dt.table().header().parentNode)
                .add(this.s.dt.table().footer().parentNode)
                .add('div.dt-scroll-headInner table', this.s.dt.table().container())
                .add('div.dt-scroll-footInner table', this.s.dt.table().container());
            var scrollLeft = scroller.scrollLeft; // 0 when fully scrolled left
            var ltr = !this.s.rtl;
            var scrollStart = scrollLeft !== 0;
            var scrollEnd = scroller.scrollWidth > (scroller.clientWidth + Math.abs(scrollLeft) + 1); // extra 1 for Chrome
            table.toggleClass(this.classes.tableScrollingStart, scrollStart);
            table.toggleClass(this.classes.tableScrollingEnd, scrollEnd);
            table.toggleClass(this.classes.tableScrollingLeft, (scrollStart && ltr) || (scrollEnd && !ltr));
            table.toggleClass(this.classes.tableScrollingRight, (scrollEnd && ltr) || (scrollStart && !ltr));
        };
        FixedColumns.prototype._setKeyTableListener = function () {
            var _this = this;
            this.s.dt.on('key-focus.dt.dtfc', function (e, dt, cell) {
                var currScroll;
                var cellPos = $$1(cell.node()).offset();
                var scroller = _this.dom.scroller[0];
                var scroll = $$1($$1(_this.s.dt.table().node()).closest('div.dt-scroll-body'));
                // If there are fixed columns to the left
                if (_this.c.start > 0) {
                    // Get the rightmost left fixed column header, it's position and it's width
                    var rightMost = $$1(_this.s.dt.column(_this.c.start - 1).header());
                    var rightMostPos = rightMost.offset();
                    var rightMostWidth = rightMost.outerWidth();
                    // If the current highlighted cell is left of the rightmost cell on the screen
                    if ($$1(cell.node()).hasClass(_this.classes.fixedLeft)) {
                        // Fixed columns have the scrollbar at the start, always
                        scroll.scrollLeft(0);
                    }
                    else if (cellPos.left < rightMostPos.left + rightMostWidth) {
                        // Scroll it into view
                        currScroll = scroll.scrollLeft();
                        scroll.scrollLeft(currScroll -
                            (rightMostPos.left + rightMostWidth - cellPos.left));
                    }
                }
                // If there are fixed columns to the right
                if (_this.c.end > 0) {
                    // Get the number of columns and the width of the cell as doing right side calc
                    var numCols = _this.s.dt.columns().data().toArray().length;
                    var cellWidth = $$1(cell.node()).outerWidth();
                    // Get the leftmost right fixed column header and it's position
                    var leftMost = $$1(_this.s.dt.column(numCols - _this.c.end).header());
                    var leftMostPos = leftMost.offset();
                    // If the current highlighted cell is right of the leftmost cell on the screen
                    if ($$1(cell.node()).hasClass(_this.classes.fixedRight)) {
                        scroll.scrollLeft(scroller.scrollWidth - scroller.clientWidth);
                    }
                    else if (cellPos.left + cellWidth > leftMostPos.left) {
                        // Scroll it into view
                        currScroll = scroll.scrollLeft();
                        scroll.scrollLeft(currScroll -
                            (leftMostPos.left - (cellPos.left + cellWidth)));
                    }
                }
            });
        };
        /**
         * Sum a range of values from an array
         *
         * @param widths
         * @param index
         * @returns
         */
        FixedColumns.prototype._sum = function (widths, index, reverse) {
            if (reverse === void 0) { reverse = false; }
            if (reverse) {
                widths = widths.slice().reverse();
            }
            return widths.slice(0, index).reduce(function (accum, val) { return accum + val; }, 0);
        };
        FixedColumns.version = '5.0.0';
        FixedColumns.classes = {
            bottomBlocker: 'dtfc-bottom-blocker',
            fixedEnd: 'dtfc-fixed-end',
            fixedLeft: 'dtfc-fixed-left',
            fixedRight: 'dtfc-fixed-right',
            fixedStart: 'dtfc-fixed-start',
            tableFixedEnd: 'dtfc-has-end',
            tableFixedLeft: 'dtfc-has-left',
            tableFixedRight: 'dtfc-has-right',
            tableFixedStart: 'dtfc-has-start',
            tableScrollingEnd: 'dtfc-scrolling-end',
            tableScrollingLeft: 'dtfc-scrolling-left',
            tableScrollingRight: 'dtfc-scrolling-right',
            tableScrollingStart: 'dtfc-scrolling-start',
            topBlocker: 'dtfc-top-blocker'
        };
        FixedColumns.defaults = {
            i18n: {
                button: 'FixedColumns'
            },
            start: 1,
            end: 0
        };
        return FixedColumns;
    }());

    /*! FixedColumns 5.0.0
     * © SpryMedia Ltd - datatables.net/license
     */
    setJQuery($);
    $.fn.dataTable.FixedColumns = FixedColumns;
    $.fn.DataTable.FixedColumns = FixedColumns;
    var apiRegister = DataTable.Api.register;
    apiRegister('fixedColumns()', function () {
        return this;
    });
    apiRegister('fixedColumns().start()', function (newVal) {
        var ctx = this.context[0];
        if (newVal !== undefined) {
            ctx._fixedColumns.start(newVal);
            return this;
        }
        else {
            return ctx._fixedColumns.start();
        }
    });
    apiRegister('fixedColumns().end()', function (newVal) {
        var ctx = this.context[0];
        if (newVal !== undefined) {
            ctx._fixedColumns.end(newVal);
            return this;
        }
        else {
            return ctx._fixedColumns.end();
        }
    });
    apiRegister('fixedColumns().left()', function (newVal) {
        var ctx = this.context[0];
        if (newVal !== undefined) {
            ctx._fixedColumns.left(newVal);
            return this;
        }
        else {
            return ctx._fixedColumns.left();
        }
    });
    apiRegister('fixedColumns().right()', function (newVal) {
        var ctx = this.context[0];
        if (newVal !== undefined) {
            ctx._fixedColumns.right(newVal);
            return this;
        }
        else {
            return ctx._fixedColumns.right();
        }
    });
    DataTable.ext.buttons.fixedColumns = {
        action: function (e, dt, node, config) {
            if ($(node).attr('active')) {
                $(node).removeAttr('active').removeClass('active');
                dt.fixedColumns().start(0);
                dt.fixedColumns().end(0);
            }
            else {
                $(node).attr('active', 'true').addClass('active');
                dt.fixedColumns().start(config.config.start);
                dt.fixedColumns().end(config.config.end);
            }
        },
        config: {
            start: 1,
            end: 0
        },
        init: function (dt, node, config) {
            if (dt.settings()[0]._fixedColumns === undefined) {
                _init(dt.settings(), config);
            }
            $(node).attr('active', 'true').addClass('active');
            dt.button(node).text(config.text || dt.i18n('buttons.fixedColumns', dt.settings()[0]._fixedColumns.c.i18n.button));
        },
        text: null
    };
    function _init(settings, options) {
        if (options === void 0) { options = null; }
        var api = new DataTable.Api(settings);
        var opts = options
            ? options
            : api.init().fixedColumns || DataTable.defaults.fixedColumns;
        var fixedColumns = new FixedColumns(api, opts);
        return fixedColumns;
    }
    // Attach a listener to the document which listens for DataTables initialisation
    // events so we can automatically initialise
    $(document).on('plugin-init.dt', function (e, settings) {
        if (e.namespace !== 'dt') {
            return;
        }
        if (settings.oInit.fixedColumns ||
            DataTable.defaults.fixedColumns) {
            if (!settings._fixedColumns) {
                _init(settings, null);
            }
        }
    });

})();


return DataTable;
}));
