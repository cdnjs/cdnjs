/*!
  Copyright (c) Microsoft Corporation.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.
  Build: 4.4.2.winjs.2017.3.14
  Version: WinJS.4.4
*/

(function () {
    var globalObject =
        typeof window !== 'undefined' ? window :
        typeof self !== 'undefined' ? self :
        typeof global !== 'undefined' ? global :
        {};
    globalObject.strings = globalObject.strings || {};

    function addStrings(keyPrefix,  strings) {
        Object.keys(strings).forEach(function (key) {
            globalObject.strings[keyPrefix + key] = strings[key];
        });
    }
    addStrings("ms-resource:///Microsoft.WinJS/",
{
    "tv/scrollViewerPageDown": "Page Down",
    "tv/scrollViewerPageUp": "Page Up",
    "ui/appBarAriaLabel": "App Bar",
    "ui/appBarCommandAriaLabel": "App Bar Item",
    "ui/appBarOverflowButtonAriaLabel": "View more",
    "ui/autoSuggestBoxAriaLabel": "Autosuggestbox",
    "ui/autoSuggestBoxAriaLabelInputNoPlaceHolder": "Autosuggestbox, enter to submit query, esc to clear text",
    "ui/autoSuggestBoxAriaLabelInputPlaceHolder": "Autosuggestbox, {0}, enter to submit query, esc to clear text",
    "ui/autoSuggestBoxAriaLabelQuery": "Suggestion: {0}",
    "_ui/autoSuggestBoxAriaLabelQuery.comment": "Suggestion: query text (example: Suggestion: contoso)",
    "ui/autoSuggestBoxAriaLabelSeparator": "Separator: {0}",
    "_ui/autoSuggestBoxAriaLabelSeparator.comment": "Separator: separator text (example: Separator: People or Separator: Apps)",
    "ui/autoSuggestBoxAriaLabelResult": "Result: {0}, {1}",
    "_ui/autoSuggestBoxAriaLabelResult.comment": "Result: text, detailed text (example: Result: contoso, www.contoso.com)",
    "ui/averageRating": "Average Rating",
    "ui/backbuttonarialabel": "Back",
    "ui/chapterSkipBackMediaCommandDisplayText": "Chapter back",
    "ui/chapterSkipForwardMediaCommandDisplayText": "Chapter forward",
    "ui/clearYourRating": "Clear your rating",
    "ui/closedCaptionsLabelNone": "Off",
    "ui/closedCaptionsMediaCommandDisplayText": "Closed captioning",
    "ui/closeOverlay": "Close",
    "ui/commandingSurfaceAriaLabel": "CommandingSurface",
    "ui/commandingSurfaceOverflowButtonAriaLabel": "View more",
    "ui/datePicker": "Date Picker",
    "ui/fastForwardMediaCommandDisplayText": "Fast forward",
    "ui/fastForwardFeedbackDisplayText": " {0}X",
    "ui/fastForwardFeedbackSlowMotionDisplayText": "0.5X",
    "ui/flipViewPanningContainerAriaLabel": "Scrolling Container",
    "ui/flyoutAriaLabel": "Flyout",
    "ui/goToFullScreenButtonLabel": "Go full screen",
    "ui/goToLiveMediaCommandDisplayText": "LIVE",
    "ui/hubViewportAriaLabel": "Scrolling Container",
    "ui/listViewViewportAriaLabel": "Scrolling Container",
    "ui/mediaErrorAborted": "Playback was interrupted. Please try again.",
    "ui/mediaErrorNetwork": "There was a network connection error.",
    "ui/mediaErrorDecode": "The content could not be decoded",
    "ui/mediaErrorSourceNotSupported": "This content type is not supported.",
    "ui/mediaErrorUnknown": "There was an unknown error.",
    "ui/mediaPlayerAudioTracksButtonLabel": "Audio tracks",
    "ui/mediaPlayerCastButtonLabel": "Cast",
    "ui/mediaPlayerChapterSkipBackButtonLabel": "Previous",
    "ui/mediaPlayerChapterSkipForwardButtonLabel": "Next",
    "ui/mediaPlayerClosedCaptionsButtonLabel": "Closed captions",
    "ui/mediaPlayerFastForwardButtonLabel": "Fast forward",
    "ui/mediaPlayerFullscreenButtonLabel": "Fullscreen",
    "ui/mediaPlayerLiveButtonLabel": "LIVE",
    "ui/mediaPlayerNextTrackButtonLabel": "Next",
    "ui/mediaPlayerOverlayActiveOptionIndicator": "(On)",
    "ui/mediaPlayerPauseButtonLabel": "Pause",
    "ui/mediaPlayerPlayButtonLabel": "Play",
    "ui/mediaPlayerPlayFromBeginningButtonLabel": "Replay",
    "ui/mediaPlayerPlayRateButtonLabel": "Playback rate",
    "ui/mediaPlayerPreviousTrackButtonLabel": "Previous",
    "ui/mediaPlayerRewindButtonLabel": "Rewind",
    "ui/mediaPlayerStopButtonLabel": "Stop",
    "ui/mediaPlayerTimeSkipBackButtonLabel": "8 second replay",   
    "ui/mediaPlayerTimeSkipForwardButtonLabel": "30 second skip",
    "ui/mediaPlayerToggleSnapButtonLabel": "Snap",
    "ui/mediaPlayerVolumeButtonLabel": "Volume",
    "ui/mediaPlayerZoomButtonLabel": "Zoom",
    "ui/menuCommandAriaLabel": "Menu Item",
    "ui/menuAriaLabel": "Menu",
    "ui/navBarContainerViewportAriaLabel": "Scrolling Container",
    "ui/nextTrackMediaCommandDisplayText": "Next track",
    "ui/off": "Off",
    "ui/on": "On",
    "ui/pauseMediaCommandDisplayText": "Pause",
    "ui/playFromBeginningMediaCommandDisplayText": "Play again",
    "ui/playbackRateHalfSpeedLabel": "0.5x",
    "ui/playbackRateNormalSpeedLabel": "Normal",
    "ui/playbackRateOneAndHalfSpeedLabel": "1.5x",
    "ui/playbackRateDoubleSpeedLabel": "2x",
    "ui/playMediaCommandDisplayText": "Play",
    "ui/pivotAriaLabel": "Pivot",
    "ui/pivotViewportAriaLabel": "Scrolling Container",
    "ui/replayMediaCommandDisplayText": "Play again",
    "ui/rewindMediaCommandDisplayText": "Rewind",
    "ui/rewindFeedbackDisplayText": " {0}X",
    "ui/rewindFeedbackSlowMotionDisplayText": "0.5X",
    "ui/searchBoxAriaLabel": "Searchbox",
    "ui/searchBoxAriaLabelInputNoPlaceHolder": "Searchbox, enter to submit query, esc to clear text",
    "ui/searchBoxAriaLabelInputPlaceHolder": "Searchbox, {0}, enter to submit query, esc to clear text",
    "ui/searchBoxAriaLabelButton": "Click to submit query",
    "ui/seeMore":  "See more",
    "ui/selectAMPM": "Select A.M P.M",
    "ui/selectDay": "Select Day",
    "ui/selectHour": "Select Hour",
    "ui/selectMinute": "Select Minute",
    "ui/selectMonth": "Select Month",
    "ui/selectYear": "Select Year",
    "ui/settingsFlyoutAriaLabel": "Settings Flyout",
    "ui/stopMediaCommandDisplayText": "Stop",
    "ui/tentativeRating": "Tentative Rating",
    "ui/timePicker": "Time Picker",
    "ui/timeSeparator": ":",
    "ui/timeSkipBackMediaCommandDisplayText": "Skip back",
    "ui/timeSkipForwardMediaCommandDisplayText": "Skip forward",
    "ui/toolbarAriaLabel": "ToolBar",
    "ui/toolbarOverflowButtonAriaLabel": "View more",
    "ui/unrated": "Unrated",
    "ui/userRating": "User Rating",
    "ui/zoomMediaCommandDisplayText": "Zoom",
    // AppBar Icons follow, the format of the ui.js and ui.resjson differ for
    // the AppBarIcon namespace.  The remainder of the file therefore differs.
    // Code point comments are the icon glyphs in the 'Segoe UI Symbol' font.
    "ui/appBarIcons/previous":                            "\uE100", // group:Media
    "_ui/appBarIcons/previous.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/next":                                "\uE101", // group:Media
    "_ui/appBarIcons/next.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/play":                                "\uE102", // group:Media
    "_ui/appBarIcons/play.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/pause":                               "\uE103", // group:Media
    "_ui/appBarIcons/pause.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/edit":                                "\uE104", // group:File
    "_ui/appBarIcons/edit.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/save":                                "\uE105", // group:File
    "_ui/appBarIcons/save.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/clear":                               "\uE106", // group:File
    "_ui/appBarIcons/clear.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/delete":                              "\uE107", // group:File
    "_ui/appBarIcons/delete.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/remove":                              "\uE108", // group:File
    "_ui/appBarIcons/remove.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/add":                                 "\uE109", // group:File
    "_ui/appBarIcons/add.comment":                        "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/cancel":                              "\uE10A", // group:Editing
    "_ui/appBarIcons/cancel.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/accept":                              "\uE10B", // group:General
    "_ui/appBarIcons/accept.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/more":                                "\uE10C", // group:General
    "_ui/appBarIcons/more.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/redo":                                "\uE10D", // group:Editing
    "_ui/appBarIcons/redo.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/undo":                                "\uE10E", // group:Editing
    "_ui/appBarIcons/undo.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/home":                                "\uE10F", // group:General
    "_ui/appBarIcons/home.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/up":                                  "\uE110", // group:General
    "_ui/appBarIcons/up.comment":                         "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/forward":                             "\uE111", // group:General
    "_ui/appBarIcons/forward.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/right":                               "\uE111", // group:General
    "_ui/appBarIcons/right.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/back":                                "\uE112", // group:General
    "_ui/appBarIcons/back.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/left":                                "\uE112", // group:General
    "_ui/appBarIcons/left.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/favorite":                            "\uE113", // group:Media
    "_ui/appBarIcons/favorite.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/camera":                              "\uE114", // group:System
    "_ui/appBarIcons/camera.comment":                     "{Locked=qps-ploc,qps-plocm}",    
    "ui/appBarIcons/settings":                            "\uE115", // group:System
    "_ui/appBarIcons/settings.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/video":                               "\uE116", // group:Media
    "_ui/appBarIcons/video.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/sync":                                "\uE117", // group:Media
    "_ui/appBarIcons/sync.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/download":                            "\uE118", // group:Media
    "_ui/appBarIcons/download.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/mail":                                "\uE119", // group:Mail and calendar
    "_ui/appBarIcons/mail.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/find":                                "\uE11A", // group:Data
    "_ui/appBarIcons/find.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/help":                                "\uE11B", // group:General
    "_ui/appBarIcons/help.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/upload":                              "\uE11C", // group:Media
    "_ui/appBarIcons/upload.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/emoji":                               "\uE11D", // group:Communications
    "_ui/appBarIcons/emoji.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/twopage":                             "\uE11E", // group:Layout
    "_ui/appBarIcons/twopage.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/leavechat":                           "\uE11F", // group:Communications
    "_ui/appBarIcons/leavechat.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/mailforward":                         "\uE120", // group:Mail and calendar
    "_ui/appBarIcons/mailforward.comment":                "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/clock":                               "\uE121", // group:General
    "_ui/appBarIcons/clock.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/send":                                "\uE122", // group:Mail and calendar
    "_ui/appBarIcons/send.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/crop":                                "\uE123", // group:Editing
    "_ui/appBarIcons/crop.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/rotatecamera":                        "\uE124", // group:System
    "_ui/appBarIcons/rotatecamera.comment":               "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/people":                              "\uE125", // group:Communications
    "_ui/appBarIcons/people.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/closepane":                           "\uE126", // group:Layout
    "_ui/appBarIcons/closepane.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/openpane":                            "\uE127", // group:Layout
    "_ui/appBarIcons/openpane.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/world":                               "\uE128", // group:General
    "_ui/appBarIcons/world.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/flag":                                "\uE129", // group:Mail and calendar
    "_ui/appBarIcons/flag.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/previewlink":                         "\uE12A", // group:General
    "_ui/appBarIcons/previewlink.comment":                "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/globe":                               "\uE12B", // group:Communications
    "_ui/appBarIcons/globe.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/trim":                                "\uE12C", // group:Editing
    "_ui/appBarIcons/trim.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/attachcamera":                        "\uE12D", // group:System
    "_ui/appBarIcons/attachcamera.comment":               "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/zoomin":                              "\uE12E", // group:Layout
    "_ui/appBarIcons/zoomin.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/bookmarks":                           "\uE12F", // group:Editing
    "_ui/appBarIcons/bookmarks.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/document":                            "\uE130", // group:File
    "_ui/appBarIcons/document.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/protecteddocument":                   "\uE131", // group:File
    "_ui/appBarIcons/protecteddocument.comment":          "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/page":                                "\uE132", // group:Layout
    "_ui/appBarIcons/page.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/bullets":                             "\uE133", // group:Editing
    "_ui/appBarIcons/bullets.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/comment":                             "\uE134", // group:Communications
    "_ui/appBarIcons/comment.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/mail2":                               "\uE135", // group:Mail and calendar
    "_ui/appBarIcons/mail2.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/contactinfo":                         "\uE136", // group:Communications
    "_ui/appBarIcons/contactinfo.comment":                "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/hangup":                              "\uE137", // group:Communications
    "_ui/appBarIcons/hangup.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/viewall":                             "\uE138", // group:Data
    "_ui/appBarIcons/viewall.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/mappin":                              "\uE139", // group:General
    "_ui/appBarIcons/mappin.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/phone":                               "\uE13A", // group:Communications
    "_ui/appBarIcons/phone.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/videochat":                           "\uE13B", // group:Communications
    "_ui/appBarIcons/videochat.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/switch":                              "\uE13C", // group:Communications
    "_ui/appBarIcons/switch.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/contact":                             "\uE13D", // group:Communications
    "_ui/appBarIcons/contact.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/rename":                              "\uE13E", // group:File
    "_ui/appBarIcons/rename.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/pin":                                 "\uE141", // group:System
    "_ui/appBarIcons/pin.comment":                        "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/musicinfo":                           "\uE142", // group:Media
    "_ui/appBarIcons/musicinfo.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/go":                                  "\uE143", // group:General
    "_ui/appBarIcons/go.comment":                         "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/keyboard":                            "\uE144", // group:System
    "_ui/appBarIcons/keyboard.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/dockleft":                            "\uE145", // group:Layout
    "_ui/appBarIcons/dockleft.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/dockright":                           "\uE146", // group:Layout
    "_ui/appBarIcons/dockright.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/dockbottom":                          "\uE147", // group:Layout
    "_ui/appBarIcons/dockbottom.comment":                 "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/remote":                              "\uE148", // group:System
    "_ui/appBarIcons/remote.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/refresh":                             "\uE149", // group:Data
    "_ui/appBarIcons/refresh.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/rotate":                              "\uE14A", // group:Layout
    "_ui/appBarIcons/rotate.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/shuffle":                             "\uE14B", // group:Media
    "_ui/appBarIcons/shuffle.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/list":                                "\uE14C", // group:Editing
    "_ui/appBarIcons/list.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/shop":                                "\uE14D", // group:General
    "_ui/appBarIcons/shop.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/selectall":                           "\uE14E", // group:Data
    "_ui/appBarIcons/selectall.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/orientation":                         "\uE14F", // group:Layout
    "_ui/appBarIcons/orientation.comment":                "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/import":                              "\uE150", // group:Data
    "_ui/appBarIcons/import.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/importall":                           "\uE151", // group:Data
    "_ui/appBarIcons/importall.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/browsephotos":                        "\uE155", // group:Media
    "_ui/appBarIcons/browsephotos.comment":               "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/webcam":                              "\uE156", // group:System
    "_ui/appBarIcons/webcam.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/pictures":                            "\uE158", // group:Media
    "_ui/appBarIcons/pictures.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/savelocal":                           "\uE159", // group:File
    "_ui/appBarIcons/savelocal.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/caption":                             "\uE15A", // group:Media
    "_ui/appBarIcons/caption.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/stop":                                "\uE15B", // group:Media
    "_ui/appBarIcons/stop.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/showresults":                         "\uE15C", // group:Data
    "_ui/appBarIcons/showresults.comment":                "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/volume":                              "\uE15D", // group:Media
    "_ui/appBarIcons/volume.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/repair":                              "\uE15E", // group:System
    "_ui/appBarIcons/repair.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/message":                             "\uE15F", // group:Communications
    "_ui/appBarIcons/message.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/page2":                               "\uE160", // group:Layout
    "_ui/appBarIcons/page2.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/calendarday":                         "\uE161", // group:Mail and calendar
    "_ui/appBarIcons/calendarday.comment":                "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/calendarweek":                        "\uE162", // group:Mail and calendar
    "_ui/appBarIcons/calendarweek.comment":               "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/calendar":                            "\uE163", // group:Mail and calendar
    "_ui/appBarIcons/calendar.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/characters":                          "\uE164", // group:Editing
    "_ui/appBarIcons/characters.comment":                 "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/mailreplyall":                        "\uE165", // group:Mail and calendar
    "_ui/appBarIcons/mailreplyall.comment":               "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/read":                                "\uE166", // group:Mail and calendar
    "_ui/appBarIcons/read.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/link":                                "\uE167", // group:Communications
    "_ui/appBarIcons/link.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/accounts":                            "\uE168", // group:Communications
    "_ui/appBarIcons/accounts.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/showbcc":                             "\uE169", // group:Mail and calendar
    "_ui/appBarIcons/showbcc.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/hidebcc":                             "\uE16A", // group:Mail and calendar
    "_ui/appBarIcons/hidebcc.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/cut":                                 "\uE16B", // group:Editing
    "_ui/appBarIcons/cut.comment":                        "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/attach":                              "\uE16C", // group:Mail and calendar
    "_ui/appBarIcons/attach.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/paste":                               "\uE16D", // group:Editing
    "_ui/appBarIcons/paste.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/filter":                              "\uE16E", // group:Data
    "_ui/appBarIcons/filter.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/copy":                                "\uE16F", // group:Editing
    "_ui/appBarIcons/copy.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/emoji2":                              "\uE170", // group:Mail and calendar
    "_ui/appBarIcons/emoji2.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/important":                           "\uE171", // group:Mail and calendar
    "_ui/appBarIcons/important.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/mailreply":                           "\uE172", // group:Mail and calendar
    "_ui/appBarIcons/mailreply.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/slideshow":                           "\uE173", // group:Media
    "_ui/appBarIcons/slideshow.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/sort":                                "\uE174", // group:Data
    "_ui/appBarIcons/sort.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/manage":                              "\uE178", // group:System
    "_ui/appBarIcons/manage.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/allapps":                             "\uE179", // group:System
    "_ui/appBarIcons/allapps.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/disconnectdrive":                     "\uE17A", // group:System
    "_ui/appBarIcons/disconnectdrive.comment":            "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/mapdrive":                            "\uE17B", // group:System
    "_ui/appBarIcons/mapdrive.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/newwindow":                           "\uE17C", // group:System
    "_ui/appBarIcons/newwindow.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/openwith":                            "\uE17D", // group:System
    "_ui/appBarIcons/openwith.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/contactpresence":                     "\uE181", // group:Communications
    "_ui/appBarIcons/contactpresence.comment":            "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/priority":                            "\uE182", // group:Mail and calendar
    "_ui/appBarIcons/priority.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/uploadskydrive":                      "\uE183", // group:File
    "_ui/appBarIcons/uploadskydrive.comment":             "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/gototoday":                           "\uE184", // group:Mail and calendar
    "_ui/appBarIcons/gototoday.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/font":                                "\uE185", // group:Editing
    "_ui/appBarIcons/font.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/fontcolor":                           "\uE186", // group:Editing
    "_ui/appBarIcons/fontcolor.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/contact2":                            "\uE187", // group:Communications
    "_ui/appBarIcons/contact2.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/folder":                              "\uE188", // group:File
    "_ui/appBarIcons/folder.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/audio":                               "\uE189", // group:Media
    "_ui/appBarIcons/audio.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/placeholder":                         "\uE18A", // group:General
    "_ui/appBarIcons/placeholder.comment":                "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/view":                                "\uE18B", // group:Layout
    "_ui/appBarIcons/view.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/setlockscreen":                       "\uE18C", // group:System
    "_ui/appBarIcons/setlockscreen.comment":              "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/settile":                             "\uE18D", // group:System
    "_ui/appBarIcons/settile.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/cc":                                  "\uE190", // group:Media
    "_ui/appBarIcons/cc.comment":                         "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/stopslideshow":                       "\uE191", // group:Media
    "_ui/appBarIcons/stopslideshow.comment":              "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/permissions":                         "\uE192", // group:System
    "_ui/appBarIcons/permissions.comment":                "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/highlight":                           "\uE193", // group:Editing
    "_ui/appBarIcons/highlight.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/disableupdates":                      "\uE194", // group:System
    "_ui/appBarIcons/disableupdates.comment":             "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/unfavorite":                          "\uE195", // group:Media
    "_ui/appBarIcons/unfavorite.comment":                 "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/unpin":                               "\uE196", // group:System
    "_ui/appBarIcons/unpin.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/openlocal":                           "\uE197", // group:File
    "_ui/appBarIcons/openlocal.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/mute":                                "\uE198", // group:Media
    "_ui/appBarIcons/mute.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/italic":                              "\uE199", // group:Editing
    "_ui/appBarIcons/italic.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/underline":                           "\uE19A", // group:Editing
    "_ui/appBarIcons/underline.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/bold":                                "\uE19B", // group:Editing
    "_ui/appBarIcons/bold.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/movetofolder":                        "\uE19C", // group:File
    "_ui/appBarIcons/movetofolder.comment":               "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/likedislike":                         "\uE19D", // group:Data
    "_ui/appBarIcons/likedislike.comment":                "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/dislike":                             "\uE19E", // group:Data
    "_ui/appBarIcons/dislike.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/like":                                "\uE19F", // group:Data
    "_ui/appBarIcons/like.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/alignright":                          "\uE1A0", // group:Editing
    "_ui/appBarIcons/alignright.comment":                 "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/aligncenter":                         "\uE1A1", // group:Editing
    "_ui/appBarIcons/aligncenter.comment":                "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/alignleft":                           "\uE1A2", // group:Editing
    "_ui/appBarIcons/alignleft.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/zoom":                                "\uE1A3", // group:Layout
    "_ui/appBarIcons/zoom.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/zoomout":                             "\uE1A4", // group:Layout
    "_ui/appBarIcons/zoomout.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/openfile":                            "\uE1A5", // group:File
    "_ui/appBarIcons/openfile.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/otheruser":                           "\uE1A6", // group:System
    "_ui/appBarIcons/otheruser.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/admin":                               "\uE1A7", // group:System
    "_ui/appBarIcons/admin.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/street":                              "\uE1C3", // group:General
    "_ui/appBarIcons/street.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/map":                                 "\uE1C4", // group:General
    "_ui/appBarIcons/map.comment":                        "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/clearselection":                      "\uE1C5", // group:Data
    "_ui/appBarIcons/clearselection.comment":             "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/fontdecrease":                        "\uE1C6", // group:Editing
    "_ui/appBarIcons/fontdecrease.comment":               "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/fontincrease":                        "\uE1C7", // group:Editing
    "_ui/appBarIcons/fontincrease.comment":               "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/fontsize":                            "\uE1C8", // group:Editing
    "_ui/appBarIcons/fontsize.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/cellphone":                           "\uE1C9", // group:Communications
    "_ui/appBarIcons/cellphone.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/print":                               "\uE749", // group:Communications
    "_ui/appBarIcons/print.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/share":                               "\uE72D", // group:Communications
    "_ui/appBarIcons/share.comment":                      "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/reshare":                             "\uE1CA", // group:Communications
    "_ui/appBarIcons/reshare.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/tag":                                 "\uE1CB", // group:Data
    "_ui/appBarIcons/tag.comment":                        "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/repeatone":                           "\uE1CC", // group:Media
    "_ui/appBarIcons/repeatone.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/repeatall":                           "\uE1CD", // group:Media
    "_ui/appBarIcons/repeatall.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/outlinestar":                         "\uE1CE", // group:Data
    "_ui/appBarIcons/outlinestar.comment":                "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/solidstar":                           "\uE1CF", // group:Data
    "_ui/appBarIcons/solidstar.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/calculator":                          "\uE1D0", // group:General
    "_ui/appBarIcons/calculator.comment":                 "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/directions":                          "\uE1D1", // group:General
    "_ui/appBarIcons/directions.comment":                 "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/target":                              "\uE1D2", // group:General
    "_ui/appBarIcons/target.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/library":                             "\uE1D3", // group:Media
    "_ui/appBarIcons/library.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/phonebook":                           "\uE1D4", // group:Communications
    "_ui/appBarIcons/phonebook.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/memo":                                "\uE1D5", // group:Communications
    "_ui/appBarIcons/memo.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/microphone":                          "\uE1D6", // group:System
    "_ui/appBarIcons/microphone.comment":                 "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/postupdate":                          "\uE1D7", // group:Communications
    "_ui/appBarIcons/postupdate.comment":                 "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/backtowindow":                        "\uE1D8", // group:Layout
    "_ui/appBarIcons/backtowindow.comment":               "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/fullscreen":                          "\uE1D9", // group:Layout
    "_ui/appBarIcons/fullscreen.comment":                 "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/newfolder":                           "\uE1DA", // group:File
    "_ui/appBarIcons/newfolder.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/calendarreply":                       "\uE1DB", // group:Mail and calendar
    "_ui/appBarIcons/calendarreply.comment":              "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/unsyncfolder":                        "\uE1DD", // group:File
    "_ui/appBarIcons/unsyncfolder.comment":               "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/reporthacked":                        "\uE1DE", // group:Communications
    "_ui/appBarIcons/reporthacked.comment":               "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/syncfolder":                          "\uE1DF", // group:File
    "_ui/appBarIcons/syncfolder.comment":                 "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/blockcontact":                        "\uE1E0", // group:Communications
    "_ui/appBarIcons/blockcontact.comment":               "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/switchapps":                          "\uE1E1", // group:System
    "_ui/appBarIcons/switchapps.comment":                 "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/addfriend":                           "\uE1E2", // group:Communications
    "_ui/appBarIcons/addfriend.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/touchpointer":                        "\uE1E3", // group:System
    "_ui/appBarIcons/touchpointer.comment":               "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/gotostart":                           "\uE1E4", // group:System
    "_ui/appBarIcons/gotostart.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/zerobars":                            "\uE1E5", // group:System
    "_ui/appBarIcons/zerobars.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/onebar":                              "\uE1E6", // group:System
    "_ui/appBarIcons/onebar.comment":                     "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/twobars":                             "\uE1E7", // group:System
    "_ui/appBarIcons/twobars.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/threebars":                           "\uE1E8", // group:System
    "_ui/appBarIcons/threebars.comment":                  "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/fourbars":                            "\uE1E9", // group:System
    "_ui/appBarIcons/fourbars.comment":                   "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/scan":                                "\uE294", // group:General
    "_ui/appBarIcons/scan.comment":                       "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/preview":                             "\uE295", // group:General
    "_ui/appBarIcons/preview.comment":                    "{Locked=qps-ploc,qps-plocm}",
    "ui/appBarIcons/hamburger":                           "\uE700", // group:General
    "_ui/appBarIcons/hamburger.comment":                  "{Locked=qps-ploc,qps-plocm}"
}

);
}());