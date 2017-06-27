/*! 
 * medium-editor-insert-plugin v0.1.1 - jQuery insert plugin for MediumEditor
 *
 * Maps Addon
 *
 * https://github.com/orthes/medium-editor-images-plugin
 * 
 * Copyright (c) 2013 Pavel Linkesch (http://linkesch.sk)
 * Released under the MIT license
 */

(function ($) {
    
  $.fn.mediumInsert.maps = {
    
    /**
    * Maps initial function
    * @return {void}
    */
      
    init: function () {
      this.$el = $.fn.mediumInsert.insert.$el;
    },
      
    /**
    * Add map to placeholder
    * @param {element} placeholder Placeholder to add map to
    * @return {void}
    */
    
    add: function (placeholder) {
      var that = this;

      $.fn.mediumInsert.insert.deselect();
      
      placeholder.append('<div class="mediumInsert-maps">Map - Coming soon...</div>');
    }
    
  };
  
}(jQuery));