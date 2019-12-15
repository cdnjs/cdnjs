/**
 * (c) 2013 Jexcel Plugin v1.3.3 | Bossanova UI
 * http://www.github.com/paulhodel/jexcel
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Create light embedded spreadsheets on your webpages
 * 
 * ROADMAP:
 * Online collaboration
 * Merged cells
 * Custom renderer
 * Big data (partial table loading)
 * Pagination
 */

(function( $ ){

var methods = {

    /**
     * Innitialization, configuration and loading
     * 
     * @param {Object} options configuration
     * @return void
     */
    init : function( options ) {
        // Loading default configuration
        var defaults = {
            // Column header titles
            colHeaders:[],
            // Column width sizes
            colWidths:[],
            // Column width that is used by default
            defaultColWidth:50,
            // Column alignment
            colAlignments:[],
            // Column types and configurations
            columns:[],
            // Minimal number of blank rows in the end
            minSpareRows:0,
            // Minimal number of blank cols in the end
            minSpareCols:0,
            // Minimal table dimensions
            minDimensions:[0,0],
            // Custom context menu 
            contextMenu:null,
            // Allow column sorting
            columnSorting:true,
            // Allow column resizing
            columnResize:true,
            // Allow row dragging
            rowDrag:true,
            // Allow table edition
            editable:true,
            // Allow new rows
            allowInsertRow:true,
            // Allow new rows
            allowManualInsertRow:true,
            // Allow new columns
            allowInsertColumn:true,
            // Allow new rows
            allowManualInsertColumn:true,
            // Allow row delete
            allowDeleteRow:true,
            // Allow column delete
            allowDeleteColumn:true,
            // Global wrap
            wordWrap:false,
            // ID of the table
            tableId:null,
            // About message
            about:'jExcel Spreadsheet\\nVersion 1.3.3\\nAuthor: Paul Hodel <paul.hodel@gmail.com>\\nWebsite: http://bossanova.uk/jexcel'
        };

        // Configuration holder
        var options =  $.extend(defaults, options);

        // Compatibility
        if (options.manualColumnResize != undefined) {
            options.columnResize = options.manualColumnResize;
        }
        if (options.manualRowMove != undefined) {
            options.rowDrag = options.manualRowMove;
        }

        // Id
        var id = $(this).prop('id');

        // Main object
        var main = $(this);

        // Create
        prepareTable = function () {
            // Register options
            if (! $.fn.jexcel.defaults) {
                $.fn.jexcel.defaults = new Array();
            }
            $.fn.jexcel.defaults[id] = options;

            // Create history track array
            $.fn.jexcel.defaults[id].history = [];
            $.fn.jexcel.defaults[id].historyIndex = -1;

            // Loading initial data from remote sources
            var results = [];

            // Data holder cannot be blank
            if (! options.data) {
                options.data = [];
            }
            // Length
            if (! $.fn.jexcel.defaults[id].data.length) {
                $.fn.jexcel.defaults[id].data = [[]];
            }

            // Number of columns
            size = options.colHeaders.length;
            if (options.data[0].length > size) {
                size = options.data[0].length;
            }

            // Minimal dimensions
            if ($.fn.jexcel.defaults[id].minDimensions[0] > size) {
                size = $.fn.jexcel.defaults[id].minDimensions[0];
            }

            // Preparations
            for (i = 0; i < size; i++) {
                // Default headers
                if (! options.colHeaders[i]) {
                    options.colHeaders[i] = $.fn.jexcel('getColumnName', i);
                }
                // Default column description
                if (! options.columns[i]) {
                    options.columns[i] = { type:'text' };
                } else if (! options.columns[i]) {
                    options.columns[i].type = 'text';
                }
                if (! options.columns[i].source) {
                    $.fn.jexcel.defaults[id].columns[i].source = [];
                }
                if (! options.columns[i].options) {
                    $.fn.jexcel.defaults[id].columns[i].options = [];
                }
                if (! options.columns[i].editor) {
                    options.columns[i].editor = null;
                }
                if (! options.colAlignments[i]) {
                    options.colAlignments[i] = 'center';
                }
                if (! options.colWidths[i]) {
                    options.colWidths[i] = options.defaultColWidth || '50';
                }

                // Pre-load initial source for json autocomplete
                if (options.columns[i].type == 'autocomplete' || options.columns[i].type == 'dropdown') {
                    // if remote content
                    if (options.columns[i].url) {
                        results.push($.ajax({
                            url: options.columns[i].url,
                            index: i,
                            dataType:'json',
                            success: function (result) {
                                // Create the dynamic sources
                                $.fn.jexcel.defaults[id].columns[this.index].source = result;
                            },
                            error: function (result) {
                                console.error('It was not possible to load the url: ' + this.url);
                            }
                        }));
                    }
                } else if (options.columns[i].type == 'calendar') {
                    // Default format for date columns
                    if (! $.fn.jexcel.defaults[id].columns[i].options.format) {
                        $.fn.jexcel.defaults[id].columns[i].options.format = 'DD/MM/YYYY';
                    }
                }
            }

            // In case there are external json to be loaded before create the table
            if (results.length > 0) {
                // Waiting all external data is loaded
                $.when.apply(this, results).done(function() {
                    // Create the table
                    $(main).jexcel('createTable');
                });
            } else {
                // No external data to be loaded, just created the table
                $(main).jexcel('createTable');
            }
        }

        // Load the table data based on an CSV file
        if (options.csv) {
            if (! $.csv) {
                // Required lib not present
                console.error('Jexcel error: jquery-csv library not loaded');
            } else {
                // Comma as default
                options.delimiter = options.delimiter || ',';

                // Load CSV file
                $.ajax({
                    url: options.csv,
                    success: function (result) {
                        var i = 0;
                        // Convert data
                        var data = $.csv.toArrays(result);

                        // Headers
                        if (options.csvHeaders == true) {
                            options.colHeaders = data.shift();
                        }

                        // Data
                        options.data = data;
 
                        // Prepare table
                        prepareTable();
                    }
                });
            }
        } else if (options.url) {
            // Load json external file
            $.ajax({
                url: options.url,
                dataType:'json',
                success: function (result) {
                    // Data
                    options.data = $.parseJSON((result.data) ? result.data : result);
                     // Prepare table
                    prepareTable();
                }
            });
        } else {
            // Prepare table
            prepareTable();
        }
    },

    /**
     * Create the table
     * 
     * @return void
     */
    createTable : function() {
        // Id
        var id = $(this).prop('id');

        // Var options
        var options = $.fn.jexcel.defaults[id];

        // Create main table object
        var table = document.createElement('table');
        $(table).prop('class', 'jexcel bossanova-ui');
        $(table).prop('cellpadding', '0');
        $(table).prop('cellspacing', '0');

        // Add id of the table if defined
        if (options.tableId) {
            $(table).prop('id', options.tableId);
        }

        // Unselectable properties
        $(table).prop('unselectable', 'yes');
        $(table).prop('onselectstart', 'return false');
        $(table).prop('draggable', 'false');

        // Create header and body tags
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');

        // Header
        $(thead).prop('class', 'jexcel_label');

        // Create headers
        var tr = '<td width="30" class="jexcel_label"></td>';

        for (i = 0; i < options.colHeaders.length; i++) {
            // Default header cell properties
            width = options.colWidths[i];
            align = options.colAlignments[i];
            align = 'center';
            header = options.colHeaders[i];

            // Column type hidden
            if (options.columns[i].type == 'hidden') {
                // TODO: when it is first check the whole selection not include
                tr += '<td id="col-' + i + '" style="display:none;" title="' + header + '">' + header + '</td>';
            } else {
                // Other column types
                tr += '<td id="col-' + i + '" width="' + width + '" align="' + align +'" title="' + header + '">' + header + '</td>';
            }
        }

        // Populate header
        $(thead).html('<tr>' + tr + '</tr>'); 

        // TODO: filter row
        //<tr><td></td><td><input type="text"></td></tr>

        // Append content
        $(table).append(thead);
        $(table).append(tbody);

        // Prevent dragging
        $(table).on('dragstart', function () {
            return false;
        });

        // Main object
        $(this).html(table);

        // Add the corner square and textarea one time onlly
        if (! $('.jexcel_corner').length) {
            // Corner one for all sheets in a page
            var corner = document.createElement('div');
            $(corner).prop('class', 'jexcel_corner');
            $(corner).prop('id', 'corner');

            // Hidden textarea copy and paste helper
            var textarea = document.createElement('textarea');
            $(textarea).prop('class', 'jexcel_textarea');
            $(textarea).prop('id', 'textarea');

            // Contextmenu container
            var contextMenu = document.createElement('div');
            $(contextMenu).css('display', 'none');
            $(contextMenu).prop('class', 'jexcel_contextmenu');
            $(contextMenu).prop('id', 'jexcel_contextmenu');

            // Powered by
            var ads = document.createElement('div');
            $(ads).css('display', 'none');
            $(ads).html('<a href="http://github.com/paulhodel/jexcel">jExcel Spreadsheet</a>');

            // Append elements
            $('body').append(corner);
            $('body').append(textarea);
            $('body').append(contextMenu);
            $('body').append(ads);

            // Unselectable properties
            $(corner).prop('unselectable', 'yes');
            $(corner).prop('onselectstart', 'return false');
            $(corner).prop('draggable', 'false');

            // Prevent dragging on the corner object
            $(corner).on('dragstart', function () {
                return false;
            });

            // Corner persistence and other helpers
            $.fn.jexcel.selectedCorner = false;
            $.fn.jexcel.selectedHeader = null;
            $.fn.jexcel.resizeColumn = null;

            // Jexcel context menu
            $(document).on("contextmenu", function (e) {
                // Hide jExcel context menu if is open
                if ($("#jexcel_contextmenu").css('display') == 'block') {
                    $("#jexcel_contextmenu").css('display', 'none')
                }

                if ($.fn.jexcel.current) {
                    // Check if the click was in an jexcel element
                    var table = $(e.target).parent().parent().parent();

                    // Table found
                    if ($(table).is('.jexcel')) {

                        var o = $(e.target).prop('id');
                        if (o) {
                            o = o.split('-');
                            contextMenuContent = '';
                            // Custom context menu
                            if (typeof(options.contextMenu) == 'function') {
                                contextMenuContent = options.contextMenu(o[0], o[1]);
                            } else {
                                if ($(e.target).parent().parent().is('thead')) {
                                    contextMenuContent += "<a onclick=\"$('#" + $.fn.jexcel.current + "').jexcel('orderBy', " + o[1] + ", 0)\">Order ascending <span></span></a>";
                                    contextMenuContent += "<a onclick=\"$('#" + $.fn.jexcel.current + "').jexcel('orderBy', " + o[1] + ", 1)\">Order descending <span></span></a><hr>";
                                    if ($.fn.jexcel.defaults[$.fn.jexcel.current].allowInsertColumn == true) {
                                        contextMenuContent += "<a onclick=\"$('#" + $.fn.jexcel.current + "').jexcel('insertColumn', 1, null, " + o[1] + ")\">Insert a new column<span></span></a>";
                                    }
                                    if ($.fn.jexcel.defaults[$.fn.jexcel.current].allowInsertRow == true) {
                                        contextMenuContent += "<a onclick=\"$('#" + $.fn.jexcel.current + "').jexcel('insertRow', 1, " + o[1] + ")\">Insert a new row<span></span></a><hr>";
                                    }
                                    if ($.fn.jexcel.defaults[$.fn.jexcel.current].allowDeleteColumn == true) {
                                        contextMenuContent += "<a onclick=\"$('#" + $.fn.jexcel.current + "').jexcel('deleteColumn'," + o[1] + ")\">Delete this column<span></span></a><hr>";
                                    }
                                    contextMenuContent += "<a onclick=\"$('#" + $.fn.jexcel.current + "').jexcel('download')\">Save as...<span>Ctrl + S</span></a>";
                                    if (options.about) {
                                        contextMenuContent += "<a onclick=\"alert('" + options.about + "')\">About<span></span></a>";
                                    }
                                } else if ($(e.target).parent().parent().is('tbody')) {
                                    if ($.fn.jexcel.defaults[$.fn.jexcel.current].allowInsertColumn == true) {
                                        contextMenuContent += "<a onclick=\"$('#" + $.fn.jexcel.current + "').jexcel('insertColumn', 1, null, " + o[1] + ")\">Insert a new column<span></span></a>";
                                    }
                                    if ($.fn.jexcel.defaults[$.fn.jexcel.current].allowInsertRow == true) {
                                        contextMenuContent += "<a onclick=\"$('#" + $.fn.jexcel.current + "').jexcel('insertRow', 1, " + o[1] + ")\">Insert a new row<span></span></a><hr>";
                                    }
                                    if ($.fn.jexcel.defaults[$.fn.jexcel.current].allowDeleteRow == true) {
                                        contextMenuContent += "<a onclick=\"$('#" + $.fn.jexcel.current + "').jexcel('deleteRow'," + o[1] + ")\">Delete this row<span></span></a><hr>";
                                    }
                                    contextMenuContent += "<a onclick=\"$('#" + $.fn.jexcel.current + "').jexcel('download')\">Save as...<span>Ctrl + S</span></a>";
                                    if (options.about) {
                                        contextMenuContent += "<a onclick=\"alert('" + options.about + "')\">About<span></span></a>";
                                    }
                                }
                            }

                            if (contextMenuContent) {
                                // Contextmenu content
                                $("#jexcel_contextmenu").html(contextMenuContent);

                                // Show jexcel context menu
                                $("#jexcel_contextmenu").css({ display:'block', top: e.pageY + "px", left: e.pageX + "px" });

                                // Avoid the real one
                                e.preventDefault();
                            }
                        }
                    }
                }
            });

            $(document).on('mousewheel', function (e) {
                // Hide context menu
                $(".jexcel_contextmenu").css('display', 'none');
            });

            // Global mouse click down controles
            $(document).on('mousedown touchstart', function (e) {
                // Click on corner icon
                if (e.target.id == 'corner') {
                    if ($.fn.jexcel.defaults[$.fn.jexcel.current].editable == true) {
                        $.fn.jexcel.selectedCorner = true;
                    }
                } else {
                    // Check if the click was in an jexcel element
                    var table = $(e.target).parent().parent().parent();

                    // Table found
                    if ($(table).is('.jexcel')) {
                        // Get id
                        var current = $(table).parent().prop('id');

                        // Remove selection from any other jexcel if applicable
                        if ($.fn.jexcel.current) {
                            if ($.fn.jexcel.current != current) {
                                $('#' + $.fn.jexcel.current).jexcel('updateSelection');
                            }
                        }

                        // Mark as current
                        $.fn.jexcel.current = current;

                        // Header found
                        if ($(e.target).parent().parent().is('thead')) {
                            var o = $(e.target).prop('id');
                            if (o) {
                                o = o.split('-');

                                if ($.fn.jexcel.selectedHeader && (e.shiftKey || e.ctrlKey)) {
                                    var d = $($.fn.jexcel.selectedHeader).prop('id').split('-');
                                } else {
                                    // Update selection single column
                                    var d = $(e.target).prop('id').split('-');
                                    // Keep track of which header was selected first
                                    $.fn.jexcel.selectedHeader = $(e.target);
                                    $.fn.jexcel.selectedRow = null;
                                }

                                // Update cursor
                                if ($(e.target).outerWidth() - e.offsetX < 8) {
                                    if ($.fn.jexcel.defaults[$.fn.jexcel.current].columnResize == true) {
                                        // Resize helper
                                        $.fn.jexcel.resizeColumn = {
                                            mousePosition: e.pageX,
                                            column:o[1],
                                            width:parseInt($(e.target).css('width')),
                                        }
                                        // Border indication
                                        $(table).parent().find('.c' + o[1]).addClass('resizing');
                                        $(table).parent().find('#col-' + o[1]).addClass('resizing');

                                        // Remove selected cells
                                        $('#' + $.fn.jexcel.current).jexcel('updateSelection');
                                        $('.jexcel_corner').css('left', '-200px');
                                    }
                                } else {
                                    // Get cell objects 
                                    var o1 = $('#' + $.fn.jexcel.current).find('#' + o[1] + '-0');
                                    var o2 = $('#' + $.fn.jexcel.current).find('#' + d[1] + '-' + parseInt($.fn.jexcel.defaults[$.fn.jexcel.current].data.length - 1));

                                    // Update selection
                                    $('#' + $.fn.jexcel.current).jexcel('updateSelection', o1, o2, false, 1);

                                    // Selected cell will be the first in the row
                                    $.fn.jexcel.selectedCell = $(o1);
                                }
                            }
                        } else {
                            $.fn.jexcel.selectedHeader = false;
                        }

                        // Body found
                        if ($(e.target).parent().parent().is('tbody')) {
                            // Update row label selection
                            if ($(e.target).is('.jexcel_label')) {
                                if ($.fn.jexcel.defaults[$.fn.jexcel.current].rowDrag == true && $(e.target).outerWidth() - e.offsetX < 8) {
                                    // Reset selection
                                    $('#' + $.fn.jexcel.current).jexcel('resetSelection');
                                    // Mark which row we are dragging
                                    $.fn.jexcel.dragRowFrom = $(e.target).prop('id');
                                    $.fn.jexcel.dragRowOver = $(e.target).prop('id');
                                    // Visual row we are dragging
                                    $(e.target).parent().find('td').css('background-color', 'rgba(0,0,0,0.1)');
                                } else {
                                    var o = $(e.target).prop('id').split('-');

                                    if ($.fn.jexcel.selectedRow && (e.shiftKey || e.ctrlKey)) {
                                        // Updade selection multi columns
                                        var d = $($.fn.jexcel.selectedRow).prop('id').split('-');
                                    } else {
                                        // Update selection single column
                                        var d = $(e.target).prop('id').split('-');
                                        // Keep track of which header was selected first
                                        $.fn.jexcel.selectedRow = $(e.target);
                                        $.fn.jexcel.selectedHeader = null;
                                    }

                                    // Get cell objects
                                    var o1 = $('#' + $.fn.jexcel.current).find('#0-' + o[1]);
                                    var o2 = $('#' + $.fn.jexcel.current).find('#' + parseInt($.fn.jexcel.defaults[$.fn.jexcel.current].columns.length - 1) + '-' + d[1]);

                                    // Update selection 
                                    $('#' + $.fn.jexcel.current).jexcel('updateSelection', o1, o2);

                                    // Selected cell will be the first in the row
                                    $.fn.jexcel.selectedCell = $(o2);
                                }
                            } else {
                                // Update cell selection
                                if (! $($.fn.jexcel.selectedCell).hasClass('edition')) {
                                    if (! $.fn.jexcel.selectedCell || ! e.shiftKey) {
                                        $.fn.jexcel.selectedCell = $(e.target);
                                    }
                                    $('#' + $.fn.jexcel.current).jexcel('updateSelection', $.fn.jexcel.selectedCell, $(e.target));
                                } else {
                                    if ($(e.target) != $.fn.jexcel.selectedCell) {
                                        $.fn.jexcel.selectedCell = $(e.target);
                                        $('#' + $.fn.jexcel.current).jexcel('updateSelection', $.fn.jexcel.selectedCell, $(e.target));
                                    }
                                }

                                // No full row selected
                                $.fn.jexcel.selectedRow = null;
                            }
                        }
                    } else {
                        // Check if the object is in the jexcel domain
                        if (! $(e.target).parents('.jexcel').length) {
                            // Keep selection if main scrollbar is selected
                            if (e.target != $('html').get(0)) {
	                            $('#' + $.fn.jexcel.current).jexcel('resetSelection');
	                        }
                        }
                    }
                }
            });

            // Global mouse click up controles 
            $(document).on('mouseup', function (e) {
                if (e.target.id == 'jexcel_arrow') {
                    if (! $.fn.jexcel.current) {
                        $.fn.jexcel.current = $(e.target).parents('.jexcel').parent().prop('id');
                    }
                    $.fn.jexcel.selectedCell = $(e.target).parent().parent();
                    $('#' + $.fn.jexcel.current).jexcel('updateSelection', $.fn.jexcel.selectedCell, $.fn.jexcel.selectedCell);

                    // Open editor
                    $('#' + $.fn.jexcel.current).jexcel('openEditor', $.fn.jexcel.selectedCell);
                } else {
                    if (e.which != 3) {
                        // Hide context menu
                        $("#jexcel_contextmenu").css('display', 'none');
                    }

                    // Cancel any corner selection
                    $.fn.jexcel.selectedCorner = false;

                    // Update cell size
                    if ($.fn.jexcel.resizeColumn) {
                        // On resize
                        if (typeof($.fn.jexcel.defaults[$.fn.jexcel.current].onresize) == 'function') {
                            $.fn.jexcel.defaults[$.fn.jexcel.current].onresize($(this), $.fn.jexcel.resizeColumn.column, $.fn.jexcel.resizeColumn.width);
                        }
                        // Remove resizing border indication
                        $('#' + $.fn.jexcel.current).find('thead td').removeClass('resizing');
                        $('#' + $.fn.jexcel.current).find('tbody td').removeClass('resizing');
                        // Reset resizing helper
                        $.fn.jexcel.resizeColumn = null;
                    }

                    // Data to be copied
                    var selection = $('#' + $.fn.jexcel.current).find('tbody td.selection');

                    if ($(selection).length > 0) {
                        // First and last cells
                        var o = $(selection[0]).prop('id').split('-');
                        var d = $(selection[selection.length - 1]).prop('id').split('-');

                        // Copy data
                        $('#' + $.fn.jexcel.current).jexcel('copyData', o, d);

                        // Remove selection
                        $(selection).removeClass('selection selection-left selection-right selection-top selection-bottom');
                    }
                }

                // Execute the final move
                if ($.fn.jexcel.dragRowFrom) {
                    if ($.fn.jexcel.dragRowFrom != $.fn.jexcel.dragRowOver) {
                        // Get ids
                        o = $.fn.jexcel.dragRowFrom.split('-');
                        d = $.fn.jexcel.dragRowOver.split('-');
                        // Change data order
                        $.fn.jexcel.defaults[$.fn.jexcel.current].data.splice(d[1], 0, $.fn.jexcel.defaults[$.fn.jexcel.current].data.splice(o[1], 1)[0]);
                        // Reset data in a new order, ignore spare
                        $('#' + $.fn.jexcel.current).jexcel('setData', null, true);
                        // On move
                        if (typeof($.fn.jexcel.defaults[$.fn.jexcel.current].onmoverow) == 'function') {
                            $.fn.jexcel.defaults[$.fn.jexcel.current].onmoverow($(this), $.fn.jexcel.dragRowFrom, $.fn.jexcel.dragRowOver);
                        }
                    }

                    // Remove style
                    $('#' + $.fn.jexcel.dragRowFrom).css('cursor', '');
                    $('#' + $.fn.jexcel.dragRowOver).css('cursor', '');
                    $('#' + $.fn.jexcel.current + ' #' + $.fn.jexcel.dragRowOver).parent().find('td').css('background-color', '');
                }

                $.fn.jexcel.dragRowFrom = null;
                $.fn.jexcel.dragRowOver = null;
            });

            // Double click
            $(document).on('dblclick touchend', function (e) {
                // Jexcel is selected
                if ($.fn.jexcel.current) {
                    if ($.fn.jexcel.defaults[$.fn.jexcel.current].editable == true) {
                        // Corner action
                        if (e.target.id == 'corner') {
                            var selection = $('#' + $.fn.jexcel.current).find('tbody td.highlight');
                            // Any selected cells
                            if (typeof(selection) == 'object') {
                                // Get selected cells
                                var o = $(selection[0]).prop('id').split('-');
                                var d = $(selection[selection.length - 1]).prop('id').split('-');
                                // Double click copy
                                o[1] = parseInt(d[1]) + 1;
                                d[1] = parseInt($.fn.jexcel.defaults[$.fn.jexcel.current].data.length);
                                // Do copy
                                $('#' + $.fn.jexcel.current).jexcel('copyData', o, d);
                            }
                        }

                        // Open editor action
                        if ($(e.target).is('.highlight')) {
                            $('#' + $.fn.jexcel.current).jexcel('openEditor', $(e.target));
                        }
                    }

                    if ($.fn.jexcel.defaults[$.fn.jexcel.current].columnSorting == true) {
                        // Header found
                        if ($(e.target).parent().parent().is('thead')) {
                            var o = $(e.target).prop('id');
                            if (o) {
                                o = $(e.target).prop('id').split('-');
                                // Update order
                                $('#' + $.fn.jexcel.current).jexcel('orderBy', o[1]);
                            }
                        }
                    }
                }
            });

            $(document).on('mousemove', function (e) {
                if ($.fn.jexcel.current) {
                    if ($.fn.jexcel.defaults[$.fn.jexcel.current].columnResize == true) {
                        // Resizing is ongoing
                        if ($.fn.jexcel.resizeColumn) {
                           var width = e.pageX - $.fn.jexcel.resizeColumn.mousePosition;

                           if ($.fn.jexcel.resizeColumn.width + width > 0) {
                               $('#' + $.fn.jexcel.current).jexcel('setWidth', $.fn.jexcel.resizeColumn.column, $.fn.jexcel.resizeColumn.width + width);
                           }
                        } else {
                            // Header found
                            if ($(e.target).parent().parent().is('thead')) {
                                // Update cursor
                                if ($(e.target).outerWidth() - e.offsetX < 8 && $(e.target).prop('id') != '') {
                                    $(e.target).css('cursor', 'col-resize');
                                } else {
                                    $(e.target).css('cursor', '');
                                }
                            }
                        }
                    }

                    // Body found
                    if ($.fn.jexcel.defaults[$.fn.jexcel.current].rowDrag == true) {
                        if ($(e.target).parent().parent().is('tbody')) {
                            // Update row label selection
                            if ($(e.target).is('.jexcel_label')) {
                                if ($(e.target).outerWidth() - e.offsetX < 8) {
                                    $(e.target).css('cursor', 'all-scroll');
                                } else {
                                    $(e.target).css('cursor', '');
                                }
                            }
                        }
                    }

                    // Prevent page selection
                    if (! $($.fn.jexcel.selectedCell).hasClass('edition')) {
                        e.preventDefault();
                    }
                }

                // Keeping visual indication
                if ($.fn.jexcel.dragRowFrom) {
                    $('body').css('cursor', 'all-scroll');
                } else {
                    $('body').css('cursor', '');
                }
            });

            $(document).on('mouseover', function (e) {
                // No resizing is ongoing
                if (! $.fn.jexcel.resizeColumn) {
                    // Get jexcel table
                    var table = $(e.target).closest('.jexcel');

                    // If the user is in the current table
                    if ($.fn.jexcel.current == $(table).parent().prop('id')) {
                        // Header found
                        if ($(e.target).parent().parent().is('thead')) {
                            if ($.fn.jexcel.selectedHeader) {
                                // Updade selection
                                if (e.buttons) {
                                    var o = $($.fn.jexcel.selectedHeader).prop('id');
                                    var d = $(e.target).prop('id');
                                    if (o && d) {
                                        o = o.split('-');
                                        d = d.split('-');
                                        // Get cell objects 
                                        var o1 = $('#' + $.fn.jexcel.current).find('#' + o[1] + '-0');
                                        var o2 = $('#' + $.fn.jexcel.current).find('#' + d[1] + '-' + parseInt($.fn.jexcel.defaults[$.fn.jexcel.current].data.length - 1));
                                        // Update selection
                                        $('#' + $.fn.jexcel.current).jexcel('updateSelection', o1, o2);
                                    }
                                }
                            }
                        }

                        // Body found
                        if ($(e.target).parent().parent().is('tbody')) {
                            // Update row label selection
                            if ($(e.target).is('.jexcel_label')) {
                                if ($.fn.jexcel.selectedRow) {
                                    // Updade selection
                                    if (e.buttons) {
                                        var o = $($.fn.jexcel.selectedRow).prop('id');
                                        var d = $(e.target).prop('id');
                                        if (o && d) {
                                            o = o.split('-');
                                            d = d.split('-');
                                            // Get cell objects 
                                            var o1 = $('#' + $.fn.jexcel.current).find('#0-' + o[1]);
                                            var o2 = $('#' + $.fn.jexcel.current).find('#' + parseInt($.fn.jexcel.defaults[$.fn.jexcel.current].columns.length - 1) + '-'  + d[1]);
                                            // Update selection
                                            $('#' + $.fn.jexcel.current).jexcel('updateSelection', o1, o2);
                                        }
                                    }
                                } else if ($.fn.jexcel.dragRowFrom) {
                                    // Remove previous row visual background
                                    $('#' + $.fn.jexcel.current + ' #' + $.fn.jexcel.dragRowOver).parent().find('td').css('background-color', '');
                                    // Add new row visual background
                                    $(e.target).parent().find('td').css('background-color', 'rgba(0,0,0,0.1)');
                                    // Keep over reference
                                    $.fn.jexcel.dragRowOver = $(e.target).prop('id');
                                }
                            } else {
                                if ($.fn.jexcel.selectedCell) {
                                    if (! $($.fn.jexcel.selectedCell).hasClass('edition')) {
                                        if ($.fn.jexcel.selectedCorner == true) {
                                            // Copy option
                                            $('#' + $.fn.jexcel.current).jexcel('updateCornerSelection', $(e.target));
                                        } else {
                                            // Updade selection
                                            if (e.buttons) {
                                                $('#' + $.fn.jexcel.current).jexcel('updateSelection', $.fn.jexcel.selectedCell, $(e.target));
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            
            // Fixed headers
            /*$(document).bind("scroll", function() {
                if ($.fn.jexcel.current) {
                    // Positions
                    var offset = $(this).scrollTop();
                    var tableOffset = $('#' + $.fn.jexcel.current).position().top;
                    var tableHeight = $('#' + $.fn.jexcel.current).height();

                    // New cloned thead
                    var theadClose = $('#' + $.fn.jexcel.current + ' thead.jexcel_thead_clone');

                    if (offset < tableOffset + tableHeight) {
                        // Cloned headers
                        if ($(theadClose).length == 0) {
                            var tclone = $('#' + $.fn.jexcel.current + ' thead').clone();
                            $(tclone).addClass('jexcel_thead_clone');
                            $(tclone).css('display', 'none');
                            $(tclone).css('left', $('#' + $.fn.jexcel.current).css('left'));
                            $('#' + $.fn.jexcel.current + ' thead').after(tclone);
                        }

                        if (offset >= tableOffset && $(theadClose).css('display') == 'none') {
                            if ($(theadClose).css('display') == 'none') {
                                $(theadClose).css('display', '');
                            }
                            if ($(theadClose).css('width') < $('#' + $.fn.jexcel.current + ' thead').css('width')) {
                                $(theadClose).css('width', $('#' + $.fn.jexcel.current + ' thead').width());
                            }
                        } else if (offset < tableOffset) {
                            $(theadClose).remove();
                        }
                    } else {
                        // Remove in case exists
                        if ($(theadClose).length) {
                            $(theadClose).remove();
                        }
                    }
                }
            });*/

            // IE Compatibility
            $(document).on('paste', function (e) {
                if (! $($.fn.jexcel.selectedCell).hasClass('edition')) {
                    if (e.originalEvent) {
                        if ($.fn.jexcel.defaults[$.fn.jexcel.current].editable == true) {
                            $('#' + $.fn.jexcel.current).jexcel('paste', $.fn.jexcel.selectedCell, e.originalEvent.clipboardData.getData('text'));
                        }
                        e.preventDefault();
                    }
                }
            });

            // Keyboard controls
            var keyBoardCell = null;

            $(document).keydown(function(e) {
                if ($.fn.jexcel.current) {
                    // Support variables
                    var cell = null;
                    // Get current cell
                    if ($.fn.jexcel.selectedCell) {
                        columnId = $($.fn.jexcel.selectedCell).prop('id').split('-');

                        // Which key
                        if (e.which == 37) {
                            // Left arrow
                            if (! $($.fn.jexcel.selectedCell).hasClass('edition')) {
                                if (e.ctrlKey) {
                                    cell = $($.fn.jexcel.selectedCell).parent().find('td').not('.jexcel_label').first();
                                } else {
                                    cell = $($.fn.jexcel.selectedCell).prev();
                                }
                                e.preventDefault();
                            }
                        } else if (e.which == 39) {
                            // Right arrow
                            if (! $($.fn.jexcel.selectedCell).hasClass('edition')) {
                                if (e.ctrlKey) {
                                    cell = $($.fn.jexcel.selectedCell).parent().find('td').last();
                                } else {
                                    cell = $($.fn.jexcel.selectedCell).next();
                                }
                                e.preventDefault();
                            }
                        } else if (e.which == 38) {
                            // Top arrow
                            if (! $($.fn.jexcel.selectedCell).hasClass('edition')) {
                                if (e.ctrlKey) {
                                    cell = $($.fn.jexcel.selectedCell).parent().parent().find('tr').first().find('#' + columnId[0] + '-' + 0);
                                } else {
                                    cell = $($.fn.jexcel.selectedCell).parent().prev().find('#' + columnId[0] + '-' + (columnId[1] - 1));
                                }
                                e.preventDefault();
                            }
                        } else if (e.which == 40) {
                            // Bottom arrow
                            if (! $($.fn.jexcel.selectedCell).hasClass('edition')) {
                                if (e.ctrlKey) {
                                    cell = $($.fn.jexcel.selectedCell).parent().parent().find('tr').last().find('#' + columnId[0] + '-' + ($.fn.jexcel.defaults[$.fn.jexcel.current].data.length - 1));
                                } else {
                                    cell = $($.fn.jexcel.selectedCell).parent().next().find('#' + columnId[0] + '-' + (parseInt(columnId[1]) + 1));
                                }
                                e.preventDefault();
                            }
                        } else if (e.which == 27) {
                            // Escape
                            if ($($.fn.jexcel.selectedCell).hasClass('edition')) {
                                // Exit without saving
                                $('#' + $.fn.jexcel.current).jexcel('closeEditor', $($.fn.jexcel.selectedCell), false);
                            }
                        } else if (e.which == 13) {
                            // Edition in progress
                            if ($($.fn.jexcel.selectedCell).hasClass('edition')) {
                                // Exit saving data
                                if ($.fn.jexcel.defaults[$.fn.jexcel.current].columns[columnId[0]].type == 'calendar') {
                                    $('#' + $.fn.jexcel.current).find('editor').jcalendar('close', 1)
                                } else {
                                    $('#' + $.fn.jexcel.current).jexcel('closeEditor', $($.fn.jexcel.selectedCell), true);
                                }
                            }
                            // If not edition check if the selected cell is in the last row
                            if ($.fn.jexcel.defaults[$.fn.jexcel.current].allowInsertRow == true ) {
                                if ($.fn.jexcel.defaults[$.fn.jexcel.current].allowManualInsertRow == true) {
                                    if (columnId[1] == $.fn.jexcel.defaults[$.fn.jexcel.current].data.length - 1) {
                                        // New record in case selectedCell in the last row
                                        $('#' + $.fn.jexcel.current).jexcel('insertRow');
                                    }
                                }
                            }
                            // Go to the next line
                            cell = $($.fn.jexcel.selectedCell).parent().next().find('#' + columnId[0] + '-' + (parseInt(columnId[1]) + 1));
                            e.preventDefault();
                        } else if (e.which == 9) {
                            // Edition in progress
                            if ($($.fn.jexcel.selectedCell).hasClass('edition')) {
                                // Exit saving data
                                if ($.fn.jexcel.defaults[$.fn.jexcel.current].columns[columnId[0]].type == 'calendar') {
                                    $('#' + $.fn.jexcel.current).find('editor').jcalendar('close', 1)
                                } else {
                                    $('#' + $.fn.jexcel.current).jexcel('closeEditor', $($.fn.jexcel.selectedCell), true);
                                }
                            }
                            // Tab key - Get the id of the selected cell
                            if ($.fn.jexcel.defaults[$.fn.jexcel.current].allowInsertColumn == true) {
                                if ($.fn.jexcel.defaults[$.fn.jexcel.current].allowManualInsertColumn == true) {
                                    if (columnId[0] == $.fn.jexcel.defaults[$.fn.jexcel.current].data[0].length - 1) {
                                        // New record in case selectedCell in the last column
                                        $('#' + $.fn.jexcel.current).jexcel('insertColumn');
                                    }
                                }
                            }
                            // Highlight new column
                            if (! $($.fn.jexcel.selectedCell).hasClass('edition')) {
                               cell = $($.fn.jexcel.selectedCell).next();
                            }
                            e.preventDefault();
                        } else if (e.which == 46) {
                            // Delete (erase cell in case no edition is running)
                            if ($.fn.jexcel.defaults[$.fn.jexcel.current].editable == true) {
                                if (! $($.fn.jexcel.selectedCell).hasClass('edition')) {
                                    if ($.fn.jexcel.selectedRow) {
                                        if (confirm('Are you sure to delete the selected rows?')) {
                                            var rows = $('#' + $.fn.jexcel.current).find('tbody').find('.jexcel_label.selected');
                                            $('#' + $.fn.jexcel.current).jexcel('deleteRow', $(rows[0]).prop('id').split('-')[1], rows.length);

                                             $('#' + $.fn.jexcel.current).jexcel('resetSelection');
                                        }
                                    } else if ($.fn.jexcel.selectedHeader) {
                                        if (confirm('Are you sure to delete the selected columns?')) {
                                            var columns = $('#' + $.fn.jexcel.current).find('thead.jexcel_label').find('.selected');
                                            $('#' + $.fn.jexcel.current).jexcel('deleteColumn', $(columns).prop('id').split('-')[1], columns.length);

                                             $('#' + $.fn.jexcel.current).jexcel('resetSelection');
                                        }
                                    } else {
                                        // Change value
                                        $('#' + $.fn.jexcel.current).jexcel('setValue', $('#' + $.fn.jexcel.current).find('.highlight'), '');
                                    }
                                }
                            }
                        } else {
                            if (e.metaKey && ! e.shiftKey && ! e.ctrlKey) {
                                if (! $($.fn.jexcel.selectedCell).hasClass('edition')) {
                                    if (e.which == 67) {
                                        // Command + C, Mac
                                        $('#' + $.fn.jexcel.current).jexcel('copy', true);
                                        e.preventDefault();
                                    }
                                }
                            } else if (! e.ctrlKey) {
                                if ($.fn.jexcel.selectedCell) {
                                    if ($.fn.jexcel.defaults[$.fn.jexcel.current].editable == true) {
                                        // If is not readonly
                                        if ($.fn.jexcel.defaults[$.fn.jexcel.current].columns[columnId[0]].type != 'readonly') {
                                            // Start edition in case a valid character. 
                                            if (! $($.fn.jexcel.selectedCell).hasClass('edition')) {
                                                // Characters able to start a edition
                                                if ((e.keyCode == 110 || e.keyCode == 190) || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                                                    $('#' + $.fn.jexcel.current).jexcel('openEditor', $($.fn.jexcel.selectedCell), true);
                                                } else if (e.keyCode == 113) {
                                                    $('#' + $.fn.jexcel.current).jexcel('openEditor', $($.fn.jexcel.selectedCell), false);
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (! e.shiftKey && e.ctrlKey) {
                                if (! $($.fn.jexcel.selectedCell).hasClass('edition')) {
                                    if (e.which == 65) {
                                        // Ctrl + A
                                        // Get cell objects 
                                        var o1 = parseInt($.fn.jexcel.defaults[$.fn.jexcel.current].columns.length - 1);
                                        var o2 = parseInt($.fn.jexcel.defaults[$.fn.jexcel.current].data.length - 1);
                                        var o = $('#' + $.fn.jexcel.current).find('#0-0');
                                        var t = $('#' + $.fn.jexcel.current).find('#' + o1 + '-' + o2);
                                        $('#' + $.fn.jexcel.current).jexcel('updateSelection', o, t);
                                        // Prevent page selection
                                        e.preventDefault();
                                    } else if (e.which == 83) {
                                        // Ctrl + S
                                        $('#' + $.fn.jexcel.current).jexcel('download');
                                        // Prevent page selection
                                        e.preventDefault();
                                    } else if (e.which == 89) {
                                        // Ctrl + Y
                                        if (!$($.fn.jexcel.selectedCell).hasClass('edition')) {
                                            $('#' + $.fn.jexcel.current).jexcel('redo');
                                        }
                                        e.preventDefault();
                                    } else if (e.which == 90) {
                                        // Ctrl + Z
                                        if (!$($.fn.jexcel.selectedCell).hasClass('edition')) {
                                            $('#' + $.fn.jexcel.current).jexcel('undo');
                                        }
                                        e.preventDefault();
                                    } else if (e.which == 67) {
                                        // Ctrl + C
                                        $('#' + $.fn.jexcel.current).jexcel('copy', true);
                                        e.preventDefault();
                                    } else if (e.which == 88) {
                                        // Ctrl + X
                                        if ($.fn.jexcel.defaults[$.fn.jexcel.current].editable == true) {
                                            $('#' + $.fn.jexcel.current).jexcel('cut');
                                        } else {
                                            $('#' + $.fn.jexcel.current).jexcel('copy', true);
                                        }
                                        e.preventDefault();
                                    } else if (e.which == 86) {
                                        // Ctrl + V
                                        if (window.clipboardData) {
                                            if ($.fn.jexcel.defaults[$.fn.jexcel.current].editable == true) {
                                                $('#' + $.fn.jexcel.current).jexcel('paste', $.fn.jexcel.selectedCell, window.clipboardData.getData('Text'));
                                            }
                                            e.preventDefault();
                                        }
                                    }
                                }
                            }
                        }

                        // Arrows control
                        if (cell) {
                            // Control selected cell
                            if ($(cell).length > 0 && $(cell).prop('id').substr(0,3) != 'row') {
                                // In case of a multiple cell selection
                                if (e.shiftKey) {
                                    // Keep first selected cell
                                    if (! keyBoardCell) {
                                        keyBoardCell = $.fn.jexcel.selectedCell;
                                    }

                                    // Origin cell
                                    o = keyBoardCell;
                                } else if (e.ctrlKey) {
                                    // Remove previous cell
                                    keyBoardCell = null;

                                    o = cell;
                                } else {
                                    // Remove previous cell
                                    keyBoardCell = null;

                                    // Origin cell
                                    o = cell;
                                }

                                // Target cell
                                t = cell;

                                // Current cell
                                $.fn.jexcel.selectedCell = cell;

                                // Focus
                                $(cell).focus();

                                // Update selection
                                $('#' + $.fn.jexcel.current).jexcel('updateSelection', o, t);
                            }
                        }
                    }
                }
            });
        }

        // Load data
        $(this).jexcel('setData', $.fn.jexcel.defaults[id].data);
    },

    /**
     * Set data
     * 
     * @param array data In case no data is sent, default is reloaded
     * @return void
     */
    setData : function(data, ignoreSpare) {
        // Id
        var id = $(this).prop('id');

        // Update data
        if (data) {
            if (typeof(data) == 'string') {
                data = JSON.parse(data);
            }

            $.fn.jexcel.defaults[id].data = data;
        }

        // Create history track array
        $.fn.jexcel.defaults[id].history = [];
        $.fn.jexcel.defaults[id].historyIndex = -1;

        // Adjust minimal dimensions
        var size_i = $.fn.jexcel.defaults[id].colHeaders.length;
        var size_j = $.fn.jexcel.defaults[id].data.length;
        var min_i = $.fn.jexcel.defaults[id].minDimensions[0];
        var min_j = $.fn.jexcel.defaults[id].minDimensions[1];
        var max_i = min_i > size_i ? min_i : size_i;
        var max_j = min_j > size_j ? min_j : size_j;

        for (j = 0; j < max_j; j++) {
            for (i = 0; i < max_i; i++) {
                if ($.fn.jexcel.defaults[id].data[j] == undefined) {
                    $.fn.jexcel.defaults[id].data[j] = [];
                }

                if ($.fn.jexcel.defaults[id].data[j][i] == undefined) {
                    $.fn.jexcel.defaults[id].data[j][i] = '';
                }
            }
        }

        // Dynamic columns
        $.fn.jexcel.defaults[id].dynamicColumns = [];

        // Data container
        var tbody = $(this).find('tbody');

        // Reset data
        $(tbody).html('');

        // Records
        var records = [];

        // Create cells
        for (j = 0; j < $.fn.jexcel.defaults[id].data.length; j++) {
            // New line of data to be append in the table
            tr = document.createElement('tr');
            // Index column
            $(tr).append('<td id="row-' + j + '" class="jexcel_label">' + parseInt(j + 1) + '</td>'); 
            // Data columns
            for (i = 0; i < $.fn.jexcel.defaults[id].colHeaders.length; i++) {
                // New column of data to be append in the line
                td = $(this).jexcel('createCell', i, j);

                // Add column to the row
                $(tr).append(td);

                // Cell data
                records.push({
                    cell: $(td),
                    newValue: $.fn.jexcel.defaults[id].data[j][i],
                    oldValue: '',
                });
            }

            // Add row to the table body
            $(tbody).append(tr);
        }

        // Update values
        $(this).jexcel('loadCells', records);

        // Dynamic updates
        if ($.fn.jexcel.defaults[id].dynamicColumns.length > 0) {
            $(this).jexcel('formula');
        }

        // Spare columns and rows
        if (! ignoreSpare) {
            // Spare check
            $(this).jexcel('spareCheck');
        }

        // Update settings
        $(this).jexcel('updateSettings');

        // New data is ready
        if (data) {
            if (typeof($.fn.jexcel.defaults[id].onload) == 'function') {
                $.fn.jexcel.defaults[id].onload($(this));
            }
        }
    },

    /**
     * Update table settings helper. Update cells after loading
     * 
     * @param methods
     * @return void
     */
    updateSettings : function(options) {
        // Id
        var id = $(this).prop('id');

        // Keep options
        if (! options) {
            if ($.fn.jexcel.defaults[id].updateSettingsOptions) {
                options = $.fn.jexcel.defaults[id].updateSettingsOptions;
            }
        }

        // Go through all cells
        if (typeof(options) == 'object') {
            $.fn.jexcel.defaults[id].updateSettingsOptions = options;
            var cells = $(this).find('.jexcel tbody td').not('.jexcel_label');
            if (typeof(options.cells) == 'function') {
                $.each(cells, function (k, v) {
                    id = $(v).prop('id').split('-');
                    options.cells($(v), id[0], id[1]);
                });
            }
        }
    },

    /**
     * Open the editor
     * 
     * @param object cell
     * @return void
     */
    openEditor : function(cell, empty) {
        // Id
        var id = $(this).prop('id');

        // Main
        var main = $(this);

        // Options
        var options = $.fn.jexcel.defaults[id];

        // Get cell position
        var position = $(cell).prop('id').split('-');

        // Readonly
        if ($(cell).hasClass('readonly') == true) {
            // Do nothing
        } else {
            // Holder
            $.fn.jexcel.edition = $(cell).html();
            $.fn.jexcel.editionValue = $(this).jexcel('getValue', $(cell));

            // If there is a custom editor for it
            if (options.columns[position[0]].editor) {
                // Keep the current value
                $(cell).addClass('edition');

                // Custom editors
                options.columns[position[0]].editor.openEditor(cell);
            } else {
                // Native functions
                if (options.columns[position[0]].type == 'checkbox' || options.columns[position[0]].type == 'hidden') {
                    // Do nothing for checkboxes or hidden columns
                } else if (options.columns[position[0]].type == 'dropdown') {
                    // Keep the current value
                    $(cell).addClass('edition');

                    // Create dropdown
                    if (typeof(options.columns[position[0]].filter) == 'function') {
                        var source = options.columns[position[0]].filter($(this), $(cell), position[0], position[1], options.columns[position[0]].source);
                    } else {
                        var source = options.columns[position[0]].source;
                    }

                    var html = '<select>';
                    for (i = 0; i < source.length; i++) {
                        if (typeof(source[i]) == 'object') {
                            k = source[i].id;
                            v = source[i].name;
                        } else {
                            k = source[i];
                            v = source[i];
                        }
                        html += '<option value="' + k + '">' + v + '</option>';
                    }
                    html += '</select>';

                    // Get current value
                    var value = $(cell).find('input').val();

                    // Open editor
                    $(cell).html(html);

                    // Editor configuration
                    var editor = $(cell).find('select');
                    $(editor).change(function () {
                        $(main).jexcel('closeEditor', $(this).parent(), true);
                    });
                    $(editor).blur(function () {
                        $(main).jexcel('closeEditor', $(this).parent(), true);
                    });
                    
                    $(editor).focus();
                    if (value) {
                        $(editor).val(value);
                    }
                } else if (options.columns[position[0]].type == 'calendar') {
                    $(cell).addClass('edition');

                    // Get content
                    var value = $(cell).find('input').val();

                    // Basic editor
                    var editor = document.createElement('input');
                    $(editor).prop('class', 'editor');
                    $(editor).css('width', $(cell).width());
                    $(editor).val($(cell).text());
                    $(cell).html(editor);
                    $(cell).find('');
                    $(cell).focus();

                    options.columns[position[0]].options.onclose = function () {
                        $(main).jexcel('closeEditor', $(cell), true);
                    }

                    // Current value
                    $(editor).jcalendar(options.columns[position[0]].options);
                    $(editor).jcalendar('open', value);
                } else if (options.columns[position[0]].type == 'multiple') {
                    // List result
                    showResult = function(data, str) {
                        // Reset data
                        $(result).html('');
                        // Create options
                        $.each(data, function(k, v) {
                            if (typeof(v) == 'object') {
                                name = v.name;
                                id = v.id;
                            } else {
                                name = v;
                                id = v;
                            }

                            if (name.toLowerCase().indexOf(str.toLowerCase()) != -1) {
                                li = document.createElement('li');
                                $(li).prop('id', id)
                                $(li).html('<input type="checkbox"> ' + name);
                                $(li).mousedown(function (e) {
                                    $(this).parent().removeClass('selected');
                                    $(this).addClass('selected');
                                    //  $(main).jexcel('closeEditor', $(cell), true);
                                });
                                $(result).append(li);
                            }
                        });

                        if (! $(result).html()) {
                            $(result).html('<div style="padding:6px;">No result found</div>');
                        }
                        $(result).css('display', '');
                    }

                    // Keep the current value
                    $(cell).addClass('edition');

                    // Get content
                    var html = $(cell).text().trim();
                    var value = $(cell).find('input').val();

                    var source = options.columns[position[0]].source;

                    // Results
                    var result = document.createElement('div');
                    $(result).prop('class', 'results');
                    $(result).prop('tabindex', position[0]);
                    $(result).css('width', $(cell).outerWidth());
                    showResult(source, '');
                    $(cell).html(result);
                    $(result).focus();

                    // Current value

                    //$(editor).val(html);

                    // Close editor handler
                    $(result).blur(function () {
                        $(main).jexcel('closeEditor', $(cell), false);
                    });
                } else if (options.columns[position[0]].type == 'autocomplete') {
                    // List result
                    showResult = function(data, str) {
                        // Reset data
                        $(result).html('');
                        // Create options
                        $.each(data, function(k, v) {
                            if (typeof(v) == 'object') {
                                name = v.name;
                                id = v.id;
                            } else {
                                name = v;
                                id = v;
                            }

                            if (name.toLowerCase().indexOf(str.toLowerCase()) != -1) {
                                li = document.createElement('li');
                                $(li).prop('id', id)
                                $(li).html(name);
                                $(li).mousedown(function (e) {
                                    $(this).parent().removeClass('selected');
                                    $(this).addClass('selected');
                                    $(main).jexcel('closeEditor', $(cell), true);
                                });
                                $(result).append(li);
                            }
                        });

                        if (! $(result).html()) {
                            $(result).html('<div style="padding:6px;">No result found</div>');
                        }
                        $(result).css('display', '');
                    }

                    // Keep the current value
                    $(cell).addClass('edition');

                    // Get content
                    var html = $(cell).text().trim();
                    var value = $(cell).find('input').val();

                    // Basic editor
                    var editor = document.createElement('input');
                    $(editor).prop('class', 'editor');
                    $(editor).css('width', $(cell).width());

                    // Create dropdown
                    if (typeof(options.columns[position[0]].filter) == 'function') {
                        var source = options.columns[position[0]].filter($(this), $(cell), position[0], position[1], options.columns[position[0]].source);
                    } else {
                        var source = options.columns[position[0]].source;
                    }

                    // Results
                    var result = document.createElement('div');
                    $(result).prop('class', 'results');
                    $(result).css('width', $(cell).outerWidth());
                    showResult(source, html.trim());

                    // Search
                    var timeout = null;
                    $(editor).on('keyup', function (e) {
                        if (e.which == 38) {
                            // Top arrow
                            var resultOption = $(result).find('li.selected');

                            if ($(resultOption).length) {
                                $(resultOption).removeClass('selected');
                                $(resultOption).prev().addClass('selected');
                                $(result).scrollTop($(result).scrollTop() - 26);
                            }
                        } else if (e.which == 40) {
                            // Bottom arrow
                            var resultOption = $(result).find('li.selected');

                            if ($(resultOption).length) {
                                $(resultOption).removeClass('selected');
                                $(resultOption).next().addClass('selected');
                                $(result).scrollTop($(result).scrollTop() + 26);
                            } else {
                                resultOption = $(result).find('li');
                                $(resultOption[0]).addClass('selected');
                            }
                        } else {
                            // String
                            var str = $(this).val();

                            // Timeout
                            if (timeout) {
                                clearTimeout(timeout)
                            }

                            // Delay search
                            timeout = setTimeout(function () { 
                                // Search
                                if (options.columns[position[0]].url) {
                                    $.getJSON (options.columns[position[0]].url + '?q=' + str + '&r=' + $(main).jexcel('getRowData', position[1]).join(','), function (data) {
                                        showResult(data, str);
                                    });
                                } else if (source) {
                                    showResult(source, str);
                                }
                            }, 500);
                        }
                    });

                    $(cell).html(editor);
                    $(cell).append(result);

                    // Current value
                    $(editor).focus();
                    $(editor).val(html);

                    // Close editor handler
                    $(editor).blur(function () {
                        $(main).jexcel('closeEditor', $(cell), false);
                    });
                } else {
                    // Keep the current value
                    $(cell).addClass('edition');

                    if (options.wordWrap == true || options.columns[position[0]].wordWrap == true) {
                        var input = $(cell).find('textarea');
                    } else {
                        var input = $(cell).find('input');
                    }

                    // Get content
                    if ($(input).length) {
                        var html = $(input).val();
                    } else {
                        var html = $(cell).html();
                    }

                    // Basic editor
                    if (options.wordWrap == true || options.columns[position[0]].wordWrap == true) {
                        var editor = document.createElement('textarea');
                    } else {
                        var editor = document.createElement('input');
                    }
                    $(editor).prop('class', 'editor');
                    $(editor).css('width', $(cell).width());
                    $(editor).css('height', $(cell).height());
                    $(cell).html(editor);

                    // Bind mask
                    if (options.columns[position[0]].mask) {
                        if (! $.fn.masked) {
                            console.error('Jexcel: it was not possible to load the mask plugin.');
                        } else {
                            $(editor).mask(options.columns[position[0]].mask, options.columns[position[0]].options)
                        }
                    }

                    // Current value
                    $(editor).focus();
                    if (! empty) {
                        $(editor).val(html);
                    }

                    // Close editor handler
                    $(editor).blur(function () {
                        $(main).jexcel('closeEditor', $(this).parent(), true);
                    });
                }
            }
        }
    },

    /**
     * Close the editor and save the information
     * 
     * @param object cell
     * @param boolean save
     * @return void
     */
    closeEditor : function(cell, save) {
        // Remove edition mode mark
        $(cell).removeClass('edition');

        // Id
        var id = $(this).prop('id');

        // Options
        var options = $.fn.jexcel.defaults[id];

        // Cell identification
        var position = $(cell).prop('id').split('-');

        // Get cell properties
        if (save == true) {
            // If custom editor
            if (options.columns[position[0]].editor) {
                // Custom editor
                value = options.columns[position[0]].editor.closeEditor(cell, save);
            } else {
                // Native functions
                if (options.columns[position[0]].type == 'checkbox' || options.columns[position[0]].type == 'hidden') {
                    // Do nothing
                } else if (options.columns[position[0]].type == 'dropdown') {
                    // Get value
                    var value = $(cell).find('select').val();
                } else if (options.columns[position[0]].type == 'autocomplete') {
                    // Set value
                    var obj = $(cell).find('li.selected');
                    if (obj.length > 0) {
                        var value = $(obj).prop('id');
                    } else {
                        var value = '';
                    }
                } else if (options.columns[position[0]].type == 'calendar') {
                    var value = $(cell).find('.jcalendar_value').val();
                } else if (options.columns[position[0]].type == 'numeric') {
                    var value = $(cell).find('.editor').val();
                    if (value.substr(0,1) != '=') {
                        var value = Number(value) || 0;
                    }
                } else {
                    // Get content
                    var value = $(cell).find('.editor').val();
                }
            }

            // Get value from column and set the default
            $.fn.jexcel.defaults[id].data[position[1]][position[0]] = value;

            // Update cell
            $(this).jexcel('updateCells', [{
                cell: $(cell),
                newValue: value,
                oldValue: $.fn.jexcel.editionValue
            }]);
        } else {
            if (options.columns[position[0]].editor) {
                // Custom editor
                options.columns[position[0]].editor.closeEditor(cell, save);
            } else if (options.columns[position[0]].type == 'calendar') {
                // Do nothing - calendar will be closed without keeping the current value
            } else {
                // Restore value
                $(cell).html($.fn.jexcel.edition);

                // Finish temporary edition
                $.fn.jexcel.edition = null;
            }
        }
    },

    /**
     * Get the cell object
     * 
     * @param object cell
     * @return string value
     */
    getCell : function(cell) {
        // Convert in case name is excel liked ex. A10, BB92
        cell = $(this).jexcel('getIdFromColumnName', cell);
        // Get object based on a string ex. 12-1, 13-3
        cell = $(this).find('[id=' + cell +']');

        return cell;
    },

    /**
     * Get the value from a cell
     * 
     * @param object cell
     * @return string value
     */
    getValue : function(cell) {
        var value = null;

        // If is a string get the cell object
        if (typeof(cell) != 'object') {
            // Convert in case name is excel liked ex. A10, BB92
            cell = $(this).jexcel('getIdFromColumnName', cell);
            // Get object based on a string ex. 12-1, 13-3
            cell = $(this).find('[id=' + cell +']');
        }

        // If column exists
        if ($(cell).length) {
            // Id
            var id = $(this).prop('id');

            // Global options
            var options = $.fn.jexcel.defaults[id];

            // Configuration
            var position = $(cell).prop('id').split('-');

            // Get value based on the type
            if (options.columns[position[0]].editor) {
                // Custom editor
                value = options.columns[position[0]].editor.getValue(cell);
            } else {
                // Native functions
                if (options.columns[position[0]].type == 'checkbox') {
                    // Get checkbox value
                    value = $(cell).find('input').is(':checked') ? '1' : '0';
                } else if (options.columns[position[0]].type == 'dropdown' || options.columns[position[0]].type == 'autocomplete' || options.columns[position[0]].type == 'calendar') {
                    // Get value
                    value = $(cell).find('input').val();
                } else if (options.columns[position[0]].type == 'currency') {
                    value = $(cell).html().replace( /\D/g, '');
                } else {
                    // Get default value
                    value = $(cell).find('input');
                    if ($(value).length) {
                        value = $(value).val(); 
                    } else {
                        value = $(cell).html();
                    }
                }
            }
        }

        return value;
    },

    /**
     * Set a cell value
     * 
     * @param object cell destination cell
     * @param object value value
     * @return void
     */
    setValue : function(cell, value) {
        // If is a string get the cell object
        if (typeof(cell) !== 'object') {
            // Convert in case name is excel liked ex. A10, BB92
            cell = $(this).jexcel('getIdFromColumnName', cell);
            // Get object based on a string ex. 12-1, 13-3
            cell = $(this).find('[id=' + cell +']');
        }

        // If column exists
        if ($(cell).length) {
            // Id
            var id = $(this).prop('id');

            // Main object
            var main = $(this);

            // Global options
            var options = $.fn.jexcel.defaults[id];

            // Records to be updated
            var records = [];

            // Go throw all cells
            $.each(cell, function(k, v) {
                // Update cell
                records.push({
                    cell: $(v),
                    newValue: value,
                    oldValue: $(main).jexcel('getValue', $(v)),
                });
            });

            // Update cells
            $(this).jexcel('updateCells', records);

            return true;
        } else {
            return false;
        }
    },

    /**
     * Load cell content
     * 
     * @param object destination cells
     * @return void
     */
    loadCells : function(cells)
    {
        // Id
        var id = $(this).prop('id');

        // Main object
        var main = $(this);

        // Global options
        var options = $.fn.jexcel.defaults[id];

        // Update cells
        $.each(cells, function (k, v) {
            // Update 
            $(main).jexcel('updateCell', v, true);
        });
    },

    /**
     * Update cells content
     * 
     * @param object destination cells
     * @param bool ignoreHistory - keep cell change out of the undo/redo history
     * @return void
     */
    updateCells : function(cells, ignoreHistory)
    {
        // Id
        var id = $(this).prop('id');

        // Main object
        var main = $(this);

        // Global options
        var options = $.fn.jexcel.defaults[id];

        // Update cells
        $.each(cells, function (k, v) {
            // Before Change
            if (typeof(options.onbeforechange) == 'function') {
                options.onbeforechange(main, $(v.cell), v.oldValue, v.newValue);
            }

            // Update 
            $(main).jexcel('updateCell', v, false);

            // Change
            if (typeof(options.onchange) == 'function') {
                options.onchange(main, $(v.cell), v.newValue, v.oldValue);
            }
        });

        // After changes
        $(this).jexcel('afterChange');

        // Keeping history of changes
        if (! ignoreHistory) {
            $(this).jexcel('setHistory', cells);
        }
    },

    /**
     * Update cell content
     * 
     * @param object cell
     * @return void
     */
    updateCell : function(v, force) {
        // Id
        var id = $(this).prop('id');

        // Global options
        var options = $.fn.jexcel.defaults[id];

        // Cell identification
        var position = $(v.cell).prop('id').split('-');

        // Value
        value = '' + v.newValue;

        // Changing value depending on the column type
        if (options.columns[position[0]].editor) {
            // Custom editor
            options.columns[position[0]].editor.setValue($(v.cell), value);
        } else if ($(v.cell).hasClass('readonly') == true && force == false) {
            // Do nothing
            value = null;
        } else {
            // Native functions
            if (options.columns[position[0]].type == 'checkbox') {
                if (value == 1 || value == true) {
                    $(v.cell).find('input').prop('checked', true);
                } else {
                    $(v.cell).find('input').prop('checked', false);
                }
                v.oldValue = !v.newValue;
            } else if (options.columns[position[0]].type == 'dropdown' || options.columns[position[0]].type == 'autocomplete') {
                // Dropdown and autocompletes
                key = '';
                val = '';
                if (value) {
                    var combo = [];
                    var source = options.columns[position[0]].source;

                    for (num = 0; num < source.length; num++) {
                        if (typeof(source[num]) == 'object') {
                            combo[source[num].id] = source[num].name;
                        } else {
                            combo[source[num]] = source[num];
                        }
                    }

                    if (combo[value]) {
                        key = value;
                        val = combo[value];
                    } else {
                        val = null;
                    }
                }

                if (! val) {
                    val = '&nbsp';
                }
                $(v.cell).html('<input type="hidden" value="' +  key + '">' + val + '<span class="jexcel_arrow"><span id="jexcel_arrow"></span></span>');
            } else if (options.columns[position[0]].type == 'calendar') {
                val = '';
                if (value != 'undefined') {
                    val = $.fn.jcalendar('label', value, options.columns[position[0]].options.format);
                } else {
                    val = '';
                }
                $(v.cell).html('<input type="hidden" value="' + value + '">' + val);
            } else if (options.columns[position[0]].type == 'numeric') {
                // Value
                val = value;

                if (value) {
                    if (value.substr(0,1) == '=') {
                        if ($.fn.jexcel.defaults[id].dynamicColumns.indexOf($(v.cell).prop('id')) == -1) {
                            $.fn.jexcel.defaults[id].dynamicColumns.push($(v.cell).prop('id'));
                        }
                    }
                }

                $(v.cell).html('<input type="hidden" value="' + value + '">' + val);
            } else {
                // Value
                val = value;

                if (value) {
                    if (value.substr(0,1) == '=') {
                        if ($.fn.jexcel.defaults[id].dynamicColumns.indexOf($(v.cell).prop('id')) == -1) {
                            $.fn.jexcel.defaults[id].dynamicColumns.push($(v.cell).prop('id'));
                        }
                    }
                }

                $(v.cell).html(value);
            }
        }

        // Get value from column and set the default
        $.fn.jexcel.defaults[id].data[position[1]][position[0]] = value;
    },

    /**
     * Update the cells selection
     * 
     * @param object o cell origin
     * @param object d cell destination
     * @return void
     */
    updateSelection : function(o, d, ignoreEvents, origin) {
        // Main table
        var main = $(this);

        // Id
        var id = $(this).prop('id');

        // Cells
        var cells = $(this).find('tbody td');
        var header = $(this).find('thead td');

        // Keep previous selection status
        var previousStatus = ($(this).find('.highlight').length > 0) ? true : false;
        var currentStatus = false;

        // Remove highlight
        $(cells).removeClass('highlight');
        $(cells).removeClass('highlight-left');
        $(cells).removeClass('highlight-right');
        $(cells).removeClass('highlight-top');
        $(cells).removeClass('highlight-bottom');

        // Update selected column
        $(header).removeClass('selected');
        $(cells).removeClass('selected');

        // Origin & Destination
        if (o && d) {
            $(o).addClass('selected');

            // Define coordinates
            or = $(o).prop('id').split('-');
            de = $(d).prop('id').split('-');

            if (parseInt(or[0]) < parseInt(de[0])) {
                px = parseInt(or[0]);
                ux = parseInt(de[0]);
            } else {
                px = parseInt(de[0]);
                ux = parseInt(or[0]);
            }

            if (parseInt(or[1]) < parseInt(de[1])) {
                py = parseInt(or[1]);
                uy = parseInt(de[1]);
            } else {
                py = parseInt(de[1]);
                uy = parseInt(or[1]);
            }

            // Redefining styles
            for (i = px; i <= ux; i++) {
                for (j = py; j <= uy; j++) {
                    $(this).find('#' + i + '-' + j).addClass('highlight');
                    $(this).find('#' + px + '-' + j).addClass('highlight-left');
                    $(this).find('#' + ux + '-' + j).addClass('highlight-right');
                    $(this).find('#' + i + '-' + py).addClass('highlight-top');
                    $(this).find('#' + i + '-' + uy).addClass('highlight-bottom');

                    // Row and column headers
                    $(main).find('#col-' + i).addClass('selected');
                    $(main).find('#row-' + j).addClass('selected');
                }
            }

            // Get current selection status
            var currentStatus = true;
        }

        if (! ignoreEvents) {
            if ($.fn.jexcel.defaults[id].onblur) {
                if (typeof($.fn.jexcel.defaults[id].onblur) == 'function') {
                    if (previousStatus == true && currentStatus == false) {
                        $.fn.jexcel.defaults[id].onblur($(this));
                    }
                }
            }

            if ($.fn.jexcel.defaults[id].onfocus) {
                if (typeof($.fn.jexcel.defaults[id].onfocus) == 'function') {
                    if (previousStatus == false && currentStatus == true) {
                        $.fn.jexcel.defaults[id].onfocus($(this));
                    }
                }
            }

            if (currentStatus == true) {
                // Events
                if (! ignoreEvents) {
                    if ($.fn.jexcel.defaults[id].onselection) {
                        if (typeof($.fn.jexcel.defaults[id].onselection) == 'function') {
                            $.fn.jexcel.defaults[id].onselection($(this), o, d, origin);
                        }
                    }
                }
            }
        }

        // Keep real selection : different from visual selection
        if (o && d) {
            $.fn.jexcel.selection = [o, d];
        } else {
            $.fn.jexcel.selection = null;
        }

        // Find corner cell
        $(this).jexcel('updateCornerPosition');
    },

    /**
     * Update the cells move data TODO: copy multi columns - TODO!
     *
     * @param object o cell origin
     * @param object d cell destination
     * @return void
     */
    updateCornerSelection : function(current) {
        // Main table
        var main = $(this);

        // Remove selection
        var cells = $(this).find('tbody td');
        $(cells).removeClass('selection');
        $(cells).removeClass('selection-left');
        $(cells).removeClass('selection-right');
        $(cells).removeClass('selection-top');
        $(cells).removeClass('selection-bottom');

        // Get selection
        var selection = $(this).find('tbody td.highlight');

        // Get elements first and last
        var s = $(selection[0]).prop('id').split('-');
        var d = $(selection[selection.length - 1]).prop('id').split('-');

        // Get current
        var c = $(current).prop('id').split('-');

        // Vertical copy
        if (c[1] > d[1] || c[1] < s[1]) {
            // Vertical
            var px = parseInt(s[0]);
            var ux = parseInt(d[0]);
            if (parseInt(c[1]) > parseInt(d[1])) {
                var py = parseInt(d[1]) + 1;
                var uy = parseInt(c[1]);
            } else {
                var py = parseInt(c[1]);
                var uy = parseInt(s[1]) - 1;
            }
        } else if (c[0] > d[0] || c[0] < s[0]) {
            // Horizontal copy
            var py = parseInt(s[1]);
            var uy = parseInt(d[1]);
            if (parseInt(c[0]) > parseInt(d[0])) {
                var px = parseInt(d[0]) + 1;
                var ux = parseInt(c[0]);
            } else {
                var px = parseInt(c[0]);
                var ux = parseInt(s[0]) - 1;
            }
        }

        for (j = py; j <= uy; j++) {
            for (i = px; i <= ux; i++) {
                $(this).find('#' + i + '-' + j).addClass('selection');
                $(this).find('#' + i + '-' + py).addClass('selection-top');
                $(this).find('#' + i + '-' + uy).addClass('selection-bottom');
                $(this).find('#' + px + '-' + j).addClass('selection-left');
                $(this).find('#' + ux + '-' + j).addClass('selection-right');
            }
        }
    },

    /**
     * Update corner position
     * 
     * @return void
     */
    updateCornerPosition : function() {
        var cells = $(this).find('.highlight');
        if ($(cells).length) { 
            corner = $(cells).last();

            // Get the position of the corner helper
            var t = parseInt($(corner).offset().top) + $(corner).parent().outerHeight() - 4;
            var l = parseInt($(corner).offset().left) + $(corner).outerWidth() - 4;

            // Place the corner in the correct place
            $('.jexcel_corner').css('top', t);
            $('.jexcel_corner').css('left', l);
        }
    },

    /**
     * Get the data from a row
     * 
     * @param integer row number
     * @return string value
     */
    getRowData : function(row) {
       // Get row
       row = $(this).find('#row-' + row).parent().find('td').not(':first');

       // String
       var arr = [];

       // Search all tds in a row
       if (row.length > 0) {
          for (i = 0; i < row.length; i++) {
             arr.push($(this).jexcel('getValue', $(row)[i]));
          }
       }

       return arr;
    },

    /**
     * Get the whole table data
     * 
     * @param integer row number
     * @return string value
     */
    getData : function(highlighted) {
        // Control vars
        var dataset = [];
        var px = 0;
        var py = 0;

        // Column and row length
        var x = $(this).find('thead tr td').not(':first').length;
        var y = $(this).find('tbody tr').length;

        // Go through the columns to get the data
        for (j = 0; j < y; j++) {
            px = 0;
            for (i = 0; i < x; i++) {
                // Cell
                cell = $(this).find('#' + i + '-' + j);

                // Cell selected or fullset
                if (! highlighted || $(cell).hasClass('highlight')) {
                    // Get value
                    if (! dataset[py]) {
                        dataset[py] = [];
                    }
                    dataset[py][px] = $(this).jexcel('getValue', $(cell));
                    px++;
                }
            }
            if (px > 0) {
                py++;
            }
        }

       return dataset;
    },

    /**
     * Copy method
     * 
     * @param bool highlighted - Get only highlighted cells
     * @param delimiter - \t default to keep compatibility with excel
     * @return string value
     */
    copy : function(highlighted, delimiter, returnData) {
        if (! delimiter) {
            delimiter = "\t";
        }

        var str = '';
        var row = '';
        var val = '';
        var pc = false;
        var pr = false;

        // Column and row length
        var x = $(this).find('thead tr td').not(':first').length;
        var y = $(this).find('tbody tr').length;

        // Go through the columns to get the data
        for (j = 0; j < y; j++) {
            row = '';
            pc = false;
            for (i = 0; i < x; i++) {
                // Get cell
                cell = $(this).find('#' + i + '-' + j);

                // If cell is highlighted
                if (! highlighted || $(cell).hasClass('highlight')) {
                    if (pc) {
                        row += delimiter;
                    }
                    // Get value
                    val = $(this).jexcel('getValue', $(cell));
                    if (val.match(/,/g) || val.match(/\n/)) {
                        val = '"' + val + '"'; 
                    }
                    row += val;
                    pc = true;
                }
            }
            if (row) {
                if (pr) {
                    str += "\n";
                }
                str += row;
                pr = true;
            }
        }

        // Create a hidden textarea to copy the values
        if (! returnData) {
            txt = $('.jexcel_textarea');
            $(txt).val(str);
            $(txt).select();
            document.execCommand("copy");
        }

        return str;
    },
    
    /**
     * jExcel cut method
     */ 
    cut : function () {
        var main = $(this);

        // Copy data
        $(this).jexcel('copy', true);
        var cells = $(this).find('.highlight');

        // Remove current data
        $(this).jexcel('setValue', cells, '');
    },

    /**
     * jExcel paste method
     * 
     * @param integer row number
     * @return string value
     */
    paste : function(cell, data) {
        // Id
        var id = $(this).prop('id');

        // Parse paste
        data = $(this).jexcel('parseCSV', data, "\t")

        // Initial position
        var position = $(cell).prop('id');
        if (position) {
            position = position.split('-');
            var x = parseInt(position[0]);
            var y = parseInt(position[1]);

            // Automatic adding new rows when the copied data is larger then the table
            if (y + data.length > $.fn.jexcel.defaults[id].data.length) {
                $(this).jexcel('insertRow', y + data.length - $.fn.jexcel.defaults[id].data.length);
            }
            // Automatic adding new columns when the copied data is larger then the table
            if (data[0]) {
                row = data[0];
                if (x + row.length > $.fn.jexcel.defaults[id].data[y].length) {
                    $(this).jexcel('insertColumn', x + row.length - $.fn.jexcel.defaults[id].data[y].length);
                }
            }

            // Records
            var records = []; 

            // Go through the columns to get the data
            for (j = 0; j < data.length; j++) {
                // Explode column values
                row = data[j];
                for (i = 0; i < row.length; i++) {
                    // Get cell
                    cell = $(this).find('#' + (parseInt(i) + parseInt(x))  + '-' + (parseInt(j) + parseInt(y)));

                    // If cell exists
                    if ($(cell).length > 0) {
                        // Keep cells history
                        records.push({
                            cell: $(cell),
                            newValue: row[i],
                            oldValue: $(this).jexcel('getValue', $(cell)),
                        });
                    }
                }
            }

            // Save history
            if (records.length > 0) {
                // Update new values
                $(this).jexcel('updateCells', records);
            }
        }
    },

    /**
     * Based on script by Ben Nadel
     */
    parseCSV : function(CSV_string, delimiter)
    {
        // user-supplied delimeter or default comma
        delimiter = (delimiter || ","); 
        // regular expression to parse the CSV values.
        var pattern = new RegExp(
          ( // Delimiters:
            "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + delimiter + "\\r\\n]*))"
          ), "gi"
        );

        var rows = [[]];  // array to hold our data. First row is column headers.
        // array to hold our individual pattern matching groups:
        var matches = false; // false if we don't find any matches
        // Loop until we no longer find a regular expression match
        while (matches = pattern.exec( CSV_string )) {
            var matched_delimiter = matches[1]; // Get the matched delimiter
            // Check if the delimiter has a length (and is not the start of string)
            // and if it matches field delimiter. If not, it is a row delimiter.
            if (matched_delimiter.length && matched_delimiter !== delimiter) {
              // Since this is a new row of data, add an empty row to the array.
              rows.push( [] );
            }
            var matched_value;
            // Once we have eliminated the delimiter, check to see what kind of value was captured (quoted or unquoted):
            if (matches[2]) { // found quoted value. unescape any double quotes.
                matched_value = matches[2].replace(new RegExp( "\"\"", "g" ), "\"");
            } else {
                // found a non-quoted value
                matched_value = matches[3];
            }
            // Now that we have our value string, let's add it to the data array.
            rows[rows.length - 1].push(matched_value);
        }

        return rows; // Return the parsed data Array
    },

    /**
     * Insert a new column
     * 
     * @param  object properties - column properties
     * @param  int numColumns - number of columns to be created
     * @return void
     */
    insertColumn : function (numColumns, properties, position, ignoreEvents) {
        var main = $(this);

        // Id
        var id = $(this).prop('id');

        // Number of columns to be created
        if (! numColumns) {
            numColumns = 1;
        }

        // Minimal default properties
        var defaults = {
            column: { type:'text' },
            width:'50',
            align:'center'
        };
        properties = $.extend(defaults, properties);

        // Get the main object configuration
        var options = $.fn.jexcel.defaults[id];

        // Records
        var records = [];

        // Configuration
        if (options.allowInsertColumn == true) {
            // Current column number
            var num = options.colHeaders.length;

            // Create columns
            for (i = num; i < (num + numColumns); i++) {
                // Adding the column properties to the main property holder
                options.colHeaders[i] = properties.header || $.fn.jexcel('getColumnName', i);
                options.colWidths[i] = properties.width;
                options.colAlignments[i] = properties.align;
                options.columns[i] = properties.column;

                if (! options.columns[i].source) {
                    $.fn.jexcel.defaults[id].columns[i].source = [];
                }
                if (! options.columns[i].options) {
                    $.fn.jexcel.defaults[id].columns[i].options = [];
                }

                // Default header cell properties
                width = options.colWidths[i];
                align = options.colAlignments[i];
                header = options.colHeaders[i];

                // Create header html
                var td =  '<td id="col-' + i + '" width="' + width + '" align="' + align + '">' + header + '</td>';

                // Add element to the table
                var tr = $(this).find('thead.jexcel_label tr')[0];
                $(tr).append(td);

                // Add columns to the content rows
                tr = $(this).find('table > tbody > tr');
                $.each(tr, function (k, v) {
                    // Update data array
                    options.data[k][i] = '';

                    // HTML cell
                    td = $(main).jexcel('createCell', i, k);

                    // Append cell to the tbody
                    $(v).append(td);

                    // Cell data
                    records.push({
                        cell: $(td),
                        newValue: '',
                        oldValue: '',
                    });
                });
            }

            // Update cells
            $(this).jexcel('loadCells', records, true);

            // Insert row
            if (! ignoreEvents) {
                if (typeof(options.oninsertcolumn) == 'function') {
                    options.oninsertcolumn($(this));
                }
            }

            // After changes
            $(this).jexcel('afterChange');
        }
    },

    /**
     * Insert a new row
     * 
     * @param object numLines - how many lines to be included
     * @return void
     */
    insertRow : function(numLines, position, ignoreEvents) {
        // Id
        var id = $(this).prop('id');

        // Main configuration
        var options = $.fn.jexcel.defaults[id];

        // Records
        var records = [];

        // Configuration
        if (options.allowInsertRow == true) {
            // Num lines
            if (! numLines) {
                // Add one line is the default
                numLines = 1;
            }

            j = parseInt($.fn.jexcel.defaults[id].data.length);

            // Adding lines
            for (row = 0; row < numLines; row++) {
                // New line of data to be append in the table
                tr = document.createElement('tr');
                // Index column
                $(tr).append('<td id="row-' + j + '" class="jexcel_label">' + parseInt(j + 1) + '</td>');
                // New data
                $.fn.jexcel.defaults[id].data[j] = [];

                for (i = 0; i < $.fn.jexcel.defaults[id].colHeaders.length; i++) {
                    // New Data
                    $.fn.jexcel.defaults[id].data[j][i] = '';

                    // New column of data to be append in the line
                    td = $(this).jexcel('createCell', i, j);

                    // Add column to the row
                    $(tr).append(td);

                    // Cell data
                    records.push({
                        cell: $(td),
                        newValue: '',
                        oldValue: '',
                    });
                }
                // Add row to the table body
                $(this).find('tbody').append(tr);
    
                j++;
            }

            // Update cells
            $(this).jexcel('loadCells', records, true);

            // Insert row
            if (! ignoreEvents) {
                if (typeof(options.oninsertrow) == 'function') {
                    options.oninsertrow($(this));
                }
            }

            // After changes
            $(this).jexcel('afterChange');
        }
    },

    /**
     * Delete a row by number
     * 
     * @param integer lineNumber - line show be excluded
     * @param integer numOfRows - number of lines
     * @return void
     */
    deleteRow : function(lineNumber, numOfRows) {
        // Id
        var id = $(this).prop('id');

        if (! parseInt(numOfRows)) {
            numOfRows = 1;
        }

        // Main configuration
        var options = $.fn.jexcel.defaults[id];

        // Global Configuration
        if (options.allowDeleteRow == true) {
            // Can't remove the last row
            if (options.data.length > 1) {
                if (parseInt(lineNumber) > -1) {
                    // Remove from source
                    $.fn.jexcel.defaults[id].data.splice(parseInt(lineNumber), numOfRows);
                    // Update table
                    $(this).jexcel('setData');
                }

                // Delete
                if (typeof(options.ondeleterow) == 'function') {
                    options.ondeleterow($(this));
                }

                // After changes
                $(this).jexcel('afterChange');
            } else {
                console.error('It is not possible to delete the last row');
            }
        }
    },

    /**
     * Delete a column by number
     * 
     * @TODO: need to recreate the headers
     * @param integer columnNumber - column show be excluded
     * @return void
     */
    deleteColumn : function(columnNumber, numberOfColumns) {
        // Id
        var id = $(this).prop('id');

        if (! parseInt(numberOfColumns)) {
            numberOfColumns = 1;
        }

        // Main configuration
        var options = $.fn.jexcel.defaults[id];

        // Global Configuration
        if (options.allowDeleteColumn == true) {
            // Can't remove the last column
            if (options.data[0].length > 1) {
                if (parseInt(columnNumber) > -1) {
                    // Default headers
                    options.columns.splice(parseInt(columnNumber), numberOfColumns);
                    options.colHeaders.splice(parseInt(columnNumber), numberOfColumns);
                    options.colAlignments.splice(parseInt(columnNumber), numberOfColumns);
                    options.colWidths.splice(parseInt(columnNumber), numberOfColumns);

                    // Delete data from source
                    for (j = 0; j < $.fn.jexcel.defaults[id].data.length; j++) {
                        // Remove column from each line
                        options.data[j].splice(parseInt(columnNumber), numberOfColumns);
                    }

                    // Update table
                    $(this).find('.c' + parseInt(columnNumber)).remove();
                    $(this).find('#col-' + parseInt(columnNumber)).remove();

                    // Update data
                    $(this).jexcel('resetHeaders');
                    $(this).jexcel('setData');
                }

                // Delete
                if (typeof(options.ondeletecolumn) == 'function') {
                    options.ondeletecolumn($(this));
                }

                // After changes
                $(this).jexcel('afterChange');
            } else {
                console.error('It is not possible to delete the last column');
            }
        }
    },

    /**
     * Set the column width
     * @param column - column number (first column is: 0)
     * @param width - new column width
     */
    setWidth : function (column, width) {
        if (width > 0) {
            // In case the column is an object
            if (typeof(column) == 'object') {
                column = $(column).prop('id').split('-');
                column = column[0];
            }

            var col = $(this).find('thead #col-' + column);
            if (col.length) {
                $(col).prop('width', width);
            }
        }
    },

    /**
     * Get the column width
     * @param column - column number (first column is: 0)
     * @return width - current column width
     */
    getWidth : function (column) {
        // In case the column is an object
        if (typeof(column) == 'object') {
            column = $(column).prop('id').split('-');
            column = column[0];
        }

        var col = $(this).find('thead #col-' + column);

        if (col.length) {
            return $(col).prop('width');
        }
    },

    /**
     * Get the column title
     * @param column - column number (first column is: 0)
     * @param title - new column title
     */
    getHeader : function (column) {
        var col = $(this).find('thead #col-' + column);
        if (col.length) {
            return $(col).html();
        }
    },

    /**
     * Set the column title
     * @param column - column number (first column is: 0)
     * @param title - new column title
     */
    setHeader : function (column, title) {
        if (title) {
            var col = $(this).find('thead #col-' + column);
            if (col.length) {
                $(col).html(title);
            }
        }
    },

    /**
     * Reset the headers
     */
    resetHeaders : function () {
        // Id
        var id = $(this).prop('id');

        // Options
        var options = $.fn.jexcel.defaults[id];

        // Create headers
        var tr = '<td width="30" class="jexcel_label"></td>';

        for (i = 0; i < options.colHeaders.length; i++) {
            // Default header cell properties
            width = options.colWidths[i];
            align = options.colAlignments[i];
            header = options.colHeaders[i];

            // Column type hidden
            if (options.columns[i].type == 'hidden') {
                // TODO: when it is first check the whole selection not include
                tr += '<td id="col-' + i + '" style="display:none;">' + options.colHeaders[i] + '</td>';
            } else {
                // Other column types
                tr += '<td id="col-' + i + '" width="' + width + '" align="' + align +'">' + header + '</td>';
            }
        }

        // Append content
        $(this).find('thead.jexcel_label').html('<tr>' + tr + '</tr>');
    },

    /**
     * Update column source for dropboxes
     */
    setSource : function (column, source) {
        // In case the column is an object
        if (typeof(column) == 'object') {
            column = $(column).prop('id').split('-');
            column = column[0];
        }

        // Id
        var id = $(this).prop('id');

        // Update defaults
        $.fn.jexcel.defaults[id].columns[column].source = source;
    },

    /**
     * After change
     */
    afterChange : function(ignoreSpare) {
        // Id
        var id = $(this).prop('id');

        // Dynamic updates
        if ($.fn.jexcel.defaults[id].dynamicColumns.length > 0) {
            $(this).jexcel('formula');
        }

        // After Changes
        if (typeof($.fn.jexcel.defaults[id].onafterchange) == 'function') {
            $.fn.jexcel.defaults[id].onafterchange($(this));
        }

        if (! ignoreSpare) {
            // Spare check
            $(this).jexcel('spareCheck');
        }

        // Update position
        $(this).jexcel('updateCornerPosition');

        // Update settings
        $(this).jexcel('updateSettings');
    },

    /**
     * Helper function to copy data using the corner icon
     */
    copyData : function(o, d) {
        // Get data from all selected cells
        var data = $(this).jexcel('getData', true);

        // Cells
        var px = parseInt(o[0]);
        var ux = parseInt(d[0]);
        var py = parseInt(o[1]);
        var uy = parseInt(d[1]);

        // Records
        var records = []; 

        // Copy data procedure
        var posx = 0;
        var posy = 0;
        for (j = py; j <= uy; j++) {
            // Controls
            if (data[posy] == undefined) {
                posy = 0;
            }
            posx = 0;

            // Data columns
            for (i = px; i <= ux; i++) {
                // Column
                if (data[posy] == undefined) {
                    posx = 0;
                } else if (data[posy][posx] == undefined) {
                    posx = 0;
                }

                // Get cell
                cell = $(this).find('#' + i + '-' + j);

                // Update non-readonly
                if ($(cell).length && ! $(cell).hasClass('readonly')) {
                    // Keep cells history
                    records.push({
                        cell: $(cell),
                        newValue: data[posy][posx],
                        oldValue: $(this).jexcel('getValue', $(cell)),
                    });
                }
                posx++;
            }
            posy++;
        }

        // Save data
        if (records.length > 0) {
            $(this).jexcel('updateCells', records);
        }
    },

    /**
     * Sort data and reload table
     */
    orderBy :  function(column, order) {
        if (column >= 0) {
            // Identify thead container
            var c = $(this).find('#col-' + column).parent();

            // No order specified then toggle order
            if (! (order == '0' || order == '1')) {
                var d = $(c).find('.arrow-down');
                if ($(d).length > 0) {
                    order = 1;
                } else {
                    order = 0;
                }
            }

            // Remove styling
            $(c).find('.arrow-down').remove();
            $(c).find('.arrow-up').remove();
            $(c).find('td').css('text-decoration', 'none');

            // Add style on specified column
            if (order == 1) {
                $(c).find('#col-' + column).append('<span class="arrow-up"></span>').css('text-decoration', 'underline');
            } else {
                $(c).find('#col-' + column).append('<span class="arrow-down"></span>').css('text-decoration', 'underline');
            }

           // Hide corner
            $('.jexcel_corner').css('top', '-200px');
            $('.jexcel_corner').css('left', '-200px');

            // Id
            var id = $(this).prop('id');
            var options = $.fn.jexcel.defaults[id];

            Array.prototype.sortBy = function(p, o) {
                return this.slice(0).sort(function(a, b) {
                  var valueA = a[p];
                  var valueB = b[p];

                  switch (options.columns[p].type)
                  {
                    case 'numeric':
                      valueA = Number(valueA);
                      valueB = Number(valueB);
                      break;
                  }

                  if (! o) {
                      return (valueA > valueB) ? 1 : (valueA < valueB) ? -1 : 0;
                  } else {
                      return (valueA > valueB) ? -1 : (valueA < valueB) ? 1 : 0;
                  }
                });
            }

            // Reorder
            options.data = options.data.sortBy(column, order);

            // Reset data
            $(this).jexcel('setData', null, true);

            // On sort event
            if (typeof($.fn.jexcel.defaults[id].onsort) == 'function') {
                $.fn.jexcel.defaults[id].onsort($(this), column, order);
            }

            return true;
        }
    },

    /**
     * Apply formula to all columns in the table
     */
    formula : function() {
        // Keep instannce of this object
        var main = $(this);

        // Id
        var id = $(this).prop('id');

        // Custom formulas
        if ($.fn.jexcel.defaults[id].formulas) {
            var formulas = $.fn.jexcel.defaults[id].formulas;
            // Set instance
            $.fn.jexcel.defaults[id].formulas.instance = this;
        }

        // Dynamic columns
        var columns = $.fn.jexcel.defaults[id].dynamicColumns;

        // Define global variables
        var variables = $(this).find('.jexcel tbody td').not('.jexcel_label');
        $.each(variables, function (k, v) {
            i = $(main).jexcel('getColumnNameFromId', $(v).prop('id'));
            v = $(main).jexcel('getValue', $(v));
            console.log(v);
            console.log(Number(v));
            if (v == Number(v)) {
                window[i] = Number(v);
            } else {
                window[i] = v;
            }
        });

        if (typeof excelFormulaUtilities == 'object') {
            // Process columns
            $.each(columns, function (k, column) {
                // Get value from the column
                formula = $(main).jexcel('getValue', column);
                // Column value is a formula
                if (formula) {
                    if (formula.substr(0,1) == '=') {
                        // Convert formula to javascript
                        value = excelFormulaUtilities.formula2JavaScript(formula);
                        value = eval(value);
                        // Set value
                        if (value === null || isNaN(value)) {
                            $(main).find('#' + column).addClass('error');
                            value = '<input type="hidden" value="' + formula + '">#ERROR';
                            // Update cell content
                            $(main).find('#' + column).html(value);
                        } else {
                            // Update variables
                            i = $(main).jexcel('getColumnNameFromId', column);
                            window[i] = value;
                            // Remove any error class
                            $(main).find('#' + column).removeClass('error');
                            value = '<input type="hidden" value="' + formula + '">' + value;
                            // Update cell content
                            $(main).find('#' + column).html(value);
                        }
                    } else {
                        // Remove any existing calculation error
                        $(main).find('#' + column).removeClass('error');
                        // No longer dynamic
                        columns.splice(k, 1);
                    }
                } else {
                    // Remove any existing calculation error
                    $(main).find('#' + column).removeClass('error');
                    // No longer dynamic
                    columns.splice(k, 1);
                }
            });
        } else {
            console.error('excelFormulaUtilities lib not included');
        }
    },

    /**
     * Multi-utility helper
     * 
     * @param object options { action: METHOD_NAME }
     * @return mixed
     */
    helper : function (options) {
        var data = [];
        if (typeof(options) == 'object') {
            // Return a empty bidimensional array
            if (options.action == 'createEmptyData') {
                var x = options.cols || 10;
                var y = options.rows || 100;
                for (j = 0; j < y; j++) {
                    data[j] = [];
                    for (i = 0; i < x; i++) {
                        data[j][i] = '';
                    }
                }
            }
        }

        return data;
    },

    /**
     * Download CSV table
     * 
     * @return null
     */
    download : function () {
        // Get table id
        var id = $(this).prop('id');
        // Increment and get the current history index
        var options = $.fn.jexcel.defaults[id];
        // Data
        var data = '';

        // Get headers if applicable
        if (options.csvHeaders == true) {
            data = options.colHeaders.join() + "\n";
        }

        // Get data
        data += $(this).jexcel('copy', false, ',', true);

        // Download elment
        var pom = document.createElement('a');
        var blob = new Blob([data], {type: 'text/csv;charset=utf-8;'});
        var url = URL.createObjectURL(blob);
        pom.href = url;
        pom.setAttribute('download', 'jexcelTable.csv');
        pom.click();
    },

    /**
     * Initializes a new history record for undo/redo
     *
     * @return null
     */
    setHistory : function(changes) {
        var main = $(this);

        var id = $(this).prop('id');

        // Increment and get the current history index
        var index = ++$.fn.jexcel.defaults[id].historyIndex;

        // Slice the array to discard undone changes
        var history = ($.fn.jexcel.defaults[id].history = $.fn.jexcel.defaults[id].history.slice(0, index + 1));

        // Create history slot
        history[index] = {
            firstSelected: changes[0].cell,
            lastSelected: changes[changes.length - 1].cell,
            cellChanges: changes
        };
    },

    /**
     * Undo last action
     */
    undo : function () {
        var id = $(this).prop('id');

        // Records
        var records = [];

        // Update cells
        if ($.fn.jexcel.defaults[id].historyIndex >= 0) {
            // History
            var historyRecord = $.fn.jexcel.defaults[id].history[$.fn.jexcel.defaults[id].historyIndex--];

            for (var i = 0; i < historyRecord.cellChanges.length; i++) {
                // Keep cells history
                records.push({
                    cell: $(historyRecord.cellChanges[i].cell),
                    newValue: historyRecord.cellChanges[i].oldValue,
                    oldValue: historyRecord.cellChanges[i].newValue,
                });
            }

            // Update cells
            $(this).jexcel('updateCells', records, true);

            // Update selection
            $(this).jexcel('updateSelection', historyRecord.firstSelected, historyRecord.lastSelected);
        }
    },

    /**
     * Redo previously undone action
     */
    redo : function () {
        var id = $(this).prop('id');

        if ($.fn.jexcel.defaults[id].historyIndex < $.fn.jexcel.defaults[id].history.length - 1) {
            // History
            var historyRecord = $.fn.jexcel.defaults[id].history[++$.fn.jexcel.defaults[id].historyIndex];

            // Update cells
            $(this).jexcel('updateCells', historyRecord.cellChanges, true);

            // Update selection
            $(this).jexcel('updateSelection', historyRecord.firstSelected, historyRecord.lastSelected);
        }
    },

    /**
     * Create cell
     */
    createCell : function(i, j) {
        // Get object identification
        var id = $(this).prop('id');

        // Main configuration
        var options = $.fn.jexcel.defaults[id];

        // Line properties
        align = options.colAlignments[i];
        width = options.colWidths[i];

        // Create cell and properties
        td = document.createElement('td');
        $(td).prop('width', width);
        $(td).prop('align', align);
        $(td).prop('id', i + '-' +j);
        $(td).addClass('c' + i);
        $(td).addClass('r' + j);

        // Hidden column
        if (options.columns[i].type == 'hidden') {
            $(td).css('display', 'none');
        } else if (options.columns[i].type == 'checkbox') {
            if (options.columns[i].readOnly == true) {
                $(td).html('<input type="checkbox" disabled="disabled">');
            } else {
                $(td).html('<input type="checkbox" onclick="var instance = $(this).parents(\'.jexcel\').parent(); $(instance).jexcel(\'setValue\', $(this).parent(), $(this).prop(\'checked\') ? 1 : 0);">');
            }
        }

        // Readonly
        if (options.columns[i].readOnly == true) {
            $(td).addClass('readonly', 'readonly');
        }

        // Wrap option
        if (options.wordWrap == true || options.columns[i].wordWrap == true) {
            $(td).css('white-space', 'pre');
        }

        // Add custom css class to column
        if(options.columns[i].cssClass) {
            $(td).addClass(options.columns[i].cssClass);
        }

        return $(td);
    },

    // Remove the selection from the cell
    resetSelection : function() {
        // Remove selection from any other jexcel if applicable
        if ($.fn.jexcel.current) {
            $('#' + $.fn.jexcel.current).jexcel('updateSelection');
        }

        // Hide corner
        $('.jexcel_corner').css('left', '-200px');

        // Reset controls
        $.fn.jexcel.selectedRow = null;
        $.fn.jexcel.selectedCell = null;
        $.fn.jexcel.selectedHeader = null;
    },

    /**
     * Check for spare cols and rows
     */
    spareCheck : function() {
        // Id
        var id = $(this).prop('id');
        var test = false;

        // Sparerows and sparecols configuration
        if ($.fn.jexcel.defaults[id].minSpareCols > 0) {
            // Configuration to check the spare cells
            lastCol = ($.fn.jexcel.defaults[id].data[0]) ? $.fn.jexcel.defaults[id].data[0].length : 0;
            lastRow = $.fn.jexcel.defaults[id].data.length;
            checkPoint = lastCol - $.fn.jexcel.defaults[id].minSpareCols;
            if (checkPoint < 0) {
                checkPoint = 0;
            }
            // Check for non-black within the expected spare cells
            test = false;
            for (rowNumber = 0; rowNumber < lastRow; rowNumber++) {
                for (colNumber = checkPoint; colNumber < lastCol; colNumber++) {
                    if ($.fn.jexcel.defaults[id].data[rowNumber][colNumber]) {
                        test = true;
                    }
                }
            }
            // Spare is populated add new spare to keep it align with the configuration
            if (test) {
                $(this).jexcel('insertColumn', $.fn.jexcel.defaults[id].minSpareCols);
            }
        }

        if ($.fn.jexcel.defaults[id].minSpareRows > 0) {
            // Configuration to check the spare cells
            lastCol = ($.fn.jexcel.defaults[id].data[0]) ? $.fn.jexcel.defaults[id].data[0].length : 0;
            lastRow = $.fn.jexcel.defaults[id].data.length;
            checkPoint = lastRow - $.fn.jexcel.defaults[id].minSpareRows;
            if (checkPoint < 0) {
                checkPoint = 0;
            }
            // Check for non-black within the expected spare cells
            test = false;
            for (rowNumber = checkPoint; rowNumber < lastRow; rowNumber++) {
                for (colNumber = 0; colNumber < lastCol; colNumber++) {
                    if ($.fn.jexcel.defaults[id].data[rowNumber][colNumber]) {
                        test = true;
                    }
                }
            }
            // Spare is populated add new spare to keep it align with the configuration
            if (test) {
                $(this).jexcel('insertRow', $.fn.jexcel.defaults[id].minSpareCols);
            }
        }
    },

    /**
     * Get header letter when no name is specified
     */
    getColumnName : function(i) {
        var letter = '';
        if (i > 701) {
            letter += String.fromCharCode(64 + parseInt(i / 676));
            letter += String.fromCharCode(64 + parseInt((i % 676) / 26));
        } else if (i > 25) {
            letter += String.fromCharCode(64 + parseInt(i / 26));
        }
        letter += String.fromCharCode(65 + (i % 26));

        return letter;
    },

    /**
     * Convert excel like column to jexcel id
     * 
     * @param string id
     * @return string id
     */
    getIdFromColumnName : function (id) {
        var t = /^[a-zA-Z]+/.exec(id);
        if (t) {
            var code = 0;
            for (var i = 0; i < t[0].length; i++) {
                code += parseInt(t[0].charCodeAt(i) - 65) + (i * 26);
            }
            id = code + '-' + (parseInt(/[0-9]+$/.exec(id)) - 1);
        }
        return id;
    },

    /**
     * Convert jexcel id to excel like column name
     * 
     * @param string id
     * @return string id
     */
    getColumnNameFromId : function (cellId) {
        var name = cellId.split('-');
        return $.fn.jexcel('getColumnName', name[0])  + (parseInt(name[1]) + 1);
    }
};

$.fn.jexcel = function( method ) {
    if ( methods[method] ) {
        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
    } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }
};

})( jQuery );
