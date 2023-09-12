
/**
 * (c) jSuites Javascript Web Components
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 *
 * MIT License
 *
 */

class JsuitesCalendar extends HTMLElement {
    constructor() {
        // always call super() first
        super();
    }

    init(o) {
        // Create element
        this.input = document.createElement('input');
        // Append to the DOM
        o.appendChild(this.input);
        // Place holder
        var placeholder = o.getAttribute('placeholder');
        // Place holder
        var format = o.getAttribute('format');
        // Place holder
        var time = o.getAttribute('time');
        // Initial value
        var value = o.getAttribute('value');
        if (value) {
            this.input.value = value;
            o.value = value;
        }
        // Component
        jSuites.calendar(this.input, {
            value: value ? value : null,
            placeholder: placeholder ? placeholder : null,
            format: format ? format : 'YYYY-MM-DD',
            time: time ? true : false,
            onchange: function(el, val) {
                // Change value of the element
                el.setAttribute('value', val);
                o.setAttribute('value', val);
                o.value = val;
                // Basic HTML event
                var s = o.getAttribute('onchange');
                if (s) {
                    eval(s);
                }
                // Trigger event
                var e = new CustomEvent("onchange");
                el.parentNode.dispatchEvent(e);
            },
            onclose: function(el) {
                // Basic HTML event
                var s = o.getAttribute('onclose');
                if (s) {
                    eval(s);
                }
                // Trigger event
                var e = new CustomEvent("onclose");
                el.parentNode.dispatchEvent(e);
            }
        });
    }

    connectedCallback() {
        if (! this.input) {
            this.init(this);
        }
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }
}

window.customElements.define('jsuites-calendar', JsuitesCalendar);

class JsuitesColor extends HTMLElement {
    constructor() {
        // always call super() first
        super();
    }

    init(o) {
        // Create element
        this.input = document.createElement('input');
        // Append to the DOM
        o.appendChild(this.input);
        // Place holder
        var placeholder = o.getAttribute('placeholder');
        // Initial value
        var value = o.getAttribute('value');
        if (value) {
            o.value = value;
        }
        // Component
        jSuites.color(this.input, {
            value: value ? value : null,
            placeholder: placeholder ? placeholder : null, 
            onchange: function(el, color) {
                // Change value of the element
                o.setAttribute('value', color);
                o.value = color;
                // Basic HTML event
                var s = o.getAttribute('onchange');
                if (s) {
                    eval(s);
                }
                // Trigger event
                var e = new CustomEvent("onchange");
                el.parentNode.dispatchEvent(e);
            },
            onclose: function(el) {
                // Basic HTML event
                var s = o.getAttribute('onclose');
                if (s) {
                    eval(s);
                }
                // Trigger event
                var e = new CustomEvent("onclose");
                el.parentNode.dispatchEvent(e);
            }
        });
    }

    connectedCallback() {
        if (! this.input) {
            this.init(this);
        }
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }
}

window.customElements.define('jsuites-color', JsuitesColor);

class JsuitesContextmenu extends HTMLElement {
    constructor() {
        // always call super() first
        super();
    }

    init(o) {
        this.el = jSuites.contextmenu(o, {
            items: null,
            onclick: function(a) {
                a.close();
            }
        });
    }

    connectedCallback() {
        if (! this.el) {
            this.init(this);
        }
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }
}

window.customElements.define('jsuites-contextmenu', JsuitesContextmenu);

class JsuitesEditor extends HTMLElement {
    constructor() {
        // always call super() first
        super();
    }

    init(o) {
        this.el = document.createElement('div');

        // Options
        var options = {};
        // Initial values
        var toolbar = o.getAttribute('toolbar');
        if (toolbar) {
            options.toolbar = toolbar;
        }

        // Events
        options.onload = function(el, obj) {
            // Basic HTML event
            var s = o.getAttribute('onload');
            if (s) {
                eval(s);
            }
            // Trigger event
            var e = new CustomEvent("onload");
            el.dispatchEvent(e);
        }

        options.onclick = function(el, obj) {
            // Basic HTML event
            var s = o.getAttribute('onclick');
            if (s) {
                eval(s);
            }
            // Trigger event
            var e = new CustomEvent("onclick");
            el.dispatchEvent(e);
        }

        options.onfocus = function(el, obj) {
            // Basic HTML event
            var s = o.getAttribute('onfocus');
            if (s) {
                eval(s);
            }
            // Trigger event
            var e = new CustomEvent("onfocus");
            el.dispatchEvent(e);
        }

        options.onblur = function(el, obj) {
            // Basic HTML event
            var s = o.getAttribute('onblur');
            if (s) {
                eval(s);
            }
            // Trigger event
            var e = new CustomEvent("onblur");
            el.dispatchEvent(e);
        }

        options.onclose = function(el, obj) {
            // Basic HTML event
            var s = o.getAttribute('onclose');
            if (s) {
                eval(s);
            }
            // Trigger event
            var e = new CustomEvent("onclose");
            el.dispatchEvent(e);
        }

        setTimeout(function() {
            jSuites.editor(o, options);
        }, 0);
    }

    connectedCallback() {
        if (! this.el) {
            this.init(this);
        }
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }
}

