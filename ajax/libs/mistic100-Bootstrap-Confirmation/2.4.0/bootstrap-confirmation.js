/*!
 * Bootstrap Confirmation
 * Copyright 2013 Nimit Suwannagate <ethaizone@hotmail.com>
 * Copyright 2014-2016 Damien "Mistic" Sorel <contact@git.strangeplanet.fr>
 * Licensed under the Apache License, Version 2.0
 */

(function($) {
  'use strict';

  var activeConfirmation;

  // Confirmation extends popover.js
  if (!$.fn.popover) throw new Error('Confirmation requires popover.js');

  // CONFIRMATION PUBLIC CLASS DEFINITION
  // ===============================
  var Confirmation = function(element, options) {
    options.trigger = 'click';

    this.init(element, options);
  };

  Confirmation.VERSION = '2.4.0';

  /**
   * Map between keyboard events "keyCode|which" and "key"
   */
  Confirmation.KEYMAP = {
    13: 'Enter',
    27: 'Escape',
    39: 'ArrowRight',
    40: 'ArrowDown'
  };

  Confirmation.DEFAULTS = $.extend({}, $.fn.popover.Constructor.DEFAULTS, {
    placement: 'top',
    title: 'Are you sure?',
    popout: false,
    singleton: false,
    copyAttributes: 'href target',
    buttons: null,
    onConfirm: $.noop,
    onCancel: $.noop,
    btnOkClass: 'btn-xs btn-primary',
    btnOkIcon: 'glyphicon glyphicon-ok',
    btnOkLabel: 'Yes',
    btnCancelClass: 'btn-xs btn-default',
    btnCancelIcon: 'glyphicon glyphicon-remove',
    btnCancelLabel: 'No',
    // @formatter:off
    // href="#" allows the buttons to be focused
    template: '<div class="popover confirmation">' +
      '<div class="arrow"></div>' +
      '<h3 class="popover-title"></h3>' +
      '<div class="popover-content">' +
        '<p class="confirmation-content"></p>' +
        '<div class="confirmation-buttons text-center">' +
          '<div class="btn-group">' +
            '<a href="#" class="btn" data-apply="confirmation"></a>' +
            '<a href="#" class="btn" data-dismiss="confirmation"></a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
    // @formatter:on
  });

  Confirmation.prototype = $.extend({}, $.fn.popover.Constructor.prototype);
  Confirmation.prototype.constructor = Confirmation;

  /**
   * Expose defaults
   * @returns {object}
   */
  Confirmation.prototype.getDefaults = function() {
    return Confirmation.DEFAULTS;
  };

  /**
   * Init the component
   * @param element {jQuery}
   * @param options {object}
   */
  Confirmation.prototype.init = function(element, options) {
    $.fn.popover.Constructor.prototype.init.call(this, 'confirmation', element, options);

    if ((this.options.popout || this.options.singleton) && !options.rootSelector) {
      throw new Error('The rootSelector option is required to use popout and singleton features since jQuery 3.');
    }

    // keep trace of selectors
    this.options._isDelegate = false;
    if (options.selector) { // container of buttons
      this.options._selector = this._options._selector = options.rootSelector + ' ' + options.selector;
    }
    else if (options._selector) { // children of container
      this.options._selector = options._selector;
      this.options._isDelegate = true;
    }
    else { // standalone
      this.options._selector = options.rootSelector;
    }

    var self = this;

    if (!this.options.selector) {
      // store copied attributes
      this.options._attributes = {};
      if (this.options.copyAttributes) {
        if (typeof this.options.copyAttributes === 'string') {
          this.options.copyAttributes = this.options.copyAttributes.split(' ');
        }
      }
      else {
        this.options.copyAttributes = [];
      }

      this.options.copyAttributes.forEach(function(attr) {
        this.options._attributes[attr] = this.$element.attr(attr);
      }, this);

      // cancel original event
      this.$element.on(this.options.trigger, function(e, ack) {
        if (!ack) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      });

      // manage singleton
      this.$element.on('show.bs.confirmation', function(e) {
        if (self.options.singleton) {
          // close all other popover already initialized
          $(self.options._selector).not($(this)).filter(function() {
            return $(this).data('bs.confirmation') !== undefined;
          }).confirmation('hide');
        }
      });
    }
    else {
      // cancel original event
      this.$element.on(this.options.trigger, this.options.selector, function(e, ack) {
        if (!ack) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      });
    }

    if (!this.options._isDelegate) {
      // manage popout
      this.eventBody = false;
      this.uid = this.$element[0].id || this.getUID('group_');

      this.$element.on('shown.bs.confirmation', function(e) {
        if (self.options.popout && !self.eventBody) {
          self.eventBody = $('body').on('click.bs.confirmation.' + self.uid, function(e) {
            if ($(self.options._selector).is(e.target)) {
              return;
            }

            // close all popover already initialized
            $(self.options._selector).filter(function() {
              return $(this).data('bs.confirmation') !== undefined;
            }).confirmation('hide');

            $('body').off('click.bs.' + self.uid);
            self.eventBody = false;
          });
        }
      });
    }
  };

  /**
   * Overrides, always show
   * @returns {boolean}
   */
  Confirmation.prototype.hasContent = function() {
    return true;
  };

  /**
   * Sets the popover content
   */
  Confirmation.prototype.setContent = function() {
    var self = this;
    var $tip = this.tip();
    var title = this.getTitle();
    var content = this.getContent();

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);

    $tip.find('.confirmation-content').toggle(!!content).children().detach().end()[
      // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
      ](content);

    $tip.on('click', function(e) {
      e.stopPropagation();
    });

    if (this.options.buttons) {
      // configure custom buttons
      var $group = $tip.find('.confirmation-buttons .btn-group').empty();

      this.options.buttons.forEach(function(button) {
        $group.append(
          $('<a href="#"></a>')
            .addClass(button.class || 'btn btn-xs btn-default')
            .html(button.label || '')
            .attr(button.attr || {})
            .prepend($('<i></i>').addClass(button.icon), ' ')
            .one('click', function(e) {
              if ($(this).attr('href') === '#') {
                e.preventDefault();
              }

              if (button.onClick) {
                button.onClick.call(self.$element);
              }

              if (button.cancel) {
                self.getOnCancel.call(self).call(self.$element);
                self.$element.trigger('canceled.bs.confirmation');
              }
              else {
                self.getOnConfirm.call(self).call(self.$element);
                self.$element.trigger('confirmed.bs.confirmation');
              }

              if (self.inState) { // Bootstrap 3.3.5
                self.inState.click = false;
              }

              self.hide();
            })
        );
      }, this);
    }
    else {
      // configure 'ok' button
      $tip.find('[data-apply="confirmation"]')
        .addClass(this.options.btnOkClass)
        .html(this.options.btnOkLabel)
        .attr(this.options._attributes)
        .prepend($('<i></i>').addClass(this.options.btnOkIcon), ' ')
        .off('click')
        .one('click', function(e) {
          if ($(this).attr('href') === '#') {
            e.preventDefault();
          }

          self.getOnConfirm.call(self).call(self.$element);
          self.$element.trigger('confirmed.bs.confirmation');

          self.$element.trigger(self.options.trigger, [true]);

          self.hide();
        });

      // configure 'cancel' button
      $tip.find('[data-dismiss="confirmation"]')
        .addClass(this.options.btnCancelClass)
        .html(this.options.btnCancelLabel)
        .prepend($('<i></i>').addClass(this.options.btnCancelIcon), ' ')
        .off('click')
        .one('click', function(e) {
          e.preventDefault();

          self.getOnCancel.call(self).call(self.$element);
          self.$element.trigger('canceled.bs.confirmation');

          if (self.inState) { // Bootstrap 3.3.5
            self.inState.click = false;
          }

          self.hide();
        });
    }

    $tip.removeClass('fade top bottom left right in');

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) {
      $tip.find('.popover-title').hide();
    }

    // bind key navigation
    activeConfirmation = this;
    $(window)
      .off('keyup.bs.confirmation')
      .on('keyup.bs.confirmation', this._onKeyup.bind(this));
  };

  /**
   * Remove key binding on destroy
   */
  Confirmation.prototype.destroy = function() {
    if (activeConfirmation === this) {
      activeConfirmation = undefined;
      $(window).off('keyup.bs.confirmation');
    }
    $.fn.popover.Constructor.prototype.destroy.call(this);
  };

  /**
   * Remove key binding on hide
   */
  Confirmation.prototype.hide = function() {
    if (activeConfirmation === this) {
      activeConfirmation = undefined;
      $(window).off('keyup.bs.confirmation');
    }
    $.fn.popover.Constructor.prototype.hide.call(this);
  };

  /**
   * Navigate through buttons with keyboard
   * @param event
   * @private
   */
  Confirmation.prototype._onKeyup = function(event) {
    if (!this.$tip) {
      activeConfirmation = undefined;
      $(window).off('keyup.bs.confirmation');
      return;
    }

    var key = event.key || Confirmation.KEYMAP[event.keyCode || event.which];

    var $group = this.$tip.find('.confirmation-buttons .btn-group');
    var $active = $group.find('.active');
    var $next;

    switch (key) {
      case 'Escape':
        this.hide();
        break;

      case 'ArrowRight':
        if ($active.length && $active.next().length) {
          $next = $active.next();
        }
        else {
          $next = $group.children().first();
        }
        $active.removeClass('active');
        $next.addClass('active').focus();
        break;

      case 'ArrowLeft':
        if ($active.length && $active.prev().length) {
          $next = $active.prev();
        }
        else {
          $next = $group.children().last();
        }
        $active.removeClass('active');
        $next.addClass('active').focus();
        break;
    }
  };

  /**
   * Gets the on-confirm callback
   * @returns {function}
   */
  Confirmation.prototype.getOnConfirm = function() {
    if (this.$element.attr('data-on-confirm')) {
      return getFunctionFromString(this.$element.attr('data-on-confirm'));
    }
    else {
      return this.options.onConfirm;
    }
  };

  /**
   * Gets the on-cancel callback
   * @returns {function}
   */
  Confirmation.prototype.getOnCancel = function() {
    if (this.$element.attr('data-on-cancel')) {
      return getFunctionFromString(this.$element.attr('data-on-cancel'));
    }
    else {
      return this.options.onCancel;
    }
  };

  /**
   * Generates an anonymous function from a function name
   * function name may contain dots (.) to navigate through objects
   * root context is window
   */
  function getFunctionFromString(functionName) {
    var context = window;
    var namespaces = functionName.split('.');
    var func = namespaces.pop();

    for (var i = 0, l = namespaces.length; i < l; i++) {
      context = context[namespaces[i]];
    }

    return function() {
      context[func].call(this);
    };
  }


  // CONFIRMATION PLUGIN DEFINITION
  // =========================

  var old = $.fn.confirmation;

  $.fn.confirmation = function(option) {
    var options = (typeof option == 'object' && option) || {};
    options.rootSelector = this.selector || options.rootSelector; // this.selector removed in jQuery > 3

    return this.each(function() {
      var $this = $(this);
      var data = $this.data('bs.confirmation');

      if (!data && option == 'destroy') {
        return;
      }
      if (!data) {
        $this.data('bs.confirmation', (data = new Confirmation(this, options)));
      }
      if (typeof option == 'string') {
        data[option]();

        if (option == 'hide' && data.inState) { //data.inState doesn't exist in Bootstrap < 3.3.5
          data.inState.click = false;
        }
      }
    });
  };

  $.fn.confirmation.Constructor = Confirmation;


  // CONFIRMATION NO CONFLICT
  // ===================

  $.fn.confirmation.noConflict = function() {
    $.fn.confirmation = old;
    return this;
  };

}(jQuery));
