///<reference src="js/tempus-dominus"/>
/*global $, tempusDominus */

/*!
 * Tempus Dominus v6.7.7 (https://getdatepicker.com/)
 * Copyright 2013-2021 Jonathan Peterson
 * Licensed under MIT (https://github.com/Eonasdan/tempus-dominus/blob/master/LICENSE)
 */
tempusDominus.jQueryInterface = function (option, argument) {
  if (this.length === 1) {
    return tempusDominus.jQueryHandleThis(this, option, argument);
  }
  // "this" is jquery here
  return this.each(function () {
    tempusDominus.jQueryHandleThis(this, option, argument);
  });
};

tempusDominus.jQueryHandleThis = function (me, option, argument) {
  let data = $(me).data(tempusDominus.Namespace.dataKey);
  if (typeof option === 'object') {
    option = $.extend({}, tempusDominus.DefaultOptions, option);
  }

  if (!data) {
    data = new tempusDominus.TempusDominus($(me)[0], option);
    $(me).data(tempusDominus.Namespace.dataKey, data);
  }

  if (typeof option === 'string') {
    if (data[option] === undefined) {
      throw new Error(`No method named "${option}"`);
    }
    if (argument === undefined) {
      return data[option]();
    } else {
      if (option === 'date') {
        data.isDateUpdateThroughDateOptionFromClientCode = true;
      }
      const ret = data[option](argument);
      data.isDateUpdateThroughDateOptionFromClientCode = false;
      return ret;
    }
  }
};

tempusDominus.getSelectorFromElement = function ($element) {
  let selector = $element.data('target'),
    $selector;

  if (!selector) {
    selector = $element.attr('href') || '';
    selector = /^#[a-z]/i.test(selector) ? selector : null;
  }
  $selector = $(selector);
  if ($selector.length === 0) {
    return $element;
  }

  if (!$selector.data(tempusDominus.Namespace.dataKey)) {
    $.extend({}, $selector.data(), $(this).data());
  }

  return $selector;
};

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */
$(document)
  .on(
    `click${tempusDominus.Namespace.events.key}.data-api`,
    `[data-toggle="${tempusDominus.Namespace.dataKey}"]`,
    function () {
      const $originalTarget = $(this),
        $target = tempusDominus.getSelectorFromElement($originalTarget),
        config = $target.data(tempusDominus.Namespace.dataKey);
      if ($target.length === 0) {
        return;
      }
      if (
        config._options.allowInputToggle &&
        $originalTarget.is('input[data-toggle="datetimepicker"]')
      ) {
        return;
      }
      tempusDominus.jQueryInterface.call($target, 'toggle');
    }
  )
  .on(
    tempusDominus.Namespace.events.change,
    `.${tempusDominus.Namespace.NAME}-input`,
    function (event) {
      const $target = tempusDominus.getSelectorFromElement($(this));
      if ($target.length === 0 || event.isInit) {
        return;
      }
      tempusDominus.jQueryInterface.call($target, '_change', event);
    }
  )
  .on(
    tempusDominus.Namespace.events.blur,
    `.${tempusDominus.Namespace.NAME}-input`,
    function (event) {
      const $target = tempusDominus.getSelectorFromElement($(this)),
        config = $target.data(tempusDominus.Namespace.dataKey);
      if ($target.length === 0) {
        return;
      }
      if (config._options.debug || window.debug) {
        return;
      }
      tempusDominus.jQueryInterface.call($target, 'hide', event);
    }
  )
  /*.on(tempusDominus.Namespace.Events.keydown, `.${tempusDominus.Namespace.NAME}-input`, function (event) {
      const $target = tempusDominus.getSelectorFromElement($(this));
      if ($target.length === 0) {
        return;
      }
      tempusDominus.jQueryInterface.call($target, '_keydown', event);
    })
    .on(tempusDominus.Namespace.Events.keyup, `.${tempusDominus.Namespace.NAME}-input`, function (event) {
      const $target = tempusDominus.getSelectorFromElement($(this));
      if ($target.length === 0) {
        return;
      }
      tempusDominus.jQueryInterface.call($target, '_keyup', event);
    })*/
  .on(
    tempusDominus.Namespace.events.focus,
    `.${tempusDominus.Namespace.NAME}-input`,
    function (event) {
      const $target = tempusDominus.getSelectorFromElement($(this)),
        config = $target.data(tempusDominus.Namespace.dataKey);
      if ($target.length === 0) {
        return;
      }
      if (!config._options.allowInputToggle) {
        return;
      }
      tempusDominus.jQueryInterface.call($target, 'show', event);
    }
  );
const name = 'tempusDominus';
const JQUERY_NO_CONFLICT = $.fn[name];
$.fn[name] = tempusDominus.jQueryInterface;
$.fn[name].Constructor = tempusDominus.TempusDominus;
$.fn[name].noConflict = function () {
  $.fn[name] = JQUERY_NO_CONFLICT;
  return tempusDominus.jQueryInterface;
};
