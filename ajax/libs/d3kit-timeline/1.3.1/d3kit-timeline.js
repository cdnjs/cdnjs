'use strict';

// Define module using Universal Module Definition pattern
// https://github.com/umdjs/umd/blob/master/returnExports.js

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // Support AMD. Register as an anonymous module.
    // EDIT: List all dependencies in AMD style
    define(['d3', 'd3kit', 'labella'], factory);
  }
  else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    // EDIT: Pass dependencies to factory function
    module.exports = factory(require('d3'), require('d3kit'), require('labella'));
  }
  else {
    // No AMD. Set module as a global variable
    // EDIT: Pass dependencies to factory function
    root.d3KitTimeline = factory(root.d3, root.d3Kit, root.labella);
  }
}(this,
//EDIT: The dependencies are passed to this function
function (d3, d3Kit, labella) {
  //---------------------------------------------------
  // BEGIN code for this module
  //---------------------------------------------------

  var DEFAULT_OPTIONS = {
    margin: {left: 40, right: 20, top: 20, bottom: 20},
    initialWidth: 400,
    initialHeight: 400,
    scale: d3.time.scale(),
    domain: undefined,
    direction: 'right',
    dotRadius: 3,
    layerGap: 60,
    labella: {},
    keyFn: undefined,
    timeFn: function(d){return d.time;},
    textFn: function(d){return d.text;},
    dotColor: '#222',
    labelBgColor: '#222',
    labelTextColor: '#fff',
    linkColor: '#222',
    labelPadding: {left: 4, right: 4, top: 3, bottom: 2},
    textYOffset: '0.85em'
  };

  var CUSTOM_EVENTS = [
    'dotClick',
    'dotMouseover',
    'dotMousemove',
    'dotMouseout',
    'labelClick',
    'labelMouseover',
    'labelMousemove',
    'labelMouseenter',
    'labelMouseleave',
    'labelMouseout'
  ];

  return d3Kit.factory.createChart(DEFAULT_OPTIONS, CUSTOM_EVENTS,
  function constructor(skeleton){
    // alias
    var options = skeleton.options();
    var dispatch = skeleton.getDispatcher();
    var layers = skeleton.getLayerOrganizer();

    layers.create(['dummy', {main:['axis', 'link', 'label', 'dot']}]);

    var force = new labella.Force(options.labella);

    var axis = d3.svg.axis();

    function rectWidth(d){
      return d.w;
    }

    function rectHeight(d){
      return d.h;
    }

    function timePos(d){
      return options.scale(options.timeFn(d));
    }

    dispatch.on('resize',  visualize);
    dispatch.on('options', visualize);
    dispatch.on('data', visualize);

    layers.get('main.axis').classed('axis', true);

    function visualize(){
      var data = skeleton.data() || [];

      if(options.domain){
        options.scale.domain(options.domain);
      }
      else{
        options.scale.domain(d3.extent(data, options.timeFn))
          .nice();
      }
      options.scale.range([0, (options.direction==='left' || options.direction==='right') ? skeleton.getInnerHeight() : skeleton.getInnerWidth()]);

      axis.scale(options.scale);

      var axisTransform;

      switch(options.direction){
        case 'right':
          axis.orient('left');
          axisTransform = 'translate('+(0)+','+(0)+')';
          break;
        case 'left':
          axis.orient('right');
          axisTransform ='translate('+(skeleton.getInnerWidth())+','+(0)+')';
          break;
        case 'up':
          axis.orient('bottom');
          axisTransform ='translate('+(0)+','+(skeleton.getInnerHeight())+')';
          break;
        case 'down':
          axis.orient('top');
          axisTransform = 'translate('+(0)+','+(0)+')';
          break;
      }

      layers.get('main')
        .attr('transform', axisTransform);

      layers.get('main.axis')
        .call(axis);

      drawDots(data);

      var labelTextStyle = d3Kit.helper.extend({}, options.textStyle);
      Object.keys(labelTextStyle).forEach(function(key){
        labelTextStyle[key] = d3.functor(labelTextStyle[key]);
      });
      // for backward compatibility
      labelTextStyle.fill = labelTextStyle.fill || d3.functor(options.labelTextColor);

      var dummyText = layers.get('dummy').append('text')
        .classed('label-text', true);

      var nodes = data.map(function(d){
        var bbox = dummyText
          .call(updateLabelText, labelTextStyle, d)[0][0]
          .getBBox();
        var w = bbox.width + options.labelPadding.left + options.labelPadding.right;
        var h = bbox.height + options.labelPadding.top + options.labelPadding.bottom;
        var node = new labella.Node(
          timePos(d),
          (options.direction==='left' || options.direction==='right') ? h : w,
          d
        );
        node.w = w;
        node.h = h;
        return node;
      });

      dummyText.remove();

      force.options(options.labella)
        .nodes(nodes)
        .compute();

      drawLabels(force.nodes(), labelTextStyle);

      return skeleton;
    }

    function drawDots(data){
      var selection = layers.get('main.dot').selectAll('circle.dot')
        .data(data, options.keyFn);

      var field = (options.direction==='left' || options.direction==='right') ? 'cy' : 'cx';

      selection.enter().append('circle')
        .classed('dot', true)
        .on('click', function(d, i){
          dispatch.dotClick(d, i);
        })
        .on('mouseover', function(d, i){
          dispatch.dotMouseover(d, i);
        })
        .on('mousemove', function(d, i){
          dispatch.dotMousemove(d, i);
        })
        .on('mouseout', function(d, i){
          dispatch.dotMouseout(d, i);
        })
        .style('fill', options.dotColor)
        .attr('r', options.dotRadius)
        .attr(field, timePos);

      selection.transition()
        .style('fill', options.dotColor)
        .attr('r', options.dotRadius)
        .attr(field, timePos);

      selection.exit().remove();
    }

    function drawLabels(nodes, labelTextStyle){
      var nodeHeight;
      if(options.direction==='left' || options.direction==='right'){
        nodeHeight = d3.max(nodes, rectWidth);
      }
      else{
        nodeHeight = d3.max(nodes, rectHeight);
      }

      var renderer = new labella.Renderer({
        nodeHeight: nodeHeight,
        layerGap: options.layerGap,
        direction: options.direction
      });

      renderer.layout(nodes);

      function nodePos(d){
        switch(options.direction){
          case 'right':
            return 'translate('+(d.x)+','+(d.y-d.dy/2)+')';
          case 'left':
            return 'translate('+(d.x + nodeHeight - d.w)+','+(d.y-d.dy/2)+')';
          case 'up':
            return 'translate('+(d.x-d.dx/2)+','+(d.y)+')';
          case 'down':
            return 'translate('+(d.x-d.dx/2)+','+(d.y)+')';
        }
      }

      var labelBgColor = d3.functor(options.labelBgColor);
      var linkColor = d3.functor(options.linkColor);

      // Draw label rectangles
      var selection = layers.get('main.label').selectAll('g.label-g')
        .data(nodes, options.keyFn ? function(d){return options.keyFn(d.data);} : undefined);

      var sEnter = selection.enter().append('g')
        .classed('label-g', true)
        .on('click', function(d, i){
          dispatch.labelClick(d.data, i);
        })
        .on('mouseover', function(d, i){
          dispatch.labelMouseover(d.data, i);
        })
        .on('mousemove', function(d, i){
          dispatch.labelMousemove(d.data, i);
        })
        .on('mouseenter', function(d, i){
          dispatch.labelMouseenter(d.data, i);
        })
        .on('mouseleave', function(d, i){
          dispatch.labelMouseleave(d.data, i);
        })
        .on('mouseout', function(d, i){
          dispatch.labelMouseout(d.data, i);
        })
        .attr('transform', nodePos);

      sEnter
        .append('rect')
        .classed('label-bg', true)
        .attr('rx', 2)
        .attr('ry', 2)
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .style('fill', function(d){return labelBgColor(d.data);});

      sEnter.append('text')
        .classed('label-text', true)
        .call(updateLabelText, labelTextStyle, function(d){return d.data;});

      var sTrans = selection.transition()
        .attr('transform', nodePos);

      sTrans.select('rect')
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .style('fill', function(d){return labelBgColor(d.data);});

      sTrans.select('text.label-text')
        .call(updateLabelText, labelTextStyle, function(d){return d.data;});

      selection.exit().remove();

      // Draw path from point on the timeline to the label rectangle
      var paths = layers.get('main.link').selectAll('path.link')
        .data(nodes, options.keyFn ? function(d){return options.keyFn(d.data);} : undefined);

      paths.enter().append('path')
        .classed('link', true)
        .attr('d', function(d){return renderer.generatePath(d);})
        .style('stroke', function(d){return linkColor(d.data);})
        .style('fill', 'none');

      paths.transition()
        .style('stroke', function(d){return linkColor(d.data);})
        .attr('d', function(d){return renderer.generatePath(d);});

      paths.exit().remove();
    }

    function updateLabelText(selection, textStyle, accessor){
      accessor = accessor ? d3.functor(accessor) : function(d){return d;};

      selection
        .text(function(d){return options.textFn(accessor(d));})
        .attr('dy', options.textYOffset)
        .attr('x', options.labelPadding.left)
        .attr('y', options.labelPadding.top);

      Object.keys(textStyle).forEach(function(key){
        var styleFn = textStyle[key];
        selection.style(key, function(d,i){return styleFn(accessor(d),i);});
      });

      return selection;
    }

    function resizeToFit(){
      var max;

      switch(options.direction){
        case 'up':
          max = d3.max(force.nodes(), function(d){return Math.abs(d.y);}) || 0;
          skeleton.height(max + options.margin.top + options.margin.bottom);
          break;
        case 'down':
          max = d3.max(force.nodes(), function(d){return Math.abs(d.y + d.dy);}) || 0;
          skeleton.height(max + options.margin.top + options.margin.bottom);
          break;
        case 'left':
          max = d3.max(force.nodes(), function(d){return Math.abs(d.x);}) || 0;
          skeleton.width(max + options.margin.left + options.margin.right);
          break;
        case 'right':
          max = d3.max(force.nodes(), function(d){return Math.abs(d.x + d.dx);}) || 0;
          skeleton.width(max + options.margin.left + options.margin.right);
          break;
      }

      return skeleton;
    }

    return skeleton.mixin({
      axis: axis,
      visualize: visualize,
      resizeToFit: resizeToFit
    });
  });

  //---------------------------------------------------
  // END code for this module
  //---------------------------------------------------
}));

