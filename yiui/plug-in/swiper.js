 /*
new swiper({
    el:'#swiper',
    silde:'.slide-slide',//滑动对象,默认值
    cols:3,//分列
    gap:40,//间隙
    autoPlay:true,//自动播放
    hoverPause:true,//鼠标移上暂停
    loop:false,//无缝无限循环滚动
    vertical:false,//垂直方式
    reverse:false,//反方向滚动，自动播放时
    after:function(){}//切换后
    move:function(){}//拖动中
})
【依赖yiui2.js】
*/

function swiper(opts){
    var el = $(opts.el);
    var slideEl = opts.slide || '.slide-slide';
    var slide =  el.$(slideEl);
    this.index = 0;
    var _this = this;
    var cols = opts.cols || 1;
    var rows = opts.rows || 1;
    var gap = opts.gap || 0;
    var length = el.$$(slideEl+'>*').length;
    var reallen = length;
    this.length = reallen;
    var itemWidth = (el.offsetWidth - gap * (cols - 1)) / cols;
    var itemHeight = (el.offsetHeight - gap * (rows - 1)) / rows;
    this.indexs = [0];
    var max = 0;
    var vals = {};
    var startX = 0,startY = 0;

    function computeIndex(index){
        index  = index < 0 ? reallen+index : index;
        var min = 0;
        var num = opts.vertical ? rows : cols;
        max = reallen-num;
        var mm = reallen - 1;
        
        if(!opts.loop){
            index = index < min ? max : index;
            index = index > max ? min : index;
        }
        _this.indexs = [];
        
        for(var i=index; i < index+num; i++){
            var v = i >= reallen ? i - reallen : i;
            if(v<=mm){_this.indexs.push(v);}
        }
        _this.index = index;
    }

    this.slideTo = function(index){
        computeIndex(index);
        var toX = opts.vertical ? 0 : 0  - itemWidth * _this.index - gap*_this.index + startX;
        var toY = opts.vertical ? 0  - itemHeight * _this.index - gap*_this.index + startY : 0;

        function aniTo(){
            slide.setAniTimer(300,function(){
                var d = this.getTranslate();
                if(opts.loop && index == 0){this.setTranslate(startX,startY);}
            }).setTranslate(toX,toY);
        }

        if(opts.reverse && _this.index==reallen-1){
            slide.setTranslate(startX*2,startY*2);
        }

        setTimeout(aniTo,0);
        
        
        if(opts.loop && index >= reallen){index = index - reallen;_this.index = index;}
        if(typeof opts.after == 'function'){
            opts.after.call(_this);
        }
    }

    /* 循环模式克隆原节点 */
    function loopClone(){
        var items  =  el.$$(slideEl+'>*');
        var clones = el.$$(slideEl+'>.slide-clone');
        var firstItem = items[0];
        clones.each(function(){
            this.remove();
        });
        items.each(function(index){
            var beginClone = this.cloneNode(true);
            var endClone = this.cloneNode(true);
            beginClone.classList.add('slide-clone');
            endClone.classList.add('slide-clone');
            endClone.setAttribute('slide-index',index)
            beginClone.setAttribute('slide-index',index)
            firstItem.before(beginClone);
            slide.appendChild(endClone);
        });
        startX = opts.vertical ? 0 : 0 - (length/cols) * (el.offsetWidth + gap) ;
        startY = opts.vertical ? 0 - (length/rows) * (el.offsetHeight + gap) : 0 ;
        slide.setTranslate(startX,startY);
    }

    if(opts.loop){
        loopClone();
        length = el.$$(slideEl+'>*').length;
    }

    function initDoms(){
        slide.style.width = '100%';
        slide.style.height = '100%';
        slide.style.display = 'flex';
        slide.style.flexWrap = 'nowrap';
        if(opts.vertical){
            slide.style.flexDirection = 'column';
        }

        itemWidth = (el.offsetWidth - gap * (cols - 1)) / cols;
        itemHeight = (el.offsetHeight - gap * (rows - 1)) / rows;
        var items  =  el.$$(slideEl+'>*');
        
        items.each(function(){
            this.style.width = itemWidth + 'px';
            this.style.height = itemHeight + 'px';
            this.style.marginRight = gap+'px';
            this.style.marginBottom = gap+'px';
            this.style.flexShrink = 0;
        });
        vals.x = 0-( (length/cols -1 ) * (el.offsetWidth  + gap) );
        vals.y = 0-( (length/rows -1 ) * (el.offsetHeight  + gap) );
        _this.slideTo(_this.index);
        
    }

    this.autoPlay = function(){
        _this.timer = setInterval(function(){
            if(opts.reverse){
                _this.index--;
            }else{
                _this.index++;
            }
            _this.slideTo(_this.index);
            
        },opts.speed||3000);
    }

    if(opts.autoPlay){
        this.autoPlay();
        //console.log('AutoPlay');
    }

    if(opts.hoverPause && opts.autoPlay){
        el.on('mouseover',function(){
            clearInterval(_this.timer);
        });
        el.on('mouseout',function(){
            _this.autoPlay();
        });
    }

    vals.x = 0-( (length/cols -1 ) * (el.offsetWidth  + gap) );
    vals.y = 0-( (length/rows -1 ) * (el.offsetHeight  + gap) );

    slide.setDrag({
        allow:opts.vertical ? 'y' : 'x',
        max:opts.loop ? null : (opts.vertical ? {y:0} :{x:0}),
        min:opts.loop ? null : vals,
        over:{
            after:function(p,e){
                var ev = e.touches ? e.touches[0] : e;
                var d = this.getTranslate();
                var index = opts.vertical ? Math.round(((0-d[1]+startY) / (itemHeight+gap) ).toFixed(2)) : Math.round(((0-d[0]+startX) / (itemWidth+gap) ).toFixed(2));
                _this.slideTo(index);
            }
        },
        move:function(p){
            var d = this.getTranslate();
            if(opts.loop){
                if(opts.vertical){
                    if(d[1] > startY ){p.setY(d[1]+startY);}
                    if(Math.abs(d[1]) >= Math.abs(startY*2)  ){p.setY(d[1]-startY);}
                }else{
                    if(d[0] > startX ){p.setX(d[0]+startX);}
                    if(Math.abs(d[0]) >= Math.abs(startX*2)  ){p.setX(d[0]-startX);}
                }
                
                d = this.getTranslate();
            }
            

            var index = opts.vertical ? Math.round(((0-d[1]) / (itemHeight+gap) ).toFixed(2)) : Math.round(((0-d[0]) / (itemWidth+gap) ).toFixed(2));
            computeIndex(index,true);
            if(typeof opts.move == 'function'){
                opts.move.call(_this);
            }
        }
    });

    initDoms();

    $(window).on('resize',initDoms);

}