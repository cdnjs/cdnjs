/* tslint:disable */
/* eslint-disable */
(function ($) {
   window.jqxToDash = function(value) {
	return value.split(/(?=[A-Z])/).join('-').toLowerCase();
  }
		
  class DataExporter {
    constructor(exportDetails, groupBy, filterBy, conditionalFormatting) {
        const that = this;

        if (!exportDetails) {
            exportDetails = {};
        }

        /*
         * "style" object definition (all properties are optional):
         *
         * «any valid CSS property» - applied to whole table
         * header (Object)
         *      «any valid CSS property» - applied to header cells
         *      «any column name» (Object)
         *          «any valid CSS property» - applied to particular column header cell
         * columns (Object)
         *      «any valid CSS property» - applied to column cells
         *      «any column name» (Object)
         *          «any valid CSS property» - applied to the cells of particular column
         *          format - applicable to numeric and date columns
         *          «n» (Object), where «n» is a row index (related to use of "ConditionalFormatting" object)
         *              background
         *              border
         *              color
         * rows (Object)
         *      «any valid CSS property» - applied to rows
         *      alternationCount
         *      alternationStart
         *      alternationEnd
         *      alternationIndex«n»Color, where «n» is an integer
         *      alternationIndex«n»BorderColor, where «n» is an integer
         *      alternationIndex«n»BackgroundColor, where «n» is an integer
         *      «n» (Object), where «n» is a row index
         *          «any valid CSS property» - applied to particular row
         */
        that.style = exportDetails.style;

        that.header = exportDetails.header;
        that.exportHeader = exportDetails.exportHeader || true;
        that.hierarchical = exportDetails.hierarchical;
        that.expandChar = exportDetails.expandChar || '+';
        that.collapseChar = exportDetails.collapseChar || '-';
        that.pageOrientation = exportDetails.pageOrientation;

        if (!that.hierarchical && groupBy && groupBy.length > 0) {
            that.groupBy = groupBy;
        }
        else {
            that.mergedCells = exportDetails.mergedCells;
        }

        if (!that.groupBy && filterBy && Object.keys(filterBy).length > 0) {
            that.filterBy = filterBy;
        }

        if (conditionalFormatting) {
            that.conditionalFormatting = conditionalFormatting;
        }

        that.timeBetween1900And1970 = new Date(1970, 0, 1).getTime() - new Date(1900, 0, 1).getTime();
    }

    /**
     * Generates and downloads a file.
     */
    downloadFile(data, type, fileName) {
        let file;

        if (!fileName) {
            return data;
        }

        if (data instanceof Blob) {
            file = data;
        }
        else {
            file = new Blob([data], { type: type });
        }

        if (window.navigator.msSaveOrOpenBlob) { // Edge
            window.navigator.msSaveOrOpenBlob(file, fileName);
        }
        else { // Chrome, Firefox, Safari
            const a = document.createElement('a'),
                url = URL.createObjectURL(file);

            a.href = url;
            a.download = fileName;
            a.style.position = 'absolute';
            a.style.visibility = 'hidden';

            document.body.appendChild(a);

            a.click();

            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    /**
     * Exports data.
     */
    exportData(data, format, fileName, callback) {
        const that = this;

        that.actualHierarchy = that.hierarchical;
        format = format.toLowerCase();

        if (that.exportHeader) {
            if (that.header) {
                data = data.slice(0);

                if (data.length === 0) {
                    that.actualHierarchy = false;
                }

                that.processComplexHeader(that.header, data, format);
            }
            else if (data.length === 1) {
                that.actualHierarchy = false;
            }
        }

        if (data.length === 0) {
            // eslint-disable-next-line
            console.warn('No data to export.');
            return;
        }

        if (format === 'xlsx') {
            that.xlsxStartIndex = that.complexHeader ? that.complexHeader.length : +that.exportHeader;
        }

        if (that.actualHierarchy) {
            data = that.processHierarchicalData(data, format);
        }

        that.getDatafields(data);

        if (fileName && fileName.slice(fileName.length - format.length - 1, fileName.length) !== '.' + format) {
            fileName += '.' + format;
        }

        let output = null;
        switch (format) {
            case 'csv':
                output = that.exportToCSVAndTSV(data, { delimiter: ', ', MIME: 'text/csv', toRemove: 2 }, fileName);
                break;
            case 'html':
                output = that.exportToHTML(data, fileName);
                break;
            case 'jpeg':
            case 'png':
                that.exportToImage(data, fileName, format, callback);
                break;
            case 'json':
                output = that.exportToJSON(data, fileName);
                break;
            case 'pdf':
                output = that.exportToPDF(data, fileName);
                break;
            case 'tsv':
                output = that.exportToCSVAndTSV(data, { delimiter: '\t', MIME: 'text/tab-separated-values', toRemove: 1 }, fileName);
                break;
            case 'xlsx':
                output = that.exportToXLSX(data, fileName);
                break;
            case 'xml':
                output = that.exportToXML(data, fileName);
                break;
        }

        if (callback && output) {
            callback(output);
        }

        delete that.complexHeader;

        return output;
    }

    /**
     * Exports to CSV and TSV.
     */
    exportToCSVAndTSV(data, formatOptions, fileName) {
        const that = this,
            datafields = that.datafields;
        let stringResult = '';

        for (let i = 0; i < data.length; i++) {
            const currentRecord = data[i];
            let stringifiedCurrentRecord = '';

            for (let j = 0; j < datafields.length; j++) {
                if (that.actualHierarchy && j === 0) {
                    stringifiedCurrentRecord += ('""' + formatOptions.delimiter).repeat(currentRecord._level - 1) +
                        '"' + currentRecord[datafields[j]] + '"' + formatOptions.delimiter +
                        ('""' + formatOptions.delimiter).repeat(that.maxLevel - currentRecord._level);
                    continue;
                }

                stringifiedCurrentRecord += '"' + currentRecord[datafields[j]] + '"' + formatOptions.delimiter;
            }

            stringifiedCurrentRecord = stringifiedCurrentRecord.slice(0, stringifiedCurrentRecord.length - formatOptions.toRemove) + '\n';
            stringResult += stringifiedCurrentRecord;
        }

        return this.downloadFile(stringResult, formatOptions.MIME, fileName);
    }

    /**
     * Exports to HTML.
     */
    exportToHTML(data, fileName) {
        const that = this,
            datafields = that.datafields,
            style = that.style;
        let header = '',
            startIndex = 0,
            html2canvas = '';

        data = that.processGroupingInformation(data);
        that.data = data;

        if (that.exportHeader) {
            header = that.getHTMLHeader(datafields, data);
            startIndex = 1;
        }

        if (arguments[2]) {
            const scripts = Array.from(document.getElementsByTagName('script')),
                html2canvasScript = scripts.find(script => script.src.indexOf('html2canvas') !== -1);
            html2canvas = `<script type="text/javascript" src="${html2canvasScript.src}"></script>`;
        }

        let htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style type="text/css">
${that.getRowStyle()}${that.getColumnStyle()}
    </style>${html2canvas}${that.toggleableFunctionality()}
</head>
<body>
    <table${that.getTableStyle()}>${header}
        <tbody>\n`;

        const mergedMainCells = {},
            mergedSecondaryCells = {},
            groupsHandled = [];

        that.getMergedCellsInfo(mergedMainCells, mergedSecondaryCells);

        mainLoop:
            for (let i = startIndex; i < data.length; i++) {
                const currentRecord = data[i],
                    row = i - startIndex;
                let n = that.getAlternationIndex(row, ' rowN'),
                    toCollapse = '',
                    level = '',
                    groupId = '',
                    outlineLevel = 0;

                if (that.actualHierarchy) {
                    if (currentRecord._collapsed) {
                        toCollapse = ' collapsed';
                    }

                    level = ` level="${currentRecord._level}"`;
                }
                else if (that.groupBy) {
                    for (let k = 0; k < that.groupBy.length; k++) {
                        const datafield = that.groupBy[k],
                            currentGroup = currentRecord[datafield],
                            currentGroupLabel = that.groups[datafield][currentGroup];

                        groupId += currentGroup;

                        if (groupsHandled.indexOf(groupId) === -1) {
                            htmlContent += `            <tr class="row">
                <td class="column group" style="padding-left: ${outlineLevel * 25}px;" colspan="${that.datafields.length}">${currentGroupLabel}</td>
            </tr>`;
                            groupsHandled.push(groupId);
                            i--;
                            continue mainLoop;
                        }

                        outlineLevel++;
                    }
                }

                let currentContent = `            <tr class="row row${row}${n}${toCollapse}"${level}`;

                if (!fileName) {
                    currentContent += ' style="page-break-inside: avoid;"'
                }

                currentContent += '>\n';

                for (let j = 0; j < datafields.length; j++) {
                    const cellCode = j + ',' + (row);
                    let colspan = 1, rowspan = 1;

                    if (mergedMainCells[cellCode]) {
                        colspan = mergedMainCells[cellCode].colspan;
                        rowspan = mergedMainCells[cellCode].rowspan;
                    }
                    else if (mergedSecondaryCells[cellCode]) {
                        continue;
                    }

                    const datafield = datafields[j];
                    let value = currentRecord[datafield],
                        indent = '';

                    if (that.actualHierarchy && j === 0) {
                        let sign = '';

                        if (currentRecord._expanded) {
                            sign = that.collapseChar;
                        }
                        else if (currentRecord._expanded === false) {
                            sign = that.expandChar;
                        }

                        indent = `<div class="toggle-element" style="margin-left: ${25 * (currentRecord._level - 1) + 5}px;" expanded>${sign}</div>`;
                    }

                    value = that.getFormattedValue(value, datafield);

                    let css = '';

                    if (style && style.columns && style.columns[datafield] && style.columns[datafield][row]) {
                        const uniqueStyle = style.columns[datafield][row];

                        css += `border-color: ${uniqueStyle.border}; background-color: ${uniqueStyle.background}; color: ${uniqueStyle.color};"`;
                    }

                    if (j === 0 && outlineLevel > 1) {
                        css += `padding-left: ${(outlineLevel - 1) * 25}px;"`;
                    }

                    if (css) {
                        css = ` style="${css}"`;
                    }

                    currentContent += `                <td class="column column${datafield}"${css} colspan="${colspan}" rowspan="${rowspan}">${indent + value}</td>\n`;
                }

                htmlContent += currentContent + '            </tr>\n';
            }

        htmlContent += `        </tbody>
    </table>
</body>
</html>`;

        if (arguments[2]) {
            return htmlContent;
        }

        return this.downloadFile(htmlContent, 'text/html', fileName);
    }

    /**
     * Exports to an image (PNG/JPEG).
     */
    exportToImage(data, fileName, fileExtension, callback) {
        const that = this;

        try {
            html2canvas;
        }
        catch (error) {
            throw new Error('jqx-grid: Missing reference to \'html2canvas.min.js\'.');
        }

        let imageData = null;

        const htmlContent = that.exportToHTML(data, fileName, true),
            iframe = document.createElement('iframe');

        iframe.style.position = 'absolute';
        iframe.style.top = 0;
        iframe.style.left = 0;
        iframe.style.border = 'none';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.opacity = 0;

        document.body.appendChild(iframe);

        iframe.contentDocument.write(htmlContent);

        function checkIframePopulated() {
            if (!iframe.contentDocument.body || !iframe.contentDocument.body.firstElementChild) {
                requestAnimationFrame(checkIframePopulated);
            }
            else {
                iframe.contentWindow.html2canvas(iframe.contentDocument.body.firstElementChild).then(canvas => {
                    const draw = $.jqxDraw(document.createElement('div'));

                    imageData = canvas.toDataURL('image/png');

                    if (callback) {
                        callback(imageData);
                    }
                    else {
                        document.body.appendChild(canvas);
                        draw.exportImage(undefined, canvas, fileExtension, fileName);
                    }

                    iframe.remove();
                    canvas.remove();
                });
            }
        }

        checkIframePopulated();

        return imageData;
    }

    /**
     * Gets merged cells information (for use in HTML and PDF export).
     */
    getMergedCellsInfo(mergedMainCells, mergedSecondaryCells, mapping) {
        const that = this;

        if (!that.mergedCells) {
            return;
        }

        const multipleTables = mapping && mapping[that.datafields.length - 1] !== 0;

        that.mergedCellsPDF = that.mergedCells.slice(0);

        for (let i = 0; i < that.mergedCellsPDF.length; i++) {
            const cellDefinition = that.mergedCellsPDF[i];
            let colspan = cellDefinition.colspan,
                rowspan = cellDefinition.rowspan;

            if (rowspan < 2 && colspan < 2) {
                continue;
            }

            const row = cellDefinition.cell[1];
            let col = cellDefinition.cell[0];

            if (multipleTables && colspan > 1) {
                const startTable = mapping[col],
                    endTable = mapping[col + colspan - 1],
                    splitCells = [];

                if (endTable > startTable) {
                    let currentTable = startTable,
                        currentColumn = col,
                        overal = 0;

                    mainLoop:
                        for (let i = startTable; i <= endTable; i++) {
                            let start = currentColumn,
                                span = 0;

                            while (mapping[currentColumn] === currentTable) {
                                currentColumn++;
                                overal++;
                                span++;

                                if (overal === colspan) {
                                    splitCells.push({ start: start, span: span });
                                    break mainLoop;
                                }
                            }

                            splitCells.push({ start: start, span: span });
                            currentTable = mapping[currentColumn];
                        }

                    colspan = splitCells[0].span;

                    for (let i = 1; i < splitCells.length; i++) {
                        that.mergedCellsPDF.push({ cell: [splitCells[i].start, row], colspan: splitCells[i].span, rowspan: rowspan, originalCell: col });
                    }
                }
            }

            for (let j = col; j < col + colspan; j++) {
                for (let k = row; k < row + rowspan; k++) {
                    const code = j + ',' + k;

                    if (j === col && k === row) {
                        mergedMainCells[code] = { colspan: colspan, rowspan: rowspan, originalCell: cellDefinition.originalCell };
                        continue;
                    }

                    mergedSecondaryCells[code] = true;
                }
            }
        }
    }

    /**
     * Gets alternation index.
     */
    getAlternationIndex(row, prefix) {
        const that = this;

        if (!that.style) {
            return '';
        }

        const rowsDefinition = that.style.rows,
            alternationCount = rowsDefinition && rowsDefinition.alternationCount;

        if (alternationCount &&
            (((rowsDefinition.alternationStart === undefined || row >= rowsDefinition.alternationStart) &&
                (rowsDefinition.alternationEnd === undefined || row <= rowsDefinition.alternationEnd)) ||
                rowsDefinition.alternationStart === rowsDefinition.alternationEnd)) {
            return prefix + (row % rowsDefinition.alternationCount);
        }

        return '';
    }

    /**
     * Gets formatted numeric or date value (for use in HTML and PDF export).
     */
    getFormattedValue(value, datafield) {
        const that = this,
            style = that.style;

        if (datafield && style && style.columns &&
            style.columns[datafield] && style.columns[datafield].format) {
            if (typeof value === 'number') {
                return that.formatNumber(value, style.columns[datafield].format);
            }
            else if (value instanceof Date) {
                return that.formatDate(value, style.columns[datafield].format);
            }
        }
        else if (value instanceof Date) {
            return that.formatDate(value, 'd');
        }

        return value;
    }

    /**
     * Exports to JSON.
     */
    exportToJSON(data, fileName) {
        return this.downloadFile(JSON.stringify(data, this.datafields.concat('rows')), 'application/json', fileName);
    }

    /**
     * Exports to PDF.
     */
    exportToPDF(data, fileName) {
        const that = this,
            datafields = that.datafields,
            startIndex = +that.exportHeader,
            groupsHandled = [],
            mergedMainCells = {},
            mergedSecondaryCells = {},
            mapping = {},
            headerRows = startIndex ? that.complexHeader ? that.complexHeader.length : 1 : 0,
            docDefinition = {
                pageOrientation: that.pageOrientation || 'portrait'
            };
        let header = [], content = [], tables;

        function createTableRow() {
            let tableRow = [];

            for (let i = 0; i < tables.length; i++) {
                tableRow.push([]);
            }

            return tableRow;
        }

        data = that.processGroupingInformation(data);
        that.data = data;
        that.headerRows = headerRows;
        that.getPDFStyle();

        const styleInfo = that.styleInfo;

        tables = styleInfo ? that.wrapPDFColumns(docDefinition, mapping) : [{ body: header, datafields: datafields }];

        if (startIndex) {
            header = that.getPDFHeader(datafields, tables, mapping);
        }

        that.getMergedCellsInfo(mergedMainCells, mergedSecondaryCells, mapping);

        mainLoop:
            for (let i = startIndex; i < data.length; i++) {
                const currentRecord = data[i];
                let groupId = '',
                    outlineLevel = 0;

                if (that.groupBy) {
                    for (let k = 0; k < that.groupBy.length; k++) {
                        const datafield = that.groupBy[k],
                            currentGroup = currentRecord[datafield],
                            currentGroupLabel = that.groups[datafield][currentGroup];

                        groupId += currentGroup;

                        if (groupsHandled.indexOf(groupId) === -1) {
                            that.createGroupHeaderRow(tables, { text: currentGroupLabel, style: ['row', 'cell', 'group'], marginLeft: outlineLevel * 7.5 });
                            groupsHandled.push(groupId);
                            i--;
                            continue mainLoop;
                        }

                        outlineLevel++;
                    }
                }

                const tableRow = createTableRow(),
                    row = i - startIndex;
                let n = that.getAlternationIndex(row, '');

                for (let j = 0; j < datafields.length; j++) {
                    const datafield = datafields[j],
                        entry = { style: ['row', 'row' + row, 'cell', 'cell' + datafield] },
                        tableIndex = mapping[j] || 0;

                    if (n !== undefined) {
                        entry.style.splice(1, 0, 'rowN' + n);
                    }

                    if (that.mergedCellsPDF) {
                        const cellCode = j + ',' + row,
                            mergeInfo = mergedMainCells[cellCode];

                        if (mergeInfo) {
                            entry.colSpan = mergeInfo.colspan;
                            entry.rowSpan = mergeInfo.rowspan;

                            if (mergeInfo.originalCell !== undefined) {
                                entry.text = '';
                                entry.style[entry.style.length - 1] = 'cell' + datafields[mergeInfo.originalCell];
                                tableRow[tableIndex].push(entry);
                                continue;
                            }
                        }
                        else if (mergedSecondaryCells[cellCode]) {
                            tableRow[tableIndex].push({});
                            continue;
                        }
                    }

                    const value = that.getFormattedValue(currentRecord[datafield], datafield);

                    entry.text = value.toString();
                    that.getUniqueStylePDF(entry, datafield, row);
                    that.setIndentation(entry, { j: j, currentRecord: currentRecord, value: value, outlineLevel: outlineLevel });
                    tableRow[tableIndex].push(entry);
                }

                for (let k = 0; k < tables.length; k++) {
                    tables[k].body.push(tableRow[k]);
                }
            }

        if (styleInfo) {
            for (let i = 0; i < tables.length; i++) {
                const body = tables[i].body;

                for (let j = headerRows - 1; j >= 0; j--) {
                    body.unshift(header[i][j]);
                }

                content.push({
                    table: {
                        headerRows: headerRows,
                        widths: tables[i].widths,
                        heights: function (row) {
                            if (styleInfo.heights[row]) {
                                return styleInfo.heights[row];
                            }

                            if (styleInfo.defaultHeight) {
                                return styleInfo.defaultHeight;
                            }
                        },
                        body: body
                    },
                    pageBreak: 'after'
                });
            }

            delete content[tables.length - 1].pageBreak;
            docDefinition.styles = styleInfo.styles;
        }
        else {
            const body = tables[0].body;

            for (let j = headerRows - 1; j >= 0; j--) {
                body.unshift(header[0][j]);
            }

            content = [{ table: { headerRows: headerRows, body: body } }];
            docDefinition.styles = { header: { bold: true }, group: { bold: true } };
        }

        docDefinition.content = content;
        pdfMake.createPdf(docDefinition).download(fileName);

        delete that.mergedCellsPDF;
        delete that.styleInfo;
    }

    /**
     * Gets the header content when exporting to PDF.
     */
    getPDFStyle() {
        const that = this,
            style = that.style;

        if (!style) {
            return '';
        }

        const sampleRecord = that.data[0],
            headerDefinition = style.header,
            columnsDefinition = style.columns,
            rowsDefinition = style.rows,
            styleInfo = {
                heights: [],
                widths: Array(that.datafields.length).fill('*'),
                styles: {
                    header: {},
                    row: {},
                    cell: {},
                    group: { fillColor: '#FFFFFF', color: '#000000', bold: true }
                }
            };

        that.styleInfo = styleInfo;

        function processStyleDefinition(definition, type) {
            if (!definition) {
                return;
            }

            for (let prop in definition) {
                if (!definition.hasOwnProperty(prop)) {
                    continue;
                }

                if (sampleRecord[prop] === undefined) {
                    if (prop === 'height' && type === 'header') {
                        for (let i = 0; i < that.headerRows; i++) {
                            styleInfo.heights[i] = (parseInt(definition[prop], 10) / that.headerRows) / 1.57;
                        }
                    }
                    else {
                        that.storePDFStyle({ prop: prop, value: definition[prop], toUpdate: type });
                    }
                }
                else {
                    for (let columnProp in definition[prop]) {
                        if (!isNaN(columnProp) || !definition[prop].hasOwnProperty(columnProp)) {
                            continue;
                        }

                        const value = definition[prop][columnProp],
                            index = that.datafields.indexOf(prop);

                        if (columnProp === 'width' && styleInfo.widths[index] === '*') {
                            styleInfo.widths[index] = parseFloat(value);
                        }
                        else {
                            that.storePDFStyle({ prop: columnProp, value: value, toUpdate: type + prop });
                        }
                    }
                }
            }
        }

        processStyleDefinition(headerDefinition, 'header');
        processStyleDefinition(columnsDefinition, 'cell');

        if (!rowsDefinition) {
            return;
        }

        for (let prop in rowsDefinition) {
            if (!rowsDefinition.hasOwnProperty(prop) || prop.indexOf('alt') !== -1) {
                continue;
            }

            const value = rowsDefinition[prop];

            if (!isNaN(prop)) {
                for (let rowProp in value) {
                    if (value.hasOwnProperty(rowProp)) {
                        if (rowProp === 'height') {
                            styleInfo.heights[parseFloat(prop) + that.headerRows] = parseFloat(value[rowProp]) / 1.57;
                        }
                        else {
                            that.storePDFStyle({ prop: rowProp, value: value[rowProp], toUpdate: 'row' + prop });
                        }
                    }
                }

                continue;
            }

            if (prop === 'height') {
                styleInfo.defaultHeight = parseFloat(value) / 1.57;
            }
            else {
                that.storePDFStyle({ prop: prop, value: value, toUpdate: 'row' });
            }
        }

        if (!rowsDefinition.alternationCount) {
            return;
        }

        for (let i = 0; i < rowsDefinition.alternationCount; i++) {
            const styleN = {};

            if (rowsDefinition[`alternationIndex${i}Color`]) {
                styleN.color = rowsDefinition[`alternationIndex${i}Color`];
            }

            if (rowsDefinition[`alternationIndex${i}BackgroundColor`]) {
                styleN.fillColor = rowsDefinition[`alternationIndex${i}BackgroundColor`];
            }

            styleInfo.styles['rowN' + i] = styleN;
        }
    }

    /**
     * Stores style in object to be applied to generated PDF.
     */
    storePDFStyle(details) {
        const that = this;
        let objectToUpdate = that.styleInfo.styles[details.toUpdate];

        if (!objectToUpdate) {
            objectToUpdate = {};
            that.styleInfo.styles[details.toUpdate] = objectToUpdate;
        }

        let value = details.value;

        switch (details.prop) {
            case 'backgroundColor':
                objectToUpdate.fillColor = value;
                break;
            case 'color':
                objectToUpdate.color = value;
                break;
            case 'fontSize':
                objectToUpdate.fontSize = parseFloat(value);
                break;
            case 'fontStyle':
                if (value === 'italic') {
                    objectToUpdate.italics = true;
                }

                break;
            case 'fontWeight':
                if (value === 'bold') {
                    objectToUpdate.bold = true;
                }

                break;
            case 'textAlign':
                objectToUpdate.alignment = value;
                break;
        }
    }

    /**
     * Enables column wrapping when exporting to PDF.
     */
    wrapPDFColumns(docDefinition, mapping) {
        const that = this,
            styleInfo = this.styleInfo,
            maxPerPage = docDefinition.pageOrientation === 'portrait' ? 775 : 1155, // maximum of 775px (portrait) or 1155px (landscape) per A4 page
            tables = [];
        let currentPage = 0;

        for (let i = 0; i < styleInfo.widths.length; i++) {
            let currentWidth = styleInfo.widths[i],
                numericWidth = currentWidth;

            if (currentWidth === '*') {
                numericWidth = 150;
            }
            else if (currentWidth >= maxPerPage) {
                numericWidth = maxPerPage
                currentWidth = '*';
            }
            else {
                currentWidth /= 1.57;
            }

            if (tables[currentPage] === undefined) {
                const body = [];

                tables[currentPage] = {
                    body: body,
                    width: numericWidth,
                    widths: [currentWidth],
                    datafields: [that.datafields[i]]
                };
                mapping[i] = currentPage;
                continue;
            }

            const table = tables[currentPage];

            if (table.width + numericWidth > maxPerPage) {
                currentPage++;
                i--;
                continue;
            }

            mapping[i] = currentPage;
            table.width += numericWidth;
            table.widths.push(currentWidth);
            table.datafields.push(that.datafields[i]);
        }

        return tables;
    }

    /**
     * Gets the header content when exporting to PDF.
     */
    getPDFHeader(datafields, tables, mapping) {
        const that = this,
            headerArray = [],
            headerRows = that.headerRows,
            headerStructure = that.complexHeader ? that.complexHeader : [Object.values(that.data[0])],
            headers = [];
        let result = [];

        for (let i = 0; i < headerRows; i++) {
            const row = headerStructure[i];

            for (let k = 0; k < row.length; k++) {
                let tableIndex = mapping[k] || 0;

                if (!headers[tableIndex]) {
                    headers[tableIndex] = [];
                }

                if (!headers[tableIndex][i]) {
                    headers[tableIndex][i] = [];
                }

                headers[tableIndex][i].push(row[k]);
            }
        }

        function processHeader(header, result, table) {
            for (let j = 0; j < headerRows; j++) {
                const row = header[j];
                const tableRow = [];

                for (let k = 0; k < row.length; k++) {
                    const currentLabel = row[k];
                    let colspan = 1, rowspan = 1;

                    if ((row[k - 1] && row[k - 1] === currentLabel) ||
                        (header[j - 1] && (header[j - 1][k] === currentLabel))) {
                        tableRow.push({});
                        continue;
                    }

                    let iterator = k + 1;

                    while (row[iterator] && row[iterator] === row[iterator - 1]) {
                        colspan++;
                        iterator++;
                    }

                    iterator = j + 1;

                    while (header[iterator] && header[iterator][k] === currentLabel) {
                        rowspan++;
                        iterator++;
                    }

                    const datafield = j === headerRows - 1 || rowspan + j === headerRows ?
                        table.datafields[k] : null,
                        entry = {
                            text: currentLabel, colSpan: colspan, rowSpan: rowspan
                        };

                    if (!datafield) {
                        entry.alignment = 'center';
                        entry.style = 'header';
                    }
                    else {
                        entry.style = ['header', 'header' + datafield];
                    }

                    tableRow.push(entry);
                }

                result.push(tableRow);
            }
        }

        for (let i = 0; i < tables.length; i++) {
            result = [];
            processHeader(headers[i], result, tables[i]);
            headerArray.push(result);
        }

        return headerArray;
    }

    /**
     * Creates group header rows when exporting to PDF.
     */
    createGroupHeaderRow(tables, entryTemplate) {
        for (let i = 0; i < tables.length; i++) {
            const entry = Object.assign({}, entryTemplate),
                colspan = tables[i].datafields.length,
                tableRow = [entry];

            entry.colSpan = colspan;
            tableRow.length = colspan;
            tableRow.fill({}, 1, colspan - 1);

            tables[i].body.push(tableRow);
        }
    }

    /**
     * Gets unique cell style when exporting to PDF.
     */
    getUniqueStylePDF(entry, datafield, row) {
        const style = this.style;

        function toHex(background) {
            const parts = /rgba\((\d+),(\d+),(\d+)\,(\d*.\d+|\d+)\)/gi.exec(background.replace(/\s/g, '')),
                r = parseFloat(parts[1]).toString(16).toUpperCase(),
                g = parseFloat(parts[2]).toString(16).toUpperCase(),
                b = parseFloat(parts[3]).toString(16).toUpperCase();

            return '#' + ('0').repeat(2 - r.length) + r +
                ('0').repeat(2 - g.length) + g +
                ('0').repeat(2 - b.length) + b;
        }

        if (!style || !style.columns || !style.columns[datafield]) {
            return;
        }

        const uniqueStyle = style.columns[datafield][row];

        if (!uniqueStyle) {
            return;
        }

        entry.fillColor = toHex(uniqueStyle.background);
        entry.color = uniqueStyle.color.toLowerCase();
    }

    /**
     * Sets the indentation of a PDF cell.
     */
    setIndentation(entry, details) {
        if (details.j !== 0) {
            return;
        }

        const that = this;

        if (that.actualHierarchy) {
            const currentRecord = details.currentRecord;

            if (currentRecord._expanded !== undefined) {
                entry.marginLeft = 25 * (currentRecord._level - 1);
                entry.text = that.collapseChar + ' ' + details.value;
            }
            else {
                entry.marginLeft = 25 * (currentRecord._level - 1) + 6;
            }
        }
        else if (details.outlineLevel > 1) {
            entry.marginLeft = (details.outlineLevel - 1) * 7.5;
        }
    }

    /**
     * Exports to XLSX.
     */
    exportToXLSX(data, fileName) {
        const that = this;
        let style = that.style;

        data = that.processGroupingInformation(data, true);
        that.data = data;
        that.getColumnsArray();

        that.complexHeaderMergedCells = [];

        if (that.complexHeaderMergeInfo) {
            for (let cell in that.complexHeaderMergeInfo) {
                if (that.complexHeaderMergeInfo.hasOwnProperty(cell)) {
                    const currentEntry = that.complexHeaderMergeInfo[cell];

                    if (currentEntry.from[0] === currentEntry.to[0] &&
                        currentEntry.from[1] === currentEntry.to[1]) {
                        continue;
                    }

                    that.complexHeaderMergedCells.push({
                        from: that.columnsArray[currentEntry.from[1]] + (currentEntry.from[0] + 1),
                        to: that.columnsArray[currentEntry.to[1]] + (currentEntry.to[0] + 1)
                    });
                }
            }
        }

        that.getConditionalFormatting();

        if (!style) {
            style = that.generateDefaultStyle(data);
        }

        const sharedStrings = that.generateSharedStrings(data),
            sharedStringsCollection = sharedStrings.collection,
            sharedStringsXML = sharedStrings.xml,
            stylesXML = that.generateStyles(style),
            sheet1XML = that.groupBy ? that.generateSheet1WithGrouping(data, sharedStringsCollection) :
                that.generateSheet1(data, sharedStringsCollection),
            auxiliaryFiles = that.generateAuxiliaryFiles(),

            // eslint-disable-next-line
            zip = new JSZip(),
            _rels = zip.folder('_rels'),
            docProps = zip.folder('docProps'),
            xl = zip.folder('xl'),
            xl_rels = xl.folder('_rels'),
            theme = xl.folder('theme'),
            worksheets = xl.folder('worksheets');

        _rels.file('.rels', auxiliaryFiles._relsRels);
        docProps.file('app.xml', auxiliaryFiles.docPropsAppXml);
        docProps.file('core.xml', auxiliaryFiles.docPropsCoreXml);
        xl_rels.file('workbook.xml.rels', auxiliaryFiles.xl_relsWorkbookXmlRels);
        theme.file('theme1.xml', auxiliaryFiles.xlThemeTheme1Xml);
        worksheets.file('sheet1.xml', sheet1XML);
        xl.file('sharedStrings.xml', sharedStringsXML);
        xl.file('styles.xml', stylesXML);
        xl.file('workbook.xml', auxiliaryFiles.xlWorkbookXml);
        zip.file('[Content_Types].xml', auxiliaryFiles.Content_TypesXml);

        zip.generateAsync({
            type: 'blob',
            mimeType:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
            .then(function (content) {
                return that.downloadFile(content, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', fileName);
            });

        delete that.conditionalFormattingXLSX;
        delete that.complexHeaderMergeInfo;
        delete that.defaultRowHeight;
        delete that.rowHeight;
    }

    /**
     * Processes grouping information.
     */
    processGroupingInformation(data, xlsx) {
        const that = this;

        if (!that.groupBy) {
            return data;
        }

        let header;

        data = data.slice(0);

        if (that.exportHeader) {
            if (xlsx && that.complexHeader) {
                header = data.slice(0, that.complexHeader.length);
                data.splice(0, that.complexHeader.length);
            }
            else {
                header = [data[0]];
                data.splice(0, 1);
            }
        }

        if (data.length > 1) {
            const getCompareFunction = function (a, knownDataType) {
                // gets data type of column (not necessary if the Grid provides this information)
                const dataType = knownDataType || typeof a;
                let compareFunction;

                switch (dataType) {
                    case 'string':
                        compareFunction = new Intl.Collator().compare;
                        break;
                    case 'number':
                        compareFunction = function (a, b) {
                            return a - b;
                        };
                        break;
                    case 'boolean':
                    case 'bool':
                        compareFunction = function (a, b) {
                            if (a === b) {
                                return 0;
                            }
                            else if (a === false) {
                                return -1;
                            }
                            else {
                                return 1;
                            }
                        };
                        break;
                    case 'date':
                    case 'time':
                    case 'dateTime':
						if (a instanceof Date) {
                            compareFunction = function (a, b) {
                                return a.compare(b);
                            };
                        }
                        break;
                    case 'object':
                        if (a instanceof Date) {
                            compareFunction = function (a, b) {
                                return a.getTime() - b.getTime();
                            };
                        }
                   

                        break;
                }

                return compareFunction;
            }

            const sortByMultipleColumns = function (dataSource, sortColumns, directions, customSortingCallback) {
                if (!dataSource || !(Array.isArray(dataSource)) || dataSource.length === 0 ||
                    !sortColumns || Array.isArray(sortColumns) && sortColumns.length === 0) {
                    return;
                }

                if (typeof sortColumns === 'string') {
                    sortColumns = [sortColumns];
                }

                const directionCoefficients = [],
                    compareFunctions = [];

                if (directions === undefined) {
                    directions = [];
                }

                for (let i = 0; i < sortColumns.length; i++) {
                    if (directions[i] === undefined || directions[i] === 'asc' || directions[i] === 'ascending') {
                        directionCoefficients[i] = 1;
                    }
                    else {
                        directionCoefficients[i] = -1;
                    }

                    compareFunctions[i] = getCompareFunction(dataSource[0][sortColumns[i]]);
                }

                if (customSortingCallback) {
                    customSortingCallback(dataSource, sortColumns, directions, compareFunctions);
                    return;
                }

                dataSource.sort(function (a, b) {
                    for (let i = 0; i < sortColumns.length; i++) {
                        const result = compareFunctions[i](a[sortColumns[i]], b[sortColumns[i]]);

                        if (result === 0) {
                            if (sortColumns[i + 1]) {
                                continue;
                            }
                            else if (a._index !== undefined) {
                                // makes sorting stable
                                return (a._index - b._index) * directionCoefficients[i];
                            }

                            return 0;
                        }

                        return result * directionCoefficients[i];
                    }
                });
            }

            sortByMultipleColumns(data, that.groupBy);
        }

        if (header) {
            data = header.concat(data);
        }

        that.getGroupLabels(data);

        return data;
    }

    /**
     * Exports to XML.
     */
    exportToXML(data, fileName) {
        const datafields = this.datafields.slice(0);
        let xmlContent = '<?xml version="1.0" encoding="UTF-8" ?>\n<table>\n';

        if (datafields.indexOf('rows') === -1) {
            datafields.push('rows');
        }

        function recursion(records, indent) {
            let content = '';

            for (let i = 0; i < records.length; i++) {
                const currentRecord = records[i];

                content += indent + '<row>\n';

                for (let j = 0; j < datafields.length; j++) {
                    const datafield = datafields[j];

                    if (datafield === 'rows') {
                        if (!currentRecord.rows) {
                            continue;
                        }

                        content += `${indent}    <rows>\n${recursion(currentRecord.rows, indent + '        ')}${indent}    </rows>\n`;
                        continue;
                    }

                    content += indent + `    <${datafield}>${currentRecord[datafield]}</${datafield}>\n`;
                }

                content += indent + '</row>\n';
            }

            return content;
        }

        xmlContent += recursion(data, '    ') + '</table>';

        return this.downloadFile(xmlContent, 'application/xml', fileName);
    }

    /**
     * Formats a date.
     */
    formatDate(value, format) {
		var date = $.jqx.formatDate(value, format);

		return date;
    }

    /**
     * Formats a number.
     */
    formatNumber(value, format) {
    	var number = $.jqx.formatNumber(value, format);

		return number;
    }

    /**
     * Generates auxiliary files necessary for XLSX.
     */
    generateAuxiliaryFiles() {
        // _rels\.rels
        const _relsRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;

        // docProps\app.xml
        const docPropsAppXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>Microsoft Excel</Application><DocSecurity>0</DocSecurity><ScaleCrop>false</ScaleCrop><HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>1</vt:i4></vt:variant></vt:vector></HeadingPairs><TitlesOfParts><vt:vector size="1" baseType="lpstr"><vt:lpstr>Sheet1</vt:lpstr></vt:vector></TitlesOfParts><Company></Company><LinksUpToDate>false</LinksUpToDate><SharedDoc>false</SharedDoc><HyperlinksChanged>false</HyperlinksChanged><AppVersion>16.0300</AppVersion></Properties>`;

        // docProps\core.xml
        const now = new Date().toISOString(),
            docPropsCoreXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:creator>Smart HTML Elements</dc:creator><cp:lastModifiedBy>Smart HTML Elements</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified></cp:coreProperties>`;

        // xl\_rels\workbook.xml.rels
        const xl_relsWorkbookXmlRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/></Relationships>`;

        // xl\theme\theme1.xml
        const xlThemeTheme1Xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="44546A"/></a:dk2><a:lt2><a:srgbClr val="E7E6E6"/></a:lt2><a:accent1><a:srgbClr val="4472C4"/></a:accent1><a:accent2><a:srgbClr val="ED7D31"/></a:accent2><a:accent3><a:srgbClr val="A5A5A5"/></a:accent3><a:accent4><a:srgbClr val="FFC000"/></a:accent4><a:accent5><a:srgbClr val="5B9BD5"/></a:accent5><a:accent6><a:srgbClr val="70AD47"/></a:accent6><a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Calibri Light" panose="020F0302020204030204"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="游ゴシック Light"/><a:font script="Hang" typeface="맑은 고딕"/><a:font script="Hans" typeface="等线 Light"/><a:font script="Hant" typeface="新細明體"/><a:font script="Arab" typeface="Times New Roman"/><a:font script="Hebr" typeface="Times New Roman"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="MoolBoran"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Times New Roman"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/><a:font script="Armn" typeface="Arial"/><a:font script="Bugi" typeface="Leelawadee UI"/><a:font script="Bopo" typeface="Microsoft JhengHei"/><a:font script="Java" typeface="Javanese Text"/><a:font script="Lisu" typeface="Segoe UI"/><a:font script="Mymr" typeface="Myanmar Text"/><a:font script="Nkoo" typeface="Ebrima"/><a:font script="Olck" typeface="Nirmala UI"/><a:font script="Osma" typeface="Ebrima"/><a:font script="Phag" typeface="Phagspa"/><a:font script="Syrn" typeface="Estrangelo Edessa"/><a:font script="Syrj" typeface="Estrangelo Edessa"/><a:font script="Syre" typeface="Estrangelo Edessa"/><a:font script="Sora" typeface="Nirmala UI"/><a:font script="Tale" typeface="Microsoft Tai Le"/><a:font script="Talu" typeface="Microsoft New Tai Lue"/><a:font script="Tfng" typeface="Ebrima"/></a:majorFont><a:minorFont><a:latin typeface="Calibri" panose="020F0502020204030204"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="游ゴシック"/><a:font script="Hang" typeface="맑은 고딕"/><a:font script="Hans" typeface="等线"/><a:font script="Hant" typeface="新細明體"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/><a:font script="Armn" typeface="Arial"/><a:font script="Bugi" typeface="Leelawadee UI"/><a:font script="Bopo" typeface="Microsoft JhengHei"/><a:font script="Java" typeface="Javanese Text"/><a:font script="Lisu" typeface="Segoe UI"/><a:font script="Mymr" typeface="Myanmar Text"/><a:font script="Nkoo" typeface="Ebrima"/><a:font script="Olck" typeface="Nirmala UI"/><a:font script="Osma" typeface="Ebrima"/><a:font script="Phag" typeface="Phagspa"/><a:font script="Syrn" typeface="Estrangelo Edessa"/><a:font script="Syrj" typeface="Estrangelo Edessa"/><a:font script="Syre" typeface="Estrangelo Edessa"/><a:font script="Sora" typeface="Nirmala UI"/><a:font script="Tale" typeface="Microsoft Tai Le"/><a:font script="Talu" typeface="Microsoft New Tai Lue"/><a:font script="Tfng" typeface="Ebrima"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:lumMod val="110000"/><a:satMod val="105000"/><a:tint val="67000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:lumMod val="105000"/><a:satMod val="103000"/><a:tint val="73000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="105000"/><a:satMod val="109000"/><a:tint val="81000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:satMod val="103000"/><a:lumMod val="102000"/><a:tint val="94000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:satMod val="110000"/><a:lumMod val="100000"/><a:shade val="100000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="99000"/><a:satMod val="120000"/><a:shade val="78000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln><a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln><a:ln w="19050" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="57150" dist="19050" dir="5400000" algn="ctr" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="63000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"><a:tint val="95000"/><a:satMod val="170000"/></a:schemeClr></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="93000"/><a:satMod val="150000"/><a:shade val="98000"/><a:lumMod val="102000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:tint val="98000"/><a:satMod val="130000"/><a:shade val="90000"/><a:lumMod val="103000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="63000"/><a:satMod val="120000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/><a:extLst><a:ext uri="{05A4C25C-085E-4340-85A3-A5531E510DB2}"><thm15:themeFamily xmlns:thm15="http://schemas.microsoft.com/office/thememl/2012/main" name="Office Theme" id="{62F939B6-93AF-4DB8-9C6B-D6C7DFDC589F}" vid="{4A3C46E8-61CC-4603-A589-7422A47A8E4A}"/></a:ext></a:extLst></a:theme>`;

        // xl\workbook.xml
        const xlWorkbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x15 xr xr6 xr10 xr2" xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" xmlns:xr="http://schemas.microsoft.com/office/spreadsheetml/2014/revision" xmlns:xr6="http://schemas.microsoft.com/office/spreadsheetml/2016/revision6" xmlns:xr10="http://schemas.microsoft.com/office/spreadsheetml/2016/revision10" xmlns:xr2="http://schemas.microsoft.com/office/spreadsheetml/2015/revision2"><fileVersion appName="xl" lastEdited="7" lowestEdited="7" rupBuild="20325"/><workbookPr defaultThemeVersion="166925"/><mc:AlternateContent xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"><mc:Choice Requires="x15"><x15ac:absPath url="C:\Users\jqwidgets\Desktop\" xmlns:x15ac="http://schemas.microsoft.com/office/spreadsheetml/2010/11/ac"/></mc:Choice></mc:AlternateContent><xr:revisionPtr revIDLastSave="0" documentId="13_ncr:1_{0DEDCB6D-5403-4CD8-AAA5-59B6D238A8B6}" xr6:coauthVersionLast="34" xr6:coauthVersionMax="34" xr10:uidLastSave="{00000000-0000-0000-0000-000000000000}"/><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="19200" windowHeight="6950" xr2:uid="{0CB664E6-3800-4A88-B158-B46A682E7484}"/></bookViews><sheets><sheet name="Sheet1" sheetId="1" r:id="rId1"/></sheets><calcPr calcId="179021"/><extLst><ext uri="{140A7094-0E35-4892-8432-C4D2E57EDEB5}" xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main"><x15:workbookPr chartTrackingRefBase="1"/></ext></extLst></workbook>`;

        // [Content_Types].xml
        const Content_TypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="bin" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings"/><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`;

        return {
            _relsRels: _relsRels,
            docPropsAppXml: docPropsAppXml,
            docPropsCoreXml: docPropsCoreXml,
            xl_relsWorkbookXmlRels: xl_relsWorkbookXmlRels,
            xlThemeTheme1Xml: xlThemeTheme1Xml,
            xlWorkbookXml: xlWorkbookXml,
            Content_TypesXml: Content_TypesXml
        };
    }

    /**
     * Generates default style object (for use in XLSX export).
     */
    generateDefaultStyle(data) {
        const that = this,
            defaultStyle = {},
            datafields = that.datafields,
            firstRecord = that.complexHeader ? data[that.complexHeader.length] : data[+that.exportHeader];

        if (!firstRecord) {
            return defaultStyle;
        }

        for (let i = 0; i < datafields.length; i++) {
            const sampleValue = firstRecord[datafields[i]];

            if (sampleValue instanceof Date) {
                if (!defaultStyle.columns) {
                    defaultStyle.columns = [];
                }

                defaultStyle.columns[datafields[i]] = { format: 'd' };
            }
        }

        return defaultStyle;
    }

    /**
     * Generates group row.
     */
    generateGroupRow(details) {
        const rowNumber = details.rowNumber,
            from = 'A' + rowNumber,
            recordXML = `        <row r="${rowNumber}" outlineLevel="${details.outlineLevel}" spans="1:${details.numberOfColumns}"${this.getCustomRowHeight(rowNumber - 1)} x14ac:dyDescent="0.45">
            <c r="${from}" t="s" s="0">
                <v>${details.sharedStringIndex}</v>
            </c>
        </row>\n`;

        details.mergedCells.push({ from: from, to: this.columnsArray[details.numberOfColumns - 1] + rowNumber });

        return recordXML;
    }

    /**
     * Generates sharedStrings.xml.
     */
    generateSharedStrings(data) {
        const that = this,
            datafields = that.datafields,
            collection = [];
        let xml = '',
            count = 0,
            uniqueCount = 0;

        function addSharedString(currentValue) {
            count++;

            if (collection.indexOf(currentValue) === -1) {
                uniqueCount++;
                collection.push(currentValue);

                currentValue = currentValue.replace(/&(?!amp;)/g, '&amp;');
                currentValue = currentValue.replace(/'/g, '&apos;');
                currentValue = currentValue.replace(/"/g, '&quot;');
                currentValue = currentValue.replace(/>/g, '&gt;');
                currentValue = currentValue.replace(/</g, '&lt;');

                xml += `<si><t>${currentValue}</t></si>`;
            }
        }

        for (let i = 0; i < data.length; i++) {
            const currentRecord = data[i];

            for (let j = 0; j < datafields.length; j++) {
                let currentValue = currentRecord[datafields[j]];

                if (typeof currentValue !== 'string') {
                    continue;
                }

                addSharedString(currentValue);
            }
        }

        if (that.groupLabels) {
            for (let i = 0; i < that.groupLabels.length; i++) {
                addSharedString(that.groupLabels[i]);
            }
        }

        xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${count}" uniqueCount="${uniqueCount}">${xml}</sst>`;

        return { collection: collection, xml: xml };
    }

    /**
     * Generates sheet1.xml.
     */
    generateSheet1(data, sharedStrings) {
        const that = this,
            numberOfColumns = that.columnsArray.length,
            numberOfRows = data.length,
            dimensionEnd = that.columnsArray[numberOfColumns - 1] + numberOfRows,
            datafields = that.datafields,
            autoFilter = that.getFilters(),
            mergedCells = [].concat(that.complexHeaderMergedCells);

        let xmlContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac xr xr2 xr3" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" xmlns:xr="http://schemas.microsoft.com/office/spreadsheetml/2014/revision" xmlns:xr2="http://schemas.microsoft.com/office/spreadsheetml/2015/revision2" xmlns:xr3="http://schemas.microsoft.com/office/spreadsheetml/2016/revision3" xr:uid="{7F25248B-C640-4C64-AD47-C0EA0E5D90D0}">
    <sheetPr filterMode="${autoFilter !== ''}" />
    <dimension ref="A1:${dimensionEnd}" />
    <sheetViews>
        <sheetView tabSelected="1" workbookViewId="0" />
    </sheetViews>
    <sheetFormatPr defaultRowHeight="14.5" x14ac:dyDescent="0.35" />${that.getCustomColumnWidths()}
    <sheetData>\n`;

        function r(col, row) {
            return that.columnsArray[col] + row;
        }

        for (let i = 0; i <= data.length; i++) {
            const currentRecord = data[i],
                rowNumber = i + 1;
            let collapsed = '';

            if (that.actualHierarchy) {
                const previousRecord = data[i - 1];

                if (previousRecord && previousRecord._collapsed &&
                    (!currentRecord || previousRecord._level > currentRecord._level)) {
                    collapsed = ' collapsed="true"';
                }
            }

            if (i === data.length) {
                if (collapsed) {
                    xmlContent += `        <row r="${rowNumber}" outlineLevel="${Math.max(data[i - 1]._level - 2, 0)}" hidden="false" collapsed="true" />\n`;
                }

                break;
            }

            let recordXML = `        <row r="${rowNumber}"${that.getOutlineLevel(currentRecord)} hidden="${currentRecord._hidden || currentRecord._collapsed || false}"${collapsed} spans="1:${numberOfColumns}"${that.getCustomRowHeight(rowNumber - 1)} x14ac:dyDescent="0.45">\n`;

            for (let j = 0; j < datafields.length; j++) {
                const s = that.getXLSXCellStyle(r(j, rowNumber));

                recordXML += that.getActualCellData(currentRecord[datafields[j]], { r: r(j, rowNumber), s: s }, sharedStrings);
            }

            recordXML += '        </row>\n';
            xmlContent += recordXML;
        }

        xmlContent += `    </sheetData>${that.conditionalFormattingXLSX.conditions}${autoFilter}${that.getMergedCells(mergedCells)}
    <pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3" />
    <pageSetup paperSize="9" orientation="portrait" r:id="rId1" />
</worksheet>`;

        return xmlContent;
    }

    /**
     * Generates sheet1.xml with grouping.
     */
    generateSheet1WithGrouping(data, sharedStrings) {
        const that = this,
            numberOfColumns = that.columnsArray.length,
            numberOfRows = data.length,
            dimensionEnd = that.columnsArray[numberOfColumns - 1] + numberOfRows,
            datafields = that.datafields,
            mergedCells = [].concat(that.complexHeaderMergedCells);

        let xmlContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac xr xr2 xr3" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" xmlns:xr="http://schemas.microsoft.com/office/spreadsheetml/2014/revision" xmlns:xr2="http://schemas.microsoft.com/office/spreadsheetml/2015/revision2" xmlns:xr3="http://schemas.microsoft.com/office/spreadsheetml/2016/revision3" xr:uid="{7F25248B-C640-4C64-AD47-C0EA0E5D90D0}">
    <dimension ref="A1:${dimensionEnd}" />
    <sheetViews>
        <sheetView tabSelected="1" workbookViewId="0" />
    </sheetViews>
    <sheetFormatPr defaultRowHeight="14.5" x14ac:dyDescent="0.35" />${that.getCustomColumnWidths()}
    <sheetData>\n`,
            rowNumberCorrection = 0,
            groupsHandled = [];

        function r(col, row) {
            return that.columnsArray[col] + row;
        }

        mainLoop:
            for (let i = 0; i < data.length; i++) {
                const currentRecord = data[i],
                    rowNumber = i + 1 + rowNumberCorrection;
                let outlineLevel = 0,
                    outlineXML = '';

                if (!that.exportHeader ||
                    (!that.complexHeader && i !== 0) ||
                    (that.complexHeader && i >= that.complexHeader.length)) {
                    let groupId = '';

                    for (let k = 0; k < that.groupBy.length; k++) {
                        const datafield = that.groupBy[k],
                            currentGroup = currentRecord[datafield],
                            currentGroupLabel = that.groups[datafield][currentGroup];

                        groupId += currentGroup;

                        if (groupsHandled.indexOf(groupId) === -1) {
                            let sharedStringIndex = sharedStrings.indexOf(currentGroupLabel);

                            xmlContent += that.generateGroupRow({
                                rowNumber: rowNumber,
                                outlineLevel: outlineLevel,
                                numberOfColumns: numberOfColumns,
                                sharedStringIndex: sharedStringIndex,
                                mergedCells: mergedCells
                            });
                            groupsHandled.push(groupId);
                            i--;
                            rowNumberCorrection++;
                            continue mainLoop;
                        }

                        outlineLevel++;
                    }

                    outlineXML = ` outlineLevel="${outlineLevel}"`;
                }

                let recordXML = `        <row r="${rowNumber}"${outlineXML} spans="1:${numberOfColumns}"${that.getCustomRowHeight(rowNumber - 1)} x14ac:dyDescent="0.45">\n`;

                for (let j = 0; j < datafields.length; j++) {
                    const s = that.getXLSXCellStyle(r(j, i + 1));

                    recordXML += that.getActualCellData(currentRecord[datafields[j]], { r: r(j, rowNumber), s: s }, sharedStrings);
                }

                recordXML += '        </row>\n';
                xmlContent += recordXML;
            }

        xmlContent += `    </sheetData>${that.getMergedCells(mergedCells)}
    <pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3" />
    <pageSetup paperSize="9" orientation="portrait" r:id="rId1" />
</worksheet>`;

        return xmlContent;
    }

    /**
     * Gets actual spreadsheet cell data.
     */
    getActualCellData(currentValue, details, sharedStrings) {
        const r = details.r,
            s = details.s || ' s="0"';

        if (typeof currentValue === 'string') {
            return `            <c r="${r}" t="s"${s}>
                <v>${sharedStrings.indexOf(currentValue)}</v>
            </c>\n`;
        }

        if (typeof currentValue === 'boolean') {
            return `            <c r="${r}" t="b"${s}>
                <v>${+currentValue}</v>
            </c>\n`;
        }

        if (currentValue instanceof Date) {
            const excelDate = (currentValue.getTime() + this.timeBetween1900And1970) / 86400000 + 2;

            return `            <c r="${r}"${s}>
                <v>${excelDate}</v>
            </c>\n`;
        }

        // numeric cells
        return `            <c r="${r}"${s}>
                <v>${currentValue}</v>
            </c>\n`;
    }

    /**
     * Gets column labels.
     */
    getColumnsArray() {
        const that = this,
            numberOfColumns = that.datafields.length,
            columnsCollection = [];

        function getIterator(i) {
            if (i < 26) {
                return '';
            }

            return String.fromCharCode(64 + Math.floor(i / 26));
        }

        for (let i = 0; i < numberOfColumns; i++) {
            columnsCollection.push(getIterator(i) + String.fromCharCode(65 + (i < 26 ? i : i % 26)));
        }

        that.columnsArray = columnsCollection;
    }

    /**
     * Gets column style.
     */
    getColumnStyle() {
        const that = this,
            style = that.style;

        if (!style) {
            return `        .header { border: 1px solid black; padding: 5px; }
        .column { border: 1px solid black; padding: 5px; }
        .group { background-color: #FFFFFF; color: #000000; font-weight: bold; }`;
        }

        const styles = {
            header: 'border: 1px solid black; padding: 5px; ',
            column: 'white-space: nowrap; overflow: hidden; border: 1px solid black; padding: 5px; ',
            group: 'background-color: #FFFFFF; color: #000000; font-weight: bold; '
        },
            sampleRecord = that.data[0];
        let generatedStyle = '';

        const headerDefinition = style.header || {};

        for (let prop in headerDefinition) {
            if (!headerDefinition.hasOwnProperty(prop)) {
                continue;
            }

            const value = headerDefinition[prop];

            if (sampleRecord[prop]) {
                if (!styles['header' + prop]) {
                    styles['header' + prop] = '';
                }

                for (let columnProp in value) {
                    if (value.hasOwnProperty(columnProp)) {
                        const css = window.jqxToDash(columnProp) + ': ' + value[columnProp] + '; ';

                        styles['header' + prop] += css;

                        if (columnProp === 'width') {
                            if (!styles['column' + prop]) {
                                styles['column' + prop] = '';
                            }

                            styles['column' + prop] += css;
                        }
                    }
                }

                continue;
            }

            if (prop === 'height' && that.complexHeader) {
                styles.header += 'height: ' + parseInt(headerDefinition[prop], 10) / that.complexHeader.length + 'px; ';
            }
            else {
                styles.header += window.jqxToDash(prop) + ': ' + headerDefinition[prop] + '; ';
            }
        }

        const columnsDefinition = style.columns || {};

        for (let prop in columnsDefinition) {
            if (!columnsDefinition.hasOwnProperty(prop)) {
                continue;
            }

            const value = columnsDefinition[prop];

            if (sampleRecord[prop]) {
                if (!styles['column' + prop]) {
                    styles['column' + prop] = '';
                }

                for (let columnProp in value) {
                    if (isNaN(columnProp) && value.hasOwnProperty(columnProp) && columnProp !== 'format') {
                        styles['column' + prop] += window.jqxToDash(columnProp) + ': ' + value[columnProp] + '; ';
                    }
                }

                continue;
            }

            styles.column += window.jqxToDash(prop) + ': ' + value + '; ';
        }

        for (let prop in styles) {
            if (styles.hasOwnProperty(prop)) {
                generatedStyle += `        .${prop} { ${styles[prop]}}\n`;
            }
        }

        return generatedStyle;
    }

    /**
     * Gets custom column widths.
     */
    getCustomColumnWidths() {
        const that = this;

        if (!that.style || !that.columnWidth || that.columnWidth.length === 0) {
            return '';
        }

        let xml = '\n    <cols>\n';

        for (let i = 0; i < that.columnWidth.length; i++) {
            let width = that.columnWidth[i];

            if (width !== undefined) {
                width = Math.round(parseFloat(width)) / 11;
                xml += `        <col min="${i + 1}" max="${i + 1}" width="${width}" customWidth="1" />\n`;
            }
        }

        xml += '    </cols>';

        return xml;
    }

    /**
     * Returns customFilter tag.
     */
    getCustomFilter(value, condition) {
        let operator = 'equal',
            val;

        if (value instanceof Date) {
            value = (value.getTime() + this.timeBetween1900And1970) / 86400000 + 2;
        }

        condition = condition.toUpperCase();

        switch (condition) {
            case 'EMPTY':
                val = '';
                break;
            case 'NOT_EMPTY':
                val = '';
                operator = 'notEqual';
                break;
            case 'CONTAINS':
            case 'CONTAINS_CASE_SENSITIVE':
                val = `*${value}*`;
                break;
            case 'DOES_NOT_CONTAIN':
            case 'DOES_NOT_CONTAIN_CASE_SENSITIVE':
                val = `*${value}*`;
                operator = 'notEqual';
                break;
            case 'STARTS_WITH':
            case 'STARTS_WITH_CASE_SENSITIVE':
                val = `${value}*`;
                break;
            case 'ENDS_WITH':
            case 'ENDS_WITH_CASE_SENSITIVE':
                val = `*${value}`;
                break;
            case 'EQUAL':
            case 'EQUAL_CASE_SENSITIVE':
                val = value;
                break;
            case 'NULL':
                val = null;
                break;
            case 'NOT_NULL':
                val = null;
                operator = 'notEqual';
                break;
            case 'NOT_EQUAL':
                val = value;
                operator = 'notEqual';
                break;
            case 'LESS_THAN':
                val = value;
                operator = 'lessThan';
                break;
            case 'LESS_THAN_OR_EQUAL':
                val = value;
                operator = 'lessThanOrEqual';
                break;
            case 'GREATER_THAN':
                val = value;
                operator = 'greaterThan';
                break;
            case 'GREATER_THAN_OR_EQUAL':
                val = value;
                operator = 'greaterThanOrEqual';
                break;
        }

        return `                <customFilter val="${val}" operator="${operator}"/>\n`;
    }

    /**
     * Gets custom row height.
     */
    getCustomRowHeight(row) {
        const that = this;

        if (that.style) {
            return that.rowHeight[row] || that.defaultRowHeight || '';
        }

        return '';
    }

    /**
     * Gets datafields.
     */
    getDatafields(data) {
        const that = this,
            sampleRecord = data[0],
            datafields = [];

        for (let prop in sampleRecord) {
            if (sampleRecord.hasOwnProperty(prop) && prop.charAt(0) !== '_') {
                datafields.push(prop);
            }
        }

        that.datafields = datafields;
    }

    /**
     * Returns autoFilter XML.
     */
    getFilters() {
        const that = this,
            filterBy = that.filterBy;

        if (!filterBy) {
            return '';
        }

        let xml = '';

        for (let datafield in filterBy) {
            if (filterBy.hasOwnProperty(datafield)) {
                const colId = that.datafields.indexOf(datafield);

                if (colId === -1) {
                    continue;
                }

                const filterDetails = filterBy[datafield],
                    filters = filterDetails.filters;

                xml += `        <filterColumn colId="${colId}">
            <customFilters and="${!filterDetails.operator}">\n`;

                for (let i = 0; i < filters.length; i++) {
                    xml += that.getCustomFilter(filters[i].value, filters[i].condition);
                }

                xml += `            </customFilters>
        </filterColumn>`;
            }
        }

        if (!xml) {
            return '';
        }

        xml = `\n    <autoFilter ref="A1:${that.columnsArray[that.columnsArray.length - 1] + that.data.length}">\n${xml}\n    </autoFilter>`;
        return xml;
    }

    /**
     * Gets group labels based on data.
     */
    getGroupLabels(data) {
        const that = this,
            startIndex = that.xlsxStartIndex !== undefined ? that.xlsxStartIndex : +that.exportHeader,
            groups = {},
            groupLabels = [];

        for (let i = startIndex; i < data.length; i++) {
            const currentRecord = data[i];

            for (let j = 0; j < that.groupBy.length; j++) {
                const datafield = that.groupBy[j],
                    currentValue = currentRecord[datafield];
                let group = groups[datafield];

                if (group === undefined) {
                    groups[datafield] = {};
                    group = groups[datafield];
                }

                if (group[currentValue] === undefined) {
                    group[currentValue] = (that.exportHeader ? data[startIndex - 1][datafield] : datafield) + ': ' + currentValue;
                    groupLabels.push(group[currentValue]);
                }
            }
        }

        that.groups = groups;
        that.groupLabels = groupLabels;
    }

    /**
     * Gets the header content when exporting to HTML.
     */
    getHTMLHeader(datafields, data) {
        const that = this;
        let header = '\n        <thead>\n';

        if (!that.complexHeader) {
            header += '            <tr>\n';

            for (let j = 0; j < datafields.length; j++) {
                const datafield = datafields[j];

                header += `                <th class="header header${datafield}">${data[0][datafield]}</th>\n`;
            }

            header += '            </tr>\n        </thead>';
            return header;
        }

        for (let j = 0; j < that.complexHeader.length; j++) {
            const row = that.complexHeader[j];

            header += '            <tr>\n';

            for (let k = 0; k < row.length; k++) {
                const currentLabel = row[k];
                let colspan = 1, rowspan = 1;

                if ((row[k - 1] && row[k - 1] === currentLabel) ||
                    (that.complexHeader[j - 1] && (that.complexHeader[j - 1][k] === currentLabel))) {
                    continue;
                }

                let iterator = k + 1;

                while (row[iterator] && row[iterator] === row[iterator - 1]) {
                    colspan++;
                    iterator++;
                }

                iterator = j + 1;

                while (that.complexHeader[iterator] && that.complexHeader[iterator][k] === currentLabel) {
                    rowspan++;
                    iterator++;
                }

                const datafield = j === that.complexHeader.length - 1 || rowspan + j === that.complexHeader.length ?
                    ' header' + datafields[k] : '';

                header += `                <th class="header${datafield}" colspan="${colspan}" rowspan="${rowspan}">${currentLabel}</th>\n`;
            }

            header += '            </tr>\n';
        }

        header += '        </thead>';
        return header;
    }

    /**
     * Gets conditional formatting XML.
     */
    getConditionalFormatting() {
        const that = this,
            conditionalFormatting = that.conditionalFormatting;

        if (!conditionalFormatting) {
            that.conditionalFormattingXLSX = { conditions: '', styles: '' };
            return;
        }

        const dxfCodes = [];
        let conditionsXml = '',
            stylesXml = '';

        for (let i = conditionalFormatting.length - 1; i >= 0; i--) {
            const columnFormat = conditionalFormatting[i],
                columnLetter = that.columnsArray[that.datafields.indexOf(columnFormat.column)],
                startCell = columnLetter + (that.xlsxStartIndex + 1),
                sqref = startCell + ':' + columnLetter + (that.data.length),
                dxfCode = columnFormat.background + columnFormat.color,
                attr = that.getConditionalAttributes(columnFormat, startCell);
            let dxfId = dxfCodes.indexOf(dxfCode);

            if (dxfId === -1) {
                const newDxf = `        <dxf>
            <font>
                <b val="0"/>
                <i val="0"/>
                <color rgb="${columnFormat.color === 'White' ? 'FFFFFFFF' : 'FF000000'}"/>
                <sz val="10"/>
            </font>
            <fill>
                <patternFill>
                    <bgColor rgb="${that.toARGB(columnFormat.background)}"/>
                </patternFill>
            </fill>
        </dxf>\n`;

                stylesXml += newDxf;
                dxfId = dxfCodes.length;
                dxfCodes.push(dxfCode);
            }

            conditionsXml += `    <conditionalFormatting sqref="${sqref}">
        <cfRule dxfId="${dxfId}" text="${attr.text}" rank="${attr.rank}" percent="${attr.percent}" bottom="${attr.bottom}" equalAverage="${attr.equalAverage}" aboveAverage="${attr.aboveAverage}"${attr.operator}${attr.timePeriod} priority="${i + 2}" type="${attr.type}">
${attr.formula}        </cfRule>
    </conditionalFormatting>\n`;
        }

        stylesXml = `    <dxfs count="${dxfCodes.length}">\n${stylesXml}    </dxfs>`;

        that.conditionalFormattingXLSX = { conditions: conditionsXml, styles: stylesXml };
    }

    /**
     * Gets conditional formatting XML attributes.
     */
    getConditionalAttributes(columnFormat, startCell) {
        let condition = columnFormat.condition,
            comparator = columnFormat.comparator,
            text = '',
            rank = 0,
            percent = 0,
            bottom = 0,
            equalAverage = 0,
            aboveAverage = 0,
            operator = '',
            timePeriod = '',
            type = '',
            formula = '';

        switch (condition) {
            case 'equal':
                operator = 'equal';
                type = 'cellIs';
                formula = `            <formula>${comparator}</formula>\n`;
                break;
            case 'lessThan':
                operator = 'lessThan';
                type = 'cellIs';
                formula = `            <formula>${comparator}</formula>\n`;
                break;
            case 'greaterThan':
                operator = 'greaterThan';
                type = 'cellIs';
                formula = `            <formula>${comparator}</formula>\n`;
                break;
            case 'notEqual':
                operator = 'notEqual';
                type = 'cellIs';
                formula = `            <formula>${comparator}</formula>\n`;
                break;
            case 'between':
                operator = 'between';
                type = 'cellIs';
                formula = `            <formula>${columnFormat.min}</formula>
            <formula>${columnFormat.max}</formula>\n`;
                break;
            case 'duplicate':
                type = 'duplicateValues';
                formula = '            <formula>0</formula>\n';
                break;
            case 'topNItems':
                rank = comparator;
                type = 'top10';
                break;
            case 'bottomNItems':
                rank = comparator;
                bottom = 1;
                type = 'top10';
                break;
            case 'topNPercent':
                rank = comparator;
                percent = 1;
                type = 'top10';
                break;
            case 'bottomNPercent':
                rank = comparator;
                percent = 1;
                bottom = 1;
                type = 'top10';
                break;
            case 'aboveAverage':
                aboveAverage = 1;
                type = 'aboveAverage';
                formula = '            <formula>0</formula>\n';
                break;
            case 'belowAverage':
                type = 'aboveAverage';
                formula = '            <formula>0</formula>\n';
                break;
            case 'contains':
                text = comparator;
                operator = 'containsText';
                type = 'containsText';
                formula = `            <formula>NOT(ISERROR(SEARCH("${comparator}",${startCell})))</formula>\n`;
                break;
            case 'doesNotContain':
                text = comparator;
                operator = 'notContains';
                type = 'notContainsText';
                formula = `            <formula>ISERROR(SEARCH("${comparator}",${startCell}))</formula>\n`;
                break;
            case 'dateOccur':
                timePeriod = ` timePeriod="${comparator}"`;
                type = 'timePeriod';
                break;
        }

        if (operator) {
            operator = ` operator="${operator}" `;
        }

        return {
            text: text,
            rank: rank,
            percent: percent,
            bottom: bottom,
            equalAverage: equalAverage,
            aboveAverage: aboveAverage,
            operator: operator,
            timePeriod: timePeriod,
            type: type,
            formula: formula
        }
    }

    /**
     * Gets merged cells XML.
     */
    getMergedCells(mergedCells) {
        const that = this;

        let mergeCellsXml = '';

        for (let i = 0; i < mergedCells.length; i++) {
            if (mergedCells[i].from === mergedCells[i].to) {
                continue;
            }

            mergeCellsXml += `\n        <mergeCell ref="${mergedCells[i].from}:${mergedCells[i].to}" />\n`;
        }

        if (that.mergedCells) {
            for (let i = 0; i < that.mergedCells.length; i++) {
                const cellDefinition = that.mergedCells[i];

                if (cellDefinition.rowspan < 2 && cellDefinition.colspan < 2) {
                    continue;
                }

                const from = that.columnsArray[cellDefinition.cell[0]] + (cellDefinition.cell[1] + that.xlsxStartIndex + 1),
                    to = that.columnsArray[cellDefinition.cell[0] + cellDefinition.colspan - 1] + (cellDefinition.cell[1] + that.xlsxStartIndex + cellDefinition.rowspan);

                mergeCellsXml += `\n        <mergeCell ref="${from}:${to}" />\n`;
            }
        }

        if (mergeCellsXml) {
            mergeCellsXml = `\n    <mergeCells count="${mergedCells.length}">${mergeCellsXml}    </mergeCells>`;
        }

        return mergeCellsXml;
    }

    /**
     * Gets numFmt index.
     */
    getNumFmtIndex(format, numFmts) {
        let index = numFmts.collection.indexOf(format);

        if (index === -1) {
            index = numFmts.collection.length + 100;
            numFmts.collection.push(format);
            numFmts.xml += `<numFmt numFmtId="${index}" formatCode="${format}"/>`;
        }
        else {
            index += 100;
        }

        return index;
    }

    /**
        * Returns outlineLevel.
        */
    getOutlineLevel(record) {
        if (!this.actualHierarchy || record._level === 1) {
            return '';
        }

        return ` outlineLevel="${record._level - 1}"`;
    }

    /**
     * Gets row style.
     */
    getRowStyle() {
        const that = this,
            style = that.style;

        if (!style) {
            return '';
        }

        const rowsDefinition = style.rows;

        if (!rowsDefinition) {
            return '';
        }

        const styles = {
            row: ''
        };
        let generatedStyle = '';

        for (let prop in rowsDefinition) {
            if (!rowsDefinition.hasOwnProperty(prop) ||
                prop === 'alternationCount' ||
                prop === 'alternationStart' ||
                prop === 'alternationEnd') {
                continue;
            }

            const value = rowsDefinition[prop];

            if (prop.indexOf('alt') !== -1) {
                const i = prop.slice(16, 17),
                    property = prop.slice(17);

                if (!styles['rowN' + i]) {
                    styles['rowN' + i] = '';
                }

                if (property === 'Color') {
                    styles['rowN' + i] += 'color : ' + value + '; ';
                }
                else if (property === 'BorderColor') {
                    styles['rowN' + i] += 'border-color : ' + value + '; ';
                }
                else {
                    styles['rowN' + i] += 'background-color : ' + value + '; ';
                }

                continue;
            }

            if (!isNaN(prop)) {
                if (!styles['row' + prop]) {
                    styles['row' + prop] = '';
                }

                for (let rowProp in value) {
                    if (value.hasOwnProperty(rowProp)) {
                        styles['row' + prop] += window.jqxToDash(rowProp) + ': ' + value[rowProp] + '; ';
                    }
                }

                continue;
            }

            styles.row += window.jqxToDash(prop) + ': ' + rowsDefinition[prop] + '; ';
        }

        let keys = Object.keys(styles);

        keys.sort(function (a, b) {
            if (a === 'row') {
                return -1;
            }

            if (b === 'row') {
                return 1;
            }

            const aIsNum = !isNaN(a.slice(3)),
                bIsNum = !isNaN(b.slice(3));

            if (aIsNum && !bIsNum) {
                return 1;
            }

            if (!aIsNum && bIsNum) {
                return -1;
            }

            return +(a < b);
        });

        for (let i = 0; i < keys.length; i++) {
            generatedStyle += `        .${keys[i]} { ${styles[keys[i]]}}\n`;
        }

        return generatedStyle;
    }

    /**
     * Gets table style.
     */
    getTableStyle() {
        const that = this,
            style = that.style;

        if (!style) {
            return ' style="table-layout: fixed; border: 1px solid black; border-collapse: collapse;"';
        }

        let generatedStyle = 'table-layout: fixed; ';

        for (let prop in style) {
            if (style.hasOwnProperty(prop) && ['header', 'columns', 'rows'].indexOf(prop) === -1) {
                generatedStyle += window.jqxToDash(prop) + ': ' + style[prop] + '; ';
            }
        }

        if (generatedStyle) {
            generatedStyle = ' style="' + generatedStyle + '"';
        }

        return generatedStyle;
    }

    /**
     * Gets the "s" (style) attribute of an XLSX cell.
     */
    getXLSXCellStyle(r) {
        const that = this;

        if (that.cellStyleMapping[r] !== undefined) {
            return ` s="${that.cellStyleMapping[r]}"`;
        }

        return '';
    }

    /**
     * Gets the "s" (style) attribute of an XLSX cell.
     */
    getXLSXFormat(format, cellValue) {
        if (typeof cellValue === 'number') {
            let precision = parseFloat(format.slice(1)) || 0,
                precisionCode = precision > 0 ? '.' + ('0').repeat(precision) : '';

            format = format.slice(0, 1);

            switch (format) {
                case 'C':
                case 'c':
                    return '\$#,0' + precisionCode;
                case 'D':
                case 'd':
                    if (precision) {
                        return ('0').repeat(precision);
                    }

                    return '0';
                case 'E':
                case 'e':
                    return '0' + precisionCode + format + '000';
                case 'F':
                case 'f':
                    return '0' + precisionCode;
                case 'N':
                case 'n':
                    return '#,0' + precisionCode;
                case 'P':
                case 'p':
                    return '#,0' + precisionCode + ' %';
                default:
                    return;
            }
        }
        else if (cellValue instanceof Date) {
            switch (format) {
                case 'd':
                    return 'm/d/yyyy';
                case 'D':
                    return 'nnnnmmmm dd, yyyy';
                case 't':
                    return 'h:m AM/PM';
                case 'T':
                    return 'h:mm:ss AM/PM';
                case 'f':
                    return 'nnnnmmmm dd, yyyy h:m AM/PM';
                case 'F':
                    return 'nnnnmmmm dd, yyyy h:mm:ss AM/PM';
                case 'M':
                    return 'mmmm d';
                case 'Y':
                    return 'yyyy mmmm';
                case 'FP':
                case 'PP':
                    return 'yyyy-mm-dd hh:mm:ss';
                case 'FT':
                case 'PT':
                    return 'hh:mm:ss';
            }

            format = format.replace(/f|u|n|p|e|a|x|o/gi, '');
            format = format.replace(/tt/gi, 'AM/PM');
            format = format.replace(/:{2,}|:\s|:$|\.$/g, '');
            format = format.trim();
            return format;
        }
    }

    /**
     * Processes column styles.
     */
    processColumnStyle(style) {
        const that = this,
            headerDefinition = style.header,
            columnsDefinition = style.columns,
            sampleRecord = that.data[0],
            startIndex = that.xlsxStartIndex;

        that.columnWidth = [];

        if (startIndex && headerDefinition) {
            for (let i = 0; i < that.columnsArray.length; i++) {
                const columnLetter = that.columnsArray[i],
                    cell = columnLetter + startIndex,
                    columnSpecific = headerDefinition[that.datafields[i]];

                for (let prop in headerDefinition) {
                    if (headerDefinition.hasOwnProperty(prop) && sampleRecord[prop] === undefined) {
                        if (that.complexHeader) {
                            for (let j = 0; j < that.complexHeader.length; j++) {
                                if (prop === 'height') {
                                    that.rowHeight[j] = ` ht="${(parseFloat(headerDefinition.height) / that.complexHeader.length) / 2}"`;
                                    continue;
                                }
                                else {
                                    that.storeCellStyle(columnLetter + (j + 1), prop, headerDefinition[prop]);
                                }
                            }
                        }
                        else {
                            if (prop === 'height') {
                                that.rowHeight[0] = ` ht="${parseFloat(headerDefinition.height) / 2}"`;
                                continue;
                            }

                            that.storeCellStyle(cell, prop, headerDefinition[prop]);
                        }
                    }
                }

                if (!columnSpecific) {
                    continue;
                }

                for (let prop in columnSpecific) {
                    if (columnSpecific.hasOwnProperty(prop)) {
                        if (prop === 'width') {
                            that.columnWidth[i] = columnSpecific.width;
                            continue;
                        }

                        that.storeCellStyle(cell, prop, columnSpecific[prop]);
                    }
                }
            }
        }
        else if (headerDefinition) {
            for (let i = 0; i < that.columnsArray.length; i++) {
                const columnSpecific = headerDefinition[that.datafields[i]];

                if (columnSpecific && columnSpecific.width !== undefined) {
                    that.columnWidth[i] = columnSpecific.width;
                }
            }
        }

        if (!columnsDefinition) {
            return '';
        }

        for (let i = startIndex; i < that.data.length; i++) {
            for (let j = 0; j < that.columnsArray.length; j++) {
                const columnLetter = that.columnsArray[j],
                    cell = columnLetter + (i + 1),
                    datafield = that.datafields[j],
                    columnSpecific = columnsDefinition[datafield];

                for (let prop in columnsDefinition) {
                    if (columnsDefinition.hasOwnProperty(prop) && sampleRecord[prop] === undefined) {
                        that.storeCellStyle(cell, prop, columnsDefinition[prop]);
                    }
                }

                if (!columnSpecific) {
                    continue;
                }

                for (let prop in columnSpecific) {
                    if (!isNaN(prop) || !columnSpecific.hasOwnProperty(prop)) {
                        continue;
                    }

                    that.storeCellStyle(cell, prop, columnSpecific[prop], that.data[i][datafield]);
                }
            }
        }
    }

    /**
     * Processes complex header object.
     */
    processComplexHeader(header, data, format) {
        const that = this,
            flatHeader = {},
            processGrouping = ['html', 'jpeg', 'pdf', 'png', 'xlsx'].indexOf(format) !== -1 && header.columngroups,
            datafieldMapping = [],
            columnGroupHierarchy = {},
            complexHeader = [];
        let headerDepth = 0;

        function getColumnGroup(columnGroup) {
            for (let i = 0; i < header.columngroups.length; i++) {
                const currentGroupDefinition = header.columngroups[i];

                if (currentGroupDefinition.name === columnGroup) {
                    return currentGroupDefinition;
                }
            }
        }

        function getColumnGroupHierarchy(groupDefinition) {
            const columnGroups = [];

            while (groupDefinition) {
                columnGroups.unshift(groupDefinition.label);

                if (groupDefinition.parentGroup) {
                    groupDefinition = getColumnGroup(groupDefinition.parentGroup);
                }
                else {
                    return columnGroups;
                }
            }
        }

        if (processGrouping) {
            for (let i = 0; i < header.columngroups.length; i++) {
                const currentGroupDefinition = header.columngroups[i],
                    groupHierarchy = getColumnGroupHierarchy(currentGroupDefinition);

                columnGroupHierarchy[currentGroupDefinition.name] = groupHierarchy;
                headerDepth = Math.max(headerDepth, groupHierarchy.length);
            }

            headerDepth++;

            for (let i = 0; i < headerDepth; i++) {
                complexHeader[i] = [];
            }
        }

        for (let i = 0; i < header.columns.length; i++) {
            const currentColumn = header.columns[i];

            flatHeader[currentColumn.dataField] = currentColumn.label;

            if (!processGrouping) {
                continue;
            }

            datafieldMapping[i] = currentColumn.dataField;
            complexHeader[headerDepth - 1][i] = currentColumn.label;

            if (!currentColumn.columnGroup) {
                continue;
            }

            const columnGroups = columnGroupHierarchy[currentColumn.columnGroup];

            for (let j = 0; j < columnGroups.length; j++) {
                complexHeader[j][i] = columnGroups[j];
            }
        }

        if (complexHeader.length > 1) {
            const numberOfDatafields = Object.keys(flatHeader).length;

            for (let i = 0; i < headerDepth - 1; i++) {
                const entry = {};

                for (let j = 0; j < numberOfDatafields; j++) {
                    if (complexHeader[i][j] === undefined) {
                        let iterator = i + 1;

                        while (complexHeader[iterator][j] === undefined) {
                            iterator++;
                        }

                        complexHeader[i][j] = complexHeader[iterator][j];
                    }

                    entry[datafieldMapping[j]] = complexHeader[i][j];
                }

                if (format === 'xlsx') {
                    data.splice(i, 0, entry);
                }
            }

            that.complexHeader = complexHeader;

            if (format !== 'xlsx') {
                data.unshift(flatHeader);
            }
            else {
                data.splice(headerDepth - 1, 0, flatHeader);

                const toMerge = {};

                for (let i = 0; i < headerDepth; i++) {
                    for (let j = 0; j < numberOfDatafields; j++) {
                        const label = complexHeader[i][j];

                        if (!toMerge[label]) {
                            toMerge[label] = { from: [i, j] };
                            toMerge[label].to = toMerge[label].from;
                        }
                        else {
                            toMerge[label].to = [i, j];
                        }
                    }
                }

                that.complexHeaderMergeInfo = toMerge;
            }
        }
        else {
            data.unshift(flatHeader);
        }
    }

    /**
     * Processes hierarchical data.
     */
    processHierarchicalData(data, format) {
        const that = this,
            startIndex = format !== 'xlsx' ? +that.exportHeader : that.xlsxStartIndex,
            siblingGroups = {},
            processedData = [];
        let maxLevel = 0,
            actualHierarchy = false;

        function process(parentKey, level, collapsed) {
            const group = siblingGroups[parentKey];

            maxLevel = Math.max(maxLevel, level);

            if (group === undefined) {
                return;
            }

            for (let i = 0; i < group.length; i++) {
                const currentRecord = group[i],
                    keyDataField = currentRecord._keyDataField;

                currentRecord._collapsed = collapsed;
                currentRecord._level = level;
                processedData.push(currentRecord);

                if (siblingGroups[keyDataField]) {
                    actualHierarchy = true;
                    currentRecord._expanded = currentRecord._expanded !== undefined ? currentRecord._expanded : true;
                    process(keyDataField, level + 1, collapsed || !currentRecord._expanded);
                }
            }
        }

        function processJSONXML(parentKey, level, parent) {
            const group = siblingGroups[parentKey];

            maxLevel = Math.max(maxLevel, level);

            if (group === undefined) {
                return;
            }

            for (let i = 0; i < group.length; i++) {
                const currentRecord = group[i],
                    keyDataField = currentRecord._keyDataField;
                let cleanedRecord;

                if (format === 'json') {
                    cleanedRecord = {};

                    for (let prop in currentRecord) {
                        if (currentRecord.hasOwnProperty(prop) && prop.charAt(0) !== '_') {
                            cleanedRecord[prop] = currentRecord[prop];
                        }
                    }
                }
                else {
                    cleanedRecord = Object.assign({}, currentRecord);
                }

                parent.push(cleanedRecord);

                if (siblingGroups[keyDataField]) {
                    actualHierarchy = true;
                    cleanedRecord.rows = [];
                    processJSONXML(keyDataField, level + 1, cleanedRecord.rows);
                }
            }
        }

        if (data[startIndex]._keyDataField === undefined) {
            return that.processNestedData(data, format, startIndex);
        }

        for (let i = startIndex; i < data.length; i++) {
            const currentRecord = Object.assign({}, data[i]),
                parentKey = currentRecord._parentDataField;

            if (siblingGroups[parentKey] === undefined) {
                siblingGroups[parentKey] = [currentRecord];
            }
            else {
                siblingGroups[parentKey].push(currentRecord);
            }
        }

        if (startIndex) {
            for (let i = 0; i < startIndex; i++) {
                processedData.push(Object.assign({}, data[i]));

                if (['json', 'pdf', 'xml'].indexOf(format) === -1) {
                    processedData[i]._level = 1;
                }
            }
        }

        if (format !== 'json' && format !== 'xml') {
            process(null, 1, false);
        }
        else {
            processJSONXML(null, 1, processedData);
        }

        if (!actualHierarchy) {
            that.actualHierarchy = false;
        }

        that.maxLevel = maxLevel;
        return processedData;
    }

    /**
     * Processes nested hierarchical data.
     */
    processNestedData(data, format, startIndex) {
        const that = this,
            processedData = [];
        let maxLevel = 0,
            actualHierarchy = false;

        function process(start, children, level, collapsed) {
            maxLevel = Math.max(maxLevel, level);

            for (let i = start; i < children.length; i++) {
                const currentRecord = Object.assign({}, children[i]);

                currentRecord._collapsed = collapsed;
                currentRecord._level = level;
                processedData.push(currentRecord);

                if (currentRecord.children && currentRecord.children.length > 0) {
                    actualHierarchy = true;
                    currentRecord._expanded = currentRecord._expanded !== undefined ? currentRecord._expanded : true;
                    process(0, currentRecord.children, level + 1, collapsed || !currentRecord._expanded);
                }

                delete currentRecord.children;
            }
        }

        function processJSONXML(start, children, rows, level) {
            maxLevel = Math.max(maxLevel, level);

            for (let i = start; i < children.length; i++) {
                const currentRecord = Object.assign({}, children[i]);

                if (level === 1) {
                    processedData[i] = currentRecord;
                }
                else {
                    rows[i] = currentRecord;
                }

                if (currentRecord.children && currentRecord.children.length > 0) {
                    actualHierarchy = true;
                    currentRecord.rows = [];
                    processJSONXML(0, currentRecord.children, currentRecord.rows, level + 1);
                }

                delete currentRecord.children;
            }
        }

        if (startIndex) {
            for (let i = 0; i < startIndex; i++) {
                processedData.push(Object.assign({}, data[i]));

                if (['json', 'pdf', 'xml'].indexOf(format) === -1) {
                    processedData[i]._level = 1;
                }
            }
        }

        if (format !== 'json' && format !== 'xml') {
            process(startIndex, data, 1, false);
        }
        else {
            processJSONXML(startIndex, data, undefined, 1);
        }

        if (!actualHierarchy) {
            that.actualHierarchy = false;
        }

        that.maxLevel = maxLevel;
        return processedData;
    }

    /**
     * Processes row styles.
     */
    processRowStyle(style) {
        const that = this,
            rowsDefinition = style.rows;

        that.rowHeight = [];

        if (!rowsDefinition) {
            return;
        }

        const startIndex = that.xlsxStartIndex;

        function applyToRowCells(row, prop, value) {
            for (let j = 0; j < that.columnsArray.length; j++) {
                const currentCell = that.columnsArray[j] + (row + 1 + startIndex);

                that.storeCellStyle(currentCell, prop, value);
            }
        }

        if (rowsDefinition.height) {
            that.defaultRowHeight = ` ht="${parseFloat(rowsDefinition.height) / 2}"`;
        }

        for (let i = startIndex; i < that.data.length; i++) {
            const row = i - startIndex;

            for (let prop in rowsDefinition) {
                if (rowsDefinition.hasOwnProperty(prop) &&
                    prop.indexOf('alt') === -1 &&
                    isNaN(prop) &&
                    prop !== 'height') {
                    applyToRowCells(row, prop, rowsDefinition[prop]);
                }
            }

            if (rowsDefinition.alternationCount &&
                (((rowsDefinition.alternationStart === undefined || row >= rowsDefinition.alternationStart) &&
                    (rowsDefinition.alternationEnd === undefined || row <= rowsDefinition.alternationEnd)) ||
                    rowsDefinition.alternationStart === rowsDefinition.alternationEnd)) {
                const start = rowsDefinition.alternationStart || 0,
                    i = (row - start) % rowsDefinition.alternationCount;

                if (rowsDefinition[`alternationIndex${i}Color`]) {
                    applyToRowCells(row, 'color', rowsDefinition[`alternationIndex${i}Color`]);
                }

                if (rowsDefinition[`alternationIndex${i}BorderColor`]) {
                    applyToRowCells(row, 'borderColor', rowsDefinition[`alternationIndex${i}BorderColor`]);
                }

                if (rowsDefinition[`alternationIndex${i}BackgroundColor`]) {
                    applyToRowCells(row, 'backgroundColor', rowsDefinition[`alternationIndex${i}BackgroundColor`]);
                }
            }

            if (rowsDefinition[row]) {
                for (let prop in rowsDefinition[row]) {
                    if (rowsDefinition[row].hasOwnProperty(prop)) {
                        if (prop === 'height') {
                            that.rowHeight[i] = ` ht="${parseFloat(rowsDefinition[row].height) / 2}"`;
                            continue;
                        }

                        applyToRowCells(row, prop, rowsDefinition[row][prop]);
                    }
                }
            }
        }
    }

    /**
     * Stores cell style in "styleMap" object.
     */
    storeCellStyle(cell, prop, value) {
        const that = this,
            cellMap = that.styleMap[cell];

        switch (prop) {
            case 'backgroundColor':
                cellMap.fills.fgColor = value;
                break;
            case 'color':
                cellMap.fonts.color = value;
                break;
            case 'fontFamily':
                cellMap.fonts.name = value.replace(/"/g, '\'');
                break;
            case 'fontSize':
                cellMap.fonts.sz = parseFloat(value);
                break;
            case 'fontStyle':
                if (value === 'italic') {
                    cellMap.fonts.i = true;
                }
                else {
                    delete cellMap.fonts.i;
                }

                break;
            case 'fontWeight':
                if (value === 'bold') {
                    cellMap.fonts.b = true;
                }
                else {
                    delete cellMap.fonts.b;
                }

                break;
            case 'numFmt': {
                cellMap.numFmt = value;
                break;
            }
            case 'textAlign':
                cellMap.alignment.horizontal = value;
                break;
            case 'textDecoration':
                if (value === 'underline') {
                    cellMap.fonts.u = true;
                }
                else {
                    delete cellMap.fonts.u;
                }

                break;
            case 'verticalAlign':
                if (value === 'middle') {
                    value = 'center';
                }

                cellMap.alignment.vertical = value;
                break;
        }
    }

    /**
     * Returns an Alpha Red Green Blue color value.
     */
    toARGB(color) {
        color = color.replace(/\s/g, '');

        const rgbResult = /rgb\((\d+),(\d+),(\d+)\)/gi.exec(color);

        if (rgbResult !== null) {
            const r = parseFloat(rgbResult[1]).toString(16).toUpperCase(),
                g = parseFloat(rgbResult[2]).toString(16).toUpperCase(),
                b = parseFloat(rgbResult[3]).toString(16).toUpperCase();

            return 'FF' + ('0').repeat(2 - r.length) + r +
                ('0').repeat(2 - g.length) + g +
                ('0').repeat(2 - b.length) + b;
        }

        const rgbaResult = /rgba\((\d+),(\d+),(\d+)\,(\d*.\d+|\d+)\)/gi.exec(color);

        if (rgbaResult !== null) {
            const a = Math.round(parseFloat(rgbaResult[4]) * 255).toString(16).toUpperCase(),
                r = parseFloat(rgbaResult[1]).toString(16).toUpperCase(),
                g = parseFloat(rgbaResult[2]).toString(16).toUpperCase(),
                b = parseFloat(rgbaResult[3]).toString(16).toUpperCase();

            return ('0').repeat(2 - a.length) + a +
                ('0').repeat(2 - r.length) + r +
                ('0').repeat(2 - g.length) + g +
                ('0').repeat(2 - b.length) + b;
        }

        const shortHexResult = /^#(.)(.)(.)$/gi.exec(color);

        if (shortHexResult !== null) {
            const r = shortHexResult[1].toUpperCase(),
                g = shortHexResult[2].toUpperCase(),
                b = shortHexResult[3].toUpperCase();

            return 'FF' + r + r + g + g + b + b;
        }

        return 'FF' + color.toUpperCase().slice(1);
    }

    /**
     * Adds toggleable functionality.
     */
    toggleableFunctionality() {
        const that = this;

        if (!that.actualHierarchy) {
            return '';
        }

        return `\n    <style type="text/css">
        .toggle-element {
            width: 5px;
            height: 1px;
            padding-right: 5px;
            float: left;
            text-align: right;
            cursor: pointer;
            user-select: none;
        }

        .collapsed {
            display: none;
        }
    </style>
    <script type="text/javascript">
        window.onload = function () {
            var expandChar = '${that.expandChar}',
                collapseChar = '${that.collapseChar}',
                toggleElements = document.getElementsByClassName('toggle-element');

            function getParent(child) {
                var prevSibling = child.previousElementSibling;

                while (prevSibling) {
                    if (child.getAttribute('level') > prevSibling.getAttribute('level')) {
                        return prevSibling;
                    }

                    prevSibling = prevSibling.previousElementSibling;
                }

            }

            function getFirstCollapsedAncestor(child) {
                var parent = getParent(child);

                while (parent) {
                    if (parent.firstElementChild.firstElementChild.innerHTML === expandChar) {
                        return parent;
                    }

                    parent = getParent(parent);
                }
            }

            for (var i = 0; i < toggleElements.length; i++) {
                toggleElements[i].addEventListener('click', function (event) {
                    var expanded = this.innerHTML === collapseChar,
                        row = this.parentElement.parentElement,
                        sibling = row.nextElementSibling;

                    if (expanded) {
                        this.innerHTML = expandChar;
                    }
                    else {
                        this.innerHTML = collapseChar;
                    }

                    while (sibling && row.getAttribute('level') < sibling.getAttribute('level')) {
                        if (expanded) {
                            sibling.style.display = 'none';
                        }
                        else {
                            var firstCollapsedAncestor = getFirstCollapsedAncestor(sibling);

                            if (!firstCollapsedAncestor || firstCollapsedAncestor === row) {
                                sibling.classList.remove('collapsed');
                                sibling.style.display = null;
                            }

                        }

                        sibling = sibling.nextElementSibling;
                    }
                });
            }
        }
    </script>`;
    }

    /**
     * Generates styles.xml.
     */
    generateStyles(style) {
        const that = this;

        that.cellStyleMapping = {};

        if (Object.keys(style).length === 0 && !that.complexHeader) {
            // default style
            return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac x16r2 xr" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" xmlns:x16r2="http://schemas.microsoft.com/office/spreadsheetml/2015/02/main" xmlns:xr="http://schemas.microsoft.com/office/spreadsheetml/2014/revision"><fonts count="1" x14ac:knownFonts="1"><font><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/><charset val="204"/><scheme val="minor"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>${that.conditionalFormattingXLSX.styles || '<dxfs count="0"/>'}<tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleLight16"/><extLst><ext uri="{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}" xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"><x14:slicerStyles defaultSlicerStyle="SlicerStyleLight1"/></ext><ext uri="{9260A510-F301-46a8-8635-F512D64BE5F5}" xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main"><x15:timelineStyles defaultTimelineStyle="TimeSlicerStyleLight1"/></ext></extLst></styleSheet>`;
        }

        that.styleMap = {};

        for (let i = 0; i < that.data.length; i++) {
            for (let j = 0; j < that.columnsArray.length; j++) {
                that.styleMap[that.columnsArray[j] + (i + 1)] = {
                    numFmts: {}, fonts: {}, fills: {}, borders: {}, alignment: {}
                }
            }
        }

        if (style && style.columns) {
            for (let i = 0; i < that.columnsArray.length; i++) {
                const datafield = that.datafields[i];

                if (!style.columns[datafield] || !style.columns[datafield].format) {
                    continue;
                }

                const XLSXFormat = that.getXLSXFormat(style.columns[datafield].format, that.data[that.data.length - 1][datafield]);

                if (XLSXFormat) {
                    style.columns[datafield].numFmt = XLSXFormat;
                }
            }
        }

        that.processRowStyle(style);
        that.processColumnStyle(style);

        const cellAliases = {};

        for (let i = 0; i < that.complexHeaderMergedCells.length; i++) {
            const currentCell = that.complexHeaderMergedCells[i];

            if (parseFloat(currentCell.to[1]) === that.complexHeader.length) {
                cellAliases[currentCell.to] = currentCell.from;
                continue;
            }

            that.styleMap[currentCell.from].alignment.horizontal = 'center';
            that.styleMap[currentCell.from].alignment.vertical = 'center';
        }

        const fonts = {
            xml: '<font><sz val="11" /><color theme="1" /><name val="Calibri" /><family val="2" /><charset val="204" /><scheme val="minor" /></font>',
            collection: ['default']
        },
            fills = {
                xml: '<fill><patternFill patternType="none" /></fill><fill><patternFill patternType="gray125" /></fill>',
                collection: ['default', 'gray125']
            },
            numFmts = {
                xml: '',
                collection: []
            },
            cellXfs = {
                xml: '<xf fontId="0" fillId="0" borderId="1"/>',
                collection: ['default']
            };

        for (let i = 0; i < that.data.length; i++) { // iterate rows
            for (let j = 0; j < that.columnsArray.length; j++) { // iterate columns
                const currentCell = that.columnsArray[j] + (i + 1),
                    currentCellStyle = that.styleMap[currentCell];
                let currentFont = '', currentFill = '', currentAlignment = '',
                    currentFontCode = [], currentFillCode = [], currentAlignmentCode = [], xf = [];

                for (let prop in currentCellStyle.fonts) {
                    if (currentCellStyle.fonts.hasOwnProperty(prop)) {
                        const value = currentCellStyle.fonts[prop];

                        switch (prop) {
                            case 'color':
                                currentFontCode[0] = value;
                                currentFont += `<color rgb="${that.toARGB(value)}" />`;
                                break;
                            case 'name':
                                currentFontCode[1] = value;
                                currentFont += `<name val="${value}" />`;
                                break;
                            case 'sz':
                                currentFontCode[2] = value;
                                currentFont += `<sz val="${value}" />`;
                                break;
                            case 'i':
                                currentFontCode[3] = value;
                                currentFont += '<i />';
                                break;
                            case 'b':
                                currentFontCode[4] = value;
                                currentFont += '<b />';
                                break;
                            case 'u':
                                currentFontCode[5] = value;
                                currentFont += '<u />';
                                break;
                        }
                    }
                }

                for (let prop in currentCellStyle.fills) {
                    if (currentCellStyle.fills.hasOwnProperty(prop)) {
                        const value = currentCellStyle.fills[prop];

                        switch (prop) {
                            case 'fgColor':
                                currentFillCode[0] = value;
                                currentFill += `<fgColor rgb="${that.toARGB(value)}" />`;
                                break;
                        }
                    }
                }

                for (let prop in currentCellStyle.alignment) {
                    if (currentCellStyle.alignment.hasOwnProperty(prop)) {
                        const value = currentCellStyle.alignment[prop];

                        switch (prop) {
                            case 'horizontal':
                                currentAlignmentCode[0] = value;
                                currentAlignment += `horizontal="${value}" `;
                                break;
                            case 'vertical':
                                currentAlignmentCode[1] = value;
                                currentAlignment += `vertical="${value}" `;
                                break;
                        }
                    }
                }

                currentFontCode = currentFontCode.toString();
                currentFillCode = currentFillCode.toString();

                if (currentFont !== '') {
                    let fontIndex = fonts.collection.indexOf(currentFontCode);

                    if (fontIndex === -1) {
                        fontIndex = fonts.collection.length;

                        fonts.xml += '<font>' + currentFont + '</font>';
                        fonts.collection.push(currentFontCode);
                    }

                    xf[0] = fontIndex;
                }

                if (currentFill !== '') {
                    let fillIndex = fills.collection.indexOf(currentFillCode);

                    if (fillIndex === -1) {
                        fillIndex = fills.collection.length;

                        fills.xml += '<fill><patternFill patternType="solid">' + currentFill + '</patternFill></fill>';
                        fills.collection.push(currentFillCode);
                    }

                    xf[1] = fillIndex;
                }

                if (currentAlignmentCode.length > 0) {
                    xf[2] = currentAlignment;
                }

                if (currentCellStyle.numFmt !== undefined) {
                    xf[3] = that.getNumFmtIndex(currentCellStyle.numFmt, numFmts);
                }

                const xfCode = xf.toString();

                if (xfCode !== '') {
                    let xfIndex = cellXfs.collection.indexOf(xfCode);

                    if (xfIndex === -1) {
                        let newXfXML = '<xf ';

                        xfIndex = cellXfs.collection.length;

                        if (xf[0] !== undefined) {
                            newXfXML += `fontId="${xf[0]}" `;
                        }

                        if (xf[1] !== undefined) {
                            newXfXML += `fillId="${xf[1]}" `;
                        }

                        if (xf[3] !== undefined) {
                            newXfXML += `numFmtId="${xf[3]}" `;
                        }

                        if (xf[2] !== undefined) {
                            newXfXML += `applyAlignment="1" borderId="1"><alignment ${currentAlignment}/></xf>`;
                        }
                        else {
                            newXfXML += ' borderId="1"/>';
                        }

                        cellXfs.xml += newXfXML;
                        cellXfs.collection.push(xfCode);
                    }

                    that.cellStyleMapping[cellAliases[currentCell] || currentCell] = xfIndex;
                }
            }
        }

        if (numFmts.collection.length) {
            numFmts.xml = `<numFmts count="${numFmts.collection.length}">${numFmts.xml}</numFmts>`;
        }

        return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac x16r2 xr" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" xmlns:x16r2="http://schemas.microsoft.com/office/spreadsheetml/2015/02/main" xmlns:xr="http://schemas.microsoft.com/office/spreadsheetml/2014/revision">${numFmts.xml}<fonts count="${fonts.collection.length}" x14ac:knownFonts="1">${fonts.xml}</fonts><fills count="${fills.collection.length}">${fills.xml}</fills><borders count="2"><border><left/><right/><top/><bottom/></border><border><left style="hair"/><right style="hair"/><top style="hair"/><bottom style="hair"/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="${cellXfs.collection.length}">${cellXfs.xml}</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>${that.conditionalFormattingXLSX.styles}<dxfs count="0"/><tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleLight16"/><extLst><ext uri="{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}" xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"><x14:slicerStyles defaultSlicerStyle="SlicerStyleLight1"/></ext><ext uri="{9260A510-F301-46a8-8635-F512D64BE5F5}" xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main"><x15:timelineStyles defaultTimelineStyle="TimeSlicerStyleLight1"/></ext></extLst></styleSheet>`;
    }
  }
  
	if ($.jqx && $.jqx.dataAdapter) {
		$.jqx.dataAdapter.DataExporter = DataExporter;
	}
})(jqxBaseFramework);
