/// <reference path="Jssor.Core.js" />
/// <reference path="Jssor.Utils.js" />

/*
* Jssor.Slider 17.0
* http://www.jssor.com/
* 
* TERMS OF USE - Jssor.Slider
* 
* Copyright 2014 Jssor
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var $JssorSlider$;
var $JssorSlideshowFormations$ = window.$JssorSlideshowFormations$ = {};
var $JssorSlideshowRunner$;

new function () {
    //Constants +++++++

    var COLUMN_INCREASE = 0;
    var COLUMN_DECREASE = 1;
    var ROW_INCREASE = 2;
    var ROW_DECREASE = 3;

    var DIRECTION_HORIZONTAL = 0x0003;
    var DIRECTION_VERTICAL = 0x000C;

    var TO_LEFT = 0x0001;
    var TO_RIGHT = 0x0002;
    var TO_TOP = 0x0004;
    var TO_BOTTOM = 0x0008;

    var FROM_LEFT = 0x0100;
    var FROM_TOP = 0x0200;
    var FROM_RIGHT = 0x0400;
    var FROM_BOTTOM = 0x0800;

    var ASSEMBLY_BOTTOM_LEFT = FROM_BOTTOM + TO_LEFT;
    var ASSEMBLY_BOTTOM_RIGHT = FROM_BOTTOM + TO_RIGHT;
    var ASSEMBLY_TOP_LEFT = FROM_TOP + TO_LEFT;
    var ASSEMBLY_TOP_RIGHT = FROM_TOP + TO_RIGHT;
    var ASSEMBLY_LEFT_TOP = FROM_LEFT + TO_TOP;
    var ASSEMBLY_LEFT_BOTTOM = FROM_LEFT + TO_BOTTOM;
    var ASSEMBLY_RIGHT_TOP = FROM_RIGHT + TO_TOP;
    var ASSEMBLY_RIGHT_BOTTOM = FROM_RIGHT + TO_BOTTOM;

    //Constants -------

    //Formation Definition +++++++
    function isToLeft(roadValue) {
        return (roadValue & TO_LEFT) == TO_LEFT;
    }

    function isToRight(roadValue) {
        return (roadValue & TO_RIGHT) == TO_RIGHT;
    }

    function isToTop(roadValue) {
        return (roadValue & TO_TOP) == TO_TOP;
    }

    function isToBottom(roadValue) {
        return (roadValue & TO_BOTTOM) == TO_BOTTOM;
    }

    function PushFormationOrder(arr, order, formationItem) {
        formationItem.push(order);
        arr[order] = arr[order] || [];
        arr[order].push(formationItem);
    }

    $JssorSlideshowFormations$.$FormationStraight = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        var order;
        for (r = 0; r < rows; r++) {
            for (col = 0; col < cols; col++) {
                cr = r + ',' + col;
                switch (formationDirection) {
                    case ASSEMBLY_BOTTOM_LEFT:
                        order = il - (col * rows + (rl - r));
                        break;
                    case ASSEMBLY_RIGHT_TOP:
                        order = il - (r * cols + (cl - col));
                        break;
                    case ASSEMBLY_TOP_LEFT:
                        order = il - (col * rows + r);
                    case ASSEMBLY_LEFT_TOP:
                        order = il - (r * cols + col);
                        break;
                    case ASSEMBLY_BOTTOM_RIGHT:
                        order = col * rows + r;
                        break;
                    case ASSEMBLY_LEFT_BOTTOM:
                        order = r * cols + (cl - col);
                        break;
                    case ASSEMBLY_TOP_RIGHT:
                        order = col * rows + (rl - r);
                        break;
                    default:
                        order = r * cols + col;
                        break; //ASSEMBLY_RIGHT_BOTTOM
                }
                PushFormationOrder(a, order, [r, col]);
            }
        }

        return a;
    };

    $JssorSlideshowFormations$.$FormationSwirl = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var hit = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        var courses;
        var course = 0;
        switch (formationDirection) {
            case ASSEMBLY_BOTTOM_LEFT:
                col = cl;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_DECREASE, ROW_DECREASE, COLUMN_INCREASE];
                break;
            case ASSEMBLY_RIGHT_TOP:
                col = 0;
                r = rl;
                courses = [COLUMN_INCREASE, ROW_DECREASE, COLUMN_DECREASE, ROW_INCREASE];
                break;
            case ASSEMBLY_TOP_LEFT:
                col = cl;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_DECREASE, ROW_INCREASE, COLUMN_INCREASE];
                break;
            case ASSEMBLY_LEFT_TOP:
                col = cl;
                r = rl;
                courses = [COLUMN_DECREASE, ROW_DECREASE, COLUMN_INCREASE, ROW_INCREASE];
                break;
            case ASSEMBLY_BOTTOM_RIGHT:
                col = 0;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_INCREASE, ROW_DECREASE, COLUMN_DECREASE];
                break;
            case ASSEMBLY_LEFT_BOTTOM:
                col = cl;
                r = 0;
                courses = [COLUMN_DECREASE, ROW_INCREASE, COLUMN_INCREASE, ROW_DECREASE];
                break;
            case ASSEMBLY_TOP_RIGHT:
                col = 0;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_INCREASE, ROW_INCREASE, COLUMN_DECREASE];
                break;
            default:
                col = 0;
                r = 0;
                courses = [COLUMN_INCREASE, ROW_INCREASE, COLUMN_DECREASE, ROW_DECREASE];
                break; //ASSEMBLY_RIGHT_BOTTOM
        }
        i = 0;
        while (i < count) {
            cr = r + ',' + col;
            if (col >= 0 && col < cols && r >= 0 && r < rows && !hit[cr]) {
                //a[cr] = i++;
                hit[cr] = true;
                PushFormationOrder(a, i++, [r, col]);
            }
            else {
                switch (courses[course++ % courses.length]) {
                    case COLUMN_INCREASE:
                        col--;
                        break;
                    case ROW_INCREASE:
                        r--;
                        break;
                    case COLUMN_DECREASE:
                        col++;
                        break;
                    case ROW_DECREASE:
                        r++;
                        break;
                }
            }

            switch (courses[course % courses.length]) {
                case COLUMN_INCREASE:
                    col++;
                    break;
                case ROW_INCREASE:
                    r++;
                    break;
                case COLUMN_DECREASE:
                    col--;
                    break;
                case ROW_DECREASE:
                    r--;
                    break;
            }
        }
        return a;
    };

    $JssorSlideshowFormations$.$FormationZigZag = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        var courses;
        var course = 0;
        switch (formationDirection) {
            case ASSEMBLY_BOTTOM_LEFT:
                col = cl;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_DECREASE, ROW_DECREASE, COLUMN_DECREASE];
                break;
            case ASSEMBLY_RIGHT_TOP:
                col = 0;
                r = rl;
                courses = [COLUMN_INCREASE, ROW_DECREASE, COLUMN_DECREASE, ROW_DECREASE];
                break;
            case ASSEMBLY_TOP_LEFT:
                col = cl;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_DECREASE, ROW_INCREASE, COLUMN_DECREASE];
                break;
            case ASSEMBLY_LEFT_TOP:
                col = cl;
                r = rl;
                courses = [COLUMN_DECREASE, ROW_DECREASE, COLUMN_INCREASE, ROW_DECREASE];
                break;
            case ASSEMBLY_BOTTOM_RIGHT:
                col = 0;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_INCREASE, ROW_DECREASE, COLUMN_INCREASE];
                break;
            case ASSEMBLY_LEFT_BOTTOM:
                col = cl;
                r = 0;
                courses = [COLUMN_DECREASE, ROW_INCREASE, COLUMN_INCREASE, ROW_INCREASE];
                break;
            case ASSEMBLY_TOP_RIGHT:
                col = 0;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_INCREASE, ROW_INCREASE, COLUMN_INCREASE];
                break;
            default:
                col = 0;
                r = 0;
                courses = [COLUMN_INCREASE, ROW_INCREASE, COLUMN_DECREASE, ROW_INCREASE];
                break; //ASSEMBLY_RIGHT_BOTTOM
        }
        i = 0;
        while (i < count) {
            cr = r + ',' + col;
            if (col >= 0 && col < cols && r >= 0 && r < rows && typeof (a[cr]) == 'undefined') {
                PushFormationOrder(a, i++, [r, col]);
                //a[cr] = i++;
                switch (courses[course % courses.length]) {
                    case COLUMN_INCREASE:
                        col++;
                        break;
                    case ROW_INCREASE:
                        r++;
                        break;
                    case COLUMN_DECREASE:
                        col--;
                        break;
                    case ROW_DECREASE:
                        r--;
                        break;
                }
            }
            else {
                switch (courses[course++ % courses.length]) {
                    case COLUMN_INCREASE:
                        col--;
                        break;
                    case ROW_INCREASE:
                        r--;
                        break;
                    case COLUMN_DECREASE:
                        col++;
                        break;
                    case ROW_DECREASE:
                        r++;
                        break;
                }
                switch (courses[course++ % courses.length]) {
                    case COLUMN_INCREASE:
                        col++;
                        break;
                    case ROW_INCREASE:
                        r++;
                        break;
                    case COLUMN_DECREASE:
                        col--;
                        break;
                    case ROW_DECREASE:
                        r--;
                        break;
                }
            }
        }
        return a;
    };

    $JssorSlideshowFormations$.$FormationStraightStairs = function (transition) {
        var cols = transition.$Cols;
        var rows = transition.$Rows;
        var formationDirection = transition.$Assembly;
        var count = transition.$Count;
        var a = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        switch (formationDirection) {
            case ASSEMBLY_BOTTOM_LEFT:
            case ASSEMBLY_TOP_RIGHT:
            case ASSEMBLY_TOP_LEFT:
            case ASSEMBLY_BOTTOM_RIGHT:
                var C = 0;
                var R = 0;
                break;
            case ASSEMBLY_LEFT_BOTTOM:
            case ASSEMBLY_RIGHT_TOP:
            case ASSEMBLY_LEFT_TOP:
            case ASSEMBLY_RIGHT_BOTTOM:
                var C = cl;
                var R = 0;
                break;
            default:
                formationDirection = ASSEMBLY_RIGHT_BOTTOM;
                var C = cl;
                var R = 0;
                break;
        }
        col = C;
        r = R;
        while (i < count) {
            cr = r + ',' + col;
            if (isToTop(formationDirection) || isToRight(formationDirection)) {
                PushFormationOrder(a, il - i++, [r, col]);
                //a[cr] = il - i++;
            }
            else {
                PushFormationOrder(a, i++, [r, col]);
                //a[cr] = i++;
            }
            switch (formationDirection) {
                case ASSEMBLY_BOTTOM_LEFT:
                case ASSEMBLY_TOP_RIGHT:
                    col--;
                    r++;
                    break;
                case ASSEMBLY_TOP_LEFT:
                case ASSEMBLY_BOTTOM_RIGHT:
                    col++;
                    r--;
                    break;
                case ASSEMBLY_LEFT_BOTTOM:
                case ASSEMBLY_RIGHT_TOP:
                    col--;
                    r--;
                    break;
                case ASSEMBLY_RIGHT_BOTTOM:
                case ASSEMBLY_LEFT_TOP:
                default:
                    col++;
                    r++;
                    break;
            }
            if (col < 0 || r < 0 || col > cl || r > rl) {
                switch (formationDirection) {
                    case ASSEMBLY_BOTTOM_LEFT:
                    case ASSEMBLY_TOP_RIGHT:
                        C++;
                        break;
                    case ASSEMBLY_LEFT_BOTTOM:
                    case ASSEMBLY_RIGHT_TOP:
                    case ASSEMBLY_TOP_LEFT:
                    case ASSEMBLY_BOTTOM_RIGHT:
                        R++;
                        break;
                    case ASSEMBLY_RIGHT_BOTTOM:
                    case ASSEMBLY_LEFT_TOP:
                    default:
                        C--;
                        break;
                }
                if (C < 0 || R < 0 || C > cl || R > rl) {
                    switch (formationDirection) {
                        case ASSEMBLY_BOTTOM_LEFT:
                        case ASSEMBLY_TOP_RIGHT:
                            C = cl;
                            R++;
                            break;
                        case ASSEMBLY_TOP_LEFT:
                        case ASSEMBLY_BOTTOM_RIGHT:
                            R = rl;
                            C++;
                            break;
                        case ASSEMBLY_LEFT_BOTTOM:
                        case ASSEMBLY_RIGHT_TOP: R = rl; C--;
                            break;
                        case ASSEMBLY_RIGHT_BOTTOM:
                        case ASSEMBLY_LEFT_TOP:
                        default:
                            C = 0;
                            R++;
                            break;
                    }
                    if (R > rl)
                        R = rl;
                    else if (R < 0)
                        R = 0;
                    else if (C > cl)
                        C = cl;
                    else if (C < 0)
                        C = 0;
                }
                r = R;
                col = C;
            }
        }
        return a;
    };

    $JssorSlideshowFormations$.$FormationSquare = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var dc;
        var dr;
        var cr;
        dc = cols < rows ? (rows - cols) / 2 : 0;
        dr = cols > rows ? (cols - rows) / 2 : 0;
        cr = Math.round(Math.max(cols / 2, rows / 2)) + 1;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, cr - Math.min(col + 1 + dc, r + 1 + dr, cols - col + dc, rows - r + dr), [r, col]);
        }
        return arr;
    };

    $JssorSlideshowFormations$.$FormationRectangle = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var cr;
        cr = Math.round(Math.min(cols / 2, rows / 2)) + 1;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, cr - Math.min(col + 1, r + 1, cols - col, rows - r), [r, col]);
        }
        return arr;
    };

    $JssorSlideshowFormations$.$FormationRandom = function (transition) {
        var a = [];
        var r, col, i;
        for (r = 0; r < transition.$Rows; r++) {
            for (col = 0; col < transition.$Cols; col++)
                PushFormationOrder(a, Math.ceil(100000 * Math.random()) % 13, [r, col]);
        }

        return a;
    };

    $JssorSlideshowFormations$.$FormationCircle = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var hc = cols / 2 - 0.5;
        var hr = rows / 2 - 0.5;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, Math.round(Math.sqrt(Math.pow(col - hc, 2) + Math.pow(r - hr, 2))), [r, col]);
        }
        return arr;
    };

    $JssorSlideshowFormations$.$FormationCross = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var hc = cols / 2 - 0.5;
        var hr = rows / 2 - 0.5;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, Math.round(Math.min(Math.abs(col - hc), Math.abs(r - hr))), [r, col]);
        }
        return arr;
    };

    $JssorSlideshowFormations$.$FormationRectangleCross = function (transition) {
        var cols = transition.$Cols || 1;
        var rows = transition.$Rows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var hc = cols / 2 - 0.5;
        var hr = rows / 2 - 0.5;
        var cr = Math.max(hc, hr) + 1;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, Math.round(cr - Math.max(hc - Math.abs(col - hc), hr - Math.abs(r - hr))) - 1, [r, col]);
        }
        return arr;
    };

    function GetFormation(transition) {

        var formationInstance = transition.$Formation(transition);

        return transition.$Reverse ? formationInstance.reverse() : formationInstance;

    } //GetFormation

    //var _PrototypeTransitions = [];
    function EnsureTransitionInstance(options, slideshowInterval) {

        var _SlideshowTransition = {
            $Interval: slideshowInterval,  //Delay to play next frame
            $Duration: 1, //Duration to finish the entire transition
            $Delay: 0,  //Delay to assembly blocks
            $Cols: 1,   //Number of columns
            $Rows: 1,   //Number of rows
            $Opacity: 0,   //Fade block or not
            $Zoom: 0,   //Zoom block or not
            $Clip: 0,   //Clip block or not
            $Move: false,   //Move block or not
            $SlideOut: false,   //Slide the previous slide out to display next slide instead
            //$FlyDirection: 0,   //Specify fly transform with direction
            $Reverse: false,    //Reverse the assembly or not
            $Formation: $JssorSlideshowFormations$.$FormationRandom,    //Shape that assembly blocks as
            $Assembly: ASSEMBLY_RIGHT_BOTTOM,   //The way to assembly blocks
            $ChessMode: { $Column: 0, $Row: 0 },    //Chess move or fly direction
            $Easing: $JssorEasing$.$EaseSwing,  //Specify variation of speed during transition
            $Round: {},
            $Blocks: [],
            $During: {}
        };

        $JssorUtils$.$Extend(_SlideshowTransition, options);

        _SlideshowTransition.$Count = _SlideshowTransition.$Cols * _SlideshowTransition.$Rows;
        if ($JssorUtils$.$IsFunction(_SlideshowTransition.$Easing))
            _SlideshowTransition.$Easing = { $Default: _SlideshowTransition.$Easing };

        _SlideshowTransition.$FramesCount = Math.ceil(_SlideshowTransition.$Duration / _SlideshowTransition.$Interval);
        _SlideshowTransition.$EasingInstance = GetEasing(_SlideshowTransition);

        _SlideshowTransition.$GetBlocks = function (width, height) {
            width /= _SlideshowTransition.$Cols;
            height /= _SlideshowTransition.$Rows;
            var wh = width + 'x' + height;
            if (!_SlideshowTransition.$Blocks[wh]) {
                _SlideshowTransition.$Blocks[wh] = { $Width: width, $Height: height };
                for (var col = 0; col < _SlideshowTransition.$Cols; col++) {
                    for (var r = 0; r < _SlideshowTransition.$Rows; r++)
                        _SlideshowTransition.$Blocks[wh][r + ',' + col] = { $Top: r * height, $Right: col * width + width, $Bottom: r * height + height, $Left: col * width };
                }
            }

            return _SlideshowTransition.$Blocks[wh];
        };

        if (_SlideshowTransition.$Brother) {
            _SlideshowTransition.$Brother = EnsureTransitionInstance(_SlideshowTransition.$Brother, slideshowInterval);
            _SlideshowTransition.$SlideOut = true;
        }

        return _SlideshowTransition;
    }

    function GetEasing(transition) {
        var easing = transition.$Easing;
        if (!easing.$Default)
            easing.$Default = $JssorEasing$.$EaseSwing;

        var duration = transition.$FramesCount;

        var cache = easing.$Cache;
        if (!cache) {
            var enumerator = $JssorUtils$.$Extend({}, transition.$Easing, transition.$Round);
            cache = easing.$Cache = {};

            $JssorUtils$.$Each(enumerator, function (v, easingName) {
                var easingFunction = easing[easingName] || easing.$Default;
                var round = transition.$Round[easingName] || 1;

                if (!$JssorUtils$.$IsArray(easingFunction.$Cache))
                    easingFunction.$Cache = [];

                var easingFunctionCache = easingFunction.$Cache[duration] = easingFunction.$Cache[duration] || [];

                if (!easingFunctionCache[round]) {
                    easingFunctionCache[round] = [0];
                    for (var t = 1; t <= duration; t++) {
                        var tRound = t / duration * round;
                        var tRoundFloor = Math.floor(tRound);
                        if (tRound != tRoundFloor)
                            tRound -= tRoundFloor;
                        easingFunctionCache[round][t] = easingFunction(tRound);
                    }
                }

                cache[easingName] = easingFunctionCache;

            });
        }

        return cache;
    } //GetEasing

    //Formation Definition -------

    function JssorSlideshowPlayer(slideContainer, slideElement, slideTransition, beginTime, slideContainerWidth, slideContainerHeight) {
        var _Self = this;

        var _Block;
        var _StartStylesArr = {};
        var _AnimationStylesArrs = {};
        var _AnimationBlockItems = [];
        var _StyleStart;
        var _StyleEnd;
        var _StyleDif;
        var _ChessModeColumn = slideTransition.$ChessMode.$Column || 0;
        var _ChessModeRow = slideTransition.$ChessMode.$Row || 0;

        var _Blocks = slideTransition.$GetBlocks(slideContainerWidth, slideContainerHeight);
        var _FormationInstance = GetFormation(slideTransition);
        var _MaxOrder = _FormationInstance.length - 1;
        var _Period = slideTransition.$Duration + slideTransition.$Delay * _MaxOrder;
        var _EndTime = beginTime + _Period;

        var _SlideOut = slideTransition.$SlideOut;
        var _IsIn;

        _EndTime += $JssorUtils$.$IsBrowserChrome() ? 260 : 50;

        _Self.$EndTime = _EndTime;

        _Self.$ShowFrame = function (time) {
            time -= beginTime;

            var isIn = time < _Period;

            if (isIn || _IsIn) {
                _IsIn = isIn;

                if (!_SlideOut)
                    time = _Period - time;

                var frameIndex = Math.ceil(time / slideTransition.$Interval);

                $JssorUtils$.$Each(_AnimationStylesArrs, function (value, index) {

                    var itemFrameIndex = Math.max(frameIndex, value.$Min);
                    itemFrameIndex = Math.min(itemFrameIndex, value.length - 1);

                    if (value.$LastFrameIndex != itemFrameIndex) {
                        if (!value.$LastFrameIndex && !_SlideOut) {
                            $JssorUtils$.$ShowElement(_AnimationBlockItems[index]);
                        }
                        else if (itemFrameIndex == value.$Max && _SlideOut) {
                            $JssorUtils$.$HideElement(_AnimationBlockItems[index]);
                        }
                        value.$LastFrameIndex = itemFrameIndex;
                        $JssorUtils$.$SetStylesEx(_AnimationBlockItems[index], value[itemFrameIndex]);
                    }
                });
            }
        };

        function DisableHWA(elmt) {
            $JssorUtils$.$DisableHWA(elmt);

            var children = $JssorUtils$.$GetChildren(elmt);

            $JssorUtils$.$Each(children, function (child) {
                DisableHWA(child);
            });
        }

        //constructor
        {
            slideElement = $JssorUtils$.$CloneNode(slideElement, true);
            DisableHWA(slideElement);
            if ($JssorUtils$.$IsBrowserIe9Earlier()) {
                var hasImage = !slideElement["no-image"];
                var slideChildElements = $JssorUtils$.$FindChildrenByTag(slideElement, null, true);
                $JssorUtils$.$Each(slideChildElements, function (slideChildElement) {
                    if (hasImage || slideChildElement["jssor-slider"])
                        $JssorUtils$.$CssOpacity(slideChildElement, $JssorUtils$.$CssOpacity(slideChildElement), true);
                });
            }

            $JssorUtils$.$Each(_FormationInstance, function (formationItems, order) {
                $JssorUtils$.$Each(formationItems, function (formationItem) {
                    var row = formationItem[0];
                    var col = formationItem[1];
                    {
                        var columnRow = row + ',' + col;

                        var chessHorizontal = false;
                        var chessVertical = false;
                        var chessRotate = false;

                        if (_ChessModeColumn && col % 2) {
                            if ($JssorDirection$.$IsHorizontal(_ChessModeColumn)) {
                                chessHorizontal = !chessHorizontal;
                            }
                            if ($JssorDirection$.$IsVertical(_ChessModeColumn)) {
                                chessVertical = !chessVertical;
                            }

                            if (_ChessModeColumn & 16)
                                chessRotate = !chessRotate;
                        }

                        if (_ChessModeRow && row % 2) {
                            if ($JssorDirection$.$IsHorizontal(_ChessModeRow)) {
                                chessHorizontal = !chessHorizontal;
                            }
                            if ($JssorDirection$.$IsVertical(_ChessModeRow)) {
                                chessVertical = !chessVertical;
                            }
                            if (_ChessModeRow & 16)
                                chessRotate = !chessRotate;
                        }

                        slideTransition.$Top = slideTransition.$Top || (slideTransition.$Clip & 4);
                        slideTransition.$Bottom = slideTransition.$Bottom || (slideTransition.$Clip & 8);
                        slideTransition.$Left = slideTransition.$Left || (slideTransition.$Clip & 1);
                        slideTransition.$Right = slideTransition.$Right || (slideTransition.$Clip & 2);

                        var topBenchmark = chessVertical ? slideTransition.$Bottom : slideTransition.$Top;
                        var bottomBenchmark = chessVertical ? slideTransition.$Top : slideTransition.$Bottom;
                        var leftBenchmark = chessHorizontal ? slideTransition.$Right : slideTransition.$Left;
                        var rightBenchmark = chessHorizontal ? slideTransition.$Left : slideTransition.$Right;

                        //$JssorDebug$.$Execute(function () {
                        //    topBenchmark = bottomBenchmark = leftBenchmark = rightBenchmark = false;
                        //});

                        slideTransition.$Clip = topBenchmark || bottomBenchmark || leftBenchmark || rightBenchmark;

                        _StyleDif = {};
                        _StyleEnd = { $Top: 0, $Left: 0, $Opacity: 1, $Width: slideContainerWidth, $Height: slideContainerHeight };
                        _StyleStart = $JssorUtils$.$Extend({}, _StyleEnd);
                        _Block = $JssorUtils$.$Extend({}, _Blocks[columnRow]);

                        if (slideTransition.$Opacity) {
                            _StyleEnd.$Opacity = 2 - slideTransition.$Opacity;
                        }

                        if (slideTransition.$ZIndex) {
                            _StyleEnd.$ZIndex = slideTransition.$ZIndex;
                            _StyleStart.$ZIndex = 0;
                        }

                        var allowClip = slideTransition.$Cols * slideTransition.$Rows > 1 || slideTransition.$Clip;

                        if (slideTransition.$Zoom || slideTransition.$Rotate) {
                            var allowRotate = true;
                            if ($JssorUtils$.$IsBrowserIE() && $JssorUtils$.$GetBrowserEngineVersion() < 9) {
                                if (slideTransition.$Cols * slideTransition.$Rows > 1)
                                    allowRotate = false;
                                else
                                    allowClip = false;
                            }

                            if (allowRotate) {
                                _StyleEnd.$Zoom = slideTransition.$Zoom ? slideTransition.$Zoom - 1 : 1;
                                _StyleStart.$Zoom = 1;

                                if ($JssorUtils$.$IsBrowserIe9Earlier() || $JssorUtils$.$IsBrowserOpera())
                                    _StyleEnd.$Zoom = Math.min(_StyleEnd.$Zoom, 2);

                                var rotate = slideTransition.$Rotate;
                                if (rotate == true)
                                    rotate = 1;

                                _StyleEnd.$Rotate = rotate * 360 * ((chessRotate) ? -1 : 1);
                                _StyleStart.$Rotate = 0;
                            }
                        }

                        if (allowClip) {
                            if (slideTransition.$Clip) {
                                var clipScale = slideTransition.$ScaleClip || 1;
                                var blockOffset = _Block.$Offset = {};
                                if (topBenchmark && bottomBenchmark) {
                                    blockOffset.$Top = _Blocks.$Height / 2 * clipScale;
                                    blockOffset.$Bottom = -blockOffset.$Top;
                                }
                                else if (topBenchmark) {
                                    blockOffset.$Bottom = -_Blocks.$Height * clipScale;
                                }
                                else if (bottomBenchmark) {
                                    blockOffset.$Top = _Blocks.$Height * clipScale;
                                }

                                if (leftBenchmark && rightBenchmark) {
                                    blockOffset.$Left = _Blocks.$Width / 2 * clipScale;
                                    blockOffset.$Right = -blockOffset.$Left;
                                }
                                else if (leftBenchmark) {
                                    blockOffset.$Right = -_Blocks.$Width * clipScale;
                                }
                                else if (rightBenchmark) {
                                    blockOffset.$Left = _Blocks.$Width * clipScale;
                                }
                            }

                            _StyleDif.$Clip = _Block;
                            _StyleStart.$Clip = _Blocks[columnRow];
                        }

                        //fly
                        {
                            var chessHor = chessHorizontal ? 1 : -1;
                            var chessVer = chessVertical ? 1 : -1;

                            if (slideTransition.x)
                                _StyleEnd.$Left += slideContainerWidth * slideTransition.x * chessHor;

                            if (slideTransition.y)
                                _StyleEnd.$Top += slideContainerHeight * slideTransition.y * chessVer;
                        }

                        $JssorUtils$.$Each(_StyleEnd, function (propertyEnd, property) {
                            if ($JssorUtils$.$IsNumeric(propertyEnd)) {
                                if (propertyEnd != _StyleStart[property]) {
                                    _StyleDif[property] = propertyEnd - _StyleStart[property];
                                }
                            }
                        });

                        _StartStylesArr[columnRow] = _SlideOut ? _StyleStart : _StyleEnd;

                        var animationStylesArr = [];
                        var virtualFrameCount = Math.round(order * slideTransition.$Delay / slideTransition.$Interval);
                        _AnimationStylesArrs[columnRow] = new Array(virtualFrameCount);
                        _AnimationStylesArrs[columnRow].$Min = virtualFrameCount;

                        var framesCount = slideTransition.$FramesCount;
                        for (var frameN = 0; frameN <= framesCount; frameN++) {
                            var styleFrameN = {};

                            $JssorUtils$.$Each(_StyleDif, function (propertyDiff, property) {
                                var propertyEasings = slideTransition.$EasingInstance[property] || slideTransition.$EasingInstance.$Default;
                                var propertyEasingArray = propertyEasings[slideTransition.$Round[property] || 1];

                                var propertyDuring = slideTransition.$During[property] || [0, 1];
                                var propertyFrameN = (frameN / framesCount - propertyDuring[0]) / propertyDuring[1] * framesCount;
                                propertyFrameN = Math.round(Math.min(framesCount, Math.max(propertyFrameN, 0)));

                                var propertyEasingValue = propertyEasingArray[propertyFrameN];

                                if ($JssorUtils$.$IsNumeric(propertyDiff)) {
                                    styleFrameN[property] = _StyleStart[property] + propertyDiff * propertyEasingValue;
                                }
                                else {
                                    var value = styleFrameN[property] = $JssorUtils$.$Extend({}, _StyleStart[property]);
                                    value.$Offset = [];
                                    $JssorUtils$.$Each(propertyDiff.$Offset, function (rectX, n) {
                                        var offsetValue = rectX * propertyEasingValue;
                                        value.$Offset[n] = offsetValue;
                                        value[n] += offsetValue;
                                    });
                                }
                            });

                            if (_StyleStart.$Zoom) {
                                styleFrameN.$Transform = { $Rotate: styleFrameN.$Rotate || 0, $Scale: styleFrameN.$Zoom, $OriginalWidth: slideContainerWidth, $OriginalHeight: slideContainerHeight };
                            }
                            if (styleFrameN.$Clip && slideTransition.$Move) {
                                var styleFrameNClipOffset = styleFrameN.$Clip.$Offset;
                                var offsetY = (styleFrameNClipOffset.$Top || 0) + (styleFrameNClipOffset.$Bottom || 0);
                                var offsetX = (styleFrameNClipOffset.$Left || 0) + (styleFrameNClipOffset.$Right || 0);

                                styleFrameN.$Left = (styleFrameN.$Left || 0) + offsetX;
                                styleFrameN.$Top = (styleFrameN.$Top || 0) + offsetY;
                                styleFrameN.$Clip.$Left -= offsetX;
                                styleFrameN.$Clip.$Right -= offsetX;
                                styleFrameN.$Clip.$Top -= offsetY;
                                styleFrameN.$Clip.$Bottom -= offsetY;
                            }

                            styleFrameN.$ZIndex = styleFrameN.$ZIndex || 1;

                            _AnimationStylesArrs[columnRow].push(styleFrameN);
                        }

                    } //for
                });
            });

            _FormationInstance.reverse();
            $JssorUtils$.$Each(_FormationInstance, function (formationItems) {
                $JssorUtils$.$Each(formationItems, function (formationItem) {
                    var row = formationItem[0];
                    var col = formationItem[1];

                    var columnRow = row + ',' + col;

                    var image = slideElement;
                    if (col || row)
                        image = $JssorUtils$.$CloneNode(slideElement, true);

                    $JssorUtils$.$SetStyles(image, _StartStylesArr[columnRow]);
                    $JssorUtils$.$CssOverflow(image, "hidden");

                    $JssorUtils$.$CssPosition(image, "absolute");
                    slideContainer.$AddClipElement(image);
                    _AnimationBlockItems[columnRow] = image;
                    $JssorUtils$.$ShowElement(image, _SlideOut);
                });
            });
        }
    }

    //JssorSlideshowRunner++++++++
    var _SlideshowRunnerCount = 1;
    $JssorSlideshowRunner$ = window.$JssorSlideshowRunner$ = function (slideContainer, slideContainerWidth, slideContainerHeight, slideshowOptions, handleTouchEventOnly) {

        var _SelfSlideshowRunner = this;

        //var _State = 0; //-1 fullfill, 0 clean, 1 initializing, 2 stay, 3 playing
        var _EndTime;

        var _SliderFrameCount;

        var _SlideshowPlayerBelow;
        var _SlideshowPlayerAbove;

        var _PrevItem;
        var _SlideItem;

        var _TransitionIndex = 0;
        var _TransitionsOrder = slideshowOptions.$TransitionsOrder;

        var _SlideshowTransition;

        var _SlideshowPerformance = 16;

        function SlideshowProcessor() {
            var _SelfSlideshowProcessor = this;
            var _CurrentTime = 0;

            $JssorAnimator$.call(_SelfSlideshowProcessor, 0, _EndTime);

            _SelfSlideshowProcessor.$OnPositionChange = function (oldPosition, newPosition) {
                if ((newPosition - _CurrentTime) > _SlideshowPerformance) {
                    _CurrentTime = newPosition;

                    _SlideshowPlayerAbove && _SlideshowPlayerAbove.$ShowFrame(newPosition);
                    _SlideshowPlayerBelow && _SlideshowPlayerBelow.$ShowFrame(newPosition);
                }
            };

            _SelfSlideshowProcessor.$Transition = _SlideshowTransition;
        }

        //member functions
        _SelfSlideshowRunner.$GetTransition = function (slideCount) {
            var n = 0;

            var transitions = slideshowOptions.$Transitions;

            var transitionCount = transitions.length;

            if (_TransitionsOrder) { /*Sequence*/
                if (transitionCount > slideCount && ($JssorUtils$.$IsBrowserChrome() || $JssorUtils$.$IsBrowserSafari() || $JssorUtils$.$IsBrowserFireFox())) {
                    transitionCount -= transitionCount % slideCount;
                }
                n = _TransitionIndex++ % transitionCount;
            }
            else { /*Random*/
                n = Math.floor(Math.random() * transitionCount);
            }

            transitions[n] && (transitions[n].$Index = n);

            return transitions[n];
        };

        _SelfSlideshowRunner.$Initialize = function (slideIndex, prevIndex, slideItem, prevItem, slideshowTransition) {
            $JssorDebug$.$Execute(function () {
                if (_SlideshowPlayerBelow) {
                    $JssorDebug$.$Fail("slideshow runner has not been cleared.");
                }
            });

            _SlideshowTransition = slideshowTransition;

            slideshowTransition = EnsureTransitionInstance(slideshowTransition, _SlideshowPerformance);

            _SlideItem = slideItem;
            _PrevItem = prevItem;

            var prevSlideElement = prevItem.$Item;
            var currentSlideElement = slideItem.$Item;
            prevSlideElement["no-image"] = !prevItem.$Image;
            currentSlideElement["no-image"] = !slideItem.$Image;

            var slideElementAbove = prevSlideElement;
            var slideElementBelow = currentSlideElement;

            var slideTransitionAbove = slideshowTransition;
            var slideTransitionBelow = slideshowTransition.$Brother || EnsureTransitionInstance({}, _SlideshowPerformance);

            if (!slideshowTransition.$SlideOut) {
                slideElementAbove = currentSlideElement;
                slideElementBelow = prevSlideElement;
            }

            var shift = slideTransitionBelow.$Shift || 0;

            _SlideshowPlayerBelow = new JssorSlideshowPlayer(slideContainer, slideElementBelow, slideTransitionBelow, Math.max(shift - slideTransitionBelow.$Interval, 0), slideContainerWidth, slideContainerHeight);
            _SlideshowPlayerAbove = new JssorSlideshowPlayer(slideContainer, slideElementAbove, slideTransitionAbove, Math.max(slideTransitionBelow.$Interval - shift, 0), slideContainerWidth, slideContainerHeight);

            _SlideshowPlayerBelow.$ShowFrame(0);
            _SlideshowPlayerAbove.$ShowFrame(0);

            _EndTime = Math.max(_SlideshowPlayerBelow.$EndTime, _SlideshowPlayerAbove.$EndTime);

            _SelfSlideshowRunner.$Index = slideIndex;
        };

        _SelfSlideshowRunner.$Clear = function () {
            slideContainer.$Clear();
            _SlideshowPlayerBelow = null;
            _SlideshowPlayerAbove = null;
        };

        _SelfSlideshowRunner.$GetProcessor = function () {
            var slideshowProcessor = null;

            if (_SlideshowPlayerAbove)
                slideshowProcessor = new SlideshowProcessor();

            return slideshowProcessor;
        };

        //Constructor
        {
            if ($JssorUtils$.$IsBrowserIe9Earlier() || $JssorUtils$.$IsBrowserOpera() || (handleTouchEventOnly && $JssorUtils$.$GetWebKitVersion < 537)) {
                _SlideshowPerformance = 32;
            }

            $JssorEventManager$.call(_SelfSlideshowRunner);
            $JssorAnimator$.call(_SelfSlideshowRunner, -10000000, 10000000);

            $JssorDebug$.$LiveStamp(_SelfSlideshowRunner, "slideshow_runner_" + _SlideshowRunnerCount++);
        }
    };
    //JssorSlideshowRunner--------

    //JssorSlider
    function JssorSlider(elmt, options) {
        var _SelfSlider = this;

        //private classes
        function Conveyor() {
            var _SelfConveyor = this;
            $JssorAnimator$.call(_SelfConveyor, -100000000, 200000000);

            _SelfConveyor.$GetCurrentSlideInfo = function () {
                var positionDisplay = _SelfConveyor.$GetPosition_Display();
                var virtualIndex = Math.floor(positionDisplay);
                var slideIndex = GetRealIndex(virtualIndex);
                var slidePosition = positionDisplay - Math.floor(positionDisplay);

                return { $Index: slideIndex, $VirtualIndex: virtualIndex, $Position: slidePosition };
            };

            _SelfConveyor.$OnPositionChange = function (oldPosition, newPosition) {

                var index = Math.floor(newPosition);
                if (index != newPosition && newPosition > oldPosition)
                    index++;

                ResetNavigator(index, true);

                _SelfSlider.$TriggerEvent(JssorSlider.$EVT_POSITION_CHANGE, GetRealIndex(newPosition), GetRealIndex(oldPosition), newPosition, oldPosition);
            };
        }

        //Carousel
        function Carousel() {
            var _SelfCarousel = this;

            $JssorAnimator$.call(_SelfCarousel, 0, 0, { $LoopLength: _SlideCount });

            //Carousel Constructor
            {
                $JssorUtils$.$Each(_SlideItems, function (slideItem) {
                    (_Loop & 1) && slideItem.$SetLoopLength(_SlideCount);
                    _SelfCarousel.$Chain(slideItem);
                    slideItem.$Shift(_ParkingPosition / _StepLength);
                });
            }
        }
        //Carousel

        //Slideshow
        function Slideshow() {
            var _SelfSlideshow = this;
            var _Wrapper = _SlideContainer.$Elmt;

            $JssorAnimator$.call(_SelfSlideshow, -1, 2, { $Easing: $JssorEasing$.$EaseLinear, $Setter: { $Position: SetPosition }, $LoopLength: _SlideCount }, _Wrapper, { $Position: 1 }, { $Position: -1 });

            _SelfSlideshow.$Wrapper = _Wrapper;

            //Slideshow Constructor
            {
                $JssorDebug$.$Execute(function () {
                    $JssorUtils$.$SetAttribute(_SlideContainer.$Elmt, "debug-id", "slide_container");
                });
            }
        }
        //Slideshow

        //CarouselPlayer
        function CarouselPlayer(carousel, slideshow) {
            var _SelfCarouselPlayer = this;
            var _FromPosition;
            var _ToPosition;
            var _Duration;
            var _StandBy;
            var _StandByPosition;

            $JssorAnimator$.call(_SelfCarouselPlayer, -100000000, 200000000);

            _SelfCarouselPlayer.$OnStart = function () {
                _IsSliding = true;
                _LoadingTicket = null;

                //EVT_SWIPE_START
                _SelfSlider.$TriggerEvent(JssorSlider.$EVT_SWIPE_START, GetRealIndex(_Conveyor.$GetPosition()), _Conveyor.$GetPosition());
            };

            _SelfCarouselPlayer.$OnStop = function () {

                _IsSliding = false;
                _StandBy = false;

                var currentSlideInfo = _Conveyor.$GetCurrentSlideInfo();

                //EVT_SWIPE_END
                _SelfSlider.$TriggerEvent(JssorSlider.$EVT_SWIPE_END, GetRealIndex(_Conveyor.$GetPosition()), _Conveyor.$GetPosition());

                if (!currentSlideInfo.$Position) {
                    OnPark(currentSlideInfo.$VirtualIndex, _CurrentSlideIndex);
                }
            };

            _SelfCarouselPlayer.$OnPositionChange = function (oldPosition, newPosition) {

                var toPosition;

                if (_StandBy)
                    toPosition = _StandByPosition;
                else {
                    toPosition = _ToPosition;

                    if (_Duration) {
                        var interPosition = newPosition / _Duration;
                        if ($JssorUtils$.$IsBrowserChrome() || $JssorUtils$.$IsBrowserFireFox()) {
                            Math.round(interPosition * 16 / _Duration) / 16 * _Duration;
                            interPosition = parseFloat(interPosition.toFixed(4));
                        }
                        toPosition = _Options.$SlideEasing(interPosition) * (_ToPosition - _FromPosition) + _FromPosition;
                    }
                }

                _Conveyor.$GoToPosition(toPosition);
            };

            _SelfCarouselPlayer.$PlayCarousel = function (fromPosition, toPosition, duration, callback) {
                $JssorDebug$.$Execute(function () {
                    if (_SelfCarouselPlayer.$IsPlaying())
                        $JssorDebug$.$Fail("The carousel is already playing.");
                });

                _FromPosition = fromPosition;
                _ToPosition = toPosition;
                _Duration = duration;

                _Conveyor.$GoToPosition(fromPosition);
                _SelfCarouselPlayer.$GoToPosition(0);

                _SelfCarouselPlayer.$PlayToPosition(duration, callback);
            };

            _SelfCarouselPlayer.$StandBy = function (standByPosition) {
                _StandBy = true;
                _StandByPosition = standByPosition;
                _SelfCarouselPlayer.$Play(standByPosition, null, true);
            };

            _SelfCarouselPlayer.$SetStandByPosition = function (standByPosition) {
                _StandByPosition = standByPosition;
            };

            _SelfCarouselPlayer.$MoveCarouselTo = function (position) {
                _Conveyor.$GoToPosition(position);
            };

            //CarouselPlayer Constructor
            {
                _Conveyor = new Conveyor();

                _Conveyor.$Combine(carousel);
                _Conveyor.$Combine(slideshow);
            }
        }
        //CarouselPlayer

        //SlideContainer
        function SlideContainer() {
            var _Self = this;
            var elmt = CreatePanel();

            $JssorUtils$.$CssZIndex(elmt, 0);

            _Self.$Elmt = elmt;

            _Self.$AddClipElement = function (clipElement) {
                $JssorUtils$.$AppendChild(elmt, clipElement);
                $JssorUtils$.$ShowElement(elmt);
            };

            _Self.$Clear = function () {
                $JssorUtils$.$HideElement(elmt);
                $JssorUtils$.$ClearInnerHtml(elmt);
            };
        }
        //SlideContainer

        //SlideItem
        function SlideItem(slideElmt, slideIndex) {

            var _SelfSlideItem = this;

            var _CaptionSliderIn;
            var _CaptionSliderOut;
            var _CaptionSliderCurrent;
            var _IsCaptionSliderPlayingWhenDragStart;

            var _Wrapper;
            var _BaseElement = slideElmt;

            var _LoadingScreen;

            var _ImageItem;
            var _ImageElmts = [];
            var _LinkItemOrigin;
            var _LinkItem;
            var _ImageLoading;
            var _ImageLoaded;
            var _ImageLazyLoading;
            var _ContentRefreshed;

            var _Processor;

            var _PlayerInstanceElement;
            var _PlayerInstance;

            var _SequenceNumber;    //for debug only

            $JssorAnimator$.call(_SelfSlideItem, -_DisplayPieces, _DisplayPieces + 1, { $SlideItemAnimator: true });

            function ResetCaptionSlider(fresh) {
                _CaptionSliderOut && _CaptionSliderOut.$Revert();
                _CaptionSliderIn && _CaptionSliderIn.$Revert();

                RefreshContent(slideElmt, fresh);
                _ContentRefreshed = true;

                _CaptionSliderIn = new _CaptionSliderOptions.$Class(slideElmt, _CaptionSliderOptions, 1);
                $JssorDebug$.$LiveStamp(_CaptionSliderIn, "caption_slider_" + _CaptionSliderCount + "_in");
                _CaptionSliderOut = new _CaptionSliderOptions.$Class(slideElmt, _CaptionSliderOptions);
                $JssorDebug$.$LiveStamp(_CaptionSliderOut, "caption_slider_" + _CaptionSliderCount + "_out");

                $JssorDebug$.$Execute(function () {
                    _CaptionSliderCount++;
                });

                _CaptionSliderOut.$GoToBegin();
                _CaptionSliderIn.$GoToBegin();
            }

            function EnsureCaptionSliderVersion() {
                if (_CaptionSliderIn.$Version < _CaptionSliderOptions.$Version) {
                    ResetCaptionSlider();
                }
            }

            //event handling begin
            function LoadImageCompleteEventHandler(completeCallback, loadingScreen, image) {
                if (!_ImageLoaded) {
                    _ImageLoaded = true;

                    if (_ImageItem && image) {
                        var imageWidth = image.width;
                        var imageHeight = image.height;
                        var fillWidth = imageWidth;
                        var fillHeight = imageHeight;

                        if (imageWidth && imageHeight && _Options.$FillMode) {

                            //0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
                            if (_Options.$FillMode & 3 && (!(_Options.$FillMode & 4) || imageWidth > _SlideWidth || imageHeight > _SlideHeight)) {
                                var fitHeight = false;
                                var ratio = _SlideWidth / _SlideHeight * imageHeight / imageWidth;

                                if (_Options.$FillMode & 1) {
                                    fitHeight = (ratio > 1);
                                }
                                else if (_Options.$FillMode & 2) {
                                    fitHeight = (ratio < 1);
                                }
                                fillWidth = fitHeight ? imageWidth * _SlideHeight / imageHeight : _SlideWidth;
                                fillHeight = fitHeight ? _SlideHeight : imageHeight * _SlideWidth / imageWidth;
                            }

                            $JssorUtils$.$CssWidth(_ImageItem, fillWidth);
                            $JssorUtils$.$CssHeight(_ImageItem, fillHeight);
                            $JssorUtils$.$CssTop(_ImageItem, (_SlideHeight - fillHeight) / 2);
                            $JssorUtils$.$CssLeft(_ImageItem, (_SlideWidth - fillWidth) / 2);
                        }

                        $JssorUtils$.$CssPosition(_ImageItem, "absolute");

                        _SelfSlider.$TriggerEvent(JssorSlider.$EVT_LOAD_END, slideItem);
                    }
                }

                $JssorUtils$.$HideElement(loadingScreen);
                completeCallback && completeCallback(_SelfSlideItem);
            }

            function LoadSlideshowImageCompleteEventHandler(nextIndex, nextItem, slideshowTransition, loadingTicket) {
                if (loadingTicket == _LoadingTicket && _CurrentSlideIndex == slideIndex && _AutoPlay) {
                    if (!_Frozen) {
                        var nextRealIndex = GetRealIndex(nextIndex);
                        _SlideshowRunner.$Initialize(nextRealIndex, slideIndex, nextItem, _SelfSlideItem, slideshowTransition);
                        nextItem.$HideContentForSlideshow();
                        _Slideshow.$Locate(nextRealIndex, 1);
                        _Slideshow.$GoToPosition(nextRealIndex);
                        _CarouselPlayer.$PlayCarousel(nextIndex, nextIndex, 0);
                    }
                }
            }

            function SlideReadyEventHandler(loadingTicket) {
                if (loadingTicket == _LoadingTicket && _CurrentSlideIndex == slideIndex) {

                    if (!_Processor) {
                        var slideshowProcessor = null;
                        if (_SlideshowRunner) {
                            if (_SlideshowRunner.$Index == slideIndex)
                                slideshowProcessor = _SlideshowRunner.$GetProcessor();
                            else
                                _SlideshowRunner.$Clear();
                        }

                        EnsureCaptionSliderVersion();

                        _Processor = new Processor(slideIndex, slideshowProcessor, _SelfSlideItem.$GetCaptionSliderIn(), _SelfSlideItem.$GetCaptionSliderOut());
                        _Processor.$SetPlayer(_PlayerInstance);
                    }

                    !_Processor.$IsPlaying() && _Processor.$Replay();
                }
            }

            function ParkEventHandler(currentIndex, previousIndex) {
                if (currentIndex == slideIndex) {

                    if (currentIndex != previousIndex)
                        _SlideItems[previousIndex] && _SlideItems[previousIndex].$ParkOut();
                    else
                        _Processor && _Processor.$AdjustIdleOnPark();

                    _PlayerInstance && _PlayerInstance.$Enable();

                    //park in
                    var loadingTicket = _LoadingTicket = $JssorUtils$.$GetNow();
                    _SelfSlideItem.$LoadImage($JssorUtils$.$CreateCallback(null, SlideReadyEventHandler, loadingTicket));
                }
                else {
                    var distance = Math.abs(slideIndex - currentIndex);
                    var loadRange = _DisplayPieces + _Options.$LazyLoading;
                    if (!_ImageLazyLoading || distance <= loadRange || _SlideCount - distance <= loadRange) {
                        _SelfSlideItem.$LoadImage();
                    }
                }
            }

            function SwipeStartEventHandler() {
                if (_CurrentSlideIndex == slideIndex && _Processor) {
                    _Processor.$Stop();
                    _PlayerInstance && _PlayerInstance.$Quit();
                    _PlayerInstance && _PlayerInstance.$Disable();
                    _Processor.$OpenSlideshowPanel();
                }
            }

            function FreezeEventHandler() {
                if (_CurrentSlideIndex == slideIndex && _Processor) {
                    _Processor.$Stop();
                }
            }

            function LinkClickEventHandler(event) {
                if (_LastDragSucceded) {
                    $JssorUtils$.$CancelEvent(event);
                }
                else {
                    _SelfSlider.$TriggerEvent(JssorSlider.$EVT_CLICK, slideIndex, event);
                }
            }

            function PlayerAvailableEventHandler() {
                _PlayerInstance = _PlayerInstanceElement.pInstance;
                _Processor && _Processor.$SetPlayer(_PlayerInstance);
            }

            _SelfSlideItem.$LoadImage = function (completeCallback, loadingScreen) {
                loadingScreen = loadingScreen || _LoadingScreen;

                if (_ImageElmts.length && !_ImageLoaded) {

                    $JssorUtils$.$ShowElement(loadingScreen);

                    if (!_ImageLoading) {
                        _ImageLoading = true;
                        _SelfSlider.$TriggerEvent(JssorSlider.$EVT_LOAD_START);

                        $JssorUtils$.$Each(_ImageElmts, function (imageElmt) {

                            if (!imageElmt.src) {
                                imageElmt.src = $JssorUtils$.$GetAttributeEx(imageElmt, "src2");
                                $JssorUtils$.$CssDisplay(imageElmt, imageElmt["display-origin"]);
                            }
                        });
                    }
                    $JssorUtils$.$LoadImages(_ImageElmts, _ImageItem, $JssorUtils$.$CreateCallback(null, LoadImageCompleteEventHandler, completeCallback, loadingScreen));
                }
                else {
                    LoadImageCompleteEventHandler(completeCallback, loadingScreen);
                }
            };

            _SelfSlideItem.$GoForNextSlide = function () {
                if (_SlideshowRunner) {
                    var slideshowTransition = _SlideshowRunner.$GetTransition(_SlideCount);

                    if (slideshowTransition) {
                        var loadingTicket = _LoadingTicket = $JssorUtils$.$GetNow();

                        var nextIndex = slideIndex + _PlayReverse;
                        var nextItem = _SlideItems[GetRealIndex(nextIndex)];
                        return nextItem.$LoadImage($JssorUtils$.$CreateCallback(null, LoadSlideshowImageCompleteEventHandler, nextIndex, nextItem, slideshowTransition, loadingTicket), _LoadingScreen);
                    }
                }

                PlayTo(_CurrentSlideIndex + _Options.$AutoPlaySteps * _PlayReverse);
            };

            _SelfSlideItem.$TryActivate = function () {
                ParkEventHandler(slideIndex, slideIndex);
            };

            _SelfSlideItem.$ParkOut = function () {
                //park out
                _PlayerInstance && _PlayerInstance.$Quit();
                _PlayerInstance && _PlayerInstance.$Disable();
                _SelfSlideItem.$UnhideContentForSlideshow();
                _Processor && _Processor.$Abort();
                _Processor = null;
                ResetCaptionSlider();
            };

            //for debug only
            _SelfSlideItem.$StampSlideItemElements = function (stamp) {
                stamp = _SequenceNumber + "_" + stamp;

                $JssorDebug$.$Execute(function () {
                    if (_ImageItem)
                        $JssorUtils$.$SetAttribute(_ImageItem, "debug-id", stamp + "_slide_item_image_id");

                    $JssorUtils$.$SetAttribute(slideElmt, "debug-id", stamp + "_slide_item_item_id");
                });

                $JssorDebug$.$Execute(function () {
                    $JssorUtils$.$SetAttribute(_Wrapper, "debug-id", stamp + "_slide_item_wrapper_id");
                });

                $JssorDebug$.$Execute(function () {
                    $JssorUtils$.$SetAttribute(_LoadingScreen, "debug-id", stamp + "_loading_container_id");
                });
            };

            _SelfSlideItem.$HideContentForSlideshow = function () {
                $JssorUtils$.$HideElement(slideElmt);
            };

            _SelfSlideItem.$UnhideContentForSlideshow = function () {
                $JssorUtils$.$ShowElement(slideElmt);
            };

            _SelfSlideItem.$EnablePlayer = function () {
                _PlayerInstance && _PlayerInstance.$Enable();
            };

            function RefreshContent(elmt, fresh, level) {
                if (elmt["jssor-slider"])
                    return;

                level = level || 0;

                if (!_ContentRefreshed) {
                    if (elmt.tagName == "IMG") {
                        _ImageElmts.push(elmt);

                        if (!elmt.src) {
                            _ImageLazyLoading = true;
                            elmt["display-origin"] = $JssorUtils$.$CssDisplay(elmt);
                            $JssorUtils$.$HideElement(elmt);
                        }
                    }
                    if ($JssorUtils$.$IsBrowserIe9Earlier()) {
                        $JssorUtils$.$CssZIndex(elmt, ($JssorUtils$.$CssZIndex(elmt) || 0) + 1);
                    }
                    if (_Options.$HWA && $JssorUtils$.$GetWebKitVersion() > 0) {
                        //if ((_HandleTouchEventOnly && ($JssorUtils$.$GetWebKitVersion() < 534 || !_SlideshowEnabled)) || (!_HandleTouchEventOnly && $JssorUtils$.$GetWebKitVersion() < 535)) {
                        //    $JssorUtils$.$EnableHWA(elmt);
                        //}
                        if (!_HandleTouchEventOnly || ($JssorUtils$.$GetWebKitVersion() < 534 || !_SlideshowEnabled)) {
                            $JssorUtils$.$EnableHWA(elmt);
                        }
                    }
                }

                var childElements = $JssorUtils$.$GetChildren(elmt);

                $JssorUtils$.$Each(childElements, function (childElement, i) {

                    var uAttribute = $JssorUtils$.$GetAttributeEx(childElement, "u");
                    if (uAttribute == "player" && !_PlayerInstanceElement) {
                        _PlayerInstanceElement = childElement;
                        if (_PlayerInstanceElement.pInstance) {
                            PlayerAvailableEventHandler();
                        }
                        else {
                            $JssorUtils$.$AddEvent(_PlayerInstanceElement, "dataavailable", PlayerAvailableEventHandler);
                        }
                    }

                    if (uAttribute == "caption") {
                        if (!$JssorUtils$.$IsBrowserIE() && !fresh) {
                            var captionElement = $JssorUtils$.$CloneNode(childElement, true);
                            $JssorUtils$.$InsertBefore(elmt, captionElement, childElement);
                            $JssorUtils$.$RemoveChild(elmt, childElement);
                            childElement = captionElement;

                            fresh = true;
                        }
                    }
                    else if (!_ContentRefreshed && !level && !_ImageItem && $JssorUtils$.$GetAttributeEx(childElement, "u") == "image") {
                        _ImageItem = childElement;

                        if (_ImageItem) {
                            if (_ImageItem.tagName == "A") {
                                _LinkItemOrigin = _ImageItem;
                                $JssorUtils$.$SetStyles(_LinkItemOrigin, _StyleDef);

                                _LinkItem = $JssorUtils$.$CloneNode(_ImageItem, false);
                                //cancel click event on <A> element when a drag of slide succeeded
                                $JssorUtils$.$AddEvent(_LinkItem, "click", LinkClickEventHandler);

                                $JssorUtils$.$SetStyles(_LinkItem, _StyleDef);
                                $JssorUtils$.$CssDisplay(_LinkItem, "block");
                                $JssorUtils$.$CssOpacity(_LinkItem, 0);
                                $JssorUtils$.$Css(_LinkItem, "backgroundColor", "#000");

                                _ImageItem = $JssorUtils$.$FindFirstChildByTag(_ImageItem, "IMG");

                                $JssorDebug$.$Execute(function () {
                                    if (!_ImageItem) {
                                        $JssorDebug$.$Error("slide html code definition error, no 'IMG' found in a 'image with link' slide.\r\n" + elmt.outerHTML);
                                    }
                                });
                            }
                            _ImageItem.border = 0;

                            $JssorUtils$.$SetStyles(_ImageItem, _StyleDef);
                        }
                    }

                    RefreshContent(childElement, fresh, level + 1);
                });
            }

            _SelfSlideItem.$OnInnerOffsetChange = function (oldOffset, newOffset) {
                var slidePosition = _DisplayPieces - newOffset;

                SetPosition(_Wrapper, slidePosition);

                //following lines are for future usage, not ready yet
                //if (!_IsDragging || !_IsCaptionSliderPlayingWhenDragStart) {
                //    var _DealWithParallax;
                //    if (IsCurrentSlideIndex(slideIndex)) {
                //        if (_CaptionSliderOptions.$PlayOutMode == 2)
                //            _DealWithParallax = true;
                //    }
                //    else {
                //        if (!_CaptionSliderOptions.$PlayInMode) {
                //            //PlayInMode: 0 none
                //            _CaptionSliderIn.$GoToEnd();
                //        }
                //        //else if (_CaptionSliderOptions.$PlayInMode == 1) {
                //        //    //PlayInMode: 1 chain
                //        //    _CaptionSliderIn.$GoToBegin();
                //        //}
                //        else if (_CaptionSliderOptions.$PlayInMode == 2) {
                //            //PlayInMode: 2 parallel
                //            _DealWithParallax = true;
                //        }
                //    }

                //    if (_DealWithParallax) {
                //        _CaptionSliderIn.$GoToPosition((_CaptionSliderIn.$GetPosition_OuterEnd() - _CaptionSliderIn.$GetPosition_OuterBegin()) * Math.abs(newOffset - 1) * .8 + _CaptionSliderIn.$GetPosition_OuterBegin());
                //    }
                //}
            };

            _SelfSlideItem.$GetCaptionSliderIn = function () {
                return _CaptionSliderIn;
            };

            _SelfSlideItem.$GetCaptionSliderOut = function () {
                return _CaptionSliderOut;
            };

            _SelfSlideItem.$Index = slideIndex;

            $JssorEventManager$.call(_SelfSlideItem);

            //SlideItem Constructor
            {

                var thumb = $JssorUtils$.$FindFirstChildByAttribute(slideElmt, "thumb");
                if (thumb) {
                    _SelfSlideItem.$Thumb = $JssorUtils$.$CloneNode(thumb, true);
                    $JssorUtils$.$RemoveAttribute(thumb, "id");
                    $JssorUtils$.$HideElement(thumb);
                }
                $JssorUtils$.$ShowElement(slideElmt);

                _LoadingScreen = $JssorUtils$.$CloneNode(_LoadingContainer, true);
                $JssorUtils$.$CssZIndex(_LoadingScreen, 1000);

                //cancel click event on <A> element when a drag of slide succeeded
                $JssorUtils$.$AddEvent(slideElmt, "click", LinkClickEventHandler);

                ResetCaptionSlider(true);

                _SelfSlideItem.$Image = _ImageItem;
                _SelfSlideItem.$Link = _LinkItem;

                _SelfSlideItem.$Item = slideElmt;

                _SelfSlideItem.$Wrapper = _Wrapper = slideElmt;
                $JssorUtils$.$AppendChild(_Wrapper, _LoadingScreen);

                _SelfSlider.$On(203, ParkEventHandler);
                _SelfSlider.$On(28, FreezeEventHandler);
                _SelfSlider.$On(24, SwipeStartEventHandler);

                $JssorDebug$.$Execute(function () {
                    _SequenceNumber = _SlideItemCreatedCount++;
                });

                $JssorDebug$.$Execute(function () {
                    $JssorUtils$.$SetAttribute(_Wrapper, "debug-id", "slide-" + slideIndex);
                });
            }
        }
        //SlideItem

        //Processor
        function Processor(slideIndex, slideshowProcessor, captionSliderIn, captionSliderOut) {

            var _SelfProcessor = this;

            var _ProgressBegin = 0;
            var _SlideshowBegin = 0;
            var _SlideshowEnd;
            var _CaptionInBegin;
            var _IdleBegin;
            var _IdleEnd;
            var _ProgressEnd;

            var _IsSlideshowRunning;
            var _IsRollingBack;

            var _PlayerInstance;
            var _IsPlayerOnService;

            var slideItem = _SlideItems[slideIndex];

            $JssorAnimator$.call(_SelfProcessor, 0, 0);

            function UpdateLink() {

                $JssorUtils$.$ClearChildren(_LinkContainer);

                if (_ShowLink && _IsSlideshowRunning && slideItem.$Link) {
                    $JssorUtils$.$AppendChild(_LinkContainer, slideItem.$Link);
                }

                $JssorUtils$.$ShowElement(_LinkContainer, _IsSlideshowRunning || !slideItem.$Image);
            }

            function ProcessCompleteEventHandler() {

                if (_IsRollingBack) {
                    _IsRollingBack = false;
                    _SelfSlider.$TriggerEvent(JssorSlider.$EVT_ROLLBACK_END, slideIndex, _IdleEnd, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);
                    _SelfProcessor.$GoToPosition(_IdleBegin);
                }

                _SelfProcessor.$Replay();
            }

            function PlayerSwitchEventHandler(isOnService) {
                _IsPlayerOnService = isOnService;

                _SelfProcessor.$Stop();
                _SelfProcessor.$Replay();
            }

            _SelfProcessor.$Replay = function () {

                var currentPosition = _SelfProcessor.$GetPosition_Display();

                if (!_IsDragging && !_IsSliding && !_IsPlayerOnService && _CurrentSlideIndex == slideIndex) {

                    if (!currentPosition) {
                        if (_SlideshowEnd && !_IsSlideshowRunning) {
                            _IsSlideshowRunning = true;

                            _SelfProcessor.$OpenSlideshowPanel(true);

                            _SelfSlider.$TriggerEvent(JssorSlider.$EVT_SLIDESHOW_START, slideIndex, _ProgressBegin, _SlideshowBegin, _SlideshowEnd, _ProgressEnd);
                        }

                        UpdateLink();
                    }

                    var toPosition;
                    var stateEvent = JssorSlider.$EVT_STATE_CHANGE;

                    if (currentPosition != _ProgressEnd) {
                        if (currentPosition == _IdleEnd) {
                            toPosition = _ProgressEnd;
                        }
                        else if (currentPosition == _IdleBegin) {
                            toPosition = _IdleEnd;
                        }
                        else if (!currentPosition) {
                            toPosition = _IdleBegin;
                        }
                        else if (currentPosition > _IdleEnd) {
                            _IsRollingBack = true;
                            toPosition = _IdleEnd;
                            stateEvent = JssorSlider.$EVT_ROLLBACK_START;
                        }
                        else {
                            //continue from break (by drag or lock)
                            toPosition = _SelfProcessor.$GetPlayToPosition();
                        }
                    }

                    _SelfSlider.$TriggerEvent(stateEvent, slideIndex, currentPosition, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);

                    var allowAutoPlay = _AutoPlay && (!_HoverToPause || _HoverStatus);

                    if (currentPosition == _ProgressEnd) {
                        allowAutoPlay && slideItem.$GoForNextSlide();
                    }
                    else if (allowAutoPlay || currentPosition != _IdleEnd) {
                        _SelfProcessor.$PlayToPosition(toPosition, ProcessCompleteEventHandler);
                    }
                }
            };

            _SelfProcessor.$AdjustIdleOnPark = function () {
                if (_IdleEnd == _ProgressEnd && _IdleEnd == _SelfProcessor.$GetPosition_Display())
                    _SelfProcessor.$GoToPosition(_IdleBegin);
            };

            _SelfProcessor.$Abort = function () {
                _SlideshowRunner && _SlideshowRunner.$Index == slideIndex && _SlideshowRunner.$Clear();

                var currentPosition = _SelfProcessor.$GetPosition_Display();
                if (currentPosition < _ProgressEnd) {
                    _SelfSlider.$TriggerEvent(JssorSlider.$EVT_STATE_CHANGE, slideIndex, -currentPosition -1, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);
                }
            };

            _SelfProcessor.$OpenSlideshowPanel = function (open) {
                if (slideshowProcessor) {
                    $JssorUtils$.$CssOverflow(_SlideshowPanel, open && slideshowProcessor.$Transition.$Outside ? "" : "hidden");
                }
            };

            _SelfProcessor.$OnInnerOffsetChange = function (oldPosition, newPosition) {

                if (_IsSlideshowRunning && newPosition >= _SlideshowEnd) {
                    _IsSlideshowRunning = false;
                    UpdateLink();
                    slideItem.$UnhideContentForSlideshow();
                    _SlideshowRunner.$Clear();

                    _SelfSlider.$TriggerEvent(JssorSlider.$EVT_SLIDESHOW_END, slideIndex, _ProgressBegin, _SlideshowBegin, _SlideshowEnd, _ProgressEnd);
                }

                _SelfSlider.$TriggerEvent(JssorSlider.$EVT_PROGRESS_CHANGE, slideIndex, newPosition, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);
            };

            _SelfProcessor.$SetPlayer = function (playerInstance) {
                if (playerInstance && !_PlayerInstance) {
                    _PlayerInstance = playerInstance;

                    playerInstance.$On($JssorPlayer$.$EVT_SWITCH, PlayerSwitchEventHandler);
                }
            };

            //Processor Constructor
            {
                if (slideshowProcessor) {
                    _SelfProcessor.$Chain(slideshowProcessor);
                }

                _SlideshowEnd = _SelfProcessor.$GetPosition_OuterEnd();
                _CaptionInBegin = _SelfProcessor.$GetPosition_OuterEnd();
                _SelfProcessor.$Chain(captionSliderIn);
                _IdleBegin = captionSliderIn.$GetPosition_OuterEnd();
                _IdleEnd = _IdleBegin + _Options.$AutoPlayInterval;

                captionSliderOut.$Shift(_IdleEnd);
                _SelfProcessor.$Combine(captionSliderOut);
                _ProgressEnd = _SelfProcessor.$GetPosition_OuterEnd();
            }
        }
        //Processor
        //private classes

        function SetPosition(elmt, position) {
            var orientation = _DragOrientation > 0 ? _DragOrientation : _PlayOrientation;
            var x = _StepLengthX * position * (orientation & 1);
            var y = _StepLengthY * position * ((orientation >> 1) & 1);

            if ($JssorUtils$.$IsBrowserChrome()) {
                x = x.toFixed(3);
                y = y.toFixed(3);
            }
            else {
                x = Math.round(x);
                y = Math.round(y);
            }

            if ($JssorUtils$.$IsBrowserIE() && $JssorUtils$.$GetBrowserVersion() >= 10 && $JssorUtils$.$GetBrowserVersion() < 11) {
                elmt.style.msTransform = "translate(" + x + "px, " + y + "px)";
            }
            else if ($JssorUtils$.$IsBrowserChrome() && $JssorUtils$.$GetBrowserVersion() >= 30 && $JssorUtils$.$GetBrowserVersion() < 34) {
                elmt.style.WebkitTransition = "transform 0s";
                elmt.style.WebkitTransform = "translate3d(" + x + "px, " + y + "px, 0px) perspective(2000px)";
            }
            else {
                $JssorUtils$.$CssLeft(elmt, x);
                $JssorUtils$.$CssTop(elmt, y);
            }
        }

        //Event handling begin

        function OnMouseDown(event) {
            var tagName = $JssorUtils$.$GetEventSrcElement(event).tagName;
            if (!_DragOrientationRegistered && tagName != "INPUT" && tagName != "TEXTAREA" && RegisterDrag()) {
                OnDragStart(event);
            }
        }

        function Freeze() {

            _CarouselPlaying_OnFreeze = _IsSliding;
            _PlayToPosition_OnFreeze = _CarouselPlayer.$GetPlayToPosition();
            _Position_OnFreeze = _Conveyor.$GetPosition();

            if (_IsDragging || !_HoverStatus && (_HoverToPause & 12)) {
                _CarouselPlayer.$Stop();

                _SelfSlider.$TriggerEvent(JssorSlider.$EVT_FREEZE);
            }
        }

        function Unfreeze(byDrag) {

            if (!_IsDragging && (_HoverStatus || !(_HoverToPause & 12)) && !_CarouselPlayer.$IsPlaying()) {

                var currentPosition = _Conveyor.$GetPosition();
                var toPosition = Math.ceil(_Position_OnFreeze);

                if (byDrag && Math.abs(_DragOffsetTotal) >= _Options.$MinDragOffsetToSlide) {
                    toPosition = Math.ceil(currentPosition);
                    toPosition += _DragIndexAdjust;
                }

                if (!(_Loop & 1)) {
                    toPosition = Math.min(_SlideCount - _DisplayPieces, Math.max(toPosition, 0));
                }

                var t = Math.abs(toPosition - currentPosition);
                t = 1 - Math.pow(1 - t, 5);

                if (!_LastDragSucceded && _CarouselPlaying_OnFreeze) {
                    _CarouselPlayer.$Continue(_PlayToPosition_OnFreeze);
                }
                else if (currentPosition == toPosition) {
                    _CurrentSlideItem.$EnablePlayer();
                    _CurrentSlideItem.$TryActivate();
                }
                else {

                    _CarouselPlayer.$PlayCarousel(currentPosition, toPosition, t * _SlideDuration);
                }
            }
        }

        function OnDragStart(event) {

            _IsDragging = true;
            _DragInvalid = false;
            _LoadingTicket = null;

            $JssorUtils$.$AddEvent(document, _MoveEvent, OnDragMove);

            _LastTimeMoveByDrag = $JssorUtils$.$GetNow() - 50;

            _LastDragSucceded = 0;
            Freeze();

            if (!_CarouselPlaying_OnFreeze)
                _DragOrientation = 0;

            if (_HandleTouchEventOnly) {
                var touchPoint = event.touches[0];
                _DragStartMouseX = touchPoint.clientX;
                _DragStartMouseY = touchPoint.clientY;
            }
            else {
                var mousePoint = $JssorUtils$.$GetMousePosition(event);

                _DragStartMouseX = mousePoint.x;
                _DragStartMouseY = mousePoint.y;

                $JssorUtils$.$CancelEvent(event);
            }

            _DragOffsetTotal = 0;
            _DragOffsetLastTime = 0;
            _DragIndexAdjust = 0;

            //Trigger EVT_DRAGSTART
            _SelfSlider.$TriggerEvent(JssorSlider.$EVT_DRAG_START, GetRealIndex(_Position_OnFreeze), _Position_OnFreeze, event);
        }

        function OnDragMove(event) {
            if (_IsDragging && (!$JssorUtils$.$IsBrowserIe9Earlier() || event.button)) {
                var actionPoint;

                if (_HandleTouchEventOnly) {
                    var touches = event.touches;
                    if (touches && touches.length > 0) {
                        actionPoint = new $JssorPoint$(touches[0].clientX, touches[0].clientY);
                    }
                }
                else {
                    actionPoint = $JssorUtils$.$GetMousePosition(event);
                }

                if (actionPoint) {
                    var distanceX = actionPoint.x - _DragStartMouseX;
                    var distanceY = actionPoint.y - _DragStartMouseY;


                    if (Math.floor(_Position_OnFreeze) != _Position_OnFreeze)
                        _DragOrientation = _DragOrientation || (_PlayOrientation & _DragOrientationRegistered);

                    if ((distanceX || distanceY) && !_DragOrientation) {
                        if (_DragOrientationRegistered == 3) {
                            if (Math.abs(distanceY) > Math.abs(distanceX)) {
                                _DragOrientation = 2;
                            }
                            else
                                _DragOrientation = 1;
                        }
                        else {
                            _DragOrientation = _DragOrientationRegistered;
                        }

                        if (_HandleTouchEventOnly && _DragOrientation == 1 && Math.abs(distanceY) - Math.abs(distanceX) > 3) {
                            _DragInvalid = true;
                        }
                    }

                    if (_DragOrientation) {
                        var distance = distanceY;
                        var stepLength = _StepLengthY;

                        if (_DragOrientation == 1) {
                            distance = distanceX;
                            stepLength = _StepLengthX;
                        }

                        if (!(_Loop & 1)) {
                            if (distance > 0) {
                                var normalDistance = stepLength * _CurrentSlideIndex;
                                var sqrtDistance = distance - normalDistance;
                                if (sqrtDistance > 0) {
                                    distance = normalDistance + Math.sqrt(sqrtDistance) * 5;
                                }
                            }

                            if (distance < 0) {
                                var normalDistance = stepLength * (_SlideCount - _DisplayPieces - _CurrentSlideIndex);
                                var sqrtDistance = -distance - normalDistance;

                                if (sqrtDistance > 0) {
                                    distance = -normalDistance - Math.sqrt(sqrtDistance) * 5;
                                }
                            }
                        }

                        if (_DragOffsetTotal - _DragOffsetLastTime < -2) {
                            _DragIndexAdjust = 0;
                        }
                        else if (_DragOffsetTotal - _DragOffsetLastTime > 2) {
                            _DragIndexAdjust = -1;
                        }

                        _DragOffsetLastTime = _DragOffsetTotal;
                        _DragOffsetTotal = distance;
                        _PositionToGoByDrag = _Position_OnFreeze - _DragOffsetTotal / stepLength / (_ScaleRatio || 1);

                        if (_DragOffsetTotal && _DragOrientation && !_DragInvalid) {
                            $JssorUtils$.$CancelEvent(event);
                            if (!_IsSliding) {
                                _CarouselPlayer.$StandBy(_PositionToGoByDrag);
                            }
                            else
                                _CarouselPlayer.$SetStandByPosition(_PositionToGoByDrag);
                        }
                        else if ($JssorUtils$.$IsBrowserIe9Earlier()) {
                            $JssorUtils$.$CancelEvent(event);
                        }
                    }
                }
            }
            else {
                OnDragEnd(event);
            }
        }

        function OnDragEnd(event) {
            UnregisterDrag();

            if (_IsDragging) {

                _IsDragging = false;

                _LastTimeMoveByDrag = $JssorUtils$.$GetNow();

                $JssorUtils$.$RemoveEvent(document, _MoveEvent, OnDragMove);

                _LastDragSucceded = _DragOffsetTotal;

                _LastDragSucceded && $JssorUtils$.$CancelEvent(event);

                _CarouselPlayer.$Stop();

                var currentPosition = _Conveyor.$GetPosition();

                //Trigger EVT_DRAG_END
                _SelfSlider.$TriggerEvent(JssorSlider.$EVT_DRAG_END, GetRealIndex(currentPosition), currentPosition, GetRealIndex(_Position_OnFreeze), _Position_OnFreeze, event);

                Unfreeze(true);

                Freeze();
            }
        }
        //Event handling end

        function SetCurrentSlideIndex(index) {
            _PrevSlideItem = _SlideItems[_CurrentSlideIndex];
            _PreviousSlideIndex = _CurrentSlideIndex;
            _CurrentSlideIndex = GetRealIndex(index);
            _CurrentSlideItem = _SlideItems[_CurrentSlideIndex];
            ResetNavigator(index);
            return _CurrentSlideIndex;
        }

        function OnPark(slideIndex, prevIndex) {
            _DragOrientation = 0;

            SetCurrentSlideIndex(slideIndex);

            //Trigger EVT_PARK
            _SelfSlider.$TriggerEvent(JssorSlider.$EVT_PARK, GetRealIndex(slideIndex), prevIndex);
        }

        function ResetNavigator(index, temp) {
            _TempSlideIndex = index;
            $JssorUtils$.$Each(_Navigators, function (navigator) {
                navigator.$SetCurrentIndex(GetRealIndex(index), index, temp);
            });
        }

        function RegisterDrag() {
            var dragRegistry = JssorSlider.$DragRegistry || 0;
            var dragOrientation = _DragEnabled;
            if (_HandleTouchEventOnly)
                (dragOrientation & 1) && (dragOrientation &= 1);
            JssorSlider.$DragRegistry |= dragOrientation;

            return (_DragOrientationRegistered = dragOrientation & ~dragRegistry);
        }

        function UnregisterDrag() {
            if (_DragOrientationRegistered) {
                JssorSlider.$DragRegistry &= ~_DragEnabled;
                _DragOrientationRegistered = 0;
            }
        }

        function CreatePanel() {
            var div = $JssorUtils$.$CreateDivElement();

            $JssorUtils$.$SetStyles(div, _StyleDef);
            $JssorUtils$.$CssPosition(div, "absolute");

            return div;
        }

        function GetRealIndex(index) {
            return (index % _SlideCount + _SlideCount) % _SlideCount;
        }

        function IsCurrentSlideIndex(index) {
            return GetRealIndex(index) == _CurrentSlideIndex;
        }

        function IsPreviousSlideIndex(index) {
            return GetRealIndex(index) == _PreviousSlideIndex;
        }

        //Navigation Request Handler
        function NavigationClickHandler(index, relative) {
            if (relative) {
                if (!_Loop) {
                    //Stop at threshold
                    index = Math.min(Math.max(index + _TempSlideIndex, 0), _SlideCount - _DisplayPieces);
                    relative = false;
                }
                else if (_Loop & 2) {
                    //Rewind
                    index = GetRealIndex(index + _TempSlideIndex);
                    relative = false;
                }
            }
            PlayTo(index, _Options.$SlideDuration, relative);
        }

        function ShowNavigators() {
            $JssorUtils$.$Each(_Navigators, function (navigator) {
                navigator.$Show(navigator.$Options.$ChanceToShow > _HoverStatus);
            });
        }

        function MainContainerMouseLeaveEventHandler() {
            if (!_HoverStatus) {

                //$JssorDebug$.$Log("mouseleave");

                _HoverStatus = 1;

                ShowNavigators();

                if (!_IsDragging) {
                    (_HoverToPause & 12) && Unfreeze();
                    (_HoverToPause & 3) && _SlideItems[_CurrentSlideIndex].$TryActivate();
                }
            }
        }

        function MainContainerMouseEnterEventHandler() {

            if (_HoverStatus) {

                //$JssorDebug$.$Log("mouseenter");

                _HoverStatus = 0;

                ShowNavigators();

                _IsDragging || !(_HoverToPause & 12) || Freeze();
            }
        }

        function AdjustSlidesContainerSize() {
            _StyleDef = { $Width: _SlideWidth, $Height: _SlideHeight, $Top: 0, $Left: 0 };

            $JssorUtils$.$Each(_SlideElmts, function (slideElmt, i) {

                $JssorUtils$.$SetStyles(slideElmt, _StyleDef);
                $JssorUtils$.$CssPosition(slideElmt, "absolute");
                $JssorUtils$.$CssOverflow(slideElmt, "hidden");

                $JssorUtils$.$HideElement(slideElmt);
            });

            $JssorUtils$.$SetStyles(_LoadingContainer, _StyleDef);
        }

        function PlayToOffset(offset, slideDuration) {
            PlayTo(offset, slideDuration, true);
        }

        function PlayTo(slideIndex, slideDuration, relative) {
            ///	<summary>
            ///		PlayTo( slideIndex [, slideDuration] ); //Play slider to position 'slideIndex' within a period calculated base on 'slideDuration'.
            ///	</summary>
            ///	<param name="slideIndex" type="Number">
            ///		slide slideIndex or position will be playing to
            ///	</param>
            ///	<param name="slideDuration" type="Number" optional="true">
            ///		base slide duration in milliseconds to calculate the whole duration to complete this play request.
            ///	    default value is '$SlideDuration' value which is specified when initialize the slider.
            ///	</param>
            /// http://msdn.microsoft.com/en-us/library/vstudio/bb385682.aspx
            /// http://msdn.microsoft.com/en-us/library/vstudio/hh542720.aspx
            if (_CarouselEnabled && (!_IsDragging || _Options.$NaviQuitDrag)) {
                _IsSliding = true;
                _IsDragging = false;
                _CarouselPlayer.$Stop();

                {
                    //Slide Duration
                    if ($JssorUtils$.$IsUndefined(slideDuration))
                        slideDuration = _SlideDuration;

                    var positionDisplay = _Carousel.$GetPosition_Display();
                    var positionTo = slideIndex;
                    if (relative) {
                        positionTo = positionDisplay + slideIndex;
                        if (slideIndex > 0)
                            positionTo = Math.ceil(positionTo);
                        else
                            positionTo = Math.floor(positionTo);
                    }


                    if (!(_Loop & 1)) {
                        positionTo = GetRealIndex(positionTo);
                        positionTo = Math.max(0, Math.min(positionTo, _SlideCount - _DisplayPieces));
                    }

                    var positionOffset = (positionTo - positionDisplay) % _SlideCount;
                    positionTo = positionDisplay + positionOffset;

                    var duration = positionDisplay == positionTo ? 0 : slideDuration * Math.abs(positionOffset);
                    duration = Math.min(duration, slideDuration * _DisplayPieces * 1.5);

                    _CarouselPlayer.$PlayCarousel(positionDisplay, positionTo, duration || 1);
                }
            }
        }

        //private functions

        //member functions

        _SelfSlider.$PlayTo = PlayTo;

        _SelfSlider.$GoTo = function (slideIndex) {
            ///	<summary>
            ///		instance.$GoTo( slideIndex );   //Go to the specifed slide immediately with no play.
            ///	</summary>
            PlayTo(slideIndex, 1);
        };

        _SelfSlider.$Next = function () {
            ///	<summary>
            ///		instance.$Next();   //Play the slider to next slide.
            ///	</summary>
            PlayToOffset(1);
        };

        _SelfSlider.$Prev = function () {
            ///	<summary>
            ///		instance.$Prev();   //Play the slider to previous slide.
            ///	</summary>
            PlayToOffset(-1);
        };

        _SelfSlider.$Pause = function () {
            ///	<summary>
            ///		instance.$Pause();   //Pause the slider, prevent it from auto playing.
            ///	</summary>
            _AutoPlay = false;
        };

        _SelfSlider.$Play = function () {
            ///	<summary>
            ///		instance.$Play();   //Start auto play if the slider is currently paused.
            ///	</summary>
            if (!_AutoPlay) {
                _AutoPlay = true;
                _SlideItems[_CurrentSlideIndex] && _SlideItems[_CurrentSlideIndex].$TryActivate();
            }
        };

        _SelfSlider.$SetSlideshowTransitions = function (transitions) {
            ///	<summary>
            ///		instance.$SetSlideshowTransitions( transitions );   //Reset slideshow transitions for the slider.
            ///	</summary>
            $JssorDebug$.$Execute(function () {
                if (!transitions || !transitions.length) {
                    $JssorDebug$.$Error("Can not set slideshow transitions, no transitions specified.");
                }
            });

            $JssorUtils$.$TranslateTransitions(transitions);    //for old transition compatibility
            _Options.$SlideshowOptions.$Transitions = transitions;
        };

        _SelfSlider.$SetCaptionTransitions = function (transitions) {
            ///	<summary>
            ///		instance.$SetCaptionTransitions( transitions );   //Reset caption transitions for the slider.
            ///	</summary>
            $JssorDebug$.$Execute(function () {
                if (!transitions || !transitions.length) {
                    $JssorDebug$.$Error("Can not set caption transitions, no transitions specified");
                }
            });

            $JssorUtils$.$TranslateTransitions(transitions);    //for old transition compatibility
            _CaptionSliderOptions.$CaptionTransitions = transitions;
            _CaptionSliderOptions.$Version = $JssorUtils$.$GetNow();
        };

        _SelfSlider.$SlidesCount = function () {
            ///	<summary>
            ///		instance.$SlidesCount();   //Retrieve slides count of the slider.
            ///	</summary>
            return _SlideElmts.length;
        };

        _SelfSlider.$CurrentIndex = function () {
            ///	<summary>
            ///		instance.$CurrentIndex();   //Retrieve current slide index of the slider.
            ///	</summary>
            return _CurrentSlideIndex;
        };

        _SelfSlider.$IsAutoPlaying = function () {
            ///	<summary>
            ///		instance.$IsAutoPlaying();   //Retrieve auto play status of the slider.
            ///	</summary>
            return _AutoPlay;
        };

        _SelfSlider.$IsDragging = function () {
            ///	<summary>
            ///		instance.$IsDragging();   //Retrieve drag status of the slider.
            ///	</summary>
            return _IsDragging;
        };

        _SelfSlider.$IsSliding = function () {
            ///	<summary>
            ///		instance.$IsSliding();   //Retrieve right<-->left sliding status of the slider.
            ///	</summary>
            return _IsSliding;
        };

        _SelfSlider.$IsMouseOver = function () {
            ///	<summary>
            ///		instance.$IsMouseOver();   //Retrieve mouse over status of the slider.
            ///	</summary>
            return !_HoverStatus;
        };

        _SelfSlider.$LastDragSucceded = function () {
            ///	<summary>
            ///		instance.$IsLastDragSucceded();   //Retrieve last drag succeded status, returns 0 if failed, returns drag offset if succeded
            ///	</summary>
            return _LastDragSucceded;
        };

        _SelfSlider.$GetOriginalWidth = function () {
            ///	<summary>
            ///		instance.$GetOriginalWidth();   //Retrieve original width of the slider.
            ///	</summary>
            return $JssorUtils$.$CssWidth(_ScaleWrapper || elmt);
        };

        _SelfSlider.$GetOriginalHeight = function () {
            ///	<summary>
            ///		instance.$GetOriginalWidth();   //Retrieve original height of the slider.
            ///	</summary>
            return $JssorUtils$.$CssHeight(_ScaleWrapper || elmt);
        };

        _SelfSlider.$GetScaleWidth = function () {
            ///	<summary>
            ///		instance.$GetScaleWidth();   //Retrieve scaled width the slider currently displays.
            ///	</summary>
            return $JssorUtils$.$CssWidth(elmt);
        };

        _SelfSlider.$GetScaleHeight = function () {
            ///	<summary>
            ///		instance.$GetScaleHeight();   //Retrieve scaled height the slider currently displays.
            ///	</summary>
            return $JssorUtils$.$CssHeight(elmt);
        };

        _SelfSlider.$SetScaleWidth = function (width) {
            ///	<summary>
            ///		instance.$SetScaleWidth( width );   //Scale the slider to new width and keep aspect ratio.
            ///	</summary>
            $JssorDebug$.$Execute(function () {
                if (!width || width < 0) {
                    $JssorDebug$.$Fail("'$SetScaleWidth' error, 'width' should be positive value.");
                }
            });

            if (!_ScaleWrapper) {
                $JssorDebug$.$Execute(function () {
                    var originalWidthStr = $JssorUtils$.$Css(elmt, "width");
                    var originalHeightStr = $JssorUtils$.$Css(elmt, "height");
                    var originalWidth = $JssorUtils$.$CssP(elmt, "width");
                    var originalHeight = $JssorUtils$.$CssP(elmt, "height");

                    if (!originalWidthStr) {
                        $JssorDebug$.$Fail("Cannot scale jssor slider, 'width' of 'outer container' not specified. Please specify 'width' in pixel. e.g. 'width: 600px;'");
                    }

                    if (!originalHeightStr) {
                        $JssorDebug$.$Fail("Cannot scale jssor slider, 'height' of 'outer container' not specified. Please specify 'height' in pixel. e.g. 'height: 300px;'");
                    }

                    if (originalWidthStr.indexOf('%') != -1) {
                        $JssorDebug$.$Fail("Cannot scale jssor slider, 'width' of 'outer container' not valid. Please specify 'width' in pixel. e.g. 'width: 600px;'");
                    }

                    if (originalHeightStr.indexOf('%') != -1) {
                        $JssorDebug$.$Fail("Cannot scale jssor slider, 'height' of 'outer container' not valid. Please specify 'height' in pixel. e.g. 'height: 300px;'");
                    }

                    if (!originalWidth) {
                        $JssorDebug$.$Fail("Cannot scale jssor slider, 'width' of 'outer container' not valid. 'width' of 'outer container' should be positive number. e.g. 'width: 600px;'");
                    }

                    if (!originalHeight) {
                        $JssorDebug$.$Fail("Cannot scale jssor slider, 'height' of 'outer container' not valid. 'height' of 'outer container' should be positive number. e.g. 'height: 300px;'");
                    }
                });

                //var innerWrapper = $JssorUtils$.$CloneNode(elmt, false);
                //$JssorUtils$.$RemoveAttribute(innerWrapper, "id");
                var innerWrapper = $JssorUtils$.$CreateDivElement(document);
                $JssorUtils$.$CssCssText(innerWrapper, $JssorUtils$.$CssCssText(elmt));
                $JssorUtils$.$SetClassName(innerWrapper, $JssorUtils$.$GetClassName(elmt));

                $JssorUtils$.$CssPosition(innerWrapper, "relative");
                $JssorUtils$.$CssTop(innerWrapper, 0);
                $JssorUtils$.$CssLeft(innerWrapper, 0);
                $JssorUtils$.$CssOverflow(innerWrapper, "visible");

                //_ScaleWrapper = $JssorUtils$.$CloneNode(elmt, false);
                //$JssorUtils$.$RemoveAttribute(_ScaleWrapper, "id");
                //$JssorUtils$.$CssCssText(_ScaleWrapper, "");
                _ScaleWrapper = $JssorUtils$.$CreateDivElement(document);

                $JssorUtils$.$CssPosition(_ScaleWrapper, "absolute");
                $JssorUtils$.$CssTop(_ScaleWrapper, 0);
                $JssorUtils$.$CssLeft(_ScaleWrapper, 0);
                $JssorUtils$.$CssWidth(_ScaleWrapper, $JssorUtils$.$CssWidth(elmt));
                $JssorUtils$.$CssHeight(_ScaleWrapper, $JssorUtils$.$CssHeight(elmt));
                $JssorUtils$.$SetStyleTransformOrigin(_ScaleWrapper, "0 0");

                $JssorUtils$.$AppendChild(_ScaleWrapper, innerWrapper);

                var children = $JssorUtils$.$GetChildren(elmt);
                $JssorUtils$.$AppendChild(elmt, _ScaleWrapper);

                $JssorUtils$.$Css(elmt, "backgroundImage", "");

                var noMoveElmts = {
                    "navigator": _BulletNavigatorOptions && _BulletNavigatorOptions.$Scale == false,
                    "arrowleft": _ArrowNavigatorOptions && _ArrowNavigatorOptions.$Scale == false,
                    "arrowright": _ArrowNavigatorOptions && _ArrowNavigatorOptions.$Scale == false,
                    "thumbnavigator": _ThumbnailNavigatorOptions && _ThumbnailNavigatorOptions.$Scale == false,
                    "thumbwrapper": _ThumbnailNavigatorOptions && _ThumbnailNavigatorOptions.$Scale == false
                };

                $JssorUtils$.$Each(children, function (child) {
                    $JssorUtils$.$AppendChild(noMoveElmts[$JssorUtils$.$GetAttributeEx(child, "u")] ? elmt : innerWrapper, child);
                });

                $JssorUtils$.$ShowElement(innerWrapper);
                $JssorUtils$.$ShowElement(_ScaleWrapper);
            }

            $JssorDebug$.$Execute(function () {
                if (!_InitialScrollWidth) {
                    _InitialScrollWidth = _SelfSlider.$Elmt.scrollWidth;
                }
            });

            _ScaleRatio = width / $JssorUtils$.$CssWidth(_ScaleWrapper);
            $JssorUtils$.$SetStyleScale(_ScaleWrapper, _ScaleRatio);

            $JssorUtils$.$CssWidth(elmt, width);
            $JssorUtils$.$CssHeight(elmt, _ScaleRatio * $JssorUtils$.$CssHeight(_ScaleWrapper));

            $JssorUtils$.$Each(_Navigators, function (navigator) {
                navigator.$Relocate();
            });
        };

        _SelfSlider.$GetVirtualIndex = function (index) {
            var parkingIndex = Math.ceil(GetRealIndex(_ParkingPosition / _StepLength));
            var displayIndex = GetRealIndex(index - _CurrentSlideIndex + parkingIndex);

            if (displayIndex > _DisplayPieces) {
                if (index - _CurrentSlideIndex > _SlideCount / 2)
                    index -= _SlideCount;
                else if (index - _CurrentSlideIndex <= -_SlideCount / 2)
                    index += _SlideCount;
            }
            else {
                index = _CurrentSlideIndex + displayIndex - parkingIndex;
            }

            return index;
        };

        //member functions

        //Inherit $JssorEventManager$
        $JssorEventManager$.call(this);

        //initialize member variables
        _SelfSlider.$Elmt = elmt = $JssorUtils$.$GetElement(elmt);
        //initialize member variables

        var _InitialScrollWidth;    //for debug only
        var _CaptionSliderCount = 1;    //for debug only

        $JssorDebug$.$Execute(function () {
            var outerContainerElmt = $JssorUtils$.$GetElement(elmt);
            if (!outerContainerElmt)
                $JssorDebug$.$Fail("Outer container '" + elmt + "' not found.");
        });

        var _Options = $JssorUtils$.$Extend({
            $FillMode: 0,                   //[Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
            $LazyLoading: 1,                //[Optional] For image with  lazy loading format (<IMG src2="url" .../>), by default it will be loaded only when the slide comes.
            //But an integer value (maybe 0, 1, 2 or 3) indicates that how far of nearby slides should be loaded immediately as well, default value is 1.
            $StartIndex: 0,                 //[Optional] Index of slide to display when initialize, default value is 0
            $AutoPlay: false,               //[Optional] Whether to auto play, default value is false
            $Loop: 1,                       //[Optional] Enable loop(circular) of carousel or not, 0: stop, 1: loop, 2 rewind, default value is 1
            $HWA: true,                     //[Optional] Enable hardware acceleration or not, default value is true
            $NaviQuitDrag: true,
            $AutoPlaySteps: 1,              //[Optional] Steps to go of every play (this options applys only when slideshow disabled), default value is 1
            $AutoPlayInterval: 3000,        //[Optional] Interval to play next slide since the previous stopped if a slideshow is auto playing, default value is 3000
            $PauseOnHover: 1,               //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

            $SlideDuration: 500,            //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 400
            $SlideEasing: $JssorEasing$.$EaseOutQuad,   //[Optional] Specifies easing for right to left animation, default value is $JssorEasing$.$EaseOutQuad
            $MinDragOffsetToSlide: 20,      //[Optional] Minimum drag offset that trigger slide, default value is 20
            $SlideSpacing: 0, 				//[Optional] Space between each slide in pixels, default value is 0
            $DisplayPieces: 1,              //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), default value is 1
            $ParkingPosition: 0,            //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
            $UISearchMode: 1,               //[Optional] The way (0 parellel, 1 recursive, default value is recursive) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc.
            $PlayOrientation: 1,            //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
            $DragOrientation: 1             //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 both, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)

        }, options);

        //Sodo statement for development time intellisence only
        $JssorDebug$.$Execute(function () {
            _Options = $JssorUtils$.$Extend({
                $ArrowKeyNavigation: undefined,
                $SlideWidth: undefined,
                $SlideHeight: undefined,
                $SlideshowOptions: undefined,
                $CaptionSliderOptions: undefined,
                $BulletNavigatorOptions: undefined,
                $ArrowNavigatorOptions: undefined,
                $ThumbnailNavigatorOptions: undefined
            },
            _Options);
        });

        var _PlayOrientation = _Options.$PlayOrientation & 3;
        var _PlayReverse = (_Options.$PlayOrientation & 4) / -4 || 1;

        var _SlideshowOptions = _Options.$SlideshowOptions;
        var _CaptionSliderOptions = $JssorUtils$.$Extend({ $Class: $JssorCaptionSliderBase$, $PlayInMode: 1, $PlayOutMode: 1 }, _Options.$CaptionSliderOptions);
        $JssorUtils$.$TranslateTransitions(_CaptionSliderOptions.$CaptionTransitions); //for old transition compatibility
        var _BulletNavigatorOptions = _Options.$BulletNavigatorOptions;
        var _ArrowNavigatorOptions = _Options.$ArrowNavigatorOptions;
        var _ThumbnailNavigatorOptions = _Options.$ThumbnailNavigatorOptions;

        $JssorDebug$.$Execute(function () {
            if (_SlideshowOptions && !_SlideshowOptions.$Class) {
                $JssorDebug$.$Fail("Option $SlideshowOptions error, class not specified.");
            }
        });

        $JssorDebug$.$Execute(function () {
            if (_Options.$CaptionSliderOptions && !_Options.$CaptionSliderOptions.$Class) {
                $JssorDebug$.$Fail("Option $CaptionSliderOptions error, class not specified.");
            }
        });

        $JssorDebug$.$Execute(function () {
            if (_BulletNavigatorOptions && !_BulletNavigatorOptions.$Class) {
                $JssorDebug$.$Fail("Option $BulletNavigatorOptions error, class not specified.");
            }
        });

        $JssorDebug$.$Execute(function () {
            if (_ArrowNavigatorOptions && !_ArrowNavigatorOptions.$Class) {
                $JssorDebug$.$Fail("Option $ArrowNavigatorOptions error, class not specified.");
            }
        });

        $JssorDebug$.$Execute(function () {
            if (_ThumbnailNavigatorOptions && !_ThumbnailNavigatorOptions.$Class) {
                $JssorDebug$.$Fail("Option $ThumbnailNavigatorOptions error, class not specified.");
            }
        });

        var _UISearchMode = _Options.$UISearchMode;
        var _ScaleWrapper;
        var _SlidesContainer = $JssorUtils$.$FindFirstChildByAttribute(elmt, "slides", null, _UISearchMode);
        var _LoadingContainer = $JssorUtils$.$FindFirstChildByAttribute(elmt, "loading", null, _UISearchMode) || $JssorUtils$.$CreateDivElement(document);

        var _BulletNavigatorContainer = $JssorUtils$.$FindFirstChildByAttribute(elmt, "navigator", null, _UISearchMode);

        var _ArrowLeft = $JssorUtils$.$FindFirstChildByAttribute(elmt, "arrowleft", null, _UISearchMode);
        var _ArrowRight = $JssorUtils$.$FindFirstChildByAttribute(elmt, "arrowright", null, _UISearchMode);

        var _ThumbnailNavigatorContainer = $JssorUtils$.$FindFirstChildByAttribute(elmt, "thumbnavigator", null, _UISearchMode);

        $JssorDebug$.$Execute(function () {
            //if (_BulletNavigatorOptions && !_BulletNavigatorContainer) {
            //    throw new Error("$BulletNavigatorOptions specified but bullet navigator container (<div u=\"navigator\" ...) not defined.");
            //}
            if (_BulletNavigatorContainer && !_BulletNavigatorOptions) {
                throw new Error("Bullet navigator container defined but $BulletNavigatorOptions not specified.");
            }

            //if (_ArrowNavigatorOptions) {
            //    if (!_ArrowLeft) {
            //        throw new Error("$ArrowNavigatorOptions specified, but arrowleft (<span u=\"arrowleft\" ...) not defined.");
            //    }

            //    if (!_ArrowRight) {
            //        throw new Error("$ArrowNavigatorOptions specified, but arrowright (<span u=\"arrowright\" ...) not defined.");
            //    }
            //}

            if ((_ArrowLeft || _ArrowRight) && !_ArrowNavigatorOptions) {
                throw new Error("arrowleft or arrowright defined, but $ArrowNavigatorOptions not specified.");
            }

            //if (_ThumbnailNavigatorOptions && !_ThumbnailNavigatorContainer) {
            //    throw new Error("$ThumbnailNavigatorOptions specified, but thumbnail navigator container (<div u=\"thumbnavigator\" ...) not defined.");
            //}

            if (_ThumbnailNavigatorContainer && !_ThumbnailNavigatorOptions) {
                throw new Error("Thumbnail navigator container defined, but $ThumbnailNavigatorOptions not specified.");
            }
        });

        var _SlidesContainerWidth = $JssorUtils$.$CssWidth(_SlidesContainer);
        var _SlidesContainerHeight = $JssorUtils$.$CssHeight(_SlidesContainer);

        $JssorDebug$.$Execute(function () {
            if (isNaN(_SlidesContainerWidth))
                $JssorDebug$.$Fail("Width of slides container wrong specification, it should be specified by inline style in pixels (like style='width: 600px;').");

            if ($JssorUtils$.$IsUndefined(_SlidesContainerWidth))
                $JssorDebug$.$Fail("Width of slides container not specified, it should be specified by inline style in pixels (like style='width: 600px;').");

            if (isNaN(_SlidesContainerHeight))
                $JssorDebug$.$Fail("Height of slides container wrong specification, it should be specified by inline style in pixels (like style='height: 300px;').");

            if ($JssorUtils$.$IsUndefined(_SlidesContainerHeight))
                $JssorDebug$.$Fail("Height of slides container not specified, it should be specified by inline style in pixels (like style='height: 300px;').");

            var slidesContainerOverflow = $JssorUtils$.$CssOverflow(_SlidesContainer);
            var slidesContainerOverflowX = $JssorUtils$.$Css(_SlidesContainer, "overflowX");
            var slidesContainerOverflowY = $JssorUtils$.$Css(_SlidesContainer, "overflowY");
            if (slidesContainerOverflow != "hidden" && (slidesContainerOverflowX != "hidden" || slidesContainerOverflowY != "hidden"))
                $JssorDebug$.$Fail("Overflow of slides container wrong specification, it should be specified as 'hidden' (style='overflow:hidden;').");

            //var slidesContainerTop = $JssorUtils$.$CssTop(_SlidesContainer);
            //var slidesContainerLeft = $JssorUtils$.$CssLeft(_SlidesContainer);

            //if (isNaN(slidesContainerTop))
            //    $JssorDebug$.$Fail("Top of slides container wrong specification, it should be specified by inline style in pixels (like style='top: 0px;').");

            //if ($JssorUtils$.$IsUndefined(slidesContainerTop))
            //    $JssorDebug$.$Fail("Top of slides container not specified, it should be specified by inline style in pixels (like style='top: 0px;').");

            //if (isNaN(slidesContainerLeft))
            //    $JssorDebug$.$Fail("Left of slides container wrong specification, it should be specified by inline style in pixels (like style='left: 0px;').");

            //if ($JssorUtils$.$IsUndefined(slidesContainerLeft))
            //    $JssorDebug$.$Fail("Left of slides container not specified, it should be specified by inline style in pixels (like style='left: 0px;').");
        });

        $JssorDebug$.$Execute(function () {
            if (!$JssorUtils$.$IsNumeric(_Options.$DisplayPieces))
                $JssorDebug$.$Fail("Option $DisplayPieces error, it should be a numeric value and greater than or equal to 1.");

            if (_Options.$DisplayPieces < 1)
                $JssorDebug$.$Fail("Option $DisplayPieces error, it should be greater than or equal to 1.");

            if (_Options.$DisplayPieces > 1 && _Options.$DragOrientation && _Options.$DragOrientation != _PlayOrientation)
                $JssorDebug$.$Fail("Option $DragOrientation error, it should be 0 or the same of $PlayOrientation when $DisplayPieces is greater than 1.");

            if (!$JssorUtils$.$IsNumeric(_Options.$ParkingPosition))
                $JssorDebug$.$Fail("Option $ParkingPosition error, it should be a numeric value.");

            if (_Options.$ParkingPosition && _Options.$DragOrientation && _Options.$DragOrientation != _PlayOrientation)
                $JssorDebug$.$Fail("Option $DragOrientation error, it should be 0 or the same of $PlayOrientation when $ParkingPosition is not equal to 0.");
        });

        var _StyleDef;

        var _SlideElmts = [];

        {
            var slideElmts = $JssorUtils$.$GetChildren(_SlidesContainer);
            $JssorUtils$.$Each(slideElmts, function (slideElmt) {
                if (slideElmt.tagName == "DIV" && !$JssorUtils$.$GetAttributeEx(slideElmt, "u")) {
                    _SlideElmts.push(slideElmt);
                }
            });
        }

        $JssorDebug$.$Execute(function () {
            if (_SlideElmts.length < 1) {
                $JssorDebug$.$Error("Slides html code definition error, there must be at least 1 slide to initialize a slider.");
            }
        });

        var _SlideItemCreatedCount = 0; //for debug only
        var _SlideItemReleasedCount = 0;    //for debug only

        var _PreviousSlideIndex;
        var _CurrentSlideIndex = -1;
        var _TempSlideIndex;
        var _PrevSlideItem;
        var _CurrentSlideItem;
        var _SlideCount = _SlideElmts.length;

        var _SlideWidth = _Options.$SlideWidth || _SlidesContainerWidth;
        var _SlideHeight = _Options.$SlideHeight || _SlidesContainerHeight;

        var _SlideSpacing = _Options.$SlideSpacing;
        var _StepLengthX = _SlideWidth + _SlideSpacing;
        var _StepLengthY = _SlideHeight + _SlideSpacing;
        var _StepLength = (_PlayOrientation & 1) ? _StepLengthX : _StepLengthY;
        var _DisplayPieces = Math.min(_Options.$DisplayPieces, _SlideCount);

        var _SlideshowPanel;
        var _CurrentBoardIndex = 0;
        var _DragOrientation;
        var _DragOrientationRegistered;
        var _DragInvalid;

        var _HandleTouchEventOnly;

        var _Navigators = [];
        var _BulletNavigator;
        var _ArrowNavigator;
        var _ThumbnailNavigator;

        var _ShowLink;

        var _Frozen;
        var _AutoPlay;
        var _AutoPlaySteps = _Options.$AutoPlaySteps;
        var _HoverToPause = _Options.$PauseOnHover;
        var _AutoPlayInterval = _Options.$AutoPlayInterval;
        var _SlideDuration = _Options.$SlideDuration;

        var _SlideshowRunnerClass;
        var _TransitionsOrder;

        var _SlideshowEnabled;
        var _ParkingPosition;
        var _CarouselEnabled = _DisplayPieces < _SlideCount;
        var _Loop = _CarouselEnabled ? _Options.$Loop : 0;

        var _DragEnabled;
        var _LastDragSucceded;

        var _HoverStatus = 1;   //0 Hovering, 1 Not hovering

        //Variable Definition
        var _IsSliding;
        var _IsDragging;
        var _LoadingTicket;

        //The X position of mouse/touch when a drag start
        var _DragStartMouseX = 0;
        //The Y position of mouse/touch when a drag start
        var _DragStartMouseY = 0;
        var _DragOffsetTotal;
        var _DragOffsetLastTime;
        var _DragIndexAdjust;

        var _Carousel;
        var _Conveyor;
        var _Slideshow;
        var _CarouselPlayer;
        var _SlideContainer = new SlideContainer();
        var _ScaleRatio;

        //$JssorSlider$ Constructor
        {
            _AutoPlay = _Options.$AutoPlay;
            _SelfSlider.$Options = options;

            AdjustSlidesContainerSize();

            elmt["jssor-slider"] = true;

            //_SlideshowPanel = CreatePanel();
            //$JssorUtils$.$CssZIndex(elmt, $JssorUtils$.$CssZIndex(elmt));
            //$JssorUtils$.$CssLeft(_SlideshowPanel, $JssorUtils$.$CssLeft(_SlidesContainer));
            //$JssorUtils$.$CssZIndex(_SlidesContainer, $JssorUtils$.$CssZIndex(_SlidesContainer));
            //$JssorUtils$.$CssTop(_SlideshowPanel, $JssorUtils$.$CssTop(_SlidesContainer));
            $JssorUtils$.$CssZIndex(_SlidesContainer, $JssorUtils$.$CssZIndex(_SlidesContainer) || 0);
            $JssorUtils$.$CssPosition(_SlidesContainer, "absolute");
            _SlideshowPanel = $JssorUtils$.$CloneNode(_SlidesContainer);
            $JssorUtils$.$InsertBefore($JssorUtils$.$GetParentNode(_SlidesContainer), _SlideshowPanel, _SlidesContainer);

            if (_SlideshowOptions) {
                _ShowLink = _SlideshowOptions.$ShowLink;
                _SlideshowRunnerClass = _SlideshowOptions.$Class;

                $JssorDebug$.$Execute(function () {
                    if (!_SlideshowOptions.$Transitions || !_SlideshowOptions.$Transitions.length) {
                        $JssorDebug$.$Error("Invalid '$SlideshowOptions', no '$Transitions' specified.");
                    }
                });

                $JssorUtils$.$TranslateTransitions(_SlideshowOptions.$Transitions); //for old transition compatibility

                _SlideshowEnabled = _DisplayPieces == 1 && _SlideCount > 1 && _SlideshowRunnerClass && (!$JssorUtils$.$IsBrowserIE() || $JssorUtils$.$GetBrowserVersion() >= 8);
            }

            _ParkingPosition = (_SlideshowEnabled || _DisplayPieces >= _SlideCount || !(_Loop & 1)) ? 0 : _Options.$ParkingPosition;

            _DragEnabled = ((_DisplayPieces > 1 || _ParkingPosition) ? _PlayOrientation : -1) & _Options.$DragOrientation;

            //SlideBoard
            var _SlideboardElmt = _SlidesContainer;
            var _SlideItems = [];

            var _SlideshowRunner;
            var _LinkContainer;

            var _DownEvent = "mousedown";
            var _MoveEvent = "mousemove";
            var _UpEvent = "mouseup";
            var _CancelEvent;

            var _LastTimeMoveByDrag;
            var _Position_OnFreeze;
            var _CarouselPlaying_OnFreeze;
            var _PlayToPosition_OnFreeze;
            var _PositionToGoByDrag;

            //SlideBoard Constructor
            {

                if (window.navigator.msPointerEnabled) {

                    _DownEvent = "MSPointerDown";
                    _MoveEvent = "MSPointerMove";
                    _UpEvent = "MSPointerUp";
                    _CancelEvent = "MSPointerCancel";

                    if (_DragEnabled) {
                        var touchAction = "none";
                        if (_DragEnabled == 1) {
                            touchAction = "pan-y";
                        }
                        else if (_DragEnabled == 2) {
                            touchAction = "pan-x";
                        }

                        $JssorUtils$.$SetAttribute(_SlideboardElmt.style, "-ms-touch-action", touchAction);
                    }
                }
                else if ("ontouchstart" in window || "createTouch" in document) {
                    _HandleTouchEventOnly = true;

                    _DownEvent = "touchstart";
                    _MoveEvent = "touchmove";
                    _UpEvent = "touchend";
                    _CancelEvent = "touchcancel";
                }

                _Slideshow = new Slideshow();

                if (_SlideshowEnabled)
                    _SlideshowRunner = new _SlideshowRunnerClass(_SlideContainer, _SlideWidth, _SlideHeight, _SlideshowOptions, _HandleTouchEventOnly);

                $JssorUtils$.$AppendChild(_SlideshowPanel, _Slideshow.$Wrapper);
                $JssorUtils$.$CssOverflow(_SlidesContainer, "hidden");

                //link container
                {
                    _LinkContainer = CreatePanel();
                    $JssorUtils$.$Css(_LinkContainer, "backgroundColor", "#000");
                    $JssorUtils$.$CssOpacity(_LinkContainer, 0);
                    $JssorUtils$.$InsertBefore(_SlideboardElmt, _LinkContainer, _SlideboardElmt.firstChild);
                }

                for (var i = 0; i < _SlideElmts.length; i++) {
                    var slideElmt = _SlideElmts[i];
                    var slideItem = new SlideItem(slideElmt, i);
                    _SlideItems.push(slideItem);
                }

                $JssorUtils$.$HideElement(_LoadingContainer);

                $JssorDebug$.$Execute(function () {
                    $JssorUtils$.$SetAttribute(_LoadingContainer, "debug-id", "loading-container");
                });

                _Carousel = new Carousel()
                _CarouselPlayer = new CarouselPlayer(_Carousel, _Slideshow);

                $JssorDebug$.$Execute(function () {
                    $JssorUtils$.$SetAttribute(_SlideboardElmt, "debug-id", "slide-board");
                });

                if (_DragEnabled) {
                    $JssorUtils$.$AddEvent(_SlidesContainer, _DownEvent, OnMouseDown);
                    $JssorUtils$.$AddEvent(document, _UpEvent, OnDragEnd);
                    _CancelEvent && $JssorUtils$.$AddEvent(document, _CancelEvent, OnDragEnd);
                }
            }
            //SlideBoard

            _HoverToPause &= (_HandleTouchEventOnly ? 10 : 5);

            //Bullet Navigator
            if (_BulletNavigatorContainer && _BulletNavigatorOptions) {
                _BulletNavigator = new _BulletNavigatorOptions.$Class(_BulletNavigatorContainer, _BulletNavigatorOptions);
                _Navigators.push(_BulletNavigator);
            }

            //Arrow Navigator
            if (_ArrowNavigatorOptions && _ArrowLeft && _ArrowRight) {
                _ArrowNavigator = new _ArrowNavigatorOptions.$Class(_ArrowLeft, _ArrowRight, _ArrowNavigatorOptions);
                _Navigators.push(_ArrowNavigator);
            }

            //Thumbnail Navigator
            if (_ThumbnailNavigatorContainer && _ThumbnailNavigatorOptions) {
                _ThumbnailNavigatorOptions.$StartIndex = _Options.$StartIndex;
                _ThumbnailNavigator = new _ThumbnailNavigatorOptions.$Class(_ThumbnailNavigatorContainer, _ThumbnailNavigatorOptions);
                _Navigators.push(_ThumbnailNavigator);
            }

            $JssorUtils$.$Each(_Navigators, function (navigator) {
                navigator.$Reset(_SlideCount, _SlideItems, _LoadingContainer);
                navigator.$On($JssorNavigatorEvents$.$NAVIGATIONREQUEST, NavigationClickHandler);
            });

            _SelfSlider.$SetScaleWidth(_SelfSlider.$GetOriginalWidth());

            $JssorUtils$.$AddEvent(elmt, "mouseout", $JssorUtils$.$MouseOverOutFilter(MainContainerMouseLeaveEventHandler, elmt));
            $JssorUtils$.$AddEvent(elmt, "mouseover", $JssorUtils$.$MouseOverOutFilter(MainContainerMouseEnterEventHandler, elmt));

            ShowNavigators();

            //Keyboard Navigation
            if (_Options.$ArrowKeyNavigation) {
                $JssorUtils$.$AddEvent(document, "keydown", function (e) {
                    if (e.keyCode == $JssorKeyCode$.$LEFT) {
                        //Arrow Left
                        PlayToOffset(-1);
                    }
                    else if (e.keyCode == $JssorKeyCode$.$RIGHT) {
                        //Arrow Right
                        PlayToOffset(1);
                    }
                });
            }

            var startPosition = _Options.$StartIndex;
            if (!(_Loop & 1)) {
                startPosition = Math.max(0, Math.min(startPosition, _SlideCount - _DisplayPieces));
            }
            _CarouselPlayer.$PlayCarousel(startPosition, startPosition, 0);
        }
    }
    //Jssor Slider

    //JssorSlider.$ASSEMBLY_BOTTOM_LEFT = ASSEMBLY_BOTTOM_LEFT;
    //JssorSlider.$ASSEMBLY_BOTTOM_RIGHT = ASSEMBLY_BOTTOM_RIGHT;
    //JssorSlider.$ASSEMBLY_TOP_LEFT = ASSEMBLY_TOP_LEFT;
    //JssorSlider.$ASSEMBLY_TOP_RIGHT = ASSEMBLY_TOP_RIGHT;
    //JssorSlider.$ASSEMBLY_LEFT_TOP = ASSEMBLY_LEFT_TOP;
    //JssorSlider.$ASSEMBLY_LEFT_BOTTOM = ASSEMBLY_LEFT_BOTTOM;
    //JssorSlider.$ASSEMBLY_RIGHT_TOP = ASSEMBLY_RIGHT_TOP;
    //JssorSlider.$ASSEMBLY_RIGHT_BOTTOM = ASSEMBLY_RIGHT_BOTTOM;

    JssorSlider.$EVT_CLICK = 21;
    JssorSlider.$EVT_DRAG_START = 22;
    JssorSlider.$EVT_DRAG_END = 23;
    JssorSlider.$EVT_SWIPE_START = 24;
    JssorSlider.$EVT_SWIPE_END = 25;

    JssorSlider.$EVT_LOAD_START = 26;
    JssorSlider.$EVT_LOAD_END = 27;
    JssorSlider.$EVT_FREEZE = 28;

    JssorSlider.$EVT_POSITION_CHANGE = 202;
    JssorSlider.$EVT_PARK = 203;

    JssorSlider.$EVT_SLIDESHOW_START = 206;
    JssorSlider.$EVT_SLIDESHOW_END = 207;

    JssorSlider.$EVT_PROGRESS_CHANGE = 208;
    JssorSlider.$EVT_STATE_CHANGE = 209;
    JssorSlider.$EVT_ROLLBACK_START = 210;
    JssorSlider.$EVT_ROLLBACK_END = 211;

    window.$JssorSlider$ = $JssorSlider$ = JssorSlider;

    //(function ($) {
    //    jQuery.fn.jssorSlider = function (options) {
    //        return this.each(function () {
    //            return $(this).data('jssorSlider') || $(this).data('jssorSlider', new JssorSlider(this, options));
    //        });
    //    };
    //})(jQuery);

    //window.jQuery && (jQuery.fn.jssorSlider = function (options) {
    //    return this.each(function () {
    //        return jQuery(this).data('jssorSlider') || jQuery(this).data('jssorSlider', new JssorSlider(this, options));
    //    });
    //});
};

