/*jslint evil: true */

var WaveDrom = {
	timer: 0,
	lane: {
		xs     : 20,    // tmpgraphlane0.width
		ys     : 20,    // tmpgraphlane0.height
		xg     : 120,   // tmpgraphlane0.x
		//		yg     : 0,     // head gap
		yh0    : 0,     // head gap title
		yh1    : 0,     // head gap
		yf0    : 0,     // foot gap
		yf1    : 0,     // foot gap
		y0     : 5,    // tmpgraphlane0.y
		yo     : 30,    // tmpgraphlane1.y - y0;
		tgo    : -10,   // tmptextlane0.x - xg;
		ym     : 15,    // tmptextlane0.y - y0
		xlabel : 6,     // tmptextlabel.x - xg;
		xmax   : 1,
		scale  : 1,
		head   : {},
		foot   : {}
	},
	canvas: {
		heigth : 85 // tmpview.height;
	},
	panela: {
		ys : 200
	},
	genBrick: function (texts, extra, times) {
		"use strict";
		var i, j, R = [];

		if (texts.length === 4) {
			for (j = 0; j < times; j += 1) {
				R.push(texts[0]);
				for (i = 0; i < extra; i += 1) {
					R.push(texts[1]);
				}
				R.push(texts[2]);
				for (i = 0; i < extra; i += 1) {
					R.push(texts[3]);
				}
			}
			return R;
		}
		if (texts.length === 1) {
			texts.push(texts[0]);
		}
		R.push(texts[0]);
		for (i = 0; i < (times * (2 * (extra + 1)) - 1); i += 1) {
			R.push(texts[1]);
		}
		return R;
	},
	genFirstWaveBrick: function (text, extra, times) {
		"use strict";
		var i, tmp = [];
		switch (text) {
			case 'p': tmp = this.genBrick(['pclk', '111', 'nclk', '000'], extra, times); break;
			case 'n': tmp = this.genBrick(['nclk', '000', 'pclk', '111'], extra, times); break;
			case 'P': tmp = this.genBrick(['Pclk', '111', 'nclk', '000'], extra, times); break;
			case 'N': tmp = this.genBrick(['Nclk', '000', 'pclk', '111'], extra, times); break;
			case 'l':
			case 'L':
			case '0': tmp = this.genBrick(['000'], extra, times); break;
			case 'h':
			case 'H':
			case '1': tmp = this.genBrick(['111'], extra, times); break;
			case '=': tmp = this.genBrick(['vvv-2'], extra, times); break;
			case '2': tmp = this.genBrick(['vvv-2'], extra, times); break;
			case '3': tmp = this.genBrick(['vvv-3'], extra, times); break;
			case '4': tmp = this.genBrick(['vvv-4'], extra, times); break;
			case '5': tmp = this.genBrick(['vvv-5'], extra, times); break;
			case 'd': tmp = this.genBrick(['ddd'], extra, times); break;
			case 'u': tmp = this.genBrick(['uuu'], extra, times); break;
			case 'z': tmp = this.genBrick(['zzz'], extra, times); break;
			default:  tmp = this.genBrick(['xxx'], extra, times); break;
		}
		return tmp;
	},
	genWaveBrick: function (text, extra, times) {
		"use strict";
		var x1, x2, x3, y1, y2, x4, x5, x6, xclude, atext, tmp0, tmp1, tmp2, tmp3, tmp4;
		x1 = {p:'pclk', n:'nclk', P:'Pclk', N:'Nclk', h:'pclk', l:'nclk', H:'Pclk', L:'Nclk'};
		x2 = {'0':'0', '1':'1', 'x':'x', 'd':'d', 'u':'u', 'z':'z', '=':'v', '2':'v', '3':'v', '4':'v', '5':'v'};
		x3 = {'0': '', '1': '', 'x': '', 'd': '', 'u': '', 'z': '', '=':'-2','2':'-2','3':'-3','4':'-4','5':'-5'};
		y1 = {
			'p':'0', 'n':'1',
			'P':'0', 'N':'1',
			'h':'1', 'l':'0',
			'H':'1', 'L':'0',
			'0':'0', '1':'1', 'x':'x', 'd':'d', 'u':'u', 'z':'z', '=':'v', '2':'v', '3':'v', '4':'v', '5':'v'
		};
		y2 = {
			'p': '', 'n': '',
			'P': '', 'N': '',
			'h': '', 'l': '',
			'H': '', 'L': '',
			'0': '', '1': '', 'x': '', 'd': '', 'u': '', 'z': '', '=':'-2','2':'-2','3':'-3','4':'-4','5':'-5'
		};
		x4 = {
			'p': '111', 'n': '000',
			'P': '111', 'N': '000',
			'h': '111', 'l': '000',
			'H': '111', 'L': '000',
			'0': '000', '1': '111', 'x': 'xxx', 'd': 'ddd', 'u': 'uuu', 'z': 'zzz',
		    '=': 'vvv-2', '2': 'vvv-2', '3': 'vvv-3', '4': 'vvv-4', '5': 'vvv-5'
		};
		x5 = {p:'nclk', n:'pclk', P:'nclk', N:'pclk'};
		x6 = {p: '000', n: '111', P: '000', N: '111'};
		xclude = {'hp':'111', 'Hp':'111', 'ln': '000', 'Ln': '000', 'nh':'111', 'Nh':'111', 'pl': '000', 'Pl':'000'};

		atext = text.split('');
		//if (atext.length !== 2) { return this.genBrick(['xxx'], extra, times); }

		tmp0 = x4[atext[1]];
		tmp1 = x1[atext[1]];
		if (tmp1 === undefined) {
			tmp2 = x2[atext[1]];
			if (tmp2 === undefined) {
				// unknown
				return this.genBrick(['xxx'], extra, times);
			} else {
				tmp3 = y1[atext[0]];
				if (tmp3 === undefined) {
					// unknown
					return this.genBrick(['xxx'], extra, times);
				}
				// soft curves
				return this.genBrick([tmp3 + 'm' + tmp2 + y2[atext[0]] + x3[atext[1]], tmp0], extra, times);
			}
		} else {
			tmp4 = xclude[text];
			if (tmp4 !== undefined) {
				tmp1 = tmp4;
			}
			// sharp curves
			tmp2 = x5[atext[1]];
			if (tmp2 === undefined) {
				// hlHL
				return this.genBrick([tmp1, tmp0], extra, times);
			} else {
				// pnPN
				return this.genBrick([tmp1, tmp0, tmp2, x6[atext[1]]], extra, times);
			}
		}
	},
	parseWaveLane: function (text, extra) {
		"use strict";
		var Repeats, Top, Next, Stack = [], R = [], i;

		Stack = text.split('');
		Next  = Stack.shift();

		Repeats = 1;
		while (Stack[0] === '.' || Stack[0] === '|') { // repeaters parser
			Stack.shift();
			Repeats += 1;
		}
		R = R.concat(this.genFirstWaveBrick(Next, extra, Repeats));

		while (Stack.length) {
			Top  = Next;
			Next = Stack.shift();
			Repeats = 1;
			while (Stack[0] === '.' || Stack[0] === '|') { // repeaters parser
				Stack.shift();
				Repeats += 1;
			}
			R = R.concat(this.genWaveBrick((Top + Next), extra, Repeats));
		}
		for (i = 0; i < this.lane.phase; i += 1) {
			R.shift();
		}
		return R;
	}
};

