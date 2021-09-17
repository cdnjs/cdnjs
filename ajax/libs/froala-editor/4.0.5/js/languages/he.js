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
  * Hebrew
  */
  FE.LANGUAGE['he'] = {
    translation: {
      // Place holder
      'Type something': "\u05D4\u05E7\u05DC\u05D3 \u05DB\u05D0\u05DF",
      // Basic formatting
      'Bold': "\u05DE\u05D5\u05D3\u05D2\u05E9",
      'Italic': "\u05DE\u05D5\u05D8\u05D4",
      'Underline': "\u05E7\u05D5 \u05EA\u05D7\u05EA\u05D9",
      'Strikethrough': "\u05E7\u05D5 \u05D0\u05DE\u05E6\u05E2\u05D9",
      // Main buttons
      'Insert': "\u05D4\u05D5\u05E1\u05E4\u05EA",
      'Delete': "\u05DE\u05D7\u05D9\u05E7\u05D4",
      'Cancel': "\u05D1\u05D9\u05D8\u05D5\u05DC",
      'OK': "\u05D1\u05E6\u05E2",
      'Back': "\u05D1\u05D7\u05D6\u05E8\u05D4",
      'Remove': "\u05D4\u05E1\u05E8",
      'More': "\u05D9\u05D5\u05EA\u05E8",
      'Update': "\u05E2\u05D3\u05DB\u05D5\u05DF",
      'Style': "\u05E1\u05D2\u05E0\u05D5\u05DF",
      // Font
      'Font Family': "\u05D2\u05D5\u05E4\u05DF",
      'Font Size': "\u05D2\u05D5\u05D3\u05DC \u05D4\u05D2\u05D5\u05E4\u05DF",
      // Colors
      'Colors': "\u05E6\u05D1\u05E2\u05D9\u05DD",
      'Background': "\u05E8\u05E7\u05E2",
      'Text': "\u05D4\u05D8\u05E1\u05D8",
      'HEX Color': 'צבע הקס',
      // Paragraphs
      'Paragraph Format': "\u05E4\u05D5\u05E8\u05DE\u05D8",
      'Normal': "\u05E8\u05D2\u05D9\u05DC",
      'Code': "\u05E7\u05D5\u05D3",
      'Heading 1': "1 \u05DB\u05D5\u05EA\u05E8\u05EA",
      'Heading 2': "2 \u05DB\u05D5\u05EA\u05E8\u05EA",
      'Heading 3': "3 \u05DB\u05D5\u05EA\u05E8\u05EA",
      'Heading 4': "4 \u05DB\u05D5\u05EA\u05E8\u05EA",
      // Style
      'Paragraph Style': "\u05E1\u05D2\u05E0\u05D5\u05DF \u05E4\u05E1\u05E7\u05D4",
      'Inline Style': "\u05E1\u05D2\u05E0\u05D5\u05DF \u05DE\u05D5\u05D1\u05E0\u05D4",
      // Alignment
      'Align': "\u05D9\u05D9\u05E9\u05D5\u05E8",
      'Align Left': "\u05D9\u05D9\u05E9\u05D5\u05E8 \u05DC\u05E9\u05DE\u05D0\u05DC",
      'Align Center': "\u05D9\u05D9\u05E9\u05D5\u05E8 \u05DC\u05DE\u05E8\u05DB\u05D6",
      'Align Right': "\u05D9\u05D9\u05E9\u05D5\u05E8 \u05DC\u05D9\u05DE\u05D9\u05DF",
      'Align Justify': "\u05D9\u05D9\u05E9\u05D5\u05E8 \u05DE\u05DC\u05D0",
      'None': "\u05D0\u05E3 \u05D0\u05D7\u05D3",
      // Lists
      'Ordered List': "\u05D4\u05D5\u05E1\u05E4\u05EA \u05E8\u05E9\u05D9\u05DE\u05D4 \u05DE\u05DE\u05D5\u05E1\u05E4\u05E8\u05EA",
      'Unordered List': "\u05D4\u05D5\u05E1\u05E4\u05EA \u05E8\u05E9\u05D9\u05DE\u05D4",
      // Indent
      'Decrease Indent': "\u05D4\u05E7\u05D8\u05E0\u05EA \u05DB\u05E0\u05D9\u05E1\u05D4",
      'Increase Indent': "\u05D4\u05D2\u05D3\u05DC\u05EA \u05DB\u05E0\u05D9\u05E1\u05D4",
      // Links
      'Insert Link': "\u05D4\u05D5\u05E1\u05E4\u05EA \u05E7\u05D9\u05E9\u05D5\u05E8",
      'Open in new tab': "\u05DC\u05E4\u05EA\u05D5\u05D7 \u05D1\u05D8\u05D0\u05D1 \u05D7\u05D3\u05E9",
      'Open Link': "\u05E7\u05D9\u05E9\u05D5\u05E8 \u05E4\u05EA\u05D5\u05D7",
      'Edit Link': "\u05E7\u05D9\u05E9\u05D5\u05E8 \u05E2\u05E8\u05D9\u05DB\u05D4",
      'Unlink': "\u05D4\u05E1\u05E8\u05EA \u05D4\u05E7\u05D9\u05E9\u05D5\u05E8",
      'Choose Link': "\u05DC\u05D1\u05D7\u05D5\u05E8 \u05E7\u05D9\u05E9\u05D5\u05E8",
      // Images
      'Insert Image': "\u05D4\u05D5\u05E1\u05E4\u05EA \u05EA\u05DE\u05D5\u05E0\u05D4",
      'Upload Image': "\u05EA\u05DE\u05D5\u05E0\u05EA \u05D4\u05E2\u05DC\u05D0\u05D4",
      'By URL': "URL \u05E2\u05DC \u05D9\u05D3\u05D9",
      'Browse': "\u05DC\u05D2\u05DC\u05D5\u05E9",
      'Drop image': "\u05E9\u05D7\u05E8\u05E8 \u05D0\u05EA \u05D4\u05EA\u05DE\u05D5\u05E0\u05D4 \u05DB\u05D0\u05DF",
      'or click': "\u05D0\u05D5 \u05DC\u05D7\u05E5",
      'Manage Images': "\u05E0\u05D9\u05D4\u05D5\u05DC \u05D4\u05EA\u05DE\u05D5\u05E0\u05D5\u05EA",
      'Loading': "\u05D8\u05E2\u05D9\u05E0\u05D4",
      'Deleting': "\u05DE\u05D7\u05D9\u05E7\u05D4",
      'Tags': "\u05EA\u05D2\u05D9\u05DD",
      'Are you sure? Image will be deleted.': "\u05D4\u05D0\u05DD \u05D0\u05EA\u05D4 \u05D1\u05D8\u05D5\u05D7? \u05D4\u05EA\u05DE\u05D5\u05E0\u05D4 \u05EA\u05DE\u05D7\u05E7.",
      'Replace': "\u05DC\u05D4\u05D7\u05DC\u05D9\u05E3",
      'Uploading': "\u05D4\u05E2\u05DC\u05D0\u05D4",
      'Loading image': "\u05EA\u05DE\u05D5\u05E0\u05EA \u05D8\u05E2\u05D9\u05E0\u05D4",
      'Display': "\u05EA\u05E6\u05D5\u05D2\u05D4",
      'Inline': "\u05D1\u05E9\u05D5\u05E8\u05D4",
      'Break Text': "\u05D8\u05E7\u05E1\u05D8 \u05D4\u05E4\u05E1\u05E7\u05D4",
      'Alternative Text': "\u05D8\u05E7\u05E1\u05D8 \u05D7\u05DC\u05D5\u05E4\u05D9",
      'Change Size': "\u05D2\u05D5\u05D3\u05DC \u05E9\u05D9\u05E0\u05D5\u05D9",
      'Width': "\u05E8\u05D5\u05D7\u05D1",
      'Height': "\u05D2\u05D5\u05D1\u05D4",
      'Something went wrong. Please try again.': "\u05DE\u05E9\u05D4\u05D5 \u05D4\u05E9\u05EA\u05D1\u05E9. \u05D1\u05D1\u05E7\u05E9\u05D4 \u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1.",
      'Image Caption': 'כיתוב תמונה',
      'Advanced Edit': 'עריכה מתקדמת',
      // Video
      'Insert Video': "\u05D4\u05D5\u05E1\u05E4\u05EA \u05D5\u05D9\u05D3\u05D9\u05D0\u05D5",
      'Embedded Code': "\u05E7\u05D5\u05D3 \u05DE\u05D5\u05D8\u05D1\u05E2",
      'Paste in a video URL': 'הדבק בכתובת אתר של סרטון',
      'Drop video': 'ירידה וידאו',
      'Your browser does not support HTML5 video.': 'הדפדפן שלך אינו תומך וידאו html5.',
      'Upload Video': 'להעלות וידאו',
      // Tables
      'Insert Table': "\u05D4\u05DB\u05E0\u05E1 \u05D8\u05D1\u05DC\u05D4",
      'Table Header': "\u05DB\u05D5\u05EA\u05E8\u05EA \u05D8\u05D1\u05DC\u05D4",
      'Remove Table': "\u05D4\u05E1\u05E8 \u05E9\u05D5\u05DC\u05D7\u05DF",
      'Table Style': "\u05E1\u05D2\u05E0\u05D5\u05DF \u05D8\u05D1\u05DC\u05D4",
      'Horizontal Align': "\u05D0\u05D5\u05E4\u05E7\u05D9\u05EA \u05DC\u05D9\u05D9\u05E9\u05E8",
      'Row': "\u05E9\u05D5\u05E8\u05D4",
      'Insert row above': "\u05D4\u05D5\u05E1\u05E4\u05EA \u05E9\u05D5\u05E8\u05D4 \u05DC\u05E4\u05E0\u05D9",
      'Insert row below': "\u05D4\u05D5\u05E1\u05E4\u05EA \u05E9\u05D5\u05E8\u05D4 \u05D0\u05D7\u05E8\u05D9",
      'Delete row': "\u05DE\u05D7\u05D9\u05E7\u05EA \u05E9\u05D5\u05E8\u05D4",
      'Column': "\u05D8\u05D5\u05E8",
      'Insert column before': "\u05D4\u05D5\u05E1\u05E4\u05EA \u05D8\u05D5\u05E8 \u05DC\u05E4\u05E0\u05D9",
      'Insert column after': "\u05D4\u05D5\u05E1\u05E4\u05EA \u05D8\u05D5\u05E8 \u05D0\u05D7\u05E8\u05D9",
      'Delete column': "\u05DE\u05D7\u05D9\u05E7\u05EA \u05D8\u05D5\u05E8",
      'Cell': "\u05EA\u05D0",
      'Merge cells': "\u05DE\u05D6\u05D2 \u05EA\u05D0\u05D9\u05DD",
      'Horizontal split': "\u05E4\u05E6\u05DC \u05D0\u05D5\u05E4\u05E7\u05D9",
      'Vertical split': "\u05E4\u05E6\u05DC \u05D0\u05E0\u05DB\u05D9",
      'Cell Background': "\u05E8\u05E7\u05E2 \u05EA\u05D0",
      'Vertical Align': "\u05D9\u05D9\u05E9\u05D5\u05E8 \u05D0\u05E0\u05DB\u05D9",
      'Top': "\u05E2\u05B6\u05DC\u05B4\u05D9\u05D5\u05B9\u05DF",
      'Middle': "\u05EA\u05B4\u05D9\u05DB\u05D5\u05B9\u05E0\u05B4\u05D9",
      'Bottom': "\u05EA\u05D7\u05EA\u05D5\u05DF",
      'Align Top': "\u05DC\u05D9\u05D9\u05E9\u05E8 \u05E2\u05B6\u05DC\u05B4\u05D9\u05D5\u05B9\u05DF",
      'Align Middle': "\u05DC\u05D9\u05D9\u05E9\u05E8 \u05EA\u05B4\u05D9\u05DB\u05D5\u05B9\u05E0\u05B4\u05D9",
      'Align Bottom': "\u05DC\u05D9\u05D9\u05E9\u05E8 \u05EA\u05D7\u05EA\u05D5\u05DF",
      'Cell Style': "\u05E1\u05D2\u05E0\u05D5\u05DF \u05EA\u05D0",
      // Files
      'Upload File': "\u05D4\u05E2\u05DC\u05D0\u05EA \u05E7\u05D5\u05D1\u05E5",
      'Drop file': "\u05D6\u05E8\u05D5\u05E7 \u05E7\u05D5\u05D1\u05E5 \u05DB\u05D0\u05DF",
      // Emoticons
      'Emoticons': "\u05E1\u05DE\u05D9\u05D9\u05DC\u05D9\u05DD",
      'Grinning face': "\u05D7\u05D9\u05D9\u05DA \u05E4\u05E0\u05D9\u05DD",
      'Grinning face with smiling eyes': "\u05D7\u05D9\u05D9\u05DA \u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD \u05DE\u05D7\u05D9\u05D9\u05DB\u05D5\u05EA",
      'Face with tears of joy': "\u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05D3\u05DE\u05E2\u05D5\u05EA \u05E9\u05DC \u05E9\u05DE\u05D7\u05D4",
      'Smiling face with open mouth': "\u05D7\u05D9\u05D5\u05DA \u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05E4\u05D4 \u05E4\u05EA\u05D5\u05D7",
      'Smiling face with open mouth and smiling eyes': "\u05D7\u05D9\u05D5\u05DA \u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05E4\u05D4 \u05E4\u05EA\u05D5\u05D7 \u05D5\u05DE\u05D7\u05D9\u05D9\u05DA \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD",
      'Smiling face with open mouth and cold sweat': "\u05D7\u05D9\u05D5\u05DA \u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05E4\u05D4 \u05E4\u05EA\u05D5\u05D7 \u05D5\u05D6\u05D9\u05E2\u05D4 \u05E7\u05E8\u05D4",
      'Smiling face with open mouth and tightly-closed eyes': "\u05D7\u05D9\u05D5\u05DA \u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05E4\u05D4 \u05E4\u05EA\u05D5\u05D7 \u05D5\u05E2\u05D9\u05E0\u05D9\u05D9\u05DD \u05D1\u05D7\u05D5\u05D6\u05E7\u05D4-\u05E1\u05D2\u05D5\u05E8\u05D5\u05EA",
      'Smiling face with halo': "\u05D7\u05D9\u05D5\u05DA \u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05D4\u05D9\u05DC\u05D4",
      'Smiling face with horns': "\u05D7\u05D9\u05D5\u05DA \u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05E7\u05E8\u05E0\u05D5\u05EA",
      'Winking face': "\u05E7\u05E8\u05D9\u05E6\u05D4 \u05E4\u05E0\u05D9\u05DD",
      'Smiling face with smiling eyes': "\u05D7\u05D9\u05D5\u05DA \u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD \u05DE\u05D7\u05D9\u05D9\u05DB\u05D5\u05EA",
      'Face savoring delicious food': "\u05E4\u05E0\u05D9\u05DD \u05DE\u05EA\u05E2\u05E0\u05D2 \u05D0\u05D5\u05DB\u05DC \u05D8\u05E2\u05D9\u05DD",
      'Relieved face': "\u05E4\u05E0\u05D9\u05DD \u05E9\u05DC \u05D4\u05E7\u05DC\u05D4",
      'Smiling face with heart-shaped eyes': "\u05D7\u05D9\u05D5\u05DA \u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD \u05D1\u05E6\u05D5\u05E8\u05EA \u05DC\u05D1",
      'Smiling face with sunglasses': "\u05D7\u05D9\u05D5\u05DA \u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05DE\u05E9\u05E7\u05E4\u05D9 \u05E9\u05DE\u05E9",
      'Smirking face': "\u05D4\u05D9\u05D0 \u05D7\u05D9\u05D9\u05DB\u05D4 \u05D7\u05D9\u05D5\u05DA \u05E0\u05D1\u05D6\u05D4 \u05E4\u05E0\u05D9\u05DD",
      'Neutral face': "\u05E4\u05E0\u05D9\u05DD \u05E0\u05D9\u05D8\u05E8\u05DC\u05D9",
      'Expressionless face': "\u05D1\u05E4\u05E0\u05D9\u05DD \u05D7\u05EA\u05D5\u05DD",
      'Unamused face': "\u05E4\u05E0\u05D9\u05DD \u05DC\u05D0 \u05DE\u05E9\u05D5\u05E2\u05E9\u05E2\u05D9\u05DD",
      'Face with cold sweat': "\u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05D6\u05D9\u05E2\u05D4 \u05E7\u05E8\u05D4",
      'Pensive face': "\u05D1\u05E4\u05E0\u05D9\u05DD \u05DE\u05D4\u05D5\u05E8\u05D4\u05E8",
      'Confused face': "\u05E4\u05E0\u05D9\u05DD \u05DE\u05D1\u05D5\u05DC\u05D1\u05DC\u05D9\u05DD",
      'Confounded face': "\u05E4\u05E0\u05D9\u05DD \u05DE\u05D1\u05D5\u05DC\u05D1\u05DC",
      'Kissing face': "\u05E0\u05E9\u05D9\u05E7\u05D5\u05EA \u05E4\u05E0\u05D9\u05DD",
      'Face throwing a kiss': "\u05E4\u05E0\u05D9\u05DD \u05DC\u05D6\u05E8\u05D5\u05E7 \u05E0\u05E9\u05D9\u05E7\u05D4",
      'Kissing face with smiling eyes': "\u05E0\u05E9\u05D9\u05E7\u05D5\u05EA \u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD \u05DE\u05D7\u05D9\u05D9\u05DB\u05D5\u05EA",
      'Kissing face with closed eyes': "\u05E0\u05E9\u05D9\u05E7\u05D5\u05EA \u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05E2\u05D9\u05E0\u05D9\u05D9\u05DD \u05E1\u05D2\u05D5\u05E8\u05D5\u05EA",
      'Face with stuck out tongue': "\u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05DC\u05E9\u05D5\u05DF \u05D1\u05DC\u05D8\u05D5",
      'Face with stuck out tongue and winking eye': "\u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05DC\u05E9\u05D5\u05DF \u05EA\u05E7\u05D5\u05E2\u05D4 \u05D4\u05D7\u05D5\u05E6\u05D4 \u05D5\u05E2\u05D9\u05DF \u05E7\u05D5\u05E8\u05E6\u05EA",
      'Face with stuck out tongue and tightly-closed eyes': "\u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05DC\u05E9\u05D5\u05DF \u05EA\u05E7\u05D5\u05E2\u05D4 \u05D4\u05D7\u05D5\u05E6\u05D4 \u05D5\u05E2\u05D9\u05E0\u05D9\u05D9\u05DD \u05D1\u05D7\u05D5\u05D6\u05E7\u05D4-\u05E1\u05D2\u05D5\u05E8\u05D5\u05EA",
      'Disappointed face': "\u05E4\u05E0\u05D9\u05DD \u05DE\u05D0\u05D5\u05DB\u05D6\u05D1\u05D9\u05DD",
      'Worried face': "\u05E4\u05E0\u05D9\u05DD \u05DE\u05D5\u05D3\u05D0\u05D2\u05D9\u05DD",
      'Angry face': "\u05E4\u05E0\u05D9\u05DD \u05DB\u05D5\u05E2\u05E1\u05D9\u05DD",
      'Pouting face': "\u05DE\u05E9\u05D5\u05E8\u05D1\u05D1 \u05E4\u05E0\u05D9\u05DD",
      'Crying face': "\u05D1\u05DB\u05D9 \u05E4\u05E0\u05D9\u05DD",
      'Persevering face': "\u05D4\u05EA\u05DE\u05D3\u05EA \u05E4\u05E0\u05D9\u05DD",
      'Face with look of triumph': "\u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05DE\u05D1\u05D8 \u05E9\u05DC \u05E0\u05E6\u05D7\u05D5\u05DF",
      'Disappointed but relieved face': "\u05DE\u05D0\u05D5\u05DB\u05D6\u05D1 \u05D0\u05D1\u05DC \u05D4\u05D5\u05E7\u05DC \u05E4\u05E0\u05D9\u05DD",
      'Frowning face with open mouth': "\u05E7\u05DE\u05D8 \u05D0\u05EA \u05DE\u05E6\u05D7 \u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05E4\u05D4 \u05E4\u05EA\u05D5\u05D7",
      'Anguished face': "\u05E4\u05E0\u05D9\u05DD \u05DE\u05D9\u05D5\u05E1\u05E8\u05D9\u05DD",
      'Fearful face': "\u05E4\u05E0\u05D9\u05DD \u05E9\u05D7\u05E9\u05E9\u05D5",
      'Weary face': "\u05E4\u05E0\u05D9\u05DD \u05D5\u05D9\u05E8\u05D9",
      'Sleepy face': "\u05E4\u05E0\u05D9\u05DD \u05E9\u05DC \u05E1\u05DC\u05D9\u05E4\u05D9",
      'Tired face': "\u05E4\u05E0\u05D9\u05DD \u05E2\u05D9\u05D9\u05E4\u05D9\u05DD",
      'Grimacing face': "\u05D4\u05D5\u05D0 \u05D4\u05E2\u05D5\u05D5\u05D4 \u05D0\u05EA \u05E4\u05E0\u05D9 \u05E4\u05E0\u05D9\u05DD",
      'Loudly crying face': "\u05D1\u05E7\u05D5\u05DC \u05E8\u05DD \u05D1\u05D5\u05DB\u05D4 \u05E4\u05E0\u05D9\u05DD",
      'Face with open mouth': "\u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05E4\u05D4 \u05E4\u05EA\u05D5\u05D7",
      'Hushed face': "\u05E4\u05E0\u05D9\u05DD \u05E9\u05D5\u05E7\u05D8\u05D9\u05DD",
      'Face with open mouth and cold sweat': "\u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05E4\u05D4 \u05E4\u05EA\u05D5\u05D7 \u05D5\u05D6\u05D9\u05E2\u05D4 \u05E7\u05E8\u05D4\"",
      'Face screaming in fear': "\u05E4\u05E0\u05D9\u05DD \u05E6\u05D5\u05E8\u05D7\u05D9\u05DD \u05D1\u05E4\u05D7\u05D3",
      'Astonished face': "\u05E4\u05E0\u05D9\u05D5 \u05E0\u05D3\u05D4\u05DE\u05D5\u05EA",
      'Flushed face': "\u05E4\u05E0\u05D9\u05D5 \u05E1\u05DE\u05D5\u05E7\u05D5\u05EA",
      'Sleeping face': "\u05E9\u05D9\u05E0\u05D4 \u05E4\u05E0\u05D9\u05DD",
      'Dizzy face': "\u05E4\u05E0\u05D9\u05DD \u05E9\u05DC \u05D3\u05D9\u05D6\u05D9",
      'Face without mouth': "\u05E4\u05E0\u05D9\u05DD \u05DC\u05DC\u05D0 \u05E4\u05D4",
      'Face with medical mask': "\u05E4\u05E0\u05D9\u05DD \u05E2\u05DD \u05DE\u05E1\u05DB\u05D4 \u05E8\u05E4\u05D5\u05D0\u05D9\u05EA",
      // Line breaker
      'Break': "\u05D4\u05E4\u05E1\u05E7\u05D4",
      // Math
      'Subscript': "\u05DB\u05EA\u05D1 \u05EA\u05D7\u05EA\u05D9",
      'Superscript': "\u05E2\u05D9\u05DC\u05D9",
      // Full screen
      'Fullscreen': "\u05DE\u05E1\u05DA \u05DE\u05DC\u05D0",
      // Horizontal line
      'Insert Horizontal Line': "\u05D4\u05D5\u05E1\u05E4\u05EA \u05E7\u05D5 \u05D0\u05D5\u05E4\u05E7\u05D9",
      // Clear formatting
      'Clear Formatting': "\u05DC\u05D4\u05E1\u05D9\u05E8 \u05E2\u05D9\u05E6\u05D5\u05D1",
      // Save
      'Save': "\u05DC\u05D4\u05E6\u05D9\u05DC",
      // Undo, redo
      'Undo': "\u05D1\u05D9\u05D8\u05D5\u05DC",
      'Redo': "\u05D1\u05E6\u05E2 \u05E9\u05D5\u05D1",
      // Select all
      'Select All': "\u05D1\u05D7\u05E8 \u05D4\u05DB\u05DC",
      // Code view
      'Code View': "\u05EA\u05E6\u05D5\u05D2\u05EA \u05E7\u05D5\u05D3",
      // Quote
      'Quote': "\u05E6\u05D9\u05D8\u05D5\u05D8",
      'Increase': "\u05DC\u05D4\u05D2\u05D1\u05D9\u05E8",
      'Decrease': "\u05D9\u05E8\u05D9\u05D3\u05D4",
      // Quick Insert
      'Quick Insert': "\u05DB\u05E0\u05E1 \u05DE\u05D4\u05D9\u05E8",
      // Spcial Characters
      'Special Characters': 'תווים מיוחדים',
      'Latin': 'לָטִינִית',
      'Greek': 'יווני',
      'Cyrillic': 'קירילית',
      'Punctuation': 'פיסוק',
      'Currency': 'מַטְבֵּעַ',
      'Arrows': 'חצים',
      'Math': 'מתמטיקה',
      'Misc': 'שונות',
      // Print.
      'Print': 'הדפס',
      // Spell Checker.
      'Spell Checker': 'בודק איות',
      // Help
      'Help': 'עֶזרָה',
      'Shortcuts': 'קיצורי דרך',
      'Inline Editor': 'עורך מוטבע',
      'Show the editor': 'להראות את העורך',
      'Common actions': 'פעולות נפוצות',
      'Copy': 'עותק',
      'Cut': 'גזירה',
      'Paste': 'לְהַדבִּיק',
      'Basic Formatting': 'עיצוב בסיסי',
      'Increase quote level': 'רמת ציטוט',
      'Decrease quote level': 'רמת ציטוט ירידה',
      'Image / Video': 'תמונה / וידאו',
      'Resize larger': 'גודל גדול יותר',
      'Resize smaller': 'גודל קטן יותר',
      'Table': 'שולחן',
      'Select table cell': 'בחר תא תא - -',
      'Extend selection one cell': 'להאריך את הבחירה תא אחד',
      'Extend selection one row': 'להאריך את הבחירה שורה אחת',
      'Navigation': 'ניווט',
      'Focus popup / toolbar': 'מוקד קופץ / סרגל הכלים',
      'Return focus to previous position': 'חזרה להתמקד קודם',
      // Embed.ly
      'Embed URL': 'כתובת אתר להטביע',
      'Paste in a URL to embed': 'הדבק כתובת אתר להטביע',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'התוכן המודבק מגיע ממסמך Word של Microsoft. האם ברצונך לשמור את הפורמט או לנקות אותו?',
      'Keep': 'לִשְׁמוֹר',
      'Clean': 'לְנַקוֹת',
      'Word Paste Detected': 'הדבק מילה זוהתה',
      // Character Counter 
      'Characters': 'תווים',
      // More Buttons
      'More Text': 'עוד טקסט',
      'More Paragraph': 'עוד סעיף',
      'More Rich': 'עוד  עשיר',
      'More Misc': 'שונות עוד'
    },
    direction: 'rtl'
  };

})));
//# sourceMappingURL=he.js.map
