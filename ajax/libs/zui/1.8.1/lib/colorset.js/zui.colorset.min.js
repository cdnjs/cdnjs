/*!
 * ZUI: JS配色表 - v1.8.1 - 2018-01-18
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2018 cnezsoft.com; Licensed MIT
 */
/*!
 * ZUI: Generated from less code - v1.8.1 - 2018-01-18
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2018 cnezsoft.com; Licensed MIT
 */
!function(e){"use strict";var f=0,r=["primary","red","yellow","green","blue","purple","brown","dark"],a={primary:"#3280fc",secondary:"#145ccd",pale:"#ebf2f9",fore:"#353535",back:"#fff",grayDarker:"#222222",grayDark:"#333333",gray:"#808080",grayLight:"#dddddd",grayLighter:"#e5e5e5",grayPale:"#f1f1f1",white:"#fff",black:"#000",red:"#ea644a",yellow:"#f1a325",green:"#38b03f",blue:"#03b8cf",purple:"#8666b8",brown:"#bd7b46",greenPale:"#ddf4df",yellowPale:"#fff0d5",redPale:"#ffe5e0",bluePale:"#ddf3f5",brownPale:"#f7ebe1",purplePale:"#f5eeff",light:"#fff",dark:"#353535",success:"#38b03f",warning:"#f1a325",danger:"#ea644a",info:"#03b8cf",important:"#bd7b46",special:"#8666b8",successPale:"#ddf4df",warningPale:"#fff0d5",dangerPale:"#ffe5e0",infoPale:"#ddf3f5",importantPale:"#f7ebe1",specialPale:"#f5eeff"};a.get=function(l){"undefined"!=typeof l&&"random"!==l||(l=r[f++%r.length]);var d=a[l]?a[l]:l;return e.zui.Color?new e.zui.Color(d):d},e.zui({colorset:a}),e.zui.Color&&e.extend(e.zui.Color,a)}(jQuery);