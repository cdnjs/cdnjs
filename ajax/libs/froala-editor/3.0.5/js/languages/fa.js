/*!
 * froala_editor v3.0.5 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2019 Froala Labs
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('froala-editor')) :
  typeof define === 'function' && define.amd ? define(['froala-editor'], factory) :
  (factory(global.FroalaEditor));
}(this, (function (FE) { 'use strict';

  FE = FE && FE.hasOwnProperty('default') ? FE['default'] : FE;

  /**
   * Persian
   */
  FE.LANGUAGE['fa'] = {
    translation: {
      // Place holder
      'Type something': "\u0686\u06CC\u0632\u06CC \u0628\u0646\u0648\u06CC\u0633\u06CC\u062F",
      // Basic formatting
      'Bold': 'ضخیم',
      'Italic': 'خط کج',
      'Underline': 'خط زیر',
      'Strikethrough': "\u062E\u0637 \u062E\u0648\u0631\u062F\u0647",
      // Main buttons
      'Insert': "\u0627\u0636\u0627\u0641\u0647 \u06A9\u0631\u062F\u0646",
      'Delete': "\u062D\u0630\u0641 \u06A9\u0631\u062F\u0646",
      'Cancel': "\u0644\u063A\u0648",
      'OK': "\u0628\u0627\u0634\u0647",
      'Back': "\u0628\u0647 \u0639\u0642\u0628",
      'Remove': "\u0628\u0631\u062F\u0627\u0634\u062A\u0646",
      'More': "\u0628\u06CC\u0634\u062A\u0631",
      'Update': "\u0628\u0647 \u0631\u0648\u0632 \u0631\u0633\u0627\u0646\u06CC",
      'Style': "\u0633\u0628\u06A9",
      // Font
      'Font Family': "\u0642\u0644\u0645",
      'Font Size': "\u0627\u0646\u062F\u0627\u0632\u0647 \u0642\u0644\u0645",
      // Colors
      'Colors': "\u0631\u0646\u06AF",
      'Background': "\u0632\u0645\u06CC\u0646\u0647 \u0645\u062A\u0646",
      'Text': "\u0645\u062A\u0646",
      'HEX Color': 'کد رنگ',
      // Paragraphs
      'Paragraph Format': "\u0642\u0627\u0644\u0628",
      'Normal': "\u0637\u0628\u06CC\u0639\u06CC - Normal",
      'Code': "\u062F\u0633\u062A\u0648\u0631\u0627\u0644\u0639\u0645\u0644\u0647\u0627 - Code",
      'Heading 1': "\u0633\u0631\u200C\u0635\u0641\u062D\u0647 1",
      'Heading 2': "\u0633\u0631\u200C\u0635\u0641\u062D\u0647 2",
      'Heading 3': "\u0633\u0631\u200C\u0635\u0641\u062D\u0647 3",
      'Heading 4': "\u0633\u0631\u200C\u0635\u0641\u062D\u0647 4",
      // Style
      'Paragraph Style': "\u067E\u0627\u0631\u0627\u06AF\u0631\u0627\u0641 \u0633\u0628\u06A9",
      'Inline Style': "\u062E\u0637\u06CC \u0633\u0628\u06A9",
      // Alignment
      'Align': "\u0631\u062F\u06CC\u0641 \u0628\u0646\u062F\u06CC \u0646\u0648\u0634\u062A\u0647",
      'Align Left': "\u0686\u067E \u0686\u06CC\u0646",
      'Align Center': "\u0648\u0633\u0637 \u0686\u06CC\u0646",
      'Align Right': "\u0631\u0627\u0633\u062A \u0686\u06CC\u0646",
      'Align Justify': "\u0645\u0633\u0627\u0648\u06CC \u0627\u0632 \u0637\u0631\u0641\u06CC\u0646",
      'None': "\u0647\u06CC\u0686",
      // Lists
      'Ordered List': "\u0644\u06CC\u0633\u062A \u0634\u0645\u0627\u0631\u0647 \u0627\u06CC",
      'Unordered List': "\u0644\u06CC\u0633\u062A \u062F\u0627\u06CC\u0631\u0647 \u0627\u06CC",
      // Indent
      'Decrease Indent': "\u06A9\u0627\u0647\u0634 \u062A\u0648 \u0631\u0641\u062A\u06AF\u06CC",
      'Increase Indent': "\u0627\u0641\u0632\u0627\u06CC\u0634 \u062A\u0648 \u0631\u0641\u062A\u06AF\u06CC",
      // Links
      'Insert Link': "\u0627\u0636\u0627\u0641\u0647 \u06A9\u0631\u062F\u0646 \u0644\u06CC\u0646\u06A9",
      'Open in new tab': "\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u062F\u0631 \u0628\u0631\u06AF\u0647 \u062C\u062F\u06CC\u062F",
      'Open Link': "\u0644\u06CC\u0646\u06A9 \u0647\u0627\u06CC \u0628\u0627\u0632",
      'Edit Link': "\u0644\u06CC\u0646\u06A9 \u0648\u06CC\u0631\u0627\u06CC\u0634",
      'Unlink': "\u062D\u0630\u0641 \u0644\u06CC\u0646\u06A9",
      'Choose Link': "\u0644\u06CC\u0646\u06A9 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F",
      // Images
      'Insert Image': "\u0627\u0636\u0627\u0641\u0647 \u06A9\u0631\u062F\u0646 \u062A\u0635\u0648\u06CC\u0631",
      'Upload Image': "\u0622\u067E\u0644\u0648\u062F \u062A\u0635\u0648\u06CC\u0631",
      'By URL': "URL \u062A\u0648\u0633\u0637",
      'Browse': "\u0641\u0647\u0631\u0633\u062A",
      'Drop image': "\u062A\u0635\u0648\u06CC\u0631 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0628\u06CC\u0646\u062F\u0627\u0632\u06CC\u062F",
      'or click': "\u06CC\u0627 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646\u06CC\u062F",
      'Manage Images': "\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0635\u0627\u0648\u06CC\u0631",
      'Loading': "\u0628\u0627\u0631\u06AF\u06CC\u0631\u06CC",
      'Deleting': "\u062D\u0630\u0641",
      'Tags': "\u0628\u0631\u0686\u0633\u0628 \u0647\u0627",
      'Are you sure? Image will be deleted.': ".\u0622\u06CC\u0627 \u0645\u0637\u0645\u0626\u0646 \u0647\u0633\u062A\u06CC\u062F\u061F \u062A\u0635\u0648\u06CC\u0631 \u062D\u0630\u0641 \u062E\u0648\u0627\u0647\u062F \u0634\u062F",
      'Replace': "\u062C\u0627\u06CC\u06AF\u0632\u06CC\u0646 \u06A9\u0631\u062F\u0646",
      'Uploading': "\u0622\u067E\u0644\u0648\u062F",
      'Loading image': "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u062A\u0635\u0648\u06CC\u0631",
      'Display': "\u0646\u0634\u0627\u0646 \u062F\u0627\u062F\u0646",
      'Inline': "\u062E\u0637\u06CC",
      'Break Text': "\u0634\u06A9\u0633\u062A\u0646 \u0627\u0633\u062A\u0631\u0627\u062D\u062A",
      'Alternative Text': "\u0645\u062A\u0646 \u062C\u0627\u06CC\u06AF\u0632\u06CC\u0646",
      'Change Size': "\u062A\u063A\u06CC\u06CC\u0631 \u0627\u0646\u062F\u0627\u0632\u0647",
      'Width': "\u0639\u0631\u0636",
      'Height': "\u0627\u0631\u062A\u0641\u0627\u0639",
      'Something went wrong. Please try again.': 'خطایی رخ داده است ، لطفا مجددا تلاش کنید',
      'Image Caption': 'عنوان تصویر',
      'Advanced Edit': 'ویرایش پیشرفته',
      // Video
      'Insert Video': "\u0627\u0636\u0627\u0641\u0647 \u06A9\u0631\u062F\u0646 \u0641\u0627\u06CC\u0644 \u062A\u0635\u0648\u06CC\u0631\u06CC",
      'Embedded Code': "\u06A9\u062F \u062C\u0627\u0633\u0627\u0632\u06CC \u0634\u062F\u0647",
      'Paste in a video URL': 'در URL ویدیو وارد کنید',
      'Drop video': 'رها کردن ویدیو',
      'Your browser does not support HTML5 video.': 'مرورگر شما ویدیو HTML5 را پشتیبانی نمی کند.',
      'Upload Video': 'آپلود ویدیو',
      // Tables
      'Insert Table': "\u0627\u0636\u0627\u0641\u0647 \u06A9\u0631\u062F\u0646 \u062C\u062F\u0648\u0644",
      'Table Header': "\u0647\u062F\u0631 \u062C\u062F\u0648\u0644",
      'Remove Table': "\u062D\u0630\u0641 \u062C\u062F\u0648\u0644",
      'Table Style': "\u0633\u0628\u06A9 \u062C\u062F\u0648\u0644",
      'Horizontal Align': "\u062A\u0646\u0638\u06CC\u0645 \u0627\u0641\u0642\u06CC",
      'Row': "\u0633\u0637\u0631",
      'Insert row above': "\u062F\u0631\u062C \u0631\u062F\u06CC\u0641 \u062F\u0631 \u0628\u0627\u0644\u0627",
      'Insert row below': "\u0633\u0637\u0631 \u0632\u06CC\u0631 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F",
      'Delete row': "\u062D\u0630\u0641 \u0633\u0637\u0631",
      'Column': "\u0633\u062A\u0648\u0646",
      'Insert column before': "\u062F\u0631\u062C \u0633\u062A\u0648\u0646 \u0642\u0628\u0644",
      'Insert column after': "\u062F\u0631\u062C \u0633\u062A\u0648\u0646 \u0628\u0639\u062F",
      'Delete column': "\u062D\u0630\u0641 \u0633\u062A\u0648\u0646",
      'Cell': "\u0633\u0644\u0648\u0644",
      'Merge cells': "\u0627\u062F\u063A\u0627\u0645 \u0633\u0644\u0648\u0644\u200C\u0647\u0627",
      'Horizontal split': "\u062A\u0642\u0633\u06CC\u0645 \u0627\u0641\u0642\u06CC",
      'Vertical split': "\u062A\u0642\u0633\u06CC\u0645 \u0639\u0645\u0648\u062F\u06CC",
      'Cell Background': "\u067E\u0633 \u0632\u0645\u06CC\u0646\u0647 \u0647\u0645\u0631\u0627\u0647",
      'Vertical Align': "\u0631\u062F\u06CC\u0641 \u0639\u0645\u0648\u062F\u06CC",
      'Top': "\u0628\u0627\u0644\u0627",
      'Middle': "\u0645\u062A\u0648\u0633\u0637",
      'Bottom': "\u067E\u0627\u06CC\u06CC\u0646",
      'Align Top': "\u062A\u0631\u0627\u0632 \u0628\u0627\u0644\u0627\u06CC",
      'Align Middle': "\u062A\u0631\u0627\u0632 \u0648\u0633\u0637",
      'Align Bottom': "\u062A\u0631\u0627\u0632 \u067E\u0627\u06CC\u06CC\u0646",
      'Cell Style': "\u0633\u0628\u06A9 \u0647\u0627\u06CC \u0647\u0645\u0631\u0627\u0647",
      // Files
      'Upload File': "\u0622\u067E\u0644\u0648\u062F \u0641\u0627\u06CC\u0644",
      'Drop file': "\u0627\u0641\u062A \u0641\u0627\u06CC\u0644",
      // Emoticons
      'Emoticons': "\u0634\u06A9\u0644\u06A9 \u0647\u0627",
      'Grinning face': "\u0686\u0647\u0631\u0647 \u067E\u0648\u0632\u062E\u0646\u062F",
      'Grinning face with smiling eyes': "\u0686\u0647\u0631\u0647 \u067E\u0648\u0632\u062E\u0646\u062F \u0628\u0627 \u0686\u0634\u0645\u0627\u0646 \u062E\u0646\u062F\u0627\u0646",
      'Face with tears of joy': "\u0686\u0647\u0631\u0647 \u0628\u0627 \u0627\u0634\u06A9 \u0634\u0627\u062F\u06CC",
      'Smiling face with open mouth': "\u0686\u0647\u0631\u0647 \u062E\u0646\u062F\u0627\u0646 \u0628\u0627 \u062F\u0647\u0627\u0646 \u0628\u0627\u0632",
      'Smiling face with open mouth and smiling eyes': "\u0686\u0647\u0631\u0647 \u062E\u0646\u062F\u0627\u0646 \u0628\u0627 \u062F\u0647\u0627\u0646 \u0628\u0627\u0632 \u0648 \u062E\u0646\u062F\u0627\u0646 \u0686\u0634\u0645",
      'Smiling face with open mouth and cold sweat': "\u0686\u0647\u0631\u0647 \u062E\u0646\u062F\u0627\u0646 \u0628\u0627 \u062F\u0647\u0627\u0646 \u0628\u0627\u0632 \u0648 \u0639\u0631\u0642 \u0633\u0631\u062F",
      'Smiling face with open mouth and tightly-closed eyes': "\u0686\u0647\u0631\u0647 \u062E\u0646\u062F\u0627\u0646 \u0628\u0627 \u062F\u0647\u0627\u0646 \u0628\u0627\u0632 \u0648 \u0686\u0634\u0645 \u062F\u0631\u0628\u062F\u0627\u0631",
      'Smiling face with halo': "\u0686\u0647\u0631\u0647 \u062E\u0646\u062F\u0627\u0646 \u0628\u0627 \u0647\u0627\u0644\u0647",
      'Smiling face with horns': "\u0686\u0647\u0631\u0647 \u062E\u0646\u062F\u0627\u0646 \u0628\u0627 \u0634\u0627\u062E",
      'Winking face': "\u062D\u0631\u06A9\u062A \u067E\u0630\u06CC\u0631\u06CC",
      'Smiling face with smiling eyes': "\u0686\u0647\u0631\u0647 \u062E\u0646\u062F\u0627\u0646 \u0628\u0627 \u0686\u0634\u0645 \u0644\u0628\u062E\u0646\u062F",
      'Face savoring delicious food': "\u0686\u0647\u0631\u0647 \u0644\u0630\u06CC\u0630 \u063A\u0630\u0627\u06CC \u062E\u0648\u0634\u0645\u0632\u0647",
      'Relieved face': "\u0686\u0647\u0631\u0647 \u0631\u0647\u0627",
      'Smiling face with heart-shaped eyes': "\u0686\u0647\u0631\u0647 \u062E\u0646\u062F\u0627\u0646 \u0628\u0627 \u0686\u0634\u0645 \u0628\u0647 \u0634\u06A9\u0644 \u0642\u0644\u0628",
      'Smiling face with sunglasses': "\u0686\u0647\u0631\u0647 \u062E\u0646\u062F\u0627\u0646 \u0628\u0627 \u0639\u06CC\u0646\u06A9 \u0622\u0641\u062A\u0627\u0628\u06CC",
      'Smirking face': "\u067E\u0648\u0632\u062E\u0646\u062F \u0686\u0647\u0631\u0647",
      'Neutral face': "\u0686\u0647\u0631\u0647 \u0647\u0627\u06CC \u062E\u0646\u062B\u06CC",
      'Expressionless face': "\u0686\u0647\u0631\u0647 \u0646\u0627\u06AF\u0648\u06CC\u0627",
      'Unamused face': "\u0686\u0647\u0631\u0647 \u062E\u0648\u0634\u062D\u0627\u0644 \u0646\u06CC\u0633\u062A",
      'Face with cold sweat': "\u0686\u0647\u0631\u0647 \u0628\u0627 \u0639\u0631\u0642 \u0633\u0631\u062F",
      'Pensive face': "\u0686\u0647\u0631\u0647 \u0627\u0641\u0633\u0631\u062F\u0647",
      'Confused face': "\u0686\u0647\u0631\u0647 \u0627\u0634\u062A\u0628\u0627\u0647",
      'Confounded face': "\u0686\u0647\u0631\u0647 \u0633\u0631 \u062F\u0631 \u06AF\u0645",
      'Kissing face': "\u0628\u0648\u0633\u06CC\u062F\u0646 \u0635\u0648\u0631\u062A",
      'Face throwing a kiss': "\u0686\u0647\u0631\u0647 \u067E\u0631\u062A\u0627\u0628 \u06CC\u06A9 \u0628\u0648\u0633\u0647",
      'Kissing face with smiling eyes': "\u0628\u0648\u0633\u06CC\u062F\u0646 \u0686\u0647\u0631\u0647 \u0628\u0627 \u0686\u0634\u0645 \u0644\u0628\u062E\u0646\u062F",
      'Kissing face with closed eyes': "\u0628\u0648\u0633\u06CC\u062F\u0646 \u0635\u0648\u0631\u062A \u0628\u0627 \u0686\u0634\u0645\u0627\u0646 \u0628\u0633\u062A\u0647",
      'Face with stuck out tongue': "\u0686\u0647\u0631\u0647 \u0628\u0627 \u06AF\u06CC\u0631 \u06A9\u0631\u062F\u0646 \u0632\u0628\u0627\u0646",
      'Face with stuck out tongue and winking eye': "\u0686\u0647\u0631\u0647 \u0628\u0627 \u0632\u0628\u0627\u0646 \u06AF\u06CC\u0631 \u06A9\u0631\u062F\u0646 \u0648 \u062D\u0631\u06A9\u062A \u0686\u0634\u0645",
      'Face with stuck out tongue and tightly-closed eyes': "\u0635\u0648\u0631\u062A \u0628\u0627 \u0632\u0628\u0627\u0646 \u06AF\u06CC\u0631 \u06A9\u0631\u062F\u0646 \u0648 \u0686\u0634\u0645 \u0631\u0627 \u0645\u062D\u06A9\u0645 \u0628\u0633\u062A\u0647",
      'Disappointed face': "\u0686\u0647\u0631\u0647 \u0646\u0627 \u0627\u0645\u06CC\u062F",
      'Worried face': "\u0686\u0647\u0631\u0647 \u0646\u06AF\u0631\u0627\u0646",
      'Angry face': "\u0686\u0647\u0631\u0647 \u0639\u0635\u0628\u0627\u0646\u06CC",
      'Pouting face': "\u0628\u063A \u0686\u0647\u0631\u0647",
      'Crying face': "\u06AF\u0631\u06CC\u0647 \u0686\u0647\u0631\u0647",
      'Persevering face': "\u067E\u0627\u06CC\u062F\u0627\u0631\u06CC \u0686\u0647\u0631\u0647",
      'Face with look of triumph': "\u0686\u0647\u0631\u0647 \u0628\u0627 \u0646\u06AF\u0627\u0647\u06CC \u0627\u0632 \u067E\u06CC\u0631\u0648\u0632\u06CC",
      'Disappointed but relieved face': "\u0646\u0627 \u0627\u0645\u06CC\u062F \u0627\u0645\u0627 \u0622\u0633\u0648\u062F\u0647 \u0686\u0647\u0631\u0647",
      'Frowning face with open mouth': "\u0627\u062E\u0645 \u0635\u0648\u0631\u062A \u0628\u0627 \u062F\u0647\u0627\u0646 \u0628\u0627\u0632",
      'Anguished face': "\u0686\u0647\u0631\u0647 \u0646\u06AF\u0631\u0627\u0646",
      'Fearful face': "\u0686\u0647\u0631\u0647 \u062A\u0631\u0633",
      'Weary face': "\u0686\u0647\u0631\u0647 \u062E\u0633\u062A\u0647",
      'Sleepy face': "\u0686\u0647\u0631\u0647 \u062E\u0648\u0627\u0628 \u0622\u0644\u0648\u062F",
      'Tired face': "\u0686\u0647\u0631\u0647 \u062E\u0633\u062A\u0647",
      'Grimacing face': "\u0627\u0634 \u0686\u0647\u0631\u0647",
      'Loudly crying face': "\u0646\u062F\u0627\u06CC\u06CC \u0631\u0633\u0627 \u06AF\u0631\u06CC\u0647 \u0686\u0647\u0631\u0647",
      'Face with open mouth': "\u0686\u0647\u0631\u0647 \u0628\u0627 \u062F\u0647\u0627\u0646 \u0628\u0627\u0632",
      'Hushed face': "\u0686\u0647\u0631\u0647 \u0633\u06A9\u0648\u062A",
      'Face with open mouth and cold sweat': "\u0686\u0647\u0631\u0647 \u0628\u0627 \u062F\u0647\u0627\u0646 \u0628\u0627\u0632 \u0648 \u0639\u0631\u0642 \u0633\u0631\u062F",
      'Face screaming in fear': "\u0686\u0647\u0631\u0647 \u062C\u06CC\u063A \u062F\u0631 \u062A\u0631\u0633",
      'Astonished face': "\u0686\u0647\u0631\u0647 \u0634\u06AF\u0641\u062A \u0632\u062F\u0647",
      'Flushed face': "\u0686\u0647\u0631\u0647 \u0628\u0631\u0627\u0641\u0631\u0648\u062E\u062A\u0647",
      'Sleeping face': "\u062E\u0648\u0627\u0628 \u0686\u0647\u0631\u0647",
      'Dizzy face': "\u0686\u0647\u0631\u0647 \u062F\u06CC\u0632\u06CC",
      'Face without mouth': "\u0686\u0647\u0631\u0647 \u0628\u062F\u0648\u0646 \u062F\u0647\u0627\u0646",
      'Face with medical mask': "\u0686\u0647\u0631\u0647 \u0628\u0627 \u0645\u0627\u0633\u06A9 \u0647\u0627\u06CC \u067E\u0632\u0634\u06A9\u06CC",
      // Line breaker
      'Break': "\u0634\u06A9\u0633\u062A\u0646",
      // Math
      'Subscript': "\u067E\u0627\u064A\u064A\u0646 \u0646\u0648\u064A\u0633",
      'Superscript': "\u0628\u0627\u0644\u0627 \u0646\u06AF\u0627\u0634\u062A",
      // Full screen
      'Fullscreen': "\u062A\u0645\u0627\u0645 \u0635\u0641\u062D\u0647",
      // Horizontal line
      'Insert Horizontal Line': "\u0642\u0631\u0627\u0631 \u062F\u0627\u062F\u0646 \u0627\u0641\u0642\u06CC \u062E\u0637",
      // Clear formatting
      'Clear Formatting': "\u062D\u0630\u0641 \u0642\u0627\u0644\u0628 \u0628\u0646\u062F\u06CC",
      // Save
      'Save': "\u0635\u0631\u0641\u0647 \u062C\u0648\u06CC\u06CC",
      // Undo, redo
      'Undo': "\u0628\u0627\u0637\u0644 \u06A9\u0631\u062F\u0646",
      'Redo': "\u0627\u0646\u062C\u0627\u0645 \u062F\u0648\u0628\u0627\u0631\u0647",
      // Select all
      'Select All': "\u0627\u0646\u062A\u062E\u0627\u0628 \u0647\u0645\u0647",
      // Code view
      'Code View': "\u0645\u0634\u0627\u0647\u062F\u0647 \u06A9\u062F",
      // Quote
      'Quote': "\u0646\u0642\u0644 \u0642\u0648\u0644",
      'Increase': "\u0627\u0641\u0632\u0627\u06CC\u0634 \u062F\u0627\u062F\u0646",
      'Decrease': "\u0646\u0632\u0648\u0644 \u06A9\u0631\u062F\u0646",
      // Quick Insert
      'Quick Insert': "\u062F\u0631\u062C \u0633\u0631\u06CC\u0639",
      // Spcial Characters
      'Special Characters': 'کاراکترهای خاص',
      'Latin': 'لاتین',
      'Greek': 'یونانی',
      'Cyrillic': 'سیریلیک',
      'Punctuation': 'نقطه گذاری',
      'Currency': 'واحد پول',
      'Arrows': 'فلش ها',
      'Math': 'ریاضی',
      'Misc': 'متاسفم',
      // Print.
      'Print': 'چاپ',
      // Spell Checker.
      'Spell Checker': 'بررسی کننده غلط املایی',
      // Help
      'Help': 'کمک',
      'Shortcuts': 'کلید های میانبر',
      'Inline Editor': 'ویرایشگر خطی',
      'Show the editor': 'ویرایشگر را نشان بده',
      'Common actions': 'اقدامات مشترک',
      'Copy': 'کپی کنید',
      'Cut': 'برش',
      'Paste': 'چسباندن',
      'Basic Formatting': 'قالب بندی اولیه',
      'Increase quote level': 'افزایش سطح نقل قول',
      'Decrease quote level': 'کاهش میزان نقل قول',
      'Image / Video': 'تصویر / ویدئو',
      'Resize larger': 'تغییر اندازه بزرگتر',
      'Resize smaller': 'تغییر اندازه کوچکتر',
      'Table': 'جدول',
      'Select table cell': 'سلول جدول را انتخاب کنید',
      'Extend selection one cell': 'انتخاب یک سلول را گسترش دهید',
      'Extend selection one row': 'یک ردیف را انتخاب کنید',
      'Navigation': 'جهت یابی',
      'Focus popup / toolbar': 'تمرکز پنجره / نوار ابزار',
      'Return focus to previous position': 'تمرکز بازگشت به موقعیت قبلی',
      // Embed.ly
      'Embed URL': 'آدرس جاسازی',
      'Paste in a URL to embed': 'یک URL برای جاسازی کپی کنید',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'محتوای جا به جا از یک سند Word Microsoft می آید. آیا می خواهید فرمت را نگه دارید یا پاک کنید؟',
      'Keep': 'نگاه داشتن',
      'Clean': 'پاک کن',
      'Word Paste Detected': 'کلمه رب تشخیص داده شده است',
      // Character Counter 
      'Characters': 'شخصیت ها',
      // More Buttons
      'More Text': 'متن بیشتر',
      'More Paragraph': 'پاراگراف بیشتر',
      'More Rich': 'بیشتر ثروتمند',
      'More Misc': 'بیشتر متفرقه'
    },
    direction: 'rtl'
  };

})));
//# sourceMappingURL=fa.js.map
