/**
 * html2pdf.js v0.8.2
 * Copyright (c) 2017 Erik Koopmans
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('es6-promise/auto'), require('jspdf'), require('html2canvas')) :
	typeof define === 'function' && define.amd ? define(['es6-promise/auto', 'jspdf', 'html2canvas'], factory) :
	(global.html2pdf = factory(null,global.jsPDF,global.html2canvas));
}(this, (function (auto,jsPDF,html2canvas) { 'use strict';

jsPDF = jsPDF && jsPDF.hasOwnProperty('default') ? jsPDF['default'] : jsPDF;
html2canvas = html2canvas && html2canvas.hasOwnProperty('default') ? html2canvas['default'] : html2canvas;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

// Import dependencies.
// Get dimensions of a PDF page, as determined by jsPDF.
jsPDF.getPageSize = function (orientation, unit, format) {
  // Decode options object
  if ((typeof orientation === 'undefined' ? 'undefined' : _typeof(orientation)) === 'object') {
    var options = orientation;
    orientation = options.orientation;
    unit = options.unit || unit;
    format = options.format || format;
  }

  // Default options
  unit = unit || 'mm';
  format = format || 'a4';
  orientation = ('' + (orientation || 'P')).toLowerCase();
  var format_as_string = ('' + format).toLowerCase();

  // Size in pt of various paper formats
  var pageFormats = {
    'a0': [2383.94, 3370.39], 'a1': [1683.78, 2383.94],
    'a2': [1190.55, 1683.78], 'a3': [841.89, 1190.55],
    'a4': [595.28, 841.89], 'a5': [419.53, 595.28],
    'a6': [297.64, 419.53], 'a7': [209.76, 297.64],
    'a8': [147.40, 209.76], 'a9': [104.88, 147.40],
    'a10': [73.70, 104.88], 'b0': [2834.65, 4008.19],
    'b1': [2004.09, 2834.65], 'b2': [1417.32, 2004.09],
    'b3': [1000.63, 1417.32], 'b4': [708.66, 1000.63],
    'b5': [498.90, 708.66], 'b6': [354.33, 498.90],
    'b7': [249.45, 354.33], 'b8': [175.75, 249.45],
    'b9': [124.72, 175.75], 'b10': [87.87, 124.72],
    'c0': [2599.37, 3676.54], 'c1': [1836.85, 2599.37],
    'c2': [1298.27, 1836.85], 'c3': [918.43, 1298.27],
    'c4': [649.13, 918.43], 'c5': [459.21, 649.13],
    'c6': [323.15, 459.21], 'c7': [229.61, 323.15],
    'c8': [161.57, 229.61], 'c9': [113.39, 161.57],
    'c10': [79.37, 113.39], 'dl': [311.81, 623.62],
    'letter': [612, 792],
    'government-letter': [576, 756],
    'legal': [612, 1008],
    'junior-legal': [576, 360],
    'ledger': [1224, 792],
    'tabloid': [792, 1224],
    'credit-card': [153, 243]
  };

  // Unit conversion
  switch (unit) {
    case 'pt':
      var k = 1;break;
    case 'mm':
      var k = 72 / 25.4;break;
    case 'cm':
      var k = 72 / 2.54;break;
    case 'in':
      var k = 72;break;
    case 'px':
      var k = 72 / 96;break;
    case 'pc':
      var k = 12;break;
    case 'em':
      var k = 12;break;
    case 'ex':
      var k = 6;break;
    default:
      throw 'Invalid unit: ' + unit;
  }

  // Dimensions are stored as user units and converted to points on output
  if (pageFormats.hasOwnProperty(format_as_string)) {
    var pageHeight = pageFormats[format_as_string][1] / k;
    var pageWidth = pageFormats[format_as_string][0] / k;
  } else {
    try {
      var pageHeight = format[1];
      var pageWidth = format[0];
    } catch (err) {
      throw new Error('Invalid format: ' + format);
    }
  }

  // Handle page orientation
  if (orientation === 'p' || orientation === 'portrait') {
    orientation = 'p';
    if (pageWidth > pageHeight) {
      var tmp = pageWidth;
      pageWidth = pageHeight;
      pageHeight = tmp;
    }
  } else if (orientation === 'l' || orientation === 'landscape') {
    orientation = 'l';
    if (pageHeight > pageWidth) {
      var tmp = pageWidth;
      pageWidth = pageHeight;
      pageHeight = tmp;
    }
  } else {
    throw 'Invalid orientation: ' + orientation;
  }

  // Return information (k is the unit conversion ratio from pts)
  var info = { 'width': pageWidth, 'height': pageHeight, 'unit': unit, 'k': k };
  return info;
};

// Determine the type of a variable/object.
var objType = function objType(obj) {
  var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  if (type === 'undefined') return 'undefined';else if (type === 'string' || obj instanceof String) return 'string';else if (type === 'number' || obj instanceof Number) return 'number';else if (type === 'function' || obj instanceof Function) return 'function';else if (!!obj && obj.constructor === Array) return 'array';else if (obj && obj.nodeType === 1) return 'element';else if (type === 'object') return 'object';else return 'unknown';
};

// Create an HTML element with optional className, innerHTML, and style.
var createElement = function createElement(tagName, opt) {
  var el = document.createElement(tagName);
  if (opt.className) el.className = opt.className;
  if (opt.innerHTML) {
    el.innerHTML = opt.innerHTML;
    var scripts = el.getElementsByTagName('script');
    for (var i = scripts.length; i-- > 0; null) {
      scripts[i].parentNode.removeChild(scripts[i]);
    }
  }
  for (var key in opt.style) {
    el.style[key] = opt.style[key];
  }
  return el;
};

// Deep-clone a node and preserve contents/properties.
var cloneNode = function cloneNode(node, javascriptEnabled) {
  // Recursively clone the node.
  var clone = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);
  for (var child = node.firstChild; child; child = child.nextSibling) {
    if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
      clone.appendChild(cloneNode(child, javascriptEnabled));
    }
  }

  if (node.nodeType === 1) {
    // Preserve contents/properties of special nodes.
    if (node.nodeName === 'CANVAS') {
      clone.width = node.width;
      clone.height = node.height;
      clone.getContext('2d').drawImage(node, 0, 0);
    } else if (node.nodeName === 'TEXTAREA' || node.nodeName === 'SELECT') {
      clone.value = node.value;
    }

    // Preserve the node's scroll position when it loads.
    clone.addEventListener('load', function () {
      clone.scrollTop = node.scrollTop;
      clone.scrollLeft = node.scrollLeft;
    }, true);
  }

  // Return the cloned node.
  return clone;
};

// Convert units using the conversion value 'k' from jsPDF.
var unitConvert = function unitConvert(obj, k) {
  var newObj = {};
  for (var key in obj) {
    newObj[key] = obj[key] * 72 / 96 / k;
  }
  return newObj;
};

/**
 * Generate a PDF from an HTML element or string using html2canvas and jsPDF.
 *
 * @param {Element|string} source The source element or HTML string.
 * @param {Object=} opt An object of optional settings: 'margin', 'filename',
 *    'image' ('type' and 'quality'), and 'html2canvas' / 'jspdf', which are
 *    sent as settings to their corresponding functions.
 */
