/*! 
 * medium-editor-insert-plugin v0.3.2 - jQuery insert plugin for MediumEditor
 *
 * https://github.com/orthes/medium-editor-insert-plugin
 * 
 * Copyright (c) 2014 Pavel Linkesch (http://linkesch.sk)
 * Released under the MIT license
 */

(function ($) {

  $.fn.mediumInsert.registerAddon('maps', {

    /**
    * Maps initial function
    * @return {void}
    */

    init: function () {
      this.$el = $.fn.mediumInsert.insert.$el;
    },

    insertButton: function(buttonLabels){
      var label = 'Map';
      if (buttonLabels === 'fontawesome' || typeof buttonLabels === 'object' && !!(buttonLabels.fontawesome)) {
        label = '<i class="fa fa-map-marker"></i>';
      }
      
      if (typeof buttonLabels === 'object' && buttonLabels.map) {
        label = buttonLabels.map;
      }

      return '<button data-addon="maps" data-action="add" class="medium-editor-action mediumInsert-action">'+label+'</button>';
    },

    /**
    * Add map to placeholder
    * @param {element} placeholder Placeholder to add map to
    * @return {void}
    */

    add: function (placeholder) {
      $.fn.mediumInsert.insert.deselect();

      placeholder.append('<div class="mediumInsert-maps">Map - Coming soon...</div>');
    }

  });

}(jQuery));
