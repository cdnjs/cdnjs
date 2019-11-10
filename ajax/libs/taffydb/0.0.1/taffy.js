/*

Software License Agreement (BSD License)
http://taffydb.com
Copyright (c)
All rights reserved.


Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following condition is met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/
// Setup TAFFY Function (nameSpace) to return an object with methods.
var TAFFY; 
(function () {
    "use strict";
    if (!TAFFY) {
        // TC = Counter for Taffy DBs on page, used for unique IDs
        // cmax = size of charnumarray conversion cache
        // idpad = zeros to pad record IDs with
        var version = "2.3.7", TC = 1, idpad = "000000", cmax = 1000, API = {};

        var JSONProtect = function (t) {
                // ****************************************
                // *
                // * Takes: a variable
                // * Returns: the variable if object/array or the parsed variable if JSON
                // *
                // ****************************************  
                if (TAFFY.isArray(t) || TAFFY.isObject(t)) {
                    return t;
                } else {
                    return JSON.parse(t);
                }
            };

        var each = function (a, fun, u) {
                // ****************************************
                // *
                // * Takes:
                // * a = an object/value or an array of objects/values
                // * f = a function or an array of functions to run each value against
                // * u = optional flag to describe how to handle undefined values in array of values. True: pass them to the functions, False: skip. Default False;
                // * Purpose: Used to loop over arrays
                // *
                // ****************************************  
                    if (a.length == 1) {
                    	fun(a[0],0);
                    } else {
                    for (var r, i, x = 0, a = (T.isArray(a)) ? a : [a], y = a.length; x < y; x++) {
                        var i = a[x];
                        if (!T.isUndefined(i) || (u || false)) {
                            r = fun(i, x);
                            if (r === T.EXIT) {
                                break;
                            }

                        }
                    }
                    }
                
           };

        var eachin = function (o, fun) {
                // ****************************************
                // *
                // * Takes:
                // * o = an object
                // * f = a function or an array of functions to run each value fromt he object
                // * Purpose: Used to loop over objects
                // *
                // ****************************************  
                    var x = 0,
                        r;

                    for (var i in o) {
                        if (o.hasOwnProperty(i)) {
                            r = fun(o[i], i, x++);
                        }
                        if (r === T.EXIT) {
                        	break;
                    	}
                    }

           };

        API["extend"] = function (m, f) {
            // ****************************************
            // *
            // * Takes: method name, function
            // * Purpose: Add a custom method to the API
            // *
            // ****************************************  
            API[m] = function () {
                return f.apply(this, arguments);
            };
        }
        
        var isIndexable = function (f) {
        	// Check to see if record ID
        	 if (T.isString(f) && /[t][0-9]*[r][0-9]*/i.test(f)) {
        	 	return true;
        	 }
        	 // Check to see if record
        	 if (T.isObject(f) && f["___id"] && f["___s"]) {
        	 	return true;
        	 }

        	 // Check to see if array of indexes
        	 if (T.isArray(f)) {
        	 	var i = true;
        	 	each(f,function (r) {
        	 		if (!isIndexable(r)) {
        	 			i = false;
        	 			
        	 			return TAFFY.EXIT;
        	 		}
        	 	});
        	 	return i;
        	 }
        	 
        	 return false;
        }

        var returnFilter = function (f) {
                // ****************************************
                // *
                // * Takes: filter object
                // * Returns: a filter function
                // * Purpose: Take a filter object and return a function that can be used to compare
                // * a TaffyDB record to see if the record matches a query
                // ****************************************  
                var nf = [];
                if (T.isString(f) && /[t][0-9]*[r][0-9]*/i.test(f)) {
        	 		f = {
        	 			"___id" : f
        	 		}
        	 	}
                if (T.isArray(f)) {
                    // if we are working with an array
                   
                    each(f, function (r) {
                        // loop the array and return a filter func for each value
                        nf.push(returnFilter(r));
                    });
                    // now build a func to loop over the filters and return true if ANY of the filters match
                    // This handles logical OR expressions
                    var f = function () {
                            var that = this;
                            var match = false;
                            each(nf, function (f) {
                                if (runFilters(that, f)) {
                                    match = true;
                                }
                            });
                            return match;
                        };
                    return f;

                }
                // if we are dealing with an Object
                if (T.isObject(f)) {
					 if (T.isObject(f) && f["___id"] && f["___s"]) {
        	 			f = {
        	 			"___id" : f["___id"]
        	 			}
        	 		 }
					
                    // Loop over each value on the object to prep match type and match value
                    eachin(f, function (v, i) {

                        // default match type to IS/Equals
                        if (!T.isObject(v)) {
                            v = {
                                "is": v
                            };
                        }
                        // loop over each value on the value object (if any)
                        eachin(v, function (mtest, s) {
                            // s = match type (is, hasAll, like, etc)
                            var c = [];

                            // function to loop and apply filter
                            var looper = (s === "hasAll") ?
                            function (mtest, func) {
                                func(mtest);
                            } : each;

                            // loop over each test
                            looper(mtest, function (mtest) {

                                // su = match success
                                // f = match false
                                var su = true,
                                    f = false;


                               
                                // push a function onto the filter collection to do the matching
                                var matchFunc = function () {

                                    // get the value from the record
                                    var mvalue = this[i];
                                    
									 if ((s.indexOf("!") === 0)) {
                                    // if the filter name starts with ! as in "!is" then reverse the match logic and remove the !
                                    	su = false;
                                    	s = s.substring(1, s.length);
                                	}
								
									 // get the match results based on the s/match type
                                    var r = ((s === "regex") ? (mtest.test(mvalue)) : 
                                            (s === "lt") ? (mvalue < mtest) : 
                                            (s === "gt") ? (mvalue > mtest) : 
                                            (s === "lte") ? (mvalue <= mtest) : 
                                            (s === "gte") ? (mvalue >= mtest) : 
                                            (s === "left") ? (mvalue.indexOf(mtest) === 0)  : 
                                            (s === "leftnocase") ? (mvalue.toLowerCase().indexOf(mtest.toLowerCase()) === 0) : 
                                            (s === "right") ? (mvalue.substring((mvalue.length - mtest.length)) === mtest) : 
                                            (s === "rightnocase") ? (mvalue.toLowerCase().substring((mvalue.length - mtest.length)) === mtest.toLowerCase()) : 
                                            (s === "like") ? (mvalue.indexOf(mtest) >= 0) : 
                                            (s === "likenocase") ? (mvalue.toLowerCase().indexOf(mtest.toLowerCase()) >= 0) : 
                                            (s === "is") ? (mvalue === mtest) : 
                                            (s === "isnocase") ? (mvalue.toLowerCase() === mtest.toLowerCase()) : 
                                            (s === "has") ? (T.has(mvalue, mtest)) : 
                                            (s === "hasall") ? (T.hasAll(mvalue, mtest)) : 
                                            (s.indexOf("is") === -1 && !TAFFY.isNull(mvalue) && !TAFFY.isUndefined(mvalue) && !TAFFY.isObject(mtest) && !TAFFY.isArray(mtest)) ? (mtest === mvalue[s]) :
                                            (T[s] && T.isFunction(T[s]) && s.indexOf("is") === 0) ? T[s](mvalue) === mtest :
                                            (T[s] && T.isFunction(T[s])) ? T[s](mvalue,mtest) :
                                            (su === f));
                                    r = (r && !su) ? false : (!r && !su) ? true : r; 
								 
                                    return r;
                                };
                                c.push(matchFunc)

                            });
                            // if only one filter in the collection push it onto the filter list without the array
                            if (c.length === 1) {

                                nf.push(c[0]);
                            } else {
                                // else build a function to loop over all the filters and return true only if ALL match
                                // this is a logical AND
                                nf.push(function () {
                                    var that = this;
                                    var match = false;
                                    each(c, function (f) {
                                        if (f.apply(that)) {
                                            match = true;
                                        }
                                    });
                                    return match;
                                });
                            }
                        });


                    });
                    // finally return a single function that wraps all the other functions and will run a query
                    // where all functions have to return true for a record to appear in a query result
                    var f = function () {
                            var that = this;
                            var match = true;
                            // faster if less than  4 functions
                            match = (nf.length == 1 && !nf[0].apply(that)) ? false : 
                            	    (nf.length == 2 && (!nf[0].apply(that) || !nf[1].apply(that))) ? false :
                            	    (nf.length == 3 && (!nf[0].apply(that) || !nf[1].apply(that) || !nf[2].apply(that))) ? false :
                            	    (nf.length == 4 && (!nf[0].apply(that) || !nf[1].apply(that) || !nf[2].apply(that) || !nf[3].apply(that))) ? false : true;
                            if (nf.length > 4) {
                             each(nf, function (f) {
                                if (!runFilters(that, f)) {
                                    match = false;
                                }
                            });
                            };
                            return match;
                        };
                    return f;
                }
				
				// if function
				if (T.isFunction(f)) {
					return f;
				}
            }

        var orderByCol = function (ar, o) {
                // ****************************************
                // *
                // * Takes: takes an array and a sort object
                // * Returns: the array sorted
                // * Purpose: Accept filters such as "[col], [col2]" or "[col] desc" and sort on those columns
                // **************************************** 
			
                var sortFunc = function (a, b) {
                        // function to pass to the native array.sort to sort an array
                        var r = 0;

                        T.each(o, function (sd) {
                            // loop over the sort instructions
                            // get the column name
                            var o = sd.split(" ");
                            var col = o[0];

                            // get the direction
                            var dir = (o.length === 1) ? "logical" : o[1];


                            if (dir === 'logical') {
                                // if dir is logical than grab the charnum arrays for the two values we are looking at
                                var c = numcharsplit(a[col]),
                                    d = numcharsplit(b[col]);
                                // loop over the charnumarrays until one value is higher than the other
                                T.each((c.length <= d.length) ? c : d, function (x, i) {
                                    if (c[i] < d[i]) {
                                        r = -1;

                                        return TAFFY.EXIT
                                    } else if (c[i] > d[i]) {
                                        r = 1;
                                        return TAFFY.EXIT
                                    }
                                })
                            } else if (dir === 'logicaldesc') {
                                // if logicaldesc than grab the charnum arrays for the two values we are looking at
                                var c = numcharsplit(a[col]),
                                    d = numcharsplit(b[col]);
                                // loop over the charnumarrays until one value is lower than the other
                                T.each((c.length <= d.length) ? c : d, function (x, i) {
                                    if (c[i] > d[i]) {
                                        r = -1;
                                        return TAFFY.EXIT
                                    } else if (c[i] < d[i]) {
                                        r = 1;
                                        return TAFFY.EXIT
                                    }
                                })
                            } else if (dir === 'asec' && a[col] < b[col]) {
                                // if asec (default) check to see which is higher
                                r = -1;
                                return T.EXIT;
                            } else if (dir === 'asec' && a[col] > b[col]) {
                                // if asec (default) check to see which is higher
                                r = 1;
                                return T.EXIT;
                            } else if (dir === 'desc' && a[col] > b[col]) {
                                // if desc check to see which is lower
                                r = -1;
                                return T.EXIT;

                            } else if (dir === 'desc' && a[col] < b[col]) {
                                // if desc check to see which is lower
                                r = 1;
                               return T.EXIT;

                            }
                            // if r is still 0 and we are doing a logical sort than look to see if one array is longer than the other
                            if (r === 0 && dir === 'logical' && c.length < d.length) {
                                r = -1;
                            } else if (r === 0 && dir === 'logical' && c.length > d.length) {
                                r = 1;
                            } else if (r === 0 && dir === 'logicaldesc' && c.length > d.length) {
                                r = -1;
                            } else if (r === 0 && dir === 'logicaldesc' && c.length < d.length) {
                                r = 1;
                            }

                            if (r != 0) {
                                return T.EXIT
                            }


                        })
                        return r;
                    }
                    // call the sort function and return the newly sorted array
                return ar.sort(sortFunc)
            }


        var numcharsplit = null;
        // ****************************************
        // *
        // * Takes: a string containing numbers and letters and turn it into an array
        // * Returns: return an array of numbers and letters
        // * Purpose: Used for logical sorting. String Example: 12ABC results: [12,"ABC"]
        // **************************************** 
        (function () {
            // creates a cache for numchar conversions
            var cache = {};
            var cachcounter = 0;
            // creates the numcharsplit function
            numcharsplit = function (thing) {
                // if over 1000 items exist in the cache, clear it and start over
                if (cachcounter > cmax) {
                    cache = {};
                    cachcounter = 0;
                }

                // if a cache can be found for a numchar then return its array value
                return cache["_" + thing] || (function () {
                    // otherwise do the conversion
                    // make sure it is a string and setup so other variables
                    var nthing = String(thing),
                        na = [],
                        rv = '_',
                        rt = '';
                    // loop over the string char by char
                    for (var x = 0, xx = nthing.length; x < xx; x++) {
                        // take the char at each location
                        var c = nthing.charCodeAt(x);

                        // check to see if it is a valid number char and append it to the array.
                        // if last char was a string push the string to the charnum array
                        if ((c >= 48 && c <= 57) || c === 46 || c === 45) {
                            if (rt != "n") {
                                rt = "n";
                                na.push(rv.toLowerCase());
                                rv = '';
                            }
                            rv = rv + nthing.charAt(x);
                        } else {
                            // check to see if it is a valid string char and append to string
                            // if last char was a number push the whole number to the charnum array
                            if (rt != "s") {
                                rt = "s";
                                na.push(parseFloat(rv));
                                rv = '';
                            }
                            rv = rv + nthing.charAt(x);
                        }
                    }
                    // once done, push the last value to the charnum array and remove the first uneeded item
                    na.push((rt === "n") ? parseFloat(rv) : rv.toLowerCase());
                    na.shift();
                    // add to cache
                    cache["_" + thing] = na;
                    cachcounter++;


                    // return charnum array
                    return na;
                })();


            };
        })();

        // ****************************************
        // *
        // * Runs a query
        // **************************************** 
        
        
        var run = function () {
                this.context({
                    results: this.getDBI().query(this.context())
                });
                
            }

        API.extend("filter", function () {
            // ****************************************
            // *
            // * Takes: takes unlimited filter objects as arguments
            // * Returns: method collection
            // * Purpose: Take filters as objects and cache functions for later lookup when a query is run
            // **************************************** 
            var nc = TAFFY.mergeObj(this.context(),{run:null});
            var nq = [];
            each(nc.q,function (v) {
            	nq.push(v);
            })
            nc.q = nq;
            // Hadnle passing of ___ID or an record on lookup.
            each(arguments, function (f) {
               nc.q.push(returnFilter(f));
               nc.filterRaw.push(f);
            });
			
            return this.getroot(nc);
        });
        
         API.extend("order", function (o) {
            // ****************************************
            // *
            // * Purpose: takes a string and creates an array of order instructions to be used with a query
            // ****************************************

            var o = o.split(",");
            var x = []
            each(o, function (r) {
                x.push(r.replace(/^\s*/, "").replace(/\s*$/, ""));
            });
            
            var nc = TAFFY.mergeObj(this.context(),{sort:null});
            nc.order = x;
           
            return this.getroot(nc);
        });
        
        API.extend("limit", function (n) {
            // ****************************************
            // *
            // * Purpose: takes a limit number to limit the number of rows returned by a query. Will update the results
            // * of a query
            // **************************************** 
            var nc = TAFFY.mergeObj(this.context(),{});
            nc.limit = n;

            if (nc.run && nc.sort) {
                var limitedresults = [];
                each(nc.results, function (i, x) {
                    if ((x + 1) > n) {
                        return TAFFY.EXIT;
                    }
                    limitedresults.push(i);
                });
               nc.results = limitedresults;

            }
            
             return this.getroot(nc);
        });
        
        API.extend("start", function (n) {
            // ****************************************
            // *
            // * Purpose: takes a limit number to limit the number of rows returned by a query. Will update the results
            // * of a query
            // **************************************** 
            var nc = TAFFY.mergeObj(this.context(),{});
            nc.start = n;

            if (nc.run && nc.sort && !nc.limit) {
                var limitedresults = [];
                each(nc.results, function (i, x) {
                    if ((x + 1) > n) {
                        limitedresults.push(i);
                    }
                });
               nc.results = limitedresults;
            } else {
            	nc = TAFFY.mergeObj(this.context(),{run:null,start:n});
            }
            
             return this.getroot(nc);
        });

		API.extend("update", function (o,runEvent) {
            // ****************************************
            // *
            // * Takes: a object and passes it off DBI update method for all matched records
            // **************************************** 
            var that = this;
            run.call(this);
            each(this.context().results,function (r) {
            	var c = o;
            	if (T.isFunction(c)) {
            		c = c(TAFFY.mergeObj(r,{}));
            	}
                that.getDBI().update(r.___id, c, runEvent);
            });
            if (this.context().results.length) {
                this.context({
                    run: null
                });
            }
            return this;
        });
        API.extend("remove", function (runEvent) {
            // ****************************************
            // *
            // * Purpose: removes records from the DB via the remove and removeCommit DBI methods
            // **************************************** 
            var that = this;
            var c = 0;
            run.call(this);
            each(this.context().results,function (r) {
                that.getDBI().remove(r.___id);
                c++;
            });
            if (this.context().results.length) {
                this.context({
                    run: null
                });
                that.getDBI().removeCommit(runEvent);
            }
            
            return c;
        });
       


        API.extend("count", function () {
            // ****************************************
            // *
            // * Returns: The length of a query result
            // **************************************** 
            run.call(this);
            return this.context().results.length;
        });

        API.extend("callback", function (f,delay) {
            // ****************************************
            // *
            // * Returns null;
            // * Runs a function on return of run.call
            // **************************************** 
            if (f) {
            	var that = this;
            	setTimeout(function () {
            		run.call(that);
            		f.call(that.getroot(that.context()));
            	},(delay) ? delay : 0);
            }
            
            
            return null;
        });
        
        API.extend("get", function () {
            // ****************************************
            // *
            // * Returns: An array of all matching records
            // **************************************** 
            run.call(this);
            return this.context().results;
        });

        API.extend("stringify", function () {
            // ****************************************
            // *
            // * Returns: An JSON string of all matching records
            // **************************************** 
            return JSON.stringify(this.get());
        });
         API.extend("first", function () {
            // ****************************************
            // *
            // * Returns: The first matching record
            // **************************************** 
            run.call(this);
            return this.context().results[0] || false;
        });
        API.extend("last", function () {
            // ****************************************
            // *
            // * Returns: The last matching record
            // **************************************** 
            run.call(this);
            return this.context().results[this.context().results.length - 1] || false;
        });

        
        API.extend("sum", function () {
            // ****************************************
            // *
            // * Takes: column to sum up
            // * Returns: Sums the values of a column
            // **************************************** 
            var total = 0;
            run.call(this);
            var that = this;
            each(arguments, function (c) {
            	each(that.context().results,function (r) {
                	total = total + r[c];
            	});
            });
            return total;
        });

        API.extend("min", function (c) {
            // ****************************************
            // *
            // * Takes: column to find min
            // * Returns: the lowest value
            // **************************************** 
            var lowest = null;
            run.call(this);
            each(this.context().results,function (r) {
                if (lowest === null || r[c] < lowest) {
                    lowest = r[c];
                }
            });
            return lowest;
        });

        API.extend("max", function (c) {
            // ****************************************
            // *
            // * Takes: column to find max
            // * Returns: the highest value
            // **************************************** 
            var highest = null;
            run.call(this);
            each(this.context().results,function (r) {
                if (highest === null || r[c] > highest) {
                    highest = r[c];
                }
            });
            return highest;
        });
        API.extend("select", function () {
            // ****************************************
            // *
            // * Takes: columns to select values into an array
            // * Returns: array of values
            // * Note if more than one column is given an array of arrays is returned
            // **************************************** 

            var ra = [];
            var args = arguments;
            run.call(this);
            if (arguments.length === 1) {

               each(this.context().results,function (r) {

                    ra.push(r[args[0]]);
                });
            } else {
                each(this.context().results,function (r) {
                    var row = [];
                    each(args, function (c) {
                        row.push(r[c]);
                    });
                    ra.push(row);
                });
            }
            return ra;
        });
        API.extend("distinct", function () {
            // ****************************************
            // *
            // * Takes: columns to select unique alues into an array
            // * Returns: array of values
            // * Note if more than one column is given an array of arrays is returned
            // **************************************** 
            var ra = [];
            var args = arguments;
            run.call(this);
            if (arguments.length === 1) {

                each(this.context().results,function (r) {
                    var v = r[args[0]];
                    var dup = false;
                    each(ra, function (d) {
                        if (v === d) {
                            dup = true;
                            return TAFFY.EXIT;
                        }
                    });
                    if (!dup) {
                        ra.push(v);
                    }
                });
            } else {
                each(this.context().results,function (r) {
                    var row = [];
                    each(args, function (c) {
                        row.push(r[c]);
                    });
                    var dup = false;
                    each(ra, function (d) {
                        var ldup = true;
                        each(args, function (c, i) {
                            if (row[i] != d[i]) {
                                ldup = false;
                                return TAFFY.EXIT;
                            }
                        });
                        if (ldup) {
                            dup = true;
                            return TAFFY.EXIT
                        }
                    });
                    if (!dup) {
                        ra.push(row);
                    }
                });
            }
            return ra;
        });
        API.extend("supplant", function (template, returnarray) {
            // ****************************************
            // *
            // * Takes: a string template formated with {key} to be replaced with values from the rows, flag to determine if we want array of strings
            // * Returns: array of values or a string
            // **************************************** 
            var ra = [];
            run.call(this);
            each(this.context().results,function (r) {
                ra.push(template.replace(/{([^{}]*)}/g, function (a, b) {
                    var v = r[b];
                    return typeof v === 'string' || typeof v === 'number' ? v : a;
                }));
            });
            return (!returnarray) ? ra.join("") : ra;
        });


       
        API.extend("each", function (m) {
            // ****************************************
            // *
            // * Takes: a function
            // * Purpose: loops over every matching record and applies the function
            // **************************************** 
            run.call(this);
            each(this.context().results, m);
            return this;
        });
        API.extend("map", function (m) {
            // ****************************************
            // *
            // * Takes: a function
            // * Purpose: loops over every matching record and applies the function, returing the results in an array
            // **************************************** 
            var ra = [];
            run.call(this);
            each(this.context().results,function (r) {
            		ra.push(m(r));
            	});
            return ra;
        });
		
		
        var runFilters = function (r, filter) {
                // ****************************************
                // *
                // * Takes: takes a record and a collection of filters
                // * Returns: true if the record matches, false otherwise
                // **************************************** 
                var match = true;
              

                each(filter, function (mf) {
                    switch (T.typeOf(mf)) {
                    case "function":
                        // run function
                        if (!mf.apply(r)) {
                            match = false;
                            return TAFFY.EXIT;
                        }
                        break;
                    case "array":
                        // loop array and treat like a SQL or
                        match = (mf.length == 1) ? (runFilters(r, mf[0])) : 
                                (mf.length == 2) ? (runFilters(r, mf[0]) || runFilters(r, mf[1])) :
                                (mf.length == 3) ? (runFilters(r, mf[0]) || runFilters(r, mf[1]) || runFilters(r, mf[2])) :
                                (mf.length == 4) ? (runFilters(r, mf[0]) || runFilters(r, mf[1]) || runFilters(r, mf[2]) || runFilters(r, mf[3])) : false;
                        if (mf.length > 4) {
                        	each(mf, function (f) {
                            	if (runFilters(r, f)) {
                                	match = true;
                            	}
                        	});
                        }
                        break;
                    }
                })
                
                return match;
            }


        var T = function (d) {
                // ****************************************
                // *
                // * T is the main TAFFY object
                // * Takes: an array of objects or JSON
                // * Returns a new TAFFYDB
                // **************************************** 
                var TOb = [],
                    ID = {},
                    RC = 1,
                    settings = {
                        template: false,
                        onInsert: false,
                        onUpdate: false,
                        onRemove: false,
                        onDBChange: false,
                        storageName: false,
                        forcePropertyCase: null,
                        cacheSize: 100
                    },
                    dm = new Date(),
                    CacheCount = 0,
                    CacheClear = 0,
                    Cache = {};
                // ****************************************
                // *
                // * TOb = this database
                // * ID = collection of the record IDs and locations within the DB, used for fast lookups
                // * RC = record counter, used for creating IDs
                // * settings.template = the template to merge all new records with
                // * settings.onInsert = event given a copy of the newly inserted record
                // * settings.onUpdate = event given the original record, the changes, and the new record
                // * settings.onRemove = event given the removed record
                // * settings.forcePropertyCase = on insert force the proprty case to be lower or upper. default lower, null/undefined will leave case as is
                // * dm = the modify date of the database, used for query caching
                // **************************************** 
				
				
				var runIndexes = function (indexes) {
                // ****************************************
                // *
                // * Takes: a collection of indexes
                // * Returns: collection with records matching indexed filters
                // **************************************** 

 				if (indexes.length == 0) {
 					return TOb;
 				}
 				
 				var records = [];
 				var UniqueEnforce = false;
 				each(indexes,function (f) {
 					 // Check to see if record ID
        			 if (T.isString(f) && /[t][0-9]*[r][0-9]*/i.test(f) && TOb[ID[f]]) {
        	 			records.push(TOb[ID[f]]);
        	 			UniqueEnforce = true;
        	 		}
        	 		// Check to see if record
        	 		if (T.isObject(f) && f["___id"] && f["___s"] && TOb[ID[f["___id"]]]) {
        	 			records.push(TOb[ID[f["___id"]]]);
        	 			UniqueEnforce = true;
        	 		}
        	 		 // Check to see if array of indexes
		        	 if (T.isArray(f)) {
		        	 	each(f,function (r) {
		        	 		each(runIndexes(r),function (rr) {
		        	 			records.push(rr);
		        	 		});
		        	 		
		        	 	});
		        	 }
 				});
                if (UniqueEnforce && records.length > 1) {
                	records = [];
                }
            
       		return records;
       }
				

                var DBI = {
                    // ****************************************
                    // *
                    // * The DBI is the internal DataBase Interface that interacts with the data
                    // **************************************** 
                    dm: function (nd) {
                        // ****************************************
                        // *
                        // * Takes: an optional new modify date
                        // * Purpose: used to get and set the DB modify date
                        // **************************************** 
                        if (nd) {
                            dm = nd;
                            Cache = {};
                            CacheCount = 0;
                            CacheClear = 0;
                        }
                        if (settings.onDBChange) {
                        	setTimeout(function () {
                        		settings.onDBChange.call(TOb);
                        	},0)
                        }
                        if (settings.storageName) {
                        	setTimeout(function () {
                        		localStorage.setItem('taffy_'+settings.storageName,JSON.stringify(TOb));
                        	});
                        }
                        return dm;
                    },
                    insert: function (i,runEvent) {
                        // ****************************************
                        // *
                        // * Takes: a new record to insert
                        // * Purpose: merge the object with the template, add an ID, insert into DB, call insert event
                        // **************************************** 
                        var columns = [];
                        var records = [];
                        each(JSONProtect(i), function (v, i) {
                            if (T.isArray(v) && i === 0) {
                                each(v, function (av) {

                                    columns.push((settings.forcePropertyCase === "lower") ? av.toLowerCase() : (settings.forcePropertyCase === "upper") ? av.toUpperCase() : av);
                                })
                                return true;
                            } else if (T.isArray(v)) {
                                var nv = {};
                                each(v, function (av, ai) {
                                    nv[columns[ai]] = av;
                                });
                                v = nv

                            } else if (T.isObject(v) && settings.forcePropertyCase) {
                            	var o = {};
                            	
                                eachin(v, function (av, ai) {
                                    o[(settings.forcePropertyCase === "lower") ? ai.toLowerCase() : (settings.forcePropertyCase === "upper") ? ai.toUpperCase() : ai] = v[ai];
                                });
                                v = o;
                            }
                            TC++;
                            RC++;
                            v["___id"] = "T" + String(idpad + TC).slice(-6) + "R" + String(idpad + RC).slice(-6);
                            v["___s"] = true;
                            records.push(v["___id"]);
                            if (settings.template) {
                            	v = T.mergeObj(settings.template, v);
                            }
                            TOb.push(v);

                            ID[v["___id"]] = TOb.length - 1;
                            if (settings.onInsert && (runEvent || TAFFY.isUndefined(runEvent))) {
                                settings.onInsert.call(v);
                            }
                            DBI.dm(new Date());
                        });
                        return root(records);
                    },
                    sort: function (o) {
                        // ****************************************
                        // *
                        // * Purpose: Change the sort order of the DB itself and reset the ID bucket
                        // **************************************** 
                        TOb = orderByCol(TOb, o.split(","));
                        ID = {};
                        each(TOb, function (r, i) {
                            ID[r["___id"]] = i;
                        });
                        DBI.dm(new Date());
                        return true;
                    },
                    update: function (id, changes, runEvent) {
                        // ****************************************
                        // *
                        // * Takes: the ID of record being changed and the changes
                        // * Purpose: Update a record and change some or all values, call the on update method
                        // ****************************************

                        var nc = {};
                        if (settings.forcePropertyCase) {
                        	eachin(changes,function (v,p) {
                        		nc[(settings.forcePropertyCase === "lower") ? p.toLowerCase() : (settings.forcePropertyCase === "upper") ? p.toUpperCase() : p] = v;
                        	});
                        	 changes = nc;
                        } 
                        
                        var or = TOb[ID[id]];
                        var nr = T.mergeObj(or, changes);
                      
                        var tc = {};
                        eachin(nr,function (v,i) {
                        	if (TAFFY.isUndefined(or[i]) || or[i] != v) {
                        		tc[i] = v;
                        	}
                        })
                        if (settings.onUpdate && (runEvent || TAFFY.isUndefined(runEvent))) {
                            settings.onUpdate.call(nr, TOb[ID[id]], tc);
                        }
                        TOb[ID[id]] = nr;
                        DBI.dm(new Date());
                    },
                    remove: function (id) {
                        // ****************************************
                        // *
                        // * Takes: the ID of record to be removed
                        // * Purpose: remove a record, changes its ___s value to false
                        // **************************************** 
                        TOb[ID[id]].___s = false;
                    },
                    removeCommit: function (runEvent) {
                        // ****************************************
                        // *
                        // * 
                        // * Purpose: loop over all records and remove records with ___s = false, call onRemove event, clear ID
                        // ****************************************
                        for (var x = TOb.length - 1; x > -1; x--) {

                            if (!TOb[x].___s) {
                                if (settings.onRemove && (runEvent || TAFFY.isUndefined(runEvent))) {
                                    settings.onRemove.call(TOb[x]);
                                }
                                ID[TOb[x].___id] = undefined;
                                TOb.splice(x, 1);
                            }
                        }
                        ID = {};
                        each(TOb, function (r, i) {
                            ID[r["___id"]] = i;
                        });
                        DBI.dm(new Date());
                    },
                    query: function (context) {
                        // ****************************************
                        // *
                        // * Takes: the context object for a query and either returns a cache result or a new query result
                        // **************************************** 
                        var returnq;
                        
                        if (settings.cacheSize)
                        {
                        	var cid = "";
                        	each(context.filterRaw,function (r) {
                        		if (T.isFunction(r)) {
                        			cid = "nocache";
                        			return TAFFY.EXIT;
                        		}
                        	});
                        	if (cid == "") {
								cid = JSON.stringify(T.mergeObj(context,{q:false,run:false,sort:false}));
							}
						}
                        // Run a new query if there are no results or the run date has been cleared
                        if (!context.results || !context.run || (context.run && DBI.dm() > context.run)) {
                            var results = [];

                            // check Cache
                            
			                if (settings.cacheSize && Cache[cid]) {

			                	Cache[cid].i = CacheCount++;
			                	return Cache[cid].results;
			                } else {
			                	// if no filter, return DB
			                	if (context.q.length == 0 && context.index.length == 0) {
			                		each(TOb, function (r) {
			                			 results.push(r);
			                		});
			                		returnq = results;
			                	} else {
			                		// use indexes
			                		
			                		var indexed = runIndexes(context.index);
			    					
			                		// run filters
			                		each(indexed, function (r) {
                               	   		// Run filter to see if record matches query
                               	 		if (context.q.length == 0 || runFilters(r, context.q)) {
                                   		 results.push(r);
                               	 		}
                           		 		});

                            		returnq = results;
                           		}
			                }
            			    
                            
                            
                            
                        } else {
                            // If query exists and run has not been cleared return the cache results
                            returnq = context.results;
                        }
                        // If a custom order array exists and the run has been clear or the sort has been cleared
                        if (context.order.length > 0 && (!context.run || !context.sort)) {
                            // order the results
                            returnq = orderByCol(returnq, context.order);
                        }

                        // If a limit on the number of results exists and it is less than the returned results, limit results
                        if (returnq.length && ((context.limit && context.limit < returnq.length) || context.start)) {
                            var limitq = [];
                            each(returnq, function (r, i) {
                                if (!context.start || (context.start && (i+1) >= context.start)) {
                                	if (context.limit) {
                                		var ni = (context.start) ? (i+1)-context.start : i;
                                		if (ni < context.limit) {
                                    		limitq.push(r);
                                    	} else if (ni > context.limit) {
                                   			return TAFFY.EXIT;
                                   		}
                                  } else {
                                  	limitq.push(r);
                                  }
                                }
                            })
                            returnq = limitq;

                        }
                        
                        // update cache
                        if (settings.cacheSize && cid != 'nocache') {
                        	CacheClear++;
                        
                        	setTimeout(function () {
                        		if (CacheClear >= settings.cacheSize*2) {
                        		CacheClear = 0;
                        		var bCounter = CacheCount-settings.cacheSize;
                        		var nc = {};
                        		eachin(function (r,k) {
                        			if (r.i >= bCounter) {
                        				nc[k] = r;
                        			}
                        		})
                        		Cache = nc;
                        	}},0);
                 
                        	Cache[cid] = {
                					i:CacheCount++,
                					results: returnq
                				}
                		
                        }
                        return returnq;

                    }
                }


                var root = function () {
                        // ****************************************
                        // *
                        // * The root function that gets returned when a new DB is created
                        // * Takes: unlimited filter arguments and creates filters to be run when a query is called
                        // **************************************** 
                        // ****************************************
                        // *
                        // * iAPI is the the method collection valiable when a query has been started by calling dbname()
                        // * Certain methods are or are not avaliable once you have started a query such as insert (you can only insert into root)
                        // ****************************************
                        var iAPI = TAFFY.mergeObj(TAFFY.mergeObj(API, {
                            insert: undefined
                        }), {
                            getDBI: function () {
                                return DBI;
                            },
                            getroot: function (c) {
                                return root.call(c);
                            },
                            context: function (n) {
                                // ****************************************
                                // *
                                // * The context contains all the information to manage a query including filters, limits, and sorts
                                // **************************************** 
                                if (n) {
                                    context = TAFFY.mergeObj(context, ("results" in n) ? TAFFY.mergeObj(n, {
                                        run: new Date(),
                                        sort: new Date()
                                    }) : n);
                                }
                                return context;
                            },
                            extend: undefined
                        });
                        
                        var context = (this && this.q) ? this : {
                            limit: false,
                            start: false,
                            q: [],
                            filterRaw: [],
                            index: [],
                            order: [],
                            results: false,
                            run: null,
                            sort: null
                        };
                        // ****************************************
                        // *
                        // * Call the query method to setup a new query
                        // **************************************** 
                         each(arguments, function (f) {
                      		
                         	if (isIndexable(f)) {
    							context.index.push(f);
                         	} else {
                				context.q.push(returnFilter(f));
                			}
							context.filterRaw.push(f);
           				 });



                        return iAPI;
                    }

                    // ****************************************
                    // *
                    // * If new records have been passed on creation of the DB either as JSON or as an array/object, insert them
                    // **************************************** 
                if (d) {
                    DBI.insert(d);
                }

				
                root.insert = DBI.insert;
                root.TAFFY = true;
                root.sort = DBI.sort;
                // ****************************************
                // *
                // * These are the methods that can be accessed on off the root DB function. Example dbname.insert();
                // **************************************** 
                root.settings = function (n) {
                    // ****************************************
                    // *
                    // * Getting and setting for this DB's settings/events
                    // **************************************** 
                    if (n) {
                        settings = TAFFY.mergeObj(settings, n);
                        if (n.template) {
     
                            root().update(n.template);
                        }
                    }
                    return settings;
                }
				
				// ****************************************
                // *
                // * These are the methods that can be accessed on off the root DB function. Example dbname.insert();
                // **************************************** 
                root.store = function (n) {
                    // ****************************************
                    // *
                    // * Setup localstorage for this DB on a given name
                    // * Pull data into the DB as needed
                    // **************************************** 
                    var r = false;
                    if (localStorage) {
                    if (n) {
                       var i = localStorage.getItem('taffy_'+n);
                       if (i && i.length > 0) {
                       		root.insert(i);
                       		r = true;
                       }
                       if (TOb.length > 0) {
                       	setTimeout(function () {
                        	 localStorage.setItem('taffy_'+settings.storageName,JSON.stringify(TOb));
                       	});
                       }
					}
					root.settings({storageName:n});
					};
                    return r;
                }
				
                // ****************************************
                // *
                // * Return root on DB creation and start having fun
                // **************************************** 
                return root;
            }
            // ****************************************
            // *
            // * Sets the global TAFFY object
            // **************************************** 
            TAFFY = T;


        // ****************************************
        // *
        // * Create public each method
        // *
        // ****************************************   
        T.each = each;

        // ****************************************
        // *
        // * Create public eachin method
        // *
        // ****************************************   
        T.eachin = eachin;
        // ****************************************
        // *
        // * Create public extend method
        // * Add a custom method to the API
        // *
        // ****************************************   
        T.extend = API.extend;


        // ****************************************
        // *
        // * Creates TAFFY.EXIT value that can be returned to stop an each loop
        // *
        // ****************************************  
        TAFFY.EXIT = "TAFFYEXIT";

        // ****************************************
        // *
        // * Create public utility mergeObj method
        // * Return a new object where items from obj2
        // * have replaced or been added to the items in
        // * obj1
        // * Purpose: Used to combine objs
        // *
        // ****************************************   
        TAFFY.mergeObj = function (ob1, ob2) {
            var c = {};
            eachin(ob1, function (v, n) {
                c[n] = ob1[n];
            });
            eachin(ob2, function (v, n) {
                c[n] = ob2[n];
            });
            return c;
        };



        // ****************************************
        // *
        // * Create public utility has method
        // * Returns true if a complex object, array
        // * or taffy collection contains the material
        // * provided in the second argument
        // * Purpose: Used to comare objects
        // *
        // ****************************************
        TAFFY.has = function (var1, var2) {

            var re = true;
            if ((var1.TAFFY)) {
                re = var1(var2);
                if (re.length > 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
            	
                switch (T.typeOf(var1)) {
                case "object":
                    if (T.isObject(var2)) {
                        eachin(var2, function (v, n) {
                            if (re === true && !T.isUndefined(var1[n]) && var1.hasOwnProperty(n)) {
                                re = T.has(var1[n], var2[n]);
                            } else {
                                re = false;
                                return TAFFY.EXIT;
                            }
                        })
                    } else if (T.isArray(var2)) {
                        each(var2, function (v, n) {
                            re = T.has(var1, var2[n]);
                            if (re) {
                                return TAFFY.EXIT;
                            }
                        });
                    } else if (T.isString(var2)) {
	                    if (!TAFFY.isUndefined(var1[var2])) {
    	                    return true;
        	            } else {
            	        	return false;
                	    }
                    }
                    return re;
                    break;
                case "array":
                    if (T.isObject(var2)) {
                        each(var1, function (v, i) {
                            re = T.has(var1[i], var2);
                            if (re === true) {
                                return TAFFY.EXIT;
                            }
                        });
                    } else if (T.isArray(var2)) {
                        each(var2, function (v2, i2) {
                            each(var1, function (v1, i1) {
                                re = T.has(var1[i1], var2[i2]);
                                if (re === true) {
                                    return TAFFY.EXIT;
                                }
                            });
                            if (re === true) {
                                return TAFFY.EXIT;
                            }
                        });
                    } else if (T.isString(var2) || T.isNumber(var2)) {
                        for (var n = 0; n < var1.length; n++) {
                            re = T.has(var1[n], var2);
                            if (re) {
                                return true;
                            }
                        }
                    }
                    return re;
                    break;
                case "string":
                    if (T.isString(var2) && var2 === var1) {
                        return true;
                    }
                    break;
                default:
                    if (T.typeOf(var1) === T.typeOf(var2) && var1 === var2) {
                        return true;
                    }
                    break;
                }
            }
            return false;
        };

        // ****************************************
        // *
        // * Create public utility hasAll method
        // * Returns true if a complex object, array
        // * or taffy collection contains the material
        // * provided in the call - for arrays it must
        // * contain all the material in each array item
        // * Purpose: Used to comare objects
        // *
        // ****************************************
        TAFFY.hasAll = function (var1, var2) {

            var T = TAFFY;
            if (T.isArray(var2)) {
                var ar = true;
                each(var2, function (v) {
                    ar = T.has(var1, v);
                    if (ar === false) {
                        return TAFFY.EXIT;
                    }
                });
                return ar;
            } else {
                return T.has(var1, var2);
            }
        };


        // ****************************************
        // *
        // * typeOf Fixed in JavaScript as public utility
        // *
        // ****************************************
        TAFFY.typeOf = function (v) {
            var s = typeof v;
            if (s === 'object') {
                if (v) {
                    if (typeof v.length === 'number' && !(v.propertyIsEnumerable('length'))) {
                        s = 'array';
                    }
                } else {
                    s = 'null';
                }
            }
            return s;
        };

        // ****************************************
        // *
        // * Create public utility getObjectKeys method
        // * Returns an array of an objects keys
        // * Purpose: Used to get the keys for an object
        // *
        // ****************************************   
        TAFFY.getObjectKeys = function (ob) {
            var kA = [];
            eachin(ob, function (n) {
                kA.push(n);
            });
            kA.sort();
            return kA;
        };

        // ****************************************
        // *
        // * Create public utility isSameArray
        // * Returns an array of an objects keys
        // * Purpose: Used to get the keys for an object
        // *
        // ****************************************   
        TAFFY.isSameArray = function (ar1, ar2) {
            return (TAFFY.isArray(ar1) && TAFFY.isArray(ar2) && ar1.join(",") === ar2.join(",")) ? true : false;
        };

        // ****************************************
        // *
        // * Create public utility isSameObject method
        // * Returns true if objects contain the same
        // * material or false if they do not
        // * Purpose: Used to comare objects
        // *
        // ****************************************   
        TAFFY.isSameObject = function (ob1, ob2) {
            var T = TAFFY,
                rv = true;
            if (T.isObject(ob1) && T.isObject(ob2)) {
                if (T.isSameArray(T.getObjectKeys(ob1), T.getObjectKeys(ob2))) {
                    eachin(ob1, function (v, n) {
                        if ((T.isObject(ob1[n]) && T.isObject(ob2[n]) && T.isSameObject(ob1[n], ob2[n])) || (T.isArray(ob1[n]) && T.isArray(ob2[n]) && T.isSameArray(ob1[n], ob2[n])) || (ob1[n] === ob2[n])) {} else {
                            rv = false;
                            return TAFFY.EXIT;
                        }
                    });
                } else {
                    rv = false;
                }
            } else {
                rv = false;
            }
            return rv;
        };

        // ****************************************
        // *
        // * Create public utility is[DataType] methods
        // * Return true if obj is datatype, false otherwise
        // * Purpose: Used to determine if arguments are of certain data type
        // *
        // ****************************************

        (function (ts) {
            for (var z = 0; z < ts.length; z++) {
                (function (y) {
                    TAFFY["is" + y] = function (c) {
                        return TAFFY.typeOf(c) === y.toLowerCase() ? true : false;
                    }
                }(ts[z]))
            }
        }(["String", "Number", "Object", "Array", "Boolean", "Null", "Function", "Undefined"]));

    }
})()


