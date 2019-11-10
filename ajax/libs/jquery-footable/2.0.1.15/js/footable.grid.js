(function($, w, undefined) {
  if (w.footable === undefined || w.foobox === null) throw new Error('Please check and make sure footable.js is included in the page and is loaded prior to this script.');
  var defaults = {
    grid: {
      enabled: true,
      data: null,
      template: null, //row html template, use for make a row.
      cols: null, //column define
      items: null, //data items
      url: null, //get data from url
      ajax: null, //paramater for $.ajax
      activeClass: 'active', //add to row selected
      multiSelect: false, //allow select multiple row
      showIndex: false, //show row index
      showCheckbox: false, //show checkbox for select
      showEmptyInfo: false, //when that is not data in table, show a info to notify user
      emptyInfo: '<p class="text-center text-warning">No Data</p>',
      pagination: {
        "page-size": 20,
        "pagination-class": "pagination pagination-centered"
      },
      indexFormatter: function(val, $td, index) {
        return index + 1;
      },
      checkboxFormatter: function(isTop) {
        return '<input type="checkbox" class="' + (isTop ? 'checkAll' : 'check') + '">';
      },
      events: {
        loaded: 'footable_grid_loaded',
        created: 'footable_grid_created',
        removed: 'footable_grid_removed',
        updated: 'footable_grid_updated'
      }
    }
  };

  function makeTh(col) {
    var $th = $('<th>' + col.title + '</th>');
    if ($.isPlainObject(col.data)) {
      $th.data(col.data);
    }
    if ($.isPlainObject(col.style)) {
      $th.css(col.style);
    }
    if (col.className) {
      $th.addClass(col.className);
    }
    return $th;
  }

  function initThead($table, options) {
    var $thead = $table.find('thead');
    if ($thead.size() === 0) {
      $thead = $('<thead>').appendTo($table);
    }
    var $row = $('<tr>').appendTo($thead);
    for (var i = 0, len = options.cols.length; i < len; i++) {
      $row.append(makeTh(options.cols[i]));
    }
  }

  function initTBody($table) {
    var $tbody = $table.find('tbody');
    if ($tbody.size() === 0) {
      $tbody = $('<tbody>').appendTo($table);
    }
  }

  function initPagination($table, cols, options) {
    if (options) {
      $table.attr("data-page-size", options['page-size']);
      var $tfoot = $table.find('tfoot');
      if ($tfoot.size() === 0) {
        $tfoot = $('<tfoot class="hide-if-no-paging"></tfoot>').appendTo($table);
      }
      $tfoot.append('<tr><td colspan=' + cols.length + '></td></tr>');
      var $pagination = $("<div>").appendTo($tfoot.find("tr:last-child td"));
      $pagination.addClass(options['pagination-class']);
    }
  }

  function setToggleColumn(cols) {
    var toggleColumn = cols[0];
    for (var i = 0, len = cols.length; i < len; i++) {
      var col = cols[i];
      if (col.data && (col.data.toggle === true || col.data.toggle === "true")) {
        return;
      }
    }
    toggleColumn.data = $.extend(toggleColumn.data, {
      toggle: true
    });
  }

  function makeEmptyInfo($table, cols, emptyInfo) {
    if ($table.find("tr.emptyInfo").size() === 0) {
       $table.find('tbody').append('<tr class="emptyInfo"><td colspan="' + cols.length + '">' + emptyInfo + '</td></tr>');
    }
  }

  function updateRowIndex($tbody, $newRow, detailClass, offset) {
    //update rows index
    $tbody.find('tr:not(.' + detailClass + ')').each(function() {
      var $row = $(this),
        index = $newRow.data('index'),
        oldIndex = parseInt($row.data('index'), 0),
        newIndex = oldIndex + offset;
      if (oldIndex >= index && this !== $newRow.get(0)) {
        $row.attr('data-index', newIndex).data('index', newIndex);
      }
    });
  }

  function Grid() {
    var grid = this;
    grid.name = 'Footable Grid';
    grid.init = function(ft) {
      var toggleClass = ft.options.classes.toggle;
      var detailClass = ft.options.classes.detail;
      var options = ft.options.grid;
      if (!options.cols) return;
      grid.footable = ft;
      var $table = $(ft.table);
      $table.data('grid', grid);
      if ($.isPlainObject(options.data)) {
        $table.data(options.data);
      }
      grid._items = [];
      setToggleColumn(options.cols);
      if (options.showCheckbox) {
        options.multiSelect = true;
        options.cols.unshift({
          title: options.checkboxFormatter(true),
          name: '',
          data: {
            "sort-ignore": true
          },
          formatter: options.checkboxFormatter
        });
      }
      if (options.showIndex) {
        options.cols.unshift({
          title: '#',
          name: 'index',
          data: {
            "sort-ignore": true
          },
          formatter: options.indexFormatter
        });
      }
      initThead($table, options);
      initTBody($table);
      initPagination($table, options.cols, options.pagination);
      $table.off('.grid').on({
        'footable_initialized.grid': function(e) {
          if (options.url || options.ajax) {
            $.ajax(options.ajax || {
              url: options.url
            }).then(function(resp) {
              grid.newItem(resp);
              ft.raise(options.events.loaded);
            }, function(jqXHR) {
              throw 'load data from ' + (options.url || options.ajax.url) + ' fail';
            });
          } else {
            grid.newItem(options.items || []);
            ft.raise(options.events.loaded);
          }
        },
        'footable_sorted.grid footable_grid_created.grid footable_grid_removed.grid': function(event) {
          if (options.showIndex && grid.getItem().length > 0) {
            $table.find('tbody tr:not(.' + detailClass + ')').each(function(index) {
              var $td = $(this).find('td:first');
              $td.html(options.indexFormatter(null, $td, index));
            });
          }
        },
        'footable_redrawn.grid footable_row_removed.grid': function(event) {
          if (grid.getItem().length === 0 && options.showEmptyInfo) {
            makeEmptyInfo($table, options.cols, options.emptyInfo);
          }
        }
      }).on({
        'click.grid': function(event) {
          if ($(event.target).closest('td').find('>.' + toggleClass).size() > 0) {
            return true;
          }
          var $tr = $(event.currentTarget);
          if ($tr.hasClass(detailClass)) {
            return true;
          }
          if (!options.multiSelect && !$tr.hasClass(options.activeClass)) {
            $table.find('tbody tr.' + options.activeClass).removeClass(options.activeClass);
          }
          $tr.toggleClass(options.activeClass);
          if (options.showCheckbox) {
            $tr.find('input:checkbox.check').prop('checked', function(index, val) {
              if (event.target === this) {
                return val;
              }
              return !val;
            });
          }
          ft.toggleDetail($tr);
        }
      }, 'tbody tr').on('click.grid', 'thead input:checkbox.checkAll', function(event) {
        var checked = !! event.currentTarget.checked;
        if (checked) {
          $table.find('tbody tr').addClass(options.activeClass);
        } else {
          $table.find('tbody tr').removeClass(options.activeClass);
        }
        $table.find('tbody input:checkbox.check').prop('checked', checked);
      });
    };
    /**
     * get selected rows index;
     */
    grid.getSelected = function() {
      var options = grid.footable.options.grid,
        $selected = $(grid.footable.table).find('tbody>tr.' + options.activeClass);
      return $selected.map(function() {
        return $(this).data('index');
      });
    };
    /**
     * get row's data by index
     */
    grid.getItem = function(index) {
      if (index !== undefined) {
        if ($.isArray(index)) {
          return $.map(index, function(item) {
            return grid._items[item];
          });
        }
        return grid._items[index];
      }
      return grid._items;
    };

    function makeCell(col, value, index) {
      var $td = $('<td>');
      if (col.formatter) {
        $td.html(col.formatter(value, $td, index));
      } else {
        $td.html(value || '');
      }
      return $td;
    }
    grid._makeRow = function(item, index) {
      var options = grid.footable.options.grid;
      var $row;
      if ($.isFunction(options.template)) {
        $row = $(options.template($.extend({}, {
          __index: index
        }, item)));
      } else {
        $row = $('<tr>');
        for (var i = 0, len = options.cols.length; i < len; i++) {
          var col = options.cols[i];
          $row.append(makeCell(col, item[col.name] || '', index));
        }
      }
      $row.attr('data-index', index);
      return $row;
    };
    /**
     * create rows by js object
     */
    grid.newItem = function(item, index, wait) {
      var $tbody = $(grid.footable.table).find('tbody');
      var detailClass = grid.footable.options.classes.detail;
      $tbody.find('tr.emptyInfo').remove();
      if ($.isArray(item)) {
        for (var atom;
          (atom = item.pop());) {
          grid.newItem(atom, index, true);
        }
        grid.footable.redraw();
        grid.footable.raise(grid.footable.options.grid.events.created, {
          item: item,
          index: index
        });
        return;
      }
      if (!$.isPlainObject(item)) {
        return;
      }
      var $tr, len = grid._items.length;
      if (index === undefined || index < 0 || index > len) {
        $tr = grid._makeRow(item, len++);
        grid._items.push(item);
        $tbody.append($tr);
      } else {
        $tr = grid._makeRow(item, index);
        if (index === 0) {
          grid._items.unshift(item);
          $tbody.prepend($tr);
        } else {
          var $before = $tbody.find('tr[data-index=' + (index - 1) + ']');
          grid._items.splice(index, 0, item);
          if ($before.data('detail_created') === true) {
            $before = $before.next();
          }
          $before.after($tr);
        }
        updateRowIndex($tbody, $tr, detailClass, 1);
      }
      if (!wait) {
        grid.footable.redraw();
        grid.footable.raise(grid.footable.options.grid.events.created, {
          item: item,
          index: index
        });
      }
    };
    /**
     * update row by js object
     */
    grid.setItem = function(item, index) {
      if (!$.isPlainObject(item)) {
        return;
      }
      var $tbody = $(grid.footable.table).find('tbody'),
        $newTr = grid._makeRow(item, index);
      $.extend(grid._items[index], item);
      var $tr = $tbody.find('tr').eq(index);
      $tr.html($newTr.html());
      grid.footable.redraw();
      grid.footable.raise(grid.footable.options.grid.events.updated, {
        item: item,
        index: index
      });
    };
    /**
     * remove rows by index
     */
    grid.removeItem = function(index) {
      var $tbody = $(grid.footable.table).find('tbody');
      var detailClass = grid.footable.options.classes.detail;
      var result = [];
      if ($.isArray(index)) {
        for (var i;
          (i = index.pop());) {
          result.push(grid.removeItem(i));
        }
        grid.footable.raise(grid.footable.options.grid.events.removed, {
          item: result,
          index: index
        });
        return result;
      }
      if (index === undefined) {
        $tbody.find('tr').each(function() {
          result.push(grid._items.shift());
          grid.footable.removeRow(this);
        });
      } else {
        var $tr = $tbody.find('tr[data-index=' + index + ']');
        result = grid._items.splice(index, 1)[0];
        grid.footable.removeRow($tr);
        //update rows index
        updateRowIndex($tbody, $tr, detailClass, -1);
      }
      grid.footable.raise(grid.footable.options.grid.events.removed, {
        item: result,
        index: index
      });
      return result;
    };
  }
  w.footable.plugins.register(Grid, defaults);
})(jQuery, window);