/*
$alert('hello');或
$alert({
    text:'hello',
    icon:'succeed|failed|warning|confirm',
    btns:[
        {
          caption:'确定',//按钮文本
          fn:function(){},//回调
          noClose:false,//按了不关闭
        }
        
    ]
});
*/

function $alert(){
    var opts = typeof arguments[0] == 'object' ? arguments[0] : {text:arguments[0] };
    var alertEle = null,inner=null,style = null,icon=null,content=null,textEl=null;
    var text = opts.text;

    function keyDownClose(e){
        if(e.keyCode == 27){
            alertClose();
        }
    }

    var alertClose = function(){
        if(!alertEle){return;}
        $(alertEle).animate({opacity:0},300);
        inner.classList.add('ani-fade-zoom-out');
        document.querySelector('html').classList.remove('lock-scroll');
        setTimeout(function(){
            document.querySelector('body').removeChild(alertEle);
            document.querySelector('head').removeChild(style);
        },280);
        window.removeEventListener('keydown',keyDownClose)
    }

    function init(){
        var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if(!style){
            style = document.createElement('style');
            style.innerHTML = '\.ani-fade-zoom-in{animation:fade-zoom-in 0.3s ease-out ;}.ani-fade-zoom-out{animation:fade-zoom-out 0.3s ease-out;}.msgicon-ani-fade-zoom-out{animation:fade-zoom-out 0.1s ease-out;}@keyframes fade-zoom-in {0%{opacity:0;transform: scale3d(4,4,1);}100%{opacity: 1; }}@keyframes fade-zoom-out {0%{opacity: 1;}100%{opacity: 0;transform: scale3d(4,4,1); }}\
            .alert-btn:focus{color:#00a0e9}\
            .lock-scroll{overflow:hidden;margin-right:'+scrollbarWidth+'px;}\
            ';
            document.querySelector('head').appendChild(style);
        }

        alertEle = document.createElement('div');
        
        alertEle.setAttribute('style','position:fixed;width:100%;height:100%;background-color:rgba(0,0,0,0.5);left:0;top:0;display:flex;align-items:center;justify-content:center;');
        inner = document.createElement('div');
        inner.setAttribute('style','max-width:96%;min-width:200px;background-color:#FFF;border-radius:0.3rem;text-align:center;word-break: break-all;font-size:16px;');
        content = document.createElement('div');
        content.setAttribute('style','padding:2rem;border-bottom:1px solid #E1E1E1;display:flex;align-items:center;flex-wrap:nowrap;');
        inner.appendChild(content);
        
        if(opts.icon){
            var iconList = {
                succeed:'<svg style="width:100%;" t="1579073752746" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1926" xmlns:xlink="http://www.w3.org/1999/xlink" ><defs><style type="text/css"></style></defs><path d="M512 981.333333C252.8 981.333333 42.666667 771.2 42.666667 512S252.8 42.666667 512 42.666667s469.333333 210.133333 469.333333 469.333333-210.133333 469.333333-469.333333 469.333333z m-50.432-326.101333L310.613333 504.32a32 32 0 0 0-45.226666 45.226667l174.72 174.762666a32.341333 32.341333 0 0 0 0.341333 0.341334l0.256 0.213333a32 32 0 0 0 50.048-6.144l337.450667-379.605333a32 32 0 1 0-47.872-42.496l-318.762667 358.613333z" fill="#52C41A" p-id="1927"></path></svg>',
                failed:'<svg style="width:100%;" t="1579074430450" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2695" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M512 0a512 512 0 1 0 0 1024A512 512 0 0 0 512 0z m269.397333 781.482667a41.813333 41.813333 0 0 1-58.88-0.085334L512 570.624 301.397333 781.482667a41.642667 41.642667 0 0 1-58.794666-58.88L452.864 512 242.517333 301.397333a41.642667 41.642667 0 0 1 58.88-58.794666L512 453.461333l210.517333-210.773333a41.642667 41.642667 0 0 1 58.965334 58.794667L571.050667 512l210.346666 210.602667a41.557333 41.557333 0 0 1 0 58.88z" fill="#F04134" p-id="2696"></path></svg>',
                warning:'<svg style="width:100%;" t="1608874935013" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2803"><path d="M24.380952 512c0 269.336381 218.282667 487.619048 487.619048 487.619048s487.619048-218.282667 487.619048-487.619048S781.336381 24.380952 512 24.380952 24.380952 242.663619 24.380952 512z m518.095238 274.285714c0 16.847238-13.628952 30.47619-30.47619 30.476191s-30.47619-13.628952-30.47619-30.476191S495.152762 755.809524 512 755.809524s30.47619 13.628952 30.47619 30.47619z m0-144.774095c0 16.018286-13.628952 28.964571-30.47619 28.964571s-30.47619-12.921905-30.47619-28.964571V236.202667c0-15.993905 13.628952-28.94019 30.47619-28.940191s30.47619 12.921905 30.47619 28.964572v405.308952z" fill="#FAAD14" p-id="2804"></path></svg>',
                confirm:'<svg style="width:100%;" t="1608876941618"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34801"><path d="M512 0C226.742857 0 0 226.742857 0 512s226.742857 512 512 512 512-226.742857 512-512-226.742857-512-512-512z" fill="#3e82f7" p-id="34802" data-spm-anchor-id="a313x.7781069.0.i15" class="selected"></path><path d="M636.342857 285.257143c-29.257143-29.257143-73.142857-43.885714-124.342857-43.885714s-95.085714 14.628571-124.342857 43.885714c-36.571429 29.257143-58.514286 73.142857-58.514286 117.028571v7.314286c0 7.314286 7.314286 7.314286 7.314286 7.314286h58.514286c7.314286 0 7.314286-7.314286 7.314285-7.314286 0-51.2 51.2-87.771429 109.714286-87.771429s109.714286 43.885714 109.714286 87.771429c0 36.571429-21.942857 65.828571-65.828572 80.457143-21.942857 7.314286-43.885714 21.942857-58.514285 43.885714-14.628571 21.942857-21.942857 51.2-21.942858 80.457143v21.942857c0 7.314286 7.314286 7.314286 7.314286 7.314286h58.514286c7.314286 0 7.314286-7.314286 7.314286-7.314286v-29.257143c0-21.942857 14.628571-43.885714 36.571428-51.2 65.828571-29.257143 109.714286-87.771429 109.714286-153.6 0-43.885714-21.942857-80.457143-58.514286-117.028571zM468.114286 760.685714c0 21.942857 21.942857 43.885714 43.885714 43.885715s43.885714-21.942857 43.885714-43.885715-21.942857-43.885714-43.885714-43.885714-43.885714 21.942857-43.885714 43.885714z" fill="#FFFFFF" p-id="34803"></path></svg>',
            };
            icon = document.createElement('div');
            icon.setAttribute('style','width:2.2rem;height:2.2rem;margin-right:1rem;animation:fade-zoom-in 0.6s ease-out;')
            icon.innerHTML = iconList[opts.icon];
            content.appendChild(icon);
        }

        textEl = document.createElement('div');
        textEl.setAttribute('style',''+(opts.icon?'text-align:left;':'') );
        textEl.innerHTML = text;
        
        content.appendChild(textEl);

        var btnsFrame = document.createElement('div');
        btnsFrame.setAttribute('style','display:flex;justify-content:center;');
        inner.appendChild(btnsFrame);

        inner.classList.add('ani-fade-zoom-in')
        alertEle.appendChild(inner);
        var firstBtn = null;
        if(opts.btns){
            [].forEach.call(opts.btns,function(btnItem){
                var btn = document.createElement('button');
                btn.setAttribute('style','border:none;background:transparent;outline:none;padding:0.5rem 0;display:block;flex:1;');
                btn.classList.add('alert-btn');
                if(!firstBtn){firstBtn = btn;}
                else{
                    btn.style.borderLeft = '1px solid #E1E1E1';
                }
                btn.innerHTML = btnItem.caption;
                if(typeof btnItem.fn == 'function'){
                    btn.addEventListener('click',btnItem.fn);
                }
                if(!btnItem.noClose){
                    btn.addEventListener('click',alertClose);
                }
                btnsFrame.appendChild(btn);
            });
        }else{
            var btn = document.createElement('button');
            btn.setAttribute('style','border:none;background:transparent;outline:none;padding:0.5rem 0;display:block;flex:1;');
            btn.classList.add('alert-btn');
            btn.innerHTML = '确定';
            firstBtn = btn;
            btn.addEventListener('click',alertClose);
            btnsFrame.appendChild(btn);
        }
        document.querySelector('body').appendChild(alertEle);
        document.querySelector('html').classList.add('lock-scroll');
        if(firstBtn){
            firstBtn.focus();
        }


        window.addEventListener('keydown',keyDownClose)
    }
    
    init();
}