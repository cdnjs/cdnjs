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
    storage: new localStorageWrapper(),
    scrollRowIntoView: true
  };

  function State(options) {
    options = $.extend(true, {}, defaults, options);

    var _grid, _cid,
      _store = options.storage,
      onStateChanged = new Slick.Event();

    var userData = {
      state: null,
      current: null
    };

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
          columns: getColumns(),
          userData: null
        };

        state.userData = userData.current;
        
        setUserDataFromState(state.userData);

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
              if (state.viewport && options.scrollRowIntoView) {
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
              setUserDataFromState(state.userData);
            }
            dfd.resolve(state);
          }, dfd.reject);
      });
    }

    /**
     * allows users to add their own data to the grid state
     * this function does not trigger the save() function, so the actual act of writing the state happens in save()
     * therefore, it's necessary to call save() function after setting user-data
     *
     * @param data
     * @return {State}
     */
    function setUserData(data){
      userData.current = data;

      return this;
    }

    /**
     *
     * @internal
     * @param data
     * @return {State}
     */
    function setUserDataFromState(data){
      userData.state = data;
      return setUserData(data);
    }

    /**
     * returns current value of user-data
     * @return {Object}
     */
    function getUserData(){
      return userData.current;
    }

	  /**
	   * returns user-data found in saved state
	   *
	   * @return {Object}
	   */
    function getStateUserData(){
      return userData.state;
    }

    /**
     * sets user-data to the value read from state
     *
     * @return {State}
     */
    function resetUserData(){
      userData.current = userData.state;

      return this;
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

    function reset(){
      _store.set(options.key_prefix + _cid, {});
      setUserDataFromState(null);
    }
    /*
     *  API
     */
    $.extend(this, {
      "init": init,
      "destroy": destroy,
      "save": save,
      "setUserData": setUserData,
      "resetUserData": resetUserData,
      "getUserData": getUserData,
      "getStateUserData": getStateUserData,
      "restore": restore,
      "onStateChanged": onStateChanged,
      "reset": reset
    });
  }
})(jQuery);
