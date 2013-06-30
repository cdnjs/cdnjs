/***********************************************
* koGrid JavaScript Library
* Authors: https://github.com/ericmbarnard/koGrid/blob/master/README.md
* License: MIT (http://www.opensource.org/licenses/mit-license.php)
* Compiled At: 01/11/2013 15:58:36
***********************************************/

(function (window) {
'use strict';

/***********************************************
* FILE: ..\src\namespace.js
***********************************************/
if (!window.kg) {
    window.kg = {};
}
window.kg.numberOfGrids = 0;
window.kg.eventStorage = {};

/***********************************************
* FILE: ..\src\constants.js
***********************************************/
var SELECTED_PROP = '__kg_selected__',
    GRID_KEY = '__koGrid__',
    // the # of rows we want to add to the top and bottom of the rendered grid rows 
    EXCESS_ROWS = 8,
    SCROLL_THRESHOLD = 6,
    ASC = "asc", // constant for sorting direction
    DESC = "desc", // constant for sorting direction
    KG_FIELD = '_kg_field_',
    KG_DEPTH = '_kg_depth_',
    KG_HIDDEN = '_kg_hidden_',
    KG_COLUMN = '_kg_column_',
    TEMPLATE_REGEXP = /<.+>/;

/***********************************************
* FILE: ..\src\navigation.js
***********************************************/
//set event binding on the grid so we can select using the up/down keys
window.kg.moveSelectionHandler = function(grid, evt) {
    // null checks 
    if (window.kg.utils.isNullOrUndefined(grid) || window.kg.utils.isNullOrUndefined(grid.config.selectedItems)) {
        return true;
    }
    var charCode = evt.which || evt.keyCode,
        // detect which direction for arrow keys to navigate the grid
        offset = (charCode === 38 ? -1 : (charCode === 40 ? 1 : null));
    if (!offset) {
        return true;
    }
    var items = grid.renderedRows(),
        index = items.indexOf(grid.selectionService.lastClickedRow) + offset;
    if (index < 0 || index >= items.length) {
        return true;
    }
grid.selectionService.ChangeSelection(items[index], evt);
    if (index > items.length - EXCESS_ROWS) {
        grid.$viewport.scrollTop(grid.$viewport.scrollTop() + (grid.config.rowHeight * EXCESS_ROWS));
    } else if (index < EXCESS_ROWS) {
        grid.$viewport.scrollTop(grid.$viewport.scrollTop() - (grid.config.rowHeight * EXCESS_ROWS));
    }
    return false;
}; 

/***********************************************
* FILE: ..\src\utils.js
***********************************************/
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) {
            from += len;
        }
        for (; from < len; from++) {
            if (from in this && this[from] === elt) {
                return from;
            }
        }
        return -1;
    };
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp */) {
        "use strict";
        var t = Object(this),
            len = t.length >>> 0;
        if (typeof fun !== "function") {
            throw new TypeError();
        }
        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, t)) {
                    res.push(val);
                }
            }
        }
        return res;
    };
}
window.kg.utils = {
    visualLength: function(node) {
        var elem = document.getElementById('testDataLength');
        if (!elem) {
            elem = document.createElement('SPAN');
            elem.id = "testDataLength";
            elem.style.visibility = "hidden";
            document.body.appendChild(elem);
        }
        $(elem).css('font', $(node).css('font'));
        elem.innerHTML = $(node).text();
        return elem.offsetWidth;
    },
    forIn: function(obj, action) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                action(obj[prop], prop);
            }
        }
    },
    evalProperty: function(entity, path) {
        var e = ko.utils.unwrapObservable(entity);
        var propPath = path.split('.'), i = 0;
        var tempProp = ko.utils.unwrapObservable(e[propPath[i]]), links = propPath.length;
        i++;
        while (tempProp && i < links) {
            tempProp = ko.utils.unwrapObservable(tempProp[propPath[i]]);
            i++;
        }
        return tempProp;
    },
    endsWith: function(str, suffix) {
        if (!str || !suffix || typeof str != "string") {
            return false;
        }
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    },
    isNullOrUndefined: function(obj) {
        if (obj === undefined || obj === null) {
            return true;
        }
        return false;
    },
    getElementsByClassName: function(cl) {
        var retnode = [];
        var myclass = new RegExp('\\b' + cl + '\\b');
        var elem = document.getElementsByTagName('*');
        for (var i = 0; i < elem.length; i++) {
            var classes = elem[i].className;
            if (myclass.test(classes)) {
                retnode.push(elem[i]);
            }
        }
        return retnode;
    },
    getTemplatePromise: function(path) {
        return $.ajax(path);
    },
    newId: (function() {
        var seedId = new Date().getTime();
        return function() {
            return seedId += 1;
        };
    })(),
    
    // we copy KO's ie detection here bc it isn't exported in the min versions of KO
    // Detect IE versions for workarounds (uses IE conditionals, not UA string, for robustness) 
    ieVersion: (function() {
        var version = 3, div = document.createElement('div'), iElems = div.getElementsByTagName('i');
        // Keep constructing conditional HTML blocks until we hit one that resolves to an empty fragment
        while (div.innerHTML = '<!--[if gt IE ' + (++version) + ']><i></i><![endif]-->',
        iElems[0]) ;
        return version > 4 ? version : undefined;
    })()
};

$.extend(window.kg.utils, {
    isIe6: (function() {
        return window.kg.utils.ieVersion === 6;
    })(),
    isIe7: (function() {
        return window.kg.utils.ieVersion === 7;
    })(),
    isIe: (function() {
        return window.kg.utils.ieVersion !== undefined;
    })()
});

/***********************************************
* FILE: ..\src\templates\gridTemplate.html
***********************************************/
window.kg.defaultGridTemplate = function(){ return '<div data-bind="css: {\'ui-widget\': jqueryUITheme, \'kgNoSelect\' : disableTextSelection}"><div class="kgTopPanel" data-bind="css: {\'ui-widget-header\':jqueryUITheme, \'ui-corner-top\': jqueryUITheme}, style: $data.topPanelStyle"><div class="kgGroupPanel" data-bind="visible: $data.showGroupPanel, style: headerStyle"><div class="kgGroupPanelDescription" data-bind="visible: configGroups().length == 0">Drag a column header here and drop it to group by that column</div><ul data-bind="visible: configGroups().length > 0, foreach: configGroups" class="kgGroupList"><li class="kgGroupItem"><span class="kgGroupElement"><div class="kgGroupName"><span data-bind="text: displayName"></span><span data-bind="click: function(data) { $root.removeGroup($index()) }" class="kgRemoveGroup">x</span></div><span data-bind="visible: $index() < ($root.configGroups().length - 1)" class="kgGroupArrow"></span></span></li></ul></div><div class="kgHeaderContainer" data-bind="style: headerStyle"><div class="kgHeaderScroller" data-bind="style: headerScrollerStyle, kgHeaderRow: $data" ></div></div><div class="kgHeaderButton" data-bind="visible: ($data.showColumnMenu || $data.showFilter), click: toggleShowMenu"><div class="kgHeaderButtonArrow"></div></div><div data-bind="visible: showMenu" class="kgColMenu"><div data-bind="visible: showFilter"><input placeholder="Seach Field:Value" type="text" data-bind="value: filterText, valueUpdate: \'afterkeydown\'"/></div><div data-bind="visible: showColumnMenu"><span class="kgMenuText">Choose Columns:</span><ul class="kgColList" data-bind="foreach: nonAggColumns"><li class="kgColListItem"><label style="position: relative;"><input type="checkbox" class="kgColListCheckbox" data-bind="checked: visible"/><span data-bind="text: displayName, click: toggleVisible"></span><a title="Group By" data-bind="attr: {\'class\': groupedByClass }, visible: (field != \'\u2714\'), click: $parent.groupBy"></a><span class="kgGroupingNumber" data-bind="visible: groupIndex() > 0, text: groupIndex"></span></label></li></ul></div></div></div><div class="kgViewport" data-bind="css: {\'ui-widget-content\': jqueryUITheme}, style: viewportStyle"><div class="kgCanvas" data-bind="style: canvasStyle"><div data-bind="foreach: renderedRows" style="position: absolute;"><div data-bind="style: { \'top\': offsetTop, \'height\': $parent.rowHeight + \'px\' }, click: toggleSelected, css: {\'selected\': selected, \'even\': isEven , \'odd\': isOdd, \'ui-state-default\': $parent.jqueryUITheme && isOdd, \'ui-state-active\':$parent.jqueryUITheme && isEven}, kgRow: $data" class="kgRow"></div></div></div></div><div class="kgFooterPanel" data-bind="css: {\'ui-widget-content\': jqueryUITheme, \'ui-corner-bottom\': jqueryUITheme}, style: footerStyle"><div class="kgTotalSelectContainer" data-bind="visible: footerVisible"><div class="kgFooterTotalItems" data-bind="css: {\'kgNoMultiSelect\': !multiSelect}" ><span class="kgLabel">Total Items: <span data-bind="text: maxRowsDisplay"></span></span><span data-bind="visible: filterText().length > 0" class="kgLabel">(Showing: <span data-bind="text: totalFilteredItemsLength"></span>)</span></div><div class="kgFooterSelectedItems" data-bind="visible: multiSelect"><span class="kgLabel">Selected Items: <span data-bind="text: selectedItemCount"></span></span></div></div><div class="kgPagerContainer" style="float: right; margin-top: 10px;" data-bind="visible: (footerVisible && enablePaging), css: {\'kgNoMultiSelect\': !multiSelect}"><div style="float:left; margin-right: 10px;" class="kgRowCountPicker"><span style="float: left; margin-top: 3px;" class="kgLabel">Page Size:</span><select style="float: left;height: 27px; width: 100px" data-bind="value: pagingOptions.pageSize, options: pagingOptions.pageSizes"></select></div><div style="float:left; margin-right: 10px; line-height:25px;" class="kgPagerControl" style="float: left; min-width: 135px;"><button class="kgPagerButton" data-bind="click: pageToFirst, disable: cantPageBackward()" title="First Page"><div class="kgPagerFirstTriangle"><div class="kgPagerFirstBar"></div></div></button><button class="kgPagerButton" data-bind="click: pageBackward, disable: cantPageBackward()" title="Previous Page"><div class="kgPagerFirstTriangle kgPagerPrevTriangle"></div></button><input class="kgPagerCurrent" type="number" style="width:50px; height: 24px; margin-top: 1px; padding: 0px 4px;" data-bind="value: pagingOptions.currentPage, valueUpdate: \'afterkeydown\'"/><button class="kgPagerButton" data-bind="click: pageForward, disable: cantPageForward()" title="Next Page"><div class="kgPagerLastTriangle kgPagerNextTriangle"></div></button><button class="kgPagerButton" data-bind="click: pageToLast, disable: cantPageForward()" title="Last Page"><div class="kgPagerLastTriangle"><div class="kgPagerLastBar"></div></div></button></div></div></div></div>';};

