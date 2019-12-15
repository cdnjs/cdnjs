(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(root["jQuery"]);
  }
}(this, function (jQuery) {

/**
 * jQuery Form Validator Module: Date
 * ------------------------------------------
 * Created by Victor Jonsson <http://www.victorjonsson.se>
 * Documentation and issue tracking on Github <https://github.com/victorjonsson/jQuery-Form-Validator/>
 *
 * The following validators will be added by this module:
 *  - Time (HH:mmm)
 *  - Birth date
 *
 * @website http://formvalidator.net/#location-validators
 * @license MIT
 */
(function ($) {

  $.formUtils.registerLoadedModule('date');

  /*
   * Validate time hh:mm
   */
  $.formUtils.addValidator({
    name: 'time',
    validatorFunction: function (time) {
      if (time.match(/^(\d{2}):(\d{2})$/) === null) {
        return false;
      } else {
        var hours = parseInt(time.split(':')[0], 10);
        var minutes = parseInt(time.split(':')[1], 10);
        if (hours > 23 || minutes > 59) {
          return false;
        }
      }
      return true;
    },
    errorMessage: '',
    errorMessageKey: 'badTime'
  });

  /*
   * Is this a valid birth date
   */
  $.formUtils.addValidator({
    name: 'birthdate',
    validatorFunction: function (val, $el, conf) {
      var dateFormat = 'yyyy-mm-dd';
      if ($el.valAttr('format')) {
        dateFormat = $el.valAttr('format');
      }
      else if (typeof conf.dateFormat !== 'undefined') {
        dateFormat = conf.dateFormat;
      }

      var inputDate = $.formUtils.parseDate(val, dateFormat);
      if (!inputDate) {
        return false;
      }

      var year = inputDate[0],
        month = inputDate[1],
        day = inputDate[2],
        age = getAge(year, month, day),
        allowedAgeRange = ($el.valAttr('age-range') || '0-124').split('-');

      $el.trigger('ageCalculated', [age]);

      if (allowedAgeRange.length !== 2 || !$.isNumeric(allowedAgeRange[0]) || !$.isNumeric(allowedAgeRange[1])) {
        throw new Error('Date range format invalid');
      }

      return age >= allowedAgeRange[0] && age <= allowedAgeRange[1];
    },
    errorMessage: '',
    errorMessageKey: 'badDate'
  });

  function getAge(otherDateYear, otherDateMonth, otherDateDay) {
    var birthDate = new Date(otherDateYear, otherDateMonth, otherDateDay), now = new Date(),
      years = now.getFullYear() - birthDate.getFullYear();
    birthDate.setFullYear(birthDate.getFullYear() + years);
    if (birthDate > now) {
      years--;
      birthDate.setFullYear(birthDate.getFullYear() - 1);
    }
    var days = Math.floor((now.getTime() - birthDate.getTime()) / (3600 * 24 * 1000)),
      yearsOld = years + days / (isLeapYear(now.getFullYear()) ? 366 : 365),
      decimals = ((yearsOld + '').split('.')[1] || '').substr(0, 3);

    if (yearsOld >= 0) {
      return Math.floor(yearsOld) + (decimals >= 915 ? 1:0);
    } else {
      decimals *= 10;
      return Math.floor(yearsOld) + (decimals <= 840 ? 1:0);
    }
  }

  function isLeapYear(year) {
    var d = new Date(year, 1, 28);
    d.setDate(d.getDate() + 1);
    return d.getMonth() === 1;
  }

})(jQuery);


}));
