/*! line-chart - v0.0.1 - 2013-05-23
* https://github.com/angular-d3/line-chart
* Copyright (c) 2013 Angular D3; Licensed ,  */
'use strict';

/*global window */

describe('n3-linechart', function() {
  var elm, scope, isolatedScope;

  beforeEach(module('n3-charts.linechart'));

  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element('<div id="toto">' +
      '<linechart data="data" options="options"></linechart>' +
      '</div>');

    scope = $rootScope;
    $compile(elm)(scope);
    scope.$digest();
  }));

  beforeEach(function() {
    this.addMatchers({
      toBeSameStyleAs: function(expected) {
        var actual = this.actual;
        var notText = this.isNot ? " not" : "";

        this.message = function () {
          return "Expected " + actual + notText + " to be same as " + expected;
        };

        var exp = expected.split(/\s*;\s*/g);
        var comp = actual.split(/\s*;\s*/g);

        var colors = ['fill', 'stroke'];

        for (var key in exp) {
          if (comp[key] === undefined) {
            return false;
          }

          if (comp[key] !== exp[key]) {
            var spl = comp[key].split(/\s*:\s*/);
            var expSpl = exp[key].split(/\s*:\s*/);

            if (colors.indexOf(spl[0]) !== -1) {
              if (d3.rgb(spl[1]).toString() !== d3.rgb(expSpl[1]).toString()) {
                return false;
              }
            } else {
              return false;
            }
          }
        }

        return true;
      }
    });
  });

describe('area series', function() {

  beforeEach(inject(function(n3utils) {
    spyOn(n3utils, 'getDefaultMargins').andReturn(
      {top: 20, right: 50, bottom: 30, left: 50}
    );
  }));

  beforeEach(function() {
    scope.$apply(function() {
      scope.data = [
        {x: 0, value: 4}, {x: 1, value: 8}, {x: 2, value: 15},
        {x: 3, value: 16}, {x: 4, value: 23}, {x: 5, value: 42}
      ];

      scope.options = {
        series: [{y: 'value', color: '#4682b4', type: 'area'} ]
      };
    });
  });

  it('should properly configure y axis', function() {
    var yAxis = elm.find('svg').children()[0].childNodes[1];

    var ticks = yAxis.childNodes;

    expect(ticks.length).toBe(12);

    expect(ticks[0].textContent).toBe('0');
    expect(ticks[10].textContent).toBe('50');
  });

  it('should properly configure x axis', function() {
    var xAxis = elm.find('svg').children()[0].childNodes[0];

    var ticks = xAxis.childNodes;

    expect(ticks.length).toBe(12);

    expect(ticks[0].textContent).toBe('0.0');
    expect(ticks[10].textContent).toBe('5.0');
  });

  it('should create 3 elements', function() {
    var svgGroup = elm.find('svg').children()[0];
    var content = svgGroup.childNodes[4];
    expect(content.childNodes.length).toBe(3);
  });

  it('should create an area group', function() {
    var svgGroup = elm.find('svg').children()[0];
    var content = svgGroup.childNodes[4];

    var areaGroup = content.childNodes[0];
    expect(areaGroup.getAttribute('class')).toBe('areaGroup series_0');
    expect(areaGroup.getAttribute('style').trim()).toBeSameStyleAs('fill: #4682b4;');

    var areaPath = areaGroup.childNodes[0];
    expect(areaPath.getAttribute('class')).toBe('area');
    expect(areaPath.getAttribute('d'))
      .toBe('M0,414L161,378L322,315L483,306L644,243L805,72L805,450L644,' +
        '450L483,450L322,450L161,450L0,450Z');
  });

  it('should create a line group', function() {
    var svgGroup = elm.find('svg').children()[0];
    var content = svgGroup.childNodes[4];

    var lineGroup = content.childNodes[1];
    expect(lineGroup.getAttribute('class')).toBe('lineGroup series_0');
    expect(lineGroup.getAttribute('style').trim()).toBeSameStyleAs('stroke: #4682b4;');
  });

  it('should create a dots group', function() {
    var svgGroup = elm.find('svg').children()[0];
    var content = svgGroup.childNodes[4];

    var dotsGroup = content.childNodes[2];
    expect(dotsGroup.nodeName).toBe('g');

    var dots = dotsGroup.childNodes;
    expect(dots.length).toBe(6);

    var expectedCoordinates = [
      {x: '0', y: '414'},
      {x: '161', y: '378'},
      {x: '322', y: '315'},
      {x: '483', y: '306'},
      {x: '644', y: '243'},
      {x: '805', y: '72'}
    ];

    for (var i = 0; i < dots.length; i++) {
      expect(dots[i].nodeName).toBe('circle');
      expect(dots[i].getAttribute('cx')).toBe(expectedCoordinates[i].x);
      expect(dots[i].getAttribute('cy')).toBe(expectedCoordinates[i].y);
    }
  });
});