/***********************************************
* FILE: ..\src\templates\rowTemplate.html
***********************************************/
window.kg.defaultRowTemplate = function(){ return '<div data-bind="style: { cursor : canSelectRows ? \'pointer\' : \'default\' }, foreach: $grid.visibleColumns, css: { \'ui-widget-content\': $grid.jqueryUITheme }"><div data-bind="attr: { \'class\': cellClass() + \' kgCell col\' + $index() }, kgCell: $data"></div></div>';};

/***********************************************
* FILE: ..\src\templates\cellTemplate.html
***********************************************/
window.kg.defaultCellTemplate = function(){ return '<div data-bind="attr: { \'class\': \'kgCellText colt\' + $index()}, html: $data.getProperty($parent)"></div>';};

/***********************************************
* FILE: ..\src\templates\aggregateTemplate.html
***********************************************/
window.kg.aggregateTemplate = function(){ return '<div data-bind="click: toggleExpand, style: {\'left\': offsetLeft()}" class="kgAggregate"><span class="kgAggregateText" data-bind="html: $data.label">(<span data-bind="html: totalChildren"></span> Items)</span><div data-bind="attr: {\'class\' : aggClass }"></div></div>';};

/***********************************************
* FILE: ..\src\templates\headerRowTemplate.html
***********************************************/
window.kg.defaultHeaderRowTemplate = function(){ return '<div data-bind="foreach: visibleColumns"><div data-bind="kgHeaderCell: $data, attr: { \'class\': \'kgHeaderCell col\' + $index() }"></div></div>';};

/***********************************************
* FILE: ..\src\templates\headerCellTemplate.html
***********************************************/
window.kg.defaultHeaderCellTemplate = function(){ return '<div data-bind="style: { cursor : sortable() ? \'pointer\' : \'default\' }, click: sort, css: {\'kgSorted\': !noSortVisible }, attr: {\'class\': \'kgHeaderSortColumn \' + headerClass()}"><div data-bind="attr: { \'class\': \'colt\' + $index() + \' kgHeaderText\' }, html: displayName"></div><div class="kgSortButtonDown" data-bind="visible: showSortButtonDown"></div><div class="kgSortButtonUp" data-bind="visible: showSortButtonUp"></div><div data-bind="visible: resizable, click: gripClick, mouseEvents: { mouseDown: gripOnMouseDown }" class="kgHeaderGrip" ></div></div>';};

/***********************************************
* FILE: ..\src\bindingHandlers\ko-grid.js
***********************************************/
ko.bindingHandlers['koGrid'] = (function () {
    return {
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var options = valueAccessor();
            var elem = $(element);
            options.gridDim = new window.kg.Dimension({ outerHeight: ko.observable(elem.height()), outerWidth: ko.observable(elem.width()) });
            var grid = new window.kg.Grid(options);
            var gridElem = $(window.kg.defaultGridTemplate());
            // if it is a string we can watch for data changes. otherwise you won't be able to update the grid data
            options.data.subscribe(function () {
                if (grid.$$selectionPhase) {
                    return;
                }
                grid.searchProvider.evalFilter();
                grid.refreshDomSizes();
            });
            // if columndefs are observable watch for changes and rebuild columns.
            if (ko.isObservable(options.columnDefs)) {
                options.columnDefs.subscribe(function (newDefs) {
                    grid.columns([]);
                    grid.config.columnDefs = newDefs;
                    grid.buildColumns();
                    grid.configureColumnWidths();
                });
            }
            //set the right styling on the container
            elem.addClass("koGrid").addClass(grid.gridId.toString());
            elem.append(gridElem);
            grid.$userViewModel = bindingContext.$data;
            ko.applyBindings(grid, gridElem[0]);
            //walk the element's graph and the correct properties on the grid
            window.kg.domUtilityService.AssignGridContainers(elem, grid);
            grid.configureColumnWidths();
            grid.refreshDomSizes();
            //now use the manager to assign the event handlers
            grid.eventProvider = new window.kg.EventProvider(grid);
            //initialize plugins.
            $.each(grid.config.plugins, function (i, p) {
                if (typeof p.onGridInit === 'function') {
                    p.onGridInit(grid);
                }
            });
            window.kg.domUtilityService.BuildStyles(grid);
            return { controlsDescendantBindings: true };
        }
    };
}());

/***********************************************
* FILE: ..\src\bindingHandlers\kg-row.js
***********************************************/
ko.bindingHandlers['kgRow'] = (function () {
    return {
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var row = valueAccessor();
            var grid = row.$grid = bindingContext.$parent;
            var source;
            if (row.isAggRow) {
                source = window.kg.aggregateTemplate();
            } else {
                source = grid.rowTemplate;
            }
            var compile = function(html) {
                var rowElem = $(html);
                row.$userViewModel = bindingContext.$parent.$userViewModel;
                ko.applyBindings(row, rowElem[0]);
                $(element).html(rowElem);
            };
            if (source.then) {
                source.then(function (p) {
                    compile(p);
                });
            } else {
                compile(source);
            }
            return { controlsDescendantBindings: true };
        }
    };
}());

/***********************************************
* FILE: ..\src\bindingHandlers\kg-cell.js
***********************************************/
ko.bindingHandlers['kgCell'] = (function () {
    return {
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            bindingContext.$userViewModel = bindingContext.$parent.$userViewModel;
            var compile = function (html) {
                var cell = $(html);
                ko.applyBindings(bindingContext, cell[0]);
                $(element).html(cell);
            };
            if (viewModel.cellTemplate.then) {
                viewModel.cellTemplate.then(function(p) {
                    compile(p);
                });
            } else {
                compile(viewModel.cellTemplate);
            }
            return { controlsDescendantBindings: true };
        }
    };
}());

/***********************************************
* FILE: ..\src\bindingHandlers\kg-header-row.js
***********************************************/
ko.bindingHandlers['kgHeaderRow'] = (function () {
    return {
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            bindingContext.$userViewModel = bindingContext.$data.$userViewModel;
            var compile = function(html) {
                var headerRow = $(html);
                ko.applyBindings(bindingContext, headerRow[0]);
                $(element).html(headerRow);
            };
            if (viewModel.headerRowTemplate.then) {
                viewModel.headerRowTemplate.then(function (p) {
                    compile(p);
                });
            } else {
                compile(viewModel.headerRowTemplate);
            }
            return { controlsDescendantBindings: true };
        }
    };
}());

/***********************************************
* FILE: ..\src\bindingHandlers\kg-header-cell.js
***********************************************/
ko.bindingHandlers['kgHeaderCell'] = (function () {
    return {
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var newContext = bindingContext.extend({ $grid: bindingContext.$parent, $userViewModel: bindingContext.$parent.$userViewModel });
            var compile = function (html) {
                var headerCell = $(html);
                ko.applyBindings(newContext, headerCell[0]);
                $(element).html(headerCell);
            };
            if (viewModel.headerCellTemplate.then) {
                viewModel.headerCellTemplate.then(function (p) {
                    compile(p);
                });
            } else {
                compile(viewModel.headerCellTemplate);
            }
            return { controlsDescendantBindings: true };
        }
    };
}());

/***********************************************
* FILE: ..\src\bindingHandlers\kg-mouse-events.js
***********************************************/
ko.bindingHandlers['mouseEvents'] = (function () {
    return {
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var eFuncs = valueAccessor();
            if (eFuncs.mouseDown) {
                $(element).mousedown(eFuncs.mouseDown);
            }
        }
    };
}());

/***********************************************
* FILE: ..\src\classes\aggregate.js
***********************************************/
window.kg.Aggregate = function (aggEntity, rowFactory) {
    var self = this;
    self.index = 0;
    self.offsetTop = ko.observable(0);
    self.entity = aggEntity;
    self.label = ko.observable(aggEntity.gLabel);
    self.field = aggEntity.gField;
    self.depth = aggEntity.gDepth;
    self.parent = aggEntity.parent;
    self.children = aggEntity.children;
    self.aggChildren = aggEntity.aggChildren;
    self.aggIndex = aggEntity.aggIndex;
    self.collapsed = ko.observable(true);
    self.isAggRow = true;
    self.offsetLeft = ko.observable((aggEntity.gDepth * 25).toString() + 'px');
    self.aggLabelFilter = aggEntity.aggLabelFilter;
    self.toggleExpand = function() {
        var c = self.collapsed();
        self.collapsed(!c);
        self.notifyChildren();
    };
    self.setExpand = function (state) {
        self.collapsed(state);
        self.notifyChildren();
    };
    self.notifyChildren = function() {
        $.each(self.aggChildren, function (i, child) {
            child.entity[KG_HIDDEN] = self.collapsed();
            if (self.collapsed()) {
                var c = self.collapsed();
                child.setExpand(c);
            }
        });
        $.each(self.children, function (i, child) {
            child[KG_HIDDEN] = self.collapsed();
        });
        rowFactory.rowCache = [];
        var foundMyself = false;
        $.each(rowFactory.aggCache, function (i, agg) {
            if (foundMyself) {
                var offset = (30 * self.children.length);
                var c = self.collapsed();
                agg.offsetTop(c ? agg.offsetTop() - offset : agg.offsetTop() + offset);
            } else {
                if (i == self.aggIndex) {
                    foundMyself = true;
                }
            }
        });
        rowFactory.renderedChange();
    };
    self.aggClass = ko.computed(function() {
        return self.collapsed() ? "kgAggArrowCollapsed" : "kgAggArrowExpanded";
    });
    self.totalChildren = ko.computed(function() {
        if (self.aggChildren.length > 0) {
            var i = 0;
            var recurse = function (cur) {
                if (cur.aggChildren.length > 0) {
                    $.each(cur.aggChildren, function (x, a) {
                        recurse(a);
                    });
                } else {
                    i += cur.children.length;
                }
            };
            recurse(self);
            return i;
        } else {
            return self.children.length;
        }
    });
    self.selected = ko.observable(false);
    self.isEven = ko.observable(false);
    self.isOdd = ko.observable(false);
    self.toggleSelected = function () { return true; };
}; 

