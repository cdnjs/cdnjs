/**
 * User: jeakeyliang
 * Date: 14-08-22
 * Time: 下午9:20
 */


;(function($){
  var data = {}, dataAttr = $.fn.data, camelize = $.camelCase,
    exp = $.expando = 'Zepto' + (+new Date()), emptyArray = []

  // Get value from node:
  // 1. first try key as given,
  // 2. then try camelized key,
  // 3. fall back to reading "data-*" attribute.
  function getData(node, name) {
    var id = node[exp], store = id && data[id]
    if (name === undefined) return store || setData(node)
    else {
      if (store) {
        if (name in store) return store[name]
        var camelName = camelize(name)
        if (camelName in store) return store[camelName]
      }
      return dataAttr.call($(node), name)
    }
  }

  // Store value under camelized key on node
  function setData(node, name, value) {
    var id = node[exp] || (node[exp] = ++$.uuid),
      store = data[id] || (data[id] = attributeData(node))
    if (name !== undefined) store[camelize(name)] = value
    return store
  }

  // Read all "data-*" attributes from a node
  function attributeData(node) {
    var store = {}
    $.each(node.attributes || emptyArray, function(i, attr){
      if (attr.name.indexOf('data-') == 0)
        store[camelize(attr.name.replace('data-', ''))] =
          $.zepto.deserializeValue(attr.value)
    })
    return store
  }

  $.fn.data = function(name, value) {
    return value === undefined ?
      // set multiple values via object
      $.isPlainObject(name) ?
        this.each(function(i, node){
          $.each(name, function(key, value){ setData(node, key, value) })
        }) :
        // get value from first element
        (0 in this ? getData(this[0], name) : undefined) :
      // set value on all elements
      this.each(function(){ setData(this, name, value) })
  }

  $.fn.removeData = function(names) {
    if (typeof names == 'string') names = names.split(/\s+/)
    return this.each(function(){
      var id = this[exp], store = id && data[id]
      if (store) $.each(names || store, function(key){
        delete store[names ? camelize(this) : key]
      })
    })
  }

  // Generate extended `remove` and `empty` functions
  ;['remove', 'empty'].forEach(function(methodName){
    var origFn = $.fn[methodName]
    $.fn[methodName] = function() {
      var elements = this.find('*')
      if (methodName === 'remove') elements = elements.add(this)
      elements.removeData()
      return origFn.call(this)
    }
  })
})(window.Zepto);

