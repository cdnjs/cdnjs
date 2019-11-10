/*! ReStable v0.1.1 by Alessandro Benoit */
(function ($, window, i) {

    'use strict';

    $.fn.ReStable = function (options) {

        // Settings
        var s = $.extend({
            rowHeaders: true,
            maxWidth: 480
        }, options);

        // Build the responsive menu container and fill it with build_menu()
        function create_responsive_table(element, i) {

            var $cols = [],
                $result = {},
                $cols_header = $(element).find('tr').first().children('td,th'),
                $row_number = 0,
                $list;

            if (s.rowHeaders) {
                $cols_header = $cols_header.slice(1);
            }

            // Prende le intestazioni
            $cols_header.each(function () {
                $cols.push($(this).text());
            });

            // Costruisce un array con il contenuto: $result
            $(element).find('tr').slice(1).each(function () {

                var $row = $(this);
                $row_number += 1;

                $.each($cols, function (index, value) {

                    index += 1;

                    if (s.rowHeaders) {
                        if (!$result[value]) { $result[value] = {}; }
                        $result[value][$row.children('td:nth-child(1)').text()] = $row.children('td:nth-child(' + (index + 1) + ')').text();
                    } else {
                        if (!$result[$row_number]) { $result[$row_number] = {}; }
                        $result[$row_number][value] = $row.children('td:nth-child(' + index + ')').text();
                    }

                });

            });

            // Crea la lista
            $list = $('<ul/>', {
                class: 'tabletolist ' + ((s.rowHeaders) ? 'rh' : 'nrh'),
                id: 'tabletolist' + i
            }).insertBefore($(element));
            $.each($result, function (index, value) {

                var $myrow = $('<li/>', {
                    html: (s.rowHeaders) ? '<span class="titles">' + index + '</span>' : ''
                }).appendTo($list),
                    $myrowul = $('<ul/>').appendTo($myrow);

                $.each(value, function (index, value) {

                    $('<li/>', {
                        html: '<span class="row_headers">' + index + '</span> <span class="row_data">' + value + '</span>'
                    }).appendTo($myrowul);

                });

            });

            return $list;

        }

        // Let's do it
        this.each(function () {

            var element = $(this),
                responsive_table;

            i += 1;

            // The responsive menu is built if the page size is or goes under maxWidth
            function handle_table() {

                if ($(window).width() > parseInt(s.maxWidth, 10)) {

                    $(element).show();

                    if (responsive_table) {
                        $(responsive_table).hide();
                    }

                } else {

                    $(element).hide();

                    if (responsive_table) {
                        $(responsive_table).show();
                    } else {
                        responsive_table = create_responsive_table(element, i);
                    }

                }

            }

            // At first
            handle_table();

            // Then at the resizing of the page
            $(window).resize(function () {
                handle_table();
            });

        });

    };

    $.ReStable = function (options) {
        $('table').ReStable(options);
    };

})(jQuery, this, 0);