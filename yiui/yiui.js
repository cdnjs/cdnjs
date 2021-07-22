/* transform的matrix互转 */
function matrix(){return arguments;}
function matrix3d(){return arguments;}
function toMatrix(args){
    var list = [];
    [].forEach.call(args,function(v){
        list.push(v);
    });
    var matrixStr = list.length > 13 ? 'matrix3d' : 'matrix';
    return matrixStr + '(' + list.join(',') +')';
}

/* 类似Object.assign 合并对象 */
function extend(){
    var i = 1;
    var args = arguments[0];
    [].forEach.call(arguments,function(arg){
        for (var k in arg) {
            args[k] = arg[k];
        }
    });
    return args;
}

/* 添加DOM属性 */
function _bind(obj){
    var isdom = typeof obj.nodeType != 'undefined';

    /*绑定事件*/
    obj.on = function(ev,fn){
        var events = ev.split(' ');
        var _this = this;
        [].forEach.call(events,function(event){
            if(event.trim()){
                if(_this[event]){
                    _this[event](fn);
                }else{
                    _this.addEventListener(event,fn,false);
                    var tmpEvents = _this._events || [];
                    tmpEvents.push({
                        event:event,
                        fn:fn
                    });
                }
            }
        })
        return this;
    }

    /*解绑事件*/
    obj.un = function(ev,fn){
        var events = ev.split(' ');
        var _this = this;
        [].forEach.call(events,function(event){
            if(event.trim()){
                if(_this[event]){
                    _this._un = _this._un || [];
                    _this._un.forEach(function(cacheEvent){
                        if(event == cacheEvent.event && (typeof fn == 'undefined' || fn.toString() == cacheEvent.fn.toString() )){
                            cacheEvent.do();
                        }
                    });
                }
                if(typeof fn == 'undefined'){
                    _this._events = _this._events || [];
                    [].forEach.call(_this._events,function(cacheEvent,index){
                        if(event == cacheEvent.event){
                            _this.removeEventListener(event,cacheEvent.fn);
                            _this._events.splice(index,1);
                        }
                    })
                }else{
                    _this.removeEventListener(event,fn);
                }
            }
        })
        return this;
    }

    obj.trigger = function(event){ 
        var evt = document.createEvent("Events"); 
        evt.initEvent(event,true,true);
        this.dispatchEvent(evt);
        return this;
    }



    /*******************************************
        如果不是dom，不执行以下属性绑定
    ********************************************/
    if(!isdom){
        return;
    }

    /*获取计算后的style属性值，dom.getStyle('padding-left margin-left')，同是数值可相加*/
    obj.getStyle = function(attr){
        var style = window.getComputedStyle(this);
        var attrs = attr.split(' ');
        var val = 0;
        attrs.forEach(function(v){
            if(style[v].indexOf('px') > -1){val += parseInt(style[v].replace('px',''));}
            else{val = style[v];return val;}
        });
        return val;
    }

    /* 设置 style */
    obj.css = function(){
        if(typeof arguments[0] == 'object'){
            for(var k in arguments[0]){
                obj.style[k] = arguments[0][k];
            }
        }else if(typeof arguments[0]=='string'){
            obj.style[arguments[0]] = arguments[1];
        }
        return this;
    }

    if(!obj.before){
        obj.before = function(addObj){
            var parent = obj.parentNode;
            parent.insertBefore(addObj, obj);
            return obj;
        }
    }

    if(!obj.after){
        obj.after = function(addObj){
            var parent = obj.parentNode;
            parent.insertBefore(addObj, obj.nextSibling);
            return obj;
        }
    }

    if(!obj.remove){
        obj.remove = function(){
            var parent = obj.parentNode;
            parent.removeChild(obj);
            return obj;
        }
    }

    /*设置transform的translate,dom对象.setTranslate(x,y)*/
    obj.setTranslate = function(){
        var transform = this.getStyle('transform');
        if(transform=='none'){transform = 'matrix(1, 0, 0, 1, 0, 0)';}
        eval('var v='+transform);
        if(v.length > 13){
            v[13] = arguments[0];
            v[14] = arguments[0];
        }else{
            v[4] = arguments[0];
            v[5] = arguments[1];
        }
        this.style.transform = toMatrix(v);
        return this;
    }

    /*获取transform的translate，返回值[x,y]*/
    obj.getTranslate = function(){
        var transform = this.getStyle('transform');
        if(transform=='none'){return [0,0];}
        eval('var v='+transform);
        if(v.length > 13){
            return [v[13],v[14]];
        }else{
            return [v[4],v[5]];
        }
        
    }

    /* 
    设置过渡时间 transition
    obj.setAniTimer(对象||duration,动画完成后function)
    */
    obj.setAniTimer = function(param,fn){
        var duration = typeof param == 'object' ? (param.duration||300) : param;
        var timingFunction = param.timingFunction || 'ease';
        var property = param.property || 'all';
        var delay = param.delay || 0;
        if(this.aniTimer){
            this.style.transition = this._transition || null;
            clearTimeout(this.aniTimer);
        }
        if(this.style.transition && !this._transition){
            this._transition = this._transition || this.style.transition;
        }
        
        this.style.transition = property+' '+(duration/1000)+'s '+ timingFunction +' '+delay+'s';
        var _this = this;
        
        _this.aniTimer = setTimeout(function(){
            _this.style.transition = _this._transition || null;
            if(typeof fn =='function'){
                fn.call(_this)
            } 
        },duration);
        return this;
    }

    /*
    停止当前动画
    停止过渡还在继续，会有延迟，真正停止后回调fn
    */
    obj.stopAniTimer = function(fn){
        this.style.transition = 'none';
        clearTimeout(this.aniTimer);
        var _this = this;
        if(this._transition){
            setTimeout(function(){
                _this.style.transition = _this._transition;
                if(typeof fn == 'function'){
                    fn.call(this);
                }
            },30)
        }else{
            this.style.transition = null;
        }
        
        return this;
    }

    /* 
    动画
    obj.animate(css,对象||duration,动画完成后function)
    */
    obj.animate = function(css,duration,fn){
        obj.setAniTimer(duration||300,fn);
        for(var attr in css){
            obj.style[attr] = css[attr];
        }
       // var time = typeof duration == 'object' ? duration.duration : duration;
        return this;
    }

    /* 类似jQuery的find，获取单个DOM */
    obj.$ = function(param){
        //console.log(this)
        var dom = typeof param == 'object' ? param : obj.querySelector(param);
        if(dom == null){return null;}
        _bind(dom)
        return dom;
    }

    /* 类似jQuery的find，获取多个DOM */
    obj.$$ = function(param){
        var dom = typeof param == 'object' ? param : obj.querySelectorAll(param);
        [].forEach.call(dom,function(item){
            _bind(item);
        })
        dom.each = function(fn){
            [].forEach.call(dom,function(item,index){
                fn.call(item,index);
            });
            return dom;
        }
        return dom;
    }

    /* 拖动DOM 
    dom对象.setDrag({
        range:dom对象||boolean, //限制范围
        allowFrame:false //子元素iframe是否也能接受拖动，默认false,不支持跨域
        min:{y:0,x:0},//位移不能小于
        max:{y:0,x:0},//位移不能大于
        over:{ //拖动结束时
           duration:300,//自动回原位的动画长度，不设置，无过渡
           min:{y:100,x:100},//位移小于指定参数时，自动回原位
           max:{y:100,x:100},//位移大于指定参数时，自动回原位
           after:function(r){//r，返回位移像素，{x:0,y:0}
                //回调
           }
        }
    });
    */
    obj.setDrag = function(opts){
        opts = opts || {};
        var startX = null,startY = null;
        var moveX = null,moveY = null;
        var newX = null,newY = null;
        var oldX = 0,oldY = 0;
        var originalPos = this.getTranslate();
        var originalX = originalPos[0], originalY = originalPos[1];
        var obj = this;
        var isdrag = false;
        var parent = typeof opts.range == 'boolean' ? $(obj.parentNode) : opts.range;
        var allow = opts.allow ? opts.allow : 'xy';/* 可拖动的方向,x,y,默认全部xy */
        obj.style.touchAction = 'none';/*防止触发页面拖动事件*/
        var mouseEvent = null;
        
        function begin(e){
            var ev = e.touches ? e.touches[0] : e;
            if(ev.button!=0){return;}
            mouseEvent = ev;
            var translate = obj.getTranslate();
            isdrag = true;
            startX = ev.screenX;
            startY = ev.screenY;
            oldX = translate[0];
            oldY = translate[1];
            if(typeof opts.begin == 'function'){
                opts.begin.call(obj);
            }
            yiui.stop(e);
        }

        function move(e){
            if(!isdrag){return;}
            var ev = e.touches ? e.touches[0] : e;
            mouseEvent = ev;
            //console.log('startX:',startX);
            if(startX != null && allow.indexOf('x')>-1){
                moveX = ev.screenX - startX;
                newX = oldX + moveX;
                if(opts.range){
                    var minX = parent.getStyle('margin-left padding-left border-left-width') - obj.offsetLeft + obj.getStyle('margin-left');
                    var maxX = parent.offsetWidth - parent.getStyle('padding-right border-right-width') + parent.offsetLeft - (obj.offsetWidth + obj.getStyle('margin-right')) - obj.offsetLeft;
                    if(newX  < minX){newX = minX;}/*左边界*/
                    if(newX  > maxX){newX = maxX;}/*右边界*/
                }
                
            }

            if(startY != null && allow.indexOf('y')>-1){
                moveY = ev.screenY - startY;
                newY = oldY + moveY
                if(opts.range){
                    var minY = parent.getStyle('margin-top padding-top border-top-width') - obj.offsetTop + obj.getStyle('margin-top');
                    var maxY = parent.offsetHeight - parent.getStyle('padding-bottom border-bottom-width') + parent.offsetTop - (obj.offsetHeight + obj.getStyle('margin-bottom')) - obj.offsetTop;
                    if(newY < minY){newY = minY;}/*上边界*/
                    if(newY > maxY){newY = maxY;}/*下边界*/
                }
                
            }

            /* 不能小于原始位置多少 */
            if(opts.min){
                if(typeof opts.min.y != 'undefined' && newY < opts.min.y){newY = opts.min.y;}
                if(typeof opts.min.x != 'undefined' && newX < opts.min.x){newX = opts.min.x;}
            }
            /* 不能大于原始位置多少 */
            if(opts.max){
                if(typeof opts.max.y != 'undefined' && newY > opts.max.y){newY = opts.max.y;}
                if(typeof opts.max.x != 'undefined' && newX > opts.max.x){newX = opts.max.x;}
            }
            
            if(newX == null && oldX!=null){newX = oldX;}
            if(newY == null && oldY!=null){newY = oldY;}
            obj.setTranslate(newX, newY);

            if(typeof opts.move == 'function'){
                var param = {y:moveY,x:moveX,startX:startX,event:e,setX:function(v){
                    obj.setTranslate(v,newY||0);
                    startX = ev.screenX;
                    oldX = v;
                },setY:function(v){
                    obj.setTranslate(newX||0,v);
                    startY = ev.screenY;
                    oldY = v;
                }};
                opts.move.call(obj,param);
            }
            //yiui.stop(e);
        }

        function over(e){
            
            if(opts.over && isdrag){
                if(typeof opts.over == 'function'){
                    opts.over.call(obj);
                }else{
                    if(opts.over.min){
                        if(typeof opts.over.min.y != 'undefined' && newY < opts.over.min.y){newY = originalY;}
                        if(typeof opts.over.min.x != 'undefined' && newX < opts.over.min.X){newX = originalX;}
                    }
                    if(opts.over.max){
                        if(typeof opts.over.max.y != 'undefined' && newY > opts.over.max.y){newY = originalY;}
                        if(typeof opts.over.max.x != 'undefined' && newX > opts.over.max.X){newX = originalX;}
                    }
                    if(opts.over.max || opts.over.min){
                        if(opts.over.duration){obj.setAniTimer(opts.over.duration);}
                        obj.setTranslate(newX, newY);
                    }
                    if(typeof opts.over.after == 'function'){
                        opts.over.after.call(obj,{y:moveY,x:moveX,startX:startX},e);
                    }
                }
            }
            isdrag = false;
            if(newX != null){oldX = newX;}
            if(newY != null){oldY = newY;}
            startX =  startY = moveX = moveY = newX = newY = null;
            //yiui.stop(e);
        }

        obj.destroyDrag = function(){
            startX =  startY = moveX = moveY = oldX = oldY = newX = newY = null;
            obj.removeEventListener('mousedown',begin);
            document.removeEventListener('mousemove',move);
            document.removeEventListener('mouseup',over);

            this.removeEventListener('touchstart',begin);
            document.removeEventListener('touchmove',move);
            document.removeEventListener('touchend',over);

            if(opts.allowFrame == true){
                var frames = this.$$('iframe');
                [].forEach.call(frames,function(frame){
                    frame.contentDocument.removeEventListener('touchstart',begin);
                    frame.contentDocument.removeEventListener('touchmove',move);
                    frame.contentDocument.removeEventListener('touchend',over);
                })
            }
        }

        obj.setDragStartY = function(setStartY){startY = setStartY;isdrag = true;}
        obj.setDragStartX = function(setStartX){startX = setStartX;isdrag = true;}
        obj.setOldX = function(v){oldX = v;}
        obj.setOldY = function(v){oldY = v;}

        this.addEventListener('mousedown',begin,false);
        document.addEventListener('mousemove',move,false);
        document.addEventListener('mouseup',over,false);

        this.addEventListener('touchstart',begin,false);
        document.addEventListener('touchmove',move,false);
        document.addEventListener('touchend',over,false);

        if(opts.allowFrame == true){
            var frames = this.$$('iframe');
            [].forEach.call(frames,function(frame){
                frame.addEventListener('load',function(){
                    frame.contentDocument.addEventListener('touchstart',begin,false);
                    frame.contentDocument.addEventListener('touchmove',move,false);
                    frame.contentDocument.addEventListener('touchend',over,false);
                })
                
            })
        }

        return this;
    }

    /*长按事件*/
    obj.longpress = function(fn){
        var timer = null;
        var _this = this;
        var md = function(){
            timer = setTimeout(fn.bind(_this),500);
        }
        var mu = function(){
            clearTimeout(timer);
        }
        this.on('mousedown',md);
        this.on('mouseup',mu);
        this._un = this._un ? this._un : [];
        this._un.push({
            event:'longpress',
            fn:fn,
            do:function(){
                _this.un('mousedown',md);
                _this.un('mouseup',mu);
            }
        })
        return this;
    }

    /* 元素出现事件 */
    obj.appear = function(fn){
        var obj = this;
        var scroller = [];
        /*遍历有滚动条的父节点*/
        function getScrollers(dom){
            var tmp = dom.parentNode;
            if(tmp.getBoundingClientRect){
                if($(tmp).getStyle('overflow').indexOf('auto')>-1){
                    scroller.push(tmp); 
                }        
            }else{
                return;
            }
            getScrollers(tmp);
        }
        getScrollers(obj);

        
    
        function isv(){
            var doc = scroller[scroller.length-1];
            if(!doc){return true;} 
            var r = obj.getBoundingClientRect();
            var d = doc.getBoundingClientRect();
            
            var vy = r.top  > d.top - r.height && r.top - d.top < d.height;
            var vx = r.left  > d.left - r.width && r.left - d.left < d.width;
            var visible = vy && vx;
            return visible;
        }
    
        function iso(){
            var doc = document.documentElement;
            
            var r = obj.getBoundingClientRect();
            var d = doc.getBoundingClientRect();
           // console.log(r,d);
            var vy = r.top  > 0 - r.height && r.top  < doc.clientHeight;
            var vx = r.left  > 0 - r.width && r.left  < doc.clientWidth;
            var visible = vy && vx;
            return visible;
        }
    
        function compute(){
            //console.log(isv() && iso());
            if(isv() && iso()){
                if(!obj._isAppear){
                    obj._isAppear = true;
                    fn.call(obj); 
                }
            }else{
                delete obj._isAppear;
            }
        }
        
        [].forEach.call(scroller,function(item){
            item.addEventListener('scroll',compute)
        });
        
        window.addEventListener('scroll',compute);
        this._un = this._un || [];
        this._un.push({
            event:'appear',
            fn:fn,
            do:function(){
                //console.log('解绑了');
                window.removeEventListener('scroll',compute);
                [].forEach.call(scroller,function(item){
                    item.un('scroll',compute);
                });
            }
        })
        return this;
    }
    
}


