/**
 * Scalable layout scheme
 * Rem calculation method：Design drawing size (px) / 100 = rem , Ex: 100px = 1rem
 */
!function (window) {
    var docWidth = 640;
    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = (function refreshRem () {
        var clientWidth = docEl.getBoundingClientRect().width;
        /* 小于320px不再缩小，大于640px不再放大 */
        if(clientWidth<320){
            docEl.style.fontSize = (32000/docWidth)+'px';
        }else if(clientWidth>640){
            docEl.style.fontSize = (64000/docWidth)+'px';
        }else{
            docEl.style.fontSize = (clientWidth*100)/docWidth+'px';
        }
        return refreshRem;
    })();

    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        doc.documentElement.classList.add('ios');
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
            doc.documentElement.classList.add('hairline');
    }

    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

}(window);
