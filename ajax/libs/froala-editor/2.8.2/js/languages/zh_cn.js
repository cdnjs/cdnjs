/*!
 * froala_editor v2.8.2 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('FroalaEditor')) :
  typeof define === 'function' && define.amd ? define(['FroalaEditor'], factory) :
  (factory(global.$.FroalaEditor));
}(this, (function (FE) { 'use strict';

  FE = FE && FE.hasOwnProperty('default') ? FE['default'] : FE;

  /**
   * Simplified Chinese spoken in China.
   */

  FE.LANGUAGE['zh_cn'] = {
    translation: {
      // Place holder
      "Type something": '\u8F93\u5165\u4E00\u4E9B\u5185\u5BB9',

      // Basic formatting
      "Bold": '\u7C97\u4F53',
      "Italic": '\u659C\u4F53',
      "Underline": '\u4E0B\u5212\u7EBF',
      "Strikethrough": '\u5220\u9664\u7EBF',

      // Main buttons
      "Insert": '\u63D2\u5165',
      "Delete": '\u5220\u9664',
      "Cancel": '\u53D6\u6D88',
      "OK": '\u786E\u5B9A',
      "Back": '\u80CC\u90E8',
      "Remove": '\u53BB\u6389',
      "More": '\u66F4\u591A',
      "Update": '\u66F4\u65B0',
      "Style": '\u98CE\u683C',

      // Font
      "Font Family": '\u5B57\u4F53',
      "Font Size": '\u5B57\u53F7',

      // Colors
      "Colors": '\u989C\u8272',
      "Background": '\u80CC\u666F',
      "Text": '\u6587\u5B57',
      "HEX Color": "十六进制颜色",

      // Paragraphs
      "Paragraph Format": '\u683C\u5F0F',
      "Normal": '\u6B63\u5E38',
      "Code": '\u4EE3\u7801',
      "Heading 1": '\u6807\u98981',
      "Heading 2": '\u6807\u98982',
      "Heading 3": '\u6807\u98983',
      "Heading 4": '\u6807\u98984',

      // Style
      "Paragraph Style": '\u6BB5\u843D\u6837\u5F0F',
      "Inline Style": '\u5185\u8054\u6837\u5F0F',

      // Alignment
      "Align": '\u5BF9\u9F50\u65B9\u5F0F',
      "Align Left": '\u5DE6\u5BF9\u9F50',
      "Align Center": '\u5C45\u4E2D',
      "Align Right": '\u53F3\u5BF9\u9F50',
      "Align Justify": '\u4E24\u7AEF\u5BF9\u9F50',
      "None": '\u65E0',

      // Lists
      "Ordered List": '\u7F16\u53F7\u5217\u8868',
      "Unordered List": '\u9879\u76EE\u7B26\u53F7',

      // Indent
      "Decrease Indent": '\u51CF\u5C11\u7F29\u8FDB',
      "Increase Indent": '\u589E\u52A0\u7F29\u8FDB',

      // Links
      "Insert Link": '\u63D2\u5165\u94FE\u63A5',
      "Open in new tab": '\u5F00\u542F\u5728\u65B0\u6807\u7B7E\u9875',
      "Open Link": '\u6253\u5F00\u94FE\u63A5',
      "Edit Link": '\u7F16\u8F91\u94FE\u63A5',
      "Unlink": '\u5220\u9664\u94FE\u63A5',
      "Choose Link": '\u9009\u62E9\u94FE\u63A5',

      // Images
      "Insert Image": '\u63D2\u5165\u56FE\u7247',
      "Upload Image": '\u4E0A\u4F20\u56FE\u7247',
      "By URL": '\u901A\u8FC7\u7F51\u5740',
      "Browse": '\u6D4F\u89C8',
      "Drop image": '\u56FE\u50CF\u62D6\u653E',
      "or click": '\u6216\u70B9\u51FB',
      "Manage Images": '\u7BA1\u7406\u56FE\u50CF',
      "Loading": '\u8F7D\u5165\u4E2D',
      "Deleting": '\u5220\u9664',
      "Tags": '\u6807\u7B7E',
      "Are you sure? Image will be deleted.": '\u4F60\u786E\u5B9A\u5417\uFF1F\u56FE\u50CF\u5C06\u88AB\u5220\u9664\u3002',
      "Replace": '\u66F4\u6362',
      "Uploading": '\u4E0A\u4F20',
      "Loading image": '\u5BFC\u5165\u56FE\u50CF',
      "Display": '\u663E\u793A',
      "Inline": '\u6392\u961F',
      "Break Text": '\u65AD\u5F00\u6587\u672C',
      "Alternative Text": '\u5907\u7528\u6587\u672C',
      "Change Size": '\u5C3A\u5BF8\u53D8\u5316',
      "Width": '\u5BBD\u5EA6',
      "Height": '\u9AD8\u5EA6',
      "Something went wrong. Please try again.": '\u51FA\u4E86\u4E9B\u95EE\u9898\u3002 \u8BF7\u518D\u8BD5\u4E00\u6B21\u3002',
      "Image Caption": "图片说明",
      "Advanced Edit": "高级编辑",

      // Video
      "Insert Video": '\u63D2\u5165\u89C6\u9891',
      "Embedded Code": '\u5D4C\u5165\u5F0F\u4EE3\u7801',
      "Paste in a video URL": "粘贴在视频网址",
      "Drop video": "放下视频",
      "Your browser does not support HTML5 video.": "您的浏览器不支持html5视频。",
      "Upload Video": "上传视频",

      // Tables
      "Insert Table": '\u63D2\u5165\u8868\u683C',
      "Table Header": '\u8868\u5934',
      "Remove Table": '\u5220\u9664\u8868',
      "Table Style": '\u8868\u683C\u6837\u5F0F',
      "Horizontal Align": '\u6C34\u5E73\u5BF9\u9F50\u65B9\u5F0F',
      "Row": '\u884C',
      "Insert row above": '\u5728\u4E0A\u65B9\u63D2\u5165',
      "Insert row below": '\u5728\u4E0B\u65B9\u63D2\u5165',
      "Delete row": '\u5220\u9664\u884C',
      "Column": '\u5217',
      "Insert column before": '\u5728\u5DE6\u4FA7\u63D2\u5165',
      "Insert column after": '\u5728\u53F3\u4FA7\u63D2\u5165',
      "Delete column": '\u5220\u9664\u5217',
      "Cell": '\u5355\u5143\u683C',
      "Merge cells": '\u5408\u5E76\u5355\u5143\u683C',
      "Horizontal split": '\u6C34\u5E73\u5206\u5272',
      "Vertical split": '\u5782\u76F4\u5206\u5272',
      "Cell Background": '\u5355\u5143\u683C\u80CC\u666F',
      "Vertical Align": '\u5782\u76F4\u5BF9\u9F50\u65B9\u5F0F',
      "Top": '\u6700\u4F73',
      "Middle": '\u4E2D\u95F4',
      "Bottom": '\u5E95\u90E8',
      "Align Top": '\u9876\u90E8\u5BF9\u9F50',
      "Align Middle": '\u4E2D\u95F4\u5BF9\u9F50',
      "Align Bottom": '\u5E95\u90E8\u5BF9\u9F50',
      "Cell Style": '\u5355\u5143\u683C\u6837\u5F0F',

      // Files
      "Upload File": '\u4E0A\u4F20\u6587\u4EF6',
      "Drop file": '\u6587\u4EF6\u62D6\u653E',

      // Emoticons
      "Emoticons": '\u8868\u60C5',
      "Grinning face": '\u8138\u4E0A\u7B11\u563B\u563B',
      "Grinning face with smiling eyes": "咧着嘴笑的脸微笑的眼睛",
      "Face with tears of joy": '\u7B11\u563B\u563B\u7684\u8138\uFF0C\u542B\u7B11\u7684\u773C\u775B',
      "Smiling face with open mouth": '\u7B11\u8138\u5F20\u5F00\u5634',
      "Smiling face with open mouth and smiling eyes": '\u7B11\u8138\u5F20\u5F00\u5634\u5FAE\u7B11\u7684\u773C\u775B',
      "Smiling face with open mouth and cold sweat": '\u7B11\u8138\u5F20\u5F00\u5634\uFF0C\u4E00\u8EAB\u51B7\u6C57',
      "Smiling face with open mouth and tightly-closed eyes": '\u7B11\u8138\u5F20\u5F00\u5634\uFF0C\u7D27\u7D27\u95ED\u7740\u773C\u775B',
      "Smiling face with halo": '\u7B11\u8138\u6655',
      "Smiling face with horns": '\u5FAE\u7B11\u7684\u8138\u89D2',
      "Winking face": '\u7728\u773C\u8868\u60C5',
      "Smiling face with smiling eyes": '\u9762\u5E26\u5FAE\u7B11\u7684\u773C\u775B',
      "Face savoring delicious food": '\u9762\u5BF9\u54C1\u5C1D\u7F8E\u5473\u7684\u98DF\u7269',
      "Relieved face": '\u9762\u5BF9\u5982\u91CA\u91CD\u8D1F',
      "Smiling face with heart-shaped eyes": '\u5FAE\u7B11\u7684\u8138\uFF0C\u5FC3\u810F\u5F62\u7684\u773C\u775B',
      "Smiling face with sunglasses": '\u7B11\u8138\u592A\u9633\u955C',
      "Smirking face": '\u9762\u5BF9\u9762\u5E26\u7B11\u5BB9',
      "Neutral face": '\u4E2D\u6027\u9762',
      "Expressionless face": '\u9762\u65E0\u8868\u60C5',
      "Unamused face": '\u4E00\u8138\u4E0D\u5FEB\u7684\u8138',
      "Face with cold sweat": '\u9762\u5BF9\u51B7\u6C57',
      "Pensive face": '\u6C89\u601D\u7684\u8138',
      "Confused face": '\u9762\u5BF9\u56F0\u60D1',
      "Confounded face": '\u8BE5\u6B7B\u7684\u8138',
      "Kissing face": '\u9762\u5BF9\u63A5\u543B',
      "Face throwing a kiss": '\u9762\u5BF9\u6295\u63B7\u4E00\u4E2A\u543B',
      "Kissing face with smiling eyes": '\u63A5\u543B\u8138\uFF0C\u542B\u7B11\u7684\u773C\u775B',
      "Kissing face with closed eyes": '\u63A5\u543B\u7684\u8138\u95ED\u7740\u773C\u775B',
      "Face with stuck out tongue": '\u9762\u5BF9\u4F38\u51FA\u820C\u5934',
      "Face with stuck out tongue and winking eye": '\u9762\u5BF9\u4F38\u51FA\u820C\u5934\u548C\u7728\u52A8\u7684\u773C\u775B',
      "Face with stuck out tongue and tightly-closed eyes": '\u9762\u5BF9\u4F38\u51FA\u820C\u5934\u548C\u7D27\u95ED\u7684\u773C\u775B',
      "Disappointed face": '\u9762\u5BF9\u5931\u671B',
      "Worried face": '\u9762\u5BF9\u62C5\u5FC3',
      "Angry face": '\u6124\u6012\u7684\u8138',
      "Pouting face": '\u9762\u5BF9\u5658\u5634',
      "Crying face": '\u54ED\u6CE3\u7684\u8138',
      "Persevering face": '\u600E\u5948\u8138',
      "Face with look of triumph": '\u9762\u5E26\u770B\u7684\u80DC\u5229',
      "Disappointed but relieved face": '\u5931\u671B\uFF0C\u4F46\u8138\u4E0A\u91CA\u7136',
      "Frowning face with open mouth": '\u9762\u5BF9\u76B1\u7740\u7709\u5934\u5F20\u53E3',
      "Anguished face": '\u9762\u5BF9\u75DB\u82E6',
      "Fearful face": '\u53EF\u6015\u7684\u8138',
      "Weary face": '\u9762\u5BF9\u538C\u5026',
      "Sleepy face": '\u9762\u5BF9\u56F0',
      "Tired face": '\u75B2\u60EB\u7684\u8138',
      "Grimacing face": '\u72F0\u72DE\u7684\u8138',
      "Loudly crying face": '\u5927\u58F0\u54ED\u8138',
      "Face with open mouth": '\u9762\u5BF9\u5F20\u5F00\u5634',
      "Hushed face": '\u5B89\u9759\u7684\u8138',
      "Face with open mouth and cold sweat": "脸上露出嘴巴和冷汗",
      "Face screaming in fear": '\u9762\u5BF9\u5F20\u5F00\u5634\uFF0C\u4E00\u8EAB\u51B7\u6C57',
      "Astonished face": '\u9762\u5BF9\u60CA\u8BB6',
      "Flushed face": '\u7EA2\u6251\u6251\u7684\u8138\u86CB',
      "Sleeping face": '\u719F\u7761\u7684\u8138',
      "Dizzy face": '\u9762\u5BF9\u7729',
      "Face without mouth": '\u8138\u4E0A\u6CA1\u6709\u5634',
      "Face with medical mask": '\u9762\u5BF9\u533B\u7597\u53E3\u7F69',

      // Line breaker
      "Break": '\u7834',

      // Math
      "Subscript": '\u4E0B\u6807',
      "Superscript": '\u4E0A\u6807',

      // Full screen
      "Fullscreen": '\u5168\u5C4F',

      // Horizontal line
      "Insert Horizontal Line": '\u63D2\u5165\u6C34\u5E73\u7EBF',

      // Clear formatting
      "Clear Formatting": '\u683C\u5F0F\u5316\u5220\u9664',

      // Undo, redo
      "Undo": '\u64A4\u6D88',
      "Redo": '\u91CD\u590D',

      // Select all
      "Select All": '\u5168\u9009',

      // Code view
      "Code View": '\u4EE3\u7801\u89C6\u56FE',

      // Quote
      "Quote": '\u5F15\u7528',
      "Increase": '\u589E\u52A0\u5F15\u7528',
      "Decrease": '\u5220\u9664\u5F15\u7528',

      // Quick Insert
      "Quick Insert": '\u5FEB\u63D2',

      // Spcial Characters
      "Special Characters": "特殊字符",
      "Latin": "拉丁",
      "Greek": "希腊语",
      "Cyrillic": "西里尔",
      "Punctuation": "标点",
      "Currency": "货币",
      "Arrows": "箭头",
      "Math": "数学",
      "Misc": "杂项",

      // Print.
      "Print": "打印",

      // Spell Checker.
      "Spell Checker": "拼写检查器",

      // Help
      "Help": "帮帮我",
      "Shortcuts": "快捷键",
      "Inline Editor": "内联编辑器",
      "Show the editor": "显示编辑",
      "Common actions": "共同行动",
      "Copy": "复制",
      "Cut": "切",
      "Paste": "糊",
      "Basic Formatting": "基本格式",
      "Increase quote level": "提高报价水平",
      "Decrease quote level": "降低报价水平",
      "Image / Video": "图像/视频",
      "Resize larger": "调整大小更大",
      "Resize smaller": "调整大小更小",
      "Table": "表",
      "Select table cell": "选择表单元格",
      "Extend selection one cell": "扩展选择一个单元格",
      "Extend selection one row": "扩展选择一行",
      "Navigation": "导航",
      "Focus popup / toolbar": "焦点弹出/工具栏",
      "Return focus to previous position": "将焦点返回到上一个位置",

      // Embed.ly
      "Embed URL": "嵌入网址",
      "Paste in a URL to embed": "粘贴在一个网址中嵌入",

      // Word Paste.
      "The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?": "粘贴的内容来自微软Word文档。你想保留格式还是清理它？",
      "Keep": "保持",
      "Clean": "清洁",
      "Word Paste Detected": "检测到字贴"
    },
    direction: "ltr"
  };

})));
//# sourceMappingURL=zh_cn.js.map
