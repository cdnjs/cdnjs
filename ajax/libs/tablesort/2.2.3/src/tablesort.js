;(function() {
    function Tablesort(el, options) {
        if (!el) throw new Error('Element not found');
        if (el.tagName !== 'TABLE') throw new Error('Element must be a table');
        this.init(el, options || {});
    }

    Tablesort.prototype = {

        init: function(el, options) {
            var that = this,
                firstRow;
            this.thead = false;
            this.options = options;

            if (el.rows && el.rows.length > 0) {
                if (el.tHead && el.tHead.rows.length > 0) {
                    firstRow = el.tHead.rows[el.tHead.rows.length - 1];
                    that.thead = true;
                } else {
                    firstRow = el.rows[0];
                }
            }

            if (!firstRow) return;

            var onClick = function() {
                if (that.current && that.current !== this) {
                    if (that.current.classList.contains(classSortUp)) {
                        that.current.classList.remove(classSortUp);
                    }
                    else if (that.current.classList.contains(classSortDown)) {
                        that.current.classList.remove(classSortDown);
                    }
                }

                that.current = this;
                that.sortTable(this);
            };

            var defaultSort;

            // Assume first row is the header and attach a click handler to each.
            for (var i = 0; i < firstRow.cells.length; i++) {
                var cell = firstRow.cells[i];
                if (!cell.classList.contains('no-sort')) {
                    cell.classList.add('sort-header');
                    cell.addEventListener('click', onClick, false);

                    if (cell.classList.contains('sort-default')) {
                        defaultSort = cell;
                    }
                }
            }

            if (defaultSort) {
                that.current = defaultSort;
                that.sortTable(defaultSort, true);
            }
        },

        getFirstDataRowIndex: function() {
            // If table does not have a <thead>, assume that first row is
            // a header and skip it.
            if (!this.thead) {
                return 1;
            } else {
                return 0;
            }
        },

        sortTable: function(header, update) {
            var that = this,
                column = header.cellIndex,
                sortFunction,
                t = getParent(header, 'table'),
                item = '',
                items = [],
                i = that.getFirstDataRowIndex();

            if (t.rows.length <= 1) return;

            while (items.length < 3 && i < t.tBodies[0].rows.length) {
                item = getInnerText(t.tBodies[0].rows[i].cells[column]);
                item = item.trim();
                // Exclude cell values where commented out HTML exists
                if (item.substr(0, 4) !== '<!--' && item.length !== 0) {
                    items.push(item);
                }
                i++;
            }

            if (!items) return;

            // Possible sortFunction scenarios
            var sortCaseInsensitive = function(a, b) {
                var aa = getInnerText(a.cells[that.col]).toLowerCase(),
                    bb = getInnerText(b.cells[that.col]).toLowerCase();

                if (aa === bb) return 0;
                if (aa < bb) return 1;

                return -1;
            };

            var sortNumber = function(a, b) {
                var aa = getInnerText(a.cells[that.col]),
                    bb = getInnerText(b.cells[that.col]);

                aa = cleanNumber(aa);
                bb = cleanNumber(bb);
                return compareNumber(bb, aa);
            };

            var sortDate = function(a, b) {
                var aa = getInnerText(a.cells[that.col]).toLowerCase(),
                    bb = getInnerText(b.cells[that.col]).toLowerCase();
                return parseDate(bb) - parseDate(aa);
            };

            var sortDotSep = function(a, b) {
                var aa = getInnerText(a.cells[that.col]).split('.'),
                    bb = getInnerText(b.cells[that.col]).split('.');

                for (var i = 0, len = aa.length; i < len; i++) {
                    var aai = parseInt(aa[i]),
                        bbi = parseInt(bb[i]);

                    if (aai == bbi) continue;
                    if (aai > bbi) return -1;
                    if (aai < bbi) return 1;
                }
                return 0;
            };

            var sortFilesize = function(a, b) {
                var aa = filesize2num(getInnerText(a.cells[that.col]))
                    bb = filesize2num(getInnerText(b.cells[that.col]));

                return compareNumber(bb, aa);
            };

            // Sort dot separated numbers, e.g. ip addresses or version numbers
            if (items.every(testDotSeparatedNumbers)) {
                sortFunction = sortDotSep;
            }
            // sort filesize, e.g. "123.45 MB"
            else if (items.every(testFilesize)) {
                sortFunction = sortFilesize;
            }
            // Sort as number if a currency key exists or number
            else if (items.every(testNumber)) {
                sortFunction = sortNumber;
            } else if (items.every(testDate)) {
                sortFunction = sortDate;
            } else {
                sortFunction = sortCaseInsensitive;
            }

            this.col = column;
            var newRows = [],
                noSorts = {},
                j,
                totalRows = 0;

            for (i = 0; i < t.tBodies.length; i++) {
                for (j = 0; j < t.tBodies[i].rows.length; j++) {
                    var tr = t.tBodies[i].rows[j];
                    if (tr.classList.contains('no-sort')) {
                        // keep no-sorts in separate list to be able to insert
                        // them back at their original position later
                        noSorts[totalRows] = tr;
                    } else {
                        // Save the index for stable sorting
                        newRows.push({
                            tr: tr,
                            index: totalRows
                        });
                    }
                    totalRows++;
                }
            }

            var sortUp   = that.options.descending ? classSortDown : classSortUp,
                sortDown = that.options.descending ? classSortUp : classSortDown;

            if (!update) {
                if (header.classList.contains(sortUp)) {
                    header.classList.remove(sortUp);
                    header.classList.add(sortDown);
                } else {
                    header.classList.remove(sortDown);
                    header.classList.add(sortUp);
                }
            } else if (!header.classList.contains(sortUp) && !header.classList.contains(sortDown)) {
                header.classList.add(sortUp);
            }

            // Make a stable sort function
            var stabilize = function(sort) {
                return function(a, b) {
                    var unstableResult = sort(a.tr, b.tr);
                    if (unstableResult === 0) {
                        return a.index - b.index;
                    }
                    return unstableResult;
                };
            };

            // Make an `anti-stable` sort function. If two elements are equal
            // under the original sort function, then there relative order is
            // reversed.
            var antiStabilize = function(sort) {
                return function(a, b) {
                    var unstableResult = sort(a.tr, b.tr);
                    if (unstableResult === 0) {
                        return b.index - a.index;
                    }
                    return unstableResult;
                };
            };

            // Before we append should we reverse the new array or not?
            // If we reverse, the sort needs to be `anti-stable` so that
            // the double negatives cancel out
            if (header.classList.contains(classSortDown)) {
                newRows.sort(antiStabilize(sortFunction));
                newRows.reverse();
            } else {
                newRows.sort(stabilize(sortFunction));
            }

            // append rows that already exist rather than creating new ones
            var noSortsSoFar = 0;
            for (i = 0; i < totalRows; i++) {
                var whatToInsert;
                if (noSorts[i]) {
                    // We have a no-sort row for this position, insert it here.
                    whatToInsert = noSorts[i];
                    noSortsSoFar++;
                } else {
                    whatToInsert = newRows[i - noSortsSoFar].tr;
                }
                // appendChild(x) moves x if already present somewhere else in the DOM
                t.tBodies[0].appendChild(whatToInsert);
            }
            // callback
            if (that.options.callback && typeof that.options.callback === 'function') {
                that.options.callback(header);
            }
        },

        refresh: function() {
            if (this.current !== undefined) {
                this.sortTable(this.current, true);
            }
        }
    };

    var classSortUp   = 'sort-up',
        classSortDown = 'sort-down';

    var week       = /(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\.?\,?\s*/i,
        commonDate = /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/,
        month      = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i;

    var testDotSeparatedNumbers = function(item){
        return /^(\d+\.)+\d+$/.test(item);
    };

    var testFilesize = function(item){
        return /^\d+(\.\d+)? ?(k|M|G|T|P|E|Z|Y)?i?B?$/i.test(item);
    };

    var testNumber = function(item){
        return item.match(/^-?[£\x24Û¢´€]?\d+\s*([,\.]\d{0,2})/) || // prefixed currency
               item.match(/^-?\d+\s*([,\.]\d{0,2})?[£\x24Û¢´€]/) || // suffixed currency
               item.match(/^-?(\d)*-?([,\.]){0,1}-?(\d)+([E,e][\-+][\d]+)?%?$/); // number
    };

    var testDate = function(date) {
            return (
                date.search(week) !== -1 ||
                date.search(commonDate) !== -1  ||
                date.search(month !== -1)
            ) !== -1 && !isNaN(parseDate(date));
        },

        parseDate = function(date) {
            date = date.replace(/\-/g, '/');
            date = date.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, '$1/$2/$3'); // format before getTime
            return new Date(date).getTime();
        },

        getParent = function(el, pTagName) {
            if (el === null) {
                return null;
            } else if (el.nodeType === 1 && el.tagName.toLowerCase() === pTagName.toLowerCase()) {
                return el;
            } else {
                return getParent(el.parentNode, pTagName);
            }
        },

        getInnerText = function(el) {
            var that = this;

            if (typeof el === 'string' || typeof el === 'undefined') return el;

            var str = el.getAttribute('data-sort') || '';

            if (str) {
                return str;
            } else if (el.textContent) {
                return el.textContent;
            } else if (el.innerText) {
                return el.innerText;
            }

            var cs = el.childNodes,
                l = cs.length;

            for (var i = 0; i < l; i++) {
                switch (cs[i].nodeType) {
                    case 1:
                        // ELEMENT_NODE
                        if (cs[i].tagName === 'IMG') {
                            str += (cs[i].alt || cs[i].title || "");
                        } else {
                            str += that.getInnerText(cs[i]);
                        }
                    break;
                    case 3:
                        // TEXT_NODE
                        str += cs[i].nodeValue;
                    break;
                }
            }

            return str;
        },

        compareNumber = function(a, b) {
            var aa = parseFloat(a),
                bb = parseFloat(b);

            a = isNaN(aa) ? 0 : aa;
            b = isNaN(bb) ? 0 : bb;
            return a - b;
        },

        cleanNumber = function(i) {
            return i.replace(/[^\-?0-9.]/g, '');
        };

        // Converts filesize to bytes
        // Ex. filesize2num("123 KB") -> 123000
        // Ex. filesize2num("123 KiB") -> 125952
        filesize2num = function(filesize) {
            var matches = filesize.match(/^(\d+(\.\d+)?) ?((k|M|G|T|P|E|Z|Y)?i?B?)$/i);

            var num    = parseFloat(cleanNumber(matches[1])),
                suffix = matches[3];

            return num * suffix2num(suffix);
        };

        // Returns suffix multiplier
        // Ex. suffix2num("KB") -> 1000
        // Ex. suffix2num("KiB") -> 1024
        suffix2num = function(suffix) {
            suffix = suffix.toLowerCase();
            var base = suffix[1] === "i" ? 1024 : 1000;

            switch(suffix[0]) {
                case "k":
                    return Math.pow(base, 2);
                case "m":
                    return Math.pow(base, 3);
                case "g":
                    return Math.pow(base, 4);
                case "t":
                    return Math.pow(base, 5);
                case "p":
                    return Math.pow(base, 6);
                case "e":
                    return Math.pow(base, 7);
                case "z":
                    return Math.pow(base, 8);
                case "y":
                    return Math.pow(base, 9);
                default:
                    return base;
            }
        };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Tablesort;
    } else {
        window.Tablesort = Tablesort;
    }
})();
