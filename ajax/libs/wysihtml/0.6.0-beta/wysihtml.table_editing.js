wysihtml.commands.addTableCells = {
  exec: function(composer, command, value) {
    if (composer.tableSelection && composer.tableSelection.start && composer.tableSelection.end) {

      // switches start and end if start is bigger than end (reverse selection)
      var tableSelect = wysihtml.dom.table.orderSelectionEnds(composer.tableSelection.start, composer.tableSelection.end);
      if (value == 'before' || value == 'above') {
        wysihtml.dom.table.addCells(tableSelect.start, value);
      } else if (value == 'after' || value == 'below') {
        wysihtml.dom.table.addCells(tableSelect.end, value);
      }
      setTimeout(function() {
        composer.tableSelection.select(tableSelect.start, tableSelect.end);
      },0);
    }
  },

  state: function(composer, command) {
    return false;
  }
};

wysihtml.commands.createTable = {
  exec: function(composer, command, value) {
    var col, row, html;
    if (value && value.cols && value.rows && parseInt(value.cols, 10) > 0 && parseInt(value.rows, 10) > 0) {
      if (value.tableStyle) {
        html = '<table style="' + value.tableStyle + '">';
      } else {
        html = '<table>';
      }
      html += '<tbody>';
      for (row = 0; row < value.rows; row ++) {
        html += '<tr>';
        for (col = 0; col < value.cols; col ++) {
          html += '<td><br></td>';
        }
        html += '</tr>';
      }
      html += '</tbody></table>';
      composer.commands.exec('insertHTML', html);
    }
  },

  state: function(composer, command) {
    return false;
  }
};

wysihtml.commands.deleteTableCells = {
  exec: function(composer, command, value) {
    if (composer.tableSelection && composer.tableSelection.start && composer.tableSelection.end) {
      var tableSelect = wysihtml.dom.table.orderSelectionEnds(composer.tableSelection.start, composer.tableSelection.end),
          idx = wysihtml.dom.table.indexOf(tableSelect.start),
          selCell,
          table = composer.tableSelection.table;

      wysihtml.dom.table.removeCells(tableSelect.start, value);
      setTimeout(function() {
        // move selection to next or previous if not present
        selCell = wysihtml.dom.table.findCell(table, idx);

        if (!selCell) {
          if (value == 'row') {
            selCell = wysihtml.dom.table.findCell(table, {
              'row': idx.row - 1,
              'col': idx.col
            });
          }

          if (value == 'column') {
            selCell = wysihtml.dom.table.findCell(table, {
              'row': idx.row,
              'col': idx.col - 1
            });
          }
        }
        if (selCell) {
          composer.tableSelection.select(selCell, selCell);
        }
      }, 0);
    }
  },

  state: function(composer, command) {
    return false;
  }
};

wysihtml.commands.mergeTableCells = {
  exec: function(composer, command) {
    if (composer.tableSelection && composer.tableSelection.start && composer.tableSelection.end) {
      if (this.state(composer, command)) {
        wysihtml.dom.table.unmergeCell(composer.tableSelection.start);
      } else {
        wysihtml.dom.table.mergeCellsBetween(composer.tableSelection.start, composer.tableSelection.end);
      }
    }
  },

  state: function(composer, command) {
    if (composer.tableSelection) {
      var start = composer.tableSelection.start,
          end = composer.tableSelection.end;
      if (start && end && start == end &&
        ((
          wysihtml.dom.getAttribute(start, 'colspan') &&
          parseInt(wysihtml.dom.getAttribute(start, 'colspan'), 10) > 1
        ) || (
          wysihtml.dom.getAttribute(start, 'rowspan') &&
          parseInt(wysihtml.dom.getAttribute(start, 'rowspan'), 10) > 1
        ))
      ) {
        return [start];
      }
    }
    return false;
  }
};

