/*
 * ProgressCircle.js
 * http://qiao.github.io/ProgressCircle.js/
 *
 * © 2011-2013 Xueqiao Xu <xueqiaoxu@gmail.com>

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function(window, document, undefined) {

    /**
     * Find the absolute position of an element
     */
    var absPos = function(element) {
        var offsetLeft, offsetTop;
        offsetLeft = offsetTop = 0;
        if (element.offsetParent) {
            do {
                offsetLeft += element.offsetLeft;
                offsetTop += element.offsetTop;
            } while ((element = element.offsetParent) !== null);
        }
        return [offsetLeft, offsetTop];
    };

    /**
     * @constructor Progress Circle class
     * @param params.canvas Canvas on which the circles will be drawn.
     * @param params.minRadius Inner radius of the innermost circle, in px.
     * @param params.arcWidth Width of each circle(to be more accurate, ring).
     * @param params.gapWidth Space between each circle.
     * @param params.centerX X coordinate of the center of circles.
     * @param params.centerY Y coordinate of the center of circles.
     * @param params.infoLineBaseAngle Base angle of the info line.
     * @param params.infoLineAngleInterval Angles between the info lines.
     */
    var ProgressCircle = function(params) {
        this.canvas = params.canvas;
        this.minRadius = params.minRadius || 15;
        this.arcWidth = params.arcWidth || 5;
        this.gapWidth = params.gapWidth || 3;
        this.centerX = params.centerX || this.canvas.width / 2;
        this.centerY = params.centerY || this.canvas.height / 2;
        this.infoLineLength = params.infoLineLength || 60;
        this.horizLineLength = params.horizLineLength || 10;
        this.infoLineAngleInterval = params.infoLineAngleInterval || Math.PI / 8;
        this.infoLineBaseAngle = params.infoLineBaseAngle || Math.PI / 6;

        this.context = this.canvas.getContext('2d');

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.circles = [];
        this.runningCount = 0;
    };

    ProgressCircle.prototype = {
        constructor: ProgressCircle,

        /**
         * @method Adds an progress monitor entry.
         * @param params.fillColor Color to fill in the circle.
         * @param params.outlineColor Color to outline the circle.
         * @param params.progressListener Callback function to fetch the progress.
         * @param params.infoListener Callback function to fetch the info.
         * @returns this
         */
        addEntry: function(params) {
            this.circles.push(new Circle({
                canvas: this.canvas,
                context: this.context,
                centerX: this.centerX,
                centerY: this.centerY,
                innerRadius: this.minRadius + this.circles.length *
                    (this.gapWidth + this.arcWidth),
                arcWidth: this.arcWidth,
                infoLineLength: this.infoLineLength,
                horizLineLength: this.horizLineLength,

                id: this.circles.length,
                fillColor: params.fillColor,
                outlineColor: params.outlineColor,
                progressListener: params.progressListener,
                infoListener: params.infoListener,
                infoLineAngle: this.infoLineBaseAngle +
                    this.circles.length * this.infoLineAngleInterval,
            }));

            return this;
        },

        /**
         * @method Starts the monitor and updates with the given interval.
         * @param interval Interval between updates, in millisecond.
         * @returns this
         */
        start: function(interval) {
            var self = this;
            this.timer = setInterval(function() {
                self._update();
            }, interval || 33);

            return this;
        },

        /**
         * @method Stop the animation.
         */
        stop: function() {
            clearTimeout(this.timer);
        },

        /**
         * @private
         * @method Call update on each circle and redraw them.
         * @returns this
         */
        _update: function() {
            this._clear();
            this.circles.forEach(function(circle) {
                circle.update();
            });

            return this;
        },

        /**
         * @private
         * @method Clear the canvas.
         * @returns this
         */
        _clear: function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            return this;
        },

    };

    /**
     * @private
     * @class Individual progress circle.
     * @param params.canvas Canvas on which the circle will be drawn.
     * @param params.context Context of the canvas.
     * @param params.innerRadius Inner radius of the circle, in px.
     * @param params.arcWidth Width of each arc(circle).
     * @param params.gapWidth Distance between each arc.
     * @param params.centerX X coordinate of the center of circles.
     * @param params.centerY Y coordinate of the center of circles.
     * @param params.fillColor Color to fill in the circle.
     * @param params.outlineColor Color to outline the circle.
     * @param params.progressListener Callback function to fetch the progress.
     * @param params.infoListener Callback function to fetch the info.
     * @param params.infoLineAngle Angle of info line.
     */
    var Circle = function(params) {
        this.id = params.id;
        this.canvas = params.canvas;
        this.context = params.context;
        this.centerX = params.centerX;
        this.centerY = params.centerY;
        this.arcWidth = params.arcWidth;
        this.innerRadius = params.innerRadius || 0;
        this.fillColor = params.fillColor || '#fff';
        this.outlineColor = params.outlineColor || this.fillColor;
        this.progressListener = params.progressListener;
        this.infoLineLength = params.infoLineLength || 250;
        this.horizLineLength = params.horizLineLength || 50;
        this.infoListener = params.infoListener;
        this.infoLineAngle = params.infoLineAngle;

        this.outerRadius = this.innerRadius + this.arcWidth;

        // If the info listener is not registered, then don't calculate
        // the related coordinates
        if (!this.infoListener) return;

        // calculate the info-line turning points
        var angle = this.infoLineAngle,
            arcDistance = (this.innerRadius + this.outerRadius) / 2,

            sinA = Math.sin(angle),
            cosA = Math.cos(angle);

        this.infoLineStartX = this.centerX + sinA * arcDistance;
        this.infoLineStartY = this.centerY - cosA * arcDistance;

        this.infoLineMidX = this.centerX + sinA * this.infoLineLength;
        this.infoLineMidY = this.centerY - cosA * this.infoLineLength;

        this.infoLineEndX = this.infoLineMidX +
             (sinA < 0 ? -this.horizLineLength : this.horizLineLength);
        this.infoLineEndY = this.infoLineMidY;

        var infoText = document.createElement('div'),
            style = infoText.style;

        style.color = this.fillColor;
        style.position = 'absolute';
        style.left = this.infoLineEndX + absPos(this.canvas)[0] + 'px';
        // style.top will be calculated in the `drawInfo` method. Since
        // user may want to change the size of the font, so the top offset
        // must be updated in each loop.
        infoText.className = 'ProgressCircleInfo'; // For css styling
        infoText.id = 'progress_circle_info_' + this.id;
        document.body.appendChild(infoText);
        this.infoText = infoText;
    };

    Circle.prototype = {
        constructor: Circle,

        update: function() {
            this.progress = this.progressListener();
            this._draw();

            if (this.infoListener) {
                this.info = this.infoListener();
                this._drawInfo();
            }
        },

        /**
         * @private
         * @method Draw the circle on the canvas.
         * @returns this
         */
        _draw: function() {
            var ctx = this.context,

                ANGLE_OFFSET = -Math.PI / 2,

                startAngle = 0 + ANGLE_OFFSET,
                endAngle= startAngle + this.progress * Math.PI * 2,

                x = this.centerX,
                y = this.centerY,

                innerRadius = this.innerRadius,
                outerRadius = this.outerRadius;

            ctx.fillStyle = this.fillColor;
            ctx.strokeStyle = this.outlineColor;

            ctx.beginPath();
            ctx.arc(x, y, innerRadius, startAngle, endAngle, false);
            ctx.arc(x, y, outerRadius, endAngle, startAngle, true);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            return this;
        },

        /**
         * @private
         * @method Draw the info lines and info text.
         * @returns this
         */
        _drawInfo: function() {

            var pointList, lineHeight;

            pointList = [
                [this.infoLineStartX, this.infoLineStartY],
                [this.infoLineMidX, this.infoLineMidY],
                [this.infoLineEndX, this.infoLineEndY],
            ];
            this._drawSegments(pointList, false);

            this.infoText.innerHTML = this.info;

            lineHeight = this.infoText.offsetHeight;
            this.infoText.style.top = this.infoLineEndY +
                absPos(this.canvas)[1] - lineHeight / 2 + 'px';

            return this;
        },

        /**
         * @private
         * @method Helper function to draw the segments
         * @param pointList An array of points in the form of [x, y].
         * @param close Whether to connect the first and last point.
         */
        _drawSegments: function(pointList, close) {
            var ctx = this.context;

            ctx.beginPath();
            ctx.moveTo(pointList[0][0], pointList[0][1]);
            for (var i = 1; i < pointList.length; ++i) {
                ctx.lineTo(pointList[i][0], pointList[i][1]);
            }

            if (close) {
                ctx.closePath();
            }
            ctx.stroke();
        },
    };

    window.ProgressCircle = ProgressCircle;

})(window, document);

