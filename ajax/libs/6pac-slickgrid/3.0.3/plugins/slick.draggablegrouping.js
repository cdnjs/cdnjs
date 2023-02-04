/**
 *
 * Draggable Grouping contributed by:  Muthukumar Selvarasu
 *  muthukumar{dot}se{at}gmail{dot}com
 *  github.com/muthukumarse/Slickgrid
 *
 * NOTES:
 *     This plugin provides the Draggable Grouping feature
 */

(function ($) {
  // Register namespace
  $.extend(true, window, {
    "Slick": {
      "DraggableGrouping": DraggableGrouping
    }
  });

  /***
   * A plugin to add Draggable Grouping feature.
   *
   * USAGE:
   *
   * Add the plugin .js & .css files and register it with the grid.
   *
   *
   * The plugin expose the following methods:
   *    destroy: used to destroy the plugin
   *    setDroppedGroups: provide option to set default grouping on loading
   *    clearDroppedGroups: provide option to clear grouping
   *    getSetupColumnReorder: its function to setup draggable feature agains Header Column, should be passed on grid option. Also possible to pass custom function
   *
   *
   * The plugin expose the following event(s):
   *    onGroupChanged: pass the grouped columns to who subscribed.
   *
   * @param options {Object} Options:
   *    deleteIconCssClass:  an extra CSS class to add to the delete button (default undefined), if deleteIconCssClass && deleteIconImage undefined then slick-groupby-remove-image class will be added
   *    deleteIconImage:     a url to the delete button image (default undefined)
   *    groupIconCssClass:   an extra CSS class to add to the grouping field hint  (default undefined)
   *    groupIconImage:      a url to the grouping field hint image (default undefined)
   *    dropPlaceHolderText:      option to specify set own placeholder note text
   *
   
   */

  function DraggableGrouping(options) {
    var _grid;
    var _gridUid;
    var _gridColumns;
    var _dataView;
    var $dropzone;
    var dropzonePlaceholder;
    var groupToggler;
    var _self = this;
    var _defaults = {
    };
    var onGroupChanged = new Slick.Event();
    var _handler = new Slick.EventHandler();
    var _reorderedColumns = [];
    var sortableLeftInstance;
    var sortableRightInstance;

    /**
     * Initialize plugin.
     */
    function init(grid) {
      options = $.extend(true, {}, _defaults, options);
      _grid = grid;
      _gridUid = _grid.getUID();
      _gridColumns = _grid.getColumns();
      _dataView = _grid.getData();
      _reorderedColumns = _gridColumns;

      $dropzone = $(_grid.getPreHeaderPanel());
      $dropzone.addClass("slick-dropzone");
      var dropPlaceHolderText = options.dropPlaceHolderText || 'Drop a column header here to group by the column';
      $dropzone.html("<div class='slick-placeholder'>" + dropPlaceHolderText + "</div><div class='slick-group-toggle-all expanded' style='display:none'></div>");

      dropzonePlaceholder = $dropzone.find(".slick-placeholder");
      groupToggler = $dropzone.find(".slick-group-toggle-all");
      groupToggler.hide();
      setupColumnDropbox();


      _handler.subscribe(_grid.onHeaderCellRendered, function (e, args) {
        var column = args.column;
        var node = args.node;        
        if (!$.isEmptyObject(column.grouping)) {
          var groupableIcon = $("<span class='slick-column-groupable' />");
          if (options.groupIconCssClass) { groupableIcon.addClass(options.groupIconCssClass); }
          if (options.groupIconImage) { groupableIcon.css("background", "url(" + options.groupIconImage + ") no-repeat center center"); }
          $(node).css('cursor', 'pointer').append(groupableIcon);
        }
      });

      for (var i = 0; i < _gridColumns.length; i++) {
        var columnId = _gridColumns[i].field;
        _grid.updateColumnHeader(columnId);
      }

    }

    function setupColumnReorder(grid, $headers, headerColumnWidthDiff, setColumns, setupColumnResize, columns, getColumnIndex, uid, trigger) {
      var $headerDraggableGroupBy = $(grid.getPreHeaderPanel());

      var sortableOptions = {
        animation: 50,
        // chosenClass: 'slick-header-column-active',
        ghostClass: "slick-sortable-placeholder",
        draggable: '.slick-header-column',
        dataIdAttr: 'data-id',
        group: {
          name: 'shared',
          pull: 'clone',
          put: false,
        },
        revertClone: true,
        // filter: function (_e, target) {
        //   // block column from being able to be dragged if it's already a grouped column
        //   // NOTE: need to disable for now since it also blocks the column reordering
        //   return columnsGroupBy.some(c => c.id === target.getAttribute('data-id'));
        // },
        onStart: function () {
          $('.slick-dropzone').addClass('slick-dropzone-hover');
          $headerDraggableGroupBy.find('.slick-placeholder').show();
          $headerDraggableGroupBy.find('.slick-dropped-grouping').hide();
          groupToggler.hide();
        },
        onEnd: function (e) {
          const $draggablePlaceholder = $headerDraggableGroupBy.find('.slick-placeholder');
          $dropzone.removeClass('slick-dropzone-hover');
          $draggablePlaceholder.addClass('slick-dropzone-placeholder-hover');

          $('.slick-dropzone').removeClass('slick-dropzone-hover');
          $('.slick-placeholder').parent().removeClass('slick-dropzone-placeholder-hover');

          var hasDroppedColumn = $headerDraggableGroupBy.find('.slick-dropped-grouping').length;
          if (hasDroppedColumn > 0) {
            $headerDraggableGroupBy.find('.slick-placeholder').hide();
            $headerDraggableGroupBy.find('.slick-dropped-grouping').show();
            groupToggler.show();
          }

          if (!grid.getEditorLock().commitCurrentEdit()) {
            return;
          }

          var reorderedIds = sortableLeftInstance.toArray();

          // If frozen columns are used, headers has more than one entry and we need the ids from all of them.
          // though there is only really a left and right header, this will work even if that should change.
          if ($headers.length > 1) {
            for (var headerI = 1, l = $headers.length; headerI < l; headerI += 1) {
              var ids = sortableRightInstance.toArray();

              // Note: the loop below could be simplified with:
              // reorderedIds.push.apply(reorderedIds,ids);
              // However, the loop is more in keeping with way-backward compatibility 
              for (var idI = 0, idL = ids.length; idI < idL; idI += 1) {
                reorderedIds.push(ids[idI]);
              }
            }
          }
          var reorderedColumns = [];
          for (var i = 0; i < reorderedIds.length; i++) {
            reorderedColumns.push(_reorderedColumns[getColumnIndex(reorderedIds[i])]);
          }
          setColumns(reorderedColumns);
          trigger(grid.onColumnsReordered, {
            grid: grid
          });
          e.stopPropagation();
          setupColumnResize();
          _reorderedColumns = reorderedColumns;
        }
      }
      if ($headers[0]) {
        sortableLeftInstance = Sortable.create($headers[0], sortableOptions);
      }
      if ($headers[1]) {
        sortableRightInstance = Sortable.create($headers[1], sortableOptions);
      }
    }

    /**
     * Destroy plugin.
     */
    function destroy() {
      $('.slick-placeholder').off('dragover dragenter dragleave');
      onGroupChanged.unsubscribe();
      _handler.unsubscribeAll();
      if (sortableLeftInstance) {
        sortableLeftInstance.destroy();
        sortableRightInstance.destroy();
      }
    }

    function addDragOverDropzoneListeners() {
      var $dragPlaceholder = $('.slick-placeholder');

      $dragPlaceholder.on('dragover', function (evt) {
        evt.preventDefault();
      });

      $dragPlaceholder.on('dragenter', function (evt) {
        $dragPlaceholder.parent().addClass('slick-dropzone-placeholder-hover');
      });

      $dragPlaceholder.on('dragleave', function (evt) {
        $dragPlaceholder.parent().removeClass('slick-dropzone-placeholder-hover');
      });
    }

    function setupColumnDropbox() {
      var dropzoneElm = $dropzone[0];

      var sortableDrop = Sortable.create(dropzoneElm, {
        group: "shared",
        // chosenClass: "slick-header-column-active",
        ghostClass: "slick-droppable-sortitem-hover",
        draggable: '.slick-dropped-grouping',
        dragoverBubble: true,
        onAdd: function (evt) {
          var el = evt.item;
          if (el.getAttribute('id').replace(_gridUid, '')) {
            handleGroupByDrop($dropzone[0], $(Sortable.utils.clone(evt.item)));
          }
          evt.clone.style.opacity = .5;
          el.parentNode.removeChild(el);
        },
        onUpdate: function (e) {
          var sortArray = sortableDrop.toArray(),
            newGroupingOrder = [];
          for (var i = 0, l = sortArray.length; i < l; i++) {
            for (var a = 0, b = columnsGroupBy.length; a < b; a++) {
              if (columnsGroupBy[a].id == sortArray[i]) {
                newGroupingOrder.push(columnsGroupBy[a]);
                break;
              }
            }
          }
          columnsGroupBy = newGroupingOrder;
          updateGroupBy("sort-group");
        },
      });

      // Sortable doesn't have onOver, we need to implement it ourselves
      addDragOverDropzoneListeners();

      groupToggler.on('click', function (e) {
        if (this.classList.contains('collapsed')) {
          this.classList.remove('collapsed');
          this.classList.add('expanded');
          _dataView.expandAllGroups();
        } else {
          this.classList.add('collapsed');
          this.classList.remove('expanded');
          _dataView.collapseAllGroups();
        }
      });
    }

    var columnsGroupBy = [];
    var groupBySorters = [];

    function handleGroupByDrop(container, headerColumn) {
      var columnid = headerColumn.attr('data-id').replace(this._gridUid, '');
      var columnAllowed = true;
      columnsGroupBy.forEach(function (e, i, a) {
        if (e.id == columnid) {
          columnAllowed = false;
        }
      });
      if (columnAllowed) {
        _gridColumns.forEach(function (col, i, a) {
          if (col.id == columnid) {
            if (col.grouping != null && !$.isEmptyObject(col.grouping)) {
              var entry = $("<div id='" + _gridUid + col.id + "_entry' data-id='" + col.id + "' class='slick-dropped-grouping'>");
              var $columnName = headerColumn.find('.slick-column-name');
              var groupText = $("<div class='slick-dropped-grouping-title' style='display: inline-flex'>" + ($columnName.length > 0 ? $columnName.text() : headerColumn.text()) + "</div>");
              groupText.appendTo(entry);
              var groupRemoveIcon = $("<div class='slick-groupby-remove'></div>");
              if (options.deleteIconCssClass) groupRemoveIcon.addClass(options.deleteIconCssClass);
              if (options.deleteIconImage) groupRemoveIcon.css("background", "url(" + options.deleteIconImage + ") no-repeat center right");
              if (!options.deleteIconCssClass && !options.deleteIconImage) groupRemoveIcon.addClass('slick-groupby-remove-image');
              groupRemoveIcon.appendTo(entry);
              $("</div>").appendTo(entry);
              entry.appendTo(container);
              addColumnGroupBy(col);
              addGroupByRemoveClickHandler(col.id, headerColumn, entry);
            }
          }
        });
        groupToggler.show();
      }
    }

    function addColumnGroupBy(column) {
      columnsGroupBy.push(column);
      updateGroupBy("add-group");
    }

    function addGroupByRemoveClickHandler(id, column, entry) {
      var text = entry;
      $("#" + _gridUid + id + "_entry >.slick-groupby-remove").on('click', function () {
        $(this).off('click');
        removeGroupBy(id, column, text);
      });
    }

    function setDroppedGroups(groupingInfo) {
      var groupingInfos = (groupingInfo instanceof Array) ? groupingInfo : [groupingInfo];
      dropzonePlaceholder.hide();
      for (var i = 0; i < groupingInfos.length; i++) {
        var column = $(_grid.getHeaderColumn(groupingInfos[i]));
        handleGroupByDrop($dropzone, column);
      }
    }
    function clearDroppedGroups() {
      columnsGroupBy = [];
      updateGroupBy("clear-all");
      $dropzone.find(".slick-dropped-grouping").remove();
      groupToggler.hide();
      dropzonePlaceholder.show();
    }

    function removeFromArray(arr) {
      var what, a = arguments,
        L = a.length,
        ax;
      while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) != -1) {
          arr.splice(ax, 1);
        }
      }
      return arr;
    }

    function removeGroupBy(id, column, entry) {
      entry.remove();
      var groupby = [];
      _gridColumns.forEach(function (e, i, a) {
        groupby[e.id] = e;
      });
      removeFromArray(columnsGroupBy, groupby[id]);
      if (columnsGroupBy.length === 0) {
        dropzonePlaceholder.show();
        groupToggler.hide();
      }
      updateGroupBy("remove-group");
    }

    function updateGroupBy(originator) {
      if (columnsGroupBy.length === 0) {
        _dataView.setGrouping([]);
        onGroupChanged.notify({ caller: originator, groupColumns: [] });
        return;
      }
      var groupingArray = [];
      columnsGroupBy.forEach(function (element, index, array) {
        groupingArray.push(element.grouping);
      });
      _dataView.setGrouping(groupingArray);
      /*
      collapseAllGroups();
      */
      onGroupChanged.notify({ caller: originator, groupColumns: groupingArray });
    }

    // Public API
    $.extend(this, {
      "init": init,
      "destroy": destroy,
      "pluginName": "DraggableGrouping",

      "onGroupChanged": onGroupChanged,
      "setDroppedGroups": setDroppedGroups,
      "clearDroppedGroups": clearDroppedGroups,
      "getSetupColumnReorder": setupColumnReorder,
    });
  }
})(jQuery);
