;(function() {
  function Tablesort(el, options) {
    if (!el || el.tagName !== 'TABLE') {
      throw new Error('Element must be a table');
    }
    this.init(el, options || {});
  }

  var sortOptions = [];

  var createEvent = function(name) {
    var evt;

    if (!window.CustomEvent || typeof window.CustomEvent !== 'function') {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(name, false, false, undefined);
    } else {
      evt = new CustomEvent(name);
    }

    return evt;
  };

  var getInnerText = function(el) {
    return el.getAttribute('data-sort') || el.textContent || el.innerText || '';
  };

  // Default sort method if no better sort method is found
  var caseInsensitiveSort = function(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    if (a === b) return 0;
    if (a < b) return 1;

    return -1;
  };

  // Stable sort function
  // If two elements are equal under the original sort function,
  // then there relative order is reversed
  var stabilize = function(sort, antiStabilize) {
    return function(a, b) {
      var unstableResult = sort(a.td, b.td);

      if (unstableResult === 0) {
        if (antiStabilize) return b.index - a.index;
        return a.index - b.index;
      }

      return unstableResult;
    };
  };

  Tablesort.extend = function(name, pattern, sort) {
    if (typeof pattern !== 'function' || typeof sort !== 'function') {
      throw new Error('Pattern and sort must be a function');
    }

    sortOptions.push({
      name: name,
      pattern: pattern,
      sort: sort
    });
  };

  Tablesort.prototype = {

    init: function(el, options) {
      var that = this,
          firstRow,
          defaultSort,
          i,
          cell;

      that.table = el;
      that.thead = false;
      that.options = options;

      if (el.rows && el.rows.length > 0) {
        if (el.tHead && el.tHead.rows.length > 0) {
          firstRow = el.tHead.rows[el.tHead.rows.length - 1];
          that.thead = true;
        } else {
          firstRow = el.rows[0];
        }
      }

      if (!firstRow) return;

      var onClick = function() {
        if (that.current && that.current !== this) {
          that.current.classList.remove('sort-up');
          that.current.classList.remove('sort-down');
        }

        that.current = this;
        that.sortTable(this);
      };

      // Assume first row is the header and attach a click handler to each.
      for (i = 0; i < firstRow.cells.length; i++) {
        cell = firstRow.cells[i];
        if (!cell.classList.contains('no-sort')) {
          cell.classList.add('sort-header');
          cell.addEventListener('click', onClick, false);

          if (cell.classList.contains('sort-default')) {
            defaultSort = cell;
          }
        }
      }

      if (defaultSort) {
        that.current = defaultSort;
        that.sortTable(defaultSort);
      }
    },

    sortTable: function(header, update) {
      var that = this,
          column = header.cellIndex,
          sortFunction = caseInsensitiveSort,
          item = '',
          items = [],
          i = that.thead ? 0 : 1,
          sortMethod = header.getAttribute('data-sort-method');

      that.table.dispatchEvent(createEvent('beforeSort'));

      if (that.table.rows.length < 2) return;

      // If we force a sort method, it is not necessary to check rows
      if (!sortMethod) {
        while (items.length < 3 && i < that.table.tBodies[0].rows.length) {
          item = getInnerText(that.table.tBodies[0].rows[i].cells[column]);
          item = item.trim();

          if (item.length > 0) {
            items.push(item);
          }

          i++;
        }

        if (!items) return;
      }

      for (i = 0; i < sortOptions.length; i++) {
        item = sortOptions[i];

        if (sortMethod) {
          if (item.name === sortMethod) {
            sortFunction = item.sort;
            break;
          }
        } else if (items.every(item.pattern)) {
          sortFunction = item.sort;
          break;
        }
      }

      that.col = column;
      var newRows = [],
          noSorts = {},
          j,
          totalRows = 0,
          noSortsSoFar = 0,
          sortDir;

      for (i = 0; i < that.table.tBodies.length; i++) {
        for (j = 0; j < that.table.tBodies[i].rows.length; j++) {
          item = that.table.tBodies[i].rows[j];
          if (item.classList.contains('no-sort')) {
            // keep no-sorts in separate list to be able to insert
            // them back at their original position later
            noSorts[totalRows] = item;
          } else {
            // Save the index for stable sorting
            newRows.push({
              tr: item,
              td: getInnerText(item.cells[that.col]),
              index: totalRows
            });
          }
          totalRows++;
        }
      }

      // If updating an existing sort `sortDir` should remain unchanged.
      if (update) {
        sortDir = header.classList.contains('sort-up') ? 'sort-up' : 'sort-down';
      } else {
        if (header.classList.contains('sort-up')) {
          sortDir = 'sort-down';
        } else if (header.classList.contains('sort-down')) {
          sortDir = 'sort-up';
        } else {
          sortDir = that.options.descending ? 'sort-up' : 'sort-down';
        }

        header.classList.remove(sortDir === 'sort-down' ? 'sort-up' : 'sort-down');
        header.classList.add(sortDir);
      }

      // Before we append should we reverse the new array or not?
      // If we reverse, the sort needs to be `anti-stable` so that
      // the double negatives cancel out
      if (sortDir === 'sort-down') {
        newRows.sort(stabilize(sortFunction, true));
        newRows.reverse();
      } else {
        newRows.sort(stabilize(sortFunction, false));
      }

      // append rows that already exist rather than creating new ones
      for (i = 0; i < totalRows; i++) {
        if (noSorts[i]) {
          // We have a no-sort row for this position, insert it here.
          item = noSorts[i];
          noSortsSoFar++;
        } else {
          item = newRows[i - noSortsSoFar].tr;
        }

        // appendChild(x) moves x if already present somewhere else in the DOM
        that.table.tBodies[0].appendChild(item);
      }

      that.table.dispatchEvent(createEvent('afterSort'));
    },

    refresh: function() {
      if (this.current !== undefined) {
        this.sortTable(this.current, true);
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Tablesort;
  } else {
    window.Tablesort = Tablesort;
  }
})();
