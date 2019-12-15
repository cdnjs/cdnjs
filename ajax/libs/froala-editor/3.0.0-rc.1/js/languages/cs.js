/*!
 * froala_editor v3.0.0-rc.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2019 Froala Labs
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('froala-editor')) :
  typeof define === 'function' && define.amd ? define(['froala-editor'], factory) :
  (factory(global.FroalaEditor));
}(this, (function (FE) { 'use strict';

  FE = FE && FE.hasOwnProperty('default') ? FE['default'] : FE;

  /**
   * Czech
   */
  FE.LANGUAGE['cs'] = {
    translation: {
      // Place holder
      'Type something': "Napi\u0161te n\u011Bco",
      // Basic formatting
      'Bold': "Tu\u010Dn\xE9",
      'Italic': "Kurz\xEDva",
      'Underline': "Podtr\u017Een\xE9",
      'Strikethrough': "P\u0159e\u0161krtnut\xE9",
      // Main buttons
      'Insert': "Vlo\u017Eit",
      'Delete': 'Vymazat',
      'Cancel': "Zru\u0161it",
      'OK': 'OK',
      'Back': "Zp\u011Bt",
      'Remove': 'Odstranit',
      'More': "V\xEDce",
      'Update': 'Aktualizovat',
      'Style': 'Styl',
      // Font
      'Font Family': "Typ p\xEDsma",
      'Font Size': "Velikost p\xEDsma",
      // Colors
      'Colors': 'Barvy',
      'Background': "Pozad\xED",
      'Text': "P\xEDsmo",
      'HEX Color': 'Hex Barvy',
      // Paragraphs
      'Paragraph Format': "Form\xE1t odstavec",
      'Normal': "Norm\xE1ln\xED",
      'Code': "K\xF3d",
      'Heading 1': 'Nadpis 1',
      'Heading 2': 'Nadpis 2',
      'Heading 3': 'Nadpis 3',
      'Heading 4': 'Nadpis 4',
      // Style
      'Paragraph Style': 'Odstavec styl',
      'Inline Style': 'Inline styl',
      // Alignment
      'Align': "Zarovn\xE1n\xED",
      'Align Left': 'Zarovnat vlevo',
      'Align Center': "Zarovnat na st\u0159ed",
      'Align Right': 'Zarovnat vpravo',
      'Align Justify': 'Zarovnat do bloku',
      'None': 'Nikdo',
      // Lists
      'Ordered List': "\u010C\xEDslovan\xFD seznam",
      'Unordered List': "Ne\u010D\xEDslovan\xFD seznam",
      // Indent
      'Decrease Indent': "Zmen\u0161it odsazen\xED",
      'Increase Indent': "Zv\u011Bt\u0161it odsazen\xED",
      // Links
      'Insert Link': "Vlo\u017Eit odkaz",
      'Open in new tab': "Otev\u0159\xEDt v nov\xE9 z\xE1lo\u017Ece",
      'Open Link': "Otev\u0159\xEDt odkaz",
      'Edit Link': 'Upravit odkaz',
      'Unlink': 'Odstranit odkaz',
      'Choose Link': 'Zvolte odkaz',
      // Images
      'Insert Image': "Vlo\u017Eit obr\xE1zek",
      'Upload Image': "Nahr\xE1t obr\xE1zek",
      'By URL': 'Podle URL',
      'Browse': "Proch\xE1zet",
      'Drop image': "P\u0159et\xE1hn\u011Bte sem obr\xE1zek",
      'or click': "nebo zde klepn\u011Bte",
      'Manage Images': "Spr\xE1va obr\xE1zk\u016F",
      'Loading': "Nakl\xE1d\xE1n\xED",
      'Deleting': "Odstran\u011Bn\xED",
      'Tags': "Zna\u010Dky",
      'Are you sure? Image will be deleted.': "Ur\u010Dit\u011B? Obr\xE1zek bude smaz\xE1n.",
      'Replace': 'Nahradit',
      'Uploading': "Nahr\xE1v\xE1n\xED",
      'Loading image': "Obr\xE1zek se na\u010D\xEDt\xE1",
      'Display': 'Zobrazit',
      'Inline': 'Inline',
      'Break Text': "P\u0159est\xE1vka textu",
      'Alternative Text': "Alternativn\xED textu",
      'Change Size': "Zm\u011Bnit velikost",
      'Width': "\u0160\xED\u0159ka",
      'Height': "V\xFD\u0161ka",
      'Something went wrong. Please try again.': "N\u011Bco se pokazilo. Pros\xEDm zkuste to znovu.",
      'Image Caption': 'Obrázek titulku',
      'Advanced Edit': 'Pokročilá úprava',
      // Video
      'Insert Video': "Vlo\u017Eit video",
      'Embedded Code': "Vlo\u017Een\xFD k\xF3d",
      'Paste in a video URL': 'Vložit adresu URL videa',
      'Drop video': 'Drop video',
      'Your browser does not support HTML5 video.': 'Váš prohlížeč nepodporuje video html5.',
      'Upload Video': 'Nahrát video',
      // Tables
      'Insert Table': "Vlo\u017Eit tabulku",
      'Table Header': "Hlavi\u010Dka tabulky",
      'Remove Table': 'Odstranit tabulku',
      'Table Style': 'Styl tabulky',
      'Horizontal Align': "Horizont\xE1ln\xED zarovn\xE1n\xED",
      'Row': "\u0158\xE1dek",
      'Insert row above': "Vlo\u017Eit \u0159\xE1dek nad",
      'Insert row below': "Vlo\u017Eit \u0159\xE1dek pod",
      'Delete row': "Smazat \u0159\xE1dek",
      'Column': 'Sloupec',
      'Insert column before': "Vlo\u017Eit sloupec vlevo",
      'Insert column after': "Vlo\u017Eit sloupec vpravo",
      'Delete column': 'Smazat sloupec',
      'Cell': "Bu\u0148ka",
      'Merge cells': "Slou\u010Dit bu\u0148ky",
      'Horizontal split': "Horizont\xE1ln\xED rozd\u011Blen\xED",
      'Vertical split': "Vertik\xE1ln\xED rozd\u011Blen\xED",
      'Cell Background': "Bu\u0148ka pozad\xED",
      'Vertical Align': "Vertik\xE1ln\xED zarovn\xE1n\xED",
      'Top': 'Vrchol',
      'Middle': "St\u0159ed",
      'Bottom': "Spodn\xED",
      'Align Top': 'Zarovnat vrchol',
      'Align Middle': "Zarovnat st\u0159ed",
      'Align Bottom': "Zarovnat spodn\xED",
      'Cell Style': "Styl bu\u0148ky",
      // Files
      'Upload File': "Nahr\xE1t soubor",
      'Drop file': "P\u0159et\xE1hn\u011Bte sem soubor",
      // Emoticons
      'Emoticons': 'Emotikony',
      'Grinning face': "S \xFAsm\u011Bvem tv\xE1\u0159",
      'Grinning face with smiling eyes': "S \xFAsm\u011Bvem obli\u010Dej s o\u010Dima s \xFAsm\u011Bvem",
      'Face with tears of joy': "tv\xE1\u0159 se slzami radosti",
      'Smiling face with open mouth': "Usm\xEDvaj\xEDc\xED se obli\u010Dej s otev\u0159en\xFDmi \xFAsty",
      'Smiling face with open mouth and smiling eyes': "Usm\xEDvaj\xEDc\xED se obli\u010Dej s otev\u0159en\xFDmi \xFAsty a o\u010Dima s \xFAsm\u011Bvem",
      'Smiling face with open mouth and cold sweat': "Usm\xEDvaj\xEDc\xED se tv\xE1\u0159 s otev\u0159en\xFDmi \xFAsty a studen\xFD pot",
      'Smiling face with open mouth and tightly-closed eyes': "Usm\xEDvaj\xEDc\xED se tv\xE1\u0159 s otev\u0159en\xFDmi \xFAsty a t\u011Bsn\u011B zav\u0159en\xE9 o\u010Di",
      'Smiling face with halo': "Usm\xEDvaj\xEDc\xED se obli\u010Dej s halo",
      'Smiling face with horns': "Usm\xEDvaj\xEDc\xED se obli\u010Dej s  rohy",
      'Winking face': "Mrk\xE1n\xED tv\xE1\u0159",
      'Smiling face with smiling eyes': "Usm\xEDvaj\xEDc\xED se obli\u010Dej s  o\u010Dima s \xFAsm\u011Bvem",
      'Face savoring delicious food': "Tv\xE1\u0159 vychutn\xE1val chutn\xE9 j\xEDdlo",
      'Relieved face': "Ulevilo tv\xE1\u0159",
      'Smiling face with heart-shaped eyes': "Usm\xEDvaj\xEDc\xED se tv\xE1\u0159 ve tvaru srdce o\u010Dima",
      'Smiling face with sunglasses': "Usm\xEDvaj\xEDc\xED se tv\xE1\u0159 se slune\u010Dn\xEDmi br\xFDlemi",
      'Smirking face': "Uculoval tv\xE1\u0159",
      'Neutral face': "Neutr\xE1ln\xED tv\xE1\u0159",
      'Expressionless face': "Bezv\xFDrazn\xFD obli\u010Dej",
      'Unamused face': "Ne pobaven\xFD tv\xE1\u0159",
      'Face with cold sweat': "Tv\xE1\u0159 se studen\xFDm potem",
      'Pensive face': "Zamy\u0161len\xFD obli\u010Dej",
      'Confused face': "Zmaten\xFD tv\xE1\u0159",
      'Confounded face': "Na\u0161tvan\xFD tv\xE1\u0159",
      'Kissing face': "L\xEDb\xE1n\xED tv\xE1\u0159",
      'Face throwing a kiss': "Tv\xE1\u0159 h\xE1zet polibek",
      'Kissing face with smiling eyes': "L\xEDb\xE1n\xED obli\u010Dej s o\u010Dima s \xFAsm\u011Bvem",
      'Kissing face with closed eyes': "L\xEDb\xE1n\xED tv\xE1\u0159 se zav\u0159en\xFDma o\u010Dima",
      'Face with stuck out tongue': "Tv\xE1\u0159 s tr\u010Dely jazyk",
      'Face with stuck out tongue and winking eye': "Tv\xE1\u0159 s tr\u010Dely jazykem a mrkat o\u010Dima",
      'Face with stuck out tongue and tightly-closed eyes': "Suo\u010Diti s tr\u010Dely jazykem t\u011Bsn\u011B zav\u0159en\xE9 vidikovce",
      'Disappointed face': "Zklaman\xFD tv\xE1\u0159",
      'Worried face': "Boj\xED\u0161 se tv\xE1\u0159",
      'Angry face': "Rozzloben\xFD tv\xE1\u0159",
      'Pouting face': "Na\u0161pulen\xE9 tv\xE1\u0159",
      'Crying face': "Pl\xE1\u010D tv\xE1\u0159",
      'Persevering face': "Vytrval\xFDm tv\xE1\u0159",
      'Face with look of triumph': "Tv\xE1\u0159 s v\xFDrazem triumfu",
      'Disappointed but relieved face': "Zklaman\xFD ale ulevilo tv\xE1\u0159",
      'Frowning face with open mouth': "Zamra\u010Dil se obli\u010Dej s otev\u0159en\xFDmi \xFAsty",
      'Anguished face': "\xFAzkostn\xE9 tv\xE1\u0159",
      'Fearful face': "Stra\u0161n\xFD tv\xE1\u0159",
      'Weary face': "Unaven\xFD tv\xE1\u0159",
      'Sleepy face': "Ospal\xFD tv\xE1\u0159",
      'Tired face': "Unaven\xFD tv\xE1\u0159",
      'Grimacing face': "\u0161klebil tv\xE1\u0159",
      'Loudly crying face': "Hlasit\u011B pl\xE1\u010De tv\xE1\u0159",
      'Face with open mouth': "Obli\u010Dej s otev\u0159en\xFDmi \xFAsty",
      'Hushed face': "Tlumen\xFD tv\xE1\u0159",
      'Face with open mouth and cold sweat': "Obli\u010Dej s otev\u0159en\xFDmi \xFAsty a studen\xFD pot",
      'Face screaming in fear': "Tv\xE1\u0159 k\u0159i\u010D\xED ve strachu",
      'Astonished face': "V \xFA\u017Easu tv\xE1\u0159",
      'Flushed face': "Zarudnut\xED v obli\u010Deji",
      'Sleeping face': "Sp\xEDc\xED tv\xE1\u0159",
      'Dizzy face': "Z\xE1vrat\u011B tv\xE1\u0159",
      'Face without mouth': "Tv\xE1\u0159 bez \xFAst",
      'Face with medical mask': "Tv\xE1\u0159 s l\xE9ka\u0159sk\xFDm maskou",
      // Line breaker
      'Break': "P\u0159eru\u0161en\xED",
      // Math
      'Subscript': "Doln\xED index",
      'Superscript': "Horn\xED index",
      // Full screen
      'Fullscreen': "Cel\xE1 obrazovka",
      // Horizontal line
      'Insert Horizontal Line': "Vlo\u017Eit vodorovnou \u010D\xE1ru",
      // Clear formatting
      'Clear Formatting': "Vymazat form\xE1tov\xE1n\xED",
      // Save
      'Save': "Ulo\u017Eit",
      // Undo, redo
      'Undo': "Zp\u011Bt",
      'Redo': 'Znovu',
      // Select all
      'Select All': "Vybrat v\u0161e",
      // Code view
      'Code View': "Zobrazen\xED k\xF3d",
      // Quote
      'Quote': "Cit\xE1t",
      'Increase': "Nav\xFD\u0161it",
      'Decrease': "Sn\xED\u017Een\xED",
      // Quick Insert
      'Quick Insert': "Rychl\xE1 vlo\u017Eka",
      // Spcial Characters
      'Special Characters': 'Speciální znaky',
      'Latin': 'Latinský',
      'Greek': 'Řecký',
      'Cyrillic': 'Cyrilice',
      'Punctuation': 'Interpunkce',
      'Currency': 'Měna',
      'Arrows': 'Šipky',
      'Math': 'Matematika',
      'Misc': 'Misc',
      // Print.
      'Print': 'Tisk',
      // Spell Checker.
      'Spell Checker': 'Kontrola pravopisu',
      // Help
      'Help': 'Pomoc',
      'Shortcuts': 'Zkratky',
      'Inline Editor': 'Inline editor',
      'Show the editor': 'Zobrazit editor',
      'Common actions': 'Společné akce',
      'Copy': 'Kopírovat',
      'Cut': 'Střih',
      'Paste': 'Vložit',
      'Basic Formatting': 'Základní formátování',
      'Increase quote level': 'Zvýšení cenové hladiny',
      'Decrease quote level': 'Snížit úroveň cenové nabídky',
      'Image / Video': 'Obraz / video',
      'Resize larger': 'Změna velikosti větší',
      'Resize smaller': 'Změnit velikost menší',
      'Table': 'Stůl',
      'Select table cell': 'Vyberte buňku tabulky',
      'Extend selection one cell': 'Rozšířit výběr o jednu buňku',
      'Extend selection one row': 'Rozšířit výběr o jeden řádek',
      'Navigation': 'Navigace',
      'Focus popup / toolbar': 'Popup / panel nástrojů zaostření',
      'Return focus to previous position': 'Návrat na předchozí pozici',
      // Embed.ly
      'Embed URL': 'Vložte url',
      'Paste in a URL to embed': 'Vložit adresu URL, kterou chcete vložit',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'Vložený obsah pochází z dokumentu Microsoft Word. chcete formát uchovat nebo jej vyčistit?',
      'Keep': 'Držet',
      'Clean': 'Čistý',
      'Word Paste Detected': 'Slovní vložka zjištěna',
      // Character Counter 
      'Characters': 'Znaky',
      // More Buttons
      'More Text': 'Více Text',
      'More Paragraph': 'Více odstavec',
      'More Rich': 'Více Rich',
      'More Misc': 'Více Různé'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=cs.js.map
