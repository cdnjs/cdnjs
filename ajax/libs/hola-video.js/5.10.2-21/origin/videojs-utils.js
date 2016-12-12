(function(window, vjs){
'use strict';
vjs.utils = vjs.utils||{};

function local_storage_init(){
    // Cookie functions from
    // https://developer.mozilla.org/en-US/docs/DOM/document.cookie
    function get_cookie_item(key){
        if (!key || !has_cookie_item(key))
            return null;
        var reg_ex = new RegExp('(?:^|.*;\\s*)'
        +window.escape(key).replace(/[\-\.\+\*]/g, '\\$&')
        +'\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*');
        return window.unescape(document.cookie.replace(reg_ex, '$1'));
    }
    function set_cookie_item(key, value, end, path, domain, secure){
        if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key))
            return;
        var expires = '';
        if (end)
        {
            switch (end.constructor)
            {
            case Number:
                expires = end===Infinity
                    ? '; expires=Tue, 19 Jan 2038 03:14:07 GMT'
                    : '; max-age=' + end;
                break;
            case String:
                expires = '; expires=' + end;
                break;
            case Date:
                expires = '; expires=' + end.toGMTString();
                break;
            }
        }
        document.cookie = window.escape(key)+'='+window.escape(value)+
            expires+(domain ? '; domain='+domain : '')+
            (path ? '; path=' + path : '')+
            (secure ? '; secure' : '');
    }
    function has_cookie_item(key){
        return (new RegExp('(?:^|;\\s*)'
            +window.escape(key).replace(/[\-\.\+\*]/g, '\\$&')+'\\s*\\=')
        ).test(document.cookie);
    }
    function has_local_storage(){
        try {
            window.localStorage.setItem('vjs-storage-test', 'value');
            window.localStorage.removeItem('vjs-storage-test');
            return true;
        } catch(e){ return false; }
    }
    vjs.utils.localStorage = has_local_storage() ? window.localStorage : {
        getItem: get_cookie_item,
        setItem: function(key, value){
            set_cookie_item(key, value, Infinity, '/');
        }
    };
}
local_storage_init();

})(window, window.videojs);
