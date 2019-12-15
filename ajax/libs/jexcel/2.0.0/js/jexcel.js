/**
 * (c) 2013 Jexcel Plugin v2.0.0 | Bossanova UI
 * http://www.github.com/paulhodel/jexcel
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Create light embedded spreadsheets on your webpages
 * 
 *
 */

jexcel = function() {

    /**
     * jExcel construct
     * @Param config
     */
    this.constructor = function(config) {
        // Loading default configuration
        var defaults = {
            // Target of the container
            id:null,
            // External data
            url:null,
            // Data
            data:[[]],
            // Column types and configurations
            columns:[],
            // Column header titles
            colHeaders:[],
            // Column width sizes
            colWidths:[],
            // Column alignment
            colAlignments:[],
            // Colum header classes
            colHeaderClasses:[],
            // Column width that is used by default
            defaultColWidth:50,
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
            // CSV source
            csv:null,
            // Filename
            csvFileName:'jexcel',
            // CSV headers
            csvHeaders:false,
            // Delimiters
            csvDelimiter:',',
            // Disable corner selection
            selectionCopy:true,
            // Allow Overflow
            tableOverflow:false,
            // Allow Overflow
            tableHeight:'300px',
            // History
            history:[],
            // HistoryIndex
            historyIndex:-1,
            // About message
            about:'jExcel Spreadsheet\\nVersion 2.0.1\\nAuthor: Paul Hodel <paul.hodel@gmail.com>\\n'+
                'Website: https://bossanova.uk/jexcel',
        };

        // Loading initial configuration from user
        for (var property in defaults) {
            if (config.hasOwnProperty(property)) {
                this[property] = config[property];
            } else {
                this[property] = defaults[property];
            }
        }

        // Create global native shared controls
        if (! window.__jexcel__) {
            window.__jexcel__ = {
                current: null,
                ignoreEvents: false,
                ignoreHistory: false,
                factory: function(k, v) {
                    this.k = k;
                    this.v = v;
                },
            }
        }

        // Behavior of the elements of the formula
        window.__jexcel__.factory.prototype.toString = function() {
            if (window.__jexcel__.current) {
                //return $.fn.jexcel.defaults[$.fn.jexcel.current].values[this.k];
            } else {
                return this.v;
            }
        }

        // Jexcel instance
        var instance = this;

        // Load the table data based on an CSV file
        if (this.csv) {
            if (! $.csv) {
                // Required lib not present
                console.error('Jexcel error: jquery-csv library not loaded');
            } else {
                // Load CSV file
                $.ajax({
                    url:instance.csv,
                    success: function (result) {
                        // Convert data
                        var data = $.csv.toArrays(result);

                        // Headers
                        if (instance.csvHeaders == true) {
                            instance.colHeaders = data.shift();
                        }

                        // Data
                        instance.data = data;
 
                        // Prepare table
                        instance.prepareTable();
                    }
                });
            }
        } else if (this.url) {
            // Load json external file
            $.ajax({
                url: instance.url,
                dataType:'json',
                success: function (result) {
                    // Data
                    instance.data = (result.data) ? result.data : result;
                    // Prepare table
                    instance.prepareTable();
                }
            });
        } else {
            // Prepare table
            instance.prepareTable();
        }
    }();

    /**
     * Prepare the jexcel table
     * @Param config
     */
    this.prepareTable = function() {
        // Instance
        var instance = this;

        // Loading initial data from remote sources
        var results = [];

        // Number of columns
        var size = this.colHeaders.length;

        if (this.data[0].length > size) {
            size = this.data[0].length;
        }

        // Minimal dimensions
        if (this.minDimensions[0] > size) {
            size = this.minDimensions[0];
        }

        // Preparations
        for (var i = 0; i < size; i++) {
            // Default headers
            if (! this.colHeaders[i]) {
               this.colHeaders[i] = '';
            }
            // Default column description
            if (! this.columns[i]) {
               this.columns[i] = { type:'text' };
            } else if (! this.columns[i]) {
               this.columns[i].type = 'text';
            }
            if (! this.columns[i].source) {
               this.columns[i].source = [];
            }
            if (! this.columns[i].options) {
               this.columns[i].options = [];
            }
            if (! this.columns[i].editor) {
               this.columns[i].editor = null;
            }
            if (! this.columns[i].allowEmpty) {
               this.columns[i].allowEmpty = false;
            }
            if (! this.colWidths[i]) {
               this.colWidths[i] = this.defaultColWidth || '50';
            }
            if (! this.colAlignments[i]) {
               this.colAlignments[i] = 'center';
            }
            if (! this.colHeaderClasses[i]) {
               this.colHeaderClasses[i] = '';
            }

            // Pre-load initial source for json autocomplete
            if (this.columns[i].type == 'autocomplete' || this.columns[i].type == 'dropdown') {
                // if remote content
                if (this.columns[i].url) {
                    results.push($.ajax({
                        url: instance.columns[i].url,
                        index: i,
                        dataType: 'json',
                        success: function (result) {
                            // Create the dynamic sources
                            this.columns[this.index].source = result;
                        },
                        error: function (result) {
                            console.error('It was not possible to load the url: ' + this.url);
                        }
                    }));
                }
            } else if (this.columns[i].type == 'calendar') {
                // Default format for date columns
                if (! this.columns[i].options.format) {
                   this.columns[i].options.format = 'DD/MM/YYYY';
                }
            }
        }

        // In case there are external json to be loaded before create the table
        if (results.length > 0) {
            // Waiting all external data is loaded
            $.when.apply(this, results).done(function() {
                // Create the table
                instance.createTable();
            });
        } else {
            // No external data to be loaded, just created the table
            instance.createTable();
        }
    }

    this.createTable = function()
    {
        console.log(this);
    }
}