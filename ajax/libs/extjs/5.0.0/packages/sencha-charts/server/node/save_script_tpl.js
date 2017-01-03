var page = require('webpage').create();

var format = '#{format}';
var data = '#{data}';
var scale = parseInt('#{scale}', 10);
var width = parseInt('#{width}', 10);
var height = parseInt('#{height}', 10);

try {
    var pdfOptions = JSON.parse('#{pdf}' || null);
} catch (e) {
    console.error("Parsing PDF options failed.");
}

try {
    var jpegOptions = JSON.parse('#{jpeg}' || null);
} catch (e) {
    console.error("Parsing JPEG options failed.");
}

if (format === 'pdf') {
    page.paperSize = pdfOptions || { format: 'Letter', orientation: 'portrait', border: '1cm' };
}

page.content = '<img id="chart" src="' + data + '" style="-webkit-transform-origin: left top">';

// Let the content to render, then adjust viewport, clipRect and image size.
window.setTimeout(adjustSize, 1);

function adjustSize() {
    var naturalSize = page.evaluate(function () {
        // By default the body has some margin, but we don't want that to be a part of the rendered image.
        var style = document.createElement('style'),
            text = document.createTextNode('body { margin: 0 }');
        style.setAttribute('type', 'text/css');
        style.appendChild(text);
        document.head.insertBefore(style, document.head.firstChild);

        var img = document.getElementById('chart');

        return {
            width: img.naturalWidth,
            height: img.naturalHeight
        };
    });

    if (width && height) {
        if (width !== naturalSize.width || height !== naturalSize.height) {
            page.viewportSize = { width: width, height: height };
            page.clipRect = { left: 0, top: 0, width: width, height: height };
        }
    }

    page.evaluate(function (width, height) {
        var img = document.getElementById('chart');
        img.style.width = width;
        img.style.height = height;
    }, (width || naturalSize.width) * scale, (height || naturalSize.height) * scale);

    // Let the image to scale before rendering.
    window.setTimeout(render, 1);
}

function render() {
    page.render('#{filename}', { format: format, quality: jpegOptions && jpegOptions.quality || 80 });
    phantom.exit();
}
