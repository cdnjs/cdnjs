/*! @preserve
 * bootbox.locales.js
 * version: 6.0.4
 * author: Nick Payne <nick@kurai.co.uk>
 * license: MIT
 * http://bootboxjs.com/
 */
(function(global, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['bootbox'], factory);
  } else if (typeof module === 'object' && module.exports) {
    factory(require('./bootbox'));
  } else {
    factory(global.bootbox);
  }
}(this, function(bootbox) {
  'use strict';

  // locale : Arabic
  // author : Emad Omar
  bootbox.addLocale('ar', {
    OK: 'موافق',
    CANCEL: 'الغاء',
    CONFIRM: 'تأكيد'
  });
  // locale : Azerbaijani
  // author : Valentin Belousov
  bootbox.addLocale('az', {
    OK: 'OK',
    CANCEL: 'İmtina et',
    CONFIRM: 'Təsdiq et'
  });
  // locale : Bulgarian
  // author :  mraiur
  bootbox.addLocale('bg-BG', {
    OK: 'Ок',
    CANCEL: 'Отказ',
    CONFIRM: 'Потвърждавам'
  });
  // locale : Czech
  // author : Lukáš Fryč
  bootbox.addLocale('cs', {
    OK: 'OK',
    CANCEL: 'Zrušit',
    CONFIRM: 'Potvrdit'
  });
  // locale : Danish
  // author : Frederik Alkærsig
  bootbox.addLocale('da', {
    OK: 'OK',
    CANCEL: 'Annuller',
    CONFIRM: 'Accepter'
  });
  // locale : German
  // author : Nick Payne
  bootbox.addLocale('de', {
    OK: 'OK',
    CANCEL: 'Abbrechen',
    CONFIRM: 'Akzeptieren'
  });
  // locale : Greek
  // author : Tolis Emmanouilidis
  bootbox.addLocale('el', {
    OK: 'Εντάξει',
    CANCEL: 'Ακύρωση',
    CONFIRM: 'Επιβεβαίωση'
  });
  // locale : English
  // author : Nick Payne
  bootbox.addLocale('en', {
    OK: 'OK',
    CANCEL: 'Cancel',
    CONFIRM: 'OK'
  });
  // locale : Spanish
  // author : Ian Leckey
  bootbox.addLocale('es', {
    OK: 'OK',
    CANCEL: 'Cancelar',
    CONFIRM: 'Aceptar'
  });
  // locale : Estonian
  // author : Pavel Krõlov
  bootbox.addLocale('et', {
    OK: 'OK',
    CANCEL: 'Katkesta',
    CONFIRM: 'OK'
  });
  // locale : Basque
  // author : Iker Ibarguren
  bootbox.addLocale('eu', {
    OK: 'OK',
    CANCEL: 'Ezeztatu',
    CONFIRM: 'Onartu'
  });
  // locale : Persian
  // author : Touhid Arastu
  bootbox.addLocale('fa', {
    OK: 'قبول',
    CANCEL: 'لغو',
    CONFIRM: 'تایید'
  });
  // locale : Finnish
  // author : Nick Payne
  bootbox.addLocale('fi', {
    OK: 'OK',
    CANCEL: 'Peruuta',
    CONFIRM: 'OK'
  });
  // locale : French
  // author : Nick Payne, Sebastien Andary
  bootbox.addLocale('fr', {
    OK: 'OK',
    CANCEL: 'Annuler',
    CONFIRM: 'Confirmer'
  });
  // locale : Hebrew
  // author : Chen Alon
  bootbox.addLocale('he', {
    OK: 'אישור',
    CANCEL: 'ביטול',
    CONFIRM: 'אישור'
  });
  // locale : Croatian
  // author : Mario Bašić
  bootbox.addLocale('hr', {
    OK: 'OK',
    CANCEL: 'Odustani',
    CONFIRM: 'Potvrdi'
  });
  // locale : Hungarian
  // author : Márk Sági-Kazár
  bootbox.addLocale('hu', {
    OK: 'OK',
    CANCEL: 'Mégsem',
    CONFIRM: 'Megerősít'
  });
  // locale : Indonesian
  // author : Budi Irawan
  bootbox.addLocale('id', {
    OK: 'OK',
    CANCEL: 'Batal',
    CONFIRM: 'OK'
  });
  // locale : Italian
  // author : Mauro
  bootbox.addLocale('it', {
    OK: 'OK',
    CANCEL: 'Annulla',
    CONFIRM: 'Conferma'
  });
  // locale : Japanese
  // author : ms183
  bootbox.addLocale('ja', {
    OK: 'OK',
    CANCEL: 'キャンセル',
    CONFIRM: 'OK'
  });

  // locale : Georgian
  // author : Avtandil Kikabidze aka LONGMAN (@akalongman)
  bootbox.addLocale('ka', {
    OK: 'OK',
    CANCEL: 'გაუქმება',
    CONFIRM: 'დადასტურება'
  });
  // locale : Korean
  // author : rigning
  bootbox.addLocale('ko', {
    OK: 'OK',
    CANCEL: '취소',
    CONFIRM: '확인'
  });
  // locale : Lithuanian
  // author : Tomas
  bootbox.addLocale('lt', {
    OK: 'Gerai',
    CANCEL: 'Atšaukti',
    CONFIRM: 'Patvirtinti'
  });
  // locale : Latvian
  // author : Dmitry Bogatykh, Lauris BH
  bootbox.addLocale('lv', {
    OK: 'Labi',
    CANCEL: 'Atcelt',
    CONFIRM: 'Apstiprināt'
  });
  // locale : Dutch
  // author : Bas ter Vrugt
  bootbox.addLocale('nl', {
    OK: 'OK',
    CANCEL: 'Annuleren',
    CONFIRM: 'Accepteren'
  });
  // locale : Norwegian
  // author : Nils Magnus Englund
  bootbox.addLocale('no', {
    OK: 'OK',
    CANCEL: 'Avbryt',
    CONFIRM: 'OK'
  });
  // locale : Polish
  // author : Szczepan Cieślik
  bootbox.addLocale('pl', {
    OK: 'OK',
    CANCEL: 'Anuluj',
    CONFIRM: 'Potwierdź'
  });
  // locale : Portuguese (Brasil)
  // author : Nick Payne
  bootbox.addLocale('pt-BR', {
    OK: 'OK',
    CANCEL: 'Cancelar',
    CONFIRM: 'Sim'
  });
  // locale : Portuguese
  // author : Cláudio Medina
  bootbox.addLocale('pt', {
    OK: 'OK',
    CANCEL: 'Cancelar',
    CONFIRM: 'Confirmar'
  });
  // locale : Russian
  // author : ionian-wind
  bootbox.addLocale('ru', {
    OK: 'OK',
    CANCEL: 'Отмена',
    CONFIRM: 'Применить'
  });
  // locale : Slovak
  // author : Stano Paška
  bootbox.addLocale('sk', {
    OK: 'OK',
    CANCEL: 'Zrušiť',
    CONFIRM: 'Potvrdiť'
  });
  // locale : Slovenian
  // author : @metalcamp
  bootbox.addLocale('sl', {
    OK: 'OK',
    CANCEL: 'Prekliči',
    CONFIRM: 'Potrdi'
  });
  // locale : Albanian
  // author : Knut Hühne
  bootbox.addLocale('sq', {
    OK: 'OK',
    CANCEL: 'Anulo',
    CONFIRM: 'Prano'
  });
  // locale : Swedish
  // author : Mattias Reichel
  bootbox.addLocale('sv', {
    OK: 'OK',
    CANCEL: 'Avbryt',
    CONFIRM: 'OK'
  });
  // locale : Swahili
  // author : Timothy Anyona
  bootbox.addLocale('sw', {
    OK: 'Sawa',
    CANCEL: 'Ghairi',
    CONFIRM: 'Thibitisha'
  });
  // locale : Tamil
  // author : Kolappan Nathan
  bootbox.addLocale('ta', {
    OK: 'சரி',
    CANCEL: 'ரத்து செய்',
    CONFIRM: 'உறுதி செய்'
  });
  // locale : Thai
  // author : Ishmael๛
  bootbox.addLocale('th', {
    OK: 'ตกลง',
    CANCEL: 'ยกเลิก',
    CONFIRM: 'ยืนยัน'
  });
  // locale : Turkish
  // author : Enes Karaca
  bootbox.addLocale('tr', {
    OK: 'Tamam',
    CANCEL: 'İptal',
    CONFIRM: 'Onayla'
  });
  // locale : Ukrainian
  // author : OlehBoiko
  bootbox.addLocale('uk', {
    OK: 'OK',
    CANCEL: 'Відміна',
    CONFIRM: 'Прийняти'
  });
  // locale : Vietnamese
  // author :  Anh Tu Nguyen
  bootbox.addLocale('vi', {
    OK: 'OK',
    CANCEL: 'Hủy bỏ',
    CONFIRM: 'Xác nhận'
  });
  // locale : Chinese (China / People's Republic of China)
  // author : Nick Payne
  bootbox.addLocale('zh-CN', {
    OK: 'OK',
    CANCEL: '取消',
    CONFIRM: '确认'
  });
  // locale : Chinese (Taiwan / Republic of China)
  // author : Nick Payne
  bootbox.addLocale('zh-TW', {
    OK: 'OK',
    CANCEL: '取消',
    CONFIRM: '確認'
  });

}));
