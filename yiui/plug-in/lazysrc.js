/*
图片懒加载
<div lazy-src="图片地址" fit="cover(默认)|contain|fill" bgmode> bgmode属性表示以background-image填充图片
【依赖yiui2.js】
*/
$(function(){
    $$('[lazy-src]').each(function(){
        function imgLazySrc(){
            var src = this.getAttribute('lazy-src');
            var fit = this.getAttribute('fit') || 'cover';
            var _this = this;
            if(this.getStyle('position') == 'static'){
                this.css({position:'relative'});
            }
            var imgbox = document.createElement('div');
            $(imgbox).css({
                position:'absolute',
                left:0,
                top:0,
                overflow:'hidden',
                width:'100%',
                height:'100%',
            });
            
            var img = new Image();
            img.src = src;
            $(img).css({
                maxWidth:'100%',
                maxHeight:'100%',
                display:'none',
            });
            var timer = null;

            function img_resize(){

                $(img).css({display:'block'});

                img.setAttribute('width',null);
                img.setAttribute('height',null);
                img.removeAttribute('width');
                img.removeAttribute('height');

                var boxScale = imgbox.offsetWidth / imgbox.offsetHeight;
                var imgScale = img.naturalWidth / img.naturalHeight;
                
                if(fit=='cover'){
                    //console.log(img);
                    $(img).css({
                        maxWidth:'none',
                        maxHeight:'none',
                    });
  
                   if(boxScale > imgScale){
                        $(img).css({width:'100%',height:imgbox.offsetWidth / imgScale / imgbox.offsetHeight*100 + '%' })
                    }else{
                        $(img).css({width:imgbox.offsetHeight * imgScale / imgbox.offsetWidth*100 + '%',height:'100%' })
                    }
                }
                if(fit=='contain' || fit=='cover'){
                    $(img).css({
                        position:'absolute',
                        top:(imgbox.offsetHeight - img.offsetHeight) / 2 / imgbox.offsetHeight * 100 +'%',
                        left: (imgbox.offsetWidth - img.offsetWidth) / 2 / imgbox.offsetWidth * 100 +'%',
                    });
                    
                }
                if(fit=='fill'){
                    $(img).css({
                        width:'100%',
                        height:'100%',
                    });
                }
            }

            timer = setInterval(function(){
                if( img.naturalWidth > 0 || img.width > 0){
                    img_resize();
                    clearInterval(timer);
                }
            },1)

            img.onload = function(){
                img_resize();
                clearInterval(timer);
            }

            imgbox.appendChild(img);
            _this.appendChild(imgbox);
            _this.removeAttribute('lazy-src',null);
            _this.un('appear',imgLazySrc);
            
        }

        var bgMode =  typeof this.getAttribute('bgmode') == 'string' ? true : false;


        function lazyBg(){
            var src = this.getAttribute('lazy-src');
            this.css({
                backgroundImage:'url('+src+')',
            });
            this.un('appear',lazyBg);
            this.removeAttribute('lazy-src');
        }
    
        this.on('appear',bgMode ? lazyBg :imgLazySrc);
    });

    $(window).trigger('scroll');

});