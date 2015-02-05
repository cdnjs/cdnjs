/*! AUI Flat Pack - version 5.2-m6 - generated 2013-05-29 03:12:37 -0400 */


(function(e){function d(h,g){return(typeof h=="function")?(h.call(g)):h}function f(g){while(g=g.parentNode){if(g==document){return true}}return false}var a=0;function b(){var g=a++;return"tipsyuid"+g}function c(h,g){this.$element=e(h);this.options=g;this.enabled=true;this.fixTitle()}c.prototype={show:function(){var p=this.getTitle();if(p&&this.enabled){var i=this.tip();i.find(".tipsy-inner")[this.options.html?"html":"text"](p);i[0].className="tipsy";i.remove().css({top:0,left:0,visibility:"hidden",display:"block"}).prependTo(document.body);var l=this;function h(){l.hoverTooltip=true}function m(){if(l.hoverState=="in"){return}l.hoverTooltip=false;if(l.options.trigger!="manual"){var r=l.options.trigger=="hover"?"mouseleave.tipsy":"blur.tipsy";l.$element.trigger(r)}}if(this.options.hoverable){i.hover(h,m)}var n=e.extend({},this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight});var g=i[0].offsetWidth,k=i[0].offsetHeight,q=d(this.options.gravity,this.$element[0]);var o;switch(q.charAt(0)){case"n":o={top:n.top+n.height+this.options.offset,left:n.left+n.width/2-g/2};break;case"s":o={top:n.top-k-this.options.offset,left:n.left+n.width/2-g/2};break;case"e":o={top:n.top+n.height/2-k/2,left:n.left-g-this.options.offset};break;case"w":o={top:n.top+n.height/2-k/2,left:n.left+n.width+this.options.offset};break}if(q.length==2){if(q.charAt(1)=="w"){o.left=n.left+n.width/2-15}else{o.left=n.left+n.width/2-g+15}}i.css(o).addClass("tipsy-"+q);i.find(".tipsy-arrow")[0].className="tipsy-arrow tipsy-arrow-"+q.charAt(0);if(this.options.className){i.addClass(d(this.options.className,this.$element[0]))}if(this.options.fade){i.stop().css({opacity:0,display:"block",visibility:"visible"}).animate({opacity:this.options.opacity})}else{i.css({visibility:"visible",opacity:this.options.opacity})}if(this.options.aria){var j=b();i.attr("id",j);this.$element.attr("aria-describedby",j)}}},hide:function(){if(this.options.fade){this.tip().stop().fadeOut(function(){e(this).remove()})}else{this.tip().remove()}if(this.options.aria){this.$element.removeAttr("aria-describedby")}},fixTitle:function(){var g=this.$element;if(g.attr("title")||typeof(g.attr("original-title"))!="string"){g.attr("original-title",g.attr("title")||"").removeAttr("title")}},getTitle:function(){var i,g=this.$element,h=this.options;this.fixTitle();var i,h=this.options;if(typeof h.title=="string"){i=g.attr(h.title=="title"?"original-title":h.title)}else{if(typeof h.title=="function"){i=h.title.call(g[0])}}i=(""+i).replace(/(^\s*|\s*$)/,"");return i||h.fallback},tip:function(){if(!this.$tip){this.$tip=e('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>').attr("role","tooltip");this.$tip.data("tipsy-pointee",this.$element[0])}return this.$tip},validate:function(){if(!this.$element[0].parentNode){this.hide();this.$element=null;this.options=null}},enable:function(){this.enabled=true},disable:function(){this.enabled=false},toggleEnabled:function(){this.enabled=!this.enabled}};e.fn.tipsy=function(j){if(j===true){return this.data("tipsy")}else{if(typeof j=="string"){var l=this.data("tipsy");if(l){l[j]()}return this}}j=e.extend({},e.fn.tipsy.defaults,j);if(j.hoverable){j.delayOut=j.delayOut||20}function i(n){var o=e.data(n,"tipsy");if(!o){o=new c(n,e.fn.tipsy.elementOptions(n,j));e.data(n,"tipsy",o)}return o}function m(){var n=i(this);n.hoverState="in";if(j.delayIn==0){n.show()}else{n.fixTitle();setTimeout(function(){if(n.hoverState=="in"){n.show()}},j.delayIn)}}function h(){var n=i(this);n.hoverState="out";if(j.delayOut==0){n.hide()}else{setTimeout(function(){if(n.hoverState=="out"&&!n.hoverTooltip){n.hide()}},j.delayOut)}}if(!j.live){this.each(function(){i(this)})}if(j.trigger!="manual"){var k=j.trigger=="hover"?"mouseenter.tipsy":"focus.tipsy",g=j.trigger=="hover"?"mouseleave.tipsy":"blur.tipsy";if(j.live){e(this.context).on(k,this.selector,m).on(g,this.selector,h)}else{this.bind(k,m).bind(g,h)}}return this};e.fn.tipsy.defaults={aria:false,className:null,delayIn:0,delayOut:0,fade:false,fallback:"",gravity:"n",html:false,live:false,hoverable:false,offset:0,opacity:0.8,title:"title",trigger:"hover"};e.fn.tipsy.revalidate=function(){e(".tipsy").each(function(){var g=e.data(this,"tipsy-pointee");if(!g||!f(g)){e(this).remove()}})};e.fn.tipsy.elementOptions=function(h,g){return e.metadata?e.extend({},g,e(h).metadata()):g};e.fn.tipsy.autoNS=function(){return e(this).offset().top>(e(document).scrollTop()+e(window).height()/2)?"s":"n"};e.fn.tipsy.autoWE=function(){return e(this).offset().left>(e(document).scrollLeft()+e(window).width()/2)?"e":"w"};e.fn.tipsy.autoBounds=function(h,g){return function(){var i={ns:g[0],ew:(g.length>1?g[1]:false)},l=e(document).scrollTop()+h,j=e(document).scrollLeft()+h,k=e(this);if(k.offset().top<l){i.ns="n"}if(k.offset().left<j){i.ew="w"}if(e(window).width()+e(document).scrollLeft()-k.offset().left<h){i.ew="e"}if(e(window).height()+e(document).scrollTop()-k.offset().top<h){i.ns="s"}return i.ns+(i.ew?i.ew:"")}}})(jQuery);
(function(a){a.fn.tooltip=function(b){var e=a.extend({},a.fn.tooltip.defaults,b),c=this.tipsy(e);if(e.hideOnClick&&(e.trigger=="hover"||!e.trigger&&this.tipsy.defaults.trigger=="hover")){var d=function(){a(this).tipsy("hide")};if(e.live){a(this.context).on("click.tipsy",this.selector,d)}else{this.bind("click.tipsy",d)}}return c};a.fn.tooltip.defaults={opacity:1,offset:1,delayIn:500,hoverable:true,hideOnClick:true}}(AJS.$));
/*->
 #name>Sortable Tables
 #javascript>Yes
 #css>Yes
 #description> Standards Patterns and Styling for HTML Sortable Tables
 <-*/
