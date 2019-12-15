/*!
 * froala_editor v2.8.2 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('FroalaEditor')) :
  typeof define === 'function' && define.amd ? define(['FroalaEditor'], factory) :
  (factory(global.$.FroalaEditor));
}(this, (function (FE) { 'use strict';

  FE = FE && FE.hasOwnProperty('default') ? FE['default'] : FE;

  var _translation;

  FE.LANGUAGE['ro'] = {
    translation: (_translation = {
      // Place holder
      "Type something": 'Tasteaz\u0103 ceva',

      // Basic formatting
      "Bold": '\xCEngro\u015Fat',
      "Italic": "Cursiv",
      "Underline": "Subliniat",
      "Strikethrough": 'T\u0103iat',

      // Main buttons
      "Insert": 'Insereaz\u0103',
      "Delete": '\u015Eterge',
      "Cancel": 'Anuleaz\u0103',
      "OK": "Ok",
      "Back": '\xCEnapoi',
      "Remove": '\u0218terge',
      "More": "Mai mult",
      "Update": 'Actualizeaz\u0103',
      "Style": "Stil",

      // Font
      "Font Family": "Font",
      "Font Size": "Dimensiune font",

      // Colors
      "Colors": "Culoare",
      "Background": "Fundal",
      "Text": "Text",
      "HEX Color": "Culoare Hexa",

      // Paragraphs
      "Paragraph Format": "Format paragraf",
      "Normal": "Normal",
      "Code": "Cod",
      "Heading 1": "Antet 1",
      "Heading 2": "Antet 2",
      "Heading 3": "Antet 3",
      "Heading 4": "Antet 4",

      // Style
      "Paragraph Style": "Stil paragraf",
      "Inline Style": 'Stil \xEEn linie',

      // Alignment
      "Align": "Aliniere",
      "Align Left": 'Aliniere la st\xE2nga',
      "Align Center": "Aliniere la centru",
      "Align Right": "Aliniere la dreapta",
      "Align Justify": 'Aliniere pe toat\u0103 l\u0103\u021Bimea',
      "None": "Niciunul",

      // Lists
      "Ordered List": 'List\u0103 ordonat\u0103',
      "Unordered List": 'List\u0103 neordonat\u0103',

      // Indent
      "Decrease Indent": 'De-indenteaz\u0103',
      "Increase Indent": 'Indenteaz\u0103',

      // Links
      "Insert Link": "Inserare link",
      "Open in new tab": 'Deschide \xEEn tab nou',
      "Open Link": "Deschide link",
      "Edit Link": "Editare link",
      "Unlink": '\u0218terge link-ul',
      "Choose Link": "Alege link",

      // Images
      "Insert Image": "Inserare imagine",
      "Upload Image": '\xCEncarc\u0103 imagine',
      "By URL": 'Dup\u0103 URL',
      "Browse": 'R\u0103sfoie\u0219te',
      "Drop image": "Trage imagine",
      "or click": 'sau f\u0103 click',
      "Manage Images": "Gestionare imagini",
      "Loading": 'Se \xEEncarc\u0103',
      "Deleting": ""
    }, _translation['Deleting'] = 'Se \u0219terge', _translation["Tags"] = "Etichete", _translation["Are you sure? Image will be deleted."] = 'Sunte\u021Bi sigur? Imaginea va fi \u015Ftears\u0103.', _translation["Replace"] = '\xCEnlocuire', _translation["Uploading"] = 'Imaginea se \xEEncarc\u0103', _translation["Loading image"] = 'Imaginea se \xEEncarc\u0103', _translation["Display"] = 'Afi\u0219are', _translation["Inline"] = '\xCEn linie', _translation["Break Text"] = "Sparge text", _translation["Alternative Text"] = "Text alternativ", _translation["Change Size"] = "Modificare dimensiuni", _translation["Width"] = 'L\u0103\u021Bime', _translation["Height"] = '\xCEn\u0103l\u021Bime', _translation["Something went wrong. Please try again."] = 'Ceva n-a mers bine. V\u0103 rug\u0103m s\u0103 \xEEncerca\u021Bi din nou.', _translation["Image Caption"] = "Captura imaginii", _translation["Advanced Edit"] = "Editare avansată", _translation["Insert Video"] = "Inserare video", _translation["Embedded Code"] = "Cod embedded", _translation["Paste in a video URL"] = "Lipiți o adresă URL pentru video", _translation["Drop video"] = "Trage video", _translation["Your browser does not support HTML5 video."] = "Browserul dvs. nu acceptă videoclipul html5.", _translation["Upload Video"] = "Încărcați videoclipul", _translation["Insert Table"] = "Inserare tabel", _translation["Table Header"] = "Antet tabel", _translation["Remove Table"] = '\u0218terge tabel', _translation["Table Style"] = "Stil tabel", _translation["Horizontal Align"] = 'Aliniere orizontal\u0103', _translation["Row"] = "Linie", _translation["Insert row above"] = 'Insereaz\u0103 linie \xEEnainte', _translation["Insert row below"] = 'Insereaz\u0103 linie dup\u0103', _translation["Delete row"] = '\u015Eterge linia', _translation["Column"] = 'Coloan\u0103', _translation["Insert column before"] = 'Insereaz\u0103 coloan\u0103 \xEEnainte', _translation["Insert column after"] = 'Insereaz\u0103 coloan\u0103 dup\u0103', _translation["Delete column"] = '\u015Eterge coloana', _translation["Cell"] = "Celula", _translation["Merge cells"] = 'Une\u015Fte celulele', _translation["Horizontal split"] = '\xCEmparte orizontal', _translation["Vertical split"] = '\xCEmparte vertical', _translation["Cell Background"] = 'Fundal celul\u0103', _translation["Vertical Align"] = 'Aliniere vertical\u0103', _translation["Top"] = "Sus", _translation["Middle"] = "Mijloc", _translation["Bottom"] = "Jos", _translation["Align Top"] = "Aliniere sus", _translation["Align Middle"] = "Aliniere la mijloc", _translation["Align Bottom"] = "Aliniere jos", _translation["Cell Style"] = 'Stil celul\u0103', _translation["Upload File"] = '\xCEnc\u0103rca\u021Bi fi\u0219ier', _translation["Drop file"] = 'Trage fi\u0219ier', _translation["Emoticons"] = "Emoticoane", _translation["Grinning face"] = 'Fa\u021B\u0103 r\xE2njind', _translation["Grinning face with smiling eyes"] = 'Fa\u021B\u0103 r\xE2njind cu ochi z\xE2mbitori', _translation["Face with tears of joy"] = 'Fa\u021B\u0103 cu lacrimi de bucurie', _translation["Smiling face with open mouth"] = 'Fa\u021B\u0103 z\xE2mbitoare cu gura deschis\u0103', _translation["Smiling face with open mouth and smiling eyes"] = 'Fa\u021B\u0103 z\xE2mbitoare cu gura deschis\u0103 \u0219i ochi z\xE2mbitori', _translation["Smiling face with open mouth and cold sweat"] = 'Fa\u021B\u0103 z\xE2mbitoare cu gura deschis\u0103 \u015Fi sudoare rece', _translation["Smiling face with open mouth and tightly-closed eyes"] = 'Fa\u021B\u0103 z\xE2mbitoare cu gura deschis\u0103 \u015Fi ochii ferm \xEEnchi\u0219i', _translation["Smiling face with halo"] = 'Fa\u021B\u0103 z\xE2mbitoare cu aur\u0103', _translation["Smiling face with horns"] = 'Fa\u021B\u0103 z\xE2mbitoare cu coarne', _translation["Winking face"] = 'Fa\u021B\u0103 clipind', _translation["Smiling face with smiling eyes"] = 'Fa\u021B\u0103 z\xE2mbitoare cu ochi z\xE2mbitori', _translation["Face savoring delicious food"] = 'Fa\u021B\u0103 savur\xE2nd preparate delicioase', _translation["Relieved face"] = 'Fa\u021B\u0103 u\u0219urat\u0103', _translation["Smiling face with heart-shaped eyes"] = 'Fa\u021B\u0103 z\xE2mbitoare cu ochi in forma de inim\u0103', _translation["Smiling face with sunglasses"] = 'Fa\u021B\u0103 z\xE2mbitoare cu ochelari de soare', _translation["Smirking face"] = 'Fa\u021B\u0103 cu sur\xE2s afectat', _translation["Neutral face"] = 'Fa\u021B\u0103 neutr\u0103', _translation["Expressionless face"] = 'Fa\u021B\u0103 f\u0103r\u0103 expresie', _translation["Unamused face"] = 'Fa\u021B\u0103 neamuzat\u0103', _translation["Face with cold sweat"] = 'Fa\u021B\u0103 cu sudoare rece', _translation["Pensive face"] = 'Fa\u021B\u0103 medit\xE2nd', _translation["Confused face"] = 'Fa\u021B\u0103 confuz\u0103', _translation["Confounded face"] = 'Fa\u021B\u0103 z\u0103p\u0103cit\u0103', _translation["Kissing face"] = 'Fa\u021B\u0103 s\u0103rut\xE2nd', _translation["Face throwing a kiss"] = 'Fa\u021B\u0103 arunc\xE2nd un s\u0103rut', _translation["Kissing face with smiling eyes"] = 'Fa\u021B\u0103 s\u0103rut\xE2nd cu ochi z\xE2mbitori', _translation["Kissing face with closed eyes"] = 'Fa\u021B\u0103 s\u0103rut\xE2nd cu ochii \xEEnchi\u0219i', _translation["Face with stuck out tongue"] = 'Fa\u021B\u0103 cu limba afar\u0103', _translation["Face with stuck out tongue and winking eye"] = 'Fa\u021B\u0103 cu limba scoas\u0103 clipind', _translation["Face with stuck out tongue and tightly-closed eyes"] = 'Fa\u021B\u0103 cu limba scoas\u0103 \u0219i ochii ferm \xEEnchi\u0219i', _translation["Disappointed face"] = 'Fa\u021B\u0103 dezam\u0103git\u0103', _translation["Worried face"] = 'Fa\u021B\u0103 \xEEngrijorat\u0103', _translation["Angry face"] = 'Fa\u021B\u0103 nervoas\u0103', _translation["Pouting face"] = 'Fa\u021B\u0103 fierb\xE2nd', _translation["Crying face"] = 'Fa\u021B\u0103 pl\xE2ng\xE2nd', _translation["Persevering face"] = 'Fa\u021B\u0103 perseverent\u0103', _translation["Face with look of triumph"] = 'Fa\u021B\u0103 triumf\u0103toare', _translation["Disappointed but relieved face"] = 'Fa\u021B\u0103 dezam\u0103git\u0103 dar u\u0219urat\u0103', _translation["Frowning face with open mouth"] = 'Fa\u021B\u0103 \xEEncruntat\u0103 cu gura deschis\u0103', _translation["Anguished face"] = 'Fa\u021B\u0103 \xEEndurerat\u0103', _translation["Fearful face"] = 'Fa\u021B\u0103 tem\u0103toare', _translation["Weary face"] = 'Fa\u021B\u0103 \xEEngrijorat\u0103', _translation["Sleepy face"] = 'Fa\u021B\u0103 adormit\u0103', _translation["Tired face"] = 'Fa\u021B\u0103 obosit\u0103', _translation["Grimacing face"] = 'Fa\u021B\u0103 cu grimas\u0103', _translation["Loudly crying face"] = 'Fa\u021B\u0103 pl\xE2ng\xE2nd zgomotos', _translation["Face with open mouth"] = 'Fa\u021B\u0103 cu gura deschis\u0103', _translation["Hushed face"] = 'Fa\u021B\u0103 discret\u0103', _translation["Face with open mouth and cold sweat"] = 'Fa\u021B\u0103 cu gura deschis\u0103 si sudoare rece', _translation["Face screaming in fear"] = 'Fa\u021B\u0103 \u021Bip\xE2nd de fric\u0103', _translation["Astonished face"] = 'Fa\u021B\u0103 uimit\u0103', _translation["Flushed face"] = 'Fa\u021B\u0103 sp\u0103lat\u0103', _translation["Sleeping face"] = 'Fa\u021B\u0103 adormit\u0103', _translation["Dizzy face"] = 'Fa\u021B\u0103 ame\u021Bit\u0103', _translation["Face without mouth"] = 'Fa\u021B\u0103 f\u0103r\u0103 gur\u0103', _translation["Face with medical mask"] = 'Fa\u021B\u0103 cu masc\u0103 medical\u0103', _translation["Break"] = "Desparte", _translation["Insert Horizontal Line"] = 'Inserare linie orizontal\u0103', _translation["Subscript"] = "Indice", _translation["Superscript"] = "Exponent", _translation["Fullscreen"] = "Ecran complet", _translation["Clear Formatting"] = 'Elimina\u021Bi formatarea', _translation["Undo"] = 'Reexecut\u0103', _translation["Redo"] = 'Dezexecut\u0103', _translation["Select All"] = 'Selecteaz\u0103 tot', _translation["Code View"] = "Vizualizare cod", _translation["Quote"] = "Citat", _translation["Increase"] = 'Indenteaz\u0103', _translation["Decrease"] = 'De-indenteaz\u0103', _translation["Quick Insert"] = 'Inserare rapid\u0103', _translation["Special Characters"] = "Caracterele speciale", _translation["Latin"] = "Latină", _translation["Greek"] = "Greacă", _translation["Cyrillic"] = "Chirilic", _translation["Punctuation"] = "Punctuaţie", _translation["Currency"] = "Valută", _translation["Arrows"] = "Săgeți", _translation["Math"] = "Matematică", _translation["Misc"] = "Diverse", _translation["Print"] = "Imprimare", _translation["Spell Checker"] = "Ortografie", _translation["Help"] = "Ajutor", _translation["Shortcuts"] = "Comenzi rapide", _translation["Inline Editor"] = "Editor inline", _translation["Show the editor"] = "Arătați editorul", _translation["Common actions"] = "Acțiuni comune", _translation["Copy"] = "Copie", _translation["Cut"] = "A taia", _translation["Paste"] = "Lipire", _translation["Basic Formatting"] = "Formatul de bază", _translation["Increase quote level"] = "Creșteți nivelul cotației", _translation["Decrease quote level"] = "Micșorați nivelul cotației", _translation["Image / Video"] = "Imagine / video", _translation["Resize larger"] = "Redimensionați mai mare", _translation["Resize smaller"] = "Redimensionați mai puțin", _translation["Table"] = "Tabel", _translation["Select table cell"] = "Selectați celula tabelă", _translation["Extend selection one cell"] = "Extindeți selecția la o celulă", _translation["Extend selection one row"] = "Extindeți selecția cu un rând", _translation["Navigation"] = "Navigare", _translation["Focus popup / toolbar"] = "Focus popup / bara de instrumente", _translation["Return focus to previous position"] = "Reveniți la poziția anterioară", _translation["Embed URL"] = "Încorporați url", _translation["Paste in a URL to embed"] = "Lipiți un URL pentru a-l încorpora", _translation["The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?"] = "Conținutul lipit vine dintr-un document word Microsoft. Doriți să păstrați formatul sau să îl curățați?", _translation["Keep"] = "A pastra", _translation["Clean"] = "Curat", _translation["Word Paste Detected"] = "A fost detectată lipire din Word", _translation),
    direction: "ltr"
  };

})));
//# sourceMappingURL=ro.js.map
