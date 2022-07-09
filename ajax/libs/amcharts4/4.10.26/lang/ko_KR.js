/**
 * amCharts 4 locale
 *
 * Locale: ko_KR
 * Language: Korean
 * Author: Bjorn Svensson, Taek-In Jeong
 *
 * Follow instructions in [on this page](https://www.amcharts.com/docs/v4/tutorials/creating-translations/) to make corrections or add new translations.
 */
export default {
    // Number formatting options.
    //
    // Please check with the local standards which separator is accepted to be
    // used for separating decimals, and which for thousands.
    "_decimalSeparator": ".",
    "_thousandSeparator": ",",
    // Suffixes for numbers
    // When formatting numbers, big or small numers might be reformatted to
    // shorter version, by applying a suffix.
    //
    // For example, 1000000 might become "1m".
    // Or 1024 might become "1KB" if we're formatting byte numbers.
    //
    // This section defines such suffixes for all such cases.
    "_big_number_suffix_3": "k",
    "_big_number_suffix_6": "M",
    "_big_number_suffix_9": "G",
    "_big_number_suffix_12": "T",
    "_big_number_suffix_15": "P",
    "_big_number_suffix_18": "E",
    "_big_number_suffix_21": "Z",
    "_big_number_suffix_24": "Y",
    "_small_number_suffix_3": "m",
    "_small_number_suffix_6": "μ",
    "_small_number_suffix_9": "n",
    "_small_number_suffix_12": "p",
    "_small_number_suffix_15": "f",
    "_small_number_suffix_18": "a",
    "_small_number_suffix_21": "z",
    "_small_number_suffix_24": "y",
    "_byte_suffix_B": "B",
    "_byte_suffix_KB": "KB",
    "_byte_suffix_MB": "MB",
    "_byte_suffix_GB": "GB",
    "_byte_suffix_TB": "TB",
    "_byte_suffix_PB": "PB",
    // Default date formats for various periods.
    //
    // This should reflect official or de facto formatting universally accepted
    // in the country translation is being made for
    // Available format codes here:
    // https://www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/#Format_codes
    //
    // This will be used when formatting date/time for particular granularity,
    // e.g. "_date_hour" will be shown whenever we need to show time as hours.
    // 
    // "date" is used as in default date format when showing standalone dates.
    "_date": "yyyy-MM-dd",
    "_date_millisecond": "mm:ss SSS",
    "_date_second": "HH:mm:ss",
    "_date_minute": "HH:mm",
    "_date_hour": "HH:mm",
    "_date_day": "MMM dd",
    "_date_week": "ww",
    "_date_month": "MMM",
    "_date_year": "yyyy",
    // Default duration formats for various base units.
    //
    // This will be used by DurationFormatter to format numeric values into
    // duration.
    //
    // Notice how each duration unit comes in several versions. This is to ensure
    // that each base unit is shown correctly.
    //
    // For example, if we have baseUnit set to "second", meaning our duration is
    // in seconds.
    //
    // If we pass in `50` to formatter, it will know that we have just 50 seconds
    // (less than a minute) so it will use format in `"_duration_second"` ("ss"),
    // and the formatted result will be in like `"50"`.
    //
    // If we pass in `70`, which is more than a minute, the formatter will switch
    // to `"_duration_second_minute"` ("mm:ss"), resulting in "01:10" formatted
    // text.
    //
    // Available codes here:
    // https://www.amcharts.com/docs/v4/concepts/formatters/formatting-duration/#Available_Codes
    "_duration_millisecond": "SSS",
    "_duration_millisecond_second": "ss.SSS",
    "_duration_millisecond_minute": "mm:ss SSS",
    "_duration_millisecond_hour": "hh:mm:ss SSS",
    "_duration_millisecond_day": "d'd' mm:ss SSS",
    "_duration_millisecond_week": "d'd' mm:ss SSS",
    "_duration_millisecond_month": "M'm' dd'd' mm:ss SSS",
    "_duration_millisecond_year": "y'y' MM'm' dd'd' mm:ss SSS",
    "_duration_second": "ss",
    "_duration_second_minute": "mm:ss",
    "_duration_second_hour": "hh:mm:ss",
    "_duration_second_day": "d'd' hh:mm:ss",
    "_duration_second_week": "d'd' hh:mm:ss",
    "_duration_second_month": "M'm' dd'd' hh:mm:ss",
    "_duration_second_year": "y'y' MM'm' dd'd' hh:mm:ss",
    "_duration_minute": "mm",
    "_duration_minute_hour": "hh:mm",
    "_duration_minute_day": "d'd' hh:mm",
    "_duration_minute_week": "d'd' hh:mm",
    "_duration_minute_month": "M'm' dd'd' hh:mm",
    "_duration_minute_year": "y'y' MM'm' dd'd' hh:mm",
    "_duration_hour": "hh'h'",
    "_duration_hour_day": "d'd' hh'h'",
    "_duration_hour_week": "d'd' hh'h'",
    "_duration_hour_month": "M'm' dd'd' hh'h'",
    "_duration_hour_year": "y'y' MM'm' dd'd' hh'h'",
    "_duration_day": "d'd'",
    "_duration_day_week": "d'd'",
    "_duration_day_month": "M'm' dd'd'",
    "_duration_day_year": "y'y' MM'm' dd'd'",
    "_duration_week": "w'w'",
    "_duration_week_month": "w'w'",
    "_duration_week_year": "w'w'",
    "_duration_month": "M'm'",
    "_duration_month_year": "y'y' MM'm'",
    "_duration_year": "y'y'",
    // Era translations
    "_era_ad": "AD",
    "_era_bc": "BC",
    // Day part, used in 12-hour formats, e.g. 5 P.M.
    // Please note that these come in 3 variants:
    // * one letter (e.g. "A")
    // * two letters (e.g. "AM")
    // * two letters with dots (e.g. "A.M.")
    //
    // All three need to to be translated even if they are all the same. Some
    // users might use one, some the other.
    "A": "AM",
    "P": "PM",
    "AM": "AM",
    "PM": "PM",
    "A.M.": "오전",
    "P.M.": "오후",
    // Date-related stuff.
    //
    // When translating months, if there's a difference, use the form which is
    // best for a full date, e.g. as you would use it in "2018 January 1".
    //
    // Note that May is listed twice. This is because in English May is the same
    // in both long and short forms, while in other languages it may not be the
    // case. Translate "May" to full word, while "May(short)" to shortened
    // version.
    //
    // Should month names and weekdays be capitalized or not?
    //
    // Rule of thumb is this: if the names should always be capitalized,
    // regardless of name position within date ("January", "21st January 2018",
    // etc.) use capitalized names. Otherwise enter all lowercase.
    //
    // The date formatter will automatically capitalize names if they are the
    // first (or only) word in resulting date.
    "January": "1월",
    "February": "2월",
    "March": "3월",
    "April": "4월",
    "May": "5월",
    "June": "6월",
    "July": "7월",
    "August": "8월",
    "September": "9월",
    "October": "10월",
    "November": "11월",
    "December": "12월",
    "Jan": "1월",
    "Feb": "2월",
    "Mar": "3월",
    "Apr": "4월",
    "May(short)": "5월",
    "Jun": "6월",
    "Jul": "7월",
    "Aug": "8월",
    "Sep": "9월",
    "Oct": "10월",
    "Nov": "11월",
    "Dec": "12월",
    // Weekdays.
    "Sunday": "일요일",
    "Monday": "월요일",
    "Tuesday": "화요일",
    "Wednesday": "수요일",
    "Thursday": "목요일",
    "Friday": "금요일",
    "Saturday": "토요일",
    "Sun": "일",
    "Mon": "월",
    "Tue": "화",
    "Wed": "수",
    "Thu": "목",
    "Fri": "금",
    "Sat": "토",
    // Date ordinal function.
    //
    // This is used when adding number ordinal when formatting days in dates.
    //
    // E.g. "January 1st", "February 2nd".
    //
    // The function accepts day number, and returns a string to be added to the
    // day, like in default English translation, if we pass in 2, we will receive
    // "nd" back.
    "_dateOrd": function (day) {
        var res = "일";
        if ((day < 11) || (day > 13)) {
            switch (day % 10) {
                case 1:
                    res = "일";
                    break;
                case 2:
                    res = "일";
                    break;
                case 3:
                    res = "일";
                    break;
            }
        }
        return res;
    },
    // Various chart controls.
    // Shown as a tooltip on zoom out button.
    "Zoom Out": "축소",
    // Timeline buttons
    "Play": "시작",
    "Stop": "정지",
    // Chart's Legend screen reader title.
    "Legend": "범례",
    // Legend's item screen reader indicator.
    "Click, tap or press ENTER to toggle": "켜고 끄려면 클릭, 탭 혹은 엔터를 눌러주세요.",
    // Shown when the chart is busy loading something.
    "Loading": "불러오는 중",
    // Shown as the first button in the breadcrumb navigation, e.g.:
    // Home > First level > ...
    "Home": "홈",
    // Chart types.
    // Those are used as default screen reader titles for the main chart element
    // unless developer has set some more descriptive title.
    "Chart": "차트",
    "Serial chart": "시리얼 차트",
    "X/Y chart": "X/Y 차트",
    "Pie chart": "파이 차트",
    "Gauge chart": "게이지 차트",
    "Radar chart": "레이더 차트",
    "Sankey diagram": "생키 다이어그램",
    "Flow diagram": "플로우 다이어그램",
    "Chord diagram": "코드 다이어그램",
    "TreeMap chart": "트리맵 차트",
    "Force directed tree": "포스 디렉티드 트리",
    "Sliced chart": "슬라이스 차트",
    // Series types.
    // Used to name series by type for screen readers if they do not have their
    // name set.
    "Series": "시리즈",
    "Candlestick Series": "캔들스틱 시리즈",
    "OHLC Series": "OHLC 시리즈",
    "Column Series": "컬럼 시리즈",
    "Line Series": "라인 시리즈",
    "Pie Slice Series": "파이 슬라이스 시리즈",
    "Funnel Series": "퍼널 시리즈",
    "Pyramid Series": "피라미드 시리즈",
    "X/Y Series": "X/Y 시리즈",
    // Map-related stuff.
    "Map": "맵",
    "Press ENTER to zoom in": "확대하려면 엔터를 누르세요.",
    "Press ENTER to zoom out": "축소하려면 엔터를 누르세요.",
    "Use arrow keys to zoom in and out": "확대 혹은 축소하려면 방향키를 이용하세요.",
    "Use plus and minus keys on your keyboard to zoom in and out": "확대 혹은 축소하려면 키보드의 +/- 키를 이용하세요.",
    // Export-related stuff.
    // These prompts are used in Export menu labels.
    //
    // "Export" is the top-level menu item.
    //
    // "Image", "Data", "Print" as second-level indicating type of export
    // operation.
    //
    // Leave actual format untranslated, unless you absolutely know that they
    // would convey more meaning in some other way.
    "Export": "내보내기",
    "Image": "이미지",
    "Data": "데이터",
    "Print": "인쇄",
    "Click, tap or press ENTER to open": "열려면, 클릭, 탭 또는 엔터를 누르세요.",
    "Click, tap or press ENTER to print.": "출력하려면, 클릭, 탭 또는 엔터를 누르세요.",
    "Click, tap or press ENTER to export as %1.": "%1(으)로 내보내려면 클릭, 탭 또는 엔터를 누르세요.",
    'To save the image, right-click this link and choose "Save picture as..."': '이미지를 저장하려면, 이 링크를 마우스로 우클릭하여 "다른 이름으로 저장"을 선택하세요.',
    'To save the image, right-click thumbnail on the left and choose "Save picture as..."': '이미지를 저장하려면, 좌측 썸네일을 마우스로 우클릭하여 "다른 이름으로 저장"을 선택하세요.',
    "(Press ESC to close this message)": "(이 메시지를 끄려면 ESC를 누르세요.)",
    "Image Export Complete": "이미지 내보내기 완료",
    "Export operation took longer than expected. Something might have gone wrong.": "내보내기가 지연되고 있습니다. 문제가 없는지 확인이 필요합니다.",
    "Saved from": "다음으로부터 저장됨: ",
    "PNG": "",
    "JPG": "",
    "GIF": "",
    "SVG": "",
    "PDF": "",
    "JSON": "",
    "CSV": "",
    "XLSX": "",
    // Scrollbar-related stuff.
    //
    // Scrollbar is a control which can zoom and pan the axes on the chart.
    //
    // Each scrollbar has two grips: left or right (for horizontal scrollbar) or
    // upper and lower (for vertical one).
    //
    // Prompts change in relation to whether Scrollbar is vertical or horizontal.
    //
    // The final section is used to indicate the current range of selection.
    "Use TAB to select grip buttons or left and right arrows to change selection": "선택 범위를 변경하려면 선택 버튼이나 좌우 화살표를 이용하세요.",
    "Use left and right arrows to move selection": "선택 범위를 움직이려면 좌우 화살표를 이용하세요.",
    "Use left and right arrows to move left selection": "왼쪽 선택 범위를 움직이려면 좌우 화살표를 이용하세요.",
    "Use left and right arrows to move right selection": "오른쪽 선택 범위를 움직이려면 좌우 화살표를 이용하세요.",
    "Use TAB select grip buttons or up and down arrows to change selection": "선택 범위를 변경하려면 선택 버튼이나 상하 화살표를 이용하세요.",
    "Use up and down arrows to move selection": "선택 범위를 움직이려면 상하 화살표를 이용하세요.",
    "Use up and down arrows to move lower selection": "하단 선택 범위를 움직이려면 상하 화살표를 이용하세요.",
    "Use up and down arrows to move upper selection": "상단 선택 범위를 움직이려면 상하 화살표를 이용하세요.",
    "From %1 to %2": "%1 부터 %2 까지",
    "From %1": "%1 부터",
    "To %1": "%1 까지",
    // Data loader-related.
    "No parser available for file: %1": "파일 파싱 불가능: %1",
    "Error parsing file: %1": "파일 파싱 오류: %1",
    "Unable to load file: %1": "파일 로드 불가능: %1",
    "Invalid date": "날짜 올바르지 않음",
};
//# sourceMappingURL=ko_KR.js.map