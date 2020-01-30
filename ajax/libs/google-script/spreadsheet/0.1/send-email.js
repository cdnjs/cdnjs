/*!
 * Send email by google sheet area selection.
 * Copyright 2019 Jaydeep Mor
 * Licensed under http://opensource.org/licenses/MIT
 *
 * 
 */

/**
 * Call while click on button
 */
function funShowAlert() {
    // Same variations.
    var ui = SpreadsheetApp.getUi();
    var result = ui.alert('Please confirm', 'Are you sure want to send email?', ui.ButtonSet.YES_NO);
    // Process the user's response.
    if (result == ui.Button.YES) {
        // User clicked "Yes".
        if (funSendEmails()) {
            return ui.alert('DR send successfully !');
        }
    }
    return SpreadsheetApp.getActiveSpreadsheet().toast('DR not send !', '', 2);
}

/**
 * Add menu on sheet.
 */
function onOpen() {
    // Add a custom menu to the spreadsheet.
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var entries = [{
        name: "Send Mail",
        functionName: "funShowAlert"
    }];
    sheet.addMenu("Daily Report", entries);
}

/**
 * Get spreadSheet cell value by row and column.
 */
function funGetValue(row, column) {
    var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var getSheet = spreadSheet.getSheetByName('Email_Configuration');
    return getSheet.getRange(row, column).getValue();
}

/**
 * Send email.
 * ReplayAll if already sent.
 * Find sent email threads by to + subject line.
 */
function funSendEmails() {
    /* Default configurations. */
    var sheetUI              = SpreadsheetApp.getUi();
    var curDate              = Utilities.formatDate(new Date(), "GMT+5.5", "yyyy-MM-dd");
    var emailAddress         = funGetValue(2, 1);
    var emailAddressCC       = funGetValue(2, 2);
    var emailAddressBCC      = funGetValue(2, 3);
    var minSelectedAreaRange = funGetValue(2, 4);
    var configSubject        = funGetValue(2, 5);
    var subject              = configSubject + curDate;
    var threads              = funSearchExisting();
    var userName             = funGetOwnName();

    /* Validate email addresses. */
    if (emailAddress == '') {
        sheetUI.alert('Please configure email address properly !');
        return false;
    }

    /* Email body with HTML / Style. */
    var getSelectedRange = funGetSelectedRange();
    var countRows = 2;
    var emailBody = getSelectedRange;

    /* This is by default class for send email. */
    if (countRows >= minSelectedAreaRange) {
        if (threads[0]) {
            threads[0].reply(emailBody, {
                'replyTo': emailAddress,
                'cc': emailAddressCC,
                'bcc': emailAddressBCC,
                'htmlBody': emailBody,
                'name': userName
            });
        } else {
            MailApp.sendEmail(emailAddress, subject, emailBody, {
                'replyTo': emailAddress,
                'cc': emailAddressCC,
                'bcc': emailAddressBCC,
                'htmlBody': emailBody,
                'name': userName
            });
            funAddLabel();
        }
        return true;
    } else {
        sheetUI.alert('Please select range properly !');
    }
    return false;
}

/**
 * Get selected range values as html.
 */
function funGetSelectedRange() {
    var selectedRange = SpreadsheetApp.getActive().getActiveRange();
    return funGetHtmlTable(selectedRange);
}

/**
 * Return a string containing an HTML table representation
 * of the given range, preserving style settings.
 * https://stackoverflow.com/questions/18600638/google-script-copy-to-clipboard-and-mailto-questions
 */
function funGetHtmlTable(range) {
    var ss      = range.getSheet().getParent();
    var sheet   = range.getSheet();
    startRow    = range.getRow();
    startCol    = range.getColumn();
    lastRow     = range.getLastRow();
    lastCol     = range.getLastColumn();

    // Read table contents
    var data = range.getDisplayValues();

    // Get css style attributes from range
    var fontColors           = range.getFontColors();
    var backgrounds          = range.getBackgrounds();
    var fontFamilies         = range.getFontFamilies();
    var fontSizes            = range.getFontSizes();
    var fontLines            = range.getFontLines();
    var fontWeights          = range.getFontWeights();
    var horizontalAlignments = range.getHorizontalAlignments();
    var verticalAlignments   = range.getVerticalAlignments();
    var strategies           = range.getWrapStrategies();

    // Get column widths in pixels
    var colWidths = [];
    for (var col = startCol; col <= lastCol; col++) {
        colWidths.push(sheet.getColumnWidth(col));
    }

    // Get Row heights in pixels
    var rowHeights = [];
    for (var row = startRow; row <= lastRow; row++) {
        rowHeights.push(sheet.getRowHeight(row));
    }

    // Future consideration...
    var numberFormats = range.getNumberFormats();

    // Build HTML Table, with inline styling for each cell
    var tableFormat = 'style="border:1px solid black;border-collapse:collapse;" border = 1 cellpadding = 5';
    var html = ['<table ' + tableFormat + '>'];

    // Column widths appear outside of table rows
    for (col = 0; col < colWidths.length; col++) {
        html.push('<col width="' + colWidths[col] + '">')
    }

    // Populate rows
    for (row = 0; row < data.length; row++) {
        html.push('<tr height="' + rowHeights[row] + '">');
        for (col = 0; col < data[row].length; col++) {
            // Get formatted data
            var cellText = data[row][col];
            if (cellText instanceof Date) {
                cellText = Utilities.formatDate(cellText, ss.getSpreadsheetTimeZone(), 'MMM/d EEE');
            }
            var isWrapped = strategies[row][col];
            if (isWrapped) {
                cellText = cellText.replace(/\n/g, '<br />');
            }
            var style = 'style="' + 'color: ' + fontColors[row][col] + '; ' + 'font-family: ' + fontFamilies[row][col] + '; ' + 'font-size: ' + fontSizes[row][col] + '; ' + 'font-weight: ' + fontWeights[row][col] + '; ' + 'background-color: ' + backgrounds[row][col] + '; ' + 'text-align: ' + horizontalAlignments[row][col] + '; ' + 'vertical-align: ' + verticalAlignments[row][col] + '; ' + '"';
            html.push('<td ' + style + '>' + cellText + '</td>');
        }
        html.push('</tr>');
    }
    html.push('</table>');
    return html.join('');
}

/**
 * Search existing email (Already sent email by to + subject line).
 */
function funSearchExisting() {
    var curDate = Utilities.formatDate(new Date(), "GMT+5.5", "yyyy-MM-dd");
    var emailAddress = funGetValue(2, 1);
    var configSubject = funGetValue(2, 5);
    var subject = configSubject + curDate;
    return GmailApp.search('to:(' + emailAddress + ') "' + subject + '"')
}

/**
 * Add label on sent email.
 */
function funAddLabel() {
    var getEmailLabel = funGetValue(2, 6);
    if (getEmailLabel != "") {
        Utilities.sleep(3 * 1000);
        var emailLabel = GmailApp.getUserLabelByName(getEmailLabel);
        var threads = funSearchExisting();
        if (threads[0] && emailLabel) {
            emailLabel.addToThread(threads[0]);
        }
    }
}

/**
 * Add name to the send mail.
 */
function funGetOwnName()
{
    var email      = Session.getEffectiveUser().getEmail();
    var self       = ContactsApp.getContact(email);
    var preferName = "";
  
    if (self) {
        // First preferable get full name.
        preferName = self.getFullName();
        
        // Get given name, if that's available
        if (!preferName) {
            preferName = self.getGivenName();
        }
    } else {
        preferName = Session.getEffectiveUser().getUsername(); 
    }

    return preferName;  
}
