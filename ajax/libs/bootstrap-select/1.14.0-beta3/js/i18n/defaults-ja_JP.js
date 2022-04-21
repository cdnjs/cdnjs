/*!
 * Bootstrap-select v1.14.0-beta3 (https://developer.snapappointments.com/bootstrap-select)
 *
 * Copyright 2012-2022 SnapAppointments, LLC
 * Licensed under MIT (https://github.com/snapappointments/bootstrap-select/blob/master/LICENSE)
 */

(function (root, factory) {
  if (root === undefined && window !== undefined) root = window;
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(root["jQuery"]);
  }
}(this, function (jQuery) {

(function ($) {
  $.fn.selectpicker.defaults = {
    noneSelectedText: '選択されていません',
    noneResultsText: '\'{0}\'は見つかりません',
    countSelectedText: '{0}/{1} 選択中',
    maxOptionsText: ['選択上限数を超えています(最大{n}{var})', 'グループの選択上限数を超えています(最大{n}{var})', ['アイテム', 'アイテム']],
    selectAllText: '全て選択',
    deselectAllText: '選択をクリア',
    multipleSeparator: ', '
  };
})(jQuery);


}));
//# sourceMappingURL=defaults-ja_JP.js.map