(function() {

  var api = wysihtml.dom;

  var MapCell = function(cell) {
    this.el = cell;
    this.isColspan= false;
    this.isRowspan= false;
    this.firstCol= true;
    this.lastCol= true;
    this.firstRow= true;
    this.lastRow= true;
    this.isReal= true;
    this.spanCollection= [];
    this.modified = false;
  };

  var TableModifyerByCell = function (cell, table) {
    if (cell) {
      this.cell = cell;
      this.table = api.getParentElement(cell, { query: "table" });
    } else if (table) {
      this.table = table;
      this.cell = this.table.querySelectorAll('th, td')[0];
    }
  };

  function queryInList(list, query) {
    var ret = [],
      q;
    for (var e = 0, len = list.length; e < len; e++) {
      q = list[e].querySelectorAll(query);
      if (q) {
        for(var i = q.length; i--; ret.unshift(q[i]));
      }
    }
    return ret;
  }

  function removeElement(el) {
    el.parentNode.removeChild(el);
  }

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  function nextNode(node, tag) {
    var element = node.nextSibling;
    while (element.nodeType !=1) {
      element = element.nextSibling;
      if (!tag || tag == element.tagName.toLowerCase()) {
        return element;
      }
    }
    return null;
  }

  TableModifyerByCell.prototype = {

    addSpannedCellToMap: function(cell, map, r, c, cspan, rspan) {
      var spanCollect = [],
        rmax = r + ((rspan) ? parseInt(rspan, 10) - 1 : 0),
        cmax = c + ((cspan) ? parseInt(cspan, 10) - 1 : 0);

      for (var rr = r; rr <= rmax; rr++) {
        if (typeof map[rr] == "undefined") { map[rr] = []; }
        for (var cc = c; cc <= cmax; cc++) {
          map[rr][cc] = new MapCell(cell);
          map[rr][cc].isColspan = (cspan && parseInt(cspan, 10) > 1);
          map[rr][cc].isRowspan = (rspan && parseInt(rspan, 10) > 1);
          map[rr][cc].firstCol = cc == c;
          map[rr][cc].lastCol = cc == cmax;
          map[rr][cc].firstRow = rr == r;
          map[rr][cc].lastRow = rr == rmax;
          map[rr][cc].isReal = cc == c && rr == r;
          map[rr][cc].spanCollection = spanCollect;

          spanCollect.push(map[rr][cc]);
        }
      }
    },

    setCellAsModified: function(cell) {
      cell.modified = true;
      if (cell.spanCollection.length > 0) {
        for (var s = 0, smax = cell.spanCollection.length; s < smax; s++) {
        cell.spanCollection[s].modified = true;
        }
      }
    },

    setTableMap: function() {
      var map = [];
      var tableRows = this.getTableRows(),
        ridx, row, cells, cidx, cell,
        c,
        cspan, rspan;

      for (ridx = 0; ridx < tableRows.length; ridx++) {
        row = tableRows[ridx];
        cells = this.getRowCells(row);
        c = 0;
        if (typeof map[ridx] == "undefined") { map[ridx] = []; }
        for (cidx = 0; cidx < cells.length; cidx++) {
          cell = cells[cidx];

          // If cell allready set means it is set by col or rowspan,
          // so increase cols index until free col is found
          while (typeof map[ridx][c] != "undefined") { c++; }

          cspan = api.getAttribute(cell, 'colspan');
          rspan = api.getAttribute(cell, 'rowspan');

          if (cspan || rspan) {
            this.addSpannedCellToMap(cell, map, ridx, c, cspan, rspan);
            c = c + ((cspan) ? parseInt(cspan, 10) : 1);
          } else {
            map[ridx][c] = new MapCell(cell);
            c++;
          }
        }
      }
      this.map = map;
      return map;
    },

    getRowCells: function(row) {
      var inlineTables = this.table.querySelectorAll('table'),
        inlineCells = (inlineTables) ? queryInList(inlineTables, 'th, td') : [],
        allCells = row.querySelectorAll('th, td'),
        tableCells = (inlineCells.length > 0) ? wysihtml.lang.array(allCells).without(inlineCells) : allCells;

      return tableCells;
    },

    getTableRows: function() {
      var inlineTables = this.table.querySelectorAll('table'),
        inlineRows = (inlineTables) ? queryInList(inlineTables, 'tr') : [],
        allRows = this.table.querySelectorAll('tr'),
        tableRows = (inlineRows.length > 0) ? wysihtml.lang.array(allRows).without(inlineRows) : allRows;

      return tableRows;
    },

    getMapIndex: function(cell) {
      var r_length = this.map.length,
        c_length = (this.map && this.map[0]) ? this.map[0].length : 0;

      for (var r_idx = 0;r_idx < r_length; r_idx++) {
        for (var c_idx = 0;c_idx < c_length; c_idx++) {
          if (this.map[r_idx][c_idx].el === cell) {
            return {'row': r_idx, 'col': c_idx};
          }
        }
      }
      return false;
    },

    getElementAtIndex: function(idx) {
      this.setTableMap();
      if (this.map[idx.row] && this.map[idx.row][idx.col] && this.map[idx.row][idx.col].el) {
        return this.map[idx.row][idx.col].el;
      }
      return null;
    },

    getMapElsTo: function(to_cell) {
      var els = [];
      this.setTableMap();
      this.idx_start = this.getMapIndex(this.cell);
      this.idx_end = this.getMapIndex(to_cell);

      // switch indexes if start is bigger than end
      if (this.idx_start.row > this.idx_end.row || (this.idx_start.row == this.idx_end.row && this.idx_start.col > this.idx_end.col)) {
        var temp_idx = this.idx_start;
        this.idx_start = this.idx_end;
        this.idx_end = temp_idx;
      }
      if (this.idx_start.col > this.idx_end.col) {
        var temp_cidx = this.idx_start.col;
        this.idx_start.col = this.idx_end.col;
        this.idx_end.col = temp_cidx;
      }

      if (this.idx_start != null && this.idx_end != null) {
        for (var row = this.idx_start.row, maxr = this.idx_end.row; row <= maxr; row++) {
          for (var col = this.idx_start.col, maxc = this.idx_end.col; col <= maxc; col++) {
            els.push(this.map[row][col].el);
          }
        }
      }
      return els;
    },

    orderSelectionEnds: function(secondcell) {
      this.setTableMap();
      this.idx_start = this.getMapIndex(this.cell);
      this.idx_end = this.getMapIndex(secondcell);

      // switch indexes if start is bigger than end
      if (this.idx_start.row > this.idx_end.row || (this.idx_start.row == this.idx_end.row && this.idx_start.col > this.idx_end.col)) {
        var temp_idx = this.idx_start;
        this.idx_start = this.idx_end;
        this.idx_end = temp_idx;
      }
      if (this.idx_start.col > this.idx_end.col) {
        var temp_cidx = this.idx_start.col;
        this.idx_start.col = this.idx_end.col;
        this.idx_end.col = temp_cidx;
      }

      return {
        "start": this.map[this.idx_start.row][this.idx_start.col].el,
        "end": this.map[this.idx_end.row][this.idx_end.col].el
      };
    },

    createCells: function(tag, nr, attrs) {
      var doc = this.table.ownerDocument,
        frag = doc.createDocumentFragment(),
        cell;
      for (var i = 0; i < nr; i++) {
        cell = doc.createElement(tag);

        if (attrs) {
          for (var attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
              cell.setAttribute(attr, attrs[attr]);
            }
          }
        }

        // add non breaking space
        cell.appendChild(document.createTextNode("\u00a0"));
        frag.appendChild(cell);
      }
      return frag;
    },

    // Returns next real cell (not part of spanned cell unless first) on row if selected index is not real. I no real cells -1 will be returned
    correctColIndexForUnreals: function(col, row) {
      var r = this.map[row],
        corrIdx = -1;
      for (var i = 0, max = col; i < col; i++) {
        if (r[i].isReal){
          corrIdx++;
        }
      }
      return corrIdx;
    },

    getLastNewCellOnRow: function(row, rowLimit) {
      var cells = this.getRowCells(row),
        cell, idx;

      for (var cidx = 0, cmax = cells.length; cidx < cmax; cidx++) {
        cell = cells[cidx];
        idx = this.getMapIndex(cell);
        if (idx === false || (typeof rowLimit != "undefined" && idx.row != rowLimit)) {
          return cell;
        }
      }
      return null;
    },

    removeEmptyTable: function() {
      var cells = this.table.querySelectorAll('td, th');
      if (!cells || cells.length == 0) {
        removeElement(this.table);
        return true;
      } else {
        return false;
      }
    },

    // Splits merged cell on row to unique cells
    splitRowToCells: function(cell) {
      if (cell.isColspan) {
        var colspan = parseInt(api.getAttribute(cell.el, 'colspan') || 1, 10),
          cType = cell.el.tagName.toLowerCase();
        if (colspan > 1) {
          var newCells = this.createCells(cType, colspan -1);
          insertAfter(cell.el, newCells);
        }
        cell.el.removeAttribute('colspan');
      }
    },

    getRealRowEl: function(force, idx) {
      var r = null,
        c = null;

      idx = idx || this.idx;

      for (var cidx = 0, cmax = this.map[idx.row].length; cidx < cmax; cidx++) {
        c = this.map[idx.row][cidx];
        if (c.isReal) {
          r = api.getParentElement(c.el, { query: "tr" });
          if (r) {
            return r;
          }
        }
      }

      if (r === null && force) {
        r = api.getParentElement(this.map[idx.row][idx.col].el, { query: "tr" }) || null;
      }

      return r;
    },

    injectRowAt: function(row, col, colspan, cType, c) {
      var r = this.getRealRowEl(false, {'row': row, 'col': col}),
        new_cells = this.createCells(cType, colspan);

      if (r) {
        var n_cidx = this.correctColIndexForUnreals(col, row);
        if (n_cidx >= 0) {
          insertAfter(this.getRowCells(r)[n_cidx], new_cells);
        } else {
          r.insertBefore(new_cells, r.firstChild);
        }
      } else {
        var rr = this.table.ownerDocument.createElement('tr');
        rr.appendChild(new_cells);
        insertAfter(api.getParentElement(c.el, { query: "tr" }), rr);
      }
    },

    canMerge: function(to) {
      this.to = to;
      this.setTableMap();
      this.idx_start = this.getMapIndex(this.cell);
      this.idx_end = this.getMapIndex(this.to);

      // switch indexes if start is bigger than end
      if (this.idx_start.row > this.idx_end.row || (this.idx_start.row == this.idx_end.row && this.idx_start.col > this.idx_end.col)) {
        var temp_idx = this.idx_start;
        this.idx_start = this.idx_end;
        this.idx_end = temp_idx;
      }
      if (this.idx_start.col > this.idx_end.col) {
        var temp_cidx = this.idx_start.col;
        this.idx_start.col = this.idx_end.col;
        this.idx_end.col = temp_cidx;
      }

      for (var row = this.idx_start.row, maxr = this.idx_end.row; row <= maxr; row++) {
        for (var col = this.idx_start.col, maxc = this.idx_end.col; col <= maxc; col++) {
          if (this.map[row][col].isColspan || this.map[row][col].isRowspan) {
            return false;
          }
        }
      }
      return true;
    },

    decreaseCellSpan: function(cell, span) {
      var nr = parseInt(api.getAttribute(cell.el, span), 10) - 1;
      if (nr >= 1) {
        cell.el.setAttribute(span, nr);
      } else {
        cell.el.removeAttribute(span);
        if (span == 'colspan') {
          cell.isColspan = false;
        }
        if (span == 'rowspan') {
          cell.isRowspan = false;
        }
        cell.firstCol = true;
        cell.lastCol = true;
        cell.firstRow = true;
        cell.lastRow = true;
        cell.isReal = true;
      }
    },

    removeSurplusLines: function() {
      var row, cell, ridx, rmax, cidx, cmax, allRowspan;

      this.setTableMap();
      if (this.map) {
        ridx = 0;
        rmax = this.map.length;
        for (;ridx < rmax; ridx++) {
          row = this.map[ridx];
          allRowspan = true;
          cidx = 0;
          cmax = row.length;
          for (; cidx < cmax; cidx++) {
            cell = row[cidx];
            if (!(api.getAttribute(cell.el, "rowspan") && parseInt(api.getAttribute(cell.el, "rowspan"), 10) > 1 && cell.firstRow !== true)) {
              allRowspan = false;
              break;
            }
          }
          if (allRowspan) {
            cidx = 0;
            for (; cidx < cmax; cidx++) {
              this.decreaseCellSpan(row[cidx], 'rowspan');
            }
          }
        }

        // remove rows without cells
        var tableRows = this.getTableRows();
        ridx = 0;
        rmax = tableRows.length;
        for (;ridx < rmax; ridx++) {
          row = tableRows[ridx];
          if (row.childNodes.length == 0 && (/^\s*$/.test(row.textContent || row.innerText))) {
            removeElement(row);
          }
        }
      }
    },

    fillMissingCells: function() {
      var r_max = 0,
        c_max = 0,
        prevcell = null;

      this.setTableMap();
      if (this.map) {

        // find maximal dimensions of broken table
        r_max = this.map.length;
        for (var ridx = 0; ridx < r_max; ridx++) {
          if (this.map[ridx].length > c_max) { c_max = this.map[ridx].length; }
        }

        for (var row = 0; row < r_max; row++) {
          for (var col = 0; col < c_max; col++) {
            if (this.map[row] && !this.map[row][col]) {
              if (col > 0) {
                this.map[row][col] = new MapCell(this.createCells('td', 1));
                prevcell = this.map[row][col-1];
                if (prevcell && prevcell.el && prevcell.el.parent) { // if parent does not exist element is removed from dom
                  insertAfter(this.map[row][col-1].el, this.map[row][col].el);
                }
              }
            }
          }
        }
      }
    },

    rectify: function() {
      if (!this.removeEmptyTable()) {
        this.removeSurplusLines();
        this.fillMissingCells();
        return true;
      } else {
        return false;
      }
    },

    unmerge: function() {
      if (this.rectify()) {
        this.setTableMap();
        this.idx = this.getMapIndex(this.cell);

        if (this.idx) {
          var thisCell = this.map[this.idx.row][this.idx.col],
            colspan = (api.getAttribute(thisCell.el, "colspan")) ? parseInt(api.getAttribute(thisCell.el, "colspan"), 10) : 1,
            cType = thisCell.el.tagName.toLowerCase();

          if (thisCell.isRowspan) {
            var rowspan = parseInt(api.getAttribute(thisCell.el, "rowspan"), 10);
            if (rowspan > 1) {
              for (var nr = 1, maxr = rowspan - 1; nr <= maxr; nr++){
                this.injectRowAt(this.idx.row + nr, this.idx.col, colspan, cType, thisCell);
              }
            }
            thisCell.el.removeAttribute('rowspan');
          }
          this.splitRowToCells(thisCell);
        }
      }
    },

    // merges cells from start cell (defined in creating obj) to "to" cell
    merge: function(to) {
      if (this.rectify()) {
        if (this.canMerge(to)) {
          var rowspan = this.idx_end.row - this.idx_start.row + 1,
            colspan = this.idx_end.col - this.idx_start.col + 1;

          for (var row = this.idx_start.row, maxr = this.idx_end.row; row <= maxr; row++) {
            for (var col = this.idx_start.col, maxc = this.idx_end.col; col <= maxc; col++) {

              if (row == this.idx_start.row && col == this.idx_start.col) {
                if (rowspan > 1) {
                  this.map[row][col].el.setAttribute('rowspan', rowspan);
                }
                if (colspan > 1) {
                  this.map[row][col].el.setAttribute('colspan', colspan);
                }
              } else {
                // transfer content
                if (!(/^\s*<br\/?>\s*$/.test(this.map[row][col].el.innerHTML.toLowerCase()))) {
                  this.map[this.idx_start.row][this.idx_start.col].el.innerHTML += ' ' + this.map[row][col].el.innerHTML;
                }
                removeElement(this.map[row][col].el);
              }

            }
          }
          this.rectify();
        } else {
          if (window.console) {
            console.log('Do not know how to merge allready merged cells.');
          }
        }
      }
    },

    // Decreases rowspan of a cell if it is done on first cell of rowspan row (real cell)
    // Cell is moved to next row (if it is real)
    collapseCellToNextRow: function(cell) {
      var cellIdx = this.getMapIndex(cell.el),
        newRowIdx = cellIdx.row + 1,
        newIdx = {'row': newRowIdx, 'col': cellIdx.col};

      if (newRowIdx < this.map.length) {

        var row = this.getRealRowEl(false, newIdx);
        if (row !== null) {
          var n_cidx = this.correctColIndexForUnreals(newIdx.col, newIdx.row);
          if (n_cidx >= 0) {
            insertAfter(this.getRowCells(row)[n_cidx], cell.el);
          } else {
            var lastCell = this.getLastNewCellOnRow(row, newRowIdx);
            if (lastCell !== null) {
              insertAfter(lastCell, cell.el);
            } else {
              row.insertBefore(cell.el, row.firstChild);
            }
          }
          if (parseInt(api.getAttribute(cell.el, 'rowspan'), 10) > 2) {
            cell.el.setAttribute('rowspan', parseInt(api.getAttribute(cell.el, 'rowspan'), 10) - 1);
          } else {
            cell.el.removeAttribute('rowspan');
          }
        }
      }
    },

    // Removes a cell when removing a row
    // If is rowspan cell then decreases the rowspan
    // and moves cell to next row if needed (is first cell of rowspan)
    removeRowCell: function(cell) {
      if (cell.isReal) {
        if (cell.isRowspan) {
          this.collapseCellToNextRow(cell);
        } else {
          removeElement(cell.el);
        }
      } else {
        if (parseInt(api.getAttribute(cell.el, 'rowspan'), 10) > 2) {
          cell.el.setAttribute('rowspan', parseInt(api.getAttribute(cell.el, 'rowspan'), 10) - 1);
        } else {
          cell.el.removeAttribute('rowspan');
        }
      }
    },

    getRowElementsByCell: function() {
      var cells = [];
      this.setTableMap();
      this.idx = this.getMapIndex(this.cell);
      if (this.idx !== false) {
        var modRow = this.map[this.idx.row];
        for (var cidx = 0, cmax = modRow.length; cidx < cmax; cidx++) {
          if (modRow[cidx].isReal) {
            cells.push(modRow[cidx].el);
          }
        }
      }
      return cells;
    },

    getColumnElementsByCell: function() {
      var cells = [];
      this.setTableMap();
      this.idx = this.getMapIndex(this.cell);
      if (this.idx !== false) {
        for (var ridx = 0, rmax = this.map.length; ridx < rmax; ridx++) {
          if (this.map[ridx][this.idx.col] && this.map[ridx][this.idx.col].isReal) {
            cells.push(this.map[ridx][this.idx.col].el);
          }
        }
      }
      return cells;
    },

    // Removes the row of selected cell
    removeRow: function() {
      var oldRow = api.getParentElement(this.cell, { query: "tr" });
      if (oldRow) {
        this.setTableMap();
        this.idx = this.getMapIndex(this.cell);
        if (this.idx !== false) {
          var modRow = this.map[this.idx.row];
          for (var cidx = 0, cmax = modRow.length; cidx < cmax; cidx++) {
            if (!modRow[cidx].modified) {
              this.setCellAsModified(modRow[cidx]);
              this.removeRowCell(modRow[cidx]);
            }
          }
        }
        removeElement(oldRow);
      }
    },

    removeColCell: function(cell) {
      if (cell.isColspan) {
        if (parseInt(api.getAttribute(cell.el, 'colspan'), 10) > 2) {
          cell.el.setAttribute('colspan', parseInt(api.getAttribute(cell.el, 'colspan'), 10) - 1);
        } else {
          cell.el.removeAttribute('colspan');
        }
      } else if (cell.isReal) {
        removeElement(cell.el);
      }
    },

    removeColumn: function() {
      this.setTableMap();
      this.idx = this.getMapIndex(this.cell);
      if (this.idx !== false) {
        for (var ridx = 0, rmax = this.map.length; ridx < rmax; ridx++) {
          if (!this.map[ridx][this.idx.col].modified) {
            this.setCellAsModified(this.map[ridx][this.idx.col]);
            this.removeColCell(this.map[ridx][this.idx.col]);
          }
        }
      }
    },

    // removes row or column by selected cell element
    remove: function(what) {
      if (this.rectify()) {
        switch (what) {
          case 'row':
            this.removeRow();
          break;
          case 'column':
            this.removeColumn();
          break;
        }
        this.rectify();
      }
    },

    addRow: function(where) {
      var doc = this.table.ownerDocument;

      this.setTableMap();
      this.idx = this.getMapIndex(this.cell);
      if (where == "below" && api.getAttribute(this.cell, 'rowspan')) {
        this.idx.row = this.idx.row + parseInt(api.getAttribute(this.cell, 'rowspan'), 10) - 1;
      }

      if (this.idx !== false) {
        var modRow = this.map[this.idx.row],
          newRow = doc.createElement('tr');

        for (var ridx = 0, rmax = modRow.length; ridx < rmax; ridx++) {
          if (!modRow[ridx].modified) {
            this.setCellAsModified(modRow[ridx]);
            this.addRowCell(modRow[ridx], newRow, where);
          }
        }

        switch (where) {
          case 'below':
            insertAfter(this.getRealRowEl(true), newRow);
          break;
          case 'above':
            var cr = api.getParentElement(this.map[this.idx.row][this.idx.col].el, { query: "tr" });
            if (cr) {
              cr.parentNode.insertBefore(newRow, cr);
            }
          break;
        }
      }
    },

    addRowCell: function(cell, row, where) {
      var colSpanAttr = (cell.isColspan) ? {"colspan" : api.getAttribute(cell.el, 'colspan')} : null;
      if (cell.isReal) {
        if (where != 'above' && cell.isRowspan) {
          cell.el.setAttribute('rowspan', parseInt(api.getAttribute(cell.el,'rowspan'), 10) + 1);
        } else {
          row.appendChild(this.createCells('td', 1, colSpanAttr));
        }
      } else {
        if (where != 'above' && cell.isRowspan && cell.lastRow) {
          row.appendChild(this.createCells('td', 1, colSpanAttr));
        } else if (c.isRowspan) {
          cell.el.attr('rowspan', parseInt(api.getAttribute(cell.el, 'rowspan'), 10) + 1);
        }
      }
    },

    add: function(where) {
      if (this.rectify()) {
        if (where == 'below' || where == 'above') {
          this.addRow(where);
        }
        if (where == 'before' || where == 'after') {
          this.addColumn(where);
        }
      }
    },

    addColCell: function (cell, ridx, where) {
      var doAdd,
        cType = cell.el.tagName.toLowerCase();

      // defines add cell vs expand cell conditions
      // true means add
      switch (where) {
        case "before":
          doAdd = (!cell.isColspan || cell.firstCol);
        break;
        case "after":
          doAdd = (!cell.isColspan || cell.lastCol || (cell.isColspan && cell.el == this.cell));
        break;
      }

      if (doAdd){
        // adds a cell before or after current cell element
        switch (where) {
          case "before":
            cell.el.parentNode.insertBefore(this.createCells(cType, 1), cell.el);
          break;
          case "after":
            insertAfter(cell.el, this.createCells(cType, 1));
          break;
        }

        // handles if cell has rowspan
        if (cell.isRowspan) {
          this.handleCellAddWithRowspan(cell, ridx+1, where);
        }

      } else {
        // expands cell
        cell.el.setAttribute('colspan',  parseInt(api.getAttribute(cell.el, 'colspan'), 10) + 1);
      }
    },

    addColumn: function(where) {
      var row, modCell;

      this.setTableMap();
      this.idx = this.getMapIndex(this.cell);
      if (where == "after" && api.getAttribute(this.cell, 'colspan')) {
        this.idx.col = this.idx.col + parseInt(api.getAttribute(this.cell, 'colspan'), 10) - 1;
      }

      if (this.idx !== false) {
        for (var ridx = 0, rmax = this.map.length; ridx < rmax; ridx++ ) {
          row = this.map[ridx];
          if (row[this.idx.col]) {
            modCell = row[this.idx.col];
            if (!modCell.modified) {
              this.setCellAsModified(modCell);
              this.addColCell(modCell, ridx , where);
            }
          }
        }
      }
    },

    handleCellAddWithRowspan: function (cell, ridx, where) {
      var addRowsNr = parseInt(api.getAttribute(this.cell, 'rowspan'), 10) - 1,
        crow = api.getParentElement(cell.el, { query: "tr" }),
        cType = cell.el.tagName.toLowerCase(),
        cidx, temp_r_cells,
        doc = this.table.ownerDocument,
        nrow;

      for (var i = 0; i < addRowsNr; i++) {
        cidx = this.correctColIndexForUnreals(this.idx.col, (ridx + i));
        crow = nextNode(crow, 'tr');
        if (crow) {
          if (cidx > 0) {
            switch (where) {
              case "before":
                temp_r_cells = this.getRowCells(crow);
                if (cidx > 0 && this.map[ridx + i][this.idx.col].el != temp_r_cells[cidx] && cidx == temp_r_cells.length - 1) {
                   insertAfter(temp_r_cells[cidx], this.createCells(cType, 1));
                } else {
                  temp_r_cells[cidx].parentNode.insertBefore(this.createCells(cType, 1), temp_r_cells[cidx]);
                }

              break;
              case "after":
                insertAfter(this.getRowCells(crow)[cidx], this.createCells(cType, 1));
              break;
            }
          } else {
            crow.insertBefore(this.createCells(cType, 1), crow.firstChild);
          }
        } else {
          nrow = doc.createElement('tr');
          nrow.appendChild(this.createCells(cType, 1));
          this.table.appendChild(nrow);
        }
      }
    }
  };

  api.table = {
    getCellsBetween: function(cell1, cell2) {
      var c1 = new TableModifyerByCell(cell1);
      return c1.getMapElsTo(cell2);
    },

    addCells: function(cell, where) {
      var c = new TableModifyerByCell(cell);
      c.add(where);
    },

    removeCells: function(cell, what) {
      var c = new TableModifyerByCell(cell);
      c.remove(what);
    },

    mergeCellsBetween: function(cell1, cell2) {
      var c1 = new TableModifyerByCell(cell1);
      c1.merge(cell2);
    },

    unmergeCell: function(cell) {
      var c = new TableModifyerByCell(cell);
      c.unmerge();
    },

    orderSelectionEnds: function(cell, cell2) {
      var c = new TableModifyerByCell(cell);
      return c.orderSelectionEnds(cell2);
    },

    indexOf: function(cell) {
      var c = new TableModifyerByCell(cell);
      c.setTableMap();
      return c.getMapIndex(cell);
    },

    findCell: function(table, idx) {
      var c = new TableModifyerByCell(null, table);
      return c.getElementAtIndex(idx);
    },

    findRowByCell: function(cell) {
      var c = new TableModifyerByCell(cell);
      return c.getRowElementsByCell();
    },

    findColumnByCell: function(cell) {
      var c = new TableModifyerByCell(cell);
      return c.getColumnElementsByCell();
    },

    canMerge: function(cell1, cell2) {
      var c = new TableModifyerByCell(cell1);
      return c.canMerge(cell2);
    }
  };

})();

