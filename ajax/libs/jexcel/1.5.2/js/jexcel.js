class jexcel {

    constructor(config) {
        // Loading default configuration
        var defaults = {
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
            // ID of the table
            tableId:null,
            // Filename
            csvFileName:'jexcel',
            // Disable corner selection
            selectionCopy:true,
            // Allow Overflow
            tableOverflow:false,
            // Allow Overflow
            tableHeight:'300px',
            // About message
            about:'jExcel Spreadsheet\\nVersion 1.5.2\\nAuthor: Paul Hodel <paul.hodel@gmail.com>\\nWebsite: https://bossanova.uk/jexcel'
        };

        for (defaults in properties) {
            if (config.hasOwnProperty(property)) {
                defaults[property] = config[property];
            }
        }

        this.config = defaults;

        console.log(this.config)
    }
}