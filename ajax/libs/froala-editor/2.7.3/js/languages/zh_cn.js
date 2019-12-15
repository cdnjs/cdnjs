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
 * Simplified Chinese spoken in China.
 */

$.FE.LANGUAGE['zh_cn'] = {
  translation: {
    // Place holder
    "Type something": "\u8f93\u5165\u4e00\u4e9b\u5185\u5bb9",

    // Basic formatting
    "Bold": "\u7c97\u4f53",
    "Italic": "\u659c\u4f53",
    "Underline": "\u4e0b\u5212\u7ebf",
    "Strikethrough": "\u5220\u9664\u7ebf",

    // Main buttons
    "Insert": "\u63d2\u5165",
    "Delete": "\u5220\u9664",
    "Cancel": "\u53d6\u6d88",
    "OK": "\u786e\u5b9a",
    "Back": "\u80cc\u90e8",
    "Remove": "\u53bb\u6389",
    "More": "\u66f4\u591a",
    "Update": "\u66f4\u65b0",
    "Style": "\u98ce\u683c",

    // Font
    "Font Family": "\u5b57\u4f53",
    "Font Size": "\u5b57\u53f7",

    // Colors
    "Colors": "\u989c\u8272",
    "Background": "\u80cc\u666f",
    "Text": "\u6587\u5b57",
    "HEX Color": "十六进制颜色",

    // Paragraphs
    "Paragraph Format": "\u683c\u5f0f",
    "Normal": "\u6b63\u5e38",
    "Code": "\u4ee3\u7801",
    "Heading 1": "\u6807\u98981",
    "Heading 2": "\u6807\u98982",
    "Heading 3": "\u6807\u98983",
    "Heading 4": "\u6807\u98984",

    // Style
    "Paragraph Style": "\u6bb5\u843d\u6837\u5f0f",
    "Inline Style": "\u5185\u8054\u6837\u5f0f",

    // Alignment
    "Align": "\u5bf9\u9f50\u65b9\u5f0f",
    "Align Left": "\u5de6\u5bf9\u9f50",
    "Align Center": "\u5c45\u4e2d",
    "Align Right": "\u53f3\u5bf9\u9f50",
    "Align Justify": "\u4e24\u7aef\u5bf9\u9f50",
    "None": "\u65e0",

    // Lists
    "Ordered List": "\u7f16\u53f7\u5217\u8868",
    "Unordered List": "\u9879\u76ee\u7b26\u53f7",

    // Indent
    "Decrease Indent": "\u51cf\u5c11\u7f29\u8fdb",
    "Increase Indent": "\u589e\u52a0\u7f29\u8fdb",

    // Links
    "Insert Link": "\u63d2\u5165\u94fe\u63a5",
    "Open in new tab": "\u5f00\u542f\u5728\u65b0\u6807\u7b7e\u9875",
    "Open Link": "\u6253\u5f00\u94fe\u63a5",
    "Edit Link": "\u7f16\u8f91\u94fe\u63a5",
    "Unlink": "\u5220\u9664\u94fe\u63a5",
    "Choose Link": "\u9009\u62e9\u94fe\u63a5",

    // Images
    "Insert Image": "\u63d2\u5165\u56fe\u7247",
    "Upload Image": "\u4e0a\u4f20\u56fe\u7247",
    "By URL": "\u901a\u8fc7\u7f51\u5740",
    "Browse": "\u6d4f\u89c8",
    "Drop image": "\u56fe\u50cf\u62d6\u653e",
    "or click": "\u6216\u70b9\u51fb",
    "Manage Images": "\u7ba1\u7406\u56fe\u50cf",
    "Loading": "\u8f7d\u5165\u4e2d",
    "Deleting": "\u5220\u9664",
    "Tags": "\u6807\u7b7e",
    "Are you sure? Image will be deleted.": "\u4f60\u786e\u5b9a\u5417\uff1f\u56fe\u50cf\u5c06\u88ab\u5220\u9664\u3002",
    "Replace": "\u66f4\u6362",
    "Uploading": "\u4e0a\u4f20",
    "Loading image": "\u5bfc\u5165\u56fe\u50cf",
    "Display": "\u663e\u793a",
    "Inline": "\u6392\u961f",
    "Break Text": "\u65ad\u5f00\u6587\u672c",
    "Alternate Text": "\u5907\u7528\u6587\u672c",
    "Change Size": "\u5c3a\u5bf8\u53d8\u5316",
    "Width": "\u5bbd\u5ea6",
    "Height": "\u9ad8\u5ea6",
    "Something went wrong. Please try again.": "\u51fa\u4e86\u4e9b\u95ee\u9898\u3002 \u8bf7\u518d\u8bd5\u4e00\u6b21\u3002",
    "Image Caption": "图片说明",
    "Advanced Edit": "高级编辑",

    // Video
    "Insert Video": "\u63d2\u5165\u89c6\u9891",
    "Embedded Code": "\u5d4c\u5165\u5f0f\u4ee3\u7801",
    "Paste in a video URL": "粘贴在视频网址",
    "Drop video": "放下视频",
    "Your browser does not support HTML5 video.": "您的浏览器不支持html5视频。",
    "Upload Video": "上传视频",

    // Tables
    "Insert Table": "\u63d2\u5165\u8868\u683c",
    "Table Header": "\u8868\u5934",
    "Remove Table": "\u5220\u9664\u8868",
    "Table Style": "\u8868\u683c\u6837\u5f0f",
    "Horizontal Align": "\u6c34\u5e73\u5bf9\u9f50\u65b9\u5f0f",
    "Row": "\u884c",
    "Insert row above": "\u5728\u4e0a\u65b9\u63d2\u5165",
    "Insert row below": "\u5728\u4e0b\u65b9\u63d2\u5165",
    "Delete row": "\u5220\u9664\u884c",
    "Column": "\u5217",
    "Insert column before": "\u5728\u5de6\u4fa7\u63d2\u5165",
    "Insert column after": "\u5728\u53f3\u4fa7\u63d2\u5165",
    "Delete column": "\u5220\u9664\u5217",
    "Cell": "\u5355\u5143\u683c",
    "Merge cells": "\u5408\u5e76\u5355\u5143\u683c",
    "Horizontal split": "\u6c34\u5e73\u5206\u5272",
    "Vertical split": "\u5782\u76f4\u5206\u5272",
    "Cell Background": "\u5355\u5143\u683c\u80cc\u666f",
    "Vertical Align": "\u5782\u76f4\u5bf9\u9f50\u65b9\u5f0f",
    "Top": "\u6700\u4f73",
    "Middle": "\u4e2d\u95f4",
    "Bottom": "\u5e95\u90e8",
    "Align Top": "\u9876\u90e8\u5bf9\u9f50",
    "Align Middle": "\u4e2d\u95f4\u5bf9\u9f50",
    "Align Bottom": "\u5e95\u90e8\u5bf9\u9f50",
    "Cell Style": "\u5355\u5143\u683c\u6837\u5f0f",

    // Files
    "Upload File": "\u4e0a\u4f20\u6587\u4ef6",
    "Drop file": "\u6587\u4ef6\u62d6\u653e",

    // Emoticons
    "Emoticons": "\u8868\u60c5",
    "Grinning face": "\u8138\u4e0a\u7b11\u563b\u563b",
    "Grinning face with smiling eyes": "咧着嘴笑的脸微笑的眼睛",
    "Face with tears of joy": "\u7b11\u563b\u563b\u7684\u8138\uff0c\u542b\u7b11\u7684\u773c\u775b",
    "Smiling face with open mouth": "\u7b11\u8138\u5f20\u5f00\u5634",
    "Smiling face with open mouth and smiling eyes": "\u7b11\u8138\u5f20\u5f00\u5634\u5fae\u7b11\u7684\u773c\u775b",
    "Smiling face with open mouth and cold sweat": "\u7b11\u8138\u5f20\u5f00\u5634\uff0c\u4e00\u8eab\u51b7\u6c57",
    "Smiling face with open mouth and tightly-closed eyes": "\u7b11\u8138\u5f20\u5f00\u5634\uff0c\u7d27\u7d27\u95ed\u7740\u773c\u775b",
    "Smiling face with halo": "\u7b11\u8138\u6655",
    "Smiling face with horns": "\u5fae\u7b11\u7684\u8138\u89d2",
    "Winking face": "\u7728\u773c\u8868\u60c5",
    "Smiling face with smiling eyes": "\u9762\u5e26\u5fae\u7b11\u7684\u773c\u775b",
    "Face savoring delicious food": "\u9762\u5bf9\u54c1\u5c1d\u7f8e\u5473\u7684\u98df\u7269",
    "Relieved face": "\u9762\u5bf9\u5982\u91ca\u91cd\u8d1f",
    "Smiling face with heart-shaped eyes": "\u5fae\u7b11\u7684\u8138\uff0c\u5fc3\u810f\u5f62\u7684\u773c\u775b",
    "Smiling face with sunglasses": "\u7b11\u8138\u592a\u9633\u955c",
    "Smirking face": "\u9762\u5bf9\u9762\u5e26\u7b11\u5bb9",
    "Neutral face": "\u4e2d\u6027\u9762",
    "Expressionless face": "\u9762\u65e0\u8868\u60c5",
    "Unamused face": "\u4e00\u8138\u4e0d\u5feb\u7684\u8138",
    "Face with cold sweat": "\u9762\u5bf9\u51b7\u6c57",
    "Pensive face": "\u6c89\u601d\u7684\u8138",
    "Confused face": "\u9762\u5bf9\u56f0\u60d1",
    "Confounded face": "\u8be5\u6b7b\u7684\u8138",
    "Kissing face": "\u9762\u5bf9\u63a5\u543b",
    "Face throwing a kiss": "\u9762\u5bf9\u6295\u63b7\u4e00\u4e2a\u543b",
    "Kissing face with smiling eyes": "\u63a5\u543b\u8138\uff0c\u542b\u7b11\u7684\u773c\u775b",
    "Kissing face with closed eyes": "\u63a5\u543b\u7684\u8138\u95ed\u7740\u773c\u775b",
    "Face with stuck out tongue": "\u9762\u5bf9\u4f38\u51fa\u820c\u5934",
    "Face with stuck out tongue and winking eye": "\u9762\u5bf9\u4f38\u51fa\u820c\u5934\u548c\u7728\u52a8\u7684\u773c\u775b",
    "Face with stuck out tongue and tightly-closed eyes": "\u9762\u5bf9\u4f38\u51fa\u820c\u5934\u548c\u7d27\u95ed\u7684\u773c\u775b",
    "Disappointed face": "\u9762\u5bf9\u5931\u671b",
    "Worried face": "\u9762\u5bf9\u62c5\u5fc3",
    "Angry face": "\u6124\u6012\u7684\u8138",
    "Pouting face": "\u9762\u5bf9\u5658\u5634",
    "Crying face": "\u54ed\u6ce3\u7684\u8138",
    "Persevering face": "\u600e\u5948\u8138",
    "Face with look of triumph": "\u9762\u5e26\u770b\u7684\u80dc\u5229",
    "Disappointed but relieved face": "\u5931\u671b\uff0c\u4f46\u8138\u4e0a\u91ca\u7136",
    "Frowning face with open mouth": "\u9762\u5bf9\u76b1\u7740\u7709\u5934\u5f20\u53e3",
    "Anguished face": "\u9762\u5bf9\u75db\u82e6",
    "Fearful face": "\u53ef\u6015\u7684\u8138",
    "Weary face": "\u9762\u5bf9\u538c\u5026",
    "Sleepy face": "\u9762\u5bf9\u56f0",
    "Tired face": "\u75b2\u60eb\u7684\u8138",
    "Grimacing face": "\u72f0\u72de\u7684\u8138",
    "Loudly crying face": "\u5927\u58f0\u54ed\u8138",
    "Face with open mouth": "\u9762\u5bf9\u5f20\u5f00\u5634",
    "Hushed face": "\u5b89\u9759\u7684\u8138",
    "Face with open mouth and cold sweat": "脸上露出嘴巴和冷汗",
    "Face screaming in fear": "\u9762\u5bf9\u5f20\u5f00\u5634\uff0c\u4e00\u8eab\u51b7\u6c57",
    "Astonished face": "\u9762\u5bf9\u60ca\u8bb6",
    "Flushed face": "\u7ea2\u6251\u6251\u7684\u8138\u86cb",
    "Sleeping face": "\u719f\u7761\u7684\u8138",
    "Dizzy face": "\u9762\u5bf9\u7729",
    "Face without mouth": "\u8138\u4e0a\u6ca1\u6709\u5634",
    "Face with medical mask": "\u9762\u5bf9\u533b\u7597\u53e3\u7f69",

    // Line breaker
    "Break": "\u7834",

    // Math
    "Subscript": "\u4e0b\u6807",
    "Superscript": "\u4e0a\u6807",

    // Full screen
    "Fullscreen": "\u5168\u5c4f",

    // Horizontal line
    "Insert Horizontal Line": "\u63d2\u5165\u6c34\u5e73\u7ebf",

    // Clear formatting
    "Clear Formatting": "\u683c\u5f0f\u5316\u5220\u9664",

    // Undo, redo
    "Undo": "\u64a4\u6d88",
    "Redo": "\u91cd\u590d",

    // Select all
    "Select All": "\u5168\u9009",

    // Code view
    "Code View": "\u4ee3\u7801\u89c6\u56fe",

    // Quote
    "Quote": "\u5f15\u7528",
    "Increase": "\u589e\u52a0\u5f15\u7528",
    "Decrease": "\u5220\u9664\u5f15\u7528",

    // Quick Insert
    "Quick Insert": "\u5feb\u63d2",

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

}));
