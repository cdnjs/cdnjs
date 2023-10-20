/*!
 * froala_editor v4.1.3 (https://www.froala.com/wysiwyg-editor)
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
   * Traditional Chinese spoken in Taiwan.
   */
  FE.LANGUAGE['zh_tw'] = {
    translation: {
      // Place holder
      'Type something': "\u8F38\u5165\u4E00\u4E9B\u5167\u5BB9",
      // Basic formatting
      'Bold': '粗體',
      'Italic': '斜體',
      'Underline': '下劃線',
      'Strikethrough': '刪除線',
      // Main buttons
      'Insert': '插入',
      'Delete': '刪除',
      'Cancel': '取消',
      'OK': '好的',
      'Back': '後退',
      'Remove': '去掉',
      'More': '更多',
      'Update': '更新',
      'Style': '樣式',
      // Font
      'Font Family': '字体系列',
      'Font Size': "\u5B57\u578B\u5927\u5C0F",
      // Colors
      'Colors': '顏色',
      'Background': '背景',
      'Text': '文字',
      'HEX Color': '十六進制顏色',
      // Paragraphs
      'Paragraph Format': '段落格式',
      'Normal': '正常',
      'Code': '代碼',
      'Heading 1': '標題1',
      'Heading 2': '標題2',
      'Heading 3': '標題3',
      'Heading 4': '標題4',
      // Style
      'Paragraph Style': '段落樣式',
      'Inline Style': '內聯樣式',
      // Alignment
      'Align': '对齐',
      'Align Left': '左對齊',
      'Align Center': "\u7F6E\u4E2D\u5C0D\u9F4A",
      'Align Right': "\u7F6E\u53F3\u5C0D\u9F4A",
      'Align Justify': '兩端對齊',
      'None': '没有',
      // Lists
      'Ordered List': '有序列表',
      'Unordered List': '无序列表',
      // Indent
      'Decrease Indent': '減少縮進量',
      'Increase Indent': '增加縮進量',
      // Links
      'Insert Link': "\u63D2\u5165\u9023\u7D50",
      'Open in new tab': '在新標籤頁中打開',
      'Open Link': "\u958B\u555F\u9023\u7D50",
      'Edit Link': "\u7DE8\u8F2F\u9023\u7D50",
      'Unlink': "\u79FB\u9664\u9023\u7D50",
      'Choose Link': "\u9078\u64C7\u9023\u7D50",
      // Images
      'Insert Image': '插入圖片',
      'Upload Image': '上傳圖片',
      'By URL': "\u7DB2\u5740\u4E0A\u50B3",
      'Browse': '瀏覽',
      'Drop image': "\u5716\u7247\u62D6\u66F3",
      'or click': '或點擊',
      'Manage Images': '管理圖片',
      'Loading': '加載中',
      'Deleting': '刪除中',
      'Tags': '標籤',
      'Are you sure? Image will be deleted.': "\u78BA\u5B9A\u522A\u9664\u5716\u7247\uFF1F",
      'Replace': '替換',
      'Uploading': '上傳中',
      'Loading image': '圖片加載中',
      'Display': '顯示',
      'Inline': "\u5D4C\u5165",
      'Break Text': '打破文字',
      'Alternative Text': '替換文字',
      'Change Size': '改變大小',
      'Width': '寬度',
      'Height': '高度',
      'Something went wrong. Please try again.': '發生錯誤，請重試。',
      'Image Caption': '圖片標題',
      'Advanced Edit': '高級編輯',
      // Video
      'Insert Video': '插入影片',
      'Embedded Code': '嵌入式代码',
      'Paste in a video URL': '粘貼在視頻網址',
      'Drop video': '放下視頻',
      'Your browser does not support HTML5 video.': '您的瀏覽器不支持html5視頻。',
      'Upload Video': '上傳影片',
      // Tables
      'Insert Table': '插入表格',
      'Table Header': '表頭',
      'Remove Table': "\u522A\u9664\u8868",
      'Table Style': '表格樣式',
      'Horizontal Align': '水平對齊方式',
      'Row': '行',
      'Insert row above': '在上方插入',
      'Insert row below': '在下方插入',
      'Delete row': '刪除行',
      'Column': '列',
      'Insert column before': "\u5411\u5DE6\u63D2\u5165\u4E00\u5217",
      'Insert column after': "\u5411\u53F3\u63D2\u5165\u4E00\u5217",
      'Delete column': '刪除列',
      'Cell': '單元格',
      'Merge cells': '合併單元格',
      'Horizontal split': '水平分割',
      'Vertical split': '垂直分割',
      'Cell Background': '單元格背景',
      'Vertical Align': '垂直對齊方式',
      'Top': "\u4E0A",
      'Middle': "\u4E2D",
      'Bottom': '底部',
      'Align Top': '靠上對齊',
      'Align Middle': "\u4E2D\u9593\u5C0D\u9F4A",
      'Align Bottom': '靠下對齊',
      'Cell Style': '單元格樣式',
      // Files
      'Upload File': '上傳文件',
      'Drop file': '拖入文件',
      // Emoticons
      'Emoticons': '表情符號',
      'Grinning face': "\u81C9\u4E0A\u7B11\u563B\u563B",
      'Grinning face with smiling eyes': "\u7B11\u563B\u563B\u7684\u81C9\uFF0C\u542B\u7B11\u7684\u773C\u775B",
      'Face with tears of joy': "\u81C9\u4E0A\u5E36\u8457\u559C\u6085\u7684\u6DDA\u6C34",
      'Smiling face with open mouth': "\u7B11\u81C9\u5F35\u958B\u5634",
      'Smiling face with open mouth and smiling eyes': "\u7B11\u81C9\u5F35\u958B\u5634\u5FAE\u7B11\u7684\u773C\u775B",
      'Smiling face with open mouth and cold sweat': '帶冷汗的張嘴微笑',
      'Smiling face with open mouth and tightly-closed eyes': "\u7B11\u81C9\u5F35\u958B\u5634\uFF0C\u7DCA\u7DCA\u9589\u8457\u773C\u775B",
      'Smiling face with halo': '帶光環微笑',
      'Smiling face with horns': '帶牛角的微笑',
      'Winking face': "\u7728\u773C\u8868\u60C5",
      'Smiling face with smiling eyes': "\u9762\u5E36\u5FAE\u7B11\u7684\u773C\u775B",
      'Face savoring delicious food': "\u9762\u5C0D\u54C1\u5690\u7F8E\u5473\u7684\u98DF\u7269",
      'Relieved face': '如釋重負',
      'Smiling face with heart-shaped eyes': "\u5FAE\u7B11\u7684\u81C9\uFF0C\u5FC3\u81DF\u5F62\u7684\u773C\u775B",
      'Smiling face with sunglasses': "\u7B11\u81C9\u592A\u967D\u93E1",
      'Smirking face': "\u9762\u5C0D\u9762\u5E36\u7B11\u5BB9",
      'Neutral face': '中性臉',
      'Expressionless face': '无表情的脸',
      'Unamused face': "\u4E00\u81C9\u4E0D\u5FEB\u7684\u81C9",
      'Face with cold sweat': "\u9762\u5C0D\u51B7\u6C57",
      'Pensive face': "\u6C89\u601D\u7684\u81C9",
      'Confused face': "\u9762\u5C0D\u56F0\u60D1",
      'Confounded face': "\u8A72\u6B7B\u7684\u81C9",
      'Kissing face': '接吻的脸',
      'Face throwing a kiss': '扔一个吻',
      'Kissing face with smiling eyes': '带着微笑的眼睛接吻的脸',
      'Kissing face with closed eyes': '閉眼接吻',
      'Face with stuck out tongue': '舌头伸出来的脸',
      'Face with stuck out tongue and winking eye': '眨眼吐舌\'',
      'Face with stuck out tongue and tightly-closed eyes': '脸上伸出舌头和眨眼的眼睛',
      'Disappointed face': '失望',
      'Worried face': '担心的脸',
      'Angry face': '生氣的',
      'Pouting face': '撅嘴',
      'Crying face': "\u54ED\u6CE3\u7684\u81C9",
      'Persevering face': "\u600E\u5948\u81C9",
      'Face with look of triumph': '胜利的脸',
      'Disappointed but relieved face': '失望但释然的脸',
      'Frowning face with open mouth': '皺眉',
      'Anguished face': '痛苦的脸',
      'Fearful face': '害怕',
      'Weary face': "\u9762\u5C0D\u53AD\u5026",
      'Sleepy face': '困了',
      'Tired face': '累了',
      'Grimacing face': '鬼脸',
      'Loudly crying face': '大声哭泣的脸',
      'Face with open mouth': '張開嘴',
      'Hushed face': "\u5B89\u975C\u7684\u81C9",
      'Face with open mouth and cold sweat': "\u9762\u5C0D\u5F35\u958B\u5634\uFF0C\u4E00\u8EAB\u51B7\u6C57",
      'Face screaming in fear': "\u9762\u5C0D\u5C16\u53EB\u5728\u6050\u61FC\u4E2D",
      'Astonished face': "\u9762\u5C0D\u9A5A\u8A1D",
      'Flushed face': '臉紅',
      'Sleeping face': "\u719F\u7761\u7684\u81C9",
      'Dizzy face': "\u9762\u5C0D\u7729",
      'Face without mouth': '沒有嘴的臉',
      'Face with medical mask': "\u9762\u5C0D\u91AB\u7642\u53E3\u7F69",
      // Line breaker
      'Break': '換行',
      // Math
      'Subscript': '下標',
      'Superscript': '上標',
      // Full screen
      'Fullscreen': '全屏',
      // Horizontal line
      'Insert Horizontal Line': '插入水平線',
      // Clear formatting
      'Clear Formatting': '清除格式',
      // Save
      'Save': '保存',
      // Undo, redo
      'Undo': '撤消',
      'Redo': '重做',
      // Select all
      'Select All': '全選',
      // Code view
      'Code View': '代码视图',
      // Quote
      'Quote': '引用',
      'Increase': "\u7E2E\u6392",
      'Decrease': "\u53BB\u9664\u7E2E\u6392",
      // Quick Insert
      'Quick Insert': '快速插入',
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
      'Print': '列印',
      // Spell Checker.
      'Spell Checker': '拼寫檢查器',
      // Help
      'Help': '幫助',
      'Shortcuts': '快捷鍵',
      'Inline Editor': '內聯編輯器',
      'Show the editor': '顯示編輯器',
      'Common actions': '常用操作',
      'Copy': '複製',
      'Cut': '切',
      'Paste': '貼上',
      'Basic Formatting': '基本格式',
      'Increase quote level': '增加报价水平',
      'Decrease quote level': '降低报价水平',
      'Image / Video': '圖像/影片',
      'Resize larger': '調整大小更大',
      'Resize smaller': '調整大小更小',
      'Table': '表',
      'Select table cell': '選擇表單元格',
      'Extend selection one cell': '增加選中的單元格',
      'Extend selection one row': '增加選中的行',
      'Navigation': '導航',
      'Focus popup / toolbar': '焦點彈出/工具欄',
      'Return focus to previous position': '將焦點返回到上一個位置',
      // Embed.ly
      'Embed URL': '嵌入網址',
      'Paste in a URL to embed': '貼上要嵌入的網址',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': '粘貼的內容來自微軟Word文檔。你想保留格式還是清理它？',
      'Keep': '保留',
      'Clean': '清潔',
      'Word Paste Detected': '檢測到貼上自 Word 的內容',
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