/*
WaveDrom.ViewSVG = function (label) {
	"use strict";
	var f, ser, str;

	f   = document.getElementById(label);
	ser = new XMLSerializer();
	str = '<?xml version="1.0" standalone="no"?>\n' +
	'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
	'<!-- Created with WaveDrom -->\n' +
	ser.serializeToString(f);
	window.open('data:image/svg+xml;base64,' + window.btoa(str), '_blank', 'location=0, resizable=1, left=100, top=100, width=600, height=300');
};

WaveDrom.ViewSourceSVG = function (label) {
	"use strict";
	var f, ser, str;

	f   = document.getElementById(label);
	ser = new XMLSerializer();
	str = '<?xml version="1.0" standalone="no"?>\n' +
	'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
	'<!-- Created with WaveDrom -->\n' +
	ser.serializeToString(f);
	window.open('view-source:data:image/svg+xml;base64,' + window.btoa(str), '_blank');
};
*/

WaveDrom.parseWaveLanes = function (sig) {
	"use strict";
	function data_extract (e) {
		var tmp = e.data;
		if (tmp === undefined) { return null; }
		if (typeof (tmp) === 'string') { return tmp.split(' '); }
		return tmp;
	}
	var x, sigx, content = [], tmp0 = [];
	for (x in sig) {
		sigx = sig[x];
		this.lane.period = sigx.period ? sigx.period    : 1;
		this.lane.phase  = sigx.phase  ? sigx.phase * 2 : 0;
		content.push([]);
		tmp0[0] = sigx.name  || ' ';
		tmp0[1] = sigx.phase || 0;
		content[content.length - 1][0] = tmp0.slice(0);
		content[content.length - 1][1] = sigx.wave ? this.parseWaveLane(sigx.wave, this.lane.period * this.lane.hscale - 1) : null;
		content[content.length - 1][2] = data_extract(sigx);
	}
	return content;
};

WaveDrom.FindLaneMarkers = function (lanetext) {
	"use strict";
	var i, gcount = 0, lcount = 0, ret = [];

	for (i in lanetext) {
		if (lanetext[i] === 'vvv-2' | lanetext[i] === 'vvv-3' | lanetext[i] === 'vvv-4' | lanetext[i] === 'vvv-5') {
			lcount += 1;
		} else {
			if (lcount !== 0) {
				ret.push(gcount - ((lcount + 1) / 2));
				lcount = 0;
			}
		}
		gcount += 1;
	}
	if (lcount !== 0) {
		ret.push(gcount - ((lcount + 1) / 2));
	}

	return ret;
};

WaveDrom.RenderWaveLane = function (root, content, index) {
	"use strict";
	var i, j, k, g, gg, title, b, lanetext, labeltext, labels = [1], nxt_xgmax, scale, name,
	xmax     = 0,
	xgmax    = 0,
	glengths = [],
	svgns    = 'http://www.w3.org/2000/svg',
	xlinkns  = 'http://www.w3.org/1999/xlink',
	xmlns    = 'http://www.w3.org/XML/1998/namespace';

	for (j = 0; j < content.length; j += 1) {
		name = content[j][0][0];
		if (name) { // check name
			g = JsonML.parse([
				'g',
				{
					id: 'wavelane_' + j + '_' + index,
					transform: 'translate(0,' + ((this.lane.y0) + j * this.lane.yo) + ')'
				}
			]);
			root.insertBefore(g, null);
			if (typeof name === 'number') { name += ''; }
			title = JsonML.parse([
				'text',
				{
					x: this.lane.tgo,
					y: this.lane.ym,
					class: 'info',
				// fill: '#0041c4', // Pantone 288C
					'text-anchor': 'end'
				},
				name // + '') // name
			]);
			title.setAttributeNS(xmlns, "xml:space", "preserve");
			g.insertBefore(title, null);

			scale = this.lane.xs * (this.lane.hscale) * 2;
			glengths.push(title.getBBox().width);

			var xoffset;
			xoffset = content[j][0][1];
			xoffset = (xoffset > 0) ? (Math.ceil(2 * xoffset) - 2 * xoffset) :
			(-2 * xoffset);
			gg = JsonML.parse([
				'g',
				{
					id: 'wavelane_draw_' + j + '_' + index,
					transform: 'translate(' + (xoffset * this.lane.xs) + ', 0)'
				}
			]);
			g.insertBefore(gg, null);

			if (content[j][1]) {
				for (i = 0; i < content[j][1].length; i += 1) {
					b    = document.createElementNS(svgns, "use");
					// b.id = "use_" + i + "_" + j + "_" + index;
					b.setAttributeNS(xlinkns, 'xlink:href', '#' + content[j][1][i]);
					// b.setAttribute('transform', 'translate(' + (i * this.lane.xs) + ')');
					b.setAttribute('transform', 'translate(' + (i * this.lane.xs) + ')');
					gg.insertBefore(b, null);
				}
				if (content[j][2] && content[j][2].length) {
					labels = this.FindLaneMarkers(content[j][1]);

					if (labels.length !== 0) {
						for (k in labels) {
							if (content[j][2] && (typeof content[j][2][k] !== 'undefined')) {
								title = JsonML.parse([
									'text',
									{
										x: labels[k] * this.lane.xs + this.lane.xlabel,
										y: this.lane.ym,
										'text-anchor': 'middle'
									},
									content[j][2][k] // + '')
								]);
								title.setAttributeNS(xmlns, "xml:space", "preserve");
								gg.insertBefore(title, null);
							}
						}
					}
				}
				if (content[j][1].length > xmax) {
					xmax = content[j][1].length;
				}
			}
		}
	}
	this.lane.xmax = xmax;
	this.lane.xg = xgmax + 20;
	return glengths;
};

