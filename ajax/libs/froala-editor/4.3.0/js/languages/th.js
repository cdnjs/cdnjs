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
   * Thai
   */
  FE.LANGUAGE['th'] = {
    translation: {
      // Place holder
      'Type something': "\u0E1E\u0E34\u0E21\u0E1E\u0E4C\u0E1A\u0E32\u0E07\u0E2A\u0E34\u0E48\u0E07\u0E1A\u0E32\u0E07\u0E2D\u0E22\u0E48\u0E32\u0E07",
      // Basic formatting
      'Bold': "\u0E15\u0E31\u0E27\u0E2B\u0E19\u0E32",
      'Italic': "\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E35\u0E22\u0E07",
      'Underline': "\u0E02\u0E35\u0E14\u0E40\u0E2A\u0E49\u0E19\u0E43\u0E15\u0E49",
      'Strikethrough': "\u0E02\u0E35\u0E14\u0E17\u0E31\u0E1A",
      // Main buttons
      'Insert': "\u0E41\u0E17\u0E23\u0E01",
      'Delete': "\u0E25\u0E1A",
      'Cancel': "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01",
      'OK': "\u0E15\u0E01\u0E25\u0E07",
      'Back': "\u0E01\u0E25\u0E31\u0E1A",
      'Remove': "\u0E40\u0E2D\u0E32\u0E2D\u0E2D\u0E01",
      'More': "\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32",
      'Update': "\u0E2D\u0E31\u0E1E\u0E40\u0E14\u0E17",
      'Style': "\u0E2A\u0E44\u0E15\u0E25\u0E4C",
      // Font
      'Font Family': "\u0E15\u0E23\u0E30\u0E01\u0E39\u0E25\u0E41\u0E1A\u0E1A\u0E2D\u0E31\u0E01\u0E29\u0E23",
      'Font Size': "\u0E02\u0E19\u0E32\u0E14\u0E41\u0E1A\u0E1A\u0E2D\u0E31\u0E01\u0E29\u0E23",
      // Colors
      'Colors': "\u0E2A\u0E35",
      'Background': "\u0E1E\u0E37\u0E49\u0E19\u0E2B\u0E25\u0E31\u0E07",
      'Text': "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21",
      'HEX Color': 'สีฐานสิบหก',
      // Paragraphs
      'Paragraph Format': "\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A",
      'Normal': "\u0E1B\u0E01\u0E15\u0E34",
      'Code': "\u0E42\u0E04\u0E49\u0E14",
      'Heading 1': "\u0E2A\u0E48\u0E27\u0E19\u0E2B\u0E31\u0E27 1",
      'Heading 2': "\u0E2A\u0E48\u0E27\u0E19\u0E2B\u0E31\u0E27 2",
      'Heading 3': "\u0E2A\u0E48\u0E27\u0E19\u0E2B\u0E31\u0E27 3",
      'Heading 4': "\u0E2A\u0E48\u0E27\u0E19\u0E2B\u0E31\u0E27 4",
      // Style
      'Paragraph Style': "\u0E25\u0E31\u0E01\u0E29\u0E13\u0E30\u0E22\u0E48\u0E2D\u0E2B\u0E19\u0E49\u0E32",
      'Inline Style': "\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E2D\u0E34\u0E19\u0E44\u0E25\u0E19\u0E4C",
      // Alignment
      'Align': "\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E41\u0E19\u0E27",
      'Align Left': "\u0E08\u0E31\u0E14\u0E0A\u0E34\u0E14\u0E0B\u0E49\u0E32\u0E22",
      'Align Center': "\u0E08\u0E31\u0E14\u0E01\u0E36\u0E48\u0E07\u0E01\u0E25\u0E32\u0E07",
      'Align Right': "\u0E08\u0E31\u0E14\u0E0A\u0E34\u0E14\u0E02\u0E27\u0E32",
      'Align Justify': "\u0E40\u0E15\u0E47\u0E21\u0E41\u0E19\u0E27",
      'None': "\u0E44\u0E21\u0E48",
      // Lists
      'Ordered List': "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E40\u0E25\u0E02",
      'Unordered List': "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E0D\u0E25\u0E31\u0E01\u0E29\u0E13\u0E4C\u0E2B\u0E31\u0E27\u0E02\u0E49\u0E2D\u0E22\u0E48\u0E2D\u0E22",
      // Indent
      'Decrease Indent': "\u0E25\u0E14\u0E01\u0E32\u0E23\u0E40\u0E22\u0E37\u0E49\u0E2D\u0E07",
      'Increase Indent': "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E01\u0E32\u0E23\u0E40\u0E22\u0E37\u0E49\u0E2D\u0E07",
      // Links
      'Insert Link': "\u0E41\u0E17\u0E23\u0E01\u0E25\u0E34\u0E07\u0E01\u0E4C",
      'Open in new tab': "\u0E40\u0E1B\u0E34\u0E14\u0E43\u0E19\u0E41\u0E17\u0E47\u0E1A\u0E43\u0E2B\u0E21\u0E48",
      'Open Link': "\u0E40\u0E1B\u0E34\u0E14\u0E25\u0E34\u0E49\u0E07\u0E04\u0E4C",
      'Edit Link': "\u0E25\u0E34\u0E07\u0E04\u0E4C\u0E41\u0E01\u0E49\u0E44\u0E02",
      'Unlink': "\u0E40\u0E2D\u0E32\u0E25\u0E34\u0E07\u0E01\u0E4C\u0E2D\u0E2D\u0E01",
      'Choose Link': "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E42\u0E22\u0E07",
      // Images
      'Insert Image': "\u0E41\u0E17\u0E23\u0E01\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E",
      'Upload Image': "\u0E01\u0E32\u0E23\u0E2D\u0E31\u0E1B\u0E42\u0E2B\u0E25\u0E14\u0E20\u0E32\u0E1E",
      'By URL': "\u0E15\u0E32\u0E21 URL",
      'Browse': "\u0E40\u0E23\u0E35\u0E22\u0E01\u0E14\u0E39",
      'Drop image': "\u0E27\u0E32\u0E07\u0E20\u0E32\u0E1E",
      'or click': "\u0E2B\u0E23\u0E37\u0E2D\u0E04\u0E25\u0E34\u0E01\u0E17\u0E35\u0E48",
      'Manage Images': "\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E20\u0E32\u0E1E",
      'Loading': "\u0E42\u0E2B\u0E25\u0E14",
      'Deleting': "\u0E25\u0E1A",
      'Tags': "\u0E41\u0E17\u0E47\u0E01",
      'Are you sure? Image will be deleted.': "\u0E04\u0E38\u0E13\u0E41\u0E19\u0E48\u0E43\u0E08\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48 \u0E20\u0E32\u0E1E\u0E08\u0E30\u0E16\u0E39\u0E01\u0E25\u0E1A",
      'Replace': "\u0E41\u0E17\u0E19\u0E17\u0E35\u0E48",
      'Uploading': "\u0E2D\u0E31\u0E1E\u0E42\u0E2B\u0E25\u0E14",
      'Loading image': "\u0E42\u0E2B\u0E25\u0E14\u0E20\u0E32\u0E1E",
      'Display': "\u0E41\u0E2A\u0E14\u0E07",
      'Inline': "\u0E41\u0E1A\u0E1A\u0E2D\u0E34\u0E19\u0E44\u0E25\u0E19\u0E4C",
      'Break Text': "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E2B\u0E22\u0E38\u0E14",
      'Alternative Text': "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E2D\u0E37\u0E48\u0E19",
      'Change Size': "\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E02\u0E19\u0E32\u0E14",
      'Width': "\u0E04\u0E27\u0E32\u0E21\u0E01\u0E27\u0E49\u0E32\u0E07",
      'Height': "\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E39\u0E07",
      'Something went wrong. Please try again.': "\u0E1A\u0E32\u0E07\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34. \u0E01\u0E23\u0E38\u0E13\u0E32\u0E25\u0E2D\u0E07\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07.",
      'Image Caption': 'คำบรรยายภาพ',
      'Advanced Edit': 'แก้ไขขั้นสูง',
      // Video
      'Insert Video': "\u0E41\u0E17\u0E23\u0E01\u0E27\u0E34\u0E14\u0E35\u0E42\u0E2D",
      'Embedded Code': "\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E21\u0E2D\u0E07\u0E01\u0E25\u0E1D\u0E31\u0E07\u0E15\u0E31\u0E27",
      'Paste in a video URL': 'วางใน URL วิดีโอ',
      'Drop video': 'วางวิดีโอ',
      'Your browser does not support HTML5 video.': 'เบราเซอร์ของคุณไม่สนับสนุนวิดีโอ HTML5',
      'Upload Video': 'อัปโหลดวิดีโอ',
      // Tables
      'Insert Table': "\u0E41\u0E17\u0E23\u0E01\u0E15\u0E32\u0E23\u0E32\u0E07",
      'Table Header': "\u0E2A\u0E48\u0E27\u0E19\u0E2B\u0E31\u0E27\u0E02\u0E2D\u0E07\u0E15\u0E32\u0E23\u0E32\u0E07",
      'Remove Table': "\u0E40\u0E2D\u0E32\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2D\u0E2D\u0E01",
      'Table Style': "\u0E25\u0E31\u0E01\u0E29\u0E13\u0E30\u0E15\u0E32\u0E23\u0E32\u0E07",
      'Horizontal Align': "\u0E43\u0E19\u0E41\u0E19\u0E27\u0E19\u0E2D\u0E19",
      'Row': "\u0E41\u0E16\u0E27",
      'Insert row above': "\u0E41\u0E17\u0E23\u0E01\u0E41\u0E16\u0E27\u0E14\u0E49\u0E32\u0E19\u0E1A\u0E19",
      'Insert row below': "\u0E41\u0E17\u0E23\u0E01\u0E41\u0E16\u0E27\u0E14\u0E49\u0E32\u0E19\u0E25\u0E48\u0E32\u0E07",
      'Delete row': "\u0E25\u0E1A\u0E41\u0E16\u0E27",
      'Column': "\u0E04\u0E2D\u0E25\u0E31\u0E21\u0E19\u0E4C",
      'Insert column before': "\u0E41\u0E17\u0E23\u0E01\u0E04\u0E2D\u0E25\u0E31\u0E21\u0E19\u0E4C\u0E02\u0E49\u0E32\u0E07\u0E2B\u0E19\u0E49\u0E32",
      'Insert column after': "\u0E41\u0E17\u0E23\u0E01\u0E04\u0E2D\u0E25\u0E31\u0E21\u0E19\u0E4C\u0E02\u0E49\u0E32\u0E07\u0E2B\u0E25\u0E31\u0E07",
      'Delete column': "\u0E25\u0E1A\u0E04\u0E2D\u0E25\u0E31\u0E21\u0E19\u0E4C",
      'Cell': "\u0E40\u0E0B\u0E25\u0E25\u0E4C",
      'Merge cells': "\u0E1C\u0E2A\u0E32\u0E19\u0E40\u0E0B\u0E25\u0E25\u0E4C",
      'Horizontal split': "\u0E41\u0E22\u0E01\u0E41\u0E19\u0E27\u0E19\u0E2D\u0E19",
      'Vertical split': "\u0E41\u0E22\u0E01\u0E43\u0E19\u0E41\u0E19\u0E27\u0E15\u0E31\u0E49\u0E07",
      'Cell Background': "\u0E1E\u0E37\u0E49\u0E19\u0E2B\u0E25\u0E31\u0E07\u0E02\u0E2D\u0E07\u0E40\u0E0B\u0E25\u0E25\u0E4C",
      'Vertical Align': "\u0E08\u0E31\u0E14\u0E41\u0E19\u0E27\u0E15\u0E31\u0E49\u0E07",
      'Top': "\u0E14\u0E49\u0E32\u0E19\u0E1A\u0E19",
      'Middle': "\u0E01\u0E25\u0E32\u0E07",
      'Bottom': "\u0E01\u0E49\u0E19",
      'Align Top': "\u0E08\u0E31\u0E14\u0E14\u0E49\u0E32\u0E19\u0E1A\u0E19",
      'Align Middle': "\u0E15\u0E4D\u0E32\u0E41\u0E2B\u0E19\u0E48\u0E07\u0E01\u0E25\u0E32\u0E07",
      'Align Bottom': "\u0E15\u0E4D\u0E32\u0E41\u0E2B\u0E19\u0E48\u0E07\u0E14\u0E49\u0E32\u0E19\u0E25\u0E48\u0E32\u0E07",
      'Cell Style': "\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E02\u0E2D\u0E07\u0E40\u0E0B\u0E25\u0E25\u0E4C",
      // Files
      'Upload File': "\u0E2D\u0E31\u0E1B\u0E42\u0E2B\u0E25\u0E14\u0E44\u0E1F\u0E25\u0E4C",
      'Drop file': "\u0E27\u0E32\u0E07\u0E44\u0E1F\u0E25\u0E4C",
      // Emoticons
      'Emoticons': "\u0E2D\u0E35\u0E42\u0E21\u0E15\u0E34\u0E04\u0E2D\u0E19",
      'Grinning face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E22\u0E34\u0E49\u0E21",
      'Grinning face with smiling eyes': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E22\u0E34\u0E49\u0E21\u0E14\u0E49\u0E27\u0E22\u0E15\u0E32\u0E22\u0E34\u0E49\u0E21",
      'Face with tears of joy': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E14\u0E49\u0E27\u0E22\u0E19\u0E49\u0E33\u0E15\u0E32\u0E41\u0E2B\u0E48\u0E07\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E38\u0E02",
      'Smiling face with open mouth': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E40\u0E1B\u0E37\u0E49\u0E2D\u0E19\u0E23\u0E2D\u0E22\u0E22\u0E34\u0E49\u0E21\u0E17\u0E35\u0E48\u0E21\u0E35\u0E1B\u0E32\u0E01\u0E40\u0E1B\u0E34\u0E14",
      'Smiling face with open mouth and smiling eyes': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E22\u0E34\u0E49\u0E21\u0E01\u0E31\u0E1A\u0E40\u0E1B\u0E34\u0E14\u0E1B\u0E32\u0E01\u0E41\u0E25\u0E30\u0E15\u0E32\u0E22\u0E34\u0E49\u0E21",
      'Smiling face with open mouth and cold sweat': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E22\u0E34\u0E49\u0E21\u0E14\u0E49\u0E27\u0E22\u0E1B\u0E32\u0E01\u0E40\u0E1B\u0E34\u0E14\u0E41\u0E25\u0E30\u0E40\u0E2B\u0E07\u0E37\u0E48\u0E2D\u0E40\u0E22\u0E47\u0E19",
      'Smiling face with open mouth and tightly-closed eyes': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E22\u0E34\u0E49\u0E21\u0E01\u0E31\u0E1A\u0E40\u0E1B\u0E34\u0E14\u0E1B\u0E32\u0E01\u0E41\u0E25\u0E30\u0E15\u0E32\u0E41\u0E19\u0E48\u0E19\u0E1B\u0E34\u0E14",
      'Smiling face with halo': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E22\u0E34\u0E49\u0E21\u0E17\u0E35\u0E48\u0E21\u0E35\u0E23\u0E31\u0E28\u0E21\u0E35",
      'Smiling face with horns': "\u0E22\u0E34\u0E49\u0E21\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E21\u0E35\u0E40\u0E02\u0E32",
      'Winking face': "\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E1E\u0E23\u0E34\u0E1A\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32",
      'Smiling face with smiling eyes': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E22\u0E34\u0E49\u0E21\u0E14\u0E49\u0E27\u0E22\u0E15\u0E32\u0E22\u0E34\u0E49\u0E21",
      'Face savoring delicious food': "\u0E40\u0E1C\u0E0A\u0E34\u0E0D savoring \u0E2D\u0E32\u0E2B\u0E32\u0E23\u0E2D\u0E23\u0E48\u0E2D\u0E22",
      'Relieved face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E42\u0E25\u0E48\u0E07\u0E43\u0E08",
      'Smiling face with heart-shaped eyes': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E22\u0E34\u0E49\u0E21\u0E14\u0E49\u0E27\u0E22\u0E15\u0E32\u0E23\u0E39\u0E1B\u0E2B\u0E31\u0E27\u0E43\u0E08",
      'Smiling face with sunglasses': "\u0E22\u0E34\u0E49\u0E21\u0E2B\u0E19\u0E49\u0E32\u0E14\u0E49\u0E27\u0E22\u0E41\u0E27\u0E48\u0E19\u0E15\u0E32\u0E01\u0E31\u0E19\u0E41\u0E14\u0E14",
      'Smirking face': "\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E2A\u0E22\u0E30\u0E22\u0E34\u0E49\u0E21\u0E17\u0E35\u0E48\u0E21\u0E38\u0E21",
      'Neutral face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E32\u0E07",
      'Expressionless face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E2D\u0E32\u0E23\u0E21\u0E13\u0E4C",
      'Unamused face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32 Unamused",
      'Face with cold sweat': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E21\u0E35\u0E40\u0E2B\u0E07\u0E37\u0E48\u0E2D\u0E40\u0E22\u0E47\u0E19",
      'Pensive face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E2B\u0E21\u0E48\u0E19",
      'Confused face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E2A\u0E31\u0E1A\u0E2A\u0E19",
      'Confounded face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E2A\u0E31\u0E1A\u0E2A\u0E19",
      'Kissing face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E08\u0E39\u0E1A",
      'Face throwing a kiss': "\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1C\u0E0A\u0E34\u0E0D\u0E01\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E02\u0E27\u0E49\u0E32\u0E07\u0E1B\u0E32\u0E08\u0E39\u0E1A",
      'Kissing face with smiling eyes': "\u0E08\u0E39\u0E1A\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E14\u0E49\u0E27\u0E22\u0E15\u0E32\u0E22\u0E34\u0E49\u0E21",
      'Kissing face with closed eyes': "\u0E08\u0E39\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E14\u0E49\u0E27\u0E22\u0E14\u0E27\u0E07\u0E15\u0E32\u0E17\u0E35\u0E48\u0E1B\u0E34\u0E14\u0E2A\u0E19\u0E34\u0E17",
      'Face with stuck out tongue': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E21\u0E35\u0E41\u0E1E\u0E25\u0E21\u0E2D\u0E2D\u0E01\u0E21\u0E32\u0E25\u0E34\u0E49\u0E19",
      'Face with stuck out tongue and winking eye': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E21\u0E35\u0E15\u0E34\u0E14\u0E25\u0E34\u0E49\u0E19\u0E41\u0E25\u0E30\u0E15\u0E32\u0E02\u0E22\u0E34\u0E1A\u0E15\u0E32",
      'Face with stuck out tongue and tightly-closed eyes': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E21\u0E35\u0E15\u0E34\u0E14\u0E25\u0E34\u0E49\u0E19\u0E41\u0E25\u0E30\u0E14\u0E27\u0E07\u0E15\u0E32\u0E17\u0E35\u0E48\u0E1B\u0E34\u0E14\u0E41\u0E19\u0E48\u0E19",
      'Disappointed face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E1C\u0E34\u0E14\u0E2B\u0E27\u0E31\u0E07",
      'Worried face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E01\u0E31\u0E07\u0E27\u0E25",
      'Angry face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E42\u0E01\u0E23\u0E18",
      'Pouting face': "\u0E2B\u0E19\u0E49\u0E32\u0E21\u0E38\u0E48\u0E22",
      'Crying face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E23\u0E49\u0E2D\u0E07\u0E44\u0E2B\u0E49",
      'Persevering face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E40\u0E2D\u0E32\u0E16\u0E48\u0E32\u0E19",
      'Face with look of triumph': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E25\u0E31\u0E01\u0E29\u0E13\u0E4C\u0E02\u0E2D\u0E07\u0E0A\u0E31\u0E22\u0E0A\u0E19\u0E30",
      'Disappointed but relieved face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E1C\u0E34\u0E14\u0E2B\u0E27\u0E31\u0E07 \u0E41\u0E15\u0E48\u0E42\u0E25\u0E48\u0E07\u0E43\u0E08",
      'Frowning face with open mouth': "\u0E2B\u0E19\u0E49\u0E32\u0E21\u0E38\u0E48\u0E22\u0E17\u0E35\u0E48\u0E21\u0E35\u0E1B\u0E32\u0E01\u0E40\u0E1B\u0E34\u0E14",
      'Anguished face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E01\u0E14\u0E02\u0E35\u0E48",
      'Fearful face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E19\u0E48\u0E32\u0E01\u0E25\u0E31\u0E27",
      'Weary face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E40\u0E2B\u0E19\u0E37\u0E48\u0E2D\u0E22\u0E25\u0E49\u0E32",
      'Sleepy face': "\u0E2B\u0E19\u0E49\u0E32\u0E07\u0E48\u0E27\u0E07\u0E19\u0E2D\u0E19",
      'Tired face': "\u0E2B\u0E19\u0E49\u0E32\u0E40\u0E1A\u0E37\u0E48\u0E2D",
      'Grimacing face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32 grimacing",
      'Loudly crying face': "\u0E23\u0E49\u0E2D\u0E07\u0E44\u0E2B\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E07\u0E14\u0E31\u0E07\u0E2B\u0E19\u0E49\u0E32",
      'Face with open mouth': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E21\u0E35\u0E1B\u0E32\u0E01\u0E40\u0E1B\u0E34\u0E14",
      'Hushed face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E40\u0E07\u0E35\u0E22\u0E1A",
      'Face with open mouth and cold sweat': 'หน้ากับปากเปิดและเหงื่อเย็น',
      'Face screaming in fear': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E21\u0E35\u0E1B\u0E32\u0E01\u0E40\u0E1B\u0E34\u0E14\u0E41\u0E25\u0E30\u0E40\u0E2B\u0E07\u0E37\u0E48\u0E2D\u0E40\u0E22\u0E47\u0E19",
      'Astonished face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E1B\u0E23\u0E30\u0E2B\u0E25\u0E32\u0E14\u0E43\u0E08",
      'Flushed face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E14\u0E07",
      'Sleeping face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E19\u0E2D\u0E19",
      'Dizzy face': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E15\u0E32\u0E25\u0E32\u0E22",
      'Face without mouth': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E32\u0E01",
      'Face with medical mask': "\u0E43\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E14\u0E49\u0E27\u0E22\u0E2B\u0E19\u0E49\u0E32\u0E01\u0E32\u0E01\u0E17\u0E32\u0E07\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C",
      // Line breaker
      'Break': "\u0E2B\u0E22\u0E38\u0E14",
      // Math
      'Subscript': "\u0E15\u0E31\u0E27\u0E2B\u0E49\u0E2D\u0E22",
      'Superscript': "\u0E15\u0E31\u0E27\u0E22\u0E01",
      // Full screen
      'Fullscreen': "\u0E40\u0E15\u0E47\u0E21\u0E2B\u0E19\u0E49\u0E32\u0E08\u0E2D",
      // Horizontal line
      'Insert Horizontal Line': "\u0E41\u0E17\u0E23\u0E01\u0E40\u0E2A\u0E49\u0E19\u0E41\u0E19\u0E27\u0E19\u0E2D\u0E19",
      // Clear formatting
      'Clear Formatting': "\u0E19\u0E33\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A",
      // Save
      'Save': "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01",
      // Undo, redo
      'Undo': "\u0E40\u0E25\u0E34\u0E01\u0E17\u0E33",
      'Redo': "\u0E17\u0E4D\u0E32\u0E0B\u0E49\u0E33",
      // Select all
      'Select All': "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
      // Code view
      'Code View': "\u0E21\u0E38\u0E21\u0E21\u0E2D\u0E07\u0E23\u0E2B\u0E31\u0E2A",
      // Quote
      'Quote': "\u0E2D\u0E49\u0E32\u0E07",
      'Increase': "\u0E40\u0E1E\u0E34\u0E48\u0E21",
      'Decrease': "\u0E25\u0E14\u0E25\u0E07",
      // Quick Insert
      'Quick Insert': "\u0E41\u0E17\u0E23\u0E01\u0E14\u0E48\u0E27\u0E19",
      // Spcial Characters
      'Special Characters': 'อักขระพิเศษ',
      'Latin': 'ละติน',
      'Greek': 'กรีก',
      'Cyrillic': 'ริลลิก',
      'Punctuation': 'วรรคตอน',
      'Currency': 'เงินตรา',
      'Arrows': 'ลูกศร',
      'Math': 'คณิตศาสตร์',
      'Misc': 'อื่น ๆ',
      // Print.
      'Print': 'พิมพ์',
      // Spell Checker.
      'Spell Checker': 'ตัวตรวจสอบการสะกด',
      // Help
      'Help': 'ช่วยด้วย',
      'Shortcuts': 'ทางลัด',
      'Inline Editor': 'ตัวแก้ไขแบบอินไลน์',
      'Show the editor': 'แสดงตัวแก้ไข',
      'Common actions': 'การกระทำร่วมกัน',
      'Copy': 'สำเนา',
      'Cut': 'ตัด',
      'Paste': 'แปะ',
      'Basic Formatting': 'การจัดรูปแบบพื้นฐาน',
      'Increase quote level': 'ระดับราคาเพิ่มขึ้น',
      'Decrease quote level': 'ระดับราคาลดลง',
      'Image / Video': 'ภาพ / วิดีโอ',
      'Resize larger': 'ปรับขนาดใหญ่ขึ้น',
      'Resize smaller': 'ปรับขนาดเล็กลง',
      'Table': 'ตาราง',
      'Select table cell': 'เลือกเซลล์ตาราง',
      'Extend selection one cell': 'ขยายการเลือกหนึ่งเซลล์',
      'Extend selection one row': 'ขยายการเลือกหนึ่งแถว',
      'Navigation': 'การเดินเรือ',
      'Focus popup / toolbar': 'โฟกัสป๊อปอัพ / แถบเครื่องมือ',
      'Return focus to previous position': 'กลับไปยังตำแหน่งก่อนหน้า',
      // Embed.ly
      'Embed URL': 'ฝัง URL',
      'Paste in a URL to embed': 'วางใน url เพื่อฝัง',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'เนื้อหาที่วางจะมาจากเอกสารคำในแบบ microsoft คุณต้องการเก็บรูปแบบหรือทำความสะอาดหรือไม่?',
      'Keep': 'เก็บ',
      'Clean': 'สะอาด',
      'Word Paste Detected': 'ตรวจพบการวางคำ',
      // Character Counter
      'Characters': 'ตัวละคร',
      // More Buttons
      'More Text': 'ข้อความเพิ่มเติม',
      'More Paragraph': 'ย่อหน้าเพิ่มเติม',
      'More Rich': 'รวยมากขึ้น',
      'More Misc': 'อื่น ๆ'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=th.js.map
