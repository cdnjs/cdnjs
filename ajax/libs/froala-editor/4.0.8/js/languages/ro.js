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
   * Romanian
   */
  FE.LANGUAGE['ro'] = {
    translation: {
      // Place holder
      'Type something': "Tasteaz\u0103 ceva",
      // Basic formatting
      'Bold': "\xCEngro\u015Fat",
      'Italic': 'Cursiv',
      'Underline': 'Subliniat',
      'Strikethrough': "T\u0103iat",
      // Main buttons
      'Insert': "Insereaz\u0103",
      'Delete': "\u015Eterge",
      'Cancel': "Anuleaz\u0103",
      'OK': 'Ok',
      'Back': "\xCEnapoi",
      'Remove': "\u0218terge",
      'More': 'Mai mult',
      'Update': "Actualizeaz\u0103",
      'Style': 'Stil',
      // Font
      'Font Family': 'Font',
      'Font Size': 'Dimensiune font',
      // Colors
      'Colors': 'Culoare',
      'Background': 'Fundal',
      'Text': 'Text',
      'HEX Color': 'Culoare Hexa',
      // Paragraphs
      'Paragraph Format': 'Format paragraf',
      'Normal': 'Normal',
      'Code': 'Cod',
      'Heading 1': 'Antet 1',
      'Heading 2': 'Antet 2',
      'Heading 3': 'Antet 3',
      'Heading 4': 'Antet 4',
      // Style
      'Paragraph Style': 'Stil paragraf',
      'Inline Style': "Stil \xEEn linie",
      // Alignment
      'Align': 'Aliniere',
      'Align Left': "Aliniere la st\xE2nga",
      'Align Center': 'Aliniere la centru',
      'Align Right': 'Aliniere la dreapta',
      'Align Justify': "Aliniere pe toat\u0103 l\u0103\u021Bimea",
      'None': 'Niciunul',
      // Lists
      'Ordered List': "List\u0103 ordonat\u0103",
      'Unordered List': "List\u0103 neordonat\u0103",
      // Indent
      'Decrease Indent': "De-indenteaz\u0103",
      'Increase Indent': "Indenteaz\u0103",
      // Links
      'Insert Link': 'Inserare link',
      'Open in new tab': "Deschide \xEEn tab nou",
      'Open Link': 'Deschide link',
      'Edit Link': 'Editare link',
      'Unlink': "\u0218terge link-ul",
      'Choose Link': 'Alege link',
      // Images
      'Insert Image': 'Inserare imagine',
      'Upload Image': "\xCEncarc\u0103 imagine",
      'By URL': "Dup\u0103 URL",
      'Browse': "R\u0103sfoie\u0219te",
      'Drop image': 'Trage imagine',
      'or click': "sau f\u0103 click",
      'Manage Images': 'Gestionare imagini',
      'Loading': "Se \xEEncarc\u0103",
      'Deleting': "Se \u0219terge",
      'Tags': 'Etichete',
      'Are you sure? Image will be deleted.': "Sunte\u021Bi sigur? Imaginea va fi \u015Ftears\u0103.",
      'Replace': "\xCEnlocuire",
      'Uploading': "Imaginea se \xEEncarc\u0103",
      'Loading image': "Imaginea se \xEEncarc\u0103",
      'Display': "Afi\u0219are",
      'Inline': "\xCEn linie",
      'Break Text': 'Sparge text',
      'Alternative Text': 'Text alternativ',
      'Change Size': 'Modificare dimensiuni',
      'Width': "L\u0103\u021Bime",
      'Height': "\xCEn\u0103l\u021Bime",
      'Something went wrong. Please try again.': "Ceva n-a mers bine. V\u0103 rug\u0103m s\u0103 \xEEncerca\u021Bi din nou.",
      'Image Caption': 'Captura imaginii',
      'Advanced Edit': 'Editare avansată',
      // Video
      'Insert Video': 'Inserare video',
      'Embedded Code': 'Cod embedded',
      'Paste in a video URL': 'Lipiți o adresă URL pentru video',
      'Drop video': 'Trage video',
      'Your browser does not support HTML5 video.': 'Browserul dvs. nu acceptă videoclipul html5.',
      'Upload Video': 'Încărcați videoclipul',
      // Tables
      'Insert Table': 'Inserare tabel',
      'Table Header': 'Antet tabel',
      'Remove Table': "\u0218terge tabel",
      'Table Style': 'Stil tabel',
      'Horizontal Align': "Aliniere orizontal\u0103",
      'Row': 'Linie',
      'Insert row above': "Insereaz\u0103 linie \xEEnainte",
      'Insert row below': "Insereaz\u0103 linie dup\u0103",
      'Delete row': "\u015Eterge linia",
      'Column': "Coloan\u0103",
      'Insert column before': "Insereaz\u0103 coloan\u0103 \xEEnainte",
      'Insert column after': "Insereaz\u0103 coloan\u0103 dup\u0103",
      'Delete column': "\u015Eterge coloana",
      'Cell': 'Celula',
      'Merge cells': "Une\u015Fte celulele",
      'Horizontal split': "\xCEmparte orizontal",
      'Vertical split': "\xCEmparte vertical",
      'Cell Background': "Fundal celul\u0103",
      'Vertical Align': "Aliniere vertical\u0103",
      'Top': 'Sus',
      'Middle': 'Mijloc',
      'Bottom': 'Jos',
      'Align Top': 'Aliniere sus',
      'Align Middle': 'Aliniere la mijloc',
      'Align Bottom': 'Aliniere jos',
      'Cell Style': "Stil celul\u0103",
      // Files
      'Upload File': "\xCEnc\u0103rca\u021Bi fi\u0219ier",
      'Drop file': "Trage fi\u0219ier",
      // Emoticons
      'Emoticons': 'Emoticoane',
      'Grinning face': "Fa\u021B\u0103 r\xE2njind",
      'Grinning face with smiling eyes': "Fa\u021B\u0103 r\xE2njind cu ochi z\xE2mbitori",
      'Face with tears of joy': "Fa\u021B\u0103 cu lacrimi de bucurie",
      'Smiling face with open mouth': "Fa\u021B\u0103 z\xE2mbitoare cu gura deschis\u0103",
      'Smiling face with open mouth and smiling eyes': "Fa\u021B\u0103 z\xE2mbitoare cu gura deschis\u0103 \u0219i ochi z\xE2mbitori",
      'Smiling face with open mouth and cold sweat': "Fa\u021B\u0103 z\xE2mbitoare cu gura deschis\u0103 \u015Fi sudoare rece",
      'Smiling face with open mouth and tightly-closed eyes': "Fa\u021B\u0103 z\xE2mbitoare cu gura deschis\u0103 \u015Fi ochii ferm \xEEnchi\u0219i",
      'Smiling face with halo': "Fa\u021B\u0103 z\xE2mbitoare cu aur\u0103",
      'Smiling face with horns': "Fa\u021B\u0103 z\xE2mbitoare cu coarne",
      'Winking face': "Fa\u021B\u0103 clipind",
      'Smiling face with smiling eyes': "Fa\u021B\u0103 z\xE2mbitoare cu ochi z\xE2mbitori",
      'Face savoring delicious food': "Fa\u021B\u0103 savur\xE2nd preparate delicioase",
      'Relieved face': "Fa\u021B\u0103 u\u0219urat\u0103",
      'Smiling face with heart-shaped eyes': "Fa\u021B\u0103 z\xE2mbitoare cu ochi in forma de inim\u0103",
      'Smiling face with sunglasses': "Fa\u021B\u0103 z\xE2mbitoare cu ochelari de soare",
      'Smirking face': "Fa\u021B\u0103 cu sur\xE2s afectat",
      'Neutral face': "Fa\u021B\u0103 neutr\u0103",
      'Expressionless face': "Fa\u021B\u0103 f\u0103r\u0103 expresie",
      'Unamused face': "Fa\u021B\u0103 neamuzat\u0103",
      'Face with cold sweat': "Fa\u021B\u0103 cu sudoare rece",
      'Pensive face': "Fa\u021B\u0103 medit\xE2nd",
      'Confused face': "Fa\u021B\u0103 confuz\u0103",
      'Confounded face': "Fa\u021B\u0103 z\u0103p\u0103cit\u0103",
      'Kissing face': "Fa\u021B\u0103 s\u0103rut\xE2nd",
      'Face throwing a kiss': "Fa\u021B\u0103 arunc\xE2nd un s\u0103rut",
      'Kissing face with smiling eyes': "Fa\u021B\u0103 s\u0103rut\xE2nd cu ochi z\xE2mbitori",
      'Kissing face with closed eyes': "Fa\u021B\u0103 s\u0103rut\xE2nd cu ochii \xEEnchi\u0219i",
      'Face with stuck out tongue': "Fa\u021B\u0103 cu limba afar\u0103",
      'Face with stuck out tongue and winking eye': "Fa\u021B\u0103 cu limba scoas\u0103 clipind",
      'Face with stuck out tongue and tightly-closed eyes': "Fa\u021B\u0103 cu limba scoas\u0103 \u0219i ochii ferm \xEEnchi\u0219i",
      'Disappointed face': "Fa\u021B\u0103 dezam\u0103git\u0103",
      'Worried face': "Fa\u021B\u0103 \xEEngrijorat\u0103",
      'Angry face': "Fa\u021B\u0103 nervoas\u0103",
      'Pouting face': "Fa\u021B\u0103 fierb\xE2nd",
      'Crying face': "Fa\u021B\u0103 pl\xE2ng\xE2nd",
      'Persevering face': "Fa\u021B\u0103 perseverent\u0103",
      'Face with look of triumph': "Fa\u021B\u0103 triumf\u0103toare",
      'Disappointed but relieved face': "Fa\u021B\u0103 dezam\u0103git\u0103 dar u\u0219urat\u0103",
      'Frowning face with open mouth': "Fa\u021B\u0103 \xEEncruntat\u0103 cu gura deschis\u0103",
      'Anguished face': "Fa\u021B\u0103 \xEEndurerat\u0103",
      'Fearful face': "Fa\u021B\u0103 tem\u0103toare",
      'Weary face': "Fa\u021B\u0103 \xEEngrijorat\u0103",
      'Sleepy face': "Fa\u021B\u0103 adormit\u0103",
      'Tired face': "Fa\u021B\u0103 obosit\u0103",
      'Grimacing face': "Fa\u021B\u0103 cu grimas\u0103",
      'Loudly crying face': "Fa\u021B\u0103 pl\xE2ng\xE2nd zgomotos",
      'Face with open mouth': "Fa\u021B\u0103 cu gura deschis\u0103",
      'Hushed face': "Fa\u021B\u0103 discret\u0103",
      'Face with open mouth and cold sweat': "Fa\u021B\u0103 cu gura deschis\u0103 si sudoare rece",
      'Face screaming in fear': "Fa\u021B\u0103 \u021Bip\xE2nd de fric\u0103",
      'Astonished face': "Fa\u021B\u0103 uimit\u0103",
      'Flushed face': "Fa\u021B\u0103 sp\u0103lat\u0103",
      'Sleeping face': "Fa\u021B\u0103 adormit\u0103",
      'Dizzy face': "Fa\u021B\u0103 ame\u021Bit\u0103",
      'Face without mouth': "Fa\u021B\u0103 f\u0103r\u0103 gur\u0103",
      'Face with medical mask': "Fa\u021B\u0103 cu masc\u0103 medical\u0103",
      // Line breaker
      'Break': 'Desparte',
      // Horizontal line
      'Insert Horizontal Line': "Inserare linie orizontal\u0103",
      // Math
      'Subscript': 'Indice',
      'Superscript': 'Exponent',
      // Full screen
      'Fullscreen': 'Ecran complet',
      // Clear formatting
      'Clear Formatting': "Elimina\u021Bi formatarea",
      // Save
      'Save': "Salva\u021Bi",
      // Undo, redo
      'Undo': "Reexecut\u0103",
      'Redo': "Dezexecut\u0103",
      // Select all
      'Select All': "Selecteaz\u0103 tot",
      // Code view
      'Code View': 'Vizualizare cod',
      // Quote
      'Quote': 'Citat',
      'Increase': "Indenteaz\u0103",
      'Decrease': "De-indenteaz\u0103",
      // Quick Insert
      'Quick Insert': "Inserare rapid\u0103",
      // Spcial Characters
      'Special Characters': 'Caracterele speciale',
      'Latin': 'Latină',
      'Greek': 'Greacă',
      'Cyrillic': 'Chirilic',
      'Punctuation': 'Punctuaţie',
      'Currency': 'Valută',
      'Arrows': 'Săgeți',
      'Math': 'Matematică',
      'Misc': 'Diverse',
      // Print.
      'Print': 'Imprimare',
      // Spell Checker.
      'Spell Checker': 'Ortografie',
      // Help
      'Help': 'Ajutor',
      'Shortcuts': 'Comenzi rapide',
      'Inline Editor': 'Editor inline',
      'Show the editor': 'Arătați editorul',
      'Common actions': 'Acțiuni comune',
      'Copy': 'Copie',
      'Cut': 'A taia',
      'Paste': 'Lipire',
      'Basic Formatting': 'Formatul de bază',
      'Increase quote level': 'Creșteți nivelul cotației',
      'Decrease quote level': 'Micșorați nivelul cotației',
      'Image / Video': 'Imagine / video',
      'Resize larger': 'Redimensionați mai mare',
      'Resize smaller': 'Redimensionați mai puțin',
      'Table': 'Tabel',
      'Select table cell': 'Selectați celula tabelă',
      'Extend selection one cell': 'Extindeți selecția la o celulă',
      'Extend selection one row': 'Extindeți selecția cu un rând',
      'Navigation': 'Navigare',
      'Focus popup / toolbar': 'Focus popup / bara de instrumente',
      'Return focus to previous position': 'Reveniți la poziția anterioară',
      // Embed.ly
      'Embed URL': 'Încorporați url',
      'Paste in a URL to embed': 'Lipiți un URL pentru a-l încorpora',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'Conținutul lipit vine dintr-un document word Microsoft. Doriți să păstrați formatul sau să îl curățați?',
      'Keep': 'A pastra',
      'Clean': 'Curat',
      'Word Paste Detected': 'A fost detectată lipire din Word',
      // Character Counter
      'Characters': 'Caracterele',
      // More Buttons
      'More Text': 'Mai Mult Text',
      'More Paragraph': 'Mai Mult Paragraf',
      'More Rich': 'Mai Mult Bogat',
      'More Misc': 'Mai Mult Diverse'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=ro.js.map
