/*!
 * TableExport.js v3.1.1 (http://www.clarketravis.com)
 * Copyright 2015 Travis Clarke
 * Licensed under the MIT license
 */

;(function (window, undefined) {

    /*--- GLOBALS ---*/
    var $ = window.jQuery;

    $.fn.tableExport = function (options) {

        var settings = $.extend({}, $.fn.tableExport.defaults, options),
            rowD = $.fn.tableExport.rowDel, bootstrapClass, bootstrapTheme, bootstrapSpacing;

        if (settings.bootstrap) {
            bootstrapClass = $.fn.tableExport.bootstrap[0] + " ";
            bootstrapTheme = $.fn.tableExport.bootstrap[1] + " ";
            bootstrapSpacing = $.fn.tableExport.bootstrap[2] + " ";
        } else {
            bootstrapClass = $.fn.tableExport.defaultButton + " ";
            bootstrapTheme = bootstrapSpacing = "";
        }


        return this.each(function () {
            var $el = $(this),
                $rows = settings.headings ? $el.find('tr') : $el.find('tr:has(td)'),
                fileName = settings.fileName === "id" ? ($el.attr('id') ? $el.attr('id') : $.fn.tableExport.defaultFileName) : settings.fileName,
                exporters = {
                    xlsx: function (rDel, name) {
                        var dataURL = $rows.map(function (i, val) {
                                var $cols = $(val).find('th, td');
                                return $cols.map(function (i, val) {
                                    return $(val).text()
                                });
                            }).get(),
                            dataObject = JSON.stringify({
                                data: dataURL,
                                name: name
                            }).replace(/'/g, "&#39;"),
                            myFile = name + ".xlsx",
                            myContent = $.fn.tableExport.xlsx.buttonContent,
                            myClass = $.fn.tableExport.xlsx.defaultClass;
                        createObjButton(dataObject, myFile, myContent, myClass);
                    },
                    xls: function (rdel, name) {
                        var colD = $.fn.tableExport.xls.separator,
                            dataURL = 'data:application/vnd.ms-excel;charset=utf-16,' +
                                encodeURIComponent($rows.map(function (i, val) {
                                    var $cols = $(val).find('th, td');
                                    return $cols.map(function (i, val) {
                                        return $(val).html()
                                    }).get().join(colD);
                                }).get().join(rdel)),
                            myFile = name + ".xls",
                            myContent = $.fn.tableExport.xls.buttonContent,
                            myClass = $.fn.tableExport.xls.defaultClass;
                        createButton(dataURL, myFile, myContent, myClass);
                    },
                    csv: function (rdel, name) {
                        rdel = '"' + rdel + '"';
                        var colD = '"' + $.fn.tableExport.csv.separator + '"',
                            dataURL = 'data:text/csv;charset=utf-16,' +
                                encodeURIComponent('"' + $rows.map(function (i, val) {
                                        var $cols = $(val).find('th, td');
                                        return $cols.map(function (i, val) {
                                            return $(val).text().replace(/"/g, '""')
                                        }).get().join(colD);
                                    }).get().join(rdel) + '"'),
                            myFile = name + ".csv",
                            myContent = $.fn.tableExport.csv.buttonContent,
                            myClass = $.fn.tableExport.csv.defaultClass;
                        createButton(dataURL, myFile, myContent, myClass);
                    },
                    txt: function (rdel, name) {
                        var colD = $.fn.tableExport.txt.separator,
                            dataURL = 'data:text/plain;charset=utf-16,' +
                                encodeURIComponent($rows.map(function (i, val) {
                                    var $cols = $(val).find('th, td');
                                    return $cols.map(function (i, val) {
                                        return $(val).text()
                                    }).get().join(colD);
                                }).get().join(rdel)),
                            myFile = name + ".txt",
                            myContent = $.fn.tableExport.txt.buttonContent,
                            myClass = $.fn.tableExport.txt.defaultClass;
                        createButton(dataURL, myFile, myContent, myClass);
                    }
                };

            settings.formats.forEach(
                function (key) {
                    exporters[key](rowD, fileName);
                }
            );

            function checkCaption(exportButton) {
                var $caption = $el.find('caption:not(.head)');
                $caption.length ? $caption.append(exportButton) : $el.prepend('<caption class="' + bootstrapSpacing + settings.position + '">' + exportButton + '</caption>');
            }

            function createButton(dataURL, myFile, myContent, myClass) {
                var exportButton = "<a href='" + dataURL + "' download='" + myFile + "' role='button' class='" + bootstrapClass + bootstrapTheme + myClass + "'>" + myContent + "</a>";
                checkCaption(exportButton);
            }

            function createObjButton(dataObject, myFile, myContent, myClass) {
                var exportButton = "<a href='#' data-obj='" + dataObject + "' download='" + myFile + "' role='button' class='" + bootstrapClass + bootstrapTheme + myClass + "'>" + myContent + "</a>";
                checkCaption(exportButton);
                addListener(myClass)
            }

            function addListener(el) {
                var $el = "." + el;
                return $($el).on("click", function (e) {
                    if ($(this).data("obj")) {
                        e.preventDefault();
                        var object = $(this).data("obj"),
                            data = object.data,
                            fileName = object.name;
                        export2xlsx(data, fileName);
                    }
                });
            }

        });
    };

    // Define the plugin default properties.
    $.fn.tableExport.defaults = {
        headings: true,                           // (Boolean), display table headings (th elements) in the first row, (default: true)
        formats: ["xls", "csv", "txt"],           // (String[]), filetype for the export, (default: ["xls", "csv", "txt"])
        fileName: "id",                           // (id, String), filename for the downloaded file, (default: "id")
        bootstrap: true,                          // (Boolean), style buttons using bootstrap, (default: true)
        position: "bottom"                        // (top, bottom), position of the caption element relative to table, (default: "bottom")
    };

    $.fn.tableExport.xlsx = {
        defaultClass: "xlsx",
        buttonContent: "Export to xlsx"
    };

    $.fn.tableExport.xls = {
        defaultClass: "xls",
        buttonContent: "Export to xls",
        separator: "\t"
    };

    $.fn.tableExport.csv = {
        defaultClass: "csv",
        buttonContent: "Export to csv",
        separator: ","
    };

    $.fn.tableExport.txt = {
        defaultClass: "txt",
        buttonContent: "Export to txt",
        separator: "  "
    };

    $.fn.tableExport.defaultFileName = "myDownload";

    $.fn.tableExport.defaultButton = "button-default";

    $.fn.tableExport.bootstrap = ["btn", "btn-default", "btn-toolbar"];

    $.fn.tableExport.rowDel = "\r\n";

    function dateNum(v, date1904) {
        if (date1904) v += 1462;
        var epoch = Date.parse(v);
        return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
    }

    function createSheet(data, opts) {
        var ws = {};
        var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};
        for (var R = 0; R != data.length; ++R) {
            for (var C = 0; C != data[R].length; ++C) {
                if (range.s.r > R) range.s.r = R;
                if (range.s.c > C) range.s.c = C;
                if (range.e.r < R) range.e.r = R;
                if (range.e.c < C) range.e.c = C;
                var cell = {v: data[R][C]};
                if (cell.v == null) continue;
                var cell_ref = XLSX.utils.encode_cell({c: C, r: R});

                if (typeof cell.v === 'number') cell.t = 'n';
                else if (typeof cell.v === 'boolean') cell.t = 'b';
                else if (cell.v instanceof Date) {
                    cell.t = 'n';
                    cell.z = XLSX.SSF._table[14];
                    cell.v = dateNum(cell.v);
                }
                else cell.t = 's';

                ws[cell_ref] = cell;
            }
        }
        if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
        return ws;
    }

    function Workbook() {
        if (!(this instanceof Workbook)) return new Workbook();
        this.SheetNames = [];
        this.Sheets = {};
    }

    function string2ArrayBuffer(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    function export2xlsx(data, name) {
        var wb = new Workbook(),
            ws = createSheet(data);

        wb.SheetNames.push(name);
        wb.Sheets[name] = ws;

        var wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'};
        var wbout = XLSX.write(wb, wopts);

        saveAs(new Blob([string2ArrayBuffer(wbout)],
            {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),
            name + ".xlsx");
    }
}(window));