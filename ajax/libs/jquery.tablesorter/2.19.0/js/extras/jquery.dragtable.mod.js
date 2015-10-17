/*! Dragtable Mod for TableSorter - 2/7/2015 (v2.19.0) *//*
 * Requires
 *   tablesorter v2.8+
 *   jQuery 1.7+
 *   jQuery UI (Core, Widget, Mouse & Sortable)
 *   Dragtable by Akottr (https://github.com/akottr) modified by Rob Garrison
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function( $ ) {
'use strict';
  var undef,
    ts = $.tablesorter;

  ts.dragtable = {
    create : function( _this ) {
      var hasAccept,
        $table = _this.originalTable.el,
        handle = _this.options.dragHandle.replace('.', '');
      $table.children('thead').children().children('th,td').each(function(){
        var $this = $(this);
        if ( !$this.find( _this.options.dragHandle + ',.' + handle + '-disabled' ).length ) {
          hasAccept = _this.options.dragaccept ? $this.hasClass( _this.options.dragaccept.replace('.', '') ) : true;
          $this
            // sortClass includes a "." to match the tablesorter selectorSort option - for consistency
            .wrapInner('<div class="' + _this.options.sortClass.replace('.', '') + '"/>')
            // add handle class + "-disabled" to drag-disabled columns
            .prepend('<div class="' + handle + ( hasAccept ? '' : '-disabled' ) + '"></div>');
        }
      });
    },
    start : function( table ) {
      table = $( table )[0];
      if ( table && table.config ) {
        table.config.widgetOptions.dragtableLast = {
          search : $( table ).data( 'lastSearch' ),
          order : ts.dragtable.getOrder( table )
        };
      }
    },
    update : function( _this ) {
      var t, list, val,
        dragTable = _this.originalTable,
        table = dragTable.el[ 0 ],
        $table = $( table ),
        c = table.config,
        wo = c && c.widgetOptions,
        startIndex = dragTable.startIndex - 1,
        endIndex = dragTable.endIndex - 1,
        columnOrder = ts.dragtable.getOrder( table ) || [],
        hasFilters = ts.hasWidget( $table, 'filter' ) || false,
        last = wo && wo.dragtableLast || {},
        // update moved filters
        filters = [];

      // only trigger updateAll if column order changed
      if ( ( last.order || [] ).join( '' ) !== columnOrder.join( '' ) ) {

        if ( c.sortList.length ) {
          // must deep extend (nested arrays) to prevent list from changing with c.sortList
          list = $.extend( true, [], c.sortList );
          $.each( columnOrder, function( indx, value ) {
            val = ts.isValueInArray( parseInt( value, 10 ), list );
            if ( value !== last.order[ indx ] && val >= 0 ) {
              c.sortList[ val ][ 0 ] = indx;
            }
          });
        }

        // update filter widget
        if ( hasFilters ) {
          $.each( last.search || [], function( indx ) {
            filters[ indx ] = last.search[ columnOrder[ indx ] ];
          });
        }

        // update preset editable widget columns
        t = ( ts.hasWidget( c.$table, 'editable' ) || false ) ? wo.editable_columnsArray : false;
        if ( t ) {
          c.widgetOptions.editable_columnsArray = ts.dragtable.reindexArrayItem( t, startIndex, endIndex );
        }
        // update ignore math columns
        t = ( ts.hasWidget( c.$table, 'math' ) || false ) ? wo.math_ignore : false;
        if ( t ) {
          c.widgetOptions.math_ignore = ts.dragtable.reindexArrayItem( t, startIndex, endIndex );
        }
        // update preset resizable widget widths
        t = ( ts.hasWidget( c.$table, 'resizable' ) || false ) ? wo.resizable_widths : false;
        if ( t ) {
          // use zero-based indexes in the array
          wo.resizable_widths = ts.dragtable.moveArrayItem( t, startIndex, endIndex );
        }
        /*
        // chart widget WIP - there are other options that need to be rearranged!
        t = ( ts.hasWidget( c.$table, 'chart' ) || false ) ? wo.chart_ignoreColumns : false;
        if ( t ) {
          // use zero-based indexes in the array
          wo.chart_ignoreColumns = ts.dragtable.moveArrayItem( t, startIndex, endIndex );
        }
        */

        $table.trigger('updateAll', [ false, function() {
          if ( hasFilters ) {
            setTimeout( function() {
              // just update the filter values
              c.lastCombinedFilter = null;
              c.$table.data('lastSearch', filters);
              ts.setFilters( $table, filters );
              if ($.isFunction(_this.options.tablesorterComplete)) {
                _this.options.tablesorterComplete( c.table );
              }
            }, 10 );
          }
        } ]);
      }
    },
    getOrder : function( table ) {
      return $( table ).children( 'thead' ).children( '.' + ts.css.headerRow ).children().map( function() {
        return $( this ).attr( 'data-column' );
      }).get() || [];
    },
    // bubble the moved col left or right
    startColumnMove : function( dragTable ) {
      var $cols,
        c = dragTable.el[ 0 ].config,
        startIndex = dragTable.startIndex - 1,
        endIndex = dragTable.endIndex - 1,
        cols = c.columns - 1,
        pos = endIndex === cols ? false : endIndex <= startIndex,
        $rows = c.$table.children().children( 'tr' );
      if ( c.debug ) {
        ts.log( 'Inserting column ' + startIndex + ( pos ? ' before' : ' after' ) + ' column ' + endIndex );
      }
      $rows.each( function() {
        $cols = $( this ).children();
        $cols.eq( startIndex )[ pos ? 'insertBefore' : 'insertAfter' ]( $cols.eq( endIndex ) );
      });
      // rearrange col in colgroup
      $cols = c.$table.children( 'colgroup' ).children();
      $cols.eq( startIndex )[ pos ? 'insertBefore' : 'insertAfter' ]( $cols.eq( endIndex ) );
    },
    swapNodes : function( a, b ) {
      var indx, aparent, asibling,
        len = a.length;
      for ( indx = 0; indx < len; indx++ ) {
        aparent = a[ indx ].parentNode;
        asibling = a[ indx ].nextSibling === b[ indx ] ? a[ indx ] : a[ indx ].nextSibling;
        b[ indx ].parentNode.insertBefore( a[ indx ], b[ indx ] );
        aparent.insertBefore( b[ indx ], asibling );
      }
    },
    // http://stackoverflow.com/a/5306832/145346
    moveArrayItem : function( array, oldIndex, newIndex ) {
      var indx, len = array.length;
      if ( newIndex >= len ) {
        indx = newIndex - len;
        while ( ( indx-- ) + 1 ) {
          array.push( undef );
        }
      }
      array.splice( newIndex, 0, array.splice( oldIndex, 1 )[ 0 ] );
      return array;
    },
    reindexArrayItem : function( array, oldIndex, newIndex ) {
      var nIndx = $.inArray( newIndex, array ),
        oIndx = $.inArray( oldIndex, array ),
        max = Math.max.apply( Math, array ),
        arry = [];
      // columns in the array were swapped so return original array
      if ( nIndx >= 0 && oIndx >= 0 ) {
       return array;
      }
      // columns not in the array were moved
      $.each( array, function( indx, value ) {
        // column (not in array) inserted between indexes
        if ( newIndex < oldIndex ) {
          // ( [ 0,1,2,3 ], 5, 1 ) -> column inserted between 0 & 1 => [ 0,2,3,4 ]
          if ( value >= newIndex ) {
            // 5 -> 1  [ 0, 2, 3 ] then 1 -> 0 [ 1, 2, 3 ]
            arry.push( value + ( value < oldIndex ? 1 : 0 ) );
          } else {
            arry.push( value );
          }
        } else if ( newIndex > oldIndex ) {
          // ( [ 0,1,2,3 ], 1, 5 ) -> column in array moved outside => [ 0,1,2,5 ]
          if ( value === oldIndex ) {
            arry.push( newIndex );
          } else if ( value < newIndex && value >= oldIndex ) {
            arry.push( value - 1 );
          } else if ( value <= newIndex ) {
            arry.push( value );
          } else if ( value > oldIndex ) {
            arry.push( value + ( value < newIndex ? 0 : 1 ) );
          }
        }
      });
      return arry.sort();
    }
  };

