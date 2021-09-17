/*!
 * froala_editor v4.0.5 (https://www.froala.com/wysiwyg-editor)
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
   * Polish
   */
  FE.LANGUAGE['pl'] = {
    translation: {
      // Place holder
      'Type something': "Wpisz co\u015B",
      // Missing translations
      'Text Color': 'Kolor tekstu',
      'Background Color': 'Kolor tła',
      'Inline Class': 'Klasa inline',
      'Default': 'Domyślna',
      'Lower Alpha': 'Małe litery alfabetu',
      'Lower Greek': 'Małe litery greckie',
      'Lower Roman': 'Małe litery rzymskie',
      'Upper Alpha': 'Wielkie litery alfabetu',
      'Upper Roman': 'Wielkie litery rzymskie',
      'Circle': 'Okrąg',
      'Disc': 'Dysk',
      'Square': 'Kwadrat',
      'Single': 'Pojedynczy',
      'Double': 'Podwójnie',
      'Insert Files': 'Wstaw pliki',
      'Download PDF': 'Pobierz PDF',
      // Basic formatting
      'Bold': 'Pogrubienie',
      'Italic': 'Kursywa',
      'Underline': "Podkre\u015Blenie",
      'Strikethrough': "Przekre\u015Blenie",
      // Main buttons
      'Insert': 'Wstaw',
      'Delete': "Usun\u0105\u0107",
      'Cancel': 'Anuluj',
      'OK': 'Ok',
      'Back': 'Plecy',
      'Remove': "Usun\u0105\u0107",
      'More': 'Jeszcze',
      'Update': 'Aktualizacja',
      'Style': 'Styl',
      // Font
      'Font Family': "Kr\xF3j czcionki",
      'Font Size': 'Rozmiar czcionki',
      // Colors
      'Colors': 'Kolory',
      'Background': "T\u0142o",
      'Text': 'Tekstu',
      'HEX Color': 'Sześciokąt',
      // Paragraphs
      'Paragraph Format': 'Formaty',
      'Normal': 'Normalny',
      'Code': "Kod \u017Ar\xF3d\u0142owy",
      'Heading 1': "Nag\u0142\xF3wek 1",
      'Heading 2': "Nag\u0142\xF3wek 2",
      'Heading 3': "Nag\u0142\xF3wek 3",
      'Heading 4': "Nag\u0142\xF3wek 4",
      // Style
      'Paragraph Style': 'Styl akapitu',
      'Inline Style': 'Stylu zgodna',
      // Alignment
      'Align': "Wyr\xF3wnaj",
      'Align Left': "Wyr\xF3wnaj do lewej",
      'Align Center': "Wyr\xF3wnaj do \u015Brodka",
      'Align Right': "Wyr\xF3wnaj do prawej",
      'Align Justify': 'Do lewej i prawej',
      'None': "\u017Baden",
      // Lists
      'Ordered List': "Uporz\u0105dkowana lista",
      'Unordered List': "Lista nieuporz\u0105dkowana",
      // Indent
      'Decrease Indent': "Zmniejsz wci\u0119cie",
      'Increase Indent': "Zwi\u0119ksz wci\u0119cie",
      // Links
      'Insert Link': 'Wstaw link',
      'Open in new tab': "Otw\xF3rz w nowej karcie",
      'Open Link': "Otw\xF3rz link",
      'Edit Link': 'Link edytuj',
      'Unlink': "Usu\u0144 link",
      'Choose Link': 'Wybierz link',
      // Images
      'Insert Image': 'Wstaw obrazek',
      'Upload Image': "Za\u0142aduj obrazek",
      'By URL': 'Przez URL',
      'Browse': "Przegl\u0105danie",
      'Drop image': "Upu\u015Bci\u0107 obraz",
      'or click': 'lub kliknij',
      'Manage Images': "Zarz\u0105dzanie zdj\u0119ciami",
      'Loading': "\u0141adowanie",
      'Deleting': 'Usuwanie',
      'Tags': 'Tagi',
      'Are you sure? Image will be deleted.': 'Czy na pewno? Obraz zostanie skasowany.',
      'Replace': "Zast\u0105pi\u0107",
      'Uploading': 'Zamieszczanie',
      'Loading image': "\u0141adowanie obrazek",
      'Display': 'Wystawa',
      'Inline': 'Zgodna',
      'Break Text': "Z\u0142ama\u0107 tekst",
      'Alternative Text': 'Tekst alternatywny',
      'Change Size': "Zmie\u0144 rozmiar",
      'Width': "Szeroko\u015B\u0107",
      'Height': "Wysoko\u015B\u0107",
      'Something went wrong. Please try again.': "Co\u015B posz\u0142o nie tak. Prosz\u0119 spr\xF3buj ponownie.",
      'Image Caption': 'Podpis obrazu',
      'Advanced Edit': 'Zaawansowana edycja',
      // Video
      'Insert Video': 'Wstaw wideo',
      'Embedded Code': 'Kod osadzone',
      'Paste in a video URL': 'Wklej adres URL filmu',
      'Drop video': 'Upuść wideo',
      'Your browser does not support HTML5 video.': 'Twoja przeglądarka nie obsługuje wideo html5.',
      'Upload Video': 'Prześlij wideo',
      // Tables
      'Insert Table': "Wstaw tabel\u0119",
      'Table Header': "Nag\u0142\xF3wek tabeli",
      'Remove Table': "Usu\u0144 tabel\u0119",
      'Table Style': 'Styl tabeli',
      'Horizontal Align': "Wyr\xF3wnaj poziomy",
      'Row': 'Wiersz',
      'Insert row above': 'Wstaw wiersz przed',
      'Insert row below': 'Wstaw wiersz po',
      'Delete row': "Usu\u0144 wiersz",
      'Column': 'Kolumna',
      'Insert column before': "Wstaw kolumn\u0119 przed",
      'Insert column after': "Wstaw kolumn\u0119 po",
      'Delete column': "Usu\u0144 kolumn\u0119",
      'Cell': "Kom\xF3rka",
      'Merge cells': "\u0141\u0105cz kom\xF3rki",
      'Horizontal split': "Podzia\u0142 poziomy",
      'Vertical split': "Podzia\u0142 pionowy",
      'Cell Background': "T\u0142a kom\xF3rek",
      'Vertical Align': "Pionowe wyr\xF3wnanie",
      'Top': 'Top',
      'Middle': "\u015Arodkowy",
      'Bottom': 'Dno',
      'Align Top': "Wyr\xF3wnaj do g\xF3ry",
      'Align Middle': "Wyr\xF3wnaj \u015Brodku",
      'Align Bottom': "Wyr\xF3wnaj do do\u0142u",
      'Cell Style': "Styl kom\xF3rki",
      // Files
      'Upload File': "Prze\u015Blij plik",
      'Drop file': "Upu\u015Bci\u0107 plik",
      // Emoticons
      'Emoticons': 'Emotikony',
      'Grinning face': "Z u\u015Bmiechem twarz",
      'Grinning face with smiling eyes': "Z u\u015Bmiechem twarz z u\u015Bmiechni\u0119tymi oczami",
      'Face with tears of joy': "Twarz ze \u0142zami rado\u015Bci",
      'Smiling face with open mouth': "U\u015Bmiechni\u0119ta twarz z otwartymi ustami",
      'Smiling face with open mouth and smiling eyes': "U\u015Bmiechni\u0119ta twarz z otwartymi ustami i u\u015Bmiechni\u0119te oczy",
      'Smiling face with open mouth and cold sweat': "U\u015Bmiechni\u0119ta twarz z otwartymi ustami i zimny pot",
      'Smiling face with open mouth and tightly-closed eyes': "U\u015Bmiechni\u0119ta twarz z otwartymi ustami i szczelnie zamkni\u0119tych oczu",
      'Smiling face with halo': "U\u015Bmiechni\u0119ta twarz z halo",
      'Smiling face with horns': "U\u015Bmiechni\u0119ta twarz z rogami",
      'Winking face': "Mrugaj\u0105ca twarz",
      'Smiling face with smiling eyes': "U\u015Bmiechni\u0119ta twarz z u\u015Bmiechni\u0119tymi oczami",
      'Face savoring delicious food': "Twarz smakuj\u0105 c pyszne jedzenie",
      'Relieved face': "Z ulg\u0105  twarz",
      'Smiling face with heart-shaped eyes': "U\u015Bmiechni\u0119ta twarz z oczami w kszta\u0142cie serca",
      'Smiling face with sunglasses': "U\u015Bmiechni\u0119ta twarz z okulary",
      'Smirking face': 'Zadowolony z siebie twarz',
      'Neutral face': 'Neutralny twarzy',
      'Expressionless face': 'Bezwyrazowy twarzy',
      'Unamused face': 'Nie rozbawiony twarzy',
      'Face with cold sweat': 'Zimny pot z twarzy',
      'Pensive face': "Zamy\u015Blona twarz",
      'Confused face': "Myli\u0107 twarzy",
      'Confounded face': "Ha\u0144ba twarz",
      'Kissing face': "Ca\u0142owanie twarz",
      'Face throwing a kiss': "Twarz rzucaj\u0105c poca\u0142unek",
      'Kissing face with smiling eyes': "Ca\u0142owanie twarz z u\u015Bmiechni\u0119tymi oczami",
      'Kissing face with closed eyes': "Ca\u0142owanie twarz z zamkni\u0119tymi oczami",
      'Face with stuck out tongue': "Twarz z j\u0119zyka stercza\u0142y",
      'Face with stuck out tongue and winking eye': "Twarz z stercza\u0142y j\u0119zyka i mrugaj\u0105c okiem",
      'Face with stuck out tongue and tightly-closed eyes': "Twarz z stercza\u0142y j\u0119zyka i szczelnie zamkni\u0119tych oczu",
      'Disappointed face': 'Rozczarowany twarzy',
      'Worried face': 'Martwi twarzy',
      'Angry face': 'Gniewnych twarzy',
      'Pouting face': "D\u0105sy twarzy",
      'Crying face': "P\u0142acz\u0105cy",
      'Persevering face': "Wytrwa\u0142a twarz",
      'Face with look of triumph': 'Twarz z wyrazem triumfu',
      'Disappointed but relieved face': "Rozczarowany ale ulg\u0119 twarz",
      'Frowning face with open mouth': "Krzywi\u0105c twarz z otwartymi ustami",
      'Anguished face': 'Bolesna twarz',
      'Fearful face': 'W obawie twarzy',
      'Weary face': "Zm\u0119czona twarz",
      'Sleepy face': "Je\u017Adziec bez twarzy",
      'Tired face': "Zm\u0119czonej twarzy",
      'Grimacing face': "Skrzywi\u0142 twarz",
      'Loudly crying face': "G\u0142o\u015Bno p\u0142aka\u0107 twarz",
      'Face with open mouth': 'twarz z otwartymi ustami',
      'Hushed face': "Uciszy\u0142 twarzy",
      'Face with open mouth and cold sweat': 'Twarz z otwartymi ustami i zimny pot',
      'Face screaming in fear': 'Twarz z krzykiem w strachu',
      'Astonished face': 'Zdziwienie twarzy',
      'Flushed face': 'Zaczerwienienie twarzy',
      'Sleeping face': "\u015Api\u0105ca twarz",
      'Dizzy face': "Zawroty g\u0142owy twarzy",
      'Face without mouth': 'Twarz bez usta',
      'Face with medical mask': "Twarz\u0105 w medycznych maski",
      // Line breaker
      'Break': "Z\u0142ama\u0107",
      // Math
      'Subscript': 'Indeks dolny',
      'Superscript': "Indeks g\xF3rny",
      // Full screen
      'Fullscreen': "Pe\u0142ny ekran",
      // Horizontal line
      'Insert Horizontal Line': "Wstaw lini\u0119 poziom\u0105",
      // Clear formatting
      'Clear Formatting': "Usu\u0144 formatowanie",
      // Save
      'Save': "Zapisa\u0107",
      // Undo, redo
      'Undo': 'Cofnij',
      'Redo': "Pon\xF3w",
      // Select all
      'Select All': 'Zaznacz wszystko',
      // Code view
      'Code View': 'Widok kod',
      // Quote
      'Quote': 'Cytat',
      'Increase': 'Wzrost',
      'Decrease': 'Zmniejszenie',
      // Quick Insert
      'Quick Insert': 'Szybkie wstaw',
      // Spcial Characters
      'Special Characters': 'Znaki specjalne',
      'Latin': 'Łacina',
      'Greek': 'Grecki',
      'Cyrillic': 'Cyrylica',
      'Punctuation': 'Interpunkcja',
      'Currency': 'Waluta',
      'Arrows': 'Strzałki',
      'Math': 'Matematyka',
      'Misc': 'Misc',
      // Print.
      'Print': 'Wydrukować',
      // Spell Checker.
      'Spell Checker': 'Sprawdzanie pisowni',
      // Help
      'Help': 'Wsparcie',
      'Shortcuts': 'Skróty',
      'Inline Editor': 'Edytor w wierszu',
      'Show the editor': 'Pokazać edytor',
      'Common actions': 'Wspólne działania',
      'Copy': 'Kopiuj',
      'Cut': 'Ciąć',
      'Paste': 'Pasta',
      'Basic Formatting': 'Podstawowe formatowanie',
      'Increase quote level': 'Zwiększyć poziom notowań',
      'Decrease quote level': 'Zmniejszyć poziom notowań',
      'Image / Video': 'Obraz / wideo',
      'Resize larger': 'Zmienić rozmiar większy',
      'Resize smaller': 'Zmienić rozmiar mniejszy',
      'Table': 'Stół',
      'Select table cell': 'Wybierz komórkę tabeli',
      'Extend selection one cell': 'Przedłużyć wybór jednej komórki',
      'Extend selection one row': 'Przedłużyć wybór jednego rzędu',
      'Navigation': 'Nawigacja',
      'Focus popup / toolbar': 'Focus popup / toolbar',
      'Return focus to previous position': 'Powrót do poprzedniej pozycji',
      // Embed.ly
      'Embed URL': 'Osadzaj url',
      'Paste in a URL to embed': 'Wklej w adresie URL do osadzenia',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'Wklejana treść pochodzi z programu Microsoft Word. Czy chcesz zachować formatowanie czy wkleić jako zwykły tekst?',
      'Keep': 'Zachowaj formatowanie',
      'Clean': 'Wklej jako tekst',
      'Word Paste Detected': 'Wykryto sformatowany tekst',
      // Character Counter
      'Characters': 'Znaki',
      // More Buttons
      'More Text': 'Więcej Tekst',
      'More Paragraph': 'Więcej Ustęp',
      'More Rich': 'Więcej Bogaty',
      'More Misc': 'Więcej Misc'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=pl.js.map
