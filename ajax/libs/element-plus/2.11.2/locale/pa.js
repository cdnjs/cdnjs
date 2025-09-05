/*! Element Plus v2.11.2 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ElementPlusLocalePa = factory());
})(this, (function () { 'use strict';

  var pa = {
    name: "pa",
    el: {
      breadcrumb: {
        label: "Breadcrumb"
      },
      colorpicker: {
        confirm: "\u062A\u0627\u06CC\u06CC\u062F",
        clear: "\u067E\u0627\u06A9\u0648\u0644",
        defaultLabel: "color picker",
        description: "current color is {color}. press enter to select a new color.",
        alphaLabel: "pick alpha value"
      },
      datepicker: {
        now: "\u0627\u0648\u0633",
        today: "\u0646\u0646",
        cancel: "\u0631\u062F\u0648\u0644",
        clear: "\u067E\u0627\u06A9\u0648\u0644",
        confirm: "\u062A\u0627\u06CC\u06CC\u062F",
        dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
        monthTablePrompt: "Use the arrow keys and enter to select the month",
        yearTablePrompt: "Use the arrow keys and enter to select the year",
        selectedDate: "Selected date",
        selectDate: "\u0646\u06CC\u067C\u0647 \u0648\u067C\u0627\u06A9\u0626",
        selectTime: "\u0648\u062E\u062A \u0648\u067C\u0627\u06A9\u0626",
        startDate: "\u067E\u06CC\u0644 \u0646\u06CC\u067C\u0647",
        startTime: "\u062F \u067E\u064A\u0644 \u0648\u062E\u062A",
        endDate: "\u062F \u067E\u0627\u06CC \u0646\u06CC\u067C\u0647",
        endTime: "\u062F \u067E\u0627\u06CC \u0648\u062E\u062A",
        prevYear: "\u062A\u06CC\u0631 \u06A9\u0627\u0644",
        nextYear: "\u0631\u0627\u062A\u0644\u0648\u0646\u06A9\u06CC \u06A9\u0627\u0644",
        prevMonth: "\u062A\u06CC\u0631\u0647 \u0645\u06CC\u0627\u0634\u062A",
        nextMonth: "\u0631\u0627\u062A\u0644\u0648\u0646\u06A9\u06D0 \u0645\u06CC\u0627\u0634\u062A",
        year: "\u06A9\u0627\u0644",
        month1: "\u062C\u0646\u0648\u0631\u064A",
        month2: "\u0641\u0628\u0631\u0648\u0631\u064A",
        month3: "\u0645\u0627\u0631\u0686",
        month4: "\u0627\u067E\u0631\u06CC\u0644",
        month5: "\u0645\u06CC",
        month6: "\u062C\u0648\u0646",
        month7: "\u062C\u0648\u0644\u0627\u06CC",
        month8: "\u0627\u06AB\u0633\u062A",
        month9: "\u0633\u067E\u062A\u0645\u0628\u0631",
        month10: "\u0627\u06A9\u062A\u0648\u0628\u0631",
        month11: "\u0646\u0648\u0645\u0628\u0631",
        month12: "\u062F\u0633\u0645\u0628\u0631",
        weeks: {
          sun: "\u06CC\u06A9\u0634\u0646\u0628\u0647",
          mon: "\u062F\u0648\u0634\u0646\u0628\u0647",
          tue: "\u0633\u0647\u200B \u0634\u0646\u0628\u0647",
          wed: "\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647",
          thu: "\u067E\u0646\u062C\u200B\u0634\u0646\u0628\u0647",
          fri: "\u062C\u0645\u0639\u0647",
          sat: "\u0634\u0646\u0628\u0647"
        },
        weeksFull: {
          sun: "Sunday",
          mon: "Monday",
          tue: "Tuesday",
          wed: "Wednesday",
          thu: "Thursday",
          fri: "Friday",
          sat: "Saturday"
        },
        months: {
          jan: "\u062C\u0646\u0648\u0631\u064A",
          feb: "\u0641\u0628\u0631\u0648\u0631\u064A",
          mar: "\u0645\u0627\u0631\u0686",
          apr: "\u0627\u067E\u0631\u06CC\u0644",
          may: "\u0645\u06CC",
          jun: "\u062C\u0648\u0646",
          jul: "\u062C\u0648\u0644\u0627\u06CC",
          aug: "\u0627\u06AB\u0633\u062A",
          sep: "\u0633\u067E\u062A\u0645\u0628\u0631",
          oct: "\u0627\u06A9\u062A\u0648\u0628\u0631",
          nov: "\u0646\u0648\u0645\u0628\u0631",
          dec: "\u062F\u0633\u0645\u0628\u0631"
        }
      },
      inputNumber: {
        decrease: "decrease number",
        increase: "increase number"
      },
      select: {
        loading: "\u0628\u0627\u0631 \u06A9\u0648\u0644",
        noMatch: "\u0647\u06CC\u0685\u0647 \u0648\u0646\u0647 \u0645\u0648\u0646\u062F\u0644 \u0634\u0648\u0644",
        noData: "\u0647\u06CC\u0685 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0646\u0634\u062A\u0647",
        placeholder: "\u0681\u0627\u06CC \u0644\u0631\u0648\u0646\u06A9\u06CC"
      },
      mention: {
        loading: "\u0628\u0627\u0631 \u06A9\u0648\u0644"
      },
      dropdown: {
        toggleDropdown: "Toggle Dropdown"
      },
      cascader: {
        noMatch: "\u0647\u06CC\u0685\u0647 \u0648\u0646\u0647 \u0645\u0648\u0646\u062F\u0644 \u0634\u0648\u0644",
        loading: "\u0628\u0627\u0631 \u06A9\u0648\u0644",
        placeholder: "\u0681\u0627\u06CC \u0644\u0631\u0648\u0646\u06A9\u06CC",
        noData: "\u0647\u06CC\u0685 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0646\u0634\u062A\u0647"
      },
      pagination: {
        goto: "\u0648\u0631\u062A\u06AB",
        pagesize: "/\u062F \u067E\u0627\u06BC\u06D0 \u0627\u0646\u062F\u0627\u0632\u0647",
        total: "\u0645\u062C\u0645\u0648\u0639\u0647 {total}",
        pageClassifier: "",
        page: "Page",
        prev: "Go to previous page",
        next: "Go to next page",
        currentPage: "page {pager}",
        prevPages: "Previous {pager} pages",
        nextPages: "Next {pager} pages",
        deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
      },
      dialog: {
        close: "Close this dialog"
      },
      drawer: {
        close: "Close this dialog"
      },
      messagebox: {
        title: "\u0639\u0646\u0648\u0627\u0646",
        confirm: "\u062A\u0627\u06CC\u06CC\u062F",
        cancel: "\u0644\u063A\u0648\u0647 \u06A9\u0648\u0644",
        error: "\u062A\u064A\u0631\u0648\u062A\u0646\u0647",
        close: "Close this dialog"
      },
      upload: {
        deleteTip: "\u062F \u062D\u0630\u0641 \u06A9\u0648\u0644\u0648 \u0644\u067E\u0627\u0631\u0647 \u067E\u0627\u06A9\u0647 \u062A\u06BC\u06CD \u0641\u0634\u0627\u0631 \u06A9\u0693\u0626",
        delete: "\u0693\u0646\u06AB\u0648\u0644",
        preview: "\u0645\u062E\u06A9\u062A\u0646\u0647",
        continue: "\u0627\u062F\u0627\u0645\u0647"
      },
      slider: {
        defaultLabel: "slider between {min} and {max}",
        defaultRangeStartLabel: "pick start value",
        defaultRangeEndLabel: "pick end value"
      },
      table: {
        emptyText: "\u0647\u06CC\u0685 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0648\u0646\u0647 \u0645\u0648\u0646\u062F\u0644 \u0634\u0648\u0644",
        confirmFilter: "\u062A\u0627\u06CC\u06CC\u062F",
        resetFilter: "\u067E\u0627\u06A9\u0648\u0644",
        clearFilter: "\u067C\u0648\u0644",
        sumText: "\u0645\u062C\u0645\u0648\u0639\u0647"
      },
      tour: {
        next: "Next",
        previous: "Previous",
        finish: "Finish",
        close: "Close this dialog"
      },
      tree: {
        emptyText: "\u0647\u06CC\u0685 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0648\u0646\u0647 \u0645\u0648\u0646\u062F\u0644 \u0634\u0648\u0644"
      },
      transfer: {
        noMatch: "\u0647\u06CC\u0685\u0647 \u0648\u0646\u0647 \u0645\u0648\u0646\u062F\u0644 \u0634\u0648\u0644",
        noData: "\u0647\u06CC\u0685 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0646\u0634\u062A\u0647",
        titles: ["\u0644\u06CC\u0633\u067C 1", "\u0644\u06CC\u0633\u067C 2"],
        filterPlaceholder: "\u062F \u0645\u062A\u0646 \u06A9\u0644\u06CC\u0645\u06D0 \u062F\u0646\u0646\u0647 \u06A9\u0693\u0626",
        noCheckedFormat: "{total} \u062A\u0648\u06A9\u064A",
        hasCheckedFormat: "{checked} \u062A\u0648\u06A9\u064A \u0627\u0632 {total} \u062A\u0648\u06A9\u064A \u067C\u0627\u06A9\u0644 \u0634\u0648\u06CC \u062F\u064A"
      },
      image: {
        error: "\u062F \u0627\u0646\u0681\u0648\u0631 \u067E\u0648\u0631\u062A\u0647 \u06A9\u0648\u0644\u0648 \u06A9\u06D0 \u0633\u062A\u0648\u0646\u0632\u0647"
      },
      pageHeader: {
        title: "\u0628\u06CC\u0631\u062A\u0647 \u0631\u0627\u062A\u06AB"
      },
      popconfirm: {
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      },
      carousel: {
        leftArrow: "Carousel arrow left",
        rightArrow: "Carousel arrow right",
        indicator: "Carousel switch to index {index}"
      }
    }
  };

  return pa;

}));