describe('chart when initializing', function() {
  it('should create one svg element', function() {
    expect(elm[0].getAttribute('id')).toBe('toto');

    var templateElmts = elm[0].children;
    expect(templateElmts.length).toBe(1);
    expect(templateElmts[0].nodeName).toBe('DIV'); // this is the template's div
    expect(templateElmts[0].getAttribute('class')).toBe('chart');

    var dynamicChildren = templateElmts[0].children;
    expect(dynamicChildren.length).toBe(1);
    expect(dynamicChildren[0].nodeName).toBe('svg');
  });

  it('should draw two axes by default', function() {
    var svgGroup = elm.find('svg').children()[0];

    var content = svgGroup.childNodes;
    expect(content.length).toBe(6);

    expect(content[0].getAttribute('class')).toBe('x axis');
    expect(content[1].getAttribute('class')).toBe('y axis');
    expect(content[2].getAttribute('id')).toBe('xTooltip');
    expect(content[3].getAttribute('id')).toBe('yTooltip');
  });

  it('should draw three axes whan said so', function() {
    scope.$apply(function() {
      scope.options = {series: [
        {axis: 'y', y: 'value', color: '#4682b4'},
        {axis: 'y2', y: 'value', color: '#4682b4'}
      ]};
    });

    var svgGroup = elm.find('svg').children()[0];

    var content = svgGroup.childNodes;
    expect(content.length).toBe(8);

    expect(content[0].getAttribute('class')).toBe('x axis');
    expect(content[1].getAttribute('class')).toBe('y axis');
    expect(content[2].getAttribute('class')).toBe('y2 axis');
    expect(content[3].getAttribute('id')).toBe('xTooltip');
    expect(content[4].getAttribute('id')).toBe('yTooltip');
    expect(content[5].getAttribute('id')).toBe('y2Tooltip');
  });

  xit('should draw data', function() {
    scope.$apply(function() {
      scope.data = [
        {x: 0, value: 4, foo: -2}, {x: 1, value: 8, foo: 22}, {x: 2, value: 15, foo: -1},
        {x: 3, value: 16, foo: 0}, {x: 4, value: 23, foo: -3}, {x: 5, value: 42, foo: -4}
      ];

      scope.options = {
        series: [
          {axis: 'y', y: 'value', color: '#4682b4', type: 'area'},
          {axis: 'y2', y: 'foo', color: 'steelblue', type: 'area'}
        ]
      };
    });
  });
});

describe('column series', function() {
  beforeEach(inject(function(n3utils) {
    spyOn(n3utils, 'getDefaultMargins').andReturn(
      {top: 20, right: 50, bottom: 30, left: 50}
    );
  }));

  beforeEach(function() {
    scope.$apply(function() {
      scope.data = [
        {x: 0, value: 4}, {x: 1, value: 8}, {x: 2, value: 15},
        {x: 3, value: 16}, {x: 4, value: 23}, {x: 5, value: 42}
      ];

      scope.options = {series: [{y: 'value', color: '#4682b4', type: 'column'}]};
    });
  });

  it('should properly configure y axis', function() {
    var yAxis = elm.find('svg').children()[0].childNodes[1];

    var ticks = yAxis.childNodes;

    expect(ticks.length).toBe(12);

    expect(ticks[0].textContent).toBe('0');
    expect(ticks[10].textContent).toBe('50');
  });

  it('should configure x axis with extra space', function() {
    var xAxis = elm.find('svg').children()[0].childNodes[0];

    var ticks = xAxis.childNodes;

    expect(ticks.length).toBe(9);

    expect(ticks[0].textContent).toBe('0');
    expect(ticks[7].textContent).toBe('6');
  });

  it('should create a group', function() {
    var svgGroup = elm.find('svg').children()[0];

    var content = svgGroup.childNodes[4];
    expect(content.getAttribute('class')).toBe('content');
    expect(content.childNodes.length).toBe(1);

    var lineGroup = content.childNodes[0];
    expect(lineGroup.getAttribute('class')).toBe('columnGroup series_0');
    expect(lineGroup.getAttribute('style').trim()).toBeSameStyleAs('fill: #4682b4; fill-opacity: 0.8;');
  });

  it('should draw columns', function() {
    var svgGroup = elm.find('svg').children()[0];
    var content = svgGroup.childNodes[4];
    var columnGroup = content.childNodes[0];
    expect(columnGroup.nodeName).toBe('g');

    var columns = columnGroup.childNodes;
    expect(columns.length).toBe(6);

    var expectedCoordinates = [
      {x: '115', y: '414'},
      {x: '230', y: '378'},
      {x: '345', y: '315'},
      {x: '460', y: '306'},
      {x: '575', y: '243'},
      {x: '690', y: '72'}
    ];

    for (var i = 0; i < columns.length; i++) {
      expect(columns[i].nodeName).toBe('rect');
      expect(columns[i].getAttribute('x')).toBe(expectedCoordinates[i].x);
      expect(columns[i].getAttribute('y')).toBe(expectedCoordinates[i].y);
    }
  });
});

