/// <reference path="Jssor.js" />

/**
* Jssor.Player.ytiframe 1.0
* Author: Jssor
*
* Copyright 2013 Jssor. All rights reserved. http://www.jssor.com
**/

//make $JssorPlayer$ unique static instance
var $JssorPlayer$ = window.$JssorPlayer$ = window.$JssorPlayer$ || new $JssorPlayerClass$();

//youtube iframe video player handler begin
$JssorPlayer$["ytiframe"] = function (playerElement, playerInstanceElement) {
    //maintained by '$JssorPlayer$, available for use when the player get initialized and become available
    //playerElement.pId                 //unique id of the player
    //playerElement.pTagName            //tag name of this player instance
    //playerElement.pHandler            //name of the handler which has already handled the player element
    //playerElement.pInstance           //player instance which has already handled the playerElement
    //playerInstanceElement.pHandler    //name of the handler to handle the player instance element
    //playerInstanceElement.pInstance   //player instance which has already got the playerInstanceElement handled

    //should implement following methods/property by this handler
    //playerElement.pAvailable          //indicates that the player is available
    //this.$Remove()                    //drop this instance and remove playerInstanceElement from DOM
    //this.$Play()                      //play player
    //this.$Pause()                     //pause player
    //this.$SeekTo(time[, allowAhead]); //seek player to time position
    //this.$Enter()                     //enter and make the player on service to audience
    //this.$Quit()                      //quit and make the player off service to audience
    //this.$IsEntered()                 //retrieve a boolean value indicates this player is on service or not
    //this.$GetError()                  //retrieve error of the player (better update this property if there is fatal error that makes the player unavailable)

    var _Self = this;

    var _FrameConnected;
    var _MessageFrameId = "ytiframe_" + playerElement.pId;
    var _CloseButton;
    var _PlayCover;
    var _HideControls;

    var _ytPlayerState;

    var _Disabled;
    var _Entered = false;

    var _NoPostMessage = !window.postMessage;
    var _PlayButtonBackgroundImageUrl;

    $JssorObject$.call(_Self);

    function ToJson(value) {
        var json;

        if (value == null) {
            json = "null";
        }
        else if (value == undefined) {
            json == "undefined";
        }
        else if ($Jssor$.$IsString(value)) {
            json = '"' + value + '"';
        }
        else if ($Jssor$.$IsArray(value)) {
            json = "[";

            $Jssor$.$Each(value, function (item, index) {
                json += ToJson(item);
                if (index < value.length - 1)
                    json += ",";
            });

            json += "]";
        }
        else {
            json = value.toString();
        }

        return json;
    }

    function DeliverMessage(evt, options) {
        if (!_NoPostMessage) {
            options = $Jssor$.$Extend({ id: _MessageFrameId }, options);
            var command = '{"event":"' + evt + '"';
            $Jssor$.$Each(options, function (optionValue, name) {
                var optionString = ',"' + name + '":' + ToJson(optionValue);
                command += optionString;
            });
            command += '}'
            playerInstanceElement.contentWindow.postMessage(command, "*");
        }
    }

    function ConnectYtiframe() {
        if (!_FrameConnected) {
            DeliverMessage("listening");

            $Jssor$.$Delay(ConnectYtiframe, 50);
        }
    }

    function SyncSize() {
        var width = $Jssor$.$CssWidth(playerElement);
        var height = $Jssor$.$CssHeight(playerElement);

        $Jssor$.$Attribute(playerInstanceElement, "width", width);
        $Jssor$.$Attribute(playerInstanceElement, "height", height);

        if (_PlayCover) {
            ////25, 66, 40
            //var _CoverTop = 0;
            //var _CoverHeight = height;

            //if (!_HideControls) {
            //    _CoverTop = 66;
            //    _CoverHeight = height - 108;
            //}

            $Jssor$.$CssWidth(_PlayCover, width);
            $Jssor$.$CssHeight(_PlayCover, height);
        }
    }

    function UpdateUI() {
        _CloseButton && $Jssor$.$ShowElement(_CloseButton, !_Entered);
        if (_PlayCover) {
            if (!_ytPlayerState) {
                if (!_PlayButtonBackgroundImageUrl) {
                    _PlayButtonBackgroundImageUrl = $Jssor$.$Css(_PlayCover, "backgrouondImage");
                    !_HideControls && $Jssor$.$Css(_PlayCover, "backgrouondImage", "");
                }
            }
            else if (_PlayButtonBackgroundImageUrl) {
                $Jssor$.$Css(_PlayCover, "backgrouondImage", _PlayButtonBackgroundImageUrl);
                _PlayButtonBackgroundImageUrl = null;
            }
            $Jssor$.$ShowElement(_PlayCover, _Entered);
        }
    }

    function EnterService(enter) {
        if (enter != _Entered) {
            _Entered = enter;
            UpdateUI();

            _Self.$TriggerEvent($JssorPlayer$.$EVT_SWITCH, enter, _Self);
        }
    }

    function IsPlaying() {
        return _ytPlayerState == 3 || _ytPlayerState == 5;
    }

    function AttachPlayerInstance() {

        if (!playerElement.pAvailable) {
            playerElement.pAvailable = true;
            playerElement.pInstance = _Self;

            $Jssor$.$FireEvent(playerElement, "dataavailable");

            _CloseButton && $Jssor$.$AddEvent(_CloseButton, "click", CloseButtonClickHandler);
            _PlayCover && $Jssor$.$AddEvent(_PlayCover, "click", QuitCoverClickEventHandler);

            _HideControls = $Jssor$.$ParseInt($Jssor$.$Attribute(playerInstanceElement, "pHideControls"));

            SyncSize();

            UpdateUI();

            if (_HideControls)
                DeliverMessage("command", { func: "hideUserInterface" });
        }
    }

    //event handling begin
    function YtiframeMessageEventHandler(event) {
        //"playerState":-1
        //unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).

        //"id":"ytiframe_0"
        //initialDelivery, infoDelivery, onReady, onStateChange
        if ((!_Disabled || !_FrameConnected) && event.data.indexOf(_MessageFrameId) > 0) {

            _FrameConnected = true;

            var match = /("playerState":)([+-]?[0-9]+)/i.exec(event.data);
            if (match) {
                var playerState = parseInt(match[2]) + 2;

                //if there is no instance attached to the player, attach this instance then
                //if (!_ytPlayerState) {
                //    AttachPlayerInstance();
                //}

                _ytPlayerState = playerState;

                if (IsPlaying())
                    EnterService(IsPlaying());
            }
        }
    }

    function CloseButtonClickHandler(event) {
        if (!_Disabled) {
            _Self.$Pause();
        }
    }

    function QuitCoverClickEventHandler(event) {
        if (!_Disabled) {
            _Self.$Play();
        }
    }
    //event handling end

    _Self.$Play = function () {
        EnterService(true);

        //call playVideo
        DeliverMessage("command", { func: "playVideo" });
    };

    _Self.$Pause = function () {
        EnterService(false);

        //call pauseVideo
        DeliverMessage("command", { func: "pauseVideo" });
    };

    _Self.$SeekTo = function (time, force) {
        DeliverMessage("command", { func: "seekTo", args: [time, force] });
    };

    _Self.$Enter = function () {
        //enter and make the player on service to audience
        _Self.$Play();
    };

    _Self.$Quit = function () {
        //quit and make the player off service to audience
        _Self.$Pause();
    };

    _Self.$Enable = function () {
        //enable player to allow audience act on 'quit cover' and 'close button'
        _Disabled = false;
    };

    _Self.$Disable = function () {
        //disable player to disallow audience act on 'quit cover' and 'close button'
        _Disabled = true;
    };

    _Self.$IsPlaying = IsPlaying;

    _Self.$IsEntered = IsPlaying;

    _Self.$Remove = function () {
        //unlisten window message
        $Jssor$.$RemoveEvent(window, "message", YtiframeMessageEventHandler);

        //to do prevent youtube player from posting message
        //to do remove this playerInstanceElement
    };

    _Self.$GetError = function () {
        //not implemented yet
        return null;
    };

    //constructor
    {
        $JssorDebug$.$Execute(function () {

            var playerWidthStr = playerElement.style.width;
            var playerHeightStr = playerElement.style.height;
            var playerWidth = $Jssor$.$CssWidth(playerElement);
            var playerHeight = $Jssor$.$CssHeight(playerElement);

            if (!playerWidthStr) {
                $JssorDebug$.$Fail("Youtube Video HTML definition error. 'width' of 'player' not specified. Please specify 'width' in pixel.");
            }

            if (!playerHeightStr) {
                $JssorDebug$.$Fail("Youtube Video HTML definition error. 'height' of player not specified. Please specify 'height' in pixel.");
            }

            if (playerWidthStr.indexOf('%') != -1) {
                $JssorDebug$.$Fail("Youtube Video HTML definition error. 'width' of 'outer container' invalid. Please specify 'width' in pixel.");
            }

            if (playerHeightStr.indexOf('%') != -1) {
                $JssorDebug$.$Fail("Youtube Video HTML definition error. 'height' of 'outer container' invalid. Please specify 'height' in pixel.");
            }

            if (playerInstanceElement.tagName != "IFRAME") {
                $JssorDebug$.$Fail("Youtube Video HTML definition error.\r\n'yt_iframe' handler can handle 'IFRAME' player only.");
            }
        });

        $Jssor$.$Attribute(playerInstanceElement, "src", $Jssor$.$Attribute(playerInstanceElement, "url"));

        playerInstanceElement.pInstance = _Self;

        _CloseButton = $Jssor$.$FindChild(playerElement, "close");
        _PlayCover = $Jssor$.$FindChild(playerElement, "cover");

        SyncSize();

        AttachPlayerInstance();

        if (!_NoPostMessage) {
            $Jssor$.$AddEvent(window, "message", YtiframeMessageEventHandler);
            ConnectYtiframe();
        }
    }
};
//{"event":"initialDelivery","info":{"apiInterface":["addEventListener","removeEventListener","showVideoInfo","hideVideoInfo","startAutoHideControls","stopAutoHideControls","updatePlaylist","hideUserInterface","showUserInterface","clearVideo","destroy","cuePlaylist","cueVideoById","cueVideoByUrl","getApiInterface","getAvailableQualityLevels","getCurrentTime","getDuration","getOption","getOptions","getPlaybackQuality","getPlayerState","getPlaylist","getPlaylistId","getPlaylistIndex","getVideoBytesLoaded","getVideoBytesTotal","getVideoLoadedFraction","getVideoEmbedCode","getVideoStartBytes","getVideoUrl","getVolume","isMuted","loadPlaylist","loadModule","loadVideoById","loadVideoByUrl","mute","nextVideo","pauseVideo","playVideo","playVideoAt","previousVideo","seekTo","setLoop","setOption","setPlaybackQuality","setShuffle","setSize","setVolume","stopVideo","unMute","addCueRange","removeCueRange","getDebugText","unloadModule","setPlaybackRate","getPlaybackRate","getAvailablePlaybackRates","cueVideoByFlashvars","loadVideoByFlashvars","cueVideoByPlayerVars","loadVideoByPlayerVars","preloadVideoByPlayerVars","updateVideoData","getCurrentHlsSequence","getLiveTime","getVideoData"],"availableQualityLevels":[],"currentTime":0,"duration":234,"option":null,"options":[],"playbackQuality":"small","playerState":-1,"playlist":null,"playlistId":null,"playlistIndex":-1,"videoBytesLoaded":0,"videoBytesTotal":0,"videoLoadedFraction":0,"videoEmbedCode":"<iframe width=\"640\" height=\"360\" src=\"//www.youtube.com/embed/8Af372EQLck?feature=player_embedded\" frameborder=\"0\" allowfullscreen></iframe>","videoStartBytes":0,"videoUrl":"http://www.youtube.com/watch?feature=player_embedded&v=8Af372EQLck","volume":100,"muted":false,"debugText":"cl=56660614&ts=1384438770&stageFps=24&debug%5FflashVersion=WIN%2011%2C8%2C800%2C94&debug%5Fdate=Fri%20Nov%2015%2011%3A47%3A59%20GMT%2B0800%202013&debug%5FvideoId=8Af372EQLck&droppedFrames=0&videoFps=0&debug%5FsourceData=&debug%5FplaybackQuality=small","playbackRate":1,"availablePlaybackRates":[1],"currentHlsSequence":null,"liveTime":0,"videoData":{"video_id":"8Af372EQLck"}},"id":"ytiframe_0"}
//youtube iframe video player handler end

//fetch and initialize all players within docyment.body
//$Jssor$.$AddEvent(window, "load", $Jssor$.$CreateCallback(null, $JssorPlayer$.$FetchPlayers, document.body));
//$JssorPlayer$.$FetchPlayers(document.body);

//youtube flash video player handler begin
//not ready
//youtube flash video player handler end

//html5 video player handler begin
//not ready
//html5 video player handler end

//vimeo video player handler begin
//not ready
//vimeo video player handler end