WaveDrom.RenderMarks = function (root, content, index) {
	"use strict";
	function captext (root, anchor, y) {
		var tmark;
		if (root[anchor] && root[anchor].text) {
			tmark = JsonML.parse([
				'text',
				{
					x: root.xmax * root.xs / 2,
					y: y,
					'text-anchor': 'middle',
					fill: '#000'
				}, root[anchor].text
			]);
			tmark.setAttributeNS(xmlns, "xml:space", "preserve");
			g.insertBefore(tmark, null);
		}
	}
	function ticktock (root, ref1, ref2, x, dx, y, len) {
		var i, tmark, step = 1, offset, dp = 0, val, L = [], tmp;
		if (root[ref1] === undefined || root[ref1][ref2] === undefined) { return; }
		val = root[ref1][ref2];
		if (typeof val === 'string') {
			val = val.split(' ');
		} else if (typeof val === 'number' || typeof val === 'boolean') {
			offset = Number (val);
			val = [];
			for (i = 0; i < len; i += 1) {
				val.push (i + offset);
			}
		}
		if (Object.prototype.toString.call (val) === '[object Array]') {
			if (val.length === 0) {
				return;
			} else if (val.length === 1) {
				offset = Number (val[0]);
				if (isNaN(offset)) {
					L = val;
				} else {
					for (i = 0; i < len; i += 1) {
						L[i] = i + offset;
					}
				}
			} else if (val.length === 2) {
				offset = Number (val[0]);
				step   = Number (val[1]);
				tmp = val[1].split('.');
				if ( tmp.length === 2 ) {
					dp = tmp[1].length;
				}
				if (isNaN(offset) || isNaN(step)) {
					L = val;
				} else {
					offset = step * offset;
					for (i = 0; i < len; i += 1) {
						L[i] = (step * i + offset).toFixed(dp);
					}
				}
			} else {
				L = val;
			}
		} else {
			return;
		}
		for (i = 0; i < len; i += 1) {
			tmp = L[i];
			if (typeof tmp === 'number') { tmp += ''; }
			tmark = JsonML.parse([
				'text',
				{
					x: i * dx + x,
					y: y,
					'text-anchor': 'middle',
					//					fill: '#AAA'
					class: 'muted'
				}, tmp
			]);
			tmark.setAttributeNS(xmlns, "xml:space", "preserve");
			g.insertBefore(tmark, null);
		}
	}

	var i, g, marks, mstep, mmstep, labeltext, gy,
	svgns = 'http://www.w3.org/2000/svg',
	xmlns = 'http://www.w3.org/XML/1998/namespace';

	mstep  = 2 * (this.lane.hscale);
	mmstep = mstep * this.lane.xs;
	marks  = this.lane.xmax / mstep;
	gy     = content.length * this.lane.yo;

	g = JsonML.parse(['g', {id: ("gmarks_" + index)}]);
	root.insertBefore(g, root.firstChild);

	for (i = 0; i < (marks + 1); i += 1) {
		g.insertBefore(
			JsonML.parse([
				'path',
				{
					id:    'gmark_' + i + '_' + index,
					d:     'm ' + (i * mmstep) + ',' + 0 + ' 0,' + gy,
					style: 'stroke:#888;stroke-width:0.5;stroke-dasharray:1,3'
				}
			]),
			null
		);
	}

	captext (this.lane, 'head', (this.lane.yh0 ? -33 : -13));
	captext (this.lane, 'foot', gy + (this.lane.yf0 ? 45 : 25));

	ticktock (this.lane, 'head', 'tick',          0, mmstep,      -5, marks + 1);
	ticktock (this.lane, 'head', 'tock', mmstep / 2, mmstep,      -5, marks);
	ticktock (this.lane, 'foot', 'tick',          0, mmstep, gy + 15, marks + 1);
	ticktock (this.lane, 'foot', 'tock', mmstep / 2, mmstep, gy + 15, marks);
};