/***********************************************
* FILE: ..\src\classes\column.js
***********************************************/
window.kg.Column = function (config, grid) {
    var self = this,
        colDef = config.colDef,
		delay = 500,
        clicks = 0,
        timer = null;
    self.eventTaget = undefined;
    self.width = colDef.width;
	self.groupIndex = ko.observable(0);
	self.isGroupedBy = ko.observable(false);
	self.groupedByClass = ko.computed(function(){ return self.isGroupedBy() ? "kgGroupedByIcon": "kgGroupIcon";});
	self.sortable = ko.observable(false);
	self.resizable = ko.observable(false);
    self.minWidth = !colDef.minWidth ? 50 : colDef.minWidth;
    self.maxWidth = !colDef.maxWidth ? 9000 : colDef.maxWidth;
    self.headerRowHeight = config.headerRowHeight;
    self.displayName = ko.observable(colDef.displayName || colDef.field);
    self.index = config.index;
    self.isAggCol = config.isAggCol;
    self.cellClass = ko.observable(colDef.cellClass || "");
    self.cellFilter = colDef.cellFilter || colDef.cellFormatter;
    self.field = colDef.field;
    self.aggLabelFilter = colDef.cellFilter || colDef.cellFormatter || colDef.aggLabelFilter || colDef.aggLabelFormatter;
    self._visible = ko.observable(window.kg.utils.isNullOrUndefined(colDef.visible) || colDef.visible);
    self.visible = ko.computed({
        read: function() {
            return self._visible();
        },
        write: function(val) {
            self.toggleVisible(val);
        }
    });
    if (config.enableSort) {
        self.sortable(window.kg.utils.isNullOrUndefined(colDef.sortable) || colDef.sortable);
    }
    if (config.enableResize) {
        self.resizable(window.kg.utils.isNullOrUndefined(colDef.resizable) || colDef.resizable);
    }
    self.sortDirection = ko.observable(undefined);
    self.sortingAlgorithm = colDef.sortFn;
    self.headerClass = ko.observable(colDef.headerClass);
    self.headerCellTemplate = colDef.headerCellTemplate || window.kg.defaultHeaderCellTemplate();
    self.cellTemplate = colDef.cellTemplate || window.kg.defaultCellTemplate();
    if (colDef.cellTemplate && !TEMPLATE_REGEXP.test(colDef.cellTemplate)) {
        self.cellTemplate = window.kg.utils.getTemplatePromise(colDef.cellTemplate);
    }
    if (colDef.headerCellTemplate && !TEMPLATE_REGEXP.test(colDef.headerCellTemplate)) {
        self.headerCellTemplate = window.kg.utils.getTemplatePromise(colDef.headerCellTemplate);
    }
    self.getProperty = function (row) {
        var ret;
        if (self.cellFilter) {
            ret = self.cellFilter(row.getProperty(self.field));
        } else {
            ret = row.getProperty(self.field);
        }
        return ret;
    };
    self.toggleVisible = function (val) {
        var v;
        if (window.kg.utils.isNullOrUndefined(val) || typeof val == "object") {
            v = !self._visible();
        } else {
            v = val;
        }
        self._visible(v);
        window.kg.domUtilityService.BuildStyles(grid);
    };

    self.showSortButtonUp = ko.computed(function () {
        return self.sortable ? self.sortDirection() === DESC : self.sortable;
    });
    self.showSortButtonDown = ko.computed(function () {
        return self.sortable ? self.sortDirection() === ASC : self.sortable;
    });     
    self.noSortVisible = ko.computed(function () {
        return !self.sortDirection();
    });
    self.sort = function () {
        if (!self.sortable()) {
            return true; // column sorting is disabled, do nothing
        }
        var dir = self.sortDirection() === ASC ? DESC : ASC;
        self.sortDirection(dir);
        config.sortCallback(self, dir);
        return false;
    };   
    self.gripClick = function (data, event) {
        event.stopPropagation();
        clicks++;  //count clicks
        if (clicks === 1) {
            timer = setTimeout(function () {
                //Here you can add a single click action.
                clicks = 0;  //after action performed, reset counter
            }, delay);
        } else {
            clearTimeout(timer);  //prevent single-click action
            config.resizeOnDataCallback(self);  //perform double-click action
            clicks = 0;  //after action performed, reset counter
        }
    };
    self.gripOnMouseDown = function (event) {
        event.stopPropagation();
        if (event.ctrlKey) {
            self.toggleVisible();
            window.kg.domUtilityService.BuildStyles(grid);
            grid.config.columnsChanged(grid.columns.peek());
            return true;
        }
        self.eventTaget = event.target.parentElement;
        self.eventTaget.style.cursor = 'col-resize';
        self.startMousePosition = event.clientX;
        self.origWidth = self.width;
        $(document).mousemove(self.onMouseMove);
        $(document).mouseup(self.gripOnMouseUp);
        return false;
    };
    self.onMouseMove = function (event) {
        event.stopPropagation();
        var diff = event.clientX - self.startMousePosition;
        var newWidth = diff + self.origWidth;
        self.width = (newWidth < self.minWidth ? self.minWidth : (newWidth > self.maxWidth ? self.maxWidth : newWidth));
        window.kg.domUtilityService.BuildStyles(grid);
        return false;
    };
    self.gripOnMouseUp = function (event) {
        event.stopPropagation();
        $(document).off('mousemove');
        $(document).off('mouseup');
        self.eventTaget.style.cursor = self.sortable() ? 'pointer' : 'default';
        self.eventTaget = undefined;
        grid.config.columnsChanged(grid.columns.peek());
        return false;
    };
};

/***********************************************
* FILE: ..\src\classes\dimension.js
***********************************************/
window.kg.Dimension = function (options) {
    this.outerHeight = null;
    this.outerWidth = null;
    $.extend(this, options);
};

/***********************************************
* FILE: ..\src\classes\eventProvider.js
***********************************************/
window.kg.EventProvider = function (grid) {
    var self = this;
    // The init method gets called during the ng-grid directive execution.
    self.colToMove = undefined;
	self.groupToMove = undefined;
    self.assignEvents = function () {
        // Here we set the onmousedown event handler to the header container.
		if(grid.config.jqueryUIDraggable){
			grid.$groupPanel.droppable({
				addClasses: false,
				drop: function(event) {
					self.onGroupDrop(event);
				}
			});
			$(document).ready(self.setDraggables);	
		} else {
			grid.$groupPanel.on('mousedown', self.onGroupMouseDown).on('dragover', self.dragOver).on('drop', self.onGroupDrop);
			grid.$headerScroller.on('mousedown', self.onHeaderMouseDown).on('dragover', self.dragOver).on('drop', self.onHeaderDrop);
			if (grid.config.enableRowReordering) {
				grid.$viewport.on('mousedown', self.onRowMouseDown).on('dragover', self.dragOver).on('drop', self.onRowDrop);
			}
			self.setDraggables();
		}
        grid.columns.subscribe(self.setDraggables);
    };
    self.dragOver = function(evt) {
        evt.preventDefault();
    };	
	
	//For JQueryUI
	self.setDraggables = function(){
		if(!grid.config.jqueryUIDraggable){	
			grid.$root.find('.kgHeaderSortColumn').attr('draggable', 'true');
			if (navigator.userAgent.indexOf("MSIE") != -1)
			{
				//call native IE dragDrop() to start dragging
				grid.$root.find('.kgHeaderSortColumn').bind('selectstart', function () { this.dragDrop(); return false; });
			}
		} else {
			grid.$root.find('.kgHeaderSortColumn').draggable({
				helper: 'clone',
				appendTo: 'body',
				stack: 'div',
				addClasses: false,
				start: function(event){
					self.onHeaderMouseDown(event);
				}
			}).droppable({
				drop: function(event) {
					self.onHeaderDrop(event);
				}
			});
		}
	};

    self.onGroupMouseDown = function(event) {
        var groupItem = $(event.target);
        // Get the scope from the header container
		if(groupItem[0].className !='kgRemoveGroup'){
		    var groupItemScope = ko.dataFor(groupItem[0]);
			if (groupItemScope) {
				// set draggable events
				if(!grid.config.jqueryUIDraggable){
					groupItem.attr('draggable', 'true');
				}
				// Save the column for later.
				self.groupToMove = { header: groupItem, groupName: groupItemScope, index: groupItemScope.groupIndex() - 1 };
			}
		} else {
			self.groupToMove = undefined;
		}
    };

    self.onGroupDrop = function(event) {
        // clear out the colToMove object
        var groupContainer;
        var groupScope;
        if (self.groupToMove) {
            // Get the closest header to where we dropped
            groupContainer = $(event.target).closest('.kgGroupElement'); // Get the scope from the header.
            if (groupContainer.context.className =='kgGroupPanel') {
                grid.configGroups.splice(self.groupToMove.index, 1);
                grid.configGroups.push(self.groupToMove.groupName);
            } else {
                groupScope = ko.dataFor(groupContainer[0]);
                if (groupScope) {
                    // If we have the same column, do nothing.
                    if (self.groupToMove.index != groupScope.groupIndex()) {
						// Splice the columns
                        grid.configGroups.splice(self.groupToMove.index, 1);
                        grid.configGroups.splice(groupScope.groupIndex(), 0, self.groupToMove.groupName);
					}
                }
            }			
			self.groupToMove = undefined;
			grid.fixGroupIndexes();
        } else {
			if (grid.configGroups.indexOf(self.colToMove.col) == -1) {
                groupContainer = $(event.target).closest('.kgGroupElement'); // Get the scope from the header.
				if (groupContainer.context.className =='kgGroupPanel' || groupContainer.context.className =='kgGroupPanelDescription') {
				    grid.groupBy(self.colToMove.col);
				} else {
				    groupScope = ko.dataFor(groupContainer[0]);
				    if (groupScope) {
						// Splice the columns
				        grid.removeGroup(groupScope.groupIndex());
					}
				}	
            }			
			self.colToMove = undefined;
        }
    };
	
    //Header functions
    self.onHeaderMouseDown = function (event) {
        // Get the closest header container from where we clicked.
        var headerContainer = $(event.target).closest('.kgHeaderSortColumn');
        if (!headerContainer[0]) {
            return true;
        } 
        // Get the scope from the header container
        
        var headerScope = ko.dataFor(headerContainer[0]);
        if (headerScope) {
            // Save the column for later.
            self.colToMove = { header: headerContainer, col: headerScope };
        }
        return true;
    };

    self.onHeaderDrop = function (event) {
        if (!self.colToMove) {
            return true;
        } 
        // Get the closest header to where we dropped
        var headerContainer = $(event.target).closest('.kgHeaderSortColumn');
        if (!headerContainer[0]) {
            return true;
        }
        // Get the scope from the header.
        var headerScope = ko.dataFor(headerContainer[0]);
        if (headerScope) {
            // If we have the same column, do nothing.
            if (self.colToMove.col == headerScope) {
                return true;
            } 
            // Splice the columns
            var cols = grid.columns.peek();
            cols.splice(self.colToMove.col.index, 1);
            cols.splice(headerScope.index, 0, self.colToMove.col);
            grid.fixColumnIndexes();
            grid.columns(cols);
            // Finally, rebuild the CSS styles.
            window.kg.domUtilityService.BuildStyles(grid);
            // clear out the colToMove object
            self.colToMove = undefined;
        }
        return true;
    };
    
    // Row functions
    self.onRowMouseDown = function (event) {
        // Get the closest row element from where we clicked.
        var targetRow = $(event.target).closest('.kgRow');
        if (!targetRow[0]) {
            return;
        }
        // Get the scope from the row element
        var rowScope = ko.dataFor(targetRow[0]);
        if (rowScope) {
            // set draggable events
            targetRow.attr('draggable', 'true');
            // Save the row for later.
            window.kg.eventStorage.rowToMove = { targetRow: targetRow, scope: rowScope };
        }
    };

    self.onRowDrop = function (event) {
        // Get the closest row to where we dropped
        var targetRow = $(event.target).closest('.kgRow');
        // Get the scope from the row element.
        var rowScope = ko.dataFor(targetRow[0]);
        if (rowScope) {
            // If we have the same Row, do nothing.
            var prevRow = window.kg.eventStorage.rowToMove;
            if (prevRow.scope == rowScope) {
                return;
            } 
            // Splice the Rows via the actual datasource
            var sd = grid.sortedData();
            var i = sd.indexOf(prevRow.scope.entity);
            var j = sd.indexOf(rowScope.entity);
            grid.sortedData.splice(i, 1);
            grid.sortedData.splice(j, 0, prevRow.scope.entity);
            grid.searchProvider.evalFilter();
            // clear out the rowToMove object
            window.kg.eventStorage.rowToMove = undefined;
            // if there isn't an apply already in progress lets start one
        }
    };
    self.assignGridEventHandlers = function() {
        grid.$viewport.scroll(function(e) {
            var scrollLeft = e.target.scrollLeft,
                scrollTop = e.target.scrollTop;
            grid.adjustScrollLeft(scrollLeft);
            grid.adjustScrollTop(scrollTop);
        });
        grid.$viewport.off('keydown');
        grid.$viewport.on('keydown', function(e) {
            return window.kg.moveSelectionHandler(grid, e);
        });
        //Chrome and firefox both need a tab index so the grid can recieve focus.
        //need to give the grid a tabindex if it doesn't already have one so
        //we'll just give it a tab index of the corresponding gridcache index 
        //that way we'll get the same result every time it is run.
        //configurable within the options.
        if (grid.config.tabIndex === -1) {
            grid.$viewport.attr('tabIndex', window.kg.numberOfGrids);
            window.kg.numberOfGrids++;
        } else {
            grid.$viewport.attr('tabIndex', grid.config.tabIndex);
        }
        $(window).resize(function() {
            window.kg.domUtilityService.UpdateGridLayout(grid);
            if (grid.config.maintainColumnRatios) {
                grid.configureColumnWidths();
            }
        });
    };
    self.assignGridEventHandlers();
    // In this example we want to assign grid events.
    self.assignEvents();
};

