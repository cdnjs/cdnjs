if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/datatable-scroll/datatable-scroll.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/datatable-scroll/datatable-scroll.js",
    code: []
};
_yuitest_coverage["build/datatable-scroll/datatable-scroll.js"].code=["YUI.add('datatable-scroll', function (Y, NAME) {","","/**","Adds the ability to make the table rows scrollable while preserving the header","placement.","","@module datatable-scroll","@for DataTable","@since 3.5.0","**/","var YLang = Y.Lang,","    isString = YLang.isString,","    isNumber = YLang.isNumber,","    isArray  = YLang.isArray,","","    Scrollable;","","// Returns the numeric value portion of the computed style, defaulting to 0","function styleDim(node, style) {","    return parseInt(node.getComputedStyle(style), 10) || 0;","}","","/**","_API docs for this extension are included in the DataTable class._","","Adds the ability to make the table rows scrollable while preserving the header","placement.","","There are two types of scrolling, horizontal (x) and vertical (y).  Horizontal","scrolling is achieved by wrapping the entire table in a scrollable container.","Vertical scrolling is achieved by splitting the table headers and data into two","separate tables, the latter of which is wrapped in a vertically scrolling","container.  In this case, column widths of header cells and data cells are kept","in sync programmatically.","","Since the split table synchronization can be costly at runtime, the split is only","done if the data in the table stretches beyond the configured `height` value.","","To activate or deactivate scrolling, set the `scrollable` attribute to one of","the following values:",""," * `false` - (default) Scrolling is disabled."," * `true` or 'xy' - If `height` is set, vertical scrolling will be activated, if","            `width` is set, horizontal scrolling will be activated."," * 'x' - Activate horizontal scrolling only. Requires the `width` attribute is","         also set."," * 'y' - Activate vertical scrolling only. Requires the `height` attribute is","         also set.","","@class DataTable.Scrollable","@for DataTable","@since 3.5.0","**/","Y.DataTable.Scrollable = Scrollable = function () {};","","Scrollable.ATTRS = {","    /**","    Activates or deactivates scrolling in the table.  Acceptable values are:","","     * `false` - (default) Scrolling is disabled.","     * `true` or 'xy' - If `height` is set, vertical scrolling will be","       activated, if `width` is set, horizontal scrolling will be activated.","     * 'x' - Activate horizontal scrolling only. Requires the `width` attribute","       is also set.","     * 'y' - Activate vertical scrolling only. Requires the `height` attribute","       is also set.","","    @attribute scrollable","    @type {String|Boolean}","    @value false","    @since 3.5.0","    **/","    scrollable: {","        value: false,","        setter: '_setScrollable'","    }","};","","Y.mix(Scrollable.prototype, {","","    /**","    Scrolls a given row or cell into view if the table is scrolling.  Pass the","    `clientId` of a Model from the DataTable's `data` ModelList or its row","    index to scroll to a row or a [row index, column index] array to scroll to","    a cell.  Alternately, to scroll to any element contained within the table's","    scrolling areas, pass its ID, or the Node itself (though you could just as","    well call `node.scrollIntoView()` yourself, but hey, whatever).","","    @method scrollTo","    @param {String|Number|Number[]|Node} id A row clientId, row index, cell","            coordinate array, id string, or Node","    @return {DataTable}","    @chainable","    @since 3.5.0","    **/","    scrollTo: function (id) {","        var target;","","        if (id && this._tbodyNode && (this._yScrollNode || this._xScrollNode)) {","            if (isArray(id)) {","                target = this.getCell(id);","            } else if (isNumber(id)) {","                target = this.getRow(id);","            } else if (isString(id)) {","                target = this._tbodyNode.one('#' + id);","            } else if (id instanceof Y.Node &&","                    // TODO: ancestor(yScrollNode, xScrollNode)","                    id.ancestor('.yui3-datatable') === this.get('boundingBox')) {","                target = id;","            }","","            if(target) {","                target.scrollIntoView();","            }","        }","","        return this;","    },","","    //--------------------------------------------------------------------------","    // Protected properties and methods","    //--------------------------------------------------------------------------","","    /**","    Template for the `<table>` that is used to fix the caption in place when","    the table is horizontally scrolling.","","    @property _CAPTION_TABLE_TEMPLATE","    @type {HTML}","    @value '<table class=\"{className}\" role=\"presentation\"></table>'","    @protected","    @since 3.5.0","    **/","    _CAPTION_TABLE_TEMPLATE: '<table class=\"{className}\" role=\"presentation\"></table>',","","    /**","    Template used to create sizable element liners around header content to","    synchronize fixed header column widths.","","    @property _SCROLL_LINER_TEMPLATE","    @type {HTML}","    @value '<div class=\"{className}\"></div>'","    @protected","    @since 3.5.0","    **/","    _SCROLL_LINER_TEMPLATE: '<div class=\"{className}\"></div>',","","    /**","    Template for the virtual scrollbar needed in \"y\" and \"xy\" scrolling setups.","","    @property _SCROLLBAR_TEMPLATE","    @type {HTML}","    @value '<div class=\"{className}\"><div></div></div>'","    @protected","    @since 3.5.0","    **/","    _SCROLLBAR_TEMPLATE: '<div class=\"{className}\"><div></div></div>',","","    /**","    Template for the `<div>` that is used to contain the table when the table is","    horizontally scrolling.","","    @property _X_SCROLLER_TEMPLATE","    @type {HTML}","    @value '<div class=\"{className}\"></div>'","    @protected","    @since 3.5.0","    **/","    _X_SCROLLER_TEMPLATE: '<div class=\"{className}\"></div>',","","    /**","    Template for the `<table>` used to contain the fixed column headers for","    vertically scrolling tables.","","    @property _Y_SCROLL_HEADER_TEMPLATE","    @type {HTML}","    @value '<table cellspacing=\"0\" role=\"presentation\" aria-hidden=\"true\" class=\"{className}\"></table>'","    @protected","    @since 3.5.0","    **/","    _Y_SCROLL_HEADER_TEMPLATE: '<table cellspacing=\"0\" aria-hidden=\"true\" class=\"{className}\"></table>',","","    /**","    Template for the `<div>` that is used to contain the rows when the table is","    vertically scrolling.","","    @property _Y_SCROLLER_TEMPLATE","    @type {HTML}","    @value '<div class=\"{className}\"><div class=\"{scrollerClassName}\"></div></div>'","    @protected","    @since 3.5.0","    **/","    _Y_SCROLLER_TEMPLATE: '<div class=\"{className}\"><div class=\"{scrollerClassName}\"></div></div>',","","    /**","    Adds padding to the last cells in the fixed header for vertically scrolling","    tables.  This padding is equal in width to the scrollbar, so can't be","    relegated to a stylesheet.","","    @method _addScrollbarPadding","    @protected","    @since 3.5.0","    **/","    _addScrollbarPadding: function () {","        var fixedHeader = this._yScrollHeader,","            headerClass = '.' + this.getClassName('header'),","            scrollbarWidth, rows, header, i, len;","","        if (fixedHeader) {","            scrollbarWidth = Y.DOM.getScrollbarWidth() + 'px';","            rows = fixedHeader.all('tr');","","            for (i = 0, len = rows.size(); i < len; i += +header.get('rowSpan')) {","                header = rows.item(i).all(headerClass).pop();","                header.setStyle('paddingRight', scrollbarWidth);","            }","        }","    },","","    /**","    Reacts to changes in the `scrollable` attribute by updating the `_xScroll`","    and `_yScroll` properties and syncing the scrolling structure accordingly.","","    @method _afterScrollableChange","    @param {EventFacade} e The relevant change event (ignored)","    @protected","    @since 3.5.0","    **/","    _afterScrollableChange: function () {","        var scroller = this._xScrollNode;","","        if (this._xScroll && scroller) {","            if (this._yScroll && !this._yScrollNode) {","                scroller.setStyle('paddingRight',","                    Y.DOM.getScrollbarWidth() + 'px');","            } else if (!this._yScroll && this._yScrollNode) {","                scroller.setStyle('paddingRight', '');","            }","        }","","        this._syncScrollUI();","    },","","    /**","    Reacts to changes in the `caption` attribute by adding, removing, or","    syncing the caption table when the table is set to scroll.","","    @method _afterScrollCaptionChange","    @param {EventFacade} e The relevant change event (ignored)","    @protected","    @since 3.5.0","    **/","    _afterScrollCaptionChange: function () {","        if (this._xScroll || this._yScroll) {","            this._syncScrollUI();","        }","    },","","    /**","    Reacts to changes in the `columns` attribute of vertically scrolling tables","    by refreshing the fixed headers, scroll container, and virtual scrollbar","    position.","","    @method _afterScrollColumnsChange","    @param {EventFacade} e The relevant change event (ignored)","    @protected","    @since 3.5.0","    **/","    _afterScrollColumnsChange: function () {","        if (this._xScroll || this._yScroll) {","            if (this._yScroll && this._yScrollHeader) {","                this._syncScrollHeaders();","            }","","            this._syncScrollUI();","        }","    },","","    /**","    Reacts to changes in vertically scrolling table's `data` ModelList by","    synchronizing the fixed column header widths and virtual scrollbar height.","","    @method _afterScrollDataChange","    @param {EventFacade} e The relevant change event (ignored)","    @protected","    @since 3.5.0","    **/","    _afterScrollDataChange: function () {","        if (this._xScroll || this._yScroll) {","            this._syncScrollUI();","        }","    },","","    /**","    Reacts to changes in the `height` attribute of vertically scrolling tables","    by updating the height of the `<div>` wrapping the data table and the","    virtual scrollbar.  If `scrollable` was set to \"y\" or \"xy\" but lacking a","    declared `height` until the received change, `_syncScrollUI` is called to","    create the fixed headers etc.","","    @method _afterScrollHeightChange","    @param {EventFacade} e The relevant change event (ignored)","    @protected","    @since 3.5.0","    **/","    _afterScrollHeightChange: function () {","        if (this._yScroll) {","            this._syncScrollUI();","        }","    },","","    /* (not an API doc comment on purpose)","    Reacts to the sort event (if the table is also sortable) by updating the","    fixed header classes to match the data table's headers.","","    THIS IS A HACK that will be removed immediately after the 3.5.0 release.","    If you're reading this and the current version is greater than 3.5.0, I","    should be publicly scolded.","    */","    _afterScrollSort: function () {","        var headers, headerClass;","","        if (this._yScroll && this._yScrollHeader) {","            headerClass = '.' + this.getClassName('header');","            headers = this._theadNode.all(headerClass);","","            this._yScrollHeader.all(headerClass).each(function (header, i) {","                header.set('className', headers.item(i).get('className'));","            });","        }","    },","","    /**","    Reacts to changes in the width of scrolling tables by expanding the width of","    the `<div>` wrapping the data table for horizontally scrolling tables or","    upding the position of the virtual scrollbar for vertically scrolling","    tables.","","    @method _afterScrollWidthChange","    @param {EventFacade} e The relevant change event (ignored)","    @protected","    @since 3.5.0","    **/","    _afterScrollWidthChange: function () {","        if (this._xScroll || this._yScroll) {","            this._syncScrollUI();","        }","    },","","    /**","    Binds virtual scrollbar interaction to the `_yScrollNode`'s `scrollTop` and","    vice versa.","","    @method _bindScrollbar","    @protected","    @since 3.5.0","    **/","    _bindScrollbar: function () {","        var scrollbar = this._scrollbarNode,","            scroller  = this._yScrollNode;","","        if (scrollbar && scroller && !this._scrollbarEventHandle) {","            this._scrollbarEventHandle = new Y.Event.Handle([","                scrollbar.on('scroll', this._syncScrollPosition, this),","                scroller.on('scroll', this._syncScrollPosition, this)","            ]);","        }","    },","","    /**","    Binds to the window resize event to update the vertical scrolling table","    headers and wrapper `<div>` dimensions.","","    @method _bindScrollResize","    @protected","    @since 3.5.0","    **/","    _bindScrollResize: function () {","        if (!this._scrollResizeHandle) {","            // TODO: sync header widths and scrollbar position.  If the height","            // of the headers has changed, update the scrollbar dims as well.","            this._scrollResizeHandle = Y.on('resize',","                this._syncScrollUI, null, this);","        }","    },","","    /**","    Attaches internal subscriptions to keep the scrolling structure up to date","    with changes in the table's `data`, `columns`, `caption`, or `height`.  The","    `width` is taken care of already.","","    This executes after the table's native `bindUI` method.","","    @method _bindScrollUI","    @protected","    @since 3.5.0","    **/","    _bindScrollUI: function () {","        this.after({","            columnsChange: Y.bind('_afterScrollColumnsChange', this),","            heightChange : Y.bind('_afterScrollHeightChange', this),","            widthChange  : Y.bind('_afterScrollWidthChange', this),","            captionChange: Y.bind('_afterScrollCaptionChange', this),","            scrollableChange: Y.bind('_afterScrollableChange', this),","            // FIXME: this is a last minute hack to work around the fact that","            // DT doesn't use a tableView to render table content that can be","            // replaced with a scrolling table view.  This must be removed asap!","            sort         : Y.bind('_afterScrollSort', this)","        });","","        this.after(['dataChange', '*:add', '*:remove', '*:reset', '*:change'],","            Y.bind('_afterScrollDataChange', this));","    },","","    /**","    Clears the lock and timer used to manage synchronizing the scroll position","    between the vertical scroll container and the virtual scrollbar.","","    @method _clearScrollLock","    @protected","    @since 3.5.0","    **/","    _clearScrollLock: function () {","        if (this._scrollLock) {","            this._scrollLock.cancel();","            delete this._scrollLock;","        }","    },","","    /**","    Creates a virtual scrollbar from the `_SCROLLBAR_TEMPLATE`, assigning it to","    the `_scrollbarNode` property.","","    @method _createScrollbar","    @return {Node} The created Node","    @protected","    @since 3.5.0","    **/","    _createScrollbar: function () {","        var scrollbar = this._scrollbarNode;","","        if (!scrollbar) {","            scrollbar = this._scrollbarNode = Y.Node.create(","                Y.Lang.sub(this._SCROLLBAR_TEMPLATE, {","                    className: this.getClassName('scrollbar')","                }));","","            // IE 6-10 require the scrolled area to be visible (at least 1px)","            // or they don't respond to clicking on the scrollbar rail or arrows","            scrollbar.setStyle('width', (Y.DOM.getScrollbarWidth() + 1) + 'px');","        }","","        return scrollbar;","    },","","    /**","    Creates a separate table to contain the caption when the table is","    configured to scroll vertically or horizontally.","","    @method _createScrollCaptionTable","    @return {Node} The created Node","    @protected","    @since 3.5.0","    **/","    _createScrollCaptionTable: function () {","        if (!this._captionTable) {","            this._captionTable = Y.Node.create(","                Y.Lang.sub(this._CAPTION_TABLE_TEMPLATE, {","                    className: this.getClassName('caption', 'table')","                }));","","            this._captionTable.empty();","        }","","        return this._captionTable;","    },","","    /**","    Populates the `_xScrollNode` property by creating the `<div>` Node described","    by the `_X_SCROLLER_TEMPLATE`.","","    @method _createXScrollNode","    @return {Node} The created Node","    @protected","    @since 3.5.0","    **/","    _createXScrollNode: function () {","        if (!this._xScrollNode) {","            this._xScrollNode = Y.Node.create(","                Y.Lang.sub(this._X_SCROLLER_TEMPLATE, {","                    className: this.getClassName('x','scroller')","                }));","        }","","        return this._xScrollNode;","    },","","    /**","    Populates the `_yScrollHeader` property by creating the `<table>` Node","    described by the `_Y_SCROLL_HEADER_TEMPLATE`.","","    @method _createYScrollHeader","    @return {Node} The created Node","    @protected","    @since 3.5.0","    **/","    _createYScrollHeader: function () {","        var fixedHeader = this._yScrollHeader;","","        if (!fixedHeader) {","            fixedHeader = this._yScrollHeader = Y.Node.create(","                Y.Lang.sub(this._Y_SCROLL_HEADER_TEMPLATE, {","                    className: this.getClassName('scroll','columns')","                }));","        }","","        return fixedHeader;","    },","","    /**","    Populates the `_yScrollNode` property by creating the `<div>` Node described","    by the `_Y_SCROLLER_TEMPLATE`.","","    @method _createYScrollNode","    @return {Node} The created Node","    @protected","    @since 3.5.0","    **/","    _createYScrollNode: function () {","        var scrollerClass;","","        if (!this._yScrollNode) {","            scrollerClass = this.getClassName('y', 'scroller');","","            this._yScrollContainer = Y.Node.create(","                Y.Lang.sub(this._Y_SCROLLER_TEMPLATE, {","                    className: this.getClassName('y','scroller','container'),","                    scrollerClassName: scrollerClass","                }));","","            this._yScrollNode = this._yScrollContainer","                .one('.' + scrollerClass);","        }","","        return this._yScrollContainer;","    },","","    /**","    Removes the nodes used to create horizontal and vertical scrolling and","    rejoins the caption to the main table if needed.","","    @method _disableScrolling","    @protected","    @since 3.5.0","    **/","    _disableScrolling: function () {","        this._removeScrollCaptionTable();","        this._disableXScrolling();","        this._disableYScrolling();","        this._unbindScrollResize();","","        this._uiSetWidth(this.get('width'));","    },","","    /**","    Removes the nodes used to allow horizontal scrolling.","","    @method _disableXScrolling","    @protected","    @since 3.5.0","    **/","    _disableXScrolling: function () {","        this._removeXScrollNode();","    },","","    /**","    Removes the nodes used to allow vertical scrolling.","","    @method _disableYScrolling","    @protected","    @since 3.5.0","    **/","    _disableYScrolling: function () {","        this._removeYScrollHeader();","        this._removeYScrollNode();","        this._removeYScrollContainer();","        this._removeScrollbar();","    },","","    /**","    Cleans up external event subscriptions.","","    @method destructor","    @protected","    @since 3.5.0","    **/","    destructor: function () {","        this._unbindScrollbar();","        this._unbindScrollResize();","        this._clearScrollLock();","    },","","    /**","    Sets up event handlers and AOP advice methods to bind the DataTable's natural","    behaviors with the scrolling APIs and state.","","    @method initializer","    @param {Object} config The config object passed to the constructor (ignored)","    @protected","    @since 3.5.0","    **/","    initializer: function () {","        this._setScrollProperties();","","        this.after(['scrollableChange', 'heightChange', 'widthChange'],","            this._setScrollProperties);","","        this.after('renderView', Y.bind('_syncScrollUI', this));","","        Y.Do.after(this._bindScrollUI, this, 'bindUI');","    },","","    /**","    Removes the table used to house the caption when the table is scrolling.","","    @method _removeScrollCaptionTable","    @protected","    @since 3.5.0","    **/","    _removeScrollCaptionTable: function () {","        if (this._captionTable) {","            if (this._captionNode) {","                this._tableNode.prepend(this._captionNode);","            }","","            this._captionTable.remove().destroy(true);","","            delete this._captionTable;","        }","    },","","    /**","    Removes the `<div>` wrapper used to contain the data table when the table","    is horizontally scrolling.","","    @method _removeXScrollNode","    @protected","    @since 3.5.0","    **/","    _removeXScrollNode: function () {","        var scroller = this._xScrollNode;","","        if (scroller) {","            scroller.replace(scroller.get('childNodes').toFrag());","            scroller.remove().destroy(true);","","            delete this._xScrollNode;","        }","    },","","    /**","    Removes the `<div>` wrapper used to contain the data table and fixed header","    when the table is vertically scrolling.","","    @method _removeYScrollContainer","    @protected","    @since 3.5.0","    **/","    _removeYScrollContainer: function () {","        var scroller = this._yScrollContainer;","","        if (scroller) {","            scroller.replace(scroller.get('childNodes').toFrag());","            scroller.remove().destroy(true);","","            delete this._yScrollContainer;","        }","    },","","    /**","    Removes the `<table>` used to contain the fixed column headers when the","    table is vertically scrolling.","","    @method _removeYScrollHeader","    @protected","    @since 3.5.0","    **/","    _removeYScrollHeader: function () {","        if (this._yScrollHeader) {","            this._yScrollHeader.remove().destroy(true);","","            delete this._yScrollHeader;","        }","    },","","    /**","    Removes the `<div>` wrapper used to contain the data table when the table","    is vertically scrolling.","","    @method _removeYScrollNode","    @protected","    @since 3.5.0","    **/","    _removeYScrollNode: function () {","        var scroller = this._yScrollNode;","","        if (scroller) {","            scroller.replace(scroller.get('childNodes').toFrag());","            scroller.remove().destroy(true);","","            delete this._yScrollNode;","        }","    },","","    /**","    Removes the virtual scrollbar used by scrolling tables.","","    @method _removeScrollbar","    @protected","    @since 3.5.0","    **/","    _removeScrollbar: function () {","        if (this._scrollbarNode) {","            this._scrollbarNode.remove().destroy(true);","","            delete this._scrollbarNode;","        }","        if (this._scrollbarEventHandle) {","            this._scrollbarEventHandle.detach();","","            delete this._scrollbarEventHandle;","        }","    },","","    /**","    Accepts (case insensitive) values \"x\", \"y\", \"xy\", `true`, and `false`.","    `true` is translated to \"xy\" and upper case values are converted to lower","    case.  All other values are invalid.","","    @method _setScrollable","    @param {String|Boolea} val Incoming value for the `scrollable` attribute","    @return {String}","    @protected","    @since 3.5.0","    **/","    _setScrollable: function (val) {","        if (val === true) {","            val = 'xy';","        }","","        if (isString(val)) {","            val = val.toLowerCase();","        }","","        return (val === false || val === 'y' || val === 'x' || val === 'xy') ?","            val :","            Y.Attribute.INVALID_VALUE;","    },","","    /**","    Assigns the `_xScroll` and `_yScroll` properties to true if an","    appropriate value is set in the `scrollable` attribute and the `height`","    and/or `width` is set.","","    @method _setScrollProperties","    @protected","    @since 3.5.0","    **/","    _setScrollProperties: function () {","        var scrollable = this.get('scrollable') || '',","            width      = this.get('width'),","            height     = this.get('height');","","        this._xScroll = width  && scrollable.indexOf('x') > -1;","        this._yScroll = height && scrollable.indexOf('y') > -1;","    },","","    /**","    Keeps the virtual scrollbar and the scrolling `<div>` wrapper around the","    data table in vertically scrolling tables in sync.","","    @method _syncScrollPosition","    @param {DOMEventFacade} e The scroll event","    @protected","    @since 3.5.0","    **/","    _syncScrollPosition: function (e) {","        var scrollbar = this._scrollbarNode,","            scroller  = this._yScrollNode,","            source    = e.currentTarget,","            other;","","        if (scrollbar && scroller) {","            if (this._scrollLock && this._scrollLock.source !== source) {","                return;","            }","","            this._clearScrollLock();","            this._scrollLock = Y.later(300, this, this._clearScrollLock);","            this._scrollLock.source = source;","","            other = (source === scrollbar) ? scroller : scrollbar;","            other.set('scrollTop', source.get('scrollTop'));","        }","    },","","    /**","    Splits the caption from the data `<table>` if the table is configured to","    scroll.  If not, rejoins the caption to the data `<table>` if it needs to","    be.","","    @method _syncScrollCaptionUI","    @protected","    @since 3.5.0","    **/","    _syncScrollCaptionUI: function () {","        var caption      = this._captionNode,","            table        = this._tableNode,","            captionTable = this._captionTable,","            id;","","        if (caption) {","            id = caption.getAttribute('id');","","            if (!captionTable) {","                captionTable = this._createScrollCaptionTable();","","                this.get('contentBox').prepend(captionTable);","            }","","            if (!caption.get('parentNode').compareTo(captionTable)) {","                captionTable.empty().insert(caption);","","                if (!id) {","                    id = Y.stamp(caption);","                    caption.setAttribute('id', id);","                }","","                table.setAttribute('aria-describedby', id);","            }","        } else if (captionTable) {","            this._removeScrollCaptionTable();","        }","    },","","    /**","    Assigns widths to the fixed header columns to match the columns in the data","    table.","","    @method _syncScrollColumnWidths","    @protected","    @since 3.5.0","    **/","    _syncScrollColumnWidths: function () {","        var widths = [];","","        if (this._theadNode && this._yScrollHeader) {","            // Capture dims and assign widths in two passes to avoid reflows for","            // each access of clientWidth/getComputedStyle","            this._theadNode.all('.' + this.getClassName('header'))","                .each(function (header) {","                    widths.push(","                        // FIXME: IE returns the col.style.width from","                        // getComputedStyle even if the column has been","                        // compressed below that width, so it must use","                        // clientWidth. FF requires getComputedStyle because it","                        // uses fractional widths that round up to an overall","                        // cell/table width 1px greater than the data table's","                        // cell/table width, resulting in misaligned columns or","                        // fixed header bleed through. I can't think of a","                        // *reasonable* way to capture the correct width without","                        // a sniff.  Math.min(cW - p, getCS(w)) was imperfect","                        // and punished all browsers, anyway.","                        (Y.UA.ie && Y.UA.ie < 8) ?","                            (header.get('clientWidth') -","                             styleDim(header, 'paddingLeft') -","                             styleDim(header, 'paddingRight')) + 'px' :","                            header.getComputedStyle('width'));","            });","","            this._yScrollHeader.all('.' + this.getClassName('scroll', 'liner'))","                .each(function (liner, i) {","                    liner.setStyle('width', widths[i]);","                });","        }","    },","","    /**","    Creates matching headers in the fixed header table for vertically scrolling","    tables and synchronizes the column widths.","","    @method _syncScrollHeaders","    @protected","    @since 3.5.0","    **/","    _syncScrollHeaders: function () {","        var fixedHeader   = this._yScrollHeader,","            linerTemplate = this._SCROLL_LINER_TEMPLATE,","            linerClass    = this.getClassName('scroll', 'liner'),","            headerClass   = this.getClassName('header'),","            headers       = this._theadNode.all('.' + headerClass);","","        if (this._theadNode && fixedHeader) {","            fixedHeader.empty().appendChild(","                this._theadNode.cloneNode(true));","","            // Prevent duplicate IDs and assign ARIA attributes to hide","            // from screen readers","            fixedHeader.all('[id]').removeAttribute('id');","","            fixedHeader.all('.' + headerClass).each(function (header, i) {","                var liner = Y.Node.create(Y.Lang.sub(linerTemplate, {","                            className: linerClass","                        })),","                    refHeader = headers.item(i);","","                // Can't assign via skin css because sort (and potentially","                // others) might override the padding values.","                liner.setStyle('padding',","                    refHeader.getComputedStyle('paddingTop') + ' ' +","                    refHeader.getComputedStyle('paddingRight') + ' ' +","                    refHeader.getComputedStyle('paddingBottom') + ' ' +","                    refHeader.getComputedStyle('paddingLeft'));","","                liner.appendChild(header.get('childNodes').toFrag());","","                header.appendChild(liner);","            }, this);","","            this._syncScrollColumnWidths();","","            this._addScrollbarPadding();","        }","    },","","    /**","    Wraps the table for X and Y scrolling, if necessary, if the `scrollable`","    attribute is set.  Synchronizes dimensions and DOM placement of all","    scrolling related nodes.","","    @method _syncScrollUI","    @protected","    @since 3.5.0","    **/","    _syncScrollUI: function () {","        var x = this._xScroll,","            y = this._yScroll,","            xScroller  = this._xScrollNode,","            yScroller  = this._yScrollNode,","            scrollLeft = xScroller && xScroller.get('scrollLeft'),","            scrollTop  = yScroller && yScroller.get('scrollTop');","","        this._uiSetScrollable();","","        // TODO: Probably should split this up into syncX, syncY, and syncXY","        if (x || y) {","            if ((this.get('width') || '').slice(-1) === '%') {","                this._bindScrollResize();","            } else {","                this._unbindScrollResize();","            }","","            this._syncScrollCaptionUI();","        } else {","            this._disableScrolling();","        }","","        if (this._yScrollHeader) {","            this._yScrollHeader.setStyle('display', 'none');","        }","","        if (x) {","            if (!y) {","                this._disableYScrolling();","            }","","            this._syncXScrollUI(y);","        }","","        if (y) {","            if (!x) {","                this._disableXScrolling();","            }","","            this._syncYScrollUI(x);","        }","","        // Restore scroll position","        if (scrollLeft && this._xScrollNode) {","            this._xScrollNode.set('scrollLeft', scrollLeft);","        }","        if (scrollTop && this._yScrollNode) {","            this._yScrollNode.set('scrollTop', scrollTop);","        }","    },","","    /**","    Wraps the table in a scrolling `<div>` of the configured width for \"x\"","    scrolling.","","    @method _syncXScrollUI","    @param {Boolean} xy True if the table is configured with scrollable =\"xy\"","    @protected","    @since 3.5.0","    **/","    _syncXScrollUI: function (xy) {","        var scroller     = this._xScrollNode,","            yScroller    = this._yScrollContainer,","            table        = this._tableNode,","            width        = this.get('width'),","            bbWidth      = this.get('boundingBox').get('offsetWidth'),","            scrollbarWidth = Y.DOM.getScrollbarWidth(),","            borderWidth, tableWidth;","","        if (!scroller) {","            scroller = this._createXScrollNode();","","            // Not using table.wrap() because IE went all crazy, wrapping the","            // table in the last td in the table itself.","            (yScroller || table).replace(scroller).appendTo(scroller);","        }","","        // Can't use offsetHeight - clientHeight because IE6 returns","        // clientHeight of 0 intially.","        borderWidth = styleDim(scroller, 'borderLeftWidth') +","                      styleDim(scroller, 'borderRightWidth');","","        scroller.setStyle('width', '');","        this._uiSetDim('width', '');","        if (xy && this._yScrollContainer) {","            this._yScrollContainer.setStyle('width', '');","        }","","        // Lock the table's unconstrained width to avoid configured column","        // widths being ignored","        if (Y.UA.ie && Y.UA.ie < 8) {","            // Have to assign a style and trigger a reflow to allow the","            // subsequent clearing of width + reflow to expand the table to","            // natural width in IE 6","            table.setStyle('width', width);","            table.get('offsetWidth');","        }","        table.setStyle('width', '');","        tableWidth = table.get('offsetWidth');","        table.setStyle('width', tableWidth + 'px');","","        this._uiSetDim('width', width);","","        // Can't use 100% width because the borders add additional width","        // TODO: Cache the border widths, though it won't prevent a reflow","        scroller.setStyle('width', (bbWidth - borderWidth) + 'px');","","        // expand the table to fill the assigned width if it doesn't","        // already overflow the configured width","        if ((scroller.get('offsetWidth') - borderWidth) > tableWidth) {","            // Assumes the wrapped table doesn't have borders","            if (xy) {","                table.setStyle('width', (scroller.get('offsetWidth') -","                     borderWidth - scrollbarWidth) + 'px');","            } else {","                table.setStyle('width', '100%');","            }","        }","    },","","    /**","    Wraps the table in a scrolling `<div>` of the configured height (accounting","    for the caption if there is one) if \"y\" scrolling is enabled.  Otherwise,","    unwraps the table if necessary.","","    @method _syncYScrollUI","    @param {Boolean} xy True if the table is configured with scrollable = \"xy\"","    @protected","    @since 3.5.0","    **/","    _syncYScrollUI: function (xy) {","        var yScroller    = this._yScrollContainer,","            yScrollNode  = this._yScrollNode,","            xScroller    = this._xScrollNode,","            fixedHeader  = this._yScrollHeader,","            scrollbar    = this._scrollbarNode,","            table        = this._tableNode,","            thead        = this._theadNode,","            captionTable = this._captionTable,","            boundingBox  = this.get('boundingBox'),","            contentBox   = this.get('contentBox'),","            width        = this.get('width'),","            height       = boundingBox.get('offsetHeight'),","            scrollbarWidth = Y.DOM.getScrollbarWidth(),","            outerScroller;","","        if (captionTable && !xy) {","            captionTable.setStyle('width', width || '100%');","        }","","        if (!yScroller) {","            yScroller = this._createYScrollNode();","","            yScrollNode = this._yScrollNode;","","            table.replace(yScroller).appendTo(yScrollNode);","        }","","        outerScroller = xy ? xScroller : yScroller;","","        if (!xy) {","            table.setStyle('width', '');","        }","","        // Set the scroller height","        if (xy) {","            // Account for the horizontal scrollbar in the overall height","            height -= scrollbarWidth;","        }","","        yScrollNode.setStyle('height',","            (height - outerScroller.get('offsetTop') -","            // because IE6 is returning clientHeight 0 initially","            styleDim(outerScroller, 'borderTopWidth') -","            styleDim(outerScroller, 'borderBottomWidth')) + 'px');","","        // Set the scroller width","        if (xy) {","            // For xy scrolling tables, the table should expand freely within","            // the x scroller","            yScroller.setStyle('width',","                (table.get('offsetWidth') + scrollbarWidth) + 'px');","        } else {","            this._uiSetYScrollWidth(width);","        }","","        if (captionTable && !xy) {","            captionTable.setStyle('width', yScroller.get('offsetWidth') + 'px');","        }","","        // Allow headerless scrolling","        if (thead && !fixedHeader) {","            fixedHeader = this._createYScrollHeader();","","            yScroller.prepend(fixedHeader);","","            this._syncScrollHeaders();","        }","","        if (fixedHeader) {","            this._syncScrollColumnWidths();","","            fixedHeader.setStyle('display', '');","            // This might need to come back if FF has issues","            //fixedHeader.setStyle('width', '100%');","                //(yScroller.get('clientWidth') + scrollbarWidth) + 'px');","","            if (!scrollbar) {","                scrollbar = this._createScrollbar();","","                this._bindScrollbar();","","                contentBox.prepend(scrollbar);","            }","","            this._uiSetScrollbarHeight();","            this._uiSetScrollbarPosition(outerScroller);","        }","    },","","    /**","    Assigns the appropriate class to the `boundingBox` to identify the DataTable","    as horizontally scrolling, vertically scrolling, or both (adds both classes).","","    Classes added are \"yui3-datatable-scrollable-x\" or \"...-y\"","","    @method _uiSetScrollable","    @protected","    @since 3.5.0","    **/","    _uiSetScrollable: function () {","        this.get('boundingBox')","            .toggleClass(this.getClassName('scrollable','x'), this._xScroll)","            .toggleClass(this.getClassName('scrollable','y'), this._yScroll);","    },","","    /**","    Updates the virtual scrollbar's height to avoid overlapping with the fixed","    headers.","","    @method _uiSetScrollbarHeight","    @protected","    @since 3.5.0","    **/","    _uiSetScrollbarHeight: function () {","        var scrollbar   = this._scrollbarNode,","            scroller    = this._yScrollNode,","            fixedHeader = this._yScrollHeader;","","        if (scrollbar && scroller && fixedHeader) {","            scrollbar.get('firstChild').setStyle('height',","                this._tbodyNode.get('scrollHeight') + 'px');","","            scrollbar.setStyle('height',","                (parseFloat(scroller.getComputedStyle('height')) -","                 parseFloat(fixedHeader.getComputedStyle('height'))) + 'px');","        }","    },","","    /**","    Updates the virtual scrollbar's placement to avoid overlapping the fixed","    headers or the data table.","","    @method _uiSetScrollbarPosition","    @param {Node} scroller Reference node to position the scrollbar over","    @protected","    @since 3.5.0","    **/","    _uiSetScrollbarPosition: function (scroller) {","        var scrollbar     = this._scrollbarNode,","            fixedHeader   = this._yScrollHeader;","","        if (scrollbar && scroller && fixedHeader) {","            scrollbar.setStyles({","                // Using getCS instead of offsetHeight because FF uses","                // fractional values, but reports ints to offsetHeight, so","                // offsetHeight is unreliable.  It is probably fine to use","                // offsetHeight in this case but this was left in place after","                // fixing an off-by-1px issue in FF 10- by fixing the caption","                // font style so FF picked it up.","                top: (parseFloat(fixedHeader.getComputedStyle('height')) +","                      styleDim(scroller, 'borderTopWidth') +","                      scroller.get('offsetTop')) + 'px',","","                // Minus 1 because IE 6-10 require the scrolled area to be","                // visible by at least 1px or it won't respond to clicks on the","                // scrollbar rail or endcap arrows.","                left: (scroller.get('offsetWidth') -","                       Y.DOM.getScrollbarWidth() - 1 -","                       styleDim(scroller, 'borderRightWidth')) + 'px'","            });","        }","    },","","    /**","    Assigns the width of the `<div>` wrapping the data table in vertically","    scrolling tables.","","    If the table can't compress to the specified width, the container is","    expanded accordingly.","","    @method _uiSetYScrollWidth","    @param {String} width The CSS width to attempt to set","    @protected","    @since 3.5.0","    **/","    _uiSetYScrollWidth: function (width) {","        var scroller = this._yScrollContainer,","            table    = this._tableNode,","            tableWidth, borderWidth, scrollerWidth, scrollbarWidth;","","        if (scroller && table) {","            scrollbarWidth = Y.DOM.getScrollbarWidth();","","            if (width) {","                // Assumes no table border","                borderWidth = scroller.get('offsetWidth') -","                              scroller.get('clientWidth') +","                              scrollbarWidth; // added back at the end","","                // The table's rendered width might be greater than the","                // configured width","                scroller.setStyle('width', width);","","                // Have to subtract the border width from the configured width","                // because the scroller's width will need to be reduced by the","                // border width as well during the width reassignment below.","                scrollerWidth = scroller.get('clientWidth') - borderWidth;","","                // Assumes no table borders","                table.setStyle('width', scrollerWidth + 'px');","","                tableWidth = table.get('offsetWidth');","","                // Expand the scroll node width if the table can't fit.","                // Otherwise, reassign the scroller a pixel width that","                // accounts for the borders.","                scroller.setStyle('width',","                    (tableWidth + scrollbarWidth) + 'px');","            } else {","                // Allow the table to expand naturally","                table.setStyle('width', '');","                scroller.setStyle('width', '');","","                scroller.setStyle('width',","                    (table.get('offsetWidth') + scrollbarWidth) + 'px');","            }","        }","    },","","    /**","    Detaches the scroll event subscriptions used to maintain scroll position","    parity between the scrollable `<div>` wrapper around the data table and the","    virtual scrollbar for vertically scrolling tables.","","    @method _unbindScrollbar","    @protected","    @since 3.5.0","    **/","    _unbindScrollbar: function () {","        if (this._scrollbarEventHandle) {","            this._scrollbarEventHandle.detach();","        }","    },","","    /**","    Detaches the resize event subscription used to maintain column parity for","    vertically scrolling tables with percentage widths.","","    @method _unbindScrollResize","    @protected","    @since 3.5.0","    **/","    _unbindScrollResize: function () {","        if (this._scrollResizeHandle) {","            this._scrollResizeHandle.detach();","            delete this._scrollResizeHandle;","        }","    }","","    /**","    Indicates horizontal table scrolling is enabled.","","    @property _xScroll","    @type {Boolean}","    @default undefined (not initially set)","    @private","    @since 3.5.0","    **/","    //_xScroll: null,","","    /**","    Indicates vertical table scrolling is enabled.","","    @property _yScroll","    @type {Boolean}","    @default undefined (not initially set)","    @private","    @since 3.5.0","    **/","    //_yScroll: null,","","    /**","    Fixed column header `<table>` Node for vertical scrolling tables.","","    @property _yScrollHeader","    @type {Node}","    @default undefined (not initially set)","    @protected","    @since 3.5.0","    **/","    //_yScrollHeader: null,","","    /**","    Overflow Node used to contain the data rows in a vertically scrolling table.","","    @property _yScrollNode","    @type {Node}","    @default undefined (not initially set)","    @protected","    @since 3.5.0","    **/","    //_yScrollNode: null,","","    /**","    Overflow Node used to contain the table headers and data in a horizontally","    scrolling table.","","    @property _xScrollNode","    @type {Node}","    @default undefined (not initially set)","    @protected","    @since 3.5.0","    **/","    //_xScrollNode: null","}, true);","","Y.Base.mix(Y.DataTable, [Scrollable]);","","","}, '@VERSION@', {\"requires\": [\"datatable-base\", \"datatable-column-widths\", \"dom-screen\"], \"skinnable\": true});"];
_yuitest_coverage["build/datatable-scroll/datatable-scroll.js"].lines = {"1":0,"11":0,"19":0,"20":0,"54":0,"56":0,"79":0,"97":0,"99":0,"100":0,"101":0,"102":0,"103":0,"104":0,"105":0,"106":0,"109":0,"112":0,"113":0,"117":0,"205":0,"209":0,"210":0,"211":0,"213":0,"214":0,"215":0,"230":0,"232":0,"233":0,"234":0,"236":0,"237":0,"241":0,"254":0,"255":0,"270":0,"271":0,"272":0,"275":0,"289":0,"290":0,"307":0,"308":0,"321":0,"323":0,"324":0,"325":0,"327":0,"328":0,"345":0,"346":0,"359":0,"362":0,"363":0,"379":0,"382":0,"399":0,"411":0,"424":0,"425":0,"426":0,"440":0,"442":0,"443":0,"450":0,"453":0,"466":0,"467":0,"472":0,"475":0,"488":0,"489":0,"495":0,"508":0,"510":0,"511":0,"517":0,"530":0,"532":0,"533":0,"535":0,"541":0,"545":0,"557":0,"558":0,"559":0,"560":0,"562":0,"573":0,"584":0,"585":0,"586":0,"587":0,"598":0,"599":0,"600":0,"613":0,"615":0,"618":0,"620":0,"631":0,"632":0,"633":0,"636":0,"638":0,"651":0,"653":0,"654":0,"655":0,"657":0,"670":0,"672":0,"673":0,"674":0,"676":0,"689":0,"690":0,"692":0,"705":0,"707":0,"708":0,"709":0,"711":0,"723":0,"724":0,"726":0,"728":0,"729":0,"731":0,"747":0,"748":0,"751":0,"752":0,"755":0,"770":0,"774":0,"775":0,"788":0,"793":0,"794":0,"795":0,"798":0,"799":0,"800":0,"802":0,"803":0,"817":0,"822":0,"823":0,"825":0,"826":0,"828":0,"831":0,"832":0,"834":0,"835":0,"836":0,"839":0,"841":0,"842":0,"855":0,"857":0,"860":0,"862":0,"881":0,"883":0,"897":0,"903":0,"904":0,"909":0,"911":0,"912":0,"919":0,"925":0,"927":0,"930":0,"932":0,"946":0,"953":0,"956":0,"957":0,"958":0,"960":0,"963":0,"965":0,"968":0,"969":0,"972":0,"973":0,"974":0,"977":0,"980":0,"981":0,"982":0,"985":0,"989":0,"990":0,"992":0,"993":0,"1007":0,"1015":0,"1016":0,"1020":0,"1025":0,"1028":0,"1029":0,"1030":0,"1031":0,"1036":0,"1040":0,"1041":0,"1043":0,"1044":0,"1045":0,"1047":0,"1051":0,"1055":0,"1057":0,"1058":0,"1061":0,"1077":0,"1092":0,"1093":0,"1096":0,"1097":0,"1099":0,"1101":0,"1104":0,"1106":0,"1107":0,"1111":0,"1113":0,"1116":0,"1123":0,"1126":0,"1129":0,"1132":0,"1133":0,"1137":0,"1138":0,"1140":0,"1142":0,"1145":0,"1146":0,"1148":0,"1153":0,"1154":0,"1156":0,"1158":0,"1161":0,"1162":0,"1177":0,"1191":0,"1195":0,"1196":0,"1199":0,"1215":0,"1218":0,"1219":0,"1253":0,"1257":0,"1258":0,"1260":0,"1262":0,"1268":0,"1273":0,"1276":0,"1278":0,"1283":0,"1287":0,"1288":0,"1290":0,"1306":0,"1307":0,"1320":0,"1321":0,"1322":0,"1383":0};
_yuitest_coverage["build/datatable-scroll/datatable-scroll.js"].functions = {"styleDim:19":0,"scrollTo:96":0,"_addScrollbarPadding:204":0,"_afterScrollableChange:229":0,"_afterScrollCaptionChange:253":0,"_afterScrollColumnsChange:269":0,"_afterScrollDataChange:288":0,"_afterScrollHeightChange:306":0,"(anonymous 2):327":0,"_afterScrollSort:320":0,"_afterScrollWidthChange:344":0,"_bindScrollbar:358":0,"_bindScrollResize:378":0,"_bindScrollUI:398":0,"_clearScrollLock:423":0,"_createScrollbar:439":0,"_createScrollCaptionTable:465":0,"_createXScrollNode:487":0,"_createYScrollHeader:507":0,"_createYScrollNode:529":0,"_disableScrolling:556":0,"_disableXScrolling:572":0,"_disableYScrolling:583":0,"destructor:597":0,"initializer:612":0,"_removeScrollCaptionTable:630":0,"_removeXScrollNode:650":0,"_removeYScrollContainer:669":0,"_removeYScrollHeader:688":0,"_removeYScrollNode:704":0,"_removeScrollbar:722":0,"_setScrollable:746":0,"_setScrollProperties:769":0,"_syncScrollPosition:787":0,"_syncScrollCaptionUI:816":0,"(anonymous 3):861":0,"(anonymous 4):882":0,"_syncScrollColumnWidths:854":0,"(anonymous 5):911":0,"_syncScrollHeaders:896":0,"_syncScrollUI:945":0,"_syncXScrollUI:1006":0,"_syncYScrollUI:1076":0,"_uiSetScrollable:1176":0,"_uiSetScrollbarHeight:1190":0,"_uiSetScrollbarPosition:1214":0,"_uiSetYScrollWidth:1252":0,"_unbindScrollbar:1305":0,"_unbindScrollResize:1319":0,"(anonymous 1):1":0};
_yuitest_coverage["build/datatable-scroll/datatable-scroll.js"].coveredLines = 279;
_yuitest_coverage["build/datatable-scroll/datatable-scroll.js"].coveredFunctions = 50;
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1);
YUI.add('datatable-scroll', function (Y, NAME) {

/**
Adds the ability to make the table rows scrollable while preserving the header
placement.

@module datatable-scroll
@for DataTable
@since 3.5.0
**/
_yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "(anonymous 1)", 1);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 11);
var YLang = Y.Lang,
    isString = YLang.isString,
    isNumber = YLang.isNumber,
    isArray  = YLang.isArray,

    Scrollable;