//$JssorBulletNavigator$
var $JssorNavigatorEvents$ = {
    $NAVIGATIONREQUEST: 1,
    $INDEXCHANGE: 2,
    $RESET: 3
};

var $JssorBulletNavigator$ = window.$JssorBulletNavigator$ = function (elmt, options) {
    var self = this;
    $JssorEventManager$.call(self);

    elmt = $JssorUtils$.$GetElement(elmt);

    var _Count;
    var _Length;
    var _Width;
    var _Height;
    var _CurrentIndex;
    var _CurrentInnerIndex = 0;
    var _Options;
    var _Steps;
    var _Lanes;
    var _SpacingX;
    var _SpacingY;
    var _Orientation;
    var _ItemPrototype;
    var _PrototypeWidth;
    var _PrototypeHeight;

    var _ButtonElements = [];
    var _Buttons = [];

    function Highlight(index) {
        if (index != -1)
            _Buttons[index].$Activate(index == _CurrentInnerIndex);
    }

    function OnNavigationRequest(index) {
        self.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST, index * _Steps);
    }

    self.$Elmt = elmt;
    self.$GetCurrentIndex = function () {
        return _CurrentIndex;
    };

    self.$SetCurrentIndex = function (index) {
        if (index != _CurrentIndex) {
            var lastInnerIndex = _CurrentInnerIndex;
            var innerIndex = Math.floor(index / _Steps);
            _CurrentInnerIndex = innerIndex;
            _CurrentIndex = index;

            Highlight(lastInnerIndex);
            Highlight(innerIndex);

            //self.$TriggerEvent($JssorNavigatorEvents$.$INDEXCHANGE, index);
        }
    };

    self.$Show = function (show) {
        $JssorUtils$.$ShowElement(elmt, show);
    };

    var _Located;
    self.$Relocate = function (force) {
        if (!_Located || _Options.$Scale == false) {
            if (_Options.$AutoCenter & 1) {
                $JssorUtils$.$CssLeft(elmt, ($JssorUtils$.$CssWidth($JssorUtils$.$GetParentNode(elmt)) - _Width) / 2);
            }
            if (_Options.$AutoCenter & 2) {
                $JssorUtils$.$CssTop(elmt, ($JssorUtils$.$CssHeight($JssorUtils$.$GetParentNode(elmt)) - _Height) / 2);
            }

            _Located = true;
        }
    };

    var _Initialized;
    self.$Reset = function (length) {
        if (!_Initialized) {
            _Length = length;
            _Count = Math.ceil(length / _Steps);
            _CurrentInnerIndex = 0;

            var itemOffsetX = _PrototypeWidth + _SpacingX;
            var itemOffsetY = _PrototypeHeight + _SpacingY;

            var maxIndex = Math.ceil(_Count / _Lanes) - 1;

            _Width = _PrototypeWidth + itemOffsetX * (!_Orientation ? maxIndex : _Lanes - 1);
            _Height = _PrototypeHeight + itemOffsetY * (_Orientation ? maxIndex : _Lanes - 1);

            $JssorUtils$.$CssWidth(elmt, _Width);
            $JssorUtils$.$CssHeight(elmt, _Height);

            //self.$Relocate(true);

            for (var buttonIndex = 0; buttonIndex < _Count; buttonIndex++) {

                var numberDiv = $JssorUtils$.$CreateSpanElement();
                $JssorUtils$.$SetInnerText(numberDiv, buttonIndex + 1);

                var div = $JssorUtils$.$BuildElement(_ItemPrototype, "NumberTemplate", numberDiv, true);
                $JssorUtils$.$CssPosition(div, "absolute");

                var columnIndex = buttonIndex % (maxIndex + 1);
                $JssorUtils$.$CssLeft(div, !_Orientation ? itemOffsetX * columnIndex : buttonIndex % _Lanes * itemOffsetX);
                $JssorUtils$.$CssTop(div, _Orientation ? itemOffsetY * columnIndex : Math.floor(buttonIndex / (maxIndex + 1)) * itemOffsetY);

                $JssorUtils$.$AppendChild(elmt, div);
                _ButtonElements[buttonIndex] = div;

                if (_Options.$ActionMode & 1)
                    $JssorUtils$.$AddEvent(div, "click", $JssorUtils$.$CreateCallback(null, OnNavigationRequest, buttonIndex));

                if (_Options.$ActionMode & 2)
                    $JssorUtils$.$AddEvent(div, "mouseover", $JssorUtils$.$CreateCallback(null, OnNavigationRequest, buttonIndex));

                _Buttons[buttonIndex] = $JssorUtils$.$Buttonize(div);
            }

            //self.$TriggerEvent($JssorNavigatorEvents$.$RESET);
            _Initialized = true;
        }
    };

    //JssorBulletNavigator Constructor
    {
        self.$Options = _Options = $JssorUtils$.$Extend({
            $SpacingX: 0,
            $SpacingY: 0,
            $Orientation: 1,
            $ActionMode: 1
        }, options);

        //Sodo statement for development time intellisence only
        $JssorDebug$.$Execute(function () {
            _Options = $JssorUtils$.$Extend({
                $Steps: undefined,
                $Lanes: undefined
            }, _Options);
        });

        _ItemPrototype = $JssorUtils$.$FindFirstChildByAttribute(elmt, "prototype");

        $JssorDebug$.$Execute(function () {
            if (!_ItemPrototype)
                $JssorDebug$.$Fail("Navigator item prototype not defined.");

            if (isNaN($JssorUtils$.$CssWidth(_ItemPrototype))) {
                $JssorDebug$.$Fail("Width of 'navigator item prototype' not specified.");
            }

            if (isNaN($JssorUtils$.$CssHeight(_ItemPrototype))) {
                $JssorDebug$.$Fail("Height of 'navigator item prototype' not specified.");
            }
        });

        _PrototypeWidth = $JssorUtils$.$CssWidth(_ItemPrototype);
        _PrototypeHeight = $JssorUtils$.$CssHeight(_ItemPrototype);

        $JssorUtils$.$RemoveChild(elmt, _ItemPrototype);

        _Steps = _Options.$Steps || 1;
        _Lanes = _Options.$Lanes || 1;
        _SpacingX = _Options.$SpacingX;
        _SpacingY = _Options.$SpacingY;
        _Orientation = _Options.$Orientation - 1;
    }
};