WaveDrom.RenderGroups = function (root, groups, index) {
	"use strict";
	var g, i, group, grouplabel, label, x, y, name,
		svgns = 'http://www.w3.org/2000/svg',
		xmlns = 'http://www.w3.org/XML/1998/namespace';

	for (i in groups) {
		group = document.createElementNS(svgns, "path");
		group.id = ("group_" + i + "_" + index);
		group.setAttribute('d', 'm ' + (groups[i].x + 0.5) + ',' + (groups[i].y * this.lane.yo + 3.5 + this.lane.yh0 + this.lane.yh1) + ' c -3,0 -5,2 -5,5 l 0,' + (groups[i].height * this.lane.yo - 16) + ' c 0,3 2,5 5,5');
		group.setAttribute('style', 'stroke:#0041c4;stroke-width:1;fill:none');
		root.insertBefore(group, null);

		name = groups[i].name;
		if (typeof name !== 'undefined') {
			if (typeof name === 'number') { name += ''; }
			x = (groups[i].x - 10);
			y = (this.lane.yo * (groups[i].y + (groups[i].height / 2)) + this.lane.yh0 + this.lane.yh1);
			label = JsonML.parse([
				'text',
				{
					x: x,
					y: y,
					'text-anchor': 'middle',
	//				fill: '#0041c4',
					class: 'info',
					transform: 'rotate(270,' + x + ',' + y + ')'
				},
				name
			]);
			label.setAttributeNS(xmlns, "xml:space", "preserve");
			root.insertBefore(label, null);
		}
	}
};

WaveDrom.RenderGaps = function (root, source, index) {
	"use strict";
	var i, gg, g, b, pos, Stack = [], text,
		svgns   = 'http://www.w3.org/2000/svg',
		xlinkns = 'http://www.w3.org/1999/xlink';

	if (source) {

		gg = document.createElementNS(svgns, 'g');
		gg.id = "wavegaps_" + index;
		//gg.setAttribute('transform', 'translate(' + this.lane.xg + ')');
		root.insertBefore(gg, null);

		for (i in source) {
			this.lane.period = source[i].period ? source[i].period    : 1;
			this.lane.phase  = source[i].phase  ? source[i].phase * 2 : 0;
			g = document.createElementNS(svgns, 'g');
			g.id = "wavegap_" + i + "_" + index;
			g.setAttribute('transform', 'translate(0,' + (this.lane.y0 + i * this.lane.yo) + ')');
			gg.insertBefore(g, null);

			text = source[i].wave;
			if (text) {
				Stack = text.split('');
				pos = 0;
				while (Stack.length) {
					if (Stack.shift() === '|') {
						b    = document.createElementNS(svgns, "use");
						//						b.id = "guse_" + pos + "_" + i + "_" + index;
						b.setAttributeNS(xlinkns, 'xlink:href', '#gap');
						b.setAttribute('transform', 'translate(' + (this.lane.xs * ((2 * pos + 1) * this.lane.period * this.lane.hscale - this.lane.phase)) + ')');
						g.insertBefore(b, null);
					}
					pos += 1;
				}
			}
		}
	}
};