/***********************************************
* FILE: ..\src\classes\rowFactory.js
***********************************************/
window.kg.RowFactory = function (grid) {
    var self = this;
    // we cache rows when they are built, and then blow the cache away when sorting
    self.rowCache = [];
    self.aggCache = {};
    self.parentCache = []; // Used for grouping and is cleared each time groups are calulated.
    self.dataChanged = true;
    self.parsedData = [];
    self.rowConfig = {};
    self.selectionService = grid.selectionService;
    self.rowHeight = 30;
    self.numberOfAggregates = 0;
    self.groupedData = undefined;
    self.rowHeight = grid.config.rowHeight;
    self.rowConfig = {
        canSelectRows: grid.config.canSelectRows,
        rowClasses: grid.config.rowClasses,
        selectedItems: grid.config.selectedItems,
        selectWithCheckboxOnly: grid.config.selectWithCheckboxOnly,
        beforeSelectionChangeCallback: grid.config.beforeSelectionChange,
        afterSelectionChangeCallback: grid.config.afterSelectionChange
    };

    self.renderedRange = new window.kg.Range(0, grid.minRowsToRender() + EXCESS_ROWS);
    // Builds rows for each data item in the 'filteredData'
    // @entity - the data item
    // @rowIndex - the index of the row
    self.buildEntityRow = function(entity, rowIndex) {
        var row = self.rowCache[rowIndex]; // first check to see if we've already built it
        if (!row) {
            // build the row
            row = new window.kg.Row(entity, self.rowConfig, self.selectionService);
            row.rowIndex(rowIndex + 1); //not a zero-based rowIndex
            row.offsetTop((self.rowHeight * rowIndex).toString() + 'px');
            row.selected(entity[SELECTED_PROP]);
            // finally cache it for the next round
            self.rowCache[rowIndex] = row;
        }
        return row;
    };

    self.buildAggregateRow = function(aggEntity, rowIndex) {
        var agg = self.aggCache[aggEntity.aggIndex]; // first check to see if we've already built it 
        if (!agg) {
            // build the row
            agg = new window.kg.Aggregate(aggEntity, self);
            self.aggCache[aggEntity.aggIndex] = agg;
        }
        agg.index = rowIndex + 1; //not a zero-based rowIndex
        agg.offsetTop((self.rowHeight * rowIndex).toString() + 'px');
        return agg;
    };
    self.UpdateViewableRange = function(newRange) {
        self.renderedRange = newRange;
        self.renderedChange();
    };
    self.filteredDataChanged = function() {
        // check for latebound autogenerated columns
        if (grid.lateBoundColumns && grid.filteredData().length > 1) {
            grid.config.columnDefs = undefined;
            grid.buildColumns();
            grid.lateBoundColumns = false;
        }
        self.dataChanged = true;
        self.rowCache = []; //if data source changes, kill this!
        if (grid.config.groups.length > 0) {
            self.getGrouping(grid.config.groups);
        }
        self.UpdateViewableRange(self.renderedRange);
    };

    self.renderedChange = function() {
        if (!self.groupedData || grid.config.groups.length < 1) {
            self.renderedChangeNoGroups();
            grid.refreshDomSizes();
            return;
        }
        self.parentCache = [];
        var rowArr = [];
        var dataArray = self.parsedData.filter(function(e) {
            return e[KG_HIDDEN] === false;
        }).slice(self.renderedRange.topRow, self.renderedRange.bottomRow);
        $.each(dataArray, function (indx, item) {
            var row;
            if (item.isAggRow) {
                row = self.buildAggregateRow(item, self.renderedRange.topRow + indx);
            } else {
                row = self.buildEntityRow(item, self.renderedRange.topRow + indx);
            }
            //add the row to our return array
            rowArr.push(row);
        });
        grid.setRenderedRows(rowArr);
        grid.refreshDomSizes();
    };

    self.renderedChangeNoGroups = function() {
        var rowArr = [];
        var dataArr = grid.filteredData.slice(self.renderedRange.topRow, self.renderedRange.bottomRow);
        $.each(dataArr, function (i, item) {
            var row = self.buildEntityRow(item, self.renderedRange.topRow + i);
            //add the row to our return array
            rowArr.push(row);
        });
        grid.setRenderedRows(rowArr);
    };

    //magical recursion. it works. I swear it. I figured it out in the shower one day.
    self.parseGroupData = function(g) {
        if (g.values) {
            $.each(g.values, function (i, item) {
                // get the last parent in the array because that's where our children want to be
                self.parentCache[self.parentCache.length - 1].children.push(item);
                //add the row to our return array
                self.parsedData.push(item);
            });
        } else {
            for (var prop in g) {
                // exclude the meta properties.
                if (prop == KG_FIELD || prop == KG_DEPTH || prop == KG_COLUMN) {
                    continue;
                } else if (g.hasOwnProperty(prop)) {
                    //build the aggregate row
                    var agg = self.buildAggregateRow({
                        gField: g[KG_FIELD],
                        gLabel: prop,
                        gDepth: g[KG_DEPTH],
                        isAggRow: true,
                        '_kg_hidden_': false,
                        children: [],
                        aggChildren: [],
                        aggIndex: self.numberOfAggregates,
                        aggLabelFilter: g[KG_COLUMN].aggLabelFilter
                    }, 0);
                    self.numberOfAggregates++;
                    //set the aggregate parent to the parent in the array that is one less deep.
                    agg.parent = self.parentCache[agg.depth - 1];
                    // if we have a parent, set the parent to not be collapsed and append the current agg to its children
                    if (agg.parent) {
                        agg.parent.collapsed(false);
                        agg.parent.aggChildren.push(agg);
                    }
                    // add the aggregate row to the parsed data.
                    self.parsedData.push(agg.entity);
                    // the current aggregate now the parent of the current depth
                    self.parentCache[agg.depth] = agg;
                    // dig deeper for more aggregates or children.
                    self.parseGroupData(g[prop]);
                }
            }
        }
    };
    //Shuffle the data into their respective groupings.
    self.getGrouping = function(groups) {
        self.aggCache = [];
        self.rowCache = [];
        self.numberOfAggregates = 0;
        self.groupedData = {};
        // Here we set the onmousedown event handler to the header container.
        var data = grid.filteredData();
        var maxDepth = groups.length;
        var cols = grid.columns();

        $.each(data, function (i, item) {
            item[KG_HIDDEN] = true;
            var ptr = self.groupedData;
            $.each(groups, function(depth, group) {
                if (!cols[depth].isAggCol && depth <= maxDepth) {
                    grid.columns.splice(item.gDepth, 0, new window.kg.Column({
                        colDef: {
                            field: '',
                            width: 25,
                            sortable: false,
                            resizable: false,
                            headerCellTemplate: '<div class="kgAggHeader"></div>'
                        },
                        isAggCol: true,
                        index: item.gDepth,
                        headerRowHeight: grid.config.headerRowHeight
                    }));
                    window.kg.domUtilityService.BuildStyles(grid);
                }
                var col = cols.filter(function (c) { return c.field == group; })[0];
                var val = window.kg.utils.evalProperty(item, group);
                if (col.cellFilter) {
                    val = col.cellFilter(val);
                } 
                val = val ? val.toString() : 'null';
                if (!ptr[val]) {
                    ptr[val] = {};
                }
                if (!ptr[KG_FIELD]) {
                    ptr[KG_FIELD] = group;
                }
                if (!ptr[KG_DEPTH]) {
                    ptr[KG_DEPTH] = depth;
                }
                if (!ptr[KG_COLUMN]) {
                    ptr[KG_COLUMN] = col;
                } 
                ptr = ptr[val];
            });
            if (!ptr.values) {
                ptr.values = [];
            }
            ptr.values.push(item);
        });
        grid.fixColumnIndexes();
        self.parsedData.length = 0;
        self.parseGroupData(self.groupedData);
    };

    if (grid.config.groups.length > 0 && grid.filteredData().length > 0) {
        self.getGrouping(grid.config.groups);
    }
};

