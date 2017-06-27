import knot from 'knot.js'

export default (options = {}) => {
  // slice alias

  const chop = Array.prototype.slice

  // globals

  let persist           // packing new elements, or all elements?
  let ticking           // for debounced resize

  let sizeIndex
  let sizeDetail

  let columnTarget
  let columnHeights

  let nodeTop
  let nodeLeft
  let nodeHeight

  let nodes
  let nodesWidth
  let nodesHeights

  // resolve options

  const packed    = options.packed.indexOf('data-') === 0 ? options.packed : `data-${ options.packed }`
  const sizes     = options.sizes.slice().reverse()
  const position  = options.position !== false

  const container = options.container.nodeType
    ? options.container
    : document.querySelector(options.container)

  const selectors = {
    all: () => toArray(container.children),
    new: () => toArray(container.children).filter(node => !node.hasAttribute(`${ packed }`))
  }

  // series

  const setup = [
    setSizeIndex,
    setSizeDetail,
    setColumns
  ]

  const run = [
    setNodes,
    setNodesDimensions,
    setNodesStyles,
    setContainerStyles
  ]

  // instance

  const instance = knot({
    pack,
    update,
    resize
  })

  return instance

  // general helpers

  function runSeries(functions) {
    functions.forEach(func => func())
  }

  // array helpers

  function toArray(input, scope = document) {
    return chop.call(input)
  }

  function fillArray(length) {
    return Array.apply(null, Array(length)).map(() => 0)
  }

  // size helpers

  function getSizeIndex() {
    // find index of widest matching media query
    return sizes
      .map(size => size.mq && window.matchMedia(`(min-width: ${ size.mq })`).matches)
      .indexOf(true)
  }

  function setSizeIndex() {
    sizeIndex = getSizeIndex()
  }

  function setSizeDetail() {
    // if no media queries matched, use the base case
    sizeDetail = sizeIndex === -1
      ? sizes[sizes.length - 1]
      : sizes[sizeIndex]
  }

  // column helpers

  function setColumns() {
    columnHeights = fillArray(sizeDetail.columns)
  }

  // node helpers

  function setNodes() {
    nodes = selectors[persist ? 'new' : 'all']()
  }

  function setNodesDimensions() {
    if(nodes.length === 0) {
      return
    }

    nodesWidth   = nodes[0].clientWidth
    nodesHeights = nodes.map(element => element.clientHeight)
  }

  function setNodesStyles() {
    nodes.forEach((element, index) => {
      columnTarget = columnHeights.indexOf(Math.min.apply(Math, columnHeights))

      element.style.position  = 'absolute'

      nodeTop  = `${ columnHeights[columnTarget] }px`
      nodeLeft = `${ (columnTarget * nodesWidth) + (columnTarget * sizeDetail.gutter) }px`

      // support positioned elements (default) or transformed elements
      if(position) {
        element.style.top  = nodeTop
        element.style.left = nodeLeft
      } else {
        element.style.transform = `translate3d(${ nodeLeft }, ${ nodeTop }, 0)`
      }

      element.setAttribute(packed, '')

      // ignore nodes with no height
      nodeHeight = nodesHeights[index]

      if(nodeHeight) {
        columnHeights[columnTarget] += nodeHeight + sizeDetail.gutter
      }
    })
  }

  // container helpers

  function setContainerStyles() {
    container.style.position = 'relative'
    container.style.width    = `${ sizeDetail.columns * nodesWidth + (sizeDetail.columns - 1) * sizeDetail.gutter }px`
    container.style.height   = `${ Math.max.apply(Math, columnHeights) - sizeDetail.gutter }px`
  }

  // resize helpers

  function resizeFrame() {
    if(!ticking) {
      requestAnimationFrame(resizeHandler)
      ticking = true
    }
  }

  function resizeHandler() {
    if(sizeIndex !== getSizeIndex()) {
      pack()
      instance.emit('resize', sizeDetail)
    }

    ticking = false
  }

  // API

  function pack() {
    persist = false
    runSeries(setup.concat(run))

    return instance.emit('pack')
  }

  function update() {
    persist = true
    runSeries(run)

    return instance.emit('update')
  }

  function resize(flag = true) {
    const action = flag
      ? 'addEventListener'
      : 'removeEventListener'

    window[action]('resize', resizeFrame)

    return instance
  }
}
