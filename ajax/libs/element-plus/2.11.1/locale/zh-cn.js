/*! Element Plus v2.11.1 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ElementPlusLocaleZhCn = factory());
})(this, (function () { 'use strict';

  var zhCn = {
    name: "zh-cn",
    el: {
      breadcrumb: {
        label: "\u9762\u5305\u5C51"
      },
      colorpicker: {
        confirm: "\u786E\u5B9A",
        clear: "\u6E05\u7A7A",
        defaultLabel: "\u989C\u8272\u9009\u62E9\u5668",
        description: "\u5F53\u524D\u989C\u8272 {color}\uFF0C\u6309 Enter \u952E\u9009\u62E9\u65B0\u989C\u8272",
        alphaLabel: "\u9009\u62E9\u900F\u660E\u5EA6\u7684\u503C"
      },
      datepicker: {
        now: "\u6B64\u523B",
        today: "\u4ECA\u5929",
        cancel: "\u53D6\u6D88",
        clear: "\u6E05\u7A7A",
        confirm: "\u786E\u5B9A",
        dateTablePrompt: "\u4F7F\u7528\u65B9\u5411\u952E\u4E0E Enter \u952E\u53EF\u9009\u62E9\u65E5\u671F",
        monthTablePrompt: "\u4F7F\u7528\u65B9\u5411\u952E\u4E0E Enter \u952E\u53EF\u9009\u62E9\u6708\u4EFD",
        yearTablePrompt: "\u4F7F\u7528\u65B9\u5411\u952E\u4E0E Enter \u952E\u53EF\u9009\u62E9\u5E74\u4EFD",
        selectedDate: "\u5DF2\u9009\u65E5\u671F",
        selectDate: "\u9009\u62E9\u65E5\u671F",
        selectTime: "\u9009\u62E9\u65F6\u95F4",
        startDate: "\u5F00\u59CB\u65E5\u671F",
        startTime: "\u5F00\u59CB\u65F6\u95F4",
        endDate: "\u7ED3\u675F\u65E5\u671F",
        endTime: "\u7ED3\u675F\u65F6\u95F4",
        prevYear: "\u524D\u4E00\u5E74",
        nextYear: "\u540E\u4E00\u5E74",
        prevMonth: "\u4E0A\u4E2A\u6708",
        nextMonth: "\u4E0B\u4E2A\u6708",
        year: "\u5E74",
        month1: "1 \u6708",
        month2: "2 \u6708",
        month3: "3 \u6708",
        month4: "4 \u6708",
        month5: "5 \u6708",
        month6: "6 \u6708",
        month7: "7 \u6708",
        month8: "8 \u6708",
        month9: "9 \u6708",
        month10: "10 \u6708",
        month11: "11 \u6708",
        month12: "12 \u6708",
        weeks: {
          sun: "\u65E5",
          mon: "\u4E00",
          tue: "\u4E8C",
          wed: "\u4E09",
          thu: "\u56DB",
          fri: "\u4E94",
          sat: "\u516D"
        },
        weeksFull: {
          sun: "\u661F\u671F\u65E5",
          mon: "\u661F\u671F\u4E00",
          tue: "\u661F\u671F\u4E8C",
          wed: "\u661F\u671F\u4E09",
          thu: "\u661F\u671F\u56DB",
          fri: "\u661F\u671F\u4E94",
          sat: "\u661F\u671F\u516D"
        },
        months: {
          jan: "\u4E00\u6708",
          feb: "\u4E8C\u6708",
          mar: "\u4E09\u6708",
          apr: "\u56DB\u6708",
          may: "\u4E94\u6708",
          jun: "\u516D\u6708",
          jul: "\u4E03\u6708",
          aug: "\u516B\u6708",
          sep: "\u4E5D\u6708",
          oct: "\u5341\u6708",
          nov: "\u5341\u4E00\u6708",
          dec: "\u5341\u4E8C\u6708"
        }
      },
      inputNumber: {
        decrease: "\u51CF\u5C11\u6570\u503C",
        increase: "\u589E\u52A0\u6570\u503C"
      },
      select: {
        loading: "\u52A0\u8F7D\u4E2D",
        noMatch: "\u65E0\u5339\u914D\u6570\u636E",
        noData: "\u65E0\u6570\u636E",
        placeholder: "\u8BF7\u9009\u62E9"
      },
      dropdown: {
        toggleDropdown: "\u5207\u6362\u4E0B\u62C9\u9009\u9879"
      },
      mention: {
        loading: "\u52A0\u8F7D\u4E2D"
      },
      cascader: {
        noMatch: "\u65E0\u5339\u914D\u6570\u636E",
        loading: "\u52A0\u8F7D\u4E2D",
        placeholder: "\u8BF7\u9009\u62E9",
        noData: "\u6682\u65E0\u6570\u636E"
      },
      pagination: {
        goto: "\u524D\u5F80",
        pagesize: "\u6761/\u9875",
        total: "\u5171 {total} \u6761",
        pageClassifier: "\u9875",
        page: "\u9875",
        prev: "\u4E0A\u4E00\u9875",
        next: "\u4E0B\u4E00\u9875",
        currentPage: "\u7B2C {pager} \u9875",
        prevPages: "\u5411\u524D {pager} \u9875",
        nextPages: "\u5411\u540E {pager} \u9875",
        deprecationWarning: "\u4F60\u4F7F\u7528\u4E86\u4E00\u4E9B\u5DF2\u88AB\u5E9F\u5F03\u7684\u7528\u6CD5\uFF0C\u8BF7\u53C2\u8003 el-pagination \u7684\u5B98\u65B9\u6587\u6863"
      },
      dialog: {
        close: "\u5173\u95ED\u6B64\u5BF9\u8BDD\u6846"
      },
      drawer: {
        close: "\u5173\u95ED\u6B64\u5BF9\u8BDD\u6846"
      },
      messagebox: {
        title: "\u63D0\u793A",
        confirm: "\u786E\u5B9A",
        cancel: "\u53D6\u6D88",
        error: "\u8F93\u5165\u7684\u6570\u636E\u4E0D\u5408\u6CD5!",
        close: "\u5173\u95ED\u6B64\u5BF9\u8BDD\u6846"
      },
      upload: {
        deleteTip: "\u6309 Delete \u952E\u53EF\u5220\u9664",
        delete: "\u5220\u9664",
        preview: "\u67E5\u770B\u56FE\u7247",
        continue: "\u7EE7\u7EED\u4E0A\u4F20"
      },
      slider: {
        defaultLabel: "\u6ED1\u5757\u4ECB\u4E8E {min} \u81F3 {max}",
        defaultRangeStartLabel: "\u9009\u62E9\u8D77\u59CB\u503C",
        defaultRangeEndLabel: "\u9009\u62E9\u7ED3\u675F\u503C"
      },
      table: {
        emptyText: "\u6682\u65E0\u6570\u636E",
        confirmFilter: "\u7B5B\u9009",
        resetFilter: "\u91CD\u7F6E",
        clearFilter: "\u5168\u90E8",
        sumText: "\u5408\u8BA1"
      },
      tour: {
        next: "\u4E0B\u4E00\u6B65",
        previous: "\u4E0A\u4E00\u6B65",
        finish: "\u7ED3\u675F\u5BFC\u89C8"
      },
      tree: {
        emptyText: "\u6682\u65E0\u6570\u636E"
      },
      transfer: {
        noMatch: "\u65E0\u5339\u914D\u6570\u636E",
        noData: "\u65E0\u6570\u636E",
        titles: ["\u5217\u8868 1", "\u5217\u8868 2"],
        filterPlaceholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
        noCheckedFormat: "\u5171 {total} \u9879",
        hasCheckedFormat: "\u5DF2\u9009 {checked}/{total} \u9879"
      },
      image: {
        error: "\u52A0\u8F7D\u5931\u8D25"
      },
      pageHeader: {
        title: "\u8FD4\u56DE"
      },
      popconfirm: {
        confirmButtonText: "\u786E\u5B9A",
        cancelButtonText: "\u53D6\u6D88"
      },
      carousel: {
        leftArrow: "\u4E0A\u4E00\u5F20\u5E7B\u706F\u7247",
        rightArrow: "\u4E0B\u4E00\u5F20\u5E7B\u706F\u7247",
        indicator: "\u5E7B\u706F\u7247\u5207\u6362\u81F3\u7D22\u5F15 {index}"
      }
    }
  };

  return zhCn;

}));
