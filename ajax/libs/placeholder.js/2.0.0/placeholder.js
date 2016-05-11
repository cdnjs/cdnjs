/*!
	placeholder.js - client side image placeholders
	© 2015 Hustcc - http://www.aTool.org
	Site:     http://github.atool.org/placeholder.js.html
	Issues:   https://github.com/hustcc/placeholder.js/issues
	License:  MIT
*/
(function() {
	var c, 
		cc, //公用一个实例，减少内存占用，减少资源消耗
		frame_func = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(func) {
			window.setTimeout(func, 1000 / 60);
		},//帧动画，做定时任务
		rendered_attr = 'placeholder-rendered';
	function createCanvas(opts) {
		if (!c || !cc) {
			//如果不存在则实例化
			c = document.createElement('canvas');
			cc = c.getContext('2d');
		}
		var canvas_width = parseInt(opts.a[0]), canvas_height = parseInt(opts.a[1]);
		//图片大小
		c.width = canvas_width;
		c.height = canvas_height;
		cc.clearRect(0, 0, canvas_width, canvas_height); //清楚已有的画布
		//设置背景色
		cc.fillStyle = opts.c;
		cc.fillRect(0, 0, canvas_width, canvas_height);
		//字体颜色
		cc.fillStyle = opts.d;
		cc.font = opts.e + ' normal ' + opts.f + ' ' + (opts.g || 100) + 'px ' + opts.h;
		var scale = 1.0;
		if (opts.g === '') {
			//auto calculate size
			var width_limit = 0.7 * canvas_width, 
				heigth_limit = 0.7 * canvas_height, 
				text_width = cc.measureText(opts.b).width,
				text_height = 100;
			scale = Math.min(width_limit / text_width, heigth_limit / text_height);
		}
		//文字居中
		cc.translate(canvas_width / 2, canvas_height / 2);
		cc.scale(scale, scale);
        cc.textAlign = 'center';
        cc.textBaseline = 'middle';
        
        cc.fillText(opts.b, 0, 0);
		return c;
	}

	//随机颜色值
	function randomColor() {
		return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
	}

	//预处理配置信息，补全默认项
	function prepareOpts(opts) {
		opts = opts || {};
		var size = opts.size || '128x128',
		text = opts.text || size,
		bgcolor = opts.bgcolor || randomColor(), //other placeholder default bgcolor is '#ccc',
		color = opts.color || randomColor(), //other placeholder default color is '#969696',
		//font参数
		fstyle = opts.fstyle || 'normal', //normal / italic / oblique
		fweight = opts.fweight || 'bold', //normal / bold / bolder / lighter
		fsize = opts.fsize || '', //auto calculate the font size to response to the image size
		ffamily = opts.ffamily || 'consolas', //规定字号和行高，以像素计。
		new_opts = {};

		size = size.split('x'); 
		if (size.length !== 2) {
			size = [128, 128];
		}
		//减少键值，压缩之后可以减少包大小
		new_opts.a = size;
		new_opts.b = text;
		new_opts.c = bgcolor;
		new_opts.d = color;
		new_opts.e = fstyle;
		new_opts.f = fweight;
		new_opts.g = fsize;
		new_opts.h = ffamily;
		opts = null;
		return new_opts;
	}

	//创建placeholder Canvas元素
	function placeholderCanvas(opts) {
		opts = prepareOpts(opts);
		return createCanvas(opts);
	}

	//获得placeholder的base64字符串
	function placeholder(opts) {
		return placeholderCanvas(opts).toDataURL();
	}

	//获取元素属性，带默认值
	function _getAttribute(node, name, defaultValue) {
		return node.getAttribute(name) || defaultValue;
	}

	//从url中解析配置信息
	function parseUrlOptions(url) {
		var opts = {}, parameters = url.split('&'), k_v;
		for (var i in parameters) {
			k_v = parameters[i].split('=');
			opts[k_v[0]] = k_v[1];
		}
		return opts;
	}
	//开始检查图片中
	function render() {
		var image_eles = document.querySelectorAll('img.placeholder'), img, opts;
		for (var i = 0; i < image_eles.length; i++) {
			img = image_eles[i];
			//图片没有被处理过，立马处理
			if (! _getAttribute(img, rendered_attr, '')) {
				opts = parseUrlOptions(_getAttribute(img, 'options', ''));
				img.setAttribute('src', placeholder(opts));
				//处理完成之后标记为处理
				img.setAttribute(rendered_attr, '1');
			}
		}
		frame_func(render);
	}
	render();//渲染
	window.placeholder = {
		getData: placeholder,
		getCanvas: placeholderCanvas
	};
})();