(function() {

  // Keep the old composer.observe function.
  var oldObserverFunction = wysihtml.views.Composer.prototype.observe;

  var extendedObserverFunction = function() {
    oldObserverFunction.call(this);
    // Bind the table user interaction tracking
    if (this.config.handleTables) {
      // If handleTables option is true, table handling functions are bound
      initTableHandling.call(this);
    }
  };

  // Table management.
  // If present enableObjectResizing and enableInlineTableEditing command
  // should be called with false to prevent native table handlers.
  var initTableHandling = function() {
    var hideHandlers = function() {
          this.win.removeEventListener('load', hideHandlers);
          this.doc.execCommand('enableObjectResizing', false, 'false');
          this.doc.execCommand('enableInlineTableEditing', false, 'false');
        }.bind(this),
        iframeInitiator = (function() {
          hideHandlers.call(this);
          actions.removeListeners(this.sandbox.getIframe(), ['focus', 'mouseup', 'mouseover'], iframeInitiator);
        }).bind(this);

    if (
      this.doc.execCommand &&
      wysihtml.browser.supportsCommand(this.doc, 'enableObjectResizing') &&
      wysihtml.browser.supportsCommand(this.doc, 'enableInlineTableEditing')
    ) {
      if (this.sandbox.getIframe) {
        actions.addListeners(this.sandbox.getIframe(), ['focus', 'mouseup', 'mouseover'], iframeInitiator);
      } else {
        this.win.addEventListener('load', hideHandlers);
      }
    }
    this.tableSelection = wysihtml.quirks.tableCellsSelection(this.element, this.parent);
  };
  
  // Cell selections handling
  var tableCellsSelection = function(editable, editor) {

    var init = function() {
      editable.addEventListener('mousedown', handleMouseDown);
      return select;
    };

    var handleMouseDown = function(event) {
      var target = wysihtml.dom.getParentElement(event.target, {query: 'td, th'}, false, editable);
      if (target) {
        handleSelectionMousedown(target);
      }
    };

    var handleSelectionMousedown = function(target) {
      select.start = target;
      select.end = target;
      select.cells = [target];
      select.table = dom.getParentElement(select.start, {query: 'table'}, false, editable);

      if (select.table) {
        removeCellSelections();
        dom.addClass(target, selectionClass);
        editable.addEventListener('mousemove', handleMouseMove);
        editable.addEventListener('mouseup', handleMouseUp);
        editor.fire('tableselectstart').fire('tableselectstart:composer');
      }
    };

    // remove all selection classes
    var removeCellSelections = function() {
      if (editable) {
        var selectedCells = editable.querySelectorAll('.' + selectionClass);
        if (selectedCells.length > 0) {
          for (var i = 0; i < selectedCells.length; i++) {
            dom.removeClass(selectedCells[i], selectionClass);
          }
        }
      }
    };

    var addSelections = function(cells) {
      for (var i = 0; i < cells.length; i++) {
        dom.addClass(cells[i], selectionClass);
      }
    };

    var handleMouseMove = function(event) {
      var curTable = null,
        cell = dom.getParentElement(event.target, {query: 'td, th'}, false, editable),
        oldEnd;

      if (cell && select.table && select.start) {
        curTable =  dom.getParentElement(cell, {query: 'table'}, false, editable);
        if (curTable && curTable === select.table) {
          removeCellSelections();
          oldEnd = select.end;
          select.end = cell;
          select.cells = dom.table.getCellsBetween(select.start, cell);
          if (select.cells.length > 1) {
            editor.composer.selection.deselect();
          }
          addSelections(select.cells);
          if (select.end !== oldEnd) {
            editor.fire('tableselectchange').fire('tableselectchange:composer');
          }
        }
      }
    };

    var handleMouseUp = function(event) {
      editable.removeEventListener('mousemove', handleMouseMove);
      editable.removeEventListener('mouseup', handleMouseUp);
      editor.fire('tableselect').fire('tableselect:composer');
      setTimeout(function() {
        bindSideclick();
      }, 0);
    };

    var sideClickHandler = function(event) {
      editable.ownerDocument.removeEventListener('click', sideClickHandler);
      if (dom.getParentElement(event.target, {query: 'table'}, false, editable) != select.table) {
        removeCellSelections();
        select.table = null;
        select.start = null;
        select.end = null;
        editor.fire('tableunselect').fire('tableunselect:composer');
      }
    };

    var bindSideclick = function() {
      editable.ownerDocument.addEventListener('click', sideClickHandler);
    };

    var selectCells = function(start, end) {
      select.start = start;
      select.end = end;
      select.table = dom.getParentElement(select.start, {query: 'table'}, false, editable);
      selectedCells = dom.table.getCellsBetween(select.start, select.end);
      addSelections(selectedCells);
      bindSideclick();
      editor.fire('tableselect').fire('tableselect:composer');
    };

    var dom = wysihtml.dom,
        select = {
          table: null,
          start: null,
          end: null,
          cells: null,
          select: selectCells
        },
        selectionClass = 'wysiwyg-tmp-selected-cell';

    return init();
  };

  // Bind to wysihtml
  wysihtml.Editor.prototype.defaults.handleTables = true;
  wysihtml.quirks.tableCellsSelection = tableCellsSelection;
  wysihtml.views.Composer.prototype.observe = extendedObserverFunction;

})();
