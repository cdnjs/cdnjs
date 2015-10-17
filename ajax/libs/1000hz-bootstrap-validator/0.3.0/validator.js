/*!
 * Validator v0.3.0 for Bootstrap 3, by @1000hz
 * Copyright 2014 Spiceworks, Inc.
 * Licensed under http://opensource.org/licenses/MIT
 *
 * https://github.com/1000hz/bootstrap-validator
 */

+function ($) {
  'use strict';

  // VALIDATOR CLASS DEFINITION
  // ==========================

  var Validator = function (element, options) {
    this.$element = $(element)
    this.options  = options

    this.toggleSubmit()

    this.$element.on('input.bs.validator change.bs.validator focusout.bs.validator', $.proxy(this.validateInput, this))

    this.$element.find('[data-match]').each(function () {
      var $this  = $(this)
      var target = $this.data('match')

      $(target).on('input.bs.validator', function (e) {
        $this.val() && $this.trigger('input')
      })
    })
  }

  Validator.DEFAULTS = {
    delay: 500,
    errors: {
      match: 'Does not match',
      minlength: 'Not long enough'
    }
  }

  Validator.VALIDATORS = {
    native: function ($el) {
      var el = $el[0]
      return el.checkValidity ? el.checkValidity() : true
    },
    match: function ($el) {
      var target = $el.data('match')
      return !$el.val() || $el.val() === $(target).val()
    },
    minlength: function ($el) {
      var minlength = $el.data('minlength')
      return !$el.val() || $el.val().length >= minlength
    }
  }

  Validator.prototype.validateInput = function (e) {
    var $el        = $(e.target)
    var prevErrors = $el.data('bs.errors')
    var errors

    this.$element.trigger(e = $.Event('validate.bs.validator', {relatedTarget: $el[0]}))

    if (e.isDefaultPrevented()) return

    $el.data('bs.errors', errors = this.runValidators($el))

    errors.length ? this.showErrors($el) : this.clearErrors($el)

    if (!prevErrors || errors.toString() !== prevErrors.toString()) {
      e = errors.length
        ? $.Event('invalid.bs.validator', {relatedTarget: $el[0], detail: errors})
        : $.Event('valid.bs.validator', {relatedTarget: $el[0], detail: prevErrors})

      this.$element.trigger(e)
    }

    this.toggleSubmit()

    this.$element.trigger($.Event('validated.bs.validator', {relatedTarget: $el[0]}))
  }

  Validator.prototype.runValidators = function ($el) {
    var errors     = []
    var validators = [Validator.VALIDATORS.native]

    $.each(Validator.VALIDATORS, $.proxy(function (key, validator) {
      if (($el.data(key) || key == 'native') && !validator.call(this, $el)) {
        var error = $el.data(key + '-error')
          || $el.data('error')
          || key == 'native' && $el[0].validationMessage
          || this.options.errors[key]

        !~errors.indexOf(error) && errors.push(error)
      }
    }, this))

    return errors
  }

  Validator.prototype.validate = function () {
    var delay = this.options.delay

    this.options.delay = 0
    this.$element.find(':input').trigger('input')
    this.options.delay = delay

    return this
  }

  Validator.prototype.showErrors = function ($el) {
    function callback() {
      var $group = $el.closest('.form-group')
      var $block = $group.find('.help-block.with-errors')
      var errors = $el.data('bs.errors')

      if (!errors.length) return

      errors = $('<ul/>')
        .addClass('list-unstyled')
        .append($.map(errors, function (error) { return $('<li/>').text(error) }))

      $block.data('bs.originalContent') === undefined && $block.data('bs.originalContent', $block.html())
      $block.empty().append(errors)

      $group.addClass('has-error')
    }

    if (this.options.delay) {
      window.clearTimeout($el.data('bs.timeout'))
      $el.data('bs.timeout', window.setTimeout(callback, this.options.delay))
    } else callback()
  }

  Validator.prototype.clearErrors = function ($el) {
    var $group = $el.closest('.form-group')
    var $block = $group.find('.help-block.with-errors')

    $block.html($block.data('bs.originalContent'))
    $group.removeClass('has-error')
  }

  Validator.prototype.hasErrors = function () {
    function fieldErrors() {
      return !!($(this).data('bs.errors') || []).length
    }

    return !!this.$element.find(':input').filter(fieldErrors).length
  }

  Validator.prototype.isIncomplete = function () {
    function fieldIncomplete() {
      return this.type === 'checkbox' ? !this.checked                                   :
             this.type === 'radio'    ? !$('[name="' + this.name + '"]:checked').length :
                                        $.trim(this.value) === ''
    }

    return !!this.$element.find('[required]').filter(fieldIncomplete).length
  }

  Validator.prototype.toggleSubmit = function () {
    var $btn = this.$element.find(':submit')
    $btn.attr('disabled', this.isIncomplete() || this.hasErrors())
  }


  // VALIDATOR PLUGIN DEFINITION
  // ===========================

  var old = $.fn.validator

  $.fn.validator = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var options = $.extend({}, Validator.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var data    = $this.data('bs.validator')

      if (!data) $this.data('bs.validator', (data = new Validator(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.validator.Constructor = Validator;


  // VALIDATOR NO CONFLICT
  // =====================

  $.fn.validator.noConflict = function () {
    $.fn.validator = old
    return this
  }


  // VALIDATOR DATA-API
  // ==================

  $(window).on('load', function () {
    $('form[data-toggle="validator"]').each(function () {
      var $form = $(this)
      $form.validator($form.data())
    })
  })

}(jQuery);