describe('legend', function() {
  beforeEach(function() {
    scope.$apply(function() {
      scope.data = [{x: 0, value: 4}, {x: 1, value: 8}];

      scope.options = {series: [
        {y: 'value', color: '#4682b4', label: 'toto'},
        {y: 'value', axis: 'y2', color: '#4682b4', type: 'column'}
      ]};
    });
  });

  it('create legend elements', function() {
    var svgGroup = elm.find('svg').children()[0];

    var content = svgGroup.childNodes;

    var legendGroup = content[7];
    expect(legendGroup.getAttribute('class')).toBe('legend');

    expect(legendGroup.childNodes.length).toBe(2);

    var l_0 = legendGroup.childNodes[0];
    expect(l_0.getAttribute('class')).toBe('legendItem');

    expect(l_0.childNodes[0].nodeName).toBe('circle');
    expect(l_0.childNodes[0].getAttribute('fill')).toBe('#4682b4');

    var e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    l_0.childNodes[0].dispatchEvent(e);

    l_0.childNodes[0].dispatchEvent(e);
  });
});

describe('lineMode set to cardinal', function() {
  beforeEach(inject(function(n3utils) {
    spyOn(n3utils, 'getDefaultMargins').andReturn(
      {top: 20, right: 50, bottom: 30, left: 50}
    );
  }));

  beforeEach(function() {
    scope.$apply(function() {
      scope.data = [
        {x: 0, value: 4}, {x: 1, value: 8}, {x: 2, value: 15},
        {x: 3, value: 16}, {x: 4, value: 23}, {x: 5, value: 42}
      ];

      scope.options = {
        lineMode: 'cardinal',
        series: [{y: 'value', color: '#4682b4', type: 'area'} ]
      };
    });
  });

  it('should draw an interpolated area', function() {
    var svgGroup = elm.find('svg').children()[0];
    var content = svgGroup.childNodes[4];

    var areaGroup = content.childNodes[0];
    expect(areaGroup.getAttribute('class')).toBe('areaGroup series_0');
    expect(areaGroup.getAttribute('style').trim()).toBeSameStyleAs('fill: #4682b4;');

    var areaPath = areaGroup.childNodes[0];
    expect(areaPath.getAttribute('class')).toBe('area');
    expect(areaPath.getAttribute('d'))
      .toBe(
        'M0,414Q128.8,387.9,161,378C209.3,363.15,273.7,325.8,322,315S434.7,' +
        '316.8,483,306S595.7,278.1,644,243Q676.2,219.6,805,72L805,450Q676.2' +
        ',450,644,450C595.7,450,531.3,450,483,450S370.3,450,322,450S209.3,4' +
        '50,161,450Q128.8,450,0,450Z'
      );
  });

  it('should draw an interpolated line', function() {
    var content = elm.find('svg').children()[0].childNodes[4];
    var lineGroup = content.childNodes[1];

    var linePath = lineGroup.childNodes[0];
    expect(linePath.getAttribute('class')).toBe('line');
    expect(linePath.getAttribute('d'))
      .toBe(
        'M0,414Q128.8,387.9,161,378C209.3,363.15,273.7,325.8,322,315S434.7' +
        ',316.8,483,306S595.7,278.1,644,243Q676.2,219.6,805,72'
      );
  });

  it('should create a dots group with coordinates unchanged', function() {
    var svgGroup = elm.find('svg').children()[0];
    var content = svgGroup.childNodes[4];

    var dotsGroup = content.childNodes[2];
    expect(dotsGroup.nodeName).toBe('g');

    var dots = dotsGroup.childNodes;
    expect(dots.length).toBe(6);

    var expectedCoordinates = [
      {x: '0', y: '414'},
      {x: '161', y: '378'},
      {x: '322', y: '315'},
      {x: '483', y: '306'},
      {x: '644', y: '243'},
      {x: '805', y: '72'}
    ];

    for (var i = 0; i < dots.length; i++) {
      expect(dots[i].nodeName).toBe('circle');
      expect(dots[i].getAttribute('cx')).toBe(expectedCoordinates[i].x);
      expect(dots[i].getAttribute('cy')).toBe(expectedCoordinates[i].y);
    }
  });
});

