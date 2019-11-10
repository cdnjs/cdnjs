/*
 *  Linkify - v1.1.6
 *  Find URLs in plain text and return HTML for discovered links.
 *  https://github.com/HitSend/jQuery-linkify/
 *
 *  Made by SoapBox Innovations, Inc.
 *  Under MIT License
 */
!function($, window, document) {
    "use strict";
    function Linkified(element, options) {
        this._defaults = defaults, this.element = element, this.setOptions(options), this.init();
    }
    var defaults = {
        tagName: "a",
        newLine: "\n",
        target: "_blank",
        linkClass: null,
        linkClasses: [],
        linkAttributes: null
    };
    Linkified.prototype = {
        constructor: Linkified,
        init: function() {
            1 === this.element.nodeType ? Linkified.linkifyNode.call(this, this.element) : this.element = Linkified.linkify.call(this, this.element.toString());
        },
        setOptions: function(options) {
            this.settings = Linkified.extendSettings(options, this.settings);
        },
        toString: function() {
            return this.element.toString();
        }
    }, Linkified.extendSettings = function(options, settings) {
        var prop;
        settings = settings || {};
        for (prop in defaults) settings[prop] || (settings[prop] = defaults[prop]);
        for (prop in options) settings[prop] = options[prop];
        return settings;
    }, Linkified.linkMatch = new RegExp([ "(", '\\s|[^a-zA-Z0-9.\\+_\\/"\\>\\-]|^', ")(?:", "(", "[a-zA-Z0-9\\+_\\-]+", "(?:", "\\.[a-zA-Z0-9\\+_\\-]+", ")*@", ")?(", "http:\\/\\/|https:\\/\\/|ftp:\\/\\/", ")?(", "(?:(?:[a-z0-9][a-z0-9_%\\-_+]*\\.)+)", ")(", "(?:com|ca|co|edu|gov|net|org|dev|biz|cat|int|pro|tel|mil|aero|asia|coop|info|jobs|mobi|museum|name|post|travel|local|[a-z]{2})", ")(", "(?::\\d{1,5})", ")?(", "(?:", "[\\/|\\?]", "(?:", "[\\-a-zA-Z0-9_%#*&+=~!?,;:.\\/]*", ")*", ")", "[\\-\\/a-zA-Z0-9_%#*&+=~]", "|", "\\/?", ")?", ")(", '[^a-zA-Z0-9\\+_\\/"\\<\\-]|$', ")" ].join(""), "g"), 
    Linkified.emailLinkMatch = /(<[a-z]+ href=\")(http:\/\/)([a-zA-Z0-9\+_\-]+(?:\.[a-zA-Z0-9\+_\-]+)*@)/g, 
    Linkified.linkify = function(text, options) {
        var attr, settings, linkClasses, linkReplace = [];
        this.constructor === Linkified && this.settings ? (settings = this.settings, options && (settings = Linkified.extendSettings(options, settings))) : settings = Linkified.extendSettings(options), 
        linkClasses = settings.linkClass ? settings.linkClass.split(/\s+/) : [], linkClasses.push.apply(linkClasses, settings.linkClasses), 
        text = text.replace(/</g, "&lt;").replace(/(\s)/g, "$1$1"), linkReplace.push("$1<" + settings.tagName, 'href="http://$2$4$5$6$7"'), 
        linkReplace.push('class="linkified' + (linkClasses.length > 0 ? " " + linkClasses.join(" ") : "") + '"'), 
        settings.target && linkReplace.push('target="' + settings.target + '"');
        for (attr in settings.linkAttributes) linkReplace.push([ attr, '="', settings.linkAttributes[attr].replace(/\"/g, "&quot;").replace(/\$/g, "&#36;"), '"' ].join(""));
        return linkReplace.push(">$2$3$4$5$6$7</" + settings.tagName + ">$8"), text = text.replace(Linkified.linkMatch, linkReplace.join(" ")), 
        text = text.replace(Linkified.emailLinkMatch, "$1mailto:$3"), text = text.replace(/(\s){2}/g, "$1"), 
        text = text.replace(/\n/g, settings.newLine);
    }, Linkified.linkifyNode = function(node) {
        var children, childNode, childCount, dummyElement, i;
        if (node && "object" == typeof node && 1 === node.nodeType && "a" !== node.tagName.toLowerCase() && !/[^\s]linkified[\s$]/.test(node.className)) {
            for (children = [], dummyElement = Linkified._dummyElement || document.createElement("div"), 
            childNode = node.firstChild, childCount = node.childElementCount; childNode; ) {
                if (3 === childNode.nodeType) {
                    for (;dummyElement.firstChild; ) dummyElement.removeChild(dummyElement.firstChild);
                    for (dummyElement.innerHTML = Linkified.linkify.call(this, childNode.textContent || childNode.innerText || childNode.nodeValue), 
                    children.push.apply(children, dummyElement.childNodes); dummyElement.firstChild; ) dummyElement.removeChild(dummyElement.firstChild);
                } else 1 === childNode.nodeType ? children.push(Linkified.linkifyNode(childNode)) : children.push(childNode);
                childNode = childNode.nextSibling;
            }
            for (;node.firstChild; ) node.removeChild(node.firstChild);
            for (i = 0; i < children.length; i++) node.appendChild(children[i]);
        }
        return node;
    }, Linkified._dummyElement = document.createElement("div"), $.fn.linkify = function(options) {
        return this.each(function() {
            var linkified;
            (linkified = $.data(this, "plugin-linkify")) ? (linkified.setOptions(options), linkified.init()) : $.data(this, "plugin-linkify", new Linkified(this, options));
        });
    }, $.fn.linkify.Constructor = Linkified, $(window).on("load", function() {
        $("[data-linkify]").each(function() {
            var $target, $this = $(this), target = $this.attr("data-linkify"), options = {
                tagName: $this.attr("data-linkify-tagname"),
                newLine: $this.attr("data-linkify-newline"),
                target: $this.attr("data-linkify-target"),
                linkClass: $this.attr("data-linkify-linkclass")
            };
            for (var option in options) "undefined" == typeof options[option] && delete options[option];
            $target = "this" === target ? $this : $this.find(target), $target.linkify(options);
        });
    }), $("body").on("click", ".linkified", function() {
        var $link = $(this), url = $link.attr("href"), isEmail = /^mailto:/i.test(url), target = $link.attr("target");
        return isEmail ? window.location.href = url : window.open(url, target), !1;
    });
}(jQuery, window, document);