/*!
 * dragtable
 *  _____       _
 * |     |___ _| |
 * | | | | . | . |
 * |_|_|_|___|___|
 *
 * @Version 2.0.14 MOD
 *
 * Copyright (c) 2010-2013, Andres akottr@gmail.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Inspired by the the dragtable from Dan Vanderkam (danvk.org/dragtable/)
 * Thanks to the jquery and jqueryui comitters
 *
 * Any comment, bug report, feature-request is welcome
 * Feel free to contact me.
 */

/* TOKNOW:
 * For IE7 you need this css rule:
 * table {
 *   border-collapse: collapse;
 * }
 * Or take a clean reset.css (see http://meyerweb.com/eric/tools/css/reset/)
 */

/* TODO: investigate
 * Does not work properly with css rule:
 * html {
 *      overflow: -moz-scrollbars-vertical;
 *  }
 * Workaround:
 * Fixing Firefox issues by scrolling down the page
 * http://stackoverflow.com/questions/2451528/jquery-ui-sortable-scroll-helper-element-offset-firefox-issue
 *
 * var start = $.noop;
 * var beforeStop = $.noop;
 * if($.browser.mozilla) {
 * var start = function (event, ui) {
 *               if( ui.helper !== undefined )
 *                 ui.helper.css('position','absolute').css('margin-top', $(window).scrollTop() );
 *               }
 * var beforeStop = function (event, ui) {
 *              if( ui.offset !== undefined )
 *                ui.helper.css('margin-top', 0);
 *              }
 * }
 *
 * and pass this as start and stop function to the sortable initialisation
 * start: start,
 * beforeStop: beforeStop
 */
