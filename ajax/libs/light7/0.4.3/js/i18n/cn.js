/*!
 * =====================================================
 * light7 V0.4.3 - http://light7.org/
 *
 * =====================================================
 */
"use strict";

/* global $:true */
+function ($) {
  var modal = $.modal.prototype.defaults;
  modal.modalButtonOk = "确定";
  modal.modalButtonCancel = "取消";
  modal.modalPreloaderTitle = "正在加载...";

  var calendar = $.fn.calendar.prototype.defaults;
  
  calendar.monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'];
  calendar.monthNamesShort = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'];
  calendar.dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  calendar.dayNamesShort = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
}($);