describe('line series', function() {
  beforeEach(inject(function(n3utils) {
    spyOn(n3utils, 'getDefaultMargins').andReturn(
      {top: 20, right: 50, bottom: 30, left: 50}
    );
  }));

  beforeEach(function() {
    scope.$apply(function() {
      scope.data = [
        {x: 0, value: 4}, {x: 1, value: 8}, {x: 2, value: 15},
        {x: 3, value: 16}, {x: 4, value: 23}, {x: 5, value: 42}
      ];

      scope.options = {series: [{y: 'value', color: '#4682b4'} ]};
    });
  });

  it('should properly configure y axis', function() {
    var yAxis = elm.find('svg').children()[0].childNodes[1];

    var ticks = yAxis.childNodes;

    expect(ticks.length).toBe(12);

    expect(ticks[0].textContent).toBe('0');
    expect(ticks[10].textContent).toBe('50');
  });

  it('should properly configure x axis', function() {
    var xAxis = elm.find('svg').children()[0].childNodes[0];

    var ticks = xAxis.childNodes;

    expect(ticks.length).toBe(12);

    expect(ticks[0].textContent).toBe('0.0');
    expect(ticks[10].textContent).toBe('5.0');
  });

  it('should create a group', function() {
    var svgGroup = elm.find('svg').children()[0];

    var content = svgGroup.childNodes[4];
    expect(content.childNodes.length).toBe(2);

    var lineGroup = content.childNodes[0];
    expect(lineGroup.getAttribute('class')).toBe('lineGroup series_0');
    expect(lineGroup.getAttribute('style').trim()).toBeSameStyleAs('stroke: #4682b4;');
  });

  it('should draw dots', function() {
    var svgGroup = elm.find('svg').children()[0];
    var content = svgGroup.childNodes[4];
    var dotsGroup = content.childNodes[1];
    expect(dotsGroup.nodeName).toBe('g');

    var dots = dotsGroup.childNodes;
    expect(dots.length).toBe(6);

    var expectedCoordinates = [
      {x: '0', y: '414'},
      {x: '161', y: '378'},
      {x: '322', y: '315'},
      {x: '483', y: '306'},
      {x: '644', y: '243'},
      {x: '805', y: '72'}
    ];

    for (var i = 0; i < dots.length; i++) {
      expect(dots[i].nodeName).toBe('circle');
      expect(dots[i].getAttribute('cx')).toBe(expectedCoordinates[i].x);
      expect(dots[i].getAttribute('cy')).toBe(expectedCoordinates[i].y);
    }
  });

  it('should draw a line', function() {
    var content = elm.find('svg').children()[0].childNodes[4];
    var lineGroup = content.childNodes[0];

    var linePath = lineGroup.childNodes[0];
    expect(linePath.getAttribute('class')).toBe('line');
    expect(linePath.getAttribute('d'))
      .toBe('M0,414L161,378L322,315L483,306L644,243L805,72');
  });
});

