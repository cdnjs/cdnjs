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
    "processing": "প্রসেসিং হচ্ছে...",
    "lengthMenu": "_MENU_ টা এন্ট্রি দেখাও",
    "zeroRecords": "আপনি যা অনুসন্ধান করেছেন তার সাথে মিলে যাওয়া কোন রেকর্ড খুঁজে পাওয়া যায় নাই",
    "info": "_TOTAL_ টা এন্ট্রির মধ্যে _START_ থেকে _END_ পর্যন্ত দেখানো হচ্ছে",
    "infoEmpty": "কোন এন্ট্রি খুঁজে পাওয়া যায় নাই",
    "infoFiltered": "(মোট _MAX_ টা এন্ট্রির মধ্যে থেকে বাছাইকৃত)",
    "search": "অনুসন্ধান:",
    "paginate": {
        "first": "প্রথমটা",
        "previous": "আগেরটা",
        "next": "পরবর্তীটা",
        "last": "শেষেরটা"
    },
    "autoFill": {
        "cancel": "বাতিল করা",
        "fill": "<i>%d<\/i> দিয়ে সমস্ত ঘর পূরণ করুন",
        "fillHorizontal": "অনুভূমিকভাবে কোষগুলি পূরণ করুন",
        "fillVertical": "উল্লম্বভাবে কক্ষগুলি পূরণ করুন"
    },
    "aria": {
        "sortAscending": ":ঊর্ধ্বক্রম অনুসারে কলাম সাজাতে সক্রিয় করুন",
        "sortDescending": ":নিন্মক্রম অনুসারে কলাম সাজাতে সক্রিয় করুন"
    },
    "buttons": {
        "collection": "সংগ্রহ <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "colvis": "কলাম দৃশ্যমানতা",
        "colvisRestore": "দৃশ্যমানতা পুনরুদ্ধার করুন",
        "copy": "অনুলিপি",
        "copySuccess": {
            "_": "ক্লিপবোর্ডে %d সারি কপি করা হয়েছে",
            "1": "ক্লিপবোর্ডে ১টি সারি কপি করা হয়েছে"
        },
        "copyTitle": "ক্লিপবোর্ডে কপি করুন",
        "excel": "এক্সেল",
        "pageLength": {
            "_": "%d সারি দেখান",
            "-1": "সমস্ত সারি দেখান"
        },
        "pdf": "পিডিএফ",
        "print": "মুদ্রণ",
        "removeState": "অপসারণ করা",
        "renameState": "নাম পরিবর্তন করুন",
        "copyKeys": "টেবিলের তথ্য সিস্টেম ক্লিপবোর্ডে কপি করতে <i>ctrl<\/i> অথবা <i>u2318<\/i> + <i>C<\/i> চাপুন।<br \/><br \/>বাদ দিতে চাইলে, এই মেসেজে ক্লিক করুন বা এসকেপ চাপুন।",
        "csv": "সিএসভি",
        "createState": "স্টেট তৈরি",
        "removeAllStates": "সব স্টেটগুলো অপসারণ",
        "savedStates": "সেভ করা স্টেটগুলো",
        "stateRestore": "স্টেট %d",
        "updateState": "আপডেট"
    },
    "datetime": {
        "amPm": [
            "মধ্য রাতের পর",
            "মধ্যাহ্নের মধ্যবর্তিকালীন"
        ],
        "hours": "ঘন্টা",
        "minutes": "মিনিট",
        "months": {
            "0": "জানুয়ারি",
            "1": "ফেব্রুয়ারী",
            "10": "নভেম্বর",
            "11": "ডিসেম্বর",
            "2": "মার্চ",
            "3": "এপ্রিল",
            "4": "মে",
            "5": "জুন",
            "6": "জুলাই",
            "7": "আগষ্ট",
            "8": "সেপ্টেম্বর",
            "9": "অক্টোবর"
        },
        "next": "পরবর্তী",
        "previous": "আগে",
        "seconds": "সেকেন্ড",
        "weekdays": [
            "রবিবার",
            "সোমবার",
            "মঙ্গলবার",
            "বুধবার",
            "বৃহস্পতিবার",
            "শুক্রবার",
            "শনিবার"
        ],
        "unknown": "অজানা"
    },
    "editor": {
        "create": {
            "button": "নতুন",
            "submit": "সৃষ্টি করা",
            "title": "নতুন এন্ট্রি তৈরি করুন"
        },
        "edit": {
            "button": "সম্পাদনা করুন",
            "title": "এন্ট্রি সম্পাদনা",
            "submit": "আপডেট"
        },
        "error": {
            "system": "একটি সিস্টেম ত্রুটি ঘটেছে (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">অধিক তথ্য<\/a>)."
        },
        "multi": {
            "info": "নির্বাচিত আইটেম এই ইনপুট জন্য বিভিন্ন মান আছে. এই ইনপুটের জন্য সমস্ত আইটেমকে একই মান সম্পাদনা করতে এবং সেট করতে, এখানে ক্লিক করুন বা আলতো চাপুন, অন্যথায় তারা তাদের পৃথক মান বজায় রাখবে।",
            "noMulti": "এই ইনপুটটি পৃথকভাবে সম্পাদনা করা যেতে পারে, তবে একটি গোষ্ঠীর অংশ হিসাবে নয়৷ ",
            "restore": "পরিবর্তন পূর্বাবস্থায় ফেরান",
            "title": "একাধিক মান"
        },
        "remove": {
            "confirm": {
                "_": "আপনি কি নিশ্চিত যে আপনি %d সারি মুছে ফেলতে চান?",
                "1": "আপনি কি নিশ্চিত যে আপনি 1টি সারি মুছে ফেলতে চান?"
            },
            "button": "মুছে ফেলা",
            "submit": "মুছে ফেলা",
            "title": "মুছে ফেলা"
        },
        "close": "বন্ধ করুন"
    },
    "stateRestore": {
        "creationModal": {
            "button": "সৃষ্টি",
            "columns": {
                "search": "কলাম অনুসন্ধান",
                "visible": "কলাম দৃশ্যমানতা"
            },
            "name": "নাম",
            "paging": "পেজিং",
            "scroller": "স্ক্রোল অবস্থান",
            "search": "অনুসন্ধান করুন",
            "searchBuilder": "সার্চ বিল্ডার",
            "select": "নির্বাচন করুন",
            "title": "নতুন স্টেট তৈরি করুন",
            "toggleLabel": "অন্তর্ভুক্ত: ",
            "order": "সাজানো"
        },
        "duplicateError": "এই নামের একটি স্টেট ইতিমধ্যেই বিদ্যমান৷",
        "emptyError": "নাম খালি রাখা যাবে না।",
        "emptyStates": "কোন সংরক্ষিত স্টেট",
        "removeConfirm": "আপনি নিশ্চিত ভাবে সরাতে চান হয় %s?",
        "removeError": "স্টেট সরাতে ব্যর্থ হয়েছে৷",
        "removeJoiner": "এবং",
        "removeSubmit": "অপসারণ",
        "renameButton": "নাম পরিবর্তন করুন",
        "renameLabel": "নতুন নাম এর জন্য %s:",
        "renameTitle": "রাজ্যের নাম পরিবর্তন করুন",
        "removeTitle": "স্টেট মুছুন"
    },
    "thousands": ",",
    "emptyTable": "খালি টেবিল",
    "searchBuilder": {
        "clearAll": "সব মুছে ফেলুন",
        "data": "ডাটা",
        "add": "নতুন শর্ত",
        "button": {
            "0": "অনুসন্ধান বিল্ডার",
            "_": "অনুসন্ধান বিল্ডার (%d)"
        },
        "condition": "শর্ত",
        "conditions": {
            "date": {
                "after": "পরে",
                "before": "আগে",
                "between": "মধ্যে",
                "empty": "খালি",
                "equals": "সমান",
                "not": "নয়",
                "notBetween": "মধ্যে নয়",
                "notEmpty": "খালি নয়"
            },
            "number": {
                "between": "মধ্যে",
                "empty": "খালি",
                "equals": "সমান",
                "gt": "বৃহত্তর",
                "gte": "বৃহত্তর বা সমান",
                "lt": "ক্ষুদ্রতর",
                "lte": "ক্ষুদ্রতর বা সমান",
                "not": "নয়",
                "notBetween": "মধ্যে নয়",
                "notEmpty": "খালি নয়"
            },
            "string": {
                "contains": "বিদ্যমান",
                "empty": "খালি",
                "endsWith": "শেষ হয়",
                "equals": "সমান",
                "not": "নয়",
                "notEmpty": "খালি নয়",
                "startsWith": "শুরু হয়",
                "notContains": "বিদ্যমান নয়",
                "notStartsWith": "শুরু হয় না",
                "notEndsWith": "শেষ হয় না"
            },
            "array": {
                "equals": "সমান",
                "empty": "খালি",
                "contains": "বিদ্যমান",
                "not": "নয়",
                "notEmpty": "খালি নয়",
                "without": "ছাড়া"
            }
        },
        "deleteTitle": "ফিল্টারের নিয়ম অপসারণ",
        "leftTitle": "বাইরের মানদন্ড",
        "logicAnd": "এবং",
        "logicOr": "অথবা",
        "rightTitle": "ভেতরের মানদন্ড",
        "title": {
            "0": "অনুসন্ধান বিল্ডার",
            "_": "অনুসন্ধান বিল্ডার (%d)"
        },
        "value": "ফলাফল"
    },
    "loadingRecords": "লোডিং হচ্ছে...",
    "searchPanes": {
        "clearMessage": "সব মুছুন",
        "collapse": {
            "0": "সার্চপেনসমূহ",
            "_": "সার্চপেন (%d)"
        },
        "emptyPanes": "কোনো সার্চপেন নেই",
        "loadMessage": "সার্চপেন লোড হচ্ছে...",
        "title": "চলমান ফিল্টার - %d",
        "showMessage": "সবগুলো দেখান",
        "collapseMessage": "সবগুলো বন্ধ করুন"
    },
    "select": {
        "cells": {
            "1": "১টি সেল সিলেক্ট হয়েছে",
            "_": "%dটি সেল সিলেক্ট হয়েছে"
        },
        "columns": {
            "1": "১টি কলাম সিলেক্ট হয়েছে",
            "_": "%dটি কলাম সিলেক্ট হয়েছে"
        }
    }
};
}));
