/*!
 * Socialite v2.0 - Weibo extension
 * http://socialitejs.com
 * Copyright (c) 2011 David Bushell
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 */
(function(window, document, Socialite, undefined)
{
    // External documentation URLs
    // http://open.weibo.com/sharebutton

    Socialite.setup({
        weibo: {
            language : 'zh_cn',
            appkey   : ''
        }
    });

    Socialite.network('weibo');

    Socialite.widget('weibo', 'share', {
        process: null,
        init: function(instance)
        {
            Socialite.processInstance(instance);
            var src = 'http://hits.sinajs.cn/A1/weiboshare.html?',
                data = {
                    url       : instance.el.getAttribute('data-url') || location.href,
                    title     : instance.el.getAttribute('data-title') || document.title,
                    type      : instance.el.getAttribute('data-type') || '6',
                    ralateUid : instance.el.getAttribute('data-ralateuid') || '',
                    language  : Socialite.settings.weibo.language,
                    appkey    : Socialite.settings.weibo.appkey,
                    rnd       : new Date().valueOf()
                },
                width  = parseInt(instance.el.getAttribute('data-width'), 10),
                height = parseInt(instance.el.getAttribute('data-height'), 10),
                params = [];

            for (var a in data) {
                params.push(a + '=' + encodeURIComponent(data[a] || ''));
            }

            src += params.join('&') + '&';

            instance.el.setAttribute('data-url', '');
            instance.el.setAttribute('data-title', '');
            instance.el.setAttribute('data-type', '');
            instance.el.setAttribute('data-ralateuid', '');
            instance.el.setAttribute('data-width', '');
            instance.el.setAttribute('data-height', '');
            instance.el.setAttribute('data-default-href', '');
            instance.el.setAttribute('data-socialite', '');

            src += Socialite.getDataAttributes(instance.el, true);

            var iframe = Socialite.createIframe(src, instance);
            iframe.style.width = (isNaN(width) ? 86 : width) + 'px';
            iframe.style.height = (isNaN(height) ? 16 : height) + 'px';
            instance.el.appendChild(iframe);

            Socialite.activateInstance(instance);
        }
    });

})(window, window.document, window.Socialite);
