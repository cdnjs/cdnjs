    // o--------------------------------------------------------------------------------o
    // | This file is part of the RGraph package - you can learn more at:               |
    // |                                                                                |
    // |                         https://www.rgraph.net                                 |
    // |                                                                                |
    // | RGraph is licensed under the Open Source MIT license. That means that it's     |
    // | totally free to use and there are no restrictions on what you can do with it!  |
    // o--------------------------------------------------------------------------------o

    //
    // Initialise the various objects
    //
    RGraph = window.RGraph || {isrgraph:true,isRGraph: true,rgraph:true};

// Module pattern
(function (win, doc, undefined)
{
    RGraph.Sheets = function ()
    {
        var args = RGraph.Sheets.getArgs(arguments, 'oauth,key,worksheet,callback');

        // Allow three args to be given as well as four
        if (arguments.length === 1) {
            // Nothing to do here
            
        } else if (arguments.length === 3) {
            args.oauth     = args.oauth;
            args.key       = args.key;
            args.callback  = args.worksheet; // Need to set this because the order of the args is wrong
            args.worksheet = 'Sheet1';

        } else if (arguments.length === 4) {
            args.worksheet = args.worksheet;
        }

        var worksheet = args.worksheet,
            callback  = args.callback,
            letters   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            key       = args.key,
            oauth     = args.oauth;

        var url = ('https://sheets.googleapis.com/v4/spreadsheets/[KEY]/values/[WORKSHEET]?alt=json&key=[OAUTH_KEY]')
                   .replace(/\[KEY\]/, args.key)
                   .replace(/\[WORKSHEET\]/, encodeURIComponent(args.worksheet))
                   .replace(/\[OAUTH_KEY\]/, args.oauth)




        
        

        //
        // Loads the spreadsheet
        //
        this.load = function(url, userCallback)
        {
            var obj = this;
            
            RGraph.Sheets.AJAX.getJSON(url, function (json)
            {
                var grid  = json.values;
                var rows  = grid.length;
                var cells = 0;

                //
                // Determine the longest row
                //
                for (var i=0; i<grid.length; ++i) {
                    cells = Math.max(cells, grid[i].length);
                }
                
                //
                // Now that the max row length has been determined go through
                // the grid and pad out each row
                //
                for (var i=0; i<grid.length; ++i) {
                    for (var j=grid[i].length; j<cells; ++j) {
                        grid[i][j] = '';
                    }
                }
                
                // Convert numerics strings to numbers
                // eg "234"  =>  234
                for (var i=0; i<grid.length; ++i) {
                    for (var j=0; j<cells; ++j) {
                        if (grid[i][j].match(/^[0-9]+$/)) {
                            grid[i][j] = parseInt(grid[i][j]);
                        } else if (grid[i][j].match(/^[0-9.]+$/)) {
                            grid[i][j] = parseFloat(grid[i][j]);
                        }
                    }
                }

                //
                // Save the grid on the object
                //
                obj.data = grid;



                //
                // Call the users callback function. Users can access the raw data if
                // they want with the obj.data property or by using the accessor
                // methods (better)
                //
                userCallback(obj);
            });
        };








        //
        // Fetches a row of data and returns it
        //
        // @param id    number The numeric index of the column to fetch (starts at 1)
        // @param start number The index to start fetching/returning at. The first
        //                     character is 1
        // @param opt        An option object containing options
        //
        this.row = function (index, start)
        {
            var opt = {}, row;
            
            // Does the row exist?
            if (!this.data[index - 1]) {
                return [];
            }
            
            // Default for start is 1
            start = start || 1;

            //
            // Parse the .trim argument
            //

            if (arguments && typeof arguments[2] === 'object' && typeof arguments[2].trim === 'boolean') {
                opt.trim = arguments[2].trim;
            } else {
                opt.trim = true;
            }

            row = this.data[index - 1].slice(start - 1);

            // Trim the array if required
            if (opt.trim) {
                row = RGraph.Sheets.arrayRTrim(row);
            }

            return row;
        };








        //
        // Fetches a column of data and returns it
        //
        // @param id    number The letter that corresponds to the column
        // @param start number The index to start fetching/returning at. The first
        //                     character is 1
        // @param opt        An option object containing options
        //
        this.col = function (index, start)
        {
            var opt = {},
                col = [];
          
            // Default for start is 1
            start = start || 1;

            if (arguments && typeof arguments[2] === 'object' && typeof arguments[2].trim === 'boolean') {
                opt.trim = arguments[2].trim;
            } else {
                opt.trim = true;
            }
            
            for (var i=0; i<this.data.length; ++i) {
                col.push(this.data[i][index - 1]);
            }

            // Trim the array if required
            if (opt.trim) {
                col = RGraph.Sheets.arrayRTrim(col);
            }

            // Now account for the start index

            col = col.slice(start - 1);

            return col;
        };








        //
        // Returns the index (zero index) of the given letters
        //
        this.getIndexOfLetters = function (l)
        {
            var parts = l.split('');

            if (parts.length === 1) {
                return letters.indexOf(l) + 1;
            } else if (parts.length === 2){
                var idx = ((letters.indexOf(parts[0]) + 1) * 26) + (letters.indexOf(parts[1]) + 1);
                return idx;
            }
        };








        //
        // The get method makes retrieving cells very straightforward,
        // for example: obj.get('B1');
        //
        // @param str string The cells(s) to fetch
        // @param     string Optional set of options that are passed
        //                   to the relevant row/col function
        //
        this.get = function (str)
        {
            // Uppercase letters please!
            str = str.toUpperCase();

            //
            // Handle the style of .get('C') or .get('AA'
            //
            if (str.match(/^\s*([a-z]+)\s*$/i)) {
            
                str = RegExp.$1;
            
                if (str.length === 1) {
                    var index = letters.indexOf(str) + 1;
                    return this.col(index, 1, arguments[1]);
                
                } else if (str.length === 2) {
                    var index = ((letters.indexOf(str[0]) + 1) * 26) + letters.indexOf(str[1]) + 1;
                    return this.col(index, 1, arguments[1]);
                }
            }
            
            
            
            
            //
            // Handle the style of .get('2');
            //(fetching a whole row
            //
            if (str.match(/^\s*[0-9]+\s*$/i)) {
                return this.row(str, null, arguments[1]);
            }
            
            
            
            
            //
            // Handle the style of .get('E2');
            //(fetching a single cell)
            //
            if (str.match(/^\s*([a-z]{1,2})([0-9]+)\s*$/i)) {
                
                var letter = RegExp.$1,
                    number = RegExp.$2,
                    col    = this.get(letter, {trim: false});

                
                return col[number - 1];
            }
            
            
            
            
            //
            // Handle the style of .get('B2:E2');
            //(fetching the B2 cell to the E2 cell)
            //
            if (str.match(/^\s*([a-z]{1,2})([0-9]+)\s*:\s*([a-z]{1,2})([0-9]+)\s*$/i)) {

                var letter1 = RegExp.$1,
                    letter2 = RegExp.$3,
                    number1 = parseInt(RegExp.$2),
                    number2 = parseInt(RegExp.$4)


                // A column
                if (letter1 === letter2) {
                    var cells = [],
                        index = this.getIndexOfLetters(letter1),
                        col   = this.col(index, null, {trim: false});

                    for (var i=(number1 - 1); i<=(number2 - 1); ++i) {
                        cells.push(col[i]);
                    }

                // A row
                } else if (number1 === number2) {

                    var cells = [],
                        row   = this.row(number1, null, {trim: false}),
                        index1 = this.getIndexOfLetters(letter1),
                        index2 = this.getIndexOfLetters(letter2)

                    for (var i=(index1 - 1); i<=(index2 - 1); ++i) {
                        cells.push(row[i]);
                    }
                
                // A matrix
                } else if (letter1 !== letter2 && number1 !== number2) {

                    var cells  = [],
                        index1 = this.getIndexOfLetters(letter1),
                        index2 = this.getIndexOfLetters(letter2),
                        row    = [];

                    for (var i=number1; i<=number2; ++i) {
                        row = this.row(i).slice(index1 - 1, index2); // Don't need to subtract 1 here as we want to be inclusive
                        cells.push(row);
                    }
                }

                // Trim the results
                if (arguments[1] && arguments[1].trim === false) {
                    // Nada
                } else {
                    cells = RGraph.Sheets.arrayRTrim(cells);
                }

                return cells;
               
            }
        };








        //
        // Load the data
        //
        this.load(url, args.callback);
    };








    // This function trims an array of empty values. Its here so that the Google
    // Sheets code can be used with the RGraph.common.core file

    //
    // An arrayRtrim function that removes the empty elements off
    // both ends
    //
    // @param  array arr The array to trim.
    // @return array     The array
    //
    RGraph.Sheets.arrayRTrim = function (arr)
    {
        var out = [], content = false;

        // Trim the end
        for (var i=(arr.length - 1); i>=0; i--) {
            if (arr[i] || content) {
                out.push(arr[i]);
                content = true;
            }
        }
        
        arr = out.reverse();
        
        return out;
    };








    //
    // This function allows both object based arguments to functions
    // and also regular arguments as well.
    //
    // You can call it from inside a function like this:
    //
    // args = RGraph.Sheets.getArgs(arguments, 'object,id,foo,bar');
    //
    // So you're passing it the arguments object and a comma seperated list of names
    // for the arguments.
    //
    // @param array args   The arguments object that you get when inside a function
    // @param string names A comma seperated list of desired names for the arguments
    //                     eg: 'object,color,size'
    //
    RGraph.Sheets.getArgs = function (args, names)
    {
        var ret   = {};
        var count = 0;
        names     = names.trim().split(/ *, */);

        if (   args
            && args[0]
            && args.length === 1
            && typeof args[0][names[0]] !== 'undefined') {
            
            for (var i=0; i<names.length; ++i) {
                if (typeof args[0][names[i]] === 'undefined') {
                    args[0][names[i]] = null;
                }
            }

            return args[0];
        } else {
            for (var i in names) {
                ret[names[i]] = typeof args[count] === 'undefined' ? null : args[count];
                
                count += 1;
            }
        }

        return ret;
    };








    //
    // Makes an AJAX call. It calls the given callback (a function) when ready
    // 
    // @param  args object An object consisting of:
    //                      o url
    //                      o callback
    // OR
    //
    // @param string   url      The URL to retrieve
    // @param function callback A function that is called when the response is ready,
    //                          there's an example below called "myCallback".
    //
    RGraph.Sheets.AJAX = function ()
    {
        var args = RGraph.Sheets.getArgs(arguments, 'url,callback');

        // Mozilla, Safari, ...
        if (window.XMLHttpRequest) {
            var httpRequest = new XMLHttpRequest();
            

        // MSIE
        } else if (window.ActiveXObject) {
            var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }

        httpRequest.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200) {
                this.__user_callback__ = args.callback;
                this.__user_callback__(this.responseText);
            }
        }

        httpRequest.open('GET', args.url, true);
        
        // Set a Cache-Control header
        if (httpRequest && httpRequest.setRequestHeader) {
            httpRequest.setRequestHeader('Cache-Control', 'no-cache');
        }
        
        httpRequest.send();
    };








    //
    // Uses the above function but calls the call back passing JSON (ie a JavaScript object ) as its argument
    // 
    // @param  args object An object consisting of:
    //                      o url
    //                      o callback
    // OR
    //
    // @param url string The URL to fetch
    // @param callback function Your callback function (which is passed the JSON object as an argument)
    //
    RGraph.Sheets.AJAX.getJSON = function ()
    {
        var args = RGraph.Sheets.getArgs(arguments, 'url,callback');

        RGraph.Sheets.AJAX(args.url, function ()
        {
            var json = eval('(' + this.responseText + ')');

            args.callback(json);
        });
    };








// End module pattern
})(window, document);