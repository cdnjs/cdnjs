function html2pdf(source, target, optPDF, margin, dpi) {
	// Default options
	if (!source)	return;
	target = target || 'file.pdf';
	optPDF = optPDF || {};
	if (typeof margin !== 'number')	margin = 1;
	dpi = dpi || 144;

	// Parse the jsPDF information
	var info = jsPDF_getSize(optPDF);

	// Calculate the div size (without margin) and aspect ratio
	var optCanvas = {width: info.width - margin*2,	height: info.height - margin*2};
	optCanvas.ratio = optCanvas.height / optCanvas.width;

	// Canvas pixel height (necessary for setting canvas page height later)
	var kpx = 72 / 96;
	optCanvas.pxheight = optCanvas.height * (info.k / kpx) * (dpi / 96);

	// Set up CSS styles
	html2pdf_setStyle( '.pdfpage {width: ' + optCanvas.width + info.unit + '; height: ' + optCanvas.height + info.unit +
		'; overflow: hidden;}' );

	// Make the template div that will be used as a model for the canvas
	var divs = html2pdf_makeTemplate(source, optCanvas, info);

	// Make the canvas, which will make the PDF once it's rendered
	var canvasOptions = {
		dpi: dpi,
		onrendered: function(canvas) {
			for (var key in divs)	document.body.removeChild(divs[key]);
			html2pdf_makePDF(canvas, target, optCanvas, optPDF);
		}
	};
	html2canvas(divs.template, canvasOptions);
}

function html2pdf_makeTemplate(source, optCanvas, info) {
	// CSS helper function
	function setStyle(element, style) {
		for (var key in style)
			element.style[key] = style[key];
	}

	// Set up the CSS for the template and its parent overlay
	overlayCSS = {
		position: 'fixed',	backgroundColor: 'rgba(0,0,0,0.8)',	zIndex: 1000,
		left: 0,	right: 0,	bottom: 0,	top: 0 };
	templateCSS = {
		position: 'absolute',	backgroundColor: 'white',		zIndex: 1001,
		left: 0,	right: 0,	top: 0,
		margin: 'auto',	width: optCanvas.width + info.unit };

	// Create the template div that will be used as a model for the canvas
	if (typeof source === 'string') {
		var template = document.createElement('div');
		template.innerHTML = source;
	} else {
		var template = source.cloneNode(true);
	}

	// Create the overlay and set styles
	var overlay = document.createElement('div');
	setStyle(overlay, overlayCSS);
	setStyle(template, templateCSS);

	// Attach template and overlay to the document
	document.body.appendChild(overlay);
	document.body.appendChild(template);

	var divs = {overlay: overlay,	template: template};
	return divs;
}

function html2pdf_makePDF(canvas, target, optCanvas, optPDF) {
	// Make the PDF and get canvas context
	var pdf = new jsPDF(optPDF);
	var ctx = canvas.getContext('2d');

	// Break full canvas into pages
	var fullHeight = canvas.height;
//	var pageHeight = Math.floor(canvas.width * optCanvas.ratio);
	var pageHeight = optCanvas.pxheight;
	var nPages = Math.ceil(fullHeight / pageHeight);

	// Capture the full canvas image, then reduce it to one page
	var imgFull = ctx.getImageData(0, 0, canvas.width, canvas.height);
	canvas.height = pageHeight;

	// Loop through each page
	for (var page=0; page<nPages; page++) {
		// Display the page
		ctx.fillStyle = '#FFFFFF';
//		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillRect(-10, -10, canvas.width+20, canvas.height+20);
		ctx.putImageData(imgFull, 0, -page*pageHeight);

		// Add the page to the PDF
		if (page)	pdf.addPage();
		var imgData = canvas.toDataURL('image/jpeg', 0.95);
		pdf.addImage(imgData, 'JPEG', margin, margin, optCanvas.width, optCanvas.height);
	}

	// Complete the PDF
	pdf.save( target );
}

function html2pdf_setStyle(css) {
	var head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);
}

