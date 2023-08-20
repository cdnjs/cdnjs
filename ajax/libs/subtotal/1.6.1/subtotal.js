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
      var addClass, allTotal, arrowCollapsed, arrowExpanded, buildColHeaderHeader, buildColHeaderHeaders, buildColHeaderHeadersClickEvents, buildColHeaders, buildColTotals, buildColTotalsHeader, buildGrandTotal, buildRowHeaderHeaders, buildRowHeaderHeadersClickEvents, buildRowHeaders, buildRowTotalsHeader, buildValues, classCollapsed, classExpanded, colAttrs, colKeys, colTotals, collapseCol, collapseColsAt, collapseRow, collapseRowsAt, createCell, defaults, expandChildCol, expandChildRow, expandCol, expandColsAt, expandRow, expandRowsAt, getTableEventHandlers, hasClass, main, processKeys, removeClass, replaceClass, rowAttrs, rowKeys, rowTotals, setColVisibility, toggleCol, toggleColHeaderHeader, toggleRow, toggleRowHeaderHeader, tree;
      defaults = {
        table: {
          clickCallback: null
        },
        localeStrings: {
          totals: "Totals"
        }
      };
      opts = $.extend(true, {}, defaults, opts);
      arrowCollapsed = opts.arrowCollapsed != null ? opts.arrowCollapsed : opts.arrowCollapsed = "\u25B6";
      arrowExpanded = opts.arrowExpanded != null ? opts.arrowExpanded : opts.arrowExpanded = "\u25E2";
      classExpanded = "expanded";
      classCollapsed = "collapsed";
      colAttrs = pivotData.colAttrs;
      rowAttrs = pivotData.rowAttrs;
      rowKeys = pivotData.getRowKeys();
      colKeys = pivotData.getColKeys();
      tree = pivotData.tree;
      rowTotals = pivotData.rowTotals;
      colTotals = pivotData.colTotals;
      allTotal = pivotData.allTotal;
      hasClass = function(element, className) {
        var regExp;
        regExp = new RegExp("(?:^|\\s)" + className + "(?!\\S)", "g");
        return element.className.match(regExp);
      };
      removeClass = function(element, className) {
        var regExp;
        regExp = new RegExp("(?:^|\\s)" + className + "(?!\\S)", "g");
        return element.className = element.className.replace(regExp, '');
      };
      addClass = function(element, className) {
        if (!hasClass(element, className)) {
          return element.className += " " + className;
        }
      };
      replaceClass = function(element, replaceClassName, byClassName) {
        removeClass(element, replaceClassName);
        return addClass(element, byClassName);
      };
      getTableEventHandlers = function(value, rowValues, colValues) {
        var attr, event, eventHandlers, filters, handler, i, ref;
        if (!opts.table && !opts.table.eventHandlers) {
          return;
        }
        eventHandlers = {};
        ref = opts.table.eventHandlers;
        for (event in ref) {
          if (!hasProp.call(ref, event)) continue;
          handler = ref[event];
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
      createCell = function(cellType, className, textContent, attributes, eventHandlers) {
        var attr, event, handler, th, val;
        th = document.createElement(cellType);
        if (className != null) {
          th.className = className;
        }
        if (textContent != null) {
          th.textContent = textContent;
        }
        if (attributes != null) {
          for (attr in attributes) {
            if (!hasProp.call(attributes, attr)) continue;
            val = attributes[attr];
            th.setAttribute(attr, val);
          }
        }
        if (eventHandlers != null) {
          for (event in eventHandlers) {
            if (!hasProp.call(eventHandlers, event)) continue;
            handler = eventHandlers[event];
            th.addEventListener(event, handler);
          }
        }
        return th;
      };
      processKeys = function(keysArr, className) {
        var c, headers, k, key, lastCol, lastRow, node, nodePos, r, rMark, ref, repeats, th, x;
        headers = [];
        lastRow = keysArr.length - 1;
        lastCol = keysArr[0].length - 1;
        rMark = [];
        th = createCell("th", className, keysArr[0][0]);
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
          th = createCell("th", className, keysArr[0][c]);
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
            th = createCell("th", className, keysArr[r][c]);
            ++nodePos;
            node = {
              node: nodePos,
              row: r,
              col: c,
              th: th,
              parent: null,
              children: [],
              descendants: 0,
              leaves: 1,
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
          for (c = k = 0, ref = lastCol; 0 <= ref ? k <= ref : k >= ref; c = 0 <= ref ? ++k : --k) {
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
          textContent = " " + arrowExpanded + " " + colAttr;
        }
        th = createCell("th", className, textContent);
        th.setAttribute("data-colAttr", colAttr);
        tr.appendChild(th);
        colHeaderHeaders.push({
          tr: tr,
          th: th,
          clickStatus: classExpanded,
          expandedCount: 0,
          nHeaders: 0
        });
        return thead.appendChild(tr);
      };
      buildColHeaderHeaders = function(thead, colHeaderHeaders, rowAttrs, colAttrs) {
        var c, k, ref, results, tr;
        tr = document.createElement("tr");
        if (rowAttrs.length !== 0) {
          tr.appendChild(createCell("th", null, null, {
            colspan: rowAttrs.length,
            rowspan: colAttrs.length
          }));
        }
        buildColHeaderHeader(thead, colHeaderHeaders, rowAttrs, colAttrs, tr, 0);
        results = [];
        for (c = k = 1, ref = colAttrs.length; 1 <= ref ? k <= ref : k >= ref; c = 1 <= ref ? ++k : --k) {
          if (!(c < colAttrs.length)) {
            continue;
          }
          tr = document.createElement("tr");
          results.push(buildColHeaderHeader(thead, colHeaderHeaders, rowAttrs, colAttrs, tr, c));
        }
        return results;
      };
      buildColHeaderHeadersClickEvents = function(colHeaderHeaders, colHeaderCols, colAttrs) {
        var colAttr, i, k, n, ref, results, th;
        n = colAttrs.length - 1;
        results = [];
        for (i = k = 0, ref = n; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
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
        var h, hh, k, len, ref, rowspan, style, th, tr;
        ref = colHeader.children;
        for (k = 0, len = ref.length; k < len; k++) {
          h = ref[k];
          buildColHeaders(colHeaderHeaders, colHeaderCols, h, rowAttrs, colAttrs);
        }
        hh = colHeaderHeaders[colHeader.col];
        ++hh.expandedCount;
        ++hh.nHeaders;
        tr = hh.tr;
        th = colHeader.th;
        th.setAttribute("data-colHeader", th.textContent);
        if (colHeader.col === colAttrs.length - 1 && rowAttrs.length !== 0) {
          th.setAttribute("rowspan", 2);
        }
        if (colHeader.children.length !== 0) {
          th.setAttribute("colspan", colHeader.descendants + 1);
        }
        th.setAttribute("data-node", colHeaderCols.length);
        tr.appendChild(th);
        if (colHeader.children.length !== 0) {
          addClass(th, classExpanded);
          th.textContent = " " + arrowExpanded + " " + th.textContent;
          th.onclick = function(event) {
            event = event || window.event;
            return toggleCol(colHeaderHeaders, colHeaderCols, parseInt(event.target.getAttribute("data-node")));
          };
          rowspan = colAttrs.length - (colHeader.col + 1) + (rowAttrs.length !== 0 ? 1 : 0);
          style = "pvtColLabel pvtColSubtotal col" + colHeader.row;
          th = createCell("th", style, '', {
            "rowspan": rowspan
          });
          colHeader.children[0].tr.appendChild(th);
          colHeader.sTh = th;
        }
        colHeader.clickStatus = classExpanded;
        colHeader.tr = tr;
        return colHeaderCols.push(colHeader);
      };
      buildRowHeaderHeaders = function(thead, rowHeaderHeaders, rowAttrs, colAttrs) {
        var className, i, rowAttr, textContent, th, tr;
        tr = document.createElement("tr");
        rowHeaderHeaders.hh = [];
        for (i in rowAttrs) {
          if (!hasProp.call(rowAttrs, i)) continue;
          rowAttr = rowAttrs[i];
          textContent = rowAttr;
          className = "pvtAxisLabel";
          if (i < rowAttrs.length - 1) {
            className += " expanded";
            textContent = " " + arrowExpanded + " " + rowAttr;
          }
          th = createCell("th", className, textContent);
          th.setAttribute("data-rowAttr", rowAttr);
          tr.appendChild(th);
          rowHeaderHeaders.hh.push({
            th: th,
            clickStatus: classExpanded,
            expandedCount: 0,
            nHeaders: 0
          });
        }
        if (colAttrs.length !== 0) {
          th = createCell("th");
          tr.appendChild(th);
        }
        thead.appendChild(tr);
        return rowHeaderHeaders.tr = tr;
      };
      buildRowHeaderHeadersClickEvents = function(rowHeaderHeaders, rowHeaderRows, rowAttrs) {
        var i, k, n, ref, results, rowAttr, th;
        n = rowAttrs.length - 1;
        results = [];
        for (i = k = 0, ref = n; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
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
        th = createCell("th", "pvtTotalLabel rowTotal", opts.localeStrings.totals, {
          rowspan: rowspan
        });
        return tr.appendChild(th);
      };
      buildRowHeaders = function(tbody, rowHeaderHeaders, rowHeaderRows, rowHeader, rowAttrs, colAttrs) {
        var colspan, h, hh, k, len, ref, results, th, tr;
        hh = rowHeaderHeaders.hh[rowHeader.col];
        ++hh.expandedCount;
        ++hh.nHeaders;
        tr = document.createElement("tr");
        th = rowHeader.th;
        th.setAttribute("rowspan", rowHeader.descendants + 1);
        th.setAttribute("data-rowHeader", th.textContent);
        if (rowHeader.col === rowAttrs.length - 1 && colAttrs.length !== 0) {
          th.setAttribute("colspan", 2);
        }
        th.setAttribute("data-node", rowHeaderRows.length);
        tr.appendChild(th);
        if (rowHeader.children.length !== 0) {
          addClass(th, classExpanded);
          th.textContent = " " + arrowExpanded + " " + th.textContent;
          th.onclick = function(event) {
            event = event || window.event;
            return toggleRow(rowHeaderHeaders, rowHeaderRows, parseInt(event.target.getAttribute("data-node")));
          };
          colspan = rowAttrs.length - (rowHeader.col + 1) + (colAttrs.length !== 0 ? 1 : 0);
          th = createCell("th", "pvtRowLabel pvtRowSubtotal", '', {
            colspan: colspan
          });
          tr.appendChild(th);
        }
        rowHeader.clickStatus = classExpanded;
        rowHeader.tr = tr;
        rowHeaderRows.push(rowHeader);
        tbody.appendChild(tr);
        ref = rowHeader.children;
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          h = ref[k];
          results.push(buildRowHeaders(tbody, rowHeaderHeaders, rowHeaderRows, h, rowAttrs, colAttrs));
        }
        return results;
      };
      buildValues = function(rowHeaderRows, colHeaderCols) {
        var aggregator, colHeader, eventHandlers, flatColKey, flatRowKey, k, l, len, len1, ref, results, rowHeader, style, td, totalAggregator, tr, val;
        results = [];
        for (k = 0, len = rowHeaderRows.length; k < len; k++) {
          rowHeader = rowHeaderRows[k];
          tr = rowHeader.tr;
          flatRowKey = rowHeader.flatKey;
          for (l = 0, len1 = colHeaderCols.length; l < len1; l++) {
            colHeader = colHeaderCols[l];
            flatColKey = colHeader.flatKey;
            aggregator = (ref = tree[flatRowKey][flatColKey]) != null ? ref : {
              value: (function() {
                return null;
              }),
              format: function() {
                return "";
              }
            };
            val = aggregator.value();
            style = "pvtVal";
            if (colHeader.children.length !== 0) {
              style += " pvtColSubtotal";
            }
            if (rowHeader.children.length !== 0) {
              style += " pvtRowSubtotal";
            }
            style += " row" + rowHeader.row + " col" + colHeader.row + " rowcol" + rowHeader.col + " colcol" + colHeader.col;
            eventHandlers = getTableEventHandlers(val, rowHeader.key, colHeader.key);
            td = createCell("td", style, aggregator.format(val), {
              "data-value": val
            }, eventHandlers);
            tr.appendChild(td);
          }
          totalAggregator = rowTotals[flatRowKey];
          val = totalAggregator.value();
          style = "pvtTotal rowTotal";
          if (rowHeader.children.length !== 0) {
            style += " pvtRowSubtotal";
          }
          style += " row" + rowHeader.row + " rowcol" + rowHeader.col;
          td = createCell("td", style, totalAggregator.format(val), {
            "data-value": val,
            "data-row": "row" + rowHeader.row,
            "data-col": "col" + rowHeader.col
          }, getTableEventHandlers(val, rowHeader.key, []));
          results.push(tr.appendChild(td));
        }
        return results;
      };
      buildColTotalsHeader = function(rowAttrs, colAttrs) {
        var colspan, th, tr;
        tr = document.createElement("tr");
        colspan = rowAttrs.length + (colAttrs.length === 0 ? 0 : 1);
        th = createCell("th", "pvtTotalLabel colTotal", opts.localeStrings.totals, {
          colspan: colspan
        });
        tr.appendChild(th);
        return tr;
      };
      buildColTotals = function(tr, colHeaderCols) {
        var h, k, len, results, style, td, totalAggregator, val;
        results = [];
        for (k = 0, len = colHeaderCols.length; k < len; k++) {
          h = colHeaderCols[k];
          totalAggregator = colTotals[h.flatKey];
          val = totalAggregator.value();
          style = "pvtVal pvtTotal colTotal";
          if (h.children.length !== 0) {
            style += " pvtColSubtotal";
          }
          style += " col" + h.row + " colcol" + h.col;
          td = createCell("td", style, totalAggregator.format(val), {
            "data-value": val,
            "data-for": "col" + h.col
          }, getTableEventHandlers(val, [], h.key));
          results.push(tr.appendChild(td));
        }
        return results;
      };
      buildGrandTotal = function(result, tr) {
        var td, totalAggregator, val;
        totalAggregator = allTotal;
        val = totalAggregator.value();
        td = createCell("td", "pvtGrandTotal", totalAggregator.format(val), {
          "data-value": val
        }, getTableEventHandlers(val, [], []));
        tr.appendChild(td);
        return result.appendChild(tr);
      };
      setColVisibility = function(visibility, h) {
        h.th.style.display = visibility;
        if (h.children.length !== 0) {
          $(h.th).closest('table.pvtTable').find('tbody tr td.pvtColSubtotal.col' + h.row + '.colcol' + h.col).css('display', visibility);
        } else {
          $(h.th).closest('table.pvtTable').find('tbody tr td.pvtVal.col' + h.row).not('.pvtColSubtotal').css('display', visibility);
        }
        if (h.sTh) {
          return h.sTh.style.display = visibility;
        }
      };
      collapseCol = function(colHeaderHeaders, colHeaderCols, c) {
        var colHeaderHeader, colspan, d, h, i, k, l, p, ref, ref1, ref2, results;
        if (!colHeaderCols[c]) {
          return;
        }
        h = colHeaderCols[c];
        if (h.clickStatus === classCollapsed) {
          return;
        }
        colspan = 0;
        for (i = k = 1, ref = h.descendants; 1 <= ref ? k <= ref : k >= ref; i = 1 <= ref ? ++k : --k) {
          if (!(h.descendants !== 0)) {
            continue;
          }
          d = colHeaderCols[c - i];
          if (d.th.style.display !== "none") {
            ++colspan;
            setColVisibility("none", d);
          }
        }
        p = h.parent;
        while (p !== null) {
          p.th.setAttribute("colspan", parseInt(p.th.getAttribute("colspan")) - colspan);
          p = p.parent;
        }
        if (h.descendants !== 0) {
          replaceClass(h.th, classExpanded, classCollapsed);
          h.th.textContent = " " + arrowCollapsed + " " + h.th.getAttribute("data-colHeader");
        }
        h.clickStatus = classCollapsed;
        h.th.setAttribute("colspan", 1);
        h.th.style.display = "";
        colHeaderHeader = colHeaderHeaders[h.col];
        colHeaderHeader.expandedCount--;
        if (colHeaderHeader.expandedCount === 0) {
          results = [];
          for (i = l = ref1 = h.col, ref2 = colHeaderHeaders.length - 2; ref1 <= ref2 ? l <= ref2 : l >= ref2; i = ref1 <= ref2 ? ++l : --l) {
            colHeaderHeader = colHeaderHeaders[i];
            replaceClass(colHeaderHeader.th, classExpanded, classCollapsed);
            colHeaderHeader.th.textContent = " " + arrowCollapsed + " " + colHeaderHeader.th.getAttribute("data-colAttr");
            results.push(colHeaderHeader.clickStatus = classCollapsed);
          }
          return results;
        }
      };
      expandChildCol = function(ch) {
        var gch, k, len, ref, results;
        if (ch.th.style.display === "none") {
          setColVisibility("", ch);
        }
        if (ch.clickStatus !== classCollapsed) {
          ref = ch.children;
          results = [];
          for (k = 0, len = ref.length; k < len; k++) {
            gch = ref[k];
            results.push(expandChildCol(gch));
          }
          return results;
        }
      };
      expandCol = function(colHeaderHeaders, colHeaderCols, c) {
        var ch, colspan, h, hh, k, len, p, ref;
        if (!colHeaderCols[c]) {
          return;
        }
        h = colHeaderCols[c];
        if (h.clickStatus === classExpanded) {
          return;
        }
        colspan = 0;
        ref = h.children;
        for (k = 0, len = ref.length; k < len; k++) {
          ch = ref[k];
          colspan += ch.th.colSpan;
          if (ch.th.style.display === "none") {
            setColVisibility("", ch);
          }
          expandChildCol(ch);
        }
        if (h.descendants !== 0) {
          replaceClass(h.th, classCollapsed, classExpanded);
          h.th.textContent = " " + arrowExpanded + " " + h.th.getAttribute("data-colHeader");
        }
        h.th.setAttribute("colspan", colspan + 1);
        h.clickStatus = classExpanded;
        h.th.style.display = "";
        if (h.sTh != null) {
          h.sTh.style.display = "";
        }
        p = h.parent;
        while (p !== null) {
          p.th.setAttribute("colspan", colspan + parseInt(p.th.getAttribute("colspan")));
          p = p.parent;
        }
        hh = colHeaderHeaders[h.col];
        ++hh.expandedCount;
        if (hh.expandedCount === hh.nHeaders) {
          replaceClass(hh.th, classCollapsed, classExpanded);
          hh.th.textContent = " " + arrowExpanded + " " + hh.th.getAttribute("data-colAttr");
          return hh.clickStatus = classExpanded;
        }
      };
      collapseRow = function(rowHeaderHeaders, rowHeaderRows, r) {
        var d, h, i, j, k, l, p, ref, ref1, ref2, results, rowHeaderHeader, rowspan;
        if (!rowHeaderRows[r]) {
          return;
        }
        h = rowHeaderRows[r];
        if (h.clickStatus === classCollapsed) {
          return;
        }
        rowspan = 0;
        for (i = k = 1, ref = h.descendants; 1 <= ref ? k <= ref : k >= ref; i = 1 <= ref ? ++k : --k) {
          if (!(h.descendants !== 0)) {
            continue;
          }
          d = rowHeaderRows[r + i];
          if (d.tr.style.display !== "none") {
            ++rowspan;
            d.tr.style.display = "none";
          }
        }
        p = h.parent;
        while (p !== null) {
          p.th.setAttribute("rowspan", parseInt(p.th.getAttribute("rowspan") - rowspan));
          p = p.parent;
        }
        if (h.descendants !== 0) {
          replaceClass(h.th, classExpanded, classCollapsed);
          h.th.textContent = " " + arrowCollapsed + " " + h.th.getAttribute("data-rowHeader");
        }
        h.clickStatus = classCollapsed;
        h.th.setAttribute("rowspan", 1);
        h.tr.style.display = "";
        rowHeaderHeader = rowHeaderHeaders.hh[h.col];
        rowHeaderHeader.expandedCount--;
        if (rowHeaderHeader.expandedCount !== 0) {
          return;
        }
        results = [];
        for (j = l = ref1 = h.col, ref2 = rowHeaderHeaders.hh.length - 2; ref1 <= ref2 ? l <= ref2 : l >= ref2; j = ref1 <= ref2 ? ++l : --l) {
          rowHeaderHeader = rowHeaderHeaders.hh[j];
          replaceClass(rowHeaderHeader.th, classExpanded, classCollapsed);
          rowHeaderHeader.th.textContent = " " + arrowCollapsed + " " + rowHeaderHeader.th.getAttribute("data-rowAttr");
          results.push(rowHeaderHeader.clickStatus = classCollapsed);
        }
        return results;
      };
      expandChildRow = function(ch) {
        var gch, k, len, ref, results;
        if (ch.tr.style.display === "none") {
          ch.tr.style.display = "";
        }
        if (ch.clickStatus !== classCollapsed) {
          ref = ch.children;
          results = [];
          for (k = 0, len = ref.length; k < len; k++) {
            gch = ref[k];
            results.push(expandChildRow(gch));
          }
          return results;
        }
      };
      expandRow = function(rowHeaderHeaders, rowHeaderRows, r) {
        var ch, h, hh, k, len, p, ref, rowspan;
        if (!rowHeaderRows[r]) {
          return;
        }
        h = rowHeaderRows[r];
        if (h.clickStatus === classExpanded) {
          return;
        }
        rowspan = 0;
        ref = h.children;
        for (k = 0, len = ref.length; k < len; k++) {
          ch = ref[k];
          rowspan += ch.th.rowSpan;
          if (ch.tr.style.display === "none") {
            ch.tr.style.display = "";
          }
          expandChildRow(ch);
        }
        if (h.descendants !== 0) {
          replaceClass(h.th, classCollapsed, classExpanded);
          h.th.textContent = " " + arrowExpanded + " " + h.th.getAttribute("data-rowHeader");
        }
        h.th.setAttribute("rowspan", rowspan + 1);
        h.clickStatus = classExpanded;
        h.tr.style.display = "";
        p = h.parent;
        while (p !== null) {
          p.th.setAttribute("rowspan", rowspan + parseInt(p.th.getAttribute("rowspan")));
          p = p.parent;
        }
        hh = rowHeaderHeaders.hh[h.col];
        ++hh.expandedCount;
        if (hh.expandedCount === hh.nHeaders) {
          replaceClass(hh.th, classCollapsed, classExpanded);
          hh.th.textContent = " " + arrowExpanded + " " + hh.th.getAttribute("data-rowAttr");
          return hh.clickStatus = classExpanded;
        }
      };
      toggleCol = function(colHeaderHeaders, colHeaderCols, c) {
        var h;
        if (colHeaderCols[c] == null) {
          return;
        }
        h = colHeaderCols[c];
        if (h.clickStatus === classCollapsed) {
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
        if (rowHeaderRows[r].clickStatus === classCollapsed) {
          return expandRow(rowHeaderHeaders, rowHeaderRows, r);
        } else {
          return collapseRow(rowHeaderHeaders, rowHeaderRows, r);
        }
      };
      collapseColsAt = function(colHeaderHeaders, colHeaderCols, colAttrs, colAttr) {
        var h, hh, i, idx, nAttrs, nCols, results;
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
        while (i < nAttrs) {
          hh = colHeaderHeaders[i];
          replaceClass(hh.th, classExpanded, classCollapsed);
          hh.th.textContent = " " + arrowCollapsed + " " + colAttrs[i];
          hh.clickStatus = classCollapsed;
          ++i;
        }
        i = 0;
        nCols = colHeaderCols.length;
        results = [];
        while (i < nCols) {
          h = colHeaderCols[i];
          if (h.col === idx && h.clickStatus !== classCollapsed && h.th.style.display !== "none") {
            collapseCol(colHeaderHeaders, colHeaderCols, parseInt(h.th.getAttribute("data-node")));
          }
          results.push(++i);
        }
        return results;
      };
      expandColsAt = function(colHeaderHeaders, colHeaderCols, colAttrs, colAttr) {
        var colHeaderHeader, h, hh, i, idx, j, k, nCols, ref, results;
        if (typeof colAttr === 'string') {
          idx = colAttrs.indexOf(colAttr);
        } else {
          idx = colAttr;
        }
        if (idx < 0 || idx === colAttrs.length - 1) {
          return;
        }
        for (i = k = 0, ref = idx; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
          hh = colHeaderHeaders[i];
          replaceClass(hh.th, classCollapsed, classExpanded);
          hh.th.textContent = " " + arrowExpanded + " " + colAttrs[i];
          hh.clickStatus = classExpanded;
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
        while (idx < colAttrs.length - 1) {
          colHeaderHeader = colHeaderHeaders[idx];
          if (colHeaderHeader.expandedCount === 0) {
            replaceClass(colHeaderHeader.th, classExpanded, classCollapsed);
            colHeaderHeader.th.textContent = " " + arrowCollapsed + " " + colAttrs[idx];
            colHeaderHeader.clickStatus = classCollapsed;
          } else if (colHeaderHeader.expandedCount === colHeaderHeader.nHeaders) {
            replaceClass(colHeaderHeader.th, classCollapsed, classExpanded);
            colHeaderHeader.th.textContent = " " + arrowExpanded + " " + colAttrs[idx];
            colHeaderHeader.clickStatus = classExpanded;
          }
          results.push(++idx);
        }
        return results;
      };
      collapseRowsAt = function(rowHeaderHeaders, rowHeaderRows, rowAttrs, rowAttr) {
        var h, i, idx, j, nAttrs, nRows, results;
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
        while (i < nAttrs) {
          h = rowHeaderHeaders.hh[i];
          replaceClass(h.th, classExpanded, classCollapsed);
          h.th.textContent = " " + arrowCollapsed + " " + rowAttrs[i];
          h.clickStatus = classCollapsed;
          ++i;
        }
        j = 0;
        nRows = rowHeaderRows.length;
        results = [];
        while (j < nRows) {
          h = rowHeaderRows[j];
          if (h.col === idx && h.clickStatus !== classCollapsed && h.tr.style.display !== "none") {
            collapseRow(rowHeaderHeaders, rowHeaderRows, j);
            results.push(j = j + h.descendants + 1);
          } else {
            results.push(++j);
          }
        }
        return results;
      };
      expandRowsAt = function(rowHeaderHeaders, rowHeaderRows, rowAttrs, rowAttr) {
        var h, hh, i, idx, j, k, nRows, ref, results, rowHeaderHeader;
        if (typeof rowAttr === 'string') {
          idx = rowAttrs.indexOf(rowAttr);
        } else {
          idx = rowAttr;
        }
        if (idx < 0 || idx === rowAttrs.length - 1) {
          return;
        }
        for (i = k = 0, ref = idx; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
          hh = rowHeaderHeaders.hh[i];
          replaceClass(hh.th, classCollapsed, classExpanded);
          hh.th.textContent = " " + arrowExpanded + " " + rowAttrs[i];
          hh.clickStatus = classExpanded;
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
        while (idx < rowAttrs.length - 1) {
          rowHeaderHeader = rowHeaderHeaders.hh[idx];
          if (rowHeaderHeader.expandedCount === 0) {
            replaceClass(rowHeaderHeader.th, classExpanded, classCollapsed);
            rowHeaderHeader.th.textContent = " " + arrowCollapsed + " " + rowAttrs[idx];
            rowHeaderHeader.clickStatus = classCollapsed;
          } else if (rowHeaderHeader.expandedCount === rowHeaderHeader.nHeaders) {
            replaceClass(rowHeaderHeader.th, classCollapsed, classExpanded);
            rowHeaderHeader.th.textContent = " " + arrowExpanded + " " + rowAttrs[idx];
            rowHeaderHeader.clickStatus = classExpanded;
          }
          results.push(++idx);
        }
        return results;
      };
      toggleColHeaderHeader = function(colHeaderHeaders, colHeaderCols, colAttrs, colAttr) {
        var h, idx;
        idx = colAttrs.indexOf(colAttr);
        h = colHeaderHeaders[idx];
        if (h.clickStatus === classCollapsed) {
          return expandColsAt(colHeaderHeaders, colHeaderCols, colAttrs, colAttr);
        } else {
          return collapseColsAt(colHeaderHeaders, colHeaderCols, colAttrs, colAttr);
        }
      };
      toggleRowHeaderHeader = function(rowHeaderHeaders, rowHeaderRows, rowAttrs, rowAttr) {
        var idx, th;
        idx = rowAttrs.indexOf(rowAttr);
        th = rowHeaderHeaders.hh[idx];
        if (th.clickStatus === classCollapsed) {
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
        result = document.createElement("table");
        result.className = "pvtTable";
        result.style.display = "none";
        thead = document.createElement("thead");
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
        tbody = document.createElement("tbody");
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
