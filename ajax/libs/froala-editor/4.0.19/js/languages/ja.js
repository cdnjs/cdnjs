/*!
 * froala_editor v4.0.19 (https://www.froala.com/wysiwyg-editor)
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
   * Japanese
   */
  FE.LANGUAGE['ja'] = {
    translation: {
      // Place holder
      'Type something': "\u3053\u3053\u306B\u5165\u529B\u3057\u307E\u3059",
      // Basic formatting
      'Bold': "\u592A\u5B57",
      'Italic': "\u659C\u4F53",
      'Underline': "\u4E0B\u7DDA",
      'Strikethrough': "\u53D6\u308A\u6D88\u3057\u7DDA",
      // Main buttons
      'Insert': "\u633F\u5165",
      'Delete': "\u524A\u9664",
      'Cancel': "\u30AD\u30E3\u30F3\u30BB\u30EB",
      'OK': 'OK',
      'Back': "\u623B\u308B",
      'Remove': "\u524A\u9664",
      'More': "\u3082\u3063\u3068",
      'Update': "\u66F4\u65B0",
      'Style': "\u30B9\u30BF\u30A4\u30EB",
      // Font
      'Font Family': "\u30D5\u30A9\u30F3\u30C8",
      'Font Size': "\u30D5\u30A9\u30F3\u30C8\u30B5\u30A4\u30BA",
      // Colors
      'Colors': "\u8272",
      'Background': "\u80CC\u666F",
      'Text': "\u30C6\u30AD\u30B9\u30C8",
      'HEX Color': "\u30D8\u30AD\u30B5\u306E\u8272",
      // Paragraphs
      'Paragraph Format': "\u6BB5\u843D\u306E\u66F8\u5F0F",
      'Normal': "\u6A19\u6E96",
      'Code': "\u30B3\u30FC\u30C9",
      'Heading 1': "\u30D8\u30C3\u30C0\u30FC 1",
      'Heading 2': "\u30D8\u30C3\u30C0\u30FC 2",
      'Heading 3': "\u30D8\u30C3\u30C0\u30FC 3",
      'Heading 4': "\u30D8\u30C3\u30C0\u30FC 4",
      // Style
      'Paragraph Style': "\u6BB5\u843D\u30B9\u30BF\u30A4\u30EB",
      'Inline Style': "\u30A4\u30F3\u30E9\u30A4\u30F3\u30B9\u30BF\u30A4\u30EB",
      // Alignment
      'Align': "\u914D\u7F6E",
      'Align Left': "\u5DE6\u63C3\u3048",
      'Align Center': "\u4E2D\u592E\u63C3\u3048",
      'Align Right': "\u53F3\u63C3\u3048",
      'Align Justify': "\u4E21\u7AEF\u63C3\u3048",
      'None': "\u306A\u3057",
      // Lists
      'Ordered List': "\u6BB5\u843D\u756A\u53F7",
      'Unordered List': "\u7B87\u6761\u66F8\u304D",
      // Indent
      'Decrease Indent': "\u30A4\u30F3\u30C7\u30F3\u30C8\u3092\u6E1B\u3089\u3059",
      'Increase Indent': "\u30A4\u30F3\u30C7\u30F3\u30C8\u3092\u5897\u3084\u3059",
      // Links
      'Insert Link': "\u30EA\u30F3\u30AF\u306E\u633F\u5165",
      'Open in new tab': "\u65B0\u3057\u3044\u30BF\u30D6\u3067\u958B\u304F",
      'Open Link': "\u30EA\u30F3\u30AF\u3092\u958B\u304F",
      'Edit Link': "\u30EA\u30F3\u30AF\u306E\u7DE8\u96C6",
      'Unlink': "\u30EA\u30F3\u30AF\u306E\u524A\u9664",
      'Choose Link': "\u30EA\u30F3\u30AF\u3092\u9078\u629E",
      // Images
      'Insert Image': "\u753B\u50CF\u306E\u633F\u5165",
      'Upload Image': "\u753B\u50CF\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9",
      'By URL': "\u753B\u50CF\u306EURL\u3092\u5165\u529B",
      'Browse': "\u53C2\u7167",
      'Drop image': "\u753B\u50CF\u3092\u30C9\u30E9\u30C3\u30B0&\u30C9\u30ED\u30C3\u30D7",
      'or click': "\u307E\u305F\u306F\u30AF\u30EA\u30C3\u30AF",
      'Manage Images': "\u753B\u50CF\u306E\u7BA1\u7406",
      'Loading': "\u8AAD\u307F\u8FBC\u307F\u4E2D",
      'Deleting': "\u524A\u9664",
      'Tags': "\u30BF\u30B0",
      'Are you sure? Image will be deleted.': "\u672C\u5F53\u306B\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F",
      'Replace': "\u7F6E\u63DB",
      'Uploading': "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D",
      'Loading image': "\u753B\u50CF\u8AAD\u307F\u8FBC\u307F\u4E2D",
      'Display': "\u8868\u793A",
      'Inline': "\u30A4\u30F3\u30E9\u30A4\u30F3",
      'Break Text': "\u30C6\u30AD\u30B9\u30C8\u306E\u6539\u884C",
      'Alternative Text': "\u4EE3\u66FF\u30C6\u30AD\u30B9\u30C8",
      'Change Size': "\u30B5\u30A4\u30BA\u5909\u66F4",
      'Width': "\u5E45",
      'Height': "\u9AD8\u3055",
      'Something went wrong. Please try again.': "\u554F\u984C\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u3084\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      'Image Caption': "\u753B\u50CF\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3",
      'Advanced Edit': "\u9AD8\u5EA6\u306A\u7DE8\u96C6",
      // Video
      'Insert Video': "\u52D5\u753B\u306E\u633F\u5165",
      'Embedded Code': "\u57CB\u3081\u8FBC\u307F\u30B3\u30FC\u30C9",
      'Paste in a video URL': "\u52D5\u753BURL\u306B\u8CBC\u308A\u4ED8\u3051\u308B",
      'Drop video': "\u52D5\u753B\u3092\u30C9\u30E9\u30C3\u30B0&\u30C9\u30ED\u30C3\u30D7",
      'Your browser does not support HTML5 video.': "\u3042\u306A\u305F\u306E\u30D6\u30E9\u30A6\u30B6\u306Fhtml5 video\u3092\u30B5\u30DD\u30FC\u30C8\u3057\u3066\u3044\u307E\u305B\u3093\u3002",
      'Upload Video': "\u52D5\u753B\u306E\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9",
      // Tables
      'Insert Table': "\u8868\u306E\u633F\u5165",
      'Table Header': "\u8868\u306E\u30D8\u30C3\u30C0\u30FC",
      'Remove Table': "\u8868\u306E\u524A\u9664",
      'Table Style': "\u8868\u306E\u30B9\u30BF\u30A4\u30EB",
      'Horizontal Align': "\u6A2A\u4F4D\u7F6E",
      'Row': "\u884C",
      'Insert row above': "\u4E0A\u306B\u884C\u3092\u633F\u5165",
      'Insert row below': "\u4E0B\u306B\u884C\u3092\u633F\u5165",
      'Delete row': "\u884C\u306E\u524A\u9664",
      'Column': "\u5217",
      'Insert column before': "\u5DE6\u306B\u5217\u3092\u633F\u5165",
      'Insert column after': "\u53F3\u306B\u5217\u3092\u633F\u5165",
      'Delete column': "\u5217\u306E\u524A\u9664",
      'Cell': "\u30BB\u30EB",
      'Merge cells': "\u30BB\u30EB\u306E\u7D50\u5408",
      'Horizontal split': "\u6A2A\u5206\u5272",
      'Vertical split': "\u7E26\u5206\u5272",
      'Cell Background': "\u30BB\u30EB\u306E\u80CC\u666F",
      'Vertical Align': "\u7E26\u4F4D\u7F6E",
      'Top': "\u4E0A\u63C3\u3048",
      'Middle': "\u4E2D\u592E\u63C3\u3048",
      'Bottom': "\u4E0B\u63C3\u3048",
      'Align Top': "\u4E0A\u306B\u63C3\u3048\u307E\u3059",
      'Align Middle': "\u4E2D\u592E\u306B\u63C3\u3048\u307E\u3059",
      'Align Bottom': "\u4E0B\u306B\u63C3\u3048\u307E\u3059",
      'Cell Style': "\u30BB\u30EB\u30B9\u30BF\u30A4\u30EB",
      // Files
      'Upload File': "\u30D5\u30A1\u30A4\u30EB\u306E\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9",
      'Drop file': "\u30D5\u30A1\u30A4\u30EB\u3092\u30C9\u30E9\u30C3\u30B0&\u30C9\u30ED\u30C3\u30D7",
      // Emoticons
      'Emoticons': "\u7D75\u6587\u5B57",
      'Grinning face': "\u30CB\u30F3\u30DE\u30EA\u9854",
      'Grinning face with smiling eyes': "\u30CB\u30F3\u30DE\u30EA\u9854(\u7B11\u3063\u3066\u3044\u308B\u76EE)",
      'Face with tears of joy': "\u5B09\u3057\u6CE3\u304D\u3059\u308B\u9854",
      'Smiling face with open mouth': "\u7B11\u9854(\u5E83\u3052\u305F\u53E3)",
      'Smiling face with open mouth and smiling eyes': "\u7B11\u9854(\u5E83\u3052\u305F\u53E3\u3001\u7B11\u3063\u3066\u3044\u308B\u76EE)",
      'Smiling face with open mouth and cold sweat': "\u7B11\u9854(\u5E83\u3052\u305F\u53E3\u3001\u51B7\u3084\u6C57)",
      'Smiling face with open mouth and tightly-closed eyes': "\u7B11\u9854(\u5E83\u3052\u305F\u53E3\u3001\u3057\u3063\u304B\u308A\u9589\u3058\u305F\u76EE)",
      'Smiling face with halo': "\u5929\u4F7F\u306E\u8F2A\u304C\u304B\u304B\u3063\u3066\u3044\u308B\u7B11\u9854",
      'Smiling face with horns': "\u89D2\u306E\u3042\u308B\u7B11\u9854",
      'Winking face': "\u30A6\u30A3\u30F3\u30AF\u3057\u305F\u9854",
      'Smiling face with smiling eyes': "\u7B11\u9854(\u7B11\u3063\u3066\u3044\u308B\u76EE)",
      'Face savoring delicious food': "\u304A\u3044\u3057\u3044\u3082\u306E\u3092\u98DF\u3079\u305F\u9854",
      'Relieved face': "\u5B89\u5FC3\u3057\u305F\u9854",
      'Smiling face with heart-shaped eyes': "\u76EE\u304C\u30CF\u30FC\u30C8\u306E\u7B11\u9854",
      'Smiling face with sunglasses': "\u30B5\u30F3\u30B0\u30E9\u30B9\u3092\u304B\u3051\u305F\u7B11\u9854",
      'Smirking face': "\u4F5C\u308A\u7B11\u3044",
      'Neutral face': "\u7121\u8868\u60C5\u306E\u9854",
      'Expressionless face': "\u7121\u8868\u60C5\u306A\u9854",
      'Unamused face': "\u3064\u307E\u3089\u306A\u3044\u9854",
      'Face with cold sweat': "\u51B7\u3084\u6C57\u3092\u304B\u3044\u305F\u9854",
      'Pensive face': "\u8003\u3048\u4E2D\u306E\u9854",
      'Confused face': "\u5C11\u3057\u3057\u3087\u3093\u307C\u308A\u3057\u305F\u9854",
      'Confounded face': "\u56F0\u308A\u679C\u3066\u305F\u9854",
      'Kissing face': "\u30AD\u30B9\u3059\u308B\u9854",
      'Face throwing a kiss': "\u6295\u3052\u30AD\u30C3\u30B9\u3059\u308B\u9854",
      'Kissing face with smiling eyes': "\u7B11\u3044\u306A\u304C\u3089\u30AD\u30B9\u3059\u308B\u9854",
      'Kissing face with closed eyes': "\u76EE\u3092\u9589\u3058\u3066\u30AD\u30B9\u3059\u308B\u9854",
      'Face with stuck out tongue': "\u304B\u3089\u304B\u3063\u305F\u9854(\u3042\u3063\u304B\u3093\u3079\u3048)",
      'Face with stuck out tongue and winking eye': "\u30A6\u30A3\u30F3\u30AF\u3057\u3066\u820C\u3092\u51FA\u3057\u305F\u9854",
      'Face with stuck out tongue and tightly-closed eyes': "\u76EE\u3092\u9589\u3058\u3066\u820C\u3092\u51FA\u3057\u305F\u9854",
      'Disappointed face': "\u843D\u3061\u8FBC\u3093\u3060\u9854",
      'Worried face': "\u4E0D\u5B89\u306A\u9854",
      'Angry face': "\u6012\u3063\u305F\u9854",
      'Pouting face': "\u3075\u304F\u308C\u9854",
      'Crying face': "\u6CE3\u3044\u3066\u3044\u308B\u9854",
      'Persevering face': "\u5931\u6557\u9854",
      'Face with look of triumph': "\u52DD\u3061\u307B\u3053\u3063\u305F\u9854",
      'Disappointed but relieved face': "\u5B89\u5835\u3057\u305F\u9854",
      'Frowning face with open mouth': "\u3044\u3084\u306A\u9854(\u958B\u3051\u305F\u53E3)",
      'Anguished face': "\u3052\u3093\u306A\u308A\u3057\u305F\u9854",
      'Fearful face': "\u9752\u3056\u3081\u305F\u9854",
      'Weary face': "\u75B2\u308C\u305F\u9854",
      'Sleepy face': "\u7720\u3044\u9854",
      'Tired face': "\u3057\u3093\u3069\u3044\u9854",
      'Grimacing face': "\u3061\u3087\u3063\u3068\u4E0D\u5FEB\u306A\u9854",
      'Loudly crying face': "\u5927\u6CE3\u304D\u3057\u3066\u3044\u308B\u9854",
      'Face with open mouth': "\u53E3\u3092\u958B\u3051\u305F\u9854",
      'Hushed face': "\u9ED9\u3063\u305F\u9854",
      'Face with open mouth and cold sweat': "\u53E3\u3092\u958B\u3051\u305F\u9854(\u51B7\u3084\u6C57)",
      'Face screaming in fear': "\u6050\u6016\u306E\u53EB\u3073\u9854",
      'Astonished face': "\u9A5A\u3044\u305F\u9854",
      'Flushed face': "\u71B1\u3063\u307D\u3044\u9854",
      'Sleeping face': "\u5BDD\u9854",
      'Dizzy face': "\u307E\u3044\u3063\u305F\u9854",
      'Face without mouth': "\u53E3\u306E\u306A\u3044\u9854",
      'Face with medical mask': "\u30DE\u30B9\u30AF\u3057\u305F\u9854",
      // Line breaker
      'Break': "\u6539\u884C",
      // Math
      'Subscript': "\u4E0B\u4ED8\u304D\u6587\u5B57",
      'Superscript': "\u4E0A\u4ED8\u304D\u6587\u5B57",
      // Full screen
      'Fullscreen': "\u5168\u753B\u9762\u8868\u793A",
      // Horizontal line
      'Insert Horizontal Line': "\u6C34\u5E73\u7DDA\u306E\u633F\u5165",
      // Clear formatting
      'Clear Formatting': "\u66F8\u5F0F\u306E\u30AF\u30EA\u30A2",
      // Save
      'Save': "\u30BB\u30FC\u30D6",
      // Undo, redo
      'Undo': "\u5143\u306B\u623B\u3059",
      'Redo': "\u3084\u308A\u76F4\u3059",
      // Select all
      'Select All': "\u5168\u3066\u3092\u9078\u629E",
      // Code view
      'Code View': "HTML\u30BF\u30B0\u8868\u793A",
      // Quote
      'Quote': "\u5F15\u7528",
      'Increase': "\u5897\u52A0",
      'Decrease': "\u6E1B\u5C11",
      // Quick Insert
      'Quick Insert': "\u30AF\u30A4\u30C3\u30AF\u633F\u5165",
      // Spcial Characters
      'Special Characters': "\u7279\u6B8A\u6587\u5B57",
      'Latin': "\u30E9\u30C6\u30F3\u8A9E",
      'Greek': "\u30AE\u30EA\u30B7\u30E3\u8A9E",
      'Cyrillic': "\u30AD\u30EA\u30EB\u6587\u5B57",
      'Punctuation': "\u53E5\u8AAD\u70B9",
      'Currency': "\u901A\u8CA8",
      'Arrows': "\u77E2\u5370",
      'Math': "\u6570\u5B66",
      'Misc': "\u305D\u306E\u4ED6",
      // Print.
      'Print': "\u5370\u5237",
      // Spell Checker.
      'Spell Checker': "\u30B9\u30DA\u30EB\u30C1\u30A7\u30C3\u30AF",
      // Help
      'Help': "\u30D8\u30EB\u30D7",
      'Shortcuts': "\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8",
      'Inline Editor': "\u30A4\u30F3\u30E9\u30A4\u30F3\u30A8\u30C7\u30A3\u30BF",
      'Show the editor': "\u30A8\u30C7\u30A3\u30BF\u3092\u8868\u793A",
      'Common actions': "\u4E00\u822C\u52D5\u4F5C",
      'Copy': "\u30B3\u30D4\u30FC",
      'Cut': "\u30AB\u30C3\u30C8",
      'Paste': "\u8CBC\u308A\u4ED8\u3051",
      'Basic Formatting': "\u57FA\u672C\u66F8\u5F0F",
      'Increase quote level': "\u5F15\u7528\u3092\u5897\u3084\u3059",
      'Decrease quote level': "\u5F15\u7528\u3092\u6E1B\u3089\u3059",
      'Image / Video': "\u753B\u50CF/\u52D5\u753B",
      'Resize larger': "\u5927\u304D\u304F\u3059\u308B",
      'Resize smaller': "\u5C0F\u3055\u304F\u3059\u308B",
      'Table': "\u8868",
      'Select table cell': "\u30BB\u30EB\u3092\u9078\u629E",
      'Extend selection one cell': "\u30BB\u30EB\u306E\u9078\u629E\u7BC4\u56F2\u3092\u5E83\u3052\u308B",
      'Extend selection one row': "\u5217\u306E\u9078\u629E\u7BC4\u56F2\u3092\u5E83\u3052\u308B",
      'Navigation': "\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3",
      'Focus popup / toolbar': "\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7/\u30C4\u30FC\u30EB\u30D0\u30FC\u3092\u30D5\u30A9\u30FC\u30AB\u30B9",
      'Return focus to previous position': "\u524D\u306E\u4F4D\u7F6E\u306B\u30D5\u30A9\u30FC\u30AB\u30B9\u3092\u623B\u3059",
      //\u00a0Embed.ly
      'Embed URL': "\u57CB\u3081\u8FBC\u307FURL",
      'Paste in a URL to embed': "\u57CB\u3081\u8FBC\u307FURL\u306B\u8CBC\u308A\u4ED8\u3051\u308B",
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': "\u8CBC\u308A\u4ED8\u3051\u305F\u6587\u66F8\u306FMicrosoft Word\u304B\u3089\u53D6\u5F97\u3055\u308C\u307E\u3059\u3002\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8\u3092\u4FDD\u6301\u3057\u3066\u8CBC\u308A\u4ED8\u3051\u307E\u3059\u304B\uFF1F",
      'Keep': "\u66F8\u5F0F\u3092\u4FDD\u6301\u3059\u308B",
      'Clean': "\u66F8\u5F0F\u3092\u4FDD\u6301\u3057\u306A\u3044",
      'Word Paste Detected': "Microsoft Word\u306E\u8CBC\u308A\u4ED8\u3051\u304C\u691C\u51FA\u3055\u308C\u307E\u3057\u305F",
      // Character Counter
      'Characters': '文字数',
      // More Buttons
      'More Text': 'より多くのテキスト',
      'More Paragraph': 'もっと段落',
      'More Rich': 'もっとリッチ',
      'More Misc': 'その他',
      'Text Color': 'テキストの色',
      'Background Color': '背景色',
      'Line Height': '行の高さ'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=ja.js.map
