d3.svg.tip = function() {
  var orient = 'top',
      padding = 5,
      cornerRadius = 2,
      stemSize = 90,
      offset = d3_svg_offset,
      text = d3_svg_text,
      node = make('g');

  function tip(d, i) {
    this.ownerSVGElement.appendChild(node);

    var tipOffset = offset.apply(this, arguments),
        tipText   = text.apply(this, arguments),
        container = d3.select(node),
        x, y, stem, backingRect, containerRect, stemRect;
    
    // Elements and Bounds
    var doc        = d3.select(this.ownerSVGElement),
        target     = d3.select(this),
        backing    = d3.select(make('rect')),
        docRect    = this.ownerSVGElement.getBoundingClientRect(),
        targetRect = this.getBBox();

    // FIXME: d3 has problems using `append` with nodes that were created
    // but not immediately added to the SVG dom.
    // Clear the container and add the rect backing
    container.text(' ').node().appendChild(backing.node())

    // The value to show in the tooltip
    var val = container.append('text').text(tipText).attr('text-anchor', 'middle').attr('alignment-baseline', 'middle'),
        valRect = val.node().getBBox();
    
    valRect.width = valRect.width + (padding * 2)
    valRect.height = valRect.height + (padding * 2)

    backing.attr('width', valRect.width)
      .attr('height', valRect.height)
      .attr('rx', cornerRadius)
      .attr('ry', cornerRadius)

    val.attr('dx', valRect.width / 2).attr('dy', valRect.height / 2)

    backingRect = backing.node().getBBox()

    // TODO: stem seems to report the wrong height, so it's never completely flush
    // against the backing rect.
    stem = container.append('path').attr('d', d3_svg_stem())
    stemRect = stem.node().getBBox()

    switch(orient) {
      case 'top':
        stem.attr('transform', 'translate(' + (backingRect.width / 2) + ',' + backingRect.height + ')');

        containerRect = container.node().getBBox()
        x = targetRect.x + (targetRect.width / 2) - (containerRect.width / 2) + tipOffset[0];
        y = targetRect.y - containerRect.height + tipOffset[1];
        break;
      
      case 'bottom':
        stem.attr('transform', 'translate(' + (backingRect.width / 2) + ',' + -(stemRect.height / 2) + ')');
        
        containerRect = container.node().getBBox()
        x = targetRect.x + (targetRect.width / 2) - (containerRect.width / 2) + tipOffset[0];
        y = targetRect.y + targetRect.height + stemRect.height - tipOffset[1];
        break;
      
      case 'left':
        stem.attr('transform', 'translate(' + backingRect.width + ',' + (backingRect.height / 2) + ') rotate(-90)');
        
        containerRect = container.node().getBBox()
        x = targetRect.x - targetRect.width - (containerRect.width / 2) - (stemRect.height / 2) + tipOffset[0];
        y = targetRect.y - (targetRect.height / 2) + tipOffset[1];
        break;
    }

    container.attr('transform', 'translate(' + x + ',' + y + ')')
  }

  function d3_svg_offset() {
    return [0, 0];
  }

  function d3_svg_text() {
    return ' ';
  }

  function d3_svg_stem() {
    return d3.svg.symbol().type(orient == 'bottom' ? 'triangle-up' : 'triangle-down').size(stemSize);
  }

  tip.attr = function(n, v) {
    d3.select(node).attr(n, v)
    return tip;
  }

  tip.orient = function(v) {
    if (!arguments.length) return orient;
    orient = v;
    return tip;
  };

  tip.padding = function(v) {
    if (!arguments.length) return padding;
    padding = v;
    return tip;
  };

  tip.cornerRadius = function(v) {
    if (!arguments.length) return cornerRadius;
    cornerRadius = v;
    return tip;
  };

  tip.stemSize = function(v) {
    if (!arguments.length) return stemSize;
    stemSize = v;
    return tip;
  };

  tip.offset = function(v) {
    if (!arguments.length) return offset;
    offset = v == null ? v: d3.functor(v);
    return tip;
  };  

  tip.text = function(v) {
    if (!arguments.length) return text;
    text = v == null ? v: d3.functor(v);

    return tip;
  };

  function make(e) {
    return document.createElementNS(d3.ns.prefix.svg, e);
  }

  return tip;
}