var $JssorArrowNavigator$ = window.$JssorArrowNavigator$ = function (arrowLeft, arrowRight, options) {
    var self = this;
    $JssorEventManager$.call(self);

    $JssorDebug$.$Execute(function () {
        //var arrowLeft = $JssorUtils$.$FindFirstChildByAttribute(elmt, "arrowleft", null, uiSearchMode);
        //var arrowRight = $JssorUtils$.$FindFirstChildByAttribute(elmt, "arrowright", null, uiSearchMode);

        if (!arrowLeft)
            $JssorDebug$.$Fail("Option '$ArrowNavigatorOptions' spepcified, but UI 'arrowleft' not defined. Define 'arrowleft' to enable direct navigation, or remove option '$ArrowNavigatorOptions' to disable direct navigation.");

        if (!arrowRight)
            $JssorDebug$.$Fail("Option '$ArrowNavigatorOptions' spepcified, but UI 'arrowright' not defined. Define 'arrowright' to enable direct navigation, or remove option '$ArrowNavigatorOptions' to disable direct navigation.");

        if (isNaN($JssorUtils$.$CssWidth(arrowLeft))) {
            $JssorDebug$.$Fail("Width of 'arrow left' not specified.");
        }

        if (isNaN($JssorUtils$.$CssWidth(arrowRight))) {
            $JssorDebug$.$Fail("Width of 'arrow right' not specified.");
        }

        if (isNaN($JssorUtils$.$CssHeight(arrowLeft))) {
            $JssorDebug$.$Fail("Height of 'arrow left' not specified.");
        }

        if (isNaN($JssorUtils$.$CssHeight(arrowRight))) {
            $JssorDebug$.$Fail("Height of 'arrow right' not specified.");
        }
    });

    //var arrowLeft = $JssorUtils$.$FindFirstChildByAttribute(elmt, "arrowleft", null, uiSearchMode);
    //var arrowRight = $JssorUtils$.$FindFirstChildByAttribute(elmt, "arrowright", null, uiSearchMode);
    var _Length;
    var _CurrentIndex;
    var _Options;
    var _Steps;
    var _ParentNode = $JssorUtils$.$GetParentNode(arrowLeft);
    var _ArrowWidth = $JssorUtils$.$CssWidth(arrowLeft);
    var _ArrowHeight = $JssorUtils$.$CssHeight(arrowLeft);

    function OnNavigationRequest(steps) {
        self.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST, steps, true);
    }

    self.$GetCurrentIndex = function () {
        return _CurrentIndex;
    };

    self.$SetCurrentIndex = function (index, virtualIndex, temp) {
        if (temp) {
            _CurrentIndex = virtualIndex;
        }
        else {
            _CurrentIndex = index;
        }
        //self.$TriggerEvent($JssorNavigatorEvents$.$INDEXCHANGE, index);
    };

    self.$Show = function (show) {
        $JssorUtils$.$ShowElement(arrowLeft, show);
        $JssorUtils$.$ShowElement(arrowRight, show);
    };

    var _Located;
    self.$Relocate = function (force) {
        if (!_Located || _Options.$Scale == false) {

            var containerWidth = $JssorUtils$.$CssWidth(_ParentNode);
            var containerHeight = $JssorUtils$.$CssHeight(_ParentNode);

            if (_Options.$AutoCenter & 1) {
                $JssorUtils$.$CssLeft(arrowLeft, (containerWidth - _ArrowWidth) / 2);
                $JssorUtils$.$CssLeft(arrowRight, (containerWidth - _ArrowWidth) / 2);
            }

            if (_Options.$AutoCenter & 2) {
                $JssorUtils$.$CssTop(arrowLeft, (containerHeight - _ArrowHeight) / 2);
                $JssorUtils$.$CssTop(arrowRight, (containerHeight - _ArrowHeight) / 2);
            }

            _Located = true;
        }
    };

    var _Initialized;
    self.$Reset = function (length) {
        _Length = length;
        _CurrentIndex = 0;

        if (!_Initialized) {

            //self.$Relocate(true);

            $JssorUtils$.$AddEvent(arrowLeft, "click", $JssorUtils$.$CreateCallback(null, OnNavigationRequest, -_Steps));
            $JssorUtils$.$AddEvent(arrowRight, "click", $JssorUtils$.$CreateCallback(null, OnNavigationRequest, _Steps));

            $JssorUtils$.$Buttonize(arrowLeft);
            $JssorUtils$.$Buttonize(arrowRight);

            _Initialized = true;
        }

        //self.$TriggerEvent($JssorNavigatorEvents$.$RESET);
    };

    //JssorArrowNavigator Constructor
    {
        self.$Options = _Options = $JssorUtils$.$Extend({
            $Steps: 1
        }, options);

        _Steps = _Options.$Steps;
    }
};

