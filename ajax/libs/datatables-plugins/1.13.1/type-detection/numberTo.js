/**
 * convert numbers to farsi, english, arabic.
 * تبدیل عداد به فارسی, انگلیسی, عربی
 *
 *  @name convertTo
 *  @summary convert numbers to farsi, english, arabic.
 *  @author [alireza mohammadi doost](alirezamohammadi1990@gmail.com)
 *  @version 0.1
 *
 *  @example
 *    $('#example').DataTable( {
 *       columnDefs: [
 *         {
 *               data: 'id',
 *               name: 'id',
 *               fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
 *                   $(nTd).html($.fn.dataTable.numberTo(oData.id, 'fa'));
 *               }
 *         },
 *       ]
 *    } );
 */

$(function () {
    $.fn.dataTable.numberTo = function (numbers, to = 'fa') {
        let result = null;
        const faNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const enNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const arNumbers = ['۰', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

        if (!numbers && to === 'fa') {
            return 'مقدار ورودی صحیح نمی‌باشد.'
        } else if (!numbers) {
            return 'numbers is empty.'
        }

        switch (to) {
            case 'fa':
                result = numbers.toString().replace(/\d/g, x => faNumbers[x]);
                break;
            case 'en':
                result = numbers.toString().replace(/\d/g, x => enNumbers[x]);
                break;
            case 'ar':
                result = numbers.toString().replace(/\d/g, x => arNumbers[x]);
                break;
        }
        return result;
    };
})