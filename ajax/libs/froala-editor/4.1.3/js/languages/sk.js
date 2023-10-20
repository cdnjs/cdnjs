/*!
 * froala_editor v4.1.3 (https://www.froala.com/wysiwyg-editor)
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
   * Slovak
   */
  FE.LANGUAGE['sk'] = {
    translation: {
      // Place holder
      'Type something': 'Napíšte hocičo',
      // Basic formatting
      'Bold': 'Tučné',
      'Italic': 'Kurzíva',
      'Underline': 'Podčiarknuté',
      'Strikethrough': 'Preškrtnuté',
      // Main buttons
      'Insert': 'Vložiť',
      'Delete': 'Vymazať',
      'Cancel': 'Zrušiť',
      'OK': 'OK',
      'Back': 'Späť',
      'Remove': 'Odstrániť',
      'More': 'Viac',
      'Update': 'Aktualizovať',
      'Style': 'Štýl',
      // Font
      'Font Family': 'Typ písma',
      'Font Size': 'Veľkosť písma',
      // Colors
      'Colors': 'Farby',
      'Background': 'Pozadie',
      'Text': 'Text',
      'HEX Color': 'Hex Farby',
      // Paragraphs
      'Paragraph Format': 'Formát odstavca',
      'Normal': 'Normálne',
      'Code': 'Kód',
      'Heading 1': 'Nadpis 1',
      'Heading 2': 'Nadpis 2',
      'Heading 3': 'Nadpis 3',
      'Heading 4': 'Nadpis 4',
      // Style
      'Paragraph Style': 'Štýl odstavca',
      'Inline Style': 'Inline štýl',
      // Alignment
      'Align': 'Zarovnanie',
      'Align Left': 'Zarovnať vľavo',
      'Align Center': 'Zarovnať na stred',
      'Align Right': 'Zarovnať vpravo',
      'Align Justify': 'Zarovnať do bloku',
      'None': 'Žiadne',
      // Lists
      'Ordered List': 'Číslovaný zoznam',
      'Default': 'Štandardné',
      'Lower Alpha': 'Nižšia alfa',
      'Lower Greek': 'Nižšie grécke',
      'Lower Roman': 'Nižší roman',
      'Upper Alpha': 'Horná alfa',
      'Upper Roman': 'Horný román',
      'Unordered List': 'Nečíslovaný zoznam',
      'Circle': 'Kruh',
      'Disc': 'Disk',
      'Square': 'Štvorec',
      // Line height
      'Line Height': 'Výška riadku',
      'Single': 'Jednojitá',
      'Double': 'Dvojitá',
      // Indent
      'Decrease Indent': 'Zmenšiť odsadenie',
      'Increase Indent': 'Zväčšiť odsadenie',
      // Links
      'Insert Link': 'Vložiť odkaz',
      'Open in new tab': 'Otvoriť v novom okne',
      'Open Link': 'Otvoriť odkaz',
      'Edit Link': 'Upraviť odkaz',
      'Unlink': 'Odstrániť odkaz',
      'Choose Link': 'Vyberte odkaz',
      // Images
      'Insert Image': 'Vložiť obrázok',
      'Upload Image': 'Nahrať obrázok',
      'By URL': 'Z URL adresy',
      'Browse': 'Vybrať',
      'Drop image': 'Pretiahnite obrázok do tohto miesta',
      'or click': 'alebo kliknite a vložte',
      'Manage Images': 'Správa obrázkov',
      'Loading': 'Nahrávam',
      'Deleting': 'Odstraňujem',
      'Tags': 'Značky',
      'Are you sure? Image will be deleted.': 'Ste si istý? Obrázok bude odstranený.',
      'Replace': 'Vymeniť',
      'Uploading': 'Nahrávam',
      'Loading image': 'Obrázok se načítavá',
      'Display': 'Zobraziť',
      'Inline': 'Inline',
      'Break Text': 'Zalomenie textu',
      'Alternative Text': 'Alternatívny text',
      'Change Size': 'Zmeniť veľkosť',
      'Width': 'Šírka',
      'Height': 'Výška',
      'Something went wrong. Please try again.': 'Niečo sa pokazilo. Prosím, skúste to znova.',
      'Image Caption': 'Titulok obrázka',
      'Advanced Edit': 'Pokročilá úprava',
      // Video
      'Insert Video': 'Vložiť video',
      'Embedded Code': 'Vložený kód',
      'Paste in a video URL': 'Vložte do adresy URL videa',
      'Drop video': 'Drop video',
      'Your browser does not support HTML5 video.': 'Váš prehliadač nepodporuje video html5.',
      'Upload Video': 'Nahrať video',
      // Tables
      'Insert Table': 'Vložiť tabuľku',
      'Table Header': 'Hlavička tabuľky',
      'Remove Table': 'Odstraniť tabuľku',
      'Table Style': 'Štýl tabuľky',
      'Horizontal Align': 'Horizontálne zarovnanie',
      'Row': 'Riadok',
      'Insert row above': 'Vložiť riadok nad',
      'Insert row below': 'Vložiť riadok pod',
      'Delete row': 'Odstraniť riadok',
      'Column': 'Stĺpec',
      'Insert column before': 'Vložiť stĺpec vľavo',
      'Insert column after': 'Vložiť stĺpec vpravo',
      'Delete column': 'Odstraniť stĺpec',
      'Cell': 'Bunka',
      'Merge cells': 'Zlúčiť bunky',
      'Horizontal split': 'Horizontálne rozdelenie',
      'Vertical split': 'Vertikálne rozdelenie',
      'Cell Background': 'Pozadie bunky',
      'Vertical Align': 'Vertikálne zarovnání',
      'Top': 'Hore',
      'Middle': 'Vstrede',
      'Bottom': 'Dole',
      'Align Top': 'Zarovnat na hor',
      'Align Middle': 'Zarovnat na stred',
      'Align Bottom': 'Zarovnat na spodok',
      'Cell Style': 'Štýl bunky',
      // Files
      'Upload File': 'Nahrať súbor',
      'Drop file': 'Vložte súbor sem',
      // Emoticons
      'Emoticons': 'Emotikony',
      'Grinning face': 'Tvár s úsmevom',
      'Grinning face with smiling eyes': 'Tvár s úsmevom a očami',
      'Face with tears of joy': 'Tvár so slzamy radosti',
      'Smiling face with open mouth': 'Usmievajúca sa tvár s otvorenými ústami',
      'Smiling face with open mouth and smiling eyes': 'Usmievajúca sa tvár s otvorenými ústami a očami',
      'Smiling face with open mouth and cold sweat': 'Usmievajúca sa tvár s otvorenými ústami a studeným potom',
      'Smiling face with open mouth and tightly-closed eyes': 'Usmievajúca sa tvár s otvorenými ústami a zavretými očami',
      'Smiling face with halo': 'Usmievajúca sa tvár so svätožiarou',
      'Smiling face with horns': 'Usmievajúca sa tvár s rohami',
      'Winking face': 'Mrkajúca tvár',
      'Smiling face with smiling eyes': 'Usmievajúca sa tvár s usmievajucími očami',
      'Face savoring delicious food': 'Tvár vychutnávajúca si chutné jedlo',
      'Relieved face': 'Spokojná tvár',
      'Smiling face with heart-shaped eyes': 'Usmievajúca sa tvár s očami v tvare srdca',
      'Smiling face with sunglasses': 'Usmievajúca sa tvár so slnečnými okuliarmi',
      'Smirking face': 'Uškŕňajúca sa tvár',
      'Neutral face': 'Neutrálna tvaŕ',
      'Expressionless face': 'Bezvýrazná tvár',
      'Unamused face': 'Nepobavená tvár',
      'Face with cold sweat': 'Tvár so studeným potom',
      'Pensive face': 'Zamyslená tvár',
      'Confused face': 'Zmetená tvár',
      'Confounded face': 'Nahnevaná tvár',
      'Kissing face': 'Bozkavajúca tvár',
      'Face throwing a kiss': 'Tvár hadzajúca pusu',
      'Kissing face with smiling eyes': 'Bozkávajúca tvár s očami a úsmevom',
      'Kissing face with closed eyes': 'Bozkávajúca tvár so zavretými očami',
      'Face with stuck out tongue': 'Tvár s vyplazeným jazykom',
      'Face with stuck out tongue and winking eye': 'Mrkajúca tvár s vyplazeným jazykom',
      'Face with stuck out tongue and tightly-closed eyes': 'Tvár s vyplazeným jazykom a privretými očami',
      'Disappointed face': 'Sklamaná tvár',
      'Worried face': 'Obavajúca se tvár',
      'Angry face': 'Nahnevaná tvár',
      'Pouting face': 'Našpulená tvár',
      'Crying face': 'Plačúca tvár',
      'Persevering face': 'Húževnatá tvár',
      'Face with look of triumph': 'Tvár s výrazom víťaza',
      'Disappointed but relieved face': 'Sklamaná ale spokojná tvár',
      'Frowning face with open mouth': 'Zamračená tvár s otvorenými ústami',
      'Anguished face': 'Úzkostná tvár',
      'Fearful face': 'Strachujúca sa tvár',
      'Weary face': 'Unavená tvár',
      'Sleepy face': 'Ospalá tvár',
      'Tired face': 'Unavená tvár',
      'Grimacing face': 'Tvár s grimasou',
      'Loudly crying face': 'Nahlas pláčúca tvár',
      'Face with open mouth': 'Tvár s otvoreným ústami',
      'Hushed face': 'Mlčiaca tvár',
      'Face with open mouth and cold sweat': 'Tvár s otvorenými ústami a studeným potom',
      'Face screaming in fear': 'Tvár kričiaca strachom',
      'Astonished face': 'Tvár v úžase',
      'Flushed face': 'Sčervenanie v tvári',
      'Sleeping face': 'Spiaca tvár',
      'Dizzy face': 'Tvár vyjadrujúca závrat',
      'Face without mouth': 'Tvár bez úst',
      'Face with medical mask': 'Tvár s lekárskou maskou',
      // Line breaker
      'Break': 'Zalomenie',
      // Math
      'Subscript': 'Dolný index',
      'Superscript': 'Horný index',
      // Full screen
      'Fullscreen': 'Celá obrazovka',
      // Horizontal line
      'Insert Horizontal Line': 'Vložiť vodorovnú čiaru',
      // Clear formatting
      'Clear Formatting': 'Vymazať formátovanie',
      // Save
      'Save': 'Uložiť',
      // Undo, redo
      'Undo': 'Späť',
      'Redo': 'Znova',
      // Select all
      'Select All': 'Vybrať všetko',
      // Code view
      'Code View': 'Zobraziť html kód',
      // Quote
      'Quote': 'Citát',
      'Increase': 'Zvýšiť',
      'Decrease': 'Znížiť',
      // Quick Insert
      'Quick Insert': 'Vložiť zrýchlene',
      // Spcial Characters
      'Special Characters': 'Špeciálne znaky',
      'Latin': 'Latinčina',
      'Greek': 'Gréčtina',
      'Cyrillic': 'Cyrilika',
      'Punctuation': 'Interpunkcia',
      'Currency': 'Mena',
      'Arrows': 'Šípky',
      'Math': 'Matematika',
      'Misc': 'Rôzne',
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
      'Paste': 'Vložiť',
      'Basic Formatting': 'Základné formátovanie',
      'Increase quote level': 'Zvýšiť úroveň cenovej ponuky',
      'Decrease quote level': 'Znížiť úroveň cenovej ponuky',
      'Image / Video': 'Obrázok / video',
      'Resize larger': 'Zmena veľkosti',
      'Resize smaller': 'Zmeniť veľkosť',
      'Table': 'Tabuľka',
      'Select table cell': 'Vyberte bunku tabuľky',
      'Extend selection one cell': 'Rozšíriť výber o jednu bunku',
      'Extend selection one row': 'Rozšíriť výber o jeden riadok',
      'Navigation': 'Navigácia',
      'Focus popup / toolbar': 'Predvybrať popup / panel s nástrojmi',
      'Return focus to previous position': 'Vrátiť kurzor na predchádzajúcu pozíciu',
      // Embed.ly
      'Embed URL': 'Vložiť adresu URL',
      'Paste in a URL to embed': 'Vložte adresu URL pre vloženie',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'Vložený obsah vychádza z dokumentu Microsoft Word. Chcete formát zachovať alebo ho vyčistiť?',
      'Keep': 'Zachovať',
      'Clean': 'Vyčistiť',
      'Word Paste Detected': 'Detekované vloženie z Wordu'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=sk.js.map