describe('n3utils', function() {

  describe('getBestColumnWidth', function() {
    it('should handle no data', inject(function(n3utils) {
      expect(n3utils.getBestColumnWidth({}, [])).toBe(10);
    }));
  });

  describe('sanitizeOptions', function() {
    it('should return default options when given null or undefined', inject(function(n3utils) {
      expect(n3utils.sanitizeOptions()).toEqual(
        {lineMode: 'linear', axes: {x: {type: 'linear'}, y: {}}, series: []}
        );
    }));

    it('should set default axes and empty series', inject(function(n3utils) {
      expect(n3utils.sanitizeOptions({})).toEqual(
        {lineMode: 'linear', axes: {x: {type: 'linear'}, y: {}}, series: []}
        );
    }));

    it('should set default x axis type to linear', inject(function(n3utils) {
      expect(n3utils.sanitizeOptions(
        {lineMode: 'linear', axes: {x: {}, y: {}}, series: []})).toEqual(
      {lineMode: 'linear', axes: {x: {type: 'linear'}, y: {}}, series: []}
      );
      }));

    it('should set default y axis', inject(function(n3utils) {
      expect(n3utils.sanitizeOptions(
        {lineMode: 'linear', axes: {x: {}}, series: []})).toEqual(
      {lineMode: 'linear', axes: {x: {type: 'linear'}, y: {}}, series: []}
      );
      }));

    it('should set default x axis', inject(function(n3utils) {
      expect(n3utils.sanitizeOptions(
        {lineMode: 'linear', axes: {}, series: []})).toEqual(
      {lineMode: 'linear', axes: {x: {type: 'linear'}, y: {}}, series: []}
      );
      }));
  });

it('should compute data per series', inject(function(n3utils) {
  var data = [
  {x: 0, foo: 4.154, value: 4},
  {x: 1, foo: 8.15485, value: 8}
  ];

  var xFormatter = function(text) {return ''};

  var options = {
    axes: {x: {tooltipFormatter: xFormatter}},
    series: [
    {y: 'value', axis: 'y2', color: 'steelblue'},
    {y: 'foo', color: 'red', type: 'area'}
    ]
  };

  var expected = [{
    xFormatter: xFormatter,
    name: 'value', color: 'steelblue', axis: 'y2', type: 'line', index: 0,
    values: [
    {x: 0, value: 4, axis: 'y2'}, {x: 1, value: 8, axis: 'y2'}
    ]
  }, {
    xFormatter: xFormatter,
    name: 'foo', color: 'red', axis: 'y', type: 'area', index: 1,
    values: [
    {x: 0, value: 4.154, axis: 'y'}, {x: 1, value: 8.15485, axis: 'y'}
    ]
  }];

  var computed = n3utils.getDataPerSeries(data, options);

  expect(computed).toEqual(expected);

}));

it('should compute the widest y value', inject(function(n3utils) {
  var data = [
  {x: 0, foo: 4.154, value: 4},
  {x: 1, foo: 8.15485, value: 8},
  {x: 2, foo: 1.1548578, value: 15},
  {x: 3, foo: 1.154, value: 16},
  {x: 4, foo: 2.45, value: 23},
  {x: 5, foo: 4, value: 42}
  ];

  var series = [{y: 'value'}];
  expect(n3utils.getWidestOrdinate(data, series)).toBe(15);

  series = [{y: 'value'}, {y: 'foo'}];
  expect(n3utils.getWidestOrdinate(data, series)).toBe(1.1548578);
}));

describe('adjustMargins', function() {
  beforeEach(inject(function(n3utils) {
    spyOn(n3utils, 'getDefaultMargins').andReturn(
      {top: 20, right: 50, bottom: 30, left: 50}
      );
  }));

  it('should return default margins for no series', inject(function(n3utils) {
    var data = [
    {x: 0, foo: 4.154, value: 4},
    {x: 1, foo: 8.15485, value: 8},
    {x: 2, foo: 1.1548578, value: 15},
    {x: 3, foo: 1.154, value: 16},
    {x: 4, foo: 2.45, value: 23},
    {x: 5, foo: 4, value: 42}
    ];

    var dimensions = {left: 10, right: 10};

    var options = {series: []};
    n3utils.adjustMargins(dimensions, options, data);

    expect(dimensions).toEqual({left: 45, right: 50, top: 20, bottom: 30});
  }));

  it('should adjust margins for one left series', inject(function(n3utils) {
    var data = [
    {x: 0, foo: 4.154, value: 4},
    {x: 1, foo: 8.15485, value: 8},
    {x: 2, foo: 1.1548578, value: 15},
    {x: 3, foo: 1.154, value: 16},
    {x: 4, foo: 2.45, value: 23},
    {x: 5, foo: 4, value: 42}
    ];

    var dimensions = {left: 10, right: 10};

    var options = {series: [{y: 'value'}]};
    n3utils.adjustMargins(dimensions, options, data);
    expect(dimensions).toEqual(
        {left: 45, right: 50, top: 20, bottom: 30} // 50 is default
        );
  }));

  it('should adjust margins for two left series', inject(function(n3utils) {
    var data = [
    {x: 0, foo: 4.154, value: 4},
    {x: 1, foo: 8.15485, value: 8},
    {x: 2, foo: 1.1548578, value: 15},
    {x: 3, foo: 1.154, value: 16},
    {x: 4, foo: 2.45, value: 23},
    {x: 5, foo: 4, value: 42}
    ];

    var dimensions = {left: 10, right: 10};

    var options = {series: [{y: 'value'}, {y: 'foo'}]};
    n3utils.adjustMargins(dimensions, options, data);
    expect(dimensions).toEqual(
      {left: 80.30000000000001, right: 50, top: 20, bottom: 30}
      );
  }));

  it('should adjust margins for one left series and one right series', inject(function(n3utils) {
    var data = [
    {x: 0, foo: 4.154, value: 4},
    {x: 1, foo: 8.15485, value: 8},
    {x: 2, foo: 1.1548578, value: 15},
    {x: 3, foo: 1.154, value: 16},
    {x: 4, foo: 2.45, value: 23},
    {x: 5, foo: 4, value: 42}
    ];

    var dimensions = {left: 10, right: 10};

    var options = {series: [{y: 'value'}, {axis: 'y2', y: 'foo'}]};
    n3utils.adjustMargins(dimensions, options, data);
    expect(dimensions).toEqual(
      {left: 45, right: 80.30000000000001, top: 20, bottom: 30}
      );
  }));

});
});