// Returns the numeric value portion of the computed style, defaulting to 0
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 19);
function styleDim(node, style) {
    _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "styleDim", 19);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 20);
return parseInt(node.getComputedStyle(style), 10) || 0;
}

/**
_API docs for this extension are included in the DataTable class._

Adds the ability to make the table rows scrollable while preserving the header
placement.

There are two types of scrolling, horizontal (x) and vertical (y).  Horizontal
scrolling is achieved by wrapping the entire table in a scrollable container.
Vertical scrolling is achieved by splitting the table headers and data into two
separate tables, the latter of which is wrapped in a vertically scrolling
container.  In this case, column widths of header cells and data cells are kept
in sync programmatically.

Since the split table synchronization can be costly at runtime, the split is only
done if the data in the table stretches beyond the configured `height` value.

To activate or deactivate scrolling, set the `scrollable` attribute to one of
the following values:

 * `false` - (default) Scrolling is disabled.
 * `true` or 'xy' - If `height` is set, vertical scrolling will be activated, if
            `width` is set, horizontal scrolling will be activated.
 * 'x' - Activate horizontal scrolling only. Requires the `width` attribute is
         also set.
 * 'y' - Activate vertical scrolling only. Requires the `height` attribute is
         also set.

@class DataTable.Scrollable
@for DataTable
@since 3.5.0
**/
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 54);
Y.DataTable.Scrollable = Scrollable = function () {};

