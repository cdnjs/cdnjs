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
      var addClass, adjustAxisHeader, allTotal, arrowCollapsed, arrowExpanded, buildAxisHeader, buildColAxisHeaders, buildColHeader, buildColTotals, buildColTotalsHeader, buildGrandTotal, buildRowAxisHeaders, buildRowHeader, buildRowTotalsHeader, buildValues, classColCollapsed, classColExpanded, classColHide, classColShow, classCollapsed, classExpanded, classRowCollapsed, classRowExpanded, classRowHide, classRowShow, clickStatusCollapsed, clickStatusExpanded, colAttrs, colKeys, colTotals, collapseAxis, collapseAxisHeaders, collapseChildCol, collapseChildRow, collapseCol, collapseHiddenColSubtotal, collapseRow, collapseShowColSubtotal, collapseShowRowSubtotal, createElement, defaults, expandAxis, expandChildCol, expandChildRow, expandCol, expandHideColSubtotal, expandHideRowSubtotal, expandRow, expandShowColSubtotal, expandShowRowSubtotal, getHeaderText, getTableEventHandlers, hasClass, hideChildCol, hideChildRow, main, processKeys, removeClass, replaceClass, rowAttrs, rowKeys, rowTotals, setAttributes, showChildCol, showChildRow, tree;
      defaults = {
        table: {
          clickCallback: null
        },
        localeStrings: {
          totals: "Totals",
          subtotalOf: "Subtotal of"
        },
        arrowCollapsed: "\u25B6",
        arrowExpanded: "\u25E2",
        rowSubtotalDisplay: {
          displayOnTop: true,
          disableFrom: 99999,
          collapseAt: 99999,
          hideOnExpand: false,
          disableExpandCollapse: false
        },
        colSubtotalDisplay: {
          displayOnTop: true,
          disableFrom: 99999,
          collapseAt: 99999,
          hideOnExpand: false,
          disableExpandCollapse: false
        }
      };
      opts = $.extend(true, {}, defaults, opts);
      if (opts.rowSubtotalDisplay.disableSubtotal) {
        opts.rowSubtotalDisplay.disableFrom = 0;
      }
      if (typeof opts.rowSubtotalDisplay.disableAfter !== 'undefined' && opts.rowSubtotalDisplay.disableAfter !== null) {
        opts.rowSubtotalDisplay.disableFrom = opts.rowSubtotalDisplay.disableAfter + 1;
      }
      if (typeof opts.rowSubtotalDisplay.collapseAt !== 'undefined' && opts.collapseRowsAt !== null) {
        opts.rowSubtotalDisplay.collapseAt = opts.collapseRowsAt;
      }
      if (opts.colSubtotalDisplay.disableSubtotal) {
        opts.colSubtotalDisplay.disableFrom = 0;
      }
      if (typeof opts.colSubtotalDisplay.disableAfter !== 'undefined' && opts.colSubtotalDisplay.disableAfter !== null) {
        opts.colSubtotalDisplay.disableFrom = opts.colSubtotalDisplay.disableAfter + 1;
      }
      if (typeof opts.colSubtotalDisplay.collapseAt !== 'undefined' && opts.collapseColsAt !== null) {
        opts.colSubtotalDisplay.collapseAt = opts.collapseColsAt;
      }
      colAttrs = pivotData.colAttrs;
      rowAttrs = pivotData.rowAttrs;
      rowKeys = pivotData.getRowKeys();
      colKeys = pivotData.getColKeys();
      tree = pivotData.tree;
      rowTotals = pivotData.rowTotals;
      colTotals = pivotData.colTotals;
      allTotal = pivotData.allTotal;
      classRowHide = "rowhide";
      classRowShow = "rowshow";
      classColHide = "colhide";
      classColShow = "colshow";
      clickStatusExpanded = "expanded";
      clickStatusCollapsed = "collapsed";
      classExpanded = "expanded";
      classCollapsed = "collapsed";
      classRowExpanded = "rowexpanded";
      classRowCollapsed = "rowcollapsed";
      classColExpanded = "colexpanded";
      classColCollapsed = "colcollapsed";
      arrowExpanded = opts.arrowExpanded;
      arrowCollapsed = opts.arrowCollapsed;
      hasClass = function(element, className) {
        var regExp;
        regExp = new RegExp("(?:^|\\s)" + className + "(?!\\S)", "g");
        return element.className.match(regExp) !== null;
      };
      removeClass = function(element, className) {
        var k, len, name, ref, regExp, results;
        ref = className.split(" ");
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          name = ref[k];
          regExp = new RegExp("(?:^|\\s)" + name + "(?!\\S)", "g");
          results.push(element.className = element.className.replace(regExp, ''));
        }
        return results;
      };
      addClass = function(element, className) {
        var k, len, name, ref, results;
        ref = className.split(" ");
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          name = ref[k];
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
      processKeys = function(keysArr, className, opts) {
        var headers, lastIdx, row;
        lastIdx = keysArr[0].length - 1;
        headers = {
          children: []
        };
        row = 0;
        keysArr.reduce((function(_this) {
          return function(val0, k0) {
            var col;
            col = 0;
            k0.reduce(function(acc, curVal, curIdx, arr) {
              var i, k, key, node, ref;
              if (!acc[curVal]) {
                key = k0.slice(0, col + 1);
                acc[curVal] = {
                  row: row,
                  col: col,
                  descendants: 0,
                  children: [],
                  text: curVal,
                  key: key,
                  flatKey: key.join(String.fromCharCode(0)),
                  firstLeaf: null,
                  leaves: 0,
                  parent: col !== 0 ? acc : null,
                  th: createElement("th", className, curVal),
                  childrenSpan: 0
                };
                acc.children.push(curVal);
              }
              if (col > 0) {
                acc.descendants++;
              }
              col++;
              if (curIdx === lastIdx) {
                node = headers;
                for (i = k = 0, ref = lastIdx - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
                  if (!(lastIdx > 0)) {
                    continue;
                  }
                  node[k0[i]].leaves++;
                  if (!node[k0[i]].firstLeaf) {
                    node[k0[i]].firstLeaf = acc[curVal];
                  }
                  node = node[k0[i]];
                }
                return headers;
              }
              return acc[curVal];
            }, headers);
            row++;
            return headers;
          };
        })(this), headers);
        return headers;
      };
      buildAxisHeader = function(axisHeaders, col, attrs, opts) {
        var ah, arrow, hClass;
        ah = {
          text: attrs[col],
          expandedCount: 0,
          expandables: 0,
          attrHeaders: [],
          clickStatus: clickStatusExpanded,
          onClick: collapseAxis
        };
        arrow = arrowExpanded + " ";
        hClass = classExpanded;
        if (col >= opts.collapseAt) {
          arrow = arrowCollapsed + " ";
          hClass = classCollapsed;
          ah.clickStatus = clickStatusCollapsed;
          ah.onClick = expandAxis;
        }
        if (col === attrs.length - 1 || col >= opts.disableFrom || opts.disableExpandCollapse) {
          arrow = "";
        }
        ah.th = createElement("th", "pvtAxisLabel " + hClass, "" + arrow + ah.text);
        if (col < attrs.length - 1 && col < opts.disableFrom && !opts.disableExpandCollapse) {
          ah.th.onclick = function(event) {
            event = event || window.event;
            return ah.onClick(axisHeaders, col, attrs, opts);
          };
        }
        axisHeaders.ah.push(ah);
        return ah;
      };
      buildColAxisHeaders = function(thead, rowAttrs, colAttrs, opts) {
        var ah, attr, axisHeaders, col, k, len;
        axisHeaders = {
          collapseAttrHeader: collapseCol,
          expandAttrHeader: expandCol,
          ah: []
        };
        for (col = k = 0, len = colAttrs.length; k < len; col = ++k) {
          attr = colAttrs[col];
          ah = buildAxisHeader(axisHeaders, col, colAttrs, opts.colSubtotalDisplay);
          ah.tr = createElement("tr");
          if (col === 0 && rowAttrs.length !== 0) {
            ah.tr.appendChild(createElement("th", null, null, {
              colspan: rowAttrs.length,
              rowspan: colAttrs.length
            }));
          }
          ah.tr.appendChild(ah.th);
          thead.appendChild(ah.tr);
        }
        return axisHeaders;
      };
      buildRowAxisHeaders = function(thead, rowAttrs, colAttrs, opts) {
        var ah, axisHeaders, col, k, ref, th;
        axisHeaders = {
          collapseAttrHeader: collapseRow,
          expandAttrHeader: expandRow,
          ah: [],
          tr: createElement("tr")
        };
        for (col = k = 0, ref = rowAttrs.length - 1; 0 <= ref ? k <= ref : k >= ref; col = 0 <= ref ? ++k : --k) {
          ah = buildAxisHeader(axisHeaders, col, rowAttrs, opts.rowSubtotalDisplay);
          axisHeaders.tr.appendChild(ah.th);
        }
        if (colAttrs.length !== 0) {
          th = createElement("th");
          axisHeaders.tr.appendChild(th);
        }
        thead.appendChild(axisHeaders.tr);
        return axisHeaders;
      };
      getHeaderText = function(h, attrs, opts) {
        var arrow;
        arrow = " " + arrowExpanded + " ";
        if (h.col === attrs.length - 1 || h.col >= opts.disableFrom || opts.disableExpandCollapse || h.children.length === 0) {
          arrow = "";
        }
        return "" + arrow + h.text;
      };
      buildColHeader = function(axisHeaders, attrHeaders, h, rowAttrs, colAttrs, node, opts) {
        var ah, chKey, k, len, ref, ref1;
        ref = h.children;
        for (k = 0, len = ref.length; k < len; k++) {
          chKey = ref[k];
          buildColHeader(axisHeaders, attrHeaders, h[chKey], rowAttrs, colAttrs, node, opts);
        }
        ah = axisHeaders.ah[h.col];
        ah.attrHeaders.push(h);
        h.node = node.counter;
        h.onClick = collapseCol;
        addClass(h.th, classColShow + " col" + h.row + " colcol" + h.col + " " + classColExpanded);
        h.th.setAttribute("data-colnode", h.node);
        if (h.children.length !== 0) {
          h.th.colSpan = h.childrenSpan;
        }
        if (h.children.length === 0 && rowAttrs.length !== 0) {
          h.th.rowSpan = 2;
        }
        h.th.textContent = getHeaderText(h, colAttrs, opts.colSubtotalDisplay);
        if (h.children.length !== 0 && h.col < opts.colSubtotalDisplay.disableFrom) {
          ah.expandables++;
          ah.expandedCount += 1;
          if (!opts.colSubtotalDisplay.hideOnExpand) {
            h.th.colSpan++;
          }
          if (!opts.colSubtotalDisplay.disableExpandCollapse) {
            h.th.onclick = function(event) {
              event = event || window.event;
              return h.onClick(axisHeaders, h, opts.colSubtotalDisplay);
            };
          }
          h.sTh = createElement("th", "pvtColLabelFiller " + classColShow + " col" + h.row + " colcol" + h.col + " " + classColExpanded);
          h.sTh.setAttribute("data-colnode", h.node);
          h.sTh.rowSpan = colAttrs.length - h.col;
          if (opts.colSubtotalDisplay.hideOnExpand) {
            replaceClass(h.sTh, classColShow, classColHide);
          }
          h[h.children[0]].tr.appendChild(h.sTh);
        }
        if ((ref1 = h.parent) != null) {
          ref1.childrenSpan += h.th.colSpan;
        }
        h.clickStatus = clickStatusExpanded;
        ah.tr.appendChild(h.th);
        h.tr = ah.tr;
        attrHeaders.push(h);
        return node.counter++;
      };
      buildRowTotalsHeader = function(tr, rowAttrs, colAttrs) {
        var th;
        th = createElement("th", "pvtTotalLabel rowTotal", opts.localeStrings.totals, {
          rowspan: colAttrs.length === 0 ? 1 : colAttrs.length + (rowAttrs.length === 0 ? 0 : 1)
        });
        return tr.appendChild(th);
      };
      buildRowHeader = function(tbody, axisHeaders, attrHeaders, h, rowAttrs, colAttrs, node, opts) {
        var ah, chKey, firstChild, k, len, ref, ref1;
        ref = h.children;
        for (k = 0, len = ref.length; k < len; k++) {
          chKey = ref[k];
          buildRowHeader(tbody, axisHeaders, attrHeaders, h[chKey], rowAttrs, colAttrs, node, opts);
        }
        ah = axisHeaders.ah[h.col];
        ah.attrHeaders.push(h);
        h.node = node.counter;
        h.onClick = collapseRow;
        if (h.children.length !== 0) {
          firstChild = h[h.children[0]];
        }
        addClass(h.th, classRowShow + " row" + h.row + " rowcol" + h.col + " " + classRowExpanded);
        h.th.setAttribute("data-rownode", h.node);
        if (h.col === rowAttrs.length - 1 && colAttrs.length !== 0) {
          h.th.colSpan = 2;
        }
        if (h.children.length !== 0) {
          h.th.rowSpan = h.childrenSpan;
        }
        h.th.textContent = getHeaderText(h, rowAttrs, opts.rowSubtotalDisplay);
        h.tr = createElement("tr", "row" + h.row);
        h.tr.appendChild(h.th);
        if (h.children.length === 0) {
          tbody.appendChild(h.tr);
        } else {
          tbody.insertBefore(h.tr, firstChild.tr);
        }
        if (h.children.length !== 0 && h.col < opts.rowSubtotalDisplay.disableFrom) {
          ++ah.expandedCount;
          ++ah.expandables;
          if (!opts.rowSubtotalDisplay.disableExpandCollapse) {
            h.th.onclick = function(event) {
              event = event || window.event;
              return h.onClick(axisHeaders, h, opts.rowSubtotalDisplay);
            };
          }
          h.sTh = createElement("th", "pvtRowLabelFiller row" + h.row + " rowcol" + h.col + " " + classRowExpanded + " " + classRowShow);
          if (opts.rowSubtotalDisplay.hideOnExpand) {
            replaceClass(h.sTh, classRowShow, classRowHide);
          }
          h.sTh.setAttribute("data-rownode", h.node);
          h.sTh.colSpan = rowAttrs.length - (h.col + 1) + (colAttrs.length !== 0 ? 1 : 0);
          if (opts.rowSubtotalDisplay.displayOnTop) {
            h.tr.appendChild(h.sTh);
          } else {
            h.th.rowSpan += 1;
            h.sTr = createElement("tr", "row" + h.row);
            h.sTr.appendChild(h.sTh);
            tbody.appendChild(h.sTr);
          }
        }
        if (h.children.length !== 0) {
          h.th.rowSpan++;
        }
        if ((ref1 = h.parent) != null) {
          ref1.childrenSpan += h.th.rowSpan;
        }
        h.clickStatus = clickStatusExpanded;
        attrHeaders.push(h);
        return node.counter++;
      };
      getTableEventHandlers = function(value, rowKey, colKey, rowAttrs, colAttrs, opts) {
        var attr, event, eventHandlers, filters, handler, i, ref, ref1;
        if (!((ref = opts.table) != null ? ref.eventHandlers : void 0)) {
          return;
        }
        eventHandlers = {};
        ref1 = opts.table.eventHandlers;
        for (event in ref1) {
          if (!hasProp.call(ref1, event)) continue;
          handler = ref1[event];
          filters = {};
          for (i in colAttrs) {
            if (!hasProp.call(colAttrs, i)) continue;
            attr = colAttrs[i];
            if (colKey[i] != null) {
              filters[attr] = colKey[i];
            }
          }
          for (i in rowAttrs) {
            if (!hasProp.call(rowAttrs, i)) continue;
            attr = rowAttrs[i];
            if (rowKey[i] != null) {
              filters[attr] = rowKey[i];
            }
          }
          eventHandlers[event] = function(e) {
            return handler(e, value, filters, pivotData);
          };
        }
        return eventHandlers;
      };
      buildValues = function(tbody, colAttrHeaders, rowAttrHeaders, rowAttrs, colAttrs, opts) {
        var aggregator, ch, cls, k, l, len, len1, rCls, ref, results, rh, td, totalAggregator, tr, val;
        results = [];
        for (k = 0, len = rowAttrHeaders.length; k < len; k++) {
          rh = rowAttrHeaders[k];
          if (!(rh.col === rowAttrs.length - 1 || (rh.children.length !== 0 && rh.col < opts.rowSubtotalDisplay.disableFrom))) {
            continue;
          }
          rCls = "pvtVal row" + rh.row + " rowcol" + rh.col + " " + classRowExpanded;
          if (rh.children.length > 0) {
            rCls += " pvtRowSubtotal";
            rCls += opts.rowSubtotalDisplay.hideOnExpand ? " " + classRowHide : "  " + classRowShow;
          } else {
            rCls += " " + classRowShow;
          }
          tr = rh.sTr ? rh.sTr : rh.tr;
          for (l = 0, len1 = colAttrHeaders.length; l < len1; l++) {
            ch = colAttrHeaders[l];
            if (!(ch.col === colAttrs.length - 1 || (ch.children.length !== 0 && ch.col < opts.colSubtotalDisplay.disableFrom))) {
              continue;
            }
            aggregator = (ref = tree[rh.flatKey][ch.flatKey]) != null ? ref : {
              value: (function() {
                return null;
              }),
              format: function() {
                return "";
              }
            };
            val = aggregator.value();
            cls = " " + rCls + " col" + ch.row + " colcol" + ch.col + " " + classColExpanded;
            if (ch.children.length > 0) {
              cls += " pvtColSubtotal";
              cls += opts.colSubtotalDisplay.hideOnExpand ? " " + classColHide : " " + classColShow;
            } else {
              cls += " " + classColShow;
            }
            td = createElement("td", cls, aggregator.format(val), {
              "data-value": val,
              "data-rownode": rh.node,
              "data-colnode": ch.node
            }, getTableEventHandlers(val, rh.key, ch.key, rowAttrs, colAttrs, opts));
            tr.appendChild(td);
          }
          totalAggregator = rowTotals[rh.flatKey];
          val = totalAggregator.value();
          td = createElement("td", "pvtTotal rowTotal " + rCls, totalAggregator.format(val), {
            "data-value": val,
            "data-row": "row" + rh.row,
            "data-rowcol": "col" + rh.col,
            "data-rownode": rh.node
          });
          getTableEventHandlers(val, rh.key, [], rowAttrs, colAttrs, opts);
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
      buildColTotals = function(tr, attrHeaders, rowAttrs, colAttrs, opts) {
        var clsNames, h, k, len, results, td, totalAggregator, val;
        results = [];
        for (k = 0, len = attrHeaders.length; k < len; k++) {
          h = attrHeaders[k];
          if (!(h.col === colAttrs.length - 1 || (h.children.length !== 0 && h.col < opts.colSubtotalDisplay.disableFrom))) {
            continue;
          }
          clsNames = "pvtVal pvtTotal colTotal " + classColExpanded + " col" + h.row + " colcol" + h.col;
          if (h.children.length !== 0) {
            clsNames += " pvtColSubtotal";
            clsNames += opts.colSubtotalDisplay.hideOnExpand ? " " + classColHide : " " + classColShow;
          } else {
            clsNames += " " + classColShow;
          }
          totalAggregator = colTotals[h.flatKey];
          val = totalAggregator.value();
          td = createElement("td", clsNames, totalAggregator.format(val), {
            "data-value": val,
            "data-for": "col" + h.col,
            "data-colnode": "" + h.node
          }, getTableEventHandlers(val, [], h.key, rowAttrs, colAttrs, opts));
          results.push(tr.appendChild(td));
        }
        return results;
      };
      buildGrandTotal = function(tbody, tr, rowAttrs, colAttrs, opts) {
        var td, totalAggregator, val;
        totalAggregator = allTotal;
        val = totalAggregator.value();
        td = createElement("td", "pvtGrandTotal", totalAggregator.format(val), {
          "data-value": val
        }, getTableEventHandlers(val, [], [], rowAttrs, colAttrs, opts));
        tr.appendChild(td);
        return tbody.appendChild(tr);
      };
      collapseAxisHeaders = function(axisHeaders, col, opts) {
        var ah, collapsible, i, k, ref, ref1, results;
        collapsible = Math.min(axisHeaders.ah.length - 2, opts.disableFrom - 1);
        if (col > collapsible) {
          return;
        }
        results = [];
        for (i = k = ref = col, ref1 = collapsible; ref <= ref1 ? k <= ref1 : k >= ref1; i = ref <= ref1 ? ++k : --k) {
          ah = axisHeaders.ah[i];
          replaceClass(ah.th, classExpanded, classCollapsed);
          ah.th.textContent = " " + arrowCollapsed + " " + ah.text;
          ah.clickStatus = clickStatusCollapsed;
          results.push(ah.onClick = expandAxis);
        }
        return results;
      };
      adjustAxisHeader = function(axisHeaders, col, opts) {
        var ah;
        ah = axisHeaders.ah[col];
        if (ah.expandedCount === 0) {
          return collapseAxisHeaders(axisHeaders, col, opts);
        } else if (ah.expandedCount === ah.expandables) {
          replaceClass(ah.th, classCollapsed, classExpanded);
          ah.th.textContent = " " + arrowExpanded + " " + ah.text;
          ah.clickStatus = clickStatusExpanded;
          return ah.onClick = collapseAxis;
        }
      };
      hideChildCol = function(ch) {
        return $(ch.th).closest('table.pvtTable').find("tbody tr td[data-colnode=\"" + ch.node + "\"], th[data-colnode=\"" + ch.node + "\"]").removeClass(classColShow).addClass(classColHide);
      };
      collapseHiddenColSubtotal = function(h, opts) {
        $(h.th).closest('table.pvtTable').find("tbody tr td[data-colnode=\"" + h.node + "\"], th[data-colnode=\"" + h.node + "\"]").removeClass(classColExpanded).addClass(classColCollapsed);
        if (h.children.length !== 0) {
          h.th.textContent = " " + arrowCollapsed + " " + h.text;
        }
        return h.th.colSpan = 1;
      };
      collapseShowColSubtotal = function(h, opts) {
        $(h.th).closest('table.pvtTable').find("tbody tr td[data-colnode=\"" + h.node + "\"], th[data-colnode=\"" + h.node + "\"]").removeClass(classColExpanded).addClass(classColCollapsed).removeClass(classColHide).addClass(classColShow);
        if (h.children.length !== 0) {
          h.th.textContent = " " + arrowCollapsed + " " + h.text;
        }
        return h.th.colSpan = 1;
      };
      collapseChildCol = function(ch, h) {
        var chKey, k, len, ref;
        ref = ch.children;
        for (k = 0, len = ref.length; k < len; k++) {
          chKey = ref[k];
          if (hasClass(ch[chKey].th, classColShow)) {
            collapseChildCol(ch[chKey], h);
          }
        }
        return hideChildCol(ch);
      };
      collapseCol = function(axisHeaders, h, opts) {
        var chKey, colSpan, k, len, p, ref;
        colSpan = h.th.colSpan - 1;
        ref = h.children;
        for (k = 0, len = ref.length; k < len; k++) {
          chKey = ref[k];
          if (hasClass(h[chKey].th, classColShow)) {
            collapseChildCol(h[chKey], h);
          }
        }
        if (h.col < opts.disableFrom) {
          if (hasClass(h.th, classColHide)) {
            collapseHiddenColSubtotal(h, opts);
          } else {
            collapseShowColSubtotal(h, opts);
          }
        }
        p = h.parent;
        while (p) {
          p.th.colSpan -= colSpan;
          p = p.parent;
        }
        h.clickStatus = clickStatusCollapsed;
        h.onClick = expandCol;
        axisHeaders.ah[h.col].expandedCount--;
        return adjustAxisHeader(axisHeaders, h.col, opts);
      };
      showChildCol = function(ch) {
        return $(ch.th).closest('table.pvtTable').find("tbody tr td[data-colnode=\"" + ch.node + "\"], th[data-colnode=\"" + ch.node + "\"]").removeClass(classColHide).addClass(classColShow);
      };
      expandHideColSubtotal = function(h) {
        $(h.th).closest('table.pvtTable').find("tbody tr td[data-colnode=\"" + h.node + "\"], th[data-colnode=\"" + h.node + "\"]").removeClass(classColCollapsed + " " + classColShow).addClass(classColExpanded + " " + classColHide);
        replaceClass(h.th, classColHide, classColShow);
        return h.th.textContent = " " + arrowExpanded + " " + h.text;
      };
      expandShowColSubtotal = function(h) {
        $(h.th).closest('table.pvtTable').find("tbody tr td[data-colnode=\"" + h.node + "\"], th[data-colnode=\"" + h.node + "\"]").removeClass(classColCollapsed + " " + classColHide).addClass(classColExpanded + " " + classColShow);
        h.th.colSpan++;
        return h.th.textContent = " " + arrowExpanded + " " + h.text;
      };
      expandChildCol = function(ch, opts) {
        var chKey, k, len, ref, results;
        if (ch.children.length !== 0 && opts.hideOnExpand && ch.clickStatus === clickStatusExpanded) {
          replaceClass(ch.th, classColHide, classColShow);
        } else {
          showChildCol(ch);
        }
        if (ch.sTh && ch.clickStatus === clickStatusExpanded && opts.hideOnExpand) {
          replaceClass(ch.sTh, classColShow, classColHide);
        }
        if (ch.clickStatus === clickStatusExpanded || ch.col >= opts.disableFrom) {
          ref = ch.children;
          results = [];
          for (k = 0, len = ref.length; k < len; k++) {
            chKey = ref[k];
            results.push(expandChildCol(ch[chKey], opts));
          }
          return results;
        }
      };
      expandCol = function(axisHeaders, h, opts) {
        var ch, chKey, colSpan, k, len, p, ref;
        if (h.clickStatus === clickStatusExpanded) {
          adjustAxisHeader(axisHeaders, h.col, opts);
          return;
        }
        colSpan = 0;
        ref = h.children;
        for (k = 0, len = ref.length; k < len; k++) {
          chKey = ref[k];
          ch = h[chKey];
          expandChildCol(ch, opts);
          colSpan += ch.th.colSpan;
        }
        h.th.colSpan = colSpan;
        if (h.col < opts.disableFrom) {
          if (opts.hideOnExpand) {
            expandHideColSubtotal(h);
            --colSpan;
          } else {
            expandShowColSubtotal(h);
          }
        }
        p = h.parent;
        while (p) {
          p.th.colSpan += colSpan;
          p = p.parent;
        }
        h.clickStatus = clickStatusExpanded;
        h.onClick = collapseCol;
        axisHeaders.ah[h.col].expandedCount++;
        return adjustAxisHeader(axisHeaders, h.col, opts);
      };
      hideChildRow = function(ch, opts) {
        var cell, k, l, len, len1, ref, ref1, results;
        ref = ch.tr.querySelectorAll("th, td");
        for (k = 0, len = ref.length; k < len; k++) {
          cell = ref[k];
          replaceClass(cell, classRowShow, classRowHide);
        }
        if (ch.sTr) {
          ref1 = ch.sTr.querySelectorAll("th, td");
          results = [];
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            cell = ref1[l];
            results.push(replaceClass(cell, classRowShow, classRowHide));
          }
          return results;
        }
      };
      collapseShowRowSubtotal = function(h, opts) {
        var cell, k, l, len, len1, ref, ref1, results;
        h.th.textContent = " " + arrowCollapsed + " " + h.text;
        ref = h.tr.querySelectorAll("th, td");
        for (k = 0, len = ref.length; k < len; k++) {
          cell = ref[k];
          removeClass(cell, classRowExpanded + " " + classRowHide);
          addClass(cell, classRowCollapsed + " " + classRowShow);
        }
        if (h.sTr) {
          ref1 = h.sTr.querySelectorAll("th, td");
          results = [];
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            cell = ref1[l];
            removeClass(cell, classRowExpanded + " " + classRowHide);
            results.push(addClass(cell, classRowCollapsed + " " + classRowShow));
          }
          return results;
        }
      };
      collapseChildRow = function(ch, h, opts) {
        var chKey, k, len, ref;
        ref = ch.children;
        for (k = 0, len = ref.length; k < len; k++) {
          chKey = ref[k];
          collapseChildRow(ch[chKey], h, opts);
        }
        return hideChildRow(ch, opts);
      };
      collapseRow = function(axisHeaders, h, opts) {
        var chKey, k, len, ref;
        ref = h.children;
        for (k = 0, len = ref.length; k < len; k++) {
          chKey = ref[k];
          collapseChildRow(h[chKey], h, opts);
        }
        collapseShowRowSubtotal(h, opts);
        h.clickStatus = clickStatusCollapsed;
        h.onClick = expandRow;
        axisHeaders.ah[h.col].expandedCount--;
        return adjustAxisHeader(axisHeaders, h.col, opts);
      };
      showChildRow = function(ch, opts) {
        var cell, k, l, len, len1, ref, ref1, results;
        ref = ch.tr.querySelectorAll("th, td");
        for (k = 0, len = ref.length; k < len; k++) {
          cell = ref[k];
          replaceClass(cell, classRowHide, classRowShow);
        }
        if (ch.sTr) {
          ref1 = ch.sTr.querySelectorAll("th, td");
          results = [];
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            cell = ref1[l];
            results.push(replaceClass(cell, classRowHide, classRowShow));
          }
          return results;
        }
      };
      expandShowRowSubtotal = function(h, opts) {
        var cell, k, l, len, len1, ref, ref1, results;
        h.th.textContent = " " + arrowExpanded + " " + h.text;
        ref = h.tr.querySelectorAll("th, td");
        for (k = 0, len = ref.length; k < len; k++) {
          cell = ref[k];
          removeClass(cell, classRowCollapsed + " " + classRowHide);
          addClass(cell, classRowExpanded + " " + classRowShow);
        }
        if (h.sTr) {
          ref1 = h.sTr.querySelectorAll("th, td");
          results = [];
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            cell = ref1[l];
            removeClass(cell, classRowCollapsed + " " + classRowHide);
            results.push(addClass(cell, classRowExpanded + " " + classRowShow));
          }
          return results;
        }
      };
      expandHideRowSubtotal = function(h, opts) {
        var cell, k, l, len, len1, ref, ref1, results;
        h.th.textContent = " " + arrowExpanded + " " + h.text;
        ref = h.tr.querySelectorAll("th, td");
        for (k = 0, len = ref.length; k < len; k++) {
          cell = ref[k];
          removeClass(cell, classRowCollapsed + " " + classRowShow);
          addClass(cell, classRowExpanded + " " + classRowHide);
        }
        removeClass(h.th, classRowCollapsed + " " + classRowHide);
        addClass(cell, classRowExpanded + " " + classRowShow);
        if (h.sTr) {
          ref1 = h.sTr.querySelectorAll("th, td");
          results = [];
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            cell = ref1[l];
            removeClass(cell, classRowCollapsed + " " + classRowShow);
            results.push(addClass(cell, classRowExpanded + " " + classRowHide));
          }
          return results;
        }
      };
      expandChildRow = function(ch, opts) {
        var chKey, k, len, ref, results;
        if (ch.children.length !== 0 && opts.hideOnExpand && ch.clickStatus === clickStatusExpanded) {
          replaceClass(ch.th, classRowHide, classRowShow);
        } else {
          showChildRow(ch, opts);
        }
        if (ch.sTh && ch.clickStatus === clickStatusExpanded && opts.hideOnExpand) {
          replaceClass(ch.sTh, classRowShow, classRowHide);
        }
        if (ch.clickStatus === clickStatusExpanded || ch.col >= opts.disableFrom) {
          ref = ch.children;
          results = [];
          for (k = 0, len = ref.length; k < len; k++) {
            chKey = ref[k];
            results.push(expandChildRow(ch[chKey], opts));
          }
          return results;
        }
      };
      expandRow = function(axisHeaders, h, opts) {
        var ch, chKey, k, len, ref;
        if (h.clickStatus === clickStatusExpanded) {
          adjustAxisHeader(axisHeaders, h.col, opts);
          return;
        }
        ref = h.children;
        for (k = 0, len = ref.length; k < len; k++) {
          chKey = ref[k];
          ch = h[chKey];
          expandChildRow(ch, opts);
        }
        if (h.children.length !== 0) {
          if (opts.hideOnExpand) {
            expandHideRowSubtotal(h, opts);
          } else {
            expandShowRowSubtotal(h, opts);
          }
        }
        h.clickStatus = clickStatusExpanded;
        h.onClick = collapseRow;
        axisHeaders.ah[h.col].expandedCount++;
        return adjustAxisHeader(axisHeaders, h.col, opts);
      };
      collapseAxis = function(axisHeaders, col, attrs, opts) {
        var collapsible, h, i, k, ref, ref1, results;
        collapsible = Math.min(attrs.length - 2, opts.disableFrom - 1);
        if (col > collapsible) {
          return;
        }
        results = [];
        for (i = k = ref = collapsible, ref1 = col; k >= ref1; i = k += -1) {
          results.push((function() {
            var l, len, ref2, results1;
            ref2 = axisHeaders.ah[i].attrHeaders;
            results1 = [];
            for (l = 0, len = ref2.length; l < len; l++) {
              h = ref2[l];
              if (h.clickStatus === clickStatusExpanded && h.children.length !== 0) {
                results1.push(axisHeaders.collapseAttrHeader(axisHeaders, h, opts));
              }
            }
            return results1;
          })());
        }
        return results;
      };
      expandAxis = function(axisHeaders, col, attrs, opts) {
        var ah, h, i, k, ref, results;
        ah = axisHeaders.ah[col];
        results = [];
        for (i = k = 0, ref = col; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
          results.push((function() {
            var l, len, ref1, results1;
            ref1 = axisHeaders.ah[i].attrHeaders;
            results1 = [];
            for (l = 0, len = ref1.length; l < len; l++) {
              h = ref1[l];
              results1.push(axisHeaders.expandAttrHeader(axisHeaders, h, opts));
            }
            return results1;
          })());
        }
        return results;
      };
      main = function(rowAttrs, rowKeys, colAttrs, colKeys) {
        var chKey, colAttrHeaders, colAxisHeaders, colKeyHeaders, k, l, len, len1, node, ref, ref1, result, rowAttrHeaders, rowAxisHeaders, rowKeyHeaders, tbody, thead, tr;
        rowAttrHeaders = [];
        colAttrHeaders = [];
        if (colAttrs.length !== 0 && colKeys.length !== 0) {
          colKeyHeaders = processKeys(colKeys, "pvtColLabel");
        }
        if (rowAttrs.length !== 0 && rowKeys.length !== 0) {
          rowKeyHeaders = processKeys(rowKeys, "pvtRowLabel");
        }
        result = createElement("table", "pvtTable", null, {
          style: "display: none;"
        });
        thead = createElement("thead");
        result.appendChild(thead);
        if (colAttrs.length !== 0) {
          colAxisHeaders = buildColAxisHeaders(thead, rowAttrs, colAttrs, opts);
          node = {
            counter: 0
          };
          ref = colKeyHeaders.children;
          for (k = 0, len = ref.length; k < len; k++) {
            chKey = ref[k];
            buildColHeader(colAxisHeaders, colAttrHeaders, colKeyHeaders[chKey], rowAttrs, colAttrs, node, opts);
          }
          buildRowTotalsHeader(colAxisHeaders.ah[0].tr, rowAttrs, colAttrs);
        }
        tbody = createElement("tbody");
        result.appendChild(tbody);
        if (rowAttrs.length !== 0) {
          rowAxisHeaders = buildRowAxisHeaders(thead, rowAttrs, colAttrs, opts);
          if (colAttrs.length === 0) {
            buildRowTotalsHeader(rowAxisHeaders.tr, rowAttrs, colAttrs);
          }
          node = {
            counter: 0
          };
          ref1 = rowKeyHeaders.children;
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            chKey = ref1[l];
            buildRowHeader(tbody, rowAxisHeaders, rowAttrHeaders, rowKeyHeaders[chKey], rowAttrs, colAttrs, node, opts);
          }
        }
        buildValues(tbody, colAttrHeaders, rowAttrHeaders, rowAttrs, colAttrs, opts);
        tr = buildColTotalsHeader(rowAttrs, colAttrs);
        if (colAttrs.length > 0) {
          buildColTotals(tr, colAttrHeaders, rowAttrs, colAttrs, opts);
        }
        buildGrandTotal(tbody, tr, rowAttrs, colAttrs, opts);
        collapseAxis(colAxisHeaders, opts.colSubtotalDisplay.collapseAt, colAttrs, opts.colSubtotalDisplay);
        collapseAxis(rowAxisHeaders, opts.rowSubtotalDisplay.collapseAt, rowAttrs, opts.rowSubtotalDisplay);
        result.setAttribute("data-numrows", rowKeys.length);
        result.setAttribute("data-numcols", colKeys.length);
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
