/**
 *  Plug-in offers the same functionality as `default` pagination type
 *  (see `pagingType` option) but with input field for jumping pages, for use with bootstrap theme.
 *
 *  @example
 *    $(document).ready(function() {
 *        $('#example').dataTable( {
 *            "pagingType": "bootstrap_input"
 *        } );
 *    } );
 */

$.fn.DataTable.ext.pager.bootstrap_input = function (page, pages) {
    return ['first', 'previous', 'input', 'next', 'last'];
};


main_pageButtonFunc = $.fn.DataTable.ext.renderer.pageButton.bootstrap

$.fn.DataTable.ext.renderer.pageButton = $.extend(true, $.fn.DataTable.ext.renderer.pageButton,
    {
        bootstrap: function (settings, host, idx, buttons, page, pages) {
            main_pageButtonFunc(settings, host, idx, buttons, page, pages);

            input_html = '<div class="input-group">' +
                '<input style="width: ' + (Math.ceil(Math.log10(pages + 1)) + 2.5) + 'em; margin-left: -1px;" ' + (pages === 1 ? 'disabled ' : '') + 'class="form-control rounded-0" type="number" min="1" max="' + pages + '">' +
                '<span class="input-group-text rounded-0" id="basic-addon2"> of ' + pages + '</span>' +
                '</div>'

            let input_section = $(host).find("[data-dt-idx='input']");
            input_section.closest("li").prop("onclick", null).off("click");
            input_section.closest("li").prop("onkeypress", null).off("keypress");
            input_section.replaceWith(input_html);

            const api = new DataTable.Api(settings);

            $(host).find("ul.pagination input").val(page + 1).on('change', function (e) {
                api.page(Number($(e.target).val()) - 1).draw('page');
            });
        }
    }
)
