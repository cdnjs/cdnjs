/* *
 *
 *  (c) 2009 - 2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
class EditableOptions {
    constructor(component, bindings = EditableOptions.defaultBindings) {
        this.component = component;
        this.bindings = bindings;
    }
    getOptions() {
        const options = this.component.options.editableOptions;
        for (let i = 0, iEnd = options.length; i < iEnd; i++) {
            const option = options[i];
            if (option.name === 'connectorName') {
                const board = this.component.board;
                const selectOptions = !board ?
                    [] :
                    board.dataPool
                        .getConnectorIds()
                        .map((name) => ({ name }));
                option.selectOptions = selectOptions;
            }
        }
        return options;
    }
}
EditableOptions.defaultBindings = {
    keyMap: {
        color: 'colorPicker',
        title: 'text',
        caption: 'text',
        style: 'textarea'
    },
    typeMap: {
        'string': 'text',
        'number': 'input',
        'boolean': 'toggle'
    },
    skipRedraw: []
};
// Bindings of basic types to "editor components"
EditableOptions.defaultTypeMap = {
    'string': 'text',
    'number': 'input',
    'boolean': 'toggle'
};
export default EditableOptions;