function jsPDF_getSize(orientation, unit, format) {
	var options = {};

	// Decode options object
	if (typeof orientation === 'object') {
		options = orientation;

		orientation = options.orientation;
		unit = options.unit || unit;
		format = options.format || format;
	}

	// Default options
	unit        = unit || 'mm';
	format      = format || 'a4';
	orientation = ('' + (orientation || 'P')).toLowerCase();
	var format_as_string = ('' + format).toLowerCase();

	// Size in pt of various paper formats
	pageFormats = {
		'a0'  : [2383.94, 3370.39], 'a1'  : [1683.78, 2383.94],
		'a2'  : [1190.55, 1683.78], 'a3'  : [ 841.89, 1190.55],
		'a4'  : [ 595.28,  841.89], 'a5'  : [ 419.53,  595.28],
		'a6'  : [ 297.64,  419.53], 'a7'  : [ 209.76,  297.64],
		'a8'  : [ 147.40,  209.76], 'a9'  : [ 104.88,  147.40],
		'a10' : [  73.70,  104.88], 'b0'  : [2834.65, 4008.19],
		'b1'  : [2004.09, 2834.65], 'b2'  : [1417.32, 2004.09],
		'b3'  : [1000.63, 1417.32], 'b4'  : [ 708.66, 1000.63],
		'b5'  : [ 498.90,  708.66], 'b6'  : [ 354.33,  498.90],
		'b7'  : [ 249.45,  354.33], 'b8'  : [ 175.75,  249.45],
		'b9'  : [ 124.72,  175.75], 'b10' : [  87.87,  124.72],
		'c0'  : [2599.37, 3676.54], 'c1'  : [1836.85, 2599.37],
		'c2'  : [1298.27, 1836.85], 'c3'  : [ 918.43, 1298.27],
		'c4'  : [ 649.13,  918.43], 'c5'  : [ 459.21,  649.13],
		'c6'  : [ 323.15,  459.21], 'c7'  : [ 229.61,  323.15],
		'c8'  : [ 161.57,  229.61], 'c9'  : [ 113.39,  161.57],
		'c10' : [  79.37,  113.39], 'dl'  : [ 311.81,  623.62],
		'letter'            : [612,   792],
		'government-letter' : [576,   756],
		'legal'             : [612,  1008],
		'junior-legal'      : [576,   360],
		'ledger'            : [1224,  792],
		'tabloid'           : [792,  1224],
		'credit-card'       : [153,   243]
	};

	// Unit conversion
	switch (unit) {
		case 'pt':  k = 1;          break;
		case 'mm':  k = 72 / 25.4;  break;
		case 'cm':  k = 72 / 2.54;  break;
		case 'in':  k = 72;         break;
		case 'px':  k = 96 / 72;    break;
		case 'pc':  k = 12;         break;
		case 'em':  k = 12;         break;
		case 'ex':  k = 6;          break;
		default:
			throw ('Invalid unit: ' + unit);
	}

	// Dimensions are stored as user units and converted to points on output
	if (pageFormats.hasOwnProperty(format_as_string)) {
		pageHeight = pageFormats[format_as_string][1] / k;
		pageWidth = pageFormats[format_as_string][0] / k;
	} else {
		try {
			pageHeight = format[1];
			pageWidth = format[0];
		} catch (err) {
			throw new Error('Invalid format: ' + format);
		}
	}

	// Handle page orientation
	if (orientation === 'p' || orientation === 'portrait') {
		orientation = 'p';
		if (pageWidth > pageHeight) {
			tmp = pageWidth;
			pageWidth = pageHeight;
			pageHeight = tmp;
		}
	} else if (orientation === 'l' || orientation === 'landscape') {
		orientation = 'l';
		if (pageHeight > pageWidth) {
			tmp = pageWidth;
			pageWidth = pageHeight;
			pageHeight = tmp;
		}
	} else {
		throw('Invalid orientation: ' + orientation);
	}

	// Return information
	var info = { 'width': pageWidth, 'height': pageHeight, 'unit': unit, 'k': k };
	return info;
}
