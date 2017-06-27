/* zuck.js - https://github.com/ramon82/zuck.js */
window['ZuckitaDaGalera'] = window['Zuck'] = function(timeline, options) {
    'use strict';

    var d = document,
        zuck = this;

    if (typeof timeline == 'string') {
        timeline = d.getElementById(timeline);
    }


    /* core functions */
    var q = function(query) {
            return d.querySelectorAll(query)[0];
        },
        g = function(array, what) {
            if (array) {
                return array[what] || '';
            } else {
                return '';
            }
        },
        each = function(arr, func) {
            if (arr) {
                var total = arr.length;

                for (var i = 0; i < total; i++) {
                    func(i, arr[i]);
                }
            }
        },
        setVendorVariable = function(ref, variable, value) {
            var variables = [variable.toLowerCase(), 'webkit' + variable, 'MS' + variable, 'o' + variable];

            each(variables, function(i, val) {
                ref[val] = value;
            });
        },
        addVendorEvents = function(el, func, event) {
            var events = [event.toLowerCase(), 'webkit' + event, 'MS' + event, 'o' + event];
            var element = el;

            each(events, function(i, val) {
                el.addEventListener(val, func, false);
            });
        },
        onAnimationEnd = function(el, func) {
            addVendorEvents(el, func, 'AnimationEnd');
        },
        onTransitionEnd = function(el, func) {
            if (!el.transitionEndEvent) {
                el.transitionEndEvent = true;

                addVendorEvents(el, func, 'TransitionEnd');
            }
        },
        prepend = function(parent, child) {
            if (parent.firstChild) {
                parent.insertBefore(child, parent.firstChild);
            } else {
                parent.appendChild(child);
            }
        },
        getElIndex = function(el) {
            for (var i = 1; el = el.previousElementSibling; i++) {
                return i;
            }

            return 0;
        },
        fullScreen = function(elem, cancel) {
            var func = 'RequestFullScreen';
            var elFunc = 'requestFullScreen'; //crappy vendor prefixes.

            if (cancel) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            } else {
                try {
                    if (elem[elFunc]) {
                        elem[elFunc]();
                    } else if (elem['ms' + func]) {
                        elem['ms' + func]();
                    } else if (elem['moz' + func]) {
                        elem['moz' + func]();
                    } else if (elem['webkit' + func]) {
                        elem['webkit' + func]();
                    }
                } catch (e) {

                }
            }
        },
        translate = function(element, to, duration, ease) {
            var direction = (to>0)?1:-1;
            var to3d = (Math.abs(to) / q('#zuck-modal').offsetWidth * 90) * direction;

            if(option('cubeEffect')){
                var scaling = (to3d==0)?'scale(0.95)':'scale(0.930,0.930)';

                setVendorVariable(q('#zuck-modal-content').style, 'Transform', scaling);

                if(to3d < -90 || to3d > 90){
                    return false;
                }
            }

            var transform = (!option('cubeEffect'))?'translate3d(' + to + 'px, 0, 0)':'rotateY('+(to3d)+'deg)';

            if (element) {
                setVendorVariable(element.style, 'TransitionTimingFunction', ease);
                setVendorVariable(element.style, 'TransitionDuration', duration + 'ms');
                setVendorVariable(element.style, 'Transform', transform);
            }
        },
        findPos = function(obj, offsetY, offsetX, stop) {
            var curleft = 0,
                curtop = 0;

            if (obj) {
                if (obj.offsetParent) {
                    do {
                        curleft += obj.offsetLeft;
                        curtop += obj.offsetTop;

                        if (obj == stop) {
                            break;
                        }
                    } while (obj = obj.offsetParent);
                }

                if (offsetY) {
                    curtop = curtop - offsetY;
                }

                if (offsetX) {
                    curleft = curleft - offsetX;
                }
            }

            return [curleft, curtop];
        },
        timeAgo = function(date_str) {
            date_str = Number(date_str) * 1000;

            var lang = option('language', 'time');
            var time_formats = [
                [60, lang['seconds'], 1], // 60
                [120, '1' + lang['minute'], ''], // 60*2
                [3600, lang['minutes'], 60], // 60*60, 60
                [7200, '1' + lang['hour'], ''], // 60*60*2
                [86400, lang['hours'], 3600], // 60*60*24, 60*60
                [172800, lang['yesterday'], ''], // 60*60*24*2
                [604800, lang['days'], 86400]
            ];

            var time = ('' + date_str).replace(/-/g, "/").replace(/[TZ]/g, " ").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            if (time.substr(time.length - 4, 1) == ".") {
                time = time.substr(0, time.length - 4);
            }

            if (isNaN(new Date(time).getDate())) {
                time = date_str;
            }

            var seconds = (new Date - new Date(time)) / 1000;
            var token = lang['ago'],
                list_choice = 1;
            if (seconds < 0) {
                seconds = Math.abs(seconds);
                token = lang['ago'];
                list_choice = 2;
            }

            var i = 0,
                format;
            while (format = time_formats[i++]) {
                if (seconds < format[0]) {
                    if (typeof format[2] == 'string') {
                        return format[list_choice];
                    } else {
                        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
                    }
                }
            }

            return time;
        };


    /* options */
    var id = timeline.id,
        optionsDefault = {
            'skin': 'snapgram',
            'avatars': true,
            'stories': [],
            'backButton': true,
            'backNative': false,
            'autoFullScreen': false,
            'openEffect': true,
            'cubeEffect': false,
            'list': false,
            'localStorage': true,
            'callbacks': {
                'onOpen': function(storyId, callback) {

                    callback();
                },

                'onView': function(storyId) {

                },

                'onEnd': function(storyId, callback) {

                    callback();
                },

                'onClose': function(storyId, callback) {
                    callback();
                },

                'onNextItem': function(storyId, nextStoryId, callback) {
                    callback();
                },
            },
            'language': {
                'unmute': 'Touch to unmute',
                'keyboardTip': 'Press space to see next',
                'visitLink': 'Visit link',
                'time': {
                    'ago': 'ago',
                    'hour': 'hour',
                    'hours': 'hours',
                    'minute': 'minute',
                    'minutes': 'minutes',
                    'fromnow': 'from now',
                    'seconds': 'seconds',
                    'yesterday': 'yesterday',
                    'tomorrow': 'tomorrow',
                    'days': 'days'
                }
            }
        },
        option = function(name, prop) {
            var type = function(what) {
                return (typeof what !== 'undefined');
            };

            if (prop) {
                if (type(options[name])) {
                    return (type(options[name][prop])) ? options[name][prop] : optionsDefault[name][prop];
                } else {
                    return optionsDefault[name][prop];
                }
            } else {
                return (type(options[name])) ? options[name] : optionsDefault[name];
            }
        };


    /* modal */
    var zuckModal = function() {
        var opened = false;
        var modalContainer = g('#zuck-modal');

        if (!modalContainer) {
            modalContainer = d.createElement('div');
            modalContainer.id = 'zuck-modal';

            if(option('cubeEffect')){
                modalContainer.className = 'with-cube';
            }

            modalContainer.innerHTML = '<div id="zuck-modal-content"></div>';
            modalContainer.style.display = 'none';

            modalContainer.setAttribute('tabIndex', '1');
            modalContainer.onkeyup = function(e) {
                var code = e.keyCode;

                if (code == 27) {
                    modal.close();
                } else if (code == 13 || code == 32) {
                    modal.next();
                }
            };

            if (option('openEffect')) {
                modalContainer.classList.add('with-effects');
            };

            onTransitionEnd(modalContainer, function() {
                if (modalContainer.classList.contains('closed')) {
                    modalContent.innerHTML = '';
                    modalContainer.style.display = 'none';
                    modalContainer.classList.remove('closed');
                    modalContainer.classList.remove('animated');
                }
            });

            d.body.appendChild(modalContainer);
        }

        var modalContent = q('#zuck-modal-content');
        var moveStoryItem = function(direction) {
            var target = '';
            var useless = '';
            var transform = '0';
            var modalSlider = q('#zuck-modal-slider-' + id);

            var slideItems = {
                'previous': q('#zuck-modal .story-viewer.previous'),
                'next': q('#zuck-modal .story-viewer.next'),
                'viewing': q('#zuck-modal .story-viewer.viewing')
            };

            if ((!slideItems['previous'] && !direction) || (!slideItems['next'] && direction)) {
                return false;
            }

            if (!direction) {
                target = 'previous';
                useless = 'next';
            } else {
                target = 'next';
                useless = 'previous';
            }


            var transitionTime = 600;
            if(option('cubeEffect')){
                if(target=='previous'){
                    transform = modalContainer.slideWidth;
                } else if(target=='next'){
                    transform = modalContainer.slideWidth * -1;
                }

            } else {
                transform = findPos(slideItems[target]);
                transform = transform[0] * -1;
            }

            translate(modalSlider, transform, transitionTime, null);

            setTimeout(function() {
                if (target != '' && slideItems[target] && useless != '') {
                    var currentStory = slideItems[target].getAttribute('data-story-id');
                    zuck.internalData['currentStory'] = currentStory;

                    var oldStory = q('#zuck-modal .story-viewer.' + useless);
                    if (oldStory) {
                        oldStory.parentNode.removeChild(oldStory);
                    }

                    if (slideItems['viewing']) {
                        slideItems['viewing'].classList.add('stopped');
                        slideItems['viewing'].classList.add(useless);
                        slideItems['viewing'].classList.remove('viewing');
                    }

                    if (slideItems[target]) {
                        slideItems[target].classList.remove('stopped');
                        slideItems[target].classList.remove(target);
                        slideItems[target].classList.add('viewing');
                    }

                    var newStoryData = getStoryMorningGlory(target);
                    if (newStoryData) {
                        createStoryViewer(newStoryData, target);
                    }

                    var storyId = zuck.internalData['currentStory'];
                    var items = q('#zuck-modal [data-story-id="' + storyId + '"]');

                    if(items){
                        items = items.querySelectorAll('[data-index].active');
                        var duration = items[0].firstElementChild;

                        zuck.data[storyId]['currentItem'] = parseInt(items[0].getAttribute('data-index'), 10);

                        items[0].innerHTML = '<b style="' + duration.style.cssText + '"></b>';
                        onAnimationEnd(items[0].firstElementChild, function() {
                            zuck.nextItem(false);
                        });
                    }

                    translate(modalSlider, '0', 0, null);

                    if(items){
                        playVideoItem([items[0], items[1]], true);
                    }

                    option('callbacks', 'onView')(zuck.internalData['currentStory']);
                }
            }, transitionTime + 50);
        };

        var createStoryViewer = function(storyData, className, forcePlay) {
                var modalSlider = q('#zuck-modal-slider-' + id);

                var htmlItems = '',
                    pointerItems = '',
                    storyId = g(storyData, 'id'),
                    slides = d.createElement('div'),
                    currentItem = g(storyData, 'currentItem') || 0,
                    exists = q('#zuck-modal .story-viewer[data-story-id="' + storyId + '"]'),
                    currentItemTime = '';

                if (exists) {
                    return false;
                }

                slides.className = 'slides';
                each(g(storyData, 'items'), function(i, item) {
                    if (currentItem > i) {
                        storyData['items'][i]['seen'] = true;
                        item['seen'] = true;
                    }

                    var length = g(item, 'length');
                    var linkText = g(item, 'linkText');
                    var seenClass = ((g(item, 'seen') === true) ? 'seen' : '');
                    var commonAttrs = 'data-index="' + i + '" data-item-id="' + g(item, 'id') + '"';

                    if (currentItem === i) {
                        currentItemTime = timeAgo(g(item, 'time'));
                    }

                    pointerItems += '<span ' + commonAttrs + ' class="' + ((currentItem === i) ? 'active' : '') + ' ' + seenClass + '"><b style="animation-duration:' + ((length === '') ? '3' : length) + 's"></b></span>';
                    htmlItems += '<div data-time="' + g(item, 'time') + '" data-type="' + g(item, 'type') + '"' + commonAttrs + ' class="item ' + seenClass +
                        ' ' + ((currentItem === i) ? 'active' : '') + '">' +
                        ((g(item, 'type') === 'video') ? '<video class="media" muted webkit-playsinline playsinline preload="auto" src="' + g(item, 'src') + '" ' + g(item, 'type') + '></video><b class="tip muted">' + option('language', 'unmute') + '</b>' : '<img class="media" src="' + g(item, 'src') + '" ' + g(item, 'type') + '>') +
                        ((g(item, 'link')) ? '<a class="tip link" href="' + g(item, 'link') + '" rel="noopener" target="_blank">' + ((linkText == '') ? option('language', 'visitLink') : linkText) + '</a>' : '') +
                        '</div>';
                });
                slides.innerHTML = htmlItems;

                var video = slides.querySelector('video');
                var addMuted = function(video) {
                    if (video.muted) {
                        storyViewer.classList.add('muted');
                    } else {
                        storyViewer.classList.remove('muted');
                    }
                };

                if (video) {
                    video.onwaiting = function(e) {
                        if (video.paused) {
                            storyViewer.classList.add('paused');
                            storyViewer.classList.add('loading');
                        }
                    };

                    video.onplay = function() {
                        addMuted(video);

                        storyViewer.classList.remove('stopped');
                        storyViewer.classList.remove('paused');
                        storyViewer.classList.remove('loading');
                    };

                    video.onready = video.onload = video.onplaying = video.oncanplay = function() {
                        addMuted(video);

                        storyViewer.classList.remove('loading');
                    };

                    video.onvolumechange = function() {
                        addMuted(video);
                    };
                }

                var storyViewer = d.createElement('div');
                storyViewer.className = 'story-viewer muted ' + className + ' ' + ((!forcePlay) ? 'stopped' : '') + ' ' + ((option('backButton')) ? 'with-back-button' : '');
                storyViewer.setAttribute('data-story-id', storyId);

                var html = '<div class="head">' +
                    '<div class="left">' +
                    ((option('backButton')) ? '<a class="back">&lsaquo;</a>' : '') +
                    '<u class="img" style="background-image:url(' + g(storyData, 'photo') + ');"></u>' +
                    '<div>' +
                    '<strong>' + g(storyData, 'name') + '</strong>' +
                    '<span class="time">' + currentItemTime + '</span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="right">' +
                    '<span class="time">' + currentItemTime + '</span>' +
                    '<span class="loading"></span>' +
                    '<a class="close" tabIndex="2">&times;</a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="slides-pointers"><div>' + pointerItems + '</div></div>';
                storyViewer.innerHTML = html;

                each(storyViewer.querySelectorAll('.close, .back'), function(i, el) {
                    el.onclick = function(e) {
                        e.preventDefault();
                        modal.close();
                    };
                });


                storyViewer.appendChild(slides);

                if (className == 'viewing') {
                    playVideoItem(storyViewer.querySelectorAll('[data-index="' + currentItem + '"].active'), false);
                }

                each(storyViewer.querySelectorAll('.slides-pointers [data-index] > b'), function(i, el) {
                    onAnimationEnd(el, function() {
                        zuck.nextItem(false);
                    });
                });

                if (className == 'previous') {
                    prepend(modalSlider, storyViewer);
                } else {
                    modalSlider.appendChild(storyViewer);
                }
            },
            createStoryTouchEvents = function(modalSliderElement) {
                var enableMouseEvents = true;

                var modalSlider = modalSliderElement;
                var position = {};
                var touchOffset, isScrolling, delta, timer, nextTimer;

                var touchStart = function(event) {
                    var storyViewer = q('#zuck-modal .viewing');

                    if (event.target.nodeName == 'A') {
                        return true;
                    } else {
                        event.preventDefault();
                    }

                    var touches = event.touches ? event.touches[0] : event;
                    var pos = findPos(q('#zuck-modal .story-viewer.viewing'));

                    modalContainer.slideWidth = q('#zuck-modal .story-viewer').offsetWidth;
                    position = {
                        x: pos[0],
                        y: pos[1]
                    };

                    var pageX = touches.pageX;
                    var pageY = touches.pageY;

                    touchOffset = {
                        x: pageX,
                        y: pageY,
                        time: Date.now()
                    };

                    isScrolling = undefined;
                    delta = {};

                    if (enableMouseEvents) {
                        modalSlider.addEventListener('mousemove', touchMove);
                        modalSlider.addEventListener('mouseup', touchEnd);
                        modalSlider.addEventListener('mouseleave', touchEnd);
                    }
                    modalSlider.addEventListener('touchmove', touchMove);
                    modalSlider.addEventListener('touchend', touchEnd);

                    if(storyViewer){
                        storyViewer.classList.add('paused');
                    }
                    pauseVideoItem();

                    timer = setTimeout(function() {
                        storyViewer.classList.add('longPress');
                    }, 600);

                    nextTimer = setTimeout(function() {
                        clearInterval(nextTimer);
                        nextTimer = false;
                    }, 250);
                };

                var touchMove = function(event) {
                    var touches = event.touches ? event.touches[0] : event;
                    var pageX = touches.pageX;
                    var pageY = touches.pageY;

                    if (touchOffset) {
                        delta = {
                            x: pageX - touchOffset.x,
                            y: pageY - touchOffset.y
                        };

                        if (typeof isScrolling === 'undefined') {
                            isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
                        }

                        if (!isScrolling && touchOffset) {
                            event.preventDefault();
                            translate(modalSlider, (position.x + delta.x), 0, null);
                        }
                    }
                };

                var touchEnd = function(event) {
                    var storyViewer = q('#zuck-modal .viewing');

                    if (delta) {
                        var slidesLength = d.querySelectorAll('#zuck-modal .story-viewer').length;
                        var duration = touchOffset ? Date.now() - touchOffset.time : undefined;
                        var isValid = Number(duration) < 300 && Math.abs(delta.x) > 25 || Math.abs(delta.x) > modalContainer.slideWidth / 3;
                        var direction = delta.x < 0;

                        var index = (direction) ? q('#zuck-modal .story-viewer.next') : q('#zuck-modal .story-viewer.previous');
                        var isOutOfBounds = (direction && !index) || (!direction && !index);

                        if (!isScrolling) {
                            if (isValid && !isOutOfBounds) {
                                moveStoryItem(direction, true);
                            } else {
                                translate(modalSlider, position.x, 300);
                            }
                        }

                        touchOffset = undefined;

                        if (enableMouseEvents) {
                            modalSlider.removeEventListener('mousemove', touchMove);
                            modalSlider.removeEventListener('mouseup', touchEnd);
                            modalSlider.removeEventListener('mouseleave', touchEnd);
                        }
                        modalSlider.removeEventListener('touchmove', touchMove);
                        modalSlider.removeEventListener('touchend', touchEnd);
                    }

                    var video = zuck.internalData['currentVideoElement'];
                    if (timer) {
                        clearInterval(timer);
                    }

                    if(storyViewer){
                        storyViewer.classList.remove('longPress');
                        storyViewer.classList.remove('paused');
                    }

                    if (nextTimer) {
                        clearInterval(nextTimer);
                        nextTimer = false;

                        var storyViewer = q('#zuck-modal .viewing');
                        if (storyViewer && video) {
                            if(storyViewer.classList.contains('muted')){
                                unmuteVideoItem(video, storyViewer);
                            } else {
                                zuck.nextItem(event);
                            }
                        } else {
                            zuck.nextItem(event);

                            return false;
                        }
                    }
                };

                modalSlider.addEventListener('touchstart', touchStart);

                if (enableMouseEvents) {
                    modalSlider.addEventListener('mousedown', touchStart);
                }
            };

        return {
            'show': function(storyId, page) {
                var callback = function() {
                    modalContent.innerHTML = '<div id="zuck-modal-slider-' + id + '" class="slider"></div>';

                    var storyData = zuck.data[storyId];
                    var currentItem = storyData['currentItem'] || 0;
                    var modalSlider = q('#zuck-modal-slider-' + id);

                    createStoryTouchEvents(modalSlider);

                    zuck.internalData['currentStory'] = storyId;
                    storyData['currentItem'] = currentItem;

                    if (option('backNative')) {
                        location.hash = '#!' + id;
                    }

                    var previousItemData = getStoryMorningGlory('previous');
                    if (previousItemData) {
                        createStoryViewer(previousItemData, 'previous');
                    }

                    createStoryViewer(storyData, 'viewing', true);

                    var nextItemData = getStoryMorningGlory('next');
                    if (nextItemData) {
                        createStoryViewer(nextItemData, 'next');
                    }

                    if (option('autoFullScreen')) {
                        modalContainer.classList.add('fullscreen');
                    }

                    var tryFullScreen = function() {
                        if (modalContainer.classList.contains('fullscreen') && option('autoFullScreen') && window.screen.width <= 1024) {
                            fullScreen(modalContainer);
                        }

                        modalContainer.focus();
                    };

                    if (option('openEffect')) {
                        var storyEl = q('#' + id + ' [data-id="' + storyId + '"] .img');
                        var pos = findPos(storyEl);

                        modalContainer.style.marginLeft = (pos[0] + (storyEl.offsetWidth / 2)) + 'px';
                        modalContainer.style.marginTop = pos[1] + (storyEl.offsetHeight / 2) + 'px';

                        modalContainer.style.display = 'block';

                        modalContainer.slideWidth = q('#zuck-modal .story-viewer').offsetWidth;

                        setTimeout(function() {
                            modalContainer.classList.add('animated');
                        }, 10);

                        setTimeout(function() {
                            tryFullScreen();
                        }, 300); //because effects
                    } else {
                        modalContainer.style.display = 'block';
                        modalContainer.slideWidth = q('#zuck-modal .story-viewer').offsetWidth;
                        
                        tryFullScreen();
                    }

                    option('callbacks', 'onView')(storyId);
                };

                option('callbacks', 'onOpen')(storyId, callback);
            },

            'next': function(unmute) {
                var callback = function() {
                    var lastStory = zuck.internalData['currentStory'];
                    var lastStoryTimelineElement = q('#' + id + ' [data-id="' + lastStory + '"]');

                    if (lastStoryTimelineElement) {
                        lastStoryTimelineElement.classList.add('seen');

                        zuck.data[lastStory]['seen'] = true;
                        zuck.internalData['seenItems'][lastStory] = true;

                        saveLocalData('seenItems', zuck.internalData['seenItems']);
                        updateStoryseenPosition();
                    }

                    var stories = q('#zuck-modal .story-viewer.next');
                    if (!stories) {
                        modal.close();
                    } else {
                        moveStoryItem(true);
                    }
                };

                option('callbacks', 'onEnd')(zuck.internalData['currentStory'], callback);
            },

            'close': function() {
                var callback = function() {
                    if (option('backNative')) {
                        location.hash = '';
                    }

                    fullScreen(modalContainer, true);

                    if (option('openEffect')) {
                        modalContainer.classList.add('closed');
                    } else {
                        modalContent.innerHTML = '';
                        modalContainer.style.display = 'none';
                    }
                };

                option('callbacks', 'onClose')(zuck.internalData['currentStory'], callback);
            }
        };
    };
    var modal = new zuckModal();


    /* parse functions */
    var parseItems = function(story) {
            var storyId = story.getAttribute('data-id');
            var storyItems = d.querySelectorAll('#' + id + ' [data-id="' + storyId + '"] .items > li');
            var items = [];

            each(storyItems, function(i, el) {
                var a = el.firstElementChild;
                var img = a.firstElementChild;

                items.push({
                    'src': a.getAttribute('href'),
                    'length': a.getAttribute('data-length'),
                    'type': a.getAttribute('data-type'),
                    'time': a.getAttribute('data-time'),
                    'link': a.getAttribute('data-link'),
                    'preview': img.getAttribute('src')
                });
            });

            zuck.data[storyId].items = items;
        },
        parseStory = function(story) {
            var storyId = story.getAttribute('data-id');
            var seen = false;

            if (zuck.internalData['seenItems'][storyId]) {
                seen = true;
            }

            if (seen) {
                story.classList.add('seen');
            } else {
                story.classList.remove('seen');
            }

            try {
                zuck.data[storyId] = {
                    'id': storyId, //story id
                    'photo': story.getAttribute('data-photo'), //story photo (or user photo)
                    'name': story.firstElementChild.lastElementChild.firstChild.innerText,
                    'link': story.firstElementChild.getAttribute('href'),
                    'lastUpdated': story.getAttribute('data-last-updated'),
                    'seen': seen,
                    'items': []
                };
            } catch (e) {
                zuck.data[storyId] = {
                    'items': []
                };
            }

            story.onclick = function(e) {
                e.preventDefault();

                modal.show(storyId);
            };
        },
        getStoryMorningGlory = function(what) { //my wife told me to stop singing Wonderwall. I SAID MAYBE.
            var currentStory = zuck.internalData['currentStory'];
            var whatEl = what + 'ElementSibling';

            if (currentStory) {
                var foundStory = q('#' + id + ' [data-id="' + currentStory + '"]')[whatEl];

                if (foundStory) {
                    var storyId = foundStory.getAttribute('data-id');
                    var data = zuck.data[storyId] || false;

                    return data; //(g(zuck.data[storyId], 'seen')==true)?false:data;
                }
            }

            return false;
        },
        updateStoryseenPosition = function() {
            each(d.querySelectorAll('#' + id + ' .story.seen'), function(i, el) {
                var newData = zuck.data[el.getAttribute('data-id')];
                var timeline = el.parentNode;

                timeline.removeChild(el);
                zuck.add(newData, true);
            });
        },
        playVideoItem = function(elements, unmute) {
            var itemElement = elements[1],
                itemPointer = elements[0];
            var storyViewer = itemPointer.parentNode.parentNode.parentNode;

            if (!itemElement || !itemPointer) {
                return false;
            }

            var cur = zuck.internalData['currentVideoElement'];
            if (cur) {
                cur.pause();
            }

            if (itemElement.getAttribute('data-type') == 'video') {
                var video = itemElement.getElementsByTagName('video')[0];
                if (!video) {
                    zuck.internalData['currentVideoElement'] = false;

                    return false;
                }

                var setDuration = function() {
                    if (video.duration) {
                        setVendorVariable(itemPointer.getElementsByTagName('b')[0].style, 'AnimationDuration', video.duration + 's');
                    }
                };

                setDuration();
                video.addEventListener('loadedmetadata', setDuration);
                zuck.internalData['currentVideoElement'] = video;

                video.currentTime = 0;
                video.play();

                if (unmute.target) {
                    unmuteVideoItem(video, storyViewer);
                }
            } else {
                zuck.internalData['currentVideoElement'] = false;
            }
        },
        pauseVideoItem = function() {
            var video = zuck.internalData['currentVideoElement'];
            if (video) {
                try {
                    video.pause();
                } catch (e) {

                }
            }
        },
        unmuteVideoItem = function(video, storyViewer) {
            video.muted = false;
            video.volume = 1.0;
            video.removeAttribute('muted');
            video.play();

            if (video.paused) {
                video.muted = true;
                video.play();
            }

            if (storyViewer) {
                storyViewer.classList.remove('paused');
            }
        };

    /* data functions */
    var saveLocalData = function(key, data) {
            try {
                if (option('localStorage')) {
                    var keyName = 'zuck-' + id + '-' + key;

                    window.localStorage[keyName] = JSON.stringify(data);
                }
            } catch (e) {

            }
        },
        getLocalData = function(key) {
            if (option('localStorage')) {
                var keyName = 'zuck-' + id + '-' + key;

                return (window.localStorage[keyName]) ? JSON.parse(window.localStorage[keyName]) : false;
            } else {
                return false;
            }
        };


    /* api */
    zuck.data = {};
    zuck.internalData = {};
    zuck.internalData['seenItems'] = getLocalData('seenItems') || {};

    zuck.add = zuck.update = function(data, append) {
        var storyId = g(data, 'id');
        var storyEl = q('#' + id + ' [data-id="' + storyId + '"]');
        var html = '';
        var items = g(data, 'items');
        var story = false;

        zuck.data[storyId] = {};

        if (!storyEl) {
            story = d.createElement('div');
            story.className = 'story';
        } else {
            story = storyEl;
        }

        if (data['seen'] === false) {
            zuck.internalData['seenItems'][storyId] = false;
            saveLocalData('seenItems', zuck.internalData['seenItems']);
        }

        story.setAttribute('data-id', storyId);
        story.setAttribute('data-photo', g(data, 'photo'));
        story.setAttribute('data-last-updated', g(data, 'lastUpdated'));

        var preview = false;
        if (items[0]) {
            preview = items[0]['preview'] || '';
        }

        html = '<a href="' + g(data, 'link') + '">' +
            '<span class="img"><u style="background-image:url(' + ((option('avatars') || !preview || preview == '') ? g(data, 'photo') : preview) + ')"></u></span>' +
            '<span class="info"><strong>' + g(data, 'name') + '</strong><span class="time">' + timeAgo(g(data, 'lastUpdated')) + '</span></span>' +
            '</a>' +
            '<ul class="items"></ul>';
        story.innerHTML = html;
        parseStory(story);

        if (!storyEl) {
            if (append) {
                timeline.appendChild(story);
            } else {
                prepend(timeline, story);
            }
        }

        each(items, function(i, item) {
            zuck.addItem(storyId, item, append);
        });

        if (!append) {
            updateStoryseenPosition();
        }
    };
    zuck.next = function() {
        modal.next();
    };
    zuck.addItem = function(storyId, data, append) {
        var story = q('#' + id + ' > [data-id="' + storyId + '"]');
        var li = d.createElement('li');

        li.className = g(data, 'seen') ? 'seen' : '';
        li.setAttribute('data-id', g(data, 'id'));

        li.innerHTML = '<a href="' + g(data, 'src') + '" data-link="' + g(data, 'link') + '" data-time="' + g(data, 'time') + '" data-type="' + g(data, 'type') + '" data-length="' + g(data, 'length') + '">' +
            '<img src="' + g(data, 'preview') + '">' +
            '</a>';

        var el = story.querySelectorAll('.items')[0];
        if (append) {
            el.appendChild(li);
        } else {
            prepend(el, li);
        }

        parseItems(story);
    };
    zuck.removeItem = function(storyId, itemId) {
        var item = q('#' + id + ' > [data-id="' + storyId + '"] [data-id="' + itemId + '"]');

        timeline.parentNode.removeChild(item);
    };
    zuck.nextItem = function(event) {
        var currentStory = zuck.internalData['currentStory'];
        var currentItem = zuck.data[currentStory]['currentItem'];
        var storyViewer = q('#zuck-modal .story-viewer[data-story-id="' + currentStory + '"]');

        if (!storyViewer || storyViewer.touchMove == 1) {
            return false;
        }

        var currentItemElements = storyViewer.querySelectorAll('[data-index="' + currentItem + '"]');
        var currentPointer = currentItemElements[0];
        var currentItemElement = currentItemElements[1];

        var nextItem = currentItem + 1;
        var nextItemElements = storyViewer.querySelectorAll('[data-index="' + nextItem + '"]');
        var nextPointer = nextItemElements[0];
        var nextItemElement = nextItemElements[1];

        if (storyViewer && nextPointer && nextItemElement) {
            var nextItemCallback = function() {
                currentPointer.classList.remove('active');
                currentPointer.classList.add('seen');
                currentItemElement.classList.remove('active');
                currentItemElement.classList.add('seen');

                nextPointer.classList.remove('seen');
                nextPointer.classList.add('active');

                //nextItemElement.classList.remove('stopped');

                nextItemElement.classList.remove('seen');
                nextItemElement.classList.add('active');

                each(storyViewer.querySelectorAll('.time'), function(i, el) {
                    el.innerText = timeAgo(nextItemElement.getAttribute('data-time'));
                });

                zuck.data[currentStory]['currentItem']++;

                playVideoItem(nextItemElements, event);
            };

            option('callbacks', 'onNextItem')(currentStory, nextItemElement.getAttribute('data-story-id'), nextItemCallback);
        } else if (storyViewer) {
            modal.next(event);
        }
    };


    /* of course, init! */
    var init = function() {

        //console.log('Zuck It!', id);

        if (location.hash == '#!' + id) {
            location.hash = '';
        }

        if (q('#' + id + ' .story')) {
            each(timeline.querySelectorAll('.story'), function(i, story) {
                parseStory(story, true);
            });
        }

        if (option('backNative')) {
            window.addEventListener('popstate', function(e) {
                if (location.hash != '#!' + id) {
                    location.hash = '';
                }
            }, false);
        }

        each(option('stories'), function(i, item) {
            zuck.add(item, true);
        });

        updateStoryseenPosition();

        var avatars = (option('avatars')) ? 'user-icon' : 'story-preview';
        var list = (option('list')) ? 'list' : 'carousel';

        timeline.className = 'stories ' + avatars + ' ' + list + ' ' + (option('skin') + '').toLowerCase();

        return zuck;
    };

    return init();
};
