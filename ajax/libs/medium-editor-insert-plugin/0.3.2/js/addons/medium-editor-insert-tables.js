/*! 
 * medium-editor-insert-plugin v0.3.2 - jQuery insert plugin for MediumEditor
 *
 * https://github.com/orthes/medium-editor-insert-plugin
 * 
 * Copyright (c) 2014 Pavel Linkesch (http://linkesch.sk)
 * Released under the MIT license
 */

(function ($) {

  $.fn.mediumInsert.registerAddon('tables', {

    /**
    * Table default options
    */

    defaults: {
      defaultRows: 2,
      defaultCols: 2
    },

    /**
     * Tables initial function
     * @return {void}
     */
    init : function (options) {
      this.options = $.extend(this.defaults, options);
      this.$el = $.fn.mediumInsert.insert.$el;
      this.setTableButtonEvents();
    },

    insertButton : function (buttonLabels) {
      var label = 'Table';
      if (buttonLabels === 'fontawesome' || typeof buttonLabels === 'object' && !!(buttonLabels.fontawesome)) {
        label = '<i class="fa fa-table"></i>';
      }

      if (typeof buttonLabels === 'object' && buttonLabels.table) {
        label = buttonLabels.table;
      }

      return '<button data-addon="tables" data-action="add" class="medium-editor-action mediumInsert-action">' + label + '</button>';
    },

    /**
     * Add table to $placeholder
     * @param {element} $placeholder $placeholder to add embed to
     * @return {void}
     */
    add : function ($placeholder) {
      $.fn.mediumInsert.insert.deselect();

      var formHtml = '<div class="medium-editor-toolbar-form-anchor mediumInsert-tableDemoBox"><table><tr><td></td><td><label>cols:<input type="text" value="' + this.options.defaultCols + '" class="mediumInsert-tableCols" /></label></td></tr><tr><td><label>rows:<input type="text" value="' + this.options.defaultRows + '" class="mediumInsert-tableRows" /></label></td><td><table class="mediumInsert-demoTable"></table></td></tr><tr><td></td><td><label><button class="mediumInsert-tableReadyButton">insert</button></label></td></tr></table></</div>';
      $(formHtml).appendTo($placeholder.prev());
      this.updateDemoTable();

      setTimeout(function () {
        $placeholder.prev().find('input').focus();
      }, 50);

      $.fn.mediumInsert.insert.deselect();
      this.currentPlaceholder = $placeholder;
    },

    setTableButtonEvents : function () {
      var that = this;

      $(document).on('keyup',
                     'input.mediumInsert-tableRows, input.mediumInsert-tableCols',
                     function() { that.updateDemoTable(); });

      $(document).on('click', function(e) {
        if ($(e.target).parents('.mediumInsert-buttons').length === 0) {
          that.removeToolbar();
        }
      });

      $(document).on('click', 'button.mediumInsert-tableReadyButton', function() {
        that.setEnterActionEvents();
        that.removeToolbar();
      });
    },

    getDimensions : function () {
      return {
        rows: parseFloat($('input.mediumInsert-tableRows').val()) || 1,
        cols: parseFloat($('input.mediumInsert-tableCols').val()) || 1
      };
    },

    buildTable : function (table) {
      var i, j, $row,
        dimensions = this.getDimensions(),
        $table = $(table);

      for (i = 0; i < dimensions.rows; i++) {
        $row = $('<tr>');
        for (j = 0; j < dimensions.cols; j++) {
          $row.append('<td>');
        }
        $table.append($row);
      }
    },

    updateDemoTable : function () {
      var $demoTable = $('table.mediumInsert-demoTable');

      $demoTable.empty();
      this.buildTable($demoTable);
    },

    setEnterActionEvents : function () {
      var that = this;
      if ($.fn.mediumInsert.settings.enabled === false) {
        return false;
      }

      var $table = $('<table class="mediumInsert-table">');
      that.buildTable($table);

      that.currentPlaceholder.append($table);
      that.currentPlaceholder.closest('[data-medium-element]').trigger('keyup').trigger('input');
    },

    removeToolbar : function () {
      $(".mediumInsert-tableDemoBox").remove();
    }

  });

}(jQuery));
