/*!
 * froala_editor v4.3.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2024 Froala Labs
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('froala-editor')) :
  typeof define === 'function' && define.amd ? define(['froala-editor'], factory) :
  (factory(global.FroalaEditor));
}(this, (function (FE) { 'use strict';

  FE = FE && FE.hasOwnProperty('default') ? FE['default'] : FE;

  FE.LANGUAGE['vi'] = {
    translation: {
      // Place holder
      'Type something': "Vi\u1EBFt \u0111i\u1EC1u g\xEC \u0111\xF3...",
      // Basic formatting
      'Bold': "\u0110\u1EADm",
      'Italic': "Nghi\xEAng",
      'Underline': "G\u1EA1ch ch\xE2n",
      'Strikethrough': "G\u1EA1ch ngang ch\u1EEF",
      // Main buttons
      'Insert': "Ch\xE8n",
      'Delete': "X\xF3a",
      'Cancel': "H\u1EE7y",
      'OK': 'OK',
      'Back': "Tr\u1EDF v\u1EC1",
      'Remove': "X\xF3a",
      'More': "Th\xEAm",
      'Update': "C\u1EADp nh\u1EADt",
      'Style': "Ki\u1EC3u",
      // Font
      'Font Family': "Ph\xF4ng ch\u1EEF",
      'Font Size': "C\u1EE1 ch\u1EEF",
      // Colors
      'Colors': "M\xE0u s\u1EAFc",
      'Background': "N\u1EC1n",
      'Text': "Ch\u1EEF",
      'HEX Color': 'Màu hex',
      // Paragraphs
      'Paragraph Format': "\u0110\u1ECBnh d\u1EA1ng \u0111o\u1EA1n v\u0103n b\u1EA3n",
      'Normal': 'Normal',
      'Code': 'Code',
      'Heading 1': 'Heading 1',
      'Heading 2': 'Heading 2',
      'Heading 3': 'Heading 3',
      'Heading 4': 'Heading 4',
      // Style
      'Paragraph Style': "Ki\u1EC3u \u0111o\u1EA1n v\u0103n b\u1EA3n",
      'Inline Style': "Ki\u1EC3u d\xF2ng",
      // Alignment
      'Align': "C\u0103n ch\u1EC9nh",
      'Align Left': "C\u0103n tr\xE1i",
      'Align Center': "C\u0103n gi\u1EEFa",
      'Align Right': "C\u0103n ph\u1EA3i",
      'Align Justify': "C\u0103n \u0111\u1EC1u",
      'None': "Kh\xF4ng",
      // Lists
      'Ordered List': "Danh s\xE1ch theo th\u1EE9 t\u1EF1",
      'Unordered List': "Danh s\xE1ch li\u1EC7t k\xEA",
      // Indent
      'Decrease Indent': "Gi\u1EA3m c\u0103n l\u1EC1",
      'Increase Indent': "T\u0103ng c\u0103n l\u1EC1",
      // Links
      'Insert Link': "Ch\xE8n link",
      'Open in new tab': "M\u1EDF trong tab m\u1EDBi",
      'Open Link': "M\u1EDF link",
      'Edit Link': "S\u1EEDa link",
      'Unlink': "B\u1ECF link",
      'Choose Link': "Ch\u1ECDn link",
      // Images
      'Insert Image': "Ch\xE8n h\xECnh",
      'Upload Image': "T\u1EA3i h\xECnh l\xEAn",
      'By URL': "B\u1EB1ng URL",
      'Browse': "Duy\u1EC7t file",
      'Drop image': "K\xE9o th\u1EA3 h\xECnh",
      'or click': "ho\u1EB7c ch\u1ECDn",
      'Manage Images': "Qu\u1EA3n l\xFD h\xECnh \u1EA3nh",
      'Loading': "\u0110ang t\u1EA3i",
      'Deleting': "\u0110ang x\xF3a",
      'Tags': 'Tags',
      'Are you sure? Image will be deleted.': "B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn? H\xECnh \u1EA3nh s\u1EBD b\u1ECB x\xF3a.",
      'Replace': "Thay th\u1EBF",
      'Uploading': "\u0110ang t\u1EA3i l\xEAn",
      'Loading image': "\u0110ang t\u1EA3i h\xECnh \u1EA3nh",
      'Display': "Hi\u1EC3n th\u1ECB",
      'Inline': "C\xF9ng d\xF2ng v\u1EDBi ch\u1EEF",
      'Break Text': "Kh\xF4ng c\xF9ng d\xF2ng v\u1EDBi ch\u1EEF",
      'Alternative Text': "Thay th\u1EBF ch\u1EEF",
      'Change Size': "Thay \u0111\u1ED5i k\xEDch c\u1EE1",
      'Width': "Chi\u1EC1u r\u1ED9ng",
      'Height': "Chi\u1EC1u cao",
      'Something went wrong. Please try again.': "C\xF3 l\u1ED7i x\u1EA3y ra. Vui l\xF2ng th\u1EED l\u1EA1i sau.",
      'Image Caption': 'Chú thích hình ảnh',
      'Advanced Edit': 'Chỉnh sửa tiên tiến',
      // Video
      'Insert Video': "Ch\xE8n video",
      'Embedded Code': "M\xE3 nh\xFAng",
      'Paste in a video URL': 'Dán vào một url video',
      'Drop video': 'Thả video',
      'Your browser does not support HTML5 video.': 'Trình duyệt của bạn không hỗ trợ video html5.',
      'Upload Video': 'Tải video lên',
      // Tables
      'Insert Table': "Ch\xE8n b\u1EA3ng",
      'Table Header': "D\xF2ng \u0111\u1EA7u b\u1EA3ng",
      'Remove Table': "X\xF3a b\u1EA3ng",
      'Table Style': "Ki\u1EC3u b\u1EA3ng",
      'Horizontal Align': "C\u0103n ch\u1EC9nh chi\u1EC1u ngang",
      'Row': "D\xF2ng",
      'Insert row above': "Ch\xE8n d\xF2ng ph\xEDa tr\xEAn",
      'Insert row below': "Ch\xE8n d\xF2ng ph\xEDa d\u01B0\u1EDBi",
      'Delete row': "X\xF3a d\xF2ng",
      'Column': "C\u1ED9t",
      'Insert column before': "Ch\xE8n c\u1ED9t b\xEAn tr\xE1i",
      'Insert column after': "Ch\xE8n c\u1ED9t b\xEAn ph\u1EA3i",
      'Delete column': "X\xF3a c\u1ED9t",
      'Cell': "\xD4 b\u1EA3ng",
      'Merge cells': "G\u1ED9p \xF4",
      'Horizontal split': "Chia d\xF2ng",
      'Vertical split': "Chia c\u1ED9t",
      'Cell Background': "M\xE0u n\u1EC1n",
      'Vertical Align': "C\u0103n ch\u1EC9nh chi\u1EC1u d\u1ECDc",
      'Top': "Tr\xEAn c\xF9ng",
      'Middle': "Gi\u1EEFa",
      'Bottom': "D\u01B0\u1EDBi \u0111\xE1y",
      'Align Top': "C\u0103n tr\xEAn",
      'Align Middle': "C\u0103n gi\u1EEFa",
      'Align Bottom': "C\u0103n d\u01B0\u1EDBi",
      'Cell Style': "Ki\u1EC3u \xF4",
      // Files
      'Upload File': "T\u1EA3i file l\xEAn",
      'Drop file': "K\xE9o th\u1EA3 file",
      // Emoticons
      'Emoticons': "Bi\u1EC3u t\u01B0\u1EE3ng c\u1EA3m x\xFAc",
      // Line breaker
      'Break': "Ng\u1EAFt d\xF2ng",
      // Math
      'Subscript': 'Subscript',
      'Superscript': 'Superscript',
      // Full screen
      'Fullscreen': "To\xE0n m\xE0n h\xECnh",
      // Horizontal line
      'Insert Horizontal Line': "Ch\xE8n \u0111\u01B0\u1EDDng k\u1EBB ngang v\u0103n b\u1EA3n",
      // Clear formatting
      'Clear Formatting': "X\xF3a \u0111\u1ECBnh d\u1EA1ng",
      // Save
      'Save': 'Save',
      // Undo, redo
      'Undo': 'Undo',
      'Redo': 'Redo',
      // Select all
      'Select All': "Ch\u1ECDn t\u1EA5t c\u1EA3",
      // Code view
      'Code View': "Xem d\u1EA1ng code",
      // Quote
      'Quote': "Tr\xEDch d\u1EABn",
      'Increase': "T\u0103ng",
      'Decrease': "Gi\u1EA3m",
      // Quick Insert
      'Quick Insert': "Ch\xE8n nhanh",
      // Spcial Characters
      'Special Characters': 'Nhân vật đặc biệt',
      'Latin': 'Latin',
      'Greek': 'Người Hy Lạp',
      'Cyrillic': 'Chữ viết tay',
      'Punctuation': 'Chấm câu',
      'Currency': 'Tiền tệ',
      'Arrows': 'Mũi tên',
      'Math': 'Môn Toán',
      'Misc': 'Misc',
      // Print.
      'Print': 'In',
      // Spell Checker.
      'Spell Checker': 'Công cụ kiểm tra chính tả',
      // Help
      'Help': 'Cứu giúp',
      'Shortcuts': 'Phím tắt',
      'Inline Editor': 'Trình biên tập nội tuyến',
      'Show the editor': 'Hiển thị trình soạn thảo',
      'Common actions': 'Hành động thông thường',
      'Copy': 'Sao chép',
      'Cut': 'Cắt tỉa',
      'Paste': 'Dán',
      'Basic Formatting': 'Định dạng cơ bản',
      'Increase quote level': 'Tăng mức báo giá',
      'Decrease quote level': 'Giảm mức giá',
      'Image / Video': 'Hình ảnh / video',
      'Resize larger': 'Thay đổi kích thước lớn hơn',
      'Resize smaller': 'Thay đổi kích thước nhỏ hơn',
      'Table': 'Bàn',
      'Select table cell': 'Chọn ô trong bảng',
      'Extend selection one cell': 'Mở rộng lựa chọn một ô',
      'Extend selection one row': 'Mở rộng lựa chọn một hàng',
      'Navigation': 'Dẫn đường',
      'Focus popup / toolbar': 'Tập trung popup / thanh công cụ',
      'Return focus to previous position': 'Quay trở lại vị trí trước',
      // Embed.ly
      'Embed URL': 'Url nhúng',
      'Paste in a URL to embed': 'Dán vào một url để nhúng',
      // Word Paste.
      'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'Nội dung dán là đến từ một tài liệu từ microsoft. bạn có muốn giữ định dạng hoặc làm sạch nó?',
      'Keep': 'Giữ',
      'Clean': 'Dọn dẹp',
      'Word Paste Detected': 'Dán từ được phát hiện',
      // Character Counter
      'Characters': 'Nhân vật',
      // More Buttons
      'More Text': 'Thêm văn bản',
      'More Paragraph': 'Đoạn khác',
      'More Rich': 'Giàu hơn',
      'More Misc': 'Thêm linh tinh'
    },
    direction: 'ltr'
  };

})));
//# sourceMappingURL=vi.js.map
