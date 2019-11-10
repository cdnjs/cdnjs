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

/* jshint -W100 */
/**
 * jQuery Form Validator
 * ------------------------------------------
 *
 * Farsi language package
 *
 * @website http://formvalidator.net/
 * @license MIT
 * @version 0.0.1
 */
(function($, window) {

  'use strict';

  $.formUtils.registerLoadedModule('lang/fa');

  $(window).bind('validatorsLoaded', function() {

    $.formUtils.LANG = {
        errorTitle: 'ثبت فرم با مشکل مواجه شد!',
        requiredField: 'شما همه فیلدهای ضروری را تکمیل نکرده اید',
        requiredFields: 'شما فیلد ضروری را تکمیل نکرده اید',
        badTime: 'زمان درستی را وارد نکرده اید',
        badEmail: 'آدرس ایمیل را به درستی وارد نکرده اید',
        badTelephone: 'شماره تلفن وارد شده معتبر نیست',
        badSecurityAnswer: 'شما به سوال امنیتی درست پاسخ نداده اید',
        badDate: 'تاریخ درستی را وارد نکرده اید',
        lengthBadStart: 'مقدار وارد شده باید ',
        lengthBadEnd: ' حرف باشد.',
        lengthTooLongStart: 'مقدار ورودی بیشتر از ',
        lengthTooShortStart: 'مقدار ورودی کمتر از ',
        notConfirmed: 'ورودی ها یکسان نیستند',
        badDomain: 'آدرس دامنه به درستی وارد نشده است',
        badUrl: 'آدرس اینترنتی به درستی وارد نشده است',
        badCustomVal: 'مقدار ورودی نادرست است',
        andSpaces: ' و فاصله خالی ',
        badInt: 'مقدار ورودی باید عدد باشد',
        badSecurityNumber: 'شماره امنیت اجتماعی شما معتبر نیست',
        badUKVatAnswer: 'شماره مالیاتی شما درست نیست',
        badStrength: 'کلمه عبور به قدر کافی مستحکم نیست',
        badNumberOfSelectedOptionsStart: 'شما باید حداقل  ',
        badNumberOfSelectedOptionsEnd: ' پاسخ را انتخاب کنید',
        badAlphaNumeric: 'مقدار ورودی می تواند حروف و شماره باشد ',
        badAlphaNumericExtra: ' و ',
        wrongFileSize: 'حجم فایل انتخابی زیاد است. (حداکثر %s)',
        wrongFileType: 'فقط فایل های با فرمت %s مجاز هستند',
        groupCheckedRangeStart: 'لطفا بین ',
        groupCheckedTooFewStart: 'لطفا حداقل ',
        groupCheckedTooManyStart: 'لطفا حداکثر ',
        groupCheckedEnd: ' گزینه انتخاب کنید',
        badCreditCard: 'شماره کارت اعتباری معتبر نیست',
        badCVV: 'کد شناسایی سی وی وی معتبر نیست',
        wrongFileDim : 'ابعاد تصویر صحیح نیست,',
        imageTooTall : 'حداکثر طول تصویر',
        imageTooWide : 'حداکثر عرض تصویر',
        imageTooSmall : 'تصویر خیلی کوچک است',
        min : 'حداقل',
        max : 'حداکثر',
        imageRatioNotAccepted : 'نسبت ابعاد تصویر مناسب نیست'
    };

  });

})(jQuery, window);


}));
