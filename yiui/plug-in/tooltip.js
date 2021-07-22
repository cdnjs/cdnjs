/*
<button id="btn" tooltip="对象||字符"></button>
对象参数：
{
	text:'显示的文字',
	placement:'left|right|top|bottom',//tip出现的位置
	noClose:false,//默认false,不可关闭
	show:false,//默认false，初始后显示
	css:{backgroundColor:'#FFF',color:'#333'},//设置样式
	gap:5,//默认5，与对象距离
	duration:500,//淡出淡入长度
	
}
var tip = new initToolTip(); //初始所有tooltip, mouseover-鼠标移上就可以显示

//动态向对象设置tip
var mytip = tip.setToolTip('#btn',{text:'hello'});
//关闭对象动态设置的tip
mytip.close();

【原生JS】
*/
function initToolTip(){
	var toolTipList = document.querySelectorAll('[tooltip]');
	var autoID = 0;
	
	function css(el,css){
		for(var k in css){
			el.style[k] = css[k];
		}
	}
	
	function showTip(){
		var _this = this;
		
		if(this.mouseTimer){
			clearTimeout(this.mouseTimer);
			delete this.mouseTimer;
			if(document.querySelector('#tooltip-'+this.toolTipID)){
				document.body.removeChild(document.querySelector('#tooltip-'+this.toolTipID));
			}
			delete this.toolTipID ;
		}
		
		if(this.toolTipID){return;}
		var el = document.createElement('div');
		var opts = getOptions(this);
		var duration = typeof opts.duration == 'undefined' ? 0.5 : opts.duration / 1000;
		el.setAttribute('style','padding:0.4rem;line-height:1.2;border-radius:0.4rem;font-size:0.8rem;pointer-events:none;visibility:hidden;transition:all '+duration+'s;opacity:0;position:absolute;max-width:200px;box-sizing:border-box;');
		el.innerHTML = opts.text;
		
		document.body.appendChild(el);
		
		var gap = typeof opts.gap == 'undefined' ? 10 : opts.gap + 5;
		var bgcolor = (opts.css ? opts.css.backgroundColor : undefined) || opts.bgColor || 'rgba(0,0,0,0.9)';
		
		var posLeft = this.offsetLeft + (this.offsetWidth - el.offsetWidth)/2;
		var posTop = this.offsetTop - el.offsetHeight -gap;
		
		var arrow = document.createElement('span');
		var arrowStyle = 'position:absolute;width:0;height:0;display:block;';
		switch(opts.placement){
			case 'left':
				arrowStyle += "border-bottom: 5px solid transparent;border-left: 5px solid "+bgcolor+";border-top: 5px solid transparent;";
				break;
			case 'right':
				arrowStyle += "border-bottom: 5px solid transparent;border-right: 5px solid "+bgcolor+";border-top: 5px solid transparent;";
				break;
			case 'top':
				arrowStyle += "border-left: 5px solid transparent;border-right: 5px solid transparent;border-top: 5px solid "+bgcolor+";";
				break;
			case 'bottom':
				arrowStyle += "border-left: 5px solid transparent;border-right: 5px solid transparent;border-bottom: 5px solid "+bgcolor+";";
				break;
			default:
				arrowStyle += "border-left: 5px solid transparent;border-right: 5px solid transparent;border-top: 5px solid "+bgcolor+";";
		}
		arrow.setAttribute('style',arrowStyle);
		el.appendChild(arrow);
		
		css(el,{
			backgroundColor:bgcolor,
			color:'#FFF',
			left:function(){
				switch(opts.placement){
					case 'top':
						return _this.offsetLeft + (_this.offsetWidth - el.offsetWidth)/2 + 'px';
					case 'bottom':
						return _this.offsetLeft + (_this.offsetWidth - el.offsetWidth)/2 + 'px';
					case 'left':
						return _this.offsetLeft - el.offsetWidth - gap + 'px';
					case 'right':
						return _this.offsetLeft + _this.offsetWidth + gap + 'px';
					default:
						return _this.offsetLeft + (_this.offsetWidth - el.offsetWidth)/2 + 'px'
					
				}
			}(),
			top:function(){
				switch(opts.placement){
					case 'top':
						return _this.offsetTop - el.offsetHeight - gap + 'px';
					case 'bottom':
						return _this.offsetTop + _this.offsetHeight + gap + 'px';
					case 'left':
						return _this.offsetTop + (_this.offsetHeight - el.offsetHeight) / 2 + 'px';
					case 'right':
						return _this.offsetTop + (_this.offsetHeight - el.offsetHeight) / 2 + 'px';
					default:
						return _this.offsetTop - el.offsetHeight - gap + 'px';
				}
			}(),
			visibility:'visible',
			opacity:1,
		});
		
		if(opts.css){
			css(el,opts.css);
		}
		
		/*arrow*/
		css(arrow,{
			left:function(){
				switch(opts.placement){
					case 'left':
						return el.offsetWidth + 'px';
					case 'right':
						return 0 - arrow.offsetWidth + 'px';
					case 'bottom':
						return (el.offsetWidth - arrow.offsetWidth) / 2 + 'px';
					case 'top':
						return (el.offsetWidth - arrow.offsetWidth) / 2 + 'px';
					default:
						return (el.offsetWidth - arrow.offsetWidth) / 2 + 'px';
				}
				
			}(),
			top:function(){
				switch(opts.placement){
					case 'left':
						return (el.offsetHeight - arrow.offsetHeight) / 2  + 'px';
					case 'right':
						return (el.offsetHeight - arrow.offsetHeight) / 2  + 'px';
					case 'bottom':
						return (0 - arrow.offsetHeight) + 'px';
					case 'top':
						return el.offsetHeight + 'px';
					default:
						return el.offsetHeight + 'px';
				}
				
			}(),
		})

		autoID++;
		el.setAttribute('id','tooltip-'+autoID);
		this.toolTipID = autoID;
	}
	
	function removeTip(){
		if(!this.toolTipID){return;}
		var me = this;
		var tip = document.querySelector('#tooltip-'+me.toolTipID);
		var opts = getOptions(me);
		var duration = typeof opts.duration == 'undefined' ? 0.5 : opts.duration / 1000;
		css(tip,{transition:'all '+duration+'s', opacity:0});
		this.mouseTimer = setTimeout(function(){
			if(document.querySelector('#tooltip-'+me.toolTipID)){
				document.body.removeChild(document.querySelector('#tooltip-'+me.toolTipID));
			}
			delete me.toolTipID ;
			delete me.mouseTimer;
		},duration*1000);
	}
	
	function getOptions(obj){
		var tipText = obj.getAttribute('tooltip');
		var text = (new RegExp(/^{.*?}$/)).test(tipText) ? tipText : '"'+tipText+'"';
		var parseText = new Function('tipText','return '+text);
		var opts = parseText(tipText);
		opts = typeof opts == 'object' ? opts : {text:tipText};
		return opts;
	}
	
	this.setToolTip = function(el,opts){
		el = typeof el == 'object' ? el : document.querySelector(el);
		el.setAttribute('tooltip', typeof opts == 'object' ? JSON.stringify(opts) : opts);
		showTip.call(el);
		return {
			close:function(){removeTip.call(el);}
		}
	};
	
	
	[].forEach.call(toolTipList,function(toolTip){
		var opts = getOptions(toolTip);
		toolTip.addEventListener('mouseover',showTip,false);
		
		if(!opts.noClose){
			toolTip.addEventListener('mouseout',removeTip,false);
		}
		
		
		if(opts.show){
			showTip.call(toolTip);
		}
		
		
	})
}