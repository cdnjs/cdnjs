// chronoline.js v0.1.6
// by Kevin Leung for Zanbato, https://zanbato.com
// MIT license at https://github.com/StoicLoofah/chronoline.js/blob/master/LICENSE.md

    if (!Date.now) {
        Date.now = function now() {
            return +(new Date);
        };
    }

DAY_IN_MILLISECONDS = 86400000;

requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function( callback, element){
    return window.setTimeout(function(){callback(+new Date());}, 1000 / 60);
};

function addElemClass(paperType, node, newClass){
    if(paperType == 'SVG'){
        node.setAttribute('class', newClass);
    } else {
        node.className += ' ' + newClass;
    }
}

// http://javascript.about.com/library/bldst.htm
Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};
Date.prototype.dstHourAdjustment = function() {
    return (this.stdTimezoneOffset() - this.getTimezoneOffset()) / 60;
};
CL_HOUR = 12;
Date.prototype.stripTime = function(){
    // this is a mutator, so be careful with it
    // when you get dates from external sources, copy the date first and then apply this fn
    this.setHours(CL_HOUR + this.dstHourAdjustment());
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
};

Date.MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
Date.DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

Date.prototype.formatDate = function(formatString){
    /*
     * done in the style of c's strftime
     * http://www.cplusplus.com/reference/ctime/strftime/
     * TODO slowly adding in new parts to this
     * note that this also doesn't escape things properly. sorry
     * if you need more power here - https://github.com/samsonjs/strftime
     */
    var ret = formatString;
    if(formatString.indexOf('%d') != -1){
        var dateNum = this.getDate().toString();
        if(dateNum.length < 2)
            dateNum = '0' + dateNum;
        ret = ret.replace('%d', dateNum);
    }
    if(formatString.indexOf('%b') != -1){
        var month = Date.MONTH_NAMES[this.getMonth()].substring(0, 3);
        ret = ret.replace('%b', month);
    }
    if(formatString.indexOf('%Y') != -1){
        ret = ret.replace('%Y', this.getFullYear());
    }
    if(formatString.indexOf('%a') != -1){
        var day = Date.DAY_NAMES[this.getDay()].substring(0, 3);
        ret = ret.replace('%a', day);
    }

    return ret;
};

function strftime(formatString, date) {
    // for convenience
    return date.formatDate(formatString);
}


function getLeft(elem){
    // parseInt automatically tosses the "px" off the end
    return parseInt(elem.style.left);
}

function getEndDate(dateArray){
    return dateArray[dateArray.length - 1];
}

function isFifthDay(date){
    var day = date.getDate();
    return (day == 1 || day % 5 === 0) && day != 30;
}

function isHalfMonth(date){
    var day = date.getDate();
    return day == 1 || day == 15;
}

function prevMonth(date){
    // returns the beginning of the current month if in the middle of the month
    var newDate = new Date(date.getTime() - DAY_IN_MILLISECONDS);
    return new Date(newDate.getFullYear(), newDate.getMonth(), 1);
}