(function() {
    var DEFAULT_SORT_OPTIONS = {sortMultiSortKey: '', headers: {}, debug: false};

    function sortTable($table) {
        var options = DEFAULT_SORT_OPTIONS;
        $table.find("th").each(function(index, header) {

            var $header = AJS.$(header);
            options.headers[index] = {};
            if ($header.hasClass("aui-table-column-unsortable")) {
                options.headers[index].sorter = false;
            } else {
                $header.attr('tabindex', '0');
                $header.wrapInner("<span class='aui-table-header-content'/>");
                if ($header.hasClass("aui-table-column-issue-key")) {
                    options.headers[index].sorter = "issue-key";
                }
            }
        });
        $table.tablesorter(options);
    }

    AJS.tablessortable = {
        setup: function() {

            /*
             This parser is used for issue keys in the format <PROJECT_KEY>-<ISSUE_NUMBER>, where <PROJECT_KEY> is a maximum
             10 character string with characters(A-Z). Assumes that issue number is no larger than 999,999. e.g. not more
             than a million issues.
             This pads the issue key to allow for proper string sorting so that the project key is always 10 characters and the
             issue number is always 6 digits. e.g. it appends the project key '.' until it is 10 characters long and prepends 0
             so that the issue number is 6 digits long. e.g. CONF-102 == CONF......000102. This is to allow proper string sorting.
             */
            AJS.$.tablesorter.addParser({
                id: 'issue-key',
                is: function() {
                    return false;
                },

                format: function(s) {
                    var keyComponents = s.split("-");
                    var projectKey = keyComponents[0];
                    var issueNumber = keyComponents[1];

                    var PROJECT_KEY_TEMPLATE = "..........";
                    var ISSUE_NUMBER_TEMPLATE = "000000";
                    var stringRepresentation = (projectKey + PROJECT_KEY_TEMPLATE).slice(0, PROJECT_KEY_TEMPLATE.length);
                    stringRepresentation += (ISSUE_NUMBER_TEMPLATE + issueNumber).slice(-ISSUE_NUMBER_TEMPLATE.length);

                    return stringRepresentation;
                },

                type: 'text'
            });

            AJS.$(".aui-table-sortable").each(function() {
                sortTable(AJS.$(this));
            });
        },

        setTableSortable: function($table) {
            sortTable($table);
        }
    };

    AJS.$(AJS.tablessortable.setup);
})();
/*
 *
 * TableSorter 2.0 - Client-side table sorting with ease!
 * Version 2.0.5b
 * @requires jQuery v1.2.3
 *
 * Copyright (c) 2007 Christian Bach
 * Examples and docs at: http://tablesorter.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
/**
 *
 * @description Create a sortable table with multi-column sorting capabilitys
 *
 * @example $('table').tablesorter();
 * @desc Create a simple tablesorter interface.
 *
 * @example $('table').tablesorter({ sortList:[[0,0],[1,0]] });
 * @desc Create a tablesorter interface and sort on the first and secound column column headers.
 *
 * @example $('table').tablesorter({ headers: { 0: { sorter: false}, 1: {sorter: false} } });
 *
 * @desc Create a tablesorter interface and disableing the first and second  column headers.
 *
 *
 * @example $('table').tablesorter({ headers: { 0: {sorter:"integer"}, 1: {sorter:"currency"} } });
 *
 * @desc Create a tablesorter interface and set a column parser for the first
 *       and second column.
 *
 *
 * @param Object
 *            settings An object literal containing key/value pairs to provide
 *            optional settings.
 *
 *
 * @option String cssHeader (optional) A string of the class name to be appended
 *         to sortable tr elements in the thead of the table. Default value:
 *         "header"
 *
 * @option String cssAsc (optional) A string of the class name to be appended to
 *         sortable tr elements in the thead on a ascending sort. Default value:
 *         "headerSortUp"
 *
 * @option String cssDesc (optional) A string of the class name to be appended
 *         to sortable tr elements in the thead on a descending sort. Default
 *         value: "headerSortDown"
 *
 * @option String sortInitialOrder (optional) A string of the inital sorting
 *         order can be asc or desc. Default value: "asc"
 *
 * @option String sortMultisortKey (optional) A string of the multi-column sort
 *         key. Default value: "shiftKey"
 *
 * @option String textExtraction (optional) A string of the text-extraction
 *         method to use. For complex html structures inside td cell set this
 *         option to "complex", on large tables the complex option can be slow.
 *         Default value: "simple"
 *
 * @option Object headers (optional) An array containing the forces sorting
 *         rules. This option let's you specify a default sorting rule. Default
 *         value: null
 *
 * @option Array sortList (optional) An array containing the forces sorting
 *         rules. This option let's you specify a default sorting rule. Default
 *         value: null
 *
 * @option Array sortForce (optional) An array containing forced sorting rules.
 *         This option let's you specify a default sorting rule, which is
 *         prepended to user-selected rules. Default value: null
 *
 * @option Boolean sortLocaleCompare (optional) Boolean flag indicating whatever
 *         to use String.localeCampare method or not. Default set to true.
 *
 *
 * @option Array sortAppend (optional) An array containing forced sorting rules.
 *         This option let's you specify a default sorting rule, which is
 *         appended to user-selected rules. Default value: null
 *
 * @option Boolean widthFixed (optional) Boolean flag indicating if tablesorter
 *         should apply fixed widths to the table columns. This is usefull when
 *         using the pager companion plugin. This options requires the dimension
 *         jquery plugin. Default value: false
 *
 * @option Boolean cancelSelection (optional) Boolean flag indicating if
 *         tablesorter should cancel selection of the table headers text.
 *         Default value: true
 *
 * @option Boolean debug (optional) Boolean flag indicating if tablesorter
 *         should display debuging information usefull for development.
 *
 * @type jQuery
 *
 * @name tablesorter
 *
 * @cat Plugins/Tablesorter
 *
 * @author Christian Bach/christian.bach@polyester.se
 */

