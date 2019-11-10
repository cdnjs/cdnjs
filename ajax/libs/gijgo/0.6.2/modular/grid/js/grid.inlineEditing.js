/**  */
if (typeof (gj.grid.plugins) === 'undefined') {
    gj.grid.plugins = {};
}

gj.grid.plugins.inlineEditing = {
    config: {
        defaultColumnSettings: {
            /** Provides a way to specify a custom editing UI for the column. */
            editor: undefined
        }
    },

    private: {
        OnCellEdit: function ($grid, $cell, column, record) {
            var $editorContainer, $editorField;
            if ($cell.attr('data-mode') !== 'edit' && column.editor) {
                $cell.find('div[data-role="display"]').hide();
                $editorContainer = $cell.find('div[data-role="edit"]');
                if ($editorContainer && $editorContainer.length) {
                    $editorContainer.show();
                    $editorField = $editorContainer.find('input, select').first();
                    $editorField.val(record[column.field]);
                } else {
                    $editorContainer = $('<div data-role="edit" />');
                    $cell.append($editorContainer);
                    if (typeof (column.editor) === 'function') {
                        column.editor($editorContainer, record[column.field]);
                    } else if (typeof (column.editor) === 'boolean') {
                        $editorContainer.append('<input type="text" value="' + record[column.field] + '"/>');
                    }
                    $editorField = $editorContainer.find('input, select').first();
                    $editorField.on('blur', function (e) {
                        gj.grid.plugins.inlineEditing.private.OnCellDisplay($grid, $cell, column);
                    });
                    $editorField.on('keypress', function (e) {
                        if (e.which === 13) {
                            gj.grid.plugins.inlineEditing.private.OnCellDisplay($grid, $cell, column);
                        }
                    });
                }
                $editorField.focus().select();
                $cell.attr('data-mode', 'edit');
            }
        },

        OnCellDisplay: function ($grid, $cell, column) {
            var newValue, oldValue, record, style = '';
            if ($cell.attr('data-mode') === 'edit') {
                $editorContainer = $cell.find('div[data-role="edit"]');
                newValue = $editorContainer.find('input, select').first().val();
                record = $grid.get($cell.parent().data('position'));
                oldValue = record[column.field];
                $displayContainer = $cell.find('div[data-role="display"]');
                if (newValue !== oldValue) {
                    gj.grid.methods.setCellText($displayContainer, column, newValue);
                    record[column.field] = newValue;
                    if ($cell.find('span.gj-dirty').length === 0) {
                        if ($cell.css('padding-top') !== '0px') {
                            style += 'margin-top: -' + $cell.css('padding-top') + ';';
                        }
                        if ($cell.css('padding-left') !== '0px') {
                            style += 'margin-left: -' + $cell.css('padding-left') + ';';
                        }
                        style = style ? ' style="' + style + '"' : '';
                        $cell.prepend($('<span class="gj-dirty"' + style + '></span>'));
                    }
                    gj.grid.plugins.inlineEditing.events.cellDataChanged($grid, $cell, column, record, oldValue, newValue);
                    gj.grid.plugins.inlineEditing.private.updateChanges($grid, column, record, newValue);
                }
                $editorContainer.hide();
                $displayContainer.show();
                $cell.attr('data-mode', 'display');
            }
        },

        updateChanges: function ($grid, column, sourceRecord, newValue) {
            var targetRecords, filterResult, newRecord, data = $grid.data();
            if (!data.guid) {
                data.guid = gj.grid.plugins.inlineEditing.private.generateGUID();
            }
            if (data.primaryKey) {
                targetRecords = JSON.parse(sessionStorage.getItem('gj.grid.' + data.guid));
                if (targetRecords) {
                    filterResult = targetRecords.filter(function (record) {
                        return record[data.primaryKey] === sourceRecord[data.primaryKey];
                    });
                } else {
                    targetRecords = [];
                }
                if (filterResult && filterResult.length === 1) {
                    filterResult[0][column.field] = newValue;
                } else {
                    newRecord = {};
                    newRecord[data.primaryKey] = sourceRecord[data.primaryKey];
                    if (data.primaryKey !== column.field) {
                        newRecord[column.field] = newValue;
                    }
                    targetRecords.push(newRecord);
                }
                sessionStorage.setItem('gj.grid.' + data.guid, JSON.stringify(targetRecords));
            }
        },

        generateGUID: function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
    },

    public: {
        /**
         * Return array with all changes */
        getChanges: function () {
            return JSON.parse(sessionStorage.getItem('gj.grid.' + this.data().guid));
        }
    },

    events: {
        /**
         * Event fires after inline edit of a cell in the grid.
         * */
        cellDataChanged: function ($grid, $cell, column, record, oldValue, newValue) {
            $grid.trigger('cellDataChanged', [$cell, column, record, oldValue, newValue]);
        }
    },

    configure: function ($grid) {
        $.extend(true, $grid, gj.grid.plugins.inlineEditing.public);
        $grid.on('cellDataBound', function (e, $wrapper, id, column, record) {
            if (column.editor) {
                $wrapper.parent().on('click', function () {
                    gj.grid.plugins.inlineEditing.private.OnCellEdit($grid, $wrapper.parent(), column, record);
                });
            }
        });
    }
};

