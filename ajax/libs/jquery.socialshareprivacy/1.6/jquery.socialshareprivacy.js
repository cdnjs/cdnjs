/*
 * jquery.socialshareprivacy.js | 2 Klicks fuer mehr Datenschutz (1.6)
 *
 * http://www.heise.de/extras/socialshareprivacy/
 * http://www.heise.de/ct/artikel/2-Klicks-fuer-mehr-Datenschutz-1333879.html
 *
 * Copyright (c) 2011-2014 Hilko Holweg, Sebastian Hilbig, Nicolas Heiringhoff, Juergen Schmidt,
 * Heise Zeitschriften Verlag GmbH & Co. KG, http://www.heise.de
 *
 * is released under the MIT License http://www.opensource.org/licenses/mit-license.php
 *
 * Spread the word, link to us if you can.
 */
(function ($) {

    "use strict";

    //
    // helper functions
    // 

    // abbreviate at last blank before length and add "\u2026" (horizontal ellipsis)
    function abbreviateText(text, length) {
        var abbreviated = decodeURIComponent(text);
        if (abbreviated.length <= length) {
            return text;
        }

        var lastWhitespaceIndex = abbreviated.substring(0, length - 1).lastIndexOf(' ');
        abbreviated = encodeURIComponent(abbreviated.substring(0, lastWhitespaceIndex)) + "\u2026";

        return abbreviated;
    }

    // returns content of <meta name="" content=""> tags or '' if empty/non existant
    function getMeta(name) {
        var metaContent = $('meta[name="' + name + '"]').attr('content');
        return metaContent || '';
    }
    
    // create tweet text from content of <meta name="DC.title"> and <meta name="DC.creator">
    // fallback to content of <title> tag
    function getTweetText() {
        var title = getMeta('DC.title');
        var creator = getMeta('DC.creator');

        if (title.length > 0 && creator.length > 0) {
            title += ' - ' + creator;
        } else {
            title = $('title').text();
        }

        return encodeURIComponent(title);
    }

    // build URI from rel="canonical" or document.location
    function getURI() {
        var uri = document.location.href;
        var canonical = $("link[rel=canonical]").attr("href");

        if (canonical && canonical.length > 0) {
            if (canonical.indexOf("http") < 0) {
                canonical = document.location.protocol + "//" + document.location.host + canonical;
            }
            uri = canonical;
        }

        return uri;
    }

    function cookieSet(name, value, days, path, domain) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + '; expires=' + expires.toUTCString() + '; path=' + path + '; domain=' + domain;
    }
    function cookieDel(name, value, path, domain) {
        var expires = new Date();
        expires.setTime(expires.getTime() - 100);
        document.cookie = name + '=' + value + '; expires=' + expires.toUTCString() + '; path=' + path + '; domain=' + domain;
    }

    // extend jquery with our plugin function
    $.fn.socialSharePrivacy = function (settings) {
        var defaults = {
            'services' : {
                'facebook' : {
                    'status'            : 'on',
                    'dummy_img'         : 'socialshareprivacy/images/dummy_facebook.png',
                    'perma_option'      : 'on',
                    'referrer_track'    : '',
                    'action'            : 'recommend',
                    'layout'            : 'button_count',
                    'sharer'            : {
                        'status'        : 'off',
                        'dummy_img'     : 'socialshareprivacy/images/dummy_facebook_share_de.png',
                        'img'           : 'socialshareprivacy/images/dummy_facebook_share_active_de.png'
                    }
                },
                'twitter' : {
                    'status'            : 'on',
                    'dummy_img'         : 'socialshareprivacy/images/dummy_twitter.png',
                    'perma_option'      : 'on',
                    'referrer_track'    : '',
                    'tweet_text'        : getTweetText,
                    'count'             : 'horizontal'
                },
                'gplus' : {
                    'status'            : 'on',
                    'dummy_img'         : 'socialshareprivacy/images/dummy_gplus.png',
                    'perma_option'      : 'on',
                    'referrer_track'    : '',
                    'size'              : 'medium'
                }
            },
            'info_link'         : 'http://www.heise.de/ct/artikel/2-Klicks-fuer-mehr-Datenschutz-1333879.html',
            'cookie_path'       : '/',
            'cookie_domain'     : document.location.host,
            'cookie_expires'    : '365',
            'css_path'          : 'socialshareprivacy/socialshareprivacy.css',
            'uri'               : getURI,
            'language'          : 'de',
            'lang_path'         : 'socialshareprivacy/lang/',
            'skin'              : 'light',
            'alignment'         : 'horizontal',
            'switch_alignment'  : 'left',
            'perma_orientation' : 'down'
        };

        // Standardwerte des Plug-Ins mit den vom User angegebenen Optionen ueberschreiben
        var options = $.extend(true, defaults, settings);

        var facebook_on        = (options.services.facebook.status === 'on');
        var facebook_sharer_on = (options.services.facebook.sharer.status === 'on');
        var twitter_on         = (options.services.twitter.status  === 'on');
        var gplus_on           = (options.services.gplus.status    === 'on');

        // check if at least one service is "on"
        if (!facebook_on && !twitter_on && !gplus_on) {
            return;
        }

        // insert stylesheet into document and prepend target element
        if (options.css_path.length > 0 && $(window).data('socialshareprivacy_css') != '1') {
            // IE fix (noetig fuer IE < 9 - wird hier aber fuer alle IE gemacht)
            if (document.createStyleSheet) {
                document.createStyleSheet(options.css_path);
            }
            else {
                $('head').append('<link rel="stylesheet" type="text/css" href="' + options.css_path + '" />');
            }

            $(window).data('socialshareprivacy_css','1');
        }

        var language;

        function loadLangFile() {
            var d = $.Deferred();

            $.getJSON(options.lang_path + options.language+'.lang', function(data) {
                language = data;
                d.resolve();
            }).fail(function(s){
                if(typeof console !== "undefined") {
                    console.log('Error ' + s.status + ' while loading the language file ('+options.lang_path+options.language+'.lang)');
                }
                d.reject();
            });

            return d.promise();
        }

        return this.each(function () {
            var iteration = this;

            $.when(
                loadLangFile())
            .then( function() {
                $(iteration).prepend('<ul class="social_share_privacy_area clearfix"></ul>');
                var context = $('.social_share_privacy_area', iteration);

                // Class for dark skinning
                if(options.skin == 'dark') {
                    $(context).addClass('skin-dark');
                }

                // Class for alignment
                if(options.alignment == 'vertical') {
                    $(context).addClass('vertical');

                    if(options.switch_alignment == 'right' &&
                        ((facebook_on && options.services.facebook.layout == 'box_count') || (!facebook_on)) &&
                        ((twitter_on && options.services.twitter.count == 'vertical') || (!twitter_on)) &&
                        ((gplus_on && options.services.gplus.size == 'tall') || (!gplus_on))) {
                        $(context).addClass('switch_right');
                    }
                }

                // canonical uri that will be shared
                var uri = options.uri;
                if (typeof uri === 'function') {
                    uri = uri(context);
                }

                //
                // Facebook
                //
                if (facebook_on) {
                    var fb_dummy_btn;
                    var fb_code;

                    var fb_height = options.services.facebook.layout == 'box_count' ? '61' : '21';
                    var fb_width  = options.services.facebook.layout == 'box_count' ? '90' : '130';

                    var fb_enc_uri = encodeURIComponent(uri + options.services.facebook.referrer_track);

                    if (facebook_sharer_on) {
                        fb_dummy_btn = '<img src="' + options.services.facebook.sharer.dummy_img + '" alt="Facebook &quot;Share&quot;-Dummy" class="fb_like_privacy_dummy" />';
                        fb_code = '<a href="#" onclick="window.open(\'https://www.facebook.com/sharer/sharer.php?u=' + fb_enc_uri + '\', \'facebook-share-dialog\', \'width=626,height=436\'); return false;"><img src="'+options.services.facebook.sharer.img+'" alt="" /></a>';
                    }
                    else {
                        fb_dummy_btn = '<img src="' + options.services.facebook.dummy_img + '" alt="Facebook &quot;Like&quot;-Dummy" class="fb_like_privacy_dummy" />';
                        fb_code = '<iframe src="//www.facebook.com/plugins/like.php?locale=' + language.services.facebook.language + '&amp;href=' + fb_enc_uri + '&amp;width=' + fb_width + '&amp;layout=' + options.services.facebook.layout + '&amp;action=' + options.services.facebook.action + '&amp;show_faces=false&amp;share=false&amp;height=' + fb_height + '&amp;colorscheme=' + options.skin + '" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:' + fb_width + 'px; height:' + fb_height + 'px;" allowTransparency="true"></iframe>';
                    }
                    context.append('<li class="facebook help_info clearfix"><span class="info">' + language.services.facebook.txt_info + '</span><a href="#" class="switch off">' + language.services.facebook.txt_fb_off + '</a><div class="fb_like dummy_btn">' + fb_dummy_btn + '</div></li>');

                    var $container_fb = $('li.facebook', context);
                    $(context).on('click', 'li.facebook div.fb_like img.fb_like_privacy_dummy,li.facebook .switch', function (e) {
                        e.preventDefault();
                        if ($container_fb.find('.switch').hasClass('off')) {
                            $container_fb.addClass('info_off');
                            $container_fb.find('.switch').addClass('on').removeClass('off').html(language.services.facebook.txt_fb_on);
                            $container_fb.find('img.fb_like_privacy_dummy').replaceWith(fb_code);
                        }
                        else {
                            $container_fb.removeClass('info_off');
                            $container_fb.find('.switch').addClass('off').removeClass('on').html(language.services.facebook.txt_fb_off);
                            $container_fb.find('.fb_like').html(fb_dummy_btn);
                        }
                    });
                }

                //
                // Twitter
                //
                if (twitter_on) {
                    var text = options.services.twitter.tweet_text;
                    if (typeof text === 'function') {
                        text = text();
                    }
                    // 120 is the max character count left after twitters automatic url shortening with t.co
                    text = abbreviateText(text, '120');

                    var tw_height = options.services.twitter.count == 'horizontal' ? '25' : '62';
                    var tw_width  = options.services.twitter.count == 'horizontal' ? '130' : '83';

                    var twitter_enc_uri = encodeURIComponent(uri + options.services.twitter.referrer_track);
                    var twitter_count_url = encodeURIComponent(uri);
                    var twitter_code = '<iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/tweet_button.html?url=' + twitter_enc_uri + '&amp;counturl=' + twitter_count_url + '&amp;text=' + text + '&amp;count=' + options.services.twitter.count + '&amp;lang=' + language.services.twitter.language + '&amp;dnt=true" style="width:' + tw_width + 'px; height:' + tw_height + 'px;"></iframe>';
                    var twitter_dummy_btn = '<img src="' + options.services.twitter.dummy_img + '" alt="&quot;Tweet this&quot;-Dummy" class="tweet_this_dummy" />';

                    context.append('<li class="twitter help_info clearfix"><span class="info">' + language.services.twitter.txt_info + '</span><a href="#" class="switch off">' + language.services.twitter.txt_twitter_off + '</a><div class="tweet dummy_btn">' + twitter_dummy_btn + '</div></li>');

                    var $container_tw = $('li.twitter', context);

                    $(context).on('click', 'li.twitter div.tweet img,li.twitter .switch', function (e) {
                        e.preventDefault();
                        if ($container_tw.find('.switch').hasClass('off')) {
                            $container_tw.addClass('info_off');
                            $container_tw.find('.switch').addClass('on').removeClass('off').html(language.services.twitter.txt_twitter_on);
                            $container_tw.find('img.tweet_this_dummy').replaceWith(twitter_code);
                        }
                        else {
                            $container_tw.removeClass('info_off');
                            $container_tw.find('.switch').addClass('off').removeClass('on').html(language.services.twitter.txt_twitter_off);
                            $container_tw.find('.tweet').html(twitter_dummy_btn);
                        }
                    });
                }

                //
                // Google+
                //
                if (gplus_on) {
                    // fuer G+ wird die URL nicht encoded, da das zu einem Fehler fuehrt
                    var gplus_uri = uri + options.services.gplus.referrer_track;
                    
                    // we use the Google+ "asynchronous" code, standard code is flaky if inserted into dom after load
                    var gplus_code = '<div class="g-plusone" data-size="' + options.services.gplus.size + '" data-href="' + gplus_uri + '"></div><script type="text/javascript">window.___gcfg = {lang: "' + language.services.gplus.language + '"}; (function() { var po = document.createElement("script"); po.type = "text/javascript"; po.async = true; po.src = "https://apis.google.com/js/platform.js"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s); })(); </script>';
                    var gplus_dummy_btn = '<img src="' + options.services.gplus.dummy_img + '" alt="&quot;Google+1&quot;-Dummy" class="gplus_one_dummy" />';

                    context.append('<li class="gplus help_info clearfix"><span class="info">' + language.services.gplus.txt_info + '</span><a href="#" class="switch off">' + language.services.gplus.txt_gplus_off + '</a><div class="gplusone dummy_btn">' + gplus_dummy_btn + '</div></li>');

                    var $container_gplus = $('li.gplus', context);

                    $(context).on('click', 'li.gplus div.gplusone img,li.gplus .switch', function (e) {
                        e.preventDefault();
                        if ($container_gplus.find('.switch').hasClass('off')) {
                            $container_gplus.addClass('info_off');
                            $container_gplus.find('.switch').addClass('on').removeClass('off').html(language.services.gplus.txt_gplus_on);
                            $container_gplus.find('img.gplus_one_dummy').replaceWith(gplus_code);
                        }
                        else {
                            $container_gplus.removeClass('info_off');
                            $container_gplus.find('.switch').addClass('off').removeClass('on').html(language.services.gplus.txt_gplus_off);
                            $container_gplus.find('.gplusone').html(gplus_dummy_btn);
                        }
                    });
                }

                //
                // Der Info/Settings-Bereich wird eingebunden
                //
                context.append('<li class="settings_info ' + options.perma_orientation + '"><div class="settings_info_menu off perma_option_off"><a href="' + options.info_link + '"><span class="help_info icon"><span class="info">' + language.txt_help + '</span></span></a></div></li>');

                // Info-Overlays mit leichter Verzoegerung einblenden
                $(context).on('mouseenter', '.help_info:not(.info_off)', function () {
                    var $info_wrapper = $(this);
                    var timeout_id = window.setTimeout(function () { $($info_wrapper).addClass('display'); }, 500);
                    $(this).data('timeout_id', timeout_id);
                });
                $(context).on('mouseleave', '.help_info', function () {
                    var timeout_id = $(this).data('timeout_id');
                    window.clearTimeout(timeout_id);
                    if ($(this).hasClass('display')) {
                        $(this).removeClass('display');
                    }
                });

                var facebook_perma = (options.services.facebook.perma_option === 'on');
                var twitter_perma  = (options.services.twitter.perma_option  === 'on');
                var gplus_perma    = (options.services.gplus.perma_option    === 'on');

                // Menue zum dauerhaften Einblenden der aktiven Dienste via Cookie einbinden
                if ((facebook_on && facebook_perma) || (twitter_on && twitter_perma) || (gplus_on && gplus_perma)) {

                    // Cookies abrufen
                    var cookie_list = document.cookie.split(';');
                    var cookies = '{';
                    var i = 0;
                    for (; i < cookie_list.length; i += 1) {
                        var foo = cookie_list[i].split('=');
                        // Spaces and Quotes getting removed
                        foo[0] = $.trim(foo[0].replace(/"/g, ''));
                        foo[1] = $.trim(foo[1].replace(/"/g, ''));
                        cookies += '"' + foo[0] + '":"' + foo[1] + '"';
                        if (i < cookie_list.length - 1) {
                            cookies += ',';
                        }
                    }
                    cookies += '}';
                    cookies = jQuery.parseJSON(cookies);

                    // Container definieren
                    var $container_settings_info = $('li.settings_info', context);

                    // Klasse entfernen, die das i-Icon alleine formatiert, da Perma-Optionen eingeblendet werden
                    $container_settings_info.find('.settings_info_menu').removeClass('perma_option_off');

                    // Perma-Optionen-Icon (.settings) und Formular (noch versteckt) einbinden
                    $container_settings_info.find('.settings_info_menu').append('<a href="#" class="settings">' + language.settings + '</a><form><fieldset><legend>' + language.settings_perma + '</legend></fieldset></form>');


                    var random = 'r' + Math.floor(Math.random()*101);

                    // Die Dienste mit <input> und <label>, sowie checked-Status laut Cookie, schreiben
                    var checked = ' checked="checked"';
                    if (facebook_on && facebook_perma) {
                        var perma_status_facebook = cookies.socialSharePrivacy_facebook === 'perma_on' ? checked : '';
                        $container_settings_info.find('form fieldset').append(
                            '<input type="checkbox" name="perma_status_facebook" id="' + random + '_perma_status_facebook"' + perma_status_facebook + ' /><label for="'+random+'_perma_status_facebook">' + language.services.facebook.perma_display_name + '</label>'
                        );
                    }

                    if (twitter_on && twitter_perma) {
                        var perma_status_twitter = cookies.socialSharePrivacy_twitter === 'perma_on' ? checked : '';
                        $container_settings_info.find('form fieldset').append(
                            '<input type="checkbox" name="perma_status_twitter" id="' + random + '_perma_status_twitter"' + perma_status_twitter + ' /><label for="'+random+'_perma_status_twitter">' + language.services.twitter.perma_display_name + '</label>'
                        );
                    }

                    if (gplus_on && gplus_perma) {
                        var perma_status_gplus = cookies.socialSharePrivacy_gplus === 'perma_on' ? checked : '';
                        $container_settings_info.find('form fieldset').append(
                            '<input type="checkbox" name="perma_status_gplus" id="'+random+'_perma_status_gplus"' + perma_status_gplus + ' /><label for="'+random+'_perma_status_gplus">' + language.services.gplus.perma_display_name + '</label>'
                        );
                    }

                    // Settings-Menue per Tastatur erreichbar machen, die Mouseevents werden getriggert
                    $(context).on('click', 'li.settings_info .settings', function (e) {
                        e.preventDefault();
                        if($(this).data('keyb') == 'on') {
                            $('li.settings_info', context).trigger('mouseleave');
                            $(this).data('keyb','off');
                        }
                        else {
                            $('li.settings_info .settings', context).trigger('mouseenter');
                            $(this).data('keyb','on');
                        }
                    });

                    // Einstellungs-Menue bei mouseover ein-/ausblenden
                    $(context).on('mouseenter', 'li.settings_info .settings', function () {
                        var timeout_id = window.setTimeout(function () { $container_settings_info.find('.settings_info_menu').removeClass('off').addClass('on'); }, 500);
                        $(this).data('timeout_id', timeout_id);
                    });
                    $(context).on('mouseleave', 'li.settings_info', function () {
                        var timeout_id = $(this).data('timeout_id');
                        window.clearTimeout(timeout_id);
                        $container_settings_info.find('.settings_info_menu').removeClass('on').addClass('off');
                    });

                    // Klick-Interaktion auf <input> um Dienste dauerhaft ein- oder auszuschalten (Cookie wird gesetzt oder geloescht)
                    $(context).on('click', 'li.settings_info fieldset input', function (event) {
                        var click = event.target.id;
                        var service = click.substr(click.lastIndexOf('_') + 1, click.length);
                        var cookie_name = 'socialSharePrivacy_' + service;

                        if ($('#' + event.target.id + ':checked').length) {
                            cookieSet(cookie_name, 'perma_on', options.cookie_expires, options.cookie_path, options.cookie_domain);
                            $('form fieldset label[for=' + click + ']', context).addClass('checked');
                        }
                        else {
                            cookieDel(cookie_name, 'perma_on', options.cookie_path, options.cookie_domain);
                            $('form fieldset label[for=' + click + ']', context).removeClass('checked');
                        }
                    });

                    // Dienste automatisch einbinden, wenn entsprechendes Cookie vorhanden ist
                    if (facebook_on && facebook_perma && cookies.socialSharePrivacy_facebook === 'perma_on') {
                        $('li.facebook .switch', context).click();
                    }
                    if (twitter_on && twitter_perma && cookies.socialSharePrivacy_twitter === 'perma_on') {
                        $('li.twitter .switch', context).click();
                    }
                    if (gplus_on && gplus_perma && cookies.socialSharePrivacy_gplus === 'perma_on') {
                        $('li.gplus .switch', context).click();
                    }
                }
            }); // .then()
        }); // this.each(function ()
    }; // $.fn.socialSharePrivacy = function (settings) {
}(jQuery));