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
 * Arabic language package
 *
 * @website http://formvalidator.net/
 * @license MIT
 */
(function($, window) {

  'use strict';

  $.formUtils.registerLoadedModule('lang/ar');

  $(window).bind('validatorsLoaded', function() {

    $.formUtils.LANG = {
      errorTitle: 'فَشِلَ إرسال النموذج',
      requiredField: 'هذا الحقل مطلوب',
      requiredFields: 'لم يتم ملأ جميع الحقول المطلوبة.',
      badTime: 'حقل الوقت خاطىء',
      badEmail: 'البريد الإلكتروني المدخل خاطئ',
      badTelephone: 'رقم الهاتف المدخل خاطئ',
      badSecurityAnswer: 'لم يتم الإجابة عن سؤال الأمان',
      badDate: 'تاريخ مدخل خاطئ',
      lengthBadStart: 'القيمة المدخلة يجب أن تكون بين ',
      lengthBadEnd: ' حروف',
      lengthTooLongStart: 'القيمة المدخل أطول من ',
      lengthTooShortStart: 'القيمة المدخل أقصر من ',
      notConfirmed: 'لم يتم تأكيد القيمة المدخلة',
      badDomain: 'قيمة نطاق خاطئة',
      badUrl: 'القيمة المدخلة ليست رابطاً صالحاً',
      badCustomVal: 'القيمة المدخلة غير صالحة',
      andSpaces: ' ومسافات ',
      badInt: 'القيمة المدخلة ليست رقماً صحيحاً',
      badSecurityNumber: 'رقم بطاقة الهوية غير صحيح',
      badUKVatAnswer: 'رقم UK VAT غير صحيح',
      badUKNin: 'غير صحيح UK NINرقم ',
      badUKUtr: 'غير صحيح UK UTR رقم',        
      badStrength: 'كلمة المرور غير قوية',
      badNumberOfSelectedOptionsStart: 'يجب اختيار على الأقل ',
      badNumberOfSelectedOptionsEnd: ' أجوبة',
      badAlphaNumeric: 'القيمة المدخلة يجب أن تتضمن حروف وأرقام فقط ',
      badAlphaNumericExtra: ' و ',
      wrongFileSize: 'الملف المراد تحميله كبير جداً (الحد المسموج %s)',
      wrongFileType: 'ملفات من نوع %s فقط مسموحة',
      groupCheckedRangeStart: 'من فضلك اختر بين ',
      groupCheckedTooFewStart: 'من فضلك اختر على الأقل ',
      groupCheckedTooManyStart: 'من فضلك اختر بحد أقصى ',
      groupCheckedEnd: ' مرات',
      badCreditCard: 'رقم بطاقة ائتمانية خاطىء',
      badCVV: 'رمز الأمان خاطئ',
      wrongFileDim : 'حدود الصورة غير صالحة',
      imageTooTall : 'الصورة يمكن أن تكون أطول من',
      imageTooWide : 'الصورة يمكن أن تكون أعرض من',
      imageTooSmall : 'صورة صغيرة جداً',
      min : 'أدنى',
      max : 'أقصى',
      imageRatioNotAccepted : 'أبعاد صورة غير مقبولة',
      badBrazilTelephoneAnswer: 'رقم هاتف مدخل خاطىء',
      badBrazilCEPAnswer: 'قيمة CEP المدخلة غير صحيحة',
      badBrazilCPFAnswer: 'قيمة CPF المدخلة غير صحيحة',
      badPlPesel: 'قيمة Pl PESEL المدخلة غير صحيحة',
      badPlNip: 'قيمة Pl NIP المدخلة غير صحيحة',
      badPlRegon: 'قيمة Pl REGON المدخلة غير صحيحة',        
      badreCaptcha: 'من فضلك أكد أنك لست روبوتاً',
      passwordComplexityStart: 'كملة المرور تتكون على الأقل من ',
      passwordComplexitySeparator: ', ',
      passwordComplexityUppercaseInfo: ' حروف كبيرة',
      passwordComplexityLowercaseInfo: ' حروف صغيرة',
      passwordComplexitySpecialCharsInfo: ' رموز خاصة',
      passwordComplexityNumericCharsInfo: ' أرقام',
      passwordComplexityEnd: '.'
    };

  });

})(jQuery, window);


}));
