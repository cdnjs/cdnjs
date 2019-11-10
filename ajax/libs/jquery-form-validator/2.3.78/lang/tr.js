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
 * Turkish language package
 *
 * @website http://formvalidator.net/
 * @license MIT
 */
(function($, window) {

  'use strict';

  $.formUtils.registerLoadedModule('lang/tr');

  $(window).bind('validatorsLoaded', function() {

    $.formUtils.LANG = {
      errorTitle: 'Form gönderilemedi!',
      requiredField: 'Boş bırakılamaz',
      requiredFields: 'Gerekli tüm alanları cevaplamadınız',
      badTime: 'Geçersiz zaman girdiniz',
      badEmail: 'Geçersiz e-posta adresi girdiniz',
      badTelephone: 'Geçersiz telefon numarası girdiniz',
      badSecurityAnswer: 'Güvenlik sorusuna doğru cevap vermediniz',
      badDate: 'Geçersiz tarih girdiniz',
      lengthBadStart: 'Girilen değer ',
      lengthBadEnd: ' karakter olmalıdır',
      lengthTooLongStart: 'Girilen değer en fazla ',
      lengthTooShortStart: 'Girilen değer en az ',
      notConfirmed: 'Girilen değerler uyuşmuyor',
      badDomain: 'Geçersiz alan adı girdiniz',
      badUrl: 'Geçersiz bağlantı girdiniz',
      badCustomVal: 'Geçersiz değer girdiniz',
      andSpaces: ' ve boşluk ',
      badInt: 'Girilen değer sayı olamlıdır',
      badSecurityNumber: 'Geçersiz güvenlik kodu girdiniz',
      badUKVatAnswer: 'Geçersiz İngiltere KDV numarası girdiniz',
      badUKNin: 'Geçersiz İngiltere NIN numarası girdiniz',
      badUKUtr: 'Geçersiz İngiltere UTR numarası girdiniz',
      badStrength: 'Şifreniz yeterince güçlü değil',
      badNumberOfSelectedOptionsStart: 'En az ',
      badNumberOfSelectedOptionsEnd: ' cevap seçmeniz gerekiyor',
      badAlphaNumeric: 'Kabul edilen değer sadece alfanümerik karakterler ',
      badAlphaNumericExtra: ' ve ',
      wrongFileSize: 'Yüklemeye çalıştığınız dosya (en fazla %s) çok büyük',
      wrongFileType: 'Yalnızca %s türündeki dosyaları yükleyebilirsiniz',
      groupCheckedRangeStart: 'Lütfen ',
      groupCheckedTooFewStart: 'Lütfen en az ',
      groupCheckedTooManyStart: 'Lütfen en fazla ',
      groupCheckedEnd: ' adet seçiniz',
      badCreditCard: 'Geçersiz kredi kartı numarası girdiniz',
      badCVV: 'Geçersiz CVV numarası girdiniz',
      wrongFileDim: 'Hatalı resim yüklediniz çünkü',
      imageTooTall: 'resim daha uzun olamaz',
      imageTooWide: 'resim daha geniş olamaz',
      imageTooSmall: 'görüntü çok küçük',
      min: 'min',
      max: 'max',
      imageRatioNotAccepted: 'Kabul edilmeye görüntü oranı',
      badBrazilTelephoneAnswer: 'Geçersiz telefon numarası girdiniz',
      badBrazilCEPAnswer: 'Geçersiz Brezilya posta kodu girdiniz',
      badBrazilCPFAnswer: 'Geçersiz Brezilya mükellef kayıt kimliği girdiniz',
      badPlPesel: 'Geçersiz Polonya kişisel kimlik numarası girdiniz',
      badPlNip: 'Geçersiz DKV girdiniz',
      badPlRegon: 'Geçersiz Polonya ticari kimlik numarası girdiniz',
      badreCaptcha: 'Lütfen bot olmadığınızı doğrulayın',
      passwordComplexityStart: 'Şifreniz en az ',
      passwordComplexitySeparator: ', ',
      passwordComplexityUppercaseInfo: ' büyük harf',
      passwordComplexityLowercaseInfo: ' küçük harf',
      passwordComplexitySpecialCharsInfo: ' özel karakter',
      passwordComplexityNumericCharsInfo: ' sayısal karakter',
      passwordComplexityEnd: ' içermelidir'
    };

  });

})(jQuery, window);


}));
