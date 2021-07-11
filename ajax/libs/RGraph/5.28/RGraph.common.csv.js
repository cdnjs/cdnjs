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


    //
    // This function has been taken out of the RGraph.common.core.js file to
    // enable the CSV reader to work standalone.
    //
    if (!RGraph.AJAX) RGraph.AJAX = function ()
    {
        var args = RGraph.getArgs(arguments, 'url,callback');

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
                this.__user_callback__ = callback;

                this.__user_callback__(this.responseText);
            }
        }

        httpRequest.open('GET', args.url, true);
        httpRequest.send();
    };








    //
    // Use the AJAX function above to fetch a string
    //
    if (!RGraph.AJAX.getString) RGraph.AJAX.getString = function ()
    {
        var args = RGraph.getArgs(arguments, 'url,callback');

        RGraph.AJAX(args.url, function ()
        {
            var str = String(this.responseText);

            args.callback(str);
        });
    };








    // This function simply creates UID. Formerly the function in
    // RGraph.common.core.js was being used - but now the CSV code
    // is now standalone, hence this function
    if (!RGraph.createUID) RGraph.createUID = function ()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
        {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    };








    RGraph.CSV = function ()
    {
        var args = RGraph.getArgs(arguments, 'url,callback,separator,eol');

        //
        // Some default values
        //
        this.url       = args.url;
        this.ready     = args.callback;
        this.data      = null;
        this.numrows   = null;
        this.numcols   = null;
        this.separator = args.separator || ',';
        this.endofline = args.eol || /\r?\n/;
        this.uid       = RGraph.createUID();








        //
        // A Custom split function
        // 
        // @param string str  The CSV string to split
        // @param mixed  char The character to split on - or it can also be an object like this:
        //                    {
        //                        preserve: false, // Whether to preserve whitespace
        //                        char: ','        // The character to split on
        //                    }
        //
        this.splitCSV = function (str, split)
        {
            // Defaults
            var arr            = [];
            var field          = '';
            var inDoubleQuotes = false;
            var inSingleQuotes = false;
            var preserve       = (typeof split === 'object' && split.preserve) ? true : false;
            
            // The character to split the CSV string on
            if (typeof split === 'object') {
                if (typeof split.char === 'string') {
                    split = split.char;
                } else {
                    split = ',';
                }
            } // If not an object just leave the char as it's supplied



            for (var i=0,len=str.length; i<len; i+=1) {
                
                char = str.charAt(i);
                
                if ( (char === '"') && !inDoubleQuotes) {
                    inDoubleQuotes = true;
                    continue;
                
                } else if ( (char === '"') && inDoubleQuotes) {
                    inDoubleQuotes = false;
                    continue;
                }
                if ( (char === "'") && !inSingleQuotes) {
                    inSingleQuotes = true;
                    continue;
                
                } else if ( (char === "'") && inSingleQuotes) {
                    inSingleQuotes = false;
                    continue;
    
                } else if (char === split && !inDoubleQuotes && !inSingleQuotes) {
                    // TODO look ahead in order to allow for multi-character separators
                    arr.push(field);
                    field = '';
                    continue;
    
                } else {
                    field = field + char;
                }
            }
            
            // Add the last field
            arr.push(field);
            
            // Now trim each value if necessary
            if (!preserve) {
                for (i=0,len=arr.length; i<len; i+=1) {
                    arr[i] = arr[i].trim();
                }
            }
    
            return arr;
        };








        //
        // This function splits the CSV data into an array so that it can be useful.
        //
        this.fetch = function ()
        {
            var sep = this.separator,
                eol = this.endofline,
                obj = this;

            if (this.url.substring(0,3) === 'id:' || this.url.substring(0,4) === 'str:') {

                // Get rid of any surrounding whitespace
                if (this.url.substring(0,3) === 'id:') {
                    var data = document.getElementById(this.url.substring(3)).innerHTML.trim();
                
                } else if (this.url.substring(0,4) === 'str:') {
                    var data = this.url.substring(4).trim();
                }

                // Store the CSV data on the CSV object (ie - this object)
                obj.data = data.split(eol);

                // Store the number of rows
                obj.numrows = obj.data.length;

                for (var i=0,len=obj.data.length; i<len; i+=1) {


                    //
                    // Split the individual line
                    //
                    //var row = obj.data[i].split(sep);
                    var row = obj.splitCSV(obj.data[i], {preserve: false, char: sep});


                    if (!obj.numcols) {
                        obj.numcols = row.length;
                    }

                    //
                    // If the cell is purely made up of numbers - convert it
                    //
                    for (var j=0; j<row.length; j+=1) {
                        if ((/^\-?[0-9.]+$/).test(row[j])) {
                            row[j] = parseFloat(row[j]);
                        }
                            
                        // Assign the split-up-row back to the data array
                        obj.data[i] = row;
                    }
                }
                
                // Call the ready function straight away
                obj.ready(obj);

            } else {

                RGraph.AJAX.getString({url: this.url, callback: function (data)
                {
                    data = data.replace(/(\r?\n)+$/, '');

                    //
                    // Split the lines in the CSV
                    //
                    obj.data = data.split(eol);

                    //
                    // Store the number of rows
                    //
                    obj.numrows = obj.data.length;



                    //
                    // Loop thru each lines in the CSV file
                    //
                    for (var i=0,len=obj.data.length; i<len; i+=1) {
                        //
                        // Use the new split function to split each row NOT preserving whitespace
                        //
                        //var row = obj.data[i].split(sep);
                        var row = obj.splitCSV(obj.data[i], {preserve: false, char: sep});

                        if (!obj.numcols) {
                            obj.numcols = row.length;
                        }

                        //
                        // If the cell is purely made up of numbers - convert it
                        //
                        for (var j=0; j<row.length; j+=1) {
                            if ((/^\-?[0-9.]+$/).test(row[j])) {
                                row[j] = parseFloat(row[j]);
                            }

                            // Assign the split-up-row back to the data array
                            obj.data[i] = row;
                        }
                    }

                    // Call the ready function straight away
                    obj.ready(obj);
                }});
            }
        };








        //
        // Returns a row of the CSV file
        // 
        // @param number index The index of the row to fetch
        // @param        start OPTIONAL If desired you can specify a column to
        //                              start at (which starts at 0 by default)
        //
        this.row =
        this.getRow = function (index)
        {
            var row   = [],
                start = parseInt(arguments[1]) || 0;

            row = this.data[index].slice(start);

            return row;
        };








        //
        // Returns a column of the CSV file
        // 
        // @param number index The index of the column to fetch
        // @param        start OPTIONAL If desired you can specify a row to start at (which starts at 0 by default)
        //
        this.col =
        this.column =
        this.getCol =
        this.getColumn = function (index)
        {
            var col   = [],
                start = arguments[1] || 0;

            for (var i=start; i<this.data.length; i+=1) {
                if (this.data[i] && this.data[i][index]) {
                    col.push(this.data[i][index]);
                } else {
                    col.push(null);
                }
            }
            
            return col;
        };









        // Fetch the CSV file
        this.fetch();
    };