_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 56);
Scrollable.ATTRS = {
    /**
    Activates or deactivates scrolling in the table.  Acceptable values are:

     * `false` - (default) Scrolling is disabled.
     * `true` or 'xy' - If `height` is set, vertical scrolling will be
       activated, if `width` is set, horizontal scrolling will be activated.
     * 'x' - Activate horizontal scrolling only. Requires the `width` attribute
       is also set.
     * 'y' - Activate vertical scrolling only. Requires the `height` attribute
       is also set.

    @attribute scrollable
    @type {String|Boolean}
    @value false
    @since 3.5.0
    **/
    scrollable: {
        value: false,
        setter: '_setScrollable'
    }
};

_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 79);
Y.mix(Scrollable.prototype, {

    /**
    Scrolls a given row or cell into view if the table is scrolling.  Pass the
    `clientId` of a Model from the DataTable's `data` ModelList or its row
    index to scroll to a row or a [row index, column index] array to scroll to
    a cell.  Alternately, to scroll to any element contained within the table's
    scrolling areas, pass its ID, or the Node itself (though you could just as
    well call `node.scrollIntoView()` yourself, but hey, whatever).

    @method scrollTo
    @param {String|Number|Number[]|Node} id A row clientId, row index, cell
            coordinate array, id string, or Node
    @return {DataTable}
    @chainable
    @since 3.5.0
    **/
    scrollTo: function (id) {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "scrollTo", 96);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 97);
var target;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 99);
if (id && this._tbodyNode && (this._yScrollNode || this._xScrollNode)) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 100);
if (isArray(id)) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 101);
target = this.getCell(id);
            } else {_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 102);
