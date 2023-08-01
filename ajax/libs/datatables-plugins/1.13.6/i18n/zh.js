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
    "search": "搜索:",
    "paginate": {
        "first": "首页",
        "previous": "上页",
        "next": "下页",
        "last": "末页"
    },
    "autoFill": {
        "cancel": "取消",
        "fill": "用 <i>%d<\/i> 填充所有单元格",
        "fillHorizontal": "水平填充单元格",
        "fillVertical": "垂直填充单元格"
    },
    "buttons": {
        "colvis": "列可见性",
        "copy": "复制",
        "copyTitle": "复制到剪贴板",
        "csv": "CSV",
        "excel": "Excel",
        "pdf": "PDF",
        "pageLength": {
            "-1": "显示所有行",
            "_": "显示 %d 行"
        },
        "print": "打印",
        "collection": "集合 <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "colvisRestore": "还原可见性",
        "copyKeys": "按 Ctrl 或 u2318 + C 键将表中数据复制到系统剪贴板。<br \/><br \/>要取消，请单击此消息或按 Escape 键。",
        "copySuccess": {
            "1": "已复制 1 行到剪贴板",
            "_": "已复制 %d 行到剪贴板"
        },
        "createState": "创建状态",
        "removeAllStates": "删除所有状态",
        "removeState": "删除",
        "renameState": "重命名",
        "savedStates": "保存的状态",
        "stateRestore": "状态 %d",
        "updateState": "更新"
    },
    "searchBuilder": {
        "button": {
            "0": "搜索生成器",
            "_": "搜索生成器 (%d)"
        },
        "clearAll": "全部清除",
        "condition": "条件",
        "data": "数据",
        "title": {
            "0": "搜索生成器",
            "_": "搜索生成器 (%d)"
        },
        "value": "值",
        "conditions": {
            "date": {
                "equals": "等于",
                "after": "早于",
                "before": "晚于",
                "between": "介于",
                "empty": "为空",
                "not": "非",
                "notBetween": "不介于",
                "notEmpty": "非空"
            },
            "number": {
                "between": "介于",
                "empty": "为空",
                "equals": "等于",
                "gt": "大于",
                "gte": "大于等于",
                "lt": "小于",
                "lte": "小于等于",
                "not": "非",
                "notBetween": "不介于",
                "notEmpty": "非空"
            },
            "string": {
                "contains": "含有",
                "empty": "为空",
                "endsWith": "结尾为",
                "equals": "等于",
                "not": "非",
                "notEmpty": "非空",
                "startsWith": "开头为",
                "notContains": "不含有",
                "notStartsWith": "开头不为",
                "notEndsWith": "结尾不为"
            },
            "array": {
                "equals": "等于",
                "empty": "为空",
                "contains": "吀�有",
                "not": "非",
                "notEmpty": "非空",
                "without": "无"
            }
        },
        "add": "添加条件",
        "deleteTitle": "删除筛选规则",
        "leftTitle": "组合条件",
        "logicAnd": "与",
        "logicOr": "或",
        "rightTitle": "取消组合"
    },
    "searchPanes": {
        "clearMessage": "全部清除",
        "collapse": {
            "0": "搜索面板",
            "_": "搜索面板 (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "没有搜索面板",
        "loadMessage": "正在加载搜索面板...",
        "title": "激活的筛选条件 - %d",
        "showMessage": "全部显示",
        "collapseMessage": "全部折叠"
    },
    "infoThousands": ",",
    "thousands": ",",
    "datetime": {
        "amPm": [
            "上午",
            "下午"
        ],
        "minutes": "分",
        "months": {
            "0": "1月",
            "1": "2月",
            "10": "11月",
            "11": "12月",
            "2": "3月",
            "3": "4月",
            "4": "5月",
            "5": "6月",
            "6": "7月",
            "7": "8月",
            "8": "9月",
            "9": "10月"
        },
        "seconds": "秒",
        "previous": "上月",
        "next": "下月",
        "hours": "时",
        "unknown": "-",
        "weekdays": [
            "日",
            "一",
            "二",
            "三",
            "四",
            "五",
            "六"
        ]
    },
    "editor": {
        "close": "关闭",
        "create": {
            "button": "新建",
            "submit": "创建",
            "title": "创建新记录"
        },
        "edit": {
            "button": "编辑",
            "submit": "更新",
            "title": "编辑记录"
        },
        "multi": {
            "restore": "撤销更改",
            "title": "多个值",
            "noMulti": "此字段可以单独编辑，不可以组合编辑。",
            "info": "选择的多条记录的此字段含有不同的值。要编辑并将所有记录的此字段都设为相同的值，请单击或点按这里，否则它们会保持各自的值不变。"
        },
        "remove": {
            "button": "删除",
            "submit": "删除",
            "title": "删除",
            "confirm": {
                "_": "确定要删除 %d 行？",
                "1": "确定要删除 1 行？"
            }
        },
        "error": {
            "system": "出现了系统错误 (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">更多信息&lt;\\\/a&gt;)。<\/a>"
        }
    },
    "loadingRecords": "正在加载...",
    "processing": "正在处理...",
    "aria": {
        "sortAscending": ": 激活以升序排序此列",
        "sortDescending": ": 激活以降序排序此列"
    },
    "decimal": ".",
    "emptyTable": "表中没有数据",
    "select": {
        "cells": {
            "1": "已选择 1 个单元格",
            "_": "已选择 %d 个单元格"
        },
        "columns": {
            "1": "已选择 1 列",
            "_": "已选择 %d 列"
        },
        "rows": {
            "1": "已选择 1 行",
            "_": "已选择 %d 行"
        }
    },
    "zeroRecords": "没有找到匹配的记录",
    "stateRestore": {
        "creationModal": {
            "button": "创建",
            "columns": {
                "search": "列搜索",
                "visible": "列可见性"
            },
            "name": "名称:",
            "order": "排序",
            "paging": "分页",
            "search": "搜索",
            "searchBuilder": "搜索生成器",
            "select": "选择",
            "title": "创建新状态",
            "toggleLabel": "包括:",
            "scroller": "滚动定位"
        },
        "duplicateError": "已存在使用此名称的状态。",
        "emptyError": "名称不能为空。",
        "emptyStates": "没有俀�存的状态",
        "removeConfirm": "确定要删除 %s？",
        "removeError": "删除状态失败。",
        "removeJoiner": "和",
        "removeSubmit": "删除",
        "removeTitle": "删除状态",
        "renameButton": "重命名",
        "renameLabel": "%s 的新名称:",
        "renameTitle": "重命名状态"
    },
    "info": "正在显示第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
    "infoEmpty": "正在显示第 0 至 0 条记录，共 0 条",
    "infoFiltered": "(筛选自全部 _MAX_ 条记录)",
    "lengthMenu": "显示 _MENU_ 条记录"
};
}));
