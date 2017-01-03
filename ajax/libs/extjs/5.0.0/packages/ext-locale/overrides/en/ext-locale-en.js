/**
 * List compiled by mystix on the extjs.com forums.
 * Thank you Mystix!
 *
 * English Translations
 * updated to 2.2 by Condor (8 Aug 2008)
 */
Ext.onReady(function() {

    if (Ext.data && Ext.data.Types) {
        Ext.data.Types.stripRe = /[\$,%]/g;
    }

    if (Ext.Date) {
        Ext.Date.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };

        Ext.Date.parseCodes.S.s = "(?:st|nd|rd|th)";
    }
    
    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: ',',
            decimalSeparator: '.',
            currencySign: '$',
            dateFormat: 'm/d/Y'
        });
    }
});

Ext.define("Ext.locale.en.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.en.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} selected row{1}"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.en.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Loading..."
});

Ext.define("Ext.locale.en.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Today",
    minText: "This date is before the minimum date",
    maxText: "This date is after the maximum date",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: 'Next Month (Control+Right)',
    prevText: 'Previous Month (Control+Left)',
    monthYearText: 'Choose a month (Control+Up/Down to move years)',
    todayTip: "{0} (Spacebar)",
    format: "m/d/y",
    startDay: 0
});

Ext.define("Ext.locale.en.picker.Month", {
    override: "Ext.picker.Month",
    okText: "&#160;OK&#160;",
    cancelText: "Cancel"
});

Ext.define("Ext.locale.en.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Page",
    afterPageText: "of {0}",
    firstText: "First Page",
    prevText: "Previous Page",
    nextText: "Next Page",
    lastText: "Last Page",
    refreshText: "Refresh",
    displayMsg: "Displaying {0} - {1} of {2}",
    emptyMsg: 'No data to display'
});

Ext.define("Ext.locale.en.form.Basic", {
    override: "Ext.form.Basic",
    waitTitle: "Please Wait..."
});

Ext.define("Ext.locale.en.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "The value in this field is invalid"
});

Ext.define("Ext.locale.en.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "The minimum length for this field is {0}",
    maxLengthText: "The maximum length for this field is {0}",
    blankText: "This field is required",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.en.form.field.Number", {
    override: "Ext.form.field.Number",
    decimalPrecision: 2,
    minText: "The minimum value for this field is {0}",
    maxText: "The maximum value for this field is {0}",
    nanText: "{0} is not a valid number"
});

Ext.define("Ext.locale.en.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Disabled",
    disabledDatesText: "Disabled",
    minText: "The date in this field must be after {0}",
    maxText: "The date in this field must be before {0}",
    invalidText: "{0} is not a valid date - it must be in the format {1}",
    format: "m/d/y",
    altFormats: "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d"
});

Ext.define("Ext.locale.en.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function() {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Loading..."
    });
});

Ext.define("Ext.locale.en.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'This field should be an e-mail address in the format "user@example.com"',
    urlText: 'This field should be a URL in the format "http:/' + '/www.example.com"',
    alphaText: 'This field should only contain letters and _',
    alphanumText: 'This field should only contain letters, numbers and _'
});

Ext.define("Ext.locale.en.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Please enter the URL for the link:'
}, function() {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Bold (Ctrl+B)',
                text: 'Make the selected text bold.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Italic (Ctrl+I)',
                text: 'Make the selected text italic.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Underline (Ctrl+U)',
                text: 'Underline the selected text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Grow Text',
                text: 'Increase the font size.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Shrink Text',
                text: 'Decrease the font size.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Text Highlight Color',
                text: 'Change the background color of the selected text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Font Color',
                text: 'Change the color of the selected text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Align Text Left',
                text: 'Align text to the left.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Center Text',
                text: 'Center text in the editor.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Align Text Right',
                text: 'Align text to the right.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Bullet List',
                text: 'Start a bulleted list.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Numbered List',
                text: 'Start a numbered list.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Hyperlink',
                text: 'Make the selected text a hyperlink.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Source Edit',
                text: 'Switch to source editing mode.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

Ext.define("Ext.locale.en.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Sort Ascending",
    sortDescText: "Sort Descending",
    columnsText: "Columns"
});

Ext.define("Ext.locale.en.grid.GroupingFeature", {
    override: "Ext.grid.feature.Grouping",
    emptyGroupText: '(None)',
    groupByText: 'Group by this field',
    showGroupsText: 'Show in Groups'
});

Ext.define("Ext.locale.en.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Name",
    valueText: "Value",
    dateFormat: "m/j/Y",
    trueText: "true",
    falseText: "false"
});

Ext.define("Ext.locale.en.grid.BooleanColumn", {
    override: "Ext.grid.BooleanColumn",
    trueText: "true",
    falseText: "false",
    undefinedText: '&#160;'
});

Ext.define("Ext.locale.en.grid.NumberColumn", {
    override: "Ext.grid.NumberColumn",
    format: '0,000.00'
});

Ext.define("Ext.locale.en.grid.DateColumn", {
    override: "Ext.grid.DateColumn",
    format: 'm/d/Y'
});

Ext.define("Ext.locale.en.form.field.Time", {
    override: "Ext.form.field.Time",
    minText: "The time in this field must be equal to or after {0}",
    maxText: "The time in this field must be equal to or before {0}",
    invalidText: "{0} is not a valid time",
    format: "g:i A",
    altFormats: "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"
});

Ext.define("Ext.locale.en.form.field.File", {
    override: "Ext.form.field.File",
    buttonText: "Browse..."
});

Ext.define("Ext.locale.en.form.CheckboxGroup", {
    override: "Ext.form.CheckboxGroup",
    blankText: "You must select at least one item in this group"
});

Ext.define("Ext.locale.en.form.RadioGroup", {
    override: "Ext.form.RadioGroup",
    blankText: "You must select one item in this group"
});

Ext.define("Ext.locale.en.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "OK",
        cancel: "Cancel",
        yes: "Yes",
        no: "No"
    }    
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.en.Component", {	
    override: "Ext.Component"
});
