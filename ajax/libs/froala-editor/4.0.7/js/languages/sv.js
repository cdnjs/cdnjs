/*!
 * froala_editor v4.0.7 (https://www.froala.com/wysiwyg-editor)
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
   * Swedish
   */
  FE.LANGUAGE['sv'] = {
    translation: {
      // Place holder
      'Type something': "Ange n\xE5got",
      // Basic formatting
      'Bold': 'Fetstil',
      'Italic': 'Kursiv stil',
      'Underline': 'Understruken',
      'Strikethrough': 'Genomstruken',
      // Main buttons
      'Insert': 'Infoga',
      'Delete': 'Radera',
      'Cancel': 'Avbryt',
      'OK': 'Ok',
      'Back': 'Tillbaka',
      'Remove': 'Ta bort',
      'More': 'Mer',
      'Update': 'Uppdatera',
      'Style': 'Stil',
      // Font
      'Font Family': 'Teckensnitt',
      'Font Size': 'Teckenstorlek',
      // Colors
      'Colors': "F\xE4rger",
      'Background': 'Bakgrund',
      'Text': 'Text',
      'HEX Color': 'Hex färg',
      // Paragraphs
      'Paragraph Format': 'Format',
      'Normal': 'Normal',
      'Code': 'Kod',
      'Heading 1': 'Rubrik 1',
      'Heading 2': 'Rubrik 2',
      'Heading 3': 'Rubrik 3',
      'Heading 4': 'Rubrik 4',
      // Style
      'Paragraph Style': 'Styckesformat',
      'Inline Style': 'Infogad stil',
      // Alignment
      'Align': 'Justera',
      'Align Left': 'Vänsterjustera',
      'Align Center': 'Centrera',
      'Align Right': 'Högerjustera',
      'Align Justify': 'Justera',
      'None': 'Inget',
      // Lists
      'Ordered List': 'Ordnad lista',
      'Unordered List': 'Oordnad lista',
      // Indent
      'Decrease Indent': 'Minska indrag',
      'Increase Indent': "\xD6ka indrag",
      // Links
      'Insert Link': "Infoga l\xE4nk",
      'Open in new tab': "\xD6ppna i ny flik",
      'Open Link': "\xD6ppna l\xE4nk",
      'Edit Link': "Redigera l\xE4nk",
      'Unlink': "Ta bort l\xE4nk",
      'Choose Link': "V\xE4lj l\xE4nk",
      // Images
      'Insert Image': 'Infoga bild',
      'Upload Image': 'Ladda upp en bild',
      'By URL': 'Genom URL',
      'Browse': "Bl\xE4ddra",
      'Drop image': "Sl\xE4pp bild",
      'or click': 'eller klicka',
      'Manage Images': 'Hantera bilder',
      'Loading': 'Laddar',
      'Deleting': 'Raderar',
      'Tags': 'Etiketter',
      'Are you sure? Image will be deleted.': "\xC4r du s\xE4ker? Bild kommer att raderas.",
      'Replace': "Ers\xE4tt",
      'Uploading': 'Laddar upp',
      'Loading image': 'Laddar bild',
      'Display': 'Visa',
      'Inline': 'I linje',
      'Break Text': 'Bryt text',
      'Alternative Text': 'Alternativ text',
      'Change Size': "\xC4ndra storlek",
      'Width': 'Bredd',
      'Height': "H\xF6jd",
      'Something went wrong. Please try again.': "N\xE5got gick fel. Var god f\xF6rs\xF6k igen.",
      'Image Caption': 'Bildtext',
      'Advanced Edit': 'Avancerad redigering',
      // Video
      'Insert Video': 'Infoga video',
      'Embedded Code': "Inb\xE4ddad kod",
      'Paste in a video URL': 'Klistra in i en video url',
      'Drop video': 'Släpp video',
      'Your browser does not support HTML5 video.': 'Din webbläsare stöder inte html5-video.',
      'Upload Video': 'Ladda upp video',
      // Tables
      'Insert Table': 'Infoga tabell',
      'Table Header': 'Tabell huvud',
      'Remove Table': 'Ta bort tabellen',
      'Table Style': 'Tabellformat',
      'Horizontal Align': 'Horisontell justering',
      'Row': 'Rad',
      'Insert row above': "Infoga rad f\xF6re",
      'Insert row below': 'Infoga rad efter',
      'Delete row': 'Ta bort rad',
      'Column': 'Kolumn',
      'Insert column before': "Infoga kolumn f\xF6re",
      'Insert column after': 'Infoga kolumn efter',
      'Delete column': 'Ta bort kolumn',
      'Cell': 'Cell',
      'Merge cells': 'Sammanfoga celler',
      'Horizontal split': 'Dela horisontellt',
      'Vertical split': 'Dela vertikalt',
      'Cell Background': 'Cellbakgrund',
      'Vertical Align': 'Vertikal justering',
      'Top': 'Överst',
      'Middle': 'Mitten',
      'Bottom': 'Nederst',
      'Align Top': 'Justera överst',
      'Align Middle': 'Justera mitten',
      'Align Bottom': 'Justera nederst',
      'Cell Style': 'Cellformat',
      // Files
      'Upload File': 'Ladda upp fil',
      'Drop file': "Sl\xE4pp fil",
      // Emoticons
      'Emoticons': 'Uttryckssymboler',
      'Grinning face': 'Grina ansikte',
      'Grinning face with smiling eyes': "Grina ansikte med leende \xF6gon",
      'Face with tears of joy': "Face med gl\xE4djet\xE5rar",
      'Smiling face with open mouth': "Leende ansikte med \xF6ppen mun",
      'Smiling face with open mouth and smiling eyes': "Leende ansikte med \xF6ppen mun och leende \xF6gon",
      'Smiling face with open mouth and cold sweat': "Leende ansikte med \xF6ppen mun och kallsvett",
      'Smiling face with open mouth and tightly-closed eyes': "Leende ansikte med \xF6ppen mun och t\xE4tt slutna \xF6gon",
      'Smiling face with halo': 'Leende ansikte med halo',
      'Smiling face with horns': 'Leende ansikte med horn',
      'Winking face': 'Blinka ansikte',
      'Smiling face with smiling eyes': "Leende ansikte med leende \xF6gon",
      'Face savoring delicious food': "Ansikte smaka uts\xF6kt mat",
      'Relieved face': "L\xE4ttad ansikte",
      'Smiling face with heart-shaped eyes': "Leende ansikte med hj\xE4rtformade \xF6gon",
      'Smiling face with sunglasses': "Leende ansikte med solglas\xF6gon",
      'Smirking face': 'Flinande ansikte',
      'Neutral face': 'Neutral ansikte',
      'Expressionless face': 'Uttryckslöst ansikte',
      'Unamused face': 'Inte roade ansikte',
      'Face with cold sweat': 'Ansikte med kallsvett',
      'Pensive face': "Eftert\xE4nksamt ansikte",
      'Confused face': "F\xF6rvirrad ansikte",
      'Confounded face': "F\xF6rbryllade ansikte",
      'Kissing face': 'Kyssande ansikte',
      'Face throwing a kiss': 'Ansikte kasta en kyss',
      'Kissing face with smiling eyes': "Kyssa ansikte med leende \xF6gon",
      'Kissing face with closed eyes': "Kyssa ansikte med slutna \xF6gon",
      'Face with stuck out tongue': 'Ansikte med stack ut tungan',
      'Face with stuck out tongue and winking eye': "Ansikte med stack ut tungan och blinkande \xF6ga",
      'Face with stuck out tongue and tightly-closed eyes': "Ansikte med stack ut tungan och t\xE4tt slutna \xF6gon",
      'Disappointed face': 'Besviken ansikte',
      'Worried face': 'Orolig ansikte',
      'Angry face': 'Argt ansikte',
      'Pouting face': "Sk\xE4ggtorsk ansikte",
      'Crying face': "Gr\xE5tande ansikte",
      'Persevering face': "Uth\xE5llig ansikte",
      'Face with look of triumph': "Ansikte med utseendet p\xE5 triumf",
      'Disappointed but relieved face': "Besviken men l\xE4ttad ansikte",
      'Frowning face with open mouth': "Rynkar pannan ansikte med \xF6ppen mun",
      'Anguished face': "\xC5ngest ansikte",
      'Fearful face': "R\xE4dda ansikte",
      'Weary face': "Tr\xF6tta ansikte",
      'Sleepy face': "S\xF6mnig ansikte",
      'Tired face': "Tr\xF6tt ansikte",
      'Grimacing face': 'Grimaserande ansikte',
      'Loudly crying face': "H\xF6gt gr\xE5tande ansikte",
      'Face with open mouth': "Ansikte med \xF6ppen mun",
      'Hushed face': "D\xE4mpade ansikte",
      'Face with open mouth and cold sweat': "Ansikte med \xF6ppen mun och kallsvett",
      'Face screaming in fear': "Face skriker i skr\xE4ck",
      'Astonished face': "F\xF6rv\xE5nad ansikte",
      'Flushed face': 'Ansiktsrodnad',
      'Sleeping face': 'Sovande anskite',
      'Dizzy face': 'Yr ansikte',
      'Face without mouth': 'Ansikte utan mun',
      'Face with medical mask': 'Ansikte med medicinsk maskera',
      // Line breaker
      'Break': 'Ny rad',
      // Math
      'Subscript': "Neds\xE4nkt",
      'Superscript': "Upph\xF6jd",
      // Full screen
      'Fullscreen': "Helsk\xE4rm",
      // Horizontal line
      'Insert Horizontal Line': 'Infoga horisontell linje',
      // Clear formatting
      'Clear Formatting': 'Ta bort formatering',
      // Save
      'Save': 'Spara',
      // Undo, redo
      'Undo': "\xC5ngra",
      'Redo': "G\xF6r om",
      // Select all
      'Select All': 'Markera allt',
      // Code view
      'Code View': 'Kodvy',
      // Quote
      'Quote': 'Citat',
      'Increase': "\xD6ka",
      'Decrease': 'Minska',
      // Quick Insert
      'Quick Insert': 'Snabbinfoga',
      // Spcial Characters
      'Special Characters': 'Specialtecken',
      'Latin': 'Latin',
      'Greek': 'Grekisk',
      'Cyrillic': 'Cyrillic',
      'Punctuation': 'Skiljetecken',
      'Currency': 'Valuta',
      'Arrows': 'Pilar',
      'Math': 'Matematik',
      'Misc': 'Övrigt',
      // Print.
      'Print': 'Skriva ut',
      // Spell Checker.
      'Spell Checker': 'Stavningskontroll',
      // Help
      'Help': 'Hjälp',
      'Shortcuts': 'Genvägar',
      'Inline Editor': 'Inline editor',
      'Show the editor': 'Visa redigeraren',
      'Common actions': 'Vanliga kommandon',
      'Copy': 'Kopiera',
      'Cut': 'Klipp ut',
      'Paste': 'Klistra in',
      'Basic Formatting': 'Grundläggande formatering',
      'Increase quote level': 'Öka citatnivå',
      'Decrease quote level': 'Minska citatnivå',
      'Image / Video': 'Bild / video',
      'Resize larger': 'Öka storlek',
      'Resize smaller': 'Minska storlek',
      'Table': 'Tabell',
      'Select table cell': 'Markera tabellcell',
      'Extend selection one cell': 'Utöka markering en cell',
      'Extend selection one row': 'Utöka markering en rad',
      'Navigation': 'Navigering',
      'Focus popup / toolbar': 'Fokusera popup / verktygsfältet',
      'Return focus to previous position': 'Byt fokus till föregående plats',
      // Embed.ly
      'Embed URL': 'Bädda in url',
      'Paste in a URL to embed': 'Klistra in i en url för att bädda in',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'Den inklippta texten kommer från ett Microsoft Word-dokument. Vill du behålla formateringen eller städa upp det?',
      'Keep': 'Behåll',
      'Clean': 'Städa upp',
      'Word Paste Detected': 'Urklipp från Word upptäckt',
      // Character Counter
      'Characters': 'Tecken',
      // More Buttons
      'More Text': 'Mer Text',
      'More Paragraph': 'Mer Paragraf',
      'More Rich': 'Mer Rik',
      'More Misc': 'Mer Blandat'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=sv.js.map
