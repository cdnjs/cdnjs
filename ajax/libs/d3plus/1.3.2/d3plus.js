(function(){

  var d3plus    = window.d3plus || {}
  window.d3plus = d3plus

  d3plus.version = "1.3.2 - Sky"

  d3plus.array         = {}
  d3plus.color         = {}
  d3plus.data          = {}
  d3plus.draw          = {}
  d3plus.edges         = {}
  d3plus.font          = {}
  d3plus.input         = {}
  d3plus.locale        = {}
  d3plus.method        = {}
  d3plus.number        = {}
  d3plus.object        = {}
  d3plus.shape         = {}
  d3plus.string        = {}
  d3plus.style         = {}
  d3plus.tooltip       = {}
  d3plus.ui            = {}
  d3plus.util          = {}
  d3plus.variable      = {}
  d3plus.visualization = {}
  d3plus.zoom          = {}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Sorts an array of objects
//------------------------------------------------------------------------------
d3plus.array.sort = function( arr , keys , sort , colors , vars ) {

  if ( !arr || arr.length <= 1 || !keys ) {
    return arr || []
  }

  if ( !sort ) {
    var sort = "asc"
  }

  if ( !(keys instanceof Array) ) {
    keys = [ keys ]
  }

  if ( !colors ) {
    var colors = [ "color" ]
  }
  else if ( !(colors instanceof Array) ) {
    colors = [ colors ]
  }

  function comparator( a , b ) {

    var retVal = 0

    for ( var i = 0 ; i < keys.length ; i++ ) {

      var k = keys[i]

      if ( vars ) {

        var depthKey = a.d3plus ? vars.id.nesting[a.d3plus.depth] : undefined
          , depthInt = a.d3plus ? a.d3plus.depth : undefined
        a = k === vars.color.value
          ? d3plus.variable.color( vars , a , depthKey )
          : k === vars.text.value
          ? d3plus.variable.text( vars , a , depthInt )
          : d3plus.variable.value( vars , a , k , depthKey )

        var depthKey = b.d3plus ? vars.id.nesting[b.d3plus.depth] : undefined
          , depthInt = b.d3plus ? b.d3plus.depth : undefined
        b = k === vars.color.value
          ? d3plus.variable.color( vars , b , depthKey )
          : k === vars.text.value
          ? d3plus.variable.text( vars , b , depthInt )
          : d3plus.variable.value( vars , b , k , depthKey )

      }
      else {
        a = a[k]
        b = b[k]
      }

      a = a instanceof Array ? a = a[0]
        : typeof a === "string" ? a = a.toLowerCase() : a
      b = b instanceof Array ? b = b[0]
        : typeof b === "string" ? b = b.toLowerCase() : b

      retVal = colors.indexOf(k) >= 0 ? d3plus.color.sort( a , b )
             : a < b ? -1 : 1

      if ( retVal !== 0 || i === keys.length-1 ) {
        break
      }

    }

    return sort === "asc" ? retVal : -retVal

  }

  if ( arr.length === 2 ) {
    return comparator(arr[0],arr[1])
  }

  return arr.sort(comparator)


}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Updates an array, either overwriting it with a new array, removing an entry
// if it is present, or adding it if it is not.
//------------------------------------------------------------------------------
d3plus.array.update = function( arr , x ) {

  if ( !(arr instanceof Array) ) {
    var arr = []
  }

  // If the user has passed an array, just use that.
  if( x instanceof Array ){
    arr = x;
  }
  // Otherwise remove it if it is present.
  else if(arr.indexOf(x) >= 0){
    arr.splice(arr.indexOf(x), 1)
  }
  // Else, add it!
  else {
    arr.push(x)
  }

  return arr

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Darkens a color if it's too light to appear on white
//------------------------------------------------------------------------------
d3plus.color.legible = function(color) {

  var hsl = d3.hsl(color)
  if ( hsl.l > .45 ) {
    if ( hsl.s > .8 ) hsl.s = .8
    hsl.l = 0.45
  }
  return hsl.toString()

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Lightens a color
//------------------------------------------------------------------------------
d3plus.color.lighter = function( color , increment ) {

  if ( increment === undefined ) {
    var increment = 0.5
  }

  var c = d3.hsl(color)

  c.l += ( 1 - c.l ) * increment

  return c.toString()

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Mixes 2 hexidecimal colors
//------------------------------------------------------------------------------
d3plus.color.mix = function(c1,c2,o1,o2) {

  if (!o1) var o1 = 1
  if (!o2) var o2 = 1

  c1 = d3.rgb(c1)
  c2 = d3.rgb(c2)

  var r = (o1*c1.r + o2*c2.r - o1*o2*c2.r)/(o1+o2-o1*o2),
      g = (o1*c1.g + o2*c2.g - o1*o2*c2.g)/(o1+o2-o1*o2),
      b = (o1*c1.b + o2*c2.b - o1*o2*c2.b)/(o1+o2-o1*o2)

  return d3.rgb(r,g,b).toString()

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Random color generator
//------------------------------------------------------------------------------
d3plus.color.random = function(x) {
  var rand_int = x || Math.floor(Math.random()*20)
  return d3plus.color.scale.default(rand_int)
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Usable Color Scales
//------------------------------------------------------------------------------
d3plus.color.scale = {}
d3plus.color.scale.default = d3.scale.ordinal().range([
  "#B35C1E",
  "#C9853A",
  "#E4BA79",
  "#F5DD9E",
  "#F3D261",
  "#C4B346",
  "#94B153",
  "#254322",
  "#4F6456",
  "#759E80",
  "#9ED3E3",
  "#27366C",
  "#7B91D3",
  "#C6CBF7",
  "#D59DC2",
  "#E5B3BB",
  "#E06363",
  "#AF3500",
  "#D74B03",
  "#843012",
  "#9A4400",
])

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Sorts colors based on hue
//------------------------------------------------------------------------------
d3plus.color.sort = function( a , b ) {

  var aHSL = d3.hsl(a)
  var bHSL = d3.hsl(b)

  a = aHSL.s === 0 ? 361 : aHSL.h
  b = bHSL.s === 0 ? 361 : bHSL.h

  return a === b ? aHSL.l - bHSL.l : a - b

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Returns appropriate text color based off of a given color
//------------------------------------------------------------------------------
d3plus.color.text = function(color) {

  var rgbColor = d3.rgb(color)
    , r = rgbColor.r
    , g = rgbColor.g
    , b = rgbColor.b
    , yiq = (r * 299 + g * 587 + b * 114) / 1000

  return yiq >= 128 ? "#444444" : "#f7f7f7"

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Sorts colors based on hue
//------------------------------------------------------------------------------
d3plus.color.validate = function( color ) {

  color = color + ""
  color = color.replace(/ /g,'')

  if ( color.indexOf("rgb") === 0 ) {
    color = color.split("(")[1].split(")")[0].split(",").slice(0,3).join(",")
  }
  if ( color.indexOf("hsl") === 0 ) {
    color = color.split(",")[2].split(")")[0]
  }

  var testColor   = d3.rgb(color).toString()
    , blackColors = [ "black" , "#000" , "#000000", "0%" , "0,0,0" ]
    , userBlack   = blackColors.indexOf(color) >= 0

  return testColor !== "#000000" || userBlack

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Sets color range of data, if applicable
//-------------------------------------------------------------------
d3plus.data.color = function(vars) {

  if ( vars.dev.value ) d3plus.console.time("getting color data range")

  var data_range = []
  vars.data.pool.forEach(function(d){
    var val = parseFloat(d3plus.variable.value(vars,d,vars.color.value))
    if (typeof val == "number" && !isNaN(val) && data_range.indexOf(val) < 0) data_range.push(val)
  })

  if ( vars.dev.value ) d3plus.console.timeEnd("getting color data range")

  if (data_range.length > 1) {

    var data_domain = null

    if ( vars.dev.value ) d3plus.console.time("calculating color scale")

    data_range = d3.extent(data_range)

    if (data_range[0] < 0 && data_range[1] > 0) {
      var color_range = vars.color.range
      if (color_range.length == 3) {
        data_range.push(data_range[1])
        data_range[1] = 0
      }
    }
    else if (data_range[1] > 0 && data_range[0] >= 0) {
      var color_range = vars.color.heatmap
      data_range = d3plus.util.buckets(data_range,color_range.length)
    }
    else {
      var color_range = vars.color.range.slice(0)
      if (data_range[0] < 0) {
        color_range.pop()
      }
      else {
        color_range.shift()
      }
    }

    vars.color.scale = d3.scale.sqrt()
      .domain(data_range)
      .range(color_range)
      .interpolate(d3.interpolateRgb)

    if ( vars.dev.value ) d3plus.console.timeEnd("calculating color scale")

  }
  else {
    vars.color.scale = null
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Cleans edges list and populates nodes list if needed
//-------------------------------------------------------------------
d3plus.data.edges = function( vars ) {

  if ( vars.dev.value ) {
    var timerString = "analyzing edges list"
    d3plus.console.time( timerString )
  }

  var appReqs     = d3plus.visualization[vars.type.value].requirements,
      createNodes = appReqs.indexOf("nodes") >= 0 && !vars.nodes.value

  if ( createNodes ) {
    vars.nodes.value = []
    var placed = []
    vars.nodes.changed = true
  }

  vars.edges.value.forEach(function(e){

    if (typeof e[vars.edges.source] !== "object") {
      var obj = {}
      obj[vars.id.value] = e[vars.edges.source]
      e[vars.edges.source] = obj
    }
    if (typeof e[vars.edges.target] !== "object") {
      var obj = {}
      obj[vars.id.value] = e[vars.edges.target]
      e[vars.edges.target] = obj
    }

    if (!("keys" in vars.data)) {
      vars.data.keys = {}
    }

    if (!(vars.id.value in vars.data.keys)) {
      vars.data.keys[vars.id.value] = typeof e[vars.edges.source][vars.id.value]
    }

    if ( createNodes ) {
      if (placed.indexOf(e[vars.edges.source][vars.id.value]) < 0) {
        placed.push(e[vars.edges.source][vars.id.value])
        vars.nodes.value.push(e[vars.edges.source])
      }
      if (placed.indexOf(e[vars.edges.target][vars.id.value]) < 0) {
        placed.push(e[vars.edges.target][vars.id.value])
        vars.nodes.value.push(e[vars.edges.target])
      }
    }

  })

  vars.edges.value = vars.edges.value.filter(function(e){

    var source = e[vars.edges.source][vars.id.value]
      , target = e[vars.edges.target][vars.id.value]

    if ( source === target ) {
      var str = vars.format.locale.value.dev.sameEdge
      d3plus.console.warning(d3plus.string.format(str,"\""+source+"\"") , "edges" )
      return false
    }
    else {
      return true
    }

  })

  vars.edges.linked = true

  if ( vars.dev.value ) d3plus.console.timeEnd( timerString )

}

d3plus.data.element = function( vars ) {

  function get_attributes( obj , elem ) {

    var attributes = [ vars.color.value
                     , vars.icon.value
                     , vars.id.value
                     , vars.keywords.value
                     , vars.alt.value
                     , "style" ];

    [].forEach.call(elem.attributes, function(attr) {
        if (/^data-/.test(attr.name)) {
            var camelCaseName = attr.name.substr(5).replace(/-(.)/g, function ($0, $1) {
                return $1.toUpperCase();
            });
            obj[camelCaseName] = attr.value;
        }
    })

    attributes.forEach(function(a){

      if ( elem.getAttribute(a) !== null ) {
        obj[a] = elem.getAttribute(a)
      }

    })

  }

  var elementTag  = vars.data.element.node().tagName.toLowerCase()
    , elementType = vars.data.element.attr("type")
    , elementData = []

  if ( elementTag === "select" ) {

    var elementID = vars.data.element.node().id
    if ( elementID ) {
      vars.self.container({"id": elementID})
    }

    vars.data.element.selectAll("option")
      .each(function( o , i ){

        var data_obj = {}

        data_obj[vars.text.value] = this.innerHTML

        get_attributes(data_obj,this)

        elementData.push(data_obj)

        if (this.selected) {
          vars.focus.value = data_obj[vars.id.value]
        }

      })

  }
  else if ( elementTag === "input" && elementType === "radio" ) {

    var elementName = vars.data.element.node().getAttribute("name")
    if ( elementName ) {
      vars.self.container({"id": elementName})
    }

    vars.data.element
      .each(function( o , i ){

        var data_obj = {}

        get_attributes(data_obj,this)

        var id = data_obj[vars.id.value] || this.id || false

        if ( id && isNaN(parseFloat(id)) ) {

          var label = d3.select("label[for="+id+"]")

          if ( !label.empty() ) {
            data_obj[vars.text.value] = label.html()
            label.call(hideElement)
          }

        }

        elementData.push(data_obj)

        if (this.checked) {
          vars.focus.value = data_obj[vars.id.value]
        }

      })

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Get focus from data, if it hasn't been found or set.
  //----------------------------------------------------------------------------
  if ( !vars.focus.value && elementData.length ) {

    vars.data.element.node().selectedIndex = 0
    vars.self.focus(elementData[0][vars.id.value])

  }

  function hideElement( elem ) {

    elem
      .style("position","absolute","important")
      .style("clip","rect(1px 1px 1px 1px)","important")
      .style("clip","rect(1px, 1px, 1px, 1px)","important")
      .style("width","1px","important")
      .style("height","1px","important")
      .style("margin","-1px","important")
      .style("padding","0","important")
      .style("border","0","important")
      .style("overflow","hidden","important")
      .html("")

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If a <legend> element exists, use it as the title.
  //----------------------------------------------------------------------------
  var elementLegend = d3.select("legend[for="+vars.container.id+"]")
  if ( !elementLegend.empty() ) {

    vars.self.title(elementLegend.html())
    elementLegend.call(hideElement)

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Hide the original data element.
  //----------------------------------------------------------------------------
  vars.data.element.call(hideElement)

  var containerTag = vars.container.value
                   ? vars.container.value.node().tagName.toLowerCase() : false

  if ( vars.container.value === false || containerTag === "body" ) {
    vars.container.value = d3.select(vars.data.element.node().parentNode)
  }

  return elementData

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Fetches specific years of data
//-------------------------------------------------------------------

d3plus.data.fetch = function( vars , years ) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If "years" have not been requested, determine the years using .time()
  // solo and mute
  //----------------------------------------------------------------------------
  if ( !years ) {

    var key   = vars.time.solo.value.length ? "solo" : "mute"
      , years = []

    if ( vars.time[key].value.length ) {

      var years = []
      vars.time[key].value.forEach(function( y ){

        if ( typeof y === "function" ) {
          vars.data.time.forEach(function( t ){
            if ( y(t) ) years.push( t )
          })
        }
        else years.push(y)

      })

      if ( key === "mute" ) {
        years = vars.data.time.filter(function( t ){
          return years.indexOf( t ) < 0
        })
      }

    }
    else years.push("all")

  }

  var cacheID = [ vars.type.value , vars.id.value , vars.depth.value ]
                  .concat( vars.data.filters )
                  .concat( years )
    , filter  = vars.data.solo.length ? "solo" : "mute"
    , cacheKeys = d3.keys(vars.data.cache)
    , dataFilter = d3plus.visualization[vars.type.value].filter

  if ( vars.data[filter].length ) {
    vars.data[filter].forEach(function(f){
      var vals = vars[f][filter].value.slice(0)
      vals.unshift(f)
      cacheID = cacheID.concat(vals)
    })
  }

  cacheID = cacheID.join("_")

  var match = false

  for ( var i = 0 ; i < cacheKeys.length ; i++ ) {

    var matchKey = cacheKeys[i].split("_").slice(1).join("_")

    if ( matchKey === cacheID ) {
      cacheID = new Date().getTime() + "_" + cacheID
      vars.data.cache[cacheID] = vars.data.cache[cacheKeys[i]]
      delete vars.data.cache[cacheKeys[i]]
      break
    }

  }

  if ( vars.data.cache[cacheID] ) {

    if ( vars.dev.value ) d3plus.console.comment("data already cached")

    var returnData = vars.data.cache[cacheID]

    if ( typeof dataFilter === "function" ) {
      returnData = dataFilter( vars ,  returnData )
    }

    return returnData

  }
  else {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If there's no data, return an empty array!
    //--------------------------------------------------------------------------
    if ( !vars.data.value ) {
      var returnData = []
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If there is only 1 year needed, just grab it!
    //--------------------------------------------------------------------------
    else if ( years.length === 1 ) {
      var returnData = vars.data.nested[ years[0] ][ vars.id.value ]
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Otherwise, we need to grab each year individually
    //--------------------------------------------------------------------------
    else {

      var missing = []
        , returnData = []

      years.forEach(function(y){
        if ( vars.data.nested[y] ) {
          returnData = returnData.concat( vars.data.nested[y][vars.id.value] )
        }
        else missing.push( y )
      })

      if ( returnData.length === 0 && missing.length && !vars.internal_error ) {

        var str = vars.format.locale.value.error.dataYear
          , and = vars.format.locale.value.ui.and
        missing = d3plus.string.list(missing,and)
        vars.internal_error = d3plus.string.format(str,missing)

      }
      else {

        var separated = false
        vars.axes.values.forEach(function(a){
          if ( vars[a].value === vars.time.value
          && vars[a].scale.value === "continuous" ) {
            separated = true
          }
        })

        if (!separated) {
          var nested = vars.id.nesting.slice(0,vars.depth.value+1)
          returnData = d3plus.data.nest( vars , returnData , nested )
        }

      }

    }

    if ( !returnData ) {
      returnData = []
    }
    else {

      returnData = d3plus.data.filter( vars , returnData )

    }

    var cacheKeys = d3.keys(vars.data.cache)
    if ( cacheKeys.length === 20 ) {
      cacheKeys.sort()
      delete vars.data.cache(cacheKeys[0])
    }

    cacheID = new Date().getTime() + "_" + cacheID
    vars.data.cache[cacheID] = returnData

    if ( typeof dataFilter === "function" ) {
      returnData = dataFilter( vars , returnData )
    }

    if ( vars.dev.value ) d3plus.console.comment("storing data in cache")

    return returnData

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Restricts data based on Solo/Mute filters
//------------------------------------------------------------------------------
d3plus.data.filter = function( vars , data ) {

  if ( vars.dev.value ) d3plus.console.time("filtering data")

  var availableKeys = d3.keys(vars.data.keys || {}).concat(d3.keys(vars.attrs.keys || {}))

  vars.data.filters.forEach( function( key ) {

    if ( availableKeys.indexOf(vars[key].value) >= 0 ) {

      data = data.filter( function( d ) {

        var val = d3plus.variable.value(vars,d,vars[key].value)
        if ( key === "size" ) {
          return typeof val === "number" && val > 0
        }
        else {
          return val !== null
        }

      })

    }

  })

  // if "solo", only check against "solo" (disregard "mute")
  var key = vars.data.solo.length ? "solo" : "mute"

  vars.data[key].forEach( function( v ) {

    function test_value( val ) {

      var arr = vars[v][key].value

      if ( v === "id" && key === "solo" && vars.focus.value
      && arr.indexOf(vars.focus.value) < 0) {
        arr.push( vars.focus.value )
      }

      var match = false
      arr.forEach(function(f){
        if (typeof f === "function") {
          match = f(val)
        }
        else if ( f === val ) {
          match = true
        }

      })

      return match
    }

    function nest_check( d ) {

      // if the variable has nesting, check all levels
      var match = false

      if (vars[v].nesting) {
        vars[v].nesting.forEach(function(n){
          if (!match) {
            match = test_value(d3plus.variable.value(vars,d,n))
          }
        })
      }
      else {
        match = test_value(d3plus.variable.value(vars,d,vars[v].value))
      }

      return key === "solo" ? match : !match

    }

    data = data.filter(nest_check)

    if ( v === "id" ) {

      if (vars.nodes.value) {
        if ( vars.dev.value ) d3plus.console.log("Filtering Nodes")
        vars.nodes.restricted = vars.nodes.value.filter(nest_check)
      }

      if (vars.edges.value) {
        if ( vars.dev.value ) d3plus.console.log("Filtering Connections")
        vars.edges.restricted = vars.edges.value.filter(function(d){
          var first_match = nest_check(d[vars.edges.source]),
              second_match = nest_check(d[vars.edges.target])
          return first_match && second_match
        })
      }

    }

  })

  if ( vars.dev.value ) d3plus.console.timeEnd("filtering data")

  return data

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Formats raw data by time and nesting
//------------------------------------------------------------------------------
d3plus.data.format = function( vars ) {

  if ( vars.dev.value ) {
    var timerString = "disaggregating data by time and nesting"
    d3plus.console.time( timerString )
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Gets all unique time values
  //----------------------------------------------------------------------------
  if ( vars.time && vars.time.value ) {

    vars.data.time = d3plus.util.uniques( vars.data.value , vars.time.value )
    for ( var i = 0; i < vars.data.time.length ; i++ ) {
      vars.data.time[i] = parseInt( vars.data.time[i] )
    }
    vars.data.time = vars.data.time.filter( function(t) { return t } )
    vars.data.time.sort()

  }
  else {
    vars.data.time = []
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Gets all unique time values
  //----------------------------------------------------------------------------
  vars.data.nested = { "all" : {} }

  vars.id.nesting.forEach( function( depth , i ) {

    var nestingDepth = vars.id.nesting.slice( 0 , i + 1 )

    vars.data.nested.all[ depth ] = d3plus.data.nest( vars
                                                    , vars.data.value
                                                    , nestingDepth )

  })

  vars.data.time.forEach( function( t ) {

    vars.data.nested[ t ] = { }

    var timeData = vars.data.value.filter( function(d) {
      return parseInt( d3plus.variable.value( vars , d , vars.time.value ) ) === t
    })

    vars.id.nesting.forEach( function( depth , i ) {

      var nestingDepth = vars.id.nesting.slice( 0 , i + 1 )

      vars.data.nested[ t ][ depth ] = d3plus.data.nest( vars
                                                       , timeData
                                                       , nestingDepth )

    })

  })

  if ( vars.dev.value ) d3plus.console.timeEnd( timerString )

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Get Key Types from Data
//------------------------------------------------------------------------------
d3plus.data.keys = function( vars , type ) {

  if ( vars.dev.value ) {
    var timerString = type + " key analysis"
    console.time( timerString )
  }

  vars[type].keys = {}

  function get_keys( arr ) {
    if (arr instanceof Array) {
      arr.forEach(function(d) {
        get_keys( d )
      })
    }
    else if ( d3plus.object.validate(arr) ) {
      for (var d in arr) {
        if ( d3plus.object.validate(arr[d]) ) {
          get_keys( arr[d] )
        }
        else if (!(d in vars[type].keys) && arr[d]) {
          vars[type].keys[d] = typeof arr[d]
        }
      }
    }
  }

  if ( d3plus.object.validate(vars[type].value) ) {
    for ( var a in vars[type].value ) {
      get_keys(vars[type].value[a])
    }
  }
  else {
    get_keys(vars[type].value)
  }

  if ( vars.dev.value ) console.time( timerString )

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Nests and groups the data.
//------------------------------------------------------------------------------
d3plus.data.nest = function( vars , flatData , nestingLevels , requirements ) {

  var nestedData   = d3.nest()
    , groupedData  = []
    , segments     = [ "active" , "temp" , "total" ]
    , requirements = requirements || d3plus.visualization[vars.type.value].requirements
    , exceptions   = [ vars.time.value , vars.icon.value ]
    , checkAxes    = function() {

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // If the visualization has method requirements, check to see if we need
      // to key the data by a continuous scale variable.
      //------------------------------------------------------------------------
      if ( requirements && requirements.length ) {

        vars.axes.values.forEach(function(axis){

          var axisKey = vars[axis].value

          if ( requirements.indexOf(axis) >= 0 && axisKey
               && vars[axis].scale.value === "continuous") {

            exceptions.push(axisKey)

            nestedData.key(function(d){
              return d3plus.variable.value( vars , d , axisKey )
            })

          }

        })

      }

    }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Loop through each nesting level.
  //----------------------------------------------------------------------------
  nestingLevels.forEach(function( level , i ){

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create a nest key for the current level.
    //--------------------------------------------------------------------------
    nestedData
      .key(function(d){

        if ( typeof level === "function" ) {
          return level(d)
        }

        return d3plus.variable.value( vars , d , level )
      })

    checkAxes()

  })

  if ( !nestingLevels.length ) {

    nestedData
      .key(function(d){
        return true
      })

    checkAxes()
  }

  var i = nestingLevels.length ? nestingLevels.length - 1 : 0

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If we're at the deepest level, create the rollup function.
  //----------------------------------------------------------------------------
  nestedData.rollup(function( leaves ) {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If there's only 1 leaf, and it's been processed, return it as-is.
    //--------------------------------------------------------------------------
    if ( leaves.length === 1 && ("d3plus" in leaves[0]) ) {
      var returnObj = leaves[0]
      returnObj.d3plus.depth = i
      groupedData.push(returnObj)
      return returnObj
    }

    if ( vars.size.value && d3plus.util.uniques(leaves,vars.size.value).length ) {

      d3plus.array.sort( leaves , vars.size.value , "desc" , [] , vars )

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create the "d3plus" object for the return variable, starting with
    // just the current depth.
    //--------------------------------------------------------------------------
    var returnObj = {
      "d3plus": {
        "depth": i
      }
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create a reference sum for the 3 different "segment" variables.
    //--------------------------------------------------------------------------
    segments.forEach(function(c){

      var key = vars[c].value || c

      returnObj.d3plus[key] = d3.sum(leaves, function( d ) {

        if ( vars[c].value ) {

          var a = d3plus.variable.value(vars,d,vars[c].value)

          if ( typeof a !== "number" ) {
            a = a ? 1 : 0
          }

        }
        else if ( c === "total" ) {
          var a = 1
        }
        else {
          var a = 0
        }

        return a

      })

    })

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Aggregate all values detected in the data.
    //--------------------------------------------------------------------------
    for ( var key in vars.data.keys ) {

      var agg     = vars.aggs.value[key] || "sum"
        , aggType = typeof agg
        , keyType = vars.data.keys[key]
        , idKey   = vars.id.nesting.indexOf(key) >= 0
        , timeKey = key === vars.time.value

      if ( key in returnObj.d3plus ) {

        returnObj[key] = returnObj.d3plus[key]

      }
      else if ( aggType === "function" ) {

        returnObj[key] = vars.aggs.value[key](leaves)

      }
      else if ( keyType === "number" && aggType === "string" && !idKey && !timeKey ) {

        returnObj[key] = d3[agg]( leaves , function(d){
          return key in d ? d[key] : false
        })

      }
      else {

        var keyValues = leaves.length === 1 ? leaves[0][key]
                      : d3plus.util.uniques( leaves , key )

        if ( keyValues ) {

          if ( !(keyValues instanceof Array) ) {
            keyValues = [ keyValues ]
          }

          if ( keyValues.length ) {

            if ( keyValues.length <= leaves.length && idKey && vars.id.nesting.indexOf(key) > i && keyValues.length > 1 ) {

              returnObj[key] = leaves

            }
            else {

              returnObj[key] = keyValues.length === 1
                             ? keyValues[0] : keyValues

            }

          }

        }

      }

    }

    groupedData.push(returnObj)

    return returnObj

  })

  var rename_key_value = function(obj) {
    if (obj.values && obj.values.length) {
      obj.children = obj.values.map(function(obj) {
        return rename_key_value(obj);
      })
      delete obj.values
      return obj
    }
    else if(obj.values) {
      return obj.values
    }
    else {
      return obj;
    }
  }

  var find_keys = function(obj,depth,keys) {
    if (obj.children) {
      if (vars.data.keys[nestingLevels[depth]] == "number") {
        obj.key = parseFloat(obj.key)
      }
      keys[nestingLevels[depth]] = obj.key
      delete obj.key
      for ( var k in keys ) {
        obj[k] = keys[k]
      }
      depth++
      obj.children.forEach(function(c){
        find_keys(c,depth,keys)
      })
    }
  }

  nestedData = nestedData
    .entries(flatData)
    .map(rename_key_value)
    .map(function(obj){
      find_keys(obj,0,{})
      return obj
    })

  return groupedData

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Calculates node positions, if needed for network
//-------------------------------------------------------------------
d3plus.data.nodes = function(vars) {

  if ( vars.dev.value ) {
    var timerString = "analyzing node positions"
    d3plus.console.time( timerString )
  }

  var set = vars.nodes.value.filter(function(n){
    return typeof n.x == "number" && typeof n.y == "number"
  }).length

  if (set == vars.nodes.value.length) {
    vars.nodes.positions = true
  }
  else {

    var force = d3.layout.force()
      .size([vars.width.viz,vars.height.viz])
      .nodes(vars.nodes.value)
      .links(vars.edges.value)

    var iterations = 50,
        threshold = 0.01;

    force.start(); // Defaults to alpha = 0.1
    for (var i = iterations; i > 0; --i) {
      force.tick();
      if(force.alpha() < threshold) {
        break;
      }
    }
    force.stop();

    vars.nodes.positions = true

  }

  if ( vars.dev.value ) d3plus.console.timeEnd( timerString )

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Resets certain keys in global variables.
//-------------------------------------------------------------------
d3plus.data.reset = function( obj , method ) {

  if ( obj.changed ) {
    obj.changed = false
  }

  if ( method === "draw" ) {
    obj.frozen = false
    obj.update = true
    obj.first = false
  }

  for ( var o in obj ) {

    if ( d3plus.object.validate( obj[o] ) ) {

      d3plus.data.reset( obj[o] , o )

    }

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Merges data underneath the size threshold
//-------------------------------------------------------------------
d3plus.data.threshold = function( vars , rawData , split ) {

  if ( vars.size.threshold === false ) {
    var threshold = 0
  }
  else if (typeof vars.size.threshold === "number") {
    var threshold = vars.size.threshold
  }
  else if (typeof d3plus.visualization[vars.type.value].threshold === "number") {
    var threshold = d3plus.visualization[vars.type.value].threshold
  }
  else if (typeof d3plus.visualization[vars.type.value].threshold === "function") {
    var threshold = d3plus.visualization[vars.type.value].threshold(vars)
  }
  else {
    var threshold = 0.02
  }

  if (typeof threshold == "number" && threshold > 0) {

    var allowed = [],
        cutoff = vars.depth.value == 0 ? 0 : {},
        removed = [],
        largest = {}

    var nest = d3.nest()

    if (split) {
      nest
        .key(function(d){
          return d3plus.variable.value(vars,d,split)
        })
    }

    nest
      .rollup(function(leaves){
        var total = leaves.length
        if (vars.aggs[vars.size.value]) {
          if (typeof vars.aggs[vars.size.value] == "function") {
            total = vars.aggs[vars.size.value](leaves)
          }
          else if (typeof vars.aggs[vars.size.value] == "string") {
            total = d3[vars.aggs[vars.size.value]](leaves,function(l){
              return d3plus.variable.value(vars,l,vars.size.value)
            })
          }
        }
        else {
          total = d3.sum(leaves,function(l){
            return d3plus.variable.value(vars,l,vars.size.value)
          })
        }
        var x = split ? d3plus.variable.value(vars,leaves[0],split) : "all"
        largest[x] = total
        return total
      })
      .entries(rawData)

    var filteredData = rawData.filter(function(d){

      var id = d3plus.variable.value(vars,d,vars.id.value),
          val = d3plus.variable.value(vars,d,vars.size.value),
          x = split ? d3plus.variable.value(vars,d,split) : "all"

      if (allowed.indexOf(id) < 0) {
        if (val/largest[x] >= threshold) {
          allowed.push(id)
        }

      }

      if (allowed.indexOf(id) < 0) {
        if (vars.depth.value == 0) {
          if (val > cutoff) cutoff = val
        }
        else {
          var parent = d[vars.id.nesting[vars.depth.value-1]]
          if (!(parent in cutoff)) cutoff[parent] = 0
          if (val > cutoff[parent]) cutoff[parent] = val
        }
        removed.push(d)
        return false
      }
      else {
        return true
      }

    })

    if ( removed.length > 1 ) {

      removed = d3plus.array.sort( removed , vars.size.value , "desc" , [] , vars )

      var levels = vars.id.nesting.slice(0,vars.depth.value)
      var merged = d3plus.data.nest(vars,removed,levels).filter(function(d){
        return d3plus.variable.value( vars , d , vars.size.value ) > 0
      })

      merged.forEach(function(m){

        var parent = vars.id.nesting[vars.depth.value-1]

        vars.id.nesting.forEach(function(d,i){

          if (vars.depth.value == i) {
            var prev = m[vars.id.nesting[i-1]]
            if ( typeof prev === "string" ) {
              m[d] = "d3plus_other_"+prev
            }
            else {
              m[d] = "d3plus_other"
            }
          }
          else if (i > vars.depth.value) {
            delete m[d]
          }
        })

        if (vars.color.value && vars.color.type === "string") {
          if (vars.depth.value == 0) {
            m[vars.color.value] = vars.color.missing
          }
          else {
            m[vars.color.value] = d3plus.variable.color(vars,m[parent],parent)
          }
        }

        if (vars.icon.value && vars.depth.value != 0) {
          m[vars.icon.value] = d3plus.variable.value(vars,m[parent],vars.icon.value,parent)
          m.d3plus.depth = vars.depth.value+1
        }

        if (vars.text.value) {
          if (vars.depth.value == 0) {
            m[vars.text.value] = vars.format.value(vars.format.locale.value.ui.values)
            m[vars.text.value] += " < "+vars.format.value(cutoff)
          }
          else {
            var name = d3plus.variable.value(vars,m,vars.text.value,parent)
            m[vars.text.value] = name
            m[vars.text.value] += " < "+vars.format.value(cutoff[m[parent]],vars.size.value)
          }
          m[vars.text.value] += " ("+vars.format.value(threshold*100)+"%)"

          m.d3plus.threshold = cutoff
          if (parent) {
            m.d3plus.merged = []
            removed.forEach(function(r){
              if (m[parent] == r[parent]) {
                m.d3plus.merged.push(r)
              }
            })
          }
          else {
            m.d3plus.merged = removed
          }

        }

      })

    }
    else {
      merged = removed
    }

    return filteredData.concat(merged)

  }

  return rawData

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Load Data using JSON
//------------------------------------------------------------------------------
d3plus.data.url = function( vars , key , next ) {

  if ( vars.dev.value ) d3plus.console.time( "loading " + key )

  var url = vars[key].url

  if ( !vars[key].type.value ) {

    var fileType = url.slice(url.length-5).split(".")
    if ( fileType.length > 1 ) {
      fileType = fileType[1]
    }
    else {
      fileType = false
    }

    if ( fileType ) {

      if ( fileType === "txt" ) {
        fileType = "text"
      }
      if ( vars[key].type.accepted.indexOf(fileType) < 0 ) {
        fileType = "json"
      }

    }
    else {
      fileType = "json"
    }

  }
  else {
    var fileType = vars[key].type.value
  }

  if ( fileType === "dsv" ) {
    var parser = d3.dsv( vars[key].delimiter.value , "text/plain" )
  }
  else {
    var parser = d3[fileType]
  }

  parser( url , function( error , data ) {

    if (!error && data) {

      if (typeof vars[key].callback === "function") {

        var ret = vars[key].callback(data)

        if (ret) {
          if ( d3plus.object.validate(ret) && key in ret) {
            for ( var k in ret ) {
              if (k in vars) {
                vars[k].value = ret[k]
              }
            }
          }
          else {
            vars[key].value = ret
          }
        }

      }
      else {

        vars[key].value = data

      }

      if ( fileType !== "json" ) {

        vars[key].value.forEach(function(d){

          for ( var k in d ) {

            if      ( d[k].toLowerCase() === "false" ) d[k] = false
            else if ( d[k].toLowerCase() === "true" ) d[k] = true
            else if ( d[k].toLowerCase() === "null" ) d[k] = null
            else if ( d[k].toLowerCase() === "undefined" ) d[k] = undefined

          }


        })

      }

      vars[key].changed = true
      vars[key].loaded = true

    }
    else {

      vars.internal_error = "Could not load data from: \""+url+"\""

    }

    if ( vars.dev.value ) d3plus.console.time( "loading " + key )
    next()

  })

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Returns primary connections for a given node ID
//------------------------------------------------------------------------------
d3plus.edges.connections = function( edges , focus , id , source , target , returnNodes ) {

  

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Detects if FontAwesome is loaded on the page
//------------------------------------------------------------------------------
d3plus.font.awesome = false
for (var s = 0; s < document.styleSheets.length; s++) {
  var sheet = document.styleSheets[s]
  if (sheet.href && sheet.href.indexOf("font-awesome") >= 0) {
    d3plus.font.awesome = true
    break;
  }
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates test div to populate with test DIVs
//------------------------------------------------------------------------------
d3plus.font.sizes = function( words , style , parent ) {

  var tester = parent || d3plus.font.tester("svg").append("text")
    , style  = style || {}
    , sizes  = []

  var tspans = parent.selectAll("tspan.d3plus_testFontSize")
    .data(words)

  tspans.enter().append("tspan")
    .attr("class","d3plus_testFontSize")
    .text(String)
    .style(style)
    .attr("x",0)
    .attr("y",0)
    .each(function(d){

      sizes.push({
        "height" : this.offsetHeight,
        "text"   : d,
        "width"  : this.getComputedTextLength()
      })

    })

  tspans.remove()

  if ( !parent ) {
    parent.remove()
  }

  return sizes

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates test div to populate with test DIVs
//------------------------------------------------------------------------------
d3plus.font.tester = function( type ) {

  if ( [ "div" , "svg" ].indexOf(type) < 0 ) var type = "div"

  var tester = d3.select("body").selectAll(type+".d3plus_tester")
    .data(["d3plus_tester"])

  tester.enter().append(type)
    .attr("class","d3plus_tester")
    .style("position","absolute")
    .style("left","-9999px")
    .style("top","-9999px")
    .style("visibility","hidden")
    .style("display","block")

  return tester

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Given a single font or a list of font, determines which can be rendered
//------------------------------------------------------------------------------
d3plus.font.validate = function(test_fonts) {

  if (!(test_fonts instanceof Array)) {
    test_fonts = test_fonts.split(",")
  }

  var fontString = test_fonts.join(", ")
    , completed = d3plus.font.validate.complete

  if (fontString in completed) {
    return completed[fontString]
  }

  var tester = d3plus.font.tester("div")

  function create_element(font) {

    return tester.append("span")
      .style("font-family",font)
      .style("font-size","32px")
      .style("padding","0px")
      .style("margin","0px")
      .text("abcdefghiABCDEFGHI_!@#$%^&*()_+1234567890")

  }

  function different(elem1,elem2) {

    var width1 = elem1.node().offsetWidth,
        width2 = elem2.node().offsetWidth

    return width1 !== width2

  }

  var monospace = create_element("monospace"),
      proportional = create_element("sans-serif")

  for ( var font in test_fonts ) {

    var family = test_fonts[font].trim()

    var test = create_element(family+",monospace")

    var valid = different(test,monospace)
    test.remove()

    if (!valid) {
      var test = create_element(family+",sans-serif")
      valid = different(test,proportional)
      test.remove()
    }

    if (valid) {
      valid = family
      break;
    }

  }

  if (!valid) {
    valid = "sans-serif"
  }

  monospace.remove()
  proportional.remove()

  completed[fontString] = valid

  return valid

}

d3plus.font.validate.complete = {}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Form Element shell
//------------------------------------------------------------------------------
d3plus.form = function() {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialize the global variable object.
  //----------------------------------------------------------------------------
  var vars = { "shell": "form" }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Create the main drawing function.
  //----------------------------------------------------------------------------
  vars.self = function( selection ) {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Set timing to 0 if it's the first time running this function or if the
    // data length is longer than the "large" limit
    //--------------------------------------------------------------------------
    var large = vars.data.value instanceof Array
                && vars.data.value.length > vars.data.large

    vars.draw.timing = vars.draw.first || large || d3plus.ie
                     ? 0 : vars.timing.ui

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create/update the UI element
    //--------------------------------------------------------------------------
    if ( vars.data.value instanceof Array ) {

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Sort the data, if needed.
      //------------------------------------------------------------------------
      if ( vars.data.changed || vars.order.changed || vars.order.sort.changed ) {

        d3plus.array.sort( vars.data.value , vars.order.value || vars.text.value
                         , vars.order.sort.value , vars.color.value , vars )

      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Set first element in data as focus if there is no focus set.
      //------------------------------------------------------------------------
      if ( !vars.focus.value && vars.data.value.length ) {

        vars.focus.value = vars.data.value[0][vars.id.value]
        if ( vars.dev.value ) d3plus.console.log("\"value\" set to \""+vars.focus+"\"")

      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Run these things if the data has changed.
      //------------------------------------------------------------------------
      if ( vars.data.changed ) {

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // Determine if search box is needed.
        //----------------------------------------------------------------------
        if ( vars.search.value === "auto" ) {

          if (vars.data.value.length > 10) {
            vars.search.enabled = true
            if ( vars.dev.value ) d3plus.console.log("Search enabled.")
          }
          else {
            vars.search.enabled = false
            if ( vars.dev.value ) d3plus.console.log("Search disabled.")
          }

        }
        else {

          vars.search.enabled = vars.search.value

        }

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // Update OPTION elements with the new data.
        //----------------------------------------------------------------------
        var elementTag = vars.data.element
                       ? vars.data.element.node().tagName.toLowerCase() : ""
        if ( vars.data.element && elementTag === "select" ) {

          options = vars.data.element.selectAll("option")
            .data(vars.data.value,function(d){
              return d ? d[vars.id.value] : false
            })

          options.exit().remove()

          options.enter().append("option")

          options
            .each(function(d){

              for ( var k in d ) {
                if ( k === vars.text.value ) {
                  d3.select(this).html(d[k])
                }
                if ( ["alt","value"].indexOf(k) >= 0 ) {
                  d3.select(this).attr(k,d[k])
                }
                else {
                  d3.select(this).attr("data-"+k,d[k])
                }
              }

              if (d[vars.id.value] === vars.focus.value) {
                this.selected = true
              }
              else {
                this.selected = false
              }

            })

        }

      }

      if (vars.draw.first) {

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // Select container DIV for UI element
        //----------------------------------------------------------------------
        vars.container.ui = vars.container.value
          .selectAll("div#d3plus_"+vars.type.value+"_"+vars.container.id)
          .data(["container"])

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // Create container DIV for UI element
        //----------------------------------------------------------------------
        var before = vars.data.element ? vars.data.element[0][0] : null

        if ( before ) {

          if ( before.id ) {
            before = "#"+before.id
          }
          else {

            var id = before.getAttribute(vars.id.value)
                   ? vars.id.value : "data-"+vars.id.value

            if ( before.getAttribute(id) ) {
              before = "["+id+"="+before.getAttribute(id)+"]"
            }
            else {
              before = null
            }

          }

        }

        vars.container.ui.enter()
          .insert("div",before)
          .attr("id","d3plus_"+vars.type.value+"_"+vars.container.id)
          .style("position","relative")
          .style("overflow","visible")
          .style("vertical-align","top")

      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Update Container
      //------------------------------------------------------------------------
      vars.container.ui.transition().duration(vars.draw.timing)
        .style("display",vars.ui.display.value)
        .style("margin",vars.ui.margin+"px")

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Create title, if available.
      //------------------------------------------------------------------------
      var title = vars.container.ui.selectAll("div.d3plus_title")
        .data(vars.title.value ? [vars.title.value] : [])

      title.enter().insert("div","#d3plus_"+vars.type.value+"_"+vars.container.id)
        .attr("class","d3plus_title")

      title.transition().duration(vars.draw.timing)
        .style("display",vars.ui.display.value)
        .style("color",vars.font.color)
        .style("font-family",vars.font.family.value)
        .style("font-size",vars.font.size+"px")
        .style("font-weight",vars.font.weight)
        .style("padding",vars.ui.padding+"px")
        .style("border-color","transparent")
        .style("border-style","solid")
        .style("border-width",vars.ui.border+"px")
        .text(String)

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Call specific UI element type, if there is data.
      //------------------------------------------------------------------------
      if ( vars.data.value.length ) {

        var app = vars.format.locale.value.visualization[vars.type.value]
        if ( vars.dev.value ) d3plus.console.time("drawing "+ app)
        d3plus.input[vars.type.value]( vars )
        if ( vars.dev.value ) d3plus.console.timeEnd("drawing "+ app)

      }
      else if ( vars.data.url && (!vars.data.loaded || vars.data.stream) ) {

        d3plus.data.url( vars , "data" , vars.self.draw )

      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Initialization complete
      //------------------------------------------------------------------------
      d3plus.data.reset( vars )
      vars.methodGroup = false

    }

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Define methods and expose public variables.
  //----------------------------------------------------------------------------
  var methods = [ "alt" , "color" , "container" , "depth" , "dev" , "data" , "draw"
                , "focus" , "format" , "height" , "hover" , "icon" , "id"
                , "keywords" , "open" , "order" , "remove" , "search"
                , "select" , "selectAll" , "text" , "title" , "type" , "width" ]
    , styles  = [ "data" , "font" , "icon" , "timing" , "title" , "ui" ]

  d3plus.method( vars , methods , styles )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Finally, return the main UI function to the user
  //----------------------------------------------------------------------------
  return vars.self

}

d3plus.locale.en = {

  "dev"          : {

    "accepted"     : "{0} is not an accepted value for {1}, please use one of the following: {2}.",
    "deprecated"   : "the {0} method has been removed, please update your code to use {1}.",
    "noChange"     : "{0} was not updated because it did not change.",
    "noContainer"  : "cannot find a container on the page matching {0}.",
    "of"           : "of",
    "oldStyle"     : "style properties for {0} have now been embedded directly into .{1}().",
    "sameEdge"     : "edges cannot link to themselves. automatically removing self-referencing edge {0}.",
    "set"          : "{0} has been set.",
    "setLong"      : "{0} has been set to {1}.",
    "setContainer" : "please define a container div using .container()"

  },

  "error"        : {

    "accepted"     : "{0} is not an accepted {1} for {2} visualizations, please use one of the following: {3}.",
    "connections"  : "no connections available for {0}.",
    "data"         : "no data available",
    "dataYear"     : "no data available for {0}.",
    "lib"          : "{0} visualizations require loading the {1} library.",
    "libs"         : "{0} visualizations require loading the following libraries: {1}.",
    "method"       : "{0} visualizations require setting the {1} method.",
    "methods"      : "{0} visualizations require setting the following methods: {1}."

  },

  "lowercase"    : [ "a"
                   , "and"
                   , "at"
                   , "but"
                   , "in"
                   , "of"
                   , "or"
                   , "the"
                   , "to"
                   , "with"
  ],

  "message"      : {

    "data"         : "analyzing data",
    "draw"         : "drawing visualization",
    "initializing" : "initializing {0}",
    "loading"      : "loading data",
    "tooltipReset" : "resetting tooltips",
    "ui"           : "updating ui"

  },

  "method"       : {

    "active"       : "active segments",
    "color"        : "color",
    "depth"        : "depth",
    "dev"          : "verbose",
    "focus"        : "focus",
    "icon"         : "icon",
    "id"           : "id",
    "height"       : "height",
    "labels"       : "labels",
    "legend"       : "legend",
    "margin"       : "margin",
    "messages"     : "status messages",
    "mode"         : "mode",
    "order"        : "order",
    "search"       : "search",
    "shape"        : "shape",
    "size"         : "size",
    "style"        : "style",
    "temp"         : "temporary segments",
    "text"         : "text",
    "time"         : "time",
    "timeline"     : "timeline",
    "total"        : "total segments",
    "type"         : "type",
    "width"        : "width",
    "x"            : "x axis",
    "y"            : "y axis",
    "zoom"         : "zoom"

  },

  "time"         : [ "date"
                   , "day"
                   , "month"
                   , "time"
                   , "year"

  ],

  "ui"           : {

    "and"          : "and",
    "back"         : "back",
    "collapse"     : "click to collapse",
    "error"        : "error",
    "expand"       : "click to expand",
    "including"    : "including",
    "loading"      : "loading...",
    "more"         : "{0} more",
    "moreInfo"     : "click for more info",
    "noResults"    : "no results matching {0}.",
    "primary"      : "primary connections",
    "share"        : "share",
    "total"        : "total",
    "values"       : "values"

  },

  "uppercase"    : [ "tv"
                   , "ui"
  ],

  "visualization": {

    "bubbles"      : "Bubbles",
    "chart"        : "Chart",
    "geo_map"      : "Geo Map",
    "line"         : "Line Plot",
    "network"      : "Network",
    "rings"        : "Rings",
    "scatter"      : "Scatter Plot",
    "stacked"      : "Stacked Area",
    "tree_map"     : "Tree Map"

  }

}

d3plus.locale.mk = {
    "dev": {
        "accepted": "{0} не е прифатенa вредноста за {1}, ве молиме користете еднa од следниве вредности: {2}.",
        "deprecated": "{0} метод е отстранета, ве молиме обновете го вашиот код за да се користи {1}.",
        "noChange": "{0} не е ажурирана, бидејќи немаше промени.",
        "noContainer": "не можe да се најде контејнер на страницата кој се совпаѓа со {0}.",
        "of": "на",
        "oldStyle": "својствата за стилот за {0} сега се вградени директно во. {1} ().",
        "sameEdge": "рабовите не може да имаат алка самите кон себе. автоматски ги отстранувам рабовите кои се само-референцираат {0}.",
        "set": "{0} е наместен.",
        "setLong": "{0} е поставен на {1}.",
        "setContainer": "Ве молиме дефинирајте контејнер div користејќи .container()"
    },
    "error": {
        "accepted": "{0} не е прифатлива за {1} {2} визуелизација, ве молиме користете една од следниве: {3}.",
        "connections": "нема конекции на располагање за {0}.",
        "data": "нема податоци",
        "dataYear": "Нема достапни податоци за {0}.",
        "lib": "{0} визуализации бараат вчитување на библиотеката {1} .",
        "libs": "{0} визуализации бараат вчитување на следниве библиотеки: {1}.",
        "method": "{0} визуализации бара поставување на {1} методот.",
        "methods": "{0} визуализации бараат поставување на следниве методи: {1}."
    },
    "lowercase": [
        "a",
        "и",
        "во",
        "но",
        "на",
        "или",
        "да",
        "се",
        "со"
    ],
    "method": {
        "active": "активни сегменти",
        "color": "боја",
        "depth": "длабочина",
        "dev": "опширно",
        "focus": "фокус",
        "icon": "икона",
        "id": "ID",
        "height": "висина",
        "labels": "етикети",
        "legend": "легенда",
        "margin": "маргина",
        "messages": "пораки за статусот",
        "order": "цел",
        "search": "барај",
        "shape": "форма",
        "size": "големина",
        "style": "стил",
        "temp": "привремени сегменти",
        "text": "текст",
        "time": "време",
        "timeline": "времеплов",
        "total": "Вкупно сегменти",
        "type": "тип",
        "width": "ширина",
        "x": "x оската",
        "y": "y оската",
        "zoom": "зум",
        "mode": "режим"
    },
    "time": [
        "датум",
        "ден",
        "месец",
        "време",
        "година"
    ],
    "visualization": {
        "bubbles": "Меурчиња",
        "chart": "Табела",
        "geo_map": "Гео мапа",
        "line": "Линиски график",
        "network": "Мрежа",
        "rings": "Прстени",
        "scatter": "Распрскан график",
        "stacked": "Наредена површина",
        "tree_map": "Мапа во вид на дрво"
    },
    "ui": {
        "and": "и",
        "back": "назад",
        "collapse": "кликни за да се собере",
        "error": "грешка",
        "expand": "кликни за да се прошири",
        "loading": "Се вчитува ...",
        "more": "{0} повеќе",
        "moreInfo": "кликнете за повеќе информации",
        "noResults": "Нема резултати за појавување на {0}.",
        "primary": "основно врски",
        "share": "удел",
        "total": "Вкупно",
        "values": "вредности",
        "including": "вклучувајќи"
    },
    "message": {
        "data": "анализирање на податоците",
        "draw": "цртање на визуелизација",
        "initializing": "иницијализација {0}",
        "loading": "вчитување на податоци",
        "tooltipReset": "ресетирање на објаснувањата",
        "ui": "ажурирање на кориничкиот интерфејс"
    },
    "uppercase": [
        "TV",
        "UI"
    ]
}

d3plus.locale.pt = {
    "dev": {
        "accepted": "{0} não é um valor aceito para {1}, por favor, use um dos seguintes procedimentos: {2}.",
        "deprecated": "{0} método foi removido, por favor atualize seu código para utilizar {1}.",
        "noChange": "{0} não foi atualizado porque ele não mudou.",
        "noContainer": "Não foi possível encontrar um local na página correspondente a {0}.",
        "of": "de",
        "oldStyle": "propriedades de estilo para {0} já foram incorporados diretamente no. {1} ().",
        "sameEdge": "bordas não podem vincular a si mesmos. removendo automaticamente borda de auto-referência {0}.",
        "set": "{0} foi definida.",
        "setLong": "{0} foi definida para {1}.",
        "setContainer": "por favor, defina um div utilizando .container()"
    },
    "error": {
        "accepted": "{0} não é um reconhecido {1} para {2} visualizações, por favor, use um dos seguintes procedimentos: {3}.",
        "connections": "Não há conexões disponíveis para {0}.",
        "data": "Não há dados disponíveis",
        "dataYear": "Não há dados disponíveis para {0}.",
        "lib": "A visualização {0} necessita que seja carregado a biblioteca {1}.",
        "libs": "A visualização {0} necessita que seja carregado as bibliotecas {1}.",
        "method": "A visualização {0} exige a definição do método {1}.",
        "methods": "A visualização {0} exige a definição dos métodos {1}."
    },
    "lowercase": [
        "a",
        "com",
        "de",
        "e",
        "em",
        "mas",
        "ou",
        "para",
        "um"
    ],
    "method": {
        "active": "segmentos ativos",
        "color": "cor",
        "depth": "profundidade",
        "dev": "verboso",
        "focus": "foco",
        "icon": "ícone",
        "id": "id",
        "height": "altura",
        "labels": "rótulos",
        "legend": "legenda",
        "margin": "margem",
        "messages": "mensagens de status",
        "order": "ordenar",
        "search": "pesquisar",
        "shape": "forma",
        "size": "tamanho",
        "style": "estilo",
        "temp": "segmentos temporários",
        "text": "texto",
        "time": "tempo",
        "timeline": "cronograma",
        "total": "segmentos totais",
        "type": "tipo",
        "width": "largura",
        "x": "eixo x",
        "y": "eixo y",
        "zoom": "zoom",
        "mode": "modo"
    },
    "time": [
        "ano",
        "data",
        "dia",
        "hora",
        "mês"
    ],
    "visualization": {
        "bubbles": "Bolhas",
        "chart": "Gráfico",
        "geo_map": "Mapa",
        "line": "Gráfico de Linha",
        "network": "Rede",
        "rings": "Anéis",
        "scatter": "Dispersão",
        "stacked": "Evolução",
        "tree_map": "Tree Map"
    },
    "ui": {
        "and": "e",
        "back": "de volta",
        "collapse": "Clique para fechar",
        "error": "erro",
        "expand": "clique para expandir",
        "loading": "carregando ...",
        "more": "mais {0}",
        "moreInfo": "clique para mais informações",
        "noResults": "nenhum resultado para {0}.",
        "primary": "conexões primárias",
        "share": "participação",
        "total": "total",
        "values": "valores",
        "including": "incluindo"
    },
    "message": {
        "data": "analisando dados",
        "draw": "desenhando visualização",
        "initializing": "inicializando {0}",
        "loading": "carregando dados",
        "tooltipReset": "redefinindo as dicas",
        "ui": "atualizando interface"
    },
    "uppercase": [
        "TV"
    ]
}

d3plus.locale.zh = {
    "dev": {
        "accepted": "{0}不是{1}的可接受值, 请用下列之一的值:{2}",
        "deprecated": "{0}的方法已被移除, 请更新您的代码去使用{1}",
        "noChange": "{0}没有更新, 因为它并没有改变。",
        "noContainer": "无法在该页找到容器去匹配{0}",
        "of": "的",
        "oldStyle": "样式属性{0}现在已经直接嵌入到。{1}（）。",
        "sameEdge": "边缘不能链接到自己。自动去除自我参照边缘{0}。",
        "set": "{0}已经被设置。",
        "setLong": "{0}被设置为{1}。",
        "setContainer": "请使用()容器来定义div容器"
    },
    "error": {
        "accepted": "{0}对于{2}的可视化效果并不是一个可接受的{1}, 请使用如下的一个：{3}.",
        "connections": "没有对{0}可用的连接。",
        "data": "无可用数据",
        "dataYear": "没有数据对{0}可用。",
        "lib": "{0}的可视化要求装载{1}库。",
        "libs": "{0}的可视化需要加载以下库：{1}。",
        "method": "{0}的可视化要求设置{1}方法。",
        "methods": "{0}的可视化要求设置以下方法：{1}。"
    },
    "lowercase": [
        "一个",
        "和",
        "在",
        "但是",
        "在...里",
        "的",
        "或者",
        "这",
        "向",
        "与...一起"
    ],
    "method": {
        "active": "活跃段",
        "color": "颜色",
        "depth": "深度",
        "dev": "详细",
        "focus": "焦点",
        "icon": "图标",
        "id": "身份认证",
        "height": "高度",
        "labels": "标签",
        "legend": "图例注释",
        "margin": "外边距",
        "messages": "状态消息",
        "order": "规则",
        "search": "搜索",
        "shape": "形状",
        "size": "大小",
        "style": "样式",
        "temp": "暂时性区段",
        "text": "文本",
        "time": "时间",
        "timeline": "时间轴",
        "total": "总段",
        "type": "类型",
        "width": "宽度",
        "x": "X轴",
        "y": "Y轴",
        "zoom": "缩放",
        "mode": "模式"
    },
    "time": [
        "日",
        "星期",
        "月",
        "时间",
        "年"
    ],
    "visualization": {
        "bubbles": "气泡",
        "chart": "图表",
        "geo_map": "地理地图",
        "line": "线图",
        "network": "网络",
        "rings": "特性",
        "scatter": "散点图",
        "stacked": "堆积面积图",
        "tree_map": "树图"
    },
    "ui": {
        "and": "和",
        "back": "后面",
        "collapse": "点击合并",
        "error": "错误",
        "expand": "单击以展开",
        "loading": "载入中...",
        "more": "{0}更多",
        "moreInfo": "点击了解更多信息",
        "noResults": "没有结果匹配{0}。",
        "primary": "主要连接",
        "share": "共享",
        "total": "总",
        "values": "值",
        "including": "包括"
    },
    "message": {
        "data": "分析数据",
        "draw": "绘制可视化",
        "initializing": "初始化{0}",
        "loading": "加载数据",
        "tooltipReset": "重置工具提示",
        "ui": "更新UI"
    },
    "uppercase": [
        "电视",
        "用户界面",
        "研发"
    ]
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Custom styling and behavior for browser console statements.
//------------------------------------------------------------------------------
d3plus.console = function( type , message , style ) {

  var style = style || ""

  if ( d3plus.ie ) {

    console.log( "[ D3plus ] " + message )

  }
  else if ( type === "groupCollapsed" ) {

    if ( window.chrome && navigator.onLine ) {
      console[type]( "%c%c " + message
                   , "padding:3px 10px;line-height:25px;background-size:20px;background-position:top left;background-image:url('http://d3plus.org/assets/img/favicon.ico');"
                   , "font-weight:200;" + style )
    }
    else {
      console[type]( "%cD3plus%c " + message
                   , "line-height:25px;font-weight:800;color:#b35c1e;margin-left:0px;"
                   , "font-weight:200;" + style )
    }

  }
  else {

    console[type]( "%c" + message , style + "font-weight:200;" )

  }

}

d3plus.console.comment = function( message ) {

  this( "log" , message , "color:#aaa;" )

}

d3plus.console.error = function( message , wiki ) {

  this( "groupCollapsed" , "ERROR: " + message , "font-weight:800;color:#D74B03;" )

  this.stack()

  this.wiki( wiki )

  this.groupEnd()

}

d3plus.console.group = function( message ) {

  this( "group" , message , "color:#888;" )

}

d3plus.console.groupCollapsed = function( message ) {

  this( "groupCollapsed" , message , "color:#888;" )

}

d3plus.console.groupEnd = function() {
  if ( !d3plus.ie ) {
    console.groupEnd()
  }
}

d3plus.console.log = function( message ) {

  this( "log" , message , "color:#444444;" )

}

d3plus.console.stack = function() {

  if ( !d3plus.ie ) {

    var err = new Error()

    if ( err.stack ) {

      var stack = err.stack.split("\n")

      stack = stack.filter(function(e){
        return e.indexOf("Error") !== 0
            && e.indexOf("d3plus.js:") < 0
            && e.indexOf("d3plus.min.js:") < 0
      })

      if ( stack.length ) {

        var splitter = window.chrome ? "at " : "@"
          , url = stack[0].split(splitter)[1]

        stack = url.split(":")
        if ( stack.length === 3 ) {
          stack.pop()
        }

        var line = stack.pop()
          , page = stack.join(":").split("/")

        page = page[page.length-1]

        var message = "line "+line+" of "+page+": "+url

        this( "log" , message , "color:#D74B03;" )

      }

    }
  }

}

d3plus.console.time = function( message ) {
  if ( !d3plus.ie ) {
    console.time( message )
  }
}

d3plus.console.timeEnd = function( message ) {
  if ( !d3plus.ie ) {
    console.timeEnd( message )
  }
}

d3plus.console.warning = function( message , wiki ) {

  this( "groupCollapsed" , message , "color:#888;" )

  this.stack()

  this.wiki( wiki )

  this.groupEnd()

}

d3plus.console.wiki = function( wiki ) {

  if ( wiki && wiki in d3plus.wiki ) {
    var url = d3plus.repo + "wiki/" + d3plus.wiki[wiki]
    this( "log" , "documentation: " + url , "color:#aaa;" )
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates custom mouse events based on IE and Touch Devices.
//------------------------------------------------------------------------------
d3plus.evt = {}

d3plus.touch = ('ontouchstart' in window) || window.DocumentTouch
               && document instanceof DocumentTouch ? true : false

if (d3plus.touch) {

  d3plus.evt.click = "click"
  d3plus.evt.down  = "touchstart"
  d3plus.evt.up    = "touchend"
  d3plus.evt.over  = "touchstart"
  d3plus.evt.out   = "touchend"
  d3plus.evt.move  = "touchmove"

}
else {

  d3plus.evt.click = "click"
  d3plus.evt.down  = "mousedown"
  d3plus.evt.up    = "mouseup"

  if (d3plus.ie) {

    d3plus.evt.over = "mouseenter"
    d3plus.evt.out  = "mouseleave"

  }
  else {

    d3plus.evt.over = "mouseover"
    d3plus.evt.out  = "mouseout"

  }

  d3plus.evt.move = "mousemove"

}

d3plus.repo    = "https://github.com/alexandersimoes/d3plus/"

d3plus.wiki    = {
  "active"     : "Segmenting-Data#active",
  "aggs"       : "Custom-Aggregations",
  "alt"        : "Alt-Text-Parameters",
  "attrs"      : "Attribute-Data#axes",
  "axes"       : "Axis-Parameters",
  "background" : "Background",
  "color"      : "Color-Parameters",
  "container"  : "Container-Element",
  "coords"     : "Geography-Data",
  "csv"        : "CSV-Export",
  "data"       : "Data-Points",
  "depth"      : "Visible-Depth",
  "descs"      : "Value-Definitions",
  "dev"        : "Verbose-Mode",
  "draw"       : "Draw",
  "edges"      : "Edges-List",
  "error"      : "Custom-Error-Message",
  "focus"      : "Focus-Element",
  "font"       : "Font-Styles",
  "footer"     : "Custom-Footer",
  "format"     : "Value-Formatting",
  "height"     : "Height",
  "history"    : "User-History",
  "hover"      : "Hover-Element",
  "icon"       : "Icon-Parameters",
  "id"         : "Unique-ID",
  "keywords"   : "Keyword-Parameters",
  "labels"     : "Data-Labels",
  "legend"     : "Legend",
  "links"      : "Link-Styles",
  "margin"     : "Outer-Margins",
  "messages"   : "Status-Messages",
  "method"     : "Methods",
  "nodes"      : "Node-Positions",
  "open"       : "Open",
  "order"      : "Data-Ordering",
  "remove"     : "Remove",
  "search"     : "Search-Box",
  "select"     : "Selecting-Elements#select",
  "selectAll"  : "Selecting-Elements#selectall",
  "shape"      : "Data-Shapes",
  "size"       : "Size-Parameters",
  "temp"       : "Segmenting-Data#temp",
  "text"       : "Text-Parameters",
  "time"       : "Time-Parameters",
  "timeline"   : "Timeline",
  "timing"     : "Animation-Timing",
  "title"      : "Custom-Titles",
  "tooltip"    : "Tooltip-Parameters",
  "total"      : "Segmenting-Data#total",
  "type"       : "Output-Type",
  "ui"         : "Custom-Interface",
  "width"      : "Width",
  "x"          : "Axis-Parameters",
  "y"          : "Axis-Parameters",
  "zoom"       : "Zooming"
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Determines if the current browser is Internet Explorer.
//------------------------------------------------------------------------------
d3plus.ie = /*@cc_on!@*/false

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Calculates the correct CSS vendor prefix based on the current browser.
//------------------------------------------------------------------------------
d3plus.prefix = function() {

  if ("-webkit-transform" in document.body.style) {
    var val = "-webkit-"
  }
  else if ("-moz-transform" in document.body.style) {
    var val = "-moz-"
  }
  else if ("-ms-transform" in document.body.style) {
    var val = "-ms-"
  }
  else if ("-o-transform" in document.body.style) {
    var val = "-o-"
  }
  else {
    var val = ""
  }

  d3plus.prefix = function(){
    return val
  }

  return val;

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Detects right-to-left text direction on the page.
//------------------------------------------------------------------------------
d3plus.rtl = d3.select("html").attr("dir") == "rtl"

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Detects scrollbar width for current browser.
//------------------------------------------------------------------------------
d3plus.scrollbar = function() {

  var inner = document.createElement("p");
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement("div");
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild(inner);

  document.body.appendChild(outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild(outer);

  var val = (w1 - w2)

  d3plus.scrollbar = function(){
    return val
  }

  return val;

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Global method shell.
//------------------------------------------------------------------------------
d3plus.method = function( vars , methods , styles ) {

  var methods   = methods || []
    , styles    = styles || []
    , initStyle = d3plus.style[ d3plus.method.style.value ]

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Loop through each specified method and apply it to the object.
  //----------------------------------------------------------------------------
  methods.forEach(function(m) {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Clone method defaults.
    //--------------------------------------------------------------------------
    if ( !(m in vars) ) {
      vars[m] = {}
    }

    vars[m] = d3plus.object.merge( d3plus.method[m] , vars[m] )

    if ( styles.indexOf(m) >= 0 ) {
      vars[m] = d3plus.object.merge( initStyle[m] , vars[m] )
      styles.splice(styles.indexOf(m),1)
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Run initialization on all inner properties.
    //--------------------------------------------------------------------------
    d3plus.method.init( vars , vars[m] , m )

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create the main set/get function.
    //--------------------------------------------------------------------------
    vars.self[m] = (d3plus.method.function)( m , vars )

  })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Loop through remaining styles and create methods for them.
  //----------------------------------------------------------------------------
  styles.forEach(function(m){

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Clone style defaults.
    //--------------------------------------------------------------------------
    vars[m] = d3plus.object.merge( vars[m] || {} , initStyle[m] )

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Run initialization on all inner properties.
    //--------------------------------------------------------------------------
    d3plus.method.init( vars , vars[m] , m )

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create the main set/get function.
    //--------------------------------------------------------------------------
    vars.self[m] = (d3plus.method.function)( m , vars )

  })

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Formats numbers to look "pretty"
//------------------------------------------------------------------------------
d3plus.number.format = function( number , key , vars ) {

  if ( !vars && "getVars" in this) {
    var vars = this.getVars()
  }

  if ( vars && key && (
       ( key === vars.x.value && vars.x.scale.value === "log" ) ||
       ( key === vars.y.value && vars.y.scale.value === "log" ) ) ) {

    var superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹"
      , formatPower = function(d) {
          return (d + "").split("").map(function(c) {
            return superscript[c]
          }).join("")
        }

    return 10 + " " + formatPower( Math.round(Math.log(number) / Math.LN10) )

  }

  if ( "locale" in this ) {
    var locale = this.locale.value
      , time = locale.time
  }
  else {
    var locale = d3plus.locale.en
      , time = locale.time
  }

  if ( vars && typeof vars.time.value === "string") {
    time.push(vars.time.value)
  }

  if (key && time.indexOf(key.toLowerCase()) >= 0) {
    return number
  }
  else if (number < 10 && number > -10) {
    return d3.round(number,2)
  }
  else if (number.toString().split(".")[0].length > 4) {
    var symbol = d3.formatPrefix(number).symbol
    symbol = symbol.replace("G", "B") // d3 uses G for giga

    // Format number to precision level using proper scale
    number = d3.formatPrefix(number).scale(number)
    number = parseFloat(d3.format(".3g")(number))
    return number + symbol;
  }
  else if (key == "share") {
    return d3.format(".2f")(number)
  }
  else {
    return d3.format(",f")(number)
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Merge two objects to create a new one with the properties of both
//------------------------------------------------------------------------------
d3plus.object.merge = function(obj1, obj2) {

  var obj3 = {};

  function copy_object(obj,ret) {

    for ( var a in obj ) {

      if (typeof obj[a] != "undefined") {

        if ( d3plus.object.validate(obj[a]) ) {

          if (typeof ret[a] !== "object") ret[a] = {}
          copy_object(obj[a],ret[a])

        }
        else if ( !d3plus.util.d3selection(obj[a])
                  && obj[a] instanceof Array ) {

          ret[a] = obj[a].slice(0)

        }
        else {

          ret[a] = obj[a]

        }

      }

    }

  }

  if (obj1) copy_object(obj1,obj3)
  if (obj2) copy_object(obj2,obj3)

  return obj3;
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Checks to see if the passed object has keys and is not an array.
//------------------------------------------------------------------------------
d3plus.object.validate = function( obj ) {

  return obj !== null && typeof obj === "object" && !(obj instanceof Array)

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Formats a string similar to Python's "format"
//------------------------------------------------------------------------------
d3plus.string.format = function() {

  var args = Array.prototype.slice.call(arguments)
    , str = args.shift()

  str.unkeyed_index = 0;
  return str.replace(/\{(\w*)\}/g, function(match, key) {
      if (key === '') {
          key = str.unkeyed_index;
          str.unkeyed_index++
      }
      if (key == +key) {
          return args[key] !== 'undefined'
              ? args[key]
              : match;
      } else {
          for (var i = 0; i < args.length; i++) {
              if (typeof args[i] === 'object' && typeof args[i][key] !== 'undefined') {
                  return args[i][key];
              }
          }
          return match;
      }
  }.bind(str));

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Converts an array of strings into a string list using commas and "and".
//------------------------------------------------------------------------------
d3plus.string.list = function( list , and , max , more ) {

  if ( !(list instanceof Array) ) {
    return list
  }
  else {
    list = list.slice(0)
  }

  if ( !and ) {
    var and = d3plus.locale.en.ui.and
  }

  if ( !more ) {
    var more = d3plus.locale.en.ui.more
  }

  if ( list.length === 2 ) {
    return list.join(" "+and+" ")
  }
  else {

    if ( max && list.length > max ) {
      var amount = list.length - max + 1
      list = list.slice( 0 , max - 1 )
      list[ max - 1 ] = d3plus.string.format( more , amount )
    }

    if ( list.length > 1 ) {
      list[list.length-1] = and+" "+list[list.length-1]
    }

    return list.join(", ")

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Removes all non ASCII characters
//------------------------------------------------------------------------------
d3plus.string.strip = function(str) {

  var removed = [ "!","@","#","$","%","^","&","*","(",")",
                  "[","]","{","}",".",",","/","\\","|",
                  "'","\"",";",":","<",">","?","=","+"]
  str += ""

  return ""+str.replace(/[^A-Za-z0-9\-_]/g, function(chr) {

    if (" " == chr) {
      return "_"
    }
    else if (removed.indexOf(chr) >= 0) {
      return ""
    }

    var diacritics = [
        [/[\300-\306]/g, "A"],
        [/[\340-\346]/g, "a"],
        [/[\310-\313]/g, "E"],
        [/[\350-\353]/g, "e"],
        [/[\314-\317]/g, "I"],
        [/[\354-\357]/g, "i"],
        [/[\322-\330]/g, "O"],
        [/[\362-\370]/g, "o"],
        [/[\331-\334]/g, "U"],
        [/[\371-\374]/g, "u"],
        [/[\321]/g, "N"],
        [/[\361]/g, "n"],
        [/[\307]/g, "C"],
        [/[\347]/g, "c"],
    ];

    var ret = ""

    for ( var d in diacritics ) {

      if (diacritics[d][0].test(chr)) {
        ret = diacritics[d][1]
        break;
      }

    }

    return ret;

  });

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Formats numbers to look "pretty"
//------------------------------------------------------------------------------
d3plus.string.title = function( text , key , vars ) {

  if (!text) {
    return ""
  }

  if ( "locale" in this ) {
    var locale = this.locale.value
    if ( typeof locale === "string" ) {
      locale = locale in d3plus.locale
             ? d3plus.locale[locale] : d3plus.locale.en
    }
  }
  else {
    var locale = d3plus.locale.en
  }

  if ( text.charAt(text.length-1) === "." ) {
    return text.charAt(0).toUpperCase() + text.substr(1)
  }

  var smalls = locale.lowercase,
      bigs   = locale.uppercase

  return text.replace(/\w\S*/g, function(txt,i){

    if ( bigs.indexOf(txt.toLowerCase()) >= 0 ) {
      return txt.toUpperCase()
    }
    else if ( smalls.indexOf(txt.toLowerCase()) >= 0
              && i !== 0 && i !== text.length-1 ) {
      return txt.toLowerCase()
    }

    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()

  })

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Word wraps SVG text
//------------------------------------------------------------------------------
d3plus.textwrap = function() {

  var vars = { "shell" : "textwrap" }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Main drawing function
  //----------------------------------------------------------------------------
  vars.self = function(selection) {

    selection.each(function() {

      d3plus.textwrap.getDimensions( vars )
      d3plus.textwrap.getSize( vars )

      if ( vars.size.value[0] < vars.height.value ) {
        d3plus.textwrap.getText( vars )
        d3plus.textwrap.wrap( vars )
      }

    })

    return vars.self
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Define methods and expose public variables.
  //----------------------------------------------------------------------------
  var methods = [ "container" , "dev" , "draw" , "format" , "height"
                , "resize" , "text" , "shape" , "size" , "width" ]
  d3plus.method( vars , methods )

  return vars.self

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates correctly formatted tooltip for Apps
//-------------------------------------------------------------------
d3plus.tooltip.app = function(params) {

  if ( !( "d3plus" in params.data ) ) {
    params.data.d3plus = {}
  }

  var vars = params.vars,
      d = params.data,
      dataDepth = "d3plus" in d && "depth" in d.d3plus ? d.d3plus.depth : vars.depth.value,
      ex = params.ex,
      mouse = params.mouseevents ? params.mouseevents : false,
      arrow = "arrow" in params ? params.arrow : true,
      id = d3plus.variable.value(vars,d,vars.id.value),
      tooltip_id = params.id || vars.type.value

  if ((d3.event && d3.event.type == "click") && (vars.tooltip.html.value || vars.tooltip.value.long) && !("fullscreen" in params)) {
    var fullscreen = true,
        arrow = false,
        mouse = true,
        length = "long",
        footer = vars.footer.value

    vars.covered = true
  }
  else {
    var fullscreen = false,
        align = params.anchor || vars.tooltip.anchor,
        length = params.length || "short",
        zoom = vars.zoom.direction(d)

    if (zoom === -1) {
      var key = vars.id.nesting[dataDepth-1],
          parent = d3plus.variable.value(vars,id,key)
    }

    if (zoom === 1 && vars.zoom.value) {
      var text = vars.format.value(vars.format.locale.value.ui.expand)
    }
    else if (zoom === -1 && vars.zoom.value && vars.history.states.length) {
      var text = vars.format.value(vars.format.locale.value.ui.collapse)
    }
    else if (length == "short" && (vars.tooltip.html.value || vars.tooltip.value.long) && vars.focus.value != id) {
      var text = vars.format.locale.value.ui.moreInfo
    }
    else if (length == "long") {
      var text = vars.footer.value || ""
    }
    else {
      var text = ""
    }

    var footer = text.length ? vars.format.value(text,"footer") : false

  }

  if ("x" in params) {
    var x = params.x
  }
  else if (d3plus.visualization[vars.type.value].tooltip == "follow") {
    var x = d3.mouse(vars.container.value.node())[0]
  }
  else {
    var x = d.d3plus.x
    if (vars.zoom.translate && vars.zoom.scale) {
      x = vars.zoom.translate[0]+x*vars.zoom.scale
    }
    x += vars.margin.left
  }

  if ("y" in params) {
    var y = params.y
  }
  else if (d3plus.visualization[vars.type.value].tooltip == "follow") {
    var y = d3.mouse(vars.container.value.node())[1]
  }
  else {
    var y = d.d3plus.y
    if (vars.zoom.translate && vars.zoom.scale) {
      y = vars.zoom.translate[1]+y*vars.zoom.scale
    }
    y += vars.margin.top
  }

  if ("offset" in params) {
    var offset = params.offset
  }
  else if (d3plus.visualization[vars.type.value].tooltip == "follow") {
    var offset = 3
  }
  else {
    var offset = d.d3plus.r ? d.d3plus.r : d.d3plus.height/2
    if (vars.zoom.scale) {
      offset = offset * vars.zoom.scale
    }
  }

  function make_tooltip(html) {

    var ex = {}
      , children = {}
      , depth     = "merged" in d.d3plus ? dataDepth : dataDepth + 1
      , nestKey   = vars.id.nesting[depth]
      , nameList  = "merged" in d.d3plus ? d.d3plus.merged : d[nestKey]
      , dataValue = d3plus.variable.value( vars , d , vars.size.value )

    if ( vars.tooltip.children.value ) {

      if ( nameList instanceof Array ) {

        nameList = nameList.slice(0)

        var limit       = length === "short" ? 3 : vars.data.large
          , max         = d3.min([nameList.length , limit])

        for ( var i = 0 ; i < max ; i++ ) {

          var id    = nameList[i]
            , name  = d3plus.variable.text( vars , id , depth )[0]
            , value = d3plus.variable.value( vars , id , vars.size.value , nestKey )
            , color = d3plus.variable.color( vars , id , nestKey )

          children[name] = value ? vars.format.value( value , vars.size.value ) : ""

          if ( color ) {
            if ( !children.d3plus_colors ) children.d3plus_colors = {}
            children.d3plus_colors[name] = color
          }

        }

        if ( nameList.length > max ) {
          children.d3plusMore = nameList.length - max
        }

      }
      else if ( nameList ) {

        var name  = d3plus.variable.text( vars , nameList , depth )[0]

        children[name] = dataValue ? vars.format.value( dataValue , vars.size.value ) : ""

      }

    }

    if ( vars.tooltip.size.value && dataValue && ( !nameList || nameList instanceof Array ) ) {
      ex[vars.size.value] = dataValue
    }

    var active = vars.active.value ? d3plus.variable.value(vars,d,vars.active.value) : d.d3plus.active,
        temp = vars.temp.value ? d3plus.variable.value(vars,d,vars.temp.value) : d.d3plus.temp,
        total = vars.total.value ? d3plus.variable.value(vars,d,vars.total.value) : d.d3plus.total

    if (typeof active == "number" && active > 0 && total) {
      var label = vars.active.value || "active"
      ex[label] = active+"/"+total+" ("+vars.format.value((active/total)*100,"share")+"%)"
    }

    if (typeof temp == "number" && temp > 0 && total) {
      var label = vars.temp.value || "temp"
      ex[label] = temp+"/"+total+" ("+vars.format.value((temp/total)*100,"share")+"%)"
    }

    if ( vars.tooltip.share.value && d.d3plus.share ) {
      ex.share = vars.format.value(d.d3plus.share*100,"share")+"%"
    }

    var depth = "depth" in params ? params.depth : dataDepth,
        title = d3plus.variable.text(vars,d,depth)[0],
        icon = d3plus.variable.value(vars,d,vars.icon.value,vars.id.nesting[depth]),
        tooltip_data = d3plus.tooltip.data(vars,d,length,ex,children,depth)

    if ((tooltip_data.length > 0 || footer) || ((!d.d3plus_label && length == "short" && title) || (d.d3plus_label && "visible" in d.d3plus_label && !d.d3plus_label.visible))) {

      if (!title) {
        title = id
      }

      var depth = d.d3plus && "depth" in d.d3plus ? vars.id.nesting[d.d3plus.depth] : vars.id.value

      if (typeof vars.icon.style.value == "string") {
        var icon_style = vars.icon.style.value
      }
      else if (typeof vars.icon.style.value == "object" && vars.icon.style.value[depth]) {
        var icon_style = vars.icon.style.value[depth]
      }
      else {
        var icon_style = "default"
      }

      if (params.width) {
        var width = params.width
      }
      else if (!fullscreen && tooltip_data.length == 0) {
        var width = "auto"
      }
      else {
        var width = vars.tooltip.small
      }

      d3plus.tooltip.create({
        "align": align,
        "arrow": arrow,
        "locale": vars.format.locale.value,
        "background": vars.tooltip.background,
        "curtain": vars.tooltip.curtain.color,
        "curtainopacity": vars.tooltip.curtain.opacity,
        "fontcolor": vars.tooltip.font.color,
        "fontfamily": vars.tooltip.font.family.value,
        "fontsize": vars.tooltip.font.size,
        "fontweight": vars.tooltip.font.weight,
        "data": tooltip_data,
        "color": d3plus.variable.color(vars,d),
        "allColors": true,
        "footer": params.footer === false ? params.footer : footer,
        "fullscreen": fullscreen,
        "html": html,
        "icon": icon,
        "id": tooltip_id,
        "max_height": params.maxheight,
        "max_width": vars.tooltip.small,
        "mouseevents": mouse,
        "offset": offset,
        "parent": vars.container.value,
        "style": icon_style,
        "title": title,
        "width": width,
        "x": x,
        "y": y
      })

    }
    else {
      d3plus.tooltip.remove(tooltip_id)
    }

  }

  if (fullscreen) {

    if (typeof vars.tooltip.html.value == "string") {
      make_tooltip(vars.tooltip.html.value)
    }
    else if (typeof vars.tooltip.html.value == "function") {
      make_tooltip(vars.tooltip.html.value(id))
    }
    else if (vars.tooltip.html.value && typeof vars.tooltip.html.value == "object" && vars.tooltip.html.value.url) {
      d3.json(vars.tooltip.html.value.url,function(data){
        var html = vars.tooltip.html.value.callback ? vars.tooltip.html.value.callback(data) : data
        make_tooltip(html)
      })
    }
    else {
      make_tooltip("")
    }

  }
  else {
    make_tooltip("")
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Correctly positions the tooltip's arrow
//-------------------------------------------------------------------
d3plus.tooltip.arrow = function(arrow) {
  arrow
    .style("bottom", function(d){
      if (d.anchor.y != "center" && !d.flip) return "-5px"
      else return "auto"
    })
    .style("top", function(d){
      if (d.anchor.y != "center" && d.flip) return "-5px"
      else if (d.anchor.y == "center") return "50%"
      else return "auto"
    })
    .style("left", function(d){
      if (d.anchor.y == "center" && d.flip) return "-5px"
      else if (d.anchor.y != "center") return "50%"
      else return "auto"
    })
    .style("right", function(d){
      if (d.anchor.y == "center" && !d.flip) return "-5px"
      else return "auto"
    })
    .style("margin-left", function(d){
      if (d.anchor.y == "center") {
        return "auto"
      }
      else {
        if (d.anchor.x == "right") {
          var arrow_x = -d.width/2+d.arrow_offset/2
        }
        else if (d.anchor.x == "left") {
          var arrow_x = d.width/2-d.arrow_offset*2 - 5
        }
        else {
          var arrow_x = -5
        }
        if (d.cx-d.width/2-5 < arrow_x) {
          arrow_x = d.cx-d.width/2-5
          if (arrow_x < 2-d.width/2) arrow_x = 2-d.width/2
        }
        else if (-(d.limit[0]-d.cx-d.width/2+5) > arrow_x) {
          var arrow_x = -(d.limit[0]-d.cx-d.width/2+5)
          if (arrow_x > d.width/2-11) arrow_x = d.width/2-11
        }
        return arrow_x+"px"
      }
    })
    .style("margin-top", function(d){
      if (d.anchor.y != "center") {
        return "auto"
      }
      else {
        if (d.anchor.y == "bottom") {
          var arrow_y = -d.height/2+d.arrow_offset/2 - 1
        }
        else if (d.anchor.y == "top") {
          var arrow_y = d.height/2-d.arrow_offset*2 - 2
        }
        else {
          var arrow_y = -9
        }
        if (d.cy-d.height/2-d.arrow_offset < arrow_y) {
          arrow_y = d.cy-d.height/2-d.arrow_offset
          if (arrow_y < 4-d.height/2) arrow_y = 4-d.height/2
        }
        else if (-(d.limit[1]-d.cy-d.height/2+d.arrow_offset) > arrow_y) {
          var arrow_y = -(d.limit[1]-d.cy-d.height/2+d.arrow_offset)
          if (arrow_y > d.height/2-22) arrow_y = d.height/2-22
        }
        return arrow_y+"px"
      }
    })
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Create a Tooltip
//-------------------------------------------------------------------
d3plus.tooltip.create = function(params) {

  var default_width = params.fullscreen ? 250 : 200
  params.width = params.width || default_width
  params.max_width = params.max_width || 386
  params.id = params.id || "default"
  params.size = params.fullscreen || params.html ? "large" : "small"
  params.offset = params.offset || 0
  params.arrow_offset = params.arrow ? 8 : 0
  params.x = params.x || 0
  params.y = params.y || 0
  params.parent = params.parent || d3.select("body")
  params.curtain = params.curtain || "#fff"
  params.curtainopacity = params.curtainopacity || 0.8
  params.background = params.background || "#fff"
  params.fontcolor = params.fontcolor || "#444"
  params.fontfamily = params.fontfamily || "sans-serif"
  params.fontweight = params.fontweight || "normal"
  params.fontsize = params.fontsize || "12px"
  params.style = params.style || "default"
  params.zindex = params.size == "small" ? 2000 : 500
  params.locale = params.locale || d3plus.locale.en

  if (!params.iconsize) {
    params.iconsize = params.size == "small" ? 22 : 50
  }

  params.limit = [
    parseFloat(params.parent.style("width"),10),
    parseFloat(params.parent.style("height"),10)
  ]

  if ( params.title instanceof Array ) {

    var and = params.locale.ui.and
      , more = params.locale.ui.more

    params.title = d3plus.string.list( params.title , and , 3 , more )

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Function that closes ALL Descriptions
  //-------------------------------------------------------------------
  var close_descriptions = function() {
    d3.selectAll("div.d3plus_tooltip_data_desc").style("height","0px")
    d3.selectAll("div.d3plus_tooltip_data_help").style("background-color","#ccc")
  }

  d3plus.tooltip.remove(params.id)

  params.anchor = {}
  if (params.fullscreen) {
    params.anchor.x = "center"
    params.anchor.y = "center"
    params.x = params.parent ? params.parent.node().offsetWidth/2 : window.innerWidth/2
    params.y = params.parent ? params.parent.node().offsetHeight/2 : window.innerHeight/2
  }
  else if (params.align) {
    var a = params.align.split(" ")
    params.anchor.y = a[0]
    if (a[1]) params.anchor.x = a[1]
    else params.anchor.x = "center"
  }
  else {
    params.anchor.x = "center"
    params.anchor.y = "top"
  }

  var title_width = params.width - 30

  if (params.fullscreen) {
    var curtain = params.parent.append("div")
      .attr("id","d3plus_tooltip_curtain_"+params.id)
      .attr("class","d3plus_tooltip_curtain")
      .style("background-color",params.curtain)
      .style("opacity",params.curtainopacity)
      .style("position","absolute")
      .style("z-index",499)
      .style("top","0px")
      .style("right","0px")
      .style("bottom","0px")
      .style("left","0px")
      .on(d3plus.evt.click,function(){
        d3plus.tooltip.remove(params.id)
      })
  }

  var tooltip = params.parent.append("div")
    .datum(params)
    .attr("id","d3plus_tooltip_id_"+params.id)
    .attr("class","d3plus_tooltip d3plus_tooltip_"+params.size)
    .style("color",params.fontcolor)
    .style("font-family",params.fontfamily)
    .style("font-weight",params.fontweight)
    .style("font-size",params.fontsize+"px")
    .style("position","absolute")
    .style("z-index",params.zindex)
    .on(d3plus.evt.out,function(){
      close_descriptions()
    })

  if (params.max_height) {
    tooltip.style("max-height",params.max_height+"px")
  }

  if (params.fixed) {
    tooltip.style("z-index",500)
    params.mouseevents = true
  }
  else {
    tooltip.style("z-index",2000)
  }

  var container = tooltip.append("div")
    .datum(params)
    .attr("class","d3plus_tooltip_container")
    .style("background-color",params.background)

  if (params.fullscreen && params.html) {

    w = params.parent ? params.parent.node().offsetWidth*0.75 : window.innerWidth*0.75
    h = params.parent ? params.parent.node().offsetHeight*0.75 : window.innerHeight*0.75

    container
      .style("width",w+"px")
      .style("height",h+"px")

    var body = container.append("div")
      .attr("class","d3plus_tooltip_body")
      .style("display","inline-block")
      .style("z-index",1)
      .style("width",params.width+"px")

  }
  else {

    if (params.width == "auto") {
      var w = "auto"
      container.style("max-width",params.max_width+"px")
    }
    else var w = params.width-14+"px"

    var body = container
      .style("width",w)

  }

  if (params.title || params.icon) {
    var header = body.append("div")
      .attr("class","d3plus_tooltip_header")
      .style("position","relative")
      .style("z-index",1)
  }

  if (params.fullscreen) {
    var close = tooltip.append("div")
      .attr("class","d3plus_tooltip_close")
      .style("background-color",params.color)
      .style("color",d3plus.color.text(params.color))
      .style("position","absolute")
      .html("\&times;")
      .on(d3plus.evt.click,function(){
        d3plus.tooltip.remove(params.id)
      })
  }

  if (!params.mouseevents) {
    tooltip.style("pointer-events","none")
  }
  else if (params.mouseevents !== true) {

    var oldout = d3.select(params.mouseevents).on(d3plus.evt.out)

    var newout = function() {

      var target = d3.event.toElement || d3.event.relatedTarget
      if (target) {
        var c = typeof target.className == "string" ? target.className : target.className.baseVal
        var istooltip = c.indexOf("d3plus_tooltip") == 0
      }
      else {
        var istooltip = false
      }
      if (!target || (!ischild(tooltip.node(),target) && !ischild(params.mouseevents,target) && !istooltip)) {
        oldout(d3.select(params.mouseevents).datum())
        close_descriptions()
        d3.select(params.mouseevents).on(d3plus.evt.out,oldout)
      }
    }

    var ischild = function(parent, child) {
       var node = child.parentNode;
       while (node !== null) {
         if (node == parent) {
           return true;
         }
         node = node.parentNode;
       }
       return false;
    }

    d3.select(params.mouseevents).on(d3plus.evt.out,newout)
    tooltip.on(d3plus.evt.out,newout)

    var move_event = d3.select(params.mouseevents).on(d3plus.evt.move)
    if (move_event) {
      tooltip.on(d3plus.evt.move,move_event)
    }

  }

  if (params.arrow) {
    var arrow = tooltip.append("div")
      .attr("class","d3plus_tooltip_arrow")
      .style("background-color",params.background)
      .style("position","absolute")
  }

  if (params.icon) {

    var title_icon = header.append("div")
      .attr("class","d3plus_tooltip_icon")
      .style("width",params.iconsize+"px")
      .style("height",params.iconsize+"px")
      .style("z-index",1)
      .style("background-position","50%")
      .style("background-size","100%")
      .style("background-image","url("+params.icon+")")
      .style("display","inline-block")

    if (params.style == "knockout") {
      title_icon.style("background-color",params.color)
    }

    title_width -= title_icon.node().offsetWidth
  }

  if (params.title) {
    var mw = params.max_width-6
    if ( params.icon ) mw -= (params.iconsize+6)
    mw += "px"

    var title = header.append("div")
      .attr("class","d3plus_tooltip_title")
      .style("max-width",mw)
      .style("color",!params.icon ? d3plus.color.legible(params.color) : params.fontcolor)
      .style("vertical-align","top")
      .style("width",title_width+"px")
      .style("display","inline-block")
      .style("overflow","hidden")
      .style("text-overflow","ellipsis")
      .style("word-wrap","break-word")
      .style("z-index",1)
      .text(params.title)
  }

  if (params.description) {
    var description = body.append("div")
      .attr("class","d3plus_tooltip_description")
      .text(params.description)
  }

  if (params.data || params.html && !params.fullscreen) {

    var data_container = body.append("div")
      .attr("class","d3plus_tooltip_data_container")
  }

  if (params.data) {

    var val_width = 0, val_heights = {}

    var last_group = null
    params.data.forEach(function(d,i){

      if (d.group) {
        if (last_group != d.group) {
          last_group = d.group
          data_container.append("div")
            .attr("class","d3plus_tooltip_data_title")
            .text(d.group)
        }
      }

      var block = data_container.append("div")
        .attr("class","d3plus_tooltip_data_block")
        .datum(d)

      if ( d.highlight === true ) {
        block.style("color",d3plus.color.legible(params.color))
      }
      else if ( d.allColors || d.highlight !== params.color ) {
        block.style("color",d3plus.color.legible(d.highlight))
      }

      var name = block.append("div")
          .attr("class","d3plus_tooltip_data_name")
          .html(d.name)
          .on(d3plus.evt.out,function(){
            d3.event.stopPropagation()
          })

      if ( d.value instanceof Array ) {

        var and = params.locale.ui.and
          , more = params.locale.ui.more

        d.value = d3plus.string.list( d.value , and , 3 , more )

      }

      var val = block.append("div")
          .attr("class","d3plus_tooltip_data_value")
          .text(d.value)
          .on(d3plus.evt.out,function(){
            d3.event.stopPropagation()
          })

      if (d3plus.rtl) {
        val.style("left","6px")
      }
      else {
        val.style("right","6px")
      }

      if (params.mouseevents && d.desc) {
        var desc = block.append("div")
          .attr("class","d3plus_tooltip_data_desc")
          .text(d.desc)
          .on(d3plus.evt.out,function(){
            d3.event.stopPropagation()
          })

        var dh = desc.node().offsetHeight

        desc.style("height","0px")

        var help = name.append("div")
          .attr("class","d3plus_tooltip_data_help")
          .text("?")
          .on(d3plus.evt.over,function(){
            var c = d3.select(this.parentNode.parentNode).style("color")
            d3.select(this).style("background-color",c)
            desc.style("height",dh+"px")
          })
          .on(d3plus.evt.out,function(){
            d3.event.stopPropagation()
          })

        name
          .style("cursor","pointer")
          .on(d3plus.evt.over,function(){
            close_descriptions()
            var c = d3.select(this.parentNode).style("color")
            help.style("background-color",c)
            desc.style("height",dh+"px")
          })

        block.on(d3plus.evt.out,function(){
          d3.event.stopPropagation()
          close_descriptions()
        })
      }

      var w = parseFloat(val.style("width"),10)
      if (w > params.width/2) w = params.width/2
      if (w > val_width) val_width = w

      if (i != params.data.length-1) {
        if ((d.group && d.group == params.data[i+1].group) || !d.group && !params.data[i+1].group)
        data_container.append("div")
          .attr("class","d3plus_tooltip_data_seperator")
      }

    })

    data_container.selectAll(".d3plus_tooltip_data_name")
      .style("width",function(){
        var w = parseFloat(d3.select(this.parentNode).style("width"),10)
        return (w-val_width-30)+"px"
      })

    data_container.selectAll(".d3plus_tooltip_data_value")
      .style("width",val_width+"px")
      .each(function(d){
        var h = parseFloat(d3.select(this).style("height"),10)
        val_heights[d.name] = h
      })

    data_container.selectAll(".d3plus_tooltip_data_name")
      .style("min-height",function(d){
        return val_heights[d.name]+"px"
      })

  }

  if (params.html && !params.fullscreen) {
    data_container.append("div")
      .html(params.html)
  }

  var footer = body.append("div")
    .attr("class","d3plus_tooltip_footer")

  if (params.footer) {
    footer.html(params.footer)
  }

  params.height = tooltip.node().offsetHeight

  if (params.html && params.fullscreen) {
    var h = params.height-12
    var w = tooltip.node().offsetWidth-params.width-44
    container.append("div")
      .attr("class","d3plus_tooltip_html")
      .style("width",w+"px")
      .style("height",h+"px")
      .html(params.html)
  }

  params.width = tooltip.node().offsetWidth

  if (params.anchor.y != "center") params.height += params.arrow_offset
  else params.width += params.arrow_offset

  if (params.data || (!params.fullscreen && params.html)) {

    if (!params.fullscreen) {
      var parent_height = params.parent.node().offsetHeight
      var limit = params.fixed ? parent_height-params.y-10 : parent_height-10
      var h = params.height < limit ? params.height : limit
    }
    else {
      var h = params.height
    }
    h -= parseFloat(container.style("padding-top"),10)
    h -= parseFloat(container.style("padding-bottom"),10)
    if (header) {
      h -= header.node().offsetHeight
      h -= parseFloat(header.style("padding-top"),10)
      h -= parseFloat(header.style("padding-bottom"),10)
    }
    if (footer) {
      h -= footer.node().offsetHeight
      h -= parseFloat(footer.style("padding-top"),10)
      h -= parseFloat(footer.style("padding-bottom"),10)
    }

    data_container
      .style("max-height",h+"px")
  }

  params.height = tooltip.node().offsetHeight

  d3plus.tooltip.move(params.x,params.y,params.id);

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates a data object for the Tooltip
//------------------------------------------------------------------------------
d3plus.tooltip.data = function(vars,id,length,extras,children,depth) {

  if (vars.small) {
    return []
  }

  if (!length) var length = "long"
  if (length == "long") {
    var other_length = "short"
  }
  else {
    var other_length = "long"
  }

  var extra_data = {}
  if (extras && typeof extras == "string") extras = [extras]
  else if (extras && typeof extras == "object") {
    extra_data = d3plus.object.merge(extra_data,extras)
    var extras = []
    for ( var k in extra_data ) {
      extras.push(k)
    }
  }
  else if (!extras) var extras = []

  var tooltip_highlights = []

  if (vars.tooltip.value instanceof Array) {
    var a = vars.tooltip.value
  }
  else if (typeof vars.tooltip.value == "string") {
    var a = [vars.tooltip.value]
  }
  else {

    if (vars.tooltip.value[vars.id.nesting[depth]]) {
      var a = vars.tooltip.value[vars.id.nesting[depth]]
    }
    else {
      var a = vars.tooltip.value
    }

    if (!(a instanceof Array)) {

      if (a[length]) {
        a = a[length]
      }
      else if (a[other_length]) {
        a = []
      }
      else {
        a = d3plus.object.merge({"":[]},a)
      }

    }

    if (typeof a == "string") {
      a = [a]
    }
    else if (!(a instanceof Array)) {
      a = d3plus.object.merge({"":[]},a)
    }

  }

  function format_key(key,group) {
    if (vars.attrs.value[group]) var id_var = group
    else var id_var = null

    if (group) group = vars.format.value(group)

    var value = extra_data[key] || d3plus.variable.value(vars,id,key,id_var)

    if (value !== false && value !== null) {
      var name = vars.format.locale.value.ui[key]
               ? vars.format.value(vars.format.locale.value.ui[key])
               : vars.format.value(key),
          h = tooltip_highlights.indexOf(key) >= 0

      if ( value instanceof Array ) {
        value.forEach(function(v){
          v = vars.format.value(v)
        })
      }
      else {
        value = vars.format.value(value)
      }

      var obj = {"name": name, "value": value, "highlight": h, "group": group}

      if ( vars.descs.value ) {

        if ( typeof vars.descs.value === "function" ) {
          var descReturn = vars.descs.value( key )
          if ( typeof descReturn === "string" ) {
            obj.desc = descReturn
          }
        }
        else if ( key in vars.descs.value ) {
          obj.desc = vars.descs.value[key]
        }

      }

      if (value) tooltip_data.push(obj)
    }

  }

  var tooltip_data = []
  if (a instanceof Array) {

    extras.forEach(function(e){
      if (a.indexOf(e) < 0) a.push(e)
    })

    a.forEach(function(t){
      format_key(t)
    })

  }
  else {

    if (vars.id.nesting.length && depth < vars.id.nesting.length-1) {
      var a = d3plus.util.copy(a)
      vars.id.nesting.forEach(function(n,i){
        if (i > depth && a[n]) delete a[n]
      })
    }

    if (vars.tooltip.value.long && typeof vars.tooltip.value.long == "object") {
      var placed = []
      for ( var group in vars.tooltip.value.long ) {

        extras.forEach(function(e){
          if (vars.tooltip.value.long[group].indexOf(e) >= 0 && ((a[group] && a[group].indexOf(e) < 0) || !a[group])) {
            if (!a[group]) a[group] = []
            a[group].push(e)
            placed.push(e)
          }
          else if (a[group] && a[group].indexOf(e) >= 0) {
            placed.push(e)
          }
        })
      }
      extras.forEach(function(e){
        if (placed.indexOf(e) < 0) {
          if (!a[""]) a[""] = []
          a[""].push(e)
        }
      })
    }
    else {

      var present = []

      for ( var group in a ) {
        extras.forEach(function(e){
          if (a[group] instanceof Array && a[group].indexOf(e) >= 0) {
            present.push(e)
          }
          else if (typeof a[group] == "string" && a[group] == e) {
            present.push(e)
          }
        })
      }

      if (present.length != extras.length) {
        if (!a[""]) a[""] = []
        extras.forEach(function(e){
          if (present.indexOf(e) < 0) {
            a[""].push(e)
          }
        })
      }

    }

    if (a[""]) {
      a[""].forEach(function(t){
        format_key(t,"")
      })
      delete a[""]
    }

    for ( var group in a ) {
      if (a[group] instanceof Array) {
        a[group].forEach(function(t){
          format_key(t,group)
        })
      }
      else if (typeof a[group] == "string") {
        format_key(a[group],group)
      }
    }

  }

  if ( children ) {

    var title  = vars.format.locale.value.ui.including
      , colors = children.d3plus_colors

    for ( var child in children ) {

      if ( child !== "d3plus_colors" ) {

        if ( child === "d3plusMore" ) {

          var more = vars.format.locale.value.ui.more
            , name = d3plus.string.format(more,children[child])
            , highlight = true
          children[child] = ""

        }
        else {
          var name = child
            , highlight = colors && colors[name] ? colors[name] : false
        }

        tooltip_data.push({
          "group": vars.format.value(title),
          "highlight": highlight,
          "name": name,
          "value": children[child]
        })

      }

    }
  }

  if ( vars.tooltip.connections.value && length === "long" ) {

    var connections = vars.edges.connections( id[vars.id.value] , vars.id.value , true )

    if ( connections.length ) {
      connections.forEach(function(c){

        var name = d3plus.variable.text(vars,c)[0],
            color = d3plus.variable.color(vars,c),
            size = vars.tooltip.font.size,
            radius = vars.shape.value == "square" ? 0 : size
            styles = [
              "background-color: "+color,
              "border-color: "+d3plus.color.legible(color),
              "border-style: solid",
              "border-width: "+vars.data.stroke.width+"px",
              "display: inline-block",
              "height: "+size+"px",
              "left: 0px",
              "position: absolute",
              "width: "+size+"px",
              "top: 0px",
              d3plus.prefix()+"border-radius: "+radius+"px",
            ]
            node = "<div style='"+styles.join("; ")+";'></div>"

        tooltip_data.push({
          "group": vars.format.value(vars.format.locale.value.ui.primary),
          "highlight": false,
          "name": "<div style='position:relative;padding-left:"+size*1.5+"px;'>"+node+name+"</div>",
          "value": ""
        })

      })
    }

  }

  return tooltip_data

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Set X and Y position for Tooltip
//-------------------------------------------------------------------

d3plus.tooltip.move = function(x,y,id) {
  
  if (!id) var tooltip = d3.select("div#d3plus_tooltip_id_default")
  else var tooltip = d3.select("div#d3plus_tooltip_id_"+id)
  
  if (tooltip.node()) {
    
    var d = tooltip.datum()
  
    d.cx = x
    d.cy = y
    
    if (!d.fixed) {

      // Set initial values, based off of anchor
      if (d.anchor.y != "center") {

        if (d.anchor.x == "right") {
          d.x = d.cx - d.arrow_offset - 4
        }
        else if (d.anchor.x == "center") {
          d.x = d.cx - d.width/2
        }
        else if (d.anchor.x == "left") {
          d.x = d.cx - d.width + d.arrow_offset + 2
        }

        // Determine whether or not to flip the tooltip
        if (d.anchor.y == "bottom") {
          d.flip = d.cy + d.height + d.offset <= d.limit[1]
        }
        else if (d.anchor.y == "top") {
          d.flip = d.cy - d.height - d.offset < 0
        }
        
        if (d.flip) {
          d.y = d.cy + d.offset + d.arrow_offset
        }
        else {
          d.y = d.cy - d.height - d.offset - d.arrow_offset
        }
    
      }
      else {

        d.y = d.cy - d.height/2
        
        // Determine whether or not to flip the tooltip
        if (d.anchor.x == "right") {
          d.flip = d.cx + d.width + d.offset <= d.limit[0]
        }
        else if (d.anchor.x == "left") {
          d.flip = d.cx - d.width - d.offset < 0
        }
    
        if (d.anchor.x == "center") {
          d.flip = false
          d.x = d.cx - d.width/2
        }
        else if (d.flip) {
          d.x = d.cx + d.offset + d.arrow_offset
        }
        else {
          d.x = d.cx - d.width - d.offset
        }
      }
  
      // Limit X to the bounds of the screen
      if (d.x < 0) {
        d.x = 0
      }
      else if (d.x + d.width > d.limit[0]) {
        d.x = d.limit[0] - d.width
      }
  
      // Limit Y to the bounds of the screen
      if (d.y < 0) {
        d.y = 0
      }
      else if (d.y + d.height > d.limit[1]) {
        d.y = d.limit[1] - d.height
      }
      
    }
    
    tooltip
      .style("top",d.y+"px")
      .style("left",d.x+"px")
  
    if (d.arrow) {
      tooltip.selectAll(".d3plus_tooltip_arrow")
        .call(d3plus.tooltip.arrow)
    }
    
  }
    
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Destroy Tooltips
//-------------------------------------------------------------------

d3plus.tooltip.remove = function(id) {

  // If an ID is specified, only remove that tooltip
  if (id) {
    
    // First remove the background curtain, if the tooltip has one
    d3.selectAll("div#d3plus_tooltip_curtain_"+id).remove()
    // Finally, remove the tooltip itself
    d3.selectAll("div#d3plus_tooltip_id_"+id).remove()
    
  }
  // If no ID is given, remove ALL d3plus tooltips
  else {
    
    // First remove all background curtains on the page
    d3.selectAll("div#d3plus_tooltip_curtain").remove()
    // Finally, remove all tooltip
    d3.selectAll("div.d3plus_tooltip").remove()
    
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Expands a min/max into a specified number of buckets
//------------------------------------------------------------------------------
d3plus.util.buckets = function(arr, buckets) {
  var return_arr = [], step = 1/(buckets-1)*(arr[1]-arr[0]), i = step

  for (var i = arr[0]; i <= arr[1]; i = i + step) {
    return_arr.push(i)
  }
  if (return_arr.length < buckets) {
    return_arr[buckets-1] = arr[1]
  }
  if (return_arr[return_arr.length-1] < arr[1]) {
    return_arr[return_arr.length-1] = arr[1]
  }
  return return_arr
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Checks to see if element is inside of another elemebt
//------------------------------------------------------------------------------
d3plus.util.child = function(parent,child) {

  if ( !parent || !child ) {
    return false
  }

  if (d3plus.util.d3selection(parent)) {
    parent = parent.node()
  }

  if (d3plus.util.d3selection(parent)) {
    child = child.node()
  }

  var node = child.parentNode

  while (node !== null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode
  }

  return false

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Finds closest numeric value in array
//------------------------------------------------------------------------------
d3plus.util.closest = function(arr,value) {
  var closest = arr[0]
  arr.forEach(function(p){
    if (Math.abs(value-p) < Math.abs(value-closest)) {
      closest = p
    }
  })
  return closest
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Clones a variable
//------------------------------------------------------------------------------
d3plus.util.copy = function( variable ) {

  if ( d3plus.object.validate(variable) ) {
    return d3plus.object.merge(variable)
  }
  else if ( variable instanceof Array ) {

    var ret = []
    variable.forEach(function(o){
      ret.push(d3plus.util.copy(o))
    })
    return ret

  }
  else {
    return variable
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Cross-browser detect for D3 element
//------------------------------------------------------------------------------
d3plus.util.d3selection = function(selection) {
  return d3plus.ie ?
    typeof selection == "object" && selection instanceof Array
    : selection instanceof d3.selection
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates a Base-64 Data URL from and Image URL
//------------------------------------------------------------------------------
d3plus.util.dataurl = function(url,callback) {

  var img = new Image();
  img.src = url;
  img.crossOrigin = "Anonymous";
  img.onload = function () {

    var canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);

    callback.call(this,canvas.toDataURL("image/png"))

    canvas = null

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Returns distances of all objects in array
//------------------------------------------------------------------------------
d3plus.util.distances = function(arr,accessor) {

  var distances = [], checked = []
  arr.forEach(function(node1){
    var n1 = accessor ? accessor(node1) : [node1.x,node1.y]
    checked.push(node1)
    arr.forEach(function(node2){
      if (checked.indexOf(node2) < 0) {
        var n2 = accessor ? accessor(node2) : [node2.x,node2.y]
          , xx = Math.abs(n1[0]-n2[0])
          , yy = Math.abs(n1[1]-n2[1])
        distances.push(Math.sqrt((xx*xx)+(yy*yy)))
      }
    })

  })

  distances.sort(function(a,b){
    return a - b
  })

  return distances
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Gives X and Y offset based off angle and shape
//------------------------------------------------------------------------------
d3plus.util.offset = function(radians, distance, shape) {

  var coords = {"x": 0, "y": 0}

  if (radians < 0) {
    radians = Math.PI*2+radians
  }

  if (shape == "square") {

    var diagonal = 45*(Math.PI/180)

    if (radians <= Math.PI) {

      if (radians < (Math.PI / 2)) {

        if (radians < diagonal) {

          coords.x += distance;
          var oppositeLegLength = Math.tan(radians) * distance;
          coords.y += oppositeLegLength;

        } else {

          coords.y += distance;
          var adjacentLegLength = distance / Math.tan(radians);
          coords.x += adjacentLegLength;

        }

      } else {

        if (radians < (Math.PI - diagonal)) {

          coords.y += distance;
          var adjacentLegLength = distance / Math.tan(Math.PI - radians);
          coords.x -= adjacentLegLength;

        } else {

          coords.x -= distance;
          var oppositeLegLength = Math.tan(Math.PI - radians) * distance;
          coords.y += oppositeLegLength;
        }

      }
    } else {

      if (radians < (3 * Math.PI / 2)) {

        if (radians < (diagonal + Math.PI)) {

          coords.x -= distance;
          var oppositeLegLength = Math.tan(radians - Math.PI) * distance;
          coords.y -= oppositeLegLength;

        } else {

          coords.y -= distance;
          var adjacentLegLength = distance / Math.tan(radians - Math.PI);
          coords.x -= adjacentLegLength;

        }

      } else {

        if (radians < (2 * Math.PI - diagonal)) {

          coords.y -= distance;
          var adjacentLegLength = distance / Math.tan(2 * Math.PI - radians);
          coords.x += adjacentLegLength;

        } else {

          coords.x += distance;
          var oppositeLegLength = Math.tan(2 * Math.PI - radians) * distance;
          coords.y -= oppositeLegLength;

        }

      }
    }

  }
  else {

    coords.x += distance * Math.cos(radians)
    coords.y += distance * Math.sin(radians)

  }

  return coords;

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Returns list of unique values
//------------------------------------------------------------------------------
d3plus.util.uniques = function( data , value ) {

  if ( data === undefined || value === undefined ) {
    return []
  }

  var type = false
    , nest = d3.nest()
        .key(function(d) {

          if (typeof value === "string") {
            if ( !type && typeof d[value] !== "undefined" ) type = typeof d[value]
            return d[value]
          }
          else if (typeof value === "function") {
            if ( !type && typeof value(d) !== "undefined" ) type = typeof value(d)
            return value(d)
          }
          else {
            return d
          }

        })
        .entries(data)
        .reduce(function( a , b ){

          return type && b.key !== "undefined"
               ? a.concat( type === "number" ? parseFloat(b.key) : b.key )
               : a

        }, [] )

  if ( type === "number" ) {
    nest.sort(function( a , b ){

      return a < b ? -1 : 1

    })
  }

  return nest

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Finds an object's color and returns random if it cannot be found
//------------------------------------------------------------------------------
d3plus.variable.color = function( vars , id , level ) {

  if ( !level ) {
    var level = vars.id.value
  }

  function getRandom( c ) {

    if ( d3plus.object.validate( c ) ) {
      c = c[ level ]
    }

    return d3plus.color.random( c )

  }

  if ( !vars.color.value ) {

    return getRandom( id )

  }
  else {

    for ( var i = vars.id.nesting.indexOf(level) ; i >= 0 ; i-- ) {
      var colorLevel = vars.id.nesting[i]
        , color = d3plus.variable.value( vars , id , vars.color.value , colorLevel )
      if ( color ) break
    }

    if ( !color ) {

      if ( vars.color.value || typeof vars.color.scale === "function" ) {
        return vars.color.missing
      }
      return getRandom( id )

    }
    else if ( !vars.color.scale ) {
      return d3plus.color.validate( color ) ? color : getRandom( color )
    }
    else {
      return vars.color.scale( color )
    }

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Get array of available text values
//------------------------------------------------------------------------------
d3plus.variable.text = function(vars,obj,depth) {

  if ( typeof depth !== "number" ) var depth = vars.depth.value

  var key = vars.id.nesting[depth]

  if ( vars.text.nesting && d3plus.object.validate(vars.text.nesting) ) {
    if ( vars.text.nesting[key] ) {
      var textKeys = vars.text.nesting[key]
    }
    else {
      var textKeys = vars.text.nesting[ d3.keys(vars.text.nesting)[0] ]
    }
  }
  else {
    var textKeys = []
    if (vars.text.value) textKeys.push(vars.text.value)
    textKeys.push(key)
  }

  if ( !(textKeys instanceof Array) ) {
    textKeys = [ textKeys ]
  }

  var names = []
  textKeys.forEach(function( t ){

    var name = d3plus.variable.value( vars , obj , t , key )

    if ( name ) {
      if ( !(name instanceof Array) ) {
        name = vars.format.value(name.toString())
      }
      else {
        name.forEach(function(n){
          n = vars.format.value(n.toString())
        })
      }
      names.push(name)
    }
  })

  return names

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Finds a given variable by searching through the data and attrs
//------------------------------------------------------------------------------
d3plus.variable.value = function( vars , id , variable , id_var , agg ) {

  if ( variable && typeof variable === "function" ) {
    return variable( id )
  }

  if (!id_var) {
    if ( d3plus.object.validate(variable) ) {
      if (variable[vars.id.value]) {
        var id_var = vars.id.value
      }
      else {
        var id_var = d3.keys(variable)[0]
      }
      variable = variable[id_var]
    }
    else {
      var id_var = vars.id.value
    }
  }

  if ( variable === id_var ) {
    if ( d3plus.object.validate(id) && variable in id ) {
      return id[variable]
    }
    else if ( !(id instanceof Array) ) {
      return id
    }
  }

  function filterArray( arr ) {

    if ( id instanceof Array ) {
      var uniques = d3plus.util.uniques( id , id_var )
      return arr.filter(function(d){
        return uniques.indexOf(d[id_var]) >= 0
      })
    }
    else {
      return arr.filter(function(d){
        return d[id_var] === id
      })
    }

  }

  var value_array = []
  function check_children(obj) {
    if (obj.children) {
      obj.children.forEach(function(c){
        check_children(c)
      })
    }
    else if (obj[variable]) {
      value_array.push(obj[variable])
    }
  }

  if ( d3plus.object.validate(id) && variable in id ) {
    return id[variable]
  }
  else if ( d3plus.object.validate(id) && id.children ) {

    if (!agg) {
      var agg = "sum"
      if (typeof vars.aggs.value === "string") {
        agg = vars.aggs.value
      }
      else if (vars.aggs.value[variable]) {
        agg = vars.aggs.value[variable]
      }
    }

    check_children(id)

    if (value_array.length) {
      if (typeof agg === "string") {
        return d3[agg](value_array)
      }
      else if (typeof agg === "function") {
        return agg(value_array)
      }
    }

    var dat = id
    id = dat[id_var]

  }
  else {

    function checkData( data ) {
      var vals = d3plus.util.uniques( data , variable )
      if ( vals.length === 1 ) return vals[0]
    }

    if ( d3plus.object.validate(id) && id_var in id ) {
      var val = checkData( id )
      if ( val ) return val
      id = id[id_var]
    }

    if ( id instanceof Array ) {
      var val = checkData( id )
      if ( val ) return val
    }

    if ( vars.data.app instanceof Array ) {
      var val = checkData( filterArray( vars.data.app ) )
      if ( val ) return val
    }

  }

  if ( "attrs" in vars && vars.attrs.value ) {

    if ( vars.attrs.value instanceof Array ) {
      var attr = filterArray(vars.attrs.value)
    }
    else if ( id_var in vars.attrs.value ) {
      if ( vars.attrs.value[id_var] instanceof Array ) {
        var attr = filterArray(vars.attrs.value[id_var])
      }
      else {
        var attr = vars.attrs.value[id_var]
      }
    }
    else {
      var attr = vars.attrs.value
    }

  }

  if ( d3plus.object.validate(attr) ) {

    var newAttr = []

    if ( id instanceof Array ) {
      id.forEach(function(d){
        newAttr.push(attr[d])
      })
    }
    else newAttr.push(attr[id])

    attr = newAttr

  }

  if ( attr && attr.length ) {

    var vals = d3plus.util.uniques( attr , variable )
    if ( vals.length === 1 ) return vals[0]

  }

  return null

}

d3plus.viz = function() {

  var vars = {
    "g"     : {"apps": {} },
    "shell" : "viz"
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Main drawing function
  //----------------------------------------------------------------------------
  vars.self = function(selection) {
    selection.each(function() {

      vars.draw.frozen = true
      vars.internal_error = null
      d3plus.draw.container(vars)

      if ( !("timing" in vars.draw) ) {
        vars.draw.timing = vars.timing.transitions
      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Determine if in "small" mode
      //------------------------------------------------------------------------
      var small_width = vars.width.value <= vars.width.small,
          small_height = vars.height.value <= vars.height.small
      vars.small = small_width || small_height

      var lastMessage = false

      if (vars.error.value) {

        var timing = vars.draw.timing

        vars.group.transition().duration(timing)
          .attr("opacity",0)
        vars.g.data.transition().duration(timing)
          .attr("opacity",0)
        vars.g.edges.transition().duration(timing)
          .attr("opacity",0)

        vars.messages.style = "large"
        var message = vars.error.value === true
                    ? vars.format.value(vars.format.locale.value.ui.error)
                    : vars.error.value

        lastMessage = message
        d3plus.ui.message(vars,message)

      }
      else {

        var steps = d3plus.draw.steps( vars )
          , step  = false

        vars.container.value.style("cursor","wait")
        vars.messages.style = vars.group && vars.group.attr("opacity") === "1"
                            ? "small" : "large"

        var nextStep = function() {

          if ( steps.length ) {
            runStep()
          }
          else {
            
            vars.methodGroup = false
            if ( vars.dev.value ) {
              d3plus.console.timeEnd("total draw time")
              d3plus.console.groupEnd()
              d3plus.console.log("\n")
            }
            vars.container.value.style("cursor","auto")

          }

        }

        var runFunction = function( name ) {

          var name = name || "function"

          if ( step[name] instanceof Array ) {
            step[name].forEach(function(f){
              f( vars , nextStep )
            })
          }
          else if ( typeof step[name] == "function" ) {
            step[name]( vars , nextStep )
          }

          if ( !step.wait ) {
            nextStep()
          }

        }

        function runStep() {

          step = steps.shift()

          var same = vars.g.message && lastMessage === step.message,
              run = "check" in step ? step.check : true

          if ( typeof run === "function" ) {
            run = run( vars )
          }

          if ( run ) {

            if ( !same && vars.draw.update ) {

              if ( vars.dev.value ) {
                if ( lastMessage !== false ) {
                  d3plus.console.groupEnd()
                }
                d3plus.console.groupCollapsed(step.message)
              }

              lastMessage = typeof vars.messages.value === "string"
                          ? vars.messages.value
                          : step.message

              var message = typeof vars.messages.value === "string"
                          ? vars.messages.value
                          : vars.format.value(step.message)

              d3plus.ui.message(vars,message)

              setTimeout( runFunction , 10 )

            }
            else {

              runFunction()

            }

          }
          else {

            if ( "otherwise" in step ) {

              setTimeout(function(){

                runFunction( "otherwise" )

              },10)

            }
            else {

              nextStep()

            }

          }

        }

        runStep()

      }

    })

    return vars.self
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Define methods and expose public variables.
  //----------------------------------------------------------------------------
  var methods = [ "active" , "aggs" , "attrs" , "axes" , "color" , "container"
                , "coords" , "csv" , "data" , "depth" , "descs" , "dev"
                , "draw" , "edges" , "error" , "focus" , "footer" , "format"
                , "height" , "history" , "icon" , "id" , "labels"
                , "legend" , "margin" , "messages" , "nodes" , "order"
                , "shape" , "size" , "style" , "temp" , "text" , "time"
                , "timeline" , "title" , "tooltip" , "total" , "type" , "ui"
                , "width" , "x" , "y" , "zoom" ]
    , styles  = [ "axes" , "background" , "color" , "coords" , "data" , "edges"
                , "font" , "footer" , "height" , "labels" , "legend" , "links"
                , "messages" , "nodes" , "shape" , "timeline" , "timing"
                , "title" , "tooltip" , "ui" , "width "]
  d3plus.method( vars , methods , styles )

  return vars.self

}

d3plus.zoom.bounds = function( vars , b , timing ) {

  if (!b) {
    var b = vars.zoom.bounds
  }

  if (typeof timing !== "number") {
    var timing = vars.timing.transitions
  }

  vars.zoom.size = {
    "height": b[1][1]-b[0][1],
    "width": b[1][0]-b[0][0]
  }

  var fit = vars.coords.fit.value
  if (fit == "auto" || d3plus.visualization[vars.type.value].requirements.indexOf("coords") < 0) {
    var aspect = d3.max([vars.zoom.size.width/vars.width.viz,vars.zoom.size.height/vars.height.viz])
  }
  else {
    var aspect = vars.zoom.size[fit]/vars["app_"+fit]
  }

  var min = d3.min([vars.width.viz,vars.height.viz])

  var scale = ((min-(vars.coords.padding*2)) / min) / aspect

  var extent = vars.zoom.behavior.scaleExtent()

  if (extent[0] == extent[1] || b == vars.zoom.bounds) {
    vars.zoom.behavior.scaleExtent([scale,scale*16])
  }

  var max_scale = vars.zoom.behavior.scaleExtent()[1]
  if (scale > max_scale) {
    scale = max_scale
  }
  vars.zoom.scale = scale

  var translate = []

  translate[0] = vars.width.viz/2-(vars.zoom.size.width*scale)/2-(b[0][0]*scale)
  translate[1] = vars.height.viz/2-(vars.zoom.size.height*scale)/2-(b[0][1]*scale)

  vars.zoom.translate = translate
  vars.zoom.behavior.translate(translate).scale(scale)

  vars.zoom.size = {
    "height": vars.zoom.bounds[1][1]-vars.zoom.bounds[0][1],
    "width": vars.zoom.bounds[1][0]-vars.zoom.bounds[0][0]
  }

  d3plus.zoom.transform(vars,timing)

}

d3plus.zoom.controls = function() {
  d3.select("#d3plus.utilsts.zoom_controls").remove()
  if (!vars.small) {
    // Create Zoom Controls
    var zoom_enter = vars.container.value.append("div")
      .attr("id","d3plus.utilsts.zoom_controls")
      .style("top",(vars.margin.top+5)+"px")
  
    zoom_enter.append("div")
      .attr("id","zoom_in")
      .attr("unselectable","on")
      .on(d3plus.evt.click,function(){ vars.zoom("in") })
      .text("+")
  
    zoom_enter.append("div")
      .attr("id","zoom_out")
      .attr("unselectable","on")
      .on(d3plus.evt.click,function(){ vars.zoom("out") })
      .text("-")
  
    zoom_enter.append("div")
      .attr("id","zoom_reset")
      .attr("unselectable","on")
      .on(d3plus.evt.click,function(){ 
        vars.zoom("reset") 
        vars.draw.update()
      })
      .html("\&#8634;")
  }
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Sets label opacity based on zoom
//------------------------------------------------------------------------------
d3plus.zoom.labels = function(vars) {

  var max_scale = vars.zoom.behavior.scaleExtent()[1]

  if ( vars.dev.value ) d3plus.console.time("determining label visibility")

  if (vars.draw.timing) {

    vars.g.viz.selectAll("text.d3plus_label")
      .transition().duration(vars.draw.timing)
      .attr("opacity",function(d){
        if (!d) var d = {"scale": max_scale}
        var size = parseFloat(d3.select(this).attr("font-size"),10)
        d.visible = size/d.scale*vars.zoom.scale >= 7
        return d.visible ? 1 : 0
      })

  }
  else {

    vars.g.viz.selectAll("text.d3plus_label")
      .attr("opacity",function(d){
        if (!d) var d = {"scale": max_scale}
        var size = parseFloat(d3.select(this).attr("font-size"),10)
        d.visible = size/d.scale*vars.zoom.scale >= 7
        return d.visible ? 1 : 0
      })

  }

  if ( vars.dev.value ) d3plus.console.timeEnd("determining label visibility")

}

d3plus.zoom.mouse = function(vars) {

  var translate = d3.event.translate,
      scale = d3.event.scale,
      limits = vars.zoom.bounds,
      xoffset = (vars.width.viz-(vars.zoom.size.width*scale))/2,
      xmin = xoffset > 0 ? xoffset : 0,
      xmax = xoffset > 0 ? vars.width.viz-xoffset : vars.width.viz,
      yoffset = (vars.height.viz-(vars.zoom.size.height*scale))/2,
      ymin = yoffset > 0 ? yoffset : 0,
      ymax = yoffset > 0 ? vars.height.viz-yoffset : vars.height.viz

  // Auto center visualization
  if (translate[0]+limits[0][0]*scale > xmin) {
    translate[0] = -limits[0][0]*scale+xmin
  }
  else if (translate[0]+limits[1][0]*scale < xmax) {
    translate[0] = xmax-(limits[1][0]*scale)
  }

  if (translate[1]+limits[0][1]*scale > ymin) {
    translate[1] = -limits[0][1]*scale+ymin
  }
  else if (translate[1]+limits[1][1]*scale < ymax) {
    translate[1] = ymax-(limits[1][1]*scale)
  }

  vars.zoom.behavior.translate(translate).scale(scale)

  vars.zoom.translate = translate
  vars.zoom.scale = scale

  if (d3.event.sourceEvent.type == "wheel") {
    var delay = vars.draw.timing ? 100 : 250
    clearTimeout(vars.zoom.wheel)
    vars.zoom.wheel = setTimeout(function(){
      d3plus.zoom.labels(vars)
    },delay)
  }
  else {
    d3plus.zoom.labels(vars)
  }

  if (d3.event.sourceEvent.type === "dblclick") {
    d3plus.zoom.transform(vars,vars.timing.transitions)
  }
  else {
    d3plus.zoom.transform(vars,0)
  }

}

d3plus.zoom.transform = function(vars,timing) {

  if (typeof timing !== "number") {
    var timing = vars.timing.transitions
  }

  var translate = vars.zoom.translate
    , scale = vars.zoom.scale

  if (timing) {
    vars.g.viz.transition().duration(timing)
      .attr("transform","translate("+translate+")scale("+scale+")")

  }
  else {

    vars.g.viz
      .attr("transform","translate("+translate+")scale("+scale+")")

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Determines form type based on data length.
//------------------------------------------------------------------------------
d3plus.input.auto = function( vars ) {

  var dataLength = vars.data.value.length

  if ( dataLength == 1 ) {
    d3plus.input.button( vars )
  }
  else if ( dataLength < 5 ) {
    d3plus.input.toggle( vars )
  }
  else {
    d3plus.input.drop( vars )
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates a set of Toggle Buttons
//------------------------------------------------------------------------------
d3plus.input.toggle = function( vars ) {

  if ( !("buttons" in vars.container) ) {

    vars.container.buttons = d3plus.form()
      .container(vars.container.ui)
      .type("button")

  }

  var dataLength  = vars.data.value.length
    , buttonWidth = vars.width.value
                  ? vars.width.value/dataLength
                  : false

  vars.container.buttons
    .color(vars.color)
    .data(vars.data.value)
    .icon({
      "select": false,
      "value": vars.icon.value
    })
    .id(vars.id)
    .font(vars.font)
    .focus(vars.focus.value,function(value){

      vars.self.focus(value)

    })
    .order(vars.order)
    .ui({
      "border": vars.ui.border,
      "color": vars.ui.color,
      "display": "inline-block",
      "margin": 0,
      "padding": vars.ui.padding
    })
    .width(buttonWidth)
    .draw()

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Create dummy methods to catch deprecates
//--------------------------------------------------------------------------
d3plus.method.axis = function( axis ) {

  var axis = axis || "x"

  return {
    "accepted"    : [ Array , Boolean , Function , Object , String ],
    "dataFilter"  : true,
    "deprecates"  : [ axis+"axis" , axis+"axis_val" , axis+"axis_var" ],
    "domain"      : false,
    "lines"       : [],
    "mute"        : d3plus.method.filter(true),
    "range"       : false,
    "reset"       : [ "range" ],
    "scale"       : {
      "accepted"   : [ "linear" , "log" , "continuous" , "share" ],
      "value"      : "linear",
      "deprecates" : [ "layout" , "unique_axis" , "yaxis_scale" ]
    },
    "solo"        : d3plus.method.filter(true),
    "stacked"     : {
      "accepted" : [ Boolean ],
      "value"    : false
    },
    "value"       : false,
    "zerofill"    : {
      "accepted" : [ Boolean ],
      "value"    : false
    }
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Create dummy methods to catch deprecates
//--------------------------------------------------------------------------
d3plus.method.filter = function( global ) {

  var global = global || false

  return {
    "accepted" : [ Array , Boolean , Function , Number , Object , String ],
    "global"   : global,
    "process"  : Array,
    "value"    : [ ]
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Get/set function for methods
//------------------------------------------------------------------------------
d3plus.method.function = function( key , vars ) {

  return function( user , callback ) {

    var accepted = key in vars && d3plus.object.validate(vars[key])
                   && "accepted" in vars[key] ? vars[key].accepted
                 : key in vars ? typeof vars[key] : null

    if ( typeof accepted === "function" ) {
      accepted = accepted( vars )
    }

    if ( accepted !== null && !(accepted instanceof Array) ) {
      accepted = [ accepted ]
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If no arguments have been passed, simply return the current object.
    //--------------------------------------------------------------------------
    if ( user === Object ) {
      return vars[key]
    }
    else if ( !arguments.length
              && ((accepted === null && !("value" in vars))
              || (accepted !== undefined && accepted.indexOf(undefined) < 0)) ) {
      if ("value" in vars[key]) {
        return vars[key].value
      }
      else {
        return vars[key]
      }
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Warn if the user is trying to use the old .style() method.
    //--------------------------------------------------------------------------
    if ( key === "style" && typeof user === "object" ) {

      var str = vars.format.locale.value.dev.oldStyle

      if ( ( vars.dev.value || ( key === "dev" && user ) )
           && !vars.methodGroup && vars.methodGroup !== "wait" ) {
        vars.methodGroup = true
        d3plus.console.groupCollapsed("method behavior")
      }

      for ( var s in user ) {

        d3plus.console.warning( d3plus.string.format(str,"\""+s+"\"",s) , s )

        vars.self[s](user[s])

      }

      return vars.self

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Set all font families and weights, if calling .font()
    //--------------------------------------------------------------------------
    if ( key === "font" && d3plus.object.validate(user)
         && "family" in user && typeof user.family === "string" ) {

      function checkFamily ( o ) {

        if ( d3plus.object.validate( o ) ) {

          if ( "family" in o ) {
            o.family.value = o.family.process( user.family )
          }
          else {

            for ( var m in o ) {
              checkFamily(o[m])
            }

          }

        }

      }

      checkFamily( vars )

    }

    d3plus.method.object( vars , key , vars , key , user )

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If defining a callback function, set it.
    //--------------------------------------------------------------------------
    if ( typeof callback === "function" ) {
      vars[key].callback = callback
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If the method is not chainable, return the value associated with it.
    //--------------------------------------------------------------------------
    if (vars[key].chainable === false) {
      return vars[key].value
    }
    else {
      return vars.self
    }

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Create dummy methods to catch deprecates
//------------------------------------------------------------------------------
d3plus.method.init = function( vars , obj , method ) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialize a few globals.
  //----------------------------------------------------------------------------
  obj.previous = false
  obj.changed  = false
  obj.initialized = false
  obj.getVars  = function(){
    return vars
  }

  if ( "init" in obj && !("value" in obj) ) {
    obj.value = obj.init( vars )
    delete obj.init
  }

  if ( "process" in obj ) {
    obj.value = d3plus.method.process( obj , obj.value )
  }

  for ( var o in obj ) {

    if ( o === "deprecates" ) {

      var deps = obj[o] instanceof Array ? obj[o] : [obj[o]]

      deps.forEach(function(d){

        vars.self[d] = (function(dep,n) {

          return function(x) {

            if ( vars.dev.value && vars.methodGroup ) {
              d3plus.console.groupEnd()
              vars.methodGroup = false
            }

            var str = vars.format.locale.value.dev.deprecated
            dep = "\."+dep+"()"
            d3plus.console.error( d3plus.string.format(str,dep,"\."+n+"()") , n )
            return vars.self;

          }

        })(d,method)

      })

    }
    else if ( o === "global" ) {

      if ( !(method in vars) ) {
        vars[method] = []
      }

    }
    else if ( d3plus.object.validate( obj[o] ) ) {

      d3plus.method.init( vars , obj[o] , o )

    }

  }

  obj.initialized = true

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Detects is we should set the object or check all keys of object.
//------------------------------------------------------------------------------
d3plus.method.object = function( vars , method , object , key , value ) {

  if ([ "accepted" , "getVars" ].indexOf(key) < 0) {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Determine whether or not to just set the local variable or to dig into
    // the object passed looking for keys.
    //--------------------------------------------------------------------------
    var passingObject  = d3plus.object.validate(value)
      , approvedObject = passingObject && ( !("value" in value) &&
                         !(d3.keys(value)[0] in object[key]) )

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Set value of key.
    //--------------------------------------------------------------------------
    if ( value === null || !passingObject || approvedObject ) {

      if ( approvedObject ) {
        d3plus.method.set( vars , method , object[key] , "value" , value )
      }
      else {
        d3plus.method.set( vars , method , object , key , value )
      }

    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If it's an object, dig through it and set inner values.
    //--------------------------------------------------------------------------
    else if ( passingObject ) {

      for (d in value) {

        d3plus.method.object( vars , method , object[key] , d , value[d] )

      }

    }

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Process object's value
//--------------------------------------------------------------------------
d3plus.method.process = function( object , value ) {

  if ( object.process === Array ) {
    return d3plus.array.update(object.value,value)
  }
  else if ( typeof object.process === "object" && typeof value === "string" ) {
    return object.process[value]
  }
  else if ( typeof object.process === "function" ) {
    return object.process(value)
  }
  else {
    return value
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Function to process data by url or element.
//--------------------------------------------------------------------------
d3plus.method.processData = function ( value , self ) {

  if ( typeof value !== "string" && !d3plus.util.d3selection( value ) ) {

    return value

  }
  else {

    if ( self === undefined ) {
      var self = this
    }

    var vars = self.getVars()
      , maybeURL = value.indexOf("/") >= 0

    if ( !maybeURL && d3plus.util.d3selection( value ) ) {

      self.element = value
      return d3plus.data.element( vars )

    }
    else {

      if ( !maybeURL && !d3.selectAll( value ).empty() ) {

        self.element = d3.selectAll( value )
        return d3plus.data.element( vars )

      }
      else {

        self.url = value
        return []

      }

    }

    return []

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Sets a method's value.
//------------------------------------------------------------------------------
d3plus.method.set = function( vars , method , object , key , value ) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Create reference text for console statements.
  //----------------------------------------------------------------------------
  if ( key === "value" || !key || key === method ) {

    var text = "\."+method+"()"

  }
  else {

    var of = vars.format.locale.value.dev.of
      , text = "\""+key+"\" "+of+" \."+method+"()"

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Find appropriate "accepted" list.
  //----------------------------------------------------------------------------
  if (key === "value" && "accepted" in object) {

    var accepted = object.accepted

  }
  else if ( d3plus.object.validate( object[key] ) && "accepted" in object[key] ) {

    var accepted = object[key].accepted

  }
  else {

    var accepted = null

  }

  if ( typeof accepted === "function" ) {
    accepted = accepted( vars )
  }

  if ( accepted !== null && !(accepted instanceof Array) ) {
    accepted = [ accepted ]
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check to see if the given value is allowed.
  //----------------------------------------------------------------------------
  var allowed = true
  if (accepted instanceof Array) {

    var constructor = value === undefined
                    ? value : value.constructor

    allowed = accepted.indexOf(value) >= 0
              || accepted.indexOf(constructor) >= 0

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If value is not allowed, show an error message in the console.
  //----------------------------------------------------------------------------
  if (allowed === false) {

    if ( value !== undefined ) {

      var str = vars.format.locale.value.dev.accepted
        , recs = []
        , val = JSON.stringify(value)
        , and = vars.format.locale.value.ui.and

      if ( typeof value !== "string" ) {
        val = "\""+val+"\""
      }

      accepted.forEach(function(a){

        if (typeof a == "string") {
          recs.push("\""+a+"\"")
        }
        else {
          recs.push("\""+a.toString().split("()")[0].substring(9)+"\"")
        }

      })

      recs = d3plus.string.list(recs,and)
      d3plus.console.warning( d3plus.string.format(str,val,text,recs) , method )

    }

  }
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Otherwise, set the value!
  //----------------------------------------------------------------------------
  else {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If the method we are setting has a nested "value" key, change the
    // reference object and key to reflect that.
    //--------------------------------------------------------------------------
    if ( d3plus.object.validate( object[key] ) && "value" in object[key] ) {

      var parentKey = key
      object = object[key]
      key = "value"

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If there is a process function, run it.
    //------------------------------------------------------------------------
    if ( key === "value" && "process" in object ) {

      value = d3plus.method.process( object , value )

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If value has not changed, show a comment in the console.
    //--------------------------------------------------------------------------
    if ( ( !(object[key] instanceof Array) && object[key] === value
         || ( object[key] && object[key] === value ) ) && value !== undefined ) {

      var str = vars.format.locale.value.dev.noChange
      if ( vars.dev.value ) d3plus.console.comment(d3plus.string.format(str,text))

    }
    else {

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Mark the method as being changed.
      //------------------------------------------------------------------------
      object.changed = true

      if ( "history" in vars && method !== "draw" ) {
        var copy = d3plus.util.copy(object)
        copy.method = method
        vars.history.chain.push(copy)
      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Before updating the value, store the previous one for reference.
      //------------------------------------------------------------------------
      object.previous = object[key]

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Set the variable!
      //------------------------------------------------------------------------
      if ( "id" in vars && key === "value" && "nesting" in object ) {

        if ( method !== "id" ) {

          if ( typeof object.nesting !== "object" ) {
            object.nesting = {}
          }

          if ( d3plus.object.validate( value ) ) {

            for (var id in value) {

              if ( typeof value[id] === "string" ) {
                value[id] = [value[id]]
              }

            }

            object.nesting = d3plus.object.merge( object.nesting , value )

            if ( !(vars.id.value in object.nesting) ) {
              object.nesting[vars.id.value] = value[d3.keys(value)[0]]
            }

          }
          else if ( value instanceof Array ) {
            object.nesting[vars.id.value] = value
          }
          else {
            object.nesting[vars.id.value] = [ value ]
          }

          object[key] = object.nesting[vars.id.value][0]

        }
        else {

          if ( value instanceof Array ) {

            object.nesting = value

            if ("depth" in vars && vars.depth.value < value.length) {
              object[key] = value[vars.depth.value]
            }
            else {
              object[key] = value[0]
              if ("depth" in vars) {
                vars.depth.value = 0
              }
            }

          }
          else {

            object[key] = value
            object.nesting = [value]
            if ("depth" in vars) {
              vars.depth.value = 0
            }

          }

        }

      }
      else if ( method === "depth" ) {

        if (value >= vars.id.nesting.length) {
          vars.depth.value = vars.id.nesting.length-1
        }
        else if (value < 0) {
          vars.depth.value = 0
        }
        else {
          vars.depth.value = value
        }

        vars.id.value = vars.id.nesting[vars.depth.value]

        if ( typeof vars.text.nesting === "object" ) {

          var n = vars.text.nesting[vars.id.value]
          if ( n ) {
            vars.text.nesting[vars.id.value] = typeof n == "string" ? [n] : n
            vars.text.value = n instanceof Array ? n[0] : n
          }

        }
      }
      else if ( d3plus.object.validate(object[key]) && d3plus.object.validate(value) ) {

        object[key] = d3plus.object.merge( object[key] , value )

      }
      else {

        object[key] = value

      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Add method to data solo/mute array if applicable.
      //------------------------------------------------------------------------
      if ( key === "value" && object.global ) {

        var hasValue = object[key].length > 0
          , k = parentKey || key

        if ( k in vars && ( ( hasValue && vars.data[k].indexOf(method) < 0 )
        || ( !hasValue && vars.data[k].indexOf(method) >= 0 ) ) ) {

          vars.data[k] = d3plus.array.update(vars.data[k],method)

        }

      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Add method to data filter array if applicable.
      //------------------------------------------------------------------------
      if ( key === "value" && object.dataFilter && vars.data
      && vars.data.filters.indexOf(method) < 0 ) {

        vars.data.filters.push( method )

      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Reset associated variables given if "value" is changed.
      //------------------------------------------------------------------------
      if (key === "value" && object.reset) {

        var reset = typeof object.reset == "string"
                  ? [ object.reset ] : object.reset

        reset.forEach(function(r){
          object[r] = false
        })

      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Display console message, if applicable.
      //------------------------------------------------------------------------
      if ( ( vars.dev.value || key === "dev" ) && object.changed
           && object[key] !== undefined ) {

        var longArray = object[key] instanceof Array && object[key].length > 10
          , d3selection = d3plus.util.d3selection(object[key])
          , typeFunction = typeof object[key] === "function"

        var valString = !longArray && !d3selection && !typeFunction
                      ? typeof object[key] === "string" ? object[key]
                      : JSON.stringify(object[key]) : null

        if ( ( vars.dev.value || ( key === "dev" && user ) )
             && !vars.methodGroup && vars.methodGroup !== "wait" ) {
          vars.methodGroup = true
          d3plus.console.groupCollapsed("method behavior")
        }

        if ( valString !== null && valString.length < 260 ) {

          var str = vars.format.locale.value.dev.setLong
          d3plus.console.log(d3plus.string.format(str,text,"\""+valString+"\""))


        }
        else {

          var str = vars.format.locale.value.dev.set
          d3plus.console.log(d3plus.string.format(str,text))

        }

      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // If there is a callback function not associated with a URL, run it.
      //------------------------------------------------------------------------
      if ( key === "value" && object.callback && !object.url ) {

        object.callback(value)

      }

    }

  }

}

d3plus.method.active = {
  "accepted"   : [ false , Array , Function , Object , String ],
  "deprecates" : "active_var",
  "mute"       : d3plus.method.filter(true),
  "solo"       : d3plus.method.filter(true),
  "spotlight"  : {
    "accepted"   : [ Boolean ],
    "deprecates" : "spotlight",
    "value"      : false
  },
  "value"      : false
}

d3plus.method.aggs = {
  "accepted"   : [ Object ],
  "deprecated" : "nesting_aggs",
  "value"      : {}
}

d3plus.method.alt = {
  "accepted" : [ false , Array , Function , Object , String ],
  "mute"     : d3plus.method.filter(true),
  "solo"     : d3plus.method.filter(true),
  "value"    : "alt"
}

d3plus.method.attrs = {
  "accepted" : [ false , Array , Object , String ],
  "delimiter" : {
    "accepted" : [ String ],
    "value"    : "|"
  },
  "type"     : {
    "accepted" : [ false , "json" , "xml" ,"html"
                 , "csv" , "dsv" , "tsv" , "txt" ],
    "value"    : false
  },
  "value"    : false
}

d3plus.method.axes = {
  "mirror" : {
    "accepted"   : [ Boolean ],
    "deprecates" : [ "mirror_axis" , "mirror_axes" ],
    "value"      : false
  },
  "values" : [ "x" , "y" ]
}

d3plus.method.color = {
  "accepted"   : [ false , Array , Function , Object , String ],
  "deprecates" : "color_var",
  "init"       : function ( vars ) {

    if ( vars.shell === "form" ) {
      return "color"
    }
    else {
      return false
    }

  },
  "mute"      : d3plus.method.filter(true),
  "solo"      : d3plus.method.filter(true)
}

d3plus.method.container = {
  "accepted" : [ Array , Object , String ],
  "element"  : false,
  "id"       : "default",
  "process"  : function ( value ) {

    if ( value === false ) {
      var shell = this.getVars().shell
      return shell === "form" ? d3.select("body") : value
    }
    else if ( d3plus.util.d3selection(value) ) {
      return value
    }
    else if ( value instanceof Array ) {
      return d3.select(value[0][0])
    }
    else {
      return d3.select(value)
    }

  },
  "value"    : false
}

d3plus.method.coords = {
  "accepted" : [ false , Array , Function , Object , String ],
  "mute"     : d3plus.method.filter(false),
  "process"  : d3plus.method.processData,
  "solo"     : d3plus.method.filter(false),
  "type"     : {
    "accepted" : [ "json" ],
    "value"    : "json"
  },
  "value"    : false
}

d3plus.method.csv = {
  "accepted"  : [ undefined , Array , String ],
  "chainable" : false,
  "data"      : [],
  "process"   : function ( value ) {

    var vars = this.getVars()

    if ( vars.returned === undefined ) {
      return []
    }

    if ( value instanceof Array ) {
      var columns = value
    }
    else if ( typeof value === "string" ) {
      var columns = [ value ]
    }

    var csv_to_return = [],
        titles = [],
        title = vars.title.value || "My D3plus App Data"

    title = d3plus.string.strip(title)

    if (!columns) {
      var columns = [vars.id.value]
      if (vars.time.value) columns.push(vars.time.value)
      if (vars.size.value) columns.push(vars.size.value)
      if (vars.text.value) columns.push(vars.text.value)
    }

    columns.forEach(function(c){
      titles.push(vars.format.value(c))
    })

    csv_to_return.push(titles);

    vars.returned.nodes.forEach(function(n){
      var arr = []
      columns.forEach(function(c){
        arr.push(d3plus.variable.value(vars,n,c))
      })
      csv_to_return.push(arr)
    })

    var csv_data = "data:text/csv;charset=utf-8,"
    csv_to_return.forEach(function(c,i){
      dataString = c.join(",")
      csv_data += i < csv_to_return.length ? dataString + "\n" : dataString
    })

    if (d3plus.ie) {

      var blob = new Blob([csv_data],{
        type: "text/csv;charset=utf-8;",
      })
      navigator.msSaveBlob(blob,title+".csv")

    }
    else {

      var encodedUri = encodeURI(csv_data)
      var link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download",title+".csv")
      link.click()

    }

    this.data = csv_to_return

    return columns

  },
  "value"     : undefined
}

d3plus.method.data = {
  "accepted" : [ false , Array , Function , String ],
  "cache"    : {},
  "delimiter" : {
    "accepted" : [ String ],
    "value"    : "|"
  },
  "filters"  : [],
  "mute"     : [],
  "process"  : function( value ) {

    var vars = this.getVars()

    if ( vars.container.id === "default" && value.length ) {
      vars.self.container({"id": "default"+value.length})
    }

    return d3plus.method.processData( value , this )
  },
  "type"     : {
    "accepted" : [ false , "json" , "xml" ,"html"
                 , "csv" , "dsv" , "tsv" , "txt" ],
    "value"    : false
  },
  "solo"     : [],
  "value"    : false
}

d3plus.method.depth = {
  "accepted" : [ Function , Number ],
  "value"    : 0
}

d3plus.method.descs = {
  "accepted" : [ false , Function , Object ],
  "value"    : false
}

d3plus.method.dev = {
  "accepted" : [ Boolean ],
  "value"    : false
}

d3plus.method.draw = {
  "accepted" : [ undefined , Function ],
  "first"    : true,
  "frozen"   : false,
  "process"  : function ( value ) {

    if ( this.initialized === false ) {
      this.initialized = true
      return value
    }

    var vars    = this.getVars()
      , changes = "history" in vars ? vars.history.chain : []

    if ( value === undefined && typeof this.value === "function" ) {
      value = this.value
    }

    if ( vars.container.value === false ) {

      var str = vars.format.locale.value.dev.setContainer
      d3plus.console.warning( str , "container" )

    }
    else if ( vars.container.value.empty() ) {

      var str = vars.format.locale.value.dev.noContainer
      d3plus.console.warning( d3plus.string.format(str,"\""+vars.container.value+"\"") , "container" )

    }
    else {

      if ( vars.dev.value ) {
        if ( vars.methodGroup ) {
          vars.methodGroup = "wait"
          d3plus.console.groupEnd()
        }
        d3plus.console.time("total draw time")
      }

      vars.container.value.call(vars.self)

    }

    if ( typeof value === "function" && changes.length ) {

      var changesObject = {}
      changes.forEach(function(c){
        var method = c.method
        delete c.method
        changesObject[method] = c
      })

      value(changesObject)

      vars.history.chain = []

    }

    return value

  },
  "update"   : true,
  "value"    : undefined
}

d3plus.method.edges = {
  "accepted"    : [ false , Array , Function , String ],
  "connections" : function(focus,id,objects) {

    var self = this

    if (!self.value) {
      return []
    }

    if (!id) var id = "id"

    var edges = self.restricted || self.value,
        targets = []

    if (!focus) {
      return edges
    }

    var connections = edges.filter(function(edge){

      var match = false

      if (edge[self.source][id] == focus) {
        match = true
        if (objects) {
          targets.push(edge[self.target])
        }
      }
      else if (edge[self.target][id] == focus) {
        match = true
        if (objects) {
          targets.push(edge[self.source])
        }
      }

      return match

    })

    return objects ? targets : connections

  },
  "delimiter" : {
    "accepted" : [ String ],
    "value"    : "|"
  },
  "label"       : false,
  "process"     : d3plus.method.processData,
  "size"        : false,
  "source"      : "source",
  "target"      : "target",
  "type"     : {
    "accepted" : [ false , "json" , "xml" ,"html"
                 , "csv" , "dsv" , "tsv" , "txt" ],
    "value"    : false
  },
  "value"       : false
}

d3plus.method.error = {
  "accepted" : [ Boolean , String ],
  "value"    : false
}

d3plus.method.focus = {
  "accepted"   : [ false , Function , Number , String ],
  "deprecates" : "highlight",
  "process"    : function(value) {

    var vars = this.getVars()

    if ( vars.data.element ) {

      var elementTag  = vars.data.element.node().tagName.toLowerCase()
        , elementType = vars.data.element.attr("type")

      if (elementTag === "select") {

        vars.data.element.selectAll("option").each(function(d,i){

          if (d && d[vars.id.value] === value) {
            vars.data.element.node().selectedIndex = i
          }

        })

      }
      else if (elementTag === "input" && elementType === "radio") {

        vars.data.element
          .each(function(d){

            if (d && d[vars.id.value] === value) {
              this.checked = true
            }
            else {
              this.checked = false
            }

          })

      }

    }

    return value

  },
  "tooltip"    : {
    "accepted" : [ Boolean ],
    "value"    : true
  },
  "value"      : false
}

d3plus.method.footer = {
  "accepted" : [ false , Number , String ],
  "link"     : false,
  "value"    : false
}

d3plus.method.format = {
  "accepted"   : [ Function , String ],
  "deprecates" : [ "number_format" , "text_format" ],
  "locale"     : {
    "accepted" : function(){
      return d3.keys(d3plus.locale)
    },
    "process"  : function( value ) {

      var defaultLocale = "en"
        , returnObject  = d3plus.locale[defaultLocale]

      if ( value !== defaultLocale ) {
        returnObject = d3plus.object.merge( returnObject , d3plus.locale[value] )
      }

      return returnObject

    },
    "value"    : "en"
  },
  "number"     : d3plus.number.format,
  "process"    : function( value ) {

    if ( typeof value === "string" ) {
      var vars = this.getVars()
      vars.self.format({"locale": value})
    }
    else if ( typeof value === "function" ) {
      return value
    }

    return this.value

  },
  "text"       : d3plus.string.title,
  "value"      : function( value , key ) {

    if ( typeof value === "number" ) {
      return this.number( value , key )
    }
    if ( typeof value === "string" ) {
      return this.text( value , key )
    }
    else {
      return JSON.stringify(value)
    }

  }
}

d3plus.method.height = {
  "accepted"  : [ false , Number ],
  "secondary" : false,
  "value"     : false
}

d3plus.method.history = {
  "accepted" : [ Boolean ],
  "back"     : function() {

    if (this.states.length > 0) {

      var func = this.states.pop()

      func()

    }

  },
  "chain"    : [],
  "states"   : [],
  "value"    : true
}

d3plus.method.hover = {
  "accepted" : [ false , Number , String ],
  "value"    : false
}

d3plus.method.icon = {
  "accepted"   : [ false , Array , Function , Object , String ],
  "deprecates" : "icon_var",
  "style"      : {
    "accepted"   : [ Object , String ],
    "deprecates" : "icon_style",
    "value"      : "default"
  },
  "value"      : "icon"
}

d3plus.method.id = {
  "accepted"    : [ Array , String ],
  "dataFilter"  : true,
  "deprecates"  : [ "id_var" , "nesting" ],
  "init"        : function ( vars ) {

    if ( vars.shell === "form" ) {
      this.nesting = [ "value" ]
      return "value"
    }
    else {
      this.nesting = [ "id" ]
      return "id"
    }

  },
  "mute"        : d3plus.method.filter(true),
  "solo"        : d3plus.method.filter(true)
}

d3plus.method.keywords = {
  "accepted" : [ false , Array , Function , Object , String ],
  "mute"     : d3plus.method.filter(true),
  "solo"     : d3plus.method.filter(true),
  "value"    : "keywords"
}

d3plus.method.labels = {
  "accepted" : [ Boolean ] ,
  "resize"   : {
    "accepted" : [ Boolean ],
    "value"    : true
  },
  "value"    : true
}

d3plus.method.legend = {
  "accepted" : [ Boolean ],
  "value"    : true
}

d3plus.method.margin = {
  "accepted" : [ Number , Object , String ],
  "process"  : function ( value ) {

    var self = this
      , sides = [ "top" , "right" , "bottom" , "left" ]

    if ( value === undefined ) {
      var value = self.value
    }

    var userValue = value

    if ( typeof value === "string" ) {

      value = value.split(" ")

      value.forEach(function(v,i){
        value[i] = parseFloat(v,10)
      })

      if ( value.length === 1 ) {
        value = value[0]
      }
      else if ( value.length === 2 ) {
        value = {
          "top"    : value[0],
          "right"  : value[1],
          "bottom" : value[0],
          "left"   : value[1]
        }
      }
      else if ( value.length === 3 ) {
        value = {
          "top"    : value[0],
          "right"  : value[1],
          "bottom" : value[2],
          "left"   : value[1]
        }
      }
      else if ( value.length === 4 ) {
        value = {
          "top"    : value[0],
          "right"  : value[1],
          "bottom" : value[2],
          "left"   : value[3]
        }
      }
      else {
        value = 0
      }

    }

    if ( typeof value === "number" ) {

      sides.forEach(function(side){
        self[side] = value
      })

    }
    else {

      for ( var side in value ) {

        var sideIndex = sides.indexOf(side)

        if (sideIndex >= 0) {

          sides.splice(sideIndex,1)
          self[side] = value[side]

        }

      }

      sides.forEach(function(k){
        self[k] = 0
      })

    }

    return userValue

  },
  "value"    : 0
}

d3plus.method.messages = {
  "accepted" : [ Boolean , String ],
  "value"    : true
}

d3plus.method.nodes = {
  "accepted" : [ false , Array , Function , String ],
  "delimiter" : {
    "accepted" : [ String ],
    "value"    : "|"
  },
  "process"  : d3plus.method.processData,
  "type"     : {
    "accepted" : [ false , "json" , "xml" ,"html"
                 , "csv" , "dsv" , "tsv" , "txt" ],
    "value"    : false
  },
  "value"    : false
}

d3plus.method.open = {
  "accepted" : [ Boolean ],
  "flipped"  : {
    "accepted" : [ Boolean ],
    "value"    : false
  },
  "value"    : false
}

d3plus.method.order = {
  "accepted" : [ false , Function , String ],
  "sort"     : {
    "accepted"   : [ "asc" , "desc" ],
    "value"      : "asc",
    "deprecates" : [ "sort" ]
  },
  "value"    : false
}

d3plus.method.remove = {
  "accepted" : undefined,
  "process"  : function ( value ) {

    if ( this.initialized ) {
      var vars = this.getVars()
      vars.container.value.remove()
    }
    else {
      return value
    }


  },
  "value"    : undefined
}

d3plus.method.resize = {
  "accepted" : [ Boolean ],
  "value"    : false
}

d3plus.method.search = {
  "accepted" : [ "auto" , Boolean ],
  "process"  : function(value) {

    if (typeof value == "Boolean") {
      this.enabled = value
    }

    return value

  },
  "value"    : "auto"
}

d3plus.method.select = {
  "accepted"  : [ String ],
  "chainable" : false,
  "process"   : function ( value ) {

    var vars = this.getVars()

    return vars.container.value && value
         ? vars.container.value.select(value)
         : value

  },
  "value"     : undefined
}

d3plus.method.selectAll = {
  "accepted"  : [ String ],
  "chainable" : false,
  "process"   : function ( value ) {

    var vars = this.getVars()

    return vars.container.value && value
         ? vars.container.value.selectAll(value)
         : value

  },
  "value"     : undefined
}

d3plus.method.shape = {
  "accepted" : function( vars ) {
    return vars.shell === "textwrap" ? [ "circle" , "square" ]
         : [ "circle" , "donut" , "line"
         , "square" , "area" , "coordinates" ]
  },
  "value"    : false
}

d3plus.method.size = {
  "accepted"    : function( vars ) {

    if ( vars.shell === "textwrap" ) {
      return [ Array ]
    }
    else {
      return [ Array , Boolean , Function , Object , String ]
    }

  },
  "dataFilter"  : true,
  "deprecates"  : [ "value" , "value_var" ],
  "init"        : function( vars ) {

    if ( vars.shell === "textwrap" ) {
      return [ 9 , 40 ]
    }
    else {
      return false
    }

  },
  "mute"        : d3plus.method.filter(true),
  "scale"       : {
    "accepted"   : [ Function ],
    "deprecates" : "size_scale",
    "value"      : d3.scale.sqrt()
  },
  "solo"        : d3plus.method.filter(true),
  "threshold"   : true
}

d3plus.method.style = {
  "accepted" : function( vars ){
    return d3.keys(d3plus.style).filter(function(s){
      return typeof d3plus.style[s] === "object"
    })
  },
  "value"    : "default"
}

d3plus.method.temp = {
  "accepted": [ false , Array , Function , Object , String ],
  "deprecates": [ "else_var" , "else" ],
  "mute": d3plus.method.filter(true),
  "solo": d3plus.method.filter(true),
  "value": false
}

d3plus.method.text = {
  "accepted"   : [ Array , Boolean , Function , Object , String ],
  "deprecates" : [ "name_array" , "text_var" ],
  "html"     : {
    "accepted" : [ Boolean ],
    "value"    : false
  },
  "init"     : function ( vars ) {

    if ( vars.shell === "textwrap" ) {
      var s = this.split
      this.break = new RegExp("[^\\s\\"+s.join("\\")+"]+\\"+s.join("?\\")+"?","g")
      return false
    }
    else {
      return "text"
    }

  },
  "nesting"    : true,
  "mute"       : d3plus.method.filter(true),
  "solo"       : d3plus.method.filter(true),
  "secondary"  : {
    "accepted" : [ Array , Boolean , Function , Object , String ],
    "nesting"  : true,
    "value"    : false
  },
  "split"      : [ "-" , "/" , ";" , ":" , "&" ]
}

d3plus.method.time = {
  "accepted"    : [ Array , Boolean , Function , Object , String ],
  "dataFilter"  : true,
  "deprecates"  : [ "year" , "year_var" ],
  "fixed"       : {
    "accepted"   : [ Boolean ],
    "deprecates" : [ "static_axis" , "static_axes" ],
    "value"      : true
  },
  "mute"        : d3plus.method.filter(false),
  "solo"        : d3plus.method.filter(false),
  "value"       : false
}

d3plus.method.timeline = {
  "accepted" : [ Boolean ],
  "value"    : true
}

d3plus.method.title = {
  "accepted" : [ false , Function , String ],
  "link"     : false,
  "sub"      : {
    "accepted"   : [ false , String ],
    "deprecates" : "sub_title",
    "link"       : false,
    "value"      : false,
  },
  "total"    : {
    "accepted"   : [ Boolean , Object ],
    "deprecates" : "total_bar",
    "link"       : false,
    "value"      : false
  },
  "process"  : function ( value ) {

    var vars = this.getVars()

    if ( vars.container.id.indexOf("default") === 0 && value ) {
      var id = d3plus.string.strip(value).toLowerCase()
      vars.self.container({"id": id})
    }

    return value

  },
  "value"    : false
}

d3plus.method.tooltip = {
  "accepted"   : [ false , Array , Function , Object , String ],
  "deprecates" : "tooltip_info",
  "html"       : {
    "accepted"   : [ false , Function , String ],
    "deprecates" : "click_function",
    "value"      : false
  },
  "value"      : false
}

d3plus.method.total = {
  "accepted": [ false , Array , Function , Object , String ],
  "deprecates": [ "total_var" ],
  "mute": d3plus.method.filter(true),
  "solo": d3plus.method.filter(true),
  "value": false
}

d3plus.method.type = {
  "accepted" : function( vars ) {

    var shell = vars.shell

    if ( shell === "viz" ) {
      return d3.keys(d3plus.visualization)
    }
    else if ( shell === "form" ) {
      return d3.keys(d3plus.input)
    }
    else {
      return null
    }

  },
  "init"     : function ( vars ) {

    var shell = vars.shell

    if ( shell === "viz" ) {
      return "tree_map"
    }
    else if ( shell === "form" ) {
      return "auto"
    }
    else {
      return undefined
    }

  },
  "mode"     : {
    "accepted" : [ "squarify" , "slice" , "dice" , "slice-dice" ],
    "value"    : "squarify"
  }
}

d3plus.method.ui = {
  "accepted" : [ Array , Boolean ],
  "value"    : false
}

d3plus.method.width = {
  "accepted"  : [ false , Number ],
  "secondary" : false,
  "value"     : false
}

d3plus.method.x = d3plus.method.axis("x")

d3plus.method.y = d3plus.method.axis("y")

d3plus.method.zoom = {
  "accepted"   : [ Boolean ],
  "behavior"   : d3.behavior.zoom().scaleExtent([ 1 , 1 ]),
  "click"      : {
    "accepted" : [ Boolean ],
    "value"    : true
  },
  "direction"  : function( data ) {

    var vars          = this.getVars()
      , max_depth     = vars.id.nesting.length-1
      , current_depth = vars.depth.value
      , restricted    = d3plus.visualization[vars.type.value].nesting === false

    if (restricted) {
      return 0
    }
    else if ( data.d3plus.merged || current_depth < max_depth
              && ( !data || vars.id.nesting[vars.depth.value+1] in data ) ) {
      return 1
    }
    else if ( ( current_depth === max_depth || ( data && !(vars.id.nesting[vars.depth.value+1] in data) ) )
              && ( vars.small || !vars.tooltip.html.value ) ) {
      return -1
    }

    return 0

  },
  "pan"        : {
    "accepted" : [ Boolean ],
    "value"    : true
  },
  "scroll"     : {
    "accepted"   : [ Boolean ],
    "deprecates" : "scroll_zoom",
    "value"      : true
  },
  "touchEvent" : function() {

    var vars     = this.getVars()
      , zoomed   = vars.zoom.scale > vars.zoom.behavior.scaleExtent()[0]
      , enabled  = d3plus.visualization[vars.type.value].zoom
                 && vars.zoom.value && vars.zoom.scroll.value
      , zoomable = d3.event.touches.length > 1 && enabled

    if (!zoomable && !zoomed) {
      d3.event.stopPropagation()
    }

  },
  "value"      : true
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// D3plus Default Color Scheme
// Created by Dave Landry
//------------------------------------------------------------------------------
d3plus.style.default = {}

d3plus.style.default.fontFamily = [ "Helvetica Neue"
                                  , "HelveticaNeue"
                                  , "Helvetica"
                                  , "Arial"
                                  , "sans-serif" ]

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Constructs font family property using the validate function
//------------------------------------------------------------------------------
d3plus.style.fontFamily = function( family ) {

  return {
    "process": d3plus.font.validate,
    "value": family
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Flows the text into the container
//------------------------------------------------------------------------------
d3plus.textwrap.flow = function( vars ) {

  if ( vars.text.html.value ) {
    this.foreign( vars )
  }
  else {
    this.tspan( vars )
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Flows the text as a foreign element.
//------------------------------------------------------------------------------
d3plus.textwrap.foreign = function( vars ) {

  var text = vars.container.value
    , family = text.attr( "font-family" ) || text.style( "font-family" )
    , anchor = text.attr( "text-anchor" ) || text.style( "text-anchor" )
    , color = text.attr( "fill" ) || text.style( "fill" )
    , opacity = text.attr( "opacity" ) || text.style( "opacity" )

  anchor = anchor === "end"    ? "right"
         : anchor === "middle" ? "center"
         : "left"

  d3.select( text.node().parentNode ).append( "foreignObject" )
    .attr( "width"  , vars.width.value + "px" )
    .attr( "height" , vars.height.value + "px" )
    .attr( "x"      , "0px" )
    .attr( "y"      , "0px" )
    .append( "xhtml:div" )
      .style( "font-family" , family )
      .style( "font-size"   , vars.size.value[1] )
      .style( "color" , color )
      .style( "text-align" , anchor )
      .style( "opacity" , opacity )
      .text( vars.text.current )

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Checks width and height, and gets it if needed.
//------------------------------------------------------------------------------
d3plus.textwrap.getDimensions = function( vars ) {

  if ( !vars.width.value || !vars.height.value ) {

    var parent = d3.select(vars.container.value.node().parentNode)
      , rect   = parent.select("rect")
      , circle = parent.select("circle")

    if ( !rect.empty() ) {

      if ( !vars.width.value ) {
        var width = rect.attr("width") || rect.style("width")
        vars.self.width( parseFloat( width , 10 ) )
      }
      if ( !vars.height.value ) {
        var height = rect.attr("height") || rect.style("height")
        vars.self.height( parseFloat( height , 10 ) )
      }

    }
    else if ( !circle.empty() ) {

      var radius = circle.attr("r")

      if ( !vars.width.value ) {
        vars.self.width( parseFloat( radius * 2 , 10 ) )
      }
      if ( !vars.height.value ) {
        vars.self.height( parseFloat( radius * 2 , 10 ) )
      }

    }
    else {

      if ( !vars.width.value ) {
        vars.self.width(500)
      }
      if ( !vars.height.value ) {
        vars.self.height(500)
      }

    }
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Fetches text if not specified, and formats text to array.
//------------------------------------------------------------------------------
d3plus.textwrap.getSize = function( vars ) {

  var size = vars.container.value.attr("font-size")
             || vars.container.value.style("font-size")

  if ( vars.resize.value ) {
    vars.self.size( [ parseFloat( size , 10 ) , vars.size.value[1] ] )
  }
  else {
    vars.self.size( [ vars.size.value[0] , parseFloat( size , 10 ) ] )
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Fetches text if not specified, and formats text to array.
//------------------------------------------------------------------------------
d3plus.textwrap.getText = function( vars ) {

  if ( !vars.text.value ) {

    var text = vars.container.value.html()
    if ( text.indexOf("tspan") >= 0 ) {
      text.replace(/\<\/tspan\>\<tspan\>/g," ")
      text.replace(/\<\/tspan\>/g,"")
      text.replace(/\<tspan\>/g,"")
    }

    vars.self.text( text )

  }

  if ( vars.text.value instanceof Array ) {
    vars.text.phrases = vars.text.value.filter(function(t){
      return [ "string" , "number" ].indexOf(typeof t) >= 0
    })
  }
  else {
    vars.text.phrases = [ vars.text.value + "" ]
  }

  vars.container.value.html("")

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Logic to determine the best size for text
//------------------------------------------------------------------------------
d3plus.textwrap.resize = function( vars , line ) {

  if ( vars.resize.value ) {

    var words = []
    for ( var i = 0 ; i < vars.text.words.length ; i++ ) {
      var addon = i === vars.text.words.length - 1 ? "" : " "
      words.push( vars.text.words[i] + addon )
    }

    // Start by trying the largest font size
    var sizeMax   = Math.floor( vars.size.value[1] )
      , lineWidth = vars.shape.value === "circle" ? vars.width.value * 0.785
                  : vars.width.value
      , sizes     = d3plus.font.sizes( words
                                     , { "font-size" : sizeMax + "px" }
                                     , vars.container.value )
      , maxWidth  = d3.max( sizes , function(d){ return d.width } )
      , textArea  = d3.sum( sizes , function(d){ return d.width * d.height } ) * 1.2
      , boxArea   = vars.shape.value === "circle"
                  ? Math.PI * Math.pow( vars.width.value / 2 , 2 )
                  : lineWidth * vars.height.value

    if ( maxWidth > lineWidth || textArea > boxArea ) {

      var areaRatio  = Math.sqrt( boxArea / textArea )
        , widthRatio = lineWidth / maxWidth
        , sizeRatio  = d3.min([ areaRatio , widthRatio ])
        
      sizeMax = d3.max([ vars.size.value[0] , Math.floor( sizeMax * sizeRatio ) ])

    }

    if ( maxWidth * (sizeMax/vars.size.value[1]) <= lineWidth ) {

      if ( sizeMax !== vars.size.value[1] ) {
        vars.self.size([ vars.size.value[0] , sizeMax ])
      }

      vars.container.value.attr( "font-size" , vars.size.value[1]+"px" )
      this.flow( vars )

    }
    else {
      this.wrap( vars )
    }

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Flows the text into tspans
//------------------------------------------------------------------------------
d3plus.textwrap.tspan = function( vars ) {

  var xPosition  = vars.container.value.attr("x") || "0px"
    , words      = vars.text.words.slice(0)
    , tspans     = false
    , textBox    = vars.container.value.append("tspan").text( words[0] )
                     .attr( "dy" , vars.size.value[1] + "px" )
    , textHeight = textBox.node().offsetHeight
    , line       = 1
    , newLine    = function( ) {
      return vars.container.value.append("tspan")
              .attr( "x" , xPosition )
              .attr( "dy" , vars.size.value[1] + "px" )
    }
    , truncate   = function( ) {

      if ( !textBox.empty() ) {

        words = textBox.text().match(/[^\s-]+-?/g)

        ellipsis()

      }

    }
    , ellipsis   = function( ) {

      if ( words && words.length ) {

        var lastWord = words.pop()
          , lastChar = lastWord.charAt( lastWord.length-1 )

        if ( lastWord.length === 1
        && vars.text.split.indexOf( lastWord ) >= 0 ) {
          ellipsis()
        }
        else {

          if ( vars.text.split.indexOf( lastChar ) >= 0 ) {
            lastWord = lastWord.substr( 0 , lastWord.length - 1 )
          }

          textBox.text( words.join(" ") + " " + lastWord + " ..." )

          var baseline = (line-1) * textHeight
            , lineWidth = vars.shape.value === "circle"
                        ? 2*Math.sqrt( baseline*( (2*(vars.width.value/2))-baseline ) )
                        : vars.width.value

          if ( textBox.node().getComputedTextLength() > lineWidth ) {
            ellipsis()
          }

        }

      }
      else {

        textBox.remove()
        textBox = d3.select( vars.container.value.node().lastChild )
        if ( !textBox.empty() ) {
          line--
          truncate()
        }

      }

    }

  if ( vars.shape.value === "circle" ) {
    vars.container.value.attr( "text-anchor" , "middle" )
  }

  for ( var i = 1 ; i < words.length ; i++ ) {

    if ( line * textHeight > vars.height.value ) {
      textBox.remove()
      if ( i !== 1 ) {
        textBox = d3.select( vars.container.value.node().lastChild )
        if ( !textBox.empty() ) truncate()
      }
      break

    }

    var current   = textBox.text()
      , lastChar = current.slice(-1)
      , next_char = vars.text.current.charAt( vars.text.current.indexOf(current) + current.length )
      , joiner    = next_char == " " ? " " : ""

    textBox.text( current + joiner + words[i] )


    var baseline = (line-1) * textHeight
      , lineWidth = vars.shape.value === "circle"
                  ? 2*Math.sqrt( baseline*( (2*(vars.width.value/2))-baseline ) )
                  : vars.width.value

    if ( textBox.node().getComputedTextLength() > lineWidth ) {

      if ( !tspans ) {
        textBox.text("")
        textBox = newLine()
      }

      textBox.text( current )

      textBox = newLine()
      textBox.text( words[i] )

      line++

    }

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Flows the text into the container
//------------------------------------------------------------------------------
d3plus.textwrap.wrap = function( vars ) {

  if ( vars.text.phrases.length ) {

    vars.text.current = vars.text.phrases.shift() + ""
    vars.text.words   = vars.text.current.match(vars.text.break)
    
    if ( vars.resize.value ) {
      this.resize( vars )
    }
    else {
      this.flow( vars )
    }

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Miscellaneous Error Checks
//------------------------------------------------------------------------------
d3plus.draw.app = function(vars) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Draw the specified app
  //-------------------------------------------------------------------
  // Set vars.group to the app's specific group element
  vars.group = vars.g.apps[vars.type.value]
  // Reset mouse events for the app to use
  vars.mouse = {}

  if (!vars.internal_error) {

    var app = vars.format.locale.value.visualization[vars.type.value]
    if ( vars.dev.value ) d3plus.console.time("running "+ app)
    var returned = d3plus.visualization[vars.type.value](vars)
    if ( vars.dev.value ) d3plus.console.timeEnd("running "+ app)

  }
  else {
    var returned = null
  }

  vars.returned = {
      "nodes": null,
      "edges": null
    }

  if (returned instanceof Array) {
    vars.returned.nodes = returned
  }
  else if (returned) {
    if (returned.nodes) {
      vars.returned.nodes = returned.nodes
    }
    if (returned.edges) {
      vars.returned.edges = returned.edges
    }
  }

  var nodes = vars.returned.nodes
  if (!nodes || !(nodes instanceof Array) || !nodes.length) {
    vars.returned.nodes = []
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// If placing into a new container, remove it's contents
// and check text direction.
//
// Also initialized app width and height.
//------------------------------------------------------------------------------
d3plus.draw.container = function(vars) {

  if (vars.container.changed) {

    vars.container.value
      .style("position",function(){
        var current = d3.select(this).style("position"),
            remain = ["absolute","fixed"].indexOf(current) >= 0
        return remain ? current : "relative";
      })
      .html("")

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Get overall width and height, if not defined
    //--------------------------------------------------------------------------
    var sizes = ["width","height"]
    sizes.forEach(function(s){
      if (!vars[s].value) {

        function check_parent(element) {

          if (element.tagName === undefined || ["BODY","HTML"].indexOf(element.tagName) >= 0) {
            var val = window["inner"+s.charAt(0).toUpperCase()+s.slice(1)]
              , elem = document != element ? d3.select(element) : null
            if (elem && s == "width") {
              val -= parseFloat(elem.style("margin-left"),10)
              val -= parseFloat(elem.style("margin-right"),10)
              val -= parseFloat(elem.style("padding-left"),10)
              val -= parseFloat(elem.style("padding-right"),10)
            }
            else if (elem && s == "height") {
              val -= parseFloat(elem.style("margin-top"),10)
              val -= parseFloat(elem.style("margin-bottom"),10)
              val -= parseFloat(elem.style("padding-top"),10)
              val -= parseFloat(elem.style("padding-bottom"),10)
            }
            if (d3.selectAll("body > *:not(script)").size() == 1) {
              d3.select("body").style("overflow","hidden")
            }
            if (val <= 20) {
              val = vars[s].small
            }
            vars[s].value = val
          }
          else {

            var val = parseFloat(d3.select(element).style(s),10)
            if (typeof val == "number" && val > 0) {
              vars[s].value = val
            }
            else if (element.tagName != "BODY") {
              check_parent(element.parentNode)
            }

          }

        }

        check_parent(vars.container.value.node())
      }
    })

    vars.container.value
      .style("width",vars.width.value+"px")
      .style("height",vars.height.value+"px")

  }

  vars.width.viz = vars.width.value;
  vars.height.viz = vars.height.value;

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Enter Elements
//------------------------------------------------------------------------------
d3plus.draw.enter = function(vars) {

  if ( vars.dev.value ) d3plus.console.time("creating SVG elements")

  // Enter SVG
  vars.svg = vars.container.value.selectAll("svg#d3plus").data([0]);
  vars.svg.enter().insert("svg","#d3plus_message")
    .attr("id","d3plus")
    .attr("width",vars.width.value)
    .attr("height",vars.height.value)
    .attr("xmlns","http://www.w3.org/2000/svg")
    .attr("xmlns:xmlns:xlink","http://www.w3.org/1999/xlink")

  // Enter BG Rectangle
  vars.g.bg = vars.svg.selectAll("rect#bg").data(["bg"]);
  vars.g.bg.enter().append("rect")
    .attr("id","bg")
    .attr("fill",vars.background.value)
    .attr("width",vars.width.value)
    .attr("height",vars.height.value)

  // Enter Timeline Group
  vars.g.timeline = vars.svg.selectAll("g#timeline").data(["timeline"])
  vars.g.timeline.enter().append("g")
    .attr("id","timeline")
    .attr("transform","translate(0,"+vars.height.value+")")

  // Enter Key Group
  vars.g.legend = vars.svg.selectAll("g#key").data(["key"])
  vars.g.legend.enter().append("g")
    .attr("id","key")
    .attr("transform","translate(0,"+vars.height.value+")")

  // Enter Footer Group
  vars.g.footer = vars.svg.selectAll("g#footer").data(["footer"])
  vars.g.footer.enter().append("g")
    .attr("id","footer")
    .attr("transform","translate(0,"+vars.height.value+")")

  // Enter App Clipping Mask
  vars.g.clipping = vars.svg.selectAll("#clipping").data(["clipping"])
  vars.g.clipping.enter().append("clipPath")
    .attr("id","clipping")
    .append("rect")
      .attr("width",vars.width.viz)
      .attr("height",vars.height.viz)

  // Enter Container Group
  vars.g.container = vars.svg.selectAll("g#container").data(["container"])
  vars.g.container.enter().append("g")
    .attr("id","container")
    .attr("clip-path","url(#clipping)")
    .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")")

  // Enter Zoom Group
  vars.g.zoom = vars.g.container.selectAll("g#zoom").data(["zoom"])
  vars.g.zoom.enter().append("g")
    .attr("id","zoom")

  // Enter App Background Group
  vars.g.viz = vars.g.zoom.selectAll("g#d3plus_viz").data(["d3plus_viz"])
  vars.g.viz.enter().append("g")
    .attr("id","d3plus_viz")

  // Enter App Overlay Rect
  vars.g.overlay = vars.g.viz.selectAll("rect#d3plus_overlay").data([{"id":"d3plus_overlay"}])
  vars.g.overlay.enter().append("rect")
    .attr("id","d3plus_overlay")
    .attr("width",vars.width.value)
    .attr("height",vars.height.value)
    .attr("opacity",0)

  if (!d3plus.touch) {

    vars.g.overlay
      .on(d3plus.evt.move,function(d){

        if (d.dragging) {

        }
        else if (d3plus.visualization[vars.type.value].zoom && vars.zoom.pan.value &&
          vars.zoom.behavior.scaleExtent()[0] < vars.zoom.scale) {
          d3.select(this).style("cursor",d3plus.prefix()+"grab")
        }
        else {
          d3.select(this).style("cursor","auto")
        }

      })
      .on(d3plus.evt.up,function(d){

        if (d3plus.visualization[vars.type.value].zoom && vars.zoom.pan.value &&
          vars.zoom.behavior.scaleExtent()[0] < vars.zoom.scale) {
          d.dragging = false
          d3.select(this).style("cursor",d3plus.prefix()+"grab")
        }
        else {
          d3.select(this).style("cursor","auto")
        }

      })
      .on(d3plus.evt.down,function(d){

        if (d3plus.visualization[vars.type.value].zoom && vars.zoom.pan.value &&
          vars.zoom.behavior.scaleExtent()[0] < vars.zoom.scale) {
          d.dragging = true
          d3.select(this).style("cursor",d3plus.prefix()+"grabbing")
        }
        else {
          d3.select(this).style("cursor","auto")
        }

      })

  }
  else {

    vars.g.overlay
      .on(d3plus.evt.over,vars.zoom.touchEvent)
      .on(d3plus.evt.move,vars.zoom.touchEvent)
      .on(d3plus.evt.out,vars.zoom.touchEvent)

  }

  // Enter App Background Group
  vars.g.app = vars.g.viz.selectAll("g#app").data(["app"])
  vars.g.app.enter().append("g")
    .attr("id","app")

  // Enter Edges Group
  vars.g.edges = vars.g.viz.selectAll("g#edges").data(["edges"])
  vars.g.edges.enter().append("g")
    .attr("id","edges")
    .attr("opacity",0)

  // Enter Edge Focus Group
  vars.g.edge_focus = vars.g.viz.selectAll("g#focus").data(["focus"])
  vars.g.edge_focus.enter().append("g")
    .attr("id","focus")

  // Enter Edge Hover Group
  vars.g.edge_hover = vars.g.viz.selectAll("g#edge_hover").data(["edge_hover"])
  vars.g.edge_hover.enter().append("g")
    .attr("id","edge_hover")
    .attr("opacity",0)

  // Enter App Data Group
  vars.g.data = vars.g.viz.selectAll("g#data").data(["data"])
  vars.g.data.enter().append("g")
    .attr("id","data")
    .attr("opacity",0)

  // Enter Data Focus Group
  vars.g.data_focus = vars.g.viz.selectAll("g#data_focus").data(["data_focus"])
  vars.g.data_focus.enter().append("g")
    .attr("id","data_focus")

  // Enter Top Label Group
  vars.g.labels = vars.g.viz.selectAll("g#d3plus_labels").data(["d3plus_labels"])
  vars.g.labels.enter().append("g")
    .attr("id","d3plus_labels")

  vars.defs = vars.svg.selectAll("defs").data(["defs"])
  vars.defs.enter().append("defs")

  if ( vars.dev.value ) d3plus.console.timeEnd("creating SVG elements")

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Miscellaneous Error Checks
//------------------------------------------------------------------------------
d3plus.draw.errors = function(vars) {

  if ( vars.dev.value ) d3plus.console.time("checking for errors")

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check to see if we have all required variables set
  //----------------------------------------------------------------------------
  var reqs = ["id"]
  if (d3plus.visualization[vars.type.value].requirements) {
    reqs = reqs.concat(d3plus.visualization[vars.type.value].requirements)
  }

  var missing = []
  reqs.forEach(function(r){
    if (!vars[r].value) missing.push("\""+r+"\"")
  })

  if ( missing.length > 1 ) {
    var str = vars.format.locale.value.error.methods
      , app = vars.format.locale.value.visualization[vars.type.value]
      , and = vars.format.locale.value.ui.and
    missing = d3plus.string.list(missing,and)
    vars.internal_error = d3plus.string.format(str,app,missing)
  }
  else if ( missing.length === 1 ) {
    var str = vars.format.locale.value.error.method
      , app = vars.format.locale.value.visualization[vars.type.value]
    vars.internal_error = d3plus.string.format(str,app,missing[0])
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check to see if we have focus connections, if needed
  //----------------------------------------------------------------------------
  if (!vars.internal_error && reqs.indexOf("edges") >= 0 && reqs.indexOf("focus") >= 0) {
    var connections = vars.edges.connections(vars.focus.value,vars.id.value)
    if (connections.length == 0) {
      var name = d3plus.variable.text(vars,vars.focus.value,vars.depth.value)
        , str = vars.format.locale.value.error.connections
      vars.internal_error = d3plus.string.format(str,"\""+name+"\"")
    }
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check to see if we have all required libraries
  //----------------------------------------------------------------------------
  var reqs = ["d3"]
  if (d3plus.visualization[vars.type.value].libs) {
    reqs = reqs.concat(d3plus.visualization[vars.type.value].libs)
  }
  var missing = []
  reqs.forEach(function(r){
    if (!window[r]) missing.push("\""+r+"\"")
  })

  if ( missing.length > 1 ) {
    var str = vars.format.locale.value.error.libs
      , app = vars.format.locale.value.visualization[vars.type.value]
      , and = vars.format.locale.value.ui.and
    missing = d3plus.string.list(missing,and)
    vars.internal_error = d3plus.string.format(str,app,missing)
  }
  else if ( missing.length === 1 ) {
    var str = vars.format.locale.value.error.lib
      , app = vars.format.locale.value.visualization[vars.type.value]
    vars.internal_error = d3plus.string.format(str,app,missing[0])
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check to see if the requested app supports the set shape
  //----------------------------------------------------------------------------
  if (!vars.shape.value) {
    vars.shape.value = d3plus.visualization[vars.type.value].shapes[0]
  }
  else if (d3plus.visualization[vars.type.value].shapes.indexOf(vars.shape.value) < 0) {
    var shapes = d3plus.visualization[vars.type.value].shapes.join("\", \"")
      , str = vars.format.locale.value.error.accepted
      , shape = "\""+vars.shape.value+"\""
      , shapeStr = vars.format.locale.value.method.shape
      , app = vars.format.locale.value.visualization[vars.type.value]
    d3plus.console.warning(d3plus.string.format(str,shape,shapeStr,app,"\""+shapes+"\""),"shape")
    vars.shape.previous = vars.shape.value
    vars.shape.value = d3plus.visualization[vars.type.value].shapes[0]
    var str = vars.format.locale.value.dev.setLong
      , shape = "\""+vars.shape.value+"\""
    if ( vars.dev.value ) {
      d3plus.console.log(d3plus.string.format(str,shapeStr,shape))
    }
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check to see if the requested app supports the set "mode"
  //----------------------------------------------------------------------------
  if ("modes" in d3plus.visualization[vars.type.value]) {
    if (!vars.type.mode.value) {
      vars.type.mode.value = d3plus.visualization[vars.type.value].modes[0]
    }
    else if (d3plus.visualization[vars.type.value].modes.indexOf(vars.type.mode.value) < 0) {
      var modes = d3plus.visualization[vars.type.value].modes.join("\", \"")
        , str = vars.format.locale.value.error.accepted
        , mode = "\""+vars.type.mode.value+"\""
        , modeStr = vars.format.locale.value.method.mode
        , app = vars.format.locale.value.visualization[vars.type.value]
      d3plus.console.warning(d3plus.string.format(str,mode,modeStr,app,"\""+modes+"\""))
      vars.type.mode.previous = vars.type.mode.value
      vars.type.mode.value = d3plus.visualization[vars.type.value].modes[0]
      var str = vars.format.locale.value.dev.setLong
        , mode = "\""+vars.type.mode.value+"\""
      if ( vars.dev.value ) {
        d3plus.console.log(d3plus.string.format(str,modeStr,mode))
      }
    }
  }

  if ( vars.dev.value ) d3plus.console.timeEnd("checking for errors")

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Finalize Visualization
//------------------------------------------------------------------------------
d3plus.draw.finish = function(vars) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Zoom to fit bounds, if applicable
  //----------------------------------------------------------------------------
  if (d3plus.visualization[vars.type.value].zoom && vars.zoom.value) {

    if ( vars.dev.value ) d3plus.console.time("calculating zoom")

    if (vars.draw.first && vars.zoom.bounds) {
      d3plus.zoom.bounds(vars,vars.zoom.bounds,0)
    }

    if (vars.focus.changed || vars.height.changed || vars.width.changed) {
      if (!vars.zoom.viewport) {
        d3plus.zoom.bounds(vars,vars.zoom.bounds)
      }
      else {
        d3plus.zoom.bounds(vars,vars.zoom.viewport)
      }
    }

    if ( vars.dev.value ) d3plus.console.timeEnd("calculating zoom")

  }
  else {
    vars.zoom.scale = 1
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Resize/Reposition Overlay Rect for Mouse events
  //----------------------------------------------------------------------------
  var w = vars.zoom.size ? vars.zoom.size.width : vars.width.viz,
      h = vars.zoom.size ? vars.zoom.size.height : vars.height.viz,
      x = vars.zoom.bounds ? vars.zoom.bounds[0][0] : 0,
      y = vars.zoom.bounds ? vars.zoom.bounds[0][1] : 0

  vars.g.overlay
    .attr("width",w)
    .attr("height",h)
    .attr("x",x)
    .attr("y",y)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Create labels
  //----------------------------------------------------------------------------
  if (vars.draw.update) {
    d3plus.shape.edges(vars)
    if (vars.draw.timing || (!d3plus.visualization[vars.type.value].zoom && !vars.draw.timing)) {
      d3plus.shape.labels( vars , "data" )
      if (vars.edges.label) {

        setTimeout(function(){
          d3plus.shape.labels( vars , "edges" )
        },vars.draw.timing)

      }
    }
  }
  else if (d3plus.visualization[vars.type.value].zoom && vars.zoom.value && vars.draw.timing) {
    setTimeout(function(){
      d3plus.zoom.labels(vars)
    },vars.draw.timing)
  }

  if (d3plus.visualization[vars.type.value].zoom && vars.zoom.value && vars.focus.value && !vars.draw.timing) {
    if ( vars.dev.value ) d3plus.console.time("focus labels")
    d3plus.shape.labels( vars , "data_focus" )
    if (vars.edges.label) {

      setTimeout(function(){
        d3plus.shape.labels( vars , "edge_focus" )
      },vars.draw.timing)

    }
    if ( vars.dev.value ) d3plus.console.timeEnd("focus labels")
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check for Errors
  //----------------------------------------------------------------------------
  if (!vars.internal_error) {
    var data_req = d3plus.visualization[vars.type.value].requirements.indexOf("data") >= 0
    if ((!vars.data.app || !vars.returned.nodes.length) && data_req) {
      vars.internal_error = vars.format.locale.value.error.data
    }
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Hide the previous app, if applicable
  //----------------------------------------------------------------------------
  var prev = vars.type.previous
  if (prev && vars.type.value != prev && vars.g.apps[prev]) {
    if ( vars.dev.value ) d3plus.console.time("hiding \"" + prev + "\"")
    if (vars.draw.timing) {
      vars.g.apps[prev].transition().duration(vars.draw.timing)
        .attr("opacity",0)
    }
    else {
      vars.g.apps[prev].attr("opacity",0)
    }
    if ( vars.dev.value ) d3plus.console.timeEnd()
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Show the current app, data, and edges groups
  //----------------------------------------------------------------------------
  var data_req = d3plus.visualization[vars.type.value].requirements.indexOf("data") >= 0,
      new_opacity = (data_req && vars.data.app.length == 0) || vars.internal_error
        ? 0 : vars.focus.value && d3plus.visualization[vars.type.value].zoom && vars.zoom.value ? 0.4 : 1,
      old_opacity = vars.group.attr("opacity")

  if (new_opacity != old_opacity) {

    var timing = vars.draw.timing

    vars.group.transition().duration(timing)
      .attr("opacity",new_opacity)
    vars.g.data.transition().duration(timing)
      .attr("opacity",new_opacity)
    vars.g.edges.transition().duration(timing)
      .attr("opacity",new_opacity)

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Display and reset internal_error, if applicable
  //----------------------------------------------------------------------------
  if (vars.internal_error) {
    vars.internal_error = d3plus.string.title( vars.internal_error )
    d3plus.console.warning(vars.internal_error)
    d3plus.ui.message(vars,vars.internal_error)
    vars.internal_error = null
  }
  else {
    d3plus.ui.message(vars)
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Unfreeze controls and apply zoom behavior, if applicable
  //----------------------------------------------------------------------------
  setTimeout(function(){

    d3plus.data.reset( vars )

    if (d3plus.visualization[vars.type.value].zoom && vars.zoom.value) {
      vars.g.zoom
        .datum(vars)
        .call(vars.zoom.behavior.on("zoom",d3plus.zoom.mouse))
      if (!vars.zoom.scroll.value) {
        vars.g.zoom.on("wheel.zoom",null)
      }
      if (!vars.zoom.click.value) {
        vars.g.zoom.on("dblclick.zoom",null)
      }
      if (!vars.zoom.pan.value) {
        vars.g.zoom.on("mousemove.zoom",null)
        vars.g.zoom.on("mousedown.zoom",null)
      }
    }
    else {
      vars.g.zoom
        .call(vars.zoom.behavior.on("zoom",null))
    }

  },vars.draw.timing)

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates focus elements, if available
//------------------------------------------------------------------------------
d3plus.draw.focus = function(vars) {

  vars.g.edge_focus
    .selectAll("g")
    .remove()

  vars.g.data_focus
    .selectAll("g")
    .remove()

  if (vars.focus.value && d3plus.visualization[vars.type.value].zoom && vars.zoom.value) {

    if ( vars.dev.value ) d3plus.console.time("drawing focus elements")

    var edges = vars.g.edges.selectAll("g")

    if (edges.size() > 0) {

      edges.each(function(l){

          var source = l[vars.edges.source][vars.id.value],
              target = l[vars.edges.target][vars.id.value]

          if (source == vars.focus.value || target == vars.focus.value) {
            var elem = vars.g.edge_focus.node().appendChild(this.cloneNode(true))
            d3.select(elem).datum(l).attr("opacity",1)
              .selectAll("line, path").datum(l)
          }

        })


      var marker = vars.edges.arrows.value

      vars.g.edge_focus.selectAll("line, path")
        .attr("vector-effect","non-scaling-stroke")
        .style("stroke",vars.color.focus)
        .style("stroke-width",function(){
          return vars.edges.size ? d3.select(this).style("stroke-width")
               : vars.data.stroke.width*2
        })
        .attr("marker-start",function(e){

          var direction = vars.edges.arrows.direction.value

          if ("bucket" in e.d3plus) {
            var d = "_"+e.d3plus.bucket
          }
          else {
            var d = ""
          }

          return direction == "source" && marker
               ? "url(#d3plus_edge_marker_focus"+d+")" : "none"

        })
        .attr("marker-end",function(e){

          var direction = vars.edges.arrows.direction.value

          if ("bucket" in e.d3plus) {
            var d = "_"+e.d3plus.bucket
          }
          else {
            var d = ""
          }

          return direction == "target" && marker
               ? "url(#d3plus_edge_marker_focus"+d+")" : "none"

        })

      vars.g.edge_focus.selectAll("text")
        .style("fill",vars.color.focus)

    }

    var focii = d3plus.util.uniques(vars.edges.connections(vars.focus.value,vars.id.value,true),vars.id.value)
    focii.push(vars.focus.value)

    var x_bounds = [], y_bounds = [], x_buffer = [0], y_buffer = [0]

    var groups = vars.g.data.selectAll("g")
      .each(function(d){
        if (focii.indexOf(d[vars.id.value]) >= 0) {
          var elem = vars.g.data_focus.node().appendChild(this.cloneNode(true))
          var elem = d3.select(elem).datum(d).attr("opacity",1)

          if (vars.shape.value == "coordinates") {

            vars.zoom.viewport = vars.path.bounds(vars.zoom.coords[d.d3plus.id])

          }
          else if ("d3plus" in d) {
            if ("x" in d.d3plus) {
              x_bounds.push(d.d3plus.x)
            }
            if ("y" in d.d3plus) {
              y_bounds.push(d.d3plus.y)
            }
            if ("r" in d.d3plus) {
              x_buffer.push(d.d3plus.r)
              y_buffer.push(d.d3plus.r)
            }
            else {
              if ("width" in d.d3plus) {
                x_buffer.push(d.d3plus.width/2)
              }
              if ("height" in d.d3plus) {
                y_buffer.push(d.d3plus.height/2)
              }
            }
          }

          for (e in d3plus.evt) {
            var evt = d3.select(this).on(d3plus.evt[e])
            if (evt) {
              elem.on(d3plus.evt[e],evt)
            }
          }

        }
      })

    if (x_bounds.length && y_bounds.length) {

      var xcoords = d3.extent(x_bounds),
          ycoords = d3.extent(y_bounds),
          xmax = d3.max(x_buffer),
          ymax = d3.max(y_buffer)

      vars.zoom.viewport = [
        [xcoords[0]-xmax,ycoords[0]-ymax],
        [xcoords[1]+xmax,ycoords[1]+ymax]
      ]

    }

    vars.g.data_focus.selectAll("path")
      .style("stroke-width",vars.data.stroke.width*2)

    if ( vars.dev.value ) d3plus.console.timeEnd("drawing focus elements")

  }
  else {
    vars.zoom.viewport = null
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Calculate steps needed to redraw the visualization
//------------------------------------------------------------------------------
d3plus.draw.steps = function(vars) {

  var steps       = []
    , appType     = vars.type.value
    , locale      = vars.format.locale.value
    , uiMessage   = locale.message.ui
    , drawMessage = locale.message.draw

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check to see if any data needs to be loaded with JSON
  //----------------------------------------------------------------------------
  var urlLoads = [ "data" , "attrs" , "coords" , "nodes" , "edges" ]
  urlLoads.forEach(function(u){

    if ( !vars[u].loaded && vars[u].url ) {

      steps.push({
        "function": function( vars , next ){
          d3plus.data.url( vars , u , next )
        },
        "message": locale.message.loading,
        "wait": true
      })

    }

  })

  if (vars.draw.update) {

    var appName     = locale.visualization[appType].toLowerCase()
      , appSetup    = d3plus.visualization[appType].setup
      , appReqs     = d3plus.visualization[appType].requirements
      , appMessage  = d3plus.string.format(locale.message.initializing,appName)
      , dataMessage = locale.message.data

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If it has one, run the current app's setup function.
    //--------------------------------------------------------------------------
    if ( typeof appSetup === "function" ) {

      steps.push({
        "function": function( vars ) {

          if ( vars.dev.value ) {
            var timerString = "running " + appName + " setup"
            d3plus.console.time( timerString )
          }

          appSetup( vars )

          if ( vars.dev.value ) d3plus.console.timeEnd( timerString )

        },
        "message": appMessage
      })

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create SVG group elements if the container is new or has changed
    //--------------------------------------------------------------------------
    if ( vars.container.changed ) {

      steps.push({ "function" : d3plus.draw.enter , "message" : appMessage })

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create group for current app, if it doesn't exist.
    //--------------------------------------------------------------------------
    if ( !( appType in vars.g.apps ) ) {

      steps.push({
        "function": function( vars ) {

          if ( vars.dev.value ) {
            var timerString = "creating " + appName + " group"
            d3plus.console.time( timerString )
          }

          vars.g.apps[appType] = vars.g.app
            .selectAll("g#"+appType)
            .data([appType])

          vars.g.apps[appType].enter().append("g")
            .attr("id",appType)
            .attr("opacity",0)

          if ( vars.dev.value ) d3plus.console.timeEnd( timerString )

        },
        "message": appMessage
      })

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If new data is detected, analyze and reset it.
    //--------------------------------------------------------------------------
    if ( vars.data.changed ) {

      steps.push({
        "function": function(vars) {
          vars.data.cache = {}
          delete vars.nodes.restricted
          delete vars.edges.restricted
          d3plus.data.keys( vars , "data" )
        },
        "message": dataMessage
      })

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If new attributes are detected, analyze them.
    //--------------------------------------------------------------------------
    if ( vars.attrs.changed ) {

      steps.push({
        "function": function( vars ) {
          d3plus.data.keys( vars , "attrs" )
        },
        "message": dataMessage
      })

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Determine color type
    //--------------------------------------------------------------------------
    steps.push({
      "function": function(vars) {

          if ( vars.color.changed && vars.color.value ) {

            if ( vars.dev.value ) {
              var timerString = "determining color type"
              d3plus.console.time( timerString )
            }

            var colorKey = vars.color.value

            if ( d3plus.object.validate(colorKey) ) {
              if (colorKey[vars.id.value]) {
                colorKey = colorKey[vars.id.value]
              }
              else {
                colorKey = colorKey[d3.keys(colorKey)[0]]
              }
            }

            if ( vars.data.keys && colorKey in vars.data.keys ) {
              vars.color.type = vars.data.keys[colorKey]
            }
            else if ( vars.attrs.keys && colorKey in vars.attrs.keys ) {
              vars.color.type = vars.attrs.keys[colorKey]
            }
            else {
              vars.color.type = undefined
            }

            if ( vars.dev.value ) d3plus.console.timeEnd( timerString )

          }
          else if (!vars.color.value) {
            vars.color.type = "keys" in vars.data
                            ? vars.data.keys[vars.id.value] : false
          }

      },
      "message": dataMessage
    })

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Format nodes/edges if needed
    //--------------------------------------------------------------------------
    if ( appReqs.indexOf("edges") >= 0 && vars.edges.value
    && ( !vars.edges.linked || vars.edges.changed ) ) {
      steps.push({ "function" : d3plus.data.edges, "message" : dataMessage })
    }

    if ( appReqs.indexOf("nodes") >= 0 && vars.edges.value
    && ( !vars.nodes.positions || vars.nodes.changed ) ) {
      steps.push({ "function" : d3plus.data.nodes , "message" : dataMessage })
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Groups data by time and nesting.
    //--------------------------------------------------------------------------
    if ( vars.data.changed || vars.time.changed || vars.id.changed ) {
      steps.push({ "function" : d3plus.data.format , "message" : dataMessage })
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Fetches data for app and "pool"
    //--------------------------------------------------------------------------
    steps.push({
      "function": function(vars) {

        var year = !vars.time.fixed.value ? ["all"] : null
        if ( vars.dev.value ) {
          var timerString = year ? "fetching pool data" : "fetching data"
          d3plus.console.time( timerString )
        }
        vars.data.pool = d3plus.data.fetch( vars , year )
        if ( vars.dev.value ) d3plus.console.timeEnd( timerString )
        if ( !year ) {
          vars.data.app = vars.data.pool
        }
        else {
          if ( vars.dev.value ) d3plus.console.time("fetching data for current year")
          vars.data.app = d3plus.data.fetch( vars )
          if ( vars.dev.value ) d3plus.console.timeEnd("fetching data for current year")
        }

      },
      "message": dataMessage
    })

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Calculate color scale if type is number
    //--------------------------------------------------------------------------
    steps.push({
      "check": function(vars) {

        return vars.color.value && vars.color.type === "number" &&
               vars.id.nesting.indexOf(vars.color.value) < 0 &&
               vars.data.value && vars.color.value != vars.id.value &&
                 (vars.color.changed || vars.data.changed || vars.depth.changed ||
                   (vars.time.fixed.value &&
                     (vars.time.solo.changed || vars.time.mute.changed)
                   )
                 )

      },
      "function": d3plus.data.color,
      "message": dataMessage,
      "otherwise": function(vars) {
        if (vars.color.type !== "number") {
          vars.color.scale = null
        }
      }
    })

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Remove any lingering tooltips.
  //----------------------------------------------------------------------------
  steps.push({
    "function": function(vars) {
      if ( vars.dev.value ) {
        var str = vars.format.locale.value.message.tooltipReset
        d3plus.console.time(str)
      }
      if ( vars.type.previous && appType !== vars.type.previous ) {
        d3plus.tooltip.remove(vars.type.previous)
      }
      d3plus.tooltip.remove(appType)
      if ( vars.dev.value ) d3plus.console.timeEnd(str)
    },
    "message": uiMessage
  })

  steps.push({
    "function": function(vars) {

      vars.margin.process()
      d3plus.ui.titles(vars)

      if ( vars.draw.update ) {

        d3plus.ui.drawer(vars)
        d3plus.ui.timeline(vars)
        d3plus.ui.legend(vars)

      }
      else {

        if ( vars.dev.value ) d3plus.console.time("calculating margins")

        var drawer = vars.container.value.select("div#d3plus_drawer").node().offsetHeight

        var timeline = vars.g.timeline.node().getBBox()
        timeline = vars.timeline.value ? timeline.height+timeline.y : 0

        var legend = vars.g.legend.node().getBBox()
        legend = vars.legend.value ? legend.height+legend.y : 0

        vars.margin.bottom += drawer+timeline+legend

        if ( vars.dev.value ) d3plus.console.timeEnd("calculating margins")

      }

      d3plus.ui.history(vars)
      vars.height.viz -= (vars.margin.top+vars.margin.bottom)
      vars.width.viz -= (vars.margin.left+vars.margin.right)

    },
    "message": uiMessage
  })

  steps.push({
    "function": d3plus.ui.focus,
    "message": uiMessage
  })

  steps.push({
    "function": d3plus.draw.update,
    "message": drawMessage
  })

  if ( vars.draw.update ) {
    steps.push({
      "function" : [ d3plus.draw.errors
                   , d3plus.draw.app
                   , d3plus.shape.draw ],
      "message"  : drawMessage
    })
  }

  steps.push({
    "function" : [ d3plus.draw.focus , d3plus.draw.finish ],
    "message" : drawMessage
  })

  return steps

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Updating Elements
//------------------------------------------------------------------------------
d3plus.draw.update = function(vars) {

  if ( vars.dev.value ) d3plus.console.time("updating SVG elements")

  if ( vars.draw.timing ) {

    // Update Parent Element
    vars.container.value.transition().duration(vars.draw.timing)
      .style("width",vars.width.value+"px")
      .style("height",vars.height.value+"px")

    // Update SVG
    vars.svg.transition().duration(vars.draw.timing)
        .attr("width",vars.width.value)
        .attr("height",vars.height.value)

    // Update Background Rectangle
    vars.g.bg.transition().duration(vars.draw.timing)
        .attr("width",vars.width.value)
        .attr("height",vars.height.value)

    // Update App Clipping Rectangle
    vars.g.clipping.select("rect").transition().duration(vars.draw.timing)
      .attr("width",vars.width.viz)
      .attr("height",vars.height.viz)

    // Update Container Groups
    vars.g.container.transition().duration(vars.draw.timing)
      .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")")

  }
  else {

    // Update Parent Element
    vars.container.value
      .style("width",vars.width.value+"px")
      .style("height",vars.height.value+"px")

    // Update SVG
    vars.svg
      .attr("width",vars.width.value)
      .attr("height",vars.height.value)

    // Update Background Rectangle
    vars.g.bg
      .attr("width",vars.width.value)
      .attr("height",vars.height.value)

    // Update App Clipping Rectangle
    vars.g.clipping.select("rect")
      .attr("width",vars.width.viz)
      .attr("height",vars.height.viz)

    // Update Container Groups
    vars.g.container
      .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")")

  }

  if ( vars.dev.value ) d3plus.console.timeEnd("updating SVG elements")

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
d3plus.shape.area = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // D3 area definition
  //----------------------------------------------------------------------------
  var area = d3.svg.area()
    .x(function(d) { return d.d3plus.x; })
    .y0(function(d) { return d.d3plus.y0; })
    .y1(function(d) { return d.d3plus.y; })
    .interpolate(vars.shape.interpolate.value)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Enter
  //----------------------------------------------------------------------------
  enter.append("path").attr("class","d3plus_data")
    .attr("d",function(d){ return area(d.values) })
    .call(d3plus.shape.style,vars)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Update
  //----------------------------------------------------------------------------
  selection.selectAll("path.d3plus_data")
    .data(function(d) {

      if (vars.labels.value) {

        var areas = [],
            obj = null,
            obj2 = null,
            label = {
              "w": 0,
              "h": 0,
              "x": 0,
              "y": 0
            }

        function check_area(area) {

          obj.y = d3.max([obj.y,area.y])
          obj.y0 = d3.min([obj.y0,area.y0])
          obj.x0 = area.x

          obj.h = (obj.y0 - obj.y)
          obj.w = (obj.x0 - obj.x)

          var toosmall = obj.h-vars.labels.padding*2 < 10 || obj.w-vars.labels.padding*2 < 20,
              aspect_old = label.w/label.h,
              size_old = label.w*label.h,
              aspect_new = obj.w/obj.h,
              size_new = obj.w*obj.h

          if ((!toosmall && size_old < size_new) || !label.w) {
            label = {
              "w": obj.w,
              "h": obj.h,
              "x": obj.x+(obj.w/2),
              "y": obj.y+(obj.h/2)
            }
          }

          if (toosmall) {
            obj = d3plus.util.copy(area)
          }

        }

        d.values.forEach(function(v,i){

          if (!obj) {
            obj = d3plus.util.copy(v.d3plus)
          }
          else {
            var arr = d3plus.util.buckets([0,1],vars.labels.segments+1)
            arr.shift()
            arr.pop()
            arr.forEach(function(n){

              var test = d3plus.util.copy(v.d3plus),
                  last = d.values[i-1].d3plus

              test.x = last.x + (test.x-last.x) * n
              test.y = last.y + (test.y-last.y) * n
              test.y0 = last.y0 + (test.y0-last.y0) * n

              check_area(test)

            })
            check_area(d3plus.util.copy(v.d3plus))
          }
        })

        if (label.w >= 10 && label.h >= 10) {
          d.d3plus_label = label
        }

      }

      return [d];
    })

  if (vars.draw.timing) {
    selection.selectAll("path.d3plus_data")
      .transition().duration(vars.draw.timing)
        .attr("d",function(d){ return area(d.values) })
        .call(d3plus.shape.style,vars)
  }
  else {
    selection.selectAll("path.d3plus_data")
      .attr("d",function(d){ return area(d.values) })
      .call(d3plus.shape.style,vars)
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Returns the correct fill color for a node
//-------------------------------------------------------------------
d3plus.shape.color = function(d,vars) {

  var shape = d.d3plus ? d.d3plus.shapeType : vars.shape.value

  if (vars.shape.value == "line") {
    if (shape == "circle") {
      return d3plus.variable.color(vars,d)
    }
    else {
      return "none"
    }
  }
  else if (vars.shape.value == "area" || shape == "active") {
    return d3plus.variable.color(vars,d)
  }
  else if (shape == "temp") {
    return "url(#d3plus_hatch_"+d.d3plus.id+")"
  }
  else if (shape == "active") {
    return d3plus.variable.color(vars,d)
  }

  if (d.d3plus.static) {
    return d3plus.color.lighter(d3plus.variable.color(vars,d),.75);
  }

  var active = vars.active.value ? d3plus.variable.value(vars,d,vars.active.value) : d.d3plus.active,
      temp = vars.temp.value ? d3plus.variable.value(vars,d,vars.temp.value) : d.d3plus.temp,
      total = vars.total.value ? d3plus.variable.value(vars,d,vars.total.value) : d.d3plus.total

  if ((!vars.active.value && !vars.temp.value) || active === true || (active && total && active == total && !temp) || (active && !total)) {
    return d3plus.variable.color(vars,d)
  }
  else if (vars.active.spotlight.value) {
    return "#eee"
  }
  else {
    return d3plus.color.lighter(d3plus.variable.color(vars,d),.75);
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
d3plus.shape.coordinates = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Define the geographical projection
  //----------------------------------------------------------------------------
  var projection = d3.geo[vars.coords.projection.value]()
    .center(vars.coords.center)

  if (!vars.zoom.scale) {
    vars.zoom.scale = 1
  }

  vars.zoom.area = 1/vars.zoom.scale/vars.zoom.scale

  vars.path = d3.geo.path()
    .projection(projection)

  enter.append("path")
    .attr("id",function(d){
      return d.id
    })
    .attr("class","d3plus_data")
    .attr("d",vars.path)
    .call(d3plus.shape.style,vars)

  if (vars.draw.timing) {
    selection.selectAll("path.d3plus_data")
      .transition().duration(vars.draw.timing)
        .call(d3plus.shape.style,vars)
  }
  else {
    selection.selectAll("path.d3plus_data")
      .call(d3plus.shape.style,vars)
  }

  var size_change = vars.old_height != vars.height.viz || vars.height.changed
    || vars.old_width != vars.width.viz || vars.width.changed

  vars.old_height = vars.height.viz
  vars.old_width = vars.width.viz

  if (vars.coords.changed || size_change || vars.coords.mute.changed || vars.coords.solo.changed) {

    vars.zoom.bounds = null
    vars.zoom.coords = {}
    vars.zoom.labels = {}

    selection.each(function(d){

      var b = vars.path.bounds(d)

      var areas = []
      d.geometry.coordinates = d.geometry.coordinates.filter(function(c,i){

        var test = d3plus.util.copy(d)
        test.geometry.coordinates = [test.geometry.coordinates[i]]
        var a = vars.path.area(test)
        if (a >= vars.coords.threshold) {
          areas.push(a)
          return true
        }
        return false

      })
      areas.sort(function(a,b){
        return a-b
      })

      var reduced = d3plus.util.copy(d),
          largest = d3plus.util.copy(d)
      reduced.geometry.coordinates = reduced.geometry.coordinates.filter(function(c,i){

        var test = d3plus.util.copy(d)
        test.geometry.coordinates = [test.geometry.coordinates[i]]
        var a = vars.path.area(test)
        if (a == areas[areas.length-1]) {
          largest.geometry.coordinates = test.geometry.coordinates
        }
        return a >= d3.quantile(areas,.9)

      })
      vars.zoom.coords[d.d3plus.id] = reduced

      var center = vars.path.centroid(largest),
          lb = vars.path.bounds(largest)

      vars.zoom.labels[d.d3plus.id] = {
        "anchor": "middle",
        "group": vars.g.labels,
        "h": (lb[1][1]-lb[0][1])*.35,
        "w": (lb[1][0]-lb[0][0])*.35,
        "valign": "center",
        "x": center[0],
        "y": center[1]
      }

      if (!vars.zoom.bounds) {
        vars.zoom.bounds =  b
      }
      else {
        if (vars.zoom.bounds[0][0] > b[0][0]) {
          vars.zoom.bounds[0][0] = b[0][0]
        }
        if (vars.zoom.bounds[0][1] > b[0][1]) {
          vars.zoom.bounds[0][1] = b[0][1]
        }
        if (vars.zoom.bounds[1][0] < b[1][0]) {
          vars.zoom.bounds[1][0] = b[1][0]
        }
        if (vars.zoom.bounds[1][1] < b[1][1]) {
          vars.zoom.bounds[1][1] = b[1][1]
        }
      }

    })

  }
  else if (!vars.focus.value) {
    vars.zoom.viewport = false
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "donut" shapes using svg:path with arcs
//------------------------------------------------------------------------------
d3plus.shape.donut = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // In order to correctly animate each donut's size and arcs, we need to store
  // it's previous values in a lookup object that does not get destroyed when
  // redrawing the visualization.
  //----------------------------------------------------------------------------
  if (!vars.arcs) {
    vars.arcs = {
      "donut": {},
      "active": {},
      "temp": {}
    }
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // This is the main arc function that determines what values to use for each
  // arc angle and radius.
  //----------------------------------------------------------------------------
  var arc = d3.svg.arc()
    .startAngle(0)
    .endAngle(function(d){
      var a = vars.arcs[d.d3plus.shapeType][d.d3plus.id].a
      return a > Math.PI*2 ? Math.PI*2 : a;
    })
    .innerRadius(function(d){
      if (shape == "donut" && !d.d3plus.static) {
        var r = vars.arcs[d.d3plus.shapeType][d.d3plus.id].r
        return r * vars.data.donut.size
      }
      else {
        return 0
      }
    })
    .outerRadius(function(d){
      var r = vars.arcs[d.d3plus.shapeType][d.d3plus.id].r
      if (d.d3plus.shapeType != "donut") return r*2
      else return r
    })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // This is the main "arcTween" function where all of the animation happens
  // for each arc.
  //----------------------------------------------------------------------------
  function size(path,mod,rad,ang) {
    if (!mod) var mod = 0
    if (typeof rad != "number") var rad = undefined
    if (typeof ang != "number") var ang = undefined
    path.attrTween("d", function(d){
      if (rad == undefined) var r = d.d3plus.r ? d.d3plus.r : d3.max([d.d3plus.width,d.d3plus.height])
      else var r = rad
      if (ang == undefined) var a = d.d3plus.a[d.d3plus.shapeType]
      else var a = ang
      if (!vars.arcs[d.d3plus.shapeType][d.d3plus.id]) {
        vars.arcs[d.d3plus.shapeType][d.d3plus.id] = {"r": 0}
        vars.arcs[d.d3plus.shapeType][d.d3plus.id].a = d.d3plus.shapeType == "donut" ? Math.PI * 2 : 0
      }
      var radius = d3.interpolate(vars.arcs[d.d3plus.shapeType][d.d3plus.id].r,r+mod),
          angle = d3.interpolate(vars.arcs[d.d3plus.shapeType][d.d3plus.id].a,a)
      return function(t) {
        vars.arcs[d.d3plus.shapeType][d.d3plus.id].r = radius(t)
        vars.arcs[d.d3plus.shapeType][d.d3plus.id].a = angle(t)
        return arc(d)
      }
    })
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Exit
  //----------------------------------------------------------------------------
  exit.selectAll("path.d3plus_data")
  .transition().duration(vars.draw.timing)
    .call(size,0,0)
    .each("end",function(d){
      delete vars.arcs[d.d3plus.shapeType][d.d3plus.id]
    })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Update
  //----------------------------------------------------------------------------
  selection.selectAll("path.d3plus_data")
    .data(function(d) { return [d]; })
    .transition().duration(vars.draw.timing)
      .call(size)
      .call(d3plus.shape.style,vars)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Enter
  //----------------------------------------------------------------------------
  enter.append("path")
    .attr("class","d3plus_data")
    .transition().duration(0)
      .call(size,0,0)
      .call(d3plus.shape.style,vars)

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws the appropriate shape based on the data
//------------------------------------------------------------------------------
d3plus.shape.draw = function(vars) {

  var data = vars.returned.nodes || [],
      edges = vars.returned.edges || []

  vars.draw.timing = data.length < vars.data.large
                     && edges.length < vars.edges.large
                     ? vars.timing.transitions : 0

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Match vars.shape types to their respective d3plus.shape functions. For
  // example, both "square", and "circle" shapes use "rect" as their drawing
  // class.
  //----------------------------------------------------------------------------
  var shape_lookup = {
    "area": "area",
    "circle": "rect",
    "donut": "donut",
    "line": "line",
    "square": "rect",
    "coordinates": "coordinates"
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Split the data by each shape type in the data.
  //----------------------------------------------------------------------------
  var shapes = {}
  data.forEach(function(d){
    if (!d.d3plus) {
      var s = shape_lookup[vars.shape.value]
    }
    else if (!d.d3plus.shape) {
      var s = shape_lookup[vars.shape.value]
      d.d3plus.shapeType = s
    }
    else {
      var s = d.d3plus.shape
      d.d3plus.shapeType = s
    }
    if (!shapes[s]) {
      shapes[s] = []
    }
    shapes[s].push(d)
  })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Resets the "id" of each data point to use with matching.
  //----------------------------------------------------------------------------
  function id(d) {

    var depth = d.d3plus.depth ? d.d3plus.depth : vars.depth.value

    d.d3plus.id = d3plus.variable.value(vars,d,vars.id.nesting[depth])
    d.d3plus.id += "_"+depth+"_"+shape

    vars.axes.values.forEach(function(axis){
      if (vars[axis].scale.value == "continuous") {
        d.d3plus.id += "_"+d3plus.variable.value(vars,d,vars[axis].value)
      }
    })

    d.d3plus.id = d3plus.string.strip(d.d3plus.id)

    return d
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Transforms the positions and scale of each group.
  //----------------------------------------------------------------------------
  function transform(g,grow) {

    var scales = d3plus.visualization[vars.type.value].scale
    if (grow && scales && scales[vars.shape.value]) {
       var scale = scales[vars.shape.value]
    }
    else if (grow && scales && typeof scales == "number") {
      var scale = scales
    }
    else {
      var scale = 1
    }

    g
      .attr("transform",function(d){
        if (["line","area","coordinates"].indexOf(shape) < 0) {
          return "translate("+d.d3plus.x+","+d.d3plus.y+")scale("+scale+")"
        }
        else {
          return "scale("+scale+")"
        }
      })

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Remove old groups
  //----------------------------------------------------------------------------
  for (shape in shape_lookup) {
    if (!(shape_lookup[shape] in shapes) || d3.keys(shapes).length === 0) {
      if (vars.draw.timing) {
        vars.g.data.selectAll("g.d3plus_"+shape_lookup[shape])
          .transition().duration(vars.draw.timing)
          .attr("opacity",0)
          .remove()
      }
      else {
        vars.g.data.selectAll("g.d3plus_"+shape_lookup[shape])
          .remove()
      }
    }
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialize arrays for labels and sizes
  //----------------------------------------------------------------------------
  var labels = [],
      shares = []

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Create groups by shape, apply data, and call specific shape drawing class.
  //----------------------------------------------------------------------------
  for (var shape in shapes) {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Bind Data to Groups
    //--------------------------------------------------------------------------
    var selection = vars.g.data.selectAll("g.d3plus_"+shape)
      .data(shapes[shape],function(d){

        if (!d.d3plus) d.d3plus = {}

        if ( shape === "coordinates" ) {
          d.d3plus.id = d.id
          return d.id
        }

        if ( !d.d3plus.id ) {

          if (d.values) {

            d.values.forEach(function(v){
              v = id(v)
              v.d3plus.shapeType = "circle"
            })
            d.d3plus.id = d.key

          }
          else {

            d = id(d)

            if (!d.d3plus.a) {

              d.d3plus.a = {"donut": Math.PI*2}
              var active = vars.active.value ? d.d3plus[vars.active.value] : d.d3plus.active,
                  temp = vars.temp.value ? d.d3plus[vars.temp.value] : d.d3plus.temp,
                  total = vars.total.value ? d.d3plus[vars.total.value] : d.d3plus.total

              if (total) {
                if (active) {
                  d.d3plus.a.active = (active/total) * (Math.PI * 2)
                }
                else {
                  d.d3plus.a.active = 0
                }
                if (temp) {
                  d.d3plus.a.temp = ((temp/total) * (Math.PI * 2)) + d.d3plus.a.active
                }
                else {
                  d.d3plus.a.temp = 0
                }
              }

            }

          }

        }

        return d.d3plus ? d.d3plus.id : false;

      })

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Groups Exit
    //--------------------------------------------------------------------------
    if (vars.draw.timing) {
      var exit = selection.exit()
        .transition().duration(vars.draw.timing)
        .attr("opacity",0)
        .remove()
    }
    else {
      var exit = selection.exit()
        .remove()
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Existing Groups Update
    //--------------------------------------------------------------------------
    if (vars.draw.timing) {
      selection
        .transition().duration(vars.draw.timing)
        .call(transform)
    }
    else {
      selection.call(transform)
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Groups Enter
    //--------------------------------------------------------------------------
    var opacity = vars.draw.timing ? 0 : 1
    var enter = selection.enter().append("g")
      .attr("class","d3plus_"+shape)
      .attr("opacity",opacity)
      .call(transform)

    if (vars.draw.timing) {
      enter.transition().duration(vars.draw.timing)
        .attr("opacity",1)
    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // All Groups Sort Order
    //--------------------------------------------------------------------------
    selection.order()

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Draw appropriate graphics inside of each group
    //--------------------------------------------------------------------------
    if ( vars.dev.value ) d3plus.console.time("drawing \"" + shape + "\" shapes")
    d3plus.shape[shape]( vars , selection , enter , exit , transform )
    if ( vars.dev.value ) d3plus.console.timeEnd("drawing \"" + shape + "\" shapes")

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Check for active and temp fills for rects and donuts
    //--------------------------------------------------------------------------
    if (["rect","donut"].indexOf(shape) >= 0 && d3plus.visualization[vars.type.value].fill) {
      if ( vars.dev.value ) d3plus.console.time("filling \"" + shape + "\" shapes")
      d3plus.shape.fill( vars , selection , enter , exit , transform )
      if ( vars.dev.value ) d3plus.console.timeEnd("filling \"" + shape + "\" shapes")
    }

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Function to Update Edges
  //----------------------------------------------------------------------------
  function edge_update(d) {

    if (d && vars.g.edges.selectAll("g").size() > 0) {

      vars.g.edges.selectAll("g")
        .each(function(l){

          var id = d[vars.id.value],
              source = l[vars.edges.source][vars.id.value],
              target = l[vars.edges.target][vars.id.value]

          if (source == id || target == id) {
            var elem = vars.g.edge_hover.node().appendChild(this.cloneNode(true))
            d3.select(elem).datum(l).attr("opacity",1)
              .selectAll("line, path").datum(l)
          }

        })


      var marker = vars.edges.arrows.value

      vars.g.edge_hover
        .attr("opacity",0)
        .selectAll("line, path")
          .style("stroke",vars.color.primary)
          .style("stroke-width",function(){
            return vars.edges.size ? d3.select(this).style("stroke-width")
                 : vars.data.stroke.width*2
          })
          .attr("marker-start",function(e){

            var direction = vars.edges.arrows.direction.value

            if ("bucket" in e.d3plus) {
              var d = "_"+e.d3plus.bucket
            }
            else {
              var d = ""
            }

            return direction == "source" && marker
                 ? "url(#d3plus_edge_marker_highlight"+d+")" : "none"

          })
          .attr("marker-end",function(e){

            var direction = vars.edges.arrows.direction.value

            if ("bucket" in e.d3plus) {
              var d = "_"+e.d3plus.bucket
            }
            else {
              var d = ""
            }

            return direction == "target" && marker
                 ? "url(#d3plus_edge_marker_highlight"+d+")" : "none"

          })


      vars.g.edge_hover.selectAll("text")
        .style("fill",vars.color.primary)

      if (vars.draw.timing) {

        vars.g.edge_hover
          .transition().duration(vars.timing.mouseevents)
          .attr("opacity",1)

        vars.g.edges
          .transition().duration(vars.timing.mouseevents)
          .attr("opacity",0.5)

      }
      else {

        vars.g.edge_hover
          .attr("opacity",1)

      }

    }
    else {

      if (vars.draw.timing) {

        vars.g.edge_hover
          .transition().duration(vars.timing.mouseevents)
          .attr("opacity",0)
          .transition()
          .selectAll("*")
          .remove()

        vars.g.edges
          .transition().duration(vars.timing.mouseevents)
          .attr("opacity",1)

      }
      else {

        vars.g.edge_hover
          .selectAll("*")
          .remove()

      }

    }

  }

  edge_update()

  if (!d3plus.touch) {

    vars.g.data.selectAll("g")
      .on(d3plus.evt.over,function(d){

        if (!vars.draw.frozen && (!d.d3plus || !d.d3plus.static)) {

          d3.select(this).style("cursor","pointer")
            .transition().duration(vars.timing.mouseevents)
            .call(transform,true)

          d3.select(this).selectAll(".d3plus_data")
            .transition().duration(vars.timing.mouseevents)
            .attr("opacity",1)

          vars.covered = false

          if (["area","line"].indexOf(vars.shape.value) >= 0
            || vars.focus.value != d[vars.id.value]) {

            if (vars.continuous_axis) {

              var index = vars.continuous_axis === "x" ? 0 : 1
                , mouse = d3.mouse(vars.container.value.node())[index]
                , positions = d3plus.util.uniques(d.values,function(x){return x.d3plus[vars.continuous_axis]})
                , closest = d3plus.util.closest(positions,mouse)

              d.d3plus_data = d.values[positions.indexOf(closest)]
              d.d3plus = d.values[positions.indexOf(closest)].d3plus

            }

            var tooltip_data = d.d3plus_data ? d.d3plus_data : d
            d3plus.tooltip.app({
              "vars": vars,
              "data": tooltip_data
            })

          }

          if (typeof vars.mouse == "function") {
            vars.mouse(d)
          }
          else if (vars.mouse[d3plus.evt.over]) {
            vars.mouse[d3plus.evt.over](d)
          }

          edge_update(d)

        }

      })
      .on(d3plus.evt.move,function(d){

        if (!vars.draw.frozen && (!d.d3plus || !d.d3plus.static)) {

          vars.covered = false

          if (["area","line"].indexOf(vars.shape.value) >= 0
            || (d3plus.visualization[vars.type.value].tooltip == "follow" &&
            (vars.focus.value != d[vars.id.value]))) {

            if (vars.continuous_axis) {

              var index = vars.continuous_axis === "x" ? 0 : 1
                , mouse = d3.mouse(vars.container.value.node())[index]
                , positions = d3plus.util.uniques(d.values,function(x){return x.d3plus[vars.continuous_axis]})
                , closest = d3plus.util.closest(positions,mouse)

              d.d3plus_data = d.values[positions.indexOf(closest)]
              d.d3plus = d.values[positions.indexOf(closest)].d3plus

            }

            var tooltip_data = d.d3plus_data ? d.d3plus_data : d
            d3plus.tooltip.app({
              "vars": vars,
              "data": tooltip_data
            })

          }

          if (typeof vars.mouse == "function") {
            vars.mouse(d)
          }
          else if (vars.mouse[d3plus.evt.move]) {
            vars.mouse[d3plus.evt.move](d)
          }

        }

      })
      .on(d3plus.evt.out,function(d){

        var child = d3plus.util.child(this,d3.event.toElement)

        if (!child && !vars.draw.frozen && (!d.d3plus || !d.d3plus.static)) {

          d3.select(this)
            .transition().duration(vars.timing.mouseevents)
            .call(transform)

          d3.select(this).selectAll(".d3plus_data")
            .transition().duration(vars.timing.mouseevents)
            .attr("opacity",vars.data.opacity)


          if (!vars.covered) {
            d3plus.tooltip.remove(vars.type.value)
          }

          if (typeof vars.mouse == "function") {
            vars.mouse(d)
          }
          else if (vars.mouse[d3plus.evt.out]) {
            vars.mouse[d3plus.evt.out](d)
          }

          edge_update()

        }

      })

  }
  else {

    vars.g.data.selectAll("g")
      .on(d3plus.evt.over,vars.zoom.touchEvent)
      .on(d3plus.evt.move,vars.zoom.touchEvent)
      .on(d3plus.evt.out,vars.zoom.touchEvent)

  }

  vars.g.data.selectAll("g")
    .on(d3plus.evt.click,function(d){

      if (!vars.draw.frozen && (!d.d3plus || !d.d3plus.static)) {

        if (typeof vars.mouse == "function") {
          vars.mouse(d)
        }
        else if (vars.mouse[d3plus.evt.out]) {
          vars.mouse[d3plus.evt.out](d)
        }
        else if (vars.mouse[d3plus.evt.click]) {
          vars.mouse[d3plus.evt.click](d)
        }

        var depth_delta = vars.zoom.direction(d.d3plus_data || d)
          , previous = vars.id.solo.value
          , title = d3plus.variable.text(vars,d)[0]
          , color = d3plus.color.legible(d3plus.variable.color(vars,d))
          , prev_sub = vars.title.sub.value || false
          , prev_color = vars.title.sub.font.color
          , prev_total = vars.title.total.font.color

        if (d.d3plus.threshold && d.d3plus.merged && vars.zoom.value) {

          vars.history.states.push(function(){

            vars.self
              .id({"solo": previous})
              .title({
                "sub": {
                  "font": {
                    "color": prev_color
                  },
                  "value": prev_sub
                },
                "total": {
                  "font": {
                    "color": prev_total
                  }
                }
              })
              .draw()

          })

          vars.self
            .id({"solo": d3plus.util.uniques(d.d3plus.merged,vars.id.value)})
            .title({
              "sub": {
                "font": {
                  "color": color
                },
                "value": title
              },
              "total": {
                "font": {
                  "color": color
                }
              }
            })
            .draw()

        }
        else if (depth_delta === 1 && vars.zoom.value) {

          var id = d3plus.variable.value(vars,d,vars.id.value)

          vars.history.states.push(function(){

            vars.self
              .depth(vars.depth.value-1)
              .id({"solo": previous})
              .title({
                "sub": {
                  "font": {
                    "color": prev_color
                  },
                  "value": prev_sub
                },
                "total": {
                  "font": {
                    "color": prev_total
                  }
                }
              })
              .draw()

          })

          vars.self
            .depth(vars.depth.value+1)
            .id({"solo": [id]})
            .title({
              "sub": {
                "font": {
                  "color": color
                },
                "value": title
              },
              "total": {
                "font": {
                  "color": color
                }
              }
            })
            .draw()

        }
        else if (depth_delta === -1 && vars.zoom.value) {

          vars.history.back()

        }
        else if (d3plus.visualization[vars.type.value].zoom && vars.zoom.value) {

          edge_update()

          d3.select(this)
            .transition().duration(vars.timing.mouseevents)
            .call(transform)

          d3.select(this).selectAll(".d3plus_data")
            .transition().duration(vars.timing.mouseevents)
            .attr("opacity",vars.data.opacity)

          d3plus.tooltip.remove(vars.type.value)
          vars.draw.update = false

          if (!d || d[vars.id.value] == vars.focus.value) {
            vars.self.focus(false).draw()
          }
          else {
            vars.self.focus(d[vars.id.value]).draw()
          }

        }
        else if (d[vars.id.value] != vars.focus.value) {

          edge_update()

          var tooltip_data = d.d3plus_data ? d.d3plus_data : d

          d3plus.tooltip.app({
            "vars": vars,
            "data": tooltip_data
          })

        }

      }

    })

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
d3plus.shape.edges = function(vars) {

  var edges = vars.returned.edges || [],
      scale = vars.zoom.behavior.scaleExtent()[0]

  if (typeof vars.edges.size === "string") {

    var strokeDomain = d3.extent(edges, function(e){
                         return e[vars.edges.size]
                       })
      , maxSize = d3.min(vars.returned.nodes || [], function(n){
                        return n.d3plus.r
                      })*.6

    vars.edges.scale = d3.scale.sqrt()
                        .domain(strokeDomain)
                        .range([vars.edges.width,maxSize*scale])

  }
  else {

    var defaultWidth = typeof vars.edges.size == "number"
                     ? vars.edges.size : vars.edges.width

    vars.edges.scale = function(){
      return defaultWidth
    }

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialization of Lines
  //----------------------------------------------------------------------------
  function init(l) {

    var opacity = vars.edges.opacity == 1 ? vars.edges.opacity : 0

    l
      .attr("opacity",opacity)
      .style("stroke-width",0)
      .style("stroke",vars.background.value)
      .style("fill","none")
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Styling of Lines
  //----------------------------------------------------------------------------
  function style(edges) {

    var marker = vars.edges.arrows.value

    edges
      .style("stroke-width",function(e){
        return vars.edges.scale(e[vars.edges.size])
      })
      .style("stroke",vars.edges.color)
      .attr("opacity",vars.edges.opacity)
      .attr("marker-start",function(e){

        var direction = vars.edges.arrows.direction.value

        if ("bucket" in e.d3plus) {
          var d = "_"+e.d3plus.bucket
        }
        else {
          var d = ""
        }

        return direction == "source" && marker
             ? "url(#d3plus_edge_marker_default"+d+")" : "none"

      })
      .attr("marker-end",function(e){

        var direction = vars.edges.arrows.direction.value

        if ("bucket" in e.d3plus) {
          var d = "_"+e.d3plus.bucket
        }
        else {
          var d = ""
        }

        return direction == "target" && marker
             ? "url(#d3plus_edge_marker_default"+d+")" : "none"

      })
      .attr("vector-effect","non-scaling-stroke")
      .attr("pointer-events","none")
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Positioning of Lines
  //----------------------------------------------------------------------------
  function line(l) {
    l
      .attr("x1",function(d){
        return d[vars.edges.source].d3plus.dx
      })
      .attr("y1",function(d){
        return d[vars.edges.source].d3plus.dy
      })
      .attr("x2",function(d){
        return d[vars.edges.target].d3plus.dx
      })
      .attr("y2",function(d){
        return d[vars.edges.target].d3plus.dy
      })
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Positioning of Splines
  //----------------------------------------------------------------------------
  var diagonal = d3.svg.diagonal(),
      radial = d3.svg.diagonal()
        .projection(function(d){
          var r = d.y, a = d.x;
          return [r * Math.cos(a), r * Math.sin(a)];
        })

  function spline(l) {
    l
      .attr("d", function(d) {
        if (d[vars.edges.source].d3plus.dr) {
          var x1 = d[vars.edges.source].d3plus.a,
              y1 = d[vars.edges.source].d3plus.dr,
              x2 = d[vars.edges.target].d3plus.a,
              y2 = d[vars.edges.target].d3plus.dr
          var obj = {}
          obj[vars.edges.source] = {"x":x1,"y":y1}
          obj[vars.edges.target] = {"x":x2,"y":y2}
          return radial(obj);

        }
        else {
          var x1 = d[vars.edges.source].d3plus.dx,
              y1 = d[vars.edges.source].d3plus.dy,
              x2 = d[vars.edges.target].d3plus.dx,
              y2 = d[vars.edges.target].d3plus.dy
          var obj = {}
          obj[vars.edges.source] = {"x":x1,"y":y1}
          obj[vars.edges.target] = {"x":x2,"y":y2}
          return diagonal(obj);
        }
      })
      .attr("transform",function(d){
        if (d.d3plus && d.d3plus.translate) {
          var x = d.d3plus.translate.x || 0
          var y = d.d3plus.translate.y || 0
          return "translate("+x+","+y+")"
        }
        else {
          "translate(0,0)"
        }
      })
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculates and Draws Label for edge
  //----------------------------------------------------------------------------
  function label(d) {

    delete d.d3plus_label

    if (vars.g.edges.selectAll("line, path").size() < vars.edges.large && vars.edges.label && d[vars.edges.label]) {

      if ("spline" in d.d3plus) {

        var length = this.getTotalLength(),
            center = this.getPointAtLength(length/2),
            prev = this.getPointAtLength((length/2)-(length*.1)),
            next = this.getPointAtLength((length/2)+(length*.1)),
            radians = Math.atan2(next.y-prev.y,next.x-prev.x),
            angle = radians*(180/Math.PI),
            bounding = this.parentNode.getBBox(),
            width = length*.8,
            x = d.d3plus.translate.x+center.x,
            y = d.d3plus.translate.y+center.y,
            translate = {
              "x": d.d3plus.translate.x+center.x,
              "y": d.d3plus.translate.y+center.y
            }

      }
      else {

        var bounds = this.getBBox()
            start = {"x": d[vars.edges.source].d3plus.dx, "y": d[vars.edges.source].d3plus.dy},
            end = {"x": d[vars.edges.target].d3plus.dx, "y": d[vars.edges.target].d3plus.dy},
            xdiff = end.x-start.x,
            ydiff = end.y-start.y,
            center = {"x": end.x-(xdiff)/2, "y": end.y-(ydiff)/2},
            radians = Math.atan2(ydiff,xdiff),
            angle = radians*(180/Math.PI),
            length = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff)),
            width = length,
            x = center.x,
            y = center.y,
            translate = {
              "x": center.x,
              "y": center.y
            }

      }

      width += vars.labels.padding*2

      var m = 0
      if (vars.edges.arrows.value) {
        m = typeof vars.edges.arrows.value === "number"
          ? vars.edges.arrows.value : 8
        m = m/vars.zoom.behavior.scaleExtent()[1]
        width -= m*2
      }

      if (angle < -90 || angle > 90) {
        angle -= 180
      }

      if (width*vars.zoom.behavior.scaleExtent()[0] > 20) {

        d.d3plus_label = {
          "x": x,
          "y": y,
          "translate": translate,
          "w": width,
          "h": 15+vars.labels.padding*2,
          "angle": angle,
          "anchor": "middle",
          "valign": "center",
          "color": vars.edges.color,
          "resize": false,
          "names": [vars.format.value(d[vars.edges.label])],
          "background": 1
        }

      }

    }

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Enter/update/exit the Arrow Marker
  //----------------------------------------------------------------------------
  var markerData = vars.edges.arrows.value ? typeof vars.edges.size == "string"
                  ? [ "default_0", "default_1", "default_2",
                      "highlight_0", "highlight_1", "highlight_2",
                      "focus_0", "focus_1", "focus_2" ]
                  : [ "default", "highlight", "focus" ] : []

  if (typeof vars.edges.size == "string") {
    var buckets = d3plus.util.buckets(vars.edges.scale.range(),4)
      , markerSize = []
    for (var i = 0; i < 3; i++) {
      markerSize.push(buckets[i+1]+(buckets[1]-buckets[0])*(i+2))
    }
  }
  else {
    var m = typeof vars.edges.arrows.value === "number"
          ? vars.edges.arrows.value : 8

    var markerSize = typeof vars.edges.size === "number"
                    ? vars.edges.size/m : m
  }

  var marker = vars.defs.selectAll(".d3plus_edge_marker")
    .data(markerData, String)

  var marker_style = function(path) {
    path
      .attr("d",function(id){

        var depth = id.split("_")

        if (depth.length == 2 && vars.edges.scale) {
          depth = parseInt(depth[1])
          var m = markerSize[depth]
        }
        else {
          var m = markerSize
        }

        if (vars.edges.arrows.direction.value == "target") {
          return "M 0,-"+m/2+" L "+m*.85+",0 L 0,"+m/2+" L 0,-"+m/2
        }
        else {
          return "M 0,-"+m/2+" L -"+m*.85+",0 L 0,"+m/2+" L 0,-"+m/2
        }
      })
      .attr("fill",function(d){

        var type = d.split("_")[0]

        if (type == "default") {
          return vars.edges.color
        }
        else if (type == "focus") {
          return vars.color.focus
        }
        else {
          return vars.color.primary
        }
      })
      .attr("transform","scale("+1/scale+")")
  }

  if (vars.draw.timing) {
    marker.exit().transition().duration(vars.draw.timing)
      .attr("opacity",0)
      .remove()

    marker.select("path").transition().duration(vars.draw.timing)
      .attr("opacity",1)
      .call(marker_style)
  }
  else {
    marker.exit().remove()

    marker.select("path")
      .attr("opacity",1)
      .call(marker_style)
  }

  var opacity = vars.draw.timing ? 0 : 1
  var enter = marker.enter().append("marker")
    .attr("id",function(d){
      return "d3plus_edge_marker_"+d
    })
    .attr("class","d3plus_edge_marker")
    .attr("orient","auto")
    .attr("markerUnits","userSpaceOnUse")
    .style("overflow","visible")
    .append("path")
    .attr("opacity",opacity)
    .attr("vector-effect","non-scaling-stroke")
    .call(marker_style)

  if (vars.draw.timing) {
    enter.transition().duration(vars.draw.timing)
      .attr("opacity",1)
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Bind "edges" data to lines in the "edges" group
  //----------------------------------------------------------------------------
  var strokeBuckets = typeof vars.edges.size == "string"
                    ? d3plus.util.buckets(vars.edges.scale.domain(),4)
                    : null
    , direction = vars.edges.arrows.direction.value

  var line_data = edges.filter(function(l){

    if ( !l.d3plus || (l.d3plus && l.d3plus.spline !== true) ) {

      if (!l.d3plus) {
        l.d3plus = {}
      }

      if (strokeBuckets) {
        var size = l[vars.edges.size]
        l.d3plus.bucket = size < strokeBuckets[1] ? 0
                        : size < strokeBuckets[2] ? 1 : 2
        var marker = markerSize[l.d3plus.bucket]*.85/scale
      }
      else {
        delete l.d3plus.bucket
        var marker = markerSize*.85/scale
      }

      var source = l[vars.edges.source]
        , target = l[vars.edges.target]
        , angle = Math.atan2( source.d3plus.y - target.d3plus.y
                            , source.d3plus.x - target.d3plus.x )
        , sourceRadius = direction == "source" && vars.edges.arrows.value
                       ? source.d3plus.r + marker
                       : source.d3plus.r
        , targetRadius = direction == "target" && vars.edges.arrows.value
                       ? target.d3plus.r + marker
                       : target.d3plus.r
        , sourceOffset = d3plus.util.offset( angle
                                           , sourceRadius
                                           , vars.shape.value )
        , targetOffset = d3plus.util.offset( angle
                                           , targetRadius
                                           , vars.shape.value )

      source.d3plus.dx = source.d3plus.x - sourceOffset.x
      source.d3plus.dy = source.d3plus.y - sourceOffset.y
      target.d3plus.dx = target.d3plus.x + targetOffset.x
      target.d3plus.dy = target.d3plus.y + targetOffset.y

      return true
    }

    return false

  })

  var lines = vars.g.edges.selectAll("g.d3plus_edge_line")
    .data(line_data,function(d){

      if (!d.d3plus) {
        d.d3plus = {}
      }

      d.d3plus.id = d[vars.edges.source][vars.id.value]+"_"+d[vars.edges.target][vars.id.value]

      return d.d3plus.id

    })

  var spline_data = edges.filter(function(l){

    if (l.d3plus && l.d3plus.spline) {

      if (strokeBuckets) {
        var size = l[vars.edges.size]
        l.d3plus.bucket = size < strokeBuckets[1] ? 0
                        : size < strokeBuckets[2] ? 1 : 2
        var marker = markerSize[l.d3plus.bucket]*.85/scale
      }
      else {
        delete l.d3plus.bucket
        var marker = markerSize*.85/scale
      }

      var source = l[vars.edges.source]
        , target = l[vars.edges.target]
        , sourceMod = source.d3plus.depth == 2 ? -marker : marker
        , targetMod = target.d3plus.depth == 2 ? -marker : marker
        , sourceRadius = direction == "source" && vars.edges.arrows.value
                       ? source.d3plus.r + sourceMod
                       : source.d3plus.r
        , targetRadius = direction == "target" && vars.edges.arrows.value
                       ? target.d3plus.r + targetMod
                       : target.d3plus.r

      source.d3plus.dr = sourceRadius
      target.d3plus.dr = targetRadius

      return true

    }

    return false

  })

  var splines = vars.g.edges.selectAll("g.d3plus_edge_path")
    .data(spline_data,function(d){

      if (!d.d3plus) {
        d.d3plus = {}
      }

      d.d3plus.id = d[vars.edges.source][vars.id.value]+"_"+d[vars.edges.target][vars.id.value]

      return d.d3plus.id

    })

  if (vars.draw.timing) {

    lines.exit().transition().duration(vars.draw.timing)
      .attr("opacity",0)
      .remove()

    splines.exit().transition().duration(vars.draw.timing)
      .attr("opacity",0)
      .remove()

    lines.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .transition().duration(vars.draw.timing/2)
      .attr("opacity",0)
      .remove()

    splines.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .transition().duration(vars.draw.timing/2)
      .attr("opacity",0)
      .remove()

    lines.selectAll("line")
      .data(function(d){ return [d] })
      .transition().duration(vars.draw.timing)
        .call(line)
        .call(style)
        .each("end",label)

    splines.selectAll("path")
      .data(function(d){ return [d] })
      .transition().duration(vars.draw.timing)
        .call(spline)
        .call(style)
        .each("end",label)

    lines.enter().append("g")
      .attr("class","d3plus_edge_line")
      .append("line")
      .call(line)
      .call(init)
      .transition().duration(vars.draw.timing)
        .call(style)
        .each("end",label)

    splines.enter().append("g")
      .attr("class","d3plus_edge_path")
      .append("path")
      .call(spline)
      .call(init)
      .transition().duration(vars.draw.timing)
        .call(style)
        .each("end",label)

  }
  else {

    lines.exit().remove()

    splines.exit().remove()

    lines.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .remove()

    splines.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .remove()

    lines.selectAll("line")
      .data(function(d){ return [d] })
      .call(line)
      .call(style)
      .call(label)

    splines.selectAll("path")
      .data(function(d){ return [d] })
      .call(spline)
      .call(style)
      .call(label)

    lines.enter().append("g")
      .attr("class","d3plus_edge_line")
      .append("line")
      .call(line)
      .call(init)
      .call(style)
      .call(label)

    splines.enter().append("g")
      .attr("class","d3plus_edge_path")
      .append("path")
      .call(spline)
      .call(init)
      .call(style)
      .call(label)

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
d3plus.shape.fill = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The position and size of each rectangle on enter and exit.
  //----------------------------------------------------------------------------
  function init(nodes) {

    nodes
      .attr("x",0)
      .attr("y",0)
      .attr("width",0)
      .attr("height",0)

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The position and size of each rectangle on update.
  //----------------------------------------------------------------------------
  function update(nodes,mod) {
    if (!mod) var mod = 0
    nodes
      .attr("x",function(d){
        var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width
        return (-w/2)-(mod/2)
      })
      .attr("y",function(d){
        var h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height
        return (-h/2)-(mod/2)
      })
      .attr("width",function(d){
        var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width
        return w+mod
      })
      .attr("height",function(d){
        var h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height
        return h+mod
      })
      .attr("rx",function(d){
        var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width
        var rounded = ["circle","donut"].indexOf(vars.shape.value) >= 0
        return rounded ? (w+mod)/2 : 0
      })
      .attr("ry",function(d){
        var h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height
        var rounded = ["circle","donut"].indexOf(vars.shape.value) >= 0
        return rounded ? (h+mod)/2 : 0
      })
      .attr("shape-rendering",function(d){
        if (["square"].indexOf(vars.shape.value) >= 0) {
          return vars.shape.rendering.value
        }
        else {
          return "auto"
        }
      })
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // In order to correctly animate each donut's size and arcs, we need to store
  // it's previous values in a lookup object that does not get destroyed when
  // redrawing the visualization.
  //----------------------------------------------------------------------------
  if (!vars.arcs) {
    vars.arcs = {
      "donut": {},
      "active": {},
      "temp": {}
    }
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // This is the main arc function that determines what values to use for each
  // arc angle and radius.
  //----------------------------------------------------------------------------
  var arc = d3.svg.arc()
    .startAngle(0)
    .endAngle(function(d){
      var a = vars.arcs[d.d3plus.shapeType][d.d3plus.id].a
      return a > Math.PI*2 ? Math.PI*2 : a;
    })
    .innerRadius(function(d){
      if (shape == "donut" && !d.d3plus.static) {
        var r = vars.arcs[d.d3plus.shapeType][d.d3plus.id].r
        return r * vars.data.donut.size
      }
      else {
        return 0
      }
    })
    .outerRadius(function(d){
      var r = vars.arcs[d.d3plus.shapeType][d.d3plus.id].r
      if (d.d3plus.shapeType != "donut") return r*2
      else return r
    })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // This is the main "arcTween" function where all of the animation happens
  // for each arc.
  //----------------------------------------------------------------------------
  function size(path,mod,rad,ang) {
    if (!mod) var mod = 0
    if (typeof rad != "number") var rad = undefined
    if (typeof ang != "number") var ang = undefined
    path.attrTween("d", function(d){
      if (rad == undefined) var r = d.d3plus.r ? d.d3plus.r : d3.max([d.d3plus.width,d.d3plus.height])
      else var r = rad
      if (ang == undefined) var a = d.d3plus.a[d.d3plus.shapeType]
      else var a = ang
      if (!vars.arcs[d.d3plus.shapeType][d.d3plus.id]) {
        vars.arcs[d.d3plus.shapeType][d.d3plus.id] = {"r": 0}
        vars.arcs[d.d3plus.shapeType][d.d3plus.id].a = d.d3plus.shapeType == "donut" ? Math.PI * 2 : 0
      }
      var radius = d3.interpolate(vars.arcs[d.d3plus.shapeType][d.d3plus.id].r,r+mod),
          angle = d3.interpolate(vars.arcs[d.d3plus.shapeType][d.d3plus.id].a,a)

      return function(t) {
        vars.arcs[d.d3plus.shapeType][d.d3plus.id].r = radius(t)
        vars.arcs[d.d3plus.shapeType][d.d3plus.id].a = angle(t)
        return arc(d)
      }
    })
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check each data point for active and temp data
  //----------------------------------------------------------------------------
  selection.each(function(d){

    var active = vars.active.value ? d.d3plus[vars.active.value] : d.d3plus.active,
        temp = vars.temp.value ? d.d3plus[vars.temp.value] : d.d3plus.temp,
        total = vars.total.value ? d.d3plus[vars.total.value] : d.d3plus.total,
        group = d3.select(this),
        color = d3plus.variable.color(vars,d)

    var fill_data = [], hatch_data = []

    if (total && d3plus.visualization[vars.type.value].fill) {

      if (temp) {
        var copy = d3plus.util.copy(d)
        copy.d3plus.shapeType = "temp"
        fill_data.push(copy)
        hatch_data = ["temp"]
      }

      if (active && (active < total || temp)) {
        var copy = d3plus.util.copy(d)
        copy.d3plus.shapeType = "active"
        fill_data.push(copy)
      }

    }

    function hatch_lines(l) {
      l
        .attr("stroke",color)
        .attr("stroke-width",1)
        .attr("shape-rendering",vars.shape.rendering.value)
    }

    var pattern = vars.defs.selectAll("pattern#d3plus_hatch_"+d.d3plus.id)
      .data(hatch_data)

    if (vars.draw.timing) {

      pattern.selectAll("rect")
        .transition().duration(vars.draw.timing)
        .style("fill",color)

      pattern.selectAll("line")
        .transition().duration(vars.draw.timing)
        .style("stroke",color)

    }
    else {

      pattern.selectAll("rect").style("fill",color)

      pattern.selectAll("line").style("stroke",color)

    }

    var pattern_enter = pattern.enter().append("pattern")
      .attr("id","d3plus_hatch_"+d.d3plus.id)
      .attr("patternUnits","userSpaceOnUse")
      .attr("x","0")
      .attr("y","0")
      .attr("width","10")
      .attr("height","10")
      .append("g")

    pattern_enter.append("rect")
      .attr("x","0")
      .attr("y","0")
      .attr("width","10")
      .attr("height","10")
      .attr("fill",color)
      .attr("fill-opacity",0.25)

    pattern_enter.append("line")
      .attr("x1","0")
      .attr("x2","10")
      .attr("y1","0")
      .attr("y2","10")
      .call(hatch_lines)

    pattern_enter.append("line")
      .attr("x1","-1")
      .attr("x2","1")
      .attr("y1","9")
      .attr("y2","11")
      .call(hatch_lines)

    pattern_enter.append("line")
      .attr("x1","9")
      .attr("x2","11")
      .attr("y1","-1")
      .attr("y2","1")
      .call(hatch_lines)

    var clip_data = fill_data.length ? [d] : []

    var clip = group.selectAll("#d3plus_clip_"+d.d3plus.id)
      .data(clip_data)

    clip.enter().insert("clipPath",".d3plus_mouse")
      .attr("id","d3plus_clip_"+d.d3plus.id)
      .append("rect")
      .attr("class","d3plus_clipping")
      .call(init)

    if (vars.draw.timing) {
      
      clip.selectAll("rect").transition().duration(vars.draw.timing)
        .call(update)

      clip.exit().transition().delay(vars.draw.timing)
        .remove()

    }
    else {

      clip.selectAll("rect").call(update)

      clip.exit().remove()

    }

    var fills = group.selectAll("path.d3plus_fill")
      .data(fill_data)

    fills.transition().duration(vars.draw.timing)
      .call(d3plus.shape.style,vars)
      .call(size)

    fills.enter().insert("path","rect.d3plus_mouse")
      .attr("class","d3plus_fill")
      .attr("clip-path","url(#d3plus_clip_"+d.d3plus.id+")")
      .transition().duration(0)
        .call(size,0,undefined,0)
        .call(d3plus.shape.style,vars)
        .transition().duration(vars.draw.timing)
          .call(size)

    fills.exit().transition().duration(vars.draw.timing)
      .call(size,0,undefined,0)
      .remove()

  })

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "labels" using svg:text and d3plus.textwrap
//------------------------------------------------------------------------------
d3plus.shape.labels = function( vars , group ) {

  var scale = vars.zoom.behavior.scaleExtent()
    , selection = vars.g[ group ].selectAll("g")

  var opacity = function(elem) {

    elem
      .attr("opacity",function(d){
        if (!d) var d = {"scale": scale[1]}
        var size = parseFloat(d3.select(this).attr("font-size"),10)
        d.visible = size/d.scale*vars.zoom.scale >= 7
        return d.visible ? 1 : 0
      })

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Label Exiting
  //----------------------------------------------------------------------------
  remove = function(text) {

    if (vars.draw.timing) {
      text
        .transition().duration(vars.draw.timing)
        .attr("opacity",0)
        .remove()
    }
    else {
      text.remove()
    }

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Label Styling
  //----------------------------------------------------------------------------
  style = function(text,wrap) {

    function x_pos(t) {

      if ( t.shape === "circle" ) {
        return "0px"
      }

      var align = t.anchor || vars.labels.align,
          tspan = this.tagName.toLowerCase() === "tspan",
          share = tspan ? this.parentNode.className.baseVal == "d3plus_share" : this.className.baseVal == "d3plus_share",
          width = d3.select(this).node().getComputedTextLength()/scale[1]

      if (align == "middle" || share) {
        var pos = t.x-width/2
      }
      else if ((align == "end" && !d3plus.rtl) || (align == "start" && d3plus.rtl)) {
        var pos = t.x+(t.w-t.padding)/2-width
      }
      else {
        var pos = t.x-(t.w-t.padding)/2
      }

      if (tspan) {
        var t_width = this.getComputedTextLength()/scale[1]
        if (align == "middle") {
          if (d3plus.rtl) {
            pos -= (width-t_width)/2
          }
          else {
            pos += (width-t_width)/2
          }
        }
        else if (align == "end") {
          if (d3plus.rtl) {
            pos -= (width-t_width)
          }
          else {
            pos += (width-t_width)
          }
        }
      }

      if (d3plus.rtl) {
        pos += width
      }

      return pos*scale[1]

    }

    function y_pos(t) {

      if (d3.select(this).select("tspan").empty()) {
        return 0
      }
      else {

        var align = vars.labels.align,
            height = d3.select(this).node().getBBox().height/scale[1],
            diff = (parseFloat(d3.select(this).style("font-size"),10)/5)/scale[1]

        if (this.className.baseVal == "d3plus_share") {
          var data = d3.select(this.parentNode).datum()
          var pheight = data.d3plus.r ? data.d3plus.r*2 : data.d3plus.height
          pheight = pheight/scale[1]
          if (align == "end") {
            var y = t.y-pheight/2+diff/2
          }
          else {
            var y = t.y+pheight/2-height-diff/2
          }
        }
        else {

          if (t.shape === "circle" || align === "middle" || t.valign === "center") {
            var y = t.y-height/2-diff/2
          }
          else if (align == "end") {
            var y = t.y+(t.h-t.padding)/2-height+diff/2
          }
          else {
            var y = t.y-(t.h-t.padding)/2-diff
          }

        }

        return y*scale[1]

      }
    }

    text
      .attr("font-weight",vars.labels.font.weight)
      .attr("font-family",vars.labels.font.family.value)
      .attr("text-anchor",function(t){
        return t.shape === "circle" ? "middle" : "start"
      })
      .attr("pointer-events",function(t){
        return t.mouse ? "auto": "none"
      })
      .attr("fill", function(t){

        if ( t.color ) return t.color

        var color = d3plus.shape.color(t.parent,vars)
          , legible = d3plus.color.text(color)
          , opacity = t.text ? 0.15 : 1

        return d3plus.color.mix( color , legible , 0.2 , opacity )

      })
      .attr("x",x_pos)
      .attr("y",y_pos)

    if (wrap) {

      text
        .each(function(t){

          if (t.resize instanceof Array) {
            var min = t.resize[0]
              , max = t.resize[1]
          }

          if (t.text) {


            if ( !(t.resize instanceof Array) ) {
              var size = [ 8 / t.scale , 50 * t.scale ]
                , resize = t.resize
            }
            else {
              var size = t.resize
                , resize = true
            }

            d3plus.textwrap()
              .container( d3.select(this) )
              .height( t.h * t.scale - t.padding )
              .resize( resize )
              .size( size )
              .text( vars.format.value(t.text*100,"share")+"%" )
              .width( t.w * t.scale - t.padding )
              .draw()

          }
          else {

            if (vars.labels.align != "middle") {
              var height = t.h - t.share - t.padding
            }
            else {
              var height = t.h
            }

            if ( !(t.resize instanceof Array) ) {
              var size = [ 8 / t.scale , 40 * t.scale ]
                , resize = t.resize
            }
            else {
              var size = t.resize
                , resize = true
            }

            var shape = t.shape || "square"

            d3plus.textwrap()
              .container( d3.select(this) )
              .height( height * t.scale - t.padding )
              .resize( resize )
              .size( size )
              .shape( shape )
              .text( t.names )
              .width( t.w * t.scale - t.padding )
              .draw()

          }

        })
        .attr("x",x_pos)
        .attr("y",y_pos)

    }

    text
      .attr("transform",function(t){
        var a = t.angle || 0,
            x = t.translate && t.translate.x || 0,
            y = t.translate && t.translate.y || 0

        return "rotate("+a+","+x+","+y+")scale("+1/scale[1]+")"
      })
      .selectAll("tspan")
        .attr("x",x_pos)

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Loop through each selection and analyze the labels
  //----------------------------------------------------------------------------
  if (vars.labels.value) {

    if ( vars.dev.value ) {
      var timerString = "drawing " + group + " labels"
      d3plus.console.time( timerString )
    }

    selection.each(function(d){

      var disabled = d.d3plus && "label" in d.d3plus && !d.d3plus.label,
          stat = d.d3plus && "static" in d.d3plus && d.d3plus.static
          label = d.d3plus_label ? d.d3plus_label : vars.zoom.labels ? vars.zoom.labels[d.d3plus.id] : null,
          share = d.d3plus_share,
          names = label && label.names ? label.names : d3plus.variable.text(vars,d),
          group = label && "group" in label ? label.group : d3.select(this),
          share_size = 0,
          fill = d3plus.visualization[vars.type.value].fill

      if (label) {

        if (["line","area"].indexOf(vars.shape.value) >= 0) {
          var background = true
        }
        else if (d && "d3plus" in d) {
          var active = vars.active.value ? d.d3plus[vars.active.value] : d.d3plus.active,
              temp = vars.temp.value ? d.d3plus[vars.temp.value] : d.d3plus.temp,
              total = vars.total.value ? d.d3plus[vars.total.value] : d.d3plus.total,
              background = (!temp && !active) || (active == total)
        }

      }

      if (!disabled && (background || !fill) && !stat) {

        if (share && d.d3plus.share && vars.labels.align != "middle") {

          share.resize = vars.labels.resize.value === false ? false :
            share && "resize" in share ? share.resize : true

          share.scale = share.resize ? scale[1] : scale[0]

          share.padding = (vars.labels.padding/share.scale)*2

          share.text = d.d3plus.share
          share.parent = d

          var text = group.selectAll("text#d3plus_share_"+d.d3plus.id)
            .data([share],function(t){
              return t.w+""+t.h+""+t.text
            })

          if (vars.draw.timing) {

            text
              .transition().duration(vars.draw.timing/2)
              .call(style)

            text.enter().append("text")
              .attr("id","d3plus_share_"+d.d3plus.id)
              .attr("class","d3plus_share")
              .attr("opacity",0)
              .call(style,true)
              .transition().duration(vars.draw.timing/2)
              .delay(vars.draw.timing/2)
              .attr("opacity",1)

          }
          else {

            text
              .attr("opacity",1)
              .call(style)

            text.enter().append("text")
              .attr("id","d3plus_share_"+d.d3plus.id)
              .attr("class","d3plus_share")
              .attr("opacity",1)
              .call(style,true)

          }

          share_size = text.node().getBBox().height

          text.exit().call(remove)

        }
        else {
          group.selectAll("text.d3plus_share")
            .call(remove)
        }

        if (label) {

          label.resize = vars.labels.resize.value === false ? false :
            label && "resize" in label ? label.resize : true

          label.scale = label.resize ? scale[1] : scale[0]

          label.padding = (vars.labels.padding/label.scale)*2

        }

        if (label && label.w*label.scale-label.padding >= 25 && label.h*label.scale-label.padding >= 15 && names.length) {

          label.names = names

          label.share = share_size
          label.parent = d

          var text = group.selectAll("text#d3plus_label_"+d.d3plus.id)
            .data([label],function(t){
              if (!t) return false
              return t.w+"_"+t.h+"_"+t.x+"_"+t.y+"_"+t.names.join("_")
            })
            , fontSize = label.resize ? undefined
                       : vars.labels.font.size * label.scale

          if ( vars.draw.timing ) {

            text
              .transition().duration(vars.draw.timing/2)
              .call(style)

            text.enter().append("text")
              .attr("font-size",fontSize)
              .attr("id","d3plus_label_"+d.d3plus.id)
              .attr("class","d3plus_label")
              .attr("opacity",0)
              .call(style,true)
              .transition().duration(vars.draw.timing/2)
              .delay(vars.draw.timing/2)
              .call(opacity)

          }
          else {

            text
              .attr("opacity",1)
              .call(style)

            text.enter().append("text")
              .attr("font-size",fontSize)
              .attr("id","d3plus_label_"+d.d3plus.id)
              .attr("class","d3plus_label")
              .call(style,true)
              .call(opacity)

          }

          text.exit().call(remove)

          if (text.size() == 0 || text.html() == "") {
            delete d.d3plus_label
            group.selectAll("text.d3plus_label, rect.d3plus_label_bg")
              .call(remove)
          }
          else {

            if (label.background) {

              var background_data = ["background"]

              var bounds = text.node().getBBox()

              bounds.width += vars.labels.padding*scale[0]
              bounds.height += vars.labels.padding*scale[0]
              bounds.x -= (vars.labels.padding*scale[0])/2
              bounds.y -= (vars.labels.padding*scale[0])/2

            }
            else {
              var background_data = [],
                  bounds = {}
            }

            var bg = group.selectAll("rect#d3plus_label_bg_"+d.d3plus.id)
                       .data(background_data)
              , bg_opacity = typeof label.background === "number"
                           ? label.background : 0.6

            function bg_style(elem) {

              var color = vars.background.value === "none"
                        ? "#ffffff" : vars.background.value
                , fill = typeof label.background === "string"
                       ? label.background : color
                , a = label.angle || 0
                , x = label.translate ? bounds.x+bounds.width/2 : 0
                , y = label.translate ? bounds.y+bounds.height/2 : 0
                , transform = "scale("+1/scale[1]+")rotate("+a+","+x+","+y+")"

              elem
                .attr("fill",fill)
                .attr(bounds)
                .attr("transform",transform)

            }

            if (vars.draw.timing) {

              bg.exit().transition().duration(vars.draw.timing)
                .attr("opacity",0)
                .remove()

              bg.transition().duration(vars.draw.timing)
                .attr("opacity",bg_opacity)
                .call(bg_style)

              bg.enter().insert("rect",".d3plus_label")
                .attr("id","d3plus_label_bg_"+d.d3plus.id)
                .attr("class","d3plus_label_bg")
                .attr("opacity",0)
                .call(bg_style)
                .transition().duration(vars.draw.timing)
                  .attr("opacity",bg_opacity)

            }
            else {

              bg.exit().remove()

              bg.enter().insert("rect",".d3plus_label")
                .attr("id","d3plus_label_bg_"+d.d3plus.id)
                .attr("class","d3plus_label_bg")

              bg.attr("opacity",bg_opacity)
                .call(bg_style)

            }

          }

        }
        else {
          delete d.d3plus_label
          group.selectAll("text#d3plus_label_"+d.d3plus.id+", rect#d3plus_label_bg_"+d.d3plus.id)
            .call(remove)
        }

      }
      else {
        delete d.d3plus_label
        group.selectAll("text#d3plus_label_"+d.d3plus.id+", rect#d3plus_label_bg_"+d.d3plus.id)
          .call(remove)
      }
    })

    if ( vars.dev.value ) d3plus.console.timeEnd( timerString )

  }
  else {

    if ( vars.dev.value ) {
      var timerString = "removing " + group + " labels"
      d3plus.console.time( timerString )
    }

    selection.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .call(remove)

    vars.g.labels.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .call(remove)

    if ( vars.dev.value ) d3plus.console.timeEnd( timerString )

  }
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "line" shapes using svg:line
//------------------------------------------------------------------------------
d3plus.shape.line = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The D3 line function that determines what variables to use for x and y
  // positioning, as well as line interpolation defined by the user.
  //----------------------------------------------------------------------------
  var line = d3.svg.line()
    .x(function(d){ return d.d3plus.x; })
    .y(function(d){ return d.d3plus.y; })
    .interpolate(vars.shape.interpolate.value)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Divide each line into it's segments. We do this so that there can be gaps
  // in the line and mouseover.
  //
  // Then, create new data group from values to become small nodes at each
  // point on the line.
  //----------------------------------------------------------------------------

  var hitarea = vars.data.stroke.width
  if (hitarea < 30) {
    hitarea = 30
  }

  selection.each(function(d){

    var step = false,
        segments = [],
        nodes = [],
        temp = d3plus.util.copy(d),
        group = d3.select(this)

    temp.values = []
    d.values.forEach(function(v,i,arr){
      nodes.push(v)
      var k = v[vars[vars.continuous_axis].value],
          index = vars.tickValues[vars.continuous_axis].indexOf(k)

      if (step === false) {
        step = index
      }

      if ( i + step === index ) {
        temp.values.push(v)
        temp.key += "_"+segments.length
      }
      else {
        if (i > 0) {
          segments.push(temp)
          temp = d3plus.util.copy(d)
          temp.values = []
        }
        temp.values.push(v)
        temp.key += "_"+segments.length
        step++
      }

      if ( i === arr.length - 1 ) {
        segments.push(temp)
      }

    })

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Bind segment data to "paths"
    //--------------------------------------------------------------------------
    var paths = group.selectAll("path.d3plus_line")
      .data(segments, function(d){
        return d.key
      })

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Bind node data to "rects"
    //--------------------------------------------------------------------------
    var rects = group.selectAll("rect.d3plus_anchor")
      .data(nodes, function(d){
        return d.d3plus.id
      })

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // "paths" and "rects" Enter/Update
    //--------------------------------------------------------------------------
    if (vars.draw.timing) {

      paths.transition().duration(vars.draw.timing)
        .attr("d",function(d){ return line(d.values) })
        .call(d3plus.shape.style,vars)

      paths.enter().append("path")
        .attr("class","d3plus_line")
        .attr("d",function(d){ return line(d.values) })
        .call(d3plus.shape.style,vars)

      rects.enter().append("rect")
        .attr("class","d3plus_anchor")
        .attr("id",function(d){
          return d.d3plus.id
        })
        .call(init)
        .call(d3plus.shape.style,vars)

      rects.transition().duration(vars.draw.timing)
        .call(update)
        .call(d3plus.shape.style,vars)

      rects.exit().transition().duration(vars.draw.timing)
        .call(init)
        .remove()

    }
    else {

      paths.enter().append("path")
        .attr("class","d3plus_line")

      paths
        .attr("d",function(d){ return line(d.values) })
        .call(d3plus.shape.style,vars)

      rects.enter().append("rect")
        .attr("class","d3plus_anchor")
        .attr("id",function(d){
          return d.d3plus.id
        })

      rects.call(update)
        .call(d3plus.shape.style,vars)

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create mouse event lines
    //--------------------------------------------------------------------------
    var mouse = group.selectAll("path.d3plus_mouse")
      .data(segments, function(d){
        return d.key
      })

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Mouse "paths" Enter
    //--------------------------------------------------------------------------
    mouse.enter().append("path")
      .attr("class","d3plus_mouse")
      .attr("d",function(l){ return line(l.values) })
      .style("stroke","black")
      .style("stroke-width",hitarea)
      .style("fill","none")
      .style("stroke-linecap","round")
      .attr("opacity",0)

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Mouse "paths" Update
    //--------------------------------------------------------------------------
    mouse
      .on(d3plus.evt.over,function(m){

        if (!vars.draw.frozen) {

          d3.select(this.parentNode).selectAll("path.d3plus_line")
            .transition().duration(vars.timing.mouseevents)
            .style("stroke-width",vars.data.stroke.width*2)

          d3.select(this.parentNode).selectAll("rect")
            .transition().duration(vars.timing.mouseevents)
            .style("stroke-width",vars.data.stroke.width*2)
            .call(update,2)

        }

      })
      .on(d3plus.evt.out,function(d){

        if (!vars.draw.frozen) {

          d3.select(this.parentNode).selectAll("path.d3plus_line")
            .transition().duration(vars.timing.mouseevents)
            .style("stroke-width",vars.data.stroke.width)

          d3.select(this.parentNode).selectAll("rect")
            .transition().duration(vars.timing.mouseevents)
            .style("stroke-width",vars.data.stroke.width)
            .call(update)

        }

      })

    if (vars.draw.timing) {

      mouse.transition().duration(vars.draw.timing)
        .attr("d",function(l){ return line(l.values) })
        .style("stroke-width",hitarea)

    }
    else {

      mouse.attr("d",function(l){ return line(l.values) })
        .style("stroke-width",hitarea)

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Mouse "paths" Exit
    //--------------------------------------------------------------------------
    mouse.exit().remove()

  })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The position and size of each anchor point on enter and exit.
  //----------------------------------------------------------------------------
  function init(n) {

    n
      .attr("x",function(d){
        return d.d3plus.x
      })
      .attr("y",function(d){
        return d.d3plus.y
      })
      .attr("width",0)
      .attr("height",0)

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The position and size of each anchor point on update.
  //----------------------------------------------------------------------------
  function update(n,mod) {

    if (!mod) var mod = 0

    n
      .attr("x",function(d){
        var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width
        return d.d3plus.x - ((w/2)+(mod/2))
      })
      .attr("y",function(d){
        var h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height
        return d.d3plus.y - ((h/2)+(mod/2))
      })
      .attr("width",function(d){
        var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width
        return w+mod
      })
      .attr("height",function(d){
        var h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height
        return h+mod
      })
      .attr("rx",function(d){
        var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width
        return (w+mod)/2
      })
      .attr("ry",function(d){
        var h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height
        return (h+mod)/2
      })

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
d3plus.shape.rect = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculate label position and pass data from parent.
  //----------------------------------------------------------------------------
  function data(d) {

    if (vars.labels.value && !d.d3plus.label) {

      d.d3plus_label = {
        "w": 0,
        "h": 0,
        "x": 0,
        "y": 0
      }

      var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width,
          h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height

      d.d3plus_share = {
        "w": w,
        "h": d3.max([25,h/3]),
        "x": 0,
        "y": 0
      }

      d.d3plus_label.w = w
      d.d3plus_label.h = h

      d.d3plus_label.shape = vars.shape.value === "circle" ? "circle" : "square"

    }
    else if (d.d3plus.label) {
      d.d3plus_label = d.d3plus.label
    }

    return [d];

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The position and size of each rectangle on enter and exit.
  //----------------------------------------------------------------------------
  function init(nodes) {

    nodes
      .attr("x",0)
      .attr("y",0)
      .attr("width",0)
      .attr("height",0)

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The position and size of each rectangle on update.
  //----------------------------------------------------------------------------
  function update(nodes) {

    nodes
      .attr("x",function(d){
        var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width
        return -w/2
      })
      .attr("y",function(d){
        var h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height
        return -h/2
      })
      .attr("width",function(d){
        var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width
        return w
      })
      .attr("height",function(d){
        var h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height
        return h
      })
      .attr("rx",function(d){
        var rounded = vars.shape.value == "circle"
        var w = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.width
        return rounded ? (w+2)/2 : 0
      })
      .attr("ry",function(d){
        var rounded = vars.shape.value == "circle"
        var h = d.d3plus.r ? d.d3plus.r*2 : d.d3plus.height
        return rounded ? (h+2)/2 : 0
      })
      .attr("transform",function(d){
        if ("rotate" in d.d3plus) {
          return "rotate("+d.d3plus.rotate+")"
        }
        return ""
      })
      .attr("shape-rendering",function(d){
        if (vars.shape.value == "square" && !("rotate" in d.d3plus)) {
          return vars.shape.rendering.value
        }
        else {
          return "auto"
        }
      })

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "rects" Enter
  //----------------------------------------------------------------------------
  if (vars.draw.timing) {
    enter.append("rect")
      .attr("class","d3plus_data")
      .call(init)
      .call(d3plus.shape.style,vars)
  }
  else {
    enter.append("rect")
      .attr("class","d3plus_data")
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "rects" Update
  //----------------------------------------------------------------------------
  if (vars.draw.timing) {
    selection.selectAll("rect.d3plus_data")
      .data(data)
      .transition().duration(vars.draw.timing)
        .call(update)
        .call(d3plus.shape.style,vars)
  }
  else {
    selection.selectAll("rect.d3plus_data")
      .data(data)
      .call(update)
      .call(d3plus.shape.style,vars)
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "rects" Exit
  //----------------------------------------------------------------------------
  if (vars.draw.timing) {
    exit.selectAll("rect.d3plus_data")
      .transition().duration(vars.draw.timing)
      .call(init)
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Fill style for all shapes
//-------------------------------------------------------------------
d3plus.shape.style = function(nodes,vars) {

  nodes
    .attr("fill",function(d){

      if (d.d3plus && d.d3plus.spline) {
        return "none"
      }
      else {
        return d3plus.shape.color(d,vars)
      }

    })
    .style("stroke", function(d){
      if (d.values) {
        var color = d3plus.shape.color(d.values[0],vars)
      }
      else {
        var color = d3plus.shape.color(d,vars)
      }
      return d3.rgb(color).darker(0.5)
    })
    .style("stroke-width",vars.data.stroke.width)
    .attr("opacity",vars.data.opacity)
    .attr("vector-effect","non-scaling-stroke")

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Bubbles
//------------------------------------------------------------------------------
d3plus.visualization.bubbles = function(vars) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Test for labels
  //----------------------------------------------------------------------------
  var label_height = vars.labels.value && !vars.small ? 50 : 0

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Sort Data
  //----------------------------------------------------------------------------
  d3plus.array.sort( vars.data.app , vars.order.value || vars.size.value
                   , vars.order.sort.value , vars.color.value , vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculate rows and columns
  //----------------------------------------------------------------------------
  var dataLength = vars.data.app.length

  if (dataLength < 4) {

    var columns = dataLength
      , rows    = 1
  }
  else {

    var screenRatio = vars.width.viz / vars.height.viz
      , columns     = Math.ceil( Math.sqrt( dataLength * screenRatio ) )
      , rows        = Math.ceil( Math.sqrt( dataLength / screenRatio ) )

  }

  if (dataLength > 0) {

    while ((rows-1)*columns >= vars.data.app.length) {
      rows--
    }

  }

  var column_width = vars.width.viz/columns,
      column_height = vars.height.viz/rows

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Define size scale
  //----------------------------------------------------------------------------
  var domain_min = d3.min(vars.data.app, function(d){
    if (!vars.size.value) return 0
    return d3plus.variable.value(vars,d,vars.size.value,null,"min")
  })

  var domain_max = d3.max(vars.data.app, function(d){
    if (!vars.size.value) return 0
    return d3plus.variable.value(vars,d,vars.size.value)
  })

  var padding = 5

  var size_min = 20
  var size_max = (d3.min([column_width,column_height])/2)-(padding*2)
  size_max -= label_height

  var size = vars.size.scale.value
    .domain([domain_min,domain_max])
    .rangeRound([size_min,size_max])

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculate bubble packing
  //----------------------------------------------------------------------------
  var pack = d3.layout.pack()
    .size([column_width-padding*2,column_height-padding*2-label_height])
    .value(function(d) {
      if (!vars.size.value) return 0
      return d3plus.variable.value(vars,d,vars.size.value)
    })
    .padding(padding)
    .radius(function(d){
      return size(d)
    })

  var data = []

  var row = 0
  vars.data.app.forEach(function(d,i){

    var temp = pack.nodes(d)

    var xoffset = (column_width*i) % vars.width.viz,
        yoffset = column_height*row

    temp.forEach(function(t){
      t.xoffset = xoffset
      t.yoffset = yoffset+label_height
      if (t.depth < vars.depth.value) {
        t.d3plus.static = true
      }
      else {
        t.d3plus.static = false
      }
      if (temp.length == 1) {
        t.d3plus.label = false
      }
      else {
        t.d3plus.label = true
      }
    })

    data = data.concat(temp)

    if ((i+1) % columns == 0) {
      row++
    }

  })

  var downscale = size_max/d3.max(data,function(d){ return d.r })

  data.forEach(function(d){
    d.x = ((d.x-column_width/2)*downscale)+column_width/2
    d.d3plus.x = d.x+d.xoffset
    d.y = ((d.y-column_height/2)*downscale)+column_height/2
    d.d3plus.y = d.y+d.yoffset
    d.r = d.r*downscale
    d.d3plus.r = d.r
  })

  data.sort(function( a , b ){
    return a.depth - b.depth
  })

  var label_data = data.filter(function(d){
    return d.depth == 0
  })

  var labels = vars.group.selectAll("text.d3plus_bubble_label")
    .data(label_data,function(d){
      if (!d.d3plus.label_height) d.d3plus.label_height = 0
      return d[vars.id.nesting[d.depth]]
    })

  function label_style(l) {
    l
      .attr("x",function(d){
        return d.d3plus.x
      })
      .attr("y",function(d){
        return d.d3plus.y-d.r-d.d3plus.label_height-padding
      })
      .attr("text-anchor","middle")
      .attr("font-weight",vars.labels.font.weight)
      .attr("font-family",vars.labels.font.family.value)
      .attr("font-size","12px")
      .style("fill",function(d){
        var color = d3plus.variable.color(vars,d)
        return d3plus.color.legible(color)
      })
      .each(function(d){
        if (d.r > 10 && label_height > 10) {

          var names = d3plus.variable.text(vars,d,d.depth)

          d3plus.textwrap()
            .container( d3.select(this) )
            .height( label_height )
            .text( names )
            .width( column_width - padding * 2 )
            .draw()

        }
      })
      .attr("y",function(d){
        d.d3plus.label_height = d3.select(this).node().getBBox().height
        return d.d3plus.y-d.r-d.d3plus.label_height-padding
      })
      .selectAll("tspan")
        .attr("x",function(d){
          return d.d3plus.x
        })
  }

  labels.enter().append("text")
    .attr("class","d3plus_bubble_label")
    .call(label_style)
    .attr("opacity",0)

  labels.transition().duration(vars.draw.timing)
    .call(label_style)
    .attr("opacity",1)

  labels.exit()
    .attr("opacity",0)
    .remove()

  return data

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Visualization Settings and Helper Functions
//------------------------------------------------------------------------------
d3plus.visualization.bubbles.fill         = true
d3plus.visualization.bubbles.requirements = [ "data" ]
d3plus.visualization.bubbles.scale        = 1.05
d3plus.visualization.bubbles.shapes       = [ "circle" , "donut" ]
d3plus.visualization.bubbles.tooltip      = "static"

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Chart
//------------------------------------------------------------------------------
d3plus.visualization.chart = function(vars) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculate size and position of graph
  //-------------------------------------------------------------------
  if (vars.small) {
    var graph = {"margin": {"top": 0, "right": 0, "bottom": 0, "left": 0}}
  }
  else {
    var graph = {"margin": {"top": 10, "right": 10, "bottom": 40, "left": 40}}
  }
  graph.width = vars.width.viz-graph.margin.left-graph.margin.right
  graph.height = vars.height.viz-graph.margin.top-graph.margin.bottom

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If there is data, run the needed calculations
  //-------------------------------------------------------------------
  if (vars.data.app.length) {

    if (!vars.tickValues) vars.tickValues = {}

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Determine X and Y axis
    //-------------------------------------------------------------------
    vars.continuous_axis = null
    vars.opp_axis = null
    vars.stacked_axis = null

    vars.axes.values.forEach(function(axis){

      if (vars[axis].stacked.value) {
        vars.stacked_axis = axis
      }
      if (!vars.continuous_axis && vars[axis].scale.value == "continuous") {
        vars.continuous_axis = axis
        vars.opp_axis = axis == "x" ? "y" : "x"
      }

      if (vars.data.changed || vars.depth.changed || !vars[axis+"_range"] || vars.time.fixed.value) {

        if ( vars.dev.value ) d3plus.console.time("determining "+axis+"-axis")
        if (vars[axis].scale.value == "share") {
          vars[axis+"_range"] = [0,1]
          vars.tickValues[axis] = d3plus.util.buckets([0,1],11)
          vars.stacked_axis = axis
        }
        else if (vars[axis].stacked.value) {
          if (vars.time.fixed.value) {
            var range_data = vars.data.app
          }
          else {
            var range_data = vars.data.value
          }
          var xaxis_sums = d3.nest()
            .key(function(d){return d[vars.x.value] })
            .rollup(function(leaves){
              return d3.sum(leaves, function(d){
                return parseFloat(d3plus.variable.value(vars,d,vars[axis].value))
              })
            })
            .entries(range_data)

          vars[axis+"_range"] = [0,d3.max(xaxis_sums, function(d){ return d.values; })]
        }
        else if (vars[axis].domain instanceof Array) {
          vars[axis+"_range"] = vars[axis].domain
          vars.tickValues[axis] = d3plus.util.uniques(vars.data.app,vars[axis].value)
          vars.tickValues[axis] = vars.tickValues[axis].filter(function(t){
            return t >= vars[axis+"_range"][0] && t <= vars[axis+"_range"][1]
          })
        }
        else if (vars.time.fixed.value) {
          vars[axis+"_range"] = d3.extent(vars.data.app,function(d){
            return parseFloat(d3plus.variable.value(vars,d,vars[axis].value))
          })
          vars.tickValues[axis] = d3plus.util.uniques(vars.data.app,vars[axis].value)
        }
        else {
          var all_depths = []
          for (id in vars.id.nesting) {
            all_depths = all_depths.concat(vars.data.grouped[vars.id.nesting[id]].all)
          }
          vars[axis+"_range"] = d3.extent(all_depths,function(d){
            return parseFloat(d3plus.variable.value(vars,d,vars[axis].value))
          })
          vars.tickValues[axis] = d3plus.util.uniques(vars.data.value,vars[axis].value)
        }

        // add padding to axis if there is only 1 value
        if (vars[axis+"_range"][0] == vars[axis+"_range"][1]) {
          vars[axis+"_range"][0] -= 1
          vars[axis+"_range"][1] += 1
        }

        // reverse Y axis
        if (axis == "y") vars.y_range = vars.y_range.reverse()

        if ( vars.dev.value ) d3plus.console.timeEnd("determining "+axis+"-axis")
      }
      else if (!vars[axis+"_range"]) {
        vars[axis+"_range"] = [-1,1]
      }

    })

    //===================================================================

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Mirror axes, if applicable
    //-------------------------------------------------------------------
    if (vars.axes.mirror.value) {
      var domains = vars.y_range.concat(vars.x_range)
      vars.x_range = d3.extent(domains)
      vars.y_range = d3.extent(domains).reverse()
    }

    //===================================================================

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Filter data to only include values within the axes
    //-------------------------------------------------------------------
    if ( vars.dev.value ) d3plus.console.time("removing data outside of axes")
    var old_length = vars.data.app.length
    if (vars.y.scale.value == "share") {
      var data = vars.data.app
    }
    else {
      var data = vars.data.app.filter(function(d){
        var val = parseFloat(d3plus.variable.value(vars,d,vars.y.value))
        var y_include = val !== null && val <= vars.y_range[0] && val >= vars.y_range[1]
        if (y_include) {
          var val = parseFloat(d3plus.variable.value(vars,d,vars.x.value))
          return val !== null && val >= vars.x_range[0] && val <= vars.x_range[1]
        }
        else return false
      })
    }

    if ( vars.dev.value ) d3plus.console.timeEnd("removing data outside of axes")
    var removed = old_length - data.length
    if (removed && vars.dev.value) d3plus.console.log("removed "+removed+" nodes")

    //===================================================================

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Determine size of nodes
    //-------------------------------------------------------------------

    if (data) {

      if ( vars.dev.value ) d3plus.console.time("determining size scale")
      if (vars.size.value) {
        if (vars.time.fixed.value) {
          var size_domain = d3.extent(vars.data.app,function(d){
            var val = d3plus.variable.value(vars,d,vars.size.value)
            return val == 0 ? null : val
          })
        }
        else {
          var all_depths = []
          for (id in vars.id.nesting) {
            all_depths = all_depths.concat(vars.data.grouped[vars.id.nesting[id]].all)
          }
          var size_domain = d3.extent(all_depths,function(d){
            var val = d3plus.variable.value(vars,d,vars.size.value)
            return val == 0 ? null : val
          })
        }
        if (!size_domain[0] || !size_domain[1]) size_domain = [0,0]
      }
      else {
        var size_domain = [0,0]
      }

      var max_size = Math.floor(d3.max([d3.min([graph.width,graph.height])/15,10])),
          min_size = 10

      if (size_domain[0] == size_domain[1]) var min_size = max_size

      var size_range = [min_size,max_size]

      var radius = vars.size.scale.value
        .domain(size_domain)
        .rangeRound(size_range)

      if ( vars.dev.value ) d3plus.console.timeEnd("determining size scale")

    }

    //===================================================================

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create axis scales and add buffer if necessary
    //-------------------------------------------------------------------

    vars.axes.values.forEach(function(axis){

      // Create Axes
      var range_max = axis == "x" ? graph.width : graph.height

      if (["continuous","share"].indexOf(vars[axis].scale.value) >= 0) {
        var s = "linear"
      }
      else {
        var s = vars[axis].scale.value
      }

      vars[axis+"_scale"] = d3.scale[s]()
        .domain(vars[axis+"_range"])
        .rangeRound([0,range_max])

      // set buffer room (take into account largest size var)
      if (["square","circle","donut"].indexOf(vars.shape.value) >= 0 &&
          ["share"].indexOf(vars[axis].scale.value) < 0) {

        var scale = vars[axis+"_scale"]
          , largest_size = radius.range()[1]*2
          , domainHigh = scale.invert(-largest_size)
          , domainLow= scale.invert(range_max+largest_size)

        vars[axis+"_scale"].domain([domainHigh,domainLow])

      }

      var orient = axis == "x" ? "bottom" : "left"

      vars[axis+"_axis"] = d3.svg.axis()
        .tickSize(vars.axes.ticks.size)
        .tickPadding(5)
        .orient(orient)
        .scale(vars[axis+"_scale"])
        .tickFormat(function(d, i) {

          var visible = true
          if (vars[axis].value == vars.time.value && d % 1 != 0) {
            visible = false
          }

          if (((vars[axis].scale.value == "log" && d.toString().charAt(0) == "1")
              || vars[axis].scale.value != "log") && visible) {

            if (vars[axis].scale.value == "share") {
              var text = d*100+"%"
            }
            else {
              var text = vars.format.value(d,vars[axis].value);
            }

            d3.select(this)
              .style("font-size",vars.axes.ticks.font.size)
              .style("fill",vars.axes.ticks.font.color)
              .attr("font-family",vars.axes.ticks.font.family.value)
              .attr("font-weight",vars.axes.ticks.font.weight)
              .text(text)

            if (axis == "x") {
              var w = this.getBBox().width,
                  h = this.getBBox().height
              d3.select(this).attr("transform","translate(18,8)rotate(70)");
              var height = Math.ceil((Math.cos(25)*w)+5);
              if (height > graph.yoffset && !vars.small) {
                graph.yoffset = height;
              }
              var width = Math.ceil((Math.cos(25)*h)+5);
              if (width > graph.rightoffset && !vars.small) {
                graph.rightoffset = width;
              }
            }
            else {
              var width = this.getBBox().width;
              if (width > graph.offset && !vars.small) {
                graph.offset = width;
              }
            }

          }
          else {
            var text = null
          }

          return text;

        });

      if (vars[axis].scale.value == "continuous" && vars.tickValues[axis]) {
        // var ticks = d3.extent(vars.tickValues[axis])
        // vars.tickValues[axis] = d3.range(ticks[0],ticks[1])
        // vars.tickValues[axis].push(ticks[1])
        vars[axis+"_axis"].tickValues(vars.tickValues[axis])
      }

    })

  }

  if (!data) {
    var data = []
  }

  // Function for Tick Styling
  function tick_style(t,axis) {
    t
      .attr("stroke",vars.axes.ticks.color)
      .attr("stroke-width",vars.axes.ticks.width)
      .attr("shape-rendering",vars.shape.rendering.value)
      .style("opacity",function(d){
        var lighter = vars[axis].scale.value == "log" && d.toString().charAt(0) != "1"
        return lighter ? 0.25 : 1
      })
  }

  // Function for Tick Styling
  function tick_position(t,axis) {
    t
      .attr("x1",function(d){
        return axis == "x" ? vars.x_scale(d) : 0
      })
      .attr("x2",function(d){
        return axis == "x" ? vars.x_scale(d) : graph.width
      })
      .attr("y1",function(d){
        return axis == "y" ? vars.y_scale(d) : 0
      })
      .attr("y2",function(d){
        return axis == "y" ? vars.y_scale(d) : graph.height
      })
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Enter SVG Elements
  //-------------------------------------------------------------------

  // Enter Background Plane
  var plane = vars.group.selectAll("g#plane").data(["plane"])
  plane.enter().append("g")
    .attr("id","plane")
    .attr("transform", "translate(" + graph.margin.left + "," + graph.margin.top + ")")

  // Enter Background Rectangle
  var bg = plane.selectAll("rect#background").data(["background"])
  bg.enter().append("rect")
    .attr("id","background")
    .attr("x",0)
    .attr("y",0)
    .attr("width", graph.width)
    .attr("height", graph.height)
    .attr("stroke-width",1)
    .attr("stroke","#ccc")
      .attr("shape-rendering",vars.shape.rendering.value)
    .style("fill","#fafafa")

  // Enter Background Mirror
  var mirror = plane.selectAll("path#mirror").data(["mirror"])
  mirror.enter().append("path")
    .attr("id","mirror")
    .attr("fill","#000")
    .attr("fill-opacity",0.03)
    .attr("stroke-width",1)
    .attr("stroke","#ccc")
    .attr("stroke-dasharray","10,10")
    .attr("opacity",0)

  // Enter Axes
  var axes = vars.group.selectAll("g#axes").data(["axes"])
  axes.enter().append("g")
    .attr("id","axes")

  // Enter X Axis Grid
  var xgrid = plane.selectAll("g#xgrid").data(["xgrid"])
  xgrid.enter().append("g")
    .attr("id","xgrid")

  // Enter Y Axis Grid
  var ygrid = plane.selectAll("g#ygrid").data(["ygrid"])
  ygrid.enter().append("g")
    .attr("id","ygrid")

  // Enter X Axis Scale
  var xaxis = plane.selectAll("g#xaxis").data(["xaxis"])
  xaxis.enter().append("g")
    .attr("id","xaxis")
    .attr("transform", "translate(0," + graph.height + ")")

  // Enter Y Axis Scale
  var yaxis = plane.selectAll("g#yaxis").data(["yaxis"])
  yaxis.enter().append("g")
    .attr("id","yaxis")

  // Enter X Axis Label
  var xlabel = axes.selectAll("text#xlabel").data(vars.small ? [] : ["xlabel"])
  xlabel.enter().append("text")
    .attr("id", "xlabel")
    .attr("x", vars.width.viz/2)
    .attr("y", vars.height.viz-10)
    .text(vars.format.value(vars.x.value))
    .attr("font-family",vars.labels.font.family.value)
    .attr("font-weight",vars.labels.font.weight)
    .attr("font-size",vars.labels.font.size)
    .attr("fill",vars.labels.font.color)
    .attr("text-anchor",vars.labels.font.align)
  xlabel.exit().remove()

  // Enter Y Axis Label
  var ylabel = axes.selectAll("text#ylabel").data(vars.small ? [] : ["ylabel"])
  ylabel.enter().append("text")
    .attr("id", "ylabel")
    .attr("y", 15)
    .attr("x", -(graph.height/2+graph.margin.top))
    .text(vars.format.value(vars.y.value))
    .attr("transform","rotate(-90)")
    .attr("font-family",vars.labels.font.family.value)
    .attr("font-weight",vars.labels.font.weight)
    .attr("font-size",vars.labels.font.size)
    .attr("fill",vars.labels.font.color)
    .attr("text-anchor",vars.labels.font.align)
  ylabel.exit().remove()

  // Enter Mouse Event Group
  var mouseevents = vars.group.selectAll("g#mouseevents").data(["mouseevents"])
  mouseevents.enter().append("g")
    .attr("id","mouseevents")

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculate Spacing Needed for Axes Labels
  //-------------------------------------------------------------------
  graph.offset = 0
  yaxis.call(vars.y_axis)
    .selectAll("line")
    .call(tick_style,"y")

  graph.margin.left += graph.offset
  graph.width -= graph.offset
  vars.x_scale.rangeRound([0,graph.width])

  graph.yoffset = 0
  graph.rightoffset = 0
  xaxis.call(vars.x_axis)
    .selectAll("line")
    .call(tick_style,"x")

  graph.height -= graph.yoffset
  graph.width -= graph.rightoffset
  vars.x_scale.rangeRound([0,graph.width])
  vars.y_scale.rangeRound([0,graph.height])
  yaxis.call(vars.y_axis)
  xaxis.call(vars.x_axis)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Update SVG Elements
  //-------------------------------------------------------------------

  // Update Plane Group
  plane.transition().duration(vars.draw.timing)
    .attr("transform", "translate(" + graph.margin.left + "," + graph.margin.top + ")")

  // Update Plane Background
  bg.attr("width", graph.width)
    .attr("height", graph.height)

  // Update Mirror Triangle
  mirror.transition().duration(vars.draw.timing)
    .attr("opacity",function(){
      return vars.axes.mirror.value ? 1 : 0
    })
    .attr("d",function(){
      var w = graph.width, h = graph.height
      return "M "+w+" "+h+" L 0 "+h+" L "+w+" 0 Z"
    })

  // Update Y Axis
  yaxis.transition().duration(vars.draw.timing)
    .call(vars.y_axis.scale(vars.y_scale))

  yaxis.selectAll("line").transition().duration(vars.draw.timing)
      .call(tick_style,"y")

  yaxis.selectAll("path").style("fill","none")

  // Update X Axis
  xaxis.transition().duration(vars.draw.timing)
    .attr("transform", "translate(0," + graph.height + ")")
    .call(vars.x_axis.scale(vars.x_scale))
    .selectAll("g.tick").select("text")
      .style("text-anchor","start")

  xaxis.selectAll("line").transition().duration(vars.draw.timing)
      .call(tick_style,"x")

  xaxis.selectAll("path").style("fill","none")

  // Update Y Grid
  var yData = vars.y.scale.value == "continuous"
            ? vars.y_scale.ticks(vars.tickValues.y.length)
            : vars.y_scale.ticks()
  var ylines = ygrid.selectAll("line")
    .data(yData)

  ylines.enter().append("line")
    .style("opacity",0)
    .call(tick_position,"y")
    .call(tick_style,"y")

  ylines.transition().duration(vars.draw.timing)
    .style("opacity",1)
    .call(tick_position,"y")
    .call(tick_style,"y")

  ylines.exit().transition().duration(vars.draw.timing)
    .style("opacity",0)
    .remove()

  // Update X Grid
  var xData = vars.x.scale.value == "continuous"
            ? vars.x_scale.ticks(vars.tickValues.x.length)
            : vars.x_scale.ticks()
  var xlines = xgrid.selectAll("line")
    .data(xData)

  xlines.enter().append("line")
    .style("opacity",0)
    .call(tick_position,"x")
    .call(tick_style,"x")

  xlines.transition().duration(vars.draw.timing)
    .style("opacity",1)
    .call(tick_position,"x")
    .call(tick_style,"x")

  xlines.exit().transition().duration(vars.draw.timing)
    .style("opacity",0)
    .remove()

  // Update X Axis Label
  xlabel.text(vars.format.value(vars.x.value))
    .attr("x", vars.width.viz/2)
    .attr("y", vars.height.viz-10)
    .attr("opacity",function(){
      if (vars.data.app.length == 0) return 0
      else return 1
    })

  // Update Y Axis Label
  ylabel.text(vars.format.value(vars.y.value))
    .attr("y", 15)
    .attr("x", -(graph.height/2+graph.margin.top))
    .attr("opacity",function(){
      if (vars.data.app.length == 0) return 0
      else return 1
    })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Enter/Update User-Defined Axis Lines
  //-------------------------------------------------------------------

  function get_name(d) {
    if (typeof d == "number" || typeof d == "string") {
      return null;
    }
    else {
      return d3.keys(d)[0]
    }
  }

  function get_val(d) {
    if (typeof d == "number") {
      return d;
    }
    else if (typeof d == "string") {
      return parseFloat(d);
    }
    else {
      var v = d[d3.keys(d)[0]]
      if (typeof v == "string") {
        return parseFloat(v);
      }
      else {
        return v;
      }
    }
  }

  vars.axes.values.forEach(function(axis){

    var lines = plane.selectAll("g.d3plus_"+axis+"line")
      .data(vars[axis].lines,function(l){
        if (typeof l == "number" || typeof l == "string") {
          return l
        }
        else {
          return d3.keys(l)[0]
        }
      })

    var enter = lines.enter().append("g")
      .attr("class","d3plus_"+axis+"line")

    var max = axis == "x" ? "height" : "width",
        pos = axis == "x" ? (graph.height-8)+"px" : "10px",
        padding = axis == "x" ? 10 : 20

    enter.append("line")
      .attr(axis+"1",0)
      .attr(axis+"2",graph[max])
      .attr("stroke","#ccc")
      .attr("stroke-width",3)
      .attr("stroke-dasharray","10,10")

    enter.append("text")
      .style("font-size",vars.axes.ticks.font.size)
      .style("fill",vars.axes.ticks.font.color)
      .attr("text-align","start")
      .attr(axis,pos)

    lines.selectAll("line").transition().duration(vars.draw.timing)
      .attr(axis+"1",function(d){
        return get_val(d) ? vars[axis+"_scale"](get_val(d)) : 0
      })
      .attr(axis+"2",function(d){
        return get_val(d) ? vars[axis+"_scale"](get_val(d)) : 0
      })
      .attr("opacity",function(d){
        var yes = get_val(d) > vars[axis+"_scale"].domain()[1] && get_val(d) < vars[axis+"_scale"].domain()[0]
        return get_val(d) !== null && yes ? 1 : 0
      })

    lines.selectAll("text").transition().duration(vars.draw.timing)
      .text(function(){
        if (get_val(d) !== null) {
          var v = vars.format.value(get_val(d),y_name)
          return get_name(d) ? vars.format.value(get_name(d)) + ": " + v : v
        }
        else return null
      })
      .attr(axis,function(d){
        return (vars[axis+"_scale"](get_val(d))+padding)+"px"
      })

  })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Format Data for Plotting
  //-------------------------------------------------------------------

  if (["line","area"].indexOf(vars.shape.value) >= 0) {
    radius.rangeRound([2,2])
  }

  vars.axis_offset = {
    "x": graph.margin.left,
    "y": graph.margin.top
  }

  data.forEach(function(d){
    d.d3plus.x = vars.x_scale(d3plus.variable.value(vars,d,vars.x.value))
    d.d3plus.x += vars.axis_offset.x

    d.d3plus.r = radius(d3plus.variable.value(vars,d,vars.size.value))

    if (!vars.stacked_axis) {

      d.d3plus.y = vars.y_scale(d3plus.variable.value(vars,d,vars.y.value))
      d.d3plus.y += vars.axis_offset.y

      if (vars.shape.value == "area") {
        d.d3plus[vars.opp_axis+"0"] = vars[vars.opp_axis+"_scale"].range()[1]
        d.d3plus[vars.opp_axis+"0"] += vars.axis_offset[vars.opp_axis]
      }

    }

  })

  var sort = vars.order.value ? vars.order.value : vars.continuous_axis
           ? vars[vars.opp_axis].value : vars.size.value || vars.id.value

  if (["line","area"].indexOf(vars.shape.value) >= 0) {

    data = d3.nest()
      .key(function(d){
        var id = d3plus.variable.value(vars,d,vars.id.value),
            depth = d.d3plus.depth ? d.d3plus.depth : 0
        return d3plus.string.strip(id)+"_"+depth+"_"+vars.shape.value
      })
      .rollup(function(leaves){

        var availables = d3plus.util.uniques(leaves,vars[vars.continuous_axis].value),
            previousMissing = false

        vars.tickValues[vars.continuous_axis].forEach(function(v,i,arr){

          if(availables.indexOf(v) < 0){
            var obj = {}
            obj[vars[vars.continuous_axis].value] = v
            obj[vars.id.value] = leaves[0][vars.id.value]
            obj[vars[vars.opp_axis].value] = vars[vars.opp_axis+"_scale"].domain()[1]
            obj.d3plus = {}
            obj.d3plus.r = radius(radius.domain()[0])
            obj.d3plus[vars.continuous_axis] += vars.axis_offset[vars.continuous_axis]

            if (!vars.stacked_axis) {
              obj.d3plus[vars.opp_axis] = vars[vars.opp_axis+"_scale"].range()[1]
              obj.d3plus[vars.opp_axis] += vars.axis_offset[vars.opp_axis]
              obj.d3plus[vars.opp_axis+"0"] = obj.d3plus[vars.opp_axis]
            }

            if (vars[vars.continuous_axis].zerofill.value || vars[vars.opp_axis].stacked.value) {
              var position = vars[vars.continuous_axis+"_scale"](v)
              position += vars.axis_offset[vars.continuous_axis]
              obj.d3plus[vars.continuous_axis] = position
              leaves.push(obj)
            }
            else if (vars.shape.value != "line") {
              if (!previousMissing && i > 0) {
                var position = vars[vars.continuous_axis+"_scale"](arr[i-1])
                position += vars.axis_offset[vars.continuous_axis]
                obj.d3plus[vars.continuous_axis] = position
                leaves.push(obj)
              }
              if (i < arr.length-1) {
                var position = vars[vars.continuous_axis+"_scale"](arr[i+1])
                position += vars.axis_offset[vars.continuous_axis]
                var obj2 = d3plus.util.copy(obj)
                obj2.d3plus[vars.continuous_axis] = position
                leaves.push(obj2)
              }
            }
            previousMissing = true

          }
          else {
            previousMissing = false
          }
        })

        leaves.sort(function(a,b){
          var xsort = a.d3plus[vars.continuous_axis] - b.d3plus[vars.continuous_axis]
          if (xsort) return xsort
          var ksort = a[vars[vars.continuous_axis].value] - b[vars[vars.continuous_axis].value]
          return ksort
        })

        return leaves
      })
      .entries(data)

    data.forEach(function(d,i){

      vars.id.nesting.forEach(function(n,i){
        if (i <= vars.depth.value && !d[n]) {
          d[n] = d3plus.util.uniques(d.values,n).filter(function(unique){
            return unique && unique != "undefined"
          })[0]
        }
      })

      if ( !(sort in d) ) {
        d[sort] = 0
        d.values.forEach(function(v){
          var val = d3plus.variable.value(vars,v,sort)
          if (val) {
            if (typeof val == "number") {
              d[sort] += val
            }
            else {
              d[sort] = val
            }
          }
        })
      }

    })

  }

  if (sort) {

    d3plus.array.sort( data , sort
                     , vars.order.sort.value === "desc" ? "asc" : "desc"
                     , vars.color.value || [] , vars )

  }

  if (vars.stacked_axis) {

    var stack = d3.layout.stack()
      .values(function(d) { return d.values; })
      .x(function(d) { return d.d3plus.x; })
      .x(function(d) { return d.d3plus.y; })
      .y(function(d) {
        var flip = graph.height,
            val = d3plus.variable.value(vars,d,vars.y.value)
        return flip-vars.y_scale(val);
      })
      .out(function(d,y0,y){
        var flip = graph.height

        if (vars[vars.stacked_axis].scale.value == "share") {
          d.d3plus.y0 = (1-y0)*flip
          d.d3plus.y = d.d3plus.y0-(y*flip)
        }
        else {
          d.d3plus.y0 = flip-y0
          d.d3plus.y = d.d3plus.y0-y
        }
        d.d3plus.y += graph.margin.top
        d.d3plus.y0 += graph.margin.top
      })

    var offset = vars[vars.stacked_axis].scale.value == "share" ? "expand" : "zero";

    var data = stack.offset(offset)(data)

  }
  else if (["area","line"].indexOf(vars.shape.value) < 0) {

    function data_tick(l,axis) {
      l
        .attr("x1",function(d){
          return axis == "y" ? 0 : d.d3plus.x-graph.margin.left
        })
        .attr("x2",function(d){
          return axis == "y" ? -5 : d.d3plus.x-graph.margin.left
        })
        .attr("y1",function(d){
          return axis == "x" ? graph.height : d.d3plus.y-graph.margin.top
        })
        .attr("y2",function(d){
          return axis == "x" ? graph.height+5 : d.d3plus.y-graph.margin.top
        })
        .style("stroke",function(d){
          return d3plus.color.legible(d3plus.variable.color(vars,d));
        })
        .style("stroke-width",vars.data.stroke.width)
        .attr("shape-rendering",vars.shape.rendering.value)
    }

    var data_ticks = plane.selectAll("g.d3plus_data_ticks")
      .data(data,function(d){
        return d[vars.id.value]+"_"+d.d3plus.depth
      })

    var tick_enter = data_ticks.enter().append("g")
      .attr("class","d3plus_data_ticks")
      .attr("opacity",0)

    tick_enter.append("line")
      .attr("class","d3plus_data_y")
      .call(data_tick,"y")

    data_ticks.selectAll("line.d3plus_data_y")
      .call(data_tick,"y")

    tick_enter.append("line")
      .attr("class","d3plus_data_x")
      .call(data_tick,"x")

    data_ticks.selectAll("line.d3plus_data_x")
      .call(data_tick,"x")

    data_ticks.transition().duration(vars.draw.timing)
      .attr("opacity",1)

    data_ticks.exit().transition().duration(vars.draw.timing)
      .attr("opacity",0)
      .remove()

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Plot data on chart!
  //-------------------------------------------------------------------

  function axis_lines(node) {

    var click_remove = d3.event.type == d3plus.evt.click && (vars.tooltip.value.long || vars.tooltip.html.value),
        create = [d3plus.evt.over,d3plus.evt.move].indexOf(d3.event.type) >= 0

    if (!click_remove && create && vars.shape.value != "area") {

      if (node.data) var node = node.data

      var line_data = [
        d3plus.util.copy(node.d3plus),
        d3plus.util.copy(node.d3plus)
      ]
      line_data[0].axis = "x"
      line_data[1].axis = "y"

    }
    else {
      var line_data = []
    }

    function line_init(l) {
      l
        .attr("x2",function(d){
          var ret = d.axis == "x" ? d.x : d.x-d.r
          return ret
        })
        .attr("y2",function(d){
          var ret = d.axis == "y" ? d.y : d.y+d.r
          return ret
        })
        .style("stroke-width",0)
        .attr("opacity",0)
    }

    var lines = mouseevents.selectAll("line.d3plus_axis_label")
      .data(line_data,function(d){
        return d.axis+"_"+d.id
      })

    lines.enter().append("line")
      .attr("class","d3plus_axis_label")
      .call(line_init)
      .attr("x1",function(d){
        return d.axis == "x" ? d.x : d.x-d.r
      })
      .attr("y1",function(d){
        return d.axis == "y" ? d.y : d.y+d.r
      })
      .style("stroke",function(d){
        return d3plus.variable.color(vars,node)
      })
      .attr("shape-rendering",vars.shape.rendering.value)

    lines.transition().duration(vars.timing.mouseevents)
      .attr("class","d3plus_axis_label")
      .attr("x2",function(d){
        return d.axis == "x" ? d.x : graph.margin.left-vars.axes.ticks.size
      })
      .attr("y2",function(d){
        return d.axis == "y" ? d.y : graph.height+graph.margin.top+vars.axes.ticks.size
      })
      .style("stroke",function(d){
        return d3plus.color.legible(d3plus.variable.color(vars,node));
      })
      .style("stroke-width",vars.data.stroke.width)
      .attr("opacity",1)

    lines.exit().transition().duration(vars.timing.mouseevents)
      .call(line_init)
      .remove()

    var texts = mouseevents.selectAll("text.d3plus_axis_label")
      .data(line_data,function(d){
        return d.axis+"_"+d.id
      })

    texts.enter().append("text")
      .attr("class","d3plus_axis_label")
      .attr("id",function(d){
        return d.axis+"_"+d.id
      })
      .text(function(d){
        var val = d3plus.variable.value(vars,node.d3plus_data || node,vars[d.axis].value)
        return vars.format.value(val,vars[d.axis].value)
      })
      .attr("x",function(d){
        return d.axis == "x" ? d.x : graph.margin.left-5-vars.axes.ticks.size
      })
      .attr("y",function(d){
        return d.axis == "y" ? d.y : graph.height+graph.margin.top+5+vars.axes.ticks.size
      })
      .attr("dy",function(d){
        return d.axis == "y" ? (vars.axes.ticks.font.size*.35) : vars.axes.ticks.font.size
      })
      .attr("text-anchor",function(d){
        return d.axis == "y" ? "end": "middle"
      })
      .style("fill",function(d){
        return d3plus.color.legible(d3plus.variable.color(vars,node));
      })
      .style("font-size",vars.axes.ticks.font.size)
      .attr("font-family",vars.axes.ticks.font.family.value)
      .attr("font-weight",vars.axes.ticks.font.weight)
      .attr("opacity",0)

    texts.transition().duration(vars.timing.mouseevents)
      .delay(vars.timing.mouseevents)
      .attr("opacity",1)

    texts.exit().transition().duration(vars.timing.mouseevents)
      .attr("opacity",0)
      .remove()

    var rects = mouseevents.selectAll("rect.d3plus_axis_label")
      .data(line_data,function(d){
        return d.axis+"_"+d.id
      })

    rects.enter().insert("rect","text")
      .attr("class","d3plus_axis_label")
      .attr("x",function(d){
        var width = d3.select("text#"+d.axis+"_"+d.id).node().getBBox().width
        var ret = d.axis == "x" ? d.x : graph.margin.left-vars.axes.ticks.size
        return d.axis == "x" ? ret-width/2-5 : ret-width-10
      })
      .attr("y",function(d){
        var height = d3.select("text#"+d.axis+"_"+d.id).node().getBBox().height
        var ret = d.axis == "y" ? d.y : graph.height+graph.margin.top
        return d.axis == "x" ? ret+vars.axes.ticks.size : ret-height/2-5
      })
      .attr("width",function(d){
        var text = d3.select("text#"+d.axis+"_"+d.id).node().getBBox()
        return text.width + 10
      })
      .attr("height",function(d){
        var text = d3.select("text#"+d.axis+"_"+d.id).node().getBBox()
        return text.height + 10
      })
      .style("stroke",function(d){
        return d3plus.color.legible(d3plus.variable.color(vars,node));
      })
      .style("fill","white")
      .style("stroke-width",vars.data.stroke.width)
      .attr("shape-rendering",vars.shape.rendering.value)
      .attr("opacity",0)

    rects.transition().duration(vars.timing.mouseevents)
      .delay(vars.timing.mouseevents)
      .attr("opacity",1)

    rects.exit().transition().duration(vars.timing.mouseevents)
      .attr("opacity",0)
      .remove()

  }

  vars.mouse = axis_lines

  return data

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Visualization Settings and Helper Functions
//------------------------------------------------------------------------------
d3plus.visualization.chart.fill         = true
d3plus.visualization.chart.requirements = ["data","x","y"]
d3plus.visualization.chart.scale        = { "circle": 1.1
                                          , "donut": 1.1
                                          , "square": 1.1 }
d3plus.visualization.chart.shapes       = ["circle","donut","line","square","area"]
d3plus.visualization.chart.tooltip      = "static"

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Geo Map
//------------------------------------------------------------------------------
d3plus.visualization.geo_map = function(vars) {

  topojson.presimplify(vars.coords.value)

  var coords = vars.coords.value
    , key = d3.keys(coords.objects)[0]
    , topo = topojson.feature(coords, coords.objects[key])
    , features = topo.features

  var features = features.filter(function(f){

    f[vars.id.value] = f.id

    if (vars.coords.solo.value.length) {

      return vars.coords.solo.value.indexOf(f.id) >= 0

    }
    else if (vars.coords.mute.value.length) {

      return vars.coords.mute.value.indexOf(f.id) < 0

    }

    return true

  })

  return features

};

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Visualization Settings and Helper Functions
//------------------------------------------------------------------------------
d3plus.visualization.geo_map.libs         = [ "topojson" ];
d3plus.visualization.geo_map.nesting      = false
d3plus.visualization.geo_map.requirements = [ "color" , "coords" ];
d3plus.visualization.geo_map.scale        = 1
d3plus.visualization.geo_map.shapes       = [ "coordinates" ];
d3plus.visualization.geo_map.tooltip      = "follow"
d3plus.visualization.geo_map.zoom         = true

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Line Plot
//------------------------------------------------------------------------------
d3plus.visualization.line = function(vars) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // This visualization is an extention of the Chart visualization.
  //----------------------------------------------------------------------------
  return d3plus.visualization.chart(vars)

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Visualization Settings and Helper Functions
//------------------------------------------------------------------------------
d3plus.visualization.line.requirements = [ "data" , "x" , "y" ]

d3plus.visualization.line.setup = function(vars) {

  vars.self.x({ "scale" : "continuous" })

}

d3plus.visualization.line.shapes       = [ "line" ]
d3plus.visualization.line.tooltip      = "static"

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Network
//------------------------------------------------------------------------------
d3plus.visualization.network = function(vars) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Use filtered lists if they are available
  //----------------------------------------------------------------------------
  var nodes = vars.nodes.restricted || vars.nodes.value,
      edges = vars.edges.restricted || vars.edges.value

  var x_range = d3.extent(nodes,function(n){return n.x}),
      y_range = d3.extent(nodes,function(n){return n.y})

  var val_range = vars.size.value ? d3.extent(nodes, function(d){
    var val = d3plus.variable.value( vars , d , vars.size.value )
    return val === 0 ? null : val
  }) : [ 1 , 1 ]

  if (typeof val_range[0] == "undefined") val_range = [1,1]

  var max_size = d3.min(d3plus.util.distances(nodes))

  max_size = max_size * vars.nodes.overlap

  if (vars.edges.arrows.value) {
    max_size = max_size * 0.5
  }

  if ( val_range[0] === val_range[1] ) {
    var min_size = max_size
  }
  else {

    var width = (x_range[1]+max_size*1.1)-(x_range[0]-max_size*1.1),
        height = (y_range[1]+max_size*1.1)-(y_range[0]-max_size*1.1)
        aspect = width/height,
        app = vars.width.viz/vars.height.viz

    if ( app > aspect ) {
      var scale = vars.height.viz/height
    }
    else {
      var scale = vars.width.viz/width
    }
    var min_size = max_size * 0.25
    if ( min_size * scale < 2 ) {
      min_size = 2/scale
    }

  }

  // Create size scale
  var radius = vars.size.scale.value
    .domain(val_range)
    .range([min_size, max_size])

  vars.zoom.bounds = [ [ x_range[0]-max_size*1.1 , y_range[0]-max_size*1.1 ]
                     , [ x_range[1]+max_size*1.1 , y_range[1]+max_size*1.1 ] ]

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Match nodes to data
  //----------------------------------------------------------------------------
  var data = [], lookup = {}
  nodes.forEach(function(n){

    var d = vars.data.app.filter(function(a){
      return a[vars.id.value] == n[vars.id.value]
    })[0]

    if (d) {
      var obj = d3plus.object.merge(n,d)
    }
    else {
      var obj = d3plus.util.copy(n)
    }

    obj.d3plus = {}
    obj.d3plus.x = n.x
    obj.d3plus.y = n.y
    var val = d3plus.variable.value(vars,obj,vars.size.value)
    obj.d3plus.r = val ? radius(val) : radius.range()[0]
    lookup[obj[vars.id.value]] = {
      "x": obj.d3plus.x,
      "y": obj.d3plus.y,
      "r": obj.d3plus.r
    }
    data.push(obj)
  })

  data.sort(function(a,b){
    return b.d3plus.r - a.d3plus.r
  })

  edges.forEach(function(l,i){

    l[vars.edges.source] = d3plus.util.copy(l[vars.edges.source])
    l[vars.edges.source].d3plus = {}

    var source = lookup[l[vars.edges.source][vars.id.value]]
    l[vars.edges.source].d3plus.r = source.r
    l[vars.edges.source].d3plus.x = source.x
    l[vars.edges.source].d3plus.y = source.y

    l[vars.edges.target] = d3plus.util.copy(l[vars.edges.target])
    l[vars.edges.target].d3plus = {}

    var target = lookup[l[vars.edges.target][vars.id.value]]
    l[vars.edges.target].d3plus.r = target.r
    l[vars.edges.target].d3plus.x = target.x
    l[vars.edges.target].d3plus.y = target.y

  })

  return {"nodes": data, "edges": edges}

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Visualization Settings and Helper Functions
//------------------------------------------------------------------------------
d3plus.visualization.network.nesting      = false
d3plus.visualization.network.requirements = ["nodes","edges"]
d3plus.visualization.network.scale        = 1.05
d3plus.visualization.network.shapes       = [ "circle" , "square" , "donut" ]
d3plus.visualization.network.tooltip      = "static"
d3plus.visualization.network.zoom         = true

d3plus.visualization.rings = function(vars) {

  var radius = d3.min([vars.height.viz,vars.width.viz])/2
    , ring_width = vars.small || !vars.labels.value
                 ? (radius-vars.labels.padding*2)/2 : radius/3
    , primaryRing = vars.small || !vars.labels.value
                  ? ring_width*1.4 : ring_width
    , secondaryRing = ring_width*2
    , edges = []
    , nodes = []

  var center = vars.data.app.filter(function(d){
    return d[vars.id.value] === vars.focus.value
  })[0]

  if ( !center ) {
    center = { "d3plus" : {} }
    center[vars.id.value] = vars.focus.value
  }

  center.d3plus.x = vars.width.viz/2
  center.d3plus.y = vars.height.viz/2
  center.d3plus.r = primaryRing*.65

  var primaries = [], claimed = [vars.focus.value]
  vars.edges.connections(vars.focus.value,vars.id.value).forEach(function(edge){

    var c = edge[vars.edges.source][vars.id.value] == vars.focus.value ? edge[vars.edges.target] : edge[vars.edges.source]
    var n = vars.data.app.filter(function(d){
      return d[vars.id.value] === c[vars.id.value]
    })[0]

    if ( !n ) {
      n = { "d3plus" : {} }
      n[vars.id.value] = c[vars.id.value]
    }

    n.d3plus.edges = vars.edges.connections(n[vars.id.value],vars.id.value).filter(function(c){
      return c[vars.edges.source][vars.id.value] != vars.focus.value && c[vars.edges.target][vars.id.value] != vars.focus.value
    })
    n.d3plus.edge = edge
    claimed.push(n[vars.id.value])
    primaries.push(n)

  })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Sort primary nodes by children (smallest to largest) and then by sort
  // order.
  //--------------------------------------------------------------------------
  var sort = vars.order.value || vars.color.value
          || vars.size.value || vars.id.value

  primaries.sort(function(a,b){

    var lengthdiff = a.d3plus.edges.length - b.d3plus.edges.length

    if ( lengthdiff ) {

      return lengthdiff

    }
    else {

      return d3plus.array.sort( [a,b] , sort , vars.order.sort.value
                              , vars.color.value || [] , vars)

    }

  })

  if (typeof vars.edges.limit == "number") {
    primaries = primaries.slice(0,vars.edges.limit)
  }
  else if (typeof vars.edges.limit == "function") {
    primaries = vars.edges.limit(primaries)
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check for similar children and give preference to nodes with less
  // overall children.
  //----------------------------------------------------------------------------
  var secondaries = [], total = 0
  primaries.forEach(function(p){

    var primaryId = p[vars.id.value]

    p.d3plus.edges = p.d3plus.edges.filter(function(c){

      var source = c[vars.edges.source][vars.id.value]
        , target = c[vars.edges.target][vars.id.value]
      return (claimed.indexOf(source) < 0 && target == primaryId)
          || (claimed.indexOf(target) < 0 && source == primaryId)

    })

    total += p.d3plus.edges.length || 1

    p.d3plus.edges.forEach(function(c){

      var source = c[vars.edges.source]
        , target = c[vars.edges.target]
      var claim = target[vars.id.value] == primaryId ? source : target
      claimed.push(claim[vars.id.value])

    })
  })

  d3plus.array.sort( primaries , sort , vars.order.sort.value
                   , vars.color.value || [] , vars)

  var offset = 0,
      radian = Math.PI*2,
      start = 0

  primaries.forEach(function(p,i){

    var children = p.d3plus.edges.length || 1,
        space = (radian/total)*children

    if (i == 0) {
      start = angle
      offset -= space/2
    }

    var angle = offset+(space/2)
    angle -= radian/4

    p.d3plus.radians = angle
    p.d3plus.x = vars.width.viz/2 + (primaryRing * Math.cos(angle))
    p.d3plus.y = vars.height.viz/2 + (primaryRing * Math.sin(angle))

    offset += space
    p.d3plus.edges.sort(function(a,b){

      var a = a[vars.edges.source][vars.id.value] == p[vars.id.value]
            ? a[vars.edges.target] : a[vars.edges.source]
        , b = b[vars.edges.source][vars.id.value] == p[vars.id.value]
            ? b[vars.edges.target] : b[vars.edges.source]

      return d3plus.array.sort( [a,b] , sort , vars.order.sort.value
                              , vars.color.value || [] , vars)

    })

    p.d3plus.edges.forEach(function(edge,i){

      var c = edge[vars.edges.source][vars.id.value] == p[vars.id.value]
          ? edge[vars.edges.target] : edge[vars.edges.source]
        , s = radian/total

      var d = vars.data.app.filter(function(a){
        return a[vars.id.value] === c[vars.id.value]
      })[0]

      if ( !d ) {
        d = { "d3plus" : {} }
        d[vars.id.value] = c[vars.id.value]
      }

      a = (angle-(s*children/2)+(s/2))+((s)*i)
      d.d3plus.radians = a
      d.d3plus.x = vars.width.viz/2 + ((secondaryRing) * Math.cos(a))
      d.d3plus.y = vars.height.viz/2 + ((secondaryRing) * Math.sin(a))
      secondaries.push(d)
    })

  })

  var primaryDistance = d3.min(d3plus.util.distances(primaries,function(n){
        return [n.d3plus.x,n.d3plus.y]
      }))
    , secondaryDistance = d3.min(d3plus.util.distances(secondaries,function(n){
        return [n.d3plus.x,n.d3plus.y]
      }))

  if (!primaryDistance) {
    primaryDistance = ring_width/2
  }

  if (!secondaryDistance) {
    secondaryDistance = ring_width/4
  }

  if (primaryDistance/2 - 4 < 8) {
    var primaryMax = d3.min([primaryDistance/2,8])
  }
  else {
    var primaryMax = primaryDistance/2 - 4
  }

  if (secondaryDistance/2 - 4 < 4) {
    var secondaryMax = d3.min([secondaryDistance/2,4])
  }
  else {
    var secondaryMax = secondaryDistance/2 - 4
  }

  if (secondaryMax > ring_width/10) {
    secondaryMax = ring_width/10
  }

  if (secondaryMax > primaryMax) {
    secondaryMax = primaryMax*.75
  }
  else if (primaryMax > secondaryMax*1.5) {
    primaryMax = secondaryMax*1.5
  }

  primaryMax = Math.floor(primaryMax)
  secondaryMax = Math.floor(secondaryMax)

  var ids = d3plus.util.uniques(primaries,vars.id.value)
  ids = ids.concat(d3plus.util.uniques(secondaries,vars.id.value))
  ids.push(vars.focus.value)

  var data = vars.data.app.filter(function(d){
    return ids.indexOf(d[vars.id.value]) >= 0
  })

  if (vars.size.value) {

    var domain = d3.extent(data,function(d){
      return d3plus.variable.value(vars,d,vars.size.value)
    })

    if (domain[0] == domain[1]) {
      domain[0] = 0
    }

    var radius = d3.scale.linear()
      .domain(domain)
      .rangeRound([3,d3.min([primaryMax,secondaryMax])])

    var val = d3plus.variable.value(vars,center,vars.size.value)
    center.d3plus.r = radius(val)

  }
  else {

    var radius = d3.scale.linear()
      .domain([1,2])
      .rangeRound([primaryMax,secondaryMax])


    if (vars.edges.label) {
      center.d3plus.r = radius(1)*1.5
    }

  }

  secondaries.forEach(function(s){
    s.d3plus.ring = 2
    var val = vars.size.value ? d3plus.variable.value(vars,s,vars.size.value) : 2
    s.d3plus.r = radius(val)
  })

  primaries.forEach(function(p){
    p.d3plus.ring = 1
    var val = vars.size.value ? d3plus.variable.value(vars,p,vars.size.value) : 1
    p.d3plus.r = radius(val)
  })

  primaries.forEach(function(p,i){

    var check = [vars.edges.source,vars.edges.target]
      , edge = d3plus.util.copy(p.d3plus.edge)

    check.forEach(function(node){
      if (edge[node][vars.id.value] == center[vars.id.value]) {

        edge[node].d3plus = {
          "x": center.d3plus.x,
          "y": center.d3plus.y,
          "r": center.d3plus.r
        }

      }
      else {

        edge[node].d3plus = {
          "x": p.d3plus.x,
          "y": p.d3plus.y,
          "r": p.d3plus.r
        }

      }
    })

    delete edge.d3plus
    edges.push(edge)

    vars.edges.connections(p[vars.id.value],vars.id.value).forEach(function(e){

      var edge = d3plus.util.copy(e)

      var c = edge[vars.edges.source][vars.id.value] == p[vars.id.value]
            ? edge[vars.edges.target] : edge[vars.edges.source]

      if (c[vars.id.value] != center[vars.id.value]) {

        var target = secondaries.filter(function(s){
          return s[vars.id.value] == c[vars.id.value]
        })[0]

        if (!target) {
          var r = primaryRing
          target = primaries.filter(function(s){
            return s[vars.id.value] == c[vars.id.value]
          })[0]
        }
        else {
          var r = secondaryRing
        }

        if (target) {

          edge.d3plus = {
            "spline": true,
            "translate": {
              "x": vars.width.viz/2,
              "y": vars.height.viz/2
            }
          }

          var check = [vars.edges.source,vars.edges.target]

          check.forEach(function(node){
            if (edge[node][vars.id.value] == p[vars.id.value]) {

              edge[node].d3plus = {
                "a": p.d3plus.radians,
                "r": primaryRing+p.d3plus.r,
                "depth": 1
              }

            }
            else {

              edge[node].d3plus = {
                "a": target.d3plus.radians,
                "r": r-target.d3plus.r,
                "depth": 2
              }

            }
          })

          edges.push(edge)

        }

      }

    })

  })

  nodes = [center].concat(primaries).concat(secondaries)

  nodes.forEach(function(n) {

    if (!vars.small && vars.labels.value) {

      if (n[vars.id.value] != vars.focus.value) {

        n.d3plus.rotate = n.d3plus.radians*(180/Math.PI)

        var angle = n.d3plus.rotate,
            width = ring_width-(vars.labels.padding*3)-n.d3plus.r

        if (angle < -90 || angle > 90) {
          angle = angle-180
          var buffer = -(n.d3plus.r+width/2+vars.labels.padding),
              anchor = "end"
        }
        else {
          var buffer = n.d3plus.r+width/2+vars.labels.padding,
              anchor = "start"
        }

        var background = primaries.indexOf(n) >= 0 ? true : false

        var height = n.d3plus.ring == 1 ? primaryDistance : secondaryDistance
        height += vars.labels.padding*2

        n.d3plus.label = {
          "x": buffer,
          "y": 0,
          "w": width,
          "h": height,
          "angle": angle,
          "anchor": anchor,
          "valign": "center",
          "color": d3plus.color.legible(d3plus.variable.color(vars,n[vars.id.value])),
          "resize": [8,vars.labels.font.size],
          "background": background,
          "mouse": true
        }

      }
      else if (vars.size.value || vars.edges.label) {

        var height = primaryRing-n.d3plus.r*2-vars.labels.padding*2

        n.d3plus.label = {
          "x": 0,
          "y": n.d3plus.r+height/2,
          "w": primaryRing,
          "h": height,
          "color": d3plus.color.legible(d3plus.variable.color(vars,n[vars.id.value])),
          "resize": [10,40],
          "background": true,
          "mouse": true
        }

      }
      else {
        delete n.d3plus.rotate
        delete n.d3plus.label
      }

    }
    else {
      delete n.d3plus.rotate
      delete n.d3plus.label
    }

  })

  vars.mouse[d3plus.evt.click] = function(d) {
    if (d[vars.id.value] != vars.focus.value) {
      d3plus.tooltip.remove(vars.type.value)
      vars.self.focus(d[vars.id.value]).draw()
    }
  }

  return {"edges": edges, "nodes": nodes, "data": data}

};

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Visualization Settings and Helper Functions
//------------------------------------------------------------------------------
d3plus.visualization.rings.filter       = function( vars , data ) {

  var primaries = vars.edges.connections(vars.focus.value,vars.id.value,true)
    , secondaries = []

  primaries.forEach(function(p){
    secondaries = secondaries.concat(vars.edges.connections(p[vars.id.value],vars.id.value,true))
  })

  var connections = primaries.concat(secondaries)
    , ids = d3plus.util.uniques(connections,vars.id.value)
    , returnData = []

  ids.forEach(function(id){

    var d = data.filter(function(d){
      return d[vars.id.value] === id
    })[0]

    if ( !d ) {
      var obj = {"d3plus": {}}
      obj[vars.id.value] = id
      returnData.push(obj)
    }
    else {
      returnData.push(d)
    }

  })

  return returnData

}
d3plus.visualization.rings.nesting      = false
d3plus.visualization.rings.scale        = 1
d3plus.visualization.rings.shapes       = [ "circle" , "square" , "donut" ]
d3plus.visualization.rings.requirements = [ "edges" , "focus" ]
d3plus.visualization.rings.tooltip      = "static"

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Scatterplot
//------------------------------------------------------------------------------
d3plus.visualization.scatter = function(vars) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // This visualization is an extention of the Chart visualization.
  //----------------------------------------------------------------------------
  return d3plus.visualization.chart(vars)

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Visualization Settings and Helper Functions
//------------------------------------------------------------------------------
d3plus.visualization.scatter.fill         = true
d3plus.visualization.scatter.requirements = [ "data" , "x" , "y" ]
d3plus.visualization.scatter.scale        = d3plus.visualization.chart.scale
d3plus.visualization.scatter.shapes       = [ "circle" , "square" , "donut" ]
d3plus.visualization.scatter.tooltip      = "static"

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Stacked Area Chart
//------------------------------------------------------------------------------
d3plus.visualization.stacked = function(vars) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // This visualization is an extention of the Chart visualization.
  //----------------------------------------------------------------------------
  return d3plus.visualization.chart(vars)

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Visualization Settings and Helper Functions
//------------------------------------------------------------------------------
d3plus.visualization.stacked.filter       = function( vars , data ) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Merge data points below the threshold
  //----------------------------------------------------------------------------
  return d3plus.data.threshold( vars , data , vars.x.value )

}
d3plus.visualization.stacked.requirements = [ "data" , "x" , "y" ]

d3plus.visualization.stacked.setup        = function( vars ) {

  vars.self
    .x({ "scale" : "continuous" , "zerofill" : true })
    .y({ "stacked" : true })

  var y    = vars.y
    , size = vars.size

  if ( ( !y.value && size.value ) || ( size.changed && size.previous === y.value ) ) {

    vars.self.y( size.value )

  }
  else if ( ( !size.value && y.value ) || ( y.changed && y.previous === size.value ) ) {

    vars.self.size( y.value )

  }

}

d3plus.visualization.stacked.shapes       = [ "area" ]
d3plus.visualization.stacked.threshold    = function( vars ) {
  return 20 / vars.height.viz
}
d3plus.visualization.stacked.tooltip      = "static"

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Tree Map
//------------------------------------------------------------------------------
d3plus.visualization.tree_map = function(vars) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Group the data by each depth defined by the .id() method.
  //----------------------------------------------------------------------------
  var grouped_data = d3.nest()

  vars.id.nesting.forEach(function(n,i){

    if (i < vars.depth.value) {

      grouped_data.key(function(d){

        return d3plus.variable.value(vars,d.d3plus,n)

      })

    }

  })

  var strippedData = []
  vars.data.app.forEach(function(d){
    strippedData.push({
      "d3plus" : d,
      "id"     : d[vars.id.value],
      "value"  : d3plus.variable.value(vars,d,vars.size.value)
    })
  })

  grouped_data = grouped_data.entries(strippedData)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Pass data through the D3js .treemap() layout.
  //----------------------------------------------------------------------------
  var data = d3.layout.treemap()
    .mode(vars.type.mode.value)
    .round(true)
    .size([ vars.width.viz , vars.height.viz ])
    .children(function(d) {

      return d.values

    })
    .padding(1)
    .sort(function(a, b) {

      var sizeDiff = a.value - b.value
      return sizeDiff === 0 ? a.id < b.id : sizeDiff

    })
    .nodes({
      "name":"root",
      "values": grouped_data
    })
    .filter(function(d) {

      return !d.values && d.area

    })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If the "data" array has entries...
  //----------------------------------------------------------------------------
  if (data.length) {

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create the "root" node to use when calculating share percentage.
    //--------------------------------------------------------------------------
    var root = data[0]

    while (root.parent) {

      root = root.parent

    }

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Calculate the position, size, and share percentage of each square.
    //--------------------------------------------------------------------------
    var returnData = []
    data.forEach(function(d){

      d.d3plus.d3plus = d3plus.object.merge(d.d3plus.d3plus,{
        "x": d.x+d.dx/2,
        "y": d.y+d.dy/2,
        "width": d.dx,
        "height": d.dy,
        "share": d.value/root.value
      })

      returnData.push(d.d3plus)

    })

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Return the data array.
  //----------------------------------------------------------------------------
  return returnData

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Visualization Settings and Helper Functions
//------------------------------------------------------------------------------
d3plus.visualization.tree_map.filter       = function( vars , data ) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Merge data points below the threshold
  //----------------------------------------------------------------------------
  return d3plus.data.threshold( vars , data )

}
d3plus.visualization.tree_map.modes        = [ "squarify" , "slice"
                                           , "dice" , "slice-dice" ]
d3plus.visualization.tree_map.requirements = [ "data" , "size" ]
d3plus.visualization.tree_map.shapes       = [ "square" ]
d3plus.visualization.tree_map.threshold    = function( vars ) {
  return ( 40 * 40 ) / (vars.width.viz * vars.height.viz)
}
d3plus.visualization.tree_map.tooltip      = "follow"

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws a UI drawer, if defined.
//------------------------------------------------------------------------------
d3plus.ui.drawer = function( vars ) {

  var enabled = vars.ui.value && vars.ui.value.length
    , position = vars.ui.position.value
    , buffer = 0

  if ( vars.dev.value && enabled ) d3plus.console.time("drawing custom UI elements")

  var drawer = vars.container.value.selectAll("div#d3plus_drawer")
    .data(["d3plus_drawer"])

  drawer.enter().append("div")
    .attr("id","d3plus_drawer")
    .each(function(){
      buffer += vars.ui.margin*2
    })

  var positionStyles = {}
  vars.ui.position.accepted.forEach(function(p){
    positionStyles[p] = p == position ? vars.margin.bottom+"px" : "auto"
  })

  drawer
    .style("text-align",vars.ui.align.value)
    .style("position","absolute")
    .style("width",vars.width.value-(vars.ui.padding*2)+"px")
    .style("height","auto")
    .style(positionStyles)

  var ui = drawer.selectAll("div.d3plus_drawer_ui")
    .data(enabled ? vars.ui.value : [], function(d){
      return d.method || false
    })

  ui.enter().append("div")
    .attr("class","d3plus_drawer_ui")
    .style("padding",vars.ui.padding+"px")
    .style("display","inline-block")
    .each(function(d){

      var container = d3.select(this)

      d.form = d3plus.form()
        .container(container)
        .focus(vars[d.method].value,function(value){
          if ( value !== vars[d.method].value ) {
            vars.self[d.method](value).draw()
          }
        })
        .font(vars.ui.font)
        .id("id")
        .text("text")
        .type("auto")
        .width(d.width || false)

    })

  ui.each(function(d){

    var data = []
      , title = vars.format.locale.value.method[d.method] || d.method

    d.value.forEach(function(o){

      var obj = {
        "id": o,
        "text": vars.format.value(o)
      }
      data.push(obj)

    })

    d.form
      .data(data)
      .title(vars.format.value(title))
      .ui({
        "align": vars.ui.align.value,
        "padding": vars.ui.padding,
        "margin": vars.ui.margin
      })
      .draw()

  })

  ui.exit().remove()

  var drawerHeight = drawer.node().offsetHeight

  if ( drawerHeight ) {
    vars.margin[position] += drawerHeight + buffer
  }

  if ( vars.dev.value && enabled ) d3plus.console.timeEnd("drawing custom UI elements")

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates focus tooltip, if applicable
//-------------------------------------------------------------------

d3plus.ui.focus = function(vars) {

  if (!vars.internal_error && vars.focus.value && !vars.small && vars.focus.tooltip.value) {

    if ( vars.dev.value ) d3plus.console.time("drawing focus tooltip")

    var data = vars.data.pool.filter(function(d){
      return d3plus.variable.value(vars,d,vars.id.value) == vars.focus.value
    })

    if (data.length >= 1) {
      data = data[0]
    }
    else {
      data = {}
      data[vars.id.value] = vars.focus.value
    }

    var offset = vars.labels.padding

    d3plus.tooltip.app({
      "anchor": "top left",
      "arrow": false,
      "data": data,
      "length": "long",
      "fullscreen": false,
      "id": vars.type.value+"_focus",
      "maxheight": vars.height.viz-offset*2,
      "mouseevents": true,
      "offset": 0,
      "vars": vars,
      "x": vars.width.value-vars.margin.right-offset,
      "y": vars.margin.top+offset,
      "width": vars.tooltip.large
    })

    if(!d3.select("div#d3plus_tooltip_id_"+vars.type.value+"_focus").empty()) {
      vars.width.viz -= (vars.tooltip.large+offset*2)
    }

    if ( vars.dev.value ) d3plus.console.timeEnd("drawing focus tooltip")

  }
  else {
    d3plus.tooltip.remove(vars.type.value+"_focus")
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates "back" button, if applicable
//------------------------------------------------------------------------------
d3plus.ui.history = function(vars) {

  if (!vars.small && vars.history.states.length > 0) {

    if ( vars.dev.value ) d3plus.console.time("drawing back button")

    var button = vars.container.value.selectAll("div#d3plus_back_button")
      .data(["d3plus_back_button"])

    var size = vars.title.value
      ? vars.title.font.size : vars.title.sub.font.size

    var color = vars.title.sub.value
      ? vars.title.sub.font.color : vars.title.font.color

    var family = vars.title.sub.value
      ? vars.title.sub.font.family.value : vars.title.font.family.value

    var weight = vars.title.sub.value
      ? vars.title.sub.font.weight : vars.title.font.weight

    var padding = vars.title.sub.value
      ? vars.title.sub["padding"] : vars.title["padding"]

    function style(elem) {

        elem
          .style("position","absolute")
          .style("left",vars.ui.padding+"px")
          .style("top",vars.margin.top/2-size/2+"px")
          .style("color", color)
          .style("font-family", family)
          .style("font-weight", weight)
          .style("font-size",size+"px")
          .style("z-index",2000)

    }

    var min_height = size + padding*2
    if (vars.margin.top < min_height) {
      vars.margin.top = min_height
    }

    var enter = button.enter().append("div")
      .attr("id","d3plus_back_button")
      .style("opacity",0)
      .call(style)
      .html(function(){

        if (d3plus.font.awesome) {
          var arrow = "<span style='font-family:FontAwesome;margin-right:5px;'>&#xf104</span>"
        }
        else {
          var arrow = "&laquo; "
        }

        return arrow+vars.format.value(vars.format.locale.value.ui.back)

      })

    button
      .on(d3plus.evt.over,function(){

        if (!vars.small && vars.history.states.length > 0) {

          d3.select(this)
            .style("cursor","pointer")
            .transition().duration(vars.timing.mouseevents)
              .style("color",d3plus.color.lighter(color,.25))

        }

      })
      .on(d3plus.evt.out,function(){

        if (!vars.small && vars.history.states.length > 0) {

          d3.select(this)
            .style("cursor","auto")
            .transition().duration(vars.timing.mouseevents)
              .style("color",color)

        }

      })
      .on(d3plus.evt.click,function(){

        vars.history.back()

      })
      .transition().duration(vars.draw.timing)
        .style("opacity",1)
        .call(style)

    if ( vars.dev.value ) d3plus.console.timeEnd("drawing back button")

  }
  else {
    vars.container.value.selectAll("div#d3plus_back_button")
      .transition().duration(vars.draw.timing)
      .style("opacity",0)
      .remove()
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates color key
//------------------------------------------------------------------------------
d3plus.ui.legend = function(vars) {

  var key_display = true,
      square_size = 0,
      key = vars.color.value || vars.id.value
    , colorName = vars.color.value || "d3plus_color"

  if (!vars.small && vars.legend.value && key) {

    if (!vars.color.scale) {

      if ( vars.dev.value ) d3plus.console.time("grouping data by colors")

      if ( vars.nodes.value && d3plus.visualization[vars.type.value].requirements.indexOf("nodes") >= 0 ) {
        var data = vars.nodes.restriced || vars.nodes.value
        if ( vars.data.app.length ) {
          for ( var i = 0 ; i < data.length ; i++ ) {
            var appData = vars.data.app.filter(function(a){
              return a[vars.id.value] === data[i][vars.id.value]
            })
            if (appData.length) {
              data[i] = d3plus.object.merge(data[i],appData[0])
            }
          }
        }
      }
      else {
        var data = vars.data.app
      }

      for ( var z = 0 ; z < data.length ; z++ ) {

        d = data[z]

        for ( var i = 0 ; i < vars.id.nesting.length ; i++ ) {

          var colorKey = vars.id.nesting[i]

          if ( !(colorKey in d) ) {
            var nextKey = vars.id.nesting[ i + 1 ]
            d[colorKey] = d3plus.variable.value( vars , d[nextKey] , colorKey , nextKey )
          }

        }

      }

      var colorFunction = function( d ){
            return d3plus.variable.color( vars , d , vars.id.nesting[colorDepth] )
          }

      for ( var i = 0 ; i < vars.id.nesting.length ; i++ ) {

        var colorDepth = i
          , colorKey   = vars.id.nesting[i]

        var uniqueIDs = d3plus.util.uniques( data , colorKey )
          , uniqueColors = d3plus.util.uniques( data , colorFunction )

        if ( uniqueIDs.length === uniqueColors.length && uniqueColors.length > 1 ) {
          break
        }

      }

      var colors = d3plus.data.nest( vars , data , [ colorFunction ] , [] )

      for ( var z = 0 ; z < colors.length ; z++ ) {

        d = colors[z]

        var nextKey = vars.id.nesting[ colorDepth + 1 ]

        d[colorKey] = d[colorKey]
          || d3plus.variable.value( vars , d[nextKey] , colorKey , nextKey )

        d[colorName] = d[colorName]
          || d3plus.variable.color( vars , d , colorKey )

        d.d3plus = {"depth": colorDepth}

      }

      if ( vars.dev.value ) d3plus.console.timeEnd("grouping data by color")

      var available_width = vars.width.value

      square_size = vars.legend.size

      var key_width = square_size*colors.length+vars.ui.padding*(colors.length+1)

      if (square_size instanceof Array) {

        if ( vars.dev.value ) d3plus.console.time("calculating legend size")

        for (var i = square_size[1]; i >= square_size[0]; i--) {
          key_width = i*colors.length+vars.ui.padding*(colors.length+1)
          if (available_width >= key_width) {
            square_size = i
            break;
          }
        }

        if ( vars.dev.value ) d3plus.console.timeEnd("calculating legend size")

      }
      else if (typeof square_size != "number" && square_size !== false) {
        square_size = 30
      }

      if (available_width < key_width || colors.length == 1) {
        key_display = false
      }
      else {

        key_width -= vars.ui.padding*2

        if ( vars.dev.value ) d3plus.console.time("sorting legend")

        var order = vars[vars.legend.order.value].value

        d3plus.array.sort( colors , order , vars.legend.order.sort.value
                         , colorName , vars )

        if ( vars.dev.value ) d3plus.console.timeEnd("sorting legend")

        if ( vars.dev.value ) d3plus.console.time("drawing legend")

        if (vars.legend.align == "start") {
          var start_x = vars.ui.padding
        }
        else if (vars.legend.align == "end") {
          var start_x = available_width - vars.ui.padding - key_width
        }
        else {
          var start_x = available_width/2 - key_width/2
        }

        vars.g.legend.selectAll("g.d3plus_scale")
          .transition().duration(vars.draw.timing)
          .attr("opacity",0)
          .remove()

        var keys = vars.g.legend.selectAll("g.d3plus_color")
          .data(colors,function(d){
            return d[vars.id.nesting[d.d3plus.depth]]
          })

        function position(group) {

          group
            .attr("transform",function(g,i){
              var x = start_x + (i*(vars.ui.padding+square_size))
              return "translate("+x+","+vars.ui.padding+")"
            })

        }

        var key_enter = keys.enter().append("g")
          .attr("class","d3plus_color")
          .attr("opacity",0)
          .call(position)

        function style(rect) {

          rect
            .attr("width",square_size)
            .attr("height",square_size)
            .attr("fill",function(g){

              d3.select(this.parentNode).selectAll("text").remove()

              var icon = d3plus.variable.value( vars , g , vars.icon.value , vars.id.nesting[g.d3plus.depth] )
                , color = d3plus.variable.color( vars , g , vars.id.nesting[g.d3plus.depth] )

              if (icon) {

                var short_url = d3plus.string.strip(icon+"_"+color)

                var pattern = vars.defs.selectAll("pattern#"+short_url)
                  .data([short_url])

                if (typeof vars.icon.style.value == "string") {
                  var icon_style = vars.icon.style.value
                }
                else if (typeof vars.icon.style.value == "object" && vars.icon.style.value[icon_depth]) {
                  var icon_style = vars.icon.style.value[icon_depth]
                }
                else {
                  var icon_style = "default"
                }

                var color = icon_style == "knockout" ? color : "none"

                pattern.select("rect").transition().duration(vars.draw.timing)
                  .attr("fill",color)
                  .attr("width",square_size)
                  .attr("height",square_size)

                pattern.select("image").transition().duration(vars.draw.timing)
                  .attr("width",square_size)
                  .attr("height",square_size)

                var pattern_enter = pattern.enter().append("pattern")
                  .attr("id",short_url)
                  .attr("width",square_size)
                  .attr("height",square_size)

                pattern_enter.append("rect")
                  .attr("fill",color)
                  .attr("width",square_size)
                  .attr("height",square_size)

                pattern_enter.append("image")
                  .attr("xlink:href",icon)
                  .attr("width",square_size)
                  .attr("height",square_size)
                  .each(function(d){

                    if (icon.indexOf("/") == 0 || icon.indexOf(window.location.hostname) >= 0) {

                      d3plus.util.dataurl(icon,function(base64){

                        pattern.select("image")
                          .attr("xlink:href",base64)

                      })

                    }
                    else {

                      pattern.select("image")
                        .attr("xlink:href",icon)

                    }

                  })

                return "url(#"+short_url+")"
              }
              else {

                var text = d3.select(this.parentNode).append("text")

                text
                  .attr("font-size",vars.legend.font.size)
                  .attr("font-weight",vars.legend.font.weight)
                  .attr("font-family",vars.legend.font.family.value)
                  .attr("text-anchor","start")
                  .attr("fill",d3plus.color.text(color))
                  .attr("x",0)
                  .attr("y",0)
                  .each(function(t){

                    var text = d3plus.variable.text( vars , g , g.d3plus.depth )

                    if (text.length === 1 && text[0].length) {

                      d3plus.textwrap()
                        .container( d3.select(this) )
                        .height( square_size - vars.ui.padding * 2 )
                        .resize( vars.labels.resize.value )
                        .text( text[0] )
                        .width( square_size - vars.ui.padding * 2 )
                        .draw()

                    }

                  })
                  .attr("y",function(t){
                    var h = this.getBBox().height,
                        diff = parseFloat(d3.select(this).style("font-size"),10)/5
                    return square_size/2 - h/2 - diff/2
                  })
                  .selectAll("tspan")
                    .attr("x",function(t){
                      var w = this.getComputedTextLength()
                      return square_size/2 - w/2
                    })

                if (text.select("tspan").empty()) {
                  text.remove()
                }

                return color
              }

            })

        }

        key_enter
          .append("rect")
            .attr("class","d3plus_color")
            .call(style)

        if (!d3plus.touch) {

          keys
            .on(d3plus.evt.over,function(d,i){

              d3.select(this).style("cursor","pointer")

              var x = start_x + (i*(vars.ui.padding+square_size)),
                  y = d3.transform(d3.select(this.parentNode).attr("transform")).translate[1]

              x += square_size/2
              y += vars.ui.padding+square_size/2

              d3plus.tooltip.app({
                "data": d,
                "footer": false,
                "vars": vars,
                "x": x,
                "y": y
              })

            })
            .on(d3plus.evt.out,function(d){
              d3plus.tooltip.remove(vars.type.value)
            })

        }

        keys.order()
          .transition().duration(vars.draw.timing)
          .attr("opacity",1)
          .call(position)

        keys.selectAll("rect.d3plus_color").transition().duration(vars.draw.timing)
          .call(style)

        keys.exit()
          .transition().duration(vars.draw.timing)
          .attr("opacity",0)
          .remove()

        if ( vars.dev.value ) d3plus.console.timeEnd("drawing legend")

      }

    }
    else if (vars.color.scale) {

      if ( vars.dev.value ) d3plus.console.time("drawing color scale")

      vars.g.legend.selectAll("g.d3plus_color")
        .transition().duration(vars.draw.timing)
        .attr("opacity",0)
        .remove()

      var values = vars.color.scale.domain(),
          colors = vars.color.scale.range()

      if (values.length <= 2) {
        values = d3plus.util.buckets(values,6)
      }

      var scale = vars.g.legend.selectAll("g.d3plus_scale")
        .data(["scale"])

      scale.enter().append("g")
        .attr("class","d3plus_scale")
        .attr("opacity",0)

      var heatmap = scale.selectAll("#d3plus_legend_heatmap")
        .data(["heatmap"])

      heatmap.enter().append("linearGradient")
        .attr("id", "d3plus_legend_heatmap")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%")
        .attr("spreadMethod", "pad");

      var stops = heatmap.selectAll("stop")
        .data(d3.range(0,colors.length))

      stops.enter().append("stop")
        .attr("stop-opacity",1)

      stops
        .attr("offset",function(i){
          return Math.round((i/(colors.length-1))*100)+"%"
        })
        .attr("stop-color",function(i){
          return colors[i]
        })

      stops.exit().remove()

      var gradient = scale.selectAll("rect#gradient")
        .data(["gradient"])

      gradient.enter().append("rect")
        .attr("id","gradient")
        .attr("x",function(d){
          if (vars.legend.align == "middle") {
            return vars.width.value/2
          }
          else if (vars.legend.align == "end") {
            return vars.width.value
          }
          else {
            return 0
          }
        })
        .attr("y",vars.ui.padding)
        .attr("width", 0)
        .attr("height", vars.legend.gradient.height)
        .attr("stroke",vars.legend.font.color)
        .attr("stroke-width",1)
        .style("fill", "url(#d3plus_legend_heatmap)")

      var text = scale.selectAll("text.d3plus_tick")
        .data(d3.range(0,values.length))

      text.enter().append("text")
        .attr("class","d3plus_tick")
        .attr("x",function(d){
          if (vars.legend.align == "middle") {
            return vars.width.value/2
          }
          else if (vars.legend.align == "end") {
            return vars.width.value
          }
          else {
            return 0
          }
        })
        .attr("y",function(d){
          return this.getBBox().height+vars.legend.gradient.height+vars.ui.padding*2
        })

      var label_width = 0

      text
        .order()
        .attr("font-weight",vars.legend.font.weight)
        .attr("font-family",vars.legend.font.family.value)
        .attr("font-size",vars.legend.font.size)
        .attr("text-anchor",vars.legend.font.align)
        .attr("fill",vars.legend.font.color)
        .text(function(d){
          return vars.format.value(values[d],key)
        })
        .attr("y",function(d){
          return this.getBBox().height+vars.legend.gradient.height+vars.ui.padding*2
        })
        .each(function(d){
          var w = this.offsetWidth
          if (w > label_width) label_width = w
        })

      label_width += vars.labels.padding*2

      var key_width = label_width * (values.length-1)

      if (key_width+label_width < vars.width.value) {

        if (key_width+label_width < vars.width.value/2) {
          key_width = vars.width.value/2
          label_width = key_width/values.length
          key_width -= label_width
        }

        if (vars.legend.align == "start") {
          var start_x = vars.ui.padding
        }
        else if (vars.legend.align == "end") {
          var start_x = vars.width.value - vars.ui.padding - key_width
        }
        else {
          var start_x = vars.width.value/2 - key_width/2
        }

        text.transition().duration(vars.draw.timing)
          .attr("x",function(d){
            return start_x + (label_width*d)
          })

        text.exit().transition().duration(vars.draw.timing)
          .attr("opacity",0)
          .remove()

        var ticks = scale.selectAll("rect.d3plus_tick")
          .data(d3.range(0,values.length))

        ticks.enter().append("rect")
          .attr("class","d3plus_tick")
          .attr("x",function(d){
            if (vars.legend.align == "middle") {
              return vars.width.value/2
            }
            else if (vars.legend.align == "end") {
              return vars.width.value
            }
            else {
              return 0
            }
          })
          .attr("y",vars.ui.padding)
          .attr("width",0)
          .attr("height",vars.ui.padding+vars.legend.gradient.height)
          .attr("fill",vars.legend.font.color)

        ticks.transition().duration(vars.draw.timing)
          .attr("x",function(d){
            var mod = d == 0 ? 1 : 0
            return start_x + (label_width*d) - mod
          })
          .attr("y",vars.ui.padding)
          .attr("width",1)
          .attr("height",vars.ui.padding+vars.legend.gradient.height)
          .attr("fill",vars.legend.font.color)

        ticks.exit().transition().duration(vars.draw.timing)
          .attr("width",0)
          .remove()

        gradient.transition().duration(vars.draw.timing)
          .attr("x",function(d){
            if (vars.legend.align == "middle") {
              return vars.width.value/2 - key_width/2
            }
            else if (vars.legend.align == "end") {
              return vars.width.value - key_width - vars.ui.padding
            }
            else {
              return vars.ui.padding
            }
          })
          .attr("y",vars.ui.padding)
          .attr("width", key_width)
          .attr("height", vars.legend.gradient.height)

        scale.transition().duration(vars.draw.timing)
          .attr("opacity",1)

        if ( vars.dev.value ) d3plus.console.timeEnd("drawing color scale")

      }
      else {
        key_display = false
      }

    }
    else {
      key_display = false
    }

  }
  else {
    key_display = false
  }
  if (vars.legend.value && key && key_display) {

    if ( vars.dev.value ) d3plus.console.time("positioning legend")

    if (square_size) {
      var key_height = square_size+vars.ui.padding
    }
    else {
      var key_box = vars.g.legend.node().getBBox(),
          key_height = key_box.height+key_box.y-vars.ui.padding
    }

    if (vars.margin.bottom === 0) {
      vars.margin.bottom += vars.ui.padding
    }
    vars.margin.bottom += key_height

    vars.g.legend.transition().duration(vars.draw.timing)
      .attr("transform","translate(0,"+(vars.height.value-vars.margin.bottom)+")")

    if ( vars.dev.value ) d3plus.console.timeEnd("positioning legend")

  }
  else {

    if ( vars.dev.value ) d3plus.console.time("hiding legend")

    vars.g.legend.transition().duration(vars.draw.timing)
      .attr("transform","translate(0,"+vars.height.value+")")

    if ( vars.dev.value ) d3plus.console.timeEnd("hiding legend")

  }


}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates Centered Server Message
//------------------------------------------------------------------------------
d3plus.ui.message = function(vars,message) {

  var message = vars.messages.value ? message : null,
      size = message == vars.internal_error ? "large" : vars.messages.style

  if (size == "large") {
    var font = vars.messages,
        position = "center"
  }
  else {

    if (vars.footer.value) {
      var font = vars.footer
    }
    else if (vars.title.value) {
      var font = vars.title
    }
    else if (vars.title.sub.value) {
      var font = vars.title.sub
    }
    else if (vars.title.total.value) {
      var font = vars.title.total
    }
    else {
      var font = vars.title.sub
    }

    var position = font.position

  }

  var font = {
    "color": font.font.color,
    "font-family": font.font.family.value,
    "font-weight": font.font.weight,
    "font-size": font.font.size+"px",
    "padding": font.padding+"px"
  }

  var background = vars.background.value != "none" ? vars.background.value : "white"

  function style(elem) {

    elem
      .style(font)
      .style("position","absolute")
      .style("background",background)
      .style("text-align","center")
      .style("left",function(){
        return position == "center" ? "50%" : "0px"
      })
      .style("width",function(){
        return position == "center" ? "auto" : vars.width.value+"px"
      })
      .style("margin-left",function(){
        var offset = vars.width.value-vars.width.viz
        return position == "center" ? -(this.offsetWidth/2+offset/2)+"px" : "0px"
      })
      .style("top",function(){
        if (position == "center") {
          return "50%";
        }
        else if (position == "top") {
          return "0px"
        }
        else {
          return "auto"
        }
      })
      .style("bottom",function(){
        if (position == "bottom") {
          return "0px"
        }
        else {
          return "auto"
        }
      })
      .style("margin-top",function(){
        if (size == "large") {
          var height = this.offsetHeight
          return -height/2+"px"
        }
        return "0px"
      })

  }

  // Enter Message Group
  vars.g.message = vars.container.value.selectAll("div#d3plus_message")
    .data(["message"])

  vars.g.message.enter().append("div")
    .attr("id","d3plus_message")
    .attr("opacity",0)

  var opacity = message ? 1 : 0,
      text = message ? message : vars.g.message.text(),
      display = message ? "inline-block" : "none"

  vars.g.message
    .text(text)
    .style("opacity",opacity)
    .style("display",display)
    .call(style)

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates color key
//-------------------------------------------------------------------

d3plus.ui.timeline = function(vars) {

  var years = vars.data.time

  if (!vars.small && years && years.length > 1 && vars.timeline.value) {

    if ( vars.dev.value ) d3plus.console.time("drawing timeline")

    if ((vars.time.value == vars.x.value && vars.x.scale.value == "continuous") || (vars.time.value == vars.y.value && vars.y.scale.value == "continuous")) {
      var min_required = 2
    }
    else {
      var min_required = 1
    }

    if (vars.time.solo.value.length) {
      var init = d3.extent(vars.time.solo.value)
    }
    else {
      var init = d3.extent(years)
    }

    var min = years[0],
        max = years[years.length-1],
        start = init[0],
        end = init[1],
        year_ticks = [],
        steps = []

    years.forEach(function(y,i){
      if (i != 0) steps.push(y-years[i-1])
    })
    var step = d3.min(steps),
        total = step*years.length
    years = []
    for (var i = min; i <= max; i += step) {
      years.push(i)
      year_ticks.push(d3.time.year(new Date(parseInt(i), 0, 1)))
    }
    year_ticks.push(d3.time.year(new Date(parseInt(max+step), 0, 1)))

    var brushend = function() {

      if (d3.event.sourceEvent !== null) {

        var extent0 = brush.extent(),
            min_val = d3plus.util.closest(year_ticks,d3.time.year.round(extent0[0])),
            max_val = d3plus.util.closest(year_ticks,d3.time.year.round(extent0[1]))

        if (min_val == max_val) {
          min_val = d3plus.util.closest(year_ticks,d3.time.year.floor(extent0[0]))
        }

        var min_index = year_ticks.indexOf(min_val),
            max_index = year_ticks.indexOf(max_val)

        if (max_index-min_index >= min_required) {
          var extent = [min_val,max_val]
        }
        else if (min_index+min_required <= years.length) {
          var extent = [min_val,year_ticks[min_index+min_required]]
        }
        else {

          var extent = [min_val]
          for (var i = 1; i <= min_required; i++) {
            if (min_index+i <= years.length) {
              extent.push(year_ticks[min_index+i])
            }
            else {
              extent.unshift(year_ticks[min_index-((min_index+i)-(years.length))])
            }
          }
          extent = [extent[0],extent[extent.length-1]]
        }

        d3.select(this).transition()
          .call(brush.extent(extent))
          // .call(brush.event)
          .each("end",function(d){

            var new_years = d3.range(extent[0].getFullYear(),extent[1].getFullYear())

            new_years = new_years.filter(function(d){
              return years.indexOf(d) >= 0
            })

            vars.self.time({"solo": new_years}).draw()

          })

      }
      else {
        return;
      }

    }

    var background = vars.g.timeline.selectAll("rect.d3plus_timeline_background")
      .data(["background"])

    background.enter().append("rect")
      .attr("class","d3plus_timeline_background")
      .attr("opacity",0)
      .attr("fill",vars.timeline.background)

    var ticks = vars.g.timeline.selectAll("g#ticks")
      .data(["ticks"])

    ticks.enter().append("g")
      .attr("id","ticks")
      .attr("transform","translate("+vars.width.value/2+","+vars.ui.padding+")")

    var brush_group = vars.g.timeline.selectAll("g#brush")
      .data(["brush"])

    brush_group.enter().append("g")
      .attr("id","brush")

    var labels = vars.g.timeline.selectAll("g#labels")
      .data(["labels"])

    labels.enter().append("g")
      .attr("id","labels")

    var text = labels.selectAll("text")
      .data(years,function(d,i){
        return i
      })

    text.enter().append("text")
      .attr("y",0)
      .attr("dy",0)
      .attr("x",function(d){
        if (vars.timeline.align == "middle") {
          return vars.width.value/2
        }
        else if (vars.timeline.align == "end") {
          return vars.width.value
        }
        else {
          return 0
        }
      })
      .attr("y",function(d){
        var diff = diff = parseFloat(d3.select(this).style("font-size"),10)/5
        var y = vars.ui.padding+vars.timeline.height/2+this.getBBox().height/2 - diff
        return y
      })

    var year_width = 0,
        year_height = 0

    text
      .order()
      .attr("font-weight",vars.timeline.tick.weight)
      .attr("font-family",vars.timeline.tick.family.value)
      .attr("font-size",vars.timeline.tick.size)
      .attr("text-anchor",vars.timeline.tick.align)
      .attr("opacity",0)
      .text(function(d){
        return d
      })
      .each(function(d){
        var w = this.getBBox().width,
            h = this.getBBox().height
        if (w > year_width) year_width = w
        if (h > year_height) year_height = h
      })

    var label_width = year_width+vars.ui.padding*2,
        timeline_width = label_width*years.length,
        available_width = vars.width.value-vars.ui.padding*2,
        step = 1

    if (timeline_width > available_width) {
      timeline_width = available_width
      step = Math.ceil(label_width/(timeline_width/years.length))
      label_width = timeline_width/years.length
      for (step; step < years.length-1; step++) {
        if ((years.length-1)%step == 0) {
          break;
        }
      }
    }

    if (vars.timeline.align == "start") {
      var start_x = vars.ui.padding
    }
    else if (vars.timeline.align == "end") {
      var start_x = vars.width.value - vars.ui.padding - timeline_width
    }
    else {
      var start_x = vars.width.value/2 - timeline_width/2
    }

    text
      .text(function(d,i){
        return i%step == 0 ? d : ""
      })
      .attr("opacity",1)

    text.transition().duration(vars.draw.timing)
      .attr("fill",function(d){

        if (d >= init[0] && d <= init[1]) {
          var color1 = vars.timeline.background,
              color2 = vars.timeline.brush.color,
              opacity = vars.timeline.brush.opacity
              mixed = d3plus.color.mix(color2,color1,opacity)

          return d3plus.color.text(mixed)
        }
        return d3plus.color.text(vars.timeline.background)
      })
      .attr("x",function(d,i){
        return start_x + (label_width*i) + label_width/2
      })
      .attr("y",function(d){
        var diff = diff = parseFloat(d3.select(this).style("font-size"),10)/5
        var y = vars.ui.padding+vars.timeline.height/2-1+this.getBBox().height/2 - diff
        if (step > 1) {
          y += year_height+vars.ui.padding
        }
        return y
      })

    text.exit().transition().duration(vars.draw.timing)
      .attr("opacity",0)
      .remove()

    background.transition().duration(vars.draw.timing)
      .attr("opacity",1)
      .attr("width",timeline_width)
      .attr("height",vars.timeline.height-2)
      .attr("x",start_x)
      .attr("y",vars.ui.padding)
      .attr("fill",vars.timeline.background)

    var x = d3.time.scale()
      .domain(d3.extent(year_ticks))
      .rangeRound([0,timeline_width])

    var brush = d3.svg.brush()
      .x(x)
      .extent([year_ticks[years.indexOf(start)], year_ticks[years.indexOf(end)+1]])
      .on("brushend", brushend)

    ticks
      .attr("transform","translate("+start_x+","+vars.ui.padding+")")
      .transition().duration(vars.draw.timing)
      .call(d3.svg.axis()
        .scale(x)
        .orient("top")
        .ticks(function(){
          return year_ticks
        })
        .tickFormat("")
        .tickSize(-(vars.timeline.height-2))
        .tickPadding(0))
        .selectAll("path").attr("fill","none")

    ticks.selectAll("line")
      .attr("stroke",vars.timeline.tick.color)
      .attr("shape-rendering",vars.shape.rendering.value)

    brush_group
      .attr("transform","translate("+start_x+","+vars.ui.padding+")")
      .attr("opacity",1)
      .call(brush)

    text.attr("pointer-events","none")

    brush_group.selectAll("rect.background, rect.extent")
      .attr("height",vars.timeline.height-2)

    brush_group.selectAll("rect.background")
      .attr("fill","none")
      .attr("stroke-width",1)
      .attr("stroke",vars.timeline.tick.color)
      .style("visibility","visible")
      .attr("shape-rendering",vars.shape.rendering.value)

    brush_group.selectAll("rect.extent")
      .attr("stroke-width",1)
      .attr("fill",vars.timeline.brush.color)
      .attr("fill-opacity",vars.timeline.brush.opacity)
      .attr("stroke",vars.timeline.tick.color)
      .attr("shape-rendering",vars.shape.rendering.value)

    if (vars.timeline.handles.value) {

      brush_group.selectAll("g.resize")
        .select("rect")
        .attr("fill",vars.timeline.handles.color)
        .attr("stroke",vars.timeline.handles.stroke)
        .attr("stroke-width",1)
        .attr("x",-vars.timeline.handles.size/2)
        .attr("width",vars.timeline.handles.size)
        .attr("height",vars.timeline.height-2)
        .style("visibility","visible")
        .attr("shape-rendering",vars.shape.rendering.value)
        .attr("opacity",vars.timeline.handles.opacity)

    }
    else {

      brush_group.selectAll("g.resize")
        .remove()

    }

    if (vars.timeline.handles.opacity) {

      brush_group.selectAll("g.resize")
        .on(d3plus.evt.over,function(){
          d3.select(this).select("rect")
            .transition().duration(vars.timing.mouseevents)
            .attr("fill",vars.timeline.handles.hover)
        })
        .on(d3plus.evt.out,function(){
          d3.select(this).select("rect")
            .transition().duration(vars.timing.mouseevents)
            .attr("fill",vars.timeline.handles.color)
        })

    }

    if ( vars.margin.bottom === 0 ) {
      vars.margin.bottom += vars.ui.padding
    }

    var timelineBox = vars.g.timeline.node().getBBox()

    vars.margin.bottom += timelineBox.height+timelineBox.y

    vars.g.timeline.transition().duration(vars.draw.timing)
      .attr("transform","translate(0,"+(vars.height.value-vars.margin.bottom-vars.ui.padding/2)+")")

    vars.margin.bottom += vars.ui.padding

    if ( vars.dev.value ) d3plus.console.time("drawing timeline")

  }
  else {

    vars.g.timeline.transition().duration(vars.draw.timing)
      .attr("transform","translate(0,"+vars.height.value+")")

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws appropriate titles
//------------------------------------------------------------------------------
d3plus.ui.titles = function(vars) {

  var total_key = vars.size.value ? vars.size.value
    : vars.color.type === "number" ? vars.color.value : false

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If there is no data or the title bar is not needed,
  // set the total value to 'null'
  //----------------------------------------------------------------------------
  if (!vars.data.app || !vars.title.total.value || vars.small) {
    var total = false
  }
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Otherwise, let's calculate it!
  //----------------------------------------------------------------------------
  else if (total_key) {

    if ( vars.dev.value ) {
      d3plus.console.time("calculating total value")
    }

    if (vars.focus.value) {
      var total = vars.data.app.filter(function(d){
        return d[vars.id.value] == vars.focus.value
      })
      total = d3.sum(total,function(d){
        return d3plus.variable.value(vars,d,total_key)
      })
    }
    else {
      var total = d3.sum(vars.data.pool,function(d){
        return d3plus.variable.value(vars,d,total_key)
      })
    }

    if (total === 0) {
      total = false
    }

    if (typeof total === "number") {

      var pct = ""

      if (vars.data.mute.length || vars.data.solo.length || vars.focus.value) {

        var overall_total = d3.sum(vars.data.value, function(d){
          if (vars.time.solo.value.length > 0) {
            var match = vars.time.solo.value.indexOf(d3plus.variable.value(vars,d,vars.time.value)) >= 0
          }
          else if (vars.time.mute.value.length > 0) {
            var match = vars.time.solo.value.indexOf(d3plus.variable.value(vars,d,vars.time.value)) < 0
          }
          else {
            var match = true
          }
          if (match) {
            return d3plus.variable.value(vars,d,total_key)
          }
        })

        if (overall_total > total) {

          var pct = (total/overall_total)*100,
              ot = vars.format.value(overall_total,vars.size.value)

          var pct = " ("+vars.format.value(pct,"share")+"% of "+ot+")"

        }
      }

      total = vars.format.value(total,vars.size.value)
      var obj = vars.title.total.value
        , prefix = obj.prefix || vars.format.value(vars.format.locale.value.ui.total)+": "
      total = prefix + total
      obj.suffix ? total = total + obj.suffix : null
      total += pct

    }

    if ( vars.dev.value ) {
      d3plus.console.timeEnd("calculating total value")
    }

  }
  else {
    var total = false
  }


  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialize titles and detect footer
  //----------------------------------------------------------------------------
  var title_data = []

  if (vars.footer.value) {
    title_data.push({
      "link": vars.footer.link,
      "style": vars.footer,
      "type": "footer",
      "value": vars.footer.value
    })
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If not in "small" mode, detect titles available
  //----------------------------------------------------------------------------
  if (!vars.small) {

    if (vars.title.value) {
      title_data.push({
        "link": vars.title.link,
        "style": vars.title,
        "type": "title",
        "value": vars.title.value
      })
    }
    if (vars.title.sub.value) {
      title_data.push({
        "link": vars.title.sub.link,
        "style": vars.title.sub,
        "type": "sub",
        "value": vars.title.sub.value
      })
    }
    if (vars.title.total.value && total) {
      title_data.push({
        "link": vars.title.total.link,
        "style": vars.title.total,
        "type": "total",
        "value": total
      })
    }

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Title positioning
  //----------------------------------------------------------------------------
  function position(title) {

    title
      .attr("text-anchor",function(t){

        var align = t.style.font.align

        if (align == "center") {
          return "middle"
        }
        else if ((align == "left" && !d3plus.rtl) || (align == "right" && d3plus.rtl)) {
          return "start"
        }
        else if ((align == "left" && d3plus.rtl) || (align == "right" && !d3plus.rtl)) {
          return "end"
        }

      })
      .attr("x",function(t){

        var align = t.style.font.align

        if (align == "center") {
          return vars.width.value/2
        }
        else if ((align == "left" && !d3plus.rtl) || (align == "right" && d3plus.rtl)) {
          return vars.padding
        }
        else if ((align == "left" && d3plus.rtl) || (align == "right" && !d3plus.rtl)) {
          return vars.width.value-vars.padding
        }

      })
      .attr("y",0)

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Enter Titles
  //----------------------------------------------------------------------------
  function style(title) {

    title
      .attr("font-size",function(t){
        return t.style.font.size
      })
      .attr("fill",function(t){
        return t.link ? vars.links.font.color : t.style.font.color
      })
      .attr("font-family",function(t){
        return t.link ? vars.links.font.family.value : t.style.font.family.value
      })
      .attr("font-weight",function(t){
        return t.link ? vars.links.font.weight : t.style.font.weight
      })
      .style("text-decoration",function(t){
        return t.link ? vars.links.font.decoration.value : t.style.font.decoration.value
      })
      .style("text-transform",function(t){
        return t.link ? vars.links.font.transform.value : t.style.font.transform.value
      })

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Enter Titles
  //----------------------------------------------------------------------------
  if ( vars.dev.value ) d3plus.console.time("drawing titles")
  var titles = vars.svg.selectAll("g.d3plus_title")
    .data(title_data,function(t){
      return t.type
    })

  var titleWidth = vars.title.width || vars.width.value

  titles.enter().append("g")
    .attr("class","d3plus_title")
    .attr("opacity",0)
    .attr("transform",function(t){
      var y = t.style.position == "top" ? 0 : vars.height.value
      return "translate(0,"+y+")"
    })
    .append("text")
      .call(position)
      .call(style)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Wrap text and calculate positions, then transition style and opacity
  //----------------------------------------------------------------------------
  titles
    .each(function(d){

      d3plus.textwrap()
        .container( d3.select(this).select("text") )
        .height( vars.height.value / 8 )
        .text( d.value )
        .width( titleWidth )
        .draw()

      d.y = vars.margin[d.style.position]
      vars.margin[d.style.position] += this.getBBox().height + d.style.padding*2

    })
    .on(d3plus.evt.over,function(t){
      if (t.link) {
        d3.select(this)
          .transition().duration(vars.timing.mouseevents)
          .style("cursor","pointer")
          .select("text")
            .attr("fill",vars.links.hover.color)
            .attr("font-family",vars.links.hover.family.value)
            .attr("font-weight",vars.links.hover.weight)
            .style("text-decoration",vars.links.hover.decoration.value)
            .style("text-transform",vars.links.hover.transform.value)
      }
    })
    .on(d3plus.evt.out,function(t){
      if (t.link) {
        d3.select(this)
          .transition().duration(vars.timing.mouseevents)
          .style("cursor","auto")
          .select("text")
            .call(style)
      }
    })
    .on(d3plus.evt.click,function(t){
      if (t.link) {
        var target = t.link.charAt(0) != "/" ? "_blank" : "_self"
        window.open(t.link,target)
      }
    })
    .transition().duration(vars.draw.timing)
      .attr("opacity",1)
      .attr("transform",function(t){
        var pos = t.style.position,
            y = pos == "top" ? 0+t.y : vars.height.value-t.y
        if (pos == "bottom") {
          y -= this.getBBox().height+t.style.padding
        }
        else {
          y += t.style.padding
        }
        return "translate(0,"+y+")"
      })
      .select("text")
        .call(position)
        .call(style)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Exit unused titles
  //----------------------------------------------------------------------------
  titles.exit().transition().duration(vars.draw.timing)
    .attr("opacity",0)
    .remove()

  if ( vars.margin.top > 0 ) {
    vars.margin.top += vars.title.padding
  }

  if ( vars.margin.bottom > 0 ) {
    vars.margin.bottom += vars.title.padding
  }

  var min = vars.title.height
  if (min && vars.margin[vars.title.position] < min) {
    vars.margin[vars.title.position] = min
  }

  if ( vars.dev.value ) d3plus.console.timeEnd("drawing titles")

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates a Button
//------------------------------------------------------------------------------
d3plus.input.button = function( vars ) {

  var self = this.button

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Bind Data to Buttons
  //----------------------------------------------------------------------------
  var button = vars.container.ui.selectAll("div.d3plus_node")
    .data(vars.data.value,function(d){
      return d[vars.id.value]
    })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Enter Buttons
  //----------------------------------------------------------------------------
  if ( vars.dev.value ) d3plus.console.time("enter")

  button.enter().append("div")
    .attr("class","d3plus_node")
    .call( self.color , vars )
    .call( self.style , vars )
    .call( self.icons , vars )
    .call( self.mouseevents , vars , self.color )

  if ( vars.dev.value ) d3plus.console.timeEnd("enter")

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Update Buttons
  //----------------------------------------------------------------------------
  if (vars.draw.update || vars.draw.timing) {

    if ( vars.dev.value ) d3plus.console.time("ordering")
    button.order()
    if ( vars.dev.value ) d3plus.console.timeEnd("ordering")

    var updatedButtons = button

  }
  else {

    var checks = [ vars.focus.previous
                 , vars.focus.value
                 , vars.hover.previous
                 , vars.hover.value ].filter(function(c){ return c })

    var updatedButtons = button.filter(function(b){
      return checks.indexOf(b[vars.id.value]) >= 0
    })

  }

  if ( vars.dev.value ) d3plus.console.time("update")
  if (vars.draw.timing) {
    updatedButtons
      .transition().duration(vars.draw.timing)
      .call( self.color , vars )
      .call( self.style , vars )
  }
  else {
    updatedButtons
      .call( self.color , vars )
      .call( self.style , vars )
  }

  updatedButtons
    .call( self.icons , vars )
    .call( self.mouseevents , vars , self.color )
  if ( vars.dev.value ) d3plus.console.timeEnd("update")

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Exit Buttons
  //----------------------------------------------------------------------------
  button.exit().remove()

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates Dropdown Menu
//------------------------------------------------------------------------------
d3plus.input.drop = function( vars ) {

  var self = this.drop
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Hijack events of original element, if applicable.
  //----------------------------------------------------------------------------
  self.element( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Capture keyboard events
  //----------------------------------------------------------------------------
  self.keyboard( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Apply click function to all parent windows to close dropdown.
  //----------------------------------------------------------------------------
  self.window( vars )

  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check to make sure we have both a button and list width.
  // ---------------------------------------------------------------------------
  self.width( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Create main button, if it does not already exist.
  //----------------------------------------------------------------------------
  self.button( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Create "selector" to hold the search box and search vars.container.list.
  //----------------------------------------------------------------------------
  self.selector( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Create and style the search box, if applicable.
  //----------------------------------------------------------------------------
  self.search( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Create and style the item list.
  //----------------------------------------------------------------------------
  self.list( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Filter data based off search term, if applicable.
  //----------------------------------------------------------------------------
  self.data( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Updates all divs
  //----------------------------------------------------------------------------
  self.update( vars )

}

d3plus.style.default.axes = {
  "ticks" : {
    "color" : "#ccc",
    "font"  : {
      "color"      : "#888",
      "decoration" : {
        "accepted": [ "line-through" , "none" , "overline" , "underline" ],
        "value": "none"
      },
      "family"     : d3plus.style.fontFamily(d3plus.style.default.fontFamily),
      "size"       : 12,
      "transform"  : {
        "accepted" : [ "capitalize" , "lowercase" , "none" , "uppercase" ],
        "value"    : "none"
      },
      "weight"     : 200
    },
    "size"  : 10,
    "width" : 1
  }
}

d3plus.style.default.background = {
  "accepted" : [ String ],
  "value"    : "#ffffff"
}

d3plus.style.default.color = {
  "heatmap"   : [ "#27366c" , "#7b91d3" , "#9ed3e3"
                , "#f3d261" , "#c9853a" , "#d74b03" ],
  "focus"     : "#444444",
  "missing"   : "#eeeeee",
  "primary"   : "#d74b03",
  "range"     : [ "#d74b03" , "#eeeeee" , "#94b153" ],
  "secondary" : "#e5b3bb"
}

d3plus.style.default.coords = {
  "center"     : [ 0 , 0 ],
  "fit"        : {
    "accepted" : [ "auto" , "height" , "width" ],
    "value"    : "auto"
  },
  "padding"    : 20,
  "projection" : {
    "accepted" : [ "mercator" , "equirectangular" ],
    "value"    : "mercator"
  },
  "threshold"  : 0.1
}

d3plus.style.default.data = {
  "donut"   : {
    "size" : 0.35
  },
  "large"   : 400,
  "opacity" : 0.9,
  "stroke"  : {
    "width" : 1
  }
}

d3plus.style.default.edges = {
  "arrows"  : {
    "accepted"  : [ Boolean , Number ],
    "direction" : {
      "accepted" : [ "source" , "target" ],
      "value"    : "target"
    },
    "value"     : false
  },
  "color"   : "#d0d0d0",
  "large"       : 100,
  "limit"       : false,
  "opacity" : 1,
  "width"   : 1
}

d3plus.style.default.font = {
  "align"      : {
    "accepted" : [ "left" , "center" , "right" ],
    "process"  : function ( value ) {

      return d3plus.rtl ? value === "left" ? "right"
                        : value === "right" ? "left"
                        : value : value

    },
    "value"    : "left"
  },
  "color"      : "#444444",
  "decoration" : {
    "accepted" : [ "line-through" , "none" , "overline" , "underline" ],
    "value"    : "none"
  },
  "family"     : d3plus.style.fontFamily(d3plus.style.default.fontFamily),
  "secondary"  : {
    "align"      : {
      "accepted" : [ "left" , "center" , "right" ],
      "process"  : function ( value ) {

        return d3plus.rtl ? value === "left" ? "right"
                          : value === "right" ? "left"
                          : value : value

      },
      "value"    : "left"
    },
    "color"      : "#444444",
    "decoration" : {
      "accepted" : [ "line-through" , "none" , "overline" , "underline" ],
      "value"    : "none"
    },
    "family"     : d3plus.style.fontFamily(d3plus.style.default.fontFamily),
    "size"       : 12,
    "spacing"    : 0,
    "transform"  : {
      "accepted" : [ "capitalize" , "lowercase" , "none" , "uppercase" ],
      "value"    : "none"
    },
    "weight"     : 200
  },
  "size"       : 12,
  "spacing"    : 0,
  "transform"  : {
    "accepted" : [ "capitalize" , "lowercase" , "none" , "uppercase" ],
    "value"    : "none"
  },
  "weight"     : 200
}

d3plus.style.default.footer = {
  "font"     : {
    "align"      : "center",
    "color"      : "#444",
    "decoration" : {
      "accepted" : [ "line-through" , "none" , "overline" , "underline" ],
      "value"    : "none"
    },
    "family"     : d3plus.style.fontFamily(d3plus.style.default.fontFamily),
    "size"       : 11,
    "transform"  : {
      "accepted" : [ "capitalize" , "lowercase" , "none" , "uppercase" ],
      "value"    : "none"
    },
    "weight"     : 200
  },
  "padding"  : 0,
  "position" : "bottom"
}

d3plus.style.default.height = {
  "small" : 300,
  "max"   : 600
}

d3plus.style.default.icon = {
  "button" : {
    "accepted" : [ false , String ],
    "fallback" : false,
    "opacity"  : 1,
    "process"  : function ( value ) {

      var fallback = this.fallback
      return d3plus.style.default.icon.fontCheck( value , fallback )

    },
    "rotate"   : 0,
    "value"    : false
  },
  "drop"   : {
    "accepted" : [ false , String ],
    "fallback" : "&#x276f;",
    "opacity"  : 1,
    "process"  : function ( value ) {

      var fallback = this.fallback
      return d3plus.style.default.icon.fontCheck( value , fallback )

    },
    "rotate"   : 0,
    "value"    : "fa-angle-down"
  },
  "fontCheck": function ( value , fallback ) {

    if ( value === false
         || ( value.indexOf("fa-") === 0 && d3plus.font.awesome )
         || value.indexOf("fa-") < 0 ) {
      return value
    }
    else {
      return fallback
    }

  },
  "select" : {
    "accepted" : [ false , String ],
    "fallback" : "&#x2713;",
    "opacity"  : 1,
    "process"  : function ( value ) {

      var fallback = this.fallback
      return d3plus.style.default.icon.fontCheck( value , fallback )

    },
    "rotate"   : 0,
    "value"    : "fa-check"
  }
}

d3plus.style.default.labels = {
  "align"    : "middle",
  "font"     : {
    "decoration" : {
      "accepted" : [ "line-through" , "none" , "overline" , "underline" ],
      "value"    : "none"
    },
    "family"     : d3plus.style.fontFamily(d3plus.style.default.fontFamily),
    "size"       : 11,
    "transform"  : {
      "accepted" : [ "capitalize" , "lowercase" , "none" , "uppercase" ],
      "value"    : "none"
    },
    "weight"     : 200
  },
  "padding"  : 7,
  "segments" : 2
}

d3plus.style.default.legend = {
  "align"    : "middle",
  "font"     : {
    "align"  : "middle",
    "color"  : "#444444",
    "family" : d3plus.style.fontFamily(d3plus.style.default.fontFamily),
    "size"   : 10,
    "weight" : 200
  },
  "gradient" : {
    "height" : 10
  },
  "order"    : {
    "accepted" : [ "color" , "id" , "size" , "text" ],
    "sort"     : {
      "accepted" : [ "asc" , "desc" ],
      "value"    : "asc"
    },
    "value"    : "color"
  },
  "size"     : [ 8 , 30 ]
}

d3plus.style.default.links = {
  "font"  : {
    "color"      : "#444444",
    "decoration" : {
      "accepted" : [ "line-through" , "none" , "overline" , "underline" ],
      "value"    : "none"
    },
    "family"     : d3plus.style.fontFamily(d3plus.style.default.fontFamily),
    "transform"  : {
      "accepted" : [ "capitalize" , "lowercase" , "none" , "uppercase" ],
      "value"    : "none"
    },
    "weight"     : 200
  },
  "hover" : {
    "color"      : "#444444",
    "decoration" : {
      "accepted" : [ "line-through" , "none" , "overline" , "underline" ],
      "value"    : "underline"
    },
    "family"     : d3plus.style.fontFamily(d3plus.style.default.fontFamily),
    "transform"  : {
      "accepted" : [ "capitalize" , "lowercase" , "none" , "uppercase" ],
      "value"    : "none"
    },
    "weight"     : 200
  }
}

d3plus.style.default.messages = {
  "font" : {
    "color"      : "#444",
    "decoration" : {
      "accepted" : [ "line-through" , "none" , "overline" , "underline" ],
      "value"    : "none"
    },
    "family"     : d3plus.style.fontFamily(d3plus.style.default.fontFamily),
    "size"       : 16,
    "transform"  : {
      "accepted" : [ "capitalize" , "lowercase" , "none" , "uppercase" ],
      "value"    : "none"
    },
    "weight"     : 200
  },
  "padding": 5
}

d3plus.style.default.nodes = {
  "overlap" : 0.6
}

d3plus.style.default.shape = {
  "interpolate" : {
    "accepted"   : [ "basis" , "basis-open" , "cardinal"
                   , "cardinal-open" , "linear" , "monotone"
                   , "step" , "step-before" , "step-after" ],
    "deprecates" : "stack_type",
    "value"      : "linear"
  },
  "rendering"   : {
    "accepted" : [ "auto" , "optimizeSpeed" , "crispEdges" , "geometricPrecision" ],
    "value"    : "auto"
  }
}

d3plus.style.default.timeline = {
  "align"      : "middle",
  "background" : "#eeeeee",
  "brush"      : {
    "color"   : "#ffffff",
    "opacity" : 1
  },
  "handles"    : {
    "accepted" : [ Boolean ],
    "color"    : "#e5e5e5",
    "hover"    : "#ffffff",
    "opacity"  : 1,
    "size"     : 3,
    "stroke"   : "#cccccc",
    "value"    : true
  },
  "height"    : 20,
  "tick"      : {
    "align"  : "middle",
    "color"  : "#e5e5e5",
    "family" : d3plus.style.fontFamily(d3plus.style.default.fontFamily),
    "size"   : 10,
    "weight" : 200
  }
}

d3plus.style.default.timing = {
  "mouseevents" : 60,
  "transitions" : 600,
  "ui"          : 200
}

d3plus.style.default.title = {
  "font"     : {
    "align"      : "center",
    "color"      : "#444444",
    "decoration" : {
      "accepted" : [ "line-through" , "none" , "overline" , "underline" ],
      "value"    : "none"
    },
    "family"     : d3plus.style.fontFamily(d3plus.style.default.fontFamily),
    "size"       : 16,
    "transform"  : {
      "accepted" : [ "capitalize" , "lowercase" , "none" , "uppercase" ],
      "value"    : "none"
    },
    "weight"     : 400
  },
  "height"   : false,
  "padding"  : 2,
  "position" : "top",
  "sub"      : {
    "font"     : {
      "align"      : "center",
      "color"      : "#444444",
      "decoration" : {
        "accepted" : [ "line-through" , "none" , "overline" , "underline" ],
        "value"    : "none"
      },
      "family"     : d3plus.style.fontFamily(d3plus.style.default.fontFamily),
      "size"       : 12,
      "transform"  : {
        "accepted" : [ "capitalize" , "lowercase" , "none" , "uppercase" ],
        "value"    : "none"
      },
      "weight"     : 200
    },
    "padding"  : 1,
    "position" : "top"
  },
  "total"    : {
    "font"     : {
      "align"      : "center",
      "color"      : "#444444",
      "decoration" : {
        "accepted" : [ "line-through" , "none" , "overline" , "underline" ],
        "value"    : "none"
      },
      "family"     : d3plus.style.fontFamily(d3plus.style.default.fontFamily),
      "size"       : 12,
      "transform"  : {
        "accepted" : [ "capitalize" , "lowercase" , "none" , "uppercase" ],
        "value"    : "none"
      },
      "weight"     : 200
    },
    "padding"  : 1,
    "position" : "top"
  },
  "width"    : false
}

d3plus.style.default.tooltip = {
  "anchor"      : "top center",
  "background"  : "#ffffff",
  "children"    : {
    "accepted" : [ Boolean ],
    "value"    : true
  },
  "connections" : {
    "accepted" : [ Boolean ],
    "value"    : true
  },
  "curtain"     : {
    "color"   : "#ffffff",
    "opacity" : 0.8
  },
  "font"        : {
    "color"     : "#444",
    "family"    : d3plus.style.fontFamily(d3plus.style.default.fontFamily),
    "size"      : 12,
    "transform" : {
      "accepted" : [ "capitalize" , "lowercase" , "none" , "uppercase" ],
      "value"    : "none"
    },
    "weight"    : 200
  },
  "large"       : 250,
  "share"       : {
    "accepted" : [ Boolean ],
    "value"    : true
  },
  "size"        : {
    "accepted" : [ Boolean ],
    "value"    : true
  },
  "small"      : 225
}

d3plus.style.default.ui = {
  "align"    : {
    "accepted" : [ "left" , "center" , "right" ],
    "process"  : function ( value ) {

      return d3plus.rtl ? value === "left" ? "right"
                        : value === "right" ? "left"
                        : value : value

    },
    "value"    : "center"
  },
  "border"   : 1,
  "color"    : {
    "primary"   : {
      "process" : function ( value ) {

        var vars = this.getVars()
          , primary = this.value
          , secondary = vars.ui.color.secondary.value

        if ( !secondary || secondary === d3.rgb(primary).darker(2).toString() ) {
          vars.ui.color.secondary.value = d3.rgb(value).darker(2).toString()
        }

        return value

      },
      "value"   : "#ffffff"
    },
    "secondary" : {
      "value" : false
    }
  },
  "display"  : {
    "acceped" : [ "block" , "inline-block" ],
    "value"   : "inline-block"
  },
  "font"     : {
    "align"      : "center",
    "color"      : "#444",
    "decoration" : {
      "accepted" : [ "line-through" , "none" , "overline" , "underline" ],
      "value"    : "none"
    },
    "family"     : d3plus.style.fontFamily(d3plus.style.default.fontFamily),
    "size": 11,
    "transform"  : {
      "accepted" : [ "capitalize" , "lowercase" , "none" , "uppercase" ],
      "value"    : "none"
    },
    "weight"     : 200
  },
  "margin"   : 5,
  "padding"  : 5,
  "position" : {
    "accepted" : [ "top" , "right" , "bottom" , "left" ],
    "value"    : "bottom"
  }
}

d3plus.style.default.width = {
  "small" : 400
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//
//------------------------------------------------------------------------------
d3plus.input.button.color = function ( elem , vars ) {

  elem
    .style("background-color",function(d){

      if ( vars.focus.value !== d[vars.id.value] ) {

        if ( vars.hover.value === d[vars.id.value] ) {
          return d3plus.color.lighter(vars.ui.color.secondary.value,.25)
        }
        else {
          return vars.ui.color.secondary.value
        }

      }
      else {

        if ( vars.hover.value === d[vars.id.value] ) {
          return d3.rgb(vars.ui.color.primary.value).darker(0.15).toString()
        }
        else {
          return vars.ui.color.primary.value
        }

      }

    })
    .style("color",function(d){

      var image = d[vars.icon.value] && vars.data.value.length < vars.data.large

      if ( vars.focus.value === d[vars.id.value] ) {
        var opacity = 1
      }
      else {
        var opacity = 0.75
      }

      if ( vars.focus.value === d[vars.id.value] && d[vars.color.value] && !image ) {
        var color = d3plus.color.legible(d[vars.color.value])
      }
      else if ( vars.focus.value === d[vars.id.value] ) {
        var color = d3plus.color.text(vars.ui.color.primary.value)
      }
      else {
        var color = d3plus.color.text(vars.ui.color.secondary.value)
      }

      var color = d3.rgb(color)

      return "rgba("+color.r+","+color.g+","+color.b+","+opacity+")"

    })
    .style("border-color",vars.ui.color.secondary.value)

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//
//------------------------------------------------------------------------------
d3plus.input.button.icons = function ( elem , vars ) {

  var reversed = (vars.font.align.value === "right" && !d3plus.rtl)
                 || (d3plus.rtl && vars.font.align.value === "right")

  elem
    .each(function(d,i){

      var children = ["label"]

      if (d[vars.icon.value] && vars.data.value.length <= vars.data.large) {
        children.push("icon")
      }

      var iconGraphic = vars.icon.button.value
      if ( d[vars.id.value] === vars.focus.value && vars.icon.select.value ) {
        iconGraphic = vars.icon.select.value
        children.push("selected")
      }
      else if ( vars.icon.button.value ) {
        children.push("selected")
      }

      var buffer = 0

      var items = d3.select(this).selectAll("div.d3plus_button_element")
        .data(children,function(c){
          return c
        })

      items.enter().append("div")
        .style("display",function(c){
          return c === "label" ? "block" : "absolute"
        })
        .attr("class",function(c){
          var extra = ""
          if ( c === "selected" && iconGraphic.indexOf("fa-") === 0 ) {
            extra = " fa "+vars.icon.select.value
          }
          return "d3plus_button_element d3plus_button_" + c + extra
        })

      items.order()
        .html(function(c){
          return c === "label" ? vars.format.value(d[vars.text.value])
               : c === "selected" && iconGraphic.indexOf("fa-") < 0
               ? iconGraphic : ""
        })
        .style("background-image",function(c){
          if (c === "icon") {
            return "url('"+d[vars.icon.value]+"')"
          }
          return "none"
        })
        .style("background-color",function(c){
          if (c === "icon" && d.style === "knockout") {
            return d[vars.color.value] || vars.ui.color.primary.value
          }
          return "transparent"
        })
        .style("background-size","100%")
        .style("text-align",function(c){
          return c === "label" ? vars.font.align.value : "center"
        })
        .style("position",function(c){
          return c == "label" ? "static" : "absolute"
        })
        .style("width",function(c){

          if ( c === "label" ) {
            return "auto"
          }

          if (vars.height.value) {
            buffer = (vars.height.value-(vars.ui.padding*2)-(vars.ui.border*2))
          }
          else {
            buffer = vars.font.size+vars.ui.padding+vars.ui.border
          }
          return buffer+"px"
        })
        .style("height",function(c){
          if ( c === "icon" ) {
            return buffer+"px"
          }
          return "auto"
        })
        .style("margin-top",function(c){
          if ( c === "label" ) {
            return "0px"
          }
          if (this.offsetHeight) {
            var h = this.offsetHeight
          }
          else if ( c === "selected" ) {
            var h = vars.font.size
          }
          else {
            var h = buffer
          }
          return -h/2+"px"
        })
        .style("top",function(c){
          return c === "label" ? "auto" : "50%"
        })
        .style("left",function(c){
          if ((c === "icon" && !reversed) || (c === "selected" && reversed)) {
            return vars.ui.padding+"px"
          }
          return "auto"
        })
        .style("right",function(c){
          if ((c === "icon" && reversed) || (c === "selected" && !reversed)) {
            return vars.ui.padding+"px"
          }
          return "auto"
        })
        .style(d3plus.prefix()+"transition",function(c){
          return c === "selected" ? (vars.draw.timing/1000)+"s" : "none"
        })
        .style(d3plus.prefix()+"transform",function(c){
          var degree = c === "selected" ? vars.icon.select.rotate : "none"
          return "rotate("+degree+"deg)"
        })
        .style("opacity",function(c){
          return c === "selected" ? vars.icon.select.opacity : 1
        })

      items.exit().remove()

      var text = d3.select(this).selectAll(".d3plus_button_label")

      if (buffer > 0) {

        buffer += vars.ui.padding*2

        var p = vars.ui.padding

        if (children.length === 3) {
          var padding = p+"px "+buffer+"px"
        }
        else if ((children.indexOf("icon") >= 0 && !d3plus.rtl) || (children.indexOf("selected") >= 0 && d3plus.rtl)) {
          var padding = p+"px "+p+"px "+p+"px "+buffer+"px"
        }
        else {
          var padding = p+"px "+buffer+"px "+p+"px "+p+"px"
        }

        text.style("padding",padding)

      }
      else {
        text.style("padding",vars.ui.padding+"px")
      }

      if (typeof vars.width.value === "number") {
        var width = vars.width.value
        width -= parseFloat(text.style("padding-left"),10)
        width -= parseFloat(text.style("padding-right"),10)
        width -= vars.ui.border*2
        width += "px"
      }
      else {
        var width = "auto"
      }

      text.style("width",width)

    })

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//
//------------------------------------------------------------------------------
d3plus.input.button.mouseevents = function ( elem , vars , color ) {

  elem
    .on(d3plus.evt.over,function(d,i){

      vars.self.hover(d[vars.id.value])

      if ( d3plus.ie || !vars.draw.timing ) {

        d3.select(this).style("cursor","pointer")
          .call( color , vars )

      }
      else {

        d3.select(this).style("cursor","pointer")
          .transition().duration(vars.timing.mouseevents)
          .call( color , vars )
      }

    })
    .on(d3plus.evt.out,function(d){

      vars.self.hover(false)

      if ( d3plus.ie || !vars.draw.timing ) {
        d3.select(this).style("cursor","auto")
          .call( color , vars )
      }
      else {
        d3.select(this).style("cursor","auto")
          .transition().duration(vars.timing.mouseevents)
          .call( color , vars )
      }

    })
    .on("click",function(d){

      if ( d[vars.id.value] ) {

        vars.self.focus(d[vars.id.value]).draw()

      }

    })

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//
//------------------------------------------------------------------------------
d3plus.input.button.style = function ( elem , vars ) {

  elem
    .style("position","relative")
    .style("margin",vars.ui.margin+"px")
    .style("display",vars.ui.display.value)
    .style("border-style","solid")
    .style("border-width",vars.ui.border+"px")
    .style("font-family",vars.font.family.value)
    .style("font-size",vars.font.size+"px")
    .style("font-weight",vars.font.weight)
    .style("letter-spacing",vars.font.spacing+"px")

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Toggles the state of the dropdown menu.
//------------------------------------------------------------------------------
d3plus.input.drop.arrow = function ( vars ) {

  if ( vars.dev.value ) d3plus.console.time("rotating arrow")

  var offset = vars.icon.drop.value === "&#x276f;" ? 90 : 0

  if (vars.open.value != vars.open.flipped.value) {
    var rotate = 180 + offset
  }
  else {
    var rotate = offset
  }

  vars.container.button
    .icon({
      "select": {
        "opacity": vars.open.value ? 0.5 : 1,
        "rotate": rotate
      }
    })
    .draw()

  if ( vars.dev.value ) d3plus.console.timeEnd("rotating arrow")

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates and styles the main drop button.
//------------------------------------------------------------------------------
d3plus.input.drop.button = function ( vars ) {

  var self = this

  if ( !("button" in vars.container) ) {

    if ( vars.dev.value ) d3plus.console.time("creating main button")

    var buttonData = d3plus.util.copy(vars.data.value.filter(function(d){
      return d[vars.id.value] === vars.focus.value
    })[0])

    vars.container.button = d3plus.form()
      .container(vars.container.ui)
      .data([buttonData])
      .type("button")
      .ui({
        "margin": 0
      })

    if ( vars.dev.value ) d3plus.console.timeEnd("creating main button")

  }
  else if ( vars.data.changed ) {

    var buttonData = d3plus.util.copy(vars.data.value.filter(function(d){
      return d[vars.id.value] === vars.focus.value
    })[0])

    vars.container.button
      .data([buttonData])

  }

  vars.container.button
    .draw({
      "update": vars.draw.update
    })
    .focus(vars.focus.value)
    .font( vars.font )
    .icon({
      "select": vars.icon.drop.value,
      "value": vars.icon.value
    })
    .id(vars.id.value)
    .text( vars.text.value || vars.text.secondary )
    .timing({
      "ui": vars.draw.timing
    })
    .ui({
      "color": vars.ui.color,
      "padding": vars.ui.padding
    })
    .width(vars.width.value)
    .draw()

  vars.container.button.container(Object).ui.on(d3plus.evt.click,function(){
    self.toggle(vars)
  })

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates and populates the dropdown list of items.
//------------------------------------------------------------------------------
d3plus.input.drop.data = function ( vars ) {

  if ( vars.data.url && !vars.data.loaded ) {
    var loadingObject = {}
    loadingObject[vars.text.value] = vars.format.value(vars.format.locale.value.ui.loading)
    vars.data.filtered = [loadingObject]
  }
  else if (vars.open.value) {

    var searchText  = vars.text.solo.value.length
                    ? vars.text.solo.value[0].toLowerCase() : ""
      , searchWords = d3plus.string.strip(searchText).split("_")
      , searchKeys  = [ vars.id.value
                      , vars.text.value
                      , vars.alt.value
                      , vars.keywords.value ]

    searchWords = searchWords.filter(function(t){ return t != ""; })

    if (!vars.text.solo.value.length || vars.text.solo.value[0] === "") {
      vars.data.filtered = vars.data.value
    }
    else {

      var startMatches = []
        , exactMatches = []
        , softMatches  = []

      vars.data.value.forEach(function(d){

        var match = false

        searchKeys.forEach(function(key){

          if ( !match && key in d && typeof d[key] === "string" ) {

            var text = d[key].toLowerCase()

            if ( key === vars.text.value && text.indexOf(searchText) == 0 ) {
              startMatches.push(d)
              match = true
            }
            else if ( text.indexOf(searchText) >= 0 ) {
              exactMatches.push(d)
              match = true
            }
            else {

              var texts = d3plus.string.strip(text).split("_")

              for (t in texts) {

                if ( !match ) {

                  for (s in searchWords) {
                    if (texts[t].indexOf(searchWords[s]) === 0) {
                      softMatches.push(d)
                      match = true
                      break
                    }
                  }

                }
                else {
                  break
                }

              }

            }
          }

        })

      })

      vars.data.filtered = d3.merge([ startMatches , exactMatches , softMatches ])

      vars.data.filtered.forEach(function(d,i){
        d.d3plus_order = i
      })

    }

    if ( vars.data.filtered.length === 0 ) {

      var noData = {}
        , str = vars.format.value(vars.format.locale.value.ui.noResults)
      noData[vars.text.value] = d3plus.string.format(str,"\""+searchText+"\"")
      vars.data.filtered = [ noData ]

    }

  }
  else {
    vars.data.filtered = []
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Overrides keyboard behavior of the original input element.
//------------------------------------------------------------------------------
d3plus.input.drop.element = function ( vars ) {

  if (vars.data.element) {

    vars.data.element.on("focus."+vars.container.id,function(){
      vars.self.draw({"update":false}).hover(true).draw()
    })

    vars.data.element.on("blur."+vars.container.id,function(){

      var search = vars.search.enabled
                 ? d3.event.relatedTarget != vars.container.select("input").node()
                 : true

      if (search) {
        vars.self.draw({"update":false}).hover(false).draw()
      }

    })

    vars.data.element.on("change."+vars.container.id,function(){
      vars.self.value(vars.data.value[this.selectedIndex])
    })

    vars.data.element.on("keydown.cancel_"+vars.container.id,function(){
      var key = d3.event.keyCode
      if (key != 9) {
        d3.event.preventDefault()
      }
    })

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Calculates the height and orientation of the dropdown list, based on
// available screen space.
//------------------------------------------------------------------------------
d3plus.input.drop.height = function ( vars ) {

  var button = vars.container.button.container().node().getBoundingClientRect()

  vars.height.secondary = window.innerHeight - button.bottom - vars.ui.margin
                         - vars.ui.padding*2 - vars.ui.border*2

  if ( vars.height.secondary < button.height*3 ) {
    vars.height.secondary = button.top-10
    vars.self.open({"flipped": true})
  }
  else {
    vars.self.open({"flipped": false})
  }

  var scrolling = false
  if (vars.height.secondary > vars.height.max) {
    vars.height.secondary = vars.height.max
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Populates item list based on filtered data.
//------------------------------------------------------------------------------
d3plus.input.drop.items = function ( vars ) {

  var self = this

  if (vars.open.value) {

    if ( vars.dev.value ) d3plus.console.time("updating list items")

    if ( !("items" in vars.container) ) {

      vars.container.items = d3plus.form()
        .container(vars.container.list)
        .type("button")
        .ui({
          "border": 0,
          "display": "block",
          "margin": 0
        })
        .width(false)

    }

    var large = vars.draw.timing ? vars.data.large : 1
      , order = d3plus.util.copy(vars.order)

    order.value = vars.text.solo.value.length && vars.text.solo.value[0] !== ""
                ? "d3plus_order" : vars.order.value

    vars.container.items
      .data({
        "large": large,
        "value": vars.data.filtered
      })
      .draw({
        "update": vars.draw.update
      })
      .focus(vars.focus.value,function(value){

        if ( value !== vars.focus.value ) {

          vars.self.focus( value )

          var newData = vars.data.filtered.filter(function(d){
            return d[vars.id.value] === value
          })
          vars.container.button
            .data(newData)
            .focus(value)
            .draw()

          self.toggle( vars )

        }

      })
      .font( vars.font.secondary )
      .id( vars.id.value )
      .icon( vars.icon.value )
      .order( order )
      .text( vars.text.secondary.value || vars.text.value )
      .timing({
        "ui": vars.draw.timing
      })
      .ui({
        "color": vars.ui.color,
        "padding": vars.ui.padding
      })
      .draw()

    if ( vars.dev.value ) d3plus.console.timeEnd("updating list items")

  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Assigns behavior to the user's keyboard for navigation.
//------------------------------------------------------------------------------
d3plus.input.drop.keyboard = function ( vars ) {

  d3.select(document).on("keydown."+vars.container.id,function(){

    if (vars.open.value || vars.hover === true) {

      var key = d3.event.keyCode,
          options = vars.container.list.select("div").selectAll("div.d3plus_node"),
          index = 0

      if (typeof vars.hover == "boolean") {
        options.each(function(d,i){
          if (d.value == vars.focus) {
            index = i
          }
        })
      }
      else {
        options.each(function(d,i){
          if (d.value == vars.hover) {
            index = i
          }
        })
      }

      // Tab
      if ([9].indexOf(key) >= 0 && (!vars.search.enabled || (vars.search.enabled && !d3.event.shiftKey))) {
        vars.self.draw({"update":false}).disable()
      }
      // Down Arrow
      else if ([40].indexOf(key) >= 0) {
        if (vars.open.value) {
          if (index >= options.size()-1) {
            index = 0
          }
          else {
            index += 1
          }
        }

        if (typeof vars.hover != "boolean") {
          var hover = options.data()[index].value
        }
        else {
          var hover = vars.focus
        }

        if (vars.open.value) {
          vars.self.draw({"update":false}).hover(hover).draw(60)
        }
        else {
          vars.self.draw({"update":false}).hover(hover).enable()
        }

      }
      // Up Arrow
      else if ([38].indexOf(key) >= 0) {
        if (vars.open.value) {
          if (index <= 0) {
            index = options.size()-1
          }
          else {
            index -= 1
          }
        }

        if (typeof vars.hover != "boolean") {
          var hover = options.data()[index].value
        }
        else {
          var hover = vars.focus
        }

        if (vars.open.value) {
          vars.self.draw({"update":false}).hover(hover).draw(60)
        }
        else {
          vars.self.draw({"update":false}).hover(hover).enable()
        }

      }
      // Enter/Return
      else if ([13].indexOf(key) >= 0) {
        if (typeof vars.hover != "boolean") {
          vars.self.value(vars.hover).hover(true).draw()
        }
        else {
          vars.self.hover(vars.focus).toggle()
        }
      }
      // Esc
      else if ([27].indexOf(key) >= 0) {
        if (vars.open.value) {
          vars.self.hover(true).disable()
        }
        else if (vars.hover === true) {
          vars.self.hover(false).draw()
        }
      }

    }

  })

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates and populates the dropdown list of items.
//------------------------------------------------------------------------------
d3plus.input.drop.list = function ( vars ) {

  if ( vars.dev.value ) d3plus.console.time("populating list")

  vars.container.list = vars.container.selector.selectAll("div.d3plus_drop_list")
    .data(["list"])

  vars.container.list.enter().append("div")
    .attr("class","d3plus_drop_list")
    .attr("id","d3plus_drop_list_"+vars.container.id)
    .style("overflow-y","auto")
    .style("overflow-x","hidden")

  if ( vars.dev.value ) d3plus.console.timeEnd("populating list")

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Calculates scroll position of list.
//------------------------------------------------------------------------------
d3plus.input.drop.scroll = function ( vars ) {

  if (vars.open.value) {

    if ( vars.dev.value ) d3plus.console.time("calculating height")

    var hidden = false
    if (vars.container.selector.style("display") == "none") {
      var hidden = true
    }

    if (hidden) vars.container.selector.style("display","block")

    var searchHeight = vars.search.enabled ? vars.container.search.node().offsetHeight : 0

    var old_height = vars.container.selector.style("height"),
        old_scroll = vars.container.selector.property("scrollTop"),
        list_height = vars.container.list.style("max-height"),
        list_scroll = vars.container.list.property("scrollTop")

    vars.container.selector.style("height","auto")
    vars.container.list.style("max-height","200000px")

    vars.container.listHeight = parseFloat(vars.container.selector.style("height"),10)

    vars.container.list
      .style("max-height",list_height)
      .property("scrollTop",list_scroll)

    vars.container.selector
      .style("height",old_height)
      .property("scrollTop",old_scroll)

    var scrolling = false
    if (vars.container.listHeight > vars.height.secondary) {
      vars.container.listHeight = vars.height.secondary
      scrolling = true
    }

    if (hidden) vars.container.selector.style("display","none")

    if ( vars.dev.value ) d3plus.console.timeEnd("calculating height")

    if (scrolling) {

      if ( vars.dev.value ) d3plus.console.time("calculating scroll position")

      var options = vars.container.list.select("div").selectAll("div.d3plus_node")
      var option = options[0][0]
      options.each(function(d,i){
        if (d[vars.id.value] == vars.focus.value) {
          option = this
        }
      })

      var hidden = false
      if (vars.container.selector.style("display") === "none") {
        hidden = true
        vars.container.selector.style("display","block")
      }

      var button_top = option.offsetTop,
          button_height = option.offsetHeight,
          list_top = vars.container.list.property("scrollTop")

      if (hidden) vars.container.selector.style("display","none")

      if (hidden || vars.data.changed) {

        vars.container.listScroll = button_top

      }
      else {

        vars.container.listScroll = list_top

        if (button_top < list_top) {
          vars.container.listScroll = button_top
        }
        else if (button_top+button_height > list_top+vars.height.secondary-searchHeight) {
          vars.container.listScroll = button_top - (vars.height.secondary-button_height-searchHeight)
        }

      }

      if ( vars.dev.value ) d3plus.console.timeEnd("calculating scroll position")

    }
    else {
      vars.container.listScroll = 0
    }

  }
  else {
    vars.container.listScroll = vars.container.list.property("scrollTop")
    vars.container.listHeight = 0
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates and styles the search box, if enabled.
//------------------------------------------------------------------------------
d3plus.input.drop.search = function ( vars ) {

  if ( vars.dev.value ) d3plus.console.time("creating search")

  var self = this

  vars.container.search = vars.container.selector.selectAll("div.d3plus_drop_search")
    .data(vars.search.enabled ? ["search"] : [])

  function searchStyle(elem) {

    elem
      .style("padding",vars.ui.padding+"px")
      .style("display","block")
      .style("background-color",vars.ui.color.secondary.value)

  }

  function inputStyle(elem) {

    var width = vars.width.secondary - vars.ui.padding*4 - vars.ui.border*2

    elem
      .style("padding",vars.ui.padding+"px")
      .style("width",width+"px")
      .style("border-style","solid")
      .style("border-width","0px")
      .style("font-family",vars.font.secondary.family.value)
      .style("font-size",vars.font.secondary.size+"px")
      .style("font-weight",vars.font.secondary.weight)
      .style("text-align",vars.font.secondary.align)
      .style("outline","none")
      .style(d3plus.prefix()+"border-radius","0")
      .attr("placeholder",vars.format.value(vars.format.locale.value.method.search))

  }

  if (vars.draw.timing) {

    vars.container.search.transition().duration(vars.draw.timing)
      .call(searchStyle)

    vars.container.search.select("input").transition().duration(vars.draw.timing)
      .call(inputStyle)

  }
  else {

    vars.container.search
      .call(searchStyle)

    vars.container.search.select("input")
      .call(inputStyle)

  }

  vars.container.search.enter()
    .insert("div","#d3plus_drop_list_"+vars.container.id)
      .attr("class","d3plus_drop_search")
      .attr("id","d3plus_drop_search_"+vars.container.id)
      .call(searchStyle)
      .append("input")
        .attr("id","d3plus_drop_input_"+vars.container.id)
        .style("-webkit-appearance","none")
        .call(inputStyle)

  vars.container.search.select("input").on("keyup."+vars.container.id,function(d){
    if (vars.text.solo[0] !== this.value) {
      vars.self.text({"solo":[this.value]})
      self.data( vars )
      self.items( vars )
      self.update( vars )
    }
  })

  vars.container.search.exit().remove()

  if ( vars.dev.value ) d3plus.console.timeEnd("creating search")

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates and styles the div that holds the search box and item list.
//------------------------------------------------------------------------------
d3plus.input.drop.selector = function ( vars ) {

  vars.container.selector = vars.container.ui
    .selectAll("div.d3plus_drop_selector")
    .data(["selector"])

  vars.container.selector.enter().append("div")
    .attr("class","d3plus_drop_selector")
    .style("position","absolute")
    .style("top","0px")
    .style("z-index","-1")
    .style("overflow","hidden")

    vars.container.selector
      .style("padding",vars.ui.border+"px")

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Toggles the state of the dropdown menu.
//------------------------------------------------------------------------------
d3plus.input.drop.toggle = function ( vars ) {

  if (vars.open.value) {
    vars.self.open(false)
  }
  else {
    vars.self.open(true)
  }

  var listLength = vars.container.list.select("div")
                     .selectAll("div.d3plus_node").size()

  if ( vars.data.url && (!vars.data.loaded || vars.data.stream) ) {
    this.update( vars )
    d3plus.data.url( vars , "data" ,  vars.self.draw )
  }
  else if ( vars.data.value.length !== listLength ) {
    vars.self.draw()
  }
  else {
    this.update( vars )
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Redraws only the drop down list.
//------------------------------------------------------------------------------
d3plus.input.drop.update = function ( vars ) {

  var self = this

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If the menu is open, set the container element's z-index to '9999'.
  //----------------------------------------------------------------------------
  if ( vars.draw.timing ) {

    vars.container.ui.transition().duration(vars.draw.timing)
      .each("start",function(){
        if (vars.open.value) {
          d3.select(this).style("z-index",9999)
        }
      })
      .style("margin",vars.ui.margin+"px")
      .each("end",function(){
        if (!vars.open.value) {
          d3.select(this).style("z-index","auto")
        }
      })

  }
  else {

    vars.container.ui
      .style("margin",vars.ui.margin+"px")
      .style("z-index",function(){
        if (vars.open.value) {
          return 9999
        }
        else {
          return "auto"
        }
      })

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Update list items based on filtered data.
  //----------------------------------------------------------------------------
  self.items( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculate the height and orientation of the dropdown list.
  //----------------------------------------------------------------------------
  self.height( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculate scroll position of dropdown menu.
  //----------------------------------------------------------------------------
  self.scroll( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Rotate the dropdown button arrow appropriately.
  //----------------------------------------------------------------------------
  self.arrow( vars )

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Update List
  //----------------------------------------------------------------------------
  if ( vars.dev.value ) d3plus.console.time("drawing list")

  var previousDisplay = vars.container.selector.style("display")
  vars.container.selector.style("display","block")
  var searchHeight = vars.search.enabled ? vars.container.search.node().offsetHeight : 0
    , offsetLeft   = !vars.container.ui.select("div.d3plus_title").empty()
                     && vars.container.ui.select("div.d3plus_title").style("display") === "inline-block"
                   ? vars.container.ui.select("div.d3plus_title").node().offsetWidth
                   : 0
  vars.container.selector.style("display",previousDisplay)

  function update(elem) {

    elem
      .style("left",function(){
        if (vars.font.align.value === "left") {
          return offsetLeft+"px"
        }
        else if (vars.font.align.value === "center") {
          return -((vars.width.secondary-vars.width.value)/2)+"px"
        }
        else {
          return "auto"
        }
      })
      .style("right",function(){
        return vars.font.align.value === "right" ? "0px" : "auto"
      })
      .style("height",vars.container.listHeight+"px")
      .style("padding",vars.ui.border+"px")
      .style("background-color",vars.ui.color.secondary.value)
      .style("z-index",function(){
        return vars.open.value ? "9999" : "-1";
      })
      .style("width",(vars.width.secondary-(vars.ui.border*2))+"px")
      .style("top",function(){
        return vars.open.flipped.value ? "auto" : vars.container.button.container().node().offsetHeight+"px"
      })
      .style("bottom",function(){
        return vars.open.flipped.value ? vars.container.button.container().node().offsetHeight+"px" : "auto"
      })
      .style("opacity",vars.open.value ? 1 : 0)

  }

  function finish(elem) {

    elem
      .style("top",function(){
        return vars.open.flipped.value ? "auto" : vars.container.button.container().node().offsetHeight+"px"
      })
      .style("bottom",function(){
        return vars.open.flipped.value ? vars.container.button.container().node().offsetHeight+"px" : "auto"
      })
      .style("display",!vars.open.value ? "none" : null)

    if (vars.search.enabled && vars.open.value) {
      vars.container.selector.select("div.d3plus_drop_search input").node().focus()
    }

  }

  var max_height = vars.open.value ? vars.height.secondary-searchHeight : 0

  if (!vars.draw.timing) {

    vars.container.selector.call(update).call(finish)

    vars.container.list
      .style("width",vars.width.secondary-vars.ui.border*2+"px")
      .style("max-height",max_height+"px")
      .property("scrollTop",vars.container.listScroll)

  }
  else {
    vars.container.selector.transition().duration(vars.draw.timing)
      .each("start",function(){
        d3.select(this)
          .style("display",vars.open.value ? "block" : null)
      })
      .call(update)
      .each("end",function(){

        d3.select(this).transition().duration(vars.draw.timing)
          .call(finish)

      })

    function scrollTopTween(scrollTop) {
        return function() {
            var i = d3.interpolateNumber(this.scrollTop, scrollTop);
            return function(t) { this.scrollTop = i(t); };
        };
    }

    vars.container.list.transition().duration(vars.draw.timing)
      .style("width",vars.width.secondary-vars.ui.border*2+"px")
      .style("max-height",max_height+"px")
      .tween("scroll",scrollTopTween(vars.container.listScroll))
  }

  if ( vars.dev.value ) d3plus.console.timeEnd("drawing list")

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// If no widths are defined, then this calculates the width needed to fit the
// longest entry in the list.
//------------------------------------------------------------------------------
d3plus.input.drop.width = function ( vars ) {

  function getWidth( type ) {

    var key  = type === "primary" ? "value" : type
      , icon = key === "value" ? vars.icon.drop.value
             : vars.icon.select.value || vars.icon.drop.value
      , text = key === "value" ? vars.text.value
             : vars.text.secondary.value || vars.text.value
      , font = key === "value" ? vars.font : vars.font.secondary

    if ( vars.dev.value ) d3plus.console.time("calculating "+type+" width")

    var button = d3plus.form()
      .container(d3plus.font.tester())
      .data({
        "large": 9999,
        "value": vars.data.value
      })
      .draw({ "update": false })
      .font( font )
      .icon({ "button": icon, "value": vars.icon.value })
      .id(vars.id.value)
      .timing({
        "ui": 0
      })
      .text( text )
      .type( "button" )
      .ui({
        "border": 0,
        "display": "inline-block",
        "margin": 0,
        "padding": vars.ui.padding
      })
      .width(false)
      .draw()

    var w = []
    button.selectAll("div.d3plus_node").each(function(o){
      w.push(this.offsetWidth)
    }).remove()

    var dropWidth = {}
    dropWidth[key] = d3.max(w) + vars.ui.border*2

    vars.self.width( dropWidth )

    if ( vars.dev.value ) d3plus.console.timeEnd("calculating "+type+" width")

  }

  if ( typeof vars.width.secondary !== "number" ) {

    if ( typeof vars.width.value === "number" ) {
      vars.self.width({"secondary": vars.width.value})
    }
    else {
      getWidth( "secondary" )
    }

  }

  if ( typeof vars.width.value !== "number" ) {

    if ( vars.text.value === vars.text.secondary ) {
      vars.self.width(vars.width.secondary)
    }
    else {
      getWidth( "primary" )
    }
  }

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Recursive function that applies a click event to all parent windows that
// will close the dropdown if it is open.
//------------------------------------------------------------------------------
d3plus.input.drop.window = function ( vars , elem ) {

  var self = this

  if ( elem === undefined ) {
    var elem = window
  }

  d3.select(elem).on("click."+vars.container.id,function(){

    var element = d3.event.target || d3.event.toElement

    if (!d3plus.util.child(vars.container.value,element) && vars.open.value) {
      self.toggle( vars )
    }

  })

  try {
    var same_origin = window.parent.location.host === window.location.host;
  }
  catch (e) {
    var same_origin = false
  }

  if (same_origin) {
    if (elem.self !== window.top) {
      self.window( vars , elem.parent )
    }
  }

}


})();
