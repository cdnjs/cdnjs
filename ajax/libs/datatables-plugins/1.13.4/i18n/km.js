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
    "emptyTable": "មិនមានទិន្នន័យក្នុងតារាងនេះទេ",
    "loadingRecords": "កំពុងផ្ទុក...",
    "processing": "កំពុងដំណើរការ...",
    "search": "ស្វែងរក:",
    "zeroRecords": "មិនមានទិន្នន័យត្រូវតាមលក្ខខណ្ឌស្វែងរកទេ",
    "paginate": {
        "first": "ដំបូងគេ",
        "last": "ចុងក្រោយ",
        "next": "បន្ទាប់",
        "previous": "ក្រោយ"
    },
    "aria": {
        "sortAscending": ": ចុចដើម្បីរៀបជួរឈរនេះតាមលំដាប់ឡើង",
        "sortDescending": ": ចុចដើម្បីរៀបជួរឈរនេះតាមលំដាប់ចុះ"
    },
    "datetime": {
        "hours": "ម៉ោង",
        "minutes": "នាទី",
        "months": {
            "0": "មករា",
            "1": "កុម្ភៈ",
            "11": "ធ្នូ",
            "2": "មិនា",
            "3": "មេសា",
            "4": "ឧសភា",
            "5": "មិថុនា",
            "6": "កក្កដា",
            "7": "សីហា",
            "9": "តុលា",
            "8": "កញ្ញា",
            "10": "វិច្ឆិកា"
        },
        "next": "បន្ទាប់",
        "seconds": "វិនាទី",
        "unknown": "មិក�ដឹង",
        "weekdays": {
            "0": "អាទិត្យ",
            "2": "អង្គារ",
            "3": "ពុធ",
            "4": "ព្រហស្បតិ៍",
            "5": "សុក្រ",
            "6": "សៅរ៍",
            "1": "ច័ន្ទ"
        },
        "previous": "មុន",
        "amPm": [
            "ព្រឹក",
            "ល្ងាច"
        ]
    },
    "editor": {
        "close": "បិទ",
        "create": {
            "button": "ថ្មី",
            "submit": "បង្កើត",
            "title": "បង្កើតព័ត៌មានថ្មី"
        },
        "remove": {
            "button": "លុប",
            "confirm": {
                "_": "តើអ្នកនឹងលុបរូបជួរ %d​ នេះ?",
                "1": "តើអ្នកនឹងលុបរូបជួរ​ 1 នេះ?"
            },
            "submit": "លុប",
            "title": "ធ្វើការលុប"
        },
        "edit": {
            "title": "កែព័ត៍មាន",
            "button": "កែសម្រួល",
            "submit": "ធ្វើបច្ចុប្បន្នភាព"
        },
        "multi": {
            "title": "ព័ត៌មានជាច្រើន",
            "info": "ធាតុដែលបានជ្រើសរើសមានព័ត៌មានខុសៗគ្នាសម្រាប់ប្រអប់ទិន្នន័យនេះ។ ដើម្បីកែ និងកំណត់ទិន្នន័យសម្រាប់ប្រអប់នេះឲ្យដូចៗគ្នា សូមចុចទីនេះ។ បើមិនដូច្នេះទេ ប្រអប់ទិន្នន័យនេះនឹងមិនកែប្រែទេ។",
            "restore": "មិនកែវិញ",
            "noMulti": "ប្រអប់នេះអាចកែប្រែដោយឡែកពីគ្នា ប៉ុន្តែមិនមែនជាផ្នែកមួយក្នុងក្រុមទេ។"
        },
        "error": {
            "system": "កំហុសប្រព័ន្ធ system បានកើតឡើង (<a target=\"\\\" rel=\"nofollow\" href=\"\\\">ព័ត៌មានបន្ថែម<\/a>)."
        }
    },
    "autoFill": {
        "cancel": "បោះបង់",
        "fill": "បំពេញប្រអប់ទាំងអស់ដោយ &lt;i&gt;%d&lt;i&gt;&lt;\/i&gt;&lt;\/i&gt;",
        "fillHorizontal": "បំពេញប្រអប់ជួរដេក",
        "fillVertical": "បំពេញប្រអប់ជួរឈរ",
        "info": "&lt;i&gt;Empty string&lt;\/i&gt;"
    },
    "buttons": {
        "collection": "កម្រង &lt;span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"&gt;&lt;\/span&gt;",
        "colvis": "បង្ហាញ\/លាក់ជួរឈរ",
        "colvisRestore": "កំណត់កក�របង្ហាញជួរឈរឡើងវិញ",
        "copyKeys": "ចុច &lt;i&gt;ctrl&lt;\/i&gt; ឬ &lt;i&gt;u2318&lt;\/i&gt; + &lt;i&gt;C&lt;\/i&gt; ដើម្បីចម្លងទិន្នន័យទៅកាន់ក្តារខ្ទាស់របស់អ្នក។ &lt;br&gt;&lt;br&gt;ដើម្បីបោះបង់ ចុចសារនេះ ឬចុច Esc។",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "1": "បង្ក�ាញជួរដេកមួយ",
            "-1": "បង្ហាញទាំងអស់ជួរ",
            "_": "បង្ហាញ %d ជួរ"
        },
        "pdf": "PDF",
        "print": "បោះពុម្ព",
        "createState": "បង្កើតសភាព",
        "removeAllStates": "លុបសភាពទាំងអស់",
        "removeState": "លុប",
        "renameState": "ដូរឈ្មោះ",
        "savedStates": "សភាពដែលបានរក�្សាទុក",
        "stateRestore": "សភាព %d",
        "updateState": "ធ្វើបច្ចុប្បន្នភាព",
        "copy": "ចំលង",
        "copySuccess": {
            "1": "បានចំលង 1 ជួរទៅកាន់ clipboard",
            "_": "បានចំលង %ds ជួរទៅកាន់ clipboard"
        },
        "copyTitle": "ចំលងទៅកាន់ Clipboard"
    },
    "decimal": "&lt;i&gt;Empty string&lt;\/i&gt;",
    "info": "កំពុងបង្ហាញ _START_ ទៅ  _END_ នៃ _TOTAL_ ទិន្នន័យ",
    "infoEmpty": "កំពុងបង្ហាញ 0 ទៅ 0 នៃទិន្នន័យ 0",
    "infoFiltered": "ចម្រាញ់ពីទិន្នន័យសរុប​ _MAX_ ",
    "infoPostFix": "&lt;i&gt;Empty string&lt;\/i&gt;",
    "infoThousands": ".",
    "lengthMenu": "បង្ហាញទិន្នន័យ _MENU_ ",
    "searchBuilder": {
        "button": {
            "0": "បង្កើតការស្វែងរក",
            "_": "បង្កើតការស្វែងរក (%d)"
        },
        "condition": "លក្ខខណ្ឌ",
        "conditions": {
            "date": {
                "after": "បន្ទាប់ពី",
                "before": "បន្ទាប់ពី",
                "between": "នៅចន្លោះ",
                "empty": "ទទេ",
                "equals": "ស្មើ",
                "not": "មិនមែនជា",
                "notBetween": "មិននៅចន្លោះ",
                "notEmpty": "មិនទទេ"
            },
            "number": {
                "between": "នៅចន្លោះ",
                "empty": "ទទេ",
                "equals": "ស្មើ",
                "gt": "ធំជាង",
                "gte": "ធំជាងឬស្មើ",
                "lt": "តិចជាង",
                "lte": "តិចជាងឬស្មើ",
                "not": "មិនមែនជា",
                "notBetween": "មិននៅចន្លោះ",
                "notEmpty": "មិនទទេ"
            },
            "string": {
                "contains": "មាន",
                "empty": "ទទេ",
                "endsWith": "បញ្ចប់ដោយ",
                "equals": "ស្មើនឹង",
                "not": "មិនមែនជា",
                "notEmpty": "មិនទទេ",
                "startsWith": "ចាប់ផ្តើមដោយ",
                "notContains": "មិនមាន",
                "notStartsWith": "មិនចាប់ផ្តើមដោយ",
                "notEndsWith": "មិនបញ្ចប់ដោយ"
            },
            "array": {
                "equals": "ស្មើនឹង",
                "empty": "ទទេ",
                "contains": "មាន",
                "not": "មិនមែនជា",
                "notEmpty": "មិនក�ទេ",
                "without": "មិនមាន"
            }
        },
        "data": "ទិន្នន័យ",
        "deleteTitle": "លុបលក្ខខណ្ឌសម្រាប់ចម្រាញ់",
        "leftTitle": "ទាញលក្ខខណ្ឌទៅក្រោយ",
        "logicAnd": "និង",
        "logicOr": "ឬ",
        "rightTitle": "រុញលក្ខខណ្ឌទៅមុខ",
        "title": {
            "0": "បង្កើតការស្វែងរក",
            "_": "បង្កើតការស្វែងរក (%d)"
        },
        "value": "តម្លៃ",
        "add": "បន្ថែម លក្ខខណ្ឌ",
        "clearAll": "សម្អាតទាំងអស់"
    },
    "searchPanes": {
        "collapse": {
            "0": "ផ្ទាំងស្វែងរក",
            "_": "ផ្ទាំងស្វែងរក (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "មិនមានផ្ទាំងស្វែងរក",
        "loadMessage": "កំពុងផ្ទុកផ្ទាំងស្វែងរក",
        "title": "ការចម្រាញ់ដែលសកម្ម - %d",
        "showMessage": "បង្ហាញទាំងអស់",
        "collapseMessage": "លាក់ទាំងអស់",
        "clearMessage": "សម្អាតទាំងអស់"
    },
    "searchPlaceholder": "&lt;i&gt;Empty string&lt;\/i&gt;",
    "select": {
        "cells": {
            "1": "ប្រអប់មួយត្រូវបានជ្រើសរើស",
            "_": "ប្រអប់ %d ត្រូវបានជ្រើសរើស "
        },
        "columns": {
            "1": "ជួរឈរមួយត្រូវបានជ្រើសរើស",
            "_": "ជួរឈរ %d ត្រូវបានជ្រើសរើស "
        },
        "rows": {
            "1": "ជួរក�េកមួយត្រូវបានជ្រើសរើស",
            "_": "ជួរដេក %d ត្រូវបានជ្រើសរើស "
        }
    },
    "thousands": ".",
    "stateRestore": {
        "creationModal": {
            "button": "បង្កើត",
            "columns": {
                "search": "ស្វែងរកជួរ",
                "visible": "ការបង្ហាញ\/លាក"
            },
            "name": "ឈ្មោះ:",
            "order": "រៀបលំដាប់",
            "paging": "បែងចែកទំព័រ",
            "scroller": "អូស",
            "search": "ស្វែងរក",
            "searchBuilder": "បង្កើតការស្វែងរក",
            "select": "ជ្រើសរើស",
            "title": "បង្កើតសភាពថ្មី",
            "toggleLabel": "រួមមាន៖"
        },
        "duplicateError": "សភាពដែលមានឈ្មោៀ�ដូចនេះមានហើយ",
        "emptyError": "ឈ្មោះមិនអាចទទេទេ។",
        "emptyStates": "មិនមានសភាពដែលបានរក្សាទុកទេ",
        "removeConfirm": "តើអ្នកពិតជាចង់លុប %s មែនទេ?",
        "removeError": "មិនអាចលុបសភាពបានទេ។",
        "removeJoiner": "និង",
        "removeSubmit": "លុបចេញ",
        "removeTitle": "លុបសភាព",
        "renameButton": "ដូរ",
        "renameLabel": "ឈ្មោះថ្មីសម្រាប់ %s:",
        "renameTitle": "ប្តូរឈ្មោះសភាព"
    }
};
}));