window.customElements.define('jsuites-editor', JsuitesEditor);

class JsuitesModal extends HTMLElement {
    constructor() {
        // always call super() first
        super();
    }

    init(o) {
        this.el = document.createElement('div');

        // Options
        var options = {};
        // Initial values
        var title = o.getAttribute('title');
        if (title) {
            options.title = title;
        }
        var width = o.getAttribute('width');
        if (width) {
            options.width = parseInt(width) + 'px';
        }
        var height = o.getAttribute('height');
        if (height) {
            options.height = parseInt(height) + 'px';
        }
        var closed = o.getAttribute('closed');
        if (closed) {
            options.closed = closed;
        }

        // Events
        options.onopen = function(el, obj) {
            // Basic HTML event
            var s = o.getAttribute('onopen');
            if (s) {
                eval(s);
            }
            // Trigger event
            var e = new CustomEvent("onopen");
            el.dispatchEvent(e);
        }

        options.onclose = function(el, obj) {
            // Basic HTML event
            var s = o.getAttribute('onclose');
            if (s) {
                eval(s);
            }
            // Trigger event
            var e = new CustomEvent("onclose");
            el.dispatchEvent(e);
        }

        setTimeout(function() {
            jSuites.modal(o, options);
        }, 0);
    }

    connectedCallback() {
        if (! this.el) {
            this.init(this);
        }
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }
}

window.customElements.define('jsuites-modal', JsuitesModal);

class JsuitesRating extends HTMLElement {
    constructor() {
        // always call super() first
        super();
    }

    init(o) {
        // Initial values
        var value = o.getAttribute('value') ? o.getAttribute('value') : null;
        var number = o.getAttribute('number') ? o.getAttribute('number') : 5;
        var tooltip = o.getAttribute('tooltip') ? o.getAttribute('tooltip') : null;
        if (tooltip) {
            tooltip = tooltip.split(',');
        } else {
            tooltip = [ 'Very bad', 'Bad', 'Average', 'Good', 'Very good' ];
        }

        jSuites.rating(o, {
            value: value,
            number: number,
            tooltip: tooltip,
            onchange: function(el, v) {
                // Change value of the element
                o.setAttribute('value', v);
                o.value = v;
                // Basic HTML event
                var s = o.getAttribute('onchange');
                if (s) {
                    eval(s);
                }
                // Trigger event
                var e = new CustomEvent("onchange");
                el.dispatchEvent(e);
            }
        });

        // Initiated
        this.initiated = true;
    }

    connectedCallback() {
        if (! this.initiated) {
            this.init(this);
        }
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }
}

window.customElements.define('jsuites-rating', JsuitesRating);

class JsuitesTags extends HTMLElement {
    constructor() {
        // always call super() first
        super();
    }

    init(o) {
        // Initial values
        var value = o.getAttribute('value') ? o.getAttribute('value') : null;
        var limit = o.getAttribute('limit') ? o.getAttribute('limit') : null;
        var search = o.getAttribute('search') ? o.getAttribute('search') : null;
        var placeholder = o.getAttribute('placeholder') ? o.getAttribute('placeholder') : null;

        jSuites.tags(o, {
            value: value,
            limit: limit,
            search: search,
            placeholder: placeholder,
            onbeforechange: function(el, obj, v) {
                // Basic HTML event
                var s = o.getAttribute('onbeforechange');
                if (s) {
                    var newValue = eval(s);
                    if (newValue != null) {
                        return newValue;
                    }
                } else {
                    // Trigger event
                    var e = new CustomEvent("onbeforechange");
                    el.dispatchEvent(e);
                }
            },
            onchange: function(el, obj, v) {
                var newValue = obj.getValue();
                // Change value of the element
                o.setAttribute('value', newValue);
                o.value = newValue;
                // Basic HTML event
                var s = o.getAttribute('onchange');
                if (s) {
                    eval(s);
                } else {
                    // Trigger event
                    var e = new CustomEvent("onchange");
                    el.dispatchEvent(e);
                }
            },
            onfocus: function(el, obj, v) {
                // Basic HTML event
                var s = o.getAttribute('onfocus');
                if (s) {
                    eval(s);
                } else {
                    // Trigger event
                    var e = new CustomEvent("onfocus");
                    el.dispatchEvent(e);
                }
            },
            onblur: function(el, obj, v) {
                var newValue = obj.getValue();
                // Change value of the element
                o.setAttribute('value', newValue);
                o.value = newValue;
                // Basic HTML event
                var s = o.getAttribute('onblur');
                if (s) {
                    eval(s);
                } else {
                    // Trigger event
                    var e = new CustomEvent("onblur");
                    el.dispatchEvent(e);
                }
            },
            onload: function(el, obj) {
                // Basic HTML event
                var s = o.getAttribute('onload');
                if (s) {
                    eval(s);
                } else {
                    // Trigger event
                    var e = new CustomEvent("onload");
                    el.dispatchEvent(e);
                }
            }
        });

        // Initiated
        this.initiated = true;
    }

    connectedCallback() {
        if (! this.initiated) {
            this.init(this);
        }
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }
}

window.customElements.define('jsuites-tags', JsuitesTags);


