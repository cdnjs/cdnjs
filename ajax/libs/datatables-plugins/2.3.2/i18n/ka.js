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
    "emptyTable": "ცხრილში არ არის მონაცემები",
    "info": "ნაჩვენებია ჩანაწერები _START_–დან _END_–მდე, _TOTAL_ ჩანაწერიდან",
    "infoEmpty": "ნაჩვენებია ჩანაწერები 0–დან 0–მდე, 0 ჩანაწერიდან",
    "infoFiltered": "(გაფილტრული შედეგი _MAX_ ჩანაწერიდან)",
    "lengthMenu": "აჩვენე _MENU_ ჩანაწერი",
    "loadingRecords": "იტვირთება...",
    "processing": "მუშავდება...",
    "search": "ძიება:",
    "zeroRecords": "არაფერი მოიძებნა",
    "paginate": {
        "first": "პირველი",
        "last": "ბოლო",
        "next": "შემდეგი",
        "previous": "წინა"
    },
    "aria": {
        "sortAscending": ": სვეტის დალაგება ზრდის მიხედვით",
        "sortDescending": ": სვეტის დალაგება კლების მიხედვით"
    },
    "autoFill": {
        "cancel": "გაუქმება",
        "fillHorizontal": "შეავსე სექციები ჰორიზონტალურად",
        "fillVertical": "შეავსე სექციები ვერტიკალურად"
    },
    "buttons": {
        "collection": "კოლექცია",
        "colvis": "სვეტის ხილვადობა",
        "colvisRestore": "აღადგინე ხილვადობა",
        "copy": "კოპირება",
        "csv": "CSV",
        "excel": "Excel",
        "pdf": "PDF",
        "print": "ამობეჭდვა",
        "pageLength": {
            "_": "მაჩვენე %d რიგი",
            "-1": "მაჩვენე ყველა რიგი"
        }
    },
    "editor": {
        "close": "გამორთვა",
        "create": {
            "button": "ახალი",
            "submit": "შექმნა",
            "title": "შექმენი ახალი ჩანაწერი"
        },
        "edit": {
            "button": "რედაქტირება",
            "submit": "განახლება",
            "title": "ჩანაწერის რედაქტირება"
        },
        "remove": {
            "button": "წაშლა",
            "submit": "წაშლა",
            "title": "წაშლა",
            "confirm": {
                "_": "ნამდვილად გსურთ %d რიგის წაშლა?",
                "1": "ნამდვილად გსურთ 1 რიგის წაშლა?"
            }
        },
        "multi": {
            "noMulti": "ეს ველი შეიძლება დარედაქტირდეს ინდივიდუალურად, მაგრამ არა როგორც ჯგუფი.",
            "restore": "ცვლილებების დაბრუნება",
            "title": "რამდენიმე ღირებულება"
        }
    },
    "searchPlaceholder": "ძიება...",
    "datetime": {
        "hours": "საათი",
        "minutes": "წუთი",
        "months": {
            "0": "იანვარი",
            "1": "თებერვალი",
            "10": "ნოემბერი",
            "11": "დეკემბერი",
            "2": "მარტი",
            "3": "აპრილი",
            "4": "მაისი",
            "5": "ივნისი",
            "6": "ივლისი",
            "7": "აგვისტო",
            "8": "სექტემბერი",
            "9": "ოქტომბერი"
        },
        "next": "შემდეგი",
        "previous": "წინა",
        "seconds": "წამი",
        "weekdays": [
            "კვი",
            "ორშ",
            "სამ",
            "ოთხ",
            "ხუთ",
            "პარ",
            "შაბ"
        ],
        "amPm": [
            "AM",
            "PM"
        ],
        "unknown": "უცნობი"
    },
    "infoThousands": ",",
    "searchBuilder": {
        "add": "მდგომარეობის დამატება",
        "clearAll": "გასუფთავება",
        "condition": "მდგომარეობა",
        "conditions": {
            "array": {
                "contains": "შეიცავს",
                "empty": "ცარიელი",
                "equals": "უდრის",
                "not": "არა",
                "notEmpty": "არაა ცარიელი",
                "without": "გარეშე"
            },
            "date": {
                "after": "შემდეგ",
                "before": "შემდეგ",
                "between": "შორის",
                "empty": "ცარიელი",
                "equals": "უდრის",
                "not": "არა",
                "notEmpty": "არაა ცარიელი",
                "notBetween": "არა შორის"
            },
            "number": {
                "between": "შორის",
                "empty": "ცარიელი",
                "equals": "უდრის",
                "gt": "მეტია ვიდრე",
                "lt": "ნაკლები ვიდრე",
                "not": "არა",
                "notEmpty": "არაა ცარიელი",
                "gte": "მეტი ვიდრე ტოლია",
                "lte": "ნაკლები ვიდრე ტოლია",
                "notBetween": "არა შორის"
            },
            "string": {
                "contains": "შეიცავს",
                "empty": "ცარიელი",
                "endsWith": "სრულდება",
                "equals": "უდრის",
                "not": "არა",
                "notEmpty": "არაა ცარიელი",
                "startsWith": "იწყება"
            }
        },
        "data": "მონაცემები",
        "logicAnd": "და",
        "logicOr": "ან",
        "value": "ღირებულება",
        "button": {
            "_": "ძიების კონსტრუქტორი (%d)",
            "0": "ძიების კონსტრუქტორი"
        },
        "rightTitle": "მოთხოვნის კრიტერია",
        "title": {
            "_": "ძიების კონსტრუქტორი (%d)",
            "0": "ძიების კონსტრუქტორი"
        }
    },
    "searchPanes": {
        "clearMessage": "გასუფთავება",
        "title": "აქტიური ფილტრები - %d",
        "collapse": {
            "_": "ძიების პანელი (%d)",
            "0": "ძიების პანელი"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "ძიების პანელი ცარიელია",
        "loadMessage": "იტვირთება ძიების პანელი..."
    },
    "select": {
        "cells": {
            "_": "მონიშნულია %d უჯრა",
            "1": "მონიშნულია 1 უჯრა"
        },
        "columns": {
            "_": "მონიშნულია %d სვეტი",
            "1": "მონიშნულია 1 სვეტი"
        }
    },
    "decimal": ".",
    "thousands": ","
};
}));
