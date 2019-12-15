;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.iNotify = factory();
    }
}(this, function(root, undefined) {
    var repeatableEffects = ['flash', 'scroll']
    var iNotify = {
        init:function(config){
            this.interval = config.interval || 200//响应时长
            this.effect = config.effect || 'flash' //效果
            this.title = config.title || document.title; //标题
            this.message = config.message || this.title; //原来的标题
            this.updateFavicon = config.updateFavicon || {
                id: "favicon",
                textColor: "#fff",
                backgroundColor: "#2F9A00",
                location: "full",
                shape: "square"
            }
            this.favicon = document.querySelectorAll('link[rel~=shortcut]')[0]
            this.favicon = this.favicon;
            this.cloneFavicon = this.favicon.cloneNode(true);;
            if ( 0 <= repeatableEffects.indexOf(this.effect)) this.addTimer()
            return this;
        },
        render: function() {
            switch (this.effect) {
                case 'flash':
                    document.title = (this.title === document.title) ? this.message : this.title;
                    break;
                case 'scroll':
                    document.title = document.title.slice(1);
                    if (0 === document.title.length) {
                        document.title = this.message
                    }
                    break;
            }
        },
        //设置标题
        setTitle:function(str){
            if(str) {
                this.message = str,this.addTimer()
            }else {
                this.clearTimer(),
                this.title = this.title
                console.log("this.title:",this.title)
            }
            return this
        },
        //设置时间间隔
        setInterval:function(num){
            if(num) this.interval = num,this.addTimer()
        },
        //设置网页Icon
        setFavicon:function(num){
            var oldicon = document.getElementById('new'+this.updateFavicon.id)
            if(this.favicon) this.favicon.remove();
            if(oldicon) oldicon.remove();
            changeFavicon(num,this.updateFavicon)
        },
        //添加计数器
        addTimer:function(){
            this.clearTimer()
            if ( 0 <= repeatableEffects.indexOf(this.effect)) {
                this.timer = setInterval(this.render.bind(this), this.interval);
            }
            return this
        },
        //清除Icon
        faviconClear:function(){
            var newicon = document.getElementById('new'+this.updateFavicon.id)
                head = document.getElementsByTagName('head')[0]
            newicon&&newicon.remove()
            head.appendChild(this.cloneFavicon);
            this.favicon = this.cloneFavicon
        },
        //清除计数器
        clearTimer:function(){
            clearInterval(this.timer);
            document.title = this.title;
            return this
        }
    };
    function changeFavicon(num,settings){
        if (num > 0) {
            var canvas = document.createElement('canvas'),
                img = document.createElement('img'),
                head = document.getElementsByTagName('head')[0],
                linkTag = document.createElement('link'),
                ctx;

            canvas.height = canvas.width = 16;
            ctx = canvas.getContext('2d');
            ctx.fillStyle = settings.backgroundColor;
            ctx.fillRect(0, 0, 16, 16);
            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            var radius = 8;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.textAlign = "center";
            ctx.font = '10px "helvetica", sans-serif';
            ctx.fillStyle = settings.textColor;
            ctx.fillText(num, 8, 12);

            //生成到
            linkTag.setAttribute('rel','shortcut icon');
            linkTag.setAttribute('type','image/x-icon');
            linkTag.setAttribute('id', 'new'+settings.id);
            linkTag.setAttribute('href', canvas.toDataURL('image/png'));
            head.appendChild(linkTag); 
        }
    };
    return iNotify
}));