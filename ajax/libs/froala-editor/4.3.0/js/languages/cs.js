/*!
 * froala_editor v4.3.0 (https://www.froala.com/wysiwyg-editor)
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
   * Czech
   */
  FE.LANGUAGE['cs'] = {
    translation: {
      // Place holder
      'Type something': 'Napište něco',
      // Basic formatting
      'Bold': 'Tučné',
      'Italic': 'Kurzíva',
      'Underline': 'Podtržené',
      'Strikethrough': 'Přeškrtnuté',
      // Main buttons
      'Insert': 'Vložit',
      'Delete': 'Vymazat',
      'Cancel': 'Zrušit',
      'OK': 'OK',
      'Back': 'Zpět',
      'Remove': 'Odstranit',
      'More': 'Více',
      'Update': 'Aktualizovat',
      'Style': 'Styl',
      // Font
      'Font Family': 'Typ písma',
      'Font Size': 'Velikost písma',
      // Colors
      'Colors': 'Barvy',
      'Background': 'Pozadí',
      'Text': 'Písmo',
      'HEX Color': 'Hex Barvy',
      // Paragraphs
      'Paragraph Format': 'Formát odstavce',
      'Normal': 'Normální',
      'Code': 'Kód',
      'Heading 1': 'Nadpis 1',
      'Heading 2': 'Nadpis 2',
      'Heading 3': 'Nadpis 3',
      'Heading 4': 'Nadpis 4',
      // Style
      'Paragraph Style': 'Styl odstavce',
      'Inline Style': 'Styl řádku',
      // Alignment
      'Align': 'Zarovnání',
      'Align Left': 'Zarovnat vlevo',
      'Align Center': 'Zarovnat na střed',
      'Align Right': 'Zarovnat vpravo',
      'Align Justify': 'Zarovnat do bloku',
      'None': 'Žádné',
      // Lists
      'Ordered List': 'Číslovaný seznam',
      'Default': 'Výchozí',
      'Lower Alpha': 'Nižší alfa',
      'Lower Greek': 'Nižší řečtina',
      'Lower Roman': 'Nižší římský',
      'Upper Alpha': 'Horní alfa',
      'Upper Roman': 'Horní římský',
      'Unordered List': 'Nečíslovaný seznam',
      'Circle': 'Kruh',
      'Disc': 'Disk',
      'Square': 'Čtverec',
      // Line height
      'Line Height': 'Výška řádku',
      'Single': 'Jednojitá',
      'Double': 'Dvojitá',
      // Indent
      'Decrease Indent': 'Zmenšit odsazení',
      'Increase Indent': 'Zvětšit odsazení',
      // Links
      'Insert Link': 'Vložit odkaz',
      'Open in new tab': 'Otevřít v nové záložce',
      'Open Link': 'Otevřít odkaz',
      'Edit Link': 'Upravit odkaz',
      'Unlink': 'Odstranit odkaz',
      'Choose Link': 'Zvolte odkaz',
      // Images
      'Insert Image': 'Vložit obrázek',
      'Upload Image': 'Nahrát obrázek',
      'By URL': 'Podle URL',
      'Browse': 'Procházet',
      'Drop image': 'Přetáhněte sem obrázek',
      'or click': 'nebo zde klepněte',
      'Manage Images': 'Správa obrázků',
      'Loading': 'Načítání',
      'Deleting': 'Odstranění',
      'Tags': 'Značky',
      'Are you sure? Image will be deleted.': 'Určitě? Obrázek bude smazán.',
      'Replace': 'Nahradit',
      'Uploading': 'Nahrávání',
      'Loading image': 'Obrázek se načítá',
      'Display': 'Zobrazit',
      'Inline': 'Inline',
      'Break Text': 'Zalomení textu',
      'Alternative Text': 'Alternativní text',
      'Change Size': 'Změnit velikost',
      'Width': 'Šířka',
      'Height': 'Výška',
      'Something went wrong. Please try again.': 'Něco se pokazilo. Prosím zkuste to znovu.',
      'Image Caption': 'Titulek obrázku',
      'Advanced Edit': 'Pokročilá úprava',
      // Video
      'Insert Video': 'Vložit video',
      'Embedded Code': 'Vložený kód',
      'Paste in a video URL': 'Vložit adresu URL videa',
      'Drop video': 'Přetáhněte sem video',
      'Your browser does not support HTML5 video.': 'Váš prohlížeč nepodporuje HTML5 video.',
      'Upload Video': 'Nahrát video',
      // Tables
      'Insert Table': 'Vložit tabulku',
      'Table Header': 'Hlavička tabulky',
      'Remove Table': 'Odstranit tabulku',
      'Table Style': 'Styl tabulky',
      'Horizontal Align': 'Horizontální zarovnání',
      'Row': 'Řádek',
      'Insert row above': 'Vložit řádek nad',
      'Insert row below': 'Vložit řádek pod',
      'Delete row': 'Smazat řádek',
      'Column': 'Sloupec',
      'Insert column before': 'Vložit sloupec vlevo',
      'Insert column after': 'Vložit sloupec vpravo',
      'Delete column': 'Smazat sloupec',
      'Cell': 'Buňka',
      'Merge cells': 'Sloučit buňky',
      'Horizontal split': 'Horizontální rozdělení',
      'Vertical split': 'Vertikální rozdělení',
      'Cell Background': 'Pozadí buňky',
      'Vertical Align': 'Vertikální zarovnání',
      'Top': 'Vrch',
      'Middle': 'Střed',
      'Bottom': 'Spodek',
      'Align Top': 'Zarovnat nahoru',
      'Align Middle': 'Zarovnat nastřed',
      'Align Bottom': 'Zarovnat naspodek',
      'Cell Style': 'Styl buňky',
      // Files
      'Upload File': 'Nahrát soubor',
      'Drop file': 'Přetáhněte sem soubor',
      // Emoticons
      'Emoticons': 'Emotikony',
      'Grinning face': 'Tvář s úsměvem',
      'Grinning face with smiling eyes': 'Obličej s úsměvem a očima s úsměvem',
      'Face with tears of joy': 'Tvář se slzami radosti',
      'Smiling face with open mouth': 'Usmívající se obličej s otevřenými ústy',
      'Smiling face with open mouth and smiling eyes': 'Usmívající se obličej s otevřenými ústy a očima s úsměvem',
      'Smiling face with open mouth and cold sweat': 'Usmívající se tvář s otevřenými ústy a studeným potem',
      'Smiling face with open mouth and tightly-closed eyes': 'Usmívající se tvář s otevřenými ústy a těsně zavřenýma očima',
      'Smiling face with halo': 'Usmívající se obličej se svatozáří',
      'Smiling face with horns': 'Usmívající se obličej s rohy',
      'Winking face': 'Mrkání tvář',
      'Smiling face with smiling eyes': 'Usmívající se obličej s očima s úsměvem',
      'Face savoring delicious food': 'Tvář vychutnávajíci chutné jídlo',
      'Relieved face': 'Ulevená tvář',
      'Smiling face with heart-shaped eyes': 'Usmívající se tvář s očima ve tvaru srdce',
      'Smiling face with sunglasses': 'Usmívající se tvář se slunečními brýlemi',
      'Smirking face': 'Uculijíci tvář',
      'Neutral face': 'Neutrální tvář',
      'Expressionless face': 'Bezvýrazný obličej',
      'Unamused face': 'Nepobavená tvář',
      'Face with cold sweat': 'Tvář se studeným potem',
      'Pensive face': 'Zamyšlený obličej',
      'Confused face': 'Zmatená tvář',
      'Confounded face': 'Naštvaná tvář',
      'Kissing face': 'Líbajíci se tvář',
      'Face throwing a kiss': 'Tvář posílajíci polibek',
      'Kissing face with smiling eyes': 'Líbajíci obličej s očima s úsměvem',
      'Kissing face with closed eyes': 'Líbajíci tvář se zavřenýma očima',
      'Face with stuck out tongue': 'Tvář s trčejícim jazykem',
      'Face with stuck out tongue and winking eye': 'Tvář s trčejícim jazykem a mrkajícima očima',
      'Face with stuck out tongue and tightly-closed eyes': 'Tvář s trčejícim jazykem s těsně zavřenýma očima',
      'Disappointed face': 'Zklamaná tvář',
      'Worried face': 'Bojíci se tvář',
      'Angry face': 'Rozzlobená tvář',
      'Pouting face': 'Našpulená tvář',
      'Crying face': 'Pláčíci tvář',
      'Persevering face': 'Vytrvalá tvář',
      'Face with look of triumph': 'Tvář s výrazem triumfu',
      'Disappointed but relieved face': 'Zklamaná ale ulevená tvář',
      'Frowning face with open mouth': 'Zamračená obličej s otevřenými ústy',
      'Anguished face': 'Úzkostná tvář',
      'Fearful face': 'Strašná tvář',
      'Weary face': 'Unavená tvář',
      'Sleepy face': 'Ospalá tvář',
      'Tired face': 'Unavená tvář',
      'Grimacing face': 'Šklebijíci se tvář',
      'Loudly crying face': 'Hlasitě pláčící tvář',
      'Face with open mouth': 'Obličej s otevřenými ústy',
      'Hushed face': 'Tlumená tvář',
      'Face with open mouth and cold sweat': 'Obličej s otevřenými ústy a studeným potem',
      'Face screaming in fear': 'Tvář křičí ve strachu',
      'Astonished face': 'Tvář v úžasu',
      'Flushed face': 'Zarudnutí v obličeji',
      'Sleeping face': 'Spící tvář',
      'Dizzy face': 'Tvář se závratí',
      'Face without mouth': 'Tvář bez úst',
      'Face with medical mask': 'Tvář s lékařskou maskou',
      // Line breaker
      'Break': 'Zalomení',
      // Math
      'Subscript': 'Dolní index',
      'Superscript': 'Horní index',
      // Full screen
      'Fullscreen': 'Celá obrazovka',
      // Horizontal line
      'Insert Horizontal Line': 'Vložit vodorovnou čáru',
      // Clear formatting
      'Clear Formatting': 'Vymazat formátování',
      // Save
      'Save': 'Uložit',
      // Undo, redo
      'Undo': 'Zpět',
      'Redo': 'Znovu',
      // Select all
      'Select All': 'Vybrat vše',
      // Code view
      'Code View': 'Zobrazení kódu',
      // Quote
      'Quote': 'Citát',
      'Increase': 'Navýšení',
      'Decrease': 'Snížení',
      // Quick Insert
      'Quick Insert': 'Rychlá vložka',
      // Spcial Characters
      'Special Characters': 'Speciální znaky',
      'Latin': 'Latinské',
      'Greek': 'Řecké',
      'Cyrillic': 'Cyrilika',
      'Punctuation': 'Interpunkce',
      'Currency': 'Měna',
      'Arrows': 'Šipky',
      'Math': 'Matematika',
      'Misc': 'Různé',
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
      'Cut': 'Vystřihnout',
      'Paste': 'Vložit',
      'Basic Formatting': 'Základní formátování',
      'Increase quote level': 'Zvýšení kvóty',
      'Decrease quote level': 'Snížení kvóty',
      'Image / Video': 'Obrázek / Video',
      'Resize larger': 'Zvětšit',
      'Resize smaller': 'Zmenšit',
      'Table': 'Tabulka',
      'Select table cell': 'Vyberte buňku tabulky',
      'Extend selection one cell': 'Rozšířit výběr o jednu buňku',
      'Extend selection one row': 'Rozšířit výběr o jeden řádek',
      'Navigation': 'Navigace',
      'Focus popup / toolbar': 'Predvybrat popup / panel nástrojů',
      'Return focus to previous position': 'Návrat na předchozí pozici',
      // Embed.ly
      'Embed URL': 'Vložte url',
      'Paste in a URL to embed': 'Vložit adresu URL',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'Vložený obsah pochází z dokumentu Microsoft Word. Chcete formát uchovat nebo jej vyčistit?',
      'Keep': 'Uchovat',
      'Clean': 'Vyčistit',
      'Word Paste Detected': 'Detekovaný obsah dokumentu Word'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=cs.js.map