function nextMonth(date){
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

function prevQuarter(date){
    // returns the beginning of the quarter if in the middle of a quarter
    var newDate = new Date(date.getTime() - DAY_IN_MILLISECONDS);
    var month = newDate.getMonth();
    return new Date(newDate.getFullYear(), month - month % 3, 1);
}

function nextQuarter(date){
    var month = date.getMonth();
    return new Date(date.getFullYear(), month - month % 3 + 3, 1);
}

function backWeek(date){
    return new Date(date.getTime() - DAY_IN_MILLISECONDS * 7);
}

function forwardWeek(date){
    return new Date(date.getTime() + DAY_IN_MILLISECONDS * 7);
}

function Chronoline(domElement, events, options) {
    var t = this;
    t.VERSION = "0.1.6";

    //sanitize Chronoline parameters
    //initilize events to emplty arry if null
    //set optons to empty object if null
    //thow exception if domElement is not set
    function paramVal(){
        events = events != null ? events : [];
        options = options != null ? options : {};
        if(domElement == null) throw "Dom element not defined.";
    }
    var defaults = {
        defaultStartDate: null,  // the date furthest to the left on load. Defaults to today
        startDate: null,  // start of the timeline. Defaults to first event date
        endDate: null,  // end of the timeline. Defauls to the last event date

        visibleSpan: 2592000000,  // in milliseconds,
        timelinePadding: 0, // in ms. Adds this much time to the front and back to get some space
        fitVisibleSpan: false, // condense the entire span to be visible without scrolling

        topMargin: 40,  // overhead space on the canvas. useful for additional content
        eventHeight: 5,  // how tall event events are
        eventMargin: 4,  // how far apart the events are
        dateLabelHeight: 50, // how tall the bottom margin for the dates is
        hashLength: 4,  // length of the hash marks for the days
        minEventsHeight: 40,
        maxEventsHeight: 1000,

        hashColor: '#b8b8b8',

        eventAttrs: {  // attrs for the bars and circles of the events
            fill: '#0055e1',
            stroke: '#0055e1',
            "stroke-width": 2
        },

        // predefined fns include: null (for daily), isFifthDay, isHalfMonth
        hashInterval: null,  // fn: date -> boolean, if a hash should appear
        labelInterval: null,  // fn: date -> boolean, if a hash should appear
        labelFormat: '%d',  // based on strftime

        subLabel: 'month',  // TODO generalize this code
        subLabelMargin: 2,
        subLabelAttrs: {'font-weight': 'bold'},
        floatingSubLabels: true,  // whether sublabels should float into view

        subSubLabel: 'year',  // TODO generalize this code
        subSubLabelMargin: 2,
        subSubLabelAttrs: {'font-weight': 'bold'},
        floatingSubSubLabels: true,  // whether subSublabels should float into view

        fontAttrs: {
            'font-size': 10,
            fill: '#000000'
        },
        scrollable: true,
        // predefined fns include: prevMonth, nextMonth, prevQuarter, nextQuarter, backWeek, forwardWeek
        scrollLeft: backWeek,
        scrollRight: forwardWeek,
        animated: false,  // whether scrolling is animated or just jumps, requires jQuery

        tooltips: false,  // activates qtip tooltips. Otherwise, you just get title tooltips
        qtipOptions: {},  // additional options to pass to qTip

        markToday: 'line',  // 'line', 'labelBox', false
        todayAttrs: {'stroke': '#484848'},

        sections: [],
        floatingSectionLabels: true,
        sectionLabelAttrs: {},
        sectionLabelsOnHover: true,

        draggable: false, // requires jQuery, allows mouse dragging

        continuousScroll: true,  // requires that scrollable be true, click-and-hold arrows
        continuousScrollSpeed: 1,  // I believe this is px/s of scroll. There is no easing in it
        eventClick: null, // called when user clicks on event, function(data)
        eventDblClick: null, // called when user double clicks on event, function(data)
        sectionClick: null, // called when user clicks on a section, function(data, date)
        sectionDblClick: null, // called when user double clicks on a section, function(data, date)
        backgroundClick: null, // called when user clicks the background, function(date)
        backgroundDblClick: null // called when user double clicks on the background, function(date)
    };

    //apply the default values and options to the t object
    // this method should only be called once at initial initilization
    // initilizes any required attributes that do not need to be recreated by refresh function
    function setAttrDefaults(){
        // FILL DEFAULTS
        for(var attrname in defaults){ t[attrname] = defaults[attrname];}
        for(var attrname in options){ t[attrname] = options[attrname];}

        // this is hacky, but necessary for backwards-compability
        t.originalStartDate = t.startDate;
        t.originalEndDate = t.endDate;
        t.originalDefaultStartDate = t.defaultStartDate;

        // HTML elements to put everything in
        t.domElement = domElement;

        t.wrapper = document.createElement('div');
        t.wrapper.className = 'chronoline-wrapper';
        t.domElement.appendChild(t.wrapper);

        t.events = events;

         // generating relevant dates
        t.today = new Date(Date.now());
        t.today.stripTime();

        //init default start date to today if not initilized
        if(t.defaultStartDate === null){
            t.defaultStartDate = t.today;
        }
    }

    //Sanitizes and validates attributes.
    //called before initial init and during refresh to re-sanitize because some properties may have been changed.
    //Called after attribute defaults are set
    function preInit(){

        t.events = t.events === null ? [] : t.events;
        // need to toss the time variance bits
        for(var i = 0; i < t.events.length; i++){
            for(var j = 0; j < t.events[i].dates.length; j++){
                t.events[i].dates[j] = new Date(Date.parse(t.events[i].dates[j]));
                t.events[i].dates[j].stripTime();
            }
        }
        t.events.sort(t.sortEvents);


        t.sections = t.sections === null ? [] : t.sections;
        // options shouldn't be on if there aren't any sections
        t.floatingSectionLabels &= t.sections.length !== 0;
        t.sectionLabelsOnHover &= t.sections.length !== 0;
        // same thing for sections
        for(var i = 0; i < t.sections.length; i++){
            for(var j = 0; j < t.sections[i].dates.length; j++){
                t.sections[i].dates[j] = new Date(Date.parse(t.sections[i].dates[j]));
                t.sections[i].dates[j].stripTime();
            }
        }
        t.sections.sort(t.sortEvents);


        t.drawnStartMs = null;
        t.drawnEndMs = null;

        t.isMoving = false;
    }

    t.init = function() {
        // CALCULATING MORE THINGS


        if(t.startDate === null){
            if(t.events.length > 0){
                t.startDate = new Date(Date.parse(t.events[0].dates[0]));
                for(var i = 1; i < t.events.length; i++)
                    if(t.events[i].dates[0] < t.startDate)
                        t.startDate = new Date(Date.parse(t.events[i].dates[0]));
            } else if(t.sections.length > 0) {
                t.startDate = new Date(Date.parse(t.sections[0].dates[0]));
                for(var i = 0; i < t.sections.length; i++){
                    if(t.sections[i].dates[0] < t.startDate)
                        t.startDate = new Date(Date.parse(t.sections[i].dates[0]));
                }
            } else {// default to default start date if no events or sections defined
                //returning here stops the canvas from being initilized
                t.startDate = t.defaultStartDate;
            }
        }
        t.startDate.stripTime();

        if(t.startDate > t.defaultStartDate)
            t.startDate = t.defaultStartDate;
        t.startDate = new Date(t.startDate.getTime() - t.timelinePadding);
        t.startTime = t.startDate.getTime();

        if(t.endDate === null){
            if(t.events.length > 0){
                t.endDate = getEndDate(t.events[0].dates);
                for(var i = 1; i < t.events.length; i++)
                    if(getEndDate(t.events[i].dates) > t.endDate)
                        t.endDate = getEndDate(t.events[i].dates);
            } else if(t.sections.length > 0) {
                t.endDate = Date.parse(t.sections[0].dates[1]);
                for(var i = 0; i < t.sections.length; i++){
                    if(t.sections[i].dates[1] > t.endDate)
                        t.endDate = Date.parse(t.sections[i].dates[1]);
                }
            } else {// default to default start date if no events or sections defined
                //returning here stops the canvas from being initilized
                t.endDate = t.defaultStartDate;
            }
        }
        if(t.endDate < t.defaultStartDate) {
            t.endDate = t.defaultStartDate;
        }
        t.endDate = new Date(Math.max(t.endDate.getTime(), t.startDate.getTime() + t.visibleSpan) + t.timelinePadding);
        t.endDate.stripTime();


        // this ratio converts a time into a px position
        t.visibleWidth = t.domElement.clientWidth;
        if(t.fitVisibleSpan) {
            t.startDate = new Date(t.startDate.getTime() - DAY_IN_MILLISECONDS);
            t.endDate = new Date(t.endDate.getTime() + DAY_IN_MILLISECONDS);
            t.pxRatio = t.visibleWidth / (t.endDate - t.startDate);
        } else {
            t.pxRatio = t.visibleWidth / t.visibleSpan;
        }
        t.totalWidth = t.pxRatio * (t.endDate.getTime() - t.startDate.getTime());
        t.maxLeftPx = t.totalWidth - t.visibleWidth;

        // SPLIT THE DATES INTO THE ROW THAT THEY BELONG TO
        // TODO
        // this is a greedy algo that definitely isn't optimal
        // it at least needs to find the latest row that still fits
        // this, however, may cause very strange behavior (everything being on the 2nd line),
        // so I'm going to prefer this in the short term

        // calculated here so it can be used in splitting dates
        t.circleRadius = t.eventHeight / 2;

        t.eventRows = [[]];
        t.rowLastPxs = [0];

        for(var i = 0; i < t.events.length; i++){
            var found = false;
            var startPx = t.msToPx(t.events[i].dates[0].getTime()) - t.circleRadius;
            for(var j = 0; j < t.eventRows.length; j++){
                if(t.rowLastPxs[j] < startPx){
                    t.eventRows[j].push(t.events[i]);
                    t.rowLastPxs[j] = t.msToPx(getEndDate(t.events[i].dates).getTime()) + t.circleRadius;
                    found = true;
                    break;
                }
            }
            if(!found){
                t.eventRows.push([t.events[i]]);
                t.rowLastPxs.push(t.msToPx(getEndDate(t.events[i].dates).getTime()) + t.circleRadius);
            }
        }

        // a few more calculations and creation
        t.eventsHeight = Math.max(Math.min(t.eventRows.length * (t.eventMargin + t.eventHeight), t.maxEventsHeight), t.minEventsHeight);
        t.totalHeight = t.dateLabelHeight + t.eventsHeight + t.topMargin;

        // creating canvas pieces
        //remove right control from wrapper if  exists
        if (t.myCanvas && t.wrapper.hasChildNodes()) {
            for(i = t.wrapper.childNodes.length - 1;i >=0;i--)
                if(t.wrapper.childNodes[i] === t.myCanvas){
                    t.wrapper.removeChild(t.myCanvas);
                    break;
                }
        }

        t.myCanvas = document.createElement('div');
        t.myCanvas.className = 'chronoline-canvas';
        t.wrapper.appendChild(t.myCanvas);

        t.paper = Raphael(t.myCanvas, t.totalWidth, t.totalHeight);
        t.paperType = t.paper.raphael.type;
        t.paperElem = t.myCanvas.childNodes[0];

        // DRAWING
        t.floatingSet = t.paper.set();
        t.sectionLabelSet = t.paper.set();

        //attach background click events function
        if (t.backgroundClick) {
            t.myCanvas.onclick = function(e) {
                //if not event or section click.
                if (e.target.nodeName != 'circle' && e.target.nodeName != 'rect') {
                    var clickDate = new Date(t.pxToMs(e.clientX));
                    clickDate.stripTime();
                    t.backgroundClick(clickDate);
                }
            }
        }
        //attach background double click events function
        if (t.backgroundDblClick) {
            t.myCanvas.ondblclick = function(e) {
                //if not event or section click.
                if (e.target.nodeName != 'circle' && e.target.nodeName != 'rect') {
                    var clickDate = new Date(t.pxToMs(e.clientX));
                    clickDate.stripTime();
                    t.backgroundDblClick(clickDate);
                }
            }
        }

        // drawing sections
        if(t.sections !== null){
            for(var i = 0; i < t.sections.length; i++){
                var section = t.sections[i];
                var startX = (section.dates[0].getTime() - t.startTime) * t.pxRatio;
                var width = (section.dates[1] - section.dates[0]) * t.pxRatio;
                var elem = t.paper.rect(startX, 0, width, t.totalHeight);
                if (t.sectionClick || t.sectionDblClick) {
                    elem.data('sectionData', section);
                }
                if (t.sectionClick) {
                    elem.click(function(e) {
                        e.preventDefault();
                        var clickDate = new Date(t.pxToMs(e.clientX));
                        clickDate.stripTime();
                        t.sectionClick(this.data('sectionData'), clickDate);
                    });
                }
                if (t.sectionDblClick) {
                    elem.dblclick(function (e) {
                        e.preventDefault();
                        var clickDate = new Date(t.pxToMs(e.clientX));
                        clickDate.stripTime();
                        t.sectionDblClick(this.data('sectionData'), clickDate);
                    });
                }
                addElemClass(t.paperType, elem.node, 'chronoline-section');
                elem.attr('stroke-width', 0);
                elem.attr('stroke', '#ffffff');
                if(typeof section.attrs != "undefined"){
                    elem.attr(section.attrs);
                }
                var sectionLabel = t.paper.text(startX + 10, 10, section.title);
                sectionLabel.attr('text-anchor', 'start');
                sectionLabel.attr(t.sectionLabelAttrs);
                if(t.floatingSectionLabels){
                    // bounds determine how far things can float
                    sectionLabel.data('left-bound', startX + 10);
                    sectionLabel.data('right-bound', startX + width - sectionLabel.attr('width'));
                    t.floatingSet.push(sectionLabel);
                    t.sectionLabelSet.push(sectionLabel);
                }

                elem.data('label', sectionLabel);

                if(t.sectionLabelsOnHover){
                    elem.hover(function(){this.data('label').animate({opacity: 1}, 200);},
                               function(){this.data('label').animate({opacity: 0}, 200);});
                    sectionLabel.hover(function(){this.animate({opacity: 1}, 200);},
                                       function(){this.animate({opacity: 0}, 200);});
                    sectionLabel.attr('opacity', 0);
                }

            }
        }

        // put all of these in front of the sections
        t.sectionLabelSet.forEach(function(label){
            label.toFront();
        });

        // drawing events
        for(var row = 0; row < t.eventRows.length; row++){
            var upperY = t.totalHeight - t.dateLabelHeight - (row + 1) * (t.eventMargin + t.eventHeight);
            for(var col = 0; col < t.eventRows[row].length; col++){
                var myEvent = t.eventRows[row][col];
                var startX = (myEvent.dates[0].getTime() - t.startTime) * t.pxRatio;
                var elem = null;
                if(myEvent.dates.length == 1){  // it's a single point
                    elem = t.paper.circle(startX, upperY + t.circleRadius, t.circleRadius)
                        .attr(t.eventAttrs);
                } else {  // it's a range
                    var width = (getEndDate(myEvent.dates) - myEvent.dates[0]) * t.pxRatio;
                    // left rounded corner
                    var leftCircle = t.paper.circle(startX, upperY + t.circleRadius, t.circleRadius).attr(t.eventAttrs);
                    if(typeof myEvent.attrs != "undefined"){
                        leftCircle.attr(myEvent.attrs);
                    }
                    addElemClass(t.paperType, leftCircle.node, 'chronoline-event');
                    // right rounded corner
                    var rightCircle = t.paper.circle(startX + width, upperY + t.circleRadius, t.circleRadius).attr(t.eventAttrs);
                    if(typeof myEvent.attrs != "undefined"){
                        rightCircle.attr(myEvent.attrs);
                    }
                    addElemClass(t.paperType, rightCircle.node, 'chronoline-event');
                    elem = t.paper.rect(startX, upperY, width, t.eventHeight)
                        .attr(t.eventAttrs);
                }
                if (t.eventClick || t.eventDblClick) {
                    elem.data("eventData", myEvent);
                }
                if (t.eventClick) {
                    elem.click(function(e) {
                        e.preventDefault();
                        t.eventClick(this.data("eventData"));
                    });
                }
                if (t.eventDblClick) {
                    elem.dblclick(function(e) {
                        e.preventDefault();
                        t.eventDblClick(this.data("eventData"));
                    });
                }
                if(typeof myEvent.link != 'undefined') {
                    elem.data('link', myEvent.link);
                    elem.click(function(){
                        window.location.href = this.data('link');
                    });
                }

                if(typeof myEvent.attrs != "undefined"){
                    elem.attr(myEvent.attrs);
                }
                addElemClass(t.paperType, elem.node, 'chronoline-event');

                elem.attr('title', myEvent.title);

                if(t.tooltips){
                    var description = myEvent.description;
                    var title = myEvent.title;
                    var $node = jQuery(elem.node);
                    if(typeof description == "undefined" || description === ''){
                        description = title;
                        title = '';
                    }

                    if(Raphael.type == 'SVG')
                        $node = $node.parent();
                    var usedQtipOptions = {
                        content: {
                            title: title,
                            text: description
                        },
                        position: {
                            my: 'top left',
                            target: 'mouse',
                            viewport: jQuery(window), // Keep it on-screen at all times if possible
                            adjust: {
                                x: 10,  y: 10
                            }
                        },
                        hide: {
                            fixed: true // Helps to prevent the tooltip from hiding ocassionally when tracking!
                        },
                        style: {
                            classes: 'qtip-shadow qtip-dark qtip-rounded'
                        }
                    };
                    $.extend(true, usedQtipOptions, t.qtipOptions);
                    $node.qtip(usedQtipOptions);
                }
                if(t.sections !== null && t.sectionLabelsOnHover){
                    // some magic here to tie the event back to the section label element
                    var originalIndex = myEvent.section;
                    if(typeof originalIndex != "undefined"){
                        var newIndex = 0;
                        for(var i = 0; i < t.sections.length; i++){
                            if(t.sections[i].section == originalIndex){
                                elem.data('sectionLabel', t.sectionLabelSet[i]);
                                break;
                            }
                        }
                        elem.hover(function(){this.data('sectionLabel').animate({opacity: 1}, 200);},
                                   function(){this.data('sectionLabel').animate({opacity: 0}, 200);});
                    }
                }
            }
        }

        // calculated ahead of time
        t.dateLineY = t.totalHeight - t.dateLabelHeight;
        var baseline = t.paper.path('M0,' + t.dateLineY + 'L' + t.totalWidth + ',' + t.dateLineY);
        baseline.attr('stroke', t.hashColor);

        t.bottomHashY = t.dateLineY + t.hashLength;
        t.labelY = t.bottomHashY + t.fontAttrs['font-size'];
        t.subLabelY = t.bottomHashY + t.fontAttrs['font-size'] * 2 + t.subLabelMargin;
        t.subSubLabelY = t.subLabelY + t.fontAttrs['font-size'] + t.subSubLabelMargin;

        // DATE LABELS
        // only a helper b/c it works within a specific range

        // subSublabels. These can float
        if(t.subSubLabel == 'year'){
            var endYear = t.endDate.getFullYear();
            for(var year = t.startDate.getFullYear(); year <= endYear; year++){
                var curDate = new Date(year, 0, 1);
                curDate.stripTime();
                var x = t.msToPx(curDate.getTime());
                var subSubLabel = t.paper.text(x, t.subSubLabelY, curDate.formatDate('%Y').toUpperCase());
                subSubLabel.attr(t.fontAttrs);
                subSubLabel.attr(t.subSubLabelAttrs);
                if(t.floatingSubSubLabels){
                    // bounds determine how far things can float
                    subSubLabel.data('left-bound', x);
                    var endOfYear = new Date(year, 11, 31);
                    endOfYear.stripTime();
                    subSubLabel.data('right-bound',
                                     Math.min((endOfYear.getTime() - t.startTime) * t.pxRatio - 5,
                                              t.totalWidth));
                    t.floatingSet.push(subSubLabel);
                }
            }
        }
        if(t.scrollable) {
            t.initScrollable();
        }
        if(t.draggable) {
            t.initDraggable();
        }

        // set the default position
        t.drawnStartMs = null;
        t.drawnEndMs = null;
        t.paperElem.style.left = - (t.defaultStartDate - t.startDate) * t.pxRatio + 20 + 'px';
        t.goToPx(getLeft(t.paperElem));
        t.myCanvas.style.height = t.totalHeight + 'px';
    };

    /***************************************************************************/
    /***************** Helper functions ****************************************/
    // SORT EVENTS
    t.sortEvents = function(a, b){
        a = a.dates;
        b = b.dates;

        var aEnd = a[a.length - 1].getTime();
        var bEnd = b[b.length - 1].getTime();
        if(aEnd != bEnd){
            return aEnd - bEnd;
        }
        return a[0].getTime() - b[0].getTime();
    };

    // 2 handy utility functions
    t.pxToMs = function(px){
        return t.startTime + px / t.pxRatio;
    };
    t.msToPx = function(ms){
        return (ms - t.startTime) * t.pxRatio;
    };

    t.resize = function(visibleSpan) {
        // useful for zooming
        t.visibleSpan = visibleSpan;
        t.init();
    };

    t.zoom = function(zoomFactor) {
        t.resize(t.visibleSpan / zoomFactor);
    };

    t.drawLabelsHelper = function(startMs, endMs){
        for(var curMs = startMs; curMs < endMs; curMs += DAY_IN_MILLISECONDS){
            var curDate = new Date(curMs);
            var day = curDate.getDate();
            var x = t.msToPx(curMs);

            // the little hashes
            if(t.hashInterval === null || t.hashInterval(curDate)){
                var hash = t.paper.path('M' + x + ',' + t.dateLineY + 'L' + x + ',' + t.bottomHashY);
                hash.attr('stroke', t.hashColor);
            }

            // the labels directly below the hashes
            if(t.labelInterval === null || t.labelInterval(curDate)){
                var label = t.paper.text(x, t.labelY, curDate.formatDate(t.labelFormat));
                label.attr(t.fontAttrs);
            }

            // special markers for today
            if(t.markToday && curMs == t.today.getTime()){
                if(t.markToday == 'labelBox'){
                    label.attr({'text': label.attr('text') + '\n' + curDate.formatDate('%b').toUpperCase(),
                                'font-size': t.fontAttrs['font-size'] + 2,
                                'y': t.bottomHashY + t.fontAttrs['font-size'] + 5});
                    var bbox = label.getBBox();
                    var labelBox = t.paper.rect(bbox.x - 2, bbox.y - 2, bbox.width + 4, bbox.height + 4);
                    labelBox.attr('fill', '90-#f4f4f4-#e8e8e8');
                    labelBox.insertBefore(label);
                }else if(t.markToday == 'line'){
                    var line = t.paper.path('M' + x + ',0L' + x + ',' + t.dateLineY);
                    line.attr(t.todayAttrs);
                }
            }

            // sublabels. These can float
            if(day == 1 && t.subLabel == 'month'){
                var subLabel = t.paper.text(x, t.subLabelY, curDate.formatDate('%b').toUpperCase());
                subLabel.attr(t.fontAttrs);
                subLabel.attr(t.subLabelAttrs);
                if(t.floatingSubLabels){
                    // bounds determine how far things can float
                    subLabel.data('left-bound', x);
                    var endOfMonth = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0, CL_HOUR);
                    subLabel.data('right-bound',
                                  Math.min((endOfMonth.getTime() - t.startTime) * t.pxRatio - 5,
                                           t.totalWidth));
                    t.floatingSet.push(subLabel);
                }
            }
        }
    };

    // this actually draws labels. It calculates the set of labels to draw in-between
    // what it currently has and needs to add
    t.drawLabels = function(leftPxPos){
        var newStartPx = Math.max(0, leftPxPos - t.visibleWidth);
        var newEndPx = Math.min(t.totalWidth, leftPxPos + 2 * t.visibleWidth);

        var newStartDate = new Date(t.pxToMs(newStartPx));
        newStartDate = new Date(newStartDate.getFullYear(), newStartDate.getMonth(), 1, CL_HOUR);
        var newStartMs = newStartDate.getTime();
        var newEndDate = new Date(t.pxToMs(Math.min(t.totalWidth, leftPxPos + 2 * t.visibleWidth)));
        newEndDate.stripTime();

        var newEndMs = newEndDate.getTime();

        if(t.drawnStartMs === null){  // first time
            t.drawnStartMs = newStartMs;
            t.drawnEndMs = newEndMs;
            t.drawLabelsHelper(newStartMs, newEndMs);
        }else if(newStartMs > t.drawnEndMs){  // new labels are to the right
            t.drawLabelsHelper(t.drawnEndMs, newEndMs);
            t.drawnEndMs = newEndMs;
        }else if(newEndMs < t.drawnStartMs){  // to the left
            t.drawLabelsHelper(newStartMs, t.drawnStartMs);
            t.drawnStartMs = newStartMs;
        }else {  // overlap
            if(newStartMs < t.drawnStartMs){
                t.drawLabelsHelper(newStartMs, t.drawnStartMs);
                t.drawnStartMs = newStartMs;
            }
            if(newEndMs > t.drawnEndMs){
                t.drawLabelsHelper(t.drawnEndMs, newEndMs);
                t.drawnEndMs = newEndMs;
            }
        }
    };


    t.goToPx = function(finalLeft, isAnimated, isLabelsDrawn) {
        /*
          finalLeft is negative

          I tried several implementations here, including:
          - moving the left of the canvas within a wrapper (current strategy)
          - animating setViewbox using getAnimationFrame
          - animating each individual element using getAnimation frame

          - animating floating content using getAnimation (current strategy)
          - animating floating content using raphael.animate
          This solution is by far the smoothest and doesn't have any asynchrony problems. There's some twitching going on with floating content, but it's not THAT bad
        */
        if(t.isMoving) return false;

        isAnimated = typeof isAnimated !== 'undefined' ? isAnimated : t.animated;
        isLabelsDrawn = typeof isLabelsDrawn !== 'undefined' ? isLabelsDrawn : true;

        finalLeft = Math.max(Math.min(finalLeft, 0), -t.maxLeftPx);

        if(isLabelsDrawn)
            t.drawLabels(-finalLeft);

        var left = getLeft(t.paperElem);

        // hide scroll buttons if you're at the end
        if(t.scrollable){
            if(finalLeft === 0){
                t.leftControl.style.display = 'none';
                t.isScrolling = false;
            } else {
                t.leftControl.style.display = '';
            }
            if(finalLeft == t.visibleWidth - t.totalWidth){
                t.rightControl.style.display = 'none';
                t.isScrolling = false;
            } else {
                t.rightControl.style.display = '';
            }
        }

        var movingLabels = [];
        var floatedLeft = -finalLeft + 5;
        t.floatingSet.forEach(function(label){
            // pin the to the left side
            if(label.data('left-bound') < floatedLeft && label.data('right-bound') > floatedLeft) {
                movingLabels.push([label, label.attr('x'),
                                   floatedLeft - label.attr('x') + 10]);
            } else if(label.attr('x') != label.data('left-bound')) { // push it to where it should be
                movingLabels.push([label, label.attr('x'),
                                   label.data('left-bound') - label.attr('x')]);
            }
        });

        if(isAnimated){
            t.isMoving = true;

            var start = null;
            var elem = t.paperElem;
            function step(timestamp) {
                if(start === null)
                    start = timestamp;
                var progress = (timestamp - start) / 200;
                var pos = (finalLeft - left) * progress + left;
                elem.style.left = pos + "px";

                // move the labels
                for(var i = 0; i < movingLabels.length; i++){
                    movingLabels[i][0].attr('x', movingLabels[i][2] * progress + movingLabels[i][1]);
                }

                if (progress < 1) {  // keep going
                    requestAnimationFrame(step);
                }else{  // put it in its final position
                    t.paperElem.style.left = finalLeft + "px";
                    for(var i = 0; i < movingLabels.length; i++){
                        movingLabels[i][0].attr('x', movingLabels[i][2] + movingLabels[i][1]);
                    }
                    t.isMoving = false;
                }
            }
            requestAnimationFrame(step);

        }else{  // no animation is just a shift
            t.paperElem.style.left = finalLeft + 'px';
            for(var i = 0; i < movingLabels.length; i++){
                movingLabels[i][0].attr('x', movingLabels[i][2] + movingLabels[i][1]);
            }
        }

        return finalLeft !== 0 && finalLeft != -t.maxLeftPx;
    };

    t.goToDate = function(date, position){
        // position is negative for left, 0 for middle, positive for right
        date = new Date(date.getTime());
        date.stripTime();
        if(position < 0){
            t.goToPx(-t.msToPx(date.getTime()));
        } else if(position > 0){
            t.goToPx(-t.msToPx(date.getTime()) + t.visibleWidth);
        } else {
            t.goToPx(-t.msToPx(date.getTime()) + t.visibleWidth / 2);
        }
    };

    t.initScrollable = function(){
        //remove left control from wrapper if exists
        if (t.leftControl && t.wrapper.hasChildNodes()) {
            for(i = t.wrapper.childNodes.length - 1;i >=0;i--)
                if(t.wrapper.childNodes[i] === t.leftControl){
                    t.wrapper.removeChild(t.leftControl);
                    break;
                }
        }
        t.leftControl = document.createElement('div');
        t.leftControl.className = 'chronoline-left';
        t.leftControl.style.marginTop = t.topMargin + 'px';

        var leftIcon = document.createElement('div');
        leftIcon.className = 'chronoline-left-icon';
        t.leftControl.appendChild(leftIcon);
        t.wrapper.appendChild(t.leftControl);
        var controlHeight = Math.max(t.eventsHeight,
                                     t.leftControl.clientHeight);
        t.leftControl.style.height =  controlHeight + 'px';
        leftIcon.style.marginTop = (controlHeight - 15) / 2 + 'px';

        //remove right control from wrapper if  exists
        if (t.rightControl && t.wrapper.hasChildNodes()) {
            for(i = t.wrapper.childNodes.length - 1;i >=0;i--)
                if(t.wrapper.childNodes[i] === t.rightControl){
                    t.wrapper.removeChild(t.rightControl);
                    break;
                }
        }
        t.rightControl = document.createElement('div');
        t.rightControl.className = 'chronoline-right';
        t.rightControl.style.marginTop = t.topMargin + 'px';

        var rightIcon = document.createElement('div');
        rightIcon.className = 'chronoline-right-icon';
        t.rightControl.appendChild(rightIcon);
        t.wrapper.appendChild(t.rightControl);
        t.rightControl.style.height = t.leftControl.style.height;
        rightIcon.style.marginTop = leftIcon.style.marginTop;

        t.scrollLeftDiscrete = function(e){
            t.goToDate(t.scrollLeft(new Date(t.pxToMs(-getLeft(t.paperElem)))), -1);
            return false;
        };

        t.scrollRightDiscrete = function(e){
            t.goToDate(t.scrollRight(new Date(t.pxToMs(-getLeft(t.paperElem)))), -1);
            return false;
        };

        // continuous scroll
        // left and right are pretty much the same but need to be flipped
        if(t.continuousScroll){
            t.isScrolling = false;
            t.timeoutId = -1;

            t.scrollLeftContinuous = function(timestamp){
                if(t.scrollStart === null)
                    t.scrollStart = timestamp;
                if(t.isScrolling){
                    requestAnimationFrame(t.scrollLeftContinuous);
                }
                var finalLeft = t.continuousScrollSpeed * (timestamp - t.scrollStart) + t.scrollPaperStart;
                t.goToPx(finalLeft, false, finalLeft > - t.msToPx(t.drawnStartMs));
            };

            t.endScrollLeft = function(e){
                clearTimeout(t.scrollTimeoutId);
                if(t.toScrollDiscrete){
                    t.toScrollDiscrete = false;
                    t.scrollLeftDiscrete();
                }
                t.isScrolling = false;
            };

            t.leftControl.onmousedown = function(e){
                t.toScrollDiscrete = true;
                t.scrollPaperStart = getLeft(t.paperElem);
                t.scrollTimeoutId = setTimeout(function(){
                    t.toScrollDiscrete = false;  // switched is flipped
                    t.scrollStart = null;
                    t.isScrolling = true;  // whether it's currently moving
                    requestAnimationFrame(t.scrollLeftContinuous);
                }, 200);
            };
            t.leftControl.onmouseup = t.endScrollLeft;
            t.leftControl.onmouseleave = t.endScrollLeft;


            t.scrollRightContinuous = function(timestamp){
                if(t.scrollStart === null)
                    t.scrollStart = timestamp;
                if(t.isScrolling){
                    requestAnimationFrame(t.scrollRightContinuous);
                }
                var finalLeft = t.continuousScrollSpeed * (t.scrollStart - timestamp) + t.scrollPaperStart;
                t.goToPx(finalLeft, false, finalLeft - t.visibleWidth < - t.msToPx(t.drawnEndMs));
            };

            t.endScrollRight = function(e){
                clearTimeout(t.scrollTimeoutId);
                if(t.toScrollDiscrete){
                    t.toScrollDiscrete = false;
                    t.scrollRightDiscrete();
                }
                t.isScrolling = false;
            };

            t.rightControl.onmousedown = function(e){
                t.toScrollDiscrete = true;
                t.scrollPaperStart = getLeft(t.paperElem);
                t.scrollTimeoutId = setTimeout(function(){
                    t.toScrollDiscrete = false;  // switched is flipped
                    t.scrollStart = null;
                    t.isScrolling = true;  // whether it's currently moving
                    requestAnimationFrame(t.scrollRightContinuous);
                }, 500);
            };
            t.rightControl.onmouseup = t.endScrollRight;
            t.rightControl.onmouseleave = t.endScrollRight;

        } else {  // just hook up discrete scrolling
            t.leftControl.onclick = t.scrollLeftDiscrete;
            t.rightControl.onclick = t.scrollRightDiscrete;
        }
    };

    t.initDraggable = function() {
        // i'm not using raphael.js built-in dragging since this is for the entire canvas
        // also, i didn't see that function before I wrote this
        // using jQuery to get mouseleave to work cross-browser
        t.stopDragging = function(e){
            jQuery(t.wrapper).removeClass('dragging')
                .unbind('mousemove', t.mouseMoved)
                .unbind('mouseleave', t.stopDragging)
                .unbind('mouseup', t.stopDragging);
            t.drawLabels(-getLeft(t.paperElem));
        };

        t.mouseMoved = function(e){
            t.goToPx(t.dragPaperStart - (t.dragMouseStart - e.pageX), false, false);
        };

        t.wrapper.className += ' chronoline-draggable';
        jQuery(t.paperElem).mousedown(function(e){
            e.preventDefault();
            t.dragMouseStart = e.pageX;
            t.dragPaperStart = getLeft(t.paperElem);
            jQuery(t.wrapper).addClass('dragging')
                .bind('mousemove', t.mouseMoved)
                .bind('mouseleave', t.stopDragging)
                .bind('mouseup', t.stopDragging);
        });
    };

    t.goToToday = function(){
        // scrolls to put today in the middle
        t.goToDate(t.today, 0);
    };

    t.getLeftTime = function(){
        // gets the time (ms) of the left edge of the visible area
        return Math.floor(t.startTime - getLeft(t.paperElem) / t.pxRatio);
    };

    t.getRightTime = function(){
        // gets the time (ms) of the right edge of the visible area
        return Math.floor(t.startTime - (getLeft(t.paperElem) - t.visibleWidth) / t.pxRatio);
    };


    /*****************************************/
    /****** actual Initilization ********************/

    //refresh the timeline
    //sanitizes t attributes that may have been updated.
    //calls init to redraw the canvas
    t.refresh = function(){
        preInit();
        t.init();
        return t;
    };

    //intilize the control and return
    paramVal();//sanitize parameters
    setAttrDefaults();//initilize t's attributes, sets default values
    preInit();//sanitizes t's attributes
    t.init();//initilize the timline canvas
    return t;
}
