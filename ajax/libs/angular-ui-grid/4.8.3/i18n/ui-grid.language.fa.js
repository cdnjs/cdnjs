/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

/**
 * Translated by: R. Salarmehr
 *                M. Hosseynzade
 *                Using Vajje.com online dictionary.
 */
(function () {
  angular.module('ui.grid').config(['$provide', function ($provide) {
    $provide.decorator('i18nService', ['$delegate', function ($delegate) {
      $delegate.add('fa', {
        aggregate: {
          label: 'قلم'
        },
        groupPanel: {
          description: 'عنوان یک ستون را بگیر و به گروهی از آن ستون رها کن.'
        },
        search: {
          placeholder: 'جستجو...',
          showingItems: 'نمایش اقلام:',
          selectedItems: 'قلم\u200cهای انتخاب شده:',
          totalItems: 'مجموع اقلام:',
          size: 'اندازه\u200cی صفحه:',
          first: 'اولین صفحه',
          next: 'صفحه\u200cی\u200cبعدی',
          previous: 'صفحه\u200cی\u200c قبلی',
          last: 'آخرین صفحه'
        },
        menu: {
          text: 'ستون\u200cهای انتخابی:'
        },
        sort: {
          ascending: 'ترتیب صعودی',
          descending: 'ترتیب نزولی',
          remove: 'حذف مرتب کردن'
        },
        column: {
          hide: 'پنهان\u200cکردن ستون'
        },
        aggregation: {
          count: 'تعداد: ',
          sum: 'مجموع: ',
          avg: 'میانگین: ',
          min: 'کمترین: ',
          max: 'بیشترین: '
        },
        pinning: {
          pinLeft: 'پین کردن سمت چپ',
          pinRight: 'پین کردن سمت راست',
          unpin: 'حذف پین'
        },
        gridMenu: {
          columns: 'ستون\u200cها:',
          importerTitle: 'وارد کردن فایل',
          exporterAllAsCsv: 'خروجی تمام داده\u200cها در فایل csv',
          exporterVisibleAsCsv: 'خروجی داده\u200cهای قابل مشاهده در فایل csv',
          exporterSelectedAsCsv: 'خروجی داده\u200cهای انتخاب\u200cشده در فایل csv',
          exporterAllAsPdf: 'خروجی تمام داده\u200cها در فایل pdf',
          exporterVisibleAsPdf: 'خروجی داده\u200cهای قابل مشاهده در فایل pdf',
          exporterSelectedAsPdf: 'خروجی داده\u200cهای انتخاب\u200cشده در فایل pdf',
          clearAllFilters: 'پاک کردن تمام فیلتر'
        },
        importer: {
          noHeaders: 'نام ستون قابل استخراج نیست. آیا فایل عنوان دارد؟',
          noObjects: 'اشیا قابل استخراج نیستند. آیا به جز عنوان\u200cها در فایل داده وجود دارد؟',
          invalidCsv: 'فایل قابل پردازش نیست. آیا فرمت  csv  معتبر است؟',
          invalidJson: 'فایل قابل پردازش نیست. آیا فرمت json   معتبر است؟',
          jsonNotArray: 'فایل json وارد شده باید حاوی آرایه باشد. عملیات ساقط شد.'
        },
        pagination: {
          sizes: 'اقلام در هر صفحه',
          totalItems: 'اقلام',
          of: 'از'
        },
        grouping: {
          group: 'گروه\u200cبندی',
          ungroup: 'حذف گروه\u200cبندی',
          aggregate_count: 'Agg: تعداد',
          aggregate_sum: 'Agg: جمع',
          aggregate_max: 'Agg: بیشینه',
          aggregate_min: 'Agg: کمینه',
          aggregate_avg: 'Agg: میانگین',
          aggregate_remove: 'Agg: حذف'
        }
      });
      return $delegate;
    }]);
  }]);
})();
