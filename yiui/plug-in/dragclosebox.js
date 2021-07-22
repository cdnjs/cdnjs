/*
【用于移动端】
<div id="dragbox" style="display:none;">
	<div class="scroll" style="overflow:auto;">内容</div> 或
	<iframe class="scroll" onload="init()" src="frame.html" frameborder="0" style="width:100%;height:100%;"></iframe>
</div>

//【scroll用iframe对象，一定要onload后再执行以下初始化，经验：加载列表，量大的，用iframe，不然会卡】
var dragbox = new dragCloseBox('#dragbox',{
	scroll:'.scroll',//scroll即为含有滚动条的元素，可以是div也可以是iframe，iframe不能跨域，iframe里元素必须设置class="scroll" (对应这个设置，也可以是其他)
	css:{height:'80%'},//设置样式
	mask:{
		css:{backgroundColor:'rgba(0,0,0,0.7)'} //设置遮罩样式
	},//遮罩，默认false
});
dragbox.show();//显示框
dragbox.close();//关闭
【原生JS】
*/
function dragCloseBox(elstr,opts){
	var el = document.querySelector(elstr);
	var oldStyle = el.getAttribute('style');
	el.setAttribute('style',oldStyle+';width:100%;height:80%;background-color:#FFF;box-shadow:0 -0.5rem 1rem rgba(0,0,0,0.1);position:fixed;z-index:9;bottom:0;left:0;border-top-left-radius:1rem;border-top-right-radius:1rem;box-sizing:border-box;overflow:hidden;');
	if(typeof opts.css == 'object'){
		for(var k in opts.css){
			el.style[k] = opts.css[k];
		}
	}
	var scroll = document.querySelector(opts.scroll);
	var isframe = scroll.nodeName == 'IFRAME';
	scroll = isframe ? (scroll.contentDocument.querySelector(opts.scroll) || scroll.contentDocument) : scroll;
	var mask = null;
	if(opts.mask){
		mask = document.createElement('div');
		mask.setAttribute('style','width:100%;height:100%;position:fixed;background-color:rgba(0,0,0,0.7);left:0;top:0;display:none;');
		mask.style.zIndex = el.style.zIndex -1;
		if(typeof opts.mask.css == 'object'){
			for(var k in opts.mask.css){
				mask.style[k] = opts.mask.css[k];
			}
		}
		document.body.appendChild(mask);
	}

	console.log([scroll]);
	
	
	var startY = null;
	var scrolling = false;
	var newY = null;
	var _this = this;
	var duration = typeof opts.duration == 'undefined' ? 300 : opts.duration;
	var ds = duration / 1000;
	
	function dragStart(e){
		var ev = e.touches ? e.touches[0] : e;
		startY = ev.screenY;
		el.style.transition = null;
		if(mask){
			mask.style.transition = null;
		}
	}
	
	function dragMove(e){
		if(startY == null){return;}
		var ev = e.touches ? e.touches[0] : e;
		if(scroll.scrollTop == 0){
			var fs = false;
			if(scrolling){
				startY = ev.screenY;
				scrolling = false;
				fs = true;
			}
			newY = ev.screenY - startY;
			if(newY < 0){newY = 0;}
			el.style.transform = 'translateY('+newY+'px)';
			if(!fs && newY > 0 && e.cancelable){
				e.preventDefault()
			}
			if(mask){
				mask.style.opacity = 1 - newY / el.offsetHeight;
			}
		}else{
			scrolling = true;
			newY = ev.screenY - startY;
		}
	}
	
	function dragEnd(){
		el.style.transition = 'transform '+ds+'s';
		if(newY  && newY > el.offsetHeight / 3 && scroll.scrollTop == 0){
			_this.close();
		}else{
			el.style.transform = 'translateY(0)';
		}
		startY = null;
		newY = null;
	}
	
	this.show = function(){
		el.style.transition = null;
		el.style.display = 'block';
		el.style.transform = 'translateY('+el.offsetHeight+'px)';
		document.querySelector('html').style.overflow = 'hidden';
		
		if(mask){
			mask.style.display = 'block';
			mask.style.opacity = '0';
		}

		setTimeout(function(){
			el.style.transition = 'transform '+ds+'s';
			el.style.transform = 'translateY(0)';
			
			if(mask){
				mask.style.transition = 'opacity '+ds+'s';
				mask.style.opacity = '1';
			}
			
		},20);
		
	}
	
	this.close = function(){
		el.style.transition = 'transform '+ds+'s';
		el.style.transform = 'translateY('+el.offsetHeight+'px)';
		
		if(mask){
			mask.style.transition = 'opacity '+ds+'s';
			mask.style.opacity = '0';
		}
		setTimeout(function(){
			el.style.display = 'none';
			if(mask){
				mask.style.display = 'none';
			}
		},duration);
		document.querySelector('html').style.overflow = null;
		
	}
	
	el.addEventListener('touchstart',dragStart,false);
	document.addEventListener('touchmove',dragMove,{passive: false});
	document.addEventListener('touchend',dragEnd,false);
	
	if(isframe){
		var frameDoc = document.querySelector(opts.scroll).contentDocument;
		frameDoc.addEventListener('touchstart',dragStart,false);
        frameDoc.addEventListener('touchmove',dragMove,{passive: false});
        frameDoc.addEventListener('touchend',dragEnd,false);
	}
	
	if(mask){
		mask.addEventListener('click',this.close);
	}
	
	if(typeof opts.inited == 'funciton'){
		opts.inited();
	}
}