//$JssorThumbnailNavigator$
var $JssorThumbnailNavigator$ = window.$JssorThumbnailNavigator$ = function (elmt, options) {
    var _Self = this;
    var _Length;
    var _Count;
    var _CurrentIndex;
    var _Options;
    var _NavigationItems = [];

    var _Width;
    var _Height;
    var _Lanes;
    var _SpacingX;
    var _SpacingY;
    var _PrototypeWidth;
    var _PrototypeHeight;
    var _DisplayPieces;

    var _Slider;
    var _CurrentMouseOverIndex = -1;

    var _SlidesContainer;
    var _ThumbnailPrototype;

    $JssorEventManager$.call(_Self);
    elmt = $JssorUtils$.$GetElement(elmt);

    function NavigationItem(item, index) {
        var self = this;
        var _Wrapper;
        var _Button;
        var _Thumbnail;

        function Highlight(mouseStatus) {
            _Button.$Activate(_CurrentIndex == index);
        }

        function OnNavigationRequest(event) {
            if (!_Slider.$LastDragSucceded()) {
                var tail = _Lanes - index % _Lanes;
                var slideVirtualIndex = _Slider.$GetVirtualIndex((index + tail) / _Lanes - 1);
                var itemVirtualIndex = slideVirtualIndex * _Lanes + _Lanes - tail;
                _Self.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST, itemVirtualIndex);
            }
        }

        $JssorDebug$.$Execute(function () {
            self.$Wrapper = undefined;
        });

        self.$Index = index;

        self.$Highlight = Highlight;

        //NavigationItem Constructor
        {
            _Thumbnail = item.$Thumb || item.$Image || $JssorUtils$.$CreateDivElement();
            self.$Wrapper = _Wrapper = $JssorUtils$.$BuildElement(_ThumbnailPrototype, "ThumbnailTemplate", _Thumbnail, true);

            _Button = $JssorUtils$.$Buttonize(_Wrapper);
            if (_Options.$ActionMode & 1)
                $JssorUtils$.$AddEvent(_Wrapper, "click", OnNavigationRequest);
            if (_Options.$ActionMode & 2)
                $JssorUtils$.$AddEvent(_Wrapper, "mouseover", OnNavigationRequest);
        }
    }

    _Self.$GetCurrentIndex = function () {
        return _CurrentIndex;
    };

    _Self.$SetCurrentIndex = function (index, virtualIndex, temp) {
        var oldIndex = _CurrentIndex;
        _CurrentIndex = index;
        if (oldIndex != -1)
            _NavigationItems[oldIndex].$Highlight();
        _NavigationItems[index].$Highlight();

        if (!temp) {
            _Slider.$PlayTo(_Slider.$GetVirtualIndex(Math.floor(virtualIndex / _Lanes)));
        }
    };

    _Self.$Show = function (show) {
        $JssorUtils$.$ShowElement(elmt, show);
    };

    _Self.$Relocate = $JssorUtils$.$EmptyFunction;

    var _Initialized;
    _Self.$Reset = function (length, items, loadingContainer) {
        if (!_Initialized) {
            _Length = length;
            _Count = Math.ceil(_Length / _Lanes);
            _CurrentIndex = -1;
            _DisplayPieces = Math.min(_DisplayPieces, items.length);

            var horizontal = _Options.$Orientation & 1;

            var slideWidth = _PrototypeWidth + (_PrototypeWidth + _SpacingX) * (_Lanes - 1) * (1 - horizontal);
            var slideHeight = _PrototypeHeight + (_PrototypeHeight + _SpacingY) * (_Lanes - 1) * horizontal;

            var slidesContainerWidth = slideWidth + (slideWidth + _SpacingX) * (_DisplayPieces - 1) * horizontal;
            var slidesContainerHeight = slideHeight + (slideHeight + _SpacingY) * (_DisplayPieces - 1) * (1 - horizontal);

            $JssorUtils$.$CssPosition(_SlidesContainer, "absolute");
            $JssorUtils$.$CssOverflow(_SlidesContainer, "hidden");
            if (_Options.$AutoCenter & 1) {
                $JssorUtils$.$CssLeft(_SlidesContainer, (_Width - slidesContainerWidth) / 2);
            }
            if (_Options.$AutoCenter & 2) {
                $JssorUtils$.$CssTop(_SlidesContainer, (_Height - slidesContainerHeight) / 2);
            }
            //$JssorDebug$.$Execute(function () {
            //    if (!_Options.$AutoCenter) {
            //        var slidesContainerTop = $JssorUtils$.$CssTop(_SlidesContainer);
            //        var slidesContainerLeft = $JssorUtils$.$CssLeft(_SlidesContainer);

            //        if (isNaN(slidesContainerTop)) {
            //            $JssorDebug$.$Fail("Position 'top' wrong specification of thumbnail navigator slides container (<div u=\"thumbnavigator\">...<div u=\"slides\">), \r\nwhen option $ThumbnailNavigatorOptions.$AutoCenter set to 0, it should be specified by inline style in pixels (like <div u=\"slides\" style=\"top: 0px;\">)");
            //        }

            //        if (isNaN(slidesContainerLeft)) {
            //            $JssorDebug$.$Fail("Position 'left' wrong specification of thumbnail navigator slides container (<div u=\"thumbnavigator\">...<div u=\"slides\">), \r\nwhen option $ThumbnailNavigatorOptions.$AutoCenter set to 0, it should be specified by inline style in pixels (like <div u=\"slides\" style=\"left: 0px;\">)");
            //        }
            //    }
            //});
            $JssorUtils$.$CssWidth(_SlidesContainer, slidesContainerWidth);
            $JssorUtils$.$CssHeight(_SlidesContainer, slidesContainerHeight);

            var slideItemElmts = [];
            $JssorUtils$.$Each(items, function (item, index) {
                var navigationItem = new NavigationItem(item, index);
                var navigationItemWrapper = navigationItem.$Wrapper;

                var columnIndex = Math.floor(index / _Lanes);
                var laneIndex = index % _Lanes;

                $JssorUtils$.$CssLeft(navigationItemWrapper, (_PrototypeWidth + _SpacingX) * laneIndex * (1 - horizontal));
                $JssorUtils$.$CssTop(navigationItemWrapper, (_PrototypeHeight + _SpacingY) * laneIndex * horizontal);

                if (!slideItemElmts[columnIndex]) {
                    slideItemElmts[columnIndex] = $JssorUtils$.$CreateDivElement();
                    $JssorUtils$.$AppendChild(_SlidesContainer, slideItemElmts[columnIndex]);
                }

                $JssorUtils$.$AppendChild(slideItemElmts[columnIndex], navigationItemWrapper);

                _NavigationItems.push(navigationItem);
            });

            var thumbnailSliderOptions = $JssorUtils$.$Extend({
                $AutoPlay: false,
                $NaviQuitDrag: false,
                $SlideWidth: slideWidth,
                $SlideHeight: slideHeight,
                $SlideSpacing: _SpacingX * horizontal + _SpacingY * (1 - horizontal),
                $MinDragOffsetToSlide: 12,
                $SlideDuration: 200,
                $PauseOnHover: 1,
                $PlayOrientation: _Options.$Orientation,
                $DragOrientation: _Options.$DisableDrag ? 0 : _Options.$Orientation
            }, _Options);

            _Slider = new $JssorSlider$(elmt, thumbnailSliderOptions);

            _Initialized = true;
        }

        //_Self.$TriggerEvent($JssorNavigatorEvents$.$RESET);
    };

    //JssorThumbnailNavigator Constructor
    {
        _Self.$Options = _Options = $JssorUtils$.$Extend({
            $SpacingX: 3,
            $SpacingY: 3,
            $DisplayPieces: 1,
            $Orientation: 1,
            $AutoCenter: 3,
            $ActionMode: 1
        }, options);

        //Sodo statement for development time intellisence only
        $JssorDebug$.$Execute(function () {
            _Options = $JssorUtils$.$Extend({
                $Lanes: undefined,
                $Width: undefined,
                $Height: undefined
            }, _Options);
        });

        _Width = $JssorUtils$.$CssWidth(elmt);
        _Height = $JssorUtils$.$CssHeight(elmt);

        $JssorDebug$.$Execute(function () {
            if (!_Width)
                $JssorDebug$.$Fail("width of 'thumbnavigator' container not specified.");
            if (!_Height)
                $JssorDebug$.$Fail("height of 'thumbnavigator' container not specified.");
        });

        _SlidesContainer = $JssorUtils$.$FindFirstChildByAttribute(elmt, "slides");
        _ThumbnailPrototype = $JssorUtils$.$FindFirstChildByAttribute(_SlidesContainer, "prototype");

        $JssorDebug$.$Execute(function () {
            if (!_ThumbnailPrototype)
                $JssorDebug$.$Fail("prototype of 'thumbnavigator' not defined.");
        });

        _PrototypeWidth = $JssorUtils$.$CssWidth(_ThumbnailPrototype);
        _PrototypeHeight = $JssorUtils$.$CssHeight(_ThumbnailPrototype);

        $JssorUtils$.$RemoveChild(_SlidesContainer, _ThumbnailPrototype);

        _Lanes = _Options.$Lanes || 1;
        _SpacingX = _Options.$SpacingX;
        _SpacingY = _Options.$SpacingY;
        _DisplayPieces = _Options.$DisplayPieces;
    }
};

