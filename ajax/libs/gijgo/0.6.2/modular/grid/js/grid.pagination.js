/** */
if (typeof(gj.grid.plugins) === 'undefined') {
    gj.grid.plugins = {};
}

gj.grid.plugins.pagination = {
    config: {
        base: {
            style: {
                pager: {
                    cell: '',
                    stateDisabled: '',
                    activeButton: 'gj-grid-base-active'
                }
            },
            pager: {
                /** The maximum number of records that can be show by page. */
                limit: 10,

                /** Array that contains the possible page sizes of the grid.
                 * When this setting is set, then a drop down with the options for each page size is visualized in the pager. */
                sizes: undefined,

                /** Array that contains a list with jquery objects that are going to be used on the left side of the pager. */
                leftControls: [
                    $('<button title="Previous" data-role="page-previous" class="gj-cursor-pointer"><span>«</span></button>'),
                    $('<button data-role="page-button-one" class="gj-cursor-pointer">1</button>'),
                    $('<button data-role="page-button-two" class="gj-cursor-pointer">2</button>'),
                    $('<button data-role="page-button-three" class="gj-cursor-pointer">3</button>'),
                    $('<button title="Next" data-role="page-next" class="gj-cursor-pointer"><span>»</span></button> &nbsp;')
                ],

                /** Array that contains a list with jquery objects that are going to be used on the right side of the pager. */
                rightControls: [
                    $('<div>Displaying records&nbsp;</div>'),
                    $('<div data-role="record-first">0</div>'),
                    $('<div>&nbsp;-&nbsp;</div>'),
                    $('<div data-role="record-last">0</div>'),
                    $('<div>&nbsp;of&nbsp;</div>'),
                    $('<div data-role="record-total">0</div>').css({ "margin-right": "5px" })
                ]
            }
        },
        jqueryui: {
            style: {
                pager: {
                    cell: 'ui-widget-header ui-state-default ui-grid-pager-cell',
                    stateDisabled: 'ui-state-disabled'
                }
            },
            pager: {
                leftControls: [
                    $('<div title="First" data-role="page-first" class="ui-icon ui-icon-seek-first ui-grid-icon"></div>'),
                    $('<div title="Previous" data-role="page-previous" class="ui-icon ui-icon-seek-prev ui-grid-icon"></div>'),
                    $('<div>Page</div>'),
                    $('<div></div>').append($('<input type="text" data-role="page-number" class="ui-grid-pager" value="0">')),
                    $('<div>of&nbsp;</div>'),
                    $('<div data-role="page-label-last">0</div>'),
                    $('<div title="Next" data-role="page-next" class="ui-icon ui-icon-seek-next ui-grid-icon"></div>'),
                    $('<div title="Last" data-role="page-last" class="ui-icon ui-icon-seek-end ui-grid-icon"></div>'),
                    $('<div title="Reload" data-role="page-refresh" class="ui-icon ui-icon-refresh ui-grid-icon"></div>'),
                    $('<div></div>').append($('<select data-role="page-size" class="ui-grid-page-sizer"></select>'))
                ],

                rightControls: [
                    $('<div>Displaying records&nbsp;</div>'),
                    $('<div data-role="record-first">0</div>'),
                    $('<div>&nbsp;-&nbsp;</div>'),
                    $('<div data-role="record-last">0</div>'),
                    $('<div>&nbsp;of&nbsp;</div>'),
                    $('<div data-role="record-total">0</div>').css({ "margin-right": "5px" })
                ]
            }
        },
        bootstrap: {
            style: {
                pager: {
                    cell: 'gj-grid-bootstrap-tfoot-cell',
                    stateDisabled: ''
                }
            },
            pager: {
                leftControls: [
                    $('<button type="button" data-role="page-first" title="First Page" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-step-backward"></span></button>'),
                    $('<div>&nbsp;</div>'),
                    $('<button type="button" data-role="page-previous" title="Previous Page" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-backward"></span></button>'),
                    $('<div>&nbsp;</div>'),
                    $('<div>Page</div>'),
                    $('<div>&nbsp;</div>'),
                    $('<div></div>').append($('<input data-role="page-number" class="form-control input-sm" style="width: 40px; text-align: right;" type="text" value="0">')),
                    $('<div>&nbsp;</div>'),
                    $('<div>of&nbsp;</div>'),
                    $('<div data-role="page-label-last">0</div>'),
                    $('<div>&nbsp;</div>'),
                    $('<button type="button" data-role="page-next" title="Next Page" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-forward"></span></button>'),
                    $('<div>&nbsp;</div>'),
                    $('<button type="button" data-role="page-last" title="Last Page" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-step-forward"></span></button>'),
                    $('<div>&nbsp;</div>'),
                    $('<button type="button" data-role="page-refresh" title="Reload" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-refresh"></span></button>'),
                    $('<div>&nbsp;</div>'),
                    $('<div></div>').append($('<select data-role="page-size" class="form-control input-sm"></select></div>'))
                ],
                rightControls: [
                    $('<div>Displaying records&nbsp;</div>'),
                    $('<div data-role="record-first">0</div>'),
                    $('<div>&nbsp;-&nbsp;</div>'),
                    $('<div data-role="record-last">0</div>'),
                    $('<div>&nbsp;of&nbsp;</div>'),
                    $('<div data-role="record-total">0</div>').css({ "margin-right": "5px" })
                ]
            }
        }
    },

    private: {
        init: function ($grid) {
            var $row, $cell, data, controls, $leftPanel, $rightPanel, $tfoot, leftControls, rightControls, i;

            data = $grid.data();

            if (data.pager) {
                data.params[data.defaultParams.page] = 1;
                data.params[data.defaultParams.limit] = data.pager.limit;

                $row = $('<tr/>');
                $cell = $('<th/>').addClass(data.style.pager.cell);
                $row.append($cell);

                $leftPanel = $('<div data-role="display" />').css({ 'float': 'left' });
                $rightPanel = $('<div data-role="display" />').css({ 'float': 'right' });
                if (/msie/.test(navigator.userAgent.toLowerCase())) {
                    $rightPanel.css({ 'padding-top': '3px' });
                }

                $cell.append($leftPanel).append($rightPanel);

                $tfoot = $('<tfoot />').append($row);
                $grid.append($tfoot);
                gj.grid.plugins.pagination.private.updatePagerColSpan($grid);

                leftControls = gj.grid.methods.clone(data.pager.leftControls); //clone array
                $.each(leftControls, function () {
                    $leftPanel.append(this);
                });

                rightControls = gj.grid.methods.clone(data.pager.rightControls); //clone array
                $.each(rightControls, function () {
                    $rightPanel.append(this);
                });

                controls = $grid.find('tfoot [data-role]');
                for (i = 0; i < controls.length; i++) {
                    gj.grid.plugins.pagination.private.initPagerControl($(controls[i]), $grid);
                }
            }
        },

        initPagerControl: function ($control, $grid) {
            var data = $grid.data();
            switch ($control.data('role')) {
                case 'page-number':
                    $control.on('keypress', function (e) {
                        if (e.keyCode === 13) {
                            $(this).trigger('change');
                        }
                    });
                    break;
                case 'page-size':
                    if (data.pager.sizes && 0 < data.pager.sizes.length) {
                        $control.show();
                        $.each(data.pager.sizes, function () {
                            $control.append($('<option/>').attr('value', this.toString()).text(this.toString()));
                        });
                        $control.change(function () {
                            var newSize = parseInt(this.value, 10);
                            data.params[data.defaultParams.limit] = newSize;
                            gj.grid.plugins.pagination.private.changePage($grid, 1);
                            gj.grid.plugins.pagination.events.pageSizeChange($grid, newSize);
                        });
                        $control.val(data.params[data.defaultParams.limit]);
                    } else {
                        $control.hide();
                    }
                    break;
                case 'page-refresh':
                    $control.on('click', function () { $grid.reload(); });
                    break;
            }

        },

        reloadPager: function ($grid, totalRecords) {
            var page, limit, lastPage, firstRecord, lastRecord, data, controls, i;

            data = $grid.data();

            if (data.pager) {
                page = (0 === totalRecords) ? 0 : data.params[data.defaultParams.page];
                limit = parseInt(data.params[data.defaultParams.limit], 10);
                lastPage = Math.ceil(totalRecords / limit);
                firstRecord = (0 === page) ? 0 : (limit * (page - 1)) + 1;
                lastRecord = (firstRecord + limit) > totalRecords ? totalRecords : (firstRecord + limit) - 1;

                controls = $grid.find('TFOOT [data-role]');
                for (i = 0; i < controls.length; i++) {
                    gj.grid.plugins.pagination.private.reloadPagerControl($(controls[i]), $grid, page, lastPage, firstRecord, lastRecord, totalRecords);
                }

                gj.grid.plugins.pagination.private.updatePagerColSpan($grid);
            }
        },

        reloadPagerControl: function ($control, $grid, page, lastPage, firstRecord, lastRecord, totalRecords) {
            var newPage;
            switch ($control.data('role')) {
                case 'page-first':
                    gj.grid.plugins.pagination.private.assignPageHandler($grid, $control, 1, page < 2);
                    break;
                case 'page-previous':
                    gj.grid.plugins.pagination.private.assignPageHandler($grid, $control, page - 1, page < 2);
                    break;
                case 'page-number':
                    $control.val(page).off('change').on('change', gj.grid.plugins.pagination.private.createChangePageHandler($grid, page, lastPage));
                    break;
                case 'page-label-last':
                    $control.text(lastPage);
                    break;
                case 'page-next':
                    gj.grid.plugins.pagination.private.assignPageHandler($grid, $control, page + 1, lastPage === page);
                    break;
                case 'page-last':
                    gj.grid.plugins.pagination.private.assignPageHandler($grid, $control, lastPage, lastPage === page);
                    break;
                case 'page-button-one':
                    newPage = (page === 1) ? 1 : ((page == lastPage) ? (page - 2) : (page - 1));
                    gj.grid.plugins.pagination.private.assignButtonHandler($grid, $control, page, newPage, lastPage);
                    break;
                case 'page-button-two':
                    newPage = (page === 1) ? 2 : ((page == lastPage) ? lastPage - 1 : page);
                    gj.grid.plugins.pagination.private.assignButtonHandler($grid, $control, page, newPage, lastPage);
                    break;
                case 'page-button-three':
                    newPage = (page === 1) ? page + 2 : ((page == lastPage) ? page : (page + 1));
                    gj.grid.plugins.pagination.private.assignButtonHandler($grid, $control, page, newPage, lastPage);
                    break;
                case 'record-first':
                    $control.text(firstRecord);
                    break;
                case 'record-last':
                    $control.text(lastRecord);
                    break;
                case 'record-total':
                    $control.text(totalRecords);
                    break;
            }
        },

        assignPageHandler: function ($grid, $control, newPage, disabled) {
            var style = $grid.data().style.pager;
            if (disabled) {
                $control.addClass(style.stateDisabled).prop('disabled', true).off('click');
            } else {
                $control.removeClass(style.stateDisabled).prop('disabled', false).off('click').on('click', function () {
                    gj.grid.plugins.pagination.private.changePage($grid, newPage);
                });
            }
        },

        assignButtonHandler: function ($grid, $control, page, newPage, lastPage) {
            var style = $grid.data().style.pager;
            if (newPage < 1 || newPage > lastPage) {
                $control.hide();
            } else {
                $control.show().off('click').text(newPage);
                if (newPage === page) {
                    $control.addClass(style.activeButton);
                } else {
                    $control.removeClass(style.activeButton).on('click', function () {
                        gj.grid.plugins.pagination.private.changePage($grid, newPage);
                    });
                }
            }
        },

        createChangePageHandler: function ($grid, currentPage, lastPage) {
            return function () {
                var data = $grid.data(),
                    newPage = parseInt(this.value, 10);
                if (newPage && !isNaN(newPage) && newPage <= lastPage) {
                    gj.grid.plugins.pagination.private.changePage($grid, newPage);
                } else {
                    this.value = currentPage;
                    alert('Please enter a valid number.');
                }
            };
        },

        changePage: function ($grid, newPage) {
            var data = $grid.data();
            $grid.find('TFOOT [data-role="page-number"]').val(newPage);
            data.params[data.defaultParams.page] = newPage;
            gj.grid.plugins.pagination.events.pageChanging($grid, newPage);
            $grid.reload();
        },

        updatePagerColSpan: function ($grid) {
            var $cell = $grid.find('tfoot > tr > th');
            if ($cell && $cell.length) {
                $cell.attr('colspan', gj.grid.methods.countVisibleColumns($grid));
            }
        },

        getRecordsForRendering: function ($grid) {
            var data = $grid.data(),
                limit = parseInt(data.params[data.defaultParams.limit], 10),
                page = data.params[data.defaultParams.page],
                start = (page - 1) * limit;
            
            return data.records.slice(start, start + limit);
        }
    },

    public: {
    },

    events: {
        /**
         * Triggered when the page size is changed.
         * */
        pageSizeChange: function ($grid, newSize) {
            $grid.trigger('pageSizeChange', [newSize]);
        },

        /**
         * Triggered before the change of the page.
         * */
        pageChanging: function ($grid, newSize) {
            $grid.trigger('pageChanging', [newSize]);
        }
    },

    configure: function ($grid, clientConfig) {
        var data = $grid.data();
        if (clientConfig.pager) {
            if ($.isArray(data.dataSource)) {
                gj.grid.methods.getRecordsForRendering = gj.grid.plugins.pagination.private.getRecordsForRendering;
            }

            $grid.on('initialized', function () {
                gj.grid.plugins.pagination.private.init($grid);
            });
            $grid.on('dataBound', function (e, records, totalRecords) {
                gj.grid.plugins.pagination.private.reloadPager($grid, totalRecords);
            });
            $grid.on('columnShow', function () {
                gj.grid.plugins.pagination.private.updatePagerColSpan($grid);
            });
            $grid.on('columnHide', function () {
                gj.grid.plugins.pagination.private.updatePagerColSpan($grid);
            });
        }
    }
};

