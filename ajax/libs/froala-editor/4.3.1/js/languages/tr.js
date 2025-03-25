/*!
 * froala_editor v4.3.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2024 Froala Labs
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('froala-editor')) :
  typeof define === 'function' && define.amd ? define(['froala-editor'], factory) :
  (factory(global.FroalaEditor));
}(this, (function (FE) { 'use strict';

  FE = FE && FE.hasOwnProperty('default') ? FE['default'] : FE;

  /**
   * Turkish
   */
  FE.LANGUAGE['tr'] = {
    translation: {
      // Place holder
      'Type something': "Bir \u015Fey yaz\u0131n",
      // Basic formatting
      'Bold': "Kal\u0131n",
      'Italic': "\u0130talik",
      'Underline': "Alt\u0131 \xE7izili",
      'Strikethrough': "\xDCst\xFC \xE7izili",
      // Main buttons
      'Insert': 'Ekle',
      'Delete': 'Silmek',
      'Cancel': "\u0130ptal",
      'OK': 'Tamam',
      'Back': 'Geri',
      'Remove': "Kald\u0131r",
      'More': 'Daha',
      'Update': "G\xFCncelle\u015Ftirme",
      'Style': 'Stil',
      // Font
      'Font Family': "Yaz\u0131tipi Ailesi",
      'Font Size': "Yaz\u0131tipi B\xFCy\xFCkl\xFC\u011F\xFC",
      // Colors
      'Colors': 'Renkler',
      'Background': 'Arkaplan',
      'Text': 'Metin',
      'HEX Color': 'Altı renkli',
      // Paragraphs
      'Paragraph Format': "Bi\xE7imler",
      'Normal': 'Normal',
      'Code': 'Kod',
      'Heading 1': "Ba\u015Fl\u0131k 1",
      'Heading 2': "Ba\u015Fl\u0131k 2",
      'Heading 3': "Ba\u015Fl\u0131k 3",
      'Heading 4': "Ba\u015Fl\u0131k 4",
      // Style
      'Paragraph Style': 'Paragraf stili',
      'Inline Style': "\xC7izgide stili",
      // Alignment
      'Align': 'Hizalama',
      'Align Left': 'Sola hizala',
      'Align Center': 'Ortala',
      'Align Right': "Sa\u011Fa hizala",
      'Align Justify': "\u0130ki yana yasla",
      'None': "Hi\xE7biri",
      // Lists
      'Ordered List': "S\u0131ral\u0131 liste",
      'Unordered List': "S\u0131ras\u0131z liste",
      // Indent
      'Decrease Indent': 'Girintiyi azalt',
      'Increase Indent': "Girintiyi art\u0131r",
      // Links
      'Insert Link': "Ba\u011Flant\u0131 ekle",
      'Open in new tab': "Yeni sekmede a\xE7",
      'Open Link': "Linki a\xE7",
      'Edit Link': "D\xFCzenleme ba\u011Flant\u0131s\u0131",
      'Unlink': "Ba\u011Flant\u0131y\u0131 kald\u0131r",
      'Choose Link': "Ba\u011Flant\u0131y\u0131 se\xE7in",
      // Images
      'Insert Image': 'Resim ekle',
      'Upload Image': "Y\xFCkleme g\xF6r\xFCnt\xFCs\xFC",
      'By URL': "URL'ye g\xF6re",
      'Browse': "G\xF6zat",
      'Drop image': "B\u0131rak resim",
      'or click': "ya da t\u0131klay\u0131n",
      'Manage Images': "G\xF6r\xFCnt\xFCleri y\xF6netin",
      'Loading': "Y\xFCkleniyor",
      'Deleting': 'Silme',
      'Tags': 'Etiketler',
      'Are you sure? Image will be deleted.': 'Emin misin? Resim silinecektir.',
      'Replace': "De\u011Fi\u015Ftirmek",
      'Uploading': "Y\xFCkleme",
      'Loading image': "Y\xFCkleme g\xF6r\xFCnt\xFCs\xFC",
      'Display': "G\xF6stermek",
      'Inline': "\xC7izgide",
      'Break Text': "K\u0131r\u0131lma metni",
      'Alternative Text': 'Alternatif metin',
      'Change Size': "De\u011Fi\u015Fim boyutu",
      'Width': "Geni\u015Flik",
      'Height': "Y\xFCkseklik",
      'Something went wrong. Please try again.': "Bir \u015Feyler yanl\u0131\u015F gitti. L\xFCtfen tekrar deneyin.",
      'Image Caption': 'Resim yazısı',
      'Advanced Edit': 'Ileri düzey düzenleme',
      // Video
      'Insert Video': 'Video ekle',
      'Embedded Code': "G\xF6m\xFCl\xFC kod",
      'Paste in a video URL': 'Bir video URL\'sine yapıştırın',
      'Drop video': 'Video bırak',
      'Your browser does not support HTML5 video.': 'Tarayıcınız html5 videoyu desteklemez.',
      'Upload Video': 'Video yükle',
      // Tables
      'Insert Table': 'Tablo ekle',
      'Table Header': "Tablo \xFCstbilgisi",
      'Remove Table': "Tablo kald\u0131rma",
      'Table Style': 'Tablo stili',
      'Horizontal Align': 'Yatay hizalama',
      'Row': "Sat\u0131r",
      'Insert row above': "\xD6ncesine yeni sat\u0131r ekle",
      'Insert row below': "Sonras\u0131na yeni sat\u0131r ekle",
      'Delete row': "Sat\u0131r\u0131 sil",
      'Column': "S\xFCtun",
      'Insert column before': "\xD6ncesine yeni s\xFCtun ekle",
      'Insert column after': "Sonras\u0131na yeni s\xFCtun ekle",
      'Delete column': "S\xFCtunu sil",
      'Cell': "H\xFCcre",
      'Merge cells': "H\xFCcreleri birle\u015Ftir",
      'Horizontal split': "Yatay b\xF6l\xFCnm\xFC\u015F",
      'Vertical split': "Dikey  b\xF6l\xFCnm\xFC\u015F",
      'Cell Background': "H\xFCcre arka plan\u0131",
      'Vertical Align': 'Dikey hizalama',
      'Top': "\xDCst",
      'Middle': 'Orta',
      'Bottom': 'Alt',
      'Align Top': "\xDCst hizalama",
      'Align Middle': 'Orta hizalama',
      'Align Bottom': 'Dibe hizalama',
      'Cell Style': "H\xFCcre stili",
      // Files
      'Upload File': "Dosya Y\xFCkle",
      'Drop file': "B\u0131rak dosya",
      // Emoticons
      'Emoticons': "\u0130fadeler",
      'Grinning face': "S\u0131r\u0131tan y\xFCz",
      'Grinning face with smiling eyes': "G\xFClen g\xF6zlerle y\xFCz s\u0131r\u0131tarak",
      'Face with tears of joy': "Sevin\xE7 g\xF6zya\u015Flar\u0131yla Y\xFCz",
      'Smiling face with open mouth': "A\xE7\u0131k a\u011Fz\u0131 ile g\xFCl\xFCmseyen y\xFCz\xFC",
      'Smiling face with open mouth and smiling eyes': "A\xE7\u0131k a\u011Fz\u0131 ve g\xFCl\xFCmseyen g\xF6zlerle g\xFCler y\xFCz",
      'Smiling face with open mouth and cold sweat': "A\xE7\u0131k a\u011Fz\u0131 ve so\u011Fuk ter ile g\xFClen y\xFCz\xFC",
      'Smiling face with open mouth and tightly-closed eyes': "A\xE7\u0131k a\u011Fz\u0131 s\u0131k\u0131ca kapal\u0131 g\xF6zlerle g\xFClen y\xFCz\xFC",
      'Smiling face with halo': "Halo ile y\xFCz g\xFClen",
      'Smiling face with horns': "Boynuzlar\u0131 ile g\xFCler y\xFCz",
      'Winking face': "G\xF6z a\xE7\u0131p kapay\u0131ncaya y\xFCz\xFC",
      'Smiling face with smiling eyes': "G\xFClen g\xF6zlerle g\xFCler Y\xFCz",
      'Face savoring delicious food': "Lezzetli yemekler tad\u0131n\u0131 Y\xFCz",
      'Relieved face': "Rahatlad\u0131m y\xFCz\xFC",
      'Smiling face with heart-shaped eyes': "Kalp \u015Feklinde g\xF6zlerle g\xFCler y\xFCz",
      'Smiling face with sunglasses': "Kalp \u015Feklinde g\xF6zlerle g\xFCler y\xFCz",
      'Smirking face': "S\u0131r\u0131tan y\xFCz",
      'Neutral face': "N\xF6tr y\xFCz",
      'Expressionless face': "Ifadesiz y\xFCz\xFC",
      'Unamused face': "Kay\u0131ts\u0131z y\xFCz\xFC",
      'Face with cold sweat': "So\u011Fuk terler Y\xFCz",
      'Pensive face': "dalg\u0131n bir y\xFCz",
      'Confused face': "\u015Fa\u015Fk\u0131n bir y\xFCz",
      'Confounded face': "Ele\u015Ftirilmi\u015Ftir y\xFCz\xFC",
      'Kissing face': "\xF6p\xFC\u015Fme y\xFCz\xFC",
      'Face throwing a kiss': "Bir \xF6p\xFCc\xFCk atma Y\xFCz",
      'Kissing face with smiling eyes': "G\xFClen g\xF6zlerle y\xFCz \xF6p\xFC\u015Fme",
      'Kissing face with closed eyes': "Kapal\u0131 g\xF6zlerle \xF6p\xF6\u015Fme y\xFCz",
      'Face with stuck out tongue': "Dilini y\xFCz ile s\u0131k\u0131\u015Fm\u0131\u015F",
      'Face with stuck out tongue and winking eye': "\u015Ea\u015F\u0131r\u0131p kalm\u0131\u015F d\u0131\u015Far\u0131 dil ve g\xF6z k\u0131rpan y\xFCz",
      'Face with stuck out tongue and tightly-closed eyes': "Y\xFCz ile dil ve s\u0131k\u0131ca kapal\u0131 g\xF6zleri s\u0131k\u0131\u015Fm\u0131\u015F",
      'Disappointed face': "Hayal k\u0131r\u0131kl\u0131\u011F\u0131na y\xFCz\xFC",
      'Worried face': "Endi\u015Feli bir y\xFCz",
      'Angry face': "K\u0131zg\u0131n y\xFCz",
      'Pouting face': "Somurtarak y\xFCz\xFC",
      'Crying face': "A\u011Flayan y\xFCz",
      'Persevering face': "Azmeden y\xFCz\xFC",
      'Face with look of triumph': "Zafer bak\u0131\u015Fla Y\xFCz",
      'Disappointed but relieved face': "Hayal k\u0131r\u0131kl\u0131\u011F\u0131 ama rahatlad\u0131m y\xFCz",
      'Frowning face with open mouth': "A\xE7\u0131k a\u011Fz\u0131 ile \xE7at\u0131k y\xFCz\xFC",
      'Anguished face': "Kederli y\xFCz",
      'Fearful face': "Korkulu y\xFCz\xFC",
      'Weary face': "Yorgun y\xFCz\xFC",
      'Sleepy face': "Uykulu y\xFCz\xFC",
      'Tired face': "Yorgun y\xFCz\xFC",
      'Grimacing face': "Y\xFCz\xFCn\xFC buru\u015Fturarak y\xFCz\xFC",
      'Loudly crying face': "Y\xFCksek sesle y\xFCz\xFC a\u011Fl\u0131yor",
      'Face with open mouth': "A\xE7\u0131k a\u011Fz\u0131 ile Y\xFCz",
      'Hushed face': "Dingin y\xFCz\xFC",
      'Face with open mouth and cold sweat': "A\xE7\u0131k a\u011Fz\u0131 ve so\u011Fuk ter ile Y\xFCz",
      'Face screaming in fear': "Korku i\xE7inde \xE7\u0131\u011Fl\u0131k Y\xFCz",
      'Astonished face': "\u015Fa\u015Fk\u0131n bir y\xFCz",
      'Flushed face': "K\u0131zarm\u0131\u015F y\xFCz\xFC",
      'Sleeping face': "Uyuyan y\xFCz\xFC",
      'Dizzy face': "Ba\u015F\u0131m d\xF6nd\xFC y\xFCz",
      'Face without mouth': "A\u011F\u0131z olmadan Y\xFCz",
      'Face with medical mask': "T\u0131bbi maske ile y\xFCz",
      // Line breaker
      'Break': "K\u0131r\u0131lma",
      // Math
      'Subscript': 'Alt simge',
      'Superscript': "\xDCst simge",
      // Full screen
      'Fullscreen': 'Tam ekran',
      // Horizontal line
      'Insert Horizontal Line': "Yatay \xE7izgi ekleme",
      // Clear formatting
      'Clear Formatting': "Bi\xE7imlendirme kald\u0131r",
      // Save
      'Save': 'Kayıt etmek',
      // Undo, redo
      'Undo': 'Geri Al',
      'Redo': 'Yinele',
      // Select all
      'Select All': "T\xFCm\xFCn\xFC se\xE7",
      // Code view
      'Code View': "Kod g\xF6r\xFCn\xFCm\xFC",
      // Quote
      'Quote': "Al\u0131nt\u0131",
      'Increase': "Art\u0131rmak",
      'Decrease': "Azal\u0131\u015F",
      // Quick Insert
      'Quick Insert': "H\u0131zl\u0131 insert",
      // Spcial Characters
      'Special Characters': 'Özel karakterler',
      'Latin': 'Latince',
      'Greek': 'Yunan',
      'Cyrillic': 'Kiril',
      'Punctuation': 'Noktalama',
      'Currency': 'Para birimi',
      'Arrows': 'Oklar',
      'Math': 'Matematik',
      'Misc': 'Misc',
      // Print.
      'Print': 'Baskı',
      // Spell Checker.
      'Spell Checker': 'Yazım denetleyicisi',
      // Help
      'Help': 'Yardım et',
      'Shortcuts': 'Kısayollar',
      'Inline Editor': 'Satır içi düzenleyici',
      'Show the editor': 'Editörü gösterin',
      'Common actions': 'Ortak eylemler',
      'Copy': 'Kopya',
      'Cut': 'Kesim',
      'Paste': 'Yapıştırmak',
      'Basic Formatting': 'Temel biçimlendirme',
      'Increase quote level': 'Teklif seviyesini yükselt',
      'Decrease quote level': 'Teklif seviyesini azalt',
      'Image / Video': 'Resim / video',
      'Resize larger': 'Daha büyük yeniden boyutlandır',
      'Resize smaller': 'Daha küçük boyuta getir',
      'Table': 'Tablo',
      'Select table cell': 'Tablo hücresi seç',
      'Extend selection one cell': 'Seçimi bir hücre genişlet',
      'Extend selection one row': 'Seçimi bir sıra genişlet',
      'Navigation': 'Navigasyon',
      'Focus popup / toolbar': 'Odaklanma açılır penceresi / araç çubuğu',
      'Return focus to previous position': 'Odaklamaya önceki konumuna geri dönün',
      // Embed.ly
      'Embed URL': 'URL göm',
      'Paste in a URL to embed': 'Yerleştirmek için bir URL\'ye yapıştırın',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'Yapıştırılan içerik bir Microsoft Word belgesinden geliyor. Biçimi saklamaya mı yoksa temizlemeyi mi istiyor musun?',
      'Keep': 'Tutmak',
      'Clean': 'Temiz',
      'Word Paste Detected': 'Kelime yapıştırması algılandı',
      // Character Counter
      'Characters': 'Karakterler',
      // More Buttons
      'More Text': 'daha fazla Metin',
      'More Paragraph': 'daha fazla Paragraf',
      'More Rich': 'daha fazla Zengin',
      'More Misc': 'daha fazla Çeşitli'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=tr.js.map
