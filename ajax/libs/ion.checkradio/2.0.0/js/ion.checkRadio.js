/**
 * Ion.CheckRadio
 * version 2.0.0 Build 42
 * © Denis Ineshin, 2015
 *
 * Project page:    http://ionden.com/a/plugins/ion.CheckRadio/en.html
 * GitHub page:     https://github.com/IonDen/ion.CheckRadio
 *
 * Released under MIT licence:
 * http://ionden.com/a/plugins/licence-en.html
 */

;(function ($, window) {
    "use strict";

    if ($.fn.ionCheckRadio) {
        return;
    }

    if (!String.prototype.trim) {
        (function() {
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function() {
                return this.replace(rtrim, '');
            };
        })();
    }



    var collection = {},
        instances = {};

    var IonCheckRadio = function (group) {
        this.group = group.content;
        this.type = group.type;
        this.$group = $(this.group);
        this.old = null;
        this.observer = null;

        this.init();
    };

    IonCheckRadio.prototype = {
        init: function () {
            var ready = this.$group.eq(0).hasClass("icr-input");

            if (ready) {
                this.prepare();
            } else {
                this.createHTML();
            }
        },

        prepare: function () {
            var self = this,
                $item,
                $parent,
                i;

            for (i = 0; i < this.group.length; i++) {
                $item = $(this.group[i]);
                $parent = $item.parent().parent();
                $.data(this.group[i], "icr-parent", $parent);

                this.presetChecked(this.group[i]);
                this.presetDisabled(this.group[i]);
            }

            this.$group.on("change", function () {
                self.change(this);
            });

            this.$group.on("focus", function () {
                self.focus(this);
            });

            this.$group.on("blur", function () {
                self.blur(this);
            });

            // Trace input "disabled" attribute mutation
            // Only for modern browsers. IE11+
            // To add cross browser support, install this:
            // https://github.com/megawac/MutationObserver.js
            if (window.MutationObserver) {
                this.setUpObserver();
            }
        },

        setUpObserver: function () {
            var self = this,
                node,
                i;

            this.observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    node = mutation.target;

                    if (mutation.attributeName === "disabled") {
                        self.toggle(self.getParent(node), node.disabled, "disabled");
                    }
                });
            });

            for (i = 0; i < this.group.length; i++) {
                this.observer.observe(this.group[i], {
                    attributes: true
                });
            }
        },

        destroy: function () {
            this.$group.off();

            if (this.observer) {
                this.observer.disconnect();
                this.observer = null;
            }
        },

        presetChecked: function (node) {
            if (node.checked) {
                this.toggle(this.getParent(node), true, "checked");

                if (this.type === "radio") {
                    this.old = node;
                }
            }
        },

        presetDisabled: function (node) {
            if (node.disabled) {
                this.toggle(this.getParent(node), true, "disabled");
            }
        },

        change: function (node) {
            this.toggle(this.getParent(node), node.checked, "checked");

            if (this.type === "radio" && this.old && this.old !== node) {
                this.toggle(this.getParent(this.old), this.old.checked, "checked");
            }

            this.old = node;
        },

        focus: function (node) {
            this.toggle(this.getParent(node), true, "focused");
        },

        blur: function (node) {
            this.toggle(this.getParent(node), false, "focused");
        },

        toggle: function ($node, state, class_name) {
            if (state) {
                $node.addClass(class_name);
            } else {
                $node.removeClass(class_name);
            }
        },

        getParent: function (node) {
            return $.data(node, "icr-parent");
        },

        // auto transform code to correct layout
        // VERY SLOW(!) for lazy developers
        // to avoid this, use recommended html layout
        createHTML: function () {
            var tpl =
                    '<label class="icr-label">' +
                    '   <span class="icr-item type_{type}"></span>' +
                    '   <span class="icr-hidden"><input class="icr-input {class_list}" type="{type}" name="{name}" value="{value}" {disabled} {checked} /></span>' +
                    '   <span class="icr-text">{text}</span>' +
                    '</label>',

                classes = [],
                types = [],
                names = [],
                values = [],
                texts = [],
                checked_list = [],
                disabled_list = [],
                nc = [],
                self = this;

            var getTextParent = function ($label) {
                var label = $label[0],
                    queue = [],
                    nodes = label.childNodes,
                    cur, text, html,
                    start, end, i;

                for (i = 0; i < nodes.length; i++) {
                    queue.push(nodes[i]);
                }

                while (queue.length) {
                    cur = queue[0];

                    if (cur.nodeType === 3) {
                        text = cur.nodeValue.trim();

                        if (text) {
                            break;
                        }
                    } else if (cur.nodeType === 1) {
                        nodes = cur.childNodes;

                        for (i = 0; i < nodes.length; i++) {
                            queue.push(nodes[i]);
                        }
                    }

                    Array.prototype.splice.call(queue, 0, 1);
                }

                html = cur.parentNode.innerHTML;

                if (html.indexOf('<input') >= 0) {
                    start = html.indexOf('<input');
                    html = html.slice(start);
                    end = html.indexOf('>');
                    html = html.slice(end + 1).trim();
                }

                return html;
            };

            var getHTML = function (i) {
                var tp = tpl.replace(/\{class_list\}/, classes[i]);
                tp = tp.replace(/\{type\}/g, types[i]);
                tp = tp.replace(/\{name\}/, names[i]);
                tp = tp.replace(/\{value\}/, values[i]);
                tp = tp.replace(/\{text\}/, texts[i]);

                if (disabled_list[i]) {
                    tp = tp.replace(/\{disabled\}/, "disabled");
                } else {
                    tp = tp.replace(/\{disabled\}/, "");
                }

                if (checked_list[i]) {
                    tp = tp.replace(/\{checked\}/, "checked");
                } else {
                    tp = tp.replace(/\{checked\}/, "");
                }

                return tp;
            };

            this.$group.each(function (i) {
                var $label,
                    $next,
                    $cur = $(this),
                    class_list = $cur.prop("className"),
                    type = $cur.prop("type"),
                    name = $cur.prop("name"),
                    val = $cur.prop("value"),
                    checked = $cur.prop("checked"),
                    disabled = $cur.prop("disabled"),
                    id = $cur.prop("id"),
                    html;

                classes.push(class_list);
                types.push(type);
                names.push(name);
                values.push(val);
                checked_list.push(checked);
                disabled_list.push(disabled);

                if (id) {
                    $label = $("label[for='" + id + "']");
                } else {
                    $label = $cur.closest("label");
                }

                texts.push(getTextParent($label));

                html = getHTML(i);
                $label.after(html);
                $next = $label.next();
                nc.push($next[0]);

                $cur.remove();
                $label.remove();
            });

            this.$group = $(nc).find("input");
            this.$group.each(function (i) {
                self.group[i] = this;
                collection[names[0]][i] = this;
            });

            this.prepare();
        }
    };

    $.fn.ionCheckRadio = function () {
        var i,
            local = [],
            input,
            name;

        var warn = function (text) {
            window.console && window.console.warn && window.console.warn(text);
        };

        for (i = 0; i < this.length; i++) {
            input = this[i];
            name = input.name;

            if (input.type !== "radio" && input.type !== "checkbox" || !name) {
                warn("Ion.CheckRadio: Some inputs have wrong type or absent name attribute!");
                continue;
            }

            collection[name] = {
                type: input.type,
                content: []
            };
            local.push(input);
        }

        for (i = 0; i < local.length; i++) {
            input = local[i];
            name = input.name;

            collection[name].content.push(input);
        }

        for (i in collection) {
            if (instances[i]) {
                instances[i].destroy();
                instances[i] = null;
            }

            instances[i] = new IonCheckRadio(collection[i]);
        }
    };

})(jQuery, window);
