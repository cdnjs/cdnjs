/*!
 * froala_editor v4.1.2 (https://www.froala.com/wysiwyg-editor)
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
   * Finnish
   */
  FE.LANGUAGE['fi'] = {
    translation: {
      // Place holder
      'Type something': 'Kirjoita jotain',
      // Basic formatting
      'Bold': 'Lihavointi',
      'Italic': 'Kursivointi',
      'Underline': 'Alleviivaus',
      'Strikethrough': 'Yliviivaus',
      // Main buttons
      'Insert': "Lis\xE4\xE4",
      'Delete': 'Poista',
      'Cancel': 'Peruuta',
      'OK': 'Ok',
      'Back': 'Takaisin',
      'Remove': 'Poista',
      'More': "Lis\xE4\xE4",
      'Update': "P\xE4ivitys",
      'Style': 'Tyyli',
      // Font
      'Font Family': 'Fontti',
      'Font Size': 'Fonttikoko',
      // Colors
      'Colors': "V\xE4rit",
      'Background': 'Taustan',
      'Text': 'Tekstin',
      'HEX Color': 'Heksadesimaali',
      // Paragraphs
      'Paragraph Format': 'Muotoilut',
      'Normal': 'Normaali',
      'Code': 'Koodi',
      'Heading 1': 'Otsikko 1',
      'Heading 2': 'Otsikko 2',
      'Heading 3': 'Otsikko 3',
      'Heading 4': 'Otsikko 4',
      // Style
      'Paragraph Style': 'Kappaleen tyyli',
      'Inline Style': 'Linjassa tyyli',
      // Alignment
      'Align': 'Tasaa',
      'Align Left': 'Tasaa vasemmalle',
      'Align Center': "Keskit\xE4",
      'Align Right': 'Tasaa oikealle',
      'Align Justify': 'Tasaa',
      'None': "Ei mit\xE4\xE4n",
      // Lists
      'Ordered List': "J\xE4rjestetty lista",
      'Unordered List': "J\xE4rjest\xE4m\xE4t\xF6n lista",
      // Indent
      'Decrease Indent': "Sisenn\xE4",
      'Increase Indent': 'Loitonna',
      // Links
      'Insert Link': "Lis\xE4\xE4 linkki",
      'Open in new tab': "Avaa uudessa v\xE4lilehdess\xE4",
      'Open Link': 'Avaa linkki',
      'Edit Link': 'Muokkaa linkki',
      'Unlink': 'Poista linkki',
      'Choose Link': 'Valitse linkki',
      // Images
      'Insert Image': "Lis\xE4\xE4 kuva",
      'Upload Image': 'Lataa kuva',
      'By URL': 'Mukaan URL',
      'Browse': 'Selailla',
      'Drop image': 'Pudota kuva',
      'or click': 'tai napsauta',
      'Manage Images': 'Hallitse kuvia',
      'Loading': 'Lastaus',
      'Deleting': 'Poistaminen',
      'Tags': 'Tagit',
      'Are you sure? Image will be deleted.': 'Oletko varma? Kuva poistetaan.',
      'Replace': 'Vaihda',
      'Uploading': 'Lataaminen',
      'Loading image': 'Lastaus kuva',
      'Display': 'N\xE4ytt\xF6',
      'Inline': 'Linjassa',
      'Break Text': 'Rikkoa teksti',
      'Alternative Text': 'Vaihtoehtoinen teksti',
      'Change Size': 'Muuta kokoa',
      'Width': 'Leveys',
      'Height': 'Korkeus',
      'Something went wrong. Please try again.': "Jotain meni pieleen. Yrit\xE4 uudelleen.",
      'Image Caption': 'Kuva-otsikko',
      'Advanced Edit': 'Edistynyt muokkaus',
      // Video
      'Insert Video': "Lis\xE4\xE4 video",
      'Embedded Code': 'Upotettu koodi',
      'Paste in a video URL': 'Liitä video url',
      'Drop video': 'Pudota video',
      'Your browser does not support HTML5 video.': 'Selaimesi ei tue html5-videota.',
      'Upload Video': 'Lataa video',
      // Tables
      'Insert Table': "Lis\xE4\xE4 taulukko",
      'Table Header': "Taulukko yl\xE4tunniste",
      'Remove Table': 'Poista taulukko',
      'Table Style': 'Taulukko tyyli',
      'Horizontal Align': 'Vaakasuora tasaa',
      'Row': 'Rivi',
      'Insert row above': "Lis\xE4\xE4 rivi ennen",
      'Insert row below': "Lis\xE4\xE4 rivi j\xE4lkeen",
      'Delete row': 'Poista rivi',
      'Column': 'Sarake',
      'Insert column before': "Lis\xE4\xE4 sarake ennen",
      'Insert column after': "Lis\xE4\xE4 sarake j\xE4lkeen",
      'Delete column': 'Poista sarake',
      'Cell': 'Solu',
      'Merge cells': "Yhdist\xE4 solut",
      'Horizontal split': 'Jaa vaakasuora',
      'Vertical split': 'Jaa pystysuora',
      'Cell Background': 'Solun tausta',
      'Vertical Align': 'Pystysuora tasaa',
      'Top': 'Alku',
      'Middle': "Keskimm\xE4inen",
      'Bottom': 'Pohja',
      'Align Top': 'Tasaa alkuun',
      'Align Middle': "Tasaa keskimm\xE4inen",
      'Align Bottom': 'Tasaa pohja',
      'Cell Style': 'Solun tyyli',
      // Files
      'Upload File': 'Lataa tiedosto',
      'Drop file': 'Pudota tiedosto',
      // Emoticons
      'Emoticons': "Hymi\xF6it\xE4",
      'Grinning face': 'Virnisteli kasvot',
      'Grinning face with smiling eyes': "Virnisteli kasvot hymyilev\xE4t silm\xE4t",
      'Face with tears of joy': "Kasvot ilon kyyneleit\xE4",
      'Smiling face with open mouth': "Hymyilev\xE4 kasvot suu auki",
      'Smiling face with open mouth and smiling eyes': "Hymyilev\xE4 kasvot suu auki ja hymyilee silm\xE4t",
      'Smiling face with open mouth and cold sweat': "Hymyilev\xE4 kasvot suu auki ja kylm\xE4 hiki",
      'Smiling face with open mouth and tightly-closed eyes': "Hymyilev\xE4 kasvot suu auki ja tiiviisti suljettu silm\xE4t",
      'Smiling face with halo': "Hymyilev\xE4 kasvot Halo",
      'Smiling face with horns': "Hymyilev\xE4 kasvot sarvet",
      'Winking face': "Silm\xE4niskut kasvot",
      'Smiling face with smiling eyes': "Hymyilev\xE4 kasvot hymyilev\xE4t silm\xE4t",
      'Face savoring delicious food': 'Kasvot maistella herkullista ruokaa',
      'Relieved face': 'Vapautettu kasvot',
      'Smiling face with heart-shaped eyes': "Hymyilev\xE4t kasvot syd\xE4men muotoinen silm\xE4t",
      'Smiling face with sunglasses': "Hymyilev\xE4 kasvot aurinkolasit",
      'Smirking face': "Hym\xE4t\xE4\xE4 kasvot",
      'Neutral face': 'Neutraali kasvot',
      'Expressionless face': "Ilmeet\xF6n kasvot",
      'Unamused face': 'Ei huvittanut kasvo',
      'Face with cold sweat': "Kasvot kylm\xE4 hiki",
      'Pensive face': "Mietteli\xE4s kasvot",
      'Confused face': 'Sekava kasvot',
      'Confounded face': 'Sekoitti kasvot',
      'Kissing face': 'Suudella kasvot',
      'Face throwing a kiss': "Kasvo heitt\xE4\xE4 suudelma",
      'Kissing face with smiling eyes': "Suudella kasvot hymyilev\xE4t silm\xE4t",
      'Kissing face with closed eyes': "Suudella kasvot silm\xE4t ummessa",
      'Face with stuck out tongue': 'Kasvot ojensi kieli',
      'Face with stuck out tongue and winking eye': "Kasvot on juuttunut pois kielen ja silm\xE4niskuja silm\xE4",
      'Face with stuck out tongue and tightly-closed eyes': "Kasvot on juuttunut pois kielen ja tiiviisti suljettuna silm\xE4t",
      'Disappointed face': 'Pettynyt kasvot',
      'Worried face': 'Huolissaan kasvot',
      'Angry face': 'Vihainen kasvot',
      'Pouting face': 'Pouting kasvot',
      'Crying face': 'Itku kasvot',
      'Persevering face': "Pitk\xE4j\xE4nteinen kasvot",
      'Face with look of triumph': 'Kasvot ilme Triumph',
      'Disappointed but relieved face': 'Pettynyt mutta helpottunut kasvot',
      'Frowning face with open mouth': 'Frowning kasvot suu auki',
      'Anguished face': 'Tuskainen kasvot',
      'Fearful face': 'Pelokkuus kasvot',
      'Weary face': "V\xE4synyt kasvot",
      'Sleepy face': 'Unelias kasvot',
      'Tired face': "V\xE4synyt kasvot",
      'Grimacing face': "Irvist\xE4en kasvot",
      'Loudly crying face': "\xE4\xE4nekk\xE4\xE4sti itku kasvot",
      'Face with open mouth': 'Kasvot suu auki',
      'Hushed face': 'Hiljentynyt kasvot',
      'Face with open mouth and cold sweat': "Kasvot suu auki ja kylm\xE4 hiki",
      'Face screaming in fear': 'Kasvot huutaa pelosta',
      'Astonished face': "H\xE4mm\xE4stynyt kasvot",
      'Flushed face': 'Kasvojen punoitus',
      'Sleeping face': 'Nukkuva kasvot',
      'Dizzy face': 'Huimausta kasvot',
      'Face without mouth': 'Kasvot ilman suuhun',
      'Face with medical mask': "Kasvot l\xE4\xE4ketieteen naamio",
      // Line breaker
      'Break': 'Rikkoa',
      // Math
      'Subscript': 'Alaindeksi',
      'Superscript': "Yl\xE4indeksi",
      // Full screen
      'Fullscreen': "Koko n\xE4ytt\xF6",
      // Horizontal line
      'Insert Horizontal Line': "Lis\xE4\xE4 vaakasuora viiva",
      // Clear formatting
      'Clear Formatting': 'Poista muotoilu',
      // Save
      'Save': 'Tallentaa',
      // Undo, redo
      'Undo': 'Peru',
      'Redo': 'Tee uudelleen',
      // Select all
      'Select All': 'Valitse kaikki',
      // Code view
      'Code View': "Koodi n\xE4kym\xE4",
      // Quote
      'Quote': 'Lainaus',
      'Increase': "Lis\xE4t\xE4",
      'Decrease': "Pienenn\xE4",
      // Quick Insert
      'Quick Insert': 'Nopea insertti',
      // Spcial Characters
      'Special Characters': 'Erikoismerkkejä',
      'Latin': 'Latina',
      'Greek': 'Kreikkalainen',
      'Cyrillic': 'Kyrillinen',
      'Punctuation': 'Välimerkit',
      'Currency': 'Valuutta',
      'Arrows': 'Nuolet',
      'Math': 'Matematiikka',
      'Misc': 'Sekalaista',
      // Print.
      'Print': 'Tulosta',
      // Spell Checker.
      'Spell Checker': 'Oikeinkirjoittaja',
      // Help
      'Help': 'Auta',
      'Shortcuts': 'Pikakuvakkeet',
      'Inline Editor': 'Inline-editori',
      'Show the editor': 'Näytä editori',
      'Common actions': 'Yhteisiä toimia',
      'Copy': 'Kopio',
      'Cut': 'Leikata',
      'Paste': 'Tahna',
      'Basic Formatting': 'Perusmuotoilu',
      'Increase quote level': 'Lisää lainaustasoa',
      'Decrease quote level': 'Laskea lainaustasoa',
      'Image / Video': 'Kuva / video',
      'Resize larger': 'Kokoa suurempi',
      'Resize smaller': 'Pienempi koko',
      'Table': 'Pöytä',
      'Select table cell': 'Valitse taulukon solu',
      'Extend selection one cell': 'Laajentaa valinta yhden solun',
      'Extend selection one row': 'Laajenna valinta yksi rivi',
      'Navigation': 'Suunnistus',
      'Focus popup / toolbar': 'Painopistevalo / työkalurivi',
      'Return focus to previous position': 'Palauta tarkennus edelliseen asentoon',
      // Embed.ly
      'Embed URL': 'Upottaa URL-osoite',
      'Paste in a URL to embed': 'Liitä upotettu URL-osoite',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'Liitetty sisältö tulee Microsoft Word -asiakirjasta. Haluatko säilyttää muodon tai puhdistaa sen?',
      'Keep': 'Pitää',
      'Clean': 'Puhdas',
      'Word Paste Detected': 'Sana-tahna havaittu',
      // Character Counter 
      'Characters': 'merkit',
      // More Buttons
      'More Text': 'Lisää tekstiä',
      'More Paragraph': 'Lisää kohta',
      'More Rich': 'Lisää Rikas',
      'More Misc': 'Lisää Misc'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=fi.js.map