//$JssorCaptionSlider$
function $JssorCaptionSliderBase$() {
    $JssorAnimator$.call(this, 0, 0);
    this.$Revert = $JssorUtils$.$EmptyFunction;
}

var $JssorCaptionSlider$ = window.$JssorCaptionSlider$ = function (container, captionSlideOptions, playIn) {
    $JssorDebug$.$Execute(function () {
        if (!captionSlideOptions.$CaptionTransitions) {
            $JssorDebug$.$Error("'$CaptionSliderOptions' option error, '$CaptionSliderOptions.$CaptionTransitions' not specified.");
        }
        //else if (!$JssorUtils$.$IsArray(captionSlideOptions.$CaptionTransitions)) {
        //    $JssorDebug$.$Error("'$CaptionSliderOptions' option error, '$CaptionSliderOptions.$CaptionTransitions' is not an array.");
        //}
    });

    var _Self = this;
    var _ImmediateOutCaptionHanger;
    var _PlayMode = playIn ? captionSlideOptions.$PlayInMode : captionSlideOptions.$PlayOutMode;

    var _CaptionTransitions = captionSlideOptions.$CaptionTransitions;
    var _CaptionTuningFetcher = { $Transition: "t", $Delay: "d", $Duration: "du", x: "x", y: "y", $Rotate: "r", $Zoom: "z", $Opacity: "f", $BeginTime: "b" };
    var _CaptionTuningTransfer = {
        $Default: function (value, tuningValue) {
            if (!isNaN(tuningValue.$Value))
                value = tuningValue.$Value;
            else
                value *= tuningValue.$Percent;

            return value;
        },
        $Opacity: function (value, tuningValue) {
            return this.$Default(value - 1, tuningValue);
        }
    };
    _CaptionTuningTransfer.$Zoom = _CaptionTuningTransfer.$Opacity;

    $JssorAnimator$.call(_Self, 0, 0);

    function GetCaptionItems(element, level) {

        var itemsToPlay = [];
        var lastTransitionName;
        var namedTransitions = [];
        var namedTransitionOrders = [];

        //$JssorDebug$.$Execute(function () {

        //    var debugInfoElement = $JssorUtils$.$GetElement("debugInfo");

        //    if (debugInfoElement && playIn) {

        //        var text = $JssorUtils$.$GetInnerHtml(debugInfoElement) + "<br>";

        //        $JssorUtils$.$SetInnerHtml(debugInfoElement, text);
        //    }
        //});

        function FetchRawTransition(captionElmt, index) {
            var rawTransition = {};

            $JssorUtils$.$Each(_CaptionTuningFetcher, function (fetchAttribute, fetchProperty) {
                var attributeValue = $JssorUtils$.$GetAttributeEx(captionElmt, fetchAttribute + (index || ""));
                if (attributeValue) {
                    var propertyValue = {};

                    if (fetchAttribute == "t") {
                        //if (($JssorUtils$.$IsBrowserChrome() || $JssorUtils$.$IsBrowserSafari() || $JssorUtils$.$IsBrowserFireFox()) && attributeValue == "*") {
                        //    attributeValue = Math.floor(Math.random() * captionSlideOptions.$CaptionTransitions.length);
                        //    $JssorUtils$.$SetAttribute(captionElmt, fetchAttribute + (index || ""), attributeValue);
                        //}

                        propertyValue.$Value = attributeValue;
                    }
                    else if (attributeValue.indexOf("%") + 1)
                        propertyValue.$Percent = $JssorUtils$.$ParseFloat(attributeValue) / 100;
                    else
                        propertyValue.$Value = $JssorUtils$.$ParseFloat(attributeValue);

                    rawTransition[fetchProperty] = propertyValue;
                }
            });

            return rawTransition;
        }

        function GetRandomTransition() {
            //return _CaptionTransitions.length && _CaptionTransitions[Math.floor(Math.random() * 42737 / (i + 1)) % _CaptionTransitions.length];
            return _CaptionTransitions[Math.floor(Math.random() * _CaptionTransitions.length)];
        }

        function EvaluateCaptionTransition(transitionName) {

            var transition;

            if (transitionName == "*") {
                transition = GetRandomTransition();
            }
            else if (transitionName) {

                //indexed transition allowed, just the same as named transition
                var tempTransition = _CaptionTransitions[$JssorUtils$.$ParseInt(transitionName)] || _CaptionTransitions[transitionName];

                if ($JssorUtils$.$IsArray(tempTransition)) {
                    if (transitionName != lastTransitionName) {
                        lastTransitionName = transitionName;
                        namedTransitionOrders[transitionName] = 0;

                        namedTransitions[transitionName] = tempTransition[Math.floor(Math.random() * tempTransition.length)];
                    }
                    else {
                        namedTransitionOrders[transitionName]++;
                    }

                    tempTransition = namedTransitions[transitionName];

                    if ($JssorUtils$.$IsArray(tempTransition)) {
                        tempTransition = tempTransition.length && tempTransition[namedTransitionOrders[transitionName] % tempTransition.length];

                        if ($JssorUtils$.$IsArray(tempTransition)) {
                            //got transition from array level 3, random for all captions
                            tempTransition = tempTransition[Math.floor(Math.random() * tempTransition.length)];
                        }
                        //else {
                        //    //got transition from array level 2, in sequence for all adjacent captions with same name specified
                        //    transition = tempTransition;
                        //}
                    }
                    //else {
                    //    //got transition from array level 1, random but same for all adjacent captions with same name specified
                    //    transition = tempTransition;
                    //}
                }
                //else {
                //    //got transition directly from a simple transition object
                //    transition = tempTransition;
                //}

                transition = tempTransition;

                if ($JssorUtils$.$IsString(transition))
                    transition = EvaluateCaptionTransition(transition);
            }

            return transition;
        }

        var captionElmts = $JssorUtils$.$GetChildren(element);
        $JssorUtils$.$Each(captionElmts, function (captionElmt, i) {

            var transitionsWithTuning = [];
            transitionsWithTuning.$Elmt = captionElmt;
            var isCaption = $JssorUtils$.$GetAttributeEx(captionElmt, "u") == "caption";

            $JssorUtils$.$Each(playIn ? [0, 3] : [2], function (j, k) {

                if (isCaption) {
                    var transition;
                    var rawTransition;

                    if (j != 2 || !$JssorUtils$.$GetAttributeEx(captionElmt, "t3")) {
                        rawTransition = FetchRawTransition(captionElmt, j);

                        if (j == 2 && !rawTransition.$Transition) {
                            rawTransition.$Delay = rawTransition.$Delay || { $Value: 0 };
                            rawTransition = $JssorUtils$.$Extend(FetchRawTransition(captionElmt, 0), rawTransition);
                        }
                    }

                    if (rawTransition && rawTransition.$Transition) {

                        transition = EvaluateCaptionTransition(rawTransition.$Transition.$Value);

                        if (transition) {

                            //var transitionWithTuning = $JssorUtils$.$Extend({ $Delay: 0, $ScaleHorizontal: 1, $ScaleVertical: 1 }, transition);
                            var transitionWithTuning = $JssorUtils$.$Extend({ $Delay: 0 }, transition);

                            $JssorUtils$.$Each(rawTransition, function (rawPropertyValue, propertyName) {
                                var tuningPropertyValue = (_CaptionTuningTransfer[propertyName] || _CaptionTuningTransfer.$Default).apply(_CaptionTuningTransfer, [transitionWithTuning[propertyName], rawTransition[propertyName]]);
                                if (!isNaN(tuningPropertyValue))
                                    transitionWithTuning[propertyName] = tuningPropertyValue;
                            });

                            if (!k) {
                                if (rawTransition.$BeginTime)
                                    transitionWithTuning.$BeginTime = rawTransition.$BeginTime.$Value || 0;
                                else if ((_PlayMode) & 2)
                                    transitionWithTuning.$BeginTime = 0;
                            }
                        }
                    }

                    transitionsWithTuning.push(transitionWithTuning);
                }

                if ((level % 2) && !k) {
                    //transitionsWithTuning.$Children = GetCaptionItems(captionElmt, lastTransitionName, [].concat(namedTransitions), [].concat(namedTransitionOrders), level + 1);
                    transitionsWithTuning.$Children = GetCaptionItems(captionElmt, level + 1);
                }
            });

            itemsToPlay.push(transitionsWithTuning);
        });

        return itemsToPlay;
    }

    function CreateAnimator(item, transition, immediateOut) {

        var animatorOptions = {
            $Easing: transition.$Easing,
            $Round: transition.$Round,
            $During: transition.$During,
            $Reverse: playIn && !immediateOut,
            $Optimize: true
        };

        $JssorDebug$.$Execute(function () {
            animatorOptions.$CaptionAnimator = true;
        });

        var captionItem = item;
        var captionParent = $JssorUtils$.$GetParentNode(item);

        var captionItemWidth = $JssorUtils$.$CssWidth(captionItem);
        var captionItemHeight = $JssorUtils$.$CssHeight(captionItem);
        var captionParentWidth = $JssorUtils$.$CssWidth(captionParent);
        var captionParentHeight = $JssorUtils$.$CssHeight(captionParent);

        var toStyles = {};
        var fromStyles = {};
        var scaleClip = transition.$ScaleClip || 1;

        //Opacity
        if (transition.$Opacity) {
            toStyles.$Opacity = 2 - transition.$Opacity;
        }

        animatorOptions.$OriginalWidth = captionItemWidth;
        animatorOptions.$OriginalHeight = captionItemHeight;

        //Transform
        if (transition.$Zoom || transition.$Rotate) {
            toStyles.$Zoom = transition.$Zoom ? transition.$Zoom - 1 : 1;

            if ($JssorUtils$.$IsBrowserIe9Earlier() || $JssorUtils$.$IsBrowserOpera())
                toStyles.$Zoom = Math.min(toStyles.$Zoom, 2);

            fromStyles.$Zoom = 1;

            var rotate = transition.$Rotate || 0;

            toStyles.$Rotate = rotate * 360;
            fromStyles.$Rotate = 0;
        }
            //Clip
        else if (transition.$Clip) {
            var fromStyleClip = { $Top: 0, $Right: captionItemWidth, $Bottom: captionItemHeight, $Left: 0 };
            var toStyleClip = $JssorUtils$.$Extend({}, fromStyleClip);

            var blockOffset = toStyleClip.$Offset = {};

            var topBenchmark = transition.$Clip & 4;
            var bottomBenchmark = transition.$Clip & 8;
            var leftBenchmark = transition.$Clip & 1;
            var rightBenchmark = transition.$Clip & 2;

            if (topBenchmark && bottomBenchmark) {
                blockOffset.$Top = captionItemHeight / 2 * scaleClip;
                blockOffset.$Bottom = -blockOffset.$Top;
            }
            else if (topBenchmark)
                blockOffset.$Bottom = -captionItemHeight * scaleClip;
            else if (bottomBenchmark)
                blockOffset.$Top = captionItemHeight * scaleClip;

            if (leftBenchmark && rightBenchmark) {
                blockOffset.$Left = captionItemWidth / 2 * scaleClip;
                blockOffset.$Right = -blockOffset.$Left;
            }
            else if (leftBenchmark)
                blockOffset.$Right = -captionItemWidth * scaleClip;
            else if (rightBenchmark)
                blockOffset.$Left = captionItemWidth * scaleClip;

            animatorOptions.$Move = transition.$Move;
            toStyles.$Clip = toStyleClip;
            fromStyles.$Clip = fromStyleClip;
        }

        //Fly
        {
            var toLeft = 0;
            var toTop = 0;

            if (transition.x)
                toLeft -= captionParentWidth * transition.x;

            if (transition.y)
                toTop -= captionParentHeight * transition.y;

            if (toLeft || toTop || animatorOptions.$Move) {
                toStyles.$Left = toLeft + $JssorUtils$.$CssLeft(captionItem);
                toStyles.$Top = toTop + $JssorUtils$.$CssTop(captionItem);
            }
        }

        //duration
        var duration = transition.$Duration;

        fromStyles = $JssorUtils$.$Extend(fromStyles, $JssorUtils$.$GetStyles(captionItem, toStyles));

        animatorOptions.$Setter = $JssorUtils$.$GetStyleSetterEx();

        return new $JssorAnimator$(transition.$Delay, duration, animatorOptions, captionItem, fromStyles, toStyles);
    }

    function CreateAnimators(streamLineLength, captionItems) {

        $JssorUtils$.$Each(captionItems, function (captionItem, i) {

            $JssorDebug$.$Execute(function () {
                if (captionItem.length) {
                    var top = $JssorUtils$.$CssTop(captionItem.$Elmt);
                    var left = $JssorUtils$.$CssLeft(captionItem.$Elmt);
                    var width = $JssorUtils$.$CssWidth(captionItem.$Elmt);
                    var height = $JssorUtils$.$CssHeight(captionItem.$Elmt);

                    var error = null;

                    if (isNaN(top))
                        error = "Style 'top' for caption not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";
                    else if (isNaN(left))
                        error = "Style 'left' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";
                    else if (isNaN(width))
                        error = "Style 'width' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";
                    else if (isNaN(height))
                        error = "Style 'height' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";

                    if (error)
                        $JssorDebug$.$Error("Caption " + (i + 1) + " definition error, \r\n" + error + "\r\n" + captionItem.$Elmt.outerHTML);
                }
            });

            var animator;
            var captionElmt = captionItem.$Elmt;
            var transition = captionItem[0];
            var transition3 = captionItem[1];

            if (transition) {

                animator = CreateAnimator(captionElmt, transition);
                streamLineLength = animator.$Locate($JssorUtils$.$IsUndefined(transition.$BeginTime) ? streamLineLength : transition.$BeginTime, 1);
            }

            streamLineLength = CreateAnimators(streamLineLength, captionItem.$Children);

            if (transition3) {
                var animator3 = CreateAnimator(captionElmt, transition3, 1);
                animator3.$Locate(streamLineLength, 1);
                _Self.$Combine(animator3);
                _ImmediateOutCaptionHanger.$Combine(animator3);
            }

            if (animator)
                _Self.$Combine(animator);
        });

        return streamLineLength;
    }

    _Self.$Revert = function () {
        _Self.$GoToPosition(_Self.$GetPosition_OuterEnd() * (playIn || 0));
        _ImmediateOutCaptionHanger.$GoToBegin();
    };

    //Constructor
    {
        _ImmediateOutCaptionHanger = new $JssorAnimator$(0, 0);

        //var streamLineLength = 0;
        //var captionItems = GetCaptionItems(container, null, [], [], 1);

        CreateAnimators(0, _PlayMode ? GetCaptionItems(container, 1) : []);
    }
};