if (isNumber(id)) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 103);
target = this.getRow(id);
            } else {_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 104);
if (isString(id)) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 105);
target = this._tbodyNode.one('#' + id);
            } else {_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 106);
if (id instanceof Y.Node &&
                    // TODO: ancestor(yScrollNode, xScrollNode)
                    id.ancestor('.yui3-datatable') === this.get('boundingBox')) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 109);
target = id;
            }}}}

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 112);
if(target) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 113);
target.scrollIntoView();
            }
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 117);
return this;
    },

    //--------------------------------------------------------------------------
    // Protected properties and methods
    //--------------------------------------------------------------------------

    /**
    Template for the `<table>` that is used to fix the caption in place when
    the table is horizontally scrolling.

    @property _CAPTION_TABLE_TEMPLATE
    @type {HTML}
    @value '<table class="{className}" role="presentation"></table>'
    @protected
    @since 3.5.0
    **/
    _CAPTION_TABLE_TEMPLATE: '<table class="{className}" role="presentation"></table>',

    /**
    Template used to create sizable element liners around header content to
    synchronize fixed header column widths.

    @property _SCROLL_LINER_TEMPLATE
    @type {HTML}
    @value '<div class="{className}"></div>'
    @protected
    @since 3.5.0
    **/
    _SCROLL_LINER_TEMPLATE: '<div class="{className}"></div>',

    /**
    Template for the virtual scrollbar needed in "y" and "xy" scrolling setups.

    @property _SCROLLBAR_TEMPLATE
    @type {HTML}
    @value '<div class="{className}"><div></div></div>'
    @protected
    @since 3.5.0
    **/
    _SCROLLBAR_TEMPLATE: '<div class="{className}"><div></div></div>',

    /**
    Template for the `<div>` that is used to contain the table when the table is
    horizontally scrolling.

    @property _X_SCROLLER_TEMPLATE
    @type {HTML}
    @value '<div class="{className}"></div>'
    @protected
    @since 3.5.0
    **/
    _X_SCROLLER_TEMPLATE: '<div class="{className}"></div>',

    /**
    Template for the `<table>` used to contain the fixed column headers for
    vertically scrolling tables.

    @property _Y_SCROLL_HEADER_TEMPLATE
    @type {HTML}
    @value '<table cellspacing="0" role="presentation" aria-hidden="true" class="{className}"></table>'
    @protected
    @since 3.5.0
    **/
    _Y_SCROLL_HEADER_TEMPLATE: '<table cellspacing="0" aria-hidden="true" class="{className}"></table>',

    /**
    Template for the `<div>` that is used to contain the rows when the table is
    vertically scrolling.

    @property _Y_SCROLLER_TEMPLATE
    @type {HTML}
    @value '<div class="{className}"><div class="{scrollerClassName}"></div></div>'
    @protected
    @since 3.5.0
    **/
    _Y_SCROLLER_TEMPLATE: '<div class="{className}"><div class="{scrollerClassName}"></div></div>',

    /**
    Adds padding to the last cells in the fixed header for vertically scrolling
    tables.  This padding is equal in width to the scrollbar, so can't be
    relegated to a stylesheet.

    @method _addScrollbarPadding
    @protected
    @since 3.5.0
    **/
    _addScrollbarPadding: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_addScrollbarPadding", 204);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 205);
