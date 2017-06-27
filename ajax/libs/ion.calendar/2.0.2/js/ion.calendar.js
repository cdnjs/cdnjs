// Ion.Calendar
// version 2.0.2, build: 92
// © 2013 Denis Ineshin | IonDen.com
//
// Project page:    http://ionden.com/a/plugins/ion.calendar/
// GitHub page:     https://github.com/IonDen/ion.calendar
//
// Released under MIT licence:
// http://ionden.com/a/plugins/licence-en.html
// =====================================================================================================================

(function($){
    try {
        var timeNow = moment();
    } catch(e){
        alert("Can't find Moment.js, please read the ion.calendar description.");
        throw new Error("Can't find Moment.js library");
    }

    var methods = {
        init: function(options){
            var settings = $.extend({
                    lang: "en",
                    sundayFirst: true,
                    years: "80",
                    format: "",
                    clickable: true,
                    startDate: "",
                    hideArrows: false,
                    onClick: null,
                    onReady: null
                }, options),
                html, i;


            return this.each(function(){
                var $calendar = $(this);

                //prevent overwrite
                if($calendar.data("isActive")) {
                    return;
                }
                $calendar.data("isActive", true);



                var $prev,
                    $next,
                    $month,
                    $year,
                    $day,

                    timeSelected,
                    timeNowLocal = moment(timeNow.locale(settings.lang)),
                    timeForWork,
                    weekFirstDay,
                    weekLastDay,
                    monthLastDay,

                    tempYears,
                    fromYear,
                    toYear,
                    firstStart = true;



                // public methods
                this.updateData = function(options){
                    settings = $.extend(settings, options);
                    removeHTML();
                };



                // private methods
                var removeHTML = function(){
                    $prev.off();
                    $next.off();
                    $month.off();
                    $year.off();
                    $calendar.empty();

                    prepareData();
                    prepareCalendar();
                };

                var prepareData = function(){
                    // start date
                    if(settings.startDate) {
                        if(settings.format.indexOf("L") >= 0) {
                            timeSelected = moment(settings.startDate, "YYYY.MM.DD").locale(settings.lang);
                        } else {
                            timeSelected = moment(settings.startDate, settings.format).locale(settings.lang);
                        }
                    }


                    // years diapason
                    settings.years = settings.years.toString();
                    tempYears = settings.years.split("-");
                    if(tempYears.length === 1) {
                        fromYear = moment().subtract("years", tempYears[0]).format("YYYY");
                        toYear = moment().format("YYYY");
                    } else if(tempYears.length === 2){
                        fromYear = tempYears[0];
                        toYear = tempYears[1];
                    }
                    fromYear = parseInt(fromYear);
                    toYear = parseInt(toYear);

                    if(toYear < timeNowLocal.format("YYYY")) {
                        timeNowLocal.year(toYear).month(11);
                    }
                    if(fromYear > timeNowLocal.format("YYYY")) {
                        timeNowLocal.year(fromYear).month(0);
                    }
                };

                var prepareCalendar = function(){
                    timeForWork = moment(timeNowLocal);

                    weekFirstDay = parseInt(timeForWork.startOf("month").format("d"));
                    weekLastDay = parseInt(timeForWork.endOf("month").format("d"));
                    monthLastDay = parseInt(timeForWork.endOf("month").format("D"));

                    html  = '<div class="ic__container">';
                    html += '<div class="ic__header">';
                    html += '<div class="ic__prev"><div></div></div>';
                    html += '<div class="ic__next"><div></div></div>';

                    // head month
                    html += '<div class="ic__month"><select class="ic__month-select">';
                    for(i = 0; i < 12; i++){
                        if(i === parseInt(timeNowLocal.format("M")) - 1){
                            html += '<option value="' + i + '" selected="selected">' + timeForWork.month(i).format("MMMM") + '</option>';
                        } else {
                            html += '<option value="' + i + '">' + timeForWork.month(i).format("MMMM") + '</option>';
                        }
                    }
                    html += '</select></div>';

                    // head year
                    html += '<div class="ic__year"><select class="ic__year-select">';
                    for(i = fromYear; i <= toYear; i++){
                        if(i === parseInt(timeNowLocal.format("YYYY"))){
                            html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                        } else {
                            html += '<option value="' + i + '">' + i + '</option>';
                        }
                    }
                    html += '</select></div>';

                    html += '</div>';

                    if(settings.sundayFirst) {

                        // week
                        html += '<table class="ic__week-head"><tr>';
                        for(i = 0; i < 7; i++) {
                            html += '<td>' + timeForWork.day(i).format("dd") + '</td>';
                        }
                        html += '</tr></table>';

                        // month
                        html += '<table class="ic__days"><tr>';
                        // empty days
                        for(i = 0; i < weekFirstDay; i++) {
                            html += '<td class="ic__day-empty">&nbsp;</td>';
                        }
                        // days
                        for(i = 1; i <= monthLastDay; i++) {
                            // current day
                            if(moment(timeNowLocal).date(i).format("D.M.YYYY") === timeNow.format("D.M.YYYY")) {
                                html += '<td class="ic__day ic__day_state_current">' + i + '</td>';
                            } else if(timeSelected && moment(timeNowLocal).date(i).format("D.M.YYYY") === timeSelected.format("D.M.YYYY")) {
                                html += '<td class="ic__day ic__day_state_selected">' + i + '</td>';
                            } else {
                                html += '<td class="ic__day">' + i + '</td>';
                            }

                            // new week - new line
                            if((weekFirstDay + i) / 7 === Math.floor((weekFirstDay + i) / 7)) {
                                html += '</tr><tr>';
                            }
                        }
                        // empty days
                        for(i = weekLastDay; i < 6; i++) {
                            html += '<td class="ic__day-empty">&nbsp;</td>';
                        }
                        html += '</tr></table>';

                    } else {

                        // week
                        html += '<table class="ic__week-head"><tr>';
                        for(i = 1; i < 8; i++) {
                            if(i < 7) {
                                html += '<td>' + timeForWork.day(i).format("dd") + '</td>';
                            } else {
                                html += '<td>' + timeForWork.day(0).format("dd") + '</td>';
                            }
                        }
                        html += '</tr></table>';

                        // days
                        html += '<table class="ic__days"><tr>';

                        // empty days
                        if(weekFirstDay > 0) {
                            weekFirstDay = weekFirstDay - 1;
                        } else {
                            weekFirstDay = 6;
                        }
                        for(i = 0; i < weekFirstDay; i++) {
                            html += '<td class="ic__day-empty">&nbsp;</td>';
                        }

                        for(i = 1; i <= monthLastDay; i++) {
                            // current day
                            if(moment(timeNowLocal).date(i).format("D.M.YYYY") === timeNow.format("D.M.YYYY")) {
                                html += '<td class="ic__day ic__day_state_current">' + i + '</td>';
                            } else if(timeSelected && moment(timeNowLocal).date(i).format("D.M.YYYY") === timeSelected.format("D.M.YYYY")) {
                                html += '<td class="ic__day ic__day_state_selected">' + i + '</td>';
                            } else {
                                html += '<td class="ic__day">' + i + '</td>';
                            }

                            // new week - new line
                            if((weekFirstDay + i) / 7 === Math.floor((weekFirstDay + i) / 7)) {
                                html += '</tr><tr>';
                            }
                        }
                        // empty days
                        if(weekLastDay < 1) {
                            weekLastDay = 7;
                        }
                        for(i = weekLastDay - 1; i < 6; i++) {
                            html += '<td class="ic__day-empty">&nbsp;</td>';
                        }
                        html += '</tr></table>';
                    }

                    html += '</div>';


                    placeCalendar();
                };

                var placeCalendar = function(){
                    $calendar.html(html);

                    $prev = $calendar.find(".ic__prev");
                    $next = $calendar.find(".ic__next");
                    $month = $calendar.find(".ic__month-select");
                    $year = $calendar.find(".ic__year-select");
                    $day = $calendar.find(".ic__day");

                    if(settings.hideArrows) {
                        $prev[0].style.display = "none";
                        $next[0].style.display = "none";
                    } else {
                        $prev.on("click", function(e){
                            e.preventDefault();
                            timeNowLocal.subtract("months", 1);
                            if(parseInt(timeNowLocal.format("YYYY")) < fromYear) {
                                timeNowLocal.add("months", 1);
                            }
                            removeHTML();
                        });
                        $next.on("click", function(e){
                            e.preventDefault();
                            timeNowLocal.add("months", 1);
                            if(parseInt(timeNowLocal.format("YYYY")) > toYear) {
                                timeNowLocal.subtract("months", 1);
                            }
                            removeHTML();
                        });
                    }

                    $month.on("change", function(e){
                        e.preventDefault();
                        var toMonth = $(this).prop("value");
                        timeNowLocal.month(parseInt(toMonth));
                        removeHTML();
                    });
                    $year.on("change", function(e){
                        e.preventDefault();
                        var toYear = $(this).prop("value");
                        timeNowLocal.year(parseInt(toYear));
                        removeHTML();
                    });

                    if(settings.clickable) {
                        $day.on("click", function(e){
                            e.preventDefault();
                            var toDay = $(this).text();
                            timeNowLocal.date(parseInt(toDay));
                            timeSelected = moment(timeNowLocal);
                            if(settings.format.indexOf("L") >= 0) {
                                settings.startDate = timeSelected.format("YYYY-MM-DD");
                            } else {
                                settings.startDate = timeSelected.format(settings.format);
                            }

                            // trigger callback function
                            if(typeof settings.onClick === "function") {
                                if(settings.format) {
                                    if(settings.format === "moment") {
                                        settings.onClick.call(this, timeSelected);
                                    } else {
                                        settings.onClick.call(this, timeSelected.format(settings.format));
                                    }
                                } else {
                                    settings.onClick.call(this, timeSelected.format());
                                }
                            }

                            removeHTML();
                        });
                    }

                    // trigger onReady function
                    if(typeof settings.onReady === "function") {
                        if(settings.format) {
                            if(settings.format === "moment") {
                                settings.onReady.call(this, timeNowLocal);
                            } else {
                                settings.onReady.call(this, timeNowLocal.format(settings.format));
                            }
                        } else {
                            settings.onReady.call(this, timeNowLocal.format());
                        }
                    }

                    // go to startDate
                    if(settings.startDate && firstStart) {
                        firstStart = false;
                        timeNowLocal.year(parseInt(timeSelected.format("YYYY")));
                        timeNowLocal.month(parseInt(timeSelected.format("M") - 1));
                        removeHTML();
                    }
                };



                // yarrr!
                prepareData();
                prepareCalendar();
            });
        },
        update: function(options){
            return this.each(function(){
                this.updateData(options);
            });
        }
    };

    $.fn.ionCalendar = function(method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist for jQuery.ionCalendar');
        }
    };
})(jQuery);



