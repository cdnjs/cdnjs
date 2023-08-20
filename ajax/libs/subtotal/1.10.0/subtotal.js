(function() {
  var callWithJQuery,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  callWithJQuery = function(pivotModule) {
    if (typeof exports === "object" && typeof module === "object") {
      return pivotModule(require("jquery"));
    } else if (typeof define === "function" && define.amd) {
      return define(["jquery"], pivotModule);
    } else {
      return pivotModule(jQuery);
    }
  };

  callWithJQuery(function($) {
    var SubtotalPivotData, SubtotalRenderer, aggregatorTemplates, subtotalAggregatorTemplates, usFmtPct;
    SubtotalPivotData = (function(superClass) {
      var processKey;

      extend(SubtotalPivotData, superClass);

      function SubtotalPivotData(input, opts) {
        SubtotalPivotData.__super__.constructor.call(this, input, opts);
      }

      processKey = function(record, totals, keys, attrs, getAggregator) {
        var addKey, attr, flatKey, k, key, len, ref;
        key = [];
        addKey = false;
        for (k = 0, len = attrs.length; k < len; k++) {
          attr = attrs[k];
          key.push((ref = record[attr]) != null ? ref : "null");
          flatKey = key.join(String.fromCharCode(0));
          if (!totals[flatKey]) {
            totals[flatKey] = getAggregator(key.slice());
            addKey = true;
          }
          totals[flatKey].push(record);
        }
        if (addKey) {
          keys.push(key);
        }
        return key;
      };

      SubtotalPivotData.prototype.processRecord = function(record) {
        var colKey, fColKey, fRowKey, flatColKey, flatRowKey, i, j, k, m, n, ref, results, rowKey;
        rowKey = [];
        colKey = [];
        this.allTotal.push(record);
        rowKey = processKey(record, this.rowTotals, this.rowKeys, this.rowAttrs, (function(_this) {
          return function(key) {
            return _this.aggregator(_this, key, []);
          };
        })(this));
        colKey = processKey(record, this.colTotals, this.colKeys, this.colAttrs, (function(_this) {
          return function(key) {
            return _this.aggregator(_this, [], key);
          };
        })(this));
        m = rowKey.length - 1;
        n = colKey.length - 1;
        if (m < 0 || n < 0) {
          return;
        }
        results = [];
        for (i = k = 0, ref = m; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
          fRowKey = rowKey.slice(0, i + 1);
          flatRowKey = fRowKey.join(String.fromCharCode(0));
          if (!this.tree[flatRowKey]) {
            this.tree[flatRowKey] = {};
          }
          results.push((function() {
            var l, ref1, results1;
            results1 = [];
            for (j = l = 0, ref1 = n; 0 <= ref1 ? l <= ref1 : l >= ref1; j = 0 <= ref1 ? ++l : --l) {
              fColKey = colKey.slice(0, j + 1);
              flatColKey = fColKey.join(String.fromCharCode(0));
              if (!this.tree[flatRowKey][flatColKey]) {
                this.tree[flatRowKey][flatColKey] = this.aggregator(this, fRowKey, fColKey);
              }
              results1.push(this.tree[flatRowKey][flatColKey].push(record));
            }
            return results1;
          }).call(this));
        }
        return results;
      };

      return SubtotalPivotData;

    })($.pivotUtilities.PivotData);
    $.pivotUtilities.SubtotalPivotData = SubtotalPivotData;
    SubtotalRenderer = function(pivotData, opts) {
      var addClass, allTotal, arrowCollapsed, arrowExpanded, buildColHeaderHeader, buildColHeaderHeaders, buildColHeaderHeadersClickEvents, buildColHeaders, buildColTotals, buildColTotalsHeader, buildGrandTotal, buildRowHeaderHeaders, buildRowHeaderHeadersClickEvents, buildRowHeaders, buildRowTotalsHeader, buildValues, classColCollapsed, classColExpanded, classColHide, classColShow, classCollapsed, classExpanded, classRowCollapsed, classRowExpanded, classRowHide, classRowShow, clickStatusCollapsed, clickStatusExpanded, colAttrs, colDisableAfter, colKeys, colTotals, collapseCol, collapseColsAt, collapseHideDescendantRow, collapseRow, collapseRowsAt, collapseShowColSubtotal, collapseShowRowSubtotal, createElement, defaults, expandChildCol, expandChildRow, expandCol, expandColsAt, expandHideColSubtotal, expandHideRowSubtotal, expandRow, expandRowsAt, expandShowColSubtotal, expandShowRowSubtotal, getTableEventHandlers, hasClass, hideDescendantCol, isColDisable, isColDisableExpandCollapse, isColHideOnExpand, isRowDisable, isRowDisableExpandCollapse, isRowHideOnExpand, main, processKeys, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, removeClass, replaceClass, rowAttrs, rowDisableAfter, rowKeys, rowTotals, setAttributes, showChildCol, showChildRow, toggleCol, toggleColHeaderHeader, toggleRow, toggleRowHeaderHeader, tree;
      defaults = {
        table: {
          clickCallback: null
        },
        localeStrings: {
          totals: "Totals"
        }
      };
      opts = $.extend(true, {}, defaults, opts);
      isRowDisable = (ref = opts.rowSubtotalDisplay) != null ? ref.disableSubtotal : void 0;
      isRowHideOnExpand = (ref1 = opts.rowSubtotalDisplay) != null ? ref1.hideOnExpand : void 0;
      isRowDisableExpandCollapse = (ref2 = opts.rowSubtotalDisplay) != null ? ref2.disableExpandCollapse : void 0;
      rowDisableAfter = (ref3 = opts.rowSubtotalDisplay) != null ? ref3.disableAfter != null ? ref3.disableAfter : ref3.disableAfter = 9999 : void 0;
      isColDisable = (ref4 = opts.colSubtotalDisplay) != null ? ref4.disableSubtotal : void 0;
      isColHideOnExpand = (ref5 = opts.colSubtotalDisplay) != null ? ref5.hideOnExpand : void 0;
      isColDisableExpandCollapse = (ref6 = opts.colSubtotalDisplay) != null ? ref6.disableExpandCollapse : void 0;
      colDisableAfter = (ref7 = opts.colSubtotalDisplay) != null ? ref7.disableAfter != null ? ref7.disableAfter : ref7.disableAfter = 9999 : void 0;
      arrowCollapsed = opts.arrowCollapsed != null ? opts.arrowCollapsed : opts.arrowCollapsed = "\u25B6";
      arrowExpanded = opts.arrowExpanded != null ? opts.arrowExpanded : opts.arrowExpanded = "\u25E2";
      colAttrs = pivotData.colAttrs;
      rowAttrs = pivotData.rowAttrs;
      rowKeys = pivotData.getRowKeys();
      colKeys = pivotData.getColKeys();
      tree = pivotData.tree;
      rowTotals = pivotData.rowTotals;
      colTotals = pivotData.colTotals;
      allTotal = pivotData.allTotal;
      classRowExpanded = "rowexpanded";
      classRowCollapsed = "rowcollapsed";
      classRowHide = "rowhide";
      classRowShow = "rowshow";
      classColExpanded = "colexpanded";
      classColCollapsed = "colcollapsed";
      classColHide = "colhide";
      classColShow = "colshow";
      clickStatusExpanded = "expanded";
      clickStatusCollapsed = "collapsed";
      classExpanded = "expanded";
      classCollapsed = "collapsed";
      hasClass = function(element, className) {
        var regExp;
        regExp = new RegExp("(?:^|\\s)" + className + "(?!\\S)", "g");
        return element.className.match(regExp) !== null;
      };
      removeClass = function(element, className) {
        var k, len, name, ref8, regExp, results;
        ref8 = className.split(" ");
        results = [];
        for (k = 0, len = ref8.length; k < len; k++) {
          name = ref8[k];
          regExp = new RegExp("(?:^|\\s)" + name + "(?!\\S)", "g");
          results.push(element.className = element.className.replace(regExp, ''));
        }
        return results;
      };
      addClass = function(element, className) {
        var k, len, name, ref8, results;
        ref8 = className.split(" ");
        results = [];
        for (k = 0, len = ref8.length; k < len; k++) {
          name = ref8[k];
          if (!hasClass(element, name)) {
            results.push(element.className += " " + name);
          } else {
            results.push(void 0);
          }
        }
        return results;
      };
      replaceClass = function(element, replaceClassName, byClassName) {
        removeClass(element, replaceClassName);
        return addClass(element, byClassName);
      };
      getTableEventHandlers = function(value, rowValues, colValues) {
        var attr, event, eventHandlers, filters, handler, i, ref8;
        if (!opts.table && !opts.table.eventHandlers) {
          return;
        }
        eventHandlers = {};
        ref8 = opts.table.eventHandlers;
        for (event in ref8) {
          if (!hasProp.call(ref8, event)) continue;
          handler = ref8[event];
          filters = {};
          for (i in colAttrs) {
            if (!hasProp.call(colAttrs, i)) continue;
            attr = colAttrs[i];
            if (colValues[i] != null) {
              filters[attr] = colValues[i];
            }
          }
          for (i in rowAttrs) {
            if (!hasProp.call(rowAttrs, i)) continue;
            attr = rowAttrs[i];
            if (rowValues[i] != null) {
              filters[attr] = rowValues[i];
            }
          }
          eventHandlers[event] = function(e) {
            return handler(e, value, filters, pivotData);
          };
        }
        return eventHandlers;
      };
      createElement = function(elementType, className, textContent, attributes, eventHandlers) {
        var attr, e, event, handler, val;
        e = document.createElement(elementType);
        if (className != null) {
          e.className = className;
        }
        if (textContent != null) {
          e.textContent = textContent;
        }
        if (attributes != null) {
          for (attr in attributes) {
            if (!hasProp.call(attributes, attr)) continue;
            val = attributes[attr];
            e.setAttribute(attr, val);
          }
        }
        if (eventHandlers != null) {
          for (event in eventHandlers) {
            if (!hasProp.call(eventHandlers, event)) continue;
            handler = eventHandlers[event];
            e.addEventListener(event, handler);
          }
        }
        return e;
      };
      setAttributes = function(e, attrs) {
        var a, results, v;
        results = [];
        for (a in attrs) {
          if (!hasProp.call(attrs, a)) continue;
          v = attrs[a];
          results.push(e.setAttribute(a, v));
        }
        return results;
      };
      processKeys = function(keysArr, className) {
        var c, headers, k, key, lastCol, lastRow, node, nodePos, r, rMark, ref8, repeats, th, x;
        headers = [];
        lastRow = keysArr.length - 1;
        lastCol = keysArr[0].length - 1;
        rMark = [];
        th = createElement("th", className, keysArr[0][0]);
        key = [];
        key.push(keysArr[0][0]);
        nodePos = 0;
        node = {
          node: nodePos,
          row: 0,
          col: 0,
          th: th,
          parent: null,
          children: [],
          descendants: lastCol,
          leaves: 1,
          key: key,
          flatKey: key.join(String.fromCharCode(0))
        };
        headers.push(node);
        rMark[0] = node;
        c = 1;
        while (c <= lastCol) {
          th = createElement("th", className, keysArr[0][c]);
          key = key.slice();
          key.push(keysArr[0][c]);
          ++nodePos;
          node = {
            node: nodePos,
            row: 0,
            col: c,
            th: th,
            parent: rMark[c - 1],
            children: [],
            descendants: lastCol - c,
            leaves: 1,
            key: key,
            flatKey: key.join(String.fromCharCode(0))
          };
          rMark[c] = node;
          rMark[c - 1].children.push(node);
          ++c;
        }
        rMark[lastCol].leaves = 0;
        r = 1;
        while (r <= lastRow) {
          repeats = true;
          key = [];
          c = 0;
          while (c <= lastCol) {
            key = key.slice();
            key.push(keysArr[r][c]);
            if ((keysArr[r][c] === keysArr[rMark[c].row][c]) && (c !== lastCol) && repeats) {
              repeats = true;
              ++c;
              continue;
            }
            th = createElement("th", className, keysArr[r][c]);
            ++nodePos;
            node = {
              node: nodePos,
              row: r,
              col: c,
              th: th,
              parent: null,
              children: [],
              descendants: 0,
              leaves: 0,
              key: key,
              flatKey: key.join(String.fromCharCode(0))
            };
            if (c === 0) {
              headers.push(node);
            } else {
              node.parent = rMark[c - 1];
              rMark[c - 1].children.push(node);
              x = 0;
              while (x <= c - 1) {
                ++rMark[x].descendants;
                ++x;
              }
            }
            rMark[c] = node;
            repeats = false;
            ++c;
          }
          for (c = k = 0, ref8 = lastCol; 0 <= ref8 ? k <= ref8 : k >= ref8; c = 0 <= ref8 ? ++k : --k) {
            ++rMark[c].leaves;
          }
          rMark[lastCol].leaves = 0;
          ++r;
        }
        return headers;
      };
      buildColHeaderHeader = function(thead, colHeaderHeaders, rowAttrs, colAttrs, tr, col) {
        var className, colAttr, textContent, th;
        colAttr = colAttrs[col];
        textContent = colAttr;
        className = "pvtAxisLabel";
        if (col < colAttrs.length - 1) {
          className += " expanded";
          if (!(isColDisableExpandCollapse || isColDisable || col > colDisableAfter)) {
            textContent = " " + arrowExpanded + " " + colAttr;
          }
        }
        th = createElement("th", className, textContent);
        th.setAttribute("data-colAttr", colAttr);
        tr.appendChild(th);
        colHeaderHeaders.push({
          tr: tr,
          th: th,
          clickStatus: clickStatusExpanded,
          expandedCount: 0,
          nHeaders: 0
        });
        return thead.appendChild(tr);
      };
      buildColHeaderHeaders = function(thead, colHeaderHeaders, rowAttrs, colAttrs) {
        var c, k, ref8, results, tr;
        tr = createElement("tr");
        if (rowAttrs.length !== 0) {
          tr.appendChild(createElement("th", null, null, {
            colspan: rowAttrs.length,
            rowspan: colAttrs.length
          }));
        }
        buildColHeaderHeader(thead, colHeaderHeaders, rowAttrs, colAttrs, tr, 0);
        results = [];
        for (c = k = 1, ref8 = colAttrs.length; 1 <= ref8 ? k <= ref8 : k >= ref8; c = 1 <= ref8 ? ++k : --k) {
          if (!(c < colAttrs.length)) {
            continue;
          }
          tr = createElement("tr");
          results.push(buildColHeaderHeader(thead, colHeaderHeaders, rowAttrs, colAttrs, tr, c));
        }
        return results;
      };
      buildColHeaderHeadersClickEvents = function(colHeaderHeaders, colHeaderCols, colAttrs) {
        var colAttr, i, k, n, ref8, results, th;
        n = colAttrs.length - 1;
        results = [];
        for (i = k = 0, ref8 = n; 0 <= ref8 ? k <= ref8 : k >= ref8; i = 0 <= ref8 ? ++k : --k) {
          if (!(i < n)) {
            continue;
          }
          th = colHeaderHeaders[i].th;
          colAttr = colAttrs[i];
          results.push(th.onclick = function(event) {
            event = event || window.event;
            return toggleColHeaderHeader(colHeaderHeaders, colHeaderCols, colAttrs, event.target.getAttribute("data-colAttr"));
          });
        }
        return results;
      };
      buildColHeaders = function(colHeaderHeaders, colHeaderCols, colHeader, rowAttrs, colAttrs) {
        var colspan, h, hh, isColSubtotal, k, len, ref8, rowspan, sTh, style, th, tr;
        ref8 = colHeader.children;
        for (k = 0, len = ref8.length; k < len; k++) {
          h = ref8[k];
          buildColHeaders(colHeaderHeaders, colHeaderCols, h, rowAttrs, colAttrs);
        }
        isColSubtotal = colHeader.children.length !== 0;
        colHeader.node = colHeaderCols.length;
        hh = colHeaderHeaders[colHeader.col];
        ++hh.expandedCount;
        ++hh.nHeaders;
        tr = hh.tr;
        th = colHeader.th;
        addClass(th, "col" + colHeader.row + " colcol" + colHeader.col + " " + classColShow);
        if (isColHideOnExpand || isColDisable || (isColSubtotal && colHeader.col > colDisableAfter)) {
          colspan = colHeader.leaves;
        } else if (isColSubtotal && colHeader.col <= colDisableAfter) {
          colspan = colHeader.leaves + 1;
        } else {
          colspan = colHeader.descendants + 1;
        }
        setAttributes(th, {
          "rowspan": colHeader.col === colAttrs.length - 1 && rowAttrs.length !== 0 ? 2 : 1,
          "colspan": colspan,
          "data-colnode": colHeader.node,
          "data-colHeader": th.textContent
        });
        if (isColSubtotal) {
          addClass(th, classColExpanded);
          if (!(isColDisableExpandCollapse || isColDisable || colHeader.col > colDisableAfter)) {
            th.textContent = " " + arrowExpanded + " " + th.textContent;
          }
          th.onclick = function(event) {
            event = event || window.event;
            return toggleCol(colHeaderHeaders, colHeaderCols, parseInt(event.target.getAttribute("data-colnode")));
          };
          rowspan = colAttrs.length - (colHeader.col + 1) + (rowAttrs.length !== 0 ? 1 : 0);
          style = "pvtColLabel pvtColSubtotal " + classColExpanded;
          style += " col" + colHeader.row + " colcol" + colHeader.col;
          if (isColHideOnExpand || isColDisable || colHeader.col > colDisableAfter) {
            style += " " + classColHide;
          }
          sTh = createElement("th", style, '', {
            "rowspan": rowspan,
            "data-colnode": colHeader.node
          });
          addClass(sTh, isColHideOnExpand || isColDisable ? " " + classColHide : " " + classColShow);
          if (isColHideOnExpand || isColDisable || colHeader.col > colDisableAfter) {
            sTh.style.display = "none";
          }
          colHeader.children[0].tr.appendChild(sTh);
          colHeader.sTh = sTh;
        }
        colHeader.clickStatus = clickStatusExpanded;
        tr.appendChild(th);
        colHeader.tr = tr;
        return colHeaderCols.push(colHeader);
      };
      buildRowHeaderHeaders = function(thead, rowHeaderHeaders, rowAttrs, colAttrs) {
        var className, i, rowAttr, textContent, th, tr;
        tr = createElement("tr");
        rowHeaderHeaders.hh = [];
        for (i in rowAttrs) {
          if (!hasProp.call(rowAttrs, i)) continue;
          rowAttr = rowAttrs[i];
          textContent = rowAttr;
          className = "pvtAxisLabel";
          if (i < rowAttrs.length - 1) {
            className += " expanded";
            if (!(isRowDisableExpandCollapse || isRowDisable || i > rowDisableAfter)) {
              textContent = " " + arrowExpanded + " " + rowAttr;
            }
          }
          th = createElement("th", className, textContent);
          th.setAttribute("data-rowAttr", rowAttr);
          tr.appendChild(th);
          rowHeaderHeaders.hh.push({
            th: th,
            clickStatus: clickStatusExpanded,
            expandedCount: 0,
            nHeaders: 0
          });
        }
        if (colAttrs.length !== 0) {
          th = createElement("th");
          tr.appendChild(th);
        }
        thead.appendChild(tr);
        return rowHeaderHeaders.tr = tr;
      };
      buildRowHeaderHeadersClickEvents = function(rowHeaderHeaders, rowHeaderRows, rowAttrs) {
        var i, k, n, ref8, results, rowAttr, th;
        n = rowAttrs.length - 1;
        results = [];
        for (i = k = 0, ref8 = n; 0 <= ref8 ? k <= ref8 : k >= ref8; i = 0 <= ref8 ? ++k : --k) {
          if (!(i < n)) {
            continue;
          }
          th = rowHeaderHeaders.hh[i];
          rowAttr = rowAttrs[i];
          results.push(th.th.onclick = function(event) {
            event = event || window.event;
            return toggleRowHeaderHeader(rowHeaderHeaders, rowHeaderRows, rowAttrs, event.target.getAttribute("data-rowAttr"));
          });
        }
        return results;
      };
      buildRowTotalsHeader = function(tr, rowAttrs, colAttrs) {
        var rowspan, th;
        rowspan = 1;
        if (colAttrs.length !== 0) {
          rowspan = colAttrs.length + (rowAttrs.length === 0 ? 0 : 1);
        }
        th = createElement("th", "pvtTotalLabel rowTotal", opts.localeStrings.totals, {
          rowspan: rowspan
        });
        return tr.appendChild(th);
      };
      buildRowHeaders = function(tbody, rowHeaderHeaders, rowHeaderRows, rowHeader, rowAttrs, colAttrs) {
        var colspan, h, hh, isRowSubtotal, k, len, ref8, results, style, th, tr;
        hh = rowHeaderHeaders.hh[rowHeader.col];
        ++hh.expandedCount;
        ++hh.nHeaders;
        tr = createElement("tr", "pvtRowSubtotal row" + rowHeader.row, "", {
          "data-rownode": rowHeader.node
        });
        th = rowHeader.th;
        isRowSubtotal = rowHeader.children.length !== 0;
        addClass(th, "row" + rowHeader.row + " rowcol" + rowHeader.col + " " + classRowShow);
        setAttributes(th, {
          "data-rowHeader": th.textContent,
          "data-rownode": rowHeader.node,
          "rowspan": rowHeader.descendants + 1,
          "colspan": rowHeader.col === rowAttrs.length - 1 && colAttrs.length !== 0 ? 2 : 1
        });
        tr.appendChild(th);
        if (isRowSubtotal) {
          addClass(tr, classRowExpanded);
          addClass(th, classRowExpanded);
          if (!(isRowDisableExpandCollapse || isRowDisable || rowHeader.col > rowDisableAfter)) {
            th.textContent = " " + arrowExpanded + " " + th.textContent;
          }
          th.onclick = function(event) {
            event = event || window.event;
            return toggleRow(rowHeaderHeaders, rowHeaderRows, parseInt(event.target.getAttribute("data-rownode")));
          };
          colspan = rowAttrs.length - (rowHeader.col + 1) + (colAttrs.length !== 0 ? 1 : 0);
          style = "pvtRowLabel pvtRowSubtotal " + classRowExpanded;
          style += " row" + rowHeader.row + " rowcol" + rowHeader.col;
          style += isRowHideOnExpand || isRowDisable || rowHeader.col > rowDisableAfter ? " " + classRowHide : " " + classRowShow;
          th = createElement("th", style, '', {
            "colspan": colspan,
            "data-rownode": rowHeader.node
          });
          if (isRowHideOnExpand || isRowDisable || rowHeader.col > rowDisableAfter) {
            th.style.display = "none";
          }
          tr.appendChild(th);
        }
        rowHeader.clickStatus = clickStatusExpanded;
        rowHeader.tr = tr;
        rowHeaderRows.push(rowHeader);
        tbody.appendChild(tr);
        ref8 = rowHeader.children;
        results = [];
        for (k = 0, len = ref8.length; k < len; k++) {
          h = ref8[k];
          results.push(buildRowHeaders(tbody, rowHeaderHeaders, rowHeaderRows, h, rowAttrs, colAttrs));
        }
        return results;
      };
      buildValues = function(rowHeaderRows, colHeaderCols) {
        var aggregator, colHeader, eventHandlers, flatColKey, flatRowKey, isColSubtotal, isRowSubtotal, k, l, len, len1, ref8, results, rowHeader, style, td, totalAggregator, tr, val;
        results = [];
        for (k = 0, len = rowHeaderRows.length; k < len; k++) {
          rowHeader = rowHeaderRows[k];
          tr = rowHeader.tr;
          flatRowKey = rowHeader.flatKey;
          isRowSubtotal = rowHeader.children.length !== 0;
          for (l = 0, len1 = colHeaderCols.length; l < len1; l++) {
            colHeader = colHeaderCols[l];
            flatColKey = colHeader.flatKey;
            aggregator = (ref8 = tree[flatRowKey][flatColKey]) != null ? ref8 : {
              value: (function() {
                return null;
              }),
              format: function() {
                return "";
              }
            };
            val = aggregator.value();
            isColSubtotal = colHeader.children.length !== 0;
            style = "pvtVal";
            if (isColSubtotal) {
              style += " pvtColSubtotal " + classColExpanded;
            }
            if (isRowSubtotal) {
              style += " pvtRowSubtotal " + classRowExpanded;
            }
            style += isRowSubtotal && (isRowHideOnExpand || isRowDisable || rowHeader.col > rowDisableAfter) ? " " + classRowHide : " " + classRowShow;
            style += isColSubtotal && (isColHideOnExpand || isColDisable || colHeader.col > colDisableAfter) ? " " + classColHide : " " + classColShow;
            style += (" row" + rowHeader.row) + (" col" + colHeader.row) + (" rowcol" + rowHeader.col) + (" colcol" + colHeader.col);
            eventHandlers = getTableEventHandlers(val, rowHeader.key, colHeader.key);
            td = createElement("td", style, aggregator.format(val), {
              "data-value": val,
              "data-rownode": rowHeader.node,
              "data-colnode": colHeader.node
            }, eventHandlers);
            if ((isRowSubtotal && (isRowHideOnExpand || isRowDisable || rowHeader.col > rowDisableAfter)) || (isColSubtotal && (isColHideOnExpand || isColDisable || colHeader.col > colDisableAfter))) {
              td.style.display = "none";
            }
            tr.appendChild(td);
          }
          totalAggregator = rowTotals[flatRowKey];
          val = totalAggregator.value();
          style = "pvtTotal rowTotal";
          if (isRowSubtotal) {
            style += " pvtRowSubtotal";
          }
          style += isRowSubtotal && (isRowHideOnExpand || isRowDisable || rowHeader.col > rowDisableAfter) ? " " + classRowHide : " " + classRowShow;
          style += " row" + rowHeader.row + " rowcol" + rowHeader.col;
          td = createElement("td", style, totalAggregator.format(val), {
            "data-value": val,
            "data-row": "row" + rowHeader.row,
            "data-rowcol": "col" + rowHeader.col,
            "data-rownode": rowHeader.node
          }, getTableEventHandlers(val, rowHeader.key, []));
          if (isRowSubtotal && (isRowHideOnExpand || isRowDisable || rowHeader.col > rowDisableAfter)) {
            td.style.display = "none";
          }
          results.push(tr.appendChild(td));
        }
        return results;
      };
      buildColTotalsHeader = function(rowAttrs, colAttrs) {
        var colspan, th, tr;
        tr = createElement("tr");
        colspan = rowAttrs.length + (colAttrs.length === 0 ? 0 : 1);
        th = createElement("th", "pvtTotalLabel colTotal", opts.localeStrings.totals, {
          colspan: colspan
        });
        tr.appendChild(th);
        return tr;
      };
      buildColTotals = function(tr, colHeaderCols) {
        var h, isColSubtotal, k, len, results, style, td, totalAggregator, val;
        results = [];
        for (k = 0, len = colHeaderCols.length; k < len; k++) {
          h = colHeaderCols[k];
          isColSubtotal = h.children.length !== 0;
          totalAggregator = colTotals[h.flatKey];
          val = totalAggregator.value();
          style = "pvtVal pvtTotal colTotal";
          if (isColSubtotal) {
            style += " pvtColSubtotal";
          }
          style += " " + classColExpanded;
          style += " col" + h.row + " colcol" + h.col;
          td = createElement("td", style, totalAggregator.format(val), {
            "data-value": val,
            "data-for": "col" + h.col,
            "data-colnode": "" + h.node
          }, getTableEventHandlers(val, [], h.key));
          if (isColSubtotal && (isColHideOnExpand || isColDisable || h.col > colDisableAfter)) {
            td.style.display = "none";
          }
          results.push(tr.appendChild(td));
        }
        return results;
      };
      buildGrandTotal = function(result, tr) {
        var td, totalAggregator, val;
        totalAggregator = allTotal;
        val = totalAggregator.value();
        td = createElement("td", "pvtGrandTotal", totalAggregator.format(val), {
          "data-value": val
        }, getTableEventHandlers(val, [], []));
        tr.appendChild(td);
        return result.appendChild(tr);
      };
      hideDescendantCol = function(d) {
        return $(d.th).closest('table.pvtTable').find("tbody tr td[data-colnode=\"" + d.node + "\"], th[data-colnode=\"" + d.node + "\"]").removeClass(classColShow).addClass(classColHide).css('display', "none");
      };
      collapseShowColSubtotal = function(h) {
        $(h.th).closest('table.pvtTable').find("tbody tr td[data-colnode=\"" + h.node + "\"], th[data-colnode=\"" + h.node + "\"]").removeClass(classColExpanded + " " + classColHide).addClass(classColCollapsed + " " + classColShow).not(".pvtRowSubtotal." + classRowHide).css('display', "");
        h.th.textContent = " " + arrowCollapsed + " " + h.th.getAttribute("data-colheader");
        return h.th.colSpan = 1;
      };
      collapseCol = function(colHeaderHeaders, colHeaderCols, c) {
        var colHeaderHeader, colspan, d, h, i, isColSubtotal, k, l, p, ref10, ref8, ref9, results;
        if (isColDisable) {
          return;
        }
        if (isColDisableExpandCollapse) {
          return;
        }
        if (!colHeaderCols[c]) {
          return;
        }
        h = colHeaderCols[c];
        if (h.col > colDisableAfter) {
          return;
        }
        if (h.clickStatus === clickStatusCollapsed) {
          return;
        }
        isColSubtotal = h.descendants !== 0;
        colspan = h.th.colSpan;
        for (i = k = 1, ref8 = h.descendants; 1 <= ref8 ? k <= ref8 : k >= ref8; i = 1 <= ref8 ? ++k : --k) {
          if (!(h.descendants !== 0)) {
            continue;
          }
          d = colHeaderCols[c - i];
          hideDescendantCol(d);
        }
        if (isColSubtotal) {
          collapseShowColSubtotal(h);
          --colspan;
        }
        p = h.parent;
        while (p !== null) {
          p.th.colSpan -= colspan;
          p = p.parent;
        }
        h.clickStatus = clickStatusCollapsed;
        colHeaderHeader = colHeaderHeaders[h.col];
        colHeaderHeader.expandedCount--;
        if (colHeaderHeader.expandedCount === 0) {
          results = [];
          for (i = l = ref9 = h.col, ref10 = colHeaderHeaders.length - 2; ref9 <= ref10 ? l <= ref10 : l >= ref10; i = ref9 <= ref10 ? ++l : --l) {
            if (!(i <= colDisableAfter)) {
              continue;
            }
            colHeaderHeader = colHeaderHeaders[i];
            replaceClass(colHeaderHeader.th, classExpanded, classCollapsed);
            colHeaderHeader.th.textContent = " " + arrowCollapsed + " " + colHeaderHeader.th.getAttribute("data-colAttr");
            results.push(colHeaderHeader.clickStatus = clickStatusCollapsed);
          }
          return results;
        }
      };
      showChildCol = function(ch) {
        return $(ch.th).closest('table.pvtTable').find("tbody tr td[data-colnode=\"" + ch.node + "\"], th[data-colnode=\"" + ch.node + "\"]").removeClass(classColHide).addClass(classColShow).not(".pvtRowSubtotal." + classRowHide).css('display', "");
      };
      expandHideColSubtotal = function(h) {
        $(h.th).closest('table.pvtTable').find("tbody tr td[data-colnode=\"" + h.node + "\"], th[data-colnode=\"" + h.node + "\"]").removeClass(classColCollapsed + " " + classColShow).addClass(classColExpanded + " " + classColHide).css('display', "none");
        return h.th.style.display = "";
      };
      expandShowColSubtotal = function(h) {
        $(h.th).closest('table.pvtTable').find("tbody tr td[data-colnode=\"" + h.node + "\"], th[data-colnode=\"" + h.node + "\"]").removeClass(classColCollapsed + " " + classColHide).addClass(classColExpanded + " " + classColShow).not(".pvtRowSubtotal." + classRowHide).css('display', "");
        h.th.style.display = "";
        ++h.th.colSpan;
        if (h.sTh != null) {
          return h.sTh.style.display = "";
        }
      };
      expandChildCol = function(ch) {
        var gch, k, len, ref8, results;
        if (ch.descendants !== 0 && hasClass(ch.th, classColExpanded) && (isColHideOnExpand || isColDisable || ch.col > colDisableAfter)) {
          ch.th.style.display = "";
        } else {
          showChildCol(ch);
        }
        if (ch.clickStatus !== clickStatusCollapsed) {
          ref8 = ch.children;
          results = [];
          for (k = 0, len = ref8.length; k < len; k++) {
            gch = ref8[k];
            results.push(expandChildCol(gch));
          }
          return results;
        }
      };
      expandCol = function(colHeaderHeaders, colHeaderCols, c) {
        var ch, colspan, h, hh, isColSubtotal, k, len, p, ref8;
        if (isColDisable) {
          return;
        }
        if (isColDisableExpandCollapse) {
          return;
        }
        if (!colHeaderCols[c]) {
          return;
        }
        h = colHeaderCols[c];
        if (h.col > colDisableAfter) {
          return;
        }
        if (h.clickStatus === clickStatusExpanded) {
          return;
        }
        isColSubtotal = h.descendants !== 0;
        colspan = 0;
        ref8 = h.children;
        for (k = 0, len = ref8.length; k < len; k++) {
          ch = ref8[k];
          expandChildCol(ch);
          colspan += ch.th.colSpan;
        }
        h.th.colSpan = colspan;
        if (isColSubtotal) {
          replaceClass(h.th, classColCollapsed, classColExpanded);
          h.th.textContent = " " + arrowExpanded + " " + h.th.getAttribute("data-colHeader");
          if (isColHideOnExpand) {
            expandHideColSubtotal(h);
            --colspan;
          } else {
            expandShowColSubtotal(h);
          }
        }
        p = h.parent;
        while (p) {
          p.th.colSpan += colspan;
          p = p.parent;
        }
        h.clickStatus = clickStatusExpanded;
        hh = colHeaderHeaders[h.col];
        ++hh.expandedCount;
        if (hh.expandedCount === hh.nHeaders) {
          replaceClass(hh.th, classCollapsed, classExpanded);
          hh.th.textContent = " " + arrowExpanded + " " + hh.th.getAttribute("data-colAttr");
          return hh.clickStatus = clickStatusExpanded;
        }
      };
      collapseHideDescendantRow = function(h) {
        var cell, cells, k, len, ref8, results, tagName;
        h.tr.style.display = "none";
        ref8 = ["td", "th"];
        results = [];
        for (k = 0, len = ref8.length; k < len; k++) {
          tagName = ref8[k];
          cells = h.tr.getElementsByTagName(tagName);
          results.push((function() {
            var l, len1, results1;
            results1 = [];
            for (l = 0, len1 = cells.length; l < len1; l++) {
              cell = cells[l];
              replaceClass(cell, classRowShow, classRowHide);
              results1.push(cell.style.display = "none");
            }
            return results1;
          })());
        }
        return results;
      };
      collapseShowRowSubtotal = function(h) {
        var cell, cells, k, l, len, len1, ref8, tagName;
        ref8 = ["td", "th"];
        for (k = 0, len = ref8.length; k < len; k++) {
          tagName = ref8[k];
          cells = h.tr.getElementsByTagName(tagName);
          for (l = 0, len1 = cells.length; l < len1; l++) {
            cell = cells[l];
            removeClass(cell, classRowExpanded + " " + classRowHide);
            addClass(cell, classRowCollapsed + " " + classRowShow);
            if (!hasClass(cell, classColHide)) {
              cell.style.display = "";
            }
          }
        }
        h.th.rowSpan = 1;
        h.th.textContent = " " + arrowCollapsed + " " + h.th.getAttribute("data-rowHeader");
        return replaceClass(h.tr, classRowExpanded, classRowCollapsed);
      };
      collapseRow = function(rowHeaderHeaders, rowHeaderRows, r) {
        var d, h, i, isRowSubtotal, j, k, l, p, ref10, ref8, ref9, results, rowHeaderHeader, rowspan;
        if (isRowDisable) {
          return;
        }
        if (isRowDisableExpandCollapse) {
          return;
        }
        if (!rowHeaderRows[r]) {
          return;
        }
        h = rowHeaderRows[r];
        if (h.col > rowDisableAfter) {
          return;
        }
        if (h.clickStatus === clickStatusCollapsed) {
          return;
        }
        isRowSubtotal = h.descendants !== 0;
        rowspan = h.th.rowSpan;
        for (i = k = 1, ref8 = h.descendants; 1 <= ref8 ? k <= ref8 : k >= ref8; i = 1 <= ref8 ? ++k : --k) {
          if (!(h.descendants !== 0)) {
            continue;
          }
          d = rowHeaderRows[r + i];
          collapseHideDescendantRow(d);
        }
        if (isRowSubtotal) {
          collapseShowRowSubtotal(h);
          --rowspan;
        }
        p = h.parent;
        while (p) {
          p.th.rowSpan -= rowspan;
          p = p.parent;
        }
        h.clickStatus = clickStatusCollapsed;
        rowHeaderHeader = rowHeaderHeaders.hh[h.col];
        rowHeaderHeader.expandedCount--;
        if (rowHeaderHeader.expandedCount !== 0) {
          return;
        }
        results = [];
        for (j = l = ref9 = h.col, ref10 = rowHeaderHeaders.hh.length - 2; ref9 <= ref10 ? l <= ref10 : l >= ref10; j = ref9 <= ref10 ? ++l : --l) {
          if (!(j <= rowDisableAfter)) {
            continue;
          }
          rowHeaderHeader = rowHeaderHeaders.hh[j];
          replaceClass(rowHeaderHeader.th, classExpanded, classCollapsed);
          rowHeaderHeader.th.textContent = " " + arrowCollapsed + " " + rowHeaderHeader.th.getAttribute("data-rowAttr");
          results.push(rowHeaderHeader.clickStatuatus = clickStatusCollapsed);
        }
        return results;
      };
      showChildRow = function(h) {
        var cell, cells, k, l, len, len1, ref8, tagName;
        ref8 = ["td", "th"];
        for (k = 0, len = ref8.length; k < len; k++) {
          tagName = ref8[k];
          cells = h.tr.getElementsByTagName(tagName);
          for (l = 0, len1 = cells.length; l < len1; l++) {
            cell = cells[l];
            replaceClass(cell, classRowHide, classRowShow);
            if (!hasClass(cell, classColHide)) {
              cell.style.display = "";
            }
          }
        }
        return h.tr.style.display = "";
      };
      expandShowRowSubtotal = function(h) {
        var cell, cells, k, l, len, len1, ref8, tagName;
        ref8 = ["td", "th"];
        for (k = 0, len = ref8.length; k < len; k++) {
          tagName = ref8[k];
          cells = h.tr.getElementsByTagName(tagName);
          for (l = 0, len1 = cells.length; l < len1; l++) {
            cell = cells[l];
            removeClass(cell, classRowCollapsed + " " + classRowHide);
            addClass(cell, classRowExpanded + " " + classRowShow);
            if (!hasClass(cell, classColHide)) {
              cell.style.display = "";
            }
          }
        }
        h.th.textContent = " " + arrowExpanded + " " + h.th.getAttribute("data-rowHeader");
        return replaceClass(h.tr, classRowCollapsed, classRowExpanded);
      };
      expandHideRowSubtotal = function(h) {
        var cell, cells, k, l, len, len1, ref8, tagName;
        ref8 = ["td", "th"];
        for (k = 0, len = ref8.length; k < len; k++) {
          tagName = ref8[k];
          cells = h.tr.getElementsByTagName(tagName);
          for (l = 0, len1 = cells.length; l < len1; l++) {
            cell = cells[l];
            removeClass(cell, classRowCollapsed + " " + classRowShow);
            addClass(cell, classRowExpanded + " " + classRowHide);
            cell.style.display = "none";
          }
        }
        h.th.style.display = "";
        h.th.textContent = " " + arrowExpanded + " " + h.th.getAttribute("data-rowHeader");
        return replaceClass(h.tr, classRowCollapsed, classRowExpanded);
      };
      expandChildRow = function(ch) {
        var gch, k, len, ref8, results;
        if (ch.descendants !== 0 && hasClass(ch.th, classRowExpanded) && (isRowHideOnExpand || isRowDisable || ch.col > rowDisableAfter)) {
          ch.tr.style.display = "";
          ch.th.style.display = "";
        } else {
          showChildRow(ch);
        }
        if (ch.clickStatus !== clickStatusCollapsed) {
          ref8 = ch.children;
          results = [];
          for (k = 0, len = ref8.length; k < len; k++) {
            gch = ref8[k];
            results.push(expandChildRow(gch));
          }
          return results;
        }
      };
      expandRow = function(rowHeaderHeaders, rowHeaderRows, r) {
        var ch, h, hh, isRowSubtotal, k, len, p, ref8, rowspan;
        if (isRowDisable) {
          return;
        }
        if (isRowDisableExpandCollapse) {
          return;
        }
        if (!rowHeaderRows[r]) {
          return;
        }
        h = rowHeaderRows[r];
        if (h.col > rowDisableAfter) {
          return;
        }
        if (h.clickStatus === clickStatusExpanded) {
          return;
        }
        isRowSubtotal = h.descendants !== 0;
        rowspan = 0;
        ref8 = h.children;
        for (k = 0, len = ref8.length; k < len; k++) {
          ch = ref8[k];
          expandChildRow(ch);
          rowspan += ch.th.rowSpan;
        }
        h.th.rowSpan = rowspan + 1;
        if (isRowSubtotal) {
          if (isRowHideOnExpand) {
            expandHideRowSubtotal(h);
          } else {
            expandShowRowSubtotal(h);
          }
        }
        p = h.parent;
        while (p) {
          p.th.rowSpan += rowspan;
          p = p.parent;
        }
        h.clickStatus = clickStatusExpanded;
        hh = rowHeaderHeaders.hh[h.col];
        ++hh.expandedCount;
        if (hh.expandedCount === hh.nHeaders) {
          replaceClass(hh.th, classCollapsed, classExpanded);
          hh.th.textContent = " " + arrowExpanded + " " + hh.th.getAttribute("data-rowAttr");
          return hh.clickStatus = clickStatusExpanded;
        }
      };
      toggleCol = function(colHeaderHeaders, colHeaderCols, c) {
        var h;
        if (colHeaderCols[c] == null) {
          return;
        }
        h = colHeaderCols[c];
        if (h.clickStatus === clickStatusCollapsed) {
          expandCol(colHeaderHeaders, colHeaderCols, c);
        } else {
          collapseCol(colHeaderHeaders, colHeaderCols, c);
        }
        return h.th.scrollIntoView;
      };
      toggleRow = function(rowHeaderHeaders, rowHeaderRows, r) {
        if (rowHeaderRows[r] == null) {
          return;
        }
        if (rowHeaderRows[r].clickStatus === clickStatusCollapsed) {
          return expandRow(rowHeaderHeaders, rowHeaderRows, r);
        } else {
          return collapseRow(rowHeaderHeaders, rowHeaderRows, r);
        }
      };
      collapseColsAt = function(colHeaderHeaders, colHeaderCols, colAttrs, colAttr) {
        var h, hh, i, idx, nAttrs, nCols, results;
        if (isColDisable) {
          return;
        }
        if (typeof colAttr === 'string') {
          idx = colAttrs.indexOf(colAttr);
        } else {
          idx = colAttr;
        }
        if (idx < 0 || idx === colAttrs.length - 1) {
          return;
        }
        i = idx;
        nAttrs = colAttrs.length - 1;
        while (i < nAttrs && i <= colDisableAfter) {
          hh = colHeaderHeaders[i];
          replaceClass(hh.th, classExpanded, classCollapsed);
          hh.th.textContent = " " + arrowCollapsed + " " + colAttrs[i];
          hh.clickStatus = clickStatusCollapsed;
          ++i;
        }
        i = 0;
        nCols = colHeaderCols.length;
        results = [];
        while (i < nCols) {
          h = colHeaderCols[i];
          if (h.col === idx && h.clickStatus !== clickStatusCollapsed && h.th.style.display !== "none") {
            collapseCol(colHeaderHeaders, colHeaderCols, parseInt(h.th.getAttribute("data-colnode")));
          }
          results.push(++i);
        }
        return results;
      };
      expandColsAt = function(colHeaderHeaders, colHeaderCols, colAttrs, colAttr) {
        var colHeaderHeader, h, hh, i, idx, j, k, nCols, ref8, results;
        if (isColDisable) {
          return;
        }
        if (typeof colAttr === 'string') {
          idx = colAttrs.indexOf(colAttr);
        } else {
          idx = colAttr;
        }
        if (idx < 0 || idx === colAttrs.length - 1) {
          return;
        }
        for (i = k = 0, ref8 = idx; 0 <= ref8 ? k <= ref8 : k >= ref8; i = 0 <= ref8 ? ++k : --k) {
          if (i <= colDisableAfter) {
            hh = colHeaderHeaders[i];
            replaceClass(hh.th, classCollapsed, classExpanded);
            hh.th.textContent = " " + arrowExpanded + " " + colAttrs[i];
            hh.clickStatus = clickStatusExpanded;
          }
          j = 0;
          nCols = colHeaderCols.length;
          while (j < nCols) {
            h = colHeaderCols[j];
            if (h.col === i) {
              expandCol(colHeaderHeaders, colHeaderCols, j);
            }
            ++j;
          }
        }
        ++idx;
        results = [];
        while (idx < colAttrs.length - 1 && idx <= colDisableAfter) {
          colHeaderHeader = colHeaderHeaders[idx];
          if (colHeaderHeader.expandedCount === 0) {
            replaceClass(colHeaderHeader.th, classExpanded, classCollapsed);
            colHeaderHeader.th.textContent = " " + arrowCollapsed + " " + colAttrs[idx];
            colHeaderHeader.clickStatus = clickStatusCollapsed;
          } else if (colHeaderHeader.expandedCount === colHeaderHeader.nHeaders) {
            replaceClass(colHeaderHeader.th, classCollapsed, classExpanded);
            colHeaderHeader.th.textContent = " " + arrowExpanded + " " + colAttrs[idx];
            colHeaderHeader.clickStatus = clickStatusExpanded;
          }
          results.push(++idx);
        }
        return results;
      };
      collapseRowsAt = function(rowHeaderHeaders, rowHeaderRows, rowAttrs, rowAttr) {
        var h, i, idx, j, nAttrs, nRows, results;
        if (isRowDisable) {
          return;
        }
        if (typeof rowAttr === 'string') {
          idx = rowAttrs.indexOf(rowAttr);
        } else {
          idx = rowAttr;
        }
        if (idx < 0 || idx === rowAttrs.length - 1) {
          return;
        }
        i = idx;
        nAttrs = rowAttrs.length - 1;
        while (i < nAttrs && i <= rowDisableAfter) {
          h = rowHeaderHeaders.hh[i];
          replaceClass(h.th, classExpanded, classCollapsed);
          h.th.textContent = " " + arrowCollapsed + " " + rowAttrs[i];
          h.clickStatus = clickStatusCollapsed;
          ++i;
        }
        j = 0;
        nRows = rowHeaderRows.length;
        results = [];
        while (j < nRows) {
          h = rowHeaderRows[j];
          if (h.col === idx && h.clickStatus !== clickStatusCollapsed && h.tr.style.display !== "none") {
            collapseRow(rowHeaderHeaders, rowHeaderRows, j);
            results.push(j = j + h.descendants + 1);
          } else {
            results.push(++j);
          }
        }
        return results;
      };
      expandRowsAt = function(rowHeaderHeaders, rowHeaderRows, rowAttrs, rowAttr) {
        var h, hh, i, idx, j, k, nRows, ref8, results, rowHeaderHeader;
        if (isRowDisable) {
          return;
        }
        if (typeof rowAttr === 'string') {
          idx = rowAttrs.indexOf(rowAttr);
        } else {
          idx = rowAttr;
        }
        if (idx < 0 || idx === rowAttrs.length - 1) {
          return;
        }
        for (i = k = 0, ref8 = idx; 0 <= ref8 ? k <= ref8 : k >= ref8; i = 0 <= ref8 ? ++k : --k) {
          if (i <= rowDisableAfter) {
            hh = rowHeaderHeaders.hh[i];
            replaceClass(hh.th, classCollapsed, classExpanded);
            hh.th.textContent = " " + arrowExpanded + " " + rowAttrs[i];
            hh.clickStatus = clickStatusExpanded;
          }
          j = 0;
          nRows = rowHeaderRows.length;
          while (j < nRows) {
            h = rowHeaderRows[j];
            if (h.col === i) {
              expandRow(rowHeaderHeaders, rowHeaderRows, j);
              j += h.descendants + 1;
            } else {
              ++j;
            }
          }
        }
        ++idx;
        results = [];
        while (idx < rowAttrs.length - 1 && idx <= rowDisableAfter) {
          rowHeaderHeader = rowHeaderHeaders.hh[idx];
          if (rowHeaderHeader.expandedCount === 0) {
            replaceClass(rowHeaderHeader.th, classExpanded, classCollapsed);
            rowHeaderHeader.th.textContent = " " + arrowCollapsed + " " + rowAttrs[idx];
            rowHeaderHeader.clickStatus = clickStatusCollapsed;
          } else if (rowHeaderHeader.expandedCount === rowHeaderHeader.nHeaders) {
            replaceClass(rowHeaderHeader.th, classCollapsed, classExpanded);
            rowHeaderHeader.th.textContent = " " + arrowExpanded + " " + rowAttrs[idx];
            rowHeaderHeader.clickStatus = clickStatusExpanded;
          }
          results.push(++idx);
        }
        return results;
      };
      toggleColHeaderHeader = function(colHeaderHeaders, colHeaderCols, colAttrs, colAttr) {
        var h, idx;
        if (isColDisable) {
          return;
        }
        if (isColDisableExpandCollapse) {
          return;
        }
        idx = colAttrs.indexOf(colAttr);
        h = colHeaderHeaders[idx];
        if (h.col > colDisableAfter) {
          return;
        }
        if (h.clickStatus === clickStatusCollapsed) {
          return expandColsAt(colHeaderHeaders, colHeaderCols, colAttrs, colAttr);
        } else {
          return collapseColsAt(colHeaderHeaders, colHeaderCols, colAttrs, colAttr);
        }
      };
      toggleRowHeaderHeader = function(rowHeaderHeaders, rowHeaderRows, rowAttrs, rowAttr) {
        var idx, th;
        if (isRowDisable) {
          return;
        }
        if (isRowDisableExpandCollapse) {
          return;
        }
        idx = rowAttrs.indexOf(rowAttr);
        th = rowHeaderHeaders.hh[idx];
        if (th.col > rowDisableAfter) {
          return;
        }
        if (th.clickStatus === clickStatusCollapsed) {
          return expandRowsAt(rowHeaderHeaders, rowHeaderRows, rowAttrs, rowAttr);
        } else {
          return collapseRowsAt(rowHeaderHeaders, rowHeaderRows, rowAttrs, rowAttr);
        }
      };
      main = function(rowAttrs, rowKeys, colAttrs, colKeys) {
        var colHeaderCols, colHeaderHeaders, colHeaders, h, k, l, len, len1, result, rowHeaderHeaders, rowHeaderRows, rowHeaders, tbody, thead, tr;
        rowHeaders = [];
        colHeaders = [];
        rowHeaderHeaders = {};
        rowHeaderRows = [];
        colHeaderHeaders = [];
        colHeaderCols = [];
        if (rowAttrs.length > 0 && rowKeys.length > 0) {
          rowHeaders = processKeys(rowKeys, "pvtRowLabel");
        }
        if (colAttrs.length > 0 && colKeys.length > 0) {
          colHeaders = processKeys(colKeys, "pvtColLabel");
        }
        result = createElement("table", "pvtTable", null, {
          style: "display: none;"
        });
        thead = createElement("thead");
        result.appendChild(thead);
        if (colAttrs.length > 0) {
          buildColHeaderHeaders(thead, colHeaderHeaders, rowAttrs, colAttrs);
          for (k = 0, len = colHeaders.length; k < len; k++) {
            h = colHeaders[k];
            buildColHeaders(colHeaderHeaders, colHeaderCols, h, rowAttrs, colAttrs);
          }
          buildColHeaderHeadersClickEvents(colHeaderHeaders, colHeaderCols, colAttrs);
        }
        if (rowAttrs.length > 0) {
          buildRowHeaderHeaders(thead, rowHeaderHeaders, rowAttrs, colAttrs);
          if (colAttrs.length === 0) {
            buildRowTotalsHeader(rowHeaderHeaders.tr, rowAttrs, colAttrs);
          }
        }
        if (colAttrs.length > 0) {
          buildRowTotalsHeader(colHeaderHeaders[0].tr, rowAttrs, colAttrs);
        }
        tbody = createElement("tbody");
        result.appendChild(tbody);
        if (rowAttrs.length > 0) {
          for (l = 0, len1 = rowHeaders.length; l < len1; l++) {
            h = rowHeaders[l];
            buildRowHeaders(tbody, rowHeaderHeaders, rowHeaderRows, h, rowAttrs, colAttrs);
          }
        }
        buildRowHeaderHeadersClickEvents(rowHeaderHeaders, rowHeaderRows, rowAttrs);
        buildValues(rowHeaderRows, colHeaderCols);
        tr = buildColTotalsHeader(rowAttrs, colAttrs);
        if (colAttrs.length > 0) {
          buildColTotals(tr, colHeaderCols);
        }
        buildGrandTotal(tbody, tr);
        result.setAttribute("data-numrows", rowKeys.length);
        result.setAttribute("data-numcols", colKeys.length);
        if ((opts.collapseRowsAt == null) && (opts.collapseColsAt == null)) {
          result.style.display = "";
        }
        if (opts.collapseRowsAt != null) {
          collapseRowsAt(rowHeaderHeaders, rowHeaderRows, rowAttrs, opts.collapseRowsAt);
        }
        if (opts.collapseColsAt == null) {
          result.style.display = "";
          return result;
        }
        if (opts.collapseColsAt != null) {
          collapseColsAt(colHeaderHeaders, colHeaderCols, colAttrs, opts.collapseColsAt);
        }
        result.style.display = "";
        return result;
      };
      return main(rowAttrs, rowKeys, colAttrs, colKeys);
    };
    $.pivotUtilities.subtotal_renderers = {
      "Table With Subtotal": function(pvtData, opts) {
        return SubtotalRenderer(pvtData, opts);
      },
      "Table With Subtotal Bar Chart": function(pvtData, opts) {
        return $(SubtotalRenderer(pvtData, opts)).barchart();
      },
      "Table With Subtotal Heatmap": function(pvtData, opts) {
        return $(SubtotalRenderer(pvtData, opts)).heatmap("heatmap", opts);
      },
      "Table With Subtotal Row Heatmap": function(pvtData, opts) {
        return $(SubtotalRenderer(pvtData, opts)).heatmap("rowheatmap", opts);
      },
      "Table With Subtotal Col Heatmap": function(pvtData, opts) {
        return $(SubtotalRenderer(pvtData, opts)).heatmap("colheatmap", opts);
      }
    };
    usFmtPct = $.pivotUtilities.numberFormat({
      digitsAfterDecimal: 1,
      scaler: 100,
      suffix: "%"
    });
    aggregatorTemplates = $.pivotUtilities.aggregatorTemplates;
    subtotalAggregatorTemplates = {
      fractionOf: function(wrapped, type, formatter) {
        if (type == null) {
          type = "row";
        }
        if (formatter == null) {
          formatter = usFmtPct;
        }
        return function() {
          var x;
          x = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return function(data, rowKey, colKey) {
            if (typeof rowKey === "undefined") {
              rowKey = [];
            }
            if (typeof colKey === "undefined") {
              colKey = [];
            }
            return {
              selector: {
                row: [rowKey.slice(0, -1), []],
                col: [[], colKey.slice(0, -1)]
              }[type],
              inner: wrapped.apply(null, x)(data, rowKey, colKey),
              push: function(record) {
                return this.inner.push(record);
              },
              format: formatter,
              value: function() {
                return this.inner.value() / data.getAggregator.apply(data, this.selector).inner.value();
              },
              numInputs: wrapped.apply(null, x)().numInputs
            };
          };
        };
      }
    };
    $.pivotUtilities.subtotalAggregatorTemplates = subtotalAggregatorTemplates;
    return $.pivotUtilities.subtotal_aggregators = (function(tpl, sTpl) {
      return {
        "Sum As Fraction Of Parent Row": sTpl.fractionOf(tpl.sum(), "row", usFmtPct),
        "Sum As Fraction Of Parent Column": sTpl.fractionOf(tpl.sum(), "col", usFmtPct),
        "Count As Fraction Of Parent Row": sTpl.fractionOf(tpl.count(), "row", usFmtPct),
        "Count As Fraction Of Parent Column": sTpl.fractionOf(tpl.count(), "col", usFmtPct)
      };
    })(aggregatorTemplates, subtotalAggregatorTemplates);
  });

}).call(this);

//# sourceMappingURL=subtotal.js.map
