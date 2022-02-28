/**
 * Sorts a column containing Persian numbers. Persian numbers can easily be
 * mapped 1:1 to latin numbers - ۱ = 1, ۲ = 2, ۱۲ = 12 and so on.
 *
 *
 *  @name DataTables Persian Number Sorting
 *  @summary Sorts columns containing UTF-8 Persian numbers
 *  @author [Khorshid](https://khorshidlab.com)
 *
 *  @example
 *    $('#example').DataTable( {
 *       columnDefs: [
 *         { type: 'kh-persian-numbers', targets: 0 }
 *       ]
 *    } );
 */

 jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "kh-persian-numbers-pre": function (a) {
        function toEnglishNumber(strNum) {
            var pn = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
            var en = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            var cache = strNum;

            for (var i = 0; i < 10; i++) {
                var regex_fa = new RegExp(pn[i], 'g');
                cache = cache.replace(regex_fa, en[i]);
            }

            return cache;
        }

        return parseFloat(toEnglishNumber(a))
    },
    "kh-persian-numbers-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0))
    },
    "kh-persian-numbers-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0))
    }
});