!function ($) {
	var _private = {};
	_private.cache = {};
	$.tpl = function (str, data, env) {
		// 判断str参数，如str为script标签的id，则取该标签的innerHTML，再递归调用自身
		// 如str为HTML文本，则分析文本并构造渲染函数
		var fn = !/[^\w\-\.:]/.test(str)
			? _private.cache[str] = _private.cache[str] || this.get(document.getElementById(str).innerHTML)
			: function (data, env) {
			var i, variable = [], value = []; // variable数组存放变量名，对应data结构的成员变量；value数组存放各变量的值
			for (i in data) {
				variable.push(i);
				value.push(data[i]);
			}
			return (new Function(variable, fn.code))
				.apply(env || data, value); // 此处的new Function是由下面fn.code产生的渲染函数；执行后即返回渲染结果HTML
		};

		fn.code = fn.code || "var $parts=[]; $parts.push('"
			+ str
			.replace(/\\/g, '\\\\') // 处理模板中的\转义
			.replace(/[\r\t\n]/g, " ") // 去掉换行符和tab符，将模板合并为一行
			.split("<%").join("\t") // 将模板左标签<%替换为tab，起到分割作用
			.replace(/(^|%>)[^\t]*/g, function(str) { return str.replace(/'/g, "\\'"); }) // 将模板中文本部分的单引号替换为\'
			.replace(/\t=(.*?)%>/g, "',$1,'") // 将模板中<%= %>的直接数据引用（无逻辑代码）与两侧的文本用'和,隔开，同时去掉了左标签产生的tab符
			.split("\t").join("');") // 将tab符（上面替换左标签产生）替换为'); 由于上一步已经把<%=产生的tab符去掉，因此这里实际替换的只有逻辑代码的左标签
			.split("%>").join("$parts.push('") // 把剩下的右标签%>（逻辑代码的）替换为"$parts.push('"
			+ "'); return $parts.join('');"; // 最后得到的就是一段JS代码，保留模板中的逻辑，并依次把模板中的常量和变量压入$parts数组

		return data ? fn(data, env) : fn; // 如果传入了数据，则直接返回渲染结果HTML文本，否则返回一个渲染函数
	};
	$.adaptObject =  function (element, defaults, option,template,plugin,pluginName) {
    var $this= element;

    if (typeof option != 'string'){
    
    // 获得配置信息
    var context=$.extend({}, defaults,  typeof option == 'object' && option);

    var isFromTpl=false;
    // 如果传入script标签的选择器
    if($.isArray($this) && $this.length && $($this)[0].nodeName.toLowerCase()=="script"){
      // 根据模板获得对象并插入到body中
      $this=$($.tpl($this[0].innerHTML,context)).appendTo("body");
      isFromTpl=true;
    }
    // 如果传入模板字符串
    else if($.isArray($this) && $this.length && $this.selector== ""){
      // 根据模板获得对象并插入到body中
      $this=$($.tpl($this[0].outerHTML,context)).appendTo("body");
      isFromTpl=true;
    }
    // 如果通过$.dialog()的方式调用
    else if(!$.isArray($this)){
      // 根据模板获得对象并插入到body中
      $this=$($.tpl(template,context)).appendTo("body");
      isFromTpl=true;
    }

    }

    return $this.each(function () {

      var el = $(this);
      // 读取对象缓存
  
      var data  = el.data('fz.'+pluginName);
      


      if (!data) el.data('fz.'+pluginName, 
        (data = new plugin(this,$.extend({}, defaults,  typeof option == 'object' && option),isFromTpl)

      ));

      if (typeof option == 'string') data[option]();
    })
  }
}(window.Zepto);



/**
 * User: jeakeyliang
 * Date: 14-08-22
 * Time: 下午9:20
 */

!function($){

	// 默认模板
	var _dialogTpl='<div class="ui-dialog">'+
        '<div class="ui-dialog-cnt">'+
            '<div class="ui-dialog-bd">'+
                '<div>'+
                '<h4><%=title%></h4>'+
                '<div><%=content%></div></div>'+
            '</div>'+
            '<div class="ui-dialog-ft ui-btn-group">'+
            	'<% for (var i = 0; i < button.length; i++) { %>' +
				'<% if (i == select) { %>' +
				'<button type="button" data-role="button"  class="select" id="dialogButton<%=i%>"><%=button[i]%></button>' +
				'<% } else { %>' +
				'<button type="button" data-role="button" id="dialogButton<%=i%>"><%=button[i]%></div>' +
				'<% } %>' +
				'<% } %>' +
            '</div>'+
        '</div>'+        
    '</div>';
	// 默认参数
	var defaults={
		title:'',
		content:'',
		button:['确认'],
		select:0,
		allowScroll:false,
		callback:function(){}
	}
	// 构造函数
	var Dialog  = function (el,option,isFromTpl) {

		this.option=$.extend(defaults,option);
		this.element=$(el);
		this._isFromTpl=isFromTpl;
		this.button=$(el).find('[data-role="button"]');
		this._bindEvent();
		this.toggle();
	}
	Dialog.prototype={
		_bindEvent:function(){
			var self=this;
			self.button.on("tap",function(){
				var index=$(self.button).index($(this));
				// self.option.callback("button",index);
				var e=$.Event("dialog:action");
				e.index=index;
				self.element.trigger(e);
				self.hide.apply(self);
			});
		},
		toggle:function(){
			if(this.element.hasClass("show")){
				this.hide();
			}else{
				this.show();
			}
		},
		show:function(){
			var self=this;
			// self.option.callback("show");
			self.element.trigger($.Event("dialog:show"));
			self.element.addClass("show");
			this.option.allowScroll && self.element.on("touchmove" , _stopScroll);

		},
		hide :function () {
			var self=this;
			// self.option.callback("hide");
			self.element.trigger($.Event("dialog:hide"));
			self.element.off("touchmove" , _stopScroll);
			self.element.removeClass("show");
			
			self._isFromTpl&&self.element.remove();
		}
	}
	// 禁止冒泡
	function _stopScroll(){
		return false;
	}
	function Plugin(option) {

		return $.adaptObject(this, defaults, option,_dialogTpl,Dialog,"dialog");
	}
	$.fn.dialog=$.dialog= Plugin;
}(window.Zepto)
	


/**
 * User: jeakeyliang
 * Date: 14-11-07
 * Time: 下午9:20
 */

!function($){

	// 默认模板
	var _loadingTpl='<div class="ui-loading-block show">'+
		    '<div class="ui-loading-cnt">'+
		      '<i class="ui-loading-bright"></i>'+
		      '<p><%=content%></p>'+
		   '</div>'+
		 '</div>';
	
	// 默认参数
	var defaults={
		content:'加载中...'
	}
	// 构造函数
	var Loading   = function (el,option,isFromTpl) {
		var self=this;
		this.element=$(el);
		this._isFromTpl=isFromTpl;
		this.option=$.extend(defaults,option);
		this.show();
	}
	Loading.prototype={
		show:function(){
			var e=$.Event('loading:show');
			this.element.trigger(e);
			this.element.show();
			
		},
		hide :function () {
			var e=$.Event('loading:hide');
			this.element.trigger(e);
			this.element.remove();
		}
	}
	function Plugin(option) {

		return $.adaptObject(this, defaults, option,_loadingTpl,Loading,"loading");
	}
	$.fn.loading=$.loading= Plugin;
}(window.Zepto)
	


;(function ($) {

var rAF = window.requestAnimationFrame	||
	window.webkitRequestAnimationFrame	||
	window.mozRequestAnimationFrame		||
	window.oRequestAnimationFrame		||
	window.msRequestAnimationFrame		||
	function (callback) { window.setTimeout(callback, 1000 / 60); };


/*
 * 工具类
 */
var utils = (function () {

	var me = {};

	var _elementStyle = document.createElement('div').style;

	var _vendor = (function () {
		var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
			transform,
			i = 0,
			l = vendors.length;

		for ( ; i < l; i++ ) {
			transform = vendors[i] + 'ransform';
			if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
		}
		return false;
	})();

	function _prefixStyle (style) {
		if ( _vendor === false ) return false;
		if ( _vendor === '' ) return style;
		return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
	}


	me.getTime = Date.now || function getTime () { return new Date().getTime(); };


	me.extend = function (target, obj) {
		for ( var i in obj ) {
			target[i] = obj[i];
		}
	};


	me.addEvent = function (el, type, fn, capture) {
		el.addEventListener(type, fn, !!capture);	
	};


	me.removeEvent = function (el, type, fn, capture) {
		el.removeEventListener(type, fn, !!capture);
	};


	me.prefixPointerEvent = function (pointerEvent) {
		return window.MSPointerEvent ? 
			'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10):
			pointerEvent;
	};


	/**
     * 根据一定时间内的滑动距离计算出最终停止距离和时间。
     * @param current：当前滑动位置
     * @param start：touchStart 时候记录的开始位置，但是在touchmove时候可能被重写
     * @param time：touchstart 到手指离开时候经历的时间，同样可能被touchmove重写
     * @param lowerMargin：可移动的最大距离，这个一般为计算得出 this.wrapperHeight - this.scrollerHeight
     * @param wrapperSize：如果有边界距离的话就是可拖动，不然碰到0的时候便停止
     * @param deceleration：匀减速
     * @returns {{destination: number, duration: number}}
     */
	me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
		var distance = current - start,
			speed = Math.abs(distance) / time,
			destination,
			duration;

		deceleration = deceleration === undefined ? 0.0006 : deceleration;

		destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
		duration = speed / deceleration;

		if ( destination < lowerMargin ) {
			destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
			distance = Math.abs(destination - current);
			duration = distance / speed;
		} else if ( destination > 0 ) {
			destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
			distance = Math.abs(current) + destination;
			duration = distance / speed;
		}

		return {
			destination: Math.round(destination),
			duration: duration
		};
	};

	var _transform = _prefixStyle('transform');

	me.extend(me, {
		hasTransform: _transform !== false,
		hasPerspective: _prefixStyle('perspective') in _elementStyle,
		hasTouch: 'ontouchstart' in window,
		hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
		hasTransition: _prefixStyle('transition') in _elementStyle
	});

	// This should find all Android browsers lower than build 535.19 (both stock browser and webview)
	me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));

	me.extend(me.style = {}, {
		transform: _transform,
		transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
		transitionDuration: _prefixStyle('transitionDuration'),
		transitionDelay: _prefixStyle('transitionDelay'),
		transformOrigin: _prefixStyle('transformOrigin'),
		transitionProperty: _prefixStyle('transitionProperty')
	});


	me.offset = function (el) {
		var left = -el.offsetLeft,
			top = -el.offsetTop;

		while (el = el.offsetParent) {
			left -= el.offsetLeft;
			top -= el.offsetTop;
		}
		return {
			left: left,
			top: top
		};
	};


	/* 
	 * 配合 config 里面的 preventDefaultException 属性
	 * 不对匹配到的 element 使用 e.preventDefault()
	 * 默认阻止所有事件的冒泡，包括 click 或 tap
	 */
	me.preventDefaultException = function (el, exceptions) {
		for ( var i in exceptions ) {
			if ( exceptions[i].test(el[i]) ) {
				return true;
			}
		}
		return false;
	};


	me.extend(me.eventType = {}, {
		touchstart: 1,
		touchmove: 1,
		touchend: 1,

		mousedown: 2,
		mousemove: 2,
		mouseup: 2,

		pointerdown: 3,
		pointermove: 3,
		pointerup: 3,

		MSPointerDown: 3,
		MSPointerMove: 3,
		MSPointerUp: 3
	});


	me.extend(me.ease = {}, {
		quadratic: {
			style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			fn: function (k) {
				return k * ( 2 - k );
			}
		},
		circular: {
			style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
			fn: function (k) {
				return Math.sqrt( 1 - ( --k * k ) );
			}
		},
		back: {
			style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
			fn: function (k) {
				var b = 4;
				return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
			}
		},
		bounce: {
			style: '',
			fn: function (k) {
				if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
					return 7.5625 * k * k;
				} else if ( k < ( 2 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
				} else if ( k < ( 2.5 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
				} else {
					return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
				}
			}
		},
		elastic: {
			style: '',
			fn: function (k) {
				var f = 0.22,
					e = 0.4;

				if ( k === 0 ) { return 0; }
				if ( k == 1 ) { return 1; }

				return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
			}
		}
	});

	me.tap = function (e, eventName) {
		var ev = document.createEvent('Event');
		ev.initEvent(eventName, true, true);
		ev.pageX = e.pageX;
		ev.pageY = e.pageY;
		e.target.dispatchEvent(ev);
	};

	me.click = function (e) {
		var target = e.target,
			ev;
		if ( !(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName) ) {
			ev = document.createEvent('MouseEvents');
			ev.initMouseEvent('click', true, true, e.view, 1,
				target.screenX, target.screenY, target.clientX, target.clientY,
				e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
				0, null);

			ev._constructed = true;
			target.dispatchEvent(ev);
		}
	};

	return me;
})();



/*
 * 构造函数
 */
function Scroll(el, options) {

	this.wrapper = typeof el == 'string' ? $(el)[0] : el;

	this.options = {
		startX: 0,					// 初始化 X 坐标
		startY: 0,					// 初始化 Y 坐标
		scrollY: true,				// 竖向滚动
		scrollX: false,				// 默认非水平
		directionLockThreshold: 5,	// 确定滚动方向的阈值
		momentum: true,				// 是否开启惯性滚动

		duration: 300,				// transition 过渡时间

		bounce: true,				// 是否有反弹动画
		bounceTime: 600,			// 反弹动画时间
		bounceEasing: '',			// 反弹动画类型：'circular'(default), 'quadratic', 'back', 'bounce', 'elastic'

		preventDefault: true,		// 是否阻止默认滚动事件（和冒泡有区别）
		eventPassthrough: true,		// 穿透，是否触发原生滑动（取值 true、false、vertical、horizental）

		freeScroll: false,			// 任意方向的滚动。若 scrollX 和 scrollY 同时开启，则相当于 freeScroll

	    bindToWrapper : true,		// 事件是否绑定到 wrapper 元素上，否则大部分绑定到 window（若存在嵌套，则绑定在元素上最好）
    	resizePolling : 60,			// resize 时候隔 60ms 就执行 refresh 方法重新获取位置信息(事件节流)
    	
    	disableMouse : false,		// 是否禁用鼠标
	    disableTouch : false,		// 是否禁用touch事件
	    disablePointer : false,		// 是否禁用win系统的pointer事件

		tap: true,					// 是否模拟 tap 事件
		click: false,				// 是否模拟点击事件（false 则使用原生click事件）

		preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }, // 当遇到正则内的元素则不阻止冒泡

		HWCompositing: true, 		// Hardware acceleration
		useTransition: true,		// Transition || requestAnimationFrame
		useTransform: true			// Translate || Left/Top
	};


	for ( var i in options ) {
		this.options[i] = options[i];
	}


	// scroller
	// ==================================

	if (!this.options.role && this.options.scrollX === false) {
		this.options.eventPassthrough = 'horizontal';	// 竖直滚动的 scroller 不拦截横向原生滚动
	}

	// slide
	// ==================================

	if (this.options.role === 'slider') {

		this.options.scrollX = true;
		this.options.scrollY = false;
		this.options.momentum = false;

		this.scroller = $('.ui-slider-content')[0];
		$(this.scroller.children[0]).addClass('current');

		this.currentPage = 0;
		this.count = this.scroller.children.length;

		this.scroller.style.width = this.count+"00%";

		this.itemWidth = this.scroller.children[0].clientWidth;
		this.scrollWidth = this.itemWidth * this.count;

		

		if (this.options.indicator) {
			var temp = '<ul class="ui-slider-indicators">';

			for (var i=1; i<=this.count; i++) {
				if (i===1) {
					temp += '<li class="current">'+i+'</li>';
				}
				else {
					temp += '<li>'+i+'</li>';
				}
			}
			temp += '</ul>';
			$(this.wrapper).append(temp);
			this.indicator = $('.ui-slider-indicators')[0];
		}
	}


	// tab
	// ==================================

	else if (this.options.role === 'tab') {

		this.options.scrollX = true;
		this.options.scrollY = false;
		this.options.momentum = false;

		this.scroller = $('.ui-tab-content')[0];
		this.nav = $('.ui-tab-nav')[0];

		$(this.scroller.children[0]).addClass('current');
		$(this.nav.children[0]).addClass('current');

		this.currentPage = 0;
		this.count = this.scroller.children.length;

		this.scroller.style.width = this.count+"00%";

		this.itemWidth = this.scroller.children[0].clientWidth;
		this.scrollWidth = this.itemWidth * this.count;


	}
	else {
		this.scroller = this.wrapper.children[0];
	}
	this.scrollerStyle = this.scroller.style;


	this.translateZ = utils.hasPerspective && this.options.HWCompositing ? ' translateZ(0)' : '';
	this.options.useTransition = utils.hasTransition && this.options.useTransition;
	this.options.useTransform = utils.hasTransform && this.options.useTransform;
	this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
	this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;
	// If you want eventPassthrough I have to lock one of the axes
	this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;
	this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
	// With eventPassthrough we also need lockDirection mechanism
	this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
	this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;
	this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;
	this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

	if (this.options.tap === true) {
		this.options.tap = 'tap';
	}
	if (this.options.useTransform === false) {
		this.scroller.style.position = 'relative';
	}

	// Some defaults
	this.x = 0;
	this.y = 0;
	this.directionX = 0;
	this.directionY = 0;
	this._events = {};

	this._init();	// 绑定各种事件
	this.refresh();

	this.scrollTo(this.options.startX, this.options.startY);
	this.enable();

	// 自动播放
	if (this.options.autoplay) {
		var context = this;
		this.options.interval = this.options.interval || 2000;
		this.options.flag = setTimeout(function(){
			context._autoplay.apply(context)
		}, context.options.interval);
	}
}



Scroll.prototype = {

	_init: function () {
		this._initEvents();
	},

	_initEvents: function (remove) {
		var eventType = remove ? utils.removeEvent : utils.addEvent,
			target = this.options.bindToWrapper ? this.wrapper : window;

		/*
		 * 给 addEventListener 传递 this
		 * 程序会自动找到 handleEvent 方法作为回调函数
		 */
		eventType(window, 'orientationchange', this);
		eventType(window, 'resize', this);

		if ( this.options.click ) {
			eventType(this.wrapper, 'click', this, true);
		}

		if ( !this.options.disableMouse ) {
			eventType(this.wrapper, 'mousedown', this);
			eventType(target, 'mousemove', this);
			eventType(target, 'mousecancel', this);
			eventType(target, 'mouseup', this);
		}

		if ( utils.hasPointer && !this.options.disablePointer ) {
			eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
			eventType(target, utils.prefixPointerEvent('pointermove'), this);
			eventType(target, utils.prefixPointerEvent('pointercancel'), this);
			eventType(target, utils.prefixPointerEvent('pointerup'), this);
		}

		if ( utils.hasTouch && !this.options.disableTouch ) {
			eventType(this.wrapper, 'touchstart', this);
			eventType(target, 'touchmove', this);
			eventType(target, 'touchcancel', this);
			eventType(target, 'touchend', this);
		}

		eventType(this.scroller, 'transitionend', this);
		eventType(this.scroller, 'webkitTransitionEnd', this);
		eventType(this.scroller, 'oTransitionEnd', this);
		eventType(this.scroller, 'MSTransitionEnd', this);

		// tab
		// =============================
		if (this.options.role === 'tab') {
			eventType(this.nav, 'touchend', this);
			eventType(this.nav, 'mouseup', this);
			eventType(this.nav, 'pointerup', this);
		}
	},

	
	refresh: function () {
		var rf = this.wrapper.offsetHeight;	// Force reflow

		// http://jsfiddle.net/y8Y32/25/
		// clientWidth = content + padding
		this.wrapperWidth	= this.wrapper.clientWidth;
		this.wrapperHeight	= this.wrapper.clientHeight;


		// 添加 wrapper 的 padding 值到 scroller 身上，更符合使用预期
		var matrix = window.getComputedStyle(this.wrapper, null); 
		var pt = matrix['padding-top'].replace(/[^-\d.]/g, ''),
			pb = matrix['padding-bottom'].replace(/[^-\d.]/g, ''),
			pl = matrix['padding-left'].replace(/[^-\d.]/g, ''),
			pr = matrix['padding-right'].replace(/[^-\d.]/g, '');

		var matrix2 = window.getComputedStyle(this.scroller, null);
		var	mt2 = matrix2['margin-top'].replace(/[^-\d.]/g, ''),
			mb2 = matrix2['margin-bottom'].replace(/[^-\d.]/g, ''),
			ml2 = matrix2['margin-left'].replace(/[^-\d.]/g, ''),
			mr2 = matrix2['margin-right'].replace(/[^-\d.]/g, '');


		// offsetWidth = content + padding + border
		this.scrollerWidth	= this.scroller.offsetWidth+parseInt(pl)+parseInt(pr)+parseInt(ml2)+parseInt(mr2);
		this.scrollerHeight	= this.scroller.offsetHeight+parseInt(pt)+parseInt(pb)+parseInt(mt2)+parseInt(mb2);


		// slide
		// ==================================
		if (this.options.role === 'slider' || this.options.role === 'tab') {
			this.itemWidth = this.scroller.children[0].clientWidth;
            this.scrollWidth = this.itemWidth * this.count;
			this.scrollerWidth = this.scrollWidth;
		}

		this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
		this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;

		this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
		this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;

		if ( !this.hasHorizontalScroll ) {
			this.maxScrollX = 0;
			this.scrollerWidth = this.wrapperWidth;
		}

		if ( !this.hasVerticalScroll ) {
			this.maxScrollY = 0;
			this.scrollerHeight = this.wrapperHeight;
		}

		this.endTime = 0;
		this.directionX = 0;
		this.directionY = 0;

		this.wrapperOffset = utils.offset(this.wrapper);
		this.resetPosition();
	},
	
	
	handleEvent: function (e) {
		switch ( e.type ) {
			case 'touchstart':
			case 'pointerdown':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);
				break;
			case 'touchmove':
			case 'pointermove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
			case 'pointerup':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'pointercancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break;
			case 'orientationchange':
			case 'resize':
				this._resize();
				break;
			case 'transitionend':
			case 'webkitTransitionEnd':
			case 'oTransitionEnd':
			case 'MSTransitionEnd':
				this._transitionEnd(e);
				break;
			case 'wheel':
			case 'DOMMouseScroll':
			case 'mousewheel':
				this._wheel(e);
				break;
			case 'keydown':
				this._key(e);
				break;
			case 'click':
				if ( !e._constructed ) {
					e.preventDefault();
					e.stopPropagation();
				}
				break;
		}
	},



	_start: function (e) {

		if ( utils.eventType[e.type] != 1 ) {	// 如果是鼠标点击，则只响应鼠标左键
			if ( e.button !== 0 ) {
				return;
			}
		}

		if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
			return;
		}

		// 如果 preventDefault === true 且 不是落后的安卓版本 且 不是需要过滤的 target 就阻止默认的行为
		if ( this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();
		}

		var point = e.touches ? e.touches[0] : e,	// 检验是触摸事件对象还是鼠标事件对象
			pos;

		this.initiated	= utils.eventType[e.type];	// 初始化事件类型（1：触摸，2：鼠标，3：pointer）
		this.moved		= false;
		this.distX		= 0;
		this.distY		= 0;
		this.directionX = 0;
		this.directionY = 0;
		this.directionLocked = 0;

		this._transitionTime();
		this.startTime = utils.getTime();

		// 定住正在滑动的 scroller，slider/tab 不这么做
		if ( this.options.useTransition && this.isInTransition && this.options.role !== 'slider' && this.options.role !== 'tab') {
			this.isInTransition = false;
			pos = this.getComputedPosition();
			this._translate(Math.round(pos.x), Math.round(pos.y));
		}
		// 场景：（没有使用 Transition 属性）
		else if ( !this.options.useTransition && this.isAnimating ) {
			this.isAnimating = false;
		}

		this.startX    = this.x;
		this.startY    = this.y;
		this.absStartX = this.x;
		this.absStartY = this.y;
		this.pointX    = point.pageX;
		this.pointY    = point.pageY;

		// throttle
		// ======================
		if (this.options.autoplay) {
			var context = this;

			clearTimeout(this.options.flag);
			this.options.flag = setTimeout(function() {
				context._autoplay.apply(context);
			}, context.options.interval);
		}

		event.stopPropagation();
	},



	_move: function (e) {

		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {	// 如果事件类型和 touchstart 初始化的事件类型不一致，退出
			return;
		}
		if ( this.options.preventDefault ) {	// 这么做才能确保 Android 下 touchend 能被正常触发（需测试）
			e.preventDefault();
		}
		var point		= e.touches ? e.touches[0] : e,
			deltaX		= point.pageX - this.pointX,
			deltaY		= point.pageY - this.pointY,
			timestamp	= utils.getTime(),
			newX, newY,
			absDistX, absDistY;

		this.pointX		= point.pageX;
		this.pointY		= point.pageY;

		this.distX		+= deltaX;
		this.distY		+= deltaY;
		absDistX		= Math.abs(this.distX);
		absDistY		= Math.abs(this.distY);
		

		// 如果在很长的时间内只移动了少于 10 像素的距离，那么不会触发惯性滚动
		if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
			return;
		}

		// 屏蔽滚动方向的另外一个方向（可配置）
		if ( !this.directionLocked && !this.options.freeScroll ) {
			if ( absDistX > absDistY + this.options.directionLockThreshold ) {
				this.directionLocked = 'h';		// lock horizontally
			} else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
				this.directionLocked = 'v';		// lock vertically
			} else {
				this.directionLocked = 'n';		// no lock
			}
		}
		if ( this.directionLocked == 'h' ) {
			// slider/tab 外层高度自适应
			if (this.options.role === 'tab') {
				$(this.scroller).children('li').height('auto');	
			}
			if ( this.options.eventPassthrough == 'vertical' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'horizontal' ) {
				this.initiated = false;
				return;
			}
			deltaY = 0;	// 不断重置垂直偏移量为 0
		}
		else if ( this.directionLocked == 'v' ) {
			if ( this.options.eventPassthrough == 'horizontal' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'vertical' ) {
				this.initiated = false;
				return;
			}
			deltaX = 0;	// 不断重置水平偏移量为 0
		}

		deltaX = this.hasHorizontalScroll ? deltaX : 0;
		deltaY = this.hasVerticalScroll ? deltaY : 0;
		
		newX = this.x + deltaX;
		newY = this.y + deltaY;

		// Slow down if outside of the boundaries
		if ( newX > 0 || newX < this.maxScrollX ) {
			newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
		}
		if ( newY > 0 || newY < this.maxScrollY ) {
			newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
		}

		this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		this.moved = true;	// 滚动开始
		this._translate(newX, newY);

		if ( timestamp - this.startTime > 300 ) {	// 每 300 毫秒重置一次初始值
			this.startTime = timestamp;
			this.startX = this.x;
			this.startY = this.y;
		}
	},



	_end: function (e) {

		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();
		}

		var point = e.changedTouches ? e.changedTouches[0] : e,	// 移开屏幕的那个触摸点，只会包含在 changedTouches 列表中，而不会包含在 touches 或 targetTouches 列表中
			momentumX,
			momentumY,
			duration = utils.getTime() - this.startTime,
			newX = Math.round(this.x),
			newY = Math.round(this.y),
			distanceX = Math.abs(newX - this.startX),
			distanceY = Math.abs(newY - this.startY),
			time = 0,
			easing = '';

		this.isInTransition = 0;
		this.initiated = 0;
		this.endTime = utils.getTime();
	

		if ( this.resetPosition(this.options.bounceTime) ) {	// reset if we are outside of the boundaries
			if (this.options.role === 'tab') {
				$(this.scroller.children[this.currentPage]).siblings('li').height(0);	
			}
			return;
		}

		this.scrollTo(newX, newY);	// ensures that the last position is rounded

		if (!this.moved) {	// we scrolled less than 10 pixels
			if (this.options.tap && utils.eventType[e.type] === 1) {
				utils.tap(e, this.options.tap);
			}
			if ( this.options.click) {
				utils.click(e);
			}
		}

		// 300ms 内的滑动要启动惯性滚动
		if ( this.options.momentum && duration < 300 ) {
			momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
			momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
			newX = momentumX.destination;
			newY = momentumY.destination;
			time = Math.max(momentumX.duration, momentumY.duration);
			this.isInTransition = 1;
		}

		if ( newX != this.x || newY != this.y ) {
			// change easing function when scroller goes out of the boundaries
			if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
				easing = utils.ease.quadratic;
			}
			this.scrollTo(newX, newY, time, easing);
			return;
		}


		// tab
		// ==========================
		if (this.options.role === 'tab' && $(event.target).closest('ul').hasClass('ui-tab-nav')) {
			$(this.nav).children().removeClass('current');
			$(event.target).addClass('current');
			var tempCurrentPage = this.currentPage;
			this.currentPage = $(event.target).index();

			$(this.scroller).children().height('auto');	// tab 外层高度自适应
			this._execEvent('beforeScrollStart', tempCurrentPage, this.currentPage);
		}



		// slider & tab
		// ==============================
		if (this.options.role === 'slider' || this.options.role === 'tab') {

			if (distanceX < 30) {
				this.scrollTo(-this.itemWidth*this.currentPage, 0, this.options.bounceTime, this.options.bounceEasing);
			}
			else if (newX-this.startX<0) {	// 向前
				this._execEvent('beforeScrollStart', this.currentPage, this.currentPage+1);
				this.scrollTo(-this.itemWidth*++this.currentPage, 0, this.options.bounceTime, this.options.bounceEasing);
			}
			else if (newX-this.startX>=0) {	// 向后
				this._execEvent('beforeScrollStart', this.currentPage, this.currentPage-1);
				this.scrollTo(-this.itemWidth*--this.currentPage, 0, this.options.bounceTime, this.options.bounceEasing);
			}

			// tab 外层高度自适应
			if (this.options.role === 'tab') {
				$(this.scroller.children[this.currentPage]).siblings('li').height(0);
			}

			if (this.indicator && distanceX >= 30) {
				$(this.indicator).children().removeClass('current');
				$(this.indicator.children[this.currentPage]).addClass('current');
			}
			else if (this.nav && distanceX >= 30) {
				$(this.nav).children().removeClass('current');
				$(this.nav.children[this.currentPage]).addClass('current');
			}

			$(this.scroller).children().removeClass('current');
			$(this.scroller.children[this.currentPage]).addClass('current');
		}
	},


	_resize: function () {
		var that = this;
		clearTimeout(this.resizeTimeout);
		this.resizeTimeout = setTimeout(function () {
			that.refresh();
		}, this.options.resizePolling);
	},


	_transitionEnd: function (e) {
		if ( e.target != this.scroller || !this.isInTransition ) {
			return;
		}
		this._transitionTime();

		if ( !this.resetPosition(this.options.bounceTime) ) {
			this.isInTransition = false;
			this._execEvent('scrollEnd', this.currentPage);
		}
	},


	destroy: function () {
		this._initEvents(true);		// 去除事件绑定
	},


	resetPosition: function (time) {
		var x = this.x,
			y = this.y;

		time = time || 0;

		if ( !this.hasHorizontalScroll || this.x > 0 ) {
			x = 0;
		} else if ( this.x < this.maxScrollX ) {
			x = this.maxScrollX;
		}

		if ( !this.hasVerticalScroll || this.y > 0 ) {
			y = 0;
		} else if ( this.y < this.maxScrollY ) {
			y = this.maxScrollY;
		}

		if ( x == this.x && y == this.y ) {
			return false;
		}
		this.scrollTo(x, y, time, this.options.bounceEasing);
		return true;
	},



	disable: function () {
		this.enabled = false;
	},

	enable: function () {
		this.enabled = true;
	},



	on: function (type, fn) {
		if ( !this._events[type] ) {
			this._events[type] = [];
		}
		this._events[type].push(fn);
	},
	off: function (type, fn) {
		if ( !this._events[type] ) {
			return;
		}

		var index = this._events[type].indexOf(fn);

		if ( index > -1 ) {
			this._events[type].splice(index, 1);
		}
	},


	_execEvent: function (type) {
		if ( !this._events[type] ) {
			return;
		}
		var i = 0,
			l = this._events[type].length;

		if ( !l ) {
			return;
		}
		for ( ; i < l; i++ ) {
			this._events[type][i].apply(this, [].slice.call(arguments, 1));
		}
	},


	scrollTo: function (x, y, time, easing) {
		easing = easing || utils.ease.circular;

		this.isInTransition = this.options.useTransition && time > 0;

		if ( !time || (this.options.useTransition && easing.style) ) {

			if (this.options.role === 'slider' || this.options.role === 'tab') {	// 不添加判断会影响 left/top 的过渡
				time = this.options.duration;
				this.scrollerStyle[utils.style.transitionProperty] = utils.style.transform;	
			}
			this.scrollerStyle[utils.style.transitionTimingFunction] = easing.style;
			this._transitionTime(time);
			this._translate(x, y);
		} else {
			this._animate(x, y, time, easing.fn);
		}
	},


	scrollToElement: function (el, time, offsetX, offsetY, easing) {
		el = el.nodeType ? el : this.scroller.querySelector(el);

		if ( !el ) {
			return;
		}
		var pos = utils.offset(el);
		pos.left -= this.wrapperOffset.left;
		pos.top  -= this.wrapperOffset.top;

		// if offsetX/Y are true we center the element to the screen
		// 若 offsetX/Y 都是 true，则会滚动到元素在屏幕中间的位置
		if ( offsetX === true ) {
			offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
		}
		if ( offsetY === true ) {
			offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
		}
		pos.left -= offsetX || 0;
		pos.top  -= offsetY || 0;
		pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
		pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;

		time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;

		this.scrollTo(pos.left, pos.top, time, easing);
	},


	_transitionTime: function (time) {
		time = time || 0;
		this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

		if ( !time && utils.isBadAndroid ) {
			this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
		}
	},


	_translate: function (x, y) {
		if ( this.options.useTransform ) {
			this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;
		} else {
			x = Math.round(x);
			y = Math.round(y);
			this.scrollerStyle.left = x + 'px';
			this.scrollerStyle.top = y + 'px';
		}
		this.x = x;
		this.y = y;
	},


	getComputedPosition: function () {
		var matrix = window.getComputedStyle(this.scroller, null),
			x, y;

		if ( this.options.useTransform ) {
			matrix = matrix[utils.style.transform].split(')')[0].split(', ');
			x = +(matrix[12] || matrix[4]);
			y = +(matrix[13] || matrix[5]);
		} else {
			x = +matrix.left.replace(/[^-\d.]/g, '');
			y = +matrix.top.replace(/[^-\d.]/g, '');
		}

		return { x: x, y: y };
	},

	
	_animate: function (destX, destY, duration, easingFn) {	// 当浏览器不支持 transition 时提供的退化方案 requestAnimationFrame
		var that = this,
			startX = this.x,
			startY = this.y,
			startTime = utils.getTime(),
			destTime = startTime + duration;

		function step () {
			var now = utils.getTime(),
				newX, newY,
				easing;

			if ( now >= destTime ) {
				that.isAnimating = false;
				that._translate(destX, destY);

				if ( !that.resetPosition(that.options.bounceTime) ) {
					that._execEvent('scrollEnd', this.currentPage);
				}
				return;
			}

			now = ( now - startTime ) / duration;
			easing = easingFn(now);
			newX = ( destX - startX ) * easing + startX;
			newY = ( destY - startY ) * easing + startY;
			that._translate(newX, newY);

			if ( that.isAnimating ) {
				rAF(step);
			}
		}
		this.isAnimating = true;
		step();
	},


	_autoplay: function() {
		var self = this,
			curPage = self.currentPage;
		
		self.currentPage = self.currentPage >= self.count-1 ? 0 : ++self.currentPage;
		self._execEvent('beforeScrollStart', curPage, self.currentPage);	// 对于自动播放的 slider/tab，这个时机就是 beforeScrollStart

		// tab 外层高度自适应
		if (this.options.role === 'tab') {
			$(this.scroller).children().height('auto');
			document.body.scrollTop = 0;
		}
		self.scrollTo(-self.itemWidth*self.currentPage, 0, self.options.bounceTime, self.options.bounceEasing);

		if (self.indicator) {
			$(self.indicator).children().removeClass('current');
			$(self.indicator.children[self.currentPage]).addClass('current');
			$(self.scroller).children().removeClass('current');
			$(self.scroller.children[self.currentPage]).addClass('current');
		}
		else if (self.nav) {
			$(self.nav).children().removeClass('current');
			$(self.nav.children[self.currentPage]).addClass('current');
			$(self.scroller).children().removeClass('current');
			$(self.scroller.children[self.currentPage]).addClass('current');
		}

		self.options.flag = setTimeout(function() {
			self._autoplay.apply(self);
		}, self.options.interval);
	}


};