//Event Table

//$EVT_CLICK = 21;			    function(slideIndex[, event])
//$EVT_DRAG_START = 22;		    function(position[, virtualPosition, event])
//$EVT_DRAG_END = 23;		    function(position, startPosition[, virtualPosition, virtualStartPosition, event])
//$EVT_SWIPE_START = 24;		function(position[, virtualPosition])
//$EVT_SWIPE_END = 25;		    function(position[, virtualPosition])

//$EVT_LOAD_START = 26;			function(slideIndex)
//$EVT_LOAD_END = 27;			function(slideIndex)

//$EVT_POSITION_CHANGE = 202;	function(position, fromPosition[, virtualPosition, virtualFromPosition])
//$EVT_PARK = 203;			    function(slideIndex, fromIndex)

//$EVT_PROGRESS_CHANGE = 208;	function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])
//$EVT_STATE_CHANGE = 209;	    function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])

//$EVT_ROLLBACK_START = 210;	function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])
//$EVT_ROLLBACK_END = 211;	    function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])

//$EVT_SLIDESHOW_START = 206;   function(slideIndex[, progressBegin, slideshowBegin, slideshowEnd, progressEnd])
//$EVT_SLIDESHOW_END = 207;     function(slideIndex[, progressBegin, slideshowBegin, slideshowEnd, progressEnd])

//http://www.jssor.com/development/reference-api.html