var fixedHeader = this._yScrollHeader,
            headerClass = '.' + this.getClassName('header'),
            scrollbarWidth, rows, header, i, len;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 209);
if (fixedHeader) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 210);
scrollbarWidth = Y.DOM.getScrollbarWidth() + 'px';
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 211);
rows = fixedHeader.all('tr');

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 213);
for (i = 0, len = rows.size(); i < len; i += +header.get('rowSpan')) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 214);
header = rows.item(i).all(headerClass).pop();
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 215);
header.setStyle('paddingRight', scrollbarWidth);
            }
        }
    },

    /**
    Reacts to changes in the `scrollable` attribute by updating the `_xScroll`
    and `_yScroll` properties and syncing the scrolling structure accordingly.

    @method _afterScrollableChange
    @param {EventFacade} e The relevant change event (ignored)
    @protected
    @since 3.5.0
    **/
    _afterScrollableChange: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_afterScrollableChange", 229);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 230);
var scroller = this._xScrollNode;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 232);
if (this._xScroll && scroller) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 233);
if (this._yScroll && !this._yScrollNode) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 234);
scroller.setStyle('paddingRight',
                    Y.DOM.getScrollbarWidth() + 'px');
            } else {_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 236);
if (!this._yScroll && this._yScrollNode) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 237);
scroller.setStyle('paddingRight', '');
            }}
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 241);
this._syncScrollUI();
    },

    /**
    Reacts to changes in the `caption` attribute by adding, removing, or
    syncing the caption table when the table is set to scroll.

    @method _afterScrollCaptionChange
    @param {EventFacade} e The relevant change event (ignored)
    @protected
    @since 3.5.0
    **/
    _afterScrollCaptionChange: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_afterScrollCaptionChange", 253);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 254);
if (this._xScroll || this._yScroll) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 255);
this._syncScrollUI();
        }
    },

    /**
    Reacts to changes in the `columns` attribute of vertically scrolling tables
    by refreshing the fixed headers, scroll container, and virtual scrollbar
    position.

    @method _afterScrollColumnsChange
    @param {EventFacade} e The relevant change event (ignored)
    @protected
    @since 3.5.0
    **/
    _afterScrollColumnsChange: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_afterScrollColumnsChange", 269);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 270);
if (this._xScroll || this._yScroll) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 271);
if (this._yScroll && this._yScrollHeader) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 272);
this._syncScrollHeaders();
            }

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 275);
this._syncScrollUI();
        }
    },

    /**
    Reacts to changes in vertically scrolling table's `data` ModelList by
    synchronizing the fixed column header widths and virtual scrollbar height.

    @method _afterScrollDataChange
    @param {EventFacade} e The relevant change event (ignored)
    @protected
    @since 3.5.0
    **/
    _afterScrollDataChange: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_afterScrollDataChange", 288);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 289);
if (this._xScroll || this._yScroll) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 290);
this._syncScrollUI();
        }
    },

    /**
    Reacts to changes in the `height` attribute of vertically scrolling tables
    by updating the height of the `<div>` wrapping the data table and the
    virtual scrollbar.  If `scrollable` was set to "y" or "xy" but lacking a
    declared `height` until the received change, `_syncScrollUI` is called to
    create the fixed headers etc.

    @method _afterScrollHeightChange
    @param {EventFacade} e The relevant change event (ignored)
    @protected
    @since 3.5.0
    **/
    _afterScrollHeightChange: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_afterScrollHeightChange", 306);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 307);
