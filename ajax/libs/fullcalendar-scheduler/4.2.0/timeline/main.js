/*!
FullCalendar Timeline Plugin v4.2.0
Docs & License: https://fullcalendar.io/scheduler
(c) 2019 Adam Shaw
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@fullcalendar/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@fullcalendar/core'], factory) :
    (global = global || self, factory(global.FullCalendarTimeline = {}, global.FullCalendar));
}(this, function (exports, core) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /*
    A rectangular area of content that lives within a Scroller.
    Can have "gutters", areas of dead spacing around the perimeter.
    Also very useful for forcing a width, which a Scroller cannot do alone.
    Has a content area that lives above a background area.
    */
    var ScrollerCanvas = /** @class */ (function () {
        function ScrollerCanvas() {
            this.gutters = {};
            this.el = core.htmlToElement("<div class=\"fc-scroller-canvas\"> <div class=\"fc-content\"></div> <div class=\"fc-bg\"></div> </div>");
            this.contentEl = this.el.querySelector('.fc-content');
            this.bgEl = this.el.querySelector('.fc-bg');
        }
        /*
        If falsy, resets all the gutters to 0
        */
        ScrollerCanvas.prototype.setGutters = function (gutters) {
            if (!gutters) {
                this.gutters = {};
            }
            else {
                __assign(this.gutters, gutters);
            }
            this.updateSize();
        };
        ScrollerCanvas.prototype.setWidth = function (width) {
            this.width = width;
            this.updateSize();
        };
        ScrollerCanvas.prototype.setMinWidth = function (minWidth) {
            this.minWidth = minWidth;
            this.updateSize();
        };
        ScrollerCanvas.prototype.clearWidth = function () {
            this.width = null;
            this.minWidth = null;
            this.updateSize();
        };
        ScrollerCanvas.prototype.updateSize = function () {
            var _a = this, gutters = _a.gutters, el = _a.el;
            // is border-box (width includes padding)
            core.forceClassName(el, 'fc-gutter-left', gutters.left);
            core.forceClassName(el, 'fc-gutter-right', gutters.right);
            core.forceClassName(el, 'fc-gutter-top', gutters.top);
            core.forceClassName(el, 'fc-gutter-bottom', gutters.bottom);
            core.applyStyle(el, {
                paddingLeft: gutters.left || '',
                paddingRight: gutters.right || '',
                paddingTop: gutters.top || '',
                paddingBottom: gutters.bottom || '',
                width: (this.width != null) ?
                    this.width + (gutters.left || 0) + (gutters.right || 0) :
                    '',
                minWidth: (this.minWidth != null) ?
                    this.minWidth + (gutters.left || 0) + (gutters.right || 0) :
                    ''
            });
            core.applyStyle(this.bgEl, {
                left: gutters.left || '',
                right: gutters.right || '',
                top: gutters.top || '',
                bottom: gutters.bottom || ''
            });
        };
        return ScrollerCanvas;
    }());

    var EnhancedScroller = /** @class */ (function (_super) {
        __extends(EnhancedScroller, _super);
        function EnhancedScroller(overflowX, overflowY) {
            var _this = _super.call(this, overflowX, overflowY) || this;
            // Scroll Events
            // ----------------------------------------------------------------------------------------------
            _this.reportScroll = function () {
                if (!_this.isScrolling) {
                    _this.reportScrollStart();
                }
                _this.trigger('scroll');
                _this.isMoving = true;
                _this.requestMovingEnd();
            };
            _this.reportScrollStart = function () {
                if (!_this.isScrolling) {
                    _this.isScrolling = true;
                    _this.trigger('scrollStart', _this.isTouching); // created in constructor
                }
            };
            // Touch Events
            // ----------------------------------------------------------------------------------------------
            // will fire *before* the scroll event is fired
            _this.reportTouchStart = function () {
                _this.isTouching = true;
            };
            _this.reportTouchEnd = function () {
                if (_this.isTouching) {
                    _this.isTouching = false;
                    // if touch scrolling was re-enabled during a recent touch scroll
                    // then unbind the handlers that are preventing it from happening.
                    if (_this.isTouchScrollEnabled) {
                        _this.unbindPreventTouchScroll(); // won't do anything if not bound
                    }
                    // if the user ended their touch, and the scroll area wasn't moving,
                    // we consider this to be the end of the scroll.
                    if (!_this.isMoving) {
                        _this.reportScrollEnd(); // won't fire if already ended
                    }
                }
            };
            _this.isScrolling = false;
            _this.isTouching = false;
            _this.isMoving = false;
            _this.isTouchScrollEnabled = true;
            _this.requestMovingEnd = core.debounce(_this.reportMovingEnd, 500);
            _this.canvas = new ScrollerCanvas();
            _this.el.appendChild(_this.canvas.el);
            _this.applyOverflow();
            _this.bindHandlers();
            return _this;
        }
        EnhancedScroller.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.unbindHandlers();
        };
        // Touch scroll prevention
        // ----------------------------------------------------------------------------------------------
        EnhancedScroller.prototype.disableTouchScroll = function () {
            this.isTouchScrollEnabled = false;
            this.bindPreventTouchScroll(); // will be unbound in enableTouchScroll or reportTouchEnd
        };
        EnhancedScroller.prototype.enableTouchScroll = function () {
            this.isTouchScrollEnabled = true;
            // only immediately unbind if a touch event is NOT in progress.
            // otherwise, it will be handled by reportTouchEnd.
            if (!this.isTouching) {
                this.unbindPreventTouchScroll();
            }
        };
        EnhancedScroller.prototype.bindPreventTouchScroll = function () {
            if (!this.preventTouchScrollHandler) {
                this.el.addEventListener('touchmove', (this.preventTouchScrollHandler = core.preventDefault));
            }
        };
        EnhancedScroller.prototype.unbindPreventTouchScroll = function () {
            if (this.preventTouchScrollHandler) {
                this.el.removeEventListener('touchmove', this.preventTouchScrollHandler);
                this.preventTouchScrollHandler = null;
            }
        };
        // Handlers
        // ----------------------------------------------------------------------------------------------
        EnhancedScroller.prototype.bindHandlers = function () {
            this.el.addEventListener('scroll', this.reportScroll);
            this.el.addEventListener('touchstart', this.reportTouchStart, { passive: true });
            this.el.addEventListener('touchend', this.reportTouchEnd);
        };
        EnhancedScroller.prototype.unbindHandlers = function () {
            this.el.removeEventListener('scroll', this.reportScroll);
            this.el.removeEventListener('touchstart', this.reportTouchStart, { passive: true });
            this.el.removeEventListener('touchend', this.reportTouchEnd);
        };
        EnhancedScroller.prototype.reportMovingEnd = function () {
            this.isMoving = false;
            // only end the scroll if not currently touching.
            // if touching, the scrolling will end later, on touchend.
            if (!this.isTouching) {
                this.reportScrollEnd();
            }
        };
        EnhancedScroller.prototype.reportScrollEnd = function () {
            if (this.isScrolling) {
                this.trigger('scrollEnd');
                this.isScrolling = false;
            }
        };
        // Horizontal Scroll Normalization
        // ----------------------------------------------------------------------------------------------
        // http://stackoverflow.com/questions/24276619/better-way-to-get-the-viewport-of-a-scrollable-div-in-rtl-mode/24394376#24394376
        // TODO: move all this to util functions
        /*
        If RTL, and scrolled to the left, returns NEGATIVE value (like Firefox)
        */
        EnhancedScroller.prototype.getScrollLeft = function () {
            var el = this.el;
            var direction = window.getComputedStyle(el).direction;
            var val = el.scrollLeft;
            if (direction === 'rtl') {
                switch (getRtlScrollSystem()) {
                    case 'positive':
                        val = (val + el.clientWidth) - el.scrollWidth;
                        break;
                    case 'reverse':
                        val = -val;
                        break;
                }
            }
            return val;
        };
        /*
        Accepts a NEGATIVE value for when scrolled in RTL
        */
        EnhancedScroller.prototype.setScrollLeft = function (val) {
            var el = this.el;
            var direction = window.getComputedStyle(el).direction;
            if (direction === 'rtl') {
                switch (getRtlScrollSystem()) {
                    case 'positive':
                        val = (val - el.clientWidth) + el.scrollWidth;
                        break;
                    case 'reverse':
                        val = -val;
                        break;
                }
            }
            el.scrollLeft = val;
        };
        /*
        Always returns the number of pixels scrolled from the leftmost position (even if RTL).
        Always positive.
        */
        EnhancedScroller.prototype.getScrollFromLeft = function () {
            var el = this.el;
            var direction = window.getComputedStyle(el).direction;
            var val = el.scrollLeft;
            if (direction === 'rtl') {
                switch (getRtlScrollSystem()) {
                    case 'negative':
                        val = (val - el.clientWidth) + el.scrollWidth;
                        break;
                    case 'reverse':
                        val = (-val - el.clientWidth) + el.scrollWidth;
                        break;
                }
            }
            return val;
        };
        return EnhancedScroller;
    }(core.ScrollComponent));
    core.EmitterMixin.mixInto(EnhancedScroller);
    // Horizontal Scroll System Detection
    // ----------------------------------------------------------------------------------------------
    var _rtlScrollSystem;
    function getRtlScrollSystem() {
        return _rtlScrollSystem || (_rtlScrollSystem = detectRtlScrollSystem());
    }
    function detectRtlScrollSystem() {
        var el = core.htmlToElement("<div style=\" position: absolute; top: -1000px; width: 1px; height: 1px; overflow: scroll; direction: rtl; font-size: 100px; \">A</div>");
        document.body.appendChild(el);
        var system;
        if (el.scrollLeft > 0) {
            system = 'positive';
        }
        else {
            el.scrollLeft = 1;
            if (el.scrollLeft > 0) {
                system = 'reverse';
            }
            else {
                system = 'negative';
            }
        }
        core.removeElement(el);
        return system;
    }

    /*
    A Scroller, but with a wrapping div that allows "clipping" away of native scrollbars,
    giving the appearance that there are no scrollbars.
    */
    var ClippedScroller = /** @class */ (function () {
        /*
        Received overflows can be set to 'clipped', meaning scrollbars shouldn't be visible
        to the user, but the area should still scroll.
        */
        function ClippedScroller(overflowX, overflowY, parentEl) {
            this.isHScrollbarsClipped = false;
            this.isVScrollbarsClipped = false;
            if (overflowX === 'clipped-scroll') {
                overflowX = 'scroll';
                this.isHScrollbarsClipped = true;
            }
            if (overflowY === 'clipped-scroll') {
                overflowY = 'scroll';
                this.isVScrollbarsClipped = true;
            }
            this.enhancedScroll = new EnhancedScroller(overflowX, overflowY);
            parentEl.appendChild(this.el = core.createElement('div', {
                className: 'fc-scroller-clip'
            }));
            this.el.appendChild(this.enhancedScroll.el);
        }
        ClippedScroller.prototype.destroy = function () {
            core.removeElement(this.el);
        };
        ClippedScroller.prototype.updateSize = function () {
            var enhancedScroll = this.enhancedScroll;
            var scrollEl = enhancedScroll.el;
            var edges = core.computeEdges(scrollEl);
            var cssProps = { marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0 };
            // give the inner scrolling div negative margins so that its scrollbars
            // are nudged outside of the bounding box of the wrapper, which is overflow:hidden
            if (this.isVScrollbarsClipped) {
                cssProps.marginLeft = -edges.scrollbarLeft;
                cssProps.marginRight = -edges.scrollbarRight;
            }
            if (this.isHScrollbarsClipped) {
                cssProps.marginBottom = -edges.scrollbarBottom;
            }
            core.applyStyle(scrollEl, cssProps);
            // if we are attempting to hide the scrollbars offscreen, OSX/iOS will still
            // display the floating scrollbars. attach a className to force-hide them.
            if ((this.isHScrollbarsClipped || (enhancedScroll.overflowX === 'hidden')) && // should never show?
                (this.isVScrollbarsClipped || (enhancedScroll.overflowY === 'hidden')) && // should never show?
                !( // doesn't have any scrollbar mass
                edges.scrollbarLeft ||
                    edges.scrollbarRight ||
                    edges.scrollbarBottom)) {
                scrollEl.classList.add('fc-no-scrollbars');
            }
            else {
                scrollEl.classList.remove('fc-no-scrollbars');
            }
        };
        ClippedScroller.prototype.setHeight = function (height) {
            this.enhancedScroll.setHeight(height);
        };
        /*
        Accounts for 'clipped' scrollbars
        */
        ClippedScroller.prototype.getScrollbarWidths = function () {
            var widths = this.enhancedScroll.getScrollbarWidths();
            if (this.isVScrollbarsClipped) {
                widths.left = 0;
                widths.right = 0;
            }
            if (this.isHScrollbarsClipped) {
                widths.bottom = 0;
            }
            return widths;
        };
        return ClippedScroller;
    }());

    var ScrollJoiner = /** @class */ (function () {
        function ScrollJoiner(axis, scrollers) {
            this.axis = axis;
            this.scrollers = scrollers;
            for (var _i = 0, _a = this.scrollers; _i < _a.length; _i++) {
                var scroller = _a[_i];
                this.initScroller(scroller);
            }
        }
        ScrollJoiner.prototype.initScroller = function (scroller) {
            var _this = this;
            var enhancedScroll = scroller.enhancedScroll;
            // when the user scrolls via mousewheel, we know for sure the target
            // scroller should be the master. capture the various x-browser events that fire.
            var onScroll = function () {
                _this.assignMasterScroller(scroller);
            };
            'wheel mousewheel DomMouseScroll MozMousePixelScroll'.split(' ').forEach(function (evName) {
                enhancedScroll.el.addEventListener(evName, onScroll);
            });
            enhancedScroll
                .on('scrollStart', function () {
                if (!_this.masterScroller) {
                    _this.assignMasterScroller(scroller);
                }
            })
                .on('scroll', function () {
                if (scroller === _this.masterScroller) {
                    for (var _i = 0, _a = _this.scrollers; _i < _a.length; _i++) {
                        var otherScroller = _a[_i];
                        if (otherScroller !== scroller) {
                            switch (_this.axis) {
                                case 'horizontal':
                                    otherScroller.enhancedScroll.el.scrollLeft = enhancedScroll.el.scrollLeft;
                                    break;
                                case 'vertical':
                                    otherScroller.enhancedScroll.setScrollTop(enhancedScroll.getScrollTop());
                                    break;
                            }
                        }
                    }
                }
            })
                .on('scrollEnd', function () {
                if (scroller === _this.masterScroller) {
                    _this.unassignMasterScroller();
                }
            });
        };
        ScrollJoiner.prototype.assignMasterScroller = function (scroller) {
            this.unassignMasterScroller();
            this.masterScroller = scroller;
            for (var _i = 0, _a = this.scrollers; _i < _a.length; _i++) {
                var otherScroller = _a[_i];
                if (otherScroller !== scroller) {
                    otherScroller.enhancedScroll.disableTouchScroll();
                }
            }
        };
        ScrollJoiner.prototype.unassignMasterScroller = function () {
            if (this.masterScroller) {
                for (var _i = 0, _a = this.scrollers; _i < _a.length; _i++) {
                    var otherScroller = _a[_i];
                    otherScroller.enhancedScroll.enableTouchScroll();
                }
                this.masterScroller = null;
            }
        };
        ScrollJoiner.prototype.update = function () {
            var allWidths = this.scrollers.map(function (scroller) { return scroller.getScrollbarWidths(); });
            var maxLeft = 0;
            var maxRight = 0;
            var maxTop = 0;
            var maxBottom = 0;
            var widths;
            var i;
            for (var _i = 0, allWidths_1 = allWidths; _i < allWidths_1.length; _i++) {
                widths = allWidths_1[_i];
                maxLeft = Math.max(maxLeft, widths.left);
                maxRight = Math.max(maxRight, widths.right);
                maxTop = Math.max(maxTop, widths.top);
                maxBottom = Math.max(maxBottom, widths.bottom);
            }
            for (i = 0; i < this.scrollers.length; i++) {
                var scroller = this.scrollers[i];
                widths = allWidths[i];
                scroller.enhancedScroll.canvas.setGutters(this.axis === 'horizontal' ?
                    {
                        left: maxLeft - widths.left,
                        right: maxRight - widths.right
                    } :
                    {
                        top: maxTop - widths.top,
                        bottom: maxBottom - widths.bottom
                    });
            }
        };
        return ScrollJoiner;
    }());

    var HeaderBodyLayout = /** @class */ (function () {
        /*
        verticalScroll = 'auto' | 'clipped-scroll'
        */
        function HeaderBodyLayout(headerContainerEl, bodyContainerEl, verticalScroll) {
            this.headerScroller = new ClippedScroller('clipped-scroll', 'hidden', headerContainerEl);
            this.bodyScroller = new ClippedScroller('auto', verticalScroll, bodyContainerEl);
            this.scrollJoiner = new ScrollJoiner('horizontal', [
                this.headerScroller,
                this.bodyScroller
            ]);
        }
        HeaderBodyLayout.prototype.destroy = function () {
            this.headerScroller.destroy();
            this.bodyScroller.destroy();
        };
        HeaderBodyLayout.prototype.setHeight = function (totalHeight, isAuto) {
            var bodyHeight;
            if (isAuto) {
                bodyHeight = 'auto';
            }
            else {
                bodyHeight = totalHeight - this.queryHeadHeight();
            }
            this.bodyScroller.setHeight(bodyHeight);
            this.headerScroller.updateSize(); // adjusts gutters and classNames
            this.bodyScroller.updateSize(); // adjusts gutters and classNames
            this.scrollJoiner.update();
        };
        HeaderBodyLayout.prototype.queryHeadHeight = function () {
            return this.headerScroller.enhancedScroll.canvas.contentEl.offsetHeight; // flawed?
        };
        return HeaderBodyLayout;
    }());

    var TimelineHeader = /** @class */ (function (_super) {
        __extends(TimelineHeader, _super);
        function TimelineHeader(context, parentEl) {
            var _this = _super.call(this, context) || this;
            parentEl.appendChild(_this.tableEl = core.createElement('table', {
                className: _this.theme.getClass('tableGrid')
            }));
            return _this;
        }
        TimelineHeader.prototype.destroy = function () {
            core.removeElement(this.tableEl);
            _super.prototype.destroy.call(this);
        };
        TimelineHeader.prototype.render = function (props) {
            this.renderDates(props.tDateProfile);
        };
        TimelineHeader.prototype.renderDates = function (tDateProfile) {
            var _a = this, dateEnv = _a.dateEnv, theme = _a.theme;
            var cellRows = tDateProfile.cellRows;
            var lastRow = cellRows[cellRows.length - 1];
            var isChrono = core.asRoughMs(tDateProfile.labelInterval) > core.asRoughMs(tDateProfile.slotDuration);
            var oneDay = core.isSingleDay(tDateProfile.slotDuration);
            var html = '<colgroup>';
            // needs to be a col for each body slat. header cells will have colspans
            for (var i = tDateProfile.slotCnt - 1; i >= 0; i--) {
                html += '<col/>';
            }
            html += '</colgroup>';
            html += '<tbody>';
            for (var _i = 0, cellRows_1 = cellRows; _i < cellRows_1.length; _i++) {
                var rowCells = cellRows_1[_i];
                var isLast = rowCells === lastRow;
                html += '<tr' + (isChrono && isLast ? ' class="fc-chrono"' : '') + '>';
                for (var _b = 0, rowCells_1 = rowCells; _b < rowCells_1.length; _b++) {
                    var cell = rowCells_1[_b];
                    var headerCellClassNames = [theme.getClass('widgetHeader')];
                    if (cell.isWeekStart) {
                        headerCellClassNames.push('fc-em-cell');
                    }
                    if (oneDay) {
                        headerCellClassNames = headerCellClassNames.concat(core.getDayClasses(cell.date, this.props.dateProfile, this.context, true) // adds "today" class and other day-based classes
                        );
                    }
                    html +=
                        '<th class="' + headerCellClassNames.join(' ') + '"' +
                            ' data-date="' + dateEnv.formatIso(cell.date, { omitTime: !tDateProfile.isTimeScale, omitTimeZoneOffset: true }) + '"' +
                            (cell.colspan > 1 ? ' colspan="' + cell.colspan + '"' : '') +
                            '>' +
                            '<div class="fc-cell-content">' +
                            cell.spanHtml +
                            '</div>' +
                            '</th>';
                }
                html += '</tr>';
            }
            html += '</tbody>';
            this.tableEl.innerHTML = html; // TODO: does this work cross-browser?
            this.slatColEls = core.findElements(this.tableEl, 'col');
            this.innerEls = core.findElements(this.tableEl.querySelector('tr:last-child'), // compound selector won't work because of query-root problem
            'th .fc-cell-text');
            core.findElements(this.tableEl.querySelectorAll('tr:not(:last-child)'), // compound selector won't work because of query-root problem
            'th .fc-cell-text').forEach(function (innerEl) {
                innerEl.classList.add('fc-sticky');
            });
        };
        return TimelineHeader;
    }(core.Component));

    var TimelineSlats = /** @class */ (function (_super) {
        __extends(TimelineSlats, _super);
        function TimelineSlats(context, parentEl) {
            var _this = _super.call(this, context) || this;
            parentEl.appendChild(_this.el = core.createElement('div', { className: 'fc-slats' }));
            return _this;
        }
        TimelineSlats.prototype.destroy = function () {
            core.removeElement(this.el);
            _super.prototype.destroy.call(this);
        };
        TimelineSlats.prototype.render = function (props) {
            this.renderDates(props.tDateProfile);
        };
        TimelineSlats.prototype.renderDates = function (tDateProfile) {
            var _a = this, theme = _a.theme, view = _a.view, dateEnv = _a.dateEnv;
            var slotDates = tDateProfile.slotDates, isWeekStarts = tDateProfile.isWeekStarts;
            var html = '<table class="' + theme.getClass('tableGrid') + '">' +
                '<colgroup>';
            for (var i = 0; i < slotDates.length; i++) {
                html += '<col/>';
            }
            html += '</colgroup>';
            html += '<tbody><tr>';
            for (var i = 0; i < slotDates.length; i++) {
                html += this.slatCellHtml(slotDates[i], isWeekStarts[i], tDateProfile);
            }
            html += '</tr></tbody></table>';
            this.el.innerHTML = html;
            this.slatColEls = core.findElements(this.el, 'col');
            this.slatEls = core.findElements(this.el, 'td');
            for (var i = 0; i < slotDates.length; i++) {
                view.publiclyTrigger('dayRender', [
                    {
                        date: dateEnv.toDate(slotDates[i]),
                        el: this.slatEls[i],
                        view: view
                    }
                ]);
            }
            this.outerCoordCache = new core.PositionCache(this.el, this.slatEls, true, // isHorizontal
            false // isVertical
            );
            // for the inner divs within the slats
            // used for event rendering and scrollTime, to disregard slat border
            this.innerCoordCache = new core.PositionCache(this.el, core.findChildren(this.slatEls, 'div'), true, // isHorizontal
            false // isVertical
            );
        };
        TimelineSlats.prototype.slatCellHtml = function (date, isEm, tDateProfile) {
            var _a = this, theme = _a.theme, dateEnv = _a.dateEnv;
            var classes;
            if (tDateProfile.isTimeScale) {
                classes = [];
                classes.push(core.isInt(dateEnv.countDurationsBetween(tDateProfile.normalizedRange.start, date, tDateProfile.labelInterval)) ?
                    'fc-major' :
                    'fc-minor');
            }
            else {
                classes = core.getDayClasses(date, this.props.dateProfile, this.context);
                classes.push('fc-day');
            }
            classes.unshift(theme.getClass('widgetContent'));
            if (isEm) {
                classes.push('fc-em-cell');
            }
            return '<td class="' + classes.join(' ') + '"' +
                ' data-date="' + dateEnv.formatIso(date, { omitTime: !tDateProfile.isTimeScale, omitTimeZoneOffset: true }) + '"' +
                '><div></div></td>';
        };
        TimelineSlats.prototype.updateSize = function () {
            this.outerCoordCache.build();
            this.innerCoordCache.build();
        };
        TimelineSlats.prototype.positionToHit = function (leftPosition) {
            var outerCoordCache = this.outerCoordCache;
            var tDateProfile = this.props.tDateProfile;
            var slatIndex = outerCoordCache.leftToIndex(leftPosition);
            if (slatIndex != null) {
                // somewhat similar to what TimeGrid does. consolidate?
                var slatWidth = outerCoordCache.getWidth(slatIndex);
                var partial = this.isRtl ?
                    (outerCoordCache.rights[slatIndex] - leftPosition) / slatWidth :
                    (leftPosition - outerCoordCache.lefts[slatIndex]) / slatWidth;
                var localSnapIndex = Math.floor(partial * tDateProfile.snapsPerSlot);
                var start = this.dateEnv.add(tDateProfile.slotDates[slatIndex], core.multiplyDuration(tDateProfile.snapDuration, localSnapIndex));
                var end = this.dateEnv.add(start, tDateProfile.snapDuration);
                return {
                    dateSpan: {
                        range: { start: start, end: end },
                        allDay: !this.props.tDateProfile.isTimeScale
                    },
                    dayEl: this.slatColEls[slatIndex],
                    left: outerCoordCache.lefts[slatIndex],
                    right: outerCoordCache.rights[slatIndex]
                };
            }
            return null;
        };
        return TimelineSlats;
    }(core.Component));

    var MIN_AUTO_LABELS = 18; // more than `12` months but less that `24` hours
    var MAX_AUTO_SLOTS_PER_LABEL = 6; // allows 6 10-min slots in an hour
    var MAX_AUTO_CELLS = 200; // allows 4-days to have a :30 slot duration
    core.config.MAX_TIMELINE_SLOTS = 1000;
    // potential nice values for slot-duration and interval-duration
    var STOCK_SUB_DURATIONS = [
        { years: 1 },
        { months: 1 },
        { days: 1 },
        { hours: 1 },
        { minutes: 30 },
        { minutes: 15 },
        { minutes: 10 },
        { minutes: 5 },
        { minutes: 1 },
        { seconds: 30 },
        { seconds: 15 },
        { seconds: 10 },
        { seconds: 5 },
        { seconds: 1 },
        { milliseconds: 500 },
        { milliseconds: 100 },
        { milliseconds: 10 },
        { milliseconds: 1 }
    ];
    function buildTimelineDateProfile(dateProfile, view) {
        var dateEnv = view.dateEnv;
        var tDateProfile = {
            labelInterval: queryDurationOption(view, 'slotLabelInterval'),
            slotDuration: queryDurationOption(view, 'slotDuration')
        };
        validateLabelAndSlot(tDateProfile, dateProfile, dateEnv); // validate after computed grid duration
        ensureLabelInterval(tDateProfile, dateProfile, dateEnv);
        ensureSlotDuration(tDateProfile, dateProfile, dateEnv);
        var input = view.opt('slotLabelFormat');
        var rawFormats = Array.isArray(input) ?
            input
            : (input != null) ?
                [input]
                :
                    computeHeaderFormats(tDateProfile, dateProfile, dateEnv, view);
        tDateProfile.headerFormats = rawFormats.map(function (rawFormat) {
            return core.createFormatter(rawFormat);
        });
        tDateProfile.isTimeScale = Boolean(tDateProfile.slotDuration.milliseconds);
        var largeUnit = null;
        if (!tDateProfile.isTimeScale) {
            var slotUnit = core.greatestDurationDenominator(tDateProfile.slotDuration).unit;
            if (/year|month|week/.test(slotUnit)) {
                largeUnit = slotUnit;
            }
        }
        tDateProfile.largeUnit = largeUnit;
        tDateProfile.emphasizeWeeks =
            core.isSingleDay(tDateProfile.slotDuration) &&
                currentRangeAs('weeks', dateProfile, dateEnv) >= 2 &&
                !view.opt('businessHours');
        /*
        console.log('label interval =', timelineView.labelInterval.humanize())
        console.log('slot duration =', timelineView.slotDuration.humanize())
        console.log('header formats =', timelineView.headerFormats)
        console.log('isTimeScale', timelineView.isTimeScale)
        console.log('largeUnit', timelineView.largeUnit)
        */
        var rawSnapDuration = view.opt('snapDuration');
        var snapDuration;
        var snapsPerSlot;
        if (rawSnapDuration) {
            snapDuration = core.createDuration(rawSnapDuration);
            snapsPerSlot = core.wholeDivideDurations(tDateProfile.slotDuration, snapDuration);
            // ^ TODO: warning if not whole?
        }
        if (snapsPerSlot == null) {
            snapDuration = tDateProfile.slotDuration;
            snapsPerSlot = 1;
        }
        tDateProfile.snapDuration = snapDuration;
        tDateProfile.snapsPerSlot = snapsPerSlot;
        // more...
        var timeWindowMs = core.asRoughMs(dateProfile.maxTime) - core.asRoughMs(dateProfile.minTime);
        // TODO: why not use normalizeRange!?
        var normalizedStart = normalizeDate(dateProfile.renderRange.start, tDateProfile, dateEnv);
        var normalizedEnd = normalizeDate(dateProfile.renderRange.end, tDateProfile, dateEnv);
        // apply minTime/maxTime
        // TODO: View should be responsible.
        if (tDateProfile.isTimeScale) {
            normalizedStart = dateEnv.add(normalizedStart, dateProfile.minTime);
            normalizedEnd = dateEnv.add(core.addDays(normalizedEnd, -1), dateProfile.maxTime);
        }
        tDateProfile.timeWindowMs = timeWindowMs;
        tDateProfile.normalizedRange = { start: normalizedStart, end: normalizedEnd };
        var slotDates = [];
        var date = normalizedStart;
        while (date < normalizedEnd) {
            if (isValidDate(date, tDateProfile, dateProfile, view)) {
                slotDates.push(date);
            }
            date = dateEnv.add(date, tDateProfile.slotDuration);
        }
        tDateProfile.slotDates = slotDates;
        // more...
        var snapIndex = -1;
        var snapDiff = 0; // index of the diff :(
        var snapDiffToIndex = [];
        var snapIndexToDiff = [];
        date = normalizedStart;
        while (date < normalizedEnd) {
            if (isValidDate(date, tDateProfile, dateProfile, view)) {
                snapIndex++;
                snapDiffToIndex.push(snapIndex);
                snapIndexToDiff.push(snapDiff);
            }
            else {
                snapDiffToIndex.push(snapIndex + 0.5);
            }
            date = dateEnv.add(date, tDateProfile.snapDuration);
            snapDiff++;
        }
        tDateProfile.snapDiffToIndex = snapDiffToIndex;
        tDateProfile.snapIndexToDiff = snapIndexToDiff;
        tDateProfile.snapCnt = snapIndex + 1; // is always one behind
        tDateProfile.slotCnt = tDateProfile.snapCnt / tDateProfile.snapsPerSlot;
        // more...
        tDateProfile.isWeekStarts = buildIsWeekStarts(tDateProfile, dateEnv);
        tDateProfile.cellRows = buildCellRows(tDateProfile, dateEnv, view);
        return tDateProfile;
    }
    /*
    snaps to appropriate unit
    */
    function normalizeDate(date, tDateProfile, dateEnv) {
        var normalDate = date;
        if (!tDateProfile.isTimeScale) {
            normalDate = core.startOfDay(normalDate);
            if (tDateProfile.largeUnit) {
                normalDate = dateEnv.startOf(normalDate, tDateProfile.largeUnit);
            }
        }
        return normalDate;
    }
    /*
    snaps to appropriate unit
    */
    function normalizeRange(range, tDateProfile, dateEnv) {
        if (!tDateProfile.isTimeScale) {
            range = core.computeVisibleDayRange(range);
            if (tDateProfile.largeUnit) {
                var dayRange = range; // preserve original result
                range = {
                    start: dateEnv.startOf(range.start, tDateProfile.largeUnit),
                    end: dateEnv.startOf(range.end, tDateProfile.largeUnit)
                };
                // if date is partially through the interval, or is in the same interval as the start,
                // make the exclusive end be the *next* interval
                if (range.end.valueOf() !== dayRange.end.valueOf() || range.end <= range.start) {
                    range = {
                        start: range.start,
                        end: dateEnv.add(range.end, tDateProfile.slotDuration)
                    };
                }
            }
        }
        return range;
    }
    function isValidDate(date, tDateProfile, dateProfile, view) {
        if (view.dateProfileGenerator.isHiddenDay(date)) {
            return false;
        }
        else if (tDateProfile.isTimeScale) {
            // determine if the time is within minTime/maxTime, which may have wacky values
            var day = core.startOfDay(date);
            var timeMs = date.valueOf() - day.valueOf();
            var ms = timeMs - core.asRoughMs(dateProfile.minTime); // milliseconds since minTime
            ms = ((ms % 86400000) + 86400000) % 86400000; // make negative values wrap to 24hr clock
            return ms < tDateProfile.timeWindowMs; // before the maxTime?
        }
        else {
            return true;
        }
    }
    function queryDurationOption(view, name) {
        var input = view.opt(name);
        if (input != null) {
            return core.createDuration(input);
        }
    }
    function validateLabelAndSlot(tDateProfile, dateProfile, dateEnv) {
        var currentRange = dateProfile.currentRange;
        // make sure labelInterval doesn't exceed the max number of cells
        if (tDateProfile.labelInterval) {
            var labelCnt = dateEnv.countDurationsBetween(currentRange.start, currentRange.end, tDateProfile.labelInterval);
            if (labelCnt > core.config.MAX_TIMELINE_SLOTS) {
                console.warn('slotLabelInterval results in too many cells');
                tDateProfile.labelInterval = null;
            }
        }
        // make sure slotDuration doesn't exceed the maximum number of cells
        if (tDateProfile.slotDuration) {
            var slotCnt = dateEnv.countDurationsBetween(currentRange.start, currentRange.end, tDateProfile.slotDuration);
            if (slotCnt > core.config.MAX_TIMELINE_SLOTS) {
                console.warn('slotDuration results in too many cells');
                tDateProfile.slotDuration = null;
            }
        }
        // make sure labelInterval is a multiple of slotDuration
        if (tDateProfile.labelInterval && tDateProfile.slotDuration) {
            var slotsPerLabel = core.wholeDivideDurations(tDateProfile.labelInterval, tDateProfile.slotDuration);
            if (slotsPerLabel === null || slotsPerLabel < 1) {
                console.warn('slotLabelInterval must be a multiple of slotDuration');
                tDateProfile.slotDuration = null;
            }
        }
    }
    function ensureLabelInterval(tDateProfile, dateProfile, dateEnv) {
        var currentRange = dateProfile.currentRange;
        var labelInterval = tDateProfile.labelInterval;
        if (!labelInterval) {
            // compute based off the slot duration
            // find the largest label interval with an acceptable slots-per-label
            var input = void 0;
            if (tDateProfile.slotDuration) {
                for (var _i = 0, STOCK_SUB_DURATIONS_1 = STOCK_SUB_DURATIONS; _i < STOCK_SUB_DURATIONS_1.length; _i++) {
                    input = STOCK_SUB_DURATIONS_1[_i];
                    var tryLabelInterval = core.createDuration(input);
                    var slotsPerLabel = core.wholeDivideDurations(tryLabelInterval, tDateProfile.slotDuration);
                    if (slotsPerLabel !== null && slotsPerLabel <= MAX_AUTO_SLOTS_PER_LABEL) {
                        labelInterval = tryLabelInterval;
                        break;
                    }
                }
                // use the slot duration as a last resort
                if (!labelInterval) {
                    labelInterval = tDateProfile.slotDuration;
                }
                // compute based off the view's duration
                // find the largest label interval that yields the minimum number of labels
            }
            else {
                for (var _a = 0, STOCK_SUB_DURATIONS_2 = STOCK_SUB_DURATIONS; _a < STOCK_SUB_DURATIONS_2.length; _a++) {
                    input = STOCK_SUB_DURATIONS_2[_a];
                    labelInterval = core.createDuration(input);
                    var labelCnt = dateEnv.countDurationsBetween(currentRange.start, currentRange.end, labelInterval);
                    if (labelCnt >= MIN_AUTO_LABELS) {
                        break;
                    }
                }
            }
            tDateProfile.labelInterval = labelInterval;
        }
        return labelInterval;
    }
    function ensureSlotDuration(tDateProfile, dateProfile, dateEnv) {
        var currentRange = dateProfile.currentRange;
        var slotDuration = tDateProfile.slotDuration;
        if (!slotDuration) {
            var labelInterval = ensureLabelInterval(tDateProfile, dateProfile, dateEnv); // will compute if necessary
            // compute based off the label interval
            // find the largest slot duration that is different from labelInterval, but still acceptable
            for (var _i = 0, STOCK_SUB_DURATIONS_3 = STOCK_SUB_DURATIONS; _i < STOCK_SUB_DURATIONS_3.length; _i++) {
                var input = STOCK_SUB_DURATIONS_3[_i];
                var trySlotDuration = core.createDuration(input);
                var slotsPerLabel = core.wholeDivideDurations(labelInterval, trySlotDuration);
                if (slotsPerLabel !== null && slotsPerLabel > 1 && slotsPerLabel <= MAX_AUTO_SLOTS_PER_LABEL) {
                    slotDuration = trySlotDuration;
                    break;
                }
            }
            // only allow the value if it won't exceed the view's # of slots limit
            if (slotDuration) {
                var slotCnt = dateEnv.countDurationsBetween(currentRange.start, currentRange.end, slotDuration);
                if (slotCnt > MAX_AUTO_CELLS) {
                    slotDuration = null;
                }
            }
            // use the label interval as a last resort
            if (!slotDuration) {
                slotDuration = labelInterval;
            }
            tDateProfile.slotDuration = slotDuration;
        }
        return slotDuration;
    }
    function computeHeaderFormats(tDateProfile, dateProfile, dateEnv, view) {
        var format1;
        var format2;
        var labelInterval = tDateProfile.labelInterval;
        var unit = core.greatestDurationDenominator(labelInterval).unit;
        var weekNumbersVisible = view.opt('weekNumbers');
        var format0 = (format1 = (format2 = null));
        // NOTE: weekNumber computation function wont work
        if ((unit === 'week') && !weekNumbersVisible) {
            unit = 'day';
        }
        switch (unit) {
            case 'year':
                format0 = { year: 'numeric' }; // '2015'
                break;
            case 'month':
                if (currentRangeAs('years', dateProfile, dateEnv) > 1) {
                    format0 = { year: 'numeric' }; // '2015'
                }
                format1 = { month: 'short' }; // 'Jan'
                break;
            case 'week':
                if (currentRangeAs('years', dateProfile, dateEnv) > 1) {
                    format0 = { year: 'numeric' }; // '2015'
                }
                format1 = { week: 'narrow' }; // 'Wk4'
                break;
            case 'day':
                if (currentRangeAs('years', dateProfile, dateEnv) > 1) {
                    format0 = { year: 'numeric', month: 'long' }; // 'January 2014'
                }
                else if (currentRangeAs('months', dateProfile, dateEnv) > 1) {
                    format0 = { month: 'long' }; // 'January'
                }
                if (weekNumbersVisible) {
                    format1 = { week: 'short' }; // 'Wk 4'
                }
                format2 = { weekday: 'narrow', day: 'numeric' }; // 'Su 9'
                break;
            case 'hour':
                if (weekNumbersVisible) {
                    format0 = { week: 'short' }; // 'Wk 4'
                }
                if (currentRangeAs('days', dateProfile, dateEnv) > 1) {
                    format1 = { weekday: 'short', day: 'numeric', month: 'numeric', omitCommas: true }; // Sat 4/7
                }
                format2 = {
                    hour: 'numeric',
                    minute: '2-digit',
                    omitZeroMinute: true,
                    meridiem: 'short'
                };
                break;
            case 'minute':
                // sufficiently large number of different minute cells?
                if ((core.asRoughMinutes(labelInterval) / 60) >= MAX_AUTO_SLOTS_PER_LABEL) {
                    format0 = {
                        hour: 'numeric',
                        meridiem: 'short'
                    };
                    format1 = function (params) {
                        return ':' + core.padStart(params.date.minute, 2); // ':30'
                    };
                }
                else {
                    format0 = {
                        hour: 'numeric',
                        minute: 'numeric',
                        meridiem: 'short'
                    };
                }
                break;
            case 'second':
                // sufficiently large number of different second cells?
                if ((core.asRoughSeconds(labelInterval) / 60) >= MAX_AUTO_SLOTS_PER_LABEL) {
                    format0 = { hour: 'numeric', minute: '2-digit', meridiem: 'lowercase' }; // '8:30 PM'
                    format1 = function (params) {
                        return ':' + core.padStart(params.date.second, 2); // ':30'
                    };
                }
                else {
                    format0 = { hour: 'numeric', minute: '2-digit', second: '2-digit', meridiem: 'lowercase' }; // '8:30:45 PM'
                }
                break;
            case 'millisecond':
                format0 = { hour: 'numeric', minute: '2-digit', second: '2-digit', meridiem: 'lowercase' }; // '8:30:45 PM'
                format1 = function (params) {
                    return '.' + core.padStart(params.millisecond, 3);
                };
                break;
        }
        return [].concat(format0 || [], format1 || [], format2 || []);
    }
    // Compute the number of the give units in the "current" range.
    // Won't go more precise than days.
    // Will return `0` if there's not a clean whole interval.
    function currentRangeAs(unit, dateProfile, dateEnv) {
        var range = dateProfile.currentRange;
        var res = null;
        if (unit === 'years') {
            res = dateEnv.diffWholeYears(range.start, range.end);
        }
        else if (unit === 'months') {
            res = dateEnv.diffWholeMonths(range.start, range.end);
        }
        else if (unit === 'weeks') {
            res = dateEnv.diffWholeMonths(range.start, range.end);
        }
        else if (unit === 'days') {
            res = core.diffWholeDays(range.start, range.end);
        }
        return res || 0;
    }
    function buildIsWeekStarts(tDateProfile, dateEnv) {
        var slotDates = tDateProfile.slotDates, emphasizeWeeks = tDateProfile.emphasizeWeeks;
        var prevWeekNumber = null;
        var isWeekStarts = [];
        for (var _i = 0, slotDates_1 = slotDates; _i < slotDates_1.length; _i++) {
            var slotDate = slotDates_1[_i];
            var weekNumber = dateEnv.computeWeekNumber(slotDate);
            var isWeekStart = emphasizeWeeks && (prevWeekNumber !== null) && (prevWeekNumber !== weekNumber);
            prevWeekNumber = weekNumber;
            isWeekStarts.push(isWeekStart);
        }
        return isWeekStarts;
    }
    function buildCellRows(tDateProfile, dateEnv, view) {
        var slotDates = tDateProfile.slotDates;
        var formats = tDateProfile.headerFormats;
        var cellRows = formats.map(function (format) { return []; }); // indexed by row,col
        // specifically for navclicks
        var rowUnits = formats.map(function (format) {
            return format.getLargestUnit ? format.getLargestUnit() : null;
        });
        // builds cellRows and slotCells
        for (var i = 0; i < slotDates.length; i++) {
            var date = slotDates[i];
            var isWeekStart = tDateProfile.isWeekStarts[i];
            for (var row = 0; row < formats.length; row++) {
                var format = formats[row];
                var rowCells = cellRows[row];
                var leadingCell = rowCells[rowCells.length - 1];
                var isSuperRow = (formats.length > 1) && (row < (formats.length - 1)); // more than one row and not the last
                var newCell = null;
                if (isSuperRow) {
                    var text = dateEnv.format(date, format);
                    if (!leadingCell || (leadingCell.text !== text)) {
                        newCell = buildCellObject(date, text, rowUnits[row], view);
                    }
                    else {
                        leadingCell.colspan += 1;
                    }
                }
                else {
                    if (!leadingCell ||
                        core.isInt(dateEnv.countDurationsBetween(tDateProfile.normalizedRange.start, date, tDateProfile.labelInterval))) {
                        var text = dateEnv.format(date, format);
                        newCell = buildCellObject(date, text, rowUnits[row], view);
                    }
                    else {
                        leadingCell.colspan += 1;
                    }
                }
                if (newCell) {
                    newCell.weekStart = isWeekStart;
                    rowCells.push(newCell);
                }
            }
        }
        return cellRows;
    }
    function buildCellObject(date, text, rowUnit, view) {
        var spanHtml = core.buildGotoAnchorHtml(view, {
            date: date,
            type: rowUnit,
            forceOff: !rowUnit
        }, {
            'class': 'fc-cell-text'
        }, core.htmlEscape(text));
        return { text: text, spanHtml: spanHtml, date: date, colspan: 1, isWeekStart: false };
    }

    var TimelineNowIndicator = /** @class */ (function () {
        function TimelineNowIndicator(headParent, bodyParent) {
            this.headParent = headParent;
            this.bodyParent = bodyParent;
        }
        TimelineNowIndicator.prototype.render = function (coord, isRtl) {
            var styleProps = isRtl ? { right: -coord } : { left: coord };
            this.headParent.appendChild(this.arrowEl = core.createElement('div', {
                className: 'fc-now-indicator fc-now-indicator-arrow',
                style: styleProps
            }));
            this.bodyParent.appendChild(this.lineEl = core.createElement('div', {
                className: 'fc-now-indicator fc-now-indicator-line',
                style: styleProps
            }));
        };
        TimelineNowIndicator.prototype.unrender = function () {
            if (this.arrowEl) {
                core.removeElement(this.arrowEl);
            }
            if (this.lineEl) {
                core.removeElement(this.lineEl);
            }
        };
        return TimelineNowIndicator;
    }());

    var STICKY_PROP_VAL = computeStickyPropVal(); // if null, means not supported at all
    var IS_MS_EDGE = /Edge/.test(navigator.userAgent);
    var IS_SAFARI = STICKY_PROP_VAL === '-webkit-sticky'; // good b/c doesn't confuse chrome
    var STICKY_CLASSNAME = 'fc-sticky';
    /*
    useful beyond the native position:sticky for these reasons:
    - support in IE11
    - nice centering support
    */
    var StickyScroller = /** @class */ (function () {
        function StickyScroller(scroller, isRtl, isVertical) {
            var _this = this;
            this.usingRelative = null;
            /*
            known bug: called twice on init. problem when mixing with ScrollJoiner
            */
            this.updateSize = function () {
                var els = Array.prototype.slice.call(_this.scroller.canvas.el.querySelectorAll('.' + STICKY_CLASSNAME));
                var elGeoms = _this.queryElGeoms(els);
                var viewportWidth = _this.scroller.el.clientWidth;
                if (_this.usingRelative) {
                    var elDestinations = _this.computeElDestinations(elGeoms, viewportWidth); // read before prepPositioning
                    assignRelativePositions(els, elGeoms, elDestinations);
                }
                else {
                    assignStickyPositions(els, elGeoms, viewportWidth);
                }
            };
            this.scroller = scroller;
            this.usingRelative =
                !STICKY_PROP_VAL || // IE11
                    (IS_MS_EDGE && isRtl) || // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/18883305/
                    ((IS_MS_EDGE || IS_SAFARI) && isVertical); // because doesn't work with rowspan in tables, our only vertial use
            if (this.usingRelative) {
                scroller.on('scrollEnd', this.updateSize);
            }
        }
        StickyScroller.prototype.destroy = function () {
            this.scroller.off('scrollEnd', this.updateSize);
        };
        StickyScroller.prototype.queryElGeoms = function (els) {
            var canvasOrigin = this.scroller.canvas.el.getBoundingClientRect();
            var elGeoms = [];
            for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
                var el = els_1[_i];
                var parentBound = core.translateRect(el.parentNode.getBoundingClientRect(), -canvasOrigin.left, -canvasOrigin.top);
                var elRect = el.getBoundingClientRect();
                var computedStyles = window.getComputedStyle(el);
                var computedTextAlign = window.getComputedStyle(el.parentNode).textAlign; // ask the parent
                var intendedTextAlign = computedTextAlign;
                var naturalBound = null;
                if (computedStyles.position !== 'sticky') {
                    naturalBound = core.translateRect(elRect, -canvasOrigin.left - (parseFloat(computedStyles.left) || 0), // could be 'auto'
                    -canvasOrigin.top - (parseFloat(computedStyles.top) || 0));
                }
                if (el.hasAttribute('data-sticky-center')) {
                    intendedTextAlign = 'center';
                }
                elGeoms.push({
                    parentBound: parentBound,
                    naturalBound: naturalBound,
                    elWidth: elRect.width,
                    elHeight: elRect.height,
                    computedTextAlign: computedTextAlign,
                    intendedTextAlign: intendedTextAlign
                });
            }
            return elGeoms;
        };
        StickyScroller.prototype.computeElDestinations = function (elGeoms, viewportWidth) {
            var viewportLeft = this.scroller.getScrollFromLeft();
            var viewportTop = this.scroller.getScrollTop();
            var viewportRight = viewportLeft + viewportWidth;
            return elGeoms.map(function (elGeom) {
                var elWidth = elGeom.elWidth, elHeight = elGeom.elHeight, parentBound = elGeom.parentBound, naturalBound = elGeom.naturalBound;
                var destLeft; // relative to canvas topleft
                var destTop; // "
                switch (elGeom.intendedTextAlign) {
                    case 'left':
                        destLeft = viewportLeft;
                        break;
                    case 'right':
                        destLeft = viewportRight - elWidth;
                        break;
                    case 'center':
                        destLeft = (viewportLeft + viewportRight) / 2 - elWidth / 2;
                        break;
                }
                destLeft = Math.min(destLeft, parentBound.right - elWidth);
                destLeft = Math.max(destLeft, parentBound.left);
                destTop = viewportTop;
                destTop = Math.min(destTop, parentBound.bottom - elHeight);
                destTop = Math.max(destTop, naturalBound.top); // better to use natural top for upper bound
                return { left: destLeft, top: destTop };
            });
        };
        return StickyScroller;
    }());
    function assignRelativePositions(els, elGeoms, elDestinations) {
        els.forEach(function (el, i) {
            var naturalBound = elGeoms[i].naturalBound;
            core.applyStyle(el, {
                position: 'relative',
                left: elDestinations[i].left - naturalBound.left,
                top: elDestinations[i].top - naturalBound.top
            });
        });
    }
    function assignStickyPositions(els, elGeoms, viewportWidth) {
        els.forEach(function (el, i) {
            var stickyLeft = 0;
            if (elGeoms[i].intendedTextAlign === 'center') {
                stickyLeft = (viewportWidth - elGeoms[i].elWidth) / 2;
                // needs to be forced to left?
                if (elGeoms[i].computedTextAlign === 'center') {
                    el.setAttribute('data-sticky-center', '') // remember for next queryElGeoms
                    ;
                    el.parentNode.style.textAlign = 'left';
                }
            }
            core.applyStyle(el, {
                position: STICKY_PROP_VAL,
                left: stickyLeft,
                right: 0,
                top: 0
            });
        });
    }
    function computeStickyPropVal() {
        var el = core.htmlToElement('<div style="position:-webkit-sticky;position:sticky"></div>');
        var val = el.style.position;
        if (val.indexOf('sticky') !== -1) {
            return val;
        }
        else {
            return null;
        }
    }

    var TimeAxis = /** @class */ (function (_super) {
        __extends(TimeAxis, _super);
        function TimeAxis(context, headerContainerEl, bodyContainerEl) {
            var _this = _super.call(this, context) || this;
            var layout = _this.layout = new HeaderBodyLayout(headerContainerEl, bodyContainerEl, 'auto');
            var headerEnhancedScroller = layout.headerScroller.enhancedScroll;
            var bodyEnhancedScroller = layout.bodyScroller.enhancedScroll;
            // needs to go after layout, which has ScrollJoiner
            _this.headStickyScroller = new StickyScroller(headerEnhancedScroller, _this.isRtl, false); // isVertical=false
            _this.bodyStickyScroller = new StickyScroller(bodyEnhancedScroller, _this.isRtl, false); // isVertical=false
            _this.header = new TimelineHeader(context, headerEnhancedScroller.canvas.contentEl);
            _this.slats = new TimelineSlats(context, bodyEnhancedScroller.canvas.bgEl);
            _this.nowIndicator = new TimelineNowIndicator(headerEnhancedScroller.canvas.el, bodyEnhancedScroller.canvas.el);
            return _this;
        }
        TimeAxis.prototype.destroy = function () {
            this.layout.destroy();
            this.header.destroy();
            this.slats.destroy();
            this.nowIndicator.unrender();
            this.headStickyScroller.destroy();
            this.bodyStickyScroller.destroy();
            _super.prototype.destroy.call(this);
        };
        TimeAxis.prototype.render = function (props) {
            var tDateProfile = this.tDateProfile =
                buildTimelineDateProfile(props.dateProfile, this.view); // TODO: cache
            this.header.receiveProps({
                dateProfile: props.dateProfile,
                tDateProfile: tDateProfile
            });
            this.slats.receiveProps({
                dateProfile: props.dateProfile,
                tDateProfile: tDateProfile
            });
        };
        // Now Indicator
        // ------------------------------------------------------------------------------------------
        TimeAxis.prototype.getNowIndicatorUnit = function (dateProfile) {
            // yuck
            var tDateProfile = this.tDateProfile =
                buildTimelineDateProfile(dateProfile, this.view); // TODO: cache
            if (tDateProfile.isTimeScale) {
                return core.greatestDurationDenominator(tDateProfile.slotDuration).unit;
            }
        };
        // will only execute if isTimeScale
        TimeAxis.prototype.renderNowIndicator = function (date) {
            if (core.rangeContainsMarker(this.tDateProfile.normalizedRange, date)) {
                this.nowIndicator.render(this.dateToCoord(date), this.isRtl);
            }
        };
        // will only execute if isTimeScale
        TimeAxis.prototype.unrenderNowIndicator = function () {
            this.nowIndicator.unrender();
        };
        // Sizing
        // ------------------------------------------------------------------------------------------
        TimeAxis.prototype.updateSize = function (isResize, totalHeight, isAuto) {
            this.applySlotWidth(this.computeSlotWidth());
            // adjusts gutters. do after slot widths set
            this.layout.setHeight(totalHeight, isAuto);
            // pretty much just queries coords. do last
            this.slats.updateSize();
        };
        TimeAxis.prototype.updateStickyScrollers = function () {
            this.headStickyScroller.updateSize();
            this.bodyStickyScroller.updateSize();
        };
        TimeAxis.prototype.computeSlotWidth = function () {
            var slotWidth = this.opt('slotWidth') || '';
            if (slotWidth === '') {
                slotWidth = this.computeDefaultSlotWidth(this.tDateProfile);
            }
            return slotWidth;
        };
        TimeAxis.prototype.computeDefaultSlotWidth = function (tDateProfile) {
            var maxInnerWidth = 0; // TODO: harness core's `matchCellWidths` for this
            this.header.innerEls.forEach(function (innerEl, i) {
                maxInnerWidth = Math.max(maxInnerWidth, innerEl.getBoundingClientRect().width);
            });
            var headingCellWidth = Math.ceil(maxInnerWidth) + 1; // assume no padding, and one pixel border
            // in TimelineView.defaults we ensured that labelInterval is an interval of slotDuration
            // TODO: rename labelDuration?
            var slotsPerLabel = core.wholeDivideDurations(tDateProfile.labelInterval, tDateProfile.slotDuration);
            var slotWidth = Math.ceil(headingCellWidth / slotsPerLabel);
            var minWidth = window.getComputedStyle(this.header.slatColEls[0]).minWidth;
            if (minWidth) {
                minWidth = parseInt(minWidth, 10);
                if (minWidth) {
                    slotWidth = Math.max(slotWidth, minWidth);
                }
            }
            return slotWidth;
        };
        TimeAxis.prototype.applySlotWidth = function (slotWidth) {
            var _a = this, layout = _a.layout, tDateProfile = _a.tDateProfile;
            var containerWidth = '';
            var containerMinWidth = '';
            var nonLastSlotWidth = '';
            if (slotWidth !== '') {
                slotWidth = Math.round(slotWidth);
                containerWidth = slotWidth * tDateProfile.slotDates.length;
                containerMinWidth = '';
                nonLastSlotWidth = slotWidth;
                var availableWidth = layout.bodyScroller.enhancedScroll.getClientWidth();
                if (availableWidth > containerWidth) {
                    containerMinWidth = availableWidth;
                    containerWidth = '';
                    nonLastSlotWidth = Math.floor(availableWidth / tDateProfile.slotDates.length);
                }
            }
            layout.headerScroller.enhancedScroll.canvas.setWidth(containerWidth);
            layout.headerScroller.enhancedScroll.canvas.setMinWidth(containerMinWidth);
            layout.bodyScroller.enhancedScroll.canvas.setWidth(containerWidth);
            layout.bodyScroller.enhancedScroll.canvas.setMinWidth(containerMinWidth);
            if (nonLastSlotWidth !== '') {
                this.header.slatColEls.slice(0, -1).concat(this.slats.slatColEls.slice(0, -1)).forEach(function (el) {
                    el.style.width = nonLastSlotWidth + 'px';
                });
            }
        };
        // returned value is between 0 and the number of snaps
        TimeAxis.prototype.computeDateSnapCoverage = function (date) {
            var _a = this, dateEnv = _a.dateEnv, tDateProfile = _a.tDateProfile;
            var snapDiff = dateEnv.countDurationsBetween(tDateProfile.normalizedRange.start, date, tDateProfile.snapDuration);
            if (snapDiff < 0) {
                return 0;
            }
            else if (snapDiff >= tDateProfile.snapDiffToIndex.length) {
                return tDateProfile.snapCnt;
            }
            else {
                var snapDiffInt = Math.floor(snapDiff);
                var snapCoverage = tDateProfile.snapDiffToIndex[snapDiffInt];
                if (core.isInt(snapCoverage)) { // not an in-between value
                    snapCoverage += snapDiff - snapDiffInt; // add the remainder
                }
                else {
                    // a fractional value, meaning the date is not visible
                    // always round up in this case. works for start AND end dates in a range.
                    snapCoverage = Math.ceil(snapCoverage);
                }
                return snapCoverage;
            }
        };
        // for LTR, results range from 0 to width of area
        // for RTL, results range from negative width of area to 0
        TimeAxis.prototype.dateToCoord = function (date) {
            var tDateProfile = this.tDateProfile;
            var snapCoverage = this.computeDateSnapCoverage(date);
            var slotCoverage = snapCoverage / tDateProfile.snapsPerSlot;
            var slotIndex = Math.floor(slotCoverage);
            slotIndex = Math.min(slotIndex, tDateProfile.slotCnt - 1);
            var partial = slotCoverage - slotIndex;
            var _a = this.slats, innerCoordCache = _a.innerCoordCache, outerCoordCache = _a.outerCoordCache;
            if (this.isRtl) {
                return (outerCoordCache.rights[slotIndex] -
                    (innerCoordCache.getWidth(slotIndex) * partial)) - outerCoordCache.originClientRect.width;
            }
            else {
                return (outerCoordCache.lefts[slotIndex] +
                    (innerCoordCache.getWidth(slotIndex) * partial));
            }
        };
        TimeAxis.prototype.rangeToCoords = function (range) {
            if (this.isRtl) {
                return { right: this.dateToCoord(range.start), left: this.dateToCoord(range.end) };
            }
            else {
                return { left: this.dateToCoord(range.start), right: this.dateToCoord(range.end) };
            }
        };
        // Scrolling
        // ------------------------------------------------------------------------------------------
        TimeAxis.prototype.computeDateScroll = function (timeMs) {
            var dateEnv = this.dateEnv;
            var dateProfile = this.props.dateProfile;
            var left = 0;
            if (dateProfile) {
                left = this.dateToCoord(dateEnv.add(core.startOfDay(dateProfile.activeRange.start), // startOfDay needed?
                core.createDuration(timeMs)));
                // hack to overcome the left borders of non-first slat
                if (!this.isRtl && left) {
                    left += 1;
                }
            }
            return { left: left };
        };
        TimeAxis.prototype.queryDateScroll = function () {
            var enhancedScroll = this.layout.bodyScroller.enhancedScroll;
            return {
                left: enhancedScroll.getScrollLeft()
            };
        };
        TimeAxis.prototype.applyDateScroll = function (scroll) {
            // TODO: lame we have to update both. use the scrolljoiner instead maybe
            this.layout.bodyScroller.enhancedScroll.setScrollLeft(scroll.left || 0);
            this.layout.headerScroller.enhancedScroll.setScrollLeft(scroll.left || 0);
        };
        return TimeAxis;
    }(core.Component));

    // import { computeResourceEditable } from '@fullcalendar/resource-common' ... CAN'T HAVE THIS DEP! COPIED AND PASTED BELOW!
    var TimelineLaneEventRenderer = /** @class */ (function (_super) {
        __extends(TimelineLaneEventRenderer, _super);
        function TimelineLaneEventRenderer(context, masterContainerEl, timeAxis) {
            var _this = _super.call(this, context) || this;
            _this.masterContainerEl = masterContainerEl;
            _this.timeAxis = timeAxis;
            return _this;
        }
        TimelineLaneEventRenderer.prototype.renderSegHtml = function (seg, mirrorInfo) {
            var eventRange = seg.eventRange;
            var eventDef = eventRange.def;
            var eventUi = eventRange.ui;
            var isDraggable = eventUi.startEditable || computeResourceEditable(eventDef, this.timeAxis.calendar);
            var isResizableFromStart = seg.isStart && eventUi.durationEditable && this.context.options.eventResizableFromStart;
            var isResizableFromEnd = seg.isEnd && eventUi.durationEditable;
            var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd, mirrorInfo);
            classes.unshift('fc-timeline-event', 'fc-h-event');
            var timeText = this.getTimeText(eventRange);
            return '<a class="' + classes.join(' ') + '" style="' + core.cssToStr(this.getSkinCss(eventUi)) + '"' +
                (eventDef.url ?
                    ' href="' + core.htmlEscape(eventDef.url) + '"' :
                    '') +
                '>' +
                '<div class="fc-content">' +
                (timeText ?
                    '<span class="fc-time">' +
                        core.htmlEscape(timeText) +
                        '</span>'
                    :
                        '') +
                '<span class="fc-title fc-sticky">' +
                (eventDef.title ? core.htmlEscape(eventDef.title) : '&nbsp;') +
                '</span>' +
                '</div>' +
                (isResizableFromStart ?
                    '<div class="fc-resizer fc-start-resizer"></div>' :
                    '') +
                (isResizableFromEnd ?
                    '<div class="fc-resizer fc-end-resizer"></div>' :
                    '') +
                '</a>';
        };
        TimelineLaneEventRenderer.prototype.computeDisplayEventTime = function () {
            return !this.timeAxis.tDateProfile.isTimeScale; // because times should be obvious via axis
        };
        TimelineLaneEventRenderer.prototype.computeDisplayEventEnd = function () {
            return false;
        };
        // Computes a default event time formatting string if `timeFormat` is not explicitly defined
        TimelineLaneEventRenderer.prototype.computeEventTimeFormat = function () {
            return {
                hour: 'numeric',
                minute: '2-digit',
                omitZeroMinute: true,
                meridiem: 'narrow'
            };
        };
        TimelineLaneEventRenderer.prototype.attachSegs = function (segs, mirrorInfo) {
            if (!this.el && this.masterContainerEl) {
                this.el = core.createElement('div', { className: 'fc-event-container' });
                if (mirrorInfo) {
                    this.el.classList.add('fc-mirror-container');
                }
                this.masterContainerEl.appendChild(this.el);
            }
            if (this.el) {
                for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
                    var seg = segs_1[_i];
                    this.el.appendChild(seg.el);
                }
            }
        };
        TimelineLaneEventRenderer.prototype.detachSegs = function (segs) {
            for (var _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
                var seg = segs_2[_i];
                core.removeElement(seg.el);
            }
        };
        // computes AND assigns (assigns the left/right at least). bad
        TimelineLaneEventRenderer.prototype.computeSegSizes = function (segs) {
            var timeAxis = this.timeAxis;
            for (var _i = 0, segs_3 = segs; _i < segs_3.length; _i++) {
                var seg = segs_3[_i];
                var coords = timeAxis.rangeToCoords(seg); // works because Seg has start/end
                core.applyStyle(seg.el, {
                    left: (seg.left = coords.left),
                    right: -(seg.right = coords.right)
                });
            }
        };
        TimelineLaneEventRenderer.prototype.assignSegSizes = function (segs) {
            if (!this.el) {
                return;
            }
            // compute seg verticals
            for (var _i = 0, segs_4 = segs; _i < segs_4.length; _i++) {
                var seg = segs_4[_i];
                seg.height = core.computeHeightAndMargins(seg.el);
            }
            this.buildSegLevels(segs); // populates above/below props for computeOffsetForSegs
            var totalHeight = computeOffsetForSegs(segs); // also assigns seg.top
            core.applyStyleProp(this.el, 'height', totalHeight);
            // assign seg verticals
            for (var _a = 0, segs_5 = segs; _a < segs_5.length; _a++) {
                var seg = segs_5[_a];
                core.applyStyleProp(seg.el, 'top', seg.top);
            }
        };
        TimelineLaneEventRenderer.prototype.buildSegLevels = function (segs) {
            var segLevels = [];
            segs = this.sortEventSegs(segs);
            for (var _i = 0, segs_6 = segs; _i < segs_6.length; _i++) {
                var unplacedSeg = segs_6[_i];
                unplacedSeg.above = [];
                // determine the first level with no collisions
                var level = 0; // level index
                while (level < segLevels.length) {
                    var isLevelCollision = false;
                    // determine collisions
                    for (var _a = 0, _b = segLevels[level]; _a < _b.length; _a++) {
                        var placedSeg = _b[_a];
                        if (timeRowSegsCollide(unplacedSeg, placedSeg)) {
                            unplacedSeg.above.push(placedSeg);
                            isLevelCollision = true;
                        }
                    }
                    if (isLevelCollision) {
                        level += 1;
                    }
                    else {
                        break;
                    }
                }
                // insert into the first non-colliding level. create if necessary
                (segLevels[level] || (segLevels[level] = []))
                    .push(unplacedSeg);
                // record possible colliding segments below (TODO: automated test for this)
                level += 1;
                while (level < segLevels.length) {
                    for (var _c = 0, _d = segLevels[level]; _c < _d.length; _c++) {
                        var belowSeg = _d[_c];
                        if (timeRowSegsCollide(unplacedSeg, belowSeg)) {
                            belowSeg.above.push(unplacedSeg);
                        }
                    }
                    level += 1;
                }
            }
            return segLevels;
        };
        return TimelineLaneEventRenderer;
    }(core.FgEventRenderer));
    function computeOffsetForSegs(segs) {
        var max = 0;
        for (var _i = 0, segs_7 = segs; _i < segs_7.length; _i++) {
            var seg = segs_7[_i];
            max = Math.max(max, computeOffsetForSeg(seg));
        }
        return max;
    }
    function computeOffsetForSeg(seg) {
        if ((seg.top == null)) {
            seg.top = computeOffsetForSegs(seg.above);
        }
        return seg.top + seg.height;
    }
    function timeRowSegsCollide(seg0, seg1) {
        return (seg0.left < seg1.right) && (seg0.right > seg1.left);
    }
    // HACK
    function computeResourceEditable(eventDef, calendar) {
        var resourceEditable = eventDef.resourceEditable;
        if (resourceEditable == null) {
            var source = eventDef.sourceId && calendar.state.eventSources[eventDef.sourceId];
            if (source) {
                resourceEditable = source.extendedProps.resourceEditable; // used the Source::extendedProps hack
            }
            if (resourceEditable == null) {
                resourceEditable = calendar.opt('eventResourceEditable');
                if (resourceEditable == null) {
                    resourceEditable = true; // TODO: use defaults system instead
                }
            }
        }
        return resourceEditable;
    }

    var TimelineLaneFillRenderer = /** @class */ (function (_super) {
        __extends(TimelineLaneFillRenderer, _super);
        function TimelineLaneFillRenderer(context, masterContainerEl, timeAxis) {
            var _this = _super.call(this, context) || this;
            _this.masterContainerEl = masterContainerEl;
            _this.timeAxis = timeAxis;
            return _this;
        }
        TimelineLaneFillRenderer.prototype.attachSegs = function (type, segs) {
            if (segs.length) {
                var className = void 0;
                if (type === 'businessHours') {
                    className = 'bgevent';
                }
                else {
                    className = type.toLowerCase();
                }
                // making a new container each time is OKAY
                // all types of segs (background or business hours or whatever) are rendered in one pass
                var containerEl = core.createElement('div', { className: 'fc-' + className + '-container' });
                this.masterContainerEl.appendChild(containerEl);
                for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
                    var seg = segs_1[_i];
                    containerEl.appendChild(seg.el);
                }
                return [containerEl]; // return value
            }
        };
        TimelineLaneFillRenderer.prototype.computeSegSizes = function (segs) {
            var timeAxis = this.timeAxis;
            for (var _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
                var seg = segs_2[_i];
                var coords = timeAxis.rangeToCoords(seg);
                seg.left = coords.left;
                seg.right = coords.right;
            }
        };
        TimelineLaneFillRenderer.prototype.assignSegSizes = function (segs) {
            for (var _i = 0, segs_3 = segs; _i < segs_3.length; _i++) {
                var seg = segs_3[_i];
                core.applyStyle(seg.el, {
                    left: seg.left,
                    right: -seg.right
                });
            }
        };
        return TimelineLaneFillRenderer;
    }(core.FillRenderer));

    var TimelineLane = /** @class */ (function (_super) {
        __extends(TimelineLane, _super);
        function TimelineLane(context, fgContainerEl, bgContainerEl, timeAxis) {
            var _this = _super.call(this, context, bgContainerEl) // should el be bgContainerEl???
             || this;
            _this.slicer = new TimelineLaneSlicer();
            _this.renderEventDrag = core.memoizeRendering(_this._renderEventDrag, _this._unrenderEventDrag);
            _this.renderEventResize = core.memoizeRendering(_this._renderEventResize, _this._unrenderEventResize);
            var fillRenderer = _this.fillRenderer = new TimelineLaneFillRenderer(context, bgContainerEl, timeAxis);
            var eventRenderer = _this.eventRenderer = new TimelineLaneEventRenderer(context, fgContainerEl, timeAxis);
            _this.mirrorRenderer = new TimelineLaneEventRenderer(context, fgContainerEl, timeAxis);
            _this.renderBusinessHours = core.memoizeRendering(fillRenderer.renderSegs.bind(fillRenderer, 'businessHours'), fillRenderer.unrender.bind(fillRenderer, 'businessHours'));
            _this.renderDateSelection = core.memoizeRendering(fillRenderer.renderSegs.bind(fillRenderer, 'highlight'), fillRenderer.unrender.bind(fillRenderer, 'highlight'));
            _this.renderBgEvents = core.memoizeRendering(fillRenderer.renderSegs.bind(fillRenderer, 'bgEvent'), fillRenderer.unrender.bind(fillRenderer, 'bgEvent'));
            _this.renderFgEvents = core.memoizeRendering(eventRenderer.renderSegs.bind(eventRenderer), eventRenderer.unrender.bind(eventRenderer));
            _this.renderEventSelection = core.memoizeRendering(eventRenderer.selectByInstanceId.bind(eventRenderer), eventRenderer.unselectByInstanceId.bind(eventRenderer), [_this.renderFgEvents]);
            _this.timeAxis = timeAxis;
            return _this;
        }
        TimelineLane.prototype.render = function (props) {
            var slicedProps = this.slicer.sliceProps(props, props.dateProfile, this.timeAxis.tDateProfile.isTimeScale ? null : props.nextDayThreshold, this, this.timeAxis);
            this.renderBusinessHours(slicedProps.businessHourSegs);
            this.renderDateSelection(slicedProps.dateSelectionSegs);
            this.renderBgEvents(slicedProps.bgEventSegs);
            this.renderFgEvents(slicedProps.fgEventSegs);
            this.renderEventSelection(slicedProps.eventSelection);
            this.renderEventDrag(slicedProps.eventDrag);
            this.renderEventResize(slicedProps.eventResize);
        };
        TimelineLane.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.renderBusinessHours.unrender();
            this.renderDateSelection.unrender();
            this.renderBgEvents.unrender();
            this.renderFgEvents.unrender();
            this.renderEventSelection.unrender();
            this.renderEventDrag.unrender();
            this.renderEventResize.unrender();
        };
        TimelineLane.prototype._renderEventDrag = function (state) {
            if (state) {
                this.eventRenderer.hideByHash(state.affectedInstances);
                this.mirrorRenderer.renderSegs(state.segs, { isDragging: true, sourceSeg: state.sourceSeg });
            }
        };
        TimelineLane.prototype._unrenderEventDrag = function (state) {
            if (state) {
                this.eventRenderer.showByHash(state.affectedInstances);
                this.mirrorRenderer.unrender(state.segs, { isDragging: true, sourceSeg: state.sourceSeg });
            }
        };
        TimelineLane.prototype._renderEventResize = function (state) {
            if (state) {
                // HACK. eventRenderer and fillRenderer both use these segs. would compete over seg.el
                var segsForHighlight = state.segs.map(function (seg) {
                    return __assign({}, seg);
                });
                this.eventRenderer.hideByHash(state.affectedInstances);
                this.fillRenderer.renderSegs('highlight', segsForHighlight);
                this.mirrorRenderer.renderSegs(state.segs, { isDragging: true, sourceSeg: state.sourceSeg });
            }
        };
        TimelineLane.prototype._unrenderEventResize = function (state) {
            if (state) {
                this.eventRenderer.showByHash(state.affectedInstances);
                this.fillRenderer.unrender('highlight');
                this.mirrorRenderer.unrender(state.segs, { isDragging: true, sourceSeg: state.sourceSeg });
            }
        };
        TimelineLane.prototype.updateSize = function (isResize) {
            var _a = this, fillRenderer = _a.fillRenderer, eventRenderer = _a.eventRenderer, mirrorRenderer = _a.mirrorRenderer;
            fillRenderer.computeSizes(isResize);
            eventRenderer.computeSizes(isResize);
            mirrorRenderer.computeSizes(isResize);
            fillRenderer.assignSizes(isResize);
            eventRenderer.assignSizes(isResize);
            mirrorRenderer.assignSizes(isResize);
        };
        return TimelineLane;
    }(core.DateComponent));
    var TimelineLaneSlicer = /** @class */ (function (_super) {
        __extends(TimelineLaneSlicer, _super);
        function TimelineLaneSlicer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimelineLaneSlicer.prototype.sliceRange = function (origRange, timeAxis) {
            var tDateProfile = timeAxis.tDateProfile;
            var dateProfile = timeAxis.props.dateProfile;
            var normalRange = normalizeRange(origRange, tDateProfile, timeAxis.dateEnv);
            var segs = [];
            // protect against when the span is entirely in an invalid date region
            if (timeAxis.computeDateSnapCoverage(normalRange.start) < timeAxis.computeDateSnapCoverage(normalRange.end)) {
                // intersect the footprint's range with the grid's range
                var slicedRange = core.intersectRanges(normalRange, tDateProfile.normalizedRange);
                if (slicedRange) {
                    segs.push({
                        start: slicedRange.start,
                        end: slicedRange.end,
                        isStart: slicedRange.start.valueOf() === normalRange.start.valueOf() && isValidDate(slicedRange.start, tDateProfile, dateProfile, timeAxis.view),
                        isEnd: slicedRange.end.valueOf() === normalRange.end.valueOf() && isValidDate(core.addMs(slicedRange.end, -1), tDateProfile, dateProfile, timeAxis.view)
                    });
                }
            }
            return segs;
        };
        return TimelineLaneSlicer;
    }(core.Slicer));

    var TimelineView = /** @class */ (function (_super) {
        __extends(TimelineView, _super);
        function TimelineView(context, viewSpec, dateProfileGenerator, parentEl) {
            var _this = _super.call(this, context, viewSpec, dateProfileGenerator, parentEl) || this;
            _this.el.classList.add('fc-timeline');
            if (_this.opt('eventOverlap') === false) {
                _this.el.classList.add('fc-no-overlap');
            }
            _this.el.innerHTML = _this.renderSkeletonHtml();
            _this.timeAxis = new TimeAxis(_this.context, _this.el.querySelector('thead .fc-time-area'), _this.el.querySelector('tbody .fc-time-area'));
            _this.lane = new TimelineLane(_this.context, _this.timeAxis.layout.bodyScroller.enhancedScroll.canvas.contentEl, _this.timeAxis.layout.bodyScroller.enhancedScroll.canvas.bgEl, _this.timeAxis);
            context.calendar.registerInteractiveComponent(_this, {
                el: _this.timeAxis.slats.el
            });
            return _this;
        }
        TimelineView.prototype.destroy = function () {
            this.timeAxis.destroy();
            this.lane.destroy();
            _super.prototype.destroy.call(this);
            this.calendar.unregisterInteractiveComponent(this);
        };
        TimelineView.prototype.renderSkeletonHtml = function () {
            var theme = this.theme;
            return "<table class=\"" + theme.getClass('tableGrid') + "\"> <thead class=\"fc-head\"> <tr> <td class=\"fc-time-area " + theme.getClass('widgetHeader') + "\"></td> </tr> </thead> <tbody class=\"fc-body\"> <tr> <td class=\"fc-time-area " + theme.getClass('widgetContent') + "\"></td> </tr> </tbody> </table>";
        };
        TimelineView.prototype.render = function (props) {
            _super.prototype.render.call(this, props); // flags for updateSize, addScroll
            this.timeAxis.receiveProps({
                dateProfile: props.dateProfile
            });
            this.lane.receiveProps(__assign({}, props, { nextDayThreshold: this.nextDayThreshold }));
        };
        TimelineView.prototype.updateSize = function (isResize, totalHeight, isAuto) {
            this.timeAxis.updateSize(isResize, totalHeight, isAuto);
            this.lane.updateSize(isResize);
        };
        // Now Indicator
        // ------------------------------------------------------------------------------------------
        TimelineView.prototype.getNowIndicatorUnit = function (dateProfile) {
            return this.timeAxis.getNowIndicatorUnit(dateProfile);
        };
        TimelineView.prototype.renderNowIndicator = function (date) {
            this.timeAxis.renderNowIndicator(date);
        };
        TimelineView.prototype.unrenderNowIndicator = function () {
            this.timeAxis.unrenderNowIndicator();
        };
        // Scroll System
        // ------------------------------------------------------------------------------------------
        TimelineView.prototype.computeDateScroll = function (timeMs) {
            return this.timeAxis.computeDateScroll(timeMs);
        };
        TimelineView.prototype.applyScroll = function (scroll, isResize) {
            _super.prototype.applyScroll.call(this, scroll, isResize); // will call applyDateScroll
            // avoid updating stickyscroll too often
            // TODO: repeat code as ResourceTimelineView::updateSize
            var calendar = this.calendar;
            if (isResize || calendar.isViewUpdated || calendar.isDatesUpdated || calendar.isEventsUpdated) {
                this.timeAxis.updateStickyScrollers();
            }
        };
        TimelineView.prototype.applyDateScroll = function (scroll) {
            this.timeAxis.applyDateScroll(scroll);
        };
        TimelineView.prototype.queryScroll = function () {
            var enhancedScroll = this.timeAxis.layout.bodyScroller.enhancedScroll;
            return {
                top: enhancedScroll.getScrollTop(),
                left: enhancedScroll.getScrollLeft()
            };
        };
        // Hit System
        // ------------------------------------------------------------------------------------------
        TimelineView.prototype.buildPositionCaches = function () {
            this.timeAxis.slats.updateSize();
        };
        TimelineView.prototype.queryHit = function (positionLeft, positionTop, elWidth, elHeight) {
            var slatHit = this.timeAxis.slats.positionToHit(positionLeft);
            if (slatHit) {
                return {
                    component: this,
                    dateSpan: slatHit.dateSpan,
                    rect: {
                        left: slatHit.left,
                        right: slatHit.right,
                        top: 0,
                        bottom: elHeight
                    },
                    dayEl: slatHit.dayEl,
                    layer: 0
                };
            }
        };
        return TimelineView;
    }(core.View));

    var main = core.createPlugin({
        defaultView: 'timelineDay',
        views: {
            timeline: {
                class: TimelineView,
                eventResizableFromStart: true // how is this consumed for TimelineView tho?
            },
            timelineDay: {
                type: 'timeline',
                duration: { days: 1 }
            },
            timelineWeek: {
                type: 'timeline',
                duration: { weeks: 1 }
            },
            timelineMonth: {
                type: 'timeline',
                duration: { months: 1 }
            },
            timelineYear: {
                type: 'timeline',
                duration: { years: 1 }
            }
        }
    });

    exports.HeaderBodyLayout = HeaderBodyLayout;
    exports.ScrollJoiner = ScrollJoiner;
    exports.StickyScroller = StickyScroller;
    exports.TimeAxis = TimeAxis;
    exports.TimelineLane = TimelineLane;
    exports.TimelineView = TimelineView;
    exports.default = main;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
