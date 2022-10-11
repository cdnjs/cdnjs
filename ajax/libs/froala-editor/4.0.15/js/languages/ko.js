/*!
 * froala_editor v4.0.15 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2022 Froala Labs
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('froala-editor')) :
  typeof define === 'function' && define.amd ? define(['froala-editor'], factory) :
  (factory(global.FroalaEditor));
}(this, (function (FE) { 'use strict';

  FE = FE && FE.hasOwnProperty('default') ? FE['default'] : FE;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _translation;
  FE.LANGUAGE['ko'] = {
    translation: (_translation = {
      // Place holder
      'Type something': "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694",
      // Missing translations
      'More Text': '더 많은 텍스트',
      'Text Color': '텍스트 색상',
      'Background Color': '배경색',
      'Inline Class': '인라인 클래스',
      'Default': '기본값',
      'Lower Alpha': '소문자 알파',
      'Lower Greek': '그리스어 소문자',
      'Lower Roman': '로만 소문자',
      'Upper Alpha': '알파 대문자',
      'Upper Roman': '로만 대문자',
      'Circle': '서클',
      'Disc': '디스크',
      'Square': '정사각형',
      'Single': '싱글',
      'Double': '더블',
      'More Rich': '풍부한 콘텐츠',
      'More Misc': '더 기타',
      'Insert Files': '파일 삽입',
      'Download PDF': 'PDF 다운로드',
      // Basic formatting
      'Bold': "\uAD75\uAC8C",
      'Italic': "\uAE30\uC6B8\uC784\uAF34",
      'Underline': "\uBC11\uC904",
      'Strikethrough': "\uCDE8\uC18C\uC120",
      // Main buttons
      'Insert': "\uC0BD\uC785",
      'Delete': "\uC0AD\uC81C",
      'Cancel': "\uCDE8\uC18C",
      'OK': "\uC2B9\uC778",
      'Back': "\uB4A4\uB85C",
      'Remove': "\uC81C\uAC70",
      'More': "\uB354",
      'Update': "\uC5C5\uB370\uC774\uD2B8",
      'Style': "\uC2A4\uD0C0\uC77C",
      // Font
      'Font Family': "\uAE00\uAF34",
      'Font Size': "\uD3F0\uD2B8 \uD06C\uAE30",
      // Colors
      'Colors': "\uC0C9\uC0C1",
      'Background': "\uBC30\uACBD",
      'Text': "\uD14D\uC2A4\uD2B8",
      'HEX Color': "\uD5E5\uC2A4 \uC0C9\uC0C1",
      // Paragraphs
      'Paragraph Format': "\uB2E8\uB77D",
      'Normal': "\uD45C\uC900",
      'Code': "\uCF54\uB4DC",
      'Heading 1': "\uC81C\uBAA9 1",
      'Heading 2': "\uC81C\uBAA9 2",
      'Heading 3': "\uC81C\uBAA9 3",
      'Heading 4': "\uC81C\uBAA9 4",
      // Style
      'Paragraph Style': "\uB2E8\uB77D \uC2A4\uD0C0\uC77C",
      'Inline Style': "\uC778\uB77C\uC778 \uC2A4\uD0C0\uC77C",
      // Alignment
      'Align': "\uC815\uB82C",
      'Align Left': "\uC67C\uCABD\uC815\uB82C",
      'Align Center': "\uAC00\uC6B4\uB370\uC815\uB82C",
      'Align Right': "\uC624\uB978\uCABD\uC815\uB82C",
      'Align Justify': "\uC591\uCABD\uC815\uB82C",
      'None': "\uC5C6\uC74C",
      // Lists
      'Ordered List': "\uC22B\uC790 \uB9AC\uC2A4\uD2B8",
      'Unordered List': "\uC810 \uB9AC\uC2A4\uD2B8",
      // Indent
      'Decrease Indent': "\uB0B4\uC5B4\uC4F0\uAE30",
      'Increase Indent': "\uB4E4\uC5EC\uC4F0\uAE30",
      // Links
      'Insert Link': "\uB9C1\uD06C \uC0BD\uC785",
      'Open in new tab': "\uC0C8 \uD0ED\uC5D0\uC11C \uC5F4\uAE30",
      'Open Link': "\uB9C1\uD06C \uC5F4\uAE30",
      'Edit Link': "\uD3B8\uC9D1 \uB9C1\uD06C",
      'Unlink': "\uB9C1\uD06C\uC0AD\uC81C",
      'Choose Link': "\uB9C1\uD06C\uB97C \uC120\uD0DD",
      // Images
      'Insert Image': "\uC774\uBBF8\uC9C0 \uC0BD\uC785",
      'Upload Image': "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC",
      'By URL': "URL \uB85C",
      'Browse': "\uAC80\uC0C9",
      'Drop image': "\uC774\uBBF8\uC9C0\uB97C \uB4DC\uB798\uADF8&\uB4DC\uB86D",
      'or click': "\uB610\uB294 \uD074\uB9AD",
      'Manage Images': "\uC774\uBBF8\uC9C0 \uAD00\uB9AC",
      'Loading': "\uB85C\uB4DC",
      'Deleting': "\uC0AD\uC81C",
      'Tags': "\uD0DC\uADF8",
      'Are you sure? Image will be deleted.': "\uD655\uC2E4\uD55C\uAC00\uC694? \uC774\uBBF8\uC9C0\uAC00 \uC0AD\uC81C\uB429\uB2C8\uB2E4.",
      'Replace': "\uAD50\uCCB4",
      'Uploading': "\uC5C5\uB85C\uB4DC",
      'Loading image': "\uC774\uBBF8\uC9C0 \uB85C\uB4DC \uC911",
      'Display': "\uB514\uC2A4\uD50C\uB808\uC774",
      'Inline': "\uC778\uB77C\uC778",
      'Break Text': "\uAD6C\uBD84 \uD14D\uC2A4\uD2B8",
      'Alternative Text': "\uB300\uCCB4 \uD14D\uC2A4\uD2B8",
      'Change Size': "\uD06C\uAE30 \uBCC0\uACBD",
      'Width': "\uD3ED",
      'Height': "\uB192\uC774",
      'Something went wrong. Please try again.': "\uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC2ED\uC2DC\uC624.",
      'Image Caption': "\uC774\uBBF8\uC9C0 \uCEA1\uC158",
      'Advanced Edit': "\uACE0\uAE09 \uD3B8\uC9D1",
      // Video
      'Insert Video': "\uB3D9\uC601\uC0C1 \uC0BD\uC785",
      'Embedded Code': "\uC784\uBCA0\uB514\uB4DC \uCF54\uB4DC",
      'Paste in a video URL': "\uB3D9\uC601\uC0C1 URL\uC5D0 \uBD99\uC5EC \uB123\uAE30",
      'Drop video': "\uB3D9\uC601\uC0C1\uC744 \uB4DC\uB798\uADF8&\uB4DC\uB86D",
      'Your browser does not support HTML5 video.': "\uADC0\uD558\uC758 \uBE0C\uB77C\uC6B0\uC800\uB294 html5 video\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",
      'Upload Video': "\uB3D9\uC601\uC0C1 \uC5C5\uB85C\uB4DC",
      // Tables
      'Insert Table': "\uD45C \uC0BD\uC785",
      'Table Header': "\uD45C \uD5E4\uB354",
      'Remove Table': "\uD45C \uC81C\uAC70",
      'Table Style': "\uD45C \uC2A4\uD0C0\uC77C",
      'Horizontal Align': "\uC218\uD3C9 \uC815\uB82C",
      'Row': "\uD589",
      'Insert row above': "\uC55E\uC5D0 \uD589\uC744 \uC0BD\uC785",
      'Insert row below': "\uB4A4\uC5D0 \uD589\uC744 \uC0BD\uC785",
      'Delete row': "\uD589 \uC0AD\uC81C",
      'Column': "\uC5F4",
      'Insert column before': "\uC55E\uC5D0 \uC5F4\uC744 \uC0BD\uC785",
      'Insert column after': "\uB4A4\uC5D0 \uC5F4\uC744 \uC0BD\uC785",
      'Delete column': "\uC5F4 \uC0AD\uC81C",
      'Cell': "\uC140",
      'Merge cells': "\uC140 \uD569\uCE58\uAE30",
      'Horizontal split': "\uC218\uD3C9 \uBD84\uD560",
      'Vertical split': "\uC218\uC9C1 \uBD84\uD560",
      'Cell Background': "\uC140 \uBC30\uACBD",
      'Vertical Align': "\uC218\uC9C1 \uC815\uB82C",
      'Top': "\uC704\uCABD \uC815\uB82C",
      'Middle': "\uAC00\uC6B4\uB370 \uC815\uB82C",
      'Bottom': "\uC544\uB798\uCABD \uC815\uB82C",
      'Align Top': "\uC704\uCABD\uC73C\uB85C \uC815\uB82C\uD569\uB2C8\uB2E4.",
      'Align Middle': "\uAC00\uC6B4\uB370\uB85C \uC815\uB82C\uD569\uB2C8\uB2E4.",
      'Align Bottom': "\uC544\uB798\uCABD\uC73C\uB85C \uC815\uB82C\uD569\uB2C8\uB2E4.",
      'Cell Style': "\uC140 \uC2A4\uD0C0\uC77C",
      // Files
      'Upload File': "\uD30C\uC77C \uCCA8\uBD80",
      'Drop file': "\uD30C\uC77C\uC744 \uB4DC\uB798\uADF8&\uB4DC\uB86D",
      // Emoticons
      'Emoticons': "\uC774\uBAA8\uD2F0\uCF58",
      'Grinning face': "\uC5BC\uAD74 \uC6C3\uAE30\uB9CC",
      'Grinning face with smiling eyes': "\uBBF8\uC18C\uB294 \uB208\uC744 \uAC00\uC9C4 \uC5BC\uAD74 \uC6C3\uAE30\uB9CC",
      'Face with tears of joy': "\uAE30\uC068\uC758 \uB208\uBB3C\uB85C \uC5BC\uAD74",
      'Smiling face with open mouth': "\uC624\uD508 \uC785\uC73C\uB85C \uC6C3\uB294 \uC5BC\uAD74",
      'Smiling face with open mouth and smiling eyes': "\uC624\uD508 \uC785\uC73C\uB85C \uC6C3\uB294 \uC5BC\uAD74\uACFC \uB208\uC744 \uBBF8\uC18C",
      'Smiling face with open mouth and cold sweat': "\uC785\uC744 \uC5F4\uACE0 \uC2DD\uC740 \uB540\uACFC \uD568\uAED8 \uC6C3\uB294 \uC5BC\uAD74",
      'Smiling face with open mouth and tightly-closed eyes': "\uC624\uD508 \uC785\uACFC \uBC00\uC811\uD558\uAC8C \uB2EB\uD78C \uB41C \uB208\uC744 \uAC00\uC9C4 \uC6C3\uB294 \uC5BC\uAD74",
      'Smiling face with halo': "\uD6C4\uAD11 \uC6C3\uB294 \uC5BC\uAD74",
      'Smiling face with horns': "\uBFD4 \uC6C3\uB294 \uC5BC\uAD74",
      'Winking face': "\uC5BC\uAD74 \uC719\uD06C",
      'Smiling face with smiling eyes': "\uC6C3\uB294 \uB208\uC73C\uB85C \uC6C3\uB294 \uC5BC\uAD74",
      'Face savoring delicious food': "\uB9DB\uC788\uB294 \uC74C\uC2DD\uC744 \uC74C\uBBF8 \uC5BC\uAD74",
      'Relieved face': "\uC548\uB3C4 \uC5BC\uAD74",
      'Smiling face with heart-shaped eyes': "\uD558\uD2B8 \uBAA8\uC591\uC758 \uB208\uC73C\uB85C \uC6C3\uB294 \uC5BC\uAD74",
      'Smiling face with sunglasses': "\uC120\uAE00\uB77C\uC2A4 \uC6C3\uB294 \uC5BC\uAD74",
      'Smirking face': "\uB3C8\uC744 \uC9C0\uBD88 \uC5BC\uAD74",
      'Neutral face': "\uC911\uB9BD \uC5BC\uAD74",
      'Expressionless face': "\uBB34\uD45C\uC815 \uC5BC\uAD74",
      'Unamused face': "\uC990\uAC81\uAC8C\uD558\uC9C0 \uC5BC\uAD74",
      'Face with cold sweat': "\uC2DD\uC740 \uB540\uACFC \uC5BC\uAD74",
      'Pensive face': "\uC7A0\uACA8\uC788\uB294 \uC5BC\uAD74",
      'Confused face': "\uD63C\uB780 \uC5BC\uAD74",
      'Confounded face': "\uB9DD\uD560 \uAC83 \uC5BC\uAD74",
      'Kissing face': "\uC5BC\uAD74\uC744 \uD0A4\uC2A4",
      'Face throwing a kiss': "\uD0A4\uC2A4\uB97C \uB358\uC9C0\uACE0 \uC5BC\uAD74",
      'Kissing face with smiling eyes': "\uBBF8\uC18C\uB294 \uB208\uC744 \uAC00\uC9C4 \uC5BC\uAD74\uC744 \uD0A4\uC2A4",
      'Kissing face with closed eyes': "\uB2EB\uD78C \uB41C \uB208\uC744 \uAC00\uC9C4 \uC5BC\uAD74\uC744 \uD0A4\uC2A4",
      'Face with stuck out tongue': "\uB0B4\uBC00 \uD600 \uC5BC\uAD74",
      'Face with stuck out tongue and winking eye': "\uB0B4\uBC00 \uD600\uC640 \uC719\uD06C \uB208\uACFC \uC5BC\uAD74",
      'Face with stuck out tongue and tightly-closed eyes': "\uBC16\uC73C\uB85C \uBD99\uC5B4 \uD600\uC640 \uBC00\uC811\uD558\uAC8C \uB2EB\uD78C \uB41C \uB208\uC744 \uAC00\uC9C4 \uC5BC\uAD74",
      'Disappointed face': "\uC2E4\uB9DD \uC5BC\uAD74",
      'Worried face': "\uAC71\uC815 \uC5BC\uAD74",
      'Angry face': "\uC131\uB09C \uC5BC\uAD74",
      'Pouting face': "\uC5BC\uAD74\uC744 \uC090",
      'Crying face': "\uC5BC\uAD74 \uC6B0\uB294",
      'Persevering face': "\uC5BC\uAD74\uC744 \uC778\uB0B4",
      'Face with look of triumph': "\uC2B9\uB9AC\uC758 \uD45C\uC815\uC73C\uB85C \uC5BC\uAD74",
      'Disappointed but relieved face': "\uC2E4\uB9DD\uD558\uC9C0\uB9CC \uC5BC\uAD74\uC744 \uC548\uC2EC",
      'Frowning face with open mouth': "\uC624\uD508 \uC785\uC73C\uB85C \uC5BC\uAD74\uC744 \uCC21\uADF8\uB9BC",
      'Anguished face': "\uACE0\uB1CC\uC758 \uC5BC\uAD74",
      'Fearful face': "\uBB34\uC11C\uC6B4 \uC5BC\uAD74",
      'Weary face': "\uC9C0\uCE5C \uC5BC\uAD74",
      'Sleepy face': "\uC2AC\uB9AC\uD53C \uC5BC\uAD74",
      'Tired face': "\uD53C\uACE4 \uC5BC\uAD74",
      'Grimacing face': "\uC5BC\uAD74\uC744 \uCC21\uADF8\uB9B0",
      'Loudly crying face': "\uD070 \uC18C\uB9AC\uB85C \uC5BC\uAD74\uC744 \uC6B8\uACE0",
      'Face with open mouth': "\uC624\uD508 \uC785\uC73C\uB85C \uC5BC\uAD74",
      'Hushed face': "\uC870\uC6A9\uD55C \uC5BC\uAD74",
      'Face with open mouth and cold sweat': "\uC785\uC744 \uC5F4\uACE0 \uC2DD\uC740 \uB540\uC73C\uB85C \uC5BC\uAD74",
      'Face screaming in fear': "\uACF5\uD3EC\uC5D0 \uBE44\uBA85 \uC5BC\uAD74",
      'Astonished face': "\uB180\uB77C \uC5BC\uAD74",
      'Flushed face': "\uD50C\uB7EC\uC2DC \uC5BC\uAD74",
      'Sleeping face': "\uC5BC\uAD74 \uC7A0\uC790\uB294",
      'Dizzy face': "\uB514\uC9C0 \uC5BC\uAD74",
      'Face without mouth': "\uC785\uC5C6\uC774 \uC5BC\uAD74",
      'Face with medical mask': "\uC758\uB8CC \uB9C8\uC2A4\uD06C\uB85C \uC5BC\uAD74",
      // Line breaker
      'Break': "\uB2E8\uC808",
      // Math
      'Subscript': "\uC544\uB798 \uCCA8\uC790",
      'Superscript': "\uC704 \uCCA8\uC790",
      // Full screen
      'Fullscreen': "\uC804\uCCB4 \uD654\uBA74",
      // Horizontal line
      'Insert Horizontal Line': "\uC218\uD3C9\uC120\uC744 \uC0BD\uC785",
      // Clear formatting
      'Clear Formatting': "\uC11C\uC2DD \uC81C\uAC70",
      // Save
      'Save': "\uAD6C\uD558\uB2E4",
      // Undo, redo
      'Undo': "\uC2E4\uD589 \uCDE8\uC18C",
      'Redo': "\uB418\uB3CC\uB9AC\uAE30",
      // Select all
      'Select All': "\uC804\uCCB4\uC120\uD0DD",
      // Code view
      'Code View': "\uCF54\uB4DC\uBCF4\uAE30",
      // Quote
      'Quote': "\uC778\uC6A9",
      'Increase': "\uC99D\uAC00",
      'Decrease': "\uAC10\uC18C",
      // Quick Insert
      'Quick Insert': "\uBE60\uB978 \uC0BD\uC785",
      // Spcial Characters
      'Special Characters': "\uD2B9\uC218 \uBB38\uC790",
      'Latin': "\uB77C\uD2F4\uC5B4",
      'Greek': "\uADF8\uB9AC\uC2A4\uC5B4",
      'Cyrillic': "\uD0A4\uB9B4 \uBB38\uC790",
      'Punctuation': "\uBB38\uC7A5\uBD80\uD638",
      'Currency': "\uD1B5\uD654",
      'Arrows': "\uD654\uC0B4\uD45C",
      'Math': "\uC218\uD559",
      'Misc': "\uADF8 \uC678",
      // Print.
      'Print': "\uC778\uC1C4",
      // Spell Checker.
      'Spell Checker': "\uB9DE\uCDA4\uBC95 \uAC80\uC0AC\uAE30",
      // Help
      'Help': "\uB3C4\uC6C0\uB9D0",
      'Shortcuts': "\uB2E8\uCD95\uD0A4",
      'Inline Editor': "\uC778\uB77C\uC778 \uC5D0\uB514\uD130",
      'Show the editor': "\uC5D0\uB514\uD130 \uBCF4\uAE30",
      'Common actions': "\uC77C\uBC18 \uB3D9\uC791",
      'Copy': "\uBCF5\uC0AC\uD558\uAE30",
      'Cut': "\uC798\uB77C\uB0B4\uAE30",
      'Paste': "\uBD99\uC5EC\uB123\uAE30",
      'Basic Formatting': "\uAE30\uBCF8 \uC11C\uC2DD",
      'Increase quote level': "\uC778\uC6A9 \uC99D\uAC00",
      'Decrease quote level': "\uC778\uC6A9 \uAC10\uC18C",
      'Image / Video': "\uC774\uBBF8\uC9C0 / \uB3D9\uC601\uC0C1",
      'Resize larger': "\uD06C\uAE30\uB97C \uB354 \uD06C\uAC8C \uC870\uC815",
      'Resize smaller': "\uD06C\uAE30\uB97C \uB354 \uC791\uAC8C \uC870\uC815",
      'Table': "\uD45C",
      'Select table cell': "\uD45C \uC140 \uC120\uD0DD",
      'Extend selection one cell': "\uC140\uC758 \uC120\uD0DD \uBC94\uC704\uB97C \uD655\uC7A5",
      'Extend selection one row': "\uD589\uC758 \uC120\uD0DD \uBC94\uC704\uB97C \uD655\uC7A5",
      'Navigation': "\uB124\uBE44\uAC8C\uC774\uC158",
      'Focus popup / toolbar': "\uD31D\uC5C5 / \uD234\uBC14\uB97C \uD3EC\uCEE4\uC2A4",
      'Return focus to previous position': "\uC774\uC804 \uC704\uCE58\uB85C \uD3EC\uCEE4\uC2A4 \uB418\uB3CC\uB9AC\uAE30",
      // Embed.ly
      'Embed URL': "\uC784\uBCA0\uB4DC URL",
      'Paste in a URL to embed': "\uC784\uBCA0\uB4DC URL\uC5D0 \uBD99\uC5EC \uB123\uAE30",
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': "\uBD99\uC5EC\uB123\uC740 \uBB38\uC11C\uB294 \uB9C8\uC774\uD06C\uB85C\uC18C\uD504\uD2B8 \uC6CC\uB4DC\uC5D0\uC11C \uAC00\uC838\uC654\uC2B5\uB2C8\uB2E4. \uD3EC\uB9F7\uC744 \uC720\uC9C0\uD558\uAC70\uB098 \uC815\uB9AC \uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
      'Keep': "\uC720\uC9C0",
      'Clean': "\uC815\uB9AC",
      'Word Paste Detected': "\uC6CC\uB4DC \uBD99\uC5EC \uB123\uAE30\uAC00 \uAC80\uCD9C \uB418\uC5C8\uC2B5\uB2C8\uB2E4.",
      // Character Counter
      'Characters': '문자'
    }, _defineProperty(_translation, "More Text", '더 본문'), _defineProperty(_translation, 'More Paragraph', '더 절'), _defineProperty(_translation, "More Rich", '더 풍부한'), _defineProperty(_translation, "More Misc", '더 기타'), _translation),
    direction: 'ltr'
  };

})));
//# sourceMappingURL=ko.js.map
