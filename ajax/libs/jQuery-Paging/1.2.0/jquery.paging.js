/**
 * @license jQuery paging plugin v1.3.0 23/06/2014
 * http://www.xarg.org/2011/09/jquery-pagination-revised/
 *
 * Copyright (c) 2011, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/

(function($, window, undefined) {


    $["fn"]["paging"] = function(number, opts) {

        var self = this,
        Paging = {

            "setOptions": function(opts) {

                var parseFormat = function(format) {

                    var gndx = 0, group = 0, num = 1, res = {
                        fstack:    [], // format stack
                        asterisk:  0, // asterisk?
                        inactive:  0, // fill empty pages with inactives up to w?
                        blockwide: 5, // width of number block
                        current:   3, // position of current element in number block
                        rights:    0, // num of rights
                        lefts:     0 // num of lefts
                    }, tok, pattern = /[*<>pq\[\]().-]|[nc]+!?/g;

                    var known = {
                        "[": "first",
                        "]": "last",
                        "<": "prev",
                        ">": "next",
                        "q": "left",
                        "p": "right",
                        "-": "fill",
                        ".": "leap"
                    }, count = {};

                    while ((tok = pattern["exec"](format))) {

                        tok = "" + (tok);

                        if (undefined === known[tok]) {

                            if ("(" === tok) {
                                group = ++gndx;
                            } else if (")" === tok) {
                                group = 0;
                            } else if (num) {

                                if ("*" === tok) {
                                    res.asterisk = 1;
                                    res.inactive = 0;
                                } else {
                                    // number block is the only thing left here
                                    res.asterisk = 0;
                                    res.inactive = "!" === tok.charAt(tok.length - 1);
                                    res.blockwide = tok["length"] - res.inactive;
                                    if (!(res.current = 1 + tok.indexOf("c"))) {
                                        res.current = (1 + res.blockwide) >> 1;
                                    }
                                }

                                res.fstack.push({
                                    ftype: "block", // type
                                    fgroup: 0,      // group
                                    fpos: 0         // pos
                                });
                                num = 0;
                            }

                        } else {

                            res.fstack.push({
                                ftype: known[tok], // type
                                fgroup: group,     // group
                                fpos: undefined === count[tok] ? count[tok] = 1 : ++count[tok] // pos
                            });

                            if ("q" === tok)
                                ++res.lefts;
                            else if ("p" === tok)
                                ++res.rights;
                        }
                    }
                    return res;
                };

                Paging.opts = $.extend(Paging.opts || {

                    "lapping": 0, // number of elements overlap

                    "perpage": 10, // number of elements per page

                    "page": 1, // current page

                    "refresh": {
                        "interval": 10,
                        "url": null
                    }, // refresh callback information

                    "format": "", // visual format string

                    "lock": false, // set to true, if you want to disable the pagination for a while. 

                    "circular": false, // set to true if you want the next/prev buttons go circular

                    "onClick": null, // Alternative click handler to bypass onSelect mechanism

                    "onFormat": function(type) {	// callback for every format element

                    /** EXAMPLE **

                        switch (type) {

                            case 'block':

                                if (!this.active)
                                    return '<span class="disabled">' + this.value + '</span>';
                                else if (this.value != this.page)
                                    return '<em><a href="#' + this.value + '">' + this.value + '</a></em>';
                                return '<span class="current">' + this.value + '</span>';

                            case 'right':
                            case 'left':

                                if (!this.active) {
                                    return "";
                                }
                                return '<a href="#' + this.value + '">' + this.value + '</a>';

                            case 'next':

                                if (this.active) {
                                    return '<a href="#' + this.value + '" class="next">Next &raquo;</a>';
                                }
                                return '<span class="disabled">Next &raquo;</span>';

                            case 'prev':

                                if (this.active) {
                                    return '<a href="#' + this.value + '" class="prev">&laquo; Previous</a>';
                                }
                                return '<span class="disabled">&laquo; Previous</span>';

                            case 'first':

                                if (this.active) {
                                    return '<a href="#' + this.value + '" class="first">|&lt;</a>';
                                }
                                return '<span class="disabled">|&lt;</span>';

                            case 'last':

                                if (this.active) {
                                    return '<a href="#' + this.value + '" class="prev">&gt;|</a>';
                                }
                                return '<span class="disabled">&gt;|</span>';

                            case 'fill':
                                if (this.active) {
                                    return "...";
                                }
                        }
                        return ""; // return nothing for missing branches

                        **/
                    },
                    "onSelect": function(page) {	// callback for page selection

                        /** EXAMPLE SLICE **

                        var data = this.slice;

                        content.slice(prev[0], prev[1]).css('display', 'none');
                        content.slice(data[0], data[1]).css('display', 'block');

                        prev = data;

                        **/


                        /** EXAMPLE AJAX **

                        $.ajax({
                            "url": '/data.php?start=' + this.slice[0] + '&end=' + this.slice[1] + '&page=' + page,
                            "success": function(data) {
                                // content replace
                            }
                        });

                        **/

                        // Return code indicates if the link of the clicked format element should be followed (otherwise only the click-event is used)
                        return true;
                    },
                    "onRefresh": function(json) { // callback for new data of refresh api

                        /** EXAMPLE **
                        if (json.number) {
                            Paging.setNumber(json.number);
                        }

                        if (json.options) {
                            Paging.setOptions(json.options);
                        }

                        Paging.setPage(); // Call with empty params to reload the paginator
                        **/
                    }
                }, opts || {});

                Paging.opts["lapping"]|= 0;
                Paging.opts["perpage"]|= 0;
                if (Paging.opts["page"] !== null)
                    Paging.opts["page"]|= 0;

                // If the number of elements per page is less then 1, set it to default
                if (Paging.opts["perpage"] < 1) {
                    Paging.opts["perpage"] = 10;
                }

                if (Paging.interval)
                    window.clearInterval(Paging.interval);

                if (Paging.opts["refresh"]["url"]) {

                    Paging.interval = window.setInterval(function() {

                        $["ajax"]({
                            "url": Paging.opts["refresh"]["url"],
                            "success": function(data) {

                                if (typeof(data) === "string") {

                                    try {
                                        data = $["parseJSON"](data);
                                    } catch (o) {
                                        return;
                                    }
                                }
                                Paging.opts["onRefresh"](data);
                            }
                        });

                    }, 1000 * Paging.opts["refresh"]["interval"]);
                }

                Paging.format = parseFormat(Paging.opts["format"]);
                return Paging;
            },

            "setNumber": function(number) {
                Paging.number = (undefined === number || number < 0) ? -1 : number;
                return Paging;
            },

            "setPage": function(page) {

                if (Paging.opts["lock"]) {
                    Paging.opts["onSelect"](0, self);
                    return Paging;
                }

                if (undefined === page) {

                    page = Paging.opts["page"];

                    if (null === page) {
                        return Paging;
                    }

                } else if (Paging.opts["page"] == page) { // Necessary to be ==, not ===
                    return Paging;
                }

                Paging.opts["page"] = (page|= 0);

                var number = Paging.number;
                var opts = Paging.opts;

                var rStart, rStop;

                var pages, buffer;

                var groups = 1, format = Paging.format;

                var data, tmp, node, lapping;

                var count = format.fstack["length"], i = count;


                // If the lapping is greater than perpage, reduce it to perpage - 1 to avoid endless loops
                if (opts["perpage"] <= opts["lapping"]) {
                    opts["lapping"] = opts["perpage"] - 1;
                }

                lapping = number <= opts["lapping"] ? 0 : opts["lapping"] | 0;


                // If the number is negative, the value doesn"t matter, we loop endlessly with a constant width
                if (number < 0) {

                    number = -1;
                    pages = -1;

                    rStart = Math.max(1, page - format.current + 1 - lapping);
                    rStop  = rStart + format.blockwide;

                } else {

                    /* Calculate the number of pages
                     * http://www.xarg.org/2016/10/derivation-of-pagination-calculation/
                     *
                     * Variables:
                     * - n: Number of elements
                     * - p: Elements per page
                     * - o: Offset (lapping)
                     * - x: Position of last n (aka virtual number of elements)
                     * - m: Height aka number of pages
                     *
                     * Condition: o < p
                     *
                     * Page             Last element of page
                     * =====================================
                     * 1                p
                     * 2                2p - o
                     * 3                3p - 2o
                     * ...
                     * k                kp - (k - 1)o
                     * k + 1            (k + 1)p - ko
                     *
                     *  => kp - (k - 1)o < n <= (k + 1)p - ko       (n is on page k+1)
                     * <=> k(p - o) + o < n <= k(p - o) + p
                     * <=> (n - p) / (p - o) <= k < (n - o) / (p - o)
                     *  => k = ceil((n - p) / (p - o))
                     *
                     * We know that kp - ko + i = n
                     *  => i = n - k(p - o)
                     *
                     *  => m = k + 1
                     *     x = kp + i
                     */
                    pages = 1 + Math.ceil((number - opts["perpage"]) / (opts["perpage"] - lapping));

                    // If current page is negative, start at the end and
                    // Set the current page into a valid range, includes 0, which is set to 1
                    page = Math.max(1, Math.min(page < 0 ? 1 + pages + page : page, pages));

                    // Do we need to print all numbers?
                    if (format.asterisk) {
                        rStart = 1;
                        rStop  = 1 + pages;

                        // Disable :first and :last for asterisk mode as we see all buttons
                        format.current   = page;
                        format.blockwide = pages;

                    } else {

                        // If no, start at the best position and stop at max width or at num of pages
                        rStart = Math.max(1, Math.min(page - format.current, pages - format.blockwide) + 1);
                        rStop = format.inactive ? rStart + format.blockwide : Math.min(rStart + format.blockwide, 1 + pages);
                    }
                }

                while (i--) {

                    tmp = 0; // default everything is visible
                    node = format.fstack[i];

                    switch (node.ftype) {

                        case "left":
                            tmp = (node.fpos < rStart);
                            break;
                        case "right":
                            tmp = (rStop <= pages - format.rights + node.fpos);
                            break;

                        case "first":
                            tmp = (format.current < page);
                            break;
                        case "last":
                            tmp = (format.blockwide < format.current + pages - page);
                            break;

                        case "prev":
                            tmp = (1 < page);
                            break;
                        case "next":
                            tmp = (page < pages);
                            break;
                    }
                    groups|= tmp << node.fgroup; // group visible?
                }

                data = {
                    "number":   number, // number of elements
                    "lapping":  lapping, // overlapping
                    "pages":    pages, // number of pages
                    "perpage":  opts["perpage"], // number of elements per page
                    "page":     page, // current page
                    "slice": [ // two element array with bounds of the current page selection
                        (tmp = page * (opts["perpage"] - lapping) + lapping) - opts["perpage"], // Lower bound
                        Math.min(tmp, number) // Upper bound
                    ]
                };

                buffer = "";

                function buffer_append(opts, data, type) {

                    type = "" + (opts["onFormat"].call(data, type));

                    if (data["value"]) {
                        buffer += type.replace(/<a/i, '<a data-page="' + data["value"] + '"');
                    } else {
                        buffer += type;
                    }
                }

                while (++i < count) {

                    node = format.fstack[i];

                    tmp = (groups >> node.fgroup & 1);

                    switch (node.ftype) {
                        case "block":
                            for (; rStart < rStop; ++rStart) {

                                data["value"]  = rStart;
                                data["pos"]    = 1 + format.blockwide - rStop + rStart;

                                data["active"] = rStart <= pages || number < 0;     // true if infinity series and rStart <= pages
                                data["first"]  = 1 === rStart;                      // check if it is the first page
                                data["last"]   = rStart === pages && 0 < number;    // false if infinity series or rStart != pages

                                buffer_append(opts, data, node.ftype);
                            }
                            continue;

                        case "left":
                            data["value"]  = node.fpos;
                            data["active"] = node.fpos < rStart; // Don't take group-visibility into account!
                            break;

                        case "right":
                            data["value"]  = pages - format.rights + node.fpos;
                            data["active"] = rStop <= data["value"]; // Don't take group-visibility into account!
                            break;

                        case "first":
                            data["value"]  = 1;
                            data["active"] = tmp && 1 < page;
                            break;

                        case "prev":
                            if ((data["active"] = opts["circular"])) {
                                data["value"]   = page === 1 ? pages : page - 1;
                            } else {
                                data["value"]   = Math.max(1, page - 1);
                                data["active"]  = tmp && 1 < page;
                            }
                            break;

                        case "last":
                            if ((data["active"] = (number < 0))) {
                                data["value"]   = 1 + page;
                            } else {
                                data["value"]   = pages;
                                data["active"]  = tmp && page < pages;
                            }
                            break;

                        case "next":
                            if ((data["active"] = opts["circular"])) {
                                data["value"]  = 1 + page % pages;
                            } else if ((data["active"] = (number < 0))) {
                                data["value"]   = 1 + page;
                            } else {
                                data["value"]   = Math.min(1 + page, pages);
                                data["active"]  = tmp && page < pages;
                            }
                            break;

                        case "leap":
                        case "fill":
                            data["pos"]    = node.fpos;
                            data["active"] = tmp; // tmp is true by default and changes only for group behaviour
                            buffer_append(opts, data, node.ftype);
                            continue;
                    }

                    data["pos"]   = node.fpos;
                    data["last"]  = /* void */
                    data["first"] = undefined;

                    buffer_append(opts, data, node.ftype);
                }

                if (self.length) {

                    $("a", self["html"](buffer)).click(opts['onClick'] || function(ev) {
                        ev["preventDefault"]();

                        var obj = this;

                        do {

                            if ('a' === obj["nodeName"].toLowerCase()) {
                                break;
                            }

                        } while ((obj = obj["parentNode"]));

                        Paging["setPage"]($(obj).data("page"));

                        if (Paging.locate) {
                            window.location = obj["href"];
                        }
                    });

                    Paging.locate = opts["onSelect"].call({
                        "number":   number,
                        "lapping":  lapping,
                        "pages":    pages,
                        "slice":    data["slice"]
                    }, page, self);
                }
                return Paging;
            }
        };

        return Paging
                ["setNumber"](number)
                ["setOptions"](opts)
                ["setPage"]();
    };

}(jQuery, this));
