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
 * jQuery Form Validator
 * ------------------------------------------
 *
 * Russian language package
 *
 * @website http://formvalidator.net/
 * @license MIT
 */
(function($, window) {

  'use strict';

  $.formUtils.registerLoadedModule('lang/ru');

  $(window).bind('validatorsLoaded', function() {

    $.formUtils.LANG = {

      errorTitle: 'Ошибка отправки формы!',
      requiredField: 'Это обязательное поле',
      requiredFields: 'Вы задали не все обязательные поля',
      badTime: 'Вы задали некорректное время',
      badEmail: 'Вы задали некорректный e-mail',
      badTelephone: 'Вы задали некорректный номер телефона',
      badSecurityAnswer: 'Вы задали некорректный ответ на секретный вопрос',
      badDate: 'Вы задали некорректную дату',
      lengthBadStart: 'Значение должно быть в диапазоне',
      lengthBadEnd: ' символов',
      lengthTooLongStart: 'Значение длинее, чем ',
      lengthTooShortStart: 'Значение меньше, чем ',
      notConfirmed: 'Введённые значения не могут быть подтверждены',
      badDomain: 'Некорректное значение домена',
      badUrl: 'Некорретный URL',
      badCustomVal: 'Введённое значение неверно',
      andSpaces: ' и пробелы ',
      badInt: 'Значение - не число',
      badSecurityNumber: 'Введённый защитный номер - неправильный',
      badUKVatAnswer: 'Некорректный UK VAT номер',
      badStrength: 'Пароль не достаточно надёжен',
      badNumberOfSelectedOptionsStart: 'Вы должны выбрать как минимум ',
      badNumberOfSelectedOptionsEnd: ' ответов',
      badAlphaNumeric: 'Значение должно содержать только числа и буквы ',
      badAlphaNumericExtra: ' и ',
      wrongFileSize: 'Загружаемый файл слишком велик (максимальный размер %s)',
      wrongFileType: 'Принимаются файлы следующих типов %s',
      groupCheckedRangeStart: 'Выберите между ',
      groupCheckedTooFewStart: 'Выберите как минимум ',
      groupCheckedTooManyStart: 'Выберите максимум из ',
      groupCheckedEnd: ' элемент(ов)',
      badCreditCard: 'Номер кредитной карты некорректен',
      badCVV: 'CVV номер некорректно',
      wrongFileDim : 'Неверные размеры графического файла,',
      imageTooTall : 'изображение не может быть уже чем',
      imageTooWide : 'изображение не может быть шире чем',
      imageTooSmall : 'изображение слишком мало',
      min : 'минимум',
      max : 'максимум',
      imageRatioNotAccepted : 'Изображение с таким соотношением сторон не принимается',
      badBrazilTelephoneAnswer: 'Введённый номер телефона неправильный',
      badBrazilCEPAnswer: 'CEP неправильный',
      badBrazilCPFAnswer: 'CPF неправильный'
    };

  });

})(jQuery, window);


}));