/*
 * Special thx to all pull requests comitters
 */

  $.widget("akottr.dragtable", {
    options: {
      revert: false,               // smooth revert
      dragHandle: '.table-handle', // handle for moving cols, if not exists the whole 'th' is the handle
      maxMovingRows: 40,           // 1 -> only header. 40 row should be enough, the rest is usually not in the viewport
      excludeFooter: false,        // excludes the footer row(s) while moving other columns. Make sense if there is a footer with a colspan. */
      onlyHeaderThreshold: 100,    // TODO:  not implemented yet, switch automatically between entire col moving / only header moving
      dragaccept: null,            // draggable cols -> default all
      persistState: null,          // url or function -> plug in your custom persistState function right here. function call is persistState(originalTable)
      restoreState: null,          // JSON-Object or function:  some kind of experimental aka Quick-Hack TODO: do it better
      exact: true,                 // removes pixels, so that the overlay table width fits exactly the original table width
      clickDelay: 10,              // ms to wait before rendering sortable list and delegating click event
      containment: null,           // @see http://api.jqueryui.com/sortable/#option-containment, use it if you want to move in 2 dimesnions (together with axis: null)
      cursor: 'move',              // @see http://api.jqueryui.com/sortable/#option-cursor
      cursorAt: false,             // @see http://api.jqueryui.com/sortable/#option-cursorAt
      distance: 0,                 // @see http://api.jqueryui.com/sortable/#option-distance, for immediate feedback use "0"
      tolerance: 'pointer',        // @see http://api.jqueryui.com/sortable/#option-tolerance
      axis: 'x',                   // @see http://api.jqueryui.com/sortable/#option-axis, Only vertical moving is allowed. Use 'x' or null. Use this in conjunction with the 'containment' setting
      beforeStart: $.noop,         // returning FALSE will stop the execution chain.
      beforeMoving: $.noop,
      beforeReorganize: $.noop,
      beforeStop: $.noop,
      // new options
      tablesorterComplete: null,
      sortClass : '.sorter'
    },
    originalTable: {
      el: null,
      selectedHandle: null,
      sortOrder: null,
      startIndex: 0,
      endIndex: 0
    },
    sortableTable: {
      el: $(),
      selectedHandle: $(),
      movingRow: $()
    },
    persistState: function() {
      var _this = this;
      this.originalTable.el.find('th').each(function(i) {
        if (this.id !== '') {
          _this.originalTable.sortOrder[this.id] = i;
        }
      });
      $.ajax({
        url: this.options.persistState,
        data: this.originalTable.sortOrder
      });
    },
    /*
     * persistObj looks like
     * {'id1':'2','id3':'3','id2':'1'}
     * table looks like
     * |   id2  |   id1   |   id3   |
     */
    _restoreState: function(persistObj) {
      for (var n in persistObj) {
        if (n in persistObj) {
          this.originalTable.startIndex = $('#' + n).closest('th').prevAll().length + 1;
          this.originalTable.endIndex = parseInt(persistObj[n], 10) + 1;
          this._bubbleCols();
        }
      }
    },
    // bubble the moved col left or right
    _bubbleCols: function() {
      ts.dragtable.startColumnMove(this.originalTable);
    },
    _rearrangeTableBackroundProcessing: function() {
      var _this = this;
      return function() {
        _this._bubbleCols();
        _this.options.beforeStop(_this.originalTable);
        _this.sortableTable.el.remove();
        restoreTextSelection();
        ts.dragtable.update(_this);
        // persist state if necessary
        if ($.isFunction(_this.options.persistState)) {
          _this.options.persistState(_this.originalTable);
        } else {
          _this.persistState();
        }

      };
    },
    _rearrangeTable: function() {
      var _this = this;
      return function() {
        // remove handler-class -> handler is now finished
        _this.originalTable.selectedHandle.removeClass('dragtable-handle-selected');
        // add disabled class -> reorgorganisation starts soon
        _this.sortableTable.el.sortable("disable");
        _this.sortableTable.el.addClass('dragtable-disabled');
        _this.options.beforeReorganize(_this.originalTable, _this.sortableTable);
        // do reorganisation asynchronous
        // for chrome a little bit more than 1 ms because we want to force a rerender
        _this.originalTable.endIndex = _this.sortableTable.movingRow.prevAll().length + 1;
        setTimeout(_this._rearrangeTableBackroundProcessing(), 50);
      };
    },
    /*
     * Disrupts the table. The original table stays the same.
     * But on a layer above the original table we are constructing a list (ul > li)
     * each li with a separate table representig a single col of the original table.
     */
    _generateSortable: function(e) {
      if (e.cancelBubble) {
        e.cancelBubble = true;
      } else {
        e.stopPropagation();
      }
      var _this = this;
      // table attributes
      var attrs = this.originalTable.el[0].attributes;
      var tableAttrsString = '';
      for (var i = 0; i < attrs.length; i++) {
        if ( (attrs[i].value || attrs[i].nodeValue) && attrs[i].nodeName != 'id' && attrs[i].nodeName != 'width') {
          tableAttrsString += attrs[i].nodeName + '="' + ( attrs[i].value || attrs[i].nodeValue ) + '" ';
        }
      }
      // row attributes
      var rowAttrsArr = [];
      //compute height, special handling for ie needed :-(
      var heightArr = [];

      // don't save tfoot attributes because it messes up indexing
      _this.originalTable.el.children('thead, tbody').children('tr:visible').slice(0, _this.options.maxMovingRow).each(function() {
        // row attributes
        var attrs = this.attributes;
        var attrsString = '';
        for (var j = 0; j < attrs.length; j++) {
          if ( (attrs[j].value || attrs[j].nodeValue ) && attrs[j].nodeName != 'id') {
            attrsString += ' ' + attrs[j].nodeName + '="' + ( attrs[j].value || attrs[j].nodeValue ) + '"';
          }
        }
        rowAttrsArr.push(attrsString);
        heightArr.push($(this).height());
      });

      // compute width, no special handling for ie needed :-)
      var widthArr = [];
      // compute total width, needed for not wrapping around after the screen ends (floating)
      var totalWidth = 0;
      /* Find children thead and tbody.
       * Only to process the immediate tr-children. Bugfix for inner tables
       */
      var thtb = _this.originalTable.el.children();
      var headerRows = thtb.filter('thead').children('tr:visible');
      var visibleRows = thtb.filter('tbody').children('tr:visible');

      headerRows.eq(0).children('th, td').filter(':visible').each(function() {
        var w = $(this).outerWidth();
        widthArr.push(w);
        totalWidth += w;
      });
      if(_this.options.exact) {
        var difference = totalWidth - _this.originalTable.el.outerWidth();
        widthArr[0] -= difference;
      }
      // one extra px on right and left side
      totalWidth += 2;

      var captionHeight = 0;
      thtb.filter('caption').each(function(){
        captionHeight += $(this).outerHeight();
      });

      var sortableHtml = '<ul class="dragtable-sortable" style="position:absolute; width:' + totalWidth + 'px;">';
      var sortableColumn = [];
      // assemble the needed html
      // build list
      var rowIndex,
        columns = headerRows.eq(0).children('th, td').length;
      /*jshint loopfunc:true */
      for (i = 0; i < columns; i++) {
        var row = headerRows.children(':nth-child(' + (i + 1) + ')');
        if (row.is(':visible')) {
          rowIndex = 0;
          sortableColumn[i] = '<li style="width:' + row.outerWidth() + 'px;">' +
            '<table ' + tableAttrsString + '>' +
            ( captionHeight ? '<caption style="height:' + captionHeight + 'px;"></caption>' : '' ) +
            '<thead>';
          // thead
          headerRows.each(function(j){
            sortableColumn[i] += '<tr ' + rowAttrsArr[rowIndex++] +
              ( heightArr[j] ? ' style="height:' + heightArr[j] + 'px;"' : '' ) + '>' +
              row[j].outerHTML + '</tr>';
          });
          sortableColumn[i] += '</thead><tbody>';
          // tbody
          row = visibleRows.children(':nth-child(' + (i + 1) + ')');
          if (_this.options.maxMovingRows > 1) {
            row = row.add(visibleRows.children(':nth-child(' + (i + 1) + ')').slice(0, _this.options.maxMovingRows - 1));
          }
          row.each(function(j) {
            sortableColumn[i] += '<tr ' + rowAttrsArr[rowIndex++] +
              ( heightArr[j] ? ' style="height:' + heightArr[j] + 'px;"' : '' ) + '>' +
              this.outerHTML + '</tr>';
          });
          sortableColumn[i] += '</tbody>';

          // add footer to end of max Rows
          if (!_this.options.excludeFooter) {
            sortableColumn[i] += '<tfoot><tr ' + rowAttrsArr[rowIndex++] + '>' +
              thtb.filter('tfoot').children('tr:visible').children()[i].outerHTML + '</tr></tfoot>';
          }
          sortableColumn[i] += '</table></li>';
        }
      }
      sortableHtml += sortableColumn.join('') + '</ul>';
      this.sortableTable.el = this.originalTable.el.before(sortableHtml).prev();
      // set width if necessary
      this.sortableTable.el.find('> li > table').each(function(i) {
        $(this).css('width', widthArr[i] + 'px');
      });

      // assign this.sortableTable.selectedHandle
      this.sortableTable.selectedHandle = this.sortableTable.el.find('th .dragtable-handle-selected');

      var items = !this.options.dragaccept ? 'li' : 'li:has(' + this.options.dragaccept + ')';
      this.sortableTable.el.sortable({
        items: items,
        stop: this._rearrangeTable(),
        // pass thru options for sortable widget
        revert: this.options.revert,
        tolerance: this.options.tolerance,
        containment: this.options.containment,
        cursor: this.options.cursor,
        cursorAt: this.options.cursorAt,
        distance: this.options.distance,
        axis: this.options.axis
      });

      // assign start index
      this.originalTable.startIndex = $(e.target).closest('th,td').prevAll().length + 1;
      this.options.beforeMoving(this.originalTable, this.sortableTable);
      // Start moving by delegating the original event to the new sortable table
      this.sortableTable.movingRow = this.sortableTable.el.children('li:nth-child(' + this.originalTable.startIndex + ')');

      // prevent the user from drag selecting "highlighting" surrounding page elements
      disableTextSelection();
      // clone the initial event and trigger the sort with it
      this.sortableTable.movingRow.trigger($.extend($.Event(e.type), {
        which: 1,
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        screenX: e.screenX,
        screenY: e.screenY
      }));

      // Some inner divs to deliver the posibillity to style the placeholder more sophisticated
      var placeholder = this.sortableTable.el.find('.ui-sortable-placeholder');
      if(placeholder.height() > 0) {
        placeholder.css('height', this.sortableTable.el.find('.ui-sortable-helper').height());
      }

      placeholder.html('<div class="outer" style="height:100%;"><div class="inner" style="height:100%;"></div></div>');
    },
    bindTo: {},
    _create: function() {
      var _this = this;
      _this.originalTable = {
        el: _this.element,
        selectedHandle: $(),
        sortOrder: {},
        startIndex: 0,
        endIndex: 0
      };
      ts.dragtable.create( _this );
      // filter only the cols that are accepted
      _this.bindTo = '> thead > tr > ' + ( _this.options.dragaccept || 'th, td' );
      // bind draggable to handle if exists
      if (_this.element.find(_this.bindTo).find(_this.options.dragHandle).length) {
        _this.bindTo += ' ' + _this.options.dragHandle;
      }
      // restore state if necessary
      if ($.isFunction(_this.options.restoreState)) {
        _this.options.restoreState(_this.originalTable);
      } else {
        _this._restoreState(_this.options.restoreState);
      }
      _this.originalTable.el.on( 'mousedown.dragtable', _this.bindTo, function(evt) {
        // listen only to left mouse click
        if (evt.which!==1) return;
        ts.dragtable.start( _this.originalTable.el );
        if (_this.options.beforeStart(_this.originalTable) === false) {
          return;
        }
        clearTimeout(_this.downTimer);
        _this.downTimer = setTimeout(function() {
          _this.originalTable.selectedHandle = $(_this);
          _this.originalTable.selectedHandle.addClass('dragtable-handle-selected');
          _this._generateSortable(evt);
        }, _this.options.clickDelay);
      }).on( 'mouseup.dragtable', _this.options.dragHandle,function() {
        clearTimeout(_this.downTimer);
      });
    },
    redraw: function(){
      this.destroy();
      this._create();
    },
    destroy: function() {
      this.originalTable.el.off('mousedown.dragtable mouseup.dragtable', this.bindTo);
      $.Widget.prototype.destroy.apply(this, arguments); // default destroy
      // now do other stuff particular to this widget
    }
  });

  /** closure-scoped "private" functions **/
  var body_onselectstart_save = $(document.body).attr('onselectstart'),
  body_unselectable_save = $(document.body).attr('unselectable');

  // css properties to disable user-select on the body tag by appending a <style> tag to the <head>
  // remove any current document selections
  function disableTextSelection() {
    // jQuery doesn't support the element.text attribute in MSIE 8
    // http://stackoverflow.com/questions/2692770/style-style-textcss-appendtohead-does-not-work-in-ie
    var $style = $('<style id="__dragtable_disable_text_selection__" type="text/css">body { -ms-user-select:none;-moz-user-select:-moz-none;-khtml-user-select:none;-webkit-user-select:none;user-select:none; }</style>');
    $(document.head).append($style);
    $(document.body).attr('onselectstart', 'return false;').attr('unselectable', 'on');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else {
      document.selection.empty(); // MSIE http://msdn.microsoft.com/en-us/library/ms535869%28v=VS.85%29.aspx
    }
  }

  // remove the <style> tag, and restore the original <body> onselectstart attribute
  function restoreTextSelection() {
    $('#__dragtable_disable_text_selection__').remove();
    if (body_onselectstart_save) {
      $(document.body).attr('onselectstart', body_onselectstart_save);
    } else {
      $(document.body).removeAttr('onselectstart');
    }
    if (body_unselectable_save) {
      $(document.body).attr('unselectable', body_unselectable_save);
    } else {
      $(document.body).removeAttr('unselectable');
    }
  }

})(jQuery);
