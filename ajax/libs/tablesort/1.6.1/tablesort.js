/*!
 * tablesort v1.6.1 (2013-02-14)
 * http://tristen.ca/tablesort/demo
 * Copyright (c) 2013 ; Licensed MIT
*/

;(function () {
    function Tablesort(el, options) {
        if (el.tagName !== 'TABLE') {
            throw new Error('Element must be a table');
        }

        this.init(el, options || {});
    }

    Tablesort.prototype = {

        init: function(el, options) {
            var that = this,
                firstRow;
            this.thead = false;
            this.options = options;
            this.options.d = options.descending || false;

            if (el.rows && el.rows.length > 0) {
                if(el.tHead && el.tHead.rows.length > 0) {
                    firstRow = el.tHead.rows[el.tHead.rows.length - 1];
                    that.thead = true;
                } else {
                    firstRow = el.rows[0];
                }
            }

            if (!firstRow) {
                return;
            }

            var onClick = function (e) {
                // Delete sort classes on headers that are not the current one.
                var siblings = getParent(cell, 'tr').getElementsByTagName('th');
                for(var i = 0; i < siblings.length; i++) {
                    if(hasClass(siblings[i], 'sort-up') || hasClass(siblings[i], 'sort-down')) {
                        if(siblings[i] !== this) {
                            siblings[i].className = siblings[i].className.replace(' sort-down', '')
                                .replace(' sort-up', '');
                        }
                    }
                }
                that.current = this;
                that.sortTable(this);
            };

            // Assume first row is the header and attach a click handler to eech.
            for(var i = 0; i < firstRow.cells.length; i++) {
                var cell = firstRow.cells[i];
                if(!hasClass(cell, 'no-sort')) {
                    cell.className += ' sort-header';
                    addEvent(cell, 'click', onClick);
                }
            }
        },

        sortTable: function(header, update) {
            var that = this,
                column = header.cellIndex,
                sortFunction,
                t = getParent(header, 'table'),
                item = '',
                i = 0;

            if (t.rows.length <= 1) {
                return;
            }

            while (item === '' && i < t.tBodies[0].rows.length) {
                item = getInnerText(t.tBodies[0].rows[i].cells[column]);
                item = trim(item);
                // Exclude cell values where commented out HTML exists
                if(item.substr(0, 4) === '<!--' || item.length === 0) {
                    item = '';
                }
                i++;
            }

            if (item === '') {
                return;
            }

            // Possible sortFunction scenarios
            var sortCaseInsensitive = function (a, b) {
                var aa = getInnerText(a.cells[that.col]).toLowerCase(),
                    bb = getInnerText(b.cells[that.col]).toLowerCase();

                if(aa === bb) {
                    return 0;
                }

                if(aa < bb) {
                    return 1;
                }

                return -1;
            };

            var sortNumber = function (a, b) {
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

            // Sort as number if a currency key exists or number
            if (item.match(/^-?[£\x24Û¢´]\d/) || item.match(/^-?(\d+[,\.]?)+(E[\-+][\d]+)?%?$/)) {
                sortFunction = sortNumber;
            } else if (testDate(item)) {
                sortFunction = sortDate;
            } else {
                sortFunction = sortCaseInsensitive;
            }

            this.col = column;
            var newRows = [],
                j = 0;

            for (i = 0; i < t.tBodies.length; i++) {
                if (!that.thead) {
                    // skip the first row
                    for(j = 1; j < t.tBodies[i].rows.length; j++) {
                        newRows[j - 1] = t.tBodies[i].rows[j];
                    }
                } else {
                    // don't skip the first row
                    for(j = 0; j < t.tBodies[i].rows.length; j++) {
                        newRows[j] = t.tBodies[i].rows[j];
                    }
                }
            }

            newRows.sort(sortFunction);

            if (!update) {
                if(that.options.d) {
                    if(hasClass(header, 'sort-up')) {
                        header.className = header.className.replace(/ sort-up/, '');
                        header.className += ' sort-down';
                    } else {
                        header.className = header.className.replace(/ sort-down/, '');
                        header.className += ' sort-up';
                    }
                } else {
                    if(hasClass(header, 'sort-down')) {
                        header.className = header.className.replace(/ sort-down/, '');
                        header.className += ' sort-up';
                    } else {
                        header.className = header.className.replace(/ sort-up/, '');
                        header.className += ' sort-down';
                    }
                }
            }

            // Before we append should we reverse the new array or not?
            if(hasClass(header, 'sort-down')) {
                newRows.reverse();
            }

            // append rows that already exist rather than creating new ones
            for(i = 0; i < newRows.length; i++) {
                // Don't sort on rows specified. TODO might want to
                // do this more upstream.
                if(!hasClass(newRows[i], 'no-sort')) {
                    t.tBodies[0].appendChild(newRows[i]);
                }
            }
        },

        refresh: function() {
            if (this.current !== undefined) {
                this.sortTable(this.current, true);
            }
        }
    };

    var week = /(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\.?\,?\s*/i,
        commonDate = /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/,
        month = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i;

    var testDate = function(date) {
            return (
                date.search(week) !== -1 ||
                date.search(commonDate) !== -1  ||
                date.search(month !== -1)
            ) !== -1 ;
        },

        parseDate = function (date) {
            date = date.replace(/\-/g, '/');
            date = date.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, '$1/$2/$3'); // format before getTime
            return new Date(date).getTime();
        },

        getParent = function (el, pTagName) {
            if (el === null) {
                return null;
            } else if (el.nodeType === 1 && el.tagName.toLowerCase() === pTagName.toLowerCase()) {
                return el;
            } else {
                return getParent(el.parentNode, pTagName);
            }
        },

        getInnerText = function (el) {
            var that = this;

            if (typeof el === 'string' || typeof el === 'undefined') {
                return el;
            }

            var str = el.getAttribute('data-sort') || '';

            if (str) {
                return str;
            }
            else if (el.textContent) {
                return el.textContent;
            }
            else if (el.innerText) {
                return el.innerText;
            }

            var cs = el.childNodes,
                l = cs.length;

            for (var i = 0; i < l; i++) {
                switch (cs[i].nodeType) {
                    case 1:
                        // ELEMENT_NODE
                        str += that.getInnerText(cs[i]);
                    break;
                    case 3:
                        // TEXT_NODE
                        str += cs[i].nodeValue;
                    break;
                }
            }

            return str;
        },

        compareNumber = function (a, b) {
            var aa = parseFloat(a),
                bb = parseFloat(b);

            a = isNaN(aa) ? 0 : aa;
            b = isNaN(bb) ? 0 : bb;
            return a - b;
        },

        trim = function (s) {
            return s.replace(/^\s+|\s+$/g, '');
        },

        cleanNumber = function (i) {
            return i.replace(/[^\-?0-9.]/g, '');
        },

        hasClass = function (el, c) {
            return(' ' + el.className + ' ').indexOf(' ' + c + ' ') > -1;
        },

        // http://ejohn.org/apps/jselect/event.html
        addEvent = function (object, event, method) {
            if(object.attachEvent) {
                object['e' + event + method] = method;
                object[event + method] = function () {
                    object['e' + event + method](window.event);
                };
                object.attachEvent('on' + event, object[event + method]);
            } else {
                object.addEventListener(event, method, false);
            }
        };

    window.Tablesort = Tablesort;
})();
