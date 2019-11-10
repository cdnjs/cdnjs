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
   * Traditional Chinese spoken in Taiwan.
   */
  FE.LANGUAGE['zh_tw'] = {
    translation: {
      // Place holder
      'Type something': "\u8F38\u5165\u4E00\u4E9B\u5167\u5BB9",
      // Basic formatting
      'Bold': "\u7C97\u9AD4",
      'Italic': "\u659C\u9AD4",
      'Underline': "\u5E95\u7DDA",
      'Strikethrough': "\u522A\u9664\u7DDA",
      // Main buttons
      'Insert': "\u63D2\u5165",
      'Delete': "\u522A\u9664",
      'Cancel': "\u53D6\u6D88",
      'OK': "\u78BA\u5B9A",
      'Back': "\u5F8C",
      'Remove': "\u79FB\u9664",
      'More': "\u66F4\u591A",
      'Update': "\u66F4\u65B0",
      'Style': "\u6A23\u5F0F",
      // Font
      'Font Family': "\u5B57\u9AD4",
      'Font Size': "\u5B57\u578B\u5927\u5C0F",
      // Colors
      'Colors': "\u984F\u8272",
      'Background': "\u80CC\u666F",
      'Text': "\u6587\u5B57",
      'HEX Color': '十六進制顏色',
      // Paragraphs
      'Paragraph Format': "\u683C\u5F0F",
      'Normal': "\u6B63\u5E38",
      'Code': "\u7A0B\u5F0F\u78BC",
      'Heading 1': "\u6A19\u984C 1",
      'Heading 2': "\u6A19\u984C 2",
      'Heading 3': "\u6A19\u984C 3",
      'Heading 4': "\u6A19\u984C 4",
      // Style
      'Paragraph Style': "\u6BB5\u843D\u6A23\u5F0F",
      'Inline Style': "\u5167\u806F\u6A23\u5F0F",
      // Alignment
      'Align': "\u5C0D\u9F4A",
      'Align Left': "\u7F6E\u5DE6\u5C0D\u9F4A",
      'Align Center': "\u7F6E\u4E2D\u5C0D\u9F4A",
      'Align Right': "\u7F6E\u53F3\u5C0D\u9F4A",
      'Align Justify': "\u5DE6\u53F3\u5C0D\u9F4A",
      'None': "\u7121",
      // Lists
      'Ordered List': "\u6578\u5B57\u6E05\u55AE",
      'Unordered List': "\u9805\u76EE\u6E05\u55AE",
      // Indent
      'Decrease Indent': "\u6E1B\u5C11\u7E2E\u6392",
      'Increase Indent': "\u589E\u52A0\u7E2E\u6392",
      // Links
      'Insert Link': "\u63D2\u5165\u9023\u7D50",
      'Open in new tab': "\u5728\u65B0\u5206\u9801\u958B\u555F",
      'Open Link': "\u958B\u555F\u9023\u7D50",
      'Edit Link': "\u7DE8\u8F2F\u9023\u7D50",
      'Unlink': "\u79FB\u9664\u9023\u7D50",
      'Choose Link': "\u9078\u64C7\u9023\u7D50",
      // Images
      'Insert Image': "\u63D2\u5165\u5716\u7247",
      'Upload Image': "\u4E0A\u50B3\u5716\u7247",
      'By URL': "\u7DB2\u5740\u4E0A\u50B3",
      'Browse': "\u700F\u89BD",
      'Drop image': "\u5716\u7247\u62D6\u66F3",
      'or click': "\u6216\u9EDE\u64CA",
      'Manage Images': "\u7BA1\u7406\u5716\u7247",
      'Loading': "\u8F09\u5165\u4E2D",
      'Deleting': "\u522A\u9664",
      'Tags': "\u6A19\u7C64",
      'Are you sure? Image will be deleted.': "\u78BA\u5B9A\u522A\u9664\u5716\u7247\uFF1F",
      'Replace': "\u66F4\u63DB",
      'Uploading': "\u4E0A\u50B3",
      'Loading image': "\u4E0A\u50B3\u4E2D",
      'Display': "\u986F\u793A",
      'Inline': "\u5D4C\u5165",
      'Break Text': "\u8207\u6587\u5B57\u5206\u96E2",
      'Alternative Text': "\u6587\u5B57\u74B0\u7E5E",
      'Change Size': "\u8ABF\u6574\u5927\u5C0F",
      'Width': "\u5BEC\u5EA6",
      'Height': "\u9AD8\u5EA6",
      'Something went wrong. Please try again.': "\u932F\u8AA4\uFF0C\u8ACB\u518D\u8A66\u4E00\u6B21\u3002",
      'Image Caption': '圖片說明',
      'Advanced Edit': '高級編輯',
      // Video
      'Insert Video': "\u63D2\u5165\u5F71\u7247",
      'Embedded Code': "\u5D4C\u5165\u7A0B\u5F0F\u78BC",
      'Paste in a video URL': '粘貼在視頻網址',
      'Drop video': '放下視頻',
      'Your browser does not support HTML5 video.': '您的瀏覽器不支持html5視頻。',
      'Upload Video': '上傳視頻',
      // Tables
      'Insert Table': "\u63D2\u5165\u8868\u683C",
      'Table Header': "\u8868\u982D",
      'Remove Table': "\u522A\u9664\u8868",
      'Table Style': "\u8868\u6A23\u5F0F",
      'Horizontal Align': "\u6C34\u6E96\u5C0D\u9F4A\u65B9\u5F0F",
      'Row': "\u884C",
      'Insert row above': "\u5411\u4E0A\u63D2\u5165\u4E00\u884C",
      'Insert row below': "\u5411\u4E0B\u63D2\u5165\u4E00\u884C",
      'Delete row': "\u522A\u9664\u884C",
      'Column': "\u5217",
      'Insert column before': "\u5411\u5DE6\u63D2\u5165\u4E00\u5217",
      'Insert column after': "\u5411\u53F3\u63D2\u5165\u4E00\u5217",
      'Delete column': "\u522A\u9664\u884C",
      'Cell': "\u5132\u5B58\u683C",
      'Merge cells': "\u5408\u4F75\u5132\u5B58\u683C",
      'Horizontal split': "\u6C34\u5E73\u5206\u5272",
      'Vertical split': "\u5782\u76F4\u5206\u5272",
      'Cell Background': "\u5132\u5B58\u683C\u80CC\u666F",
      'Vertical Align': "\u5782\u76F4\u5C0D\u9F4A\u65B9\u5F0F",
      'Top': "\u4E0A",
      'Middle': "\u4E2D",
      'Bottom': "\u4E0B",
      'Align Top': "\u5411\u4E0A\u5C0D\u9F4A",
      'Align Middle': "\u4E2D\u9593\u5C0D\u9F4A",
      'Align Bottom': "\u5E95\u90E8\u5C0D\u9F4A",
      'Cell Style': "\u5132\u5B58\u683C\u6A23\u5F0F",
      // Files
      'Upload File': "\u4E0A\u50B3\u6587\u4EF6",
      'Drop file': "\u6587\u4EF6\u62D6\u66F3",
      // Emoticons
      'Emoticons': "\u8868\u60C5",
      'Grinning face': "\u81C9\u4E0A\u7B11\u563B\u563B",
      'Grinning face with smiling eyes': "\u7B11\u563B\u563B\u7684\u81C9\uFF0C\u542B\u7B11\u7684\u773C\u775B",
      'Face with tears of joy': "\u81C9\u4E0A\u5E36\u8457\u559C\u6085\u7684\u6DDA\u6C34",
      'Smiling face with open mouth': "\u7B11\u81C9\u5F35\u958B\u5634",
      'Smiling face with open mouth and smiling eyes': "\u7B11\u81C9\u5F35\u958B\u5634\u5FAE\u7B11\u7684\u773C\u775B",
      'Smiling face with open mouth and cold sweat': "\u7B11\u81C9\u5F35\u958B\u5634\uFF0C\u4E00\u8EAB\u51B7\u6C57",
      'Smiling face with open mouth and tightly-closed eyes': "\u7B11\u81C9\u5F35\u958B\u5634\uFF0C\u7DCA\u7DCA\u9589\u8457\u773C\u775B",
      'Smiling face with halo': "\u7B11\u81C9\u6688",
      'Smiling face with horns': "\u5FAE\u7B11\u7684\u81C9\u89D2",
      'Winking face': "\u7728\u773C\u8868\u60C5",
      'Smiling face with smiling eyes': "\u9762\u5E36\u5FAE\u7B11\u7684\u773C\u775B",
      'Face savoring delicious food': "\u9762\u5C0D\u54C1\u5690\u7F8E\u5473\u7684\u98DF\u7269",
      'Relieved face': "\u9762\u5C0D\u5982\u91CB\u91CD\u8CA0",
      'Smiling face with heart-shaped eyes': "\u5FAE\u7B11\u7684\u81C9\uFF0C\u5FC3\u81DF\u5F62\u7684\u773C\u775B",
      'Smiling face with sunglasses': "\u7B11\u81C9\u592A\u967D\u93E1",
      'Smirking face': "\u9762\u5C0D\u9762\u5E36\u7B11\u5BB9",
      'Neutral face': "\u4E2D\u6027\u9762",
      'Expressionless face': "\u9762\u7121\u8868\u60C5",
      'Unamused face': "\u4E00\u81C9\u4E0D\u5FEB\u7684\u81C9",
      'Face with cold sweat': "\u9762\u5C0D\u51B7\u6C57",
      'Pensive face': "\u6C89\u601D\u7684\u81C9",
      'Confused face': "\u9762\u5C0D\u56F0\u60D1",
      'Confounded face': "\u8A72\u6B7B\u7684\u81C9",
      'Kissing face': "\u9762\u5C0D\u63A5\u543B",
      'Face throwing a kiss': "\u9762\u5C0D\u6295\u64F2\u4E00\u500B\u543B",
      'Kissing face with smiling eyes': "\u63A5\u543B\u81C9\uFF0C\u542B\u7B11\u7684\u773C\u775B",
      'Kissing face with closed eyes': "\u63A5\u543B\u7684\u81C9\u9589\u8457\u773C\u775B",
      'Face with stuck out tongue': "\u9762\u5C0D\u4F38\u51FA\u820C\u982D",
      'Face with stuck out tongue and winking eye': "\u9762\u5C0D\u4F38\u51FA\u820C\u982D\u548C\u7728\u52D5\u7684\u773C\u775B",
      'Face with stuck out tongue and tightly-closed eyes': "\u9762\u5C0D\u4F38\u51FA\u820C\u982D\u548C\u7DCA\u9589\u7684\u773C\u775B",
      'Disappointed face': "\u9762\u5C0D\u5931\u671B",
      'Worried face': "\u9762\u5C0D\u64D4\u5FC3",
      'Angry face': "\u61A4\u6012\u7684\u81C9",
      'Pouting face': "\u9762\u5C0D\u5658\u5634",
      'Crying face': "\u54ED\u6CE3\u7684\u81C9",
      'Persevering face': "\u600E\u5948\u81C9",
      'Face with look of triumph': "\u9762\u5E36\u770B\u7684\u52DD\u5229",
      'Disappointed but relieved face': "\u5931\u671B\uFF0C\u4F46\u81C9\u4E0A\u91CB\u7136",
      'Frowning face with open mouth': "\u9762\u5C0D\u76BA\u8457\u7709\u982D\u5F35\u53E3",
      'Anguished face': "\u9762\u5C0D\u75DB\u82E6",
      'Fearful face': "\u53EF\u6015\u7684\u81C9",
      'Weary face': "\u9762\u5C0D\u53AD\u5026",
      'Sleepy face': "\u9762\u5C0D\u56F0",
      'Tired face': "\u75B2\u618A\u7684\u81C9",
      'Grimacing face': "\u7319\u7370\u7684\u81C9",
      'Loudly crying face': "\u5927\u8072\u54ED\u81C9",
      'Face with open mouth': "\u9762\u5C0D\u5F35\u958B\u5634",
      'Hushed face': "\u5B89\u975C\u7684\u81C9",
      'Face with open mouth and cold sweat': "\u9762\u5C0D\u5F35\u958B\u5634\uFF0C\u4E00\u8EAB\u51B7\u6C57",
      'Face screaming in fear': "\u9762\u5C0D\u5C16\u53EB\u5728\u6050\u61FC\u4E2D",
      'Astonished face': "\u9762\u5C0D\u9A5A\u8A1D",
      'Flushed face': "\u7D05\u64B2\u64B2\u7684\u81C9\u86CB",
      'Sleeping face': "\u719F\u7761\u7684\u81C9",
      'Dizzy face': "\u9762\u5C0D\u7729",
      'Face without mouth': "\u81C9\u4E0A\u6C92\u6709\u5634",
      'Face with medical mask': "\u9762\u5C0D\u91AB\u7642\u53E3\u7F69",
      // Line breaker
      'Break': "\u63DB\u884C",
      // Math
      'Subscript': "\u4E0B\u6A19",
      'Superscript': "\u4E0A\u6A19",
      // Full screen
      'Fullscreen': "\u5168\u87A2\u5E55",
      // Horizontal line
      'Insert Horizontal Line': "\u63D2\u5165\u6C34\u5E73\u7DDA",
      // Clear formatting
      'Clear Formatting': "\u6E05\u9664\u683C\u5F0F",
      // Save
      'Save': '保存',
      // Undo, redo
      'Undo': "\u5FA9\u539F",
      'Redo': "\u53D6\u6D88\u5FA9\u539F",
      // Select all
      'Select All': "\u5168\u9078",
      // Code view
      'Code View': "\u539F\u59CB\u78BC",
      // Quote
      'Quote': "\u5F15\u6587",
      'Increase': "\u7E2E\u6392",
      'Decrease': "\u53BB\u9664\u7E2E\u6392",
      // Quick Insert
      'Quick Insert': "\u5FEB\u63D2",
      // Spcial Characters
      'Special Characters': '特殊字符',
      'Latin': '拉丁',
      'Greek': '希臘語',
      'Cyrillic': '西里爾',
      'Punctuation': '標點',
      'Currency': '貨幣',
      'Arrows': '箭頭',
      'Math': '數學',
      'Misc': '雜項',
      // Print.
      'Print': '打印',
      // Spell Checker.
      'Spell Checker': '拼寫檢查器',
      // Help
      'Help': '幫幫我',
      'Shortcuts': '快捷鍵',
      'Inline Editor': '內聯編輯器',
      'Show the editor': '顯示編輯',
      'Common actions': '共同行動',
      'Copy': '複製',
      'Cut': '切',
      'Paste': '糊',
      'Basic Formatting': '基本格式',
      'Increase quote level': '提高報價水平',
      'Decrease quote level': '降低報價水平',
      'Image / Video': '圖像/視頻',
      'Resize larger': '調整大小更大',
      'Resize smaller': '調整大小更小',
      'Table': '表',
      'Select table cell': '選擇表單元格',
      'Extend selection one cell': '擴展選擇一個單元格',
      'Extend selection one row': '擴展選擇一行',
      'Navigation': '導航',
      'Focus popup / toolbar': '焦點彈出/工具欄',
      'Return focus to previous position': '將焦點返回到上一個位置',
      // Embed.ly
      'Embed URL': '嵌入網址',
      'Paste in a URL to embed': '粘貼在一個網址中嵌入',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': '粘貼的內容來自微軟Word文檔。你想保留格式還是清理它？',
      'Keep': '保持',
      'Clean': '清潔',
      'Word Paste Detected': '檢測到字貼',
      // Character Counter
      'Characters': '人物',
      // More Buttons
      'More Text': '更多文字',
      'More Paragraph': '更多段落',
      'More Rich': '更多豐富',
      'More Misc': '更多雜項'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=zh_tw.js.map
