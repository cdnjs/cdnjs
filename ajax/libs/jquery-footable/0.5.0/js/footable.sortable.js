(function($, w, undefined) {
  if (w.footable == undefined || w.footable == null)
    throw new Error('Please check and make sure footable.js is included in the page and is loaded prior to this script.');

  var defaults = {
    sort: true,
    sorters: {
      alpha: function(a, b) {
        if (a == b) return 0;
        if (a < b) return -1;
        return 1;
      },
      numeric: function(a, b) {
        return a - b;
      }
    },
    parsers: {
      numeric: function(cell) {
        var val = $(cell).data('value') || $(cell).text().replace(/[^0-9.-]/g, '');
        val = parseFloat(val);
        if (isNaN(val)) val = 0;
        return val;
      }
    },
    classes: {
      sort: {
        sortable: 'footable-sortable',
        sorted: 'footable-sorted',
        descending: 'footable-sorted-desc',
        indicator: 'footable-sort-indicator'
      }
    }
  };

  function Sortable() {
    var p = this;
    p.name = 'Footable Sortable';
    p.init = function(ft) {
      if (ft.options.sort == true) {
        $(ft.table).bind({
          'footable_initialized': function(e) {
            var cls = ft.options.classes.sort, column;

            var $table = $(e.ft.table), $tbody = $table.find('> tbody'), $th;

            $table.find('> thead > tr:last-child > th, > thead > tr:last-child > td').each(function(ec) {
              $th = $(this), column = e.ft.columns[$th.index()];
              if (column.sort.ignore != true) {
                $th.addClass(cls.sortable);
                $('<span />').addClass(cls.indicator).appendTo($th);
              }
            });

            $table.find('> thead > tr:last-child > th.' + cls.sortable + ', > thead > tr:last-child > td.' + cls.sortable).click(function(ec) {
              $th = $(this), column = e.ft.columns[$th.index()];
              if (column.sort.ignore == true) return true;
              ec.preventDefault();

              $table.find('> thead > tr:last-child > th, > thead > tr:last-child > td').not($th).removeClass(cls.sorted + ' ' + cls.descending);

              if ($th.hasClass(cls.sorted)) {
                p.reverse(e.ft, $tbody);
                $th.removeClass(cls.sorted).addClass(cls.descending);
              } else if ($th.hasClass(cls.descending)) {
                p.reverse(e.ft, $tbody);
                $th.removeClass(cls.descending).addClass(cls.sorted);
              } else {
                p.sort(e.ft, $tbody, column);
                $th.removeClass(cls.descending).addClass(cls.sorted);
              }
              e.ft.bindToggleSelectors();
              e.ft.raise('footable_sorted', { column : column });
              return false;
            });

            var didSomeSorting = false;
            for (var c in e.ft.columns) {
              column = e.ft.columns[c];
              if (column.sort.initial) {
                p.sort(e.ft, $tbody, column);
                didSomeSorting = true;
                $th = $table.find('> thead > tr:last-child > th:eq(' + c + '), > thead > tr:last-child > td:eq(' + c + ')');

                if (column.sort.initial == 'descending') {
                  p.reverse(e.ft, $tbody);
                  $th.addClass(cls.descending);
                } else {
                  $th.addClass(cls.sorted);
                }

                break;
              } else if (column.sort.ignore != true) {

              }
            }
            if (didSomeSorting) {
              e.ft.bindToggleSelectors();
            }
          },
          'footable_column_data': function(e) {
            var $th = $(e.column.th);
            e.column.data.sort = e.column.data.sort || {};
            e.column.data.sort.initial = $th.data('sort-initial') || false;
            e.column.data.sort.ignore = $th.data('sort-ignore') || false;
            e.column.data.sort.selector = $th.data('sort-selector') || null;

            var match = $th.data('sort-match') || 0;
            if (match >= e.column.data.matches.length) match = 0;
            e.column.data.sort.match = e.column.data.matches[match];
          }
        });
      }
    };
    
    p.rows = function(ft, tbody, column) {
      var rows = [];
      tbody.find('> tr').each(function() {
        var $row = $(this), $next = null;
        if ($row.hasClass('footable-row-detail')) return true;
        if ($row.next().hasClass('footable-row-detail')) {
          $next = $row.next().get(0);
        }
        var row = { 'row': $row, 'detail': $next };
        if (column != undefined) {
          row.value = ft.parse(this.cells[column.sort.match], column);
        }
        rows.push(row);
        return true;
      }).remove();
      return rows;
    };

    p.sort = function(ft, tbody, column) {
      var rows = p.rows(ft, tbody, column);
      var sorter = ft.options.sorters[column.type] || ft.options.sorters.alpha;
      rows.sort(function(a, b) { return sorter(a.value, b.value); });
      for (var j = 0; j < rows.length; j++) {
        tbody.append(rows[j].row);
        if (rows[j].detail != null) {
          tbody.append(rows[j].detail);
        }
      }
    };

    p.reverse = function(ft, tbody) {
      var rows = p.rows(ft, tbody);
      for (var i = rows.length - 1; i >= 0; i--) {
        tbody.append(rows[i].row);
        if (rows[i].detail != null) {
          tbody.append(rows[i].detail);
        }
      }
    };
  }

  ;

  w.footable.plugins.register(new Sortable(), defaults);

})(jQuery, window);