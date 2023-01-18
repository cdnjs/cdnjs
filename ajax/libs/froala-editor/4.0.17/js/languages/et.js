/*!
 * froala_editor v4.0.17 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2023 Froala Labs
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('froala-editor')) :
  typeof define === 'function' && define.amd ? define(['froala-editor'], factory) :
  (factory(global.FroalaEditor));
}(this, (function (FE) { 'use strict';

  FE = FE && FE.hasOwnProperty('default') ? FE['default'] : FE;

  /**
   * Estonian
   */
  FE.LANGUAGE['et'] = {
    translation: {
      // Place holder
      'Type something': 'Kirjuta midagi',
      // Basic formatting
      'Bold': 'Rasvane',
      'Italic': 'Kursiiv',
      'Underline': 'Allajoonitud',
      'Strikethrough': "L\xE4bikriipsutatud",
      // Main buttons
      'Insert': 'Lisa',
      'Delete': 'Kustuta',
      'Cancel': "T\xFChista",
      'OK': 'OK',
      'Back': 'Tagasi',
      'Remove': 'Eemaldama',
      'More': 'Rohkem',
      'Update': 'Ajakohastama',
      'Style': 'Stiil',
      // Font
      'Font Family': 'Fondi perekond',
      'Font Size': 'Fondi suurus',
      // Colors
      'Colors': "V\xE4rvid",
      'Background': 'Taust',
      'Text': 'Tekst',
      'HEX Color': 'Hex värvi',
      // Paragraphs
      'Paragraph Format': 'Paragrahv formaat',
      'Normal': 'Normaalne',
      'Code': 'Kood',
      'Heading 1': "P\xE4is 1",
      'Heading 2': "P\xE4is 2",
      'Heading 3': "P\xE4is 3",
      'Heading 4': "P\xE4is 4",
      // Style
      'Paragraph Style': 'Paragrahv stiil',
      'Inline Style': "J\xE4rjekorras stiil",
      // Alignment
      'Align': 'Joonda',
      'Align Left': 'Joonda vasakule',
      'Align Center': 'Joonda keskele',
      'Align Right': 'Joonda paremale',
      'Align Justify': "R\xF6\xF6pjoondus",
      'None': "Mitte \xFCkski",
      // Lists
      'Ordered List': 'Tellitud nimekirja',
      'Unordered List': 'Tavalise nimekirja',
      // Indent
      'Decrease Indent': "V\xE4henemine taane",
      'Increase Indent': 'Suurenda taanet',
      // Links
      'Insert Link': 'Lisa link',
      'Open in new tab': 'Ava uues sakis',
      'Open Link': 'Avatud link',
      'Edit Link': 'Muuda link',
      'Unlink': 'Eemalda link',
      'Choose Link': 'Vali link',
      // Images
      'Insert Image': 'Lisa pilt',
      'Upload Image': 'Laadige pilt',
      'By URL': 'Poolt URL',
      'Browse': 'sirvida',
      'Drop image': 'Aseta pilt',
      'or click': "v\xF5i kliki",
      'Manage Images': 'Halda pilte',
      'Loading': 'Laadimine',
      'Deleting': 'Kustutamine',
      'Tags': 'Sildid',
      'Are you sure? Image will be deleted.': 'Oled sa kindel? Pilt kustutatakse.',
      'Replace': 'Asendama',
      'Uploading': 'Laadimise pilti',
      'Loading image': 'Laadimise pilti',
      'Display': 'Kuvama',
      'Inline': "J\xE4rjekorras",
      'Break Text': 'Murdma teksti',
      'Alternative Text': 'Asendusliikme teksti',
      'Change Size': 'Muuda suurust',
      'Width': 'Laius',
      'Height': "K\xF5rgus",
      'Something went wrong. Please try again.': "Midagi l\xE4ks valesti. Palun proovi uuesti.",
      'Image Caption': 'Pildi pealkiri',
      'Advanced Edit': 'Täiustatud redigeerimine',
      // Video
      'Insert Video': 'Lisa video',
      'Embedded Code': 'Varjatud koodi',
      'Paste in a video URL': 'Kleebi video URL-i',
      'Drop video': 'Tilk videot',
      'Your browser does not support HTML5 video.': 'Teie brauser ei toeta html5-videot.',
      'Upload Video': 'Video üleslaadimine',
      // Tables
      'Insert Table': 'Sisesta tabel',
      'Table Header': "Tabel p\xE4ise kaudu",
      'Remove Table': 'Eemalda tabel',
      'Table Style': 'Tabel stiili',
      'Horizontal Align': 'Horisontaalne joonda',
      'Row': 'Rida',
      'Insert row above': "Sisesta rida \xFCles",
      'Insert row below': 'Sisesta rida alla',
      'Delete row': 'Kustuta rida',
      'Column': 'Veerg',
      'Insert column before': 'Sisesta veerg ette',
      'Insert column after': "Sisesta veerg j\xE4rele",
      'Delete column': 'Kustuta veerg',
      'Cell': 'Lahter',
      'Merge cells': "\xFChenda lahtrid",
      'Horizontal split': 'Poolita horisontaalselt',
      'Vertical split': 'Poolita vertikaalselt',
      'Cell Background': 'Lahter tausta',
      'Vertical Align': 'Vertikaalne joonda',
      'Top': "\xFClemine",
      'Middle': 'Keskmine',
      'Bottom': "P\xF5hi",
      'Align Top': "Joonda \xFClemine",
      'Align Middle': 'Joonda keskmine',
      'Align Bottom': "Joonda P\xF5hi",
      'Cell Style': 'Lahter stiili',
      // Files
      'Upload File': "Lae fail \xFCles",
      'Drop file': 'Aseta fail',
      // Emoticons
      'Emoticons': 'Emotikonid',
      'Grinning face': "Irvitas n\xE4kku",
      'Grinning face with smiling eyes': "Irvitas n\xE4kku naeratavad silmad",
      'Face with tears of joy': "N\xE4gu r\xF5\xF5mupisaratega",
      'Smiling face with open mouth': "Naeratav n\xE4gu avatud suuga",
      'Smiling face with open mouth and smiling eyes': "Naeratav n\xE4gu avatud suu ja naeratavad silmad",
      'Smiling face with open mouth and cold sweat': "Naeratav n\xE4gu avatud suu ja k\xFClm higi",
      'Smiling face with open mouth and tightly-closed eyes': "Naeratav n\xE4gu avatud suu ja tihedalt suletud silmad",
      'Smiling face with halo': "Naeratav n\xE4gu halo",
      'Smiling face with horns': "Naeratav n\xE4gu sarved",
      'Winking face': "Pilgutab n\xE4gu",
      'Smiling face with smiling eyes': "Naeratav n\xE4gu naeratab silmad",
      'Face savoring delicious food': "N\xE4gu nautides maitsvat toitu",
      'Relieved face': "P\xE4\xE4stetud n\xE4gu",
      'Smiling face with heart-shaped eyes': "Naeratav n\xE4gu s\xFCdajas silmad",
      'Smiling face with sunglasses': "Naeratav n\xE4gu p\xE4ikeseprillid",
      'Smirking face': "Muigama n\xE4gu ",
      'Neutral face': "Neutraalne n\xE4gu",
      'Expressionless face': "Ilmetu n\xE4gu",
      'Unamused face': "Morn n\xE4gu",
      'Face with cold sweat': "N\xE4gu k\xFClma higiga",
      'Pensive face': "M\xF5tlik n\xE4gu",
      'Confused face': "Segaduses n\xE4gu",
      'Confounded face': "Segas n\xE4gu",
      'Kissing face': "Suudlevad n\xE4gu",
      'Face throwing a kiss': "N\xE4gu viskamine suudlus",
      'Kissing face with smiling eyes': "Suudlevad n\xE4gu naeratab silmad",
      'Kissing face with closed eyes': "Suudlevad n\xE4gu, silmad kinni",
      'Face with stuck out tongue': "N\xE4gu ummikus v\xE4lja keele",
      'Face with stuck out tongue and winking eye': "N\xE4gu ummikus v\xE4lja keele ja silma pilgutav silma",
      'Face with stuck out tongue and tightly-closed eyes': "N\xE4gu ummikus v\xE4lja keele ja silmad tihedalt suletuna",
      'Disappointed face': "Pettunud n\xE4gu",
      'Worried face': "Mures n\xE4gu",
      'Angry face': "Vihane n\xE4gu",
      'Pouting face': "Tursik n\xE4gu",
      'Crying face': "Nutt n\xE4gu",
      'Persevering face': "P\xFCsiv n\xE4gu",
      'Face with look of triumph': "N\xE4gu ilme triumf",
      'Disappointed but relieved face': "Pettunud kuid vabastati n\xE4gu",
      'Frowning face with open mouth': "Kulmukortsutav n\xE4gu avatud suuga",
      'Anguished face': "Ahastavad n\xE4gu",
      'Fearful face': "Hirmunult n\xE4gu",
      'Weary face': 'Grimasse',
      'Sleepy face': "Unine n\xE4gu",
      'Tired face': "V\xE4sinud n\xE4gu",
      'Grimacing face': "Grimassitavaks n\xE4gu",
      'Loudly crying face': "Valjusti nutma n\xE4gu",
      'Face with open mouth': "N\xE4gu avatud suuga",
      'Hushed face': "Raskel n\xE4gu",
      'Face with open mouth and cold sweat': "N\xE4gu avatud suu ja k\xFClm higi",
      'Face screaming in fear': "N\xE4gu karjuvad hirm",
      'Astonished face': "Lummatud n\xE4gu",
      'Flushed face': "Punetav n\xE4gu",
      'Sleeping face': "Uinuv n\xE4gu",
      'Dizzy face': "Uimane n\xFCgu",
      'Face without mouth': "N\xE4gu ilma suu",
      'Face with medical mask': "N\xE4gu meditsiinilise mask",
      // Line breaker
      'Break': 'Murdma',
      // Math
      'Subscript': 'Allindeks',
      'Superscript': "\xDClaindeks",
      // Full screen
      'Fullscreen': "T\xE4isekraanil",
      // Horizontal line
      'Insert Horizontal Line': 'Sisesta horisontaalne joon',
      // Clear formatting
      'Clear Formatting': 'Eemalda formaatimine',
      // Save
      'Save': 'Salvesta',
      // Undo, redo
      'Undo': "V\xF5ta tagasi",
      'Redo': 'Tee uuesti',
      // Select all
      'Select All': "Vali k\xF5ik",
      // Code view
      'Code View': 'Koodi vaadata',
      // Quote
      'Quote': 'Tsitaat',
      'Increase': 'Suurendama',
      'Decrease': "V\xE4henda",
      // Quick Insert
      'Quick Insert': 'Kiire sisestada',
      // Spcial Characters
      'Special Characters': 'Erimärgid',
      'Latin': 'Latin',
      'Greek': 'Kreeka keel',
      'Cyrillic': 'Kirillitsa',
      'Punctuation': 'Kirjavahemärgid',
      'Currency': 'Valuuta',
      'Arrows': 'Nooled',
      'Math': 'Matemaatika',
      'Misc': 'Misc',
      // Print.
      'Print': 'Printige',
      // Spell Checker.
      'Spell Checker': 'Õigekirja kontrollija',
      // Help
      'Help': 'Abi',
      'Shortcuts': 'Otseteed',
      'Inline Editor': 'Sisemine redaktor',
      'Show the editor': 'Näita redaktorit',
      'Common actions': 'Ühised meetmed',
      'Copy': 'Koopia',
      'Cut': 'Lõigake',
      'Paste': 'Kleepige',
      'Basic Formatting': 'Põhiline vormindamine',
      'Increase quote level': 'Suurendada tsiteerimise taset',
      'Decrease quote level': 'Langetada tsiteerimise tase',
      'Image / Video': 'Pilt / video',
      'Resize larger': 'Suuruse muutmine suurem',
      'Resize smaller': 'Väiksema suuruse muutmine',
      'Table': 'Laud',
      'Select table cell': 'Vali tabeli lahtrisse',
      'Extend selection one cell': 'Laiendage valikut üks lahtrisse',
      'Extend selection one row': 'Laiendage valikut ühe reana',
      'Navigation': 'Navigeerimine',
      'Focus popup / toolbar': 'Fookuse hüpikakna / tööriistariba',
      'Return focus to previous position': 'Tagasi pöörata tähelepanu eelmisele positsioonile',
      // Embed.ly
      'Embed URL': 'Embed url',
      'Paste in a URL to embed': 'Kleepige URL-i sisestamiseks',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'Kleepitud sisu pärineb Microsoft Wordi dokumendist. kas soovite vormi säilitada või puhastada?',
      'Keep': 'Pidage seda',
      'Clean': 'Puhas',
      'Word Paste Detected': 'Avastatud sõna pasta',
      // Character Counter 
      'Characters': 'Tähemärgid',
      // More Buttons
      'More Text': 'Rohkem teksti',
      'More Paragraph': 'Rohkem lõiku',
      'More Rich': 'Rohkem Rikas',
      'More Misc': 'Rohkem Misc'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=et.js.map