var html2pdf = function html2pdf(source, opt) {
  // Handle input.
  opt = objType(opt) === 'object' ? opt : {};
  var source = html2pdf.parseInput(source, opt);

  // Determine the PDF page size.
  var pageSize = jsPDF.getPageSize(opt.jsPDF);
  pageSize.inner = {
    width: pageSize.width - opt.margin[1] - opt.margin[3],
    height: pageSize.height - opt.margin[0] - opt.margin[2]
  };
  pageSize.inner.ratio = pageSize.inner.height / pageSize.inner.width;

  // Copy the source element into a PDF-styled container div.
  var container = html2pdf.makeContainer(source, pageSize);
  var overlay = container.parentElement;

  // Get the locations of all hyperlinks.
  if (opt.enableLinks) {
    // Find all anchor tags and get the container's bounds for reference.
    opt.links = [];
    var links = container.querySelectorAll('a');
    var containerRect = unitConvert(container.getBoundingClientRect(), pageSize.k);

    // Treat each client rect as a separate link (for text-wrapping).
    Array.prototype.forEach.call(links, function (link) {
      var clientRects = link.getClientRects();
      for (var i = 0; i < clientRects.length; i++) {
        var clientRect = unitConvert(clientRects[i], pageSize.k);
        clientRect.left -= containerRect.left;
        clientRect.top -= containerRect.top;
        opt.links.push({ el: link, clientRect: clientRect });
      }
    });
  }

  // Render the canvas and pass the result to makePDF.
  var onRendered = opt.html2canvas.onrendered || function () {};
  delete opt.html2canvas.onrendered;
  var done = function done(canvas) {
    onRendered(canvas);
    document.body.removeChild(overlay);
    html2pdf.makePDF(canvas, pageSize, opt);
  };
  html2canvas(container, opt.html2canvas).then(done);
};