describe('resize features', function() {
  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element('<div id="toto">' +
      '<linechart></linechart>' +
      '</div>');

    scope = $rootScope;
    $compile(elm)(scope);

    isolatedScope = angular.element(elm.children()[0]).scope();
    spyOn(isolatedScope, 'redraw');
    spyOn(isolatedScope, 'update').andCallThrough();

    scope.$digest();
  }));

  it('should update when $window resize', inject(function($window) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent('resize', true, false);
    $window.dispatchEvent(e);
  }));

  it('should pass the new dimensions to redraw when $window is resized ',
  inject(function($window) {
    spyOn(isolatedScope, 'updateDimensions').andCallFake(function(d) {
      d.width = 120;
      d.height = 50;
    });

    // This could be better...
    var e = document.createEvent('HTMLEvents');
    e.initEvent('resize', true, false);
    $window.dispatchEvent(e);
  }));
});

describe('with a second axis', function() {
  beforeEach(inject(function(n3utils) {
    spyOn(n3utils, 'getDefaultMargins').andReturn(
      {top: 20, right: 50, bottom: 30, left: 50}
      );
  }));

  beforeEach(function() {
    scope.$apply(function() {
      scope.data = [
        {x: 0, value: 4, foo: -2}, {x: 1, value: 8, foo: 22}, {x: 2, value: 15, foo: -1},
        {x: 3, value: 16, foo: 0}, {x: 4, value: 23, foo: -3}, {x: 5, value: 42, foo: -4}
      ];

      scope.options = {
        series: [
          {axis: 'y', y: 'value', color: '#4682b4', type: 'area'},
          {axis: 'y2', y: 'foo', color: 'steelblue', type: 'area'}
        ]
      };
    });
  });

  it('should configure y axis only with y series', function() {
    var yAxis = elm.find('svg').children()[0].childNodes[1];

    var ticks = yAxis.childNodes;

    expect(ticks.length).toBe(12);

    expect(ticks[0].textContent).toBe('0');
    expect(ticks[10].textContent).toBe('50');
  });

  it('should properly configure y2 axis', function() {
    var y2Axis = elm.find('svg').children()[0].childNodes[2];

    var ticks = y2Axis.childNodes;

    expect(ticks.length).toBe(15);

    expect(ticks[0].textContent).toBe('0');
    expect(ticks[10].textContent).toBe('16');
  });

  it('should draw two lines', function() {
    var content = elm.find('svg').children()[0].childNodes[6];

    var leftLinePath = content.childNodes[2].childNodes[0];
    expect(leftLinePath.getAttribute('class')).toBe('line');
    expect(leftLinePath.getAttribute('d'))
      .toBe('M0,414L162,378L324,315L486,306L648,243L810,72');

    var rightLinePath = content.childNodes[3].childNodes[0];
    expect(rightLinePath.getAttribute('class')).toBe('line');
    expect(rightLinePath.getAttribute('d'))
      .toBe('M0,415L162,0L324,398L486,381L648,433L810,450');
  });

  it('should draw y area', function() {
    var content = elm.find('svg').children()[0].childNodes[6];

    var areaGroup = content.childNodes[0];
    expect(areaGroup.getAttribute('class')).toBe('areaGroup series_0');
    expect(areaGroup.getAttribute('style').trim()).toBeSameStyleAs('fill: #4682b4;');

    var areaPath = areaGroup.childNodes[0];
    expect(areaPath.getAttribute('class')).toBe('area');
    expect(areaPath.getAttribute('d'))
      .toBe('M0,414L162,378L324,315L486,306L648,243L810,72L810,450L648,' +
        '450L486,450L324,450L162,450L0,450Z');
  });

  it('should draw y2 area', function() {
    var content = elm.find('svg').children()[0].childNodes[6];

    var areaGroup = content.childNodes[1];
    expect(areaGroup.getAttribute('class')).toBe('areaGroup series_1');
    expect(areaGroup.getAttribute('style').trim()).toBeSameStyleAs('fill: #4682b4;');

    var areaPath = areaGroup.childNodes[0];
    expect(areaPath.getAttribute('class')).toBe('area');
    expect(areaPath.getAttribute('d'))
      .toBe('M0,415L162,0L324,398L486,381L648,433L810,450L810,381L648,' +
        '381L486,381L324,381L162,381L0,381Z');
  });

  it('should draw y axis dots', function() {
    var content = elm.find('svg').children()[0].childNodes[6];

    var leftDotsGroup = content.childNodes[4];
    expect(leftDotsGroup.nodeName).toBe('g');

    var dots = leftDotsGroup.childNodes;
    expect(dots.length).toBe(6);

    var expectedCoordinates = [
      {x: '0', y: '414'},
      {x: '162', y: '378'},
      {x: '324', y: '315'},
      {x: '486', y: '306'},
      {x: '648', y: '243'},
      {x: '810', y: '72'}
    ];

    for (var i = 0; i < dots.length; i++) {
      expect(dots[i].nodeName).toBe('circle');
      expect(dots[i].getAttribute('cx')).toBe(expectedCoordinates[i].x);
      expect(dots[i].getAttribute('cy')).toBe(expectedCoordinates[i].y);
    }
  });

  it('should draw y2 axis dots', function() {
    var content = elm.find('svg').children()[0].childNodes[6];

    var leftDotsGroup = content.childNodes[5];
    expect(leftDotsGroup.nodeName).toBe('g');

    var dots = leftDotsGroup.childNodes;
    expect(dots.length).toBe(6);

    var expectedCoordinates = [
      {x: '0', y: '415'},
      {x: '162', y: '0'},
      {x: '324', y: '398'},
      {x: '486', y: '381'},
      {x: '648', y: '433'},
      {x: '810', y: '450'}
    ];

    for (var i = 0; i < dots.length; i++) {
      expect(dots[i].nodeName).toBe('circle');
      expect(dots[i].getAttribute('cx')).toBe(expectedCoordinates[i].x);
      expect(dots[i].getAttribute('cy')).toBe(expectedCoordinates[i].y);
    }
  });
});

