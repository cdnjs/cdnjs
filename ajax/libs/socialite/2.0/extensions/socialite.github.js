/*!
 * Socialite v2.0 - GitHub extension
 * http://socialitejs.com
 * Copyright (c) 2011 David Bushell
 * Dual-licensed under the BSD or MIT licenses: http://socialitejs.com/license.txt
 */
(function(window, document, Socialite, undefined)
{
    // http://markdotto.github.com/github-buttons/
    // https://github.com/markdotto/github-buttons/

    Socialite.network('github');

    // github.size[size][type][has_count][dimension]
    Socialite.setup({
        github: {
            size: [
                {
                    watch  : [ [ 62,20], [110,20] ],
                    fork   : [ [ 53,20], [ 95,20] ],
                    follow : [ [150,20], [200,20] ]
                },
                {
                    watch  : [ [100,30], [170,30] ],
                    fork   : [ [80, 30], [155,30] ],
                    follow : [ [200,30], [300,30] ]
                }
            ]
        }
    });

    var initGitHub = function(instance)
    {
        var type   = instance.el.getAttribute('data-type'),
            size   = instance.el.getAttribute('data-size') === 'large' ? 1 : 0,
            count  = instance.el.getAttribute('data-count') === 'true' ? 1 : 0,
            data   = Socialite.settings.github.size;

        type = (type && data[size].hasOwnProperty(type)) ? type : 'watch';

        instance.el.setAttribute('data-type', type);
        instance.el.setAttribute('data-count', !!count);

        Socialite.processInstance(instance);
        var src    = 'http://ghbtns.com/github-btn.html?' + Socialite.getDataAttributes(instance.el, true);
        var iframe = Socialite.createIframe(src, instance);
        iframe.style.width = data[size][type][count][0] + 'px';
        iframe.style.height = data[size][type][count][1] + 'px';
        instance.el.appendChild(iframe);
        Socialite.activateInstance(instance);
    };

    Socialite.widget('github', 'watch',  { process: null, init: initGitHub });
    Socialite.widget('github', 'fork',   { process: null, init: initGitHub });
    Socialite.widget('github', 'follow', { process: null, init: initGitHub });

})(window, window.document, window.Socialite);
