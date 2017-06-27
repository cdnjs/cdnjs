(function ($, w, undefined) {
    if (w.footable == undefined || w.footable == null)
        throw new Error('Please check and make sure footable.js is included in the page and is loaded prior to this script.');

    var defaults = {
        paginate: true,
        pageSize: 10,
        pageNavigation: '.footable-nav'
    };

    function pageInfo(ft) {
        var $table = $(ft.table), $tbody = $table.find('> tbody');
        this.pageNavigation = $table.data('page-navigation') || ft.options.pageNavigation;
        this.pageSize = $table.data('page-size') || ft.options.pageSize;
        this.currentPage = 0;
        this.pages = [];
    };

    function Paginate() {
        var p = this;
        p.name = 'Footable Paginate';

        p.init = function (ft) {
            if (ft.options.paginate == true) {
                var $table = $(ft.table), $tbody = $table.find('> tbody');
                $(ft.table).bind({
                    'footable_initialized': function (e) {
                        e.ft.pageInfo = new pageInfo(e.ft);
                        var $table = $(e.ft.table), $tbody = $table.find('> tbody');
                        p.createPages(e.ft, $tbody);
                        p.createNavigation(e.ft, $tbody);
                        p.fillPage(e.ft, $tbody, 0);
                    },
                    'footable_sorted': function (e) {
                        var $tbody = $(e.ft.table).find('> tbody');
                        p.createPages(e.ft, $tbody);
                        p.fillPage(e.ft, $tbody, e.ft.pageInfo.currentPage);
                    },
                    'footable_filtered': function (e) {
                        var $tbody = $(e.ft.table).find('> tbody');
                        p.createPages(e.ft, $tbody);
                        p.createNavigation(e.ft, $tbody);
                        p.fillPage(e.ft, $tbody, e.ft.pageInfo.currentPage);
                    }
                });
            }
        };

        p.createPages = function (ft, tbody) {
            var pages = 1;
            var info = ft.pageInfo;
            var pageCount = pages * info.pageSize;
            var page = [];
            var lastPage = [];
            info.pages = [];
            var rows = tbody.find('> tr:not(.footable-filtered,.footable-row-detail)');
            rows.each(function (i, row) {
                page.push(row);
                if (i === pageCount - 1) {
                    info.pages.push(page);
                    pages++;
                    pageCount = pages * info.pageSize;
                    page = [];
                } else if (i >= rows.length - (rows.length % info.pageSize)) {
                    lastPage.push(row);
                }
            });
            if (lastPage.length > 0) info.pages.push(lastPage);
            if (info.currentPage >= info.pages.length) info.currentPage = info.pages.length - 1;
            if (info.currentPage < 0) info.currentPage = 0;
        };

        p.createNavigation = function (ft, tbody) {
            var $nav = $(ft.pageInfo.pageNavigation);
            if ($nav.length == 0) return;
            $nav.find('li').remove();
            var info = ft.pageInfo;
            if (info.pages.length > 0) {

                $nav.append('<li class="footable-page-arrow"><a data-page="prev" href="#prev">&laquo;</a></li>');
                $.each(info.pages, function (i, page) {
                    if (page.length > 0) {
                        $nav.append('<li class="footable-page"><a data-page="' + i + '" href="#">' + (i + 1) + '</a></li>');
                    }
                });
                $nav.append('<li class="footable-page-arrow"><a data-page="next" href="#next">&raquo;</a></li>');
            }
            $nav.find('a').click(function (e) {
                e.preventDefault();
                var page = $(this).data('page');
                var newPage = info.currentPage;
                if (page == 'prev') {
                    if (newPage > 0) newPage--;
                } else if (page == 'next') {
                    if (newPage < info.pages.length - 1) newPage++;
                } else {
                    newPage = page;
                }
                if (info.currentPage != newPage) {
                    p.fillPage(ft, tbody, newPage);
                }
                $nav.find('li').removeClass('footable-page-current');
                $nav.find('li.footable-page > a[data-page=' + info.currentPage + ']').parent().addClass('footable-page-current');
            });
            $nav.find('li.footable-page > a[data-page=' + info.currentPage + ']').parent().addClass('footable-page-current');
        };

        p.fillPage = function (ft, tbody, pageNumber) {
            ft.pageInfo.currentPage = pageNumber;
            tbody.find('> tr').hide();
            $(ft.pageInfo.pages[pageNumber]).each(function () {
                p.showRow(this, ft);
            });
        };

        p.showRow = function (row, ft) {
            var $row = $(row), $next = $row.next(), $table = $(ft.table);
            if ($table.hasClass('breakpoint') && $row.hasClass('footable-detail-show') && $next.hasClass('footable-row-detail')) {
                $row.add($next).show();
                ft.createOrUpdateDetailRow(row);
            }
            else $row.show();
        };
    };

    w.footable.plugins.register(new Paginate(), defaults);

})(jQuery, window);