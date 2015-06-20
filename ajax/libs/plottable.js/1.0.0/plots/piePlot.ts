///<reference path="../reference.ts" />

module Plottable {
export module Plots {
  export class Pie extends Plot {

    private static _INNER_RADIUS_KEY = "inner-radius";
    private static _OUTER_RADIUS_KEY = "outer-radius";
    private static _SECTOR_VALUE_KEY = "sector-value";
    private _startAngles: number[];
    private _endAngles: number[];

    /**
     * @constructor
     */
    constructor() {
      super();
      this.innerRadius(0);
      this.outerRadius(() => Math.min(this.width(), this.height()) / 2);
      this.addClass("pie-plot");
      this.attr("fill", (d, i) => String(i), new Scales.Color());
    }

    public computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number) {
      super.computeLayout(origin, availableWidth, availableHeight);
      this._renderArea.attr("transform", "translate(" + this.width() / 2 + "," + this.height() / 2 + ")");
      var radiusLimit = Math.min(this.width(), this.height()) / 2;
      if (this.innerRadius().scale != null) {
        this.innerRadius().scale.range([0, radiusLimit]);
      }
      if (this.outerRadius().scale != null) {
        this.outerRadius().scale.range([0, radiusLimit]);
      }
      return this;
    }

    public addDataset(dataset: Dataset) {
      if (this.datasets().length === 1) {
        Utils.Window.warn("Only one dataset is supported in Pie plots");
        return this;
      }
      this._updatePieAngles();
      super.addDataset(dataset);
      return this;
    }

    public removeDataset(dataset: Dataset) {
      super.removeDataset(dataset);
      this._startAngles = [];
      this._endAngles = [];
      return this;
    }

    protected _onDatasetUpdate() {
      super._onDatasetUpdate();
      this._updatePieAngles();
    }

    protected _createDrawer(dataset: Dataset) {
      return new Plottable.Drawers.Arc(dataset);
    }

    public entities(datasets = this.datasets()): PlotEntity[] {
      var entities = super.entities(datasets);
      entities.forEach((entity) => {
        entity.position.x += this.width() / 2;
        entity.position.y += this.height() / 2;
      });
      return entities;
    }

    /**
     * Gets the AccessorScaleBinding for the sector value.
     */
    public sectorValue<S>(): AccessorScaleBinding<S, number>;
    /**
     * Sets the sector value to a constant number or the result of an Accessor<number>.
     *
     * @param {number|Accessor<number>} sectorValue
     * @returns {Pie} The calling Pie Plot.
     */
    public sectorValue(sectorValue: number | Accessor<number>): Plots.Pie;
    /**
     * Sets the sector value to a scaled constant value or scaled result of an Accessor.
     * The provided Scale will account for the values when autoDomain()-ing.
     *
     * @param {S|Accessor<S>} sectorValue
     * @param {Scale<S, number>} scale
     * @returns {Pie} The calling Pie Plot.
     */
    public sectorValue<S>(sectorValue: S | Accessor<S>, scale: Scale<S, number>): Plots.Pie;
    public sectorValue<S>(sectorValue?: number | Accessor<number> | S | Accessor<S>, scale?: Scale<S, number>): any {
      if (sectorValue == null) {
        return this._propertyBindings.get(Pie._SECTOR_VALUE_KEY);
      }
      this._bindProperty(Pie._SECTOR_VALUE_KEY, sectorValue, scale);
      this._updatePieAngles();
      this.render();
      return this;
    }

    /**
     * Gets the AccessorScaleBinding for the inner radius.
     */
    public innerRadius<R>(): AccessorScaleBinding<R, number>;
    /**
     * Sets the inner radius to a constant number or the result of an Accessor<number>.
     *
     * @param {number|Accessor<number>} innerRadius
     * @returns {Pie} The calling Pie Plot.
     */
    public innerRadius(innerRadius: number | Accessor<number>): Plots.Pie;
    /**
     * Sets the inner radius to a scaled constant value or scaled result of an Accessor.
     * The provided Scale will account for the values when autoDomain()-ing.
     *
     * @param {R|Accessor<R>} innerRadius
     * @param {Scale<R, number>} scale
     * @returns {Pie} The calling Pie Plot.
     */
    public innerRadius<R>(innerRadius: R | Accessor<R>, scale: Scale<R, number>): Plots.Pie;
    public innerRadius<R>(innerRadius?: number | Accessor<number> | R | Accessor<R>, scale?: Scale<R, number>): any {
      if (innerRadius == null) {
        return this._propertyBindings.get(Pie._INNER_RADIUS_KEY);
      }
      this._bindProperty(Pie._INNER_RADIUS_KEY, innerRadius, scale);
      this.render();
      return this;
    }