WaveDrom.RenderArcs = function (root, source, index, top) {
	"use strict";
	var gg, i, k, text, Stack = [], Edge = {words: [], from: 0, shape: '', to: 0, label: ''}, Events = {}, pos, eventname, labeltext, label, underlabel, from, to, gmark, lwidth,
		svgns = 'http://www.w3.org/2000/svg',
		xmlns = 'http://www.w3.org/XML/1998/namespace';
	function t1 () {
		gmark = document.createElementNS(svgns, "path");
		gmark.id = ("gmark_" + Edge.from + "_" + Edge.to);
		gmark.setAttribute('d', 'M ' + from.x + ',' + from.y + ' ' + to.x   + ',' + to.y);
		gmark.setAttribute('style', 'fill:none;stroke:#00F;stroke-width:1');
		gg.insertBefore(gmark, null);
	}

	if (source) {
		for (i in source) {
			this.lane.period = source[i].period ? source[i].period    : 1;
			this.lane.phase  = source[i].phase  ? source[i].phase * 2 : 0;
			text = source[i].node;
			if (text) {
				Stack = text.split('');
				pos = 0;
				while (Stack.length) {
					eventname = Stack.shift();
					if (eventname !== '.') {
						Events[eventname] = {
							'x' : this.lane.xs * (2 * pos * this.lane.period * this.lane.hscale - this.lane.phase) + this.lane.xlabel,
							'y' : i * this.lane.yo + this.lane.y0 + this.lane.ys * 0.5
						};
					}
					pos += 1;
				}
			}
		}
		gg = document.createElementNS(svgns, 'g');
		gg.id = "wavearcs_" + index;
		root.insertBefore(gg, null);
		if (top.edge) {
			for (i in top.edge) {
				Edge.words = top.edge[i].split(' ');
				Edge.label = top.edge[i].substring(Edge.words[0].length);
				Edge.label = Edge.label.substring(1);
				Edge.from  = Edge.words[0].substr(0, 1);
				Edge.to    = Edge.words[0].substr(-1, 1);
				Edge.shape = Edge.words[0].slice(1, -1);
				from  = Events[Edge.from];
				to    = Events[Edge.to];
				t1();
				if (Edge.label) {
					label = JsonML.parse([
						'text',
						{
							style: 'font-size:10px;',
							'text-anchor': 'middle'
						},
						Edge.label + ''
					]);
					label.setAttributeNS(xmlns, "xml:space", "preserve");
					underlabel = JsonML.parse([
						'rect',
						{
							height: 9,
							style: 'fill:#FFF;'
						}
					]);
					gg.insertBefore(underlabel, null);
					gg.insertBefore(label, null);
					lwidth = label.getBBox().width;
					underlabel.setAttribute('width', lwidth);
				}
				var dx = to.x - from.x;
				var dy = to.y - from.y;
				var lx = ((from.x + to.x) / 2);
				var ly = ((from.y + to.y) / 2);
				switch (Edge.shape) {
					case '-'  : {
						break;
					}
					case '~'  : {
						gmark.setAttribute('d', 'M ' + from.x + ',' + from.y + ' c ' + (0.7 * dx) + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
						break;
					}
					case '-~' : {
						gmark.setAttribute('d', 'M ' + from.x + ',' + from.y + ' c ' + (0.7 * dx) + ', 0 ' +         dx + ', ' + dy + ' ' + dx + ', ' + dy);
						if (Edge.label) { lx = (from.x + (to.x - from.x) * 0.75); }
						break;
					}
					case '~-' : {
						gmark.setAttribute('d', 'M ' + from.x + ',' + from.y + ' c ' + 0          + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
						if (Edge.label) { lx = (from.x + (to.x - from.x) * 0.25); }
						break;
					}
					case '-|' : {
						gmark.setAttribute('d', 'm ' + from.x + ',' + from.y + ' ' + dx + ',0 0,' + dy);
						if (Edge.label) { lx = to.x; }
						break;
					}
					case '|-' : {
						gmark.setAttribute('d', 'm ' + from.x + ',' + from.y + ' 0,' + dy + ' ' + dx + ',0');
						if (Edge.label) { lx = from.x; }
						break;
					}
					case '-|-': {
						gmark.setAttribute('d', 'm ' + from.x + ',' + from.y + ' ' + (dx / 2) + ',0 0,' + dy + ' ' + (dx / 2) + ',0');
						break;
					}
					case '->' : {
						gmark.setAttribute('style', 'marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
						break;
					}
					case '~>' : {
						gmark.setAttribute('style', 'marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
						gmark.setAttribute('d', 'M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' + 0.3*dx + ', ' + dy + ' ' + dx + ', ' + dy);
						break;
					}
					case '-~>': {
						gmark.setAttribute('style', 'marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
						gmark.setAttribute('d', 'M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' +     dx + ', ' + dy + ' ' + dx + ', ' + dy);
						if (Edge.label) { lx = (from.x + (to.x - from.x) * 0.75); }
						break;
					}
					case '~->': {
						gmark.setAttribute('style', 'marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
						gmark.setAttribute('d', 'M ' + from.x + ',' + from.y + ' ' + 'c ' + 0      + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
						if (Edge.label) { lx = (from.x + (to.x - from.x) * 0.25); }
						break;
					}
					case '-|>' : {
						gmark.setAttribute('style', 'marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
						gmark.setAttribute('d', 'm ' + from.x + ',' + from.y + ' ' + dx + ',0 0,' + dy);
						if (Edge.label) { lx = to.x; }
						break;
					}
					case '|->' : {
						gmark.setAttribute('style', 'marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
						gmark.setAttribute('d', 'm ' + from.x + ',' + from.y + ' 0,' + dy + ' ' + dx + ',0');
						if (Edge.label) { lx = from.x; }
						break;
					}
					case '-|->': {
						gmark.setAttribute('style', 'marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
						gmark.setAttribute('d', 'm ' + from.x + ',' + from.y + ' ' + (dx / 2) + ',0 0,' + dy + ' ' + (dx / 2) + ',0');
						break;
					}
					case '<->' : {
						gmark.setAttribute('style', 'marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
						break;
					}
					case '<~>' : {
						gmark.setAttribute('style', 'marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
						gmark.setAttribute('d', 'M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
						break;
					}
					case '<-~>': {
						gmark.setAttribute('style', 'marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
						gmark.setAttribute('d', 'M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' +     dx + ', ' + dy + ' ' + dx + ', ' + dy);
						if (Edge.label) { lx = (from.x + (to.x - from.x) * 0.75); }
						break;
					}
					case '<-|>' : {
						gmark.setAttribute('style', 'marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
						gmark.setAttribute('d', 'm ' + from.x + ',' + from.y + ' ' + dx + ',0 0,' + dy);
						if (Edge.label) { lx = to.x; }
						break;
					}
					case '<-|->': {
						gmark.setAttribute('style', 'marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
						gmark.setAttribute('d', 'm ' + from.x + ',' + from.y + ' ' + (dx / 2) + ',0 0,' + dy + ' ' + (dx / 2) + ',0');
						break;
					}
					default   : { gmark.setAttribute('style', 'fill:none;stroke:#F00;stroke-width:1'); }
				}
				if (Edge.label) {
					label.setAttribute('x', lx);
					label.setAttribute('y', ly + 3);
					underlabel.setAttribute('x', lx - lwidth / 2);
					underlabel.setAttribute('y', ly - 5);
				}
			}
		}
		for (k in Events) {
			if (k == k.toLowerCase()) {
				if (Events[k].x > 0) {
					underlabel = JsonML.parse([
						'rect',
						{
							y: Events[k].y - 4,
							height: 8,
							style: 'fill:#FFF;'
						}
					]);
					gg.insertBefore(underlabel, null);
					label = JsonML.parse([
						'text',
						{
							style: 'font-size:8px;',
							x: Events[k].x,
							y: Events[k].y + 2,
							'text-anchor': 'middle'
						},
						(k + '')
					]);
					gg.insertBefore(label, null);
					lwidth = label.getBBox().width + 2;
					underlabel.setAttribute('x', Events[k].x - lwidth / 2);
					underlabel.setAttribute('width', lwidth);
				}
			}
		}
	}
};

WaveDrom.parseConfig = function (source) {
	"use strict";
	function tonumber (x) {
		return x > 0 ? Math.round(x) : 1;
	}
	var hscale;
	this.lane.hscale = 1;
	if (this.lane.hscale0) {
		this.lane.hscale = this.lane.hscale0;
	}
	if (source && source.config && source.config.hscale) {
		hscale = Math.round (tonumber (source.config.hscale));
		if (hscale > 0) {
			if (hscale > 100) {
				hscale = 100;
			}
			this.lane.hscale = hscale;
		}
	}
	this.lane.yh0 = 0;
	this.lane.yh1 = 0;
	this.lane.head = source.head;
	if (source && source.head) {
		if (source.head.tick || source.head.tick === 0) { this.lane.yh0 = 20; }
		if (source.head.tock || source.head.tock === 0) { this.lane.yh0 = 20; }
		if (source.head.text) { this.lane.yh1 = 46; this.lane.head.text = source.head.text; }
	}
	this.lane.yf0 = 0;
	this.lane.yf1 = 0;
	this.lane.foot = source.foot;
	if (source && source.foot) {
		if (source.foot.tick || source.foot.tick === 0) { this.lane.yf0 = 20; }
		if (source.foot.tock || source.foot.tock === 0) { this.lane.yf0 = 20; }
		if (source.foot.text) { this.lane.yf1 = 46; this.lane.foot.text = source.foot.text; }
	}
};

WaveDrom.rec = function (tmp, state) {
	"use strict";
	var i, name, old = {}, delta = {"x":10};
	if (typeof tmp[0] === 'string' || typeof tmp[0] === 'number') {
		name = tmp[0];
		delta.x = 25;
	}
	state.x += delta.x;
	for (i = 0; i < tmp.length; i++) {
		if (typeof tmp[i] === 'object') {
			if (Object.prototype.toString.call(tmp[i]) === '[object Array]') {
				old.y = state.y;
				state = this.rec(tmp[i], state);
				state.groups.push({"x":state.xx, "y":old.y, "height":(state.y - old.y), "name":state.name});
			} else {
				state.lanes.push(tmp[i]);
				state.width.push(state.x);
				state.y += 1;
			}
		}
	}
	state.xx = state.x;
	state.x -= delta.x;
	state.name = name;
	return state;
};

WaveDrom.InsertSVGTemplate = function (index, parent, source) {
	"use strict";
	var node, first, e;

	// cleanup
	while (parent.childNodes.length) {
		parent.removeChild(parent.childNodes[0]);
	}

	for (first in WaveSkin) { break; }
	e = WaveSkin['default'] || WaveSkin[first];
	if (source && source.config && source.config.skin && WaveSkin[source.config.skin]) {
		e = WaveSkin[source.config.skin];
	}
	if (index === 0) {
		this.lane.xs     = Number(e[3][1][2][1].width);
		this.lane.ys     = Number(e[3][1][2][1].height);
		this.lane.xlabel = Number(e[3][1][2][1].x);
		this.lane.ym     = Number(e[3][1][2][1].y);
	} else {
		e = ["svg",{"id":"svg","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","height":"0"},["g",{"id":"waves"},["g",{"id":"lanes"}],["g",{"id":"groups"}]]];
	}

	e[e.length - 1][1].id    = "waves_"  + index;
	e[e.length - 1][2][1].id = "lanes_"  + index;
	e[e.length - 1][3][1].id = "groups_" + index;
	e[1].id = "svgcontent_" + index;
	e[1].height = 0;

	node = JsonML.parse(e);
	parent.insertBefore(node, null);
};

WaveDrom.InsertSVGTemplateAssign = function (index, parent, source) {
	"use strict";
	var node, e;
	// cleanup
	while (parent.childNodes.length) {
		parent.removeChild(parent.childNodes[0]);
	}
	e = [
		"svg",
		{
			id: "svgcontent_" + index,
			xmlns:"http://www.w3.org/2000/svg",
			"xmlns:xlink":"http://www.w3.org/1999/xlink",
			overflow:"hidden"
		},
		['style', '.pinname {font-size:12px; font-style:normal; font-variant:normal; font-weight:500; font-stretch:normal; text-align:center; text-anchor:end; font-family:Helvetica} .wirename {font-size:12px; font-style:normal; font-variant:normal; font-weight:500; font-stretch:normal; text-align:center; text-anchor:start; font-family:Helvetica} .wirename:hover {fill:blue} .gate {color:#000; fill:#ffc; fill-opacity: 1;stroke:#000; stroke-width:1; stroke-opacity:1} .gate:hover {fill:red !important; } .wire {fill:none; stroke:#000; stroke-width:1; stroke-opacity:1} .grid {fill:#fff; fill-opacity:1; stroke:none}']
	];
	node = JsonML.parse(e);
	parent.insertBefore(node, null);
};

WaveDrom.RenderAssign = function (index, source) {
	'use strict';
	function render (tree, state) {
		var head, y, i, ilen;
		state.xmax = Math.max(state.xmax, state.x);
		head = tree[0];
		y = state.y;
		ilen = tree.length;
		for (i = 1; i < ilen; i++) {
			if (Object.prototype.toString.call(tree[i]) === '[object Array]') {
				state = render (tree[i], {x:(state.x+1), y:state.y, xmax:state.xmax});
			} else {
				tree[i] = {name:tree[i], x:(state.x+1), y:state.y};
				state.y += 2;
			}
		}
		tree[0] = {name:tree[0], x:state.x, y:Math.round((y + (state.y-2))/2)};
		state.x--;
		return state;
	}
	function draw_body (type, inputs) {
		var e, gates = {
			"~":  'm -16,0 4,0 m 0,-6 0,12 10,-6 z m 10,6 c 0,1.104569 0.895431,2 2,2 1.104569,0 2,-0.895431 2,-2 0,-1.104569 -0.895431,-2 -2,-2 -1.104569,0 -2,0.895431 -2,2 z',
			"=":  'm -2,0 2,0 m -12,-6 0,12 10,-6 z m -4,6 4,0',
			"&":  'm -16,-10 5,0 c 6,0 11,4 11,10 0,6 -5,10 -11,10 l -5,0 z',
			"~&": 'm -16,-10 3,0 c 6,0 11,4 11,10 0,6 -5,10 -11,10 l -3,0 z M 2,0 C 2,1.104569 1.104569,2 0,2 -1.104569,2 -2,1.104569 -2,0 c 0,-1.104569 0.895431,-2 2,-2 1.104569,0 2,0.895431 2,2 z',
			"|":   'm -18,-10 4,0 c 6,0 12,5 14,10 -2,5 -8,10 -14,10 l -4,0 c 2.5,-5 2.5,-15 0,-20 z',
			"~|":  'M 2,0 C 2,1.10457 1.104569,2 0,2 -1.104569,2 -2,0.745356 -2,0 c 0,-0.745356 0.895431,-2 2,-2 1.104569,0 2,0.89543 2,2 z m -20,-10 2,0 c 6,0 12,5 14,10 -2,5 -8,10 -14,10 l -2,0 c 2.5,-5 2.5,-15 0,-20 z',
			"^":  'm -21,-10 c 1,3 2,6 2,10 m 0,0 c 0,4 -1,7 -2,10 m 3,-20 4,0 c 6,0 12,5 14,10 -2,5 -8,10 -14,10 l -4,0 c 1,-3 2,-6 2,-10 0,-4 -1,-7 -2,-10 z',
			"~^": 'm -21,-10 c 1,3 2,6 2,10 m 0,0 c 0,4 -1,7 -2,10 M 2,0 C 2,1.10457 1.104569,2 0,2 -1.104569,2 -2,0.745356 -2,0 c 0,-0.745356 0.895431,-2 2,-2 1.104569,0 2,0.89543 2,2 z m -20,-10 2,0 c 6,0 12,5 14,10 -2,5 -8,10 -14,10 l -2,0 c 1,-3 2,-6 2,-10 0,-4 -1,-7 -2,-10 z',
			"+":  'm -8,5 0,-10 m -5,5 10,0 m 3,0 c 0,4.418278 -3.581722,8 -8,8 -4.418278,0 -8,-3.581722 -8,-8 0,-4.418278 3.581722,-8 8,-8 4.418278,0 8,3.581722 8,8 z',
			"*":  'm -4,4 -8,-8 m 0,8 8,-8 m 4,4 c 0,4.418278 -3.581722,8 -8,8 -4.418278,0 -8,-3.581722 -8,-8 0,-4.418278 3.581722,-8 8,-8 4.418278,0 8,3.581722 8,8 z',
			box:  'm -16,-10 16,0 0,20 -16,0 z'
		};
		e = gates[type];
		if (e) {
			return ['path', {class:'gate', d: e}];
		} else {
			return ['text', ['tspan', {x:"-14", y:"4", class:"wirename"}, type]];
		}
	}
	function draw_gate (spec) { // ['type', [x,y], [x,y] ... ]
		var i, ilen, ret = ['g'], ys = [];
		ilen = spec.length;
		for (i = 2; i < ilen; i++) {
			ys.push(spec[i][1]);
		}
		ret.push(
			['g',
				{transform:"translate(16,0)"},
				['path', {
					d: 'M  '+spec[2][0]+','+Math.min.apply(null, ys)+' '+spec[2][0]+','+Math.max.apply(null, ys),
					class: 'wire'
				}]
			]
		);
		for (i = 2; i < ilen; i++) {
			ret.push(
				['g',
					['path',
						{
							d:'m  '+spec[i][0]+','+spec[i][1]+' 16,0',
							class: 'wire'
						}
					]
				]
			);
		}
		ret.push(
			['g',
				{
					transform:'translate('+spec[1][0]+','+spec[1][1]+')'
				},
				['title', spec[0]],
				draw_body(spec[0], ilen-2)
			]
		);
		return ret;
	}
	function draw_boxes (tree, xmax) {
		var ret = ['g'], i, ilen, fx, fy, fname, spec = [];
		if (Object.prototype.toString.call(tree) === '[object Array]') {
			ilen = tree.length;
			spec.push(tree[0].name);
			spec.push([32*(xmax-tree[0].x), 8*tree[0].y]);
			for (i = 1; i < ilen; i++) {
				if (Object.prototype.toString.call(tree[i]) === '[object Array]') {
					spec.push([32*(xmax-tree[i][0].x), 8*tree[i][0].y]);
				} else {
					spec.push([32*(xmax-tree[i].x), 8*tree[i].y]);
				}
			}
			ret.push(draw_gate (spec));
			for (i = 1; i < ilen; i++) {
				ret.push(draw_boxes (tree[i], xmax));
			}
		} else {
			fname = tree.name;
			fx = 32*(xmax-tree.x);
			fy = 8*tree.y;
			ret.push(
				['g',
					{transform: 'translate('+fx+','+fy+')'},
					['title', fname],
					['path', {d:'M 2,0 a 2,2 0 1 1 -4,0 2,2 0 1 1 4,0 z'}],
					['text',
						['tspan', {
							x:"-4", y:"4",
							class:"pinname"},
							fname
						]
					]
				]
			);
		}
		return ret;
	}

	var tree, state, xmax, svg = ['g'], grid = ['g'], svgcontent, width, height, i, ilen, j, jlen;
  ilen = source.assign.length;
  state = {x:0,y:2,xmax:0};
  tree = source.assign;
  for (i = 0; i < ilen; i++) {
    state = render (tree[i], state);
    state.x++;
  }
  xmax = state.xmax+3;
	console.log (JSON.stringify(tree));

  for (i = 0; i < ilen; i++) {
    svg.push(draw_boxes (tree[i], xmax));
  }
	//console.log (JSON.stringify(svg));
  width  = 32 * (xmax + 1) + 1;
  height = 8 * (state.y + 1) - 7;
  ilen = 4 * (xmax + 1);
  jlen = state.y+1;
  for (i = 0; i <= ilen; i++) {
    for (j = 0; j <= jlen; j++) {
      grid.push(['rect', {height:1, width:1, x:(i*8-0.5), y:(j*8-0.5), class:'grid'}]);
    }
  }
  svgcontent = document.getElementById("svgcontent_" + index);
  svgcontent.setAttribute('viewBox', "0 0 " + width + " " + height);
  svgcontent.setAttribute('width', width);
  svgcontent.setAttribute('height', height);
	svgcontent.insertBefore(JsonML.parse(['g', {transform:"translate(0.5, 0.5)"}, grid, svg]), null);
};

WaveDrom.eva = function (id) {
	"use strict";
	function erra (e) {
		console.log (e.stack);
		return { signal: [{ name: ['tspan', ['tspan', {class:'error h5'}, 'Error: '], e.message] }]};
	}
	var TheTextBox, source;
	TheTextBox = document.getElementById (id);

	if (TheTextBox.type && TheTextBox.type == 'textarea') {
		try { source = eval('(' + TheTextBox.value + ')'); } catch (e) { return erra (e); }
	} else {
		try { source = eval('(' + TheTextBox.innerHTML + ')'); } catch (e) { return erra (e); }
	}
	if (Object.prototype.toString.call(source) !== '[object Object]') {
		return erra ({ message: "[Semantic]: The root has to be an Object: '{signal:[...]}'"});
	}
	if (source.signal) {
		if (Object.prototype.toString.call(source.signal) !== '[object Array]') {
			return erra ({ message: "[Semantic]: 'signal' object has to be an Array 'signal:[]'"});
		}
	} else if (source.assign) {
		if (Object.prototype.toString.call(source.assign) !== '[object Array]') {
			return erra ({ message: "[Semantic]: 'assign' object hasto be an Array 'assign:[]'"});
		}
	} else {
		return erra ({ message: "[Semantic]: 'signal:[...]' or 'assign:[...]' property is missing inside the root Object"});
	}
	return source;
};

WaveDrom.RenderWaveForm = function (index, source, output) {
	"use strict";
	var ret,
	root, groups, svgcontent, content, width, height,
	glengths, xmax = 0, i;

	if (source.signal) {
		this.InsertSVGTemplate(index, document.getElementById(output + index), source);
		this.parseConfig (source);
		ret = this.rec(source.signal, {'x':0, 'y':0, 'xmax':0, 'width':[], 'lanes':[], 'groups':[]});
		root          = document.getElementById("lanes_" + index);
		groups        = document.getElementById("groups_" + index);
		content  = this.parseWaveLanes(ret.lanes);
		glengths = this.RenderWaveLane(root, content, index);
		for (i in glengths) {
			xmax = Math.max(xmax, (glengths[i] + ret.width[i]));
		}
		this.RenderMarks(root, content, index);
		this.RenderArcs(root, ret.lanes, index, source);
		this.RenderGaps(root, ret.lanes, index);
		this.RenderGroups(groups, ret.groups, index);
		this.lane.xg = Math.ceil((xmax - this.lane.tgo) / this.lane.xs) * this.lane.xs;
		width  = (this.lane.xg + (this.lane.xs * (this.lane.xmax + 1)));
		height = (content.length * this.lane.yo +
		this.lane.yh0 + this.lane.yh1 + this.lane.yf0 + this.lane.yf1);

		svgcontent = document.getElementById("svgcontent_" + index);
		svgcontent.setAttribute('viewBox', "0 0 " + width + " " + height);
		svgcontent.setAttribute('width', width);
		svgcontent.setAttribute('height', height);
		svgcontent.setAttribute('overflow', 'hidden');
		root.setAttribute('transform', 'translate(' + (this.lane.xg + 0.5) + ', ' + ((this.lane.yh0 + this.lane.yh1) + 0.5) + ')');
	} else if (source.assign) {
		this.InsertSVGTemplateAssign(index, document.getElementById(output + index), source);
		this.RenderAssign(index, source);
	}
};

WaveDrom.ProcessAll = function () {
	"use strict";
	var points, i, index, node0,
		node1;

	// first pass
	index = 0; // actual number of valid anchor
	points = document.getElementsByTagName('SCRIPT');
	for (i = 0; i < points.length; i++) {
		if (points.item(i).type && points.item(i).type === 'WaveDrom') {
			points.item(i).setAttribute('id', 'InputJSON_' + index);

			node0 = document.createElement('div');
			//			node0.className += "WaveDrom_Display_" + index;
			node0.id = "WaveDrom_Display_" + index;
			points.item(i).parentNode.insertBefore(node0, points.item(i));
			//			WaveDrom.InsertSVGTemplate(i, node0);
			index += 1;
		}
	}
	// second pass
	for (i = 0; i < index; i += 1) {
		WaveDrom.RenderWaveForm(i, WaveDrom.eva ('InputJSON_' + i), 'WaveDrom_Display_');
		WaveDrom.AppendSaveAsDialog(i);
	}
	// add styles
	document.head.innerHTML += '<style type="text/css">div.wavedromMenu{position:fixed;border:solid 1pt#CCCCCC;background-color:white;box-shadow:0px 10px 20px #808080;cursor:default;margin:0px;padding:0px;}div.wavedromMenu>ul{margin:0px;padding:0px;}div.wavedromMenu>ul>li{padding:2px 10px;list-style:none;}div.wavedromMenu>ul>li:hover{background-color:#b5d5ff;}</style>';
};

WaveDrom.EditorRefresh = function () {
	"use strict";
	var svg, ser, ssvg, asvg, sjson, ajson;
	WaveDrom.RenderWaveForm(0, WaveDrom.eva ('InputJSON_0'), 'WaveDrom_Display_');

	svg = document.getElementById("svgcontent_0");
	ser = new XMLSerializer();
	ssvg = '<?xml version="1.0" standalone="no"?>\n' +
	'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
	'<!-- Created with WaveDrom -->\n' +
	ser.serializeToString(svg);

	asvg = document.getElementById("download_svg");
	asvg.href = 'data:image/svg+xml;base64,' + window.btoa(ssvg);

	sjson = localStorage.waveform;
	ajson = document.getElementById("download_json");
	ajson.href = 'data:text/json;base64,' + window.btoa(sjson);
};
