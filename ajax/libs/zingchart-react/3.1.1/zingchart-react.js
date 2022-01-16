'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var EVENT_NAMES = [
  'history_back',
  'history_forward',
  'destroy',
  'beforedestroy',
  'animation_step',
  'animation_start',
  'animation_end',
  'guide_mouseout',
  'guide_mousemove',
  'dataload',
  'dataparse',
  'modulesready',
  'dataready',
  'resize',
  'swipe',
  'mousewheel',
  'render',
  'complete',
  'load',
  'about_show',
  'about_hide',
  'error',
  'reload',
  'menu_item_click',
  'beforezoom',
  'node_mousedown',
  'node_mouseover',
  'node_mouseout',
  'node_mouseup',
  'plot_mouseout',
  'plot_mouseup',
  'node_click',
  'plot_click',
  'node_doubleclick',
  'plot_doubleclick',
  'gload',
  'gcomplete',
  'maps.zoom',
  'plot_add',
  'plot_remove',
  'modify',
  'plot_modify',
  'node_set',
  'node_add',
  'node_remove',
  'setdata',
  'legend_minimize',
  'legend_hide',
  'legend_maximize',
  'legend_show',
  'source_show',
  'source_hide',
  'dataexport',
  'legend_mouseover',
  'legend_mouseout',
  'legend_item_click',
  'legend_marker_click',
  'shape_mouseover',
  'shape_mousedown',
  'shape_mouseout',
  'shape_mouseup',
  'shape_mousemove',
  'shape_click',
  'shape_dblclick',
  'label_mouseover',
  'label_mousedown',
  'label_mouseout',
  'label_mouseup',
  'label_mousemove',
  'label_click',
  'label_dblclick',
  'feed_clear',
  'feed_step',
  'feed_interval_modify',
  'feed_stop',
  'feed_start',
  'zoom',
  'postzoom',
  'heatmap.mousemove',
  'zingchart.plugins.selection-tool.mouseup',
  'zingchart.plugins.selection-tool.selection',
  'zingchart.plugins.selection-tool.beforeselection'
];

var METHOD_NAMES = [
  'exec',
  'goback',
  'goforward',
  'showmenu',
  'hidemenu',
  'destroy',
  'getrender',
  'clear',
  'reload',
  'load',
  'enable',
  'disable',
  'closemodal',
  'openmodal',
  'print',
  'fullscreen',
  'exitfullscreen',
  'resize',
  'plothide',
  'showguide',
  'hideguide',
  'showtooltip',
  'hidetooltip',
  'clicknode',
  'locktooltip',
  'unlocktooltip',
  'showhoverstate',
  'showplot',
  'togglesource',
  'togglebugreport',
  'toggleabout',
  'toggleplot',
  'getcharttype',
  'getversion',
  'get3dview',
  'set3dview',
  'getpage',
  'setpage',
  'unbinddocument',
  'addmenuitem',
  'resetguide',
  'setguide',
  'zingchart.render',
  'getMapByGraphIndex',
  'zoomIn',
  'zoomOut',
  'destroyMap',
  'setView',
  'viewAll',
  'zoomToItem',
  'zoomTo',
  'getInfo',
  'getItems',
  'getItemInfo',
  'getXY',
  'getLonLat',
  'clearscroll',
  'getbubblesize',
  'getscaleinfo',
  'getobjectinfo',
  'getxyinfo',
  'update',
  'setcharttype',
  'addgraph',
  'addplot',
  'removeplot',
  'modify',
  'modifyplot',
  'setnodevalue',
  'setscalevalues',
  'addscalevalue',
  'removescalevalue',
  'addnode',
  'removenode',
  'setdata',
  'getseriesdata',
  'setseriesdata',
  'appendseriesdata',
  'getseriesvalues',
  'setseriesvalues',
  'appendseriesvalues',
  'togglelegend',
  'legendminimize',
  'legendmaximize',
  'legendscroll',
  'toggledimension',
  'getdata',
  'getoriginaljson',
  'getgraphlength',
  'getplotlength',
  'getscales',
  'getnodelength',
  'getnodevalue',
  'getplotvalues',
  'getimagedata',
  'exportimage',
  'saveasimage',
  'exportdata',
  'downloadCSV',
  'downloadXLS',
  'downloadRAW',
  'viewDataTable',
  'addobject',
  'removeobject',
  'updateobject',
  'repaintobjects',
  'getallobjects',
  'getobjectsbyclass',
  'getlabelinfo',
  'getshapeinfo',
  'setobjectsmode',
  'clearfeed',
  'getinterval',
  'setinterval',
  'startfeed',
  'stopfeed',
  'clearselection',
  'getselection',
  'setselection',
  'select',
  'deselect',
  'getzoom',
  'pan',
  'zoomin',
  'zoomout',
  'zoomto',
  'zoomtovalues',
  'viewall',
  'removenote',
  'updatenote',
  'getnotes',
  'addnote',
  'addmarker',
  'updatemarker',
  'removemarker',
  'addrule',
  'removerule',
  'updaterule',
  'getrules',
  'bubblepack.setdata',
  'calendar_setvalues',
  'colorscale.setvalue',
  'colorscale.update',
  'colorscale.clear',
  'colorscale.getinfo',
  'heatmap.setdata',
  'loadGeoJSON',
  'loadTopoJSON',
  'resetscales',
  'resetsetseriesdata',
  'getscaleminmax',
  'tree.addnode',
  'tree.removenode',
  'tree.getdata',
  'set',
  'tree.addlink',
  'tree.removelink',
  'updateNode',
  'addNode',
  'removeNode',
  'bind',
  'unbind'
];

