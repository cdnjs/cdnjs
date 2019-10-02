(function ($) {
  // register namespace
  $.extend(true, window, {
    Slick: {
      State: State
    }
  });

  var localStorageWrapper = function() {
    var localStorage = window.localStorage;

    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not available. slickgrid statepersistor disabled.');
    }

    return {
      get: function(key) {
        return $.Deferred(function(dfd) {
          if (!localStorage) return dfd.reject("missing localStorage");
          try {
            var d = localStorage.getItem(key);
            if (d) {
              return dfd.resolve(JSON.parse(d));
            }
            dfd.resolve();
          }
          catch (exc) {
            dfd.reject(exc);
          }
        });
      },
      set: function(key, obj) {
        if (!localStorage) return;
        if (typeof obj !== 'undefined') {
          obj = JSON.stringify(obj);
        }
        localStorage.setItem(key, obj);
      }
    };
  };

  var defaults = {
    key_prefix: "slickgrid:",
    storage: new localStorageWrapper()
  };

  function State(options) {
    options = $.extend(true, {}, defaults, options);

    var _grid, _cid,
      _store = options.storage,
      onStateChanged = new Slick.Event();

    function init(grid) {
      _grid = grid;
      _cid = grid.cid || options.cid;
      if (_cid) {
        grid.onColumnsResized.subscribe(save);
        grid.onColumnsReordered.subscribe(save);
        grid.onSort.subscribe(save);
      } else {
        console.warn("grid has no client id. state persisting is disabled.");
      }
    }

    function destroy() {
      grid.onSort.unsubscribe(save);
      grid.onColumnsReordered.unsubscribe(save);
      grid.onColumnsResized.unsubscribe(save);
      save();
    }

    function save() {
      if (_cid && _store) {
        var state = {
          sortcols: getSortColumns(),
          viewport: _grid.getViewport(),
          columns: getColumns()
        };
        onStateChanged.notify(state);
        return _store.set(options.key_prefix + _cid, state);
      }
    }

    function restore() {
      return $.Deferred(function(dfd) {
        if (!_cid) { return dfd.reject("missing client id"); }
        if (!_store) { return dfd.reject("missing store"); }

        _store.get(options.key_prefix + _cid)
          .then(function success(state) {
            if (state) {
              if (state.sortcols) {
                _grid.setSortColumns(state.sortcols);
              }
              if (state.viewport) {
                _grid.scrollRowIntoView(state.viewport.top, true);
              }
              if (state.columns) {
                var defaultColumns = options.defaultColumns;
                if (defaultColumns) {
                  var defaultColumnsLookup = {};
                  $.each(defaultColumns, function(idx, colDef) {
                    defaultColumnsLookup[colDef.id] = colDef;
                  });

                  var cols = [];
                  $.each(state.columns, function(idx, columnDef) {
                    if (defaultColumnsLookup[columnDef.id]) {
                      cols.push($.extend(true, {}, defaultColumnsLookup[columnDef.id], {
                        width: columnDef.width,
                        headerCssClass: columnDef.headerCssClass
                      }));
                    }
                  });

                  state.columns = cols;
                }

                _grid.setColumns(state.columns);
              }
            }
            dfd.resolve(state);
          }, dfd.reject);
      });
    }

    function getColumns() {
      return $.map(_grid.getColumns(), function(col) {
        return {
          id: col.id,
          width: col.width
        };
      });
    }

    function getSortColumns() {
      var sortCols = _grid.getSortColumns();
      return sortCols;
    }

    /*
     *  API
     */
    $.extend(this, {
      "init": init,
      "destroy": destroy,
      "save": save,
      "restore": restore,
      "onStateChanged": onStateChanged
    });
  }
})(jQuery);
