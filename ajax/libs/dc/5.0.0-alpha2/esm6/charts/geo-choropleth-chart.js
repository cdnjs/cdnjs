import { geoAlbersUsa, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import { BaseMixin } from '../base/base-mixin.js';
import { ColorMixin } from '../base/color-mixin.js';
import { transition } from '../core/core.js';
import { logger } from '../core/logger.js';
import { events } from '../core/events.js';
import { nameToId } from '../core/utils.js';
/**
 * The geo choropleth chart is designed as an easy way to create a crossfilter driven choropleth map
 * from GeoJson data. This chart implementation was inspired by
 * {@link http://bl.ocks.org/4060606 | the great d3 choropleth example}.
 *
 * Examples:
 * - {@link http://dc-js.github.com/dc.js/vc/index.html | US Venture Capital Landscape 2011}
 */
export class GeoChoroplethChart extends ColorMixin(BaseMixin) {
    /**
     * Create a Geo Choropleth Chart.
     *
     * TODO update example
     *
     * @example
     * ```
     * // create a choropleth chart under '#us-chart' element using the default global chart group
     * const chart1 = new GeoChoroplethChart('#us-chart');
     * // create a choropleth chart under '#us-chart2' element using chart group A
     * const chart2 = new CompositeChart('#us-chart2', 'chartGroupA');
     * ```
     */
    constructor(parent, chartGroup) {
        super(parent, chartGroup);
        this.configure({
            colorAccessor: d => d || 0,
            geoJsons: [],
        });
        this._geoPath = geoPath();
        this._projectionFlag = undefined;
        this._projection = undefined;
    }
    configure(conf) {
        super.configure(conf);
        return this;
    }
    conf() {
        return this._conf;
    }
    _doRender() {
        this.resetSvg();
        for (let layerIndex = 0; layerIndex < this._conf.geoJsons.length; ++layerIndex) {
            const states = this.svg()
                .append('g')
                .attr('class', `layer${layerIndex}`);
            let regionG = states
                .selectAll(`g.${this._geoJson(layerIndex).name}`)
                .data(this._geoJson(layerIndex).data);
            regionG = regionG
                .enter()
                .append('g')
                .attr('class', this._geoJson(layerIndex).name)
                .merge(regionG);
            regionG.append('path').attr('fill', 'white').attr('d', this._getGeoPath());
            regionG.append('title');
            this._plotData(layerIndex);
        }
        this._projectionFlag = false;
        return this;
    }
    _plotData(layerIndex) {
        const data = this._generateLayeredData();
        if (this._isDataLayer(layerIndex)) {
            const regionG = this._renderRegionG(layerIndex);
            this._renderPaths(regionG, layerIndex, data);
            this._renderTitles(regionG, layerIndex, data);
        }
    }
    _generateLayeredData() {
        const data = {};
        const groupAll = this.data();
        for (let i = 0; i < groupAll.length; ++i) {
            data[this._conf.keyAccessor(groupAll[i])] = groupAll[i]._value;
        }
        return data;
    }
    _isDataLayer(layerIndex) {
        return !!this._geoJson(layerIndex).keyAccessor;
    }
    _renderRegionG(layerIndex) {
        const regionG = this.svg()
            .selectAll(this._layerSelector(layerIndex))
            .classed('selected', d => this._isSelected(layerIndex, d))
            .classed('deselected', d => this._isDeselected(layerIndex, d))
            .attr('class', d => {
            const layerNameClass = this._geoJson(layerIndex).name;
            const regionClass = nameToId(this._geoJson(layerIndex).keyAccessor(d));
            let baseClasses = `${layerNameClass} ${regionClass}`;
            if (this._isSelected(layerIndex, d)) {
                baseClasses += ' selected';
            }
            if (this._isDeselected(layerIndex, d)) {
                baseClasses += ' deselected';
            }
            return baseClasses;
        });
        return regionG;
    }
    _layerSelector(layerIndex) {
        return `g.layer${layerIndex} g.${this._geoJson(layerIndex).name}`;
    }
    _isSelected(layerIndex, d) {
        return this.hasFilter() && this.hasFilter(this._getKey(layerIndex, d));
    }
    _isDeselected(layerIndex, d) {
        return this.hasFilter() && !this.hasFilter(this._getKey(layerIndex, d));
    }
    _getKey(layerIndex, d) {
        return this._geoJson(layerIndex).keyAccessor(d);
    }
    _geoJson(index) {
        return this._conf.geoJsons[index];
    }
    _renderPaths(regionG, layerIndex, data) {
        const paths = regionG
            .select('path')
            .attr('fill', function () {
            const currentFill = select(this).attr('fill');
            if (currentFill) {
                return currentFill;
            }
            return 'none';
        })
            .on('click', (evt, d) => this.onClick(d, layerIndex));
        transition(paths, this._conf.transitionDuration, this._conf.transitionDelay).attr('fill', (d, i) => this._colorHelper.getColor(data[this._geoJson(layerIndex).keyAccessor(d)], i));
    }
    onClick(d, layerIndex) {
        const selectedRegion = this._geoJson(layerIndex).keyAccessor(d);
        events.trigger(() => {
            this.filter(selectedRegion);
            this.redrawGroup();
        });
    }
    _renderTitles(regionG, layerIndex, data) {
        if (this._conf.renderTitle) {
            regionG.selectAll('title').text(d => {
                const key = this._getKey(layerIndex, d);
                const value = data[key];
                return this._conf.title({ key, value });
            });
        }
    }
    _doRedraw() {
        for (let layerIndex = 0; layerIndex < this._conf.geoJsons.length; ++layerIndex) {
            this._plotData(layerIndex);
            if (this._projectionFlag) {
                this.svg()
                    .selectAll(`g.${this._geoJson(layerIndex).name} path`)
                    .attr('d', this._getGeoPath());
            }
        }
        this._projectionFlag = false;
        return this;
    }
    projection(projection) {
        if (!arguments.length) {
            return this._projection;
        }
        this._projection = projection;
        this._projectionFlag = true;
        return this;
    }
    _getGeoPath() {
        if (this._projection === undefined) {
            logger.warn('choropleth projection default of geoAlbers is deprecated,' +
                ' in next version projection will need to be set explicitly');
            return this._geoPath.projection(geoAlbersUsa());
        }
        return this._geoPath.projection(this._projection);
    }
    /**
     * Returns the {@link https://github.com/d3/d3-geo/blob/master/README.md#paths | d3.geoPath} object used to
     * render the projection and features.  Can be useful for figuring out the bounding box of the
     * feature set and thus a way to calculate scale and translation for the projection.
     * @see {@link https://github.com/d3/d3-geo/blob/master/README.md#paths | d3.geoPath}
     */
    geoPath() {
        return this._geoPath;
    }
}
//# sourceMappingURL=geo-choropleth-chart.js.map