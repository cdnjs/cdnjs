/*!
 * jquery.instagramFeed
 *
 * @version 3.0.2
 *
 * https://github.com/jsanahuja/jquery.instagramFeed
 *
 */
(function ($) {
    var defaults = {
        'host': "https://www.instagram.com/",
        'username': '',
        'tag': '',
        'user_id': '',
        'location': '',
        'container': '',
        'display_profile': true,
        'display_biography': true,
        'display_gallery': true,
        'display_captions': false,
        'display_igtv': false,
        'max_tries': 8,
        'callback': null,
        'styling': true,
        'items': 8,
        'items_per_row': 4,
        'margin': 0.5,
        'image_size': 640,
        'lazy_load': false,
        'cache_time': 360,
        'on_error': console.error
    };
    var image_sizes = {
        "150": 0,
        "240": 1,
        "320": 2,
        "480": 3,
        "640": 4
    };
    var escape_map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    function escape_string(str) {
        return str.replace(/[&<>"'`=\/]/g, function (char) {
            return escape_map[char];
        });
    }

    function parse_caption(igobj, data){
        if (
            typeof igobj.node.edge_media_to_caption.edges[0] !== "undefined" && 
            typeof igobj.node.edge_media_to_caption.edges[0].node !== "undefined" && 
            typeof igobj.node.edge_media_to_caption.edges[0].node.text !== "undefined" && 
            igobj.node.edge_media_to_caption.edges[0].node.text !== null
        ) {
            return igobj.node.edge_media_to_caption.edges[0].node.text;
        }
        if (
            typeof igobj.node.title !== "undefined" &&
            igobj.node.title !== null &&
            igobj.node.title.length != 0
        ) {
            return igobj.node.title;
        }
        if (
            typeof igobj.node.accessibility_caption !== "undefined" &&
            igobj.node.accessibility_caption !== null &&
            igobj.node.accessibility_caption.length != 0
        ) {
            return igobj.node.accessibility_caption;
        }
        return false;
    }

    /**
     * Cache management
     */
    function get_cache(options, last_resort){
        var read_cache = last_resort || false;
        
        if (!last_resort && options.cache_time > 0) {
            var cached_time = localStorage.getItem(options.cache_time_key);
            if(cached_time !== null && parseInt(cached_time) + 1000 * 60 * options.cache_time > new Date().getTime()){
                read_cache = true;
            }
        }

        if(read_cache){
            var data = localStorage.getItem(options.cache_data_key);
            if(data !== null){
                return JSON.parse(data);
            }
        }
        return false;
    };

    function set_cache(options, data){
        var cached_time = localStorage.getItem(options.cache_time_key),
            cache = options.cache_time != 0 && (cached_time === null || parseInt(cached_time) + 1000 * 60 * options.cache_time > new Date().getTime());
        
        if(cache){
            localStorage.setItem(options.cache_data_key, JSON.stringify(data));
            localStorage.setItem(options.cache_time_key, new Date().getTime());
        }
    }

    /**
     * Request / Response
     */
    function parse_response(type, data){
        switch(type){
            case "username":
            case "tag":
            case "location":
                try {
                    data = data.split("window._sharedData = ")[1].split("<\/script>")[0];
                } catch (e) {
                    return false;
                }
                data = JSON.parse(data.substr(0, data.length - 1));
                data = data.entry_data.ProfilePage || data.entry_data.TagPage || data.entry_data.LocationsPage;
                if(typeof data !== "undefined"){
                    return data[0].graphql.user || data[0].graphql.hashtag || data[0].graphql.location;
                }
                return false;
            break;
            case "userid":
                if(typeof data.data.user !== "undefined"){
                    return data.data.user;
                }
                return false;
            break;
        }
    }

    function request_data(url, type, tries, callback, autoFallback, googlePrefix){
        var prefixedUrl;
        if(autoFallback && googlePrefix){
            prefixedUrl = 'https://images' + ~~(Math.random() * 3333) + '-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=' + url;
        }
        $.get(prefixedUrl || url, function(response){
            var data = parse_response(type, response);
            if(data !== false){
                callback(data);
            }else{
                // Unexpected response, not retrying
                callback(false);
            }
        }).fail(function (e) {
            if(tries > 1){
                console.warn("Instagram Feed: Request failed, " + (tries-1) + " tries left. Retrying...");
                request_data(url, type, tries-1, callback, autoFallback, !googlePrefix);
            }else{
                callback(false, e);
            }
        });
    }

    /**
     * Retrieve data
     */
    function get_data(options, callback){
        var data = get_cache(options, false);

        if(data !== false){
            // Retrieving data from cache
            callback(data);
        }else{
            // No cache, let's do the request
            var url;
            switch(options.type){
                case "username":
                    url = options.host + options.id + '/';
                break;
                case "tag":
                    url = options.host + 'explore/tags/' + options.id + '/'
                break;
                case "location":
                    url = options.host + 'explore/locations/' + options.id + '/'
                break;
                case "userid":
                    url = options.host + 'graphql/query/?query_id=17888483320059182&variables={"id":"' + options.id + '","first":' + options.items + ',"after":null}';
                break;
            }

            request_data(url, options.type, options.max_tries, function(data, exception){
                if(data !== false){
                    set_cache(options, data);
                    callback(data);
                }else if(typeof exception === "undefined"){
                    options.on_error("Instagram Feed: It looks like the profile you are trying to fetch is age restricted. See https://github.com/jsanahuja/InstagramFeed/issues/26", 3);
                }else{
                    // Trying cache as last resort before throwing
                    data = get_cache(options, true);
                    if(data !== false){
                        callback(data);
                    }else{
                        options.on_error("Instagram Feed: Unable to fetch the given user/tag. Instagram responded with the status code: " + exception.status, 5);
                    }
                }
            }, options.host === defaults.host && options.type != "userid", false);
        }
    }

    /**
     * Rendering
     */
    function render(options, data){
        var html = "", styles;

        /**
         * Styles
         */
        if(options.styling){
            var width = (100 - options.margin * 2 * options.items_per_row) / options.items_per_row;
            styles = {
                profile_container: ' style="text-align:center;"',
                profile_image: ' style="border-radius:10em;width:15%;max-width:125px;min-width:50px;"',
                profile_name: ' style="font-size:1.2em;"',
                profile_biography: ' style="font-size:1em;"',
                gallery_image: ' style="width:100%;"',
                gallery_image_link: ' style="width:' + width + '%; margin:' + options.margin + '%;position:relative; display: inline-block; height: 100%;"'
            };
            
            if(options.display_captions){
                html += "<style>\
                    a[data-caption]:hover::after {\
                        content: attr(data-caption);\
                        text-align: center;\
                        font-size: 0.8rem;\
                        color: black;\
                        position: absolute;\
                        left: 0;\
                        right: 0;\
                        bottom: 0;\
                        padding: 1%;\
                        max-height: 100%;\
                        overflow-y: auto;\
                        overflow-x: hidden;\
                        background-color: hsla(0, 100%, 100%, 0.8);\
                    }\
                </style>";
            }
        }else{
            styles = {
                profile_container: "",
                profile_image: "",
                profile_name: "",
                profile_biography: "",
                gallery_image: "",
                gallery_image_link: ""
            };
        }

        /**
         * Profile & Biography
         */
        if(options.display_profile && options.type !== "userid"){
            html += '<div class="instagram_profile"' + styles.profile_container + '>';
            html += '<img class="instagram_profile_image" src="' + data.profile_pic_url  + '" alt="'+ (options.type == "tag" ? data.name + ' tag pic' : data.username + ' profile pic') + '"' + styles.profile_image + (options.lazy_load ? ' loading="lazy"' : '') + ' />';
            if(options.type == "tag"){
                html += '<p class="instagram_tag"' + styles.profile_name + '><a href="https://www.instagram.com/explore/tags/' + options.tag + '/" rel="noopener" target="_blank">#' + options.tag + '</a></p>';
            }else if(options.type == "username"){
                html += "<p class='instagram_username'" + styles.profile_name + ">@" + data.full_name + " (<a href='https://www.instagram.com/" + options.username + "/' rel='noopener' target='_blank'>@" + options.username + "</a>)</p>";
                if(options.display_biography){
                    html += "<p class='instagram_biography'" + styles.profile_biography + ">" + data.biography + "</p>";
                }
            }else if(options.type == "location"){
                html += "<p class='instagram_location'" + styles.profile_name + "><a href='https://www.instagram.com/explore/locations/" + options.location + "/' rel='noopener' target='_blank'>" + data.name + "</a></p>";
            }
            html += "</div>";
        }

        /**
         * Gallery
         */
        if(options.display_gallery){
            if (typeof data.is_private !== "undefined" && data.is_private === true) {
                html += '<p class="instagram_private"><strong>This profile is private</strong></p>';
            } else {
                var image_index = typeof image_sizes[options.image_size] !== "undefined" ? image_sizes[options.image_size] : image_sizes[640],
                    imgs = (data.edge_owner_to_timeline_media || data.edge_hashtag_to_media || data.edge_location_to_media).edges,
                    max = (imgs.length > options.items) ? options.items : imgs.length;

                html += "<div class='instagram_gallery'>";
                for (var i = 0; i < max; i++) {
                    var url = "https://www.instagram.com/p/" + imgs[i].node.shortcode,
                        image, type_resource, 
                        caption = parse_caption(imgs[i], data);

                    if(caption === false){
                        caption = (options.type == "userid" ? '' : options.id) + " image";
                    }
                    caption = escape_string(caption);

                    switch (imgs[i].node.__typename) {
                        case "GraphSidecar":
                            type_resource = "sidecar"
                            image = imgs[i].node.thumbnail_resources[image_index].src;
                            break;
                        case "GraphVideo":
                            type_resource = "video";
                            image = imgs[i].node.thumbnail_src
                            break;
                        default:
                            type_resource = "image";
                            image = imgs[i].node.thumbnail_resources[image_index].src;
                    }

                    html += '<a href="' + url + '"' + (options.display_captions ? ' data-caption="' + caption + '"' : '') + ' class="instagram-' + type_resource + '" rel="noopener" target="_blank"' + styles.gallery_image_link + '>';
                    html += '<img' + (options.lazy_load ? ' loading="lazy"' : '') + ' src="' + image + '" alt="' + caption + '"' + styles.gallery_image + ' />';
                    html += '</a>';
                }
                html += '</div>';
            }
        }

        /**
         * IGTV
         */
        if (options.display_igtv && typeof data.edge_felix_video_timeline !== "undefined") {
            var igtv = data.edge_felix_video_timeline.edges,
                max = (igtv.length > options.items) ? options.items : igtv.length;

            if (igtv.length > 0) {
                html += '<div class="instagram_igtv">';
                for (var i = 0; i < max; i++) {
                    var url = 'https://www.instagram.com/p/' + igtv[i].node.shortcode,
                        caption = parse_caption(igtv[i], data);

                    if(caption === false){
                        caption = (options.type == "userid" ? '' : options.id) + " image";
                    }
                    caption = escape_string(caption);

                    html += '<a href="' + url + '"' + (options.display_captions ? ' data-caption="' + caption + '"' : '') + ' rel="noopener" target="_blank"' + styles.gallery_image_link + '>';
                    html += '<img' + (options.lazy_load ? ' loading="lazy"' : '') + ' src="' + igtv[i].node.thumbnail_src + '" alt="' + caption + '"' + styles.gallery_image + ' />';
                    html += '</a>';
                }
                html += '</div>';
            }
        }
        
        $(options.container).html(html);
    }

    $.instagramFeed = function (opts) {
        var options = $.fn.extend({}, defaults, opts);

        if (options.username == "" && options.tag == "" && options.user_id == "" && options.location == "") {
            options.on_error("Instagram Feed: Error, no username, tag or user_id defined.", 1);
            return false;
        }

        if(typeof opts.display_profile !== "undefined" && opts.display_profile && options.user_id != ""){
            console.warn("Instagram Feed: 'display_profile' is not available using 'user_id' (GraphQL API)");
        }
        
        if(typeof opts.display_biography !== "undefined" && opts.display_biography && (options.tag != "" || options.location != "" || options.user_id != "")){
            console.warn("Instagram Feed: 'display_biography' is not available unless you are loading an user ('username' parameter)");
        }

        if (typeof options.get_data !== "undefined") {
            console.warn("Instagram Feed: options.get_data is deprecated, options.callback is always called if defined");
        }

        if (options.callback == null && options.container == "") {
            options.on_error("Instagram Feed: Error, neither container found nor callback defined.", 2);
            return false;
        }

        if(options.username != ""){
            options.type = "username";
            options.id = options.username;
        }else if(options.tag != ""){
            options.type = "tag";
            options.id = options.tag;
        }else if(options.location != ""){
            options.type = "location";
            options.id = options.location;
        }else{
            options.type = "userid";
            options.id = options.user_id;
        }

        options.cache_data_key = 'instagramFeed_' + options.type + '_' + options.id;
        options.cache_time_key = options.cache_data_key + '_time';

        get_data(options, function(data){
            if(options.container != ""){
                render(options, data);
            }
            if(options.callback != null){
                options.callback(data);
            }
        });
        return true;
    };

})(jQuery);