(function ($) {
    $.extend({
        tablesorter: new
            function () {

                var parsers = [],
                    widgets = [];

                this.defaults = {
                    cssHeader: "header",
                    cssAsc: "headerSortUp",
                    cssDesc: "headerSortDown",
                    cssChildRow: "expand-child",
                    sortInitialOrder: "asc",
                    sortMultiSortKey: "shiftKey",
                    sortForce: null,
                    sortAppend: null,
                    sortLocaleCompare: true,
                    textExtraction: "simple",
                    parsers: {}, widgets: [],
                    widgetZebra: {
                        css: ["even", "odd"]
                    }, headers: {}, widthFixed: false,
                    cancelSelection: true,
                    sortList: [],
                    headerList: [],
                    dateFormat: "us",
                    decimal: '/\.|\,/g',
                    onRenderHeader: null,
                    selectorHeaders: 'thead th',
                    debug: false
                };

                /* debuging utils */

                function benchmark(s, d) {
                    log(s + "," + (new Date().getTime() - d.getTime()) + "ms");
                }

                this.benchmark = benchmark;

                function log(s) {
                    if (typeof console != "undefined" && typeof console.debug != "undefined") {
                        console.log(s);
                    } else {
                        alert(s);
                    }
                }

                /* parsers utils */

                function buildParserCache(table, $headers) {

                    if (table.config.debug) {
                        var parsersDebug = "";
                    }

                    if (table.tBodies.length == 0) return; // In the case of empty tables
                    var rows = table.tBodies[0].rows;

                    if (rows[0]) {

                        var list = [],
                            cells = rows[0].cells,
                            l = cells.length;

                        for (var i = 0; i < l; i++) {

                            var p = false;

                            if ($.metadata && ($($headers[i]).metadata() && $($headers[i]).metadata().sorter)) {

                                p = getParserById($($headers[i]).metadata().sorter);

                            } else if ((table.config.headers[i] && table.config.headers[i].sorter)) {

                                p = getParserById(table.config.headers[i].sorter);
                            }
                            if (!p) {

                                p = detectParserForColumn(table, rows, -1, i);
                            }

                            if (table.config.debug) {
                                parsersDebug += "column:" + i + " parser:" + p.id + "\n";
                            }

                            list.push(p);
                        }
                    }

                    if (table.config.debug) {
                        log(parsersDebug);
                    }

                    return list;
                };

                function detectParserForColumn(table, rows, rowIndex, cellIndex) {
                    var l = parsers.length,
                        node = false,
                        nodeValue = false,
                        keepLooking = true;
                    while (nodeValue == '' && keepLooking) {
                        rowIndex++;
                        if (rows[rowIndex]) {
                            node = getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex);
                            nodeValue = trimAndGetNodeText(table.config, node);
                            if (table.config.debug) {
                                log('Checking if value was empty on row:' + rowIndex);
                            }
                        } else {
                            keepLooking = false;
                        }
                    }
                    for (var i = 1; i < l; i++) {
                        if (parsers[i].is(nodeValue, table, node)) {
                            return parsers[i];
                        }
                    }
                    // 0 is always the generic parser (text)
                    return parsers[0];
                }

                function getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex) {
                    return rows[rowIndex].cells[cellIndex];
                }

                function trimAndGetNodeText(config, node) {
                    return $.trim(getElementText(config, node));
                }

                function getParserById(name) {
                    var l = parsers.length;
                    for (var i = 0; i < l; i++) {
                        if (parsers[i].id.toLowerCase() == name.toLowerCase()) {
                            return parsers[i];
                        }
                    }
                    return false;
                }

                /* utils */

                function buildCache(table) {

                    if (table.config.debug) {
                        var cacheTime = new Date();
                    }

                    var totalRows = (table.tBodies[0] && table.tBodies[0].rows.length) || 0,
                        totalCells = (table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length) || 0,
                        parsers = table.config.parsers,
                        cache = {
                            row: [],
                            normalized: []
                        };

                    for (var i = 0; i < totalRows; ++i) {

                        /** Add the table data to main data array */
                        var c = $(table.tBodies[0].rows[i]),
                            cols = [];

                        // if this is a child row, add it to the last row's children and
                        // continue to the next row
                        if (c.hasClass(table.config.cssChildRow)) {
                            cache.row[cache.row.length - 1] = cache.row[cache.row.length - 1].add(c);
                            // go to the next for loop
                            continue;
                        }

                        cache.row.push(c);

                        for (var j = 0; j < totalCells; ++j) {
                            cols.push(parsers[j].format(getElementText(table.config, c[0].cells[j]), table, c[0].cells[j]));
                        }

                        cols.push(cache.normalized.length); // add position for rowCache
                        cache.normalized.push(cols);
                        cols = null;
                    };

                    if (table.config.debug) {
                        benchmark("Building cache for " + totalRows + " rows:", cacheTime);
                    }

                    return cache;
                };

                function getElementText(config, node) {

                    var text = "";

                    if (!node) return "";

                    if (!config.supportsTextContent) config.supportsTextContent = node.textContent || false;

                    if (config.textExtraction == "simple") {
                        if (config.supportsTextContent) {
                            text = node.textContent;
                        } else {
                            if (node.childNodes[0] && node.childNodes[0].hasChildNodes()) {
                                text = node.childNodes[0].innerHTML;
                            } else {
                                text = node.innerHTML;
                            }
                        }
                    } else {
                        if (typeof(config.textExtraction) == "function") {
                            text = config.textExtraction(node);
                        } else {
                            text = $(node).text();
                        }
                    }
                    return text;
                }

                function appendToTable(table, cache) {

                    if (table.config.debug) {
                        var appendTime = new Date()
                    }

                    var c = cache,
                        r = c.row,
                        n = c.normalized,
                        totalRows = n.length,
                        checkCell = (n[0].length - 1),
                        tableBody = $(table.tBodies[0]),
                        rows = [];


                    for (var i = 0; i < totalRows; i++) {
                        var pos = n[i][checkCell];

                        rows.push(r[pos]);

                        if (!table.config.appender) {

                            //var o = ;
                            var l = r[pos].length;
                            for (var j = 0; j < l; j++) {
                                tableBody[0].appendChild(r[pos][j]);
                            }

                            //
                        }
                    }



                    if (table.config.appender) {

                        table.config.appender(table, rows);
                    }

                    rows = null;

                    if (table.config.debug) {
                        benchmark("Rebuilt table:", appendTime);
                    }

                    // apply table widgets
                    applyWidget(table);

                    // trigger sortend
                    setTimeout(function () {
                        $(table).trigger("sortEnd");
                    }, 0);

                };

                function buildHeaders(table) {

                    if (table.config.debug) {
                        var time = new Date();
                    }

                    var meta = ($.metadata) ? true : false;

                    var header_index = computeTableHeaderCellIndexes(table);

                    $tableHeaders = $(table.config.selectorHeaders, table).each(function (index) {

                        this.column = header_index[this.parentNode.rowIndex + "-" + this.cellIndex];
                        // this.column = index;
                        this.order = formatSortingOrder(table.config.sortInitialOrder);


                        this.count = this.order;

                        if (checkHeaderMetadata(this) || checkHeaderOptions(table, index)) this.sortDisabled = true;
                        if (checkHeaderOptionsSortingLocked(table, index)) this.order = this.lockedOrder = checkHeaderOptionsSortingLocked(table, index);

                        if (!this.sortDisabled) {
                            var $th = $(this).addClass(table.config.cssHeader);
                            if (table.config.onRenderHeader) table.config.onRenderHeader.apply($th);
                        }

                        // add cell to headerList
                        table.config.headerList[index] = this;
                    });

                    if (table.config.debug) {
                        benchmark("Built headers:", time);
                        log($tableHeaders);
                    }

                    return $tableHeaders;

                };

                // from:
                // http://www.javascripttoolbox.com/lib/table/examples.php
                // http://www.javascripttoolbox.com/temp/table_cellindex.html


                function computeTableHeaderCellIndexes(t) {
                    var matrix = [];
                    var lookup = {};
                    var thead = t.getElementsByTagName('THEAD')[0];
                    var trs = thead.getElementsByTagName('TR');

                    for (var i = 0; i < trs.length; i++) {
                        var cells = trs[i].cells;
                        for (var j = 0; j < cells.length; j++) {
                            var c = cells[j];

                            var rowIndex = c.parentNode.rowIndex;
                            var cellId = rowIndex + "-" + c.cellIndex;
                            var rowSpan = c.rowSpan || 1;
                            var colSpan = c.colSpan || 1
                            var firstAvailCol;
                            if (typeof(matrix[rowIndex]) == "undefined") {
                                matrix[rowIndex] = [];
                            }
                            // Find first available column in the first row
                            for (var k = 0; k < matrix[rowIndex].length + 1; k++) {
                                if (typeof(matrix[rowIndex][k]) == "undefined") {
                                    firstAvailCol = k;
                                    break;
                                }
                            }
                            lookup[cellId] = firstAvailCol;
                            for (var k = rowIndex; k < rowIndex + rowSpan; k++) {
                                if (typeof(matrix[k]) == "undefined") {
                                    matrix[k] = [];
                                }
                                var matrixrow = matrix[k];
                                for (var l = firstAvailCol; l < firstAvailCol + colSpan; l++) {
                                    matrixrow[l] = "x";
                                }
                            }
                        }
                    }
                    return lookup;
                }

                function checkCellColSpan(table, rows, row) {
                    var arr = [],
                        r = table.tHead.rows,
                        c = r[row].cells;

                    for (var i = 0; i < c.length; i++) {
                        var cell = c[i];

                        if (cell.colSpan > 1) {
                            arr = arr.concat(checkCellColSpan(table, headerArr, row++));
                        } else {
                            if (table.tHead.length == 1 || (cell.rowSpan > 1 || !r[row + 1])) {
                                arr.push(cell);
                            }
                            // headerArr[row] = (i+row);
                        }
                    }
                    return arr;
                };

                function checkHeaderMetadata(cell) {
                    if (($.metadata) && ($(cell).metadata().sorter === false)) {
                        return true;
                    };
                    return false;
                }

                function checkHeaderOptions(table, i) {
                    if ((table.config.headers[i]) && (table.config.headers[i].sorter === false)) {
                        return true;
                    };
                    return false;
                }

                function checkHeaderOptionsSortingLocked(table, i) {
                    if ((table.config.headers[i]) && (table.config.headers[i].lockedOrder)) return table.config.headers[i].lockedOrder;
                    return false;
                }

                function applyWidget(table) {
                    var c = table.config.widgets;
                    var l = c.length;
                    for (var i = 0; i < l; i++) {

                        getWidgetById(c[i]).format(table);
                    }

                }

                function getWidgetById(name) {
                    var l = widgets.length;
                    for (var i = 0; i < l; i++) {
                        if (widgets[i].id.toLowerCase() == name.toLowerCase()) {
                            return widgets[i];
                        }
                    }
                };

                function formatSortingOrder(v) {
                    if (typeof(v) != "Number") {
                        return (v.toLowerCase() == "desc") ? 1 : 0;
                    } else {
                        return (v == 1) ? 1 : 0;
                    }
                }

                function isValueInArray(v, a) {
                    var l = a.length;
                    for (var i = 0; i < l; i++) {
                        if (a[i][0] == v) {
                            return true;
                        }
                    }
                    return false;
                }

                function setHeadersCss(table, $headers, list, css) {
                    // remove all header information
                    $headers.removeClass(css[0]).removeClass(css[1]);

                    var h = [];
                    $headers.each(function (offset) {
                        if (!this.sortDisabled) {
                            h[this.column] = $(this);
                        }
                    });

                    var l = list.length;
                    for (var i = 0; i < l; i++) {
                        h[list[i][0]].addClass(css[list[i][1]]);
                    }
                }

                function fixColumnWidth(table, $headers) {
                    var c = table.config;
                    if (c.widthFixed) {
                        var colgroup = $('<colgroup>');
                        $("tr:first td", table.tBodies[0]).each(function () {
                            colgroup.append($('<col>').css('width', $(this).width()));
                        });
                        $(table).prepend(colgroup);
                    };
                }

                function updateHeaderSortCount(table, sortList) {
                    var c = table.config,
                        l = sortList.length;
                    for (var i = 0; i < l; i++) {
                        var s = sortList[i],
                            o = c.headerList[s[0]];
                        o.count = s[1];
                        o.count++;
                    }
                }

                /* sorting methods */

                function multisort(table, sortList, cache) {

                    if (table.config.debug) {
                        var sortTime = new Date();
                    }

                    var dynamicExp = "var sortWrapper = function(a,b) {",
                        l = sortList.length;

                    // TODO: inline functions.
                    for (var i = 0; i < l; i++) {

                        var c = sortList[i][0];
                        var order = sortList[i][1];
                        // var s = (getCachedSortType(table.config.parsers,c) == "text") ?
                        // ((order == 0) ? "sortText" : "sortTextDesc") : ((order == 0) ?
                        // "sortNumeric" : "sortNumericDesc");
                        // var s = (table.config.parsers[c].type == "text") ? ((order == 0)
                        // ? makeSortText(c) : makeSortTextDesc(c)) : ((order == 0) ?
                        // makeSortNumeric(c) : makeSortNumericDesc(c));
                        var s = (table.config.parsers[c].type == "text") ? ((order == 0) ? makeSortFunction("text", "asc", c) : makeSortFunction("text", "desc", c)) : ((order == 0) ? makeSortFunction("numeric", "asc", c) : makeSortFunction("numeric", "desc", c));
                        var e = "e" + i;

                        dynamicExp += "var " + e + " = " + s; // + "(a[" + c + "],b[" + c
                        // + "]); ";
                        dynamicExp += "if(" + e + ") { return " + e + "; } ";
                        dynamicExp += "else { ";

                    }

                    // if value is the same keep orignal order
                    var orgOrderCol = cache.normalized[0].length - 1;
                    dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";

                    for (var i = 0; i < l; i++) {
                        dynamicExp += "}; ";
                    }

                    dynamicExp += "return 0; ";
                    dynamicExp += "}; ";

                    if (table.config.debug) {
                        benchmark("Evaling expression:" + dynamicExp, new Date());
                    }

                    eval(dynamicExp);

                    cache.normalized.sort(sortWrapper);

                    if (table.config.debug) {
                        benchmark("Sorting on " + sortList.toString() + " and dir " + order + " time:", sortTime);
                    }

                    return cache;
                };

                function makeSortFunction(type, direction, index) {
                    var a = "a[" + index + "]",
                        b = "b[" + index + "]";
                    if (type == 'text' && direction == 'asc') {
                        return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + a + " < " + b + ") ? -1 : 1 )));";
                    } else if (type == 'text' && direction == 'desc') {
                        return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + b + " < " + a + ") ? -1 : 1 )));";
                    } else if (type == 'numeric' && direction == 'asc') {
                        return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + a + " - " + b + "));";
                    } else if (type == 'numeric' && direction == 'desc') {
                        return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + b + " - " + a + "));";
                    }
                };

                function makeSortText(i) {
                    return "((a[" + i + "] < b[" + i + "]) ? -1 : ((a[" + i + "] > b[" + i + "]) ? 1 : 0));";
                };

                function makeSortTextDesc(i) {
                    return "((b[" + i + "] < a[" + i + "]) ? -1 : ((b[" + i + "] > a[" + i + "]) ? 1 : 0));";
                };

                function makeSortNumeric(i) {
                    return "a[" + i + "]-b[" + i + "];";
                };

                function makeSortNumericDesc(i) {
                    return "b[" + i + "]-a[" + i + "];";
                };

                function sortText(a, b) {
                    if (table.config.sortLocaleCompare) return a.localeCompare(b);
                    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
                };

                function sortTextDesc(a, b) {
                    if (table.config.sortLocaleCompare) return b.localeCompare(a);
                    return ((b < a) ? -1 : ((b > a) ? 1 : 0));
                };

                function sortNumeric(a, b) {
                    return a - b;
                };

                function sortNumericDesc(a, b) {
                    return b - a;
                };

                function getCachedSortType(parsers, i) {
                    return parsers[i].type;
                }; /* public methods */
                this.construct = function (settings) {
                    return this.each(function () {
                        // if no thead or tbody quit.
                        if (!this.tHead || !this.tBodies) return;
                        // declare
                        var $this, $document, $headers, cache, config, shiftDown = 0,
                            sortOrder;
                        // new blank config object
                        this.config = {};
                        // merge and extend.
                        config = $.extend(this.config, $.tablesorter.defaults, settings);
                        // store common expression for speed
                        $this = $(this);
                        // save the settings where they read
                        $.data(this, "tablesorter", config);
                        // build headers
                        $headers = buildHeaders(this);
                        // try to auto detect column type, and store in tables config
                        this.config.parsers = buildParserCache(this, $headers);
                        // build the cache for the tbody cells
                        cache = buildCache(this);
                        // get the css class names, could be done else where.
                        var sortCSS = [config.cssDesc, config.cssAsc];
                        // fixate columns if the users supplies the fixedWidth option
                        fixColumnWidth(this);
                        // apply event handling to headers
                        // this is to big, perhaps break it out?
                        $headers.click(

                            function (e) {
                                var totalRows = ($this[0].tBodies[0] && $this[0].tBodies[0].rows.length) || 0;
                                if (!this.sortDisabled && totalRows > 0) {
                                    // Only call sortStart if sorting is
                                    // enabled.
                                    $this.trigger("sortStart");
                                    // store exp, for speed
                                    var $cell = $(this);
                                    // get current column index
                                    var i = this.column;
                                    // get current column sort order
                                    this.order = this.count++ % 2;
                                    // always sort on the locked order.
                                    if(this.lockedOrder) this.order = this.lockedOrder;

                                    // user only whants to sort on one
                                    // column
                                    if (!e[config.sortMultiSortKey]) {
                                        // flush the sort list
                                        config.sortList = [];
                                        if (config.sortForce != null) {
                                            var a = config.sortForce;
                                            for (var j = 0; j < a.length; j++) {
                                                if (a[j][0] != i) {
                                                    config.sortList.push(a[j]);
                                                }
                                            }
                                        }
                                        // add column to sort list
                                        config.sortList.push([i, this.order]);
                                        // multi column sorting
                                    } else {
                                        // the user has clicked on an all
                                        // ready sortet column.
                                        if (isValueInArray(i, config.sortList)) {
                                            // revers the sorting direction
                                            // for all tables.
                                            for (var j = 0; j < config.sortList.length; j++) {
                                                var s = config.sortList[j],
                                                    o = config.headerList[s[0]];
                                                if (s[0] == i) {
                                                    o.count = s[1];
                                                    o.count++;
                                                    s[1] = o.count % 2;
                                                }
                                            }
                                        } else {
                                            // add column to sort list array
                                            config.sortList.push([i, this.order]);
                                        }
                                    };
                                    setTimeout(function () {
                                        // set css for headers
                                        setHeadersCss($this[0], $headers, config.sortList, sortCSS);
                                        appendToTable(
                                            $this[0], multisort(
                                                $this[0], config.sortList, cache)
                                        );
                                    }, 1);
                                    // stop normal event by returning false
                                    return false;
                                }
                                // cancel selection
                            }).mousedown(function () {
                                if (config.cancelSelection) {
                                    this.onselectstart = function () {
                                        return false
                                    };
                                    return false;
                                }
                            });
                        // apply easy methods that trigger binded events
                        $this.bind("update", function () {
                            var me = this;
                            setTimeout(function () {
                                // rebuild parsers.
                                me.config.parsers = buildParserCache(
                                    me, $headers);
                                // rebuild the cache map
                                cache = buildCache(me);
                            }, 1);
                        }).bind("updateCell", function (e, cell) {
                                var config = this.config;
                                // get position from the dom.
                                var pos = [(cell.parentNode.rowIndex - 1), cell.cellIndex];
                                // update cache
                                cache.normalized[pos[0]][pos[1]] = config.parsers[pos[1]].format(
                                    getElementText(config, cell), cell);
                            }).bind("sorton", function (e, list) {
                                $(this).trigger("sortStart");
                                config.sortList = list;
                                // update and store the sortlist
                                var sortList = config.sortList;
                                // update header count index
                                updateHeaderSortCount(this, sortList);
                                // set css for headers
                                setHeadersCss(this, $headers, sortList, sortCSS);
                                // sort the table and append it to the dom
                                appendToTable(this, multisort(this, sortList, cache));
                            }).bind("appendCache", function () {
                                appendToTable(this, cache);
                            }).bind("applyWidgetId", function (e, id) {
                                getWidgetById(id).format(this);
                            }).bind("applyWidgets", function () {
                                // apply widgets
                                applyWidget(this);
                            });
                        if ($.metadata && ($(this).metadata() && $(this).metadata().sortlist)) {
                            config.sortList = $(this).metadata().sortlist;
                        }
                        // if user has supplied a sort list to constructor.
                        if (config.sortList.length > 0) {
                            $this.trigger("sorton", [config.sortList]);
                        }
                        // apply widgets
                        applyWidget(this);
                    });
                };
                this.addParser = function (parser) {
                    var l = parsers.length,
                        a = true;
                    for (var i = 0; i < l; i++) {
                        if (parsers[i].id.toLowerCase() == parser.id.toLowerCase()) {
                            a = false;
                        }
                    }
                    if (a) {
                        parsers.push(parser);
                    };
                };
                this.addWidget = function (widget) {
                    widgets.push(widget);
                };
                this.formatFloat = function (s) {
                    var i = parseFloat(s);
                    return (isNaN(i)) ? 0 : i;
                };
                this.formatInt = function (s) {
                    var i = parseInt(s);
                    return (isNaN(i)) ? 0 : i;
                };
                this.isDigit = function (s, config) {
                    // replace all an wanted chars and match.
                    return /^[-+]?\d*$/.test($.trim(s.replace(/[,.']/g, '')));
                };
                this.clearTableBody = function (table) {
                    if ($.browser.msie) {
                        function empty() {
                            while (this.firstChild)
                                this.removeChild(this.firstChild);
                        }
                        empty.apply(table.tBodies[0]);
                    } else {
                        table.tBodies[0].innerHTML = "";
                    }
                };
            }
    });

    // extend plugin scope
    $.fn.extend({
        tablesorter: $.tablesorter.construct
    });

    // make shortcut
    var ts = $.tablesorter;

    // add default parsers
    ts.addParser({
        id: "text",
        is: function (s) {
            return true;
        }, format: function (s) {
            return $.trim(s.toLocaleLowerCase());
        }, type: "text"
    });

    ts.addParser({
        id: "digit",
        is: function (s, table) {
            var c = table.config;
            return $.tablesorter.isDigit(s, c);
        }, format: function (s) {
            return $.tablesorter.formatFloat(s);
        }, type: "numeric"
    });

    ts.addParser({
        id: "currency",
        is: function (s) {
            return /^[£$€?.]/.test(s);
        }, format: function (s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/[£$€]/g), ""));
        }, type: "numeric"
    });

    ts.addParser({
        id: "ipAddress",
        is: function (s) {
            return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);
        }, format: function (s) {
            var a = s.split("."),
                r = "",
                l = a.length;
            for (var i = 0; i < l; i++) {
                var item = a[i];
                if (item.length == 2) {
                    r += "0" + item;
                } else {
                    r += item;
                }
            }
            return $.tablesorter.formatFloat(r);
        }, type: "numeric"
    });

    ts.addParser({
        id: "url",
        is: function (s) {
            return /^(https?|ftp|file):\/\/$/.test(s);
        }, format: function (s) {
            return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//), ''));
        }, type: "text"
    });

    ts.addParser({
        id: "isoDate",
        is: function (s) {
            return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);
        }, format: function (s) {
            return $.tablesorter.formatFloat((s != "") ? new Date(s.replace(
                new RegExp(/-/g), "/")).getTime() : "0");
        }, type: "numeric"
    });

    ts.addParser({
        id: "percent",
        is: function (s) {
            return /\%$/.test($.trim(s));
        }, format: function (s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g), ""));
        }, type: "numeric"
    });

    ts.addParser({
        id: "usLongDate",
        is: function (s) {
            return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));
        }, format: function (s) {
            return $.tablesorter.formatFloat(new Date(s).getTime());
        }, type: "numeric"
    });

    ts.addParser({
        id: "shortDate",
        is: function (s) {
            return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);
        }, format: function (s, table) {
            var c = table.config;
            s = s.replace(/\-/g, "/");
            if (c.dateFormat == "us") {
                // reformat the string in ISO format
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2");
            } else if (c.dateFormat == "uk") {
                // reformat the string in ISO format
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1");
            } else if (c.dateFormat == "dd/mm/yy" || c.dateFormat == "dd-mm-yy") {
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3");
            }
            return $.tablesorter.formatFloat(new Date(s).getTime());
        }, type: "numeric"
    });
    ts.addParser({
        id: "time",
        is: function (s) {
            return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);
        }, format: function (s) {
            return $.tablesorter.formatFloat(new Date("2000/01/01 " + s).getTime());
        }, type: "numeric"
    });
    ts.addParser({
        id: "metadata",
        is: function (s) {
            return false;
        }, format: function (s, table, cell) {
            var c = table.config,
                p = (!c.parserMetadataName) ? 'sortValue' : c.parserMetadataName;
            return $(cell).metadata()[p];
        }, type: "numeric"
    });
    // add default widgets
    ts.addWidget({
        id: "zebra",
        format: function (table) {
            if (table.config.debug) {
                var time = new Date();
            }
            var $tr, row = -1,
                odd;
            // loop through the visible rows
            $("tr:visible", table.tBodies[0]).each(function (i) {
                $tr = $(this);
                // style children rows the same way the parent
                // row was styled
                if (!$tr.hasClass(table.config.cssChildRow)) row++;
                odd = (row % 2 == 0);
                $tr.removeClass(
                        table.config.widgetZebra.css[odd ? 0 : 1]).addClass(
                        table.config.widgetZebra.css[odd ? 1 : 0])
            });
            if (table.config.debug) {
                $.tablesorter.benchmark("Applying Zebra widget", time);
            }
        }
    });
})(jQuery);
(function ($) {
    var $document = $(document),

        //convenience function because this needs to be run for all the events.
        getExpanderProperties = function(event){
            var properties = {};

            properties.$trigger = $(event.currentTarget);
            properties.$content = $document.find("#" + properties.$trigger.attr("aria-controls"));
            properties.triggerIsParent = properties.$content.parent().filter(properties.$trigger).length != 0;
            properties.$shortContent = properties.triggerIsParent ? properties.$trigger.find(".aui-expander-short-content") : null;
            properties.height = properties.$content.css("min-height");
            properties.isCollapsible = properties.$trigger.data("collapsible") != false;
            properties.replaceText = properties.$trigger.attr("data-replace-text"); //can't use .data here because it doesn't update after the first call
            properties.replaceSelector = properties.$trigger.data("replace-selector");

            return properties;
        },
        replaceText = function(properties){
             if(properties.replaceText){
                var $replaceElement = properties.replaceSelector ? 
                                        properties.$trigger.find(properties.replaceSelector) :
                                        properties.$trigger;
                
                properties.$trigger.attr("data-replace-text", $replaceElement.text());
                $replaceElement.text(properties.replaceText);
            }    
        }
        //events that the expander listens to
        EXPANDER_EVENTS = {
            "aui-expander-invoke": function(event){
                var $trigger = $(event.currentTarget);
                var $content = $document.find("#" + $trigger.attr("aria-controls"));
                var isCollapsible = $trigger.data("collapsible") != false;

                //determine if content should be expanded or collapsed
                if($content.attr("aria-expanded")=="true" && isCollapsible){
                    $trigger.trigger("aui-expander-collapse");
                } else {
                    $trigger.trigger("aui-expander-expand");
                }
            },
            "aui-expander-expand": function(event){
                var properties = getExpanderProperties(event);

                properties.$content.attr("aria-expanded", "true");
                if(properties.height!="0px"){
                    properties.$content.css("height", "auto");
                } else {
                    properties.$content.attr("aria-hidden", "false");                       
                }   
                
                //handle replace text
                replaceText(properties);

                //if the trigger is the parent also hide the short-content (default)
                if(properties.triggerIsParent){
                    properties.$shortContent.hide();
                }
                properties.$trigger.trigger("aui-expander-expanded");

            },
            "aui-expander-collapse": function(event){

                var properties = getExpanderProperties(event),
                    isHeightPx,
                    lineHeight = parseInt(properties.$content.css("line-height"), 10),
                    heightCap = properties.$content.children().first().height();

                //handle the height option
                if(properties.height != "0px"){
                    properties.$content.css("height", 0);
                } else {
                    properties.$content.attr("aria-hidden", "true");                        
                }
                 //handle replace text
                replaceText(properties);

                //collapse the expander
                properties.$content.attr("aria-expanded", "false");
                //if the trigger is the parent also hide the short-content (default)
                if(properties.triggerIsParent){
                    properties.$shortContent.show();
                }
                properties.$trigger.trigger("aui-expander-collapsed");
            },

            "click.aui-expander": function(event){
                $target = $(event.currentTarget);
                $target.trigger("aui-expander-invoke", event.currentTarget);    
            }
        }
    //delegate events to the triggers on the page
    $document.on(EXPANDER_EVENTS, ".aui-expander-trigger");

})(jQuery);
//fgnass.github.com/spin.js#v1.2.7
!function(window, document, undefined) {

  /**
   * Copyright (c) 2011 Felix Gnass [fgnass at neteye dot de]
   * Licensed under the MIT license
   */

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = function() {
    var el = createEl('style', {type : 'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }()

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
      , start = 0.01 + i/lines*100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-'+prefix+'-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }
    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   **/
  function vendor(el, prop) {
    var s = el.style
      , pp
      , i

    if(s[prop] !== undefined) return prop
    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop
      if(s[pp] !== undefined) return pp
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n)||n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = { x:el.offsetLeft, y:el.offsetTop }
    while((el = el.offsetParent))
      o.x+=el.offsetLeft, o.y+=el.offsetTop

    return o
  }

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 5,             // The line thickness
    radius: 10,           // The radius of the inner circle
    rotate: 0,            // Rotation offset
    corners: 1,           // Roundness (0..1)
    color: '#000',        // #rgb or #rrggbb
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: 'auto',          // center vertically
    left: 'auto',         // center horizontally
    position: 'relative'  // element position
  }

  /** The constructor */
  var Spinner = function Spinner(o) {
    if (!this.spin) return new Spinner(o)
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  Spinner.defaults = {}

  merge(Spinner.prototype, {
    spin: function(target) {
      this.stop()
      var self = this
        , o = self.opts
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
        , mid = o.radius+o.length+o.width
        , ep // element position
        , tp // target position

      if (target) {
        target.insertBefore(el, target.firstChild||null)
        tp = pos(target)
        ep = pos(el)
        css(el, {
          left: (o.left == 'auto' ? tp.x-ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px',
          top: (o.top == 'auto' ? tp.y-ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid)  + 'px'
        })
      }

      el.setAttribute('aria-role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , fps = o.fps
          , f = fps/o.speed
          , ostep = (1-o.opacity) / (f*o.trail / 100)
          , astep = f/o.lines

        ;(function anim() {
          i++;
          for (var s=o.lines; s; s--) {
            var alpha = Math.max(1-(i+s*astep)%f * ostep, o.opacity)
            self.opacity(el, o.lines-s, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
        })()
      }
      return self
    },

    stop: function() {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    },

    lines: function(el, o) {
      var i = 0
        , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.corners * o.width>>1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, i, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))

        ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    },

    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })

  /////////////////////////////////////////////////////////////////////////
  // VML rendering for IE
  /////////////////////////////////////////////////////////////////////////

  /**
   * Check and init VML support
   */
  ;(function() {

    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    var s = css(createEl('group'), {behavior: 'url(#default#VML)'})

    if (!vendor(s, 'transform') && s.adj) {

      // VML support detected. Insert CSS rule ...
      sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

      Spinner.prototype.lines = function(el, o) {
        var r = o.length+o.width
          , s = 2*r

        function grp() {
          return css(
            vml('group', {
              coordsize: s + ' ' + s,
              coordorigin: -r + ' ' + -r
            }),
            { width: s, height: s }
          )
        }

        var margin = -(o.width+o.length)*2 + 'px'
          , g = css(grp(), {position: 'absolute', top: margin, left: margin})
          , i

        function seg(i, dx, filter) {
          ins(g,
            ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
              ins(css(vml('roundrect', {arcsize: o.corners}), {
                  width: r,
                  height: o.width,
                  left: o.radius,
                  top: -o.width>>1,
                  filter: filter
                }),
                vml('fill', {color: o.color, opacity: o.opacity}),
                vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
              )
            )
          )
        }

        if (o.shadow)
          for (i = 1; i <= o.lines; i++)
            seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

        for (i = 1; i <= o.lines; i++) seg(i)
        return ins(el, g)
      }

      Spinner.prototype.opacity = function(el, i, val, o) {
        var c = el.firstChild
        o = o.shadow && o.lines || 0
        if (c && i+o < c.childNodes.length) {
          c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
          if (c) c.opacity = val
        }
      }
    }
    else
      useCssAnimations = vendor(s, 'animation')
  })()

  if (typeof define == 'function' && define.amd)
    define(function() { return Spinner })
  else
    window.Spinner = Spinner

}(window, document);

/*
 * Ideas from https://gist.github.com/its-florida/1290439 are acknowledged and used here.
 * Resulting file is heavily modified from that gist so is licensed under AUI's license.
 *
 * You can now create a spinner using any of the variants below:
 *
 * $("#el").spin(); // Produces default Spinner using the text color of #el.
 * $("#el").spin("small"); // Produces a 'small' Spinner using the text color of #el.
 * $("#el").spin("large", { ... }); // Produces a 'large' Spinner with your custom settings.
 * $("#el").spin({ ... }); // Produces a Spinner using your custom settings.
 *
 * $("#el").spin(false); // Kills the spinner.
 * $("#el").spinStop(); // Also kills the spinner.
 *
 */
(function($) {
    $.fn.spin = function(optsOrPreset, opts) {
        var preset, options;

        if (typeof optsOrPreset === 'string') {
            if (! optsOrPreset in $.fn.spin.presets) {
                throw new Error("Preset '" + optsOrPreset + "' isn't defined");
            }
            preset = $.fn.spin.presets[optsOrPreset];
            options = opts || {};
        } else {
            if (opts) {
                throw new Error('Invalid arguments. Accepted arguments:\n' +
                                '$.spin([String preset[, Object options]]),\n' +
                                '$.spin(Object options),\n' +
                                '$.spin(Boolean shouldSpin)');
            }
            preset = $.fn.spin.presets.small;
            options = $.isPlainObject(optsOrPreset) ? optsOrPreset : {};
        }

        if (window.Spinner) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data();

                if (data.spinner) {
                    data.spinner.stop();
                    delete data.spinner;
                }

                if (optsOrPreset === false) { // just stop it spinning.
                    return;
                }

                options = $.extend({ color: $this.css('color') }, preset, options);
                data.spinner = new Spinner(options).spin(this);
            });
        } else {
            throw "Spinner class not available.";
        }
    };
    $.fn.spin.presets = {
        "small": { lines: 12, length: 3, width: 2, radius: 3, trail: 60, speed: 1.5 },
        "medium": { lines: 12, length: 5, width: 3, radius: 8, trail: 60, speed: 1.5 },
        "large": { lines: 12, length: 8, width: 4, radius: 10, trail: 60, speed: 1.5 }
    };

    $.fn.spinStop = function() {
        if (window.Spinner) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data();

                if (data.spinner) {
                    data.spinner.stop();
                    delete data.spinner;
                }

            });
        } else {
            throw "Spinner class not available.";
        }
    };
})(jQuery);
