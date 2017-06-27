/*
 *  emoticons-js - v2.0.0
 *  A jQuery plugin for converting text emojis into image-based emoticons, also supporting an automatic media embedding system for multimedia URLs
 *  
 *
 *  Made by 
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

(function ($, window, document, undefined) {

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
    var pluginName = 'emoticons', options = {
        link             : true,           //Instructs the library whether or not to embed urls
        linkTarget       : '_self',        //same as the target attribute in html anchor tag . supports all html
                                           // supported target values.
        linkExclude      : [],             //Array of extensions to be excluded from converting into links
        pdfEmbed         : true,           //set true to show a preview of pdf links
        imageEmbed       : true,           //set true to embed images
        audioEmbed       : false,          //set true to embed audio
        videoEmbed       : true,           //set true to show a preview of youtube/vimeo videos with details
        basicVideoEmbed  : true,           //set true to show basic video files like mp4 etc. (supported by html5
                                           // player)
        videoWidth       : null,           //width of the video frame (in pixels)
        videoHeight      : null,           //height of the video frame (in pixels)
        gdevAuthKey      : null,           //( Mandatory ) The authorization key obtained from google's developer
                                           // console for using youtube data api and map embed api
        locationEmbed:true,
        highlightCode    : true,           //Instructs the library whether or not to highlight code syntax.
        tweetsEmbed      : true,           //Instructs the library whether or not embed the tweets
        tweetOptions     : {
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
        codepenEmbed     : true,
        codepenHeight    : 300,
        jsfiddleEmbed    : true,
        jsfiddleHeight   : 300,
        jsbinEmbed       : true,
        jsbinHeight      : 300,
        spotifyEmbed     : true,
        soundCloudEmbed  : true,
        soundCloudOptions: {
            height      : 160, themeColor: 'f50000',   //Hex Code of the player theme color
            autoPlay    : false,
            hideRelated : false,
            showComments: true,
            showUser    : true,
            showReposts : false,
            visual      : false,         //Show/hide the big preview image
            download    : false          //Show/Hide download buttons
        },
        twitchtvEmbed    : true,
        dotsubEmbed      : true,
        dailymotionEmbed : true,
        vineEmbed        : true,
        vineOptions      : {
            width: 500,
            type : 'postcard'         //'postcard' or 'simple' embedding
        },
        tedEmbed         : true,
        liveleakEmbed    : true,
        beforePdfPreview : function () {   //callback before pdf preview
        },
        afterPdfPreview  : function () {   //callback after pdf preview
        },
        onVideoShow      : function () {   // callback on video frame view
        },
        onVideoLoad      : function () {   //callback on video load (youtube/vimeo)
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

    String.prototype.trunc = function (n, useWordBoundary) {
        var toLong = this.length > n, s_ = toLong ? this.substr(0, n - 1) : this;
        s_ = useWordBoundary && toLong ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
        return toLong ? s_ + '...' : s_;
    };

    //Workaround for using indexOf function in browsers < IE8
    //to use as a fallback for indexOf in older browsers.

    var indexOf = function (arrayProp) {
        if (typeof Array.prototype.indexOf === 'function') {
            indexOf = Array.prototype.indexOf;
        }
        else {
            indexOf = function (arrayProp) {
                var i = -1, index = -1;

                for (i = 0; i < this.length; i++) {
                    if (this[i] === arrayProp) {
                        index = i;
                        break;
                    }
                }

                return index;
            };
        }

        return indexOf.call(this, arrayProp);
    };

    /**
     * Retures a new array with unique values
     *
     * @returns {Array}
     */
    Array.prototype.getUnique = function () {
        var u = {}, a = [];
        for (var i = 0, l = this.length; i < l; ++i) {
            if (u.hasOwnProperty(this[i])) {
                continue;
            }
            a.push(this[i]);
            u[this[i]] = 1;
        }
        return a;
    };

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

    function urlEmbed(str) {
        var urlRegex = /((href|src)=["']|)(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        var strReplaced = str.replace(urlRegex, function (match) {
            var extension = match.split('.')[match.split('.').length - 1];
            if (!((indexOf.call(options.linkExclude, extension) > -1))) {
                return '<a href="' + match + '" target="' + options.linkTarget + '">' + match + '</a>';
            }
            return match;
        });
        return strReplaced;
    }

    var videoTemplate = '';

    function initVideoTemplate() {
        videoTemplate = '<div class="ejs-video"><div class="ejs-video-preview">' + '        <div class="ejs-video-thumb">' + '            <img src="' + video.thumbnail + '" alt="' + video.host + '/' + video.id + '"/>' + '            <i class="fa fa-play-circle-o"></i>' + '        </div>' + '        <div class="ejs-video-detail">' + '            <div class="ejs-video-title">' + '                <a href="' + video.url + '">' + video.title + '</a>' + '            </div>' + '            <div class="ejs-video-desc">' + video.description + '            </div>' + '            <div class="ejs-video-stats">' + '                <span><i class="fa fa-eye"></i> ' + video.views + '</span>' + '                <span><i class="fa fa-heart"></i> ' + video.likes + '</span>' + '            </div>' + '        </div>' + '    </div></div>';
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

        play    : function (elem, settings) {
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
        }, embed: function (data, opts) {
            var deferred = $.Deferred();
            if (opts.videoEmbed) {
                var ytRegex = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi;
                var vimeoRegex = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)*/gi;
                var videoDimensions = this.dimensions(opts);
                var returnedData;
                if (data.match(ytRegex)) {
                    $.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + RegExp.$1 + '&key=' + opts.gdevAuthKey + '&part=snippet,statistics').success(function (d) {
                        var ytData = d.items[0];
                        video.host = 'youtube';
                        video.title = ytData.snippet.title;
                        video.thumbnail = ytData.snippet.thumbnails.medium.url;
                        video.description = (ytData.snippet.description.trunc(250, true)).replace(/\n/g, ' ').replace(/&#10;/g, ' ');
                        video.rawDescription = ytData.snippet.description;
                        video.views = ytData.statistics.viewCount;
                        video.likes = ytData.statistics.likeCount;
                        video.url = 'https://www.youtube.com/watch?v=' + RegExp.$1;
                        video.width = videoDimensions.width;
                        video.height = videoDimensions.height;
                        video.id = ytData.id;
                        initVideoTemplate();
                        data = data + videoTemplate;
                        returnedData = data;
                        deferred.resolve(returnedData);

                    });
                }
                else if (data.match(vimeoRegex)) {
                    $.getJSON('https://vimeo.com/api/v2/video/' + RegExp.$3 + '.json').success(function (d) {

                        video.host = 'vimeo';
                        video.title = d[0].title;
                        video.rawDescription = (d[0].description).replace(/\n/g, '<br/>').replace(/&#10;/g, '<br/>');
                        video.description = (d[0].description).replace(/((<|&lt;)br\s*\/*(>|&gt;)\r\n)/g, ' ').trunc(250, true);
                        video.thumbnail = d[0].thumbnail_medium;
                        video.views = d[0].stats_number_of_plays;
                        video.likes = d[0].stats_number_of_likes;
                        video.url = d[0].url;
                        video.width = videoDimensions.width;
                        video.height = videoDimensions.height;
                        video.id = d[0].id;
                        initVideoTemplate();
                        returnedData = data + videoTemplate;
                        deferred.resolve(returnedData);

                    });
                }
                else {
                    deferred.resolve(data);
                }
            }
            else {
                deferred.resolve(data);
            }
            return deferred.promise();

        },

        embedBasic: function (rawStr, str) {
            var basicVideoRegex = /((?:https?):\/\/\S*\.(?:ogv|webm|mp4))/gi;

            if (rawStr.match(basicVideoRegex)) {
                var template = '<div class="ejs-video"><div class="ejs-video-player"><div class="player"><video src="' + RegExp.$1 + '" controls></video></div></div></div>';
                str = str + template;
            }
            return str;
        },

        twitchtvEmbed: function (rawStr, str, opts) {
            var twitchRegex = /www.twitch.tv\/[a-zA_Z0-9_]+/gi;
            var matches = rawStr.match(twitchRegex) ? rawStr.match(twitchRegex).getUnique() : null;
            var videoDimensions = this.dimensions(opts);
            if (matches) {
                var i = 0;
                while (i < matches.length) {
                    str = str + '<div class="ejs-video"><object bgcolor="#000000" data="//www-cdn.jtvnw.net/swflibs/TwitchPlayer.swf" height="' + videoDimensions.height + '" id="clip_embed_player_flash" type="application/x-shockwave-flash" width="' + videoDimensions.width + '">' + '<param name="movie" value="http://www-cdn.jtvnw.net/swflibs/TwitchPlayer.swf" />' + '<param name="allowScriptAccess" value="always" />' + '<param name="allowNetworking" value="all" />' + '<param name="allowFullScreen" value="true" />' + '<param name="flashvars" value="channel=' + matches[i].split('/')[1] + '&auto_play=false" />' + '</object></div>';
                    i++;
                }
            }
            return str;
        },

        dotsubEmbed: function (rawStr, str, opts) {
            var dotsubRegex = /dotsub.com\/view\/[a-zA-Z0-9-]+/gi;
            var matches = rawStr.match(dotsubRegex) ? rawStr.match(dotsubRegex).getUnique() : null;
            var videoDimensions = this.dimensions(opts);
            if (matches) {
                var i = 0;
                while (i < matches.length) {
                    str = str + '<div class="ejs-video"><iframe src="https://dotsub.com/media/' + matches[i].split('/')[2] + '/embed/" width="' + videoDimensions.width + '" height="' + videoDimensions.height + '"></iframe></div>'
                    i++;
                }
            }
            return str;
        },

        dailymotionEmbed: function (rawStr, str, opts) {
            var dmRegex = /dailymotion.com\/video\/[a-zA-Z0-9-_]+/gi;
            var matches = rawStr.match(dmRegex) ? rawStr.match(dmRegex).getUnique() : null;
            var videoDimensions = this.dimensions(opts);
            if (matches) {
                var i = 0;
                while (i < matches.length) {
                    str = str + '<div class="ejs-video"><iframe src="http://www.dailymotion.com/embed/video/' + matches[i].split('/')[2] + '" height="' + videoDimensions.height + '" width="' + videoDimensions.width + '"></iframe></div>'
                    i++;
                }
            }
            return str;
        },

        vineEmbed: function (rawStr, str, opts) {
            var vineRegex = /vine.co\/v\/[a-zA-Z0-9]+/gi;
            var matches = rawStr.match(vineRegex) ? rawStr.match(vineRegex).getUnique() : null;
            if (matches) {
                var i = 0;
                while (i < matches.length) {
                    str = str + '<div class="ejs-vine"><iframe src="https://vine.co/v/' + matches[i].split('/')[2] + '/embed/' + opts.vineOptions.type + '" height="' + (opts.vineOptions.type == 'postcard' ? (opts.vineOptions.width + 158) : opts.vineOptions.width) + '" width="' + opts.vineOptions.width + '"></iframe></div>'
                    i++;
                }
            }
            return str;
        },

        tedEmbed     : function (rawStr, str, opts) {
            var tedRegex = /ted.com\/talks\/[a-zA-Z0-9_]+/gi;
            var matches = rawStr.match(tedRegex) ? rawStr.match(tedRegex).getUnique() : null;
            var videoDimensions = this.dimensions(opts);
            if (matches) {
                var i = 0;
                while (i < matches.length) {
                    str = str + '<div class="ejs-embed"><iframe src="http://embed.ted.com/talks/' + matches[i].split('/')[2] + '.html" ' +
                    'height="' + videoDimensions.height + '" width="' + videoDimensions.width + '"></iframe></div>';
                    i++;
                }
            }
            return str;
        },
        liveleakEmbed: function (rawStr, str, opts) {
            var liveleakRegex = /liveleak.com\/view\?i=[a-zA-Z0-9_]+/gi;
            var matches = rawStr.match(liveleakRegex) ? rawStr.match(liveleakRegex) : null;
            var videoDimensions = this.dimensions(opts);
            if (matches) {
                var i = 0;
                while (i < matches.length) {
                    str = str + '<div class="ejs-video"><iframe src="http://www.liveleak.com/e/' + matches[i].split('=')[1] + '" height="' + videoDimensions.height + '" width="' + videoDimensions.width + '"></iframe></div>';
                    i++;
                }
            }
            return str;
        }
    };

    var pdfProcess = {
        embed: function (rawStr, str) {
            var p = /((?:https?):\/\/\S*\.(?:pdf|PDF))/gi;
            if (rawStr.match(p)) {
                var pdfUrl = RegExp.$1;
                var pdfTemplate = '<div class="ejs-pdf"><div class="ejs-pdf-preview"><div class="ejs-pdf-icon"><i class="fa fa-file-pdf-o"></i></div><div class="ejs-pdf-detail" ><div class="ejs-pdf-title"> <a href="">' + pdfUrl + '</a></div> <div class="ejs-pdf-view"> <button><i class="fa fa-download"></i> <a href="' + pdfUrl + '" target="_blank">Download</a></button> <button class="ejs-pdf-view-active"><i class="fa fa-eye"></i> View PDF</button></div> </div> </div></div>';
                str = str + pdfTemplate;

            }
            return str;
        },

        view: function (elem, settings) {
            $(elem).on('click', '.ejs-pdf-view-active', function (e) {
                //calling the function before pdf is shown

                settings.beforePdfPreview();

                var self = this;

                var pdfParent = $(self).closest('.ejs-pdf');
                var pdfUrl = $(pdfParent).find('a')[1].href;
                var pdfViewTemplate = ' <div class="ejs-pdf-viewer"><iframe src="' + pdfUrl + '" frameBorder="0"></iframe></div>';
                pdfParent.html(pdfViewTemplate);

                //calling the function after the pdf is shown.

                settings.afterPdfPreview();
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
                return;
            }
            var that = this;
            text = text.replace(/(`+)(\s|[a-z]+)\s*([\s\S]*?[^`])\s*\1(?!`)/gm, function (wholeMatch, m1, m2, m3) {
                var c = m3;
                c = c.replace(/^([ \t]*)/g, ""); // leading whitespace
                c = c.replace(/[ \t]*$/g, ""); // trailing whitespace
                c = that.encodeCode(c);
                c = c.replace(/:\/\//g, "~P"); // to prevent auto-linking. Not necessary in code
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
        basicEmbed: function (rawStr, str) {
            var a = /((?:https?):\/\/\S*\.(?:wav|mp3|ogg))/gi;
            if (rawStr.match(a)) {
                var audioTemplate = '<div class="ejs-audio"><audio src="' + RegExp.$1 + '" controls></audio></div>';
                str = str + audioTemplate;
            }
            return str;
        },

        soundCloudEmbed: function (rawStr, str, opts) {
            var scRegex = /soundcloud.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+/gi;
            var matches = rawStr.match(scRegex) ? rawStr.match(scRegex).getUnique() : null;
            if (matches) {
                var i = 0;
                while (i < matches.length) {
                    var scTemplate = '<div class="ejs-embed"><iframe height="160" scrolling="no" ' + 'src="https://w.soundcloud.com/player/?url=https://' + matches[i] + '&auto_play=' + opts.soundCloudOptions.autoPlay + '&hide_related=' + opts.soundCloudOptions.hideRelated + '&show_comments=' + opts.soundCloudOptions.showComments + '&show_user=' + opts.soundCloudOptions.showUser + '&show_reposts=' + opts.soundCloudOptions.showReposts + '&visual=' + opts.soundCloudOptions.visual + '&download=' + opts.soundCloudOptions.download + '&color=' + opts.soundCloudOptions.themeColor + '&theme_color=' + opts.soundCloudOptions.themeColor + '"></iframe></div>';
                    str = str + scTemplate;
                    i++;
                }
            }
            return str;
        },

        spotifyEmbed: function (rawStr, str, opts) {
            var spotifyRegex = /spotify.com\/track\/[a-zA-Z0-9_]+/gi;
            var matches = rawStr.match(spotifyRegex) ? rawStr.match(spotifyRegex).getUnique() : null;
            if (matches) {
                var i = 0;
                while (i < matches.length) {
                    str = str + '<div class="ejs-embed"><iframe src="https://embed.spotify.com/?uri=spotify:track:' + matches[i].split('/')[2] + '" height="80"></iframe></div>';
                    i++;
                }
            }
            return str;
        }

    };

    var imageProcess = {
        embed: function (rawStr, str) {
            var i = /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi;
            if (rawStr.match(i)) {
                var template = '<div class="ejs-image"><div class="ne-image-wrapper"><img src="' + RegExp.$1 + '"/></div></div>';
                str = str + template;
            }
            return str;
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
            var matches = str.match(tweetRegex) ? (str.match(tweetRegex)).getUnique() : null;
            return matches;

        },

        embed: function (str, matches, opts) {
            var deferred = $.Deferred();
            var that = this;
            var tweets = [];

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

            if (opts.tweetsEmbed) {
                if (!window.twttr) {
                    throw new ReferenceError('twttr is not defined. Load twitter widget javascript file from http://platform.twitter.com/widgets.js');
                }
                serviceLoop(str, matches);
            }
            else {
                deferred.resolve(str);
            }
            return deferred.promise();
        }

    };

    var codeEmbedProcess = {
        codepenEmbed: function (rawStr, str, opts) {
            var codepenRegex = /http:\/\/codepen.io\/([A-Za-z0-9_]+)\/pen\/([A-Za-z0-9_]+)/gi;
            var matches = rawStr.match(codepenRegex) ? rawStr.match(codepenRegex).getUnique() : null;
            if (matches) {
                var i = 0;
                while (i < matches.length) {
                    str = str + '<div class="ejs-embed ejs-codepen"><iframe scrolling="no" height="' + opts.codepenHeight + '" src="' + matches[i].replace(/\/pen\//, '/embed/') + '/?height=' + opts.codepenHeight + '" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe></div>';
                    i++;
                }
            }
            return str;
        },

        jsfiddleEmbed: function (rawStr, str, opts) {
            var jsfiddleRegex = /jsfiddle.net\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/gi;
            var matches = rawStr.match(jsfiddleRegex) ? rawStr.match(jsfiddleRegex).getUnique() : null;
            if (matches) {
                var i = 0;
                while (i < matches.length) {
                    str = str + '<div class="ejs-embed ejs-jsfiddle"><iframe height="' + opts.jsfiddleHeight + '" src="http://' + matches[i] + '/embedded"></iframe></div>';
                    i++;
                }
            }
            return str;
        },

        jsbinEmbed: function (rawStr, str, opts) {
            var jsbinRegex = /jsbin.com\/[a-zA-Z0-9_]+\/[0-9_]+/gi;
            var matches = rawStr.match(jsbinRegex) ? rawStr.match(jsbinRegex).getUnique() : null;
            if (matches) {
                var i = 0;
                while (i < matches.length) {
                    str = str + '<div class="ejs-jsbin ejs-embed"><iframe height="' + opts.jsbinHeight + '" class="jsbin-embed foo" src="http://' + matches[i] + '/embed?html,js,output">Simple Animation Tests</iframe></div>';
                    i++;
                }
            }
            return str;
        }
    };

    var mapProcess={
        locationEmbed:function(rawStr,str,opts){
            var locationRegex=/@\((.+)\)/gi;
            var matches=rawStr.match(locationRegex)?rawStr.match(locationRegex).getUnique():null;
            if(matches){
                var i=0;
                while(i<matches.length){
                    str=str+'<div class="ejs-map ejs-embed"><iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key='+opts.gdevAuthKey + '&q='+matches[i].split('(')[1].split(')')[0]+'"></iframe></div>';
                    i++;
                }
            }
            return str;
        }
    }

    function _driver(elem, settings) {
        elem.each(function () {
            var input = $(this).html();
            if (input === undefined || input === null) {
                return;
            }
            if (typeof input === 'object') {
                return input;
            }

            var that = this;

            var rawInput = input;

            input = (settings.link) ? urlEmbed(input) : input;
            input = emoticonProcess.insertfontSmiley(input);
            input = emoticonProcess.insertEmoji(input);
            input = (settings.pdfEmbed) ? pdfProcess.embed(rawInput, input) : input;
            input = (settings.audioEmbed) ? audioProcess.basicEmbed(rawInput, input) : input;
            input = (settings.highlightCode) ? codeProcess.highlight(input) : input;
            input = (settings.basicVideoEmbed) ? videoProcess.embedBasic(rawInput, input) : input;
            input = (settings.imageEmbed) ? imageProcess.embed(rawInput, input) : input;
            input = (settings.codepenEmbed) ? codeEmbedProcess.codepenEmbed(rawInput, input, settings) : input;
            input = (settings.jsfiddleEmbed) ? codeEmbedProcess.jsfiddleEmbed(rawInput, input, settings) : input;
            input = (settings.jsbinEmbed) ? codeEmbedProcess.jsbinEmbed(rawInput, input, settings) : input;
            input = (settings.soundCloudEmbed) ? audioProcess.soundCloudEmbed(rawInput, input, settings) : input;
            input = (settings.twitchtvEmbed) ? videoProcess.twitchtvEmbed(rawInput, input, settings) : input;
            input = (settings.dotsubEmbed) ? videoProcess.dotsubEmbed(rawInput, input, settings) : input;
            input = (settings.dailymotionEmbed) ? videoProcess.dailymotionEmbed(rawInput, input, settings) : input;
            input = (settings.vineEmbed) ? videoProcess.vineEmbed(rawInput, input, settings) : input;
            input = (settings.tedEmbed) ? videoProcess.tedEmbed(rawInput, input, settings) : input;
            input = (settings.liveleakEmbed) ? videoProcess.liveleakEmbed(rawInput, input, settings) : input;
            input = (settings.spotifyEmbed) ? audioProcess.spotifyEmbed(rawInput, input, settings) : input;
            input=(settings.locationEmbed)?mapProcess.locationEmbed(rawInput,input,settings):input;

            videoProcess.embed(input, settings).then(function (d) {
                if (tweetProcess.getMatches(d)) {
                    tweetProcess.embed(d, tweetProcess.getMatches(input), settings).then(function (data) {
                        $(that).html(data);
                        $(that).css('display', 'block');
                        if (settings.tweetsEmbed)twttr.widgets.load();
                    });
                }
                else {
                    $(that).html(d);
                    $(that).css('display', 'block');
                }
            });

        });

        videoProcess.play(elem, settings);
        pdfProcess.view(elem, settings);

    }

    /* ENDS */

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function (settings, element) {
            _driver($(element).find('div'), settings);
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

})(jQuery, window, document);