// =====================================================================================================================
// Ion.DatePicker
// support plugin for ion.calendar

(function($){
    var pluginCount = 0,
        html,
        $body = $(document.body);

    var closePopups = function(){
        $(".ic__datepicker").css("left", "-9999px").css("top", "-9999px");
    };

    var methods = {
        init: function(options){
            var settings = $.extend({
                lang: "en",
                sundayFirst: true,
                years: "80",
                clickable: true,
                format: ""
            }, options);

            return this.each(function(){
                var $input = $(this),
                    $popup,
                    tempData = {},
                    self = this,
                    x, y, w,
                    selectedDate,
                    currentDate,
                    testDate;

                //prevent overwrite
                if($input.data("isActive")) {
                    return;
                }
                $input.data("isActive", true);

                pluginCount++;
                this.pluginCount = pluginCount;

                // change settings from data
                tempData.lang = $input.data("lang") || settings.lang;
                if($input.data("sundayfirst") === false) {
                    tempData.sundayFirst = $input.data("sundayfirst");
                }
                tempData.years = $input.data("years") || settings.years;
                tempData.format = $input.data("format") || settings.format;
                $.extend(settings, tempData);


                $body.on("mousedown", function(){
                    closePopups();
                });


                settings.onClick = function(date){
                    $input.prop("value", date);
                    selectedDate = date;
                    closePopups();
                };

                var preparePopup = function(){
                    html = '<div class="ic__datepicker" id="ic__datepicker-' + self.pluginCount + '"></div>';
                    $body.append(html);
                    $popup = $("#ic__datepicker-" + self.pluginCount);
                    $popup.ionCalendar(settings);

                    $popup.on("mousedown", function(e){
                        e.stopPropagation();
                    });
                    $input.on("mousedown", function(e){
                        e.stopPropagation();
                    });
                    $input.on("focusin", function(){
                        closePopups();
                        openPopup();
                    });
                    $input.on("keyup", function(){
                        openPopup();
                    });
                };

                var openPopup = function(){
                    x = parseInt($input.offset().left);
                    y = parseInt($input.offset().top);
                    w = parseInt($input.outerWidth(true));

                    $popup.css("left", (x + w + 10) + "px").css("top", (y - 10) + "px");


                    currentDate = $input.prop("value");
                    if(currentDate && currentDate !== selectedDate && settings.format.indexOf("L") < 0) {
                        testDate = moment(currentDate, settings.format);
                        if(testDate.isValid()) {
                            $popup.ionCalendar("update", {
                                startDate: currentDate
                            });
                        }
                    }

                };


                // yarrr!
                preparePopup();
            });
        },
        close: function(){
            closePopups();
        }
    };


    $.fn.ionDatePicker = function(method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist for jQuery.ionDatePicker');
        }
    };
})(jQuery);