if (this._yScroll) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 308);
this._syncScrollUI();
        }
    },

    /* (not an API doc comment on purpose)
    Reacts to the sort event (if the table is also sortable) by updating the
    fixed header classes to match the data table's headers.

    THIS IS A HACK that will be removed immediately after the 3.5.0 release.
    If you're reading this and the current version is greater than 3.5.0, I
    should be publicly scolded.
    */
    _afterScrollSort: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_afterScrollSort", 320);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 321);
var headers, headerClass;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 323);
if (this._yScroll && this._yScrollHeader) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 324);
headerClass = '.' + this.getClassName('header');
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 325);
headers = this._theadNode.all(headerClass);

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 327);
this._yScrollHeader.all(headerClass).each(function (header, i) {
                _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "(anonymous 2)", 327);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 328);
header.set('className', headers.item(i).get('className'));
            });
        }
    },

    /**
    Reacts to changes in the width of scrolling tables by expanding the width of
    the `<div>` wrapping the data table for horizontally scrolling tables or
    upding the position of the virtual scrollbar for vertically scrolling
    tables.

    @method _afterScrollWidthChange
    @param {EventFacade} e The relevant change event (ignored)
    @protected
    @since 3.5.0
    **/
    _afterScrollWidthChange: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_afterScrollWidthChange", 344);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 345);
if (this._xScroll || this._yScroll) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 346);
this._syncScrollUI();
        }
    },

    /**
    Binds virtual scrollbar interaction to the `_yScrollNode`'s `scrollTop` and
    vice versa.

    @method _bindScrollbar
    @protected
    @since 3.5.0
    **/
    _bindScrollbar: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_bindScrollbar", 358);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 359);
var scrollbar = this._scrollbarNode,
            scroller  = this._yScrollNode;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 362);
if (scrollbar && scroller && !this._scrollbarEventHandle) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 363);
this._scrollbarEventHandle = new Y.Event.Handle([
                scrollbar.on('scroll', this._syncScrollPosition, this),
                scroller.on('scroll', this._syncScrollPosition, this)
            ]);
        }
    },

    /**
    Binds to the window resize event to update the vertical scrolling table
    headers and wrapper `<div>` dimensions.

    @method _bindScrollResize
    @protected
    @since 3.5.0
    **/
    _bindScrollResize: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_bindScrollResize", 378);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 379);
if (!this._scrollResizeHandle) {
            // TODO: sync header widths and scrollbar position.  If the height
            // of the headers has changed, update the scrollbar dims as well.
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 382);
this._scrollResizeHandle = Y.on('resize',
                this._syncScrollUI, null, this);
        }
    },

    /**
    Attaches internal subscriptions to keep the scrolling structure up to date
    with changes in the table's `data`, `columns`, `caption`, or `height`.  The
    `width` is taken care of already.

    This executes after the table's native `bindUI` method.

    @method _bindScrollUI
    @protected
    @since 3.5.0
    **/
    _bindScrollUI: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_bindScrollUI", 398);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 399);
this.after({
            columnsChange: Y.bind('_afterScrollColumnsChange', this),
            heightChange : Y.bind('_afterScrollHeightChange', this),
            widthChange  : Y.bind('_afterScrollWidthChange', this),
            captionChange: Y.bind('_afterScrollCaptionChange', this),
            scrollableChange: Y.bind('_afterScrollableChange', this),
            // FIXME: this is a last minute hack to work around the fact that
            // DT doesn't use a tableView to render table content that can be
            // replaced with a scrolling table view.  This must be removed asap!
            sort         : Y.bind('_afterScrollSort', this)
        });

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 411);
this.after(['dataChange', '*:add', '*:remove', '*:reset', '*:change'],
            Y.bind('_afterScrollDataChange', this));
    },

    /**
    Clears the lock and timer used to manage synchronizing the scroll position
    between the vertical scroll container and the virtual scrollbar.

    @method _clearScrollLock
    @protected
    @since 3.5.0
    **/
    _clearScrollLock: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_clearScrollLock", 423);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 424);
if (this._scrollLock) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 425);
this._scrollLock.cancel();
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 426);
delete this._scrollLock;
        }
    },

    /**
    Creates a virtual scrollbar from the `_SCROLLBAR_TEMPLATE`, assigning it to
    the `_scrollbarNode` property.

    @method _createScrollbar
    @return {Node} The created Node
    @protected
    @since 3.5.0
    **/
    _createScrollbar: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_createScrollbar", 439);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 440);
var scrollbar = this._scrollbarNode;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 442);
if (!scrollbar) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 443);
scrollbar = this._scrollbarNode = Y.Node.create(
                Y.Lang.sub(this._SCROLLBAR_TEMPLATE, {
                    className: this.getClassName('scrollbar')
                }));

            // IE 6-10 require the scrolled area to be visible (at least 1px)
            // or they don't respond to clicking on the scrollbar rail or arrows
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 450);
scrollbar.setStyle('width', (Y.DOM.getScrollbarWidth() + 1) + 'px');
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 453);
return scrollbar;
    },

    /**
    Creates a separate table to contain the caption when the table is
    configured to scroll vertically or horizontally.

    @method _createScrollCaptionTable
    @return {Node} The created Node
    @protected
    @since 3.5.0
    **/
    _createScrollCaptionTable: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_createScrollCaptionTable", 465);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 466);
if (!this._captionTable) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 467);
this._captionTable = Y.Node.create(
                Y.Lang.sub(this._CAPTION_TABLE_TEMPLATE, {
                    className: this.getClassName('caption', 'table')
                }));

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 472);
this._captionTable.empty();
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 475);
return this._captionTable;
    },

    /**
    Populates the `_xScrollNode` property by creating the `<div>` Node described
    by the `_X_SCROLLER_TEMPLATE`.

    @method _createXScrollNode
    @return {Node} The created Node
    @protected
    @since 3.5.0
    **/
    _createXScrollNode: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_createXScrollNode", 487);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 488);
if (!this._xScrollNode) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 489);
this._xScrollNode = Y.Node.create(
                Y.Lang.sub(this._X_SCROLLER_TEMPLATE, {
                    className: this.getClassName('x','scroller')
                }));
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 495);
return this._xScrollNode;
    },

    /**
    Populates the `_yScrollHeader` property by creating the `<table>` Node
    described by the `_Y_SCROLL_HEADER_TEMPLATE`.

    @method _createYScrollHeader
    @return {Node} The created Node
    @protected
    @since 3.5.0
    **/
    _createYScrollHeader: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_createYScrollHeader", 507);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 508);
var fixedHeader = this._yScrollHeader;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 510);
if (!fixedHeader) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 511);
fixedHeader = this._yScrollHeader = Y.Node.create(
                Y.Lang.sub(this._Y_SCROLL_HEADER_TEMPLATE, {
                    className: this.getClassName('scroll','columns')
                }));
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 517);
return fixedHeader;
    },

    /**
    Populates the `_yScrollNode` property by creating the `<div>` Node described
    by the `_Y_SCROLLER_TEMPLATE`.

    @method _createYScrollNode
    @return {Node} The created Node
    @protected
    @since 3.5.0
    **/
    _createYScrollNode: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_createYScrollNode", 529);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 530);
var scrollerClass;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 532);
if (!this._yScrollNode) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 533);
scrollerClass = this.getClassName('y', 'scroller');

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 535);
this._yScrollContainer = Y.Node.create(
                Y.Lang.sub(this._Y_SCROLLER_TEMPLATE, {
                    className: this.getClassName('y','scroller','container'),
                    scrollerClassName: scrollerClass
                }));

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 541);
this._yScrollNode = this._yScrollContainer
                .one('.' + scrollerClass);
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 545);
return this._yScrollContainer;
    },

    /**
    Removes the nodes used to create horizontal and vertical scrolling and
    rejoins the caption to the main table if needed.

    @method _disableScrolling
    @protected
    @since 3.5.0
    **/
    _disableScrolling: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_disableScrolling", 556);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 557);
this._removeScrollCaptionTable();
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 558);
this._disableXScrolling();
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 559);
this._disableYScrolling();
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 560);
this._unbindScrollResize();

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 562);
this._uiSetWidth(this.get('width'));
    },

    /**
    Removes the nodes used to allow horizontal scrolling.

    @method _disableXScrolling
    @protected
    @since 3.5.0
    **/
    _disableXScrolling: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_disableXScrolling", 572);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 573);
this._removeXScrollNode();
    },

    /**
    Removes the nodes used to allow vertical scrolling.

    @method _disableYScrolling
    @protected
    @since 3.5.0
    **/
    _disableYScrolling: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_disableYScrolling", 583);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 584);
this._removeYScrollHeader();
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 585);
this._removeYScrollNode();
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 586);
this._removeYScrollContainer();
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 587);
this._removeScrollbar();
    },

    /**
    Cleans up external event subscriptions.

    @method destructor
    @protected
    @since 3.5.0
    **/
    destructor: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "destructor", 597);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 598);
this._unbindScrollbar();
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 599);
this._unbindScrollResize();
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 600);
this._clearScrollLock();
    },

    /**
    Sets up event handlers and AOP advice methods to bind the DataTable's natural
    behaviors with the scrolling APIs and state.

    @method initializer
    @param {Object} config The config object passed to the constructor (ignored)
    @protected
    @since 3.5.0
    **/
    initializer: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "initializer", 612);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 613);
this._setScrollProperties();

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 615);
this.after(['scrollableChange', 'heightChange', 'widthChange'],
            this._setScrollProperties);

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 618);
this.after('renderView', Y.bind('_syncScrollUI', this));

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 620);
Y.Do.after(this._bindScrollUI, this, 'bindUI');
    },

    /**
    Removes the table used to house the caption when the table is scrolling.

    @method _removeScrollCaptionTable
    @protected
    @since 3.5.0
    **/
    _removeScrollCaptionTable: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_removeScrollCaptionTable", 630);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 631);
if (this._captionTable) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 632);
if (this._captionNode) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 633);
this._tableNode.prepend(this._captionNode);
            }

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 636);
this._captionTable.remove().destroy(true);

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 638);
delete this._captionTable;
        }
    },

    /**
    Removes the `<div>` wrapper used to contain the data table when the table
    is horizontally scrolling.

    @method _removeXScrollNode
    @protected
    @since 3.5.0
    **/
    _removeXScrollNode: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_removeXScrollNode", 650);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 651);
var scroller = this._xScrollNode;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 653);
if (scroller) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 654);
scroller.replace(scroller.get('childNodes').toFrag());
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 655);
scroller.remove().destroy(true);

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 657);
delete this._xScrollNode;
        }
    },

    /**
    Removes the `<div>` wrapper used to contain the data table and fixed header
    when the table is vertically scrolling.

    @method _removeYScrollContainer
    @protected
    @since 3.5.0
    **/
    _removeYScrollContainer: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_removeYScrollContainer", 669);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 670);
var scroller = this._yScrollContainer;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 672);
if (scroller) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 673);
scroller.replace(scroller.get('childNodes').toFrag());
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 674);
scroller.remove().destroy(true);

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 676);
delete this._yScrollContainer;
        }
    },

    /**
    Removes the `<table>` used to contain the fixed column headers when the
    table is vertically scrolling.

    @method _removeYScrollHeader
    @protected
    @since 3.5.0
    **/
    _removeYScrollHeader: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_removeYScrollHeader", 688);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 689);
