_hyperscript.config.hideShowStrategies = {
    twDisplay: function (op, element, arg) {
        if (op === "toggle") {
            if (element.classList.contains("hidden")) {
                _hyperscript.config.hideShowStrategies.twDisplay("show", element, arg);
            } else {
                _hyperscript.config.hideShowStrategies.twDisplay("hide", element, arg);
            }
        } else if (op === "hide") {
            element.classList.add('hidden');
        } else {
            element.classList.remove('hidden');
        }
    },

    twVisibility: function (op, element, arg) {
        if (op === "toggle") {
            if (element.classList.contains("invisible")) {
                _hyperscript.config.hideShowStrategies.twVisibility("show", element, arg);
            } else {
                _hyperscript.config.hideShowStrategies.twVisibility("hide", element, arg);
            }
        } else if (op === "hide") {
            element.classList.add('invisible');
        } else {
            element.classList.remove('invisible');
        }
    },
    
    twOpacity: function (op, element, arg) {
        if (op === "toggle") {
            if (element.classList.contains("opacity-0")) {
                _hyperscript.config.hideShowStrategies.twOpacity("show", element, arg);
            } else {
                _hyperscript.config.hideShowStrategies.twOpacity("hide", element, arg);
            }
        } else if (op === "hide") {
            element.classList.add('opacity-0');
        } else {
            element.classList.remove('opacity-0');
        }
    }
};