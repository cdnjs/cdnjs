var IcomaticUtils = (function() {
return {
fallbacks: [{ from: 'roundedrectangleoutline', 'to': '\ue045' },{ from: 'rectangleoutline', 'to': '\ue041' },{ from: 'roundedrectangle', 'to': '\ue046' },{ from: 'circleoutline', 'to': '\ue015' },{ from: 'imageoutline', 'to': '\ue02b' },{ from: 'videocamera', 'to': '\ue053' },{ from: 'arrowright', 'to': '\ue003' },{ from: 'attachment', 'to': '\ue005' },{ from: 'githubtext', 'to': '\ue026' },{ from: 'googleplus', 'to': '\ue028' },{ from: 'arrowdown', 'to': '\ue001' },{ from: 'arrowleft', 'to': '\ue002' },{ from: 'backlight', 'to': '\ue008' },{ from: 'checkmark', 'to': '\ue014' },{ from: 'instagram', 'to': '\ue02d' },{ from: 'nextlight', 'to': '\ue034' },{ from: 'pinterest', 'to': '\ue03b' },{ from: 'rectangle', 'to': '\ue042' },{ from: 'wordpress', 'to': '\ue058' },{ from: 'audiooff', 'to': '\ue006' },{ from: 'bookmark', 'to': '\ue00b' },{ from: 'calendar', 'to': '\ue00e' },{ from: 'collapse', 'to': '\ue018' },{ from: 'computer', 'to': '\ue01a' },{ from: 'download', 'to': '\ue01c' },{ from: 'facebook', 'to': '\ue021' },{ from: 'favorite', 'to': '\ue022' },{ from: 'feedback', 'to': '\ue023' },{ from: 'linkedin', 'to': '\ue02f' },{ from: 'listview', 'to': '\ue030' },{ from: 'location', 'to': '\ue031' },{ from: 'question', 'to': '\ue040' },{ from: 'settings', 'to': '\ue04a' },{ from: 'tileview', 'to': '\ue04e' },{ from: 'arrowup', 'to': '\ue004' },{ from: 'behance', 'to': '\ue00a' },{ from: 'comment', 'to': '\ue019' },{ from: 'dribble', 'to': '\ue01d' },{ from: 'preview', 'to': '\ue03e' },{ from: 'refresh', 'to': '\ue043' },{ from: 'retweet', 'to': '\ue044' },{ from: 'twitter', 'to': '\ue050' },{ from: 'camera', 'to': '\ue010' },{ from: 'cancel', 'to': '\ue011' },{ from: 'circle', 'to': '\ue016' },{ from: 'delete', 'to': '\ue01b' },{ from: 'expand', 'to': '\ue020' },{ from: 'flickr', 'to': '\ue024' },{ from: 'folder', 'to': '\ue025' },{ from: 'github', 'to': '\ue027' },{ from: 'pencil', 'to': '\ue038' },{ from: 'picasa', 'to': '\ue03a' },{ from: 'plugin', 'to': '\ue03c' },{ from: 'search', 'to': '\ue049' },{ from: 'tablet', 'to': '\ue04c' },{ from: 'tumblr', 'to': '\ue04f' },{ from: 'unlock', 'to': '\ue051' },{ from: 'alert', 'to': '\ue000' },{ from: 'audio', 'to': '\ue007' },{ from: 'brush', 'to': '\ue00c' },{ from: 'build', 'to': '\ue00d' },{ from: 'cloud', 'to': '\ue017' },{ from: 'email', 'to': '\ue01e' },{ from: 'error', 'to': '\ue01f' },{ from: 'group', 'to': '\ue029' },{ from: 'image', 'to': '\ue02c' },{ from: 'minus', 'to': '\ue033' },{ from: 'phone', 'to': '\ue039' },{ from: 'print', 'to': '\ue03f' },{ from: 'share', 'to': '\ue04b' },{ from: 'vimeo', 'to': '\ue055' },{ from: 'back', 'to': '\ue009' },{ from: 'call', 'to': '\ue00f' },{ from: 'cart', 'to': '\ue012' },{ from: 'chat', 'to': '\ue013' },{ from: 'home', 'to': '\ue02a' },{ from: 'like', 'to': '\ue02e' },{ from: 'lock', 'to': '\ue032' },{ from: 'next', 'to': '\ue035' },{ from: 'page', 'to': '\ue036' },{ from: 'path', 'to': '\ue037' },{ from: 'plus', 'to': '\ue03d' },{ from: 'save', 'to': '\ue048' },{ from: 'text', 'to': '\ue04d' },{ from: 'user', 'to': '\ue052' },{ from: 'view', 'to': '\ue054' },{ from: 'wifi', 'to': '\ue057' },{ from: 'rss', 'to': '\ue047' },{ from: 'w3c', 'to': '\ue056' }],
substitute: function(el) {
    var curr = el.firstChild;
    var next, alt;
    var content;
    while (curr) {
        next = curr.nextSibling;
        if (curr.nodeType === Node.TEXT_NODE) {
            content = curr.nodeValue;
            for (var i = 0; i < IcomaticUtils.fallbacks.length; i++) {
                content = content.replace( IcomaticUtils.fallbacks[i].from, function(match) {
                    alt = document.createElement('span');
                    alt.setAttribute('class', 'icomatic-alt');
                    alt.innerHTML = match;
                    el.insertBefore(alt, curr);
                    return IcomaticUtils.fallbacks[i].to;
                });
            }
            alt = document.createTextNode(content);
            el.replaceChild(alt, curr);
        }
        curr = next;
    }
},
run: function(force) {
    force = typeof force !== 'undefined' ? force : false;
    var s = getComputedStyle(document.body);
    if (('WebkitFontFeatureSettings' in s)
        || ('MozFontFeatureSettings' in s)
        || ('MsFontFeatureSettings' in s)
        || ('OFontFeatureSettings' in s)
        || ('fontFeatureSettings' in s))
        if (!force)
            return;
    var els = document.querySelectorAll('.icomatic');
    for (var i = 0; i < els.length; i++)
        IcomaticUtils.substitute(els[i]);
}
} // end of object
} // end of fn
)()