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
   * Slovak
   */
  FE.LANGUAGE['sk'] = {
    translation: {
      // Place holder
      'Type something': "Nap\xED\u0161te hoci\u010Do",
      // Basic formatting
      'Bold': "Tu\u010Dn\xE9",
      'Italic': "Kurz\xEDva",
      'Underline': "Pod\u010Diarknut\xE9",
      'Strikethrough': "Pre\u0161krtnut\xE9",
      // Main buttons
      'Insert': "Vlo\u017Ei\u0165",
      'Delete': "Vymaza\u0165",
      'Cancel': "Zru\u0161i\u0165",
      'OK': 'OK',
      'Back': "Sp\xE4\u0165",
      'Remove': "Odstr\xE1ni\u0165",
      'More': 'Viac',
      'Update': "Aktualizova\u0165",
      'Style': "\u0165t\xFDl",
      // Font
      'Font Family': "Typ p\xEDsma",
      'Font Size': "Ve\u013Ekos\u0165 p\xEDsma",
      // Colors
      'Colors': 'Farby',
      'Background': 'Pozadie',
      'Text': 'Text',
      'HEX Color': 'Hex Farby',
      // Paragraphs
      'Paragraph Format': "Form\xE1t odstavca",
      'Normal': "Norm\xE1lne",
      'Code': "K\xF3d",
      'Heading 1': 'Nadpis 1',
      'Heading 2': 'Nadpis 2',
      'Heading 3': 'Nadpis 3',
      'Heading 4': 'Nadpis 4',
      // Style
      'Paragraph Style': "\u0165t\xFDl odstavca",
      'Inline Style': "Inline \u0161t\xFDl",
      // Alignment
      'Align': 'Zarovnanie',
      'Align Left': "Zarovna\u0165 v\u013Eavo",
      'Align Center': "Zarovna\u0165 na stred",
      'Align Right': "Zarovna\u0165 vpravo",
      'Align Justify': "Zarovna\u0165 do bloku",
      'None': "\u017Diadne",
      // Lists
      'Ordered List': "\u010C\xEDslovan\xFD zoznam",
      'Unordered List': "Ne\u010D\xEDslovan\xFD zoznam",
      // Indent
      'Decrease Indent': "Zmen\u0161i\u0165 odsadenie",
      'Increase Indent': "Zv\xE4\u010D\u0161i\u0165 odsadenie",
      // Links
      'Insert Link': "Vlo\u017Ei\u0165 odkaz",
      'Open in new tab': "Otvori\u0165 v novom okne",
      'Open Link': "Otvori\u0165 odkaz",
      'Edit Link': "Upravi\u0165 odkaz",
      'Unlink': "Odstr\xE1ni\u0165 odkaz",
      'Choose Link': 'Vyberte odkaz',
      // Images
      'Insert Image': "Vlo\u017Ei\u0165 obr\xE1zok",
      'Upload Image': "Nahra\u0165 obr\xE1zok",
      'By URL': 'Z URL adresy',
      'Browse': "Vybra\u0165",
      'Drop image': "Pretiahnite obr\xE1zok do tohto miesta",
      'or click': "alebo kliknite a vlo\u017Ete",
      'Manage Images': "Spr\xE1va obr\xE1zkov",
      'Loading': "Nahr\xE1vam",
      'Deleting': "Odstra\u0148ujem",
      'Tags': "Zna\u010Dky",
      'Are you sure? Image will be deleted.': "Ste si ist\xFD? Obr\xE1zok bude odstranen\xFD.",
      'Replace': "Vymeni\u0165",
      'Uploading': "Nahr\xE1vam",
      'Loading image': "Obr\xE1zok se na\u010D\xEDtav\xE1",
      'Display': "Zobrazi\u0165",
      'Inline': 'Inline',
      'Break Text': 'Zalomenie textu',
      'Alternative Text': "Alternat\xEDvny text",
      'Change Size': "Zmeni\u0165 ve\u013Ekos\u0165",
      'Width': "\u0165\xEDrka",
      'Height': "V\xFD\u0161ka",
      'Something went wrong. Please try again.': "Nie\u010Do sa pokazilo. Pros\xEDm, sk\xFAste to znova.",
      'Image Caption': 'Titulok obrázka',
      'Advanced Edit': 'Pokročilá úprava',
      // Video
      'Insert Video': "Vlo\u017Ei\u0165 video",
      'Embedded Code': "Vlo\u017Een\xFD k\xF3d",
      'Paste in a video URL': 'Vložte do adresy URL videa',
      'Drop video': 'Drop video',
      'Your browser does not support HTML5 video.': 'Váš prehliadač nepodporuje video html5.',
      'Upload Video': 'Nahrať video',
      // Tables
      'Insert Table': "Vlo\u017Ei\u0165 tabu\u013Eku",
      'Table Header': "Hlavi\u010Dka tabu\u013Eky",
      'Remove Table': "Odstrani\u0165 tabu\u013Eku",
      'Table Style': "\u0165t\xFDl tabu\u013Eky",
      'Horizontal Align': "Horizont\xE1lne zarovnanie",
      'Row': 'Riadok',
      'Insert row above': "Vlo\u017Ei\u0165 riadok nad",
      'Insert row below': "Vlo\u017Ei\u0165 riadok pod",
      'Delete row': "Odstrani\u0165 riadok",
      'Column': "St\u013Apec",
      'Insert column before': "Vlo\u017Ei\u0165 st\u013Apec v\u013Eavo",
      'Insert column after': "Vlo\u017Ei\u0165 st\u013Apec vpravo",
      'Delete column': "Odstrani\u0165 st\u013Apec",
      'Cell': 'Bunka',
      'Merge cells': "Zl\xFA\u010Di\u0165 bunky",
      'Horizontal split': "Horizont\xE1lne rozdelenie",
      'Vertical split': "Vertik\xE1lne rozdelenie",
      'Cell Background': 'Bunka pozadia',
      'Vertical Align': "Vertik\xE1lne zarovn\xE1n\xED",
      'Top': 'Vrch',
      'Middle': 'Stred',
      'Bottom': 'Spodok',
      'Align Top': 'Zarovnat na vrch',
      'Align Middle': 'Zarovnat na stred',
      'Align Bottom': 'Zarovnat na spodok',
      'Cell Style': "\u0165t\xFDl bunky",
      // Files
      'Upload File': "Nahra\u0165 s\xFAbor",
      'Drop file': "Vlo\u017Ete s\xFAbor sem",
      // Emoticons
      'Emoticons': 'Emotikony',
      'Grinning face': "Tv\xE1r s \xFAsmevom",
      'Grinning face with smiling eyes': "Tv\xE1r s \xFAsmevom a o\u010Dami",
      'Face with tears of joy': "Tv\xE1r so slzamy radosti",
      'Smiling face with open mouth': "Usmievaj\xFAci sa tv\xE1r s otvoren\xFDmi \xFAstami",
      'Smiling face with open mouth and smiling eyes': "Usmievaj\xFAci sa tv\xE1r s otvoren\xFDmi \xFAstami a o\u010Dami",
      'Smiling face with open mouth and cold sweat': "Usmievaj\xFAci sa tv\xE1r s otvoren\xFDmi \xFAstami a studen\xFD pot",
      'Smiling face with open mouth and tightly-closed eyes': "Usmievaj\xFAci sa tv\xE1r s otvoren\xFDmi \xFAstami a zavret\xFDmi o\u010Dami",
      'Smiling face with halo': "Usmievaj\xFAci sa tv\xE1r s halo",
      'Smiling face with horns': "Usmievaj\xFAci sa tv\xE1r s rohmi",
      'Winking face': "Mrkaj\xFAca tv\xE1r",
      'Smiling face with smiling eyes': "Usmievaj\xFAci sa tv\xE1r a o\u010Dami",
      'Face savoring delicious food': "Tv\xE1r vychutn\xE1vaj\xFAca si chutn\xE9 jedlo",
      'Relieved face': "Spokojn\xE1 tv\xE1r",
      'Smiling face with heart-shaped eyes': "Usmievaj\xFAci sa tv\xE1r s o\u010Dami v tvare srdca",
      'Smiling face with sunglasses': "Usmievaj\xFAci sa tv\xE1r so slne\u010Dn\xFDmi okuliarmi",
      'Smirking face': "U\u0161k\u0155\u0148aj\xFAca sa tv\xE1r",
      'Neutral face': "Neutr\xE1lna tva\u0155",
      'Expressionless face': "Bezv\xFDrazn\xE1 tv\xE1r",
      'Unamused face': "Nepobaven\xE1 tv\xE1r",
      'Face with cold sweat': "Tv\xE1r so studen\xFDm potom",
      'Pensive face': "Zamyslen\xE1 tv\xE1r",
      'Confused face': "Zmeten\xE1 tv\xE1r",
      'Confounded face': "Nahnevan\xE1 tv\xE1r",
      'Kissing face': "Bozkavaj\xFAca tv\xE1r",
      'Face throwing a kiss': "Tv\xE1r hadzaj\xFAca pusu",
      'Kissing face with smiling eyes': "Bozk\xE1vaj\xFAca tv\xE1r s o\u010Dami a \xFAsmevom",
      'Kissing face with closed eyes': "Bozk\xE1vaj\xFAca tv\xE1r so zavret\xFDmi o\u010Dami",
      'Face with stuck out tongue': "Tv\xE1r s vyplazen\xFDm jazykom",
      'Face with stuck out tongue and winking eye': "Mrkaj\xFAca tv\xE1r s vyplazen\xFDm jazykom",
      'Face with stuck out tongue and tightly-closed eyes': "Tv\xE1r s vyplazen\xFDm jazykom a privret\xFDmi o\u010Dami",
      'Disappointed face': "Sklaman\xE1 tv\xE1r",
      'Worried face': "Obavaj\xFAca se tv\xE1r",
      'Angry face': "Nahnevan\xE1 tv\xE1r",
      'Pouting face': "Na\u0161pulen\xE1 tv\xE1r",
      'Crying face': "Pla\u010D\xFAca tv\xE1r",
      'Persevering face': "H\xFA\u017Eevnat\xE1 tv\xE1r",
      'Face with look of triumph': "Tv\xE1r s v\xFDrazom v\xED\u0165aza",
      'Disappointed but relieved face': "Sklaman\xE1 ale spokojn\xE1 tv\xE1r",
      'Frowning face with open mouth': "Zamra\u010Den\xE1 tvar s otvoren\xFDmi \xFAstami",
      'Anguished face': "\xDAzkostn\xE1 tv\xE1r",
      'Fearful face': "Strachuj\xFAca sa tv\xE1r",
      'Weary face': "Unaven\xE1 tv\xE1r",
      'Sleepy face': "Ospal\xE1 tv\xE1r",
      'Tired face': "Unaven\xE1 tv\xE1r",
      'Grimacing face': "Sv\xE1r s grimasou",
      'Loudly crying face': "Nahlas pl\xE1\u010D\xFAca tv\xE1r",
      'Face with open mouth': "Tv\xE1r s otvoren\xFDm \xFAstami",
      'Hushed face': "Ml\u010Diaca tv\xE1r",
      'Face with open mouth and cold sweat': "Tv\xE1r s otvoren\xFDmi \xFAstami a studen\xFDm potom",
      'Face screaming in fear': "Tv\xE1r kri\u010Diaca strachom",
      'Astonished face': "Tv\xE1r v \xFA\u017Ease",
      'Flushed face': "S\u010Dervenanie v tv\xE1ri",
      'Sleeping face': "Spiaca tv\xE1r",
      'Dizzy face': "Tv\xE1r vyjadruj\xFAca z\xE1vrat",
      'Face without mouth': "Tv\xE1r bez \xFAst",
      'Face with medical mask': "Tv\xE1r s lek\xE1rskou maskou",
      // Line breaker
      'Break': 'Zalomenie',
      // Math
      'Subscript': "Doln\xFD index",
      'Superscript': "Horn\xFD index",
      // Full screen
      'Fullscreen': "Cel\xE1 obrazovka",
      // Horizontal line
      'Insert Horizontal Line': "Vlo\u017Ei\u0165 vodorovn\xFA \u010Diaru",
      // Clear formatting
      'Clear Formatting': "Vymaza\u0165 formatovanie",
      // Save
      'Save': "Ulo\u017Ei\u0165",
      // Undo, redo
      'Undo': "Sp\xE4\u0165",
      'Redo': 'Znova',
      // Select all
      'Select All': "Vybra\u0165 v\u0161etko",
      // Code view
      'Code View': "Zobrazi\u0165 html k\xF3d",
      // Quote
      'Quote': "Cit\xE1t",
      'Increase': "Nav\xFD\u0161i\u0165",
      'Decrease': "Zn\xED\u017Ei\u0165",
      // Quick Insert
      'Quick Insert': "Vlo\u017Ei\u0165 zr\xFDchlene",
      // Spcial Characters
      'Special Characters': 'Špeciálne znaky',
      'Latin': 'Latinčina',
      'Greek': 'Grécky',
      'Cyrillic': 'Cyriliky',
      'Punctuation': 'Interpunkcia',
      'Currency': 'Mena',
      'Arrows': 'Šípky',
      'Math': 'Matematika',
      'Misc': 'Misc',
      // Print.
      'Print': 'Vytlačiť',
      // Spell Checker.
      'Spell Checker': 'Kontrola pravopisu',
      // Help
      'Help': 'Pomoc',
      'Shortcuts': 'Skratky',
      'Inline Editor': 'Inline editor',
      'Show the editor': 'Zobraziť editor',
      'Common actions': 'Spoločné akcie',
      'Copy': 'Kópie',
      'Cut': 'Rez',
      'Paste': 'Pasta',
      'Basic Formatting': 'Základné formátovanie',
      'Increase quote level': 'Zvýšiť úroveň cenovej ponuky',
      'Decrease quote level': 'Znížiť úroveň cenovej ponuky',
      'Image / Video': 'Obrázok / video',
      'Resize larger': 'Zmena veľkosti',
      'Resize smaller': 'Meniť veľkosť',
      'Table': 'Stôl',
      'Select table cell': 'Vyberte bunku tabuľky',
      'Extend selection one cell': 'Rozšíriť výber jednej bunky',
      'Extend selection one row': 'Rozšíriť výber o jeden riadok',
      'Navigation': 'Navigácia',
      'Focus popup / toolbar': 'Zameranie / panel s nástrojmi',
      'Return focus to previous position': 'Vrátiť zaostrenie na predchádzajúcu pozíciu',
      // Embed.ly
      'Embed URL': 'Vložiť adresu URL',
      'Paste in a URL to embed': 'Vložte do adresy URL, ktorú chcete vložiť',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'Vložený obsah vychádza z dokumentu Microsoft Word. chcete formát uchovať alebo ho vyčistiť?',
      'Keep': 'Zachovať',
      'Clean': 'Čistý',
      'Word Paste Detected': 'Slovná vložka bola zistená',
      // Character Counter
      'Characters': 'Znaky',
      // More Buttons
      'More Text': 'viac Text',
      'More Paragraph': 'viac Odsek',
      'More Rich': 'viac bohatý',
      'More Misc': 'viac rôzne'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=sk.js.map
