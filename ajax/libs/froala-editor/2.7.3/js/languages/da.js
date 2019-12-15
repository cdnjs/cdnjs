/*!
 * froala_editor v2.7.3 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2017 Froala Labs
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            return factory(jQuery);
        };
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function ($) {
/**
 * Danish
 */

$.FE.LANGUAGE['da'] = {
  translation: {
    // Place holder
    "Type something": "Skriv noget",

    // Basic formatting
    "Bold": "Fed",
    "Italic": "Kursiv",
    "Underline": "Understreg",
    "Strikethrough": "Gennemstreg",

    // Main buttons
    "Insert": "Inds\u00e6t",
    "Delete": "Slet",
    "Cancel": "Fortryd",
    "OK": "Ok",
    "Back": "Tilbage",
    "Remove": "Fjern",
    "More": "Mere",
    "Update": "Opdatering",
    "Style": "Stil",

    // Font
    "Font Family": "Skrifttype",
    "Font Size": "Skriftst\u00f8rrelse",

    // Colors
    "Colors": "Farver",
    "Background": "Baggrunds",
    "Text": "Tekst",
    "HEX Color": "Hex farve",

    // Paragraphs
    "Paragraph Format": "S\u00e6tning format",
    "Normal": "Normal",
    "Code": "Code",
    "Heading 1": "Overskrift 1",
    "Heading 2": "Overskrift 2",
    "Heading 3": "Overskrift 3",
    "Heading 4": "Overskrift 4",

    // Style
    "Paragraph Style": "S\u00e6tning stil",
    "Inline Style": "Inline stil",

    // Alignment
    "Align": "Tilpasning",
    "Align Left": "Venstrejusteret",
    "Align Center": "Centreret",
    "Align Right": "H\u00f8jrejusteret",
    "Align Justify": "Justering",
    "None": "Intet",

    // Lists
    "Ordered List": "Ordnet liste",
    "Unordered List": "Uordnet liste",

    // Indent
    "Decrease Indent": "Mindske indrykning",
    "Increase Indent": "For\u00f8ge indrykning",

    // Links
    "Insert Link": "Inds\u00e6t link",
    "Open in new tab": "\u00c5bn i ny fane",
    "Open Link": "\u00c5bn link",
    "Edit Link": "Rediger link",
    "Unlink": "Fjern link",
    "Choose Link": "V\u00e6lg link",

    // Images
    "Insert Image": "Inds\u00e6t billede",
    "Upload Image": "Upload billede",
    "By URL": "Af URL",
    "Browse": "Gennemse",
    "Drop image": "Tr\u00e6k billedet herind",
    "or click": "eller klik",
    "Manage Images": "Administrer billeder",
    "Loading": "Lastning",
    "Deleting": "Sletning",
    "Tags": "Tags",
    "Are you sure? Image will be deleted.": "Er du sikker? Billede vil blive slettet.",
    "Replace": "Udskift",
    "Uploading": "Upload",
    "Loading image": "Lastning billede",
    "Display": "Udstilling",
    "Inline": "Inline",
    "Break Text": "Afbrydelse tekst",
    "Alternate Text": "Suppleant tekst",
    "Change Size": "Skift st\u00f8rrelse",
    "Width": "Bredde",
    "Height": "H\u00f8jde",
    "Something went wrong. Please try again.": "Noget gik galt. Pr\u00f8v igen.",
    "Image Caption": "Billedtekst",
    "Advanced Edit": "Avanceret redigering",

    // Video
    "Insert Video": "Inds\u00e6t video",
    "Embedded Code": "Embedded kode",
    "Paste in a video URL": "Indsæt i en video url",
    "Drop video": "Slip video",
    "Your browser does not support HTML5 video.": "Din browser understøtter ikke html5 video.",
    "Upload Video": "Upload video",

    // Tables
    "Insert Table": "Inds\u00e6t tabel",
    "Table Header": "Tabel header",
    "Remove Table": "Fjern tabel",
    "Table Style": "Tabel stil",
    "Horizontal Align": "Vandret tilpasning",
    "Row": "R\u00e6kke",
    "Insert row above": "Inds\u00e6t r\u00e6kke over",
    "Insert row below": "Inds\u00e6t r\u00e6kke under",
    "Delete row": "Slet r\u00e6kke",
    "Column": "Kolonne",
    "Insert column before": "Inds\u00e6t kolonne f\u00f8r",
    "Insert column after": "Inds\u00e6t kolonne efter",
    "Delete column": "Slet kolonne",
    "Cell": "Celle",
    "Merge cells": "Flet celler",
    "Horizontal split": "Vandret split",
    "Vertical split": "Lodret split",
    "Cell Background": "Celle baggrund",
    "Vertical Align": "Lodret tilpasning",
    "Top": "Top",
    "Middle": "Midten",
    "Bottom": "Bund",
    "Align Top": "Tilpasse top",
    "Align Middle": "Tilpasse midten",
    "Align Bottom": "Tilpasse bund",
    "Cell Style": "Celle stil",

    // Files
    "Upload File": "Upload fil",
    "Drop file": "Drop fil",

    // Emoticons
    "Emoticons": "Hum\u00f8rikoner",
    "Grinning face": "Grinende ansigt",
    "Grinning face with smiling eyes": "Grinende ansigt med smilende \u00f8jne",
    "Face with tears of joy": "Ansigt med gl\u00e6dest\u00e5rer",
    "Smiling face with open mouth": "Smilende ansigt med \u00e5ben mund",
    "Smiling face with open mouth and smiling eyes": "Smilende ansigt med \u00e5ben mund og smilende \u00f8jne",
    "Smiling face with open mouth and cold sweat": "Smilende ansigt med \u00e5ben mund og koldsved",
    "Smiling face with open mouth and tightly-closed eyes": "Smilende ansigt med \u00e5ben mund og stramt-lukkede \u00f8jne",
    "Smiling face with halo": "Smilende ansigt med halo",
    "Smiling face with horns": "Smilende ansigt med horn",
    "Winking face": "Blinkede ansigt",
    "Smiling face with smiling eyes": "Smilende ansigt med smilende \u00f8jne",
    "Face savoring delicious food": "Ansigt savoring l\u00e6kker mad",
    "Relieved face": "Lettet ansigt",
    "Smiling face with heart-shaped eyes": "Smilende ansigt med hjerteformede \u00f8jne",
    "Smiling face with sunglasses": "Smilende ansigt med solbriller",
    "Smirking face": "Smilende ansigt",
    "Neutral face": "Neutral ansigt",
    "Expressionless face": "Udtryksl\u00f8se ansigt",
    "Unamused face": "Ikke morede ansigt",
    "Face with cold sweat": "Ansigt med koldsved",
    "Pensive face": "Eftert\u00e6nksom ansigt",
    "Confused face": "Forvirret ansigt",
    "Confounded face": "Forvirrede ansigt",
    "Kissing face": "Kysse ansigt",
    "Face throwing a kiss": "Ansigt smide et kys",
    "Kissing face with smiling eyes": "Kysse ansigt med smilende \u00f8jne",
    "Kissing face with closed eyes": "Kysse ansigt med lukkede \u00f8jne",
    "Face with stuck out tongue": "Ansigt med stak ud tungen",
    "Face with stuck out tongue and winking eye": "Ansigt med stak ud tungen og blinkede \u00f8je",
    "Face with stuck out tongue and tightly-closed eyes": "Ansigt med stak ud tungen og stramt lukkede \u00f8jne",
    "Disappointed face": "Skuffet ansigt",
    "Worried face": "Bekymret ansigt",
    "Angry face": "Vred ansigt",
    "Pouting face": "Sk\u00e6gtorsk ansigt",
    "Crying face": "Gr\u00e6der ansigt",
    "Persevering face": "Udholdende ansigt",
    "Face with look of triumph": "Ansigt med udseendet af triumf",
    "Disappointed but relieved face": "Skuffet, men lettet ansigt",
    "Frowning face with open mouth": "Rynkede panden ansigt med \u00e5ben mund",
    "Anguished face": "Forpinte ansigt",
    "Fearful face": "Frygt ansigt",
    "Weary face": "Tr\u00e6tte ansigt",
    "Sleepy face": "S\u00f8vnig ansigt",
    "Tired face": "Tr\u00e6t ansigt",
    "Grimacing face": "Grimasser ansigt",
    "Loudly crying face": "H\u00f8jlydt grædende ansigt",
    "Face with open mouth": "Ansigt med \u00e5ben mund",
    "Hushed face": "Tyst ansigt",
    "Face with open mouth and cold sweat": "Ansigt med \u00e5ben mund og koldsved",
    "Face screaming in fear": "Ansigt skrigende i fryg",
    "Astonished face": "Forundret ansigt",
    "Flushed face": "Blussende ansigt",
    "Sleeping face": "Sovende ansigt",
    "Dizzy face": "Svimmel ansigt",
    "Face without mouth": "Ansigt uden mund",
    "Face with medical mask": "Ansigt med medicinsk maske",

    // Line breaker
    "Break": "Afbrydelse",

    // Math
    "Subscript": "S\u00e6nket skrift",
    "Superscript": "H\u00e6vet skrift",

    // Full screen
    "Fullscreen": "Fuld sk\u00e6rm",

    // Horizontal line
    "Insert Horizontal Line": "Inds\u00e6t vandret linie",

    // Clear formatting
    "Clear Formatting": "Fjern formatering",

    // Undo, redo
    "Undo": "Fortryd",
    "Redo": "Genopret",

    // Select all
    "Select All": "V\u00e6lg alle",

    // Code view
    "Code View": "Kode visning",

    // Quote
    "Quote": "Citat",
    "Increase": "For\u00f8ge",
    "Decrease": "Mindsk",

    // Quick Insert
    "Quick Insert": "Hurtig indsats",

    // Spcial Characters
    "Special Characters": "Specialtegn",
    "Latin": "Latin",
    "Greek": "Græsk",
    "Cyrillic": "Kyrillisk",
    "Punctuation": "Tegnsætning",
    "Currency": "Betalingsmiddel",
    "Arrows": "Pile",
    "Math": "Matematik",
    "Misc": "Misc",

    // Print.
    "Print": "Print",

    // Spell Checker.
    "Spell Checker": "Stavekontrol",

    // Help
    "Help": "Hjælp",
    "Shortcuts": "Genveje",
    "Inline Editor": "Inline editor",
    "Show the editor": "Vis redaktøren",
    "Common actions": "Fælles handlinger",
    "Copy": "Kopi",
    "Cut": "Skære",
    "Paste": "Sæt ind",
    "Basic Formatting": "Grundlæggende formatering",
    "Increase quote level": "Øge tilbudsniveau",
    "Decrease quote level": "Sænk citeringsniveauet",
    "Image / Video": "Billede / video",
    "Resize larger": "Ændre størrelse større",
    "Resize smaller": "Ændre størrelsen mindre",
    "Table": "Tabel",
    "Select table cell": "Vælg tabel celle",
    "Extend selection one cell": "Udvide valget en celle",
    "Extend selection one row": "Udvide markeringen en række",
    "Navigation": "Navigation",
    "Focus popup / toolbar": "Fokus popup / værktøjslinje",
    "Return focus to previous position": "Returnere fokus til tidligere position",

    // Embed.ly
    "Embed URL": "Integrere url",
    "Paste in a URL to embed": "Indsæt i en URL for at indlejre",

    // Word Paste.
    "The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?": "Det indsatte indhold kommer fra et Microsoft Word-dokument. vil du holde formatet eller rydde det op?",
    "Keep": "Holde",
    "Clean": "Ren",
    "Word Paste Detected": "Ordpasta opdages"
  },
  direction: "ltr"
};

}));