var MARKER_NAMES = [
  'square',
  'parallelogram',
  'trapezoid',
  'circle',
  'diamond',
  'triangle',
  'ellipse',
  'star5',
  'star6',
  'star7',
  'star8',
  'rpoly5',
  'rpoly6',
  'rpoly7',
  'rpoly8',
  'gear5',
  'gear6',
  'gear7',
  'gear8',
  'pie',
];

var MISC = {
  DEFAULT_WIDTH: '100%',
  DEFAULT_HEIGHT: 480,
  DEFAULT_OUTPUT: 'svg',
};

const {DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_OUTPUT} = MISC;

var constants = {
  EVENT_NAMES,
  METHOD_NAMES,
  MARKER_NAMES,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_OUTPUT,
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var DEFAULT_WIDTH$1 = constants.DEFAULT_WIDTH,
    DEFAULT_HEIGHT$1 = constants.DEFAULT_HEIGHT,
    DEFAULT_OUTPUT$1 = constants.DEFAULT_OUTPUT,
    EVENT_NAMES$1 = constants.EVENT_NAMES,
    METHOD_NAMES$1 = constants.METHOD_NAMES;

// One time setup globally to handle all zingchart-react objects in the app space.

if (!window.ZCReact) {
  window.ZCReact = {
    instances: {},
    count: 0
  };
}

var ZingChart = function (_Component) {
  inherits(ZingChart, _Component);

  function ZingChart(props) {
    classCallCheck(this, ZingChart);

    var _this = possibleConstructorReturn(this, (ZingChart.__proto__ || Object.getPrototypeOf(ZingChart)).call(this, props));

    _this.id = _this.props.id || 'zingchart-react-' + window.ZCReact.count++;
    console.log(props);
    // Bind all methods available to zingchart to be accessed via Refs.
    METHOD_NAMES$1.forEach(function (name) {
      _this[name] = function (args) {
        return window.zingchart.exec(_this.id, name, args);
      };
    });
    _this.state = {
      style: {
        height: _this.props.height || DEFAULT_HEIGHT$1,
        width: _this.props.width || DEFAULT_WIDTH$1
      }
    };
    return _this;
  }

  createClass(ZingChart, [{
    key: 'render',
    value: function render() {
      return React__default.createElement('div', { id: this.id, style: this.state.style });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // Bind all events registered.
      Object.keys(this.props).forEach(function (eventName) {
        if (EVENT_NAMES$1.includes(eventName)) {
          // Filter through the provided events list, then register it to zingchart.
          window.zingchart.bind(_this2.id, eventName, function (result) {
            _this2.props[eventName](result);
          });
        }
      });

      this.renderChart();
    }

    // Used to check the values being passed in to avoid unnecessary changes.

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // Data change
      if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
        zingchart.exec(this.id, 'setdata', {
          data: nextProps.data
        });

        // Series change
      } else if (JSON.stringify(nextProps.series) !== JSON.stringify(this.props.series)) {
        zingchart.exec(this.id, 'setseriesdata', {
          graphid: 0,
          plotindex: 0,
          data: nextProps.series
        });

        // Resize
      } else if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
        this.setState({
          style: {
            width: nextProps.width || DEFAULT_WIDTH$1,
            height: nextProps.height || DEFAULT_HEIGHT$1
          }
        });
        zingchart.exec(this.id, 'resize', {
          width: nextProps.width || DEFAULT_WIDTH$1,
          height: nextProps.height || DEFAULT_HEIGHT$1
        });
      }

      // React should never re-render since ZingChart controls this component.
      return false;
    }
  }, {
    key: 'renderChart',
    value: function renderChart() {
      var _this3 = this;

      var renderObject = {};
      Object.keys(this.props).forEach(function (prop) {
        renderObject[prop] = _this3.props[prop];
      });
      // Overwrite some existing props.
      renderObject.id = this.id;
      renderObject.width = this.props.width || DEFAULT_WIDTH$1;
      renderObject.height = this.props.height || DEFAULT_HEIGHT$1;
      renderObject.data = this.props.data;
      renderObject.output = this.props.output || DEFAULT_OUTPUT$1;

      if (this.props.series) {
        renderObject.data.series = this.props.series;
      }
      if (this.props.theme) {
        renderObject.defaults = this.props.theme;
      }
      if (this.props.modules) {
        renderObject.modules = this.props.modules;
      }
      zingchart.render(renderObject);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      zingchart.exec(this.id, 'destroy');
    }
  }]);
  return ZingChart;
}(React.Component);

module.exports = ZingChart;
//# sourceMappingURL=zingchart-react.js.map
