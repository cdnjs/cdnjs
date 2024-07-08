(function( factory ) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( [], factory);
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = factory();
	}
	// No browser loader - use JSON, ESM, CJS or AMD
}
(function() {
    return {
    "emptyTable": "No data available in table",
    "info": "Showing _START_ to _END_ of _TOTAL_ entries",
    "infoEmpty": "Showing 0 to 0 of 0 entries",
    "infoFiltered": "(filtered from _MAX_ total entries)",
    "infoThousands": ",",
    "lengthMenu": "Show _MENU_ entries",
    "loadingRecords": "Loading...",
    "processing": "Processing...",
    "search": "Search:",
    "zeroRecords": "No matching records found",
    "thousands": ",",
    "paginate": {
        "first": "First",
        "last": "Last",
        "next": "Next",
        "previous": "Previous"
    },
    "aria": {
        "sortAscending": ": activate to sort column ascending",
        "sortDescending": ": activate to sort column descending"
    },
    "autoFill": {
        "cancel": "Cancel",
        "fill": "Fill all cells with <i>%d<\/i>",
        "fillHorizontal": "Fill cells horizontally",
        "fillVertical": "Fill cells vertically"
    },
    "buttons": {
        "collection": "Collection <span class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s'\/>",
        "colvis": "Column Visibility",
        "colvisRestore": "Restore visibility",
        "copy": "Copy",
        "copyKeys": "Press ctrl or u2318 + C to copy the table data to your system clipboard.<br><br>To cancel, click this message or press escape.",
        "copySuccess": {
            "1": "Copied 1 row to clipboard",
            "_": "Copied %d rows to clipboard"
        },
        "copyTitle": "Copy to Clipboard",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Show all rows",
            "_": "Show %d rows"
        },
        "pdf": "PDF",
        "print": "Print",
        "updateState": "Update",
        "stateRestore": "State %d",
        "savedStates": "Saved States",
        "renameState": "Rename",
        "removeState": "Remove",
        "removeAllStates": "Remove All States",
        "createState": "Create State"
    },
    "searchBuilder": {
        "add": "Add Condition",
        "button": {
            "0": "Search Builder",
            "_": "Search Builder (%d)"
        },
        "clearAll": "Clear All",
        "condition": "Condition",
        "conditions": {
            "date": {
                "after": "After",
                "before": "Before",
                "between": "Between",
                "empty": "Empty",
                "equals": "Equals",
                "not": "Not",
                "notBetween": "Not Between",
                "notEmpty": "Not Empty"
            },
            "number": {
                "between": "Between",
                "empty": "Empty",
                "equals": "Equals",
                "gt": "Greater Than",
                "gte": "Greater Than Equal To",
                "lt": "Less Than",
                "lte": "Less Than Equal To",
                "not": "Not",
                "notBetween": "Not Between",
                "notEmpty": "Not Empty"
            },
            "string": {
                "contains": "Contains",
                "empty": "Empty",
                "endsWith": "Ends With",
                "equals": "Equals",
                "not": "Not",
                "notEmpty": "Not Empty",
                "startsWith": "Starts With",
                "notContains": "Does Not Contain",
                "notStartsWith": "Does Not Start With",
                "notEndsWith": "Does Not End With"
            },
            "array": {
                "without": "Without",
                "notEmpty": "Not Empty",
                "not": "Not",
                "contains": "Contains",
                "empty": "Empty",
                "equals": "Equals"
            }
        },
        "data": "Data",
        "deleteTitle": "Delete filtering rule",
        "leftTitle": "Outdent Criteria",
        "logicAnd": "And",
        "logicOr": "Or",
        "rightTitle": "Indent Criteria",
        "title": {
            "0": "Search Builder",
            "_": "Search Builder (%d)"
        },
        "value": "Value"
    },
    "searchPanes": {
        "clearMessage": "Clear All",
        "collapse": {
            "0": "SearchPanes",
            "_": "SearchPanes (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "No SearchPanes",
        "loadMessage": "Loading SearchPanes",
        "title": "Filters Active - %d",
        "showMessage": "Show All",
        "collapseMessage": "Collapse All"
    },
    "select": {
        "cells": {
            "1": "1 cell selected",
            "_": "%d cells selected"
        },
        "columns": {
            "1": "1 column selected",
            "_": "%d columns selected"
        },
        "rows": {
            "1": "1 row selected",
            "_": "%d rows selected"
        }
    },
    "datetime": {
        "previous": "Previous",
        "next": "Next",
        "hours": "Hour",
        "minutes": "Minute",
        "seconds": "Second",
        "unknown": "-",
        "amPm": [
            "am",
            "pm"
        ],
        "weekdays": [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ],
        "months": [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
    },
    "editor": {
        "close": "Close",
        "create": {
            "button": "New",
            "title": "Create new entry",
            "submit": "Create"
        },
        "edit": {
            "button": "Edit",
            "title": "Edit Entry",
            "submit": "Update"
        },
        "remove": {
            "button": "Delete",
            "title": "Delete",
            "submit": "Delete",
            "confirm": {
                "_": "Are you sure you wish to delete %d rows?",
                "1": "Are you sure you wish to delete 1 row?"
            }
        },
        "error": {
            "system": "A system error has occurred (<a target=\"\\\" rel=\"nofollow\" href=\"\\\">More information<\/a>)."
        },
        "multi": {
            "title": "Multiple Values",
            "info": "The selected items contain different values for this input. To edit and set all items for this input to the same value, click or tap here, otherwise they will retain their individual values.",
            "restore": "Undo Changes",
            "noMulti": "This input can be edited individually, but not part of a group. "
        }
    },
    "stateRestore": {
        "renameTitle": "Rename State",
        "renameLabel": "New Name for %s:",
        "renameButton": "Rename",
        "removeTitle": "Remove State",
        "removeSubmit": "Remove",
        "removeJoiner": " and ",
        "removeError": "Failed to remove state.",
        "removeConfirm": "Are you sure you want to remove %s?",
        "emptyStates": "No saved states",
        "emptyError": "Name cannot be empty.",
        "duplicateError": "A state with this name already exists.",
        "creationModal": {
            "toggleLabel": "Includes:",
            "title": "Create New State",
            "select": "Select",
            "searchBuilder": "SearchBuilder",
            "search": "Search",
            "scroller": "Scroll Position",
            "paging": "Paging",
            "order": "Sorting",
            "name": "Name:",
            "columns": {
                "visible": "Column Visibility",
                "search": "Column Search"
            },
            "button": "Create"
        }
    }
};
}));
