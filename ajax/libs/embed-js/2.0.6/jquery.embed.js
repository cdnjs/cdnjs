/*
 *  embed-js - v2.0.6
 *  A jQuery plugin that analyses the string and automatically embeds emojis, media, maps, tweets, code and services.
 *  http://rkritesh.in/embed.js
 *
 *  Made by Ritesh Kumar
 *  Under MIT License
 */
//The MIT License (MIT)
//Copyright (c) 2014 Ritesh Kumar
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory, window, document);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'), window, document);
    } else {
        // Browser globals
        factory(jQuery, window, document);
    }
}(function ($, window, document, undefined) {

    'use strict';

    var icons = [{
        'text': ':)',
        'code': 'e60a'
    }, {
        'text': ':D',
        'code': 'e608'
    }, {
        'text': ':d',
        'code': 'e608'
    }, {
        'text': ':(',
        'code': 'e60e'
    }, {
        'text': ':/',
        'code': 'e620'

    }, {
        'text': ':P',
        'code': 'e60c'
    }, {
        'text': ':p',
        'code': 'e60c'
    }, {
        'text': ':P',
        'code': 'e60c'
    }, {
        'text': '3:)',
        'code': 'e618'
    }, {
        'text': '(^)',
        'code': 'e607'
    }, {
        'text': ';)',
        'code': 'e610'
    }, {
        'text': ':o',
        'code': 'e61a'
    }, {
        'text': '-_-',
        'code': 'e61e'
    }, {
        'text': '(y)',
        'code': 'e606'
    }, {
        'text': ':*',
        'code': 'e604'
    }, {
        'text': '&lt;3',
        'code': 'e604'
    }, {
        'text': '<3',
        'code': 'e604'
    }, {
        'text': '&lt;/3',
        'code': 'e605'
    }, {
        'text': '</3',
        'code': 'e605'
    }, {
        'text': '^_^',
        'code': 'e612'
    }, {
        'text': '8-)',
        'code': 'e614'
    }, {
        'text': '8|',
        'code': 'e614'
    }, {
        'text': ':S',
        'code': 'e61c'
    }, {
        'text': ':s',
        'code': 'e61c'
    }];

    var emojiList = ['bowtie', 'smile', 'laughing', 'blush', 'smiley', 'relaxed', 'smirk', 'heart_eyes', 'kissing_heart', 'kissing_closed_eyes', 'flushed', 'relieved', 'satisfied', 'grin', 'wink', 'stuck_out_tongue_winking_eye', 'stuck_out_tongue_closed_eyes', 'grinning', 'kissing', 'winky_face', 'kissing_smiling_eyes', 'stuck_out_tongue', 'sleeping', 'worried', 'frowning', 'anguished', 'open_mouth', 'grimacing', 'confused', 'hushed', 'expressionless', 'unamused', 'sweat_smile', 'sweat', 'wow', 'disappointed_relieved', 'weary', 'pensive', 'disappointed', 'confounded', 'fearful', 'cold_sweat', 'persevere', 'cry', 'sob', 'joy', 'astonished', 'scream', 'neckbeard', 'tired_face', 'angry', 'rage', 'triumph', 'sleepy', 'yum', 'mask', 'sunglasses', 'dizzy_face', 'imp', 'smiling_imp', 'neutral_face', 'no_mouth', 'innocent', 'alien', 'yellow_heart', 'blue_heart', 'purple_heart', 'heart', 'green_heart', 'broken_heart', 'heartbeat', 'heartpulse', 'two_hearts', 'revolving_hearts', 'cupid', 'sparkling_heart', 'sparkles', 'star', 'star2', 'dizzy', 'boom', 'collision', 'anger', 'exclamation', 'question', 'grey_exclamation', 'grey_question', 'zzz', 'dash', 'sweat_drops', 'notes', 'musical_note', 'fire', 'hankey', 'poop', 'shit', '\\+1', 'thumbsup', '-1', 'thumbsdown', 'ok_hand', 'punch', 'facepunch', 'fist', 'v', 'wave', 'hand', 'raised_hand', 'open_hands', 'point_up', 'point_down', 'point_left', 'point_right', 'raised_hands', 'pray', 'point_up_2', 'clap', 'muscle', 'metal', 'fu', 'walking', 'runner', 'running', 'couple', 'family', 'two_men_holding_hands', 'two_women_holding_hands', 'dancer', 'dancers', 'ok_woman', 'no_good', 'information_desk_person', 'raising_hand', 'bride_with_veil', 'person_with_pouting_face', 'person_frowning', 'bow', 'couplekiss', 'couple_with_heart', 'massage', 'haircut', 'nail_care', 'boy', 'girl', 'woman', 'man', 'baby', 'older_woman', 'older_man', 'person_with_blond_hair', 'man_with_gua_pi_mao', 'man_with_turban', 'construction_worker', 'cop', 'angel', 'princess', 'smiley_cat', 'smile_cat', 'heart_eyes_cat', 'kissing_cat', 'smirk_cat', 'scream_cat', 'crying_cat_face', 'joy_cat', 'pouting_cat', 'japanese_ogre', 'japanese_goblin', 'see_no_evil', 'hear_no_evil', 'speak_no_evil', 'guardsman', 'skull', 'feet', 'lips', 'kiss', 'droplet', 'ear', 'eyes', 'nose', 'tongue', 'love_letter', 'bust_in_silhouette', 'busts_in_silhouette', 'speech_balloon', 'thought_balloon', 'feelsgood', 'finnadie', 'goberserk', 'godmode', 'hurtrealbad', 'rage1', 'rage2', 'rage3', 'rage4', 'suspect', 'trollface', 'sunny', 'umbrella', 'cloud', 'snowflake', 'snowman', 'zap', 'cyclone', 'foggy', 'ocean', 'cat', 'dog', 'mouse', 'hamster', 'rabbit', 'wolf', 'frog', 'tiger', 'koala', 'bear', 'pig', 'pig_nose', 'cow', 'boar', 'monkey_face', 'monkey', 'horse', 'racehorse', 'camel', 'sheep', 'elephant', 'panda_face', 'snake', 'bird', 'baby_chick', 'hatched_chick', 'hatching_chick', 'chicken', 'penguin', 'turtle', 'bug', 'honeybee', 'ant', 'beetle', 'snail', 'octopus', 'tropical_fish', 'fish', 'whale', 'whale2', 'dolphin', 'cow2', 'ram', 'rat', 'water_buffalo', 'tiger2', 'rabbit2', 'dragon', 'goat', 'rooster', 'dog2', 'pig2', 'mouse2', 'ox', 'dragon_face', 'blowfish', 'crocodile', 'dromedary_camel', 'leopard', 'cat2', 'poodle', 'paw_prints', 'bouquet', 'cherry_blossom', 'tulip', 'four_leaf_clover', 'rose', 'sunflower', 'hibiscus', 'maple_leaf', 'leaves', 'fallen_leaf', 'herb', 'mushroom', 'cactus', 'palm_tree', 'evergreen_tree', 'deciduous_tree', 'chestnut', 'seedling', 'blossom', 'ear_of_rice', 'shell', 'globe_with_meridians', 'sun_with_face', 'full_moon_with_face', 'new_moon_with_face', 'new_moon', 'waxing_crescent_moon', 'first_quarter_moon', 'waxing_gibbous_moon', 'full_moon', 'waning_gibbous_moon', 'last_quarter_moon', 'waning_crescent_moon', 'last_quarter_moon_with_face', 'first_quarter_moon_with_face', 'moon', 'earth_africa', 'earth_americas', 'earth_asia', 'volcano', 'milky_way', 'partly_sunny', 'octocat', 'squirrel', 'bamboo', 'gift_heart', 'dolls', 'school_satchel', 'mortar_board', 'flags', 'fireworks', 'sparkler', 'wind_chime', 'rice_scene', 'jack_o_lantern', 'ghost', 'santa', 'christmas_tree', 'gift', 'bell', 'no_bell', 'tanabata_tree', 'tada', 'confetti_ball', 'balloon', 'crystal_ball', 'cd', 'dvd', 'floppy_disk', 'camera', 'video_camera', 'movie_camera', 'computer', 'tv', 'iphone', 'phone', 'telephone', 'telephone_receiver', 'pager', 'fax', 'minidisc', 'vhs', 'sound', 'speaker', 'mute', 'loudspeaker', 'mega', 'hourglass', 'hourglass_flowing_sand', 'alarm_clock', 'watch', 'radio', 'satellite', 'loop', 'mag', 'mag_right', 'unlock', 'lock', 'lock_with_ink_pen', 'closed_lock_with_key', 'key', 'bulb', 'flashlight', 'high_brightness', 'low_brightness', 'electric_plug', 'battery', 'calling', 'email', 'mailbox', 'postbox', 'bath', 'bathtub', 'shower', 'toilet', 'wrench', 'nut_and_bolt', 'hammer', 'seat', 'moneybag', 'yen', 'dollar', 'pound', 'euro', 'credit_card', 'money_with_wings', 'e-mail', 'inbox_tray', 'outbox_tray', 'envelope', 'incoming_envelope', 'postal_horn', 'mailbox_closed', 'mailbox_with_mail', 'mailbox_with_no_mail', 'door', 'smoking', 'bomb', 'gun', 'hocho', 'pill', 'syringe', 'page_facing_up', 'page_with_curl', 'bookmark_tabs', 'bar_chart', 'chart_with_upwards_trend', 'chart_with_downwards_trend', 'scroll', 'clipboard', 'calendar', 'date', 'card_index', 'file_folder', 'open_file_folder', 'scissors', 'pushpin', 'paperclip', 'black_nib', 'pencil2', 'straight_ruler', 'triangular_ruler', 'closed_book', 'green_book', 'blue_book', 'orange_book', 'notebook', 'notebook_with_decorative_cover', 'ledger', 'books', 'bookmark', 'name_badge', 'microscope', 'telescope', 'newspaper', 'football', 'basketball', 'soccer', 'baseball', 'tennis', '8ball', 'rugby_football', 'bowling', 'golf', 'mountain_bicyclist', 'bicyclist', 'horse_racing', 'snowboarder', 'swimmer', 'surfer', 'ski', 'spades', 'hearts', 'clubs', 'diamonds', 'gem', 'ring', 'trophy', 'musical_score', 'musical_keyboard', 'violin', 'space_invader', 'video_game', 'black_joker', 'flower_playing_cards', 'game_die', 'dart', 'mahjong', 'clapper', 'memo', 'pencil', 'book', 'art', 'microphone', 'headphones', 'trumpet', 'saxophone', 'guitar', 'shoe', 'sandal', 'high_heel', 'lipstick', 'boot', 'shirt', 'tshirt', 'necktie', 'womans_clothes', 'dress', 'running_shirt_with_sash', 'jeans', 'kimono', 'bikini', 'ribbon', 'tophat', 'crown', 'womans_hat', 'mans_shoe', 'closed_umbrella', 'briefcase', 'handbag', 'pouch', 'purse', 'eyeglasses', 'fishing_pole_and_fish', 'coffee', 'tea', 'sake', 'baby_bottle', 'beer', 'beers', 'cocktail', 'tropical_drink', 'wine_glass', 'fork_and_knife', 'pizza', 'hamburger', 'fries', 'poultry_leg', 'meat_on_bone', 'spaghetti', 'curry', 'fried_shrimp', 'bento', 'sushi', 'fish_cake', 'rice_ball', 'rice_cracker', 'rice', 'ramen', 'stew', 'oden', 'dango', 'egg', 'bread', 'doughnut', 'custard', 'icecream', 'ice_cream', 'shaved_ice', 'birthday', 'cake', 'cookie', 'chocolate_bar', 'candy', 'lollipop', 'honey_pot', 'apple', 'green_apple', 'tangerine', 'lemon', 'cherries', 'grapes', 'watermelon', 'strawberry', 'peach', 'melon', 'banana', 'pear', 'pineapple', 'sweet_potato', 'eggplant', 'tomato', 'corn', 'house', 'house_with_garden', 'school', 'office', 'post_office', 'hospital', 'bank', 'convenience_store', 'love_hotel', 'hotel', 'wedding', 'church', 'department_store', 'european_post_office', 'city_sunrise', 'city_sunset', 'japanese_castle', 'european_castle', 'tent', 'factory', 'tokyo_tower', 'japan', 'mount_fuji', 'sunrise_over_mountains', 'sunrise', 'stars', 'themoreyouknow', 'tmyk', 'statue_of_liberty', 'bridge_at_night', 'carousel_horse', 'rainbow', 'ferris_wheel', 'fountain', 'roller_coaster', 'ship', 'speedboat', 'boat', 'sailboat', 'rowboat', 'anchor', 'rocket', 'airplane', 'helicopter', 'steam_locomotive', 'tram', 'mountain_railway', 'bike', 'aerial_tramway', 'suspension_railway', 'mountain_cableway', 'tractor', 'blue_car', 'oncoming_automobile', 'car', 'red_car', 'taxi', 'oncoming_taxi', 'articulated_lorry', 'bus', 'oncoming_bus', 'rotating_light', 'police_car', 'oncoming_police_car', 'fire_engine', 'ambulance', 'minibus', 'truck', 'train', 'station', 'train2', 'bullettrain_front', 'bullettrain_side', 'light_rail', 'monorail', 'railway_car', 'trolleybus', 'ticket', 'fuelpump', 'vertical_traffic_light', 'traffic_light', 'warning', 'construction', 'beginner', 'atm', 'slot_machine', 'busstop', 'barber', 'hotsprings', 'checkered_flag', 'crossed_flags', 'izakaya_lantern', 'moyai', 'circus_tent', 'performing_arts', 'round_pushpin', 'triangular_flag_on_post', 'jp', 'kr', 'cn', 'us', 'fr', 'es', 'it', 'ru', 'gb', 'uk', 'de', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'keycap_ten', '1234', 'zero', 'hash', 'symbols', 'arrow_backward', 'arrow_down', 'arrow_forward', 'arrow_left', 'capital_abcd', 'abcd', 'abc', 'arrow_lower_left', 'arrow_lower_right', 'arrow_right', 'arrow_up', 'arrow_upper_left', 'arrow_upper_right', 'arrow_double_down', 'arrow_double_up', 'arrow_down_small', 'arrow_heading_down', 'arrow_heading_up', 'leftwards_arrow_with_hook', 'arrow_right_hook', 'left_right_arrow', 'arrow_up_down', 'arrow_up_small', 'arrows_clockwise', 'arrows_counterclockwise', 'rewind', 'fast_forward', 'information_source', 'ok', 'twisted_rightwards_arrows', 'repeat', 'repeat_one', 'new', 'top', 'up', 'cool', 'free', 'ng', 'cinema', 'koko', 'signal_strength', 'u5272', 'u5408', 'u55b6', 'u6307', 'u6708', 'u6709', 'u6e80', 'u7121', 'u7533', 'u7a7a', 'u7981', 'sa', 'restroom', 'mens', 'womens', 'baby_symbol', 'no_smoking', 'parking', 'wheelchair', 'metro', 'baggage_claim', 'accept', 'wc', 'potable_water', 'put_litter_in_its_place', 'secret', 'congratulations', 'm', 'passport_control', 'left_luggage', 'customs', 'ideograph_advantage', 'cl', 'sos', 'id', 'no_entry_sign', 'underage', 'no_mobile_phones', 'do_not_litter', 'non-potable_water', 'no_bicycles', 'no_pedestrians', 'children_crossing', 'no_entry', 'eight_spoked_asterisk', 'eight_pointed_black_star', 'heart_decoration', 'vs', 'vibration_mode', 'mobile_phone_off', 'chart', 'currency_exchange', 'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpius', 'sagittarius', 'capricorn', 'aquarius', 'pisces', 'ophiuchus', 'six_pointed_star', 'negative_squared_cross_mark', 'a', 'b', 'ab', 'o2', 'diamond_shape_with_a_dot_inside', 'recycle', 'end', 'on', 'soon', 'clock1', 'clock130', 'clock10', 'clock1030', 'clock11', 'clock1130', 'clock12', 'clock1230', 'clock2', 'clock230', 'clock3', 'clock330', 'clock4', 'clock430', 'clock5', 'clock530', 'clock6', 'clock630', 'clock7', 'clock730', 'clock8', 'clock830', 'clock9', 'clock930', 'heavy_dollar_sign', 'copyright', 'registered', 'tm', 'x', 'heavy_exclamation_mark', 'bangbang', 'interrobang', 'o', 'heavy_multiplication_x', 'heavy_plus_sign', 'heavy_minus_sign', 'heavy_division_sign', 'white_flower', '100', 'heavy_check_mark', 'ballot_box_with_check', 'radio_button', 'link', 'curly_loop', 'wavy_dash', 'part_alternation_mark', 'trident', 'black_square', 'white_square', 'white_check_mark', 'black_square_button', 'white_square_button', 'black_circle', 'white_circle', 'red_circle', 'large_blue_circle', 'large_blue_diamond', 'large_orange_diamond', 'small_blue_diamond', 'small_orange_diamond', 'small_red_triangle', 'small_red_triangle_down', 'shipit'];

    /* VARIABLE DECLARATIONS */
    var pluginName = 'embedJS',
        pluginBlockName = 'embedBlock',
        options = {
            block             : false,
            embedSelector     : 'div',          //Refers to the selector inside #element that is to be processed
            link              : true,           //Instructs the library whether or not to embed urls
            linkTarget        : '_self',        //same as the target attribute in html anchor tag . supports all html
                                                // supported target values.
            linkExclude       : [],             //Array of extensions to be excluded from converting into links
            docEmbed          : true,           //set true to show a preview of pdf links
            docOptions        : {
                viewText    : '<i class="fa fa-eye"></i> View Doc',
                downloadText: '<i class="fa fa-download"></i> DOWNLOAD'
            },
            imageEmbed        : true,           //set true to embed images
            imageLightbox     : true,           //set true to enable lightboxes for images
            audioEmbed        : false,          //set true to embed audio
            videoEmbed        : true,           //set true to show a preview of youtube/vimeo videos with details
            basicVideoEmbed   : true,           //set true to show basic video files like mp4 etc. (supported by html5
                                                // player)
            videoWidth        : null,           //width of the video frame (in pixels)
            videoHeight       : null,           //height of the video frame (in pixels)
            gdevAuthKey       : null,           //( Mandatory ) The authorization key obtained from google's developer
                                                // console for using youtube data api and map embed api
            locationEmbed     : true,
            mapOptions        : {
                mode: 'place'                   //'place' or 'streetview' or 'view'
            },
            highlightCode     : true,           //Instructs the library whether or not to highlight code syntax.
            tweetsEmbed       : true,           //Instructs the library whether or not embed the tweets
            tweetOptions      : {
                maxWidth  : 550,            //The maximum width of a rendered Tweet in whole pixels. This value must be
                                            // between 220 and 550 inclusive.
                hideMedia : false,          //When set to true or 1 links in a Tweet are not expanded to photo, video, or
                                            // link previews.
                hideThread: false,          //When set to true or 1 a collapsed version of the previous Tweet in a
                                            // conversation thread will not be displayed when the requested Tweet is in
                                            // reply to another Tweet.
                align     : 'none',         //Specifies whether the embedded Tweet should be floated left, right, or center
                                            // in the page relative to the parent element. Valid values are left, right,
                                            // center, and none. Defaults to none, meaning no alignment styles are
                                            // specified for the Tweet.
                lang      : 'en'           //Request returned HTML and a rendered Tweet in the specified
                                           // (https://dev.twitter.com/web/overview/languages)
            },
            excludeEmbed      : [],
            codeEmbedHeight   : 300,
            soundCloudOptions : {
                height      : 160,
                themeColor  : 'f50000',   //Hex Code of the player theme color
                autoPlay    : false,
                hideRelated : false,
                showComments: true,
                showUser    : true,
                showReposts : false,
                visual      : false,         //Show/hide the big preview image
                download    : false          //Show/Hide download buttons
            },
            vineOptions       : {
                maxWidth  : null,
                type      : 'postcard',         //'postcard' or 'simple' embedding
                responsive: false
            },
            beforeDocPreview  : function () {   //callback before pdf preview
            },
            afterDocPreview   : function () {   //callback after pdf preview
            },
            onVideoShow       : function () {   // callback on video frame view
            },
            onVideoLoad       : function () {   //callback on video load (youtube/vimeo)
            },
            beforeEmbedJSApply: function () {   //function to execute before embedding services
            },
            afterEmbedJSLApply: function () {   //callback after embedJS is applied
            },
            onTwitterShow     : function () {   //callback after all the twitter widgets are loaded.
            }

        };
    /* ENDS */

    //Global Variables

    // The actual plugin constructor
    function Plugin(element, setOptions) {
        this.element = element;
        this.settings = $.extend(true, {}, options, setOptions);
        this.init(this.settings, this.element);
    }

    var video = {};

    /* UTILITIES - FUNCTIONS */

    var utils = {};

    utils.trunc = function (string, n, useWordBoundary) {
        var toLong = string.length > n, s_ = toLong ? string.substr(0, n - 1) : string;
        s_ = useWordBoundary && toLong ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
        return toLong ? s_ + '...' : s_;
    };

    /**
     * Retures a new array with unique values
     *
     * @returns {Array}
     */
    utils.getUnique = function (array) {
        var u = {}, a = [];
        for (var i = 0, l = array.length; i < l; ++i) {
            if (u.hasOwnProperty(array[i])) {
                continue;
            }
            a.push(array[i]);
            u[array[i]] = 1;
        }
        return a;
    };

    utils.toUrl = function (string) {
        var url;
        if (string.indexOf('//') == -1) {
            url = '//' + string;
        } else {
            url = string;
        }
        return url;
    };

    var createObject = function (a, b) {
        var object = {
            'index'    : a,
            'embedCode': b
        };
        return object;
    };

    /**
     * Variable Declarations
     */

    var videoTemplate = '';
    var embedArray = [];
    var embedCodeArray = [];

    var emoticonProcess = {
        insertfontSmiley: function (str) {
            var a = str.split(' ');
            icons.forEach(function (icon) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i] === icon.text) {
                        a[i] = '<span class="icon-emoticon" title="' + icon.text + '">' + '&#x' + icon.code + '</span>';
                    }
                }
            });
            return a.join(' ');
        },

        insertEmoji: function (str) {
            var emojiRegex = new RegExp(':(' + emojiList.join('|') + '):', 'g');
            return str.replace(emojiRegex, function (match, text) {
                return '<span class="emoticon emoticon-' + text + '" title=":' + text + ':"></span>';
            });
        }
    };

    function urlEmbed(str, opts) {

        //The short url credit goes to KuroTsuto from https://gist.github.com/KuroTsuto/8448070

        var urlRegex = /((href|src)=["']|)(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(?:https?:\/\/)?(?:(?:0rz\.tw)|(?:1link\.in)|(?:1url\.com)|(?:2\.gp)|(?:2big\.at)|(?:2tu\.us)|(?:3\.ly)|(?:307\.to)|(?:4ms\.me)|(?:4sq\.com)|(?:4url\.cc)|(?:6url\.com)|(?:7\.ly)|(?:a\.gg)|(?:a\.nf)|(?:aa\.cx)|(?:abcurl\.net)|(?:ad\.vu)|(?:adf\.ly)|(?:adjix\.com)|(?:afx\.cc)|(?:all\.fuseurl.com)|(?:alturl\.com)|(?:amzn\.to)|(?:ar\.gy)|(?:arst\.ch)|(?:atu\.ca)|(?:azc\.cc)|(?:b23\.ru)|(?:b2l\.me)|(?:bacn\.me)|(?:bcool\.bz)|(?:binged\.it)|(?:bit\.ly)|(?:bizj\.us)|(?:bloat\.me)|(?:bravo\.ly)|(?:bsa\.ly)|(?:budurl\.com)|(?:canurl\.com)|(?:chilp\.it)|(?:chzb\.gr)|(?:cl\.lk)|(?:cl\.ly)|(?:clck\.ru)|(?:cli\.gs)|(?:cliccami\.info)|(?:clickthru\.ca)|(?:clop\.in)|(?:conta\.cc)|(?:cort\.as)|(?:cot\.ag)|(?:crks\.me)|(?:ctvr\.us)|(?:cutt\.us)|(?:dai\.ly)|(?:decenturl\.com)|(?:dfl8\.me)|(?:digbig\.com)|(?:digg\.com)|(?:disq\.us)|(?:dld\.bz)|(?:dlvr\.it)|(?:do\.my)|(?:doiop\.com)|(?:dopen\.us)|(?:easyuri\.com)|(?:easyurl\.net)|(?:eepurl\.com)|(?:eweri\.com)|(?:fa\.by)|(?:fav\.me)|(?:fb\.me)|(?:fbshare\.me)|(?:ff\.im)|(?:fff\.to)|(?:fire\.to)|(?:firsturl\.de)|(?:firsturl\.net)|(?:flic\.kr)|(?:flq\.us)|(?:fly2\.ws)|(?:fon\.gs)|(?:freak\.to)|(?:fuseurl\.com)|(?:fuzzy\.to)|(?:fwd4\.me)|(?:fwib\.net)|(?:g\.ro.lt)|(?:gizmo\.do)|(?:gl\.am)|(?:go\.9nl.com)|(?:go\.ign.com)|(?:go\.usa.gov)|(?:goo\.gl)|(?:goshrink\.com)|(?:gurl\.es)|(?:hex\.io)|(?:hiderefer\.com)|(?:hmm\.ph)|(?:href\.in)|(?:hsblinks\.com)|(?:htxt\.it)|(?:huff\.to)|(?:hulu\.com)|(?:hurl\.me)|(?:hurl\.ws)|(?:icanhaz\.com)|(?:idek\.net)|(?:ilix\.in)|(?:is\.gd)|(?:its\.my)|(?:ix\.lt)|(?:j\.mp)|(?:jijr\.com)|(?:kl\.am)|(?:klck\.me)|(?:korta\.nu)|(?:krunchd\.com)|(?:l9k\.net)|(?:lat\.ms)|(?:liip\.to)|(?:liltext\.com)|(?:linkbee\.com)|(?:linkbun\.ch)|(?:liurl\.cn)|(?:ln-s\.net)|(?:ln-s\.ru)|(?:lnk\.gd)|(?:lnk\.ms)|(?:lnkd\.in)|(?:lnkurl\.com)|(?:lru\.jp)|(?:lt\.tl)|(?:lurl\.no)|(?:macte\.ch)|(?:mash\.to)|(?:merky\.de)|(?:migre\.me)|(?:miniurl\.com)|(?:minurl\.fr)|(?:mke\.me)|(?:moby\.to)|(?:moourl\.com)|(?:mrte\.ch)|(?:myloc\.me)|(?:myurl\.in)|(?:n\.pr)|(?:nbc\.co)|(?:nblo\.gs)|(?:nn\.nf)|(?:not\.my)|(?:notlong\.com)|(?:nsfw\.in)|(?:nutshellurl\.com)|(?:nxy\.in)|(?:nyti\.ms)|(?:o-x\.fr)|(?:oc1\.us)|(?:om\.ly)|(?:omf\.gd)|(?:omoikane\.net)|(?:on\.cnn.com)|(?:on\.mktw.net)|(?:onforb\.es)|(?:orz\.se)|(?:ow\.ly)|(?:ping\.fm)|(?:pli\.gs)|(?:pnt\.me)|(?:politi\.co)|(?:post\.ly)|(?:pp\.gg)|(?:profile\.to)|(?:ptiturl\.com)|(?:pub\.vitrue.com)|(?:qlnk\.net)|(?:qte\.me)|(?:qu\.tc)|(?:qy\.fi)|(?:r\.im)|(?:rb6\.me)|(?:read\.bi)|(?:readthis\.ca)|(?:reallytinyurl\.com)|(?:redir\.ec)|(?:redirects\.ca)|(?:redirx\.com)|(?:retwt\.me)|(?:ri\.ms)|(?:rickroll\.it)|(?:riz\.gd)|(?:rt\.nu)|(?:ru\.ly)|(?:rubyurl\.com)|(?:rurl\.org)|(?:rww\.tw)|(?:s4c\.in)|(?:s7y\.us)|(?:safe\.mn)|(?:sameurl\.com)|(?:sdut\.us)|(?:shar\.es)|(?:shink\.de)|(?:shorl\.com)|(?:short\.ie)|(?:short\.to)|(?:shortlinks\.co.uk)|(?:shorturl\.com)|(?:shout\.to)|(?:show\.my)|(?:shrinkify\.com)|(?:shrinkr\.com)|(?:shrt\.fr)|(?:shrt\.st)|(?:shrten\.com)|(?:shrunkin\.com)|(?:simurl\.com)|(?:slate\.me)|(?:smallr\.com)|(?:smsh\.me)|(?:smurl\.name)|(?:sn\.im)|(?:snipr\.com)|(?:snipurl\.com)|(?:snurl\.com)|(?:sp2\.ro)|(?:spedr\.com)|(?:srnk\.net)|(?:srs\.li)|(?:starturl\.com)|(?:su\.pr)|(?:surl\.co.uk)|(?:surl\.hu)|(?:t\.cn)|(?:t\.co)|(?:t\.lh.com)|(?:ta\.gd)|(?:tbd\.ly)|(?:tcrn\.ch)|(?:tgr\.me)|(?:tgr\.ph)|(?:tighturl\.com)|(?:tiniuri\.com)|(?:tiny\.cc)|(?:tiny\.ly)|(?:tiny\.pl)|(?:tinylink\.in)|(?:tinyuri\.ca)|(?:tinyurl\.com)|(?:tl\.gd)|(?:tmi\.me)|(?:tnij\.org)|(?:tnw\.to)|(?:tny\.com)|(?:to\.ly)|(?:togoto\.us)|(?:totc\.us)|(?:toysr\.us)|(?:tpm\.ly)|(?:tr\.im)|(?:tra\.kz)|(?:trunc\.it)|(?:twhub\.com)|(?:twirl\.at)|(?:twitclicks\.com)|(?:twitterurl\.net)|(?:twitterurl\.org)|(?:twiturl\.de)|(?:twurl\.cc)|(?:twurl\.nl)|(?:u\.mavrev.com)|(?:u\.nu)|(?:u76\.org)|(?:ub0\.cc)|(?:ulu\.lu)|(?:updating\.me)|(?:ur1\.ca)|(?:url\.az)|(?:url\.co.uk)|(?:url\.ie)|(?:url360\.me)|(?:url4\.eu)|(?:urlborg\.com)|(?:urlbrief\.com)|(?:urlcover\.com)|(?:urlcut\.com)|(?:urlenco\.de)|(?:urli\.nl)|(?:urls\.im)|(?:urlshorteningservicefortwitter\.com)|(?:urlx\.ie)|(?:urlzen\.com)|(?:usat\.ly)|(?:use\.my)|(?:vb\.ly)|(?:vgn\.am)|(?:vl\.am)|(?:vm\.lc)|(?:w55\.de)|(?:wapo\.st)|(?:wapurl\.co.uk)|(?:wipi\.es)|(?:wp\.me)|(?:x\.vu)|(?:xr\.com)|(?:xrl\.in)|(?:xrl\.us)|(?:xurl\.es)|(?:xurl\.jp)|(?:y\.ahoo.it)|(?:yatuc\.com)|(?:ye\.pe)|(?:yep\.it)|(?:yfrog\.com)|(?:yhoo\.it)|(?:yiyd\.com)|(?:youtu\.be)|(?:yuarel\.com)|(?:z0p\.de)|(?:zi\.ma)|(?:zi\.mu)|(?:zipmyurl\.com)|(?:zud\.me)|(?:zurl\.ws)|(?:zz\.gd)|(?:zzang\.kr)|(?:›\.ws)|(?:✩\.ws)|(?:✿\.ws)|(?:❥\.ws)|(?:➔\.ws)|(?:➞\.ws)|(?:➡\.ws)|(?:➨\.ws)|(?:➯\.ws)|(?:➹\.ws)|(?:➽\.ws))\/[a-z0-9]*/gi;
        return str.replace(urlRegex, function (match) {
            var extension = match.split('.')[match.split('.').length - 1];
            if (($.inArray(extension, opts.linkExclude) === -1)) {
                return '<a href="' + utils.toUrl(match) + '" target="' + opts.linkTarget + '">' + match + '</a>';
            }
            return match;
        });
    }

    function initVideoTemplate() {
        videoTemplate = '<div class="ejs-video"><div class="ejs-video-preview">' + '<div class="ejs-video-thumb">' + '<img src="' + video.thumbnail + '" alt="' + video.host + '/' + video.id + '"/>' + '<i class="fa fa-play-circle-o"></i>' + '</div>' + '<div class="ejs-video-detail">' + '<div class="ejs-video-title">' + '<a href="' + video.url + '">' + video.title + '</a>' + '</div>' + '<div class="ejs-video-desc">' + video.description + '</div>' + '<div class="ejs-video-stats">' + '<span><i class="fa fa-eye"></i> ' + video.views + '</span>' + '<span><i class="fa fa-heart"></i> ' + video.likes + '</span>' + '</div>' + '</div>' + '</div></div>';
    }

    var videoProcess = {

        dimensions: function (options) {
            var dimensions = {
                'width': null, 'height': null
            };
            dimensions.width = options.videoWidth;
            dimensions.height = options.videoHeight;

            if (options.videoHeight && options.videoWidth) {
                return dimensions;
            }
            else if (options.videoHeight) {
                dimensions.width = ((options.videoHeight) / 390) * 640;
                return dimensions;
            }
            else if (options.videoWidth) {
                dimensions.height = ((dimensions.width) / 640) * 390;
                return dimensions;
            }
            else {
                dimensions.width = 640;
                dimensions.height = 390;
                return dimensions;
            }
        },

        play: function (elem, settings) {
            $(elem).undelegate('click').on('click', '.ejs-video-thumb', function (e) {
                var self = this;
                var videoInfo = {};
                var videoDetails = $(this).find('img')[0].alt.split('/');

                if (videoDetails[0] == 'vimeo') {
                    videoInfo.url = 'https://player.vimeo.com/video/' + videoDetails[1] + '?title=0&byline=0&portrait=0&autoplay=1';
                }
                else if (videoDetails[0] == 'youtube') {
                    videoInfo.url = 'https://www.youtube.com/embed/' + videoDetails[1] + '?autoplay=1&rel=0';
                }

                var videoPlayerTemplate = '<div class="ejs-video-player"><iframe src="' + videoInfo.url + '" frameBorder="0" width="' + video.width + '" height="' + video.height + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';
                var wrapper = $(self).parent();
                $(wrapper).html(videoPlayerTemplate);
                settings.onVideoShow();

                // Callback after the video iframe is loaded
                $(wrapper).find('iframe').load(function () {
                    settings.onVideoLoad();
                });
                e.stopPropagation();

            });
        },

        ytRegex   : /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi,
        vimeoRegex: /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)*/gi,

        /**
         *
         *
         *
         */
        getVideoData: function (url, opts) {
            var deferred = $.Deferred();
            var returnedData;
            var videoDimensions = this.dimensions(opts);
            if (url.match(this.ytRegex)) {
                $.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + RegExp.$1 + '&key=' + opts.gdevAuthKey + '&part=snippet,statistics').success(function (d) {
                    var ytData = d.items[0];
                    video.host = 'youtube';
                    video.title = ytData.snippet.title;
                    video.thumbnail = ytData.snippet.thumbnails.medium.url;
                    video.description = (utils.trunc(ytData.snippet.description, 150, true)).replace(/\n/g, ' ').replace(/&#10;/g, ' ');
                    video.rawDescription = ytData.snippet.description;
                    video.views = ytData.statistics.viewCount;
                    video.likes = ytData.statistics.likeCount;
                    video.url = 'https://www.youtube.com/watch?v=' + RegExp.$1;
                    video.width = videoDimensions.width;
                    video.height = videoDimensions.height;
                    video.id = ytData.id;
                    initVideoTemplate();
                    returnedData = videoTemplate;
                    deferred.resolve(returnedData);
                });
            }
            else if (url.match(this.vimeoRegex)) {
                $.getJSON('https://vimeo.com/api/v2/video/' + RegExp.$3 + '.json').success(function (d) {

                    video.host = 'vimeo';
                    video.title = d[0].title;
                    video.rawDescription = (d[0].description).replace(/\n/g, '<br/>').replace(/&#10;/g, '<br/>');
                    video.description = utils.trunc((d[0].description).replace(/((<|&lt;)br\s*\/*(>|&gt;)\r\n)/g, ' '), 150, true);
                    video.thumbnail = d[0].thumbnail_medium;
                    video.views = d[0].stats_number_of_plays;
                    video.likes = d[0].stats_number_of_likes;
                    video.url = d[0].url;
                    video.width = videoDimensions.width;
                    video.height = videoDimensions.height;
                    video.id = d[0].id;
                    initVideoTemplate();
                    returnedData = videoTemplate;
                    deferred.resolve(returnedData);

                });
            }

            return deferred.promise();
        }
        ,

        embed: function (rawStr, opts) {
            var deferred = $.Deferred();
            var youtubeVimeoRegex = new RegExp(this.ytRegex.source + '|' + this.vimeoRegex.source, 'gi');

            var resultStr;

            function serviceLoop() {
                _this.getVideoData(matchArray[i], opts).then(function (d) {
                    returnedData.push(d);
                    i++;
                    if (i < matchArray.length) {
                        serviceLoop();
                    }
                    else if (returnedData.length === matchArray.length) {
                        resultStr = rawStr + returnedData.join(' ');
                        deferred.resolve(resultStr);
                    }
                });
            }

            if (opts.videoEmbed && rawStr.match(youtubeVimeoRegex)) {

                var matchArray = [];
                var matches;

                while ((matches = youtubeVimeoRegex.exec(rawStr)) !== null) {
                    matchArray.push(matches[0]);
                }

                //Remove duplicate urls and save to the variable removedDuplicates

                matchArray = utils.getUnique(matchArray);

                var _this = this;

                var i = 0;
                var returnedData = [];

                serviceLoop();

            }
            else {
                resultStr = rawStr;
                deferred.resolve(resultStr);
            }
            return deferred.promise();

        },

        embedBasic: function (rawStr) {
            var basicVideoRegex = /(?:https?):\/\/\S*\.(?:ogv|webm|mp4)/gi;
            var matches;
            while ((matches = basicVideoRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-video"><div class="ejs-video-player"><div class="player"><video src="' + matches[0] + '" controls></video></div></div></div>';
                embedArray.push(createObject(matches.index, template));

            }
        },

        twitchtvEmbed: function (rawStr, opts) {
            var twitchRegex = /www.twitch.tv\/[a-zA_Z0-9_]+/gi;
            var videoDimensions = this.dimensions(opts);
            var matches;
            while ((matches = twitchRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-video"><object bgcolor="#000000" data="//www-cdn.jtvnw.net/swflibs/TwitchPlayer.swf" height="' + videoDimensions.height + '" id="clip_embed_player_flash" type="application/x-shockwave-flash" width="' + videoDimensions.width + '">' + '<param name="movie" value="http://www-cdn.jtvnw.net/swflibs/TwitchPlayer.swf" />' + '<param name="allowScriptAccess" value="always" />' + '<param name="allowNetworking" value="all" />' + '<param name="allowFullScreen" value="true" />' + '<param name="flashvars" value="channel=' + matches[0].split('/')[1] + '&auto_play=false" />' + '</object></div>';
                embedArray.push(createObject(matches.index, template));

            }
        },

        dotsubEmbed: function (rawStr, opts) {
            var dotsubRegex = /dotsub.com\/view\/[a-zA-Z0-9-]+/gi;
            var videoDimensions = this.dimensions(opts);
            var matches;
            while ((matches = dotsubRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-video"><iframe src="https://dotsub.com/media/' + matches[0].split('/')[2] + '/embed/" width="' + videoDimensions.width + '" height="' + videoDimensions.height + '"></iframe></div>';
                embedArray.push(createObject(matches.index, template));

            }
        },

        dailymotionEmbed: function (rawStr, opts) {
            var dmRegex = /dailymotion.com\/video\/[a-zA-Z0-9-_]+/gi;
            var videoDimensions = this.dimensions(opts);
            var matches;
            while ((matches = dmRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-video"><iframe src="http://www.dailymotion.com/embed/video/' + matches[0].split('/')[2] + '" height="' + videoDimensions.height + '" width="' + videoDimensions.width + '"></iframe></div>';
                embedArray.push(createObject(matches.index, template));

            }
        },

        vineEmbed: function (rawStr, opts, element) {
            var vineRegex = /vine.co\/v\/[a-zA-Z0-9]+/gi;
            var _width = function () {
                if ((opts.vineOptions.maxWidth > $(element).width() && opts.vineOptions.responsive) || !opts.vineOptions.maxWidth) {
                    return $(element).width();
                }
                else {
                    return opts.vineOptions.maxWidth;
                }
            };
            var matches;
            while ((matches = vineRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-vine"><iframe class="ejs-vine-iframe" src="https://vine.co/v/' + matches[0].split('/')[2] + '/embed/' + opts.vineOptions.type + '" height="' + (opts.vineOptions.type == 'postcard' ? (_width() + 160) : _width()) + '" width="' + _width() + '"></iframe></div>';
                embedArray.push(createObject(matches.index, template));

            }
        },

        ustreamEmbed: function (rawStr, opts) {
            var ustreamRegex = /ustream.tv\/[a-z\/0-9]*/gi;
            var videoDimensions = this.dimensions(opts);
            var matches;
            while ((matches = ustreamRegex.exec(rawStr)) !== null) {

                var embedCode = matches[0].split('/');
                embedCode.splice(1, 0, 'embed');
                var template = '<div class="ejs-embed"><iframe src="//www.' + embedCode.join('/') + '" height="' + videoDimensions.height + '" width="' + videoDimensions.width + '"></iframe></div> ';
                embedArray.push(createObject(matches.index, template));

            }
        },

        tedEmbed     : function (rawStr, opts) {
            var tedRegex = /ted.com\/talks\/[a-zA-Z0-9_]+/gi;
            var videoDimensions = this.dimensions(opts);
            var matches;
            while ((matches = tedRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-embed"><iframe src="http://embed.ted.com/talks/' + matches[0].split('/')[2] + '.html" ' +
                    'height="' + videoDimensions.height + '" width="' + videoDimensions.width + '"></iframe></div>';
                embedArray.push(createObject(matches.index, template));

            }
        },
        liveleakEmbed: function (rawStr, opts) {
            var liveleakRegex = /liveleak.com\/view\?i=[a-zA-Z0-9_]+/gi;
            var videoDimensions = this.dimensions(opts);
            var matches;
            while ((matches = liveleakRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-video"><iframe src="http://www.liveleak.com/e/' + matches[0].split('=')[1] + '" height="' + videoDimensions.height + '" width="' + videoDimensions.width + '"></iframe></div>';
                embedArray.push(createObject(matches.index, template));

            }
        }
    };

    var docProcess = {
        embed: function (rawStr, opts) {
            var docRegex = /((?:https?):\/\/\S*\.(?:pdf|doc|docx|xls|xlsx|ppt|pptx))/gi;
            var matches;
            while ((matches = docRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-doc"><div class="ejs-doc-preview"><div class="ejs-doc-icon"><i class="fa fa-file-o"></i></div><div class="ejs-doc-detail" ><div class="ejs-doc-title"> <a href="">' + utils.toUrl(matches[0]) + '</a></div> <div class="ejs-doc-view"> <a href="' + utils.toUrl(matches[0]) + '" target="_blank"><button>' + opts.docOptions.downloadText + '</button></a> <button class="ejs-doc-view-active">' + opts.docOptions.viewText + '</button></div> </div> </div></div>';
                embedArray.push(createObject(matches.index, template));

            }
        },

        view: function (elem, settings) {
            $(elem).on('click', '.ejs-doc-view-active', function (e) {
                //calling the function before document is shown

                settings.beforeDocPreview();

                var self = this;

                var docParent = $(self).closest('.ejs-doc');
                var docUrl = $(docParent).find('a')[1].href;
                var docViewTemplate = ' <div class="ejs-doc-viewer"><iframe src="http://docs.google.com/viewer?embedded=true&url=' + utils.toUrl(docUrl) + '" frameBorder="0" style="border: none;margin : 0 auto; display : block;"></iframe></div>';
                docParent.html(docViewTemplate);

                //calling the function after the document is shown.

                settings.afterDocPreview();
                e.stopPropagation();
            });
        }
    };

    var codeProcess = {
        encodeCode: function (c) {
            c = c.replace(/&amp;/gm, '');
            c = c.replace(/&lt;/g, '<');
            c = c.replace(/&gt;/g, '>');
            return c;
        },

        highlight: function (text) {
            if (!window.hljs) {
                throw new ReferenceError('hljs is not defined. HighlightJS library is needed to highlight code. Visit https://highlightjs.org/');
            }
            var that = this;
            text = text.replace(/(`+)(\s|[a-z]+)\s*([\s\S]*?[^`])\s*\1(?!`)/gm, function (wholeMatch, m1, m2, m3) {
                var c = m3;
                c = c.replace(/^([ \t]*)/g, ''); // leading whitespace
                c = c.replace(/[ \t]*$/g, ''); // trailing whitespace
                c = that.encodeCode(c);
                c = c.replace(/:\/\//g, '~P'); // to prevent auto-linking. Not necessary in code
                // *blocks*, but in code spans. Will be converted
                // back after the auto-linker runs.

                var lang = m2.split('\n')[0];
                var languageArray = [];
                var highlightedCode;
                if (lang) {
                    languageArray.push(lang);
                    highlightedCode = hljs.highlightAuto(c, languageArray);
                }
                else {
                    highlightedCode = hljs.highlightAuto(c);
                    lang = highlightedCode.language;
                }

                return '<pre><code class="ejs-code hljs ' + lang + '">' + highlightedCode.value + '</code></pre>';
            });
            return text;
        }

    };

    var audioProcess = {
        basicEmbed: function (rawStr) {
            var audioRegex = /((?:https?):\/\/\S*\.(?:wav|mp3|ogg))/gi;
            var matches;
            while ((matches = audioRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-audio"><audio src="' + matches[0] + '" controls></audio></div>';
                embedArray.push(createObject(matches.index, template));
            }
        },

        soundCloudEmbed: function (rawStr, opts) {
            var scRegex = /soundcloud.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+/gi;
            var matches;
            while ((matches = scRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-embed"><iframe height="160" scrolling="no" ' + 'src="https://w.soundcloud.com/player/?url=https://' + matches[0] + '&auto_play=' + opts.soundCloudOptions.autoPlay + '&hide_related=' + opts.soundCloudOptions.hideRelated + '&show_comments=' + opts.soundCloudOptions.showComments + '&show_user=' + opts.soundCloudOptions.showUser + '&show_reposts=' + opts.soundCloudOptions.showReposts + '&visual=' + opts.soundCloudOptions.visual + '&download=' + opts.soundCloudOptions.download + '&color=' + opts.soundCloudOptions.themeColor + '&theme_color=' + opts.soundCloudOptions.themeColor + '"></iframe></div>';
                embedArray.push(createObject(matches.index, template));

            }
        },

        spotifyEmbed: function (rawStr) {
            var spotifyRegex = /spotify.com\/track\/[a-zA-Z0-9_]+/gi;
            var matches;
            while ((matches = spotifyRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-embed"><iframe src="https://embed.spotify.com/?uri=spotify:track:' + matches[0].split('/')[2] + '" height="80"></iframe></div>';
                embedArray.push(createObject(matches.index, template));

            }
        }

    };

    var imageProcess = {
        embed: function (rawStr) {
            var imgRegex = /(?:https?):\/\/\S[^<|\n|\r]*\.(?:gif|jpg|jpeg|tiff|png|svg|webp)/gi;
            var matches;
            while ((matches = imgRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-image"><div class="ne-image-wrapper"><img src="' + matches[0] + '"/></div></div>';
                embedArray.push(createObject(matches.index, template));

            }
        },

        flickrEmbed: function (rawStr, opts) {
            var flickrRegex = /flickr.com\/[a-z]+\/[a-zA-Z@_$!\d]+\/[\d]+/gi;
            var dimensions = videoProcess.dimensions(opts);
            var matches;
            while ((matches = flickrRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-embed"><div class="ne-image-wrapper"><iframe src="' + utils.toUrl(matches[0]) + '/player/" width="' + dimensions.width + '" height="' + dimensions.height + '"></iframe></div></div>';
                embedArray.push(createObject(matches.index, template));

            }
        },

        instagramEmbed:function(rawStr,opts){
          var instagramRegex=/instagram.com\/p\/[a-zA-Z0-9]+/gi;
            var dimensions = videoProcess.dimensions(opts);
            var matches;
            while ((matches = instagramRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-embed"><iframe src="' + utils.toUrl(matches[0]) + '/embed/" width="' + dimensions.width + '" height="' + dimensions.height + '"></iframe></div>';
                embedArray.push(createObject(matches.index, template));

            }
        },

        /**
         * The function to handle image lightboxes
         * @param elem
         */

        lightbox: function (elem, opts) {

            if (opts.imageLightbox) {

                $(elem).find('.ejs-image').each(function () {
                    $(this).click(function () {
                        console.log($(this).find('img'));
                        var imgElement = $(this).find('img')[0].outerHTML;
                        var template = '<div class="ejs-lightbox"><div class="ejs-lightbox-wrapper">' + imgElement + '</div><i class="fa fa-remove"></i></div>';
                        console.log(template);
                        $('body').append(template);

                        $('.ejs-lightbox>i').click(function () {
                            $(this).parent().remove();
                        });

                        $(document).keyup(function (e) {
                            if (e.keyCode === 27) {
                                var _lightbox = $('.ejs-lightbox');
                                if (_lightbox) {
                                    $(_lightbox).remove();
                                }
                            }
                        });

                    });
                });
            }

        }
    };

    var tweetProcess = {

        service: function (url, opts) {

            /**
             * To get around cross-domain issue we are using JSONP
             * to get the data from twitter.
             *
             * We are using the v1 api instead of v1.1 api as the later is
             * not properly documented
             */
            var deferred = $.Deferred();

            $.ajax({
                dataType: 'jsonp',
                url     : 'https://api.twitter.com/1/statuses/oembed.json?omit_script=true&url=' + url + '&maxwidth=' + opts.tweetOptions.maxWidth + '&hide_media=' + opts.tweetOptions.hideMedia + '&hide_thread=' + opts.tweetOptions.hideThread + '&align=' + opts.tweetOptions.align + '&lang=' + opts.tweetOptions.lang,
                success : function (data) {
                    deferred.resolve(data.html);
                },
                error   : function (data) {
                    deferred.resolve(data.status);
                }
            });
            return deferred.promise();
        },

        /**
         * A method that returns the array of matching urls to twitter posts
         * @param str
         * @returns {Array}
         */

        getMatches: function (str) {
            var tweetRegex = /https:\/\/twitter\.com\/\w+\/\w+\/\d+/gi;
            var matches = str.match(tweetRegex) ? utils.getUnique(str.match(tweetRegex)) : null;
            return matches;

        },

        embed: function (str, matches, opts) {
            var deferred = $.Deferred();

            function serviceLoop(str, matches) {
                if (matches) {
                    that.service(matches[matches.length - 1], opts).then(function (data) {
                        tweets.push(data);
                        if (matches.length > 1) {
                            matches.splice(-1, 1);
                            serviceLoop(str, matches);
                        }
                        else {
                            tweets.reverse();
                            var resultStr = str + tweets.join('');
                            deferred.resolve(resultStr);
                        }
                    });
                }
            }

            if (this.getMatches(str)) {
                var that = this;
                var tweets = [];
                serviceLoop(str, matches);

            }
            else {
                deferred.resolve(str);
            }
            return deferred.promise();
        }

    };

    var codeEmbedProcess = {
        codepenEmbed: function (rawStr, opts) {
            var codepenRegex = /http:\/\/codepen.io\/([A-Za-z0-9_]+)\/pen\/([A-Za-z0-9_]+)/gi;
            var matches;
            while ((matches = codepenRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="' + opts.codeEmbedHeight + '" src="' + matches[0].replace(/\/pen\//, '/embed/') + '/?height=' + opts.codeEmbedHeight + '"></iframe></div>';
                embedArray.push(createObject(matches.index, template));
            }
        },

        jsfiddleEmbed: function (rawStr, opts) {
            var jsfiddleRegex = /jsfiddle.net\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/gi;
            var matches;
            while ((matches = jsfiddleRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-embed ejs-jsfiddle"><iframe height="' + opts.codeEmbedHeight + '" src="http://' + matches[0] + '/embedded"></iframe></div>';
                embedArray.push(createObject(matches.index, template));

            }
        },

        jsbinEmbed: function (rawStr, opts) {
            var jsbinRegex = /jsbin.com\/[a-zA-Z0-9_]+\/[0-9_]+/gi;
            var matches;
            while ((matches = jsbinRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-jsbin ejs-embed"><iframe height="' + opts.codeEmbedHeight + '" class="jsbin-embed foo" src="http://' + matches[0] + '/embed?html,js,output">Simple Animation Tests</iframe></div>';
                embedArray.push(createObject(matches.index, template));

            }
        },

        ideoneEmbed: function (rawStr, opts) {
            var ideoneRegex = /ideone.com\/[a-zA-Z0-9]{6}/gi;
            var matches;
            while ((matches = ideoneRegex.exec(rawStr)) !== null) {

                var template = '<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/' + matches[0].split('/')[1] + '" frameborder="0" height="' + opts.codeEmbedHeight + '"></iframe></div>';
                embedArray.push(createObject(matches.index, template));

            }
        },

        plunkerEmbed: function (rawStr, opts) {
            var plnkrRegex = /plnkr.co\/edit\/[a-zA-Z0-9\?=]+/gi;
            var matches;
            while ((matches = plnkrRegex.exec(rawStr)) !== null) {

                var idMatch = (matches[0].indexOf('?') === -1) ? (matches[0].split('/')[2]) : (matches[0].split('/')[2].split('?')[0]);
                var template = '<div class="ejs-embed ejs-plunker"><iframe class="ne-plunker" src="http://embed.plnkr.co/' + idMatch + '" height="' + opts.codeEmbedHeight + '"></iframe></div>';
                embedArray.push(createObject(matches.index, template));

            }
        },

        githubGistEmbed: function (rawStr) {
            var ggRegex = /gist.github.com\/[a-zA-Z0-9_-]+\/([a-zA-Z0-9]+)/g;
            var matches;
            if (rawStr.match(ggRegex)) {
                while ((matches = ggRegex.exec(rawStr)) !== null) {
                    var m = matches;
                    var match = 'https:' + utils.toUrl(matches[0]);
                    var url = 'https://noembed.com/embed?nowrap=on&url=' + match;
                    var template = '<div class="ejs-embed ejs-github-gist" data-url="' + url + '"></div>';
                    embedArray.push(createObject(m.index, template));

                }
            }
        },

        githubGistRender: function (elem) {
            var gists = $('.ejs-github-gist');
            $(elem).find(gists).each(function () {
                var url = $(this).data('url');
                var _this = this;
                $.getJSON(url, function (d) {
                    var template = d.html;
                    $(_this).html(template);
                });
            });
        }
    };

    var mapProcess = {
        locationEmbed: function (rawStr, str, opts) {
            var locationRegex = /@\((.+)\)/gi;

            var match = rawStr.match(locationRegex) ? (rawStr.match(locationRegex)) : null;

            if (opts.locationEmbed && match) {

                str = str.replace(locationRegex, function (match) {
                    return '<span class="ejs-location">' + match.split('(')[1].split(')')[0] + '</span>';
                });

                var matches;

                while ((matches = locationRegex.exec(rawStr)) !== null) {
                    if (opts.mapOptions.mode === 'place') {
                        template = '<div class="ejs-map ejs-embed"><iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=' + opts.gdevAuthKey + '&q=' + matches[0].split('(')[1].split(')')[0] + '"></iframe></div>';
                        embedArray.push(createObject(matches.index, template));
                    }
                    else if (opts.mapOptions.mode === 'streetview' || opts.mapOptions.mode === 'view') {
                        var template = '<div class="ejs-embed ejs-streetview" data-location="' + matches[0].split('(')[1].split(')')[0] + '"></div>';
                        embedArray.push(createObject(matches.index, template));

                    }
                }
            }

            return str;
        },

        mapRender: function (elem, opts) {
            $(elem).find('.ejs-streetview').each(function () {
                var location = $(this).data('location');
                var _this = this;

                $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&sensor=false', function (d) {
                    var template;

                    var lat = d.results[0].geometry.location.lat;
                    var long = d.results[0].geometry.location.lng;

                    if (opts.mapOptions.mode === 'streetview') {
                        template = '<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/streetview?key=' + opts.gdevAuthKey + '&location=' + lat + ',' + long + '&heading=210&pitch=10&fov=35"></iframe>';
                    }

                    else {
                        template = '<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/view?key=' + opts.gdevAuthKey + '&center=' + lat + ',' + long + '&zoom=18&maptype=satellite"></iframe>';
                    }
                    $(_this).html(template);

                });
            });
        }
    };

    function _driver(elem, settings) {
        var len = elem.length;
        var deferred = $.Deferred();

        function renderText(str) {
            embedArray.sort(function (a, b) {
                return a.index - b.index;
            });

            $.each(embedArray, function (index, value) {
                embedCodeArray.push(value.embedCode);
            });
            str = str + utils.getUnique(embedCodeArray).join(' ');
            embedArray = [];
            embedCodeArray = [];
            return str;
        }

        elem.each(function (i) {
            var input = $(this).html();
            if (input === undefined || input === null) {
                return;
            }
            if (typeof input === 'object') {
                return input;
            }

            var that = this;

            var rawInput = input;

            var ifEmbed = function (serviceName) {
                return (($.inArray(serviceName, settings.excludeEmbed) == -1) && (settings.excludeEmbed !== 'all'));
            };

            input = (settings.link) ? urlEmbed(input, settings) : input;
            input = emoticonProcess.insertfontSmiley(input);
            input = emoticonProcess.insertEmoji(input);
            input = (settings.highlightCode) ? codeProcess.highlight(input) : input;
            if (settings.docEmbed) {
                docProcess.embed(rawInput, settings);
            }
            if (settings.audioEmbed) {
                audioProcess.basicEmbed(rawInput);
            }
            if (settings.basicVideoEmbed) {
                videoProcess.embedBasic(rawInput);
            }
            if (settings.imageEmbed) {
                imageProcess.embed(rawInput);
            }
            if (ifEmbed('flickr')) {
                imageProcess.flickrEmbed(rawInput, settings);
            }
            if (ifEmbed('codePen')) {
                codeEmbedProcess.codepenEmbed(rawInput, settings);
            }
            if (ifEmbed('jsFiddle')) {
                codeEmbedProcess.jsfiddleEmbed(rawInput, settings);
            }
            if (ifEmbed('jsbin')) {
                codeEmbedProcess.jsbinEmbed(rawInput, settings);
            }
            if (ifEmbed('ideone')) {
                codeEmbedProcess.ideoneEmbed(rawInput, options);
            }
            if (ifEmbed('plunker')) {
                codeEmbedProcess.plunkerEmbed(rawInput, options);
            }
            if (ifEmbed('soundcloud')) {
                audioProcess.soundCloudEmbed(rawInput, settings);
            }
            if (ifEmbed('twitchTv')) {
                videoProcess.twitchtvEmbed(rawInput, settings);
            }
            if (ifEmbed('dotSub')) {
                videoProcess.dotsubEmbed(rawInput, settings);
            }
            if (ifEmbed('dailymotion')) {
                videoProcess.dailymotionEmbed(rawInput, settings);
            }
            if (ifEmbed('vine')) {
                videoProcess.vineEmbed(rawInput, settings, elem);
            }
            if (ifEmbed('ted')) {
                videoProcess.tedEmbed(rawInput, settings);
            }
            if (ifEmbed('ustream')) {
                videoProcess.ustreamEmbed(rawInput, settings);
            }
            if (ifEmbed('liveLeak')) {
                videoProcess.liveleakEmbed(rawInput, settings);
            }
            if (ifEmbed('spotify')) {
                audioProcess.spotifyEmbed(rawInput);
            }
            if (ifEmbed('githubGist')) {
                codeEmbedProcess.githubGistEmbed(rawInput, settings);
            }
            if (settings.locationEmbed) {
                mapProcess.locationEmbed(rawInput, input, settings);
            }
            if(ifEmbed('instagram')){
                imageProcess.instagramEmbed(rawInput,settings);
            }
            input = renderText(input);

            videoProcess.embed(input, settings).then(function (d) {
                if (settings.tweetsEmbed && tweetProcess.getMatches(d)) {
                    tweetProcess.embed(d, tweetProcess.getMatches(d), settings).then(function (data) {
                        $(that).html(data);
                        $(that).css('display', 'block');
                        twttr.widgets.load(that);
                        if (i == len - 1) {
                            deferred.resolve();
                        }
                    });
                }
                else {
                    $(that).html(d);
                    $(that).css('display', 'block');
                    if (i == len - 1) {
                        deferred.resolve();
                    }
                }
            });

        });

        //mapProcess.streetview(elem, settings);

        return deferred.promise();

    }

    /* ENDS */

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function (settings, element) {

            //call beforeEmbedJSApply function
            settings.beforeEmbedJSApply();

            var selector;

            if (!settings.block) {
                selector = $(element).find(settings.embedSelector);
            } else {
                selector = $(element);
            }

            _driver(selector, settings).then(function () {

                videoProcess.play(selector, settings);
                docProcess.view(selector, settings);
                imageProcess.lightbox(selector, settings);
                codeEmbedProcess.githubGistRender(selector, settings);
                mapProcess.mapRender(selector,settings);

                if (settings.tweetsEmbed) {
                    twttr.events.bind(
                        'loaded',
                        function () {
                            settings.onTwitterShow();
                        }
                    );
                }

                /**
                 * To make the vine embedding responsive
                 */

                if ($('.ejs-vine-iframe') && settings.vineOptions.responsive) {
                    var vineResize = function () {
                        $(element).find('.ejs-vine-iframe').each(function () {

                            var $width = $(element).width() - 2;
                            var $height = (settings.vineOptions.type == 'postcard' ? ($width + 160) : $width);
                            var source = $(this).attr('src');
                            var frame = '<iframe class="ejs-vine-iframe" src="' + source + '" height="' + $height + '" width="' + $width + '"></iframe>';
                            $(this).replaceWith(frame);

                        });
                    };

                    $(window).resize(function () {
                        if (settings.vineOptions.maxWidth > $(element).width()) {
                            vineResize();
                        }
                        else if (!settings.vineOptions.maxWidth) {
                            vineResize();
                        }

                    });

                }

                settings.afterEmbedJSLApply();
            });

        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

    $.fn[pluginBlockName] = function (options) {
        options.block = true;

        return this.each(function () {
            $.data(this, 'plugin_' + pluginBlockName, new Plugin(this, options));
        });
    };

}));
