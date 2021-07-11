// Version: 2021-03-01
//
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
        var args = RGraph.getArgs(arguments, 'key,worksheet,callback');
        
        // Allow two args to be given as well as three
        if (arguments.length === 2) {
            args.callback  = arguments[1];
            args.worksheet = null;
        }

        var worksheet,
            callback,
            letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            key     = args.key;

        // 3 arguments
        if (arguments.length === 3) {
            worksheet = Number(args.worksheet);
            callback  = args.callback;
        
        // 2 arguments
        } else {
            worksheet = 1;
            callback  = args.worksheet;
        }
        
        // Create a random numberfor use in the callback name
        var rand = RGraph.random(0,999999999);
        var url  = ('https://spreadsheets.google.com/feeds/cells/[KEY]/[WORKSHEET]/public/full?alt=json-in-script&callback=__rgraph_JSONPCallback' + rand).replace(/\[KEY\]/, key).replace(/\[WORKSHEET\]/, worksheet);
        
        //
        // https://spreadsheets.google.com/feeds/cells/1q_BMjvKO_kKbAO3VjoaITSDyrLAk8f0SK5UFMmE3oRs/2/public/full?alt=json-in-script
        //
    

        
        

        //
        // Loads the spreadsheet
        //
        this.load = function(url, userCallback)
        {
            var obj = this;

            // A global on purpose
            window['__rgraph_JSONPCallback' + rand] = function (json)
            {
                // Save the JSON on the RGraph.Sheets object
                obj.json = json;

                //
                // Put the entries in the JSON feed into a grid
                //
                var grid = [], row = 0, col = 0;

                for (var i=0; i<json.feed.entry.length; ++i) {
                    
                    row = json.feed.entry[i].gs$cell.row - 1;
                    col = json.feed.entry[i].gs$cell.col - 1;
                    
                    if (!grid[row]) {
                        grid[row] = [];
                    }
                        
                    grid[row][col] = json.feed.entry[i].content.$t;
                }
                
                
                //
                // Determine the longest row
                //
                var maxcols = 0; // The max length of the rows
                
                for (var i=0; i<grid.length; ++i) {
                    maxcols = grid[i] ? Math.max(maxcols, grid[i].length) : maxcols;
                }


            
                //
                // Now go through the array and fill in any blank holes.
                //
                for (var i=0; i<grid.length; ++i) {
                    
                    if (typeof grid[i] === 'undefined') {
                        grid[i] = new Array(maxcols);
                    }

                    for (var j=0; j<maxcols; j++) {
                        if (typeof grid[i][j] === 'undefined') {
                            grid[i][j] = '';
                        }
                        
                        // Convert numbers to real numbers and floats here too
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
            };

            // Add the new script tag to the document that pulls in the JSON
            //
            // With jQuery...
            //
            //$('body').append("<script src='" + url + "'></script>");
            //
            // And without jQuery...

            var scriptNode = document.createElement('script');
            scriptNode.src = url;
            document.body.appendChild(scriptNode);
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
        }




    
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




// End module pattern
})(window, document);