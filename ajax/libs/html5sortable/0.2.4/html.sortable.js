(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.sortable = factory(root.jQuery);
  }
}(this, function($) {
/*
 * HTML5 Sortable jQuery Plugin
 * https://github.com/voidberg/html5sortable
 *
 * Original code copyright 2012 Ali Farhadi.
 * This version is mantained by Alexandru Badiu <andu@ctrlz.ro> & Lukas Oppermann <lukas@vea.re>
 *
 *
 * Released under the MIT license.
 */
var dragging;
var draggingHeight;
var placeholders = $();
var sortable = function(options) {
  'use strict';
  var method = String(options);

  options = $.extend({
    connectWith: false,
    placeholder: null,
    dragImage: null,
    placeholderClass: 'sortable-placeholder',
    draggingClass: 'sortable-dragging'
  }, options);
  /* TODO: maxstatements should be 25, fix and remove line below */
  /*jshint maxstatements:false */
  return this.each(function() {

    var index;
    var $sortable = $(this);
    var items = $sortable.children(options.items);
    var handles = options.handle ? items.find(options.handle) : items;

    if (method === 'reload') {
      // remove event handlers from items
      items.off('dragstart.h5s');
      items.off('dragend.h5s');
      items.off('selectstart.h5s');
      items.off('dragover.h5s');
      items.off('dragenter.h5s');
      items.off('drop.h5s');
      // remove event handlers from sortable
      $sortable.off('dragover.h5s');
      $sortable.off('dragenter.h5s');
      $sortable.off('drop.h5s');
    }

    if (/^enable|disable|destroy$/.test(method)) {
      var citems = $(this).children($(this).data('items'));
      citems.attr('draggable', method === 'enable');

      $(this).attr('aria-dropeffect', (/^disable|destroy$/.test(method) ? 'none' : 'move'));

      if (method === 'destroy') {
        $(this).off('sortstart sortupdate');
        $(this).removeData('opts');
        citems.add(this).removeData('connectWith items')
          .off('dragstart.h5s dragend.h5s dragover.h5s dragenter.h5s drop.h5s sortupdate');
        handles.off('selectstart.h5s');
      }
      return;
    }

    var soptions = $(this).data('opts');

    if (typeof soptions === 'undefined') {
      $(this).data('opts', options);
    } else {
      options = soptions;
    }

    var startParent;
    var newParent;
    var placeholder = (options.placeholder === null) ? $('<' + (/^ul|ol$/i.test(this.tagName) ? 'li' : 'div') + ' class="' + options.placeholderClass + '"/>') : $(options.placeholder).addClass(options.placeholderClass);

    $(this).data('items', options.items);
    placeholders = placeholders.add(placeholder);
    if (options.connectWith) {
      $(options.connectWith).add(this).data('connectWith', options.connectWith);
    }

    items.attr('role', 'option');
    items.attr('aria-grabbed', 'false');

    // Setup drag handles
    handles.attr('draggable', 'true');
    handles.not('a[href], img').on('selectstart.h5s', function() {
      if (this.dragDrop) {
        this.dragDrop();
      }
    }).end();

    // Handle drag events on draggable items
    items.on('dragstart.h5s', function(e) {
      e.stopImmediatePropagation();
      var dt = e.originalEvent.dataTransfer;
      dt.effectAllowed = 'move';
      dt.setData('text', '');

      if (options.dragImage && dt.setDragImage) {
        dt.setDragImage(options.dragImage, 0, 0);
      }

      // cache selsection & add attr for dragging
      dragging = $(this);
      dragging.addClass(options.draggingClass);
      dragging.attr('aria-grabbed', 'true');
      // grab values
      index = dragging.index();
      draggingHeight = dragging.height();
      startParent = $(this).parent();
      // trigger sortstar update
      dragging.parent().triggerHandler('sortstart', {
        item: dragging,
        startparent: startParent
      });
    });
    // Handle drag events on draggable items
    items.on('dragend.h5s', function() {
      if (!dragging) {
        return;
      }
      // remove dragging attributes and show item
      dragging.removeClass(options.draggingClass);
      dragging.attr('aria-grabbed', 'false');
      dragging.show();

      placeholders.detach();
      newParent = $(this).parent();
      if (index !== dragging.index() ||
          startParent.get(0) !== newParent.get(0)) {
        dragging.parent().triggerHandler('sortupdate', {
          item: dragging,
          oldindex: index,
          startparent: startParent,
          endparent: newParent
        });
      }
      dragging = null;
      draggingHeight = null;
    });
    // Handle dragover, dragenter and drop events on draggable items
    items.add([this, placeholder]).on('dragover.h5s dragenter.h5s drop.h5s', function(e) {
      if (!items.is(dragging) &&
          options.connectWith !== $(dragging).parent().data('connectWith')) {
        return true;
      }
      if (e.type === 'drop') {
        e.stopPropagation();
        placeholders.filter(':visible').after(dragging);
        dragging.trigger('dragend.h5s');
        return false;
      }
      e.preventDefault();
      e.originalEvent.dataTransfer.dropEffect = 'move';
      if (items.is(this)) {
        var thisHeight = $(this).height();
        if (options.forcePlaceholderSize) {
          placeholder.height(draggingHeight);
        }

        // Check if $(this) is bigger than the draggable. If it is, we have to define a dead zone to prevent flickering
        if (thisHeight > draggingHeight) {
          // Dead zone?
          var deadZone = thisHeight - draggingHeight;
          var offsetTop = $(this).offset().top;
          if (placeholder.index() < $(this).index() &&
              e.originalEvent.pageY < offsetTop + deadZone) {
            return false;
          }
          if (placeholder.index() > $(this).index() &&
              e.originalEvent.pageY > offsetTop + thisHeight - deadZone) {
            return false;
          }
        }

        dragging.hide();
        if (placeholder.index() < $(this).index()) {
          $(this).after(placeholder);
        } else {
          $(this).before(placeholder);
        }
        placeholders.not(placeholder).detach();
      } else {
        if (!placeholders.is(this) && !$(this).children(options.items).length) {
          placeholders.detach();
          $(this).append(placeholder);
        }
      }
      return false;
    });
  });
};

$.fn.sortable = sortable;

return sortable;
}));