/***********************************************
* FILE: ..\src\classes\grid.js
***********************************************/
window.kg.Grid = function (options) {
    var defaults = {
            rowHeight: 30,
            columnWidth: 100,
            headerRowHeight: 30,
            footerRowHeight: 55,
            footerVisible: true,			
            displayFooter: undefined,
            canSelectRows: true,
            selectAllState: ko.observable(false),
            data: ko.observableArray([]),
            columnDefs: undefined,
            selectedItems: ko.observableArray([]), // array, if multi turned off will have only one item in array
            displaySelectionCheckbox: true, //toggles whether row selection check boxes appear
            selectWithCheckboxOnly: false,
            useExternalSorting: false,
            sortInfo: ko.observable(undefined), // similar to filterInfo
            multiSelect: true,
            tabIndex: -1,
            enableColumnResize: true,
            enableSorting: true,
            maintainColumnRatios: undefined,
            beforeSelectionChange: function () { return true;},
            afterSelectionChange: function () { },
            columnsChanged: function() { },
            rowTemplate: undefined,
            headerRowTemplate: undefined,
            jqueryUITheme: false,
            jqueryUIDraggable: false,
            plugins: [],
            keepLastSelected: true,
            groups: [],
            showGroupPanel: false,
            enableRowReordering: false,
            showColumnMenu: true,
            showFilter: true,
            disableTextSelection: true,
            filterOptions: {
                filterText: ko.observable(""),
                useExternalFilter: false
            },
            //Paging 
            enablePaging: false,
            pagingOptions: {
                pageSizes: ko.observableArray([250, 500, 1000]), //page Sizes
                pageSize: ko.observable(250), //Size of Paging data
                totalServerItems: ko.observable(0), //how many items are on the server (for paging)
                currentPage: ko.observable(1) //what page they are currently on
            }
        },
        self = this;
    
    self.maxCanvasHt = ko.observable(0);
    //self vars
    self.config = $.extend(defaults, options);
    self.config.columnDefs = ko.utils.unwrapObservable(options.columnDefs);
    self.gridId = "ng" + window.kg.utils.newId();
    self.$root = null; //this is the root element that is passed in with the binding handler
	self.$groupPanel = null;
    self.$topPanel = null;
    self.$headerContainer = null;
    self.$headerScroller = null;
    self.$headers = null;
    self.$viewport = null;
    self.$canvas = null;
    self.rootDim = self.config.gridDim;
    self.sortInfo = ko.isObservable(self.config.sortInfo) ? self.config.sortInfo : ko.observable(self.config.sortInfo);
    self.sortedData = self.config.data;
    self.lateBindColumns = false;
    self.filteredData = ko.observableArray([]);
    self.lastSortedColumn = undefined;
    self.showFilter = self.config.showFilter;
    self.filterText = self.config.filterOptions.filterText;
    self.disableTextSelection = ko.observable(self.config.disableTextSelection);
    self.calcMaxCanvasHeight = function() {
        return (self.configGroups().length > 0) ? (self.rowFactory.parsedData.filter(function (e) {
            return e[KG_HIDDEN] === false;
        }).length * self.config.rowHeight) : (self.filteredData().length * self.config.rowHeight);
    };
    self.elementDims = {
        scrollW: 0,
        scrollH: 0,
        rowIndexCellW: 25,
        rowSelectedCellW: 25,
        rootMaxW: 0,
        rootMaxH: 0
    };
    //self funcs
    self.setRenderedRows = function (newRows) {
        self.renderedRows(newRows);
        self.refreshDomSizes();
    };
    self.minRowsToRender = function () {
        var viewportH = self.viewportDimHeight() || 1;
        return Math.floor(viewportH / self.config.rowHeight);
    };
    self.refreshDomSizes = function () {
        self.rootDim.outerWidth(self.elementDims.rootMaxW);
        self.rootDim.outerHeight(self.elementDims.rootMaxH);
        self.maxCanvasHt(self.calcMaxCanvasHeight());
    };
    self.buildColumnDefsFromData = function () {
        var sd = self.sortedData();
        if (!self.config.columnDefs) {
            self.config.columnDefs = [];
        }
        if (!sd || !sd[0]) {
            self.lateBoundColumns = true;
            return;
        }
        var item;
        item = sd[0];

        window.kg.utils.forIn(item, function (prop, propName) {
            if (propName != SELECTED_PROP) {
                self.config.columnDefs.push({
                    field: propName
                });
            }
        });
    };
    self.buildColumns = function () {
        var columnDefs = self.config.columnDefs,
            cols = [];

        if (!columnDefs) {
            self.buildColumnDefsFromData();
            columnDefs = self.config.columnDefs;
        }
        if (self.config.displaySelectionCheckbox && self.config.canSelectRows) {
            columnDefs.splice(0, 0, {
                field: '\u2714',
                width: self.elementDims.rowSelectedCellW,
                sortable: false,
                resizable: false,
                headerCellTemplate: '<input class="kgSelectionHeader" type="checkbox" data-bind="visible: $grid.multiSelect, checked: $grid.allSelected"/>',
                cellTemplate: '<div class="kgSelectionCell"><input class="kgSelectionCheckbox" type="checkbox" data-bind="checked: $parent.selected" /></div>'
            });
        }
        if (columnDefs.length > 0) {
            $.each(columnDefs, function (i, colDef) {
                var column = new window.kg.Column({
                    colDef: colDef, 
                    index: i, 
                    headerRowHeight: self.config.headerRowHeight,
                    sortCallback: self.sortData, 
                    resizeOnDataCallback: self.resizeOnData,
                    enableResize: self.config.enableColumnResize,
                    enableSort: self.config.enableSorting
                }, self);
                cols.push(column);
                var indx = self.config.groups.indexOf(colDef.field);
                if (indx != -1) {
                    self.configGroups.splice(indx, 0, column);
                }
            });
            self.columns(cols);
        }
    };
    self.configureColumnWidths = function() {
        var cols = self.config.columnDefs;
        var numOfCols = cols.length,
            asterisksArray = [],
            percentArray = [],
            asteriskNum = 0,
            totalWidth = 0;
        var columns = self.columns();
        $.each(cols, function (i, col) {
            var isPercent = false, t = undefined;
            //if width is not defined, set it to a single star
            if (window.kg.utils.isNullOrUndefined(col.width)) {
                col.width = "*";
            } else { // get column width
                isPercent = isNaN(col.width) ? window.kg.utils.endsWith(col.width, "%") : false;
                t = isPercent ? col.width : parseInt(col.width, 10);
            }
            // check if it is a number
            if (isNaN(t)) {
                t = col.width;
                // figure out if the width is defined or if we need to calculate it
                if (t == 'auto') { // set it for now until we have data and subscribe when it changes so we can set the width.
                    columns[i].width = columns[i].minWidth;
                    var temp = columns[i];
                    $(document).ready(function() { self.resizeOnData(temp, true); });
                    return;
                } else if (t.indexOf("*") != -1) {
                        asteriskNum += t.length;
                        col.index = i;
                        asterisksArray.push(col);
                        return;
                } else if (isPercent) { // If the width is a percentage, save it until the very last.
                    col.index = i;
                    percentArray.push(col);
                    return;
                } else { // we can't parse the width so lets throw an error.
                    throw "unable to parse column width, use percentage (\"10%\",\"20%\", etc...) or \"*\" to use remaining width of grid";
                }
            } else {
                totalWidth += columns[i].width = parseInt(col.width, 10);
            }
        });
        // check if we saved any asterisk columns for calculating later
        if (asterisksArray.length > 0) {
            self.config.maintainColumnRatios === false ? $.noop() : self.config.maintainColumnRatios = true;
            // get the remaining width
            var remainingWidth = self.rootDim.outerWidth() - totalWidth;
            // calculate the weight of each asterisk rounded down
            var asteriskVal = Math.floor(remainingWidth / asteriskNum);
            // set the width of each column based on the number of stars
            $.each(asterisksArray, function (i, col) {				
				var t = col.width.length;
                columns[col.index].width = asteriskVal * t;
                //check if we are on the last column
                if (col.index + 1 == numOfCols) {
                    var offset = 2; //We're going to remove 2 px so we won't overlflow the viwport by default
                    // are we overflowing?
                    if (self.maxCanvasHt() > self.viewportDimHeight()) {
                        //compensate for scrollbar
                        offset += window.kg.domUtilityService.ScrollW;
                    }
                    columns[col.index].width -= offset;
                }
                totalWidth += columns[col.index].width;
            });
        }
        // Now we check if we saved any percentage columns for calculating last
        if (percentArray.length > 0) {
            // do the math
            $.each(percentArray, function (i, col) {
                var t = col.width;
                columns[col.index].width = Math.floor(self.rootDim.outerWidth() * (parseInt(t.slice(0, -1), 10) / 100));
            });
        }
        self.columns(columns);
        window.kg.domUtilityService.BuildStyles(self);
    };
    self.init = function () {
        //factories and services
        self.selectionService = new window.kg.SelectionService(self);
        self.rowFactory = new window.kg.RowFactory(self);
        self.selectionService.Initialize(self.rowFactory);
        self.searchProvider = new window.kg.SearchProvider(self);
        self.styleProvider = new window.kg.StyleProvider(self);
        self.buildColumns();
        window.kg.sortService.columns = self.columns;
        self.configGroups.subscribe(function (a) {
            if (!a) {
                return;
            }
            var tempArr = [];
            $.each(a, function (i, item) {
				if(item){
					tempArr.push(item.field || item);
				}
            });
            self.config.groups = tempArr;
            self.rowFactory.filteredDataChanged();
        });
        self.filteredData.subscribe(function () {
            if (self.$$selectionPhase) {
                return;
            } 
			self.maxCanvasHt(self.calcMaxCanvasHeight());
			if (!self.isSorting) {
			    self.configureColumnWidths();
			} 
		});
        self.maxCanvasHt(self.calcMaxCanvasHeight());
        self.searchProvider.evalFilter();
        self.refreshDomSizes();
    };
    self.prevScrollTop = 0;
    self.prevScrollIndex = 0;
    self.adjustScrollTop = function (scrollTop, force) {
        if (self.prevScrollTop === scrollTop && !force) { return; }
        var rowIndex = Math.floor(scrollTop / self.config.rowHeight);
        // Have we hit the threshold going down?
        if (self.prevScrollTop < scrollTop && rowIndex < self.prevScrollIndex + SCROLL_THRESHOLD) {
            return;
        }
        //Have we hit the threshold going up?
        if (self.prevScrollTop > scrollTop && rowIndex > self.prevScrollIndex - SCROLL_THRESHOLD) {
            return;
        } 
        self.prevScrollTop = scrollTop;
        self.rowFactory.UpdateViewableRange(new window.kg.Range(Math.max(0, rowIndex - EXCESS_ROWS), rowIndex + self.minRowsToRender() + EXCESS_ROWS));
        self.prevScrollIndex = rowIndex;
    };
    self.adjustScrollLeft = function (scrollLeft) {
        if (self.$headerContainer) {
            self.$headerContainer.scrollLeft(scrollLeft);
        }
    };
    self.resizeOnData = function (col) {
        // we calculate the longest data.
        var longest = col.minWidth;
        var arr = window.kg.utils.getElementsByClassName('col' + col.index);
        $.each(arr, function (index, elem) {
            var i;
            if (index === 0) {
                var kgHeaderText = $(elem).find('.kgHeaderText');
                i = window.kg.utils.visualLength(kgHeaderText) + 10;// +10 some margin
            } else {
                var ngCellText = $(elem).find('.kgCellText');
                i = window.kg.utils.visualLength(ngCellText) + 10; // +10 some margin
            }
            if (i > longest) {
                longest = i;
            }
        });
        col.width = longest = Math.min(col.maxWidth, longest + 7); // + 7 px to make it look decent.
        window.kg.domUtilityService.BuildStyles(self);
    };
    self.sortData = function (col, direction) {
        // if external sorting is being used, do nothing.
        self.isSorting = true;
        self.sortInfo({
            column: col,
            direction: direction
        });
        self.clearSortingData(col);
        if(!self.config.useExternalSorting){
            window.kg.sortService.Sort(self.sortInfo.peek(), self.sortedData);
        } else {
            self.config.sortInfo(self.sortInfo.peek());
        }
        self.lastSortedColumn = col;
        self.isSorting = false;
    };
    self.clearSortingData = function (col) {
        if (!col) {
            $.each(self.columns(), function (i, c) {
                c.sortDirection("");
            });
        } else if (self.lastSortedColumn && col != self.lastSortedColumn) {
            self.lastSortedColumn.sortDirection("");
        }
    };
    self.fixColumnIndexes = function () {
        self.$$indexPhase = true;
        //fix column indexes
        var cols = self.columns.peek();
        $.each(cols, function (i, col) {
            col.index = i;
        });
        self.$$indexPhase = false;
    };
    //self vars
    self.elementsNeedMeasuring = true;
    self.columns = ko.observableArray([]);
    self.columns.subscribe(function(newCols) {
        self.config.columnsChanged(newCols);
    });
    self.renderedRows = ko.observableArray([]);
    self.headerRow = null;
    self.rowHeight = self.config.rowHeight;
	self.jqueryUITheme = ko.observable(self.config.jqueryUITheme);
    self.footer = null;
    self.selectedItems = self.config.selectedItems;
    self.multiSelect = self.config.multiSelect;
    self.footerVisible = window.kg.utils.isNullOrUndefined(self.config.displayFooter) ? self.config.footerVisible : self.config.displayFooter;
    self.config.footerRowHeight = self.footerVisible ? self.config.footerRowHeight : 0;
	self.showColumnMenu = self.config.showColumnMenu;
    self.showMenu = ko.observable(false);
    self.configGroups = ko.observableArray([]);

    //Paging
    self.enablePaging = self.config.enablePaging;
    self.pagingOptions = self.config.pagingOptions;
    //Templates
    self.rowTemplate = self.config.rowTemplate || window.kg.defaultRowTemplate();
    self.headerRowTemplate = self.config.headerRowTemplate || window.kg.defaultHeaderRowTemplate();
    if (self.config.rowTemplate && !TEMPLATE_REGEXP.test(self.config.rowTemplate)) {
        self.rowTemplate = window.kg.utils.getTemplatePromise(self.config.rowTemplate);
    }
    if (self.config.headerRowTemplate && !TEMPLATE_REGEXP.test(self.config.headerRowTemplate)) {
        self.headerRowTemplate = window.kg.utils.getTemplatePromise(self.config.headerRowTemplate);
    }
    //scope funcs
    self.visibleColumns = ko.computed(function () {
        var cols = self.columns();
        return cols.filter(function (col) {
            var isVis = col.visible();
            return isVis;
        });
    });
    self.nonAggColumns = ko.computed(function () {
        return self.columns().filter(function (col) {
            return !col.isAggCol;
        });
    });
    self.toggleShowMenu = function () {
        self.showMenu(!self.showMenu());
    };
    self.allSelected = self.config.selectAllState;
    self.allSelected.subscribe(function (state) {
        if (self.config.beforeSelectionChange(self.sortedData.peek(), this)) {
            self.selectionService.toggleSelectAll(state);
            self.config.afterSelectionChange(self.selectedItems.peek(), this);
        }
    });
    self.totalFilteredItemsLength = ko.computed(function () {
        return self.filteredData().length;
    });
	self.showGroupPanel = ko.computed(function(){
		return self.config.showGroupPanel;
	});
	self.topPanelHeight = ko.observable(self.config.showGroupPanel === true ? (self.config.headerRowHeight * 2) : self.config.headerRowHeight);
	self.viewportDimHeight = ko.computed(function () {
        return Math.max(0, self.rootDim.outerHeight() - self.topPanelHeight() - self.config.footerRowHeight - 2);
    });
	self.groupBy = function (col) {
	    if (self.sortedData().length < 1) {
	        return;
	    }
        var indx = self.configGroups().indexOf(col);
        if (indx == -1) {
			col.isGroupedBy(true);
            self.configGroups.push(col);
			col.groupIndex(self.configGroups().length);
        } else {
			self.removeGroup(indx);
        }
        window.kg.domUtilityService.BuildStyles(self);
    };
    self.removeGroup = function(index) {
		var col = self.columns().filter(function(item){ 
			return item.groupIndex() == (index + 1);
		})[0];
		col.isGroupedBy(false);
		col.groupIndex(0);
        self.columns.splice(index, 1);
        self.configGroups.splice(index, 1);
		self.fixGroupIndexes();
        if (self.configGroups().length === 0) {
            self.fixColumnIndexes();
        }
        window.kg.domUtilityService.BuildStyles(self);
    };
	self.fixGroupIndexes = function(){		
		$.each(self.configGroups(), function(i,item){
			item.groupIndex(i + 1);
		});
	};
    self.totalRowWidth = function () {
        var totalWidth = 0,
            cols = self.visibleColumns();
        $.each(cols, function (i, col) {
            totalWidth += col.width;
        });
        return totalWidth;
    };
    self.headerScrollerDim = function () {
        var viewportH = self.viewportDimHeight(),
            maxHeight = self.maxCanvasHt(),
            vScrollBarIsOpen = (maxHeight > viewportH),
            newDim = new window.kg.Dimension();

        newDim.autoFitHeight = true;
        newDim.outerWidth = self.totalRowWidth();
        if (vScrollBarIsOpen) { newDim.outerWidth += self.elementDims.scrollW; }
        else if ((maxHeight - viewportH) <= self.elementDims.scrollH) { //if the horizontal scroll is open it forces the viewport to be smaller
            newDim.outerWidth += self.elementDims.scrollW;
        }
        return newDim;
    };
    //footer
    self.jqueryUITheme = self.config.jqueryUITheme;
    self.maxRows = ko.observable(Math.max(self.config.pagingOptions.totalServerItems() || self.sortedData().length, 1));
    self.maxRowsDisplay = ko.computed(function () {
        return self.maxRows();
    });
    self.multiSelect = ko.observable((self.config.canSelectRows && self.config.multiSelect));
    self.selectedItemCount = ko.computed(function () {
        return self.selectedItems().length;
    });
    self.maxPages = ko.computed(function () {
        self.maxRows(Math.max(self.config.pagingOptions.totalServerItems() || self.sortedData().length, 1));
        return Math.ceil(self.maxRows() / self.pagingOptions.pageSize());
    });
    self.pageForward = function () {
        var page = self.config.pagingOptions.currentPage();
        self.config.pagingOptions.currentPage(Math.min(page + 1, self.maxPages()));
    };
    self.pageBackward = function () {
        var page = self.config.pagingOptions.currentPage();
        self.config.pagingOptions.currentPage(Math.max(page - 1, 1));
    };
    self.pageToFirst = function () {
        self.config.pagingOptions.currentPage(1);
    };
    self.pageToLast = function () {
        var maxPages = self.maxPages();
        self.config.pagingOptions.currentPage(maxPages);
    };
    self.cantPageForward = ko.computed(function () {
        var curPage = self.config.pagingOptions.currentPage();
        var maxPages = self.maxPages();
        return !(curPage < maxPages);
    });
    self.cantPageBackward = ko.computed(function () {
        var curPage = self.config.pagingOptions.currentPage();
        return !(curPage > 1);
    });
    //call init
    self.init();
};

