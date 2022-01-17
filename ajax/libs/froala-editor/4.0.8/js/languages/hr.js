/*!
 * froala_editor v4.0.8 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2021 Froala Labs
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('froala-editor')) :
  typeof define === 'function' && define.amd ? define(['froala-editor'], factory) :
  (factory(global.FroalaEditor));
}(this, (function (FE) { 'use strict';

  FE = FE && FE.hasOwnProperty('default') ? FE['default'] : FE;

  /**
   * Croatian
   */
  FE.LANGUAGE['hr'] = {
    translation: {
      // Place holder
      'Type something': "Napi\u0161i ne\u0161to",
      // Basic formatting
      'Bold': 'Podebljaj',
      'Italic': 'Kurziv',
      'Underline': 'Podcrtano',
      'Strikethrough': 'Precrtano',
      // Main buttons
      'Insert': 'Umetni',
      'Delete': "Obri\u0161i",
      'Cancel': "Otka\u017Ei",
      'OK': 'U redu',
      'Back': 'Natrag',
      'Remove': 'Ukloni',
      'More': "Vi\u0161e",
      'Update': "A\u017Euriraj",
      'Style': 'Stil',
      // Font
      'Font Family': 'Odaberi font',
      'Font Size': "Veli\u010Dina fonta",
      // Colors
      'Colors': 'Boje',
      'Background': 'Pozadina',
      'Text': 'Tekst',
      'HEX Color': 'Heksadecimalne boje',
      // Paragraphs
      'Paragraph Format': 'Format odlomka',
      'Normal': 'Normalno',
      'Code': 'Izvorni kod',
      'Heading 1': 'Naslov 1',
      'Heading 2': 'Naslov 2',
      'Heading 3': 'Naslov 3',
      'Heading 4': 'Naslov 4',
      // Style
      'Paragraph Style': 'Stil odlomka',
      'Inline Style': 'Stil u liniji',
      // Alignment
      'Align': 'Poravnaj',
      'Align Left': 'Poravnaj lijevo',
      'Align Center': 'Poravnaj po sredini',
      'Align Right': 'Poravnaj desno',
      'Align Justify': 'Obostrano poravnanje',
      'None': 'Nijedan',
      // Lists
      'Ordered List': "Ure\u0111ena lista",
      'Unordered List': "Neure\u0111ena lista",
      // Indent
      'Decrease Indent': 'Uvuci odlomak',
      'Increase Indent': 'Izvuci odlomak',
      // Links
      'Insert Link': 'Umetni link',
      'Open in new tab': 'Otvori u novom prozoru',
      'Open Link': 'Otvori link',
      'Edit Link': 'Uredi link',
      'Unlink': 'Ukloni link',
      'Choose Link': 'Odaberi link',
      // Images
      'Insert Image': 'Umetni sliku',
      'Upload Image': 'Prijenos slike',
      'By URL': 'Prema URL',
      'Browse': 'Odabir',
      'Drop image': 'Ispusti sliku',
      'or click': 'ili odaberi',
      'Manage Images': 'Upravljanje slikama',
      'Loading': "U\u010Ditavanje",
      'Deleting': 'Brisanje',
      'Tags': 'Oznake',
      'Are you sure? Image will be deleted.': "Da li ste sigurni da \u017Eelite obrisati ovu sliku?",
      'Replace': 'Zamijeni',
      'Uploading': 'Prijenos',
      'Loading image': 'Otvaram sliku',
      'Display': "Prika\u017Ei",
      'Inline': 'U liniji',
      'Break Text': 'Odvojeni tekst',
      'Alternative Text': 'Alternativni tekst',
      'Change Size': "Promjena veli\u010Dine",
      'Width': "\u0160irina",
      'Height': 'Visina',
      'Something went wrong. Please try again.': "Ne\u0161to je po\u0161lo po zlu. Molimo poku\u0161ajte ponovno.",
      'Image Caption': 'Opis slike',
      'Advanced Edit': 'Napredno uređivanje',
      // Video
      'Insert Video': 'Umetni video',
      'Embedded Code': "Ugra\u0111eni kod",
      'Paste in a video URL': 'Zalijepite u URL videozapisa',
      'Drop video': 'Ispusti video',
      'Your browser does not support HTML5 video.': 'Vaš preglednik ne podržava HTML video.',
      'Upload Video': 'Prenesi videozapis',
      // Tables
      'Insert Table': 'Umetni tablicu',
      'Table Header': 'Zaglavlje tablice',
      'Remove Table': "Izbri\u0161i tablicu",
      'Table Style': 'Tablica stil',
      'Horizontal Align': 'Horizontalna poravnanje',
      'Row': 'Red',
      'Insert row above': 'Umetni red iznad',
      'Insert row below': 'Umetni red ispod',
      'Delete row': "Obri\u0161i red",
      'Column': 'Stupac',
      'Insert column before': 'Umetni stupac prije',
      'Insert column after': 'Umetni stupac poslije',
      'Delete column': "Obri\u0161i stupac",
      'Cell': 'Polje',
      'Merge cells': 'Spoji polja',
      'Horizontal split': 'Horizontalno razdvajanje polja',
      'Vertical split': 'Vertikalno razdvajanje polja',
      'Cell Background': 'Polje pozadine',
      'Vertical Align': 'Vertikalno poravnanje',
      'Top': 'Vrh',
      'Middle': 'Sredina',
      'Bottom': 'Dno',
      'Align Top': 'Poravnaj na vrh',
      'Align Middle': 'Poravnaj po sredini',
      'Align Bottom': 'Poravnaj na dno',
      'Cell Style': 'Stil polja',
      // Files
      'Upload File': 'Prijenos datoteke',
      'Drop file': 'Ispusti datoteku',
      // Emoticons
      'Emoticons': 'Emotikoni',
      'Grinning face': 'Nacereno lice',
      'Grinning face with smiling eyes': "Nacereno lice s nasmije\u0161enim o\u010Dima",
      'Face with tears of joy': 'Lice sa suzama radosnicama',
      'Smiling face with open mouth': 'Nasmijano lice s otvorenim ustima',
      'Smiling face with open mouth and smiling eyes': "Nasmijano lice s otvorenim ustima i nasmijanim o\u010Dima",
      'Smiling face with open mouth and cold sweat': 'Nasmijano lice s otvorenim ustima i hladnim znojem',
      'Smiling face with open mouth and tightly-closed eyes': "Nasmijano lice s otvorenim ustima i \u010Dvrsto zatvorenih o\u010Diju",
      'Smiling face with halo': 'Nasmijano lice sa aureolom',
      'Smiling face with horns': 'Nasmijano lice s rogovima',
      'Winking face': 'Lice koje namiguje',
      'Smiling face with smiling eyes': "Nasmijano lice s nasmije\u0161enim o\u010Dima",
      'Face savoring delicious food': "Lice koje u\u017Eiva ukusnu hranu",
      'Relieved face': "Lice s olak\u0161anjem",
      'Smiling face with heart-shaped eyes': "Nasmijano lice sa o\u010Dima u obliku srca",
      'Smiling face with sunglasses': "Nasmijano lice sa sun\u010Danim nao\u010Dalama",
      'Smirking face': "Zlokobno nasmije\u0161eno lice",
      'Neutral face': 'Neutralno lice',
      'Expressionless face': "Bezizra\u017Eajno lice",
      'Unamused face': 'Nezainteresirano lice',
      'Face with cold sweat': 'Lice s hladnim znojem',
      'Pensive face': "Zami\u0161ljeno lice",
      'Confused face': 'Zbunjeno lice',
      'Confounded face': 'Zbunjeno lice',
      'Kissing face': 'Lice s poljupcem',
      'Face throwing a kiss': 'Lice koje baca poljubac',
      'Kissing face with smiling eyes': "Lice s poljupcem s nasmije\u0161enim o\u010Dima",
      'Kissing face with closed eyes': "Lice s poljupcem zatvorenih o\u010Diju",
      'Face with stuck out tongue': "Lice s ispru\u017Eenim jezikom",
      'Face with stuck out tongue and winking eye': "Lice s ispru\u017Eenim jezikom koje namiguje",
      'Face with stuck out tongue and tightly-closed eyes': "Lice s ispru\u017Eenim jezikom i \u010Dvrsto zatvorenih o\u010Diju",
      'Disappointed face': "Razo\u010Darano lice",
      'Worried face': 'Zabrinuto lice',
      'Angry face': 'Ljutito lice',
      'Pouting face': 'Nadureno lice',
      'Crying face': 'Uplakano lice',
      'Persevering face': 'Lice s negodovanjem',
      'Face with look of triumph': 'Trijumfalno lice',
      'Disappointed but relieved face': "Razo\u010Darano ali olak\u0161ano lice",
      'Frowning face with open mouth': "Namrgo\u0111eno lice s otvorenim ustima",
      'Anguished face': 'Tjeskobno lice',
      'Fearful face': "Prestra\u0161eno lice",
      'Weary face': 'Umorno lice',
      'Sleepy face': 'Pospano lice',
      'Tired face': 'Umorno lice',
      'Grimacing face': 'Lice sa grimasama',
      'Loudly crying face': "Glasno pla\u010Du\u0107e lice",
      'Face with open mouth': 'Lice s otvorenim ustima',
      'Hushed face': 'Tiho lice',
      'Face with open mouth and cold sweat': 'Lice s otvorenim ustima i hladnim znojem',
      'Face screaming in fear': "Lice koje vri\u0161ti u strahu",
      'Astonished face': "Zaprepa\u0161teno lice",
      'Flushed face': 'Zajapureno lice',
      'Sleeping face': "Spava\u0107e lice",
      'Dizzy face': 'Lice sa vrtoglavicom',
      'Face without mouth': 'Lice bez usta',
      'Face with medical mask': 'Lice s medicinskom maskom',
      // Line breaker
      'Break': 'Odvojeno',
      // Math
      'Subscript': 'Indeks',
      'Superscript': 'Eksponent',
      // Full screen
      'Fullscreen': 'Puni zaslon',
      // Horizontal line
      'Insert Horizontal Line': 'Umetni liniju',
      // Clear formatting
      'Clear Formatting': 'Ukloni oblikovanje',
      // Save
      'Save': "U\u0161tedjeti",
      // Undo, redo
      'Undo': 'Korak natrag',
      'Redo': 'Korak naprijed',
      // Select all
      'Select All': 'Odaberi sve',
      // Code view
      'Code View': 'Pregled koda',
      // Quote
      'Quote': 'Citat',
      'Increase': "Pove\u0107aj",
      'Decrease': 'Smanji',
      // Quick Insert
      'Quick Insert': 'Brzo umetak',
      // Spcial Characters
      'Special Characters': 'Posebni znakovi',
      'Latin': 'Latinski',
      'Greek': 'Grčki',
      'Cyrillic': 'Ćirilica',
      'Punctuation': 'Interpunkcija',
      'Currency': 'Valuta',
      'Arrows': 'Strelice',
      'Math': 'Matematika',
      'Misc': 'Razno',
      // Print.
      'Print': 'Otisak',
      // Spell Checker.
      'Spell Checker': 'Provjeritelj pravopisa',
      // Help
      'Help': 'Pomoć',
      'Shortcuts': 'Prečaci',
      'Inline Editor': 'Inline editor',
      'Show the editor': 'Prikaži urednika',
      'Common actions': 'Zajedničke radnje',
      'Copy': 'Kopirati',
      'Cut': 'Rez',
      'Paste': 'Zalijepiti',
      'Basic Formatting': 'Osnovno oblikovanje',
      'Increase quote level': 'Povećati razinu citata',
      'Decrease quote level': 'Smanjite razinu citata',
      'Image / Video': 'Slika / video',
      'Resize larger': 'Promijenite veličinu većeg',
      'Resize smaller': 'Promijenite veličinu manju',
      'Table': 'Stol',
      'Select table cell': 'Odaberite stolnu ćeliju',
      'Extend selection one cell': 'Proširiti odabir jedne ćelije',
      'Extend selection one row': 'Proširite odabir jednog retka',
      'Navigation': 'Navigacija',
      'Focus popup / toolbar': 'Fokus popup / alatnoj traci',
      'Return focus to previous position': 'Vratiti fokus na prethodnu poziciju',
      // Embed.ly
      'Embed URL': 'Uredi url',
      'Paste in a URL to embed': 'Zalijepite URL da biste ga ugradili',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'Zalijepi sadržaj dolazi iz Microsoft Word dokumenta. Želite li zadržati format ili očistiti?',
      'Keep': 'Zadržati',
      'Clean': 'Čist',
      'Word Paste Detected': 'Otkrivena je zastavica riječi',
      // Character Counter 
      'Characters': 'likovi',
      // More Buttons
      'More Text': 'Više teksta',
      'More Paragraph': 'Više odlomka',
      'More Rich': 'Više bogat',
      'More Misc': 'Više Razno'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=hr.js.map