/*
         http://www.JSON.org/json2.js
         2010-11-17
         Public Domain.
         */
        var JSON;
        if (!JSON) {
            JSON = {};
        }

        (function () {
            "use strict";

            function f(n) {
                return n < 10 ? '0' + n : n;
            }

            if (typeof Date.prototype.toJSON !== 'function') {

                Date.prototype.toJSON = function (key) {

                    return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
                };

                String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
                    return this.valueOf();
                };
            }

            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                gap, indent, meta = {
                    '\b': '\\b',
                    '\t': '\\t',
                    '\n': '\\n',
                    '\f': '\\f',
                    '\r': '\\r',
                    '"': '\\"',
                    '\\': '\\\\'
                },
                rep;


            function quote(string) {

                escapable.lastIndex = 0;
                return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                    var c = meta[a];
                    return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"' : '"' + string + '"';
            }


            function str(key, holder) {



                var i, k, v, length, mind = gap,
                    partial, value = holder[key];


                if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
                    value = value.toJSON(key);
                }


                if (typeof rep === 'function') {
                    value = rep.call(holder, key, value);
                }


                switch (typeof value) {
                case 'string':
                    return quote(value);

                case 'number':


                    return isFinite(value) ? String(value) : 'null';

                case 'boolean':
                case 'null':


                    return String(value);



                case 'object':


                    if (!value) {
                        return 'null';
                    }


                    gap += indent;
                    partial = [];


                    if (Object.prototype.toString.apply(value) === '[object Array]') {


                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }


                        v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }


                    if (rep && typeof rep === 'object') {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            k = rep[i];
                            if (typeof k === 'string') {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    } else {


                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }


                    v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
                }
            }


            if (typeof JSON.stringify !== 'function') {
                JSON.stringify = function (value, replacer, space) {



                    var i;
                    gap = '';
                    indent = '';



                    if (typeof space === 'number') {
                        for (i = 0; i < space; i += 1) {
                            indent += ' ';
                        }



                    } else if (typeof space === 'string') {
                        indent = space;
                    }


                    rep = replacer;
                    if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                        throw new Error('JSON.stringify');
                    }



                    return str('', {
                        '': value
                    });
                };
            }


            if (typeof JSON.parse !== 'function') {
                JSON.parse = function (text, reviver) {


                    var j;

                    function walk(holder, key) {


                        var k, v, value = holder[key];
                        if (value && typeof value === 'object') {
                            for (k in value) {
                                if (Object.hasOwnProperty.call(value, k)) {
                                    v = walk(value, k);
                                    if (v !== undefined) {
                                        value[k] = v;
                                    } else {
                                        delete value[k];
                                    }
                                }
                            }
                        }
                        return reviver.call(holder, key, value);
                    }


                    text = String(text);
                    cx.lastIndex = 0;
                    if (cx.test(text)) {
                        text = text.replace(cx, function (a) {
                            return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                        });
                    }


                    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {


                        j = eval('(' + text + ')');


                        return typeof reviver === 'function' ? walk({
                            '': j
                        }, '') : j;
                    }

                    throw new SyntaxError('JSON.parse');
                };
            }
        }());



        // ****************************************
        // *
        // * End JSON Code Object Handler
        // *
        // ****************************************       