html2pdf.parseInput = function (source, opt) {
  // Parse the opt object.
  opt.jsPDF = opt.jsPDF || {};
  opt.html2canvas = opt.html2canvas || {};
  opt.filename = opt.filename && objType(opt.filename) === 'string' ? opt.filename : 'file.pdf';
  opt.enableLinks = opt.hasOwnProperty('enableLinks') ? opt.enableLinks : true;
  opt.image = opt.image || {};
  opt.image.type = opt.image.type || 'jpeg';
  opt.image.quality = opt.image.quality || 0.95;

  // Parse the margin property of the opt object.
  switch (objType(opt.margin)) {
    case 'undefined':
      opt.margin = 0;
    case 'number':
      opt.margin = [opt.margin, opt.margin, opt.margin, opt.margin];
      break;
    case 'array':
      if (opt.margin.length === 2) {
        opt.margin = [opt.margin[0], opt.margin[1], opt.margin[0], opt.margin[1]];
      }
      if (opt.margin.length === 4) {
        break;
      }
    default:
      throw 'Invalid margin array.';
  }

  // Parse the source element/string.
  if (!source) {
    throw 'Missing source element or string.';
  } else if (objType(source) === 'string') {
    source = createElement('div', { innerHTML: source });
  } else if (objType(source) === 'element') {
    source = cloneNode(source, opt.html2canvas.javascriptEnabled);
  } else {
    throw 'Invalid source - please specify an HTML Element or string.';
  }

  // Return the parsed input (opt is modified in-place, no need to return).
  return source;
};

html2pdf.makeContainer = function (source, pageSize) {
  // Define the CSS styles for the container and its overlay parent.
  var overlayCSS = {
    position: 'fixed', overflow: 'hidden', zIndex: 1000,
    left: 0, right: 0, bottom: 0, top: 0,
    backgroundColor: 'rgba(0,0,0,0.8)'
  };
  var containerCSS = {
    position: 'absolute', width: pageSize.inner.width + pageSize.unit,
    left: 0, right: 0, top: 0, height: 'auto', margin: 'auto',
    backgroundColor: 'white'
  };

  // Set the overlay to hidden (could be changed in the future to provide a print preview).
  overlayCSS.opacity = 0;

  // Create and attach the elements.
  var overlay = createElement('div', { className: 'html2pdf__overlay', style: overlayCSS });
  var container = createElement('div', { className: 'html2pdf__container', style: containerCSS });
  container.appendChild(source);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  // Enable page-breaks.
  var pageBreaks = source.querySelectorAll('.html2pdf__page-break');
  var pxPageHeight = pageSize.inner.height * pageSize.k / 72 * 96;
  Array.prototype.forEach.call(pageBreaks, function (el) {
    el.style.display = 'block';
    var clientRect = el.getBoundingClientRect();
    el.style.height = pxPageHeight - clientRect.top % pxPageHeight + 'px';
  }, this);

  // Return the container.
  return container;
};

html2pdf.makePDF = function (canvas, pageSize, opt) {
  // Calculate the number of pages.
  var ctx = canvas.getContext('2d');
  var pxFullHeight = canvas.height;
  var pxPageHeight = Math.floor(canvas.width * pageSize.inner.ratio);
  var nPages = Math.ceil(pxFullHeight / pxPageHeight);

  // Create a one-page canvas to split up the full image.
  var pageCanvas = document.createElement('canvas');
  var pageCtx = pageCanvas.getContext('2d');
  var pageHeight = pageSize.inner.height;
  pageCanvas.width = canvas.width;
  pageCanvas.height = pxPageHeight;

  // Initialize the PDF.
  var pdf = new jsPDF(opt.jsPDF);

  for (var page = 0; page < nPages; page++) {
    // Trim the final page to reduce file size.
    if (page === nPages - 1) {
      pageCanvas.height = pxFullHeight % pxPageHeight;
      pageHeight = pageCanvas.height * pageSize.inner.width / pageCanvas.width;
    }

    // Display the page.
    var w = pageCanvas.width;
    var h = pageCanvas.height;
    pageCtx.fillStyle = 'white';
    pageCtx.fillRect(0, 0, w, h);
    pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

    // Add the page to the PDF.
    if (page) pdf.addPage();
    var imgData = pageCanvas.toDataURL('image/' + opt.image.type, opt.image.quality);
    pdf.addImage(imgData, opt.image.type, opt.margin[1], opt.margin[0], pageSize.inner.width, pageHeight);

    // Add hyperlinks.
    if (opt.enableLinks) {
      var pageTop = page * pageSize.inner.height;
      opt.links.forEach(function (link) {
        if (link.clientRect.top > pageTop && link.clientRect.top < pageTop + pageSize.inner.height) {
          var left = opt.margin[1] + link.clientRect.left;
          var top = opt.margin[0] + link.clientRect.top - pageTop;
          pdf.link(left, top, link.clientRect.width, link.clientRect.height, { url: link.el.href });
        }
      });
    }
  }

  // Finish the PDF.
  pdf.save(opt.filename);
};

return html2pdf;

})));