/* 缩写querySelector */
var $ = function(param){
    if(typeof param == 'function'){
        _ready(param);
        return;
    }
    var dom = typeof param == 'object' ? param : document.querySelector(param);
    _bind(dom);
    return dom;
}
var $$ = function(param){
    var dom = typeof param == 'object' ? param : document.querySelectorAll(param);
    [].forEach.call(dom,function(item){
        _bind(item);
    })
    dom.each = function(fn){
        [].forEach.call(dom,function(item,index){
            fn.call(item,index);
        });
        return dom;
    }
    dom._isNodeList = true;
    return dom;
}

/* ready */
var _ready=function(fn){
    $(document).on('DOMContentLoaded',function(){
        $(document).un('DOMContentLoaded',arguments.callee,false);
        fn();
    })
}



/* 数组对象转网址参数 */
function arrToUrlParam (param,idx, key, encode){
    if(param==null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        var one_is =idx<3?'?':'&';
        paramStr += one_is + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            idx++
            paramStr += arrToUrlParam(param[i],idx, k, encode);
        }
    }
    return paramStr;
}

/* get */
$.get = function(url,fn,dataType){
    var xhr = new XMLHttpRequest();
	xhr.open('GET',url,true);
	xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
            var res = xhr.responseText;
            if(dataType=='json'){res =  JSON.parse(res);}
            fn.call(this, res);  
        }
    }
	xhr.send();
    return xhr;
}

