// Ion.RangeSlider
// version 1.5.95
// © 2013 Denis Ineshin | IonDen.com
//
// Project page:    http://ionden.com/a/plugins/ion.rangeSlider/
// GitHub page:     https://github.com/IonDen/ion.rangeSlider
//
// Released under MIT licence:
// http://ionden.com/a/licence.html
// =====================================================================================================================

(function($){
    var pluginCount = 0;
    var prettify = function(num){
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,"$1 ");
    };
    var isOldIe = function(){
        var n = navigator.userAgent,
            r = /msie\s\d+/i,
            v;
        if(n.search(r) > 0){
            v = r.exec(n).toString();
            v = v.split(" ")[1];
            if(v < 9) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    var isItTouch = function() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    };

    var methods = {
        init: function(options){
            var settings = $.extend({
                min: 10,
                max: 100,
                from: 10,
                to: 100,
                type: "single",
                step: 1,
                postfix: "",
                onChange: null,
                onFinish: null
            }, options);

            var baseHTML =  '<span class="irs">'; // irs = ion range slider css prefix
                baseHTML += '<span class="irs-line"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span>';
                baseHTML += '<span class="irs-min">0</span><span class="irs-max">1</span>';
                baseHTML += '<span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span>';
                baseHTML += '</span>';
            var singleHTML = '<span class="irs-slider single"></span>';
            var doubleHTML =  '<span class="irs-diapason"></span>';
                doubleHTML += '<span class="irs-slider from"></span>';
                doubleHTML += '<span class="irs-slider to"></span>';

            var oldie = isOldIe();
            var isTouch = isItTouch();


            return this.each(function(){
                var slider = $(this);

                if(slider.data("isActive")) {
                    return;
                }
                slider.data("isActive", true);

                pluginCount++;
                this.pluginCount = pluginCount;

                var fromData = {
                    min: parseInt(slider.attr("value").split(";")[0]) || settings.min,
                    max: parseInt(slider.attr("value").split(";")[1]) || settings.max,
                    from: parseInt(slider.data("from")) || settings.from,
                    to: parseInt(slider.data("to")) || settings.to,
                    type: slider.data("type") || settings.type,
                    step: parseInt(slider.data("step")) || settings.step,
                    postfix: slider.data("postfix") ||  settings.postfix
                };
                settings = $.extend(settings, fromData);

                var containerHTML = '<span class="irs" id="irs-' + this.pluginCount + '"></span>';
                slider[0].style.display = "none";
                slider.before(containerHTML);

                var $container = $("#irs-" + this.pluginCount),
                    $body = $(document.body),
                    $window = $(window),
                    $rangeSlider,
                    $fieldMin,
                    $fieldMax,
                    $fieldFrom,
                    $fieldTo,
                    $fieldSingle,
                    $singleSlider,
                    $fromSlider,
                    $toSlider,
                    $activeSlider,
                    $diapason;

                var allowDrag = false,
                    sliderIsActive = false,
                    numbers = {};

                var mouseX = 0,
                    fieldMinWidth = 0,
                    fieldMaxWidth = 0,
                    normalWidth = 0,
                    fullWidth = 0,
                    sliderWidth = 0,
                    width = 0,
                    left = 0,
                    right = 0,
                    minusX = 0;




                // public methods
                this.updateData = function(options){
                    settings = $.extend(settings, options);
                    removeHTML();
                };
                this.removeSlider = function(){
                    $container.find("*").off();
                    $container.html("").remove();
                    slider.data("isActive", false);
                    slider.show();
                };





                // private methods
                var removeHTML = function(){
                    $container.find("*").off();
                    $container.html("");

                    placeHTML();
                };
                var placeHTML = function(){
                    $container.html(baseHTML);
                    $rangeSlider = $container.find(".irs");

                    $fieldMin = $rangeSlider.find(".irs-min");
                    $fieldMax = $rangeSlider.find(".irs-max");
                    $fieldMin.html(prettify(settings.min) + settings.postfix);
                    $fieldMax.html(prettify(settings.max) + settings.postfix);
                    $fieldFrom = $rangeSlider.find(".irs-from");
                    $fieldTo = $rangeSlider.find(".irs-to");
                    $fieldSingle = $rangeSlider.find(".irs-single");

                    fieldMinWidth = $fieldMin.outerWidth();
                    fieldMaxWidth = $fieldMax.outerWidth();

                    if(settings.type === "single") {
                        $rangeSlider.append(singleHTML);

                        $singleSlider = $rangeSlider.find(".single");

                        $singleSlider.on("mousedown", function(e){
                            e.preventDefault();
                            e.stopPropagation();

                            calcDimensions(e, $(this), null);

                            allowDrag = true;
                            if(oldie) $("*").prop("unselectable",true);
                        });
                        if(isTouch) {
                            $singleSlider.on("touchstart", function(e){
                                e.preventDefault();
                                e.stopPropagation();

                                calcDimensions(e.originalEvent, $(this), null);

                                allowDrag = true;
                            });
                        }

                    } else if(settings.type === "double") {
                        $rangeSlider.append(doubleHTML);

                        $fromSlider = $rangeSlider.find(".from");
                        $toSlider = $rangeSlider.find(".to");
                        $diapason = $rangeSlider.find(".irs-diapason");

                        setDiapason();

                        $fromSlider.on("mousedown", function(e){
                            e.preventDefault();
                            e.stopPropagation();

                            $(this).addClass("last");
                            $toSlider.removeClass("last");
                            calcDimensions(e, $(this), "from");
                            allowDrag = true;
                            sliderIsActive = true;
                            if(oldie) $("*").prop("unselectable",true);
                        });
                        $toSlider.on("mousedown", function(e){
                            e.preventDefault();
                            e.stopPropagation();

                            $(this).addClass("last");
                            $fromSlider.removeClass("last");
                            calcDimensions(e, $(this), "to");
                            allowDrag = true;
                            sliderIsActive = true;
                            if(oldie) $("*").prop("unselectable",true);
                        });

                        if(isTouch) {
                            $fromSlider.on("touchstart", function(e){
                                e.preventDefault();
                                e.stopPropagation();

                                $(this).addClass("last");
                                $toSlider.removeClass("last");
                                calcDimensions(e.originalEvent, $(this), "from");
                                allowDrag = true;
                                sliderIsActive = true;
                            });
                            $toSlider.on("touchstart", function(e){
                                e.preventDefault();
                                e.stopPropagation();

                                $(this).addClass("last");
                                $fromSlider.removeClass("last");
                                calcDimensions(e.originalEvent, $(this), "to");
                                allowDrag = true;
                                sliderIsActive = true;
                            });
                        }
                    }

                    $body.on("mouseup", function(){
                        if(!allowDrag) return;
                        sliderIsActive = false;
                        allowDrag = false;
                        $activeSlider.removeAttr("id");
                        $activeSlider = null;
                        if(settings.type === "double") {
                            setDiapason();
                        }
                        getNumbers();
                        if(oldie) $("*").prop("unselectable",false);
                    });
                    $body.on("mousemove", function(e){
                        if(allowDrag) {
                            mouseX = e.pageX;
                            dragSlider();
                        }
                    });

                    if(isTouch) {
                        $window.on("touchend", function(){
                            if(!allowDrag) return;
                            sliderIsActive = false;
                            allowDrag = false;
                            $activeSlider.removeAttr("id");
                            $activeSlider = null;
                            if(settings.type === "double") {
                                setDiapason();
                            }
                            getNumbers();
                        });
                        $window.on("touchmove", function(e){
                            if(allowDrag) {
                                mouseX = e.originalEvent.pageX;
                                dragSlider();
                            }
                        });
                    }

                    getSize();
                    setNumbers();

                };

                var getSize = function(){
                    normalWidth = $rangeSlider.width();
                    if($singleSlider) {
                        sliderWidth = $singleSlider.width();
                    } else {
                        sliderWidth = $fromSlider.width();
                    }
                    fullWidth = normalWidth - sliderWidth;
                };

                var calcDimensions = function(e, currentSlider, whichSlider){
                    getSize();

                    $activeSlider = currentSlider;
                    $activeSlider.attr("id", "irs-active-slider");

                    var _x1 = $activeSlider.offset().left,
                        _x2 = e.pageX - _x1;
                    minusX = _x1 + _x2 - $activeSlider.position().left;

                    if(settings.type === "single") {

                        width = $rangeSlider.width() - sliderWidth;

                    } else if(settings.type === "double") {

                        if(whichSlider === "from") {
                            left = 0;
                            right = parseInt($toSlider.css("left"));
                        } else {
                            left = parseInt($fromSlider.css("left"));
                            right = $rangeSlider.width() - sliderWidth;
                        }

                    }
                };

                var setDiapason = function(){
                    var _w = $fromSlider.width(),
                        _x = parseInt($fromSlider[0].style.left) || $fromSlider.position().left,
                        _width = parseInt($toSlider[0].style.left) || $toSlider.position().left,
                        x = _x + (_w / 2),
                        w = _width - _x;
                    $diapason[0].style.left = x + "px";
                    $diapason[0].style.width = w + "px";
                };

                var dragSlider = function(){
                    var x = Math.round(mouseX - minusX);

                    if(settings.type === "single") {

                        if(x < 0) {
                            x = 0;
                        }
                        if(x > width) {
                            x = width;
                        }
                        getNumbers();

                    } else if(settings.type === "double") {

                        if(x < left) {
                            x = left;
                        }
                        if(x > right) {
                            x = right;
                        }
                        getNumbers();
                        setDiapason();

                    }

                    $activeSlider[0].style.left = x + "px";
                };

                var getNumbers = function(){
                    var nums = {
                        fromNumber: 0,
                        toNumber: 0,
                        fromPers: 0,
                        toPers: 0,
                        fromX: 0,
                        toX: 0
                    };
                    var diapason = settings.max - settings.min, _from, _to;

                    if(settings.type === "single") {

                        nums.fromX = parseInt($singleSlider[0].style.left) || $singleSlider.position().left;
                        nums.fromPers = nums.fromX / fullWidth * 100;
                        _from = (diapason / 100 * nums.fromPers) + parseInt(settings.min);
                        nums.fromNumber = Math.round(_from / settings.step) * settings.step;

                    } else if(settings.type === "double") {

                        nums.fromX = parseInt($fromSlider[0].style.left) || $fromSlider.position().left;
                        nums.fromPers = nums.fromX / fullWidth * 100;
                        _from = (diapason / 100 * nums.fromPers) + parseInt(settings.min);
                        nums.fromNumber = Math.round(_from / settings.step) * settings.step;

                        nums.toX = parseInt($toSlider[0].style.left) || $toSlider.position().left;
                        nums.toPers = nums.toX / fullWidth * 100;
                        _to = (diapason / 100 * nums.toPers) + parseInt(settings.min);
                        nums.toNumber = Math.round(_to / settings.step) * settings.step;

                    }

                    numbers = nums;
                    setFields();

                };

                var setNumbers = function(){
                    var nums = {
                        fromNumber: settings.from,
                        toNumber: settings.to,
                        fromPers: 0,
                        toPers: 0,
                        fromX: 0,
                        toX: 0
                    };
                    var diapason = settings.max - settings.min;

                    if(settings.type === "single") {

                        nums.fromPers = (nums.fromNumber - settings.min) / diapason * 100;
                        nums.fromX = Math.round(fullWidth / 100 * nums.fromPers);
                        $singleSlider[0].style.left = nums.fromX + "px";

                    } else if(settings.type === "double") {

                        nums.fromPers = (nums.fromNumber - settings.min) / diapason * 100;
                        nums.fromX = Math.round(fullWidth / 100 * nums.fromPers);
                        $fromSlider[0].style.left = nums.fromX + "px";
                        nums.toPers = (nums.toNumber - settings.min) / diapason * 100;
                        nums.toX = Math.round(fullWidth / 100 * nums.toPers);
                        $toSlider[0].style.left = nums.toX + "px";
                        setDiapason();

                    }

                    numbers = nums;
                    setFields();
                };

                var setFields = function(){
                    var _from, _fromW, _fromX,
                        _to, _toW, _toX,
                        _single, _singleW, _singleX,
                        _slW = (sliderWidth / 2);

                    if(settings.type === "single") {

                        $fieldFrom[0].style.display = "none";
                        $fieldTo[0].style.display = "none";

                        _single = prettify(numbers.fromNumber) + settings.postfix;
                        $fieldSingle.html(_single);

                        _singleW = $fieldSingle.outerWidth();
                        _singleX = numbers.fromX - (_singleW / 2) + _slW;
                        if(_singleX < 0) {
                            _singleX = 0;
                        }
                        if(_singleX > normalWidth - _singleW) {
                            _singleX = normalWidth - _singleW;
                        }
                        $fieldSingle[0].style.left = _singleX + "px";

                        if(_singleX < fieldMinWidth) {
                            $fieldMin[0].style.display = "none";
                        } else {
                            $fieldMin[0].style.display = "block";
                        }

                        if(_singleX + _singleW > normalWidth - fieldMaxWidth) {
                            $fieldMax[0].style.display = "none";
                        } else {
                            $fieldMax[0].style.display = "block";
                        }


                        slider.attr("value", parseInt(numbers.fromNumber));

                    } else if(settings.type === "double") {

                        _from = prettify(numbers.fromNumber) + settings.postfix;
                        _to = prettify(numbers.toNumber) + settings.postfix;
                        if(numbers.fromNumber != numbers.toNumber) {
                            _single = prettify(numbers.fromNumber) + " — " + prettify(numbers.toNumber) + settings.postfix;
                        } else {
                            _single = prettify(numbers.fromNumber) + settings.postfix;
                        }
                        $fieldFrom.html(_from);
                        $fieldTo.html(_to);
                        $fieldSingle.html(_single);

                        _fromW = $fieldFrom.outerWidth();
                        _fromX = numbers.fromX - (_fromW / 2) + _slW;
                        if(_fromX < 0) {
                            _fromX = 0;
                        }
                        if(_fromX > normalWidth - _fromW) {
                            _fromX = normalWidth - _fromW;
                        }
                        $fieldFrom[0].style.left = _fromX + "px";

                        _toW = $fieldTo.outerWidth();
                        _toX = numbers.toX - (_toW / 2) + _slW;
                        if(_toX < 0) {
                            _toX = 0;
                        }
                        if(_toX > normalWidth - _toW) {
                            _toX = normalWidth - _toW;
                        }
                        $fieldTo[0].style.left = _toX + "px";

                        _singleW = $fieldSingle.outerWidth();
                        _singleX = numbers.fromX + ((numbers.toX - numbers.fromX) / 2) - (_singleW / 2) + _slW;
                        if(_singleX < 0) {
                            _singleX = 0;
                        }
                        if(_singleX > normalWidth - _singleW) {
                            _singleX = normalWidth - _singleW;
                        }
                        $fieldSingle[0].style.left = _singleX + "px";

                        if(_fromX + _fromW < _toX) {
                            $fieldSingle[0].style.display = "none";
                            $fieldFrom[0].style.display = "block";
                            $fieldTo[0].style.display = "block";
                        } else {
                            $fieldSingle[0].style.display = "block";
                            $fieldFrom[0].style.display = "none";
                            $fieldTo[0].style.display = "none";
                        }

                        if(_singleX < fieldMinWidth || _fromX < fieldMinWidth) {
                            $fieldMin[0].style.display = "none";
                        } else {
                            $fieldMin[0].style.display = "block";
                        }

                        if(_singleX + _singleW > normalWidth - fieldMaxWidth || _toX + _toW > normalWidth - fieldMaxWidth) {
                            $fieldMax[0].style.display = "none";
                        } else {
                            $fieldMax[0].style.display = "block";
                        }

                        slider.attr("value", parseInt(numbers.fromNumber) + ";" + parseInt(numbers.toNumber));

                    }

                    // trigger callback function
                    if(typeof settings.onChange == "function") {
                        settings.onChange.call(this, numbers);
                    }

                    // trigger finish function
                    if(typeof settings.onFinish == "function" && sliderIsActive === false) {
                        settings.onFinish.call(this, numbers);
                    }
                };

                placeHTML();
            });
        },
        update: function(options){
            return this.each(function(){
                this.updateData(options);
            });
        },
        remove: function(){
            return this.each(function(){
                this.removeSlider();
            });
        }
    };

    $.fn.ionRangeSlider = function(method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist for jQuery.ionRangeSlider');
        }
    };
})(jQuery);