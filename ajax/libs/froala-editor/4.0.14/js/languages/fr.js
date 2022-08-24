/*!
 * froala_editor v4.0.14 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2022 Froala Labs
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('froala-editor')) :
  typeof define === 'function' && define.amd ? define(['froala-editor'], factory) :
  (factory(global.FroalaEditor));
}(this, (function (FE) { 'use strict';

  FE = FE && FE.hasOwnProperty('default') ? FE['default'] : FE;

  /**
   * French
   */
  FE.LANGUAGE['fr'] = {
    translation: {
      // Place holder
      'Type something': 'Tapez quelque chose',
      // Basic formatting
      'Bold': 'Gras',
      'Italic': 'Italique',
      'Underline': "Soulign\xE9",
      'Strikethrough': "Barr\xE9",
      // Main buttons
      'Insert': "Ins\xE9rer",
      'Delete': 'Supprimer',
      'Cancel': 'Annuler',
      'OK': 'Ok',
      'Back': 'Retour',
      'Remove': 'Supprimer',
      'More': 'Plus',
      'Update': 'Actualiser',
      'Style': 'Style',
      // Font
      'Font Family': "Polices de caract\xE8res",
      'Font Size': 'Taille de police',
      'Text Color': 'Couleur de police',
      'Background Color': 'Couleur d\'arri\xE8re plan',
      // Colors
      'Colors': 'Couleurs',
      'Background': "Arri\xE8re-plan",
      'Text': 'Texte',
      'HEX Color': "Couleur hexad\xE9cimale",
      // Paragraphs
      'Paragraph Format': 'Format de paragraphe',
      'Normal': 'Normal',
      'Code': 'Code',
      'Heading 1': 'Titre 1',
      'Heading 2': 'Titre 2',
      'Heading 3': 'Titre 3',
      'Heading 4': 'Titre 4',
      'Line Height': 'Interligne',
      'Single': 'Célibataire',
      // Style
      'Paragraph Style': 'Style de paragraphe',
      'Inline Style': 'Style en ligne',
      'Gray': 'Grise',
      'Bordered': 'Bordé',
      'Spaced': 'Espacé',
      'Uppercase': 'Majuscule',
      // Alignment
      'Align': 'Aligner',
      'Align Left': "Aligner \xE0 gauche",
      'Align Center': 'Aligner au centre',
      'Align Right': "Aligner \xE0 droite",
      'Align Justify': 'Justifier',
      'None': 'Aucun',
      // Download PDF
      'Download PDF': 'Télécharger le PDF',
      // Inline Class
      'Inline Class': 'Classe en ligne',
      // Lists
      'Ordered List': "Liste ordonn\xE9e",
      'Unordered List': "Liste non ordonn\xE9e",
      'Default': 'D\xE9faut',
      'Circle': 'Cercle',
      'Disc': 'Rond',
      'Square': 'Carr\xE9',
      'Lower Alpha': 'Alpha inf\xE9rieur',
      'Lower Greek': 'Grec inf\xE9rieur',
      'Lower Roman': 'Romain inf\xE9rieur',
      'Upper Alpha': 'Alpha sup\xE9rieur',
      'Upper Roman': 'Romain sup\xE9rieur',
      // Indent
      'Decrease Indent': 'Diminuer le retrait',
      'Increase Indent': 'Augmenter le retrait',
      // Links
      'Insert Link': "Ins\xE9rer un lien",
      'Open in new tab': 'Ouvrir dans un nouvel onglet',
      'Open Link': 'Ouvrir le lien',
      'Edit Link': 'Modifier le lien',
      'Unlink': 'Enlever le lien',
      'Choose Link': 'Choisir le lien',
      // Images
      'Insert Image': "Ins\xE9rer une image",
      'Upload Image': "T\xE9l\xE9verser une image",
      'By URL': 'Par URL',
      'Browse': 'Parcourir',
      'Drop image': 'Cliquer pour parcourir',
      'or click': 'ou glisser/d\xE9poser en plein \xE9cran',
      'Manage Images': "G\xE9rer les images",
      'Loading': 'Chargement',
      'Deleting': 'Suppression',
      'Tags': "\xC9tiquettes",
      'Are you sure? Image will be deleted.': "Etes-vous certain? L'image sera supprim\xE9e.",
      'Replace': 'Remplacer',
      'Uploading': 'Envoi en cours',
      'Loading image': 'Chargement d\'image en cours',
      'Display': 'Afficher',
      'Inline': 'En ligne',
      'Break Text': 'Rompre le texte',
      'Alternative Text': 'Texte alternatif',
      'Change Size': 'Changer la dimension',
      'Width': 'Largeur',
      'Height': 'Hauteur',
      'Something went wrong. Please try again.': "Quelque chose a mal tourn\xE9. Veuillez r\xE9essayer.",
      'Image Caption': "L\xE9gende de l'image",
      'Advanced Edit': "\xC9dition avanc\xE9e",
      // Video
      'Insert Video': "Ins\xE9rer une vid\xE9o",
      'Embedded Code': "Code int\xE9gr\xE9",
      'Paste in a video URL': "Coller l'URL d'une vid\xE9o",
      'Drop video': 'Cliquer pour parcourir',
      'Your browser does not support HTML5 video.': "Votre navigateur ne supporte pas les vid\xE9os au format HTML5.",
      'Upload Video': "T\xE9l\xE9verser une vid\xE9o",
      // Tables
      'Insert Table': "Ins\xE9rer un tableau",
      'Table Header': "Ent\xEAte de tableau",
      'Remove Table': 'Supprimer le tableau',
      'Table Style': 'Style de tableau',
      'Horizontal Align': 'Alignement horizontal',
      'Row': 'Ligne',
      'Insert row above': "Ins\xE9rer une ligne au-dessus",
      'Insert row below': "Ins\xE9rer une ligne en-dessous",
      'Delete row': 'Supprimer la ligne',
      'Column': 'Colonne',
      'Insert column before': "Ins\xE9rer une colonne avant",
      'Insert column after': "Ins\xE9rer une colonne apr\xE8s",
      'Delete column': 'Supprimer la colonne',
      'Cell': 'Cellule',
      'Merge cells': 'Fusionner les cellules',
      'Horizontal split': 'Diviser horizontalement',
      'Vertical split': 'Diviser verticalement',
      'Cell Background': "Arri\xE8re-plan de la cellule",
      'Vertical Align': 'Alignement vertical',
      'Top': 'En haut',
      'Middle': 'Au centre',
      'Bottom': 'En bas',
      'Align Top': 'Aligner en haut',
      'Align Middle': 'Aligner au centre',
      'Align Bottom': 'Aligner en bas',
      'Cell Style': 'Style de cellule',
      'Dashed Borders': 'Bordures pointillées',
      'Alternate Rows': 'Lignes alternatives',
      'Highlighted': 'Souligné',
      'Thick': 'Épais',
      // Files
      'Upload File': "T\xE9l\xE9verser un fichier",
      'Drop file': 'Cliquer pour parcourir',
      // Emoticons
      'Emoticons': "\xC9motic\xF4nes",
      'Grinning face': 'Souriant visage',
      'Grinning face with smiling eyes': 'Souriant visage aux yeux souriants',
      'Face with tears of joy': "Visage \xE0 des larmes de joie",
      'Smiling face with open mouth': 'Visage souriant avec la bouche ouverte',
      'Smiling face with open mouth and smiling eyes': 'Visage souriant avec la bouche ouverte et les yeux en souriant',
      'Smiling face with open mouth and cold sweat': 'Visage souriant avec la bouche ouverte et la sueur froide',
      'Smiling face with open mouth and tightly-closed eyes': "Visage souriant avec la bouche ouverte et les yeux herm\xE9tiquement clos",
      'Smiling face with halo': 'Sourire visage avec halo',
      'Smiling face with horns': 'Visage souriant avec des cornes',
      'Winking face': 'Clin d\'oeil visage',
      'Smiling face with smiling eyes': 'Sourire visage aux yeux souriants',
      'Face savoring delicious food': "Visage savourant de d\xE9licieux plats",
      'Relieved face': "Soulag\xE9 visage",
      'Smiling face with heart-shaped eyes': 'Visage souriant avec des yeux en forme de coeur',
      'Smiling face with sunglasses': 'Sourire visage avec des lunettes de soleil',
      'Smirking face': 'Souriant visage',
      'Neutral face': 'Visage neutre',
      'Expressionless face': 'Visage sans expression',
      'Unamused face': "Visage pas amus\xE9",
      'Face with cold sweat': "Face \xE0 la sueur froide",
      'Pensive face': 'pensif visage',
      'Confused face': 'Visage confus',
      'Confounded face': 'visage maudit',
      'Kissing face': 'Embrasser le visage',
      'Face throwing a kiss': 'Visage jetant un baiser',
      'Kissing face with smiling eyes': 'Embrasser le visage avec les yeux souriants',
      'Kissing face with closed eyes': "Embrasser le visage avec les yeux ferm\xE9s",
      'Face with stuck out tongue': 'Visage avec sortait de la langue',
      'Face with stuck out tongue and winking eye': 'Visage avec sortait de la langue et des yeux clignotante',
      'Face with stuck out tongue and tightly-closed eyes': "Visage avec sortait de la langue et les yeux ferm\xE9s herm\xE9tiquement",
      'Disappointed face': "Visage d\xE9\xE7u",
      'Worried face': 'Visage inquiet',
      'Angry face': "Visage en col\xE9re",
      'Pouting face': 'Faire la moue face',
      'Crying face': 'Pleurer visage',
      'Persevering face': "Pers\xE9v\xE9rer face",
      'Face with look of triumph': 'Visage avec le regard de triomphe',
      'Disappointed but relieved face': "D\xE9\xE7u, mais le visage soulag\xE9",
      'Frowning face with open mouth': "Les sourcils fronc\xE9s visage avec la bouche ouverte",
      'Anguished face': "Visage angoiss\xE9",
      'Fearful face': 'Craignant visage',
      'Weary face': 'Visage las',
      'Sleepy face': 'Visage endormi',
      'Tired face': "Visage fatigu\xE9",
      'Grimacing face': "Visage grima\xE7ante",
      'Loudly crying face': 'Pleurer bruyamment visage',
      'Face with open mouth': "Visage \xE0 la bouche ouverte",
      'Hushed face': "Visage feutr\xE9e",
      'Face with open mouth and cold sweat': "Visage \xE0 la bouche ouverte et la sueur froide",
      'Face screaming in fear': 'Visage hurlant de peur',
      'Astonished face': "Visage \xE9tonn\xE9",
      'Flushed face': "Visage congestionn\xE9",
      'Sleeping face': 'Visage au bois dormant',
      'Dizzy face': 'Visage vertige',
      'Face without mouth': 'Visage sans bouche',
      'Face with medical mask': "Visage avec un masque m\xE9dical",
      // Line breaker
      'Break': 'Rompre',
      // Math
      'Subscript': 'Indice',
      'Superscript': 'Exposant',
      // Full screen
      'Fullscreen': "Plein \xE9cran",
      // Horizontal line
      'Insert Horizontal Line': "Ins\xE9rer une ligne horizontale",
      // Clear formatting
      'Clear Formatting': 'Effacer le formatage',
      // Save
      'Save': 'Sauvegarder',
      // Undo, redo
      'Undo': 'Annuler',
      'Redo': "R\xE9tablir",
      // Select all
      'Select All': "Tout s\xE9lectionner",
      // Code view
      'Code View': 'Mode HTML',
      // Quote
      'Quote': 'Citation',
      'Increase': 'Augmenter',
      'Decrease': 'Diminuer',
      // Quick Insert
      'Quick Insert': 'Insertion rapide',
      // Spcial Characters
      'Special Characters': "Caract\xE8res sp\xE9ciaux",
      'Latin': 'Latin',
      'Greek': 'Grec',
      'Cyrillic': 'Cyrillique',
      'Punctuation': 'Ponctuation',
      'Currency': 'Devise',
      'Arrows': "Fl\xE8ches",
      'Math': 'Math',
      'Misc': 'Divers',
      // Print.
      'Print': 'Imprimer',
      // Spell Checker.
      'Spell Checker': 'Correcteur orthographique',
      // Help
      'Help': 'Aide',
      'Shortcuts': 'Raccourcis',
      'Inline Editor': "\xC9diteur en ligne",
      'Show the editor': "Montrer l'\xE9diteur",
      'Common actions': 'Actions communes',
      'Copy': 'Copier',
      'Cut': 'Couper',
      'Paste': 'Coller',
      'Basic Formatting': 'Formatage de base',
      'Increase quote level': 'Augmenter le niveau de citation',
      'Decrease quote level': 'Diminuer le niveau de citation',
      'Image / Video': "Image / vid\xE9o",
      'Resize larger': 'Redimensionner plus grand',
      'Resize smaller': 'Redimensionner plus petit',
      'Table': 'Table',
      'Select table cell': "S\xE9lectionner la cellule du tableau",
      'Extend selection one cell': "\xC9tendre la s\xE9lection d'une cellule",
      'Extend selection one row': "\xC9tendre la s\xE9lection d'une ligne",
      'Navigation': 'Navigation',
      'Focus popup / toolbar': 'Focus popup / toolbar',
      'Return focus to previous position': "Retourner l'accent sur le poste pr\xE9c\xE9dent",
      // Embed.ly
      'Embed URL': "URL int\xE9gr\xE9e",
      'Paste in a URL to embed': "Coller une URL int\xE9gr\xE9e",
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': "Le contenu coll\xE9 provient d'un document Microsoft Word. Voulez-vous conserver le format ou le nettoyer?",
      'Keep': 'Conserver',
      'Clean': 'Nettoyer',
      'Word Paste Detected': "Copiage de mots d\xE9tect\xE9",
      // Character Counter 
      'Characters': 'Caract\xE8res',
      // More Buttons
      'More Text': 'Autres options de texte',
      'More Paragraph': 'Autres options de paragraphe',
      'More Rich': 'Autres options d\'enrichissement',
      'More Misc': 'Autres fonctionnalit\xE9s diverses'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=fr.js.map