/* post */
$.post = function(url,data,fn,dataType){
    var xhr=new XMLHttpRequest();
    xhr.open('POST',url,true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.onreadystatechange=function(){
        if (xhr.readyState==4){
            if (xhr.status==200 || xhr.status==304){
                var res = xhr.responseText;
                if(dataType=='json'){res =  JSON.parse(res);}
                fn.call(this,res); 
            }
        }
    }
    xhr.send(arrToUrlParam(data));
    return xhr;
}

var yiui = {
    /* 停止冒泡 */
    stop:function(event){
		if (event!= null && event.stopPropagation) {
			event.stopPropagation();
		}else if (window.event) {
			window.event.cancelBubble = true;
		}
	},
    /* 加载javascript */
    loadScript:function(){
        function _load_script_(){
            var args = arguments;
            var opts = typeof args[0] == 'string' ? {src:args[0]} :  args[0];
            var scriptsList = window.loadedScripts;
            if(typeof scriptsList == 'object' && scriptsList.indexOf(opts.src) > -1){
                return;
            }
            var script = document.createElement('script');
            script.type = opts.type || 'text/javascript';
            script.src = opts.src;
            document.querySelector('head').appendChild(script);
            scriptsList = typeof scriptsList == 'object' ? scriptsList: [];
            scriptsList.push(opts.src);
            window.loadedScripts = scriptsList;
            if(opts.loaded){
                $(script).on('load',function(){
                    opts.loaded.call(script);
                });
            }
            
        }
        if(typeof arguments[0]=='object'){
            if(Array.isArray(arguments[0])){
                [].forEach.call(arguments[0],function(item){
                    _load_script_(item);
                });
            }else{
                _load_script_(arguments[0]);
            }
            
        }else{
            _load_script_(arguments[0]);
        }
    }
}




$(function(){
    $(window).trigger('scroll');
    $(window).on('resize',function(){
        $(window).trigger('scroll');
    });
    
});