describe('thumbnail when initializing', function() {
  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element('<div id="toto">' +
      '<linechart mode="thumbnail"></linechart>' +
      '</div>');

    scope = $rootScope;
    $compile(elm)(scope);
    scope.$digest();
  }));

  it('should create one svg element', function() {
    expect(elm[0].getAttribute('id')).toBe('toto');

    var templateElmts = elm[0].children;
    expect(templateElmts.length).toBe(1);
    expect(templateElmts[0].nodeName).toBe('DIV'); // this is the template's div
    expect(templateElmts[0].getAttribute('class')).toBe('chart');

    var dynamicChildren = templateElmts[0].children;
    expect(dynamicChildren.length).toBe(1);
    expect(dynamicChildren[0].nodeName).toBe('svg');
  });

  it('should draw zero axes', function() {
    var svgGroup = elm.find('svg').children()[0];

    var content = svgGroup.childNodes;
    expect(content.length).toBe(1);
  });
});

describe('time series', function() {
  beforeEach(function() {
    var then = 1369145776795;
    
    scope.$apply(function() {
      scope.data = [
        {x: new Date(then + 0*3600), value: 4, foo: -2},
        {x: new Date(then + 1*3600), value: 8, foo: 22},
        {x: new Date(then + 2*3600), value: 15, foo: -1},
        {x: new Date(then + 3*3600), value: 16, foo: 0},
        {x: new Date(then + 4*3600), value: 23, foo: -3},
        {x: new Date(then + 5*3600), value: 42, foo: -4}
      ];
      
      scope.options = {
        axes: {x: {type: 'date'}},
        series: [
          {axis: 'y', y: 'value', color: '#4682b4', type: 'column'},
          {axis: 'y2', y: 'foo', color: 'steelblue', type: 'area'}
        ]
      };
    });
    
  });
  
  it('should properly configure x axis', function() {
    var xAxis = elm.find('svg').children()[0].childNodes[0];

    var ticks = xAxis.childNodes;
    
    expect(ticks.length).toBe(6);

    expect(ticks[0].textContent).toBe(':15');
    expect(ticks[4].textContent).toBe(':35');
  });
});