/***********************************************
* FILE: ..\src\classes\range.js
***********************************************/
kg.Range = function (top, bottom) {
    this.topRow = top;
    this.bottomRow = bottom;
};

/***********************************************
* FILE: ..\src\classes\row.js
***********************************************/
window.kg.Row = function (entity, config, selectionService) {
    var self = this; // constant for the selection property that we add to each data item

    self.canSelectRows = config.canSelectRows;

    self.rowClasses = config.rowClasses;
    self.selectedItems = config.selectedItems;
    self.entity = entity;
    self.selectionService = selectionService;

    self.selected = ko.observable(false);
    self.continueSelection = function(event) {
        self.selectionService.ChangeSelection(self, event);
    };
    self.toggleSelected = function (row, event) {
        if (!self.canSelectRows) {
            return true;
        }
        var element = event.target || event;
        //check and make sure its not the bubbling up of our checked 'click' event 
        if (element.type == "checkbox") {
            self.selected(!self.selected());
        } 
        if (config.selectWithCheckboxOnly && element.type != "checkbox"){
            return true;
        } else {
            if (self.beforeSelectionChange(self, event)) {
                self.continueSelection(event);
                return self.afterSelectionChange(self, event);
            }
        }
        return false;
    };
    //selectify the entity
    if (self.entity[SELECTED_PROP] === undefined) {
        self.entity[SELECTED_PROP] = false;
    } else {
        // or else maintain the selection set by the entity.
        self.selectionService.setSelection(self, self.entity[SELECTED_PROP]);
    }
    self.rowIndex = ko.observable(0);
    self.offsetTop = ko.observable("0px");
    self.rowDisplayIndex = 0;
    self.isEven = ko.computed(function () {
        if (self.rowIndex() % 2 === 0) {
            return true;
        }
        return false;
    });
    self.isOdd = ko.computed(function () {
        if (self.rowIndex() % 2 !== 0) {
            return true;
        } 
        return false;
    });
    self.beforeSelectionChange = config.beforeSelectionChangeCallback;
    self.afterSelectionChange = config.afterSelectionChangeCallback;
    self.propertyCache = {};
    self.getProperty = function (path) {
        return self.propertyCache[path] || (self.propertyCache[path] = window.kg.utils.evalProperty(self.entity, path));
    };
}; 

