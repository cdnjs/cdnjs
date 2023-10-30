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
'use strict';
import AST from '../../Core/Renderer/HTML/AST.js';
import Component from '../Components/Component.js';
import Templating from '../../Core/Templating.js';
import KPISyncHandlers from './KPISyncHandlers.js';
const { format } = Templating;
import U from '../../Core/Utilities.js';
const { createElement, css, defined, getStyle, isArray, isNumber, merge, diffObjects } = U;
/* *
 *
 *  Class
 *
 * */
/**
 *
 * Class that represents a KPI component.
 *
 */
class KPIComponent extends Component {
    /**
     * Creates component from JSON.
     *
     * @param json
     * Set of component options, used for creating the KPI component.
     *
     * @param cell
     * Instance of cell, where component is attached.
     *
     * @returns
     * KPI component based on config from JSON.
     *
     * @internal
     */
    static fromJSON(json, cell) {
        const options = json.options;
        const chartOptions = options.chartOptions && JSON.parse(options.chartOptions);
        const subtitle = JSON.parse(options.subtitle || '{}');
        const title = options.title && JSON.parse(options.title);
        return new KPIComponent(cell, merge(options, {
            chartOptions,
            title,
            subtitle
        }));
    }
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Creates a KPI component in the cell.
     *
     * @param cell
     * Instance of cell, where component is attached.
     *
     * @param options
     * The options for the component.
     */
    constructor(cell, options) {
        options = merge(KPIComponent.defaultOptions, options);
        super(cell, options);
        this.options = options;
        this.type = 'KPI';
        this.sync = new KPIComponent.Sync(this, this.syncHandlers);
        this.value = createElement('span', {
            className: `${options.className}-value`
        }, {}, this.contentElement);
        this.subtitle = createElement('span', {
            className: this.getSubtitleClassName()
        }, {}, this.contentElement);
        if (this.options.chartOptions) {
            this.chartContainer = createElement('div', {
                className: `${options.className}-chart-container`
            }, {}, this.contentElement);
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    /** @internal */
    async load() {
        await super.load();
        this.contentElement.style.display = 'flex';
        this.contentElement.style.flexDirection = 'column';
        return this;
    }
    resize(width, height) {
        super.resize(width, height);
        if (this.chart) {
            this.chart.reflow();
        }
        return this;
    }
    render() {
        super.render();
        this.updateElements();
        const charter = KPIComponent.charter;
        if (charter &&
            this.options.chartOptions &&
            !this.chart &&
            this.chartContainer) {
            this.chart = charter.chart(this.chartContainer, merge(KPIComponent.defaultChartOptions, this.options.chartOptions));
        }
        else if (this.chart &&
            !this.options.chartOptions &&
            'chartOptions' in this.options) {
            this.chart.destroy();
            this.chart = void 0;
        }
        this.sync.start();
        this.emit({ type: 'afterRender' });
        return this;
    }
    /**
     * Internal method for handling option updates.
     *
     * @private
     */
    setOptions() {
        this.filterAndAssignSyncOptions(KPISyncHandlers);
    }
    /**
     * Handles updating via options.
     * @param options
     * The options to apply.
     */
    async update(options, shouldRerender = true) {
        await super.update(options);
        this.setOptions();
        if (options.chartOptions && this.chart) {
            this.chart.update(options.chartOptions);
        }
        shouldRerender && this.render();
    }
    /**
     * @internal
     */
    onTableChanged() {
        this.setValue();
    }
    /**
     * Gets the default value that should be displayed in the KPI.
     *
     * @returns
     * The value that should be displayed in the KPI.
     */
    getValue() {
        if (this.options.value) {
            return this.options.value;
        }
        if (this.connector && this.options.columnName) {
            const table = this.connector?.table.modified, column = table.getColumn(this.options.columnName), length = column?.length || 0;
            return table.getCellAsString(this.options.columnName, length - 1);
        }
    }
    /**
     * Sets the value that should be displayed in the KPI.
     * @param value
     * The value to display in the KPI.
     */
    setValue(value = this.getValue()) {
        const { valueFormat, valueFormatter } = this.options;
        if (defined(value)) {
            let prevValue;
            if (isNumber(value)) {
                prevValue = value;
            }
            if (valueFormatter) {
                value = valueFormatter.call(this, value);
            }
            else if (valueFormat) {
                value = format(valueFormat, { value });
            }
            else if (isNumber(value)) {
                value = value.toLocaleString();
            }
            AST.setElementHTML(this.value, '' + value);
            this.prevValue = prevValue;
        }
    }
    /**
     * Handles updating elements via options
     *
     * @internal
     */
    updateElements() {
        const { style, subtitle } = this.options;
        this.setValue();
        AST.setElementHTML(this.subtitle, this.getSubtitle());
        if (style) {
            css(this.element, style);
        }
        if (typeof subtitle === 'object') {
            if (subtitle.style) {
                css(this.subtitle, subtitle.style);
            }
            this.subtitle.className = this.getSubtitleClassName();
        }
        if (this.chartContainer) {
            this.chartContainer.style.flex =
                this.options.chartOptions ? '1' : '0';
        }
        if (this.chart) {
            this.chart.reflow();
        }
        this.value.style.color = this.getValueColor();
    }
    /**
     * Gets KPI subtitle text.
     *
     * @returns
     * The subtitle's text.
     *
     * @internal
     */
    getSubtitle() {
        const { subtitle, value } = this.options;
        if (typeof subtitle === 'string') {
            return subtitle;
        }
        if (subtitle) {
            if (isNumber(this.prevValue) && isNumber(value)) {
                const diff = value - this.prevValue;
                let prefix = '';
                if (diff > 0) {
                    prefix = '<span style="color:green">&#9650;</span> +';
                }
                else if (diff < 0) {
                    prefix = '<span style="color:red">&#9660;</span> ';
                }
                else {
                    return this.subtitle.innerHTML;
                }
                if (subtitle.type === 'diff') {
                    return prefix + diff.toLocaleString();
                }
                if (subtitle.type === 'diffpercent') {
                    return prefix + format('{v:,.2f}%', {
                        v: diff / this.prevValue * 100
                    });
                }
            }
            return subtitle.text || '';
        }
        return '';
    }
    /**
     * Gets CSS class name of the KPI subtitle.
     *
     * @returns
     * The name of class.
     *
     * @internal
     */
    getSubtitleClassName() {
        const { subtitle } = this.options;
        return `${Component.defaultOptions.className}-subtitle` +
            ((typeof subtitle === 'object' && subtitle.className) || '');
    }
    /**
     * Applies title's color according to the threshold.
     *
     * @returns
     * Hex of color.
     *
     * @internal
     */
    getValueColor() {
        const { threshold, thresholdColors, value } = this.options;
        if (thresholdColors && threshold && isNumber(value)) {
            if (isArray(threshold)) {
                for (let i = threshold.length - 1; i >= 0; i--) {
                    if (value >= threshold[i]) {
                        if (i + 1 < thresholdColors.length) {
                            return thresholdColors[i + 1];
                        }
                        return thresholdColors[thresholdColors.length - 1];
                    }
                }
            }
            else if (value >= threshold) {
                return thresholdColors[1];
            }
            return thresholdColors[0];
        }
        return '';
    }
    /**
     * Converts the class instance to a class JSON.
     *
     * @returns
     * Class JSON of this Component instance.
     *
     * @internal
     */
    toJSON() {
        const base = super.toJSON();
        const json = {
            ...base,
            type: 'KPI',
            options: {
                ...base.options,
                type: 'KPI',
                value: this.options.value,
                subtitle: JSON.stringify(this.options.subtitle),
                title: JSON.stringify(this.options.title),
                threshold: this.options.threshold,
                thresholdColors: this.options.thresholdColors,
                chartOptions: JSON.stringify(this.options.chartOptions),
                valueFormat: this.options.valueFormat
            }
        };
        this.emit({ type: 'toJSON', json: base });
        return json;
    }
    /**
     * Get the KPI component's options.
     * @returns
     * The JSON of KPI component's options.
     *
     * @internal
     *
     */
    getOptions() {
        return {
            ...diffObjects(this.options, KPIComponent.defaultOptions),
            type: 'KPI'
        };
    }
}
/* *
 *
 *  Static functions
 *
 * */
KPIComponent.syncHandlers = KPISyncHandlers;
/**
 * Default options of the KPI component.
 */
KPIComponent.defaultOptions = merge(Component.defaultOptions, {
    type: 'KPI',
    className: [
        Component.defaultOptions.className,
        `${Component.defaultOptions.className}-kpi`
    ].join(' '),
    minFontSize: 20,
    syncHandlers: KPISyncHandlers,
    thresholdColors: ['#f45b5b', '#90ed7d'],
    editableOptions: (Component.defaultOptions.editableOptions || []).concat([{
            name: 'Value',
            type: 'input',
            propertyPath: ['value']
        }, {
            name: 'Column name',
            type: 'input',
            propertyPath: ['columnName']
        }, {
            name: 'Value format',
            type: 'input',
            propertyPath: ['valueFormat']
        }])
});
/* *
 *
 *  Static functions
 *
 * */
/**
 * Default options of the KPI component.
 */
KPIComponent.defaultChartOptions = {
    chart: {
        type: 'spline',
        styledMode: true,
        zooming: {
            mouseWheel: {
                enabled: false
            }
        }
    },
    title: {
        text: void 0
    },
    xAxis: {
        visible: false
    },
    yAxis: {
        visible: false,
        title: {
            text: null
        }
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    tooltip: {
        outside: true
    },
    plotOptions: {
        series: {
            marker: {
                enabled: false
            }
        }
    }
};
/* *
 *
 *  Default Export
 *
 * */
export default KPIComponent;
