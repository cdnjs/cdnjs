/*
 * InstagramFeed
 *
 * @version 2.0.2
 *
 * https://github.com/jsanahuja/InstagramFeed
 *
 */
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.InstagramFeed = factory();
    }
}(this, function() {
    var defaults = {
        'host': "https://www.instagram.com/",
        'username': '',
        'tag': '',
        'container': '',
        'display_profile': true,
        'display_biography': true,
        'display_gallery': true,
        'display_captions': false,
        'display_igtv': false,
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
    
    function escape_string(str){
        return str.replace(/[&<>"'`=\/]/g, function (char) {
            return escape_map[char];
        });
    }

    if (typeof Object.assign != 'function') {
        Object.assign = function (target) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            target = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source != null) {
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        };
    }

    return function(opts) {
        this.options = Object.assign({}, defaults);
        this.options = Object.assign(this.options, opts);
        this.is_tag = this.options.username == "";

        this.valid = true;
        if (this.options.username == "" && this.options.tag == "") {
            this.options.on_error("InstagramFeed: Error, no username or tag defined.", 1);
            this.valid = false;
        }
        if (typeof this.options.get_data !== "undefined") {
            console.warn("InstagramFeed: options.get_data is deprecated, options.callback is always called if defined");
        }
        if (this.options.callback == null && this.options.container == "") {
            this.options.on_error("InstagramFeed: Error, neither container found nor callback defined.", 2);
            this.valid = false;
        }

        this.get = function(callback) {
            var url = this.is_tag ? this.options.host + "explore/tags/" + this.options.tag + "/" : this.options.host + this.options.username + "/",
                xhr = new XMLHttpRequest();

            var _this = this;
            xhr.onload = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try{
                            var data = xhr.responseText.split("window._sharedData = ")[1].split("<\/script>")[0];
                        }catch(error){
                            _this.options.on_error("InstagramFeed: It looks like the profile you are trying to fetch is age restricted. See https://github.com/jsanahuja/InstagramFeed/issues/26", 3);
                            return;
                        }
                        data = JSON.parse(data.substr(0, data.length - 1));
                        data = data.entry_data.ProfilePage || data.entry_data.TagPage;

                        var skipCaching = false;
                        if (typeof data === "undefined") {
                            var cache_data_raw = localStorage.getItem(_this.cache_data_key);
                            if (cache_data_raw !== null) {
                                data = JSON.parse(cache_data_raw);
                                skipCaching = true;
                            }
        
                            _this.options.on_error("Instagram Feed: Your network has been temporary banned by Instagram because of too many requests. Consider increasing your 'cache_time'. See https://github.com/jsanahuja/jquery.instagramFeed/issues/25 and https://github.com/jsanahuja/jquery.instagramFeed/issues/101", 4);
                            if (!data) return;
                        }else{
                            data = data[0].graphql.user || data[0].graphql.hashtag;
                        }

                        if (!skipCaching && _this.options.cache_time > 0) {
                            localStorage.setItem(_this.cache_data_key, JSON.stringify(data));
                            localStorage.setItem(_this.cache_data_key_cached, new Date().getTime());
                        }

                        callback(data, _this);
                    } else {
                        _this.options.on_error("InstagramFeed: Unable to fetch the given user/tag. Instagram responded with the status code: " + xhr.statusText, 5);
                    }
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        };

        this.parse_caption = function(igobj, data) {
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
            return (this.is_tag ? data.name : data.username) + " image ";
        }

        this.display = function(data) {
            // Styling
            var html = "",
                styles;
            if (this.options.styling) {
                var width = (100 - this.options.margin * 2 * this.options.items_per_row) / this.options.items_per_row;
                styles = {
                    'profile_container': " style='text-align:center;'",
                    'profile_image': " style='border-radius:10em;width:15%;max-width:125px;min-width:50px;'",
                    'profile_name': " style='font-size:1.2em;'",
                    'profile_biography': " style='font-size:1em;'",
                    'gallery_image': " style='width:100%;'",
                    'gallery_image_link': " style='width:" + width + "%; margin:" + this.options.margin + "%; position:relative; display: inline-block; height: 100%;'"
                };
                // Caption Styling
                if(this.options.display_captions){
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
            } else {
                styles = {
                    'profile_container': "",
                    'profile_image': "",
                    'profile_name': "",
                    'profile_biography': "",
                    'gallery_image': "",
                    'gallery_image_link': ""
                };
            }

            // Profile
            if (this.options.display_profile) {
                html += "<div class='instagram_profile'" + styles.profile_container + ">";
                html += "<img class='instagram_profile_image'" + (this.options.lazy_load ? " loading='lazy'" : '')  + " src='" + data.profile_pic_url + "' alt='" + (this.is_tag ? data.name + " tag pic" : data.username + " profile pic") + " profile pic'" + styles.profile_image + " />";
                if (this.is_tag)
                    html += "<p class='instagram_tag'" + styles.profile_name + "><a href='https://www.instagram.com/explore/tags/" + this.options.tag + "' rel='noopener' target='_blank'>#" + this.options.tag + "</a></p>";
                else
                    html += "<p class='instagram_username'" + styles.profile_name + ">@" + data.full_name + " (<a href='https://www.instagram.com/" + this.options.username + "' rel='noopener' target='_blank'>@" + this.options.username + "</a>)</p>";

                if (!this.is_tag && this.options.display_biography)
                    html += "<p class='instagram_biography'" + styles.profile_biography + ">" + data.biography + "</p>";

                html += "</div>";
            }

            // Gallery
            if (this.options.display_gallery) {
                var image_index = typeof image_sizes[this.options.image_size] !== "undefined" ? image_sizes[this.options.image_size] : image_sizes[640];

                if (typeof data.is_private !== "undefined" && data.is_private === true) {
                    html += "<p class='instagram_private'><strong>This profile is private</strong></p>";
                } else {
                    var imgs = (data.edge_owner_to_timeline_media || data.edge_hashtag_to_media).edges;
                    max = (imgs.length > this.options.items) ? this.options.items : imgs.length;

                    html += "<div class='instagram_gallery'>";
                    for (var i = 0; i < max; i++) {
                        var url = "https://www.instagram.com/p/" + imgs[i].node.shortcode,
                            image, type_resource,
                            caption = escape_string(this.parse_caption(imgs[i], data));

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

                        if (this.is_tag) data.username = '';
                        html += "<a href='" + url + (this.options.display_captions? "' data-caption='" + caption : "") + "' class='instagram-" + type_resource + "' rel='noopener' target='_blank'" + styles.gallery_image_link + ">";
                        html += "<img" + (this.options.lazy_load ? " loading='lazy'" : '')  + " src='" + image + "' alt='" + caption + "'" + styles.gallery_image + " />";
                        html += "</a>";
                    }

                    html += "</div>";
                }
            }

            // IGTV
            if (this.options.display_igtv && typeof data.edge_felix_video_timeline !== "undefined") {
                var igtv = data.edge_felix_video_timeline.edges,
                    max = (igtv.length > this.options.items) ? this.options.items : igtv.length
                if (igtv.length > 0) {
                    html += "<div class='instagram_igtv'>";
                    for (var i = 0; i < max; i++) {
                        var url = "https://www.instagram.com/p/" + igtv[i].node.shortcode,
                            caption = escape_string(this.parse_caption(igtv[i], data));

                        html += "<a href='" + url + (this.options.display_captions? "' data-caption='" + caption : "") + "' rel='noopener' target='_blank'" + styles.gallery_image_link + ">";
                        html += "<img" + (this.options.lazy_load ? " loading='lazy'" : '')  + " src='" + igtv[i].node.thumbnail_src + "' alt='" + caption + "'" + styles.gallery_image + " />";
                        html += "</a>";
                    }
                    html += "</div>";
                }
            }

            this.options.container.innerHTML = html;
        };

        this.run = function() {
            var cache_data = null;
            this.cache_data_key = 'InstagramFeed_' + (this.is_tag ? 't_' + this.options.tag : 'u_' + this.options.username);
            this.cache_data_key_cached = this.cache_data_key + '_cached';

            if (this.options.cache_time > 0) {
                var cached_time = localStorage.getItem(this.cache_data_key_cached);
                if (cached_time !== null && parseInt(cached_time) + 1000 * 60 * this.options.cache_time > new Date().getTime()) {
                    var cache_data_raw = localStorage.getItem(this.cache_data_key);
                    if (cache_data_raw !== null) {
                        cache_data = JSON.parse(cache_data_raw);
                    }
                }
            }

            if (cache_data !== null) {
                if(this.options.container != ""){
                    this.display(cache_data);
                }
                if(typeof this.options.callback === "function"){
                    this.options.callback(cache_data);
                }
            }else{
                this.get(function(data, instance) {
                    if(instance.options.container != ""){
                        instance.display(data);
                    }
                    if(typeof instance.options.callback === "function"){
                        instance.options.callback(data);
                    }
                });
            }
        };

        if (this.valid) {
            this.run();
        }
    };
}));
