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
    "emptyTable": "ไม่มีข้อมูลในตาราง",
    "info": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
    "infoFiltered": "(กรองข้อมูล _MAX_ ทุกแถว)",
    "infoThousands": ",",
    "lengthMenu": "แสดง _MENU_ แถว",
    "loadingRecords": "กำลังโหลดข้อมูล...",
    "processing": "กำลังดำเนินการ...",
    "zeroRecords": "ไม่พบข้อมูล",
    "paginate": {
        "first": "หน้าแรก",
        "previous": "ก่อนหน้า",
        "next": "ถัดไป",
        "last": "หน้าสุดท้าย"
    },
    "aria": {
        "sortAscending": ": เปิดใช้งานการเรียงข้อมูลจากน้อยไปมาก",
        "sortDescending": ": เปิดใช้งานการเรียงข้อมูลจากมากไปน้อย"
    },
    "autoFill": {
        "cancel": "ยกเลิก",
        "fill": "กรอกทุกช่องด้วย",
        "fillHorizontal": "กรอกตามแนวนอน",
        "fillVertical": "กรอกตามแนวตั้ง"
    },
    "buttons": {
        "collection": "ชุดข้อมูล",
        "colvis": "การมองเห็นคอลัมน์",
        "colvisRestore": "เรียกคืนการมองเห็น",
        "copy": "คัดลอก",
        "copyKeys": "กดปุ่ม Ctrl หรือ Command + C เพื่อคัดลอกข้อมูลบนตารางไปยัง Clipboard ที่เครื่องของคุณ",
        "copySuccess": {
            "_": "คัดลอกช้อมูลแล้ว จำนวน %ds แถว",
            "1": "คัดลอกข้อมูลแล้ว จำนวน 1 แถว"
        },
        "copyTitle": "คัดลอกไปยังคลิปบอร์ด",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "_": "แสดงข้อมูล %d แถว",
            "-1": "แสดงข้อมูลทั้งหมด"
        },
        "pdf": "PDF",
        "print": "สั่งพิมพ์",
        "createState": "สร้างสถานะ",
        "removeAllStates": "ลบสถานะทั้งหมด",
        "removeState": "ลบสถานะ",
        "renameState": "เปลี่ยนชื่อสถานะ",
        "savedStates": "บันทึกสถานะ",
        "stateRestore": "คืนค่าสถานะ",
        "updateState": "แก้ไขสถานะ"
    },
    "infoEmpty": "แสดงทั้งหมด 0 to 0 of 0 รายการ",
    "search": "ค้นหา :",
    "thousands": ",",
    "datetime": {
        "amPm": [
            "เที่ยงวัน",
            "เที่ยงคืน"
        ],
        "hours": "ชั่วโมง",
        "minutes": "นาที",
        "months": {
            "0": "มกราคม",
            "1": "กุมภาพันธ์",
            "10": "พฤศจิกายน",
            "11": "ธันวาคม",
            "2": "มีนาคม",
            "3": "เมษายน",
            "4": "พฤษภาคม",
            "5": "มิถุนายน",
            "6": "กรกฎาคม",
            "7": "สิงหาคม",
            "8": "กันยายน",
            "9": "ตุลาคม"
        },
        "next": "ถัดไป",
        "seconds": "วินาที",
        "unknown": "ไม่ทราบ",
        "weekdays": [
            "วันอาทิตย์",
            "วันจันทร์",
            "วันอังคาร",
            "วันพุธ",
            "วันพฤหัส",
            "วันศุกร์",
            "วันเสาร์"
        ],
        "previous": "ก่อนหน้า"
    },
    "decimal": "จุดทศนิยม",
    "editor": {
        "close": "ปิด",
        "create": {
            "button": "สร้าง",
            "submit": "สร้างข้อมูล",
            "title": "สร้างข้อมูลใหม่"
        },
        "edit": {
            "button": "แก้ไข",
            "submit": "บันทึก",
            "title": "แก้ไขข้อมูล"
        },
        "error": {
            "system": "เกิดข้อผิดพลาดของระบบ (&lt;a target=\"\\\" rel=\"nofollow\" href=\"\\\"&gt;ดูข้อมูลเพิ่มเติม)."
        },
        "remove": {
            "button": "ลบ",
            "submit": "ลบข้อมูล",
            "title": "ลบข้อมูล",
            "confirm": {
                "_": "คุณแน่ใจที่จะลบข้อมูล %d รายการนี้ หรือไม่?",
                "1": "คุณแน่ใจที่จะลบข้อมูลรายการนี้ หรือไม่?"
            }
        },
        "multi": {
            "restore": "ยกเลิกการแก้ไข",
            "title": "หลายค่า",
            "info": "รายการที่เลือกมีค่าที่แตกต่างกันสำหรับอินพุตนี้ หากต้องการแก้ไขและตั้งค่ารายการทั้งหมดสำหรับการป้อนข้อมูลนี้เป็นค่าเดียวกัน ให้คลิกหรือแตะที่นี่ มิฉะนั้น รายการเหล่านั้นจะคงค่าแต่ละรายการไว้",
            "noMulti": "อินพุตนี้สามารถแก้ไขทีละรายการได้ แต่ไม่สามารถแก้ไขเป็นส่วนหนึ่งของกลุ่มได้"
        }
    },
    "searchBuilder": {
        "add": "เพิ่มเงื่อนไข",
        "clearAll": "ยกเลิกทั้งหมด",
        "condition": "เงื่อนไข",
        "data": "ข้อมูล",
        "deleteTitle": "ลบเงื่อนไขการกรอง",
        "logicAnd": "และ",
        "logicOr": "หรือ",
        "button": {
            "0": "สร้างการค้นหา",
            "_": "ตัวสร้างการค้นหา (%d)"
        },
        "conditions": {
            "date": {
                "after": "ก่อน",
                "before": "ก่อน",
                "between": "ระหว่าง",
                "equals": "เท่ากับ",
                "not": "ไม่",
                "notEmpty": "ไม่ใช่ระหว่าง"
            },
            "number": {
                "between": "ระหว่าง",
                "equals": "เท่ากับ",
                "gt": "มากกว่า",
                "gte": "มากกว่าเท่ากับ",
                "lt": "น้อยกว่า",
                "lte": "น้อยกว่าเท่ากับ",
                "not": "ไม่",
                "notBetween": "ไม่ใช่ระหว่าง"
            },
            "string": {
                "contains": "ประกอบด้วย",
                "endsWith": "ลงท้ายด้วย",
                "equals": "เท่ากับ",
                "not": "ไม่",
                "startsWith": "เริ่มต้นด้วย",
                "notContains": "ไม่มี",
                "notStartsWith": "ไม่เริ่มต้นด้วย",
                "notEndsWith": "ไม่ลงท้ายด้วย"
            },
            "array": {
                "equals": "เท่ากับ",
                "contains": "เงื้อนไข",
                "not": "ไม่"
            }
        },
        "title": {
            "0": "สร้างการค้นหา",
            "_": "ตัวสร้างการค้นหา (%d)"
        },
        "value": "ค่า"
    },
    "select": {
        "cells": {
            "1": "เลือก 1 cell",
            "_": "เลือก %d cells"
        },
        "columns": {
            "1": "เลือก 1 column",
            "_": "เลือก %d columns"
        }
    },
    "stateRestore": {
        "duplicateError": "มีข้อมูลที่ใช้ชื่อนี้แล้ว",
        "emptyError": "ชื่อต้องไม่เป็นค่าว่าง",
        "emptyStates": "ไม่มีสถานะที่บันทึกไว้",
        "removeConfirm": "คุณแน่ใจหรือไม่ว่าต้องการลบ %s",
        "removeError": "ไม่สามารถลบสถานะ"
    }
};
}));
