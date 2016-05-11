/**
 * Korean translation for bootstrap-wysihtml5
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('bootstrap.wysihtml5.ko-KR', ['jquery', 'bootstrap.wysihtml5'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($){
    $.fn.wysihtml5.locale["ko-KR"] = {
        font_styles: {
            normal: "일반",
            h1: "헤드라인 1",
            h2: "헤드라인 2",
            h3: "헤드라인 3"
        },
        emphasis: {
            bold: "굵게",
            italic: "기울게",
            underline: "밑줄"
        },
        lists: {
            unordered: "기호목록",
            ordered: "숫자목록",
            outdent: "내어쓰기",
            indent: "들여쓰기"
        },
        link: {
            insert: "링크 삽입",
            cancel: "취소"
        },
        image: {
            insert: "이미지 삽입",
            cancel: "취소"
        },
        html: {
            edit: "HTML 편집"
        },
        colours: {
            black: "검은색",
            silver: "은색",
            gray: "회색",
            maroon: "고동색",
            red: "빨간색",
            purple: "보라색",
            green: "초록색",
            olive: "올리브",
            navy: "네이비",
            blue: "파란색",
            orange: "주황색"
        }

    };
}));
