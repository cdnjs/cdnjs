/* ===========================================================
 * trumbowyg.table.custom.js v2.0
 * Table plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Sven Dunemann [dunemann@forelabs.eu]
 */

(function ($) {
    'use strict';

    var defaultOptions = {
        rows: 8,
        columns: 8,
        styler: 'table'
    };

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                table: 'Insert table',
                tableAddRow: 'Add row',
                tableAddColumn: 'Add column',
                tableDeleteRow: 'Delete row',
                tableDeleteColumn: 'Delete column',
                tableDestroy: 'Delete table',
                error: 'Error'
            },
            da: {
              table: 'Indsæt tabel',
              tableAddRow: 'Tilføj række',
              tableAddColumn: 'Tilføj kolonne',
              tableDeleteRow: 'Slet række',
              tableDeleteColumn: 'Slet kolonne',
              tableDestroy: 'Slet tabel',
              error: 'Fejl'
            },
            de: {
              table: 'Tabelle einfügen',
              tableAddRow: 'Zeile hinzufügen',
              tableAddColumn: 'Spalte hinzufügen',
              tableDeleteRow: 'Zeile löschen',
              tableDeleteColumn: 'Spalte löschen',
              tableDestroy: 'Tabelle löschen',
              error: 'Error'
            },
            sk: {
                table: 'Vytvoriť tabuľky',
                tableAddRow: 'Pridať riadok',
                tableAddColumn: 'Pridať stĺpec',
                error: 'Chyba'
            },
            fr: {
                table: 'Insérer un tableau',
                tableAddRow: 'Ajouter des lignes',
                tableAddColumn: 'Ajouter des colonnes',
                tableDeleteRow: 'Effacer la ligne',
                tableDeleteColumn: 'Effacer la colonne',
                tableDestroy: 'Effacer le tableau',
                error: 'Erreur'
            },
            cs: {
                table: 'Vytvořit příkaz Table',
                tableAddRow: 'Přidat řádek',
                tableAddColumn: 'Přidat sloupec',
                error: 'Chyba'
            },
            ru: {
                table: 'Вставить таблицу',
                tableAddRow: 'Добавить строку',
                tableAddColumn: 'Добавить столбец',
                tableDeleteRow: 'Удалить строку',
                tableDeleteColumn: 'Удалить столбец',
                tableDestroy: 'Удалить таблицу',
                error: 'Ошибка'
            },
            ja: {
                table: '表の挿入',
                tableAddRow: '行の追加',
                tableAddColumn: '列の追加',
                error: 'エラー'
            },
            tr: {
                table: 'Tablo ekle',
                tableAddRow: 'Satır ekle',
                tableAddColumn: 'Kolon ekle',
                error: 'Hata'
            },
            zh_tw: {
              table: '插入表格',
              tableAddRow: '加入行',
              tableAddColumn: '加入列',
              tableDeleteRow: '刪除行',
              tableDeleteColumn: '刪除列',
              tableDestroy: '刪除表格',
              error: '錯誤'
            },
            id: {
                table: 'Sisipkan tabel',
                tableAddRow: 'Sisipkan baris',
                tableAddColumn: 'Sisipkan kolom',
                tableDeleteRow: 'Hapus baris',
                tableDeleteColumn: 'Hapus kolom',
                tableDestroy: 'Hapus tabel',
                error: 'Galat'
            },
            pt_br: {
                table: 'Inserir tabela',
                tableAddRow: 'Adicionar linha',
                tableAddColumn: 'Adicionar coluna',
                tableDeleteRow: 'Deletar linha',
                tableDeleteColumn: 'Deletar coluna',
                tableDestroy: 'Deletar tabela',
                error: 'Erro'
            },
            ko: {
                table: '표 넣기',
                tableAddRow: '줄 추가',
                tableAddColumn: '칸 추가',
                tableDeleteRow: '줄 삭제',
                tableDeleteColumn: '칸 삭제',
                tableDestroy: '표 지우기',
                error: '에러'
            },
            // jshint camelcase:true
        },

        plugins: {
            table: {
                init: function (t) {
                    t.o.plugins.table = $.extend(true, {}, defaultOptions, t.o.plugins.table || {});

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
                                $dropdown.append(t.buildSubBtn('tableAddRow'));
                                $dropdown.append(t.buildSubBtn('tableAddColumn'));
                                $dropdown.append(t.buildSubBtn('tableDeleteRow'));
                                $dropdown.append(t.buildSubBtn('tableDeleteColumn'));
                                $dropdown.append(t.buildSubBtn('tableDestroy'));
                            } else {
                                var tableSelect = $('<table/>');
                                for (var i = 0; i < t.o.plugins.table.rows; i += 1) {
                                    var row = $('<tr/>').appendTo(tableSelect);
                                    for (var j = 0; j < t.o.plugins.table.columns; j += 1) {
                                        $('<td/>').appendTo(row);
                                    }
                                }
                                tableSelect.find('td').on('mouseover', tableAnimate);
                                tableSelect.find('td').on('mousedown', tableBuild);

                                $dropdown.append(tableSelect);
                                $dropdown.append($('<div class="trumbowyg-table-size">1x1</div>'));
                            }

                            t.dropdown(btnName);
                        }
                    };

                    var tableAnimate = function(columnEvent) {
                        var column = $(columnEvent.target),
                            table = column.closest('table'),
                            colIndex = this.cellIndex,
                            rowIndex = this.parentNode.rowIndex;

                        // reset all columns
                        table.find('td').removeClass('active');

                        for (var i = 0; i <= rowIndex; i += 1) {
                            for (var j = 0; j <= colIndex; j += 1) {
                                table.find('tr:nth-of-type('+(i+1)+')').find('td:nth-of-type('+(j+1)+')').addClass('active');
                            }
                        }

                        // set label
                        table.next('.trumbowyg-table-size').html((colIndex+1) + 'x' + (rowIndex+1));
                    };

                    var tableBuild = function() {
                        t.saveRange();

                        var tabler = $('<table/>');
                        if (t.o.plugins.table.styler) {
                          tabler.attr('class', t.o.plugins.table.styler);
                        }

                        var colIndex = this.cellIndex,
                            rowIndex = this.parentNode.rowIndex;

                        for (var i = 0; i <= rowIndex; i += 1) {
                            var row = $('<tr></tr>').appendTo(tabler);
                            for (var j = 0; j <= colIndex; j += 1) {
                                $('<td/>').appendTo(row);
                            }
                        }

                        t.range.deleteContents();
                        t.range.insertNode(tabler[0]);
                        t.$c.trigger('tbwchange');
                    };

                    var addRow = {
                        title: t.lang.tableAddRow,
                        text: t.lang.tableAddRow,
                        ico: 'row-below',

                        fn: function () {
                            t.saveRange();

                            var node = t.doc.getSelection().focusNode;
                            var table = $(node).closest('table');

                            if(table.length > 0) {
                                var row = $('<tr/>');
                                // add columns according to current columns count
                                for (var i = 0; i < table.find('tr')[0].childElementCount; i += 1) {
                                    $('<td/>').appendTo(row);
                                }
                                // add row to table
                                row.appendTo(table);
                            }

                            t.syncCode();
                        }
                    };

                    var addColumn = {
                        title: t.lang.tableAddColumn,
                        text: t.lang.tableAddColumn,
                        ico: 'col-right',

                        fn: function () {
                            t.saveRange();

                            var node = t.doc.getSelection().focusNode;
                            var table = $(node).closest('table');

                            if(table.length > 0) {
                                $(table).find('tr').each(function() {
                                    $(this).find('td:last').after('<td></td>');
                                });
                            }

                            t.syncCode();
                        }
                    };

                    var destroy = {
                        title: t.lang.tableDestroy,
                        text: t.lang.tableDestroy,
                        ico: 'table-delete',

                        fn: function () {
                            t.saveRange();

                            var node = t.doc.getSelection().focusNode,
                                table = $(node).closest('table');

                            table.remove();

                            t.syncCode();
                        }
                    };

                    var deleteRow = {
                        title: t.lang.tableDeleteRow,
                        text: t.lang.tableDeleteRow,
                        ico: 'row-delete',

                        fn: function () {
                            t.saveRange();

                            var node = t.doc.getSelection().focusNode,
                                row = $(node).closest('tr');

                            row.remove();

                            t.syncCode();
                        }
                    };

                    var deleteColumn = {
                        title: t.lang.tableDeleteColumn,
                        text: t.lang.tableDeleteColumn,
                        ico: 'col-delete',

                        fn: function () {
                            t.saveRange();

                            var node = t.doc.getSelection().focusNode,
                                table = $(node).closest('table'),
                                td = $(node).closest('td'),
                                cellIndex = td.index();

                            $(table).find('tr').each(function() {
                                $(this).find('td:eq(' + cellIndex + ')').remove();
                            });

                            t.syncCode();
                        }
                    };

                    t.addBtnDef('table', buildButtonDef);
                    t.addBtnDef('tableAddRow', addRow);
                    t.addBtnDef('tableAddColumn', addColumn);
                    t.addBtnDef('tableDeleteRow', deleteRow);
                    t.addBtnDef('tableDeleteColumn', deleteColumn);
                    t.addBtnDef('tableDestroy', destroy);
                }
            }
        }
    });
})(jQuery);
