// Public - contructs a new tooltip
//
// Returns a tip
d3.svg.tip = function() {
  var orient = 'top',
      padding = 5,
      cornerRadius = 2,
      stemSize = 50,
      offset = d3_svg_offset,
      text = d3_svg_text,
      node = make('g');

  function tip(d, i) {
    this.ownerSVGElement.appendChild(node);

    var tipOffset = offset.apply(this, arguments),
        tipText   = text.apply(this, arguments),
        container = d3.select(node),
        tag = this.tagName.toLowerCase(),
        loc, stem, stem_gen, backingRect, containerRect, stemRect, d3_orient_types;
    
    // Elements and Bounds
    var doc        = d3.select(this.ownerSVGElement),
        target     = d3.select(this),
        backing    = d3.select(make('rect')),
        docRect    = this.ownerSVGElement.getBoundingClientRect(),
        targetRect = this.getBBox();

    // TODO: Allow ability to specify this in someway
    target.on('mouseout', function() { container.remove() })

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
    stem_gen = d3.svg.symbol().type('triangle-down').size(stemSize)
    stem = container.append('path').attr('d', stem_gen())
    stemRect = stem.node().getBBox()

    d3_orient_types = {
      top: function() {
        stem.attr('transform', 'translate(' + (backingRect.width / 2) + ',' + backingRect.height + ')');
        containerRect = container.node().getBBox()
        x = targetRect.x + (targetRect.width / 2) - (containerRect.width / 2) + tipOffset[0];
        y = targetRect.y - containerRect.height + tipOffset[1];
        
        return {x: x, y: y}   
      },

      // Bottom is the only tooltip that uses a stem with triangle-up, so we need to do 
      // a little more work here.
      bottom: function() {
        stem.remove()
        stem_gen = d3.svg.symbol().type('triangle-up').size(stemSize)
        stem = container.append('path').attr('d', stem_gen())
        
        stemRect = stem.node().getBBox()
        stem.attr('transform', 'translate(' + (backingRect.width / 2) + ',' + -(stemRect.height / 2) + ')');
        
        containerRect = container.node().getBBox()
        x = targetRect.x + (targetRect.width / 2) - (containerRect.width / 2) + tipOffset[0];
        y = targetRect.y + targetRect.height + stemRect.height - tipOffset[1]
        
        return {x: x, y: y}        
      },

      left: function() {
        stem.attr('transform', 'translate(' + backingRect.width + ',' + (backingRect.height / 2) + ') rotate(-90)');
        
        containerRect = container.node().getBBox()
        x = targetRect.x - (stemRect.height / 2) + tipOffset[0];
        y = targetRect.y + tipOffset[1];

        if(tag == 'circle') {
          x -= targetRect.width + (containerRect.width / 2);
          y -= targetRect.height / 2
        } else if(tag == 'rect') {
          x -= containerRect.width - (stemRect.height / 2)
          y -= containerRect.height / 2
        }
        
        return {x: x, y: y}        
      },

      right: function() {
        stem.attr('transform', 'translate(' + -(stemRect.height / 2) + ',' + (backingRect.height / 2) + ') rotate(90)');
        
        containerRect = container.node().getBBox()
        x = targetRect.x + stemRect.height + tipOffset[0];
        y = targetRect.y + tipOffset[1];

        if(tag == 'circle') {
          x += targetRect.width
          y -= targetRect.height / 2
        } else if(tag == 'rect') {
          x += targetRect.width
          y -= containerRect.height / 2
        }
        
        return {x: x, y: y}        
      }
    }

    loc = d3_orient_types[orient]()

    // Tip clipped at right boundry
    if(loc.x + containerRect.width > docRect.width) {
      loc = d3_orient_types['left']()
    }

    // Tip clipped at left boundry
    if(loc.x < 0) {
      loc = d3_orient_types['right']()
    }

    // Tip positioned left or right and clipped at the top or bottom
    if(orient == 'left' || orient == 'right') {
      if(loc.y < 0) loc.y = 0
      if(loc.y > docRect.height) loc.y = docRect.height
    }

    // Tip positioned at the top and overlaps the top boundry.
    // We need to "flip" the offset here so the offset runs in the 
    // opposite direction.
    if(loc.y - containerRect.height < 0 && orient == 'top') {
      loc = d3_orient_types['bottom']()
      loc.y += (tipOffset[1] * 2);
    }

    container.attr('transform', 'translate(' + loc.x + ',' + loc.y + ')')
  }

  function d3_svg_offset() {
    return [0, 0];
  }

  function d3_svg_text() {
    return ' ';
  }

  // Public: Proxy attr calls to the d3 tip container.  Sets or gets attribute value.
  //
  // n - name of the attribute
  // v - value of the attribute
  //
  // Returns tip or attribute value
  tip.attr = function(n, v) {
    if (arguments.length < 2) {
      return d3.select(node).attr(n)
    } else {
      d3.select(node).attr(n, v)
    }

    return tip;
  }

  // Public: Set or get the orientation of the tooltip
  //
  // v - One of top, bottom, left, or right
  //
  // Returns tip or oreint
  tip.orient = function(v) {
    if (!arguments.length) return orient;
    orient = v;
    return tip;
  };

  // Public: Sets or gets the padding on all sides for the tooltip
  //
  // v - Padding value as a number
  //
  // Returns padding or tip
  tip.padding = function(v) {
    if (!arguments.length) return padding;
    padding = v;
    return tip;
  };

  // Public: Sets or gets the corner radius of the tooltip on all sides
  //
  // v - Radius as a Number
  //
  // Returns cornerRadius or tip
  tip.cornerRadius = function(v) {
    if (!arguments.length) return cornerRadius;
    cornerRadius = v;
    return tip;
  };

  // Public: Sets or gets the size of the stem
  //
  // v - size of the stem
  // 
  // Returns stemSize or tip
  tip.stemSize = function(v) {
    if (!arguments.length) return stemSize;
    stemSize = v;
    return tip;
  };

  // Public: Sets or gets the offset of the tip
  //
  // v - Array of [x, y] offset
  //
  // Returns offset or 
  tip.offset = function(v) {
    if (!arguments.length) return offset;
    offset = v == null ? v: d3.functor(v);
    return tip;
  };  

  // Public: sets or gets the text value of the tooltip
  //
  // v - String value of the tip
  //
  // Returns text value or tip
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