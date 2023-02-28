/* ===========================================================
 * trumbowyg.table.js v3.0
 * Table plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Alexandre Demode (Alex-D)
 *          Twitter : @AlexandreDemode
 *          Website : alex-d.fr
 * Original Author : Sven Dunemann [dunemann@forelabs.eu]
 */

(function ($) {
    'use strict';

    var defaultOptions = {
        rows: 8,
        columns: 8,
        allowHorizontalResize: true,
        colorList: [
            'ffffff', '000000', 'eeece1', '1f497d', '4f81bd', 'c0504d', '9bbb59', '8064a2', '4bacc6', 'f79646', 'ffff00',
            'f2f2f2', '7f7f7f', 'ddd9c3', 'c6d9f0', 'dbe5f1', 'f2dcdb', 'ebf1dd', 'e5e0ec', 'dbeef3', 'fdeada', 'fff2ca',
            'd8d8d8', '595959', 'c4bd97', '8db3e2', 'b8cce4', 'e5b9b7', 'd7e3bc', 'ccc1d9', 'b7dde8', 'fbd5b5', 'ffe694',
            'bfbfbf', '3f3f3f', '938953', '548dd4', '95b3d7', 'd99694', 'c3d69b', 'b2a2c7', 'b7dde8', 'fac08f', 'f2c314',
            'a5a5a5', '262626', '494429', '17365d', '366092', '953734', '76923c', '5f497a', '92cddc', 'e36c09', 'c09100',
            '7f7f7f', '0c0c0c', '1d1b10', '0f243e', '244061', '632423', '4f6128', '3f3151', '31859b', '974806', '7f6000'
        ],
        backgroundColorList: null, // fallbacks on colorList
        allowCustomBackgroundColor: true,
        displayBackgroundColorsAsList: false,
        borderColorList: null, // fallbacks on colorList
        allowCustomBorderColor: true,
        displayBorderColorsAsList: false,
        dropdown: [
            {
                title: 'tableRows',
                buttons: [
                    'tableAddHeaderRow',
                    'tableAddRowAbove',
                    'tableAddRow',
                    'tableDeleteRow',
                ],
            },
            {
                title: 'tableColumns',
                buttons: [
                    'tableAddColumnLeft',
                    'tableAddColumn',
                    'tableDeleteColumn',
                ],
            },
            {
                title: 'tableVerticalAlign',
                buttons: [
                    'tableVerticalAlignTop',
                    'tableVerticalAlignMiddle',
                    'tableVerticalAlignBottom',
               ],
            },
            {
                title: 'tableOthers',
                buttons: [
                    // Cell merge/split
                    'tableMergeCells',
                    'tableUnmergeCells',
                    'tableDestroy',
                ]
            }
        ],
    };

    function ucFirst(value) {
        return value[0].toUpperCase() + value.slice(1);
    }

    function hex(x) {
        return ('0' + parseInt(x).toString(16)).slice(-2);
    }

    function colorToHex(rgb) {
        if (rgb.search('rgb') === -1) {
            return rgb.replace('#', '');
        } else if (rgb === 'rgba(0, 0, 0, 0)') {
            return 'transparent';
        } else {
            rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d?(.\d+)))?\)$/);
            if (rgb == null) {
                return 'transparent'; // No match, return transparent as unkown color
            }
            return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }
    }

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                table: 'Insert table',
                tableRows: 'Rows',
                tableColumns: 'Columns',
                tableVerticalAlign: 'Vertical align',
                tableOthers: 'Others',
                tableAddHeaderRow: 'Insert head row',
                tableAddRowAbove: 'Insert row above',
                tableAddRow: 'Insert row below',
                tableAddColumnLeft: 'Insert column to the left',
                tableAddColumn: 'Insert column to the right',
                tableDeleteRow: 'Delete row',
                tableDeleteColumn: 'Delete column',
                tableDestroy: 'Delete table',
                tableMergeCells: 'Merge cells',
                tableUnmergeCells: 'Unmerge cells',
                tableVerticalAlignTop: 'Align text to top',
                tableVerticalAlignMiddle: 'Center text vertically',
                tableVerticalAlignBottom: 'Align text to bottom',
                tableCellBackgroundColor: 'Cell background color'
            },
            az: {
                table: 'Cədvəl yerləşdir',
                tableAddRow: 'Sətir əlavə et',
                tableAddRowAbove: 'Yuxarı sətir əlavə et',
                tableAddColumnLeft: 'Sola sütun əlavə et',
                tableAddColumn: 'Sağa sütun əlavə et',
                tableDeleteRow: 'Sətri sil',
                tableDeleteColumn: 'Sütunu sil',
                tableDestroy: 'Cədvəli sil',
            },
            ca: {
                table: 'Inserir taula',
                tableAddRow: 'Afegir fila',
                tableAddRowAbove: 'Afegir fila a dalt',
                tableAddColumnLeft: 'Afegir columna a l\'esquerra',
                tableAddColumn: 'Afegir columna a la dreta',
                tableDeleteRow: 'Esborrar fila',
                tableDeleteColumn: 'Esborrar columna',
                tableDestroy: 'Esborrar taula',
                error: 'Error'
            },
            cs: {
                table: 'Vytvořit příkaz Table',
                tableAddRow: 'Přidat řádek',
                tableAddRowAbove: 'Přidat řádek',
                tableAddColumnLeft: 'Přidat sloupec',
                tableAddColumn: 'Přidat sloupec',
            },
            da: {
                table: 'Indsæt tabel',
                tableAddRow: 'Tilføj række',
                tableAddRowAbove: 'Tilføj række',
                tableAddColumnLeft: 'Tilføj kolonne',
                tableAddColumn: 'Tilføj kolonne',
                tableDeleteRow: 'Slet række',
                tableDeleteColumn: 'Slet kolonne',
                tableDestroy: 'Slet tabel',
            },
            de: {
                table: 'Tabelle einfügen',
                tableAddRow: 'Zeile hinzufügen',
                tableAddRowAbove: 'Zeile hinzufügen',
                tableAddColumnLeft: 'Spalte hinzufügen',
                tableAddColumn: 'Spalte hinzufügen',
                tableDeleteRow: 'Zeile löschen',
                tableDeleteColumn: 'Spalte löschen',
                tableDestroy: 'Tabelle löschen',
            },
            et: {
                table: 'Sisesta tabel',
                tableAddRow: 'Lisa rida',
                tableAddRowAbove: 'Lisa rida üles',
                tableAddColumnLeft: 'Lisa tulp vasakule',
                tableAddColumn: 'Lisa tulp paremale',
                tableDeleteRow: 'Kustuta rida',
                tableDeleteColumn: 'Kustuta tulp',
                tableDestroy: 'Kustuta tabel',
            },
            fr: {
                table: 'Insérer un tableau',
                tableRows: 'Lignes',
                tableColumns: 'Colonnes',
                tableVerticalAlign: 'Alignement vertical',
                tableOthers: 'Autres',
                tableAddHeaderRow: 'Insérer une line d\'en-tête',
                tableAddRowAbove: 'Insérer une ligne au dessus',
                tableAddRow: 'Insérer une ligne en dessous',
                tableAddColumnLeft: 'Insérer une colonne à gauche',
                tableAddColumn: 'Insérer une colonne à droite',
                tableDeleteRow: 'Supprimer la ligne',
                tableDeleteColumn: 'Supprimer la colonne',
                tableDestroy: 'Supprimer le tableau',
                tableMergeCells: 'Fusionner les cellules',
                tableUnmergeCells: 'Dissocier les cellules',
                tableVerticalAlignTop: 'Aligner en haut',
                tableVerticalAlignMiddle: 'Aligner au milieu',
                tableVerticalAlignBottom: 'Aligner en bas',
                tableCellBackgroundColor: 'Couleur de fond des cellules',
                tableBorderColor: 'Couleur de la bordure du tableau'
            },
            hu: {
                table: 'Táblázat beszúrás',
                tableAddRow: 'Sor hozzáadás',
                tableAddRowAbove: 'Sor beszúrás fönt',
                tableAddColumnLeft: 'Sor beszúrás balra',
                tableAddColumn: 'Sor beszúrás jobbra',
                tableDeleteRow: 'Sor törlés',
                tableDeleteColumn: 'Oszlop törlés',
                tableDestroy: 'Táblázat törlés',
            },
            id: {
                table: 'Sisipkan tabel',
                tableAddRow: 'Sisipkan baris',
                tableAddRowAbove: 'Sisipkan baris',
                tableAddColumnLeft: 'Sisipkan kolom',
                tableAddColumn: 'Sisipkan kolom',
                tableDeleteRow: 'Hapus baris',
                tableDeleteColumn: 'Hapus kolom',
                tableDestroy: 'Hapus tabel',
            },
            ja: {
                table: '表の挿入',
                tableAddRow: '行の追加',
                tableAddRowAbove: '行の追加',
                tableAddColumnLeft: '列の追加',
                tableAddColumn: '列の追加',
            },
            ko: {
                table: '표 넣기',
                tableAddRow: '줄 추가',
                tableAddRowAbove: '줄 추가',
                tableAddColumnLeft: '칸 추가',
                tableAddColumn: '칸 추가',
                tableDeleteRow: '줄 삭제',
                tableDeleteColumn: '칸 삭제',
                tableDestroy: '표 지우기',
            },
            pt_br: {
                table: 'Inserir tabela',
                tableAddRow: 'Adicionar linha',
                tableAddRowAbove: 'Adicionar linha',
                tableAddColumnLeft: 'Adicionar coluna',
                tableAddColumn: 'Adicionar coluna',
                tableDeleteRow: 'Deletar linha',
                tableDeleteColumn: 'Deletar coluna',
                tableDestroy: 'Deletar tabela',
            },
            ru: {
                table: 'Вставить таблицу',
                tableAddRow: 'Добавить строку',
                tableAddRowAbove: 'Добавить строку',
                tableAddColumnLeft: 'Добавить столбец',
                tableAddColumn: 'Добавить столбец',
                tableDeleteRow: 'Удалить строку',
                tableDeleteColumn: 'Удалить столбец',
                tableDestroy: 'Удалить таблицу',
            },
            sl: {
                table: 'Dodaj tabelo',
                tableAddRow: 'Dodaj vrstico',
                tableAddRowAbove: 'Vrini vrstico',
                tableAddColumnLeft: 'Vrini stolpec',
                tableAddColumn: 'Dodaj stolpec',
                tableDeleteRow: 'Izbriši vrstico',
                tableDeleteColumn: 'Izbriši stolpec',
                tableDestroy: 'Izbriši tabelo',
            },
            sk: {
                table: 'Vytvoriť tabuľky',
                tableAddRow: 'Pridať riadok',
                tableAddRowAbove: 'Pridať riadok',
                tableAddColumnLeft: 'Pridať stĺpec',
                tableAddColumn: 'Pridať stĺpec',
            },
            tr: {
                table: 'Tablo ekle',
                tableAddRow: 'Satır ekle',
                tableAddRowAbove: 'Yukarıya satır ekle',
                tableAddColumnLeft: 'Sola sütun ekle',
                tableAddColumn: 'Sağa sütun ekle',
                tableDeleteRow: 'Satırı sil',
                tableDeleteColumn: 'Sütunu sil',
                tableDestroy: 'Tabloyu sil',
            },
            zh_tw: {
                table: '插入表格',
                tableAddRow: '加入行',
                tableAddRowAbove: '加入行',
                tableAddColumnLeft: '加入列',
                tableAddColumn: '加入列',
                tableDeleteRow: '刪除行',
                tableDeleteColumn: '刪除列',
                tableDestroy: '刪除表格',
            },
            es: {
                table: 'Insertar tabla',
                tableAddRow: 'Agregar fila',
                tableAddRowAbove: 'Agregar fila arriba',
                tableAddColumnLeft: 'Agregar columna a la izquierda',
                tableAddColumn: 'Agregar columna a la derecha',
                tableDeleteRow: 'Borrar fila',
                tableDeleteColumn: 'Borrar columna',
                tableDestroy: 'Borrar tabla',
            }// jshint camelcase:true
        },

        plugins: {
            table: {
                // jshint maxstatements:false
                init: function (t) {
                    t.o.plugins.table = $.extend(true, {}, defaultOptions, t.o.plugins.table || {});

                    // State
                    var tableSelectedCells;

                    ////////////////////////////////////////////////////
                    // Dropdown

                    var buildButtonDef = {
                        fn: function () {
                            t.saveRange();

                            var btnName = 'table';

                            var dropdownPrefix = t.o.prefix + 'dropdown',
                                dropdownOptions = { // the dropdown
                                    class: dropdownPrefix + '-' + btnName + ' ' + dropdownPrefix + ' ' + t.o.prefix + 'fixed-top'
                                };
                            dropdownOptions['data-' + dropdownPrefix] = btnName;
                            var $dropdown = $('<div/>', dropdownOptions);

                            if (t.$box.find('.' + dropdownPrefix + '-' + btnName).length === 0) {
                                t.$box.append($dropdown.hide());
                            } else {
                                $dropdown = t.$box.find('.' + dropdownPrefix + '-' + btnName);
                            }

                            // clear dropdown
                            $dropdown.html('');

                            // when active table show AddRow / AddColumn
                            if (t.$box.find('.' + t.o.prefix + 'table-button').hasClass(t.o.prefix + 'active-button')) {
                                var $table = $(t.doc.getSelection().anchorNode).closest('table');
                                var tableState = getTableState($table);
                                var hasSelectedCells = tableSelectedCells !== undefined;
                                $(t.o.plugins.table.dropdown).each(function (_, buttonGroup) {
                                    $dropdown.append($('<div/>', {
                                        html: t.lang[buttonGroup.title] ? t.lang[buttonGroup.title] : buttonGroup.title,
                                        class: t.o.prefix + 'table-dropdown-title'
                                    })).text();
                                    var $buttonGroup = $('<div/>', {
                                        class: t.o.prefix + 'dropdown-button-group'
                                    });

                                    $(buttonGroup.buttons).each(function (_, buttonName) {
                                        // Conditional thead button
                                        if (buttonName === 'tableAddHeaderRow') {
                                            var hasThead = $('thead', $table).length !== 0;
                                            if (hasThead) {
                                                return;
                                            }
                                        }

                                        // Conditional merge button
                                        if (buttonName === 'tableMergeCells' && !hasSelectedCells) {
                                            return;
                                        }

                                        // Conditional unmerge button
                                        if (buttonName === 'tableUnmergeCells') {
                                            var hasAtLeastOneMergedCell = false;
                                            foreachSelectedCell(function ($cell) {
                                                var isMergedCell = $cell.is('[colspan]') || $cell.is('[rowspan]');
                                                hasAtLeastOneMergedCell = hasAtLeastOneMergedCell || isMergedCell;
                                            }, tableState);
                                            if (!hasAtLeastOneMergedCell) {
                                                return;
                                            }
                                        }

                                        $buttonGroup.append(t.buildSubBtn(buttonName));
                                    });

                                    $dropdown.append($buttonGroup);
                                });
                            } else {
                                var $tableSelect = $('<table/>');
                                $('<tbody/>').appendTo($tableSelect);
                                for (var i = 0; i < t.o.plugins.table.rows; i += 1) {
                                    var row = $('<tr/>').appendTo($tableSelect);
                                    for (var j = 0; j < t.o.plugins.table.columns; j += 1) {
                                        $('<td/>').appendTo(row);
                                    }
                                }
                                $tableSelect.find('td').on('mouseover', toggleActiveDropdownCells);
                                $tableSelect.find('td').on('mousedown', tableBuild);

                                $dropdown.append($tableSelect);
                                $dropdown.append($('<div class="trumbowyg-table-size">1x1</div>'));
                            }

                            t.dropdown(btnName);
                        },
                        class: t.o.prefix + 'open-dropdown'
                    };

                    var toggleActiveDropdownCells = function (columnEvent) {
                        var column = $(columnEvent.target),
                            table = column.closest('table'),
                            colIndex = this.cellIndex,
                            rowIndex = this.parentNode.rowIndex;

                        // reset all columns
                        table.find('td').removeClass('active');

                        for (var i = 0; i <= rowIndex; i += 1) {
                            for (var j = 0; j <= colIndex; j += 1) {
                                table.find('tr:nth-of-type(' + (i + 1) + ')').find('td:nth-of-type(' + (j + 1) + ')').addClass('active');
                            }
                        }

                        // set label
                        table.next('.trumbowyg-table-size').html((colIndex + 1) + 'x' + (rowIndex + 1));
                    };

                    var applyTagClassesToElement = function (element) {
                        var tagClasses = t.o.tagClasses[element.tagName.toLowerCase()];
                        if (!tagClasses) {
                            return;
                        }
                        $(element).addClass(tagClasses);
                    };
                    var applyTagClasses = function ($table) {
                        applyTagClassesToElement($table[0]);
                        $('*', $table).each(function (_, element) {
                            applyTagClassesToElement(element);
                        });
                    };
                    var tableBuild = function () {
                        t.saveRange();

                        var $newTable = $('<table/>');

                        // Build thead
                        var $thead = $('<thead/>');
                        var $theadTr = $('<tr/>');
                        $theadTr.appendTo($thead);
                        for (var th = 0; th <= this.cellIndex; th += 1) {
                            $('<th/>', {scope: 'col'}).appendTo($theadTr);
                        }
                        $thead.appendTo($newTable);

                        // Build tbody
                        var $tbody = $('<tbody/>');

                        var colIndex = this.cellIndex,
                            rowIndex = this.parentNode.rowIndex;

                        for (var i = 0; i <= rowIndex; i += 1) {
                            var row = $('<tr/>').appendTo($tbody);
                            for (var j = 0; j <= colIndex; j += 1) {
                                $('<td/>').appendTo(row);
                            }
                        }

                        $tbody.appendTo($newTable);

                        // Apply tag classes
                        applyTagClasses($newTable);

                        // Find first parent element
                        var rangeNode = t.range.endContainer;
                        while (rangeNode.nodeType !== Node.ELEMENT_NODE) {
                            rangeNode = rangeNode.parentNode;
                        }

                        // Put range after the parent of the selected element
                        if (rangeNode !== t.$ed[0]) {
                            t.range.setEndAfter(rangeNode);
                        }

                        // Insert table after the range
                        t.range.collapse();
                        t.range.insertNode($newTable[0]);

                        // Remove empty paragraph
                        if (rangeNode.nodeName === 'P' && rangeNode.textContent.trim().length === 0) {
                            rangeNode.remove();
                        }

                        t.syncCode();

                        rebuildResizeLayers();
                    };

                    var getTableState = function ($table) {
                        var $tableRows = $('tr', $table);
                        var tableState = [];
                        for (var i = 0; i < $tableRows.length; i += 1) {
                            tableState.push([]);
                        }

                        $tableRows.each(function (rowIndex, row) {
                            var columnIndex = 0;
                            $('td, th', $(row)).each(function (cellIndex, cell) {
                                var $cell = $(cell);
                                var colspanAttr = $cell.attr('colspan');
                                var rowspanAttr = $cell.attr('rowspan');
                                var colspan = parseInt(colspanAttr ? colspanAttr : 1, 10);
                                var rowspan = parseInt(rowspanAttr ? rowspanAttr : 1, 10);

                                while (tableState[rowIndex][columnIndex] !== undefined) {
                                    columnIndex += 1;
                                }

                                tableState[rowIndex][columnIndex] = {
                                    tag: cell.tagName,
                                    element: cell,
                                    colspan: colspan,
                                    rowspan: rowspan,
                                };

                                for (var cols = 1; cols < colspan; cols += 1) {
                                    tableState[rowIndex][columnIndex + cols] = {
                                        mergedIn: [rowIndex, columnIndex]
                                    };
                                }

                                for (var rows = 1; rows < rowspan; rows += 1) {
                                    tableState[rowIndex + rows][columnIndex] = {
                                        mergedIn: [rowIndex, columnIndex]
                                    };

                                    for (var colsInRow = 1; colsInRow < colspan; colsInRow += 1) {
                                        tableState[rowIndex + rows][columnIndex + colsInRow] = {
                                            mergedIn: [rowIndex, columnIndex]
                                        };
                                    }
                                }

                                columnIndex += colspan;
                            });
                        });

                        return tableState;
                    };


                    ////////////////////////////////////////////////////
                    // Buttons

                    var tableButtonAction = function (callback) {
                        return function () {
                            t.saveRange();

                            var node = t.doc.getSelection().anchorNode;
                            var $table = $(node).closest('table');

                            if ($table.length === 0) {
                                return;
                            }

                            if (node.tagName === 'TR') {
                                node = $('td, th', node)[0];
                            }
                            var $focusedRow = $(node).closest('tr');

                            var tableState = getTableState($table);

                            callback($table, $focusedRow, node, tableState);

                            t.syncCode();
                        };
                    };


                    ////// Rows

                    var addRowButtonAction = function (isBefore = false) {
                        return tableButtonAction(function ($table, $focusedRow, node, tableState) {
                            var $rows = $('tr', $table);
                            var $newRow = $('<tr/>');

                            // Shift one row before if insert before
                            var focusedRowIndex = $rows.index($focusedRow);
                            if (isBefore) {
                                focusedRowIndex = Math.max(0, focusedRowIndex - 1);
                                $focusedRow = $($rows[focusedRowIndex]);
                            } else {
                                var rawCellRowspan = $(node).closest('td, th').attr('rowspan');
                                var cellRowspan = parseInt(rawCellRowspan ? rawCellRowspan : 1, 10);
                                focusedRowIndex += cellRowspan - 1;
                                $focusedRow = $($rows[focusedRowIndex]);
                            }

                            // Cannot add line to thead, so move to first tbody row
                            var $tbodyRows = $('tbody tr', $table);
                            var isFocusInHead = $focusedRow.closest('thead').length !== 0;
                            if (isFocusInHead) {
                                $focusedRow = $tbodyRows.first();
                            }

                            // add columns according to current columns count
                            var focusedRowState = tableState[focusedRowIndex];
                            var nextRowState = tableState[focusedRowIndex + 1];
                            var columnCount = tableState[0].length;
                            for (var columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
                                if (nextRowState !== undefined) {
                                    var originCellState = focusedRowState[columnIndex];
                                    var originCellMergedInState = getCellState(tableState, originCellState.mergedIn);
                                    var nextCellState = nextRowState[columnIndex];
                                    var nextCellMergedInState = getCellState(tableState, nextCellState.mergedIn);

                                    var realOriginCellState = originCellState.element ? originCellState : originCellMergedInState;
                                    var originCellElement = realOriginCellState.element;
                                    var nextCellElement = nextCellState.element ? nextCellState.element : nextCellMergedInState.element;

                                    if (originCellElement === nextCellElement) {
                                        originCellElement.setAttribute('rowspan', realOriginCellState.rowspan + 1);

                                        continue;
                                    }
                                }

                                $('<td/>').appendTo($newRow);
                            }

                            // add row to table
                            if (focusedRowIndex === 0 && (isBefore || isFocusInHead)) {
                                $focusedRow.before($newRow);
                            } else {
                                $focusedRow.after($newRow);
                            }

                            applyTagClasses($table);
                            rebuildResizeLayers();
                        });
                    };

                    var addRowAbove = {
                        title: t.lang.tableAddRowAbove,
                        text: t.lang.tableAddRowAbove,
                        ico: 'row-above',

                        fn: addRowButtonAction(true),
                    };

                    var addRowBelow = {
                        title: t.lang.tableAddRow,
                        text: t.lang.tableAddRow,
                        ico: 'row-below',

                        fn: addRowButtonAction(false),
                    };

                    var addHeaderRow = {
                        title: t.lang.tableAddHeaderRow,
                        text: t.lang.tableAddHeaderRow,
                        ico: 'header-row',

                        fn: tableButtonAction(function ($table, $focusedRow, node, tableState) {
                            var hasThead = $('thead', $table).length !== 0;
                            if (hasThead) {
                                return false;
                            }

                            var columnCount = tableState[0].length;

                            var $thead = $('<thead/>');
                            var $theadRow = $('<tr/>').appendTo($thead);

                            // add columns according to current columns count
                            for (var columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
                                $('<th/>').appendTo($theadRow);
                            }

                            // add thead to table
                            $table.prepend($thead);

                            applyTagClasses($table);
                            rebuildResizeLayers();
                        }),
                    };


                    ////// Columns

                    var addColumnButtonAction = function (isBefore = false) {
                        return tableButtonAction(function ($table, $focusedRow, node, tableState) {
                            var $rows = $('tr', $table);
                            var focusedRowIndex = $rows.index($focusedRow);
                            var focusedRowState = tableState[focusedRowIndex];
                            var $focusedCell = $(node).closest('td, th');

                            // Shift one column before if insert before
                            var cellIndex = getCellIndex($focusedCell[0], focusedRowState);
                            if (isBefore) {
                                cellIndex = Math.max(0, cellIndex - 1);
                            } else {
                                var rawCellColspan = $focusedCell.attr('colspan');
                                var cellColspan = parseInt(rawCellColspan ? rawCellColspan : 1, 10);
                                cellIndex += cellColspan - 1;
                            }

                            // add a cell to each row
                            var rowCount = tableState.length;
                            var mustInsertBefore = isBefore && cellIndex === 0;
                            for (var rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
                                var rowState = tableState[rowIndex];
                                var nextCellState = mustInsertBefore ? undefined : rowState[cellIndex + 1];
                                if (nextCellState !== undefined) {
                                    var originCellState = rowState[cellIndex];
                                    var originCellMergedInState = getCellState(tableState, originCellState.mergedIn);
                                    var nextCellMergedInState = getCellState(tableState, nextCellState.mergedIn);

                                    var realOriginCellState = originCellState.element ? originCellState : originCellMergedInState;
                                    var originCellElement = realOriginCellState.element;
                                    var nextCellElement = nextCellState.element ? nextCellState.element : nextCellMergedInState.element;

                                    if (originCellElement === nextCellElement) {
                                        originCellElement.setAttribute('colspan', realOriginCellState.colspan + 1);

                                        continue;
                                    }
                                }

                                // Get previous real cell state
                                var previousRealCellState;
                                var previousColumnShift = 0;
                                do {
                                    var newIndex = cellIndex - previousColumnShift;
                                    if (newIndex < 0) {
                                        break;
                                    }

                                    previousRealCellState = rowState[newIndex];
                                    previousColumnShift += 1;
                                } while (previousRealCellState.mergedIn !== undefined);

                                // Create and append the cell next to the previous
                                var $previousCell = previousRealCellState.element;
                                var newCellElement = t.doc.createElement($previousCell.tagName);
                                if (cellIndex === 0 && isBefore) {
                                    $previousCell.before(newCellElement);
                                } else {
                                    $previousCell.after(newCellElement);
                                }
                            }

                            applyTagClasses($table);
                            rebuildResizeLayers();
                        });
                    };

                    var addColumnLeft = {
                        title: t.lang.tableAddColumnLeft,
                        text: t.lang.tableAddColumnLeft,
                        ico: 'col-left',

                        fn: addColumnButtonAction(true)
                    };

                    var addColumnRight = {
                        title: t.lang.tableAddColumn,
                        text: t.lang.tableAddColumn,
                        ico: 'col-right',

                        fn: addColumnButtonAction(false)
                    };


                    ////// Delete

                    var destroy = {
                        title: t.lang.tableDestroy,
                        text: t.lang.tableDestroy,
                        ico: 'table-delete',

                        fn: tableButtonAction(function ($table) {
                            $table.remove();
                        })
                    };

                    var deleteRow = {
                        title: t.lang.tableDeleteRow,
                        text: t.lang.tableDeleteRow,
                        ico: 'row-delete',

                        fn: tableButtonAction(function ($table, $focusedRow, node, tableState) {
                            // Only one row is remaining in the table, remove the table
                            if ($('tbody tr', $table).length === 1) {
                                $table.remove();
                                return;
                            }

                            // Pick element to remove
                            var $elementToRemove = $focusedRow;
                            var $focusedRowParent = $focusedRow.parent();
                            if ($focusedRowParent.is('thead')) {
                                $elementToRemove = $focusedRowParent;
                            }

                            // Manage merged cells
                            var $rows = $('tr', $table);
                            var rowIndex = $rows.index($(node).closest('tr'));
                            for (var y = 0; y < tableState[0].length; y += 1) {
                                var cellState = getCellState(tableState, [rowIndex, y], false);

                                if (cellState.rowspan === 1) {
                                    continue;
                                }

                                var originCellState = getCellState(tableState, [rowIndex, y]);
                                originCellState.element.setAttribute('rowspan', originCellState.rowspan - 1);

                                // If origin cell is not in this row, continue
                                if (cellState.mergedIn !== undefined) {
                                    continue;
                                }

                                // If origin cell is in this row, move it to the next row
                                var originCellIndex = getCellIndex(cellState.element, tableState[rowIndex]);
                                if (originCellIndex === 0) {
                                    $($rows[rowIndex + 1]).prepend(originCellState.element);
                                    continue;
                                }
                                var nextRowPreviousColumnCellState = getCellState(tableState, [
                                    rowIndex + 1,
                                    originCellIndex - 1
                                ]);
                                $(nextRowPreviousColumnCellState.element).after(originCellState.element);
                            }

                            $elementToRemove.remove();
                            simplifyCells($table);
                            redrawResizeLayers();
                        }),
                    };

                    var deleteColumn = {
                        title: t.lang.tableDeleteColumn,
                        text: t.lang.tableDeleteColumn,
                        ico: 'col-delete',

                        fn: tableButtonAction(function ($table, $focusedRow, node, tableState) {
                            var $rows = $('tr', $table);
                            var rowIndex = $rows.index($(node).closest('tr'));
                            var columnIndex = getCellIndex($(node).closest('td, th')[0], tableState[rowIndex]);

                            for (var x = 0; x < tableState.length; x += 1) {
                                var cellState = getCellState(tableState, [x, columnIndex], false);

                                // Reduce cell colspan by 1
                                if (cellState.colspan > 1) {
                                    var originCellState = getCellState(tableState, [x, columnIndex]);
                                    originCellState.element.setAttribute('colspan', originCellState.colspan - 1);
                                    continue;
                                }

                                // Delete cell if not merged
                                cellState.element.remove();
                            }

                            simplifyCells();
                            redrawResizeLayers();
                        })
                    };


                    ////// Cell merging

                    var getCellState = function (tableState, cellCoordinates, mustGetDeep = true) {
                        if (cellCoordinates === undefined) {
                            return undefined;
                        }

                        var cellState = tableState[cellCoordinates[0]][cellCoordinates[1]];

                        if (mustGetDeep && cellState.mergedIn !== undefined) {
                            cellState = tableState[cellState.mergedIn[0]][cellState.mergedIn[1]];
                        }

                        return cellState;
                    };

                    var canMergeSelectedCells = function (tableState) {
                        if (tableSelectedCells.length === 0) {
                            return false;
                        }

                        // Check that all tags are the same
                        var firstCellStateCoordinates = tableSelectedCells[0];
                        var firstSelectedCellTag = getCellState(tableState, firstCellStateCoordinates).tag;
                        var allTagsAreTheSame = tableSelectedCells.every(function (cellCoordinates) {
                            var cellState = getCellState(tableState, cellCoordinates);

                            return cellState.tag === firstSelectedCellTag;
                        });

                        if (!allTagsAreTheSame) {
                            return false;
                        }

                        // Check that all selected cells make a rectangle
                        var minByRow = [];
                        var maxByRow = [];
                        $(tableSelectedCells).each(function (_, tableSelectedCell) {
                            var y = tableSelectedCell[0];
                            var x = tableSelectedCell[1];
                            var cellState = tableState[y][x];

                            var cellRowspan = cellState.rowspan;
                            var maxRow = y + cellRowspan;

                            for (; y < maxRow; y += 1) {
                                if (minByRow[y] === undefined) {
                                    minByRow[y] = tableState[0].length;
                                }

                                if (maxByRow[y] === undefined) {
                                    maxByRow[y] = 0;
                                }

                                minByRow[y] = Math.min(minByRow[y], x);
                                maxByRow[y] = Math.max(maxByRow[y], x + cellState.colspan);
                            }
                        });

                        if (minByRow.length === 0 || maxByRow.length === 0) {
                            return false;
                        }

                        var allMinAreTheSame = minByRow.every(function (value) {
                            return value === minByRow[minByRow.length - 1];
                        });

                        var allMaxAreTheSame = maxByRow.every(function (value) {
                            return value === maxByRow[maxByRow.length - 1];
                        });

                        return allMinAreTheSame && allMaxAreTheSame;
                    };

                    var findTopLeftCellInSelection = function () {
                        var MAX_VALUE = 999999;
                        var topLeftY = MAX_VALUE;
                        var topLeftX = MAX_VALUE;

                        $(tableSelectedCells).each(function (_, cell) {
                            topLeftY = Math.min(cell[0], topLeftY);
                            topLeftX = Math.min(cell[1], topLeftX);
                        });

                        if (topLeftX === MAX_VALUE || topLeftY === MAX_VALUE) {
                            return undefined;
                        }

                        return [topLeftY, topLeftX];
                    };

                    var simplifyCells = function ($table) {
                        var tableState = getTableState($table);

                        // Remove rowspan if a row is empty
                        var $rows = $('tr', $table);
                        $(tableState).each(function (rowIndex, rowState) {
                            var isRowEmpty = rowState.every(function (cellState) {
                                return cellState.mergedIn !== undefined;
                            });

                            if (!isRowEmpty) {
                                return;
                            }

                            // Reduce by 1 the rowspan on each cell in previous row
                            $(tableState[rowIndex - 1]).each(function (_, cellState) {
                                if (cellState.mergedIn !== undefined) {
                                    cellState = getCellState(tableState, cellState.mergedIn);
                                }
                                cellState.rowspan -= 1;

                                if (cellState.rowspan <= 1) {
                                    cellState.element.removeAttribute('rowspan');
                                    return;
                                }

                                cellState.element.setAttribute('rowspan', cellState.rowspan);
                            });

                            // Remove empty tr
                            $rows[rowIndex].remove();
                        });

                        // Remove empty attributes
                        $('[class=""]', $table).removeAttr('class');
                        $('[style=""]', $table).removeAttr('style');
                    };

                    var mergeCells = {
                        title: t.lang.tableMergeCells,
                        text: t.lang.tableMergeCells,
                        ico: 'table-merge',

                        fn: tableButtonAction(function ($table, $focusedRow, node, tableState) {
                            if (!canMergeSelectedCells(tableState)) {
                                return;
                            }

                            var topLeftCellCoordinates = findTopLeftCellInSelection();
                            if (topLeftCellCoordinates === undefined) {
                                return;
                            }

                            var topLeftCellState = getCellState(tableState, topLeftCellCoordinates);
                            var $topLeftCell = $(topLeftCellState.element);
                            var minY = 999999;
                            var maxY = 0;
                            var minX = 999999;
                            var maxX = 0;
                            $(tableSelectedCells).each(function (_, selectedCell) {
                                var y = selectedCell[0];
                                var x = selectedCell[1];
                                var cellState = tableState[y][x];

                                minY = Math.min(minY, y);
                                maxY = Math.max(maxY, y + cellState.rowspan - 1);
                                minX = Math.min(minX, x);
                                maxX = Math.max(maxX, x + cellState.colspan - 1);

                                if (cellState.element === $topLeftCell[0]) {
                                    return;
                                }

                                cellState.element.remove();
                            });

                            var cellHeight = maxY - minY + 1;
                            var cellWidth = maxX - minX + 1;

                            if (cellHeight > 1) {
                                $topLeftCell.attr('rowspan', cellHeight);
                            }
                            if (cellWidth > 1) {
                                $topLeftCell.attr('colspan', cellWidth);
                            }

                            simplifyCells($table);

                            rebuildResizeLayers();
                        }),
                    };

                    var unmergeCells = {
                        title: t.lang.tableUnmergeCells,
                        text: t.lang.tableUnmergeCells,
                        ico: 'table-unmerge',

                        fn: tableButtonAction(function ($table, $focusedRow, node, tableState) {
                            foreachSelectedCell(function ($cell) {
                                $cell.removeAttr('colspan').removeAttr('rowspan');
                                var $rows = $('tr', $table);

                                var cellRowIndex = $rows.index($cell.closest('tr'));
                                var cellColumnIndex = getCellIndex($cell[0], tableState[cellRowIndex]);
                                var cellState = tableState[cellRowIndex][cellColumnIndex];

                                for (var rowIndex = 0; rowIndex < cellState.rowspan; rowIndex += 1) {
                                    var colIndex = (rowIndex === 0) ? 1 : 0;
                                    var previousCellState = getCellState(tableState, [
                                        cellRowIndex + rowIndex,
                                        cellColumnIndex + colIndex - 1
                                    ]);
                                    var previousCellElement = previousCellState.element;
                                    for (; colIndex < cellState.colspan; colIndex += 1) {
                                        var newCellElement = t.doc.createElement(previousCellElement.tagName);
                                        $(previousCellElement).after(newCellElement);
                                    }
                                }
                            }, tableState);

                            applyTagClasses($table);
                            rebuildResizeLayers();
                        }),
                    };


                    ////// Cell selection

                    var getCellIndex = function (cellElement, rowState) {
                        return rowState.findIndex(function (rowStateCell) {
                            if (rowStateCell.element === undefined) {
                                return false;
                            }

                            return rowStateCell.element === cellElement;
                        });
                    };

                    var resetTableMouseHacks = function () {
                        $('table', t.$ed).off('mousedown.tbwTable');
                        $('table', t.$ed).on('mousedown.tbwTable', function (e) {
                            // Cells drag and drop while changing cell selection
                            t.doc.getSelection().removeAllRanges();

                            // Prevent Ctrl+Click on Firefox
                            if (!e.ctrlKey) {
                                return;
                            }

                            e.preventDefault();
                        });
                    };

                    var tableCellSelectionModeClass = t.o.prefix + 'table-cell-selection-mode';
                    var tableCellSelectedClass = t.o.prefix + 'table-cell-selected';
                    setTimeout(function () { // Wait for init
                        resetTableMouseHacks();
                        t.$c.on('tbwchange.tbwTable', function () {
                            resetTableMouseHacks();
                            rebuildResizeLayers();
                        });

                        rebuildResizeLayers();

                        $(t.doc).on('selectionchange.tbwTable', function () {
                            tableSelectedCells = undefined;

                            var selection = t.doc.getSelection();
                            var rangeCount = selection.rangeCount;

                            var anchorNode = selection.anchorNode;
                            var focusNode = selection.focusNode;

                            // Firefox create one range by cell
                            if (rangeCount > 1) {
                                var firstRange = selection.getRangeAt(0);
                                var lastRange = selection.getRangeAt(rangeCount - 1);

                                anchorNode = firstRange.startContainer.childNodes[firstRange.startOffset];
                                focusNode = lastRange.startContainer.childNodes[lastRange.startOffset];
                            }

                            var $anchorSelectedCell = $(anchorNode).closest('td, th');
                            var $focusSelectedCell = $(focusNode).closest('td, th');

                            var $tableAnchor = $anchorSelectedCell.closest('table');
                            var $tableFocus = $focusSelectedCell.closest('table');

                            $('[class="' + tableCellSelectedClass + '"]', t.$ed).removeAttr('class');
                            $('.' + tableCellSelectedClass, t.$ed).removeClass(tableCellSelectedClass);

                            if (($tableAnchor.length === 0 && $tableFocus.length === 0) ||
                                $tableAnchor[0] !== $tableFocus[0] ||
                                $anchorSelectedCell[0] === $focusSelectedCell[0]
                            ) {
                                $('.' + tableCellSelectionModeClass, t.$ed).removeClass(tableCellSelectionModeClass);
                                return;
                            }

                            // Toggle table to selection mode
                            $tableAnchor.addClass(tableCellSelectionModeClass);

                            // Get table state
                            var tableState = getTableState($tableAnchor);

                            // Find cells to set as selected
                            var $allRows = $('tr', $tableAnchor);

                            var $anchorSelectedRow = $anchorSelectedCell.closest('tr');
                            var anchorSelectedRowIndex = $allRows.index($anchorSelectedRow);
                            var $focusSelectedRow = $focusSelectedCell.closest('tr');
                            var focusSelectedRowIndex = $allRows.index($focusSelectedRow);

                            var anchorSelectedCellIndex = getCellIndex($anchorSelectedCell[0], tableState[anchorSelectedRowIndex]);
                            var focusSelectedCellIndex = getCellIndex($focusSelectedCell[0], tableState[focusSelectedRowIndex]);

                            var firstSelectedRowIndex = Math.min(anchorSelectedRowIndex, focusSelectedRowIndex);
                            var lastSelectedRowIndex = Math.max(anchorSelectedRowIndex, focusSelectedRowIndex);
                            var firstSelectedCellIndex = Math.min(anchorSelectedCellIndex, focusSelectedCellIndex);
                            var lastSelectedCellIndex = Math.max(anchorSelectedCellIndex, focusSelectedCellIndex);

                            // Set cells as selected
                            var selectedCellsCoordinates = [];
                            $allRows.each(function (rowIndex, rowElement) {
                                if (rowIndex < firstSelectedRowIndex || rowIndex > lastSelectedRowIndex) {
                                    return;
                                }

                                $('td, th', rowElement).each(function (_, cellElement) {
                                    var cellIndex = getCellIndex(cellElement, tableState[rowIndex]);
                                    if (cellIndex < firstSelectedCellIndex || cellIndex > lastSelectedCellIndex) {
                                        return;
                                    }

                                    selectedCellsCoordinates.push([rowIndex, cellIndex]);
                                    $(cellElement).addClass(tableCellSelectedClass);
                                });
                            });

                            tableSelectedCells = selectedCellsCoordinates;
                        });
                    });

                    var foreachSelectedCell = function (callback, tableState) {
                        if (tableSelectedCells === undefined) {
                            var $cell = $(t.doc.getSelection().anchorNode).closest('td, th');
                            if ($cell.length === 0) {
                                return;
                            }

                            callback($cell);
                            return;
                        }

                        $(tableSelectedCells).each(function (_, cellCoordinates) {
                            var cellState = getCellState(tableState, cellCoordinates, false);
                            if (cellState.mergedIn !== undefined) {
                                return;
                            }

                            callback($(cellState.element));
                        });
                    };


                    ////// Cell resize

                    var TRUMBOWYG_TABLE_HANDLE_FOR = 'trumbowyg-table-handle-for';
                    var rebuildResizeLayers = function () {
                        if (!t.o.plugins.table.allowHorizontalResize) {
                            return;
                        }

                        var tableState;
                        var targetColumnIndex;
                        var $table;

                        var $resizeLayers = $(t.o.prefix + 'table-resize-layers');
                        var hasResizeLayers = $resizeLayers.length > 0;
                        if (!hasResizeLayers) {
                            $resizeLayers = $('<div/>', {
                                class: t.o.prefix + 'table-resize-layers',
                            }).appendTo(t.$edBox);

                            $(t.o.prefix + 'table-resize-vertical-handle', $resizeLayers).each(function (_, handle) {
                                $(handle)
                                    .off()
                                    .remove();
                            });
                        }

                        $('table', t.$ed).each(function (_tableIndex, table) {
                            $('td, th', $(table)).each(function (_cellIndex, cell) {
                                // Vertical handles
                                $('<div/>', {
                                    class: t.o.prefix + 'table-resize-vertical-handle',
                                })
                                    .prop(TRUMBOWYG_TABLE_HANDLE_FOR, cell)
                                    .on('mousedown.tbwTable', function (e) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        var targetCell = $(e.target).prop(TRUMBOWYG_TABLE_HANDLE_FOR);
                                        $table = $(targetCell).closest('table');
                                        tableState = getTableState($table);
                                        var $allRows = $('tr', $table);
                                        var $row = $(targetCell).closest('tr');
                                        var rowIndex = $allRows.index($row);
                                        var rowState = tableState[rowIndex];
                                        var columnIndex = getCellIndex(targetCell, rowState);
                                        var targetCellState = tableState[rowIndex][columnIndex];
                                        if (targetCellState.mergedIn !== undefined) {
                                            targetCellState = tableState[targetCellState.mergedIn[0]][targetCellState.mergedIn[1]];
                                        }

                                        targetColumnIndex = columnIndex + targetCellState.colspan - 1;

                                        ensureColgroupExists($table, tableState);
                                        setColWidthInPixels($table, tableState);

                                        $table.css({
                                            maxWidth: '',
                                        });
                                    })
                                    .appendTo($resizeLayers);
                            });
                        });
                        redrawResizeLayers();

                        // If resize layer was here
                        // We do not need to add following events
                        if (hasResizeLayers) {
                            return;
                        }

                        $(t.doc)
                            .on('mousemove.tbwTable', function (e) {
                                if (targetColumnIndex === undefined) {
                                    return;
                                }
                                e.preventDefault();
                                e.stopPropagation();

                                var tableRect = $table[0].getBoundingClientRect();
                                var tableLeftInPixels = e.pageX - tableRect.left;

                                var cellState = findFirstCellAtIndex(tableState, targetColumnIndex);

                                var cellElement = cellState.element;
                                var cellRect = cellElement.getBoundingClientRect();
                                var cellLeftInPixels = cellRect.left - tableRect.left;

                                var cellWidthInPixels = tableLeftInPixels - cellLeftInPixels;

                                var colElement = $('col', $table)[targetColumnIndex];
                                $(colElement).css({
                                    width: cellWidthInPixels,
                                });

                                redrawResizeLayers();
                            })
                            .on('mouseup.tbwTable', function (e) {
                                if (targetColumnIndex === undefined) {
                                    return;
                                }
                                e.preventDefault();
                                e.stopPropagation();

                                // Fix width
                                ensureColgroupExists($table, tableState);
                                setColWidthInPercents($table, tableState);

                                // Reset resize state
                                $table = undefined;
                                tableState = undefined;
                                targetColumnIndex = undefined;

                                // Update HTML
                                t.syncCode();
                                redrawResizeLayers();
                            });

                        $(window)
                            .on('resize.tbwTable', function () {
                                redrawResizeLayers();
                            });
                    };

                    var ensureColgroupExists = function ($table, tableState) {
                        var $colgroup = $('colgroup', $table);
                        if ($colgroup.length === 0) {
                            $colgroup = $('<colgroup/>').prependTo($table);
                        }

                        var columnCount = tableState[0].length;
                        var currentColCount = $('col', $colgroup).length;
                        for (; currentColCount < columnCount; currentColCount += 1) {
                            $('<col/>').appendTo($colgroup);
                        }
                    };

                    var findFirstCellAtIndex = function (tableState, cellIndex) {
                        var cellState;
                        var rowIndex = 0;
                        do {
                            cellState = tableState[rowIndex][cellIndex];
                            rowIndex += 1;
                        } while (cellState.element === undefined || cellState.colspan !== 1);

                        return cellState;
                    };

                    var setColWidths = function ($table, tableState, isUnitPercent = false) {
                        var $colgroup = $('colgroup', $table);
                        var $cols = $('col', $colgroup);
                        var tableWidth = $table[0].offsetWidth;
                        $table.css({
                            maxWidth: $table[0].offsetWidth,
                        });

                        var columnCount = tableState[0].length;
                        var colWidths = [];
                        for (var columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
                            var cellElement = findFirstCellAtIndex(tableState, columnIndex).element;
                            var cellWidth = cellElement.getBoundingClientRect().width;

                            if (isUnitPercent) {
                                cellWidth = ((cellWidth / tableWidth) * 100) + '%';
                            }

                            colWidths[columnIndex] = cellWidth;
                        }

                        for (var colIndex = 0; colIndex < columnCount; colIndex += 1) {
                            $($cols[colIndex]).css({
                                width: colWidths[colIndex],
                            });
                        }
                    };

                    var setColWidthInPixels = function ($table, tableState) {
                        setColWidths($table, tableState, false);
                    };

                    var setColWidthInPercents = function ($table, tableState) {
                        setColWidths($table, tableState, true);
                    };

                    var redrawResizeLayers = function () {
                        var $resizeLayers = $('.' + t.o.prefix + 'table-resize-layers', t.$edBox);

                        var resizeLayersBoundingClientRect = $resizeLayers[0].getBoundingClientRect();
                        var resizeLayersTop = resizeLayersBoundingClientRect.top;
                        var resizeLayersLeft = resizeLayersBoundingClientRect.left;

                        $('.' + t.o.prefix + 'table-resize-vertical-handle', $resizeLayers).each(function (_, cellHandle) {
                            var $cellHandle = $(cellHandle);
                            var cell = $cellHandle.prop(TRUMBOWYG_TABLE_HANDLE_FOR);
                            var cellBoundingClientRect = cell.getBoundingClientRect();
                            $cellHandle.css({
                                top: cellBoundingClientRect.top - resizeLayersTop,
                                left: cellBoundingClientRect.left - resizeLayersLeft + cellBoundingClientRect.width,
                                height: cellBoundingClientRect.height,
                            });
                        });
                    };


                    ////// Vertical alignment

                    var tableVerticalAlign = function (alignPosition) {
                        return tableButtonAction(function ($table, $focusedRow, node, tableState) {
                            foreachSelectedCell(function ($cell) {
                                $cell.css({
                                    verticalAlign: alignPosition,
                                });
                            }, tableState);
                        });
                    };

                    var verticalAlignTop = {
                        title: t.lang.tableVerticalAlignTop,
                        text: t.lang.tableVerticalAlignTop,
                        ico: 'align-top',

                        fn: tableVerticalAlign('top'),
                    };

                    var verticalAlignMiddle = {
                        title: t.lang.tableVerticalAlignMiddle,
                        text: t.lang.tableVerticalAlignMiddle,
                        ico: 'align-middle',

                        fn: tableVerticalAlign('middle'),
                    };

                    var verticalAlignBottom = {
                        title: t.lang.tableVerticalAlignBottom,
                        text: t.lang.tableVerticalAlignBottom,
                        ico: 'align-bottom',

                        fn: tableVerticalAlign('bottom'),
                    };


                    ////// Cell Background color

                    var getColorDropdownClass = function (mustDisplayAsList) {
                        return mustDisplayAsList ? t.o.prefix + 'dropdown--color-list' : '';
                    };

                    var buildColorDropdown = function (name, colorList, mustDisplayAsList, allowCustomColor, callback) {
                        var dropdown = [];
                        var trumbowygTableOptions = t.o.plugins.table;

                        $.each(colorList, function (i, color) {
                            var btn = name + color;
                            var btnDef = {
                                fn: callback('#' + color),
                                hasIcon: false,
                                text: t.lang['#' + color] || ('#' + color),
                                style: 'background-color: #' + color + ';'
                            };

                            t.addBtnDef(btn, btnDef);
                            dropdown.push(btn);
                        });

                        // Remove color
                        var removeColorButtonName = 'remove' + ucFirst(name),
                            removeColorBtnDef = {
                                fn: callback(''),
                                hasIcon: false,
                                style: 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAG0lEQVQIW2NkQAAfEJMRmwBYhoGBYQtMBYoAADziAp0jtJTgAAAAAElFTkSuQmCC);'
                            };

                        if (mustDisplayAsList) {
                            removeColorBtnDef.style = '';
                        }

                        t.addBtnDef(removeColorButtonName, removeColorBtnDef);
                        dropdown.push(removeColorButtonName);

                        // Custom color
                        if (trumbowygTableOptions.allowCustomBackgroundColor) {
                            var freeColorBtnDef = {
                                fn: function () {
                                    t.openModalInsert(t.lang.backgroundColor,
                                        {
                                            color: {
                                                label: 'backgroundColor',
                                                forceCss: true,
                                                type: 'color',
                                                value: '#FFFFFF'
                                            }
                                        },
                                        // callback
                                        function (values) {
                                            callback(values.color)();
                                            return true;
                                        }
                                    );
                                },
                                hasIcon: false,
                                text: '#',
                                // style adjust for displaying the text
                                style: 'text-indent: 0; line-height: 20px; padding: 0 5px;'
                            };

                            var freeColorButtonName = 'free' + ucFirst(name);
                            t.addBtnDef(freeColorButtonName, freeColorBtnDef);
                            dropdown.push(freeColorButtonName);
                        }

                        return dropdown;
                    };
                    var applyBackgroundColorToSelectedCells = function (color) {
                        return function () {
                            var $table = $(t.doc.getSelection().anchorNode).closest('table');

                            if ($table.length === 0) {
                                return;
                            }

                            var tableState = getTableState($table);
                            foreachSelectedCell(function ($cell) {
                                $cell.css({
                                    backgroundColor: color,
                                });
                            }, tableState);

                            simplifyCells($table);
                        };
                    };
                    var cellBackgroundColorBtnDef = {
                        dropdown: buildColorDropdown(
                            'tableCellBackgroundColor',
                            t.o.plugins.table.backgroundColorList || t.o.plugins.table.colorList,
                            t.o.plugins.table.displayBackgroundColorsAsList,
                            t.o.plugins.table.allowCustomBackgroundColor,
                            applyBackgroundColorToSelectedCells
                        ),
                        dropdownClass: getColorDropdownClass(t.o.plugins.table.displayBackgroundColorsAsList),
                    };


                    ////// Table border color

                    var applyBorderColor = function (color) {
                        return function () {
                            var $table = $(t.doc.getSelection().anchorNode).closest('table');

                            if ($table.length === 0) {
                                return;
                            }

                            var border = {
                                borderColor: color,
                            };
                            if (parseInt($table.css('border-width'), 10) === 0) {
                                border.borderWidth = '2px';
                                border.borderStyle = 'solid';
                            }

                            if (color === '') {
                                border.borderWidth = '';
                                border.borderStyle = '';
                            }

                            $table.css(border);
                        };
                    };
                    var tableBorderColorBtnDef = {
                        dropdown: buildColorDropdown(
                            'tableBorderColor',
                            t.o.plugins.table.borderColorList || t.o.plugins.table.colorList,
                            t.o.plugins.table.displayBorderColorsAsList,
                            t.o.plugins.table.allowCustomBorderColor,
                            applyBorderColor
                        ),
                        dropdownClass: getColorDropdownClass(t.o.plugins.table.displayBorderColorsAsList),
                    };



                    ////// Register buttons

                    t.addBtnDef('table', buildButtonDef);

                    t.addBtnDef('tableAddHeaderRow', addHeaderRow);

                    t.addBtnDef('tableAddRowAbove', addRowAbove);
                    t.addBtnDef('tableAddRow', addRowBelow);

                    t.addBtnDef('tableAddColumnLeft', addColumnLeft);
                    t.addBtnDef('tableAddColumn', addColumnRight);

                    t.addBtnDef('tableMergeCells', mergeCells);
                    t.addBtnDef('tableUnmergeCells', unmergeCells);

                    t.addBtnDef('tableVerticalAlignTop', verticalAlignTop);
                    t.addBtnDef('tableVerticalAlignMiddle', verticalAlignMiddle);
                    t.addBtnDef('tableVerticalAlignBottom', verticalAlignBottom);

                    t.addBtnDef('tableCellBackgroundColor', cellBackgroundColorBtnDef);
                    t.addBtnDef('tableBorderColor', tableBorderColorBtnDef);

                    t.addBtnDef('tableDeleteRow', deleteRow);
                    t.addBtnDef('tableDeleteColumn', deleteColumn);
                    t.addBtnDef('tableDestroy', destroy);
                },
                destroy: function (t) {
                    $(window)
                        .off('resize.tbwTable');

                    $(t.doc)
                        .off('selectionchange.tbwTable')
                        .off('mousemove.tbwTable')
                        .off('mouseup.tbwTable');

                    t.$c
                        .off('tbwchange.tbwTable');

                    $('table', t.$ed)
                        .off('mousedown.tbwTable');
                },
                tagHandler: function (element, t) {
                    var tags = [];

                    if (element.tagName === 'TABLE') {
                        tags.push('table');

                        var elementBorderColor = element.style.borderColor;
                        if (elementBorderColor !== '') {
                            var borderColor = colorToHex(elementBorderColor);
                            if (t.o.plugins.table.colorList.indexOf(borderColor) >= 0) {
                                tags.push('tableBorderColor' + borderColor);
                            } else {
                                tags.push('freeTableBorderColor');
                            }
                        }
                    }

                    if (!element.style) {
                        return tags;
                    }

                    var elementVerticalAlign = element.style.verticalAlign;
                    if (elementVerticalAlign !== '') {
                        tags.push('tableVerticalAlign' + ucFirst(elementVerticalAlign));
                    }

                    var elementBackgroundColor = element.style.backgroundColor;
                    if ((element.tagName === 'TH' || element.tagName === 'TD') && elementBackgroundColor !== '') {
                        var backgroundColor = colorToHex(elementBackgroundColor);
                        if (t.o.plugins.table.colorList.indexOf(backgroundColor) >= 0) {
                            tags.push('tableCellBackgroundColor' + backgroundColor);
                        } else {
                            tags.push('freeTableCellBackgroundColor');
                        }
                    }

                    return tags;
                },
            }
        }
    });
})(jQuery);
