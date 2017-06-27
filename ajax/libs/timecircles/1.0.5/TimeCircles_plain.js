// Regular JS version
function TimeCircles(targetElementId) {
    if (typeof targetElementId !== "string") {
        console.error("First parameter must be ID of target element");
        return false;
    }
    var targetElement = document.getElementById(targetElementId);
    if (targetElement === null) {
        console.error("Unable to find Element with target ID");
        return false;
    }

    /* Start of config and parameters set up */

    var refDate, user_config;
    for (var i = 1; i < arguments.length; i++) {
        if (typeof arguments[i] === "object") {
            if (arguments[i] instanceof Date)
                refDate = arguments[i];
            else
                user_config = arguments[i];
        }
    }

    // Default config
    var config = {
        refresh_interval: 0.1,
        count_past_zero: !(typeof refDate === "object" && refDate instanceof Date),
        circle_bg_color: "#60686F",
        days_color: "#FC6",
        hours_color: "#9CF",
        minutes_color: "#BFB",
        seconds_color: "#F99",
        use_background: true,
        fg_width: 0.1,
        bg_width: 1.2,
        text: {
            Days: "Days",
            Hours: "Hours",
            Minutes: "Minutes",
            Seconds: "Seconds"
        }
    };
    if (!(typeof refDate === "object" && refDate instanceof Date)) {
        refDate = new Date();
    }

    // Overwrite default with user settings
    function load_user_config(user_config, param_config) {
        // No config is passed on the base iteration
        if (typeof param_config === "undefined") {
            param_config = config;
        }

        for (var key in user_config) {
            if (typeof param_config[key] === "undefined") {
                // Invalid
                console.error('Unknown setting:', key, user_config[key]);
            }
            else if (typeof param_config[key] === "object" && typeof user_config[key] === "object") {
                // Recursion
                param_config[key] = load_user_config(user_config[key], param_config[key]);
            }
            else {
                param_config[key] = user_config[key];
            }
        }
        return param_config;
    }
    if (typeof user_config === "object")
        config = load_user_config(user_config);

    /* End of config and parameters set up */

    /* Setting up contents of target Element */

    var container = document.createElement('div');
    container.classList.add('time_circles');

    targetElement.appendChild(container);
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.height = container.offsetHeight;
    canvas.width = container.offsetWidth;
    container.appendChild(canvas);

    var itemSize = Math.min(canvas.width / 4, canvas.height);
    var lineWidth = itemSize * config.fg_width;
    var radius = ((itemSize * 0.8) - lineWidth) / 2;
    var outerRadius = radius + 0.5 * Math.max(lineWidth, lineWidth * config.bg_width);

    // Prepare Time Elements
    var textElements = {};
    var types = ['Days', 'Hours', 'Minutes', 'Seconds'];
    for (var i in types) {
        var headerElement = document.createElement('h4');
        headerElement.innerText = config.text[types[i]]; // Options
        var numberElement = document.createElement('span');

        var textElement = document.createElement('div');
        textElement.className = 'textDiv_' + types[i];
        textElement.appendChild(headerElement);
        textElement.appendChild(numberElement);
        textElement.style.top = Math.round(0.35 * itemSize) + 'px';
        textElement.style.left = Math.round(i * itemSize) + 'px';
        textElement.style.width = itemSize + 'px';
        textElement.style.fontSize = Math.round(0.07 * itemSize) + 'px';
        textElement.style.lineHeight = Math.round(0.07 * itemSize) + 'px';
        container.appendChild(textElement);

        textElements[types[i]] = textElement;
    }

    /* Finished setting up contents of target Element */

    /* Set up functionality of Timer circles */

    function drawArc(x, y, color, pct) {
        context.clearRect(x - outerRadius, y - outerRadius, outerRadius * 2, outerRadius * 2);

        if (config.use_background) {
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI, counterClockwise);
            context.lineWidth = lineWidth * config.bg_width;

            // line color
            context.strokeStyle = config.circle_bg_color;
            context.stroke();
        }

        var startAngle = (-0.5 * Math.PI);
        var endAngle = (-0.5 * Math.PI) + (2 * pct * Math.PI);
        var counterClockwise = false;

        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        context.lineWidth = lineWidth;

        // line color
        context.strokeStyle = color;
        context.stroke();
    }

    function updateArc() {
        var diff;
        if (config.count_past_zero) {
            diff = Math.abs(refDate - new Date()) / 1000;
        }
        else {
            diff = Math.max((refDate - new Date()) / 1000, 0);
        }

        var sec = diff % 60;
        var min = (diff / 60) % 60;
        var hrs = (diff / 60 / 60) % 24;
        var days = (diff / 60 / 60 / 24);

        drawArc((3 * itemSize) + (itemSize / 2), itemSize / 2, config.seconds_color, sec / 60);
        drawArc((2 * itemSize) + (itemSize / 2), itemSize / 2, config.minutes_color, min / 60);
        drawArc((1 * itemSize) + (itemSize / 2), itemSize / 2, config.hours_color, hrs / 24);
        drawArc((0 * itemSize) + (itemSize / 2), itemSize / 2, config.days_color, days / 365);

        var values = [days, hrs, min, sec];
        for (var i in types) {
            textElements[types[i]].getElementsByTagName('span')[0].textContent = Math.floor(values[i]);
        }
    }

    /* Completed functionality of timer circles */

    // Start
    var interval = setInterval(updateArc, config.refresh_interval * 1000);
}