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
   * Hungarian
   */
  FE.LANGUAGE['hu'] = {
    translation: {
      // Place holder
      'Type something': "Sz\xF6veg...",
      // Basic formatting
      'Bold': "F\xE9lk\xF6v\xE9r",
      'Italic': "D\u0151lt",
      'Underline': "Al\xE1h\xFAzott",
      'Strikethrough': "\xC1th\xFAzott",
      // Main buttons
      'Insert': "Beilleszt\xE9s",
      'Delete': "T\xF6rl\xE9s",
      'Cancel': "M\xE9gse",
      'OK': 'Rendben',
      'Back': 'Vissza',
      'Remove': "Elt\xE1vol\xEDt\xE1s",
      'More': "T\xF6bb",
      'Update': "Friss\xEDt\xE9s",
      'Style': "St\xEDlus",
      // Font
      'Font Family': "Bet\u0171t\xEDpus",
      'Font Size': "Bet\u0171m\xE9ret",
      // Colors
      'Colors': "Sz\xEDnek",
      'Background': "H\xE1tt\xE9r",
      'Text': "Sz\xF6veg",
      'HEX Color': 'Hex színű',
      // Paragraphs
      'Paragraph Format': "Form\xE1tumok",
      'Normal': "Norm\xE1l",
      'Code': "K\xF3d",
      'Heading 1': "C\xEDmsor 1",
      'Heading 2': "C\xEDmsor 2",
      'Heading 3': "C\xEDmsor 3",
      'Heading 4': "C\xEDmsor 4",
      // Style
      'Paragraph Style': "Bekezd\xE9s st\xEDlusa",
      'Inline Style': " Helyi st\xEDlus",
      // Alignment
      'Align': "Igaz\xEDt\xE1s",
      'Align Left': "Balra igaz\xEDt",
      'Align Center': "K\xF6z\xE9pre z\xE1r",
      'Align Right': "Jobbra igaz\xEDt",
      'Align Justify': "Sorkiz\xE1r\xE1s",
      'None': 'Egyik sem',
      // Lists
      'Ordered List': "Sz\xE1moz\xE1s",
      'Unordered List': "Felsorol\xE1s",
      // Indent
      'Decrease Indent': "Beh\xFAz\xE1s cs\xF6kkent\xE9se",
      'Increase Indent': "Beh\xFAz\xE1s n\xF6vel\xE9se",
      // Links
      'Insert Link': "Hivatkoz\xE1s beilleszt\xE9se",
      'Open in new tab': "Megnyit\xE1s \xFAj lapon",
      'Open Link': "Hivatkoz\xE1s megnyit\xE1sa",
      'Edit Link': "Hivatkoz\xE1 s szerkeszt\xE9se",
      'Unlink': "Hivatkoz\xE1s t\xF6rl\xE9se",
      'Choose Link': "Keres\xE9s a lapok k\xF6z\xF6tt",
      // Images
      'Insert Image': "K\xE9p beilleszt\xE9se",
      'Upload Image': "K\xE9p felt\xF6lt\xE9se",
      'By URL': "Webc\xEDm megad\xE1sa",
      'Browse': "B\xF6ng\xE9sz\xE9s",
      'Drop image': "H\xFAzza ide a k\xE9pet",
      'or click': 'vagy kattintson ide',
      'Manage Images': "K\xE9pek kezel\xE9se",
      'Loading': "Bet\xF6lt\xE9s...",
      'Deleting': "T\xF6rl\xE9s...",
      'Tags': "C\xEDmk\xE9k",
      'Are you sure? Image will be deleted.': "Biztos benne? A k\xE9p t\xF6rl\xE9sre ker\xFCl.",
      'Replace': 'Csere',
      'Uploading': "Felt\xF6lt\xE9s",
      'Loading image': "K\xE9p bet\xF6lt\xE9se",
      'Display': "Kijelz\u0151",
      'Inline': 'Sorban',
      'Break Text': "Sz\xF6veg t\xF6r\xE9se",
      'Alternative Text': "Alternat\xEDv sz\xF6veg",
      'Change Size': "M\xE9ret m\xF3dos\xEDt\xE1sa",
      'Width': "Sz\xE9less\xE9g",
      'Height': "Magass\xE1g",
      'Something went wrong. Please try again.': "Valami elromlott. K\xE9rlek pr\xF3b\xE1ld \xFAjra.",
      'Image Caption': 'Képaláírás',
      'Advanced Edit': 'Fejlett szerkesztés',
      // Video
      'Insert Video': "Vide\xF3 beilleszt\xE9se",
      'Embedded Code': "K\xF3d bem\xE1sol\xE1sa",
      'Paste in a video URL': 'Illessze be a videó URL-címét',
      'Drop video': 'Csepp videót',
      'Your browser does not support HTML5 video.': 'A böngészője nem támogatja a html5 videót.',
      'Upload Video': 'Videó feltöltése',
      // Tables
      'Insert Table': "T\xE1bl\xE1zat beilleszt\xE9se",
      'Table Header': "T\xE1bl\xE1zat fejl\xE9ce",
      'Remove Table': "T\xE1bla elt\xE1vol\xEDt\xE1sa",
      'Table Style': "T\xE1bl\xE1zat st\xEDlusa",
      'Horizontal Align': "V\xEDzszintes igaz\xEDt\xE1s",
      'Row': 'Sor',
      'Insert row above': "Sor besz\xFAr\xE1sa el\xE9",
      'Insert row below': "Sor besz\xFAr\xE1sa m\xF6g\xE9",
      'Delete row': "Sor t\xF6rl\xE9se",
      'Column': 'Oszlop',
      'Insert column before': "Oszlop besz\xFAr\xE1sa el\xE9",
      'Insert column after': "Oszlop besz\xFAr\xE1sa m\xF6g\xE9",
      'Delete column': "Oszlop t\xF6rl\xE9se",
      'Cell': 'Cella',
      'Merge cells': "Cell\xE1k egyes\xEDt\xE9se",
      'Horizontal split': "V\xEDzszintes osztott",
      'Vertical split': "F\xFCgg\u0151leges osztott",
      'Cell Background': "Cella h\xE1ttere",
      'Vertical Align': "F\xFCgg\u0151leges fej\xE1ll\xEDt\xE1s",
      'Top': "Fels\u0151",
      'Middle': "K\xF6z\xE9ps\u0151",
      'Bottom': "Als\xF3",
      'Align Top': "Igaz\xEDtsa fel\xFClre",
      'Align Middle': "Igaz\xEDtsa k\xF6z\xE9pre",
      'Align Bottom': "Igaz\xEDtsa al\xFAlra",
      'Cell Style': "Cella st\xEDlusa",
      // Files
      'Upload File': "F\xE1jl felt\xF6lt\xE9se",
      'Drop file': "H\xFAzza ide a f\xE1jlt",
      // Emoticons
      'Emoticons': 'Hangulatjelek',
      'Grinning face': "Vigyorg\xF3 arc",
      'Grinning face with smiling eyes': "Vigyorg\xF3 arc mosolyg\xF3 szemekkel",
      'Face with tears of joy': "Arc \xE1t az \xF6r\xF6m k\xF6nnyei",
      'Smiling face with open mouth': "Mosolyg\xF3 arc t\xE1tott sz\xE1jjal",
      'Smiling face with open mouth and smiling eyes': "Mosolyg\xF3 arc t\xE1tott sz\xE1jjal \xE9s mosolyg\xF3 szemek",
      'Smiling face with open mouth and cold sweat': "Mosolyg\xF3 arc t\xE1tott sz\xE1jjal \xE9s hideg ver\xEDt\xE9k",
      'Smiling face with open mouth and tightly-closed eyes': "Mosolyg\xF3 arc t\xE1tott sz\xE1jjal \xE9s szorosan lehunyt szemmel",
      'Smiling face with halo': "Mosolyg\xF3 arc dicsf\xE9nyben",
      'Smiling face with horns': "Mosolyg\xF3 arc szarvakkal",
      'Winking face': "Kacsint\xF3s arc",
      'Smiling face with smiling eyes': "Mosolyg\xF3 arc mosolyg\xF3 szemekkel",
      'Face savoring delicious food': "Arc \xEDzlelgette \xEDzletes \xE9telek",
      'Relieved face': "Megk\xF6nnyebb\xFClt arc",
      'Smiling face with heart-shaped eyes': "Mosolyg\xF3 arc sz\xEDv alak\xFA szemekkel",
      'Smilin g face with sunglasses': "Mosolyg\xF3 arc napszem\xFCvegben",
      'Smirking face': "Vigyorg\xF3 arca",
      'Neutral face': 'Semleges arc',
      'Expressionless face': "Kifejez\xE9stelen arc",
      'Unamused face': 'Unott arc',
      'Face with cold sweat': "Arc\xE1n hideg verejt\xE9kkel",
      'Pensive face': "T\xF6preng\u0151 arc",
      'Confused face': 'Zavaros arc',
      'Confounded face': "R\xE1c\xE1folt arc",
      'Kissing face': "Cs\xF3kos arc",
      'Face throwing a kiss': "Arcra dobott egy cs\xF3kot",
      'Kissing face with smiling eyes': "Cs\xF3kos arc\xE1t mosolyg\xF3 szemek",
      'Kissing face with closed eyes': "Cs\xF3kos arc\xE1t csukott szemmel",
      'Face with stuck out tongue': "Szembe kiny\xFAj totta a nyelv\xE9t",
      'Face with stuck out tongue and winking eye': "Szembe kiny\xFAjtotta a nyelv\xE9t, \xE9s kacsint\xF3 szem",
      'Face with stuck out tongue and tightly-closed eyes': "Arc kiny\xFAjtotta a nyelv\xE9t, \xE9s szorosan lehunyt szemmel",
      'Disappointed face': "Csal\xF3dott arc",
      'Worried face': "Agg\xF3d\xF3 arc\xE1t",
      'Angry face': "D\xFCh\xF6s arc",
      'Pouting face': "Duzzog\xF3 arc",
      'Crying face': "S\xEDr\xF3 arc",
      'Persevering face': "Kitart\xF3 arc",
      'Face with look of triumph': "Arc\xE1t diadalmas pillant\xE1st",
      'Disappointed but relieved face': "Csal\xF3dott, de megk\xF6nnyebb\xFClt arc",
      'Frowning face with open mouth': "Komor arcb\xF3l t\xE1tott sz\xE1jjal",
      'Anguished face': "Gy\xF6tr\u0151d\u0151 arc",
      'Fearful face': "F\xE9lelmetes arc",
      'Weary face': "F\xE1radt arc",
      'Sleepy face': "\xE1lmos arc",
      'Tired face': "F\xE1radt arc",
      'Grimacing face': 'Elfintorodott arc',
      'Loudly crying face': "Hangosan s\xEDr\xF3 arc",
      'Face with open mouth': "Arc nyitott sz\xE1jjal",
      'Hushed face': "Csit\xEDtott arc",
      'Face with open mouth and cold sweat': "Arc t\xE1tott sz\xE1jjal \xE9s hideg ver\xEDt\xE9k",
      'Face screaming in fear': "Sikoltoz\xF3 arc a f\xE9lelemt\u0151l",
      'Astonished face': 'Meglepett arc',
      'Flushed face': 'Kipirult arc',
      'Sleeping face': "Alv\xF3 arc",
      'Dizzy face': " Sz\xE1d\xFCl\u0151 arc",
      'Face without mouth': "Arc n\xE9lk\xFCli sz\xE1j",
      'Face with medical mask': "Arc\xE1n orvosi maszk",
      // Line breaker
      'Break': "T\xF6r\xE9s",
      // Math
      'Subscript': "Als\xF3 index",
      'Superscript': "Fels\u0151 index",
      // Full screen
      'Fullscreen': "Teljes k\xE9perny\u0151",
      // Horizontal line
      'Insert Horizontal Line': "V\xEDzszintes vonal",
      // Clear formatting
      'Clear Formatting': "Form\xE1z\xE1s elt\xE1vol\xEDt\xE1sa",
      // Save
      'Save': "Ment\xE9s",
      // Undo, redo
      'Undo': "Visszavon\xE1s",
      'Redo': "Ism\xE9t",
      // Select all
      'Select All': "Minden kijel\xF6l\xE9se",
      // Code view
      'Code View': "Forr\xE1sk\xF3d",
      // Quote
      'Quote': "Id\xE9zet",
      'Increase': "N\xF6vel\xE9s",
      'Decrease': "Cs\xF6kkent\xE9s",
      // Quick Insert
      'Quick Insert': "Beilleszt\xE9s",
      // Spcial Characters
      'Special Characters': 'Speciális karakterek',
      'Latin': 'Latin',
      'Greek': 'Görög',
      'Cyrillic': 'Cirill',
      'Punctuation': 'Központozás',
      'Currency': 'Valuta',
      'Arrows': 'Nyilak',
      'Math': 'Matematikai',
      'Misc': 'Misc',
      // Print.
      'Print': 'Nyomtatás',
      // Spell Checker.
      'Spell Checker': 'Helyesírás-ellenőrző',
      // Help
      'Help': 'Segítség',
      'Shortcuts': 'Hivatkozások',
      'Inline Editor': 'Inline szerkesztő',
      'Show the editor': 'Mutassa meg a szerkesztőt',
      'Common actions': 'Közös cselekvések',
      'Copy': 'Másolat',
      'Cut': 'Vágott',
      'Paste': 'Paszta',
      'Basic Formatting': 'Alap formázás',
      'Increase quote level': 'Növeli az idézet szintjét',
      'Decrease quote level': 'Csökkenti az árazási szintet',
      'Image / Video': 'Kép / videó',
      'Resize larger': 'Nagyobb átméretezés',
      'Resize smaller': 'Kisebb méretűek',
      'Table': 'Asztal',
      'Select table cell': 'Válasszon táblázatcellát',
      'Extend selection one cell': 'Kiterjesztheti a kiválasztást egy cellára',
      'Extend selection one row': 'Szűkítse ki az egy sort',
      'Navigation': 'Navigáció',
      'Focus popup / toolbar': 'Fókusz felugró ablak / eszköztár',
      'Return focus to previous position': 'Visszaáll az előző pozícióra',
      // Embed.ly
      'Embed URL': 'Beágyazott url',
      'Paste in a URL to embed': 'Beilleszteni egy URL-t a beágyazáshoz',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'A beillesztett tartalom egy microsoft szó dokumentumból származik. szeretné megtartani a formátumot vagy tisztítani?',
      'Keep': 'Tart',
      'Clean': 'Tiszta',
      'Word Paste Detected': 'Szópaszta észlelhető',
      // Character Counter
      'Characters': 'Karakterek',
      // More Buttons
      'More Text': 'További szöveg',
      'More Paragraph': 'További bekezdés',
      'More Rich': 'További Gazdag',
      'More Misc': 'További Egyéb'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=hu.js.map