    /**
     * Gets the AccessorScaleBinding for the outer radius.
     */
    public outerRadius<R>(): AccessorScaleBinding<R, number>;
    /**
     * Sets the outer radius to a constant number or the result of an Accessor<number>.
     *
     * @param {number|Accessor<number>} outerRadius
     * @returns {Pie} The calling Pie Plot.
     */
    public outerRadius(outerRadius: number | Accessor<number>): Plots.Pie;
    /**
     * Sets the outer radius to a scaled constant value or scaled result of an Accessor.
     * The provided Scale will account for the values when autoDomain()-ing.
     *
     * @param {R|Accessor<R>} outerRadius
     * @param {Scale<R, number>} scale
     * @returns {Pie} The calling Pie Plot.
     */
    public outerRadius<R>(outerRadius: R | Accessor<R>, scale: Scale<R, number>): Plots.Pie;
    public outerRadius<R>(outerRadius?: number | Accessor<number> | R | Accessor<R>, scale?: Scale<R, number>): any {
      if (outerRadius == null) {
        return this._propertyBindings.get(Pie._OUTER_RADIUS_KEY);
      }
      this._bindProperty(Pie._OUTER_RADIUS_KEY, outerRadius, scale);
      this.render();
      return this;
    }

    /**
     * Gets the Entities at a particular Point.
     * 
     * @param {Point} p
     * @param {PlotEntity[]} 
     */
    public entitiesAt(queryPoint: Point) {
      var center = { x: this.width() / 2, y: this.height() / 2 };
      var adjustedQueryPoint = { x: queryPoint.x - center.x, y: queryPoint.y - center.y };
      var radius = Math.sqrt(Math.pow(adjustedQueryPoint.x, 2) + Math.pow(adjustedQueryPoint.y, 2));
      var angle = Math.acos(-adjustedQueryPoint.y / (1 + radius));
      if (adjustedQueryPoint.x < 0) {
        angle = Math.PI * 2 - angle;
      }

      for (var i = 0; i < this.entities().length; i++) {
        var entity = this.entities()[i];
        var innerRadius = this.innerRadius().accessor(entity.datum, entity.index, entity.dataset);
        if (this.innerRadius().scale) {
          innerRadius = this.innerRadius().scale.scale(innerRadius);
        }
        var outerRadius = this.outerRadius().accessor(entity.datum, entity.index, entity.dataset);
        if (this.outerRadius().scale) {
          outerRadius = this.outerRadius().scale.scale(outerRadius);
        }
        if (this._startAngles[i] <= angle && this._endAngles[i] > angle &&
            innerRadius < radius && outerRadius > radius) {
          return [this.entities()[i]];
        }
      }

      return [];
    }

    protected _propertyProjectors(): AttributeToProjector {
      var attrToProjector = super._propertyProjectors();
      var innerRadiusAccessor = Plot._scaledAccessor(this.innerRadius());
      var outerRadiusAccessor = Plot._scaledAccessor(this.outerRadius());
      attrToProjector["d"] = (datum: any, index: number, ds: Dataset) => {
        return d3.svg.arc().innerRadius(innerRadiusAccessor(datum, index, ds))
                           .outerRadius(outerRadiusAccessor(datum, index, ds))
                           .startAngle(this._startAngles[index])
                           .endAngle(this._endAngles[index])(datum, index);
      };
      return attrToProjector;
    }

    private _updatePieAngles() {
      if (this.sectorValue() == null) { return; }
      if (this.datasets().length === 0) { return; }
      var sectorValueAccessor = Plot._scaledAccessor(this.sectorValue());
      var dataset = this.datasets()[0];
      var data = dataset.data().filter((d, i) => Plottable.Utils.Math.isValidNumber(sectorValueAccessor(d, i, dataset)));
      var pie = d3.layout.pie().sort(null).value((d, i) => sectorValueAccessor(d, i, dataset))(data);
      if (pie.some((slice) => slice.value < 0)) {
        Utils.Window.warn("Negative values will not render correctly in a pie chart.");
      }
      this._startAngles = pie.map((slice) => slice.startAngle);
      this._endAngles = pie.map((slice) => slice.endAngle);
    }

    protected _getDataToDraw() {
      var dataToDraw = super._getDataToDraw();
      if (this.datasets().length === 0) { return dataToDraw; }
      var sectorValueAccessor = Plot._scaledAccessor(this.sectorValue());
      var ds = this.datasets()[0];
      var data = dataToDraw.get(ds);
      var filteredData = data.filter((d, i) => Plottable.Utils.Math.isValidNumber(sectorValueAccessor(d, i, ds)));
      dataToDraw.set(ds, filteredData);
      return dataToDraw;
    }

    protected _pixelPoint(datum: any, index: number, dataset: Dataset) {
      var innerRadius = Plot._scaledAccessor(this.innerRadius())(datum, index, dataset);
      var outerRadius = Plot._scaledAccessor(this.outerRadius())(datum, index, dataset);
      var avgRadius = (innerRadius + outerRadius) / 2;

      var scaledValueAccessor = Plot._scaledAccessor(this.sectorValue());
      var pie = d3.layout.pie()
                         .sort(null)
                         .value((d: any, i: number) => scaledValueAccessor(d, i, dataset))(dataset.data());
      var startAngle = pie[index].startAngle;
      var endAngle = pie[index].endAngle;
      var avgAngle = (startAngle + endAngle) / 2;
      return { x: avgRadius * Math.sin(avgAngle), y: -avgRadius * Math.cos(avgAngle) };
    }
  }
}
}
