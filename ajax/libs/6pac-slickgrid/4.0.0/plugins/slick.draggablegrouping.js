/**
 *
 * Draggable Grouping contributed by:  Muthukumar Selvarasu
 *  muthukumar{dot}se{at}gmail{dot}com
 *  github.com/muthukumarse/Slickgrid
 *
 * NOTES:
 *     This plugin provides the Draggable Grouping feature
 */

(function (window) {
  // Register namespace
  Slick.Utils.extend(true, window, {
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
    var _dropzoneElm;
    var _droppableInstance;
    var dropzonePlaceholder;
    var groupToggler;
    var _defaults = {
    };
    var onGroupChanged = new Slick.Event();
    var _bindingEventService = new Slick.BindingEventService();
    var _handler = new Slick.EventHandler();
    var _sortableLeftInstance;
    var _sortableRightInstance;

    /**
     * Initialize plugin.
     */
    function init(grid) {
      options = Slick.Utils.extend(true, {}, _defaults, options);
      _grid = grid;
      _gridUid = _grid.getUID();
      _gridColumns = _grid.getColumns();
      _dataView = _grid.getData();
      _dropzoneElm = grid.getPreHeaderPanel();
      _dropzoneElm.classList.add('slick-dropzone');

      var dropPlaceHolderText = options.dropPlaceHolderText || 'Drop a column header here to group by the column';

      dropzonePlaceholder = document.createElement('div')
      dropzonePlaceholder.className = 'slick-placeholder';
      dropzonePlaceholder.textContent = dropPlaceHolderText;

      groupToggler = document.createElement('div');
      groupToggler.className = 'slick-group-toggle-all expanded';
      groupToggler.style.display = 'none';

      _dropzoneElm.appendChild(dropzonePlaceholder);
      _dropzoneElm.appendChild(groupToggler);

      setupColumnDropbox();


      _handler.subscribe(_grid.onHeaderCellRendered, function (e, args) {
        var column = args.column;
        var node = args.node;
        if (!Slick.Utils.isEmptyObject(column.grouping) && node) {
          node.style.cursor = 'pointer'; // add the pointer cursor on each column title

          // also optionally add an icon beside each column title that can be dragged
          if (options.groupIconCssClass || options.groupIconImage) {
            const groupableIconElm = document.createElement('span');
            groupableIconElm.className = 'slick-column-groupable';
            if (options.groupIconCssClass) {
              groupableIconElm.classList.add(options.groupIconCssClass.split(' '));
            }
            if (options.groupIconImage) {
              groupableIconElm.style.background = "url(" + options.groupIconImage + ") no-repeat center center";
            }
            node.appendChild(groupableIconElm);
          }
        }
      });

      for (var i = 0; i < _gridColumns.length; i++) {
        var columnId = _gridColumns[i].field;
        _grid.updateColumnHeader(columnId);
      }

    }

    function setupColumnReorder(grid, headers, _headerColumnWidthDiff, setColumns, setupColumnResize, _columns, getColumnIndex, _uid, trigger) {
      const dropzoneElm = grid.getPreHeaderPanel();

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
          dropzoneElm.classList.add('slick-dropzone-hover');
          dropzoneElm.classList.add('slick-dropzone-placeholder-hover');
          const draggablePlaceholderElm = dropzoneElm.querySelector('.slick-placeholder');

          draggablePlaceholderElm.style.display = 'inline-block';
          groupToggler.style.display = 'none';

          const droppedGroupingElms = dropzoneElm.querySelectorAll('.slick-dropped-grouping');
          droppedGroupingElms.forEach(droppedGroupingElm => droppedGroupingElm.style.display = 'none');
        },
        onEnd: function (e) {
          const draggablePlaceholderElm = dropzoneElm.querySelector('.slick-placeholder');
          dropzoneElm.classList.remove('slick-dropzone-hover');
          draggablePlaceholderElm.classList.remove('slick-dropzone-placeholder-hover');


          if (dropzonePlaceholder) {
            dropzonePlaceholder.style.display = 'none';
          }
          if (draggablePlaceholderElm) {
            draggablePlaceholderElm.parentElement && draggablePlaceholderElm.parentElement.classList.remove('slick-dropzone-placeholder-hover');
          }

          const droppedGroupingElms = dropzoneElm.querySelectorAll('.slick-dropped-grouping');
          droppedGroupingElms.forEach(droppedGroupingElm => droppedGroupingElm.style.display = 'inline-block');

          if (droppedGroupingElms.length) {
            if (draggablePlaceholderElm) {
              draggablePlaceholderElm.style.display = 'none';
            }
            groupToggler.style.display = 'inline-block';
          }

          if (!grid.getEditorLock().commitCurrentEdit()) {
            return;
          }

          const reorderedIds = _sortableLeftInstance && _sortableLeftInstance.toArray() || [];

        // when frozen columns are used, headers has more than one entry and we need the ids from all of them.
        // though there is only really a left and right header, this will work even if that should change.
          if (headers.length > 1) {
            const ids = _sortableRightInstance && _sortableRightInstance.toArray() || [];

          // Note: the loop below could be simplified with:
          // reorderedIds.push.apply(reorderedIds,ids);
          // However, the loop is more in keeping with way-backward compatibility
            for (const id of ids) {
              reorderedIds.push(id);
            }
          }

          const finalReorderedColumns = [];
          const reorderedColumns = grid.getColumns();
          for (const reorderedId of reorderedIds) {
            finalReorderedColumns.push(reorderedColumns[getColumnIndex(reorderedId)]);
          }
          setColumns(finalReorderedColumns);
          trigger(grid.onColumnsReordered, { grid });
          e.stopPropagation();
          setupColumnResize();
        }
      }

      _sortableLeftInstance = Sortable.create(document.querySelector(`.${grid.getUID()} .slick-header-columns.slick-header-columns-left`), sortableOptions);
      _sortableRightInstance = Sortable.create(document.querySelector(`.${grid.getUID()} .slick-header-columns.slick-header-columns-right`), sortableOptions);

      return {
        sortableLeftInstance: _sortableLeftInstance,
        sortableRightInstance: _sortableRightInstance
      };
    }

    /**
     * Destroy plugin.
     */
    function destroy() {
      if (_sortableLeftInstance && _sortableLeftInstance.el) {
        _sortableLeftInstance.destroy();
      }
      if (_sortableRightInstance && _sortableRightInstance.el) {
        _sortableRightInstance.destroy();
      }
      onGroupChanged.unsubscribe();
      _handler.unsubscribeAll();
      _bindingEventService.unbindAll();
      Slick.Utils.emptyElement(document.querySelector(`.${_gridUid} .slick-preheader-panel`));
    }

    function addDragOverDropzoneListeners() {
      const draggablePlaceholderElm = _dropzoneElm.querySelector('.slick-placeholder');

      if (draggablePlaceholderElm) {
        _bindingEventService.bind(draggablePlaceholderElm, 'dragover', (e) => e.preventDefault);
        _bindingEventService.bind(draggablePlaceholderElm, 'dragenter', () => _dropzoneElm.classList.add('slick-dropzone-hover'));
        _bindingEventService.bind(draggablePlaceholderElm, 'dragleave', () => _dropzoneElm.classList.remove('slick-dropzone-hover'));
      }
    }

    function setupColumnDropbox() {
      const dropzoneElm = _dropzoneElm;

      _droppableInstance = Sortable.create(dropzoneElm, {
        group: 'shared',
        // chosenClass: 'slick-header-column-active',
        ghostClass: 'slick-droppable-sortitem-hover',
        draggable: '.slick-dropped-grouping',
        dragoverBubble: true,
        onAdd: (evt) => {
          const el = evt.item;
          const elId = el.getAttribute('id');
          if (elId && elId.replace(_gridUid, '')) {
            handleGroupByDrop(dropzoneElm, (Sortable.utils).clone(evt.item));
          }
          evt.clone.style.opacity = '.5';
          el.parentNode && el.parentNode.removeChild(el);
        },
        onUpdate: () => {
          const sortArray = _droppableInstance && _droppableInstance.toArray() || [];
          let newGroupingOrder = [];
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

      if (groupToggler) {
        _bindingEventService.bind(groupToggler, 'click', ((event) => {
          const target = event.target;
          toggleGroupToggler(target, target && target.classList.contains('expanded'));
        }));
      }
    }


    var columnsGroupBy = [];

    function handleGroupByDrop(containerElm, headerColumnElm) {
      const headerColDataId = headerColumnElm.getAttribute('data-id');
      const columnId = headerColDataId && headerColDataId.replace(_gridUid, '');
      let columnAllowed = true;
      for (const colGroupBy of columnsGroupBy) {
        if (colGroupBy.id === columnId) {
          columnAllowed = false;
        }
      }

      if (columnAllowed) {
        for (const col of _gridColumns) {
          if (col.id === columnId) {
            if (col.grouping && !Slick.Utils.isEmptyObject(col.grouping)) {
              const columnNameElm = headerColumnElm.querySelector('.slick-column-name');
              const entryElm = document.createElement('div');
              entryElm.id = `${_gridUid}_${col.id}_entry`;
              entryElm.className = 'slick-dropped-grouping';
              entryElm.dataset.id = `${col.id}`;

              const groupTextElm = document.createElement('div');
              groupTextElm.className = 'slick-dropped-grouping-title';
              groupTextElm.style.display = 'inline-flex';
              groupTextElm.textContent = columnNameElm ? columnNameElm.textContent : headerColumnElm.textContent;
              entryElm.appendChild(groupTextElm);

              // delete icon
              const groupRemoveIconElm = document.createElement('div');
              groupRemoveIconElm.className = 'slick-groupby-remove';
              if (options.deleteIconCssClass) {
                groupRemoveIconElm.classList.add(options.deleteIconCssClass.split(' '));
              }
              if (options.deleteIconImage) {
                groupRemoveIconElm.classList.add(options.deleteIconImage.split(' '));
              }
              if (!options.deleteIconCssClass) {
                groupRemoveIconElm.classList.add('slick-groupby-remove-icon');
              }
              if (!options.deleteIconImage) {
                groupRemoveIconElm.classList.add('slick-groupby-remove-image');
              }

              // sorting icons when enabled
              if (options && options.hideGroupSortIcons !== true && col.sortable) {
                if (col.grouping && col.grouping.sortAsc === undefined) {
                  col.grouping.sortAsc = true;
                }
              }

              entryElm.appendChild(groupRemoveIconElm);
              entryElm.appendChild(document.createElement('div'));
              containerElm.appendChild(entryElm);

              addColumnGroupBy(col);
              addGroupByRemoveClickHandler(col.id, groupRemoveIconElm, headerColumnElm, entryElm);
            }
          }
        }
        groupToggler.style.display = 'inline-block';
      }
    }

    function addColumnGroupBy(column) {
      columnsGroupBy.push(column);
      updateGroupBy("add-group");
    }

    function addGroupByRemoveClickHandler(id, groupRemoveIconElm, headerColumnElm, entry) {
      _bindingEventService.bind(groupRemoveIconElm, 'click', () => {
        const boundedElms = _bindingEventService.boundedEvents.filter(boundedEvent => boundedEvent.element === groupRemoveIconElm);
        for (const boundedEvent of boundedElms) {
          _bindingEventService.unbind(boundedEvent.element, 'click', boundedEvent.listener);
        }
        removeGroupBy(id, headerColumnElm, entry);
      });
    }

    function setDroppedGroups(groupingInfo) {
      const groupingInfos = Array.isArray(groupingInfo) ? groupingInfo : [groupingInfo];
      dropzonePlaceholder.style.display = 'none';
      for (const groupInfo of groupingInfos) {
        const columnElm = _grid.getHeaderColumn(groupInfo);
        handleGroupByDrop(_dropzoneElm, columnElm);
      }
    }

    function clearDroppedGroups() {
      columnsGroupBy = [];
      updateGroupBy('clear-all');
      const allDroppedGroupingElms = _dropzoneElm.querySelectorAll('.slick-dropped-grouping');
      groupToggler.style.display = 'none';

      for (const groupElm of Array.from(allDroppedGroupingElms)) {
        const groupRemoveBtnElm = _dropzoneElm.querySelector('.slick-groupby-remove');
        groupRemoveBtnElm && groupRemoveBtnElm.remove();
        groupElm && groupElm.remove();
      }

      // show placeholder text & hide the "Toggle All" when that later feature is enabled
      dropzonePlaceholder.style.display = 'inline-block';
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

    function removeGroupBy(id, _column, entry) {
      entry.remove();
      var groupby = [];
      _gridColumns.forEach(function (e) {
        groupby[e.id] = e;
      });
      removeFromArray(columnsGroupBy, groupby[id]);
      if (columnsGroupBy.length === 0) {
        dropzonePlaceholder.style = 'block';
        groupToggler.style.display = 'none';
      }
      updateGroupBy("remove-group");
    }

    function toggleGroupToggler(targetElm, collapsing = true, shouldExecuteDataViewCommand = true) {
      if (targetElm) {
        if (collapsing === true) {
          targetElm.classList.add('collapsed');
          targetElm.classList.remove('expanded');
          if (shouldExecuteDataViewCommand) {
            _dataView.collapseAllGroups();
          }
        } else {
          targetElm.classList.remove('collapsed');
          targetElm.classList.add('expanded');
          if (shouldExecuteDataViewCommand) {
            _dataView.expandAllGroups();
          }
        }
      }
    }

    function updateGroupBy(originator) {
      if (columnsGroupBy.length === 0) {
        _dataView.setGrouping([]);
        onGroupChanged.notify({ caller: originator, groupColumns: [] });
        return;
      }
      var groupingArray = [];
      columnsGroupBy.forEach(function (element) {
        groupingArray.push(element.grouping);
      });
      _dataView.setGrouping(groupingArray);
      /*
      collapseAllGroups();
      */
      onGroupChanged.notify({ caller: originator, groupColumns: groupingArray });
    }

    // Public API
    Slick.Utils.extend(this, {
      "init": init,
      "destroy": destroy,
      "pluginName": "DraggableGrouping",

      "onGroupChanged": onGroupChanged,
      "setDroppedGroups": setDroppedGroups,
      "clearDroppedGroups": clearDroppedGroups,
      "getSetupColumnReorder": setupColumnReorder,
    });
  }
})(window);
