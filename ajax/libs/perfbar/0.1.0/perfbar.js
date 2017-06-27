window.perfBar = window.perfBar || {};


(function() {
  

  perfBar.init = function(config) {
    var classList = require('./classList.js')
    var barTemplate = require('./templates/bar.hbs')

    document.body.innerHTML += barTemplate()

    // classList polyfill
    classList()

    // caching elements
    this.el = document.getElementById('perfBar')
    this.metricsContainer = this.el.querySelector('.perfBar-cf')
    this.disabledMetrics = {}

    config = config || {}
    this.config = config

    // private method that handles clicks on #perfBar (show/hide) stuff.
    _handleClick()

    // no window.performance? no partyy :( – I'm looking at you Safari!
    this.perf = window.performance || window.msPerformance || window.webkitPerformance || window.mozPerformance;

    // if perfBar is lazy loaded then ignore onload
    if ( config.lazy ) {
      this.__runner()
      return
    }
    window.onload = this.__runner

  }

  perfBar.__runner = function() {
    setTimeout(function() {
      if ( perfBar.perf )  {
        perfBar.runPerfMetrics('perf')
      }

      perfBar.runPerfMetrics('others')
    }, 1000)
  }



  perfBar.metricTemplate = function(metric) {
    var template = require('./templates/stat.hbs')

    var budget = metric.budget

    if ( budget && Object.keys(budget).length ) {
      createHint(metric)
      if ( budget.max >= metric.value || budget.min <= metric.value ) metric.isGood = true
      if ( budget.max <= metric.value || budget.min >= metric.value ) metric.isBad = true
    }

    return template(metric)
  }

  perfBar.metrics = {}


  perfBar.addMetric = function(metric) {
    if ( typeof metric !== 'object' ) return new Error('metric is not an Object.')
    if ( !metric.id )    return new Error('Id can\'t be empty.')
    if ( !metric.label ) return new Error('Label can\'t be empty.')
    if ( !metric.hasOwnProperty('value') ) return new Error('Value can\'t be empty.')

    // if metric is disabled do nothing
    if ( this.disabledMetrics[metric.id] ) return;

    this.mergeBudget(metric)

    var el = document.getElementById("perfBar-metric-" + metric.id)

    // if metric is already created with the same id, then overwrite it.
    if ( this.metrics[metric.id] && el ) {
      el.outerHTML = this.metricTemplate(metric)
      this.metrics[metric.id] = metric
      return
    }

    this.metricsContainer.innerHTML += this.metricTemplate(metric)

    this.metrics[metric.id] = metric


  }

  perfBar.updateMetric = function(id, update) {
    if ( typeof update !== 'object' ) return new Error('update is not an Object.')

    if ( !Object.keys(update).length ) return;

    if ( !this.metrics[id] ) {
      update.id = id;
      return this.addMetric(update);
    }

    for ( var key in update ) {
      if ( !update.hasOwnProperty(key) ) return;

      switch (key) {
        case "value":
          this.metrics[id].value = update[key]
          break
        case "label":
          this.metrics[id].label = update[key]
          break
        case "unit":
          this.metrics[id].unit  = update[key]
          break
        case "budget":
          this.metrics[id].budget  = update[key]
          break
      }
    }

    document.getElementById("perfBar-metric-" + id).outerHTML = this.metricTemplate(this.metrics[id])
  }

  perfBar.deleteMetric = function(id) {
    if ( !id || !this.metrics[id] ) return;

    (document.getElementById("perfBar-metric-" + id)).remove()
    return delete this.metrics[id];
  }

  perfBar.enable = function(id) {
    if ( !id ) return;
    if ( !this.disabledMetrics[id] ) return true;

    delete this.disabledMetrics[id]

    if ( this.metrics[id] ) this.addMetric(this.metrics[id])

    return true
  }

  perfBar.disable = function(id) {
    if ( !id ) return;
    if ( this.disabledMetrics[id] ) return true;

    this.disabledMetrics[id] = this.metrics[id]

    return (document.getElementById("perfBar-metric-" + id)).remove()
  }

  var perfMetrics = { perf: [], others: [] }
  perfBar.runPerfMetrics = function(type) {
    for (var i = 0; i < perfMetrics[type].length; i++) {
      perfMetrics[type][i]()
    }

    delete perfMetrics[type];
  }


  perfMetrics.perf.push(function addLoadTime() {
    perfBar.addMetric({
      id: 'loadTime',
      value: ( perfBar.perf.timing.loadEventStart - perfBar.perf.timing.navigationStart ),
      unit: 'ms',
      label: 'Load Time',
      budget: {
        max: 5000
      }
    })
  })


  perfMetrics.perf.push(function addLatency() {
    perfBar.addMetric({
      id: 'latency',
      value: ( perfBar.perf.timing.responseStart - perfBar.perf.timing.connectStart ) ,
      unit: 'ms',
      label: 'Latency',
      budget: {
        max: 50
      }
    })
  })

  perfMetrics.perf.push(function addFirstPaint() {
    var firstPaint = 0
    var firstPaintTime = 0

    // Taken from https://github.com/addyosmani/timing.js
    // Chrome
    if (window.chrome && window.chrome.loadTimes) {
        // Convert to ms
        firstPaint = window.chrome.loadTimes().firstPaintTime * 1000
        firstPaintTime = firstPaint - (window.chrome.loadTimes().startLoadTime*1000)
    }
    // IE
    else if (typeof window.performance.timing.msFirstPaint === 'number') {
        firstPaint = window.performance.timing.msFirstPaint
        firstPaintTime = firstPaint - window.performance.timing.navigationStart
    }

    if ( !firstPaintTime ) return
    perfBar.addMetric({
      id: 'FirstPaint',
      value: Math.round(firstPaintTime),
      unit: 'ms',
      label: 'First Paint',
      budget: {
        max: 100
      }
    })
  })

  perfMetrics.perf.push(function addFrontEnd() {
    var max = Math.round( ( perfBar.perf.timing.loadEventStart - perfBar.perf.timing.navigationStart ) * 0.8 )

    perfBar.addMetric({
      id: 'frontEnd',
      value: (perfBar.perf.timing.loadEventStart - perfBar.perf.timing.responseEnd ),
      unit: 'ms',
      label: 'Front End',
      budget: {
        max: max
      }
    })
  })

  perfMetrics.perf.push(function addBackEnd() {
    var max = Math.round( ( perfBar.perf.timing.loadEventStart - perfBar.perf.timing.navigationStart ) * 0.2 )

    perfBar.addMetric({
      id: 'backEnd',
      value: (perfBar.perf.timing.responseEnd - perfBar.perf.timing.navigationStart ),
      unit: 'ms',
      label: 'Back End',
      budget: {
        max: max
      }
    })

  })

  perfMetrics.perf.push(function addResDuration() {
    perfBar.addMetric({
      id: 'respnseDuration',
      value: (perfBar.perf.timing.responseEnd - perfBar.perf.timing.responseStart ),
      unit: 'ms',
      label: 'Response Duration',
    })
  })

  perfMetrics.perf.push(function addReqDuration() {
    perfBar.addMetric({
      id: 'requestDuration',
      value: (perfBar.perf.timing.responseStart - perfBar.perf.timing.requestStart ),
      unit: 'ms',
      label: 'Request Duration',
    })
  })

  perfMetrics.perf.push(function addRedirectsCount() {
    if ( !perfBar.perf.navigation ) return
    perfBar.addMetric({
      id: 'redirectCount',
      value: perfBar.perf.navigation.redirectCount,
      label: 'Redirects',
    })
  })

  perfMetrics.perf.push(function addLoadEventTime() {
    perfBar.addMetric({
      id: 'loadEventTime',
      value: (perfBar.perf.timing.loadEventEnd - perfBar.perf.timing.loadEventStart ),
      unit: 'ms',
      label: 'Load Event duration',
    })
  })

  perfMetrics.perf.push(function addDomLoaded() {
    perfBar.addMetric({
      id: 'domContentLoaded',
      value: (perfBar.perf.timing.domContentLoadedEventStart - perfBar.perf.timing.domInteractive ),
      unit: 'ms',
      label: 'DOM Content loaded',
    })
  })


  perfMetrics.perf.push(function addProcessing() {
    perfBar.addMetric({
      id: 'processing',
      value: perfBar.perf.timing.loadEventStart - perfBar.perf.timing.domLoading,
      unit: 'ms',
      label: 'Processing Duration',
    })
  })

  perfMetrics.others.push(function addNumOfEl() {
    perfBar.addMetric({
      id: 'numOfEl',
      value: document.documentElement.querySelectorAll('*').length,
      label: 'DOM elements',
    })
  })

  perfMetrics.others.push(function addCssCount() {
    perfBar.addMetric({
      id: 'cssCount',
      value: document.querySelectorAll('link[rel="stylesheet"]').length,
      label: 'CSS',
    })
  })

  perfMetrics.others.push(function addJsCount() {
    perfBar.addMetric({
      id: 'jsCount',
      value: document.querySelectorAll('script').length,
      label: 'JavaScript',
    })
  })

  perfMetrics.others.push(function addImgCount() {
    perfBar.addMetric({
      id: 'imgCount',
      value: document.querySelectorAll('img').length,
      label: 'Images',
    })
  })

  perfMetrics.others.push(function addDataURI() {
    var count = 0
    var images = document.querySelectorAll('img[src]')

    for (var i = 0; i < images.length; i++) {
      if ( images[i].src.match(/^data:+/) ) count++
    }
    perfBar.addMetric({
      id: 'dataURIImagesCount',
      value: count,
      label: 'Data URI images',
    })
  })

  perfMetrics.others.push(function addInlineCssCount() {
    perfBar.addMetric({
      id: 'inlineCSSCount',
      value: document.querySelectorAll('style').length,
      label: 'Inline CSS',
    })

  })

  perfMetrics.others.push(function addInlineCss() {
    var js = document.querySelectorAll('script')
    var count = 0
    for (var i = 0; i < js.length; i++) {
      if ( !js[i].src ) count++
    }

    perfBar.addMetric({
      id: 'inlineJSCount',
      value: count,
      label: 'Inline JavaScript',
    })
  })

  perfMetrics.others.push(function add3rdCss() {
    var css = document.querySelectorAll('link[rel="stylesheet"]')
    var links = []
    for (var i = 0; i < css.length; i++) {
      links.push(css[i].href)
    }
    var count = isThirdParty(links)

    perfBar.addMetric({
      id: 'thirdCSS',
      value: count,
      label: '3rd Party CSS',
    })
  })

  perfMetrics.others.push(function add3rdCss() {
    var js = document.querySelectorAll('script[src]')
    var links = []
    for (var i = 0; i < js.length; i++) {
      links.push(js[i].src)
    }
    var count = isThirdParty(links)
    perfBar.addMetric({
      id: 'thirdJS',
      value: count,
      label: '3rd Party JavaScript',
    })
  })

  perfMetrics.others.push(function addGlobJS() {
    var count = countGlobals()
    perfBar.addMetric({
      id: 'globalJS',
      value: count,
      label: 'JavaScript Globals',
    })
  })

  perfBar.mergeBudget = function(metric) {
    if ( !this.config.budget ) return
    if ( !this.config.budget[metric.id] ) return

    var budget = this.config.budget

    if ( !metric.budget || typeof metric.budget != "object" ) {
      metric.budget = budget[metric.id]
      return
    }

    if ( budget[metric.id].max ) metric.budget.max = budget[metric.id].max
    if ( budget[metric.id].min ) metric.budget.min = budget[metric.id].min

  }

  function createHint(metric) {
    var budget = metric.budget
    var minText = "Min Value is "
    var maxText = "Max Value is "
    var unitText = metric.unit || ""
    var hint = []

    if ( budget.hasOwnProperty('min') ) 
      hint.push(minText + budget.min + unitText + ".")

    if ( budget.hasOwnProperty('max') ) 
      hint.push(maxText + budget.max + unitText + ".")

    metric.hint = hint.join(" ")
  }

  function countGlobals() {
    var differences = {},
        exceptions, 
        globals = {},
        i,
        iframe = document.createElement('iframe');

    for (i in window) {
      differences[i] = {
        'type': typeof window[i],
        'val': window[i]
      }
    }
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.src = 'about:blank';
    iframe = iframe.contentWindow || iframe.contentDocument;
    for (i in differences) {
      if (typeof iframe[i] != 'undefined') delete differences[i];
      else if (globals[differences[i].type]) delete differences[i]
    }
    exceptions = 'addEventListener,document,location,navigator,window,perfBar'.split(',');
    i = exceptions.length;
    while (--i) {
      delete differences[exceptions[i]]
    }
    return Object.keys(differences).length
  }

  
  function isThirdParty(links) {
    var a = document.createElement('a')
    var counter = 0

    for (var i = 0; i < links.length; i++) {
      a.href = links[i]
      if ( a.hostname != window.location.hostname ) counter++
    }

    return counter
  }

  

  // private method that handles clicks on #perfBar (show/hide) stuff.
  function _handleClick() {
    perfBar.el.querySelector('.perfBar-bar').addEventListener('click', function(e) {
      perfBar.el.classList.toggle('perfBar-is-active')
    })
  }

})()