/* ===========================================================
 * trumbowyg.table.js v1.2
 * Table plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Lawrence Meckan
 *          Twitter : @absalomedia
 *          Website : absalom.biz
 */

(function ($) {
    'use strict';

    var defaultOptions = {
        rows: 0,
        columns: 0,
        styler: ''
    };

    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                table: 'Insert table',
                tableAddRow: 'Add rows',
                tableAddColumn: 'Add columns',
                rows: 'Rows',
                columns: 'Columns',
                styler: 'Table class',
                error: 'Error'
            },
            sk: {
                table: 'Vytvoriť tabuľky',
                tableAddRow: 'Pridať riadok',
                tableAddColumn: 'Pridať stĺpec',
                rows: 'Riadky',
                columns: 'Stĺpce',
                styler: 'Tabuľku triedy',
                error: 'Chyba'
            },
            fr: {
                table: 'Insérer un tableau',
                tableAddRow: 'Ajouter des lignes',
                tableAddColumn: 'Ajouter des colonnes',
                rows: 'Lignes',
                columns: 'Colonnes',
                styler: 'Classes CSS sur la table',
                error: 'Erreur'
            },
            cs: {
                table: 'Vytvořit příkaz Table',
                tableAddRow: 'Přidat řádek',
                tableAddColumn: 'Přidat sloupec',
                rows: 'Řádky',
                columns: 'Sloupce',
                styler: 'Tabulku třída',
                error: 'Chyba'
            }
        },

        plugins: {
            table: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.table = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.table || {});

                    var tableBuild = {
                        fn: function () {
                            trumbowyg.saveRange();
                            trumbowyg.openModalInsert(
                                // Title
                                trumbowyg.lang.table,

                                // Fields
                                {
                                    rows: {
                                        type: 'number',
                                        required: true
                                    },
                                    columns: {
                                        type: 'number',
                                        required: true
                                    },
                                    styler: {
                                        label: trumbowyg.lang.styler,
                                        type: 'text'
                                    }
                                },
                                function (v) { // v is value
                                    var tabler = $('<table></table>');
                                    if (v.styler.length !== 0) {
                                        tabler.addClass(v.styler);
                                    }

                                    for (var i = 0; i < v.rows; i += 1) {
                                        var row = $('<tr></tr>').appendTo(tabler);
                                        for (var j = 0; j < v.columns; j += 1) {
                                            $('<td></td>').appendTo(row);
                                        }
                                    }

                                    trumbowyg.range.deleteContents();
                                    trumbowyg.range.insertNode(tabler[0]);
                                    return true;
                                });
                        }
                    };

                    var addRow = {
                        fn: function () {
                            trumbowyg.saveRange();
                            var rower = $('<tr></tr>');
                            trumbowyg.range.deleteContents();
                            trumbowyg.range.insertNode(rower[0]);
                            return true;

                        }
                    };

                    var addColumn = {
                        fn: function () {
                            trumbowyg.saveRange();
                            var columner = $('<td></td>');
                            trumbowyg.range.deleteContents();
                            trumbowyg.range.insertNode(columner[0]);
                            return true;

                        }
                    };

                    trumbowyg.addBtnDef('table', tableBuild);
                    trumbowyg.addBtnDef('tableAddRow', addRow);
                    trumbowyg.addBtnDef('tableAddColumn', addColumn);
                }
            }
        }
    });
})(jQuery);