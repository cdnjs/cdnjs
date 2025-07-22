(function( factory ) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( [], factory);
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = factory();
	}
	// No browser loader - use JSON, ESM, CJS or AMD
}
(function() {
    return {
    "emptyTable": "هیچ داده‌ای در جدول وجود ندارد",
    "info": "نمایش _START_ تا _END_ از _TOTAL_ ردیف",
    "infoEmpty": "نمایش 0 تا 0 از 0 ردیف",
    "infoFiltered": "(فیلتر شده از _MAX_ ردیف)",
    "infoThousands": ",",
    "lengthMenu": "نمایش _MENU_ ردیف",
    "processing": "در حال پردازش...",
    "search": "جستجو:",
    "zeroRecords": "رکوردی با این مشخصات پیدا نشد",
    "paginate": {
        "next": "بعدی",
        "previous": "قبلی",
        "first": "ابتدا",
        "last": "انتها"
    },
    "aria": {
        "sortAscending": ": فعال سازی نمایش به صورت صعودی",
        "sortDescending": ": فعال سازی نمایش به صورت نزولی"
    },
    "autoFill": {
        "cancel": "انصراف",
        "fill": "پر کردن همه سلول ها با ساختار سیستم",
        "fillHorizontal": "پر کردن سلول به صورت افقی",
        "fillVertical": "پرکردن سلول به صورت عمودی"
    },
    "buttons": {
        "collection": "مجموعه",
        "colvis": "قابلیت نمایش ستون",
        "colvisRestore": "بازنشانی قابلیت نمایش",
        "copy": "کپی",
        "copySuccess": {
            "1": "یک ردیف داخل حافظه کپی شد",
            "_": "%ds ردیف داخل حافظه کپی شد"
        },
        "copyTitle": "کپی در حافظه",
        "pageLength": {
            "-1": "نمایش همه ردیف‌ها",
            "_": "نمایش %d ردیف",
            "1": "نمایش 1 ردیف"
        },
        "print": "چاپ",
        "copyKeys": "برای کپی داده جدول در حافظه سیستم کلید های ctrl یا ⌘ + C را فشار دهید",
        "csv": "فایل CSV",
        "pdf": "فایل PDF",
        "renameState": "تغییر نام",
        "updateState": "به روز رسانی",
        "excel": "فایل اکسل",
        "createState": "ایجاد وضعیت جدول",
        "removeAllStates": "حذف همه وضعیت ها",
        "removeState": "حذف",
        "savedStates": "وضعیت های ذخیره شده",
        "stateRestore": "بازگشت به وضعیت %d"
    },
    "searchBuilder": {
        "add": "افزودن شرط",
        "button": {
            "0": "جستجو ساز",
            "_": "جستجوساز (%d)"
        },
        "clearAll": "خالی کردن همه",
        "condition": "شرط",
        "conditions": {
            "date": {
                "after": "بعد از",
                "before": "بعد از",
                "between": "میان",
                "empty": "خالی",
                "not": "نباشد",
                "notBetween": "میان نباشد",
                "notEmpty": "خالی نباشد",
                "equals": "برابر باشد با"
            },
            "number": {
                "between": "میان",
                "empty": "خالی",
                "gt": "بزرگتر از",
                "gte": "برابر یا بزرگتر از",
                "lt": "کمتر از",
                "lte": "برابر یا کمتر از",
                "not": "نباشد",
                "notBetween": "میان نباشد",
                "notEmpty": "خالی نباشد",
                "equals": "برابر باشد با"
            },
            "string": {
                "contains": "حاوی",
                "empty": "خالی",
                "endsWith": "به پایان می رسد با",
                "not": "نباشد",
                "notEmpty": "خالی نباشد",
                "startsWith": "شروع  شود با",
                "notContains": "نباشد حاوی",
                "notEndsWith": "پایان نیابد با",
                "notStartsWith": "شروع نشود با",
                "equals": "برابر باشد با"
            },
            "array": {
                "empty": "خالی",
                "contains": "حاوی",
                "not": "نباشد",
                "notEmpty": "خالی نباشد",
                "without": "بدون",
                "equals": "برابر باشد با"
            }
        },
        "data": "اطلاعات",
        "logicAnd": "و",
        "logicOr": "یا",
        "title": {
            "0": "جستجو ساز",
            "_": "جستجوساز (%d)"
        },
        "value": "مقدار",
        "deleteTitle": "حذف شرط فیلتر",
        "leftTitle": "شرط بیرونی",
        "rightTitle": "شرط فرورفتگی"
    },
    "select": {
        "cells": {
            "1": "1 سلول انتخاب شد",
            "_": "%d سلول انتخاب شد"
        },
        "columns": {
            "1": "یک ستون انتخاب شد",
            "_": "%d ستون انتخاب شد"
        },
        "rows": {
            "1": "1ردیف انتخاب شد",
            "_": "%d  انتخاب شد"
        }
    },
    "thousands": ",",
    "searchPanes": {
        "clearMessage": "همه را پاک کن",
        "collapse": {
            "0": "صفحه جستجو",
            "_": "صفحه جستجو (٪ d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "صفحه جستجو وجود ندارد",
        "loadMessage": "در حال بارگیری صفحات جستجو ...",
        "title": "فیلترهای فعال - %d",
        "showMessage": "نمایش همه",
        "collapseMessage": "بستن همه"
    },
    "loadingRecords": "در حال بارگذاری...",
    "datetime": {
        "previous": "قبلی",
        "next": "بعدی",
        "hours": "ساعت",
        "minutes": "دقیقه",
        "seconds": "ثانیه",
        "amPm": [
            "صبح",
            "عصر"
        ],
        "months": {
            "0": "ژانویه",
            "1": "فوریه",
            "10": "نوامبر",
            "4": "می",
            "8": "سپتامبر",
            "11": "دسامبر",
            "3": "آوریل",
            "9": "اکتبر",
            "7": "اوت",
            "2": "مارس",
            "5": "ژوئن",
            "6": "ژوئیه"
        },
        "unknown": "-",
        "weekdays": [
            "یکشنبه",
            "دوشنبه",
            "سه‌شنبه",
            "چهارشنبه",
            "پنجشنبه",
            "جمعه",
            "شنبه"
        ]
    },
    "editor": {
        "close": "بستن",
        "create": {
            "button": "جدید",
            "title": "ثبت جدید",
            "submit": "ایجــاد"
        },
        "edit": {
            "button": "ویرایش",
            "title": "ویرایش",
            "submit": "به روز رسانی"
        },
        "remove": {
            "button": "حذف",
            "title": "حذف",
            "submit": "حذف",
            "confirm": {
                "_": "آیا از حذف %d خط اطمینان دارید؟",
                "1": "آیا از حذف یک خط اطمینان دارید؟"
            }
        },
        "multi": {
            "restore": "واگرد",
            "noMulti": "این ورودی را می توان به صورت جداگانه ویرایش کرد، اما نه بخشی از یک گروه",
            "title": "مقادیر متعدد",
            "info": "مقادیر متعدد"
        },
        "error": {
            "system": "خطایی رخ داده (اطلاعات بیشتر)"
        }
    },
    "decimal": ".",
    "stateRestore": {
        "creationModal": {
            "button": "ایجاد",
            "columns": {
                "search": "جستجوی ستون",
                "visible": "وضعیت نمایش ستون"
            },
            "name": "نام:",
            "order": "مرتب سازی",
            "paging": "صفحه بندی",
            "search": "جستجو",
            "select": "انتخاب",
            "title": "ایجاد وضعیت جدید",
            "toggleLabel": "شامل:",
            "scroller": "موقعیت جدول (اسکرول)",
            "searchBuilder": "صفحه جستجو"
        },
        "emptyError": "نام نمیتواند خالی باشد.",
        "removeConfirm": "آیا از حذف %s مطمئنید؟",
        "removeJoiner": "و",
        "renameButton": "تغییر نام",
        "renameLabel": "نام جدید برای $s :",
        "duplicateError": "وضعیتی با این نام از پیش ذخیره شده.",
        "emptyStates": "هیچ وضعیتی ذخیره نشده",
        "removeError": "حذف با خطا موماجه شد",
        "removeSubmit": "حذف وضعیت",
        "removeTitle": "حذف وضعیت جدول",
        "renameTitle": "تغییر نام وضعیت"
    }
};
}));