;
// This file is generated by a build step. Edit src/theme.js instead and run `make js`

// Contains the JS source code for the Doony theme itself. This file is
// concatenated with other JS files into doony.js, and then minified into
// doony.min.js
jQuery(function($) {

    var colors = [
        '#C02942', // a red
        '#4ecdc4', // a bright green blue
        '#d95b43', // orange
        '#556270', // a slate color
        '#542437', // purple
        '#8fbe00', // lime yellow
    ];

    var Alert = {
        ERROR : "alert-danger",
        WARNING: "alert-warning"
    };

    var getSubdomain = function(domain) {
        if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(domain)) {
            // Looks like an IP address, so return as-is.
            return domain;
        }
        var parts = domain.split(".");
        if (parts.length <= 2) {
            return parts.join(".");
        } else {
            return parts.slice(0, -2).join(".");
        }
    };

    var hashCode = function(string) {
        var hash = 0, i, l, char;
        if (string.length === 0) return hash;
        for (i = 0, l = string.length; i < l; i++) {
            char  = string.charCodeAt(i);
            hash  = ((hash<<5)-hash)+char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    var isJobPage = function(path) {
        return path.match(/^\/job\/.*?\//) !== null;
    };

    /**
     * This is a little tricky because it needs to match either the homepage or
     * a page with configuration. The configuration check is for an equals sign
     * in the 3rd part of the URL
     */
    var isJobHomepage = function(path) {
        return path.match(/^\/job\/.*?\/(.*?=.*?\/)?$/) !== null;
    };

    var isRootHomepage = function(path) {
        return path.match(/^\/job\/.*?\/$/) !== null;
    };

    var getRootJobUrl = function(path) {
        return path.match(/^\/job\/.*?\//)[0];
    };

    // note: this function assumes you're already on a job page
    var getJobUrl = function(path) {
        return path.match(/^\/job\/.*?\/(.*?=.*?\/)?/)[0];
    };

    var redirectForUrl = function(jobUrl, buildNumber) {
        $.getJSON(jobUrl + 'api/json?tree=builds[number]', function(data) {
            for (var i = 0; i < data.builds.length; i++) {
                var build = data.builds[i];
                if (build.number === buildNumber) {
                    window.location.href = jobUrl + buildNumber + '/consoleFull';
                }
            }
            // gone all the way through and it's not there, sleep for a minute
            // and try again.
            setTimeout(function() {
                redirectForUrl(jobUrl, buildNumber);
            }, 1000);
        });
    };

    var redirectToNewJobConsole = function(jobUrl, buildNumber) {
        if (isRootHomepage(jobUrl)) {
            $.getJSON(jobUrl + 'api/json?tree=activeConfigurations[name]', function(data) {
                if (JSON.stringify(data) !== "{}" && 'activeConfigurations' in data) {
                    // If its a multi configuration, just pick the first one.
                    // This works for us, might have to make this configurable
                    // somehow.
                    var downstreamUrl = jobUrl + data.activeConfigurations[0].name + '/';
                    return redirectForUrl(downstreamUrl, buildNumber);
                } else {
                    return redirectForUrl(jobUrl, buildNumber);
                }
            });
        } else {
            return redirectForUrl(jobUrl, buildNumber);
        }
    };

    var showButterBar = function(message, alertName) {
        var div = document.createElement('div');
        div.className = 'alert doony-alert ' + alertName;
        div.innerHTML = message;
        $("#main-panel").prepend(div);
    };

    var doonyTitleLink = $("#top-panel a").first();
    var domain = getSubdomain(window.location.hostname);
    doonyTitleLink.html("<div id='doony-title'>" + domain + "</div>");

    var color = colors[Math.abs(hashCode(domain)) % colors.length];
    $("#top-panel").css('background-color', color);

    // Remove icons from the left hand menu and strip nbsp's
    $(".task").each(function() {
        $("a img", $(this)).remove();
        $(this).html(function(_, oldHtml) {
            var replaced = oldHtml.replace(/&nbsp;/g, "", "g");
            return replaced;
        });
    });

    // build a callout
    var getCallout = function(message, href) {
        return "<div class='doony-callout doony-callout-info'><a " +
            (href === null ? "" : "href='" + href + "'") + ">" + message +
            "</a></div>";
    };

    // xxx combine this with the getCallout below
    var updateConfiguration = function(jobUrl, name) {
        $.getJSON(jobUrl + name + 'api/json?tree=lastBuild[number]', function(data) {
            if (data.lastBuild !== null && 'number' in data.lastBuild) {
                $("#matrix .model-link").each(function(_, item) {
                    if (item.getAttribute('href') === name) {
                        var href = jobUrl + name + data.lastBuild.number + '/consoleFull';
                        $(item).next(".doony-callout").children("a").attr('href', href);
                    }
                });
            }
        });
    };

    if ($("#matrix").length) {
        // for some stupid reason jenkins fetches this with ajax so we need to
        // setinterval here to continue to retrieve it all the time
        setInterval(function() {
            var jobUrl = getJobUrl(window.location.pathname);
            if ($("#matrix .doony-downstream-link").length) {
                // already updated this matrix div
                return;
            }
            $("#matrix .model-link").wrap("<div class='doony-downstream-link'>");
            // Create the div, even though we don't have the HREF yet, so the
            // UI looks consistent
            $("#matrix .model-link").each(function(_, item) {
                var message = "View console output for the latest build";
                $(item).after(getCallout(message, null));
            });
            $.getJSON(jobUrl + 'api/json?tree=activeConfigurations[name]', function(data) {
                for (var i = 0; i < data.activeConfigurations.length; i++) {
                    var config = data.activeConfigurations[i];
                    updateConfiguration(jobUrl, config.name + '/');
                }
            });
        }, 50);
    }

    // Replace the floaty ball with a better icon
    // XXX make the icon really good
    var replaceFloatyBall = function(selector, type) {
        $(selector).each(function() {
            var wrapper = document.createElement('div');
            wrapper.className = 'doony-circle doony-circle-' + type;
            wrapper.style.display = 'inline-block';
            var dimension;
            if (this.getAttribute('width') === "48" || this.getAttribute('width') === "24") {
                // an overly large ball is scary
                dimension = this.getAttribute('width') * 0.5 + 8;
                wrapper.style.marginRight = "15px";
                wrapper.style.verticalAlign = "middle";
            // XXX hack, this is for the main page job list
            } else if (this.classList.contains("icon32x32")) {
                dimension = 24;
                wrapper.style.marginTop = "4px";
                wrapper.style.marginLeft = "4px";
            } else {
                dimension = this.getAttribute('width') || 12;
            }
            $(wrapper).css('width', dimension);
            $(wrapper).css('height', dimension);

            $(this).after(wrapper).remove();
        });
    };

    var replaceBouncingFloatyBall = function(selector, color) {
        $(selector).each(function() {

            if ($(this).next(".doony-canvas").length) {
                return;
            }
            var canvas = document.createElement('canvas');
            canvas.className = 'doony-canvas';

            // 48 -> dimension 32.
            // radius should be 12, plus 4 width
            // 16 -> dimension 16, radius 4
            var dimension;
            if (this.getAttribute('width') === "48" || this.getAttribute('width') === "24") {
                // an overly large ball is scary
                dimension = this.getAttribute('width') * 0.5 + 8;
                canvas.style.marginRight = "15px";
                canvas.style.verticalAlign = "middle";
            // XXX hack, this is for the main page job list
            } else if (this.classList.contains("icon32x32")) {
                dimension = 24;
                canvas.style.marginTop = "4px";
                canvas.style.marginLeft = "4px";
            } else {
                dimension = this.getAttribute('width') || 12;
            }
            canvas.setAttribute('width', dimension);
            canvas.setAttribute('height', dimension);

            var circle = new ProgressCircle({
                canvas: canvas,
                minRadius: dimension * 3 / 8 - 2,
                arcWidth: dimension / 8 + 1
            });

            var x = 0;
            circle.addEntry({
                fillColor: color,
                progressListener: function() {
                    if (x >= 1) { x = 0; }
                    x = x + 0.005;
                    return x; // between 0 and 1
                },
            });
            // jenkins does ajax every 5 seconds, this should time it perfectly
            circle.start(24);
            $(this).after(canvas).css('display', 'none');
        });
    };

    var green = '#4f9f4f';
    setInterval(function() {
        replaceBouncingFloatyBall("img[src*='red_anime.gif']", '#d9534f');
        replaceBouncingFloatyBall("img[src*='blue_anime.gif']", green);
        replaceBouncingFloatyBall("img[src*='grey_anime.gif']", '#999');
        replaceBouncingFloatyBall("img[src*='aborted_anime.gif']", '#999');
        replaceBouncingFloatyBall("img[src*='yellow_anime.gif']", '#f0ad4e');
    }, 10);
    setInterval(function() {
        replaceFloatyBall("img[src*='/grey.png']", "aborted");
        replaceFloatyBall("img[src*='/aborted.png']", "aborted");
        replaceFloatyBall("img[src*='/blue.png']", "success");
        replaceFloatyBall("img[src*='/red.png']", "failure");
        replaceFloatyBall("img[src*='/yellow.png']", "warning");
    }, 10);

    if (isJobHomepage(window.location.pathname)) {
        var jobUrl = getJobUrl(window.location.pathname);
        $.getJSON(jobUrl + 'api/json?tree=lastBuild[number]', function(data) {
            if (!('lastBuild' in data) || data.lastBuild === null || !('number' in data.lastBuild)) {
                return;
            }
            var message = "View console output for the latest build";
            var href = jobUrl + data.lastBuild.number + '/consoleFull';
            var h2 = $("h2:contains('Permalinks')");
            h2.after(getCallout(message, href));
        });
    }

    if (isJobPage(window.location.pathname)) {
        var button = document.createElement('button');
        button.className = "btn btn-primary doony-build";
        button.innerHTML = "Build Now";
        $(button).click(function() {
            var jobUrl = getRootJobUrl(window.location.pathname);
            // The build post endpoint doesn't tell you the number of the next
            // build, so get it before we create a build.
            $.getJSON(jobUrl + 'api/json?depth=1&tree=nextBuildNumber,lastBuild[building]', function(data) {
                $.post(jobUrl + 'build', function() {
                    // in case there's an immediate redirect, don't show the
                    // bar.
                    var message = "Build #" + data.nextBuildNumber + " created, you will be redirected when it is ready.";
                    if (JSON.stringify(data) !== "{}" &&
                        'lastBuild' in data &&
                        data.lastBuild !== null &&
                        data.lastBuild.building
                    ) {
                        message += " <a href='#' id='doony-clear-build'>Cancel the current build</a>";
                    }
                    showButterBar(message, Alert.WARNING);
                    redirectToNewJobConsole(getJobUrl(window.location.pathname),
                        data.nextBuildNumber);
                }).fail(function(jqXHR) {
                    if (jqXHR.status === 403) {
                        showButterBar("Cannot create build. Maybe you need to log in or have the 'build' permission.", Alert.ERROR);
                    } else {
                        showButterBar("An error occured. Please try again.", Alert.ERROR);
                    }
                });
            });
        });

        $(document).on('click', '#doony-clear-build', function(e) {
            e.preventDefault();
            var jobUrl = getRootJobUrl(window.location.pathname);
            $.getJSON(jobUrl + 'api/json?tree=lastBuild[number]', function(data) {
                $.post(jobUrl + data.lastBuild.number + '/stop');
            });
        });

        var title = $("#main-panel h1").first();
        if (title.children("div").length) {
            title.append(button);
        } else {
            title.css('display', 'inline-block');
            title.after(button);
        }
    }

    $("#l10n-footer").after("<span class='doony-theme'>Browsing Jenkins with " +
        "the <a target='_blank' href='https://github.com/kevinburke/doony'>" +
        "Doony theme</a></span>");
});