/***********************************************
* FILE: ..\src\classes\searchProvider.js
***********************************************/
window.kg.SearchProvider = function (grid) {
    var self = this,
        searchConditions = [],
        lastSearchStr;
    self.extFilter = grid.config.filterOptions.useExternalFilter;
    self.showFilter = grid.config.showFilter;
    self.filterText = grid.config.filterOptions.filterText;
    self.throttle = grid.config.filterOptions.filterThrottle;
    self.fieldMap = {};
    self.evalFilter = function () {
        if (searchConditions.length === 0) {
            grid.filteredData(grid.sortedData.peek().filter(function(item) {
                return !item._destroy;
            }));
        } else {
            grid.filteredData(grid.sortedData.peek().filter(function(item) {
                if (item._destroy) {
                    return false;
                }

                for (var i = 0, len = searchConditions.length; i < len; i++) {
                    var condition = searchConditions[i];
                    //Search entire row
                    if (!condition.column) {
                        for (var prop in item) {
                            if (item.hasOwnProperty(prop)) {
                                var pVal = ko.utils.unwrapObservable(item[prop]);
                                if (pVal && condition.regex.test(pVal.toString())) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    }
                    //Search by column.
                    var field = ko.utils.unwrapObservable(item[condition.column]) || ko.utils.unwrapObservable(item[self.fieldMap[condition.columnDisplay]]);
                    if (!field || !condition.regex.test(field.toString())) {
                        return false;
                    }
                }
                return true;
            }));
        }
        grid.rowFactory.filteredDataChanged();
    };
    var getRegExp = function(str, modifiers) {
        try {
            return new RegExp(str, modifiers);
        } catch(err) {
            //Escape all RegExp metacharacters.
            return new RegExp(str.replace(/(\^|\$|\(|\)|\<|\>|\[|\]|\{|\}|\\|\||\.|\*|\+|\?)/g, '\\$1'));
        }
    };
    var buildSearchConditions = function (a) {
        //reset.
        searchConditions = [];
        var qStr;
        if (!(qStr = $.trim(a))) {
            return;
        }
        var columnFilters = qStr.split(";");
        $.each(columnFilters, function (i, filter) {
            var args = filter.split(':');
            if (args.length > 1) {
                var columnName = $.trim(args[0]);
                var columnValue = $.trim(args[1]);
                if (columnName && columnValue) {
                    searchConditions.push({
                        column: columnName,
                        columnDisplay: columnName.replace(/\s+/g, '').toLowerCase(),
                        regex: getRegExp(columnValue, 'i')
                    });
                }
            } else {
                var val = $.trim(args[0]);
                if (val) {
                    searchConditions.push({
                        column: '',
                        regex: getRegExp(val, 'i')
                    });
                }
            }
        });
    };

    var filterTextComputed = ko.computed(function () {
        var a = self.filterText();
        if (!self.extFilter && a != lastSearchStr) {
            //To prevent circular dependency when throttle is enabled.
            lastSearchStr = a;
            buildSearchConditions(a);
            self.evalFilter();
        }
    });
    if (typeof self.throttle === 'number') {
        filterTextComputed.extend({ throttle: self.throttle });
    }
    if (!self.extFilter) {
        grid.columns.subscribe(function (a) {
            $.each(a, function (i, col) {
                self.fieldMap[col.displayName().toLowerCase().replace(/\s+/g, '')] = col.field;
            });
        });
    }
};

/***********************************************
* FILE: ..\src\classes\selectionService.js
***********************************************/
window.kg.SelectionService = function (grid) {
    var self = this;
    self.multi = grid.config.multiSelect;
    self.selectedItems = grid.config.selectedItems;
    self.selectedIndex = grid.config.selectedIndex;
    self.lastClickedRow = undefined;
    self.ignoreSelectedItemChanges = false; // flag to prevent circular event loops keeping single-select var in sync

    self.rowFactory = {};
	self.Initialize = function (rowFactory) {
        self.rowFactory = rowFactory;
    };
		
	// function to manage the selection action of a data item (entity)
	self.ChangeSelection = function (rowItem, evt) {
	    grid.$$selectionPhase = true;
	    if (evt && evt.shiftKey && self.multi) {
	        if (self.lastClickedRow) {
	            var thisIndx = grid.filteredData.indexOf(rowItem.entity);
	            var prevIndx = grid.filteredData.indexOf(self.lastClickedRow.entity);
	            if (thisIndx == prevIndx) {
	                return false;
	            }
	            prevIndx++;
	            if (thisIndx < prevIndx) {
	                thisIndx = thisIndx ^ prevIndx;
	                prevIndx = thisIndx ^ prevIndx;
	                thisIndx = thisIndx ^ prevIndx;
	            }
	            var rows = [];
	            for (; prevIndx <= thisIndx; prevIndx++) {
	                rows.push(self.rowFactory.rowCache[prevIndx]);
	            }
	            if (rows[rows.length - 1].beforeSelectionChange(rows, evt)) {
	                $.each(rows, function(i, ri) {
	                    ri.selected(true);
	                    ri.entity[SELECTED_PROP] = true;
	                    if (self.selectedItems.indexOf(ri.entity) === -1) {
	                        self.selectedItems.push(ri.entity);
	                    }
	                });
	                rows[rows.length - 1].afterSelectionChange(rows, evt);
	            }
	            self.lastClickedRow = rows[rows.length - 1];
	            return true;
	        }
	    } else if (!self.multi) {
	        if (self.lastClickedRow && self.lastClickedRow != rowItem) {
	            self.setSelection(self.lastClickedRow, false);
	        }
	        self.setSelection(rowItem, grid.config.keepLastSelected ? true : !rowItem.selected());
	    } else {
	        self.setSelection(rowItem, !rowItem.selected());
	    }
	    self.lastClickedRow = rowItem;
	    grid.$$selectionPhase = false;
        return true;
    };

    // just call this func and hand it the rowItem you want to select (or de-select)    
    self.setSelection = function(rowItem, isSelected) {
        rowItem.selected(isSelected) ;
        rowItem.entity[SELECTED_PROP] = isSelected;
        if (!isSelected) {
            var indx = self.selectedItems.indexOf(rowItem.entity);
            self.selectedItems.splice(indx, 1);
        } else {
            if (self.selectedItems.indexOf(rowItem.entity) === -1) {
                self.selectedItems.push(rowItem.entity);
            }
        }
    };
    
    // @return - boolean indicating if all items are selected or not
    // @val - boolean indicating whether to select all/de-select all
    self.toggleSelectAll = function (checkAll) {
        var selectedlength = self.selectedItems().length;
        if (selectedlength > 0) {
            self.selectedItems.splice(0, selectedlength);
        }
        $.each(grid.filteredData(), function (i, item) {
            item[SELECTED_PROP] = checkAll;
            if (checkAll) {
                self.selectedItems.push(item);
            }
        });
        $.each(self.rowFactory.rowCache, function (i, row) {
            if (row && row.selected) {
                row.selected(checkAll);
            }
        });
    };
};

/***********************************************
* FILE: ..\src\classes\styleProvider.js
***********************************************/
window.kg.StyleProvider = function (grid) {
    grid.canvasStyle = ko.computed(function() {
        return { "height": grid.maxCanvasHt().toString() + "px" };
    });
    grid.headerScrollerStyle = ko.computed(function() {
        return { "height": grid.config.headerRowHeight + "px" };
    });
    grid.topPanelStyle = ko.computed(function() {
        return { "width": grid.rootDim.outerWidth() + "px", "height": grid.topPanelHeight() + "px" };
    });
    grid.headerStyle = ko.computed(function() {
        return { "width": Math.max(0, grid.rootDim.outerWidth() - window.kg.domUtilityService.ScrollW) + "px", "height": grid.config.headerRowHeight + "px" };
    });
    grid.viewportStyle = ko.computed(function() {
        return { "width": grid.rootDim.outerWidth() + "px", "height": grid.viewportDimHeight() + "px" };
    });
	grid.footerStyle = ko.computed(function () {
        return { "width": grid.rootDim.outerWidth() + "px", "height": grid.config.footerRowHeight + "px" };
    });
};

/***********************************************
* FILE: ..\src\classes\sortService.js
***********************************************/
window.kg.sortService = {
    colSortFnCache: {}, // cache of sorting functions. Once we create them, we don't want to keep re-doing it
    dateRE: /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/, // nasty regex for date parsing
    guessSortFn: function(item) {
        var sortFn, // sorting function that is guessed
            itemType, // the typeof item
            dateParts, // for date parsing
            month, // for date parsing
            day; // for date parsing

        if (item === undefined || item === null || item === '') {
            return null;
        } 
        itemType = typeof(item);
        //check for numbers and booleans
        switch (itemType) {
            case "number":
                sortFn = window.kg.sortService.sortNumber;
                break;
            case "boolean":
                sortFn = window.kg.sortService.sortBool;
                break;
            default:
                sortFn = undefined;
                break;
        }
        //if we found one, return it
        if (sortFn) {
            return sortFn;
        } 
        //check if the item is a valid Date
        if (Object.prototype.toString.call(item) === '[object Date]') {
            return window.kg.sortService.sortDate;
        } 
        // if we aren't left with a string, return a basic sorting function...
        if (itemType !== "string") {
            return window.kg.sortService.basicSort;
        } 
        // now lets string check..
        //check if the item data is a valid number
        if (item.match(/^-?[£$¤]?[\d,.]+%?$/)) {
            return window.kg.sortService.sortNumberStr;
        } 
        // check for a date: dd/mm/yyyy or dd/mm/yy
        // can have / or . or - as separator
        // can be mm/dd as well
        dateParts = item.match(window.kg.sortService.dateRE);
        if (dateParts) {
            // looks like a date
            month = parseInt(dateParts[1], 10);
            day = parseInt(dateParts[2], 10);
            if (month > 12) {
                // definitely dd/mm
                return window.kg.sortService.sortDDMMStr;
            } else if (day > 12) {
                return window.kg.sortService.sortMMDDStr;
            } else {
                // looks like a date, but we can't tell which, so assume that it's MM/DD
                return window.kg.sortService.sortMMDDStr;
            }
        }
        //finally just sort the normal string...
        return window.kg.sortService.sortAlpha;
    },
    basicSort: function(a, b) {
        if (a == b) {
            return 0;
        }
        if (a < b) {
            return -1;
        }
        return 1;
    },
    sortNumber: function(a, b) {
        return a - b;
    },
    sortNumberStr: function(a, b) {
        var numA,
            numB,
            badA = false,
            badB = false;
        numA = parseFloat(a.replace(/[^0-9.-]/g, ''));
        if (isNaN(numA)) {
            badA = true;
        }
        numB = parseFloat(b.replace(/[^0-9.-]/g, ''));
        if (isNaN(numB)) {
            badB = true;
        }
        // we want bad ones to get pushed to the bottom... which effectively is "greater than"
        if (badA && badB) {
            return 0;
        }
        if (badA) {
            return 1;
        }
        if (badB) {
            return -1;
        } 
        return numA - numB;
    },
    sortAlpha: function(a, b) {
        var strA = a.toLowerCase(),
            strB = b.toLowerCase();
        return strA == strB ? 0 : (strA < strB ? -1 : 1);
    },
    sortBool: function(a, b) {
        if (a && b) {
            return 0;
        }
        if (!a && !b) {
            return 0;
        } else {
            return a ? 1 : -1;
        }
    },
    sortDate: function(a, b) {
        var timeA = a.getTime(),
            timeB = b.getTime();
        return timeA == timeB ? 0 : (timeA < timeB ? -1 : 1);
    },
    sortDDMMStr: function(a, b) {
        var dateA, dateB, mtch, m, d, y;
        mtch = a.match(window.kg.sortService.dateRE);
        y = mtch[3];
        m = mtch[2];
        d = mtch[1];
        if (m.length == 1) {
            m = '0' + m;
        } 
        if (d.length == 1) {
            d = '0' + d;
        } 
        dateA = y + m + d;
        mtch = b.match(window.kg.sortService.dateRE);
        y = mtch[3];
        m = mtch[2];
        d = mtch[1];
        if (m.length == 1) {
            m = '0' + m;
        }
        if (d.length == 1) {
            d = '0' + d;
        }
        dateB = y + m + d;
        if (dateA == dateB) {
            return 0;
        }
        if (dateA < dateB) {
            return -1;
        }
        return 1;
    },
    sortMMDDStr: function(a, b) {
        var dateA, dateB, mtch, m, d, y;
        mtch = a.match(window.kg.sortService.dateRE);
        y = mtch[3];
        d = mtch[2];
        m = mtch[1];
        if (m.length == 1) {
            m = '0' + m;
        }
        if (d.length == 1) {
            d = '0' + d;
        }
        dateA = y + m + d;
        mtch = b.match(dateRE);
        y = mtch[3];
        d = mtch[2];
        m = mtch[1];
        if (m.length == 1) {
            m = '0' + m;
        }
        if (d.length == 1) {
            d = '0' + d;
        } 
        dateB = y + m + d;
        if (dateA == dateB) {
            return 0;
        } 
        if (dateA < dateB) {
            return -1;
        }
        return 1;
    },
    sortData: function (data /*datasource*/, sortInfo) {
        var unwrappedData = data();
        // first make sure we are even supposed to do work
        if (!unwrappedData || !sortInfo) {
            return;
        }
        // grab the metadata for the rest of the logic
        var col = sortInfo.column,
            direction = sortInfo.direction,
            sortFn,
            item;
        //see if we already figured out what to use to sort the column
        if (window.kg.sortService.colSortFnCache[col.field]) {
            sortFn = window.kg.sortService.colSortFnCache[col.field];
        } else if (col.sortingAlgorithm != undefined) {
            sortFn = col.sortingAlgorithm;
            window.kg.sortService.colSortFnCache[col.field] = col.sortingAlgorithm;
        } else { // try and guess what sort function to use
            item = unwrappedData[0];
            if (!item) {
                return;
            }
            sortFn = kg.sortService.guessSortFn(item[col.field]);
            //cache it
            if (sortFn) {
                window.kg.sortService.colSortFnCache[col.field] = sortFn;
            } else {
                // we assign the alpha sort because anything that is null/undefined will never get passed to
                // the actual sorting function. It will get caught in our null check and returned to be sorted
                // down to the bottom
                sortFn = window.kg.sortService.sortAlpha;
            }
        }
        //now actually sort the data
        unwrappedData.sort(function (itemA, itemB) {
            var propA = window.kg.utils.evalProperty(itemA, col.field);
            var propB = window.kg.utils.evalProperty(itemB, col.field);
            // we want to force nulls and such to the bottom when we sort... which effectively is "greater than"
            if (!propB && !propA) {
                return 0;
            } else if (!propA) {
                return 1;
            } else if (!propB) {
                return -1;
            }
            //made it this far, we don't have to worry about null & undefined
            if (direction === ASC) {
                return sortFn(propA, propB);
            } else {
                return 0 - sortFn(propA, propB);
            }
        });
        data(unwrappedData);
        return;
    },
    Sort: function (sortInfo, data) {
        if (window.kg.sortService.isSorting) {
            return;
        }
        window.kg.sortService.isSorting = true;
        window.kg.sortService.sortData(data, sortInfo);
        window.kg.sortService.isSorting = false;
    }
};

/***********************************************
* FILE: ..\src\classes\domUtilityService.js
***********************************************/
var getWidths = function () {
    var $testContainer = $('<div></div>');
    $testContainer.appendTo('body');
    // 1. Run all the following measurements on startup!
    //measure Scroll Bars
    $testContainer.height(100).width(100).css("position", "absolute").css("overflow", "scroll");
    $testContainer.append('<div style="height: 400px; width: 400px;"></div>');
    window.kg.domUtilityService.ScrollH = ($testContainer.height() - $testContainer[0].clientHeight);
    window.kg.domUtilityService.ScrollW = ($testContainer.width() - $testContainer[0].clientWidth);
    $testContainer.empty();
    //clear styles
    $testContainer.attr('style', '');
    //measure letter sizes using a pretty typical font size and fat font-family
    $testContainer.append('<span style="font-family: Verdana, Helvetica, Sans-Serif; font-size: 14px;"><strong>M</strong></span>');
    window.kg.domUtilityService.LetterW = $testContainer.children().first().width();
    $testContainer.remove();
};
window.kg.domUtilityService = {
    AssignGridContainers: function (rootEl, grid) {
        grid.$root = $(rootEl);
        //Headers
        grid.$topPanel = grid.$root.find(".kgTopPanel");
        grid.$groupPanel = grid.$root.find(".kgGroupPanel");
        grid.$headerContainer = grid.$topPanel.find(".kgHeaderContainer");
        grid.$headerScroller = grid.$topPanel.find(".kgHeaderScroller");
        grid.$headers = grid.$headerScroller.children();
        //Viewport
        grid.$viewport = grid.$root.find(".kgViewport");
        //Canvas
        grid.$canvas = grid.$viewport.find(".kgCanvas");
        //Footers
        grid.$footerPanel = grid.$root.find(".ngFooterPanel");
        window.kg.domUtilityService.UpdateGridLayout(grid);
    },
    UpdateGridLayout: function(grid) {
        //catch this so we can return the viewer to their original scroll after the resize!
        var scrollTop = grid.$viewport.scrollTop();
        grid.elementDims.rootMaxW = grid.$root.width();
        grid.elementDims.rootMaxH = grid.$root.height();
        //check to see if anything has changed
        grid.refreshDomSizes();
        grid.adjustScrollTop(scrollTop, true); //ensure that the user stays scrolled where they were
    },
    BuildStyles: function(grid) {
        var rowHeight = grid.config.rowHeight,
            $style = grid.$styleSheet,
            gridId = grid.gridId,
            css,
            cols = grid.visibleColumns(),
            sumWidth = 0;
        
        if (!$style) {
            $style = $('#' + gridId);
            if (!$style[0]) {
                $style = $("<style id='" + gridId + "' type='text/css' rel='stylesheet' />");
                $style.appendTo('body');
            }
        }
        $style.empty();
        var trw = grid.totalRowWidth();
        css = "." + gridId + " .kgCanvas { width: " + trw + "px; }"+
              "." + gridId + " .kgRow { width: " + trw + "px; }" +
              "." + gridId + " .kgCell { height: " + rowHeight + "px; }"+
              "." + gridId + " .kgCanvas { width: " + trw + "px; }" +
              "." + gridId + " .kgHeaderCell { top: 0; bottom: 0; }" + 
              "." + gridId + " .kgHeaderScroller { width: " + (trw + window.kg.domUtilityService.scrollH + 2) + "px}";
        $.each(cols, function (i, col) {
            css += "." + gridId + " .col" + i + " { width: " + col.width + "px; left: " + sumWidth + "px; right: " + (trw - sumWidth - col.width) + "px; height: " + rowHeight + "px }" +
                   "." + gridId + " .colt" + i + " { width: " + col.width + "px; }";
            sumWidth += col.width;
        });
        if (window.kg.utils.isIe) { // IE
            $style[0].styleSheet.cssText = css;
        } else {
            $style.append(document.createTextNode(css));
        }
        grid.$styleSheet = $style;
    },
    ScrollH: 17, // default in IE, Chrome, & most browsers
    ScrollW: 17, // default in IE, Chrome, & most browsers
    LetterW: 10
};
getWidths();
}(window));
