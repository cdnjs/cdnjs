import knot from 'knot.js'

export default (options = {}) => {
  // globals

  let persist           // updating or packing all elements?
  let ticking           // for debounced resize

  let sizeIndex
  let sizeDetail

  let columnHeights

  let nodes
  let nodesWidth
  let nodesHeights

  // options

  const container = document.querySelector(options.container)
  const packed    = options.packed.indexOf('data-') === 0 ? options.packed : `data-${ options.packed }`
  const sizes     = options.sizes.reverse()

  const selectors = {
    all: `${ options.container } > *`,
    new: `${ options.container } > *:not([${ packed }])`
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

  function toArray(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector))
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
    nodes = toArray(persist ? selectors.new : selectors.all)
  }

  function setNodesDimensions() {
    nodesWidth   = nodes[0].clientWidth
    nodesHeights = nodes.map(element => element.clientHeight)
  }

  function setNodesStyles() {
    nodes.forEach((element, index) => {
      const target = columnHeights.indexOf(Math.min.apply(Math, columnHeights))

      element.style.position  = 'absolute'
      element.style.top       = `${ columnHeights[target] }px`
      element.style.left      = `${ (target * nodesWidth) + (target * sizeDetail.gutter) }px`

      element.setAttribute(packed, '')

      columnHeights[target] += nodesHeights[index] + sizeDetail.gutter
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

  function resize() {
    window.addEventListener('resize', resizeFrame)

    return instance
  }
}
