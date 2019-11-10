/*
    zuck.js
    https://github.com/ramon82/zuck.js
    MIT License
*/

(function (global) {
    "use strict";

    var ZuckJS = (function() {
      var w = window;
    
      var ZuckJS = function ZuckJS(timeline, options) {
        var d = document;
        var zuck = this;
    
        if (typeof timeline == "string") {
          timeline = d.getElementById(timeline);
        }
    
        /* core functions */
        var query = function query(qs) {
          return d.querySelectorAll(qs)[0];
        };
    
        var get = function get(array, what) {
          if (array) {
            return array[what] || "";
          } else {
            return "";
          }
        };
    
        var each = function each(arr, func) {
          if (arr) {
            var total = arr.length;
    
            for (var i = 0; i < total; i++) {
              func(i, arr[i]);
            }
          }
        };
    
        var setVendorVariable = function setVendorVariable(ref, variable, value) {
          var variables = [
            variable.toLowerCase(),
            "webkit" + variable,
            "MS" + variable,
            "o" + variable
          ];
    
          each(variables, function(i, val) {
            ref[val] = value;
          });
        };
    
        var addVendorEvents = function addVendorEvents(el, func, event) {
          var events = [
            event.toLowerCase(),
            "webkit" + event,
            "MS" + event,
            "o" + event
          ];
          var element = el;
    
          each(events, function(i, val) {
            el.addEventListener(val, func, false);
          });
        };
    
        var onAnimationEnd = function onAnimationEnd(el, func) {
          addVendorEvents(el, func, "AnimationEnd");
        };
    
        var onTransitionEnd = function onTransitionEnd(el, func) {
          if (!el.transitionEndEvent) {
            el.transitionEndEvent = true;
    
            addVendorEvents(el, func, "TransitionEnd");
          }
        };
    
        var prepend = function prepend(parent, child) {
          if (parent.firstChild) {
            parent.insertBefore(child, parent.firstChild);
          } else {
            parent.appendChild(child);
          }
        };
    
        var getElIndex = function getElIndex(el) {
          for (var i = 1; (el = el.previousElementSibling); i++) {
            return i;
          }
    
          return 0;
        };
    
        var fullScreen = function fullScreen(elem, cancel) {
          var func = "RequestFullScreen";
          var elFunc = "requestFullScreen"; //crappy vendor prefixes.
    
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
              } else if (elem["ms" + func]) {
                elem["ms" + func]();
              } else if (elem["moz" + func]) {
                elem["moz" + func]();
              } else if (elem["webkit" + func]) {
                elem["webkit" + func]();
              }
            } catch (e) {}
          }
        };
    
        var translate = function translate(element, to, duration, ease) {
          var direction = to > 0 ? 1 : -1;
          var to3d =
            (Math.abs(to) / query("#zuck-modal").offsetWidth) * 90 * direction;
    
          if (option("cubeEffect")) {
            var scaling = to3d == 0 ? "scale(0.95)" : "scale(0.930,0.930)";
    
            setVendorVariable(
              query("#zuck-modal-content").style,
              "Transform",
              scaling
            );
    
            if (to3d < -90 || to3d > 90) {
              return false;
            }
          }
    
          var transform = !option("cubeEffect")
            ? "translate3d(" + to + "px, 0, 0)"
            : "rotateY(" + to3d + "deg)";
    
          if (element) {
            setVendorVariable(element.style, "TransitionTimingFunction", ease);
            setVendorVariable(element.style, "TransitionDuration", duration + "ms");
            setVendorVariable(element.style, "Transform", transform);
          }
        };
    
        var findPos = function findPos(obj, offsetY, offsetX, stop) {
          var curleft = 0;
          var curtop = 0;
    
          if (obj) {
            if (obj.offsetParent) {
              do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
    
                if (obj == stop) {
                  break;
                }
              } while ((obj = obj.offsetParent));
            }
    
            if (offsetY) {
              curtop = curtop - offsetY;
            }
    
            if (offsetX) {
              curleft = curleft - offsetX;
            }
          }
    
          return [curleft, curtop];
        };
    
        var timeAgo = function timeAgo(time) {
          time = Number(time) * 1000;
    
          var dateObj = new Date(time);
          var dateStr = dateObj.getTime();
          var seconds = (new Date().getTime() - dateStr) / 1000;
    
          var language = option("language", "time");
    
          var formats = [
            [60, " " + language["seconds"], 1], // 60
            [120, "1 " + language["minute"], ""], // 60*2
            [3600, " " + language["minutes"], 60], // 60*60, 60
            [7200, "1 " + language["hour"], ""], // 60*60*2
            [86400, " " + language["hours"], 3600], // 60*60*24, 60*60
            [172800, " " + language["yesterday"], ""], // 60*60*24*2
            [604800, " " + language["days"], 86400]
          ];
    
          var currentFormat = 1;
          if (seconds < 0) {
            seconds = Math.abs(seconds);
    
            currentFormat = 2;
          }
    
          var i = 0;
          var format = void 0;
          while ((format = formats[i++])) {
            if (seconds < format[0]) {
              if (typeof format[2] == "string") {
                return format[currentFormat];
              } else {
                return Math.floor(seconds / format[2]) + format[1];
              }
            }
          }
    
          var day = dateObj.getDate();
          var month = dateObj.getMonth();
          var year = dateObj.getFullYear();
    
          return day + "/" + (month + 1) + "/" + year;
        };
    
        /* options */
        var id = timeline.id;
    
        var optionsDefault = {
          skin: "snapgram",
          avatars: true,
          stories: [],
          backButton: true,
          backNative: false,
          previousTap: true,
          autoFullScreen: false,
          openEffect: true,
          cubeEffect: false,
          list: false,
          localStorage: true,
          callbacks: {
            onOpen: function onOpen(storyId, callback) {
              callback();
            },
            onView: function onView(storyId) {},
            onEnd: function onEnd(storyId, callback) {
              callback();
            },
            onClose: function onClose(storyId, callback) {
              callback();
            },
            onNextItem: function onNextItem(storyId, nextStoryId, callback) {
              callback();
            },
            onNavigateItem: function onNavigateItem(
              storyId,
              nextStoryId,
              callback
            ) {
              callback();
            }
          },
          language: {
            unmute: "Touch to unmute",
            keyboardTip: "Press space to see next",
            visitLink: "Visit link",
            time: {
              ago: "ago",
              hour: "hour ago",
              hours: "hours ago",
              minute: "minute ago",
              minutes: "minutes ago",
              fromnow: "from now",
              seconds: "seconds ago",
              yesterday: "yesterday",
              tomorrow: "tomorrow",
              days: "days ago"
            }
          }
        };
    
        var option = function option(name, prop) {
          var type = function type(what) {
            return typeof what !== "undefined";
          };
    
          if (prop) {
            if (type(options[name])) {
              return type(options[name][prop])
                ? options[name][prop]
                : optionsDefault[name][prop];
            } else {
              return optionsDefault[name][prop];
            }
          } else {
            return type(options[name]) ? options[name] : optionsDefault[name];
          }
        };
    
        /* modal */
        var zuckModal = function zuckModal() {
          var opened = false;
          var modalZuckContainer = query("#zuck-modal");
    
          if (!modalZuckContainer && !w["Zuck"].hasModal) {
            w["Zuck"].hasModal = true;
    
            modalZuckContainer = d.createElement("div");
            modalZuckContainer.id = "zuck-modal";
    
            if (option("cubeEffect")) {
              modalZuckContainer.className = "with-cube";
            }
    
            modalZuckContainer.innerHTML = '<div id="zuck-modal-content"></div>';
            modalZuckContainer.style.display = "none";
    
            modalZuckContainer.setAttribute("tabIndex", "1");
            modalZuckContainer.onkeyup = function(e) {
              var code = e.keyCode;
    
              if (code == 27) {
                modal.close();
              } else if (code == 13 || code == 32) {
                modal.next();
              }
            };
    
            if (option("openEffect")) {
              modalZuckContainer.classList.add("with-effects");
            }
    
            onTransitionEnd(modalZuckContainer, function() {
              if (modalZuckContainer.classList.contains("closed")) {
                modalContent.innerHTML = "";
                modalZuckContainer.style.display = "none";
                modalZuckContainer.classList.remove("closed");
                modalZuckContainer.classList.remove("animated");
              }
            });
    
            d.body.appendChild(modalZuckContainer);
          }
    
          var modalContent = query("#zuck-modal-content");
          var moveStoryItem = function moveStoryItem(direction) {
            var modalContainer = query("#zuck-modal");
    
            var target = "";
            var useless = "";
            var transform = "0";
            var modalSlider = query("#zuck-modal-slider-" + id);
    
            var slideItems = {
              previous: query("#zuck-modal .story-viewer.previous"),
              next: query("#zuck-modal .story-viewer.next"),
              viewing: query("#zuck-modal .story-viewer.viewing")
            };
    
            if (
              (!slideItems["previous"] && !direction) ||
              (!slideItems["next"] && direction)
            ) {
              return false;
            }
    
            if (!direction) {
              target = "previous";
              useless = "next";
            } else {
              target = "next";
              useless = "previous";
            }
    
            var transitionTime = 600;
            if (option("cubeEffect")) {
              if (target == "previous") {
                transform = modalContainer.slideWidth;
              } else if (target == "next") {
                transform = modalContainer.slideWidth * -1;
              }
            } else {
              transform = findPos(slideItems[target]);
              transform = transform[0] * -1;
            }
    
            translate(modalSlider, transform, transitionTime, null);
    
            setTimeout(function() {
              if (target != "" && slideItems[target] && useless != "") {
                var currentStory = slideItems[target].getAttribute("data-story-id");
                zuck.internalData["currentStory"] = currentStory;
    
                var oldStory = query("#zuck-modal .story-viewer." + useless);
                if (oldStory) {
                  oldStory.parentNode.removeChild(oldStory);
                }
    
                if (slideItems["viewing"]) {
                  slideItems["viewing"].classList.add("stopped");
                  slideItems["viewing"].classList.add(useless);
                  slideItems["viewing"].classList.remove("viewing");
                }
    
                if (slideItems[target]) {
                  slideItems[target].classList.remove("stopped");
                  slideItems[target].classList.remove(target);
                  slideItems[target].classList.add("viewing");
                }
    
                var newStoryData = getStoryMorningGlory(target);
                if (newStoryData) {
                  createStoryViewer(newStoryData, target);
                }
    
                var storyId = zuck.internalData["currentStory"];
                var items = query('#zuck-modal [data-story-id="' + storyId + '"]');
    
                if (items) {
                  items = items.querySelectorAll("[data-index].active");
                  var duration = items[0].firstElementChild;
    
                  zuck.data[storyId]["currentItem"] = parseInt(
                    items[0].getAttribute("data-index"),
                    10
                  );
    
                  items[0].innerHTML =
                    '<b style="' + duration.style.cssText + '"></b>';
                  onAnimationEnd(items[0].firstElementChild, function() {
                    zuck.nextItem(false);
                  });
                }
    
                translate(modalSlider, "0", 0, null);
    
                if (items) {
                  playVideoItem([items[0], items[1]], true);
                }
    
                option("callbacks", "onView")(zuck.internalData["currentStory"]);
              }
            }, transitionTime + 50);
          };
    
          var createStoryViewer = function createStoryViewer(
            storyData,
            className,
            forcePlay
          ) {
            var modalContainer = query("#zuck-modal");
            var modalSlider = query("#zuck-modal-slider-" + id);
    
            var htmlItems = "";
            var pointerItems = "";
            var storyId = get(storyData, "id");
            var slides = d.createElement("div");
            var currentItem = get(storyData, "currentItem") || 0;
            var exists = query(
              '#zuck-modal .story-viewer[data-story-id="' + storyId + '"]'
            );
            var currentItemTime = "";
    
            if (exists) {
              return false;
            }
    
            slides.className = "slides";
            each(get(storyData, "items"), function(i, item) {
              if (currentItem > i) {
                storyData["items"][i]["seen"] = true;
                item["seen"] = true;
              }
    
              var length = get(item, "length");
              var linkText = get(item, "linkText");
              var seenClass = get(item, "seen") === true ? "seen" : "";
              var commonAttrs =
                'data-index="' + i + '" data-item-id="' + get(item, "id") + '"';
    
              if (currentItem === i) {
                currentItemTime = timeAgo(get(item, "time"));
              }
    
              pointerItems +=
                "<span " +
                commonAttrs +
                ' class="' +
                (currentItem === i ? "active" : "") +
                " " +
                seenClass +
                '"><b style="animation-duration:' +
                (length === "" ? "3" : length) +
                's"></b></span>';
              htmlItems +=
                '<div data-time="' +
                get(item, "time") +
                '" data-type="' +
                get(item, "type") +
                '"' +
                commonAttrs +
                ' class="item ' +
                seenClass +
                " " +
                (currentItem === i ? "active" : "") +
                '">' +
                (get(item, "type") === "video"
                  ? '<video class="media" muted webkit-playsinline playsinline preload="auto" src="' +
                    get(item, "src") +
                    '" ' +
                    get(item, "type") +
                    '></video><b class="tip muted">' +
                    option("language", "unmute") +
                    "</b>"
                  : '<img class="media" src="' +
                    get(item, "src") +
                    '" ' +
                    get(item, "type") +
                    ">") +
                (get(item, "link")
                  ? '<a class="tip link" href="' +
                    get(item, "link") +
                    '" rel="noopener" target="_blank">' +
                    (linkText == "" || !linkText
                      ? option("language", "visitLink")
                      : linkText) +
                    "</a>"
                  : "") +
                "</div>";
            });
            slides.innerHTML = htmlItems;
    
            var video = slides.querySelector("video");
            var addMuted = function addMuted(video) {
              if (video.muted) {
                storyViewer.classList.add("muted");
              } else {
                storyViewer.classList.remove("muted");
              }
            };
    
            if (video) {
              video.onwaiting = function(e) {
                if (video.paused) {
                  storyViewer.classList.add("paused");
                  storyViewer.classList.add("loading");
                }
              };
    
              video.onplay = function() {
                addMuted(video);
    
                storyViewer.classList.remove("stopped");
                storyViewer.classList.remove("paused");
                storyViewer.classList.remove("loading");
              };
    
              video.onready = video.onload = video.onplaying = video.oncanplay = function() {
                addMuted(video);
    
                storyViewer.classList.remove("loading");
              };
    
              video.onvolumechange = function() {
                addMuted(video);
              };
            }
    
            var storyViewer = d.createElement("div");
            storyViewer.className =
              "story-viewer muted " +
              className +
              " " +
              (!forcePlay ? "stopped" : "") +
              " " +
              (option("backButton") ? "with-back-button" : "");
            storyViewer.setAttribute("data-story-id", storyId);
    
            var html =
              '<div class="head"><div class="left">' +
              (option("backButton") ? '<a class="back">&lsaquo;</a>' : "") +
              '<u class="img" style="background-image:url(' +
              get(storyData, "photo") +
              ');"></u><div><strong>' +
              get(storyData, "name") +
              '</strong><span class="time">' +
              currentItemTime +
              '</span></div></div><div class="right"><span class="time">' +
              currentItemTime +
              '</span><span class="loading"></span><a class="close" tabIndex="2">&times;</a></div></div><div class="slides-pointers"><div>' +
              pointerItems +
              "</div></div>";
            storyViewer.innerHTML = html;
    
            each(storyViewer.querySelectorAll(".close, .back"), function(i, el) {
              el.onclick = function(e) {
                e.preventDefault();
                modal.close();
              };
            });
    
            storyViewer.appendChild(slides);
    
            if (className == "viewing") {
              playVideoItem(
                storyViewer.querySelectorAll(
                  '[data-index="' + currentItem + '"].active'
                ),
                false
              );
            }
    
            each(
              storyViewer.querySelectorAll(".slides-pointers [data-index] > b"),
              function(i, el) {
                onAnimationEnd(el, function() {
                  zuck.nextItem(false);
                });
              }
            );
    
            if (className == "previous") {
              prepend(modalSlider, storyViewer);
            } else {
              modalSlider.appendChild(storyViewer);
            }
          };
    
          var createStoryTouchEvents = function createStoryTouchEvents(
            modalSliderElement
          ) {
            var modalContainer = query("#zuck-modal");
            var enableMouseEvents = true;
    
            var modalSlider = modalSliderElement;
            var position = {};
            var touchOffset = void 0;
            var isScrolling = void 0;
            var delta = void 0;
            var timer = void 0;
            var nextTimer = void 0;
    
            var touchStart = function touchStart(event) {
              var storyViewer = query("#zuck-modal .viewing");
    
              if (event.target.nodeName == "A") {
                return true;
              } else {
                event.preventDefault();
              }
    
              var touches = event.touches ? event.touches[0] : event;
              var pos = findPos(query("#zuck-modal .story-viewer.viewing"));
    
              modalContainer.slideWidth = query(
                "#zuck-modal .story-viewer"
              ).offsetWidth;
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
                modalSlider.addEventListener("mousemove", touchMove);
                modalSlider.addEventListener("mouseup", touchEnd);
                modalSlider.addEventListener("mouseleave", touchEnd);
              }
              modalSlider.addEventListener("touchmove", touchMove);
              modalSlider.addEventListener("touchend", touchEnd);
    
              if (storyViewer) {
                storyViewer.classList.add("paused");
              }
              pauseVideoItem();
    
              timer = setTimeout(function() {
                storyViewer.classList.add("longPress");
              }, 600);
    
              nextTimer = setTimeout(function() {
                clearInterval(nextTimer);
                nextTimer = false;
              }, 250);
            };
    
            var touchMove = function touchMove(event) {
              var touches = event.touches ? event.touches[0] : event;
              var pageX = touches.pageX;
              var pageY = touches.pageY;
    
              if (touchOffset) {
                delta = {
                  x: pageX - touchOffset.x,
                  y: pageY - touchOffset.y
                };
    
                if (typeof isScrolling === "undefined") {
                  isScrolling = !!(
                    isScrolling || Math.abs(delta.x) < Math.abs(delta.y)
                  );
                }
    
                if (!isScrolling && touchOffset) {
                  event.preventDefault();
                  translate(modalSlider, position.x + delta.x, 0, null);
                }
              }
            };
    
            var touchEnd = function touchEnd(event) {
              var storyViewer = query("#zuck-modal .viewing");
              var lastTouchOffset = touchOffset;
    
              if (delta) {
                var slidesLength = d.querySelectorAll("#zuck-modal .story-viewer")
                  .length;
                var duration = touchOffset
                  ? Date.now() - touchOffset.time
                  : undefined;
                var isValid =
                  (Number(duration) < 300 && Math.abs(delta.x) > 25) ||
                  Math.abs(delta.x) > modalContainer.slideWidth / 3;
                var direction = delta.x < 0;
    
                var index = direction
                  ? query("#zuck-modal .story-viewer.next")
                  : query("#zuck-modal .story-viewer.previous");
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
                  modalSlider.removeEventListener("mousemove", touchMove);
                  modalSlider.removeEventListener("mouseup", touchEnd);
                  modalSlider.removeEventListener("mouseleave", touchEnd);
                }
                modalSlider.removeEventListener("touchmove", touchMove);
                modalSlider.removeEventListener("touchend", touchEnd);
              }
    
              var video = zuck.internalData["currentVideoElement"];
              if (timer) {
                clearInterval(timer);
              }
    
              if (storyViewer) {
                storyViewer.classList.remove("longPress");
                storyViewer.classList.remove("paused");
              }
    
              if (nextTimer) {
                clearInterval(nextTimer);
                nextTimer = false;
    
                var navigateItem = function navigateItem() {
                  if (
                    lastTouchOffset.x > w.screen.width / 3 ||
                    !option("previousTap")
                  ) {
                    zuck.navigateItem("next", event);
                  } else {
                    zuck.navigateItem("previous", event);
                  }
                };
    
                var storyViewerViewing = query("#zuck-modal .viewing");
                if (storyViewerViewing && video) {
                  if (storyViewerViewing.classList.contains("muted")) {
                    unmuteVideoItem(video, storyViewerViewing);
                  } else {
                    navigateItem();
                  }
                } else {
                  navigateItem();
    
                  return false;
                }
              }
            };
    
            modalSlider.addEventListener("touchstart", touchStart);
    
            if (enableMouseEvents) {
              modalSlider.addEventListener("mousedown", touchStart);
            }
          };
    
          return {
            show: function show(storyId, page) {
              var modalContainer = query("#zuck-modal");
    
              var callback = function callback() {
                modalContent.innerHTML =
                  '<div id="zuck-modal-slider-' + id + '" class="slider"></div>';
    
                var storyData = zuck.data[storyId];
                var currentItem = storyData["currentItem"] || 0;
                var modalSlider = query("#zuck-modal-slider-" + id);
    
                createStoryTouchEvents(modalSlider);
    
                zuck.internalData["currentStory"] = storyId;
                storyData["currentItem"] = currentItem;
    
                if (option("backNative")) {
                  location.hash = "#!" + id;
                }
    
                var previousItemData = getStoryMorningGlory("previous");
                if (previousItemData) {
                  createStoryViewer(previousItemData, "previous");
                }
    
                createStoryViewer(storyData, "viewing", true);
    
                var nextItemData = getStoryMorningGlory("next");
                if (nextItemData) {
                  createStoryViewer(nextItemData, "next");
                }
    
                if (option("autoFullScreen")) {
                  modalContainer.classList.add("fullscreen");
                }
    
                var tryFullScreen = function tryFullScreen() {
                  if (
                    modalContainer.classList.contains("fullscreen") &&
                    option("autoFullScreen") &&
                    w.screen.width <= 1024
                  ) {
                    fullScreen(modalContainer);
                  }
    
                  modalContainer.focus();
                };
    
                if (option("openEffect")) {
                  var storyEl = query(
                    "#" + id + ' [data-id="' + storyId + '"] .img'
                  );
                  var pos = findPos(storyEl);
    
                  modalContainer.style.marginLeft =
                    pos[0] + storyEl.offsetWidth / 2 + "px";
                  modalContainer.style.marginTop =
                    pos[1] + storyEl.offsetHeight / 2 + "px";
    
                  modalContainer.style.display = "block";
    
                  modalContainer.slideWidth = query(
                    "#zuck-modal .story-viewer"
                  ).offsetWidth;
    
                  setTimeout(function() {
                    modalContainer.classList.add("animated");
                  }, 10);
    
                  setTimeout(function() {
                    tryFullScreen();
                  }, 300); //because effects
                } else {
                  modalContainer.style.display = "block";
                  modalContainer.slideWidth = query(
                    "#zuck-modal .story-viewer"
                  ).offsetWidth;
    
                  tryFullScreen();
                }
    
                option("callbacks", "onView")(storyId);
              };
    
              option("callbacks", "onOpen")(storyId, callback);
            },
            next: function next(unmute) {
              var modalContainer = query("#zuck-modal");
    
              var callback = function callback() {
                var lastStory = zuck.internalData["currentStory"];
                var lastStoryTimelineElement = query(
                  "#" + id + ' [data-id="' + lastStory + '"]'
                );
    
                if (lastStoryTimelineElement) {
                  lastStoryTimelineElement.classList.add("seen");
    
                  zuck.data[lastStory]["seen"] = true;
                  zuck.internalData["seenItems"][lastStory] = true;
    
                  saveLocalData("seenItems", zuck.internalData["seenItems"]);
                  updateStoryseenPosition();
                }
    
                var stories = query("#zuck-modal .story-viewer.next");
                if (!stories) {
                  modal.close();
                } else {
                  moveStoryItem(true);
                }
              };
    
              option("callbacks", "onEnd")(
                zuck.internalData["currentStory"],
                callback
              );
            },
            close: function close() {
              var modalContainer = query("#zuck-modal");
    
              var callback = function callback() {
                if (option("backNative")) {
                  location.hash = "";
                }
    
                fullScreen(modalContainer, true);
    
                if (option("openEffect")) {
                  modalContainer.classList.add("closed");
                } else {
                  modalContent.innerHTML = "";
                  modalContainer.style.display = "none";
                }
              };
    
              option("callbacks", "onClose")(
                zuck.internalData["currentStory"],
                callback
              );
            }
          };
        };
        var modal = new zuckModal();
    
        /* parse functions */
        var parseItems = function parseItems(story) {
          var storyId = story.getAttribute("data-id");
          var storyItems = d.querySelectorAll(
            "#" + id + ' [data-id="' + storyId + '"] .items > li'
          );
          var items = [];
    
          each(storyItems, function(i, el) {
            var a = el.firstElementChild;
            var img = a.firstElementChild;
    
            items.push({
              src: a.getAttribute("href"),
              length: a.getAttribute("data-length"),
              type: a.getAttribute("data-type"),
              time: a.getAttribute("data-time"),
              link: a.getAttribute("data-link"),
              linkText: a.getAttribute("data-linkText"),
              preview: img.getAttribute("src")
            });
          });
    
          zuck.data[storyId].items = items;
        };
    
        var parseStory = function parseStory(story) {
          var storyId = story.getAttribute("data-id");
          var seen = false;
    
          if (zuck.internalData["seenItems"][storyId]) {
            seen = true;
          }
    
          if (seen) {
            story.classList.add("seen");
          } else {
            story.classList.remove("seen");
          }
    
          try {
            zuck.data[storyId] = {
              id: storyId, //story id
              photo: story.getAttribute("data-photo"), //story photo (or user photo)
              name: story.firstElementChild.lastElementChild.firstChild.innerText,
              link: story.firstElementChild.getAttribute("href"),
              lastUpdated: story.getAttribute("data-last-updated"),
              seen: seen,
              items: []
            };
          } catch (e) {
            zuck.data[storyId] = {
              items: []
            };
          }
    
          story.onclick = function(e) {
            e.preventDefault();
    
            modal.show(storyId);
          };
        };
    
        var getStoryMorningGlory = function getStoryMorningGlory(what) {
          //my wife told me to stop singing Wonderwall. I SAID MAYBE.
          var currentStory = zuck.internalData["currentStory"];
          var whatEl = what + "ElementSibling";
    
          if (currentStory) {
            var foundStory = query("#" + id + ' [data-id="' + currentStory + '"]')[
              whatEl
            ];
    
            if (foundStory) {
              var storyId = foundStory.getAttribute("data-id");
              var data = zuck.data[storyId] || false;
    
              return data; //(get(zuck.data[storyId], 'seen')==true)?false:data;
            }
          }
    
          return false;
        };
    
        var updateStoryseenPosition = function updateStoryseenPosition() {
          each(d.querySelectorAll("#" + id + " .story.seen"), function(i, el) {
            var newData = zuck.data[el.getAttribute("data-id")];
            var timeline = el.parentNode;
    
            timeline.removeChild(el);
            zuck.add(newData, true);
          });
        };
    
        var playVideoItem = function playVideoItem(elements, unmute) {
          var itemElement = elements[1];
          var itemPointer = elements[0];
          var storyViewer = itemPointer.parentNode.parentNode.parentNode;
    
          if (!itemElement || !itemPointer) {
            return false;
          }
    
          var cur = zuck.internalData["currentVideoElement"];
          if (cur) {
            cur.pause();
          }
    
          if (itemElement.getAttribute("data-type") == "video") {
            var video = itemElement.getElementsByTagName("video")[0];
            if (!video) {
              zuck.internalData["currentVideoElement"] = false;
    
              return false;
            }
    
            var setDuration = function setDuration() {
              if (video.duration) {
                setVendorVariable(
                  itemPointer.getElementsByTagName("b")[0].style,
                  "AnimationDuration",
                  video.duration + "s"
                );
              }
            };
    
            setDuration();
            video.addEventListener("loadedmetadata", setDuration);
            zuck.internalData["currentVideoElement"] = video;
    
            video.currentTime = 0;
            video.play();
    
            if (unmute.target) {
              unmuteVideoItem(video, storyViewer);
            }
          } else {
            zuck.internalData["currentVideoElement"] = false;
          }
        };
    
        var pauseVideoItem = function pauseVideoItem() {
          var video = zuck.internalData["currentVideoElement"];
          if (video) {
            try {
              video.pause();
            } catch (e) {}
          }
        };
    
        var unmuteVideoItem = function unmuteVideoItem(video, storyViewer) {
          video.muted = false;
          video.volume = 1.0;
          video.removeAttribute("muted");
          video.play();
    
          if (video.paused) {
            video.muted = true;
            video.play();
          }
    
          if (storyViewer) {
            storyViewer.classList.remove("paused");
          }
        };
    
        /* data functions */
        var saveLocalData = function saveLocalData(key, data) {
          try {
            if (option("localStorage")) {
              var keyName = "zuck-" + id + "-" + key;
    
              w.localStorage[keyName] = JSON.stringify(data);
            }
          } catch (e) {}
        };
    
        var getLocalData = function getLocalData(key) {
          if (option("localStorage")) {
            var keyName = "zuck-" + id + "-" + key;
    
            return w.localStorage[keyName]
              ? JSON.parse(w.localStorage[keyName])
              : false;
          } else {
            return false;
          }
        };
    
        /* api */
        zuck.data = {};
        zuck.internalData = {};
        zuck.internalData["seenItems"] = getLocalData("seenItems") || {};
    
        zuck.add = zuck.update = function(data, append) {
          var storyId = get(data, "id");
          var storyEl = query("#" + id + ' [data-id="' + storyId + '"]');
          var html = "";
          var items = get(data, "items");
          var story = false;
    
          zuck.data[storyId] = {};
    
          if (!storyEl) {
            story = d.createElement("div");
            story.className = "story";
          } else {
            story = storyEl;
          }
    
          if (data["seen"] === false) {
            zuck.internalData["seenItems"][storyId] = false;
            saveLocalData("seenItems", zuck.internalData["seenItems"]);
          }
    
          story.setAttribute("data-id", storyId);
          story.setAttribute("data-photo", get(data, "photo"));
          story.setAttribute("data-last-updated", get(data, "lastUpdated"));
    
          var preview = false;
          if (items[0]) {
            preview = items[0]["preview"] || "";
          }
    
          html =
            '<a href="' +
            get(data, "link") +
            '"><span class="img"><u style="background-image:url(' +
            (option("avatars") || !preview || preview == ""
              ? get(data, "photo")
              : preview) +
            ')"></u></span><span class="info"><strong>' +
            get(data, "name") +
            '</strong><span class="time">' +
            timeAgo(get(data, "lastUpdated")) +
            '</span></span></a><ul class="items"></ul>';
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
        zuck.remove = function(storyId) {
          var story = query("#" + id + ' > [data-id="' + storyId + '"]');
          story.parentNode.removeChild(story);
        };
        zuck.addItem = function(storyId, data, append) {
          var story = query("#" + id + ' > [data-id="' + storyId + '"]');
          var li = d.createElement("li");
    
          li.className = get(data, "seen") ? "seen" : "";
          li.setAttribute("data-id", get(data, "id"));
    
          li.innerHTML =
            '<a href="' +
            get(data, "src") +
            '" data-link="' +
            get(data, "link") +
            '" data-linkText="' +
            get(data, "linkText") +
            '" data-time="' +
            get(data, "time") +
            '" data-type="' +
            get(data, "type") +
            '" data-length="' +
            get(data, "length") +
            '"><img src="' +
            get(data, "preview") +
            '"></a>';
    
          var el = story.querySelectorAll(".items")[0];
          if (append) {
            el.appendChild(li);
          } else {
            prepend(el, li);
          }
    
          parseItems(story);
        };
        zuck.removeItem = function(storyId, itemId) {
          var item = query(
            "#" + id + ' > [data-id="' + storyId + '"] [data-id="' + itemId + '"]'
          );
    
          timeline.parentNode.removeChild(item);
        };
        zuck.navigateItem = zuck.nextItem = function(direction, event) {
          var currentStory = zuck.internalData["currentStory"];
          var currentItem = zuck.data[currentStory]["currentItem"];
          var storyViewer = query(
            '#zuck-modal .story-viewer[data-story-id="' + currentStory + '"]'
          );
          var directionNumber = direction == "previous" ? -1 : 1;
    
          if (!storyViewer || storyViewer.touchMove == 1) {
            return false;
          }
    
          var currentItemElements = storyViewer.querySelectorAll(
            '[data-index="' + currentItem + '"]'
          );
          var currentPointer = currentItemElements[0];
          var currentItemElement = currentItemElements[1];
    
          var navigateItem = currentItem + directionNumber;
          var nextItems = storyViewer.querySelectorAll(
            '[data-index="' + navigateItem + '"]'
          );
          var nextPointer = nextItems[0];
          var nextItem = nextItems[1];
    
          if (storyViewer && nextPointer && nextItem) {
            var navigateItemCallback = function navigateItemCallback() {
              if (direction == "previous") {
                currentPointer.classList.remove("seen");
                currentItemElement.classList.remove("seen");
              } else {
                currentPointer.classList.add("seen");
                currentItemElement.classList.add("seen");
              }
    
              currentPointer.classList.remove("active");
              currentItemElement.classList.remove("active");
    
              nextPointer.classList.remove("seen");
              nextPointer.classList.add("active");
    
              nextItem.classList.remove("seen");
              nextItem.classList.add("active");
    
              each(storyViewer.querySelectorAll(".time"), function(i, el) {
                el.innerText = timeAgo(nextItem.getAttribute("data-time"));
              });
    
              zuck.data[currentStory]["currentItem"] =
                zuck.data[currentStory]["currentItem"] + directionNumber;
    
              playVideoItem(nextItems, event);
            };
    
            var callback = option("callbacks", "onNavigateItem");
            callback = !callback
              ? option("callbacks", "onNextItem")
              : option("callbacks", "onNavigateItem");
    
            callback(
              currentStory,
              nextItem.getAttribute("data-story-id"),
              navigateItemCallback
            );
          } else if (storyViewer) {
            if (direction != "previous") {
              modal.next(event);
            }
          }
        };
        var init = function init() {
          if (location.hash == "#!" + id) {
            location.hash = "";
          }
    
          if (query("#" + id + " .story")) {
            each(timeline.querySelectorAll(".story"), function(i, story) {
              parseStory(story, true);
            });
          }
    
          if (option("backNative")) {
            w.addEventListener(
              "popstate",
              function(e) {
                if (location.hash != "#!" + id) {
                  location.hash = "";
                }
              },
              false
            );
          }
    
          each(option("stories"), function(i, item) {
            zuck.add(item, true);
          });
    
          updateStoryseenPosition();
    
          var avatars = option("avatars") ? "user-icon" : "story-preview";
          var list = option("list") ? "list" : "carousel";
    
          timeline.className =
            "stories " +
            avatars +
            " " +
            list +
            " " +
            (option("skin") + "").toLowerCase();
    
          return zuck;
        };
    
        return init();
      };
    
      /* Helpers */
      ZuckJS.buildItem = function(
        id,
        type,
        length,
        src,
        preview,
        link,
        linkText,
        seen,
        time
      ) {
        return {
          id: id,
          type: type,
          length: length,
          src: src,
          preview: preview,
          link: link,
          linkText: linkText,
          seen: seen,
          time: time
        };
      };
    
      /* Too much zuck zuck to maintain legacy */
      w["ZuckitaDaGalera"] = w["Zuck"] = ZuckJS;
    
      return ZuckJS;
    })();

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define(function () { return ZuckJS; });
    // CommonJS and Node.js module support.
    } else if (typeof exports !== 'undefined') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = ZuckJS;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.ZuckJS = ZuckJS;
    } else {
        global.ZuckJS = ZuckJS;
    }
})(this);