if (this._yScrollHeader) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 690);
this._yScrollHeader.remove().destroy(true);

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 692);
delete this._yScrollHeader;
        }
    },

    /**
    Removes the `<div>` wrapper used to contain the data table when the table
    is vertically scrolling.

    @method _removeYScrollNode
    @protected
    @since 3.5.0
    **/
    _removeYScrollNode: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_removeYScrollNode", 704);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 705);
var scroller = this._yScrollNode;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 707);
if (scroller) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 708);
scroller.replace(scroller.get('childNodes').toFrag());
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 709);
scroller.remove().destroy(true);

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 711);
delete this._yScrollNode;
        }
    },

    /**
    Removes the virtual scrollbar used by scrolling tables.

    @method _removeScrollbar
    @protected
    @since 3.5.0
    **/
    _removeScrollbar: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_removeScrollbar", 722);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 723);
if (this._scrollbarNode) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 724);
this._scrollbarNode.remove().destroy(true);

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 726);
delete this._scrollbarNode;
        }
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 728);
if (this._scrollbarEventHandle) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 729);
this._scrollbarEventHandle.detach();

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 731);
delete this._scrollbarEventHandle;
        }
    },

    /**
    Accepts (case insensitive) values "x", "y", "xy", `true`, and `false`.
    `true` is translated to "xy" and upper case values are converted to lower
    case.  All other values are invalid.

    @method _setScrollable
    @param {String|Boolea} val Incoming value for the `scrollable` attribute
    @return {String}
    @protected
    @since 3.5.0
    **/
    _setScrollable: function (val) {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_setScrollable", 746);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 747);
if (val === true) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 748);
val = 'xy';
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 751);
if (isString(val)) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 752);
val = val.toLowerCase();
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 755);
return (val === false || val === 'y' || val === 'x' || val === 'xy') ?
            val :
            Y.Attribute.INVALID_VALUE;
    },

    /**
    Assigns the `_xScroll` and `_yScroll` properties to true if an
    appropriate value is set in the `scrollable` attribute and the `height`
    and/or `width` is set.

    @method _setScrollProperties
    @protected
    @since 3.5.0
    **/
    _setScrollProperties: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_setScrollProperties", 769);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 770);
var scrollable = this.get('scrollable') || '',
            width      = this.get('width'),
            height     = this.get('height');

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 774);
this._xScroll = width  && scrollable.indexOf('x') > -1;
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 775);
this._yScroll = height && scrollable.indexOf('y') > -1;
    },

    /**
    Keeps the virtual scrollbar and the scrolling `<div>` wrapper around the
    data table in vertically scrolling tables in sync.

    @method _syncScrollPosition
    @param {DOMEventFacade} e The scroll event
    @protected
    @since 3.5.0
    **/
    _syncScrollPosition: function (e) {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_syncScrollPosition", 787);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 788);
var scrollbar = this._scrollbarNode,
            scroller  = this._yScrollNode,
            source    = e.currentTarget,
            other;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 793);
if (scrollbar && scroller) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 794);
if (this._scrollLock && this._scrollLock.source !== source) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 795);
return;
            }

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 798);
this._clearScrollLock();
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 799);
this._scrollLock = Y.later(300, this, this._clearScrollLock);
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 800);
this._scrollLock.source = source;

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 802);
other = (source === scrollbar) ? scroller : scrollbar;
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 803);
other.set('scrollTop', source.get('scrollTop'));
        }
    },

    /**
    Splits the caption from the data `<table>` if the table is configured to
    scroll.  If not, rejoins the caption to the data `<table>` if it needs to
    be.

    @method _syncScrollCaptionUI
    @protected
    @since 3.5.0
    **/
    _syncScrollCaptionUI: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_syncScrollCaptionUI", 816);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 817);
var caption      = this._captionNode,
            table        = this._tableNode,
            captionTable = this._captionTable,
            id;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 822);
if (caption) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 823);
id = caption.getAttribute('id');

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 825);
if (!captionTable) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 826);
captionTable = this._createScrollCaptionTable();

                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 828);
this.get('contentBox').prepend(captionTable);
            }

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 831);
if (!caption.get('parentNode').compareTo(captionTable)) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 832);
captionTable.empty().insert(caption);

                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 834);
if (!id) {
                    _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 835);
id = Y.stamp(caption);
                    _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 836);
caption.setAttribute('id', id);
                }

                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 839);
table.setAttribute('aria-describedby', id);
            }
        } else {_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 841);
if (captionTable) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 842);
this._removeScrollCaptionTable();
        }}
    },

    /**
    Assigns widths to the fixed header columns to match the columns in the data
    table.

    @method _syncScrollColumnWidths
    @protected
    @since 3.5.0
    **/
    _syncScrollColumnWidths: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_syncScrollColumnWidths", 854);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 855);
var widths = [];

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 857);
if (this._theadNode && this._yScrollHeader) {
            // Capture dims and assign widths in two passes to avoid reflows for
            // each access of clientWidth/getComputedStyle
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 860);
this._theadNode.all('.' + this.getClassName('header'))
                .each(function (header) {
                    _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "(anonymous 3)", 861);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 862);
widths.push(
                        // FIXME: IE returns the col.style.width from
                        // getComputedStyle even if the column has been
                        // compressed below that width, so it must use
                        // clientWidth. FF requires getComputedStyle because it
                        // uses fractional widths that round up to an overall
                        // cell/table width 1px greater than the data table's
                        // cell/table width, resulting in misaligned columns or
                        // fixed header bleed through. I can't think of a
                        // *reasonable* way to capture the correct width without
                        // a sniff.  Math.min(cW - p, getCS(w)) was imperfect
                        // and punished all browsers, anyway.
                        (Y.UA.ie && Y.UA.ie < 8) ?
                            (header.get('clientWidth') -
                             styleDim(header, 'paddingLeft') -
                             styleDim(header, 'paddingRight')) + 'px' :
                            header.getComputedStyle('width'));
            });

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 881);
this._yScrollHeader.all('.' + this.getClassName('scroll', 'liner'))
                .each(function (liner, i) {
                    _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "(anonymous 4)", 882);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 883);
liner.setStyle('width', widths[i]);
                });
        }
    },

    /**
    Creates matching headers in the fixed header table for vertically scrolling
    tables and synchronizes the column widths.

    @method _syncScrollHeaders
    @protected
    @since 3.5.0
    **/
    _syncScrollHeaders: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_syncScrollHeaders", 896);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 897);
var fixedHeader   = this._yScrollHeader,
            linerTemplate = this._SCROLL_LINER_TEMPLATE,
            linerClass    = this.getClassName('scroll', 'liner'),
            headerClass   = this.getClassName('header'),
            headers       = this._theadNode.all('.' + headerClass);

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 903);
if (this._theadNode && fixedHeader) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 904);
fixedHeader.empty().appendChild(
                this._theadNode.cloneNode(true));

            // Prevent duplicate IDs and assign ARIA attributes to hide
            // from screen readers
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 909);
fixedHeader.all('[id]').removeAttribute('id');

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 911);
fixedHeader.all('.' + headerClass).each(function (header, i) {
                _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "(anonymous 5)", 911);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 912);
var liner = Y.Node.create(Y.Lang.sub(linerTemplate, {
                            className: linerClass
                        })),
                    refHeader = headers.item(i);

                // Can't assign via skin css because sort (and potentially
                // others) might override the padding values.
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 919);
liner.setStyle('padding',
                    refHeader.getComputedStyle('paddingTop') + ' ' +
                    refHeader.getComputedStyle('paddingRight') + ' ' +
                    refHeader.getComputedStyle('paddingBottom') + ' ' +
                    refHeader.getComputedStyle('paddingLeft'));

                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 925);
liner.appendChild(header.get('childNodes').toFrag());

                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 927);
header.appendChild(liner);
            }, this);

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 930);
this._syncScrollColumnWidths();

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 932);
this._addScrollbarPadding();
        }
    },

    /**
    Wraps the table for X and Y scrolling, if necessary, if the `scrollable`
    attribute is set.  Synchronizes dimensions and DOM placement of all
    scrolling related nodes.

    @method _syncScrollUI
    @protected
    @since 3.5.0
    **/
    _syncScrollUI: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_syncScrollUI", 945);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 946);
var x = this._xScroll,
            y = this._yScroll,
            xScroller  = this._xScrollNode,
            yScroller  = this._yScrollNode,
            scrollLeft = xScroller && xScroller.get('scrollLeft'),
            scrollTop  = yScroller && yScroller.get('scrollTop');

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 953);
this._uiSetScrollable();

        // TODO: Probably should split this up into syncX, syncY, and syncXY
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 956);
if (x || y) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 957);
if ((this.get('width') || '').slice(-1) === '%') {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 958);
this._bindScrollResize();
            } else {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 960);
this._unbindScrollResize();
            }

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 963);
this._syncScrollCaptionUI();
        } else {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 965);
this._disableScrolling();
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 968);
if (this._yScrollHeader) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 969);
this._yScrollHeader.setStyle('display', 'none');
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 972);
if (x) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 973);
if (!y) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 974);
this._disableYScrolling();
            }

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 977);
this._syncXScrollUI(y);
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 980);
if (y) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 981);
if (!x) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 982);
this._disableXScrolling();
            }

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 985);
this._syncYScrollUI(x);
        }

        // Restore scroll position
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 989);
if (scrollLeft && this._xScrollNode) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 990);
this._xScrollNode.set('scrollLeft', scrollLeft);
        }
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 992);
if (scrollTop && this._yScrollNode) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 993);
this._yScrollNode.set('scrollTop', scrollTop);
        }
    },

    /**
    Wraps the table in a scrolling `<div>` of the configured width for "x"
    scrolling.

    @method _syncXScrollUI
    @param {Boolean} xy True if the table is configured with scrollable ="xy"
    @protected
    @since 3.5.0
    **/
    _syncXScrollUI: function (xy) {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_syncXScrollUI", 1006);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1007);
var scroller     = this._xScrollNode,
            yScroller    = this._yScrollContainer,
            table        = this._tableNode,
            width        = this.get('width'),
            bbWidth      = this.get('boundingBox').get('offsetWidth'),
            scrollbarWidth = Y.DOM.getScrollbarWidth(),
            borderWidth, tableWidth;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1015);
