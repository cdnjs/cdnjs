;(function(global){

/**
 * Chart View
 */
var Chart = React.createClass({displayName: "Chart",
  propTypes: {
    type: React.PropTypes.string.isRequired
  },
  _ownSettings: ['x', 'y', 'width', 'height', 'type', 'id', 'datum'],
  componentDidMount: function() {
    this.renderChart();
  },
  componentDidUpdate: function() {
    this.renderChart();
  },
  getNVD3Options: function(){
    var NVD3Options = {};
    Object.keys(this.props).forEach(function(prop){
      if (this._ownSettings.indexOf(prop) === -1) {
        NVD3Options[prop] = this.props[prop];
      }
    }, this);
    return NVD3Options;
  },
  propsByPrefix: function(prefix){
    return Object.keys(this.props).reduce(function(memo, prop){
      if(prop.startsWith(prefix)) {
        memo[prop.replace(prefix, '')] = this[prop];
      }
      return memo;
    }.bind(this.props), {});
  },
  renderChart: function(){
    var self = this;
    nv.addGraph(function() {

      var chart = nv.models[self.props.type]()
        .x(self.getValueFunction(self.props.x, 'x'))
        .y(self.getValueFunction(self.props.y, 'y'))
        .margin(self.propsByPrefix('margin-') || {})
        .options(self.getNVD3Options());

      d3.select('#' + self.props.id + ' svg')
        .datum(self.props.datum)
        .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });
  },
  getValueFunction: function(v, _default){
    if(typeof v === 'function') return v;
    return function(d) {
      return typeof d[v] !== 'undefined' ? d[v] : d[_default];
    }
  },
  render: function() {
    return (
      React.createElement("div", {className: "nv-chart", id: this.props.id}, 
        React.createElement("svg", {width: this.props.width, height: this.props.height})
      )
    );
  }
});

// Expose this to global
global.NVD3Chart = Chart;

})(window);