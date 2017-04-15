/*!
 * Socialite v2.0 - Vkontakte extension
 * http://socialitejs.com
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 */
(function(window, document, Socialite, undefined)
{
    // http://vk.com/developers.php?oid=-1&p=Share
    // http://vk.com/developers.php?oid=-1&p=Like
    // http://vk.com/developers.php?oid=-1&p=Groups

    var VKCallbacks = [];

    Socialite.setup({
        vkontakte: {
            apiId: null,
            group: {
              id: 0,
              mode: 0,
              width: 300,
              height: 290
            },
            like: {
              type: 'mini'
            }
        }
    });

    Socialite.network('vkontakte', {
        script: {
            src : '//userapi.com/js/api/openapi.js?49',
            id  : 'vk-jsapi'
        },
        onload: function(network) {
           var settings = Socialite.settings.vkontakte;
           VK.init({apiId: settings.apiId, onlyWidgets: true});
           for (var i = 0, i$l = VKCallbacks.length; i < i$l; VKCallbacks[i].call(this), i++);
        }
    });

    var extendConfWithAttributes = function(el, attributes, original) {
        var result = {}, key;
        for (var k = 0, k$l = attributes.length; k < k$l; key = attributes[k], result[key] = el.getAttribute('data-' + key) || original[key], k++);
        return result;
    }

    Socialite.widget('vkontakte', 'group', {
        init: function(instance)
        {
            if (typeof window.VK !== 'object') VKCallbacks.push(function(){
                var el       = document.createElement('div'),
                    settings = Socialite.settings.vkontakte;
                el.className = 'vk-group';
                // Vkontakte needs explicit element id
                el.id = 'vkontakte-group-' + (new Date()).getTime();
                Socialite.copyDataAttributes(instance.el, el);
                group = extendConfWithAttributes(instance.el, ['id', 'mode', 'width', 'height'], settings.group);
                instance.el.appendChild(el);
                VK.Widgets.Group(el.id, group, group['id']);
            });
        }
    });

    Socialite.widget('vkontakte', 'like', {
        init: function(instance)
        {
            if (typeof window.VK !== 'object') VKCallbacks.push(function(){
                var el       = document.createElement('div'),
                    settings = Socialite.settings.vkontakte;
                el.className = 'vk-like';
                // Vkontakte needs explicit element id
                el.id = 'vkontakte-like-' + (new Date()).getTime() + Math.random().toString().replace('.', '-');
                Socialite.copyDataAttributes(instance.el, el);
                like = extendConfWithAttributes(instance.el, ['type'], settings.like);
                instance.el.appendChild(el);
                VK.Widgets.Like(el.id, like);
            });
        }
    });

})(window, window.document, window.Socialite);
