/* tslint:disable */
/* eslint-disable */
(function () {
    if (typeof document === 'undefined') {
        return;
    }

    (function ($) {
        window.jqxToDash = function (value) {
            return value.split(/(?=[A-Z])/).join('-').toLowerCase();
        }

        var LINE_SEPARATOR2 = "\r\n";
        function returnAttributeIfPopulated(key, value, booleanTransformer) {
            if (!value && value !== "" && value !== 0) {
                return "";
            }
            let xmlValue = value;
            if (typeof value === "boolean") {
                if (booleanTransformer) {
                    xmlValue = booleanTransformer(value);
                }
            }
            return ` ${key}="${xmlValue}"`;
        }

        var XmlFactory = class {
            static createHeader(headerElement = {}) {
                const headerStart = "<?";
                const headerEnd = "?>";
                const keys = ["version"];
                if (!headerElement.version) {
                    headerElement.version = "1.0";
                }
                if (headerElement.encoding) {
                    keys.push("encoding");
                }
                if (headerElement.standalone) {
                    keys.push("standalone");
                }
                const att = keys.map((key) => `${key}="${headerElement[key]}"`).join(" ");
                return `${headerStart}xml ${att} ${headerEnd}`;
            }
            static createXml(xmlElement, booleanTransformer) {
                let props = "";
                if (xmlElement.properties) {
                    if (xmlElement.properties.prefixedAttributes) {
                        xmlElement.properties.prefixedAttributes.forEach((prefixedSet) => {
                            Object.keys(prefixedSet.map).forEach((key) => {
                                props += returnAttributeIfPopulated(
                                    prefixedSet.prefix + key,
                                    prefixedSet.map[key],
                                    booleanTransformer
                                );
                            });
                        });
                    }
                    if (xmlElement.properties.rawMap) {
                        Object.keys(xmlElement.properties.rawMap).forEach((key) => {
                            props += returnAttributeIfPopulated(key, xmlElement.properties.rawMap[key], booleanTransformer);
                        });
                    }
                }
                let result = "<" + xmlElement.name + props;
                if (!xmlElement.children && xmlElement.textNode == null) {
                    return result + "/>" + LINE_SEPARATOR2;
                }
                if (xmlElement.textNode != null) {
                    return result + ">" + xmlElement.textNode + "</" + xmlElement.name + ">" + LINE_SEPARATOR2;
                }
                result += ">" + LINE_SEPARATOR2;
                if (xmlElement.children) {
                    xmlElement.children.forEach((it) => {
                        result += this.createXml(it, booleanTransformer);
                    });
                }
                return result + "</" + xmlElement.name + ">" + LINE_SEPARATOR2;
            }
        };

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
                that.exportHeader = exportDetails.exportHeader !== undefined ? exportDetails.exportHeader : true;
                that.hierarchical = exportDetails.hierarchical;
                that.expandChar = exportDetails.expandChar || '+';
                that.collapseChar = exportDetails.collapseChar || '-';
                that.pageOrientation = exportDetails.pageOrientation;
                that.allowNull = exportDetails.allowNull || false;
                that.spreadsheets = exportDetails.spreadsheets || null;

                that._media = [];

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

                that.timeBetween1900And1970 = new Date(1970, 0, 1, 0, 0, 0).getTime() - new Date(1900, 0, 1, 0, 0, 0).getTime();
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
                    }, 100);
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

                    const offset = that.headerContent ? that.headerContent.length : 0;
                    that.xlsxStartIndex = that.xlsxStartIndex + offset;
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
                        output = that.exportToCSVAndTSV(data, { delimiter: ', ', MIME: 'text/csv;charset=utf-8;', toRemove: 2 }, fileName);
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
                        output = that.exportToXLSX(data, fileName, callback);
                        break;
                    case 'xml':
                        output = that.exportToXML(data, fileName);
                        break;
                    case 'md':
                        output = that.exportToMD(data, fileName);
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

                if (!fileName) {
                    return stringResult;
                }

                const bom = '\uFEFF';
                const csvContent = bom + stringResult;
                return this.downloadFile(csvContent, formatOptions.MIME, fileName);
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

                        if (typeof value === 'string' && (value.indexOf('base64') >= 0 || value.indexOf('.svg') >= 0 || value.indexOf('.png') >= 0 || value.indexOf('.jpeg') >= 0)) {
                            value = `<img height="30" src="${value}"/>`;
                        }

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
                iframe.style.pointerEvents = 'none';

                document.body.appendChild(iframe);

                iframe.contentDocument.write(htmlContent);

                function checkIframePopulated() {
                    if (!iframe.contentDocument.body || !iframe.contentDocument.body.firstElementChild) {
                        requestAnimationFrame(checkIframePopulated);
                    }
                    else {
                        iframe.contentWindow.html2canvas(iframe.contentDocument.body.firstElementChild).then(canvas => {
                            const draw = new JQX.Utilities.Draw(document.createElement('div'));

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

                if (value === null) {
                    return that.allowNull ? 'null' : '';
                }

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
             * Export to Markdown(MD)
             * @param {string} data - the data to export
             * @param {string} fileName - the name of the file
             * @returns 
             */
            exportToMD(data, fileName) {
                const that = this,
                    dataFields = that.datafields;
                let text = '';


                for (let i = 0, max = data.length; i < max; i += 1) {
                    for (let j = 0, max = dataFields.length; j < max; j += 1) {
                        const dataField = data[i][dataFields[j]];

                        if (typeof dataField === 'string') {
                            text += dataField;
                        }
                    }
                }

                return that.downloadFile(text, 'application/text', fileName);
            }

            /**
             * Exports to PDF.
             */
            exportToPDF(data, fileName) {
                try {
                    pdfMake;
                }
                catch (error) {
                    throw new Error('Missing reference to \'pdfmake.min.js\'.');
                }

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

                if (!fileName) {
                    const output = pdfMake.createPdf(docDefinition);

                    delete that.mergedCellsPDF;
                    delete that.styleInfo;

                    return output;
                }
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
                        if (!Object.prototype.hasOwnProperty.call(definition, prop)) {
                            continue;
                        }

                        if (sampleRecord[prop] === undefined) {
                            if (prop === 'height' && type === 'header') {
                                for (let i = 0; i < that.headerRows; i++) {
                                    styleInfo.heights[i] = (parseInt(definition[prop], 10) / that.headerRows) / 1.4;
                                }
                            }
                            else {
                                that.storePDFStyle({ prop: prop, value: definition[prop], toUpdate: type });
                            }
                        }
                        else {
                            for (let columnProp in definition[prop]) {
                                if (!isNaN(columnProp) || !Object.prototype.hasOwnProperty.call(definition[prop], columnProp)) {
                                    continue;
                                }

                                const value = definition[prop][columnProp],
                                    index = that.datafields.indexOf(prop);

                                if (columnProp === 'width' && styleInfo.widths[index] === '*') {
                                    styleInfo.widths[index] = value;
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
                    if (!Object.prototype.hasOwnProperty.call(rowsDefinition, prop) || prop.indexOf('alt') !== -1) {
                        continue;
                    }

                    const value = rowsDefinition[prop];

                    if (!isNaN(prop)) {
                        for (let rowProp in value) {
                            if (Object.prototype.hasOwnProperty.call(value, rowProp)) {
                                if (rowProp === 'height') {
                                    styleInfo.heights[parseFloat(prop) + that.headerRows] = parseFloat(value[rowProp]) / 1.4;
                                }
                                else {
                                    that.storePDFStyle({ prop: rowProp, value: value[rowProp], toUpdate: 'row' + prop });
                                }
                            }
                        }

                        continue;
                    }

                    if (prop === 'height') {
                        styleInfo.defaultHeight = parseFloat(value) / 1.4;
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
                    maxPerPage = docDefinition.pageOrientation === 'portrait' ? 655 : 1155, // maximum of 655px (portrait) or 1155px (landscape) per A4 page
                    tables = [];
                let currentPage = 0;

                for (let i = 0; i < styleInfo.widths.length; i++) {
                    let currentWidth = styleInfo.widths[i],
                        numericWidth;

                    if (currentWidth === '*') {
                        numericWidth = maxPerPage / 6;
                    }
                    else if (typeof currentWidth === 'string' && currentWidth.indexOf('%') !== -1) {
                        numericWidth = Math.min(maxPerPage, Math.floor((parseFloat(currentWidth) / 100) * maxPerPage));

                        if (numericWidth === maxPerPage) {
                            currentWidth = '*';
                        }
                    }
                    else {
                        currentWidth = parseFloat(currentWidth);

                        if (currentWidth >= maxPerPage) {
                            numericWidth = maxPerPage
                            currentWidth = '*';
                        }
                        else {
                            numericWidth = currentWidth;
                            currentWidth /= 1.4;
                        }
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
                    headers = [],
                    headerDataFields = [];
                let result = [],
                    headerStructure, headerDataFieldStructure;

                if (that.complexHeader) {
                    headerStructure = that.complexHeader;
                    headerDataFieldStructure = that.complexDataFieldsHeader;
                }
                else {
                    headerStructure = [Object.values(that.data[0])];
                    headerDataFieldStructure = headerStructure;
                }

                for (let i = 0; i < headerRows; i++) {
                    const row = headerStructure[i],
                        rowDataField = headerDataFieldStructure[i];

                    for (let k = 0; k < row.length; k++) {
                        let tableIndex = mapping[k] || 0;

                        if (!headers[tableIndex]) {
                            headers[tableIndex] = [];
                            headerDataFields[tableIndex] = [];
                        }

                        if (!headers[tableIndex][i]) {
                            headers[tableIndex][i] = [];
                            headerDataFields[tableIndex][i] = [];
                        }

                        headers[tableIndex][i].push(row[k]);
                        headerDataFields[tableIndex][i].push(rowDataField[k]);
                    }
                }

                function processHeader(header, headerDataField, result, table) {
                    for (let j = 0; j < headerRows; j++) {
                        const row = header[j],
                            rowDataField = headerDataField[j];
                        const tableRow = [];

                        for (let k = 0; k < row.length; k++) {
                            const currentDataField = rowDataField[k];
                            let colspan = 1, rowspan = 1;

                            if ((rowDataField[k - 1] && rowDataField[k - 1] === currentDataField) ||
                                (headerDataField[j - 1] && (headerDataField[j - 1][k] === currentDataField))) {
                                tableRow.push({});
                                continue;
                            }

                            let iterator = k + 1;

                            while (rowDataField[iterator] && rowDataField[iterator] === rowDataField[iterator - 1]) {
                                colspan++;
                                iterator++;
                            }

                            iterator = j + 1;

                            while (headerDataField[iterator] && headerDataField[iterator][k] === currentDataField) {
                                rowspan++;
                                iterator++;
                            }

                            const datafield = j === headerRows - 1 || rowspan + j === headerRows ?
                                table.datafields[k] : null,
                                entry = {
                                    text: row[k], colSpan: colspan, rowSpan: rowspan
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
                    processHeader(headers[i], headerDataFields[i], result, tables[i]);
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
                    const parts = /rgba\((\d+),(\d+),(\d+)\,(\d*.\d+|\d+)\)/gi.exec(background.replace(/\s/g, ''));

                    if (parts === null) {
                        return background;
                    }

                    const r = parseFloat(parts[1]).toString(16).toUpperCase(),
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

            addBodyImageToMap(image, rowIndex, col, columnsToExport) {
                const sheetIndex = 1;
                const { row, column } = image.position || {};
                const calculatedImage = image;
                if (columnsToExport) {
                    if (rowIndex !== null && col !== null && (!row || !column)) {
                        if (!image.position) {
                            image.position = {};
                        }
                        image.position = Object.assign({}, image.position, {
                            row: rowIndex,
                            column: columnsToExport.indexOf(col) + 1
                        });
                    }
                    calculatedImage.totalWidth = calculatedImage.width;
                    calculatedImage.totalHeight = calculatedImage.height;
                }
                this.buildImageMap({ imageToAdd: calculatedImage, idx: sheetIndex });
                let worksheetImageIdMap = this.worksheetImageIds.get(sheetIndex);
                if (!worksheetImageIdMap) {
                    worksheetImageIdMap = new Map();
                    this.worksheetImageIds.set(sheetIndex, worksheetImageIdMap);
                }
                const sheetImages = this.worksheetImages.get(sheetIndex);
                if (!sheetImages) {
                    this.worksheetImages.set(sheetIndex, [calculatedImage]);
                } else {
                    sheetImages.push(calculatedImage);
                }
                if (!worksheetImageIdMap.get(image.id)) {
                    worksheetImageIdMap.set(image.id, { index: worksheetImageIdMap.size, type: image.imageType });
                }
            }
            buildImageMap(params) {
                const { imageToAdd, idx } = params;
                const mappedImagesToSheet = this.images.get(imageToAdd.id);
                if (mappedImagesToSheet) {
                    const currentSheetImages = mappedImagesToSheet.find((currentImage) => currentImage.sheetId === idx);
                    if (currentSheetImages) {
                        currentSheetImages.image.push(imageToAdd);
                    } else {
                        mappedImagesToSheet.push({
                            sheetId: idx,
                            image: [imageToAdd]
                        });
                    }
                } else {
                    this.images.set(imageToAdd.id, [{ sheetId: idx, image: [imageToAdd] }]);
                    this.workbookImageIds.set(imageToAdd.id, { type: imageToAdd.imageType, index: this.workbookImageIds.size });
                }
            }

            createXmlPart(body, skipHeader) {
                const header = XmlFactory.createHeader({
                    encoding: "UTF-8",
                    standalone: "yes"
                });
                const xmlBody = XmlFactory.createXml(body);
                if (skipHeader) {
                    return xmlBody;
                }
                return `${header}${xmlBody}`;
            }

            generateWorksheetImages(zip, xl, data) {
                const that = this;

                this.images = new Map();
                this.worksheetImages = new Map();
                this.worksheetHeaderFooterImages = new Map();
                this.workbookImageIds = new Map();
                this.worksheetImageIds = new Map();
                let drawingIndex = 0;
                let imgCounter = 0;
                let imgIndex = 0;
                if (that.addImageToCell) {
                    let offset = that.headerContent ? that.headerContent.length : 0;
                    if (that.complexHeader) {
                        offset += that.complexHeader.length - 1;
                    }

                    for (let i = 1 + offset; i < data.length; i++) {
                        const row = data[i];
                        for (let j = 0; j < that.datafields.length; j++) {
                            const dataField = that.datafields[j];
                            let value = row[dataField];

                            if (value && Array.isArray(value)) {
                                for (let m = 0; m < value.length; m++) {
                                    const addedImage = that.addImageToCell(i + imgIndex++, dataField, value[m], value, row, m);
                                    if (addedImage) {
                                        row[dataField] = '';
                                        this.addBodyImageToMap(
                                            addedImage.image,
                                            1 + i,
                                            dataField,
                                            that.datafields
                                        );
                                    }
                                }
                                continue;
                            }

                            const addedImage = that.addImageToCell(i + imgIndex++, dataField, value, value, row, 0);
                            if (addedImage) {
                                row[dataField] = '';
                                if (addedImage.value && addedImage.value !== value) {
                                    row[dataField] = addedImage.value;
                                }
                                this.addBodyImageToMap(
                                    addedImage.image,
                                    1 + i,
                                    dataField,
                                    that.datafields
                                );
                            }
                        }
                    }

                    if (that.headerContent) {
                        for (let m = 0; m < that.headerContent.length; m++) {
                            const row = data[m];
                            for (let j = 0; j < that.datafields.length; j++) {
                                const dataField = that.datafields[j];
                                const value = row[dataField];

                                const addedImage = that.addImageToCell(m + 1, dataField, value, value, row, 0);
                                if (addedImage) {
                                    row[dataField] = '';
                                    this.addBodyImageToMap(
                                        addedImage.image,
                                        1 + m,
                                        dataField,
                                        that.datafields
                                    );
                                }
                            }
                        }
                    }

                    this.images.forEach((value) => {
                        const firstImage = value[0].image[0];
                        const { base64, imageType } = firstImage;
                        const ext = imageType === 'jpg' ? 'jpeg' : imageType;
                        // Function to convert a base64 string to a Blob
                        const base64ToBlob = (base64, mimeType) => {
                            if (!base64) {
                                base64 = '';
                            }
                            const byteCharacters = atob(base64);
                            const byteNumbers = new Array(byteCharacters.length);
                            for (let i = 0; i < byteCharacters.length; i++) {
                                byteNumbers[i] = byteCharacters.charCodeAt(i);
                            }
                            const byteArray = new Uint8Array(byteNumbers);
                            return new Blob([byteArray], { type: mimeType });
                        }

                        let imageBlob;
                        // Convert the Base64 string to a PNG Blob
                        if (base64 && Array.isArray(base64)) {
                            imageBlob = base64ToBlob(base64[0].split(',')[1], 'image/' + ext);
                        }
                        else {
                            imageBlob = base64ToBlob(base64.split(',')[1], 'image/' + ext);
                        }

                        zip.file(`xl/media/image${++imgCounter}.${ext}`, imageBlob, true);
                    });
                }

                let imageRelationCounter = 0;

                var INCH_TO_EMU = 9525;

                var pixelsToEMU = (value) => {
                    return Math.ceil(value * INCH_TO_EMU);
                };

                var getImageBoxSize = (image) => {
                    image.fitCell = !!image.fitCell || !image.width || !image.height;
                    const { position = {}, fitCell, width = 0, height = 0, totalHeight, totalWidth } = image;
                    const { offsetX = 0, offsetY = 0, row = 1, rowSpan = 1, column = 1, colSpan = 1 } = position;
                    return {
                        from: {
                            row: row - 1,
                            col: column - 1,
                            offsetX: pixelsToEMU(offsetX),
                            offsetY: pixelsToEMU(offsetY)
                        },
                        to: {
                            row: row - 1 + (fitCell ? 1 : rowSpan - 1),
                            col: column - 1 + (fitCell ? 1 : colSpan - 1),
                            offsetX: pixelsToEMU(width + offsetX),
                            offsetY: pixelsToEMU(height + offsetY)
                        },
                        height: pixelsToEMU(totalHeight || height),
                        width: pixelsToEMU(totalWidth || width)
                    };
                };
                var getPicture = (image, currentIndex, worksheetImageIndex, imageBoxSize) => {
                    return {
                        name: "xdr:pic",
                        children: [
                            getNvPicPr(image, currentIndex + 1),
                            getBlipFill(image, worksheetImageIndex + 1),
                            getSpPr(image, imageBoxSize)
                        ]
                    };
                };


                var getBlipFill = (image, index) => {
                    let blipChildren;
                    if (image.transparency) {
                        const transparency = Math.min(Math.max(image.transparency, 0), 100);
                        blipChildren = [
                            {
                                name: "a:alphaModFix",
                                properties: {
                                    rawMap: {
                                        amt: 1e5 - Math.round(transparency * 1e3)
                                    }
                                }
                            }
                        ];
                    }
                    if (image.recolor) {
                        if (!blipChildren) {
                            blipChildren = [];
                        }
                        switch (image.recolor.toLocaleLowerCase()) {
                            case "grayscale":
                                blipChildren.push({ name: "a:grayscl" });
                                break;
                            case "sepia":
                                blipChildren.push(getDuoTone({ color: "black" }, { color: "D9C3A5", tint: 50, saturation: 180 }));
                                break;
                            case "washout":
                                blipChildren.push({
                                    name: "a:lum",
                                    properties: {
                                        rawMap: {
                                            bright: "70000",
                                            contrast: "-70000"
                                        }
                                    }
                                });
                                break;
                            default:
                        }
                    }
                    return {
                        name: "xdr:blipFill",
                        children: [
                            {
                                name: "a:blip",
                                properties: {
                                    rawMap: {
                                        cstate: "print",
                                        "r:embed": `rId${index}`,
                                        "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
                                    }
                                },
                                children: blipChildren
                            },
                            {
                                name: "a:stretch",
                                children: [
                                    {
                                        name: "a:fillRect"
                                    }
                                ]
                            }
                        ]
                    };
                };
                var getSpPr = (image, imageBoxSize) => {
                    const xfrm = {
                        name: "a:xfrm",
                        children: [
                            {
                                name: "a:off",
                                properties: {
                                    rawMap: {
                                        x: 0,
                                        y: 0
                                    }
                                }
                            },
                            {
                                name: "a:ext",
                                properties: {
                                    rawMap: {
                                        cx: imageBoxSize.width,
                                        cy: imageBoxSize.height
                                    }
                                }
                            }
                        ]
                    };
                    if (image.rotation) {
                        const rotation = image.rotation;
                        xfrm.properties = {
                            rawMap: {
                                rot: Math.min(Math.max(rotation, 0), 360) * 6e4
                            }
                        };
                    }
                    const prstGeom = {
                        name: "a:prstGeom",
                        properties: {
                            rawMap: {
                                prst: "rect"
                            }
                        },
                        children: [{ name: "a:avLst" }]
                    };
                    const ret = {
                        name: "xdr:spPr",
                        children: [xfrm, prstGeom]
                    };
                    return ret;
                };

                var getExt = (image) => {
                    const children = [
                        {
                            name: "a:ext",
                            properties: {
                                rawMap: {
                                    uri: "{FF2B5EF4-FFF2-40B4-BE49-F238E27FC236}"
                                }
                            },
                            children: [
                                {
                                    name: "a16:creationId",
                                    properties: {
                                        rawMap: {
                                            id: "{822E6D20-D7BC-2841-A643-D49A6EF008A2}",
                                            "xmlns:a16": "http://schemas.microsoft.com/office/drawing/2014/main"
                                        }
                                    }
                                }
                            ]
                        }
                    ];
                    const recolor = image.recolor && image.recolor.toLowerCase();
                    switch (recolor) {
                        case "grayscale":
                        case "sepia":
                        case "washout":
                            children.push({
                                name: "a:ext",
                                properties: {
                                    rawMap: {
                                        uri: "{C183D7F6-B498-43B3-948B-1728B52AA6E4}"
                                    }
                                },
                                children: [
                                    {
                                        name: "adec:decorative",
                                        properties: {
                                            rawMap: {
                                                val: "0",
                                                "xmlns:adec": "http://schemas.microsoft.com/office/drawing/2017/decorative"
                                            }
                                        }
                                    }
                                ]
                            });
                    }
                    return {
                        name: "a:extLst",
                        children
                    };
                };

                var getNvPicPr = (image, index) => ({
                    name: "xdr:nvPicPr",
                    children: [
                        {
                            name: "xdr:cNvPr",
                            properties: {
                                rawMap: {
                                    id: index,
                                    name: image.id,
                                    descr: image.altText != null ? image.altText : void 0
                                }
                            },
                            children: [getExt(image)]
                        },
                        {
                            name: "xdr:cNvPicPr",
                            properties: {
                                rawMap: {
                                    preferRelativeResize: "0"
                                }
                            },
                            children: [
                                {
                                    name: "a:picLocks"
                                }
                            ]
                        }
                    ]
                });

                var getAnchor = (name, imageAnchor) => ({
                    name: `xdr:${name}`,
                    children: [
                        {
                            name: "xdr:col",
                            textNode: imageAnchor.col.toString()
                        },
                        {
                            name: "xdr:colOff",
                            textNode: imageAnchor.offsetX.toString()
                        },
                        {
                            name: "xdr:row",
                            textNode: imageAnchor.row.toString()
                        },
                        {
                            name: "xdr:rowOff",
                            textNode: imageAnchor.offsetY.toString()
                        }
                    ]
                });

                var drawingFactory = {
                    getTemplate(config) {
                        const { sheetIndex } = config;
                        const sheetImages = that.worksheetImages.get(sheetIndex);
                        const sheetImageIds = that.worksheetImageIds.get(sheetIndex);
                        const children = sheetImages.map((image, idx) => {
                            const boxSize = getImageBoxSize(image);
                            return {
                                name: "xdr:twoCellAnchor",
                                properties: {
                                    rawMap: {
                                        editAs: "absolute"
                                    }
                                },
                                children: [
                                    getAnchor("from", boxSize.from),
                                    getAnchor("to", boxSize.to),
                                    getPicture(image, idx, sheetImageIds.get(image.id).index, boxSize),
                                    { name: "xdr:clientData" }
                                ]
                            };
                        });
                        return {
                            name: "xdr:wsDr",
                            properties: {
                                rawMap: {
                                    "xmlns:xdr": "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
                                    "xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main",
                                }
                            },
                            children
                        };
                    }
                };

                const createDrawing = (sheetIndex) => {
                    return this.createXmlPart(drawingFactory.getTemplate({ sheetIndex }));
                }
                // enterprise-modules/excel-export/src/excelExport/files/ooxml/relationship.ts
                var relationshipFactory = {
                    getTemplate(config) {
                        const { Id, Type, Target } = config;
                        return {
                            name: "Relationship",
                            properties: {
                                rawMap: {
                                    Id,
                                    Type,
                                    Target
                                }
                            }
                        };
                    }
                };
                var relationship_default = relationshipFactory;

                // enterprise-modules/excel-export/src/excelExport/files/ooxml/relationships.ts
                var relationshipsFactory = {
                    getTemplate(c) {
                        const children = c.map((relationship) => relationship_default.getTemplate(relationship));
                        return {
                            name: "Relationships",
                            properties: {
                                rawMap: {
                                    xmlns: "http://schemas.openxmlformats.org/package/2006/relationships"
                                }
                            },
                            children
                        };
                    }
                };
                var relationships_default = relationshipsFactory;

                const createDrawingRel = (sheetIndex) => {
                    const worksheetImageIds = this.worksheetImageIds.get(sheetIndex) || [];
                    const XMLArr = [];
                    for (const [key, value] of worksheetImageIds) {
                        XMLArr.push({
                            Id: `rId${value.index + 1}`,
                            Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
                            Target: `../media/image${this.workbookImageIds.get(key).index + 1}.${value.type}`
                        });
                    }
                    return this.createXmlPart(relationshipsFactory.getTemplate(XMLArr));
                }

                var createExcelXmlDrawings = (sheetIndex, drawingIndex) => {
                    const drawingFolder = 'xl/drawings';
                    const drawingFileName = `${drawingFolder}/drawing${drawingIndex + 1}.xml`;
                    const relFileName = `${drawingFolder}/_rels/drawing${drawingIndex + 1}.xml.rels`;
                    zip.file(relFileName, createDrawingRel(sheetIndex));
                    zip.file(drawingFileName, createDrawing(sheetIndex));
                };

                for (let i = 1; i < data.length; i++) {
                    const hasImages = this.worksheetImages.has(i);
                    if (hasImages) {
                        createExcelXmlDrawings(i, imageRelationCounter);
                        drawingIndex = imageRelationCounter;
                        imageRelationCounter++;
                    }
                }

                const createRelationships = ({
                    drawingIndex,
                    tableIndex
                } = {}) => {
                    if (drawingIndex === void 0 && tableIndex === void 0) {
                        return '';
                    }
                    const config = [];

                    if (drawingIndex !== null && imgCounter > 0) {
                        config.push({
                            Id: `rId${config.length + 1}`,
                            Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
                            Target: `../drawings/drawing${drawingIndex + 1}.xml`
                        });
                    }
                    if (tableIndex !== null) {
                        config.push({
                            Id: `rId${config.length + 1}`,
                            Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/table",
                            Target: `../tables/table1.xml`
                        });
                    }
                    const rs = relationships_default.getTemplate(config);
                    return this.createXmlPart(rs);
                }

                var tableIndex = this.exportAsTable ? 1 : 0;
                const worksheetRelFile = `xl/worksheets/_rels/sheet1.xml.rels`;
                zip.file(
                    worksheetRelFile,
                    createRelationships({
                        tableIndex,
                        drawingIndex
                    })
                );
            }
            /**
             * Exports to XLSX.
             */
            exportToXLSX(data, fileName, callback) {
                try {
                    JSZip;
                }
                catch (error) {
                    throw new Error('Missing reference to \'jszip.min.js\'.');
                }

                const that = this;
                let style = that.style;

                data = that.processGroupingInformation(data, true);
                that.data = data;
                that.getColumnsArray();

                that.complexHeaderMergedCells = [];

                if (that.complexHeaderMergeInfo) {
                    for (let cell in that.complexHeaderMergeInfo) {
                        if (Object.prototype.hasOwnProperty.call(that.complexHeaderMergeInfo, cell)) {
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

                // eslint-disable-next-line
                const zip = new JSZip(),
                    _rels = zip.folder('_rels'),
                    docProps = zip.folder('docProps'),
                    xl = zip.folder('xl');

                if (that.headerContent) {
                    const rows = that.headerContent;
                    const customRows = [];
                    for (let i = 0; i < rows.length; i++) {
                        const row = rows[i];
                        const cells = row.cells;
                        let customRow = {};
                        for (let j = 0; j < that.datafields.length; j++) {
                            const dataField = that.datafields[j];
                            if (cells[dataField]) {
                                customRow[dataField] = cells[dataField];
                            }
                            else {
                                customRow[dataField] = null;
                            }
                        }
                        customRows.push(customRow);
                    }
                    data = [...customRows, ...data];
                }

                if (that.footerContent) {
                    const rows = that.footerContent;
                    const customRows = [];
                    for (let i = 0; i < rows.length; i++) {
                        const row = rows[i];
                        const cells = row.cells;
                        let customRow = {};
                        for (let j = 0; j < that.datafields.length; j++) {
                            const dataField = that.datafields[j];
                            if (cells[dataField]) {
                                customRow[dataField] = cells[dataField];
                            }
                            else {
                                customRow[dataField] = null;
                            }
                        }
                        customRows.push(customRow);
                    }
                    data = [...data, ...customRows];
                }

                this.generateWorksheetImages(zip, xl, data);

                const sharedStrings = that.generateSharedStrings(data),
                    sharedStringsCollection = sharedStrings.collection,
                    sharedStringsXML = sharedStrings.xml,
                    stylesXML = that.generateStyles(style),
                    sheet1XML = that.groupBy ? that.generateSheet1WithGrouping(data, sharedStringsCollection) :
                        that.generateSheet1(data, sharedStringsCollection, that.datafields, that.columnsArray),
                    auxiliaryFiles = that.generateAuxiliaryFiles();


                let hasImages = false;
                const worksheetImages = this.worksheetImages.get(1);
                if (worksheetImages && worksheetImages.length) {
                    hasImages = true;
                }

                const xl_rels = xl.folder('_rels'),
                    theme = xl.folder('theme'),
                    worksheets = xl.folder('worksheets');

                if (hasImages) {
                    const media = xl.folder('media'),
                        drawings = xl.folder('drawings'),
                        drawingsRels = xl.folder('drawings/_rels');
                }

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


                if (this.spreadsheets) {
                    let sheetIndex = 2;
                    for (let s = 0; s < this.spreadsheets.length; s++) {
                        const sheet = this.spreadsheets[s];
                        const dataFields = sheet.dataFields;
                        let data = [...sheet.dataSource];

                        let header = [];
                        for (let i = 0; i < sheet.columns.length; i++) {
                            const column = sheet.columns[i];
                            if (typeof column === 'string') {
                                header[column] = column;
                            }
                            else {
                                header[column.dataField] = column.label || column.text;
                            }
                        }
                        data.splice(0, 0, header);
                        const sheet1XML = that.generateSheet1(data, sharedStringsCollection, dataFields, that.getColumnsArrayFromDataFields(dataFields), sheetIndex);
                        worksheets.file('sheet' + sheetIndex++ + '.xml', sheet1XML);
                    }
                }

                if (this.exportAsTable) {
                    const columnNames = Object.values(that.data[0]);

                    const createGUID = () => {
                        function part() {
                            return Math.floor((1 + Math.random()) * 0x10000)
                                .toString(16)
                                .substring(1);
                        }

                        return part() + part() + '-' + part() + '-' + part() + '-' + part() + '-' + part() + part() + part();
                    }

                    const dimensionEnd = (that.groupBy && that.groupBy.length) ? that.groupDimensionEnd : that.columnsArray[that.columnsArray.length - 1] + (data.length - 1);

                    let table = `<table xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:xr="http://schemas.microsoft.com/office/spreadsheetml/2014/revision" xmlns:xr3="http://schemas.microsoft.com/office/spreadsheetml/2016/revision3" mc:Ignorable="xr xr3" id="1" name="Table1" displayName="Table1" ref="A${this.xlsxStartIndex}:${dimensionEnd}" totalsRowShown="0">
    <autoFilter ref="A${this.xlsxStartIndex}:${dimensionEnd}">`;
                    for (let i = 0; i < columnNames.length; i++) {
                        table += `<filterColumn colId="${i}" hiddenButton="0"/>
    `;
                    }
                    table += '</autoFilter>';
                    let tableColumns = `
    <tableColumns count="${columnNames.length}">`;

                    for (let i = 0; i < columnNames.length; i++) {
                        const column = columnNames[i];

                        tableColumns += `<tableColumn id="${i + 1}" name="${column}" dataCellStyle="Normal"/>
    `;
                    }
                    tableColumns += `
    </tableColumns>`;

                    table += tableColumns;
                    table += `
        <tableStyleInfo name="TableStyleLight1" showFirstColumn="0" showLastColumn="0" showRowStripes="1" showColumnStripes="0"/>
    </table>`;


                    const tables = xl.folder('tables');
                    tables.file('table1.xml', table);
                }

                zip.generateAsync({
                    type: 'blob',
                    mimeType:
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                })
                    .then(function (content) {
                        if (!fileName && callback) {
                            callback(content);
                        }
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
                                        return a.getTime() - b.getTime();
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

                if (!fileName) {
                    return xmlContent;
                }

                return this.downloadFile(xmlContent, 'application/xml', fileName);
            }

            /**
             * Formats a date.
             */
            formatDate(value, format) {
                return value;
            }

            /**
             * Formats a number.
             */
            formatNumber(value, format) {
                return value;
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
                let relationShips = `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>`;
                let relationShipId = 1;
                if (this.spreadsheets) {
                    for (let s = 0; s < this.spreadsheets.length; s++) {
                        const sheetId = 2 + s;
                        relationShipId++;
                        relationShips += `<Relationship Id="rId${sheetId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${sheetId}.xml"/>`;
                    }
                }

                const xl_relsWorkbookXmlRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${relationShips}<Relationship Id="rId${++relationShipId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/><Relationship Id="rId${++relationShipId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId${++relationShipId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/></Relationships>`;

                // xl\theme\theme1.xml
                const xlThemeTheme1Xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="44546A"/></a:dk2><a:lt2><a:srgbClr val="E7E6E6"/></a:lt2><a:accent1><a:srgbClr val="4472C4"/></a:accent1><a:accent2><a:srgbClr val="ED7D31"/></a:accent2><a:accent3><a:srgbClr val="A5A5A5"/></a:accent3><a:accent4><a:srgbClr val="FFC000"/></a:accent4><a:accent5><a:srgbClr val="5B9BD5"/></a:accent5><a:accent6><a:srgbClr val="70AD47"/></a:accent6><a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Calibri Light" panose="020F0302020204030204"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="游ゴシック Light"/><a:font script="Hang" typeface="맑은 고딕"/><a:font script="Hans" typeface="等线 Light"/><a:font script="Hant" typeface="新細明體"/><a:font script="Arab" typeface="Times New Roman"/><a:font script="Hebr" typeface="Times New Roman"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="MoolBoran"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Times New Roman"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/><a:font script="Armn" typeface="Arial"/><a:font script="Bugi" typeface="Leelawadee UI"/><a:font script="Bopo" typeface="Microsoft JhengHei"/><a:font script="Java" typeface="Javanese Text"/><a:font script="Lisu" typeface="Segoe UI"/><a:font script="Mymr" typeface="Myanmar Text"/><a:font script="Nkoo" typeface="Ebrima"/><a:font script="Olck" typeface="Nirmala UI"/><a:font script="Osma" typeface="Ebrima"/><a:font script="Phag" typeface="Phagspa"/><a:font script="Syrn" typeface="Estrangelo Edessa"/><a:font script="Syrj" typeface="Estrangelo Edessa"/><a:font script="Syre" typeface="Estrangelo Edessa"/><a:font script="Sora" typeface="Nirmala UI"/><a:font script="Tale" typeface="Microsoft Tai Le"/><a:font script="Talu" typeface="Microsoft New Tai Lue"/><a:font script="Tfng" typeface="Ebrima"/></a:majorFont><a:minorFont><a:latin typeface="Calibri" panose="020F0502020204030204"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="游ゴシック"/><a:font script="Hang" typeface="맑은 고딕"/><a:font script="Hans" typeface="等线"/><a:font script="Hant" typeface="新細明體"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/><a:font script="Armn" typeface="Arial"/><a:font script="Bugi" typeface="Leelawadee UI"/><a:font script="Bopo" typeface="Microsoft JhengHei"/><a:font script="Java" typeface="Javanese Text"/><a:font script="Lisu" typeface="Segoe UI"/><a:font script="Mymr" typeface="Myanmar Text"/><a:font script="Nkoo" typeface="Ebrima"/><a:font script="Olck" typeface="Nirmala UI"/><a:font script="Osma" typeface="Ebrima"/><a:font script="Phag" typeface="Phagspa"/><a:font script="Syrn" typeface="Estrangelo Edessa"/><a:font script="Syrj" typeface="Estrangelo Edessa"/><a:font script="Syre" typeface="Estrangelo Edessa"/><a:font script="Sora" typeface="Nirmala UI"/><a:font script="Tale" typeface="Microsoft Tai Le"/><a:font script="Talu" typeface="Microsoft New Tai Lue"/><a:font script="Tfng" typeface="Ebrima"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:lumMod val="110000"/><a:satMod val="105000"/><a:tint val="67000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:lumMod val="105000"/><a:satMod val="103000"/><a:tint val="73000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="105000"/><a:satMod val="109000"/><a:tint val="81000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:satMod val="103000"/><a:lumMod val="102000"/><a:tint val="94000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:satMod val="110000"/><a:lumMod val="100000"/><a:shade val="100000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="99000"/><a:satMod val="120000"/><a:shade val="78000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln><a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln><a:ln w="19050" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="57150" dist="19050" dir="5400000" algn="ctr" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="63000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"><a:tint val="95000"/><a:satMod val="170000"/></a:schemeClr></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="93000"/><a:satMod val="150000"/><a:shade val="98000"/><a:lumMod val="102000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:tint val="98000"/><a:satMod val="130000"/><a:shade val="90000"/><a:lumMod val="103000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="63000"/><a:satMod val="120000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/><a:extLst><a:ext uri="{05A4C25C-085E-4340-85A3-A5531E510DB2}"><thm15:themeFamily xmlns:thm15="http://schemas.microsoft.com/office/thememl/2012/main" name="Office Theme" id="{62F939B6-93AF-4DB8-9C6B-D6C7DFDC589F}" vid="{4A3C46E8-61CC-4603-A589-7422A47A8E4A}"/></a:ext></a:extLst></a:theme>`;

                // xl\workbook.xml
                let sheets = '<sheet name="Sheet1" sheetId="1" r:id="rId1"/>';
                if (this.spreadsheets) {
                    for (let s = 0; s < this.spreadsheets.length; s++) {
                        const sheetId = 2 + s;
                        const sheet = this.spreadsheets[s];
                        sheets += `<sheet name="${sheet.label}" sheetId="${sheetId}" r:id="rId${sheetId}"/>`;
                    }
                }

                const xlWorkbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x15 xr xr6 xr10 xr2" xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" xmlns:xr="http://schemas.microsoft.com/office/spreadsheetml/2014/revision" xmlns:xr6="http://schemas.microsoft.com/office/spreadsheetml/2016/revision6" xmlns:xr10="http://schemas.microsoft.com/office/spreadsheetml/2016/revision10" xmlns:xr2="http://schemas.microsoft.com/office/spreadsheetml/2015/revision2"><fileVersion appName="xl" lastEdited="7" lowestEdited="7" rupBuild="20325"/><workbookPr defaultThemeVersion="166925"/><mc:AlternateContent xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"><mc:Choice Requires="x15"><x15ac:absPath url="C:\Users\jqwidgets\Desktop\" xmlns:x15ac="http://schemas.microsoft.com/office/spreadsheetml/2010/11/ac"/></mc:Choice></mc:AlternateContent><xr:revisionPtr revIDLastSave="0" documentId="13_ncr:1_{0DEDCB6D-5403-4CD8-AAA5-59B6D238A8B6}" xr6:coauthVersionLast="34" xr6:coauthVersionMax="34" xr10:uidLastSave="{00000000-0000-0000-0000-000000000000}"/><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="19200" windowHeight="6950" xr2:uid="{0CB664E6-3800-4A88-B158-B46A682E7484}"/></bookViews><sheets>${sheets}</sheets><calcPr calcId="179021"/><extLst><ext uri="{140A7094-0E35-4892-8432-C4D2E57EDEB5}" xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main"><x15:workbookPr chartTrackingRefBase="1"/></ext></extLst></workbook>`;

                const worksheetImages = this.worksheetImages.get(1);
                let drawings = '';
                if (worksheetImages && worksheetImages.length) {
                    drawings = '<Override PartName="/xl/drawings/drawing1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/>';
                }

                let tables = '';
                if (this.exportAsTable) {
                    tables = '<Override PartName="/xl/tables/table1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml"/>';
                }

                // [Content_Types].xml
                let sheetOverrides = `<Override PartName = "/xl/worksheets/sheet1.xml" ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />`;
                if (this.spreadsheets) {
                    for (let i = 0; i < this.spreadsheets.length; i++) {
                        sheetOverrides += `<Override PartName = "/xl/worksheets/sheet${i + 2}.xml" ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />`;
                    }
                }
                const Content_TypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="bin" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings"/><Default Extension="jpeg" ContentType="image/jpeg"/><Default Extension="png" ContentType="image/png"/><Default Extension="svg" ContentType="image/svg"/><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${sheetOverrides}<Override PartName="/xl/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>${tables}${drawings}<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`;

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

                const addSharedStrings = (data, datafields) => {
                    for (let i = 0; i < data.length; i++) {
                        const currentRecord = data[i];

                        for (let j = 0; j < datafields.length; j++) {
                            let currentValue = currentRecord[datafields[j]];

                            if (currentValue === null && !that.allowNull) {
                                currentValue = '';
                            }

                            if (typeof currentValue !== 'string') {
                                continue;
                            }

                            addSharedString(currentValue);
                        }
                    }
                }

                addSharedStrings(data, datafields);

                if (that.spreadsheets) {
                    for (let i = 0; i < that.spreadsheets.length; i++) {
                        const sheet = that.spreadsheets[i];
                        const datafields = sheet.dataFields;
                        let data = [...sheet.dataSource];

                        let header = [];
                        for (let i = 0; i < sheet.columns.length; i++) {
                            const column = sheet.columns[i];
                            if (typeof column === 'string') {
                                header[column] = column;
                            }
                            else {
                                header[column.dataField] = column.label;
                            }
                        }
                        data.splice(0, 0, header);
                        addSharedStrings(data, datafields);
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
            generateSheet1(data, sharedStrings, datafields, columnsArray, sheetIndex) {
                const that = this,
                    numberOfColumns = columnsArray.length,
                    numberOfRows = data.length,
                    dimensionEnd = columnsArray[numberOfColumns - 1] + numberOfRows,
                    autoFilter = that.getFilters(),
                    mergedCells = [].concat(that.complexHeaderMergedCells);
                let rIdCounter = 0;

                const addDrawingRel = (currentSheet2) => {
                    let xmlContent = '';

                    const worksheetImages = this.worksheetImages.get(currentSheet2);
                    if (worksheetImages && worksheetImages.length) {
                        xmlContent += `<drawing r:id="rId${++rIdCounter}"/>`;
                    }
                    return xmlContent;
                };
                const addTableRel = () => {
                    if (!that.exportAsTable) {
                        return '';
                    }

                    let xmlContent = `<tableParts count="1">
                    <tablePart r:id="rId${++rIdCounter}"/>
                </tableParts>`;

                    return xmlContent;
                };

                const freezeHeader = that.freezeHeader ? `<sheetView rightToLeft="0" workbookViewId="0">
             <pane state="frozen" topLeftCell="A${that.xlsxStartIndex + 1}" ySplit="${that.xlsxStartIndex}"/>
            </sheetView>` : '';

                let cols = that.getCustomColumnWidths(columnsArray);

                if (sheetIndex > 1) {
                    let colsString = '<cols>';
                    for (let i = 0; i < columnsArray.length; i++) {
                        colsString += '<col min="1" max="1" width="25" hidden="0" bestFit="0" customWidth="1"/>';
                    }
                    colsString += '</cols>';

                    cols = colsString;
                }

                const tabSelected = sheetIndex <= 1 ? 'tabSelected="1"' : '';

                let xmlContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac xr xr2 xr3" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" xmlns:xr="http://schemas.microsoft.com/office/spreadsheetml/2014/revision" xmlns:xr2="http://schemas.microsoft.com/office/spreadsheetml/2015/revision2" xmlns:xr3="http://schemas.microsoft.com/office/spreadsheetml/2016/revision3" xr:uid="{7F25248B-C640-4C64-AD47-C0EA0E5D90D0}">
        <sheetPr filterMode="${autoFilter !== ''}" />
        <dimension ref="A1:${dimensionEnd}" />
        <sheetViews>
            <sheetView ${tabSelected} workbookViewId="0" />
            ${freezeHeader}
        </sheetViews>
        <sheetFormatPr defaultRowHeight="14.5" x14ac:dyDescent="0.35" />${cols}
        <sheetData>\n`;

                function r(col, row) {
                    return columnsArray[col] + row;
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

                    let recordXML = `        <row r="${rowNumber}"${that.getOutlineLevel(currentRecord)} hidden="${currentRecord._hidden || currentRecord._collapsed || false}"${collapsed} spans="1:${numberOfColumns}"${that.getCustomRowHeight(rowNumber - 1)} customHeight="1" x14ac:dyDescent="0.45">\n`;

                    for (let j = 0; j < datafields.length; j++) {
                        const s = that.getXLSXCellStyle(r(j, rowNumber));

                        recordXML += that.getActualCellData(currentRecord[datafields[j]], { r: r(j, rowNumber), s: s }, sharedStrings, rowNumber, datafields[j]);
                    }

                    recordXML += '        </row>\n';
                    xmlContent += recordXML;
                }

                if (that.headerContent) {
                    for (let m = 0; m < that.headerContent.length; m++) {
                        const row = that.headerContent[m];
                        if (row.style && row.style.mergeAcross) {
                            mergedCells.push({
                                from: 'A' + (m + 1),
                                to: columnsArray[numberOfColumns - 1] + (m + 1)
                            });
                        }
                    }
                }
                if (that.footerContent) {
                    for (let m = 0; m < that.footerContent.length; m++) {
                        const row = that.footerContent[m];
                        if (row.style && row.style.mergeAcross) {
                            mergedCells.push({
                                from: 'A' + (data.length - m),
                                to: columnsArray[numberOfColumns - 1] + (data.length - m)
                            });
                        }
                    }
                }
                xmlContent += `    </sheetData>${that.conditionalFormattingXLSX.conditions}${autoFilter}${that.getMergedCells(mergedCells)}
        <pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3" />
        <pageSetup paperSize="9" orientation="portrait" r:id="rId1" />
        ${addDrawingRel(sheetIndex ? sheetIndex : 1)}
        ${addTableRel()}
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
                let rIdCounter = 0;

                const addDrawingRel = (currentSheet2) => {
                    let xmlContent = '';

                    const worksheetImages = this.worksheetImages.get(currentSheet2);
                    if (worksheetImages && worksheetImages.length) {
                        xmlContent += `<drawing r:id="rId${++rIdCounter}"/>`;
                    }
                    return xmlContent;
                };
                const addTableRel = () => {
                    if (!that.exportAsTable) {
                        return '';
                    }

                    let xmlContent = `<tableParts count="1">
                    <tablePart r:id="rId${++rIdCounter}"/>
                </tableParts>`;

                    return xmlContent;
                };
                const freezeHeader = that.freezeHeader ? `<sheetView rightToLeft="0" workbookViewId="0">
             <pane state="frozen" topLeftCell="A${that.xlsxStartIndex + 1}" ySplit="${that.xlsxStartIndex}"/>
            </sheetView>` : '';
                let xmlContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac xr xr2 xr3" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" xmlns:xr="http://schemas.microsoft.com/office/spreadsheetml/2014/revision" xmlns:xr2="http://schemas.microsoft.com/office/spreadsheetml/2015/revision2" xmlns:xr3="http://schemas.microsoft.com/office/spreadsheetml/2016/revision3" xr:uid="{7F25248B-C640-4C64-AD47-C0EA0E5D90D0}">
        <dimension ref="A1:${dimensionEnd}" />
        <sheetViews>
            <sheetView tabSelected="1" workbookViewId="0" />
            ${freezeHeader}
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

                    let recordXML = `        <row r="${rowNumber}"${outlineXML} spans="1:${numberOfColumns}"${that.getCustomRowHeight(rowNumber - 1)} customHeight="1" x14ac:dyDescent="0.45">\n`;

                    for (let j = 0; j < datafields.length; j++) {
                        const s = that.getXLSXCellStyle(r(j, i + 1));

                        recordXML += that.getActualCellData(currentRecord[datafields[j]], { r: r(j, rowNumber), s: s }, sharedStrings, rowNumber, datafields[j]);
                    }

                    recordXML += '        </row>\n';
                    xmlContent += recordXML;
                }

                xmlContent += `    </sheetData>${!that.exportAsTable ? that.getMergedCells(mergedCells) : ''}
        <pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3" />
        <pageSetup paperSize="9" orientation="portrait" r:id="rId1" />
        ${addDrawingRel(1)}
        ${addTableRel()}
    </worksheet>`;

                that.groupDimensionEnd = that.columnsArray[numberOfColumns - 1] + (numberOfRows + rowNumberCorrection);
                that.groupRowsCount = numberOfRows + rowNumberCorrection;
                return xmlContent;
            }

            isFormula(value) {
                if (value === null) {
                    return false;
                }
                return this.autoConvertFormulas && value.toString().startsWith('=');
            }

            /**
             * Gets actual spreadsheet cell data.
             */
            getActualCellData(currentValue, details, sharedStrings) {
                const r = details.r,
                    s = details.s || ' s="0"';

                if (currentValue === null && !this.allowNull) {
                    currentValue = '';
                }

                if (currentValue && this.isFormula(currentValue)) {
                    return `            <c r="${r}" t="s"${s}>
                    <f>${currentValue.slice(1)}</f>
                </c>\n`;
                }

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
                    //    const timeZoneOffset = currentValue.getTimezoneOffset() * 1000 * 60;
                    //    const excelDate = (currentValue.getTime() + this.timeBetween1900And1970 - timeZoneOffset) / (1000 * 60 * 60 * 24) + 3;

                    const timeBetweenJSandExcel = 2 + Math.round(this.timeBetween1900And1970 / (1000 * 60 * 60 * 24));
                    const excelDateTime = timeBetweenJSandExcel + ((currentValue.getTime() - (currentValue.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));

                    return `            <c r="${r}"${s}>
                    <v>${excelDateTime}</v>
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
           * Gets column labels.
           */
            getColumnsArrayFromDataFields(datafields) {
                const that = this,
                    numberOfColumns = datafields.length,
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

                return columnsCollection;
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

                let styles;

                if (style.removeDefault) {
                    styles = {
                        header: '',
                        column: '',
                        group: ''
                    };
                }
                else {
                    styles = {
                        header: 'border: 1px solid black; padding: 5px; ',
                        column: 'white-space: nowrap; overflow: hidden; border: 1px solid black; padding: 5px; ',
                        group: 'background-color: #FFFFFF; color: #000000; font-weight: bold; '
                    };
                }

                const sampleRecord = that.data[0];
                let generatedStyle = '';

                const headerDefinition = style.header || {};

                for (let prop in headerDefinition) {
                    if (!Object.prototype.hasOwnProperty.call(headerDefinition, prop)) {
                        continue;
                    }

                    const value = headerDefinition[prop];

                    if (sampleRecord[prop]) {
                        if (!styles['header' + prop]) {
                            styles['header' + prop] = '';
                        }

                        for (let columnProp in value) {
                            if (Object.prototype.hasOwnProperty.call(value, columnProp)) {
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
                    if (!Object.prototype.hasOwnProperty.call(columnsDefinition, prop)) {
                        continue;
                    }

                    const value = columnsDefinition[prop];

                    if (sampleRecord[prop]) {
                        if (!styles['column' + prop]) {
                            styles['column' + prop] = '';
                        }

                        for (let columnProp in value) {
                            if (isNaN(columnProp) && Object.prototype.hasOwnProperty.call(value, columnProp) && columnProp !== 'format') {
                                styles['column' + prop] += window.jqxToDash(columnProp) + ': ' + value[columnProp] + '; ';
                            }
                        }

                        continue;
                    }

                    styles.column += window.jqxToDash(prop) + ': ' + value + '; ';
                }

                for (let prop in styles) {
                    if (Object.prototype.hasOwnProperty.call(styles, prop)) {
                        generatedStyle += `        .${prop} { ${styles[prop]}}\n`;
                    }
                }

                if (style.custom) {
                    generatedStyle += `${style.custom}\n`;
                }

                return generatedStyle;
            }

            /**
             * Gets custom column widths.
             */
            getCustomColumnWidths(columnsArray) {
                const that = this;

                if (columnsArray !== that.columnsArray) {
                    return '';
                }

                if (!that.style || !that.columnWidth || that.columnWidth.length === 0) {
                    return '';
                }

                let xml = '\n    <cols>\n';

                for (let i = 0; i < that.columnWidth.length; i++) {
                    let width = that.columnWidth[i];

                    if (width !== undefined) {
                        width = Math.round(parseFloat(width)) / 7;
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
                    if (Object.prototype.hasOwnProperty.call(sampleRecord, prop) && prop.charAt(0) !== '_') {
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
                    if (Object.prototype.hasOwnProperty.call(filterBy, datafield)) {
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

                for (let j = 0; j < that.complexDataFieldsHeader.length; j++) {
                    const row = that.complexDataFieldsHeader[j];

                    header += '            <tr>\n';

                    for (let k = 0; k < row.length; k++) {
                        const currentLabel = row[k];
                        let colspan = 1, rowspan = 1;

                        if ((row[k - 1] && row[k - 1] === currentLabel) ||
                            (that.complexDataFieldsHeader[j - 1] && (that.complexDataFieldsHeader[j - 1][k] === currentLabel))) {
                            continue;
                        }

                        let iterator = k + 1;

                        while (row[iterator] && row[iterator] === row[iterator - 1]) {
                            colspan++;
                            iterator++;
                        }

                        iterator = j + 1;

                        while (that.complexDataFieldsHeader[iterator] && that.complexDataFieldsHeader[iterator][k] === currentLabel) {
                            rowspan++;
                            iterator++;
                        }

                        const datafield = j === that.complexHeader.length - 1 || rowspan + j === that.complexHeader.length ?
                            ' header' + datafields[k] : '';

                        header += `                <th class="header${datafield}" colspan="${colspan}" rowspan="${rowspan}">${that.complexHeader[j][k]}</th>\n`;
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
                    if (!Object.prototype.hasOwnProperty.call(rowsDefinition, prop) ||
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
                            if (Object.prototype.hasOwnProperty.call(value, rowProp)) {
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
                    if (Object.prototype.hasOwnProperty.call(style, prop) &&
                        ['header', 'columns', 'rows', 'removeDefault', 'custom'].indexOf(prop) === -1) {
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
                    let currencySign = '$';
                    if (format && typeof (format) === 'string' && format.indexOf('c') >= 0 && format.indexOf('x') >= 0) {
                        currencySign = format.substring(0, format.indexOf('x'));
                        format = format.substring(1 + format.indexOf('x'));
                    }

                    if (!/^([a-zA-Z]\d*)$/g.test(format)) {
                        return format;
                    }

                    let precision = parseFloat(format.slice(1)) || 0,
                        precisionCode = precision > 0 ? '.' + ('0').repeat(precision) : '';

                    format = format.slice(0, 1);

                    switch (format) {
                        case 'C':
                        case 'c':
                            if (currencySign !== '$') {
                                return '\#,0' + precisionCode + ' ' + currencySign;
                            }
                            return currencySign + '\#,0' + precisionCode;
                        case 'D':
                        case 'd':
                            if (precision) {
                                return '\#,0' + precisionCode;
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
                            if (Object.prototype.hasOwnProperty.call(headerDefinition, prop) && sampleRecord[prop] === undefined) {
                                if (that.complexHeader) {
                                    for (let j = 0; j < that.complexHeader.length; j++) {
                                        if (prop === 'height') {
                                            that.rowHeight[j] = ` ht="${(parseFloat(headerDefinition.height) / 1) / 2}"`;
                                            continue;
                                        }
                                        else {
                                            that.storeCellStyle(columnLetter + (j + 1), prop, headerDefinition[prop]);
                                        }
                                    }
                                }
                                else {
                                    if (prop === 'height') {
                                        that.rowHeight[startIndex - 1] = ` ht="${parseFloat(headerDefinition.height) / 2}"`;
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
                            if (Object.prototype.hasOwnProperty.call(columnSpecific, prop)) {
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
                            if (Object.prototype.hasOwnProperty.call(columnsDefinition, prop) && sampleRecord[prop] === undefined) {
                                that.storeCellStyle(cell, prop, columnsDefinition[prop]);
                            }
                        }

                        if (!columnSpecific) {
                            continue;
                        }

                        for (let prop in columnSpecific) {
                            if (!isNaN(prop) || !Object.prototype.hasOwnProperty.call(columnSpecific, prop)) {
                                continue;
                            }

                            that.storeCellStyle(cell, prop, columnSpecific[prop], that.data[i][datafield]);
                        }

                        if (columnSpecific[i]) {
                            const cellProperties = columnSpecific[i];
                            for (let prop in cellProperties) {
                                if (!isNaN(prop) || !Object.prototype.hasOwnProperty.call(cellProperties, prop)) {
                                    continue;
                                }
                                if (!cellProperties[prop]) {
                                    continue;
                                }

                                that.storeCellStyle(cell, prop, cellProperties[prop], that.data[i][datafield]);
                            }
                        }
                    }
                }

                // prepend

                if (that.headerContent && that.headerContent.length) {
                    for (let m = 0; m < that.headerContent.length; m++) {
                        const applyToRowCells = (row, prop, value) => {
                            for (let j = 0; j < that.columnsArray.length; j++) {
                                const currentCell = that.columnsArray[j] + (row);

                                that.storeCellStyle(currentCell, prop, value);
                            }
                        }

                        const row = m + 1;

                        if (that.headerContent[m].style) {
                            const contentStyle = that.headerContent[m].style;

                            const hexDigits = new Array
                                ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

                            const hex = (x) => {
                                return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
                            }

                            //Function to convert rgb color to hex format
                            const toHex = (rgb) => {
                                if (!rgb.startsWith('#')) {
                                    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

                                    if (!rgb) {
                                        return null;
                                    }
                                }
                                else {
                                    return rgb.toUpperCase();
                                }

                                return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]).toUpperCase();
                            }



                            for (let prop in contentStyle) {
                                let value = contentStyle[prop];

                                if (prop === 'height') {
                                    that.rowHeight[row - 1] = ` ht="${parseFloat(value)}"`;
                                    continue;
                                }
                                if (prop === 'color' || prop === 'backgroundColor') {
                                    value = toHex(value);
                                }

                                applyToRowCells(row, prop, value);
                            }
                        }
                    }
                }




                // append
                if (that.footerContent && that.footerContent.length) {
                    for (let m = 0; m < that.footerContent.length; m++) {
                        const applyToRowCells = (row, prop, value) => {
                            for (let j = 0; j < that.columnsArray.length; j++) {
                                const currentCell = that.columnsArray[j] + (row);

                                that.storeCellStyle(currentCell, prop, value);
                            }
                        }

                        let prefix = (that.headerContent && that.headerContent.length) ? that.headerContent.length : 0;

                        const row = 1 + that.data.length + m + prefix;

                        if (that.footerContent[m].style) {
                            const contentStyle = that.footerContent[m].style;

                            const hexDigits = new Array
                                ('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

                            const hex = (x) => {
                                return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
                            }

                            //Function to convert rgb color to hex format
                            const toHex = (rgb) => {
                                if (!rgb.startsWith('#')) {
                                    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

                                    if (!rgb) {
                                        return null;
                                    }
                                }
                                else {
                                    return rgb.toUpperCase();
                                }

                                return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]).toUpperCase();
                            }



                            for (let prop in contentStyle) {
                                let value = contentStyle[prop];

                                if (prop === 'height') {
                                    that.rowHeight[row - 1] = ` ht="${parseFloat(value)}"`;
                                    continue;
                                }
                                if (prop === 'color' || prop === 'backgroundColor') {
                                    value = toHex(value);
                                }

                                applyToRowCells(row, prop, value);
                            }
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
                    columnGroupNameHierarchy = {},
                    complexHeader = [],
                    complexDataFieldsHeader = [];
                let headerDepth = 0;

                function getColumnGroup(columnGroup) {
                    for (let i = 0; i < header.columngroups.length; i++) {
                        const currentGroupDefinition = header.columngroups[i];

                        if (currentGroupDefinition.name === columnGroup) {
                            return currentGroupDefinition;
                        }
                    }
                }

                function getColumnGroupHierarchy(groupDefinition, property) {
                    const columnGroups = [];

                    while (groupDefinition) {
                        columnGroups.unshift(groupDefinition[property]);

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
                            groupHierarchy = getColumnGroupHierarchy(currentGroupDefinition, 'label');

                        columnGroupHierarchy[currentGroupDefinition.name] = groupHierarchy;
                        columnGroupNameHierarchy[currentGroupDefinition.name] = getColumnGroupHierarchy(currentGroupDefinition, 'name');
                        headerDepth = Math.max(headerDepth, groupHierarchy.length);
                    }

                    headerDepth++;

                    for (let i = 0; i < headerDepth; i++) {
                        complexHeader[i] = [];
                        complexDataFieldsHeader[i] = [];
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
                    complexDataFieldsHeader[headerDepth - 1][i] = currentColumn.dataField;

                    if (!currentColumn.columnGroup) {
                        continue;
                    }

                    const columnGroups = columnGroupHierarchy[currentColumn.columnGroup],
                        columnGroupNames = columnGroupNameHierarchy[currentColumn.columnGroup];

                    if (columnGroups) {
                        for (let j = 0; j < columnGroups.length; j++) {
                            complexHeader[j][i] = columnGroups[j];
                            complexDataFieldsHeader[j][i] = columnGroupNames[j];
                        }
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
                                complexDataFieldsHeader[i][j] = complexDataFieldsHeader[iterator][j];
                            }

                            entry[datafieldMapping[j]] = complexHeader[i][j];
                        }

                        if (format === 'xlsx') {
                            data.splice(i, 0, entry);
                        }
                    }

                    that.complexHeader = complexHeader;
                    that.complexDataFieldsHeader = complexDataFieldsHeader;

                    if (format !== 'xlsx') {
                        data.unshift(flatHeader);
                    }
                    else {
                        data.splice(headerDepth - 1, 0, flatHeader);

                        const toMerge = {};

                        for (let i = 0; i < headerDepth; i++) {
                            for (let j = 0; j < numberOfDatafields; j++) {
                                const dataField = complexDataFieldsHeader[i][j];

                                if (!toMerge[dataField]) {
                                    toMerge[dataField] = { from: [i, j] };
                                    toMerge[dataField].to = toMerge[dataField].from;
                                }
                                else {
                                    const oldMergeTo = toMerge[dataField].to;

                                    if (i - oldMergeTo[0] > 1 || j - oldMergeTo[1] > 1) {
                                        toMerge[dataField + Math.random().toString(36)] = toMerge[dataField];
                                        toMerge[dataField] = { from: [i, j], to: [i, j] };
                                        continue;
                                    }

                                    toMerge[dataField].to = [i, j];
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
                                if (Object.prototype.hasOwnProperty.call(currentRecord, prop) && prop.charAt(0) !== '_') {
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
                    const currentRecord = Object.assign({}, data[i]);
                    let parentKey = currentRecord._parentDataField;

                    if (parentKey === undefined) {
                        parentKey = null;
                    }

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
                    if (!rowsDefinition.height) {
                        rowsDefinition.height = 15;
                    }
                    that.defaultRowHeight = ` ht="${parseFloat(rowsDefinition.height) / 2}"`;
                }

                for (let i = startIndex; i < that.data.length; i++) {
                    const row = i - startIndex;

                    for (let prop in rowsDefinition) {
                        if (Object.prototype.hasOwnProperty.call(rowsDefinition, prop) &&
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

                    if (that.setRowHeight) {
                        const rowHeight = that.setRowHeight(row);
                        if (rowHeight) {
                            that.rowHeight[i] = ` ht="${parseFloat(rowHeight)}"`;
                            continue;
                        }
                    }

                    if (rowsDefinition[row]) {
                        for (let prop in rowsDefinition[row]) {
                            if (Object.prototype.hasOwnProperty.call(rowsDefinition[row], prop)) {
                                if (prop === 'height') {
                                    that.rowHeight[i] = ` ht="${parseFloat(rowsDefinition[row].height) / 2}"`;
                                    continue;
                                }

                                if (that.data[i] && that.data[i][prop]) {
                                    function applyToRowCell(row, prop, value, dataField) {
                                        const j = that.datafields ? that.datafields.indexOf(dataField) : -1;
                                        if (j >= 0) {
                                            const currentCell = that.columnsArray[j] + (row + 1 + startIndex);

                                            that.storeCellStyle(currentCell, prop, value);
                                        }
                                    }
                                    for (let styleProp in rowsDefinition[row][prop]) {
                                        applyToRowCell(row, styleProp, rowsDefinition[row][prop][styleProp], prop);
                                    }
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
                        cellMap.fonts.sz = Math.round(parseFloat(value) / (96 / 72));
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

                let offset = that.headerContent ? that.headerContent.length : 0;
                offset += that.footerContent ? that.footerContent.length : 0;

                let count = that.data.length + offset;

                if (that.groupBy && that.groupBy.length) {
                    count += 50;
                }

                for (let i = 0; i < count; i++) {
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

                        const XLSXFormatFirst = that.getXLSXFormat(style.columns[datafield].format, that.data[1][datafield]);
                        const XLSXFormat = that.getXLSXFormat(style.columns[datafield].format, that.data[that.data.length - 1][datafield]);

                        if (XLSXFormat) {
                            style.columns[datafield].numFmt = XLSXFormat;
                        }
                        else if (XLSXFormatFirst) {
                            style.columns[datafield].numFmt = XLSXFormatFirst;
                        }
                        else if (style.columns[datafield].format && (datafield.toLowerCase().indexOf('date') >= 0 || style.columns[datafield].format.indexOf('d/') >= 0)) {
                            let format = style.columns[datafield].format;
                            switch (format) {
                                case 'd':
                                    format = 'm/d/yyyy';
                                    break;
                                case 'D':
                                    format = 'nnnnmmmm dd, yyyy';
                                    break;
                                case 't':
                                    format = 'h:m AM/PM';
                                    break;
                                case 'T':
                                    format = 'h:mm:ss AM/PM';
                                    break;
                                case 'f':
                                    format = 'nnnnmmmm dd, yyyy h:m AM/PM';
                                    break;
                                case 'F':
                                    format = 'nnnnmmmm dd, yyyy h:mm:ss AM/PM';
                                    break;
                                case 'M':
                                    format = 'mmmm d';
                                    break;
                                case 'Y':
                                    format = 'yyyy mmmm';
                                    break;
                                case 'FP':
                                case 'PP':
                                    format = 'yyyy-mm-dd hh:mm:ss';
                                    break;
                                case 'FT':
                                case 'PT':
                                    format = 'hh:mm:ss';
                                    break;
                            }

                            format = format.replace(/f|u|n|p|e|a|x|o/gi, '');
                            format = format.replace(/tt/gi, 'AM/PM');
                            format = format.replace(/:{2,}|:\s|:$|\.$/g, '');
                            format = format.trim();
                            style.columns[datafield].numFmt = format;
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

                for (let i = 0; i < count; i++) { // iterate rows
                    for (let j = 0; j < that.columnsArray.length; j++) { // iterate columns
                        const currentCell = that.columnsArray[j] + (i + 1),
                            currentCellStyle = that.styleMap[currentCell];
                        let currentFont = '', currentFill = '', currentAlignment = '',
                            currentFontCode = [], currentFillCode = [], currentAlignmentCode = [], xf = [];

                        for (let prop in currentCellStyle.fonts) {
                            if (Object.prototype.hasOwnProperty.call(currentCellStyle.fonts, prop)) {
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
                            if (Object.prototype.hasOwnProperty.call(currentCellStyle.fills, prop)) {
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
                            if (Object.prototype.hasOwnProperty.call(currentCellStyle.alignment, prop)) {
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
})();