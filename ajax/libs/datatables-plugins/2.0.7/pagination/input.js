/**
 * Sometimes for quick navigation, it can be useful to allow an end user to
 * enter which page they wish to jump to manually. This paging control uses a
 * text input box to accept new paging numbers (arrow keys are also allowed
 * for), and four standard navigation buttons are also presented to the end
 * user.
 *
 *  @name Navigation with text input
 *  @summary Shows an input element into which the user can type a page number
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 *  @author [Gordey Doronin](http://github.com/GDoronin)
 *
 *  @example
 *    $(document).ready(function() {
 *        $('#example').DataTable( {
 *            "pagingType": "input"
 *        } );
 *    } );
 */

(function ($) {
    function createInputElement(settings) {
        const pageInfo = $(settings.nTable).DataTable().page.info();
        const $input = $('<input>', {
            class: 'paginate_input',
            type: 'number',
            min: 1,
            max: pageInfo.pages,
        }).val(pageInfo.page + 1);
        $input.on("change", function (e) {
            if (this.value === '' || this.value.match(/[^0-9]/)) {
                /* Nothing entered or non-numeric character */
                this.value = this.value.replace(/[^\d]/g, ''); // don't even allow anything but digits
                return;
            }

            const page = Number(this.value - 1);
            $(settings.nTable).DataTable().page(page).draw(false);
        });

        return $input;
    }

    $.fn.DataTable.ext.pager.input = function() {
        return ['first', 'previous', 'ellipsis', 'next', 'last'];
    };

    $.fn.DataTable.ext.renderer.pagingButton.input = function (settings, buttonType, content, active, disabled) {
        var classes = settings.oClasses.paging;
        var btnClasses = [classes.button];
        var btn;

        if (active) {
            btnClasses.push(classes.active);
        }

        if (disabled) {
            btnClasses.push(classes.disabled);
        }

        if (buttonType === 'ellipsis') {
            btn = $('<div>', {class: 'sp-inline'}).append($('<span>', {class: 'paginate_page'}).text('Page'))
                            .append(createInputElement(settings))
                            .append($('<span>', {class: 'paginate_of'}).text('of ' + $(settings.nTable).DataTable().page.info().pages))[0];
        } else {
            btn = $('<button>', {
                class: btnClasses.join(' '),
                role: 'link',
                type: 'button'
            }).html(content);
        }

        return {
            display: btn,
            clicker: btn
        }
    };
})(jQuery);