describe('tooltip', function() {
  var ttSpy;
  beforeEach(function() {
    scope.$apply(function() {
      scope.data = [{x: 0, value: 4}, {x: 1, value: 8}];

      ttSpy = jasmine.createSpy('tooltipFormatter').andReturn('pouet');

      scope.options = {
        axes: {x: {tooltipFormatter: ttSpy}},
        series: [
        {y: 'value', color: '#4682b4'},
        {y: 'value', axis: 'y2', color: '#4682b4', type: 'column'}
      ]};
    });
  });

  it('should show/hide the tooltip when hovering/leaving a left axis dot', function() {
    var svgGroup = elm.find('svg').children()[0];

    var content = svgGroup.childNodes;

    var leftAxisDotGroup = content[6].childNodes[2];

    expect(leftAxisDotGroup.getAttribute('class')).toBe('dotGroup series_0');

    var xTooltip = content[3];
    expect(xTooltip.getAttribute('id')).toBe('xTooltip');

    var e = document.createEvent("MouseEvents");
    e.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    leftAxisDotGroup.dispatchEvent(e);

    e.initMouseEvent("mouseout", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    leftAxisDotGroup.dispatchEvent(e);

    expect(ttSpy).toHaveBeenCalled();
  });

  it('should work when no x-formatter is found', function() {
    scope.$apply(function() {
      scope.options = {
        series: [
        {y: 'value', color: '#4682b4'},
        {y: 'value', axis: 'y2', color: '#4682b4', type: 'column'}
      ]};
    });

    var svgGroup = elm.find('svg').children()[0];

    var content = svgGroup.childNodes;

    var leftAxisDotGroup = content[6].childNodes[2];

    expect(leftAxisDotGroup.getAttribute('class')).toBe('dotGroup series_0');

    var xTooltip = content[3];
    expect(xTooltip.getAttribute('id')).toBe('xTooltip');

    var e = document.createEvent("MouseEvents");
    e.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    leftAxisDotGroup.dispatchEvent(e);

    e.initMouseEvent("mouseout", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    leftAxisDotGroup.dispatchEvent(e);
  });


  it('should show/hide the tooltip when hovering/leaving a right axis column', function() {
    var svgGroup = elm.find('svg').children()[0];

    var content = svgGroup.childNodes;

    var rightAxisColumnGroup = content[6].childNodes[0];

    expect(rightAxisColumnGroup.getAttribute('class')).toBe('columnGroup series_1');

    var xTooltip = content[3];
    expect(xTooltip.getAttribute('id')).toBe('xTooltip');

    var e = document.createEvent("MouseEvents");
    e.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    rightAxisColumnGroup.dispatchEvent(e);

    e.initMouseEvent("mouseout", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    rightAxisColumnGroup.dispatchEvent(e);
  });
});

});