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
    "processing": "處理中...",
    "loadingRecords": "載入中...",
    "paginate": {
        "first": "第一頁",
        "previous": "上一頁",
        "next": "下一頁",
        "last": "最後一頁"
    },
    "emptyTable": "目前沒有資料",
    "datetime": {
        "previous": "上一頁",
        "next": "下一頁",
        "hours": "時",
        "minutes": "分",
        "seconds": "秒",
        "amPm": [
            "上午",
            "下午"
        ],
        "unknown": "未知",
        "weekdays": [
            "週日",
            "週一",
            "週二",
            "週三",
            "週四",
            "週五",
            "週六"
        ],
        "months": [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
        ]
    },
    "searchBuilder": {
        "add": "新增條件",
        "condition": "條件",
        "deleteTitle": "刪除過濾條件",
        "button": {
            "_": "複合查詢 (%d)",
            "0": "複合查詢"
        },
        "clearAll": "清空",
        "conditions": {
            "array": {
                "contains": "含有",
                "equals": "等於",
                "empty": "空值",
                "not": "不等於",
                "notEmpty": "非空值",
                "without": "不含"
            },
            "date": {
                "after": "大於",
                "before": "小於",
                "between": "在其中",
                "empty": "為空",
                "equals": "等於",
                "not": "不為",
                "notBetween": "不在其中",
                "notEmpty": "不為空"
            },
            "number": {
                "between": "在其中",
                "empty": "為空",
                "equals": "等於",
                "gt": "大於",
                "gte": "大於等於",
                "lt": "小於",
                "lte": "小於等於",
                "not": "不為",
                "notBetween": "不在其中",
                "notEmpty": "不為空"
            },
            "string": {
                "contains": "含有",
                "empty": "為空",
                "endsWith": "字尾為",
                "equals": "等於",
                "not": "不為",
                "notEmpty": "不為空",
                "startsWith": "字首為",
                "notContains": "不含",
                "notStartsWith": "開頭不是",
                "notEndsWith": "結尾不是"
            }
        },
        "data": "欄位",
        "leftTitle": "群組條件",
        "logicAnd": "且",
        "logicOr": "或",
        "rightTitle": "取消群組",
        "title": {
            "_": "複合查詢 (%d)",
            "0": "複合查詢"
        },
        "value": "內容"
    },
    "editor": {
        "close": "關閉",
        "create": {
            "button": "新增",
            "title": "新增資料",
            "submit": "送出新增"
        },
        "remove": {
            "button": "刪除",
            "title": "刪除資料",
            "submit": "送出刪除",
            "confirm": {
                "_": "您確定要刪除您所選取的 %d 筆資料嗎？",
                "1": "您確定要刪除您所選取的 1 筆資料嗎？"
            }
        },
        "error": {
            "system": "系統發生錯誤(更多資訊)"
        },
        "edit": {
            "button": "修改",
            "title": "修改資料",
            "submit": "送出修改"
        },
        "multi": {
            "title": "多重值",
            "info": "您所選擇的多筆資料中，此欄位包含了不同的值。若您想要將它們都改為同一個值，可以在此輸入，要不然它們會保留各自原本的值。",
            "restore": "復原",
            "noMulti": "此輸入欄需單獨輸入，不容許多筆資料一起修改"
        }
    },
    "autoFill": {
        "cancel": "取消"
    },
    "buttons": {
        "copySuccess": {
            "_": "複製了 %d 筆資料",
            "1": "複製了 1 筆資料"
        },
        "copyTitle": "已經複製到剪貼簿",
        "excel": "Excel",
        "pdf": "PDF",
        "print": "列印",
        "copy": "複製",
        "colvis": "欄位顯示",
        "colvisRestore": "重置欄位顯示",
        "csv": "CSV",
        "pageLength": {
            "-1": "顯示全部",
            "_": "顯示 %d 筆"
        },
        "createState": "建立狀態",
        "removeAllStates": "移除所有狀態",
        "removeState": "移除",
        "renameState": "重新命名",
        "savedStates": "儲存狀態",
        "stateRestore": "狀態 %d",
        "updateState": "更新"
    },
    "searchPanes": {
        "collapse": {
            "_": "搜尋面版 (%d)",
            "0": "搜尋面版"
        },
        "emptyPanes": "沒搜尋面版",
        "loadMessage": "載入搜尋面版中...",
        "clearMessage": "清空",
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "title": "過濾條件 - %d",
        "showMessage": "顯示全部",
        "collapseMessage": "摺疊全部"
    },
    "stateRestore": {
        "emptyError": "名稱不能空白。",
        "creationModal": {
            "button": "建立",
            "columns": {
                "search": "欄位搜尋",
                "visible": "欄位顯示"
            },
            "name": "名稱：",
            "order": "排序",
            "paging": "分頁",
            "scroller": "卷軸位置",
            "search": "搜尋",
            "searchBuilder": "複合查詢",
            "select": "選擇",
            "title": "建立新狀態",
            "toggleLabel": "包含："
        },
        "duplicateError": "此狀態名稱已經存在。",
        "emptyStates": "名稱不可空白。",
        "removeConfirm": "確定要移除 %s 嗎？",
        "removeError": "移除狀態失敗。",
        "removeJoiner": "和",
        "removeSubmit": "移除",
        "removeTitle": "移除狀態",
        "renameButton": "重新命名",
        "renameLabel": "%s 的新名稱：",
        "renameTitle": "重新命名狀態"
    },
    "select": {
        "columns": {
            "_": "選擇了 %d 欄資料",
            "1": "選擇了 1 欄資料"
        },
        "rows": {
            "1": "選擇了 1 筆資料",
            "_": "選擇了 %d 筆資料"
        },
        "cells": {
            "1": "選擇了 1 格資料",
            "_": "選擇了 %d 格資料"
        }
    },
    "zeroRecords": "沒有符合的資料",
    "aria": {
        "sortAscending": "：升冪排列",
        "sortDescending": "：降冪排列"
    },
    "info": "顯示第 _START_ 至 _END_ 筆結果，共 _TOTAL_ 筆",
    "infoEmpty": "顯示第 0 至 0 筆結果，共 0 筆",
    "infoFiltered": "(從 _MAX_ 筆結果中過濾)",
    "infoThousands": ",",
    "lengthMenu": "顯示 _MENU_ 筆結果",
    "search": "搜尋：",
    "searchPlaceholder": "請輸入關鍵字",
    "thousands": ","
};
}));