// Scroll.utils = utils;
window.fz = window.fz || {};
window.frozen = window.frozen || {};
window.fz.Scroll = window.frozen.Scroll = Scroll;

/*
 * 兼容 RequireJS 和 Sea.js
 */
if (typeof define === "function") {
	define(function(require, exports, module) {
		module.exports = Scroll;
	})
}

})(window.Zepto);
/**
 * User: jeakeyliang
 * Date: 14-11-07
 * Time: 下午9:20
 */

!function($){

	// 默认模板
	var _tipsTpl='<div class="ui-poptips ui-poptips-<%=type%>">'+
					'<div class="ui-poptips-cnt">'+
    				'<i></i><%=content%>'+
					'</div>'+
				'</div>';
	
	// 默认参数
	var defaults={
		content:'',
		stayTime:1000,
		type:'info',
		callback:function(){}
	}
	// 构造函数
	var Tips   = function (el,option,isFromTpl) {
		var self=this;
		this.element=$(el);
		this._isFromTpl=isFromTpl;
		this.elementHeight=$(el).height();

		this.option=$.extend(defaults,option);
		$(el).css({
			"-webkit-transform":"translateY(-"+this.elementHeight+"px)"
		});
		setTimeout(function(){
			$(el).css({
				"-webkit-transition":"all .5s"
			});
			self.show();
		},20);
		
	}
	Tips.prototype={
		show:function(){
			var self=this;
			// self.option.callback("show");
			self.element.trigger($.Event("tips:show"));
			this.element.css({
				"-webkit-transform":"translateY(0px)"
			});
			if(self.option.stayTime>0){
				setTimeout(function(){
					self.hide();
				},self.option.stayTime)
			}
		},
		hide :function () {
			var self=this;
			self.element.trigger($.Event("tips:hide"));
			this.element.css({
				"-webkit-transform":"translateY(-"+this.elementHeight+"px)"
			});
			setTimeout(function(){
				self._isFromTpl&&self.element.remove();
			},500)
				
			
		}
	}
	function Plugin(option) {

		return $.adaptObject(this, defaults, option,_tipsTpl,Tips,"tips");
	}
	$.fn.tips=$.tips= Plugin;
}(window.Zepto)
	

