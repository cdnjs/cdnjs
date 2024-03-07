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
    "emptyTable": "데이터가 없습니다",
    "info": "_START_ - _END_ \/ _TOTAL_",
    "infoEmpty": "0 - 0 \/ 0",
    "infoFiltered": "(총 _MAX_ 개)",
    "infoThousands": ",",
    "lengthMenu": "페이지당 줄수 _MENU_",
    "loadingRecords": "읽는중...",
    "processing": "처리중...",
    "search": "검색:",
    "zeroRecords": "검색 결과가 없습니다",
    "paginate": {
        "first": "처음",
        "last": "마지막",
        "next": "다음",
        "previous": "이전"
    },
    "aria": {
        "sortAscending": ": 오름차순 정렬",
        "sortDescending": ": 내림차순 정렬"
    },
    "buttons": {
        "copyKeys": "ctrl키 나 u2318 + C키로 테이블 데이터를 시스텝 복사판에서 복사하고 취소하려면 이 메시지를 클릭하거나 ESC키를 누르면됩니다. to copy the table data to your system clipboard. To cancel, click this message or press escape.",
        "copySuccess": {
            "_": "%d행을 복사판에서 복사됨",
            "1": "1행을 복사판에서 복사됨"
        },
        "copyTitle": "복사판에서 복사",
        "csv": "CSV",
        "pageLength": {
            "-1": "모든 행 보기",
            "_": "%d행 보기"
        },
        "pdf": "PDF",
        "print": "인쇄",
        "collection": "집합 <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "colvis": "컬럼 보기",
        "colvisRestore": "보기 복원",
        "copy": "복사",
        "excel": "엑셀"
    },
    "searchBuilder": {
        "add": "조건 추가",
        "button": {
            "0": "빌더 조회",
            "_": "빌더 조회(%d)"
        },
        "clearAll": "모두 지우기",
        "condition": "조건",
        "data": "데이터",
        "deleteTitle": "필터 규칙을 삭제",
        "logicAnd": "And",
        "logicOr": "Or",
        "title": {
            "0": "빌더 조회",
            "_": "빌더 조회(%d)"
        },
        "value": "값"
    },
    "autoFill": {
        "cancel": "취소",
        "fill": "모든 셀에서 <i>%d<i>을(를) 삽입<\/i><\/i>",
        "fillHorizontal": "수평 셀에서 값을 삽입",
        "fillVertical": "수직 설에서 값을 삽입"
    },
    "datetime": {
        "previous": "이전",
        "next": "다음",
        "hours": "시",
        "minutes": "분",
        "seconds": "초",
        "unknown": "-",
        "amPm": [
            "오전",
            "오후"
        ],
        "weekdays": [
            "일",
            "월",
            "화",
            "수",
            "목",
            "금",
            "토"
        ],
        "months": [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월"
        ]
    },
    "editor": {
        "close": "닫기",
        "create": {
            "button": "추가",
            "title": "항목 추가",
            "submit": "완료"
        },
        "edit": {
            "button": "수정",
            "title": "항목 수정",
            "submit": "완료"
        },
        "remove": {
            "button": "삭제",
            "title": "항목 삭제",
            "submit": "완료"
        },
        "error": {
            "system": "에러가 발생하였습니다 (&lt;a target=\"\\\" rel=\"nofollow\" href=\"\\\"&gt;자세한 정보&lt;\/a&gt;)."
        }
    }
};
}));