if (!scroller) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1016);
scroller = this._createXScrollNode();

            // Not using table.wrap() because IE went all crazy, wrapping the
            // table in the last td in the table itself.
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1020);
(yScroller || table).replace(scroller).appendTo(scroller);
        }

        // Can't use offsetHeight - clientHeight because IE6 returns
        // clientHeight of 0 intially.
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1025);
borderWidth = styleDim(scroller, 'borderLeftWidth') +
                      styleDim(scroller, 'borderRightWidth');

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1028);
scroller.setStyle('width', '');
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1029);
this._uiSetDim('width', '');
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1030);
if (xy && this._yScrollContainer) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1031);
this._yScrollContainer.setStyle('width', '');
        }

        // Lock the table's unconstrained width to avoid configured column
        // widths being ignored
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1036);
if (Y.UA.ie && Y.UA.ie < 8) {
            // Have to assign a style and trigger a reflow to allow the
            // subsequent clearing of width + reflow to expand the table to
            // natural width in IE 6
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1040);
table.setStyle('width', width);
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1041);
table.get('offsetWidth');
        }
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1043);
table.setStyle('width', '');
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1044);
tableWidth = table.get('offsetWidth');
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1045);
table.setStyle('width', tableWidth + 'px');

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1047);
this._uiSetDim('width', width);

        // Can't use 100% width because the borders add additional width
        // TODO: Cache the border widths, though it won't prevent a reflow
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1051);
scroller.setStyle('width', (bbWidth - borderWidth) + 'px');

        // expand the table to fill the assigned width if it doesn't
        // already overflow the configured width
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1055);
if ((scroller.get('offsetWidth') - borderWidth) > tableWidth) {
            // Assumes the wrapped table doesn't have borders
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1057);
if (xy) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1058);
table.setStyle('width', (scroller.get('offsetWidth') -
                     borderWidth - scrollbarWidth) + 'px');
            } else {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1061);
table.setStyle('width', '100%');
            }
        }
    },

    /**
    Wraps the table in a scrolling `<div>` of the configured height (accounting
    for the caption if there is one) if "y" scrolling is enabled.  Otherwise,
    unwraps the table if necessary.

    @method _syncYScrollUI
    @param {Boolean} xy True if the table is configured with scrollable = "xy"
    @protected
    @since 3.5.0
    **/
    _syncYScrollUI: function (xy) {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_syncYScrollUI", 1076);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1077);
var yScroller    = this._yScrollContainer,
            yScrollNode  = this._yScrollNode,
            xScroller    = this._xScrollNode,
            fixedHeader  = this._yScrollHeader,
            scrollbar    = this._scrollbarNode,
            table        = this._tableNode,
            thead        = this._theadNode,
            captionTable = this._captionTable,
            boundingBox  = this.get('boundingBox'),
            contentBox   = this.get('contentBox'),
            width        = this.get('width'),
            height       = boundingBox.get('offsetHeight'),
            scrollbarWidth = Y.DOM.getScrollbarWidth(),
            outerScroller;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1092);
if (captionTable && !xy) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1093);
captionTable.setStyle('width', width || '100%');
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1096);
if (!yScroller) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1097);
yScroller = this._createYScrollNode();

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1099);
yScrollNode = this._yScrollNode;

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1101);
table.replace(yScroller).appendTo(yScrollNode);
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1104);
outerScroller = xy ? xScroller : yScroller;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1106);
if (!xy) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1107);
table.setStyle('width', '');
        }

        // Set the scroller height
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1111);
if (xy) {
            // Account for the horizontal scrollbar in the overall height
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1113);
height -= scrollbarWidth;
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1116);
yScrollNode.setStyle('height',
            (height - outerScroller.get('offsetTop') -
            // because IE6 is returning clientHeight 0 initially
            styleDim(outerScroller, 'borderTopWidth') -
            styleDim(outerScroller, 'borderBottomWidth')) + 'px');

        // Set the scroller width
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1123);
if (xy) {
            // For xy scrolling tables, the table should expand freely within
            // the x scroller
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1126);
yScroller.setStyle('width',
                (table.get('offsetWidth') + scrollbarWidth) + 'px');
        } else {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1129);
this._uiSetYScrollWidth(width);
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1132);
if (captionTable && !xy) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1133);
captionTable.setStyle('width', yScroller.get('offsetWidth') + 'px');
        }

        // Allow headerless scrolling
        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1137);
if (thead && !fixedHeader) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1138);
fixedHeader = this._createYScrollHeader();

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1140);
yScroller.prepend(fixedHeader);

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1142);
this._syncScrollHeaders();
        }

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1145);
if (fixedHeader) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1146);
this._syncScrollColumnWidths();

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1148);
fixedHeader.setStyle('display', '');
            // This might need to come back if FF has issues
            //fixedHeader.setStyle('width', '100%');
                //(yScroller.get('clientWidth') + scrollbarWidth) + 'px');

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1153);
if (!scrollbar) {
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1154);
scrollbar = this._createScrollbar();

                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1156);
this._bindScrollbar();

                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1158);
contentBox.prepend(scrollbar);
            }

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1161);
this._uiSetScrollbarHeight();
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1162);
this._uiSetScrollbarPosition(outerScroller);
        }
    },

    /**
    Assigns the appropriate class to the `boundingBox` to identify the DataTable
    as horizontally scrolling, vertically scrolling, or both (adds both classes).

    Classes added are "yui3-datatable-scrollable-x" or "...-y"

    @method _uiSetScrollable
    @protected
    @since 3.5.0
    **/
    _uiSetScrollable: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_uiSetScrollable", 1176);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1177);
this.get('boundingBox')
            .toggleClass(this.getClassName('scrollable','x'), this._xScroll)
            .toggleClass(this.getClassName('scrollable','y'), this._yScroll);
    },

    /**
    Updates the virtual scrollbar's height to avoid overlapping with the fixed
    headers.

    @method _uiSetScrollbarHeight
    @protected
    @since 3.5.0
    **/
    _uiSetScrollbarHeight: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_uiSetScrollbarHeight", 1190);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1191);
var scrollbar   = this._scrollbarNode,
            scroller    = this._yScrollNode,
            fixedHeader = this._yScrollHeader;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1195);
if (scrollbar && scroller && fixedHeader) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1196);
scrollbar.get('firstChild').setStyle('height',
                this._tbodyNode.get('scrollHeight') + 'px');

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1199);
scrollbar.setStyle('height',
                (parseFloat(scroller.getComputedStyle('height')) -
                 parseFloat(fixedHeader.getComputedStyle('height'))) + 'px');
        }
    },

    /**
    Updates the virtual scrollbar's placement to avoid overlapping the fixed
    headers or the data table.

    @method _uiSetScrollbarPosition
    @param {Node} scroller Reference node to position the scrollbar over
    @protected
    @since 3.5.0
    **/
    _uiSetScrollbarPosition: function (scroller) {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_uiSetScrollbarPosition", 1214);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1215);
var scrollbar     = this._scrollbarNode,
            fixedHeader   = this._yScrollHeader;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1218);
if (scrollbar && scroller && fixedHeader) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1219);
scrollbar.setStyles({
                // Using getCS instead of offsetHeight because FF uses
                // fractional values, but reports ints to offsetHeight, so
                // offsetHeight is unreliable.  It is probably fine to use
                // offsetHeight in this case but this was left in place after
                // fixing an off-by-1px issue in FF 10- by fixing the caption
                // font style so FF picked it up.
                top: (parseFloat(fixedHeader.getComputedStyle('height')) +
                      styleDim(scroller, 'borderTopWidth') +
                      scroller.get('offsetTop')) + 'px',

                // Minus 1 because IE 6-10 require the scrolled area to be
                // visible by at least 1px or it won't respond to clicks on the
                // scrollbar rail or endcap arrows.
                left: (scroller.get('offsetWidth') -
                       Y.DOM.getScrollbarWidth() - 1 -
                       styleDim(scroller, 'borderRightWidth')) + 'px'
            });
        }
    },

    /**
    Assigns the width of the `<div>` wrapping the data table in vertically
    scrolling tables.

    If the table can't compress to the specified width, the container is
    expanded accordingly.

    @method _uiSetYScrollWidth
    @param {String} width The CSS width to attempt to set
    @protected
    @since 3.5.0
    **/
    _uiSetYScrollWidth: function (width) {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_uiSetYScrollWidth", 1252);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1253);
var scroller = this._yScrollContainer,
            table    = this._tableNode,
            tableWidth, borderWidth, scrollerWidth, scrollbarWidth;

        _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1257);
if (scroller && table) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1258);
scrollbarWidth = Y.DOM.getScrollbarWidth();

            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1260);
if (width) {
                // Assumes no table border
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1262);
borderWidth = scroller.get('offsetWidth') -
                              scroller.get('clientWidth') +
                              scrollbarWidth; // added back at the end

                // The table's rendered width might be greater than the
                // configured width
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1268);
scroller.setStyle('width', width);

                // Have to subtract the border width from the configured width
                // because the scroller's width will need to be reduced by the
                // border width as well during the width reassignment below.
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1273);
scrollerWidth = scroller.get('clientWidth') - borderWidth;

                // Assumes no table borders
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1276);
table.setStyle('width', scrollerWidth + 'px');

                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1278);
tableWidth = table.get('offsetWidth');

                // Expand the scroll node width if the table can't fit.
                // Otherwise, reassign the scroller a pixel width that
                // accounts for the borders.
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1283);
scroller.setStyle('width',
                    (tableWidth + scrollbarWidth) + 'px');
            } else {
                // Allow the table to expand naturally
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1287);
table.setStyle('width', '');
                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1288);
scroller.setStyle('width', '');

                _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1290);
scroller.setStyle('width',
                    (table.get('offsetWidth') + scrollbarWidth) + 'px');
            }
        }
    },

    /**
    Detaches the scroll event subscriptions used to maintain scroll position
    parity between the scrollable `<div>` wrapper around the data table and the
    virtual scrollbar for vertically scrolling tables.

    @method _unbindScrollbar
    @protected
    @since 3.5.0
    **/
    _unbindScrollbar: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_unbindScrollbar", 1305);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1306);
if (this._scrollbarEventHandle) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1307);
this._scrollbarEventHandle.detach();
        }
    },

    /**
    Detaches the resize event subscription used to maintain column parity for
    vertically scrolling tables with percentage widths.

    @method _unbindScrollResize
    @protected
    @since 3.5.0
    **/
    _unbindScrollResize: function () {
        _yuitest_coverfunc("build/datatable-scroll/datatable-scroll.js", "_unbindScrollResize", 1319);
_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1320);
if (this._scrollResizeHandle) {
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1321);
this._scrollResizeHandle.detach();
            _yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1322);
delete this._scrollResizeHandle;
        }
    }

    /**
    Indicates horizontal table scrolling is enabled.

    @property _xScroll
    @type {Boolean}
    @default undefined (not initially set)
    @private
    @since 3.5.0
    **/
    //_xScroll: null,

    /**
    Indicates vertical table scrolling is enabled.

    @property _yScroll
    @type {Boolean}
    @default undefined (not initially set)
    @private
    @since 3.5.0
    **/
    //_yScroll: null,

    /**
    Fixed column header `<table>` Node for vertical scrolling tables.

    @property _yScrollHeader
    @type {Node}
    @default undefined (not initially set)
    @protected
    @since 3.5.0
    **/
    //_yScrollHeader: null,

    /**
    Overflow Node used to contain the data rows in a vertically scrolling table.

    @property _yScrollNode
    @type {Node}
    @default undefined (not initially set)
    @protected
    @since 3.5.0
    **/
    //_yScrollNode: null,

    /**
    Overflow Node used to contain the table headers and data in a horizontally
    scrolling table.

    @property _xScrollNode
    @type {Node}
    @default undefined (not initially set)
    @protected
    @since 3.5.0
    **/
    //_xScrollNode: null
}, true);

_yuitest_coverline("build/datatable-scroll/datatable-scroll.js", 1383);
Y.Base.mix(Y.DataTable, [Scrollable]);


}, '@VERSION@', {"requires": ["datatable-base", "datatable-column-widths", "dom-screen"], "skinnable": true});
