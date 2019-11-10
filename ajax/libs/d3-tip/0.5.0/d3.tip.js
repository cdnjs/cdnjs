// d3.tip
// Copyright (c) 2013 Justin Palmer
//
// Tooltips for d3.js SVG visualizations

// Public - contructs a new tooltip
//
// Returns a tip
d3.tip = function() {
  var direction = d3_svg_direction,
      offset    = d3_svg_offset,
      html      = d3_svg_html,
      node      = init_node(),
      svg       = null,
      point     = null;

  function tip(vis) {
    svg = get_svg_node(vis)
    point = svg.createSVGPoint()
    document.body.appendChild(node)
  }

  // Public - show the tooltip on the screen
  //
  // Returns a tip
  tip.show = function() {
    var content = html.apply(this, arguments),
        poffset = offset.apply(this, arguments),
        dir     = direction.apply(this, arguments),
        dirs    = direction_callbacks.keys(),
        nodel   = d3.select(node), i = 0,
        coords

    nodel.html(content).style('display', 'block')
    for(i; i < dirs.length; i++) nodel.classed(dirs[i], false)
    coords = direction_callbacks.get(dir).apply(this)
    nodel.classed(dir, true).style({
      top: (coords.top +  poffset[0]) + 'px',
      left: (coords.left + poffset[1]) + 'px'
    })

    return tip
  }

  // Public - hide the tooltip
  //
  // Returns a tip
  tip.hide = function() {
    node.style.display = 'none'
    node.innerHTML = ''

    return tip
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

  // Public: Proxy style calls to the d3 tip container.  Sets or gets a style value.
  //
  // n - name of the property
  // v - value of the property
  //
  // Returns tip or style property value
  tip.style = function(n, v) {
    if (arguments.length < 2) {
      return d3.select(node).style(n)
    } else {
      d3.select(node).style(n, v)
    }

    return tip;
  }

  // Public: Set or get the direction of the tooltip
  //
  // v - One of n(orth), s(outh), e(ast), or w(est)
  //
  // Returns tip or direction
  tip.direction = function(v) {
    if (!arguments.length) return direction;
    direction = v == null ? v : d3.functor(v);
    return tip;
  };

  // Public: Sets or gets the offset of the tip
  //
  // v - Array of [x, y] offset
  //
  // Returns offset or
  tip.offset = function(v) {
    if (!arguments.length) return offset;
    offset = v == null ? v : d3.functor(v);
    return tip;
  };

  // Public: sets or gets the html value of the tooltip
  //
  // v - String value of the tip
  //
  // Returns html value or tip
  tip.html = function(v) {
    if (!arguments.length) return html;
    html = v == null ? v : d3.functor(v)

    return tip
  };

  function d3_svg_direction() { return 'n' }
  function d3_svg_offset() { return [0, 0] }
  function d3_svg_html() { return ' ' }

  var direction_callbacks = d3.map({
    n: direction_n,
    s: direction_s,
    e: direction_e,
    w: direction_w
  })

  function direction_n() {
    var bbox = get_screen_bbox()
    return {
      top: (bbox.n.y - node.offsetHeight),
      left: (bbox.n.x - node.offsetWidth / 2)
    }
  }

  function direction_s() {
    var bbox = get_screen_bbox()
    return {
      top:  (bbox.s.y),
      left: (bbox.s.x - node.offsetWidth / 2)
    }
  }

  function direction_e() {
    var bbox = get_screen_bbox()
    return {
      top: (bbox.e.y - node.offsetHeight / 2),
      left: bbox.e.x
    }
  }

  function direction_w() {
    var bbox = get_screen_bbox()
    return {
      top: (bbox.w.y - node.offsetHeight / 2),
      left: bbox.w.x - node.offsetWidth
    }
  }

  function init_node() {
    var node = document.createElement('div')
    node.style.position = 'absolute'
    node.style.display = 'none'
    node.style.boxSizing = 'border-box'
    return node
  }

  function get_svg_node(el) {
    el = el.node()
    if(el.tagName.toLowerCase() == 'svg') {
      return el
    } else {
      while(el.parentNode) {
        el = el.parentNode
        if(el.tagName.toLowerCase() == 'svg')
          return el
      }
    }

    return null
  }

  // Private - gets the screen coordinates of a shape
  //
  // Given a shape on the screen, will return an SVGPoint for the directions
  // n(orth), s(outh), e(ast), w(est), ne(northeast), se(southeast), nw(northwest),
  // sw(southwest).
  //
  //    +-+-+
  //    |   |
  //    +   +
  //    |   |
  //    +-+-+
  //
  // Returns an Object {n, s, e, w, nw, sw, ne, se}
  function get_screen_bbox() {
    var target     = d3.event.target,
        bbox       = {},
        matrix     = target.getScreenCTM(),
        tbbox      = target.getBBox(),
        width      = tbbox.width,
        height     = tbbox.height,
        x          = tbbox.x,
        y          = tbbox.y,
        scrollTop = document.body.scrollTop
        scrollLeft = document.body.scrollLeft

    if(document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop
      scrollLeft = document.documentElement.scrollLeft
    }

    point.x = x + scrollLeft
    point.y = y + scrollTop
    bbox.nw = point.matrixTransform(matrix)
    point.x += width
    bbox.ne = point.matrixTransform(matrix)
    point.y += height
    bbox.se = point.matrixTransform(matrix)
    point.x -= width
    bbox.sw = point.matrixTransform(matrix)
    point.y -= height / 2
    bbox.w  = point.matrixTransform(matrix)
    point.x += width
    bbox.e = point.matrixTransform(matrix)
    point.x -= width / 2
    point.y -= height / 2
    bbox.n = point.matrixTransform(matrix)
    point.y += height
    bbox.s = point.matrixTransform(matrix)

    return bbox
  }

  return tip;
}
