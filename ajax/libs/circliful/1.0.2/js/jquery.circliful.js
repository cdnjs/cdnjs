"use strict";

(function ($) {

    $.fn.circliful = function (options, callback) {

        var settings = $.extend({
            // These are the defaults.
            //startDegree: 0,
            foregroundColor: "#3498DB",
            backgroundColor: "#ccc",
            pointColor: "none",
            fillColor: 'none',
            foregroundBorderWidth: 15,
            backgroundBorderWidth: 15,
            pointSize: 28.5,
            fontColor: '#aaa',
            percent: 75,
            animation: 1,
            animationStep: 5,
            icon: 'none',
            iconSize: '30',
            iconColor: '#ccc',
            iconPosition: 'top',
            target: 0,
            start: 0,
            showPercent: 1,
            percentageTextSize: 22,
            textAdditionalCss: '',
            targetPercent: 0,
            targetTextSize: 17,
            targetColor: '#2980B9',
            text: null,
            textStyle: null,
            textColor: '#666',
            multiPercentage: 0,
            percentages: null,
            textBelow: false,
            noPercentageSign: false,
            replacePercentageByText: null,
            halfCircle: false
        }, options);

        return this.each(function () {
            var circleContainer = $(this);
            var percent = settings.percent;
            var iconY = 83;
            var iconX = 100;
            var textY = 110;
            var textX = 100;
            var additionalCss;
            var elements;
            var icon;
            var backgroundBorderWidth = settings.backgroundBorderWidth;

            if(settings.halfCircle) {
                if(settings.iconPosition == 'left') {
                    iconX = 80;
                    iconY = 100;
                    textX = 117;
                    textY = 100;
                } else if(settings.halfCircle) {
                    iconY = 80;
                    textY = 100;
                }
            } else {
                if (settings.iconPosition == 'bottom') {
                    iconY = 124;
                    textY = 95;
                } else if (settings.iconPosition == 'left') {
                    iconX = 80;
                    iconY = 110;
                    textX = 117;
                } else if (settings.iconPosition == 'middle') {
                    if (settings.multiPercentage == 1) {
                        if (typeof settings.percentages == "object") {
                            backgroundBorderWidth = 30;
                        } else {
                            iconY = 110;
                            elements = '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="133" y1="50" x2="140" y2="40" stroke-width="2"  /></g>';
                            elements += '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="140" y1="40" x2="200" y2="40" stroke-width="2"  /></g>';
                            textX = 228;
                            textY = 47;
                        }
                    } else {
                        iconY = 110;
                        elements = '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="133" y1="50" x2="140" y2="40" stroke-width="2"  /></g>';
                        elements += '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="140" y1="40" x2="200" y2="40" stroke-width="2"  /></g>';
                        textX = 175;
                        textY = 35;
                    }
                } else if (settings.iconPosition == 'right') {
                    iconX = 120;
                    iconY = 110;
                    textX = 80;
                }
            }

            if(settings.targetPercent > 0) {
                textY = 95;
                elements = '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="75" y1="101" x2="125" y2="101" stroke-width="1"  /></g>';
                elements += '<text text-anchor="middle" x="' + textX + '" y="120" style="font-size: ' + settings.targetTextSize + 'px;" fill="' + settings.targetColor + '">' + settings.targetPercent + (settings.noPercentageSign && settings.replacePercentageByText == null ? '' : '%') + '</text>';
                elements += '<circle cx="100" cy="100" r="69" fill="none" stroke="' + settings.backgroundColor + '" stroke-width="3" stroke-dasharray="450" transform="rotate(-90,100,100)" />';
                elements += '<circle cx="100" cy="100" r="69" fill="none" stroke="' + settings.targetColor + '" stroke-width="3" stroke-dasharray="' + (360 / 100 * settings.targetPercent) + ', 20000" transform="rotate(-90,100,100)" />';
            }

            if (settings.text != null){
                if(settings.halfCircle) {
                    if (settings.textBelow){
                        elements += '<text text-anchor="middle" x="100" y="120" style="' + settings.textStyle + '" fill="' + settings.textColor + '">' + settings.text + '</text>';
                    }
                    else if (settings.multiPercentage == 0){
                        elements += '<text text-anchor="middle" x="100" y="115" style="' + settings.textStyle + '" fill="' + settings.textColor + '">' + settings.text + '</text>';
                    }
                    else if(settings.multiPercentage == 1) {
                        elements += '<text text-anchor="middle" x="228" y="65" style="' + settings.textStyle + '" fill="' + settings.textColor + '">' + settings.text + '</text>';
                    }
                } else {
                    if (settings.textBelow){
                        elements += '<text text-anchor="middle" x="100" y="190" style="' + settings.textStyle + '" fill="' + settings.textColor + '">' + settings.text + '</text>';
                    }
                    else if (settings.multiPercentage == 0){
                        elements += '<text text-anchor="middle" x="100" y="115" style="' + settings.textStyle + '" fill="' + settings.textColor + '">' + settings.text + '</text>';
                    }
                    else if(settings.multiPercentage == 1) {
                        elements += '<text text-anchor="middle" x="228" y="65" style="' + settings.textStyle + '" fill="' + settings.textColor + '">' + settings.text + '</text>';
                    }
                }
            }

            if (settings.icon != 'none') {
                icon = '<text text-anchor="middle" x="' + iconX + '" y="' + iconY + '" class="icon" style="font-size: ' + settings.iconSize + 'px" fill="' + settings.iconColor + '">&#x' + settings.icon + '</text>';
            }

            if(settings.halfCircle) {
                var rotate = 'transform="rotate(-180,100,100)"';
                circleContainer
                    .addClass('svg-container')
                    .append(
                        $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 194 186" class="circliful">' +
                            elements +
                            '<clipPath id="cut-off-bottom"> <rect x="100" y="0" width="100" height="200" /> </clipPath>' +
                            '<circle cx="100" cy="100" r="57" class="border" fill="' + settings.fillColor + '" stroke="' + settings.backgroundColor + '" stroke-width="' + backgroundBorderWidth + '" stroke-dasharray="360" clip-path="url(#cut-off-bottom)" transform="rotate(-90,100,100)" />' +
                            '<circle class="circle" cx="100" cy="100" r="57" class="border" fill="none" stroke="' + settings.foregroundColor + '" stroke-width="' + settings.foregroundBorderWidth + '" stroke-dasharray="0,20000" ' + rotate + ' />' +
                            '<circle cx="100" cy="100" r="' + settings.pointSize + '" fill="' + settings.pointColor + '" clip-path="url(#cut-off-bottom)" transform="rotate(-90,100,100)" />' +
                            icon +
                            '<text class="timer" text-anchor="middle" x="' + textX + '" y="' + textY + '" style="font-size: ' + settings.percentageTextSize + 'px; ' + additionalCss + ';' + settings.textAdditionalCss + '" fill="' + settings.fontColor + '">'+ (settings.replacePercentageByText == null ? 0 : settings.replacePercentageByText) + (settings.noPercentageSign || settings.replacePercentageByText != null ? '' : '%') + '</text>')
                    );
            } else {
                circleContainer
                    .addClass('svg-container')
                    .append(
                        $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 194 186" class="circliful">' +
                            elements +
                            '<circle cx="100" cy="100" r="57" class="border" fill="' + settings.fillColor + '" stroke="' + settings.backgroundColor + '" stroke-width="' + backgroundBorderWidth + '" stroke-dasharray="360" transform="rotate(-90,100,100)" />' +
                            '<circle class="circle" cx="100" cy="100" r="57" class="border" fill="none" stroke="' + settings.foregroundColor + '" stroke-width="' + settings.foregroundBorderWidth + '" stroke-dasharray="0,20000" transform="rotate(-90,100,100)" />' +
                            '<circle cx="100" cy="100" r="' + settings.pointSize + '" fill="' + settings.pointColor + '" />' +
                            icon +
                            '<text class="timer" text-anchor="middle" x="' + textX + '" y="' + textY + '" style="font-size: ' + settings.percentageTextSize + 'px; ' + additionalCss + ';' + settings.textAdditionalCss + '" fill="' + settings.fontColor + '">'+ (settings.replacePercentageByText == null ? 0 : settings.replacePercentageByText) + (settings.noPercentageSign || settings.replacePercentageByText != null ? '' : '%') + '</text>')
                    );
            }

            var circle = circleContainer.find('.circle');
            var myTimer = circleContainer.find('.timer');
            var interval = 30;
            var angle = 0;
            var angleIncrement = settings.animationStep;
            var last = 0;
            var summary = 0;
            var oneStep = 0;
            var text = percent;
            var calculateFill = (360 / 100 * percent);

            if(settings.halfCircle) {
                calculateFill = (360 / 100 * percent) / 2;
            }

            if(settings.replacePercentageByText != null) {
                text = settings.replacePercentageByText;
            }

            if (settings.start > 0 && settings.target > 0) {
                percent = settings.start / (settings.target / 100);
                oneStep = settings.target / 100;
            }

            if (settings.animation == 1) {
                var timer = window.setInterval(function () {
                    if ((angle) >= calculateFill) {
                        window.clearInterval(timer);
                        last = 1;
                        if(typeof callback == 'function')
                        {
                            callback.call(this);
                        }
                    } else {
                        angle += angleIncrement;
                        summary += oneStep;
                    }

                    if (angle / 3.6 >= percent && last == 1) {
                        angle = 3.6 * percent;
                    }

                    if (summary > settings.target && last == 1) {
                        summary = settings.target;
                    }

                    if(settings.replacePercentageByText == null) {
                        if(settings.halfCircle) {
                            text = parseInt((100 * angle / 360) * 2);
                        } else {
                            text = parseInt((100 * angle / 360));
                        }
                    }

                    circle
                        .attr("stroke-dasharray", angle + ", 20000");

                    if (settings.showPercent == 1) {
                        myTimer
                            .text(text + (settings.noPercentageSign || settings.replacePercentageByText != null ? '' : '%'));
                    } else {
                        myTimer
                            .text(summary);
                    }

                }.bind(circle), interval);
            } else {
                circle
                    .attr("stroke-dasharray", calculateFill + ", 20000");

                if (settings.showPercent == 1) {
                    myTimer
                        .text(text + (settings.noPercentageSign ? '' : '%'));
                } else {
                    myTimer
                        .text(settings.target);
                }
            }
        });
    }
}(jQuery));
