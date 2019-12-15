var iDevice = (function() {
  var canvasElement = document.createElement('canvas')
  try {
    var context = canvasElement.getContext('webgl')
    var extension = context.getExtension('WEBGL_debug_renderer_info')
    var gpu = context.getParameter(extension.UNMASKED_RENDERER_WEBGL)
  }
  catch (e) {
    return
  }

  var matches = gpu.match(/^Apple (.+) GPU$/)
  var cpu = matches && matches[1]
  var s = screen.width + 'x' + screen.height
  var dpr = devicePixelRatio

  if (!cpu) {
    if (gpu == 'PowerVR SGX 535' && s == '768x1024' && dpr == 1) {
      return 'iPad 2/mini 1'
    }
    if (gpu == 'PowerVR SGX 543' && dpr == 2) {
      if (s == '320x480') {
        return 'iPhone 4s'
      }
      if (s == '768x1024') {
        return 'iPad 3'
      }
      if (s == '320x568') {
        if (navigator.userAgent.indexOf('iPod') > -1) {
          return 'iPod Touch 5'
        }
        return 'iPhone 5/5c'
      }
    }
    if (gpu == 'PowerVR SGX 554' && s == '768x1024' && dpr == 2) {
      return 'iPad 4'
    }
    return
  }

  if (cpu == 'A7') {
    if (s == '320x568') {
      return 'iPhone 5s'
    }
    if (s == '768x1024') {
      return 'iPad Air/mini 2/mini 3'
    }
  }

  var models = ['6', '6s', '7', '8']
  var cpuGeneration = parseInt(cpu.substr(1))
  if (cpuGeneration >= 8 && cpuGeneration <= 11) {
    if (s == '375x667') {
      return 'iPhone ' + models[cpuGeneration - 8]
    }
    if (s == '414x736') {
      return 'iPhone ' + models[cpuGeneration - 8] + ' Plus'
    }
  }

  if (cpu == 'A8') {
    if (s == '320x568') {
      return 'iPod Touch 6'
    }
    if (s == '768x1024') {
      return 'iPad mini 4'
    }
  }

  if (cpu == 'A8X') {
    return 'iPad Air 2'
  }

  if (cpu == 'A9') {
    if (s == '320x568') {
      return 'iPhone SE'
    }
    if (s == '768x1024') {
      return 'iPad (2017)'
    }
  }

  if (cpu == 'A9X') {
    if (s == '768x1024') {
      return 'iPad Pro 9.7 (2016)'
    }
    if (s == '1366x1024') {
      return 'iPad Pro 12.9 (2016)'
    }
  }

  if (cpu == 'A10') {
    if (s == '768x1024') {
      return 'iPad (2017)'
    }
  }

  if (cpu == 'A10X') {
    if (s == '1112x834') {
      return 'iPad Pro 10.5 (2017)'
    }
    if (s == '1366x1024') {
      return 'iPad Pro 12.9 (2017)'
    }
  }

  if (cpu == 'A11') {
    if (s == '375x812') {
      return 'iPhone X'
    }
  }

  if (cpu == 'A12') {
    if (s == '375x812') {
      return 'iPhone XS'
    }
    if (s == '414x896') {
      if (dpr == 2) {
        return 'iPhone XR'
      }
      if (dpr == 3) {
        return 'iPhone XS Max'
      }
    }
  }

  return 'Unidentified ' + cpu + ' ' + s + '@' + dpr
})();
